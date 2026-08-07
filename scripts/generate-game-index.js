const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const gamesPath = path.join(__dirname, "../src/data/games.json");
const profilesDir = path.join(__dirname, "../src/data/game-profiles");
const output = path.join(__dirname, "../public/games-index.json");
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

function collectProfileFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(dir, entry.name);
    if (entry.isDirectory()) return collectProfileFiles(child);
    return entry.isFile() && child.endsWith(".ts") ? [child] : [];
  });
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
        const description = en ? stringProperty(en, "metaDescription") : undefined;

        if (slug && (description || publishedAt || updatedAt)) {
          overrides.set(slug, { description, publishedAt, updatedAt });
        }
      }
      ts.forEachChild(node, visit);
    }

    visit(source);
  }

  return overrides;
}

const games = JSON.parse(fs.readFileSync(gamesPath, "utf8"));
const profileOverrides = loadProfileOverrides();

const index = games.map(({ id, title, slug, description, category, thumbnail, tags, featured, popular }) => {
  const profile = profileOverrides.get(slug);
  return {
    id,
    title,
    slug,
    description: profile?.description ?? description,
    category,
    thumbnail,
    tags,
    featured,
    popular,
    publishedAt: profile?.publishedAt ?? defaultPublishedAt,
    updatedAt: profile?.updatedAt ?? defaultUpdatedAt,
  };
});

fs.writeFileSync(output, JSON.stringify(index));
console.log(`Generated ${index.length} search index entries with ${profileOverrides.size} P2 overrides.`);
