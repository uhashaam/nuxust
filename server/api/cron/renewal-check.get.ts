// Plan Renewal Reminder Cron Endpoint
// Call this daily via an external cron scheduler (e.g., cron-job.org)
// Protect with NUXT_CRON_SECRET env var
import { sendEmail } from '../../utils/email';
import { fetchAllRecords } from '../../utils/lark/base';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    // Validate cron secret to prevent unauthorized access
    const secret = getHeader(event, 'x-cron-secret');
    if (secret !== config.cronSecret) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    const appToken = config.larkBaseAppToken;
    const tableId = config.larkTableUsers;

    if (!appToken || !tableId) {
        throw createError({ statusCode: 500, statusMessage: 'Lark configuration missing' });
    }

    const records = await fetchAllRecords(appToken, tableId);

    const now = Date.now();
    const fifteenDaysMs = 15 * 24 * 60 * 60 * 1000;
    const results = { checked: 0, notified: 0, errors: 0 };

    for (const record of records) {
        results.checked++;
        const fields = record.fields as any;
        const email = fields.email as string;
        const planExpiresAt = fields.plan_expires_at as number;
        const username = fields.username as string || 'User';
        const userType = fields.user_type as string || 'user';
        const renewalNotifiedAt = fields.renewal_notified_at as number;

        // Skip if no expiry, no email, or already regular user
        if (!email || !planExpiresAt || userType === 'user') continue;

        const daysLeft = Math.ceil((planExpiresAt - now) / (24 * 60 * 60 * 1000));
        if (daysLeft < 0 || daysLeft > 15) continue;

        // Skip if already notified in the last 14 days to avoid spam
        if (renewalNotifiedAt && (now - renewalNotifiedAt) < 14 * 24 * 60 * 60 * 1000) continue;

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
                                <a href="https://b-2b.com/dashboard/upgrade" style="background: #2563eb; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Renew Plan Now</a>
                            </div>
                            <p style="color: #94a3b8; font-size: 13px;">After renewal, your plan validity will be extended and your remaining article count will be reset based on your plan level.</p>
                        </div>
                    </div>
                `
            });

            // Mark user as notified
            const { updateRecord } = await import('../../utils/lark/base');
            await updateRecord(appToken, tableId, record.record_id, {
                renewal_notified_at: now
            });
            results.notified++;
        } catch (e) {
            results.errors++;
        }
    }

    return { success: true, ...results };
});
