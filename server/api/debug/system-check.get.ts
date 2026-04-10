import { userRepository } from '../../utils/userRepository';
import { getClient } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
    // Basic security: only allow if a specific query param matches OR if it's localhost
    // In a real app, you'd use a more robust check.
    const query = getQuery(event);
    if (query.pwd !== 'debug123' && process.env.NODE_ENV === 'production') {
        return { error: 'Unauthorized. Use ?pwd=debug123' };
    }

    const config = useRuntimeConfig();
    
    // Test Database Connection
    let dbStatus = 'Unknown';
    let dbError = null;
    try {
        const prisma = await getClient();
        await prisma.$queryRaw`SELECT 1`;
        dbStatus = 'Connected';
    } catch (err: any) {
        dbStatus = 'Failed';
        dbError = err.message;
    }

    // Detect Environment
    const isCloudflare = !!process.env.CF_PAGES || !!(event.context.cloudflare);
    const isNode = typeof process !== 'undefined' && !!process.versions?.node;

    return {
        timestamp: new Date().toISOString(),
        runtime: {
            isCloudflare,
            isNode,
            nodeVersion: process.versions?.node || 'N/A',
            platform: process.platform || 'edge'
        },
        database: {
            status: dbStatus,
            error: dbError,
            // Masked URL for security
            url: config.databaseUrl ? config.databaseUrl.split('@')[0] + '@...' : 'Missing'
        },
        config: {
            hasJwtSecret: !!config.jwtSecret,
            jwtSecretLength: config.jwtSecret?.length || 0,
            smtp: {
                host: config.smtpHost || 'Missing',
                user: config.smtpUser || 'Missing',
                port: config.smtpPort,
                hasPass: !!config.smtpPass
            }
        }
    };
});
