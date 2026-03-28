import { prisma } from '../../../utils/prisma'

// Curated high-quality Unsplash images keyed by subdomain/topic
const IMAGE_MAP: Record<string, string[]> = {
    lasermarking: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        'https://images.unsplash.com/photo-1565449446-ece1b2368ae2?w=800&q=80',
    ],
    lasercutter: [
        'https://images.unsplash.com/photo-1565349978634-c9e57b5a8a68?w=800&q=80',
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    ],
    lasercleaner: [
        'https://images.unsplash.com/photo-1565151443315-7a0e3f0f7f3a?w=800&q=80',
        'https://images.unsplash.com/photo-1612535900558-a0ab7e0a9a2f?w=800&q=80',
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
    ],
    laserwelder: [
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
        'https://images.unsplash.com/photo-1565079248012-a8cb5f71d8ce?w=800&q=80',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    ],
    default: [
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=800&q=80',
    ],
}

function pickNewsImage(title: string = '', subdomain: string = ''): string {
    const key = subdomain.toLowerCase()
    const pool = IMAGE_MAP[key] || IMAGE_MAP.default || []
    if (!pool.length) return ''
    const idx = title.length % pool.length
    return pool[idx] || ''
}

export default defineCachedEventHandler(async (event) => {
    try {
        const subdomainParam = getRouterParam(event, 'subdomain')
        if (!subdomainParam) {
            throw createError({ statusCode: 400, message: 'Subdomain required' })
        }

        // 1. Fetch the site and associated news from MySQL via Prisma
        const site = await prisma.industrySite.findFirst({
            where: {
                OR: [
                    { sub_domain: subdomainParam },
                    { subdomain: subdomainParam }
                ]
            }
        })

        if (!site) {
            throw createError({ statusCode: 404, message: 'Site not found' })
        }

        // 2. Fetch news matching the site record ID
        const newsItems = await prisma.newsContent.findMany({
            where: {
                industry: site.id,
                status: { in: ['Published', 'Trending'] }
            },
            orderBy: { publication_time: 'desc' }
        })

        // 3. Map to frontend NewsItem format
        return {
            success: true,
            news: newsItems.map(n => {
                const releaseTime = n.publication_time
                let dateStr = ''
                if (releaseTime) {
                    const ts = Number(releaseTime)
                    const date = new Date(ts > 10000000000 ? ts : ts * 1000)
                    dateStr = date.toISOString().split('T')[0] as string
                }

                // Resolve image: Use local field if exists, otherwise fallback to placeholder
                let imageUrl = pickNewsImage(n.title, subdomainParam)
                if (n.thumbnail) {
                   const thumbRaw = Array.isArray(n.thumbnail) ? n.thumbnail : [n.thumbnail]
                   if (thumbRaw.length > 0) {
                      const img = thumbRaw[0]
                      imageUrl = img.url || img.tmp_url || imageUrl
                   }
                }

                return {
                    id: n.id,
                    title: n.title,
                    content: n.content,
                    publishedAt: dateStr,
                    status: n.status,
                    category: site.industry_name || 'Industry',
                    excerpt: n.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                    image: imageUrl,
                    author: n.author || 'Staff Writer',
                    trending: n.status === 'Trending',
                    featured: true,
                    slug: n.slug,
                    tags: []
                }
            })
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch news'
        })
    }
}, {
    maxAge: 60 * 30, // 30 minutes
    swr: true,
    getKey: (event) => `news-site-${getRouterParam(event, 'subdomain') || 'default'}`
})
