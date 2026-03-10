export default defineNuxtRouteMiddleware((to) => {
    // Only run on client-side or if we can get the host
    const host = process.server ? useRequestHeader('host') : window.location.host
    if (!host) return

    const hostname = host?.split(':')[0]
    if (!hostname) return
    const parts = hostname.split('.')

    // Skip if we are on the main domain or localhost/local without a subdomain
    const isMainDomain = hostname === 'b-2b.com' ||
        hostname === 'localhost' ||
        hostname.endsWith('.local') ||
        (hostname.endsWith('b-2b.com') && parts.length <= 2) ||
        (hostname === 'www.b-2b.com')

    if (isMainDomain) return

    // Extract subdomain
    const subdomain = (parts[0] || '').toLowerCase().trim()
    const skipSubdomains = ['www', 'mail', 'api', 'cdn']

    if (subdomain && !skipSubdomains.includes(subdomain)) {
        // If the path doesn't already start with /i/, redirect it
        if (!to.path.startsWith('/i/')) {
            const targetPath = `/i/${subdomain}${to.path === '/' ? '' : to.path}`
            return navigateTo(targetPath)
        }
    }
})
