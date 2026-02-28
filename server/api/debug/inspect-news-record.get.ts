import { fetchAllRecords } from '../../utils/lark/base'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const tableId = config.public.larkTableIds.newsContent;

    try {
        const records = await fetchAllRecords(appToken, tableId)
        if (records.length === 0) {
            return { success: true, message: 'No records found' }
        }

        const firstRecord = records[0]
        return {
            success: true,
            recordId: firstRecord.record_id,
            fields: firstRecord.fields,
            fieldNames: Object.keys(firstRecord.fields)
        }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
})
