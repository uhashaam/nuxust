const axios = require('axios');
const ids = [
  '1504917595217-d4dc5ebe6122',
  '1581092918056-0c4c3acd3789',
  '1565151443315-7a0e3f0f7f3a',
  '1565349978634-c9e57b5a8a68',
  '1518770660439-4636190af475',
  '1581091226825-a6a2a5aee158',
  '1537462715879-360eeb6ac295',
  '1580983531558-854911d3fa54',
  '1496247749665-49cf5b1022e9',
  '1611075382357-19ecefc47454',
  '1581090464707-f9047b313078',
  '1504328345606-18bbc8c9d7d1',
  '1563728646-6085a6baac49'
];

async function check() {
  console.log("Checking...");
  let valid = [];
  for (let id of ids) {
    try {
      let res = await axios.head(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`);
      if (res.status === 200) {
        console.log(`Valid: ${id}`);
        valid.push(id);
      }
    } catch(e) {
      console.log(`Invalid: ${id}`);
    }
  }
  console.log("\nAll Valid IDs:", valid);
}
check();
