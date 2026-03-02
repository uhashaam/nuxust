export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    // SECURITY: In a real app, this should be protected by a master key or deleted after use
    const usersToCreate = [
        { username: 'superadmin', email: 'admin@b-2b.com', user_type: 'admin', remaining_posts: 9999 },
        { username: 'hashaam_v1', email: 'vip1@b-2b.com', user_type: 'vip1', remaining_posts: 4 },
        { username: 'sm_v2', email: 'vip2@b-2b.com', user_type: 'vip2', remaining_posts: 28 },
        { username: 'robin_v3', email: 'vip3@b-2b.com', user_type: 'vip3', remaining_posts: 56 },
        { username: 'hashaam_v4', email: 'vip4@b-2b.com', user_type: 'vip4', remaining_posts: 84 },
        { username: 'viewer_h', email: 'user@b-2b.com', user_type: 'user', remaining_posts: 0 },
    ];

    const passwordHash = await userAuth.hashPassword('Password786!');
    const results = [];

    for (const u of usersToCreate) {
        try {
            // Check if user exists by username (primary for now)
            const existing = await userRepository.findByUsernameOrEmail(u.username).catch(e => {
                
                return null;
            });
            if (existing) {
                await userRepository.updateUser(existing.record_id!, {
                    username: u.username,
                    email: u.email,
                    password_hash: passwordHash,
                    user_type: u.user_type as any,
                    remaining_posts: u.remaining_posts
                });
                results.push({ username: u.username, status: 'updated', id: existing.record_id });
                continue;
            }

            const newUser = await userRepository.createUser({
                username: u.username,
                email: u.email,
                password_hash: passwordHash,
                user_type: u.user_type as any,
                remaining_posts: u.remaining_posts,
                bound_site_id: []
            });
            results.push({ username: u.username, status: 'created', id: newUser.record_id });
        } catch (error: any) {
            
            results.push({
                username: u.username,
                status: 'error',
                message: error.message || 'Unknown error',
                details: error.data || error.response?.data || null
            });
        }
    }

    // --- Seed Dummy News ---
    const newsToCreate = [
        {
            title: 'Solar Energy Revolution: New Efficient Panels Released',
            category: 'Solar Energy',
            content: '<h2>Efficiency Breakthrough</h2><p>Researchers have achieved 30% efficiency in commercial silicon solar cells...</p>',
            publishedAt: new Date().getTime(),
            slug: 'solar-energy-revolution-2026'
        },
        {
            title: 'Manufacturing Trends: Automation in the Laser Industry',
            category: 'Manufacturing',
            content: '<h2>Laser Focus</h2><p>Industrial lasers are seeing record adoption rates in 2026 for precision cutting...</p>',
            publishedAt: new Date().getTime(),
            slug: 'manufacturing-trends-laser-2026'
        },
        {
            title: 'Global Trade Policy Update for 2026',
            category: 'Industry',
            content: '<h2>New Regulations</h2><p>A summary of the latest international trade agreements affecting electronics...</p>',
            publishedAt: new Date().getTime(),
            slug: 'global-trade-policy-2026'
        }
    ];

    const newsTableId = config.public.larkTableIds.newsContent;
    const newsResults = [];

    if (newsTableId) {
        for (const n of newsToCreate) {
            try {
                const record = await createRecord(config.larkBaseAppToken, newsTableId, {
                    "news_title": n.title,
                    "news_content": n.content,
                    "generation_method": "Manual",
                    "release_time": n.publishedAt,
                    "release_status": "Published"
                });
                newsResults.push({ title: n.title, status: 'created', id: record.record_id });
            } catch (error: any) {
                
                newsResults.push({
                    title: n.title,
                    status: 'error',
                    message: error.message,
                    details: error.data || error.response?.data || null
                });
            }
        }
    }

    return {
        success: true,
        userSummary: results,
        newsSummary: newsResults
    };
});
