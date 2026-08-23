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
  title: LocalizedText;
  eyebrow: LocalizedText;
  lede: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedStringList;
  itinerary: readonly PrivateTourDay[];
  hotelNote: LocalizedText;
  serviceNote: LocalizedText;
  exclusions: LocalizedStringList;
  bookingNote: LocalizedText;
  heroImage: PrivateTourImage;
  gallery: readonly PrivateTourImage[];
  routeMedia?: readonly PrivateTourRouteMediaGroup[];
  packages: readonly PrivateTourPackage[];
  datePublished: string;
  dateModified: string;
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
  itinerary: readonly { day: number; title: string; description: string }[];
  hotelNote: string;
  serviceNote: string;
  exclusions: readonly string[];
  bookingNote: string;
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
    throw new RangeError(`CNY price must be a positive finite number; received ${cny}.`);
  }
}

export function assertConvertedPriceInvariant(
  cny: number,
  convertedAmount: number,
  currency: Exclude<PrivateTourCurrency, "CNY">,
): true {
  assertValidCny(cny);
  if (!Number.isFinite(convertedAmount) || convertedAmount <= 0) {
    throw new RangeError(`Converted price must be positive and finite; received ${convertedAmount}.`);
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
  const currency: PrivateTourCurrency = locale === "en" ? "USD" : locale === "ko" ? "KRW" : "CNY";
  const amount = locale === "en" ? convertCnyToUsd(cny) : locale === "ko" ? convertCnyToKrw(cny) : cny;
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

const l = (en: string, zh: string, ko: string): LocalizedText => ({ en, zh, ko });
const lists = (
  en: readonly string[],
  zh: readonly string[],
  ko: readonly string[],
): LocalizedStringList => ({ en, zh, ko });

const prices = ([twoTravellers, fourTravellers]: readonly [number, number]): readonly PrivateTourPriceTier[] => [
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
): PrivateTourPackage => ({ id, guideMode, label, summary, prices: prices(cnyPrices) });

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
): LocalizedStringList =>
  lists(
    [
      "International and domestic flights",
      "Lunches and dinners",
      "Personal travel insurance, visas, tips and personal expenses",
      "Room upgrades or extra single-room requirements",
      "Holiday, late-night, overtime and unlisted services",
      ...extraEn,
    ],
    [
      "国际及国内往返机票",
      "午餐和晚餐",
      "个人旅游意外险、签证、司导小费及个人消费",
      "房型升级或超出基础房间配置的单住需求",
      "节假日、夜间、超时及未列服务",
      ...extraZh,
    ],
    [
      "중국 왕복 및 중국 국내선 항공권",
      "중식과 석식",
      "개인 여행자 보험, 비자, 기사·가이드 팁 및 개인 경비",
      "객실 업그레이드 또는 기본 배정 외 1인실",
      "공휴일, 야간, 초과 시간 및 일정에 없는 서비스",
      ...extraKo,
    ],
  );

const PUBLISHED = "2026-08-23";

const shanghaiSuzhouHangzhou: PrivateTourProduct = {
  id: "private-tour-shanghai-suzhou-hangzhou-6d5n",
  slug: "shanghai-suzhou-hangzhou-6-day-private-tour",
  days: 6,
  nights: 5,
  title: l(
    "Shanghai, Suzhou & Hangzhou: 6-Day Private Tour",
    "上海·苏州·杭州 6 天 5 晚私家团",
    "상하이·쑤저우·항저우 6일 프라이빗 투어",
  ),
  eyebrow: l("Three cities, one seamless route", "一次连走江南三城", "세 도시를 한 번에 잇는 여정"),
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
    ["The Bund and Shanghai skyline", "Classical Suzhou gardens and lanes", "Lingyin Temple and West Lake cruise", "Private intercity planning with luggage handled"],
    ["外滩与陆家嘴城市景观", "苏州古典园林与平江路", "灵隐寺与西湖游船", "跨城交通及行李随车衔接"],
    ["와이탄과 푸둥 스카이라인", "쑤저우 고전 정원과 골목", "링인사와 서호 유람선", "수하물까지 고려한 도시 간 이동"],
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
        "Your private driver meets you at the airport or station and takes you directly to the hotel. We deliberately leave the first day free of fixed sightseeing, protecting the route from arrival delays and giving you time to settle in.",
        "抵达后由私车接机或接站，直接送往上海酒店。首日不安排导游和固定景点，是为了给航班或列车波动、进城与入住留出余量，避免核心游览被到达时间压缩。",
        "공항이나 기차역에서 전용 차량으로 바로 호텔에 이동합니다. 도착 지연과 시내 이동, 체크인에 여유를 두기 위해 첫날에는 고정 관광 일정을 넣지 않아 다음 날부터의 핵심 일정을 지킵니다.",
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
        "Explore Yu Garden or the Old City, Lujiazui and the Bund with an English-speaking guide. Keeping the day in Shanghai lets you understand the historic streets, modern skyline and both sides of the Huangpu without an intercity transfer.",
        "游览豫园或老城厢、陆家嘴与外滩，把上海的历史街区、现代天际线和黄浦江两岸放在同一天理解。英语导游全日陪同，当天不安排跨城移动。",
        "영어 가이드와 예원 또는 구시가지, 루자쭈이와 와이탄을 둘러봅니다. 도시 간 이동 없이 하루를 상하이에 온전히 사용해 옛 거리와 현대 스카이라인, 황푸강 양안을 함께 이해합니다.",
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
        "Finish a half-day of Shanghai sightseeing, then continue to Suzhou for Panmen or Tiger Hill and Shantang Street. The major garden visit stays on the following day, so the transfer day never becomes a checklist.",
        "完成上海半日游览后前往苏州，抵达后在盘门或虎丘中选择一项，再游览山塘街。把主要园林留到第二天，避免转场日塞入过多景点。",
        "상하이 반일 관광 후 쑤저우로 이동해 판먼 또는 후추 중 한 곳과 산탕제를 둘러봅니다. 대표 정원은 다음 날로 남겨 이동일을 무리한 체크리스트로 만들지 않습니다.",
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
        "Visit the Humble Administrator's Garden, Suzhou Museum and Pingjiang Road before continuing to Hangzhou. The route gives Suzhou's garden, collection and lanes real time instead of treating the city as a hurried stopover.",
        "依次游览拙政园、苏州博物馆和平江路，从园林、收藏与街巷理解苏州。完成核心游览后再前往杭州，不把苏州压缩成匆忙的过站。",
        "졸정원, 쑤저우박물관과 핑장루를 차례로 둘러본 뒤 항저우로 이동합니다. 정원과 컬렉션, 골목을 충분히 보고 쑤저우를 서두르는 경유지로 만들지 않습니다.",
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
        "Visit Lingyin-Feilai Peak and Lingyin Temple, choose Longjing Village or the China National Tea Museum, then continue to the West Lake shore and a cruise. One full day connects the temple, tea landscape and lake.",
        "游览灵隐飞来峰与灵隐寺，再在龙井村和中国茶叶博物馆中选择一项，最后前往西湖湖岸并乘船。用完整一天串起寺院、茶文化和湖景。",
        "링인 페이라이펑과 링인사를 보고 룽징촌 또는 중국차엽박물관 중 한 곳을 선택한 뒤 서호 호숫가와 유람선으로 이어갑니다. 사찰과 차 문화, 호수를 하루에 자연스럽게 연결합니다.",
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
        "After check-out, your private driver takes you to Hangzhou airport or railway station. With no fixed sightseeing on departure day, there is enough room for hotel check-out, city traffic and the confirmed flight or train.",
        "退房后由司机送往杭州机场或车站，当天不安排导游和固定景点。这样能为离店、城市交通和返程时间留出余量，不必在出发前匆忙赶最后一个景点。",
        "체크아웃 후 전용 차량으로 항저우 공항이나 기차역에 이동합니다. 출발일에는 고정 관광 일정을 넣지 않아 체크아웃과 도심 교통, 확정된 항공편이나 열차 시간에 충분한 여유를 둡니다.",
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
      "/images/destinations/shanghai/bund-architecture-1200.webp",
      l("Historic architecture along Shanghai's Bund", "上海外滩历史建筑", "상하이 와이탄의 역사 건축"),
      l("Read Shanghai from the historic Bund to the skyline across the river.", "从外滩历史建筑看向黄浦江两岸的上海。", "와이탄의 역사 건축에서 강 건너 스카이라인까지 이어 봅니다."),
      1200,
      750,
    ),
    image(
      "/images/tours/shanghai-suzhou-5-day-private-tour/humble-administrators-garden.jpg",
      l("Lotus pond and pavilions in Suzhou's Humble Administrator's Garden", "苏州拙政园的荷池、亭台与园林景观", "쑤저우 졸정원의 연못과 정자 풍경"),
      l("Suzhou is given time for its gardens, museum and historic lanes.", "苏州不是匆匆过站：园林、博物馆和街巷都留出时间。", "쑤저우의 정원과 박물관, 옛 골목을 서두르지 않고 둘러봅니다."),
      1280,
      1707,
      "50% 50%",
    ),
    image(
      "/images/guides/tea-landscape-regions-of-china/hero-1600.webp",
      l("Tea terraces and footpaths in Meijiawu, Hangzhou", "杭州梅家坞茶园与山间步道", "항저우 메이지아우의 차밭과 산길"),
      l("Hangzhou's tea landscape adds a quieter rhythm before West Lake.", "先走进杭州茶乡，再把一天收在西湖。", "항저우의 차밭에서 여유를 느낀 뒤 서호로 이어갑니다."),
      1600,
      1000,
    ),
    image(
      "/images/home/hangzhou-1600.jpg",
      l("Boats crossing West Lake with wooded hills beyond", "西湖水面、游船与远处山林", "서호 수면과 유람선, 멀리 이어지는 숲과 산"),
      l("West Lake closes the three-city route at a slower pace.", "在西湖放慢脚步，为江南三城之旅收尾。", "서호에서 속도를 늦추며 세 도시 여정을 마무리합니다."),
      1600,
      1066,
      "50% 54%",
    ),
  ],
  routeMedia: [
    {
      day: 1,
      variants: [
        {
          label: l("Arrival in Shanghai", "抵达上海", "상하이 도착"),
          image: image(
            "/images/destinations/shanghai/hero-1600.webp",
            l(
              "Shanghai's historic rooftops and the Lujiazui skyline across the Huangpu River",
              "上海浦西历史建筑屋顶与黄浦江对岸的陆家嘴天际线",
              "상하이 푸시의 역사적 지붕과 황푸강 건너 루자쭈이 스카이라인",
            ),
            l(
              "Shanghai is the arrival point before the journey continues west through Jiangnan.",
              "从上海落地，休息之后再一路向苏州与杭州前行。",
              "상하이에 도착해 쉬고, 다음 날부터 쑤저우와 항저우로 이어갑니다.",
            ),
            1600,
            1000,
            "50% 48%",
          ),
        },
      ],
    },
    {
      day: 2,
      variants: [
        {
          label: l("The Bund", "外滩", "와이탄"),
          image: image(
            "/images/destinations/shanghai/bund-architecture-1200.webp",
            l(
              "Historic architecture along Shanghai's Bund",
              "上海外滩历史建筑群",
              "상하이 와이탄의 역사 건축",
            ),
            l(
              "The Bund anchors a full day linking old Shanghai with the skyline across the river.",
              "从外滩的历史建筑出发，再看黄浦江对岸的现代天际线。",
              "와이탄의 역사 건축에서 시작해 강 건너 현대 스카이라인까지 이어 봅니다.",
            ),
            1200,
            750,
          ),
        },
      ],
    },
    {
      day: 3,
      variants: [
        {
          label: l("Panmen", "盘门", "판먼"),
          image: image(
            "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/panmen-1600.webp",
            l(
              "Panmen city gate and canal in Suzhou",
              "苏州盘门城墙、城门与水道",
              "쑤저우 판먼 성벽과 수로",
            ),
            l(
              "Panmen is one of the two first-look choices after arriving in Suzhou.",
              "抵达苏州后，可在盘门与虎丘之间选择一处，再前往山塘街。",
              "쑤저우 도착 후 판먼과 후추 중 한 곳을 선택하고 산탕제로 이어갑니다.",
            ),
            1600,
            1000,
          ),
        },
        {
          label: l("Leaving Shanghai", "离开上海", "상하이 출발"),
          image: image(
            "/images/destinations/shanghai/suzhou-creek-1200.webp",
            l(
              "Waibaidu Bridge at the mouth of Suzhou Creek with Shanghai's skyline beyond",
              "上海苏州河口外白渡桥与远处城市天际线",
              "상하이 쑤저우허 하구의 와이바이두교와 도시 스카이라인",
            ),
            l(
              "A last Shanghai view before the route continues to Suzhou.",
              "完成上海半日游览后，再从这座城市转入苏州。",
              "상하이 반일 관광을 마친 뒤 쑤저우로 이동합니다.",
            ),
            1200,
            750,
          ),
        },
      ],
    },
    {
      day: 4,
      variants: [
        {
          label: l("Humble Administrator's Garden", "拙政园", "졸정원"),
          image: image(
            "/images/tours/shanghai-suzhou-5-day-private-tour/humble-administrators-garden.jpg",
            l(
              "Lotus pond and pavilions in Suzhou's Humble Administrator's Garden",
              "苏州拙政园的荷池、亭台与园林景观",
              "쑤저우 졸정원의 연못과 정자 풍경",
            ),
            l(
              "The day begins with the spatial rhythm of the Humble Administrator's Garden.",
              "先在拙政园看园林空间如何一层层展开。",
              "졸정원에서 정원의 공간과 시선이 이어지는 방식을 먼저 살펴봅니다.",
            ),
            1280,
            1707,
            "50% 42%",
          ),
        },
        {
          label: l("Suzhou Museum", "苏州博物馆", "쑤저우박물관"),
          image: image(
            "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/suzhou-museum-1600.webp",
            l(
              "The garden court and geometric rooflines of Suzhou Museum",
              "苏州博物馆庭院、水面与几何屋顶",
              "쑤저우박물관 정원과 수면, 기하학적 지붕선",
            ),
            l(
              "The museum carries Suzhou's garden language into a modern building.",
              "苏州博物馆把江南园林语言带进现代建筑。",
              "쑤저우박물관은 강남 정원의 언어를 현대 건축으로 이어갑니다.",
            ),
            1600,
            1000,
          ),
        },
        {
          label: l("Pingjiang Road", "平江路", "핑장루"),
          image: image(
            "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/pingjiang-road-1600.webp",
            l(
              "Stone bridge, canal and whitewashed houses along Pingjiang Road in Suzhou",
              "苏州平江路的石桥、河道与白墙民居",
              "쑤저우 핑장루의 돌다리와 운하, 흰 벽의 집들",
            ),
            l(
              "Pingjiang Road closes the Suzhou day at the scale of canals and old lanes.",
              "最后走进平江路，在河道与街巷的尺度里看苏州。",
              "마지막에는 핑장루의 운하와 골목을 걸으며 쑤저우를 봅니다.",
            ),
            1600,
            1000,
          ),
        },
      ],
    },
    {
      day: 5,
      variants: [
        {
          label: l("Lingyin–Feilai Peak", "灵隐飞来峰", "링인 페이라이펑"),
          image: image(
            "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/lingyin-feilai-peak-1600.webp",
            l(
              "Buddhist carvings set into the limestone of Feilai Peak beside Lingyin Temple",
              "杭州灵隐飞来峰岩壁上的佛教造像",
              "항저우 링인사 옆 페이라이펑 암벽의 불교 조각",
            ),
            l(
              "The Hangzhou day begins among Feilai Peak's stone carvings and Lingyin Temple.",
              "杭州的一天从飞来峰石刻与灵隐寺开始。",
              "항저우의 하루는 페이라이펑 석조와 링인사에서 시작합니다.",
            ),
            1600,
            1000,
          ),
        },
        {
          label: l("West Lake cruise", "西湖游船", "서호 유람선"),
          image: image(
            "/images/home/hangzhou-1600.jpg",
            l(
              "Boats crossing West Lake with wooded hills beyond",
              "西湖水面、游船与远处山林",
              "서호 수면과 유람선, 멀리 이어지는 숲과 산",
            ),
            l(
              "The day slows down on the West Lake shore and water.",
              "最后在西湖湖岸与水面上把节奏慢下来。",
              "마지막에는 서호 호숫가와 물 위에서 속도를 늦춥니다.",
            ),
            1600,
            1066,
            "50% 54%",
          ),
        },
        {
          label: l("West Lake shore", "西湖湖岸", "서호 호숫가"),
          image: image(
            "/images/guides/white-snake-legend-hangzhou-zhenjiang/hero-1600.webp",
            l(
              "Broken Bridge and the eastern end of Bai Causeway beside West Lake",
              "西湖白堤东端的断桥与湖面",
              "서호 백제 동쪽 끝의 단교와 호수",
            ),
            l(
              "West Lake is also experienced slowly from its causeways and shore paths.",
              "西湖不只在船上看，也适合沿白堤与湖岸慢慢走。",
              "서호는 유람선뿐 아니라 백제와 호숫길을 천천히 걸으며 만납니다.",
            ),
            1600,
            1000,
          ),
        },
      ],
    },
    {
      day: 6,
      variants: [
        {
          label: l("Hangzhou departure", "杭州返程", "항저우 출발"),
          image: image(
            "/images/guides/shanghai-hangzhou-transport-route/hero-1600.webp",
            l(
              "The departure hall at Hangzhou East railway station",
              "杭州东站候车大厅",
              "항저우동역 대합실",
            ),
            l(
              "For a rail departure, the driver takes you to Hangzhou East; airport transfers follow the confirmed flight instead.",
              "乘高铁返程时送至杭州东站；乘飞机则按确认航班送往机场。",
              "열차 이용 시 항저우동역으로, 항공편 이용 시 확정된 항공편에 맞춰 공항으로 이동합니다.",
            ),
            1600,
            1000,
            "50% 52%",
          ),
        },
      ],
    },
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
  dateModified: PUBLISHED,
};

const chengdu: PrivateTourProduct = {
  id: "private-tour-chengdu-5d4n",
  slug: "chengdu-pandas-sanxingdui-5-day-private-tour",
  days: 5,
  nights: 4,
  title: l("Chengdu, Pandas & Sanxingdui: 5-Day Private Tour", "成都·大熊猫·三星堆 5 天 4 晚私家团", "청두·판다·싼싱두이 5일 프라이빗 투어"),
  eyebrow: l("Wildlife, archaeology and living Chengdu", "熊猫、古蜀文明与成都生活", "판다와 고대 문명, 청두의 일상"),
  lede: l("See the pandas early, give Sanxingdui the time it deserves, and balance two major day trips with Chengdu's relaxed parks and teahouses.", "早场看熊猫，用完整一天读懂三星堆，再以人民公园和都江堰平衡城市生活与古代工程。", "이른 시간 판다를 만나고 싼싱두이를 온전히 둘러본 뒤, 청두의 공원과 두장옌까지 균형 있게 경험합니다."),
  summary: l("Four nights in Chengdu with private transfers, three English-guided touring days and the main admissions for the Panda Base, Sanxingdui and Dujiangyan.", "成都连住 4 晚，D2–D4 英语导游，私车往返熊猫基地、三星堆与都江堰，免去每天换酒店。", "청두 4박 연박, D2~D4 영어 가이드와 전용 차량으로 판다기지, 싼싱두이, 두장옌을 방문합니다."),
  highlights: lists(["Early visit to Chengdu Panda Base", "A full day at Sanxingdui Museum", "Dujiangyan's ancient waterworks", "Tea and local life in People's Park"], ["大熊猫基地早场", "三星堆博物馆完整日", "都江堰古代水利工程", "人民公园与茶馆体验"], ["청두 판다기지 이른 관람", "싼싱두이박물관 종일 관람", "두장옌 고대 수리시설", "인민공원과 찻집 체험"]),
  itinerary: [
    day(1, l("Arrive in Chengdu", "抵达成都", "청두 도착"), l("Driver pickup at the airport or railway station and hotel check-in. No guide today.", "司机接机或接站，入住酒店；当天无导游。", "기사 픽업 후 호텔 체크인. 이날은 가이드가 동행하지 않습니다.")),
    day(2, l("Pandas and People's Park", "熊猫与人民公园", "판다와 인민공원"), l("An early visit to Chengdu Research Base of Giant Panda Breeding, followed by People's Park and a teahouse experience.", "大熊猫繁育研究基地早场，随后前往人民公园并体验成都茶馆。", "청두 판다번식연구기지를 이른 시간 방문하고 인민공원과 찻집을 경험합니다.")),
    day(3, l("Sanxingdui Museum", "三星堆博物馆", "싼싱두이박물관"), l("A full museum day at Sanxingdui, returning to Chengdu afterward.", "完整游览三星堆博物馆，当日返回成都。", "싼싱두이박물관을 충분히 둘러보고 청두로 돌아옵니다.")),
    day(4, l("Dujiangyan", "都江堰", "두장옌"), l("Explore the Dujiangyan Irrigation System and Guanxian Ancient Town, then return to Chengdu.", "游览都江堰水利工程与灌县古城，当日返回成都。", "두장옌 수리시설과 관현고성을 둘러본 뒤 청두로 돌아옵니다.")),
    day(5, l("Depart Chengdu", "成都返程", "청두 출발"), l("Driver transfer to the airport or railway station. No guide today.", "司机送往机场或车站；当天无导游。", "전용 차량으로 공항 또는 기차역 이동. 이날은 가이드가 동행하지 않습니다.")),
  ],
  hotelNote: l("Four nights in a breakfast-included Ctrip 4-Diamond–rated Chengdu hotel, based on twin sharing. Room arrangements for group sizes other than the published 2- and 4-traveller tiers are confirmed manually.", "成都 4 晚携程 4 钻酒店双标含早，页面公开的 2 人和 4 人档默认两人一间；其他人数的房间配置须人工确认。", "청두에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 수동으로 확인합니다."),
  serviceNote: l("Private driver transfers on Days 1 and 5; English guide and private vehicle on Days 2–4. Listed adult admission tickets and attraction transport are included. No shopping stops.", "D1/D5 司机接送，D2–D4 英语导游与行程内私车；含行程所列成人基础门票、景交与预约，全程无购物店安排。", "D1·D5 기사 픽업·샌딩, D2~D4 영어 가이드와 전용 차량, 일정에 명시된 성인 기본 입장권과 관광지 내 이동이 포함되며 쇼핑 일정은 없습니다."),
  exclusions: commonExclusions(["Mount Qingcheng and attractions not listed"], ["青城山及未列景点"], ["칭청산 및 일정에 명시되지 않은 관광지"]),
  bookingNote: commonBookingNote,
  heroImage: image("/images/destinations/chengdu/hero-1600.webp", l("Chengdu city scenery", "成都城市风景", "청두 도심 풍경"), l("Chengdu is the relaxed base for three focused touring days.", "以成都为基地，舒适安排三天重点游览。", "청두를 거점으로 세 번의 핵심 당일 여정을 떠납니다.")),
  gallery: [
    image("/images/guides/chengdu-panda-base-or-dujiangyan-panda-valley/hero-1600.webp", l("Golden panda sculpture in the landscaped grounds of Chengdu Panda Base", "成都大熊猫基地园区内的金色熊猫雕塑", "청두 판다기지 조경 구역의 황금색 판다 조형물"), l("This is a site landmark, not a live panda. The early visit is timed for the real-animal enclosures, subject to animal activity and venue conditions.", "这是园区地标雕塑，不是真熊猫；早场安排面向真实动物展区，但动物活动与现场条件无法保证。", "이 사진은 기지의 조형물이며 실제 판다가 아닙니다. 이른 관람은 실제 판다 방사장을 대상으로 하지만 동물 활동과 현장 상황은 보장할 수 없습니다.")),
    image("/images/guides/sanxingdui-museum-booking-and-gallery-order/hero-1600.webp", l("Exterior and arrival plaza of the new Sanxingdui Museum", "三星堆新馆外观与到达广场", "싼싱두이 신관 외관과 입장 광장"), l("A full day leaves time for the museum's major galleries after arrival; this photograph shows the exterior, not an artefact or gallery interior.", "抵达后留出完整一天游览主要展厅；照片展示的是新馆外观，不是文物或展厅内部。", "도착 후 주요 전시실을 충분히 볼 수 있도록 하루를 배정합니다. 사진은 유물이나 전시실 내부가 아닌 신관 외관입니다.")),
    image("/images/destinations/chengdu/dujiangyan-1200.webp", l("Dujiangyan Irrigation System", "都江堰水利工程", "두장옌 수리시설"), l("Ancient engineering still shaping the Chengdu Plain.", "至今仍在影响成都平原的古代工程。", "오늘도 청두 평야를 지탱하는 고대의 공학."), 1200, 800),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Chengdu arrival", "抵达成都", "청두 도착"),
        "/images/destinations/chengdu/jinjiang-bridge-1200.webp",
        l("A covered bridge and river scene in central Chengdu", "成都中心城区的廊桥与锦江河景", "청두 도심의 지붕 있는 다리와 강 풍경"),
        l("A central Chengdu river view introduces the overnight base; the exact airport or station transfer is confirmed for the booking.", "用成都中心城区河景认识住宿基地；实际机场或车站接送按订单确认。", "청두 도심의 강 풍경으로 숙박 거점을 소개하며, 실제 공항 또는 역 이동은 예약별로 확정합니다."),
        1200,
        750,
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Panda Base landmark", "熊猫基地园区地标", "판다기지 조형물"),
        "/images/guides/chengdu-panda-base-or-dujiangyan-panda-valley/hero-1600.webp",
        l("Golden panda sculpture in the landscaped grounds of Chengdu Panda Base", "成都大熊猫基地园区内的金色熊猫雕塑", "청두 판다기지 조경 구역의 황금색 판다 조형물"),
        l("This photograph shows a sculpture, not a live panda; the itinerary visits the real-animal enclosures early in the day.", "照片展示的是园区雕塑，不是真熊猫；当天早场游览真实动物展区。", "사진은 실제 판다가 아닌 기지의 조형물이며, 일정은 이른 시간 실제 판다 방사장을 방문합니다."),
      ),
      routeVariant(
        l("People's Park teahouse", "人民公园茶馆", "인민공원 찻집"),
        "/images/destinations/chengdu/hero-1600.webp",
        l("Traditional teahouse pavilion in Chengdu People's Park", "成都人民公园内的传统茶馆亭廊", "청두 인민공원의 전통 찻집 정자"),
        l("After the Panda Base, the day slows down at People's Park and its teahouse setting.", "熊猫基地之后，在人民公园与茶馆环境里放慢节奏。", "판다기지 관람 후 인민공원과 찻집 풍경에서 여유를 찾습니다."),
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Sanxingdui New Museum", "三星堆新馆", "싼싱두이 신관"),
        "/images/guides/sanxingdui-museum-booking-and-gallery-order/hero-1600.webp",
        l("Exterior and arrival plaza of the new Sanxingdui Museum", "三星堆新馆外观与到达广场", "싼싱두이 신관 외관과 입장 광장"),
        l("The photograph identifies the new museum arrival setting; admission inventory and gallery order are confirmed separately.", "照片确认的是三星堆新馆到达环境；门票库存与展厅顺序另行确认。", "사진은 싼싱두이 신관의 도착 공간을 보여 주며, 입장권 재고와 전시 동선은 별도로 확인합니다."),
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Dujiangyan waterworks", "都江堰水利工程", "두장옌 수리시설"),
        "/images/destinations/chengdu/dujiangyan-1200.webp",
        l("Dujiangyan irrigation site and river valley", "都江堰水利工程与河谷全景", "두장옌 수리시설과 강 계곡 전경"),
        l("The landscape view establishes Dujiangyan's river-valley scale; internal routes and attraction transport are confirmed for the visit.", "全景用于呈现都江堰河谷尺度；景区内部路线与景交按实际游览确认。", "전경은 두장옌 강 계곡의 규모를 보여 주며, 내부 동선과 관광지 이동은 방문 조건에 맞춰 확정합니다."),
        1200,
        750,
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Depart Chengdu", "成都返程", "청두 출발"),
        "/images/destinations/chengdu/hero-1600.webp",
        l("Traditional teahouse pavilion in Chengdu People's Park", "成都人民公园内的传统茶馆亭廊", "청두 인민공원의 전통 찻집 정자"),
        l("A final Chengdu scene closes the stay before the confirmed airport or railway-station transfer.", "用一幅成都生活场景为旅程收尾，再按订单送往机场或车站。", "청두의 일상 풍경으로 여정을 마친 뒤 예약에 맞춰 공항 또는 기차역으로 이동합니다."),
      ),
    ),
  ],
  packages: [standardPackage("standard-guided", standardLabel, standardSummary, [9990, 6290])],
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
};

const xian: PrivateTourProduct = {
  id: "private-tour-xian-5d4n",
  slug: "xian-terracotta-warriors-5-day-private-tour",
  days: 5,
  nights: 4,
  title: l("Xi'an & the Terracotta Warriors: 5-Day Private Tour", "西安·兵马俑 5 天 4 晚私家团", "시안·병마용 5일 프라이빗 투어"),
  eyebrow: l("Imperial history, city walls and Muslim Quarter lanes", "从秦汉遗址走进古城街巷", "제국의 역사에서 구시가 골목까지"),
  lede: l("Give the Terracotta Warriors a full day, then connect Xi'an's city wall, Tang-era landmarks and Muslim Quarter with private transport and an English-speaking guide.", "用完整一天游览兵马俑与华清宫，再把城墙、大雁塔和回民街串成一条清晰的古都脉络。", "병마용을 하루 동안 깊이 보고, 성벽과 당대 유적, 회민거리를 전용 차량과 영어 가이드로 연결합니다."),
  summary: l("Four nights in central Xi'an with three guided touring days, private arrival and departure transfers, and basic admissions for the core itinerary.", "西安连住 4 晚，D2–D4 英语导游，含接送、行程内私车及核心景点基础门票。", "시안 4박 연박, D2~D4 영어 가이드, 전용 픽업·샌딩과 핵심 일정 기본 입장권이 포함됩니다."),
  highlights: lists(["Xi'an City Wall", "Terracotta Warriors and Huaqing Palace", "Great Mosque and Muslim Quarter", "A choice of Xi'an Museum or Small Wild Goose Pagoda"], ["西安城墙", "兵马俑与华清宫", "西安大清真寺与回民街", "西安博物院或小雁塔二选一"], ["시안 성벽", "병마용과 화청궁", "시안 대청진사와 회민거리", "시안박물원 또는 소안탑 중 한 곳"]),
  itinerary: [
    day(1, l("Arrive in Xi'an", "抵达西安", "시안 도착"), l("Driver pickup and hotel check-in. No guide today.", "司机接机或接站，入住酒店；当天无导游。", "기사 픽업 후 호텔 체크인. 이날은 가이드가 동행하지 않습니다.")),
    day(2, l("City Wall and Tang Xi'an", "城墙与盛唐西安", "성벽과 당나라 시안"), l("Xi'an City Wall, the Giant Wild Goose Pagoda square and Grand Tang Mall.", "西安城墙、大雁塔广场、大唐不夜城。", "시안 성벽, 대안탑 광장, 대당불야성을 둘러봅니다.")),
    day(3, l("Terracotta Warriors", "兵马俑完整日", "병마용 종일 일정"), l("Terracotta Warriors and Huaqing Palace, returning to Xi'an after the visit.", "秦始皇帝陵兵马俑、华清宫，游览后返回西安。", "진시황릉 병마용과 화청궁을 방문한 뒤 시안으로 돌아옵니다.")),
    day(4, l("Muslim Quarter and museum choice", "回民街与博物馆选择", "회민거리와 박물관 선택"), l("Great Mosque and Muslim Quarter, then choose Xi'an Museum or the Small Wild Goose Pagoda.", "西安大清真寺、回民街；西安博物院或小雁塔二选一。", "대청진사와 회민거리를 걷고 시안박물원 또는 소안탑 중 한 곳을 선택합니다.")),
    day(5, l("Depart Xi'an", "西安返程", "시안 출발"), l("Driver transfer to the airport or railway station. No guide today.", "司机送往机场或车站；当天无导游。", "전용 차량으로 공항 또는 기차역 이동. 이날은 가이드가 동행하지 않습니다.")),
  ],
  hotelNote: l("Four nights in a breakfast-included Ctrip 4-Diamond–rated Xi'an hotel, based on twin sharing. Room arrangements for group sizes other than the published 2- and 4-traveller tiers are confirmed manually.", "西安 4 晚携程 4 钻酒店双标含早，页面公开的 2 人和 4 人档默认两人一间；其他人数的房间配置须人工确认。", "시안에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 수동으로 확인합니다."),
  serviceNote: l("Private driver transfers on arrival and departure, plus an English guide and private vehicle on Days 2–4. Listed adult admission tickets and attraction transport are included. No shopping stops.", "抵达与返程由司机接送，D2–D4 英语导游与行程内私车；含行程所列成人基础门票、景交和预约，全程无购物店安排。", "도착·출발 전용 차량, D2~D4 영어 가이드와 전용 차량, 일정에 명시된 성인 기본 입장권과 관광지 내 이동이 포함되며 쇼핑 일정은 없습니다."),
  exclusions: commonExclusions(["Shows such as The Song of Everlasting Sorrow", "Mount Hua and attractions not listed"], ["《长恨歌》等演出", "华山及未列景点"], ["장한가 등 공연", "화산 및 일정에 명시되지 않은 관광지"]),
  bookingNote: commonBookingNote,
  heroImage: image("/images/destinations/xian/hero-1600.webp", l("Xi'an city wall and historic skyline", "西安城墙与古城风景", "시안 성벽과 역사 지구"), l("Five days connecting Xi'an's layers of history.", "用五天串起西安不同历史层次。", "시안의 여러 시대를 잇는 5일 여정.")),
  gallery: [
    image("/images/destinations/xian/terracotta-pit-one-1200.webp", l("Terracotta Warriors in Pit One", "兵马俑一号坑", "병마용 1호갱"), l("A full day is reserved for the eastern heritage sites.", "为城东遗址留出完整一天。", "동쪽 유적을 위해 하루를 온전히 배정합니다."), 1200, 800),
    image("/images/destinations/xian/dayanta-1200.webp", l("Giant Wild Goose Pagoda in Xi'an", "西安大雁塔", "시안 대안탑"), l("Tang-era Xi'an after the city wall.", "从城墙走向盛唐西安。", "성벽에서 당나라 시안으로."), 1200, 800),
    image("/images/guides/terracotta-warriors-without-tour/hero-1600.webp", l("Details of the Terracotta Army", "兵马俑军阵细节", "병마용 군진의 세부"), l("The guide helps place the excavation in context.", "由导游帮助理解考古现场与历史背景。", "가이드와 함께 발굴 현장의 맥락을 이해합니다.")),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Xi'an arrival", "抵达西安", "시안 도착"),
        "/images/destinations/xian/hero-1600.webp",
        l("Xi'an south gate, city wall and central avenue at dusk", "西安南门、城墙与暮色中的城市中轴", "해 질 무렵 시안 남문과 성벽, 중심 대로"),
        l("The city-wall view introduces the Xi'an base; the exact airport or railway-station pickup is confirmed for the booking.", "以城墙城市景观认识西安住宿基地；实际机场或车站接送按订单确认。", "성벽 풍경으로 시안 숙박 거점을 소개하며, 실제 공항 또는 역 픽업은 예약별로 확정합니다."),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Xi'an City Wall", "西安城墙", "시안 성벽"),
        "/images/destinations/xian/hero-1600.webp",
        l("Xi'an south gate, city wall and central avenue at dusk", "西安南门、城墙与暮色中的城市中轴", "해 질 무렵 시안 남문과 성벽, 중심 대로"),
        l("The south-gate view establishes the old-city structure; access, cycling and lighting are not assumed from the photograph.", "南门视角用于理解古城结构；照片不承诺登城、骑行或当晚亮灯。", "남문 풍경은 구시가 구조를 보여 주며, 사진만으로 성벽 입장, 자전거 이용이나 야간 조명을 보장하지 않습니다."),
      ),
      routeVariant(
        l("Giant Wild Goose Pagoda", "大雁塔", "대안탑"),
        "/images/destinations/xian/dayanta-1200.webp",
        l("Giant Wild Goose Pagoda seen across the north-square pool", "从北广场水面望向西安大雁塔", "북광장 수면 너머로 보이는 시안 대안탑"),
        l("The Day 2 route continues from the wall to the Giant Wild Goose Pagoda square and Grand Tang Mall.", "D2 从城墙继续前往大雁塔广场与大唐不夜城。", "D2는 성벽에서 대안탑 광장과 대당불야성으로 이어집니다."),
        1200,
        750,
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Terracotta Warriors Pit 1", "兵马俑一号坑", "병마용 1호갱"),
        "/images/destinations/xian/terracotta-pit-one-1200.webp",
        l("Terracotta Warriors inside Pit 1 in Lintong", "临潼兵马俑一号坑内的陶俑军阵", "린퉁 병마용 1호갱 내부의 도용 군진"),
        l("A full day is reserved for the eastern heritage sites; reservation availability is confirmed separately.", "为城东遗址留出完整一天；实名预约与余票另行确认。", "동쪽 유적을 위해 하루를 배정하며, 실명 예약과 잔여 입장권은 별도로 확인합니다."),
        1200,
        750,
      ),
      routeVariant(
        l("Terracotta Army context", "兵马俑军阵细节", "병마용 군진 세부"),
        "/images/guides/terracotta-warriors-without-tour/hero-1600.webp",
        l("Rows of Terracotta Warriors in Pit 1", "兵马俑一号坑内成排的陶俑", "병마용 1호갱의 도용 행렬"),
        l("The guide helps connect the visible excavation with the wider Qin imperial site.", "导游帮助把眼前的发掘现场放回秦帝国遗址的整体背景中理解。", "가이드가 눈앞의 발굴 현장을 진 제국 유적 전체 맥락과 연결해 설명합니다."),
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Historic-centre orientation", "古城中心方位", "구시가 중심 방향"),
        "/images/guides/xian-where-to-stay-city-wall-or-dayanta/hero-1600.webp",
        l("Xi'an Bell Tower illuminated at night", "夜间亮灯的西安钟楼", "야간 조명이 켜진 시안 종루"),
        l("The Bell Tower provides historic-centre context for the Great Mosque and Muslim Quarter day; it is not presented as one of the included admissions.", "钟楼用于说明大清真寺与回民街所在的古城中心环境，不作为基础包含门票项目。", "종루는 대청진사와 회민거리 일정의 구시가 중심 맥락을 보여 주며, 포함 입장권으로 제시하지 않습니다."),
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Xi'an North railway departure", "西安北站返程", "시안북역 출발"),
        "/images/guides/xian-chengdu-transport-route/hero-1600.webp",
        l("Concourse inside Xi'an North Railway Station", "西安北站候车大厅", "시안북역 대합실"),
        l("For a confirmed rail departure, the driver can take you to Xi'an North; airport transfers follow the confirmed flight instead.", "如确认从西安北站乘高铁返程，司机送至该站；乘飞机则按确认航班送往机场。", "확정된 고속철도 출발이 시안북역이면 기사 차량으로 이동하며, 항공편 이용 시에는 확정된 항공편에 맞춰 공항으로 이동합니다."),
      ),
    ),
  ],
  packages: [standardPackage("standard-guided", standardLabel, standardSummary, [9590, 6290])],
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
};

const chongqingWulong: PrivateTourProduct = {
  id: "private-tour-chongqing-wulong-5d4n",
  slug: "chongqing-wulong-5-day-private-tour",
  days: 5,
  nights: 4,
  title: l("Chongqing & Wulong: 5-Day Private Tour", "重庆·武隆 5 天 4 晚私家团", "충칭·우룽 5일 프라이빗 투어"),
  eyebrow: l("Vertical city, karst landscapes", "山城夜色与武隆喀斯特", "수직 도시와 카르스트 풍경"),
  lede: l("Pair Chongqing's layered cityscape with an overnight journey into Wulong, including the Three Natural Bridges and your choice of Fairy Mountain or Furong Cave.", "先读懂重庆的立体城市景观，再住进武隆仙女山度假区，游览天生三桥，并在仙女山与芙蓉洞之间选择一项。", "충칭의 입체적인 도시 풍경과 우룽 1박을 연결해 천생삼교, 선녀산 또는 부용동 중 한 곳을 경험합니다."),
  summary: l("Three nights in Chongqing and one in Wulong, with private transport, three English-guided touring days and the listed basic admissions.", "重庆 3 晚、武隆 1 晚，D2–D4 英语导游，全程按行程安排私车与列明基础门票。", "충칭 3박과 우룽 1박, D2~D4 영어 가이드, 일정 내 전용 차량과 명시된 기본 입장권이 포함됩니다."),
  highlights: lists(["Chongqing's rail and river cityscape", "Three Natural Bridges", "An overnight stay in Wulong", "Choose Fairy Mountain or Furong Cave"], ["重庆轻轨与两江城市景观", "武隆天生三桥", "仙女山度假区住一晚", "仙女山或芙蓉洞二选一"], ["충칭의 모노레일과 두 강 풍경", "우룽 천생삼교", "우룽 1박", "선녀산 또는 부용동 중 선택"]),
  itinerary: [
    day(1, l("Arrive in Chongqing", "抵达重庆", "충칭 도착"), l("Driver pickup and hotel check-in. No guide today.", "司机接机或接站，入住酒店；当天无导游。", "기사 픽업 후 호텔 체크인. 이날은 가이드가 동행하지 않습니다.")),
    day(2, l("Chongqing city", "重庆城市日", "충칭 도심"), l("Liziba, river and city viewpoints, then Three Gorges Museum or an exterior view of Hongya Cave depending on opening hours.", "李子坝、两江城市景观；按开放时间组合三峡博物馆或洪崖洞外观。", "리쯔바와 두 강 전망, 운영 시간에 따라 삼협박물관 또는 홍야동 외관을 둘러봅니다.")),
    day(3, l("Chongqing to Wulong", "重庆前往武隆", "충칭에서 우룽으로"), l("Drive to Wulong, explore the Three Natural Bridges and stay in the Fairy Mountain resort area.", "前往武隆，游览天生三桥，入住仙女山度假区。", "우룽으로 이동해 천생삼교를 둘러보고 선녀산 리조트 지역에서 숙박합니다.")),
    day(4, l("Wulong choice and return", "武隆二选一后返程", "우룽 선택 일정 후 귀환"), l("Choose Fairy Mountain or Furong Cave, then return to Chongqing for the night.", "仙女山或芙蓉洞二选一，随后返回重庆入住。", "선녀산 또는 부용동 중 한 곳을 선택한 뒤 충칭으로 돌아옵니다.")),
    day(5, l("Depart Chongqing", "重庆返程", "충칭 출발"), l("Driver transfer to the airport or railway station. No guide today.", "司机送往机场或车站；当天无导游。", "전용 차량으로 공항 또는 기차역 이동. 이날은 가이드가 동행하지 않습니다.")),
  ],
  hotelNote: l("Three nights in Chongqing and one in Wulong, in breakfast-included Ctrip 4-Diamond–rated rooms. The published 2- and 4-traveller tiers are based on twin sharing; other room arrangements are confirmed manually.", "重庆 3 晚 + 武隆 1 晚，均为携程 4 钻双标含早；页面公开的 2 人和 4 人档默认两人一间，其他人数的房间配置须人工确认。", "충칭 3박과 우룽 1박 모두 중국 씨트립 기준 4다이아 등급 호텔과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 수동으로 확인합니다."),
  serviceNote: l("Private transfers on Days 1 and 5, with an English guide and private vehicle on Days 2–4. Listed adult admission tickets for the Three Natural Bridges and one Day 4 attraction are included. No shopping stops.", "D1/D5 司机接送，D2–D4 英语导游与重庆—武隆段私车；含天生三桥及 D4 二选一项目中的一项成人基础门票，全程无购物店安排。", "D1·D5 픽업·샌딩, D2~D4 영어 가이드와 충칭~우룽 전용 차량, 천생삼교와 D4 선택 관광지 한 곳의 성인 기본 입장권이 포함되며 쇼핑 일정은 없습니다."),
  exclusions: commonExclusions(["The Day 4 attraction not selected", "Unlisted night cruises and shows"], ["D4 未选择的另一景点", "未列夜游或演出"], ["D4에 선택하지 않은 다른 관광지", "일정에 없는 야간 유람선과 공연"]),
  bookingNote: l("Day 4 includes either Fairy Mountain or Furong Cave, not both; your choice will be written into the confirmation. Mountain weather and walking ability can affect the final plan. " + commonBookingNote.en, "D4 仅包含仙女山或芙蓉洞其中一项，选择会明确写入确认单；山区天气与客人体力可能影响执行。" + commonBookingNote.zh, "D4에는 선녀산 또는 부용동 중 한 곳만 포함되며 선택 사항은 확인서에 명시됩니다. 산악 날씨와 보행 능력에 따라 일정이 조정될 수 있습니다. " + commonBookingNote.ko),
  heroImage: image("/images/destinations/chongqing/hero-1600.webp", l("Chongqing's layered riverside skyline", "重庆层叠的两江城市景观", "충칭의 층층이 이어진 강변 스카이라인"), l("Begin in the vertical city before heading into Wulong.", "从立体山城出发，再深入武隆。", "수직 도시에서 시작해 우룽으로 들어갑니다.")),
  gallery: [
    image("/images/destinations/chongqing/liziba-1200.webp", l("Monorail at Liziba in Chongqing", "重庆李子坝轻轨", "충칭 리쯔바 모노레일"), l("A close look at Chongqing's unusual urban geography.", "从李子坝读懂重庆的立体交通。", "리쯔바에서 충칭의 입체 교통을 이해합니다."), 1200, 800),
    image("/images/destinations/chongqing/wulong-1200.webp", l("Karst landscape in Wulong", "武隆喀斯特地貌", "우룽 카르스트 지형"), l("Wulong adds a slower mountain chapter to the city stay.", "用武隆山水平衡重庆城市行程。", "도시 일정에 우룽의 산악 풍경을 더합니다."), 1200, 800),
    image("/images/destinations/chongqing/confluence-1200.webp", l("The confluence of Chongqing's rivers", "重庆两江交汇", "충칭의 두 강 합류 지점"), l("River views frame the Chongqing portion of the trip.", "两江景观贯穿重庆段行程。", "두 강 풍경이 충칭 일정의 배경이 됩니다."), 1200, 800),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Chongqing arrival", "抵达重庆", "충칭 도착"),
        "/images/destinations/chongqing/hero-1600.webp",
        l("Layered Yuzhong cityscape above the rivers in Chongqing", "重庆渝中半岛临江层叠城市景观", "충칭 위중의 층층이 이어진 강변 도시 풍경"),
        l("The Yuzhong view introduces Chongqing's vertical city form; the exact airport or station pickup is confirmed for the booking.", "用渝中半岛景观认识重庆的立体城市结构；实际机场或车站接送按订单确认。", "위중 풍경으로 충칭의 수직 도시 구조를 소개하며, 실제 공항 또는 역 픽업은 예약별로 확정합니다."),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Liziba city geography", "李子坝立体城市", "리쯔바 도시 지형"),
        "/images/destinations/chongqing/liziba-1200.webp",
        l("Monorail and layered riverbank buildings at Liziba in Chongqing", "重庆李子坝轻轨与临江层叠建筑", "충칭 리쯔바 모노레일과 층층이 이어진 강변 건물"),
        l("Liziba makes Chongqing's rail, slopes and riverbank levels visible in one frame.", "在李子坝的一幅画面里理解重庆的轨道、坡地与临江高差。", "리쯔바 한 장면에서 충칭의 모노레일, 경사와 강변 높이 차를 함께 볼 수 있습니다."),
        1200,
        800,
      ),
      routeVariant(
        l("Two-river confluence", "两江交汇", "두 강 합류"),
        "/images/destinations/chongqing/confluence-1200.webp",
        l("The Yangtze and Jialing rivers meeting at Chongqing", "长江与嘉陵江在重庆交汇", "충칭에서 만나는 양쯔강과 자링강"),
        l("The confluence view gives geographic context to the city's river viewpoints.", "两江交汇视角为当天的城市观景点提供地理背景。", "두 강 합류 풍경은 이날 도시 전망 일정의 지리적 맥락을 보여 줍니다."),
        1200,
        800,
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Three Natural Bridges", "武隆天生三桥", "우룽 천생삼교"),
        "/images/destinations/chongqing/wulong-1200.webp",
        l("Natural-bridge karst landscape at Wulong", "武隆天生三桥喀斯特景观", "우룽 천생삼교 카르스트 풍경"),
        l("The photograph identifies Wulong's natural-bridge landscape; weather, shuttle and walking conditions are confirmed for the visit.", "照片确认的是武隆天生三桥地貌；天气、景交与步行条件按实际游览确认。", "사진은 우룽 천생삼교 지형을 보여 주며, 날씨와 셔틀, 보행 조건은 방문 시점에 확인합니다."),
        1200,
        800,
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Return to Chongqing", "返回重庆", "충칭 귀환"),
        "/images/destinations/chongqing/hero-1600.webp",
        l("Layered Yuzhong cityscape above the rivers in Chongqing", "重庆渝中半岛临江层叠城市景观", "충칭 위중의 층층이 이어진 강변 도시 풍경"),
        l("After the confirmed Fairy Mountain or Furong Cave choice, the route returns to Chongqing for the final night.", "完成已确认的仙女山或芙蓉洞二选一后，返回重庆住最后一晚。", "확정된 선녀산 또는 부용동 중 한 곳을 방문한 뒤 마지막 숙박을 위해 충칭으로 돌아옵니다."),
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Chongqing East railway departure", "重庆东站返程", "충칭동역 출발"),
        "/images/destinations/chongqing/chongqing-east-station-1200.webp",
        l("Approach to Chongqing East Railway Station", "重庆东站站房与道路进站区域", "충칭동역 건물과 도로 진입 구역"),
        l("Chongqing East is one possible rail gateway; the actual station or airport transfer is confirmed for each booking.", "重庆东站只是可能的铁路返程节点之一；实际车站或机场接送按订单确认。", "충칭동역은 가능한 철도 출발 관문 중 하나이며, 실제 역 또는 공항 이동은 예약별로 확정합니다."),
        1200,
        750,
      ),
    ),
  ],
  packages: [standardPackage("standard-guided", standardLabel, standardSummary, [11590, 7190])],
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
};

const guilinYangshuo: PrivateTourProduct = {
  id: "private-tour-guilin-yangshuo-5d4n",
  slug: "guilin-yangshuo-5-day-private-tour",
  days: 5,
  nights: 4,
  title: l("Guilin & Yangshuo: 5-Day Private Tour", "桂林·阳朔 5 天 4 晚私家团", "구이린·양숴 5일 프라이빗 투어"),
  eyebrow: l("River landscapes at an unhurried pace", "沿漓江慢慢进入山水之间", "리강을 따라 천천히 만나는 산수"),
  lede: l("Cruise the Li River into Yangshuo, slow down among the countryside and return to Guilin with a flexible final sightseeing choice.", "乘漓江游船从桂林进入阳朔，在乡村山水里放慢节奏，再返回桂林完成一项轻松游览。", "리강 유람선으로 양숴에 들어가 전원 풍경을 여유롭게 즐기고, 구이린으로 돌아와 마지막 명소를 선택합니다."),
  summary: l("Two nights in Guilin and two in Yangshuo, with private transfers, three English-guided touring days, the Li River cruise and luggage moved separately on cruise day.", "桂林 2 晚 + 阳朔 2 晚，D2–D4 英语导游；含漓江游船、行程内私车，并在游船日单独转运行李。", "구이린 2박과 양숴 2박, D2~D4 영어 가이드, 리강 유람선과 일정 내 전용 차량, 유람선 당일 수하물 별도 이동이 포함됩니다."),
  highlights: lists(["Li River cruise from Guilin to Yangshuo", "Two nights based in Yangshuo", "Countryside walk, family activity or gentle cycling", "Choose Reed Flute Cave or Elephant Trunk Hill"], ["漓江游船桂林至阳朔", "阳朔连住 2 晚", "乡村慢游、家庭体验或轻骑行", "芦笛岩或象鼻山二选一"], ["구이린에서 양숴까지 리강 유람선", "양숴 2박", "전원 산책, 가족 체험 또는 가벼운 자전거", "노적암 또는 상비산 중 한 곳"]),
  itinerary: [
    day(1, l("Arrive in Guilin", "抵达桂林", "구이린 도착"), l("Driver pickup and hotel check-in. No guide today.", "司机接机或接站，入住桂林酒店；当天无导游。", "기사 픽업 후 구이린 호텔 체크인. 이날은 가이드가 동행하지 않습니다.")),
    day(2, l("Li River to Yangshuo", "乘漓江游船到阳朔", "리강 유람선으로 양숴 이동"), l("Cruise from Guilin to Yangshuo while your luggage travels separately by road. Stay in Yangshuo.", "乘漓江游船从桂林前往阳朔，行李另车送达；入住阳朔。", "리강 유람선으로 양숴에 이동하며 수하물은 별도 차량으로 운송됩니다.")),
    day(3, l("Yangshuo countryside", "阳朔乡村慢游", "양숴 전원 풍경"), l("A gentle countryside day around the Yulong River landscape, with a family experience or light cycling according to the group.", "游览遇龙河沿线乡村景观，并按客人情况安排家庭体验或轻骑行。", "위룽허 주변 전원 풍경을 둘러보고 구성원에 맞춰 가족 체험 또는 가벼운 자전거를 즐깁니다.")),
    day(4, l("Return to Guilin", "返回桂林", "구이린 귀환"), l("Drive back to Guilin and choose either Reed Flute Cave or Elephant Trunk Hill.", "返回桂林，芦笛岩或象鼻山二选一；入住桂林。", "구이린으로 돌아와 노적암 또는 상비산 중 한 곳을 방문합니다.")),
    day(5, l("Depart Guilin", "桂林返程", "구이린 출발"), l("Driver transfer to the airport or railway station. No guide today.", "司机送往机场或车站；当天无导游。", "전용 차량으로 공항 또는 기차역 이동. 이날은 가이드가 동행하지 않습니다.")),
  ],
  hotelNote: l("Two breakfast-included Ctrip 4-Diamond–rated nights in Guilin and two in Yangshuo. The published 2- and 4-traveller tiers are based on twin sharing; other room arrangements are confirmed manually.", "桂林 2 晚 + 阳朔 2 晚，均为携程 4 钻双标含早；页面公开的 2 人和 4 人档默认两人一间，其他人数的房间配置须人工确认。", "구이린 2박과 양숴 2박 모두 중국 씨트립 기준 4다이아 등급 호텔과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 수동으로 확인합니다."),
  serviceNote: l("Private transfers on Days 1 and 5 and an English guide on Days 2–4 are included, together with the Li River cruise, separate cruise-day luggage transfer, private road transport and the listed adult admission for one Day 4 choice. Day 3 includes one simple family activity or gentle-cycling arrangement selected for the group; it is a basic local experience, not a named premium programme or an unconditional bamboo-rafting promise. No shopping stops.", "含 D1/D5 司机接送、D2–D4 英语导游、漓江游船、D2 行李转运、行程内私车及 D4 二选一项目中的一项成人基础门票。D3 含一项按客人情况确认的基础家庭体验或轻骑行，属于基础当地体验，不承诺指定品牌、高阶项目或无条件竹筏。全程无购物店安排。", "D1·D5 픽업·샌딩, D2~D4 영어 가이드, 리강 유람선, D2 수하물 별도 이동, 전용 차량과 D4 선택 관광지 한 곳의 성인 기본 입장권이 포함됩니다. D3에는 구성원에 맞춰 정하는 간단한 가족 체험 또는 가벼운 자전거 일정 한 가지가 포함되며, 이는 기본 현지 체험으로 특정 프리미엄 프로그램이나 대나무 뗏목을 무조건 보장하지 않습니다. 쇼핑 일정은 없습니다."),
  exclusions: commonExclusions(["Impression Liu Sanjie and other shows", "Bamboo-raft upgrades and the Day 4 attraction not selected"], ["《印象刘三姐》等演出", "竹筏升级及 D4 未选择的另一景点"], ["인상유삼저 등 공연", "대나무 뗏목 업그레이드와 D4에 선택하지 않은 관광지"]),
  bookingNote: l("River levels and weather can change cruise or countryside activities. We will confirm the sailing, cabin class, pier, luggage handover and age or height limits before payment. " + commonBookingNote.en, "水位与天气可能影响游船或乡村体验。付款前会确认船班、舱等、码头、行李交接和年龄/身高限制。" + commonBookingNote.zh, "수위와 날씨에 따라 유람선 또는 전원 체험이 달라질 수 있습니다. 결제 전 선편, 좌석 등급, 선착장, 수하물 인계와 연령·신장 제한을 확인합니다. " + commonBookingNote.ko),
  heroImage: image("/images/guides/yangshuo-town-or-yulong-river-where-to-stay/hero-1600.webp", l("Bamboo rafts on the Yulong River below karst hills in Yangshuo", "阳朔喀斯特山峰与竹林下的遇龙河实景", "양숴 카르스트 산과 대나무 숲 아래 위룽허 풍경"), l("A real Yulong River countryside scene introduces the slower Yangshuo portion of the route; it does not depict the Li River cruise or promise current rafting operations.", "用真实的遇龙河乡村风景呈现阳朔段的慢节奏；这不是漓江游船画面，也不代表当前竹筏一定运营。", "실제 위룽허 전원 풍경으로 양숴 일정의 느린 리듬을 보여 줍니다. 리강 유람선 사진이 아니며 현재 뗏목 운항을 보장하지 않습니다."), 1600, 1000),
  gallery: [
    image("/images/guides/first-trip-china-airport-station-stay-map/guilin-yangshuo-card-1200.webp", l("Homeground planning card comparing Guilin and Yangshuo arrival and stay nodes", "Homeground 桂林与阳朔到达及住宿节点规划卡", "구이린·양숴 도착 및 숙박 거점을 비교한 Homeground 계획 카드"), l("The editorial card separates gateway, stay-base and one-move decisions; it is not a destination photograph or a map to scale.", "这张编辑规划卡区分到达口、住宿基地和一次换住逻辑；它不是目的地照片，也不是按比例绘制的地图。", "도착 관문, 숙박 거점과 한 번의 이동 원칙을 구분한 편집 카드이며, 여행지 사진이나 축척 지도는 아닙니다."), 1200, 675),
    image("/images/guides/yangshuo-town-or-yulong-river-where-to-stay/hero-1600.webp", l("Countryside near the Yulong River in Yangshuo", "阳朔遇龙河乡村风景", "양숴 위룽허 전원 풍경"), l("A slower day among Yangshuo's villages and fields.", "在阳朔乡村留出慢下来的一天。", "양숴의 마을과 들판에서 천천히 보내는 하루.")),
    image("/images/guides/guilin-airport-or-railway-station-arrival-guide/hero-1600.webp", l("The forecourt and entrance of Guilin Railway Station", "桂林站站前广场与进站口", "구이린역 앞 광장과 출입구"), l("Guilin Railway Station is one possible arrival or departure gateway; the actual airport or station is confirmed for each booking.", "桂林站只是可能的到达或返程节点之一；实际机场或车站按订单确认。", "구이린역은 가능한 도착·출발 관문 중 하나이며, 실제 공항이나 역은 예약별로 확정합니다."), 1600, 1000),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Guilin Railway Station arrival", "抵达桂林站", "구이린역 도착"),
        "/images/guides/guilin-airport-or-railway-station-arrival-guide/hero-1600.webp",
        l("The forecourt and entrance of Guilin Railway Station", "桂林站站前广场与进站口", "구이린역 앞 광장과 출입구"),
        l("This photograph identifies Guilin Railway Station only. It is one possible arrival gateway; airport and other-station pickups are confirmed separately.", "照片只展示桂林站。它是可能的到达节点之一；机场或其他车站接送另行确认。", "사진은 구이린역만 보여 줍니다. 가능한 도착 관문 중 하나이며, 공항이나 다른 역 픽업은 별도로 확정합니다."),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Yangshuo after the cruise", "游船抵达后的阳朔", "유람선 도착 후 양숴"),
        "/images/guides/yangshuo-town-or-yulong-river-where-to-stay/hero-1600.webp",
        l("Bamboo rafts on the Yulong River below karst hills in Yangshuo", "阳朔喀斯特山峰与竹林下的遇龙河实景", "양숴 카르스트 산과 대나무 숲 아래 위룽허 풍경"),
        l("The photograph introduces the Yangshuo countryside reached after the Li River cruise; it is a Yulong River scene, not a photograph of the cruise itself.", "照片用于介绍漓江游船抵达后的阳朔乡村；画面是遇龙河，不是漓江游船。", "사진은 리강 유람선 도착 후의 양숴 전원을 소개하며, 리강 유람선이 아닌 위룽허 풍경입니다."),
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Yulong River countryside", "遇龙河乡村", "위룽허 전원"),
        "/images/guides/yangshuo-town-or-yulong-river-where-to-stay/hero-1600.webp",
        l("Bamboo rafts on the Yulong River below karst hills in Yangshuo", "阳朔喀斯特山峰与竹林下的遇龙河实景", "양숴 카르스트 산과 대나무 숲 아래 위룽허 풍경"),
        l("Day 3 uses this countryside setting for one simple family activity or gentle-cycling arrangement; the photograph does not promise bamboo-raft operation.", "D3 在这样的乡村环境中安排一项基础家庭体验或轻骑行；照片不代表竹筏一定运营。", "D3에는 이런 전원 환경에서 간단한 가족 체험 또는 가벼운 자전거 일정 한 가지를 진행하며, 사진이 뗏목 운항을 보장하지는 않습니다."),
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Leaving the Yangshuo countryside", "离开阳朔乡村", "양숴 전원 출발"),
        "/images/guides/yangshuo-town-or-yulong-river-where-to-stay/hero-1600.webp",
        l("Bamboo rafts on the Yulong River below karst hills in Yangshuo", "阳朔喀斯特山峰与竹林下的遇龙河实景", "양숴 카르스트 산과 대나무 숲 아래 위룽허 풍경"),
        l("The route leaves Yangshuo for Guilin before the confirmed Reed Flute Cave or Elephant Trunk Hill choice. This photograph shows the Yulong River departure setting, not either Day 4 attraction.", "当天从阳朔返回桂林，再游览已确认的芦笛岩或象鼻山；照片展示的是离开阳朔前的遇龙河环境，不是 D4 二选一景点。", "이날 양숴에서 구이린으로 돌아간 뒤 확정된 노적암 또는 상비산 중 한 곳을 방문합니다. 사진은 양숴 출발 전 위룽허 풍경이며 D4 선택 명소가 아닙니다."),
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Guilin Railway Station departure", "桂林站返程", "구이린역 출발"),
        "/images/guides/guilin-airport-or-railway-station-arrival-guide/hero-1600.webp",
        l("The forecourt and entrance of Guilin Railway Station", "桂林站站前广场与进站口", "구이린역 앞 광장과 출입구"),
        l("For a confirmed departure from Guilin Railway Station, the driver transfers you here; airport and other-station departures use the confirmed endpoint instead.", "如确认从桂林站返程，司机送至这里；乘飞机或从其他车站出发则按确认节点接送。", "구이린역 출발이 확정되면 기사 차량으로 이곳에 이동하며, 공항이나 다른 역 출발은 확정된 지점에 맞춥니다."),
      ),
    ),
  ],
  packages: [standardPackage("standard-guided", standardLabel, standardSummary, [11490, 7190])],
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
};

const harbinWinter: PrivateTourProduct = {
  id: "private-tour-harbin-winter-5d4n",
  slug: "harbin-winter-5-day-private-tour",
  days: 5,
  nights: 4,
  title: l("Harbin Ice & Snow: 5-Day Private Tour", "哈尔滨冰雪 5 天 4 晚私家团", "하얼빈 빙설 5일 프라이빗 투어"),
  eyebrow: l("A date-specific winter journey", "只在明确冰雪窗口内安排", "기간이 정해진 겨울 여행"),
  lede: l("Experience Harbin's winter architecture, frozen river activities and Ice and Snow World with heated private transport and an itinerary timed for daylight and the night display.", "在明确冰雪季窗口内，用暖风车辆衔接城市建筑、松花江冰雪体验与冰雪大世界夜景。", "정해진 빙설 시즌에 난방 전용 차량으로 도심 건축, 쑹화강 체험과 빙설대세계 야경을 연결합니다."),
  summary: l("Four breakfast-included nights, heated private transport and three English-guided touring days. The displayed price applies only to Sunday–Thursday check-ins within the stated date window, excluding holidays and peak Ice Festival weekends.", "哈尔滨冰雪季携程 4 钻含早住宿 4 晚，D2–D4 英语导游与暖风车辆。基础价仅适用于下方日期窗口内周日至周四入住的非节假日。", "하얼빈에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식, D2~D4 영어 가이드와 난방 차량이 포함됩니다. 기본가는 아래 기간 중 일~목요일 체크인과 비공휴일에만 적용됩니다."),
  highlights: lists(["Central Street and Saint Sophia exterior", "Frozen Songhua River experiences", "Volga Manor or a comparable winter culture program", "Ice and Snow World from afternoon into evening"], ["中央大街与圣索菲亚教堂外观", "松花江冰雪体验", "伏尔加庄园或同等级冬季文化项目", "冰雪大世界下午至夜间时段"], ["중앙대가와 성 소피아 성당 외관", "얼어붙은 쑹화강 체험", "볼가장원 또는 동급 겨울 문화 프로그램", "오후부터 야간까지 빙설대세계"]),
  itinerary: [
    day(1, l("Arrive in Harbin", "抵达哈尔滨", "하얼빈 도착"), l("Winter vehicle pickup and hotel check-in. No guide today.", "冬季车辆接机或接站，入住酒店；当天无导游。", "겨울 운행 차량 픽업 후 호텔 체크인. 이날은 가이드가 동행하지 않습니다.")),
    day(2, l("Historic Harbin and the frozen river", "老城建筑与松花江", "하얼빈 구도심과 쑹화강"), l("Saint Sophia Cathedral exterior, Central Street and a Songhua River ice-and-snow experience.", "圣索菲亚教堂外观、中央大街、松花江冰雪体验。", "성 소피아 성당 외관, 중앙대가, 쑹화강 빙설 체험을 즐깁니다.")),
    day(3, l("Winter culture day", "冬季文化项目", "겨울 문화 일정"), l("Visit Volga Manor or a winter culture program of a comparable level, subject to opening and conditions.", "伏尔加庄园或同等级冬季文化项目，按开放与执行条件确认。", "운영 여부와 현지 상황에 따라 볼가장원 또는 동급 겨울 문화 프로그램을 방문합니다.")),
    day(4, l("Snow sculptures and Ice and Snow World", "雪博会与冰雪大世界", "눈 조각과 빙설대세계"), l("Snow Sculpture Expo or a relaxed morning, then Ice and Snow World from afternoon into evening.", "雪博会或轻松上午；下午至夜间游览冰雪大世界。", "눈조각박람회 또는 여유로운 오전 후 오후부터 야간까지 빙설대세계를 방문합니다.")),
    day(5, l("Depart Harbin", "哈尔滨返程", "하얼빈 출발"), l("Winter vehicle transfer to the airport or railway station. No guide today.", "冬季车辆送往机场或车站；当天无导游。", "겨울 운행 차량으로 공항 또는 기차역 이동. 이날은 가이드가 동행하지 않습니다.")),
  ],
  hotelNote: l("Four nights in a breakfast-included Ctrip 4-Diamond–rated Harbin hotel during the stated ice-and-snow window. The published 2- and 4-traveller tiers are based on twin sharing; other room arrangements are confirmed manually.", "明确冰雪窗口内哈尔滨 4 晚携程 4 钻双标含早；页面公开的 2 人和 4 人档默认两人一间，其他人数的房间配置须人工确认。", "명시된 빙설 기간 동안 하얼빈의 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 수동으로 확인합니다."),
  serviceNote: l("Winter arrival and departure transfers, a heated private vehicle and English guide on Days 2–4, listed adult admission tickets, hot water, headsets and basic heat patches are included. No shopping stops.", "含 D1/D5 冬季车辆接送，D2–D4 英语导游与暖风车辆，行程所列成人基础门票、预约、热水、耳麦与基础暖贴，全程无购物店安排。", "D1·D5 겨울 차량 픽업·샌딩, D2~D4 영어 가이드와 난방 차량, 일정에 명시된 성인 기본 입장권, 온수, 수신기와 기본 핫팩이 포함되며 쇼핑 일정은 없습니다."),
  exclusions: commonExclusions(["Professional cold-weather clothing, snow boots and personal snow equipment", "Ski lessons and unlisted snow activities", "Christmas, New Year, Spring Festival and major Ice Festival weekend surcharges"], ["专业防寒服、雪地靴及个人雪具", "滑雪课程和未列雪上项目", "圣诞、元旦、春节及冰雪节重点周末加价"], ["전문 방한복, 방한화와 개인 설상 장비", "스키 강습과 일정에 없는 설상 활동", "크리스마스, 신정, 춘절 및 빙설제 핵심 주말 추가 요금"]),
  bookingNote: l("The published per-person starting prices cover groups of 2 and 4 travellers, exclude flights and apply only to check-ins from 6 January to 5 February 2027, Sunday through Thursday, on non-holiday dates after the main ice attractions have opened. Other group sizes require manual confirmation. Friday or Saturday stays, Christmas, New Year, Spring Festival, major Ice Festival weekends, or different operating dates require a new quote.", "页面仅公开 2 人和 4 人的每人起价，往返机票另计；其他人数须人工确认。该价格仅适用于 2027 年 1 月 6 日至 2 月 5 日、周日至周四入住、核心冰雪景区已开放的非节假日。周五/周六、圣诞、元旦、春节、冰雪节重点周末，或景区实际开放日期变化，均须重新报价。", "공개된 항공권 제외 1인 시작가는 2명과 4명 기준이며, 그 외 인원은 수동 확인이 필요합니다. 이 가격은 주요 빙설 관광지가 개장한 뒤인 2027년 1월 6일~2월 5일, 일~목요일 체크인, 비공휴일에만 적용됩니다. 금·토요일 숙박, 크리스마스, 신정, 춘절, 빙설제 핵심 주말 또는 개장일 변경 시 반드시 재견적이 필요합니다."),
  heroImage: image("/images/tours/harbin-winter-5-day-private-tour/ice-slide-1600.webp", l("Ice slide at Harbin Ice and Snow World", "哈尔滨冰雪大世界冰滑梯", "하얼빈 빙설대세계 얼음 미끄럼틀"), l("Harbin's winter program is built around confirmed attraction opening dates.", "哈尔滨冰雪行程必须以景区实际开放为前提。", "하얼빈 겨울 일정은 관광지의 실제 개장일을 기준으로 확정합니다."), 1600, 1000),
  gallery: [
    image("/images/tours/harbin-winter-5-day-private-tour/saint-sophia-winter-1600.jpg", l("Saint Sophia Cathedral in Harbin in winter", "冬季哈尔滨圣索菲亚教堂", "겨울 하얼빈 성 소피아 성당"), l("Day 2 begins with Harbin's landmark winter architecture.", "D2 从哈尔滨标志性的冬季建筑开始。", "D2는 하얼빈을 대표하는 겨울 건축에서 시작합니다."), 1600, 1000),
    image("/images/tours/harbin-winter-5-day-private-tour/central-street-winter-1600.jpg", l("Central Street in Harbin in winter", "冬季哈尔滨中央大街", "겨울 하얼빈 중앙대가"), l("Architecture and winter street life on Day 2.", "D2 从城市建筑与冬季街景开始。", "D2는 도시 건축과 겨울 거리 풍경으로 시작합니다."), 1600, 1000),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Harbin winter arrival", "抵达冬季哈尔滨", "겨울 하얼빈 도착"),
        "/images/tours/harbin-winter-5-day-private-tour/central-street-winter-1600.jpg",
        l("Snow-covered Central Street in Harbin", "积雪覆盖的哈尔滨中央大街", "눈 덮인 하얼빈 중앙대가"),
        l("A real winter street scene introduces the Harbin stay; actual snow and weather vary, and the airport or station pickup is confirmed separately.", "用真实冬季街景认识哈尔滨住宿基地；实际积雪与天气会变化，机场或车站接送另行确认。", "실제 겨울 거리 풍경으로 하얼빈 숙박을 소개하며, 적설과 날씨는 달라질 수 있고 공항 또는 역 픽업은 별도로 확정합니다."),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Saint Sophia Cathedral exterior", "圣索菲亚教堂外观", "성 소피아 성당 외관"),
        "/images/tours/harbin-winter-5-day-private-tour/saint-sophia-winter-1600.jpg",
        l("Saint Sophia Cathedral and its snow-covered square at night", "夜间圣索菲亚教堂与积雪广场", "밤의 성 소피아 성당과 눈 덮인 광장"),
        l("The itinerary visits the cathedral exterior; the photograph does not guarantee snow, lighting or interior access on the travel date.", "行程游览教堂外观；照片不保证出行日期一定有积雪、亮灯或可进入内部。", "일정은 성당 외관을 둘러보며, 사진이 여행일의 적설, 조명이나 내부 입장을 보장하지 않습니다."),
      ),
      routeVariant(
        l("Central Street", "中央大街", "중앙대가"),
        "/images/tours/harbin-winter-5-day-private-tour/central-street-winter-1600.jpg",
        l("Snow-covered Central Street in Harbin", "积雪覆盖的哈尔滨中央大街", "눈 덮인 하얼빈 중앙대가"),
        l("Central Street adds Harbin's historic urban texture before the frozen-river experience.", "在前往松花江冰雪体验前，先从中央大街理解哈尔滨的城市建筑。", "얼어붙은 강 체험 전에 중앙대가에서 하얼빈의 역사적 도시 풍경을 만납니다."),
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Harbin winter culture context", "哈尔滨冬季文化背景", "하얼빈 겨울 문화 배경"),
        "/images/tours/harbin-winter-5-day-private-tour/saint-sophia-winter-1600.jpg",
        l("Saint Sophia Cathedral and its snow-covered square at night", "夜间圣索菲亚教堂与积雪广场", "밤의 성 소피아 성당과 눈 덮인 광장"),
        l("This urban winter photograph provides Harbin context; it does not depict Volga Manor or guarantee which comparable Day 3 programme will operate.", "这张城市冬景只用于呈现哈尔滨氛围，并非伏尔加庄园，也不保证 D3 最终采用哪一项同等级项目。", "이 도심 겨울 사진은 하얼빈의 분위기를 보여 줄 뿐 볼가장원을 촬영한 것이 아니며, D3에 어떤 동급 프로그램이 운영될지는 보장하지 않습니다."),
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Ice and Snow World", "冰雪大世界", "빙설대세계"),
        "/images/tours/harbin-winter-5-day-private-tour/ice-slide-1600.webp",
        l("Ice-slide complex at Harbin Ice and Snow World in January 2026", "2026 年 1 月哈尔滨冰雪大世界冰滑梯区域", "2026년 1월 하얼빈 빙설대세계 얼음 미끄럼틀 구역"),
        l("The photograph shows the real attraction in its 2026 season; later opening dates, structures and operations must be reconfirmed.", "照片展示的是景区 2026 冰雪季实景；后续季节的开放日期、建筑与运营均须重新确认。", "사진은 2026 시즌의 실제 관광지를 보여 주며, 이후 시즌의 개장일, 구조물과 운영은 다시 확인해야 합니다."),
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Depart Harbin", "哈尔滨返程", "하얼빈 출발"),
        "/images/tours/harbin-winter-5-day-private-tour/central-street-winter-1600.jpg",
        l("Snow-covered Central Street in Harbin", "积雪覆盖的哈尔滨中央大街", "눈 덮인 하얼빈 중앙대가"),
        l("A final Harbin winter scene closes the stay before the confirmed airport or railway-station transfer.", "用一幅哈尔滨冬景为旅程收尾，再按订单送往机场或车站。", "하얼빈의 겨울 풍경으로 여정을 마친 뒤 예약에 맞춰 공항 또는 기차역으로 이동합니다."),
      ),
    ),
  ],
  packages: [standardPackage("standard-guided-winter", standardLabel, standardSummary, [12990, 9290])],
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
};

const shanghaiSuzhou: PrivateTourProduct = {
  id: "private-tour-shanghai-suzhou-5d4n",
  slug: "shanghai-suzhou-5-day-private-tour",
  days: 5,
  nights: 4,
  title: l("Shanghai & Suzhou: 5-Day Private Tour", "上海·苏州 5 天 4 晚私家团", "상하이·쑤저우 5일 프라이빗 투어"),
  eyebrow: l("Modern Shanghai, one focused Suzhou day", "住在上海，留一天给苏州", "상하이에 머물며 쑤저우를 하루 깊게"),
  lede: l("Stay in one Shanghai hotel while combining the Bund, a water town and a high-speed-rail day trip to Suzhou's gardens and lanes.", "上海连住 4 晚，在外滩、朱家角与城市地标之外，用高铁往返苏州，避免跨城搬运行李。", "상하이 한 호텔에 4박하며 와이탄과 수향마을을 보고, 고속철도로 쑤저우 정원과 골목을 당일치기로 다녀옵니다."),
  summary: l("Four nights in a breakfast-included Ctrip 4-Diamond–rated Shanghai hotel, a half-day arrival guide, three full guided touring days and second-class high-speed rail to and from Suzhou.", "上海 4 晚携程 4 钻含早住宿，D1 英语导游接机半天，D2–D4 英语导游；含上海—苏州高铁二等座往返及两端接驳。", "상하이에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식, D1 반일 공항 영접 가이드, D2~D4 영어 가이드, 쑤저우 왕복 2등석 고속철도가 포함됩니다."),
  highlights: lists(["The Bund, Yu Garden and Shanghai Tower", "Zhujiajiao water town", "High-speed rail to Suzhou", "Humble Administrator's Garden and Pingjiang Road"], ["外滩、豫园与上海中心", "朱家角水乡", "高铁往返苏州", "拙政园与平江路"], ["와이탄, 예원과 상하이타워", "주자자오 수향마을", "고속철도 쑤저우 왕복", "졸정원과 핑장루"]),
  itinerary: [
    day(1, l("Arrive in Shanghai", "抵达上海", "상하이 도착"), l("Private airport pickup with an English-speaking guide for the arrival half-day, then hotel check-in.", "私车接机，英语导游接机半天，随后入住酒店。", "영어 가이드와 전용 차량으로 공항 영접 후 호텔 체크인.")),
    day(2, l("Essential Shanghai", "上海经典城市日", "상하이 핵심 명소"), l("The Bund, Nanjing Road, Yu Garden and the Shanghai Tower observation deck on the 118th floor.", "外滩、南京路、豫园、上海中心 118 层“上海之巅”。", "와이탄, 난징루, 예원, 상하이타워 118층 전망대를 둘러봅니다.")),
    day(3, l("Zhujiajiao and a city choice", "朱家角与市区二选一", "주자자오와 도심 선택 일정"), l("Zhujiajiao water town, followed by either Tianzifang or the Shanghai Museum People's Square branch.", "朱家角水乡；田子坊或上海博物馆人民广场馆二选一。", "주자자오 수향마을 후 톈쯔팡 또는 상하이박물관 인민광장관 중 한 곳을 선택합니다.")),
    day(4, l("Suzhou by high-speed rail", "高铁往返苏州", "고속철도로 쑤저우 당일치기"), l("Second-class high-speed rail to Suzhou for Humble Administrator's Garden, Hanshan Temple and Pingjiang Road, returning to Shanghai the same day.", "高铁二等座前往苏州，游览拙政园、寒山寺、平江路，当日返回上海。", "2등석 고속철도로 쑤저우에 가서 졸정원, 한산사, 핑장루를 둘러보고 당일 상하이로 돌아옵니다.")),
    day(5, l("Depart Shanghai", "上海返程", "상하이 출발"), l("Driver transfer to the airport. No guide today.", "司机送机；当天无导游。", "전용 차량으로 공항 이동. 이날은 가이드가 동행하지 않습니다.")),
  ],
  hotelNote: l("Four nights in one breakfast-included Ctrip 4-Diamond–rated Shanghai hotel. The published 2- and 4-traveller tiers are based on twin sharing; other room arrangements are confirmed manually.", "上海 4 晚同一家携程 4 钻酒店双标含早；页面公开的 2 人和 4 人档默认两人一间，其他人数的房间配置须人工确认。", "상하이 한 곳의 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함되며, 공개된 2명·4명 요금은 2인 1실 기준입니다. 그 외 인원의 객실 구성은 수동으로 확인합니다."),
  serviceNote: l("Arrival pickup with a half-day English guide, guided touring on Days 2–4, departure transfer on Day 5, private road transport, station transfers, second-class rail and listed adult admission tickets are included. No shopping stops.", "含 D1 接机与英语导游半天、D2–D4 英语导游、D5 司机送机；行程内私车、车站接送、上海—苏州高铁二等座往返及行程所列成人基础门票，全程无购物店安排。", "D1 반일 영어 가이드 공항 영접, D2~D4 가이드 일정, D5 공항 샌딩, 전용 차량, 역 이동, 쑤저우 왕복 2등석 열차와 성인 기본 입장권이 포함되며 쇼핑 일정은 없습니다."),
  exclusions: commonExclusions(["Rail upgrades or fare increases", "The Day 3 attraction not selected"], ["高铁升舱或临时涨价", "D3 未选择的另一项目"], ["고속철도 좌석 업그레이드 또는 운임 인상", "D3에 선택하지 않은 다른 관광지"]),
  bookingNote: l("Day 3 includes either Tianzifang or Shanghai Museum People's Square, not both; the choice will be written into your confirmation. Train station, departure, seat class and ticket conditions will also be confirmed before payment. " + commonBookingNote.en, "D3 仅包含田子坊或上海博物馆人民广场馆其中一项，选择会写入确认单；车站、车次、席别和退改条件也会在付款前确认。" + commonBookingNote.zh, "D3에는 톈쯔팡 또는 상하이박물관 인민광장관 중 한 곳만 포함되며 확인서에 명시됩니다. 역, 열차편, 좌석 등급과 취소 조건도 결제 전에 확정합니다. " + commonBookingNote.ko),
  heroImage: image("/images/destinations/shanghai/hero-1600.webp", l("Shanghai skyline seen across the river", "隔江远眺上海天际线", "강 건너 보이는 상하이 스카이라인"), l("Use Shanghai as one comfortable base for city and Suzhou touring.", "以上海为固定住宿点，兼顾城市与苏州游览。", "상하이를 편안한 거점으로 도심과 쑤저우를 함께 둘러봅니다.")),
  gallery: [
    image("/images/tours/shanghai-suzhou-5-day-private-tour/zhujiajiao-water-town.jpg", l("Canal and stone bridge in Zhujiajiao", "朱家角水乡河道与石桥", "주자자오 수로와 돌다리"), l("A water-town day within reach of Shanghai.", "从上海出发，轻松进入江南水乡。", "상하이에서 가까운 강남 수향마을.")),
    image("/images/tours/shanghai-suzhou-5-day-private-tour/humble-administrators-garden.jpg", l("Humble Administrator's Garden in Suzhou", "苏州拙政园", "쑤저우 졸정원"), l("Suzhou's garden is the anchor of the rail day trip.", "以拙政园为苏州一日游核心。", "졸정원을 중심으로 한 쑤저우 당일 일정.")),
    image("/images/destinations/shanghai/bund-architecture-1200.webp", l("Historic buildings on Shanghai's Bund", "上海外滩历史建筑群", "상하이 와이탄의 역사 건축"), l("Classic Shanghai on Day 2.", "D2 集中游览上海经典地标。", "D2에 만나는 상하이의 대표 풍경."), 1200, 800),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Shanghai arrival", "抵达上海", "상하이 도착"),
        "/images/destinations/shanghai/hero-1600.webp",
        l("Historic Puxi rooftops with the Lujiazui skyline across the Huangpu River", "上海浦西历史建筑屋顶与黄浦江对岸的陆家嘴天际线", "상하이 푸시의 역사적 지붕과 황푸강 건너 루자쭈이 스카이라인"),
        l("The two-bank skyline introduces the Shanghai base before the guided arrival half-day and hotel check-in.", "用黄浦江两岸天际线认识上海，再完成接机半日导览与入住。", "황푸강 양안의 스카이라인으로 상하이를 소개한 뒤 반일 공항 영접과 체크인을 진행합니다."),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("The Bund", "外滩", "와이탄"),
        "/images/destinations/shanghai/bund-architecture-1200.webp",
        l("Early twentieth-century buildings along Shanghai's Bund", "上海外滩二十世纪初历史建筑群", "상하이 와이탄의 20세기 초 역사 건축군"),
        l("The Bund anchors the Day 2 route through central Shanghai.", "外滩是 D2 上海经典城市路线的起点。", "와이탄은 D2 상하이 핵심 도심 일정의 중심입니다."),
        1200,
        750,
      ),
      routeVariant(
        l("Shanghai skyline", "上海天际线", "상하이 스카이라인"),
        "/images/destinations/shanghai/hero-1600.webp",
        l("Historic Puxi rooftops with the Lujiazui skyline across the Huangpu River", "上海浦西历史建筑屋顶与黄浦江对岸的陆家嘴天际线", "상하이 푸시의 역사적 지붕과 황푸강 건너 루자쭈이 스카이라인"),
        l("The view connects historic Shanghai with the Pudong skyline visited later in the day.", "这幅景观把历史上海与当天后续前往的浦东天际线放在同一画面中。", "한 장면에서 역사적 상하이와 이날 이어지는 푸둥 스카이라인을 함께 봅니다."),
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Zhujiajiao water town", "朱家角水乡", "주자자오 수향마을"),
        "/images/tours/shanghai-suzhou-5-day-private-tour/zhujiajiao-water-town.jpg",
        l("Canal, stone bridge and whitewashed houses in Zhujiajiao", "朱家角的河道、石桥与白墙民居", "주자자오의 수로, 돌다리와 흰 벽의 집들"),
        l("The real canal scene establishes Zhujiajiao's water-town setting; boat operation and water conditions are not inferred.", "真实河道画面用于呈现朱家角水乡环境，不据此承诺游船运营或水位条件。", "실제 수로 사진은 주자자오 수향마을의 분위기를 보여 주며, 유람선 운항이나 수위 조건을 보장하지 않습니다."),
        1920,
        1280,
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Humble Administrator's Garden", "拙政园", "졸정원"),
        "/images/tours/shanghai-suzhou-5-day-private-tour/humble-administrators-garden.jpg",
        l("Lotus pond and planted landscape in Suzhou's Humble Administrator's Garden", "苏州拙政园的荷池与园林景观", "쑤저우 졸정원의 연못과 정원 풍경"),
        l("The garden is the anchor of the Suzhou rail day trip; flowers, weather and ticket inventory vary.", "拙政园是苏州高铁一日游的核心；花期、天气与门票库存会变化。", "졸정원은 쑤저우 고속철도 당일 일정의 중심이며, 꽃, 날씨와 입장권 재고는 달라질 수 있습니다."),
        1280,
        1707,
        "50% 42%",
      ),
      routeVariant(
        l("Pingjiang Road", "平江路", "핑장루"),
        "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/pingjiang-road-1600.webp",
        l("Stone bridge, canal and whitewashed houses along Pingjiang Road in Suzhou", "苏州平江路的石桥、河道与白墙民居", "쑤저우 핑장루의 돌다리와 운하, 흰 벽의 집들"),
        l("Pingjiang Road closes the Suzhou day at the scale of canals and old lanes.", "最后走进平江路，在河道与街巷的尺度里看苏州。", "마지막에는 핑장루의 운하와 골목을 걸으며 쑤저우를 봅니다."),
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Depart Shanghai", "上海返程", "상하이 출발"),
        "/images/destinations/shanghai/hero-1600.webp",
        l("Historic Puxi rooftops with the Lujiazui skyline across the Huangpu River", "上海浦西历史建筑屋顶与黄浦江对岸的陆家嘴天际线", "상하이 푸시의 역사적 지붕과 황푸강 건너 루자쭈이 스카이라인"),
        l("A final Shanghai skyline closes the stay before the confirmed airport transfer.", "用上海天际线为旅程收尾，再按确认航班送往机场。", "상하이 스카이라인으로 여정을 마친 뒤 확정된 항공편에 맞춰 공항으로 이동합니다."),
      ),
    ),
  ],
  packages: [standardPackage("standard-guided", standardLabel, standardSummary, [9490, 6490])],
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
};

const beijing: PrivateTourProduct = {
  id: "private-tour-beijing-5d4n",
  slug: "beijing-highlights-5-day-private-tour",
  days: 5,
  nights: 4,
  title: l("Beijing Highlights: 5-Day Private Tour", "北京经典 5 天 4 晚私家团", "베이징 핵심 5일 프라이빗 투어"),
  eyebrow: l("One itinerary, two ways to travel", "同一条路线，两种服务方式", "하나의 일정, 두 가지 여행 방식"),
  lede: l("Cover Beijing's imperial landmarks and the Great Wall with private transport, choosing either an English-guided package or a lower-touch version with remote support and no on-site guide.", "用私车串联北京皇城地标与八达岭长城，并在“D2–D4 英语导游”与“现场无导游、提供远程支持”两种版本之间选择。", "전용 차량으로 베이징의 황실 유적과 만리장성을 둘러보며, D2~D4 영어 가이드 포함 또는 현장 가이드 없이 원격 지원을 받는 버전 중 선택합니다."),
  summary: l("Four nights in a breakfast-included Ctrip 4-Diamond–rated hotel, private airport transfers, three private touring days and listed adult admission tickets. Choose the guided or no-guide package.", "北京 4 晚携程 4 钻双标含早，含接送机、3 个游览日私车、行程所列成人基础门票和预约。可选择含英语导游或无导游版本。", "베이징에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식, 공항 이동, 3일 전용 차량 관광, 성인 기본 입장권과 예약 지원이 포함됩니다. 영어 가이드 포함 여부를 선택할 수 있습니다."),
  highlights: lists(["Temple of Heaven and Summer Palace", "Tiananmen Square and the Forbidden City", "Hutong lakes around Shichahai", "Badaling Great Wall and Olympic Park"], ["天坛与颐和园", "天安门广场与故宫", "恭王府、什刹海与后海", "八达岭长城与奥林匹克公园"], ["천단공원과 이화원", "톈안먼광장과 자금성", "공왕부와 스차하이·허우하이", "팔달령 만리장성과 올림픽공원"]),
  itinerary: [
    day(1, l("Arrive in Beijing", "抵达北京", "베이징 도착"), l("Private airport pickup, hotel check-in and free time.", "私车接机，入住酒店，之后自由活动。", "전용 공항 픽업 후 호텔 체크인과 자유 시간.")),
    day(2, l("Temple of Heaven and Summer Palace", "天坛与颐和园", "천단공원과 이화원"), l("Private touring day visiting the Temple of Heaven and Summer Palace.", "游览天坛公园与颐和园，行程内私车。", "전용 차량으로 천단공원과 이화원을 방문합니다.")),
    day(3, l("Imperial Beijing", "皇城北京", "황실 베이징"), l("Tiananmen flag-raising, Tiananmen Square, the Forbidden City, Prince Kung's Mansion and Shichahai or Houhai.", "天安门升旗、天安门广场、故宫、恭王府、什刹海/后海。", "톈안먼 국기 게양식, 톈안먼광장, 자금성, 공왕부, 스차하이 또는 허우하이를 둘러봅니다.")),
    day(4, l("Great Wall", "八达岭长城", "만리장성"), l("Badaling Great Wall, Olympic Park and exterior views of the Bird's Nest and Water Cube.", "八达岭长城、奥林匹克公园、鸟巢与水立方外观。", "팔달령 만리장성, 올림픽공원, 냐오차오와 수이리팡 외관을 방문합니다.")),
    day(5, l("Depart Beijing", "北京返程", "베이징 출발"), l("Check out and take a private transfer to the airport.", "退房后私车送机，返程。", "체크아웃 후 전용 차량으로 공항 이동.")),
  ],
  hotelNote: l("Four nights in a breakfast-included Ctrip 4-Diamond–rated Beijing hotel, based on twin sharing. Final hotel, room arrangement and any single supplement are confirmed for each booking.", "北京 4 晚携程 4 钻酒店双标含早，基础口径为两人一间；具体酒店、房间配置与单房差按订单确认。", "베이징에서 중국 씨트립 기준 4다이아 등급 호텔 4박과 조식이 포함되며 2인 1실 기준입니다. 최종 호텔, 객실 구성과 1인실 추가금은 예약별로 확정합니다."),
  serviceNote: l("Both versions include private airport transfers, private vehicles on the three touring days, listed adult admission tickets, booking support, liability cover and drinking water. The no-guide version has no on-site interpretation; help is provided remotely. No shopping stops.", "两个版本均含接送机、3 个游览日私车、行程所列成人基础门票、预约支持、责任险与车上水。无导游版现场没有讲解服务，仅提供远程支持。全程无购物店安排。", "두 버전 모두 공항 이동, 3일 전용 차량, 일정에 명시된 성인 기본 입장권, 예약 지원, 책임보험과 생수가 포함됩니다. 무가이드 버전은 현장 해설 없이 원격 지원만 제공되며 쇼핑 일정은 없습니다."),
  exclusions: commonExclusions(["Great Wall cable car, slide rail and shuttle bus", "Daxing Airport (PKX) transfer difference"], ["长城缆车、滑车与摆渡车", "北京大兴机场（PKX）接送差价"], ["만리장성 케이블카, 슬라이드 레일과 셔틀버스", "베이징 다싱공항(PKX) 이동 차액"]),
  bookingNote: l("Choose the English-guided or no-guide version first. Tiananmen and Forbidden City availability, hotel, vehicle, arrival airport and luggage capacity must be reconfirmed for your dates before payment. " + commonBookingNote.en, "请先选择含英语导游或无导游版本。天安门与故宫预约、酒店、车型、抵达机场和行李容量都须按日期确认。" + commonBookingNote.zh, "영어 가이드 포함 또는 무가이드 버전을 먼저 선택해 주세요. 톈안먼·자금성 예약, 호텔, 차량, 도착 공항과 수하물 적재량은 결제 전 날짜별로 재확인합니다. " + commonBookingNote.ko),
  heroImage: image("/images/destinations/beijing/hero-1600.webp", l("Beijing's imperial axis and historic architecture", "北京中轴线与历史建筑", "베이징 중축선과 역사 건축"), l("Five days for Beijing's imperial landmarks and the Great Wall.", "用五天游览北京皇城地标与长城。", "베이징의 황실 유적과 만리장성을 위한 5일.")),
  gallery: [
    image("/images/beijing-forbidden-city.jpg", l("The Forbidden City in Beijing", "北京故宫", "베이징 자금성"), l("The central heritage day depends on advance reservation.", "皇城游览日须以实名预约成功为前提。", "핵심 유적 일정은 사전 실명 예약이 필요합니다."), 1600, 1067),
    image("/images/destinations/beijing/great-wall-1200.webp", l("A restored Great Wall section on mountain ridges north of Beijing", "北京北部山脊上的一段修复长城", "베이징 북부 산등성이의 복원된 만리장성 구간"), l("The photograph shows the scale of a ridge-line Great Wall journey; it does not identify this section as Badaling. The itinerary's Badaling booking is confirmed separately.", "照片只呈现北京北部长城沿山脊展开的尺度，不把这段长城标成八达岭；行程中的八达岭预约另行确认。", "이 사진은 베이징 북부 산등성이를 잇는 만리장성의 규모를 보여 줄 뿐, 촬영 구간을 팔달령으로 특정하지 않습니다. 일정의 팔달령 예약은 별도로 확정합니다."), 1200, 750),
    image("/images/guides/temple-of-heaven-gates-and-ritual-sequence/hero-1600.webp", l("Temple of Heaven in Beijing", "北京天坛", "베이징 천단공원"), l("Temple of Heaven opens the guided sightseeing sequence.", "从天坛开始北京核心游览。", "천단공원에서 베이징 핵심 관광을 시작합니다.")),
  ],
  routeMedia: [
    routeGroup(
      1,
      routeVariant(
        l("Beijing arrival", "抵达北京", "베이징 도착"),
        "/images/destinations/beijing/hero-1600.webp",
        l("The Forbidden City seen from the north with central Beijing beyond", "从北侧望向故宫全景与远处北京城区", "북쪽에서 바라본 자금성 전경과 그 너머 베이징 도심"),
        l("The palace precinct introduces the Beijing base; Day 1 remains free after the confirmed airport transfer and hotel check-in.", "用故宫全景认识北京住宿基地；按确认机场接送并入住后，D1 不安排固定游览。", "자금성 전경으로 베이징 숙박 거점을 소개하며, 확정된 공항 이동과 체크인 후 D1에는 고정 관광을 넣지 않습니다."),
      ),
    ),
    routeGroup(
      2,
      routeVariant(
        l("Temple of Heaven", "天坛", "천단공원"),
        "/images/guides/temple-of-heaven-gates-and-ritual-sequence/hero-1600.webp",
        l("Hall of Prayer for Good Harvests in the Temple of Heaven", "北京天坛祈年殿", "베이징 천단공원 기년전"),
        l("The photograph identifies the Hall of Prayer for Good Harvests, not an entrance gate or a guaranteed internal route.", "照片展示的是天坛祈年殿，不代表具体入园门或保证固定内部路线。", "사진은 천단공원 기년전을 보여 주며, 입장 문이나 고정 내부 동선을 보장하지 않습니다."),
      ),
      routeVariant(
        l("Summer Palace", "颐和园", "이화원"),
        "/images/guides/summer-palace-gates-route-and-boat-plan/hero-1600.webp",
        l("Kunming Lake, Seventeen-Arch Bridge and boats at the Summer Palace", "颐和园昆明湖、十七孔桥与游船", "이화원 쿤밍호, 십칠공교와 배"),
        l("The lake-and-bridge view establishes the Summer Palace setting; boat operation and the exact visit route are confirmed separately.", "湖桥景观用于呈现颐和园环境；游船运营与具体游览路线另行确认。", "호수와 다리 풍경은 이화원의 환경을 보여 주며, 유람선 운항과 실제 동선은 별도로 확인합니다."),
      ),
    ),
    routeGroup(
      3,
      routeVariant(
        l("Forbidden City precinct", "故宫宫城", "자금성 권역"),
        "/images/destinations/beijing/hero-1600.webp",
        l("The Forbidden City seen from the north with central Beijing beyond", "从北侧望向故宫全景与远处北京城区", "북쪽에서 바라본 자금성 전경과 그 너머 베이징 도심"),
        l("The photograph shows the scale of the palace precinct; Tiananmen and Forbidden City admission still depend on successful advance reservation.", "照片只呈现故宫宫城尺度；天安门与故宫仍须以实名预约成功为前提。", "사진은 자금성 권역의 규모를 보여 주며, 톈안먼과 자금성 입장은 사전 실명 예약 성공을 전제로 합니다."),
      ),
      routeVariant(
        l("Hutong neighbourhood scale", "胡同街区尺度", "후퉁 지역 풍경"),
        "/images/destinations/beijing/gulou-hutong-1200.webp",
        l("Drum Tower and Bell Tower above hutong roofs in Beijing", "北京钟鼓楼与胡同屋顶全景", "베이징 종루·고루와 후퉁 지붕 전경"),
        l("The neighbourhood view provides context for the Shichahai and Houhai portion of Day 3 without claiming a specific lane or vehicle entrance.", "街区全景为 D3 什刹海与后海段提供环境背景，不把画面标成某条具体胡同或车辆入口。", "지역 전경은 D3 스차하이·허우하이 구간의 맥락을 보여 주며, 특정 골목이나 차량 진입구로 특정하지 않습니다."),
        1200,
        750,
      ),
    ),
    routeGroup(
      4,
      routeVariant(
        l("Great Wall ridge journey", "长城山脊之旅", "만리장성 산등성이 여정"),
        "/images/destinations/beijing/great-wall-1200.webp",
        l("A restored Great Wall section on mountain ridges north of Beijing", "北京北部山脊上的一段修复长城", "베이징 북부 산등성이의 복원된 만리장성 구간"),
        l("The photograph does not identify this section as Badaling. The itinerary's Badaling reservation, access and attraction transport are confirmed separately.", "照片不把这段长城标成八达岭；行程中的八达岭预约、入园与景交另行确认。", "사진 속 구간을 팔달령으로 특정하지 않습니다. 일정의 팔달령 예약, 입장과 관광지 이동은 별도로 확정합니다."),
        1200,
        750,
      ),
    ),
    routeGroup(
      5,
      routeVariant(
        l("Depart Beijing", "北京返程", "베이징 출발"),
        "/images/destinations/beijing/hero-1600.webp",
        l("The Forbidden City seen from the north with central Beijing beyond", "从北侧望向故宫全景与远处北京城区", "북쪽에서 바라본 자금성 전경과 그 너머 베이징 도심"),
        l("A final Beijing city view closes the stay before the confirmed airport transfer.", "用北京城市全景为旅程收尾，再按确认机场与航班送机。", "베이징 도시 전경으로 여정을 마친 뒤 확정된 공항과 항공편에 맞춰 이동합니다."),
      ),
    ),
  ],
  packages: [
    guidedPackage("english-guided", "guided", l("English-guided", "含英语导游", "영어 가이드 포함"), l("An English-speaking guide accompanies Days 2–4; Days 1 and 5 are private driver transfers.", "D2–D4 英语导游陪同，D1/D5 为司机接送。", "D2~D4 영어 가이드 동행, D1·D5는 기사 픽업·샌딩입니다."), [7302, 4806]),
    guidedPackage("no-guide", "self-guided", l("No on-site guide", "无导游版", "현장 가이드 없음"), l("Private transport, listed adult admission tickets, reservations and remote support are included, but there is no on-site guide or interpretation. No shopping stops.", "含私车、行程所列成人基础门票、预约与远程支持；现场无导游，也不含讲解服务，全程无购物店安排。", "전용 차량, 일정에 명시된 성인 기본 입장권, 예약과 원격 지원은 포함되지만 현장 가이드와 해설은 없으며 쇼핑 일정도 없습니다."), [4973, 3974]),
  ],
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
};

export const privateTourProducts: readonly PrivateTourProduct[] = Object.freeze([
  shanghaiSuzhouHangzhou,
  chengdu,
  xian,
  chongqingWulong,
  guilinYangshuo,
  harbinWinter,
  shanghaiSuzhou,
  beijing,
]);

const englishMetadataDescriptions: Readonly<Record<string, string>> = Object.freeze({
  "shanghai-suzhou-hangzhou-6-day-private-tour":
    "Six-day private tour linking Shanghai, Suzhou and Hangzhou, with Ctrip 4-Diamond stays, four guided days and private transfers.",
  "harbin-winter-5-day-private-tour":
    "Five-day private Harbin winter tour with Ctrip 4-Diamond stays, a heated vehicle and three guided days. Date-window and peak-period conditions apply.",
  "guilin-yangshuo-5-day-private-tour":
    "Five-day private Guilin and Yangshuo tour with the Li River cruise, three guided days, private transfers and four Ctrip 4-Diamond hotel nights.",
  "shanghai-suzhou-5-day-private-tour":
    "Five-day private Shanghai and Suzhou tour with a Ctrip 4-Diamond stay, guided sightseeing, private transfers and return high-speed rail.",
  "beijing-highlights-5-day-private-tour":
    "Five-day private Beijing tour with a Ctrip 4-Diamond stay, airport transfers, three touring days and listed admissions. Guided and no-guide options.",
});

export const privateTourProductsBySlug: Readonly<Record<string, PrivateTourProduct>> =
  Object.freeze(Object.fromEntries(privateTourProducts.map((product) => [product.slug, product])));

export function getPrivateTourProduct(slug: string): PrivateTourProduct | undefined {
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
  const selectedPackage = product.packages.find((candidate) => candidate.id === packageId);
  if (!selectedPackage) {
    throw new RangeError(`Unknown package "${packageId}" for private tour "${product.slug}".`);
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
    metadataTitle: product.title[locale],
    metadataDescription:
      locale === "en"
        ? englishMetadataDescriptions[product.slug] ?? product.summary.en
        : product.summary[locale],
    openGraphLocale: locale === "en" ? "en_US" : locale === "zh" ? "zh_CN" : "ko_KR",
    eyebrow: product.eyebrow[locale],
    lede: product.lede[locale],
    summary: product.summary[locale],
    highlights: product.highlights[locale],
    days: product.days,
    nights: product.nights,
    itinerary: product.itinerary.map((item) => ({
      day: item.day,
      title: item.title[locale],
      description: item.description[locale],
    })),
    hotelNote: product.hotelNote[locale],
    serviceNote: product.serviceNote[locale],
    exclusions: product.exclusions[locale],
    bookingNote: product.bookingNote[locale],
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
