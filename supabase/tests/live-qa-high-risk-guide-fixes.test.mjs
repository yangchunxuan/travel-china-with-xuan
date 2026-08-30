import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const GUIDE_ROOT = "content/guides";
const LOCALES = ["en", "zh", "ko"];
const GUIDE_IDS = [
  "china-public-holidays-travel-calendar",
  "china-hotel-emergency-exit-fire-safety-check",
  "xiamen-hubs-to-gulangyu-ferry-terminal",
  "china-domestic-flight-schedule-change",
  "xian-chengdu-transport-route",
];

async function source(path, encoding = "utf8") {
  return readFile(new URL(`../../${path}`, import.meta.url), encoding);
}

async function bodies(id) {
  return Promise.all(LOCALES.map((locale) => source(`${GUIDE_ROOT}/${id}/body.${locale}.ts`)));
}

function blockSignature(body) {
  return [...body.matchAll(/\{\s*id:\s*"([^"]+)",\s*type:\s*"([^"]+)"/gu)].map(
    ([, id, type]) => `${id}:${type}`,
  );
}

function metadata(path) {
  return source(path).then((value) => JSON.parse(value));
}

function literalPattern(value) {
  return new RegExp(value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"), "u");
}

const FIRST_LINE_SEVEN_DAY_CLAIM = /first-line[^\n]{0,100}(?:airline|issuer)[^\n]{0,100}(?:accepts?|acknowledges?|responds?)[^\n]{0,80}(?:7|seven)[ -]working[ -]days?/iu;
const BLANKET_REGIONAL_CUTOFF = /(?:both (?:Chengdu )?airports|all Hong Kong, Macao and Taiwan flights)[^\n]{0,160}(?:uniform|same|shared)[^\n]{0,80}45(?:-minute| minutes?)[^\n]{0,80}(?:check-in|cutoff)/iu;

test("five Live QA guides preserve EN/ZH/KO block id and type parity", async () => {
  for (const id of GUIDE_IDS) {
    const [en, zh, ko] = await bodies(id);
    const expected = blockSignature(en);
    assert.ok(expected.length > 0, `${id} must expose structured blocks`);
    assert.deepEqual(blockSignature(zh), expected, `${id} ZH block signature`);
    assert.deepEqual(blockSignature(ko), expected, `${id} KO block signature`);
  }
});

test("holiday guide removes the dead MOT citation from body, source log, data and rendered asset", async () => {
  const id = "china-public-holidays-travel-calendar";
  const [en, zh, ko, calendar, log, render, plan, meta, hero] = await Promise.all([
    ...await bodies(id),
    source(`${GUIDE_ROOT}/${id}/holiday-calendar.json`),
    source(`${GUIDE_ROOT}/${id}/source-log.md`),
    source(`${GUIDE_ROOT}/${id}/render-hero.mjs`),
    source(`${GUIDE_ROOT}/${id}/image-plan.md`),
    metadata(`${GUIDE_ROOT}/${id}/metadata.json`),
    source("public/images/guides/china-public-holidays-travel-calendar/hero-1600.webp", null),
  ]);
  const allText = [en, zh, ko, calendar, log, render, plan].join("\n");
  const oldUrl = "https://www.mot.gov.cn/jiaotongyaowen/202601/t20260126_4198781.html";
  const replacement = "https://www.ndrc.gov.cn/fzggw/wld/lichunlin/zyhd/202601/t20260121_1403377.html";

  assert.doesNotMatch(allText, new RegExp(oldUrl.replaceAll(".", "\\."), "u"));
  for (const body of [en, zh, ko]) assert.match(body, new RegExp(replacement, "u"));
  const calendarData = JSON.parse(calendar);
  const springPressure = calendarData.years
    .flatMap((year) => year.documentedPressurePeriods ?? [])
    .find((period) => period.id === "spring-festival-travel-season");
  assert.equal(calendarData.checkedAt, "2026-08-11", "root freshness remains the last whole-calendar review");
  assert.equal(springPressure?.checkedAt, "2026-08-31", "only the replacement Spring Festival source was rechecked");
  assert.match(calendar, /"sourceId": "ndrc-2026-spring-festival-schedule"/u);
  assert.match(log, /Checked at: 2026-08-31/u);
  assert.match(render, /National Development and Reform Commission/u);
  assert.equal(meta.dateModified, "2026-08-31");
  assert.equal(meta.sourceReviewedDate, "2026-08-11");

  const digest = createHash("sha256").update(hero).digest("hex");
  assert.match(plan, new RegExp("Final SHA-256: `" + digest + "`", "u"));
});

test("hotel fire guide calls 119 before any non-delaying staff notification", async () => {
  const id = "china-hotel-emergency-exit-fire-safety-check";
  const [en, zh, ko, log, meta] = await Promise.all([
    ...await bodies(id),
    source(`${GUIDE_ROOT}/${id}/source-log.md`),
    metadata(`${GUIDE_ROOT}/${id}/metadata.json`),
  ]);

  assert.match(en, /Call 119 immediately[\s\S]*Only if it is safe and will not delay[\s\S]*alert hotel staff/u);
  assert.match(zh, /立即拨打 119[\s\S]*只有在安全可行且不会耽误报警、撤离或求救时，再通知酒店员工/u);
  assert.match(ko, /즉시 119에 신고[\s\S]*늦추지 않고 안전하게 할 수 있을 때만 호텔 직원에게도 알리/u);
  assert.match(en, /id: "smoke-actions"[\s\S]{0,160}items: \["Call 119 immediately/u);
  assert.match(zh, /id: "smoke-actions"[\s\S]{0,160}items: \["立即拨打 119/u);
  assert.match(ko, /id: "smoke-actions"[\s\S]{0,160}items: \["즉시 119에 신고/u);
  assert.doesNotMatch(en, /alert 119 or staff/iu);
  assert.doesNotMatch(zh, /按情况联系 119 或酒店员工/u);
  assert.doesNotMatch(ko, /상황에 따라 119나 호텔 직원/u);
  for (const body of [en, zh, ko]) {
    for (const url of [
      "https://js.119.gov.cn/202203/jsxfww-menu-xfyw_c_14fe56261ca24eee8c18.html",
      "https://js.119.gov.cn/202304/jsxfww-menu-gzdt_c_b3e63cdc24684e22bf6e.html",
    ]) {
      const escaped = url.replaceAll(".", "\\.");
      assert.match(body, new RegExp(`${escaped}[\\s\\S]{0,160}reviewedAt: "2026-08-31"`, "u"));
    }
  }
  assert.match(log, /call 119 immediately; notify hotel staff only when/u);
  assert.deepEqual([meta.dateModified, meta.sourceReviewedDate], ["2026-08-31", "2026-08-31"]);
});

test("Xiamen guide sends unverified passport numbers to the manual ticket counter", async () => {
  const id = "xiamen-hubs-to-gulangyu-ferry-terminal";
  const [en, zh, ko, log, meta] = await Promise.all([
    ...await bodies(id),
    source(`${GUIDE_ROOT}/${id}/source-log.md`),
    metadata(`${GUIDE_ROOT}/${id}/metadata.json`),
  ]);

  assert.match(en, /cannot be verified online[\s\S]*original passport[\s\S]*manual ticket counter[\s\S]*ticket collection/u);
  assert.match(zh, /无法在线核验[\s\S]*护照原件[\s\S]*人工售票处[\s\S]*取票/u);
  assert.match(ko, /온라인으로 확인할 수 없다면[\s\S]*여권 원본[\s\S]*현장 유인 매표소[\s\S]*승선권을 수령/u);
  assert.doesNotMatch(en, /official channel confirms|approval as unfinished/iu);
  assert.doesNotMatch(zh, /官方渠道确认|视为未完成/u);
  assert.doesNotMatch(ko, /공식 채널이 승인|미완료로 봅니다/u);
  assert.match(log, /manual ticket counter for verification and ticket collection/u);
  assert.match(en, /Passport handling rechecked August 31, 2026; advance sales and check-in checked August 13, 2026/u);
  assert.match(zh, /护照核验于2026年8月31日复核；预售与检票规则核验于2026年8月13日/u);
  assert.match(ko, /여권 확인은 2026년 8월 31일 재검토, 사전 판매·검표 규정은 2026년 8월 13일 확인/u);
  for (const body of [en, zh, ko]) {
    assert.match(body, /xwzx\/zxgg\/32338\.htm"[^\n]{0,160}reviewedAt: "2026-08-13"/u);
    assert.match(body, /wshlk\/chch\/index\.htm"[^\n]{0,160}reviewedAt: "2026-08-13"/u);
  }
  assert.deepEqual([meta.dateModified, meta.sourceReviewedDate], ["2026-08-31", "2026-08-13"]);
});

test("flight complaint guide separates first-line cases from CAAC Consumer Affairs Center clocks", async () => {
  const id = "china-domestic-flight-schedule-change";
  const [en, zh, ko, dynamic, log, meta] = await Promise.all([
    ...await bodies(id),
    source(`${GUIDE_ROOT}/${id}/dynamic-facts.md`),
    source(`${GUIDE_ROOT}/${id}/source-log.md`),
    metadata(`${GUIDE_ROOT}/${id}/metadata.json`),
  ]);

  assert.match(en, /does not apply the 12326 Center's seven-working-day acceptance clock to a first-line airline or issuer case/u);
  assert.match(zh, /消费者事务中心的7个工作日受理决定期限，不适用于一线航司或出票方工单/u);
  assert.match(ko, /7영업일 접수 결정 기한을 1차 항공사·발권처 케이스에 적용하지 않습니다/u);
  for (const body of [en, zh, ko]) {
    assert.match(body, /12326/u);
  }
  assert.match(en, /Acceptance is decided within seven working days; respondents post results within ten working days of referral/u);
  assert.match(zh, /中心7个工作日内决定是否受理；被投诉人10个工作日内在平台回复处理结果/u);
  assert.match(ko, /센터는 7영업일 내 수용 여부를 결정하고, 피신청인은 회부 후 10영업일 내 결과를 게시/u);
  assert.doesNotMatch([en, zh, ko, dynamic].join("\n"), /first-line ack|Give first lines their regulatory room|7天内答复是否受理|7일 내 수용 여부 회신/iu);
  assert.match(dynamic, /No uniform seven-day acceptance clock is asserted for those first-line cases/u);
  assert.match(log, /Center's seven-working-day clock is not assigned to the first-line airline or issuer case/u);
  assert.doesNotMatch([en, zh, ko, dynamic, log].join("\n"), FIRST_LINE_SEVEN_DAY_CLAIM,
    "a first-line airline or issuer must never inherit the Center's seven-working-day acceptance clock");
  assert.deepEqual([meta.dateModified, meta.sourceReviewedDate], ["2026-08-31", "2026-08-31"]);
});

test("Xi'an–Chengdu guide freezes the full 12306 exception and Chengdu airport exception", async () => {
  const id = "xian-chengdu-transport-route";
  const [en, zh, ko, dynamic, log, meta] = await Promise.all([
    ...await bodies(id),
    source(`${GUIDE_ROOT}/${id}/dynamic-facts.md`),
    source(`${GUIDE_ROOT}/${id}/source-log.md`),
    metadata(`${GUIDE_ROOT}/${id}/metadata.json`),
  ]);

  const all = [en, zh, ko, dynamic, log].join("\n");
  for (const token of [
    "registered user",
    "electronic- or points-paid",
    "for travel on or after 2 February 2026",
    "Hong Kong West Kowloon",
    "within 30 minutes",
    "at least four hours",
    "one qualifying order per calendar day",
    "Changed tickets",
    "period or ride-count",
    "reservation and waitlist",
    "air–rail or water–rail",
    "group tickets",
    "Railway e-Pass",
  ]) assert.match(en, literalPattern(token), `EN missing ${token}`);
  for (const token of [
    "注册用户",
    "电子支付或积分支付",
    "2026年2月2日",
    "香港西九龙",
    "30分钟内",
    "4小时以上",
    "每个自然日限1个",
    "改签票",
    "计次·定期票",
    "预约票",
    "候补票",
    "空铁/水铁联运票",
    "团体票",
    "铁路e卡通",
  ]) assert.match(zh, literalPattern(token), `ZH missing ${token}`);
  for (const token of [
    "등록 사용자",
    "전자결제 또는 포인트",
    "승차일이 2026년 2월 2일 이후(당일 포함)",
    "홍콩서구룡",
    "30분 이내",
    "4시간 이상",
    "자연일 기준 1개",
    "변경표",
    "횟수권·정기권",
    "예약·대기 구매",
    "항공–철도/수상–철도",
    "단체표",
    "철도 e카드",
  ]) assert.match(ko, literalPattern(token), `KO missing ${token}`);
  assert.doesNotMatch(all, /more than four hours|超过4小时|4시간을 초과/iu);
  assert.match(en, /From 30 July 2026[\s\S]*some Hong Kong, Macao and Taiwan flights[\s\S]*both airports now handle/u);
  assert.match(zh, /自2026年7月30日起[\s\S]*部分港澳台地区航班[\s\S]*双流和天府两场/u);
  assert.match(ko, /2026년 7월 30일부터[\s\S]*일부 홍콩·마카오·대만 노선[\s\S]*두 공항 모두/u);
  assert.doesNotMatch(all, BLANKET_REGIONAL_CUTOFF,
    "the partial regional-flight move cannot become one shared cutoff across both airports");
  assert.doesNotMatch(all, /两场[^\n]{0,80}(?:统一|相同)[^\n]{0,40}45分钟[^\n]{0,40}(?:截载|值机)/u);
  assert.doesNotMatch(all, /두 공항[^\n]{0,80}(?:동일|일률)[^\n]{0,40}45분[^\n]{0,40}(?:마감|체크인)/u);
  assert.match(all, /orderWarmTips\.html\?hiddenNav=true&tabIndex=6/u);
  assert.match(all, /cdairport\.com\/news_detail\.aspx\?cid=6393&page=1&t=60/u);
  assert.match(en, /Refund and regional-flight corrections rechecked 31 August 2026; remaining sources checked 22–23 August 2026/u);
  assert.match(zh, /退票与地区航班修正于2026年8月31日复核；其余来源核验于2026年8月22至23日/u);
  assert.match(ko, /환불·지역 항공편 수정은 2026년 8월 31일 재검토, 나머지 출처는 2026년 8월 22~23일 확인/u);
  assert.match(dynamic, /The mistaken-purchase refund and Chengdu regional-flight rows were rechecked 2026-08-31,[\s\S]*unaffected rows retain their earlier review basis/u);
  assert.match(log, /All retrieval timestamps are 2026-08-22[\s\S]*two[\s\S]*correction sources below were retrieved 2026-08-31/u);
  assert.deepEqual([meta.dateModified, meta.sourceReviewedDate], ["2026-08-31", "2026-08-23"]);
});

function fingerprintFailures(samples) {
  const failures = [];
  if (/mot\.gov\.cn\/jiaotongyaowen\/202601\/t20260126_4198781/u.test(samples.holiday) ||
      !/ndrc\.gov\.cn\/fzggw\/wld\/lichunlin\/zyhd\/202601\/t20260121_1403377/u.test(samples.holiday)) failures.push("holiday-source");
  if (!/Call 119 immediately[\s\S]*Only if it is safe and will not delay[\s\S]*alert hotel staff/u.test(samples.fire)) failures.push("fire-order");
  if (/official channel confirms|approval as unfinished/iu.test(samples.xiamen) ||
      !/original passport[\s\S]*manual ticket counter[\s\S]*ticket collection/u.test(samples.xiamen)) failures.push("xiamen-passport");
  if (/Give first lines their regulatory room|acknowledgement within seven days/iu.test(samples.flight) ||
      FIRST_LINE_SEVEN_DAY_CLAIM.test(samples.flight) ||
      !/does not apply the 12326 Center's seven-working-day acceptance clock/u.test(samples.flight)) failures.push("flight-escalation");
  const xianRequired = [
    /registered user/u,
    /electronic- or points-paid/u,
    /for travel on or after 2 February 2026/u,
    /Hong Kong West Kowloon/u,
    /within 30 minutes/u,
    /at least four hours/u,
    /period or ride-count/u,
    /air–rail or water–rail/u,
    /Railway e-Pass/u,
    /From 30 July 2026[\s\S]*some Hong Kong, Macao and Taiwan flights/u,
  ];
  if (xianRequired.some((pattern) => !pattern.test(samples.xian)) || /more than four hours/iu.test(samples.xian)) failures.push("xian-conditions");
  if (BLANKET_REGIONAL_CUTOFF.test(samples.xian)) failures.push("xian-airport-boundary");
  return failures;
}

test("fingerprint assertions fail closed under one mutation for every Live QA issue", async () => {
  const [holiday, fire, xiamen, flight, xian] = await Promise.all([
    source(`${GUIDE_ROOT}/china-public-holidays-travel-calendar/body.en.ts`),
    source(`${GUIDE_ROOT}/china-hotel-emergency-exit-fire-safety-check/body.en.ts`),
    source(`${GUIDE_ROOT}/xiamen-hubs-to-gulangyu-ferry-terminal/body.en.ts`),
    source(`${GUIDE_ROOT}/china-domestic-flight-schedule-change/body.en.ts`),
    source(`${GUIDE_ROOT}/xian-chengdu-transport-route/body.en.ts`),
  ]);
  const baseline = { holiday, fire, xiamen, flight, xian };
  assert.deepEqual(fingerprintFailures(baseline), []);

  const mutations = [
    ["holiday-source", { ...baseline, holiday: holiday.replace("https://www.ndrc.gov.cn/fzggw/wld/lichunlin/zyhd/202601/t20260121_1403377.html", "https://www.mot.gov.cn/jiaotongyaowen/202601/t20260126_4198781.html") }],
    ["fire-order", { ...baseline, fire: fire.replace("Call 119 immediately", "Alert hotel staff first") }],
    ["xiamen-passport", { ...baseline, xiamen: xiamen.replace("take the original passport to a manual ticket counter for document verification and ticket collection", "wait until the official channel confirms approval") }],
    ["flight-escalation", { ...baseline, flight: `${flight}\nGive first lines their regulatory room — acknowledgement within seven days.` }],
    ["flight-escalation", { ...baseline, flight: `${flight}\nA first-line airline/issuer accepts the case within 7 working days.` }],
    ["xian-conditions", { ...baseline, xian: xian.replaceAll("at least four hours", "more than four hours") }],
    ["xian-conditions", { ...baseline, xian: xian.replaceAll("Railway e-Pass", "removed exclusion") }],
    ["xian-conditions", { ...baseline, xian: xian.replaceAll("registered user", "traveller") }],
    ["xian-airport-boundary", { ...baseline, xian: `${xian}\nBoth Chengdu airports use a uniform 45-minute check-in cutoff for all Hong Kong, Macao and Taiwan flights.` }],
  ];
  for (const [expected, mutated] of mutations) {
    assert.ok(fingerprintFailures(mutated).includes(expected), `${expected} mutation must fail closed`);
  }
});
