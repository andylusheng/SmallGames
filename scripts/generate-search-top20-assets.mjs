import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const games = JSON.parse(fs.readFileSync(path.join(root, 'src/data/games-search-top20.json'), 'utf8'));
const outRoot = path.join(root, 'public/games');
const modeBySlug = {
  'aurora-solitaire': 'aurora',
  'neon-snake': 'snake',
  'pulse-jumper': 'jumper',
  'zen-sudoku': 'sudoku',
  'cascade-solitaire': 'cascade',
  'maze-muncher': 'maze',
  'grid-three': 'grid3',
  'fusion-4096': 'merge4096',
  'open-cell-cards': 'freecell',
  'neon-stack': 'stack',
  'fossil-sprint': 'fossil',
  'void-runner': 'void',
  'gravity-slope': 'slope',
  'crown-draughts': 'draughts',
  'heart-trick': 'hearts',
  'star-spades': 'spades',
  'word-hunt-grid': 'wordhunt',
  'dice-five': 'dice',
  'neon-drift': 'drift',
  'orb-shooter': 'orbs',
};
const iconByMode = {
  aurora:'A♠', snake:'S', jumper:'↥', sudoku:'9', cascade:'K♠', maze:'◆', grid3:'●◆', merge4096:'4096', freecell:'A♥', stack:'▦', fossil:'R', void:'▲', slope:'●', draughts:'★', hearts:'♥', spades:'★', wordhunt:'ABC', dice:'⚄', drift:'↝', orbs:'●●',
};
const paletteByCategory = {
  puzzle:['#2563eb','#22d3ee'], arcade:['#7c3aed','#f43f5e'], strategy:['#0f766e','#f59e0b'], casual:['#db2777','#8b5cf6'], racing:['#ea580c','#facc15'],
};

if (games.length !== 20) throw new Error(`Search Top20 inventory contains ${games.length} games; expected 20.`);
for (const game of games) {
  const mode = modeBySlug[game.slug];
  if (!mode) throw new Error(`Missing runtime mode for ${game.slug}`);
  const dir = path.join(outRoot, game.slug);
  fs.mkdirSync(dir, {recursive:true});
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover,user-scalable=no">
<meta name="theme-color" content="#020617">
<title>${game.title} · ZeroPlay Runtime</title>
<link rel="stylesheet" href="/games/_search-top20/runtime.css">
</head>
<body>
<div id="app"></div>
<script>window.ZP_GAME=${JSON.stringify({slug:game.slug,title:game.title,mode})};</script>
<script src="/games/_search-top20/runtime.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  const [a,b] = paletteByCategory[game.category] ?? ['#2563eb','#22d3ee'];
  const icon = iconByMode[mode] ?? 'PLAY';
  const safeTitle = game.title.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" role="img" aria-label="${safeTitle}">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<rect width="640" height="360" rx="32" fill="#020617"/>
<circle cx="520" cy="50" r="210" fill="${a}" opacity=".16"/><circle cx="90" cy="340" r="220" fill="${b}" opacity=".12"/>
<g opacity=".12" stroke="#fff">${Array.from({length:9},(_,i)=>`<path d="M0 ${40+i*40}H640"/>`).join('')}${Array.from({length:16},(_,i)=>`<path d="M${i*44} 0V360"/>`).join('')}</g>
<rect x="44" y="42" width="552" height="276" rx="28" fill="url(#g)" opacity=".12" stroke="#fff" stroke-opacity=".22"/>
<text x="320" y="178" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="72" font-weight="900" filter="url(#glow)">${icon}</text>
<text x="320" y="248" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif" font-size="32" font-weight="800">${safeTitle}</text>
<text x="320" y="280" text-anchor="middle" fill="#cbd5e1" font-family="system-ui,sans-serif" font-size="15" font-weight="600" letter-spacing="3">ZEROPLAY ORIGINAL</text>
</svg>`;
  fs.writeFileSync(path.join(dir, 'thumb.svg'), svg);
}
console.log(`Generated ${games.length} search-demand game runtimes and thumbnails.`);
