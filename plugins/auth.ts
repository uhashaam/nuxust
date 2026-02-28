export default defineNuxtPlugin(async (nuxtApp) => {
    const { user, fetchUser } = useAuth()

    if (!user.value) {
        await fetchUser()
    }
})
