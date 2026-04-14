import { prisma } from '../../../utils/prisma';

/**
 * PATCH /api/admin/sites/:id — Update any site fields
 */
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (!id) throw createError({ statusCode: 400, message: 'Site ID required' });

    const body = await readBody(event);

    // Build update data from allowed fields
    const allowedFields: Record<string, string> = {
        siteName: 'site_name',
        siteTitle: 'site_title',
        industryName: 'industry_name',
        metaDescription: 'meta_description',
        contactEmail: 'contact_email',
        contactPhone: 'contact_phone',
        address: 'address',
        socialLinks: 'social_links',
        aboutText: 'about_text',
        siteStatus: 'site_status',
        isActive: 'is_active',
        customCss: 'custom_css',
        // CF fields
        cfAccountId: 'cf_account_id',
        cfApiToken: 'cf_api_token',
        cfZoneId: 'cf_zone_id',
        cfEmail: 'cf_email',
        cfDnsCreated: 'cf_dns_created',
        // AI fields
        aiNewsEnabled: 'ai_news_enabled',
        aiNewsCount: 'ai_news_count',
        aiFocusKeyword: 'ai_focus_keyword',
        // SEO fields
        seoTitle: 'seo_title',
        seoDescription: 'seo_description',
        seoKeywords: 'seo_keywords',
        ogTitle: 'og_title',
        ogDescription: 'og_description',
        ogImage: 'og_image',
        canonicalUrl: 'canonical_url',
        robotsMeta: 'robots_meta',
        schemaType: 'schema_type',
        // Appearance
        headerStyleId: 'header_style_id',
        footerStyleId: 'footer_style_id',
        bannerStyleId: 'banner_style_id',
        newsListStyleId: 'news_list_style_id',
        newsDetailStyleId: 'news_detail_style_id',
        logo: 'logo',
        favicon: 'favicon',
    };

    const data: Record<string, any> = {};
    for (const [bodyKey, dbKey] of Object.entries(allowedFields)) {
        if (body[bodyKey] !== undefined) {
            data[dbKey] = body[bodyKey];
        }
    }

    if (Object.keys(data).length === 0) {
        throw createError({ statusCode: 400, message: 'No valid fields to update' });
    }

    try {
        const site = await prisma.industrySite.update({ where: { id }, data });
        return {
            success: true,
            message: 'Site updated',
            site: {
                id: site.id,
                subdomain: (site as any).subdomain || (site as any).sub_domain,
            }
        };
    } catch (error: any) {
        throw createError({ statusCode: 500, message: error.message });
    }
});
