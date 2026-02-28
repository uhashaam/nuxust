const lark = require('@larksuiteoapi/node-sdk');
const axios = require('axios');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content

const expandedContent = {
    "[2026 Guide] Deep Dive: The Evolution of Handheld Laser Welding in Industrial Fabrication": `
        <h2>The Paradigm Shift in Welding Technology</h2>
        <p>For decades, manual metal joining remained largely unchanged, relying on the skilled hands of TIG and MIG welders. The traditional methods required extensive training, suffered from heat-induced distortion, and were often bottlenecks in the production timeline. However, 2026 marks the definitive tipping point where handheld laser welding has transitioned from an expensive novelty to an indispensable shop floor tool. The evolution of fiber laser sources, shrinking from massive cabinets to portable, suitcase-sized units, has democratized a technology once reserved for aerospace and automotive giants.</p>
        
        <h3>Breaking Down the Performance Barriers</h3>
        <p>The core advantage of handheld laser welding lies in its extraordinary energy density. By focusing a collimated beam into a microscopic spot, the laser achieves deep penetration with minimal heat input into the surrounding material.</p>
        <ul>
            <li><strong>Unprecedented Speed:</strong> Operators report completion times up to 8 times faster than TIG welding on 3mm stainless steel. This raw speed translates directly into increased throughput facility-wide.</li>
            <li><strong>Aesthetically Superior Joints:</strong> The "fish-scale" pattern sought by TIG welders is achieved automatically by the laser's oscillation (wobble) settings. Post-weld grinding and polishing are virtually eliminated.</li>
            <li><strong>Reduced Heat Affected Zone (HAZ):</strong> The focused energy means less warpage, allowing for the welding of extremely thin materials (down to 0.5mm) without burn-through.</li>
            <li><strong>Simplified Labor Requirements:</strong> While a master TIG welder requires years of practice, a laser welder can be mastered by a diligent apprentice in just a few days of training, alleviating critical labor shortages.</li>
        </ul>

        <h3>Integration with Automation</h3>
        <p>While handheld systems are rapidly capturing market share, the underlying technology is entirely compatible with collaborative robots (cobots). Shops are now deploying "hybrid" cells where an operator manages the complex setups, while the cobot holds the laser torch for long, repetitive linear seams. The wobble parameters can be adjusted on the fly, seamlessly adapting to varying gap widths.</p>

        <h3>Safety Considerations in the Modern Fab Shop</h3>
        <p>The shift to Class 4 lasers in open shop environments has necessitated a parallel evolution in safety protocols. Laser-safe enclosures, interlocked doors, and specialized safety eyewear with specific optical density (OD) ratings are now standard. Active sensor technology within the welding gun ensures the laser only fires when in direct contact with the grounded workpiece.</p>

        <h3>Conclusion</h3>
        <p>The investment in a laser welding system is not just an equipment upgrade; it is a fundamental restructuring of throughput, quality control, and labor utilization. As we move deeper into 2026, the technology is no longer a luxury—it is the baseline for competitive metal fabrication.</p>
    `,
    "The Industrial Clean-Tech Revolution: Why Laser Ablation is the Future of Surface Prep": `
        <h2>Beyond Sand and Chemicals</h2>
        <p>The environmental footprint of industrial maintenance has historically been massive. Traditional surface preparation relies on abrasive blasting (sand, garnet, dry ice) or aggressive chemical stripping. These methods generate immense secondary waste streams, exposing workers to hazardous particulates and volatile organic compounds (VOCs). Enter High-Power Laser Ablation: a process that cleans surfaces using nothing but concentrated light.</p>

        <h3>The Physics of Laser Cleaning</h3>
        <p>Laser cleaning utilizes short (nanosecond) pulses of high-intensity fiber laser light. When these pulses hit surface contaminants—rust, grease, paint, or oxides—the dark material absorbs the energy. The rapid absorption causes the contaminant to heat up instantaneously, transforming into a plasma and sublimating directly into a gas. This is known as photo-thermal ablation. Because the underlying metal substrate is highly reflective at the laser's specific 1064nm wavelength, it bounces the remaining energy away, remaining completely undamaged. The cleaning stops exactly where it should.</p>

        <h3>Economic and Environmental Advantages</h3>
        <p>The transition to laser ablation offers a compelling return on investment driven by operational efficiencies:</p>
        <ul>
            <li><strong>Zero Consumable / Media Costs:</strong> No more buying tons of blasting media. The only inputs are electricity and the initial capital expenditure of the machine.</li>
            <li><strong>Zero Secondary Waste:</strong> Traditional blasting mixes the contaminant with the blasting media, creating tons of hazardous waste. Laser cleaning only produces a tiny volume of vaporized contaminant, which is easily captured by an integrated HEPA fume extractor.</li>
            <li><strong>Non-Destructive and Precise:</strong> Unlike sandblasting which physically alters the metallic crystalline structure, laser cleaning preserves geometric tolerances. It is highly favored in aerospace for cleaning composite molds without wearing down the expensive tooling.</li>
            <li><strong>High Reliability:</strong> Solid-state fiber laser sources contain no moving parts and are rated for up to 100,000 hours of maintenance-free operation.</li>
        </ul>

        <h3>Applications Scaling Upward</h3>
        <p>What began as a niche tool for historical restoration and semiconductor cleaning has now scaled to heavy industry. Systems have grown from multi-watt to multi-kilowatt power levels. Today, 3000W continuous wave (CW) lasers and 1000W pulsed lasers are being deployed to strip entire ship hulls in drydocks, prep massive pipeline weld seams, and de-coat bridges without erecting massive containment tents.</p>
        
        <h3>The Future Outlook</h3>
        <p>As regulatory bodies tighten restrictions on chemical VOCs and silica dust exposure, laser ablation stands out as the ultimate clean-tech alternative. By combining profound environmental benefits with undeniable cost reductions, light-based cleaning is poised to dominate surface engineering in the coming decade.</p>
    `,
    "Power and Precision: Navigating the Shift to 30kW+ Fiber Laser Cutting": `
        <h2>The Race for Higher Wattage</h2>
        <p>The sheet metal fabrication industry is experiencing an unprecedented horsepower war. Just a decade ago, a 4kW CO2 laser was considered a high-production powerhouse. Today, the industry standard for new installations in heavy fabrication has surged past 20kW, with 30kW, 40kW, and even 50kW fiber laser systems dominating trade show floors. This massive growth in power is not just about bringing thicker steel plates into the laser's domain; it is about fundamentally redefining the boundaries of "high-speed" production.</p>

        <h3>Thickness and Speed Correlation</h3>
        <p>The primary driver for ultra-high wattage is the ability to cut thick mild steel, stainless steel, and aluminum with nitrogen or a mixed-gas assist, completely eliminating the slow, oxidation-dependent oxygen cutting process. A 30kW laser can cut 20mm (3/4-inch) stainless steel faster than a 10kW laser can cut 10mm steel. Furthermore, it produces a clean, dross-free edge that requires zero secondary processing before welding or painting.</p>

        <h3>Intelligent Cutting Heads and Automation</h3>
        <p>Managing 30,000 watts of concentrated light requires incredible precision. Modern cutting heads are marvels of mechatronics. They are equipped with internal cameras, Bluetooth sensors, and temperature monitors that analyze the "pierce" and "cut" stability in real-time. If the machine detects a potential collision or a loss of cut, it automatically adjusting focus, gas pressure, and speed.</p>
        <p>This level of autonomy allows for true "lights-out" manufacturing. Material handling towers feed raw sheets into the machine, the laser cuts the nest iteratively, and automated sorting robotic arms pull out the finished parts—all while running unattended through the night.</p>

        <h3>The Challenges of Extreme Power</h3>
        <p>Adopting a 30kW+ system is not as simple as plugging it in. The surrounding infrastructure must evolve. The laser requires massive electrical service panels, industrial-grade water chillers capable of dissipating immense heat, and specialized slat tables that won't melt instantly under the beam. Additionally, the sheer speed of these machines (accelerating at 3G to 4G) requires linear drive motors and extremely rigid machine frames made of cast iron or mineral composite.</p>

        <h3>Conclusion</h3>
        <p>For job shops looking to remain competitive on bidding platforms, the transition to ultra-high-power fiber systems is no longer optional—it is a prerequisite for survival. The ability to quote faster delivery times, eliminate secondary grinding, and process a wider variety of materials guarantees that the high-wattage revolution is here to stay.</p>
    `,
    "Bulletproof Traceability: How Laser Marking is Transforming Global Supply Chains": `
        <h2>The Permanent Digital Link</h2>
        <p>In a hyper-connected, globalized economy, the "Digital Twin" of a product starts with its physical mark. From aerospace turbines to automotive chassis components, and from medical implants to consumer electronics, end-to-end traceability is no longer a luxury; it is a strict regulatory requirement. Laser marking has emerged as the definitive technology for this, providing the permanent, indelible link between a physical part and its digital history in a database.</p>

        <h3>Eclipsing Traditional Marking Methods</h3>
        <p>For years, manufacturers relied on dot-peen stamping, inkjet printing, and chemical etching. These methods all possessed fatal flaws: dot-peening causes micro-fractures and stress focal points; inkjet ink fades, smudges, and fails in harsh environments; and chemical etching is slow and highly toxic. Laser marking operates fundamentally differently. By utilizing targeted photons, lasers can engrave, etch, anneal, or color materials with microscopic precision and absolute permanence, at speeds measured in meters per second.</p>

        <h3>Precision and Purity: The Medical Grade Standard</h3>
        <p>In the medical device industry—where tools must survive hundreds of harsh autoclave sterilization cycles—surface integrity is non-negotiable. Any crevice or physical engraving can harbor bacteria. Fiber laser "annealing" solves this elegantly. The laser heats the surface of titanium or stainless steel just enough to pull carbon to the surface, creating a permanent, high-contrast dark mark (usually an oxidation layer) without actually breaching the metal's surface geometry. The piece remains perfectly smooth to the touch, fully compliant with FDA regulations.</p>

        <h3>Machine Vision and the Closed-Loop System</h3>
        <p>Modern laser marking stations are rarely standalone. They are deeply integrated with Machine Vision (smart cameras) and the factory's ERP/MES systems. The workflow typically looks like this:</p>
        <ol>
            <li>The system queries the database for the next sequential serial number or dynamic QR/Data Matrix code.</li>
            <li>The laser burns the 2D matrix code into the part in under 200 milliseconds.</li>
            <li>Before the part even moves, an integrated coaxial camera reads the code to ensure it meets ISO grading standards for contrast and readability.</li>
            <li>The successful read is logged back into the database, completing the "Closed-Loop" process.</li>
        </ol>

        <h3>Combating Counterfeits</h3>
        <p>Beyond internal tracking, laser marking is a critical weapon against counterfeiting. Advanced systems can engrave micro-text invisible to the naked eye, or utilize specific pulse frequencies to create holographic or iridescent marks that are impossible to replicate without the exact proprietary laser configuration. This ensures brand protection in vulnerable markets.</p>

        <h3>Conclusion</h3>
        <p>As supply chains become more sophisticated and regulations more stringent, laser marking provides the bulletproof traceability required for Zero-Defect manufacturing. It is a fundamental enabler of Industry 4.0 data continuity.</p>
    `
};

const newArticles = [
    {
        title: "Automated Laser Welding Cells: Integrating Robotics for High-Volume Production",
        content: `
            <h2>The Next Step Beyond Handheld Systems</h2>
            <p>While handheld laser welding has revolutionized the manual fab shop, high-volume production requires a different approach. Enter the automated laser welding cell—a seamless integration of fiber laser technology with 6-axis industrial robots or collaborative robots (cobots). These systems represent the pinnacle of manufacturing consistency, designed perfectly for automotive, battery pack, and consumer appliance assembly.</p>

            <h3>The Mechanics of Robotic Laser Welding</h3>
            <p>In a robotic cell, the laser welding head is mounted to the robot's end-effector. The true magic lies in the software coordination between the robot's path planning and the laser's firing parameters. As the robot arm sweeps along a complex 3D contour, the laser power, pulse frequency, and wobble width can dynamically adjust in real-time based on the joint geometry. Advanced seam-tracking sensors scan the gap millimeters ahead of the beam, ensuring the robot adjusts its trajectory if the physical part deviates slightly from the CAD model.</p>

            <h3>Crucial Advantages in Manufacturing</h3>
            <ul>
                <li><strong>Absolute Consistency:</strong> A robot does not fatigue. The first weld of the shift is identical to the thousandth weld. This drastically reduces scrap rates and necessary QA inspections.</li>
                <li><strong>Remote Welding (Scanner Welding):</strong> Advanced setups utilize galvo-scanner heads mounted on the robot. The robot holds the head stationary over a zone while internal mirrors rapidly direct the laser beam to make hundreds of spot welds in seconds—a critical technique in EV battery manufacturing.</li>
                <li><strong>Multi-process Capabilities:</strong> With auto-tool changers, a single robot can switch from a cutting head to a welding head, to a cleaning head, all utilizing the same fiber laser source.</li>
            </ul>

            <p>As AI-driven path planning becomes more accessible, the deployment time for robotic laser cells is shrinking from weeks down to hours, making automation viable even for medium-volume job shops.</p>
        `,
        siteId: 'recaYAqN0I', // laserwelder
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' // modern robotic arm
    },
    {
        title: "Restoring History: How Non-Destructive Laser Cleaning is Saving Artifacts",
        content: `
            <h2>A Delicate Touch Through Photons</h2>
            <p>Industrial applications of laser cleaning often focus on aggressive rust and thick paint removal. However, a rapidly growing sector utilizes the exact same physics on a micro-scale: historical restoration. Conservators worldwide are adopting low-power, highly controlled pulsed lasers to clean priceless sculptures, architectural stonework, and ancient artifacts without risking the underlying material.</p>

            <h3>The Science of Selective Sublimation</h3>
            <p>The core principle is ablation threshold. The soot, pollution crusts, and biological growth on a marble statue have a completely different absorption rate and ablation threshold than the marble itself. By tuning the laser's pulse duration and energy density, conservators can vaporize a 50-micron layer of black sulfur-based crust. Once the laser reaches the white marble underneath, the light is simply scattered and reflected. The cleaning process stops automatically at the atomic level.</p>

            <h3>Saving Monuments and Frescoes</h3>
            <p>Traditional restoration relied on micro-sandblasting or chemical poultices, both of which carry immense risks of eroding the delicate patina or leaching salts into porous stone. Lasers have been successfully deployed globally to restore marvels such as the Acropolis in Athens, vast cathedrals in Europe, and fragile frescoes. The laser can even distinguish between different pigments, allowing a conservator to remove a 19th-century overpaint while leaving a 15th-century original masterpiece untouched underneath.</p>
            
            <p>This intersection of cutting-edge photonics and ancient history represents one of the most elegant applications of laser technology today.</p>
        `,
        siteId: 'recWExnALZ', // lasercleaner
        imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80' // ancient architecture / restoration vibe
    },
    {
        title: "Bevel Cutting Innovations: Preparing Perfect Weld Seams with 5-Axis Laser Systems",
        content: `
            <h2>Eliminating the Secondary Bottleneck</h2>
            <p>In heavy fabrication, cutting the part is only half the battle. If a steel plate is destined to be welded into a structural frame, a ship hull, or a pressure vessel, it almost always requires edge preparation. Traditionally, after a 2D laser cut the flat profile, the plate had to be moved to a separate milling machine or manually ground to create V, Y, or K-shaped bevels for the weld seam. 5-axis bevel laser cutting eliminates this entire secondary step.</p>

            <h3>How 5-Axis Laser Beveling Works</h3>
            <p>Standard flatbed lasers utilize three axes (X, Y, Z). A bevel cutting head introduces two additional massive rotary axes (A and B), allowing the cutting nozzle to tilt up to 45 or even 50 degrees continuously while moving. As the laser traverses the perimeter of the part, it tilts dynamically to carve the precise angles specified by the CAD software directly into the thick steel plate during the primary cutting process.</p>

            <h3>The Engineering Challenges</h3>
            <p>Tilting a laser head while cutting 20mm steel requires astonishing computational power. The focal point of the beam must remain locked exactly at the material surface, even as the nozzle changes angle. Furthermore, the assist gas flow dynamics change fundamentally when cutting at a 45-degree tilt. To combat this, modern machine controllers use advanced kinetic algorithms to compensate for the shifting mass of the heavy rotary head, maintaining micro-meter accuracy.</p>

            <p>By producing weld-ready parts straight off the machine bed, 5-axis bevel laser cutters are redefining workflow efficiency in the heavy machinery and shipbuilding sectors.</p>
        `,
        siteId: 'recC9f5sG6', // lasercutter
        imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80' // heavy industrial steel fabrication
    },
    {
        title: "Color Laser Marking on Titanium and Stainless Steel: Aesthetics Meets Durability",
        content: `
            <h2>Painting with Photons</h2>
            <p>When we think of laser marking, we typically visualize stark black text on a silver background, or white text etched into black anodized aluminum. However, advanced MOPA (Master Oscillator Power Amplifier) fiber lasers have unlocked an incredible capability: the ability to generate a broad spectrum of vivid colors directly onto stainless steel and titanium surfaces, without using a single drop of ink or dye.</p>

            <h3>The Physics of Optical Interference</h3>
            <p>Unlike traditional marking that removes material or burns it black, color laser marking is practically an optical illusion. The laser carefully heats the microscopic surface of the metal, stimulating the growth of a transparent oxide layer. By precisely controlling the pulse frequency, pulse duration (often down to 2 nanoseconds), and power, the MOPA laser dictates exactly how thick this oxide layer grows.</p>

            <p>When ambient light hits this oxide layer, some light reflects off the top, while some travels through and reflects off the base metal beneath. These slightly out-of-phase light waves interfere with each other, creating vibrant structural colors—the exact same physical phenomenon that gives a soap bubble or an oil slick its rainbow hue.</p>

            <h3>Applications in Consumer Goods and Medical Devices</h3>
            <p>This technology is highly prized in high-end consumer electronics (like customized smartphones and luxury watches) where vibrant logos are required but traditional paints would easily scratch off. In the medical sector, color marking is used to color-code surgical instruments or orthopedic bone screws according to size, aiding surgeons in fast-paced environments. Because it is an oxide layer formed from the base metal itself, the color is completely biocompatible, fade-resistant, and chemically inert.</p>
            
            <p>Color laser marking stands as a testament to the immense microscopic control these powerful light engines provide.</p>
        `,
        siteId: 'recbWwQfQp', // lasermarking
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' // colorful spectrum / laser light vibe
    }
];

async function updateAndSeed() {
    const client = new lark.Client({ appId, appSecret });
    try {
        // 1. Fetch current items to find the IDs of the 4 existing ones
        let allItems = [];
        let hasMore = true;
        let pageToken = undefined;

        while (hasMore) {
            const res = await client.bitable.appTableRecord.list({
                path: { app_token: appToken, table_id: tableId },
                params: { page_size: 100, page_token: pageToken }
            });
            if (res.code !== 0) throw new Error(`Retrieve Error: ${res.msg}`);
            if (res.data.items) allItems = allItems.concat(res.data.items);
            hasMore = res.data.has_more;
            pageToken = res.data.page_token;
        }

        console.log(`Found ${allItems.length} existing articles in database.`);

        // 2. Expand existing articles
        for (const item of allItems) {
            const title = item.fields.news_title;
            const recordId = item.record_id;
            if (expandedContent[title]) {
                console.log(`Expading existing article: ${title}`);
                const updateRes = await client.bitable.appTableRecord.update({
                    path: { app_token: appToken, table_id: tableId, record_id: recordId },
                    data: {
                        fields: {
                            news_content: expandedContent[title]
                        }
                    }
                });
                if (updateRes.code === 0) {
                    console.log(' -> Successfully updated with long-form content.');
                } else {
                    console.error(' -> Update failed:', updateRes.msg);
                }
            }
        }

        console.log('\n--- Creating 4 New Articles ---\n');

        // 3. Create newly generated articles
        for (const art of newArticles) {
            console.log(`Processing new article: ${art.title}`);

            // Download image
            const response = await axios.get(art.imageUrl, {
                responseType: 'arraybuffer',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
                }
            });
            const buffer = Buffer.from(response.data);

            // Upload image
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
                console.error(' -> Image Upload failed: ' + JSON.stringify(uploadRes));
                continue;
            }

            const fileToken = uploadRes.file_token;
            console.log(` -> Image Uploaded (Token: ${fileToken})`);

            // Create Record
            const res = await client.bitable.appTableRecord.create({
                path: { app_token: appToken, table_id: tableId },
                data: {
                    fields: {
                        "news_title": art.title,
                        "news_content": art.content,
                        "generation_method": "Auto-AI Extended",
                        "release_time": Date.now(),
                        "release_status": "Published",
                        "site_id": [art.siteId],
                        "featured_image": [{ file_token: fileToken }],
                        "author_email": "expert@laser-news.com"
                    }
                }
            });

            if (res.code === 0) {
                console.log(` -> Created New Record (ID: ${res.data.record.record_id})`);
            } else {
                console.error(' -> Record Creation Error: ' + res.code + ' - ' + res.msg);
            }
        }

        console.log('\nAll done!');

    } catch (e) {
        console.error(e);
    }
}

updateAndSeed();
