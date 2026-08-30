const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const gamesPath = path.join(__dirname, "../src/data/games.json");
const searchTop20GamesPath = path.join(__dirname, "../src/data/games-search-top20.json");
const colorPuzzleGamesPath = path.join(__dirname, "../src/data/games-color-puzzle.json");
const profilesDir = path.join(__dirname, "../src/data/game-profiles");
const zhTwConvertPath = path.join(__dirname, "../src/data/zh-tw/convert.ts");
const output = path.join(__dirname, "../public/games-index.json");
const zhOutput = path.join(__dirname, "../public/games-index-zh.json");
const zhTwOutput = path.join(__dirname, "../public/games-index-zh-tw.json");
const defaultPublishedAt = "2026-07-21";
const defaultUpdatedAt = "2026-07-21";

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  return undefined;
}

function findProperty(objectLiteral, name) {
  return objectLiteral.properties.find(
    (property) => ts.isPropertyAssignment(property) && propertyName(property.name) === name,
  );
}

function stringProperty(objectLiteral, name) {
  const property = findProperty(objectLiteral, name);
  if (!property || !ts.isPropertyAssignment(property) || !ts.isStringLiteral(property.initializer)) return undefined;
  return property.initializer.text;
}

function objectProperty(objectLiteral, name) {
  const property = findProperty(objectLiteral, name);
  if (!property || !ts.isPropertyAssignment(property) || !ts.isObjectLiteralExpression(property.initializer)) return undefined;
  return property.initializer;
}

function pairProperty(objectLiteral, name) {
  const property = findProperty(objectLiteral, name);
  if (!property || !ts.isPropertyAssignment(property) || !ts.isCallExpression(property.initializer)) return undefined;
  const call = property.initializer;
  if (!ts.isIdentifier(call.expression) || call.expression.text !== "pair" || call.arguments.length < 2) return undefined;
  const [en, zh] = call.arguments;
  if (!ts.isStringLiteral(en) || !ts.isStringLiteral(zh)) return undefined;
  return { en: en.text, zh: zh.text };
}

function collectProfileFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectProfileFiles(child);
    return entry.isFile() && child.endsWith(".ts") ? [child] : [];
  });
}

function mergeOverride(overrides, slug, patch) {
  if (!slug) return;
  overrides.set(slug, { ...(overrides.get(slug) || {}), ...patch });
}

function loadProfileOverrides() {
  const overrides = new Map();

  for (const file of collectProfileFiles(profilesDir)) {
    const text = fs.readFileSync(file, "utf8");
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

    function visit(node) {
      if (ts.isObjectLiteralExpression(node)) {
        const slug = stringProperty(node, "slug");
        const publishedAt = stringProperty(node, "publishedAt");
        const updatedAt = stringProperty(node, "updatedAt");
        const content = objectProperty(node, "content");
        const en = content ? objectProperty(content, "en") : undefined;
        const zh = content ? objectProperty(content, "zh") : undefined;
        const enDescription = en ? stringProperty(en, "metaDescription") : undefined;
        const zhDescription = zh ? stringProperty(zh, "metaDescription") : undefined;

        if (slug && (enDescription || zhDescription || publishedAt || updatedAt)) {
          mergeOverride(overrides, slug, { enDescription, zhDescription, publishedAt, updatedAt });
        }
      }

      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "catalogProfile" &&
        node.arguments.length > 0 &&
        ts.isObjectLiteralExpression(node.arguments[0])
      ) {
        const seed = node.arguments[0];
        const slug = stringProperty(seed, "slug");
        const zhTitle = stringProperty(seed, "zhTitle");
        const metaDescription = objectProperty(seed, "metaDescription");
        const enDescription = metaDescription ? stringProperty(metaDescription, "en") : undefined;
        const zhDescription = metaDescription ? stringProperty(metaDescription, "zh") : undefined;
        mergeOverride(overrides, slug, { enDescription, zhDescription, zhTitle });
      }

      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "demandProfile" &&
        node.arguments.length > 0 &&
        ts.isObjectLiteralExpression(node.arguments[0])
      ) {
        const seed = node.arguments[0];
        const slug = stringProperty(seed, "slug");
        const title = stringProperty(seed, "title");
        const zhTitle = stringProperty(seed, "zhTitle");
        const objective = pairProperty(seed, "objective");
        const enDescription = objective && title
          ? `${objective.en} Play ${title} free in your browser with clear controls and instant restart.`
          : undefined;
        const zhDescription = objective && zhTitle
          ? `${objective.zh} 直接在浏览器免费游玩${zhTitle}，操作清晰，可随时重新开始。`
          : undefined;
        mergeOverride(overrides, slug, { enDescription, zhDescription, zhTitle });
      }

      ts.forEachChild(node, visit);
    }

    visit(source);
  }

  return overrides;
}

function loadZhTwConverter() {
  const sourceText = fs.readFileSync(zhTwConvertPath, "utf8");
  const source = ts.createSourceFile(zhTwConvertPath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let simplified = "";
  let traditional = "";
  const overrides = [];

  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      if (node.name.text === "SIMPLIFIED" && node.initializer && ts.isStringLiteral(node.initializer)) {
        simplified = node.initializer.text;
      }
      if (node.name.text === "TRADITIONAL" && node.initializer && ts.isStringLiteral(node.initializer)) {
        traditional = node.initializer.text;
      }
      if (node.name.text === "PHRASE_OVERRIDES" && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
        for (const entry of node.initializer.elements) {
          if (
            ts.isArrayLiteralExpression(entry) &&
            entry.elements.length === 2 &&
            ts.isStringLiteral(entry.elements[0]) &&
            ts.isStringLiteral(entry.elements[1])
          ) {
            overrides.push([entry.elements[0].text, entry.elements[1].text]);
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);

  const traditionalChars = Array.from(traditional);
  const charMap = new Map(Array.from(simplified).map((char, index) => [char, traditionalChars[index]]));
  return (input) => {
    let result = input || "";
    for (const [from, to] of overrides) result = result.split(from).join(to);
    return Array.from(result).map((char) => charMap.get(char) ?? char).join("");
  };
}

const games = [
  ...JSON.parse(fs.readFileSync(colorPuzzleGamesPath, "utf8")),
  ...JSON.parse(fs.readFileSync(gamesPath, "utf8")),
  ...JSON.parse(fs.readFileSync(searchTop20GamesPath, "utf8")),
];
const profileOverrides = loadProfileOverrides();
const toZhTw = loadZhTwConverter();
const effectiveDates = (game, profile) => {
  const publishedAt = game.dateAdded ?? profile?.publishedAt ?? defaultPublishedAt;
  const updatedAt = [game.dateAdded, profile?.updatedAt, defaultUpdatedAt].filter(Boolean).sort().at(-1) ?? defaultUpdatedAt;
  return { publishedAt, updatedAt };
};

const index = games.map(({ id, title, slug, description, category, thumbnail, tags, featured, popular, dateAdded }) => {
  const profile = profileOverrides.get(slug);
  const dates = effectiveDates({ dateAdded }, profile);
  return {
    id,
    title,
    slug,
    description: profile?.enDescription ?? description,
    category,
    thumbnail,
    tags,
    featured,
    popular,
    ...dates,
  };
});

const zhIndex = games.map(({ id, title, slug, description, category, thumbnail, tags, featured, popular, dateAdded }) => {
  const profile = profileOverrides.get(slug);
  const dates = effectiveDates({ dateAdded }, profile);
  return {
    id,
    title: profile?.zhTitle ?? title,
    slug,
    description: profile?.zhDescription ?? description,
    category,
    thumbnail,
    tags,
    featured,
    popular,
    ...dates,
  };
});

const zhTwIndex = games.map(({ id, title, slug, description, category, thumbnail, tags, featured, popular, dateAdded }) => {
  const profile = profileOverrides.get(slug);
  const dates = effectiveDates({ dateAdded }, profile);
  return {
    id,
    title: profile?.zhTitle ? toZhTw(profile.zhTitle) : title,
    slug,
    description: toZhTw(profile?.zhDescription ?? description),
    category,
    thumbnail,
    tags,
    featured,
    popular,
    ...dates,
  };
});

fs.writeFileSync(output, JSON.stringify(index));
fs.writeFileSync(zhOutput, JSON.stringify(zhIndex));
fs.writeFileSync(zhTwOutput, JSON.stringify(zhTwIndex));
console.log(`Generated ${index.length} English search entries with ${profileOverrides.size} profile overrides.`);
console.log(`Generated ${zhIndex.length} Simplified Chinese search entries.`);
console.log(`Generated ${zhTwIndex.length} Traditional Chinese search entries.`);
