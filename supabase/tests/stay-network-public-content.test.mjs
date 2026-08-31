import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(here, "../..");
const read = (path) => readFile(resolve(repositoryRoot, path), "utf8");

const networkOwnerSlugs = [
  "china-hotel-near-metro",
  "china-accessible-hotel-room-verification",
  "foreigners-china-hotel",
  "china-last-night-before-international-flight",
];

const ctaBoundaryByLocale = {
  en: [
    /initial form/u,
    /do not submit children's ages, mobility, medical or accessibility details, passport or other document information, booking or payment records/iu,
    /separate human follow-up/u,
    /separate, purpose-specific consent/u,
  ],
  zh: [
    /初始表单/u,
    /不要提交儿童具体年龄、行动、医疗或无障碍细节、护照或其他证件资料、订单或付款记录/u,
    /另行安排人工跟进/u,
    /未经另行、针对明确目的的同意/u,
  ],
  ko: [
    /초기 양식/u,
    /어린이의 구체적인 나이, 이동·의료·접근성 세부 정보, 여권이나 기타 신분증 정보, 예약·결제 기록/u,
    /별도의 후속 상담/u,
    /별도의 목적별 동의/u,
  ],
};

const ctaGuaranteeByLocale = {
  en: [
    /not live inventory/iu,
    /guarantee[^"\n]*price/iu,
    /guarantee[^"\n]*availability/iu,
    /guarantee[^"\n]*(?:foreign-)?guest acceptance/iu,
    /guarantee[^"\n]*room type/iu,
    /guarantee[^"\n]*accessibility/iu,
  ],
  zh: [
    /不是实时库存/u,
    /不保证[^"\n]*价格/u,
    /不保证[^"\n]*房态/u,
    /不保证[^"\n]*(?:外宾|外国旅客)接待/u,
    /不保证[^"\n]*房型/u,
    /不保证[^"\n]*无障碍适用性/u,
  ],
  ko: [
    /실시간 재고가 아니/u,
    /가격[^"\n]*보장하지 않습니다/u,
    /객실 가능 여부[^"\n]*보장하지 않습니다/u,
    /외국인 투숙[^"\n]*보장하지 않습니다/u,
    /객실 유형[^"\n]*보장하지 않습니다/u,
    /접근성[^"\n]*보장하지 않습니다/u,
  ],
};

const legacyDirectSubmissionPatterns = [
  /For a human comparison of a shortlist, send/u,
  /Send the travel dates; traveller/u,
  /organise a supplier-neutral enquiry/u,
  /请提供旅行日期、人数、房间/u,
  /可以提供旅行日期、人数、房间/u,
  /协助组织供应商中立的询价/u,
  /어린이 나이[^"\n]*보내 주세요/u,
  /공급업체에 치우치지 않은 문의/u,
];

function assertCtaBoundary(source, locale, label) {
  for (const pattern of ctaBoundaryByLocale[locale]) {
    assert.match(source, pattern, `${label} must state ${pattern}`);
  }
  for (const pattern of ctaGuaranteeByLocale[locale]) {
    assert.match(source, pattern, `${label} must state ${pattern}`);
  }
  for (const pattern of legacyDirectSubmissionPatterns) {
    assert.doesNotMatch(source, pattern, `${label} retains unsafe direct-submission copy`);
  }
}

function extractBlockText(source, id, field = "body") {
  const start = source.indexOf(`id: "${id}"`);
  assert.notEqual(start, -1, `${id} block missing`);
  const match = source.slice(start, start + 5000)
    .match(new RegExp(`${field}:\\s*"([^"]*)"`, "u"));
  assert.ok(match, `${id}.${field} string missing`);
  return match[1];
}

function blockSignature(source) {
  return [...source.matchAll(/\{\s*id:\s*"([^"]+)"\s*,\s*type:\s*"([^"]+)"/gu)]
    .map((match) => `${match[1]}:${match[2]}`);
}

test("all 41 public stay handoff files enforce the initial-form privacy boundary", async () => {
  let checkedFiles = 0;

  for (const city of ["beijing", "shanghai", "xian", "chengdu", "guangzhou", "chongqing"]) {
    for (const locale of ["en", "zh", "ko"]) {
      const path = `content/destinations/${city}/body.${locale}.ts`;
      const source = await read(path);
      assertCtaBoundary(extractBlockText(source, "stay-quote-handoff"), locale, path);
      checkedFiles += 1;
    }
  }

  for (const city of ["hangzhou", "zhangjiajie"]) {
    const path = `content/destinations/${city}/body.shared.ts`;
    const source = await read(path);
    const quoteBodies = [...source.matchAll(/quoteBody:\s*"([^"]*)"/gu)]
      .map((match) => match[1]);
    assert.equal(quoteBodies.length, 3, `${path} localized quote bodies`);
    for (const [index, locale] of ["en", "zh", "ko"].entries()) {
      assertCtaBoundary(quoteBodies[index], locale, `${path}/${locale}`);
    }
    checkedFiles += 1;
  }

  for (const owner of [
    "shanghai-where-to-stay-first-trip",
    "xian-where-to-stay-city-wall-or-dayanta",
    "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba",
    "shenzhen-where-to-stay-futian-luohu-nanshan",
    "zhangjiajie-city-or-wulingyuan-hotel-base",
    "foreigners-china-hotel",
    "china-last-night-before-international-flight",
  ]) {
    for (const locale of ["en", "zh", "ko"]) {
      const path = `content/guides/${owner}/body.${locale}.ts`;
      const source = await read(path);
      const id = owner === "zhangjiajie-city-or-wulingyuan-hotel-base"
        ? "consult"
        : owner === "foreigners-china-hotel"
          ? "light-help"
          : owner === "china-last-night-before-international-flight"
            ? "human-help-text"
            : "stay-quote-handoff";
      const field = owner === "china-last-night-before-international-flight" ? "text" : "body";
      assertCtaBoundary(extractBlockText(source, id, field), locale, path);
      checkedFiles += 1;
    }
  }

  assert.equal(checkedFiles, 41);

  const boundary = await read("docs/stay-network/inquiry-and-supplier-boundary.md");
  assert.match(boundary, /The initial general form must not ask for or invite/u);
  assert.match(boundary, /submitting the initial form is never that\s+consent/u);
  assert.match(boundary, /does\s+not add any of those runtime capabilities/u);
});

test("the destination registry retains eight published Hubs and truthful dates", async () => {
  const registry = await read("lib/destinationHubs.ts");
  const expected = {
    beijing: { modified: "2026-08-22", reviewed: "2026-08-22" },
    shanghai: { modified: "2026-08-22", reviewed: "2026-08-22" },
    xian: { modified: "2026-08-21", reviewed: "2026-08-16" },
    chengdu: { modified: "2026-08-22", reviewed: "2026-08-22" },
    guangzhou: { modified: "2026-08-21", reviewed: "2026-08-17" },
    hangzhou: { modified: "2026-08-21", reviewed: "2026-08-20" },
    zhangjiajie: { modified: "2026-08-21", reviewed: "2026-08-20" },
    chongqing: { modified: "2026-08-21", reviewed: "2026-08-21" },
  };
  assert.match(
    registry,
    /export const destinationHubIds = \[\s*"beijing",\s*"shanghai",\s*"xian",\s*"chengdu",\s*"guangzhou",\s*"hangzhou",\s*"zhangjiajie",\s*"chongqing",\s*\] as const;/u,
  );
  for (const [id, dates] of Object.entries(expected)) {
    const start = registry.indexOf(`id: "${id}"`);
    assert.notEqual(start, -1, `${id} registry entry missing`);
    const header = registry.slice(start, start + 700);
    assert.match(header, /datePublished: "2026-08-(16|17|20|21)"/, `${id} must remain published`);
    assert.match(header, new RegExp(`dateModified: "${dates.modified}"`), `${id} modified date`);
    assert.match(header, new RegExp(`sourceReviewedDate: "${dates.reviewed}"`), `${id} source date`);
  }
});

test("six locale-specific Hub bodies keep parity and supplier-neutral handoffs", async () => {
  for (const city of ["beijing", "shanghai", "xian", "chengdu", "guangzhou", "chongqing"]) {
    const localeSources = {};
    for (const locale of ["en", "zh", "ko"]) {
      const source = await read(`content/destinations/${city}/body.${locale}.ts`);
      localeSources[locale] = source;
      assert.match(source, /id:\s*"stay-quote-handoff"/u, `${city}/${locale} handoff`);
      assert.match(source, /\/#planner-contact/u, `${city}/${locale} human route`);
      for (const slug of networkOwnerSlugs) {
        const prefix = locale === "en" ? "" : `/${locale}`;
        assert.match(source, new RegExp(`href:\\s*"${prefix}/guides/${slug}/"`, "u"));
      }
    }
    assert.deepEqual(blockSignature(localeSources.en), blockSignature(localeSources.zh));
    assert.deepEqual(blockSignature(localeSources.en), blockSignature(localeSources.ko));
  }
});

test("Hangzhou and Zhangjiajie shared bodies carry three localized stay handoffs", async () => {
  for (const city of ["hangzhou", "zhangjiajie"]) {
    const source = await read(`content/destinations/${city}/body.shared.ts`);
    assert.match(source, /id:\s*"stay-owners"/u);
    assert.match(source, /id:\s*"stay-quote-handoff"/u);
    for (const slug of networkOwnerSlugs) {
      assert.equal(source.match(new RegExp(`"${slug}"`, "gu"))?.length, 3);
    }
  }
});

test("five city stay owners keep locale parity, links and factual review dates", async () => {
  const owners = {
    "shanghai-where-to-stay-first-trip": {
      modified: "2026-08-21",
      reviewed: "2026-08-12",
    },
    "xian-where-to-stay-city-wall-or-dayanta": {
      modified: "2026-09-01",
      reviewed: "2026-08-12",
    },
    "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba": {
      modified: "2026-08-21",
      reviewed: "2026-08-12",
    },
    "shenzhen-where-to-stay-futian-luohu-nanshan": {
      modified: "2026-08-21",
      reviewed: "2026-08-13",
    },
    "zhangjiajie-city-or-wulingyuan-hotel-base": {
      modified: "2026-08-21",
      reviewed: "2026-08-13",
    },
  };
  for (const [owner, expectedDates] of Object.entries(owners)) {
    const localeSources = {};
    for (const locale of ["en", "zh", "ko"]) {
      const source = await read(`content/guides/${owner}/body.${locale}.ts`);
      localeSources[locale] = source;
      assert.match(
        source,
        owner.startsWith("zhangjiajie-") ? /id:\s*"consult"/u : /id:\s*"stay-quote-handoff"/u,
      );
      for (const slug of networkOwnerSlugs) {
        const prefix = locale === "en" ? "" : `/${locale}`;
        assert.match(source, new RegExp(`href:\\s*"${prefix}/guides/${slug}/"`, "u"));
      }
    }
    assert.deepEqual(blockSignature(localeSources.en), blockSignature(localeSources.zh));
    assert.deepEqual(blockSignature(localeSources.en), blockSignature(localeSources.ko));
    const metadata = JSON.parse(await read(`content/guides/${owner}/metadata.json`));
    assert.equal(metadata.dateModified, expectedDates.modified);
    assert.equal(metadata.sourceReviewedDate, expectedDates.reviewed);
  }
});

test("nationwide owners preserve complete versus partial source reviews", async () => {
  const foreigners = JSON.parse(await read("content/guides/foreigners-china-hotel/metadata.json"));
  const accessible = JSON.parse(await read("content/guides/china-accessible-hotel-room-verification/metadata.json"));
  const lastNight = JSON.parse(await read("content/guides/china-last-night-before-international-flight/metadata.json"));
  const lastNightLog = await read("content/guides/china-last-night-before-international-flight/source-log.md");

  assert.deepEqual([foreigners.dateModified, foreigners.sourceReviewedDate], ["2026-08-21", "2026-08-20"]);
  assert.deepEqual([accessible.dateModified, accessible.sourceReviewedDate], ["2026-08-21", "2026-08-20"]);
  assert.deepEqual([lastNight.dateModified, lastNight.sourceReviewedDate], ["2026-08-21", "2026-08-11"]);
  assert.match(lastNightLog, /not a page-complete factual re-review/u);
});

test("the foreign-hotel Chinese title keeps semantic phrases together", async () => {
  const component = await read("components/content/EditorialGuidePage.tsx");

  assert.match(component, /"foreigners-china-hotel": \[/u);
  for (const segment of [
    "外国人可以",
    "入住中国",
    "任何酒店吗？",
    "预订、住宿登记",
    "与被拒后的处理",
  ]) {
    assert.match(component, new RegExp(`"${segment}"`, "u"));
  }
  assert.match(component, /className=\{styles\.keepTogether\}/u);
});
