/**
 * Canonical Homeground route rules.
 *
 * This module is deliberately runtime-neutral. It is the only source for
 * answer identifiers, scoring, route allocation, and route identity so the
 * browser and inquiry backend always recompute the same result.
 */

export const routeRuleVersion = "2026-07-17.1";

export const travelPartyIds = [
  "couple",
  "family",
  "parents",
  "friends",
  "solo",
] as const;
export const travelStyleIds = [
  "classic",
  "landscape",
  "food",
  "slow",
  "unsure",
] as const;
export const tripNightsIds = ["7", "10", "14", "18"] as const;
export const tripPaceIds = ["gentle", "balanced", "full"] as const;
export const routeFamilyIds = [
  "classic",
  "landscape",
  "food",
  "slow",
] as const;

export type TravelPartyId = (typeof travelPartyIds)[number];
export type TravelStyleId = (typeof travelStyleIds)[number];
export type TripNightsId = (typeof tripNightsIds)[number];
export type TripPaceId = (typeof tripPaceIds)[number];
export type RouteFamilyId = (typeof routeFamilyIds)[number];
export type RouteProfile = "standard" | "lower-move";

export interface RouteAnswers {
  party: TravelPartyId;
  travelStyle: TravelStyleId;
  nights: TripNightsId;
  pace: TripPaceId;
}

export interface CityNights {
  city: string;
  nights: number;
}

export interface ComputedRoutePlan {
  routeId: string;
  ruleVersion: string;
  familyId: RouteFamilyId;
  profile: RouteProfile;
  answers: RouteAnswers;
  cityNights: readonly CityNights[];
  totalNights: number;
  betweenCityMoves: number;
}

const standardRoutes: Record<
  RouteFamilyId,
  Record<TripNightsId, readonly CityNights[]>
> = {
  classic: {
    "7": [
      { city: "Beijing", nights: 4 },
      { city: "Shanghai", nights: 3 },
    ],
    "10": [
      { city: "Beijing", nights: 4 },
      { city: "Xi’an", nights: 3 },
      { city: "Shanghai", nights: 3 },
    ],
    "14": [
      { city: "Beijing", nights: 4 },
      { city: "Xi’an", nights: 3 },
      { city: "Chengdu", nights: 3 },
      { city: "Shanghai", nights: 4 },
    ],
    "18": [
      { city: "Beijing", nights: 4 },
      { city: "Xi’an", nights: 3 },
      { city: "Chengdu", nights: 4 },
      { city: "Hangzhou", nights: 3 },
      { city: "Shanghai", nights: 4 },
    ],
  },
  landscape: {
    "7": [
      { city: "Zhangjiajie", nights: 4 },
      { city: "Fenghuang", nights: 3 },
    ],
    "10": [
      { city: "Beijing", nights: 3 },
      { city: "Zhangjiajie", nights: 4 },
      { city: "Shanghai", nights: 3 },
    ],
    "14": [
      { city: "Beijing", nights: 4 },
      { city: "Xi’an", nights: 3 },
      { city: "Zhangjiajie", nights: 4 },
      { city: "Shanghai", nights: 3 },
    ],
    "18": [
      { city: "Beijing", nights: 4 },
      { city: "Xi’an", nights: 3 },
      { city: "Chengdu", nights: 3 },
      { city: "Zhangjiajie", nights: 4 },
      { city: "Shanghai", nights: 4 },
    ],
  },
  food: {
    "7": [
      { city: "Chengdu", nights: 4 },
      { city: "Chongqing", nights: 3 },
    ],
    "10": [
      { city: "Xi’an", nights: 3 },
      { city: "Chengdu", nights: 4 },
      { city: "Chongqing", nights: 3 },
    ],
    "14": [
      { city: "Beijing", nights: 3 },
      { city: "Xi’an", nights: 3 },
      { city: "Chengdu", nights: 4 },
      { city: "Chongqing", nights: 4 },
    ],
    "18": [
      { city: "Beijing", nights: 3 },
      { city: "Xi’an", nights: 3 },
      { city: "Chengdu", nights: 4 },
      { city: "Chongqing", nights: 4 },
      { city: "Shanghai", nights: 4 },
    ],
  },
  slow: {
    "7": [
      { city: "Shanghai", nights: 3 },
      { city: "Hangzhou", nights: 4 },
    ],
    "10": [
      { city: "Shanghai", nights: 3 },
      { city: "Hangzhou", nights: 4 },
      { city: "Jingdezhen", nights: 3 },
    ],
    "14": [
      { city: "Beijing", nights: 4 },
      { city: "Hangzhou", nights: 4 },
      { city: "Jingdezhen", nights: 3 },
      { city: "Shanghai", nights: 3 },
    ],
    "18": [
      { city: "Beijing", nights: 4 },
      { city: "Xi’an", nights: 3 },
      { city: "Hangzhou", nights: 4 },
      { city: "Jingdezhen", nights: 3 },
      { city: "Shanghai", nights: 4 },
    ],
  },
};

const lowerMoveRoutes: Record<
  RouteFamilyId,
  Partial<Record<TripNightsId, readonly CityNights[]>>
> = {
  classic: {
    "10": [
      { city: "Beijing", nights: 5 },
      { city: "Shanghai", nights: 5 },
    ],
    "14": [
      { city: "Beijing", nights: 5 },
      { city: "Xi’an", nights: 4 },
      { city: "Shanghai", nights: 5 },
    ],
    "18": [
      { city: "Beijing", nights: 5 },
      { city: "Xi’an", nights: 4 },
      { city: "Chengdu", nights: 4 },
      { city: "Shanghai", nights: 5 },
    ],
  },
  landscape: {
    "10": [
      { city: "Beijing", nights: 4 },
      { city: "Zhangjiajie", nights: 6 },
    ],
    "14": [
      { city: "Beijing", nights: 5 },
      { city: "Zhangjiajie", nights: 5 },
      { city: "Shanghai", nights: 4 },
    ],
    "18": [
      { city: "Beijing", nights: 5 },
      { city: "Chengdu", nights: 4 },
      { city: "Zhangjiajie", nights: 5 },
      { city: "Shanghai", nights: 4 },
    ],
  },
  food: {
    "10": [
      { city: "Chengdu", nights: 5 },
      { city: "Shanghai", nights: 5 },
    ],
    "14": [
      { city: "Chengdu", nights: 5 },
      { city: "Chongqing", nights: 4 },
      { city: "Shanghai", nights: 5 },
    ],
    "18": [
      { city: "Xi’an", nights: 4 },
      { city: "Chengdu", nights: 5 },
      { city: "Chongqing", nights: 4 },
      { city: "Shanghai", nights: 5 },
    ],
  },
  slow: {
    "10": [
      { city: "Hangzhou", nights: 5 },
      { city: "Shanghai", nights: 5 },
    ],
    "14": [
      { city: "Shanghai", nights: 5 },
      { city: "Jingdezhen", nights: 4 },
      { city: "Hangzhou", nights: 5 },
    ],
    "18": [
      { city: "Beijing", nights: 5 },
      { city: "Jingdezhen", nights: 4 },
      { city: "Hangzhou", nights: 5 },
      { city: "Shanghai", nights: 4 },
    ],
  },
};

const familyScores: Record<
  RouteFamilyId,
  {
    base: number;
    party: Partial<Record<TravelPartyId, number>>;
    pace: Partial<Record<TripPaceId, number>>;
  }
> = {
  classic: {
    base: 4,
    party: { couple: 2, family: 2, parents: 2, friends: 2, solo: 1 },
    pace: { gentle: 0, balanced: 3, full: 3 },
  },
  landscape: {
    base: 2,
    party: { couple: 3, family: 2, parents: 1, friends: 3, solo: 3 },
    pace: { gentle: 0, balanced: 3, full: 4 },
  },
  food: {
    base: 1,
    party: { couple: 2, family: 1, parents: 1, friends: 5, solo: 4 },
    pace: { gentle: 0, balanced: 2, full: 5 },
  },
  slow: {
    base: 2,
    party: { couple: 3, family: 4, parents: 6, friends: 1, solo: 3 },
    pace: { gentle: 6, balanced: 2, full: 0 },
  },
};

function scoreFamily(
  family: RouteFamilyId,
  answers: RouteAnswers,
): number {
  if (answers.travelStyle !== "unsure") {
    return answers.travelStyle === family ? 1_000 : -1_000;
  }

  const scores = familyScores[family];
  return (
    scores.base +
    (scores.party[answers.party] ?? 0) +
    (scores.pace[answers.pace] ?? 0)
  );
}

function chooseFamily(answers: RouteAnswers): RouteFamilyId {
  return routeFamilyIds.reduce((best, candidate) =>
    scoreFamily(candidate, answers) > scoreFamily(best, answers)
      ? candidate
      : best,
  );
}

function prefersFewerMoves(answers: RouteAnswers): boolean {
  return (
    answers.pace === "gentle" ||
    answers.party === "parents" ||
    (answers.party === "family" && answers.pace !== "full")
  );
}

export function getStandardRouteCityNights(
  familyId: RouteFamilyId,
  nights: TripNightsId,
): readonly CityNights[] {
  return standardRoutes[familyId][nights];
}

export function computeRoutePlan(
  answers: RouteAnswers,
): ComputedRoutePlan {
  const familyId = chooseFamily(answers);
  const standardRoute = standardRoutes[familyId][answers.nights];
  const lowerMoveRoute = lowerMoveRoutes[familyId][answers.nights];
  const profile: RouteProfile =
    prefersFewerMoves(answers) && lowerMoveRoute
      ? "lower-move"
      : "standard";
  const cityNights =
    profile === "lower-move" ? lowerMoveRoute ?? standardRoute : standardRoute;
  const totalNights = cityNights.reduce(
    (total, stop) => total + stop.nights,
    0,
  );
  const selectedNights = Number(answers.nights);

  if (totalNights !== selectedNights) {
    throw new Error(
      `Route data error: ${familyId}/${answers.nights}/${profile} allocates ${totalNights} nights.`,
    );
  }

  return {
    routeId: `${familyId}-${answers.nights}-${profile}`,
    ruleVersion: routeRuleVersion,
    familyId,
    profile,
    answers,
    cityNights,
    totalNights,
    betweenCityMoves: Math.max(cityNights.length - 1, 0),
  };
}
