import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  buildPrivateTourInquiryHref,
  buildPrivateTourMailtoHref,
  getPrivateTourInquiryContext,
  getPrivateTourInquiryContextFromSearchParams,
  getPrivateTourInquirySelection,
  privateTourInquirySelectionLabel,
  privateTourInquiryQueryKey,
  privateTourInquirySlugs,
} from "../../lib/privateTourInquiryContext.ts";
import { getPublishedPrivateTourCatalog } from "../../lib/publishedPrivateTourCatalog.ts";
import { buildRouteServiceContactHref } from "../../lib/routeServiceInterest.ts";
import { privateTourProducts } from "../../lib/privateTourProducts.ts";

const repositoryRoot = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, repositoryRoot), "utf8");
}

test("the inquiry allowlist exactly matches every published tour in all locales", () => {
  for (const locale of ["en", "zh", "ko"]) {
    const catalog = getPublishedPrivateTourCatalog(locale);
    assert.deepEqual(
      new Set(privateTourInquirySlugs),
      new Set(catalog.map((product) => product.slug)),
      locale,
    );
    for (const product of catalog) {
      assert.deepEqual(
        getPrivateTourInquiryContext(product.slug, locale),
        { slug: product.slug, name: product.title },
        `${locale}:${product.slug}`,
      );
    }
  }
});

test("product and service contact links carry only controlled identifiers", () => {
  const zhangjiajie = getPrivateTourInquiryContext(
    "zhangjiajie-4-day-private-tour",
    "en",
  );
  assert.ok(zhangjiajie);
  const href = buildPrivateTourInquiryHref(
    "/",
    zhangjiajie.slug,
    "private_tour",
  );
  const url = new URL(href, "https://homegroundchina.com");
  assert.equal(
    url.searchParams.get(privateTourInquiryQueryKey),
    zhangjiajie.slug,
  );
  assert.equal(url.searchParams.has("name"), false);
  assert.equal(url.hash, "#planner-contact");
  assert.equal(
    getPrivateTourInquiryContext("<script>alert(1)</script>", "en"),
    null,
  );

  assert.equal(
    buildRouteServiceContactHref("/zh/", "itinerary-review"),
    "/zh/?service=itinerary-review#planner-contact",
  );
  assert.equal(
    buildRouteServiceContactHref("/ko/", "route-build"),
    "/ko/?service=route-build#planner-contact",
  );
  assert.equal(
    buildRouteServiceContactHref("/", "full-trip-support"),
    "/?service=full-trip-support#planner-contact",
  );
});

test("published package and group choices survive contact links in every language", () => {
  for (const product of privateTourProducts) {
    for (const tourPackage of product.packages) {
      for (const row of tourPackage.prices) {
        const selection = getPrivateTourInquirySelection(product.slug, tourPackage.id, row.travelers);
        assert.deepEqual(selection, { packageId: tourPackage.id, travelers: row.travelers });
        for (const locale of ["en", "zh", "ko"]) {
          const context = getPrivateTourInquiryContext(product.slug, locale, selection);
          const path = locale === "en" ? "/" : `/${locale}/`;
          const href = buildPrivateTourInquiryHref(path, product.slug, "private_tour_product", selection);
          const params = new URL(href, "https://homegroundchina.com").searchParams;
          assert.deepEqual(getPrivateTourInquiryContextFromSearchParams(params, locale), context);
          const label = privateTourInquirySelectionLabel(context, locale);
          assert.ok(label.includes(String(row.travelers)));
          assert.ok(decodeURIComponent(buildPrivateTourMailtoHref("test@example.invalid", locale, context)).includes(label));
        }
      }
    }
  }
});

test("a query cannot invent packages, groups or ambiguous duplicate selections", () => {
  const tour = "beijing-highlights-5-day-private-tour";
  for (const query of [
    `tour=${tour}&package=no-guide`,
    `tour=${tour}&travelers=4`,
    `tour=${tour}&package=no-guide&travelers=04`,
    `tour=${tour}&package=no-guide&travelers=3`,
    `tour=${tour}&package=free-upgrade&travelers=2`,
    `tour=${tour}&package=no-guide&package=english-guided&travelers=4`,
    `tour=${tour}&package=no-guide&travelers=2&travelers=4`,
    `tour=${tour}&tour=${tour}`,
    "tour=chengdu-pandas-sanxingdui-5-day-private-tour&package=no-guide&travelers=2",
  ]) assert.equal(getPrivateTourInquiryContextFromSearchParams(new URLSearchParams(query), "en"), null, query);
  assert.deepEqual(getPrivateTourInquiryContextFromSearchParams(new URLSearchParams({tour}), "en"), getPrivateTourInquiryContext(tour, "en"));
});

test("Beijing card starting prices name the exact package in all languages", () => {
  for (const locale of ["en", "zh", "ko"]) {
    const item = getPublishedPrivateTourCatalog(locale).find((tour) => tour.slug === "beijing-highlights-5-day-private-tour");
    const noGuide = privateTourProducts.find((tour) => tour.slug === item.slug).packages.find((option) => option.id === "no-guide");
    assert.equal(item.startingPrice.serviceLabel, noGuide.label[locale]);
    assert.equal(item.startingPrice.cny, noGuide.prices.find((row) => row.travelers === 2).cnyPerPerson);
  }
});

test("tour CTAs, quick contacts and backend keep the canonical context end to end", async () => {
  const [
    structuredTour,
    zhangjiajieTour,
    quickContact,
    header,
    contract,
    endpoint,
    notification,
    migration,
  ] = await Promise.all([
    source("components/ShanghaiJiangnanImaginePage.tsx"),
    source("components/ZhangjiajiePrivateTourPreviewPage.tsx"),
    source("components/HomepageQuickContact.tsx"),
    source("components/HomegroundHeader.tsx"),
    source("lib/inquiryContract.ts"),
    source("supabase/functions/v1-inquiries/index.ts"),
    source("supabase/functions/notify-inquiries/index.ts"),
    source(
      "supabase/migrations/202608240001_homeground_private_tour_email_context.sql",
    ),
  ]);

  assert.match(structuredTour, /buildPrivateTourInquiryHref/u);
  assert.match(structuredTour, /buildPrivateTourMailtoHref/u);
  assert.match(structuredTour, /plannerHrefOverride=\{inquiryHref\}/u);
  assert.match(zhangjiajieTour, /buildPrivateTourInquiryHref/u);
  assert.match(
    zhangjiajieTour,
    /plannerHrefOverride=\{published \? inquiryHref : undefined\}/u,
  );
  assert.match(quickContact, /getPrivateTourInquiryContext/u);
  assert.match(quickContact, /privateTourInterest\.name/u);
  assert.match(quickContact, /whatsappMessage\(locale, privateTourInterest\)/u);
  assert.match(quickContact, /productInterest:\s*privateTourInterest/u);
  assert.match(quickContact, /href=\{fallbackMailto\}/u);
  assert.match(header, /isPrivateTourInquirySlug\(privateTour\)/u);
  assert.match(contract, /input\.productInterest\.name !== expected\.name/u);
  assert.match(endpoint, /p_attribution:\s*payload\.productInterest/u);
  assert.match(notification, /homepageProductInterest\(job\)/u);
  assert.match(migration, /p_attribution is distinct from expected_attribution/u);

  const context = getPrivateTourInquiryContext(
    "beijing-highlights-5-day-private-tour",
    "zh",
  );
  assert.ok(context);
  const mailto = buildPrivateTourMailtoHref(
    "planner@example.com",
    "zh",
    context,
  );
  assert.match(mailto, /^mailto:planner@example\.com\?/u);
  assert.match(decodeURIComponent(mailto), /北京经典 5 天 4 晚私家团/u);
  assert.match(
    decodeURIComponent(mailto),
    /beijing-highlights-5-day-private-tour/u,
  );
});
