import { useCookie, useState } from 'nuxt/app'

export const useAuth = () => {
    // Persistent login state via cookie (expires in 24h)
    const authCookie = useCookie('admin_auth', {
        maxAge: 60 * 60 * 24,
        path: '/'
    })

    // Reactive state for the app
    const isLoggedIn = useState('is-logged-in', () => !!authCookie.value)

    const login = (password: string) => {
        // Simple hardcoded password for the demo
        if (password === 'admin123') {
            authCookie.value = 'true'
            isLoggedIn.value = true
            return true
        }
        return false
    }

    const logout = () => {
        authCookie.value = null
        isLoggedIn.value = false
        return navigateTo('/admin/login')
    }

    return {
        isLoggedIn,
        login,
        logout
    }
}
