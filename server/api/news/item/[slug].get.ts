import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const identifier = getRouterParam(event, 'slug')
        if (!identifier) {
            throw createError({ statusCode: 400, message: 'News identifier (slug or ID) is required' })
        }

        // Fetch the article and all sites from MySQL via Prisma
        const [record, sites] = await Promise.all([
            prisma.newsContent.findFirst({
                where: {
                    OR: [
                        { id: identifier },
                        { slug: identifier }
                    ]
                }
            }),
            prisma.industrySite.findMany()
        ])

        if (!record || !record.title || !record.content) {
            throw createError({ statusCode: 404, message: 'Article not found or incomplete' })
        }

        const siteMap = new Map(sites.map(s => [s.id, { name: s.industry_name, subdomain: s.subdomain || s.sub_domain }]))

        const releaseTime = record.publication_time
        let dateStr = ''
        if (releaseTime) {
            const ts = Number(releaseTime)
            const date = new Date(ts > 10000000000 ? ts : ts * 1000)
            dateStr = date.toISOString().split('T')[0] as string
        }

        // Resolve category and subdomain
        let category = 'Industry'
        let subdomain = ''
        if (record.industry && siteMap.has(record.industry)) {
            const site = siteMap.get(record.industry)
            category = site.name as string
            subdomain = site.subdomain as string
        }

        // Resolve image: Use local field if exists, otherwise fallback to placeholder
        let imageUrl = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80'
        
        if (record.thumbnail) {
            const thumbRaw = Array.isArray(record.thumbnail) ? record.thumbnail : [record.thumbnail]
            if (thumbRaw.length > 0) {
                const img = thumbRaw[0]
                imageUrl = img.url || img.tmp_url || imageUrl
            }
        }

        return {
            success: true,
            article: {
                id: record.id,
                title: record.title,
                content: record.content,
                publishedAt: dateStr,
                status: record.status,
                category: category as string,
                subdomain: subdomain,
                excerpt: record.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                image: imageUrl,
                author: record.author || 'Staff Writer',
                slug: record.slug,
                tags: []
            }
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch article'
        })
    }
})
