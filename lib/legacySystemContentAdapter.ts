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
    indexability: { index: true, follow: true },
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

  const nodes = [
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
