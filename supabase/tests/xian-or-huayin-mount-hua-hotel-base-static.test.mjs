import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";
import sharp from "sharp";

import en from "../../content/guides/xian-or-huayin-mount-hua-hotel-base/body.en.ts";
import zh from "../../content/guides/xian-or-huayin-mount-hua-hotel-base/body.zh.ts";
import ko from "../../content/guides/xian-or-huayin-mount-hua-hotel-base/body.ko.ts";
import {
  guideUpdatePolicy,
  resolveGuideEntities,
} from "../../lib/searchPlatformGuidePolicy.ts";
import { getGuideCollectionId } from "../../lib/searchCollectionI18n.ts";

const slug = "xian-or-huayin-mount-hua-hotel-base";
const root = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

function signature(body) {
  return body.blocks.map((block) => `${block.id}:${block.type}`);
}

function shape(body) {
  return body.blocks.map((block) => ({
    id: block.id,
    type: block.type,
    columns: "columns" in block ? block.columns.length : null,
    rows: "rows" in block ? block.rows.map((row) => row.length) : null,
    items: "items" in block ? block.items.length : null,
  }));
}

function block(body, id) {
  const result = body.blocks.find((candidate) => candidate.id === id);
  assert.ok(result, `missing block ${id}`);
  return result;
}

test("Mount Hua stay owner has scoped high-volatility metadata", async () => {
  const metadata = JSON.parse(await source(`content/guides/${slug}/metadata.json`));
  assert.equal(metadata.id, slug);
  assert.equal(metadata.type, "planning");
  assert.equal(metadata.pillar, "stay-hotel-types-scenic-bases");
  assert.equal(getGuideCollectionId(metadata), "stay-hotel-types-scenic-bases");
  assert.equal(metadata.format, "city-or-scenic-gateway-base-decision");
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
  assert.ok(metadata.topics.some((topic) => /first entry.*last descent.*reservation.*ropeway.*rail.*luggage/iu.test(topic)));
  assert.equal(metadata.heroImagePath, `/images/guides/${slug}/hero-1600.webp`);
  assert.equal(metadata.heroImageUrl, `https://homegroundchina.com/images/guides/${slug}/hero-1600.webp`);
  assert.deepEqual([metadata.imageWidth, metadata.imageHeight], [1600, 1000]);
  assert.deepEqual(guideUpdatePolicy(metadata), {
    volatility: "critical",
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
      "https://commons.wikimedia.org/wiki/File:Mount_Hua,_shot_from_the_train_G1888_in_Huashanbei_Station.jpg",
    );
    assert.match(localized.heroCredit.text, /A Chinese ID/u);
    assert.match(localized.heroCredit.text, /2022/u);
  }
  assert.match(metadata.locales.en.title, /Xi’an.*Huayin.*Mount Hua/iu);
  assert.match(metadata.locales.zh.title, /华山.*西安.*华阴/u);
  assert.match(metadata.locales.ko.title, /화산.*시안.*화인/u);

  for (const name of ["canonical-boundary.md", "dynamic-facts.md", "source-log.md", "image-plan.md"]) {
    await access(new URL(`content/guides/${slug}/${name}`, root));
  }
});

test("generated runtime registry and body loader include the Mount Hua owner", async () => {
  const registry = await source("lib/generated/guideRegistry.generated.ts");
  const bodies = await source("lib/generated/guideBodies.generated.ts");
  assert.match(registry, new RegExp(`"${slug}"`, "u"));
  assert.match(bodies, new RegExp(`"${slug}"`, "u"));
  assert.match(bodies, new RegExp(`${slug}/body\\.en`, "u"));
  assert.match(bodies, new RegExp(`${slug}/body\\.zh`, "u"));
  assert.match(bodies, new RegExp(`${slug}/body\\.ko`, "u"));
});

test("Mount Hua EN ZH KO preserve block, table and list parity with complete depth", () => {
  assert.deepEqual(signature(en), signature(zh));
  assert.deepEqual(signature(en), signature(ko));
  assert.deepEqual(shape(en), shape(zh));
  assert.deepEqual(shape(en), shape(ko));

  for (const required of [
    "direct-answer:callout",
    "scope-boundary:paragraph",
    "anchor-table:table",
    "base-matrix:table",
    "luggage-matrix:table",
    "two-gates:callout",
    "entry-checklist:list",
    "exit-chain-table:table",
    "one-move-test:callout",
    "needs-table:table",
    "scenario-day-return:list",
    "scenario-post-night:list",
    "failure-table:table",
    "dynamic-callout:callout",
    "final-checklist:list",
    "consultation-boundary:callout",
    "internal-links:internal-links",
    "sources:sources",
  ]) {
    assert.ok(signature(en).includes(required), required);
  }

  assert.equal(block(en, "anchor-table").rows.length, 3);
  assert.equal(block(en, "base-matrix").rows.length, 4);
  assert.equal(block(en, "luggage-matrix").rows.length, 4);
  assert.equal(block(en, "exit-chain-table").rows.length, 4);
  assert.equal(block(en, "needs-table").rows.length, 4);
  assert.equal(block(en, "failure-table").rows.length, 5);
  assert.equal(block(en, "entry-checklist").items.length, 5);
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

test("Mount Hua owner gives a complete accommodation decision without taking the route owner", async () => {
  const bodies = { en, zh, ko };
  const prefixes = { en: "", zh: "/zh", ko: "/ko" };
  const expectedSources = [
    "https://www.chinahuashan.com/front/travelStrategy1.htm",
    "https://www.chinahuashan.com/front/touristviewArticle.htm?id=262147",
    "https://www.chinahuashan.com/front/notification.htm?id=983046",
    "https://www.chinahuashan.com/front/viewtouristattractions.htm?id=33",
    "https://www.chinahuashan.com/front/wzhs.htm",
    "https://weibo.com/ttarticle/p/show?id=2309405338374721896472",
    "https://www.shaanxi.gov.cn/zfxxgk/zcwjk/dfxfg/202402/W020240226372070395729.pdf",
    "https://www.12306.cn/%2Fmormhweb/kyyyz/xian/201001/t20100124_1176.html",
    "https://www.12306.cn/index/",
    "https://kyfw.12306.cn/otn/gonggao/luggage.html",
    "https://kyfw.12306.cn/otn/view/icentre_qxyyInfo.html",
    "https://commons.wikimedia.org/wiki/File:Mount_Hua,_shot_from_the_train_G1888_in_Huashanbei_Station.jpg",
  ];
  for (const [locale, body] of Object.entries(bodies)) {
    const links = block(body, "internal-links");
    const sources = block(body, "sources");
    assert.equal(links.items.length, 4);
    assert.equal(sources.items.length, expectedSources.length);
    for (const owner of [
      "xian-where-to-stay-city-wall-or-dayanta",
      "foreigners-china-hotel",
      "china-accessible-hotel-room-verification",
    ]) {
      assert.ok(links.items.some((item) => item.href === `${prefixes[locale]}/guides/${owner}/`), `${locale} link ${owner}`);
    }
    assert.ok(links.items.some((item) => item.href === `${prefixes[locale]}/destinations/xian/`));
    assert.deepEqual(sources.items.map((item) => item.url), expectedSources);
    assert.ok(sources.items.every((item) => item.reviewedAt === "2026-09-04"));
  }

  assert.match(block(en, "lead").text, /Keep your Xi’an hotel.*booked Mount Hua entrance.*return to the hotel.*margin/iu);
  assert.match(block(en, "lead").text, /Sleep in Huayin before.*protects.*entrance.*after.*descent/iu);
  assert.match(block(zh, "lead").text, /西安/u);
  assert.match(block(zh, "lead").text, /华阴.*(?:检票入口|入口)/u);
  assert.match(block(zh, "lead").text, /下山/u);
  assert.match(block(ko, "lead").text, /시안/u);
  assert.match(block(ko, "lead").text, /(?:검표|입구).*화인|화인.*(?:검표|입구)/u);
  assert.match(block(ko, "lead").text, /하산/u);
  assert.match(block(en, "two-gates").body, /Huashan North.*Mount Hua Visitor Centre.*Yuquanyuan/iu);
  assert.match(block(zh, "two-gates").body, /华山北站.*华山游客中心.*玉泉院/u);
  assert.match(block(ko, "two-gates").body, /화산북역.*화산 방문자 센터.*위취안위안/u);
  for (const body of [en, ko]) {
    assert.match(JSON.stringify([block(body, "anchor-table"), block(body, "two-gates")]), /华山游客中心/u);
    assert.match(JSON.stringify([block(body, "anchor-table"), block(body, "two-gates")]), /玉泉院/u);
    assert.match(JSON.stringify([block(body, "anchor-table"), block(body, "two-gates")]), /华山门/u);
    assert.match(JSON.stringify([block(body, "anchor-table"), block(body, "two-gates")]), /华山北站/u);
  }
  assert.match(JSON.stringify(block(en, "entry-checklist")), /Xi’an hotel.*ticketed departure station.*Huashan North.*correct entrance/iu);
  assert.match(JSON.stringify(block(en, "direct-answer")), /Before tickets or trains go on sale.*cancellable rooms.*deadlines.*rerun/iu);
  assert.match(JSON.stringify(block(en, "base-matrix").rows[3]), /Early entry independently.*and.*independently/iu);
  assert.match(JSON.stringify(block(en, "luggage-matrix")), /post-checkout storage.*accepts the bag before entry.*same room remains yours/isu);
  assert.match(JSON.stringify(block(en, "failure-table")), /prebooked room.*late-arrival hold.*prescreened same-night option.*before paying/isu);
  assert.match(JSON.stringify(block(en, "entry-checklist")), /2021 notice.*not a permanent guarantee/iu);
  assert.match(JSON.stringify(block(zh, "entry-checklist")), /2021.*(?:不|并非).*保证/u);
  assert.match(JSON.stringify(block(ko, "entry-checklist")), /2021.*보장/u);
  assert.match(JSON.stringify(block(en, "anchor-table")), /No current official source.*confirms dependable large-bag storage/iu);

  const publicText = JSON.stringify(bodies);
  for (const prohibited of [
    /top\s*10/iu,
    /best\s+hotels?\s+in/iu,
    /booking\.com|agoda|trip\.com/iu,
    /US\$\s*(?:69|129)/iu,
    /(?:¥|￥|CNY|RMB)\s*\d/iu,
    /\b\d[\d,]*\s*(?:yuan|rmb)\b/iu,
    /\d[\d,]*\s*(?:元|위안)/u,
    /(?:always|guaranteed)\s+(?:open|available)/iu,
    /全年24小时(?:必开|开放)|연중\s*24시간.*(?:운영|개방)/iu,
    /(?:exactly|only)\s*15\s*minutes?|永远\s*15\s*分钟|항상\s*15\s*분/iu,
    /(?:free|complimentary)\s+(?:bus|shuttle)|免费公交|무료\s*버스/iu,
    /(?:visitor centre|station) (?:guarantees|provides) luggage storage/iu,
    /游客中心(?:肯定|保证|提供)寄存|방문자 센터(?:가|에서) 수하물 보관을 (?:보장|제공)/iu,
  ]) {
    assert.doesNotMatch(publicText, prohibited);
  }

  const canonical = await source(`content/guides/${slug}/canonical-boundary.md`);
  assert.match(canonical, /already decided to visit Mount Hua/iu);
  assert.match(canonical, /does not own.*extra Xi’an day.*climbing route.*ticket.*timetable.*Summit lodging/isu);
  assert.match(canonical, /primary subject as `natural-feature-huashan`/iu);
  assert.match(canonical, /`city-huayin`.*`transport-node-huashan-north-station`.*`city-xian`.*`province-shaanxi`/isu);
  assert.match(canonical, /Huayin's parent is Weinan/iu);

  const ledger = await source(`content/guides/${slug}/dynamic-facts.md`);
  assert.match(ledger, /2026-09-04 \(Asia\/Shanghai\)/u);
  assert.match(ledger, /critical volatility \/ on-source-change/iu);
  assert.match(ledger, /No fixed train, bus, shuttle, ropeway or park timetable/iu);
  assert.match(ledger, /No current official confirmation found/iu);

  const log = await source(`content/guides/${slug}/source-log.md`);
  assert.match(log, /Google was observed read-only on 2026-09-01/iu);
  assert.match(log, /no search volume, click or conversion estimate is claimed/iu);
  assert.match(log, /Forums were used only to discover unresolved questions, never as authority/iu);
  assert.match(log, /not “more hotels”/iu);
  assert.match(log, /third-party reproduction.*excluded/isu);
  assert.match(log, /TLS error.*HTTP 503/isu);
  assert.match(log, /Huayin pre-night question.*night-climb\/base question/isu);
  assert.match(log, /2026-09-05.*Xi’an North.*Huashan North.*both directions/isu);
  assert.match(log, /Claim-to-source map/iu);
  assert.match(log, /TRAVELLER RE-REVIEW PASS/u);
  assert.match(log, /SEO\/TECH RE-REVIEW PASS/u);
});

test("Mount Hua consultation preserves privacy, supplier consent and all guarantee boundaries", () => {
  const patterns = {
    en: [
      /minimum non-sensitive context/u,
      /do not submit children's exact ages/u,
      /mobility, medical or accessibility details/u,
      /passport\/ID/u,
      /booking\/payment records/u,
      /identifiable supplier-sharing information/u,
      /nothing goes to a supplier without separate consent/u,
      /not (?:a )?live inventory, booking or transport/u,
      /does not guarantee price, availability, foreign-guest acceptance, room type, accessibility/u,
      /entry, trail\/ropeway, train\/transfer, luggage, connection success or safety/u,
    ],
    zh: [
      /最少.*非敏感信息/u,
      /不要.*儿童具体年龄/u,
      /行动.*医疗.*无障碍/u,
      /护照.*证件/u,
      /订单.*付款/u,
      /可识别.*供应商.*分享/u,
      /未经.*(?:另行|单独)同意.*不会.*供应商/u,
      /不是.*实时库存.*预订.*交通服务/u,
      /不保证.*价格.*房态.*(?:外宾|外国旅客)接待.*房型.*无障碍适用性/u,
      /入园.*步道.*索道.*列车.*接驳.*行李.*衔接.*安全/u,
    ],
    ko: [
      /최소.*비민감 정보/u,
      /(?:아동|어린이)의 정확한 나이/u,
      /(?:이동|보행).*의료.*접근성/u,
      /여권.*신분증/u,
      /예약.*결제/u,
      /공급.*전달.*식별 가능/u,
      /별도 동의.*공급.*(?:공유|전달)하지/u,
      /실시간 재고.*예약.*교통 서비스.*아니/u,
      /가격.*(?:객실|예약 가능).*외국인.*객실 유형.*접근성.*보장하지/u,
      /입장.*(?:등산로|탐방로).*케이블카.*열차.*(?:현지 이동|환승).*수하물.*연결.*안전/u,
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

test("Mount Hua Hero is the documented real licensed image with no private data", async () => {
  const imageUrl = new URL(`public/images/guides/${slug}/hero-1600.webp`, root);
  const bytes = await readFile(imageUrl);
  const details = await stat(imageUrl);
  const pixels = await sharp(bytes).metadata();
  const digest = createHash("sha256").update(bytes).digest("hex");
  assert.equal(details.size, 284282);
  assert.deepEqual([pixels.width, pixels.height, pixels.format], [1600, 1000, "webp"]);
  assert.equal(digest, "6c9c2715297986088428b89c8a0f76a2ef15a85b3c8ee3d6a0518220841751d1");

  const imagePlan = await source(`content/guides/${slug}/image-plan.md`);
  for (const expected of [
    "A Chinese ID",
    "2022-04-02",
    "CC BY-SA 4.0",
    "cb225d3a0e84e3e417f3e1dddabd5db9bf8def5d618d16721448d436232f2319",
    digest,
    "no generation, generative fill, object insertion, synthetic alteration or misleading composite",
  ]) {
    assert.match(imagePlan, new RegExp(expected, "iu"));
  }
  assert.match(imagePlan, /real licensed scene/iu);
  assert.match(imagePlan, /no identifiable guest, face, passport, identity document, ticket, booking reference, room number, keycard, payment record or readable vehicle plate/iu);
  assert.match(imagePlan, /does not prove current trains, transfer time, station facilities, hotel inventory, prices, foreign-guest acceptance, room type, luggage storage, accessibility, entry or mountain operations/iu);
  assert.match(imagePlan, /No AI-generated hotel, street, station, mountain entrance, room, transport or traveller documentary image/iu);
  assert.equal(pixels.exif, undefined);
  assert.equal(pixels.xmp, undefined);
  assert.equal(pixels.iptc, undefined);
});
