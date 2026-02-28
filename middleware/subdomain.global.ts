// Subdomain routing middleware
// Detects requests coming from subdomains like laserwelder.b-2b.com
// and redirects them to the /i/[subdomain] route internally

export default defineNuxtRouteMiddleware((to) => {
    // Only run on client-side in the browser
    if (import.meta.server) return

    const host = window.location.hostname
    const mainDomain = 'b-2b.com'

    // Extract subdomain if present (e.g., laserwelder from laserwelder.b-2b.com)
    const subdomainMatch = host.match(/^([a-z0-9-]+)\.b-2b\.com$/)

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
