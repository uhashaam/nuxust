// Email functionality uses Resend API exclusively for Cloudflare Edge compatibility.
import { prisma } from './prisma';

export interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export const sendEmail = async (options: EmailOptions) => {
    const config = useRuntimeConfig();

    // Priority 1: Check env var directly (fastest, no DB lookup needed)
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
                from: `B2B Platform <noreply@b-2b.com>`,
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

    try {
        // Priority 2: Fetch config from AdminSetting in Prisma
        const settings = await prisma.adminSetting.findMany();

        const getSetting = (key: string, defaultVal: string) => {
            const record = settings.find((r: any) => r.key === key);
            return (record && record.value) ? record.value : defaultVal;
        };

        const host = getSetting('smtp_host', 'smtp.feishu.cn');
        const portStr = getSetting('smtp_port', '465');
        const user = getSetting('smtp_user', 'smtp@zjdu.com');
        const pass = getSetting('smtp_password', 'Kengnu@1smtp'); // Example info

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
        console.warn('No Resend API key found in env or Admin Settings. Email sending skipped.');
        throw new Error('Email service not configured. Please add Resend API Key.');

    } catch (error: any) {
        throw new Error(error.message || 'Error occurred while sending email');
    }
};
