import { batchCreateRecords } from '../../utils/lark/base'

const INITIAL_SITES = [
    {
        industry_name: 'Laser Welder',
        subdomain: 'lasewelder',
        ssl_status: 'Pending',
        header_style_id: 1,
        footer_style_id: 1,
        banner_style_id: 1,
        news_detail_style_id: 2,
        news_list_style_id: 1,
        site_status: true,
        ai_news_toggle: true
    },
    {
        industry_name: 'Laser Cleaner',
        subdomain: 'laserleaner',
        ssl_status: 'Pending',
        header_style_id: 6,
        footer_style_id: 5,
        banner_style_id: 1,
        news_detail_style_id: 2,
        news_list_style_id: 5,
        site_status: true,
        ai_news_toggle: true
    },
    {
        industry_name: 'Laser Cutter',
        subdomain: 'lasercutter',
        ssl_status: 'Pending',
        header_style_id: 1,
        footer_style_id: 1,
        banner_style_id: 1,
        news_detail_style_id: 1,
        news_list_style_id: 3,
        site_status: true,
        ai_news_toggle: true
    },
    {
        industry_name: 'Laser Marking',
        subdomain: 'lasermarking',
        ssl_status: 'Pending',
        header_style_id: 6,
        footer_style_id: 6,
        banner_style_id: 1,
        news_detail_style_id: 2,
        news_list_style_id: 5,
        site_status: true,
        ai_news_toggle: true
    }
]

/**
 * Import initial 4 laser industry sites into Lark Base
 */
export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const appToken = config.larkBaseAppToken
        const tableId = config.larkTableIndustrySites

        if (!appToken || !tableId) {
            throw createError({
                statusCode: 500,
                message: 'Lark Base configuration missing'
            })
        }

        // Prepare records
        const records = INITIAL_SITES.map(site => ({
            fields: site
        }))

        // Import to Lark Base
        const result = await batchCreateRecords(appToken, tableId, records)

        return {
            success: true,
            message: '4 laser industry sites imported successfully',
            imported: result.length,
            sites: result.map((record, index) => ({
                recordId: record.record_id,
                industryName: INITIAL_SITES[index].industry_name,
                subdomain: INITIAL_SITES[index].subdomain,
                url: `${INITIAL_SITES[index].subdomain}.b-2b.com`
            }))
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to import sites'
        })
    }
})
