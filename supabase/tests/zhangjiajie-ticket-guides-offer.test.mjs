import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { privateGuideHours, getPrivateGuideRates } from "../../lib/privateGuideServices.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const { formatPrivateTourPrice } = await import("../../lib/privateTourProducts.ts");

const read = (relativePath) => readFile(path.join(projectRoot, relativePath), "utf8");
const guides = ["tianmen-mountain-tickets-and-routes", "zhangjiajie-glass-bridge-tickets"];

test("the Zhangjiajie ticket guides sell the 4-day tour and the guide service at their current prices", async () => {
  const pricing = JSON.parse(await read("content/product-previews/zhangjiajie-4-day-private-tour/pricing.json"));
  const entry = pricing.tiers.find((tier) => tier.featured);
  const fromCny = entry.from_price_per_person ?? entry.price_per_person;
  // Intl puts a no-break space between the currency code and the amount; the guides use a plain one.
  const tourPrice = (locale) => formatPrivateTourPrice(fromCny, locale).formatted.replaceAll(" ", " ");
  // Each language quotes the guide its page sells (Korean-speaking on /ko/).
  const guide = (locale) => getPrivateGuideRates(locale).zhangjiajie;
  const number = (value) => value.toLocaleString("en-US");
  const [, month, day] = pricing.valid_until.slice(0, 10).split("-").map(Number);
  const until = {
    en: new RegExp(`${day} December 2026`, "u"),
    zh: new RegExp(`2026年${month}月${day}日`, "u"),
    ko: new RegExp(`2026년 ${month}월 ${day}일`, "u"),
  };
  assert.equal(month, 12, "the English pattern above names December");

  for (const guideId of guides) {
    for (const locale of ["en", "zh", "ko"]) {
      const text = await read(`content/guides/${guideId}/body.${locale}.ts`);
      const label = `${guideId} ${locale}`;
      // The offer is in the lead, in the "have it done for you" section and in one FAQ answer.
      assert.equal(text.split(tourPrice(locale)).length - 1, 3, `${label}: tour price ${tourPrice(locale)}`);
      assert.match(text, /id: "handoff-options", type: "comparison"/u, label);
      assert.match(text, until[locale], `${label}: price window end`);
      assert.ok(text.includes(number(guide(locale).standardCny)), `${label}: guide day rate`);
      assert.ok(text.includes(number(guide(locale).peakMinCny)), `${label}: guide peak rate`);
      assert.ok(new RegExp(`(?:up to |最多|최대 )${privateGuideHours}`, "u").test(text), `${label}: guide hours`);
    }
  }
});
