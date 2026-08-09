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
  dateModified,
  schemaTypes = ["WebPage"],
  legacyAliases = [],
}: {
  id: string;
  section: ContentSection;
  family: ContentFamily;
  primaryIntent: ContentIntent;
  definitions: Partial<Record<HomegroundLocale, SystemLocaleDefinition>>;
  dateModified: string;
  schemaTypes?: readonly string[];
  legacyAliases?: readonly string[];
}): ContentNode {
  return {
    id: `system-${id}`,
    section,
    family,
    primaryIntent,
    entityIds: ["country-china"],
    relationIds: [],
    parentContentId: null,
    status: "published",
    indexability: { index: true, follow: true },
    locales: localizedVersions(id, definitions),
    factIds: [],
    sourceIds: [],
    mediaIds: [],
    schemaTypes,
    legacyAliases,
    dates: {
      datePublished: dateModified,
      dateModified,
      lastReviewed: dateModified,
    },
    updatePolicy: {
      volatility: "low",
      refreshCadence: "on-source-change",
      owner: "homeground-platform",
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
      dateModified: "2026-07-24",
      schemaTypes: ["WebPage", "WebSite"],
    }),
    systemNode({
      id: "studio",
      section: "services",
      family: "service",
      primaryIntent: "purchase",
      definitions: studio,
      dateModified: "2026-07-22",
      schemaTypes: ["AboutPage"],
    }),
    systemNode({
      id: "guides",
      section: "explore",
      family: "entity",
      primaryIntent: "understand",
      definitions: guides,
      dateModified: "2026-08-09",
      schemaTypes: ["CollectionPage", "ItemList"],
    }),
    systemNode({
      id: "itinerary-review",
      section: "services",
      family: "service",
      primaryIntent: "purchase",
      definitions: itineraryReview,
      dateModified: "2026-07-22",
      schemaTypes: ["Service"],
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
      dateModified: "2026-07-24",
      schemaTypes: ["CollectionPage", "ItemList"],
      legacyAliases: ["/china-visa-free-uk-canada/"],
    }),
    systemNode({
      id: "privacy",
      section: "services",
      family: "task",
      primaryIntent: "understand",
      definitions: privacy,
      dateModified: "2026-07-24",
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
        dateModified: "2026-07-24",
      }),
    );
  }

  return nodes;
}
