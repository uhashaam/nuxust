const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const newsTableId = 'tblnA57O1m70HSY7';
const siteTableId = 'tbllBt3KASVevh0m';

async function fetchAllRecords(app_token, table_id) {
    const client = new lark.Client({ appId, appSecret });
    const records = [];
    let pageToken = '';
    do {
        const res = await client.bitable.appTableRecord.list({
            path: { app_token, table_id },
            params: { page_token: pageToken, page_size: 500 }
        });
        records.push(...(res.data.items || []));
        pageToken = res.data.page_token;
    } while (pageToken);
    return records;
}

async function debugNews() {
    try {
        const [news, sites] = await Promise.all([
            fetchAllRecords(appToken, newsTableId),
            fetchAllRecords(appToken, siteTableId)
        ]);

        console.log(`Total News: ${news.length}`);
        console.log(`Total Sites: ${sites.length}`);

        const siteMap = new Map(sites.map(s => [s.record_id, s.fields.industry_name]));

        const sampleNews = news.map(n => {
            const siteIdsField = n.fields.site_id || [];
            console.log(`\nPost: ${n.fields.news_title}`);
            console.log(`site_id field: ${JSON.stringify(siteIdsField)}`);

            let category = 'Industry';
            for (const sf of siteIdsField) {
                const rid = typeof sf === 'string' ? sf : (sf.record_id || (sf.record_ids && sf.record_ids[0]));
                console.log(`Resolved rid: ${rid}`);
                if (rid && siteMap.has(rid)) {
                    category = siteMap.get(rid);
                    console.log(`Found category: ${category}`);
                    break;
                }
            }
            return { title: n.fields.news_title, category };
        });

        console.log('\nFinal Sample Mapping:', JSON.stringify(sampleNews.slice(0, 3), null, 2));

    } catch (e) {
        console.error(e);
    }
}

debugNews();
