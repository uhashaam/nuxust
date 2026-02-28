/**
 * Template registry and dynamic loader for multi-style template system
 */

export interface TemplateConfig {
    headerId: number
    footerId: number
    bannerId: number
    newsDetailId: number
    newsListId: number
}

/**
 * Get the component name for a template type and ID
 */
export function getTemplateComponent(type: 'header' | 'footer' | 'banner' | 'newsDetail' | 'newsList', id: number) {
    const componentMap = {
        header: `Header${String(id).padStart(2, '0')}`,
        footer: `Footer${String(id).padStart(2, '0')}`,
        banner: `Banner${String(id).padStart(2, '0')}`,
        newsDetail: `NewsDetail${String(id).padStart(2, '0')}`,
        newsList: `NewsList${String(id).padStart(2, '0')}`
    }

    return componentMap[type]
}

/**
 * Dynamically import a template component
 */
export async function loadTemplate(type: 'header' | 'footer' | 'banner' | 'newsDetail' | 'newsList', id: number) {
    const componentName = getTemplateComponent(type, id)

    const pathMap = {
        header: `~/components/templates/headers/${componentName}.vue`,
        footer: `~/components/templates/footers/${componentName}.vue`,
        banner: `~/components/templates/banners/${componentName}.vue`,
        newsDetail: `~/components/templates/news-detail/${componentName}.vue`,
        newsList: `~/components/templates/news-list/${componentName}.vue`
    }

    try {
        return await import(pathMap[type])
    } catch (error) {
        console.error(`Failed to load template: ${componentName}`, error)
        // Fallback to default templates
        const fallbackMap = {
            header: '~/components/templates/headers/Header01.vue',
            footer: '~/components/templates/footers/Footer01.vue',
            banner: '~/components/templates/banners/Banner01.vue',
            newsDetail: '~/components/templates/news-detail/NewsDetail01.vue',
            newsList: '~/components/templates/news-list/NewsList01.vue'
        }
        return await import(fallbackMap[type])
    }
}

/**
 * Get template configuration for an industry site
 */
export async function getSiteTemplateConfig(subdomain: string): Promise<TemplateConfig> {
    try {
        const { data } = await useFetch(`/api/industry-sites/${subdomain}`)

        if (data.value && data.value.site) {
            const site = data.value.site
            return {
                headerId: site.headerStyleId || site.header_style_id || 1,
                footerId: site.footerStyleId || site.footer_style_id || 1,
                bannerId: site.bannerStyleId || site.banner_style_id || 1,
                newsDetailId: site.newsDetailStyleId || site.news_detail_style_id || 1,
                newsListId: site.newsListStyleId || site.news_list_style_id || 1
            }
        }
    } catch (error) {
        console.error('Failed to fetch template config:', error)
    }

    // Default configuration
    return {
        headerId: 1,
        footerId: 1,
        bannerId: 1,
        newsDetailId: 1,
        newsListId: 1
    }
}

/**
 * Validate template ID is within valid range
 */
export function validateTemplateId(type: 'header' | 'footer' | 'banner' | 'newsDetail' | 'newsList', id: number): boolean {
    const maxIds = {
        header: 10,
        footer: 10,
        banner: 5,
        newsDetail: 5,
        newsList: 5
    }

    return id >= 1 && id <= maxIds[type]
}

/**
 * Get all available template options for admin UI
 */
export function getTemplateOptions(type: 'header' | 'footer' | 'banner' | 'newsDetail' | 'newsList') {
    const descriptions = {
        header: [
            '1. Minimalist horizontal (left nav, white bg)',
            '2. Centered nav (gray bg, hover effect)',
            '3. Left vertical nav (dark gray, white text)',
            '4. Two-column (top logo, bottom nav)',
            '5. Right nav with icons',
            '6. Dark theme centered (blue underline)',
            '7. Transparent minimal (core nav only)',
            '8. Dropdown menu (light blue bg)',
            '9. Left icon + centered name + right nav',
            '10. Retro minimal (black text, thin underlines)'
        ],
        footer: [
            '1. Single column centered (white bg)',
            '2. Two-column horizontal (gray bg)',
            '3. Three-column vertical (dark bg)',
            '4. Transparent minimal',
            '5. Three-column (light blue bg)',
            '6. Dark two-column with icons',
            '7. Single column with feedback link',
            '8. Multi-column with industry overview',
            '9. Minimalist horizontal (bold text)',
            '10. Retro Song font (beige bg)'
        ],
        banner: [
            '1. Tech gradient (blue, lighting effects)',
            '2. Industrial (dark gray, metallic)',
            '3. Minimalist fresh (light gray/white)',
            '4. Professional business (light blue/gray)',
            '5. Heavy texture (dark brown/green)'
        ],
        newsDetail: [
            '1. Clean minimalist',
            '2. Tech theme (blue accents)',
            '3. Industrial theme (dark gray)',
            '4. Business minimalist',
            '5. Clean centered (light colors)'
        ],
        newsList: [
            '1. Card horizontal (thumbnail + text)',
            '2. List without thumbnails',
            '3. Vertical grid cards',
            '4. Minimalist line format',
            '5. Tech-themed list (blue icons)'
        ]
    }

    return descriptions[type].map((desc, index) => ({
        id: index + 1,
        label: desc,
        value: index + 1
    }))
}
