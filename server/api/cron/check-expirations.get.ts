import { userRepository } from '../../utils/userRepository';
import { sendEmail } from '../../utils/email';

export default defineEventHandler(async (event) => {
    // Basic auth check for cron job security
    const query = getQuery(event);
    const config = useRuntimeConfig();

    // In a prod environment, checking against a CRON_SECRET is recommended
    // if (query.secret !== process.env.CRON_SECRET) {
    //     throw createError({ statusCode: 401, message: 'Unauthorized execution' });
    // }

    try {
        // Here we would ideally fetch only Active/VIP users, but for lack of a direct 
        // complex filter in the simplified repo logic, we can fetch all or a subset
        // In this architecture, let's fetch users who have an active VIP membership

        const appToken = config.larkBaseAppToken;
        const usersTableId = config.public.larkTableIds?.users;

        if (!appToken || !usersTableId) {
            throw new Error('Lark configuration missing for Users table');
        }

        // Fetch using the raw base fetcher to get all users
        const { fetchAllRecords } = await import('../../utils/lark/base');
        const users = await fetchAllRecords(appToken, usersTableId);

        const now = Date.now();
        const FIFTEEN_DAYS = 15 * 24 * 60 * 60 * 1000;

        let warningsSent = 0;
        const notifiedUsers = [];

        for (const userRecord of users) {
            const fields = userRecord.fields;
            const expDate = fields['plan_expiration_date'] || fields['Plan Expiration Date'];
            const email = fields['email'] || fields['Email'];

            if (expDate && email) {
                const expTimestamp = new Date(expDate).getTime();
                const timeToExpire = expTimestamp - now;

                // If expiration is within 15 days and in the future
                if (timeToExpire > 0 && timeToExpire <= FIFTEEN_DAYS) {
                    // This is where you would hook into an email provider like Resend or SendGrid
                    

                    // Use the dynamic SMTP utility to send the warning email
                    await sendEmail({
                        to: email,
                        subject: 'Action Required: Your B2B Plan is Expiring Soon',
                        text: `Your subscription is expiring in less than 15 days. Please log in to renew your plan to avoid service interruption.`,
                        html: `
                            <div style="font-family: Arial, sans-serif; padding: 20px;">
                                <h2>Subscription Expiration Warning</h2>
                                <p>Hello,</p>
                                <p>Your B2B Platform subscription is scheduled to expire in less than <strong>15 days</strong>.</p>
                                <p>Please log in to your dashboard and renew your plan to ensure uninterrupted publishing access and API stability for your industry sites.</p>
                                <br/>
                                <p>Thank you for using our platform.</p>
                            </div>
                        `
                    });

                    warningsSent++;
                    notifiedUsers.push(email);
                }
            }
        }

        return {
            success: true,
            warningsSent,
            notifiedUsers,
            message: `Processed ${users.length} users, sent ${warningsSent} warnings.`
        };

    } catch (error: any) {
        
        throw createError({
            statusCode: 500,
            message: 'Failed to run expiration checks: ' + error.message
        });
    }
});
