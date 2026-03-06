import { fetchRecords, updateRecord, createRecord } from '../../utils/lark/base';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const tableId = config.larkTableAdminSettings;
    const resendKey = 're_J47TEHVi_KbPWJxEtjn72CRKpKPZCPNpk';

    if (!appToken || !tableId) {
        return { success: false, message: 'Lark configuration missing' };
    }

    try {
        const result = await fetchRecords(appToken, tableId);
        const records = result.records || [];

        const existingRecord = records.find(r =>
            r.fields.Key === 'resend_api_key' ||
            r.fields['Setting Name'] === 'resend_api_key'
        );

        if (existingRecord) {
            await updateRecord(appToken, tableId, existingRecord.record_id!, {
                'Value': resendKey
            });
            return { success: true, message: 'Resend API Key updated successfully in Lark.' };
        } else {
            await createRecord(appToken, tableId, {
                'Key': 'resend_api_key',
                'Value': resendKey
            });
            return { success: true, message: 'Resend API Key created successfully in Lark.' };
        }
    } catch (error: any) {
        return { success: false, message: error.message };
    }
});
