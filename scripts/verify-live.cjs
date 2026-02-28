const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const newsTableId = 'tblnA57O1m70HSY7';
const plansTableId = 'tblFDfcvNDMfRH9X';

async function verifyLive() {
    const client = new lark.Client({ appId, appSecret });

    console.log('\n--- Checking News Table for "Dummy Post" ---');
    try {
        const newsRes = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: newsTableId },
            params: { page_size: 100 }
        });
        if (newsRes.code === 0) {
            const dummyPost = newsRes.data.items.find(i => i.fields.news_title && i.fields.news_title.includes('Dummy'));
            if (dummyPost) {
                console.log('Found Dummy Post:', JSON.stringify(dummyPost.fields, null, 2));
            } else {
                console.log('Dummy Post not found in first 100 records.');
                console.log('Latest record titles:', newsRes.data.items.slice(0, 5).map(i => i.fields.news_title));
            }
        } else {
            console.log('News fetch failed:', newsRes.msg);
        }
    } catch (e) { console.error(e); }

    console.log('\n--- Checking Plans Table ---');
    try {
        const plansRes = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: plansTableId }
        });
        console.log('Plans record count:', plansRes.data?.items?.length || 0);
        if (plansRes.data?.items?.length > 0) {
            console.log('First plan sample:', JSON.stringify(plansRes.data.items[0].fields, null, 2));
        }
    } catch (e) { console.error(e); }
}

verifyLive();
