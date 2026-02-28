const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const userTableId = 'tblDEuGA5JSsChgi';
const newsTableId = 'tblnA57O1m70HSY7';

async function probe() {
    const client = new lark.Client({
        appId,
        appSecret,
    });

    console.log('--- Column Names for Users Table ---');
    try {
        const res = await client.bitable.appTableField.list({
            path: { app_token: appToken, table_id: userTableId }
        });
        if (res.code === 0) {
            res.data.items.forEach(f => console.log(`- ${f.field_name} (ID: ${f.field_id})`));
        } else {
            console.error('Error fetching user fields:', res.msg);
        }
    } catch (e) {
        console.error('User probe failed:', e);
    }

    console.log('\n--- Column Names for News Table ---');
    try {
        const res = await client.bitable.appTableField.list({
            path: { app_token: appToken, table_id: newsTableId }
        });
        if (res.code === 0) {
            res.data.items.forEach(f => console.log(`- ${f.field_name} (ID: ${f.field_id})`));
        } else {
            console.error('Error fetching news fields:', res.msg);
        }
    } catch (e) {
        console.error('News probe failed:', e);
    }
}

probe();
