import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
    const host = getRequestHeader(event, 'host') || ''
    const url = new URL(event.node.req.url || '/', `http://${host}`)
    const path = url.pathname

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
    const mainDomain = 'b-2b.com'

    // Extract subdomain (e.g., 'laser' from 'laser.b-2b.com')
    const subdomainMatch = hostname.match(/^([a-z0-9-]+)\.b-2b\.com$/)

    if (subdomainMatch) {
        const subdomain = subdomainMatch[1]
        const skipSubdomains = ['www', 'mail', 'api', 'cdn']

        if (!skipSubdomains.includes(subdomain)) {
            // Internally rewrite the path to the industry route
            // This happens server-side, so the browser URL stays clean
            const newPath = `/i/${subdomain}${path === '/' ? '' : path}`
            event.node.req.url = newPath
        }
    }
})
