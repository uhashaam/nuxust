const lark = require('@larksuiteoapi/node-sdk');
const axios = require('axios');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content

const articles = [
    {
        title: "The Industrial Clean-Tech Revolution: Why Laser Ablation is the Future of Surface Prep",
        content: `
            <h2>Beyond Sand and Chemicals</h2>
            <p>The environmental footprint of industrial maintenance has historically been massive. Enter High-Power Laser Ablation: a process that cleans surfaces using nothing but light.</p>

            <h3>How Laser Cleaning Works (A Physics Perspective)</h3>
            <p>Laser cleaning utilizes short pulses of high-intensity laser light to sublimate rust, grease, and paint without damaging the substrate. Because the underlying metal reflects the laser wavelength, the cleaning stops exactly where it should.</p>

            <h3>The Total Cost of Ownership Advantage</h3>
            <ol>
                <li><strong>Zero Media Costs:</strong> No more buying tons of glass beads or garnet.</li>
                <li><strong>No Cleanup:</strong> No secondary waste generated.</li>
                <li><strong>Reliable:</strong> Fiber sources last up to 100,000 hours.</li>
            </ol>
        `,
        siteId: 'recWExnALZ', // lasercleaner
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: "Power and Precision: Navigating the Shift to 30kW+ Fiber Laser Cutting",
        content: `
            <h2>The Race for Higher Wattage</h2>
            <p>The industry standard for heavy fabrication has surged toward 30kW. This growh in power is not just about cutting thicker plates; it is about redefining the boundaries of "high-speed" production.</p>

            <h3>Intelligent Cutting Heads</h3>
            <p>Modern cutting heads are now equipped with internal cameras and sensors that monitor the "pierce" and "cut" stability in real-time. This allows for "lights-out" manufacturing.</p>

            <p>For job shops looking to remain competitive, the transition to ultra-high-power fiber systems is no longer optional.</p>
        `,
        siteId: 'recC9f5sG6', // lasercutter
        imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80'
    }
];

async function seedRemaining() {
    const client = new lark.Client({ appId, appSecret });

    for (const art of articles) {
        process.stdout.write('Seeding: ' + art.title + '... ');
        try {
            // 1. Download
            const response = await axios.get(art.imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data);

            // 2. Upload
            const uploadRes = await client.drive.media.uploadAll({
                data: {
                    file_name: 'industry_news_' + Date.now() + '.jpg',
                    parent_type: 'bitable_image',
                    parent_node: appToken,
                    size: buffer.length,
                    file: buffer,
                }
            });

            if (!uploadRes.file_token) {
                console.log('Upload failed: ' + JSON.stringify(uploadRes));
                continue;
            }

            const fileToken = uploadRes.file_token;

            // 3. Create
            const fields = {
                "news_title": art.title,
                "news_content": art.content,
                "generation_method": "Manual",
                "release_time": Date.now(),
                "release_status": "Published",
                "site_id": [art.siteId],
                "featured_image": [{ file_token: fileToken }],
                "author_email": "editorial@laser-news.com"
            };

            const res = await client.bitable.appTableRecord.create({
                path: { app_token: appToken, table_id: tableId },
                data: { fields }
            });

            if (res.code === 0) {
                console.log('Success (ID: ' + res.data.record.record_id + ')');
            } else {
                console.log('Detailed Error: ' + res.code + ' - ' + res.msg);
                console.log('Fields sent: ' + JSON.stringify(fields, null, 2));
            }
        } catch (e) {
            console.log('Exception: ' + e.message);
        }
    }
}

seedRemaining();
