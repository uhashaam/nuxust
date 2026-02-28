
// ─── Email → Plan mapping table ────────────────────────────────────────────
// Add email addresses here to assign plans automatically on registration.
// Unrecognised emails get the default 'user' plan.
const EMAIL_PLAN_MAP: Record<string, 'admin' | 'vip1' | 'vip2' | 'vip3' | 'vip4' | 'user'> = {
    // Admin accounts
    'admin@b-2b.com': 'admin',
    'superadmin@b-2b.com': 'admin',

    // VIP 4
    'vip4@b-2b.com': 'vip4',

    // VIP 3
    'vip3@b-2b.com': 'vip3',

    // VIP 2
    'vip2@b-2b.com': 'vip2',

    // VIP 1
    'vip1@b-2b.com': 'vip1',

    // Standard users (explicit – all others also default to 'user')
    'user@b-2b.com': 'user',
};

function getPlanFromEmail(email: string): 'admin' | 'vip1' | 'vip2' | 'vip3' | 'vip4' | 'user' {
    return EMAIL_PLAN_MAP[email.toLowerCase()] ?? 'user';
}
// ───────────────────────────────────────────────────────────────────────────

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { username, email, password } = body;

    if (!username || !email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing required fields: username, email, password'
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid email format'
        });
    }

    if (password.length < 8) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Password must be at least 8 characters long'
        });
    }

    try {
        // Hash password
        const passwordHash = await userAuth.hashPassword(password);

        // Determine user_type from email (authoritative) —
        // the plan query param is ignored; plan is always email-driven.
        const userType = getPlanFromEmail(email);

        // Set initial remaining_posts based on plan (28-day supply)
        const initialPosts: Record<string, number> = {
            admin: 9999,
            vip4: 84,   // 3/day * 28
            vip3: 56,   // 2/day * 28
            vip2: 28,   // 1/day * 28
            vip1: 4,    // 1/week * 4
            user: 0,
        };

        // Create user record in Lark
        const newUser = await userRepository.createUser({
            username,
            email,
            password_hash: passwordHash,
            user_type: userType,
            remaining_posts: initialPosts[userType] ?? 0,
            bound_site_id: []
        });

        // Generate JWT token for immediate login
        const token = userAuth.generateToken({
            userId: newUser.record_id,
            username: newUser.fields.username,
            role: newUser.fields.user_type || 'user'
        });

        // Set cookie
        setCookie(event, 'auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/'
        });

        // Return success (excluding sensitive data)
        return {
            success: true,
            user: {
                id: newUser.record_id,
                username: newUser.fields.username,
                email: newUser.fields.email,
                role: newUser.fields.user_type || 'user'
            },
            token
        };

    } catch (error: any) {
        if (error.statusCode) throw error; // Re-throw known errors

        console.error('Registration error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during registration'
        });
    }
});
