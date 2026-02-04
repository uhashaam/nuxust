import { useState } from 'nuxt/app'

export interface CompanyConfig {
    companyFullName: string
    companyAbbreviation: string
    brandName: string
    contactNumber: string
    faxNumber: string
    phoneNumber: string
    email: string
    watermarkText: string
    copyrightText: string
    contactAddress: string
    qrCodeImage: string
    postalCode: string
    customerServiceQQ: string
    registrationNumber: string
    domainInfo: string
}

const defaultConfig: CompanyConfig = {
    companyFullName: 'B2B News Station',
    companyAbbreviation: 'B2B',
    brandName: 'B2B News Station',
    contactNumber: '+86-18930311251',
    faxNumber: '400-8765-098',
    phoneNumber: '+86-18930311251',
    email: 'info@aaseo.com',
    watermarkText: 'B2B NEWS',
    copyrightText: '© 2024 B2B News Station. All rights reserved.',
    contactAddress: 'Building 2, No. 525 Xizang North Road, Jing\'an District, Shanghai',
    qrCodeImage: '/images/qrcode.png',
    postalCode: '200070',
    customerServiceQQ: '87654321',
    registrationNumber: '沪ICP备2021000000号-1',
    domainInfo: 'aaseo.com'
}

export const useCompanyConfig = () => {
    const config = useState<CompanyConfig>('company-config', () => ({ ...defaultConfig }))

    const updateConfig = (newConfig: Partial<CompanyConfig>) => {
        config.value = { ...config.value, ...newConfig }
    }

    const resetConfig = () => {
        config.value = { ...defaultConfig }
    }

    return { config, updateConfig, resetConfig }
}
