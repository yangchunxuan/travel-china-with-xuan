import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";
import sharp from "sharp";

import en from "../../content/guides/wuzhen-west-scenic-area-inside-or-outside-hotel-base/body.en.ts";
import zh from "../../content/guides/wuzhen-west-scenic-area-inside-or-outside-hotel-base/body.zh.ts";
import ko from "../../content/guides/wuzhen-west-scenic-area-inside-or-outside-hotel-base/body.ko.ts";
import {
  guideUpdatePolicy,
  resolveGuideEntities,
} from "../../lib/searchPlatformGuidePolicy.ts";
import { getGuideCollectionId } from "../../lib/searchCollectionI18n.ts";

const slug = "wuzhen-west-scenic-area-inside-or-outside-hotel-base";
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

test("Wuzhen West stay owner has scoped high-volatility metadata", async () => {
  const metadata = JSON.parse(await source(`content/guides/${slug}/metadata.json`));
  assert.equal(metadata.id, slug);
  assert.equal(metadata.type, "planning");
  assert.equal(metadata.pillar, "stay-hotel-types-scenic-bases");
  assert.equal(getGuideCollectionId(metadata), "stay-hotel-types-scenic-bases");
  assert.equal(metadata.format, "controlled-scenic-area-inside-or-outside-base-decision");
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
  assert.ok(metadata.topics.some((topic) => /operator identity.*booking.*ticket.*admission.*re-entry.*check-in.*luggage.*late arrival.*access verification/iu.test(topic)));
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

  const prefixes = { en: "", zh: "/zh", ko: "/ko" };
  for (const [locale, prefix] of Object.entries(prefixes)) {
    const localized = metadata.locales[locale];
    assert.equal(localized.path, `${prefix}/guides/${slug}/`);
    assert.equal(localized.cardTags.length, 3);
    assert.equal(localized.heroCredit.licenseLabel, "CC BY-SA 4.0");
    assert.equal(localized.heroCredit.licenseUrl, "https://creativecommons.org/licenses/by-sa/4.0/");
    assert.equal(
      localized.heroCredit.sourceUrl,
      "https://commons.wikimedia.org/wiki/File:Night_in_Wuzhen_Xizha_(20171231174337).jpg",
    );
    assert.match(localized.heroCredit.text, /N509FZ/u);
    assert.match(localized.heroCredit.text, /2017/u);
  }
  assert.match(metadata.locales.en.title, /Wuzhen West Scenic Area.*Inside.*Outside/iu);
  assert.match(metadata.locales.zh.title, /乌镇西栅.*景区内.*景区外/u);
  assert.match(metadata.locales.ko.title, /우전.*서책.*안.*밖/u);

  for (const name of ["canonical-boundary.md", "dynamic-facts.md", "source-log.md", "image-plan.md"]) {
    await access(new URL(`content/guides/${slug}/${name}`, root));
  }
});

test("generated runtime registry and body loader include the Wuzhen West owner", async () => {
  const registry = await source("lib/generated/guideRegistry.generated.ts");
  const bodies = await source("lib/generated/guideBodies.generated.ts");
  assert.match(registry, new RegExp(`"${slug}"`, "u"));
  assert.match(bodies, new RegExp(`"${slug}"`, "u"));
  assert.match(bodies, new RegExp(`${slug}/body\\.en`, "u"));
  assert.match(bodies, new RegExp(`${slug}/body\\.zh`, "u"));
  assert.match(bodies, new RegExp(`${slug}/body\\.ko`, "u"));
});

test("Wuzhen West EN ZH KO preserve structure and complete decision depth", () => {
  assert.deepEqual(signature(en), signature(zh));
  assert.deepEqual(signature(en), signature(ko));
  assert.deepEqual(shape(en), shape(zh));
  assert.deepEqual(shape(en), shape(ko));

  for (const required of [
    "direct-answer:callout",
    "scope-boundary:paragraph",
    "identity-ledger:table",
    "base-matrix:table",
    "entitlement-warning:callout",
    "proof-checklist:list",
    "arrival-ledger:table",
    "needs-table:table",
    "scenario-scenic:list",
    "scenario-late-family:list",
    "failure-ledger:table",
    "dynamic-callout:callout",
    "final-checklist:list",
    "consultation-boundary:callout",
    "internal-links:internal-links",
    "sources:sources",
  ]) {
    assert.ok(signature(en).includes(required), required);
  }

  assert.equal(block(en, "identity-ledger").rows.length, 4);
  assert.equal(block(en, "base-matrix").rows.length, 4);
  assert.equal(block(en, "proof-checklist").items.length, 8);
  assert.equal(block(en, "arrival-ledger").rows.length, 5);
  assert.equal(block(en, "needs-table").rows.length, 4);
  assert.equal(block(en, "failure-ledger").rows.length, 6);
  assert.equal(block(en, "final-checklist").items.length, 8);

  const independentObjects = en.blocks.reduce((count, item) => (
    count
    + ("rows" in item ? item.rows.length : 0)
    + ("items" in item ? item.items.length : 0)
    + (item.type === "callout" ? 1 : 0)
  ), 0);
  assert.ok(independentObjects >= 40, `Independent information objects: ${independentObjects}`);

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

test("Wuzhen West owner separates identities, entitlements and recovery", async () => {
  const bodies = { en, zh, ko };
  const prefixes = { en: "", zh: "/zh", ko: "/ko" };
  const expectedSources = [
    "https://www.ewuzhen.com/hotel/list",
    "https://www.wuzhen.com.cn/web/event/newDetails?id=2115",
    "https://www.wuzhen.com.cn/crsykrz.htm",
    "https://www.wuzhen.com.cn/web/traver/info",
    "https://www.ewuzhen.com/hotel/room?hotelId=215869424345858050&livesDate=2026-05-09&modelCode=HTRM-202505-6601&outDate=2026-05-10",
    "https://www.wuzhen.com.cn/web/event/newDetails?id=2116",
    "https://www.nia.gov.cn/n794014/n1050181/n1050479/c1013311/content.html",
    "https://www.gov.cn/hudong/202405/content_6952770.htm",
    "https://www.mofcom.gov.cn/xwfb/rcxwfb/art/2024/art_6e5fd351d24c460cad01512ce52d3f83.html",
    "https://commons.wikimedia.org/wiki/File:Night_in_Wuzhen_Xizha_(20171231174337).jpg",
  ];
  for (const [locale, body] of Object.entries(bodies)) {
    const links = block(body, "internal-links");
    const sources = block(body, "sources");
    assert.equal(links.items.length, 4);
    assert.equal(sources.items.length, expectedSources.length);
    for (const owner of ["china-private-transfer-or-public-transport", "foreigners-china-hotel"]) {
      assert.ok(links.items.some((item) => item.href === `${prefixes[locale]}/guides/${owner}/`), `${locale} link ${owner}`);
    }
    assert.ok(links.items.some((item) => item.href === `${prefixes[locale]}/destinations/hangzhou/`));
    assert.ok(links.items.some((item) => item.href === `${prefixes[locale]}/guides/china-accessible-hotel-room-verification/`));
    assert.deepEqual(sources.items.map((item) => item.url), expectedSources);
    assert.ok(sources.items.every((item) => item.reviewedAt === "2026-09-04"));
  }

  assert.match(block(en, "lead").text, /Stay inside.*quiet early and late.*Stay outside.*late arrival.*[‘']Inside[’'] alone proves none/isu);
  assert.match(block(en, "identity-ledger").caption, /different question/iu);
  assert.match(JSON.stringify(block(en, "identity-ledger")), /Physical location.*Operator relationship.*Booking-channel display.*Room-product entitlement/isu);
  assert.match(JSON.stringify(block(en, "identity-ledger")), /旗下酒店/u);
  assert.match(JSON.stringify(block(zh, "identity-ledger")), /旗下酒店/u);
  assert.match(JSON.stringify(block(ko, "identity-ledger")), /旗下酒店/u);
  assert.doesNotMatch(JSON.stringify(block(en, "identity-ledger")), /operator or affiliate/iu);
  assert.doesNotMatch(JSON.stringify(block(zh, "identity-ledger")), /直营或关联/u);
  assert.doesNotMatch(JSON.stringify(block(ko, "identity-ledger")), /운영사 또는 제휴/u);
  assert.doesNotMatch(JSON.stringify(en), /(?:verify|confirm|save)[^.]{0,100}(?:actual building\/room pin|actual room pin)/iu);
  assert.doesNotMatch(JSON.stringify(zh), /(?:核实|确认|保存).{0,80}(?:实际楼栋|实际客房).{0,20}(?:图钉|地图点位)/u);
  assert.doesNotMatch(JSON.stringify(ko), /(?:확인|저장).{0,80}(?:실제 건물|실제 객실).{0,20}(?:핀|지도)/u);
  assert.match(JSON.stringify(block(en, "final-checklist")), /property's written confirmation.*assigned building and room.*promised building range.*worst-case route.*map pin proves/isu);
  const finalChecklistByLocale = {
    zh: JSON.stringify(block(zh, "final-checklist")),
    ko: JSON.stringify(block(ko, "final-checklist")),
  };
  for (const token of ["物业", "楼栋", "客房", "书面确认", "楼栋范围", "最不利路线", "地图点位"]) {
    assert.ok(finalChecklistByLocale.zh.includes(token), `zh final checklist must preserve ${token}`);
  }
  for (const token of ["건물", "객실", "숙소", "서면", "건물 범위", "최악 조건 경로", "지도 핀"]) {
    assert.ok(finalChecklistByLocale.ko.includes(token), `ko final checklist must preserve ${token}`);
  }
  assert.match(JSON.stringify(block(en, "entitlement-warning")), /room, first admission and re-entry|first admission.*re-entry/isu);
  assert.match(block(en, "entitlement-warning").body, /2025.*Older guest instructions.*room-page boilerplate.*dated answer/isu);
  assert.match(JSON.stringify(block(en, "proof-checklist")), /西栅景区游客服务中心/u);
  assert.match(JSON.stringify(block(zh, "proof-checklist")), /西栅景区游客服务中心/u);
  assert.match(JSON.stringify(block(ko, "proof-checklist")), /西栅景区游客服务中心/u);
  assert.match(JSON.stringify(block(en, "arrival-ledger")), /room-ready time.*first-entry time/isu);
  assert.match(JSON.stringify(block(en, "needs-table")), /continuous drop-off.*desk.*gate.*room.*bathroom.*exit/isu);
  assert.match(JSON.stringify(block(en, "failure-ledger")), /operator list says outside.*admission excluded.*passport registration.*late desk.*bag does not arrive.*maintenance/isu);
  assert.match(block(en, "direct-answer").body, /applicable cancellation\/change deadline.*before payment.*non-cancellable/isu);
  assert.match(block(zh, "direct-answer").body, /适用的取消.*改期截止.*不可取消.*付款前/u);
  assert.match(block(ko, "direct-answer").body, /취소.*변경 기한.*취소 불가.*결제 전/u);
  assert.match(JSON.stringify(block(en, "proof-checklist")), /public lanes.*gates.*sights.*shops.*photography/isu);
  assert.match(JSON.stringify(block(en, "final-checklist")), /saved candidate or held booking.*cancellation cost.*release trigger/isu);

  const publicText = JSON.stringify(bodies);
  for (const prohibited of [
    /top\s*10/iu,
    /best\s+hotels?\s+in/iu,
    /booking\.com|agoda|trip\.com/iu,
    /US\$\s*(?:69|129)/iu,
    /(?:¥|￥|CNY|RMB)\s*\d/iu,
    /\b\d[\d,]*\s*(?:yuan|rmb)\b/iu,
    /\d[\d,]*\s*(?:元|위안)/u,
    /(?:^|[.!?])\s*all inside (?:hotels|stays) (?:always )?(?:include|give) free admission/iu,
    /(?:^|[。！？])所有景区内(?:酒店|住宿)(?:都|一定)(?:免票|含票)|(?:^|[.!?])모든 관광지 안 숙소(?:는|가) 무료 입장을 보장/u,
    /(?:unlimited|guaranteed) re-entry|无限次再入园.*保证|무제한 재입장.*보장/iu,
    /visitor service cent(?:er|re).*24.hours?.*check-in/iu,
    /游客服务中心.{0,24}24\s*(?:小时|小時).{0,24}(?:入住|办理)|관광객 서비스 센터.{0,24}24\s*시간.{0,24}체크인/iu,
    /free cancellation|免费取消|무료 취소/iu,
  ]) {
    assert.doesNotMatch(publicText, prohibited);
  }

  const canonical = await source(`content/guides/${slug}/canonical-boundary.md`);
  assert.match(canonical, /already chosen Wuzhen West Scenic Area.*sleep inside.*outside/isu);
  assert.match(canonical, /This owner does not own/iu);
  assert.match(canonical, /worth an overnight/iu);
  assert.match(canonical, /Wuzhen versus Zhujiajiao, Tongli/iu);
  assert.match(canonical, /East Scenic Area.*West Scenic Area/iu);
  assert.match(canonical, /shanghai-water-town-zhujiajiao-tongli-wuzhen/iu);
  assert.match(canonical, /destinations: \["china"\].*country-china/isu);
  assert.match(canonical, /attraction-wuzhen-west-scenic-area.*town-wuzhen.*county-level-city-tongxiang.*city-jiaxing.*province-zhejiang/isu);
  assert.match(canonical, /(?:does not|must not) modify.*entity graph.*Search Map.*registry.*Hub.*sitemap.*templates/isu);

  const ledger = await source(`content/guides/${slug}/dynamic-facts.md`);
  assert.match(ledger, /2026-09-04 \(Asia\/Shanghai\)/u);
  assert.match(ledger, /high volatility \/ on-source-change/iu);
  assert.match(ledger, /2025.*(?:receive|admission).*older.*(?:buy|purchase)/isu);
  assert.match(ledger, /foreign-passport.*(?:face|facial)|(?:face|facial).*foreign-passport/isu);
  assert.match(ledger, /fallback|manual.*(?:route|path)/iu);

  const log = await source(`content/guides/${slug}/source-log.md`);
  assert.match(log, /Google.*2026-09-04/iu);
  assert.match(log, /location.*Korea/iu);
  assert.match(log, /no search volume, click, booking or conversion estimate/iu);
  assert.match(log, /demand evidence only.*Forum posts.*do not establish/isu);
  assert.match(log, /Gap:.*experience versus price/isu);
  assert.match(log, /Claim-to-source map/iu);
  assert.match(log, /- Traveller blind review, 2026-09-04:.*TRAVELLER RE-REVIEW PASS/iu);
  assert.match(log, /- SEO\/technical adversarial review, 2026-09-04:.*SEO\/TECH RE-REVIEW PASS/iu);
  const reviewLedger = log.match(/## Review and verification ledger([\s\S]*?)(?=\n## |$)/u)?.[1] ?? "";
  assert.ok(reviewLedger, "review ledger section must exist");
  assert.doesNotMatch(reviewLedger, /\*\*pending\*\*/iu);
});

test("Wuzhen West consultation preserves privacy, supplier consent and guarantee boundaries", () => {
  const patterns = {
    en: [
      /minimum non-sensitive context/u,
      /do not submit children's exact ages/u,
      /mobility, medical or accessibility details/u,
      /passport\/ID/u,
      /booking\/payment records/u,
      /identifiable supplier-sharing information/u,
      /separate consent before supplier sharing/u,
      /not live inventory, booking or transport/u,
      /does not guarantee price, availability, foreign-guest acceptance, room type, accessibility/u,
      /admission, re-entry, late processing, luggage, transfer, connection success or safety/u,
    ],
    zh: [
      /最少.*(?:非敏感|不敏感).*信息/u,
      /不要.*儿童具体年龄/u,
      /行动.*医疗.*无障碍/u,
      /护照.*证件/u,
      /订单.*付款/u,
      /(?:可|能够)识别.*供应商.*分享|供应商.*(?:可|能够)识别.*分享/u,
      /供应商.*另行.*同意|另行.*同意.*供应商/u,
      /不是.*实时库存.*预订.*交通/u,
      /不保证.*价格.*房态.*(?:外宾|外国旅客|外籍住客)接待.*房型.*无障碍/u,
      /入园.*(?:再入园|再次入园).*晚到.*行李.*接驳.*(?:衔接|转乘).*安全/u,
    ],
    ko: [
      /최소.*비민감 정보|민감하지 않은 최소 정보/u,
      /(?:아동|어린이)의 정확한 나이/u,
      /(?:이동|보행).*의료.*접근성/u,
      /여권.*신분증/u,
      /예약.*결제/u,
      /(?:개인.*식별.*공급업체.*전달)|(?:공급업체.*개인.*식별.*전달)/u,
      /공급.*별도 동의|별도 동의.*공급/u,
      /실시간.*재고.*예약.*교통.*아니/u,
      /가격.*(?:객실|예약 가능).*외국인.*객실 유형.*접근성.*보장하지/u,
      /입장.*재입장.*늦.*(?:수하물|짐).*(?:이동|환승).*연결.*안전/u,
    ],
  };
  const bodies = { en, zh, ko };
  for (const [locale, body] of Object.entries(bodies)) {
    const consultation = block(body, "consultation-boundary");
    for (const pattern of patterns[locale]) {
      assert.match(consultation.body, pattern, `${locale} ${pattern}`);
    }
  }
});

test("Wuzhen West Hero is the documented real licensed image with no private data", async () => {
  const imageUrl = new URL(`public/images/guides/${slug}/hero-1600.webp`, root);
  const bytes = await readFile(imageUrl);
  const details = await stat(imageUrl);
  const pixels = await sharp(bytes).metadata();
  const digest = createHash("sha256").update(bytes).digest("hex");
  assert.equal(details.size, 150342);
  assert.deepEqual([pixels.width, pixels.height, pixels.format], [1600, 1000, "webp"]);
  assert.equal(digest, "79f71da0f1a9e4b209d183ee44872072330c9047e7b7ade3d1ae63f9c020121e");

  const imagePlan = await source(`content/guides/${slug}/image-plan.md`);
  for (const expected of [
    "N509FZ",
    "2017-12-31 17:43:37",
    "CC BY-SA 4.0",
    "a508138ffb048945985a835b5c2bfd03c4a65eb17469e93e03b567783aaa7804",
    digest,
    "no generation, generative fill, object insertion, synthetic alteration or misleading composite",
  ]) {
    assert.match(imagePlan, new RegExp(expected, "iu"));
  }
  assert.match(imagePlan, /real licensed.*(?:West Scenic Area|Xizha)/isu);
  assert.match(imagePlan, /no identifiable face.*passport.*booking.*room.*keycard/isu);
  assert.match(imagePlan, /does not.*property.*inside.*opening.*admission.*re-entry.*luggage/isu);
  assert.match(imagePlan, /No AI-generated hotel, street, scenic-area entrance, room, transport or traveller documentary image/iu);
  assert.equal(pixels.exif, undefined);
  assert.equal(pixels.xmp, undefined);
  assert.equal(pixels.iptc, undefined);
  assert.equal(pixels.icc, undefined);
});
