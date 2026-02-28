import { fetchRecords, createRecord, updateRecord } from '../../utils/lark/base';

export default defineEventHandler(async (event) => {
    // 1. Validate Admin Auth
    const body = await readBody(event);

    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const adminSettingsTableId = config.public.larkTableIds?.adminSettings;

    if (!appToken || !adminSettingsTableId) {
        throw createError({ statusCode: 500, message: 'Lark Base configuration missing for Admin Settings' });
    }

    try {
        // Fetch existing records to determine if we update or insert
        const { records } = await fetchRecords(appToken, adminSettingsTableId);

        const existingKeys = records.reduce((acc, curr) => {
            const k = curr.fields['Key'] || curr.fields['Setting Name'];
            if (k) {
                acc[k as string] = curr.record_id as string;
            }
            return acc;
        }, {} as Record<string, string>);

        const keysToUpdate = [
            'stripe_publishable_key'
        ];

        // Process secrets only if they are not the masked placeholder
        if (body.stripe_secret_key && body.stripe_secret_key !== '********') {
            keysToUpdate.push('stripe_secret_key');
        }
        if (body.stripe_webhook_secret && body.stripe_webhook_secret !== '********') {
            keysToUpdate.push('stripe_webhook_secret');
        }

        // Loop through keys and update or insert
        for (const key of keysToUpdate) {
            const value = body[key];

            const fieldsData = {
                'Key': key,
                'Value': value ? String(value) : ''
            };

            const recordId = existingKeys[key];
            if (recordId) {
                // Update
                await updateRecord(appToken, adminSettingsTableId, recordId, fieldsData);
            } else {
                // Insert
                await createRecord(appToken, adminSettingsTableId, fieldsData);
            }
        }

        return {
            success: true,
            message: 'Stripe Configuration saved successfully'
        };
    } catch (error: any) {
        console.error('Failed to save Stripe config:', error);
        throw createError({ statusCode: 500, message: 'Failed to save Stripe Configuration' });
    }
});
