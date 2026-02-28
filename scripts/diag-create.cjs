const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const userTableId = 'tblDEuGA5JSsChgi';
const newsTableId = 'tblnA57O1m70HSY7';

async function diag() {
    const client = new lark.Client({ appId, appSecret });

    console.log('--- Inspecting user_type Options ---');
    try {
        const fields = await client.bitable.appTableField.list({
            path: { app_token: appToken, table_id: userTableId }
        });
        const userTypeField = fields.data.items.find(f => f.field_name === 'user_type');
        console.log('user_type options:', JSON.stringify(userTypeField.property, null, 2));
    } catch (e) { console.error('user_type probe failed:', e.message); }

    console.log('\n--- Testing News Creation ---');
    try {
        const res = await client.bitable.appTableRecord.create({
            path: { app_token: appToken, table_id: newsTableId },
            data: {
                fields: {
                    "news_title": "Diagnostic News Title",
                    "news_content": "<p>Content</p>",
                    "generation_method": "Manual",
                    "release_status": "Published",
                    "release_time": Date.now()
                }
            }
        });
        console.log('News Creation Result:', res.msg);
        if (res.code === 0) console.log('News Record ID:', res.data.record.record_id);
        else console.log('Full Error:', JSON.stringify(res, null, 2));
    } catch (e) {
        console.error('News creation failed:', e.message);
    }
}

diag();
