import assert from "node:assert/strict";
import { test } from "node:test";
import vm from "node:vm";
import { getPriorityTicketGuideEntry } from "../../lib/priorityTicketGuide.ts";
import {
  guideTourEntryId,
  guideTourEntryBootstrap,
  guideTourEntryDismissedKey,
  guideTourEntrySeenKey,
  guideTourEntryDismissedAttribute,
  guideTourEntrySeenAttribute,
} from "../../lib/guideTourEntry.ts";

test("guide promotion applies to localized articles, not catalog, hubs or search", () => {
  for (const prefix of ["", "/zh", "/ko"]) {
    assert.equal(guideTourEntryId(`${prefix}/guides/china-trip-cost/`), "china-trip-cost");
    for (const path of ["/", "/guides/", "/guides/china-entry-requirements/", "/guides/page/2/", "/guides/search/", "/tours/", "/tours/beijing-highlights-5-day-private-tour/"]) {
      assert.equal(guideTourEntryId(`${prefix}${path}`), null);
    }
  }
  assert.equal(guideTourEntryId(null), null);
});

function bootstrap(values, storageBlocked = false) {
  const attributes = new Set();
  const reads = [];
  vm.runInNewContext(guideTourEntryBootstrap, {
    sessionStorage: {
      getItem(key) {
        if (storageBlocked) throw new Error("Storage blocked");
        reads.push(key);
        return values[key] ?? null;
      },
    },
    document: { documentElement: {
      toggleAttribute(name, on) { if (on) attributes.add(name); else attributes.delete(name); },
    } },
  });
  return { attributes, reads };
}

test("first visit shows the entry immediately without reading analytics or consent storage", () => {
  const { attributes, reads } = bootstrap({});
  assert.equal(attributes.size, 0);
  assert.deepEqual(reads, [guideTourEntryDismissedKey, guideTourEntrySeenKey]);
});

test("another article suppresses a dismissed entry before hydration and does not replay entry motion", () => {
  const { attributes } = bootstrap({
    [guideTourEntryDismissedKey]: "true",
    [guideTourEntrySeenKey]: "true",
  });
  assert.ok(attributes.has(guideTourEntryDismissedAttribute));
  assert.ok(attributes.has(guideTourEntrySeenAttribute));
  const seenOnly = bootstrap({ [guideTourEntrySeenKey]: "true" });
  assert.ok(!seenOnly.attributes.has(guideTourEntryDismissedAttribute));
  assert.ok(seenOnly.attributes.has(guideTourEntrySeenAttribute));
});

test("blocked session storage keeps the direct catalog entry usable", () => {
  assert.equal(bootstrap({}, true).attributes.size, 0);
});

test("only the three English ticket pilots replace the tour entry with an offered attraction referral", async () => {
  const { getGuideAttractionReservationTarget, attractionReservationHref } = await import("../../lib/attractionReservations.ts");
  for (const guideId of ["forbidden-city-for-foreign-visitors", "terracotta-warriors-without-tour", "humble-administrators-garden-tickets-entry"]) {
    const entry = getPriorityTicketGuideEntry(guideId, "en");
    const rule = getGuideAttractionReservationTarget(guideId);
    assert.equal(rule.status, "offered");
    assert.equal(entry.attractionId, rule.id);
    assert.equal(entry.href, attractionReservationHref("en", rule.id));
    for (const locale of ["zh", "ko"]) assert.equal(getPriorityTicketGuideEntry(guideId, locale), null);
  }
  for (const guideId of ["china-trip-cost", "national-museum-of-china-reservation", "tianmen-mountain-tickets-routes", "unknown"]) {
    assert.equal(getPriorityTicketGuideEntry(guideId, "en"), null);
  }
});
