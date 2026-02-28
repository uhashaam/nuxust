import { sendEmail } from '../../utils/email';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email } = body;

    if (!email) {
        throw createError({ statusCode: 400, statusMessage: 'Email is required' });
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw createError({ statusCode: 404, statusMessage: 'User not found' });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    await userRepository.updateUser(user.record_id, {
        verification_code: code,
        code_expires_at: expiresAt
    });

    // Use the dynamic SMTP utility to send the verification code
    await sendEmail({
        to: email,
        subject: 'Your B2B Platform Verification Code',
        text: `Your verification code is: ${code}. It will expire in 10 minutes.`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>B2B Platform Verification</h2>
                <p>Hello,</p>
                <p>Your verification code is:</p>
                <h1 style="color: #3b82f6; letter-spacing: 2px;">${code}</h1>
                <p>This code will expire in 10 minutes.</p>
                <br/>
                <p>If you did not request this code, please ignore this email.</p>
            </div>
        `
    });


    return {
        success: true,
        message: 'Verification code sent to email'
    };
});
