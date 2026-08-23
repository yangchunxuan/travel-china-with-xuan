import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "../..");
const locales = ["en", "zh", "ko"];

async function source(relativePath) {
  return readFile(path.join(projectRoot, relativePath), "utf8");
}

async function localizedBodies(slug) {
  return Object.fromEntries(await Promise.all(locales.map(async (locale) => [
    locale,
    await source(`content/guides/${slug}/body.${locale}.ts`),
  ])));
}

function blockSignature(text) {
  return [...text.matchAll(/\{\s*id:\s*"([^"]+)"\s*,\s*type:\s*"([^"]+)"/gu)]
    .map((match) => `${match[1]}:${match[2]}`);
}

async function assertTrilingualStructure(slug) {
  const bodies = await localizedBodies(slug);
  assert.deepEqual(blockSignature(bodies.en), blockSignature(bodies.zh), `${slug}/zh structure`);
  assert.deepEqual(blockSignature(bodies.en), blockSignature(bodies.ko), `${slug}/ko structure`);
  return bodies;
}

test("flight complaints distinguish direct handling from CAAC escalation", async () => {
  const bodies = await assertTrilingualStructure("china-domestic-flight-schedule-change");
  assert.match(bodies.en, /prompt acceptance[\s\S]*within 10 working days[\s\S]*do not set a separate seven-day first-line acceptance period/iu);
  assert.match(bodies.zh, /及时受理[\s\S]*10个工作日内[\s\S]*没有统一的“7天内答复是否受理”期限/u);
  assert.match(bodies.ko, /지체 없이 접수[\s\S]*10영업일 이내[\s\S]*별도의 7일 접수 판단 기한/u);
  for (const body of Object.values(bodies)) {
    assert.match(body, /https:\/\/www\.caac\.gov\.cn\/XXGK\/XXGK\/MHGZ\/202103\/t20210315_206814\.html/u);
    assert.match(body, /https:\/\/www\.caac\.gov\.cn\/INDEX\/HLFW\/HKLXCS\/202303\/t20230316_217603\.html/u);
  }
});

test("Xi'an–Chengdu guide preserves the narrow 12306 exception and current airport split", async () => {
  const bodies = await assertTrilingualStructure("xian-chengdu-transport-route");
  for (const body of Object.values(bodies)) {
    assert.match(body, /id: "accidental-refund"/u);
    assert.match(body, /https:\/\/www\.12306\.cn\/en\/faq\.html/u);
    assert.match(body, /https:\/\/mobile\.12306\.cn\/otsmobile\/h5\/otsbussiness\/info\/orderWarmTips\.html\?hiddenNav=true&tabIndex=6/u);
    assert.match(body, /https:\/\/www\.cdairport\.com\/news_detail\.aspx\?cid=6393&page=1&t=60/u);
  }
  assert.match(bodies.en, /does not remove station access, security or the arrival walk/iu);
  assert.match(bodies.en, /within 30 minutes of purchase and at least four hours before departure/iu);
  assert.match(bodies.zh, /购票后30分钟内且开车前至少4小时/u);
  assert.match(bodies.ko, /구매 후 30분 이내이면서 출발 4시간 전/u);
  assert.match(bodies.en, /30 July 2026[\s\S]*Hong Kong, Macao and Taiwan/iu);
  assert.match(bodies.zh, /自2026年7月30日起[\s\S]*港澳台/u);
  assert.match(bodies.ko, /2026년 7월 30일부터[\s\S]*홍콩·마카오·대만/u);
});

test("hotel smoke and fire instructions put emergency calling before hotel notification", async () => {
  const bodies = await assertTrilingualStructure("china-hotel-emergency-exit-fire-safety-check");
  assert.match(bodies.en, /Call 119 first; when it is safe to do so, notify hotel staff/iu);
  assert.match(bodies.zh, /先拨打119；在确保安全的情况下再通知酒店员工/u);
  assert.match(bodies.ko, /먼저 119에 신고하고, 안전할 때 호텔 직원에게 알린/u);
});

test("Xiamen passport exceptions use staffed-window verification and collection", async () => {
  const bodies = await assertTrilingualStructure("xiamen-hubs-to-gulangyu-ferry-terminal");
  assert.match(bodies.en, /original passport to a staffed ticket window for on-site verification and ticket collection/iu);
  assert.match(bodies.zh, /携带护照原件到人工售票(?:处|窗口)现场核验并取票/u);
  assert.match(bodies.ko, /여권 원본을 가지고 유인 매표소에서 현장 확인 후 표를 수령/u);
  for (const body of Object.values(bodies)) {
    assert.doesNotMatch(body, /background approval|后台审核|백그라운드 승인/iu);
  }
});

test("Spring Festival transport evidence uses the live Ministry of Transport source", async () => {
  const slug = "china-public-holidays-travel-calendar";
  const bodies = await assertTrilingualStructure(slug);
  const dataset = await source(`content/guides/${slug}/holiday-calendar.json`);
  const combined = `${Object.values(bodies).join("\n")}\n${dataset}`;
  assert.match(combined, /https:\/\/xxgk\.mot\.gov\.cn\/2020\/jigou\/ysfws\/202601\/t20260124_4198706\.html/u);
  assert.doesNotMatch(combined, /https:\/\/www\.mot\.gov\.cn\/jiaotongyaowen\/202601\/t20260126_4198781\.html/u);
  const calendar = JSON.parse(dataset);
  assert.equal(calendar.checkedAt, "2026-08-11");
  assert.equal(calendar.years.find(({ year }) => year === 2027)?.checkedAt, "2026-08-23");
});

test("Zhangjiajie public citations replace the retired airport and TLS-broken route sources", async () => {
  const hub = await source("content/destinations/zhangjiajie/body.shared.ts");
  assert.match(hub, /https:\/\/www\.hunanairport\.cn\/content\/zjjAirPort\.html/u);

  const publicSourceSurfaces = await Promise.all([
    hub,
    ...(await Promise.all(locales.map((locale) =>
      source(`content/guides/zhangjiajie-city-or-wulingyuan-hotel-base/body.${locale}.ts`)
    ))),
    await source("lib/zhangjiajieGuide.ts"),
    await source("lib/zhangjiajiePrivateTourPreview.ts"),
  ]);
  const combined = publicSourceSurfaces.join("\n");
  assert.doesNotMatch(combined, /t20151130_11065\.html/u);
  assert.doesNotMatch(combined, /zhangjiajieuggp\.org\.cn\/html\/2026\/2026032620(?:135033852|161311924)\.html/u);
  assert.match(combined, /whhlyt\.hunan\.gov\.cn/u);
});

test("Silk Road guide separates airport identity from a date-specific nonstop flight", async () => {
  const bodies = await assertTrilingualStructure("xian-lanzhou-dunhuang-silk-road-route");
  assert.match(bodies.en, /confirms that Dunhuang has an airport[\s\S]*nonstop Lanzhou–Dunhuang passenger flight operates on your date[\s\S]*confirm it with the airline/iu);
  assert.match(bodies.zh, /证明敦煌有机场[\s\S]*不能证明你的出行日一定有兰州—敦煌直飞客运航班[\s\S]*向航空公司核实/u);
  assert.match(bodies.ko, /둔황에 공항이 있다는 사실[\s\S]*여행 날짜에 란저우–둔황 직항 여객편[\s\S]*항공사에서 확인/u);
});

test("Forbidden City guide publishes the current Gate of Supreme Harmony diversion", async () => {
  const bodies = await assertTrilingualStructure("forbidden-city-for-foreign-visitors");
  for (const body of Object.values(bodies)) {
    assert.match(body, /id: "gate-conservation-notice"/u);
    assert.match(body, /https:\/\/www\.dpm\.org\.cn\/announce_detail\/379422\.html/u);
  }
  assert.match(bodies.en, /closed for conservation work since 3 August 2026/iu);
  assert.match(bodies.zh, /太和门自2026年8月3日起封闭施工/u);
  assert.match(bodies.ko, /태화문은 2026년 8월 3일부터 보수 공사로 폐쇄/u);
  assert.equal(blockSignature(bodies.en).length, 52);
});

test("the Live QA reader-facing cohort does not expose editorial governance terms", async () => {
  const destinationFiles = ["beijing", "chengdu", "guangzhou", "shanghai", "xian"]
    .flatMap((city) => locales.map((locale) => `content/destinations/${city}/body.${locale}.ts`));
  const files = [
    ...destinationFiles,
    "content/destinations/hangzhou/body.shared.ts",
    "content/destinations/zhangjiajie/body.shared.ts",
    "content/guides/china-online-arrival-card/body.en.ts",
    "content/guides/guilin-airport-or-railway-station-arrival-guide/body.en.ts",
    "content/guides/longji-rice-terraces-day-trip-or-overnight/body.en.ts",
    "content/guides/maijishan-grottoes-cliff-walk-visit/body.en.ts",
    "content/guides/shenzhen-airport-railway-station-border-port-selector/body.en.ts",
    "content/guides/zhangjiajie-national-forest-park-tickets-and-entrances/body.en.ts",
    "lib/firstTripTenCityMapI18n.ts",
  ];
  const combined = (await Promise.all(files.map(source))).join("\n");
  assert.doesNotMatch(
    combined,
    /canonical (?:owner|boundary)|controlling owner|existing owner|city-pair owner|route owner|itinerary owner|its own owner|destination hub|link this canonical page/iu,
  );
});

test("all five corrected owners separate modification dates from full-source review dates", async () => {
  const expectedReviewDates = {
    "china-domestic-flight-schedule-change": "2026-08-22",
    "xian-chengdu-transport-route": "2026-08-23",
    "china-hotel-emergency-exit-fire-safety-check": "2026-08-13",
    "xiamen-hubs-to-gulangyu-ferry-terminal": "2026-08-13",
    "china-public-holidays-travel-calendar": "2026-08-11",
  };
  for (const [slug, expectedReviewDate] of Object.entries(expectedReviewDates)) {
    const metadata = JSON.parse(await source(`content/guides/${slug}/metadata.json`));
    assert.equal(metadata.dateModified, "2026-08-23", `${slug} dateModified`);
    assert.equal(metadata.sourceReviewedDate, expectedReviewDate, `${slug} sourceReviewedDate`);
  }
});
