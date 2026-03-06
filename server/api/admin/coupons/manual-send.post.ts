// Manual coupon distribution — sends coupon to a specific user by record ID
import { sendEmail } from '../../../utils/email';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    if (!token) throw createError({ statusCode: 401, message: 'Not authenticated' });
    const payload = await userAuth.verifyToken(token);
    if (!payload || payload.role !== 'admin') throw createError({ statusCode: 403, message: 'Admin access required' });

    const body = await readBody(event);
    const { userId, couponCode, discountPercent, message, expiryDate } = body;

    if (!userId || !couponCode) {
        throw createError({ statusCode: 400, message: 'userId and couponCode are required' });
    }

    // Fetch the specific user
    const user = await userRepository.findByUsernameOrEmail(userId);
    if (!user) {
        // Also try by record ID — look up directly
        throw createError({ statusCode: 404, message: 'User not found. Use their email or username.' });
    }

    const email = user.fields.email;
    const username = user.fields.username || 'User';

    if (!email) {
        throw createError({ statusCode: 400, message: 'User has no email address on record' });
    }

    await sendEmail({
        to: email,
        subject: `🎁 Your Exclusive Coupon: ${couponCode}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 40px 30px; background: #f8fafc;">
                <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <span style="font-size: 3rem;">🎁</span>
                        <h2 style="color: #0f172a; margin-top: 8px;">Hi ${username}!</h2>
                        <p style="color: #64748b;">You've received an exclusive coupon just for you.</p>
                    </div>
                    ${message ? `<p style="color: #475569; margin-bottom: 16px;">${message}</p>` : ''}
                    <div style="background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 2px dashed #3b82f6; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
                        <p style="color: #64748b; margin-bottom: 8px; font-size: 14px;">YOUR COUPON CODE</p>
                        <span style="font-size: 28px; font-weight: 700; letter-spacing: 4px; color: #1d4ed8;">${couponCode}</span>
                        ${discountPercent ? `<p style="color: #16a34a; font-weight: 600; margin-top: 8px;">${discountPercent}% OFF</p>` : ''}
                        ${expiryDate ? `<p style="color: #94a3b8; font-size: 12px; margin-top: 8px;">Valid until: ${expiryDate}</p>` : ''}
                    </div>
                    <div style="text-align: center;">
                        <a href="https://b-2b.com/pricing" style="background: #2563eb; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Apply Coupon</a>
                    </div>
                </div>
            </div>
        `
    });

    return { success: true, message: `Coupon sent successfully to ${email}` };
});
