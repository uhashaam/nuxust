export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, code, newPassword } = body;

    if (!email || !code || !newPassword) {
        throw createError({ statusCode: 400, statusMessage: 'All fields are required' });
    }

    const user = await userRepository.findByEmail(email);
    if (!user || user.fields.password_reset_code !== code) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid or expired reset code' });
    }

    if (user.fields.code_expires_at && user.fields.code_expires_at < Date.now()) {
        throw createError({ statusCode: 400, statusMessage: 'Reset code has expired' });
    }

    const passwordHash = await userAuth.hashPassword(newPassword);

    await userRepository.updateUser(user.record_id, {
        password_hash: passwordHash,
        password_reset_code: null as any,
        code_expires_at: null as any
    });

    return {
        success: true,
        message: 'Password reset successfully'
    };
});
