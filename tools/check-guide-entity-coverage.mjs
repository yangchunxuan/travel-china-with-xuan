#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

import {
  destinationEntityIds,
  resolveGuideEntities,
} from "../lib/searchPlatformGuidePolicy.ts";

function unwrapExpression(expression) {
  let current = expression;
  while (
    ts.isAsExpression(current) ||
    ts.isSatisfiesExpression(current) ||
    ts.isParenthesizedExpression(current) ||
    ts.isTypeAssertionExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

function propertyName(property) {
  if (!property.name) return null;
  if (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) {
    return property.name.text;
  }
  return null;
}

function objectProperty(object, name, label) {
  const property = object.properties.find((candidate) =>
    ts.isPropertyAssignment(candidate) && propertyName(candidate) === name
  );
  if (!property || !ts.isPropertyAssignment(property)) {
    throw new Error(`${label} must contain a literal ${name} property.`);
  }
  return unwrapExpression(property.initializer);
}

function stringLiteral(expression, label) {
  if (!ts.isStringLiteral(expression) && !ts.isNoSubstitutionTemplateLiteral(expression)) {
    throw new Error(`${label} must be a string literal.`);
  }
  return expression.text;
}

function stringArrayLiteral(expression, label) {
  if (!ts.isArrayLiteralExpression(expression)) {
    throw new Error(`${label} must be a string-literal array.`);
  }
  return expression.elements.map((element, index) =>
    stringLiteral(unwrapExpression(element), `${label}[${index}]`)
  );
}

/**
 * Read the legacy half of the runtime guide registry without executing app
 * modules or depending on Next's extension resolver. Non-literal registry data
 * fails closed so the audit cannot silently omit a guide.
 */
export function parseLegacyGuideEntries(source, label = "lib/guideRegistry.ts") {
  const sourceFile = ts.createSourceFile(
    label,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  let registryDeclaration = null;
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === "legacyGuideRegistry") {
        registryDeclaration = declaration;
      }
    }
  }
  if (!registryDeclaration?.initializer) {
    throw new Error(`${label} does not declare legacyGuideRegistry.`);
  }

  const initializer = unwrapExpression(registryDeclaration.initializer);
  if (!ts.isArrayLiteralExpression(initializer)) {
    throw new Error(`${label} legacyGuideRegistry must be an array literal.`);
  }
  return initializer.elements.map((element, index) => {
    const object = unwrapExpression(element);
    const entryLabel = `${label} legacyGuideRegistry[${index}]`;
    if (!ts.isObjectLiteralExpression(object)) {
      throw new Error(`${entryLabel} must be an object literal.`);
    }
    return {
      id: stringLiteral(objectProperty(object, "id", entryLabel), `${entryLabel}.id`),
      destinations: stringArrayLiteral(
        objectProperty(object, "destinations", entryLabel),
        `${entryLabel}.destinations`,
      ),
      scope: "legacy",
    };
  });
}

export async function loadIndependentGuideEntries(guideRoot) {
  const directories = (await readdir(guideRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, "en"));
  const guides = [];
  for (const directory of directories) {
    const metadataPath = path.join(guideRoot, directory, "metadata.json");
    const metadata = JSON.parse(await readFile(metadataPath, "utf8"));
    if (typeof metadata.id !== "string" || metadata.id !== directory) {
      throw new Error(`${metadataPath} id must match its directory.`);
    }
    if (
      !Array.isArray(metadata.destinations) ||
      metadata.destinations.length === 0 ||
      metadata.destinations.some((destination) => typeof destination !== "string")
    ) {
      throw new Error(`${metadataPath} destinations must be a non-empty string array.`);
    }
    guides.push({
      id: metadata.id,
      destinations: metadata.destinations,
      scope: "independent",
    });
  }
  return guides;
}

export function createGuideEntityCoverageReport(guides) {
  const registeredIds = new Set();
  const unmappedUsage = new Map();
  const rows = [...guides]
    .sort((left, right) => left.id.localeCompare(right.id, "en"))
    .map((guide) => {
      if (registeredIds.has(guide.id)) {
        throw new Error(`Duplicate guide id in entity coverage input: ${guide.id}`);
      }
      registeredIds.add(guide.id);
      const resolution = resolveGuideEntities(guide.destinations);
      for (const token of resolution.unmappedTokens) {
        const guideIds = unmappedUsage.get(token) ?? [];
        guideIds.push(guide.id);
        unmappedUsage.set(token, guideIds);
      }
      return {
        contentId: `guide-${guide.id}`,
        scope: guide.scope,
        destinationTokens: guide.destinations,
        entityIds: resolution.entityIds,
        unmappedTokens: resolution.unmappedTokens,
        usedCountryFallback: resolution.usedCountryFallback,
      };
    });
  const independentGuideCount = rows.filter((row) => row.scope === "independent").length;
  const legacyGuideCount = rows.filter((row) => row.scope === "legacy").length;
  return {
    schemaVersion: 2,
    scope: {
      runtimeGuideCount: rows.length,
      independentGuideCount,
      legacyGuideCount,
    },
    controlledTokenCount: Object.keys(destinationEntityIds).length,
    guideCount: rows.length,
    guideWithUnmappedTokenCount: rows.filter((row) => row.unmappedTokens.length > 0).length,
    countryFallbackGuideCount: rows.filter((row) => row.usedCountryFallback).length,
    unmappedTokenCount: unmappedUsage.size,
    unmappedTokens: Object.fromEntries([...unmappedUsage.entries()]
      .sort(([left], [right]) => left.localeCompare(right, "en"))),
    rows,
  };
}

export function strictModeExitCode(report) {
  return report.guideWithUnmappedTokenCount > 0 ? 1 : 0;
}

export async function generateGuideEntityCoverage({
  guideRoot = path.resolve(process.cwd(), "content/guides"),
  legacyRegistryPath = path.resolve(process.cwd(), "lib/guideRegistry.ts"),
} = {}) {
  const [independentGuides, legacySource] = await Promise.all([
    loadIndependentGuideEntries(guideRoot),
    readFile(legacyRegistryPath, "utf8"),
  ]);
  const legacyGuides = parseLegacyGuideEntries(legacySource, legacyRegistryPath);
  return createGuideEntityCoverageReport([...legacyGuides, ...independentGuides]);
}

function parseArguments(argv) {
  const options = { strict: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--strict") options.strict = true;
    else if (argument === "--guides-root") options.guideRoot = path.resolve(argv[++index]);
    else if (argument === "--legacy-registry") {
      options.legacyRegistryPath = path.resolve(argv[++index]);
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }
  return options;
}

async function main() {
  const { strict, ...options } = parseArguments(process.argv.slice(2));
  const report = await generateGuideEntityCoverage(options);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (strict) process.exitCode = strictModeExitCode(report);
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.stack : error}\n`);
    process.exitCode = 1;
  });
}
