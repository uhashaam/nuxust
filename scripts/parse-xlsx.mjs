import xlsx from 'xlsx';

const filename = 'lark_export.csv.xlsx';
const workbook = xlsx.readFile(filename);

const sheetNames = workbook.SheetNames;
console.log('Sheets found:', sheetNames);

for (const sheetName of sheetNames) {
  const sheet = workbook.Sheets[sheetName];
  const json = xlsx.utils.sheet_to_json(sheet);
  console.log(`\n=== Sheet: ${sheetName} ===`);
  console.log(`Row count: ${json.length}`);
  if (json.length > 0) {
    console.log('Sample row (first):');
    console.log(json[0]);
  }
}
