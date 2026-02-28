export const useAuth = () => {
    const user = useState('auth-user', () => null as any);
    const isLoading = useState('auth-loading', () => false);

    const login = async (credentials: any) => {
        isLoading.value = true;
        try {
            const data: any = await $fetch('/api/auth/login', {
                method: 'POST',
                body: credentials
            });

            if (data && data.user) {
                user.value = data.user;
                return data;
            }
        } catch (error: any) {
            user.value = null;
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const register = async (userData: any) => {
        isLoading.value = true;
        try {
            const data: any = await $fetch('/api/auth/register', {
                method: 'POST',
                body: userData
            });

            if (data && data.user) {
                user.value = data.user;
                return data;
            }
        } catch (error: any) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const logout = async () => {
        await useFetch('/api/auth/logout', { method: 'POST' });
        user.value = null;
        return navigateTo('/login');
    };

    const fetchUser = async () => {
        try {
            // Include cookies on server side
            const headers = useRequestHeaders(['cookie']) as any;
            const data: any = await $fetch('/api/auth/me', { headers });

            if (data && data.user) {
                user.value = data.user;
            } else {
                user.value = null;
            }
        } catch (err) {
            user.value = null;
        }
    };

    const sendVerificationCode = async (email: string) => {
        return await $fetch('/api/auth/send-code', {
            method: 'POST',
            body: { email }
        });
    };

    const verifyEmail = async (email: string, code: string) => {
        return await $fetch('/api/auth/verify', {
            method: 'POST',
            body: { email, code }
        });
    };

    const forgotPassword = async (email: string) => {
        return await $fetch('/api/auth/forgot-password', {
            method: 'POST',
            body: { email }
        });
    };

    const resetPassword = async (data: any) => {
        return await $fetch('/api/auth/reset-password', {
            method: 'POST',
            body: data
        });
    };

    return {
        user,
        isLoading,
        login,
        register,
        logout,
        fetchUser,
        sendVerificationCode,
        verifyEmail,
        forgotPassword,
        resetPassword
    };
};
