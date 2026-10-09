import type { MetadataRoute } from "next";
import { getIndexableManifestEntries } from "../lib/content-system/manifest";
import type { ContentManifestEntry } from "../lib/content-system/types";
import { getGuideEntry, getGuideLanguagePaths } from "../lib/guideRegistry";
import {
  getGuidesHubIndexablePaginationPages,
  getGuidesHubPageLastModified,
} from "../lib/guidesHubPagination";
import {
  absoluteManifestAlternates,
  searchPlatformManifest,
} from "../lib/searchPlatformManifest";
import { legacyGuideIdFromBodyResource } from "../lib/searchPlatformContentAdapter";
import {
  absoluteJaPilotAlternates,
  jaPilot,
  jaPilotGuideAlternates,
  jaPilotTourAlternates,
} from "../lib/jaPilot";
import { japaneseAlternates } from "../lib/japaneseSite";
import { getPrivateTourHubLanguagePaths } from "../lib/privateTourHubI18n";
import { getPrivateTourLanguagePaths } from "../lib/privateTourMetadata";
import { getPrivateTourPaths, privateTourProducts } from "../lib/privateTourProducts";

export const dynamic = "force-static";

const base = "https://homegroundchina.com";

function sitemapPriority(entry: ContentManifestEntry) {
  if (entry.contentId === "system-home") return entry.locale === "en" ? 1 : 0.8;
  if (entry.contentId === "system-guides") return entry.locale === "en" ? 0.8 : 0.75;
  if (entry.contentId === "system-entry-requirements") return 0.8;
  if (entry.contentId.startsWith("destination-")) {
    return entry.locale === "en" ? 0.78 : 0.73;
  }
  if (entry.contentId.startsWith("hub-")) return entry.locale === "en" ? 0.75 : 0.7;
  if (entry.contentId.startsWith("collection-")) return entry.locale === "en" ? 0.72 : 0.67;
  if (entry.contentId.startsWith("guide-")) return entry.locale === "en" ? 0.7 : 0.65;
  if (entry.contentId.startsWith("tour-")) return entry.locale === "en" ? 0.75 : 0.7;
  if (entry.contentId === "system-studio") return entry.locale === "en" ? 0.7 : 0.65;
  if (entry.contentId === "system-author-evan") return entry.locale === "en" ? 0.68 : 0.63;
  if (entry.contentId === "system-itinerary-review") return entry.locale === "en" ? 0.65 : 0.6;
  if (entry.contentId === "system-attraction-reservations") return entry.locale === "en" ? 0.72 : 0.67;
  if (entry.contentId === "private-english-speaking-guides") return entry.locale === "en" ? 0.72 : 0.67;
  if (entry.contentId === "private-car-and-driver") return entry.locale === "en" ? 0.72 : 0.67;
  if (entry.contentId === "full-trip-support") return entry.locale === "en" ? 0.7 : 0.65;
  if (entry.contentId === "travel-inspiration") return entry.locale === "en" ? 0.72 : 0.67;
  if (entry.contentId.startsWith("travel-inspiration-")) return entry.locale === "en" ? 0.7 : 0.65;
  if (entry.contentId === "must-see-sights") return entry.locale === "en" ? 0.72 : 0.67;
  if (entry.contentId.startsWith("sight-")) return entry.locale === "en" ? 0.7 : 0.65;
  if (entry.contentId.startsWith("tour-collection-")) return entry.locale === "en" ? 0.74 : 0.69;
  if (entry.contentId === "system-zhangjiajie-4-day-private-tour") {
    return entry.locale === "en" ? 0.75 : 0.7;
  }
  return 0.3;
}

function changeFrequency(entry: ContentManifestEntry) {
  if (
    entry.contentId === "system-home" ||
    entry.contentId === "system-guides" ||
    entry.contentId === "system-entry-requirements" ||
    entry.contentId === "system-zhangjiajie-4-day-private-tour" ||
    entry.contentId.startsWith("hub-") ||
    entry.contentId.startsWith("collection-") ||
    entry.contentId.startsWith("destination-") ||
    entry.contentId.startsWith("tour-")
  ) {
    return "weekly" as const;
  }
  return "monthly" as const;
}

/**
 * Sitemap lastmod is a public-change signal. A review can be newer without
 * changing the rendered document, so lastReviewed must not manufacture a
 * lastmod date. Build and deployment time are deliberately excluded too.
 */
export function sitemapLastModified(entry: ContentManifestEntry) {
  if (entry.contentId.startsWith("guide-")) {
    const guideId = legacyGuideIdFromBodyResource(entry.bodyResource);
    if (guideId) return getGuideEntry(guideId, entry.locale).dateModified;
  }
  if (entry.contentId === "system-guides") {
    return (
      getGuidesHubPageLastModified(entry.locale, 1) ??
      entry.dates.dateModified ??
      entry.dates.datePublished ??
      undefined
    );
  }

  return entry.dates.dateModified ?? entry.dates.datePublished ?? undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const guideAlternates = jaPilotGuideAlternates();
  const tourAlternates = jaPilotTourAlternates();
  const japaneseGuideAlternatesByPath = new Map(
    [guideAlternates, getGuideLanguagePaths("how-much-does-a-china-trip-cost")].flatMap((alternates) =>
      Object.values(alternates).map((path) => [path, alternates] as const),
    ),
  );
  const tourPaths = new Set<string>(Object.values(tourAlternates));
  const hubAlternates = getPrivateTourHubLanguagePaths();
  const hubPaths = new Set<string>(Object.values(hubAlternates));
  const structuredTourByPath = new Map(
    privateTourProducts.flatMap((product) =>
      Object.values(getPrivateTourPaths(product.slug)).map((path) => [path, product] as const),
    ),
  );
  const legacyAlternates = {
    en: "/tours/zhangjiajie-4-day-private-tour/",
    "zh-Hans": "/zh/tours/zhangjiajie-4-day-private-tour/",
    ko: "/ko/tours/zhangjiajie-4-day-private-tour/",
    ja: "/ja/tours/zhangjiajie-4-day-private-tour/",
    "x-default": "/tours/zhangjiajie-4-day-private-tour/",
  };
  const legacyPaths = new Set<string>(Object.values(legacyAlternates));
  // Site pages with a Japanese equivalent; their EN/ZH/KO entries gain the ja alternate.
  const japaneseSitePages = [
    { en: "/", ja: "/ja/", changeFrequency: "weekly" as const, priority: 0.8 },
    { en: "/guides/", ja: "/ja/guides/", changeFrequency: "weekly" as const, priority: 0.7 },
    { en: "/services/", ja: "/ja/services/", changeFrequency: "monthly" as const, priority: 0.6 },
    { en: "/explore/", ja: "/ja/explore/", changeFrequency: "weekly" as const, priority: 0.7 },
    { en: "/studio/", ja: "/ja/studio/", changeFrequency: "monthly" as const, priority: 0.5 },
    { en: "/studio/evan/", ja: "/ja/studio/evan/", changeFrequency: "monthly" as const, priority: 0.4 },
    { en: "/business-information/", ja: "/ja/business-information/", changeFrequency: "yearly" as const, priority: 0.3 },
    { en: "/terms/", ja: "/ja/terms/", changeFrequency: "yearly" as const, priority: 0.3 },
    { en: "/refund-delivery/", ja: "/ja/refund-delivery/", changeFrequency: "yearly" as const, priority: 0.3 },
    { en: "/privacy/", ja: "/ja/privacy/", changeFrequency: "yearly" as const, priority: 0.3 },
  ].map((page) => ({ ...page, alternates: japaneseAlternates(page.en, page.ja) }));
  const japaneseSiteAlternatesByPath = new Map(
    japaneseSitePages.flatMap((page) =>
      Object.values(page.alternates).map((path) => [path, page.alternates] as const),
    ),
  );
  const manifestEntries = getIndexableManifestEntries(searchPlatformManifest).map((entry) => {
    const lastModified = sitemapLastModified(entry);
    const structuredTour = structuredTourByPath.get(entry.canonicalPath);
    const alternates = japaneseGuideAlternatesByPath.has(entry.canonicalPath)
      ? absoluteJaPilotAlternates(japaneseGuideAlternatesByPath.get(entry.canonicalPath)!)
      : structuredTour
        ? absoluteJaPilotAlternates(getPrivateTourLanguagePaths(structuredTour))
        : tourPaths.has(entry.canonicalPath)
          ? absoluteJaPilotAlternates(tourAlternates)
          : hubPaths.has(entry.canonicalPath)
            ? absoluteJaPilotAlternates(hubAlternates)
            : legacyPaths.has(entry.canonicalPath)
              ? absoluteJaPilotAlternates(legacyAlternates)
              : japaneseSiteAlternatesByPath.has(entry.canonicalPath)
                ? absoluteJaPilotAlternates(japaneseSiteAlternatesByPath.get(entry.canonicalPath)!)
        : absoluteManifestAlternates(entry);

    return {
      url: `${base}${entry.canonicalPath}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: changeFrequency(entry),
      priority: sitemapPriority(entry),
      alternates: { languages: alternates },
    };
  });

  const guidePaginationEntries = getGuidesHubIndexablePaginationPages().map(
    ({ locale, path, lastModified, languages }) => ({
      url: `${base}${path}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: "weekly" as const,
      priority: locale === "en" ? 0.7 : 0.65,
      alternates: { languages },
    }),
  );

  const japaneseEntries: MetadataRoute.Sitemap = [
    ...japaneseSitePages.map((page) => ({
      url: `${base}${page.ja}`,
      lastModified: "2026-09-27",
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: absoluteJaPilotAlternates(page.alternates) },
    })),
    {
      url: `${base}/ja/tours/`,
      lastModified: "2026-09-27",
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: absoluteJaPilotAlternates(hubAlternates) },
    },
    {
      url: `${base}${jaPilot.guide}`,
      lastModified: "2026-09-26",
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: { languages: absoluteJaPilotAlternates(guideAlternates) },
    },
    {
      url: `${base}/ja/guides/how-much-does-a-china-trip-cost/`,
      lastModified: "2026-09-29",
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: { languages: absoluteJaPilotAlternates(getGuideLanguagePaths("how-much-does-a-china-trip-cost")) },
    },
    {
      url: `${base}${jaPilot.tour}`,
      lastModified: "2026-09-26",
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: absoluteJaPilotAlternates(tourAlternates) },
    },
    ...privateTourProducts
      .filter((product) => product.slug !== jaPilot.tourSlug)
      .map((product) => ({
        url: `${base}/ja/tours/${product.slug}/`,
        lastModified: product.dateModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
        alternates: { languages: absoluteJaPilotAlternates(getPrivateTourLanguagePaths(product)) },
      })),
    {
      url: `${base}${legacyAlternates.ja}`,
      lastModified: "2026-09-27",
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: absoluteJaPilotAlternates(legacyAlternates) },
    },
  ];

  return [...manifestEntries, ...guidePaginationEntries, ...japaneseEntries];
}
