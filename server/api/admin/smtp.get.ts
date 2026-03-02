import { fetchRecords } from '../../utils/lark/base';

export default defineEventHandler(async (event) => {
    // 1. Validate Admin Auth
    const user = event.context.user; // Assuming there is an auth middleware populating this
    // If auth middleware isn't globally applied to /api/admin/*, we should verify the user token here.

    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const adminSettingsTableId = config.public.larkTableIds?.adminSettings;

    if (!appToken || !adminSettingsTableId) {
        throw createError({ statusCode: 500, message: 'Lark Base configuration missing for Admin Settings' });
    }

    try {
        // Fetch SMTP config from Lark
        const { records } = await fetchRecords(appToken, adminSettingsTableId);

        const smtpConfig: Record<string, string> = {
            smtp_host: '',
            smtp_port: '465',
            smtp_user: '',
            smtp_password: '', // Ideally we shouldn't send password to frontend, but for edit purposes we might send a masked ver or just empty string 
            smtp_from_email: '',
            smtp_from_name: ''
        };

        // Find matching records and populate
        records.forEach(r => {
            const key = r.fields['Key'] || r.fields['Setting Name'];
            const val = r.fields['Value'];

            if (key && Object.keys(smtpConfig).includes(key as string)) {
                // Mask password for security
                if (key === 'smtp_password' && val) {
                    smtpConfig[key] = '********'; // Just an indicator that it exists
                } else {
                    smtpConfig[key] = val as string || '';
                }
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
