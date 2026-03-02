/**
 * fetch-ratings.js
 *
 * Fetches housing ratings from a public Google Sheet (CSV export) and writes
 * the result to public/data/housing-ratings.json so the static site can read it.
 *
 * IMPORTANT: The Google Sheet must be shared as "Anyone with the link can view"
 * for the CSV export URL to work without authentication.
 *
 * Run: node scripts/fetch-ratings.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SHEET_ID = "1LF_Fj7MqPxDGmKMf4171YIHshCoBOEk-jyrn2byhW-g";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
const OUTPUT_PATH = path.join(__dirname, "../public/data/housing-ratings.json");

/** Parse a CSV string into an array of objects using the first row as headers */
function parseCsv(csvText) {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  // Parse a single CSV line respecting quoted fields
  const parseLine = (line) => {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    // Skip completely empty rows
    if (values.every((v) => v === "")) continue;
    const row = {};
    headers.forEach((header, idx) => {
      row[header.trim()] = values[idx] !== undefined ? values[idx] : "";
    });
    rows.push(row);
  }

  return rows;
}

async function main() {
  console.log("Fetching housing ratings from Google Sheets...");

  let csvText;
  try {
    const res = await fetch(CSV_URL, { redirect: "follow" });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    csvText = await res.text();
  } catch (err) {
    console.error("Failed to fetch spreadsheet:", err.message);
    console.error(
      "Make sure the Google Sheet is shared as 'Anyone with the link can view'."
    );
    process.exit(1);
  }

  const ratings = parseCsv(csvText);
  console.log(`Parsed ${ratings.length} rating(s).`);

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(ratings, null, 2), "utf-8");
  console.log(`Saved to ${OUTPUT_PATH}`);
}

main();
