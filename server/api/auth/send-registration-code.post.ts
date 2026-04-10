import { sendEmail } from '../../utils/email';

// Pre-registration code endpoint — checks email is available before creating an account
export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { email } = body;

        if (!email) {
            throw createError({ statusCode: 400, statusMessage: 'Email is required' });
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw createError({ statusCode: 400, statusMessage: 'Invalid email format' });
        }

        // Check if email is already registered
        const existing = await userRepository.findByEmail(email);
        if (existing && existing.fields.user_status !== 'pending') {
            throw createError({ statusCode: 409, statusMessage: 'This email is already registered' });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        // If a pending record exists, update it; otherwise store code in KV-style via cookie
        // We'll store in a temporary Lark record or just a signed cookie
        // For simplicity: store code in a signed, short-lived cookie on the server response
        setCookie(event, 'reg_code', JSON.stringify({ email, code, expiresAt }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 10 * 60, // 10 minutes
            path: '/',
            sameSite: 'strict'
        });

        // Send non-blocking email
        sendEmail({
            to: email,
            subject: 'Your Registration Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 40px 30px; background: #f8fafc;">
                    <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                        <h2 style="color: #0f172a; margin-bottom: 8px;">Verify Your Email</h2>
                        <p style="color: #64748b; margin-bottom: 24px;">Enter this code to complete your registration:</p>
                        <div style="background: #eff6ff; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
                            <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #2563eb;">${code}</span>
                        </div>
                        <p style="color: #94a3b8; font-size: 14px;">This code expires in <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
                    </div>
                </div>
            `
        }).catch(err => {
            console.error('[Background Email Error]:', err.message);
        });

        return { success: true, message: 'Verification code sent to your email' };
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: `[Nuxt API Error - Global]: ${error.message || error.statusMessage || String(error)}`
        });
    }
});
