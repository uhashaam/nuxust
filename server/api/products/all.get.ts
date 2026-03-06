import { productRepository } from '../../utils/productRepository'

export default defineEventHandler(async (event) => {
    try {
        const host = getRequestHost(event)
        // Allow all for now to debug, but specifically ensure localhost and b-2b domains work
        const isAllowed = host.includes('localhost') || host.includes('b-2b.com') || host.includes('pages.dev') || host.includes('127.0.0.1')

        if (!isAllowed && process.env.NODE_ENV === 'production') {
            console.log('Blocked host access:', host)
            return {
                success: true,
                products: []
            }
        }

        const records = await productRepository.getAllProducts()

        const products = records.map(r => {
            return {
                id: r.record_id,
                name: r.fields.Text || (r.fields as any).name,
                description: r.fields.description,
                shortDescription: r.fields.short_description || '',
                price: r.fields.price || 0,
                category: r.fields.category || 'Default',
                specifications: r.fields.specifications ? JSON.parse(r.fields.specifications) : {},
                slug: r.fields.slug || `product-${r.record_id}`,
                image: Array.isArray(r.fields.featured_image) && r.fields.featured_image[0]
                    ? (r.fields.featured_image[0].file_token ? `/api/images/${r.fields.featured_image[0].file_token}` : (r.fields.featured_image[0].url || ''))
                    : (typeof r.fields.featured_image === 'string' ? r.fields.featured_image : ''),
                featured: !!r.fields.is_featured
            }
        })

        return {
            success: true,
            products
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to fetch products'
        })
    }
})
