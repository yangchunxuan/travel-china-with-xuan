import type { Metadata } from "next";
import coreEntityRecords from "../content/entities/core-places.json" with { type: "json" };
import legacyIndexablePathBaseline from "../content/legacy-indexable-path-baseline.json" with { type: "json" };
import {
  buildContentManifest,
  getIndexableManifestEntries,
  getManifestEntriesByNodeId,
} from "./content-system/manifest";
import type {
  ContentManifestEntry,
  ContentNode,
  ContentRecordEnvelope,
  SiteLocale,
} from "./content-system/types";
import { getGuideEntry } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import { buildLegacySystemContentNodes } from "./legacySystemContentAdapter";
import {
  buildLegacyGuideContentNodes,
  buildSearchHubContentNodes,
  legacyGuideIdFromBodyResource,
} from "./searchPlatformContentAdapter";
import type { SearchSectionId } from "./searchPlatformI18n";

const SITE_URL = "https://homegroundchina.com";

function contentNodeRecord(node: ContentNode): ContentRecordEnvelope {
  return {
    schemaVersion: "1.0.0",
    recordType: "content-node",
    data: node,
  };
}

/**
 * Phase 0 runtime manifest.
 *
 * Existing bespoke guide pages remain the rendering source of truth. This
 * manifest is an adapter over those pages plus the new hub nodes, so there is
 * no second hand-maintained copy of their URLs or metadata.
 */
export const searchPlatformManifest = buildContentManifest([
  ...(coreEntityRecords as ContentRecordEnvelope[]),
  ...buildLegacySystemContentNodes().map(contentNodeRecord),
  ...buildSearchHubContentNodes().map(contentNodeRecord),
  ...buildLegacyGuideContentNodes().map(contentNodeRecord),
]);

export const LEGACY_INDEXABLE_URL_BASELINE = 76;
export const legacyIndexableManifestEntries = getIndexableManifestEntries(
  searchPlatformManifest,
).filter(
  (entry) =>
    entry.contentId.startsWith("guide-") || entry.contentId.startsWith("system-"),
);

if (legacyIndexableManifestEntries.length !== LEGACY_INDEXABLE_URL_BASELINE) {
  throw new Error(
    `Legacy URL parity failed: expected ${LEGACY_INDEXABLE_URL_BASELINE} indexable entries, received ${legacyIndexableManifestEntries.length}.`,
  );
}

const actualLegacyPaths = legacyIndexableManifestEntries
  .map((entry) => entry.path)
  .sort((left, right) => left.localeCompare(right, "en"));
const expectedLegacyPaths = [...legacyIndexablePathBaseline].sort((left, right) =>
  left.localeCompare(right, "en"),
);

if (JSON.stringify(actualLegacyPaths) !== JSON.stringify(expectedLegacyPaths)) {
  const expected = new Set(expectedLegacyPaths);
  const actual = new Set(actualLegacyPaths);
  const missing = expectedLegacyPaths.filter((path) => !actual.has(path));
  const unexpected = actualLegacyPaths.filter((path) => !expected.has(path));
  throw new Error(
    `Legacy URL parity failed. Missing: ${missing.join(", ") || "none"}. Unexpected: ${unexpected.join(", ") || "none"}.`,
  );
}

export function getSearchHubEntry(
  section: SearchSectionId,
  locale: HomegroundLocale,
): ContentManifestEntry {
  const entry = getManifestEntriesByNodeId(
    searchPlatformManifest,
    `hub-${section}`,
  ).find((candidate) => candidate.locale === locale);

  if (!entry) {
    throw new Error(`Missing search hub manifest entry: ${section}/${locale}`);
  }

  return entry;
}

export function getSearchHubLanguagePaths(section: SearchSectionId) {
  return Object.fromEntries(
    getManifestEntriesByNodeId(searchPlatformManifest, `hub-${section}`).map(
      (entry) => [entry.locale, entry.path],
    ),
  ) as Partial<Record<HomegroundLocale, string>>;
}

export function getSearchHubGuides(
  section: SearchSectionId,
  locale: HomegroundLocale,
) {
  return searchPlatformManifest.entries
    .filter(
      (entry) =>
        entry.section === section &&
        entry.locale === locale &&
        entry.contentId !== `hub-${section}` &&
        entry.status === "published" &&
        entry.indexability.index,
    )
    .flatMap((entry) => {
      const guideId = legacyGuideIdFromBodyResource(entry.bodyResource);
      return guideId ? [{ manifest: entry, guide: getGuideEntry(guideId, locale) }] : [];
    })
    .sort(
      (left, right) =>
        (right.manifest.dates.dateModified ?? "").localeCompare(
          left.manifest.dates.dateModified ?? "",
        ) || left.manifest.path.localeCompare(right.manifest.path),
    );
}

export function getIndexableSearchHubEntries() {
  return getIndexableManifestEntries(searchPlatformManifest).filter((entry) =>
    entry.contentId.startsWith("hub-"),
  );
}

export function getLegacyGuideManifestEntries() {
  return getIndexableManifestEntries(searchPlatformManifest).filter((entry) =>
    entry.bodyResource.startsWith("legacy-guide:"),
  );
}

export function getSearchHubMetadata(
  section: SearchSectionId,
  locale: HomegroundLocale,
): Metadata {
  const entry = getSearchHubEntry(section, locale);
  const leadGuide = getSearchHubGuides(section, locale)[0]?.guide;
  const alternateLocale = getManifestEntriesByNodeId(
    searchPlatformManifest,
    entry.contentId,
  )
    .filter((candidate) => candidate.locale !== locale)
    .map((candidate) => candidate.openGraphLocale)
    .filter((value): value is string => Boolean(value));
  const socialImage = leadGuide
    ? [
        {
          url: leadGuide.heroImageUrl,
          width: leadGuide.imageWidth,
          height: leadGuide.imageHeight,
          alt: leadGuide.heroAlt,
        },
      ]
    : undefined;

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical: entry.canonicalPath,
      languages: entry.alternates,
    },
    robots: {
      index: entry.status === "published" && entry.indexability.index,
      follow: entry.indexability.follow,
      googleBot: {
        index: entry.status === "published" && entry.indexability.index,
        follow: entry.indexability.follow,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: entry.h1,
      description: entry.description,
      type: "website",
      locale: entry.openGraphLocale ?? undefined,
      alternateLocale,
      url: entry.canonicalPath,
      images: socialImage,
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title: entry.h1,
      description: entry.description,
      images: socialImage?.map((image) => image.url),
    },
  };
}

export function absoluteManifestAlternates(entry: ContentManifestEntry) {
  return Object.fromEntries(
    Object.entries(entry.alternates).map(([language, path]) => [
      language,
      `${SITE_URL}${path}`,
    ]),
  );
}

export function siteLocaleForRuntime(locale: HomegroundLocale): SiteLocale {
  return locale;
}
