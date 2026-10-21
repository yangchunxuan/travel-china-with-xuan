import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { guideRegistry } from "../../lib/guideRegistry.ts";
import { agencyFactIds, agencyFactLanguageFor, agencyFactLanguages, agencyFactsSection, agencyFactsSummary, getAgencyFacts } from "../../lib/homegroundAgencyFacts.ts";
import { getPublishedPrivateTourCatalog } from "../../lib/publishedPrivateTourCatalog.ts";
import { reservationGuideEditionSlugs } from "../../lib/reservationGuideEditionPaths.ts";
import { spanishGuides } from "../../lib/spanishGuides.ts";
import { answerSentence, guideAnswer, guideLeadText } from "../../tools/lib/llms-guide-answers.mjs";
import { guideExportFolders, llmsGuideLanguages, publishedGuideRoutes } from "../../tools/lib/llms-guide-routes.mjs";
import { tourOfferProblems } from "../../tools/lib/tour-offer-check.mjs";

const root = new URL("../../", import.meta.url);
const source = (relativePath) => readFileSync(new URL(relativePath, root), "utf8");

test("llms.txt covers every published guide in English, Chinese, Spanish, French, German and Arabic", () => {
  const routes = publishedGuideRoutes();
  assert.deepEqual(Object.keys(routes), llmsGuideLanguages);
  assert.deepEqual(llmsGuideLanguages, ["en", "zh", "es", "fr", "de", "ar"], "Korean and Japanese are not maintained");
  const registryCount = (locale) => guideRegistry.filter((guide) => guide.locales[locale]).length;
  assert.equal(routes.en.length, registryCount("en"));
  assert.equal(routes.zh.length, registryCount("zh"));
  assert.ok(routes.en.length >= 249, "all English guides, hand-built ones included");
  assert.equal(routes.es.length, spanishGuides.length + reservationGuideEditionSlugs.length);
  for (const language of ["fr", "de", "ar"]) assert.equal(routes[language].length, reservationGuideEditionSlugs.length);
  for (const language of llmsGuideLanguages) {
    assert.equal(new Set(routes[language]).size, routes[language].length, `${language} lists each guide once`);
    const folder = `/${guideExportFolders[language].folder}/`;
    for (const route of routes[language]) assert.ok(route.startsWith(folder) && route.endsWith("/"), `${route} is under ${folder}`);
  }
});

test("every structured guide opens with a lead the llms.txt answer can quote", async () => {
  const folders = readdirSync(new URL("content/guides/", root), { withFileTypes: true }).filter((entry) => entry.isDirectory());
  assert.ok(folders.length >= 230);
  for (const { name } of folders) {
    for (const locale of ["en", "zh"]) {
      const file = new URL(`content/guides/${name}/body.${locale}.ts`, root);
      if (!existsSync(file)) continue;
      const { default: body } = await import(file.href);
      const lead = body.blocks[0];
      assert.equal(lead.type, "lead", `${name} (${locale}) starts with a lead`);
      assert.ok(answerSentence(lead.text, locale).length > 0, `${name} (${locale}) has a quotable opening`);
    }
  }
  for (const guide of spanishGuides) assert.equal(guide.body.blocks[0].type, "lead", `${guide.slug} starts with a lead`);
});

test("the quoted answer is the opening of the guide's own lead, never the search description", () => {
  const structured = `<h1>Avatar Mountains</h1><p class="EditorialGuidePage_dek__9QF">Search description.</p><p class="EditorialByline_byline__mJ">By Evan</p><p class="PageFamilyRenderer_lead__x1">The “Avatar Mountains” are the sandstone pillars of Zhangjiajie National Forest Park, in north-western Hunan, China. Wulingyuan has been a UNESCO site since 1992.</p>`;
  assert.equal(guideAnswer(structured, "en", "/guides/avatar/"), "The “Avatar Mountains” are the sandstone pillars of Zhangjiajie National Forest Park, in north-western Hunan, China.");
  const handBuilt = `<script>{"x":1}</script><h1>Do Singaporeans need a visa?</h1><p class="SingaporeChinaVisaPage_directAnswer__a1">Usually no. A holder of an ordinary Singapore passport may enter China visa-free for a stay of up to 30 days under the reciprocal arrangement. The rest explains why.</p>`;
  assert.equal(guideAnswer(handBuilt, "en", "/guides/sg/"), "Usually no. A holder of an ordinary Singapore passport may enter China visa-free for a stay of up to 30 days under the reciprocal arrangement.", "a short opener keeps the sentence that explains it");
  assert.equal(guideLeadText(`<h1>Kevin</h1><p class="LegacyEditorialByline_byline__I">By Evan</p><p class="KevinPreparationStoryPage_dek__k">A smooth day is rarely improvised.</p>`), "A smooth day is rarely improvised.", "a standfirst is the fallback");
  assert.equal(guideLeadText(`<h1>Hotels</h1><p class="ChinaHotelValueGuidePage_heroLead__h">Some prices look too low &amp; are real. It&#x27;s fine.</p>`), "Some prices look too low & are real. It's fine.", "entities are decoded");
  assert.equal(answerSentence("福田、罗湖和南山是三个大区，不是三个酒店点位。深圳住宿应由具名铁路站或口岸、反复出现的商务／景点地址，以及夜晚终点决定。“第三句”。", "zh"), "福田、罗湖和南山是三个大区，不是三个酒店点位。深圳住宿应由具名铁路站或口岸、反复出现的商务／景点地址，以及夜晚终点决定。", "Chinese sentences join without spaces and drop the next sentence's opening quote");
  assert.throws(() => guideAnswer(`<h1>No lead</h1><p>Body text.</p>`, "en", "/guides/x/"), /has no lead paragraph to quote/u);
});

test("the llms.txt generator lists those guides, the agency facts, and fails on an unlisted exported guide", () => {
  const generator = source("tools/generate-llms-txt.mjs");
  for (const language of llmsGuideLanguages) assert.match(generator, new RegExp(`guideLines\\("${language}"\\)`, "u"));
  for (const language of ["en", "zh", "fr", "de", "ar"]) assert.match(generator, new RegExp(`agencyFacts\\("${language}"\\)`, "u"));
  assert.match(generator, /spanishLlmsSummary\(tours\)/u, "Spanish keeps its own key facts");
  assert.doesNotMatch(generator, /guideLines\("(?:ko|ja)"\)/u);
  assert.match(generator, /llms\.txt misses exported guides/u);
  assert.match(generator, /guideAnswer\(page\.html, language, route\)/u, "answers come from the exported page");
});

test("the agency facts are the approved list, complete in every maintained language", () => {
  assert.deepEqual(agencyFactLanguages, ["en", "zh", "es", "fr", "de", "ar"]);
  const forbidden = /sell(?:s|ing)? out|sold out|selling fast|limited (?:spots|places|availability)|skip the (?:line|queue)|no queue|queue[- ]free|guaranteed entry|local partners?|video call|phone call|plazas limitadas|agotad|places limitées|complet|ausgebucht|begrenzte Plätze|名额|售罄|倒计时/iu;
  for (const language of agencyFactLanguages) {
    const facts = getAgencyFacts(language);
    assert.deepEqual(facts.map((fact) => fact.id), [...agencyFactIds], `${language} has every fact, in order`);
    const byId = Object.fromEntries(facts.map((fact) => [fact.id, fact.text]));
    for (const fact of facts) {
      assert.match(fact.text, /Homeground China/u, `${language} ${fact.id} names the agency so it can be quoted alone`);
      assert.doesNotMatch(fact.text, forbidden, `${language} ${fact.id}`);
      assert.ok(fact.label.length > 0);
    }
    assert.match(byId.licence, /L-BJ10587/u);
    assert.match(byId.licence, /盛世美达（北京）国际旅行社有限公司/u);
    assert.match(byId["reply-time"], /12/u);
    assert.match(byId["private-car"], /Hong Kong|Hongkong|港澳|هونغ كونغ/u, "Hong Kong and Macau are excluded");
    assert.match(byId["beijing-booking-refund"], /\b8\b|8 /u);
    assert.match(byId.payment, /30\s?%/u);
    assert.doesNotMatch(byId.payment, /Alipay|支付宝/u);
    assert.match(byId.payment, /VBill/u);
    assert.equal(agencyFactsSection(language).facts.length, agencyFactIds.length);
    assert.ok(agencyFactsSummary(language).includes(byId.payment));
  }
  assert.equal(agencyFactLanguageFor("zh-Hans"), "zh");
  assert.equal(agencyFactLanguageFor("ko"), null);
  assert.equal(agencyFactLanguageFor("ja"), null);
});

test("the business-information page and the Organization markup state the agency facts", () => {
  const legal = source("lib/homegroundLegalI18n.ts");
  assert.match(legal, /\.\.\.\(factsLanguage \? \[agencyFactsSection\(factsLanguage\)\] : \[\]\)/u, "English and Chinese pages lead with the facts; Korean keeps its page");
  for (const [file, language] of [["spanish", "es"], ["french", "fr"], ["german", "de"], ["arabic", "ar"]]) {
    assert.match(source(`lib/${file}LegalLayoutCopy.ts`), new RegExp(`sections: \\[\\r?\\n\\s+agencyFactsSection\\('${language}'\\),`, "u"));
  }
  const page = source("components/HomegroundLegalPage.tsx");
  assert.match(page, /agencyOrganizationSchema\(factsLanguage\)/u);
  assert.match(page, /"@id": `\$\{baseUrl\}\/#organization`/u, "Korean keeps the plain reference");
  const identity = source("lib/editorialIdentity.ts");
  assert.match(identity, /description: agencyFactsSummary\("en"\)/u);
  assert.match(identity, /"@type": "EducationalOccupationalCredential"/u);
  assert.match(identity, /identifier: homegroundBusiness\.travelAgencyLicenceNumber/u);
  assert.doesNotMatch(identity, /PostalAddress|"@type": "TravelAgency"/u, "the registered cluster address is still not offered as a business location");
});

test("tour price markup: priced tours carry an Offer with price, currency and URL; quote-only tours carry none", () => {
  const url = "https://homegroundchina.com/tours/example/";
  const page = (offers) => `<script type="application/ld+json">${JSON.stringify({ "@type": "TouristTrip", ...(offers ? { offers } : {}) })}</script>`;
  const aggregate = { "@type": "AggregateOffer", priceCurrency: "USD", lowPrice: 590, url, offers: [{ "@type": "Offer", price: 839, priceCurrency: "USD", url }] };
  assert.deepEqual(tourOfferProblems(page(aggregate), { priced: true, url }), []);
  assert.deepEqual(tourOfferProblems(page(null), { priced: false, url }), []);
  assert.match(tourOfferProblems(page(null), { priced: true, url }).join(), /no Offer structured data/u);
  assert.match(tourOfferProblems(page(aggregate), { priced: false, url }).join(), /quote-only but its structured data states a price/u);
  assert.match(tourOfferProblems(page({ ...aggregate, url: "https://homegroundchina.com/" }), { priced: true, url }).join(), /points to/u);
  assert.match(tourOfferProblems(page({ "@type": "Offer", price: 0, priceCurrency: "usd", url }), { priced: true, url }).join(), /no positive price.*no ISO currency/u);
  assert.match(tourOfferProblems(page({ "@type": "Offer", price: 500, priceCurrency: "USD", url, priceValidUntil: "end of season" }), { priced: true, url }).join(), /is not a date/u);

  const pkg = JSON.parse(source("package.json"));
  assert.match(pkg.scripts["check:tour-offer-export"], /tools\/check-tour-offer-export\.mjs/u);
  assert.match(pkg.scripts.postbuild, /npm run check:tour-offer-export/u, "every deploy checks the exported offers");
  const check = source("tools/check-tour-offer-export.mjs");
  assert.match(check, /getPublishedPrivateTourCatalog\("en"\)/u, "quote-only is decided by the catalogue, not a hand-kept list");
  assert.match(check, /\["", "\/zh", "\/ko", "\/es", "\/fr", "\/de", "\/ar"\]/u);

  // A tour is quote-only exactly when it publishes no price row, so no Offer is ever invented.
  const catalogue = getPublishedPrivateTourCatalog("en");
  const quoteOnly = catalogue.filter((tour) => tour.startingPrice === null);
  assert.ok(catalogue.length - quoteOnly.length >= 49, "the priced tours keep their Offer data");
  for (const tour of quoteOnly) assert.equal(tour.twoTravellerPrice, undefined, `${tour.slug} publishes no price`);
});
