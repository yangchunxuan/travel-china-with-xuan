import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { evaluateGuideIndexGate } from "../lib/guideIndexGate.mjs";
import { validateGuideRepositorySnapshot } from "./generate-guide-registry.mjs";
import {
  getGuideCollectionId,
  searchCollections,
} from "../lib/searchCollectionI18n.ts";
import {
  guideUpdatePolicy,
  resolveGuideEntities,
} from "../lib/searchPlatformGuidePolicy.ts";

function normalizeLineEndings(value) {
  return value.replace(/\r\n?/gu, "\n");
}

function parseLiteralArray(source, declaration, terminator) {
  const declarationIndex = source.indexOf(declaration);
  if (declarationIndex < 0) throw new Error(`Cannot find ${declaration}.`);
  const start = source.indexOf("[", declarationIndex);
  const end = source.indexOf(terminator, start);
  if (start < 0 || end < 0) throw new Error(`Cannot parse ${declaration}.`);
  const literal = source.slice(start, end + 1);
  // Evaluate only the bounded, reviewed, data-only legacy array literal; this
  // avoids importing the application graph in a read-only Node report tool.
  return Function(`"use strict"; return (${literal});`)();
}

async function loadLegacyGuides(projectRoot) {
  const source = await readFile(path.join(projectRoot, "lib", "guideRegistry.ts"), "utf8");
  return parseLiteralArray(
    source,
    "export const legacyGuideRegistry =",
    "] as const satisfies readonly GuideEntry[];",
  );
}

function unique(values) {
  return [...new Set(values)];
}

function sectionForCollection(collectionId) {
  const collection = searchCollections.find((entry) => entry.id === collectionId);
  if (!collection) throw new Error(`Coverage inventory found unknown collection ${collectionId}.`);
  return collection.section;
}

const defaultCountContract = {
  guideIdentityCount: 221,
  frozenBaselineIdentityCount: 192,
  candidateTicketCount: 30,
  newCandidateIdentityCount: 29,
  updateCandidateIdentityCount: 1,
  localeUrlCount: 655,
  frozenBaselineLocaleUrlCount: 568,
};

export async function buildGuideCoverageInventory(projectRoot = process.cwd()) {
  const guidesRoot = path.join(projectRoot, "content", "guides");
  const [legacyGuides, validatedSnapshot] = await Promise.all([
    loadLegacyGuides(projectRoot),
    validateGuideRepositorySnapshot({
      guidesRoot,
      governancePath: path.join(projectRoot, "content", "guide-governance.json"),
      entityRegistryPath: path.join(projectRoot, "content", "entities", "core-places.json"),
    }),
  ]);
  const governance = validatedSnapshot.governance.source;
  const independentGuides = validatedSnapshot.guides.map(({ metadata }) => metadata);
  const deploymentBlockIds = new Set(validatedSnapshot.deploymentBlocks);
  const guides = [...legacyGuides, ...independentGuides];
  const baselineIds = new Set([
    ...governance.baseline.independentGuideIds,
    ...governance.baseline.legacyGuideIds,
  ]);
  const candidateByGuideId = new Map(
    governance.candidates.map((candidate) => [candidate.guideId, candidate]),
  );
  const rows = guides.flatMap((guide) => {
    const candidate = candidateByGuideId.get(guide.id) ?? null;
    const isBaseline = baselineIds.has(guide.id);
    const candidateVersionIndexApproved = evaluateGuideIndexGate({
      isBaseline,
      candidate,
      metadata: guide,
      frozenBaselinePublishedDate:
        governance.baseline.publishedDatesByGuideId[guide.id],
    });
    const currentBaselineIndexApproved = evaluateGuideIndexGate({
      isBaseline,
      candidate: null,
      metadata: null,
    });
    const retainsFrozenBaseline = Boolean(
      isBaseline &&
        candidate?.candidateAction === "update-existing" &&
        !candidateVersionIndexApproved,
    );
    const indexApproved = retainsFrozenBaseline
      ? currentBaselineIndexApproved
      : candidateVersionIndexApproved;
    const primaryCollectionId = guide.primaryCollectionId ?? getGuideCollectionId(guide);
    const resolvedEntities = resolveGuideEntities(guide.destinations).entityIds;
    const primaryEntityId = guide.primaryEntityId ?? resolvedEntities[0] ?? null;
    const secondaryEntityIds = guide.secondaryEntityIds ?? resolvedEntities.slice(1);
    const entityIds = candidate
      ? unique([...(primaryEntityId ? [primaryEntityId] : []), ...secondaryEntityIds])
      : resolvedEntities;
    const freshnessClass = guide.freshnessClass ?? guideUpdatePolicy(guide).volatility;
    const lastVerified = guide.lastVerified ?? guide.sourceReviewedDate;
    const candidateEditorialStatus = candidate
      ? (guide.editorialStatus ?? null)
      : null;
    const editorialStatus = guide.editorialStatus ?? "approved";
    const status = editorialStatus === "approved" ? "published" : "review";
    const candidateVersionInSitemap = Boolean(
      candidate && status === "published" && candidateVersionIndexApproved,
    );
    const retainedBaselineInSitemap = retainsFrozenBaseline;
    const inSitemap = candidateVersionInSitemap || retainedBaselineInSitemap ||
      Boolean(!candidate && status === "published" && indexApproved);
    const effectivePublishedVersion = retainedBaselineInSitemap
      ? "frozen-baseline"
      : candidateVersionInSitemap
        ? "candidate"
        : inSitemap
          ? "frozen-baseline"
          : null;
    const section = sectionForCollection(primaryCollectionId);
    return Object.entries(guide.locales).flatMap(([locale, localized]) =>
      localized
        ? [{
            contentId: `guide-${guide.id}`,
            candidateId: candidate?.candidateId ?? null,
            governanceSource: candidate ? "candidate" : "frozen-baseline",
            centralDecision: candidate?.centralDecision ?? "approved",
            candidateAction: candidate
              ? (candidate.candidateAction ?? "new")
              : null,
            baselinePublishedDate:
              candidate?.candidateAction === "update-existing"
                ? governance.baseline.publishedDatesByGuideId[guide.id]
                : null,
            approvedReleaseDate: candidate?.approvedReleaseDate ?? null,
            locale,
            status,
            editorialStatus,
            candidateEditorialStatus,
            effectivePublishedVersion,
            section,
            primaryCollectionId,
            primaryEntityId,
            secondaryEntityIds,
            entityIds,
            path: localized.path,
            freshnessClass,
            lastVerified,
            candidateLastVerified: candidate ? lastVerified : null,
            effectivePublishedLastVerified:
              effectivePublishedVersion === "candidate" ? lastVerified : null,
            indexApproved,
            candidateVersionIndexApproved,
            retainsFrozenBaseline,
            deploymentBlocked: deploymentBlockIds.has(guide.id),
            candidateVersionInSitemap,
            retainedBaselineInSitemap,
            inSitemap,
          }]
        : [],
    );
  }).sort(
    (left, right) =>
      left.contentId.localeCompare(right.contentId, "en") ||
      left.locale.localeCompare(right.locale, "en"),
  );
  const governedIds = new Set([...baselineIds, ...candidateByGuideId.keys()]);
  const actualIds = new Set(guides.map((guide) => guide.id));
  const missing = [...actualIds].filter((id) => !governedIds.has(id));
  const stale = [...governedIds].filter((id) => !actualIds.has(id));
  if (missing.length > 0 || stale.length > 0) {
    throw new Error(
      `Coverage mismatch: unregistered=${missing.join(",") || "none"}; stale=${stale.join(",") || "none"}.`,
    );
  }
  const newCandidateCount = governance.candidates.filter(
    (candidate) => candidate.candidateAction !== "update-existing",
  ).length;
  const updateCandidateCount = governance.candidates.filter(
    (candidate) => candidate.candidateAction === "update-existing",
  ).length;
  const baselineRowCount = rows.filter((row) =>
    baselineIds.has(row.contentId.replace(/^guide-/u, ""))
  ).length;
  const countContractFailed = (
    guides.length !== defaultCountContract.guideIdentityCount ||
    baselineIds.size !== defaultCountContract.frozenBaselineIdentityCount ||
    governance.candidates.length !== defaultCountContract.candidateTicketCount ||
    newCandidateCount !== defaultCountContract.newCandidateIdentityCount ||
    updateCandidateCount !== defaultCountContract.updateCandidateIdentityCount ||
    rows.length !== defaultCountContract.localeUrlCount ||
    baselineRowCount !== defaultCountContract.frozenBaselineLocaleUrlCount
  );
  if (countContractFailed) {
    throw new Error(
      `Guide coverage count contract failed: identities=${guides.length}, baseline=${baselineIds.size}, tickets=${governance.candidates.length}, new=${newCandidateCount}, updates=${updateCandidateCount}, localeRows=${rows.length}, baselineRows=${baselineRowCount}.`,
    );
  }
  return {
    schemaVersion: "1.0.0",
    baselineSourceCommit: governance.baselineSourceCommit,
    guideIdentityCount: guides.length,
    frozenBaselineIdentityCount: baselineIds.size,
    candidateTicketCount: governance.candidates.length,
    newCandidateIdentityCount: newCandidateCount,
    updateCandidateIdentityCount: updateCandidateCount,
    frozenBaselineLocaleUrlCount: baselineRowCount,
    localeUrlCount: rows.length,
    sitemapUrlCount: rows.filter((row) => row.inSitemap).length,
    rows,
  };
}

async function writeAtomic(filePath, content) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp`;
  await writeFile(temporaryPath, content, "utf8");
  await rename(temporaryPath, filePath);
}

export async function generateGuideCoverageInventory({
  projectRoot = process.cwd(),
  output = path.resolve(projectRoot, "docs/organic-growth/guide-coverage-inventory.json"),
  check = false,
} = {}) {
  const inventory = await buildGuideCoverageInventory(projectRoot);
  const expected = `${JSON.stringify(inventory, null, 2)}\n`;
  if (check) {
    const current = await readFile(output, "utf8").catch(() => null);
    if (current === null || normalizeLineEndings(current) !== normalizeLineEndings(expected)) {
      throw new Error(`Guide coverage inventory is missing or stale: ${output}.`);
    }
  } else {
    await writeAtomic(output, expected);
  }
  return inventory;
}

const invokedPath = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : null;
if (invokedPath === import.meta.url) {
  try {
    const inventory = await generateGuideCoverageInventory({
      check: process.argv.includes("--check"),
    });
    process.stdout.write(
      `${inventory.guideIdentityCount} guide identities / ${inventory.localeUrlCount} locale URLs inventoried; ${inventory.sitemapUrlCount} pass the sitemap gate.\n`,
    );
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : error}\n`);
    process.exitCode = 1;
  }
}
