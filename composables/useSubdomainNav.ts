import { useRoute } from '#app'

export function useSubdomainNav() {
  const route = useRoute()
  
  /**
   * Resolves a path for subdomain navigation.
   * If on a subdomain host, it returns the clean path.
   * If on the main domain (preview mode), it returns the prefixed path.
   */
  const getPath = (basePath: string, subdomain?: string) => {
    if (!subdomain) return basePath
    
    // Check if we are physically on a route that starts with /i/
    // This reliably detects "Main Domain Preview" vs "True Subdomain"
    const isInternalRouting = route.path.startsWith('/i/')
    
    if (isInternalRouting) {
      // Logic for previewing on b-2b.com/i/subdomain
      return `/i/${subdomain}${basePath === '/' ? '' : basePath}`
    }
    
    // Logic for true subdomain e.g. lasercutter.b-2b.com
    return basePath
  }

  return {
    getPath
  }
}
