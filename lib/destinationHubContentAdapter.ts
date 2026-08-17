import type { ContentNode, SchemaLocale } from "./content-system/types";
import {
  destinationHubRegistry,
  type DestinationHubEntry,
} from "./destinationHubs";
import { getGuideEntry } from "./guideRegistry";
import { getGuideCollectionId } from "./searchCollectionI18n";

const localeKeys = {
  en: "en",
  zh: "zh-Hans",
  ko: "ko",
} as const satisfies Record<string, SchemaLocale>;

/**
 * Phase 1 spec, section 4.5 — Gate B.
 *
 * A destination hub may be indexed when it carries an independently written
 * summary plus at least five qualifying support guides across at least three
 * first-level sections, in every provided locale. Support is counted from the
 * hub's explicitly reviewed `supportGuideIds`, never from an incidental place
 * mention, so a multi-city article cannot inflate a city hub.
 */
const GATE_B_MINIMUM_SUPPORT_GUIDES = 5;
const GATE_B_MINIMUM_SECTIONS = 3;

export interface DestinationHubEligibility {
  readonly hubId: string;
  readonly supportGuideCount: number;
  readonly sectionCount: number;
  readonly passesGateB: boolean;
}

export function evaluateDestinationHubEligibility(
  hub: DestinationHubEntry,
): DestinationHubEligibility {
  const sections = new Set<string>();
  let supportGuideCount = 0;

  for (const guideId of hub.supportGuideIds) {
    // Throws when a support guide is renamed or removed, so a hub can never
    // silently claim eligibility from a guide that no longer exists.
    const localised = (["en", "zh", "ko"] as const).map((locale) =>
      getGuideEntry(guideId, locale),
    );
    const guide = localised[0]!;
    supportGuideCount += 1;
    sections.add(guide.search?.section ?? getGuideCollectionId(guide));
  }

  return {
    hubId: hub.id,
    supportGuideCount,
    sectionCount: sections.size,
    passesGateB:
      supportGuideCount >= GATE_B_MINIMUM_SUPPORT_GUIDES &&
      sections.size >= GATE_B_MINIMUM_SECTIONS,
  };
}

export function buildDestinationHubContentNodes(): ContentNode[] {
  return destinationHubRegistry.map((hub) => {
    const eligibility = evaluateDestinationHubEligibility(hub);

    if (!eligibility.passesGateB) {
      throw new Error(
        `Destination hub ${hub.id} does not meet Phase 1 Gate B: ${eligibility.supportGuideCount} support guide(s) across ${eligibility.sectionCount} section(s).`,
      );
    }

    const locales = Object.fromEntries(
      (["en", "zh", "ko"] as const).map((locale) => {
        const copy = hub.locales[locale];

        return [
          localeKeys[locale],
          {
            path: copy.path,
            title: copy.title,
            description: copy.description,
            h1: copy.h1,
            bodyResource: `destination-hub:${hub.id}`,
            // Optional per-locale field: hubs registered before it existed
            // simply carry no reviewed terms.
            searchTerms: "searchTerms" in copy ? (copy.searchTerms ?? []) : [],
            localizationStatus: locale === "en" ? "source" : "localized",
            openGraphLocale: copy.openGraphLocale,
            ctaId: "trip-brief",
          },
        ];
      }),
    ) as ContentNode["locales"];

    return {
      id: `destination-${hub.id}`,
      family: "entity",
      section: "explore",
      primaryIntent: "plan",
      entityIds: [hub.entityId, "country-china"],
      relationIds: [],
      parentContentId: "hub-explore",
      status: "published",
      indexability: { index: true, follow: true },
      locales,
      factIds: [],
      sourceIds: [],
      mediaIds: [],
      schemaTypes: ["CollectionPage", "Place"],
      legacyAliases: [],
      dates: {
        datePublished: hub.datePublished,
        dateModified: hub.dateModified,
        lastReviewed: hub.sourceReviewedDate,
      },
      updatePolicy: {
        volatility: "medium",
        refreshCadence: "quarterly",
        owner: "homeground-editorial",
      },
    } satisfies ContentNode;
  });
}
