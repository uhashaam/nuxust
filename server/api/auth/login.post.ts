
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const identifier = body.identifier || body.email || body.username;
    const { password } = body;

    if (!identifier || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing email/username or password'
        });
    }

    try {
        // 1. Find user by email or username
        const user = await userRepository.findByUsernameOrEmail(identifier);

        if (!user) {
            // Use generic error message for security (prevent enumeration)
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid credentials'
            });
        }

        // 2. Verify password
        const isValid = await userAuth.verifyPassword(password, user.fields.password_hash);
        if (!isValid) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid credentials'
            });
        }

        // 3. Generate JWT (Using user_type for both role and planId as they seem merged in this schema)
        const role = (user.fields.user_type || 'user').toLowerCase();
        const token = userAuth.generateToken({
            userId: user.record_id,
            username: user.fields.username,
            role: role,
            planId: role
        });

        // 5. Set Auth Cookie
        setCookie(event, 'auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/'
        });

        // 5. Respond with user info (no password)
        return {
            success: true,
            user: {
                id: user.record_id,
                username: user.fields.username,
                role: role,
                planId: role,
                status: 'active' // Mocked as it's missing in Lark
            },
            token
        };

    } catch (error: any) {
        if (error.statusCode) throw error;

        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        });
    }
});
