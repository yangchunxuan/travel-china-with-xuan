import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const source = (file) => readFile(path.join(projectRoot, file), "utf8");
const offersModule = await import("../../lib/guideReservationOffers.ts");
const reservations = await import("../../lib/attractionReservations.ts");

const body = async (guideId) => (await import(`../../content/guides/${guideId}/body.en.ts`)).default;
const fee = reservations.formatAttractionReservationFee(reservations.attractionReservationServiceFeeCny, "en");
const servicePath = reservations.attractionReservationPath.en;

/** Claims the owner ruled out for these promotions: scarcity, queues, blanket rules, absolute promises. */
const forbidden = /sell(?:s|ing)? out|sold out|selling fast|go fast|limited (?:spots|places|availability)|skip the (?:line|queue)|no queue|queue[- ]free|every (?:attraction|sight) (?:in China )?(?:needs|requires)|all (?:Chinese |China )?(?:attractions|sights) (?:need|require)|100\s*%|absolutely|guaranteed entry|guarantee(?:d)? (?:your )?entry/iu;

function allText(offer) {
  return [offer.label, offer.title, offer.body, offer.feeUnit, offer.action, ...offer.smallPrint, ...offer.examples.map((example) => example.label)].join(" ");
}

test("each offer follows a real block in each of the eight authorized guide languages", async () => {
  assert.deepEqual([...offersModule.guideReservationOfferGuideIds].sort(), [
    "food-plants-and-animal-products-into-china",
    "forbidden-city-for-foreign-visitors",
    "shanghai-where-to-stay-first-trip",
    "tianmen-mountain-tickets-and-routes",
    "yangshuo-town-or-yulong-river-where-to-stay",
  ]);
  for (const guideId of offersModule.guideReservationOfferGuideIds) {
    const blocks = (await body(guideId)).blocks.map((block) => block.id);
    const offers = offersModule.getGuideReservationOffers(guideId, "en");
    assert.ok(offers.length > 0, guideId);
    for (const offer of offers) assert.ok(blocks.includes(offer.afterBlockId), `${guideId}: ${offer.afterBlockId}`);
    for (const locale of ["zh","ko","ja","fr","es","de","ar"]) {
      const localizedBody = ["zh","ko"].includes(locale) ? (await import(`../../content/guides/${guideId}/body.${locale}.ts`)).default : JSON.parse(await source(`lib/reservation-guide-editions/${locale}/${guideId}.json`)).body;
      for (const offer of offersModule.getGuideReservationOffers(guideId,locale)) {
        assert.ok(localizedBody.blocks.some(block=>block.id === offer.afterBlockId), `${locale}/${guideId}: ${offer.afterBlockId}`);
        assert.ok(offer.href.startsWith(`/${locale}/services/china-attraction-reservations/`));
        assert.ok(offer.title !== offers[0].title);
      }
    }
  }
});

test("offers use the shared fee, link only to the service page and preselect only bookable attractions", () => {
  for (const guideId of offersModule.guideReservationOfferGuideIds) {
    for (const offer of offersModule.getGuideReservationOffers(guideId, "en")) {
      assert.equal(offer.fee, fee, `${guideId}: fee from the reservation data`);
      assert.ok(offer.href === servicePath || offer.href.startsWith(`${servicePath}?attraction=`), `${guideId}: ${offer.href}`);
      for (const example of offer.examples) {
        const rule = reservations.getAttractionReservationRule(example.attractionId);
        assert.equal(rule?.status, "offered", `${guideId}: ${example.attractionId}`);
        assert.equal(example.href, reservations.attractionReservationHref("en", example.attractionId));
      }
      assert.doesNotMatch(allText(offer), forbidden, `${guideId}: no scarcity, queue or absolute claim`);
      assert.match(allText(offer), /Homeground China/u, `${guideId}: names Homeground China`);
    }
  }
});

test("each offer keeps its service boundary", () => {
  const [tianmen] = offersModule.getGuideReservationOffers("tianmen-mountain-tickets-and-routes", "en");
  assert.match(tianmen.body, /^Tianmen Mountain tickets are not sold through this service\./u);
  assert.doesNotMatch(allText(tianmen), /guarantee/iu, "the Tianmen page carries no booking guarantee");
  assert.ok(!tianmen.examples.some((example) => /zhangjiajie|tianmen/iu.test(example.attractionId)));

  const [yangshuo] = offersModule.getGuideReservationOffers("yangshuo-town-or-yulong-river-where-to-stay", "en");
  assert.match(yangshuo.href, /attraction=li-river-cruise/u);
  assert.match(yangshuo.body, /cruise ticket only, not your hotel transfer or a Yulong River bamboo raft/u);

  const [shanghai] = offersModule.getGuideReservationOffers("shanghai-where-to-stay-first-trip", "en");
  assert.match(shanghai.body, /^Not every Shanghai sight needs a reservation\./u);

  const [food] = offersModule.getGuideReservationOffers("food-plants-and-animal-products-into-china", "en");
  assert.match(food.body, /Some of China's best-known sights/u);
  assert.equal(food.href, servicePath);

  const [line] = offersModule.getGuideReservationOffers("forbidden-city-for-foreign-visitors", "en");
  assert.equal(line.variant, "line");
  assert.match(line.href, /attraction=forbidden-city/u);
  for (const guideId of ["food-plants-and-animal-products-into-china", "yangshuo-town-or-yulong-river-where-to-stay", "shanghai-where-to-stay-first-trip"]) {
    const [offer] = offersModule.getGuideReservationOffers(guideId, "en");
    assert.ok(offer.smallPrint.includes(`Request and pay at least ${reservations.ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS} days ahead for a guaranteed booking.`), guideId);
  }
});

test("the reworded booking cards keep the attraction's facts across all eight languages", () => {
  assert.deepEqual([...offersModule.guideReservationCtaWordingGuideIds].sort(), ["forbidden-city-for-foreign-visitors", "li-river-cruise-tickets-piers-booking"]);
  const palace = reservations.getAttractionReservationRule("forbidden-city");
  const palaceWording = offersModule.getGuideReservationCtaWording("forbidden-city-for-foreign-visitors", "en", palace);
  assert.ok(palaceWording.body.includes(palace.release.en.split(";")[0]), "release time comes from the rule");
  assert.match(palaceWording.body, /English portal account with email verification/u);
  const river = reservations.getAttractionReservationRule("li-river-cruise");
  const riverWording = offersModule.getGuideReservationCtaWording("li-river-cruise-tickets-piers-booking", "en", river);
  assert.match(riverWording.body, /boat class/u);
  for (const wording of [palaceWording, riverWording]) {
    assert.doesNotMatch(Object.values(wording).join(" "), forbidden);
    assert.match(wording.body, /Request and pay at least 8 days ahead for a guaranteed booking\./u);
  }
  for (const locale of ["zh","ko","ja","fr","es","de","ar"]) {
    const wording=offersModule.getGuideReservationCtaWording("forbidden-city-for-foreign-visitors",locale,palace);
    assert.ok(wording && wording.title !== palaceWording.title);
    assert.ok(wording.body.includes(offersModule.localizedReservationRule(palace,locale).release));
  }
  assert.equal(offersModule.getGuideReservationCtaWording("terracotta-warriors-without-tour", "en", reservations.getAttractionReservationRule("terracotta-warriors")), null);
});

test("the guide page renders offers as interstitials beside the one booking card", async () => {
  const [page, offer] = await Promise.all([source("components/content/EditorialGuidePage.tsx"), source("components/content/GuideReservationOffer.tsx")]);
  assert.match(page, /node: <GuideReservationOffer guideId=\{guide\.id\} locale=\{locale\} offer=\{offer\} \/>/u);
  assert.equal((page.match(/<GuideReservationCta /gu) ?? []).length, 1);
  assert.match(offer, /position="inline"/u);
  assert.doesNotMatch(offer, /lucide-react/u);
});
