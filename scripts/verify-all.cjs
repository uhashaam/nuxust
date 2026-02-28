const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content

async function verifyAll() {
    const client = new lark.Client({ appId, appSecret });
    try {
        let allItems = [];
        let pageToken = undefined;
        let hasMore = true;

        while (hasMore) {
            const res = await client.bitable.appTableRecord.list({
                path: { app_token: appToken, table_id: tableId },
                params: { page_size: 100, page_token: pageToken }
            });

            if (res.code !== 0) {
                console.error(`Lark Error: ${res.code} - ${res.msg}`);
                return;
            }

            if (res.data.items) {
                allItems = allItems.concat(res.data.items);
            }

            hasMore = res.data.has_more;
            pageToken = res.data.page_token;
        }

        console.log(`Total articles fetched: ${allItems.length}\n`);

        allItems.forEach((f, index) => {
            const title = f.fields.news_title || 'Untitled';
            const content = f.fields.news_content || '';
            const images = f.fields.featured_image || [];

            let status = "OK";
            let reasons = [];

            if (content.length < 500) {
                status = "WARNING";
                reasons.push(`Content too short (${content.length} chars)`);
            }

            if (images.length === 0) {
                status = "ERROR";
                reasons.push("No featured image");
            } else {
                images.forEach(img => {
                    if (img.size < 1000) {
                        status = "ERROR";
                        reasons.push(`Image '${img.name}' is too small or invalid (${img.size} bytes)`);
                    }
                });
            }

            console.log(`${index + 1}. [${status}] ${title}`);
            if (reasons.length > 0) {
                reasons.forEach(r => console.log(`   - ${r}`));
            }
        });

    } catch (e) {
        console.error(e);
    }
}

verifyAll();
