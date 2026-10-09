import type { HomegroundLocale } from "./homegroundI18n";
import type { PublishedPrivateTourCatalogItem } from "./publishedPrivateTourCatalog";

const routeNights = {
  "harbin-yabuli-snow-town-6-day-private-tour": {
    en: "5 hotel nights · no sleeper train",
    zh: "5 晚酒店 · 不坐卧铺夜车",
    ko: "호텔 5박 · 야간 침대열차 없음",
  },
  "harbin-snow-town-changbaishan-yanji-8-day-private-tour": {
    en: "7 hotel nights · no sleeper train",
    zh: "7 晚酒店 · 不坐卧铺夜车",
    ko: "호텔 7박 · 야간 침대열차 없음",
  },
  "harbin-mohe-arctic-village-7-day-private-tour": {
    en: "4 hotel nights + 2 hard-sleeper train nights",
    zh: "4 晚酒店 + 2 晚硬卧夜车",
    ko: "호텔 4박 + 일반 침대열차 2박",
  },
  "harbin-snow-town-mohe-9-day-private-tour": {
    en: "6 hotel nights + 2 hard-sleeper train nights",
    zh: "6 晚酒店 + 2 晚硬卧夜车",
    ko: "호텔 6박 + 일반 침대열차 2박",
  },
  "yanji-changbaishan-wanda-6-day-private-tour": {
    en: "5 hotel nights · no sleeper train",
    zh: "5 晚酒店 · 不坐卧铺夜车",
    ko: "호텔 5박 · 야간 침대열차 없음",
  },
} as const satisfies Record<string, Record<HomegroundLocale, string>>;

export const northeastWinterComparisonCopy: Record<HomegroundLocale, {
  title: string;
  intro: string;
  route: string;
  nights: string;
  fit: string;
  travel: string;
  price: string;
  priceBasis: string;
  priceNote: string;
}> = {
  en: {
    title: "Compare five priced 2026–27 Northeast winter routes",
    intro: "Start with your overnight plan: the Harbin–Snow Town and Yanji–Changbai routes use hotels throughout, while the Mohe routes include two nights in hard-sleeper train berths.",
    route: "Route",
    nights: "Overnight plan",
    fit: "Best for",
    travel: "Travel commitment",
    price: "Low-season price",
    priceBasis: "Per person · 2 adults",
    priceNote: "These are per-person low-season prices for two adults sharing a room, on departures 10 Nov–19 Dec 2026 or 15 Feb–10 Mar 2027. Other party sizes, children, single rooms and the final total are confirmed in writing before payment. The separate Changbaishan–Yanji winter route in this collection is quoted on request.",
  },
  zh: {
    title: "五条 2026–27 东北冬季明码报价路线怎么选",
    intro: "先看住宿和交通：哈尔滨—雪乡及延吉—长白山路线全程住酒店；去漠河的路线含两晚硬卧夜车。",
    route: "路线",
    nights: "夜间安排",
    fit: "适合谁",
    travel: "交通取舍",
    price: "淡季参考价",
    priceBasis: "每人 · 两位成人同行",
    priceNote: "表中为两位成人同住一间时的淡季每人价，适用于 2026 年 11 月 10 日至 12 月 19 日或 2027 年 2 月 15 日至 3 月 10 日出发。其他人数、儿童、单房及最终总价，付款前书面确认。本页另有一条长白山—延吉冬季路线，价格需另行询问。",
  },
  ko: {
    title: "가격이 공개된 2026~27 동북 겨울 코스 5개 비교",
    intro: "먼저 숙박 방식을 고르세요. 하얼빈–설향과 연길–백두산 코스는 전 일정 호텔 숙박이며, 모허 코스는 일반 침대열차에서 2박합니다.",
    route: "코스",
    nights: "숙박 방식",
    fit: "추천 대상",
    travel: "이동 조건",
    price: "비수기 요금",
    priceBasis: "1인 · 성인 2명",
    priceNote: "표의 요금은 성인 2명 1실 기준 비수기 1인 요금으로, 2026년 11월 10일~12월 19일 또는 2027년 2월 15일~3월 10일 출발에 적용됩니다. 다른 인원, 아동, 1인실 및 최종 총액은 결제 전 서면으로 확인합니다. 이 목록의 별도 백두산–연길 겨울 코스는 문의 후 견적을 드립니다.",
  },
};

export function getNortheastWinterComparisonRows(
  tours: readonly PublishedPrivateTourCatalogItem[],
  locale: HomegroundLocale,
) {
  const bySlug = new Map(tours.map((tour) => [tour.slug, tour]));
  return Object.entries(routeNights).map(([slug, nights]) => {
    const tour = bySlug.get(slug);
    if (!tour || !tour.twoTravellerPrice) {
      throw new Error(`Missing published 2-traveller winter price: ${slug}`);
    }
    return { tour, nights: nights[locale] };
  });
}
