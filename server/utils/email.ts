/**
 * Sends an email using a Worker-compatible Fetch approach.
 * Note: Nodemailer is removed as it is incompatible with Cloudflare Workers due to Node.js stream dependencies.
 */
export const sendEmail = async (options: EmailOptions) => {
    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const adminSettingsTableId = config.larkTableAdminSettings;

    if (!appToken || !adminSettingsTableId) {
        throw new Error('Missing Lark Base configuration for Admin Settings.');
    }

    try {
        // Fetch SMTP/Email config from Lark
        const { records } = await fetchRecords(appToken, adminSettingsTableId);

        const getSetting = (key: string) => {
            const record = records.find(r => r.fields['Key'] === key || r.fields['Setting Name'] === key);
            return record ? record.fields['Value'] : null;
        };

        const host = getSetting('smtp_host');
        const user = getSetting('smtp_user');
        const fromEmail = getSetting('smtp_from_email') || user;
        const fromName = getSetting('smtp_from_name') || 'B2B Subdomain Platform';

        // COMPATIBILITY NOTE: Cloudflare Workers cannot use raw SMTP (Nodemailer).
        // We use MailChannels (Zero-config for Cloudflare Pages) or an HTTP API.
        // For now, we use the MailChannels API which works out-of-the-box on Cloudflare Pages.

        const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                personalizations: [
                    {
                        to: [{ email: options.to, name: '' }],
                    },
                ],
                from: {
                    email: fromEmail || 'no-reply@b-2b.com',
                    name: fromName,
                },
                subject: options.subject,
                content: [
                    {
                        type: options.html ? 'text/html' : 'text/plain',
                        value: options.html || options.text || '',
                    },
                ],
            }),
        });

        if (response.ok) {
            return { success: true, message: 'Email sent via MailChannels' };
        } else {
            const errorText = await response.text();
            throw new Error(`Email failed: ${errorText}`);
        }

    } catch (error: any) {
        // Fallback: If MailChannels fails or is not preferred, we log to Lark or throw
        throw new Error(error.message || 'Error occurred while sending email');
    }
};
