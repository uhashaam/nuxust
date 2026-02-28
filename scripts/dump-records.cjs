const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const newsTableId = 'tblnA57O1m70HSY7';
const siteTableId = 'tbllBt3KASVevh0m';

async function dumpRecords() {
    const client = new lark.Client({ appId, appSecret });
    try {
        const newsRes = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: newsTableId },
            params: { page_size: 1 }
        });
        const siteRes = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: siteTableId },
            params: { page_size: 1 }
        });

        console.log('--- News Record Sample ---');
        console.log(JSON.stringify(newsRes.data.items[0], null, 2));

        console.log('\n--- Site Record Sample ---');
        console.log(JSON.stringify(siteRes.data.items[0], null, 2));

    } catch (e) {
        console.error(e);
    }
}

dumpRecords();
