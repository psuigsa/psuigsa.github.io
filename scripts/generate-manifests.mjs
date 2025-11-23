import fs from "node:fs";
import path from "node:path";

const contentRoot = path.resolve("content");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeManifest(folder, predicate = () => true) {
  const dir = path.join(contentRoot, folder);
  ensureDir(dir);

  const files = fs
    .readdirSync(dir)
    .filter((file) => predicate(file))
    .sort();

  const manifestPath = path.join(dir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2) + "\n");
  console.log(`• ${manifestPath} (${files.length} items)`);
}

// Events manifest
writeManifest("events", (file) => file.endsWith(".md"));

// Placeholders for other collections to keep structure consistent
writeManifest("board", (file) => file.endsWith(".md"));
writeManifest("resources", (file) => file.endsWith(".md"));
