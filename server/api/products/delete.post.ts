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

    const host = getRequestHost(event)
    const isMainDomain = host === 'b-2b.com' || host === 'localhost' || host.includes('b-2b.pages.dev')
    if (!isMainDomain) {
        throw createError({ statusCode: 403, message: 'Product management is only allowed on the main domain.' });
    }

    try {
        const body = await readBody(event)
        const { id } = body

        if (!id) {
            throw createError({ statusCode: 400, message: 'Product Record ID is required' })
        }

        const success = await productRepository.deleteProduct(id)

        return {
            success
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to delete product'
        })
    }
})
