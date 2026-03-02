
import { batchCreateRecords } from '../../utils/lark/base';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const tableId = config.public.larkTableNewsContent;

    if (!appToken || !tableId) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Lark Base configuration missing (appToken or newsContent tableId)'
        });
    }

    // Raw data from useNews.ts
    const newsData = [
        {
            id: '1',
            title: 'Global Tech Summit 2024: The Future of AI in Manufacturing',
            category: 'Industry',
            content: '<h2>The Next Industrial Revolution</h2><p>The annual Global Tech Summit kicked off this morning with a focus on artificial intelligence...</p><h3>Key Takeaways</h3><ul style="padding-left: 20px;"><li>AI-driven automation is increasing efficiency by 30%.</li><li>Cloud-edge computing is the new standard.</li><li>Sustainability is no longer optional.</li></ul>',
            excerpt: 'Exploring the transformative impact of AI on the global manufacturing landscape at the 2024 Tech Summit.',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80',
            imageAlt: 'Global Tech Summit 2024 hall with AI displays',
            author: 'Sarah Jenkins',
            publishedAt: '2024-03-15',
            featured: true,
            trending: true,
            tags: ['AI', 'Manufacturing', 'Technology'],
            slug: 'global-tech-summit-2024-future-ai-manufacturing'
        },
        {
            id: '2',
            title: 'Sustainable Energy Solutions: A New Benchmark for Enterprise',
            category: 'Enterprise',
            content: '<h2>Green Energy is Good Business</h2><p>Enterprises worldwide are pivoting towards sustainable energy as a core business strategy...</p>',
            excerpt: 'How the shift to renewable energy is redefining profitability and corporate responsibility in the modern era.',
            image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80',
            imageAlt: 'Modern solar panel array under clear blue sky',
            author: 'Michael Chen',
            publishedAt: '2024-03-20',
            featured: true,
            trending: true,
            tags: ['Energy', 'Sustainability', 'Green Tech'],
            slug: 'sustainable-energy-solutions-benchmark-enterprise'
        },
        {
            id: '3',
            title: 'Market Analysis: The Rise of Decentralized Infrastructure',
            category: 'Market',
            content: '<h2>Breaking Down The Data</h2><p>Our recent market analysis unveils a significant trend towards decentralized systems...</p>',
            excerpt: 'A deep dive into why industry leaders are abandoning traditional centralized architectures for more resilient models.',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
            imageAlt: 'Globe with digital connections',
            author: 'Dr. Alan Grant',
            publishedAt: '2024-04-01',
            featured: true,
            trending: false,
            tags: ['Market', 'Decentralized', 'Web3'],
            slug: 'market-analysis-rise-decentralized-infrastructure'
        }
    ];

    // Map to Lark Base fields with proper error handling for missing fields
    const recordsToCreate = newsData.map(item => {
        return {
            fields: {
                "News Title": item.title,
                "News Content": item.content, // HTML content
                "Industry Type": item.category,
                "Release Time": new Date(item.publishedAt).getTime(),
                "Release Status": "Published",
                "Generation Method": "Manual",
                "featured_image": item.image ? [{ url: item.image }] : [] // Ensure image is mapped
            }
        };
    });

    try {
        const results = await batchCreateRecords(appToken, tableId, recordsToCreate);
        return {
            success: true,
            migratedCount: results.length,
            records: results
        };
    } catch (error: any) {
        
        throw createError({
            statusCode: 500,
            statusMessage: `Migration failed: ${error.message}`
        });
    }
});
