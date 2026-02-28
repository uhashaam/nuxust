export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email } = body;

    if (!email) {
        throw createError({ statusCode: 400, statusMessage: 'Email is required' });
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
        // Generic success message to avoid email enumeration
        return { success: true, message: 'If the email exists, a reset code has been sent' };
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    await userRepository.updateUser(user.record_id, {
        password_reset_code: code,
        code_expires_at: expiresAt
    });

    console.log(`[AUTH] Password reset code for ${email}: ${code}`);

    return {
        success: true,
        message: 'Password reset code sent to email'
    };
});
