export default defineEventHandler(async (event) => {
    // Authenticate via cookie JWT (same pattern as stats.get.ts / me.get.ts)
    const token = getCookie(event, 'auth_token');
    if (!token) {
        throw createError({ statusCode: 401, message: 'Not authenticated' });
    }
    const payload = userAuth.verifyToken(token);
    if (!payload) {
        throw createError({ statusCode: 401, message: 'Invalid or expired token' });
    }

    try {

        const body = await readBody(event)
        const { title, content, image_url, siteId, featured, trending, author, publishedAt, slug } = body

        if (!title || !content) {
            throw createError({ statusCode: 400, message: 'Title and content are required' })
        }

        // 1. Get user details from Lark to check limits
        const larkUser = await userRepository.findByUsernameOrEmail(payload.username)
        if (!larkUser) {
            throw createError({ statusCode: 404, message: 'User record not found' })
        }

        // 2. Check limits against real plan data or fallbacks
        const tier = (larkUser.fields.user_type || 'user').toLowerCase()
        const remains = Number(larkUser.fields.remaining_posts || 0)
        const isUnlimited = tier === 'admin' || tier === 'vip'

        // Fallback logic: if no plan found but it's a VIP tier, we still respect remaining_posts
        if (!isUnlimited && remains <= 0) {
            throw createError({
                statusCode: 403,
                message: 'You have reached your publishing limit. Please upgrade your plan.'
            })
        }

        // 3. Logic for site association — siteId is now always a direct Lark record ID
        let finalSiteIds: string[] = []
        if (siteId && siteId !== 'other') {
            finalSiteIds = [siteId]
        }
        // Note: If siteId is 'other' or missing, finalSiteIds remains [], 
        // which means it appears on the main domain only (not linked to any Industry Site).

        // 4. Create news record
        const news = await newsRepository.createNews({
            news_title: title,
            news_content: content,
            generation_method: 'Manual',
            site_id: finalSiteIds,
            featured_image: image_url,
            author_email: author || larkUser.fields.email || larkUser.fields.username,
            release_status: (featured || trending) ? 'Trending' : 'Published',
            slug: slug,
            release_time: publishedAt ? new Date(publishedAt).getTime() : Date.now()
        })



        // 4. Update user's remaining posts count
        if (larkUser.record_id && larkUser.fields.remaining_posts !== undefined && larkUser.fields.remaining_posts > 0) {
            await userRepository.updateUser(larkUser.record_id, {
                remaining_posts: Number(larkUser.fields.remaining_posts) - 1
            })
        }

        return {
            success: true,
            news: {
                id: news.record_id,
                title: news.fields.news_title
            }
        }
    } catch (error: any) {
        // error logging removed for cloudflare compatibility


        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to create post'
        })
    }
})
