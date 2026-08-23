export const destinationEntityIds = {
  china: "country-china",
  beijing: "city-beijing",
  xian: "city-xian",
  zhangjiajie: "city-zhangjiajie",
  shanghai: "city-shanghai",
  chengdu: "city-chengdu",
  guilin: "city-guilin",
  guangzhou: "city-guangzhou",
  hangzhou: "city-hangzhou",
  chongqing: "city-chongqing",
  shenzhen: "city-shenzhen",
} as const;

export interface GuideEntityResolution {
  entityIds: string[];
  unmappedTokens: string[];
  usedCountryFallback: boolean;
}

/**
 * Resolve only centrally approved place tokens. Unknown metadata is returned to
 * audits instead of being mistaken for a valid country-only classification.
 * The country fallback remains for compatibility until the controlled place
 * registry is expanded deliberately.
 */
export function resolveGuideEntities(
  destinations: readonly string[],
): GuideEntityResolution {
  const entityIds: string[] = [];
  const unmappedTokens: string[] = [];
  for (const destination of destinations) {
    const id = destinationEntityIds[
      destination as keyof typeof destinationEntityIds
    ];
    if (id) entityIds.push(id);
    else unmappedTokens.push(destination);
  }
  const uniqueEntityIds = [...new Set(entityIds)];
  const uniqueUnmappedTokens = [...new Set(unmappedTokens)];
  return {
    entityIds: uniqueEntityIds.length > 0 ? uniqueEntityIds : ["country-china"],
    unmappedTokens: uniqueUnmappedTokens,
    usedCountryFallback: uniqueEntityIds.length === 0,
  };
}

export type GuideFreshnessVolatility = "low" | "medium" | "high" | "critical";

export interface GuideFreshnessPolicy {
  readonly volatility: GuideFreshnessVolatility;
  readonly refreshCadence: "quarterly" | "on-source-change";
  readonly owner: "homeground-editorial";
}

/** Compatibility export for existing static audits; the registry below is authoritative. */
export const criticalFreshnessPillars = Object.freeze([
  "entry-rules",
  "entry-practicalities",
] as const);

const policyByVolatility = Object.freeze({
  low: Object.freeze({
    volatility: "low",
    refreshCadence: "quarterly",
    owner: "homeground-editorial",
  } as const),
  medium: Object.freeze({
    volatility: "medium",
    refreshCadence: "quarterly",
    owner: "homeground-editorial",
  } as const),
  high: Object.freeze({
    volatility: "high",
    refreshCadence: "on-source-change",
    owner: "homeground-editorial",
  } as const),
  critical: Object.freeze({
    volatility: "critical",
    refreshCadence: "on-source-change",
    owner: "homeground-editorial",
  } as const),
});

/**
 * This is the complete pillar vocabulary currently used by the runtime guide
 * registry. Adding a pillar is an explicit freshness decision: an unknown value
 * throws instead of silently inheriting the least urgent policy.
 */
export const guideFreshnessByPillar = Object.freeze({
  "budget-and-tradeoffs": "low",
  "culture-festivals-arts-contemporary": "low",
  "culture-history-people-ideas": "low",
  "culture-regional-food": "low",
  "destination-ticketing-and-navigation": "high",
  destinations: "low",
  "entry-practicalities": "critical",
  "entry-rules": "critical",
  "essentials-payments-connectivity": "high",
  "explore-attractions-nature-heritage": "low",
  "explore-cities-neighborhoods": "low",
  "explore-regions-provinces": "low",
  "field-notes": "low",
  "plan-trip-length-city-order": "low",
  "routes-and-pace": "low",
  "stay-access-foreign-guests": "high",
  "stay-city-areas": "low",
  "stay-hotel-types-scenic-bases": "low",
  "stay-location-trip-fit": "low",
  "timing-holidays-crowds": "high",
  "timing-events-natural-calendar": "high",
  transport: "high",
  "transport-airports-rail-hubs": "high",
  "transport-city-pair-routes": "high",
  "transport-last-mile-transfers": "high",
  "traveller-fit": "low",
} as const satisfies Record<string, GuideFreshnessVolatility>);

/**
 * Explicit minima for first-Search-Map guide identities whose editorial risk
 * is not fully expressed by the broader pillar baseline. The runtime may become
 * more conservative because of a dynamic topic, but it must never silently
 * downgrade a Search Map decision. The system-entry-requirements collection has
 * its own non-guide policy surface.
 */
export const searchMapGuideFreshnessMinimums = Object.freeze({
  "zhangjiajie-itinerary": "low",
  "zhangjiajie-from-malaysia": "high",
  "zhangjiajie-glass-bridge-vs-skywalk": "medium",
  "kevin-before-the-hotel-pickup": "low",
  "zhangjiajie-older-travellers": "medium",
  "best-zhangjiajie-night-show": "high",
  "beijing-zhangjiajie-shanghai-10-days": "medium",
  "beijing-zhangjiajie-shanghai-transport": "high",
  "is-your-china-itinerary-too-rushed": "low",
  "china-itinerary-with-older-parents": "medium",
  "do-us-citizens-need-visa-china-2026": "critical",
  "china-visa-free-uk-citizens-2026": "critical",
  "china-visa-free-canadian-citizens-2026": "critical",
  "china-visa-free-new-zealand-citizens-2026": "critical",
  "china-240-hour-visa-free-transit-route-check": "critical",
  "do-singaporeans-need-visa-china": "critical",
  "why-are-hotels-in-china-so-cheap": "high",
  "do-you-need-a-tour-guide-in-china": "medium",
  "how-much-does-a-china-trip-cost": "high",
  "beijing-where-to-stay-first-trip": "medium",
  "china-high-speed-train-first-time-guide": "high",
  "china-in-october-golden-week-or-later": "critical",
  "how-to-pay-in-china-as-a-tourist": "critical",
  "guangzhou-baiyun-airport-t2-t3": "critical",
  "pudong-airport-to-shanghai-disneyland": "high",
  "lijiang-old-town-or-shuhe-where-to-stay": "medium",
  "how-guangzhou-morning-tea-works": "medium",
  "how-to-read-a-suzhou-garden": "medium",
  "chengdu-panda-base-or-dujiangyan-panda-valley": "high",
  "china-last-night-before-international-flight": "medium",
  "china-night-train-or-daytime-high-speed-rail": "high",
  "china-open-jaw-flights-route-planning": "medium",
  "china-hotel-near-metro": "medium",
  "which-beijing-railway-station": "high",
  "forbidden-city-for-foreign-visitors": "critical",
} as const satisfies Record<string, GuideFreshnessVolatility>);

/**
 * Current high-risk identities outside the first Search Map receive explicit
 * minima. This avoids turning safety, accessibility or airline-rule content
 * into a low-volatility page merely because its editorial pillar is broad.
 */
export const guideFreshnessMinimums = Object.freeze({
  ...searchMapGuideFreshnessMinimums,
  "china-accessible-hotel-room-verification": "high",
  "china-domestic-flight-fare-bundle-baggage": "high",
  "china-domestic-flight-schedule-change": "critical",
  "china-hotel-emergency-exit-fire-safety-check": "high",
  "beijing-copper-pot-mutton-ordering-workflow": "high",
  "chaozhou-ancient-city-gates-bridge-lanes-route": "high",
  "great-wall-section-selector-from-beijing": "high",
  "lunar-new-year-customs-for-visitors": "high",
  "quanzhou-nanyin-first-performance-workflow": "high",
  "wheelchair-accessible-china-route-planning": "high",
  "wuhan-where-to-stay-hankou-wuchang-hanyang": "high",
  "xian-lanzhou-dunhuang-silk-road-route": "high",
} as const satisfies Record<string, GuideFreshnessVolatility>);

export const dynamicTicketTopicFragments = [
  "booking",
  "opening",
  "reservation",
  "ticket",
] as const;

const volatilityRank = Object.freeze({
  low: 0,
  medium: 1,
  high: 2,
  critical: 3,
} as const satisfies Record<GuideFreshnessVolatility, number>);

interface GuideFreshnessInput {
  id: string;
  pillar: string;
  topics: readonly string[];
}

function moreConservativeVolatility(
  left: GuideFreshnessVolatility,
  right: GuideFreshnessVolatility | undefined,
) {
  if (!right) return left;
  return volatilityRank[right] > volatilityRank[left] ? right : left;
}

/**
 * This classifies editorial verification urgency. It does not invent a new
 * verification date, next-review date or sitemap lastmod.
 */
export function guideUpdatePolicy(
  guide: GuideFreshnessInput,
): GuideFreshnessPolicy {
  if (!Object.prototype.hasOwnProperty.call(guideFreshnessByPillar, guide.pillar)) {
    throw new Error(`Unknown guide freshness pillar: ${guide.pillar}`);
  }

  let volatility: GuideFreshnessVolatility = guideFreshnessByPillar[
    guide.pillar as keyof typeof guideFreshnessByPillar
  ];
  const hasDynamicTicketTopic = guide.topics.some((topic) => {
    const normalizedTopic = topic.toLowerCase();
    return dynamicTicketTopicFragments.some((fragment) =>
      normalizedTopic.includes(fragment),
    );
  });
  if (hasDynamicTicketTopic) {
    volatility = moreConservativeVolatility(volatility, "high");
  }
  volatility = moreConservativeVolatility(
    volatility,
    guideFreshnessMinimums[guide.id as keyof typeof guideFreshnessMinimums],
  );

  return policyByVolatility[volatility];
}
