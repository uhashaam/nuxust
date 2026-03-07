export default defineNuxtRouteMiddleware((to) => {
    const host = useRequestHeader('host')
    if (!host) return

    const hostname = host.split(':')[0]
    if (!hostname) return

    // Skip if we are on the main domain or localhost/local without a subdomain
    const isMainDomain = hostname === 'b-2b.com' || hostname === 'localhost' || hostname.endsWith('.local')
    if (isMainDomain) return

    // Extract subdomain
    const subdomainMatch = hostname.match(/^([a-z0-9-]+)(\.b-2b\.com|\.localhost)?$/)
    if (!subdomainMatch || !subdomainMatch[1]) return

    const subdomain = subdomainMatch[1]
    const skipSubdomains = ['www', 'mail', 'api', 'cdn']
    if (skipSubdomains.includes(subdomain)) return

    // If the path doesn't already start with /i/, redirect it
    if (!to.path.startsWith('/i/')) {
        const targetPath = `/i/${subdomain}${to.path === '/' ? '' : to.path}`
        return navigateTo(targetPath)
    }
})
