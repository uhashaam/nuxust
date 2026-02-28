// Subdomain routing middleware
// Detects requests coming from subdomains like laserwelder.b-2b.com
// and redirects them to the /i/[subdomain] route internally

export default defineNuxtRouteMiddleware((to, from) => {
    // Determine the hostname based on environment (Server vs Client)
    let hostname = ''
    if (import.meta.server) {
        // useRequestHeader is available in Nuxt 3 SSR contexts
        hostname = (useRequestHeader('host') || '').split(':')[0]
    } else {
        hostname = window.location.hostname
    }

    const mainDomain = 'b-2b.com'

    // Extract subdomain if present (e.g., laserwelder from laserwelder.b-2b.com)
    const subdomainMatch = hostname.match(/^([a-z0-9-]+)\.b-2b\.com$/)

    if (subdomainMatch) {
        const subdomain = subdomainMatch[1]

        // Skip www or other non-industry subdomains
        const skipSubdomains = ['www', 'mail', 'api', 'cdn']
        if (skipSubdomains.includes(subdomain)) return

        // If not already on the /i/[subdomain] route, redirect there
        if (!to.path.startsWith(`/i/${subdomain}`)) {
            return navigateTo(`/i/${subdomain}`, { replace: true })
        }
    }
})
