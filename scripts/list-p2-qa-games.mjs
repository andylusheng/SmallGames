import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const roots = ["src/data/game-profiles.ts", "src/data/game-profiles"];
const qaStatuses = new Set(["reviewed", "optimized"]);

function collectTypeScriptFiles(target) {
  if (!fs.existsSync(target)) return [];
  const stat = fs.statSync(target);
  if (stat.isFile()) return target.endsWith(".ts") ? [target] : [];

  return fs.readdirSync(target, { withFileTypes: true }).flatMap((entry) => {
    const child = path.join(target, entry.name);
    if (entry.isDirectory()) return collectTypeScriptFiles(child);
    return entry.isFile() && child.endsWith(".ts") ? [child] : [];
  });
}

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
    return node.text;
  }
  return undefined;
}

function findProperty(objectLiteral, name) {
  return objectLiteral.properties.find(
    (property) => ts.isPropertyAssignment(property) && propertyName(property.name) === name,
  );
}

const candidates = new Set();
const sourceFiles = [...new Set(roots.flatMap(collectTypeScriptFiles))];

for (const sourcePath of sourceFiles) {
  const sourceText = fs.readFileSync(sourcePath, "utf8");
  const sourceFile = ts.createSourceFile(
    sourcePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const slugProperty = findProperty(node, "slug");
      const statusProperty = findProperty(node, "seoStatus");

      if (
        slugProperty &&
        statusProperty &&
        ts.isPropertyAssignment(slugProperty) &&
        ts.isPropertyAssignment(statusProperty) &&
        ts.isStringLiteral(slugProperty.initializer) &&
        ts.isStringLiteral(statusProperty.initializer) &&
        qaStatuses.has(statusProperty.initializer.text)
      ) {
        candidates.add(slugProperty.initializer.text);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

const result = [...candidates].sort();

if (result.length === 0) {
  throw new Error("No reviewed or optimized games found for P2 Visual SEO QA");
}

if (process.argv.includes("--json")) {
  process.stdout.write(`${JSON.stringify(result)}\n`);
} else {
  process.stdout.write(`${result.join("\n")}\n`);
}
