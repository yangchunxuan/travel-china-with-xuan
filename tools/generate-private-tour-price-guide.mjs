// Generates the guide china-private-tour-prices from the product data, so
// every price in it matches the tour pages. After changing a private-tour
// price, adding a tour or removing one, run from the repo root:
//   node --experimental-strip-types --no-warnings tools/generate-private-tour-price-guide.mjs --write
// supabase/tests/private-tour-price-guide.test.mjs fails when the guide files are stale.
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
const ROOT = path.resolve(import.meta.dirname, "..");
const { privateTourProducts, localizePrivateTourProduct } = await import(path.join(ROOT, "lib/privateTourProducts.ts"));
const { privateTourPublishedPriceNote } = await import(path.join(ROOT, "lib/privateTourCurrencyNote.ts"));

const ID = "china-private-tour-prices";
const TODAY = "2026-10-11";
const L = ["en", "zh", "ko"];
const HERO_SLUG = "beijing-xian-shanghai-8-day-private-tour";
const tourHref = (loc, slug) => `${loc === "en" ? "" : `/${loc}`}/tours/${slug}/`;
const hubHref = (loc) => `${loc === "en" ? "" : `/${loc}`}/tours/`;
const guideHref = (loc, id) => `${loc === "en" ? "" : `/${loc}`}/guides/${id}/`;
const fmt = (loc, n) => (loc === "en" ? `USD ${n.toLocaleString("en-US")}` : loc === "zh" ? `¥${n.toLocaleString("en-US")}` : `₩${n.toLocaleString("en-US")}`);
const range = (loc, low, high) => (low === high ? fmt(loc, low) : `${fmt(loc, low)}–${high.toLocaleString("en-US")}`);
const perDay = (loc, amount, days) => (loc === "en" ? Math.round(amount / days) : loc === "zh" ? Math.round(amount / days / 10) * 10 : Math.round(amount / days / 1000) * 1000);
const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
};

// The route name is the tour title without its length and format.
function routeName(loc, title) {
  const match = loc === "en" ? /^(.*?):\s/u.exec(title) : loc === "zh" ? /^(.*?)\s*\d+\s*天/u.exec(title) : /^(.*?)\s*\d+일/u.exec(title);
  if (!match?.[1]) throw new Error(`cannot read the route name from "${title}"`);
  return match[1].trim();
}

// Every private tour with a published price. Small-group departures have
// their own guide (china-small-group-tours-2027).
const tours = privateTourProducts
  .filter((product) => product.tourFormat !== "small-group")
  .map((product) => ({ product, localized: Object.fromEntries(L.map((loc) => [loc, localizePrivateTourProduct(product, loc)])) }))
  .filter(({ localized }) => localized.en.packages.some((tourPackage) => tourPackage.rows.length > 0));
if (tours.length < 30) throw new Error(`expected at least 30 priced private tours, found ${tours.length}`);

const seasonal = (tour) => tour.product.packages.some((tourPackage) => tourPackage.id === "low-season");
const band = (tour) => (seasonal(tour) ? "winter" : tour.product.days <= 5 ? "short" : tour.product.days <= 9 ? "mid" : "long");
const BANDS = ["short", "mid", "long", "winter"];

/** One line of a price table: a tour, or one of its service options or seasons. */
function lines(loc, tour) {
  const product = tour.localized[loc];
  const priced = product.packages.filter((tourPackage) => tourPackage.rows.length > 0);
  return priced.map((tourPackage) => ({
    tour,
    name: routeName(loc, product.title),
    option: priced.length > 1 ? tourPackage.label : "",
    days: tour.product.days,
    nights: tour.product.nights,
    price: (travelers) => tourPackage.rows.find((row) => row.travelers === travelers) ?? null,
  }));
}
const allLines = (loc, which) => tours.filter((tour) => !which || band(tour) === which).flatMap((tour) => lines(loc, tour))
  .sort((a, b) => a.days - b.days || (a.price(2)?.amount ?? a.price(6)?.amount ?? 0) - (b.price(2)?.amount ?? b.price(6)?.amount ?? 0));

function body(loc) {
  const tr = (en, zh, ko) => ({ en, zh, ko })[loc];
  const lengthLabel = (line) => tr(`${line.days} days`, `${line.days} 天 ${line.nights} 晚`, `${line.nights}박 ${line.days}일`);
  const cell = (line, travelers) => line.price(travelers)?.formatted ?? tr("on request", "需询价", "문의");
  const label = (line) => (line.option ? `${line.name} (${line.option})` : line.name);
  const every = allLines(loc);
  const amounts = (set, travelers) => set.map((line) => line.price(travelers)?.amount).filter((value) => value != null);
  const daily = (set) => set.filter((line) => line.price(2)).map((line) => perDay(loc, line.price(2).amount, line.days));
  const two = amounts(every, 2);
  const six = amounts(every, 6);
  const dailyAll = daily(every);
  const days = tours.map((tour) => tour.product.days);
  const cheapestDay = every.filter((line) => line.price(2)).reduce((low, line) => (perDay(loc, line.price(2).amount, line.days) < perDay(loc, low.price(2).amount, low.days) ? line : low));
  const dearestDay = every.filter((line) => line.price(2)).reduce((high, line) => (perDay(loc, line.price(2).amount, line.days) > perDay(loc, high.price(2).amount, high.days) ? line : high));
  const allTiers = every.filter((line) => line.price(2) && line.price(4) && line.price(6));
  const saving = (travelers) => median(allTiers.map((line) => Math.round((1 - line.price(travelers).amount / line.price(2).amount) * 100)));
  const withFlights = tours.filter((tour) => tour.product.includesDomesticFlights).length;
  const bandName = {
    short: tr("4- and 5-day tours", "4–5 天线路", "4~5일 일정"),
    mid: tr("6- to 9-day tours", "6–9 天线路", "6~9일 일정"),
    long: tr("10- to 21-day tours", "10–21 天线路", "10~21일 일정"),
    winter: tr("Northeast China winter tours", "东北冬季线路", "동북 겨울 일정"),
  };
  const columns = tr(["Route", "Length", "2 travellers", "4 travellers", "6 travellers"], ["路线", "天数", "2 人同行", "4 人同行", "6 人同行"], ["일정", "기간", "2명", "4명", "6명"]);
  const caption = tr(
    "Published starting price per person; flights to and from China extra",
    "公布的每人起价；往返中国的国际机票另计",
    "공개된 1인 시작가; 중국 왕복 국제선은 별도");
  const table = (which) => ({ id: `${which}-table`, type: "table", caption, columns,
    rows: allLines(loc, which).map((line) => [label(line), lengthLabel(line), cell(line, 2), cell(line, 4), cell(line, 6)]),
    rowLinks: allLines(loc, which).map((line) => tourHref(loc, line.tour.product.slug)) });
  const glance = BANDS.map((which) => {
    const set = allLines(loc, which);
    const count = tours.filter((tour) => band(tour) === which).length;
    return [bandName[which], String(count), range(loc, Math.min(...amounts(set, 2)), Math.max(...amounts(set, 2))), range(loc, Math.min(...amounts(set, 6)), Math.max(...amounts(set, 6))), range(loc, Math.min(...daily(set)), Math.max(...daily(set)))];
  });
  const n = tours.length;
  const dayRange = `${Math.min(...days)}${loc === "ko" ? "~" : "–"}${Math.max(...days)}`;

  return [
    { id: "lead", type: "lead", text: tr(
      `A private tour in China costs ${range(loc, Math.min(...two), Math.max(...two))} per person for two travellers on Homeground's ${n} published routes of ${dayRange} days. That is about ${range(loc, Math.min(...dailyAll), Math.max(...dailyAll))} per person per day, with a middle value near ${fmt(loc, median(dailyAll))}. When six travel together the same routes cost ${range(loc, Math.min(...six), Math.max(...six))} each. Flights to and from China are extra, and each tour page lists what its price covers.`,
      `Homeground 公布了 ${n} 条 ${dayRange} 天中国私家团的价格：2 人同行，每人 ${range(loc, Math.min(...two), Math.max(...two))}，折合每人每天约 ${range(loc, Math.min(...dailyAll), Math.max(...dailyAll))}，中间值约 ${fmt(loc, median(dailyAll))}。6 人同行，同样的线路每人 ${range(loc, Math.min(...six), Math.max(...six))}。往返中国的国际机票另计，每条线路的页面写明价格包含什么。`,
      `Homeground이 요금을 공개한 중국 프라이빗 투어는 ${dayRange}일 일정 ${n}개입니다. 2명이 함께 가면 1인 ${range(loc, Math.min(...two), Math.max(...two))}, 하루로 나누면 1인 약 ${range(loc, Math.min(...dailyAll), Math.max(...dailyAll))}이고 중간값은 약 ${fmt(loc, median(dailyAll))}입니다. 6명이 함께 가면 같은 일정이 1인 ${range(loc, Math.min(...six), Math.max(...six))}입니다. 중국 왕복 국제선은 별도이며, 요금에 포함된 내용은 각 상품 페이지에 적혀 있습니다.`) },
    { id: "glance-heading", type: "heading", level: 2, text: tr("Prices at a glance", "价格一览", "요금 한눈에 보기") },
    { id: "glance-table", type: "table",
      caption: tr("Per person, by trip length; per-day figures are for two travellers", "每人价格，按行程天数分组；每天金额按 2 人同行计算", "1인 요금, 일정 길이별; 하루 금액은 2명 기준"),
      columns: tr(["Trip length", "Routes", "2 travellers", "6 travellers", "Per day"], ["行程天数", "线路数", "2 人同行", "6 人同行", "每人每天"], ["일정 길이", "일정 수", "2명", "6명", "1인 하루"]),
      rows: glance },
    ...["short", "mid", "long"].flatMap((which) => [
      { id: `${which}-heading`, type: "heading", level: 2, text: bandName[which] },
      table(which),
    ]),
    { id: "winter-heading", type: "heading", level: 2, text: bandName.winter },
    { id: "winter", type: "paragraph", text: tr(
      "The Northeast winter routes publish two prices each: low season, and peak season from 20 December to 14 February.",
      "东北冬季线路每条有两档公布价：淡季，以及 12 月 20 日至 2 月 14 日的旺季。",
      "동북 겨울 일정은 요금이 두 가지입니다. 비수기 요금과 12월 20일~2월 14일 성수기 요금입니다.") },
    table("winter"),
    { id: "group-size-heading", type: "heading", level: 2, text: tr("How group size changes the price", "人数怎样影响价格", "인원에 따라 요금이 달라지는 이유") },
    { id: "group-size", type: "paragraph", text: tr(
      `Across the ${allTiers.length} published price lines that list two, four and six travellers, the price per person for four travellers is typically ${saving(4)}% lower than for two, and for six it is ${saving(6)}% lower. The guide and vehicle are shared by your party, so more people split those costs. Hotel rooms, tickets and transport seats are still paid for each traveller, which is why the saving gets smaller as the party grows.`,
      `在同时公布 2 人、4 人、6 人价格的 ${allTiers.length} 档报价里，4 人同行的每人价格一般比 2 人低 ${saving(4)}%，6 人同行低 ${saving(6)}%。导游和车是整团共用的，人多了分摊就少。酒店、门票和车票机票仍按人收费，所以人数再增加，每人能省的会变少。`,
      `2명·4명·6명 요금을 모두 공개한 ${allTiers.length}개 요금 기준으로, 4명일 때 1인 요금은 2명일 때보다 보통 ${saving(4)}% 낮고 6명일 때는 ${saving(6)}% 낮습니다. 가이드와 차량 비용을 일행이 나눠 내기 때문입니다. 호텔, 입장권, 열차·항공 좌석은 인원마다 비용이 들어서 인원이 늘수록 줄어드는 폭은 작아집니다.`) },
    { id: "price-note", type: "callout", tone: "warning", title: tr("Starting prices, confirmed in writing", "起价，付款前书面确认", "시작가이며 결제 전 서면 확인"), body: privateTourPublishedPriceNote[loc] },
    { id: "faq", type: "faq", title: tr("Questions about private tour prices in China", "关于中国私家团价格的常见问题", "중국 프라이빗 투어 요금에 대해 자주 묻는 질문"), items: [
      { question: tr("How much does a private tour in China cost per day?", "中国私家团每天要多少钱？", "중국 프라이빗 투어는 하루에 얼마인가요?"),
        answer: tr(
          `Two travellers pay about ${range(loc, Math.min(...dailyAll), Math.max(...dailyAll))} per person per day on Homeground's ${n} published private routes, with a middle value near ${fmt(loc, median(dailyAll))}. The lowest per-day figure is ${cheapestDay.name} (${cheapestDay.days} days) and the highest is ${dearestDay.name} (${dearestDay.days} days). Flights to and from China are extra.`,
          `Homeground 公布价格的 ${n} 条私家线路，2 人同行每人每天约 ${range(loc, Math.min(...dailyAll), Math.max(...dailyAll))}，中间值约 ${fmt(loc, median(dailyAll))}。每天金额最低的是${cheapestDay.name}（${cheapestDay.days} 天），最高的是${dearestDay.name}（${dearestDay.days} 天）。往返中国的国际机票另计。`,
          `Homeground이 요금을 공개한 프라이빗 일정 ${n}개는 2명 기준 1인 하루 약 ${range(loc, Math.min(...dailyAll), Math.max(...dailyAll))}이고 중간값은 약 ${fmt(loc, median(dailyAll))}입니다. 하루 금액이 가장 낮은 일정은 ${cheapestDay.name}(${cheapestDay.days}일), 가장 높은 일정은 ${dearestDay.name}(${dearestDay.days}일)입니다. 중국 왕복 국제선은 별도입니다.`) },
      { question: tr("Is a private China tour cheaper per person with more people?", "私家团人多会更便宜吗？", "프라이빗 투어는 인원이 많으면 더 저렴한가요?"),
        answer: tr(
          `Yes. Where Homeground publishes prices for two, four and six travellers, the price per person for six is typically ${saving(6)}% lower than for two, because the guide and vehicle cost is shared across more people.`,
          `会。在同时公布 2 人、4 人、6 人价格的线路上，6 人同行的每人价格一般比 2 人低 ${saving(6)}%，因为导游和车的费用由更多人分摊。`,
          `네. 2명·4명·6명 요금을 모두 공개한 일정에서는 6명일 때 1인 요금이 2명일 때보다 보통 ${saving(6)}% 낮습니다. 가이드와 차량 비용을 더 많은 인원이 나눠 내기 때문입니다.`) },
      { question: tr("Do these prices include flights?", "这些价格含机票吗？", "요금에 항공편이 포함되나요?"),
        answer: tr(
          `No price includes flights to and from China. ${withFlights} of the ${n} routes fly between cities inside China and include those domestic flights; each tour page lists the trains, flights and transfers in its price.`,
          `所有价格都不含往返中国的国际机票。${n} 条线路里有 ${withFlights} 条在中国境内要坐飞机，这些国内航班已含在价格里。每条线路的页面写明包含的高铁、航班和接送。`,
          `어느 요금에도 중국 왕복 국제선은 포함되지 않습니다. ${n}개 일정 가운데 ${withFlights}개는 중국 안에서 도시 사이를 비행기로 이동하며, 그 국내선은 요금에 포함됩니다. 포함된 열차, 항공편과 이동편은 각 상품 페이지에 적혀 있습니다.`) },
      { question: tr("Can I get a price for a different group size?", "其他人数能报价吗？", "다른 인원으로도 견적을 받을 수 있나요?"),
        answer: tr(
          "Yes. The published prices are for the group sizes shown. For one, three, five or more than six travellers, tell us your dates, group size and the rooms you need, and we send one written total before you pay.",
          "可以。公布价对应表中的人数。1 人、3 人、5 人或 6 人以上同行，告诉我们日期、人数和需要的房间，我们会在付款前给出一份书面总价。",
          "네. 공개 요금은 표에 있는 인원 기준입니다. 1명, 3명, 5명 또는 6명을 넘는 일행은 날짜, 인원, 필요한 객실을 알려 주시면 결제 전에 합계 금액을 서면으로 보내 드립니다.") },
    ] },
    { id: "links", type: "internal-links", title: tr("See the routes behind these prices", "查看这些价格对应的线路", "요금에 해당하는 일정 보기"), items: [
      { label: tr("All private tours and prices", "全部私家团与价格", "프라이빗 투어 전체와 요금"), href: hubHref(loc) },
      { label: cheapestDay.tour.localized[loc].title, href: tourHref(loc, cheapestDay.tour.product.slug) },
      { label: tours.find((tour) => tour.product.slug === HERO_SLUG).localized[loc].title, href: tourHref(loc, HERO_SLUG) },
      { label: tr("What a 2-week China tour costs", "中国两周游要多少钱", "중국 2주 투어 비용"), href: guideHref(loc, "china-2-week-tour-cost") },
      { label: tr("China small-group tours 2027: dates and prices", "2027 年中国小团：日期与价格", "2027 중국 소규모 그룹 투어: 날짜와 요금"), href: guideHref(loc, "china-small-group-tours-2027") },
      { label: tr("How much does a China trip cost if you plan it yourself?", "自己安排的话，中国行要花多少钱？", "직접 계획하면 중국 여행 비용은 얼마인가요?"), href: guideHref(loc, "how-much-does-a-china-trip-cost") },
    ] },
    { id: "sources", type: "sources", title: tr("Published price sources", "公布价格来源", "공개 요금 출처"), items: [
      { label: tr("Homeground private tours: every route and its published price", "Homeground 私家团：全部线路与公布价", "Homeground 프라이빗 투어: 전체 일정과 공개 요금"), url: `https://homegroundchina.com${hubHref(loc)}`, publisher: "Homeground China", reviewedAt: TODAY },
      { label: cheapestDay.tour.localized[loc].title, url: `https://homegroundchina.com${tourHref(loc, cheapestDay.tour.product.slug)}`, publisher: "Homeground China", reviewedAt: TODAY },
      { label: dearestDay.tour.localized[loc].title, url: `https://homegroundchina.com${tourHref(loc, dearestDay.tour.product.slug)}`, publisher: "Homeground China", reviewedAt: TODAY },
    ] },
  ];
}

function stats(loc) {
  const every = allLines(loc);
  const two = every.map((line) => line.price(2)?.amount).filter((value) => value != null);
  const six = every.map((line) => line.price(6)?.amount).filter((value) => value != null);
  const days = tours.map((tour) => tour.product.days);
  return { n: tours.length, dayRange: `${Math.min(...days)}${loc === "ko" ? "~" : "–"}${Math.max(...days)}`, lowSix: fmt(loc, Math.min(...six)), highTwo: fmt(loc, Math.max(...two)) };
}
const meta = () => {
  const en = stats("en"), zh = stats("zh"), ko = stats("ko");
  return {
    pillar: "budget-and-tradeoffs", family: "combined-decision", intent: "plan",
    topics: ["budget", "trip-planning", "first-trip", "route-design"],
    destinations: ["china", "beijing", "xian", "chengdu", "guilin", "zhangjiajie", "shanghai"],
    searchTerms: {
      en: ["china private tour cost", "china private tour price", "how much is a private tour in china", "private tour china cost per day"],
      zh: ["中国私家团价格", "中国私家团多少钱", "中国私人定制旅游费用"],
      ko: ["중국 프라이빗 투어 가격", "중국 프라이빗 투어 비용", "중국 개인 투어 요금"],
    },
    locales: {
      en: { title: `China Private Tour Prices 2026: ${en.n} Routes, ${en.dayRange} Days`, headline: "What a private tour in China costs", description: `Published per-person prices for ${en.n} private China tours of ${en.dayRange} days, from ${en.lowSix} with six travellers to ${en.highTwo} for two. Costs per day too.`, navTitle: "China private tour prices", featuredLinkLabel: "See every published private tour price", cardTags: ["Published prices", "By group size", "Per person, land only"] },
      zh: { title: `中国私家团价格 2026：${zh.n} 条线路，${zh.dayRange} 天`, headline: "中国私家团要多少钱", description: `Homeground ${zh.n} 条 ${zh.dayRange} 天中国私家团的公布价：6 人同行每人 ${zh.lowSix} 起，2 人同行最高每人 ${zh.highTwo}。按天数和人数列出，并算出每天费用。`, navTitle: "中国私家团价格", featuredLinkLabel: "查看全部私家团公布价", cardTags: ["公布价", "按人数", "每人，不含国际机票"] },
      ko: { title: `중국 프라이빗 투어 요금 2026: ${ko.n}개 일정, ${ko.dayRange}일`, headline: "중국 프라이빗 투어는 얼마인가요", description: `${ko.dayRange}일 중국 프라이빗 투어 ${ko.n}개의 공개 요금입니다. 6명 기준 1인 ${ko.lowSix}부터 2명 기준 최고 ${ko.highTwo}까지, 하루 비용도 정리했습니다.`, navTitle: "중국 프라이빗 투어 요금", featuredLinkLabel: "공개된 프라이빗 투어 요금 전체 보기", cardTags: ["공개 요금", "인원별", "1인 기준, 국제선 별도"] },
    },
    boundary: "Published per-person prices for every Homeground private tour with a public price, by group size, trip length and per day; excludes route detail for 10- to 21-day tours and small-group departures (china-2-week-tour-cost, china-small-group-tours-2027) and independent-travel budgets (how-much-does-a-china-trip-cost).",
  };
};

const bodyFile = (loc) => `import type { StructuredPageBody } from "../../../lib/content-system/page-body";\n\nconst body = ${JSON.stringify({ schemaVersion: "1.0.0", blocks: body(loc) }, null, 2)} as const satisfies StructuredPageBody;\n\nexport default body;\n`;
const OG = { en: "en_US", zh: "zh_CN", ko: "ko_KR" };

function renderFiles() {
  const guide = meta();
  const hero = privateTourProducts.find((product) => product.slug === HERO_SLUG).heroImage;
  const files = Object.fromEntries(L.map((loc) => [`content/guides/${ID}/body.${loc}.ts`, bodyFile(loc)]));
  files[`content/guides/${ID}/metadata.json`] = `${JSON.stringify({
    id: ID, type: "planning", pillar: guide.pillar, audienceMarkets: ["global"], format: "decision-guide",
    topics: guide.topics, destinations: guide.destinations,
    heroImagePath: hero.src, heroImageUrl: `https://homegroundchina.com${hero.src}`, imageWidth: hero.width, imageHeight: hero.height,
    datePublished: TODAY, dateModified: TODAY, sourceReviewedDate: TODAY,
    searchTerms: guide.searchTerms,
    search: { section: "plan", family: guide.family, primaryIntent: guide.intent },
    layout: { mode: "template", templateId: "editorial-v1" },
    locales: Object.fromEntries(L.map((loc) => [loc, {
      path: guideHref(loc, ID), title: guide.locales[loc].title, headline: guide.locales[loc].headline, description: guide.locales[loc].description,
      heroAlt: hero.alt[loc], navTitle: guide.locales[loc].navTitle, featuredLinkLabel: guide.locales[loc].featuredLinkLabel,
      openGraphLocale: OG[loc], cardTags: guide.locales[loc].cardTags,
    }])),
  }, null, 2)}\n`;
  return files;
}

function write(outRoot) {
  const dir = path.join(outRoot, "content/guides", ID);
  mkdirSync(dir, { recursive: true });
  for (const [file, text] of Object.entries(renderFiles())) writeFileSync(path.join(outRoot, file), text);
  const hero = privateTourProducts.find((product) => product.slug === HERO_SLUG).heroImage;
  writeFileSync(path.join(dir, "image-plan.md"), `# Image plan: ${ID}\n\nHero: \`${hero.src}\` (${hero.width} × ${hero.height}), reused from the product page \`/tours/${HERO_SLUG}/\`, where its source and rights basis are recorded. No other images.\n`);
  writeFileSync(path.join(dir, "source-log.md"), `# Source log: ${ID}\n\nReviewed ${TODAY}.\n\n- Every price, trip length, option name and the count of routes with domestic flights is read from \`lib/privateTourProducts.ts\` through the same localisation the tour pages use. Regenerate the guide after any price change: \`node --experimental-strip-types --no-warnings tools/generate-private-tour-price-guide.mjs --write\`.\n- The per-day figures, ranges, middle values and group-size percentages are arithmetic on those published prices.\n- The price note is the sentence shown under the price on every tour page (\`lib/privateTourCurrencyNote.ts\`).\n- No external sources: the page states only Homeground's own published prices.\n`);
  writeFileSync(path.join(dir, "seo-brief.md"), `# SEO brief: ${ID}\n\nPrepared ${TODAY}.\n\nWhy: in Bing Webmaster's AI Performance report (three months to 10 October 2026) every page AI assistants cited from this site was a facts page (public holidays, plugs, customs rules); no grounding query was about tour prices. This page gives assistants and searchers one dated table of every published private-tour price, which no other site can supply.\n\nTarget phrasings: "china private tour cost", "china private tour price", "how much is a private tour in china", "private tour china cost per day". No keyword-volume measurement was taken.\n\nBoundary: ${meta().boundary}\n`);
}

if (process.argv.includes("--write")) write(ROOT);
export { ID, renderFiles, write };
