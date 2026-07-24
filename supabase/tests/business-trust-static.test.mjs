import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../../${path}`, import.meta.url), "utf8");
}

const routeFiles = [
  "app/(default)/business-information/page.tsx",
  "app/(default)/terms/page.tsx",
  "app/(default)/refund-delivery/page.tsx",
  "app/(localized)/[locale]/business-information/page.tsx",
  "app/(localized)/[locale]/terms/page.tsx",
  "app/(localized)/[locale]/refund-delivery/page.tsx",
];

test("business, terms, and refund pages exist for default and localized routes", async () => {
  await Promise.all(
    routeFiles.map((path) =>
      access(new URL(`../../${path}`, import.meta.url)),
    ),
  );
});

test("verified business identity is centralized and displayed in the shared footer", async () => {
  const business = await source("lib/homegroundBusiness.ts");
  const footer = await source("components/HomegroundFooter.tsx");

  assert.match(
    business,
    /张家界市永定区本境文化交流工作室（个体工商户）/,
  );
  assert.match(business, /92430802MAE0TE500J/);
  assert.match(business, /https:\/\/www\.gsxt\.gov\.cn\/index\.html/);
  assert.match(footer, /homegroundBusiness\.registeredName/);
  assert.match(footer, /homegroundBusiness\.unifiedSocialCreditCode/);
  assert.match(footer, /business-information/);
  assert.match(footer, /refund-delivery/);
});

test("legal copy keeps written consultation separate from travel arrangements in all languages", async () => {
  const legal = await source("lib/homegroundLegalI18n.ts");
  const service = await source("lib/chinaItineraryReviewI18n.ts");

  assert.match(legal, /fixed-scope written consultation services/);
  assert.match(legal, /Full Trip Planning & Ground Support remains enquiry-only/);
  assert.match(legal, /固定范围书面咨询服务/);
  assert.match(legal, /全程规划与落地支持目前只接收咨询/);
  assert.match(legal, /유료 서면 컨설팅 진행 절차/);
  assert.match(legal, /전체 여행 설계 및 현지 지원은 현재 문의만 접수/);

  assert.match(
    service,
    /do not include bookings, ticketing, supplier payments, guiding, transport delivery or in-trip support/,
  );
  assert.match(
    service,
    /不包含代订、出票、代付供应商、导游、交通履约或旅途中支持/,
  );
  assert.match(
    service,
    /예약·발권, 공급업체 결제, 가이드, 차량 제공 또는 여행 중 지원은 포함하지 않습니다/,
  );
});

test("legal routes have canonical language alternates and appear in the sitemap and export guard", async () => {
  const defaultBusiness = await source(
    "app/(default)/business-information/page.tsx",
  );
  const localizedTerms = await source(
    "app/(localized)/[locale]/terms/page.tsx",
  );
  const sitemap = await source("app/sitemap.ts");
  const exportGuard = await source("tools/prune-production-export.mjs");

  assert.match(defaultBusiness, /getHomegroundLegalLanguagePaths/);
  assert.match(defaultBusiness, /alternates/);
  assert.match(localizedTerms, /localizedLocale/);
  assert.match(localizedTerms, /getHomegroundLegalLanguagePaths/);
  assert.match(sitemap, /homegroundLegalPageIds\.flatMap/);

  for (const output of [
    "business-information/index.html",
    "terms/index.html",
    "refund-delivery/index.html",
    "zh/business-information/index.html",
    "zh/terms/index.html",
    "zh/refund-delivery/index.html",
    "ko/business-information/index.html",
    "ko/terms/index.html",
    "ko/refund-delivery/index.html",
  ]) {
    assert.match(exportGuard, new RegExp(output.replaceAll(".", "\\.")));
  }
});

test("active schemas use the registered organization identity, not an unlicensed TravelAgency claim", async () => {
  const homepage = await source("components/HomegroundHomePage.tsx");
  const servicePage = await source(
    "components/ChinaItineraryReviewPage.tsx",
  );

  assert.match(homepage, /homegroundBusiness\.legalName|legalName:/);
  assert.match(servicePage, /homegroundBusiness\.registeredName/);
  assert.doesNotMatch(homepage, /"@type":\s*"TravelAgency"/);
  assert.doesNotMatch(servicePage, /"@type":\s*"TravelAgency"/);
});
