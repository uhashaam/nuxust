import { fetchAllRecords } from '../../utils/lark/base'

// Curated high-quality Unsplash images keyed by topic
const IMAGE_MAP: Record<string, string[]> = {
    lasermarking: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', // tech/manufacturing
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', // circuit board
        'https://images.unsplash.com/photo-1565449446-ece1b2368ae2?w=800&q=80', // precision tools
    ],
    lasercutter: [
        'https://images.unsplash.com/photo-1565349978634-c9e57b5a8a68?w=800&q=80', // laser sparks
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
        const config = useRuntimeConfig()
        const appToken = config.larkBaseAppToken
        const newsTableId = config.public.larkTableIds.newsContent

        if (!appToken || !newsTableId) {
            throw createError({ statusCode: 500, message: 'Lark configuration missing' })
        }

        const [news, sites] = await Promise.all([
            fetchAllRecords(appToken, newsTableId),
            fetchAllRecords(appToken, config.public.larkTableIds.industrySites)
        ])

        const siteMap = new Map(sites.map(s => [s.record_id, { name: s.fields.industry_name, subdomain: s.fields.subdomain }]))

        console.log(`[News Fetch] Total records from Lark: ${news.length}`)
        const filtered = news.filter(n => {
            const hasTitle = !!n.fields.news_title
            const hasContent = !!n.fields.news_content
            const isPublished = n.fields.release_status === 'Published' || n.fields.release_status === 'Trending'

            if (!isPublished) {
                console.log(`[News Filter] Record ${n.record_id} skipped: status is ${n.fields.release_status}`)
            }

            return hasTitle && hasContent && isPublished
        })
        console.log(`[News Fetch] Records after status filter: ${filtered.length}`)

        return {
            success: true,
            news: filtered
                .map(n => {
                    const releaseTime = n.fields.release_time
                    let dateStr = ''
                    if (releaseTime) {
                        const ts = Number(releaseTime)
                        const date = new Date(ts > 10000000000 ? ts : ts * 1000)
                        dateStr = date.toISOString().split('T')[0] as string
                    }

                    const siteIdsField = n.fields.site_id || []
                    let category = 'Industry'
                    let subdomain = ''
                    for (const sf of siteIdsField) {
                        const rid = typeof sf === 'string' ? sf : (sf.record_id || sf.record_ids?.[0])
                        if (rid && siteMap.has(rid)) {
                            const site = siteMap.get(rid)
                            category = site.name as string
                            subdomain = site.subdomain as string
                            break
                        }
                    }

                    // Resolve image: Use Lark attachment if exists, otherwise fallback to placeholder
                    const featuredImgField = n.fields.featured_image
                    let imageUrl = pickNewsImage(n.fields.news_title, category)

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
                        category: category as string,
                        subdomain: subdomain,
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
            message: error.message || 'Failed to fetch global news'
        })
    }
})
