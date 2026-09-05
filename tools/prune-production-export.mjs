import { lstat, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, "out");
const packagePath = path.join(projectRoot, "package.json");

const labExportRoots = [
  "beijing-composition-lab",
  "journey-lab",
  "journey-lab-cc",
  "journey-lab-v1",
  "journey-lab-v2",
  "journey-lab-v3",
  "motion-lab",
  "planning-scope-lab",
  "waterway-lab",
];

// Product previews may render in local development for owner review, but they
// are not part of the production artifact until the product release gates are
// explicitly opened. Remove every locale variant and its client chunks.
const privatePreviewExportRoots = [
  "preview",
  "zh/preview",
  "ko/preview",
];

const sourceOnlyAssetRoots = [
  "images/guides/zhangjiajie/restored",
];

const forbiddenProductionMarkers = [
  ["internal product id", "zjj-4d3n-private-2026"],
  ["internal pricing decision id", "approved-public-pricing-20260815"],
  ["current internal pricing decision id", "approved-public-pricing-20260906"],
  ["English local-preview ribbon", "Local editorial preview"],
  ["Chinese local-preview ribbon", "本地文章预览"],
  ["Korean local-preview ribbon", "로컬 편집 미리보기"],
  ["internal product eligibility", "public_eligible"],
  ["internal pricing approval field", "approved_decision_id"],
  ["internal pricing source field", "pricing_source"],
  ["draft inclusion field", "draft_inclusions"],
  ["draft exclusion field", "draft_exclusions"],
  ["internal claim status field", "claim_status"],
  ["internal approved-price status", "approved_price_decision"],
  ["internal unconfirmed-claim status", "needs_confirmation"],
  ["internal working-claim status", "working_standard"],
];

// Next 15 requires at least one generated param for an otherwise empty static
// dynamic route. These exact soft-404 exports exist only until the first Lite
// article is added, so remove them from the production artifact.
const emptyGuideSentinelRoots = [
  "guides/__no-template-guides__",
  "zh/guides/__no-template-guides__",
];

const packageJson = JSON.parse(await readFile(packagePath, "utf8"));

if (packageJson.name !== "travel-china-with-xuan") {
  throw new Error(
    `Refusing to prune an unexpected project: ${packageJson.name ?? "unknown"}`,
  );
}

const outputStat = await lstat(outputRoot);

if (!outputStat.isDirectory() || outputStat.isSymbolicLink()) {
  throw new Error(`Refusing to prune unsafe export path: ${outputRoot}`);
}

for (const relativeRoot of labExportRoots) {
  const target = path.resolve(outputRoot, relativeRoot);

  if (path.dirname(target) !== outputRoot) {
    throw new Error(`Refusing to prune path outside export root: ${target}`);
  }

  await rm(target, { recursive: true, force: true });
}

for (const relativeRoot of privatePreviewExportRoots) {
  const target = path.resolve(outputRoot, relativeRoot);

  if (!target.startsWith(`${outputRoot}${path.sep}`)) {
    throw new Error(`Refusing to prune path outside export root: ${target}`);
  }

  await rm(target, { recursive: true, force: true });
}

for (const relativeRoot of sourceOnlyAssetRoots) {
  const target = path.resolve(outputRoot, relativeRoot);

  if (!target.startsWith(`${outputRoot}${path.sep}`)) {
    throw new Error(`Refusing to prune path outside export root: ${target}`);
  }

  await rm(target, { recursive: true, force: true });
}

for (const relativeRoot of emptyGuideSentinelRoots) {
  const target = path.resolve(outputRoot, relativeRoot);

  if (!target.startsWith(`${outputRoot}${path.sep}`)) {
    throw new Error(`Refusing to prune path outside export root: ${target}`);
  }

  await rm(target, { recursive: true, force: true });
}

const remainingLabRoots = (await readdir(outputRoot)).filter((entry) =>
  labExportRoots.includes(entry),
);

if (remainingLabRoots.length > 0) {
  throw new Error(
    `Experimental exports remain: ${remainingLabRoots.join(", ")}`,
  );
}

/*
 * Removing the lab HTML leaves its client chunks and its entries in
 * _ssgManifest.js behind. Nothing links to them, but they are still uploaded
 * and they still name unpublished routes, so the boundary clears them too.
 */
const labRouteGroupChunks = path.resolve(
  outputRoot,
  "_next/static/chunks/app/(lab)",
);

if (!labRouteGroupChunks.startsWith(`${outputRoot}${path.sep}`)) {
  throw new Error(
    `Refusing to prune path outside export root: ${labRouteGroupChunks}`,
  );
}

await rm(labRouteGroupChunks, { recursive: true, force: true });

for (const relativeChunkRoot of [
  "_next/static/chunks/app/(default)/preview",
  "_next/static/chunks/app/(localized)/[locale]/preview",
]) {
  const target = path.resolve(outputRoot, relativeChunkRoot);

  if (!target.startsWith(`${outputRoot}${path.sep}`)) {
    throw new Error(`Refusing to prune path outside export root: ${target}`);
  }

  await rm(target, { recursive: true, force: true });
}

const staticRoot = path.join(outputRoot, "_next", "static");
const buildDirectories = await readdir(staticRoot, { withFileTypes: true });
let prunedManifestEntries = 0;

for (const buildDirectory of buildDirectories) {
  if (!buildDirectory.isDirectory()) continue;

  const manifestPath = path.join(
    staticRoot,
    buildDirectory.name,
    "_ssgManifest.js",
  );

  let manifest;
  try {
    manifest = await readFile(manifestPath, "utf8");
  } catch {
    continue;
  }

  // Route names are escaped as / inside the manifest's Set literal.
  // Non-greedy to the first "])": route names contain "]" (e.g. /[locale]).
  const pruned = manifest.replace(
    /new Set\(\[(.*?)\]\)/,
    (_whole, body) => {
      const kept = (body ? body.split(",") : []).filter((entry) => {
        const route = entry
          .trim()
          .replace(/^"|"$/g, "")
          .replace(/\\u002F/g, "/");
        const isLabRoute = labExportRoots.includes(route.split("/")[1]);
        const isPrivatePreviewRoute = route
          .split("/")
          .filter(Boolean)
          .includes("preview");
        const isEmptyGuideSentinel = route.endsWith(
          "/guides/__no-template-guides__",
        );

        if (isLabRoute || isPrivatePreviewRoute || isEmptyGuideSentinel) {
          prunedManifestEntries += 1;
        }

        return !isLabRoute && !isPrivatePreviewRoute && !isEmptyGuideSentinel;
      });

      return `new Set([${kept.join(",")}])`;
    },
  );

  if (pruned !== manifest) {
    await writeFile(manifestPath, pruned, "utf8");
  }
}

async function scanExportDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isSymbolicLink()) {
      throw new Error(`Refusing to scan symlink in production export: ${entryPath}`);
    }

    if (entry.isDirectory()) {
      await scanExportDirectory(entryPath);
      continue;
    }

    if (!entry.isFile()) continue;

    const contents = await readFile(entryPath);
    for (const [label, marker] of forbiddenProductionMarkers) {
      if (contents.includes(Buffer.from(marker))) {
        throw new Error(
          `Forbidden ${label} remains in production export: ${path.relative(outputRoot, entryPath)}`,
        );
      }
    }
  }
}

// Scan only the completed static export. Server-side source and build caches
// intentionally remain outside this boundary.
await scanExportDirectory(outputRoot);

for (const requiredPage of [
  "index.html",
  "zh/index.html",
  "ko/index.html",
  "china-visa-free-uk-canada/index.html",
  "china-itinerary-review/index.html",
  "zh/china-itinerary-review/index.html",
  "ko/china-itinerary-review/index.html",
  "business-information/index.html",
  "terms/index.html",
  "refund-delivery/index.html",
  "zh/business-information/index.html",
  "zh/terms/index.html",
  "zh/refund-delivery/index.html",
  "ko/business-information/index.html",
  "ko/terms/index.html",
  "ko/refund-delivery/index.html",
  "guides/is-your-china-itinerary-too-rushed/index.html",
  "guides/china-entry-requirements/index.html",
  "guides/china-visa-free-uk-citizens-2026/index.html",
  "guides/china-240-hour-visa-free-transit-route-check/index.html",
  "guides/zhangjiajie-from-malaysia/index.html",
  "zh/guides/is-your-china-itinerary-too-rushed/index.html",
  "zh/guides/china-240-hour-visa-free-transit-route-check/index.html",
  "zh/guides/zhangjiajie-from-malaysia/index.html",
  "ko/guides/is-your-china-itinerary-too-rushed/index.html",
  "ko/guides/china-240-hour-visa-free-transit-route-check/index.html",
  "ko/guides/zhangjiajie-from-malaysia/index.html",
  "tours/index.html",
  "zh/tours/index.html",
  "ko/tours/index.html",
  "tours/zhangjiajie-4-day-private-tour/index.html",
  "zh/tours/zhangjiajie-4-day-private-tour/index.html",
  "ko/tours/zhangjiajie-4-day-private-tour/index.html",
]) {
  const requiredPath = path.join(outputRoot, requiredPage);
  const requiredStat = await lstat(requiredPath);

  if (!requiredStat.isFile()) {
    throw new Error(`Required production page is missing: ${requiredPage}`);
  }
}

for (const requiredAsset of [
  "images/guides/china-itinerary-reality/transfer-platform-soft-focus-1200.webp",
  "images/guides/china-itinerary-reality/transfer-platform-soft-focus-480.webp",
  "images/guides/china-itinerary-reality/transfer-platform-soft-focus-768.webp",
  "images/guides/china-itinerary-reality/train-cabin-soft-focus-480.webp",
  "images/guides/china-itinerary-reality/train-cabin-soft-focus-768.webp",
  "images/guides/china-itinerary-reality/train-cabin-soft-focus-1200.webp",
  "images/guides/china-itinerary-reality/airport-waiting-soft-focus-480.webp",
  "images/guides/china-itinerary-reality/airport-waiting-soft-focus-768.webp",
  "images/guides/china-itinerary-reality/airport-waiting-soft-focus-1200.webp",
  "images/guides/zhangjiajie-from-malaysia/misty-pillars-480.avif",
  "images/guides/zhangjiajie-from-malaysia/misty-pillars-768.webp",
  "images/guides/zhangjiajie-from-malaysia/misty-pillars-1200.jpg",
  "images/guides/zhangjiajie-from-malaysia/park-entrance-480.avif",
  "images/guides/zhangjiajie-from-malaysia/park-entrance-768.webp",
  "images/guides/zhangjiajie-from-malaysia/park-entrance-1200.jpg",
  "images/guides/zhangjiajie-from-malaysia/malaysia-zhangjiajie-card-1200.webp",
  "images/guides/zhangjiajie-from-malaysia/malaysia-zhangjiajie-og-1200.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-entry.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-01-twin-window.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-bathroom.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-double.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-twin-decorated.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-twin.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-double.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-living.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-terrace.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-twin.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-bathtub.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-colour-room.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-fireplace-room.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-four-poster.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-garden-lounge.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-lounge-detail.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-red-room.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-shower.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-suite.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-terrace.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-vanity.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/hero/forest-pillars-og-1200.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/hero/grand-canyon-glass-bridge.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/hero/sunlit-forest-pillars-174.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/hero/tianmen-cave-and-stairs.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/route/day-1-hehua-airport.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/route/day-2-bailong-elevator.jpg",
]) {
  const requiredPath = path.join(outputRoot, requiredAsset);
  const requiredStat = await lstat(requiredPath);

  if (!requiredStat.isFile()) {
    throw new Error(`Required production asset is missing: ${requiredAsset}`);
  }
}

for (const forbiddenAsset of [
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-bathroom.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/family-villa-recreation.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/city-candidate-02-exterior.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/signature-villa-exterior.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/city-nihao-twin.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/city-nihao-twin-entry.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/city-west-twin.jpg",
  "product-previews/zhangjiajie-4-day-private-tour/accommodations/city-west-double.jpg",
]) {
  const forbiddenPath = path.join(outputRoot, forbiddenAsset);

  try {
    await lstat(forbiddenPath);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      continue;
    }

    throw error;
  }

  throw new Error(`Withdrawn production asset is still exported: ${forbiddenAsset}`);
}

console.log(
  `✓ Production export excludes ${labExportRoots.length} experimental roots, ${privatePreviewExportRoots.length} private-preview roots, ${emptyGuideSentinelRoots.length} empty-guide sentinels (${prunedManifestEntries} manifest entries and unpublished client chunks removed), and ${sourceOnlyAssetRoots.length} source-only asset root; required tour pages/assets remain and ${forbiddenProductionMarkers.length} private markers are absent from out/.`,
);
