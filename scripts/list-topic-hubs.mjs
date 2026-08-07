import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const sourcePaths = ["src/data/topic-seo.ts"];
const topicDir = "src/data/topic-seo";
if (fs.existsSync(topicDir)) {
  for (const name of fs.readdirSync(topicDir)) {
    if (name.endsWith(".ts")) sourcePaths.push(path.join(topicDir, name));
  }
}

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return node.text;
  return undefined;
}

function findProperty(objectLiteral, name) {
  return objectLiteral.properties.find(
    (property) => ts.isPropertyAssignment(property) && propertyName(property.name) === name,
  );
}

const hubs = [];

for (const sourcePath of sourcePaths) {
  const sourceText = fs.readFileSync(sourcePath, "utf8");
  const sourceFile = ts.createSourceFile(sourcePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const keyProp = findProperty(node, "key");
      const pathProp = findProperty(node, "path");
      if (
        keyProp && pathProp &&
        ts.isPropertyAssignment(keyProp) && ts.isStringLiteral(keyProp.initializer) &&
        ts.isPropertyAssignment(pathProp) && ts.isStringLiteral(pathProp.initializer)
      ) {
        hubs.push({ key: keyProp.initializer.text, path: pathProp.initializer.text });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

const unique = [...new Map(hubs.map((hub) => [hub.key, hub])).values()].sort((a, b) => a.key.localeCompare(b.key));
if (unique.length === 0) throw new Error("No topic hubs found for Visual SEO QA");

if (process.argv.includes("--json")) {
  process.stdout.write(`${JSON.stringify(unique)}\n`);
} else {
  for (const hub of unique) process.stdout.write(`${hub.key}\t${hub.path}\n`);
}
