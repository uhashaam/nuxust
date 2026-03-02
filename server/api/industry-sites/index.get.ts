import { fetchAllRecords } from '../../utils/lark/base'

/**
 * Fetch all industry sites from Lark Base
 */
export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const appToken = config.larkBaseAppToken
        const tableId = config.public.larkTableIndustrySites

        if (!appToken || !tableId) {
            throw createError({
                statusCode: 500,
                message: 'Lark Base configuration missing. Please set LARK_BASE_APP_TOKEN and LARK_TABLE_INDUSTRY_SITES.'
            })
        }

        const records = await fetchAllRecords(appToken, tableId)

        // Transform records to a more usable format
        const sites = records.map(record => ({
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
            ...record.fields
        }))

        return {
            success: true,
            count: sites.length,
            sites
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to fetch industry sites'
        })
    }
})
