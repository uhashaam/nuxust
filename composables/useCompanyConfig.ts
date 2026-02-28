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
    companyFullName: 'B2B New Station',
    companyAbbreviation: 'B2B',
    brandName: 'B2B New Station',
    contactNumber: '+86-18930311251',
    faxNumber: '400-8765-098',
    phoneNumber: '+86-18930311251',
    email: 'info@aaseo.com',
    watermarkText: 'B2B NEWS',
    copyrightText: '© 2026 B2B New Station. All rights reserved.',
    contactAddress: 'Building 2, No. 525 Xizang North Road, Jing\'an District, Shanghai',
    qrCodeImage: '/images/qrcode.png',
    postalCode: '200070',
    customerServiceQQ: '87654321',
    registrationNumber: '沪ICP备2021000000号-1',
    domainInfo: 'aaseo.com'
}

export const useCompanyConfig = () => {
    const config = useState<CompanyConfig>('company-config', () => ({ ...defaultConfig }))
    const isLoading = useState('company-config-loading', () => false)

    const fetchConfig = async () => {
        isLoading.value = true
        try {
            const data = await $fetch('/api/config/get')
            if (data.success && data.config) {
                config.value = { ...defaultConfig, ...data.config }
            }
        } catch (error) {
            console.error('Failed to fetch company config:', error)
        } finally {
            isLoading.value = false
        }
    }

    // Initial load
    if (process.server || (process.client)) {
        // We only fetch if it's the first time or server-side
        // To avoid multiple fetches, we can check a flag
    }

    const updateConfig = async (newConfig: Partial<CompanyConfig>) => {
        isLoading.value = true
        try {
            const updated = { ...config.value, ...newConfig }
            await $fetch('/api/config/update', {
                method: 'POST',
                body: updated
            })
            config.value = updated
        } catch (error) {
            console.error('Failed to update company config:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    const resetConfig = async () => {
        if (confirm('Are you sure you want to reset to defaults?')) {
            await updateConfig(defaultConfig)
        }
    }

    return { config, isLoading, updateConfig, resetConfig, fetchConfig }
}

