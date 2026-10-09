import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { isNortheastWinterTour } from "../../components/northeastWinterTourSlugs.ts";
import {
  buildPrivateTourMailtoHref,
  getPrivateTourInquiryContext,
  getPrivateTourInquirySelection,
} from "../../lib/privateTourInquiryContext.ts";
import { tourContactMessageText } from "../../lib/tourContact.ts";

const root = path.resolve(import.meta.dirname, "../..");
const winterSlugs = [
  "harbin-yabuli-snow-town-6-day-private-tour",
  "harbin-snow-town-changbaishan-yanji-8-day-private-tour",
  "harbin-mohe-arctic-village-7-day-private-tour",
  "harbin-snow-town-mohe-9-day-private-tour",
  "yanji-changbaishan-wanda-6-day-private-tour",
];

test("winter routes offer direct inquiry with the selected route and party size", async () => {
  for (const slug of winterSlugs) {
    assert.equal(isNortheastWinterTour(slug), true, slug);
    const selection = getPrivateTourInquirySelection(slug, "low-season", 4);
    assert.ok(selection, slug);
    const context = getPrivateTourInquiryContext(slug, "en", selection);
    assert.ok(context, slug);
    const message = tourContactMessageText("en", context);
    assert.match(message, new RegExp(slug, "u"), slug);
    assert.match(message, /4 travellers/u, slug);
    const email = buildPrivateTourMailtoHref("hello@example.com", "en", context);
    assert.match(decodeURIComponent(email), /4 travellers/u, slug);
  }
  assert.equal(isNortheastWinterTour("shanghai-suzhou-hangzhou-6-day-private-tour"), false);

  const [main, japanese] = await Promise.all([
    readFile(path.join(root, "components/TourContactPanel.tsx"), "utf8"),
    readFile(path.join(root, "components/JapaneseInquiryDialog.tsx"), "utf8"),
  ]);
  assert.match(main, /&& !isNortheastWinterTour\(context\?\.slug\)/u);
  assert.match(main, /\(!context \|\| !enabled\).*tourWhatsAppHref/su);
  assert.match(japanese, /const winterDirectContact = isNortheastWinterTour\(request\?\.slug\)/u);
  assert.match(japanese, /!winterDirectContact &&/u);
  assert.match(japanese, /context\s*\?\s*`https:\/\/wa\.me\/\$\{phone\}\?text=/u);
});
