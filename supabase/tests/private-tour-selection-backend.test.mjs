import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import test from "node:test";
import {
  canonicalizeJson,
  currentHomepageEmailFormVersion,
  homepageEmailInquirySchemaVersion,
  homepageEmailPrivacyNoticeVersion,
  semanticInquiryPayload,
  validateAndNormalizeInquiry,
} from "../../lib/inquiryContract.ts";
import {
  getPrivateTourInquiryContext,
  getPrivateTourInquirySubmissionContext,
  getPrivateTourInquirySelection,
  isPrivateTourPreviewInquirySlug,
  privateTourInquirySelectionLabel,
  privateTourInquirySlugs,
} from "../../lib/privateTourInquiryContext.ts";
import {
  trafficProductTravelerCounts,
} from "../functions/_shared/traffic-contracts.ts";
import { privateTourPreviewProducts, privateTourProducts } from "../../lib/privateTourProducts.ts";

const config = {
  allowedFormVersions: [currentHomepageEmailFormVersion],
  allowedPrivacyNoticeVersions: [homepageEmailPrivacyNoticeVersion],
  whatsappEnabled: false,
};
const beijing = "beijing-highlights-5-day-private-tour";
const packages = ["standard-guided", "standard-guided-winter", "english-guided", "no-guide", "fixed-route-english-guided", "selected-city-stay", "spacious-premium-stay", "distinctive-mountain-stay", "small-group-departure", "low-season", "peak-season"];
const phaseTwoSlugs = [
  "shanghai-disneyland-5-day-private-tour",
  "luoyang-dengfeng-kaifeng-6-day-private-tour",
  "datong-pingyao-6-day-private-tour",
  "zhangye-jiayuguan-dunhuang-7-day-private-tour",
  "chongqing-yangtze-cruise-6-day-private-tour",
  "xinjiang-ili-sayram-8-day-private-tour",
  "hulunbuir-7-day-private-tour",
  "kunming-jianshui-yuanyang-6-day-private-tour",
  "shenzhen-family-tech-4-day-private-tour",
  "beijing-xian-shanghai-12-day-private-tour",
];
const longHaulSlugs = [
  "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
  "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour",
  "beijing-xian-silk-road-15-day-private-tour",
  "beijing-xian-yunnan-14-day-private-tour",
  "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour",
  "china-grand-tour-21-day-private-tour",
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour",
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour",
  "beijing-xian-silk-road-15-day-small-group-tour",
  "beijing-xian-guilin-shanghai-10-day-private-tour",
  "beijing-hangzhou-suzhou-shanghai-11-day-private-tour",
  "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour",
  "beijing-xian-shanghai-8-day-private-tour",
  "beijing-xian-guilin-hong-kong-10-day-private-tour",
  "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour",
];
const northeastPreviewSlugs = [
  "harbin-yabuli-snow-town-6-day-private-tour",
  "harbin-snow-town-changbaishan-yanji-8-day-private-tour",
  "harbin-mohe-arctic-village-7-day-private-tour",
  "harbin-snow-town-mohe-9-day-private-tour",
];
const winterPublishedSlugs = [...northeastPreviewSlugs, "yanji-changbaishan-wanda-6-day-private-tour"];
const jiangnanQuoteSlug = "suzhou-tongli-hangzhou-shanghai-12-day-private-tour";
const fiveCityQuoteSlug = "beijing-xian-chengdu-guilin-shanghai-13-day-private-tour";
// Quote-only routes added after the winter release; earlier migrations predate them.
const laterQuoteSlugs = [jiangnanQuoteSlug, fiveCityQuoteSlug];
function payload(context = getPrivateTourInquiryContext(beijing, "en"), locale = "en") {
  return {
    schemaVersion: homepageEmailInquirySchemaVersion,
    formVersion: currentHomepageEmailFormVersion,
    entryPath: "homepage_email",
    locale,
    contact: { channel: "email", email: "traveller@example.com" },
    ...(context ? { productInterest: context } : {}),
    privacyNoticeVersion: homepageEmailPrivacyNoticeVersion,
    attribution: { landingPath: locale === "en" ? "/" : `/${locale}/` },
    experiment: null,
    antiAbuse: { companyWebsite: "" },
  };
}

test("intake preserves every allowed tour selection in every locale and its semantic hash", () => {
  for (const locale of ["en", "zh", "ko", "ja"]) {
    for (const slug of privateTourInquirySlugs) {
      for (const packageId of packages) {
        for (const travelers of [2, 3, 4, 5, 6, 7, 8, 9]) {
          const selection = getPrivateTourInquirySelection(slug, packageId, travelers);
          const context = { ...getPrivateTourInquiryContext(slug, locale), selection: { packageId, travelers } };
          const result = validateAndNormalizeInquiry(payload(context, locale), config);
          // Preview products have no Japanese page, so no Japanese inquiry names them.
          const expected = Boolean(selection) && !(locale === "ja" && isPrivateTourPreviewInquirySlug(slug));
          assert.equal(result.ok, expected, `${locale}:${slug}:${packageId}:${travelers}`);
          if (result.ok) {
            const submitted = getPrivateTourInquirySubmissionContext(context, locale);
            assert.deepEqual(result.value.productInterest, submitted);
            assert.deepEqual(semanticInquiryPayload(result.value).productInterest, submitted);
          }
        }
      }
    }
  }
});

test("selection rejects partial, forged and freely supplied values", () => {
  for (const selection of [
    null, [], {}, { packageId: "no-guide" }, { travelers: 2 },
    { packageId: "no-guide", travelers: "2" },
    { packageId: "no-guide", travelers: true },
    { packageId: "no-guide", travelers: 3 },
    { packageId: "standard-guided", travelers: 2 },
    { packageId: "no-guide", travelers: 2, price: 1 },
    { packageId: "no-guide", travelers: 2, name: "Customer name" },
    { packageId: "no-guide", travelers: 2, note: "Free text" },
    { packageId: "<script>alert(1)</script>", travelers: 2 },
  ]) {
    const input = payload({ ...getPrivateTourInquiryContext(beijing, "en"), selection });
    assert.equal(validateAndNormalizeInquiry(input, config).ok, false, JSON.stringify(selection));
  }
});

test("traffic selection metadata matches every published inquiry price row", () => {
  for (const slug of privateTourInquirySlugs) {
    const expectedTravelers = [2, 3, 4, 5, 6, 7, 8, 9].filter((travelers) =>
      packages.some((packageId) =>
        getPrivateTourInquirySelection(slug, packageId, travelers),
      ),
    );
    assert.deepEqual(trafficProductTravelerCounts[slug], expectedTravelers, `travelers:${slug}`);
  }
});

test("six-traveller prices for two-person-only expansion tours are exactly CNY 200 lower per person", () => {
  for (const slug of [
    "chengdu-jiuzhaigou-huanglong-6-day-private-tour",
    "guizhou-huangguoshu-libo-miao-7-day-private-tour",
    "xiamen-tulou-quanzhou-6-day-private-tour",
    "chengdu-chongqing-8-day-private-tour",
  ]) {
    const product = privateTourProducts.find((candidate) => candidate.slug === slug);
    assert.ok(product, slug);
    const rows = product.packages[0].prices;
    assert.deepEqual(rows.map((row) => row.travelers), [2, 6], slug);
    assert.equal(rows[1].cnyPerPerson, rows[0].cnyPerPerson - 200, slug);
    assert.deepEqual(getPrivateTourInquirySelection(slug, "standard-guided", 6), { packageId: "standard-guided", travelers: 6 });
  }
});

test("six-traveller database whitelist includes the newly published choices", async () => {
  const sql = (await readFile(new URL("../migrations/202609230001_add_six_traveller_private_tour_prices.sql", import.meta.url), "utf8")).replace(/\r\n/g, "\n");
  assert.match(sql, /create or replace function homeground_private\.is_valid_private_tour_selection_v1/u);
  const selectionCase = sql.match(/select case p_slug([\s\S]*?)else false\s+end is true;/u)?.[1];
  assert.ok(selectionCase);
  const newSixPersonSlugs = [
    "shanghai-suzhou-hangzhou-6-day-private-tour",
    "chengdu-pandas-sanxingdui-5-day-private-tour",
    "xian-terracotta-warriors-5-day-private-tour",
    "chongqing-wulong-5-day-private-tour",
    "guilin-yangshuo-5-day-private-tour",
    "harbin-winter-5-day-private-tour",
    "shanghai-suzhou-5-day-private-tour",
    "beijing-highlights-5-day-private-tour",
    "zhangjiajie-forest-4-day-private-tour",
    "zhangjiajie-furong-fenghuang-7-day-private-tour",
    "huangshan-hongcun-huizhou-5-day-private-tour",
    "chengdu-jiuzhaigou-huanglong-6-day-private-tour",
    "guizhou-huangguoshu-libo-miao-7-day-private-tour",
    "xiamen-tulou-quanzhou-6-day-private-tour",
    "chengdu-chongqing-8-day-private-tour",
  ];
  for (const slug of newSixPersonSlugs) {
    const condition = selectionCase.match(new RegExp(`when '${slug}' then\\s+([^\\n]+)`, "u"))?.[1];
    assert.ok(condition?.includes("p_travelers in"), `missing six-person SQL branch: ${slug}`);
    assert.match(condition, /\(\d+(?:, \d+)*, 6\)/u, `missing six-person SQL choice: ${slug}`);
  }
  const legacy = selectionCase.match(/when 'zhangjiajie-4-day-private-tour' then\s+([^\n]+)/u)?.[1];
  assert.ok(legacy?.includes("selected-city-stay") && legacy.includes("spacious-premium-stay") && legacy.includes("distinctive-mountain-stay"));
  assert.match(legacy, /p_travelers = 6/u);
  assert.doesNotMatch(selectionCase, /jingdezhen-wuyuan-wangxian|changbaishan-yanji-winter/u);
});

test("legacy email-only and identity-only payloads retain their original semantic representation", () => {
  for (const context of [null, getPrivateTourInquiryContext(beijing, "en")]) {
    const input = payload(context);
    const result = validateAndNormalizeInquiry(input, config);
    assert.equal(result.ok, true);
    const expectedLegacySemantic = {
      schemaVersion: input.schemaVersion,
      formVersion: input.formVersion,
      entryPath: input.entryPath,
      locale: input.locale,
      contact: input.contact,
      ...(context ? { productInterest: context } : {}),
      privacyNoticeVersion: input.privacyNoticeVersion,
      attribution: { landingPath: "/", utmSource: null, utmMedium: null, utmCampaign: null },
      experiment: null,
    };
    assert.equal(canonicalizeJson(semanticInquiryPayload(result.value)), canonicalizeJson(expectedLegacySemantic));
  }
});

test("phase-one migration keeps canonical names, narrow JSON, atomic persistence and service-role grants", async () => {
  const sql = (await readFile(new URL("../migrations/202609210001_add_homeground_private_tour_expansion.sql", import.meta.url), "utf8")).replace(/\r\n/g, "\n");
  for (const slug of privateTourInquirySlugs.filter((candidate) => !phaseTwoSlugs.includes(candidate) && !longHaulSlugs.includes(candidate) && !winterPublishedSlugs.includes(candidate) && !laterQuoteSlugs.includes(candidate))) {
    assert.ok(sql.includes(`when '${slug}'`), slug);
    for (const locale of ["en", "zh", "ko"]) {
      const context = getPrivateTourInquiryContext(slug, locale);
      const name = getPrivateTourInquirySubmissionContext(context, locale).name.replaceAll("'", "''");
      assert.ok(sql.includes(`then '${name}'`), `${locale}:${slug}`);
    }
  }
  const selectionCase = sql.match(
    /create or replace function homeground_private\.is_valid_private_tour_selection_v1[\s\S]*?select case p_slug([\s\S]*?)else false\s+end is true;/u,
  )?.[1];
  assert.ok(selectionCase);
  const expansionRows = {
    "chengdu-jiuzhaigou-huanglong-6-day-private-tour": /p_package_id = 'standard-guided' and p_travelers = 2/u,
    "kunming-dali-lijiang-8-day-private-tour": /p_package_id = 'standard-guided' and p_travelers = 6/u,
    "guizhou-huangguoshu-libo-miao-7-day-private-tour": /p_package_id = 'standard-guided' and p_travelers = 2/u,
    "xiamen-tulou-quanzhou-6-day-private-tour": /p_package_id = 'standard-guided' and p_travelers = 2/u,
    "chaozhou-shantou-nanao-5-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "chengdu-chongqing-8-day-private-tour": /p_package_id = 'standard-guided' and p_travelers = 2/u,
    "guangzhou-shunde-foshan-5-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "huangshan-hongcun-huizhou-5-day-private-tour": /p_package_id = 'standard-guided' and p_travelers = 4/u,
  };
  for (const [slug, condition] of Object.entries(expansionRows)) {
    const branch = selectionCase.match(
      new RegExp(`when '${slug}' then\\s+([^\\n]+)`, "u"),
    )?.[1];
    assert.ok(branch && condition.test(branch), `SQL selection drift: ${slug}`);
  }
  assert.doesNotMatch(selectionCase, /jingdezhen-wuyuan-wangxian|changbaishan-yanji-winter/u);
  assert.match(sql, /jsonb_typeof\(product_selection -> 'travelers'\) is distinct from 'number'/);
  assert.match(sql, /when '2'::jsonb then 2/);
  assert.match(sql, /when '4'::jsonb then 4/);
  assert.match(sql, /when '6'::jsonb then 6/);
  const trafficEventValidator = sql.match(
    /create or replace function homeground_private\.is_valid_traffic_event_v2[\s\S]*?return true;\s+end;\s+\$\$;/u,
  )?.[0];
  assert.ok(trafficEventValidator);
  assert.match(trafficEventValidator, /'6'::jsonb/);
  assert.match(trafficEventValidator, /is_valid_traffic_product_v2/);
  assert.match(sql, /product_selection is distinct from expected_selection/);
  assert.match(sql, /p_attribution is distinct from expected_attribution/);
  assert.match(sql, /homepage_answers :=[\s\S]+\|\| expected_attribution/);
  assert.match(sql, /create_homeground_inquiry\(\s*1::smallint/);
  assert.match(sql, /answers_json = homepage_answers/);
  assert.match(sql, /from public, anon, authenticated/);
  assert.match(sql, /to service_role/);
});

test("phase-two migration extends canonical identities and exact priced selections", async () => {
  const sql = (await readFile(new URL("../migrations/202609210002_add_homeground_private_tour_expansion_phase_two.sql", import.meta.url), "utf8")).replace(/\r\n/g, "\n");
  for (const slug of privateTourInquirySlugs.filter((candidate) => !longHaulSlugs.includes(candidate) && !winterPublishedSlugs.includes(candidate) && !laterQuoteSlugs.includes(candidate))) {
    assert.ok(sql.includes(`when '${slug}'`), slug);
    for (const locale of ["en", "zh", "ko"]) {
      const context = getPrivateTourInquiryContext(slug, locale);
      const name = getPrivateTourInquirySubmissionContext(context, locale).name.replaceAll("'", "''");
      assert.ok(sql.includes(`then '${name}'`), `${locale}:${slug}`);
    }
  }
  const selectionCase = sql.match(
    /create or replace function homeground_private\.is_valid_private_tour_selection_v1[\s\S]*?select case p_slug([\s\S]*?)else false\s+end is true;/u,
  )?.[1];
  assert.ok(selectionCase);
  const pricedRows = {
    "luoyang-dengfeng-kaifeng-6-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "zhangye-jiayuguan-dunhuang-7-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "kunming-jianshui-yuanyang-6-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "shenzhen-family-tech-4-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "beijing-xian-shanghai-12-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
  };
  for (const [slug, condition] of Object.entries(pricedRows)) {
    const branch = selectionCase.match(
      new RegExp(`when '${slug}' then\\s+([^\\n]+)`, "u"),
    )?.[1];
    assert.ok(branch && condition.test(branch), `SQL selection drift: ${slug}`);
  }
  for (const slug of [
    "shanghai-disneyland-5-day-private-tour",
    "datong-pingyao-6-day-private-tour",
    "chongqing-yangtze-cruise-6-day-private-tour",
    "xinjiang-ili-sayram-8-day-private-tour",
    "hulunbuir-7-day-private-tour",
  ]) {
    assert.doesNotMatch(selectionCase, new RegExp(slug, "u"), `quote-only selection branch: ${slug}`);
  }
  assert.match(sql, /begin;[\s\S]*commit;/u);
  assert.match(sql, /revoke all on function homeground_private\.private_tour_product_name_v1/u);
  assert.match(sql, /revoke all on function homeground_private\.is_valid_private_tour_selection_v1/u);
  assert.doesNotMatch(sql, /create or replace function public\./u);
  assert.doesNotMatch(sql, /create or replace function homeground_private\.is_valid_traffic_event_v2/u);
});

test("long-haul selection migration preserves every price row published at that release", async () => {
  const sql = (await readFile(new URL("../migrations/202609250001_add_homeground_long_haul_tours.sql", import.meta.url), "utf8")).replace(/\r\n/g, "\n");
  const selectionCase = sql.match(
    /create or replace function homeground_private\.is_valid_private_tour_selection_v1[\s\S]*?select case p_slug([\s\S]*?)else false\s+end is true;/u,
  )?.[1];
  assert.ok(selectionCase);
  for (const product of privateTourProducts.filter((candidate) => !winterPublishedSlugs.includes(candidate.slug) && !laterQuoteSlugs.includes(candidate.slug))) {
    const branch = selectionCase.match(
      new RegExp(`when '${product.slug}' then\\s+([^\\n]+)`, "u"),
    )?.[1];
    const pricedPackages = product.packages.filter((tourPackage) => tourPackage.prices.length > 0);
    if (pricedPackages.length === 0) {
      assert.equal(branch, undefined, `quote-only product must not accept a priced selection: ${product.slug}`);
      continue;
    }
    assert.ok(branch, `missing selection rule: ${product.slug}`);
    for (const tourPackage of pricedPackages) {
      assert.ok(branch.includes(`'${tourPackage.id}'`), `${product.slug}:${tourPackage.id}`);
    }
    const publishedTravelers = [...new Set(pricedPackages.flatMap((tourPackage) => tourPackage.prices.map((row) => row.travelers)))].sort();
    const acceptedTravelers = [...new Set([...branch.matchAll(/\b[246]\b/gu)].map((match) => Number(match[0])))].sort();
    assert.deepEqual(acceptedTravelers, publishedTravelers, `selection price rows drift: ${product.slug}`);
  }
  assert.match(selectionCase, /when 'zhangjiajie-4-day-private-tour' then\s+p_package_id in \('selected-city-stay', 'spacious-premium-stay', 'distinctive-mountain-stay'\) and p_travelers = 6/u);
});

test("long-haul migration keeps every canonical identity and adds all long-haul selections", async () => {
  const sql = (await readFile(new URL("../migrations/202609250001_add_homeground_long_haul_tours.sql", import.meta.url), "utf8")).replace(/\r\n/g, "\n");
  for (const slug of privateTourInquirySlugs.filter((candidate) => !winterPublishedSlugs.includes(candidate) && !laterQuoteSlugs.includes(candidate))) {
    assert.ok(sql.includes(`when '${slug}'`), slug);
    for (const locale of ["en", "zh", "ko"]) {
      const context = getPrivateTourInquiryContext(slug, locale);
      const name = getPrivateTourInquirySubmissionContext(context, locale).name.replaceAll("'", "''");
      assert.ok(sql.includes(`then '${name}'`), `${locale}:${slug}`);
    }
  }
  const selectionCase = sql.match(
    /create or replace function homeground_private\.is_valid_private_tour_selection_v1[\s\S]*?select case p_slug([\s\S]*?)else false\s+end is true;/u,
  )?.[1];
  assert.ok(selectionCase);
  const longHaulRows = {
    "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour": /p_package_id = 'small-group-departure' and p_travelers = 2$/u,
    "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "beijing-xian-silk-road-15-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "beijing-xian-yunnan-14-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "china-grand-tour-21-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour": /p_package_id = 'small-group-departure' and p_travelers = 2$/u,
    "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour": /p_package_id = 'small-group-departure' and p_travelers = 2$/u,
    "beijing-xian-silk-road-15-day-small-group-tour": /p_package_id = 'small-group-departure' and p_travelers = 2$/u,
    "beijing-xian-guilin-shanghai-10-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "beijing-hangzhou-suzhou-shanghai-11-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "beijing-xian-shanghai-8-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "beijing-xian-guilin-hong-kong-10-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
    "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour": /p_package_id = 'standard-guided' and p_travelers in \(2, 4, 6\)/u,
  };
  assert.deepEqual(Object.keys(longHaulRows), longHaulSlugs);
  for (const [slug, condition] of Object.entries(longHaulRows)) {
    const branch = selectionCase.match(new RegExp(`when '${slug}' then\\s+([^\\n]+)`, "u"))?.[1];
    assert.ok(branch && condition.test(branch), `SQL selection drift: ${slug}`);
  }
  const groupSlug = "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour";
  for (const locale of ["en", "zh", "ko"]) {
    const context = getPrivateTourInquiryContext(groupSlug, locale, {
      packageId: "small-group-departure", travelers: 2,
    });
    const label = privateTourInquirySelectionLabel(context, locale);
    assert.match(label, locale === "en" ? /twin-share price basis/u
      : locale === "zh" ? /双人同住价格基准/u
        : /2인 1실 요금 기준/u);
    assert.doesNotMatch(label, /2 travellers|2 人同行|2명 기준/u);
  }
  assert.match(sql, /begin;[\s\S]*commit;/u);
  assert.match(sql, /revoke all on function homeground_private\.private_tour_product_name_v1/u);
  assert.match(sql, /revoke all on function homeground_private\.is_valid_private_tour_selection_v1/u);
  assert.doesNotMatch(sql, /create or replace function public\./u);
});

test("Northeast preview migration keeps every identity and adds exact eight-traveller seasonal selections", async () => {
  const sql = (await readFile(new URL("../migrations/202609300001_add_northeast_winter_preview_tours.sql", import.meta.url), "utf8")).replace(/\r\n/g, "\n");
  const [japaneseSql, longHaulSql, ackSql] = await Promise.all([
    "202609270001_add_japanese_email_and_quote_inquiries.sql",
    "202609250001_add_homeground_long_haul_tours.sql",
    "202609280002_inquiry_privacy_ack_disclosure.sql",
  ].map(async (name) => (await readFile(new URL(`../migrations/${name}`, import.meta.url), "utf8")).replace(/\r\n/g, "\n")));
  assert.deepEqual(northeastPreviewSlugs.filter((slug) => privateTourProducts.some((product) => product.slug === slug)), northeastPreviewSlugs);
  assert.deepEqual(northeastPreviewSlugs.filter(isPrivateTourPreviewInquirySlug), []);
  const productNames = sql.match(/create or replace function homeground_private\.private_tour_product_name_v1\([\s\S]*?\n\$\$;/u)?.[0];
  assert.ok(productNames);
  // Every earlier identity, including the Japanese names, is carried over verbatim.
  const previousNames = japaneseSql.match(/create or replace function homeground_private\.private_tour_product_name_v1\([\s\S]*?\n\$\$;/u)?.[0];
  assert.ok(productNames.startsWith(previousNames.replace(/    else null\n  end;\n\$\$;$/u, "")));
  for (const slug of privateTourInquirySlugs.filter((candidate) => candidate !== "yanji-changbaishan-wanda-6-day-private-tour" && !laterQuoteSlugs.includes(candidate))) {
    const branch = productNames.match(new RegExp(`when '${slug}' then case p_locale([\\s\\S]*?)else null end`, "u"))?.[1];
    assert.ok(branch, slug);
    for (const locale of ["en", "zh", "ko"]) {
      const context = getPrivateTourInquiryContext(slug, locale);
      const name = getPrivateTourInquirySubmissionContext(context, locale).name.replaceAll("'", "''");
      assert.ok(branch.includes(`when '${locale}' then '${name}'`), `${locale}:${slug}`);
    }
    if (northeastPreviewSlugs.includes(slug)) {
      assert.doesNotMatch(branch, /when 'ja'/u, `preview has no Japanese identity: ${slug}`);
    }
  }
  const selectionCase = sql.match(
    /create or replace function homeground_private\.is_valid_private_tour_selection_v1[\s\S]*?select case p_slug([\s\S]*?)else false\s+end is true;/u,
  )?.[1];
  assert.ok(selectionCase);
  const previousSelection = longHaulSql.match(
    /create or replace function homeground_private\.is_valid_private_tour_selection_v1[\s\S]*?select case p_slug([\s\S]*?)else false\s+end is true;/u,
  )?.[1];
  assert.ok(selectionCase.startsWith(previousSelection));
  for (const product of [...privateTourProducts, ...privateTourPreviewProducts].filter((candidate) => candidate.slug !== "yanji-changbaishan-wanda-6-day-private-tour" && !laterQuoteSlugs.includes(candidate.slug))) {
    const branch = selectionCase.match(new RegExp(`when '${product.slug}' then\\s+([^\\n]+)`, "u"))?.[1];
    const pricedPackages = product.packages.filter((tourPackage) => tourPackage.prices.length > 0);
    if (pricedPackages.length === 0) {
      assert.equal(branch, undefined, product.slug);
      continue;
    }
    assert.ok(branch, `missing selection rule: ${product.slug}`);
    for (const tourPackage of pricedPackages) assert.ok(branch.includes(`'${tourPackage.id}'`), `${product.slug}:${tourPackage.id}`);
    const publishedTravelers = [...new Set(pricedPackages.flatMap((tourPackage) => tourPackage.prices.map((row) => row.travelers)))].sort();
    const acceptedTravelers = [...new Set([...branch.matchAll(/\b[2-9]\b/gu)].map((match) => Number(match[0])))].sort();
    assert.deepEqual(acceptedTravelers, publishedTravelers, `selection price rows drift: ${product.slug}`);
  }
  for (const slug of northeastPreviewSlugs) {
    assert.match(selectionCase, new RegExp(`when '${slug}' then\\s+p_package_id in \\('low-season', 'peak-season'\\) and p_travelers in \\(2, 4, 6, 8\\)\\n`, "u"));
  }
  // Intake functions are the reviewed definitions plus one eight-traveller branch.
  for (const name of ["create_homeground_homepage_email_v1", "create_homeground_private_tour_quote_v1"]) {
    const pattern = new RegExp(`create or replace function public\\.${name}\\([\\s\\S]*?\\n\\$\\$;`, "u");
    const current = sql.match(pattern)?.[0];
    const previous = ackSql.match(pattern)?.[0];
    assert.ok(current && previous, name);
    assert.equal(current, previous.replace("        when '6'::jsonb then 6\n", "        when '6'::jsonb then 6\n        when '8'::jsonb then 8\n"), name);
  }
  assert.match(sql, /begin;[\s\S]*commit;/u);
  assert.match(sql, /revoke all on function homeground_private\.private_tour_product_name_v1/u);
  assert.match(sql, /revoke all on function homeground_private\.is_valid_private_tour_selection_v1/u);
  assert.doesNotMatch(sql, /create or replace function homeground_private\.is_valid_traffic_event_v2/u);
});

test("eight-traveller preview selections survive intake, labels and traffic metadata", () => {
  for (const slug of northeastPreviewSlugs) {
    for (const packageId of ["low-season", "peak-season"]) {
      for (const locale of ["en", "zh", "ko"]) {
        const context = getPrivateTourInquiryContext(slug, locale, { packageId, travelers: 8 });
        assert.deepEqual(context.selection, { packageId, travelers: 8 });
        const result = validateAndNormalizeInquiry(payload(context, locale), config);
        assert.equal(result.ok, true, `${locale}:${slug}:${packageId}`);
        const label = privateTourInquirySelectionLabel(context, locale);
        assert.match(label, locale === "en" ? /8 travellers/u : locale === "zh" ? /8 人同行/u : /8명 기준/u);
        assert.match(label, packageId === "low-season"
          ? (locale === "en" ? /Low season/u : locale === "zh" ? /淡季/u : /비수기/u)
          : (locale === "en" ? /Peak season/u : locale === "zh" ? /旺季/u : /성수기/u));
      }
      assert.ok(getPrivateTourInquiryContext(slug, "ja", { packageId, travelers: 8 }));
      assert.equal(getPrivateTourInquirySelection(slug, packageId, 3), null);
      assert.equal(getPrivateTourInquirySelection(slug, "standard-guided", 8), null);
    }
    assert.deepEqual(trafficProductTravelerCounts[slug], [2, 4, 6, 8]);
  }
});

test("winter publication migration accepts all five routes and Japanese product names", async () => {
  const sql = (await readFile(
    new URL("../migrations/202610090001_publish_northeast_winter_products.sql", import.meta.url),
    "utf8",
  )).replace(/\r\n/g, "\n");
  const names = sql.match(
    /create or replace function homeground_private\.private_tour_product_name_v1\([\s\S]*?\n\$\$;/u,
  )?.[0];
  const selection = sql.match(
    /create or replace function homeground_private\.is_valid_private_tour_selection_v1[\s\S]*?select case p_slug([\s\S]*?)else false\s+end is true;/u,
  )?.[1];
  assert.ok(names && selection);
  for (const slug of winterPublishedSlugs) {
    const branch = names.match(new RegExp(`when '${slug}' then case p_locale([\\s\\S]*?)else null end`, "u"))?.[1];
    assert.ok(branch, slug);
    for (const locale of ["en", "zh", "ko", "ja"]) {
      const context = getPrivateTourInquiryContext(slug, locale);
      const name = getPrivateTourInquirySubmissionContext(context, locale).name.replaceAll("'", "''");
      assert.ok(branch.includes(`when '${locale}' then '${name}'`), `${locale}:${slug}`);
    }
    assert.match(
      selection,
      new RegExp(`when '${slug}' then\\s+p_package_id in \\('low-season', 'peak-season'\\) and p_travelers in \\(2, 4, 6, 8\\)`, "u"),
    );
  }
  assert.match(sql, /begin;[\s\S]*commit;/u);
  assert.match(sql, /revoke all on function homeground_private\.private_tour_product_name_v1/u);
  assert.match(sql, /revoke all on function homeground_private\.is_valid_private_tour_selection_v1/u);
});

test("Jiangnan quote migration adds one identity after the winter release", async () => {
  const migrations = new URL("../migrations/", import.meta.url);
  const filename = "202610100001_add_jiangnan_quote_route.sql";
  const [previous, sql, filenames] = await Promise.all([
    readFile(new URL("202610090001_publish_northeast_winter_products.sql", migrations), "utf8"),
    readFile(new URL(filename, migrations), "utf8"),
    readdir(migrations),
  ]);
  assert.deepEqual(filenames.filter((name) => name.startsWith("202610100001_")), [filename]);
  const nameFunction = /create or replace function homeground_private\.private_tour_product_name_v1\([\s\S]*?\n\$\$;/u;
  const earlierNames = previous.replace(/\r\n/g, "\n").match(nameFunction)?.[0];
  const currentNames = sql.replace(/\r\n/g, "\n").match(nameFunction)?.[0];
  assert.ok(earlierNames && currentNames);
  const added = currentNames.match(/    when 'suzhou-tongli-hangzhou-shanghai-12-day-private-tour' then case p_locale\n[\s\S]*?      else null end\n/u)?.[0];
  assert.ok(added);
  assert.equal(currentNames.replace(added, ""), earlierNames, "all earlier names, including Yanji, remain byte-for-byte unchanged");
  for (const [locale, name] of Object.entries({
    en: "Jiangnan, The Art of Living: 12 Days in Suzhou, Tongli, Hangzhou & Shanghai",
    zh: "江南，生活的艺术｜苏州·同里·杭州·上海 12 天私家旅程",
    ko: "중국 강남, 물길에 머무는 12일｜쑤저우·퉁리·항저우·상하이 프라이빗 여행",
    ja: "江南、暮らしの芸術｜蘇州・同里・杭州・上海12日間プライベートツアー",
  })) {
    assert.ok(added.includes(`when '${locale}' then '${name}'`), locale);
  }
  assert.doesNotMatch(sql, /beijing-xian-chengdu-guilin-shanghai-13-day-private-tour/u);
  assert.doesNotMatch(sql, /create or replace function homeground_private\.is_valid_private_tour_selection_v1/u);
  assert.doesNotMatch(sql, /create or replace function public\./u);
  assert.match(sql, /begin;[\s\S]*commit;/u);
  assert.match(sql, /revoke all on function homeground_private\.private_tour_product_name_v1/u);
});

test("Five-city quote migration adds one identity after the Jiangnan route", async () => {
  const migrations = new URL("../migrations/", import.meta.url);
  const filename = "202610100002_add_five_city_quote_route.sql";
  const [previous, sql, filenames] = await Promise.all([
    readFile(new URL("202610100001_add_jiangnan_quote_route.sql", migrations), "utf8"),
    readFile(new URL(filename, migrations), "utf8"),
    readdir(migrations),
  ]);
  assert.deepEqual(filenames.filter((name) => name.startsWith("202610100002_")), [filename]);
  const nameFunction = /create or replace function homeground_private\.private_tour_product_name_v1\([\s\S]*?\n\$\$;/u;
  const earlierNames = previous.replace(/\r\n/g, "\n").match(nameFunction)?.[0];
  const currentNames = sql.replace(/\r\n/g, "\n").match(nameFunction)?.[0];
  assert.ok(earlierNames && currentNames);
  const added = currentNames.match(/    when 'beijing-xian-chengdu-guilin-shanghai-13-day-private-tour' then case p_locale\n[\s\S]*?      else null end\n/u)?.[0];
  assert.ok(added);
  assert.equal(currentNames.replace(added, ""), earlierNames, "all earlier names, including Jiangnan, remain byte-for-byte unchanged");
  for (const locale of ["en", "zh", "ko"]) {
    const context = getPrivateTourInquiryContext(fiveCityQuoteSlug, locale);
    const name = getPrivateTourInquirySubmissionContext(context, locale).name.replaceAll("'", "''");
    assert.ok(added.includes(`when '${locale}' then '${name}'`), locale);
  }
  assert.ok(added.includes("when 'ja' then '北京・西安・成都・桂林・上海 13日間（12泊）プライベートツアー'"));
  assert.doesNotMatch(sql, /create or replace function homeground_private\.is_valid_private_tour_selection_v1/u);
  assert.doesNotMatch(sql, /create or replace function public\./u);
  assert.match(sql, /begin;[\s\S]*commit;/u);
  assert.match(sql, /revoke all on function homeground_private\.private_tour_product_name_v1/u);
});

test("Edge intake forwards selections, preserves retry identity, and notification renders only validated selections", async () => {
  const originalDeno = globalThis.Deno;
  const originalFetch = globalThis.fetch;
  const env = new Map([
    ["ALLOWED_ORIGINS", "https://homegroundchina.com"],
    ["ALLOWED_FORM_VERSIONS", currentHomepageEmailFormVersion],
    ["ALLOWED_PRIVACY_NOTICE_VERSIONS", homepageEmailPrivacyNoticeVersion],
    ["SUPABASE_URL", "https://project.supabase.co"],
    ["SUPABASE_SECRET_KEYS", JSON.stringify({ default: "test-server-key" })],
    ["IDEMPOTENCY_HASH_SECRET", "idempotency-test-secret"],
    ["RATE_LIMIT_HASH_SECRET", "rate-limit-test-secret"],
    ["NOTIFICATION_WORKER_SECRET", "test-worker-secret-000000000000000000"],
    ["RESEND_API_KEY", "test-resend-key"],
    ["RESEND_FROM_EMAIL", "Homeground <sender@example.com>"],
    ["BRAND_NOTIFICATION_EMAIL", "planner@example.com"],
  ]);
  let handler;
  let attribution;
  let currentJob;
  const saved = new Map();
  const messages = [];
  let persistenceCalls = 0;
  globalThis.Deno = { env: { get: (name) => env.get(name) }, serve: (value) => { handler = value; } };
  const response = (body) => new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
  globalThis.fetch = async (url, init) => {
    const body = JSON.parse(init.body);
    const path = new URL(String(url)).pathname;
    if (String(url) === "https://api.resend.com/emails") {
      messages.push(body);
      return response({ id: "test-message" });
    }
    if (path.endsWith("/create_homeground_homepage_email_v1")) {
      persistenceCalls += 1;
      assert.equal(Object.hasOwn(body, "p_traffic_session_hash"), false);
      attribution = body.p_attribution;
      const previous = saved.get(body.p_idempotency_key_hash);
      if (previous && previous !== body.p_payload_hash) return response({ outcome: "idempotency_conflict" });
      saved.set(body.p_idempotency_key_hash, body.p_payload_hash);
      return response({ outcome: previous ? "replay" : "created", inquiryId: "66c78072-5792-4573-9668-93c8e2e88c89", publicReference: "HG-TEST", receivedAt: "2026-09-05T00:00:00Z" });
    }
    if (path.endsWith("/claim_homeground_notification_jobs_v4")) return response([currentJob]);
    if (path.endsWith("/freeze_homeground_notification_message_v1")) return response(body.p_message);
    if (path.endsWith("/finish_homeground_notification_job")) return response(true);
    throw new Error(`Unexpected network request: ${url}`);
  };
  try {
    await import(new URL(`../functions/v1-inquiries/index.ts?selection=${Date.now()}`, import.meta.url));
    const intake = handler;
    const request = (input, key) => new Request("https://project.supabase.co/functions/v1/v1-inquiries", {
      method: "POST", headers: { "Content-Type": "application/json", Origin: "https://homegroundchina.com", "Idempotency-Key": key, "X-Forwarded-For": "203.0.113.42" }, body: JSON.stringify(input),
    });
    const selected = getPrivateTourInquiryContext(beijing, "en", { packageId: "no-guide", travelers: 4 });
    const key = randomUUID();
    assert.equal((await intake(request(payload(selected), key))).status, 201);
    assert.deepEqual(attribution, { productInterest: selected });
    assert.equal((await intake(request(payload(selected), key))).status, 200);
    assert.equal((await intake(request(payload({ ...selected, selection: { ...selected.selection, travelers: 2 } }), key))).status, 409);
    const beforeInvalid = persistenceCalls;
    assert.equal((await intake(request(payload({ ...selected, selection: { ...selected.selection, price: 1 } }), randomUUID()))).status, 422);
    assert.equal(persistenceCalls, beforeInvalid);

    const japanese = getPrivateTourInquiryContext(beijing, "ja", { packageId: "no-guide", travelers: 4 });
    assert.equal((await intake(request(payload(japanese, "ja"), randomUUID()))).status, 201);
    assert.deepEqual(attribution, { productInterest: japanese });

    for (const slug of [
      "zhangjiajie-forest-4-day-private-tour",
      "zhangjiajie-furong-fenghuang-7-day-private-tour",
      "zhangjiajie-4-day-private-tour",
    ]) {
      const displayed = getPrivateTourInquiryContext(slug, "ko");
      const submitted = getPrivateTourInquirySubmissionContext(displayed, "ko");
      const sameKey = randomUUID();
      assert.equal((await intake(request(payload(submitted, "ko"), sameKey))).status, 201);
      assert.deepEqual(attribution, { productInterest: submitted });
      assert.equal((await intake(request(payload(displayed, "ko"), sameKey))).status, 200);
      assert.deepEqual(attribution, { productInterest: submitted });
    }

    await import(new URL(`../functions/notify-inquiries/index.ts?selection=${Date.now()}`, import.meta.url));
    const worker = handler;
    const baseJob = {
      job_id: randomUUID(), inquiry_id: randomUUID(), public_reference: "HG-TEST", locale: "en", route_id: "homepage-email",
      route_snapshot: { kind: "homepage-email", informationStatus: "not_provided", ruleVersion: currentHomepageEmailFormVersion },
      reply_channel: "email", contact_email: "traveller@example.com", contact_phone_e164: null,
      departure_country: null, rough_budget_per_person: null, note: null,
      inquiry_created_at: "2026-09-05T00:00:00Z", first_response_due_at: "2026-09-06T00:00:00Z",
      lease_token: randomUUID(), row_version: 1, attempt_count: 1,
    };
    const runWorker = () => worker(new Request("https://project.supabase.co/functions/v1/notify-inquiries", { method: "POST", headers: { "x-worker-secret": env.get("NOTIFICATION_WORKER_SECRET") } }));
    for (const locale of ["en", "zh", "ko", "ja"]) {
      for (const packageId of ["english-guided", "no-guide"]) {
      const context = getPrivateTourInquiryContext(beijing, locale, { packageId, travelers: 4 });
      currentJob = { ...baseJob, locale, answers: { informationStatus: "not_provided", productInterest: context } };
      assert.equal((await (await runWorker()).json()).accepted, 1);
      const message = messages.at(-1);
      const label = privateTourInquirySelectionLabel(context, locale);
      assert.ok(message.text.includes(label));
      assert.ok(message.html.includes(label));
      assert.doesNotMatch(message.text, /No itinerary, traveller/);
      assert.equal(message.reply_to, undefined);
      assert.match(message.html, /Write to traveller/);
      }
    }
    for (const slug of phaseTwoSlugs) {
      const travelers = trafficProductTravelerCounts[slug][0];
      if (!travelers) {
        const context = getPrivateTourInquiryContext(slug, "ko");
        currentJob = {
          ...baseJob,
          locale: "ko",
          answers: { informationStatus: "not_provided", productInterest: context },
        };
        assert.equal((await (await runWorker()).json()).accepted, 1, slug);
        const message = messages.at(-1);
        assert.ok(message.text.includes("Tour selection: 한국어 가이드 포함"), slug);
        assert.ok(message.html.includes("한국어 가이드 포함"), slug);
        assert.ok(
          message.text.includes("The published service scope is recorded below."),
          slug,
        );
        assert.doesNotMatch(message.text, /group size are recorded below/u, slug);
        continue;
      }
      const context = getPrivateTourInquiryContext(
        slug,
        "ko",
        { packageId: "standard-guided", travelers },
      );
      const normalized = validateAndNormalizeInquiry(payload(context, "ko"), config);
      assert.equal(normalized.ok, true, slug);
      assert.equal(normalized.value.locale, "ko", slug);
      assert.deepEqual(normalized.value.productInterest, context, slug);

      currentJob = {
        ...baseJob,
        locale: "ko",
        answers: { informationStatus: "not_provided", productInterest: context },
      };
      assert.equal((await (await runWorker()).json()).accepted, 1, slug);
      const message = messages.at(-1);
      const label = `한국어 가이드 포함 · ${travelers}명 기준`;
      assert.ok(message.text.includes(label), slug);
      assert.ok(message.html.includes(label), slug);
    }
    for (const context of [null, getPrivateTourInquiryContext(beijing, "en")]) {
      currentJob = { ...baseJob, answers: { informationStatus: "not_provided", ...(context ? { productInterest: context } : {}) } };
      assert.equal((await (await runWorker()).json()).accepted, 1);
      assert.doesNotMatch(messages.at(-1).text, /Tour selection/);
    }
    for (const slug of [
      "zhangjiajie-forest-4-day-private-tour",
      "zhangjiajie-furong-fenghuang-7-day-private-tour",
      "zhangjiajie-4-day-private-tour",
    ]) {
      const displayed = getPrivateTourInquiryContext(slug, "ko");
      for (const context of [getPrivateTourInquirySubmissionContext(displayed, "ko"), displayed]) {
        currentJob = { ...baseJob, locale: "ko", answers: { informationStatus: "not_provided", productInterest: context } };
        assert.equal((await (await runWorker()).json()).accepted, 1, `${slug}:${context.name}`);
      }
    }
    const beforeInvalidJob = messages.length;
    currentJob = { ...baseJob, answers: { informationStatus: "not_provided", productInterest: { ...selected, selection: { ...selected.selection, price: 1 } } } };
    assert.equal((await (await runWorker()).json()).terminalFailed, 1);
    assert.equal(messages.length, beforeInvalidJob);
  } finally {
    globalThis.Deno = originalDeno;
    globalThis.fetch = originalFetch;
  }
});
