import { fetchRecords } from '../../utils/lark/base';

export default defineEventHandler(async (event) => {
    // 1. Validate Admin Auth
    const user = event.context.user; // Assuming there is an auth middleware populating this

    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const adminSettingsTableId = config.larkTableAdminSettings;

    if (!appToken || !adminSettingsTableId) {
        throw createError({ statusCode: 500, message: 'Lark Base configuration missing for Admin Settings' });
    }

    try {
        // Fetch Stripe config from Lark
        const { records } = await fetchRecords(appToken, adminSettingsTableId);

        const stripeConfig: Record<string, string> = {
            stripe_secret_key: '',
            stripe_webhook_secret: '',
            stripe_publishable_key: '' // Optional for possible future frontend needs
        };

        // Find matching records and populate
        records.forEach(r => {
            const key = r.fields['Key'] || r.fields['Setting Name'];
            const val = r.fields['Value'];

            if (key && Object.keys(stripeConfig).includes(key as string)) {
                // Mask sensitive active keys
                if ((key === 'stripe_secret_key' || key === 'stripe_webhook_secret') && val) {
                    stripeConfig[key] = '********'; // Masked for security
                } else {
                    stripeConfig[key] = val as string || '';
                }
            }
        });

        return {
            success: true,
            config: stripeConfig
        };
    } catch (error: any) {
        
        throw createError({ statusCode: 500, message: 'Failed to fetch Stripe Configuration' });
    }
});
