import * as lark from '@larksuiteoapi/node-sdk'

const LARK_BASE_APP_TOKEN = 'LYlibwPLba9KIYsAUw9ja4sCpwf'
const LARK_TABLE_INDUSTRY_SITES = 'tbllBt3KASVevh0m'
const LARK_APP_ID = 'cli_a90b535a2a381e1b'
const LARK_APP_SECRET = 'A1LYarDtsmK5IntFOhMU5giro506qBLn'

const INITIAL_SITES = [
    {
        industry_name: 'Laser Welder',
        subdomain: 'lasewelder',
        header_style_id: 1,
        footer_style_id: 1,
        banner_style_id: 1,
        news_detail_style_id: 2,
        news_list_style_id: 1,
        site_status: true,
        ai_news_toggle: true
    },
    {
        industry_name: 'Laser Cleaner',
        subdomain: 'laserleaner',
        header_style_id: 6,
        footer_style_id: 5,
        banner_style_id: 1,
        news_detail_style_id: 2,
        news_list_style_id: 5,
        site_status: true,
        ai_news_toggle: true
    },
    {
        industry_name: 'Laser Cutter',
        subdomain: 'lasercutter',
        header_style_id: 1,
        footer_style_id: 1,
        banner_style_id: 1,
        news_detail_style_id: 1,
        news_list_style_id: 3,
        site_status: true,
        ai_news_toggle: true
    },
    {
        industry_name: 'Laser Marking',
        subdomain: 'lasermarking',
        header_style_id: 6,
        footer_style_id: 6,
        banner_style_id: 1,
        news_detail_style_id: 2,
        news_list_style_id: 5,
        site_status: true,
        ai_news_toggle: true
    }
]

async function run() {
    const client = new lark.Client({
        appId: LARK_APP_ID,
        appSecret: LARK_APP_SECRET,
    })

    console.log('🚀 Attempting to import 4 sites...')

    try {
        const response = await client.bitable.appTableRecord.batchCreate({
            path: {
                app_token: LARK_BASE_APP_TOKEN,
                table_id: LARK_TABLE_INDUSTRY_SITES,
            },
            data: {
                records: INITIAL_SITES.map(s => ({ fields: s })),
            },
        })

        console.log('Response code:', response.code)
        console.log('Response msg:', response.msg)

        if (response.code === 0) {
            console.log('✅ Success! Imported', response.data.records.length, 'records')
        } else {
            console.log('❌ Failed with code', response.code, ':', response.msg)
            if (response.error) {
                console.log('Error details:', JSON.stringify(response.error, null, 2))
            }
        }
    } catch (e) {
        console.error('💥 Crash:', e.message)
    }
}

run()
