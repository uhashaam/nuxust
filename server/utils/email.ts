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

    // 1. Check for SMTP configuration (Primarily for Node.js/Hostinger)
    const smtpHost = (config as any).smtpHost || process.env.NUXT_SMTP_HOST || process.env.SMTP_HOST || '';
    const smtpPort = parseInt((config as any).smtpPort || process.env.NUXT_SMTP_PORT || process.env.SMTP_PORT || '465');
    const smtpUser = (config as any).smtpUser || process.env.NUXT_SMTP_USER || process.env.SMTP_USER || '';
    const smtpPass = (config as any).smtpPass || process.env.NUXT_SMTP_PASS || process.env.SMTP_PASS || '';
    const smtpFrom = (config as any).smtpFrom || process.env.NUXT_SMTP_FROM || process.env.SMTP_FROM || smtpUser;

    // Improved environment detection
    const isNode = typeof process !== 'undefined' && 
                   !!process.versions?.node && 
                   !process.env.CF_PAGES; // Explicitly false if on Cloudflare build

    if (isNode && smtpHost && smtpUser && smtpPass) {
        try {
            console.log(`[Email] Attempting SMTP send to ${options.to} via ${smtpHost}`);
            const { default: nodemailer } = await import('nodemailer');
            
            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465,
                connectionTimeout: 5000, // 5 seconds timeout
                greetingTimeout: 5000,
                auth: {
                    user: smtpUser,
                    pass: smtpPass
                }
            });

            // Using Promise.race to ensure we never hang the main thread
            const info = await Promise.race([
                transporter.sendMail({
                    from: `"B2B Platform" <${smtpFrom}>`,
                    to: options.to,
                    subject: options.subject,
                    text: options.text,
                    html: options.html || options.text
                }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('SMTP Timeout')), 7000))
            ]) as any;

            console.log('[Email] SMTP Success:', info.messageId);
            return { success: true, message: `Email sent via SMTP: ${info.messageId}` };
        } catch (error: any) {
            console.error('[Email] SMTP Failed:', error.message);
            // Fall back to Resend if available
        }
    }

    // 2. Fallback: Resend API (Essential for Cloudflare Edge)
    const envResendApiKey = (config as any).resendApiKey || process.env.NUXT_RESEND_API_KEY || '';

    if (envResendApiKey) {
        console.log(`[Email] Attempting Resend API send to ${options.to}`);
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

        if (res.ok) {
            const data = await res.json() as any;
            return { success: true, message: `Email sent via Resend: ${data.id}` };
        }
        
        const errorData = await res.json().catch(() => ({}));
        console.error('[Email] Resend API Failed:', errorData);
    }

    throw new Error('Email service not configured. Please add SMTP or Resend credentials.');
};
