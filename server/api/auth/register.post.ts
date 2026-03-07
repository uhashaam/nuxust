
import { sendEmail } from '../../utils/email';


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
    try {
        const body = await readBody(event);
        const { username, email, password, verificationCode } = body;

        if (!username || !email || !password) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields: username, email, password'
            });
        }

        if (!verificationCode) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Email verification code is required'
            });
        }

        // Validate code from secure cookie
        const rawCookie = getCookie(event, 'reg_code');
        if (!rawCookie) {
            throw createError({ statusCode: 400, statusMessage: 'Verification session expired. Please request a new code.' });
        }

        let cookieData: { email: string; code: string; expiresAt: number };
        try {
            cookieData = JSON.parse(rawCookie);
        } catch {
            throw createError({ statusCode: 400, statusMessage: 'Invalid verification session' });
        }

        if (cookieData.email !== email) {
            throw createError({ statusCode: 400, statusMessage: 'Verification code does not match this email' });
        }
        if (cookieData.code !== verificationCode) {
            throw createError({ statusCode: 400, statusMessage: 'Invalid verification code' });
        }
        if (cookieData.expiresAt < Date.now()) {
            throw createError({ statusCode: 400, statusMessage: 'Verification code has expired. Please request a new one.' });
        }

        // Clear the registration code cookie
        deleteCookie(event, 'reg_code');

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
        const token = await userAuth.generateToken({
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

        // Send welcome email (non-blocking)
        sendEmail({
            to: email,
            subject: 'Welcome to B2B Platform!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 40px 30px; background: #f8fafc;">
                    <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                        <h2 style="color: #0f172a;">Welcome, ${username}! 🎉</h2>
                        <p style="color: #64748b;">Your account has been created successfully. You can now log in and explore the platform.</p>
                        <p style="color: #64748b;">To start publishing news, upgrade your plan in your personal dashboard.</p>
                    </div>
                </div>
            `
        }).catch(() => { });

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
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: `[Nuxt API Error - Global]: ${error.message || error.statusMessage || String(error)}`
        });
    }
});
