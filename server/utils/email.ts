import nodemailer from 'nodemailer';

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

    if (!appToken || !adminSettingsTableId) {
        throw new Error('Missing Lark Base configuration for Admin Settings.');
    }

    try {
        // Fetch SMTP/Email config from Lark
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

        const port = parseInt(portStr, 10) || 465;
        const secure = port === 465;

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: {
                user,
                pass,
            },
        });

        const info = await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: options.to,
            subject: options.subject,
            text: options.text || '',
            html: options.html || options.text || '',
        });

        return { success: true, message: `Email sent via Nodemailer: ${info.messageId}` };

    } catch (error: any) {
        throw new Error(error.message || 'Error occurred while sending email');
    }
};
