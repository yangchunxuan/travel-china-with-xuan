import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS } from "../../lib/attractionReservationGuarantee.ts";
import { privateGuideHours, privateGuideRates } from "../../lib/privateGuideServices.ts";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const reservations = await import("../../lib/attractionReservations.ts");
const { privateTourProducts } = await import("../../lib/privateTourProducts.ts");

const body = async (locale) =>
  readFile(path.join(projectRoot, `content/guides/mutianyu-great-wall-tickets/body.${locale}.ts`), "utf8");

test("the Mutianyu ticket guide sells the services at their current prices", async () => {
  // Intl puts a no-break space between the currency code and the amount; the guide uses a plain one.
  const fee = (locale) =>
    reservations
      .formatAttractionReservationFee(reservations.attractionReservationServiceFeeCny, locale)
      .replaceAll("\u00a0", " ");
  const guide = privateGuideRates.beijing;
  const number = (value) => value.toLocaleString("en-US");
  const tour = privateTourProducts.find((product) => product.slug === "beijing-highlights-5-day-private-tour");
  const guided = tour.packages.find((entry) => entry.id === "english-guided").prices;
  const usd = (travelers) => `USD ${number(guided.find((price) => price.travelers === travelers).usdPerPerson)}`;
  const days = String(ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS);

  for (const locale of ["en", "zh", "ko"]) {
    const text = await body(locale);
    // The offer is in the lead, in the "have it done for you" section and in one FAQ answer.
    assert.equal(text.split(fee(locale)).length - 1, 3, `${locale}: service fee ${fee(locale)}`);
    assert.match(text, /id: "handoff-options", type: "comparison"/u, locale);
    assert.ok(text.includes(number(guide.standardCny)), `${locale}: guide day rate`);
    assert.ok(text.includes(number(guide.peakMinCny)), `${locale}: guide peak rate`);
    assert.ok(text.includes(usd(4)) && text.includes(usd(2)), `${locale}: Beijing 5-day tour prices`);
    assert.ok(new RegExp(`(?:at least |至少|최소 )${days}`, "u").test(text), `${locale}: guarantee window`);
    assert.ok(new RegExp(`(?:up to |最多|최대 )${privateGuideHours}`, "u").test(text), `${locale}: guide hours`);
  }

  // The reservation rule the card and the section rely on is offered and filled from this guide.
  const rule = reservations.getAttractionReservationRule("great-wall-mutianyu");
  assert.equal(rule.status, "offered");
  assert.equal(rule.source, "mutianyu-great-wall-tickets");
  assert.equal(reservations.getGuideAttractionReservationTarget("mutianyu-great-wall-tickets")?.id, "great-wall-mutianyu");
});
