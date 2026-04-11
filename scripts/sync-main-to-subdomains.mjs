import mysql from 'mysql2/promise';
import fs from 'fs';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

// Load .env to get current MySQL credentials
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const D1_DATABASE_NAME = "nuxust_db";

async function sync() {
    if (!DATABASE_URL || !DATABASE_URL.startsWith('mysql')) {
        console.error('Error: DATABASE_URL must be a MySQL connection string.');
        process.exit(1);
    }

    try {
        const connection = await mysql.createConnection(DATABASE_URL);
        console.log('Connected to Hostinger MySQL...');

        const tables = ['User', 'Product', 'IndustrySite', 'NewsContent', 'PlanCoupon', 'AdminSetting'];
        let allSql = '-- Sync from MySQL to D1\n';
        
        // Add TRUNCATE/DELETE commands to ensure a clean sync if needed
        // SQLite doesn't have TRUNCATE, so we use DELETE FROM
        for (const table of tables) {
            allSql += `DELETE FROM "${table}";\n`;
        }

        for (const table of tables) {
            console.log(`Syncing table: ${table}...`);
            const [rows] = await connection.execute(`SELECT * FROM ${table}`);
            console.log(`Found ${rows.length} rows.`);

            if (rows.length === 0) continue;

            const columns = Object.keys(rows[0]);
            const insertHead = `INSERT INTO "${table}" (${columns.map(c => `"${c}"`).join(', ')}) VALUES `;
            
            const chunks = [];
            for (const row of rows) {
                const values = columns.map(col => {
                    const val = row[col];
                    if (val === null) return 'NULL';
                    if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
                    if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
                    if (typeof val === 'boolean') return val ? '1' : '0';
                    return val;
                });
                chunks.push(`(${values.join(', ')})`);
            }
            
            allSql += `${insertHead}\n${chunks.join(',\n')};\n\n`;
        }

        const syncFile = 'migrations/sync_data.sql';
        fs.writeFileSync(syncFile, allSql);
        console.log(`Sync SQL generated: ${syncFile}`);

        await connection.end();

        console.log('Pushing to Cloudflare D1...');
        const cmd = `npx wrangler d1 execute ${D1_DATABASE_NAME} --file ${syncFile} --remote --y`;
        execSync(cmd, { stdio: 'inherit' });
        console.log('Successfully synced MySQL to Cloudflare D1!');

    } catch (e) {
        console.error('Sync Failed:', e.message);
    }
}

sync();
