import { configRepository } from '../../utils/configRepository'
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
        await configRepository.updateGlobalConfig(body)

        return {
            success: true
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to update config'
        })
    }
})
