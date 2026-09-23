import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { shanghaiSuzhouAnswers, shanghaiSuzhouHangzhouAnswers } from "./jiangnanTourAnswers.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { privateTourExpansionProducts } from "./privateTourExpansionProducts.ts";

export type PrivateTourLocale = HomegroundLocale;
export type PrivateTourCurrency = "CNY" | "USD" | "KRW";
export type PrivateTourGuideMode = "guided" | "self-guided" | "standard";
export type LocalizedValue<T> = Readonly<Record<PrivateTourLocale, T>>;
export type LocalizedText = LocalizedValue<string>;
export type LocalizedStringList = LocalizedValue<readonly string[]>;

export interface PrivateTourPriceTier {
  travelers: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  cnyPerPerson: number;
  // An explicitly approved USD selling price bypasses the default USD10 rounding.
  usdPerPerson?: number;
  // Keep an externally published benchmark in its original currency instead of
  // presenting a temporary FX conversion as though it were a selling price.
  publishedPrice?: Readonly<{
    currency: PrivateTourCurrency;
    amountPerPerson: number;
  }>;
}

export interface PrivateTourPackage {
  id: string;
  guideMode: PrivateTourGuideMode;
  label: LocalizedText;
  summary: LocalizedText;
  /** True only when the supplier publishes no stable per-person price. */
  quoteOnly?: boolean;
  prices: readonly PrivateTourPriceTier[];
}

export interface PrivateTourDay {
  day: number;
  title: LocalizedText;
  description: LocalizedText;
}

export interface PrivateTourFaqItem {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface PrivateTourImage {
  src: string;
  width: number;
  height: number;
  objectPosition?: string;
  alt: LocalizedText;
  caption: LocalizedText;
}

export interface PrivateTourRouteMediaVariant {
  label: LocalizedText;
  image: PrivateTourImage;
}

export interface PrivateTourRouteMediaGroup {
  day: number;
  variants: readonly PrivateTourRouteMediaVariant[];
}

export interface PrivateTourProduct {
  id: string;
  slug: string;
  days: number;
  nights: number;
  servicePolicy: Readonly<{
    shoppingStops: false;
    addedServicesRequirePriorAgreement: true;
  }>;
  title: LocalizedText;
  // Search copy is separate from the controlled product and inquiry name.
  metadataTitle?: LocalizedText;
  metadataDescription?: LocalizedText;
  eyebrow: LocalizedText;
  lede: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedStringList;
  itinerary: readonly PrivateTourDay[];
  hotelNote: LocalizedText;
  serviceNote: LocalizedText;
  exclusions: LocalizedStringList;
  bookingNote: LocalizedText;
  faq?: readonly PrivateTourFaqItem[];
  heroImage: PrivateTourImage;
  gallery: readonly PrivateTourImage[];
  routeMedia?: readonly PrivateTourRouteMediaGroup[];
  packages: readonly PrivateTourPackage[];
  datePublished: string;
  dateModified: string;
  lastReviewed?: string;
}

export interface LocalizedPrivateTourImage {
  src: string;
  width: number;
  height: number;
  objectPosition?: string;
  alt: string;
  caption: string;
}

export interface LocalizedPrivateTourRouteMediaGroup {
  day: number;
  variants: readonly {
    label: string;
    image: LocalizedPrivateTourImage;
  }[];
}

export interface FormattedPrivateTourPrice {
  cny: number;
  amount: number;
  currency: PrivateTourCurrency;
  formatted: string;
}

export interface LocalizedPrivateTourPriceRow extends FormattedPrivateTourPrice {
  travelers: PrivateTourPriceTier["travelers"];
}

export interface LocalizedPrivateTourPackage {
  id: string;
  guideMode: PrivateTourGuideMode;
  label: string;
  summary: string;
  quoteOnly: boolean;
  rows: readonly LocalizedPrivateTourPriceRow[];
}

export interface LocalizedPrivateTourProduct {
  id: string;
  slug: string;
  locale: PrivateTourLocale;
  path: string;
  paths: LocalizedValue<string>;
  title: string;
  metadataTitle: string;
  metadataDescription: string;
  openGraphLocale: "en_US" | "zh_CN" | "ko_KR";
  eyebrow: string;
  lede: string;
  summary: string;
  highlights: readonly string[];
  days: number;
  nights: number;
  servicePolicy: PrivateTourProduct["servicePolicy"];
  itinerary: readonly { day: number; title: string; description: string }[];
  hotelNote: string;
  serviceNote: string;
  exclusions: readonly string[];
  bookingNote: string;
  faq?: readonly { question: string; answer: string }[];
  heroImage: LocalizedPrivateTourImage;
  gallery: readonly LocalizedPrivateTourImage[];
  routeMedia: readonly LocalizedPrivateTourRouteMediaGroup[];
  packages: readonly LocalizedPrivateTourPackage[];
  datePublished: string;
  dateModified: string;
  entityIds: Readonly<{
    product: string;
    offers: Readonly<Record<string, string>>;
  }>;
}

export const PRIVATE_TOUR_PRICE_CONVERSION = Object.freeze({
  // Deliberately more conservative than the 2026-08-21 official references
  // (USD 1 = CNY 6.7817; CNY 1 = KRW 210.76 cash sell in Seoul).
  // Foreign-currency amounts are then rounded upward for customer-facing use.
  cnyPerUsd: 6.5,
  krwPerCny: 215,
  usdRoundingUnit: 10,
  krwRoundingUnit: 10_000,
} as const);

function assertValidCny(cny: number): void {
  if (!Number.isFinite(cny) || cny <= 0) {
    throw new RangeError(
      `CNY price must be a positive finite number; received ${cny}.`,
    );
  }
}

export function assertConvertedPriceInvariant(
  cny: number,
  convertedAmount: number,
  currency: Exclude<PrivateTourCurrency, "CNY">,
): true {
  assertValidCny(cny);
  if (!Number.isFinite(convertedAmount) || convertedAmount <= 0) {
    throw new RangeError(
      `Converted price must be positive and finite; received ${convertedAmount}.`,
    );
  }

  const cnyEquivalent =
    currency === "USD"
      ? convertedAmount * PRIVATE_TOUR_PRICE_CONVERSION.cnyPerUsd
      : convertedAmount / PRIVATE_TOUR_PRICE_CONVERSION.krwPerCny;

  if (cnyEquivalent + Number.EPSILON < cny) {
    throw new RangeError(
      `${currency} ${convertedAmount} converts back to CNY ${cnyEquivalent}, below CNY ${cny}.`,
    );
  }
  return true;
}

export function convertCnyToUsd(cny: number): number {
  assertValidCny(cny);
  const amount =
    Math.ceil(
      cny /
        PRIVATE_TOUR_PRICE_CONVERSION.cnyPerUsd /
        PRIVATE_TOUR_PRICE_CONVERSION.usdRoundingUnit,
    ) * PRIVATE_TOUR_PRICE_CONVERSION.usdRoundingUnit;
  assertConvertedPriceInvariant(cny, amount, "USD");
  return amount;
}

export function convertCnyToKrw(cny: number): number {
  assertValidCny(cny);
  const amount =
    Math.ceil(
      (cny * PRIVATE_TOUR_PRICE_CONVERSION.krwPerCny) /
        PRIVATE_TOUR_PRICE_CONVERSION.krwRoundingUnit,
    ) * PRIVATE_TOUR_PRICE_CONVERSION.krwRoundingUnit;
  assertConvertedPriceInvariant(cny, amount, "KRW");
  return amount;
}

const numberLocales: Record<PrivateTourLocale, string> = {
  en: "en-US",
  zh: "zh-CN",
  ko: "ko-KR",
};

export function formatPrivateTourPrice(
  cny: number,
  locale: PrivateTourLocale,
  usdPerPerson?: number,
  publishedPrice?: PrivateTourPriceTier["publishedPrice"],
): FormattedPrivateTourPrice {
  assertValidCny(cny);
  if (publishedPrice) {
    if (!Number.isSafeInteger(publishedPrice.amountPerPerson) || publishedPrice.amountPerPerson <= 0) {
      throw new RangeError("A published source-currency price must be a positive safe integer.");
    }
    return {
      cny,
      amount: publishedPrice.amountPerPerson,
      currency: publishedPrice.currency,
      formatted: new Intl.NumberFormat(numberLocales[locale], {
        style: "currency",
        currency: publishedPrice.currency,
        currencyDisplay: "code",
        maximumFractionDigits: 0,
      }).format(publishedPrice.amountPerPerson),
    };
  }
  if (usdPerPerson !== undefined) {
    if (!Number.isSafeInteger(usdPerPerson)) {
      throw new RangeError("An explicit USD price must be a whole-dollar safe integer.");
    }
    assertConvertedPriceInvariant(cny, usdPerPerson, "USD");
  }
  const currency: PrivateTourCurrency =
    locale === "en" ? "USD" : locale === "ko" ? "KRW" : "CNY";
  const amount =
    locale === "en"
      ? (usdPerPerson ?? convertCnyToUsd(cny))
      : locale === "ko"
        ? convertCnyToKrw(cny)
        : cny;
  return {
    cny,
    amount,
    currency,
    formatted: new Intl.NumberFormat(numberLocales[locale], {
      style: "currency",
      currency,
      currencyDisplay: locale === "en" ? "code" : "symbol",
      maximumFractionDigits: 0,
    }).format(amount),
  };
}

const l = (en: string, zh: string, ko: string): LocalizedText => ({
  en,
  zh,
  ko,
});
const lists = (
  en: readonly string[],
  zh: readonly string[],
  ko: readonly string[],
): LocalizedStringList => ({ en, zh, ko });

const prices = (
  [twoTravellers, fourTravellers]: readonly [number, number],
  usdPrices?: readonly [number, number],
): readonly PrivateTourPriceTier[] => [
  {
    travelers: 2,
    cnyPerPerson: twoTravellers,
    ...(usdPrices ? { usdPerPerson: usdPrices[0] } : {}),
  },
  {
    travelers: 4,
    cnyPerPerson: fourTravellers,
    ...(usdPrices ? { usdPerPerson: usdPrices[1] } : {}),
  },
];

const day = (
  dayNumber: number,
  title: LocalizedText,
  description: LocalizedText,
): PrivateTourDay => ({ day: dayNumber, title, description });

const image = (
  src: string,
  alt: LocalizedText,
  caption: LocalizedText,
  width = 1600,
  height = 1067,
  objectPosition = "50% 50%",
): PrivateTourImage => ({ src, width, height, objectPosition, alt, caption });

const routeVariant = (
  label: LocalizedText,
  src: string,
  alt: LocalizedText,
  caption: LocalizedText,
  width = 1600,
  height = 1000,
  objectPosition = "50% 50%",
): PrivateTourRouteMediaVariant => ({
  label,
  image: image(src, alt, caption, width, height, objectPosition),
});

const routeGroup = (
  dayNumber: number,
  ...variants: PrivateTourRouteMediaVariant[]
): PrivateTourRouteMediaGroup => ({ day: dayNumber, variants });

const standardPackage = (
  id: string,
  label: LocalizedText,
  summary: LocalizedText,
  cnyPrices: readonly [number, number],
  usdPrices?: readonly [number, number],
): PrivateTourPackage => ({
  id,
  guideMode: "standard",
  label,
  summary,
  prices: prices(cnyPrices, usdPrices),
});

const guidedPackage = (
  id: string,
  guideMode: PrivateTourGuideMode,
  label: LocalizedText,
  summary: LocalizedText,
  cnyPrices: readonly [number, number],
  usdPrices?: readonly [number, number],
): PrivateTourPackage => ({
  id,
  guideMode,
  label,
  summary,
  prices: prices(cnyPrices, usdPrices),
});

const standardLabel = l("Private tour", "私家团标准版", "프라이빗 투어");
const standardSummary = l(
  "Your private vehicle, English-guided sightseeing, arrival and departure transfers, listed adult admission tickets and accommodation with breakfast. No shopping stops.",
  "包含行程所列私车、英语导游游览、抵达与离开接送、成人基础门票及含早住宿，全程无购物店安排。",
  "일정에 명시된 전용 차량, 영어 가이드 관광, 도착·출발 이동, 성인 기본 입장권, 조식 포함 숙박이 들어 있습니다. 쇼핑 일정은 없습니다.",
);

const commonBookingNote = l(
  "The per-person starting prices shown are for groups of 2 and 4 travellers, flights not included; we confirm other group sizes individually. Send us your dates, room needs, arrival details and luggage count, and we will confirm availability and send your final quote before you pay.",
  "网页只列出 2 人和 4 人的每人起价，不含往返机票；其他人数我们会单独确认。把日期、房间需求、到离信息和行李数量发给我们，我们先核对酒店、车辆和景点预约情况，再在你付款前发出最终报价。",
  "표시된 1인 시작가는 2명과 4명 기준이며 항공권은 포함되지 않습니다. 그 외 인원은 따로 확인해 드립니다. 날짜, 객실 구성, 도착·출발편과 수하물 수량을 알려 주시면 예약 가능 여부를 확인한 뒤 결제 전에 최종 견적을 보내 드립니다.",
);

const commonExclusions = (
  extraEn: readonly string[],
  extraZh: readonly string[],
  extraKo: readonly string[],
  additionalServices: LocalizedText = l(
    "Holiday surcharges; late-night, overtime and other services not in your booked itinerary",
    "节假日附加费；所订行程以外的夜间、超时及其他服务",
    "공휴일 추가금, 예약한 일정에 없는 야간·초과 시간·기타 서비스",
  ),
): LocalizedStringList =>
  lists(
    [
      "International and domestic flights",
      "Lunches and dinners",
      "Personal travel insurance, visas, tips and personal expenses",
      "Room upgrades or extra single rooms",
      additionalServices.en,
      ...extraEn,
    ],
    [
      "国际及国内往返机票",
      "午餐和晚餐",
      "个人旅游意外险、签证、司导小费及个人消费",
      "房型升级，或基础房间安排之外的单住需求",
      additionalServices.zh,
      ...extraZh,
    ],
    [
      "중국 왕복 및 중국 국내선 항공권",
      "중식과 석식",
      "개인 여행자 보험, 비자, 기사·가이드 팁 및 개인 경비",
      "객실 업그레이드 또는 기본 배정 외 1인실",
      additionalServices.ko,
      ...extraKo,
    ],
  );

const PUBLISHED = "2026-08-23";
const standardServicePolicy = Object.freeze({
  shoppingStops: false,
  addedServicesRequirePriorAgreement: true,
} as const);
const MODIFIED = "2026-09-06";

const shanghaiSuzhouHangzhou: PrivateTourProduct = {
  id: "private-tour-shanghai-suzhou-hangzhou-6d5n",
  faq: shanghaiSuzhouHangzhouAnswers,
  slug: "shanghai-suzhou-hangzhou-6-day-private-tour",
  days: 6,
  nights: 5,
  servicePolicy: standardServicePolicy,
  title: l(
    "Shanghai, Suzhou & Hangzhou: 6-Day Private Tour",
    "上海·苏州·杭州 6 天 5 晚私家团",
    "상하이·쑤저우·항저우 6일 프라이빗 투어",
  ),
  eyebrow: l(
    "Three cities, one seamless route",
    "一次连走江南三城",
    "세 도시를 한 번에 잇는 여정",
  ),
  lede: l(
    "Move from Shanghai's skyline to Suzhou's gardens and Hangzhou's West Lake with private transfers and guided touring built around a comfortable six-day pace.",
    "从上海城市天际线，到苏州园林和杭州西湖，用 6 天串起江南三城；跨城交通、私车接送与核心游览日已纳入基础安排。",
    "상하이의 스카이라인에서 쑤저우 정원과 항저우 서호까지, 전용 이동과 영어 가이드 일정으로 여유 있게 이어갑니다.",
  ),
  summary: l(
    "Five nights, four guided touring days and breakfast-included Ctrip 4-Diamond–rated hotels, on a private journey that starts in Shanghai and ends in Hangzhou.",
    "5 晚 4 钻含早住宿，D2–D5 英语导游；上海进、杭州出，适合希望一次看完三城又不想频繁自行转车的客人。",
    "상하이에 도착해 항저우에서 출발하는 프라이빗 일정입니다. 중국 씨트립 기준 4다이아 등급 호텔 조식 포함 5박, D2~D5 영어 가이드가 포함되며 항공권은 별도입니다.",
  ),
  highlights: lists(
    [
      "The Bund and Shanghai skyline",
      "Classical Suzhou gardens and lanes",
      "Lingyin Temple and West Lake cruise",
      "Private intercity planning with luggage handled",
    ],
    [
      "外滩与陆家嘴城市景观",
      "苏州古典园林与平江路",
      "灵隐寺与西湖游船",
      "跨城交通及行李随车衔接",
    ],
    [
      "와이탄과 푸둥 스카이라인",
      "쑤저우 고전 정원과 골목",
      "링인사와 서호 유람선",
      "수하물까지 고려한 도시 간 이동",
    ],
  ),
  itinerary: [
    day(
      1,
      l(
        "Arrive in Shanghai and settle in",
        "抵达上海｜把第一天留给落地与适应",
        "상하이 도착｜이동과 적응을 위한 여유",
      ),
      l(
        "Your English-speaking guide and private driver meet you at Shanghai airport or railway station and take you and your luggage straight to your Shanghai hotel; the guide helps with your arrival and check-in. Day 1 has no fixed sightseeing, leaving room for arrival delays, the drive into the city and check-in; settle in and stay overnight in Shanghai.",
        "英语导游和司机在上海机场或车站接你，连人带行李，私车直接送到上海酒店，导游协助抵达和入住。D1 不安排固定景点，给航班或列车变动、进城和入住留出余量；安顿好后在上海住下。",
        "영어 가이드와 기사가 상하이 공항이나 기차역에서 맞이해, 짐과 함께 전용 차량으로 상하이 호텔까지 바로 모셔다 드립니다. 가이드가 도착 후 이동과 호텔 체크인을 도와 드립니다. D1에는 고정 관광을 넣지 않아 도착 지연, 시내 이동과 체크인에 여유를 두며, 이날은 상하이에서 숙박합니다.",
      ),
    ),
    day(
      2,
      l(
        "Old Shanghai to the skyline",
        "上海城市纵览｜从老城走到天际线",
        "옛 상하이에서 스카이라인까지",
      ),
      l(
        "Your English-speaking guide and private vehicle start the day from your Shanghai hotel. Visit Yu Garden or the Old City, continue to Lujiazui and finish along the Bund; the order changes only to suit reservations and local conditions. Back to the same Shanghai hotel for the night.",
        "英语导游和专车从上海酒店接你出发。先看豫园或老城厢，再去陆家嘴，最后走到外滩；先后顺序只会因预约和现场情况变动。当晚回到同一家上海酒店。",
        "영어 가이드와 전용 차량으로 상하이 호텔에서 출발합니다. 예원 또는 구시가지를 둘러보고 루자쭈이를 거쳐 와이탄에서 일정을 마칩니다. 순서는 예약과 현지 상황에 따라서만 바뀔 수 있습니다. 관광 후 같은 상하이 호텔로 돌아와 숙박합니다.",
      ),
    ),
    day(
      3,
      l(
        "Shanghai to Suzhou, without rushing",
        "上海半日与苏州初见｜从城市转入江南",
        "상하이 반일 후 여유 있게 쑤저우로",
      ),
      l(
        "Check out of your Shanghai hotel and start with a half-day visit in Shanghai. Then continue to Suzhou with your luggage, by rail with transfers at both ends or by door-to-door vehicle, as agreed for your group. After arrival, visit either Panmen or Tiger Hill, then Shantang Street, and check in for the night in Suzhou.",
        "上海酒店退房后，先在上海游览半天。之后行李随行，按书面确认的跨城方案前往苏州：高铁加两端接送，或门到门用车。到苏州后，在盘门和虎丘中选一处游览，再逛山塘街，当晚入住苏州。",
        "상하이 호텔에서 체크아웃하고 먼저 상하이 반일 관광을 합니다. 이어 서면으로 확정된 도시 간 이동 방식(열차와 양쪽 픽업, 또는 문 앞까지 가는 차량)으로 짐과 함께 쑤저우에 갑니다. 도착 후 판먼과 후추 중 한 곳을 보고, 산탕제를 둘러본 뒤 쑤저우에서 숙박합니다.",
      ),
    ),
    day(
      4,
      l(
        "Suzhou gardens, then Hangzhou",
        "苏州园林深读｜完整看完，再去杭州",
        "쑤저우 정원과 골목, 이어서 항저우",
      ),
      l(
        "Check out of your Suzhou hotel; your luggage travels with the transfer arranged for you. Visit the Humble Administrator's Garden, Suzhou Museum and Pingjiang Road in the order the reservations allow, then continue to Hangzhou as planned and check in there for the night.",
        "苏州酒店退房，行李按跨城接驳方案随行。拙政园、苏州博物馆和平江路按预约情况安排先后，看完苏州的重点再去杭州，当晚入住杭州。",
        "쑤저우 호텔에서 체크아웃하고, 짐은 정해진 이동 방식에 따라 함께 이동합니다. 졸정원, 쑤저우박물관, 핑장루를 예약에 따라 가능한 순서로 둘러본 뒤 항저우로 이동해 숙박합니다.",
      ),
    ),
    day(
      5,
      l(
        "Lingyin, tea and West Lake",
        "杭州深度一日｜灵隐、茶文化与西湖",
        "링인사·차 문화·서호",
      ),
      l(
        "Your guide and private vehicle take you from your Hangzhou hotel to Lingyin–Feilai Peak and Lingyin Temple. Next is Longjing Village or the China National Tea Museum—one of the two, as set out in your written confirmation—then the West Lake shore and the listed cruise, before returning to the same Hangzhou hotel.",
        "导游和专车从杭州酒店出发，带你去灵隐飞来峰和灵隐寺；之后游览龙井村或中国茶叶博物馆其中一处（以书面确认单为准），再到西湖边乘坐行程所列游船，当晚回同一家杭州酒店。",
        "가이드와 전용 차량으로 항저우 호텔에서 출발해 링인 페이라이펑과 링인사를 둘러봅니다. 이어 룽징촌과 중국차엽박물관 중 서면 확인서에 적힌 한 곳을 방문하고, 서호 호숫가와 일정에 포함된 유람선으로 하루를 마친 뒤 같은 항저우 호텔로 돌아갑니다.",
      ),
    ),
    day(
      6,
      l(
        "An unhurried Hangzhou departure",
        "从容离开杭州｜为返程留足时间",
        "여유 있게 항저우 출발",
      ),
      l(
        "Check out and travel with your luggage by private vehicle to Hangzhou airport or railway station. There is no fixed sightseeing on departure day, leaving room for check-out, city traffic and your flight or train.",
        "杭州酒店退房后，连人带行李由专车送到杭州机场或车站。返程日不安排固定景点，给退房、市区交通和你的航班或列车留出余量。",
        "항저우 호텔에서 체크아웃한 뒤 짐과 함께 전용 차량으로 항저우 공항이나 기차역까지 이동합니다. 출발일에는 고정 관광을 넣지 않아 체크아웃, 도심 교통, 항공편이나 열차에 필요한 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Five nights with breakfast at Ctrip 4-Diamond–rated hotels, based on two people sharing a room. For an odd-numbered group, the listed base arrangement includes one room for one person.",
    "5 晚携程 4 钻酒店双标含早，默认两人一间；人数为单数时，基础安排含 1 间单住。具体酒店和房型，预订前会和你确认。",
    "중국 씨트립 기준 4다이아 등급 호텔 5박과 조식이 포함되며 2인 1실 기준입니다. 홀수 인원은 기본 배정에 1인 사용 객실 1실이 포함됩니다.",
  ),
  serviceNote: l(
    "On Day 1, your English-speaking guide meets you on arrival with a private vehicle and helps you check in; Day 6 is a private driver transfer for your departure. Days 2–5 include an English-speaking guide, private air-conditioned vehicles, listed adult admission tickets, cross-city transport and bottled water on each touring day. Groups of 2–3 usually travel by rail with private transfers at both ends; groups of 4–9 usually take a compliant door-to-door vehicle, planned around your luggage.",
    "含 D1 私车接机/站及英语导游迎接、协助入住，D6 由司机私车送机/站；D2–D5 含英语导游、行程内空调私车、跨城交通、行程所列成人基础门票与预约，以及各游览日的瓶装饮用水。2–3 人通常采用高铁加两端私车接送；4–9 人通常采用门到门合规车辆，最终按人数和行李确认。",
    "D1 전용 차량 픽업과 영어 가이드의 도착·호텔 체크인 지원, D6 기사의 전용 차량 샌딩이 포함됩니다. D2~D5에는 영어 가이드, 일정 내 에어컨이 있는 전용 차량, 도시 간 이동, 성인 기본 입장권과 관광일마다 제공되는 생수가 포함됩니다. 2~3명은 보통 열차와 양쪽 전용 픽업을, 4~9명은 인원과 수하물에 맞춘 합법적인 전용 차량을 이용합니다.",
  ),
  exclusions: commonExclusions(
    ["Any attraction or ticket not listed in your written itinerary"],
    ["行程单上没有列出的景点、门票或体验"],
    ["일정표에 없는 관광지, 입장권 또는 체험"],
  ),
  bookingNote: l(
    "Per-person starting prices are shown for groups of 2 and 4 travellers; flights are not included. For any other group size, send us your dates, room needs, arrival details and luggage count, and we will check the actual rooms and vehicle before sending you a written quote.",
    "页面只列出 2 人和 4 人的每人起价，往返机票另计。其他人数，请把日期、房间需求、到离信息和行李数量发给我们；我们会按实际房间和车型重新核对，付款前给你发书面报价。",
    "공개된 1인 시작가는 2명과 4명 기준이며 항공권은 포함되지 않습니다. 그 외 인원은 날짜, 객실 구성, 도착·출발편과 수하물 수량을 알려 주시면 실제 객실과 차량을 다시 확인해 결제 전 서면 견적을 드립니다.",
  ),
  heroImage: image(
    "/images/destinations/shanghai/hero-1600.webp",
    l(
      "Shanghai's historic rooftops and the Lujiazui skyline across the Huangpu River",
      "上海浦西历史建筑屋顶与黄浦江对岸的陆家嘴天际线",
      "상하이 푸시의 역사적 지붕과 황푸강 건너 루자쭈이 스카이라인",
    ),
    l(
      "Begin in Shanghai, then travel one way through Suzhou to Hangzhou.",
      "从上海进入，经苏州一路前往杭州，不走回头路。",
      "상하이에서 시작해 쑤저우를 거쳐 항저우까지 한 방향으로 이동합니다.",
    ),
    1600,
    1000,
    "50% 48%",
  ),
  gallery: [
    image(
      "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/gallery-shanghai-dusk-1600.webp",
      l(
        "Shanghai skyline and historic rooftops at dusk",
        "黄昏时的上海天际线与历史街区屋顶",
        "해 질 무렵 상하이 스카이라인과 옛 도심 지붕",
      ),
      l(
        "The route begins where old Shanghai meets the towers across the Huangpu River.",
        "路线从老上海屋顶与黄浦江对岸天际线交会的地方开始。",
        "옛 상하이 지붕과 황푸강 건너 스카이라인이 만나는 곳에서 여정을 시작합니다.",
      ),
    ),
    image(
      "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/gallery-hangzhou-tea-1600.webp",
      l(
        "A stone path beneath old trees in a Meijiawu tea garden",
        "梅家坞茶园古树下的石板小路与成片茶垄",
        "메이지아우 차밭의 오래된 나무 아래 돌길과 차나무 밭",
      ),
      l(
        "The Hangzhou day includes one tea stop before West Lake.",
        "杭州游览日，去西湖之前会先到一处茶文化地点。",
        "항저우 관광일에는 서호에 가기 전 차 문화 장소 한 곳을 방문합니다.",
      ),
    ),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Shanghai arrival", "抵达上海", "상하이 도착"),
        "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/arrival-shanghai-1600.webp",
        l(
          "A quiet Bund promenade and Huangpu River at sunrise",
          "清晨安静的外滩滨水平台与黄浦江",
          "이른 아침 조용한 와이탄 수변 산책로와 황푸강",
        ),
        l(
          "Shanghai, your arrival city; the airport or station pickup follows your booking.",
          "抵达城市上海；接机或接站按你的订单安排。",
          "도착 도시 상하이. 공항·역 픽업은 예약 내용에 따라 진행합니다.",
        ),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("The Bund", "外滩", "와이탄"),
        "/images/destinations/shanghai/bund-architecture-1200.webp",
        l(
          "Historic architecture along Shanghai's Bund",
          "上海外滩历史建筑群",
          "상하이 와이탄의 역사 건축",
        ),
        l(
          "The Bund anchors the full Shanghai sightseeing day before the route crosses the river.",
          "外滩是上海全天游览的起点，随后再跨江前往浦东。",
          "와이탄에서 상하이 전일 관광을 시작한 뒤 강을 건너 푸둥으로 이동합니다.",
        ),
        1200,
        750,
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Panmen", "盘门", "판먼"),
        "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/panmen-1600.webp",
        l(
          "Panmen city gate and canal in Suzhou",
          "苏州盘门城墙、城门与水道",
          "쑤저우 판먼 성벽과 수로",
        ),
        l(
          "Panmen is one of the first-stop options after you arrive in Suzhou.",
          "盘门是抵达苏州后的首站选项之一。",
          "판먼은 쑤저우 도착 후 첫 방문지 후보 중 하나입니다.",
        ),
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Pingjiang Road", "平江路", "핑장루"),
        "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/pingjiang-road-1600.webp",
        l(
          "A stone bridge and canal-side houses along Pingjiang Road",
          "平江路的石桥、河道与白墙民居",
          "핑장루의 돌다리와 운하, 흰 벽의 집들",
        ),
        l(
          "The Suzhou day closes among canals and old lanes after the garden and museum visits.",
          "完成园林与博物馆后，在平江路河道与老街巷中收尾。",
          "정원과 박물관 방문 후 핑장루의 운하와 옛 골목에서 하루를 마칩니다.",
        ),
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Lingyin–Feilai Peak", "灵隐飞来峰", "링인 페이라이펑"),
        "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/lingyin-feilai-peak-1600.webp",
        l(
          "Buddhist carvings in the limestone of Feilai Peak",
          "灵隐飞来峰岩壁上的佛教造像",
          "페이라이펑 석회암 벽면의 불교 조각",
        ),
        l(
          "The Hangzhou sightseeing day begins at Feilai Peak and Lingyin Temple, then moves on to a tea stop and West Lake.",
          "杭州游览日从飞来峰和灵隐寺开始，再去茶文化地点和西湖。",
          "항저우 관광일은 페이라이펑과 링인사에서 시작해 차 문화 장소와 서호로 이어집니다.",
        ),
      ),
    ),
    routeGroup(
      6,
      routeVariant(
        l("Hangzhou departure", "杭州返程", "항저우 출발"),
        "/images/guides/shanghai-hangzhou-transport-route/hero-1600.webp",
        l(
          "The departure hall at Hangzhou East railway station",
          "杭州东站候车大厅",
          "항저우동역 대합실",
        ),
        l(
          "By train, we take you to your station; by air, the airport transfer follows your flight.",
          "坐高铁就送到你的车站，坐飞机就按你的航班送机。",
          "열차는 해당 역으로, 항공편은 비행 시간에 맞춰 공항으로 모셔다 드립니다.",
        ),
      ),
    ),
  ],
  packages: [
    {
      id: "standard-guided",
      guideMode: "standard",
      label: standardLabel,
      summary: standardSummary,
      prices: [
        { travelers: 2, cnyPerPerson: 7436, usdPerPerson: 1144 },
        { travelers: 4, cnyPerPerson: 5421, usdPerPerson: 834 },
      ],
    },
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-20",
};

const chengdu: PrivateTourProduct = {
  id: "private-tour-chengdu-5d4n",
  slug: "chengdu-pandas-sanxingdui-5-day-private-tour",
  days: 5,
  nights: 4,
  servicePolicy: standardServicePolicy,
  title: l(
    "Chengdu, Pandas & Sanxingdui: 5-Day Private Tour",
    "成都·大熊猫·三星堆 5 天 4 晚私家团",
    "청두·판다·싼싱두이 5일 프라이빗 투어",
  ),
  eyebrow: l(
    "Wildlife, archaeology and living Chengdu",
    "熊猫、古蜀文明与成都生活",
    "판다와 고대 문명, 청두의 일상",
  ),
  lede: l(
    "See the pandas early, give Sanxingdui the time it deserves, and balance two major day trips with Chengdu's relaxed parks and teahouses.",
    "早场看熊猫，用完整一天读懂三星堆，再以人民公园和都江堰平衡城市生活与古代工程。",
    "이른 시간 판다를 만나고 싼싱두이를 온전히 둘러본 뒤, 청두의 공원과 두장옌까지 균형 있게 경험합니다.",
  ),
  summary: l(
    "Four nights in Chengdu with private transfers, three English-guided touring days and the main admissions for the Panda Base, Sanxingdui and Dujiangyan.",
    "成都连住 4 晚，D2–D4 英语导游，私车往返熊猫基地、三星堆与都江堰，免去每天换酒店。",
    "청두 4박 연박, D2~D4 영어 가이드와 전용 차량으로 판다기지, 싼싱두이, 두장옌을 방문합니다.",
  ),
  highlights: lists(
    [
      "Early visit to Chengdu Panda Base",
      "A full day at Sanxingdui Museum",
      "Dujiangyan's ancient waterworks",
      "Tea and local life in People's Park",
    ],
    [
      "大熊猫基地早场",
      "三星堆博物馆完整日",
      "都江堰古代水利工程",
      "人民公园与茶馆体验",
    ],
    [
      "청두 판다기지 이른 관람",
      "싼싱두이박물관 종일 관람",
      "두장옌 고대 수리시설",
      "인민공원과 찻집 체험",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Chengdu", "抵达成都", "청두 도착"),
      l(
        "Your English-speaking guide and driver meet you at Chengdu airport or railway station and take you and your luggage straight to your Chengdu hotel in a private air-conditioned vehicle. The guide helps with pickup and hotel check-in. There is no set sightseeing today, so arrival and check-in are unhurried; touring starts tomorrow with the pandas.",
        "英语导游和司机在成都机场或车站接你，连人带行李乘空调专车直接送到成都酒店，导游协助接机或接站，以及酒店入住。当天不安排固定景点，从容抵达、入住休息，第2天再去看熊猫。",
        "영어 가이드와 기사가 청두 공항이나 기차역에서 맞이해 짐과 함께 에어컨을 갖춘 전용 차량으로 청두 호텔까지 바로 모셔다 드립니다. 가이드가 픽업과 호텔 체크인을 도와 드립니다. 이날은 정해진 관광 일정이 없으니 여유 있게 도착하고 체크인하세요. 본격적인 일정은 다음 날 판다기지에서 시작합니다.",
      ),
    ),
    day(
      2,
      l("Pandas and People's Park", "熊猫与人民公园", "판다와 인민공원"),
      l(
        "Your English-speaking guide and private vehicle take you from the hotel to Chengdu Research Base of Giant Panda Breeding for an early visit. Afterwards, continue to People's Park and its teahouse, then return to the same Chengdu hotel for the night.",
        "英语导游和专车从成都酒店出发，带你早场游览成都大熊猫繁育研究基地；随后回到市区，逛人民公园、体验茶馆，当晚回到同一家成都酒店。",
        "청두 호텔에서 영어 가이드와 전용 차량으로 출발해 이른 시간 청두 판다번식연구기지를 둘러봅니다. 이어 인민공원과 찻집을 경험한 뒤 같은 청두 호텔로 돌아와 숙박합니다.",
      ),
    ),
    day(
      3,
      l("Sanxingdui Museum", "三星堆博物馆", "싼싱두이박물관"),
      l(
        "Your guide and private vehicle take you from your Chengdu hotel to Sanxingdui Museum, where you spend the main part of the day. Afterwards, travel back to Chengdu and the same hotel.",
        "导游和专车从成都酒店带你去三星堆博物馆，当天的主要时间都留给博物馆；参观结束后返回成都，继续住同一家酒店。",
        "가이드와 전용 차량으로 청두 호텔에서 싼싱두이박물관에 가서, 이날의 주요 시간을 박물관 관람에 씁니다. 관람 후 청두로 돌아와 같은 호텔에서 숙박합니다.",
      ),
    ),
    day(
      4,
      l("Dujiangyan", "都江堰", "두장옌"),
      l(
        "A private vehicle takes you from your Chengdu hotel to Dujiangyan. See the irrigation system, then Guanxian Ancient Town, in the order set out in your written confirmation, and return to the same Chengdu hotel for your final night.",
        "专车从成都酒店送你去都江堰，按书面确认的顺序游览都江堰水利工程和灌县古城，之后回到同一家成都酒店，住最后一晚。",
        "전용 차량으로 청두 호텔에서 두장옌으로 갑니다. 서면 확인서에 적힌 순서대로 두장옌 수리시설과 관현고성을 둘러본 뒤, 같은 청두 호텔로 돌아와 마지막 밤을 보냅니다.",
      ),
    ),
    day(
      5,
      l("Depart Chengdu", "成都返程", "청두 출발"),
      l(
        "Check out of your Chengdu hotel and travel with your luggage by private air-conditioned vehicle to the airport or railway station, with an English-speaking guide to help with the transfer. There is no set sightseeing today, leaving time in hand for your departure.",
        "从成都酒店退房，行李随车，司机开空调专车送你去机场或车站，英语导游随行协助送机或送站。当天不安排固定景点，为返程留出余量。",
        "청두 호텔에서 체크아웃한 뒤 짐과 함께 에어컨을 갖춘 전용 차량으로 공항이나 기차역에 갑니다. 영어 가이드가 동행해 출발 이동을 도와 드립니다. 이날은 정해진 관광 일정을 넣지 않아 출발에 필요한 시간 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four nights in a Ctrip 4-Diamond–rated Chengdu hotel with breakfast, based on twin sharing. For group sizes other than the published 2- and 4-traveller prices, we confirm the room arrangement for your group individually.",
    "成都 4 晚携程 4 钻酒店双标含早，页面公开的 2 人和 4 人价按两人一间计；其他人数的房间安排，我们会人工单独为你确认。",
    "청두의 중국 씨트립 기준 4다이아 등급 호텔에서 조식 포함 4박합니다. 공개된 2명·4명 요금은 2인 1실 기준이며, 그 외 인원의 객실 구성은 저희가 직접 확인해 드립니다.",
  ),
  serviceNote: l(
    "Private driver and air-conditioned vehicle transfers on Days 1 and 5, with an English-speaking guide for arrival and departure assistance; English guide and private air-conditioned vehicle on Days 2–4. Listed adult admission tickets and attraction transport are included. No shopping stops.",
    "D1/D5 含司机、空调私车接送及英语导游抵达和返程协助，D2–D4 含英语导游与行程内空调私车；含行程所列成人基础门票、景交与预约，全程无购物店安排。",
    "D1·D5에는 기사와 에어컨을 갖춘 전용 차량으로 픽업·샌딩하며 영어 가이드가 도착·출발을 돕습니다. D2~D4 영어 가이드와 에어컨을 갖춘 전용 차량, 일정에 명시된 성인 기본 입장권과 관광지 내 이동이 포함되며 쇼핑 일정은 없습니다.",
  ),
  exclusions: commonExclusions(
    ["Mount Qingcheng and attractions not listed"],
    ["青城山及未列景点"],
    ["칭청산 및 일정에 명시되지 않은 관광지"],
  ),
  bookingNote: commonBookingNote,
  heroImage: image(
    "/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/hero-panda-1600.webp",
    l(
      "A giant panda at Chengdu Research Base of Giant Panda Breeding",
      "成都大熊猫繁育研究基地内的大熊猫",
      "청두 자이언트판다 번식연구기지의 자이언트판다",
    ),
    l(
      "A real photo of Chengdu Panda Base, where you go on Day 2. Panda sightings and viewing conditions vary from day to day.",
      "真实照片：D2 要去的成都熊猫基地。能看到哪只熊猫、观赏状态如何，要看当天情况。",
      "D2에 방문하는 청두 판다기지의 실제 사진입니다. 볼 수 있는 판다와 관람 상태는 그날 상황에 따라 다릅니다.",
    ),
    1600,
    1000,
    "20% 50%",
  ),
  gallery: [
    image(
      "/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/gallery-teahouse-1600.webp",
      l(
        "A quiet teahouse terrace in a Chengdu lane",
        "成都街巷里安静的茶馆露台",
        "청두 골목의 조용한 찻집 테라스",
      ),
      l(
        "Tea-house time shows the slower everyday rhythm that makes Chengdu a comfortable base.",
        "茶馆里的日常慢节奏，让成都很适合做旅行落脚点。",
        "찻집에서 보내는 느긋한 일상이 청두를 편안한 여행 거점으로 만들어 줍니다.",
      ),
    ),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Chengdu arrival", "抵达成都", "청두 도착"),
        "/images/destinations/chengdu/jinjiang-bridge-1200.webp",
        l(
          "A covered bridge and river scene in central Chengdu",
          "成都中心城区的廊桥与锦江河景",
          "청두 도심의 지붕 있는 다리와 강 풍경",
        ),
        l(
          "A river view in central Chengdu, your base for the stay. Your exact airport or station transfer is confirmed with your booking.",
          "成都中心城区河景，这几晚都住在成都；具体从哪个机场或车站接送，按你的订单确认。",
          "이번 여행의 숙박 거점, 청두 도심의 강 풍경입니다. 공항 또는 역 이동은 예약 내용에 맞춰 확정합니다.",
        ),
        1200,
        750,
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Panda Base landmark", "熊猫基地园区地标", "판다기지 조형물"),
        "/images/guides/chengdu-panda-base-or-dujiangyan-panda-valley/hero-1600.webp",
        l(
          "Golden panda sculpture in the landscaped grounds of Chengdu Panda Base",
          "成都大熊猫基地园区内的金色熊猫雕塑",
          "청두 판다기지 조경 구역의 황금색 판다 조형물",
        ),
        l(
          "A sculpture, not a live panda—you visit the real panda enclosures early in the day.",
          "照片里是园区雕塑，不是真熊猫；当天早场去真熊猫的展区参观。",
          "사진은 실제 판다가 아닌 기지의 조형물입니다. 실제 판다 방사장은 이른 시간에 둘러봅니다.",
        ),
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Sanxingdui New Museum", "三星堆新馆", "싼싱두이 신관"),
        "/images/guides/sanxingdui-museum-booking-and-gallery-order/hero-1600.webp",
        l(
          "Exterior and arrival plaza of the new Sanxingdui Museum",
          "三星堆新馆外观与到达广场",
          "싼싱두이 신관 외관과 입장 광장",
        ),
        l(
          "Where you arrive at the new Sanxingdui Museum. Ticket availability and the gallery order are confirmed separately.",
          "三星堆新馆的到达区域。门票能否订到、展厅参观顺序另行确认。",
          "싼싱두이 신관에 도착하면 보이는 공간입니다. 입장권 예약 가능 여부와 전시 관람 순서는 별도로 확인합니다.",
        ),
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Dujiangyan waterworks", "都江堰水利工程", "두장옌 수리시설"),
        "/images/destinations/chengdu/dujiangyan-1200.webp",
        l(
          "Dujiangyan irrigation site and river valley",
          "都江堰水利工程与河谷全景",
          "두장옌 수리시설과 강 계곡 전경",
        ),
        l(
          "Dujiangyan's river valley, to give a sense of its scale. Routes within the site and attraction transport are confirmed for your visit.",
          "都江堰河谷全景，感受一下它的规模。景区内的游览路线和景交按实际游览确认。",
          "두장옌 강 계곡의 규모를 한눈에 보여 주는 전경입니다. 내부 동선과 관광지 내 이동은 방문 조건에 맞춰 확정합니다.",
        ),
        1200,
        750,
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Depart Chengdu", "成都返程", "청두 출발"),
        "/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/departure-chengdu-1600.webp",
        l(
          "Chengdu IFS and evening traffic in the city centre",
          "成都 IFS 与市中心夜间车流",
          "청두 IFS와 도심 야간 교통",
        ),
        l(
          "One last look at Chengdu before your transfer to the airport or railway station. The photo does not show your departure point.",
          "用这张成都夜景为旅程收尾，之后按订单送你去机场或车站；照片并非实际出发地点。",
          "청두 도심 야경으로 여정을 마친 뒤 예약에 맞춰 공항 또는 기차역으로 이동합니다. 사진은 실제 출발 지점을 뜻하지 않습니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage(
      "standard-guided",
      standardLabel,
      standardSummary,
      [6168, 4933],
      [949, 759],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-07",
};

const xian: PrivateTourProduct = {
  id: "private-tour-xian-5d4n",
  slug: "xian-terracotta-warriors-5-day-private-tour",
  days: 5,
  nights: 4,
  servicePolicy: standardServicePolicy,
  title: l(
    "Xi'an & the Terracotta Warriors: 5-Day Private Tour",
    "西安·兵马俑 5 天 4 晚私家团",
    "시안·병마용 5일 프라이빗 투어",
  ),
  eyebrow: l(
    "Imperial history, city walls and Muslim Quarter lanes",
    "从秦汉遗址走进古城街巷",
    "제국의 역사에서 구시가 골목까지",
  ),
  lede: l(
    "Give the Terracotta Warriors a full day, then connect Xi'an's city wall, Tang-era landmarks and Muslim Quarter with private transport and an English-speaking guide.",
    "用完整一天游览兵马俑与华清宫，再把城墙、大雁塔和回民街串成一条清晰的古都脉络。",
    "병마용을 하루 동안 깊이 보고, 성벽과 당대 유적, 회민거리를 전용 차량과 영어 가이드로 연결합니다.",
  ),
  summary: l(
    "Four nights in central Xi'an with three guided touring days, private arrival and departure transfers, and basic admissions for the core itinerary.",
    "西安连住 4 晚，D2–D4 英语导游，含接送、行程内私车及核心景点基础门票。",
    "시안 4박 연박, D2~D4 영어 가이드, 전용 픽업·샌딩과 핵심 일정 기본 입장권이 포함됩니다.",
  ),
  highlights: lists(
    [
      "Xi'an City Wall",
      "Terracotta Warriors and Huaqing Palace",
      "Great Mosque and Muslim Quarter",
      "Xi'an Museum complex, including the Small Wild Goose Pagoda heritage area",
    ],
    [
      "西安城墙",
      "兵马俑与华清宫",
      "西安大清真寺与回民街",
      "西安博物院景区（含小雁塔历史文化片区）",
    ],
    [
      "시안 성벽",
      "병마용과 화청궁",
      "시안 대청진사와 회민거리",
      "소안탑 역사문화 구역을 포함한 시안박물원 단지",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Xi'an", "抵达西安", "시안 도착"),
      l(
        "Day 1 is yours. Our driver meets you at Xi'an airport or railway station and takes you and your luggage straight to your hotel in central Xi'an. No guide or sightseeing today, so you can settle in.",
        "第1天轻松抵达：司机在西安机场或车站接你，连人带行李直接送到市区酒店。当天不安排导游和景点，好好安顿休息。",
        "첫날은 쉬어 가는 날입니다. 기사가 시안 공항이나 기차역에서 맞이해 짐과 함께 시안 도심 호텔까지 바로 모셔다 드립니다. 이날은 가이드와 관광 일정이 없으니 편하게 체크인하세요.",
      ),
    ),
    day(
      2,
      l("City Wall and Tang Xi'an", "城墙与盛唐西安", "성벽과 당나라 시안"),
      l(
        "Your English-speaking guide and private vehicle take you to Xi'an City Wall, the Giant Wild Goose Pagoda square and Grand Tang Mall, in the order your reservations allow. Back to the same Xi'an hotel afterwards.",
        "英语导游和专车带你游览西安城墙，再去大雁塔广场和大唐不夜城；具体先后看预约情况安排，当晚回到同一家西安酒店。",
        "영어 가이드와 전용 차량으로 시안 성벽을 둘러보고 대안탑 광장과 대당불야성으로 이어갑니다. 순서는 예약 상황에 따라 정하며, 일정을 마치면 같은 시안 호텔로 돌아옵니다.",
      ),
    ),
    day(
      3,
      l("Terracotta Warriors", "兵马俑完整日", "병마용 종일 일정"),
      l(
        "Your private vehicle takes you from the hotel to Lintong for the Terracotta Warriors and Huaqing Palace, visited in the order your reservations allow. Afterwards, back to Xi'an and the same hotel.",
        "专车送你去临潼游览兵马俑和华清宫，先后顺序按预约情况安排；结束后回到西安，继续住同一家酒店。",
        "전용 차량으로 린퉁에 가서 병마용과 화청궁을 둘러봅니다. 순서는 예약 상황에 따라 정하며, 관람 후 시안으로 돌아와 같은 호텔에서 숙박합니다.",
      ),
    ),
    day(
      4,
      l(
        "Muslim Quarter and Xi'an Museum complex",
        "回民街与西安博物院景区",
        "회민거리와 시안박물원 단지",
      ),
      l(
        "Your guide takes you on foot through the Great Mosque and Muslim Quarter, with the private vehicle for the stretches that need it. Then on to the Xi'an Museum complex, whose grounds include the museum building, Jianfu Temple site and Small Wild Goose Pagoda heritage area; your written confirmation lists which areas are open and included on your visit date. Back to the same hotel for your final night.",
        "导游带你步行游览大清真寺和回民街，需要用车的路段由专车衔接；随后去西安博物院景区，院内有博物馆展馆、荐福寺遗址和小雁塔历史文化片区。出行当天开放并纳入行程的区域，会写在书面确认单里。游览后回到同一家酒店。",
        "가이드와 함께 대청진사와 회민거리를 걸어서 둘러보고, 차량이 필요한 구간은 전용 차량으로 이동합니다. 이어 박물관 전시관, 젠푸사 유적, 소안탑 역사문화 구역이 있는 시안박물원 단지를 방문합니다. 방문일에 개방되고 일정에 포함되는 구역은 서면 확인서에 적어 드리며, 관람 후 같은 호텔로 돌아와 마지막 밤을 보냅니다.",
      ),
    ),
    day(
      5,
      l("Depart Xi'an", "西安返程", "시안 출발"),
      l(
        "Check out and travel with your luggage by private vehicle to the airport or railway station. No guide or sightseeing is planned today, leaving the day clear for your departure.",
        "退房后，专车连人带行李送你去机场或车站。当天不安排导游和景点，给返程留出余地。",
        "체크아웃 후 짐과 함께 전용 차량으로 공항이나 기차역에 갑니다. 이날은 가이드와 관광 일정이 없어 출발 일정에 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four nights in a breakfast-included Ctrip 4-Diamond–rated Xi'an hotel, based on twin sharing. For group sizes other than the published 2- and 4-traveller tiers, we confirm room arrangements individually.",
    "西安 4 晚携程 4 钻酒店双标含早，公开的 2 人和 4 人价按两人一间；其他人数怎么分房，我们会单独为你确认。",
    "시안에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 따로 확인해 드립니다.",
  ),
  serviceNote: l(
    "Private driver transfers on arrival and departure, plus an English guide and private air-conditioned vehicle on Days 2–4. Listed adult admission tickets and attraction transport are included. No shopping stops.",
    "抵达与返程由司机接送，D2–D4 英语导游与行程内空调私车；含行程所列成人基础门票、景交和预约，全程无购物店安排。",
    "도착·출발 전용 차량, D2~D4 영어 가이드와 에어컨이 있는 전용 차량, 일정에 명시된 성인 기본 입장권과 관광지 내 이동이 포함되며 쇼핑 일정은 없습니다.",
  ),
  exclusions: commonExclusions(
    [
      "Shows such as The Song of Everlasting Sorrow",
      "Mount Hua and attractions not listed",
    ],
    ["《长恨歌》等演出", "华山及未列景点"],
    ["장한가 등 공연", "화산 및 일정에 명시되지 않은 관광지"],
  ),
  bookingNote: commonBookingNote,
  heroImage: image(
    "/images/destinations/xian/hero-1600.webp",
    l(
      "Xi'an city wall and historic skyline",
      "西安城墙与古城风景",
      "시안 성벽과 역사 지구",
    ),
    l(
      "Five days connecting Xi'an's layers of history.",
      "用五天串起西安不同历史层次。",
      "시안의 여러 시대를 잇는 5일 여정.",
    ),
    1600,
    1000,
  ),
  gallery: [
    image(
      "/images/tours/xian-terracotta-warriors-5-day-private-tour/gallery-muslim-quarter-1600.webp",
      l(
        "Food stalls and pedestrians in Xi'an's Muslim Quarter",
        "西安回民街的店铺、行人与街巷",
        "시안 회민거리의 상점과 보행자, 골목 풍경",
      ),
      l(
        "On the old-city day, you walk the lanes around the Great Mosque and Muslim Quarter.",
        "古城这一天，走进大清真寺和回民街的街巷。",
        "구시가 일정에서는 대청진사와 회민거리의 생활감 있는 골목을 걸어 봅니다.",
      ),
    ),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Xi'an arrival", "抵达西安", "시안 도착"),
        "/images/tours/xian-terracotta-warriors-5-day-private-tour/arrival-city-wall-1600.webp",
        l(
          "A broad pedestrian view along Xi'an City Wall",
          "西安城墙上开阔的步行视角",
          "시안 성벽 위의 탁 트인 보행 풍경",
        ),
        l(
          "The wall shows the scale of the old city; we confirm your exact airport or railway-station pickup for your booking.",
          "从城墙看古城的尺度；具体在哪个机场或车站接你，按你的订单确认。",
          "성벽으로 보는 시안 구시가의 규모입니다. 픽업할 공항이나 역은 예약에 맞춰 확정합니다.",
        ),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Giant Wild Goose Pagoda", "大雁塔", "대안탑"),
        "/images/destinations/xian/dayanta-1200.webp",
        l(
          "Giant Wild Goose Pagoda seen across the north-square pool",
          "从北广场水面望向西安大雁塔",
          "북광장 수면 너머로 보이는 시안 대안탑",
        ),
        l(
          "The Day 2 route continues from the wall to the Giant Wild Goose Pagoda square and Grand Tang Mall.",
          "D2 从城墙继续前往大雁塔广场与大唐不夜城。",
          "D2는 성벽에서 대안탑 광장과 대당불야성으로 이어집니다.",
        ),
        1200,
        750,
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Terracotta Warriors Pit 1", "兵马俑一号坑", "병마용 1호갱"),
        "/images/destinations/xian/terracotta-pit-one-1200.webp",
        l(
          "Terracotta Warriors inside Pit 1 in Lintong",
          "临潼兵马俑一号坑内的陶俑军阵",
          "린퉁 병마용 1호갱 내부의 도용 군진",
        ),
        l(
          "A full day set aside for the heritage sites east of the city; we confirm reservation availability separately.",
          "整整一天留给城东的遗址；实名预约和余票，我们另外帮你确认。",
          "시안 동쪽 유적에 하루를 온전히 씁니다. 실명 예약과 잔여 입장권은 따로 확인해 드립니다.",
        ),
        1200,
        750,
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Xi'an North railway departure", "西安北站返程", "시안북역 출발"),
        "/images/guides/xian-chengdu-transport-route/hero-1600.webp",
        l(
          "Concourse inside Xi'an North Railway Station",
          "西安北站候车大厅",
          "시안북역 대합실",
        ),
        l(
          "If you leave by train from Xi'an North, the driver can take you there; if you fly, the transfer follows your flight to the airport.",
          "如果从西安北站坐高铁返程，司机送你到车站；坐飞机的话，按你的航班送往机场。",
          "시안북역에서 고속철도로 출발하시면 기사가 역까지 모셔다 드리고, 항공편을 이용하시면 항공편 일정에 맞춰 공항으로 모십니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage(
      "standard-guided",
      standardLabel,
      standardSummary,
      [3887, 3042],
      [598, 468],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-07",
};

const chongqingWulong: PrivateTourProduct = {
  id: "private-tour-chongqing-wulong-5d4n",
  slug: "chongqing-wulong-5-day-private-tour",
  days: 5,
  nights: 4,
  servicePolicy: standardServicePolicy,
  title: l(
    "Chongqing & Wulong: 5-Day Private Tour",
    "重庆·武隆 5 天 4 晚私家团",
    "충칭·우룽 5일 프라이빗 투어",
  ),
  eyebrow: l(
    "Vertical city, karst landscapes",
    "山城夜色与武隆喀斯特",
    "수직 도시와 카르스트 풍경",
  ),
  lede: l(
    "Pair Chongqing's layered cityscape with an overnight journey into Wulong, including the Three Natural Bridges and your choice of Fairy Mountain or Furong Cave.",
    "先读懂重庆的立体城市景观，再住进武隆仙女山度假区，游览天生三桥，并在仙女山与芙蓉洞之间选择一项。",
    "충칭의 입체적인 도시 풍경과 우룽 1박을 연결해 천생삼교를 둘러보고, 선녀산과 부용동 중 한 곳을 선택합니다.",
  ),
  summary: l(
    "Three nights in Chongqing and one in Wulong, with private transport, three English-guided touring days and the listed basic admissions.",
    "重庆 3 晚、武隆 1 晚，D2–D4 英语导游，全程按行程安排私车与列明基础门票。",
    "충칭 3박과 우룽 1박, D2~D4 영어 가이드, 일정 내 전용 차량과 명시된 기본 입장권이 포함됩니다.",
  ),
  highlights: lists(
    [
      "Chongqing's rail and river cityscape",
      "Three Natural Bridges",
      "An overnight stay in Wulong",
      "Choose Fairy Mountain or Furong Cave",
    ],
    [
      "重庆轻轨与两江城市景观",
      "武隆天生三桥",
      "仙女山度假区住一晚",
      "仙女山或芙蓉洞二选一",
    ],
    [
      "충칭의 모노레일과 두 강 풍경",
      "우룽 천생삼교",
      "우룽 1박",
      "선녀산 또는 부용동 중 선택",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Chongqing", "抵达重庆", "충칭 도착"),
      l(
        "Your English-speaking guide and driver meet you at Chongqing airport or railway station and take you and your luggage by private air-conditioned vehicle to your Chongqing hotel. The guide helps with pickup and hotel check-in. There is no fixed sightseeing today, so you can settle in; overnight in Chongqing.",
        "英语导游和司机在重庆机场或车站接你，连人带行李乘空调专车送到重庆酒店，导游协助接机或接站和办理入住。当天不安排固定景点，安顿好后在重庆住下。",
        "영어 가이드와 기사가 충칭 공항이나 기차역에서 맞이해 짐과 함께 에어컨을 갖춘 전용 차량으로 충칭 호텔까지 모셔다 드립니다. 가이드가 공항 또는 역 픽업과 호텔 체크인을 도와 드립니다. 이날은 고정 관광 일정이 없으니 편하게 짐을 푸시고 충칭에서 숙박합니다.",
      ),
    ),
    day(
      2,
      l("Chongqing city", "重庆城市日", "충칭 도심"),
      l(
        "Your English-speaking guide and private vehicle pick you up at your Chongqing hotel. Visit Liziba, continue through the river and city viewpoints, then add either Three Gorges Museum or the exterior of Hongya Cave, in line with the confirmed operating plan. Back to the same Chongqing hotel afterwards.",
        "英语导游和专车从重庆酒店出发，先去李子坝，再到两江和城市观景点；最后按确认好的开放和执行安排，去三峡博物馆或看洪崖洞外观其中一处，当晚回到同一家重庆酒店。",
        "영어 가이드와 전용 차량으로 충칭 호텔에서 출발해 리쯔바를 먼저 보고 두 강과 도심 전망 지점으로 이어갑니다. 이어서 확정된 운영 계획에 따라 삼협박물관 또는 홍야동 외관 중 한 곳을 더합니다. 일정을 마치면 같은 충칭 호텔로 돌아옵니다.",
      ),
    ),
    day(
      3,
      l("Chongqing to Wulong", "重庆前往武隆", "충칭에서 우룽으로"),
      l(
        "Check out of your Chongqing hotel and head to Wulong with your luggage in the private vehicle. At the Three Natural Bridges, the current standard admission includes the official transfer bus and Tianlong revolving elevator; you follow the site's operating route and its walking sections. Then on to your hotel in the Fairy Mountain resort area for the night.",
        "从重庆酒店退房，行李放在专车上一起去武隆。天生三桥当前标准票包含官方中转车和天龙旋梯，到了按景区实际运营路线和步行路段游览；之后去仙女山度假区的酒店入住。",
        "충칭 호텔에서 체크아웃하고 짐은 전용 차량에 실어 우룽으로 갑니다. 천생삼교의 현재 표준 입장권에는 공식 환승버스와 톈룽 회전 엘리베이터가 포함되며, 현장 운영 동선과 도보 구간을 따라 둘러봅니다. 이후 선녀산 리조트 지역 호텔로 이동해 숙박합니다.",
      ),
    ),
    day(
      4,
      l(
        "Wulong choice and return",
        "武隆二选一后返程",
        "우룽 선택 일정 후 귀환",
      ),
      l(
        "Check out of the Wulong hotel with your luggage in the private vehicle. Today includes just one visit, and your written confirmation names which: either the Fairy Mountain admission ticket or the Furong Cave admission-and-ropeway package. Only one is included, not both. Then return by road to Chongqing and check in for your final night.",
        "从武隆酒店退房，行李放在专车上。今天只游览一项，书面确认单上会写明是仙女山门票，还是芙蓉洞门票及索道套票；两者仅含其一，不同时包含。结束后乘车回重庆，当晚住重庆。",
        "우룽 호텔에서 체크아웃하고 짐은 전용 차량에 싣습니다. 이날은 한 곳만 방문하며, 선녀산 입장권과 부용동 입장권·케이블카 패키지 중 어느 쪽인지 서면 확인서에 적어 드립니다. 둘 중 하나만 포함하며 두 항목을 모두 포함하지 않습니다. 이후 차량으로 충칭에 돌아와 마지막 밤을 보냅니다.",
      ),
    ),
    day(
      5,
      l("Depart Chongqing", "重庆返程", "충칭 출발"),
      l(
        "Check out of your Chongqing hotel and travel with your luggage by private air-conditioned vehicle to the airport or railway station, with an English-speaking guide to help with the departure transfer. There is no fixed sightseeing today, which leaves a practical buffer before you leave.",
        "从重庆酒店退房，司机开空调专车连人带行李送你去机场或车站，英语导游随行协助。当天不安排固定景点，给返程留出缓冲。",
        "충칭 호텔에서 체크아웃한 뒤 짐과 함께 에어컨을 갖춘 전용 차량으로 공항이나 기차역에 갑니다. 영어 가이드가 동행해 출발 이동을 도와 드립니다. 이날은 고정 관광 일정이 없어 출발 전에 필요한 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Three nights in Chongqing and one in Wulong, in Ctrip 4-Diamond–rated rooms with breakfast. The published 2- and 4-traveller prices are based on twin sharing; we confirm other room arrangements with you individually.",
    "重庆 3 晚、武隆 1 晚，均住携程 4 钻双床房，含早餐；页面上的 2 人和 4 人价按两人一间计算，其他人数的分房我们单独帮你确认。",
    "충칭 3박과 우룽 1박 모두 중국 씨트립 기준 4다이아 등급 호텔에 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 밖의 인원은 객실 구성을 따로 확인해 드립니다.",
  ),
  serviceNote: l(
    "On Days 1 and 5, a private driver and air-conditioned vehicle handle your transfers, with an English-speaking guide to help you arrive and depart; on Days 2–4 you have an English guide and private air-conditioned vehicle. The current Three Natural Bridges standard admission includes the official transfer bus and Tianlong revolving elevator; the exit battery car and glass viewing platform are included only when written in your confirmation. Day 4 includes either the Fairy Mountain admission ticket or the Furong Cave admission-and-ropeway package, as named in your confirmation. No shopping stops.",
    "D1 和 D5 由司机开空调专车接送，英语导游协助你抵达和返程；D2–D4 有英语导游和行程内空调专车，包括重庆—武隆段。天生三桥当前标准票包含官方中转车和天龙旋梯；出口电瓶车、玻璃眺台仅在确认单写明时包含。D4 含仙女山门票或芙蓉洞门票及索道套票其中一项，确认单上会写明是哪一项。全程无购物店安排。",
    "D1·D5에는 기사가 에어컨을 갖춘 전용 차량으로 픽업·샌딩하며, 영어 가이드가 도착과 출발을 도와 드립니다. D2~D4에는 영어 가이드와 에어컨을 갖춘 전용 차량이 포함되며, 충칭~우룽 구간도 포함됩니다. 천생삼교의 현재 표준 입장권에는 공식 환승버스와 톈룽 회전 엘리베이터가 포함됩니다. 출구 전동카트와 유리 전망대는 확인서에 적힌 경우에만 포함됩니다. D4에는 선녀산 입장권 또는 부용동 입장권·케이블카 패키지 중 하나가 포함되며, 어느 쪽인지 확인서에 적어 드립니다. 쇼핑 일정은 없습니다.",
  ),
  exclusions: commonExclusions(
    [
      "Three Natural Bridges exit battery car and glass viewing platform unless written in the confirmation",
      "The Day 4 attraction not selected",
      "Unlisted night cruises and shows",
    ],
    [
      "确认单未写明的天生三桥出口电瓶车和玻璃眺台",
      "D4 未选择的另一景点",
      "未列夜游或演出",
    ],
    [
      "확인서에 명시되지 않은 천생삼교 출구 전동카트와 유리 전망대",
      "D4에 선택하지 않은 다른 관광지",
      "일정에 없는 야간 유람선과 공연",
    ],
  ),
  bookingNote: l(
    "Day 4 includes either the Fairy Mountain admission ticket or the Furong Cave admission-and-ropeway package, not both; the included option will be written into the confirmation. Mountain weather and walking ability can affect the final plan. " +
      commonBookingNote.en,
    "D4 仅包含仙女山门票或芙蓉洞门票及索道套票其中一项，包含项会明确写入确认单；山区天气与客人体力可能影响执行。" +
      commonBookingNote.zh,
    "D4에는 선녀산 입장권 또는 부용동 입장권·케이블카 패키지 중 하나만 포함되며 포함 항목은 확인서에 명시됩니다. 산악 날씨와 보행 능력에 따라 일정이 조정될 수 있습니다. " +
      commonBookingNote.ko,
  ),
  heroImage: image(
    "/images/tours/chongqing-wulong-5-day-private-tour/gallery-hongyadong-qiansimen-1600.webp",
    l(
      "Hongya Cave and Qiansimen Bridge illuminated beside the Jialing River",
      "嘉陵江畔亮灯的洪崖洞与跨江大桥",
      "자링강변에 불이 켜진 훙야둥과 첸쓰먼대교",
    ),
    l(
      "Begin in the vertical city before heading into Wulong.",
      "从立体山城出发，再深入武隆。",
      "수직 도시에서 시작해 우룽으로 들어갑니다.",
    ),
    1600,
    1000,
    "65% 50%",
  ),
  gallery: [
    image(
      "/images/tours/chongqing-wulong-5-day-private-tour/gallery-wulong-canyon-1600.webp",
      l(
        "A limestone canyon and stream in Wulong",
        "武隆石灰岩峡谷与溪流",
        "우룽 석회암 협곡과 계류",
      ),
      l(
        "Wulong adds a quieter natural chapter after Chongqing's dense urban layers.",
        "离开重庆密集的立体城市，走进武隆峡谷，换一段更安静的自然风景。",
        "충칭의 빽빽한 수직 도시를 떠나 우룽 협곡의 조용한 자연으로 이어집니다.",
      ),
    ),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Chongqing arrival", "抵达重庆", "충칭 도착"),
        "/images/tours/chongqing-wulong-5-day-private-tour/arrival-jiangbei-airport-1600.webp",
        l(
          "Self-service check-in area at Chongqing Jiangbei International Airport",
          "重庆江北国际机场自助值机区域",
          "충칭 장베이국제공항 셀프 체크인 구역",
        ),
        l(
          "One common arrival gateway; your airport or railway-station pickup is confirmed for your booking.",
          "常见的到达口之一；具体在哪个机场或车站接你，按你的订单确认。",
          "대표적인 도착 관문 중 한 곳입니다. 공항 또는 역 픽업은 예약에 맞춰 확정합니다.",
        ),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Liziba city geography", "李子坝立体城市", "리쯔바 도시 지형"),
        "/images/tours/chongqing-wulong-5-day-private-tour/liziba-train-through-building-1600.webp",
        l(
          "A Line 2 train passing through Liziba Station with hillside buildings above and roads below",
          "重庆轨道 2 号线列车穿过李子坝站，上方可见山坡建筑、下方可见道路",
          "충칭 2호선 열차가 리쯔바역 건물을 통과하고 위쪽에는 산비탈 건물, 아래에는 도로가 보이는 장면",
        ),
        l(
          "A train passing through the building at Liziba, with Chongqing's street levels above and below. Timetables and viewing-platform access can vary.",
          "李子坝轻轨穿楼而过，重庆街道高低错落；班次和观景平台是否开放，以当天实际情况为准。",
          "리쯔바에서 열차가 건물을 통과하고, 충칭의 도로가 위아래로 층층이 이어집니다. 열차 시간과 전망대 이용 여부는 당일 상황에 따라 다를 수 있습니다.",
        ),
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Three Natural Bridges", "武隆天生三桥", "우룽 천생삼교"),
        "/images/destinations/chongqing/wulong-1200.webp",
        l(
          "Natural-bridge karst landscape at Wulong",
          "武隆天生三桥喀斯特景观",
          "우룽 천생삼교 카르스트 풍경",
        ),
        l(
          "Wulong's natural-bridge landscape. We check weather, shuttle and walking conditions for your visit.",
          "武隆天生三桥地貌；天气、景区交通和步行条件，按实际游览时确认。",
          "우룽 천생삼교 지형입니다. 날씨와 셔틀, 보행 조건은 방문 시점에 확인해 드립니다.",
        ),
        1200,
        800,
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Chongqing East railway departure", "重庆东站返程", "충칭동역 출발"),
        "/images/destinations/chongqing/chongqing-east-station-1200.webp",
        l(
          "Approach to Chongqing East Railway Station",
          "重庆东站站房与道路进站区域",
          "충칭동역 건물과 도로 진입 구역",
        ),
        l(
          "Chongqing East is one possible departure station; your station or airport transfer is confirmed for your booking.",
          "重庆东站是可能的返程车站之一；具体送到哪个车站或机场，按你的订单确认。",
          "충칭동역은 출발 가능한 기차역 중 하나입니다. 실제 역 또는 공항 이동은 예약에 맞춰 확정합니다.",
        ),
        1200,
        750,
      ),
    ),
  ],
  packages: [
    standardPackage(
      "standard-guided",
      standardLabel,
      standardSummary,
      [4543, 3308],
      [699, 509],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-07",
};

const guilinYangshuo: PrivateTourProduct = {
  id: "private-tour-guilin-yangshuo-5d4n",
  slug: "guilin-yangshuo-5-day-private-tour",
  days: 5,
  nights: 4,
  servicePolicy: standardServicePolicy,
  title: l(
    "Guilin & Yangshuo: 5-Day Private Tour",
    "桂林·阳朔 5 天 4 晚私家团",
    "구이린·양숴 5일 프라이빗 투어",
  ),
  metadataDescription: l(
    "Five-day Guilin and Yangshuo private tour with a Li River cruise, two Yangshuo nights, three English-guided days and separate cruise-day luggage transfer.",
    "桂林阳朔5天4晚私家团，含漓江游船、阳朔连住2晚、D2–D4英语导游、行程内私车及游船日行李单独转运。桂林与阳朔各住2晚。",
    "구이린·양숴 4박 5일 프라이빗 투어. 리강 유람선, 양숴 연속 2박, D2~D4 영어 가이드와 전용 차량, 유람선 당일 수하물 별도 이동이 포함됩니다.",
  ),
  eyebrow: l(
    "River landscapes at an unhurried pace",
    "沿漓江慢慢进入山水之间",
    "리강을 따라 천천히 만나는 산수",
  ),
  lede: l(
    "Cruise the Li River into Yangshuo, slow down among the countryside and return to Guilin with a flexible final sightseeing choice.",
    "乘漓江游船从桂林进入阳朔，在乡村山水里放慢节奏，再返回桂林完成一项轻松游览。",
    "리강 유람선으로 양숴에 들어가 전원 풍경을 여유롭게 즐기고, 구이린으로 돌아와 마지막 명소를 선택합니다.",
  ),
  summary: l(
    "Two nights in Guilin and two in Yangshuo, with private transfers, three English-guided touring days, the Li River cruise and luggage moved separately on cruise day.",
    "桂林 2 晚 + 阳朔 2 晚，D2–D4 英语导游；含漓江游船、行程内私车，并在游船日单独转运行李。",
    "구이린 2박과 양숴 2박, D2~D4 영어 가이드, 리강 유람선과 일정 내 전용 차량, 유람선 당일 수하물 별도 이동이 포함됩니다.",
  ),
  highlights: lists(
    [
      "Li River cruise from Guilin to Yangshuo",
      "Two nights based in Yangshuo",
      "Countryside walk, family activity or gentle cycling",
      "Choose Reed Flute Cave or Elephant Trunk Hill",
    ],
    [
      "漓江游船桂林至阳朔",
      "阳朔连住 2 晚",
      "乡村慢游、家庭体验或轻骑行",
      "芦笛岩或象鼻山二选一",
    ],
    [
      "구이린에서 양숴까지 리강 유람선",
      "양숴 2박",
      "전원 산책, 가족 체험 또는 가벼운 자전거",
      "노적암 또는 상비산 중 한 곳",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Guilin", "抵达桂林", "구이린 도착"),
      l(
        "Your English-speaking guide and private driver meet you at Guilin airport or railway station and take you and your luggage to your Guilin hotel. The guide helps with the transfer and check-in; there is no sightseeing today, so you can settle in. Overnight in Guilin.",
        "英语导游和司机在桂林机场或车站接你，连人带行李送到桂林酒店，导游协助接送和入住。当天不安排景点，安顿下来好好休息，当晚住桂林。",
        "영어 가이드와 전용 차량 기사가 구이린 공항이나 기차역에서 맞이해 짐과 함께 구이린 호텔까지 모셔다 드립니다. 가이드가 이동과 체크인을 도와 드리며, 이날은 관광 일정이 없으니 편하게 쉬세요. 구이린에서 숙박합니다.",
      ),
    ),
    day(
      2,
      l(
        "Li River to Yangshuo",
        "乘漓江游船到阳朔",
        "리강 유람선으로 양숴 이동",
      ),
      l(
        "After checking out of your Guilin hotel, you are driven to the Li River pier to board the cruise to Yangshuo. Your luggage goes separately by road under the written handover plan; once you step off the boat, continue to your Yangshuo hotel for the night.",
        "桂林酒店退房后，乘车前往漓江码头，登船去阳朔。行李按书面交接方案另车转运；下船后前往阳朔酒店，当晚住阳朔。",
        "구이린 호텔에서 체크아웃한 뒤 차량으로 리강 선착장에 가서 양숴행 유람선에 오릅니다. 짐은 서면 인계 계획에 따라 별도 차량으로 옮기며, 배에서 내리면 양숴 호텔로 이동해 숙박합니다.",
      ),
    ),
    day(
      3,
      l("Yangshuo countryside", "阳朔乡村慢游", "양숴 전원 풍경"),
      l(
        "Your guide and local private transport take you from your Yangshuo hotel into the Yulong River countryside. Follow a gentle route and do one simple family activity or some light cycling, whichever has been arranged for your group, then head back to the same Yangshuo hotel for your second night.",
        "导游和当地专车从阳朔酒店出发，带你去遇龙河沿线乡村。节奏轻松，安排一项基础家庭体验或轻骑行，结束后回到同一家阳朔酒店，住第二晚。",
        "가이드와 현지 전용 차량으로 양숴 호텔을 출발해 위룽허 전원 지역을 둘러봅니다. 여유로운 동선으로 간단한 가족 체험 또는 가벼운 자전거 중 정해진 한 가지를 진행한 뒤, 같은 양숴 호텔로 돌아와 두 번째 밤을 보냅니다.",
      ),
    ),
    day(
      4,
      l("Return to Guilin", "返回桂林", "구이린 귀환"),
      l(
        "Check out with your luggage in the private vehicle and drive back to Guilin. Visit Reed Flute Cave or Elephant Trunk Hill—only one of the two is included, as set out in your written confirmation—then check in at your Guilin hotel for the final night.",
        "阳朔酒店退房后，行李放在专车上，一路返回桂林。游览芦笛岩或象鼻山其中一处（只含一项，以书面确认单为准），之后入住桂林酒店，住最后一晚。",
        "양숴 호텔에서 체크아웃하고 짐은 전용 차량에 실은 채 구이린으로 돌아갑니다. 노적암과 상비산 중 한 곳을 둘러봅니다. 포함되는 곳은 한 곳뿐이며, 서면 확인서에 적힌 곳으로 갑니다. 이후 구이린 호텔에 체크인해 마지막 밤을 보냅니다.",
      ),
    ),
    day(
      5,
      l("Depart Guilin", "桂林返程", "구이린 출발"),
      l(
        "Check out and travel with your luggage by private vehicle to the airport or railway station, with your English-speaking guide assisting on the transfer. There is no sightseeing today, so the day is kept clear for your departure.",
        "桂林酒店退房后，专车连人带行李送你去机场或车站，英语导游协助送机或送站。当天不安排景点，时间留给返程。",
        "구이린 호텔에서 체크아웃한 뒤 짐과 함께 전용 차량으로 공항이나 기차역에 갑니다. 영어 가이드가 출발 이동을 도와 드립니다. 이날은 관광 일정 없이 출발에 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Two nights in Guilin and two in Yangshuo, all in Ctrip 4-Diamond–rated hotels with breakfast. The 2- and 4-traveller prices shown are based on twin sharing; we confirm any other room arrangement individually.",
    "桂林 2 晚 + 阳朔 2 晚，均为携程 4 钻酒店双床房，含早餐。页面上的 2 人和 4 人价格按两人一间计算；其他人数怎么分房，我们会单独确认。",
    "구이린 2박과 양숴 2박 모두 중국 씨트립 기준 4다이아 등급 호텔이며 조식이 포함됩니다. 페이지의 2명·4명 요금은 2인 1실 기준이며, 그 외 인원의 객실 구성은 따로 확인해 드립니다.",
  ),
  serviceNote: l(
    "Included: private arrival and departure transfers with English-speaking guide assistance on Days 1 and 5; English-guided sightseeing on Days 2–4; the Li River cruise, with your luggage moved separately that day; air-conditioned private road transport; and the listed adult admission for one Day 4 sight. Day 3 includes one simple family activity or gentle cycling, chosen to suit your group—a basic local experience rather than a named premium programme, and bamboo rafting is not a given. No shopping stops.",
    "含 D1/D5 私人接送及英语导游协助、D2–D4 英语导游游览、漓江游船、D2 行李另车转运、行程内空调私车，以及 D4 两处景点中一处的成人基础门票。D3 含一项基础家庭体验或轻骑行，按同行人的情况确认；这是简单的当地体验，不是指定品牌或高阶项目，竹筏也不一定能安排。全程不进购物店。",
    "D1·D5 전용 차량 픽업·샌딩과 영어 가이드 지원, D2~D4 영어 가이드 관광, 리강 유람선, D2 수하물 별도 이동, 에어컨 전용 차량과 D4 선택 관광지 한 곳의 성인 기본 입장권이 포함됩니다. D3에는 일행에 맞춰 정하는 간단한 가족 체험 또는 가벼운 자전거 일정 한 가지가 포함됩니다. 기본적인 현지 체험이며 특정 프리미엄 프로그램은 아니고, 대나무 뗏목은 항상 가능한 것은 아닙니다. 쇼핑 일정은 없습니다.",
  ),
  exclusions: commonExclusions(
    [
      "Impression Liu Sanjie and other shows",
      "Bamboo-raft upgrades and the Day 4 attraction not selected",
    ],
    ["《印象刘三姐》等演出", "竹筏升级及 D4 未选择的另一景点"],
    [
      "인상유삼저 등 공연",
      "대나무 뗏목 업그레이드와 D4에 선택하지 않은 관광지",
    ],
  ),
  bookingNote: l(
    "River levels and weather can change cruise or countryside activities. We will confirm the sailing, cabin class, pier, luggage handover and age or height limits before payment. " +
      commonBookingNote.en,
    "水位与天气可能影响游船或乡村体验。付款前会确认船班、舱等、码头、行李交接和年龄/身高限制。" +
      commonBookingNote.zh,
    "수위와 날씨에 따라 유람선 또는 전원 체험이 달라질 수 있습니다. 결제 전 선편, 좌석 등급, 선착장, 수하물 인계와 연령·신장 제한을 확인합니다. " +
      commonBookingNote.ko,
  ),
  faq: [
    {
      question: l(
        "Is the Li River cruise included, and what happens to our luggage?",
        "包含漓江游船吗？行李怎么走？",
        "리강 유람선이 포함되나요? 수하물은 어떻게 이동하나요?",
      ),
      answer: l(
        "Yes—the Day 2 cruise from Guilin to Yangshuo is included, and your luggage goes separately by road under a written handover plan. Before you pay, we confirm the sailing, cabin class, pier and luggage handover with you.",
        "包含。D2 从桂林乘漓江游船到阳朔，行李按书面交接方案另车转运；船班、舱等、码头和行李交接，付款前都会跟你确认。",
        "네, D2 구이린에서 양숴로 가는 리강 유람선이 포함됩니다. 짐은 서면 인계 계획에 따라 별도 차량으로 옮깁니다. 선편, 좌석 등급, 선착장과 수하물 인계는 결제 전에 확인해 드립니다.",
      ),
    },
    {
      question: l(
        "Why stay two nights in Yangshuo, and does the route include Longji?",
        "为什么在阳朔连住两晚？包含龙脊梯田吗？",
        "양숴에서 왜 2박하나요? 룽지 계단식 논도 포함되나요?",
      ),
      answer: l(
        "Two nights in a row free up Day 3 for the Yulong River countryside, with no hotel change. This five-day route then returns to Guilin and does not include the Longji Rice Terraces. If you'd like to add Longji, we would need to look again at the route, timing and quote.",
        "阳朔连住两晚，把D3留给遇龙河沿线乡村，不用当天再换酒店。这条5天路线随后返回桂林，不含龙脊梯田；如想加入龙脊，需要重新评估路线、时间和报价。",
        "양숴에서 연속 2박하며 D3는 숙소를 옮기지 않고 위룽허 전원 지역을 둘러봅니다. 이 5일 코스는 구이린으로 돌아오며 룽지 계단식 논은 포함하지 않습니다. 룽지를 추가하려면 동선, 시간과 견적을 다시 검토해야 합니다.",
      ),
    },
    {
      question: l(
        "Are bamboo rafting and both Guilin attractions included?",
        "竹筏、芦笛岩和象鼻山都包含吗？",
        "대나무 뗏목과 구이린 관광지 두 곳이 모두 포함되나요?",
      ),
      answer: l(
        "The Li River cruise is included; bamboo-raft upgrades are extra. Day 3 includes one simple family activity or gentle cycling, chosen to suit your group. Day 4 includes Reed Flute Cave or Elephant Trunk Hill—only one, as set out in your written confirmation, not both.",
        "包含的是漓江游船，竹筏升级另计。D3 含一项基础家庭体验或轻骑行，按同行人的情况确认；D4 游览芦笛岩或象鼻山其中一处，以书面确认单为准，不是两处都含。",
        "리강 유람선은 포함되며, 대나무 뗏목 업그레이드는 별도입니다. D3에는 일행에 맞춰 정한 간단한 가족 체험 또는 가벼운 자전거 일정 한 가지가 포함됩니다. D4는 노적암과 상비산 중 서면 확인서에 적힌 한 곳만 포함되며, 두 곳 모두는 아닙니다.",
      ),
    },
  ],
  heroImage: image(
    "/images/guides/yangshuo-town-or-yulong-river-where-to-stay/hero-1600.webp",
    l(
      "Bamboo rafts on the Yulong River below karst hills in Yangshuo",
      "阳朔喀斯特山峰与竹林下的遇龙河实景",
      "양숴 카르스트 산과 대나무 숲 아래 위룽허 풍경",
    ),
    l(
      "A real Yulong River scene from the slower Yangshuo part of the route. It is not the Li River cruise, and rafts may not be running when you travel.",
      "遇龙河乡村实景，看看阳朔这一段的慢节奏。这不是漓江游船画面，竹筏也不一定在运营。",
      "실제 위룽허 전원 풍경으로 양숴 일정의 느긋한 리듬을 보여 드립니다. 리강 유람선 사진은 아니며, 뗏목 운항 여부는 시기에 따라 다를 수 있습니다.",
    ),
    1600,
    1000,
  ),
  gallery: [
    image(
      "/images/tours/guilin-yangshuo-5-day-private-tour/gallery-li-river-aerial-1600.webp",
      l(
        "The Li River winding through karst peaks near Yangshuo",
        "漓江穿行于阳朔喀斯特峰林之间",
        "양숴 카르스트 봉우리 사이를 흐르는 리강",
      ),
      l(
        "From the air, you can see why the route follows the river one way from Guilin into Yangshuo.",
        "从空中看，就能明白行程为何从桂林走水路单程进入阳朔。",
        "하늘에서 보면 왜 구이린에서 양숴까지 강을 따라 한 방향으로 가는지 알 수 있습니다.",
      ),
    ),
    image(
      "/images/tours/guilin-yangshuo-5-day-private-tour/gallery-sun-moon-towers-1600.webp",
      l(
        "Sun and Moon Pagodas reflected in Guilin's lake at sunset",
        "夕阳下倒映湖面的桂林日月双塔",
        "해질 무렵 호수에 비친 구이린 일월쌍탑",
      ),
      l(
        "A Guilin evening scene bookends the two-night Yangshuo stay.",
        "桂林湖畔的傍晚，阳朔两晚的前后都住在桂林。",
        "구이린의 호숫가 저녁 풍경. 양숴 2박의 앞뒤로 구이린에서 묵습니다.",
      ),
    ),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Guilin Railway Station arrival", "抵达桂林站", "구이린역 도착"),
        "/images/guides/guilin-airport-or-railway-station-arrival-guide/hero-1600.webp",
        l(
          "The forecourt and entrance of Guilin Railway Station",
          "桂林站站前广场与进站口",
          "구이린역 앞 광장과 출입구",
        ),
        l(
          "Guilin Railway Station, one possible arrival point; we confirm airport and other-station pickups separately.",
          "桂林站，你可能到达的地点之一；机场或其他车站的接送另行确认。",
          "구이린역 · 가능한 도착지 중 한 곳. 공항이나 다른 역 픽업은 따로 확정해 드립니다.",
        ),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Li River cruise", "漓江游船", "리강 유람선"),
        "/images/tours/guilin-yangshuo-5-day-private-tour/li-river-cruise-1600.webp",
        l(
          "A cruise boat travelling between Li River karst peaks",
          "游船穿行于漓江喀斯特峰林之间",
          "리강 카르스트 봉우리 사이를 지나는 유람선",
        ),
        l(
          "On the river towards Yangshuo; the sailing, pier and cabin details are confirmed for your travel date.",
          "前往阳朔的水路。船班、码头和舱等按你的出行日期确认。",
          "양숴로 향하는 강 여정. 운항편, 선착장과 좌석 등급은 여행 날짜에 맞춰 확정합니다.",
        ),
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Yulong River countryside", "遇龙河乡村", "위룽허 전원"),
        "/images/tours/guilin-yangshuo-5-day-private-tour/yulong-countryside-1600.webp",
        l(
          "A bamboo raft and fields beneath Yangshuo's karst hills",
          "阳朔喀斯特峰林下的竹筏、田野与水面",
          "양숴 카르스트 산 아래의 대나무 뗏목과 들판",
        ),
        l(
          "Day 3 takes you into countryside like this for one simple family activity or gentle cycling; the rafts in the photo may not be running when you visit.",
          "D3 就在这样的乡村里安排一项基础家庭体验或轻骑行；照片里的竹筏，出行时不一定在运营。",
          "D3에는 이런 전원 풍경 속에서 간단한 가족 체험 또는 가벼운 자전거 일정 한 가지를 진행합니다. 사진 속 뗏목은 여행 시기에 운항하지 않을 수 있습니다.",
        ),
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Elephant Trunk Hill option", "象鼻山选项", "상비산 선택"),
        "/images/tours/guilin-yangshuo-5-day-private-tour/elephant-trunk-hill-1600.webp",
        l(
          "Elephant Trunk Hill beside the river in Guilin",
          "桂林江畔的象鼻山",
          "구이린 강변의 상비산",
        ),
        l(
          "Elephant Trunk Hill, one of two Day 4 options. Only one—Reed Flute Cave or Elephant Trunk Hill—is included, as set out in your written confirmation.",
          "象鼻山，D4 两个选项之一。D4 含芦笛岩或象鼻山其中一项，以确认单为准。",
          "상비산 · D4 선택지 중 하나. D4에는 노적암과 상비산 중 한 곳만 포함되며, 확인서에 적힌 곳으로 갑니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage(
      "standard-guided",
      standardLabel,
      standardSummary,
      // Owner-approved TCG 4-star benchmark minus USD20/person, 2026-09-06.
      [4998, 4088],
      [769, 629],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-19",
};

const harbinWinter: PrivateTourProduct = {
  id: "private-tour-harbin-winter-5d4n",
  slug: "harbin-winter-5-day-private-tour",
  days: 5,
  nights: 4,
  servicePolicy: standardServicePolicy,
  title: l(
    "Harbin Ice & Snow: 5-Day Private Tour",
    "哈尔滨冰雪 5 天 4 晚私家团",
    "하얼빈 빙설 5일 프라이빗 투어",
  ),
  eyebrow: l(
    "A date-specific winter journey",
    "只在冰雪季指定日期内安排",
    "기간이 정해진 겨울 여행",
  ),
  lede: l(
    "Experience Harbin's winter architecture, frozen river activities and Ice and Snow World with heated private transport and an itinerary timed for daylight and the night display.",
    "在标明的冰雪季日期内，坐暖风车辆串起哈尔滨城市建筑、松花江冰雪体验和冰雪大世界夜景。",
    "정해진 빙설 시즌에 난방 전용 차량으로 도심 건축과 쑹화강 체험, 빙설대세계 야경까지 둘러봅니다.",
  ),
  summary: l(
    "Four nights with breakfast, heated private transport and three touring days with an English-speaking guide. The price shown is for Sunday–Thursday check-ins within the stated dates only, excluding holidays and peak Ice Festival weekends.",
    "冰雪季在哈尔滨住 4 晚携程 4 钻酒店，含早餐；D2–D4 有英语导游和暖风车辆。基础价只适用于下方日期范围内、周日至周四入住的非节假日。",
    "하얼빈에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식, D2~D4 영어 가이드와 난방 차량이 포함됩니다. 기본가는 아래 기간 중 공휴일이 아닌 일~목요일 체크인에만 적용됩니다.",
  ),
  highlights: lists(
    [
      "Central Street and Saint Sophia exterior",
      "Frozen Songhua River experiences",
      "Volga Manor or one specific alternative, named before payment",
      "Ice and Snow World from afternoon into evening",
    ],
    [
      "中央大街与圣索菲亚教堂外观",
      "松花江冰雪体验",
      "伏尔加庄园，或付款前书面写明的另一项冬季文化项目",
      "冰雪大世界下午至夜间时段",
    ],
    [
      "중앙대가와 성 소피아 성당 외관",
      "얼어붙은 쑹화강 체험",
      "볼가장원 또는 결제 전 서면으로 명시한 다른 겨울 문화 프로그램",
      "오후부터 야간까지 빙설대세계",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Harbin", "抵达哈尔滨", "하얼빈 도착"),
      l(
        "Your English-speaking guide and driver meet you at Harbin airport or railway station and take you and your luggage to your hotel in a winter-ready private vehicle, with the guide helping with arrival and check-in. There is no fixed sightseeing today, so use the rest of the day to settle in; overnight in Harbin.",
        "英语导游和司机在哈尔滨机场或车站接你，连人带行李坐冬季车辆去酒店，导游协助你抵达和入住。当天不安排固定景点，余下时间好好安顿、适应一下；当晚住哈尔滨。",
        "영어 가이드와 기사가 하얼빈 공항이나 기차역에서 맞이해 짐과 함께 겨울 운행 전용 차량으로 호텔까지 모셔다 드리고, 가이드가 도착 후 이동과 호텔 체크인을 도와 드립니다. 이날은 정해진 관광 일정이 없으니 남은 시간에는 편하게 쉬며 적응하세요. 숙박은 하얼빈에서 합니다.",
      ),
    ),
    day(
      2,
      l(
        "Historic Harbin and the frozen river",
        "老城建筑与松花江",
        "하얼빈 구도심과 쑹화강",
      ),
      l(
        "Your English-speaking guide and heated private vehicle take you to the exterior of Saint Sophia Cathedral and Central Street. On the Songhua River, you then join only a named, managed ice-and-snow activity that its operator confirms open that day. Never enter unmanaged river ice. Back to the same Harbin hotel afterwards.",
        "英语导游和暖风车辆带你先看圣索菲亚教堂外观、逛中央大街。之后到松花江，只参加书面列名、由正规机构管理且经运营方确认当天开放的冰雪项目；不得自行进入未管理冰面。结束后回到同一家哈尔滨酒店。",
        "영어 가이드와 난방 전용 차량으로 성 소피아 성당 외관과 중앙대가를 둘러봅니다. 이어서 쑹화강에서는 이름이 서면에 명시되고 정식으로 관리되며 운영자가 당일 개장을 확인한 빙설 프로그램만 이용합니다. 관리되지 않는 강 얼음 위에는 들어가지 않습니다. 일정을 마치면 같은 하얼빈 호텔로 돌아옵니다.",
      ),
    ),
    day(
      3,
      l("Winter culture day", "冬季文化项目", "겨울 문화 일정"),
      l(
        "A heated private vehicle takes you from your Harbin hotel to the day's winter-culture visit. We don't sell Day 3 as an unnamed 'comparable programme': before you pay, your written confirmation names Volga Manor and one specific alternative winter-culture programme, and you choose one of the two. Back to the same Harbin hotel afterwards.",
        "从哈尔滨酒店出发，坐暖风车辆前往当天的项目。D3 不会只写一句笼统的“同等级项目”：付款前的书面确认会写明“伏尔加庄园”和另一项具体的冬季文化项目，你从这两项里选一项。游览后回到同一家哈尔滨酒店。",
        "하얼빈 호텔에서 난방 전용 차량으로 출발합니다. D3는 이름 없는 '동급 프로그램'으로 판매하지 않습니다. 결제 전 서면 확인서에 볼가장원과 구체적인 다른 겨울 문화 프로그램 한 곳을 함께 적어 드리며, 그중 한 곳을 고르시면 됩니다. 방문을 마치면 같은 하얼빈 호텔로 돌아옵니다.",
      ),
    ),
    day(
      4,
      l(
        "Snow sculptures and Ice and Snow World",
        "雪博会与冰雪大世界",
        "눈 조각과 빙설대세계",
      ),
      l(
        "Your guide and heated private vehicle take you to the Sun Island Snow Sculpture Expo, then on to Ice and Snow World from afternoon into evening; standard adult admission to both is included when they are operating. The expo visit may be shortened or swapped for a relaxed morning, but only if it is closed, or the weather or your group's pace calls for it. Back to the same hotel by vehicle for your final night.",
        "导游和暖风车辆带你先去太阳岛雪博会，下午到夜间再游览确认开放的冰雪大世界；两处景点开放期间的成人基础门票都已包含。只有在雪博会未开放，或天气、团队节奏需要时，才会缩短雪博会游览或改成轻松的上午。结束后乘车回同一家酒店，住最后一晚。",
        "가이드와 난방 전용 차량으로 타이양다오 눈조각박람회에 간 뒤, 오후부터 저녁까지 개장이 확인된 빙설대세계를 둘러봅니다. 두 곳 모두 개장 기간의 성인 기본 입장권이 포함됩니다. 박람회가 개장하지 않았거나 날씨 또는 일행의 여행 속도상 필요할 때에만 박람회 관람을 줄이거나 여유로운 오전으로 바꿉니다. 일정을 마치면 차량으로 같은 호텔에 돌아와 마지막 밤을 보냅니다.",
      ),
    ),
    day(
      5,
      l("Depart Harbin", "哈尔滨返程", "하얼빈 출발"),
      l(
        "Check out of your Harbin hotel; a winter-ready private vehicle takes you and your luggage to the airport or railway station. No guide or sightseeing is planned today, so you keep a buffer before departure.",
        "从哈尔滨酒店退房后，冬季车辆连人带行李送你去机场或车站。当天不安排导游和景点，给返程留出余量。",
        "하얼빈 호텔에서 체크아웃한 뒤 짐과 함께 겨울 운행 전용 차량으로 공항이나 기차역에 갑니다. 이날은 가이드와 관광 일정이 없어 출발 전까지 여유를 둘 수 있습니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four nights with breakfast in a Ctrip 4-Diamond–rated Harbin hotel during the stated ice-and-snow window. The 2- and 4-traveller prices shown are based on twin sharing; we confirm any other room arrangement individually.",
    "标明的冰雪季日期内，哈尔滨住 4 晚携程 4 钻双床房，含早。2 人和 4 人的公开价按两人一间计算；其他人数的分房方式，我们会单独确认。",
    "명시된 빙설 기간 동안 하얼빈의 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함됩니다. 페이지에 나온 2명·4명 요금은 2인 1실 기준이며, 그 외 인원의 객실 구성은 따로 확인해 드립니다.",
  ),
  serviceNote: l(
    "On Day 1, your English-speaking guide meets you on arrival with a private winter-ready vehicle and helps you check in at the hotel; on Day 5, a private driver takes you to the airport or station in a winter-ready vehicle. A heated private vehicle and English guide on Days 2–4 are included, along with adult admission to the listed sights (including the Sun Island Snow Sculpture Expo and Ice and Snow World when operating), hot water, headsets and basic heat patches. These aids do not replace professional cold-weather clothing, insulated snow boots, gloves and face protection. No shopping stops.",
    "D1 英语导游和冬季私车接机/站，并协助你入住酒店；D5 由司机开冬季私车送机/站。D2–D4 有英语导游和暖风车辆；行程所列成人基础门票与预约（含开放期间的太阳岛雪博会和冰雪大世界）、热水、耳麦和基础暖贴都已包含。这些用品不能替代专业防寒服、保暖雪地靴、手套和面部防护。全程无购物店安排。",
    "D1에는 영어 가이드가 겨울 운행 전용 차량으로 마중 나가 호텔 체크인까지 도와 드리고, D5에는 기사가 겨울 운행 전용 차량으로 공항이나 기차역까지 모셔다 드립니다. D2~D4 영어 가이드와 난방 차량, 일정에 있는 성인 기본 입장권(개장 기간의 타이양다오 눈조각박람회와 빙설대세계 포함), 온수, 수신기와 기본 핫팩이 포함됩니다. 이러한 보조품은 전문 방한복, 보온 방한화, 장갑과 얼굴 보호 장비를 대신하지 않습니다. 쇼핑 일정은 없습니다.",
  ),
  exclusions: commonExclusions(
    [
      "Professional cold-weather clothing, snow boots and personal snow equipment",
      "Ski lessons and unlisted snow activities",
      "Christmas, New Year, Spring Festival and major Ice Festival weekend surcharges",
    ],
    [
      "专业防寒服、雪地靴及个人雪具",
      "滑雪课程和未列雪上项目",
      "圣诞、元旦、春节及冰雪节重点周末加价",
    ],
    [
      "전문 방한복, 방한화와 개인 설상 장비",
      "스키 강습과 일정에 없는 설상 활동",
      "크리스마스, 신정, 춘절 및 빙설제 핵심 주말 추가 요금",
    ],
  ),
  bookingNote: l(
    "Harbin winter temperatures can fall below −20°C, so wear professional cold-weather clothing, insulated snow boots, gloves and face protection. Outdoor sessions may be shortened or cancelled because of wind chill, ice conditions or an operator safety decision. Heated vehicles, hot water and basic heat patches supplement that gear; they do not replace it. On the Songhua River, use only a named, managed activity that its operator confirms open that day; never enter unmanaged river ice. The per-person starting prices shown are for groups of 2 and 4 travellers, exclude flights and apply only to Sunday–Thursday check-ins from 6 January to 5 February 2027, on non-holiday dates after the main ice attractions have opened. For other group sizes, we confirm the price with you individually. Friday or Saturday stays, Christmas, New Year, Spring Festival, major Ice Festival weekends, or different operating dates need a new quote.",
    "哈尔滨冬季可能出现 −20°C 以下严寒，请穿专业防寒服、保暖雪地靴、手套并做好面部防护。室外项目可能因风寒、冰面状态或运营方安全决定缩短或取消；暖风车辆、热水和基础暖贴只能辅助，不能替代专业防寒装备。松花江冰上项目只参加书面列名、由正规机构管理且经运营方确认当天开放的项目，不得自行进入未管理冰面。页面上是 2 人和 4 人的每人起价，不含往返机票；其他人数的价格我们会单独确认。这个价格只适用于 2027 年 1 月 6 日至 2 月 5 日、周日至周四入住、核心冰雪景区已开放的非节假日。周五/周六、圣诞、元旦、春节、冰雪节重点周末，或景区实际开放日期有变，我们会重新给你报价。",
    "하얼빈 겨울에는 영하 20°C 이하의 한파가 올 수 있습니다. 전문 방한복, 보온 방한화, 장갑과 얼굴 보호 장비를 착용하세요. 체감온도, 빙면 상태 또는 운영자의 안전 판단에 따라 야외 일정이 단축되거나 취소될 수 있습니다. 난방 차량, 온수와 기본 핫팩은 보조 수단일 뿐 전문 방한 장비를 대신하지 않습니다. 쑹화강에서는 이름이 서면에 명시되고 정식으로 관리되며 운영자가 당일 개장을 확인한 프로그램만 이용하고, 관리되지 않는 강 얼음 위에는 들어가지 마세요. 페이지의 1인 시작가는 2명과 4명 기준이며 항공권은 포함되지 않습니다. 그 외 인원의 요금은 따로 확인해 드립니다. 이 가격은 주요 빙설 관광지가 개장한 뒤인 2027년 1월 6일~2월 5일 중 공휴일이 아닌 일~목요일 체크인에만 적용됩니다. 금·토요일 숙박이나 크리스마스, 신정, 춘절, 빙설제 핵심 주말, 또는 개장일이 바뀌는 경우에는 다시 견적을 드립니다.",
  ),
  heroImage: image(
    "/images/tours/harbin-winter-5-day-private-tour/hero-ice-world-1600.webp",
    l(
      "A colourful ice train and illuminated ice buildings at Harbin Ice and Snow World in 2026",
      "2026 年哈尔滨冰雪大世界的彩色冰火车与亮灯冰建筑",
      "2026년 하얼빈 빙설대세계의 화려한 얼음 기차와 조명 건축",
    ),
    l(
      "We plan Harbin's winter itinerary around the attractions' actual opening dates.",
      "哈尔滨冰雪行程按景区实际开放日期来安排。",
      "하얼빈 겨울 일정은 관광지의 실제 개장일을 기준으로 확정합니다.",
    ),
    1600,
    1000,
    "75% 50%",
  ),
  gallery: [],
  routeMedia: [
    routeGroup(
      2,
      routeVariant(
        l(
          "Saint Sophia Cathedral exterior",
          "圣索菲亚教堂外观",
          "성 소피아 성당 외관",
        ),
        "/images/tours/harbin-winter-5-day-private-tour/gallery-sophia-2026-1600.webp",
        l(
          "The complete Saint Sophia Cathedral exterior in central Harbin",
          "哈尔滨市中心完整可见的圣索菲亚教堂外观",
          "하얼빈 도심에서 온전히 보이는 성 소피아 성당 외관",
        ),
        l(
          "The visit is to the exterior; snow, lighting and interior access can vary on your travel date.",
          "行程游览教堂外观；有没有雪、是否亮灯、内部是否开放，要看出行当天情况。",
          "일정은 성당 외관을 둘러봅니다. 눈, 조명, 내부 개방 여부는 여행 당일 상황에 따라 다를 수 있습니다.",
        ),
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Depart Harbin", "哈尔滨返程", "하얼빈 출발"),
        "/images/tours/harbin-winter-5-day-private-tour/departure-harbin-station-1600.webp",
        l(
          "The symmetrical train shed and platforms inside Harbin Railway Station",
          "哈尔滨站内对称展开的站台与拱形雨棚",
          "하얼빈역 내부의 대칭형 승강장과 아치형 지붕",
        ),
        l(
          "Harbin Railway Station; if you are flying out, the transfer goes to the airport for your flight instead.",
          "照片为哈尔滨站；如果坐飞机返程，就按你的航班送去机场。",
          "사진은 하얼빈역입니다. 항공편으로 떠나시면 해당 항공편에 맞춰 공항으로 모셔다 드립니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage(
      "standard-guided-winter",
      standardLabel,
      standardSummary,
      [9483, 7670],
      [1459, 1180],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-07",
};

const shanghaiSuzhou: PrivateTourProduct = {
  id: "private-tour-shanghai-suzhou-5d4n",
  faq: shanghaiSuzhouAnswers,
  slug: "shanghai-suzhou-5-day-private-tour",
  days: 5,
  nights: 4,
  servicePolicy: standardServicePolicy,
  title: l(
    "Shanghai & Suzhou: 5-Day Private Tour",
    "上海·苏州 5 天 4 晚私家团",
    "상하이·쑤저우 5일 프라이빗 투어",
  ),
  eyebrow: l(
    "Modern Shanghai, one focused Suzhou day",
    "住在上海，留一天给苏州",
    "상하이에 머물며 쑤저우를 하루 깊게",
  ),
  lede: l(
    "Stay in one Shanghai hotel while combining the Bund, a water town and a high-speed-rail day trip to Suzhou's gardens and lanes.",
    "上海连住 4 晚，在外滩、朱家角与城市地标之外，用高铁往返苏州，避免跨城搬运行李。",
    "상하이 한 호텔에 4박하며 와이탄과 수향마을을 보고, 고속철도로 쑤저우 정원과 골목을 당일치기로 다녀옵니다.",
  ),
  summary: l(
    "Four nights in a breakfast-included Ctrip 4-Diamond–rated Shanghai hotel, a half-day arrival guide, three full guided touring days and second-class high-speed rail to and from Suzhou.",
    "上海 4 晚携程 4 钻含早住宿，D1 英语导游接机半天，D2–D4 英语导游；含上海—苏州高铁二等座往返及两端接驳。",
    "상하이에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식, D1 반일 공항 영접 가이드, D2~D4 영어 가이드, 쑤저우 왕복 2등석 고속철도가 포함됩니다.",
  ),
  highlights: lists(
    [
      "The Bund, Yu Garden and Shanghai Tower",
      "Zhujiajiao water town",
      "High-speed rail to Suzhou",
      "Humble Administrator's Garden and Pingjiang Road",
    ],
    ["外滩、豫园与上海中心", "朱家角水乡", "高铁往返苏州", "拙政园与平江路"],
    [
      "와이탄, 예원과 상하이타워",
      "주자자오 수향마을",
      "고속철도 쑤저우 왕복",
      "졸정원과 핑장루",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Shanghai", "抵达上海", "상하이 도착"),
      l(
        "Your English-speaking guide and private driver meet you at the Shanghai airport and take you and your luggage to the hotel. If your arrival leaves a usable half-day, the guide provides only the arrival help or orientation set out in your written confirmation; after a late arrival, pickup and check-in come first and no fixed sightseeing is squeezed in. You stay at the same Shanghai hotel for all four nights.",
        "英语导游和司机在上海机场接你，连人带行李乘私车送到酒店。如果抵达后还有可用的半天，导游只按确认单写明的内容做抵达协助或导览；如果到得较晚，就以接机和协助入住为主，不硬塞固定景点。4 晚都住同一家上海酒店。",
        "영어 가이드와 기사가 상하이 공항에서 맞이해 짐과 함께 전용 차량으로 호텔까지 모셔다 드립니다. 도착 후 반나절을 쓸 수 있을 때에만 확인서에 적힌 도착 지원이나 안내를 진행하고, 늦게 도착하시면 픽업과 체크인을 먼저 챙기며 고정 관광은 억지로 넣지 않습니다. 4박 모두 같은 상하이 호텔에 머뭅니다.",
      ),
    ),
    day(
      2,
      l("Essential Shanghai", "上海经典城市日", "상하이 핵심 명소"),
      l(
        "Your English-speaking guide and private vehicle collect you from the Shanghai hotel. See the Bund, continue to Nanjing Road and Yu Garden, then finish at the Shanghai Tower 118th-floor observation deck before returning to the same hotel.",
        "英语导游和私车从上海酒店接你出发，先游览外滩，再去南京路和豫园，最后登上上海中心 118 层“上海之巅”；结束后回到同一家酒店。",
        "상하이 호텔에서 영어 가이드와 전용 차량으로 출발합니다. 와이탄, 난징루와 예원을 차례로 둘러보고, 마지막으로 상하이타워 118층 전망대에 오른 뒤 같은 호텔로 돌아옵니다.",
      ),
    ),
    day(
      3,
      l(
        "Zhujiajiao and one city stop",
        "朱家角与市区一处景点",
        "주자자오와 도심 명소 한 곳",
      ),
      l(
        "A private vehicle takes you from the hotel to Zhujiajiao water town, then back to central Shanghai for either Tianzifang or the Shanghai Museum People's Square branch. The museum is an option when its exhibition period, opening day, advance reservation and ticket purchase are confirmed. From 9 July 2026 to 14 November 2027, that branch hosts only the ticketed Ancient Civilizations of the Americas exhibition; the permanent collection is at the East Museum. Only one option is included, as set out in your written confirmation; then it's back to the same hotel.",
        "私车从上海酒店送你去朱家角水乡，游览后回到市区，再去田子坊或上海博物馆人民广场馆其中一处。2026 年 7 月 9 日至 2027 年 11 月 14 日期间，人民广场馆仅开放需购票的“世界树之巅：美洲古代文明大展”，常设展在东馆；去博物馆须先确认展期与开放日，并提前预约购票。仅包含一项，以书面确认单为准，结束后回到同一家酒店。",
        "전용 차량으로 호텔을 나서 주자자오 수향마을을 둘러본 뒤, 도심으로 돌아와 톈쯔팡과 상하이박물관 인민광장관 중 한 곳에 갑니다. 2026년 7월 9일부터 2027년 11월 14일까지 인민광장관은 유료 ‘아메리카 고대문명 대전’만 운영하고 상설전시는 동관에서 열립니다. 박물관은 전시 기간과 개관일을 확인하고 사전 예약 및 입장권 구매를 마쳐야 갈 수 있습니다. 한 곳만 포함되며 서면 확인서에 적힌 곳으로 갑니다. 이후 같은 호텔로 돌아옵니다.",
      ),
    ),
    day(
      4,
      l(
        "Suzhou by high-speed rail",
        "高铁往返苏州",
        "고속철도로 쑤저우 당일치기",
      ),
      l(
        "A private transfer takes you from the Shanghai hotel to the station for your second-class high-speed train to Suzhou. In Suzhou, the local transfer links the Humble Administrator's Garden, Hanshan Temple and Pingjiang Road in the order the reservations allow; then the train and a private transfer bring you back to the same Shanghai hotel.",
        "私车从上海酒店送你到车站，乘高铁二等座去苏州。到苏州后由苏州接驳串起拙政园、寒山寺和平江路，先后顺序按预约情况安排；之后乘高铁回上海，私车接回同一家酒店。",
        "상하이 호텔에서 전용 차량으로 역까지 이동해 2등석 고속열차로 쑤저우에 갑니다. 쑤저우에서는 현지 차량으로 졸정원, 한산사, 핑장루를 예약 가능한 순서대로 둘러보고, 열차와 전용 차량으로 같은 상하이 호텔에 돌아옵니다.",
      ),
    ),
    day(
      5,
      l("Depart Shanghai", "上海返程", "상하이 출발"),
      l(
        "Check out and travel with your luggage by private air-conditioned vehicle to the airport, with an English-speaking guide helping with the departure transfer. There is no fixed sightseeing today, which leaves room for check-out, city traffic and your flight.",
        "退房后，司机开空调私车连人带行李送你去机场，英语导游随行协助送机。当天不安排固定景点，给退房、市内交通和航班留出余量。",
        "체크아웃 후 짐과 함께 에어컨을 갖춘 전용 차량으로 공항에 갑니다. 영어 가이드가 동행해 공항 이동을 돕습니다. 이날은 고정 관광이 없어 체크아웃과 도심 교통, 항공편 시간에 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four nights with breakfast in one Ctrip 4-Diamond–rated Shanghai hotel. The 2- and 4-traveller prices shown are for twin sharing; we confirm other room arrangements with you individually.",
    "上海 4 晚住同一家携程 4 钻酒店，双床房含早；页面上的 2 人和 4 人价格按两人一间算，其他人数怎么分房，我们单独跟你确认。",
    "상하이의 중국 씨트립 기준 4다이아 등급 호텔 한 곳에 조식 포함 4박으로 머뭅니다. 공개된 2명·4명 요금은 2인 1실 기준이며, 그 외 인원의 객실 구성은 따로 확인해 드립니다.",
  ),
  serviceNote: l(
    "Arrival pickup with a half-day English guide, guided touring on Days 2–4, departure transfer with English-speaking guide assistance on Day 5, private air-conditioned road transport, station transfers, second-class rail and listed adult admission tickets are included. No shopping stops.",
    "含 D1 接机与英语导游半天、D2–D4 英语导游、D5 司机送机及英语导游返程协助；行程内空调私车、车站接送、上海—苏州高铁二等座往返及行程所列成人基础门票，全程无购物店安排。",
    "D1 반일 영어 가이드 공항 영접, D2~D4 가이드 일정, D5 영어 가이드의 출발 지원과 공항 샌딩, 에어컨을 갖춘 전용 차량, 역 이동, 쑤저우 왕복 2등석 열차와 성인 기본 입장권이 포함되며 쇼핑 일정은 없습니다.",
  ),
  exclusions: commonExclusions(
    ["Rail upgrades or fare increases", "The Day 3 attraction not selected"],
    ["高铁升舱或临时涨价", "D3 未选择的另一项目"],
    [
      "고속철도 좌석 업그레이드 또는 운임 인상",
      "D3에 선택하지 않은 다른 관광지",
    ],
  ),
  bookingNote: l(
    "Day 3 includes either Tianzifang or the Shanghai Museum People's Square branch, not both. A museum choice requires written confirmation of the exhibition period and opening day, plus advance reservation and ticket purchase; from 9 July 2026 to 14 November 2027, the branch hosts only the ticketed Ancient Civilizations of the Americas exhibition, while the permanent collection is at the East Museum. Train station, departure, seat class and ticket conditions will also be confirmed before payment. " +
      commonBookingNote.en,
    "D3 仅包含田子坊或上海博物馆人民广场馆其中一项。选择人民广场馆时，确认单须写明展期与开放日，并提前预约购票；2026 年 7 月 9 日至 2027 年 11 月 14 日期间，该馆仅开放需购票的“世界树之巅：美洲古代文明大展”，常设展在东馆。车站、车次、席别和退改条件也会在付款前确认。" +
      commonBookingNote.zh,
    "D3에는 톈쯔팡 또는 상하이박물관 인민광장관 중 한 곳만 포함됩니다. 인민광장관을 선택할 때는 확인서에 전시 기간과 개관일을 명시하고 사전 예약 및 입장권 구매를 완료해야 합니다. 2026년 7월 9일부터 2027년 11월 14일까지 이 관은 유료 ‘아메리카 고대문명 대전’만 운영하며 상설전시는 동관에서 열립니다. 역, 열차편, 좌석 등급과 취소 조건도 결제 전에 확정합니다. " +
      commonBookingNote.ko,
  ),
  heroImage: image(
    "/images/tours/shanghai-suzhou-5-day-private-tour/hero-shanghai-clocktower-1600.webp",
    l(
      "The Bund clock tower and the Lujiazui skyline at dusk",
      "暮色中的外滩钟楼与陆家嘴天际线",
      "해 질 무렵 와이탄 시계탑과 루자쭈이 스카이라인",
    ),
    l(
      "Use Shanghai as one comfortable base for city and Suzhou touring.",
      "以上海为固定住宿点，兼顾城市与苏州游览。",
      "상하이를 편안한 거점으로 도심과 쑤저우를 함께 둘러봅니다.",
    ),
    1600,
    1000,
  ),
  gallery: [
    image(
      "/images/tours/shanghai-suzhou-5-day-private-tour/gallery-shanghai-night-1600.webp",
      l(
        "Shanghai's illuminated skyline across the Huangpu River",
        "黄浦江两岸亮灯后的上海天际线",
        "황푸강 건너 불이 켜진 상하이 스카이라인",
      ),
      l(
        "Shanghai at night, for a feel of the city; it doesn't promise a cruise, and lighting times may vary.",
        "上海夜景，呈现城市氛围；照片不代表含游船，亮灯时间以当天为准。",
        "도시 분위기를 담은 상하이 야경입니다. 유람선 포함을 뜻하지는 않으며, 조명 시간은 달라질 수 있습니다.",
      ),
    ),
    image(
      "/images/tours/shanghai-suzhou-5-day-private-tour/gallery-suzhou-museum-1600.webp",
      l(
        "The geometric roofline of Suzhou Museum",
        "苏州博物馆的几何屋面与塔影",
        "쑤저우박물관의 기하학적 지붕선",
      ),
      l(
        "Suzhou Museum is not on this route; this photo shows the modern side of Suzhou's architecture.",
        "苏州博物馆不在本行程内；这张照片让你看看苏州的当代建筑。",
        "쑤저우박물관은 이번 일정에 포함되지 않으며, 이 사진은 쑤저우의 현대 건축을 보여 줍니다.",
      ),
    ),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Shanghai arrival", "抵达上海", "상하이 도착"),
        "/images/tours/shanghai-suzhou-5-day-private-tour/arrival-shanghai-dusk-1600.webp",
        l(
          "Shanghai's riverfront skyline in the evening light",
          "傍晚光线下的上海滨江天际线",
          "저녁빛 속 상하이 강변 스카이라인",
        ),
        l(
          "Shanghai, your base for the trip. The airport, arrival time and half-day route are confirmed for your booking.",
          "上海是这趟旅程的住宿基地；机场、到达时间和半日路线按你的订单确认。",
          "상하이는 이번 여행의 숙박 거점입니다. 공항, 도착 시간과 반일 동선은 예약에 맞춰 확정합니다.",
        ),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Shanghai city day", "上海城市日", "상하이 도심 일정"),
        "/images/tours/shanghai-suzhou-5-day-private-tour/shanghai-skyline-1600.webp",
        l(
          "Shanghai Tower and the World Financial Center in the sunset light",
          "夕阳中的上海中心与环球金融中心",
          "노을 속 상하이타워와 세계금융센터",
        ),
        l(
          "Day 2 links the historic Bund with present-day Pudong.",
          "D2 的路线，从历史外滩走到当代浦东。",
          "D2 동선은 역사적인 와이탄에서 현대의 푸둥까지 이어집니다.",
        ),
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Zhujiajiao water town", "朱家角水乡", "주자자오 수향마을"),
        "/images/tours/shanghai-suzhou-5-day-private-tour/zhujiajiao-water-town.jpg",
        l(
          "Canal, stone bridge and whitewashed houses in Zhujiajiao",
          "朱家角的河道、石桥与白墙民居",
          "주자자오의 수로, 돌다리와 흰 벽의 집들",
        ),
        l(
          "A real canal scene in Zhujiajiao water town; boat services and water levels are subject to the day.",
          "朱家角水乡的真实河道；游船是否运营、水位高低以当天为准。",
          "주자자오 수향마을의 실제 수로 모습입니다. 유람선 운항과 수위는 당일 상황에 따라 다를 수 있습니다.",
        ),
        1920,
        1280,
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Humble Administrator's Garden", "拙政园", "졸정원"),
        "/images/tours/shanghai-suzhou-5-day-private-tour/suzhou-humble-garden-1600.webp",
        l(
          "Pavilion, pond and planted landscape in Suzhou's Humble Administrator's Garden",
          "苏州拙政园的亭廊、池水与园林景观",
          "쑤저우 졸정원의 정자, 연못과 정원 풍경",
        ),
        l(
          "The garden anchors the Suzhou rail day trip; weather, seasonal planting and ticket availability vary.",
          "拙政园是苏州高铁一日游的重点；天气、时令景观和门票余量都会变化。",
          "졸정원은 쑤저우 고속철도 당일 일정의 중심입니다. 날씨, 계절 풍경과 입장권 예약 상황은 달라질 수 있습니다.",
        ),
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Depart Shanghai", "上海返程", "상하이 출발"),
        "/images/tours/shanghai-suzhou-5-day-private-tour/departure-shanghai-1600.webp",
        l(
          "A quiet riverfront platform facing Shanghai's skyline",
          "面向上海天际线的滨水平台",
          "상하이 스카이라인을 바라보는 강변 플랫폼",
        ),
        l(
          "A calm last look at Shanghai; the airport and transfer time are set from your booked flight.",
          "以安静的城市画面收尾；机场和送机时间按你订好的航班确认。",
          "차분한 도시 풍경으로 여정을 마무리합니다. 공항과 이동 시간은 예약하신 항공편에 맞춰 확정합니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage(
      "standard-guided",
      standardLabel,
      standardSummary,
      [4998, 4218],
      [769, 649],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-20",
};

const beijing: PrivateTourProduct = {
  id: "private-tour-beijing-5d4n",
  slug: "beijing-highlights-5-day-private-tour",
  days: 5,
  nights: 4,
  servicePolicy: standardServicePolicy,
  title: l(
    "Beijing Highlights: 5-Day Private Tour",
    "北京经典 5 天 4 晚私家团",
    "베이징 핵심 5일 프라이빗 투어",
  ),
  metadataTitle: l(
    "5-Day Beijing Private Tour: Badaling & Forbidden City",
    "北京5天4晚私家团：八达岭长城与故宫",
    "베이징 4박 5일 프라이빗 투어: 팔달령·자금성",
  ),
  metadataDescription: l(
    "Five-day Beijing private tour with the Forbidden City, Badaling Great Wall, four hotel nights and private transfers. Guided or no-guide options.",
    "北京5天4晚私家团，游览故宫与八达岭长城，含4晚住宿、接送机和3个游览日私车。可选D2–D4英语导游，或无现场导游、提供远程支持的版本。预约与可订情况付款前确认。",
    "자금성과 팔달령 만리장성을 보는 베이징 4박 5일 프라이빗 투어. 호텔 4박과 전용 차량이 포함되며, D2~D4 영어 가이드 또는 현장 가이드 없이 원격 지원을 받는 버전을 선택합니다.",
  ),
  eyebrow: l(
    "One itinerary, two ways to travel",
    "同一条路线，两种服务方式",
    "하나의 일정, 두 가지 여행 방식",
  ),
  lede: l(
    "With private transport and four hotel nights, visit the Forbidden City and Badaling Great Wall over three touring days. Choose an English guide on Days 2–4 or a version with remote support and no on-site guide.",
    "北京5天4晚，用私车串联故宫、八达岭长城等地标，把D2–D4留作三个游览日。可选择英语导游版，或现场无导游、提供远程支持的版本。",
    "호텔 4박과 전용 차량으로 자금성, 팔달령 만리장성 등 베이징 명소를 둘러봅니다. D2~D4가 관광일이며, 영어 가이드 포함 또는 현장 가이드 없이 원격 지원을 받는 버전 중 선택합니다.",
  ),
  summary: l(
    "Four nights in a breakfast-included Ctrip 4-Diamond–rated hotel, private airport transfers, three private touring days and listed adult admission tickets. Choose the guided or no-guide package.",
    "北京 4 晚携程 4 钻双标含早，含接送机、3 个游览日私车、行程所列成人基础门票和预约。可选择含英语导游或无导游版本。",
    "베이징에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식, 공항 이동, 3일 전용 차량 관광, 성인 기본 입장권과 예약 지원이 포함됩니다. 영어 가이드 포함 여부를 선택할 수 있습니다.",
  ),
  highlights: lists(
    [
      "Temple of Heaven and Summer Palace",
      "Tiananmen Square and the Forbidden City (entry needs a successful real-name reservation)",
      "Prince Kung's Mansion and Shichahai or Houhai (reservations and pace permitting)",
      "Badaling Great Wall and Olympic Park",
    ],
    [
      "天坛与颐和园",
      "天安门广场与故宫（需实名预约成功）",
      "恭王府及什刹海或后海延伸游览（视预约及节奏安排）",
      "八达岭长城与奥林匹克公园",
    ],
    [
      "천단공원과 이화원",
      "톈안먼광장과 자금성 (실명 예약 확정 시)",
      "공왕부와 스차하이 또는 허우하이 연계 탐방 (예약 시간과 여행 속도가 허용할 때)",
      "팔달령 만리장성과 올림픽공원",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Beijing", "抵达北京", "베이징 도착"),
      l(
        "Your private driver meets you at the Beijing airport or railway station and takes you and your luggage to your hotel. On the English-guided version, your guide also helps with the arrival transfer and hotel check-in; the no-guide version has driver pickup and remote support. No sightseeing is planned today, so you have time to settle in for your first night in Beijing.",
        "司机在北京机场或车站接你，连人带行李送到酒店。英语导游版在接站和办理入住时有导游协助；无导游版由司机接站，并提供远程支持。当天不安排景点，留出时间安顿休息，当晚住在北京。",
        "기사가 베이징 공항이나 기차역에서 맞이해 짐과 함께 전용 차량으로 호텔까지 모셔다 드립니다. 영어 가이드 버전은 도착 이동과 호텔 체크인 때 가이드가 함께 돕고, 무가이드 버전은 기사 픽업과 원격 지원을 제공합니다. 이날은 관광 일정 없이 편하게 쉬며 베이징에서 숙박합니다.",
      ),
    ),
    day(
      2,
      l(
        "Temple of Heaven and Summer Palace",
        "天坛与颐和园",
        "천단공원과 이화원",
      ),
      l(
        "Your private vehicle takes you from the hotel to the Temple of Heaven and the Summer Palace, visited in the order your reservations allow. Your chosen version, guided or no-guide, applies throughout; afterwards, back to the same Beijing hotel.",
        "专车从酒店出发，游览天坛公园和颐和园，先后顺序按预约情况安排；全天按你选的英语导游版或无导游版进行，结束后回到同一家北京酒店。",
        "전용 차량으로 호텔을 출발해 천단공원과 이화원을 둘러봅니다. 방문 순서는 예약에 맞춰 정하며, 이날 일정 전체를 선택하신 영어 가이드 포함 또는 무가이드 방식으로 진행합니다. 관광 후 같은 베이징 호텔로 돌아옵니다.",
      ),
    ),
    day(
      3,
      l("Imperial Beijing", "皇城北京", "황실 베이징"),
      l(
        "The day starts before dawn with the flag-raising, but only if the plan and the access it requires are confirmed. Tiananmen Square and the Forbidden City follow, with entry depending on successful real-name reservations. Prince Kung's Mansion and Shichahai or Houhai come next only when your reservation windows and your group's pace allow—we won't force every stop into the day. Back to the same Beijing hotel afterwards.",
        "只有升旗安排和所需通行条件都确认了，才会一大早从酒店出发，去看天安门升旗；之后游览天安门广场和故宫，前提是实名预约成功。恭王府及什刹海或后海，只有预约时段和你们的节奏允许时才继续安排，不为凑满清单赶场。当晚回到同一家北京酒店。",
        "국기 게양식 관람 계획과 필요한 출입 조건이 확정된 경우에만 동트기 전에 호텔을 출발합니다. 이어서 톈안먼광장과 자금성을 둘러보며, 실명 예약에 성공해야 입장할 수 있습니다. 공왕부와 스차하이 또는 허우하이는 예약 시간과 일행의 여행 속도가 허락할 때만 이어서 가고, 모든 곳을 무리하게 채우지 않습니다. 관광 후 같은 베이징 호텔로 돌아옵니다.",
      ),
    ),
    day(
      4,
      l("Great Wall", "八达岭长城", "만리장성"),
      l(
        "Your private vehicle takes you from the hotel to the Badaling Great Wall. Afterwards, head back towards the city for Olympic Park and outside views of the Bird's Nest and Water Cube, then return to the same Beijing hotel for your last night. Optional wall transport is not included unless it is written into your confirmation.",
        "专车从酒店出发，前往八达岭长城。游览长城后返回市区方向，到奥林匹克公园看鸟巢和水立方外观，再回到同一家北京酒店，住最后一晚。长城可选交通除非写进确认单，否则另外计费。",
        "전용 차량으로 호텔을 출발해 팔달령 만리장성을 둘러봅니다. 이후 도심 방향으로 돌아와 올림픽공원에서 냐오차오와 수이리팡 외관을 보고, 같은 베이징 호텔로 돌아와 마지막 밤을 보냅니다. 만리장성의 선택 교통은 확인서에 적혀 있지 않으면 별도입니다.",
      ),
    ),
    day(
      5,
      l("Depart Beijing", "北京返程", "베이징 출발"),
      l(
        "Check out and travel with your luggage by private vehicle to the airport or railway station. On the English-guided version, your guide also helps with the departure transfer; the no-guide version has your driver and remote support. No sightseeing is planned today, leaving time for check-out, city traffic and your flight or train.",
        "退房后，行李随车，专车送你去机场或车站。英语导游版在送站时有导游协助；无导游版由司机送站，并提供远程支持。当天不安排景点，给退房、市区交通和你的航班或火车留出余量。",
        "체크아웃 후 짐과 함께 전용 차량으로 공항이나 기차역에 갑니다. 영어 가이드 버전은 출발 이동 때 가이드가 함께 돕고, 무가이드 버전은 기사 이동과 원격 지원을 제공합니다. 이날은 관광 일정 없이 체크아웃, 시내 교통과 항공편·열차 시간에 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four nights in a breakfast-included Ctrip 4-Diamond–rated Beijing hotel, based on twin sharing. We confirm the exact hotel, room arrangement and any single supplement for your booking.",
    "北京 4 晚携程 4 钻酒店，双标含早，按两人一间计；具体酒店、房间安排和单房差，按你的订单确认。",
    "베이징에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함되며 2인 1실 기준입니다. 정확한 호텔, 객실 구성과 1인실 추가금은 예약에 맞춰 확정해 드립니다.",
  ),
  serviceNote: l(
    "Both versions include private airport or railway-station transfers, air-conditioned private vehicles on the three touring days, listed adult admission tickets, booking support, liability cover and drinking water. The English-guided version includes an English-speaking guide on Days 2–4 and guide assistance during arrival and departure transfers. The no-guide version has driver transfers and remote support, with no on-site guide or interpretation. No shopping stops.",
    "两个版本均含机场或车站接送、3 个游览日空调私车、行程所列成人基础门票、预约支持、责任险与车上水。英语导游版含 D2–D4 英语导游，并在抵达和离开接送时提供英语导游协助。无导游版由司机接送并提供远程支持，没有现场导游或讲解。全程无购物店安排。",
    "두 버전 모두 공항 또는 기차역 이동, 3일간의 에어컨 전용 차량, 명시된 성인 기본 입장권, 예약 지원, 책임보험과 생수가 포함됩니다. 영어 가이드 버전은 D2~D4 관광 동행과 도착·출발 이동 시 영어 가이드 지원을 포함합니다. 무가이드 버전은 기사 픽업·샌딩과 원격 지원만 제공하며 현장 가이드나 해설은 없습니다. 쇼핑 일정은 없습니다.",
  ),
  exclusions: commonExclusions(
    [
      "Great Wall cable car, slide rail and shuttle bus",
      "Daxing Airport (PKX) transfer difference",
    ],
    ["长城缆车、滑车与摆渡车", "北京大兴机场（PKX）接送差价"],
    [
      "만리장성 케이블카, 슬라이드 레일과 셔틀버스",
      "베이징 다싱공항(PKX) 이동 차액",
    ],
  ),
  bookingNote: l(
    "Choose the English-guided or no-guide version first. Tiananmen and Forbidden City availability, hotel, vehicle, arrival airport and luggage capacity must be reconfirmed for your dates before payment. " +
      commonBookingNote.en,
    "请先选择含英语导游或无导游版本。天安门与故宫预约、酒店、车型、抵达机场和行李容量都须按日期确认。" +
      commonBookingNote.zh,
    "영어 가이드 포함 또는 무가이드 버전을 먼저 선택해 주세요. 톈안먼·자금성 예약, 호텔, 차량, 도착 공항과 수하물 적재량은 결제 전 날짜별로 재확인합니다. " +
      commonBookingNote.ko,
  ),
  faq: [
    {
      question: l(
        "What changes between the guided and no-guide versions?",
        "英语导游版和无导游版有什么区别？",
        "영어 가이드 포함 버전과 미포함 버전은 어떻게 다른가요?",
      ),
      answer: l(
        "The guided version includes an English-speaking guide on sightseeing Days 2–4 and guide assistance with arrival and departure transfers on Days 1 and 5. The no-guide version keeps private driver transfers, listed adult admissions, reservations and remote support, with no on-site guide or interpretation.",
        "英语导游版含 D2–D4 英语导游游览，以及 D1/D5 抵达和离开接送时的导游协助。无导游版保留私人司机接送、所列成人基础门票、预约和远程支持，没有现场导游或讲解。",
        "영어 가이드 포함 버전은 D2~D4 관광 동행과 D1·D5 도착·출발 이동 시 가이드 지원을 포함합니다. 미포함 버전도 전용 기사 이동, 명시된 성인 기본 입장권, 예약과 원격 지원은 유지하지만 현장 가이드나 해설은 없습니다.",
      ),
    },
    {
      question: l(
        "Which Great Wall section is included, and are cable cars covered?",
        "去八达岭还是慕田峪？包含长城索道吗？",
        "어느 만리장성 구간을 방문하나요? 케이블카도 포함되나요?",
      ),
      answer: l(
        "This route visits Badaling, not Mutianyu. Great Wall cable cars, slide rail and shuttle buses are not in the base price; optional wall transport is included only when it is written into your confirmation.",
        "这条路线去八达岭，不去慕田峪。长城索道、滑车和摆渡车不在基础价格内；可选的长城交通，只有写进确认单才包含在内。",
        "이 코스는 무톈위가 아닌 팔달령 만리장성을 방문합니다. 만리장성 케이블카, 슬라이드 레일과 셔틀버스는 기본 요금에서 제외됩니다. 선택 교통편은 서면 확인에 명시된 경우에만 포함됩니다.",
      ),
    },
    {
      question: l(
        "Are the Forbidden City and Tiananmen Square reservations guaranteed?",
        "故宫和天安门广场一定能预约上吗？",
        "자금성과 톈안먼광장 예약이 보장되나요?",
      ),
      answer: l(
        "No—visits depend on successful real-name reservations. We reconfirm availability for your dates before payment, and your reservation times and your group's pace decide which other stops can fit into that day.",
        "不能保证，参观要以实名预约成功为前提。付款前，我们会按你的日期再确认一次能否预约；当天还能接上哪些其他景点，要看预约时段和你们的节奏。",
        "보장되지는 않습니다. 실명 예약에 성공해야 방문할 수 있으며, 결제 전에 여행 날짜의 예약 가능 여부를 다시 확인해 드립니다. 같은 날 다른 명소를 얼마나 둘러볼지는 예약 시간과 일행의 여행 속도에 따라 달라집니다.",
      ),
    },
  ],
  heroImage: image(
    "/images/destinations/beijing/hero-1600.webp",
    l(
      "Beijing's imperial axis and historic architecture",
      "北京中轴线与历史建筑",
      "베이징 중축선과 역사 건축",
    ),
    l(
      "Five days for Beijing's imperial landmarks and the Great Wall.",
      "用五天游览北京皇城地标与长城。",
      "베이징 황실 유적과 만리장성을 둘러보는 5일.",
    ),
    1600,
    1000,
  ),
  gallery: [
    image(
      "/images/tours/beijing-highlights-5-day-private-tour/gallery-forbidden-corner-1600.webp",
      l(
        "A Forbidden City corner tower reflected in the moat at dusk",
        "暮色中倒映在护城河里的故宫角楼",
        "해 질 무렵 해자에 비친 자금성 각루",
      ),
      l(
        "Forbidden City corner tower · entry needs a successful real-name reservation",
        "故宫角楼 · 入内需实名预约成功",
        "자금성 각루 · 입장은 실명 예약에 성공해야 가능",
      ),
    ),
    image(
      "/images/tours/beijing-highlights-5-day-private-tour/gallery-hutong-lane-1600.webp",
      l(
        "A lived-in hutong lane in Beijing",
        "北京一条仍有生活气息的胡同街巷",
        "생활의 흔적이 남아 있는 베이징 후퉁 골목",
      ),
      l(
        "Everyday Beijing in a hutong lane · shown for atmosphere, not a specific booked stop",
        "胡同里的北京日常 · 展示城市生活，并非某个已预订景点",
        "후퉁 골목 속 베이징의 일상 · 특정 예약 장소는 아님",
      ),
    ),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Beijing arrival", "抵达北京", "베이징 도착"),
        "/images/tours/beijing-highlights-5-day-private-tour/arrival-beijing-city-1600.webp",
        l(
          "Beijing's elevated roads and modern skyline after dark",
          "入夜后的北京立交与现代城市天际线",
          "밤의 베이징 고가도로와 현대 스카이라인",
        ),
        l(
          "Your first night in Beijing · airport and hotel transfer confirmed for your booking",
          "抵达北京的第一晚 · 机场与酒店接送按你的订单确认",
          "베이징 도착 첫날 · 공항과 호텔 이동은 예약에 맞춰 확정",
        ),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Temple of Heaven", "天坛", "천단공원"),
        "/images/tours/beijing-highlights-5-day-private-tour/temple-of-heaven-2024-1600.webp",
        l(
          "The complete Hall of Prayer for Good Harvests under a blue sky in September 2024",
          "2024 年 9 月蓝天下完整可见的北京天坛祈年殿",
          "2024년 9월 푸른 하늘 아래 온전히 보이는 베이징 천단공원 기년전",
        ),
        l(
          "Hall of Prayer for Good Harvests · entrance gate and route inside the park can vary",
          "天坛祈年殿 · 入园门和园内路线可能会变",
          "천단공원 기년전 · 입장 문과 공원 안 동선은 달라질 수 있음",
        ),
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Forbidden City precinct", "故宫宫城", "자금성 권역"),
        "/images/tours/beijing-highlights-5-day-private-tour/forbidden-city-corridor-1600.webp",
        l(
          "A red palace corridor inside Beijing's Forbidden City",
          "北京故宫内的红色宫廊",
          "베이징 자금성 안의 붉은 회랑",
        ),
        l(
          "The palace as you see it on foot · Tiananmen and Forbidden City entry depends on a successful advance reservation",
          "步行所见的故宫宫廊 · 天安门和故宫须实名预约成功才能进入",
          "걸으며 만나는 자금성 회랑 · 톈안먼과 자금성은 사전 실명 예약에 성공해야 입장 가능",
        ),
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Great Wall ridge journey", "长城山脊之旅", "만리장성 산등성이 여정"),
        "/images/destinations/beijing/great-wall-1200.webp",
        l(
          "A restored Great Wall section on mountain ridges north of Beijing",
          "北京北部山脊上的一段修复长城",
          "베이징 북부 산등성이의 복원된 만리장성 구간",
        ),
        l(
          "A Great Wall ridge, not identified as Badaling · your Badaling reservation, entry and attraction transport are confirmed separately",
          "山脊上的长城，未标明为八达岭 · 行程中的八达岭预约、入园和景交另行确认",
          "산등성이의 만리장성, 팔달령으로 특정하지 않음 · 일정의 팔달령 예약, 입장과 관광지 이동은 별도 확정",
        ),
        1200,
        750,
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Depart Beijing", "北京返程", "베이징 출발"),
        "/images/tours/beijing-highlights-5-day-private-tour/departure-beijing-layers-1600.webp",
        l(
          "Beijing's historic roofs with the modern CBD in the distance",
          "北京历史屋顶与远处的现代 CBD",
          "베이징의 역사적 지붕과 멀리 보이는 현대 CBD",
        ),
        l(
          "Old and new Beijing in one view · airport and transfer time follow your booked flight",
          "古今北京同框，为行程收尾 · 机场与送机时间按已订航班确认",
          "역사와 현대의 베이징이 한 장면에 · 공항과 이동 시간은 예약된 항공편에 맞춤",
        ),
      ),
    ),
  ],
  packages: [
    guidedPackage(
      "english-guided",
      "guided",
      l("English-guided", "含英语导游", "영어 가이드 포함"),
      l(
        "An English-speaking guide accompanies sightseeing on Days 2–4 and assists with the private arrival and departure transfers on Days 1 and 5.",
        "D2–D4 英语导游陪同游览，D1/D5 私人接送时提供英语导游协助。",
        "D2~D4 관광에 영어 가이드가 동행하고 D1·D5 전용 차량 픽업·샌딩 시 영어 가이드가 돕습니다.",
      ),
      // Owner-approved TCG 4-star benchmark minus USD20/person, 2026-09-06.
      [5453, 4348],
      [839, 669],
    ),
    guidedPackage(
      "no-guide",
      "self-guided",
      l("No on-site guide", "无现场导游", "현장 가이드 없음"),
      l(
        "Private transport, listed adult admission tickets, reservations and remote support are included, but there is no on-site guide or interpretation. No shopping stops.",
        "含私车、行程所列成人基础门票、预约与远程支持；现场无导游，也不含讲解服务，全程无购物店安排。",
        "전용 차량, 일정에 명시된 성인 기본 입장권, 예약과 원격 지원은 포함되지만 현장 가이드와 해설은 없으며 쇼핑 일정도 없습니다.",
      ),
      [4973, 3974],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-19",
};

const zhangjiajieForestFixedRoute: PrivateTourProduct = {
  id: "private-tour-zhangjiajie-forest-fixed-4d3n",
  slug: "zhangjiajie-forest-4-day-private-tour",
  days: 4,
  nights: 3,
  servicePolicy: standardServicePolicy,
  title: l(
    "Zhangjiajie Forest: 4-Day Fixed-Route Private Tour",
    "张家界森林公园 4 天 3 晚固定路线私家团",
    "장가계 국립삼림공원 4일 고정 코스 프라이빗 투어",
  ),
  metadataTitle: l(
    "Zhangjiajie National Forest Park: 4-Day Private Tour",
    "张家界森林公园4天私家团：固定徒步路线",
    "장가계 국립삼림공원 3박 4일 프라이빗 투어",
  ),
  metadataDescription: l(
    "Four-day fixed-route private tour of Zhangjiajie National Forest Park, with two walking days and one villa base. No cable cars or elevators.",
    "张家界森林公园4天3晚固定路线私家团：两个步行游览日、三晚同住一处指定别墅，含行程私车、D2全天和D3白天英语导游。不乘索道和电梯，不含玻璃桥与天门山。",
    "장가계 국립삼림공원 3박 4일 고정 코스. 한 빌라 3박, D2 종일·D3 주간 한국어 가이드 포함. 케이블카·엘리베이터 미이용, 유리다리·천문산 불포함.",
  ),
  eyebrow: l(
    "Same designated villa for 3 nights · Two walking forest days · No cable cars or elevators",
    "三晚连住指定别墅 · 两天徒步森林公园 · 不乘索道与天梯",
    "지정 빌라 3박 연박 · 이틀간 산림 도보 탐방 · 케이블카 및 엘리베이터 미이용",
  ),
  lede: l(
    "A lower-priced private route for travellers who want Zhangjiajie’s forest landscapes without cable cars, elevators or last-minute add-ons. Stay in the same Country Garden villa for all three nights, use the north gate for the high peaks, then walk the east-gate valleys before an evening at Seventy-Two Wonder Tower.",
    "这是一条不坐索道、电梯，也不靠临时加项抬价的张家界低价私家路线。三晚固定入住同一处碧桂园别墅；第二天从北门看高山峰林，第三天从东门步行溪谷，再夜游七十二奇楼。",
    "케이블카와 엘리베이터, 현장 추가 옵션 없이 장가계의 산림 풍경을 보는 합리적인 프라이빗 코스입니다. 3박 모두 같은 컨트리 가든 빌라에 머물고, 둘째 날은 북문 산악 코스, 셋째 날은 동문 계곡 산책과 칠십이기루 야경을 이어갑니다.",
  ),
  summary: l(
    "Three nights in a designated Country Garden family villa with breakfast, private station or airport transfers, private transport on the fixed route, an English-speaking guide on Day 2 and during the daytime on Day 3, and the listed adult admissions. The Seventy-Two Wonder Tower evening is self-guided with private drop-off, pickup and remote assistance.",
    "含指定碧桂园家庭别墅 3 晚及早餐、机场或车站接送、固定路线私车、D2 全天与 D3 白天英语导游，以及行程所列成人门票。七十二奇楼夜场为自由活动，含专车送达、夜间接回与远程协助。",
    "지정 컨트리 가든 패밀리 빌라 3박과 조식, 공항·역 픽업 및 샌딩, 고정 일정 전용 차량, D2 종일과 D3 주간 한국어 가이드, 명시된 성인 입장권이 포함됩니다. 칠십이기루 야간 관람은 자유 일정이며 전용 차량 왕복과 원격 지원을 제공합니다.",
  ),
  highlights: lists(
    [
      "Tianzi Mountain, Yangjiajie and Yuanjiajie from the north gate",
      "Ten-Mile Gallery on foot and the eastern Golden Whip Stream",
      "A self-guided evening at Seventy-Two Wonder Tower with private transfers",
      "The same designated Country Garden villa for all three nights",
    ],
    [
      "从北门串联天子山、杨家界与袁家界",
      "全程步行十里画廊，并游览金鞭溪东段",
      "七十二奇楼夜场自由游览，含专车往返",
      "三晚固定入住同一处指定碧桂园别墅",
    ],
    [
      "북문에서 천자산·양가계·원가계를 잇는 코스",
      "십리화랑을 걸어서 왕복하고 금편계 동쪽 구간 산책",
      "전용 차량 왕복이 포함된 칠십이기루 자유 야간 관람",
      "3박 모두 같은 지정 컨트리 가든 빌라 이용",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive and settle in", "抵达张家界并入住", "장가계 도착 및 체크인"),
      l(
        "Our driver meets you at Zhangjiajie Hehua Airport or Zhangjiajie West Railway Station and takes you by private vehicle to the designated Country Garden villa. There is no sightseeing today, so you can check in and rest. This villa is your base for all three nights.",
        "司机在张家界荷花机场或张家界西站接你，乘专车前往指定碧桂园别墅。当天不安排景区，入住后好好休息；三晚都住这处别墅，中途不换酒店。",
        "기사가 장가계 허화공항이나 장가계서역에서 맞이해 전용 차량으로 지정 컨트리 가든 빌라까지 모셔다 드립니다. 이날은 관광 일정이 없으니 체크인 후 편히 쉬세요. 3박 모두 이 빌라에 머뭅니다.",
      ),
    ),
    day(
      2,
      l(
        "Tianzi Mountain, Yangjiajie and Yuanjiajie",
        "天子山、杨家界与袁家界",
        "천자산·양가계·원가계",
      ),
      l(
        "Leave the villa at about 07:45 for Tianzi Mountain North Gate. Use the included scenic shuttles via Sancha Junction to visit Dianjiangtai, the Tianzi Mountain core area, the short Natural Great Wall walk in Yangjiajie and Yuanjiajie’s main viewpoints, then take the shuttle back to the north gate and your private vehicle to the villa, arriving at about 18:30. Allow roughly 10–11 hours door to door and 4–7 km of walking. No cable cars or elevators today. Official closures, last-shuttle times, weather, safety or crowd control may change the order, but we won’t casually drop the listed core stops.",
        "约 07:45 从别墅出发前往天子山北门，使用已含的景区环保车，经三岔口游览点将台、天子山核心区域、杨家界天然长城短线和袁家界主要观景点；随后乘环保车返回北门，再乘专车回别墅，正常约 18:30 抵达。门到门约 10–11 小时，步行约 4–7 公里。当天不乘索道或电梯；如遇官方关闭、末班环保车、天气、安全或限流，游览顺序可能会变，但不会因为一般进度随意删减已列的核心景点。",
        "07:45경 빌라에서 출발해 천자산 북문으로 이동합니다. 포함된 관광 셔틀을 이용해 싼차 교차점, 뎬장타이, 천자산 핵심 구역, 양가계 천연장성 짧은 산책로와 원가계 주요 전망대를 둘러본 뒤 북문으로 돌아와 전용 차량으로 18:30경 빌라에 도착합니다. 총 10~11시간, 도보 약 4~7km의 일정입니다. 케이블카와 엘리베이터는 이용하지 않습니다. 공식 폐쇄, 셔틀 막차, 날씨, 안전, 혼잡 통제에 따라 순서가 바뀔 수 있지만, 명시된 핵심 장소를 임의로 빼지는 않습니다.",
      ),
    ),
    day(
      3,
      l(
        "Ten-Mile Gallery, Golden Whip Stream and the night lights",
        "十里画廊、金鞭溪与七十二奇楼夜景",
        "십리화랑·금편계·칠십이기루 야경",
      ),
      l(
        "Leave at about 07:30 for the east gate. Walk the open section of Ten-Mile Gallery out and back, take the included shuttle to Water Winding Four Gates, then walk the eastern Golden Whip Stream out and back toward the Tiaoyutan area. After a simple lunch break, visit the World Geopark Museum when open, then return to the villa at about 15:00. At about 17:30, the driver takes you to Seventy-Two Wonder Tower; explore the regular evening session on your own and meet the driver at the agreed point at about 20:30. Your English-speaking guide is with you for the daytime route only; the evening includes private drop-off, pickup and remote assistance. The Ten-Mile Gallery mini-train is not used.",
        "约 07:30 从别墅出发前往东门。十里画廊开放游览段步行往返，再乘已含的环保车前往水绕四门，沿金鞭溪东段步行至跳鱼潭附近后原路返回。简单午餐休息后，在开放时参观世界地质公园博物馆，正常约 15:00 回别墅休息。约 17:30 由司机送往七十二奇楼，普通夜场由客人自由游览，约 20:30 在约定地点会合返回。英语导游只陪同白天路线；夜场含专车送达、接回和远程协助，但没有现场导游。当天不乘十里画廊小火车。",
        "07:30경 동문으로 출발합니다. 십리화랑의 개방 구간을 걸어서 왕복한 뒤 포함된 셔틀로 수요사문에 이동하고, 금편계 동쪽 구간을 도약담 부근까지 왕복 산책합니다. 간단한 점심 휴식 후 운영 중이면 세계지질공원박물관을 관람하고, 15:00경 빌라로 돌아와 쉽니다. 17:30경 기사가 칠십이기루까지 모셔다 드리며, 일반 야간 회차를 자유롭게 관람한 뒤 20:30경 약속 장소에서 기사와 만나 돌아옵니다. 한국어 가이드는 주간 일정까지만 동행하고, 야간에는 전용 차량 왕복과 원격 지원만 제공합니다. 십리화랑 미니 열차는 이용하지 않습니다.",
      ),
    ),
    day(
      4,
      l("Breakfast and departure", "早餐后从容离开", "조식 후 출발"),
      l(
        "Breakfast at the villa, then rest until your pickup time. Check out and travel by private vehicle to Zhangjiajie Hehua Airport or Zhangjiajie West Railway Station. No sightseeing is added on departure day, so there is less risk of rushing for your flight or train.",
        "在别墅吃早餐，休息到约好的接送时间。退房后乘专车前往张家界荷花机场或张家界西站。离开日不再安排景区，免得因为游览赶车、赶飞机。",
        "빌라에서 조식을 드시고 픽업 시간까지 편히 쉬다가 체크아웃합니다. 전용 차량으로 장가계 허화공항이나 장가계서역에 갑니다. 항공편이나 열차 시간에 서두르지 않도록 출발일에는 관광지를 넣지 않습니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Three nights in the same designated Country Garden family villa, on a twin-sharing basis with breakfast, and no hotel changes along the way. Before you pay, we confirm the exact villa unit, bedroom allocation, foreign-guest registration, breakfast arrangement and any single-room difference.",
    "三晚固定入住同一处指定碧桂园家庭别墅，按两人一间、含早餐计，中途不换住处。付款前，我们会和你确认具体别墅单元、卧室分配、外宾登记、早餐安排和单房差。",
    "3박 모두 같은 지정 컨트리 가든 패밀리 빌라에 머물며, 2인 1실·조식 포함이 기본입니다. 중간에 숙소를 옮기지 않습니다. 정확한 빌라 동, 객실 배정, 외국인 숙박 등록, 조식과 1인실 차액은 결제 전에 확정해 드립니다.",
  ),
  serviceNote: l(
    "Includes driver transfers on Days 1 and 4, private transport throughout the listed route, an English-speaking guide for all of Day 2 and the daytime route on Day 3, the adult Wulingyuan admission-and-shuttle package with required insurance, and standard evening admission to Seventy-Two Wonder Tower with insurance. The Day 3 evening is self-guided with private drop-off, pickup and remote assistance. No shopping stops.",
    "含 D1/D4 司机接送、行程所列私车、D2 全天及 D3 白天英语导游、成人武陵源门票与环保车联票及必买保险、七十二奇楼普通夜场票及保险。D3 夜场为自由活动，含专车送达、接回和远程协助。全程无购物店安排。",
    "D1·D4 전용 차량 픽업·샌딩, 명시된 일정의 전용 차량, D2 종일 및 D3 주간 한국어 가이드, 필수 보험이 포함된 성인 무릉원 입장권·셔틀 패키지, 보험이 포함된 칠십이기루 일반 야간 입장권이 포함됩니다. D3 야간은 자유 관람이며 전용 차량 왕복과 원격 지원을 제공합니다. 쇼핑 일정은 없습니다.",
  ),
  exclusions: commonExclusions(
    [
      "Bailong Elevator, Tianzi Mountain Cableway and Yangjiajie Cableway",
      "Ten-Mile Gallery mini-train and other unlisted paid scenic transport (the Wulingyuan admission-and-shuttle package is included)",
      "An on-site guide during the Seventy-Two Wonder Tower evening",
      "Paid museum experiences, shows or any item not listed in the fixed route",
    ],
    [
      "百龙天梯、天子山索道与杨家界索道",
      "十里画廊小火车及未列入包含项的其他收费景区交通（武陵源门票与环保车联票已含）",
      "七十二奇楼夜场现场导游",
      "博物馆收费体验、另购演出及固定路线未列项目",
    ],
    [
      "백룡 엘리베이터, 천자산 케이블카와 양가계 케이블카",
      "십리화랑 미니 열차 및 포함 항목에 없는 기타 유료 관광지 교통 (무릉원 입장권·셔틀 패키지는 포함)",
      "칠십이기루 야간 현장 가이드",
      "박물관 유료 체험, 별도 공연 및 고정 일정에 명시되지 않은 항목",
    ],
    l(
      "Holiday, unlisted night-time, overtime and other unlisted services; Day 3 Seventy-Two Wonder Tower standard evening admission with insurance, private transfers and remote assistance remain included",
      "节假日、未列出的夜间服务、超时及其他未列服务（D3 七十二奇楼普通夜场票及保险、专车往返与远程协助已含）",
      "공휴일, 일정 외 야간 서비스, 초과 시간 및 기타 일정 외 서비스 (D3 칠십이기루 일반 야간 입장권·보험, 전용 차량 왕복과 원격 지원은 포함)",
    ),
  ),
  bookingNote: l(
    "The route is fixed, with no optional attraction swaps or last-minute add-ons. Before you pay, we reconfirm the exact villa, room plan, vehicle and ticket availability for your non-holiday dates. The per-person starting prices shown are for groups of 2 and 4 travellers; flights are not included. For other group sizes and all child prices, we work out a quote based on age, bed use and vehicle seats.",
    "这是一条固定路线，不设置自选景点，也不在现场临时加项。付款前，我们会按你的非节假日出行日期，再次确认别墅、房间分配、车型和票源。网页只公开 2 人和 4 人的每人起价，往返机票另计；其他人数和所有儿童价格，我们会按年龄、占床和车辆座位单独核价。",
    "관광지를 골라 바꾸거나 현장에서 옵션을 추가하지 않는 고정 코스입니다. 결제 전에 선택하신 비공휴일 날짜의 빌라, 객실 구성, 차량과 입장권 재고를 다시 확인해 드립니다. 공개된 항공권 제외 1인 시작가는 2명·4명 기준입니다. 다른 인원과 모든 아동 요금은 나이, 침대 사용, 차량 좌석에 따라 따로 견적을 내 드립니다.",
  ),
  heroImage: image(
    "/images/tours/zhangjiajie-forest-4-day-private-tour/hero-morning-pillars-1600.jpg",
    l(
      "Layered sandstone pillars in Zhangjiajie National Forest Park",
      "张家界国家森林公园层叠的砂岩峰柱",
      "장가계 국립삼림공원의 겹겹이 이어진 사암 봉우리",
    ),
    l(
      "Your first full touring day on this fixed route is spent among the high forest pillars.",
      "固定路线的第一个完整游览日深入高山峰林。",
      "고정 코스의 첫 종일 관광일에는 높은 산림 봉우리 사이를 둘러봅니다.",
    ),
    1600,
    1000,
  ),
  gallery: [
    image(
      "/images/tours/zhangjiajie-forest-4-day-private-tour/gallery-mist-pillars-1600.jpg",
      l(
        "Mist moving between Zhangjiajie’s forest pillars",
        "云雾穿行于张家界峰林之间",
        "장가계 봉우리 사이로 흐르는 안개",
      ),
      l(
        "Zhangjiajie’s forest landscape. Weather and visibility change quickly in the mountains, so the view on your day may differ.",
        "照片展示的是这里的地貌；山里天气和能见度变化快，你当天看到的景色可能不同。",
        "사진은 이곳의 지형을 보여 줍니다. 산은 날씨와 시야가 빠르게 바뀌어, 당일 풍경은 사진과 다를 수 있습니다.",
      ),
      1600,
      1000,
    ),
    image(
      "/images/tours/zhangjiajie-forest-4-day-private-tour/gallery-villa-living-room-1600.jpg",
      l(
        "Living room in the designated Country Garden villa collection",
        "指定碧桂园别墅资源中的客厅",
        "지정 컨트리 가든 빌라 객실군의 거실",
      ),
      l(
        "A living room in the villa collection; your exact unit and bedroom allocation appear in your booking confirmation.",
        "别墅房源实拍客厅；你住哪个单元、卧室怎么分，写在订单确认单里。",
        "빌라 객실군의 실제 거실 사진이며, 정확한 동과 객실 배정은 예약 확인서에 적어 드립니다.",
      ),
      1600,
      1000,
    ),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Country Garden villa", "碧桂园别墅", "컨트리 가든 빌라"),
        "/images/tours/zhangjiajie-forest-4-day-private-tour/day-1-villa-twin-room-1600.jpg",
        l(
          "Twin bedroom in the designated Country Garden villa collection",
          "指定碧桂园别墅资源中的双床卧室",
          "지정 컨트리 가든 빌라 객실군의 트윈룸",
        ),
        l(
          "The same villa is your base for all three nights; we confirm the exact room split before you pay.",
          "三晚都住同一处别墅；具体怎么分房，付款前和你确认。",
          "3박 모두 같은 빌라에 머물며, 정확한 객실 배정은 결제 전에 확정해 드립니다.",
        ),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("High forest pillars", "高山峰林", "고산 봉우리 숲"),
        "/images/tours/zhangjiajie-forest-4-day-private-tour/day-2-tianzi-pillars-1600.jpg",
        l(
          "A steep forest pillar rising above the Zhangjiajie valley",
          "从张家界山谷中拔地而起的峰柱",
          "장가계 계곡 위로 솟은 가파른 사암 봉우리",
        ),
        l(
          "Day 2’s peak terrain in general—not a particular viewpoint or viewing order.",
          "D2 一带的峰林地貌，并非某个具体观景台，也不代表观看顺序。",
          "사진은 D2의 봉우리 지형을 보여 주며 특정 전망대나 관람 순서를 뜻하지 않습니다.",
        ),
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Golden Whip Stream valley", "金鞭溪谷", "금편계 계곡"),
        "/images/tours/zhangjiajie-forest-4-day-private-tour/day-3-golden-whip-stream-1600.jpg",
        l(
          "A forest stream and footbridge in Zhangjiajie’s valley landscape",
          "张家界溪谷中的森林、溪流与步道桥",
          "장가계 계곡의 숲과 물길, 산책로 다리",
        ),
        l(
          "Setting the scene for the eastern Golden Whip Stream walk; water levels and visibility vary with the weather.",
          "金鞭溪东段步行一带的溪谷环境；水量和能见度会随天气变化。",
          "금편계 동쪽 산책로의 계곡 분위기를 보여 주는 사진이며, 수량과 시야는 날씨에 따라 달라집니다.",
        ),
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("A quiet departure morning", "从容离开的早晨", "여유로운 출발 아침"),
        "/images/tours/zhangjiajie-forest-4-day-private-tour/day-4-villa-terrace-1600.jpg",
        l(
          "Garden terrace at the designated Country Garden villa collection",
          "指定碧桂园别墅资源中的花园露台",
          "지정 컨트리 가든 빌라 객실군의 정원 테라스",
        ),
        l(
          "No sightseeing on departure day, so your transfer can follow your flight or train.",
          "离开日不再加景点，接送时间按你的航班或高铁来安排。",
          "출발일에는 관광 일정 없이 항공편이나 열차 시간에 맞춰 이동합니다.",
        ),
      ),
    ),
  ],
  packages: [
    guidedPackage(
      // Stable backend identifier retained for existing links and enquiries.
      // The customer-facing guide language follows the page locale.
      "fixed-route-english-guided",
      "guided",
      l(
        "Fixed route with English guide",
        "固定路线英语导游版",
        "한국어 가이드 포함 고정 코스",
      ),
      l(
        "An English-speaking guide accompanies all of Day 2 and the daytime route on Day 3. The Seventy-Two Wonder Tower evening is self-guided with private drop-off, pickup and remote assistance.",
        "D2 全天与 D3 白天由英语导游陪同；七十二奇楼夜场为自由活动，含专车送达、接回与远程协助。",
        "D2 종일과 D3 주간 일정에는 한국어 가이드가 동행합니다. 칠십이기루 야간은 자유 관람이며 전용 차량 왕복과 원격 지원이 포함됩니다.",
      ),
      // Owner-approved USD selling prices, 2026-09-06; CNY follows the existing conversion basis.
      [2918, 2502],
      [449, 385],
    ),
  ],
  datePublished: "2026-08-31",
  dateModified: "2026-09-06",
  lastReviewed: "2026-08-31",
};

const zhangjiajieFurongFenghuang: PrivateTourProduct = {
  id: "private-tour-zhangjiajie-furong-fenghuang-7d6n",
  slug: "zhangjiajie-furong-fenghuang-7-day-private-tour",
  days: 7,
  nights: 6,
  servicePolicy: standardServicePolicy,
  title: l(
    "Zhangjiajie, Furong Town & Fenghuang: 7-Day Private Tour",
    "张家界、芙蓉镇与凤凰 7 天 6 晚私家团",
    "장가계, 부용진, 봉황 6박 7일 프라이빗 투어",
  ),
  metadataTitle: l(
    "7-Day Zhangjiajie, Furong & Fenghuang Private Tour",
    "张家界芙蓉镇凤凰古城7天6晚私家团",
    "장가계·부용진·봉황 6박 7일 프라이빗 투어",
  ),
  metadataDescription: l(
    "A 7-day private route through Wulingyuan, Furong Town and Fenghuang, with six hotel nights, private transport and an English guide on Days 2–5.",
    "张家界、芙蓉镇、凤凰古城7天6晚私家团：武陵源3晚、芙蓉镇1晚、凤凰2晚，D2–D5英语导游，含行程私车及明确列出的基础门票。",
    "무릉원 3박, 부용진 1박, 봉황고성 2박의 6박 7일 프라이빗 투어. D2~D5 한국어 가이드와 일정 내 전용 차량이 포함됩니다.",
  ),
  eyebrow: l(
    "7 days · 6 nights · Wulingyuan 3 nights · Furong Town 1 night · Fenghuang 2 nights",
    "7 天 6 晚 · 武陵源 3 晚 · 芙蓉镇 1 晚 · 凤凰 2 晚",
    "6박 7일 · 무릉원 3박 · 부용진 1박 · 봉황고성 2박",
  ),
  lede: l(
    "Spend two full days among Wulingyuan’s sandstone peaks and forest valleys, then continue through western Hunan to Furong Town and Fenghuang Ancient Town. Four English-guided touring days are balanced by a free day in Fenghuang.",
    "先用两个完整游览日走进武陵源峰林与溪谷，再沿湘西路线前往芙蓉镇和凤凰古城。D2–D5 由英语导游陪同，D6 留给你按自己的节奏游凤凰。",
    "무릉원의 사암 봉우리와 계곡을 이틀 동안 둘러본 뒤 부용진과 봉황고성으로 이어갑니다. D2~D5는 한국어 가이드와 여행하고 D6는 봉황에서 자유롭게 보냅니다.",
  ),
  summary: l(
    "Six hotel nights, a private vehicle for the transfers and touring times listed in the itinerary, and an English-speaking guide on Days 2–5. The base price includes Wulingyuan entry with the park eco-shuttles, the Ten-Mile Gallery mini-train, standard evening entry to Seventy-Two Wonder Tower and first-entry admission to Furong Town. No shopping stops.",
    "含 6 晚住宿、行程逐日列出的接送和游览时段专车，以及 D2–D5 英语导游。基础门票包括武陵源门票与环保车、十里画廊小火车、七十二奇楼普通夜场和芙蓉镇首道门票。全程无购物店安排。",
    "6박 숙박, 일정에 명시된 이동·관광 시간대의 전용 차량, D2~D5 한국어 가이드가 포함됩니다. 기본 입장권은 무릉원 입장권과 관광 셔틀, 십리화랑 미니 열차, 칠십이기루 일반 야간 입장권, 부용진 첫 입장권입니다. 쇼핑 일정은 없습니다.",
  ),
  highlights: lists(
    [
      "Tianzi Mountain, Yangjiajie and Yuanjiajie in one guided Wulingyuan day",
      "Ten-Mile Gallery, Golden Whip Stream and Seventy-Two Wonder Tower",
      "One night in Furong Town, followed by two nights in Fenghuang",
      "Four English-guided touring days, plus a free day in Fenghuang",
    ],
    [
      "一天串联天子山、杨家界与袁家界",
      "十里画廊小火车、金鞭溪与七十二奇楼夜景",
      "芙蓉镇住 1 晚，再到凤凰古城连住 2 晚",
      "D2–D5 四天英语导游，D6 在凤凰自由活动",
    ],
    [
      "천자산·양가계·원가계를 하루에 연결하는 가이드 일정",
      "십리화랑 미니 열차, 금편계 산책과 칠십이기루 야경",
      "부용진 1박 후 봉황고성에서 2박",
      "D2~D5 한국어 가이드 관광과 D6 봉황 자유 일정",
    ],
  ),
  itinerary: [
    day(
      1,
      l(
        "Arrive in Zhangjiajie and settle in Wulingyuan",
        "抵达张家界，入住武陵源",
        "장가계 도착 후 무릉원 체크인",
      ),
      l(
        "Our driver meets you at Zhangjiajie Hehua International Airport or the Zhangjiajie railway station named in your written confirmation, and takes you and your luggage by private vehicle to your Wulingyuan hotel. Day 1 is a driver-only transfer with no guide or sightseeing, so you can settle in for the first of three nights here.",
        "司机在张家界机场或车站接你，连人带行李用专车直接送到武陵源酒店。当天只含司机接送，不安排导游和景点，好好入住休息；武陵源共连住三晚，这是第一晚。",
        "기사가 장가계 공항이나 기차역에서 맞이해 짐과 함께 전용 차량으로 무릉원 호텔까지 모셔다 드립니다. 이날은 가이드 없이 전용 차량 픽업만 제공되며 관광 일정은 없으니 편하게 체크인하세요. 무릉원 3박 중 첫날입니다.",
      ),
    ),
    day(
      2,
      l(
        "Tianzi Mountain, Yangjiajie and Yuanjiajie",
        "天子山、杨家界与袁家界",
        "천자산·양가계·원가계",
      ),
      l(
        "Your English-speaking guide and private driver take you from the hotel to the Wulingyuan entrance. Inside, the included park eco-shuttles and walking routes link Tianzi Mountain, Yangjiajie and Yuanjiajie. The order may change for official closures, weather, safety or crowd control. Cable cars and the Bailong Elevator are extra unless named in your written confirmation.",
        "英语导游和专车司机从酒店出发，带你前往武陵源入口。进园后乘已含的环保车，再结合步行，串起天子山、杨家界和袁家界。如遇官方关闭、天气、安全或限流，游览顺序以当天实际可行的方案为准。未列出的索道和百龙天梯不含在基础价格内。",
        "한국어 가이드와 전용 기사가 호텔에서 무릉원 입구까지 함께 갑니다. 포함된 관광 셔틀과 도보로 천자산, 양가계, 원가계를 이어서 둘러봅니다. 공식 폐쇄, 날씨, 안전 문제나 혼잡 통제가 있으면 순서가 바뀔 수 있습니다. 확인서에 없는 케이블카와 백룡 엘리베이터는 별도입니다.",
      ),
    ),
    day(
      3,
      l(
        "Ten-Mile Gallery, Golden Whip Stream and the night lights",
        "十里画廊、金鞭溪与七十二奇楼夜景",
        "십리화랑·금편계·칠십이기루 야경",
      ),
      l(
        "Your guide and private vehicle take you to Ten-Mile Gallery, mini-train included, and to the walking section of Golden Whip Stream set out in your written confirmation. Then on to the standard evening session at Seventy-Two Wonder Tower, and back to your Wulingyuan hotel by private vehicle. Upgraded night programmes and other paid activities are extra unless confirmed in writing.",
        "英语导游陪你乘专车从酒店出发，游览十里画廊（含小火车），再步行走书面确认单上的金鞭溪路段。之后去七十二奇楼普通夜场，结束后专车送回武陵源酒店。升级夜场和其他收费体验，写进确认方案才包含。",
        "한국어 가이드와 전용 차량으로 호텔을 나서 미니 열차가 포함된 십리화랑을 둘러보고, 서면 확인서에 적힌 금편계 구간을 걷습니다. 이어서 칠십이기루 일반 야간 관람을 하고 전용 차량으로 무릉원 호텔에 돌아옵니다. 업그레이드 야간 프로그램과 기타 유료 체험은 서면 확인서에 있을 때만 포함됩니다.",
      ),
    ),
    day(
      4,
      l(
        "Travel to Furong Town and stay overnight",
        "前往芙蓉镇并住一晚",
        "부용진 이동 및 1박",
      ),
      l(
        "Check out and head to Furong Town by private vehicle with your English-speaking guide and luggage. Explore the area covered by the included first-entry ticket at a sensible pace, then check in for one night in Furong Town. Paid experiences beyond that ticket are extra.",
        "退房后行李随车，英语导游陪你乘专车前往芙蓉镇。用已含的芙蓉镇首道门票游览，节奏看现场情况安排；当晚入住芙蓉镇。首道门票之外的收费体验另计。",
        "체크아웃 후 수하물을 싣고 한국어 가이드와 전용 차량으로 부용진에 이동합니다. 포함된 기본 입장권으로 관람할 수 있는 구역을 무리 없는 속도로 둘러본 뒤 부용진에서 1박합니다. 기본 입장권 이외의 유료 체험은 별도입니다.",
      ),
    ),
    day(
      5,
      l(
        "Continue to Fenghuang Ancient Town",
        "前往凤凰古城",
        "봉황고성으로 이동",
      ),
      l(
        "Check out and continue to Fenghuang by private vehicle with your English-speaking guide and luggage. After check-in, your guide takes you through the public lanes and riverside of the ancient town. Fenghuang’s public streets need no first-entry gate ticket; boat rides and paid smaller attractions are extra. This is the first of two nights here.",
        "退房后行李随车，英语导游陪你乘专车前往凤凰。入住后，导游带你走古城的公共街巷和沱江沿岸。凤凰古城公共街区没有首道大门票；游船及收费小景点另计。在凤凰共住两晚，这是第一晚。",
        "체크아웃 후 수하물과 함께 한국어 가이드와 전용 차량으로 봉황에 이동합니다. 체크인 후 가이드와 고성의 공공 골목과 강변을 둘러봅니다. 봉황고성 공공 구역에는 첫 입장권이 없으며 유람선과 유료 소규모 명소는 별도입니다. 봉황에서 총 2박 중 첫날을 보냅니다.",
      ),
    ),
    day(
      6,
      l(
        "A free day in Fenghuang",
        "凤凰古城自由活动",
        "봉황고성 자유 일정",
      ),
      l(
        "A free day to explore Fenghuang Ancient Town on your own, with a second night here. Day 6 includes no private vehicle or English-speaking guide. Boat rides, paid smaller attractions and any extra transport or guiding are arranged only once agreed in writing.",
        "这一天自由逛凤凰古城公共街区，继续入住凤凰第二晚。当天不含专车和英语导游；如想坐游船、去收费小景点，或需要额外用车、导游，都要先和我们另行书面确认。",
        "봉황고성 공공 구역을 자유롭게 둘러보고 두 번째 밤을 보냅니다. 이날은 전용 차량과 한국어 가이드가 포함되지 않습니다. 유람선, 유료 소규모 명소, 추가 차량이나 가이드가 필요하면 서면으로 별도 확정합니다.",
      ),
    ),
    day(
      7,
      l("Depart from Fenghuang", "从凤凰离开", "봉황 출발"),
      l(
        "After check-out, a driver-only private transfer takes you to Fenghuang Ancient City Railway Station (凤凰古城站). If your written confirmation includes a return to Zhangjiajie instead, we follow that plan. There is no guide or sightseeing on departure day.",
        "退房后，司机用专车送你到凤凰古城站。如果最终书面方案里约定送回张家界，就按那个方案走。离开当天不含导游和游览。",
        "체크아웃 후 기사가 가이드 없이 전용 차량으로 봉황고성역까지 모셔다 드립니다. 최종 서면 확인서에 장가계로 돌아가는 이동이 있으면 그 계획대로 진행합니다. 출발일에는 가이드와 관광 일정이 없습니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Your six nights: three in Wulingyuan, one in Furong Town and two in Fenghuang. Before you pay, you get the final hotels, room types, beds, breakfast, foreign-guest registration and any upgrade or single-room supplement in writing.",
    "全程 6 晚住宿：武陵源 3 晚、芙蓉镇 1 晚、凤凰 2 晚。付款前，具体酒店、房型、床型、早餐安排、能否接待外宾，以及升级或单房差，都会写进最终确认方案发给你。",
    "6박은 무릉원 3박, 부용진 1박, 봉황 2박입니다. 결제 전에 최종 호텔, 객실 유형, 침대 구성, 조식 포함 여부, 외국인 투숙 가능 여부, 업그레이드나 1인실 차액을 서면 확인서로 보내 드립니다.",
  ),
  serviceNote: l(
    "Your private vehicle covers only the pickups, transfers and touring times set out in the itinerary and your written confirmation; it is not on standby outside those hours. An English-speaking guide joins you on Days 2–5. Day 1 and Day 7 are driver-only transfers, and Day 6 is free time without a guide or vehicle. The base price includes Wulingyuan entry with the park eco-shuttles, the Ten-Mile Gallery mini-train, standard evening entry to Seventy-Two Wonder Tower and first-entry admission to Furong Town. No shopping stops.",
    "专车只负责逐日行程和书面确认中列明的接送与游览时段，这些时段之外不安排候车。D2–D5 含英语导游；D1 与 D7 为司机接送，D6 为不含车导的自由活动。基础门票包括武陵源门票与环保车、十里画廊小火车、七十二奇楼普通夜场和芙蓉镇首道门票。全程无购物店安排。",
    "전용 차량은 일정과 서면 확인서에 적힌 픽업, 이동, 관광 시간에만 운행하며, 그 밖의 시간에는 대기하지 않습니다. 한국어 가이드는 D2~D5에 포함됩니다. D1과 D7에는 가이드 없이 전용 차량 픽업·샌딩만 제공하고 D6는 차량과 가이드가 없는 자유 일정입니다. 기본 입장권은 무릉원 입장권과 관광 셔틀, 십리화랑 미니 열차, 칠십이기루 일반 야간 입장권, 부용진 첫 입장권입니다. 쇼핑 일정은 없습니다.",
  ),
  exclusions: lists(
    [
      "International and domestic flights, and high-speed rail tickets",
      "Lunches and dinners",
      "Personal travel insurance, visas, tips and personal expenses",
      "Hotel, room, vehicle, admission or activity upgrades",
      "Unlisted cable cars, the Bailong Elevator, boat rides and paid smaller attractions",
      "Night-time, overtime, extra transfers or other services outside your agreed itinerary",
    ],
    [
      "国际及国内航班、高铁票",
      "午餐和晚餐",
      "个人旅游保险、签证、司导小费及个人消费",
      "酒店、房型、车型、门票或活动升级",
      "未列索道、百龙天梯、游船及收费小景点",
      "约定行程之外的夜间、超时、额外接送及其他服务",
    ],
    [
      "국제선·국내선 항공권과 고속철도 승차권",
      "점심과 저녁 식사",
      "개인 여행자 보험, 비자, 기사·가이드 팁과 개인 비용",
      "호텔, 객실, 차량, 입장권 또는 체험 업그레이드",
      "명시되지 않은 케이블카, 백룡 엘리베이터, 유람선과 유료 소규모 명소",
      "최종 일정에 없는 야간, 초과 시간, 추가 이동과 기타 서비스",
    ],
  ),
  bookingNote: l(
    "Per-person starting prices are shown for groups of 2 and 4 travellers; flights and rail tickets are not included. Other group sizes are confirmed with you individually. Before payment, send us your dates, room and bed needs, arrival details, departure plan and number of bags. Your final written confirmation then sets out the hotels, daily vehicle times, guide coverage, included tickets, Day 7 drop-off point and final total.",
    "页面只列出 2 人和 4 人的每人起价，不含机票和高铁票；其他人数请联系我们单独确认。付款前，请把出行日期、房间和床型需求、抵达信息、离开安排和行李件数发给我们。最终书面确认会写明酒店、每天用车时段、导游服务范围、已含门票、D7 送达地点和最终总价。",
    "1인 시작가는 2명과 4명 기준으로 안내하며, 항공권과 고속철도 승차권은 포함되지 않습니다. 다른 인원은 따로 확인해 드립니다. 결제 전에 여행 날짜, 객실과 침대 구성, 도착 정보, 출발 계획, 짐 개수를 알려 주세요. 최종 확인서에 호텔, 차량 시간, 가이드 범위, 포함 입장권, D7 도착지와 총액을 적어 보내 드립니다.",
  ),
  faq: [
    {
      question: l(
        "Which admission tickets are included?",
        "基础价格具体包含哪些门票？",
        "어떤 입장권이 기본 요금에 포함되나요?",
      ),
      answer: l(
        "Wulingyuan admission with park eco-shuttles, the Ten-Mile Gallery mini-train, standard evening admission to Seventy-Two Wonder Tower and first-entry admission to Furong Town are included. Fenghuang’s public streets have no first-entry gate ticket. Unlisted cable cars, the Bailong Elevator, boat rides and paid smaller attractions are separate.",
        "包含武陵源门票与环保车、十里画廊小火车、七十二奇楼普通夜场和芙蓉镇首道门票。凤凰古城公共街区没有首道大门票。未列索道、百龙天梯、游船和收费小景点另计。",
        "무릉원 입장권과 관광 셔틀, 십리화랑 미니 열차, 칠십이기루 일반 야간 입장권, 부용진 첫 입장권이 포함됩니다. 봉황고성 공공 구역에는 첫 입장권이 없습니다. 명시되지 않은 케이블카, 백룡 엘리베이터, 유람선과 유료 소규모 명소는 별도입니다.",
      ),
    },
    {
      question: l(
        "When are the guide and private vehicle included?",
        "英语导游和私人用车分别覆盖哪些天？",
        "한국어 가이드와 전용 차량은 언제 포함되나요?",
      ),
      answer: l(
        "Your English-speaking guide is with you for the listed touring on Days 2–5. Day 1 and Day 7 are driver-only transfers, and Day 6 is free time on your own, with no guide or vehicle. The private vehicle runs during the times set out in your final confirmation; it is not on 24-hour standby.",
        "D2–D5 所列游览由英语导游陪同。D1 与 D7 只含司机接送，D6 为不含车导的自由活动。专车按最终确认方案里写明的接送和游览时段提供，不是 24 小时待命。",
        "한국어 가이드는 D2~D5의 명시된 관광 일정에 동행합니다. D1과 D7에는 가이드 없이 전용 차량 픽업·샌딩만 포함되며 D6는 차량과 가이드가 없는 자유 일정입니다. 전용 차량은 확인서에 적힌 시간에 제공되며 24시간 대기 서비스가 아닙니다.",
      ),
    },
    {
      question: l(
        "Where do we stay, and where does the tour end?",
        "六晚分别住哪里？D7 在哪里结束？",
        "어디에서 숙박하고 D7 일정은 어디에서 끝나나요?",
      ),
      answer: l(
        "Three nights in Wulingyuan, one in Furong Town and two in Fenghuang. On Day 7, the standard transfer ends at Fenghuang Ancient City Railway Station (凤凰古城站). Returning to Zhangjiajie instead is possible, but only once the route and quote are agreed in writing before payment.",
        "武陵源住 3 晚、芙蓉镇住 1 晚、凤凰住 2 晚。D7 标准送站到凤凰古城站；如果想送回张家界也可以，但要在付款前把具体路线和报价写进确认方案。",
        "무릉원 3박, 부용진 1박, 봉황 2박입니다. 기본 D7 이동은 봉황고성역에서 끝납니다. 장가계로 돌아가고 싶으시면 가능하지만, 결제 전에 구체적인 이동 계획과 견적을 서면으로 확정해야 합니다.",
      ),
    },
  ],
  heroImage: image(
    "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/wulingyuan-peaks-1600.webp",
    l(
      "Sandstone pillars in Wulingyuan, Zhangjiajie.",
      "张家界武陵源的砂岩峰林。",
      "장가계 무릉원의 사암 봉우리.",
    ),
    l(
      "The sandstone landscape at the start of the seven-day route.",
      "七天路线从张家界砂岩峰林开始。",
      "7일 여정은 장가계 사암 봉우리에서 시작합니다.",
    ),
    1600,
    1000,
    "50% 50%",
  ),
  gallery: [
    image(
      "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/furong-waterfall-1280.webp",
      l(
        "Furong Town buildings above the waterfall and river.",
        "芙蓉镇河流与沿岸建筑。",
        "폭포와 강 위에 자리한 부용진 건물들.",
      ),
      l(
        "Furong Town, where the route pauses for one night.",
        "芙蓉镇安排一晚住宿。",
        "부용진에서 1박합니다.",
      ),
      1280,
      742,
      "50% 52%",
    ),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l(
          "Arrival in Zhangjiajie",
          "抵达张家界",
          "장가계 도착",
        ),
        "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/zhangjiajie-hehua-airport-1600.webp",
        l(
          "Zhangjiajie Hehua Airport with Tianmen Mountain behind the terminal.",
          "张家界荷花机场，航站楼后方可见天门山。",
          "터미널 뒤로 천문산이 보이는 장가계 허화공항.",
        ),
        l(
          "Hehua Airport is one standard arrival point; rail arrivals are met at Zhangjiajie West Station.",
          "荷花机场是标准抵达点之一；乘高铁抵达则在张家界西站接站。",
          "허화공항 도착 시 공항에서, 고속철 도착 시 장가계서역에서 맞이합니다.",
        ),
        1600,
        1000,
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Tianzi Mountain panorama", "天子山峰林全景", "천자산 봉우리 전경"),
        "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/tianzi-mountain-panorama-1600.webp",
        l(
          "A panoramic view across the sandstone pillars of Tianzi Mountain.",
          "俯瞰天子山层叠的砂岩峰林。",
          "천자산의 겹겹이 이어진 사암 봉우리 전경.",
        ),
        l(
          "Tianzi Mountain, Yangjiajie and Yuanjiajie form the first full touring day.",
          "天子山、杨家界与袁家界组成第一个完整游览日。",
          "첫 종일 관광에서 천자산, 양가계와 원가계를 둘러봅니다.",
        ),
        1600,
        1000,
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Forest valleys", "森林溪谷", "산림 계곡"),
        "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/golden-whip-stream-1600.webp",
        l(
          "A clear stream winding through dense forest at Golden Whip Stream.",
          "金鞭溪的溪流穿过茂密山林。",
          "금편계의 울창한 숲 사이로 흐르는 맑은 계류.",
        ),
        l(
          "The second park day combines Ten-Mile Gallery and Golden Whip Stream.",
          "第二个公园日串联十里画廊与金鞭溪。",
          "둘째 공원 일정은 십리화랑과 금편계를 잇습니다.",
        ),
        1600,
        1000,
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Furong Town overnight", "芙蓉镇住一晚", "부용진 1박"),
        "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/furong-night-960.webp",
        l(
          "Furong Town waterfall and buildings illuminated at night.",
          "夜间亮灯的芙蓉镇水景与临崖建筑。",
          "밤에 불이 켜진 부용진 폭포와 절벽 건물.",
        ),
        l(
          "Staying overnight leaves time to see Furong Town after the day visitors thin out.",
          "住一晚，可以等白天游客减少后再看芙蓉镇。",
          "1박하면 당일 방문객이 줄어든 뒤 부용진을 볼 수 있습니다.",
        ),
        960,
        1707,
        "50% 48%",
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Arrive in Fenghuang", "抵达凤凰古城", "봉황고성 도착"),
        "/images/guides/border-town-fenghuang-chadong-shen-congwen/hero-1600.webp",
        l(
          "Hongqiao entrance in Fenghuang Ancient Town.",
          "凤凰古城虹桥入口。",
          "봉황고성 훙차오 입구.",
        ),
        l(
          "The guide introduces Fenghuang’s public lanes and riverside on Day 5.",
          "D5 由导游陪同走凤凰公共街巷与沱江沿岸。",
          "D5에는 가이드와 봉황 골목과 강변을 둘러봅니다.",
        ),
        1600,
        1000,
      ),
    ),
    routeGroup(
      6,
      routeVariant(
        l("Fenghuang at your own pace", "按自己的节奏游凤凰", "내 속도로 보는 봉황"),
        "/images/guides/border-town-fenghuang-chadong-shen-congwen/shen-congwen-former-residence-1600.webp",
        l(
          "The street entrance to Shen Congwen's former residence in Fenghuang.",
          "凤凰古城沈从文故居的沿街入口。",
          "봉황고성 선충원 옛집의 길가 출입구.",
        ),
        l(
          "On Day 6 you can visit the former residence on your own; its admission, a guide and a vehicle are not in the base package.",
          "D6 想去的话，可以自行参观沈从文故居；该处门票、车辆和导游不含在基础价格里。",
          "D6에 선충원 옛집을 개별 방문할 수 있으며, 기본 요금에는 입장권·차량·가이드가 포함되지 않습니다.",
        ),
        1600,
        1186,
      ),
    ),
    routeGroup(
      7,
      routeVariant(
        l("A final Fenghuang morning", "凤凰最后一个早晨", "봉황의 마지막 아침"),
        "/images/guides/border-town-fenghuang-chadong-shen-congwen/tuojiang-stepping-stones-1126.webp",
        l(
          "Visitors crossing stepping stones on the Tuojiang in Fenghuang.",
          "游客从凤凰沱江跳岩上过河。",
          "봉황 퉈장의 징검다리를 건너는 방문객들.",
        ),
        l(
          "Departure time follows your train or return-transfer plan.",
          "离开时间按你的车次或返程接送方案安排。",
          "출발 시간은 이용하실 열차나 귀환 이동 계획에 맞춥니다.",
        ),
        1126,
        819,
      ),
    ),
  ],
  packages: [
    standardPackage(
      "standard-guided",
      l("Private tour", "私家团标准版", "한국어 가이드 포함"),
      l(
        "Six hotel nights with breakfast, a private vehicle for the service times in the itinerary, an English-speaking guide on Days 2–5 and the listed base admissions. No shopping stops.",
        "含 6 晚住宿及早餐、行程所列时段的专车、D2–D5 英语导游和列明的基础门票，全程无购物店。",
        "6박 조식 포함 숙박, 일정에 명시된 시간의 전용 차량, D2~D5 한국어 가이드와 기본 입장권이 포함되며 쇼핑 일정은 없습니다.",
      ),
      // Owner-approved public base prices for 2- and 4-traveller groups.
      [5840, 4860],
      [899, 749],
    ),
  ],
  datePublished: "2026-09-19",
  dateModified: "2026-09-20",
  lastReviewed: "2026-09-20",
};

export const privateTourProducts: readonly PrivateTourProduct[] = Object.freeze(
  [
    shanghaiSuzhouHangzhou,
    chengdu,
    xian,
    chongqingWulong,
    guilinYangshuo,
    harbinWinter,
    shanghaiSuzhou,
    beijing,
    zhangjiajieForestFixedRoute,
    zhangjiajieFurongFenghuang,
    ...privateTourExpansionProducts,
  ],
);

const englishMetadataDescriptions: Readonly<Record<string, string>> =
  Object.freeze({
    "shanghai-suzhou-hangzhou-6-day-private-tour":
      "Six-day private tour linking Shanghai, Suzhou and Hangzhou, with Ctrip 4-Diamond stays, four guided days and private transfers.",
    "harbin-winter-5-day-private-tour":
      "Five-day private Harbin winter tour with Ctrip 4-Diamond stays, a heated vehicle and three guided days. Date-window and peak-period conditions apply.",
    "shanghai-suzhou-5-day-private-tour":
      "Five-day private Shanghai and Suzhou tour with a Ctrip 4-Diamond stay, guided sightseeing, private transfers and return high-speed rail.",
  });

export const privateTourProductsBySlug: Readonly<
  Record<string, PrivateTourProduct>
> = Object.freeze(
  Object.fromEntries(
    privateTourProducts.map((product) => [product.slug, product]),
  ),
);

export function getPrivateTourProduct(
  slug: string,
): PrivateTourProduct | undefined {
  return privateTourProductsBySlug[slug];
}

export function getPrivateTourPaths(slug: string): LocalizedValue<string> {
  return {
    en: `/tours/${slug}/`,
    zh: `/zh/tours/${slug}/`,
    ko: `/ko/tours/${slug}/`,
  };
}

export function getPrivateTourPriceRows(
  product: PrivateTourProduct,
  packageId: string,
  locale: PrivateTourLocale,
): readonly LocalizedPrivateTourPriceRow[] {
  const selectedPackage = product.packages.find(
    (candidate) => candidate.id === packageId,
  );
  if (!selectedPackage) {
    throw new RangeError(
      `Unknown package "${packageId}" for private tour "${product.slug}".`,
    );
  }
  return selectedPackage.prices.map((tier) => ({
    travelers: tier.travelers,
    ...formatPrivateTourPrice(
      tier.cnyPerPerson,
      locale,
      tier.usdPerPerson,
      tier.publishedPrice,
    ),
  }));
}

function localizeImage(
  value: PrivateTourImage,
  locale: PrivateTourLocale,
): LocalizedPrivateTourImage {
  return {
    src: value.src,
    width: value.width,
    height: value.height,
    objectPosition: value.objectPosition,
    alt: value.alt[locale],
    caption: value.caption[locale],
  };
}

export function localizePrivateTourProduct(
  product: PrivateTourProduct,
  locale: PrivateTourLocale,
): LocalizedPrivateTourProduct {
  const paths = getPrivateTourPaths(product.slug);
  const packages = product.packages.map((tourPackage) => ({
    id: tourPackage.id,
    guideMode: tourPackage.guideMode,
    label: tourPackage.label[locale],
    summary: tourPackage.summary[locale],
    quoteOnly: tourPackage.quoteOnly === true,
    rows: getPrivateTourPriceRows(product, tourPackage.id, locale),
  }));
  return {
    id: product.id,
    slug: product.slug,
    locale,
    path: paths[locale],
    paths,
    title: product.title[locale],
    // The locale layouts already append the Homeground China title template.
    metadataTitle: product.metadataTitle?.[locale] ?? product.title[locale],
    metadataDescription:
      product.metadataDescription?.[locale] ?? (locale === "en"
        ? (englishMetadataDescriptions[product.slug] ?? product.summary.en)
        : product.summary[locale]),
    openGraphLocale:
      locale === "en" ? "en_US" : locale === "zh" ? "zh_CN" : "ko_KR",
    eyebrow: product.eyebrow[locale],
    lede: product.lede[locale],
    summary: product.summary[locale],
    highlights: product.highlights[locale],
    days: product.days,
    nights: product.nights,
    servicePolicy: product.servicePolicy,
    itinerary: product.itinerary.map((item) => ({
      day: item.day,
      title: item.title[locale],
      description: item.description[locale],
    })),
    hotelNote: product.hotelNote[locale],
    serviceNote: product.serviceNote[locale],
    exclusions: product.exclusions[locale],
    bookingNote: product.bookingNote[locale],
    faq: product.faq?.map((item) => ({
      question: item.question[locale],
      answer: item.answer[locale],
    })),
    heroImage: localizeImage(product.heroImage, locale),
    gallery: product.gallery.map((item) => localizeImage(item, locale)),
    routeMedia: (product.routeMedia ?? []).map((group) => ({
      day: group.day,
      variants: group.variants.map((variant) => ({
        label: variant.label[locale],
        image: localizeImage(variant.image, locale),
      })),
    })),
    packages,
    datePublished: product.datePublished,
    dateModified: product.dateModified,
    entityIds: {
      product: `https://homegroundchina.com/#${product.id}`,
      offers: Object.fromEntries(
        product.packages.map((tourPackage) => [
          tourPackage.id,
          `https://homegroundchina.com/#${product.id}-${tourPackage.id}`,
        ]),
      ),
    },
  };
}

export function getLocalizedPrivateTourProduct(
  slug: string,
  locale: PrivateTourLocale,
): LocalizedPrivateTourProduct | undefined {
  const product = getPrivateTourProduct(slug);
  return product ? localizePrivateTourProduct(product, locale) : undefined;
}

export function assertAllPrivateTourPriceInvariants(): true {
  for (const product of privateTourProducts) {
    for (const tourPackage of product.packages) {
      for (const tier of tourPackage.prices) {
        if (tier.publishedPrice) {
          formatPrivateTourPrice(
            tier.cnyPerPerson,
            "en",
            tier.usdPerPerson,
            tier.publishedPrice,
          );
          continue;
        }
        const usd = formatPrivateTourPrice(tier.cnyPerPerson, "en", tier.usdPerPerson).amount;
        const krw = convertCnyToKrw(tier.cnyPerPerson);
        assertConvertedPriceInvariant(tier.cnyPerPerson, usd, "USD");
        assertConvertedPriceInvariant(tier.cnyPerPerson, krw, "KRW");
      }
    }
  }
  return true;
}
