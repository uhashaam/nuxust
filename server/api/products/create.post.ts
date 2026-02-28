import { productRepository } from '../../utils/productRepository'
import { userAuth } from '../../utils/userAuth'

export default defineEventHandler(async (event) => {
    // Authenticate
    const token = getCookie(event, 'auth_token');
    if (!token) {
        throw createError({ statusCode: 401, message: 'Not authenticated' });
    }
    const payload = userAuth.verifyToken(token);
    if (!payload || (payload.user_type !== 'Admin' && payload.user_type !== 'Developer')) {
        throw createError({ statusCode: 401, message: 'Unauthorized' });
    }

    try {
        const body = await readBody(event)
        const product = await productRepository.createProduct(body)

        return {
            success: true,
            product
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to create product'
        })
    }
})
