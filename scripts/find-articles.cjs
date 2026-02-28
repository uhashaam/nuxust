const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content

async function findMyArticles() {
    const client = new lark.Client({ appId, appSecret });
    try {
        const res = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: tableId },
            params: { filter: 'CurrentValue.[news_title].contains("The Future of Precision")' }
        });

        console.log(`Found ${res.data.items ? res.data.items.length : 0} articles matching query.`);
        if (res.data.items) {
            res.data.items.forEach(f => {
                console.log(`- Title: ${f.fields.news_title}`);
                console.log(`  Image: ${JSON.stringify(f.fields.featured_image)}`);
            });
        }
    } catch (e) { console.error(e); }
}

findMyArticles();
