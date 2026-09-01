import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

import en from "../../content/guides/canton-fair-pazhou-tianhe-yuexiu-hotel-base/body.en.ts";
import zh from "../../content/guides/canton-fair-pazhou-tianhe-yuexiu-hotel-base/body.zh.ts";
import ko from "../../content/guides/canton-fair-pazhou-tianhe-yuexiu-hotel-base/body.ko.ts";

const slug = "canton-fair-pazhou-tianhe-yuexiu-hotel-base";
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

test("Canton Fair stay owner has complete trilingual metadata and companion files", async () => {
  const metadata = JSON.parse(await source(`content/guides/${slug}/metadata.json`));
  assert.equal(metadata.id, slug);
  assert.equal(metadata.type, "planning");
  assert.equal(metadata.pillar, "stay-city-areas");
  assert.equal(metadata.format, "event-led-three-area-stay-decision");
  assert.deepEqual(metadata.destinations, ["guangzhou"]);
  assert.deepEqual(metadata.search, {
    section: "stay",
    family: "combined-decision",
    primaryIntent: "plan",
  });
  assert.deepEqual(
    [metadata.datePublished, metadata.dateModified, metadata.sourceReviewedDate],
    ["2026-09-01", "2026-09-01", "2026-09-01"],
  );

  const prefixes = { en: "", zh: "/zh", ko: "/ko" };
  for (const [locale, prefix] of Object.entries(prefixes)) {
    const localized = metadata.locales[locale];
    assert.equal(localized.path, `${prefix}/guides/${slug}/`);
    assert.ok(localized.title.length > (locale === "en" ? 20 : 10), locale);
    assert.ok(localized.description.length > (locale === "en" ? 50 : 20), locale);
    assert.equal(localized.heroCredit.licenseLabel, "CC BY-SA 4.0");
    assert.match(localized.heroCredit.text, /Tim Wu/u);
    assert.equal(localized.cardTags.length, 3);
  }

  for (const name of [
    "canonical-boundary.md",
    "dynamic-facts.md",
    "source-log.md",
    "image-plan.md",
  ]) {
    await access(new URL(`content/guides/${slug}/${name}`, root));
  }
});

test("Canton Fair EN ZH KO bodies preserve block and table shape parity", () => {
  assert.deepEqual(signature(en), signature(zh));
  assert.deepEqual(signature(en), signature(ko));
  assert.deepEqual(shape(en), shape(zh));
  assert.deepEqual(shape(en), shape(ko));

  for (const required of [
    "short-answer:callout",
    "area-comparison:comparison",
    "venue-table:table",
    "decision-matrix:table",
    "verification-list:list",
    "scenario-pazhou:list",
    "scenario-tianhe:list",
    "scenario-yuexiu:list",
    "move-table:table",
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

test("Canton Fair owner keeps sources current, links localized and claims bounded", async () => {
  const bodies = { en, zh, ko };
  const prefixes = { en: "", zh: "/zh", ko: "/ko" };
  const expectedSources = [
    "https://www.cantonfair.org.cn/en-US/pages/598494791797825536",
    "https://www.cantonfair.org.cn/en-US/pages/682045446818172928",
    "https://www.eguangzhou.gov.cn/gzspecialreports/139thCantonFair/content/post_42667.html",
    "https://www.gz.gov.cn/guangzhouinternational/Canton%20Fair/content/post_10769860.html",
    "https://www.cantonfair.org.cn/en-US/posts/1006458668226895872",
    "https://www.eguangzhou.gov.cn/gzlatest/content/post_42773.html",
  ];

  for (const [locale, body] of Object.entries(bodies)) {
    const links = body.blocks.find((block) => block.id === "internal-links");
    const sources = body.blocks.find((block) => block.id === "sources");
    assert.equal(links.items.length, 4);
    assert.equal(sources.items.length, 7);
    assert.ok(links.items.some((item) => item.href === `${prefixes[locale]}/stay/`));
    assert.ok(links.items.some((item) => item.href === `${prefixes[locale]}/destinations/guangzhou/`));
    for (const owner of ["china-hotel-near-metro", "foreigners-china-hotel"]) {
      assert.ok(links.items.some(
        (item) => item.href === `${prefixes[locale]}/guides/${owner}/`,
      ));
    }
    for (const url of expectedSources) {
      assert.ok(sources.items.some((item) => item.url === url), `${locale} ${url}`);
    }
    assert.ok(sources.items.every((item) => item.reviewedAt === "2026-09-01"));
  }

  const publicText = JSON.stringify(bodies);
  for (const prohibited of [
    /top\s*10/iu,
    /best\s+hotels?\s+in/iu,
    /guaranteed\s+(?:room|shuttle|availability|price)/iu,
    /US\$\s*(?:69|129)/iu,
    /(?:实时房价|房态)[：:]\s*[¥￥\d]/u,
    /실시간\s*객실|보장된\s*셔틀/u,
    /booking\.com|agoda|trip\.com/iu,
  ]) {
    assert.doesNotMatch(publicText, prohibited);
  }

  const boundary = await source(`content/guides/${slug}/canonical-boundary.md`);
  assert.match(boundary, /after the traveller has decided to attend/iu);
  assert.match(boundary, /generic `where to stay in Guangzhou`/iu);
  assert.match(boundary, /No homepage, destination Hub, Search Map/iu);

  const ledger = await source(`content/guides/${slug}/dynamic-facts.md`);
  assert.match(ledger, /Critical \/ every session/u);
  assert.match(ledger, /No fixed time is published/u);
  assert.match(ledger, /No hotel shuttle is promised/u);

  const privacyAssertions = {
    en: [
      /minimum non-sensitive context/u,
      /do not submit children's exact ages/u,
      /mobility, medical or accessibility details/u,
      /passport or identity documents/u,
      /booking or payment records/u,
      /nothing is shared with a supplier without separate consent/u,
      /does not guarantee price, availability, foreign-guest acceptance, room type, accessibility suitability/u,
    ],
    zh: [
      /最少的非敏感信息/u,
      /不要在初始表单提交儿童具体年龄/u,
      /行动、医疗或无障碍细节/u,
      /护照或其他证件/u,
      /订单或付款资料/u,
      /未经另行同意不会分享给供应商/u,
      /不保证价格、房态、外宾接待、房型、无障碍适用性/u,
    ],
    ko: [
      /최소한의 비민감 정보/u,
      /첫 양식에 아동의 정확한 나이/u,
      /이동·의료·접근성 세부 정보/u,
      /여권이나 신분증/u,
      /예약이나 결제 자료/u,
      /별도 동의 없이는 공급자에게 공유하지 않습니다/u,
      /가격, 객실 가능 여부, 외국인 투숙 가능 여부, 객실 유형, 접근성 적합성/u,
    ],
  };
  for (const [locale, body] of Object.entries(bodies)) {
    const consultation = body.blocks.find((block) => block.id === "consultation-boundary");
    assert.ok(consultation, `${locale} consultation boundary`);
    for (const pattern of privacyAssertions[locale]) {
      assert.match(consultation.body, pattern, `${locale} ${pattern}`);
    }
  }

  assert.match(
    ko.blocks.find((block) => block.id === "decision-matrix").rows[3][1],
    /전시장 이동이 편하지만 저녁 이동이 반복됨/u,
  );
  assert.doesNotMatch(
    JSON.stringify(ko),
    /낮은 편하지만|광저우 동부 쪽|전날 배치|보호된 아침 이동|단순한 검증 교통편/u,
  );
  assert.doesNotMatch(JSON.stringify(en), /recovery owner/iu);
});

test("Canton Fair hero is the documented real licensed photograph", async () => {
  const imageUrl = new URL(`public/images/guides/${slug}/hero-1600.webp`, root);
  const bytes = await readFile(imageUrl);
  const details = await stat(imageUrl);
  const digest = createHash("sha256").update(bytes).digest("hex");
  assert.equal(details.size, 211402);
  assert.equal(
    digest,
    "167940f7194b030288df42868af75c2025d2c2ff9b439a15950d741dbcd630b8",
  );

  const imagePlan = await source(`content/guides/${slug}/image-plan.md`);
  for (const expected of [
    "Tim Wu",
    "2023-07-01 11:18:09",
    "CC BY-SA 4.0",
    "309b422ac77d68bb77f23558eb60413b3c5ef05fe4b21de18942530d6f37ccbe",
    digest,
    "no generation, generative fill or synthetic alteration",
  ]) {
    assert.match(imagePlan, new RegExp(expected, "iu"));
  }
  assert.match(imagePlan, /does not establish a hotel choice/iu);
  assert.match(imagePlan, /No guest record, passport, badge number/iu);
});
