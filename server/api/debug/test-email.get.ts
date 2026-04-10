import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const targetEmail = (config as any).smtpAdminEmail || 'contact@b-2b.com'
        
        console.log(`[Debug] Sending test email to ${targetEmail}...`)
        
        const result = await sendEmail({
            to: targetEmail,
            subject: 'B2B Platform - SMTP Connection Test',
            text: `SMTP connection test successful! \n\nEnvironment: ${process.env.NITRO_PRESET}\nHost: ${(config as any).smtpHost}\nUser: ${(config as any).smtpUser}`,
            html: `<h1>SMTP Connection Test</h1>
                  <p>Your B2B Platform is successfully connected to your <strong>Titan Email</strong> SMTP server.</p>
                  <ul>
                    <li><strong>Status:</strong> Success</li>
                    <li><strong>Environment:</strong> ${process.env.NITRO_PRESET || 'Node'}</li>
                    <li><strong>Host:</strong> ${(config as any).smtpHost}</li>
                    <li><strong>User:</strong> ${(config as any).smtpUser}</li>
                  </ul>`
        })

        return {
            success: true,
            result
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
})
