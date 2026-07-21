/**
 * Enlarge game canvases to fill the larger iframe container.
 * Patterns handled:
 *  A: Math.min(NNN,innerWidth-NN) / Math.min(NNN,innerHeight-NN) -> raise caps
 *  B: const W=NNN,H=NNN (fixed) -> dynamic with caps
 *  C: c.width=NNN;c.height=NNN -> dynamic
 *  D: grid games (S/CELL/SIZE cell constants) -> dynamic cell sizing
 *  E: window.innerWidth/Height capped -> raise caps
 *  F: DOM games -> inject zoom-to-fit script
 */
const fs = require("fs");
const path = require("path");

const gamesDir = path.join(__dirname, "..", "public", "games");
const dirs = fs.readdirSync(gamesDir).filter((d) =>
  fs.existsSync(path.join(gamesDir, d, "index.html"))
);

const zoomScript = `<script>
(function(){function z(){document.body.style.zoom=1;var w=Math.max(document.documentElement.scrollWidth,320);var h=Math.max(document.documentElement.scrollHeight,320);var s=Math.min((innerWidth-12)/w,(innerHeight-12)/h,1.85);if(s>1.05)document.body.style.zoom=s;else document.body.style.zoom=1}z();addEventListener('resize',z)})();
</script>`;

let canvasFixed = 0, domZoomed = 0, unchanged = [];

for (const dir of dirs) {
  const file = path.join(gamesDir, dir, "index.html");
  let html = fs.readFileSync(file, "utf8");
  const original = html;
  const isCanvas = html.includes("<canvas");

  // --- Pattern A: Math.min(NNN,innerWidth-NN) -> cap 860 ---
  html = html.replace(/Math\.min\(\d{2,3},innerWidth-(\d+)\)/g, "Math.min(860,innerWidth-$1)");
  html = html.replace(/Math\.min\(\d{2,3},innerHeight-(\d+)\)/g, "Math.min(640,innerHeight-$1)");

  // --- Pattern E: Math.min(window.innerWidth, NNN) ---
  html = html.replace(/Math\.min\(window\.innerWidth,\s*\d{2,3}\)/g, "Math.min(window.innerWidth-16,860)");
  html = html.replace(/Math\.min\(window\.innerHeight,\s*\d{2,3}\)/g, "Math.min(window.innerHeight-80,640)");

  // --- Pattern A2: Math.min(innerWidth,NNN) (no offset) ---
  html = html.replace(/Math\.min\(innerWidth,\d{2,3}\)/g, "Math.min(innerWidth-16,860)");
  html = html.replace(/Math\.min\(innerHeight,\d{2,3}\)/g, "Math.min(innerHeight-80,640)");

  // --- Pattern D: grid games ---
  // snake/tetris: const S=20,COLS=20,ROWS=20;
  html = html.replace(
    /const S=(\d+),COLS=(\d+),ROWS=(\d+);/g,
    "const COLS=$2,ROWS=$3,S=Math.max($1,Math.floor(Math.min((innerWidth-16)/COLS,(innerHeight-100)/ROWS)));"
  );
  // bubble-pop: const COLS=8,ROWS=10,SIZE=45;
  html = html.replace(
    /const COLS=(\d+),ROWS=(\d+),SIZE=(\d+);/g,
    "const COLS=$1,ROWS=$2,SIZE=Math.max($3,Math.floor(Math.min((innerWidth-16)/COLS,(innerHeight-100)/ROWS)));"
  );
  // tower-defense: const COLS=16,ROWS=10,CELL=36;
  html = html.replace(
    /const COLS=(\d+),ROWS=(\d+),CELL=(\d+);/g,
    "const COLS=$1,ROWS=$2,CELL=Math.max($3,Math.floor(Math.min((innerWidth-16)/COLS,(innerHeight-100)/ROWS)));"
  );
  // maze-runner: const CELL=28;let COLS=11,ROWS=11;
  html = html.replace(
    /const CELL=(\d+);let COLS=(\d+),ROWS=(\d+);/g,
    "let COLS=$2,ROWS=$3;const CELL=Math.max($1,Math.floor(Math.min((innerWidth-16)/COLS,(innerHeight-100)/ROWS)));"
  );
  // pac-man tile size cap
  html = html.replace(
    /TS=Math\.min\(Math\.floor\(\(Math\.min\(\d+,innerWidth-16\)\)\/COLS\),32\)/g,
    "TS=Math.min(Math.floor((Math.min(860,innerWidth-16))/COLS),48)"
  );

  // --- Pattern B: const W=NNN,H=NNN (fixed constants) -> dynamic ---
  html = html.replace(
    /const W=(\d{2,3}),H=(\d{2,3})([,;])/g,
    "const W=Math.min(860,innerWidth-16),H=Math.min(640,innerHeight-80)$2"
  );

  // --- Pattern C: direct canvas assignment c.width=NNN;c.height=NNN ---
  html = html.replace(
    /c\.width=(\d{2,3});c\.height=(\d{2,3});/g,
    "c.width=Math.min(860,innerWidth-16);c.height=Math.min(640,innerHeight-80);"
  );
  // canvas.width=NNN;canvas.height=NNN variant
  html = html.replace(
    /canvas\.width=(\d{2,3});canvas\.height=(\d{2,3});/g,
    "canvas.width=Math.min(860,innerWidth-16);canvas.height=Math.min(640,innerHeight-80);"
  );

  if (html !== original) {
    fs.writeFileSync(file, html, "utf8");
    canvasFixed++;
  } else if (!isCanvas) {
    // DOM-based game: inject zoom-to-fit
    if (!html.includes("document.body.style.zoom")) {
      html = html.replace("</body>", zoomScript + "\n</body>");
      fs.writeFileSync(file, html, "utf8");
      domZoomed++;
    }
  } else {
    unchanged.push(dir);
  }
}

console.log(`Canvas games resized: ${canvasFixed}`);
console.log(`DOM games zoom-injected: ${domZoomed}`);
console.log(`Unchanged canvas games (need manual check): ${unchanged.length}`);
unchanged.forEach((d) => console.log("  -", d));
