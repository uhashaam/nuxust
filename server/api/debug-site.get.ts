import { prisma } from '../utils/prisma'
export default defineEventHandler(async (event) => {
    try {
        const subdomainParam = 'lasercutter'
        const record = await prisma.industrySite.findFirst({
            where: {
                OR: [
                    { sub_domain: subdomainParam },
                    { subdomain: subdomainParam }
                ]
            }
        })
        return { success: true, record }
    } catch (e: any) {
        return { success: false, error: e.message, code: e.code, meta: e.meta }
    }
})
