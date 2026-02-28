import nodemailer from 'nodemailer';
import { fetchRecords } from './lark/base';

// Interface for the email payload
export interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

/**
 * Sends an email using SMTP credentials dynamically fetched from the Lark Base Admin Settings table.
 */
export const sendEmail = async (options: EmailOptions) => {
    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const adminSettingsTableId = config.public.larkTableIds?.adminSettings; // Need to ensure this is in nuxt.config

    if (!appToken || !adminSettingsTableId) {
        throw new Error('Missing Lark Base configuration for Admin Settings.');
    }

    try {
        // Fetch SMTP config from Lark
        // Assuming there is a generic settings table where 'Key' is the setting name and 'Value' is the setting value
        const { records } = await fetchRecords(appToken, adminSettingsTableId);

        // Helper to extract a setting
        const getSetting = (key: string) => {
            const record = records.find(r => r.fields['Key'] === key || r.fields['Setting Name'] === key);
            return record ? record.fields['Value'] : null;
        };

        const host = getSetting('smtp_host');
        const port = getSetting('smtp_port') ? parseInt(getSetting('smtp_port')) : 465;
        const user = getSetting('smtp_user');
        const pass = getSetting('smtp_password');
        const fromEmail = getSetting('smtp_from_email') || user;
        const fromName = getSetting('smtp_from_name') || 'B2B Subdomain Platform';

        if (!host || !user || !pass) {
            console.warn('[EMAIL] SMTP Configuration is missing in the Lark Admin Settings table. Falling back to mock console log.');
            console.log(`[MOCK EMAIL TO ${options.to}] Subject: ${options.subject}`);
            return { success: false, mock: true, message: 'SMTP credentials missing from Lark' };
        }

        // Configure Nodemailer Transport
        const transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: port === 465, // true for 465, false for other ports
            auth: {
                user: user,
                pass: pass,
            },
        });

        // Send Email
        const info = await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        });

        console.log(`[EMAIL] Message sent successfully to ${options.to}: ${info.messageId}`);
        return { success: true, messageId: info.messageId };

    } catch (error: any) {
        console.error('[EMAIL] Failed to send email:', error);
        throw new Error(error.message || 'Error occurred while sending email');
    }
};
