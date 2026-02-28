const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const siteTableId = 'tbllBt3KASVevh0m';
const newsTableId = 'tblnA57O1m70HSY7';

async function link() {
    const client = new lark.Client({ appId, appSecret });
    try {
        // 1. Get a site record ID
        const sites = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: siteTableId },
            params: { page_size: 1 }
        });
        if (sites.data.items.length === 0) return console.log('No sites found');
        const siteRecordId = sites.data.items[0].record_id;
        console.log('Linking to Site Record ID:', siteRecordId);

        // 2. Get the news records I just created
        const news = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: newsTableId },
            params: { page_size: 10 }
        });

        for (const item of news.data.items) {
            if (!item.fields.site_id || item.fields.site_id.length === 0) {
                console.log(`Linking News: ${item.fields.news_title}`);
                await client.bitable.appTableRecord.update({
                    path: { app_token: appToken, table_id: newsTableId, record_id: item.record_id },
                    data: {
                        fields: {
                            "site_id": [siteRecordId]
                        }
                    }
                });
            }
        }
        console.log('Linking complete');
    } catch (e) {
        console.error('Linking failed:', e.message);
    }
}

link();
