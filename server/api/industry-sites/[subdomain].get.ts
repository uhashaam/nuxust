import { fetchAllRecords } from '../../utils/lark/base'

/**
 * Get a specific industry site by subdomain
 */
export default defineEventHandler(async (event) => {
    try {
        const subdomain = getRouterParam(event, 'subdomain')

        if (!subdomain) {
            throw createError({
                statusCode: 400,
                message: 'Subdomain parameter is required'
            })
        }

        const config = useRuntimeConfig()
        const appToken = config.larkBaseAppToken
        const tableId = config.public.larkTableIndustrySites

        if (!appToken || !tableId) {
            throw createError({
                statusCode: 500,
                message: 'Lark Base configuration missing'
            })
        }

        // Fetch all records and filter by subdomain
        // Note: Lark Base API filter syntax might differ, this is a simple approach
        const records = await fetchAllRecords(appToken, tableId)
        const record = records.find(r => r.fields.subdomain === subdomain)

        if (!record) {
            throw createError({
                statusCode: 404,
                message: `Industry site with subdomain "${subdomain}" not found`
            })
        }

        return {
            success: true,
            site: {
                id: record.record_id,
                industryName: record.fields.industry_name,
                subdomain: record.fields.subdomain,
                sslStatus: record.fields.ssl_status,
                headerStyleId: record.fields.header_style_id,
                footerStyleId: record.fields.footer_style_id,
                bannerStyleId: record.fields.banner_style_id,
                newsDetailStyleId: record.fields.news_detail_style_id,
                newsListStyleId: record.fields.news_list_style_id,
                siteStatus: record.fields.site_status,
                boundUserId: record.fields.bound_user_id,
                aiNewsToggle: record.fields.ai_news_toggle,
                aboutText: record.fields.about_text
            }
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to fetch industry site'
        })
    }
})
