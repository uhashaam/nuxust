import { newsRepository } from '../../utils/newsRepository'

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
        const { id } = body

        if (!id) {
            throw createError({ statusCode: 400, message: 'Post ID is required' })
        }

        // 1. Verify ownership if necessary (optional for now, or check site_id)

        // 2. Delete from Lark
        const success = await newsRepository.deleteNews(id)

        return {
            success
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to delete post'
        })
    }
})
