import { productRepository } from '../../utils/productRepository'
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

    const host = getRequestHost(event)
    const isMainDomain = host === 'b-2b.com' || host === 'localhost' || host.includes('b-2b.pages.dev')
    if (!isMainDomain) {
        throw createError({ statusCode: 403, message: 'Product management is only allowed on the main domain.' });
    }

    try {
        const body = await readBody(event)
        const { id, ...updates } = body

        if (!id) {
            throw createError({ statusCode: 400, message: 'Product Record ID is required' })
        }

        const product = await productRepository.updateProduct(id, updates)

        return {
            success: true,
            product
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to update product'
        })
    }
})
