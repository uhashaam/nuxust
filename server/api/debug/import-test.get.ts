export default defineEventHandler(async (event) => {
    const results: any = {
        timestamp: new Date().toISOString()
    }

    try {
        results.mariadb_load = 'attempting'
        const mariadb = await import('mariadb').catch(e => {
            return { error: e.message }
        })
        results.mariadb_load = (mariadb as any).error ? `failed: ${ (mariadb as any).error}` : 'success'
        
        results.prisma_adapter_load = 'attempting'
        const adapter = await import('@prisma/adapter-mariadb').catch(e => {
            return { error: e.message }
        })
        results.prisma_adapter_load = (adapter as any).error ? `failed: ${ (adapter as any).error}` : 'success'

        results.prisma_client_load = 'attempting'
        const client = await import('@prisma/client').catch(e => {
            return { error: e.message }
        })
        results.prisma_client_load = (client as any).error ? `failed: ${ (client as any).error}` : 'success'

        results.mysql2_load = 'attempting'
        const mysql2 = await import('mysql2/promise').catch(e => {
            return { error: e.message }
        })
        results.mysql2_load = (mysql2 as any).error ? `failed: ${ (mysql2 as any).error}` : 'success'

        return results
    } catch (e: any) {
        return {
            status: 'error',
            message: e.message,
            stack: e.stack,
            ...results
        }
    }
})
