import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
    // 1. Validate Admin Auth (Add checks if necessary)
    const body = await readBody(event);

    try {
        const keysToUpdate = [
            'smtp_host', 'smtp_port', 'smtp_user', 'smtp_from_email', 'smtp_from_name'
        ];

        // Process secrets only if they are not the masked placeholder
        if (body.smtp_password && body.smtp_password !== '********') {
            keysToUpdate.push('smtp_password');
        }
        if (body.resend_api_key && body.resend_api_key !== '********') {
            keysToUpdate.push('resend_api_key');
        }

        // Loop through keys and upsert in MySQL via Prisma
        for (const key of keysToUpdate) {
            const value = body[key] ? String(body[key]) : '';

            await prisma.adminSetting.upsert({
                where: { key: key },
                update: { value: value },
                create: { key: key, value: value }
            });
        }

        return {
            success: true,
            message: 'SMTP Configuration saved successfully'
        };
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            message: `Failed to save SMTP Configuration: ${error.message || 'Unknown error'}`
        });
    }
});
