
export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Not authenticated'
        });
    }

    const payload = userAuth.verifyToken(token);
    if (!payload) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid or expired token'
        });
    }

    // Fetch fresh user data from Lark to ensure the account still exists and is active
    const user = await userRepository.findByUsernameOrEmail(payload.username);
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'User not found' });
    }

    const role = (user.fields.user_type || 'user').toLowerCase();

    return {
        user: {
            id: user.record_id,
            username: user.fields.username,
            email: user.fields.email,
            role: role,
            planId: role,
            status: user.fields.user_status || 'active'
        }
    };
});
