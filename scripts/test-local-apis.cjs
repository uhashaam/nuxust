const http = require('http');

console.log('Starting API tests...');

const endpoints = [
    '/api/news/all',
    '/api/news/by-site/laserwelder',
    '/api/news/item/dummy-post'
];

async function testEndpoint(path) {
    return new Promise((resolve) => {
        const options = {
            hostname: '::1',
            port: 3000,
            path: path,
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                console.log(`\n--- Endpoint: ${path} ---`);
                console.log(`Status: ${res.statusCode}`);
                try {
                    if (data) {
                        const json = JSON.parse(data);
                        console.log(`Success: ${json.success}`);
                        if (json.news) {
                            console.log(`Count: ${json.news.length}`);
                            if (json.news.length > 0) {
                                console.log(`First item title: ${json.news[0].title}`);
                                console.log(`First item category: ${json.news[0].category}`);
                            }
                        } else if (json.article) {
                            console.log(`Article Title: ${json.article.title}`);
                        }
                    } else {
                        console.log('Empty response data');
                    }
                } catch (e) {
                    console.log('Error parsing response:', data.substring(0, 100));
                }
                resolve();
            });
        });

        req.on('error', (e) => {
            console.error(`Problem with request ${path}: ${e.message}`);
            resolve();
        });
        req.end();
    });
}

async function runTests() {
    for (const p of endpoints) {
        await testEndpoint(p);
    }
}

runTests();
