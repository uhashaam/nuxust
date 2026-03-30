import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
  const url = process.env.DATABASE_URL || '';
  console.log('Testing connection with:', url.split('@')[1]); // Log only host for safety

  const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  if (!match) {
    console.error('Invalid URL');
    return;
  }

  const config = {
    host: match[3],
    user: decodeURIComponent(match[1]),
    password: decodeURIComponent(match[2]),
    port: parseInt(match[4]),
    database: match[5]
  };

  try {
    const connection = await mysql.createConnection(config);
    console.log('Connected successfully!');
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM IndustrySite');
    console.log('IndustrySite count:', (rows as any)[0].count);
    await connection.end();
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();
