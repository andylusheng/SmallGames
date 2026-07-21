/**
 * Enrich games.json with SEO content:
 * longDescription, features, tips, difficulty, faq
 */
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "src", "data", "games.json");
const games = JSON.parse(fs.readFileSync(file, "utf8"));

const catData = {
  arcade: {
    intro: (t) => `${t} is a fast-paced arcade game that puts your reflexes to the ultimate test. Easy to pick up but incredibly hard to master, it delivers that classic "one more try" feeling that keeps players coming back.`,
    features: ["Fast-paced arcade action with instant restarts", "Retro-inspired gameplay with modern smooth controls", "Progressive difficulty that scales as you improve", "Combo and streak systems for bonus points"],
    tips: ["Stay calm during intense moments — panic leads to mistakes", "Learn the timing patterns rather than reacting randomly", "Focus on the center of the screen for better reaction time"],
    difficulty: "Medium",
  },
  puzzle: {
    intro: (t) => `${t} is a brain-teasing puzzle game that challenges your logic and strategic thinking. Every level presents a new problem to solve, and the satisfaction of cracking each puzzle is unmatched.`,
    features: ["Mind-bending puzzles that grow progressively harder", "Clean, distraction-free interface designed for focus", "No time pressure — think through every move at your own pace", "Multiple difficulty paths and replay value"],
    tips: ["Plan several moves ahead before committing", "Work backwards from your goal when stuck", "Don't be afraid to reset and try a fresh approach"],
    difficulty: "Medium",
  },
  casual: {
    intro: (t) => `${t} is the perfect casual game for quick breaks and relaxing sessions. Simple one-touch controls make it accessible to everyone, while the satisfying gameplay loop keeps you engaged for hours.`,
    features: ["One-touch controls anyone can learn in seconds", "Perfect for short play sessions anywhere, anytime", "Satisfying feedback and cheerful visual effects", "Endless gameplay with no levels to run out of"],
    tips: ["Start slow and build your rhythm gradually", "Watch for patterns — they repeat more often than you think", "Set small personal goals to keep improving"],
    difficulty: "Easy",
  },
  sports: {
    intro: (t) => `${t} brings the excitement of sports competition right to your browser. Master the physics-based mechanics, time your moves perfectly, and compete against your own best scores.`,
    features: ["Realistic physics-based ball and movement mechanics", "Timing and precision-based scoring system", "Tournament-style progression and personal records", "Smooth animations that bring the sport to life"],
    tips: ["Master the power meter before attempting advanced shots", "Consistency beats risky plays — build your score steadily", "Study the physics angles to predict trajectories"],
    difficulty: "Medium",
  },
  shooting: {
    intro: (t) => `${t} is an action-packed shooting game with waves of enemies, power-ups, and explosive boss battles. Sharpen your aim, dodge enemy fire, and see how far you can push your score.`,
    features: ["Intense wave-based combat with escalating difficulty", "Power-up system with weapon upgrades and shields", "Epic boss fights that test your dodging skills", "Particle effects and screen-shaking explosions"],
    tips: ["Keep moving — never let enemies surround you", "Prioritize collecting power-ups over chasing kills", "Save your strongest weapons for boss encounters"],
    difficulty: "Medium",
  },
  strategy: {
    intro: (t) => `${t} is a strategic game where every decision matters. Build, plan, and outthink the challenges ahead — victory goes to those who think ahead and manage their resources wisely.`,
    features: ["Deep strategic gameplay with meaningful choices", "Resource management and upgrade systems", "Multiple viable strategies and build paths", "Enemy AI that adapts to your playstyle"],
    tips: ["Invest in economy early — it pays off exponentially", "Don't spread your defenses too thin", "Scout and adapt your strategy to each wave"],
    difficulty: "Hard",
  },
  action: {
    intro: (t) => `${t} is a high-energy action game with tight controls and thrilling combat. Jump, dodge, and fight your way through increasingly dangerous levels in this adrenaline-fueled adventure.`,
    features: ["Tight, responsive controls for precise movement", "Dynamic combat with attack and dodge mechanics", "Challenging levels with hidden shortcuts and secrets", "Boss battles that demand quick reflexes"],
    tips: ["Learn enemy attack patterns before going on the offensive", "Use the environment — positioning wins fights", "Don't mash buttons — well-timed attacks deal more damage"],
    difficulty: "Medium",
  },
  idle: {
    intro: (t) => `${t} is a satisfying idle game where your empire grows even while you relax. Make smart upgrades, unlock new systems, and watch your numbers climb to astronomical heights.`,
    features: ["Satisfying progression with ever-growing numbers", "Smart upgrade trees with meaningful choices", "Earn resources even while taking a break", "Prestige systems for long-term replayability"],
    tips: ["Reinvest your earnings quickly — compound growth is king", "Compare upgrade cost-to-benefit ratios before buying", "Unlock new income sources before maxing out old ones"],
    difficulty: "Easy",
  },
  racing: {
    intro: (t) => `${t} is a high-speed racing game that demands quick reflexes and sharp steering. Weave through traffic, hit top speeds, and chase the best lap times in this thrilling ride.`,
    features: ["High-speed gameplay with smooth 60fps performance", "Traffic and obstacle avoidance at increasing speeds", "Nitro boosts and near-miss bonus systems", "Multiple lanes, shortcuts, and track variety"],
    tips: ["Look ahead, not at your car — anticipate obstacles early", "Small steering inputs at high speed prevent crashes", "Use boost strategically on clear straightaways"],
    difficulty: "Medium",
  },
};

const genericFeatures = (g) => [
  `100% free to play — no downloads, no sign-ups, no in-app purchases`,
  `Works instantly on desktop, tablet, and mobile browsers`,
  `High score saved automatically in your browser via localStorage`,
];

const faqTemplates = (g) => [
  {
    q: `How to play ${g.title}?`,
    a: `${g.instructions} The game starts immediately in your browser — no download or registration needed. Your highest score is saved automatically so you can try to beat it every time you play.`,
  },
  {
    q: `Is ${g.title} free to play?`,
    a: `Yes! ${g.title} is completely free to play online. There are no downloads, no sign-ups, no hidden fees, and no in-app purchases. Just open the page in any modern browser and start playing instantly.`,
  },
  {
    q: `Can I play ${g.title} on mobile?`,
    a: `Absolutely. ${g.title} is built with HTML5 and fully optimized for mobile devices including iPhone, iPad, and Android phones and tablets. Touch controls are supported natively — just open it in your mobile browser and play!`,
  },
  {
    q: `What makes ${g.title} fun?`,
    a: `${g.title} combines simple, intuitive controls with deeply engaging ${g.category} gameplay. The difficulty ramps up gradually, giving you a constant sense of progression, and the high-score system gives you a reason to keep coming back and improving.`,
  },
  {
    q: `Do I need to download anything to play ${g.title}?`,
    a: `No download or installation is required. ${g.title} is a lightweight HTML5 browser game that loads in seconds. Your progress (high score) is saved locally in your browser, so it persists between visits on the same device.`,
  },
];

for (const g of games) {
  const cat = catData[g.category] || catData.casual;

  // Long description: 3 paragraphs
  const p1 = cat.intro(g.title);
  const p2 = `In ${g.title}, ${g.description.charAt(0).toLowerCase() + g.description.slice(1).replace(/\s*How long can you survive\??\s*$/, "")} Every session is different, and the ${g.category} gameplay is tuned to keep you in the zone — whether you have two minutes or two hours to spare.`;
  const p3 = `${g.title} runs entirely in your browser using HTML5 technology. It works on any device — desktop PC, laptop, tablet, or smartphone — with no downloads, plugins, or accounts required. Your best score is saved automatically, so you can challenge yourself to improve every time you play.`;
  g.longDescription = `${p1}\n${p2}\n${p3}`;

  // Features: 4 category + 3 generic
  g.features = [...cat.features, ...genericFeatures(g)];

  // Tips: 3 category + 1 game-specific
  g.tips = [...cat.tips, `Beat your personal best: ${g.instructions.split(".")[0].toLowerCase().replace(/^use /, "practice with ")}.`];

  // Difficulty
  g.difficulty = cat.difficulty;

  // FAQ
  g.faq = faqTemplates(g);
}

fs.writeFileSync(file, JSON.stringify(games, null, 2) + "\n", "utf8");
console.log(`Enriched ${games.length} games with SEO content`);
