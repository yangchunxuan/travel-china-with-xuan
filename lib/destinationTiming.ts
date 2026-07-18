/**
 * Canonical Homeground destination stay-time rules.
 *
 * This module deliberately answers one narrow question: how a traveller's
 * hotel nights compare with the stay-time references for the destinations on
 * their wish list. It does not validate route order, transport, arrival or
 * departure points, and it never removes a selected destination.
 */

export const destinationTimingRuleVersion = "2026-07-19.1";

export const destinationIds = [
  "beijing-great-wall",
  "shanghai",
  "xian",
  "chengdu",
  "chongqing",
  "zhangjiajie",
  "guilin-yangshuo",
  "hangzhou-suzhou",
  "yunnan-dali-lijiang",
  "guangzhou-shenzhen",
] as const;

export const destinationPaceIds = [
  "essentials",
  "classic",
  "unhurried",
] as const;

export const timingStatusIds = [
  "needs_prioritization",
  "tighter_than_selected_pace",
  "within_reference_range",
  "room_to_shape",
  "partial_manual_check",
  "manual_only",
] as const;

export type DestinationId = (typeof destinationIds)[number];
export type DestinationPaceId = (typeof destinationPaceIds)[number];
export type TimingStatus = (typeof timingStatusIds)[number];
export type KnownDestinationTimingStatus = Exclude<
  TimingStatus,
  "partial_manual_check" | "manual_only"
>;
export type RouteFeasibility = "unverified";

export interface NightRange {
  minNights: number;
  maxNights: number;
}

export interface DestinationTimingRule {
  essentials: NightRange;
  classic: NightRange;
  unhurried: NightRange;
}

export const destinationTimingRules: Readonly<
  Record<DestinationId, DestinationTimingRule>
> = {
  "beijing-great-wall": {
    essentials: { minNights: 3, maxNights: 3 },
    classic: { minNights: 3, maxNights: 4 },
    unhurried: { minNights: 4, maxNights: 5 },
  },
  shanghai: {
    essentials: { minNights: 2, maxNights: 2 },
    classic: { minNights: 2, maxNights: 3 },
    unhurried: { minNights: 3, maxNights: 4 },
  },
  xian: {
    essentials: { minNights: 2, maxNights: 2 },
    classic: { minNights: 2, maxNights: 3 },
    unhurried: { minNights: 3, maxNights: 4 },
  },
  chengdu: {
    essentials: { minNights: 2, maxNights: 2 },
    classic: { minNights: 2, maxNights: 3 },
    unhurried: { minNights: 3, maxNights: 4 },
  },
  chongqing: {
    essentials: { minNights: 2, maxNights: 2 },
    classic: { minNights: 2, maxNights: 3 },
    unhurried: { minNights: 3, maxNights: 4 },
  },
  zhangjiajie: {
    essentials: { minNights: 3, maxNights: 3 },
    classic: { minNights: 4, maxNights: 4 },
    unhurried: { minNights: 4, maxNights: 5 },
  },
  "guilin-yangshuo": {
    essentials: { minNights: 3, maxNights: 3 },
    classic: { minNights: 3, maxNights: 4 },
    unhurried: { minNights: 4, maxNights: 5 },
  },
  "hangzhou-suzhou": {
    essentials: { minNights: 2, maxNights: 2 },
    classic: { minNights: 3, maxNights: 3 },
    unhurried: { minNights: 4, maxNights: 4 },
  },
  "yunnan-dali-lijiang": {
    essentials: { minNights: 4, maxNights: 4 },
    classic: { minNights: 4, maxNights: 5 },
    unhurried: { minNights: 5, maxNights: 6 },
  },
  "guangzhou-shenzhen": {
    essentials: { minNights: 4, maxNights: 4 },
    classic: { minNights: 5, maxNights: 5 },
    unhurried: { minNights: 5, maxNights: 6 },
  },
};

export interface DestinationTimingInput {
  destinationIds: readonly DestinationId[];
  totalNights: number;
  pace: DestinationPaceId;
  hasOtherPlace: boolean;
}

export interface CanonicalDestinationTiming {
  ruleVersion: string;
  destinationIds: readonly DestinationId[];
  knownDestinationCount: number;
  hasOtherPlace: boolean;
  totalNights: number;
  pace: DestinationPaceId;
  essentialsMinimumNights: number | null;
  selectedPaceRange: NightRange | null;
  essentialsShortfallNights: number | null;
  selectedPaceShortfallNights: number | null;
  nightsAboveSelectedPaceMax: number | null;
  knownDestinationsStatus: KnownDestinationTimingStatus | null;
  status: TimingStatus;
  routeFeasibility: RouteFeasibility;
}

function isDestinationId(value: unknown): value is DestinationId {
  return (
    typeof value === "string" &&
    destinationIds.includes(value as DestinationId)
  );
}

function isDestinationPaceId(value: unknown): value is DestinationPaceId {
  return (
    typeof value === "string" &&
    destinationPaceIds.includes(value as DestinationPaceId)
  );
}

function sumRange(
  ids: readonly DestinationId[],
  pace: DestinationPaceId,
): NightRange {
  return ids.reduce<NightRange>(
    (total, id) => {
      const range = destinationTimingRules[id][pace];
      return {
        minNights: total.minNights + range.minNights,
        maxNights: total.maxNights + range.maxNights,
      };
    },
    { minNights: 0, maxNights: 0 },
  );
}

function classifyKnownDestinations(
  totalNights: number,
  essentialsMinimumNights: number,
  selectedPaceRange: NightRange,
): KnownDestinationTimingStatus {
  if (totalNights < essentialsMinimumNights) {
    return "needs_prioritization";
  }
  if (totalNights < selectedPaceRange.minNights) {
    return "tighter_than_selected_pace";
  }
  if (totalNights <= selectedPaceRange.maxNights) {
    return "within_reference_range";
  }
  return "room_to_shape";
}

export function computeDestinationTiming(
  input: DestinationTimingInput,
): CanonicalDestinationTiming {
  if (!Array.isArray(input.destinationIds)) {
    throw new TypeError("destinationIds must be an array.");
  }
  if (!Number.isSafeInteger(input.totalNights) || input.totalNights < 1) {
    throw new RangeError("totalNights must be a positive safe integer.");
  }
  if (!isDestinationPaceId(input.pace)) {
    throw new TypeError("pace is not supported.");
  }
  if (typeof input.hasOtherPlace !== "boolean") {
    throw new TypeError("hasOtherPlace must be a boolean.");
  }

  const normalizedDestinationIds: DestinationId[] = [];
  const seenDestinationIds = new Set<DestinationId>();
  for (const id of input.destinationIds) {
    if (!isDestinationId(id)) {
      throw new TypeError(`Unknown destination ID: ${String(id)}.`);
    }
    if (!seenDestinationIds.has(id)) {
      seenDestinationIds.add(id);
      normalizedDestinationIds.push(id);
    }
  }

  if (
    normalizedDestinationIds.length === 0 &&
    input.hasOtherPlace === false
  ) {
    throw new RangeError(
      "At least one known destination or another place is required.",
    );
  }

  if (normalizedDestinationIds.length === 0) {
    return {
      ruleVersion: destinationTimingRuleVersion,
      destinationIds: normalizedDestinationIds,
      knownDestinationCount: 0,
      hasOtherPlace: true,
      totalNights: input.totalNights,
      pace: input.pace,
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

  const essentialsMinimumNights = sumRange(
    normalizedDestinationIds,
    "essentials",
  ).minNights;
  const selectedPaceRange = sumRange(
    normalizedDestinationIds,
    input.pace,
  );
  const knownDestinationsStatus = classifyKnownDestinations(
    input.totalNights,
    essentialsMinimumNights,
    selectedPaceRange,
  );

  return {
    ruleVersion: destinationTimingRuleVersion,
    destinationIds: normalizedDestinationIds,
    knownDestinationCount: normalizedDestinationIds.length,
    hasOtherPlace: input.hasOtherPlace,
    totalNights: input.totalNights,
    pace: input.pace,
    essentialsMinimumNights,
    selectedPaceRange,
    essentialsShortfallNights: Math.max(
      essentialsMinimumNights - input.totalNights,
      0,
    ),
    selectedPaceShortfallNights: Math.max(
      selectedPaceRange.minNights - input.totalNights,
      0,
    ),
    nightsAboveSelectedPaceMax: Math.max(
      input.totalNights - selectedPaceRange.maxNights,
      0,
    ),
    knownDestinationsStatus,
    status: input.hasOtherPlace
      ? "partial_manual_check"
      : knownDestinationsStatus,
    routeFeasibility: "unverified",
  };
}
