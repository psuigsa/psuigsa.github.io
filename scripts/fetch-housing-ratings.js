// scripts/fetch-housing-ratings.js
// Fetches housing ratings from a public Google Sheet and writes to data/housing-ratings.json

const fs = require('fs');
const https = require('https');

// Replace with your Google Sheet ID and sheet name (gid or sheet name)
const SHEET_ID = '1LF_Fj7MqPxDGmKMf4171YIHshCoBOEk-jyrn2byhW-g';
const SHEET_GID = '0'; // default first sheet
const OUTPUT_PATH = 'data/housing-ratings.json';

const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

function csvToJson(csv) {
  const lines = csv.split('\n').filter(Boolean);
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = values[i] ? values[i].trim() : '';
    });
    return obj;
  });
}

https.get(CSV_URL, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = csvToJson(data);
    fs.mkdirSync('data', { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(json, null, 2));
    console.log('Housing ratings updated:', OUTPUT_PATH);
  });
}).on('error', (err) => {
  console.error('Error fetching sheet:', err);
  process.exit(1);
});
