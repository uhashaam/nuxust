import { newsRepository } from '../../utils/newsRepository'

export default defineEventHandler(async (event) => {
    // Authenticate via cookie JWT
    const token = getCookie(event, 'auth_token');
    if (!token) {
        throw createError({ statusCode: 401, message: 'Not authenticated' });
    }
    const payload = await userAuth.verifyToken(token);
    if (!payload) {
        throw createError({ statusCode: 401, message: 'Invalid or expired token' });
    }

    try {
        const body = await readBody(event)
        const { id, title, content, release_status, featured_image, category, author, publishedAt, slug } = body

        if (!id) {
            throw createError({ statusCode: 400, message: 'Post ID is required' })
        }

        const updates: any = {}
        if (title !== undefined) updates.news_title = title
        if (content !== undefined) updates.news_content = content
        if (release_status !== undefined) updates.release_status = release_status
        if (featured_image !== undefined) updates.featured_image = featured_image
        if (author !== undefined) updates.author_email = author
        if (publishedAt !== undefined) updates.release_time = new Date(publishedAt).getTime()
        if (slug !== undefined) updates.slug = slug

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
            message: error.message || 'Failed to update post'
        })
    }
})
