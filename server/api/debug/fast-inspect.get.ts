import { getLarkClient } from '../../utils/lark/auth'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const query = getQuery(event);
    const tableId = (query.table as string) || config.public.larkTableIds.newsContent;
    const appToken = config.larkBaseAppToken;

    if (!appToken || !tableId) {
        return { success: false, message: 'Missing config' }
    }

    try {
        const client = getLarkClient()
        const response = await client.bitable.appTableRecord.list({
            path: {
                app_token: appToken,
                table_id: tableId,
            },
            params: {
                page_size: 10,
                sort: JSON.stringify([{ field_name: 'release_time', desc: true }])
            }
        })

        const fieldsList = await client.bitable.appTableField.list({
            path: {
                app_token: appToken,
                table_id: tableId,
            }
        })

        const record = response.data?.items?.[0]
        return {
            success: true,
            tableId,
            recordId: record?.record_id,
            fields: record?.fields,
            schemaFields: fieldsList.data?.items?.map(f => ({ name: f.field_name, type: f.type }))
        }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
})
