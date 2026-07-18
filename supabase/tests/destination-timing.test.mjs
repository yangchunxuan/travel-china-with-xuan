import assert from "node:assert/strict";
import test from "node:test";
import {
  computeDestinationTiming,
  destinationIds,
  destinationPaceIds,
  destinationTimingRules,
  destinationTimingRuleVersion,
  timingStatusIds,
} from "../../lib/destinationTiming.ts";

const expectedRules = {
  "beijing-great-wall": [[3, 3], [3, 4], [4, 5]],
  shanghai: [[2, 2], [2, 3], [3, 4]],
  xian: [[2, 2], [2, 3], [3, 4]],
  chengdu: [[2, 2], [2, 3], [3, 4]],
  chongqing: [[2, 2], [2, 3], [3, 4]],
  zhangjiajie: [[3, 3], [4, 4], [4, 5]],
  "guilin-yangshuo": [[3, 3], [3, 4], [4, 5]],
  "hangzhou-suzhou": [[2, 2], [3, 3], [4, 4]],
  "yunnan-dali-lijiang": [[4, 4], [4, 5], [5, 6]],
  "guangzhou-shenzhen": [[4, 4], [5, 5], [5, 6]],
};

test("publishes the ten stable destination IDs and the approved V3 ranges", () => {
  assert.equal(destinationIds.length, 10);
  assert.equal(new Set(destinationIds).size, 10);
  assert.deepEqual(Object.keys(destinationTimingRules), [...destinationIds]);

  for (const id of destinationIds) {
    const actual = destinationPaceIds.map((pace) => {
      const range = destinationTimingRules[id][pace];
      return [range.minNights, range.maxNights];
    });
    assert.deepEqual(actual, expectedRules[id], id);
  }
});

test("classifies the four known-destination timing states at exact boundaries", () => {
  const base = {
    destinationIds: ["zhangjiajie"],
    pace: "classic",
    hasOtherPlace: false,
  };

  assert.equal(
    computeDestinationTiming({ ...base, totalNights: 2 }).status,
    "needs_prioritization",
  );
  assert.equal(
    computeDestinationTiming({ ...base, totalNights: 3 }).status,
    "tighter_than_selected_pace",
  );
  assert.equal(
    computeDestinationTiming({ ...base, totalNights: 4 }).status,
    "within_reference_range",
  );
  assert.equal(
    computeDestinationTiming({ ...base, totalNights: 5 }).status,
    "room_to_shape",
  );
});

test("treats upper range values as matching rather than a conservative minimum", () => {
  const twoNights = computeDestinationTiming({
    destinationIds: ["shanghai"],
    totalNights: 2,
    pace: "classic",
    hasOtherPlace: false,
  });
  const threeNights = computeDestinationTiming({
    destinationIds: ["shanghai"],
    totalNights: 3,
    pace: "classic",
    hasOtherPlace: false,
  });

  assert.deepEqual(twoNights.selectedPaceRange, {
    minNights: 2,
    maxNights: 3,
  });
  assert.equal(twoNights.status, "within_reference_range");
  assert.equal(threeNights.status, "within_reference_range");
});

test("preserves every selected destination, including all ten", () => {
  const result = computeDestinationTiming({
    destinationIds,
    totalNights: 10,
    pace: "classic",
    hasOtherPlace: false,
  });

  assert.deepEqual(result.destinationIds, destinationIds);
  assert.equal(result.knownDestinationCount, 10);
  assert.equal(result.essentialsMinimumNights, 27);
  assert.equal(result.selectedPaceRange.minNights, 30);
  assert.equal(result.selectedPaceRange.maxNights, 37);
  assert.equal(result.essentialsShortfallNights, 17);
  assert.equal(result.status, "needs_prioritization");
});

test("deduplicates repeated IDs so forged input cannot add fake nights", () => {
  const result = computeDestinationTiming({
    destinationIds: ["shanghai", "beijing-great-wall", "shanghai"],
    totalNights: 5,
    pace: "essentials",
    hasOtherPlace: false,
  });

  assert.deepEqual(result.destinationIds, [
    "shanghai",
    "beijing-great-wall",
  ]);
  assert.equal(result.essentialsMinimumNights, 5);
  assert.deepEqual(result.selectedPaceRange, {
    minNights: 5,
    maxNights: 5,
  });
  assert.equal(result.status, "within_reference_range");
});

test("keeps known calculations but makes the overall result partial when Other is present", () => {
  const result = computeDestinationTiming({
    destinationIds: ["beijing-great-wall", "shanghai"],
    totalNights: 4,
    pace: "classic",
    hasOtherPlace: true,
  });

  assert.equal(result.essentialsMinimumNights, 5);
  assert.deepEqual(result.selectedPaceRange, {
    minNights: 5,
    maxNights: 7,
  });
  assert.equal(result.knownDestinationsStatus, "needs_prioritization");
  assert.equal(result.status, "partial_manual_check");
});

test("returns manual-only with no invented estimate when only Other is selected", () => {
  const result = computeDestinationTiming({
    destinationIds: [],
    totalNights: 9,
    pace: "unhurried",
    hasOtherPlace: true,
  });

  assert.equal(result.status, "manual_only");
  assert.equal(result.knownDestinationsStatus, null);
  assert.equal(result.essentialsMinimumNights, null);
  assert.equal(result.selectedPaceRange, null);
  assert.equal(result.essentialsShortfallNights, null);
  assert.equal(result.selectedPaceShortfallNights, null);
  assert.equal(result.nightsAboveSelectedPaceMax, null);
});

test("every possible result keeps route feasibility unverified", () => {
  const results = [
    computeDestinationTiming({
      destinationIds: ["shanghai"],
      totalNights: 1,
      pace: "essentials",
      hasOtherPlace: false,
    }),
    computeDestinationTiming({
      destinationIds: ["zhangjiajie"],
      totalNights: 3,
      pace: "classic",
      hasOtherPlace: false,
    }),
    computeDestinationTiming({
      destinationIds: ["shanghai"],
      totalNights: 2,
      pace: "classic",
      hasOtherPlace: false,
    }),
    computeDestinationTiming({
      destinationIds: ["shanghai"],
      totalNights: 5,
      pace: "classic",
      hasOtherPlace: false,
    }),
    computeDestinationTiming({
      destinationIds: ["shanghai"],
      totalNights: 2,
      pace: "classic",
      hasOtherPlace: true,
    }),
    computeDestinationTiming({
      destinationIds: [],
      totalNights: 2,
      pace: "classic",
      hasOtherPlace: true,
    }),
  ];

  assert.deepEqual(
    new Set(results.map((result) => result.status)),
    new Set(timingStatusIds),
  );
  for (const result of results) {
    assert.equal(result.routeFeasibility, "unverified");
    assert.equal(result.ruleVersion, destinationTimingRuleVersion);
    assert.equal("routeOrder" in result, false);
    assert.equal("transitPenalty" in result, false);
    assert.equal("betweenCityMoves" in result, false);
  }
});

test("rejects unknown destinations, invalid nights, invalid pace, and no wish-list input", () => {
  assert.throws(
    () =>
      computeDestinationTiming({
        destinationIds: ["not-a-real-place"],
        totalNights: 7,
        pace: "classic",
        hasOtherPlace: false,
      }),
    /Unknown destination ID/,
  );
  assert.throws(
    () =>
      computeDestinationTiming({
        destinationIds: ["shanghai"],
        totalNights: 2.5,
        pace: "classic",
        hasOtherPlace: false,
      }),
    /positive safe integer/,
  );
  assert.throws(
    () =>
      computeDestinationTiming({
        destinationIds: ["shanghai"],
        totalNights: 2,
        pace: "fast",
        hasOtherPlace: false,
      }),
    /pace is not supported/,
  );
  assert.throws(
    () =>
      computeDestinationTiming({
        destinationIds: [],
        totalNights: 7,
        pace: "classic",
        hasOtherPlace: false,
      }),
    /At least one known destination or another place/,
  );
});
