import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";
import sharp from "sharp";

import en from "../../content/guides/jiuzhaigou-entrance-or-huanglongjiuzhai-station-hotel-base/body.en.ts";
import zh from "../../content/guides/jiuzhaigou-entrance-or-huanglongjiuzhai-station-hotel-base/body.zh.ts";
import ko from "../../content/guides/jiuzhaigou-entrance-or-huanglongjiuzhai-station-hotel-base/body.ko.ts";
import {
  guideUpdatePolicy,
  resolveGuideEntities,
} from "../../lib/searchPlatformGuidePolicy.ts";

const slug = "jiuzhaigou-entrance-or-huanglongjiuzhai-station-hotel-base";
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

test("Jiuzhaigou entrance-versus-station owner has complete high-volatility metadata", async () => {
  const metadata = JSON.parse(await source(`content/guides/${slug}/metadata.json`));
  assert.equal(metadata.id, slug);
  assert.equal(metadata.type, "planning");
  assert.equal(metadata.pillar, "stay-hotel-types-scenic-bases");
  assert.equal(metadata.format, "rail-gateway-or-scenic-base-decision");
  assert.deepEqual(metadata.destinations, ["china"]);
  assert.deepEqual(metadata.search, {
    section: "stay",
    family: "combined-decision",
    primaryIntent: "plan",
  });
  assert.deepEqual(
    [metadata.datePublished, metadata.dateModified, metadata.sourceReviewedDate],
    ["2026-09-01", "2026-09-01", "2026-09-01"],
  );
  assert.ok(metadata.topics.some((topic) => /opening.*reservation.*road.*transfer/iu.test(topic)));
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
    assert.ok(localized.title.length > (locale === "en" ? 25 : 12), locale);
    assert.ok(localized.description.length > (locale === "en" ? 80 : 35), locale);
    assert.equal(localized.cardTags.length, 3);
    assert.equal(localized.heroCredit.licenseLabel, "CC BY-SA 4.0");
    assert.equal(localized.heroCredit.licenseUrl, "https://creativecommons.org/licenses/by-sa/4.0/");
    assert.equal(
      localized.heroCredit.sourceUrl,
      "https://commons.wikimedia.org/wiki/File:Huanglongjiuzhai_Railway_Station,_December_2024,_10.jpg",
    );
    assert.match(localized.heroCredit.text, /Underbar dk/u);
    assert.match(localized.heroCredit.text, /(?:2024|2025)/u);
  }
  assert.match(metadata.locales.en.heroCredit.text, /photographed.*8 December 2024.*uploaded.*2 February 2025/iu);
  assert.match(metadata.locales.zh.heroCredit.text, /2024 年 12 月 8 日拍摄.*2025 年 2 月 2 日上传/u);
  assert.match(metadata.locales.ko.heroCredit.text, /2024년 12월 8일 촬영.*2025년 2월 2일 올린/u);
  assert.match(metadata.locales.en.headline, /Jiuzhaigou Entrance.*Huanglongjiuzhai Station/iu);
  assert.match(metadata.locales.zh.headline, /九寨沟沟口.*黄龙九寨站/u);
  assert.match(metadata.locales.ko.headline, /주자이거우 입구.*황룽주자이역/u);
  assert.doesNotMatch(metadata.locales.ko.description, /숙박권/u);

  for (const name of [
    "canonical-boundary.md",
    "dynamic-facts.md",
    "source-log.md",
    "image-plan.md",
  ]) {
    await access(new URL(`content/guides/${slug}/${name}`, root));
  }
});

test("Jiuzhaigou EN ZH KO bodies preserve block, table and list shape parity", () => {
  assert.deepEqual(signature(en), signature(zh));
  assert.deepEqual(signature(en), signature(ko));
  assert.deepEqual(shape(en), shape(zh));
  assert.deepEqual(shape(en), shape(ko));

  for (const required of [
    "direct-answer:callout",
    "inside-rule:callout",
    "scope-boundary:paragraph",
    "location-table:table",
    "stay-matrix:table",
    "arrival-checklist:list",
    "last-night-table:table",
    "one-move-rule:callout",
    "needs-table:table",
    "property-checklist:list",
    "scenario-full:list",
    "scenario-late:list",
    "scenario-early:list",
    "scenario-family:list",
    "failure-table:table",
    "records-list:list",
    "dynamic-callout:callout",
    "final-checklist:list",
    "consultation-boundary:callout",
    "internal-links:internal-links",
    "sources:sources",
  ]) {
    assert.ok(signature(en).includes(required), required);
  }

  assert.equal(block(en, "location-table").rows.length, 4);
  assert.equal(block(en, "stay-matrix").rows.length, 5);
  assert.equal(block(en, "last-night-table").rows.length, 4);
  assert.equal(block(en, "needs-table").rows.length, 5);
  assert.equal(block(en, "failure-table").rows.length, 6);
  assert.equal(block(en, "arrival-checklist").items.length, 6);
  assert.equal(block(en, "property-checklist").items.length, 8);
  assert.equal(block(en, "records-list").items.length, 7);
  assert.equal(block(en, "final-checklist").items.length, 8);

  const independentObjects = en.blocks.reduce((count, item) => (
    count
    + ("rows" in item ? item.rows.length : 0)
    + ("items" in item ? item.items.length : 0)
    + (item.type === "callout" ? 1 : 0)
  ), 0);
  assert.ok(independentObjects >= 60, `Independent information objects: ${independentObjects}`);

  const englishWords = JSON.stringify(en).match(/[A-Za-z]+(?:['’][A-Za-z]+)?/gu)?.length ?? 0;
  const chineseChars = JSON.stringify(zh).match(/[\u3400-\u9fff]/gu)?.length ?? 0;
  const koreanChars = JSON.stringify(ko).match(/[\uac00-\ud7a3]/gu)?.length ?? 0;
  assert.ok(englishWords >= 1300, `English information depth: ${englishWords}`);
  assert.ok(chineseChars >= 2300, `Chinese information depth: ${chineseChars}`);
  assert.ok(koreanChars >= 2300, `Korean information depth: ${koreanChars}`);
});

test("Jiuzhaigou owner preserves source order, localized links and canonical scope", async () => {
  const bodies = { en, zh, ko };
  const prefixes = { en: "", zh: "/zh", ko: "/ko" };
  const expectedSources = [
    "https://abazhou.gov.cn/abazhou/c101955/202608/61f879f6a24746718025c78e2c42777e.shtml",
    "https://abazhou.gov.cn/abazhou/c101955/202407/e13092b093f24b009f989bd418ffa142.shtml",
    "https://www.songpan.gov.cn/spxrmzf/c100050/202607/90c2369b5699446f8ff99065a3645082.shtml",
    "https://www.jiuzhai.com/news/notice/11241-2026-07-08-03-30-49",
    "https://www.jiuzhai.com/news/notice/11325-2026-08-11-16-26-09",
    "https://www.jzg.gov.cn/jzgrmzf/jgsf/202603/ccfa4789012d490596552a1680ffaaec.shtml",
    "https://abazhou.gov.cn/abazhou/c109784/202308/6b5847dfac864e6ab7220430510232ad.shtml",
    "https://www.jiuzhai.com/about/jiuzhai-valley",
    "https://www.jzg.gov.cn/jzgrmzf/c100053/202112/a162bf6d283a483e9ca612cb4de9d1d1.shtml",
    "https://www.jiuzhai.com/news/notice/11290-2026-07-29-02-04-43",
    "https://abazhou.gov.cn/abazhou/c109692/202603/9bd4dacbc0464f199500321fb1ff94dd.shtml",
    "https://www.sc.gov.cn/10462/10464/10797/2025/6/16/d4ea87e678af4e888b7ff8158e13d462.shtml",
    "https://www.songpan.gov.cn/spxrmzf/c100050/202608/119293cc2ee84196a1a30bebcdcb90d4.shtml",
    "https://commons.wikimedia.org/wiki/File:Huanglongjiuzhai_Railway_Station,_December_2024,_10.jpg",
  ];

  for (const [locale, body] of Object.entries(bodies)) {
    const links = block(body, "internal-links");
    const sources = block(body, "sources");
    assert.equal(links.items.length, 4);
    assert.equal(sources.items.length, expectedSources.length);
    for (const owner of [
      "chengdu-jiuzhaigou-transport-route",
      "china-hub-and-spoke-or-multi-base-route",
      "foreigners-china-hotel",
      "china-accessible-hotel-room-verification",
    ]) {
      assert.ok(
        links.items.some((item) => item.href === `${prefixes[locale]}/guides/${owner}/`),
        `${locale} link to ${owner}`,
      );
    }
    assert.deepEqual(sources.items.map((item) => item.url), expectedSources);
    assert.ok(sources.items.every((item) => item.reviewedAt === "2026-09-01"));
  }

  assert.match(block(en, "lead").text, /confirmed full day.*stay outside the scenic area.*Zhangzha Town/iu);
  assert.match(block(en, "lead").text, /slowest or most constrained traveller/iu);
  assert.match(block(zh, "lead").text, /行动最慢或限制最多/u);
  assert.match(block(ko, "lead").text, /가장 느리거나 제약이 큰 일행/u);
  assert.match(block(en, "inside-rule").body, /tour inside and stay outside/iu);
  assert.match(block(zh, "inside-rule").body, /沟内游.*沟外住/u);
  assert.match(block(ko, "inside-rule").body, /풍경구.*안.*관광.*밖.*숙박/u);
  assert.match(block(en, "direct-answer").body, /transition or recovery night, not as a Jiuzhaigou park base/iu);
  assert.match(block(en, "direct-answer").body, /roughly 90 kilometres.*(?:travel|journey) time.*(?:dynamic|not guaranteed)/iu);
  assert.match(block(zh, "direct-answer").body, /约\s*90\s*公里.*(?:时长|用时).*(?:动态|不保证)/u);
  assert.match(block(ko, "direct-answer").body, /약\s*90\s*(?:킬로미터|km).*시간.*(?:달라|변|보장하지)/iu);

  assert.match(block(en, "direct-answer").body, /one entrance-side property.*rooms the group needs/iu);
  assert.match(block(zh, "direct-answer").body, /同一家沟口外住宿.*按人数订所需房间/u);
  assert.match(block(ko, "direct-answer").body, /입구 쪽 한 숙소.*필요한 객실 수/u);

  const enArrival = JSON.stringify(block(en, "arrival-checklist"));
  const zhArrival = JSON.stringify(block(zh, "arrival-checklist"));
  const koArrival = JSON.stringify(block(ko, "arrival-checklist"));
  assert.match(enArrival, /dated transport plan.*only the exact station name and final public drop-off/iu);
  assert.match(zhArrival, /住宿决策只需抄下准确车站与最终公共下客点/u);
  assert.match(koArrival, /숙소 결정에는 정확한 역명과 최종 공공 하차 지점만/u);
  assert.doesNotMatch(enArrival, /confirm the date, departure point, intended train connection, final drop-off, luggage rule and late-train response/iu);
  assert.match(JSON.stringify(block(en, "scenario-late")), /transport guide and live official channel.*property verified and booked/isu);
  assert.match(JSON.stringify(block(zh, "scenario-late")), /当期交通指南和官方实时渠道.*已核验并订好/isu);
  assert.match(JSON.stringify(block(ko, "scenario-late")), /해당 날짜의 교통 가이드와 공식 실시간 채널.*확인하고 예약한/isu);
  assert.match(block(en, "failure-table").rows[0][1], /separate dated transport-recovery guidance/iu);
  assert.match(block(zh, "failure-table").rows[0][1], /单独的当期交通恢复指南/u);
  assert.match(block(ko, "failure-table").rows[0][1], /별도의 최신 교통 복구 가이드/u);

  const publicText = JSON.stringify(bodies);
  for (const prohibited of [
    /top\s*10/iu,
    /best\s+hotels?\s+in/iu,
    /hotel\s+(?:app|platform)\s+ranking/iu,
    /booking\.com|agoda|trip\.com/iu,
    /US\$\s*(?:69|129)/iu,
    /(?:¥|￥|CNY|RMB)\s*\d/iu,
    /\b\d[\d,]*\s*(?:yuan|rmb)\b/iu,
    /\d[\d,]*\s*(?:元|위안)/u,
    /(?:live|real-time)\s+(?:room\s+)?(?:price|availability)/iu,
    /(?:实时|실시간)(?:房价|价格|房态|가격|객실)/u,
    /(?:about|approximately|roughly)?\s*two[\s-]+hours?|\b2\s*hours?|(?:约|大约|约为)?\s*(?:2|两)\s*(?:个)?小时|(?:약)?\s*2\s*시간|두\s*시간/iu,
    /one entrance-side room|with one room|usually preserves one room/iu,
    /只保留一个房间|通常只需一个房间/u,
    /입구 쪽 한 객실|대체로 한 객실/u,
    /숙박권/u,
    /verified legal (?:room|gateway room)|合规铁路门户住宿|합법적인 철도 관문 숙소/iu,
  ]) {
    assert.doesNotMatch(publicText, prohibited);
  }

  const canonical = await source(`content/guides/${slug}/canonical-boundary.md`);
  assert.match(canonical, /after the traveller has decided to visit Jiuzhaigou/iu);
  assert.match(canonical, /`chengdu-jiuzhaigou-transport-route` owns.*exact rail station.*named onward transfer.*booking handoff.*return.*transport disruption/isu);
  assert.match(canonical, /never republishes a timetable, fare, coach-booking walkthrough or complete station-to-valley route/iu);
  assert.match(canonical, /does not own or guarantee park tickets.*current opening hours.*exact trains or transfers.*road status.*prices.*inventory.*foreign-guest acceptance.*room type.*accessibility suitability/isu);
  assert.match(canonical, /No homepage, destination Hub, Search Map, registry/iu);
  assert.match(canonical, /Metadata intentionally uses `destinations: \["china"\]`.*`country-china`.*without fallback or an unmapped token/isu);

  const ledger = await source(`content/guides/${slug}/dynamic-facts.md`);
  assert.match(ledger, /2026-09-01 \(Asia\/Shanghai\)/u);
  assert.match(ledger, /Critical \/ before every booking and travel day/u);
  assert.match(ledger, /not a guaranteed duration/iu);
  assert.match(ledger, /No fixed train, coach or park timetable, fare, room price, inventory, rating, walk time, capacity, refund promise or hotel availability is published/iu);
  assert.match(ledger, /high volatility \/ on-source-change/iu);

  const log = await source(`content/guides/${slug}/source-log.md`);
  assert.match(log, /Google was observed in a Korea-localized Chrome session/iu);
  assert.match(log, /no independent Korean base-decision page was found/iu);
  assert.match(log, /Chinese\/Korean PAA.*did not appear.*none are invented/isu);
  assert.match(log, /Forums were used only to discover unresolved questions, never as authority/iu);
  assert.match(log, /public-consultation notice on administrative divisions.*published 2021-12-10/isu);
  assert.match(log, /not “more hotels”/iu);
});

test("Jiuzhaigou consultation keeps privacy, supplier-consent and guarantee boundaries in all locales", () => {
  const privacyAssertions = {
    en: [
      /minimum non-sensitive context/u,
      /do not submit children's exact ages/u,
      /mobility, medical or accessibility details/u,
      /passport or identity documents/u,
      /booking or payment records/u,
      /identifiable information intended for a hotel, driver, DMC or other supplier/u,
      /nothing is shared with a supplier without separate consent/u,
      /not a live inventory or transport service/u,
      /does not guarantee price, availability, foreign-guest acceptance, room type, accessibility suitability/u,
      /park entry, train\/coach operation, road conditions, luggage handling or connection success/u,
    ],
    zh: [
      /最少的非敏感信息/u,
      /不要在初始表单提交儿童具体年龄/u,
      /行动[、，,\/·]医疗[、，,\/·]无障碍细节/u,
      /护照或其他证件/u,
      /订单或付款资料/u,
      /可识别.*酒店、司机、地接或其他供应商/u,
      /未经另行同意不会分享给供应商/u,
      /不是实时库存或交通服务/u,
      /不保证价格、房态、外宾接待、房型、无障碍适用性/u,
      /景区入园、列车\/班车运行、道路状况、行李处理或接驳成功/u,
    ],
    ko: [
      /최소한의 비민감 정보/u,
      /첫 양식에 아동의 정확한 나이/u,
      /이동[·,/]의료[·,/]접근성 세부 정보/u,
      /여권이나 신분증/u,
      /예약이나 결제 자료/u,
      /호텔, 기사, DMC 또는 다른 공급자에게 전달할 식별 가능 정보/u,
      /별도 동의 없이는 공급자에게 공유하지 않습니다/u,
      /실시간 재고나 교통 서비스가 아닙니다/u,
      /가격, 객실 가능 여부, 외국인 투숙 가능 여부, 객실 유형, 접근성 적합성/u,
      /풍경구 입장, 열차\/버스 운행, 도로 상황, 수하물 처리 또는 연결 성공/u,
    ],
  };
  const bodies = { en, zh, ko };
  for (const [locale, body] of Object.entries(bodies)) {
    const consultation = block(body, "consultation-boundary");
    for (const pattern of privacyAssertions[locale]) {
      assert.match(consultation.body, pattern, `${locale} ${pattern}`);
    }
  }
});

test("Jiuzhaigou hero is the documented real licensed photograph with no private data", async () => {
  const imageUrl = new URL(`public/images/guides/${slug}/hero-1600.webp`, root);
  const bytes = await readFile(imageUrl);
  const details = await stat(imageUrl);
  const pixels = await sharp(bytes).metadata();
  const digest = createHash("sha256").update(bytes).digest("hex");
  assert.equal(details.size, 350160);
  assert.deepEqual([pixels.width, pixels.height, pixels.format], [1600, 1000, "webp"]);
  assert.equal(
    digest,
    "8b60d46d4201053de9aff0183597e1affeed2697ba56059041dfed4463033c4a",
  );

  const imagePlan = await source(`content/guides/${slug}/image-plan.md`);
  for (const expected of [
    "Underbar dk",
    "2024-12-08 17:01:13",
    "2025-02-02 07:05",
    "CC BY-SA 4.0",
    "05669eea626d5c3e7b55540399670f8415c07c73e52d14351fc01c03e4791072",
    digest,
    "no generation, generative fill, object insertion, synthetic alteration or misleading composite",
  ]) {
    assert.match(imagePlan, new RegExp(expected, "iu"));
  }
  assert.match(imagePlan, /real licensed station scene/iu);
  assert.match(imagePlan, /No identifiable guest, passport, identity document, ticket, booking reference, room number, keycard, payment record or vehicle plate is visible/iu);
  assert.match(imagePlan, /does not prove current trains, coaches, station facilities, hotel inventory, prices, walkability, foreign-guest acceptance, room type or accessibility/iu);
  assert.match(imagePlan, /No AI-generated hotel, street, station, room, transport or traveller documentary image may replace these requirements/iu);
});
