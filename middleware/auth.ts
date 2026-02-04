import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to) => {
    const { isLoggedIn } = useAuth()

    // If trying to access any admin route (except login) without being logged in
    if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
        if (!isLoggedIn.value) {
            return navigateTo('/admin/login')
        }
    }

    // If trying to access login page while already logged in
    if (to.path === '/admin/login' && isLoggedIn.value) {
        return navigateTo('/admin')
    }
})
