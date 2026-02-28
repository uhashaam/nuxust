import { getLarkClient } from '../../utils/lark/auth'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const tableId = config.public.larkTableIds.newsContent;

    console.log(`[Audit Debug] Starting news table audit. AppToken: ${appToken?.slice(0, 10)}..., TableId: ${tableId}`);

    if (!appToken || !tableId) {
        return { success: false, message: 'Lark config missing', appToken: !!appToken, tableId: !!tableId }
    }

    try {
        const client = getLarkClient()
        // Use a timeout wrapper if needed, but here let's just log more
        const response = await client.bitable.appTableField.list({
            path: {
                app_token: appToken,
                table_id: tableId,
            }
        })

        console.log(`[Audit Debug] Received response from Lark. Code: ${response.code}`);

        if (response.code !== 0) {
            return { success: false, code: response.code, msg: response.msg }
        }

        const fields = response.data?.items?.map(f => ({
            name: f.field_name,
            type: f.type,
            id: f.field_id,
            description: `Type code: ${f.type}`
        }))

        return {
            success: true,
            count: fields?.length,
            fields
        }
    } catch (error: any) {
        console.error('[Audit Exception] Failed to list fields:', error);
        return {
            success: false,
            error: error.message,
            stack: error.stack
        }
    }
})
