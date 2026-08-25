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
    /registeredName: "张家界市永定区本境文化交流工作室"/,
  );
  assert.match(
    business,
    /publicName: "张家界市永定区本境文化交流工作室"/,
  );
  assert.match(business, /92430802MAE0TE500J/);
  assert.match(business, /https:\/\/www\.gsxt\.gov\.cn\/index\.html/);
  assert.match(footer, /homegroundBusiness\.publicName/);
  for (const retiredLabel of [
    ["registered", "individual", "business"].join(" "),
    ["개인", "사업자"].join(""),
  ]) {
    assert.equal(footer.includes(retiredLabel), false);
  }
  assert.match(footer, /homegroundBusiness\.unifiedSocialCreditCode/);
  assert.match(footer, /business-information/);
  assert.match(footer, /refund-delivery/);
});

test("legal copy leads with verifiable registered trust and keeps each paid scope explicit", async () => {
  const business = await source("lib/homegroundBusiness.ts");
  const legal = await source("lib/homegroundLegalI18n.ts");
  const service = await source("lib/chinaItineraryReviewI18n.ts");

  assert.match(legal, /A verifiable registered business/);
  assert.match(legal, /真实可核验的中国经营主体/);
  assert.match(legal, /중국에서 등록 정보를 확인할 수 있으며/);
  for (const retiredLabel of [
    ["individual", "business"].join(" "),
    ["个体", "工商户"].join(""),
    ["개인", "사업자"].join(""),
    ["Legal", "form"].join(" "),
    ["主体", "类型"].join(""),
    ["사업자", "유형"].join(" "),
  ]) {
    assert.equal(legal.includes(retiredLabel), false);
  }
  for (const retiredScopeCopy of [
    ["Relevant registered", "business scope"].join(" "),
    ["与本网站相关的", "登记经营范围"].join(""),
    ["현재 웹사이트와 관련된", "등록 업무 범위"].join(" "),
  ]) {
    assert.equal(legal.includes(retiredScopeCopy), false);
  }
  assert.doesNotMatch(business, /relevantBusinessScope/);
  assert.match(legal, /Bring the whole trip to Homeground/);
  assert.match(legal, /把整趟旅行的需求交给 Homeground/);
  assert.match(legal, /전체 여행에 필요한 내용을 Homeground에 알려 주세요/);
  assert.match(legal, /유료 서면 컨설팅 진행 절차/);
  assert.doesNotMatch(legal, /travel agency licence|旅行社业务经营许可|여행사 업무 허가/);

  assert.match(service, /Choose Review or Build for a written route service/);
  assert.match(service, /已有路线可选“路线审核”/);
  assert.match(service, /기존 일정이 있다면 검토를/);
  assert.match(service, /Bring the whole journey to Homeground/);
  assert.match(service, /把整趟旅行交给 Homeground/);
  assert.match(service, /전체 여행을 Homeground에 알려 주세요/);
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
  assert.match(sitemap, /getIndexableManifestEntries\(searchPlatformManifest\)/);

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

test("active schemas use the confirmed TravelAgency identity and retain the registered operator", async () => {
  const [identity, homepage, servicePage] = await Promise.all([
    source("lib/editorialIdentity.ts"),
    source("components/HomegroundHomePage.tsx"),
    source("components/ChinaItineraryReviewPage.tsx"),
  ]);

  assert.match(identity, /"@type": "TravelAgency"/);
  assert.match(identity, /name: HOMEGROUND_BRAND_NAME/);
  assert.match(homepage, /homegroundBusiness\.legalName|legalName:/);
  assert.match(servicePage, /homegroundBusiness\.registeredName/);
  assert.match(homepage, /editorialOrganizationSchema\(\)/);
  assert.match(servicePage, /editorialOrganizationSchema\(\)/);
});
