import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  buildPrivateTourInquiryHref,
  buildPrivateTourMailtoHref,
  getPrivateTourInquiryContext,
  privateTourInquiryQueryKey,
  privateTourInquirySlugs,
} from "../../lib/privateTourInquiryContext.ts";
import { getPublishedPrivateTourCatalog } from "../../lib/publishedPrivateTourCatalog.ts";
import { buildRouteServiceContactHref } from "../../lib/routeServiceInterest.ts";

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
