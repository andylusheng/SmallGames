/**
 * GameDistribution 游戏数据批量拉取脚本
 * 用法: node scripts/fetch-gd-games.js
 * 
 * 从 GD 公开 API 拉取游戏列表，转换为本站 games.json 格式
 * 输出: src/data/gd-games.json
 */

const fs = require("fs");
const path = require("path");

const BASE_URL = "https://catalog.api.gamedistribution.com/api/v1.0/rss/All";
const OUTPUT_FILE = path.join(__dirname, "../src/data/gd-games.json");
const SITE_URL = "https://playfreegames.com";
const MAX_PAGES = 5; // 每页100款，5页=500款

// GD 分类 -> 本站分类映射
const CATEGORY_MAP = {
  Action: "action",
  Adventure: "adventure",
  Arcade: "arcade",
  Boys: "action",
  Girls: "casual",
  Casual: "casual",
  Puzzle: "puzzle",
  Racing: "racing",
  Shooting: "shooting",
  Sports: "sports",
  Strategy: "strategy",
  Simulation: "strategy",
  Board: "puzzle",
  Cards: "puzzle",
  Educational: "puzzle",
  Hypercasual: "casual",
  Multiplayer: "action",
  Defense: "strategy",
  Cooking: "casual",
  DressUp: "casual",
  Kids: "casual",
  Music: "casual",
  Word: "puzzle",
  Trivia: "casual",
  Clicker: "casual",
  Idle: "casual",
  Merge: "puzzle",
  Match3: "puzzle",
  Bubble: "puzzle",
  Mahjong: "puzzle",
  Solitaire: "puzzle",
  Sudoku: "puzzle",
  Platformer: "arcade",
  Runner: "arcade",
  Fighting: "action",
  Zombie: "action",
  War: "strategy",
  Tank: "action",
  Parking: "racing",
  Truck: "racing",
  Moto: "racing",
  Bicycle: "racing",
  Boat: "racing",
  Plane: "action",
  Helicopter: "action",
  Space: "shooting",
  Sniper: "shooting",
  Gun: "shooting",
  Basketball: "sports",
  Football: "sports",
  Soccer: "sports",
  Golf: "sports",
  Tennis: "sports",
  Boxing: "sports",
  Billiard: "sports",
  Bowling: "sports",
  Fishing: "sports",
  Hunting: "sports",
};

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 60);
}

function mapCategory(categories) {
  if (!categories || categories.length === 0) return "casual";
  for (const cat of categories) {
    const mapped = CATEGORY_MAP[cat];
    if (mapped) return mapped;
  }
  return "casual";
}

async function fetchGames() {
  const allGames = [];
  const seenMd5 = new Set();

  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = page === 1 ? BASE_URL : `${BASE_URL}?page=${page}`;
    console.log(`Fetching page ${page}...`);
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`Page ${page} failed: ${response.status}, stopping.`);
      break;
    }
    const games = await response.json();
    if (!games || games.length === 0) {
      console.log(`Page ${page} empty, stopping.`);
      break;
    }
    let newCount = 0;
    for (const g of games) {
      if (!seenMd5.has(g.Md5)) {
        seenMd5.add(g.Md5);
        allGames.push(g);
        newCount++;
      }
    }
    console.log(`  Got ${games.length} games, ${newCount} new`);
    if (newCount === 0) break;
  }

  console.log(`\nTotal fetched: ${allGames.length} unique games`);
  return allGames;
}

function transformGame(gdGame, index) {
  const slug = slugify(gdGame.Title) || `gd-game-${index}`;
  const category = mapCategory(gdGame.Category);
  const thumbnail =
    gdGame.Asset && gdGame.Asset.length > 1
      ? gdGame.Asset[1] // 512x384
      : gdGame.Asset && gdGame.Asset.length > 0
        ? gdGame.Asset[0]
        : "";

  return {
    id: `gd-${gdGame.Md5}`,
    title: gdGame.Title,
    slug: slug,
    description: gdGame.Description
      ? gdGame.Description.substring(0, 200)
      : `Play ${gdGame.Title} free online. No download required.`,
    category: category,
    thumbnail: thumbnail,
    gameUrl: `${gdGame.Url}?gd_sdk_referrer_url=${SITE_URL}`,
    tags: (gdGame.Tag || []).slice(0, 5).map((t) => t.toLowerCase()),
    featured: index < 10,
    popular: index < 50,
    dateAdded: new Date(Date.now() - index * 86400000).toISOString().split("T")[0],
    plays: Math.floor(Math.random() * 500000) + 10000,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1) * 1,
    instructions: gdGame.Instructions || "Click or tap to play!",
    source: "gd",
  };
}

async function main() {
  try {
    const rawGames = await fetchGames();

    // 过滤：只保留 HTML5 游戏，去重 slug
    const seenSlugs = new Set();
    const transformed = [];

    for (let i = 0; i < rawGames.length; i++) {
      const game = rawGames[i];
      if (game.Type !== "html5") continue;

      const item = transformGame(game, transformed.length);
      if (seenSlugs.has(item.slug)) {
        item.slug = `${item.slug}-${i}`;
      }
      seenSlugs.add(item.slug);
      transformed.push(item);
    }

    // 写入文件
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(transformed, null, 2), "utf-8");
    console.log(`\nDone! Generated ${transformed.length} games`);
    console.log(`Output: ${OUTPUT_FILE}`);

    // 统计分类
    const catCount = {};
    transformed.forEach((g) => {
      catCount[g.category] = (catCount[g.category] || 0) + 1;
    });
    console.log("\nCategory breakdown:");
    Object.entries(catCount)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => console.log(`  ${cat}: ${count}`));
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

main();
