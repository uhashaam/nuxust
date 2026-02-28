const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content

const articles = [
    {
        title: "[2026 Guide] Deep Dive: The Evolution of Handheld Laser Welding in Industrial Fabrication",
        content: `
            <h2>The Paradigm Shift in Welding Technology</h2>
            <p>For decades, manual metal joining remained largely unchanged, relying on the skilled hands of TIG and MIG welders. However, 2026 marks the definitive tipping point where handheld laser welding has transitioned from an expensive novelty to an indispensable shop floor tool. Manufacturers are no longer asking *if* they should switch, but *how fast* they can integrate this technology.</p>
            
            <h3>Breaking Down the Performance Barriers</h3>
            <p>Traditional welding methods are notoriously slow and heat-intensive. In contrast, a 1500W to 3000W fiber laser source provides a highly concentrated energy beam that melts the metal instantaneously with minimal thermal spread. This results in several key transformations for the fabrication workflow:</p>
            <ul>
                <li><strong>Unprecedented Speed:</strong> Operators report completion times up to 8 times faster than TIG welding on 3mm stainless steel.</li>
                <li><strong>Aesthetically Superior Joints:</strong> The "fish-scale" pattern sought by TIG welders is achieved automatically by the laser's oscillation (wobble) settings, requiring zero post-weld grinding.</li>
                <li><strong>Simplified Labor Requirements:</strong> While TIG requires years of muscle memory, a laser welder can be mastered by a diligent apprentice in just a few days of training.</li>
            </ul>

            <h3>Safety and Infrastructure Requirements</h3>
            <p>As power levels increase, so does the need for rigorous safety protocols. Modern "Class 4" laser environments require dedicated welding cells with laser-opaque curtains and interlocked doors. Furthermore, the 2026 generation of welders features "triple-safety" contact sensors, ensuring the beam only activates when the nozzle is in direct contact with the workpiece.</p>
            
            <p>The investment in a laser welding system is not just an equipment upgrade; it is a fundamental restructuring of throughput and quality control for the modern metalworking enterprise.</p>
        `,
        siteId: 'recaYAqN0I', // laserwelder
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200'
    },
    {
        title: "The Industrial Clean-Tech Revolution: Why Laser Ablation is the Future of Surface Prep",
        content: `
            <h2>Beyond Sand and Chemicals</h2>
            <p>The environmental footprint of industrial maintenance has historically been massive. From the staggering amount of sand used in blasting to the toxic runoff from chemical pickling, surface preparation has always been the "dirty" part of manufacturing. Enter High-Power Laser Ablation: a process that cleans surfaces using nothing but light.</p>

            <h3>How Laser Cleaning Works (A Physics Perspective)</h3>
            <p>Laser cleaning utilizes short pulses of high-intensity laser light. When these pulses hit a surface contaminant—be it rust, grease, or an old epoxy coating—the material absorbs the energy so rapidly that it undergoes sublimation (turning from solid to gas) or mechanical vibration that ejects the particles from the substrate. Because the underlying metal reflects the laser wavelength, the cleaning stops exactly where it should.</p>

            <h3>The Total Cost of Ownership (TCO) Advantage</h3>
            <p>While the initial capital expenditure for a 2000W continuous wave or 500W pulsed laser cleaner is higher than a sandblasting rig, the long-term TCO is significantly lower:</p>
            <ol>
                <li><strong>Zero Media Costs:</strong> No more buying tons of glass beads or garnet.</li>
                <li><strong>Reduced Labor for Cleanup:</strong> Since there is no secondary waste, there is no need to spend hours sweeping up blasting media.</li>
                <li><strong>Energy Efficiency:</strong> Modern fiber laser sources are highly efficient, converting over 30% of wall power into actual laser light.</li>
            </ol>

            <p>As ESG (Environmental, Social, and Governance) targets become mandatory for global manufacturers, laser cleaning stands out as a clear win for both the planet and the bottom line.</p>
        `,
        siteId: 'recWExnALZ', // lasercleaner
        image: 'https://images.unsplash.com/photo-1565151443315-7a0e3f0f7f3a?auto=format&fit=crop&w=1200'
    },
    {
        title: "Power and Precision: Navigating the Shift to 30kW+ Fiber Laser Cutting",
        content: `
            <h2>The Race for Higher Wattage</h2>
            <p>Just five years ago, a 6kW fiber laser was considered high-power. Today, the industry standard for heavy fabrication has surged to 30kW and even 40kW. This exponential growth in power is not just about cutting thicker plates; it is about redefining the boundaries of "high-speed" production on medium-thickness materials.</p>

            <h3>Unbeatable Productivity on the Factory Floor</h3>
            <p>At 30kW, a fiber laser can cut 20mm carbon steel with nitrogen at speeds that were previously only possible with oxygen. The benefit? A bright, oxide-free edge that is ready for immediate welding. This eliminates a secondary processing step that has plagued heavy industry for decades.</p>

            <h3>Intelligent Cutting Heads and Real-Time Analytics</h3>
            <p>With great power comes the need for great control. Modern cutting heads are now equipped with internal cameras and sensors that monitor the "pierce" and "cut" stability in real-time. If the machine detects a potential "slag" buildup or a lost cut, it automatically adjusts parameters or pauses to prevent material damage. This level of autonomy allows for "lights-out" manufacturing, where machines run unattended through the night.</p>

            <p>For job shops looking to remain competitive in mid-2026, the transition to ultra-high-power fiber systems is no longer optional—it is a prerequisite for survival in a high-volume market.</p>
        `,
        siteId: 'recC9f5sG6', // lasercutter
        image: 'https://images.unsplash.com/photo-1565349978634-c9e57b5a8a68?auto=format&fit=crop&w=1200'
    },
    {
        title: "Bulletproof Traceability: How Laser Marking is Transforming Global Supply Chains",
        content: `
            <h2>The Permanent Digital Link</h2>
            <p>In a globalized economy, the "Digital Twin" of a product starts with its physical mark. Laser marking provides the permanent, high-resolution link between a physical part and its digital history. From aerospace turbines to pharmaceutical blister packs, the demand for high-speed, non-destructive marking is at an all-time high.</p>

            <h3>Black Marking and Annealing of Medical Stainless Steel</h3>
            <p>In the medical device industry, surface integrity is non-negotiable. Traditional engraving can create crevices where bacteria might grow. Fiber laser "annealing" solves this by heating the surface just enough to create an oxide layer (a permanent black mark) without actually compromising the smooth surface finish of the stainless steel. This ensures the device remains autoclavable and corrosion-resistant.</p>

            <h3>Integration with Vision Systems</h3>
            <p>The modern marking cell is rarely a standalone unit. Most are now integrated with high-speed CMOS cameras that verify the 2D DataMatrix code immediately after it is marked. If the scan grade falls below a "Grade A" (ISO/IEC 15415), the system can alert the operator or automatically adjust the laser focal position. This "Closed-Loop" marking is essential for achieving Zero-Defect manufacturing in the automotive sector.</p>
        `,
        siteId: 'recbWwQfQp', // lasermarking
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200'
    }
];

async function seedArticles() {
    const client = new lark.Client({ appId, appSecret });

    for (const art of articles) {
        process.stdout.write('Creating: ' + art.title + '... ');
        try {
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
                        "featured_image": [{ url: art.image }],
                        "author_email": "editorial@laser-news.com"
                    }
                }
            });
            if (res.code === 0) {
                console.log('OK (ID: ' + res.data.record.record_id + ')');
            } else {
                console.log('Error: ' + res.code + ' - ' + res.msg);
            }
        } catch (e) {
            console.log('Exception: ' + e.message);
        }
    }
}

seedArticles();
