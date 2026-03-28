import { prisma } from '../../utils/prisma'

/**
 * Get a specific industry site by subdomain
 */
export default defineCachedEventHandler(async (event) => {
    try {
        const subdomainParam = getRouterParam(event, 'subdomain')

        if (!subdomainParam) {
            throw createError({
                statusCode: 400,
                message: 'Subdomain parameter is required'
            })
        }

        const record = await prisma.industrySite.findFirst({
            where: {
                OR: [
                    { sub_domain: subdomainParam },
                    { subdomain: subdomainParam }
                ]
            }
        })

        if (!record) {
            throw createError({
                statusCode: 404,
                message: `Industry site with subdomain "${subdomainParam}" not found`
            })
        }

        return {
            success: true,
            site: {
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
                aboutText: record.about_text
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
}, {
    maxAge: 60 * 60, // 1 hour
    swr: true,
    getKey: (event) => `industry-site-${getRouterParam(event, 'subdomain') || 'default'}`
})
