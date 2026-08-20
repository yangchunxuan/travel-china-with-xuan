import { access, mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const guideTypes = new Set(["route", "planning", "field-note"]);
const sections = new Set([
  "explore",
  "plan",
  "transport",
  "when-to-go",
  "stay",
  "essentials",
  "culture",
  "tools",
  "services",
]);
const families = new Set([
  "entity",
  "subproblem",
  "relationship",
  "comparison",
  "time",
  "task",
  "combined-decision",
  "tool",
  "service",
]);
const intents = new Set([
  "understand",
  "compare",
  "plan",
  "execute",
  "in-trip",
  "purchase",
]);
const locales = ["en", "zh", "ko"];

const metadataKeys = new Set([
  "id",
  "type",
  "pillar",
  "audienceMarkets",
  "format",
  "topics",
  "destinations",
  "homeFeaturedRank",
  "hubLead",
  "cardImagePath",
  "cardImageWidth",
  "cardImageHeight",
  "heroImagePath",
  "heroImageUrl",
  "imageWidth",
  "imageHeight",
  "datePublished",
  "dateModified",
  "sourceReviewedDate",
  "searchTerms",
  "locales",
  "search",
  "layout",
]);

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function positiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function validLocalPath(value) {
  return (
    nonEmpty(value) &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.split("/").includes("..")
  );
}

function validHttpsUrl(value) {
  if (!nonEmpty(value)) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function validDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function validStringArray(value) {
  return Array.isArray(value) && value.length > 0 && value.every(nonEmpty);
}

function assertOnlyKeys(value, allowed, label) {
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) {
    throw new Error(`${label} contains unsupported field(s): ${unknown.join(", ")}.`);
  }
}

function expectedGuidePath(id, locale) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}/guides/${id}/`;
}

function validateLocaleEntry(entry, id, locale, label) {
  if (!isRecord(entry)) throw new Error(`${label} must be an object.`);
  const requiredText = [
    "path",
    "title",
    "headline",
    "description",
    "heroAlt",
    "navTitle",
    "featuredLinkLabel",
    "openGraphLocale",
  ];
  assertOnlyKeys(
    entry,
    new Set([...requiredText, "heroCredit", "cardImageAlt", "cardTags"]),
    label,
  );
  for (const key of requiredText) {
    if (!nonEmpty(entry[key])) throw new Error(`${label}.${key} must be non-empty.`);
  }
  if (entry.cardImageAlt !== undefined && !nonEmpty(entry.cardImageAlt)) {
    throw new Error(`${label}.cardImageAlt must be non-empty when supplied.`);
  }
  if (entry.heroCredit !== undefined) {
    if (!isRecord(entry.heroCredit)) {
      throw new Error(`${label}.heroCredit must be an object when supplied.`);
    }
    const creditKeys = [
      "text",
      "sourceLabel",
      "sourceUrl",
      "licenseLabel",
      "licenseUrl",
    ];
    assertOnlyKeys(entry.heroCredit, new Set(creditKeys), `${label}.heroCredit`);
    for (const key of ["text", "sourceLabel", "licenseLabel"]) {
      if (!nonEmpty(entry.heroCredit[key])) {
        throw new Error(`${label}.heroCredit.${key} must be non-empty.`);
      }
    }
    for (const key of ["sourceUrl", "licenseUrl"]) {
      if (!validHttpsUrl(entry.heroCredit[key])) {
        throw new Error(`${label}.heroCredit.${key} must be an HTTPS URL.`);
      }
    }
  }
  if (!validStringArray(entry.cardTags)) {
    throw new Error(`${label}.cardTags needs at least one localized card label.`);
  }
  if (entry.path !== expectedGuidePath(id, locale)) {
    throw new Error(`${label}.path must be ${expectedGuidePath(id, locale)}.`);
  }
}

async function validateMetadata(metadata, directory, guidesRoot) {
  const label = path.relative(process.cwd(), path.join(directory, "metadata.json"));
  if (!isRecord(metadata)) throw new Error(`${label} must contain one JSON object.`);
  assertOnlyKeys(metadata, metadataKeys, label);

  const id = path.basename(directory);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(metadata.id ?? "") || metadata.id !== id) {
    throw new Error(`${label}.id must be the kebab-case directory name "${id}".`);
  }
  if (!guideTypes.has(metadata.type)) throw new Error(`${label}.type is invalid.`);
  if (!nonEmpty(metadata.pillar)) throw new Error(`${label}.pillar is required.`);
  if (!validStringArray(metadata.audienceMarkets)) throw new Error(`${label}.audienceMarkets is required.`);
  if (!nonEmpty(metadata.format)) throw new Error(`${label}.format is required.`);
  for (const key of ["topics", "destinations"]) {
    if (!validStringArray(metadata[key])) throw new Error(`${label}.${key} is required.`);
  }
  if (metadata.searchTerms !== undefined) {
    if (!isRecord(metadata.searchTerms)) {
      throw new Error(`${label}.searchTerms must be an object when supplied.`);
    }
    assertOnlyKeys(metadata.searchTerms, new Set(locales), `${label}.searchTerms`);
    for (const locale of locales) {
      if (!validStringArray(metadata.searchTerms[locale])) {
        throw new Error(`${label}.searchTerms.${locale} needs at least one reviewed search phrase.`);
      }
    }
  }
  if (!validLocalPath(metadata.heroImagePath)) {
    throw new Error(`${label}.heroImagePath must be a safe path under public/.`);
  }
  if (!nonEmpty(metadata.heroImageUrl)) {
    throw new Error(`${label}.heroImageUrl is required.`);
  }
  for (const key of ["imageWidth", "imageHeight"]) {
    if (!positiveInteger(metadata[key])) throw new Error(`${label}.${key} must be a positive integer.`);
  }
  for (const key of ["datePublished", "dateModified", "sourceReviewedDate"]) {
    if (!validDate(metadata[key])) throw new Error(`${label}.${key} must be YYYY-MM-DD.`);
  }
  if (!isRecord(metadata.search)) throw new Error(`${label}.search is required.`);
  assertOnlyKeys(
    metadata.search,
    new Set(["section", "family", "primaryIntent"]),
    `${label}.search`,
  );
  if (!sections.has(metadata.search.section)) throw new Error(`${label}.search.section is invalid.`);
  if (!families.has(metadata.search.family)) throw new Error(`${label}.search.family is invalid.`);
  if (!intents.has(metadata.search.primaryIntent)) throw new Error(`${label}.search.primaryIntent is invalid.`);

  if (!isRecord(metadata.layout) || !["template", "bespoke"].includes(metadata.layout.mode)) {
    throw new Error(`${label}.layout.mode must be "template" or "bespoke".`);
  }
  assertOnlyKeys(metadata.layout, new Set(["mode", "templateId"]), `${label}.layout`);
  if (metadata.layout.mode === "template" && metadata.layout.templateId !== "editorial-v1") {
    throw new Error(`${label}.layout.templateId must be "editorial-v1".`);
  }
  if (metadata.layout.mode === "bespoke" && "templateId" in metadata.layout) {
    throw new Error(`${label}.layout must omit templateId in bespoke mode.`);
  }

  if (!isRecord(metadata.locales)) throw new Error(`${label}.locales is required.`);
  assertOnlyKeys(metadata.locales, new Set(locales), `${label}.locales`);
  const presentLocales = locales.filter((locale) => metadata.locales[locale]);
  if (presentLocales.length === 0) throw new Error(`${label}.locales needs en, zh or ko.`);
  for (const locale of presentLocales) {
    validateLocaleEntry(metadata.locales[locale], id, locale, `${label}.locales.${locale}`);
    if (metadata.layout.mode === "template") {
      const bodyPath = path.join(guidesRoot, id, `body.${locale}.ts`);
      try {
        await access(bodyPath);
      } catch {
        throw new Error(`${label} uses editorial-v1 but ${path.basename(bodyPath)} is missing.`);
      }
    }
  }

  const projectRoot = path.resolve(guidesRoot, "../..");
  const publicRoot = path.join(projectRoot, "public");
  const assetPaths = [metadata.heroImagePath];
  if (metadata.cardImagePath !== undefined) {
    if (
      !validLocalPath(metadata.cardImagePath) ||
      !positiveInteger(metadata.cardImageWidth) ||
      !positiveInteger(metadata.cardImageHeight)
    ) {
      throw new Error(
        `${label} card image needs a safe path and positive width and height.`,
      );
    }
    assetPaths.push(metadata.cardImagePath);
  } else if (
    metadata.cardImageWidth !== undefined ||
    metadata.cardImageHeight !== undefined
  ) {
    throw new Error(`${label} card image dimensions require cardImagePath.`);
  }
  for (const assetPath of assetPaths) {
    const filePath = path.resolve(publicRoot, assetPath.replace(/^\/+/, ""));
    if (!filePath.startsWith(`${publicRoot}${path.sep}`)) {
      throw new Error(`${label} image escapes public/: ${assetPath}.`);
    }
    try {
      await access(filePath);
    } catch {
      throw new Error(`${label} image is missing from public/: ${assetPath}.`);
    }
  }

  if (metadata.layout.mode === "bespoke") {
    const routePaths = [];
    if (presentLocales.includes("en")) {
      routePaths.push(path.join(projectRoot, "app/(default)/guides", id, "page.tsx"));
    }
    if (presentLocales.some((locale) => locale === "zh" || locale === "ko")) {
      routePaths.push(
        path.join(projectRoot, "app/(localized)/[locale]/guides", id, "page.tsx"),
      );
    }
    for (const routePath of routePaths) {
      try {
        await access(routePath);
      } catch {
        throw new Error(
          `${label} uses bespoke layout but ${path.relative(projectRoot, routePath)} is missing.`,
        );
      }
    }
  }

  return { metadata, presentLocales };
}

async function loadGuideMetadata(guidesRoot) {
  let entries;
  try {
    entries = await readdir(guidesRoot, { withFileTypes: true });
  } catch (error) {
    if (error && error.code === "ENOENT") return [];
    throw error;
  }

  const guides = [];
  for (const entry of entries
    .filter((candidate) => candidate.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name, "en"))) {
    const directory = path.join(guidesRoot, entry.name);
    const metadataPath = path.join(directory, "metadata.json");
    let source;
    try {
      source = await readFile(metadataPath, "utf8");
    } catch (error) {
      if (error && error.code === "ENOENT") continue;
      throw error;
    }
    let metadata;
    try {
      metadata = JSON.parse(source);
    } catch (error) {
      throw new Error(`${metadataPath} is not valid JSON: ${error instanceof Error ? error.message : error}`);
    }
    guides.push(await validateMetadata(metadata, directory, guidesRoot));
  }

  const ids = new Set();
  const paths = new Set();
  for (const { metadata } of guides) {
    if (ids.has(metadata.id)) throw new Error(`Duplicate guide id: ${metadata.id}.`);
    ids.add(metadata.id);
    for (const localized of Object.values(metadata.locales)) {
      if (paths.has(localized.path)) throw new Error(`Duplicate guide path: ${localized.path}.`);
      paths.add(localized.path);
    }
  }
  return guides;
}

function serializeRegistry(guides) {
  const records = guides.map(({ metadata }) => metadata);
  const ids = records.map((record) => record.id);
  return `/* Generated by tools/generate-guide-registry.mjs. Do not edit. */\nexport const generatedGuideIds = ${JSON.stringify(ids, null, 2)} as const;\nexport const generatedGuideRegistry = ${JSON.stringify(records, null, 2)} as const;\n`;
}

function serializeBodies(guides) {
  const lines = [
    "/* Generated by tools/generate-guide-registry.mjs. Do not edit. */",
    "export const generatedGuideBodyLoaders = {",
  ];
  for (const { metadata, presentLocales } of guides) {
    if (metadata.layout.mode !== "template") continue;
    lines.push(`  ${JSON.stringify(metadata.id)}: {`);
    for (const locale of presentLocales) {
      lines.push(
        `    ${locale}: () => import(${JSON.stringify(`../../content/guides/${metadata.id}/body.${locale}`)}),`,
      );
    }
    lines.push("  },");
  }
  lines.push("} as const;", "");
  return lines.join("\n");
}

async function writeAtomic(filePath, content) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp`;
  await writeFile(temporaryPath, content, "utf8");
  await rename(temporaryPath, filePath);
}

function normalizeLineEndings(value) {
  return value.replace(/\r\n?/gu, "\n");
}

export async function generateGuideRegistry({
  guidesRoot = path.resolve(process.cwd(), "content/guides"),
  registryOutput = path.resolve(process.cwd(), "lib/generated/guideRegistry.generated.ts"),
  bodiesOutput = path.resolve(process.cwd(), "lib/generated/guideBodies.generated.ts"),
  check = false,
} = {}) {
  const guides = await loadGuideMetadata(guidesRoot);
  const outputs = [
    [registryOutput, serializeRegistry(guides)],
    [bodiesOutput, serializeBodies(guides)],
  ];

  if (check) {
    for (const [filePath, expected] of outputs) {
      const current = await readFile(filePath, "utf8").catch(() => null);
      if (current === null || normalizeLineEndings(current) !== normalizeLineEndings(expected)) {
        throw new Error(`Generated guide file is missing or stale: ${filePath}.`);
      }
    }
  } else {
    await Promise.all(outputs.map(([filePath, content]) => writeAtomic(filePath, content)));
  }
  return { guideCount: guides.length, guides, outputs: outputs.map(([filePath]) => filePath) };
}

function parseArguments(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--guides-root") options.guidesRoot = path.resolve(argv[++index]);
    else if (argument === "--registry-output") options.registryOutput = path.resolve(argv[++index]);
    else if (argument === "--bodies-output") options.bodiesOutput = path.resolve(argv[++index]);
    else if (argument === "--check") options.check = true;
    else throw new Error(`Unknown argument: ${argument}`);
  }
  return options;
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
  try {
    const result = await generateGuideRegistry(parseArguments(process.argv.slice(2)));
    process.stdout.write(`${result.guideCount} independent guide folder(s) verified; generated ${result.outputs.length} temporary file(s).\n`);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : error}\n`);
    process.exitCode = 1;
  }
}
