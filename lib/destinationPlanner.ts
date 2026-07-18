import {
  computeDestinationTiming,
  destinationIds,
  destinationPaceIds,
  destinationTimingRuleVersion,
  type CanonicalDestinationTiming,
  type DestinationId,
  type DestinationPaceId,
} from "./destinationTiming";

export const destinationPlanRouteId = "destination-timing" as const;

export const destinationPlannerPartyIds = [
  "solo",
  "two-adults",
  "family-with-children",
  "older-relatives",
  "multigenerational-family",
  "friends-private-group",
] as const;

export type DestinationPlannerPartyId =
  (typeof destinationPlannerPartyIds)[number];
export type DestinationPlannerMode = "wishlist" | "classic-start";

export interface DestinationPlannerAnswers {
  destinationMode: DestinationPlannerMode;
  destinationIds: readonly DestinationId[];
  otherPlace: string | null;
  totalNights: number;
  party: DestinationPlannerPartyId;
  pace: DestinationPaceId;
  mustSeeIds: readonly DestinationId[];
}

export interface DestinationPlan {
  routeId: typeof destinationPlanRouteId;
  ruleVersion: typeof destinationTimingRuleVersion;
  answers: DestinationPlannerAnswers;
  timing: CanonicalDestinationTiming;
}

export {
  destinationIds,
  destinationPaceIds,
  destinationTimingRuleVersion,
};
export type {
  CanonicalDestinationTiming,
  DestinationId,
  DestinationPaceId,
};

function uniqueKnownDestinationIds(
  values: readonly DestinationId[],
): DestinationId[] {
  const selected = new Set(values);
  return destinationIds.filter((id) => selected.has(id));
}

function manualClassicStartTiming(
  totalNights: number,
  pace: DestinationPaceId,
): CanonicalDestinationTiming {
  return {
    ruleVersion: destinationTimingRuleVersion,
    destinationIds: [],
    knownDestinationCount: 0,
    hasOtherPlace: false,
    totalNights,
    pace,
    essentialsMinimumNights: null,
    selectedPaceRange: null,
    essentialsShortfallNights: null,
    selectedPaceShortfallNights: null,
    nightsAboveSelectedPaceMax: null,
    knownDestinationsStatus: null,
    status: "manual_only",
    routeFeasibility: "unverified",
  };
}

export function createDestinationPlan(
  rawAnswers: DestinationPlannerAnswers,
): DestinationPlan {
  if (
    !destinationPlannerPartyIds.includes(
      rawAnswers.party as DestinationPlannerPartyId,
    )
  ) {
    throw new TypeError("party is not supported.");
  }
  if (
    !destinationPaceIds.includes(rawAnswers.pace as DestinationPaceId)
  ) {
    throw new TypeError("pace is not supported.");
  }
  if (
    !Number.isSafeInteger(rawAnswers.totalNights) ||
    rawAnswers.totalNights < 1 ||
    rawAnswers.totalNights > 60
  ) {
    throw new RangeError("totalNights must be an integer from 1 to 60.");
  }

  if (rawAnswers.destinationMode === "classic-start") {
    const answers: DestinationPlannerAnswers = {
      ...rawAnswers,
      destinationIds: [],
      otherPlace: null,
      mustSeeIds: [],
    };
    return {
      routeId: destinationPlanRouteId,
      ruleVersion: destinationTimingRuleVersion,
      answers,
      timing: manualClassicStartTiming(answers.totalNights, answers.pace),
    };
  }

  if (rawAnswers.destinationMode !== "wishlist") {
    throw new TypeError("destinationMode is not supported.");
  }

  const normalizedDestinationIds = uniqueKnownDestinationIds(
    rawAnswers.destinationIds,
  );
  const otherPlace = rawAnswers.otherPlace?.normalize("NFC").trim() || null;
  const selected = new Set(normalizedDestinationIds);
  const mustSeeIds = uniqueKnownDestinationIds(rawAnswers.mustSeeIds).filter(
    (id) => selected.has(id),
  );
  const answers: DestinationPlannerAnswers = {
    ...rawAnswers,
    destinationIds: normalizedDestinationIds,
    otherPlace,
    mustSeeIds,
  };

  return {
    routeId: destinationPlanRouteId,
    ruleVersion: destinationTimingRuleVersion,
    answers,
    timing: computeDestinationTiming({
      destinationIds: normalizedDestinationIds,
      totalNights: answers.totalNights,
      pace: answers.pace,
      hasOtherPlace: otherPlace !== null,
    }),
  };
}
