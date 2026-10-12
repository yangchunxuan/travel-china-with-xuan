import assert from "node:assert/strict";
import test from "node:test";
import { privateTourProducts, localizePrivateTourProduct } from "../../lib/privateTourProducts.ts";
import { japaneseGuilinFourDayCopy, japaneseGuilinFourDayFacts } from "../../lib/japaneseGuilinFourDayProduct.ts";
import { getPublishedPrivateTourCatalog } from "../../lib/publishedPrivateTourCatalog.ts";
import { getPrivateTourFacets } from "../../lib/privateTourCatalogFacets.ts";
import { getPrivateTourInquiryContext, buildPrivateTourDetailHref } from "../../lib/privateTourInquiryContext.ts";
const slug = "guilin-li-river-yangshuo-4-day-private-tour";
const product = privateTourProducts.find(item => item.slug === slug);

test("Guilin four-day route keeps the shared-cruise, stay and departure scope explicit", () => {
  assert.ok(product);
  assert.equal(product.days, 4); assert.equal(product.nights, 3);
  assert.deepEqual(product.itinerary.map(item => item.day), [1,2,3,4]);
  assert.match(product.hotelNote.en, /one night in Guilin.*two nights in the same Yangshuo hotel/i);
  assert.match(product.itinerary[1].description.en, /shared with other passengers/);
  assert.match(product.itinerary[1].description.en, /luggage travels separately by road/);
  assert.match(product.itinerary[3].description.en, /no sightseeing or on-site English guide/);
  assert.match(product.exclusions.en.join(" "), /Longji.*Reed Flute.*Elephant Trunk/);
  assert.equal(product.routePhotoFallback, false);
  assert.deepEqual(product.routeMedia.map(item => item.day), [1,2,3]);
  assert.equal(privateTourProducts.filter(item => item.slug === "guilin-yangshuo-5-day-private-tour").length, 1);
});

test("only the owner-approved six-person reference price is published in each locale", () => {
  assert.deepEqual(product.packages[0].prices, [{travelers:6,cnyPerPerson:2900,usdPerPerson:450}]);
  for (const [locale, amount, currency] of [["en",450,"USD"],["zh",2900,"CNY"],["ko",630000,"KRW"]]) {
    const localized=localizePrivateTourProduct(product,locale);
    assert.deepEqual(localized.packages[0].rows.map(row=>[row.travelers,row.amount,row.currency]),[[6,amount,currency]]);
    assert.equal(localized.faq.length,4);
    assert.match(localized.bookingNote, locale === "en" ? /Reference starting price.*six adults/ : locale === "zh" ? /6名成人.*参考起价/ : /성인 6명.*참고 시작가/);
  }
  const japanese=japaneseGuilinFourDayCopy;
  assert.match(japaneseGuilinFourDayFacts[3].value,/6名.*2,900/);
  assert.equal(japanese.itinerary.length,4); assert.equal(japanese.faq.length,4);
});

test("the new route is listed and passes only its six-person priced selection into enquiries", () => {
  for (const locale of ["en","zh","ko"]) {
    const catalog=getPublishedPrivateTourCatalog(locale);
    const card=catalog.find(item=>item.slug===slug);
    assert.ok(card); assert.equal(card.startingPrice.travelers,6);
    assert.match(card.startingPriceHref,/package=standard-guided&travelers=6/);
    assert.equal(card.twoTravellerPrice,undefined);
    const facets=getPrivateTourFacets(catalog,locale,"Quote");
    assert.ok(facets.items.some(item=>item.id===slug));
    const context=getPrivateTourInquiryContext(slug,locale,{packageId:"standard-guided",travelers:6});
    assert.ok(context?.selection); assert.equal(context.selection.travelers,6);
    assert.match(buildPrivateTourDetailHref(card.href,slug,context.selection),/travelers=6/);
    assert.equal(context.slug,slug);
    for (const travelers of [2,4,12]) {
      const unpriced=getPrivateTourInquiryContext(slug,locale,{packageId:"standard-guided",travelers});
      assert.equal(unpriced,null);
    }
  }
});
