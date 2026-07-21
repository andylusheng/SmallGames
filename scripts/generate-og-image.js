/**
 * Generate social share image (og-image.png, 1200x630) using sharp.
 * Run: node scripts/generate-og-image.js
 */
const sharp = require("sharp");
const path = require("path");

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1e1b4b"/>
      <stop offset="1" stop-color="#0f0f1a"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6366f1"/>
      <stop offset="1" stop-color="#4f46e5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="120" r="220" fill="#6366f1" opacity="0.12"/>
  <circle cx="150" cy="540" r="180" fill="#4f46e5" opacity="0.12"/>
  <rect x="90" y="200" width="120" height="120" rx="28" fill="url(#accent)"/>
  <path d="M130 230 L185 260 L130 290 Z" fill="#ffffff"/>
  <text x="90" y="410" font-family="Arial, sans-serif" font-size="86" font-weight="bold" fill="#ffffff">ZeroPlay Games</text>
  <text x="92" y="475" font-family="Arial, sans-serif" font-size="38" fill="#a5b4fc">Play Free Online Games - No Download</text>
  <text x="92" y="555" font-family="Arial, sans-serif" font-size="30" fill="#9ca3af">100+ HTML5 games - Puzzle, Arcade, Action, Racing &amp; more</text>
</svg>`;

sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png()
  .toFile(path.join(__dirname, "..", "public", "og-image.png"))
  .then(() => console.log("Generated public/og-image.png (1200x630)"))
  .catch((err) => {
    console.error("Failed:", err);
    process.exit(1);
  });
