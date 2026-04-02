import mysql from 'mysql2/promise'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const dbUrl = (config.databaseUrl as string) || 
                  process.env.NUXT_DATABASE_URL || 
                  process.env.DATABASE_URL || 
                  ''

    if (!dbUrl) return { status: 'error', message: 'DATABASE_URL not found' }

    const results: any = {
        timestamp: new Date().toISOString(),
        driver: 'mysql2/promise',
        platform: process.env.NITRO_PRESET || 'unknown'
    }

    try {
        const cleanUrl = dbUrl.trim().replace(/^["'](.+)["']$/, '$1')
        const url = new URL(cleanUrl)
        
        results.target = `${url.hostname}:${url.port || 3306}`
        results.database = url.pathname.replace(/^\//, '')
        results.user = url.username
        
        const start = Date.now()
        
        // Try raw mysql2 connection with a timeout
        const connection = await mysql.createConnection({
            host: url.hostname,
            port: parseInt(url.port) || 3306,
            user: decodeURIComponent(url.username),
            password: decodeURIComponent(url.password),
            database: url.pathname.replace(/^\//, ''),
            connectTimeout: 5000,
            ssl: cleanUrl.includes('ssl=') ? {} : undefined
        })
        
        const [rows] = await connection.execute('SELECT 1 as val')
        await connection.end()

        return {
            status: 'success',
            message: 'Raw MySQL2 (Promise) connection successful!',
            time_ms: Date.now() - start,
            result: rows,
            ...results
        }
    } catch (e: any) {
        return {
            status: 'failed',
            error_code: e.code,
            error_name: e.name,
            error_message: e.message,
            ...results
        }
    }
})
