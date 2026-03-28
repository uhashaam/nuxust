const url = 'http://localhost:3001/api/lark/migrate-all';
console.log(`Triggering migration at ${url}...`);

try {
  const response = await fetch(url, { method: 'POST' });
  const data = await response.json();
  console.log('Migration Response:', JSON.stringify(data, null, 2));
} catch (error) {
  console.error('Migration Failed:', error.message);
}
