const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content

async function findRecent() {
    const client = new lark.Client({ appId, appSecret });
    try {
        const res = await client.bitable.appTableRecord.list({
            path: { app_token: appToken, table_id: tableId }
        });

        if (res.code !== 0) {
            console.error(`Lark Error: ${res.code} - ${res.msg}`);
            return;
        }

        const items = res.data.items || [];
        console.log(`Found ${items.length} total articles.`);

        const editorial = items.filter(f => f.fields.author_email === "editorial@laser-news.com");
        console.log(`Found ${editorial.length} articles from editorial@laser-news.com`);

        editorial.forEach(f => {
            console.log(`- Title: ${f.fields.news_title}`);
            console.log(`  Record ID: ${f.record_id}`);
            console.log(`  Image: ${JSON.stringify(f.fields.featured_image)}`);
        });
    } catch (e) { console.error(e); }
}

findRecent();
