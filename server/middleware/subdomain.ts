import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
    // Use standard H3 utilities to get URL info
    const host = getRequestHeader(event, 'host') || ''
    const path = event.node.req.url || '/'

    // Skip static assets, API routes, and internal /i/ routes
    if (
        path.startsWith('/_nuxt') ||
        path.startsWith('/api') ||
        path.startsWith('/i/') ||
        path.includes('.')
    ) {
        return
    }

    const hostname = host.split(':')[0]
    // Allow local testing on localhost or .local
    const isMainDomain = hostname === 'b-2b.com' || hostname === 'localhost' || hostname.endsWith('.local')

    if (!isMainDomain) {
        // Extract subdomain (e.g., 'laser' from 'laser.b-2b.com')
        const subdomainMatch = hostname.match(/^([a-z0-9-]+)(\.b-2b\.com|\.localhost)?$/)

        if (subdomainMatch) {
            const subdomain = subdomainMatch[1]
            const skipSubdomains = ['www', 'mail', 'api', 'cdn']

            if (!skipSubdomains.includes(subdomain)) {
                // Internally rewrite the path to the industry route
                // event.node.req.url is the standard way to internal rewrite in Nitro
                const newPath = `/i/${subdomain}${path === '/' ? '' : path}`
                event.node.req.url = newPath
            }
        }
    }
})
