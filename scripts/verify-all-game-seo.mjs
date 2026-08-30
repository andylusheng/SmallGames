import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const baseInventory = JSON.parse(fs.readFileSync("src/data/games.json", "utf8"));
const searchTop20Inventory = JSON.parse(fs.readFileSync("src/data/games-search-top20.json", "utf8"));
const colorPuzzleInventory = JSON.parse(fs.readFileSync("src/data/games-color-puzzle.json", "utf8"));
const inventory = [...baseInventory, ...searchTop20Inventory, ...colorPuzzleInventory];
const EXPECTED_PRODUCTION_GAMES = 121;
const inventorySlugs = new Set(inventory.map((game) => game.slug));
const inventoryIds = new Set(inventory.map((game) => game.id));
const profileRoots = ["src/data/game-profiles.ts", "src/data/game-profiles"];
const factories = new Set(["reviewedProfile", "optimizedProfile", "catalogProfile", "demandProfile"]);
const sourceStatuses = new Set(["reviewed", "optimized"]);

function files(target) {
  if (!fs.existsSync(target)) return [];
  const stat = fs.statSync(target);
  if (stat.isFile()) return target.endsWith(".ts") ? [target] : [];
  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(target, entry.name);
    return entry.isDirectory() ? files(child) : entry.isFile() && child.endsWith(".ts") ? [child] : [];
  });
}
function propName(node) {
  return ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : undefined;
}
function findProp(obj, name) {
  return obj.properties.find((p) => ts.isPropertyAssignment(p) && propName(p.name) === name);
}
function slugFrom(obj) {
  const p = findProp(obj, "slug");
  return p && ts.isPropertyAssignment(p) && ts.isStringLiteral(p.initializer) ? p.initializer.text : undefined;
}

const found = new Set();
for (const sourcePath of [...new Set(profileRoots.flatMap(files))]) {
  const source = ts.createSourceFile(sourcePath, fs.readFileSync(sourcePath, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const slug = slugFrom(node);
      const status = findProp(node, "seoStatus");
      if (
        slug && status && ts.isPropertyAssignment(status) &&
        ts.isStringLiteral(status.initializer) && sourceStatuses.has(status.initializer.text)
      ) found.add(slug);
    }
    if (
      ts.isCallExpression(node) && ts.isIdentifier(node.expression) &&
      factories.has(node.expression.text) && node.arguments[0] &&
      ts.isObjectLiteralExpression(node.arguments[0])
    ) {
      const slug = slugFrom(node.arguments[0]);
      if (slug) found.add(slug);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}

const missing = [...inventorySlugs].filter((slug) => !found.has(slug));
const extra = [...found].filter((slug) => !inventorySlugs.has(slug));
const missingAssets = inventory.flatMap((game) => {
  const targets = [
    ["runtime", path.join("public", game.gameUrl.replace(/^\//, ""))],
    ["thumbnail", path.join("public", game.thumbnail.replace(/^\//, ""))],
  ];
  return targets.filter(([, target]) => !fs.existsSync(target)).map(([kind, target]) => `${game.slug}: missing ${kind} ${target}`);
});
const duplicateSlugs = inventory.length !== inventorySlugs.size;
const duplicateIds = inventory.length !== inventoryIds.size;

if (
  inventory.length !== EXPECTED_PRODUCTION_GAMES ||
  found.size !== EXPECTED_PRODUCTION_GAMES ||
  missing.length || extra.length || missingAssets.length || duplicateSlugs || duplicateIds
) {
  throw new Error([
    `Production SEO verification failed: inventory=${inventory.length}, profiles=${found.size}, expected=${EXPECTED_PRODUCTION_GAMES}`,
    duplicateSlugs ? "duplicate game slugs detected" : "",
    duplicateIds ? "duplicate game ids detected" : "",
    missing.length ? `missing profiles: ${missing.join(", ")}` : "",
    extra.length ? `extra profiles: ${extra.join(", ")}` : "",
    ...missingAssets,
  ].filter(Boolean).join("\n"));
}
console.log(`SEO verification passed: ${found.size}/${inventory.length} production games have source-grounded profiles and runtime assets.`);
