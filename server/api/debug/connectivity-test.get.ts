import mariadb from 'mariadb'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const dbUrl = (config.databaseUrl as string) || 
                  process.env.NUXT_DATABASE_URL || 
                  process.env.DATABASE_URL || 
                  ''

    if (!dbUrl) {
        return {
            status: 'error',
            message: 'DATABASE_URL not found'
        }
    }

    const debugInfo: any = {
        timestamp: new Date().toISOString(),
        target: ''
    }

    try {
        const url = new URL(dbUrl)
        const host = url.hostname
        const port = parseInt(url.port) || 3306
        const user = decodeURIComponent(url.username)
        const password = decodeURIComponent(url.password)
        const database = url.pathname.replace(/^\//, '')

        debugInfo.target = `${host}:${port}`
        debugInfo.user = user
        debugInfo.database = database

        const start = Date.now()
        
        // Raw MariaDB connection test (no Prisma)
        console.log(`[ConnectivityTest] Attempting raw connection to ${host}:${port}`)
        const conn = await mariadb.createConnection({
            host,
            port,
            user,
            password,
            database,
            connectTimeout: 5000
        })

        const queryResult = await conn.query('SELECT 1 as val')
        await conn.end()

        return {
            status: 'success',
            message: 'Raw TCP connection and query successful',
            time_ms: Date.now() - start,
            result: queryResult,
            ...debugInfo
        }
    } catch (e: any) {
        console.error('[ConnectivityTest] Failed:', e)
        return {
            status: 'failed',
            error_name: e.name,
            error_message: e.message,
            error_code: e.code,
            errno: e.errno,
            sqlState: e.sqlState,
            ...debugInfo
        }
    }
})
