const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content

const articles = [
    {
        title: "The Future of Precision: Handheld Laser Welding in Modern Manufacturing",
        content: `
            <h2>Revolutionizing the Shop Floor</h2>
            <p>In recent years, handheld laser welding technology has moved from a niche industrial application to a mainstream solution for workshops and large-scale manufacturing plants alike. Traditional TIG and MIG welding, while effective, require years of training to master. Handheld laser welders, however, offer a significantly steeper learning curve, allowing even novice operators to produce professional-grade welds in a fraction of the time.</p>
            
            <h3>Key Advantages of Laser Welding</h3>
            <ul>
                <li><strong>Speed:</strong> Laser welding is up to 4-10 times faster than traditional methods, drastically reducing production lead times.</li>
                <li><strong>Quality:</strong> The concentrated heat source results in a very narrow heat-affected zone (HAZ), reducing material deformation and providing a cleaner finish.</li>
                <li><strong>Versatility:</strong> Effectively joins a wide variety of metals including stainless steel, carbon steel, aluminum, and galvanized sheets.</li>
            </ul>

            <p>As industry 4.0 continues to evolve, the integration of smart sensors and real-time monitoring in laser welding units is becoming standard. This ensures not only speed and aesthetics but also the structural integrity required for critical engineering components.</p>
        `,
        siteId: 'recaYAqN0I', // laserwelder
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: "Sustainable Solutions: Why Industrial Laser Cleaning is Replacing Chemical Stripping",
        content: `
            <h2>A Greener Industrial Future</h2>
            <p>Industrial cleaning has long relied on abrasive sandblasting or hazardous chemical solvents. However, environmental regulations and a focus on operator safety are driving a global shift toward laser cleaning technology. By using high-frequency laser pulses to remove rust, paint, and oil, manufacturers can achieve a pristine surface without generating secondary waste.</p>

            <h3>The Mechanics of Ablation</h3>
            <p>Laser cleaning works on the principle of selective ablation. The laser beam is calibrated to be absorbed by the contaminant while being reflected by the substrate. This ensures that the metal surface remains undamaged even after multiple cleaning cycles.</p>

            <h3>Why Make the Switch?</h3>
            <ol>
                <li><strong>No Consumables:</strong> Unlike traditional methods, laser cleaning requires only electricity, eliminating the cost and logistics of chemicals and media.</li>
                <li><strong>Low Maintenance:</strong> Fiber laser sources are rated for 100,000 hours of operation, making them a highly reliable long-term investment.</li>
                <li><strong>Safe and Precise:</strong> Non-contact cleaning prevents mechanical wear on sensitive parts.</li>
            </ol>
        `,
        siteId: 'recWExnALZ', // lasercleaner
        image: 'https://images.unsplash.com/photo-1565151443315-7a0e3f0f7f3a?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: "Maximizing ROI with High-Power Fiber Laser Cutting Systems",
        content: `
            <h2>The Economic Impact of Fiber Technology</h2>
            <p>Fiber laser cutting has fundamentally changed the economics of sheet metal fabrication. With power levels now reaching 20kW and beyond, fiber lasers are outperforming CO2 lasers in both speed and thickness capacity. For any business involved in structural steel or precision flat-pattern work, the ROI on a fiber system is often realized within the first 18 months of operation.</p>

            <h3>Efficiency Through High Power</h3>
            <p>High-power fiber lasers allow for "nitrogen cutting" on thicker materials, which eliminates the oxidation layer associated with oxygen cutting. This means parts can go straight from the cutting bed to the welding or painting booth without needing edge cleanup.</p>

            <p>Furthermore, modern nesting software integrated with these machines ensures minimal scrap material, further bolstering the bottom line. As laser technology becomes more accessible, the competitive advantage lies in maximizing the "beam-on" time through automated loading and unloading systems.</p>
        `,
        siteId: 'recC9f5sG6', // lasercutter
        image: 'https://images.unsplash.com/photo-1565349978634-c9e57b5a8a68?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: "Traceability Compliance: The Role of Fiber Laser Marking in Automotive Engineering",
        content: `
            <h2>Ensuring Quality Throughout the Lifecycle</h2>
            <p>In the automotive and aerospace industries, every single component must be traceable. From the smallest engine bolt to critical brake components, permanent marking is a regulatory requirement. Fiber laser marking has emerged as the gold standard for creating high-contrast, permanent DataMatrix codes and VIN numbers that withstand extreme temperatures and corrosive environments.</p>

            <h3>Precision and Purity</h3>
            <p>Unlike inkjet or dot peening, laser marking is non-contact and does not introduce stress into the material. It creates a chemical change in the surface of the metal, resulting in a mark that is practically impossible to remove without destroying the part itself.</p>

            <p>With integration into existing production lines, laser markers can operate at extreme speeds, keeping pace with contemporary moving-assembly environments. As data integration becomes more complex, these marking units are now being linked directly to ERP systems to ensure error-free data synchronization.</p>
        `,
        siteId: 'recbWwQfQp', // lasermarking
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80'
    }
];

async function seedArticles() {
    const client = new lark.Client({ appId, appSecret });

    for (const art of articles) {
        console.log(`Creating article: \${art.title}`);
        try {
            await client.bitable.appTableRecord.create({
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
                        "author_email": "editor@industrial-laser.com"
                    }
                }
            });
            console.log("...Success!");
        } catch (e) {
            console.error(`...Failed: \${e.message}`);
        }
    }
}

seedArticles();
