import { getLarkClient } from '../../utils/lark/auth'
import fs from 'fs'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const tableId = config.public.larkTableIds.newsContent;

    if (!appToken || !tableId) {
        return { success: false, message: 'Missing Lark configuration' }
    }

    try {
        const client = getLarkClient()

        // 1. Get current fields
        const response = await client.bitable.appTableField.list({
            path: {
                app_token: appToken,
                table_id: tableId,
            }
        })

        if (response.code !== 0) {
            return { success: false, code: response.code, msg: response.msg }
        }

        const currentFields = response.data?.items?.map(f => f.field_name) || []
        const created = []
        const errors = []

        // 2. Add missing fields
        if (!currentFields.includes('author_email')) {
            const res = await client.bitable.appTableField.create({
                path: { app_token: appToken, table_id: tableId },
                data: {
                    field_name: 'author_email',
                    type: 1 // Text
                }
            })
            if (res.code === 0) created.push('author_email')
            else errors.push({ field: 'author_email', code: res.code, msg: res.msg })
        }

        if (!currentFields.includes('featured_image')) {
            const res = await client.bitable.appTableField.create({
                path: { app_token: appToken, table_id: tableId },
                data: {
                    field_name: 'featured_image',
                    type: 17 // Attachment
                }
            })
            if (res.code === 0) created.push('featured_image')
            else errors.push({ field: 'featured_image', code: res.code, msg: res.msg })
        }

        const result = {
            success: errors.length === 0,
            message: created.length > 0 ? `Created fields: ${created.join(', ')}` : 'Table schema is already correct',
            created,
            errors,
            currentFields
        }

        fs.writeFileSync('E:\\nuxt-ssg-project\\repair_log.json', JSON.stringify(result, null, 2))

        return result
    } catch (error: any) {
        fs.writeFileSync('E:\\nuxt-ssg-project\\repair_log.json', JSON.stringify({ success: false, error: error.message }, null, 2))
        return { success: false, error: error.message }
    }
})
