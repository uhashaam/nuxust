import { productRepository } from '../../utils/productRepository'

export default defineEventHandler(async (event) => {
    try {
        const records = await productRepository.getAllProducts()

        const products = records.map(r => {
            let metadata: any = {}
            try {
                if (r.fields.author_email) {
                    metadata = JSON.parse(r.fields.author_email)
                }
            } catch (e) {
                console.warn('Failed to parse product metadata for record', r.record_id)
            }

            return {
                id: r.record_id,
                name: r.fields.news_title,
                description: r.fields.news_content,
                category: metadata.category || 'Default',
                price: metadata.price || 0,
                shortDescription: metadata.shortDescription || '',
                specifications: metadata.specifications || {},
                slug: metadata.slug || `product-${r.record_id}`,
                image: Array.isArray(r.fields.featured_image) ? r.fields.featured_image[0]?.url : r.fields.featured_image,
                featured: r.fields.release_status === 'Trending'
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
