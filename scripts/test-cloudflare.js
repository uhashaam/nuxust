
import Cloudflare from 'cloudflare';

const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const zoneId = process.env.CLOUDFLARE_ZONE_ID;

if (!apiToken || !zoneId) {
    console.error('Missing Cloudflare credentials in .env');
    process.exit(1);
}

const cloudflare = new Cloudflare({
    apiToken: apiToken,
});

async function testConnection() {
    try {
        console.log('Testing Cloudflare connection...');
        const zone = await cloudflare.zones.get({ zone_id: zoneId });
        console.log('Successfully connected to zone:', zone.name);

        console.log('Listing DNS records...');
        const records = await cloudflare.dns.records.list({ zone_id: zoneId });
        console.log(`Found ${records.result.length} DNS records.`);

        // Check if test subdomain exists
        const testSubdomain = 'test-automation';
        const existing = records.result.find(r => r.name.startsWith(testSubdomain));

        if (existing) {
            console.log(`Test record for ${testSubdomain} already exists:`, existing.id);
        } else {
            console.log(`Test record for ${testSubdomain} does not exist. (Skipping creation to avoid pollution)`);
        }

    } catch (error) {
        console.error('Connection failed:', error);
    }
}

testConnection();
