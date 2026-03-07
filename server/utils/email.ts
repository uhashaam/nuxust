// Email functionality uses Resend API exclusively for Cloudflare Edge compatibility.

export interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export const sendEmail = async (options: EmailOptions) => {
    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const adminSettingsTableId = config.larkTableAdminSettings;

    // Priority 1: Check env var directly (fastest, no Lark lookup needed)
    const envResendApiKey = (config as any).resendApiKey || '';

    // If we have the Resend key directly from env, use it immediately
    if (envResendApiKey) {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${envResendApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: `B2B Platform <smtp@zjdu.com>`,
                to: [options.to],
                subject: options.subject,
                text: options.text,
                html: options.html || options.text
            })
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({})) as any;
            throw new Error(errorData.message || `Resend API Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json() as any;
        return { success: true, message: `Email sent via Resend (env): ${data.id}` };
    }

    if (!appToken || !adminSettingsTableId) {
        throw new Error('Missing Lark Base configuration for Admin Settings.');
    }

    try {
        // Priority 2: Fetch config from Lark admin settings
        let records: any[] = [];
        try {
            const result = await fetchRecords(appToken, adminSettingsTableId);
            records = result.records || [];
        } catch (e) {
            console.warn('Could not fetch admin settings from Lark, using fallback defaults.');
        }

        const getSetting = (key: string, defaultVal: string) => {
            const record = records.find(r => r.fields['Key'] === key || r.fields['Setting Name'] === key);
            return (record && record.fields['Value']) ? record.fields['Value'] : defaultVal;
        };

        const host = getSetting('smtp_host', 'smtp.feishu.cn');
        const portStr = getSetting('smtp_port', '465');
        const user = getSetting('smtp_user', 'smtp@zjdu.com');
        const pass = getSetting('smtp_password', 'Kengnu@1smtp');

        const fromEmail = getSetting('smtp_from_email', user);
        const fromName = getSetting('smtp_from_name', 'B2B Subdomain Platform');

        const resendApiKey = getSetting('resend_api_key', '');

        // Use Resend HTTP API if configured (Cloudflare EDGE Compatible)
        if (resendApiKey) {
            const res = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${resendApiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    from: `${fromName} <${fromEmail}>`,
                    to: [options.to],
                    subject: options.subject,
                    text: options.text,
                    html: options.html || options.text
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || `Resend API Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            return { success: true, message: `Email sent via Resend HTTP API: ${data.id}` };
        }

        // Fallback: No valid key found
        console.warn('No Resend API key found in env or Lark Base. Email sending skipped.');
        throw new Error('Email service not configured. Please add Resend API Key.');

    } catch (error: any) {
        throw new Error(error.message || 'Error occurred while sending email');
    }
};
