// Bulk coupon distribution — sends coupon to all users of a specific user_type
import { sendEmail } from '../../../utils/email';
import { prisma } from '../../../utils/prisma';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    if (!token) throw createError({ statusCode: 401, message: 'Not authenticated' });
    const payload = await userAuth.verifyToken(token);
    if (!payload || payload.role !== 'admin') throw createError({ statusCode: 403, message: 'Admin access required' });

    const body = await readBody(event);
    const { userType, couponCode, discountPercent, message, expiryDate } = body;

    if (!userType || !couponCode) {
        throw createError({ statusCode: 400, message: 'userType and couponCode are required' });
    }

    // Fetch users from MySQL via Prisma
    const users = await prisma.user.findMany({
        where: userType === 'all'
            ? { email: { not: null } }
            : { user_type: userType.toLowerCase(), email: { not: null } },
        select: { email: true, username: true, user_type: true },
    });

    let sent = 0, errors = 0;

    for (const user of users) {
        if (!user.email) continue;
        try {
            await sendEmail({
                to: user.email,
                subject: `🎁 Exclusive Coupon: ${couponCode}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 40px 30px; background: #f8fafc;">
                        <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                            <div style="text-align: center; margin-bottom: 24px;">
                                <span style="font-size: 3rem;">🎁</span>
                                <h2 style="color: #0f172a; margin-top: 8px;">You've Got a Coupon!</h2>
                            </div>
                            ${message ? `<p style="color: #475569;">${message}</p>` : ''}
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
            sent++;
        } catch (e) {
            errors++;
        }
    }

    return { success: true, targeted: users.length, sent, errors };
});
