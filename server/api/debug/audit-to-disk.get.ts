import { getLarkClient } from '../../utils/lark/auth'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const tableId = config.public.larkTableIds.newsContent;

    try {
        const client = getLarkClient()
        const response = await client.bitable.appTableField.list({
            path: {
                app_token: appToken,
                table_id: tableId,
            }
        })

        if (response.code !== 0) {
            return { success: false, code: response.code, msg: response.msg }
        }

        const fields = response.data?.items?.map(f => ({
            name: f.field_name,
            type: f.type,
            id: f.field_id
        }))

        // Use a fixed path in the project root for reliability
        const outputPath = 'E:\\nuxt-ssg-project\\news_fields_audit.json'
        fs.writeFileSync(outputPath, JSON.stringify(fields, null, 2))

        return {
            success: true,
            count: fields?.length,
            path: outputPath,
            fields: fields
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
})
