import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        // Test connectivity
        const start = Date.now()
        
        // Use a direct query to check if Prisma is working at all
        const rawResult = await (prisma as any).$queryRaw`SELECT 1 as connected`.catch((e: any) => {
            return { error: e.message, stack: e.stack }
        })
        
        debugInfo.raw_test = rawResult
        debugInfo.query_time_ms = Date.now() - start

        // Try counts
        const counts: any = {}
        try {
            counts.news = await prisma.newsContent.count()
            counts.products = await prisma.product.count()
            counts.sites = await prisma.industrySite.count()
        } catch (e: any) {
            counts.error = e.message
        }
        
        debugInfo.counts = counts

        return {
            status: 'ok',
            ...debugInfo
        }
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
            stack: error.stack,
            ...debugInfo
        }
    }
})
