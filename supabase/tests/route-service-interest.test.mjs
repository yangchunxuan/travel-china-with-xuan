import assert from "node:assert/strict";
import test from "node:test";

import {
  getRouteServiceInterest,
  routeServiceIds,
  routeServiceQueryKey,
} from "../../lib/routeServiceInterest.ts";

test("route-service query uses a strict allow-list", () => {
  assert.equal(routeServiceQueryKey, "service");
  assert.deepEqual(routeServiceIds, [
    "itinerary-review",
    "route-build",
    "full-trip-support",
  ]);
  assert.equal(getRouteServiceInterest("review"), null);
  assert.equal(getRouteServiceInterest("utm_content=review"), null);
  assert.equal(getRouteServiceInterest("<script>"), null);
  assert.equal(getRouteServiceInterest(null), null);
});

test("each accepted service has visible copy and a bounded note", () => {
  for (const id of routeServiceIds) {
    const service = getRouteServiceInterest(id);
    assert.ok(service);
    assert.equal(service.id, id);
    assert.ok(service.label.length > 0);
    assert.ok(service.priceLabel.length > 0);
    assert.ok(service.finderSummary.length > 0);
    assert.ok(service.handoffSummary.length > 0);
    assert.ok(service.note.length > 0);
    assert.ok(service.note.length < 200);
    assert.ok(
      service.note.length + "\n\nTraveller context:\n".length + 1_800 <=
        2_000,
    );
  }
});
