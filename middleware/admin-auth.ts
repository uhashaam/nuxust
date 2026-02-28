export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useAuth()

    if (!user.value || user.value.role?.toLowerCase() !== 'admin') {
        return navigateTo('/dashboard')
    }
})
