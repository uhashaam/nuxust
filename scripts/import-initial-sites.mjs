/**
 * Script to import initial 4 laser industry sites into Lark Base
 */

const LARK_BASE_APP_TOKEN = 'LYlibwPLba9KIYsAUw9ja4sCpwf'
const LARK_TABLE_INDUSTRY_SITES = 'tbllBt3KASVevh0m'
const LARK_APP_ID = 'cli_a90b535a2a381e1b'
const LARK_APP_SECRET = 'A1LYarDtsmK5IntFOhMU5giro506qBLn'

const INITIAL_SITES = [
    {
        industry_name: 'Laser Welder',
        subdomain: 'laserwelder',
        ssl_status: 'Pending',
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
        subdomain: 'lasercleaner',
        ssl_status: 'Pending',
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
        ssl_status: 'Pending',
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
        ssl_status: 'Pending',
        header_style_id: 6,
        footer_style_id: 6,
        banner_style_id: 1,
        news_detail_style_id: 2,
        news_list_style_id: 5,
        site_status: true,
        ai_news_toggle: true
    }
]

async function getTenantAccessToken() {
    const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            app_id: LARK_APP_ID,
            app_secret: LARK_APP_SECRET
        })
    })

    const data = await response.json()
    if (data.code !== 0) {
        throw new Error(`Failed to get access token: ${data.msg}`)
    }

    return data.tenant_access_token
}

async function batchCreateRecords(accessToken, records) {
    const response = await fetch(
        `https://open.feishu.cn/open-apis/bitable/v1/apps/${LARK_BASE_APP_TOKEN}/tables/${LARK_TABLE_INDUSTRY_SITES}/records/batch_create`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ records })
        }
    )

    const data = await response.json()
    if (data.code !== 0) {
        throw new Error(`Failed to create records: ${data.msg}`)
    }

    return data.data.records
}

async function importSites() {
    console.log('🚀 Starting import of 4 laser industry sites to Lark Base...\n')

    try {
        // Get access token
        console.log('🔐 Getting Lark access token...')
        const accessToken = await getTenantAccessToken()
        console.log('✅ Access token obtained\n')

        // Prepare records for Lark Base format
        const records = INITIAL_SITES.map(site => ({
            fields: site
        }))

        console.log('📝 Importing sites:')
        INITIAL_SITES.forEach(site => {
            console.log(`   - ${site.industry_name} (${site.subdomain}.b-2b.com)`)
        })
        console.log('')

        // Import to Lark Base
        console.log('📤 Uploading to Lark Base...')
        const result = await batchCreateRecords(accessToken, records)

        console.log('✅ Import successful!')
        console.log(`   Created ${result.length} records in Lark Base\n`)

        console.log('📊 Summary:')
        result.forEach((record, index) => {
            console.log(`   ${index + 1}. ${INITIAL_SITES[index].industry_name}`)
            console.log(`      Record ID: ${record.record_id}`)
            console.log(`      Subdomain: ${INITIAL_SITES[index].subdomain}.b-2b.com`)
            console.log(`      Templates: H${INITIAL_SITES[index].header_style_id} F${INITIAL_SITES[index].footer_style_id} B${INITIAL_SITES[index].banner_style_id}`)
            console.log('')
        })

        console.log('🎉 All sites imported successfully!\n')
        console.log('✨ Next steps:')
        console.log('   1. Check your Lark Base table: https://cychuhai.jp.larksuite.com/base/LYlibwPLba9KIYsAUw9ja4sCpwf')
        console.log('   2. Test API: http://localhost:3000/api/industry-sites')
        console.log('')

    } catch (error) {
        console.error('❌ Import failed:', error.message)
        if (error.stack) {
            console.error('   Stack:', error.stack)
        }
        process.exit(1)
    }
}

// Run import
importSites()
