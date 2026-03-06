import { planRepository } from '../../utils/planRepository'
import { userAuth } from '../../utils/userAuth'

export default defineEventHandler(async (event) => {
    // Authenticate
    const token = getCookie(event, 'auth_token');
    if (!token) {
        throw createError({ statusCode: 401, message: 'Not authenticated' });
    }
    const payload = await userAuth.verifyToken(token);
    if (!payload || (payload.user_type !== 'Admin' && payload.user_type !== 'Developer')) {
        throw createError({ statusCode: 401, message: 'Unauthorized' });
    }

    try {
        const body = await readBody(event)
        const { id } = body

        if (!id) {
            throw createError({ statusCode: 400, message: 'Plan Record ID is required' })
        }

        const success = await planRepository.deletePlan(id)

        return {
            success
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to delete plan'
        })
    }
})
