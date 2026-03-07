import { sendEmail } from '../../utils/email';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { email } = body;

        if (!email) {
            throw createError({ statusCode: 400, statusMessage: 'Email is required' });
        }

        const user = await userRepository.findByEmail(email);
        if (!user || !user.record_id) {
            // Generic success message to avoid email enumeration
            return { success: true, message: 'If the email exists, a reset code has been sent' };
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        await userRepository.updateUser(user.record_id, {
            password_reset_code: code,
            code_expires_at: expiresAt
        });

        try {
            await sendEmail({
                to: email,
                subject: 'Password Reset Code',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 40px 30px; background: #f8fafc;">
                        <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                            <h2 style="color: #0f172a; margin-bottom: 8px;">Reset Your Password</h2>
                            <p style="color: #64748b; margin-bottom: 24px;">Use this code to reset your password:</p>
                            <div style="background: #fff7ed; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
                                <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #ea580c;">${code}</span>
                            </div>
                            <p style="color: #94a3b8; font-size: 14px;">This code expires in <strong>15 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
                        </div>
                    </div>
                `
            });
        } catch (e) {
            // Email errors should not expose details to client
        }

        return { success: true, message: 'If the email exists, a reset code has been sent' };
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: `[Nuxt API Error - Global]: ${error.message || error.statusMessage || String(error)}`
        });
    }
});
