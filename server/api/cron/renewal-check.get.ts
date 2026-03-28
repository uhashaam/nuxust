// Plan Renewal Reminder Cron Endpoint
// Call this daily via an external cron scheduler (e.g., cron-job.org)
// Protect with NUXT_CRON_SECRET env var
import { sendEmail } from '../../utils/email';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    // Validate cron secret to prevent unauthorized access
    const secret = getHeader(event, 'x-cron-secret');
    if (secret !== config.cronSecret) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    try {
        // Fetch all users with premium plans from MySQL via Prisma
        const users = await prisma.user.findMany({
            where: {
                user_type: { not: 'user' },
                plan_expires_at: { not: null },
                email: { not: null }
            }
        });

        const now = BigInt(Date.now());
        const oneDayMs = BigInt(24 * 60 * 60 * 1000);
        const fifteenDaysMs = 15n * oneDayMs;
        const results = { checked: 0, notified: 0, errors: 0 };

        for (const user of users) {
            results.checked++;
            
            const email = user.email!;
            const planExpiresAt = user.plan_expires_at!;
            const username = user.username || 'User';
            const userType = user.user_type || 'user';
            const renewalNotifiedAt = user.renewal_notified_at;

            // Business logic for notification timing
            const diff = planExpiresAt - now;
            const daysLeft = Number(diff / oneDayMs);
            
            if (daysLeft < 0 || daysLeft > 15) continue;

            // Skip if already notified in the last 14 days to avoid spam
            if (renewalNotifiedAt && (now - renewalNotifiedAt) < 14n * oneDayMs) continue;

            try {
                await sendEmail({
                    to: email,
                    subject: `⚠️ Your ${userType.toUpperCase()} plan expires in ${daysLeft} days`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 40px 30px; background: #f8fafc;">
                            <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                                <div style="background: #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
                                    <span style="font-size: 2rem;">⚠️</span>
                                </div>
                                <h2 style="color: #0f172a; margin-bottom: 8px;">Hi ${username},</h2>
                                <p style="color: #64748b;">Your <strong>${userType.toUpperCase()} plan</strong> will expire in <strong style="color: #d97706;">${daysLeft} day${daysLeft !== 1 ? 's' : ''}</strong>.</p>
                                <p style="color: #64748b;">Renew now to continue publishing news and enjoying all your plan benefits without interruption.</p>
                                <div style="margin: 24px 0; text-align: center;">
                                    <a href="${config.public.siteUrl || 'https://b-2b.com'}/dashboard/upgrade" style="background: #2563eb; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Renew Plan Now</a>
                                </div>
                                <p style="color: #94a3b8; font-size: 13px;">After renewal, your plan validity will be extended and your remaining article count will be reset based on your plan level.</p>
                            </div>
                        </div>
                    `
                });

                // Mark user as notified in MySQL
                await prisma.user.update({
                    where: { id: user.id },
                    data: { renewal_notified_at: now }
                });
                
                results.notified++;
            } catch (e) {
                console.error(`Error notifying user ${user.id}:`, e);
                results.errors++;
            }
        }

        return { success: true, ...results };
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: `Cron job failed: ${error.message}`
        });
    }
});
