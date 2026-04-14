import { prisma } from '../../../utils/prisma';

/**
 * GET /api/admin/sites — List all industry sites for Site Manager
 */
export default defineEventHandler(async (event) => {
    try {
        const sites = await prisma.industrySite.findMany({
            orderBy: { createdAt: 'desc' }
        });

        const formattedSites = sites.map((s: any) => ({
            id: s.id,
            siteName: s.site_name,
            siteTitle: s.site_title,
            industryName: s.industry_name,
            subdomain: s.subdomain || s.sub_domain,
            siteStatus: s.site_status,
            isActive: s.is_active,
            // CF status
            cfConfigured: !!(s.cf_api_token && s.cf_account_id),
            cfDnsCreated: !!s.cf_dns_created,
            cfEmail: s.cf_email,
            // AI status
            aiNewsEnabled: !!s.ai_news_enabled,
            aiNewsCount: s.ai_news_count || 2,
            aiLastRun: s.ai_last_run ? Number(s.ai_last_run) : null,
            // SEO
            seoTitle: s.seo_title,
            seoDescription: s.seo_description,
            seoKeywords: s.seo_keywords,
            createdAt: s.createdAt,
        }));

        return {
            success: true,
            count: formattedSites.length,
            sites: formattedSites,
        };
    } catch (error: any) {
        throw createError({ statusCode: 500, message: error.message || 'Failed to fetch sites' });
    }
});
