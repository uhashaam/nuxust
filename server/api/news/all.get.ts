import { newsRepository } from '../../utils/newsRepository'
import { prisma } from '../../utils/prisma'

// Curated high-quality Unsplash images keyed by topic
const IMAGE_MAP: Record<string, string[]> = {
    lasermarking: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', // tech/manufacturing
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', // circuit board
        'https://images.unsplash.com/photo-1565449446-ece1b2368ae2?w=800&q=80', // precision tools
    ],
    lasercutter: [
        'https://images.unsplash.com/photo-1563349978634-c9e57b5a8a68?w=800&q=80', // laser sparks (corrected typo in unsplash ID)
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', // metal cutting
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', // factory line
    ],
    lasercleaner: [
        'https://images.unsplash.com/photo-1565151443315-7a0e3f0f7f3a?w=800&q=80', // industrial
        'https://images.unsplash.com/photo-1612535900558-a0ab7e0a9a2f?w=800&q=80', // metal surface
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', // factory
    ],
    laserwelder: [
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', // welding
        'https://images.unsplash.com/photo-1565079248012-a8cb5f71d8ce?w=800&q=80', // sparks
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80', // fabrication
    ],
    default: [
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', // robot/industry
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', // circuit
        'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=800&q=80', // ai/tech
    ],
}

function pickNewsImage(title: string = '', category: string = ''): string {
    const key = category.toLowerCase().replace(/\s+/g, '')
    // Find which pool to use
    let pool = IMAGE_MAP.default
    const firstWord = key.split(' ')[0] || ''
    for (const [k, imgs] of Object.entries(IMAGE_MAP)) {
        if (key.includes(k) || (firstWord && k.includes(firstWord))) {
            pool = imgs
            break
        }
    }
    // Pick deterministically based on title so same post always gets same image
    const idx = title.length % pool.length
    return pool[idx] as string
}

export default defineEventHandler(async (event) => {
    try {
        // Fetch from MySQL via newsRepository
        const [newsList, sites] = await Promise.all([
            prisma.newsContent.findMany({
                where: { status: { in: ['Published', 'Trending'] } },
                orderBy: { publication_time: 'desc' }
            }),
            prisma.industrySite.findMany()
        ])

        const siteMap = new Map(sites.map(s => [s.id, { name: s.industry_name, subdomain: s.subdomain || s.sub_domain }]))

        return {
            success: true,
            news: newsList.map(n => {
                const releaseTime = n.publication_time
                let dateStr = ''
                if (releaseTime) {
                    const ts = Number(releaseTime)
                    const date = new Date(ts > 10000000000 ? ts : ts * 1000)
                    dateStr = date.toISOString().split('T')[0] as string
                }

                // Map site/category
                let category = 'Industry'
                let subdomain = ''
                if (n.industry && siteMap.has(n.industry)) {
                    const site = siteMap.get(n.industry)
                    category = site.name as string
                    subdomain = site.subdomain as string
                }

                // Resolve image: Use local field if exists, otherwise fallback to placeholder
                let imageUrl = pickNewsImage(n.title, category)
                if (n.thumbnail) {
                   const thumbRaw = Array.isArray(n.thumbnail) ? n.thumbnail : [n.thumbnail];
                   if (thumbRaw.length > 0) {
                      const img = thumbRaw[0];
                      if (img.url) imageUrl = img.url;
                      else if (img.file_token) imageUrl = `/api/images/${img.file_token}`;
                   }
                }

                return {
                    id: n.id,
                    title: n.title,
                    content: n.content,
                    publishedAt: dateStr,
                    status: n.status,
                    category: category,
                    subdomain: subdomain,
                    excerpt: n.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                    image: imageUrl,
                    author: n.author || 'Staff Writer',
                    trending: n.status === 'Trending',
                    featured: true,
                    slug: n.slug,
                    siteId: n.industry,
                    tags: []
                }
            })
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Failed to fetch global news'
        })
    }
})
