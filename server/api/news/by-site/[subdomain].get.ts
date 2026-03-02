import { fetchAllRecords } from '../../../utils/lark/base'

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
    const pool = IMAGE_MAP[key] || IMAGE_MAP.default
    const idx = title.length % pool.length
    return pool[idx]
}

export default defineEventHandler(async (event) => {
    try {
        const subdomain = getRouterParam(event, 'subdomain')
        if (!subdomain) {
            throw createError({ statusCode: 400, message: 'Subdomain required' })
        }

        const config = useRuntimeConfig()
        const appToken = config.larkBaseAppToken
        const siteTableId = config.larkTableIndustrySites
        const newsTableId = config.larkTableNewsContent

        if (!appToken || !siteTableId || !newsTableId) {
            throw createError({ statusCode: 500, message: 'Lark configuration missing' })
        }

        // Fetch sites and news in parallel to reduce latency
        const [sites, news] = await Promise.all([
            fetchAllRecords(appToken, siteTableId),
            fetchAllRecords(appToken, newsTableId)
        ])

        const site = sites.find(s => s.fields.subdomain === subdomain)
        if (!site) {
            throw createError({ statusCode: 404, message: 'Site not found' })
        }

        // 3. Filter news by site record ID
        const filteredNews = news.filter(n => {
            const siteField = n.fields.site_id || []
            // Link fields can be an array of objects like { record_ids: [...], ... }
            return siteField.some((s: any) => {
                if (typeof s === 'string') return s === site.record_id
                if (s && s.record_id === site.record_id) return true
                if (s && s.record_ids && Array.isArray(s.record_ids)) {
                    return s.record_ids.includes(site.record_id)
                }
                return false
            })
        })

        // 4. Map to frontend NewsItem format
        return {
            success: true,
            news: filteredNews
                .filter(n => n.fields.news_title && n.fields.news_content)
                .map(n => {
                    const releaseTime = n.fields.release_time
                    let dateStr = ''
                    if (releaseTime) {
                        const ts = Number(releaseTime)
                        const date = new Date(ts > 10000000000 ? ts : ts * 1000)
                        dateStr = date.toISOString().split('T')[0] as string
                    }

                    // Resolve image: Use Lark attachment if exists, otherwise fallback to placeholder
                    const featuredImgField = n.fields.featured_image
                    let imageUrl = pickNewsImage(n.fields.news_title, subdomain)

                    if (typeof featuredImgField === 'string' && featuredImgField.trim() !== '') {
                        imageUrl = featuredImgField
                    } else if (featuredImgField && Array.isArray(featuredImgField) && featuredImgField.length > 0) {
                        const img = featuredImgField[0]
                        imageUrl = img.tmp_url || img.url || imageUrl
                    }

                    return {
                        id: n.record_id || '',
                        title: n.fields.news_title,
                        content: n.fields.news_content,
                        publishedAt: dateStr,
                        status: n.fields.release_status,
                        category: (site.fields.industry_name as string) || 'Industry',
                        excerpt: n.fields.news_content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                        image: imageUrl,
                        author: 'Staff Writer',
                        trending: n.fields.release_status === 'Trending',
                        featured: true,
                        slug: n.fields.slug || `news-${n.record_id}`,
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
})
