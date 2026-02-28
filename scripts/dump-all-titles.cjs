const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content

async function dumpAll() {
    const client = new lark.Client({ appId, appSecret });
    try {
        const res = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: tableId },
            params: { page_size: 100 }
        });

        console.log(`Total records: ${res.data.items ? res.data.items.length : 0}`);
        if (res.data.items) {
            res.data.items.forEach((f, i) => {
                console.log(`${i + 1}. ${f.fields.news_title}`);
            });
        }
    } catch (e) { console.error(e); }
}

dumpAll();
