// Generates the three long-haul guides (china-2-week-tour-cost,
// china-small-group-tours-2027, best-2-week-china-tour) from the product data
// so every price and date matches the product pages. After changing a
// long-haul price or date, run from the repo root:
//   node --experimental-strip-types --no-warnings tools/generate-long-haul-guides.mjs --write
// tools/tests/long-haul-guides.test.mjs fails when the guide files are stale.
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
const ROOT = path.resolve(import.meta.dirname, "..");
const { privateTourLongHaulProducts: products } = await import(path.join(ROOT, "lib/privateTourLongHaulProducts.ts"));
const { convertCnyToKrw } = await import(path.join(ROOT, "lib/privateTourProducts.ts"));

const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
const L = ["en", "zh", "ko"];
const rows = (slug) => bySlug[slug].packages[0].prices;
const price = (slug, loc, travelers) => {
  const r = rows(slug).find((x) => x.travelers === travelers);
  if (!r) throw new Error(`no ${travelers} row for ${slug}`);
  return money(loc, r.usdPerPerson, r.cnyPerPerson);
};
function money(loc, usd, cny) {
  if (loc === "en") return `USD ${usd.toLocaleString("en-US")}`;
  if (loc === "zh") return `¥${cny.toLocaleString("en-US")}`;
  return `₩${convertCnyToKrw(cny).toLocaleString("en-US")}`;
}
const moneyUsd = (loc, usd) => money(loc, usd, Math.floor((usd * 6.5) / 10) * 10);
const supplementMoney = (loc, usd) => (loc === "zh" ? `¥${(Math.ceil((usd * 6.5) / 10) * 10).toLocaleString("en-US")}` : moneyUsd(loc, usd));
const tourHref = (loc, slug) => `${loc === "en" ? "" : `/${loc}`}/tours/${slug}/`;
const guideHref = (loc, id) => `${loc === "en" ? "" : `/${loc}`}/guides/${id}/`;
const t = (en, zh, ko) => ({ en, zh, ko });

const S = {
  c10: "beijing-xian-guilin-shanghai-10-day-private-tour",
  j11: "beijing-hangzhou-suzhou-shanghai-11-day-private-tour",
  s13: "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour",
  c14: "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour",
  l14: "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
  y14: "beijing-xian-yunnan-14-day-private-tour",
  h14: "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour",
  silk: "beijing-xian-silk-road-15-day-private-tour",
  yz: "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour",
  g21: "china-grand-tour-21-day-private-tour",
  c14g: "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour",
  l14g: "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour",
  yzg: "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour",
  silkg: "beijing-xian-silk-road-15-day-small-group-tour",
};
const route = {
  [S.c10]: t("Beijing, Xi'an, Guilin, Shanghai", "北京·西安·桂林·上海", "베이징·시안·구이린·상하이"),
  [S.j11]: t("Beijing, Hangzhou, Suzhou, Shanghai (no flights)", "北京·杭州·苏州·上海（不坐飞机）", "베이징·항저우·쑤저우·상하이(국내선 없음)"),
  [S.s13]: t("Shanghai, Zhangjiajie, Fenghuang, Guilin", "上海·张家界·凤凰·桂林", "상하이·장가계·봉황·구이린"),
  [S.c14]: t("Beijing, Xi'an, Chengdu, Guilin, Shanghai", "北京·西安·成都·桂林·上海", "베이징·시안·청두·구이린·상하이"),
  [S.l14]: t("Beijing, Xi'an, Zhangjiajie, Guilin, Shanghai", "北京·西安·张家界·桂林·上海", "베이징·시안·장가계·구이린·상하이"),
  [S.y14]: t("Beijing, Xi'an, Dali, Lijiang, Shangri-La", "北京·西安·大理·丽江·香格里拉", "베이징·시안·다리·리장·샹그릴라"),
  [S.h14]: t("Beijing, Xi'an, Yellow Mountain, Hangzhou, Suzhou, Shanghai", "北京·西安·黄山·杭州·苏州·上海", "베이징·시안·황산·항저우·쑤저우·상하이"),
  [S.silk]: t("Beijing, Xi'an, Silk Road to Urumqi", "北京·西安·丝绸之路到乌鲁木齐", "베이징·시안·실크로드(우루무치까지)"),
  [S.yz]: t("Beijing, Xi'an, Chengdu, Yangtze cruise, Shanghai", "北京·西安·成都·长江游轮·上海", "베이징·시안·청두·양쯔강 크루즈·상하이"),
  [S.g21]: t("Grand China with Zhangjiajie and the Yangtze", "中国全景：张家界与长江游轮", "장가계·양쯔강 크루즈 포함 중국 일주"),
};
route[S.c14g] = route[S.c14];
route[S.l14g] = route[S.l14];
route[S.yzg] = route[S.yz];
route[S.silkg] = route[S.silk];
const daysLabel = (loc, slug) => {
  const p = bySlug[slug];
  return loc === "en" ? `${p.days} days` : loc === "zh" ? `${p.days} 天 ${p.nights} 晚` : `${p.nights}박 ${p.days}일`;
};
const PRIVATE_ORDER = [S.c10, S.j11, S.s13, S.h14, S.l14, S.y14, S.c14, S.silk, S.yz, S.g21];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MON = MONTHS.map((month) => month.slice(0, 3));
const GROUP_ROUTES = [S.c14g, S.l14g, S.yzg, S.silkg];
const singleSupplementUsd = (slug) => {
  const match = bySlug[slug].hotelNote.en.match(/single supplement[^.]*?USD\s+([\d,]+)/i);
  if (!match) throw new Error(`single supplement missing from ${slug}`);
  return Number(match[1].replaceAll(",", ""));
};
const groupSupplement = (loc, slug) => supplementMoney(loc, singleSupplementUsd(slug));
const departures = GROUP_ROUTES.flatMap((slug) => {
  const summary = bySlug[slug].summary.en;
  const year = summary.match(/\b20\d{2}\b/)?.[0];
  if (!year) throw new Error(`departure year missing from ${slug}`);
  // Ranges read "10–23 April" or, across a month end, "19 May–4 June".
  const monthPattern = MONTHS.join("|");
  const dates = [...summary.matchAll(new RegExp(`(\\d{1,2})(?:\\s+(${monthPattern}))?\\s*[–-]\\s*(\\d{1,2})\\s+(${monthPattern})`, "g"))];
  if (!dates.length) throw new Error(`departure dates missing from ${slug}`);
  return dates.map(([, start, startMonthName, end, endMonthName]) => {
    const endMonth = MONTHS.indexOf(endMonthName) + 1;
    const startMonth = startMonthName ? MONTHS.indexOf(startMonthName) + 1 : endMonth;
    const pad = (n) => String(n).padStart(2, "0");
    const a = `${year}-${pad(startMonth)}-${pad(start)}`;
    const b = `${year}-${pad(endMonth)}-${pad(end)}`;
    const length = (Date.UTC(Number(year), endMonth - 1, Number(end)) - Date.UTC(Number(year), startMonth - 1, Number(start))) / 86_400_000 + 1;
    if (length !== bySlug[slug].days) throw new Error(`departure length mismatch for ${slug}: ${a}–${b}`);
    return [slug, a, b, singleSupplementUsd(slug)];
  });
}).sort((a, b) => a[1].localeCompare(b[1]));
function dateRange(loc, a, b) {
  const [year, am, ad] = a.split("-").map(Number);
  const [, bm, bd] = b.split("-").map(Number);
  if (am !== bm) {
    if (loc === "en") return `${ad} ${MON[am - 1]}–${bd} ${MON[bm - 1]} ${year}`;
    if (loc === "zh") return `${year} 年 ${am} 月 ${ad} 日–${bm} 月 ${bd} 日`;
    return `${year}년 ${am}월 ${ad}일~${bm}월 ${bd}일`;
  }
  if (loc === "en") return `${ad}–${bd} ${MON[am - 1]} ${year}`;
  if (loc === "zh") return `${year} 年 ${am} 月 ${ad}–${bd} 日`;
  return `${year}년 ${am}월 ${ad}~${bd}일`;
}
const sgPrice = (loc, slug) => price(slug, loc, 2);
const pair = (loc, slug) => {
  const r = rows(slug).find((x) => x.travelers === 2);
  if (loc === "en") return `USD ${(2 * r.usdPerPerson).toLocaleString("en-US")}`;
  if (loc === "zh") return `¥${(2 * r.cnyPerPerson).toLocaleString("en-US")}`;
  return `₩${(2 * convertCnyToKrw(r.cnyPerPerson)).toLocaleString("en-US")}`;
};
const perDayValue = (loc, slug, n) => {
  const r = rows(slug).find((x) => x.travelers === n);
  const d = bySlug[slug].days;
  if (loc === "en") return Math.round(r.usdPerPerson / d);
  if (loc === "zh") return Math.round(r.cnyPerPerson / d / 10) * 10;
  return Math.round(convertCnyToKrw(r.cnyPerPerson) / d / 1000) * 1000;
};
const fmtPlain = (loc, n) => (loc === "en" ? `USD ${n.toLocaleString("en-US")}` : loc === "zh" ? `¥${n.toLocaleString("en-US")}` : `₩${n.toLocaleString("en-US")}`);
const priceRange = (loc, low, high) => `${low}–${high.replace(loc === "en" ? /^USD / : loc === "zh" ? /^¥/ : /^₩/, "")}`;

// ------------------------------------------------------------------------
// Guide 1: what a two-week China tour costs
// ------------------------------------------------------------------------
function costBody(loc) {
  const P = (slug, n) => price(slug, loc, n);
  const tr = (en, zh, ko) => ({ en, zh, ko })[loc];
  const privateRows = PRIVATE_ORDER.map((slug) => [route[slug][loc], daysLabel(loc, slug), P(slug, 2), P(slug, 4), P(slug, 6)]);
  const sgRows = [S.l14g, S.c14g, S.silkg, S.yzg].map((slug) => {
    const dates = departures.filter((d) => d[0] === slug).map((d) => dateRange(loc, d[1], d[2])).join(loc === "en" ? "; " : loc === "zh" ? "；" : "; ");
    const sup = departures.find((d) => d[0] === slug)[3];
    return [route[slug][loc], daysLabel(loc, slug), sgPrice(loc, slug), supplementMoney(loc, sup), dates];
  });
  const two14 = [S.h14, S.l14, S.y14, S.c14].map((s) => perDayValue(loc, s, 2));
  const lo = fmtPlain(loc, Math.min(...two14));
  const hi = fmtPlain(loc, Math.max(...two14));
  return [
    { id: "lead", type: "lead", text: tr(
      `Allow ${priceRange(loc, P(S.h14, 2), P(S.c14, 2))} per person for a published 14-day Homeground private tour when two people share a room. That covers the hotel, city guides and listed travel within China; you buy the international flights separately. Six people sharing a private trip bring the lowest 14-day price to ${P(S.h14, 6)} each. If fixed dates suit you, the two 14-day small groups cost ${priceRange(loc, sgPrice(loc, S.l14g), sgPrice(loc, S.c14g))} each and carry 8–12 guests.`,
      `两个人订 Homeground 的 14 天中国私家团，按两人一间算，每人准备 ${priceRange(loc, P(S.h14, 2), P(S.c14, 2))}。酒店、各地导游和行程写明的境内交通在里面，国际机票要自己另买。一起走的有 6 人，14 天线最低每人 ${P(S.h14, 6)}。能配合固定日期的话，两条 14 天小团每人 ${priceRange(loc, sgPrice(loc, S.l14g), sgPrice(loc, S.c14g))}，每团 8–12 人。`,
      `Homeground의 공개된 14일 중국 프라이빗 투어는 두 사람이 한 방을 쓸 때 1인 ${priceRange(loc, P(S.h14, 2), P(S.c14, 2))}입니다. 호텔과 도시별 가이드, 일정에 적힌 중국 내 교통편은 이 금액에 들어가고 국제선은 따로 예약합니다. 6명이 함께 가면 14일 일정의 가장 낮은 1인 요금은 ${P(S.h14, 6)}입니다. 날짜를 맞출 수 있다면 8~12명이 함께하는 14일 정기 출발 그룹 두 가지가 있으며 1인 ${priceRange(loc, sgPrice(loc, S.l14g), sgPrice(loc, S.c14g))}입니다.`) },
    { id: "private-heading", type: "heading", level: 2, text: tr("Private tour prices by route", "私家团各线路价格", "프라이빗 투어 일정별 요금") },
    { id: "private-table", type: "table",
      caption: tr("Starting price per person, twin share; international flights and possible holiday surcharges extra", "每人起价，两人一间；国际机票另计，节假日可能有附加费", "2인 1실 기준 1인 시작가; 국제선과 공휴일 추가금은 별도"),
      columns: tr(["Route", "Length", "2 travellers", "4 travellers", "6 travellers"], ["路线", "天数", "2 人同行", "4 人同行", "6 人同行"], ["일정", "기간", "2명", "4명", "6명"]),
      rows: privateRows },
    { id: "per-day", type: "paragraph", text: tr(
      `For two travellers, the four 14-day routes work out to about ${priceRange(loc, lo, hi)} per person per day. The 11-day Beijing–Hangzhou–Suzhou–Shanghai route comes in lower at about ${fmtPlain(loc, perDayValue(loc, S.j11, 2))} a day: it uses trains and a private car, with no domestic flights. The 15-day Silk Road route is about ${fmtPlain(loc, perDayValue(loc, S.silk, 2))} a day. Its long road sections take more vehicle time.`,
      `2 人同行，四条 14 天线路平均下来，每人每天约 ${priceRange(loc, lo, hi)}。北京、杭州、苏州、上海的 11 天线路每天约 ${fmtPlain(loc, perDayValue(loc, S.j11, 2))}，没有国内航班，主要坐高铁和专车。15 天丝绸之路每天约 ${fmtPlain(loc, perDayValue(loc, S.silk, 2))}。那条线距离远，用车时间也长。`,
      `2명 기준 14일 일정 네 가지는 1인 하루 약 ${priceRange(loc, lo, hi)}입니다. 베이징·항저우·쑤저우·상하이 11일 일정은 하루 약 ${fmtPlain(loc, perDayValue(loc, S.j11, 2))}입니다. 국내선 없이 열차와 전용 차량으로 이동합니다. 15일 실크로드는 하루 약 ${fmtPlain(loc, perDayValue(loc, S.silk, 2))}이며 긴 차량 이동이 요금에 영향을 줍니다.`) },
    { id: "group-size-heading", type: "heading", level: 2, text: tr("Why the price per person falls with group size", "为什么人越多每人越便宜", "인원이 많을수록 1인 요금이 내려가는 이유") },
    { id: "group-size", type: "paragraph", text: tr(
      "The guide and vehicle are shared by your party. Split those costs four ways instead of two and the price per person drops. Hotel rooms, tickets and transport seats still have to be paid for each traveller, so the saving gets smaller as the party grows.",
      "导游和车是整团共用的。2 人分摊和 4 人分摊，每人负担的金额差很多。酒店、门票和车票机票仍按人收费，所以到了 6 人，每人还能省，但降幅会小一些。",
      "가이드와 차량 비용은 일행이 나눠 냅니다. 2명이 나눌 때보다 4명이 나눌 때 1인 부담이 크게 줄어듭니다. 호텔, 입장권, 열차·항공 좌석은 인원마다 비용이 들어서 6명으로 늘면 요금은 더 내려가도 차이는 작아집니다.") },
    { id: "small-group-heading", type: "heading", level: 2, text: tr("Small-group prices", "小团价格", "소규모 그룹 요금") },
    { id: "small-group-table", type: "table",
      caption: tr("Starting price per person, twin share; 8–12 guests, 2027 departures; international flights and possible holiday surcharges extra", "2027 年 8–12 人小团，每人起价、两人一间；国际机票另计，节假日可能有附加费", "2027년 8~12명 그룹, 2인 1실 기준 1인 시작가; 국제선과 공휴일 추가금은 별도"),
      columns: tr(["Route", "Length", "Per person", "Own room from", "Departures"], ["路线", "天数", "每人", "单房差起价", "出发日期"], ["일정", "기간", "1인", "1인실 추가금", "출발일"]),
      rows: sgRows },
    { id: "includes-heading", type: "heading", level: 2, text: tr("What these prices include", "这些价格包含什么", "요금에 포함된 것") },
    { id: "includes", type: "list", items: tr(
      ["Twin-share rooms with breakfast; Trip.com (Ctrip) 4-diamond hotels where available, with suitable local hotels at some smaller stops", "A local guide and vehicle on touring days in each city; private-tour guides and vehicles serve your party", "First admission to the sights named in the day plan", "Trains, domestic flights, cruises and transfers listed in the itinerary"],
      ["酒店两人一间，含早餐；有条件的城市选携程 4 钻酒店，个别小城市以当地合适酒店为准", "每座城市游览日有当地导游和用车。私家团的导游、车只服务你们", "每日行程列出的景点首道门票", "行程列明的高铁、国内航班、游船和接送"],
      ["호텔은 2인 1실에 조식 포함. 가능한 도시에서는 트립닷컴(씨트립) 4다이아 등급을 기준으로 하고, 일부 소도시에서는 적절한 현지 호텔을 이용합니다", "도시별 관광일에 현지 가이드와 차량. 프라이빗 투어에서는 일행만 이용합니다", "일정표에 적힌 명소의 첫 입장권", "일정에 명시된 열차, 국내선, 유람선과 픽업·샌딩"]) },
    { id: "excludes-heading", type: "heading", level: 2, text: tr("What they do not include", "不包含什么", "포함되지 않는 것") },
    { id: "excludes", type: "list", items: tr(
      ["Flights to China and home again", "Lunch, dinner and drinks off the cruise; hotel breakfast and cruise meals are included", "Visas, travel insurance, tips and personal spending", "Single rooms, upgrades and public-holiday surcharges"],
      ["往返中国的国际机票", "游轮以外的午餐、晚餐和饮料。酒店早餐和船上餐食已含", "签证、旅行保险、小费和个人消费", "单房差、房型升级和中国节假日附加费"],
      ["중국 왕복 국제선", "크루즈 밖에서 먹는 중식·석식과 음료. 호텔 조식과 선상 식사는 포함됩니다", "비자, 여행자 보험, 팁과 개인 경비", "1인실, 객실 업그레이드와 중국 공휴일 추가금"]) },
    { id: "compare-heading", type: "heading", level: 2, text: tr("Private tour or small group?", "私家团还是小团？", "프라이빗 투어와 소규모 그룹 중 무엇을 고를까") },
    { id: "compare", type: "paragraph", text: tr(
      `On the Beijing–Xi'an–Chengdu–Guilin–Shanghai 14-day route, a private departure for two is ${P(S.c14, 2)} each. The fixed-date group is ${sgPrice(loc, S.c14g)} each. A private guide and vehicle give your party more control over the pace; the group follows one plan with 8–12 guests. Eight friends travelling together can also set their own group date at the small-group price.`,
      `以北京、西安、成都、桂林、上海 14 天线来说，2 人私家团每人 ${P(S.c14, 2)}，固定日期小团每人 ${sgPrice(loc, S.c14g)}。私家团的导游和车只服务你们，走快走慢都好商量。小团是 8–12 人同走一份行程。如果你们已有 8 人，也能按小团价自己定出发日。`,
      `같은 베이징·시안·청두·구이린·상하이 14일 코스라도 출발 방식에 따라 요금이 달라집니다. 두 사람이 프라이빗으로 가면 1인 ${P(S.c14, 2)}, 정기 출발 그룹에 합류하면 ${sgPrice(loc, S.c14g)}입니다. 그룹에서는 8~12명이 한 일정으로 움직입니다. 일행만 가이드와 차량을 쓰며 속도를 조정하려면 프라이빗으로 예약하세요. 이미 8명 이상이 함께 간다면 그룹 요금으로 날짜를 직접 정할 수 있습니다.`) },
    { id: "price-note", type: "callout", tone: "warning", title: tr("Starting prices, confirmed in writing", "起价，付款前书面确认", "시작가이며 결제 전 서면 확인"), body: tr(
      "Before you pay, ask us for the hotel names, train and flight plan, and one written total. The table gives starting prices; travel during Chinese public holidays may cost more.",
      "付款前，先让我们把酒店、火车、航班和总价写在同一份确认里。表中只是起价，中国节假日出行可能更贵。",
      "결제 전에는 호텔 이름, 열차와 항공편, 최종 합계 금액을 서면으로 받아 보세요. 표는 시작가이며 중국 공휴일 여행은 더 비쌀 수 있습니다.") },
    { id: "faq", type: "faq", title: tr("Questions about China tour prices", "关于中国行价格的常见问题", "중국 여행 요금에 대해 자주 묻는 질문"), items: [
      { question: tr("How much is a two-week China tour for two people?", "两个人去中国玩两周要多少钱？", "두 사람이 중국 2주 여행을 하면 얼마인가요?"),
        answer: tr(
          `Budget ${priceRange(loc, pair(loc, S.h14), pair(loc, S.c14))} for two people on Homeground's four 14-day private China routes. With a shared twin room, that is ${priceRange(loc, P(S.h14, 2), P(S.c14, 2))} each. Add flights to and from China, lunch and dinner.`,
          `两个人走 Homeground 四条 14 天中国私家线，总价是 ${priceRange(loc, pair(loc, S.h14), pair(loc, S.c14))}。按两人一间分摊，每人 ${priceRange(loc, P(S.h14, 2), P(S.c14, 2))}。往返中国的机票和午晚餐还要另算。`,
          `두 사람이 Homeground의 14일 중국 프라이빗 일정 네 가지 중 하나를 예약하면 합계 ${priceRange(loc, pair(loc, S.h14), pair(loc, S.c14))}입니다. 2인 1실로 나누면 한 사람당 ${priceRange(loc, P(S.h14, 2), P(S.c14, 2))}입니다. 중국 왕복 항공편과 중식·석식은 여기에 더해야 합니다.`) },
      { question: tr("Is a private China tour cheaper with more people?", "私家团人多会更便宜吗？", "프라이빗 투어는 인원이 많으면 더 저렴한가요?"),
        answer: tr(
          `On the 14-day Beijing–Xi'an–Chengdu–Guilin–Shanghai private route, the published per-person price falls from ${P(S.c14, 2)} for two travellers to ${P(S.c14, 4)} for four and ${P(S.c14, 6)} for six. The guide and vehicle cost is shared across more people.`,
          `北京、西安、成都、桂林、上海 14 天私家线，每人价格随人数下降：2 人同行 ${P(S.c14, 2)}，4 人 ${P(S.c14, 4)}，6 人 ${P(S.c14, 6)}。导游和车的费用由更多人分摊。`,
          `베이징·시안·청두·구이린·상하이 14일 프라이빗 투어는 1인 요금이 2명일 때 ${P(S.c14, 2)}, 4명일 때 ${P(S.c14, 4)}, 6명일 때 ${P(S.c14, 6)}입니다. 가이드와 차량 비용을 더 많은 인원이 나눠 내기 때문입니다.`) },
      { question: tr("Do the prices include international flights?", "价格含国际机票吗？", "요금에 국제선이 포함되나요?"),
        answer: tr(
          "Homeground's published 10- to 21-day China tour prices cover the trip from arrival in China to departure from China. Flights to and from China are extra. The itinerary names the domestic flights, trains and cruises included in each route.",
          "Homeground 公布的 10–21 天中国线路价格，从抵达中国算到离开中国。往返中国的国际机票不含。每条行程写明的国内航班、高铁和游船已含。",
          "Homeground의 10~21일 중국 투어 공개 요금은 중국 도착부터 출국까지입니다. 중국 왕복 국제선은 별도입니다. 일정에 적힌 중국 국내선, 열차와 크루즈는 포함됩니다.") },
      { question: tr("How much does a solo traveller pay?", "一个人出行要多少钱？", "혼자 여행하면 얼마인가요?"),
        answer: tr(
          `There is no published one-person private-tour price; we quote it in writing because the guide and car serve one guest. On Homeground's 2027 small groups, a solo guest pays the route price and keeps a private room. The supplement starts at ${groupSupplement(loc, S.l14g)}, or ${groupSupplement(loc, S.yzg)} on the 17-day Yangtze route, where it also covers a cabin to yourself.`,
          `一个人走私家团，没有现成的公布价。导游和车只服务你，我们会单独书面报价。若参加 Homeground 2027 年小团，按线路团费付，再自己住一间。单房差从 ${groupSupplement(loc, S.l14g)} 起，17 天长江线从 ${groupSupplement(loc, S.yzg)} 起，已含一人住一间船舱。`,
          `혼자 쓰는 프라이빗 투어에는 공개된 1인 요금이 없습니다. 가이드와 차량을 혼자 이용하므로 서면 견적을 드립니다. Homeground의 2027년 소규모 그룹에 참가하면 일정 요금과 1인실 추가금을 냅니다. 추가금은 ${groupSupplement(loc, S.l14g)}부터이고 17일 양쯔강 일정은 ${groupSupplement(loc, S.yzg)}부터이며 선실을 혼자 쓰는 비용도 포함됩니다.`) },
      { question: tr("Why do some China tours look much cheaper?", "为什么有些中国团便宜很多？", "왜 어떤 중국 투어는 훨씬 저렴한가요?"),
        answer: tr(
          "Before comparing a cheaper China tour with Homeground's 14-day private prices, check group size, hotel grade, named admissions, trains, domestic flights and shopping stops. Our price includes twin-share hotels with breakfast and the listed domestic transport; the hotel note on each route shows where a four-star or 4-diamond property is available. There are no shopping stops.",
          "比较中国团价格时，先看清人数、酒店等级、景点门票、高铁和国内机票有没有含，也看行程有没有购物店。Homeground 的 14 天私家团含两人一间的酒店早餐和列明的境内交通，不进购物店。各线路酒店说明会写清哪些地方能安排 4 星或携程 4 钻酒店。",
          "더 저렴한 중국 투어와 Homeground의 14일 프라이빗 요금을 비교할 때는 인원, 호텔 등급, 명소 입장권, 열차·국내선 포함 여부, 쇼핑 방문을 함께 보세요. 저희 요금에는 2인 1실 호텔과 조식, 일정에 적힌 중국 내 교통이 포함되며 쇼핑 일정은 없습니다. 4성급 또는 4다이아 등급 호텔을 이용할 수 있는 곳은 각 상품의 숙소 안내에 적혀 있습니다.") },
    ] },
    { id: "links", type: "internal-links", title: tr("See the routes behind these prices", "查看这些价格对应的线路", "요금에 해당하는 일정 보기"), items: [
      { label: bySlug[S.c14].title[loc], href: tourHref(loc, S.c14) },
      { label: bySlug[S.c14g].title[loc], href: tourHref(loc, S.c14g) },
      { label: bySlug[S.c10].title[loc], href: tourHref(loc, S.c10) },
      { label: bySlug[S.yz].title[loc], href: tourHref(loc, S.yz) },
      { label: tr("China small-group tours 2027: dates and prices", "2027 年中国小团：日期与价格", "2027 중국 소규모 그룹 투어: 날짜와 요금"), href: guideHref(loc, "china-small-group-tours-2027") },
      { label: tr("Best 2-week China tour: four routes compared", "中国两周游：四条 14 天线路比较", "중국 2주 투어: 14일 일정 4개 비교"), href: guideHref(loc, "best-2-week-china-tour") },
      { label: tr("How much does a China trip cost if you plan it yourself?", "自己安排的话，中国行要花多少钱？", "직접 계획하면 중국 여행 비용은 얼마인가요?"), href: guideHref(loc, "how-much-does-a-china-trip-cost") },
    ] },
    { id: "sources", type: "sources", title: tr("Published price sources", "公布价格来源", "공개 요금 출처"), items: [
      { label: bySlug[S.h14].title[loc], url: `https://homegroundchina.com${tourHref(loc, S.h14)}`, publisher: "Homeground China", reviewedAt: TODAY },
      { label: bySlug[S.c14].title[loc], url: `https://homegroundchina.com${tourHref(loc, S.c14)}`, publisher: "Homeground China", reviewedAt: TODAY },
      { label: bySlug[S.l14g].title[loc], url: `https://homegroundchina.com${tourHref(loc, S.l14g)}`, publisher: "Homeground China", reviewedAt: TODAY },
      { label: bySlug[S.c14g].title[loc], url: `https://homegroundchina.com${tourHref(loc, S.c14g)}`, publisher: "Homeground China", reviewedAt: TODAY },
    ] },
  ];
}

export { pair, perDayValue, fmtPlain, costBody, departures, dateRange, route, bySlug, S, price, sgPrice, money, moneyUsd, supplementMoney, tourHref, guideHref, t, daysLabel, rows };

// ------------------------------------------------------------------------
// Guide 2: every 2027 small-group departure
// ------------------------------------------------------------------------
function smallGroupBody(loc) {
  const tr = (en, zh, ko) => ({ en, zh, ko })[loc];
  const P = (slug, n) => price(slug, loc, n);
  const table = departures.map(([slug, a, b, sup]) => [dateRange(loc, a, b), route[slug][loc], daysLabel(loc, slug), sgPrice(loc, slug), supplementMoney(loc, sup)]);
  return [
    { id: "lead", type: "lead", text: tr(
      `A place on Homeground's 2027 China small groups starts at ${sgPrice(loc, S.l14g)} per person, sharing a room; international flights are extra. There are ${departures.length} departures across four routes between April and October, with 8–12 people on each. We check the numbers 45 days before departure. If fewer than eight guests have booked, you can take back everything paid to us or ask for a written private-tour quote for your own party on the same dates.`,
      `Homeground 2027 年中国小团，两人一间每人 ${sgPrice(loc, S.l14g)} 起，不含国际机票。4 月到 10 月有四条线路、${departures.length} 个出发日，每团 8–12 人。我们会在出发前 45 天核对人数。若还不到 8 人，你可拿回已付给我们的全部款项，或请我们按实际同行人数书面报私家团价，原日期出发。`,
      `Homeground의 2027년 중국 소규모 그룹은 2인 1실 기준 1인 ${sgPrice(loc, S.l14g)}부터입니다. 국제선은 별도입니다. 4월부터 10월까지 네 일정에서 ${departures.length}회 출발하고 한 그룹에 8~12명이 함께합니다. 출발 45일 전에 인원을 확인합니다. 8명 미만이면 저희에게 낸 금액을 모두 돌려받거나, 원래 날짜에 함께 갈 인원에 맞춘 프라이빗 투어 서면 견적을 요청할 수 있습니다.`) },
    { id: "dates-heading", type: "heading", level: 2, text: tr("All 2027 departures", "2027 年全部出发日期", "2027년 전체 출발일") },
    { id: "dates", type: "table",
      caption: tr("Starting price per person, twin share; international flights and possible holiday surcharges extra", "每人起价，两人一间；国际机票另计，节假日可能有附加费", "2인 1실 기준 1인 시작가; 국제선과 공휴일 추가금은 별도"),
      columns: tr(["Dates", "Route", "Length", "Per person", "Own room from"], ["日期", "路线", "天数", "每人", "单房差起价"], ["날짜", "일정", "기간", "1인", "1인실 추가금"]),
      rows: table },
    { id: "rules-heading", type: "heading", level: 2, text: tr("How the group rules work", "小团规则", "소규모 그룹 운영 규칙") },
    { id: "rules", type: "list", items: tr(
      ["Eight booked guests confirm the departure; twelve is the maximum.", "We check numbers 45 days before departure. Below eight, you choose a full refund of everything paid to us or request a written private-tour quote for your own party on the same dates.", "The table assumes two people share a room. Solo guests pay the single-room supplement and have their own room, and on the Yangtze route their own cabin too; we do not pair strangers.", "If your own party has 8–12 people, you can choose the date and still pay the small-group rate.", "Until the departure is confirmed, choose international flights you can change or refund."],
      ["有 8 人报名就确认出团，最多收 12 人。", "出发前 45 天核对人数。不到 8 人，你可以拿回已付给我们的全部款项，或请我们按实际同行人数书面报私家团价，保留原日期。", "表中价格按两人一间计算。一个人报名需补单房差，自己住一间；长江线还自己住一间船舱。我们不会安排陌生人拼房。", "如果你们本来就有 8–12 人，可以自己选日期，价格仍按小团价算。", "确认成团之前，国际机票尽量选能改签或退款的。"],
      ["8명이 예약하면 출발이 확정되고 최대 12명까지 받습니다.", "출발 45일 전에 인원을 확인합니다. 8명 미만이면 저희에게 낸 금액을 전액 환불받거나 원래 날짜에 함께 갈 인원에 맞춘 프라이빗 투어 서면 견적을 요청할 수 있습니다.", "표의 요금은 2인 1실 기준입니다. 혼자 참가하면 1인실 추가금을 내고 방을 혼자 쓰며, 양쯔강 일정은 선실도 혼자 씁니다. 모르는 사람과 한 방을 배정하지 않습니다.", "일행이 8~12명이라면 날짜를 직접 고르고 소규모 그룹 요금을 적용받을 수 있습니다.", "출발이 확정되기 전에는 변경이나 환불이 가능한 국제선을 예약하세요."]) },
    { id: "includes-heading", type: "heading", level: 2, text: tr("What a small group includes", "小团包含什么", "소규모 그룹에 포함된 것") },
    { id: "includes", type: "paragraph", text: tr(
      "Breakfast is included each hotel night. The hotel plan follows the matching private route: four-star or Trip.com 4-diamond where available, with suitable local hotels at some smaller stops. In each city, the group has an English-speaking local guide and a vehicle on touring days; the named sights and the route's listed trains, flights or cruise are covered too. One arrival and one departure transfer are included on the group dates, with no shopping stops. On the Li River day, you cruise about four hours to Yangshuo while your luggage travels there by vehicle.",
      "每晚酒店都含早餐，住宿沿用对应私家线的安排：有条件的城市按 4 星或携程 4 钻标准，个别小城市选当地合适酒店。游览日有当地英语导游和团车，列明的景点首道门票、高铁、国内航班或游轮也在团费里。团期当天含一次抵达接送、一次离开接送，不进购物店。漓江那天，人在船上约 4 小时到阳朔，行李走陆路。",
      "호텔에서는 매일 조식을 제공합니다. 숙소는 같은 노선의 프라이빗 투어와 같습니다. 가능한 도시에서는 4성급 또는 트립닷컴 4다이아 등급을 기준으로 하고, 일부 소도시에서는 적절한 현지 호텔을 이용합니다. 관광일에는 도시별 영어 현지 가이드와 그룹 차량이 함께합니다. 일정에 적힌 명소의 첫 입장권과 열차·국내선 또는 크루즈도 포함됩니다. 그룹 출발일에는 도착과 출발 픽업이 각각 한 번씩 있고 쇼핑 일정은 없습니다. 리강 유람선 날에는 배로 약 4시간 양숴에 가고 짐은 차량으로 따로 옮깁니다.") },
    { id: "choose-heading", type: "heading", level: 2, text: tr("Small group or private tour?", "小团还是私家团？", "소규모 그룹과 프라이빗 투어 중 무엇을 고를까") },
    { id: "choose", type: "table",
      caption: tr("Per person for two travellers, twin share", "两人同行每人价格，两人一间", "2명 기준 1인 요금, 2인 1실"),
      columns: tr(["Route", "Small group", "Private tour"], ["路线", "小团", "私家团"], ["일정", "소규모 그룹", "프라이빗 투어"]),
      rows: [[S.l14g, S.l14], [S.c14g, S.c14], [S.silkg, S.silk], [S.yzg, S.yz]].map(([g, p]) => [route[g][loc], sgPrice(loc, g), P(p, 2)]) },
    { id: "choose-note", type: "paragraph", text: tr(
      "Fixed dates work well for a solo guest or couple who likes company on the road. If you have children or older parents, a private departure lets the guide adjust the walking and the start time for your party.",
      "一个人或两个人出行，日期能配合，也想有旅伴，小团很合适。带孩子或年长父母的话，私家团更方便调整步行量和每天出发时间。",
      "혼자 또는 둘이 가고 정해진 날짜가 맞으며 여행 동행이 있으면 좋다면 소규모 그룹이 편합니다. 아이나 연세 있는 부모님과 간다면 프라이빗 투어에서 걷는 양과 하루 시작 시간을 일행에 맞춰 조정할 수 있습니다.") },
    { id: "holidays", type: "callout", tone: "warning", title: tr("Dates to watch", "需要留意的日期", "주의할 날짜"), body: tr(
      "The September departures include Mid-Autumn Festival on 15 September 2027. Allow for busier trains and sights. The April Zhangjiajie group ends on 30 April, just before the 1 May public holiday; book the flight home early. China's detailed 2027 holiday arrangement has not yet been announced.",
      "4 月张家界团在 4 月 30 日结束，第二天是五一法定假日，回程机票早点订。9 月几个团则会碰上 2027 年 9 月 15 日中秋节，车票和景点可能更紧张。2027 年具体调休安排还没公布。",
      "9월 출발 그룹은 2027년 9월 15일 중추절과 겹칩니다. 열차와 명소가 붐빌 수 있어 이동 시간을 여유 있게 잡는 편이 좋습니다. 4월 장가계 그룹은 4월 30일에 끝나고 다음 날이 노동절 법정 공휴일이니 귀국 항공편을 일찍 예약하세요. 중국의 2027년 세부 연휴 일정은 아직 발표되지 않았습니다.") },
    { id: "faq", type: "faq", title: tr("Questions about small-group tours", "关于小团的常见问题", "소규모 그룹에 대해 자주 묻는 질문"), items: [
      { question: tr("Is there a tour leader for the whole trip?", "有全程领队吗？", "전 일정 동행하는 인솔자가 있나요?"),
        answer: tr(
          "An English-speaking local guide joins Homeground's 2027 small group for touring days in each city. No leader accompanies the whole tour. On a train or flight day, drivers handle the station or airport handoff at both ends.",
          "Homeground 2027 年小团每到一座城市，游览日由当地英语导游带团，没有一位领队从头跟到尾。坐高铁或飞机转场时，出发地司机送到车站或机场，目的地司机负责接。",
          "Homeground의 2027년 소규모 그룹은 도시별 관광일에 영어 현지 가이드의 안내를 받습니다. 처음부터 끝까지 동행하는 인솔자는 없습니다. 열차나 항공편으로 이동하는 날에는 출발지 기사가 역·공항까지 데려다주고 도착지 기사가 맞이합니다.") },
      { question: tr("What happens if a group does not fill?", "不成团怎么办？", "인원이 차지 않으면 어떻게 되나요?"),
        answer: tr(
          "At the 45-day check, a Homeground 2027 small group needs eight booked guests. If it is short, we contact you with two options: every payment made to us back in full, or a written private-tour quote for your own party on the original dates. You decide after seeing the quote.",
          "Homeground 2027 年小团在出发前 45 天核对人数。不到 8 人，我们会联系你：已付给我们的钱全额退回，或保留原日期，按实际同行人数书面报私家团价。看到报价后再决定。",
          "Homeground의 2027년 소규모 그룹은 출발 45일 전에 예약 인원을 확인합니다. 8명에 못 미치면 연락을 드리고, 저희에게 낸 금액을 모두 돌려받거나 원래 날짜에 함께 갈 인원에 맞춘 프라이빗 투어 서면 견적을 드립니다. 견적을 본 뒤 선택할 수 있습니다.") },
      { question: tr("Can I join on my own?", "一个人可以报名吗？", "혼자 참가할 수 있나요?"),
        answer: tr(
          `Solo guests can join Homeground's 2027 small groups. The 14-day Zhangjiajie group starts at ${sgPrice(loc, S.l14g)} per person, plus a single-room supplement from ${groupSupplement(loc, S.l14g)}. The Yangtze group's supplement starts at ${groupSupplement(loc, S.yzg)} and covers both a room and a cabin to yourself. We do not pair strangers in a room or cabin.`,
          `一个人可以报名 Homeground 2027 年小团。14 天张家界小团每人 ${sgPrice(loc, S.l14g)} 起，再加 ${groupSupplement(loc, S.l14g)} 起的单房差。长江小团的单房差从 ${groupSupplement(loc, S.yzg)} 起，含单人住酒店和单人住舱。我们不会安排陌生人拼房或拼舱。`,
          `Homeground의 2027년 소규모 그룹에는 혼자 참가할 수 있습니다. 14일 장가계 그룹은 1인 ${sgPrice(loc, S.l14g)}부터이며 1인실 추가금은 ${groupSupplement(loc, S.l14g)}부터입니다. 양쯔강 그룹은 추가금이 ${groupSupplement(loc, S.yzg)}부터이며 호텔 객실과 선실을 혼자 쓰는 비용이 포함됩니다. 모르는 사람과 객실이나 선실을 함께 쓰도록 배정하지 않습니다.`) },
      { question: tr("Are international flights included?", "含国际机票吗？", "국제선이 포함되나요?"),
        answer: tr(
          "Book the flights to and from China separately. Homeground's 2027 small-group fare pays for the trip between your arrival and departure in China. The trains and domestic flights named on each route are included; the 17-day Yangtze route also includes its cruise.",
          "往返中国的国际机票，你要另外订。Homeground 2027 年小团团费从落地中国算到离开中国，列明的高铁和国内航班已含。17 天长江线还含游轮。",
          "중국에 오는 항공편과 돌아가는 항공편은 따로 예약해야 합니다. Homeground의 2027년 소규모 그룹 요금은 중국 도착 후부터 출국 전까지의 일정에 해당합니다. 각 일정에 적힌 열차와 국내선이 포함되고, 17일 양쯔강 일정에는 크루즈도 포함됩니다.") },
    ] },
    { id: "links", type: "internal-links", title: tr("Small-group routes", "小团线路", "소규모 그룹 일정"), items: [
      ...[S.c14g, S.l14g, S.silkg, S.yzg].map((slug) => ({ label: bySlug[slug].title[loc], href: tourHref(loc, slug) })),
      { label: tr("What a 2-week China tour costs", "中国两周游要多少钱", "중국 2주 투어 비용"), href: guideHref(loc, "china-2-week-tour-cost") },
      { label: tr("Best 2-week China tour: four routes compared", "中国两周游：四条 14 天线路比较", "중국 2주 투어: 14일 일정 4개 비교"), href: guideHref(loc, "best-2-week-china-tour") },
    ] },
    { id: "sources", type: "sources", title: tr("Official route and holiday sources", "线路与节日日期来源", "일정과 공휴일 공식 자료"), items: [
      { label: tr("Li River cruise route and approximate duration", "漓江精华游线路与约 4 小时船程", "리강 유람선 경로와 약 4시간 소요"), url: "https://www.liriver.com.cn/page/article/zxlj.jqdt/126", publisher: tr("Li River Scenic Area", "桂林漓江景区", "구이린 리강 관광지"), reviewedAt: TODAY },
      { label: tr("2027 Mid-Autumn Festival date", "2027 年中秋节日期", "2027년 중추절 날짜"), url: "https://weather.sz.gov.cn/zhuanti/2023zhongqiuguanshangzhinan/index.html", publisher: tr("Shenzhen Meteorological Bureau", "深圳市气象局", "선전시 기상국"), reviewedAt: TODAY },
      { label: tr("Statutory May Day holiday dates", "劳动节法定放假日期", "노동절 법정 공휴일 날짜"), url: "https://rsj.gz.gov.cn/zcfg/flfg/content/post_10803356.html", publisher: tr("Guangzhou Human Resources and Social Security Bureau", "广州市人力资源和社会保障局", "광저우시 인력자원사회보장국"), reviewedAt: TODAY },
    ] },
  ];
}

// ------------------------------------------------------------------------
// Guide 3: four 14-day private routes compared
// ------------------------------------------------------------------------
function compareBody(loc) {
  const tr = (en, zh, ko) => ({ en, zh, ko })[loc];
  const P = (slug, n) => price(slug, loc, n);
  const four = [S.c14, S.l14, S.y14, S.h14];
  const facts = {
    [S.c14]: tr(["Chengdu, Guilin/Yangshuo, Shanghai", "2 trains, 2 flights", "Easy to moderate", "Apr–May, Sep–Oct"], ["成都、桂林/阳朔、上海", "2 段高铁，2 段航班", "轻松到中等", "4–5 月、9–10 月"], ["청두, 구이린/양숴, 상하이", "고속철도 2구간, 항공 2구간", "쉬움~보통", "4~5월, 9~10월"]),
    [S.l14]: tr(["Zhangjiajie, Guilin/Yangshuo, Shanghai", "2 trains incl. a 7-hour one, 2 flights", "Moderate: stairs in Zhangjiajie", "Apr–May, Sep–Oct"], ["张家界、桂林/阳朔、上海", "2 段高铁（含一段约 7 小时），2 段航班", "中等：张家界台阶多", "4–5 月、9–10 月"], ["장가계, 구이린/양숴, 상하이", "고속철도 2구간(약 7시간 1구간 포함), 항공 2구간", "보통: 장가계 계단", "4~5월, 9~10월"]),
    [S.y14]: tr(["Kunming, Dali, Lijiang, Shangri-La", "4 trains, 2 flights, 1 long drive", "Moderate; Shangri-La nights around 3,300 m; mountain cable car may go higher", "Mar–May, Sep–Nov"], ["昆明、大理、丽江、香格里拉", "4 段火车，2 段航班，1 段长途车", "中等；香格里拉住宿地约 3,300 米，上山索道若开放可能更高", "3–5 月、9–11 月"], ["쿤밍, 다리, 리장, 샹그릴라", "열차 4구간, 항공 2구간, 장거리 차량 1회", "보통; 샹그릴라 숙박지는 약 3,300m, 산 케이블카 운영 시 더 높아질 수 있음", "3~5월, 9~11월"]),
    [S.h14]: tr(["Huangshan, Hangzhou, Suzhou, Shanghai", "4 trains incl. a 7-hour one, flight only when it fits", "Moderate: a stair-heavy summit day", "Apr–May, Sep–Nov"], ["黄山、杭州、苏州、上海", "4 段高铁（含一段约 7 小时），日期合适才坐飞机", "中等：黄山登顶台阶多", "4–5 月、9–11 月"], ["황산, 항저우, 쑤저우, 상하이", "고속철도 4구간(약 7시간 1구간 포함), 날짜가 맞을 때만 항공", "보통: 계단이 많은 황산 정상", "4~5월, 9~11월"]),
  };
  const cols = tr(["Route", "After Beijing and Xi'an", "Main transport", "Walking and altitude", "Best months", "From (2 travellers)"], ["路线", "北京、西安之后", "主要交通", "步行与海拔", "最佳月份", "2 人同行每人起价"], ["일정", "베이징·시안 이후", "주요 교통", "걷기와 고도", "추천 시기", "2명 기준 1인"]);
  const why = {
    [S.c14]: tr(
      `For a first visit, we would start with Beijing, Xi'an, Chengdu, Guilin and Shanghai. You see the Great Wall and Terracotta Warriors, then pandas and the Li River without the longer mountain walking days. It is ${P(S.c14, 2)} per person for two, or ${P(S.c14, 6)} for six.`,
      `第一次来中国，我们会先推北京、西安、成都、桂林、上海这条线。长城和兵马俑之后看大熊猫、坐漓江游船，不用安排很长的登山日。2 人同行每人 ${P(S.c14, 2)}，6 人每人 ${P(S.c14, 6)}。`,
      `베이징·시안·청두·구이린·상하이 14일 일정은 만리장성과 병마용을 본 뒤 판다와 리강 유람선으로 이어집니다. 산에서 오래 걷는 날이 없어 첫 중국 여행이라면 이 코스를 먼저 권합니다. 1인 요금은 2명일 때 ${P(S.c14, 2)}, 6명일 때 ${P(S.c14, 6)}입니다.`),
    [S.l14]: tr(
      `The Zhangjiajie route spends three nights near Zhangjiajie National Forest Park and Tianmen Mountain before continuing to the Li River. You trade the Chengdu panda stop for sandstone peaks, more stone steps and a direct train to Guilin that takes about seven hours. It starts at ${P(S.l14, 2)} per person for two, or ${P(S.l14, 6)} for six.`,
      `张家界线在张家界国家森林公园和天门山附近住三晚，再去漓江。它把成都大熊猫换成砂岩峰林，台阶多一些，张家界到桂林的直达高铁也要约 7 小时。2 人同行每人 ${P(S.l14, 2)} 起，6 人每人 ${P(S.l14, 6)}。`,
      `청두 판다를 빼고 산 풍경을 넣고 싶다면 장가계 일정이 맞습니다. 장가계 국가삼림공원과 천문산 근처에서 3박한 다음 리강으로 갑니다. 돌계단이 많고 구이린행 직행 열차에 약 7시간을 쓰는 날도 있습니다. 1인 요금은 2명일 때 ${P(S.l14, 2)}부터, 6명일 때 ${P(S.l14, 6)}입니다.`),
    [S.y14]: tr(
      `Yunnan is for travellers who want Dali, Lijiang and Shangri-La more than Shanghai. The road via Tiger Leaping Gorge takes about five to six hours with stops, and Shangri-La is around 3,300 metres above sea level. Allow for the altitude. The 14-day route is ${P(S.y14, 2)} per person for two and ${P(S.y14, 6)} for six.`,
      `云南线从大理、丽江走到香格里拉，适合更想看古城和山的人。经虎跳峡去香格里拉那天，连停留约坐车 5–6 小时，终点海拔约 3,300 米，得把适应海拔算进去。14 天行程 2 人同行每人 ${P(S.y14, 2)}，6 人每人 ${P(S.y14, 6)}。`,
      `윈난 일정은 상하이보다 다리·리장·샹그릴라에 시간을 쓰고 싶은 분께 맞습니다. 호도협을 거쳐 샹그릴라로 가는 날은 중간에 들르는 시간을 포함해 차량 이동이 약 5~6시간이고, 샹그릴라는 해발 약 3,300m입니다. 14일 요금은 2명 기준 1인 ${P(S.y14, 2)}, 6명 기준 ${P(S.y14, 6)}입니다.`),
    [S.h14]: tr(
      `Huangshan takes a full mountain day, then the route eases into West Lake, Suzhou and three nights in Shanghai. The Xi'an–Huangshan train takes about seven hours; a flight is used only if it runs on your dates. At ${P(S.h14, 2)} per person for two or ${P(S.h14, 6)} for six, this is the lowest-priced of the four.`,
      `黄山线留一整天上山，再慢慢走西湖、苏州，最后在上海住三晚。西安到黄山的高铁约 7 小时，只有日期碰得上航班才改坐飞机。2 人同行每人 ${P(S.h14, 2)}，6 人每人 ${P(S.h14, 6)}，是四条里价格最低的。`,
      `황산 일정은 산에서 하루를 보낸 다음 서호와 쑤저우를 거쳐 상하이에서 3박합니다. 시안에서 황산까지 열차로 약 7시간이며, 날짜에 맞는 항공편이 있을 때만 비행기를 이용합니다. 2명 기준 1인 ${P(S.h14, 2)}, 6명 기준 ${P(S.h14, 6)}으로 네 일정 중 요금이 가장 낮습니다.`),
  };
  const sectionIds = { [S.c14]: "classic", [S.l14]: "landscapes", [S.y14]: "yunnan", [S.h14]: "huangshan" };
  const sections = four.flatMap((slug) => [
    { id: `${sectionIds[slug]}-heading`, type: "heading", level: 2, text: bySlug[slug].title[loc] },
    { id: `${sectionIds[slug]}`, type: "paragraph", text: why[slug] },
  ]);
  return [
    { id: "lead", type: "lead", text: tr(
      `Homeground's four 14-day private China tours have published starting prices of ${priceRange(loc, P(S.h14, 2), P(S.c14, 2))} per person for two sharing a room, before international flights. All begin in Beijing and Xi'an. For a first visit, we would start with Chengdu and the Li River; Zhangjiajie adds longer walking days, Yunnan adds altitude, and Huangshan trades a long train day for gardens and West Lake.`,
      `Homeground 四条 14 天中国私家线，2 人同行、两人一间，每人 ${priceRange(loc, P(S.h14, 2), P(S.c14, 2))}，国际机票另算。四条都先走北京和西安。第一次来，我们会先推成都加漓江的经典线。张家界要多走台阶，云南要适应海拔，黄山线则用一段长高铁换来园林和西湖。`,
      `Homeground의 14일 중국 프라이빗 투어 네 가지는 2명, 2인 1실 기준 1인 ${priceRange(loc, P(S.h14, 2), P(S.c14, 2))}이며 국제선은 별도입니다. 모두 베이징과 시안에서 시작합니다. 첫 여행에는 청두와 리강을 넣은 대표 일정을 권합니다. 장가계는 걷는 양이 많고, 윈난은 고도에 적응해야 합니다. 황산 일정에는 긴 열차 이동일이 있지만 정원과 서호도 볼 수 있습니다.`) },
    { id: "compare-heading", type: "heading", level: 2, text: tr("The four routes side by side", "四条线路对比", "네 일정 한눈에 비교") },
    { id: "compare", type: "table", caption: tr("14 days and 13 nights each; per person, twin share, land only", "每条 14 天 13 晚；每人价格，两人一间，不含国际机票", "모두 13박 14일; 1인 요금, 2인 1실, 국제선 별도"), columns: cols,
      rows: four.map((slug) => [route[slug][loc], ...facts[slug], P(slug, 2)]) },
    ...sections,
    { id: "length-heading", type: "heading", level: 2, text: tr("Shorter or longer trips", "更短或更长的行程", "더 짧거나 긴 일정") },
    { id: "length", type: "list", items: [S.c10, S.j11, S.s13, S.silk, S.yz, S.g21].map((slug) => `${bySlug[slug].title[loc]}: ${tr(`from ${P(slug, 2)} per person for two travellers`, `2 人同行每人 ${P(slug, 2)} 起`, `2명 기준 1인 ${P(slug, 2)}부터`)}`) },
    { id: "small-group", type: "paragraph", text: tr(
      `The Beijing–Xi'an–Chengdu–Guilin–Shanghai and Zhangjiajie 14-day routes also have fixed 2027 small-group departures for 8–12 guests. The lower of the two group prices is ${sgPrice(loc, S.l14g)} per person, twin share. Check the departure table before choosing a route; dates may settle the decision.`,
      `北京、西安、成都、桂林、上海经典线和张家界线，2027 年也有固定日期的 8–12 人小团。两条里较低的团费是每人 ${sgPrice(loc, S.l14g)}，两人一间。先看看出发日期，能配合的团期可能比路线喜好更影响选择。`,
      `베이징·시안·청두·구이린·상하이 대표 일정과 장가계 14일 일정은 2027년에 8~12명 정기 출발 그룹으로도 운영합니다. 두 그룹 중 낮은 요금은 2인 1실 기준 1인 ${sgPrice(loc, S.l14g)}입니다. 여행 날짜가 정해져 있다면 출발일 표부터 확인하세요.`) },
    { id: "faq", type: "faq", title: tr("Questions about choosing a 14-day route", "选 14 天线路的常见问题", "14일 일정 선택에 대해 자주 묻는 질문"), items: [
      { question: tr("Which 14-day China tour is best for a first trip?", "第一次去中国，哪条 14 天线最好？", "첫 중국 여행에는 어떤 14일 일정이 좋나요?"),
        answer: tr(`For a first visit, we would choose Homeground's 14-day Beijing–Xi'an–Chengdu–Guilin–Shanghai private tour. It puts the Great Wall, Terracotta Warriors, pandas and Li River into one route without Zhangjiajie's long stair days. The published price is ${P(S.c14, 2)} per person for two sharing a room, before international flights.`, `第一次来，我们会推荐 Homeground 北京、西安、成都、桂林、上海 14 天私家线。长城、兵马俑、大熊猫和漓江都能走到，少了张家界那种长时间爬台阶的日子。2 人同行、两人一间，每人 ${P(S.c14, 2)}，国际机票另算。`, `첫 중국 여행에는 Homeground의 베이징·시안·청두·구이린·상하이 14일 프라이빗 투어를 권합니다. 만리장성, 병마용, 판다와 리강을 보면서 장가계처럼 계단을 오래 걷는 날은 피할 수 있습니다. 2명, 2인 1실 기준 1인 ${P(S.c14, 2)}이며 국제선은 별도입니다.`) },
      { question: tr("Which route has the least travel time?", "哪条线路上时间最少？", "이동 시간이 가장 적은 일정은?"),
        answer: tr("Among Homeground's four 14-day private routes, Beijing–Xi'an–Chengdu–Guilin–Shanghai has the fewest long travel days. Its main rail legs are Beijing–Xi'an and Xi'an–Chengdu. Zhangjiajie–Guilin and Xi'an–Huangshan each take about seven hours by train; the Yunnan route spends more time on the road.", "Homeground 四条 14 天私家线里，北京、西安、成都、桂林、上海这条长途转场日最少。主要高铁是北京到西安、西安到成都。张家界到桂林、西安到黄山各约坐 7 小时高铁，云南线坐车时间更长。", "Homeground의 14일 프라이빗 일정 네 가지 중 긴 이동일이 가장 적은 것은 베이징·시안·청두·구이린·상하이 일정입니다. 주요 열차 이동은 베이징~시안, 시안~청두입니다. 장가계~구이린과 시안~황산은 열차로 각각 약 7시간이고 윈난은 차량 이동이 더 깁니다.") },
      { question: tr("Which route has the least walking?", "哪条线路走路最少？", "걷는 양이 가장 적은 일정은?"),
        answer: tr("The 14-day Beijing–Xi'an–Chengdu–Guilin–Shanghai private tour has the lightest walking of these four routes. Zhangjiajie National Forest Park and Huangshan involve long stone stair sections, while Yunnan adds altitude. Tell us about mobility limits before booking so we can shorten walking days.", "四条 14 天私家线里，北京、西安、成都、桂林、上海经典线走路最轻松。张家界国家森林公园和黄山有长段石阶，云南还要考虑海拔。若有人行动不便，订行程前告诉我们，我们可以缩短步行日。", "14일 프라이빗 일정 네 가지 중 베이징·시안·청두·구이린·상하이 일정이 걷는 양이 가장 적습니다. 장가계 국가삼림공원과 황산에는 긴 돌계단이 있고 윈난은 고도까지 고려해야 합니다. 걷기 어려운 분이 있다면 예약 전에 알려 주세요. 걷는 날을 줄여 드릴 수 있습니다.") },
      { question: tr("Can we combine two routes?", "可以把两条线合在一起吗？", "두 일정을 합칠 수 있나요?"),
        answer: tr(`Homeground's 21-day Grand China private tour already joins the classic cities with Zhangjiajie and a three-night Yangtze cruise. It starts at ${P(S.g21, 2)} per person for two sharing a room, before international flights. For a different combination, we prepare a written quote.`, `Homeground 的 21 天中国全景私家线已把经典城市、张家界和三晚长江游轮接在一起。2 人同行、两人一间，每人 ${P(S.g21, 2)} 起，国际机票另算。想换别的组合，我们会另给书面报价。`, `장가계와 양쯔강 크루즈까지 한 번에 넣으려면 Homeground의 21일 중국 일주 프라이빗 투어를 보세요. 대표 도시를 함께 지나고 크루즈에서는 3박합니다. 두 사람이 한 방을 쓸 때 1인 ${P(S.g21, 2)}부터이며 국제선은 별도입니다. 다른 조합은 서면으로 견적을 드립니다.`) },
    ] },
    { id: "links", type: "internal-links", title: tr("Open a route", "查看线路", "일정 보기"), items: [
      ...four.map((slug) => ({ label: bySlug[slug].title[loc], href: tourHref(loc, slug) })),
      { label: tr("Plan a 14-day China itinerary yourself", "自己安排中国 14 天行程", "중국 13박 14일 일정 직접 짜기"), href: guideHref(loc, "china-14-day-itinerary") },
      { label: tr("What a 2-week China tour costs", "中国两周游要多少钱", "중국 2주 투어 비용"), href: guideHref(loc, "china-2-week-tour-cost") },
      { label: tr("China small-group tours 2027: dates and prices", "2027 年中国小团：日期与价格", "2027 중국 소규모 그룹 투어: 날짜와 요금"), href: guideHref(loc, "china-small-group-tours-2027") },
    ] },
    { id: "sources", type: "sources", title: tr("Official travel references", "行程资料来源", "일정 공식 참고 자료"), items: [
      { label: tr("Check train schedules for the travel date", "按出行日期查询列车时刻", "여행 날짜별 열차 시간 조회"), url: "https://kyfw.12306.cn/index", publisher: tr("China Railway 12306", "中国铁路 12306", "중국철도 12306"), reviewedAt: TODAY },
      { label: tr("Shangri-La Jiantang town altitude, about 3,300 metres", "香格里拉建塘镇海拔约 3,300 米", "샹그릴라 젠탕진 해발 약 3,300m"), url: "https://www.xianggelila.gov.cn/zfxxgk_xglls/fdzdgknr/gzdt/202508/20250801_231010.html", publisher: tr("Shangri-La City Government", "香格里拉市人民政府", "샹그릴라시 인민정부"), reviewedAt: TODAY },
    ] },
  ];
}

export { smallGroupBody, compareBody };

// ------------------------------------------------------------------------
// Writer
// ------------------------------------------------------------------------
const TODAY = "2026-09-25";
const GUIDES = [
  {
    id: "china-2-week-tour-cost", body: costBody, pillar: "budget-and-tradeoffs", family: "combined-decision", intent: "plan",
    topics: ["budget", "trip-planning", "first-trip", "route-design"],
    destinations: ["china", "beijing", "xian", "chengdu", "guilin", "zhangjiajie", "shanghai"],
    heroSlug: S.c14,
    searchTerms: { en: ["china tour cost 2 weeks", "how much is a 14 day china tour", "china private tour price", "china tour package price 2027"], zh: ["中国两周游多少钱", "中国私家团价格", "中国14天旅游费用"], ko: ["중국 2주 여행 비용", "중국 패키지 여행 가격", "중국 프라이빗 투어 가격"] },
    locales: {
      en: { title: "2-Week China Tour Cost: Private and 2027 Group Prices", headline: "What a 2-week China tour costs", description: `Published 14-day private tours from ${price(S.h14, "en", 2)} per person for two; 2027 small groups from ${sgPrice("en", S.l14g)}. See what the price covers.`, navTitle: "2-week China tour cost", featuredLinkLabel: "See what a 2-week China tour costs", cardTags: ["Published prices", "Private and small group", "Per person, land only"] },
      zh: { title: "中国两周游多少钱？私家团与 2027 年小团价格", headline: "中国两周游要多少钱", description: `14 天私家团公布价，2 人同行每人 ${price(S.h14, "zh", 2)} 起；2027 年小团每人 ${sgPrice("zh", S.l14g)} 起。看清人数、住宿和交通怎么算。`, navTitle: "中国两周游价格", featuredLinkLabel: "看看中国两周游要多少钱", cardTags: ["公布价格", "私家团与小团", "每人价格"] },
      ko: { title: "중국 2주 투어 비용: 프라이빗·2027년 그룹 요금", headline: "중국 2주 투어 비용 알아보기", description: `14일 프라이빗 투어는 2명 기준 1인 ${price(S.h14, "ko", 2)}부터, 2027년 소규모 그룹은 ${sgPrice("ko", S.l14g)}부터입니다. 포함 내역과 인원별 요금을 비교하세요.`, navTitle: "중국 2주 투어 비용", featuredLinkLabel: "중국 2주 투어 비용 보기", cardTags: ["공개 요금", "프라이빗·소규모 그룹", "1인 요금"] },
    },
    boundary: "Published per-person prices for Homeground's 10- to 21-day private tours and 2027 small groups, what they include and why they change with group size; excludes independent-travel budgets, owned by how-much-does-a-china-trip-cost.",
  },
  {
    id: "china-small-group-tours-2027", body: smallGroupBody, pillar: "traveller-fit", family: "combined-decision", intent: "plan",
    topics: ["trip-planning", "first-trip", "route-design"],
    destinations: ["china", "beijing", "xian", "chengdu", "guilin", "zhangjiajie", "shanghai"],
    heroSlug: S.c14g,
    searchTerms: { en: ["china small group tour 2027", "small group tours of china", "china group tour dates 2027"], zh: ["中国小团 2027", "中国小团游", "中国精品小团"], ko: ["중국 소규모 그룹 투어", "중국 소그룹 여행 2027", "중국 패키지 출발일"] },
    locales: {
      en: { title: "China Small-Group Tours 2027: Dates, Prices and Rules", headline: "Every 2027 China small-group departure", description: `${departures.length} departures in 2027 on 14- to 17-day China routes for 8–12 guests, from ${sgPrice("en", S.l14g)} per person. Dates and refund rule inside.`, navTitle: "China small-group tours 2027", featuredLinkLabel: "See 2027 small-group dates", cardTags: [`${departures.length} departures`, "8–12 guests", "Full refund if it does not run"] },
      zh: { title: "2027 年中国小团：出团日期、价格与规则", headline: "2027 年中国小团全部出发日期", description: `Homeground 2027 年 ${departures.length} 个小团出发日，14–17 天，8–12 人，每人 ${sgPrice("zh", S.l14g)} 起。查看日期、单房差与不足 8 人的退款规则。`, navTitle: "2027 中国小团", featuredLinkLabel: "查看 2027 年小团日期", cardTags: [`${departures.length} 个出发日`, "8–12 人", "不成团全额退款"] },
      ko: { title: "2027 중국 소규모 그룹 투어: 출발일·요금·규칙", headline: "2027년 중국 소규모 그룹 전체 출발일", description: `Homeground 2027년 소규모 그룹 ${departures.length}회 출발, 14~17일, 8~12명, 1인 ${sgPrice("ko", S.l14g)}부터. 날짜와 인원 미달 시 환불 규칙을 확인하세요.`, navTitle: "2027 중국 소규모 그룹", featuredLinkLabel: "2027 소규모 그룹 날짜 보기", cardTags: [`${departures.length}회 출발`, "8~12명", "미출발 시 전액 환불"] },
    },
    boundary: "Every 2027 Homeground small-group departure with dates, prices, single supplements and the 8-guest/45-day refund rule; excludes private-tour pricing detail (china-2-week-tour-cost) and route choice (best-2-week-china-tour).",
  },
  {
    id: "best-2-week-china-tour", body: compareBody, pillar: "routes-and-pace", family: "comparison", intent: "compare",
    topics: ["route-design", "first-trip", "trip-planning", "trip-pace"],
    destinations: ["china", "beijing", "xian", "chengdu", "guilin", "zhangjiajie", "shanghai"],
    heroSlug: S.y14,
    searchTerms: { en: ["best 2 week china tour", "14 day china tour", "china tour 14 days", "best china tour itinerary 2 weeks"], zh: ["中国两周游路线", "中国14天私家团", "中国两周旅游路线推荐"], ko: ["중국 2주 투어 추천", "중국 14일 여행 코스", "중국 13박 14일 투어"] },
    locales: {
      en: { title: "Best 2-Week China Tour: Four 14-Day Routes Compared", headline: "Which 2-week China tour fits you?", description: `Four 14-day private China routes from ${price(S.h14, "en", 2)} per person for two. Compare Chengdu, Zhangjiajie, Yunnan and Huangshan by travel and walking time.`, navTitle: "Best 2-week China tour", featuredLinkLabel: "Compare four 14-day China tours", cardTags: ["Four routes", "Side-by-side table", "Prices for two"] },
      zh: { title: "中国两周游怎么选：四条 14 天私家线对比", headline: "哪条中国两周游线路适合你", description: `四条 14 天中国私家线，2 人同行每人 ${price(S.h14, "zh", 2)} 起。比较成都、张家界、云南和黄山线的交通、步行量与价格。`, navTitle: "中国两周游路线对比", featuredLinkLabel: "对比四条 14 天线路", cardTags: ["四条线路", "并排对比", "两人价格"] },
      ko: { title: "중국 2주 투어 비교: 14일 일정 4가지", headline: "나에게 맞는 중국 2주 투어는?", description: `14일 중국 프라이빗 일정 4가지, 2명 기준 1인 ${price(S.h14, "ko", 2)}부터. 청두, 장가계, 윈난, 황산의 이동과 걷기, 요금을 비교하세요.`, navTitle: "중국 2주 투어 비교", featuredLinkLabel: "14일 투어 4가지 비교하기", cardTags: ["일정 4가지", "한눈에 비교", "2명 요금"] },
    },
    boundary: "Compares Homeground's four bookable 14-day private routes by cities, transport, walking, season and price; excludes a self-planned day-by-day itinerary, owned by china-14-day-itinerary.",
  },
];
const OG = { en: "en_US", zh: "zh_CN", ko: "ko_KR" };
function write(outRoot) {
  for (const g of GUIDES) {
    const dir = path.join(outRoot, "content/guides", g.id);
    mkdirSync(dir, { recursive: true });
    for (const loc of L) {
      const body = { schemaVersion: "1.0.0", blocks: g.body(loc) };
      writeFileSync(path.join(dir, `body.${loc}.ts`), `import type { StructuredPageBody } from "../../../lib/content-system/page-body";\n\nconst body = ${JSON.stringify(body, null, 2)} as const satisfies StructuredPageBody;\n\nexport default body;\n`);
    }
    const hero = bySlug[g.heroSlug].heroImage;
    const meta = {
      id: g.id, type: "planning", pillar: g.pillar, audienceMarkets: ["global"], format: "decision-guide",
      topics: g.topics, destinations: g.destinations,
      heroImagePath: hero.src, heroImageUrl: `https://homegroundchina.com${hero.src}`, imageWidth: hero.width, imageHeight: hero.height,
      datePublished: TODAY, dateModified: TODAY, sourceReviewedDate: TODAY,
      searchTerms: g.searchTerms,
      search: { section: "plan", family: g.family, primaryIntent: g.intent },
      layout: { mode: "template", templateId: "editorial-v1" },
      locales: Object.fromEntries(L.map((loc) => [loc, {
        path: guideHref(loc, g.id), ...Object.fromEntries(["title", "headline", "description"].map((k) => [k, g.locales[loc][k]])),
        heroAlt: hero.alt[loc], navTitle: g.locales[loc].navTitle, featuredLinkLabel: g.locales[loc].featuredLinkLabel,
        openGraphLocale: OG[loc], cardTags: g.locales[loc].cardTags,
      }])),
    };
    writeFileSync(path.join(dir, "metadata.json"), JSON.stringify(meta, null, 2) + "\n");
    writeFileSync(path.join(dir, "image-plan.md"), `# Image plan: ${g.id}\n\nHero: \`${hero.src}\` (${hero.width} × ${hero.height}), reused from the product page \`/tours/${g.heroSlug}/\`. Its source, rights basis and hashes are recorded in \`docs/homeground-photo-provenance.md\` under the long-haul batches (owner-authorised local library). No new image was created for this guide.\n`);
    const externalSources = g.id === "china-small-group-tours-2027"
      ? `- The Li River scenic area's route notice gives an approximate four-hour cruise from Guilin to Yangshuo (https://www.liriver.com.cn/page/article/zxlj.jqdt/126).\n- The 15 September 2027 Mid-Autumn Festival date is listed by the Shenzhen Meteorological Bureau (https://weather.sz.gov.cn/zhuanti/2023zhongqiuguanshangzhinan/index.html).\n- The statutory 1–2 May Labour Day dates are set by the national holiday regulation, reproduced by the Guangzhou Human Resources and Social Security Bureau (https://rsj.gz.gov.cn/zcfg/flfg/content/post_10803356.html). The detailed 2027 holiday arrangement has not yet been announced.\n`
      : g.id === "best-2-week-china-tour"
        ? `- China Railway 12306 is the official place to verify train schedules for the travel date (https://kyfw.12306.cn/index). The approximately seven-hour rail legs repeat the product fact-check; 2027 timetables are not published yet.\n- Shangri-La City Government puts Jiantang town at about 3,300 metres above sea level (https://www.xianggelila.gov.cn/zfxxgk_xglls/fdzdgknr/gzdt/202508/20250801_231010.html).\n`
        : "";
    writeFileSync(path.join(dir, "source-log.md"), `# Source log: ${g.id}\n\nReviewed ${TODAY}.\n\n- Price amounts displayed in the proposed product data and fixed departure dates are read from \`lib/privateTourLongHaulProducts.ts\`. Regenerate the guide bodies when a long-haul price or date changes. Other figures, service rules, inclusions and route comparisons are written in the generator and must be reviewed against the product pages and supplier facts separately.\n- The product URLs are part of this proposed release; they remain unavailable on the live site until this branch is approved and deployed.\n- Travel times and site rules were checked against the product drafts on ${TODAY} (see the long-haul handoff). Recheck date-sensitive details before release.\n${externalSources}`);
    writeFileSync(path.join(dir, "seo-brief.md"), `# SEO brief: ${g.id}\n\nPrepared ${TODAY}. No new keyword-volume measurement was taken; the search terms are the phrasings travellers use with AI assistants and search for budget, date and route-choice questions, taken from the long-haul GEO audit.\n\n## Distinct content job\n\n${g.boundary}\n\n## Why a separate page\n\nGeneric questions such as how much a two-week tour costs, which 14-day route to choose, or which small groups run in 2027 are answered from guide and comparison pages rather than individual tour pages. This page states the facts in quotable sentences and tables and links to the product pages that hold the full itineraries.\n`);
  }
}
function renderFiles() {
  const files = {};
  for (const g of GUIDES) {
    for (const loc of L) {
      const body = { schemaVersion: "1.0.0", blocks: g.body(loc) };
      files[`content/guides/${g.id}/body.${loc}.ts`] = `import type { StructuredPageBody } from "../../../lib/content-system/page-body";\n\nconst body = ${JSON.stringify(body, null, 2)} as const satisfies StructuredPageBody;\n\nexport default body;\n`;
    }
  }
  return files;
}
if (process.argv.includes("--write")) write(ROOT);
export { GUIDES, write, renderFiles };
