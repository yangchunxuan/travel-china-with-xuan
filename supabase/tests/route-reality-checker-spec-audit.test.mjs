import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  PACE_COEFFICIENTS,
  canonicalAuditSnapshot,
  classifyMarginalRanges,
  createBaseSlots,
  currentAllUnknownBufferDays,
  currentFormulaNetDays,
  grossTaxHours,
  jointAllUnknownTaxUpperHours,
  naiveAllUnknownTaxUpperHours,
  placeOneBurden,
  placementNetDays,
  sumIntervals,
} from "../../tools/internal/route-reality-checker-spec-audit.mjs";

test("one-night and thirty-night calendar boundaries are reproducible", () => {
  const oneNight = createBaseSlots(1, "after_18", "before_09");
  assert.equal(oneNight.length, 2);
  assert.deepEqual(classifyMarginalRanges(oneNight), {
    full: [0, 0],
    fragment: [0, 0],
    unavailable: [2, 2],
  });
  assert.deepEqual(sumIntervals(oneNight), [0, 0]);

  const thirtyNights = createBaseSlots(30, "after_18", "before_09");
  assert.equal(thirtyNights.length, 31);
  assert.deepEqual(classifyMarginalRanges(thirtyNights), {
    full: [29, 29],
    fragment: [0, 0],
    unavailable: [2, 2],
  });
  assert.deepEqual(sumIntervals(thirtyNights), [232, 232]);
});
test("arrival later and departure earlier never increase base capacity", () => {
  const arrivalOrder = ["before_09", "09_12", "12_15", "15_18", "after_18"];
  const departureOrder = ["after_18", "15_18", "12_15", "09_12", "before_09"];

  for (const order of [arrivalOrder, departureOrder]) {
    const sums = order.map((window) => {
      const slots = order === arrivalOrder
        ? createBaseSlots(3, window, "after_18")
        : createBaseSlots(3, "before_09", window);
      return sumIntervals(slots);
    });
    for (let index = 1; index < sums.length; index += 1) {
      assert.ok(sums[index][0] <= sums[index - 1][0]);
      assert.ok(sums[index][1] <= sums[index - 1][1]);
    }
  }
});
test("known transfer-tax coefficients are non-negative and pace ordered", () => {
  const input = { crossCityMoves: 3, airportStationTransfers: 2, hotelChanges: 5 };
  const fast = grossTaxHours({ ...input, pace: "fast" });
  const balanced = grossTaxHours({ ...input, pace: "balanced" });
  const slow = grossTaxHours({ ...input, pace: "slow" });

  for (const range of [fast, balanced, slow]) {
    assert.ok(range[0] >= 0);
    assert.ok(range[1] >= range[0]);
  }
  assert.ok(fast[0] <= balanced[0] && balanced[0] <= slow[0]);
  assert.ok(fast[1] <= balanced[1] && balanced[1] <= slow[1]);
  assert.deepEqual(PACE_COEFFICIENTS.fast.crossCity, [3, 4]);
});

test("hotel subtraction cannot make tax negative and avoids the known-value double count", () => {
  assert.deepEqual(grossTaxHours({
    crossCityMoves: 2,
    airportStationTransfers: 0,
    hotelChanges: 1,
    pace: "balanced",
  }), [8, 10]);
  assert.deepEqual(grossTaxHours({
    crossCityMoves: 2,
    airportStationTransfers: 0,
    hotelChanges: 2,
    pace: "balanced",
  }), [8, 10]);
  assert.deepEqual(grossTaxHours({
    crossCityMoves: 2,
    airportStationTransfers: 0,
    hotelChanges: 3,
    pace: "balanced",
  }), [8.75, 11]);
});

test("T14 marginal headline ranges cannot reconcile to two calendar days", () => {
  const slots = createBaseSlots(1, "09_12", "15_18");
  const ranges = classifyMarginalRanges(slots);
  assert.deepEqual(ranges, {
    full: [0, 2],
    fragment: [0, 2],
    unavailable: [0, 0],
  });
  assert.equal(ranges.full[0] + ranges.fragment[0] + ranges.unavailable[0], 0);
  assert.equal(ranges.full[1] + ranges.fragment[1] + ranges.unavailable[1], 4);
  assert.equal(slots.length, 2);
});

test("T04 current net formula disagrees with a legal zero-hour-edge placement", () => {
  const slots = createBaseSlots(5, "after_18", "before_09");
  const moveBurden = PACE_COEFFICIENTS.balanced.crossCity;
  const formulaNet = currentFormulaNetDays(slots, moveBurden);
  const edgePlacementNet = placementNetDays(placeOneBurden(slots, moveBurden, 0));
  const interiorPlacementNet = placementNetDays(placeOneBurden(slots, moveBurden, 1));

  assert.deepEqual(formulaNet, [3.375, 3.5]);
  assert.deepEqual(edgePlacementNet, [4, 4]);
  assert.deepEqual(interiorPlacementNet, [3.375, 3.5]);
  assert.ok(edgePlacementNet[1] > formulaNet[1]);
});

test("unlimited interchange stacking preserves headline full days while gross burden exceeds capacity", () => {
  const slots = createBaseSlots(3, "after_18", "before_09");
  const thirtyInterchanges = [30, 45];
  const remaining = placeOneBurden(slots, thirtyInterchanges, 0);
  assert.deepEqual(classifyMarginalRanges(remaining).full, [2, 2]);
  assert.deepEqual(sumIntervals(slots), [16, 16]);
  assert.ok(thirtyInterchanges[0] > 16);
});

test("independent unknown endpoints create an impossible tax upper bound", () => {
  const naive = naiveAllUnknownTaxUpperHours();
  const joint = jointAllUnknownTaxUpperHours();
  assert.equal(naive, 283.5);
  assert.equal(joint, 240);
  assert.ok(naive > joint);
});

test("even the joint all-unknown buffer is larger than the maximum calendar envelope", () => {
  assert.equal(currentAllUnknownBufferDays(), 32);
  assert.ok(currentAllUnknownBufferDays() > 31);
});

test("audit snapshot is deterministic for identical normalized input", () => {
  const input = {
    totalNights: 5,
    arrivalWindow: "after_18",
    departureWindow: "before_09",
    crossCityMoves: 1,
    airportStationTransfers: 2,
    hotelChanges: 1,
    pace: "balanced",
  };
  assert.equal(canonicalAuditSnapshot(input), canonicalAuditSnapshot(structuredClone(input)));
});

test("internal witness has no network or route-generation dependency", async () => {
  const fixture = await readFile(
    new URL("../../tools/internal/route-reality-checker-spec-audit.mjs", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(fixture, /\bfetch\s*\(|XMLHttpRequest|WebSocket|node:https|node:http|node:net/);
  assert.doesNotMatch(fixture, /citySequence|attraction|trainNumber|flightNumber|dayByDay|hotelRecommendation/);
  assert.match(fixture, /INTERNAL REVIEW WITNESS ONLY/);
});
// End of internal Route Checker witness tests.
