(() => {
  const root = document.querySelector(".game-shell");
  if (!root || !window.ZP) return;

  const levelBoard = (filename, holes) => ({
    desktop: `/games/screw-sort-master/assets/levels-v1/${filename}`,
    mobile: `/games/screw-sort-master/assets/levels-v1/${filename}`,
    holes,
    mobileHoles: holes,
  });

  const boards = {
    moon: {
      desktop: "/games/screw-sort-master/assets/levels-v1/level-01-moon-star-cloud.png", mobile: "/games/screw-sort-master/assets/master-v2/playfield-mobile-v1.png",
      holes: [[32, 20, 2], [21, 43, 2], [30, 68, 2], [50, 14, 3], [42, 40, 3], [57, 39, 3], [69, 43, 1], [80, 67, 1], [54, 70, 1]],
      mobileHoles: [[25, 27, 2], [14, 49, 2], [27, 67, 2], [55, 14, 3], [45, 38, 3], [65, 38, 3], [78, 49, 1], [55, 75, 1], [86, 72, 1]],
    },
    heart: {
      desktop: "/games/screw-sort-master/assets/levels-v1/level-04-heart-mint-blue.png", mobile: "/games/screw-sort-master/assets/levels-v1/level-04-heart-mint-blue.png",
      holes: [[26, 40, 1], [34, 57, 1], [44, 65, 1], [50, 25, 3], [43, 41, 3], [59, 41, 3], [75, 40, 2], [83, 58, 2], [68, 65, 2]],
      mobileHoles: [[23, 39, 1], [32, 56, 1], [42, 64, 1], [50, 25, 3], [43, 41, 3], [59, 41, 3], [76, 40, 2], [84, 57, 2], [68, 65, 2]],
    },
    star: {
      desktop: "/games/screw-sort-master/assets/levels-v1/level-07-crescent-star-cloud.png", mobile: "/games/screw-sort-master/assets/levels-v1/level-07-crescent-star-cloud.png",
      holes: [[28, 35, 1], [27, 58, 1], [39, 75, 1], [50, 27, 3], [43, 48, 3], [57, 48, 3], [73, 51, 2], [66, 73, 2]],
      mobileHoles: [[28, 35, 1], [27, 58, 1], [39, 75, 1], [50, 27, 3], [43, 48, 3], [57, 48, 3], [73, 51, 2], [66, 73, 2]],
    },
    triangle: {
      desktop: "/games/screw-sort-master/assets/levels-v1/level-08-lavender-triangle-yellow.png", mobile: "/games/screw-sort-master/assets/levels-v1/level-08-lavender-triangle-yellow.png",
      holes: [[25, 55, 1], [40, 69, 1], [50, 28, 3], [40, 48, 3], [60, 49, 3], [74, 57, 2], [59, 71, 2], [72, 75, 2]],
      mobileHoles: [[25, 55, 1], [40, 69, 1], [50, 28, 3], [40, 48, 3], [60, 49, 3], [74, 57, 2], [59, 71, 2], [72, 75, 2]],
    },
    flower: {
      desktop: "/games/screw-sort-master/assets/master-v2/playfield-flower-v1.png", mobile: "/games/screw-sort-master/assets/master-v2/playfield-flower-v1.png",
      holes: [[39, 36, 2], [52, 15, 2], [71, 31, 2], [40, 73, 1], [62, 73, 1], [77, 59, 1], [49, 31, 3], [43, 53, 3], [57, 53, 3]],
      mobileHoles: [[25, 27, 2], [14, 49, 2], [27, 67, 2], [55, 14, 3], [45, 38, 3], [65, 38, 3], [78, 49, 1], [55, 75, 1], [86, 72, 1]],
    },
    gear: {
      desktop: "/games/screw-sort-master/assets/master-v2/playfield-gear-v1.png", mobile: "/games/screw-sort-master/assets/master-v2/playfield-gear-v1.png",
      holes: [[37, 41, 2], [49, 14, 2], [48, 61, 2], [71, 36, 1], [74, 62, 1], [57, 78, 1], [49, 32, 3], [42, 50, 3], [58, 50, 3]],
      mobileHoles: [[25, 27, 2], [14, 49, 2], [27, 67, 2], [55, 14, 3], [45, 38, 3], [65, 38, 3], [78, 49, 1], [55, 75, 1], [86, 72, 1]],
    },
    level09: levelBoard("level-09-cream-orange-blue.png", [[25, 40, 1], [25, 64, 1], [36, 73, 1], [50, 25, 3], [43, 54, 3], [57, 54, 3], [73, 46, 2], [80, 62, 2], [67, 73, 2]]),
    level10: levelBoard("level-10-gear-diamond-crescent.png", [[31, 35, 1], [26, 58, 1], [50, 41, 3], [42, 60, 3], [61, 60, 3], [75, 32, 2], [80, 53, 2], [72, 74, 2]]),
    level11: levelBoard("level-11-crescent-star-mint.png", [[24, 33, 1], [21, 57, 1], [33, 73, 1], [50, 24, 3], [43, 50, 3], [57, 50, 3], [73, 47, 2], [80, 65, 2], [62, 75, 2]]),
    level12: levelBoard("level-12-crescent-heart-blue-star.png", [[20, 45, 1], [36, 72, 1], [42, 27, 3], [58, 27, 3], [50, 46, 3], [75, 33, 2], [82, 55, 2], [62, 59, 4], [63, 75, 4]]),
    level13: levelBoard("level-13-gear-star-crescent-triangle.png", [[29, 43, 1], [20, 55, 1], [35, 56, 1], [28, 70, 1], [49, 23, 3], [53, 42, 3], [72, 24, 2], [78, 45, 2], [64, 57, 2]]),
    level14: levelBoard("level-14-aqua-star-pink-coral.png", [[30, 37, 1], [20, 56, 1], [38, 67, 1], [50, 21, 4], [43, 46, 4], [72, 23, 2], [75, 57, 3], [63, 74, 3]]),
    level15: levelBoard("level-15-coral-gear-lavender-crescent.png", [[29, 39, 1], [20, 59, 1], [33, 70, 1], [49, 36, 3], [40, 52, 3], [59, 55, 3], [72, 27, 2], [65, 76, 2], [74, 50, 4]]),
    level16: levelBoard("level-16-blue-gear-heart-crescent.png", [[23, 38, 1], [20, 57, 1], [33, 72, 1], [50, 23, 3], [62, 31, 3], [43, 49, 4], [54, 63, 4], [80, 47, 2], [64, 77, 2]]),
    level17: levelBoard("level-17-crescent-diamond-cloud.png", [[27, 31, 1], [24, 55, 1], [37, 70, 1], [50, 31, 3], [40, 49, 3], [60, 49, 3], [50, 64, 3], [69, 35, 2], [80, 59, 2]]),
    level18: levelBoard("level-18-blue-star-pink.png", [[22, 42, 1], [28, 64, 1], [50, 25, 3], [43, 51, 3], [60, 51, 3], [75, 43, 2], [80, 61, 2], [65, 73, 2]]),
    level19: levelBoard("level-19-gear-crescent-diamond.png", [[38, 34, 1], [30, 49, 1], [39, 61, 1], [61, 24, 2], [73, 41, 2], [71, 62, 2], [52, 52, 4], [45, 70, 4], [61, 70, 4]]),
    level20: levelBoard("level-20-cloud-heart-star.png", [[30, 52, 1], [39, 70, 1], [54, 67, 1], [40, 27, 3], [61, 26, 3], [50, 45, 3], [76, 39, 4], [68, 56, 4], [84, 55, 4]]),
  };
  // The host page can briefly resize an iframe when focus moves into it. Lock
  // the chosen stage for this run so a tap cannot switch a desktop game into
  // the 480px portrait shell halfway through a level.
  const layoutMobile = window.matchMedia("(max-width: 699px)").matches;
  const positionsForViewport = (board) => layoutMobile ? boards[board].mobileHoles : boards[board].holes;
  const levels = [
    { board: "moon", holes: [3, 4, 5, 0, 1, 2], colors: [1, 2], pattern: [2, 1, 2, 1, 2, 1], note: "A gentle start. Clear the star, then open the lower panels." },
    { board: "moon", holes: [0, 1, 2, 3, 4, 5, 6, 7, 8], colors: [0, 1, 3], pattern: [0, 1, 3, 1, 0, 3, 3, 1, 0], note: "Three colors. Look for the exposed route before each tap." },
    { board: "moon", holes: [6, 7, 8, 3, 4, 5, 0, 1, 2], colors: [0, 1, 3], pattern: [3, 0, 1, 1, 3, 0, 0, 1, 3], note: "Work from the open edge back toward the crescent." },
    { board: "heart", holes: [3, 4, 5, 0, 1, 2], colors: [0, 1], pattern: [0, 1, 1, 0, 1, 0], note: "A new shape set. The heart is the first layer to clear." },
    { board: "heart", holes: [0, 1, 2, 3, 4, 5, 6, 7, 8], colors: [1, 2, 4], pattern: [4, 1, 2, 2, 4, 1, 1, 2, 4], note: "Three colors and three layers. Keep each tray in sight." },
    { board: "flower", holes: [0, 1, 2, 3, 4, 5, 6, 7, 8], colors: [0, 2, 3], pattern: [3, 2, 0, 0, 3, 2, 2, 0, 3], note: "The center flower hides the next opening." },
    { board: "star", holes: [0, 1, 2, 3, 4, 5, 6, 7], colors: [0, 1, 3], pattern: [1, 3, 0, 0, 1, 3, 3, 0], note: "The blue star sets the order for this board." },
    { board: "triangle", holes: [0, 1, 2, 3, 4, 5, 6, 7], colors: [1, 2, 4, 5], pattern: [1, 2, 4, 5, 4, 1, 5, 2], note: "Four colors arrive. Plan one visible screw ahead." },
    { board: "level09", holes: [6, 7, 8, 3, 4, 5, 0, 1, 2], colors: [0, 2, 3, 4], pattern: [3, 0, 4, 2, 3, 0, 4, 2, 3], note: "Layer order matters more than speed." },
    { board: "level10", holes: [0, 1, 2, 3, 4, 5, 6, 7], colors: [0, 1, 3, 5], pattern: [5, 1, 0, 3, 5, 1, 0, 3], note: "Four trays are active. Keep the board opening cleanly." },
    { board: "level11", holes: [0, 1, 2, 3, 4, 5, 6, 7, 8], colors: [0, 1, 2, 4], pattern: [4, 1, 2, 0, 4, 1, 2, 0, 4], note: "The top star is easy; the lower route is the puzzle." },
    { board: "level12", holes: [6, 7, 8, 0, 1, 2, 3, 4, 5], colors: [0, 2, 4, 5], pattern: [5, 0, 4, 2, 5, 0, 4, 2, 5], note: "Follow the visible panels and leave no blocked route behind." },
    { board: "level13", holes: [3, 4, 5, 0, 1, 2, 6, 7, 8], colors: [0, 1, 3, 5], pattern: [3, 1, 5, 0, 3, 1, 5, 0, 3], note: "The center piece is the key to the final row." },
    { board: "level14", holes: [0, 1, 2, 6, 7, 3, 4, 5], colors: [0, 2, 3, 4], pattern: [4, 0, 3, 2, 4, 0, 3, 2], note: "Clear the flower before the low panels lock your route." },
    { board: "level15", holes: [0, 1, 2, 3, 4, 5, 6, 7, 8], colors: [0, 1, 2, 3, 4], pattern: [0, 1, 2, 3, 4, 0, 1, 2, 3], note: "Five colors. Watch the trays as the board opens." },
    { board: "level16", holes: [6, 7, 8, 0, 1, 2, 3, 4, 5], colors: [0, 1, 3, 4, 5], pattern: [4, 1, 5, 0, 3, 4, 1, 5, 0], note: "Five colors with a tight top layer. Clear patiently." },
    { board: "level17", holes: [3, 4, 5, 0, 1, 2, 6, 7, 8], colors: [0, 2, 3, 4, 5], pattern: [2, 5, 0, 3, 4, 2, 5, 0, 3], note: "The last colors are distributed across every layer." },
    { board: "level18", holes: [0, 1, 2, 3, 4, 5, 6, 7], colors: [0, 1, 2, 4, 5], pattern: [5, 1, 4, 0, 2, 5, 1, 4], note: "Use the open holes as a route map, not just a color list." },
    { board: "level19", holes: [0, 1, 2, 3, 4, 5, 6, 7, 8], colors: [0, 1, 2, 3, 4, 5], pattern: [0, 1, 2, 3, 4, 5, 0, 1, 2], note: "Six colors. Every clear changes the route beneath it." },
    { board: "level20", holes: [6, 7, 8, 0, 1, 2, 3, 4, 5], colors: [0, 1, 2, 3, 4, 5], pattern: [3, 5, 1, 0, 4, 2, 5, 1, 0], note: "Final puzzle. Stay calm and clear every last layer." },
  ];
  const colors = window.ZP.colors;
  const screwAssetNames = ["red", "yellow", "green", "blue", "purple", "orange"];
  const trayColors = [0, 1, 2, 3, 4, 5];
  const levelKey = "screw-sort-level-v2";
  const unlockedKey = "screw-sort-unlocked-v2";
  const bestKey = "screw-sort-best";
  let level = Math.min(levels.length, Math.max(1, window.ZP.store(levelKey, 1)));
  let best = window.ZP.store(bestKey, 0);
  let state;

  root.outerHTML = `
    <main class="game-shell screw-spotlight-game ${layoutMobile ? "layout-mobile" : "layout-desktop"}">
      <div class="topbar">
        <div class="brand">Screw <span>Sort Master</span></div>
        <div class="level-pill">LEVEL <span id="level">1</span><span class="level-total">/ ${levels.length}</span></div>
        <div class="top-actions">
          <button class="icon-btn" id="sound" type="button" aria-label="Toggle sound">SOUND ON</button>
          <button class="icon-btn" id="restart" type="button">RESTART</button>
        </div>
      </div>
      <div class="stats">
        <div class="stat"><small>Moves</small><b id="moves">0</b></div>
        <div class="stat"><small>Score</small><b id="score">0</b></div>
        <div class="stat"><small>Best</small><b id="best">0</b></div>
      </div>
      <section class="board-card">
        <div class="trays" id="trays"></div>
        <div class="bench" id="bench">
          <div class="plate-label">CLEAR THE TOP LAYER FIRST</div>
          <div class="combo" id="combo">COMBO ×1</div>
        </div>
        <div class="modal-wrap" id="modal">
          <div class="modal">
            <div class="clear-title">LEVEL CLEAR</div><h2>Nice work!</h2><p id="result"></p>
            <div class="modal-actions"><button class="secondary-btn" id="again" type="button">Replay</button><button class="primary-btn" id="next" type="button">Next level</button></div>
          </div>
        </div>
      </section>
      <div class="tools">
        <button class="tool-btn" id="hint" type="button"><b>HINT</b><span>SHOW AN OPEN SCREW</span></button>
        <button class="tool-btn" id="lift" type="button"><b>LIFT</b><span>REMOVE ONE BLOCKER</span></button>
        <button class="tool-btn" id="mix" type="button"><b>MIX</b><span>REFRESH THE COLORS</span></button>
      </div>
      <div class="game-caption" id="caption">No timer. Take your time and enjoy the clear.</div>
    </main>`;

  const style = document.createElement("style");
  style.textContent = `
    .screw-spotlight-game .icon-btn{width:auto;min-width:64px;padding:0 10px;font-size:9px;font-weight:950;letter-spacing:.3px}
    .screw-spotlight-game .tool-btn b{font-size:11px;letter-spacing:.7px}.screw-spotlight-game .tool-btn span{font-size:7px}
    .screw-spotlight-game .screw.is-hint{outline:4px solid #fff2a1;outline-offset:3px;filter:brightness(1.18);animation:hintPulse .6s ease-in-out infinite alternate}
    @keyframes hintPulse{to{transform:scale(1.1)}}
    .screw-spotlight-game .board-card{background:linear-gradient(180deg,#1b3b61,#102640);border-color:#4b7599}
    .screw-spotlight-game .bench{height:385px;border:0;border-radius:22px;background:url('/games/screw-sort-master/assets/master-v2/playfield-board.png') center/cover no-repeat;box-shadow:0 15px 30px #030b1455;isolation:isolate}
    .screw-spotlight-game .bench:before{display:none}
    .screw-spotlight-game .trays{position:relative;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));isolation:isolate}
    .screw-spotlight-game .tray{height:auto;aspect-ratio:357 / 309;border:0;border-radius:0;background:none;box-shadow:none;padding:0;overflow:visible;pointer-events:none}
    .screw-spotlight-game .tray-art{position:absolute;inset:0;z-index:1;width:100%;height:100%;object-fit:contain;pointer-events:none}
    .screw-spotlight-game .tray-fill{position:absolute;inset:0;z-index:2}
    .screw-spotlight-game .tray-screw{position:absolute;top:28%;width:23%;height:auto;filter:drop-shadow(0 2px 2px #35200b66)}
    .screw-spotlight-game .tray-screw-0{left:11%}.screw-spotlight-game .tray-screw-1{left:38.5%}.screw-spotlight-game .tray-screw-2{left:66%}
    .screw-spotlight-game .tray b{position:absolute;z-index:3;left:50%;bottom:3%;transform:translateX(-50%);font-size:8px;color:#29415b;text-shadow:0 1px #fff}
    .screw-spotlight-game .tray.is-complete .tray-art{animation:trayClear .42s cubic-bezier(.2,1.4,.45,1) both;filter:drop-shadow(0 0 10px #fff1a5)}
    @keyframes trayClear{50%{transform:translateY(-5px) scale(1.08)}100%{transform:translateY(0) scale(1)}}
    .screw-spotlight-game .tray-flyer{position:absolute;z-index:1000;width:54px;height:54px;pointer-events:none;object-fit:contain;transform:translate(-50%,-50%) rotate(0deg) scale(1);transition:left .46s cubic-bezier(.16,.82,.23,1),top .46s cubic-bezier(.16,.82,.23,1),transform .46s cubic-bezier(.16,.82,.23,1),opacity .46s ease;filter:drop-shadow(0 7px 6px #1b12088c)}
    .screw-spotlight-game .screw{width:80px;height:80px;border:0;border-radius:0;background:transparent;box-shadow:none;filter:none;padding:0;overflow:visible;transition:filter .15s,transform .15s}
    .screw-spotlight-game .screw:before,.screw-spotlight-game .screw:after{display:none}
    .screw-spotlight-game .screw-art{display:block;width:100%;height:100%;overflow:visible;pointer-events:none}
    .screw-spotlight-game .screw.blocked{filter:saturate(.7) brightness(.72)}
    .screw-spotlight-game .screw:not(.blocked):hover{filter:brightness(1.08);transform:translateY(-2px) scale(1.04)}
    .screw-spotlight-game .screw.out{animation:toyScrewOut .48s ease forwards}
    @keyframes toyScrewOut{25%{transform:rotate(110deg) translateY(-8px)}70%{transform:rotate(270deg) translateY(-62px) scale(.74)}100%{transform:rotate(405deg) translateY(-130px) scale(.18);opacity:0}}
    .screw-spotlight-game .plate-label{background:#fff7dcdb;color:#785633;border-color:#dab67d;box-shadow:0 3px 10px #59381726}
    .screw-spotlight-game.layout-mobile{height:100svh;min-height:0;overflow:hidden;padding:7px;gap:6px}
    .screw-spotlight-game.layout-mobile .topbar{grid-template-columns:minmax(0,1fr) auto auto;gap:4px}
    .screw-spotlight-game.layout-mobile .brand{font-size:18px;letter-spacing:-.7px;overflow:hidden;text-overflow:clip}
    .screw-spotlight-game.layout-mobile .level-pill{padding:6px 8px;font-size:8px}
    .screw-spotlight-game.layout-mobile #sound{display:none}
    .screw-spotlight-game.layout-mobile #restart{min-width:34px;width:34px;height:32px;padding:0;font-size:0}
    .screw-spotlight-game.layout-mobile #restart::after{content:'↻';font-size:17px}
    .screw-spotlight-game.layout-mobile .stats{gap:4px}
    .screw-spotlight-game.layout-mobile .stat{padding:5px 2px}
    .screw-spotlight-game.layout-mobile .board-card{min-height:0;flex:none;padding:8px}
    .screw-spotlight-game.layout-mobile .trays{gap:0;margin-bottom:6px;width:100%}
    .screw-spotlight-game.layout-mobile .tray b{font-size:7px}
    .screw-spotlight-game.layout-mobile .bench{height:480px;border-radius:16px;background-color:#925728;background-position:center;background-repeat:no-repeat;background-size:contain}
    .screw-spotlight-game.layout-mobile .screw{width:60px;height:60px;margin-left:10px;margin-top:10px}
    .screw-spotlight-game.layout-mobile .bench.is-landscape-board{height:auto;min-height:0;aspect-ratio:1672 / 941;background-size:100% 100%}
    .screw-spotlight-game.layout-mobile .bench.is-landscape-board .screw{width:clamp(38px,12vw,48px);height:clamp(38px,12vw,48px);margin:0}
    .screw-spotlight-game.layout-mobile .board-card.has-landscape-board{flex:1;display:flex;min-height:0;flex-direction:column;justify-content:center}
    .screw-spotlight-game.layout-mobile .board-card.has-landscape-board:before{content:"";position:absolute;z-index:0;inset:-24px;background:linear-gradient(#07182fb8,#07182fc4),var(--board-art) center/cover no-repeat;filter:blur(16px) saturate(.9);opacity:.72;transform:scale(1.08)}
    .screw-spotlight-game.layout-mobile .board-card.has-landscape-board .trays,.screw-spotlight-game.layout-mobile .board-card.has-landscape-board .bench{position:relative;z-index:1}
    .screw-spotlight-game.layout-mobile .tools{gap:5px}
    .screw-spotlight-game.layout-mobile .tool-btn{padding:7px 2px}
    .screw-spotlight-game.layout-mobile .tool-btn b{font-size:10px}
    .screw-spotlight-game.layout-mobile .tool-btn span{font-size:6px;letter-spacing:0}
    .screw-spotlight-game.layout-mobile .game-caption{padding:0;font-size:8px}
    .screw-spotlight-game.layout-desktop{width:100%;max-width:none;height:100svh;min-height:0;overflow:hidden;padding:10px 16px;gap:6px}
    .screw-spotlight-game.layout-desktop .topbar{min-height:32px}
    .screw-spotlight-game.layout-desktop .brand{font-size:26px}
    .screw-spotlight-game.layout-desktop .level-pill{padding:6px 10px;font-size:9px}
    .screw-spotlight-game.layout-desktop .icon-btn{height:32px;min-width:58px;padding:0 8px;font-size:8px}
    .screw-spotlight-game.layout-desktop .stats{max-width:480px;gap:8px}
    .screw-spotlight-game.layout-desktop .stat{padding:5px 6px}
    .screw-spotlight-game.layout-desktop .stat b{font-size:16px}
    .screw-spotlight-game.layout-desktop .board-card{min-height:0;flex:1;display:flex;flex-direction:column;justify-content:center;padding:10px}
    .screw-spotlight-game.layout-desktop .trays{max-width:700px;gap:0;margin:0 auto 4px}
    .screw-spotlight-game.layout-desktop .tray{height:86px}
    .screw-spotlight-game.layout-desktop .tray b{font-size:7px}
    .screw-spotlight-game.layout-desktop .bench{width:auto;max-width:100%;height:min(540px,calc(100svh - 300px));margin:0 auto;aspect-ratio:1680 / 943;flex:0 0 auto}
    .screw-spotlight-game.layout-desktop .screw{width:72px;height:72px;margin-left:4px;margin-top:4px}
    .screw-spotlight-game.layout-desktop .tools{max-width:600px;margin:0 auto;width:100%;gap:6px}
    .screw-spotlight-game.layout-desktop .tool-btn{padding:6px 4px}
    .screw-spotlight-game.layout-desktop .tool-btn b{font-size:10px}
    .screw-spotlight-game.layout-desktop .tool-btn span{font-size:6px}
    .screw-spotlight-game.layout-desktop .game-caption{display:none}
  `;
  document.head.append(style);

  const $ = (id) => document.getElementById(id);
  const gameRoot = document.querySelector(".screw-spotlight-game");
  const levelFor = () => levels[level - 1];
  const blockers = (screw) => state.screws.filter((other) => !other.gone && other.z > screw.z && Math.hypot(other.x - screw.x, other.y - screw.y) < 23);
  const trayIndex = (color) => state.activeColors.indexOf(color);

  function updateTools() {
    $("hint").querySelector("span").textContent = state.hints ? `SHOW AN OPEN SCREW · ${state.hints}` : "USED THIS LEVEL";
    $("lift").querySelector("span").textContent = state.lifts ? `REMOVE ONE BLOCKER · ${state.lifts}` : "USED THIS LEVEL";
    $("mix").querySelector("span").textContent = state.mixes ? `REFRESH THE COLORS · ${state.mixes}` : "USED THIS LEVEL";
    const uses = { hint: state.hints, lift: state.lifts, mix: state.mixes };
    Object.entries(uses).forEach(([id, count]) => $(id).toggleAttribute("disabled", count === 0));
  }

  function render() {
    const trays = $("trays");
    trays.style.gridTemplateColumns = `repeat(${trayColors.length}, minmax(0, 1fr))`;
    trays.innerHTML = trayColors.map((color) => {
      const index = state.activeColors.indexOf(color);
      const count = index === -1 ? 0 : state.counts[index];
      const capacity = index === -1 ? 0 : state.capacities[index];
      const filledSlots = Array.from({ length: count }, (_, slot) => `<img class="tray-screw tray-screw-${slot}" src="/games/screw-sort-master/assets/master-v2/screw-${screwAssetNames[color]}.png" alt="">`).join("");
      return `<div class="tray${index === -1 ? " is-idle" : ""}${capacity && count === capacity ? " is-complete" : ""}" data-color="${color}" style="--c:${colors[color]}"><img class="tray-art" src="/games/screw-sort-master/assets/master-v2/tray-${screwAssetNames[color]}-v1.png" alt=""><div class="tray-fill">${filledSlots}</div><b>${capacity ? `${count}/${capacity}` : ""}</b></div>`;
    }).join("");
    const bench = $("bench");
    bench.querySelectorAll(".screw").forEach((element) => element.remove());
    state.screws.filter((screw) => !screw.gone).forEach((screw) => {
      const element = document.createElement("button");
      element.type = "button";
      element.className = `screw${blockers(screw).length ? " blocked" : ""}`;
      element.style.cssText = `--c:${colors[screw.color]};left:calc(${screw.x}% - 40px);top:calc(${screw.y}% - 40px);z-index:${8 + screw.z * 4}`;
      element.dataset.screwId = String(screw.id);
      element.setAttribute("aria-label", blockers(screw).length ? "Covered screw" : "Remove exposed screw");
      element.innerHTML = `<img class="screw-art" src="/games/screw-sort-master/assets/master-v2/screw-${screwAssetNames[screw.color]}.png" alt="">`;
      element.addEventListener("click", () => removeScrew(screw, element));
      bench.append(element);
    });
    $("moves").textContent = state.moves;
    $("score").textContent = state.score;
    $("combo").textContent = `COMBO ×${state.combo}`;
    $("caption").textContent = levelFor().note;
    updateTools();
  }

  function flyToTray(element, color, slotIndex) {
    const tray = document.querySelector(`.tray[data-color="${color}"]`);
    if (!tray || !gameRoot) return;
    const source = element.getBoundingClientRect();
    const target = tray.getBoundingClientRect();
    const stage = gameRoot.getBoundingClientRect();
    const slotFractions = [.22, .5, .78];
    const flyer = document.createElement("img");
    flyer.className = "tray-flyer";
    flyer.src = `/games/screw-sort-master/assets/master-v2/screw-${screwAssetNames[color]}.png`;
    flyer.alt = "";
    flyer.setAttribute("aria-hidden", "true");
    flyer.style.left = `${source.left - stage.left + source.width / 2}px`;
    flyer.style.top = `${source.top - stage.top + source.height / 2}px`;
    gameRoot.append(flyer);
    requestAnimationFrame(() => {
      flyer.style.left = `${target.left - stage.left + target.width * slotFractions[slotIndex]}px`;
      flyer.style.top = `${target.top - stage.top + target.height * .46}px`;
      flyer.style.transform = "translate(-50%,-50%) rotate(300deg) scale(.35)";
      flyer.style.opacity = ".2";
    });
    window.setTimeout(() => flyer.remove(), 520);
  }

  function removeScrew(screw, element, force = false) {
    if (state.busy || screw.gone) return;
    if (blockers(screw).length && !force) {
      window.ZP.sfx("bad");
      element.classList.add("shake");
      window.setTimeout(() => element.classList.remove("shake"), 260);
      window.ZP.toast("Clear the screw above this one first");
      return;
    }
    state.busy = true;
    screw.gone = true;
    state.moves += 1;
    state.combo = state.lastColor === screw.color ? Math.min(8, state.combo + 1) : 1;
    state.lastColor = screw.color;
    const targetTray = trayIndex(screw.color);
    const targetSlot = state.counts[targetTray];
    state.counts[targetTray] += 1;
    state.score += 80 + state.combo * 20;
    element.classList.add("out");
    flyToTray(element, screw.color, targetSlot);
    window.ZP.sfx(state.combo >= 3 ? "clear" : "good");
    window.ZP.vibrate();
    window.setTimeout(() => {
      state.busy = false;
      render();
      if (state.screws.every((item) => item.gone)) win();
    }, 480);
  }

  function win() {
    if (state.score > best) {
      best = state.score;
      window.ZP.save(bestKey, best);
      $("best").textContent = best;
    }
    const nextUnlocked = Math.min(levels.length, level + 1);
    window.ZP.save(unlockedKey, Math.max(window.ZP.store(unlockedKey, 1), nextUnlocked));
    window.ZP.save(levelKey, level);
    window.ZP.sfx("win");
    window.ZP.confetti();
    const finalPuzzle = level === levels.length;
    $("modal").querySelector("h2").textContent = finalPuzzle ? "Collection clear!" : "Nice work!";
    $("result").textContent = finalPuzzle ? `${state.moves} moves · ${state.score} points · all ${levels.length} puzzles complete` : `${state.moves} moves · ${state.score} points · puzzle ${level + 1} is ready`;
    $("next").textContent = finalPuzzle ? "Play again" : "Next puzzle";
    $("modal").classList.add("show");
    window.ZP.emit("game_end", { game: "screw-sort-master", result: "win", level, moves: state.moves, score: state.score });
  }

  function build() {
    const puzzle = levelFor();
    const board = boards[puzzle.board];
    const layoutPositions = positionsForViewport(puzzle.board);
    const puzzleHoles = puzzle.holes.map((index) => layoutPositions[index]);
    const bench = $("bench");
    const boardArt = layoutMobile ? board.mobile : board.desktop;
    const isLandscapeBoard = layoutMobile && board.mobile === board.desktop;
    bench.style.backgroundImage = `url("${boardArt}")`;
    bench.classList.toggle("is-landscape-board", isLandscapeBoard);
    const boardCard = bench.closest(".board-card");
    boardCard?.classList.toggle("has-landscape-board", isLandscapeBoard);
    if (isLandscapeBoard) boardCard?.style.setProperty("--board-art", `url("${boardArt}")`);
    else boardCard?.style.removeProperty("--board-art");
    state = {
      activeColors: puzzle.colors,
      screws: puzzle.pattern.map((color, index) => ({ id: index, x: puzzleHoles[index][0], y: puzzleHoles[index][1], z: puzzleHoles[index][2], color, gone: false })),
      counts: Array(puzzle.colors.length).fill(0), capacities: puzzle.colors.map((color) => puzzle.pattern.filter((item) => item === color).length), moves: 0, score: 0, lastColor: -1, combo: 1, hints: 2, lifts: 1, mixes: 1, busy: false, layoutMobile,
    };
    $("level").textContent = level;
    $("best").textContent = best;
    $("modal").classList.remove("show");
    render();
    window.ZP.emit("game_start", { game: "screw-sort-master", level });
  }

  $("hint").addEventListener("click", () => {
    const target = state.screws.find((screw) => !screw.gone && blockers(screw).length === 0);
    if (!target || !state.hints) return;
    state.hints -= 1;
    render();
    const targetElement = document.querySelector(`.screw[data-screw-id="${target.id}"]`);
    targetElement?.classList.add("is-hint");
    window.ZP.sfx("tap");
    window.setTimeout(() => targetElement?.classList.remove("is-hint"), 1100);
  });
  $("lift").addEventListener("click", () => {
    if (!state.lifts) return;
    const target = state.screws.find((screw) => !screw.gone && blockers(screw).length > 0);
    if (!target) return window.ZP.toast("Everything open is already ready to remove");
    state.lifts -= 1;
    const targetElement = document.querySelector(`.screw[data-screw-id="${target.id}"]`);
    if (targetElement) removeScrew(target, targetElement, true);
  });
  $("mix").addEventListener("click", () => {
    if (!state.mixes) return;
    state.mixes -= 1;
    const remaining = state.screws.filter((screw) => !screw.gone);
    const colorsToMix = remaining.map((screw) => screw.color).sort(() => Math.random() - 0.5);
    remaining.forEach((screw, index) => { screw.color = colorsToMix[index]; });
    state.lastColor = -1;
    window.ZP.sfx("tap");
    render();
  });
  $("restart").addEventListener("click", build);
  $("again").addEventListener("click", build);
  $("next").addEventListener("click", () => {
    level = level === levels.length ? 1 : level + 1;
    window.ZP.save(levelKey, level);
    build();
  });
  $("sound").addEventListener("click", () => { $("sound").textContent = window.ZP.toggleAudio() ? "SOUND ON" : "SOUND OFF"; });
  build();
})();
