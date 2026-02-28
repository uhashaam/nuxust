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

    console.log('🔍 Listing fields in table Industry Sites...')

    try {
        const response = await client.bitable.appTableField.list({
            path: {
                app_token: LARK_BASE_APP_TOKEN,
                table_id: LARK_TABLE_INDUSTRY_SITES,
            },
        })

        if (response.code === 0) {
            console.log('✅ Fields found:')
            response.data.items.forEach(field => {
                console.log(`- Name: "${field.field_name}", Type: ${field.type}, Id: ${field.field_id}`)
            })
        } else {
            console.log('❌ Failed to list fields:', response.msg)
        }
    } catch (e) {
        console.error('💥 Crash:', e.message)
    }
}

run()
