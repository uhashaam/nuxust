import { prisma } from '../../../utils/prisma';
import { computeSeoScore } from '../../../../utils/seoScorer';

/**
 * GET /api/admin/sites/:id — Get full site details including SEO score
 */
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (!id) throw createError({ statusCode: 400, message: 'Site ID required' });

    try {
        const site = await prisma.industrySite.findUnique({ where: { id } });
        if (!site) throw createError({ statusCode: 404, message: 'Site not found' });

        // Compute live SEO score
        const seoAnalysis = computeSeoScore({
            title: (site as any).site_title,
            seoTitle: (site as any).seo_title,
            metaDescription: (site as any).seo_description,
            focusKeyword: (site as any).seo_keywords?.split(',')[0],
            ogImage: (site as any).og_image,
            canonicalUrl: (site as any).canonical_url,
            robotsMeta: (site as any).robots_meta,
        });

        return {
            success: true,
            site: {
                ...site,
                subdomain: (site as any).subdomain || (site as any).sub_domain,
                cfConfigured: !!((site as any).cf_api_token && (site as any).cf_account_id),
                aiLastRun: (site as any).ai_last_run ? Number((site as any).ai_last_run) : null,
            },
            seoAnalysis,
        };
    } catch (error: any) {
        if (error.statusCode) throw error;
        throw createError({ statusCode: 500, message: error.message });
    }
});
