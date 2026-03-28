import { prisma } from '../../utils/prisma'

/**
 * Fetch all industry sites from Prisma Database
 */
export default defineEventHandler(async (event) => {
    try {
        const sites = await prisma.industrySite.findMany({
            where: { is_active: true }
        })

        // Transform records to the exact format UI expects
        const formattedSites = sites.map((record: any) => ({
            id: record.id,
            industryName: record.industry_name,
            subdomain: record.subdomain || record.sub_domain,
            sslStatus: record.ssl_status,
            headerStyleId: record.header_style_id,
            footerStyleId: record.footer_style_id,
            bannerStyleId: record.banner_style_id,
            newsDetailStyleId: record.news_detail_style_id,
            newsListStyleId: record.news_list_style_id,
            siteStatus: record.site_status,
            boundUserId: record.bound_user_id,
            aiNewsToggle: record.ai_news_toggle,
            ...record
        }))

        return {
            success: true,
            count: formattedSites.length,
            sites: formattedSites
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to fetch industry sites'
        })
    }
})
