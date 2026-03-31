import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const debugInfo: any = {
        timestamp: new Date().toISOString(),
        runtime: process.env.DATABASE_URL ? 'Standard' : 'Nitro/Edge',
        env: {
            has_runtime_config_db_url: !!config.databaseUrl,
            has_process_env_db_url: !!process.env.DATABASE_URL,
            has_process_env_nuxt_db_url: !!process.env.NUXT_DATABASE_URL,
            node_env: process.env.NODE_ENV,
            nitro_preset: process.env.NITRO_PRESET || 'unknown'
        }
    }
    
    try {
        // Test connectivity
        const start = Date.now()
        
        // Use a direct query to check if Prisma is working at all
        const rawResult = await (prisma as any).$queryRaw`SELECT 1 as connected`.catch((e: any) => {
            return { 
                error: e.message, 
                code: e.code,
                meta: e.meta,
                stack: process.env.NODE_ENV === 'development' ? e.stack : undefined 
            }
        })
        
        debugInfo.raw_test = rawResult
        debugInfo.query_time_ms = Date.now() - start

        // Try counts
        const counts: any = {}
        try {
            // Use Promise.allSettled to show what works and what doesn't
            const results = await Promise.allSettled([
                prisma.newsContent.count(),
                prisma.product.count(),
                prisma.industrySite.count()
            ])
            
            counts.news = results[0].status === 'fulfilled' ? results[0].value : { error: (results[0] as any).reason?.message }
            counts.products = results[1].status === 'fulfilled' ? results[1].value : { error: (results[1] as any).reason?.message }
            counts.sites = results[2].status === 'fulfilled' ? results[2].value : { error: (results[2] as any).reason?.message }
        } catch (e: any) {
            counts.global_error = e.message
        }
        
        debugInfo.counts = counts

        return {
            status: debugInfo.raw_test.error ? 'degraded' : 'ok',
            ...debugInfo
        }
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
            ...debugInfo
        }
    }
})
