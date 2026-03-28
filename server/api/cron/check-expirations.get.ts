import { prisma } from '../../utils/prisma';
import { sendEmail } from '../../utils/email';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const config = useRuntimeConfig();

    // Secure with secret key
    if (query.secret !== config.cronSecret) {
        throw createError({ statusCode: 401, message: 'Unauthorized' });
    }

    try {
        const now = Date.now();
        const FIFTEEN_DAYS_MS = 15 * 24 * 60 * 60 * 1000;
        const nowBigInt = BigInt(now);
        const fifteenDaysBigInt = BigInt(now + FIFTEEN_DAYS_MS);

        // Find active VIP users with plans expiring within 15 days
        const expiringUsers = await prisma.user.findMany({
            where: {
                user_status: 'active',
                plan_expires_at: {
                    gt: nowBigInt,
                    lte: fifteenDaysBigInt,
                },
                renewal_notified_at: null,
            },
        });

        let warningsSent = 0;
        const notifiedUsers: string[] = [];

        for (const user of expiringUsers) {
            if (!user.email) continue;

            try {
                const expDate = user.plan_expires_at
                    ? new Date(Number(user.plan_expires_at)).toLocaleDateString()
                    : 'soon';

                await sendEmail({
                    to: user.email,
                    subject: 'Action Required: Your B2B Plan is Expiring Soon',
                    text: `Your subscription is expiring on ${expDate}. Please log in to renew your plan.`,
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px;">
                            <h2>Subscription Expiration Warning</h2>
                            <p>Hello ${user.username},</p>
                            <p>Your B2B Platform subscription is scheduled to expire on <strong>${expDate}</strong>.</p>
                            <p>Please log in to your dashboard and renew your plan to ensure uninterrupted publishing access.</p>
                            <br/>
                            <p>Thank you for using our platform.</p>
                        </div>
                    `
                });

                // Mark user as notified so we don't send duplicate emails
                await prisma.user.update({
                    where: { id: user.id },
                    data: { renewal_notified_at: BigInt(now) },
                });

                warningsSent++;
                notifiedUsers.push(user.email);
            } catch (e) {
                // continue with next user even if email fails
            }
        }

        return {
            success: true,
            warningsSent,
            notifiedUsers,
            message: `Processed ${expiringUsers.length} expiring users, sent ${warningsSent} warnings.`
        };

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: 'Failed to run expiration checks: ' + error.message
        });
    }
});
