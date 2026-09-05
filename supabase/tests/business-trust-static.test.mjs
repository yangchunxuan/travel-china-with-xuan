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

test("legal copy retains verifiable registered trust and explains retired services", async () => {
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
  assert.match(legal, /How a trip enquiry moves forward/);
  assert.match(legal, /旅行询价如何继续/);
  assert.match(legal, /여행 문의 진행 절차/);
  assert.doesNotMatch(legal, /유료 서면 컨설팅 진행 절차|written consultation payments|书面咨询服务如何确认/);
  assert.doesNotMatch(legal, /travel agency licence|旅行社业务经营许可|여행사 업무 허가/);

  for (const pattern of [
    /no longer offers standalone paid route reviews or route builds/,
    /不再提供单独收费的路线审核或路线规划服务/,
    /더 이상 제공하지 않습니다/,
    /Existing accepted services remain subject to their written agreement/,
    /已经接受的服务仍按原书面约定处理/,
    /이미 수락된 서비스에는 기존 서면 약정이 적용됩니다/,
  ]) {
    assert.match(service, pattern);
  }
  assert.doesNotMatch(service, /US\$(69|129)|69 美元|129 美元|Choose Review or Build/);
  assert.match(legal, /value: homegroundBusiness\.registeredName/);
  assert.match(legal, /Existing accepted services remain subject to their original written agreement/);
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

test("active business identity remains available after the sales page becomes a withdrawal notice", async () => {
  const [identity, homepage, legalPage, footer, retiredServicePage] = await Promise.all([
    source("lib/editorialIdentity.ts"),
    source("components/HomegroundHomePage.tsx"),
    source("components/HomegroundLegalPage.tsx"),
    source("components/HomegroundFooter.tsx"),
    source("components/ChinaItineraryReviewPage.tsx"),
  ]);

  assert.match(identity, /"@type": "TravelAgency"/);
  assert.match(identity, /name: HOMEGROUND_BRAND_NAME/);
  assert.match(homepage, /legalName: homegroundBusiness\.registeredName/);
  assert.match(homepage, /editorialOrganizationSchema\(\)/);
  assert.match(legalPage, /"@type": pageId === "business-information" \? "AboutPage" : "WebPage"/);
  assert.match(legalPage, /"@id": `\$\{baseUrl\}\/#organization`/);
  assert.match(footer, /homegroundBusiness\.publicName/);
  assert.match(footer, /homegroundBusiness\.unifiedSocialCreditCode/);
  assert.match(retiredServicePage, /<HomegroundFooter locale=\{locale\}/);
  assert.doesNotMatch(retiredServicePage, /"@type": "(?:Offer|Service)"|review-my-route|build-my-route/);
});
