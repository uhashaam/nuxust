const lark = require('@larksuiteoapi/node-sdk');
const axios = require('axios');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content

const articles = [
    {
        title: "[2026 Guide] Deep Dive: The Evolution of Handheld Laser Welding in Industrial Fabrication",
        content: `
            <h2>The Paradigm Shift in Welding Technology</h2>
            <p>For decades, manual metal joining remained largely unchanged, relying on the skilled hands of TIG and MIG welders. However, 2026 marks the definitive tipping point where handheld laser welding has transitioned from an expensive novelty to an indispensable shop floor tool.</p>
            
            <h3>Breaking Down the Performance Barriers</h3>
            <ul>
                <li><strong>Unprecedented Speed:</strong> Operators report completion times up to 8 times faster than TIG welding on 3mm stainless steel.</li>
                <li><strong>Aesthetically Superior Joints:</strong> The "fish-scale" pattern sought by TIG welders is achieved automatically by the laser's oscillation (wobble) settings.</li>
                <li><strong>Simplified Labor Requirements:</strong> A laser welder can be mastered by a diligent apprentice in just a few days of training.</li>
            </ul>

            <p>The investment in a laser welding system is not just an equipment upgrade; it is a fundamental restructuring of throughput and quality control.</p>
        `,
        siteId: 'recaYAqN0I', // laserwelder
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: "The Industrial Clean-Tech Revolution: Why Laser Ablation is the Future of Surface Prep",
        content: `
            <h2>Beyond Sand and Chemicals</h2>
            <p>The environmental footprint of industrial maintenance has historically been massive. Enter High-Power Laser Ablation: a process that cleans surfaces using nothing but light.</p>

            <h3>How Laser Cleaning Works</h3>
            <p>Laser cleaning utilizes short pulses of high-intensity laser light to sublimate rust, grease, and paint without damaging the substrate. Because the underlying metal reflects the laser wavelength, the cleaning stops exactly where it should.</p>

            <ol>
                <li><strong>Zero Media Costs:</strong> No more buying tons of glass beads or garnet.</li>
                <li><strong>Zero Secondary Waste:</strong> No chemicals or media to sweep up or dispose of.</li>
                <li><strong>High Reliability:</strong> Fiber laser sources are rated for 100,000 hours of operation.</li>
            </ol>
        `,
        siteId: 'recWExnALZ', // lasercleaner
        imageUrl: 'https://images.unsplash.com/photo-1565151443315-7a0e3f0f7f3a?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: "Power and Precision: Navigating the Shift to 30kW+ Fiber Laser Cutting",
        content: `
            <h2>The Race for Higher Wattage</h2>
            <p>Day by day, the industry standard for heavy fabrication has surged toward 30kW. This growth in power is not just about cutting thicker plates; it is about redefining the boundaries of "high-speed" production.</p>

            <h3>Intelligent Cutting Heads</h3>
            <p>Modern cutting heads are now equipped with internal cameras and sensors that monitor the "pierce" and "cut" stability in real-time. This level of autonomy allows for "lights-out" manufacturing, where machines run unattended through the night.</p>

            <p>For job shops looking to remain competitive, the transition to ultra-high-power fiber systems is no longer optional—it is a prerequisite for survival.</p>
        `,
        siteId: 'recC9f5sG6', // lasercutter
        imageUrl: 'https://images.unsplash.com/photo-1565349978634-c9e57b5a8a68?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: "Bulletproof Traceability: How Laser Marking is Transforming Global Supply Chains",
        content: `
            <h2>The Permanent Digital Link</h2>
            <p>In a globalized economy, the "Digital Twin" of a product starts with its physical mark. Laser marking provides the permanent link between a physical part and its digital history.</p>

            <h3>Precision and Purity</h3>
            <p>In the medical device industry, surface integrity is non-negotiable. Fiber laser "annealing" solves this by heating the surface just enough to create an oxide layer (a permanent black mark) without actually compromising the smooth surface finish.</p>

            <p>This "Closed-Loop" marking is essential for achieving Zero-Defect manufacturing in the automotive and aerospace sectors.</p>
        `,
        siteId: 'recbWwQfQp', // lasermarking
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
    }
];

async function seedArticles() {
    const client = new lark.Client({ appId, appSecret });

    for (const art of articles) {
        process.stdout.write('Processing: ' + art.title + '... ');
        try {
            // 1. Download image
            const response = await axios.get(art.imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data);

            // 2. Upload to Lark Media
            const uploadRes = await client.drive.media.uploadAll({
                data: {
                    file_name: art.title.substring(0, 20).replace(/[^a-z0-9]/gi, '_') + '.jpg',
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
            process.stdout.write('Uploaded (Token: ' + fileToken + ')... ');

            // 3. Create Record
            const res = await client.bitable.appTableRecord.create({
                path: { app_token: appToken, table_id: tableId },
                data: {
                    fields: {
                        "news_title": art.title,
                        "news_content": art.content,
                        "generation_method": "Manual",
                        "release_time": Date.now(),
                        "release_status": "Published",
                        "site_id": [art.siteId],
                        "featured_image": [{ file_token: fileToken }],
                        "author_email": "editorial@laser-news.com"
                    }
                }
            });

            if (res.code === 0) {
                console.log('Created Record (ID: ' + res.data.record.record_id + ')');
            } else {
                console.log('Record Creation Error: ' + res.code + ' - ' + res.msg);
            }
        } catch (e) {
            console.log('Exception: ' + e.message);
        }
    }
}

seedArticles();
