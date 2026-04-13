/**
 * seed-subdomains.mjs
 * 
 * Pre-seeds the 11 urgent subdomain sites into the database.
 * CF credentials should be added later via the /admin/sites/:id editor
 * once the Cloudflare accounts are created manually.
 * 
 * Usage: node scripts/seed-subdomains.mjs
 */
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } }
});

const urgentSubdomains = [
    // Laser group → laserchina.com
    { subdomain: 'lasercleaner',  industry: 'Laser Cleaning',      promotion: 'https://laserchina.com', cfEmail: 'lasercleaner@c9.pub' },
    { subdomain: 'laserwelder',   industry: 'Laser Welding',       promotion: 'https://laserchina.com', cfEmail: 'laserwelder@c9.pub' },
    { subdomain: 'lasercutter',   industry: 'Laser Cutting',       promotion: 'https://laserchina.com', cfEmail: 'lasercutter@c9.pub' },
    { subdomain: 'lasermarking',  industry: 'Laser Marking',       promotion: 'https://laserchina.com', cfEmail: 'lasermarking@c9.pub' },
    { subdomain: 'lasermachine',  industry: 'Laser Machinery',     promotion: 'https://laserchina.com', cfEmail: 'lasermachine@c9.pub' },
    // China Art group → puzb.com
    { subdomain: 'chinaart',      industry: 'Chinese Art',         promotion: 'https://puzb.com', cfEmail: 'chinaart@c9.pub' },
    { subdomain: 'chinaculture',  industry: 'Chinese Culture',     promotion: 'https://puzb.com', cfEmail: 'chinaculture@c9.pub' },
    { subdomain: 'chinajewelly',  industry: 'Chinese Jewelry',     promotion: 'https://puzb.com', cfEmail: 'chinajewelly@c9.pub' },
    { subdomain: 'chinajade',     industry: 'Chinese Jade',        promotion: 'https://puzb.com', cfEmail: 'chinajade@c9.pub' },
    // Smartwatch group → joeme.fit
    { subdomain: 'smartwatch',    industry: 'Smart Watches',       promotion: 'https://joeme.fit', cfEmail: 'smartwatch@c9.pub' },
    { subdomain: 'ewatch',        industry: 'Electronic Watches',  promotion: 'https://joeme.fit', cfEmail: 'ewatch@c9.pub' },
];

async function seed() {
    console.log('🌱 Seeding 11 urgent subdomain sites...\n');

    let created = 0;
    let skipped = 0;

    for (const s of urgentSubdomains) {
        // Check if already exists
        const existing = await prisma.industrySite.findFirst({
            where: { OR: [{ sub_domain: s.subdomain }, { subdomain: s.subdomain }] }
        });

        if (existing) {
            console.log(`  ⏭️  ${s.subdomain}.b-2b.com — already exists, skipping`);
            skipped++;
            continue;
        }

        const capitalName = s.subdomain.charAt(0).toUpperCase() + s.subdomain.slice(1);

        await prisma.industrySite.create({
            data: {
                site_name: `${s.industry} News`,
                site_title: `${s.industry} - Latest News & Insights`,
                industry_name: s.industry,
                sub_domain: s.subdomain,
                subdomain: s.subdomain,
                site_status: 'active',
                is_active: true,
                // CF (credentials to be added later via admin)
                cf_email: s.cfEmail,
                cf_dns_created: false,
                // Promotion
                promotion_url: s.promotion,
                // AI News — enabled with 2/day as per senior
                ai_news_enabled: true,
                ai_news_count: 2,
                ai_focus_keyword: s.industry,
                // SEO defaults
                seo_title: `${s.industry} News - Industry Updates & Analysis`,
                seo_description: `Stay up to date with the latest ${s.industry.toLowerCase()} news, market trends, technology insights and professional analysis.`,
                seo_keywords: s.industry.toLowerCase(),
                canonical_url: `https://${s.subdomain}.b-2b.com`,
                robots_meta: 'index,follow',
                schema_type: 'NewsMediaOrganization',
                // Default templates
                header_style_id: 'header-01',
                footer_style_id: 'footer-01',
                banner_style_id: 'banner-01',
                news_list_style_id: 'news-list-01',
                news_detail_style_id: 'news-detail-01',
            }
        });

        console.log(`  ✅ ${s.subdomain}.b-2b.com — created (${s.industry}, promotes ${s.promotion})`);
        created++;
    }

    console.log(`\n📊 Summary: ${created} created, ${skipped} skipped`);
    console.log('\n📝 Next steps:');
    console.log('  1. Create CF accounts for each subdomain at dash.cloudflare.com');
    console.log(`     Email pattern: [subdomain]@c9.pub, Password: [Subdomain]#1`);
    console.log('  2. Get API Token from each CF account (Profile → API Tokens → Create)');
    console.log('  3. Go to /admin/sites → edit each site → Cloudflare tab → paste credentials');
    console.log('  4. Click "Create DNS Record" to set up the CNAME');

    await prisma.$disconnect();
}

seed().catch((e) => {
    console.error('❌ Seeding failed:', e.message);
    prisma.$disconnect();
    process.exit(1);
});
