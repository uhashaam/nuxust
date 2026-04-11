import mysql from 'mysql2/promise';
import fs from 'fs';

const DATABASE_URL = "mysql://u199015239_db_admin:Rickge%40_11123@193.203.166.31:3306/u199015239_nuxt_app";

async function migrate() {
    const connection = await mysql.createConnection(DATABASE_URL);
    console.log('Connected to MySQL...');

    const tables = ['User', 'Product', 'IndustrySite', 'NewsContent', 'PlanCoupon', 'AdminSetting'];
    let allSql = '-- Migration from MySQL to D1\n';

    for (const table of tables) {
        console.log(`Fetching data from ${table}...`);
        const [rows] = await connection.execute(`SELECT * FROM ${table}`);
        console.log(`Found ${rows.length} rows in ${table}`);

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

    fs.writeFileSync('migrations/0002_data_migration.sql', allSql);
    console.log('Migration SQL generated: migrations/0002_data_migration.sql');

    await connection.end();
}

migrate().catch(console.error);
