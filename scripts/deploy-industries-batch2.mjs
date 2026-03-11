import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
const envConfig = dotenv.parse(fs.readFileSync('.env'));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const LARK_APP_ID = process.env.NUXT_LARK_APP_ID;
const LARK_APP_SECRET = process.env.NUXT_LARK_APP_SECRET;
const LARK_BASE_APP_TOKEN = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const LARK_TABLE_INDUSTRY_SITES = 'tbllBt3KASVevh0m';

/**
 * Mapping Table based on User Guidelines:
 * Category -> H (Header), F (Footer), B (Banner), NL (News List), ND (News Detail)
 * 
 * Industrial/Mechanical: H2, F9, B2, NL4, ND3
 * Electronics/Gen Tech: H1, F5, B1, NL5, ND2
 * Optical/LED: H7, F4, B4, NL1, ND1
 * Security/Safety: H6, F5, B4, NL1, ND4
 * Accessory/Instrument: H5, F2, B4, NL1, ND1
 */

const BATCH_2_INDUSTRIES = [
    { name: 'Valves', subdomain: 'valves', h: 2, f: 9, b: 2, nl: 4, nd: 3 },
    { name: 'Fittings', subdomain: 'fittings', h: 2, f: 9, b: 2, nl: 4, nd: 3 },
    { name: 'Fasteners', subdomain: 'fasteners', h: 2, f: 9, b: 2, nl: 4, nd: 3 },
    { name: 'Molds', subdomain: 'molds', h: 2, f: 9, b: 2, nl: 4, nd: 3 },
    { name: 'Castings', subdomain: 'castings', h: 2, f: 9, b: 2, nl: 4, nd: 3 },
    { name: 'Pumps', subdomain: 'pumps', h: 2, f: 9, b: 2, nl: 4, nd: 3 },
    { name: 'Gears', subdomain: 'gears', h: 5, f: 9, b: 2, nl: 4, nd: 3 },
    { name: 'Compressors', subdomain: 'compressors', h: 2, f: 9, b: 2, nl: 4, nd: 3 },
    { name: 'Filters', subdomain: 'filters', h: 5, f: 2, b: 2, nl: 4, nd: 3 },
    { name: 'Optoelectronics', subdomain: 'optoelectronics', h: 1, f: 5, b: 1, nl: 5, nd: 2 },
    { name: 'Hydraulics', subdomain: 'hydraulics', h: 2, f: 9, b: 2, nl: 4, nd: 3 },
    { name: 'Pneumatics', subdomain: 'pneumatics', h: 2, f: 9, b: 2, nl: 4, nd: 3 },
    { name: 'Lighting', subdomain: 'lighting', h: 7, f: 4, b: 4, nl: 1, nd: 1 },
    { name: 'Optical Components', subdomain: 'opticalcomponents', h: 7, f: 4, b: 4, nl: 1, nd: 1 },
    { name: 'Instruments', subdomain: 'instruments', h: 5, f: 2, b: 4, nl: 1, nd: 1 },
    { name: 'Electronics', subdomain: 'electronics', h: 1, f: 5, b: 1, nl: 5, nd: 2 },
    { name: 'Electrical Components', subdomain: 'electricalcomponents', h: 1, f: 5, b: 1, nl: 5, nd: 2 },
    { name: 'Connectors', subdomain: 'connectors', h: 5, f: 5, b: 1, nl: 5, nd: 2 },
    { name: 'Cables', subdomain: 'cables', h: 5, f: 5, b: 1, nl: 5, nd: 2 },
    { name: 'Circuits', subdomain: 'circuits', h: 1, f: 5, b: 1, nl: 5, nd: 2 },
    { name: 'Appliances', subdomain: 'appliances', h: 1, f: 2, b: 3, nl: 1, nd: 1 },
    { name: 'Batteries', subdomain: 'batteries', h: 1, f: 5, b: 1, nl: 5, nd: 2 },
    { name: 'Semiconductors', subdomain: 'semiconductors', h: 1, f: 5, b: 1, nl: 5, nd: 2 },
    { name: 'Security Systems', subdomain: 'securitysystems', h: 6, f: 5, b: 4, nl: 1, nd: 4 },
    { name: 'Safety Equipment', subdomain: 'safetyequipment', h: 6, f: 5, b: 4, nl: 1, nd: 4 },
    { name: 'CCTV Cameras', subdomain: 'cctvcameras', h: 6, f: 5, b: 4, nl: 1, nd: 4 },
    { name: 'Alarms', subdomain: 'alarms', h: 6, f: 5, b: 4, nl: 1, nd: 4 },
    { name: 'Locks', subdomain: 'locks', h: 6, f: 5, b: 4, nl: 1, nd: 4 }
];

async function getTenantAccessToken() {
    const response = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            app_id: LARK_APP_ID,
            app_secret: LARK_APP_SECRET
        })
    });

    const data = await response.json();
    if (data.code !== 0) {
        throw new Error(`Failed to get access token: ${data.msg} (Code: ${data.code})`);
    }
    return data.tenant_access_token;
}

async function deployBatch2() {
    console.log('🚀 Starting deployment of Industry Batch 2 (28 sites)...\n');

    try {
        const accessToken = await getTenantAccessToken();

        const records = BATCH_2_INDUSTRIES.map(site => ({
            fields: {
                industry_name: site.name,
                subdomain: site.subdomain,
                header_style_id: site.h,
                footer_style_id: site.f,
                banner_style_id: site.b,
                news_list_style_id: site.nl,
                news_detail_style_id: site.nd,
                site_status: true,
                ai_news_toggle: true,
                ssl_status: ["Active"]
            }
        }));

        // Lark batch_create supports up to 500 records, so we can send all 28 at once
        const response = await fetch(
            `https://open.larksuite.com/open-apis/bitable/v1/apps/${LARK_BASE_APP_TOKEN}/tables/${LARK_TABLE_INDUSTRY_SITES}/records/batch_create`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ records })
            }
        );

        const data = await response.json();
        if (data.code !== 0) {
            throw new Error(`Batch creation failed: ${data.msg} (Code: ${data.code})`);
        }

        console.log(`✅ Successfully deployed ${data.data.records.length} industry sites!`);
        data.data.records.forEach((r, i) => {
            console.log(`   - ${BATCH_2_INDUSTRIES[i].name} (${BATCH_2_INDUSTRIES[i].subdomain}.b-2b.com)`);
        });

    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        process.exit(1);
    }
}

deployBatch2();
