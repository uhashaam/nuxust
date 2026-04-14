import { prisma } from '../../utils/prisma';
import { generateIndustryNews } from '../../utils/ai';
import { newsRepository } from '../../utils/newsRepository';
import { computeSeoScore } from '../../utils/seoScorer';

/**
 * GET /api/cron/generate-news — Automated AI news generation
 * 
 * Secured by CRON_SECRET. Designed to be called by an external scheduler
 * (cron-job.org, etc.) once or twice daily.
 * 
 * For each site with ai_news_enabled = true, generates ai_news_count articles
 * with industry-specific, keyword-targeted content.
 */
export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const config = useRuntimeConfig();

    // Security check
    if (query.secret !== (config as any).cronSecret) {
        throw createError({ statusCode: 401, message: 'Unauthorized' });
    }

    try {
        // Fetch all sites with AI enabled
        const sites = await prisma.industrySite.findMany({
            where: {
                OR: [
                    { ai_news_enabled: true },
                    { ai_news_toggle: true }         // backwards compat
                ]
            }
        });

        let totalGenerated = 0;
        let totalFailed = 0;
        const results: any[] = [];

        for (const site of sites) {
            const industryName = (site as any).industry_name;
            const siteId = site.id;
            const focusKeyword = (site as any).ai_focus_keyword || industryName;
            const articleCount = (site as any).ai_news_count || 2;

            if (!industryName) {
                results.push({ site: (site as any).sub_domain, status: 'skipped', reason: 'No industry name' });
                continue;
            }

            const siteArticles: any[] = [];

            for (let i = 0; i < articleCount; i++) {
                try {
                    const aiResult = await generateIndustryNews(industryName);
                    const releaseStatus = aiResult.isSafe ? 'Published' : 'Draft';

                    // Compute SEO score for the generated article
                    const seoAnalysis = computeSeoScore({
                        title: aiResult.title,
                        seoTitle: aiResult.title,
                        metaDescription: aiResult.content.substring(0, 160).replace(/<[^>]*>/g, ''),
                        focusKeyword: focusKeyword,
                        content: aiResult.content,
                    });

                    // Save to DB
                    await newsRepository.createNews({
                        site_id: [siteId],
                        news_title: aiResult.title,
                        news_content: aiResult.content,
                        generation_method: 'AI',
                        release_status: releaseStatus,
                        author_email: 'ai-robot@b-2b.com',
                    });

                    totalGenerated++;
                    siteArticles.push({
                        title: aiResult.title,
                        status: releaseStatus,
                        seoScore: seoAnalysis.percentage,
                    });
                } catch (err: any) {
                    totalFailed++;
                    siteArticles.push({ status: 'failed', error: err.message });
                }
            }

            // Update last run timestamp
            try {
                await prisma.industrySite.update({
                    where: { id: siteId },
                    data: { ai_last_run: BigInt(Date.now()) }
                });
            } catch (e) { /* non-critical */ }

            results.push({
                site: (site as any).sub_domain || (site as any).subdomain,
                industry: industryName,
                articles: siteArticles,
            });
        }

        return {
            success: true,
            summary: {
                sitesProcessed: sites.length,
                totalGenerated,
                totalFailed,
            },
            results,
        };
    } catch (error: any) {
        throw createError({ statusCode: 500, message: 'Cron news generation failed: ' + error.message });
    }
});
