const fs = require("fs");
const path = require("path");

const input = path.join(__dirname, "../src/data/games.json");
const output = path.join(__dirname, "../public/games-index.json");
const publishedAt = "2026-07-21";
const updatedAt = "2026-08-07";
const games = JSON.parse(fs.readFileSync(input, "utf8"));
const index = games.map(({ id, title, slug, description, category, thumbnail, tags, featured, popular }) => ({
  id, title, slug, description, category, thumbnail, tags, featured, popular, publishedAt, updatedAt,
}));
fs.writeFileSync(output, JSON.stringify(index));
console.log(`Generated ${index.length} search index entries.`);
