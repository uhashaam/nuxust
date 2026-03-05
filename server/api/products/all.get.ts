import { productRepository } from '../../utils/productRepository'

export default defineEventHandler(async (event) => {
    try {
        const host = getRequestHost(event)
        const isMainDomain = host === 'b-2b.com' || host.startsWith('localhost') || host.includes('b-2b.pages.dev')

        if (!isMainDomain) {
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
                image: Array.isArray(r.fields.featured_image) ? r.fields.featured_image[0]?.url : r.fields.featured_image,
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
