import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// BigInt serialization fix
BigInt.prototype.toJSON = function() { return this.toString() };

console.log('DATABASE_URL from env:', process.env.DATABASE_URL ? 'Found' : 'NOT FOUND');

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
});

const LARK_APP_ID = process.env.NUXT_LARK_APP_ID;
const LARK_APP_SECRET = process.env.NUXT_LARK_APP_SECRET;
const APP_TOKEN = process.env.NUXT_LARK_BASE_APP_TOKEN;

// Tables
const tables = {
    industrySites: process.env.NUXT_LARK_TABLE_INDUSTRY_SITES,
    users: process.env.NUXT_LARK_TABLE_USERS,
    plans: process.env.NUXT_LARK_TABLE_PLANS_COUPONS,
    news: process.env.NUXT_LARK_TABLE_NEWS_CONTENT,
    admin: process.env.NUXT_LARK_TABLE_ADMIN_SETTINGS,
    products: process.env.NUXT_LARK_TABLE_PRODUCTS,
};

async function getLarkToken() {
    const res = await fetch('https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            app_id: LARK_APP_ID,
            app_secret: LARK_APP_SECRET
        })
    });
    const data = await res.json();
    return data.tenant_access_token;
}

async function fetchAllLarkRecords(tableId, token) {
    if (!tableId) return [];
    let allRecords = [];
    let pageToken = undefined;
    let hasMore = true;

    while (hasMore) {
        let url = `https://open.larksuite.com/open-apis/bitable/v1/apps/${APP_TOKEN}/tables/${tableId}/records?page_size=100`;
        if (pageToken) url += `&page_token=${pageToken}`;

        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.code !== 0) throw new Error(`Lark error: ${data.msg}`);

        if (data.data && data.data.items) {
            allRecords.push(...data.data.items);
        }
        hasMore = data.data && data.data.has_more;
        pageToken = data.data ? data.data.page_token : undefined;
    }
    return allRecords;
}

async function migrate() {
    console.log('Starting Data Migration...');
    const token = await getLarkToken();
    if (!token) throw new Error('Could not get Lark Access Token');
    console.log('Lark Token acquired.');

    // 1. Admin Settings
    console.log('Migrating Admin Settings...');
    const admins = await fetchAllLarkRecords(tables.admin, token);
    for (const record of admins) {
        const key = record.fields['Key'] || record.fields['Setting Name'];
        if (!key) continue;
        await prisma.adminSetting.upsert({
            where: { key: key },
            update: { value: String(record.fields['Value']) },
            create: {
                id: record.record_id,
                key: key,
                value: String(record.fields['Value']),
                description: record.fields['Description']
            }
        });
    }
    console.log(`Migrated ${admins.length} admin settings.`);

    // 2. Plans / Coupons
    console.log('Migrating Plans...');
    const plans = await fetchAllLarkRecords(tables.plans, token);
    for (const record of plans) {
        let limits = {
            weekly_publish_limit: record.fields.weekly_publish_limit || 0,
            daily_publish_limit: record.fields.daily_publish_limit || 0
        };
        await prisma.planCoupon.create({
            data: {
                id: record.record_id,
                type: record.fields.plan_tier ? 'Plan' : 'Coupon',
                name: record.fields.plan_tier || record.fields.coupon_code || 'Unknown',
                code: record.fields.coupon_code,
                price: Number(record.fields.annual_price_usd) || undefined,
                discount_amount: Number(record.fields.coupon_discount) || undefined,
                duration_days: 365,
                limits: JSON.stringify(limits),
                is_active: record.fields.coupon_status === 'active' || true,
                valid_until: record.fields.validity_end ? BigInt(record.fields.validity_end) : undefined
            }
        }).catch(e => console.error('Skip existing plan'));
    }
    console.log(`Migrated ${plans.length} plans.`);

    // 3. Products
    console.log('Migrating Products...');
    const products = await fetchAllLarkRecords(tables.products, token);
    for (const record of products) {
        await prisma.product.create({
            data: {
                id: record.record_id,
                name: record.fields.Text || record.fields.product_name,
                description: record.fields.description || '',
                short_description: record.fields.short_description,
                price: Number(record.fields.price) || 0,
                category: record.fields.category,
                specifications: record.fields.specifications,
                slug: record.fields.slug || record.record_id,
                featured_image: record.fields.featured_image,
                is_featured: !!record.fields.is_featured
            }
        }).catch(e => console.error('Skip existing product'));
    }
    console.log(`Migrated ${products.length} products.`);

    // 4. Industry Sites
    console.log('Migrating Industry Sites...');
    const sites = await fetchAllLarkRecords(tables.industrySites, token);
    for (const record of sites) {
        await prisma.industrySite.create({
            data: {
                id: record.record_id,
                site_name: record.fields.industry_name || record.fields['Industry Name'] || record.record_id,
                industry_name: record.fields.industry_name || record.fields['Industry Name'],
                sub_domain: record.fields.subdomain || record.fields.Subdomain || record.record_id,
                subdomain: record.fields.subdomain || record.fields.Subdomain || record.record_id,
                meta_description: record.fields.meta_description,
                contact_email: record.fields.contact_email,
                contact_phone: record.fields.contact_phone,
                about_text: record.fields.about_text,
                site_status: record.fields.site_status || 'active',
                ai_news_toggle: record.fields.ai_news_toggle === 'true' || record.fields.ai_news_toggle === true,
                bound_user_id: record.fields.bound_user_id ? String(record.fields.bound_user_id) : undefined
            }
        }).catch(e => console.error('Skip existing site'));
    }
    console.log(`Migrated ${sites.length} industry sites.`);

    // 5. Users
    console.log('Migrating Users...');
    const users = await fetchAllLarkRecords(tables.users, token);
    for (const record of users) {
        await prisma.user.create({
            data: {
                id: record.record_id,
                username: record.fields.username || record.record_id,
                email: record.fields.email,
                password_hash: record.fields.password_hash || '',
                user_type: record.fields.user_type || 'user',
                registration_time: record.fields.registration_time ? BigInt(record.fields.registration_time) : BigInt(Date.now()),
                remaining_posts: Number(record.fields.remaining_posts) || 0,
                user_status: record.fields.user_status || 'active',
                plan_expires_at: record.fields.plan_expires_at ? BigInt(record.fields.plan_expires_at) : undefined,
                bound_site_id: record.fields.bound_site_id
            }
        }).catch(e => console.error('Skip existing user'));
    }
    console.log(`Migrated ${users.length} users.`);

    // 6. News
    console.log('Migrating News...');
    const news = await fetchAllLarkRecords(tables.news, token);
    for (const record of news) {
        let siteId = undefined;
        if (record.fields.site_id && Array.isArray(record.fields.site_id) && record.fields.site_id.length > 0) {
           siteId = record.fields.site_id[0].record_id || record.fields.site_id[0];
        }
        await prisma.newsContent.create({
            data: {
                id: record.record_id,
                title: record.fields.news_title || 'Untitled',
                content: record.fields.news_content || '',
                industry: siteId,
                publication_time: record.fields.release_time ? BigInt(record.fields.release_time) : BigInt(Date.now()),
                summary: record.fields.summary,
                thumbnail: record.fields.featured_image,
                author: record.fields.author_email,
                status: record.fields.release_status || 'Published',
                source: record.fields.source,
                is_featured: !!record.fields.is_featured,
                slug: record.fields.slug || record.record_id
            }
        }).catch(e => console.error('Skip existing news'));
    }
    console.log(`Migrated ${news.length} news items.`);

    console.log('Migration Complete!');
}

migrate()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
