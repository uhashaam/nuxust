import { newsRepository } from '../../utils/newsRepository';
import { generateIndustryNews } from '../../utils/ai';
import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
    // Optional: Add a simple auth guard for cron job
    const query = getQuery(event);
    const config = useRuntimeConfig();

    try {
        // 1. Fetch all industry sites using Prisma
        const sites = await prisma.industrySite.findMany();

        let successCount = 0;
        let pendingReviewCount = 0;
        let failCount = 0;
        const results = [];

        for (const site of sites) {
            // Check if AI News Generation is enabled for this site
            const aiToggle = site.ai_news_toggle;
            if (aiToggle === true) {
                const industryName = site.industry_name;
                const siteId = site.id;

                if (!industryName) continue;

                try {
                    // 2. Generate News via Unified AI Utility
                    const aiResult = await generateIndustryNews(industryName);

                    // 3. Determine publish status based on filter
                    const releaseStatus = aiResult.isSafe ? 'Published' : 'Pending Review';

                    // 4. Save to MySQL via newsRepository
                    await newsRepository.createNews({
                        site_id: [siteId], // Link to Industry Site record ID
                        news_title: aiResult.title,
                        news_content: aiResult.content,
                        generation_method: 'AI',
                        release_status: releaseStatus,
                        author_email: 'ai-robot@b-2b.com'
                    });

                    if (aiResult.isSafe) successCount++;
                    else pendingReviewCount++;

                    results.push({ site: industryName, status: releaseStatus, title: aiResult.title });

                } catch (err: any) {
                    failCount++;
                    results.push({ site: industryName, status: 'Failed', error: err.message });
                }
            }
        }

        return {
            success: true,
            summary: {
                totalGenerated: successCount + pendingReviewCount,
                published: successCount,
                pendingReview: pendingReviewCount,
                failed: failCount
            },
            results
        };

    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: 'Failed to process AI auto-generation'
        });
    }
});
