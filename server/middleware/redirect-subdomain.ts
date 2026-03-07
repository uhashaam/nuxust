import { defineEventHandler, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
    const host = getRequestHeader(event, 'host') || ''
    const path = event.node.req.url || '/'

    // Skip static assets, API routes, and existing /i/ routes
    if (
        path.startsWith('/_nuxt') ||
        path.startsWith('/api') ||
        path.startsWith('/i/') ||
        path.includes('.')
    ) {
        return
    }

    const hostname = host.split(':')[0]
    // Skip if we are on the main domain or localhost/local without a subdomain
    const isMainDomain = hostname === 'b-2b.com' || hostname === 'localhost' || hostname.endsWith('.local')
    if (isMainDomain) return

    // Extract subdomain
    const subdomainMatch = hostname.match(/^([a-z0-9-]+)(\.b-2b\.com|\.localhost)?$/)
    if (subdomainMatch) {
        const subdomain = subdomainMatch[1]
        const skipSubdomains = ['www', 'mail', 'api', 'cdn']

        if (!skipSubdomains.includes(subdomain)) {
            // Perform a 302 redirect to the industry path
            const targetPath = `/i/${subdomain}${path === '/' ? '' : path}`
            return sendRedirect(event, targetPath, 302)
        }
    }
})
