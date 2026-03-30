import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const dbUrlRaw = (config.databaseUrl as string) || 
                       process.env.NUXT_DATABASE_URL || 
                       process.env.DATABASE_URL || 
                       'UNDEFINED'
        
        // Try a simple ping and check for data
        const [newsCount, productsCount, sitesCount] = await Promise.all([
            prisma.newsContent.count(),
            prisma.product.count(),
            prisma.industrySite.count()
        ])

        const sampleNews = await prisma.newsContent.findMany({ take: 3 })

        return {
            success: true,
            dbUrlMasked: dbUrlRaw.replace(/:[^:@]+@/, ':***@'),
            counts: {
                news: newsCount,
                products: productsCount,
                sites: sitesCount
            },
            sampleNews: sampleNews.map(n => ({ id: n.id, title: n.title, status: n.status })),
            envKeys: Object.keys(process.env).filter(k => k.includes('DATABASE')),
            runtimeConfigKeys: Object.keys(config).filter(k => k.toLowerCase().includes('database')),
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
            stack: error.stack
        }
    }
})
