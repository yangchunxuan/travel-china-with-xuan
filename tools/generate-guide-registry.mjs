import { createHash } from "node:crypto";
import { access, mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { evaluateGuideIndexGate } from "../lib/guideIndexGate.mjs";

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

export const FROZEN_GUIDE_BASELINE_SOURCE_COMMIT =
  "c13d83e1abc8f5f25ee2250de11eed8c424a0196";
export const FROZEN_GUIDE_BASELINE_CONTRACT_SHA256 =
  "2e15579df247b17eaf7cdd1a3370a2c60f246dc194e316564608ab4c0de0c4e7";

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
  "candidateId",
  "editorialStatus",
  "primaryCollectionId",
  "primaryEntityId",
  "secondaryEntityIds",
  "freshnessClass",
  "lastVerified",
  "indexApproved",
]);

const governanceMetadataKeys = [
  "candidateId",
  "editorialStatus",
  "primaryCollectionId",
  "primaryEntityId",
  "secondaryEntityIds",
  "freshnessClass",
  "lastVerified",
  "indexApproved",
];

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

function validPossiblyEmptyStringArray(value) {
  return Array.isArray(value) && value.every(nonEmpty);
}

export function computeGuideBaselineContractSha256(baseline) {
  const normalized = JSON.stringify({
    independentGuideIds: [...baseline.independentGuideIds].sort(),
    legacyGuideIds: [...baseline.legacyGuideIds].sort(),
    publishedDatesByGuideId: Object.fromEntries(
      Object.entries(baseline.publishedDatesByGuideId ?? {})
        .sort(([left], [right]) => left.localeCompare(right, "en")),
    ),
  });
  return createHash("sha256").update(normalized).digest("hex");
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

function validateGovernanceMetadata(metadata, label, governance) {
  const isBaseline = governance.baselineGuideIds.has(metadata.id);
  const candidate = governance.candidateByGuideId.get(metadata.id);
  const supplied = governanceMetadataKeys.filter((key) => metadata[key] !== undefined);

  if (isBaseline && !candidate) {
    if (supplied.length > 0) {
      throw new Error(
        `${label} is in the frozen baseline and must omit candidate governance field(s): ${supplied.join(", ")}.`,
      );
    }
    return { deploymentBlocked: false };
  }
  if (!candidate) {
    throw new Error(
      `${label} is neither in the frozen baseline nor registered in guide-governance.json.`,
    );
  }
  const missing = governanceMetadataKeys.filter((key) => metadata[key] === undefined);
  if (missing.length > 0) {
    throw new Error(`${label} is missing governance field(s): ${missing.join(", ")}.`);
  }
  if (metadata.candidateId !== candidate.candidateId) {
    throw new Error(`${label}.candidateId must be ${candidate.candidateId}.`);
  }
  if (!governance.editorialStatuses.has(metadata.editorialStatus)) {
    throw new Error(`${label}.editorialStatus is invalid.`);
  }
  if (!governance.collectionIds.has(metadata.primaryCollectionId)) {
    throw new Error(`${label}.primaryCollectionId is unknown.`);
  }
  if (!governance.entityIds.has(metadata.primaryEntityId)) {
    throw new Error(`${label}.primaryEntityId is unknown.`);
  }
  if (!validPossiblyEmptyStringArray(metadata.secondaryEntityIds)) {
    throw new Error(`${label}.secondaryEntityIds must be an array of entity IDs.`);
  }
  const entityIds = [metadata.primaryEntityId, ...metadata.secondaryEntityIds];
  if (new Set(entityIds).size !== entityIds.length) {
    throw new Error(`${label} primaryEntityId and secondaryEntityIds must be unique.`);
  }
  const unknownEntities = entityIds.filter((id) => !governance.entityIds.has(id));
  if (unknownEntities.length > 0) {
    throw new Error(`${label} references unknown entity ID(s): ${unknownEntities.join(", ")}.`);
  }
  if (!governance.freshnessClasses.has(metadata.freshnessClass)) {
    throw new Error(`${label}.freshnessClass is invalid.`);
  }
  if (!validDate(metadata.lastVerified)) {
    throw new Error(`${label}.lastVerified must be a real YYYY-MM-DD date.`);
  }
  if (metadata.lastVerified > new Date().toISOString().slice(0, 10)) {
    throw new Error(`${label}.lastVerified cannot be in the future.`);
  }
  if (typeof metadata.indexApproved !== "boolean") {
    throw new Error(`${label}.indexApproved must be boolean.`);
  }
  if (metadata.editorialStatus !== "approved" && metadata.indexApproved) {
    throw new Error(`${label} cannot set indexApproved before editorial approval.`);
  }
  if (candidate.centralDecision !== "approved" && metadata.indexApproved) {
    throw new Error(
      `${label} cannot set indexApproved while centralDecision is ${candidate.centralDecision}.`,
    );
  }
  if (
    candidate.candidateAction === "update-existing" &&
    metadata.datePublished !== governance.baselinePublishedDateByGuideId.get(metadata.id)
  ) {
    const baselinePublishedDate = governance.baselinePublishedDateByGuideId.get(metadata.id);
    throw new Error(
      `${label}.datePublished must remain ${baselinePublishedDate} for update-existing.`,
    );
  }
  if (!metadata.indexApproved && candidate.approvedReleaseDate !== undefined) {
    throw new Error(
      `${label} must omit candidate approvedReleaseDate while indexApproved is false.`,
    );
  }
  if (metadata.indexApproved) {
    if (!validDate(candidate.approvedReleaseDate)) {
      throw new Error(
        `${label} needs a real candidate approvedReleaseDate before index approval.`,
      );
    }
    if (candidate.approvedReleaseDate > new Date().toISOString().slice(0, 10)) {
      throw new Error(`${label} candidate approvedReleaseDate cannot be in the future.`);
    }
    const releaseDateField = candidate.candidateAction === "update-existing"
      ? "dateModified"
      : "datePublished";
    if (metadata[releaseDateField] !== candidate.approvedReleaseDate) {
      throw new Error(
        `${label}.${releaseDateField} must equal candidate approvedReleaseDate.`,
      );
    }
  }
  const effectiveIndexApproval = evaluateGuideIndexGate({
    isBaseline,
    candidate,
    metadata,
    frozenBaselinePublishedDate:
      governance.baselinePublishedDateByGuideId.get(metadata.id),
  });
  if (metadata.indexApproved && !effectiveIndexApproval) {
    throw new Error(`${label}.indexApproved does not pass the central release gate.`);
  }
  if (metadata.lastVerified !== metadata.sourceReviewedDate) {
    throw new Error(
      `${label}.lastVerified must equal sourceReviewedDate; update both only after a real source verification.`,
    );
  }
  const expectedSection = metadata.primaryCollectionId.startsWith("timing-")
    ? "when-to-go"
    : metadata.primaryCollectionId.split("-", 1)[0];
  if (metadata.search?.section !== expectedSection) {
    throw new Error(
      `${label}.primaryCollectionId belongs to ${expectedSection}, not ${metadata.search?.section ?? "an absent section"}.`,
    );
  }
  const presentLocales = locales.filter((locale) => metadata.locales?.[locale]);
  if (presentLocales.length !== 1 && presentLocales.length !== locales.length) {
    throw new Error(
      `${label} governed candidates must be single-locale or provide the complete en/zh/ko set.`,
    );
  }
  if (
    candidate.candidateAction === "update-existing" &&
    !effectiveIndexApproval
  ) {
    return { deploymentBlocked: true };
  }
  return { deploymentBlocked: false };
}

async function loadStructuredBodyShape(bodyPath, label) {
  let imported;
  try {
    imported = await import(
      `${pathToFileURL(bodyPath).href}?guide-registry-validation=${encodeURIComponent(label)}`
    );
  } catch (error) {
    throw new Error(
      `${label} could not be imported for block parity: ${error instanceof Error ? error.message : error}`,
    );
  }
  if (!isRecord(imported.default) || !Array.isArray(imported.default.blocks)) {
    throw new Error(`${label} must default-export a structured body with blocks.`);
  }
  const seen = new Set();
  return imported.default.blocks.map((block, index) => {
    if (!isRecord(block) || !nonEmpty(block.id) || !nonEmpty(block.type)) {
      throw new Error(`${label}.blocks[${index}] needs non-empty id and type.`);
    }
    if (seen.has(block.id)) {
      throw new Error(`${label} contains duplicate block id: ${block.id}.`);
    }
    seen.add(block.id);
    return { id: block.id, type: block.type };
  });
}

async function validateStructuredBodyParity(id, presentLocales, guidesRoot, label) {
  const shapes = [];
  for (const locale of presentLocales) {
    const bodyPath = path.join(guidesRoot, id, `body.${locale}.ts`);
    try {
      await access(bodyPath);
    } catch {
      throw new Error(`${label} uses editorial-v1 but ${path.basename(bodyPath)} is missing.`);
    }
    shapes.push([
      locale,
      await loadStructuredBodyShape(bodyPath, `${label}.body.${locale}`),
    ]);
  }
  if (shapes.length < 2) return;
  const [referenceLocale, referenceShape] = shapes[0];
  for (const [locale, shape] of shapes.slice(1)) {
    const length = Math.max(referenceShape.length, shape.length);
    for (let index = 0; index < length; index += 1) {
      const expectedBlock = referenceShape[index] ?? null;
      const actualBlock = shape[index] ?? null;
      if (
        expectedBlock?.id !== actualBlock?.id ||
        expectedBlock?.type !== actualBlock?.type
      ) {
      throw new Error(
          `${label} structured body block parity failed at index ${index}: ` +
            `${referenceLocale}=${JSON.stringify(expectedBlock)}, ${locale}=${JSON.stringify(actualBlock)}.`,
      );
      }
    }
  }
}

async function validateMetadata(metadata, directory, guidesRoot, governance) {
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
  const today = new Date().toISOString().slice(0, 10);
  for (const key of ["datePublished", "dateModified"]) {
    if (metadata[key] > today) {
      throw new Error(`${label}.${key} cannot be in the future.`);
    }
  }
  if (metadata.dateModified < metadata.datePublished) {
    throw new Error(`${label}.dateModified cannot be earlier than datePublished.`);
  }
  const governanceValidation = validateGovernanceMetadata(metadata, label, governance);
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
  }
  if (metadata.layout.mode === "template") {
    await validateStructuredBodyParity(id, presentLocales, guidesRoot, label);
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

  return {
    metadata,
    presentLocales,
    deploymentBlocked: governanceValidation.deploymentBlocked,
  };
}

async function loadGuideMetadata(guidesRoot, governance) {
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
    guides.push(await validateMetadata(metadata, directory, guidesRoot, governance));
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

async function loadJson(filePath, label) {
  let source;
  try {
    source = await readFile(filePath, "utf8");
  } catch (error) {
    throw new Error(`${label} is missing: ${filePath}.`);
  }
  try {
    return JSON.parse(source);
  } catch (error) {
    throw new Error(`${label} is not valid JSON: ${error instanceof Error ? error.message : error}`);
  }
}

async function loadGovernance(
  governancePath,
  entityRegistryPath,
  {
    expectedBaselineSourceCommit = FROZEN_GUIDE_BASELINE_SOURCE_COMMIT,
    expectedBaselineContractSha256 = FROZEN_GUIDE_BASELINE_CONTRACT_SHA256,
  } = {},
) {
  const [source, entityRecords] = await Promise.all([
    loadJson(governancePath, "Guide governance registry"),
    loadJson(entityRegistryPath, "Entity registry"),
  ]);
  if (
    !isRecord(source) ||
    !isRecord(source.controlledValues) ||
    !isRecord(source.baseline) ||
    !Array.isArray(source.baseline.independentGuideIds) ||
    !Array.isArray(source.baseline.legacyGuideIds) ||
    !isRecord(source.baseline.publishedDatesByGuideId) ||
    !Array.isArray(source.candidates)
  ) {
    throw new Error("Guide governance registry has an invalid shape.");
  }
  assertOnlyKeys(
    source,
    new Set(["schemaVersion", "baselineSourceCommit", "controlledValues", "baseline", "candidates"]),
    "Guide governance registry",
  );
  if (source.schemaVersion !== "1.0.0") {
    throw new Error("Guide governance must use schemaVersion 1.0.0.");
  }
  if (!/^[0-9a-f]{40}$/u.test(source.baselineSourceCommit)) {
    throw new Error("Guide governance baselineSourceCommit must be a full commit SHA.");
  }
  if (source.baselineSourceCommit !== expectedBaselineSourceCommit) {
    throw new Error(
      `Guide governance baselineSourceCommit must remain ${expectedBaselineSourceCommit}.`,
    );
  }
  assertOnlyKeys(
    source.controlledValues,
    new Set(["editorialStatuses", "freshnessClasses", "collectionIds"]),
    "Guide governance controlledValues",
  );
  assertOnlyKeys(
    source.baseline,
    new Set(["independentGuideIds", "legacyGuideIds", "publishedDatesByGuideId"]),
    "Guide governance baseline",
  );
  const controlled = source.controlledValues;
  for (const key of ["editorialStatuses", "freshnessClasses", "collectionIds"]) {
    if (!validStringArray(controlled[key])) {
      throw new Error(`Guide governance controlledValues.${key} is invalid.`);
    }
  }
  const baselineIds = [
    ...source.baseline.independentGuideIds,
    ...source.baseline.legacyGuideIds,
  ];
  if (new Set(baselineIds).size !== baselineIds.length) {
    throw new Error("Guide governance baseline contains duplicate IDs.");
  }
  const today = new Date().toISOString().slice(0, 10);
  const baselinePublishedDateByGuideId = new Map(
    Object.entries(source.baseline.publishedDatesByGuideId),
  );
  for (const [guideId, publicationDate] of baselinePublishedDateByGuideId) {
    if (!baselineIds.includes(guideId)) {
      throw new Error(
        `Guide governance baseline publication date references non-baseline guide ${guideId}.`,
      );
    }
    if (!validDate(publicationDate)) {
      throw new Error(
        `Guide governance baseline publication date for ${guideId} must be a real YYYY-MM-DD date.`,
      );
    }
    if (publicationDate > today) {
      throw new Error(
        `Guide governance baseline publication date for ${guideId} cannot be in the future.`,
      );
    }
  }
  const baselineContractSha256 = computeGuideBaselineContractSha256(source.baseline);
  if (baselineContractSha256 !== expectedBaselineContractSha256) {
    throw new Error(
      `Guide governance frozen baseline contract digest mismatch: expected ${expectedBaselineContractSha256}, got ${baselineContractSha256}.`,
    );
  }
  const candidateByGuideId = new Map();
  const candidateIds = new Set();
  const updateCandidateGuideIds = new Set();
  for (const candidate of source.candidates) {
    if (
      !isRecord(candidate) ||
      !nonEmpty(candidate.guideId) ||
      !nonEmpty(candidate.candidateId) ||
      !["pending", "approved", "rejected"].includes(candidate.centralDecision)
    ) {
      throw new Error("Guide governance contains an invalid candidate record.");
    }
    assertOnlyKeys(
      candidate,
      new Set(["candidateId", "guideId", "centralDecision", "candidateAction", "baselinePublishedDate", "approvedReleaseDate", "assignmentSource"]),
      `Guide governance candidate ${candidate.guideId ?? "unknown"}`,
    );
    if (candidateByGuideId.has(candidate.guideId) || candidateIds.has(candidate.candidateId)) {
      throw new Error("Guide governance candidate IDs and guide IDs must be unique.");
    }
    if (
      candidate.candidateAction !== undefined &&
      !["new", "update-existing"].includes(candidate.candidateAction)
    ) {
      throw new Error(
        `Guide ${candidate.guideId} has invalid candidateAction ${JSON.stringify(candidate.candidateAction)}.`,
      );
    }
    const candidateAction = candidate.candidateAction ?? "new";
    const targetsBaseline = baselineIds.includes(candidate.guideId);
    if (
      (targetsBaseline && candidateAction !== "update-existing") ||
      (!targetsBaseline && candidateAction !== "new")
    ) {
      throw new Error(
        `Guide ${candidate.guideId} candidateAction must be update-existing for a frozen baseline identity and new or omitted for a new identity.`,
      );
    }
    if (candidateAction === "update-existing") {
      const frozenBaselinePublishedDate = baselinePublishedDateByGuideId.get(candidate.guideId);
      if (!frozenBaselinePublishedDate) {
        throw new Error(
          `Guide ${candidate.guideId} needs a frozen baseline publication date for update-existing.`,
        );
      }
      if (candidate.baselinePublishedDate !== frozenBaselinePublishedDate) {
        throw new Error(
          `Guide ${candidate.guideId}.baselinePublishedDate must remain ${frozenBaselinePublishedDate} for update-existing.`,
        );
      }
      updateCandidateGuideIds.add(candidate.guideId);
    } else if (candidate.baselinePublishedDate !== undefined) {
      throw new Error(
        `Guide ${candidate.guideId}.baselinePublishedDate is only valid for update-existing.`,
      );
    }
    candidateByGuideId.set(candidate.guideId, candidate);
    candidateIds.add(candidate.candidateId);
  }
  const unusedBaselinePublicationDates = [...baselinePublishedDateByGuideId.keys()]
    .filter((guideId) => !updateCandidateGuideIds.has(guideId));
  if (unusedBaselinePublicationDates.length > 0) {
    throw new Error(
      `Guide governance baseline publication dates require update-existing candidates: ${unusedBaselinePublicationDates.join(", ")}.`,
    );
  }
  if (!Array.isArray(entityRecords)) {
    throw new Error("Entity registry must be an array.");
  }
  const entityIds = new Set(
    entityRecords.flatMap((record) =>
      isRecord(record) && record.recordType === "entity" && isRecord(record.data) && nonEmpty(record.data.id)
        ? [record.data.id]
        : [],
    ),
  );
  return {
    source,
    baselineContractSha256,
    baselineGuideIds: new Set(baselineIds),
    baselinePublishedDateByGuideId,
    candidateByGuideId,
    editorialStatuses: new Set(controlled.editorialStatuses),
    freshnessClasses: new Set(controlled.freshnessClasses),
    collectionIds: new Set(controlled.collectionIds),
    entityIds,
  };
}

export async function validateGuideRepositorySnapshot({
  guidesRoot = path.resolve(process.cwd(), "content/guides"),
  governancePath = path.resolve(guidesRoot, "../guide-governance.json"),
  entityRegistryPath = path.resolve(guidesRoot, "../entities/core-places.json"),
  expectedBaselineSourceCommit = FROZEN_GUIDE_BASELINE_SOURCE_COMMIT,
  expectedBaselineContractSha256 = FROZEN_GUIDE_BASELINE_CONTRACT_SHA256,
} = {}) {
  const governance = await loadGovernance(governancePath, entityRegistryPath, {
    expectedBaselineSourceCommit,
    expectedBaselineContractSha256,
  });
  const guides = await loadGuideMetadata(guidesRoot, governance);
  const deploymentBlocks = guides
    .filter((guide) => guide.deploymentBlocked)
    .map((guide) => guide.metadata.id);
  return { governance, guides, deploymentBlocks };
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
  governancePath = path.resolve(guidesRoot, "../guide-governance.json"),
  entityRegistryPath = path.resolve(guidesRoot, "../entities/core-places.json"),
  expectedBaselineSourceCommit = FROZEN_GUIDE_BASELINE_SOURCE_COMMIT,
  expectedBaselineContractSha256 = FROZEN_GUIDE_BASELINE_CONTRACT_SHA256,
  check = false,
} = {}) {
  const { guides, deploymentBlocks } = await validateGuideRepositorySnapshot({
    guidesRoot,
    governancePath,
    entityRegistryPath,
    expectedBaselineSourceCommit,
    expectedBaselineContractSha256,
  });
  const outputs = [
    [registryOutput, serializeRegistry(guides)],
    [bodiesOutput, serializeBodies(guides)],
  ];
  const validationErrors = [];

  if (check) {
    for (const [filePath, expected] of outputs) {
      const current = await readFile(filePath, "utf8").catch(() => null);
      if (current === null || normalizeLineEndings(current) !== normalizeLineEndings(expected)) {
        validationErrors.push(`Generated guide file is missing or stale: ${filePath}.`);
      }
    }
  }
  if (deploymentBlocks.length > 0) {
    validationErrors.push(
      `Each material update to a frozen baseline URL requires one atomic release; blocked guide IDs: ${deploymentBlocks.join(", ")}. Central approved, editorial approved, indexApproved true and matching approvedReleaseDate/dateModified are all required.`,
    );
  }
  if (validationErrors.length > 0) {
    throw new Error(validationErrors.join("\n"));
  }
  if (!check) {
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
    else if (argument === "--governance") options.governancePath = path.resolve(argv[++index]);
    else if (argument === "--entity-registry") options.entityRegistryPath = path.resolve(argv[++index]);
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
