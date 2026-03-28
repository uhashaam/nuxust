import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
    // 1. Validate Admin Auth (Add checks if necessary)

    try {
        // Fetch values from MySQL via Prisma
        const settings = await prisma.adminSetting.findMany({
            where: {
                key: {
                    in: ['smtp_host', 'smtp_port', 'smtp_user', 'smtp_password', 'smtp_from_email', 'smtp_from_name', 'resend_api_key']
                }
            }
        });

        const smtpConfig: Record<string, string> = {
            smtp_host: '',
            smtp_port: '465',
            smtp_user: '',
            smtp_password: '',
            smtp_from_email: '',
            smtp_from_name: '',
            resend_api_key: ''
        };

        // Populate and mask sensitive keys
        settings.forEach(s => {
            if (s.key === 'smtp_password' || s.key === 'resend_api_key') {
                smtpConfig[s.key] = s.value ? '********' : '';
            } else if (Object.keys(smtpConfig).includes(s.key)) {
                smtpConfig[s.key] = s.value || '';
            }
        });

        return {
            success: true,
            config: smtpConfig
        };
    } catch (error: any) {
        throw createError({ statusCode: 500, message: 'Failed to fetch SMTP Configuration' });
    }
});
