import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";
import sharp from "sharp";

import en from "../../content/guides/downtown-dunhuang-or-mingsha-mountain-hotel-base/body.en.ts";
import zh from "../../content/guides/downtown-dunhuang-or-mingsha-mountain-hotel-base/body.zh.ts";
import ko from "../../content/guides/downtown-dunhuang-or-mingsha-mountain-hotel-base/body.ko.ts";
import {
  guideUpdatePolicy,
  resolveGuideEntities,
} from "../../lib/searchPlatformGuidePolicy.ts";
import { getGuideCollectionId } from "../../lib/searchCollectionI18n.ts";

const slug = "downtown-dunhuang-or-mingsha-mountain-hotel-base";
const root = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

function signature(body) {
  return body.blocks.map((item) => `${item.id}:${item.type}`);
}

function shape(body) {
  return body.blocks.map((item) => ({
    id: item.id,
    type: item.type,
    tone: "tone" in item ? item.tone : null,
    ordered: "ordered" in item ? item.ordered : null,
    level: "level" in item ? item.level : null,
    columns: "columns" in item ? item.columns.length : null,
    rows: "rows" in item ? item.rows.map((row) => row.length) : null,
    items: "items" in item ? item.items.length : null,
  }));
}

function block(body, id) {
  const result = body.blocks.find((item) => item.id === id);
  assert.ok(result, `missing block ${id}`);
  return result;
}

function assertTokens(text, tokens, label) {
  for (const token of tokens) {
    assert.match(text, token, `${label}: ${token}`);
  }
}

test("Dunhuang hotel-base owner has unique scoped metadata and companion records", async () => {
  const metadata = JSON.parse(await source(`content/guides/${slug}/metadata.json`));
  assert.equal(metadata.id, slug);
  assert.equal(metadata.type, "planning");
  assert.equal(metadata.pillar, "stay-city-areas");
  assert.equal(getGuideCollectionId(metadata), "stay-city-areas");
  assert.equal(metadata.format, "timed-attraction-and-evening-base-decision");
  assert.deepEqual(metadata.destinations, ["china"]);
  assert.deepEqual(metadata.search, {
    section: "stay",
    family: "comparison",
    primaryIntent: "plan",
  });
  assert.deepEqual(
    [metadata.datePublished, metadata.dateModified, metadata.sourceReviewedDate],
    ["2026-09-04", "2026-09-04", "2026-09-04"],
  );
  assert.match(metadata.topics.join(" "), /Mogao reservation.*Mingsha gate access.*weather.*luggage.*property-proof/isu);
  assert.equal(metadata.heroImagePath, `/images/guides/${slug}/hero-1600.webp`);
  assert.equal(metadata.heroImageUrl, `https://homegroundchina.com/images/guides/${slug}/hero-1600.webp`);
  assert.deepEqual([metadata.imageWidth, metadata.imageHeight], [1600, 1000]);
  assert.deepEqual(guideUpdatePolicy(metadata), {
    volatility: "high",
    refreshCadence: "on-source-change",
    owner: "homeground-editorial",
  });
  assert.deepEqual(resolveGuideEntities(metadata.destinations), {
    entityIds: ["country-china"],
    unmappedTokens: [],
    usedCountryFallback: false,
  });

  assert.deepEqual(metadata.searchTerms.en, [
    "Dunhuang downtown or Mingsha Mountain where to stay",
    "hotel near Mogao Caves Digital Exhibition Center",
    "Dunhuang hotel base Mogao Caves Mingsha Mountain",
  ]);
  assert.equal(new Set([
    ...metadata.searchTerms.en,
    ...metadata.searchTerms.zh,
    ...metadata.searchTerms.ko,
  ]).size, 9);

  const prefixes = { en: "", zh: "/zh", ko: "/ko" };
  for (const [locale, prefix] of Object.entries(prefixes)) {
    const localized = metadata.locales[locale];
    assert.equal(localized.path, `${prefix}/guides/${slug}/`);
    assert.equal(localized.cardTags.length, 3);
    assert.equal(localized.heroCredit.licenseLabel, "CC BY-SA 4.0");
    assert.equal(localized.heroCredit.licenseUrl, "https://creativecommons.org/licenses/by-sa/4.0/");
    assert.equal(localized.heroCredit.sourceUrl, "https://commons.wikimedia.org/wiki/File:鸣沙山.jpg");
    assert.match(localized.heroCredit.text, /Yanxutong1215/u);
    assert.match(localized.heroCredit.text, /2021/u);
  }
  assert.match(metadata.locales.en.title, /Downtown Dunhuang.*Mingsha Mountain/iu);
  assert.match(metadata.locales.zh.title, /敦煌.*市区.*鸣沙山/u);
  assert.match(metadata.locales.ko.title, /둔황.*시내.*명사산/u);

  for (const name of ["canonical-boundary.md", "dynamic-facts.md", "source-log.md", "image-plan.md"]) {
    await access(new URL(`content/guides/${slug}/${name}`, root));
  }
});

test("generated runtime files include the Dunhuang owner after generation", async () => {
  const registry = await source("lib/generated/guideRegistry.generated.ts");
  const bodies = await source("lib/generated/guideBodies.generated.ts");
  assert.match(registry, new RegExp(`"${slug}"`, "u"));
  assert.match(bodies, new RegExp(`"${slug}"`, "u"));
  assert.match(bodies, new RegExp(`${slug}/body\\.en`, "u"));
  assert.match(bodies, new RegExp(`${slug}/body\\.zh`, "u"));
  assert.match(bodies, new RegExp(`${slug}/body\\.ko`, "u"));
});

test("Dunhuang EN ZH KO preserve structure and complete decision depth", () => {
  assert.deepEqual(signature(en), signature(zh));
  assert.deepEqual(signature(en), signature(ko));
  assert.deepEqual(shape(en), shape(zh));
  assert.deepEqual(shape(en), shape(ko));

  for (const required of [
    "direct-answer:callout",
    "scope-boundary:paragraph",
    "anchor-ledger:table",
    "map-correction:callout",
    "base-matrix:table",
    "night-plan:list",
    "property-proof:list",
    "property-warning:callout",
    "luggage-ledger:table",
    "needs-table:table",
    "scenario-downtown:list",
    "scenario-mingsha:list",
    "failure-ledger:table",
    "dynamic-callout:callout",
    "final-checklist:list",
    "consultation-boundary:callout",
    "internal-links:internal-links",
    "sources:sources",
  ]) {
    assert.ok(signature(en).includes(required), required);
  }

  assert.equal(block(en, "anchor-ledger").rows.length, 4);
  assert.equal(block(en, "base-matrix").rows.length, 4);
  assert.equal(block(en, "night-plan").items.length, 5);
  assert.equal(block(en, "property-proof").items.length, 8);
  assert.equal(block(en, "luggage-ledger").rows.length, 4);
  assert.equal(block(en, "needs-table").rows.length, 4);
  assert.equal(block(en, "scenario-downtown").items.length, 3);
  assert.equal(block(en, "scenario-mingsha").items.length, 3);
  assert.equal(block(en, "failure-ledger").rows.length, 6);
  assert.equal(block(en, "final-checklist").items.length, 8);

  const independentObjects = en.blocks.reduce((count, item) => (
    count
    + ("rows" in item ? item.rows.length : 0)
    + ("items" in item ? item.items.length : 0)
    + (item.type === "callout" ? 1 : 0)
  ), 0);
  assert.ok(independentObjects >= 40, `Independent information objects: ${independentObjects}`);
  assert.ok(independentObjects >= 22, "minimum 22 independent information objects");

  const ignoredKeys = new Set(["id", "type", "tone", "href", "url", "publisher", "reviewedAt"]);
  const visibleStrings = [];
  function collectVisible(value, key = "") {
    if (typeof value === "string" && !ignoredKeys.has(key)) visibleStrings.push(value);
    else if (Array.isArray(value)) value.forEach((item) => collectVisible(item, key));
    else if (value && typeof value === "object") {
      Object.entries(value).forEach(([childKey, child]) => collectVisible(child, childKey));
    }
  }
  en.blocks.filter((item) => !["sources", "internal-links"].includes(item.type)).forEach((item) => collectVisible(item));
  const englishWords = visibleStrings.join(" ").match(/[A-Za-z]+(?:['’][A-Za-z]+)?/gu)?.length ?? 0;
  const chineseChars = JSON.stringify(zh).match(/[\u3400-\u9fff]/gu)?.length ?? 0;
  const koreanChars = JSON.stringify(ko).match(/[\uac00-\ud7a3]/gu)?.length ?? 0;
  assert.ok(englishWords >= 1300 && englishWords <= 1700, `English visible words: ${englishWords}`);
  assert.ok(chineseChars >= 2200, `Chinese information depth: ${chineseChars}`);
  assert.ok(koreanChars >= 2200, `Korean information depth: ${koreanChars}`);
});

test("Dunhuang owner enforces the first-stop correction, source parity and canonical exclusions", async () => {
  const bodies = { en, zh, ko };
  const prefixes = { en: "", zh: "/zh", ko: "/ko" };
  const expectedSources = [
    "https://www.dha.ac.cn/info/1020/7498.htm",
    "https://www.dha.ac.cn/skxl/mgk.htm",
    "https://www.dha.ac.cn/info/1018/7786.htm",
    "https://www.gswbj.gov.cn/a/2026/04/16/28007.html",
    "https://www.gswbj.gov.cn/a/2026/04/13/27966.html",
    "https://www.gswbj.gov.cn/a/2024/09/10/22009.html",
    "https://www.caac.gov.cn/GYMH/MHGK/GJKAYSJC/XBDQ/GS/202404/t20240417_223898.html",
    "https://www.gswbj.gov.cn/a/2026/07/29/29045.html",
    "https://www.nia.gov.cn/n794014/n1050181/n1050479/c1013311/content.html",
    "https://www.gov.cn/hudong/202405/content_6952770.htm",
    "https://www.mofcom.gov.cn/zcfb/zc/art/2024/art_2389dfd945704c8f8247149f918bcaef.html",
    "https://commons.wikimedia.org/wiki/File:鸣沙山.jpg",
  ];

  for (const [locale, body] of Object.entries(bodies)) {
    const links = block(body, "internal-links");
    const sources = block(body, "sources");
    assert.equal(links.items.length, 4);
    assert.equal(sources.items.length, expectedSources.length);
    for (const owner of [
      "mogao-caves-independent-visit-workflow",
      "xian-lanzhou-dunhuang-silk-road-route",
      "china-private-transfer-or-public-transport",
      "foreigners-china-hotel",
    ]) {
      assert.ok(links.items.some((item) => item.href === `${prefixes[locale]}/guides/${owner}/`), `${locale} link ${owner}`);
    }
    assert.deepEqual(sources.items.map((item) => item.url), expectedSources);
    assert.ok(sources.items.every((item) => item.reviewedAt === "2026-09-04"));
  }

  assertTokens(JSON.stringify(block(en, "map-correction")), [
    /Digital Exhibition Center/iu,
    /8899 Yangguan East Road/iu,
    /not the protected cave area/iu,
    /lacks visitor ticketing and parking/iu,
    /current first checkpoint/iu,
    /route from the real reception/iu,
  ], "EN first-stop correction");
  assertTokens(JSON.stringify(block(zh, "map-correction")), [
    /莫高窟数字展示中心/u,
    /阳关东路\s*8899\s*号/u,
    /洞窟保护区|窟区/u,
    /物业.*前台|住宿.*前台/u,
  ], "ZH first-stop correction");
  assertTokens(JSON.stringify(block(ko, "map-correction")), [
    /막고굴 디지털전시센터|막고굴 디지털 전시센터/u,
    /양관(?:동로| 동로|둥루)\s*8899/u,
    /보호 구역|석굴/u,
    /리셉션|프런트/u,
  ], "KO first-stop correction");

  assertTokens(JSON.stringify(block(en, "property-proof")), [
    /Chinese name/iu,
    /accommodation type/iu,
    /sleeping address/iu,
    /pin/iu,
    /staffed reception\/telephone/iu,
    /registration entity/iu,
  ], "EN property proof");
  assertTokens(JSON.stringify(block(en, "property-proof")), [
    /area, building and room/iu,
    /prove none of the reception/iu,
    /assigned building/iu,
    /view/iu,
    /gate route/iu,
  ], "EN area-to-room proof boundary");
  assert.match(JSON.stringify(block(en, "property-proof")), /original[- ]passport.*accommodation registration/isu);
  assertTokens(block(en, "property-warning").body, [
    /cancellation\/change deadline/iu,
    /before non-cancellable payment/iu,
    /use a verified alternative/iu,
  ], "EN cancellation boundary");
  assert.match(JSON.stringify(block(en, "luggage-ledger")), /Mogao before check-in.*Mogao after checkout.*Split stay.*Remote property/isu);
  assert.match(JSON.stringify(block(en, "needs-table")), /Family with children.*Older or slower traveller.*Wheelchair or mobility device.*Large or several bags/isu);
  assertTokens(JSON.stringify(block(en, "failure-ledger")), [
    /Mogao instruction changes/iu,
    /Mingsha access changes/iu,
    /Identity or view mismatch/iu,
    /Late reception or vehicle fails/iu,
    /Passport check-in is refused/iu,
    /Bag, route or room fails/iu,
  ], "EN failure-recovery coverage");
  assertTokens(block(en, "dynamic-callout").body, [
    /No (?:sufficiently )?current official notice/iu,
    /September(?: 2026)? Mingsha gate and closing/iu,
    /none are published here/iu,
  ], "EN current Mingsha uncertainty");

  const publicText = JSON.stringify(bodies);
  for (const prohibited of [
    /top\s*10/iu,
    /best\s+(?:Dunhuang|desert|Mingsha)?\s*hotels?/iu,
    /booking\.com|agoda|trip\.com/iu,
    /US\$\s*(?:69|129)/iu,
    /(?:¥|￥|CNY|RMB)\s*\d/iu,
    /\b\d[\d,]*\s*(?:yuan|rmb)\b/iu,
    /\d[\d,]*\s*(?:元|위안)/u,
    /free cancellation|免费取消|무료 취소/iu,
    /guaranteed desert view|保证沙漠景观|사막 전망(?:을|이)? (?:항상 )?보장(?:합니다|된다)/iu,
    /all (?:Mingsha|desert) (?:hotels|properties).*(?:accept|register) foreign/iu,
    /所有(?:鸣沙山|沙漠).*(?:酒店|住宿).*(?:接待|登记)外/u,
    /모든 명사산(?: 지역)? 숙소(?:는|가).{0,24}외국인(?:을|의)?.{0,24}(?:받|수용|등록)(?:합니다|한다|할 수 있다)/u,
    /(?:airport|railway|station).{0,40}(?:every \d+ minutes|24 hours)/iu,
  ]) {
    assert.doesNotMatch(publicText, prohibited);
  }

  const canonical = await source(`content/guides/${slug}/canonical-boundary.md`);
  assert.match(canonical, /already chosen Dunhuang.*number of nights/isu);
  assertTokens(canonical, [
    /confirmed Mogao/iu,
    /Mingsha evening/iu,
    /arrival\/departure/iu,
    /luggage/iu,
    /named-property/iu,
  ], "canonical decision inputs");
  assert.match(canonical, /does not own/iu);
  assertTokens(canonical, [
    /mogao-caves-independent-visit-workflow/u,
    /xian-lanzhou-dunhuang-silk-road-route/u,
    /china-private-transfer-or-public-transport/u,
    /foreigners-china-hotel/u,
    /178 baseline guide directories/u,
    /183 `origin\/article\/\*` plus `origin\/codex\/\*`/u,
    /origin\/main@c13d83e1abc8f5f25ee2250de11eed8c424a0196/u,
  ], "canonical audit");
  assert.match(canonical, /primary entity: `county-level-city-dunhuang`/iu);
  assert.match(canonical, /attraction-mogao-caves.*attraction-mingsha-crescent-spring.*station-dunhuang.*airport-dunhuang-mogao.*city-jiuquan.*province-gansu/isu);
  assert.match(canonical, /entity debt/iu);
  assert.match(canonical, /must not.*entity graph.*Search Map.*registry.*destination Hub.*sitemap.*templates/isu);

  const dynamic = await source(`content/guides/${slug}/dynamic-facts.md`);
  assert.match(dynamic, /2026-09-04 \(Asia\/Shanghai\)/u);
  assert.match(dynamic, /high volatility \/ on-source-change/iu);
  assert.match(dynamic, /No sufficiently current official September 2026 gate\/closing notice was retrieved/iu);
  assert.match(dynamic, /operator archive could not be retrieved/iu);
  assert.doesNotMatch(dynamic, /archive shows that gates and seasonal times change/iu);
  assert.match(dynamic, /(?:do not include Gansu|Gansu is not listed)/iu);
  assert.match(dynamic, /Uncertain facts that must remain uncertain/iu);
  assert.match(dynamic, /No fixed hotel price.*inventory.*opening hour.*route number.*journey time/isu);

  const log = await source(`content/guides/${slug}/source-log.md`);
  for (const url of expectedSources) assert.ok(log.includes(url), `source-log missing ${url}`);
  assert.match(log, /https:\/\/www\.mssyyq\.com\/JQGG\/.*direct retrieval timed out.*not treated as reviewed.*supports no claim about seasonal changes/isu);
  assert.match(log, /Google.*2026-09-04/iu);
  assert.match(log, /location as Korea/iu);
  assert.match(log, /No search volume, click, booking or conversion estimate/iu);
  assert.match(log, /demand evidence only/iu);
  assert.match(log, /Gap:.*confirmed Mogao slot.*luggage.*Mingsha evening.*railway\/airport.*property-proof/isu);
  assert.match(log, /Claim-to-source map/iu);
  assert.match(log, /Traveller blind review, 2026-09-04:.*TRAVELLER RE-REVIEW PASS/iu);
  assert.match(log, /SEO\/technical adversarial review, 2026-09-04:.*SEO\/TECH RE-REVIEW PASS/iu);
  const reviewLedger = log.match(/## Review and verification ledger([\s\S]*?)(?=\n## |$)/u)?.[1] ?? "";
  assert.ok(reviewLedger, "review ledger section must exist");
  assert.doesNotMatch(reviewLedger, /\*\*pending\*\*/iu);
  assert.doesNotMatch(reviewLedger, /not run/iu);
});

test("Dunhuang consultation preserves privacy, supplier consent and guarantee boundaries", () => {
  const bodies = { en, zh, ko };
  const tokenSets = {
    en: [
      /minimum non-sensitive context/u,
      /do not submit children's exact ages/u,
      /mobility, medical or accessibility details/u,
      /passport\/ID/u,
      /booking\/payment records/u,
      /identifiable supplier-sharing information/u,
      /separate consent before supplier sharing/u,
      /not live inventory, booking or transport/u,
      /does not guarantee price, availability, foreign-guest acceptance, room type, accessibility/iu,
      /property identity or view.*Mogao or Mingsha admission\/opening.*luggage.*transfer.*connection success.*safety/isu,
    ],
    zh: [
      /最少.*非敏感|最低限度.*非敏感/u,
      /不要.*儿童具体年龄/u,
      /行动.*医疗.*无障碍/u,
      /护照.*证件/u,
      /订单.*付款/u,
      /可识别.*供应商.*分享|供应商.*可识别.*分享/u,
      /供应商.*另行.*同意|另行.*同意.*供应商/u,
      /不是.*实时库存.*预订.*交通/u,
      /不保证.*价格.*房态.*(?:外宾|外籍旅客).*房型.*无障碍/isu,
      /物业.*身份|住宿.*身份/u,
      /景观/u,
      /莫高窟.*鸣沙山/isu,
      /行李.*接驳.*衔接.*安全/isu,
    ],
    ko: [
      /최소.*비민감 정보|민감하지 않은 최소 정보/u,
      /(?:아동|어린이)의 정확한 나이/u,
      /(?:이동|보행).*의료.*접근성/isu,
      /여권.*신분증/u,
      /예약.*결제/u,
      /개인.*식별.*공급업체.*전달|공급업체.*개인.*식별.*전달/isu,
      /공급.*별도 동의|별도 동의.*공급/u,
      /실시간.*재고.*예약.*교통.*아니/isu,
      /가격.*(?:객실|예약 가능).*외국인.*객실 유형.*접근성.*보장하지/isu,
      /숙소.*신원|숙소.*정체|업체.*신원/u,
      /전망/u,
      /막고굴.*명사산/isu,
      /(?:수하물|짐).*(?:이동|환승).*연결.*안전/isu,
    ],
  };

  for (const [locale, body] of Object.entries(bodies)) {
    const consultation = block(body, "consultation-boundary");
    assertTokens(consultation.body, tokenSets[locale], `${locale} consultation`);
  }
});

test("Dunhuang Hero is the documented real licensed dune image with no private data", async () => {
  const imageUrl = new URL(`public/images/guides/${slug}/hero-1600.webp`, root);
  const bytes = await readFile(imageUrl);
  const details = await stat(imageUrl);
  const pixels = await sharp(bytes).metadata();
  const digest = createHash("sha256").update(bytes).digest("hex");
  assert.equal(details.size, 47772);
  assert.deepEqual([pixels.width, pixels.height, pixels.format], [1600, 1000, "webp"]);
  assert.equal(digest, "988fadd31bbc79346929ba355c2ac60b7a018960abe8db9fda5e01f367a5beae");
  assert.equal(pixels.exif, undefined);
  assert.equal(pixels.xmp, undefined);
  assert.equal(pixels.iptc, undefined);
  assert.equal(pixels.icc, undefined);

  const imagePlan = await source(`content/guides/${slug}/image-plan.md`);
  for (const expected of [
    "Yanxutong1215",
    "2021-04-13 17:57:07",
    "CC BY-SA 4.0",
    "4096 × 3072",
    "1,917,205 bytes",
    "8bbd733eaf8b3e067815d0c7aa0abf18986bb0bf2687bd29c79989704564d1fb",
    "left: 0, top: 256, width: 4096, height: 2560",
    "47,772 bytes",
    digest,
    "no generation, generative fill, object insertion, synthetic alteration or misleading composite",
  ]) {
    assert.match(imagePlan, new RegExp(expected, "iu"));
  }
  assert.match(imagePlan, /real late-afternoon dune landscape at Mingsha Mountain/iu);
  assertTokens(imagePlan, [
    /does not prove/iu,
    /hotel.*room/isu,
    /entrance gate/iu,
    /current weather/iu,
    /current scenic-area opening/iu,
    /registration process/iu,
    /room availability, price/iu,
  ], "Hero truth boundary");
  assert.match(imagePlan, /no identifiable face.*passport.*booking\/order number.*room number.*keycard.*payment record.*vehicle plate/isu);
  assert.match(imagePlan, /No AI-generated hotel, desert camp, street, scenic-area entrance, room, vehicle or traveller documentary image/iu);
});
