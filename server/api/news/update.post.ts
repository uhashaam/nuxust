import { newsRepository } from '../../utils/newsRepository'

export default defineEventHandler(async (event) => {
    try {
        // Authenticate via cookie JWT
        const token = getCookie(event, 'auth_token');
        if (!token) {
            throw createError({ statusCode: 401, message: 'Not authenticated' });
        }

        let payload;
        try {
            payload = await userAuth.verifyToken(token);
        } catch (authErr: any) {
            throw createError({ statusCode: 401, message: `Token verification failed: ${authErr.message}` });
        }

        if (!payload) {
            throw createError({ statusCode: 401, message: 'Invalid or expired token' });
        }

        const body = await readBody(event)
        const { id, title, content, release_status, featured_image, siteId, author, publishedAt, slug } = body

        if (!id) {
            throw createError({ statusCode: 400, message: 'Post ID is required' })
        }

        const updates: any = {}
        if (title !== undefined) updates.news_title = title
        if (content !== undefined) updates.news_content = content
        if (release_status !== undefined) updates.release_status = release_status
        if (author !== undefined) updates.author_email = author
        if (publishedAt !== undefined) updates.release_time = new Date(publishedAt).getTime()

        // Handle site association
        if (siteId !== undefined) {
            updates.site_id = siteId ? [siteId] : []
        }

        // Note: 'slug' and 'category' are NOT fields in the Lark News table - strip them to avoid FieldNameNotFound errors

        // Handle featured_image carefully
        if (featured_image !== undefined) {
            if (typeof featured_image === 'string' && featured_image.startsWith('data:image')) {
                // Skip base64, Lark doesn't support it as attachment
            } else {
                updates.featured_image = featured_image
            }
        }

        // Update news record in Lark
        const news = await newsRepository.updateNews(id, updates)

        return {
            success: true,
            news: {
                id: news.record_id,
                title: news.fields.news_title
            }
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: `[Nuxt API Error - Global]: ${error.message || error.statusMessage || String(error)}`
        })
    }
})
