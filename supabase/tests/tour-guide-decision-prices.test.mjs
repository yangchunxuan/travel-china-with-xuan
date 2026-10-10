import assert from "node:assert/strict";
import { test } from "node:test";

import {
  formatPrivateGuidePrice,
  privateGuideCities,
  privateGuideHours,
  privateGuidePeakPrice,
  privateGuideRates,
} from "../../lib/privateGuideServices.ts";
import { getTourGuideDecisionCopy } from "../../lib/tourGuideDecisionI18n.ts";

test("the guide-decision article quotes the guide service's own rates in every language", () => {
  for (const locale of ["en", "zh", "ko"]) {
    const copy = getTourGuideDecisionCopy(locale);
    const section = copy.guideCost;
    // One line per city the service page lists, each with its standard and peak rate.
    assert.equal(section.items.length, privateGuideCities.length, locale);
    privateGuideCities.forEach((city, index) => {
      const line = section.items[index];
      assert.ok(line.includes(formatPrivateGuidePrice(privateGuideRates[city].standardCny, locale)), `${locale} ${city}: ${line}`);
      assert.ok(line.includes(privateGuidePeakPrice(city, locale)), `${locale} ${city}: ${line}`);
    });
    const lowest = Math.min(...privateGuideCities.map((city) => privateGuideRates[city].standardCny));
    assert.ok(section.intro.includes(formatPrivateGuidePrice(lowest, locale)), locale);
    assert.ok(section.listLabel.includes(String(privateGuideHours)), locale);

    // The same figures answer the price question in the FAQ (and its FAQPage data).
    const priced = copy.faq.items.filter((item) => item.answer.includes(formatPrivateGuidePrice(lowest, locale)));
    assert.equal(priced.length, 1, locale);
  }
  // The rate is charged per guide; the article must not present it per person.
  assert.match(getTourGuideDecisionCopy("en").guideCost.paragraphs[0], /per guide, not per person/);
});
