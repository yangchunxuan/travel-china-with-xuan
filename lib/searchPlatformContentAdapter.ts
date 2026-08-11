import {
  guideRegistry,
  type GuideId,
  type LegacyGuideId,
} from "./guideRegistry";
import type {
  ContentFamily,
  ContentIntent,
  ContentNode,
  ContentSection,
  SchemaLocale,
} from "./content-system/types";
import {
  getSearchPlatformCopy,
  getSearchSectionPath,
  searchSectionIds,
  type SearchSectionId,
} from "./searchPlatformI18n";

interface LegacyGuideClassification {
  section: ContentSection;
  family: ContentFamily;
  primaryIntent: ContentIntent;
}

/**
 * Transitional classification for the bespoke guide components that existed
 * before the content platform. Keeping this exhaustive means adding a guide
 * now fails TypeScript until its place in the information architecture is
 * chosen deliberately.
 */
export const legacyGuideClassifications = {
  "zhangjiajie-itinerary": {
    section: "plan",
    family: "combined-decision",
    primaryIntent: "plan",
  },
  "zhangjiajie-from-malaysia": {
    section: "plan",
    family: "combined-decision",
    primaryIntent: "plan",
  },
  "zhangjiajie-glass-bridge-vs-skywalk": {
    section: "explore",
    family: "comparison",
    primaryIntent: "compare",
  },
  "kevin-before-the-hotel-pickup": {
    section: "essentials",
    family: "task",
    primaryIntent: "execute",
  },
  "zhangjiajie-older-travellers": {
    section: "plan",
    family: "combined-decision",
    primaryIntent: "plan",
  },
  "best-zhangjiajie-night-show": {
    section: "explore",
    family: "comparison",
    primaryIntent: "compare",
  },
  "beijing-zhangjiajie-shanghai-10-days": {
    section: "plan",
    family: "combined-decision",
    primaryIntent: "plan",
  },
  "beijing-zhangjiajie-shanghai-transport": {
    section: "transport",
    family: "relationship",
    primaryIntent: "execute",
  },
  "is-your-china-itinerary-too-rushed": {
    section: "plan",
    family: "comparison",
    primaryIntent: "plan",
  },
  "china-itinerary-with-older-parents": {
    section: "plan",
    family: "combined-decision",
    primaryIntent: "plan",
  },
  "do-us-citizens-need-visa-china-2026": {
    section: "essentials",
    family: "task",
    primaryIntent: "execute",
  },
  "china-visa-free-uk-citizens-2026": {
    section: "essentials",
    family: "task",
    primaryIntent: "execute",
  },
  "china-visa-free-canadian-citizens-2026": {
    section: "essentials",
    family: "task",
    primaryIntent: "execute",
  },
  "china-visa-free-new-zealand-citizens-2026": {
    section: "essentials",
    family: "task",
    primaryIntent: "execute",
  },
  "china-240-hour-visa-free-transit-route-check": {
    section: "essentials",
    family: "task",
    primaryIntent: "execute",
  },
  "do-singaporeans-need-visa-china": {
    section: "essentials",
    family: "task",
    primaryIntent: "execute",
  },
  "why-are-hotels-in-china-so-cheap": {
    section: "stay",
    family: "subproblem",
    primaryIntent: "plan",
  },
  "do-you-need-a-tour-guide-in-china": {
    section: "services",
    family: "comparison",
    primaryIntent: "compare",
  },
  "how-much-does-a-china-trip-cost": {
    section: "plan",
    family: "subproblem",
    primaryIntent: "plan",
  },
} as const satisfies Record<LegacyGuideId, LegacyGuideClassification>;

const destinationEntityIds = {
  china: "country-china",
  beijing: "city-beijing",
  xian: "city-xian",
  zhangjiajie: "city-zhangjiajie",
  shanghai: "city-shanghai",
  chengdu: "city-chengdu",
  guilin: "city-guilin",
} as const;

const localeKeys = {
  en: "en",
  zh: "zh-Hans",
  ko: "ko",
} as const satisfies Record<string, SchemaLocale>;

const hubIntent: Record<SearchSectionId, ContentIntent> = {
  explore: "understand",
  plan: "plan",
  transport: "execute",
  "when-to-go": "plan",
  stay: "plan",
  essentials: "execute",
  culture: "understand",
  tools: "execute",
  services: "purchase",
};

/**
 * Phase 0 editorial approvals are explicit and stable. A newly added guide can
 * populate a review hub, but it must never make that hub indexable by itself.
 * Any change to this list is an editorial/indexation decision and should be
 * reviewed together with the Phase 0 baseline.
 */
const approvedSearchHubIds = new Set<SearchSectionId>([
  "explore",
  "plan",
  "transport",
  "stay",
  "essentials",
  "services",
]);

function guideEntities(
  destinations: readonly string[],
) {
  const ids = destinations.flatMap((destination) => {
    const id = destinationEntityIds[
      destination as keyof typeof destinationEntityIds
    ];
    return id ? [id] : [];
  });

  return ids.length > 0 ? ids : ["country-china"];
}

function guideClassification(guide: (typeof guideRegistry)[number]) {
  if (guide.search) return guide.search;
  return legacyGuideClassifications[guide.id as LegacyGuideId];
}

export function buildLegacyGuideContentNodes(): ContentNode[] {
  return guideRegistry.map((guide) => {
    const classification = guideClassification(guide);
    const locales = Object.fromEntries(
      Object.entries(guide.locales).map(([siteLocale, localized]) => {
        if (!localized) return [];
        const schemaLocale = localeKeys[siteLocale as keyof typeof localeKeys];

        return [
          schemaLocale,
          {
            path: localized.path,
            title: localized.title,
            description: localized.description,
            h1: localized.headline,
            bodyResource: `legacy-guide:${guide.id}`,
            searchTerms: [],
            localizationStatus:
              siteLocale === "en" ? "source" : "localized",
            openGraphLocale: localized.openGraphLocale,
            ctaId: "trip-brief",
          },
        ];
      }),
    ) as ContentNode["locales"];

    return {
      id: `guide-${guide.id}`,
      family: classification.family,
      section: classification.section,
      primaryIntent: classification.primaryIntent,
      entityIds: guideEntities(guide.destinations),
      relationIds: [],
      parentContentId: `hub-${classification.section}`,
      status: "published",
      indexability: { index: true, follow: true },
      locales,
      factIds: [],
      sourceIds: [],
      mediaIds: [],
      schemaTypes: ["Article"],
      legacyAliases: [],
      dates: {
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        lastReviewed: guide.sourceReviewedDate,
      },
      updatePolicy: {
        volatility:
          guide.pillar === "entry-rules" ? "critical" : "low",
        refreshCadence:
          guide.pillar === "entry-rules" ? "on-source-change" : "quarterly",
        owner: "homeground-editorial",
      },
    } satisfies ContentNode;
  });
}

export function buildSearchHubContentNodes(): ContentNode[] {
  return searchSectionIds.map((section) => {
    const sectionGuides = guideRegistry.filter(
      (guide) => guideClassification(guide).section === section,
    );
    const approvedForIndex = approvedSearchHubIds.has(section);
    const hubEditorialDate = "2026-08-09";
    const dateModified = sectionGuides.reduce(
      (latest, guide) =>
        guide.dateModified.localeCompare(latest, "en") > 0
          ? guide.dateModified
          : latest,
      hubEditorialDate,
    );
    const locales = Object.fromEntries(
      (["en", "zh", "ko"] as const).map((locale) => {
        const copy = getSearchPlatformCopy(locale).sections[section];
        const schemaLocale = localeKeys[locale];

        return [
          schemaLocale,
          {
            path: getSearchSectionPath(section, locale),
            title: copy.navLabel,
            description: copy.description,
            h1: copy.title,
            bodyResource: `search-hub:${section}`,
            searchTerms: [],
            localizationStatus: locale === "en" ? "source" : "localized",
            openGraphLocale:
              locale === "en" ? "en_US" : locale === "zh" ? "zh_CN" : "ko_KR",
            ctaId: "trip-brief",
          },
        ];
      }),
    ) as ContentNode["locales"];

    return {
      id: `hub-${section}`,
      family: section === "services" ? "service" : "entity",
      section,
      primaryIntent: hubIntent[section],
      entityIds: ["country-china"],
      relationIds: [],
      parentContentId: "system-guides",
      status: approvedForIndex ? "published" : "review",
      indexability: approvedForIndex
        ? { index: true, follow: true }
        : {
            index: false,
            follow: true,
            // Preserve the reviewed Phase 0 manifest contract verbatim. The
            // explicit approval set above prevents newly added children from
            // changing this protected indexability state on their own.
            blockReason: "No reviewed child content in this section yet.",
          },
      locales,
      factIds: [],
      sourceIds: [],
      mediaIds: [],
      schemaTypes: ["CollectionPage", "ItemList"],
      legacyAliases: [],
      dates: {
        datePublished: approvedForIndex ? hubEditorialDate : null,
        dateModified,
        lastReviewed: hubEditorialDate,
      },
      updatePolicy: {
        volatility: "low",
        refreshCadence: "on-source-change",
        owner: "homeground-editorial",
      },
    } satisfies ContentNode;
  });
}

export function legacyGuideIdFromBodyResource(bodyResource: string) {
  const prefix = "legacy-guide:";
  if (!bodyResource.startsWith(prefix)) return null;
  const id = bodyResource.slice(prefix.length);
  return guideRegistry.some((guide) => guide.id === id) ? (id as GuideId) : null;
}
