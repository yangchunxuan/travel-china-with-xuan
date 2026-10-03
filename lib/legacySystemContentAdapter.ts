import { getGuidesHubCopy } from "../app/(default)/guides/guidesHubI18n";
import { getChinaItineraryReviewCopy } from "./chinaItineraryReviewI18n";
import type {
  ContentFamily,
  ContentIntent,
  ContentNode,
  ContentSection,
  LocaleVersion,
  SchemaLocale,
} from "./content-system/types";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "./homegroundI18n";
import {
  getHomegroundLegalCopy,
  homegroundLegalPageIds,
} from "./homegroundLegalI18n";
import { getHomegroundPrivacyCopy } from "./homegroundPrivacyI18n";
import { getHomegroundStudioCopy } from "./homegroundStudioI18n";
import {
  getLegacySystemContentLifecycle,
  type LegacySystemContentId,
  type LegacySystemContentLifecycleRecord,
} from "./legacySystemContentLifecycle";
import { getEditorialAuthor } from "./editorialIdentity";
import { attractionReservationPath } from "./attractionReservations";
import { getAttractionReservationCopy } from "./attractionReservationsI18n";
import { privateGuideCities, privateGuideServicePath } from "./privateGuideServices";
import { getPrivateGuideServiceCopy } from "./privateGuideServicesI18n";
import { fullTripSupportPath } from "./fullTripSupport";
import { getFullTripSupportCopy } from "./fullTripSupportI18n";
import { travelInspirationPath, travelInspirationThemePath, travelInspirationThemes } from "./travelInspiration";
import { sightPath, sights, sightsPath } from "./sights";
import { getSightsCopy } from "./sightsI18n";
import { getTravelInspirationCopy } from "./travelInspirationI18n";
import {
  productPreviewCopy,
  zhangjiajiePrivateTourPaths,
} from "./zhangjiajiePrivateTourPreview";

const locales = ["en", "zh", "ko"] as const;
const schemaLocale: Record<HomegroundLocale, SchemaLocale> = {
  en: "en",
  zh: "zh-Hans",
  ko: "ko",
};

interface SystemLocaleDefinition {
  path: string;
  title: string;
  description: string;
  h1: string;
  openGraphLocale?: string;
}

function localizedVersions(
  id: string,
  definitions: Partial<Record<HomegroundLocale, SystemLocaleDefinition>>,
) {
  return Object.fromEntries(
    Object.entries(definitions).map(([locale, definition]) => [
      schemaLocale[locale as HomegroundLocale],
      {
        path: definition.path,
        title: definition.title,
        description: definition.description,
        h1: definition.h1,
        bodyResource: `legacy-system:${id}`,
        localizationStatus: locale === "en" ? "source" : "localized",
        openGraphLocale:
          definition.openGraphLocale ??
          (locale === "en" ? "en_US" : locale === "zh" ? "zh_CN" : "ko_KR"),
        ctaId: "trip-brief",
      } satisfies LocaleVersion,
    ]),
  ) as ContentNode["locales"];
}

function systemNode({
  id,
  section,
  family,
  primaryIntent,
  definitions,
  lifecycle,
  schemaTypes = ["WebPage"],
  legacyAliases = [],
  entityIds = ["country-china"],
  parentContentId = null,
  volatility = "low",
  refreshCadence = "on-source-change",
  nextReviewAt,
  indexability = { index: true, follow: true },
}: {
  id: LegacySystemContentId;
  section: ContentSection;
  family: ContentFamily;
  primaryIntent: ContentIntent;
  definitions: Partial<Record<HomegroundLocale, SystemLocaleDefinition>>;
  lifecycle: LegacySystemContentLifecycleRecord;
  schemaTypes?: readonly string[];
  legacyAliases?: readonly string[];
  entityIds?: readonly string[];
  parentContentId?: string | null;
  volatility?: ContentNode["updatePolicy"]["volatility"];
  refreshCadence?: ContentNode["updatePolicy"]["refreshCadence"];
  nextReviewAt?: string;
  indexability?: ContentNode["indexability"];
}): ContentNode {
  return {
    id: `system-${id}`,
    section,
    family,
    primaryIntent,
    entityIds,
    relationIds: [],
    parentContentId,
    status: "published",
    indexability,
    locales: localizedVersions(id, definitions),
    factIds: [],
    sourceIds: [],
    mediaIds: [],
    schemaTypes,
    legacyAliases,
    dates: {
      datePublished: lifecycle.datePublished,
      dateModified: lifecycle.dateModified,
      lastReviewed: lifecycle.lastReviewed,
    },
    updatePolicy: {
      volatility,
      refreshCadence,
      owner: "homeground-platform",
      ...(nextReviewAt ? { nextReviewAt } : {}),
    },
  };
}

export function buildLegacySystemContentNodes(): ContentNode[] {
  const home = Object.fromEntries(
    locales.map((locale) => {
      const copy = getHomegroundCopy(locale);
      return [
        locale,
        {
          path: copy.path,
          title: copy.metadata.title,
          description: copy.metadata.description,
          h1: copy.hero.title,
        },
      ];
    }),
  );
  const studio = Object.fromEntries(
    locales.map((locale) => {
      const copy = getHomegroundStudioCopy(locale);
      return [
        locale,
        {
          path: copy.path,
          title: copy.metadata.title,
          description: copy.metadata.description,
          h1: copy.title,
        },
      ];
    }),
  );
  const evan = Object.fromEntries(
    locales.map((locale) => {
      const author = getEditorialAuthor(locale);
      return [
        locale,
        {
          path: author.path,
          title: author.copy.title,
          description: author.copy.introduction,
          h1: author.copy.h1,
        },
      ];
    }),
  );
  const guides = Object.fromEntries(
    locales.map((locale) => {
      const copy = getGuidesHubCopy(locale);
      return [
        locale,
        {
          path: copy.path,
          title: copy.metadata.title,
          description: copy.metadata.description,
          h1: copy.title,
        },
      ];
    }),
  );
  const itineraryReview = Object.fromEntries(
    locales.map((locale) => {
      const copy = getChinaItineraryReviewCopy(locale);
      return [
        locale,
        {
          path: copy.path,
          title: copy.metadata.title,
          description: copy.metadata.description,
          h1: copy.hero.title,
        },
      ];
    }),
  );
  const zhangjiajiePrivateTour = {
    en: {
      path: zhangjiajiePrivateTourPaths.en,
      title: productPreviewCopy.en.metadataTitle,
      description: productPreviewCopy.en.metadataDescription,
      h1: productPreviewCopy.en.heroTitle,
      openGraphLocale: "en_US",
    },
    zh: {
      path: zhangjiajiePrivateTourPaths.zh,
      title: productPreviewCopy.zh.metadataTitle,
      description: productPreviewCopy.zh.metadataDescription,
      h1: productPreviewCopy.zh.heroTitle,
      openGraphLocale: "zh_CN",
    },
    ko: {
      path: zhangjiajiePrivateTourPaths.ko,
      title: productPreviewCopy.ko.metadataTitle,
      description: productPreviewCopy.ko.metadataDescription,
      h1: productPreviewCopy.ko.heroTitle,
      openGraphLocale: "ko_KR",
    },
  };
  const privacy = Object.fromEntries(
    locales.map((locale) => {
      const copy = getHomegroundPrivacyCopy(locale);
      return [
        locale,
        {
          path: copy.pagePath,
          title: copy.metadata.title,
          description: copy.metadata.description,
          h1: copy.hero.title,
        },
      ];
    }),
  );

  const attractionReservations = Object.fromEntries(
    locales.map((locale) => {
      const copy = getAttractionReservationCopy(locale);
      return [
        locale,
        {
          path: attractionReservationPath[locale],
          title: copy.metadata.title,
          description: copy.lede,
          h1: copy.h1,
        },
      ];
    }),
  );

  const privateGuides = Object.fromEntries(
    locales.map((locale) => {
      const copy = getPrivateGuideServiceCopy(locale);
      return [
        locale,
        {
          path: privateGuideServicePath[locale],
          title: copy.metadata.title,
          description: copy.metadata.description,
          h1: copy.h1,
        },
      ];
    }),
  );

  // An additive, indexable service route prepared for release. It is not a
  // legacy publication event: do not invent a release date or commit evidence.
  const privateGuidesNode: ContentNode = {
    id: "private-english-speaking-guides",
    section: "services",
    family: "service",
    primaryIntent: "purchase",
    entityIds: privateGuideCities.map((city) => `city-${city}`),
    relationIds: [],
    parentContentId: "hub-services",
    status: "published",
    indexability: { index: true, follow: true },
    locales: localizedVersions("private-english-speaking-guides", privateGuides),
    factIds: [],
    sourceIds: [],
    mediaIds: [],
    schemaTypes: ["WebPage", "Service", "FAQPage"],
    legacyAliases: [],
    dates: {},
    updatePolicy: {
      volatility: "high",
      refreshCadence: "monthly",
      owner: "homeground-platform",
    },
  };

  const fullTrip = Object.fromEntries(
    locales.map((locale) => {
      const copy = getFullTripSupportCopy(locale);
      return [
        locale,
        {
          path: fullTripSupportPath[locale],
          title: copy.metadata.title,
          description: copy.metadata.description,
          h1: copy.h1,
        },
      ];
    }),
  );

  // Additive service route (custom quote): like the guide service, it is not a
  // legacy publication event, so it carries no invented release date.
  const fullTripNode: ContentNode = {
    id: "full-trip-support",
    section: "services",
    family: "service",
    primaryIntent: "purchase",
    entityIds: ["country-china"],
    relationIds: [],
    parentContentId: "hub-services",
    status: "published",
    indexability: { index: true, follow: true },
    locales: localizedVersions("full-trip-support", fullTrip),
    factIds: [],
    sourceIds: [],
    mediaIds: [],
    schemaTypes: ["WebPage", "Service", "FAQPage"],
    legacyAliases: [],
    dates: {},
    updatePolicy: {
      volatility: "medium",
      refreshCadence: "quarterly",
      owner: "homeground-platform",
    },
  };

  // Travel inspiration (Destinations menu): additive pages like the services
  // above, so no invented release date. Themes sit under the inspiration hub.
  const inspirationNode = (
    id: string,
    parentContentId: string,
    versions: ReturnType<typeof inspirationVersions>,
  ): ContentNode => ({
    id,
    section: "explore",
    family: "combined-decision",
    primaryIntent: "plan",
    entityIds: ["country-china"],
    relationIds: [],
    parentContentId,
    status: "published",
    indexability: { index: true, follow: true },
    locales: localizedVersions(id, versions),
    factIds: [],
    sourceIds: [],
    mediaIds: [],
    schemaTypes: ["CollectionPage", "ItemList"],
    legacyAliases: [],
    dates: {},
    updatePolicy: {
      volatility: "medium",
      refreshCadence: "quarterly",
      owner: "homeground-platform",
    },
  });
  function inspirationVersions(
    page: (locale: HomegroundLocale) => { path: string; title: string; description: string; h1: string },
  ) {
    return Object.fromEntries(locales.map((locale) => [locale, page(locale)]));
  }
  const inspirationNodes = [
    inspirationNode("travel-inspiration", "hub-explore", inspirationVersions((locale) => {
      const copy = getTravelInspirationCopy(locale).hub;
      return { path: travelInspirationPath[locale], ...copy.metadata, h1: copy.h1 };
    })),
    ...travelInspirationThemes.map((theme) =>
      inspirationNode(`travel-inspiration-${theme.id}`, "travel-inspiration", inspirationVersions((locale) => {
        const copy = getTravelInspirationCopy(locale).themes[theme.id];
        return { path: travelInspirationThemePath(theme.id, locale), ...copy.metadata, h1: copy.h1Lines.join(locale === "zh" ? "" : " ") };
      })),
    ),
  ];

  // Must-see Sights (Destinations menu): the hub is indexed; a sight page is
  // indexed only once its own writing is in (`ready`), so a page of links
  // never competes with the guide it points to.
  const sightNodes: ContentNode[] = [
    {
      ...inspirationNode("must-see-sights", "hub-explore", inspirationVersions((locale) => {
        const copy = getSightsCopy(locale).hub;
        return { path: sightsPath[locale], ...copy.metadata, h1: copy.h1 };
      })),
      family: "entity",
      primaryIntent: "understand",
    },
    ...sights.map((sight): ContentNode => ({
      ...inspirationNode(`sight-${sight.id}`, "must-see-sights", inspirationVersions((locale) => {
        const copy = getSightsCopy(locale);
        const name = copy.sights[sight.id].name;
        return { path: sightPath(sight.id, locale), title: `${name} · ${copy.hub.h1}`, description: copy.sights[sight.id].line, h1: name };
      })),
      family: "entity",
      primaryIntent: "understand",
      schemaTypes: ["WebPage", "TouristAttraction"],
      indexability: sight.ready
        ? { index: true, follow: true }
        : { index: false, follow: true, blockReason: "Framework page: indexed once the sight's own writing is added." },
    })),
  ];

  const nodes = [
    privateGuidesNode,
    fullTripNode,
    ...inspirationNodes,
    ...sightNodes,
    systemNode({
      id: "home",
      section: "explore",
      family: "entity",
      primaryIntent: "understand",
      definitions: home,
      lifecycle: getLegacySystemContentLifecycle("home"),
      schemaTypes: ["WebPage", "WebSite"],
    }),
    systemNode({
      id: "studio",
      section: "services",
      family: "service",
      primaryIntent: "purchase",
      definitions: studio,
      lifecycle: getLegacySystemContentLifecycle("studio"),
      schemaTypes: ["AboutPage"],
      parentContentId: "system-home",
    }),
    systemNode({
      id: "author-evan",
      section: "services",
      family: "entity",
      primaryIntent: "understand",
      definitions: evan,
      lifecycle: getLegacySystemContentLifecycle("author-evan"),
      schemaTypes: ["ProfilePage", "Person"],
      parentContentId: "system-studio",
    }),
    systemNode({
      id: "guides",
      section: "explore",
      family: "entity",
      primaryIntent: "understand",
      definitions: guides,
      lifecycle: getLegacySystemContentLifecycle("guides"),
      schemaTypes: ["CollectionPage", "ItemList"],
      parentContentId: "system-home",
    }),
    systemNode({
      id: "itinerary-review",
      section: "services",
      family: "service",
      primaryIntent: "purchase",
      definitions: itineraryReview,
      lifecycle: getLegacySystemContentLifecycle("itinerary-review"),
      schemaTypes: ["Service"],
      parentContentId: "hub-services",
      indexability: {
        index: false,
        follow: true,
        blockReason: "Standalone itinerary review and route-build services have ended; canonical URLs redirect to private tours.",
      },
    }),
    systemNode({
      id: "zhangjiajie-4-day-private-tour",
      section: "services",
      family: "service",
      primaryIntent: "purchase",
      definitions: zhangjiajiePrivateTour,
      lifecycle: getLegacySystemContentLifecycle(
        "zhangjiajie-4-day-private-tour",
      ),
      schemaTypes: ["WebPage", "TouristTrip"],
      entityIds: ["city-zhangjiajie"],
      parentContentId: "tour-hub",
      volatility: "high",
      refreshCadence: "weekly",
      nextReviewAt: "2026-08-31",
    }),
    systemNode({
      id: "attraction-reservations",
      section: "services",
      family: "service",
      primaryIntent: "purchase",
      definitions: attractionReservations,
      lifecycle: getLegacySystemContentLifecycle("attraction-reservations"),
      schemaTypes: ["WebPage", "Service", "FAQPage"],
      entityIds: ["country-china", "city-beijing", "city-shanghai", "city-xian", "city-chengdu", "city-hangzhou"],
      parentContentId: "hub-services",
      volatility: "high",
      refreshCadence: "monthly",
      nextReviewAt: "2026-10-29",
    }),
    systemNode({
      id: "entry-requirements",
      section: "essentials",
      family: "task",
      primaryIntent: "execute",
      definitions: {
        en: {
          path: "/guides/china-entry-requirements/",
          title: "China Entry Guides: Visa-Free Rules by Passport & Route",
          description:
            "Current China entry rules by passport, purpose and route, including visa-free entry and transit route checks.",
          h1: "China Entry Guides",
          openGraphLocale: "en_GB",
        },
      },
      lifecycle: getLegacySystemContentLifecycle("entry-requirements"),
      schemaTypes: ["CollectionPage", "ItemList"],
      legacyAliases: ["/china-visa-free-uk-canada/"],
    }),
    systemNode({
      id: "privacy",
      section: "services",
      family: "task",
      primaryIntent: "understand",
      definitions: privacy,
      lifecycle: getLegacySystemContentLifecycle("privacy"),
    }),
  ];

  for (const pageId of homegroundLegalPageIds) {
    const definitions = Object.fromEntries(
      locales.map((locale) => {
        const copy = getHomegroundLegalCopy(pageId, locale);
        return [
          locale,
          {
            path: copy.pagePath,
            title: copy.metadata.title,
            description: copy.metadata.description,
            h1: copy.hero.title,
          },
        ];
      }),
    );
    nodes.push(
      systemNode({
        id: pageId,
        section: "services",
        family: "task",
        primaryIntent: "understand",
        definitions,
        lifecycle: getLegacySystemContentLifecycle(pageId),
      }),
    );
  }

  return nodes;
}
