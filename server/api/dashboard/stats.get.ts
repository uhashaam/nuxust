export default defineEventHandler(async (event) => {
    // Authenticate request using the auth cookie (same pattern as /api/auth/me)
    const token = getCookie(event, 'auth_token');
    if (!token) {
        throw createError({ statusCode: 401, message: 'Not authenticated' });
    }

    const payload = userAuth.verifyToken(token);
    if (!payload) {
        throw createError({ statusCode: 401, message: 'Invalid or expired token' });
    }

    try {
        // 1. Fetch live user data from Lark
        const user = await userRepository.findByUsernameOrEmail(payload.username);
        if (!user) {
            throw createError({ statusCode: 404, message: 'User not found in Lark' });
        }

        const tier = user.fields.user_type || 'user';
        const userEmail = user.fields.email || user.fields.username;

        

        // 2. Fetch user's posts
        const news = await newsRepository.getNewsByAuthor(userEmail);

        // 3. Fetch plan details
        const plan = await planRepository.findByTier(tier);

        

        // Fallback limits if plan record is missing in Lark
        const fallbackLimits: Record<string, { daily: number, weekly: number }> = {
            'vip1': { daily: 1, weekly: 4 },
            'vip2': { daily: 4, weekly: 28 },
            'vip3': { daily: 8, weekly: 56 },
            'vip4': { daily: 12, weekly: 84 },
            'admin': { daily: 9999, weekly: 9999 },
            'user': { daily: 0, weekly: 0 }
        };

        const limits = plan ? {
            daily: Number(plan.fields.daily_publish_limit || 0),
            weekly: Number(plan.fields.weekly_publish_limit || 0)
        } : (fallbackLimits[tier.toLowerCase()] || fallbackLimits.user) || { daily: 0, weekly: 0 };

        const result = {
            success: true,
            user: {
                id: user.record_id,
                username: user.fields.username,
                role: tier,
                remainingPosts: Number(user.fields.remaining_posts || 0),
                status: user.fields.user_status || 'active'
            },
            posts: news.map(n => {
                const rt = n.fields.release_time;
                const ts = Number(rt);
                let date: Date;
                if (!ts || isNaN(ts)) {
                    date = new Date();
                } else {
                    date = new Date(ts > 10000000000 ? ts : ts * 1000);
                    // Check for invalid date
                    if (isNaN(date.getTime())) {
                        date = new Date();
                    }
                }
                return {
                    id: n.record_id,
                    title: n.fields.news_title,
                    date: date.toISOString().split('T')[0],
                    status: n.fields.release_status
                };
            }),
            plan: {
                id: plan?.fields.plan_id || tier,
                name: plan?.fields.plan_tier || tier.toUpperCase(),
                dailyLimit: limits.daily,
                weeklyLimit: limits.weekly,
                limit: limits.weekly || limits.daily
            }
        };

        return result;
    } catch (error: any) {
        // error logging removed for cloudflare compatibility


        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch dashboard data'
        });
    }
});
