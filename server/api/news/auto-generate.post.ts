import { fetchAllRecords } from '../../utils/lark/base';
import { newsRepository } from '../../utils/newsRepository';
import { generateIndustryNews } from '../../utils/ai';

export default defineEventHandler(async (event) => {
    // Optional: Add a simple auth guard for cron job (e.g., ?cron_secret=XYZ)
    const query = getQuery(event);
    const config = useRuntimeConfig();

    // You could define a CRON_SECRET in .env for security
    // if (query.secret !== process.env.CRON_SECRET) {
    //     throw createError({ statusCode: 401, message: 'Unauthorized' });
    // }

    const appToken = config.larkBaseAppToken;
    const tableId = config.public.larkTableIndustrySites;

    if (!appToken || !tableId) {
        throw createError({ statusCode: 500, message: 'Lark Base configuration missing.' });
    }

    try {
        // 1. Fetch all industry sites
        const records = await fetchAllRecords(appToken, tableId);

        let successCount = 0;
        let pendingReviewCount = 0;
        let failCount = 0;
        const results = [];

        for (const record of records) {
            // Check if AI News Generation is enabled for this site
            // Adjust the exact string 'Enabled' or boolean true depending on your Lark Base option
            const aiToggle = record.fields.ai_news_toggle;
            if (aiToggle === 'Enabled' || aiToggle === true || aiToggle === 'Yes') {
                const industryName = record.fields.industry_name;
                const siteId = record.record_id;

                if (!industryName) continue;

                try {
                    // 2. Generate News via Unified AI Utility
                    const aiResult = await generateIndustryNews(industryName);

                    // 3. Determine publish status based on filter
                    const releaseStatus = aiResult.isSafe ? 'Published' : 'Pending Review';

                    // 4. Save to Lark Base News Table with Association Logic
                    await newsRepository.createNews({
                        site_id: [siteId], // Link to Industry Site record
                        news_title: aiResult.title,
                        news_content: aiResult.content,
                        generation_method: 'AI',
                        release_status: releaseStatus,
                        author_email: 'ai-robot@b-2b.com',
                        // Association Logic: Link style settings from the site record
                        news_style_id: record.fields.news_style_id || '01',
                        news_list_style_id: record.fields.news_list_style_id || '01'
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
