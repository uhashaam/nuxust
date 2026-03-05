const fetch = require('node-fetch');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const tableId = 'tblnA57O1m70HSY7'; // News Content table

const SITES = {
    laserwelder: 'recaYAqN0I',
    lasercleaner: 'ecWExnALZ',
    lasercutter: 'recC9f5sG6',
    lasermarking: 'recbWwQfQp'
};

const products = [
    {
        name: 'Industrial Fiber Laser Welder - Pro Series',
        description: 'Advanced fiber laser welding system for high-precision industrial applications. Supports multiple metal types including stainless steel, aluminum, and titanium.',
        category: 'Laser Welder',
        siteKey: 'laserwelder',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
        shortDescription: 'High-speed precision welding for industrial metal fabrication.'
    },
    {
        name: 'Portable Laser Cleaning System - EcoLine',
        description: 'Non-destructive laser cleaning for rust removal, oil cleaning, and surface preparation. Environmentally friendly and highly efficient.',
        category: 'Laser Cleaner',
        siteKey: 'lasercleaner',
        image: 'https://images.unsplash.com/photo-1565151443315-7a0e3f0f7f3a?w=800&q=80',
        shortDescription: 'Eco-friendly rust and paint removal solution.'
    },
    {
        name: 'High-Power CNC Fiber Laser Cutter',
        description: 'Large-format CNC laser cutting machine with high power source. Designed for continuous heavy-duty metal plate cutting.',
        category: 'Laser Cutter',
        siteKey: 'lasercutter',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
        shortDescription: 'Precision CNC cutting for various sheet metal thicknesses.'
    },
    {
        name: 'UV Laser Marking Station',
        description: 'Ultraviolet laser marking system for ultra-fine marking on sensitive materials like plastic, glass, and electronic components.',
        category: 'Laser Marking',
        siteKey: 'lasermarking',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        shortDescription: 'Ultra-fine marking solution for electronics and medical devices.'
    }
];

async function seedProducts() {
    try {
        const tokenRes = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ app_id: appId, app_secret: appSecret })
        });
        const tokenData = await tokenRes.json();
        const token = tokenData.tenant_access_token;

        for (const p of products) {
            console.log(`Creating product: ${p.name}`);
            const fields = {
                news_title: p.name,
                news_content: p.description,
                generation_method: 'Product',
                release_time: Date.now(),
                release_status: 'Published',
                site_id: [SITES[p.siteKey]],
                // Store metadata in author_email since we don't have a dedicated product table
                author_email: JSON.stringify({
                    category: p.category,
                    price: 5000 + Math.floor(Math.random() * 10000),
                    shortDescription: p.shortDescription,
                    slug: p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                })
            };

            const url = `https://open.larksuite.com/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fields })
            });
            const data = await res.json();
            if (data.code === 0) {
                console.log(`Success: ${p.name}`);
            } else {
                console.error(`Failed: ${p.name}`, data.msg);
            }
        }

    } catch (e) {
        console.error('Error:', e.message);
    }
}

seedProducts();
