import { prisma } from '../../../utils/prisma';

/**
 * POST /api/admin/sites/register — Register a new subdomain site
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { subdomain, industryName, siteName, cfAccountId, cfApiToken, cfZoneId, cfEmail } = body;

    if (!subdomain) throw createError({ statusCode: 400, message: 'Subdomain is required' });
    if (!industryName) throw createError({ statusCode: 400, message: 'Industry name is required' });

    // Validate subdomain format
    if (!/^[a-z0-9-]+$/.test(subdomain)) {
        throw createError({ statusCode: 400, message: 'Invalid subdomain: use only lowercase letters, numbers, dashes' });
    }

    // Check uniqueness
    const existing = await prisma.industrySite.findFirst({
        where: { OR: [{ sub_domain: subdomain }, { subdomain: subdomain }] }
    });
    if (existing) {
        throw createError({ statusCode: 409, message: `Subdomain "${subdomain}" already exists` });
    }

    try {
        const site = await prisma.industrySite.create({
            data: {
                site_name: siteName || `${industryName} News`,
                site_title: `${industryName} - Latest News & Insights`,
                industry_name: industryName,
                sub_domain: subdomain,
                subdomain: subdomain,
                site_status: 'active',
                is_active: true,
                // CF credentials
                cf_account_id: cfAccountId || null,
                cf_api_token: cfApiToken || null,
                cf_zone_id: cfZoneId || null,
                cf_email: cfEmail || `${subdomain}@c9.pub`,
                cf_dns_created: false,
                // AI defaults
                ai_news_enabled: true,
                ai_news_count: 2,
                ai_focus_keyword: industryName,
                // SEO defaults
                seo_title: `${industryName} News - Industry Updates & Analysis`,
                seo_description: `Stay up to date with the latest ${industryName.toLowerCase()} news, market trends, technology insights and professional analysis.`,
                seo_keywords: industryName.toLowerCase(),
                robots_meta: 'index,follow',
                schema_type: 'NewsMediaOrganization',
                canonical_url: `https://${subdomain}.b-2b.com`,
                // Templates
                header_style_id: 'header-01',
                footer_style_id: 'footer-01',
                banner_style_id: 'banner-01',
                news_list_style_id: 'news-list-01',
                news_detail_style_id: 'news-detail-01',
            }
        });

        return {
            success: true,
            message: `Site "${subdomain}.b-2b.com" registered successfully`,
            site: {
                id: site.id,
                subdomain,
                industryName,
            }
        };
    } catch (error: any) {
        throw createError({ statusCode: 500, message: error.message });
    }
});
