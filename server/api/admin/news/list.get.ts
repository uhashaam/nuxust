import { prisma } from '../../../utils/prisma'
import { userAuth } from '../../../utils/userAuth'

export default defineEventHandler(async (event) => {
    // 1. Authenticate user
    const token = getCookie(event, 'auth_token')
    if (!token) {
        throw createError({ statusCode: 401, message: 'Not authenticated' })
    }

    const payload = await userAuth.verifyToken(token)
    if (!payload) {
        throw createError({ statusCode: 401, message: 'Invalid or expired token' })
    }

    try {
        const isAdmin = payload.role?.toLowerCase() === 'admin'
        const username = payload.username
        const email = payload.email || username // fallback to username if email missing from payload

        // 2. Build Query
        let where: any = {}
        
        if (!isAdmin) {
            // Non-admins see only their own posts
            // We check both username and email to be safe
            where = {
                OR: [
                    { author: username },
                    { author: email }
                ]
            }
        }

        // 3. Fetch data (Super Admin sees ALL, even drafts)
        const newsList = await prisma.newsContent.findMany({
            where,
            orderBy: { publication_time: 'desc' }
        })

        // 4. Return results formatted for the table
        return {
            success: true,
            news: newsList.map(n => {
                const releaseTime = n.publication_time
                let dateStr = ''
                if (releaseTime) {
                    const ts = Number(releaseTime)
                    const date = new Date(ts > 10000000000 ? ts : ts * 1000)
                    dateStr = date.toISOString().split('T')[0]
                }

                return {
                    id: n.id,
                    title: n.title,
                    content: n.content,
                    publishedAt: dateStr,
                    status: n.status,
                    slug: n.slug,
                    featured: n.status === 'Trending' || n.is_featured,
                    category: n.industry || 'General',
                    author: n.author || 'Unknown'
                }
            })
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: error.message || 'Failed to fetch news for administration'
        })
    }
})
