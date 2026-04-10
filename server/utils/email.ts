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

    const isNode = typeof process !== 'undefined' && !!process.versions?.node;

    if (isNode && smtpHost && smtpUser && smtpPass) {
        try {
            console.log(`[Email] Attempting SMTP send to ${options.to} via ${smtpHost}`);
            const { default: nodemailer } = await import('nodemailer');
            
            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465, // true for 465, false for other ports
                auth: {
                    user: smtpUser,
                    pass: smtpPass
                }
            });

            const info = await transporter.sendMail({
                from: `"B2B Platform" <${smtpFrom}>`,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html || options.text
            });

            console.log('[Email] SMTP Success:', info.messageId);
            return { success: true, message: `Email sent via SMTP: ${info.messageId}` };
        } catch (error: any) {
            console.error('[Email] SMTP Failed, falling back to Resend:', error.message);
            // Don't throw yet, try falling back to Resend
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
