/**
 * Initial 4 Laser Industry Sites Data
 * These will be imported into Lark Base
 */

export const INITIAL_SITES = [
    {
        industry_name: 'Laser Welder',
        subdomain: 'lasewelder',
        ssl_status: 'Pending',
        header_style_id: 1,
        footer_style_id: 1,
        banner_style_id: 1,
        news_detail_style_id: 2,
        news_list_style_id: 1,
        site_status: true,
        bound_user_id: null,
        ai_news_toggle: true
    },
    {
        industry_name: 'Laser Cleaner',
        subdomain: 'laserleaner',
        ssl_status: 'Pending',
        header_style_id: 6,
        footer_style_id: 5,
        banner_style_id: 1,
        news_detail_style_id: 2,
        news_list_style_id: 5,
        site_status: true,
        bound_user_id: null,
        ai_news_toggle: true
    },
    {
        industry_name: 'Laser Cutter',
        subdomain: 'lasercutter',
        ssl_status: 'Pending',
        header_style_id: 1,
        footer_style_id: 1,
        banner_style_id: 1,
        news_detail_style_id: 1,
        news_list_style_id: 3,
        site_status: true,
        bound_user_id: null,
        ai_news_toggle: true
    },
    {
        industry_name: 'Laser Marking',
        subdomain: 'lasermarking',
        ssl_status: 'Pending',
        header_style_id: 6,
        footer_style_id: 6,
        banner_style_id: 1,
        news_detail_style_id: 2,
        news_list_style_id: 5,
        site_status: true,
        bound_user_id: null,
        ai_news_toggle: true
    }
]

export function getSiteBySubdomain(subdomain: string) {
    return INITIAL_SITES.find(site => site.subdomain === subdomain)
}

export function getAllSites() {
    return INITIAL_SITES
}
