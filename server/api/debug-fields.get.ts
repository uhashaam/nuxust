import { getLarkClient } from '../utils/lark/auth'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const client = getLarkClient()
    const appToken = config.larkBaseAppToken

    if (!appToken) return { error: 'Missing appToken' }

    const tableIds = {
        users: config.public.larkTableIds.users,
        news: config.public.larkTableIds.newsContent
    }

    const results: any = {}

    for (const [key, id] of Object.entries(tableIds)) {
        if (!id) {
            results[key] = { error: 'Missing tableId' }
            continue
        }
        try {
            // Get table field list
            const response = await client.bitable.appTableField.list({
                path: {
                    app_token: appToken,
                    table_id: id as string
                }
            })

            if (response.code === 0) {
                results[key] = {
                    fields: response.data?.items?.map(f => ({
                        name: f.field_name,
                        type: f.type,
                        id: f.field_id
                    }))
                }
            } else {
                results[key] = { error: response.msg, code: response.code }
            }
        } catch (err: any) {
            results[key] = { error: err.message }
        }
    }

    return results
})
