import { sendEmail } from '../../utils/email';

export default defineEventHandler(async (event) => {
    try {
        await sendEmail({
            to: 'test@example.com',
            subject: 'Test Email from Cloudflare',
            text: 'Hello from Cloudflare Pages!'
        });
        return { success: true, message: 'Email sent successfully via nodemailer' };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Unknown error',
            name: error.name,
            stack: error.stack
        };
    }
});
