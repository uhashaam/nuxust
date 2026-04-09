import { PrismaClient } from '@prisma/client';
import xlsx from 'xlsx';

const prisma = new PrismaClient();

// Helper to convert Excel date serial numbers to BigInt timestamps
function excelDateToTimestamp(serial) {
    if (!serial || isNaN(serial)) return BigInt(Date.now());
    // Excel epoch is 1899-12-30.
    const utcDays = serial - 25569;
    const utcValue = utcDays * 86400 * 1000;
    return BigInt(Math.floor(utcValue));
}

async function main() {
    console.log("Reading lark_export.csv.xlsx...");
    const workbook = xlsx.readFile('lark_export.csv.xlsx');

    // 1. Admin Settings
    if (workbook.Sheets['Admin Settings']) {
        const admins = xlsx.utils.sheet_to_json(workbook.Sheets['Admin Settings']);
        for (const record of admins) {
            const key = record.Key || record['Setting Name'];
            if (!key) continue;
            await prisma.adminSetting.upsert({
                where: { key: String(key) },
                update: { value: String(record.Value) },
                create: {
                    key: String(key),
                    value: String(record.Value),
                    description: record.Description ? String(record.Description) : null
                }
            });
        }
        console.log(`Processed ${admins.length} Admin Settings.`);
    }

    // 2. Plans / Coupons
    if (workbook.Sheets['Plans & Coupons']) {
        const plans = xlsx.utils.sheet_to_json(workbook.Sheets['Plans & Coupons']);
        for (const record of plans) {
            const name = record.plan_tier || record.coupon_code;
            if (!name) continue;
            
            // Generate deterministic ID or find by name/code
            const limits = {
                weekly_publish_limit: record.weekly_publish_limit || 0,
                daily_publish_limit: record.daily_publish_limit || 0
            };

            // Use first existing plan by name or create a new one
            const existing = await prisma.planCoupon.findFirst({ where: { name: String(name) } });
            if (!existing) {
                await prisma.planCoupon.create({
                    data: {
                        type: record.plan_tier ? 'Plan' : 'Coupon',
                        name: String(name),
                        code: record.coupon_code ? String(record.coupon_code) : null,
                        price: Number(record.annual_price_usd) || null,
                        discount_amount: Number(record.coupon_discount) || null,
                        duration_days: 365,
                        limits: JSON.stringify(limits),
                        is_active: true,
                        valid_until: record.validity_end ? excelDateToTimestamp(record.validity_end) : null
                    }
                });
            }
        }
        console.log(`Processed ${plans.length} Plans & Coupons.`);
    }

    // 3. Products
    if (workbook.Sheets['Product']) {
        const products = xlsx.utils.sheet_to_json(workbook.Sheets['Product']);
        for (const record of products) {
            const name = record.Text || record.product_name;
            const slug = record.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            if (!name) continue;

            const existing = await prisma.product.findUnique({ where: { slug: slug } });
            if (!existing) {
                await prisma.product.create({
                    data: {
                        name: String(name),
                        description: record.description || '',
                        short_description: record.short_description || null,
                        price: Number(record.price) || 0,
                        category: record.category || null,
                        specifications: record.specifications || null,
                        slug: slug,
                        is_featured: record.is_featured === '1' || record.is_featured === true
                    }
                });
            }
        }
        console.log(`Processed ${products.length} Products.`);
    }

    // 4. Industry Sites
    if (workbook.Sheets['Industry Sites']) {
        const sites = xlsx.utils.sheet_to_json(workbook.Sheets['Industry Sites']);
        for (const record of sites) {
            const subdomain = record.subdomain || record.Subdomain;
            if (!subdomain) continue;

            const existing = await prisma.industrySite.findUnique({ where: { sub_domain: subdomain } });
            if (!existing) {
                await prisma.industrySite.create({
                    data: {
                        site_name: record.industry_name || record['Industry Name'] || subdomain,
                        industry_name: record.industry_name || record['Industry Name'],
                        sub_domain: subdomain,
                        subdomain: subdomain,
                        meta_description: record.meta_description || null,
                        contact_email: record.contact_email || null,
                        contact_phone: record.contact_phone || null,
                        about_text: record.about_text || null,
                        site_status: record.site_status || 'active',
                        ai_news_toggle: record.ai_news_toggle === '1' || record.ai_news_toggle === true,
                        bound_user_id: record.bound_user_id ? String(record.bound_user_id) : null
                    }
                });
            }
        }
        console.log(`Processed ${sites.length} Industry Sites.`);
    }

    // 5. Users
    if (workbook.Sheets['User Management']) {
        const users = xlsx.utils.sheet_to_json(workbook.Sheets['User Management']);
        for (const record of users) {
            const username = record.username;
            if (!username) continue;

            const existing = await prisma.user.findUnique({ where: { username: username } });
            if (!existing) {
                await prisma.user.create({
                    data: {
                        username: username,
                        email: record.email || null,
                        password_hash: record.password_hash || '',
                        user_type: record.user_type || 'user',
                        registration_time: excelDateToTimestamp(record.registration_time),
                        remaining_posts: Number(record.remaining_posts) || 0,
                        user_status: record.user_status || 'active'
                    }
                });
            } else {
                 if(existing.email == null && record.email) {
                    await prisma.user.update({
                        where: { username },
                        data: { email: record.email }
                    });
                 }
            }
        }
        console.log(`Processed ${users.length} Users.`);
    }

    // 6. News
    if (workbook.Sheets['News Content']) {
        const news = xlsx.utils.sheet_to_json(workbook.Sheets['News Content']);
        for (let i = 0; i < news.length; i++) {
            const record = news[i];
            const title = record.news_title;
            const slug = record.slug || title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 100) || `news-${Date.now()}-${i}`;
            
            if (!title) continue;

            const existing = await prisma.newsContent.findUnique({ where: { slug: slug } });
            if (!existing) {
                await prisma.newsContent.create({
                    data: {
                        title: title,
                        content: record.news_content || '',
                        industry: record.site_id ? String(record.site_id) : null,
                        publication_time: excelDateToTimestamp(record.release_time),
                        summary: record.summary || null,
                        author: record.author_email || null,
                        status: record.release_status || 'Published',
                        source: record.source || null,
                        is_featured: record.is_featured === '1' || record.is_featured === true,
                        slug: slug
                    }
                });
            }
        }
        console.log(`Processed ${news.length} News Items.`);
    }

    console.log("Database Sync Complete!");
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
