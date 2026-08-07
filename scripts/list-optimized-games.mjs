import fs from "node:fs";
import ts from "typescript";

const sourcePath = "src/data/game-profiles.ts";
const sourceText = fs.readFileSync(sourcePath, "utf8");
const sourceFile = ts.createSourceFile(
  sourcePath,
  sourceText,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node)) {
    return node.text;
  }
  return undefined;
}

function findProperty(objectLiteral, name) {
  return objectLiteral.properties.find(
    (property) =>
      ts.isPropertyAssignment(property) && propertyName(property.name) === name,
  );
}

let profilesObject;

for (const statement of sourceFile.statements) {
  if (!ts.isVariableStatement(statement)) continue;

  for (const declaration of statement.declarationList.declarations) {
    if (
      ts.isIdentifier(declaration.name) &&
      declaration.name.text === "GAME_PROFILES" &&
      declaration.initializer &&
      ts.isObjectLiteralExpression(declaration.initializer)
    ) {
      profilesObject = declaration.initializer;
    }
  }
}

if (!profilesObject) {
  throw new Error(`GAME_PROFILES was not found in ${sourcePath}`);
}

const optimized = [];

for (const property of profilesObject.properties) {
  if (!ts.isPropertyAssignment(property)) continue;
  if (!ts.isObjectLiteralExpression(property.initializer)) continue;

  const slug = propertyName(property.name);
  if (!slug) continue;

  const seoStatusProperty = findProperty(property.initializer, "seoStatus");
  if (
    seoStatusProperty &&
    ts.isPropertyAssignment(seoStatusProperty) &&
    ts.isStringLiteral(seoStatusProperty.initializer) &&
    seoStatusProperty.initializer.text === "optimized"
  ) {
    optimized.push(slug);
  }
}

optimized.sort();

if (optimized.length === 0) {
  throw new Error("No optimized games found for Visual SEO QA");
}

if (process.argv.includes("--json")) {
  process.stdout.write(`${JSON.stringify(optimized)}\n`);
} else {
  process.stdout.write(`${optimized.join("\n")}\n`);
}
