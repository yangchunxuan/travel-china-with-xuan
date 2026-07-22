import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

test("route planning page exposes two fixed-scope services without pretending to checkout", async () => {
  const page = await source("components/ChinaItineraryReviewPage.tsx");

  assert.equal(page.match(/<h1>/g)?.length, 1);
  assert.match(page, /Review My Route/);
  assert.match(page, /Build My Route/);
  assert.match(page, /<strong>69<\/strong>/);
  assert.match(page, /<strong>129<\/strong>/);
  assert.match(page, /Up to 10 travel days/);
  assert.match(page, /up to 4 overnight bases/);
  assert.match(page, /one shared route for 1–4 travellers/);
  assert.match(page, /Request a route review/);
  assert.match(page, /Request a route build/);
  assert.match(page, /service=itinerary-review/);
  assert.match(page, /service=route-build/);
  assert.match(page, /service=full-trip-support/);
  assert.match(page, /No online payment is taken/);
  assert.match(page, /does not take payment or accept file uploads/);
  assert.match(page, /It is not a booking or payment/);
  assert.doesNotMatch(page, /Buy now|Checkout|Add to cart/);
  assert.doesNotMatch(page, /consolidated clarification|structural revision/);
});

test("route planning page keeps full trip support custom and names product boundaries", async () => {
  const page = await source("components/ChinaItineraryReviewPage.tsx");

  assert.match(page, /Full trip planning &amp; ground support/);
  assert.match(page, /quoted around the\s+actual journey rather than sold at one fixed service fee/);
  assert.match(page, /What US\$69 and US\$129 do not include/);
  assert.match(page, /Monitoring live availability, fares or price changes/);
  assert.match(page, /Emergency or in-trip support/);
  assert.match(page, /official recheck list/i);
  assert.match(page, /How do I send my itinerary for review/);
  assert.match(page, /full working itinerary by reply/);
});

test("route planning page is server readable, accessible and has matching structured data", async () => {
  const page = await source("components/ChinaItineraryReviewPage.tsx");
  const route = await source(
    "app/(default)/china-itinerary-review/page.tsx",
  );

  assert.match(
    page,
    /<main id="itinerary-review-content" tabIndex=\{-1\}>/,
  );
  assert.match(page, /aria-label="Route planning prices"/);
  assert.match(page, /<details key=\{item\.question\}>/);
  assert.match(page, /"@type": "Service"/);
  assert.match(page, /"@type": "FAQPage"/);
  assert.match(page, /price: "69"/);
  assert.match(page, /price: "129"/);
  assert.doesNotMatch(page, /AggregateRating|ReviewCount/);
  assert.match(route, /China Itinerary Review & Route Planning/);
  assert.match(route, /US\$69/);
  assert.match(route, /US\$129/);
  assert.match(route, /summary_large_image/);
  assert.match(
    route,
    /const title = "China Itinerary Review & Route Planning"/,
  );
  assert.doesNotMatch(
    route,
    /const title = "China Itinerary Review & Route Planning \| Homeground"/,
  );
});

test("route-service intent reaches the existing enquiry without becoming URL attribution", async () => {
  const home = await source("components/HomegroundHomePage.tsx");
  const finder = await source("components/RouteFinder.tsx");
  const handoff = await source("components/PlannerHandoff.tsx");
  const footer = await source("components/HomegroundFooter.tsx");
  const privacy = await source("lib/homegroundPrivacyI18n.ts");

  assert.match(home, /getRouteServiceInterest/);
  assert.match(home, /locale === "en" \? routeServiceInterest : null/);
  assert.match(home, /serviceInterest=\{activeRouteServiceInterest\}/);
  assert.match(home, /href="\/china-itinerary-review\/"/);
  assert.match(finder, /Selected Homeground planning service/);
  assert.match(handoff, /note: inquiryNote/);
  assert.match(handoff, /name="tripContext"/);
  assert.match(handoff, /maximumTripContextLength/);
  assert.match(handoff, /full file after the fit check/);
  assert.match(footer, /Route review &amp; planning/);
  assert.match(
    privacy,
    /trip brief — including any optional planning-service choice or concise route context/,
  );
  assert.doesNotMatch(
    privacy,
    /name: "Optional planning-service choice and route context"/,
  );
  assert.match(privacy, /reviewedValue: "20 July 2026"/);
  assert.match(handoff, /serviceInterest\.note/);
  assert.match(
    handoff,
    /const inquiryNote = useMemo\(\(\) => \{\s*if \(!serviceInterest\) return null;/,
  );
  assert.doesNotMatch(handoff, /\["service",\s*"[^"]+"\]/);
  assert.match(handoff, /if \(!serviceInterest\) \{[\s\S]*attributionFields/);
});
