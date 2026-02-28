import * as lark from '@larksuiteoapi/node-sdk'

const LARK_BASE_APP_TOKEN = 'LYlibwPLba9KIYsAUw9ja4sCpwf'
const LARK_TABLE_INDUSTRY_SITES = 'tbllBt3KASVevh0m'
const LARK_APP_ID = 'cli_a90b535a2a381e1b'
const LARK_APP_SECRET = 'A1LYarDtsmK5IntFOhMU5giro506qBLn'

async function run() {
    const client = new lark.Client({
        appId: LARK_APP_ID,
        appSecret: LARK_APP_SECRET,
    })

    console.log('🏗️ Attempting to create missing field: footer_style_id...')

    try {
        const response = await client.bitable.appTableField.create({
            path: {
                app_token: LARK_BASE_APP_TOKEN,
                table_id: LARK_TABLE_INDUSTRY_SITES,
            },
            data: {
                field_name: 'footer_style_id',
                type: 2, // Number type
            },
        })

        if (response.code === 0) {
            console.log('✅ Successfully created field: footer_style_id')
        } else {
            console.log('❌ Failed to create field:', response.msg)
            console.log('Error details:', JSON.stringify(response.error, null, 2))
        }
    } catch (e) {
        console.error('💥 Crash:', e.message)
    }
}

run()
