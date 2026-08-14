/**
 * INTERNAL REVIEW WITNESS ONLY.
 *
 * This module is not a Route Reality Checker implementation. It encodes only
 * enough of worker 4's specification at commit 1e131ff990b88c3759fb3d102f23e55aa8bbd0b0
 * to make mathematical counterexamples and safe invariants reproducible.
 * It must not be imported by app, API, registry, sitemap, metadata or schema code.
 */

export const TIME_WINDOWS = Object.freeze({
  before_09: Object.freeze({ arrival: [6, 8], departure: [0, 0] }),
  "09_12": Object.freeze({ arrival: [4, 6], departure: [0, 2] }),
  "12_15": Object.freeze({ arrival: [2, 4], departure: [2, 4] }),
  "15_18": Object.freeze({ arrival: [0, 2], departure: [4, 6] }),
  after_18: Object.freeze({ arrival: [0, 0], departure: [6, 8] }),
  unknown: Object.freeze({ arrival: [0, 8], departure: [0, 8] }),
});

export const PACE_COEFFICIENTS = Object.freeze({
  fast: Object.freeze({ crossCity: [3, 4], interchange: [0.75, 1.25], hotel: [0.5, 0.75] }),
  balanced: Object.freeze({ crossCity: [4, 5], interchange: [1, 1.5], hotel: [0.75, 1] }),
  slow: Object.freeze({ crossCity: [5, 6], interchange: [1.25, 2], hotel: [1, 1.5] }),
});

function assertIntegerInRange(value, min, max, name) {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`${name} must be an integer from ${min} to ${max}`);
  }
}

function addInterval(left, right) {
  return [left[0] + right[0], left[1] + right[1]];
}

function scaleInterval(interval, count) {
  return [interval[0] * count, interval[1] * count];
}

export function createBaseSlots(totalNights, arrivalWindow, departureWindow) {
  assertIntegerInRange(totalNights, 1, 30, "totalNights");
  const arrival = TIME_WINDOWS[arrivalWindow]?.arrival;
  const departure = TIME_WINDOWS[departureWindow]?.departure;
  if (!arrival || !departure) throw new RangeError("unsupported time window");

  return [
    [...arrival],
    ...Array.from({ length: totalNights - 1 }, () => [8, 8]),
    [...departure],
  ];
}

export function sumIntervals(intervals) {
  return intervals.reduce((sum, interval) => addInterval(sum, interval), [0, 0]);
}

export function classifyMarginalRanges(slots) {
  let guaranteedFull = 0;
  let possibleFull = 0;
  let guaranteedFragment = 0;
  let possibleFragment = 0;
  let guaranteedUnavailable = 0;
  let possibleUnavailable = 0;

  for (const [min, max] of slots) {
    if (min >= 6) guaranteedFull += 1;
    if (max >= 6) possibleFull += 1;
    if (min >= 2 && max < 6) guaranteedFragment += 1;
    if (max >= 2 && min < 6) possibleFragment += 1;
    if (max < 2) guaranteedUnavailable += 1;
    if (min < 2) possibleUnavailable += 1;
  }

  return Object.freeze({
    full: [guaranteedFull, possibleFull],
    fragment: [guaranteedFragment, possibleFragment],
    unavailable: [guaranteedUnavailable, possibleUnavailable],
  });
}

export function additionalHotelChanges(hotelChanges, crossCityMoves) {
  return Math.max(0, hotelChanges - crossCityMoves);
}

export function grossTaxHours({
  crossCityMoves,
  airportStationTransfers,
  hotelChanges,
  pace,
}) {
  for (const [name, value] of Object.entries({ crossCityMoves, airportStationTransfers, hotelChanges })) {
    assertIntegerInRange(value, 0, 30, name);
  }
  const coefficients = PACE_COEFFICIENTS[pace];
  if (!coefficients) throw new RangeError("unsupported pace");

  const extraHotels = additionalHotelChanges(hotelChanges, crossCityMoves);
  return [
    scaleInterval(coefficients.crossCity, crossCityMoves),
    scaleInterval(coefficients.interchange, airportStationTransfers),
    scaleInterval(coefficients.hotel, extraHotels),
  ].reduce((sum, interval) => addInterval(sum, interval), [0, 0]);
}

export function subtractBurden(baseInterval, burdenInterval) {
  return [
    Math.max(0, baseInterval[0] - burdenInterval[1]),
    Math.max(0, baseInterval[1] - burdenInterval[0]),
  ];
}

export function placeOneBurden(slots, burdenInterval, dayIndex) {
  return slots.map((slot, index) => index === dayIndex ? subtractBurden(slot, burdenInterval) : [...slot]);
}

export function currentFormulaNetDays(baseSlots, taxHours) {
  const baseline = sumIntervals(baseSlots).map((hours) => hours / 8);
  const tax = taxHours.map((hours) => hours / 8);
  return [Math.max(0, baseline[0] - tax[1]), Math.max(0, baseline[1] - tax[0])];
}

export function placementNetDays(remainingSlots) {
  return sumIntervals(remainingSlots).map((hours) => hours / 8);
}

export function naiveAllUnknownTaxUpperHours() {
  const crossCityMax = 30;
  const transfersMax = 30;
  const hotelMax = 29;
  const crossCityMin = 0;
  const extraHotelsMax = Math.max(0, hotelMax - crossCityMin);
  return crossCityMax * 6 + transfersMax * 2 + extraHotelsMax * 1.5;
}

export function jointAllUnknownTaxUpperHours() {
  let max = 0;
  for (let nights = 1; nights <= 30; nights += 1) {
    for (let crossCity = 0; crossCity <= nights; crossCity += 1) {
      const transfersMax = Math.min(30, 2 + 2 * crossCity);
      for (let hotelChanges = 0; hotelChanges <= nights - 1; hotelChanges += 1) {
        const hours = crossCity * 6
          + transfersMax * 2
          + additionalHotelChanges(hotelChanges, crossCity) * 1.5;
        max = Math.max(max, hours);
      }
    }
  }
  return max;
}

export function ceilUpToHalfDay(value) {
  return Math.ceil(value * 2) / 2;
}

export function currentAllUnknownBufferDays() {
  const rawTaxSpanDays = jointAllUnknownTaxUpperHours() / 8;
  return ceilUpToHalfDay(
    0.5 // any event count could be positive
    + rawTaxSpanDays
    + 0.5 // unknown arrival/departure
    + 0.5 // at least one unknown count
    + 0.5, // unknown pace
  );
}

export function canonicalAuditSnapshot(input) {
  const slots = createBaseSlots(input.totalNights, input.arrivalWindow, input.departureWindow);
  const taxHours = grossTaxHours(input);
  return JSON.stringify({
    calendarDays: slots.length,
    classification: classifyMarginalRanges(slots),
    baselineHours: sumIntervals(slots),
    grossTaxHours: taxHours,
    currentFormulaNetDays: currentFormulaNetDays(slots, taxHours),
  });
}
