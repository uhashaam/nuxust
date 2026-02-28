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
            'smtp_host', 'smtp_port', 'smtp_user', 'smtp_from_email', 'smtp_from_name'
        ];

        // Only process password if it's not the masked placeholder
        if (body.smtp_password && body.smtp_password !== '********') {
            keysToUpdate.push('smtp_password');
        }

        // Loop through keys and update or insert
        for (const key of keysToUpdate) {
            const value = body[key];

            // Note: Since Lark tables can have varying column names, we try "Key/Value" 
            const fieldsData = {
                'Key': key,
                'Value': value ? String(value) : ''
            };

            // You might need to adjust 'Key' and 'Value' based on your actual column names in Lark.
            // Some Chinese templates use '键' and '值'. I'll stick to 'Key' and 'Value' as per standard convention.

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
            message: 'SMTP Configuration saved successfully'
        };
    } catch (error: any) {
        console.error('Failed to save SMTP config:', error);
        throw createError({ statusCode: 500, message: 'Failed to save SMTP Configuration' });
    }
});
