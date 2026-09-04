import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

import en from "../../content/guides/daocheng-yading-village-or-shangri-la-town-hotel-base/body.en.ts";
import zh from "../../content/guides/daocheng-yading-village-or-shangri-la-town-hotel-base/body.zh.ts";
import ko from "../../content/guides/daocheng-yading-village-or-shangri-la-town-hotel-base/body.ko.ts";
import {
  guideUpdatePolicy,
  resolveGuideEntities,
} from "../../lib/searchPlatformGuidePolicy.ts";

const slug = "daocheng-yading-village-or-shangri-la-town-hotel-base";
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

test("Daocheng Yading base owner has complete metadata and companion files", async () => {
  const metadata = JSON.parse(await source(`content/guides/${slug}/metadata.json`));
  assert.equal(metadata.id, slug);
  assert.equal(metadata.type, "planning");
  assert.equal(metadata.pillar, "stay-hotel-types-scenic-bases");
  assert.equal(metadata.format, "scenic-village-or-gateway-base-decision");
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
  assert.match(metadata.locales.en.title, /Daocheng Yading.*Yading Village.*Shangri-La Town \(Riwa\)/u);
  assert.match(metadata.locales.en.description, /^For Daocheng Yading.*Yading Village.*Shangri-La Town \(Riwa\)/u);
  assert.equal(metadata.heroImagePath, `/images/guides/${slug}/hero-1600.webp`);
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
    assert.ok(localized.description.length > (locale === "en" ? 70 : 30), locale);
    assert.equal(localized.heroCredit.licenseLabel, "CC BY 3.0");
    assert.equal(localized.heroCredit.licenseUrl, "https://creativecommons.org/licenses/by/3.0/");
    assert.equal(
      localized.heroCredit.sourceUrl,
      "https://commons.wikimedia.org/wiki/File:%E4%BA%9A%E4%B8%81%E6%9D%91_-_panoramio.jpg",
    );
    assert.match(localized.heroCredit.text, /fsyzh/u);
    assert.match(localized.heroCredit.text, /(?:uploaded|上传|업로드|올린)/iu);
    assert.equal(localized.cardTags.length, 3);
  }
  assert.match(metadata.locales.en.heroCredit.text, /uploaded on 14 September 2009/u);
  assert.match(metadata.locales.zh.heroCredit.text, /2009 年 9 月 14 日上传/u);
  assert.match(metadata.locales.ko.heroCredit.text, /2009년 9월 14일 올린/u);
  assert.doesNotMatch(JSON.stringify(metadata.locales.ko), /리와/u);

  for (const name of [
    "canonical-boundary.md",
    "dynamic-facts.md",
    "source-log.md",
    "image-plan.md",
  ]) {
    await access(new URL(`content/guides/${slug}/${name}`, root));
  }
});

test("Daocheng Yading EN ZH KO bodies preserve block and table shape parity", () => {
  assert.deepEqual(signature(en), signature(zh));
  assert.deepEqual(signature(en), signature(ko));
  assert.deepEqual(shape(en), shape(zh));
  assert.deepEqual(shape(en), shape(ko));

  for (const required of [
    "short-answer:callout",
    "name-warning:callout",
    "route-table:table",
    "altitude-veto:callout",
    "decision-matrix:table",
    "split-table:table",
    "property-checklist:list",
    "scenario-one:list",
    "scenario-two:list",
    "scenario-three:list",
    "failure-table:table",
    "booking-checklist:list",
    "consultation-boundary:callout",
    "internal-links:internal-links",
    "sources:sources",
  ]) {
    assert.ok(signature(en).includes(required), required);
  }

  const englishWords = JSON.stringify(en).match(/[A-Za-z]+(?:['’][A-Za-z]+)?/gu)?.length ?? 0;
  const chineseChars = JSON.stringify(zh).match(/[\u3400-\u9fff]/gu)?.length ?? 0;
  const koreanChars = JSON.stringify(ko).match(/[\uac00-\ud7a3]/gu)?.length ?? 0;
  assert.ok(englishWords >= 1200, `English information depth: ${englishWords}`);
  assert.ok(chineseChars >= 2200, `Chinese information depth: ${chineseChars}`);
  assert.ok(koreanChars >= 2200, `Korean information depth: ${koreanChars}`);
});

test("Daocheng Yading owner keeps links, sources, entity names and claims bounded", async () => {
  const bodies = { en, zh, ko };
  const prefixes = { en: "", zh: "/zh", ko: "/ko" };
  const expectedSources = [
    "https://www.daocheng.gov.cn/dcyw/article/727365",
    "https://www.daocheng.gov.cn/xzqh/article/713650",
    "https://www.daocheng.gov.cn/dcxrmzf/c102435/201412/bc43497d98f44a7c83133bf951ea09cf.shtml",
    "https://www.daocheng.gov.cn/dcxrmzf/c102548/201611/535e102ad1fc4747bbd84564b4b2978a.shtml",
    "https://www.daocheng.gov.cn/lydt/article/697371",
    "https://www.yadingtour.com/book/providerIndex.action?iscenicid=1",
    "https://www.yadingtour.com/home/showArticle.action?article.amid=82",
    "https://www.daocheng.gov.cn/bmdt/article/709007",
    "https://www.shannan.gov.cn/zjsn/snly/jzcs/202608/t20260821_175356.html",
    "https://cn.yadingtour.com/e-news/notice/838-2023-12-08-4",
    "https://commons.wikimedia.org/wiki/File:%E4%BA%9A%E4%B8%81%E6%9D%91_-_panoramio.jpg",
  ];

  for (const [locale, body] of Object.entries(bodies)) {
    const links = body.blocks.find((block) => block.id === "internal-links");
    const sources = body.blocks.find((block) => block.id === "sources");
    assert.equal(links.items.length, 4);
    assert.equal(sources.items.length, 11);
    assert.ok(links.items.some((item) => item.href === `${prefixes[locale]}/stay/`));
    for (const owner of [
      "foreigners-china-hotel",
      "minsu-homestay-or-hotel-china",
      "china-accessible-hotel-room-verification",
    ]) {
      assert.ok(links.items.some(
        (item) => item.href === `${prefixes[locale]}/guides/${owner}/`,
      ));
    }
    assert.deepEqual(sources.items.map((item) => item.url), expectedSources);
    assert.ok(sources.items.every((item) => item.reviewedAt === "2026-09-01"));
  }

  assert.match(en.blocks.find((block) => block.id === "lead").text, /Shangri-La Town \(Riwa\), Daocheng County, Sichuan/u);
  assert.match(en.blocks.find((block) => block.id === "name-warning").body, /not Shangri-La City in Yunnan/u);
  assert.match(zh.blocks.find((block) => block.id === "lead").text, /四川省稻城县香格里拉镇（旧称日瓦）/u);
  assert.match(zh.blocks.find((block) => block.id === "name-warning").body, /不是云南省香格里拉市/u);
  assert.match(ko.blocks.find((block) => block.id === "lead").text, /쓰촨성 다오청현 샹그릴라진\(香格里拉镇, 옛 르와\/日瓦\)/u);
  assert.match(ko.blocks.find((block) => block.id === "name-warning").body, /윈난성 샹그릴라시가 아닙니다/u);

  assert.match(en.blocks.find((block) => block.id === "lead").text, /not the trailhead/u);
  assert.match(zh.blocks.find((block) => block.id === "lead").text, /不是徒步起点/u);
  assert.match(ko.blocks.find((block) => block.id === "lead").text, /등산로 입구 자체는 아니/u);
  assert.match(JSON.stringify(ko), /충구사\(冲古寺\)/u);
  assert.doesNotMatch(JSON.stringify(ko), /충고사|리와/u);
  for (const body of Object.values(bodies)) {
    assert.equal(body.blocks.find((block) => block.id === "decision-matrix").rows.length, 5);
    assert.equal(body.blocks.find((block) => block.id === "failure-table").rows.length, 5);
    assert.equal(body.blocks.find((block) => block.id === "property-checklist").items.length, 9);
  }

  const publicText = JSON.stringify(bodies);
  for (const prohibited of [
    /top\s*10/iu,
    /best\s+hotels?\s+in/iu,
    /booking\.com|agoda|trip\.com/iu,
    /US\$\s*(?:69|129)/iu,
    /(?:¥|￥|CNY|RMB)\s*\d/iu,
    /\b\d[\d,]*\s*(?:yuan|rmb)\b/iu,
    /\d[\d,]*\s*(?:元|위안)/u,
    /(?:diamox|acetazolamide|红景天|乙酰唑胺|아세타졸아미드)/iu,
    /guarantees? (?:no|zero) altitude/iu,
    /保证不会高反|고산병이 없/u,
  ]) {
    assert.doesNotMatch(publicText, prohibited);
  }

  const canonical = await source(`content/guides/${slug}/canonical-boundary.md`);
  assert.match(canonical, /after a traveller has already decided to visit/iu);
  assert.match(canonical, /not Shangri-La City in Yunnan/iu);
  assert.match(canonical, /No homepage, destination Hub, Search Map/iu);
  assert.match(canonical, /explicit country-level classification `china`/iu);
  assert.match(canonical, /`province-sichuan` already exists/iu);
  const futureCandidateList = canonical
    .split("Future central candidates, not created in this branch:")[1]
    .split("`province-sichuan` already exists")[0];
  assert.doesNotMatch(futureCandidateList, /`province-sichuan`/iu);

  const ledger = await source(`content/guides/${slug}/dynamic-facts.md`);
  assert.match(ledger, /Critical \/ daily/u);
  assert.match(ledger, /No fixed time is published/u);
  assert.match(ledger, /No hotel's shuttle, oxygen supply, accessibility/u);

  const log = await source(`content/guides/${slug}/source-log.md`);
  assert.match(log, /Google returned a JavaScript challenge/iu);
  assert.match(log, /No People Also Ask wording is invented/iu);
  assert.match(log, /Forums establish only that travellers ask/iu);
});

test("Daocheng Yading consultation keeps privacy and guarantee boundaries in all locales", () => {
  const assertions = {
    en: [
      /minimum non-sensitive context/u,
      /do not submit children's exact ages/u,
      /mobility, medical or accessibility details/u,
      /passport or identity documents/u,
      /booking or payment records/u,
      /nothing is shared with a supplier without separate consent/u,
      /does not guarantee price, availability, foreign-guest acceptance, room type, accessibility suitability/u,
      /park entry, road or bus operation, luggage transfer or high-altitude suitability/u,
    ],
    zh: [
      /最少的非敏感信息/u,
      /不要在初始表单提交儿童具体年龄/u,
      /行动\/医疗\/无障碍细节/u,
      /护照或其他证件/u,
      /订单或付款资料/u,
      /未经另行同意不会分享给供应商/u,
      /不保证价格、房态、外宾接待、房型、无障碍适用性/u,
      /景区入园、道路或班车运行、行李转运或高原适用性/u,
    ],
    ko: [
      /최소한의 비민감 정보/u,
      /첫 양식에 아동의 정확한 나이/u,
      /이동·의료·접근성 세부 정보/u,
      /여권이나 신분증/u,
      /예약이나 결제 자료/u,
      /별도 동의 없이는 공급자에게 공유하지 않습니다/u,
      /가격, 객실 가능 여부, 외국인 투숙 가능 여부, 객실 유형, 접근성 적합성/u,
      /풍경구 입장, 도로·버스 운행, 짐 운송 또는 고도 적합성/u,
    ],
  };
  const bodies = { en, zh, ko };
  for (const [locale, body] of Object.entries(bodies)) {
    const consultation = body.blocks.find((block) => block.id === "consultation-boundary");
    assert.ok(consultation, `${locale} consultation boundary`);
    for (const pattern of assertions[locale]) {
      assert.match(consultation.body, pattern, `${locale} ${pattern}`);
    }
  }
});

test("Daocheng Yading hero is the documented real licensed photograph", async () => {
  const imageUrl = new URL(`public/images/guides/${slug}/hero-1600.webp`, root);
  const bytes = await readFile(imageUrl);
  const details = await stat(imageUrl);
  const digest = createHash("sha256").update(bytes).digest("hex");
  assert.equal(details.size, 327744);
  assert.equal(
    digest,
    "562ea16aba47258360e6fb9053920c9819439a57e5ff1b8b866bdcaa2db842fe",
  );

  const imagePlan = await source(`content/guides/${slug}/image-plan.md`);
  for (const expected of [
    "fsyzh",
    "2009-09-14",
    "CC BY 3.0",
    "6ff230f61027c35f8e8c09e043077eb8c5a8d77ee6f1b36f3b56200f9075c997",
    digest,
    "no generation, generative fill, object insertion or synthetic alteration",
  ]) {
    assert.match(imagePlan, new RegExp(expected, "iu"));
  }
  assert.match(imagePlan, /does not establish a hotel choice/iu);
  assert.match(imagePlan, /No identifiable guest, passport, identity document/iu);
});
