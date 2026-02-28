const lark = require('@larksuiteoapi/node-sdk');

const appId = 'cli_a90b535a2a381e1b';
const appSecret = 'A1LYarDtsmK5IntFOhMU5giro506qBLn';
const appToken = 'LYlibwPLba9KIYsAUw9ja4sCpwf';
const plansTableId = 'tblFDfcvNDMfRH9X';

async function seedPlans() {
    const client = new lark.Client({ appId, appSecret });
    const plans = [
        { plan_id: "vip1", plan_tier: "VIP1", weekly_publish_limit: 1, daily_publish_limit: 0, annual_price_usd: 20 },
        { plan_id: "vip2", plan_tier: "VIP2", weekly_publish_limit: 7, daily_publish_limit: 1, annual_price_usd: 100 },
        { plan_id: "vip3", plan_tier: "VIP3", weekly_publish_limit: 14, daily_publish_limit: 2, annual_price_usd: 150 },
        { plan_id: "vip4", plan_tier: "VIP4", weekly_publish_limit: 21, daily_publish_limit: 3, annual_price_usd: 200 },
        { plan_id: "admin", plan_tier: "Admin", weekly_publish_limit: 9999, daily_publish_limit: 999, annual_price_usd: 0 }
    ];

    console.log('--- Seeding Plans ---');
    for (const plan of plans) {
        try {
            await client.bitable.appTableRecord.create({
                path: { app_token: appToken, table_id: plansTableId },
                data: { fields: plan }
            });
            console.log(`Created plan: ${plan.plan_tier}`);
        } catch (e) {
            console.error(`Failed to create plan ${plan.plan_tier}:`, e.message);
        }
    }
}

seedPlans();
