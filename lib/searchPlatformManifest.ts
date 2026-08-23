import type { Metadata } from "next";
import coreEntityRecords from "../content/entities/core-places.json" with { type: "json" };
import legacyIndexablePathBaseline from "../content/legacy-indexable-path-baseline.json" with { type: "json" };
import phase0IndexablePathBaseline from "../content/phase0-indexable-path-baseline.json" with { type: "json" };
import indexabilityMigrations from "../content/search-platform-indexability-migrations.json" with { type: "json" };
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
import { buildDestinationHubContentNodes } from "./destinationHubContentAdapter";
import {
  getDestinationHubEntry,
  type DestinationHubId,
} from "./destinationHubs";
import { getGuideEntry } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import {
  getGuideCollectionId,
  type SearchCollectionId,
} from "./searchCollectionI18n";
import { buildLegacySystemContentNodes } from "./legacySystemContentAdapter";
import { buildPrivateTourContentNodes } from "./privateTourContentAdapter";
import {
  buildLegacyGuideContentNodes,
  buildSearchCollectionContentNodes,
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
  ...buildSearchCollectionContentNodes().map(contentNodeRecord),
  ...buildDestinationHubContentNodes().map(contentNodeRecord),
  ...buildPrivateTourContentNodes().map(contentNodeRecord),
  ...buildLegacyGuideContentNodes().map(contentNodeRecord),
]);

export const LEGACY_INDEXABLE_URL_BASELINE = 76;
export const legacyIndexableManifestEntries = getIndexableManifestEntries(
  searchPlatformManifest,
).filter(
  (entry) =>
    entry.contentId.startsWith("guide-") || entry.contentId.startsWith("system-"),
);

const actualLegacyPaths = legacyIndexableManifestEntries
  .map((entry) => entry.path)
  .sort((left, right) => left.localeCompare(right, "en"));
const expectedLegacyPaths = [...legacyIndexablePathBaseline].sort((left, right) =>
  left.localeCompare(right, "en"),
);

const actualLegacyPathSet = new Set(actualLegacyPaths);
const missingLegacyPaths = expectedLegacyPaths.filter(
  (path) => !actualLegacyPathSet.has(path),
);

if (missingLegacyPaths.length > 0) {
  throw new Error(
    `Legacy URL parity failed. Missing protected path(s): ${missingLegacyPaths.join(", ")}. Additive guide paths are allowed; deleting or moving a protected path needs an explicit migration.`,
  );
}

/**
 * Phase 1 migration guard.
 *
 * This snapshot was reviewed from the formal Phase 0 implementation commit.
 * It deliberately records the nine preview-only hub routes as noindex as well
 * as the 94 indexable routes, so later work cannot silently publish, deindex,
 * move, or remove a Phase 0 system page, guide, or hub.
 */
export const PHASE0_SEARCH_PLATFORM_SOURCE_COMMIT =
  "4e18043a3dd69d0050034bdd92ade40246bc6fc9";
export const PHASE0_MANIFEST_ENTRY_BASELINE = 103;
export const PHASE0_INDEXABLE_PATH_BASELINE = 94;

function phase0EntryKind(contentId: string) {
  if (contentId.startsWith("system-")) return "system";
  if (contentId.startsWith("guide-")) return "guide";
  if (contentId.startsWith("hub-")) return "hub";
  return null;
}

const actualPhase0Entries = searchPlatformManifest.entries
  .flatMap((entry) => {
    const kind = phase0EntryKind(entry.contentId);
    if (!kind) return [];

    return [
      {
        contentId: entry.contentId,
        kind,
        locale: entry.locale,
        path: entry.path,
        status: entry.status,
        indexability: {
          index: entry.indexability.index,
          follow: entry.indexability.follow,
          ...(entry.indexability.blockReason
            ? { blockReason: entry.indexability.blockReason }
            : {}),
        },
      },
    ];
  })
  .sort(
    (left, right) =>
      left.path.localeCompare(right.path, "en") ||
      left.contentId.localeCompare(right.contentId, "en") ||
      left.locale.localeCompare(right.locale, "en"),
  );

if (
  phase0IndexablePathBaseline.sourceCommit !==
  PHASE0_SEARCH_PLATFORM_SOURCE_COMMIT
) {
  throw new Error(
    `Phase 0 baseline source commit mismatch: expected ${PHASE0_SEARCH_PLATFORM_SOURCE_COMMIT}, received ${phase0IndexablePathBaseline.sourceCommit}.`,
  );
}

if (
  phase0IndexablePathBaseline.entryCount !==
    PHASE0_MANIFEST_ENTRY_BASELINE ||
  phase0IndexablePathBaseline.indexablePathCount !==
    PHASE0_INDEXABLE_PATH_BASELINE ||
  phase0IndexablePathBaseline.entries.length !== PHASE0_MANIFEST_ENTRY_BASELINE
) {
  throw new Error(
    "The committed Phase 0 baseline file no longer matches its reviewed counts.",
  );
}

const actualPhase0ByKey = new Map(
  actualPhase0Entries.map((entry) => [`${entry.contentId}::${entry.locale}`, entry]),
);
const phase0MigrationsByContentId = new Map(
  indexabilityMigrations.migrations.map((migration) => [migration.contentId, migration]),
);

if (phase0MigrationsByContentId.size !== indexabilityMigrations.migrations.length) {
  throw new Error("Duplicate contentId in search-platform indexability migrations.");
}

for (const migration of indexabilityMigrations.migrations) {
  if (!phase0IndexablePathBaseline.entries.some((entry) => entry.contentId === migration.contentId)) {
    throw new Error(
      `Indexability migration references an unknown Phase 0 contentId: ${migration.contentId}.`,
    );
  }
}

const changedPhase0Entries = phase0IndexablePathBaseline.entries.flatMap(
  (expected) => {
    const actual = actualPhase0ByKey.get(
      `${expected.contentId}::${expected.locale}`,
    );
    const migration = phase0MigrationsByContentId.get(expected.contentId);

    if (migration) {
      const migrationStartsAtBaseline =
        expected.status === migration.from.status &&
        expected.indexability.index === migration.from.index &&
        expected.indexability.follow === migration.from.follow;
      const migrationReachedReviewedTarget =
        actual?.contentId === expected.contentId &&
        actual.kind === expected.kind &&
        actual.locale === expected.locale &&
        actual.path === expected.path &&
        actual.status === migration.to.status &&
        actual.indexability.index === migration.to.index &&
        actual.indexability.follow === migration.to.follow;

      return migrationStartsAtBaseline && migrationReachedReviewedTarget
        ? []
        : [expected.path];
    }

    return !actual || JSON.stringify(actual) !== JSON.stringify(expected)
      ? [expected.path]
      : [];
  },
);

if (changedPhase0Entries.length > 0) {
  throw new Error(
    `Phase 0 search-platform parity failed for protected path(s): ${changedPhase0Entries.join(", ")}. New article entries are allowed; changing a protected entry needs an explicit migration.`,
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
  const pinnedLeadGuideId =
    section === "transport" && locale === "en"
      ? "first-trip-china-airport-station-stay-map"
      : undefined;

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
        Number(right.guide.id === pinnedLeadGuideId) -
          Number(left.guide.id === pinnedLeadGuideId) ||
        (right.manifest.dates.dateModified ?? "").localeCompare(
          left.manifest.dates.dateModified ?? "",
        ) || left.manifest.path.localeCompare(right.manifest.path),
    );
}

export function getSearchCollectionEntry(
  collectionId: SearchCollectionId,
  locale: HomegroundLocale,
): ContentManifestEntry {
  const entry = getManifestEntriesByNodeId(
    searchPlatformManifest,
    `collection-${collectionId}`,
  ).find((candidate) => candidate.locale === locale);

  if (!entry) {
    throw new Error(`Missing search collection manifest entry: ${collectionId}/${locale}`);
  }

  return entry;
}

export function getSearchCollectionLanguagePaths(
  collectionId: SearchCollectionId,
) {
  return Object.fromEntries(
    getManifestEntriesByNodeId(
      searchPlatformManifest,
      `collection-${collectionId}`,
    ).map((entry) => [entry.locale, entry.path]),
  ) as Partial<Record<HomegroundLocale, string>>;
}

export function getSearchCollectionGuides(
  collectionId: SearchCollectionId,
  locale: HomegroundLocale,
) {
  return searchPlatformManifest.entries
    .filter(
      (entry) =>
        entry.locale === locale &&
        entry.status === "published" &&
        entry.indexability.index &&
        entry.contentId.startsWith("guide-") &&
        entry.contentId !== `collection-${collectionId}`,
    )
    .flatMap((entry) => {
      const guideId = legacyGuideIdFromBodyResource(entry.bodyResource);
      if (!guideId) return [];
      const guide = getGuideEntry(guideId, locale);
      return getGuideCollectionId(guide) === collectionId
        ? [{ manifest: entry, guide }]
        : [];
    })
    .sort(
      (left, right) =>
        (right.manifest.dates.dateModified ?? "").localeCompare(
          left.manifest.dates.dateModified ?? "",
        ) || left.manifest.path.localeCompare(right.manifest.path),
    );
}

export function getSearchCollectionMetadata(
  collectionId: SearchCollectionId,
  locale: HomegroundLocale,
): Metadata {
  const entry = getSearchCollectionEntry(collectionId, locale);
  const leadGuide = getSearchCollectionGuides(collectionId, locale)[0]?.guide;
  const alternateLocale = getManifestEntriesByNodeId(
    searchPlatformManifest,
    entry.contentId,
  )
    .filter((candidate) => candidate.locale !== locale)
    .map((candidate) => candidate.openGraphLocale)
    .filter((value): value is string => Boolean(value));
  const socialImage = leadGuide
    ? [{
        url: leadGuide.heroImageUrl,
        width: leadGuide.imageWidth,
        height: leadGuide.imageHeight,
        alt: leadGuide.heroAlt,
      }]
    : undefined;

  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: entry.canonicalPath, languages: entry.alternates },
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

export function getIndexableSearchHubEntries() {
  return getIndexableManifestEntries(searchPlatformManifest).filter((entry) =>
    entry.contentId.startsWith("hub-"),
  );
}

export function getLegacyGuideManifestEntries() {
  return getIndexableManifestEntries(searchPlatformManifest).filter((entry) =>
    entry.bodyResource.startsWith("guide:") ||
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

export function getDestinationHubManifestEntry(
  hubId: DestinationHubId,
  locale: HomegroundLocale,
): ContentManifestEntry {
  const entry = getManifestEntriesByNodeId(
    searchPlatformManifest,
    `destination-${hubId}`,
  ).find((candidate) => candidate.locale === locale);

  if (!entry) {
    throw new Error(`Missing destination hub manifest entry: ${hubId}/${locale}`);
  }

  return entry;
}

export function getDestinationHubMetadata(
  hubId: DestinationHubId,
  locale: HomegroundLocale,
): Metadata {
  const entry = getDestinationHubManifestEntry(hubId, locale);
  const hub = getDestinationHubEntry(hubId, locale);
  const alternateLocale = getManifestEntriesByNodeId(
    searchPlatformManifest,
    entry.contentId,
  )
    .filter((candidate) => candidate.locale !== locale)
    .map((candidate) => candidate.openGraphLocale)
    .filter((value): value is string => Boolean(value));
  const socialImage = [
    {
      url: hub.heroImageUrl,
      width: hub.imageWidth,
      height: hub.imageHeight,
      alt: hub.heroAlt,
    },
  ];

  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: entry.canonicalPath, languages: entry.alternates },
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
      card: "summary_large_image",
      title: entry.h1,
      description: entry.description,
      images: socialImage.map((image) => image.url),
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
