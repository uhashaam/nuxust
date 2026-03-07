export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, code } = body;

    if (!email || !code) {
        throw createError({ statusCode: 400, statusMessage: 'Email and code are required' });
    }

    const user = await userRepository.findByEmail(email);
    if (!user || !user.record_id) {
        throw createError({ statusCode: 404, statusMessage: 'User not found' });
    }

    if (user.fields.verification_code !== code) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid verification code' });
    }

    if (user.fields.code_expires_at && user.fields.code_expires_at < Date.now()) {
        throw createError({ statusCode: 400, statusMessage: 'Verification code has expired' });
    }

    // Activate user
    await userRepository.updateUser(user.record_id, {
        user_status: 'active',
        verification_code: null as any,
        code_expires_at: null as any
    });

    return {
        success: true,
        message: 'Email verified successfully'
    };
});
