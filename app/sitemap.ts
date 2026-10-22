import { reservationGuideEditionLocales, reservationGuideEditionSlugs, reservationGuideEditionPath, reservationGuideEditionAlternates } from "../lib/reservationGuideEditionPaths";
import { entryRequirementsAlternates, entryRequirementsEditionLocales, entryRequirementsEditionPath, entryRequirementsEnglishPath, entryRequirementsLocalizedLocales } from "../lib/entryRequirementsEditionPaths";
import { arabicSitePagePathByEnglishPath } from "../lib/arabicEditionIndex";
import { corporateLocales, corporateHubPathFor, corporateTripPathFor } from "../lib/corporateTravelTypes";
import { corporateTrips } from "../lib/corporateTravel";
import type { MetadataRoute } from "next";
import { getIndexableManifestEntries } from "../lib/content-system/manifest";
import type { ContentManifestEntry } from "../lib/content-system/types";
import { getGuideEntry, getGuideLanguagePaths, type GuideId } from "../lib/guideRegistry";
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
import { spanishGuidePathBySourceId, spanishSitePagePathByEnglishPath } from "../lib/spanishEditionIndex";
import { spanishGuidePath, spanishGuides } from "../lib/spanishGuides";
import { spanishSite } from "../lib/spanishSite";
import { spanishTourPath, spanishTourSlugs } from "../lib/spanishTourCopy";
import { germanSitePagePathByEnglishPath } from "../lib/germanEditionIndex";
import { frenchSitePagePathByEnglishPath } from "../lib/frenchEditionIndex";
import { getPrivateTourHubLanguagePaths } from "../lib/privateTourHubI18n";
import { getPrivateTourHubLastModified } from "../lib/privateTourHubLifecycle";
import { getPrivateTourLanguagePaths } from "../lib/privateTourMetadata";
import { getPrivateTourPaths, privateTourProducts } from "../lib/privateTourProducts";
import { serviceDetailSlugs, serviceDetailSlugFromPath, serviceDetailAlternates, serviceEditionPath } from '../lib/serviceEdition';
import { isTourCollectionId, tourCollectionEditionLocales, tourCollectionEditionPath, tourCollectionIds, tourCollectionLanguagePaths } from "../lib/tourCollections";
import { sightsEditionPath, sightsHubLanguagePaths } from "../lib/sights";
import { travelInspirationEditionPath, travelInspirationHubLanguagePaths } from "../lib/travelInspiration";
import { destinationHubIds } from "../lib/destinationHubs";
import { destinationCityLanguagePaths, destinationEditionCityIds, destinationEditionCityPath, destinationEditionLocales } from "../lib/destinationEditions";

export const dynamic = "force-static";

const base = "https://homegroundchina.com";

function corporateAlternates(slug?: string) {
  const trip = corporateTrips.find((item) => item.slug === slug);
  const pathFor = (locale: (typeof corporateLocales)[number]) => trip ? corporateTripPathFor(locale, trip.slug) : corporateHubPathFor(locale);
  return Object.fromEntries([...corporateLocales.map((locale) => [locale === "zh" ? "zh-Hans" : locale, `${base}${pathFor(locale)}`]), ["x-default", `${base}${pathFor("en")}`]]);
}

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
    [
      guideAlternates,
      getGuideLanguagePaths("how-much-does-a-china-trip-cost"),
      ...reservationGuideEditionSlugs.map((slug) => getGuideLanguagePaths(slug as GuideId)),
      // Guides with a Spanish page carry it as an alternate too.
      ...Object.keys(spanishGuidePathBySourceId).map((id) => getGuideLanguagePaths(id as GuideId)),
    ].flatMap((alternates) =>
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
    fr: "/fr/tours/zhangjiajie-4-day-private-tour/",
    de: "/de/tours/zhangjiajie-4-day-private-tour/",
    ar: "/ar/tours/zhangjiajie-4-day-private-tour/",
    es: "/es/tours/zhangjiajie-4-day-private-tour/",
    "x-default": "/tours/zhangjiajie-4-day-private-tour/",
  };
  const halfDayAlternates = { ja: "/ja/tours/xian-terracotta-warriors-half-day-private-tour/", en: "/tours/xian-terracotta-warriors-half-day-private-tour/", "zh-Hans": "/zh/tours/xian-terracotta-warriors-half-day-private-tour/", ko: "/ko/tours/xian-terracotta-warriors-half-day-private-tour/", fr: "/fr/tours/xian-terracotta-warriors-half-day-private-tour/", de: "/de/tours/xian-terracotta-warriors-half-day-private-tour/", ar: "/ar/tours/xian-terracotta-warriors-half-day-private-tour/", es: "/es/tours/xian-terracotta-warriors-half-day-private-tour/", "x-default": "/tours/xian-terracotta-warriors-half-day-private-tour/" };
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
  // The Must-See Sights and Travel Inspiration hubs are also in French, Spanish, German, Arabic and Japanese,
  // and a city page in every edition language that has its content (lib/destinationEditions.ts).
  const destinationHubAlternateSets = [sightsHubLanguagePaths(), travelInspirationHubLanguagePaths(), ...destinationHubIds.map(destinationCityLanguagePaths)];
  const destinationHubAlternatesByPath = new Map(
    destinationHubAlternateSets.flatMap((alternates) => Object.values(alternates).map((path) => [path, alternates] as const)),
  );
  const manifestEntries = getIndexableManifestEntries(searchPlatformManifest).map((entry) => {
    const lastModified = sitemapLastModified(entry);
    const structuredTour = structuredTourByPath.get(entry.canonicalPath);
    const serviceSlug = serviceDetailSlugFromPath(entry.canonicalPath);
    const corporate = /^\/(?:zh\/|ko\/)?corporate-travel\/(?:([^/]+)\/)?$/.exec(entry.canonicalPath);
    // A tour collection's English, Chinese and Korean entries name its French, Spanish, German and Arabic copies too.
    const collectionId = /^\/(?:zh\/|ko\/)?tours\/([^/]+)\/$/.exec(entry.canonicalPath)?.[1];
    const alternates = entry.canonicalPath === entryRequirementsEnglishPath ? absoluteJaPilotAlternates(entryRequirementsAlternates()) : collectionId && isTourCollectionId(collectionId) ? absoluteJaPilotAlternates(tourCollectionLanguagePaths(collectionId)) : corporate ? corporateAlternates(corporate[1]) : serviceSlug ? absoluteJaPilotAlternates(serviceDetailAlternates(serviceSlug)) : destinationHubAlternatesByPath.has(entry.canonicalPath)
      ? absoluteJaPilotAlternates(destinationHubAlternatesByPath.get(entry.canonicalPath)!)
      : japaneseGuideAlternatesByPath.has(entry.canonicalPath)
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
        : Object.values(halfDayAlternates).includes(entry.canonicalPath) ? absoluteJaPilotAlternates(halfDayAlternates) : absoluteManifestAlternates(entry);

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
      lastModified: getPrivateTourHubLastModified("ja"),
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

  japaneseEntries.push({
    url: `${base}${halfDayAlternates.ja}`, lastModified: "2026-10-18", changeFrequency: "monthly", priority: 0.7,
    alternates: { languages: absoluteJaPilotAlternates(halfDayAlternates) },
  });

  const spanishModified = "2026-10-16";
  // Evan's French, German, Spanish and Arabic author pages, published together.
  const editionAuthorPublished = "2026-10-19";
  // The French, German, Spanish and Arabic destinations hubs, published together.
  const editionHubPublished = "2026-10-20";
  const editionSitePageModified = (en: string, modified: string) => (en === "/studio/evan/" ? editionAuthorPublished : en === "/explore/" ? editionHubPublished : modified);
  const editionSitePagePriority = (en: string, priority: number) => (en === "/studio/evan/" ? 0.4 : en === "/explore/" ? 0.7 : priority);
  const spanishEntries: MetadataRoute.Sitemap = [
    ...Object.entries(spanishSitePagePathByEnglishPath).map(([en,path]) => ({
      url: `${base}${path}`, lastModified: en === "/tours/" ? getPrivateTourHubLastModified("es") : editionSitePageModified(en, spanishModified),
      changeFrequency: "monthly" as const, priority: editionSitePagePriority(en, path === "/es/" ? 0.8 : 0.6),
      alternates: { languages: absoluteJaPilotAlternates(en === "/tours/" ? hubAlternates : japaneseAlternates(en, `/ja${en}`)) },
    })),
    { url: `${base}/es/contact/`, lastModified: spanishModified, changeFrequency: "monthly", priority: 0.5 },
    ...[legacyAlternates,halfDayAlternates].map(alternates => ({
      url: `${base}${alternates.es}`, lastModified: spanishModified, changeFrequency: "monthly" as const, priority: 0.7,
      alternates: { languages: absoluteJaPilotAlternates(alternates) },
    })),
    ...spanishTourSlugs.map(slug => {
      const product = privateTourProducts.find(candidate => candidate.slug === slug)!;
      return { url: `${base}${spanishTourPath(slug)}`, lastModified: product.dateModified > spanishModified ? product.dateModified : spanishModified,
        changeFrequency: "monthly" as const, priority: 0.7, alternates: { languages: absoluteJaPilotAlternates(getPrivateTourLanguagePaths(product)) } };
    }),
    ...spanishGuides.map(guide => ({
      url: `${base}${spanishGuidePath(guide.slug)}`, lastModified: guide.dateModified, changeFrequency: "monthly" as const, priority: 0.65,
      ...(guide.sourceGuideId ? { alternates: { languages: absoluteJaPilotAlternates(getGuideLanguagePaths(guide.sourceGuideId as GuideId)) } } : {}),
    })),
  ];
  const frenchEntries: MetadataRoute.Sitemap = [
    ...[legacyAlternates, halfDayAlternates].map(alternates => ({url: `${base}${alternates.fr}`, lastModified: "2026-10-16", changeFrequency: "monthly" as const, priority: 0.7, alternates: {languages: absoluteJaPilotAlternates(alternates)}})),
    ...Object.entries(frenchSitePagePathByEnglishPath).map(([en,path]) => ({
      url: `${base}${path}`, lastModified: editionSitePageModified(en, "2026-10-16"), changeFrequency: "monthly" as const, priority: editionSitePagePriority(en, path === "/fr/" ? 0.8 : 0.6),
      alternates: { languages: absoluteJaPilotAlternates(en === "/tours/" ? hubAlternates : japaneseAlternates(en, `/ja${en}`)) },
    })),
    { url: `${base}/fr/contact/`, lastModified: "2026-10-16", changeFrequency: "monthly", priority: 0.5 },
    ...privateTourProducts.map(product => ({
      url: `${base}/fr/tours/${product.slug}/`, lastModified: product.dateModified > "2026-10-16" ? product.dateModified : "2026-10-16", changeFrequency: "monthly" as const, priority: 0.7,
      alternates: { languages: absoluteJaPilotAlternates(getPrivateTourLanguagePaths(product)) },
    })),
  ];
  const germanEntries: MetadataRoute.Sitemap = [
    ...[legacyAlternates, halfDayAlternates].map(alternates => ({url: `${base}${alternates.de}`, lastModified: "2026-10-17", changeFrequency: "monthly" as const, priority: 0.7, alternates: {languages: absoluteJaPilotAlternates(alternates)}})),
    ...Object.entries(germanSitePagePathByEnglishPath).map(([en,path]) => ({
      url: `${base}${path}`, lastModified: editionSitePageModified(en, "2026-10-17"), changeFrequency: "monthly" as const, priority: editionSitePagePriority(en, path === "/de/" ? 0.8 : 0.6),
      alternates: { languages: absoluteJaPilotAlternates(en === "/tours/" ? hubAlternates : japaneseAlternates(en, `/ja${en}`)) },
    })),
    { url: `${base}/de/contact/`, lastModified: "2026-10-17", changeFrequency: "monthly", priority: 0.5 },
    ...privateTourProducts.map(product => ({
      url: `${base}/de/tours/${product.slug}/`, lastModified: product.dateModified > "2026-10-17" ? product.dateModified : "2026-10-17", changeFrequency: "monthly" as const, priority: 0.7,
      alternates: { languages: absoluteJaPilotAlternates(getPrivateTourLanguagePaths(product)) },
    })),
  ];
  const arabicEntries: MetadataRoute.Sitemap = [
    ...[legacyAlternates, halfDayAlternates].map(alternates => ({url: `${base}${alternates.ar}`, lastModified: "2026-10-17", changeFrequency: "monthly" as const, priority: 0.7, alternates: {languages: absoluteJaPilotAlternates(alternates)}})),
    ...Object.entries(arabicSitePagePathByEnglishPath).map(([en,path]) => ({
      url: `${base}${path}`, lastModified: editionSitePageModified(en, "2026-10-17"), changeFrequency: "monthly" as const, priority: editionSitePagePriority(en, path === "/ar/" ? 0.8 : 0.6),
      alternates: { languages: absoluteJaPilotAlternates(en === "/tours/" ? hubAlternates : japaneseAlternates(en, `/ja${en}`)) },
    })),
    { url: `${base}/ar/contact/`, lastModified: "2026-10-17", changeFrequency: "monthly", priority: 0.5 },
    ...privateTourProducts.map(product => ({
      url: `${base}/ar/tours/${product.slug}/`, lastModified: product.dateModified > "2026-10-17" ? product.dateModified : "2026-10-17", changeFrequency: "monthly" as const, priority: 0.7,
      alternates: { languages: absoluteJaPilotAlternates(getPrivateTourLanguagePaths(product)) },
    })),
  ];
  const serviceEditionEntries: MetadataRoute.Sitemap = (['fr', 'es', 'de', 'ar', 'ja'] as const).flatMap(language => serviceDetailSlugs.map(slug => ({
    url: `${base}${serviceEditionPath(language, slug)}`, lastModified: language === 'ja' ? '2026-10-18' : '2026-10-17', changeFrequency: 'monthly' as const, priority: 0.67,
    alternates: { languages: absoluteJaPilotAlternates(serviceDetailAlternates(slug)) },
  })));
  const corporateEditionEntries: MetadataRoute.Sitemap = corporateLocales.filter(locale => !["en", "zh", "ko"].includes(locale)).flatMap(locale => [undefined, ...corporateTrips.map(trip => trip.slug)].map(slug => ({
    url: `${base}${slug ? corporateTripPathFor(locale, slug) : corporateHubPathFor(locale)}`, changeFrequency: "monthly" as const, priority: 0.67,
    alternates: { languages: corporateAlternates(slug) },
  })));
  const tourCollectionEditionEntries: MetadataRoute.Sitemap = tourCollectionEditionLocales.flatMap(language => tourCollectionIds.map(id => ({
    url: `${base}${tourCollectionEditionPath(id, language)}`, lastModified: language === "ja" ? "2026-10-20" : "2026-10-19", changeFrequency: "weekly" as const, priority: 0.69,
    alternates: { languages: absoluteJaPilotAlternates(tourCollectionLanguagePaths(id)) },
  })));
  const destinationHubEditionEntries: MetadataRoute.Sitemap = (["fr", "es", "de", "ar", "ja"] as const).flatMap((language) => [
    { url: `${base}${sightsEditionPath[language]}`, languages: sightsHubLanguagePaths() },
    { url: `${base}${travelInspirationEditionPath[language]}`, languages: travelInspirationHubLanguagePaths() },
  ].map(({ url, languages }) => ({
    url, lastModified: "2026-10-19", changeFrequency: "monthly" as const, priority: 0.67,
    alternates: { languages: absoluteJaPilotAlternates(languages) },
  })));
  // City pages in the edition languages: one for each content file.
  const destinationCityEditionEntries: MetadataRoute.Sitemap = destinationEditionLocales.flatMap((language) => destinationEditionCityIds(language).map((city) => ({
    url: `${base}${destinationEditionCityPath(language, city)}`, lastModified: "2026-10-20", changeFrequency: "weekly" as const, priority: 0.73,
    alternates: { languages: absoluteJaPilotAlternates(destinationCityLanguagePaths(city)) },
  })));
  const reservationGuideEditionEntries: MetadataRoute.Sitemap = reservationGuideEditionLocales.flatMap(language => reservationGuideEditionSlugs.map(slug => ({url: `${base}${reservationGuideEditionPath(language,slug)}`,lastModified:"2026-10-19",changeFrequency:"monthly" as const,priority:0.6,alternates:{languages:absoluteJaPilotAlternates(reservationGuideEditionAlternates(slug))}})));
  // The seven full translations of the China entry hub, reciprocal with the English page.
  const entryRequirementsEditionEntries: MetadataRoute.Sitemap = [...entryRequirementsLocalizedLocales, ...entryRequirementsEditionLocales].map(language => ({url: `${base}${entryRequirementsEditionPath(language)}`,lastModified:language === "zh" || language === "ko" ? "2026-10-22" : "2026-10-19",changeFrequency:"weekly" as const,priority:0.7,alternates:{languages:absoluteJaPilotAlternates(entryRequirementsAlternates())}}));
  return [...reservationGuideEditionEntries, ...entryRequirementsEditionEntries, ...manifestEntries, ...guidePaginationEntries, ...japaneseEntries, ...spanishEntries, ...frenchEntries, ...germanEntries, ...arabicEntries, ...serviceEditionEntries, ...corporateEditionEntries, ...destinationHubEditionEntries, ...destinationCityEditionEntries, ...tourCollectionEditionEntries];
}
