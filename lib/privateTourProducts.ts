import type { HomegroundLocale } from "./homegroundI18n";

export type PrivateTourLocale = HomegroundLocale;
export type PrivateTourCurrency = "CNY" | "USD" | "KRW";
export type PrivateTourGuideMode = "guided" | "self-guided" | "standard";
export type LocalizedValue<T> = Readonly<Record<PrivateTourLocale, T>>;
export type LocalizedText = LocalizedValue<string>;
export type LocalizedStringList = LocalizedValue<readonly string[]>;

export interface PrivateTourPriceTier {
  travelers: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  cnyPerPerson: number;
}

export interface PrivateTourPackage {
  id: string;
  guideMode: PrivateTourGuideMode;
  label: LocalizedText;
  summary: LocalizedText;
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
  travelers: number;
}

export interface LocalizedPrivateTourPackage {
  id: string;
  guideMode: PrivateTourGuideMode;
  label: string;
  summary: string;
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
): FormattedPrivateTourPrice {
  assertValidCny(cny);
  const currency: PrivateTourCurrency =
    locale === "en" ? "USD" : locale === "ko" ? "KRW" : "CNY";
  const amount =
    locale === "en"
      ? convertCnyToUsd(cny)
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
      currencyDisplay: "symbol",
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

const prices = ([twoTravellers, fourTravellers]: readonly [
  number,
  number,
]): readonly PrivateTourPriceTier[] => [
  { travelers: 2, cnyPerPerson: twoTravellers },
  { travelers: 4, cnyPerPerson: fourTravellers },
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
): PrivateTourPackage => ({
  id,
  guideMode: "standard",
  label,
  summary,
  prices: prices(cnyPrices),
});

const guidedPackage = (
  id: string,
  guideMode: PrivateTourGuideMode,
  label: LocalizedText,
  summary: LocalizedText,
  cnyPrices: readonly [number, number],
): PrivateTourPackage => ({
  id,
  guideMode,
  label,
  summary,
  prices: prices(cnyPrices),
});

const standardLabel = l("Private tour", "私家团标准版", "프라이빗 투어");
const standardSummary = l(
  "Private vehicle, the listed guided touring days, listed adult admission tickets and breakfast-included accommodation. No shopping stops.",
  "包含行程所列私车、导游游览日、成人基础门票及含早住宿，全程无购物店安排。",
  "일정에 명시된 전용 차량, 영어 가이드 동행일, 성인 기본 입장권과 조식 포함 숙박이 포함되며 쇼핑 일정은 없습니다.",
);

const commonBookingNote = l(
  "The published per-person starting prices cover groups of 2 and 4 travellers; flights are not included. Any other group size requires manual confirmation. Send us your dates, room needs, arrival details and luggage count; we will confirm availability and issue the final quote before payment.",
  "网页仅公开 2 人和 4 人的每人起价，往返机票另计；其他人数须人工确认。请提供日期、房间需求、到离信息和行李数量；我们会核对酒店、车辆和景点预约情况，再在付款前发出最终报价。",
  "공개된 항공권 제외 1인 시작가는 2명과 4명 기준이며, 그 외 인원은 수동 확인이 필요합니다. 날짜, 객실 구성, 도착·출발편과 수하물 수량을 알려 주시면 예약 가능 여부를 확인한 뒤 결제 전 최종 견적을 드립니다.",
);

const commonExclusions = (
  extraEn: readonly string[],
  extraZh: readonly string[],
  extraKo: readonly string[],
  additionalServices: LocalizedText = l(
    "Holiday, late-night, overtime and unlisted services",
    "节假日、夜间、超时及未列服务",
    "공휴일, 야간, 초과 시간 및 일정에 없는 서비스",
  ),
): LocalizedStringList =>
  lists(
    [
      "International and domestic flights",
      "Lunches and dinners",
      "Personal travel insurance, visas, tips and personal expenses",
      "Room upgrades or extra single-room requirements",
      additionalServices.en,
      ...extraEn,
    ],
    [
      "国际及国内往返机票",
      "午餐和晚餐",
      "个人旅游意外险、签证、司导小费及个人消费",
      "房型升级或超出基础房间配置的单住需求",
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
const MODIFIED = "2026-08-24";

const shanghaiSuzhouHangzhou: PrivateTourProduct = {
  id: "private-tour-shanghai-suzhou-hangzhou-6d5n",
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
    "A five-night private journey with four guided touring days, breakfast-included Ctrip 4-Diamond–rated accommodation and arrival in Shanghai with departure from Hangzhou.",
    "5 晚 4 钻含早住宿，D2–D5 英语导游；上海进、杭州出，适合希望一次看完三城又不想频繁自行转车的客人。",
    "중국 씨트립 기준 4다이아 등급 · 조식 포함 5박, D2~D5 영어 가이드, 상하이 도착·항저우 출발로 구성된 항공권 제외 프라이빗 일정입니다.",
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
        "Arrival buffer in Shanghai",
        "抵达上海｜把第一天留给落地与适应",
        "상하이 도착｜이동과 적응을 위한 여유",
      ),
      l(
        "Meet your private driver at the confirmed Shanghai airport or railway station and travel directly to the Shanghai hotel with your luggage. Day 1 has no fixed sightseeing, leaving room for arrival delays, the transfer into the city and check-in; settle in and stay overnight in Shanghai.",
        "在已确认的上海机场或车站与司机会合，行李随行，私车直接送往上海酒店。D1 不安排固定景点，为航班或列车波动、进城与入住留出余量；安顿后入住上海。",
        "확정된 상하이 공항 또는 기차역에서 기사를 만나 수하물과 함께 전용 차량으로 상하이 호텔에 바로 이동합니다. D1에는 고정 관광을 넣지 않아 도착 지연, 시내 이동과 체크인에 여유를 두며, 이날은 상하이에서 숙박합니다.",
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
        "Start from the Shanghai hotel with the English-speaking guide and private vehicle. Visit Yu Garden or the Old City, continue to Lujiazui and finish along the Bund, adjusting the order only for confirmed reservations and local conditions; return to the same Shanghai hotel for the night.",
        "从上海酒店出发，由英语导游和私车衔接游览。先看豫园或老城厢，再前往陆家嘴，最后走到外滩；具体先后仅按已确认预约和现场情况调整，当晚返回同一家上海酒店。",
        "상하이 호텔에서 영어 가이드와 전용 차량으로 출발합니다. 예원 또는 구시가지를 본 뒤 루자쭈이로 이동하고 와이탄에서 일정을 마치며, 확정된 예약과 현지 상황에 따라서만 순서를 조정합니다. 관광 후 같은 상하이 호텔로 돌아와 숙박합니다.",
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
        "Check out of the Shanghai hotel and begin with the confirmed half-day Shanghai visit. Your luggage stays with the agreed intercity arrangement as you continue to Suzhou by the confirmed rail-and-transfer plan or door-to-door vehicle; after arrival, visit either Panmen or Tiger Hill, then Shantang Street, and check in for the night in Suzhou.",
        "从上海酒店退房后，先完成已确认的上海半日游览。行李按最终书面确认的跨城方案随团衔接，再以高铁加两端接送或门到门车辆前往苏州；抵达后在盘门与虎丘中选择一项，再游览山塘街，当晚入住苏州。",
        "상하이 호텔에서 체크아웃한 뒤 확정된 상하이 반일 관광부터 진행합니다. 수하물은 최종 서면 확정된 도시 간 이동 계획에 따라 함께 연결하고, 열차와 양쪽 픽업 또는 문 앞까지 가는 차량 중 확정된 방식으로 쑤저우에 이동합니다. 도착 후 판먼과 후추 중 한 곳, 이어 산탕제를 둘러보고 쑤저우에서 숙박합니다.",
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
        "Check out of the Suzhou hotel and keep your luggage with the confirmed transfer arrangement. Visit the Humble Administrator's Garden, Suzhou Museum and Pingjiang Road in the reservation-compatible order, then continue to Hangzhou by the confirmed intercity plan and check in there for the night.",
        "从苏州酒店退房，行李按已确认的跨城接驳方案随团处理。拙政园、苏州博物馆和平江路按预约可执行的顺序游览，完成苏州核心内容后再前往杭州，当晚入住杭州。",
        "쑤저우 호텔에서 체크아웃하고 수하물은 확정된 도시 간 이동 방식에 따라 함께 처리합니다. 졸정원, 쑤저우박물관과 핑장루를 예약 가능한 순서로 둘러본 뒤 확정된 이동 계획으로 항저우에 가서 숙박합니다.",
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
        "Leave the Hangzhou hotel with the guide and private vehicle for Lingyin–Feilai Peak and Lingyin Temple. Continue to the confirmed choice of Longjing Village or the China National Tea Museum, then finish at the West Lake shore and with the listed cruise before returning to the same Hangzhou hotel.",
        "从杭州酒店出发，由导游和私车前往灵隐飞来峰与灵隐寺；随后游览已确认的龙井村或中国茶叶博物馆其中一项，再到西湖湖岸并乘坐行程所列游船，当晚返回同一家杭州酒店。",
        "항저우 호텔에서 가이드와 전용 차량으로 출발해 링인 페이라이펑과 링인사를 둘러봅니다. 이어 확정된 룽징촌 또는 중국차엽박물관 중 한 곳을 방문하고, 서호 호숫가와 일정에 포함된 유람선으로 마친 뒤 같은 항저우 호텔로 돌아갑니다.",
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
        "Check out of the Hangzhou hotel and travel with your luggage by private vehicle to the confirmed Hangzhou airport or railway station. There is no fixed sightseeing on departure day, preserving a practical buffer for check-out, city traffic and the confirmed flight or train.",
        "从杭州酒店退房，行李随行，由私车送往已确认的杭州机场或车站。返程日不安排固定景点，为退房、城市交通以及已确认的航班或列车保留实际缓冲。",
        "항저우 호텔에서 체크아웃하고 수하물과 함께 전용 차량으로 확정된 항저우 공항 또는 기차역에 이동합니다. 출발일에는 고정 관광을 넣지 않아 체크아웃, 도심 교통과 확정된 항공편 또는 열차에 필요한 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Five nights in breakfast-included Ctrip 4-Diamond–rated rooms, based on twin sharing. For an odd-numbered group, the listed base arrangement includes one single-occupancy room.",
    "5 晚携程 4 钻酒店双标含早，默认两人一间；奇数人数的基础配置含 1 间单住。具体酒店与房型将在预订前确认。",
    "중국 씨트립 기준 4다이아 등급 호텔 5박과 조식이 포함되며 2인 1실 기준입니다. 홀수 인원은 기본 배정에 1인 사용 객실 1실이 포함됩니다.",
  ),
  serviceNote: l(
    "Private arrival and departure transfers, guided touring on Days 2–5, listed adult admission tickets and cross-city transport are included. Groups of 2–3 usually use rail with private transfers at both ends; groups of 4–9 usually use a compliant door-to-door vehicle, confirmed for the actual luggage.",
    "含 D1 接机/站、D6 送机/站，D2–D5 英语导游、行程内私车、跨城交通、行程所列成人基础门票与预约。2–3 人通常采用高铁加两端私车接送；4–9 人通常采用门到门合规车辆，最终按人数和行李确认。",
    "D1 픽업, D6 샌딩, D2~D5 영어 가이드, 일정 내 전용 차량, 도시 간 이동과 성인 기본 입장권이 포함됩니다. 2~3명은 보통 열차와 양쪽 전용 픽업을, 4~9명은 인원과 수하물에 맞춘 합법적인 전용 차량을 이용합니다.",
  ),
  exclusions: commonExclusions(
    ["Any attraction or ticket not listed in the confirmed itinerary"],
    ["确认行程之外的景点、门票或体验"],
    ["확정 일정에 명시되지 않은 관광지, 입장권 또는 체험"],
  ),
  bookingNote: l(
    "The published per-person starting prices cover groups of 2 and 4 travellers; flights are not included. For any other group size, send us your dates, room needs, arrival details and luggage count so we can check the actual rooms and vehicle before issuing a written quote.",
    "网页仅公开 2 人和 4 人的每人起价，往返机票另计。其他人数请提供日期、房间需求、到离信息和行李数量；我们会按实际房间与车型重新核对，并在付款前发出书面报价。",
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
        "The Hangzhou day includes one confirmed tea stop before West Lake.",
        "杭州游览日在西湖之前安排一处已确认的茶文化停留。",
        "항저우 관광일에는 서호에 앞서 확정된 차 문화 장소 한 곳을 방문합니다.",
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
          "The photograph introduces the Shanghai arrival city; the actual airport or station transfer follows the confirmed booking.",
          "照片用于呈现抵达城市上海；实际机场或车站接送按订单确认。",
          "사진은 도착 도시 상하이를 보여 주며 실제 공항·역 이동은 예약에 따라 확정합니다.",
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
          "Panmen is one of the confirmed first-look choices after arriving in Suzhou.",
          "盘门是抵达苏州后可确认选择的首站之一。",
          "판먼은 쑤저우 도착 후 확정할 수 있는 첫 방문지 중 하나입니다.",
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
          "The Hangzhou sightseeing day begins at Feilai Peak and Lingyin Temple before the confirmed tea stop and West Lake.",
          "杭州游览日从飞来峰与灵隐寺开始，再前往已确认的茶文化地点和西湖。",
          "항저우 관광일은 페이라이펑과 링인사에서 시작해 확정된 차 문화 장소와 서호로 이어집니다.",
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
          "Rail departures use the confirmed station; airport transfers follow the confirmed flight instead.",
          "乘高铁按确认车站送站；乘飞机则按确认航班送往机场。",
          "열차는 확정된 역으로, 항공편은 확정된 항공편에 맞춰 공항으로 이동합니다.",
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
        { travelers: 2, cnyPerPerson: 12490 },
        { travelers: 4, cnyPerPerson: 8190 },
      ],
    },
  ],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
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
        "Meet the driver at the confirmed Chengdu airport or railway station and travel with your luggage directly to the Chengdu hotel. No guide or fixed sightseeing is planned, leaving arrival and check-in unhurried; stay overnight in Chengdu.",
        "在已确认的成都机场或车站与司机会合，行李随行，直接送往成都酒店。当天不安排导游和固定景点，为抵达与入住留出余量；当晚入住成都。",
        "확정된 청두 공항 또는 기차역에서 기사를 만나 수하물과 함께 청두 호텔로 바로 이동합니다. 이날은 가이드와 고정 관광을 넣지 않아 도착과 체크인에 여유를 두며, 청두에서 숙박합니다.",
      ),
    ),
    day(
      2,
      l("Pandas and People's Park", "熊猫与人民公园", "판다와 인민공원"),
      l(
        "Start from the Chengdu hotel with the English-speaking guide and private vehicle for an early visit to Chengdu Research Base of Giant Panda Breeding. Continue to People's Park and its teahouse setting, then return to the same Chengdu hotel for the night.",
        "从成都酒店出发，由英语导游和私车前往成都大熊猫繁育研究基地安排早场游览；随后回到市区游览人民公园并体验茶馆，当晚返回同一家成都酒店。",
        "청두 호텔에서 영어 가이드와 전용 차량으로 출발해 이른 시간 청두 판다번식연구기지를 둘러봅니다. 이어 인민공원과 찻집을 경험한 뒤 같은 청두 호텔로 돌아와 숙박합니다.",
      ),
    ),
    day(
      3,
      l("Sanxingdui Museum", "三星堆博物馆", "싼싱두이박물관"),
      l(
        "Leave the Chengdu hotel with the guide and private vehicle for Sanxingdui Museum. Give the confirmed museum visit the main part of the day, then travel back to Chengdu and stay at the same hotel.",
        "从成都酒店出发，由导游和私车前往三星堆博物馆，把当天主要时间留给已确认的博物馆游览；结束后乘车返回成都，继续入住同一家酒店。",
        "청두 호텔에서 가이드와 전용 차량으로 싼싱두이박물관에 이동해 확정된 박물관 관람에 이날의 주요 시간을 사용합니다. 관람 후 청두로 돌아와 같은 호텔에서 숙박합니다.",
      ),
    ),
    day(
      4,
      l("Dujiangyan", "都江堰", "두장옌"),
      l(
        "Start at the Chengdu hotel and travel by private vehicle to Dujiangyan. Visit the irrigation system and then Guanxian Ancient Town in the confirmed order, before returning to the same Chengdu hotel for the final night.",
        "从成都酒店出发，乘私车前往都江堰；按已确认顺序游览都江堰水利工程与灌县古城，结束后返回同一家成都酒店，入住最后一晚。",
        "청두 호텔에서 전용 차량으로 두장옌에 이동합니다. 확정된 순서에 따라 두장옌 수리시설과 관현고성을 둘러본 뒤 같은 청두 호텔로 돌아와 마지막 밤을 보냅니다.",
      ),
    ),
    day(
      5,
      l("Depart Chengdu", "成都返程", "청두 출발"),
      l(
        "Check out of the Chengdu hotel and travel with your luggage by private vehicle to the confirmed airport or railway station. No guide or fixed sightseeing is planned, preserving the departure buffer.",
        "从成都酒店退房，行李随行，由私车送往已确认的机场或车站。当天不安排导游和固定景点，为返程保留必要余量。",
        "청두 호텔에서 체크아웃하고 수하물과 함께 전용 차량으로 확정된 공항 또는 기차역에 이동합니다. 이날은 가이드와 고정 관광을 넣지 않아 출발에 필요한 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four nights in a breakfast-included Ctrip 4-Diamond–rated Chengdu hotel, based on twin sharing. Room arrangements for group sizes other than the published 2- and 4-traveller tiers are confirmed manually.",
    "成都 4 晚携程 4 钻酒店双标含早，页面公开的 2 人和 4 人档默认两人一间；其他人数的房间配置须人工确认。",
    "청두에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 수동으로 확인합니다.",
  ),
  serviceNote: l(
    "Private driver transfers on Days 1 and 5; English guide and private vehicle on Days 2–4. Listed adult admission tickets and attraction transport are included. No shopping stops.",
    "D1/D5 司机接送，D2–D4 英语导游与行程内私车；含行程所列成人基础门票、景交与预约，全程无购物店安排。",
    "D1·D5 기사 픽업·샌딩, D2~D4 영어 가이드와 전용 차량, 일정에 명시된 성인 기본 입장권과 관광지 내 이동이 포함되며 쇼핑 일정은 없습니다.",
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
      "The real base photograph identifies the Day 2 venue; animal visibility and viewing conditions are never guaranteed.",
      "真实照片确认的是 D2 所到的成都熊猫基地；不承诺看到特定熊猫或固定观赏状态。",
      "실제 사진은 D2에 방문하는 청두 판다기지를 보여 주며, 특정 판다나 관람 상태를 보장하지 않습니다.",
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
        "茶馆时间呈现成都适合作为旅行基地的日常慢节奏。",
        "찻집 시간은 청두를 편안한 여행 거점으로 만드는 느린 일상을 보여 줍니다.",
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
          "A central Chengdu river view introduces the overnight base; the exact airport or station transfer is confirmed for the booking.",
          "用成都中心城区河景认识住宿基地；实际机场或车站接送按订单确认。",
          "청두 도심의 강 풍경으로 숙박 거점을 소개하며, 실제 공항 또는 역 이동은 예약별로 확정합니다.",
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
          "This photograph shows a sculpture, not a live panda; the itinerary visits the real-animal enclosures early in the day.",
          "照片展示的是园区雕塑，不是真熊猫；当天早场游览真实动物展区。",
          "사진은 실제 판다가 아닌 기지의 조형물이며, 일정은 이른 시간 실제 판다 방사장을 방문합니다.",
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
          "The photograph identifies the new museum arrival setting; admission inventory and gallery order are confirmed separately.",
          "照片确认的是三星堆新馆到达环境；门票库存与展厅顺序另行确认。",
          "사진은 싼싱두이 신관의 도착 공간을 보여 주며, 입장권 재고와 전시 동선은 별도로 확인합니다.",
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
          "The landscape view establishes Dujiangyan's river-valley scale; internal routes and attraction transport are confirmed for the visit.",
          "全景用于呈现都江堰河谷尺度；景区内部路线与景交按实际游览确认。",
          "전경은 두장옌 강 계곡의 규모를 보여 주며, 내부 동선과 관광지 이동은 방문 조건에 맞춰 확정합니다.",
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
          "A final city view closes the stay before the confirmed airport or railway-station transfer; it does not identify the departure node.",
          "用成都城市夜景为旅程收尾，再按订单送往机场或车站；画面不代表具体出发节点。",
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
      [9990, 6290],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
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
        "Meet the driver at the confirmed Xi'an airport or railway station and take your luggage directly to the central Xi'an hotel by private vehicle. No guide or fixed sightseeing is planned; settle in and stay overnight in Xi'an.",
        "在已确认的西安机场或车站与司机会合，行李随行，乘私车直接前往西安市区酒店。当天不安排导游和固定景点；安顿后入住西安。",
        "확정된 시안 공항 또는 기차역에서 기사를 만나 수하물과 함께 전용 차량으로 시안 도심 호텔에 바로 이동합니다. 이날은 가이드와 고정 관광을 넣지 않으며 시안에서 숙박합니다.",
      ),
    ),
    day(
      2,
      l("City Wall and Tang Xi'an", "城墙与盛唐西安", "성벽과 당나라 시안"),
      l(
        "Start from the Xi'an hotel with the English-speaking guide and private vehicle. Visit Xi'an City Wall, continue to the Giant Wild Goose Pagoda square and then Grand Tang Mall in the reservation-compatible order, before returning to the same Xi'an hotel.",
        "从西安酒店出发，由英语导游和私车衔接游览西安城墙，再前往大雁塔广场与大唐不夜城；具体先后按预约可执行情况确认，当晚返回同一家西安酒店。",
        "시안 호텔에서 영어 가이드와 전용 차량으로 출발합니다. 시안 성벽, 대안탑 광장과 대당불야성을 예약 가능한 순서로 둘러본 뒤 같은 시안 호텔로 돌아옵니다.",
      ),
    ),
    day(
      3,
      l("Terracotta Warriors", "兵马俑完整日", "병마용 종일 일정"),
      l(
        "Leave the Xi'an hotel by private vehicle for Lintong. Visit the Terracotta Warriors and Huaqing Palace in the order supported by the confirmed reservations, then travel back to Xi'an and stay at the same hotel.",
        "从西安酒店乘私车前往临潼，兵马俑与华清宫按已确认预约可执行的顺序游览；结束后乘车返回西安，继续入住同一家酒店。",
        "시안 호텔에서 전용 차량으로 린퉁에 이동합니다. 병마용과 화청궁을 확정된 예약에 맞는 순서로 둘러본 뒤 시안으로 돌아와 같은 호텔에서 숙박합니다.",
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
        "Begin at the Xi'an hotel and use the guide, walking sections and private vehicle to connect the Great Mosque and Muslim Quarter. Continue to the Xi'an Museum complex, whose grounds include the museum building, Jianfu Temple site and Small Wild Goose Pagoda heritage area. The written confirmation will state which areas are open and included on the visit date, before the return to the same hotel for the final night.",
        "从西安酒店出发，由导游带领步行游览大清真寺与回民街，需要用车的路段由私车衔接；随后游览西安博物院景区，该院区由博物馆展馆、荐福寺遗址和小雁塔历史文化片区组成。书面确认会写明出行当天开放并纳入行程的具体区域，游览后返回同一家酒店。",
        "시안 호텔에서 출발해 가이드와 함께 대청진사와 회민거리를 걷고, 차량이 필요한 구간은 전용 차량으로 연결합니다. 이어 박물관 전시관, 젠푸사 유적과 소안탑 역사문화 구역으로 구성된 시안박물원 단지를 방문합니다. 방문일에 개방되고 일정에 포함되는 구역은 서면 확인서에 명시하며, 관람 후 같은 호텔로 돌아와 마지막 밤을 보냅니다.",
      ),
    ),
    day(
      5,
      l("Depart Xi'an", "西安返程", "시안 출발"),
      l(
        "Check out of the Xi'an hotel and take your luggage by private vehicle to the confirmed airport or railway station. No guide or fixed sightseeing is planned, leaving room for the confirmed departure.",
        "从西安酒店退房，行李随行，由私车送往已确认的机场或车站。当天不安排导游和固定景点，为已确认的返程时间留出余量。",
        "시안 호텔에서 체크아웃하고 수하물과 함께 전용 차량으로 확정된 공항 또는 기차역에 이동합니다. 이날은 가이드와 고정 관광을 넣지 않아 확정된 출발 일정에 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four nights in a breakfast-included Ctrip 4-Diamond–rated Xi'an hotel, based on twin sharing. Room arrangements for group sizes other than the published 2- and 4-traveller tiers are confirmed manually.",
    "西安 4 晚携程 4 钻酒店双标含早，页面公开的 2 人和 4 人档默认两人一间；其他人数的房间配置须人工确认。",
    "시안에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 수동으로 확인합니다.",
  ),
  serviceNote: l(
    "Private driver transfers on arrival and departure, plus an English guide and private vehicle on Days 2–4. Listed adult admission tickets and attraction transport are included. No shopping stops.",
    "抵达与返程由司机接送，D2–D4 英语导游与行程内私车；含行程所列成人基础门票、景交和预约，全程无购物店安排。",
    "도착·출발 전용 차량, D2~D4 영어 가이드와 전용 차량, 일정에 명시된 성인 기본 입장권과 관광지 내 이동이 포함되며 쇼핑 일정은 없습니다.",
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
        "The old-city day ends at street level around the Great Mosque and Muslim Quarter.",
        "古城中心日最后落到大清真寺与回民街的街巷尺度。",
        "구시가 일정은 대청진사와 회민거리의 생활감 있는 골목에서 마무리됩니다.",
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
          "The wall introduces the scale of the old city; the exact airport or railway-station pickup is confirmed for the booking.",
          "用城墙尺度认识西安古城；实际机场或车站接送按订单确认。",
          "성벽 풍경으로 시안 구시가의 규모를 소개하며, 실제 공항 또는 역 픽업은 예약별로 확정합니다.",
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
          "A full day is reserved for the eastern heritage sites; reservation availability is confirmed separately.",
          "为城东遗址留出完整一天；实名预约与余票另行确认。",
          "동쪽 유적을 위해 하루를 배정하며, 실명 예약과 잔여 입장권은 별도로 확인합니다.",
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
          "For a confirmed rail departure, the driver can take you to Xi'an North; airport transfers follow the confirmed flight instead.",
          "如确认从西安北站乘高铁返程，司机送至该站；乘飞机则按确认航班送往机场。",
          "확정된 고속철도 출발이 시안북역이면 기사 차량으로 이동하며, 항공편 이용 시에는 확정된 항공편에 맞춰 공항으로 이동합니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage(
      "standard-guided",
      standardLabel,
      standardSummary,
      [9590, 6290],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-08-31",
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
        "Meet the driver at the confirmed Chongqing airport or railway station and travel with your luggage by private vehicle to the Chongqing hotel. No guide or fixed sightseeing is planned; settle in and stay overnight in Chongqing.",
        "在已确认的重庆机场或车站与司机会合，行李随行，乘私车前往重庆酒店。当天不安排导游和固定景点；安顿后入住重庆。",
        "확정된 충칭 공항 또는 기차역에서 기사를 만나 수하물과 함께 전용 차량으로 충칭 호텔에 이동합니다. 이날은 가이드와 고정 관광을 넣지 않으며 충칭에서 숙박합니다.",
      ),
    ),
    day(
      2,
      l("Chongqing city", "重庆城市日", "충칭 도심"),
      l(
        "Start from the Chongqing hotel with the English-speaking guide and private vehicle. Visit Liziba, continue through the river and city viewpoints, then add either Three Gorges Museum or the exterior of Hongya Cave according to the confirmed operating plan; return to the same Chongqing hotel.",
        "从重庆酒店出发，由英语导游和私车先前往李子坝，再衔接两江与城市观景点；最后按已确认的开放与执行方案安排三峡博物馆或洪崖洞外观其中一项，当晚返回同一家重庆酒店。",
        "충칭 호텔에서 영어 가이드와 전용 차량으로 출발해 리쯔바를 먼저 보고 두 강과 도심 전망 지점으로 이어갑니다. 확정된 운영 계획에 따라 삼협박물관 또는 홍야동 외관 중 한 곳을 더한 뒤 같은 충칭 호텔로 돌아옵니다.",
      ),
    ),
    day(
      3,
      l("Chongqing to Wulong", "重庆前往武隆", "충칭에서 우룽으로"),
      l(
        "Check out of the Chongqing hotel and keep your luggage in the private vehicle for the journey to Wulong. At the Three Natural Bridges, the current standard admission includes the official transfer bus and Tianlong revolving elevator; follow the attraction's operating route and walking sections. Continue to the confirmed hotel in the Fairy Mountain resort area for the night.",
        "从重庆酒店退房，行李随私车前往武隆。天生三桥当前标准票包含官方中转车和天龙旋梯，抵达后按景区实际运营路线及步行路段游览；随后前往已确认的仙女山度假区酒店入住。",
        "충칭 호텔에서 체크아웃하고 수하물을 전용 차량에 실어 우룽으로 이동합니다. 천생삼교의 현재 표준 입장권에는 공식 환승버스와 톈룽 회전 엘리베이터가 포함되며, 현장 운영 동선과 도보 구간에 따라 관람합니다. 이후 확정된 선녀산 리조트 지역 호텔에서 숙박합니다.",
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
        "Check out of the Wulong hotel and keep your luggage with the private vehicle. Visit only the confirmed Day 4 choice; the written confirmation must state whether it includes either the Fairy Mountain admission ticket or the Furong Cave admission-and-ropeway package. Only one is included, not both. Then return by road to Chongqing and check in there for the final night.",
        "从武隆酒店退房，行李随私车同行。D4 仅游览书面确认的一项，确认单须明确写出包含仙女山门票，还是芙蓉洞门票及索道套票；两者仅含其一，不同时包含。结束后乘车返回重庆，当晚入住重庆。",
        "우룽 호텔에서 체크아웃하고 수하물은 전용 차량에 싣습니다. D4에는 서면으로 확정된 한 곳만 방문하며, 확인서에 선녀산 입장권 또는 부용동 입장권·케이블카 패키지 중 무엇이 포함되는지 명시합니다. 둘 중 하나만 포함하며 두 항목을 모두 포함하지 않습니다. 이후 차량으로 충칭에 돌아와 마지막 밤을 보냅니다.",
      ),
    ),
    day(
      5,
      l("Depart Chongqing", "重庆返程", "충칭 출발"),
      l(
        "Check out of the Chongqing hotel and travel with your luggage by private vehicle to the confirmed airport or railway station. No guide or fixed sightseeing is planned, preserving a practical departure buffer.",
        "从重庆酒店退房，行李随行，由私车送往已确认的机场或车站。当天不安排导游和固定景点，为返程保留实际缓冲。",
        "충칭 호텔에서 체크아웃하고 수하물과 함께 전용 차량으로 확정된 공항 또는 기차역에 이동합니다. 이날은 가이드와 고정 관광을 넣지 않아 출발에 필요한 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Three nights in Chongqing and one in Wulong, in breakfast-included Ctrip 4-Diamond–rated rooms. The published 2- and 4-traveller tiers are based on twin sharing; other room arrangements are confirmed manually.",
    "重庆 3 晚 + 武隆 1 晚，均为携程 4 钻双标含早；页面公开的 2 人和 4 人档默认两人一间，其他人数的房间配置须人工确认。",
    "충칭 3박과 우룽 1박 모두 중국 씨트립 기준 4다이아 등급 호텔과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 수동으로 확인합니다.",
  ),
  serviceNote: l(
    "Private transfers on Days 1 and 5, with an English guide and private vehicle on Days 2–4. The current Three Natural Bridges standard admission includes the official transfer bus and Tianlong revolving elevator. The exit battery car and glass viewing platform are included only when written in the confirmation. Day 4 includes either the Fairy Mountain admission ticket or the Furong Cave admission-and-ropeway package, as named in the confirmation. No shopping stops.",
    "D1/D5 司机接送，D2–D4 英语导游与重庆—武隆段私车。天生三桥当前标准票包含官方中转车和天龙旋梯；出口电瓶车、玻璃眺台仅在确认单写明时包含。D4 确认单须明确包含仙女山门票，还是芙蓉洞门票及索道套票。全程无购物店安排。",
    "D1·D5 픽업·샌딩, D2~D4 영어 가이드와 충칭~우룽 전용 차량이 포함됩니다. 천생삼교의 현재 표준 입장권에는 공식 환승버스와 톈룽 회전 엘리베이터가 포함됩니다. 출구 전동카트와 유리 전망대는 확인서에 적힌 경우에만 포함됩니다. D4 확인서에는 선녀산 입장권 또는 부용동 입장권·케이블카 패키지 중 무엇이 포함되는지 명시합니다. 쇼핑 일정은 없습니다.",
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
        "离开重庆密集的立体城市后，用武隆峡谷进入更安静的自然段落。",
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
          "The photograph identifies one common arrival gateway; the actual airport or railway-station pickup is confirmed for the booking.",
          "照片展示一个常见到达口；实际机场或车站接送按订单确认。",
          "사진은 대표적인 도착 관문 하나를 보여 주며, 실제 공항 또는 역 픽업은 예약별로 확정합니다.",
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
          "The photograph makes the train-through-building relationship and Chongqing's vertical street levels visible; it does not prove a current timetable or viewing-platform access.",
          "照片清楚呈现轻轨穿楼与重庆的立体街道高差；不代表当前班次或观景平台开放情况。",
          "사진은 열차가 건물을 통과하는 구조와 충칭의 입체적인 도로 높이 차를 보여 주며, 현재 시간표나 전망대 이용 가능 여부를 증명하지 않습니다.",
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
          "The photograph identifies Wulong's natural-bridge landscape; weather, shuttle and walking conditions are confirmed for the visit.",
          "照片确认的是武隆天生三桥地貌；天气、景交与步行条件按实际游览确认。",
          "사진은 우룽 천생삼교 지형을 보여 주며, 날씨와 셔틀, 보행 조건은 방문 시점에 확인합니다.",
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
          "Chongqing East is one possible rail gateway; the actual station or airport transfer is confirmed for each booking.",
          "重庆东站只是可能的铁路返程节点之一；实际车站或机场接送按订单确认。",
          "충칭동역은 가능한 철도 출발 관문 중 하나이며, 실제 역 또는 공항 이동은 예약별로 확정합니다.",
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
      [11590, 7190],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-08-31",
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
        "Meet the driver at the confirmed Guilin airport or railway station and travel with your luggage by private vehicle to the Guilin hotel. No guide or fixed sightseeing is planned; settle in and stay overnight in Guilin.",
        "在已确认的桂林机场或车站与司机会合，行李随行，乘私车前往桂林酒店。当天不安排导游和固定景点；安顿后入住桂林。",
        "확정된 구이린 공항 또는 기차역에서 기사를 만나 수하물과 함께 전용 차량으로 구이린 호텔에 이동합니다. 이날은 가이드와 고정 관광을 넣지 않으며 구이린에서 숙박합니다.",
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
        "Check out of the Guilin hotel and take the confirmed transfer to the confirmed Li River pier. Board the cruise to Yangshuo while your luggage travels separately by road under the written handover plan; after disembarking, continue to the confirmed Yangshuo hotel and stay there overnight.",
        "从桂林酒店退房，按已确认接驳前往已确认的漓江码头并乘船前往阳朔。行李按书面交接方案另车转运；下船后继续前往已确认的阳朔酒店，当晚入住阳朔。",
        "구이린 호텔에서 체크아웃하고 확정된 차량으로 확정된 리강 선착장에 이동해 양숴행 유람선에 탑승합니다. 수하물은 서면 인계 계획에 따라 별도 차량으로 운송하며, 하선 후 확정된 양숴 호텔로 이동해 숙박합니다.",
      ),
    ),
    day(
      3,
      l("Yangshuo countryside", "阳朔乡村慢游", "양숴 전원 풍경"),
      l(
        "Start from the Yangshuo hotel with the guide and local private transport for the Yulong River countryside. Follow the confirmed gentle route and include either the selected simple family activity or light cycling arrangement, then return to the same Yangshuo hotel for the second night.",
        "从阳朔酒店出发，由导游和当地私车衔接遇龙河沿线乡村路线；按已确认的轻松节奏安排一项基础家庭体验或轻骑行，结束后返回同一家阳朔酒店，入住第二晚。",
        "양숴 호텔에서 가이드와 현지 전용 차량으로 위룽허 전원 지역에 이동합니다. 확정된 여유로운 동선에 따라 간단한 가족 체험 또는 가벼운 자전거 일정 중 선택된 한 가지를 진행하고, 같은 양숴 호텔로 돌아와 두 번째 밤을 보냅니다.",
      ),
    ),
    day(
      4,
      l("Return to Guilin", "返回桂林", "구이린 귀환"),
      l(
        "Check out of the Yangshuo hotel and keep your luggage in the private vehicle for the road journey back to Guilin. Visit the confirmed choice of Reed Flute Cave or Elephant Trunk Hill—only one is included—then check in at the Guilin hotel for the final night.",
        "从阳朔酒店退房，行李随私车返回桂林。游览已书面确认的芦笛岩或象鼻山其中一项，仅包含一项；之后入住桂林酒店，住最后一晚。",
        "양숴 호텔에서 체크아웃하고 수하물을 전용 차량에 실어 구이린으로 돌아갑니다. 서면으로 확정된 노적암 또는 상비산 중 한 곳만 방문한 뒤 구이린 호텔에 체크인해 마지막 밤을 보냅니다.",
      ),
    ),
    day(
      5,
      l("Depart Guilin", "桂林返程", "구이린 출발"),
      l(
        "Check out of the Guilin hotel and travel with your luggage by private vehicle to the confirmed airport or railway station. No guide or fixed sightseeing is planned, leaving room for the confirmed departure.",
        "从桂林酒店退房，行李随行，由私车送往已确认的机场或车站。当天不安排导游和固定景点，为已确认的返程时间留出余量。",
        "구이린 호텔에서 체크아웃하고 수하물과 함께 전용 차량으로 확정된 공항 또는 기차역에 이동합니다. 이날은 가이드와 고정 관광을 넣지 않아 확정된 출발 일정에 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Two breakfast-included Ctrip 4-Diamond–rated nights in Guilin and two in Yangshuo. The published 2- and 4-traveller tiers are based on twin sharing; other room arrangements are confirmed manually.",
    "桂林 2 晚 + 阳朔 2 晚，均为携程 4 钻双标含早；页面公开的 2 人和 4 人档默认两人一间，其他人数的房间配置须人工确认。",
    "구이린 2박과 양숴 2박 모두 중국 씨트립 기준 4다이아 등급 호텔과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 수동으로 확인합니다.",
  ),
  serviceNote: l(
    "Private transfers on Days 1 and 5 and an English guide on Days 2–4 are included, together with the Li River cruise, separate cruise-day luggage transfer, private road transport and the listed adult admission for one Day 4 choice. Day 3 includes one simple family activity or gentle-cycling arrangement selected for the group; it is a basic local experience, not a named premium programme or an unconditional bamboo-rafting promise. No shopping stops.",
    "含 D1/D5 司机接送、D2–D4 英语导游、漓江游船、D2 行李转运、行程内私车及 D4 二选一项目中的一项成人基础门票。D3 含一项按客人情况确认的基础家庭体验或轻骑行，属于基础当地体验，不承诺指定品牌、高阶项目或无条件竹筏。全程无购物店安排。",
    "D1·D5 픽업·샌딩, D2~D4 영어 가이드, 리강 유람선, D2 수하물 별도 이동, 전용 차량과 D4 선택 관광지 한 곳의 성인 기본 입장권이 포함됩니다. D3에는 구성원에 맞춰 정하는 간단한 가족 체험 또는 가벼운 자전거 일정 한 가지가 포함되며, 이는 기본 현지 체험으로 특정 프리미엄 프로그램이나 대나무 뗏목을 무조건 보장하지 않습니다. 쇼핑 일정은 없습니다.",
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
        "The Day 2 cruise from Guilin to Yangshuo is included. Your luggage travels separately by road under a written handover plan. The sailing, cabin class, pier and luggage handover are confirmed before payment.",
        "包含D2从桂林到阳朔的漓江游船。行李按书面交接方案另车转运；船班、舱等、码头和行李交接安排会在付款前确认。",
        "D2 구이린에서 양숴로 가는 리강 유람선이 포함됩니다. 수하물은 서면 인계 계획에 따라 별도 차량으로 이동합니다. 선편, 좌석 등급, 선착장과 수하물 인계는 결제 전에 확인합니다.",
      ),
    },
    {
      question: l(
        "Why stay two nights in Yangshuo, and does the route include Longji?",
        "为什么在阳朔连住两晚？包含龙脊梯田吗？",
        "양숴에서 왜 2박하나요? 룽지 계단식 논도 포함되나요?",
      ),
      answer: l(
        "Two consecutive nights leave Day 3 for the Yulong River countryside without another hotel move. This five-day route returns to Guilin and does not include Longji Rice Terraces. Adding Longji would require a fresh review of the route, time and quote.",
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
        "The Li River cruise is included; bamboo-raft upgrades are separate. Day 3 includes one simple family activity or gentle-cycling arrangement selected for your group. Day 4 includes only the confirmed choice of Reed Flute Cave or Elephant Trunk Hill, not both.",
        "包含的是漓江游船，竹筏升级另计。D3含一项按同行者情况确认的基础家庭体验或轻骑行；D4只包含书面确认的芦笛岩或象鼻山其中一项，不是两项都含。",
        "리강 유람선은 포함되지만 대나무 뗏목 업그레이드는 별도입니다. D3에는 일행에 맞춰 정한 간단한 가족 체험 또는 가벼운 자전거 일정 한 가지가 포함됩니다. D4는 서면으로 확정한 노적암 또는 상비산 중 한 곳만 포함됩니다.",
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
      "A real Yulong River countryside scene introduces the slower Yangshuo portion of the route; it does not depict the Li River cruise or promise current rafting operations.",
      "用真实的遇龙河乡村风景呈现阳朔段的慢节奏；这不是漓江游船画面，也不代表当前竹筏一定运营。",
      "실제 위룽허 전원 풍경으로 양숴 일정의 느린 리듬을 보여 줍니다. 리강 유람선 사진이 아니며 현재 뗏목 운항을 보장하지 않습니다.",
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
        "The aerial view explains why the route travels one way by river from Guilin into Yangshuo.",
        "航拍视角直观说明行程为何从桂林沿水路单向进入阳朔。",
        "항공 시점은 왜 구이린에서 양숴까지 한 방향으로 강을 따라 이동하는지 보여 줍니다.",
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
        "桂林的湖畔傍晚为阳朔两晚住宿前后形成首尾呼应。",
        "구이린의 호숫가 저녁 풍경이 양숴 2박 일정의 앞뒤를 연결합니다.",
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
          "This photograph identifies Guilin Railway Station only. It is one possible arrival gateway; airport and other-station pickups are confirmed separately.",
          "照片只展示桂林站。它是可能的到达节点之一；机场或其他车站接送另行确认。",
          "사진은 구이린역만 보여 줍니다. 가능한 도착 관문 중 하나이며, 공항이나 다른 역 픽업은 별도로 확정합니다.",
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
          "The photograph shows the river journey toward Yangshuo; sailing, pier and cabin details are confirmed for the travel date.",
          "照片展示前往阳朔的水路旅程；船班、码头与舱等按实际日期确认。",
          "사진은 양숴로 향하는 강 여정을 보여 주며, 운항편, 선착장과 좌석 등급은 여행 날짜별로 확정합니다.",
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
          "Day 3 uses this countryside setting for one simple family activity or gentle-cycling arrangement; the photograph does not promise bamboo-raft operation.",
          "D3 在这样的乡村环境中安排一项基础家庭体验或轻骑行；照片不代表竹筏一定运营。",
          "D3에는 이런 전원 환경에서 간단한 가족 체험 또는 가벼운 자전거 일정 한 가지를 진행하며, 사진이 뗏목 운항을 보장하지는 않습니다.",
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
          "This photograph illustrates the Elephant Trunk Hill option only. Day 4 includes Reed Flute Cave or Elephant Trunk Hill, and the final choice is written into the confirmation.",
          "照片只展示象鼻山选项。D4 包含芦笛岩或象鼻山其中一项，最终选择会写入确认单。",
          "이 사진은 상비산 선택지를 보여 줍니다. D4에는 노적암 또는 상비산 중 한 곳이 포함되며, 최종 선택은 확인서에 명시합니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage(
      "standard-guided",
      standardLabel,
      standardSummary,
      [11490, 7190],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-09-05",
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
    "只在明确冰雪窗口内安排",
    "기간이 정해진 겨울 여행",
  ),
  lede: l(
    "Experience Harbin's winter architecture, frozen river activities and Ice and Snow World with heated private transport and an itinerary timed for daylight and the night display.",
    "在明确冰雪季窗口内，用暖风车辆衔接城市建筑、松花江冰雪体验与冰雪大世界夜景。",
    "정해진 빙설 시즌에 난방 전용 차량으로 도심 건축, 쑹화강 체험과 빙설대세계 야경을 연결합니다.",
  ),
  summary: l(
    "Four breakfast-included nights, heated private transport and three English-guided touring days. The displayed price applies only to Sunday–Thursday check-ins within the stated date window, excluding holidays and peak Ice Festival weekends.",
    "哈尔滨冰雪季携程 4 钻含早住宿 4 晚，D2–D4 英语导游与暖风车辆。基础价仅适用于下方日期窗口内周日至周四入住的非节假日。",
    "하얼빈에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식, D2~D4 영어 가이드와 난방 차량이 포함됩니다. 기본가는 아래 기간 중 일~목요일 체크인과 비공휴일에만 적용됩니다.",
  ),
  highlights: lists(
    [
      "Central Street and Saint Sophia exterior",
      "Frozen Songhua River experiences",
      "Volga Manor or one specifically named alternative, confirmed before payment",
      "Ice and Snow World from afternoon into evening",
    ],
    [
      "中央大街与圣索菲亚教堂外观",
      "松花江冰雪体验",
      "伏尔加庄园或另一项付款前书面列名的冬季文化项目",
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
        "Meet the driver at the confirmed Harbin airport or railway station and travel with your luggage in the winter-ready private vehicle to the Harbin hotel. No guide or fixed sightseeing is planned; use the remaining time to settle in and stay overnight in Harbin.",
        "在已确认的哈尔滨机场或车站与司机会合，行李随行，乘冬季车辆前往哈尔滨酒店。当天不安排导游和固定景点，余下时间用于安顿与适应；当晚入住哈尔滨。",
        "확정된 하얼빈 공항 또는 기차역에서 기사를 만나 수하물과 함께 겨울 운행 전용 차량으로 하얼빈 호텔에 이동합니다. 이날은 가이드와 고정 관광을 넣지 않고 남은 시간에 쉬며 적응한 뒤 하얼빈에서 숙박합니다.",
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
        "Start from the Harbin hotel with the English-speaking guide and heated private vehicle. Visit the exterior of Saint Sophia Cathedral and Central Street, then use only a named, managed Songhua River ice-and-snow activity that its operator confirms open that day. Never enter unmanaged river ice. Return to the same Harbin hotel.",
        "从哈尔滨酒店出发，由英语导游和暖风车辆先游览圣索菲亚教堂外观与中央大街，随后只参加书面列名、由正规机构管理且经运营方确认当天开放的松花江冰雪项目；不得自行进入未管理冰面。结束后返回同一家哈尔滨酒店。",
        "하얼빈 호텔에서 영어 가이드와 난방 전용 차량으로 출발해 성 소피아 성당 외관과 중앙대가를 둘러봅니다. 이후 이름이 서면에 명시되고 정식으로 관리되며 운영자가 당일 개장을 확인한 쑹화강 빙설 프로그램만 이용합니다. 관리되지 않는 강 얼음 위에는 들어가지 않습니다. 일정 후 같은 하얼빈 호텔로 돌아옵니다.",
      ),
    ),
    day(
      3,
      l("Winter culture day", "冬季文化项目", "겨울 문화 일정"),
      l(
        "Start from the Harbin hotel and travel by heated private vehicle. Day 3 is not sold as an unnamed 'comparable programme': before payment, the written confirmation must name Volga Manor and one specific alternative winter-culture programme, and you choose one of those two. After the confirmed visit, return to the same Harbin hotel.",
        "从哈尔滨酒店出发，乘暖风车辆前往当天项目。D3 不以未列名的“同等级项目”作为已售内容：付款前的书面确认必须列明“伏尔加庄园”和另一项具体冬季文化项目，客人从这两项中选择一项；游览后返回同一家哈尔滨酒店。",
        "하얼빈 호텔에서 난방 전용 차량으로 출발합니다. D3는 이름 없는 '동급 프로그램'으로 판매하지 않습니다. 결제 전 서면 확인서에 볼가장원과 다른 하나의 구체적인 겨울 문화 프로그램을 모두 명시하고, 두 항목 중 하나를 선택합니다. 확정된 방문 후 같은 하얼빈 호텔로 돌아옵니다.",
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
        "Leave the Harbin hotel with the guide and heated private vehicle. Follow the written choice of the Snow Sculpture Expo or a relaxed morning, then continue to the confirmed Ice and Snow World visit from afternoon into evening and return by vehicle to the same hotel for the final night.",
        "从哈尔滨酒店出发，由导游和暖风车辆衔接当天安排。按书面确认选择雪博会或轻松上午，随后于下午至夜间游览已确认开放的冰雪大世界，结束后乘车返回同一家酒店，入住最后一晚。",
        "하얼빈 호텔에서 가이드와 난방 전용 차량으로 출발합니다. 서면으로 확정된 눈조각박람회 또는 여유로운 오전 중 하나를 진행한 뒤 오후부터 저녁까지 확정된 빙설대세계 일정으로 이어가고, 차량으로 같은 호텔에 돌아와 마지막 밤을 보냅니다.",
      ),
    ),
    day(
      5,
      l("Depart Harbin", "哈尔滨返程", "하얼빈 출발"),
      l(
        "Check out of the Harbin hotel and travel with your luggage in the winter-ready private vehicle to the confirmed airport or railway station. No guide or fixed sightseeing is planned, preserving the departure buffer.",
        "从哈尔滨酒店退房，行李随行，乘冬季车辆前往已确认的机场或车站。当天不安排导游和固定景点，为返程保留实际缓冲。",
        "하얼빈 호텔에서 체크아웃하고 수하물과 함께 겨울 운행 전용 차량으로 확정된 공항 또는 기차역에 이동합니다. 이날은 가이드와 고정 관광을 넣지 않아 출발에 필요한 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four nights in a breakfast-included Ctrip 4-Diamond–rated Harbin hotel during the stated ice-and-snow window. The published 2- and 4-traveller tiers are based on twin sharing; other room arrangements are confirmed manually.",
    "明确冰雪窗口内哈尔滨 4 晚携程 4 钻双标含早；页面公开的 2 人和 4 人档默认两人一间，其他人数的房间配置须人工确认。",
    "명시된 빙설 기간 동안 하얼빈의 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 수동으로 확인합니다.",
  ),
  serviceNote: l(
    "Winter arrival and departure transfers, a heated private vehicle and English guide on Days 2–4, listed adult admission tickets, hot water, headsets and basic heat patches are included. These aids do not replace professional cold-weather clothing, insulated snow boots, gloves and face protection. No shopping stops.",
    "含 D1/D5 冬季车辆接送，D2–D4 英语导游与暖风车辆，行程所列成人基础门票、预约、热水、耳麦与基础暖贴；这些用品不能替代专业防寒服、保暖雪地靴、手套和面部防护。全程无购物店安排。",
    "D1·D5 겨울 차량 픽업·샌딩, D2~D4 영어 가이드와 난방 차량, 일정에 명시된 성인 기본 입장권, 온수, 수신기와 기본 핫팩이 포함됩니다. 이러한 보조품은 전문 방한복, 보온 방한화, 장갑과 얼굴 보호 장비를 대신하지 않습니다. 쇼핑 일정은 없습니다.",
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
    "Harbin winter temperatures can fall below −20°C. Wear professional cold-weather clothing, insulated snow boots, gloves and face protection. Outdoor sessions may be shortened or cancelled because of wind chill, ice conditions or an operator safety decision. Heated vehicles, hot water and basic heat patches are supplements, not replacements. On the Songhua River, use only a named, managed activity that its operator confirms open that day; never enter unmanaged river ice. The published per-person starting prices cover groups of 2 and 4 travellers, exclude flights and apply only to check-ins from 6 January to 5 February 2027, Sunday through Thursday, on non-holiday dates after the main ice attractions have opened. Other group sizes require manual confirmation. Friday or Saturday stays, Christmas, New Year, Spring Festival, major Ice Festival weekends, or different operating dates require a new quote.",
    "哈尔滨冬季可能出现 −20°C 以下严寒，请穿专业防寒服、保暖雪地靴、手套并做好面部防护。室外项目可能因风寒、冰面状态或运营方安全决定缩短或取消；暖风车辆、热水和基础暖贴只能辅助，不能替代专业防寒装备。松花江冰上项目只参加书面列名、由正规机构管理且经运营方确认当天开放的项目，不得自行进入未管理冰面。页面仅公开 2 人和 4 人的每人起价，往返机票另计；其他人数须人工确认。该价格仅适用于 2027 年 1 月 6 日至 2 月 5 日、周日至周四入住、核心冰雪景区已开放的非节假日。周五/周六、圣诞、元旦、春节、冰雪节重点周末，或景区实际开放日期变化，均须重新报价。",
    "하얼빈 겨울에는 영하 20°C 이하의 한파가 올 수 있습니다. 전문 방한복, 보온 방한화, 장갑과 얼굴 보호 장비를 착용하세요. 체감온도, 빙면 상태 또는 운영자의 안전 판단에 따라 야외 일정이 단축되거나 취소될 수 있습니다. 난방 차량, 온수와 기본 핫팩은 보조 수단일 뿐 전문 방한 장비를 대신하지 않습니다. 쑹화강에서는 이름이 서면에 명시되고 정식으로 관리되며 운영자가 당일 개장을 확인한 프로그램만 이용하고, 관리되지 않는 강 얼음 위에는 들어가지 마세요. 공개된 항공권 제외 1인 시작가는 2명과 4명 기준이며, 그 외 인원은 수동 확인이 필요합니다. 이 가격은 주요 빙설 관광지가 개장한 뒤인 2027년 1월 6일~2월 5일, 일~목요일 체크인, 비공휴일에만 적용됩니다. 금·토요일 숙박, 크리스마스, 신정, 춘절, 빙설제 핵심 주말 또는 개장일 변경 시 반드시 재견적이 필요합니다.",
  ),
  heroImage: image(
    "/images/tours/harbin-winter-5-day-private-tour/hero-ice-world-1600.webp",
    l(
      "A colourful ice train and illuminated ice buildings at Harbin Ice and Snow World in 2026",
      "2026 年哈尔滨冰雪大世界的彩色冰火车与亮灯冰建筑",
      "2026년 하얼빈 빙설대세계의 화려한 얼음 기차와 조명 건축",
    ),
    l(
      "Harbin's winter program is built around confirmed attraction opening dates.",
      "哈尔滨冰雪行程必须以景区实际开放为前提。",
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
          "The itinerary visits the exterior; snow, lighting and interior access are not promised for the travel date.",
          "行程游览教堂外观；不承诺出行日期一定有积雪、亮灯或开放内部。",
          "일정은 성당 외관을 둘러보며 여행일의 적설, 조명이나 내부 개방은 보장하지 않습니다.",
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
          "The photograph identifies Harbin Railway Station; an airport departure follows the confirmed flight instead.",
          "照片展示哈尔滨站；如乘飞机返程，则按确认航班送往机场。",
          "사진은 하얼빈역을 보여 주며 항공편 이용 시에는 확정된 항공편에 맞춰 공항으로 이동합니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage(
      "standard-guided-winter",
      standardLabel,
      standardSummary,
      [12990, 9290],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-08-31",
};

const shanghaiSuzhou: PrivateTourProduct = {
  id: "private-tour-shanghai-suzhou-5d4n",
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
        "Meet the English-speaking guide and private driver at the confirmed Shanghai airport and travel with your luggage to the Shanghai hotel. If the arrival leaves a usable half-day, the guide provides only the arrival assistance or orientation written into the confirmation; after a late arrival, pickup and check-in take priority and no fixed sightseeing is forced in. Stay at the same Shanghai hotel for all four nights.",
        "在已确认的上海机场与英语导游和司机会合，行李随行，乘私车前往上海酒店。如果抵达后仍有可用半天，仅执行确认单写明的抵达协助或导览；如抵达较晚，则以接机和协助入住为主，不强行加入固定景点。全程 4 晚入住同一家上海酒店。",
        "확정된 상하이 공항에서 영어 가이드와 기사를 만나 수하물과 함께 전용 차량으로 상하이 호텔에 이동합니다. 도착 후 반나절을 사용할 수 있을 때에만 확인서에 적힌 도착 지원 또는 안내를 진행하며, 늦게 도착하면 픽업과 체크인을 우선하고 고정 관광을 억지로 넣지 않습니다. 4박 모두 같은 상하이 호텔에 머뭅니다.",
      ),
    ),
    day(
      2,
      l("Essential Shanghai", "上海经典城市日", "상하이 핵심 명소"),
      l(
        "Start from the Shanghai hotel with the English-speaking guide and private vehicle. Visit the Bund, continue along Nanjing Road and to Yu Garden, then finish with the confirmed Shanghai Tower 118th-floor observation-deck visit before returning to the same hotel.",
        "从上海酒店出发，由英语导游和私车先游览外滩，再前往南京路与豫园，最后完成已确认的上海中心 118 层“上海之巅”游览；结束后返回同一家酒店。",
        "상하이 호텔에서 영어 가이드와 전용 차량으로 출발합니다. 와이탄, 난징루와 예원을 차례로 둘러보고, 확정된 상하이타워 118층 전망대 방문으로 마친 뒤 같은 호텔로 돌아옵니다.",
      ),
    ),
    day(
      3,
      l(
        "Zhujiajiao and a city choice",
        "朱家角与市区二选一",
        "주자자오와 도심 선택 일정",
      ),
      l(
        "Leave the Shanghai hotel by private vehicle for Zhujiajiao water town. After the confirmed visit, return to central Shanghai for either Tianzifang or, when its exhibition period, opening day, advance reservation and ticket purchase are confirmed, the Shanghai Museum People's Square branch. From 9 July 2026 to 14 November 2027, that branch hosts only the ticketed Ancient Civilizations of the Americas exhibition; the permanent collection is at the East Museum. Only one option is included, then return to the same hotel.",
        "从上海酒店乘私车前往朱家角水乡，完成已确认游览后返回上海市区；再在田子坊与上海博物馆人民广场馆二选一。2026 年 7 月 9 日至 2027 年 11 月 14 日期间，人民广场馆仅开放需购票的“世界树之巅：美洲古代文明大展”，常设展在东馆；须确认展期与开放日并提前预约购票，仅包含一项，结束后返回同一家酒店。",
        "상하이 호텔에서 전용 차량으로 주자자오 수향마을에 이동합니다. 확정된 관람 후 도심으로 돌아와 톈쯔팡과 상하이박물관 인민광장관 중 한 곳을 선택합니다. 2026년 7월 9일부터 2027년 11월 14일까지 인민광장관은 유료 ‘아메리카 고대문명 대전’만 운영하고 상설전시는 동관에서 열립니다. 전시 기간과 개관일을 확인하고 사전 예약 및 입장권 구매를 완료해야 하며, 한 곳만 포함한 뒤 같은 호텔로 돌아옵니다.",
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
        "Start from the Shanghai hotel with a private transfer to the confirmed station, then take the confirmed second-class high-speed train to Suzhou. Use the Suzhou transfer to connect the Humble Administrator's Garden, Hanshan Temple and Pingjiang Road in the reservation-compatible order, then return by the confirmed train and private transfer to the same Shanghai hotel.",
        "从上海酒店出发，乘私车前往已确认车站，再乘已确认的高铁二等座前往苏州。抵达后由苏州接驳串联拙政园、寒山寺和平江路，具体先后按预约可执行情况确认；随后乘已确认车次返沪，并由私车接回同一家上海酒店。",
        "상하이 호텔에서 전용 차량으로 확정된 역에 이동한 뒤 확정된 2등석 고속열차로 쑤저우에 갑니다. 현지 차량으로 졸정원, 한산사와 핑장루를 예약 가능한 순서로 연결하고, 확정된 열차와 상하이 전용 차량으로 같은 호텔에 돌아옵니다.",
      ),
    ),
    day(
      5,
      l("Depart Shanghai", "上海返程", "상하이 출발"),
      l(
        "Check out of the Shanghai hotel and travel with your luggage by private vehicle to the confirmed airport. No guide or fixed sightseeing is planned, leaving room for check-out, city traffic and the confirmed flight.",
        "从上海酒店退房，行李随行，由私车送往已确认的机场。当天不安排导游和固定景点，为退房、城市交通和已确认航班保留余量。",
        "상하이 호텔에서 체크아웃하고 수하물과 함께 전용 차량으로 확정된 공항에 이동합니다. 이날은 가이드와 고정 관광을 넣지 않아 체크아웃, 도심 교통과 확정된 항공편에 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four nights in one breakfast-included Ctrip 4-Diamond–rated Shanghai hotel. The published 2- and 4-traveller tiers are based on twin sharing; other room arrangements are confirmed manually.",
    "上海 4 晚同一家携程 4 钻酒店双标含早；页面公开的 2 人和 4 人档默认两人一间，其他人数的房间配置须人工确认。",
    "상하이 한 곳의 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 수동으로 확인합니다.",
  ),
  serviceNote: l(
    "Arrival pickup with a half-day English guide, guided touring on Days 2–4, departure transfer on Day 5, private road transport, station transfers, second-class rail and listed adult admission tickets are included. No shopping stops.",
    "含 D1 接机与英语导游半天、D2–D4 英语导游、D5 司机送机；行程内私车、车站接送、上海—苏州高铁二等座往返及行程所列成人基础门票，全程无购物店安排。",
    "D1 반일 영어 가이드 공항 영접, D2~D4 가이드 일정, D5 공항 샌딩, 전용 차량, 역 이동, 쑤저우 왕복 2등석 열차와 성인 기본 입장권이 포함되며 쇼핑 일정은 없습니다.",
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
        "Shanghai's night view is shown as atmosphere, not as a promised cruise or fixed lighting schedule.",
        "上海夜景只用于呈现城市氛围，不代表承诺游船或固定亮灯时间。",
        "상하이 야경은 도시 분위기를 보여 주며, 유람선이나 고정 조명 시간을 보장하지 않습니다.",
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
        "Suzhou Museum is not part of the published route; this licensed photograph introduces Suzhou's contemporary architectural language.",
        "苏州博物馆不在公开行程内；这张有许可的照片只用于呈现苏州的当代建筑语言。",
        "쑤저우박물관은 공개 일정에 포함되지 않으며, 이 라이선스 사진은 쑤저우의 현대 건축 언어를 보여 줍니다.",
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
          "The city view introduces the Shanghai base; the actual airport, arrival time and half-day route are confirmed for each booking.",
          "城市画面用于认识上海住宿基地；实际机场、到达时间与半日路线按订单确认。",
          "도시 풍경은 상하이 숙박 거점을 소개하며, 실제 공항, 도착 시간과 반일 동선은 예약별로 확정합니다.",
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
          "The skyline gives context to the Day 2 route linking the historic Bund with present-day Pudong.",
          "这幅天际线为 D2 从历史外滩走向当代浦东的路线提供城市背景。",
          "이 스카이라인은 D2의 역사적 와이탄과 현대 푸둥을 잇는 동선에 도시 맥락을 더합니다.",
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
          "The real canal scene establishes Zhujiajiao's water-town setting; boat operation and water conditions are not inferred.",
          "真实河道画面用于呈现朱家角水乡环境，不据此承诺游船运营或水位条件。",
          "실제 수로 사진은 주자자오 수향마을의 분위기를 보여 주며, 유람선 운항이나 수위 조건을 보장하지 않습니다.",
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
          "The garden anchors the Suzhou rail day trip; weather, seasonal planting and ticket inventory vary.",
          "拙政园是苏州高铁一日游的核心；天气、时令景观与门票库存会变化。",
          "졸정원은 쑤저우 고속철도 당일 일정의 중심이며, 날씨, 계절 풍경과 입장권 재고는 달라질 수 있습니다.",
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
          "The calm city view closes the stay; the actual airport and transfer time are confirmed from the booked flight.",
          "用安静的城市画面收尾；实际机场与送机时间按已订航班确认。",
          "차분한 도시 풍경으로 여정을 마치며, 실제 공항과 이동 시간은 예약된 항공편에 맞춰 확정합니다.",
        ),
      ),
    ),
  ],
  packages: [
    standardPackage(
      "standard-guided",
      standardLabel,
      standardSummary,
      [9490, 6490],
    ),
  ],
  datePublished: PUBLISHED,
  dateModified: "2026-08-31",
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
      "Tiananmen Square and the Forbidden City (subject to confirmed real-name reservations)",
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
        "Meet the driver at the confirmed Beijing airport and travel with your luggage by private vehicle to the Beijing hotel. No fixed sightseeing is planned, leaving room for the airport transfer and check-in; settle in and stay overnight in Beijing.",
        "在已确认的北京机场与司机会合，行李随行，乘私车前往北京酒店。当天不安排固定景点，为机场接送与入住留出余量；安顿后入住北京。",
        "확정된 베이징 공항에서 기사를 만나 수하물과 함께 전용 차량으로 베이징 호텔에 이동합니다. 이날은 고정 관광을 넣지 않아 공항 이동과 체크인에 여유를 두며 베이징에서 숙박합니다.",
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
        "Start from the Beijing hotel by private vehicle. Visit the Temple of Heaven and then the Summer Palace in the confirmed reservation-compatible order, with the selected guided or no-guide service applying throughout; return to the same Beijing hotel.",
        "从北京酒店乘私车出发，按已确认预约可执行的顺序游览天坛公园与颐和园；全日按客人选择的含英语导游或无导游版本执行，结束后返回同一家北京酒店。",
        "베이징 호텔에서 전용 차량으로 출발합니다. 확정된 예약에 맞는 순서로 천단공원과 이화원을 둘러보며, 선택한 영어 가이드 포함 또는 무가이드 서비스가 이날 전체에 적용됩니다. 관광 후 같은 베이징 호텔로 돌아옵니다.",
      ),
    ),
    day(
      3,
      l("Imperial Beijing", "皇城北京", "황실 베이징"),
      l(
        "Begin from the Beijing hotel before dawn only when the flag-raising plan and required access arrangements are confirmed. After the flag-raising, continue to Tiananmen Square and the Forbidden City only with successful real-name reservations; Prince Kung's Mansion and Shichahai or Houhai follow only when the confirmed reservation windows and the group's pace allow, rather than forcing every stop into the day. Return to the same Beijing hotel.",
        "仅在升旗安排与所需通行条件确认后，才从北京酒店超早出发观看天安门升旗；随后须以实名预约成功为前提游览天安门广场与故宫。恭王府及什刹海或后海仅在已确认预约时段与客人节奏允许时继续安排，不为凑满清单强行赶场；当晚返回同一家北京酒店。",
        "국기 게양 관람 계획과 필요한 출입 조건이 확정된 경우에만 베이징 호텔에서 새벽 전에 출발합니다. 게양식 후 톈안먼광장과 자금성은 실명 예약이 성공한 경우에만 진행하며, 공왕부와 스차하이 또는 허우하이는 확정된 예약 시간과 여행 속도가 허용할 때만 이어가 모든 장소를 억지로 채우지 않습니다. 관광 후 같은 베이징 호텔로 돌아옵니다.",
      ),
    ),
    day(
      4,
      l("Great Wall", "八达岭长城", "만리장성"),
      l(
        "Leave the Beijing hotel by private vehicle for the confirmed Badaling Great Wall visit. After the wall, return toward the city for Olympic Park and exterior views of the Bird's Nest and Water Cube, then continue to the same Beijing hotel for the final night; optional wall transport remains separate unless written into the confirmation.",
        "从北京酒店乘私车前往已确认的八达岭长城，完成长城游览后返回市区方向，再到奥林匹克公园观看鸟巢与水立方外观；随后返回同一家北京酒店，入住最后一晚。长城可选交通除非写入确认单，否则仍为另计。",
        "베이징 호텔에서 전용 차량으로 출발해 확정된 팔달령 만리장성을 둘러봅니다. 이후 도심 방향으로 돌아와 올림픽공원에서 냐오차오와 수이리팡 외관을 본 뒤 같은 베이징 호텔로 돌아와 마지막 밤을 보냅니다. 만리장성의 선택 교통은 확인서에 포함하지 않은 경우 별도입니다.",
      ),
    ),
    day(
      5,
      l("Depart Beijing", "北京返程", "베이징 출발"),
      l(
        "Check out of the Beijing hotel and travel with your luggage by private vehicle to the confirmed airport. No fixed sightseeing is planned, leaving room for check-out, city traffic and the confirmed flight.",
        "从北京酒店退房，行李随行，由私车送往已确认的机场。当天不安排固定景点，为退房、城市交通和已确认航班保留余量。",
        "베이징 호텔에서 체크아웃하고 수하물과 함께 전용 차량으로 확정된 공항에 이동합니다. 이날은 고정 관광을 넣지 않아 체크아웃, 도심 교통과 확정된 항공편에 여유를 둡니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Four nights in a breakfast-included Ctrip 4-Diamond–rated Beijing hotel, based on twin sharing. Final hotel, room arrangement and any single supplement are confirmed for each booking.",
    "北京 4 晚携程 4 钻酒店双标含早，基础口径为两人一间；具体酒店、房间配置与单房差按订单确认。",
    "베이징에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함되며 2인 1실 기준입니다. 최종 호텔, 객실 구성과 1인실 추가금은 예약별로 확정합니다.",
  ),
  serviceNote: l(
    "Both versions include private airport transfers, private vehicles on the three touring days, listed adult admission tickets, booking support, liability cover and drinking water. The no-guide version has no on-site interpretation; help is provided remotely. No shopping stops.",
    "两个版本均含接送机、3 个游览日私车、行程所列成人基础门票、预约支持、责任险与车上水。无导游版现场没有讲解服务，仅提供远程支持。全程无购物店安排。",
    "두 버전 모두 공항 이동, 3일 전용 차량, 일정에 명시된 성인 기본 입장권, 예약 지원, 책임보험과 생수가 포함됩니다. 무가이드 버전은 현장 해설 없이 원격 지원만 제공되며 쇼핑 일정은 없습니다.",
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
        "The guided version includes an English-speaking guide on Days 2–4. The no-guide version keeps private transport, listed adult admissions, reservations and remote support, with no on-site guide or interpretation. Days 1 and 5 are private driver transfers in both versions.",
        "英语导游版在D2–D4由英语导游陪同；无导游版保留私车、所列成人基础门票、预约和远程支持，但没有现场导游或讲解。两个版本的D1和D5均为司机接送。",
        "영어 가이드 포함 버전은 D2~D4에 영어 가이드가 동행합니다. 미포함 버전도 전용 차량, 명시된 성인 기본 입장권, 예약과 원격 지원은 포함하지만 현장 가이드나 해설은 없습니다. 두 버전 모두 D1과 D5는 기사 픽업·샌딩입니다.",
      ),
    },
    {
      question: l(
        "Which Great Wall section is included, and are cable cars covered?",
        "去八达岭还是慕田峪？包含长城索道吗？",
        "어느 만리장성 구간을 방문하나요? 케이블카도 포함되나요?",
      ),
      answer: l(
        "The published route visits Badaling, not Mutianyu. Great Wall cable cars, slide rail and shuttle buses are excluded from the base price. Any optional wall transport must be written into the confirmation to be included.",
        "这条路线去八达岭，不去慕田峪。长城索道、滑车和摆渡车不在基础价格内；可选长城交通只有写入确认方案后才计入服务。",
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
        "No. Visits depend on successful real-name reservations. We reconfirm availability for your dates before payment; the confirmed reservation windows and your group's pace determine which other stops can fit on that day.",
        "不能保证，参观以实名预约成功为前提。付款前会按实际日期再次确认可订情况；当天还能衔接哪些其他景点，要看已确认的预约时段和同行者节奏。",
        "보장되지는 않습니다. 실명 예약에 성공해야 방문할 수 있으며, 결제 전에 실제 날짜의 예약 가능 여부를 다시 확인합니다. 같은 날 다른 명소를 얼마나 둘러볼지는 확정된 예약 시간과 일행의 여행 속도에 따라 달라집니다.",
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
      "베이징의 황실 유적과 만리장성을 위한 5일.",
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
        "The palace photograph sets the imperial-city context; entry still depends on successful real-name reservation.",
        "故宫画面用于呈现皇城环境；入内仍须以实名预约成功为前提。",
        "궁궐 사진은 황실 도시의 맥락을 보여 주며, 입장은 실명 예약 성공을 전제로 합니다.",
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
        "A street-level view complements the capital's monumental architecture without claiming a specific booked stop.",
        "街巷尺度补充北京宏大地标之外的城市生活，不把画面标成某个已预订景点。",
        "골목의 시선은 베이징의 거대한 유적과 다른 도시 생활을 보여 주며, 특정 예약 장소로 단정하지 않습니다.",
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
          "The city view introduces the arrival night; the actual airport and hotel transfer are confirmed for each booking.",
          "城市夜景用于呈现抵达北京的第一晚；实际机场与酒店接送按订单确认。",
          "도시 야경은 베이징 도착 첫날을 보여 주며, 실제 공항과 호텔 이동은 예약별로 확정합니다.",
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
          "The photograph identifies the Hall of Prayer for Good Harvests, not an entrance gate or a guaranteed internal route.",
          "照片展示的是天坛祈年殿，不代表具体入园门或保证固定内部路线。",
          "사진은 천단공원 기년전을 보여 주며, 입장 문이나 고정 내부 동선을 보장하지 않습니다.",
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
          "The corridor shows the palace at walking scale; Tiananmen and Forbidden City admission still depend on successful advance reservation.",
          "宫廊画面呈现步行游览时的故宫尺度；天安门与故宫仍须以实名预约成功为前提。",
          "회랑은 걸어서 마주하는 궁궐의 규모를 보여 주며, 톈안먼과 자금성 입장은 사전 실명 예약 성공을 전제로 합니다.",
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
          "The photograph does not identify this section as Badaling. The itinerary's Badaling reservation, access and attraction transport are confirmed separately.",
          "照片不把这段长城标成八达岭；行程中的八达岭预约、入园与景交另行确认。",
          "사진 속 구간을 팔달령으로 특정하지 않습니다. 일정의 팔달령 예약, 입장과 관광지 이동은 별도로 확정합니다.",
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
          "Historic and modern Beijing share the final frame; the actual airport and transfer time follow the booked flight.",
          "用古今北京同框为行程收尾；实际机场与送机时间按已订航班确认。",
          "역사와 현대의 베이징이 한 장면에 담기며, 실제 공항과 이동 시간은 예약된 항공편에 맞춥니다.",
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
        "An English-speaking guide accompanies Days 2–4; Days 1 and 5 are private driver transfers.",
        "D2–D4 英语导游陪同，D1/D5 为司机接送。",
        "D2~D4 영어 가이드 동행, D1·D5는 기사 픽업·샌딩입니다.",
      ),
      [7302, 4806],
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
  dateModified: "2026-09-05",
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
    "장자제 국립삼림공원 4일 고정 코스 프라이빗 투어",
  ),
  metadataTitle: l(
    "Zhangjiajie National Forest Park: 4-Day Private Tour",
    "张家界森林公园4天私家团：固定徒步路线",
    "장자제 국립삼림공원 3박 4일 프라이빗 투어",
  ),
  metadataDescription: l(
    "Four-day fixed-route private tour of Zhangjiajie National Forest Park, with two walking days and one villa base. No cable cars or elevators.",
    "张家界森林公园4天3晚固定路线私家团：两个步行游览日、三晚同住一处指定别墅，含行程私车、D2全天和D3白天英语导游。不乘索道和电梯，不含玻璃桥与天门山。",
    "장자제 국립삼림공원 3박 4일 고정 코스 프라이빗 투어. 이틀간 도보 관광과 한 빌라 3박으로 구성됩니다. 케이블카·엘리베이터를 이용하지 않으며 유리다리·톈먼산은 포함하지 않습니다.",
  ),
  eyebrow: l(
    "Same designated villa for 3 nights · Two walking forest days · No cable cars or elevators",
    "三晚连住指定别墅 · 两天徒步森林公园 · 不乘索道与天梯",
    "지정 빌라 3박 연박 · 이틀간 산림 도보 탐방 · 케이블카 및 엘리베이터 미이용",
  ),
  lede: l(
    "A lower-priced private route for travellers who want Zhangjiajie’s forest landscapes without cable cars, elevators or last-minute add-ons. Stay in the same Country Garden villa for all three nights, use the north gate for the high peaks, then walk the east-gate valleys before an evening at Seventy-Two Wonder Tower.",
    "这是一条不坐索道、电梯，也不靠临时加项抬价的张家界低价私家路线。三晚固定入住同一处碧桂园别墅；第二天从北门看高山峰林，第三天从东门步行溪谷，再夜游七十二奇楼。",
    "케이블카와 엘리베이터, 현장 추가 옵션 없이 장자제의 산림 풍경을 보는 합리적인 프라이빗 코스입니다. 3박 모두 같은 컨트리 가든 빌라에 머물고, 둘째 날은 북문 산악 코스, 셋째 날은 동문 계곡 산책과 칠십이기루 야경을 이어갑니다.",
  ),
  summary: l(
    "Three nights in a designated Country Garden family villa with breakfast, private station or airport transfers, private transport on the fixed route, an English-speaking guide on Day 2 and during the daytime on Day 3, and the listed adult admissions. The Seventy-Two Wonder Tower evening is self-guided with private drop-off, pickup and remote assistance.",
    "含指定碧桂园家庭别墅 3 晚及早餐、机场或车站接送、固定路线私车、D2 全天与 D3 白天英语导游，以及行程所列成人门票。七十二奇楼夜场为自由活动，含专车送达、夜间接回与远程协助。",
    "지정 컨트리 가든 패밀리 빌라 3박과 조식, 공항·역 픽업 및 샌딩, 고정 일정 전용 차량, D2 종일과 D3 주간 영어 가이드, 명시된 성인 입장권이 포함됩니다. 칠십이기루 야간 관람은 자유 일정이며 전용 차량 왕복과 원격 지원을 제공합니다.",
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
      "북문에서 톈쯔산·양자제·위안자제를 연결",
      "십리화랑을 걸어서 왕복하고 금편계 동쪽 구간 산책",
      "전용 차량 왕복이 포함된 칠십이기루 자유 야간 관람",
      "3박 모두 같은 지정 컨트리 가든 빌라 이용",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive and settle in", "抵达张家界并入住", "장자제 도착 및 체크인"),
      l(
        "Meet the driver at Zhangjiajie Hehua Airport or Zhangjiajie West Railway Station and travel by private vehicle to the designated Country Garden villa. Check in and rest; no scenic-area visit is scheduled. This villa remains the group’s base for all three nights.",
        "司机在张家界荷花机场或张家界西站接客，乘专车前往指定碧桂园别墅。办理入住后休息，当天不安排景区；三晚均以这处别墅为固定住宿，不中途换酒店。",
        "장자제 허화공항 또는 장자제서역에서 기사를 만나 전용 차량으로 지정 컨트리 가든 빌라로 이동합니다. 체크인 후 쉬며 관광지는 넣지 않습니다. 3박 모두 같은 빌라를 거점으로 이용합니다.",
      ),
    ),
    day(
      2,
      l(
        "Tianzi Mountain, Yangjiajie and Yuanjiajie",
        "天子山、杨家界与袁家界",
        "톈쯔산·양자제·위안자제",
      ),
      l(
        "Leave the villa at about 07:45 for Tianzi Mountain North Gate. Use the included scenic shuttles via Sancha Junction to visit Dianjiangtai, the Tianzi Mountain core area, the short Natural Great Wall walk in Yangjiajie, and Yuanjiajie’s main viewpoints before returning by shuttle to the north gate and then by private vehicle to the villa at about 18:30. Allow roughly 10–11 hours door to door and 4–7 km of walking. No cable car or elevator is used; the operating order may change for official closures, last-shuttle times, weather, safety or crowd control without casually removing the listed core stops.",
        "约 07:45 从别墅出发前往天子山北门，使用已含的景区环保车，经三岔口游览点将台、天子山核心区域、杨家界天然长城短线和袁家界主要观景点；随后乘环保车返回北门，再乘专车回别墅，正常约 18:30 抵达。门到门约 10–11 小时，步行约 4–7 公里。当天不乘索道或电梯；如遇官方关闭、末班环保车、天气、安全或限流，执行顺序可以调整，但不会为普通进度随意删减已列核心内容。",
        "07:45경 빌라에서 출발해 톈쯔산 북문으로 이동합니다. 포함된 관광 셔틀을 이용해 싼차 교차점, 뎬장타이, 톈쯔산 핵심 구역, 양자제 천연장성 짧은 산책로와 위안자제 주요 전망대를 둘러본 뒤 북문으로 돌아와 전용 차량으로 18:30경 빌라에 도착합니다. 총 10~11시간, 도보 약 4~7km의 일정입니다. 케이블카와 엘리베이터는 이용하지 않으며, 공식 폐쇄·막차·날씨·안전·혼잡 통제 시 핵심 장소를 임의로 빼지 않는 범위에서 순서를 조정할 수 있습니다.",
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
        "Leave at about 07:30 for the east gate. Walk the open section of Ten-Mile Gallery out and back, take the included shuttle to Water Winding Four Gates, and walk the eastern Golden Whip Stream out and back toward the Tiaoyutan area. After a simple lunch break, visit the World Geopark Museum when open, then return to the villa at about 15:00. At about 17:30, the driver takes the group to Seventy-Two Wonder Tower; explore the regular evening session independently and meet the driver at the agreed point at about 20:30. The English-speaking guide covers the daytime route only; the evening includes private drop-off, pickup and remote assistance. The Ten-Mile Gallery mini-train is not used.",
        "约 07:30 从别墅出发前往东门。十里画廊开放游览段步行往返，再乘已含的环保车前往水绕四门，沿金鞭溪东段步行至跳鱼潭附近后原路返回。简单午餐休息后，在开放时参观世界地质公园博物馆，正常约 15:00 回别墅休息。约 17:30 由司机送往七十二奇楼，普通夜场由客人自由游览，约 20:30 在约定地点会合返回。英语导游只陪同白天路线；夜场含专车送达、接回和远程协助，但没有现场导游。当天不乘十里画廊小火车。",
        "07:30경 동문으로 출발합니다. 십리화랑의 개방 구간을 걸어서 왕복한 뒤 포함된 셔틀로 수요사문에 이동하고, 금편계 동쪽 구간을 도약담 부근까지 왕복 산책합니다. 간단한 점심 휴식 후 운영 중이면 세계지질공원박물관을 관람하고 15:00경 빌라에서 쉽니다. 17:30경 기사가 칠십이기루로 이동시키며, 일반 야간 회차는 자유 관람 후 20:30경 약속 장소에서 다시 만나 돌아옵니다. 영어 가이드는 주간 일정까지만 동행하고 야간에는 전용 차량 왕복과 원격 지원만 제공됩니다. 십리화랑 미니 열차는 이용하지 않습니다.",
      ),
    ),
    day(
      4,
      l("Breakfast and departure", "早餐后从容离开", "조식 후 출발"),
      l(
        "Have breakfast at the villa and rest until the confirmed pickup time. Check out and travel by private vehicle to Zhangjiajie Hehua Airport or Zhangjiajie West Railway Station. No attraction is added on departure day, reducing the risk of a rushed connection.",
        "在别墅用早餐，并按已确认的接送时间自由休息。退房后乘专车前往张家界荷花机场或张家界西站。离开日不再增加景区，避免因游览造成赶车或赶飞机风险。",
        "빌라에서 조식 후 확정된 픽업 시간까지 쉬고 체크아웃합니다. 전용 차량으로 장자제 허화공항 또는 장자제서역에 이동하며, 항공편이나 열차 연결을 서두르지 않도록 출발일에는 관광지를 추가하지 않습니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Three nights in the same designated Country Garden family villa, with breakfast and twin sharing as the base arrangement; the accommodation is not changed during the route. The exact villa unit, bedroom allocation, foreign-guest registration, breakfast arrangement and any single-room difference are confirmed before payment.",
    "三晚固定入住同一处指定碧桂园家庭别墅，基础口径为两人一间并含早餐，行程中不更换住宿。具体别墅单元、卧室分配、外宾登记、早餐安排和单房差均在付款前确认。",
    "3박 모두 같은 지정 컨트리 가든 패밀리 빌라에 머물며 기본은 2인 1실과 조식 포함입니다. 일정 중 숙소를 바꾸지 않으며, 정확한 빌라 동·객실 배정·외국인 숙박 등록·조식과 1인실 차액은 결제 전에 확정합니다.",
  ),
  serviceNote: l(
    "Includes driver transfers on Days 1 and 4, private transport throughout the listed route, an English-speaking guide for all of Day 2 and the daytime route on Day 3, the adult Wulingyuan admission-and-shuttle package with required insurance, and standard evening admission to Seventy-Two Wonder Tower with insurance. The Day 3 evening is self-guided with private drop-off, pickup and remote assistance. No shopping stops.",
    "含 D1/D4 司机接送、行程所列私车、D2 全天及 D3 白天英语导游、成人武陵源门票与环保车联票及必买保险、七十二奇楼普通夜场票及保险。D3 夜场为自由活动，含专车送达、接回和远程协助。全程无购物店安排。",
    "D1·D4 기사 이동, 명시된 일정의 전용 차량, D2 종일 및 D3 주간 영어 가이드, 필수 보험이 포함된 성인 우링위안 입장권·셔틀 패키지, 보험이 포함된 칠십이기루 일반 야간 입장권이 포함됩니다. D3 야간은 자유 관람이며 전용 차량 왕복과 원격 지원을 제공합니다. 쇼핑 일정은 없습니다.",
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
      "백룡 엘리베이터, 톈쯔산 케이블카와 양자제 케이블카",
      "십리화랑 미니 열차 및 포함 항목에 없는 기타 유료 관광지 교통 (우링위안 입장권·셔틀 패키지는 포함)",
      "칠십이기루 야간 현장 가이드",
      "박물관 유료 체험, 별도 공연 및 고정 일정에 명시되지 않은 항목",
    ],
    l(
      "Holiday, unlisted night-time, overtime and other unlisted services; Day 3 Seventy-Two Wonder Tower standard evening admission with insurance, private transfers and remote assistance remain included",
      "节假日、未列夜间、超时及其他未列服务；D3 七十二奇楼普通夜场票及保险、专车往返与远程协助已含",
      "공휴일, 미기재 야간, 초과 시간 및 기타 미기재 서비스. D3 칠십이기루 일반 야간 입장권·보험, 전용 차량 왕복과 원격 지원은 포함",
    ),
  ),
  bookingNote: l(
    "This is a fixed route with no elective attraction swap or last-minute add-on. The exact villa, room plan, vehicle and ticket inventory must be reconfirmed for the selected non-holiday dates before payment. The published per-person starting prices cover groups of 2 and 4 travellers; flights are not included. Other group sizes and all child prices require a manual quote based on age, bed use and vehicle seats.",
    "本产品为固定路线，不设置自选景点，也不在现场临时加项。指定非节假日的别墅、房间分配、车型与票务库存须在付款前再次确认。网页仅公开 2 人和 4 人的每人起价，往返机票另计；其他人数及所有儿童价格均须按年龄、占床和车辆座位人工核价。",
    "이 상품은 관광지 선택 교체나 현장 추가 옵션이 없는 고정 코스입니다. 선택한 비공휴일의 빌라·객실 구성·차량과 입장권 재고는 결제 전에 다시 확인합니다. 공개된 항공권 제외 1인 시작가는 2명과 4명 기준이며, 다른 인원과 모든 아동 요금은 나이·침대 사용·차량 좌석에 따라 별도 견적이 필요합니다.",
  ),
  heroImage: image(
    "/images/tours/zhangjiajie-forest-4-day-private-tour/hero-morning-pillars-1600.jpg",
    l(
      "Layered sandstone pillars in Zhangjiajie National Forest Park",
      "张家界国家森林公园层叠的砂岩峰柱",
      "장자제 국립삼림공원의 겹겹이 이어진 사암 봉우리",
    ),
    l(
      "The fixed route spends its first full touring day among the high forest pillars.",
      "固定路线的第一个完整游览日深入高山峰林。",
      "고정 일정의 첫 종일 관광은 높은 산림 봉우리 지대에서 진행됩니다.",
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
        "장자제 봉우리 사이로 흐르는 안개",
      ),
      l(
        "Visibility and weather change quickly in the mountains; the photograph describes the landscape, not a guaranteed view.",
        "山区能见度与天气变化较快；照片用于呈现地貌，不代表保证出现同样景观。",
        "산악 지역의 날씨와 시야는 빠르게 변하므로 사진은 지형을 보여 줄 뿐 동일한 전망을 보장하지 않습니다.",
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
        "A villa reference image; the exact unit and bedroom allocation are written into the booking confirmation.",
        "此图为别墅资源实拍参考；具体单元与卧室分配以订单确认单为准。",
        "빌라 실제 참고 사진이며 정확한 동과 객실 배정은 예약 확인서에 기재합니다.",
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
          "The same villa base is used for all three nights; the exact room split is confirmed before payment.",
          "三晚均使用同一处别墅住宿；具体房间分配在付款前确认。",
          "3박 모두 같은 빌라를 사용하며 정확한 객실 배정은 결제 전에 확정합니다.",
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
          "장자제 계곡 위로 솟은 가파른 사암 봉우리",
        ),
        l(
          "The photograph represents Day 2’s peak terrain and does not claim a particular viewpoint or viewing order.",
          "照片用于呈现 D2 的峰林地貌，不把画面标成某个具体观景台或固定观看顺序。",
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
          "장자제 계곡의 숲과 물길, 산책로 다리",
        ),
        l(
          "The valley scene introduces the eastern Golden Whip Stream walk; water levels and visibility vary with weather.",
          "溪谷画面用于呈现金鞭溪东段步行环境；水量与能见度会随天气变化。",
          "계곡 풍경은 금편계 동쪽 산책 환경을 보여 주며 수량과 시야는 날씨에 따라 달라집니다.",
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
          "Departure day is left free of sightseeing so the transfer can follow the confirmed flight or train.",
          "离开日不再加景点，接送时间按已确认航班或高铁安排。",
          "출발일에는 관광지를 넣지 않고 확정된 항공편이나 열차에 맞춰 이동합니다.",
        ),
      ),
    ),
  ],
  packages: [
    guidedPackage(
      "fixed-route-english-guided",
      "guided",
      l(
        "Fixed route with English guide",
        "固定路线英语导游版",
        "영어 가이드 포함 고정 코스",
      ),
      l(
        "An English-speaking guide accompanies all of Day 2 and the daytime route on Day 3. The Seventy-Two Wonder Tower evening is self-guided with private drop-off, pickup and remote assistance.",
        "D2 全天与 D3 白天由英语导游陪同；七十二奇楼夜场为自由活动，含专车送达、接回与远程协助。",
        "D2 종일과 D3 주간 일정에는 영어 가이드가 동행합니다. 칠십이기루 야간은 자유 관람이며 전용 차량 왕복과 원격 지원이 포함됩니다.",
      ),
      [4199, 2399],
    ),
  ],
  datePublished: "2026-08-31",
  dateModified: "2026-09-05",
  lastReviewed: "2026-08-31",
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
    ...formatPrivateTourPrice(tier.cnyPerPerson, locale),
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
        const usd = convertCnyToUsd(tier.cnyPerPerson);
        const krw = convertCnyToKrw(tier.cnyPerPerson);
        assertConvertedPriceInvariant(tier.cnyPerPerson, usd, "USD");
        assertConvertedPriceInvariant(tier.cnyPerPerson, krw, "KRW");
      }
    }
  }
  return true;
}
