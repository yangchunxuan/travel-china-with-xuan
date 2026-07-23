import type { HomegroundLocale } from "./homegroundI18n";

const SITE_URL = "https://homegroundchina.com";

export const guideIds = [
  "zhangjiajie-itinerary",
  "zhangjiajie-glass-bridge-vs-skywalk",
  "kevin-before-the-hotel-pickup",
  "best-zhangjiajie-night-show",
  "beijing-zhangjiajie-shanghai-10-days",
  "beijing-zhangjiajie-shanghai-transport",
  "is-your-china-itinerary-too-rushed",
] as const;

export type GuideId = (typeof guideIds)[number];

export type GuideFormat =
  | "itinerary"
  | "route-analysis"
  | "transport"
  | "decision-guide"
  | "field-note"
  | "planning-guide";

export type GuideTopic =
  | "itinerary-design"
  | "pace"
  | "transport"
  | "attractions"
  | "evenings"
  | "trip-planning"
  | "on-the-ground";

export type GuideDestination =
  | "china"
  | "beijing"
  | "zhangjiajie"
  | "shanghai";

export interface GuideLocaleEntry {
  path: string;
  title: string;
  headline: string;
  description: string;
  heroAlt: string;
  navTitle: string;
  featuredLinkLabel: string;
  openGraphLocale: string;
}

export interface GuideEntry {
  id: GuideId;
  /** Kept for compatibility with existing article and homepage consumers. */
  type: "route" | "planning" | "field-note";
  featured: boolean;
  format: GuideFormat;
  topics: readonly GuideTopic[];
  destinations: readonly GuideDestination[];
  homeFeaturedRank?: number;
  /** Optional editorial crop for guide cards; social metadata keeps the hero. */
  cardImagePath?: string;
  cardImageWidth?: number;
  cardImageHeight?: number;
  heroImagePath: string;
  heroImageUrl: string;
  imageWidth: number;
  imageHeight: number;
  datePublished: string;
  dateModified: string;
  sourceReviewedDate: string;
  locales: Record<HomegroundLocale, GuideLocaleEntry>;
}

export const guideRegistry = [
  {
    id: "zhangjiajie-itinerary",
    type: "route",
    featured: true,
    format: "itinerary",
    topics: ["itinerary-design", "pace", "trip-planning"],
    destinations: ["zhangjiajie"],
    homeFeaturedRank: 1,
    heroImagePath: "/images/guides/zhangjiajie/hero-1600.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/zhangjiajie/hero-1600.jpg",
    imageWidth: 1600,
    imageHeight: 954,
    datePublished: "2026-07-20",
    dateModified: "2026-07-22",
    sourceReviewedDate: "2026-07-21",
    locales: {
      en: {
        path: "/guides/zhangjiajie-itinerary/",
        title: "Zhangjiajie Itinerary: What Fits in 2, 3 or 4 Days",
        headline: "Zhangjiajie in 2, 3 or 4 Days: What Actually Fits",
        description:
          "A realistic Zhangjiajie itinerary for 2, 3 or 4 days, with exact park sequences, full-day and night-count rules, what to skip and when Fenghuang fits.",
        heroAlt:
          "Sandstone pillars rising through mist in Zhangjiajie National Forest Park.",
        navTitle: "Zhangjiajie guide",
        featuredLinkLabel: "See what actually fits in 2–4 days",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/zhangjiajie-itinerary/",
        title: "张家界 2、3、4 天行程：时间到底够不够",
        headline: "张家界玩 2、3 或 4 天，分别能安排什么？",
        description:
          "一份现实可行的张家界 2–4 天指南：森林公园具体顺序、完整游览日与住宿晚数、景点取舍，以及凤凰古城什么时候适合作为下一站。",
        heroAlt: "云雾中的张家界国家森林公园石英砂岩峰林。",
        navTitle: "张家界路线指南",
        featuredLinkLabel: "查看张家界 2–4 天到底能安排什么",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/zhangjiajie-itinerary/",
        title: "장자제 2·3·4일 일정: 실제로 어디까지 가능할까",
        headline: "장자제 2일, 3일, 4일—실제로 가능한 일정",
        description:
          "장자제 2~4일의 공원 순서, 온전한 관광일과 숙박일 계산, 제외할 곳과 펑황고성을 다음 목적지로 넣는 조건을 현실적으로 정리했습니다.",
        heroAlt: "안개 사이로 솟아오른 장자제 국가삼림공원의 사암 봉우리.",
        navTitle: "장자제 일정 가이드",
        featuredLinkLabel: "장자제에서 2~4일 동안 가능한 일정 보기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "zhangjiajie-glass-bridge-vs-skywalk",
    type: "field-note",
    featured: true,
    format: "field-note",
    topics: ["attractions", "trip-planning", "on-the-ground"],
    destinations: ["zhangjiajie"],
    homeFeaturedRank: 3,
    cardImagePath:
      "/images/guides/tantan-zhangjiajie/tantan-hero-1200.jpg",
    cardImageWidth: 1200,
    cardImageHeight: 1500,
    heroImagePath:
      "/images/guides/tantan-zhangjiajie/tantan-hero-og-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/tantan-zhangjiajie/tantan-hero-og-1200.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    datePublished: "2026-07-23",
    dateModified: "2026-07-23",
    sourceReviewedDate: "2026-07-22",
    locales: {
      en: {
        path: "/guides/zhangjiajie-glass-bridge-vs-skywalk/",
        title: "Zhangjiajie Glass Bridge vs Skywalk: Tantan’s 7 Checks",
        headline:
          "The Glass Bridge Is Not the Glass Skywalk: 7 Things Tantan Checks Before a Zhangjiajie Trip",
        description:
          "Meet Tantan and discover seven details she checks—from glass attractions and timing to hotels and ticket inclusions—when planning a Zhangjiajie trip.",
        heroAlt:
          "Tantan smiling while using a wooden pestle beneath a bamboo-roofed shelter.",
        navTitle: "Tantan’s Zhangjiajie field note",
        featuredLinkLabel: "Read Tantan’s seven on-the-ground checks",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/zhangjiajie-glass-bridge-vs-skywalk/",
        title: "张家界玻璃桥和玻璃栈道有什么区别？Tantan 核对的 7 个细节",
        headline:
          "玻璃桥不是玻璃栈道：Tantan 在张家界替客人核对的 7 个细节",
        description:
          "从玻璃桥与玻璃栈道、真实游览时间，到酒店位置和门票包含项：看看 Tantan 在张家界行程付款前会替客人核对的 7 个细节。",
        heroAlt: "Tantan 在竹棚下体验用木杵舂制食物。",
        navTitle: "Tantan 的张家界现场笔记",
        featuredLinkLabel: "阅读 Tantan 在现场会核对的 7 个细节",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/zhangjiajie-glass-bridge-vs-skywalk/",
        title: "장가계 유리다리·유리잔도 차이｜여행 전 확인할 7가지",
        headline:
          "유리다리와 유리잔도는 다릅니다: 탄탄이 장가계 여행 전 확인하는 7가지",
        description:
          "장가계 대협곡 유리다리와 천문산 유리잔도는 서로 다른 코스입니다. 탄탄이 관광지 이름, 이동 시간, 숙소 위치와 포함 항목 등 예약 전 확인할 7가지를 전합니다.",
        heroAlt: "대나무 지붕 아래에서 긴 나무 공이로 절구 체험을 하는 탄탄.",
        navTitle: "탄탄의 장가계 현장 노트",
        featuredLinkLabel: "탄탄이 현장에서 확인하는 7가지 보기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "kevin-before-the-hotel-pickup",
    type: "field-note",
    featured: false,
    format: "field-note",
    topics: ["trip-planning", "on-the-ground"],
    destinations: ["china", "zhangjiajie"],
    heroImagePath:
      "/images/guides/kevin-preparation/kevin-hero-og-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/kevin-preparation/kevin-hero-og-1200.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    datePublished: "2026-07-23",
    dateModified: "2026-07-23",
    sourceReviewedDate: "2026-07-23",
    locales: {
      en: {
        path: "/guides/kevin-before-the-hotel-pickup/",
        title:
          "Before the Hotel Pickup: How Kevin Prepares a Guided Day in China",
        headline:
          "Before the Hotel Pickup: How Kevin Prepares a Guided Day in China",
        description:
          "Kevin explains what happens before a guided day begins—from reservations and pickup details to traveller needs, backup routes and the next handoff.",
        heroAlt:
          "Kevin standing beside the coast in warm evening light.",
        navTitle: "Kevin’s pre-departure field note",
        featuredLinkLabel: "See how Kevin prepares before meeting a guest",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/kevin-before-the-hotel-pickup/",
        title: "酒店接人之前：Kevin 如何为中国一日行程做准备",
        headline: "客人看到的是一天行程，Kevin 的准备从见面前就开始了",
        description:
          "从预订时间、接送位置，到客人的身体与饮食需求、备用路线和下一站交接，看看 Kevin 如何在见面前准备好一天。",
        heroAlt: "Kevin 在傍晚海边的暖色光线中留影。",
        navTitle: "Kevin 的出发前现场笔记",
        featuredLinkLabel: "看看 Kevin 在见到客人前如何准备",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/kevin-before-the-hotel-pickup/",
        title: "호텔 픽업 전부터 시작되는 하루: Kevin의 중국 일정 준비",
        headline:
          "손님에게는 하루 일정이지만, Kevin의 준비는 만나기 전부터 시작됩니다",
        description:
          "예약과 픽업 장소부터 여행자의 건강·식사 정보, 대체 동선과 다음 일정 인계까지 Kevin이 여행 하루를 준비하는 과정을 소개합니다.",
        heroAlt: "따뜻한 저녁빛이 비치는 해안가에 서 있는 Kevin.",
        navTitle: "Kevin의 출발 전 현장 노트",
        featuredLinkLabel: "Kevin이 손님을 만나기 전에 준비하는 과정 보기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "best-zhangjiajie-night-show",
    type: "planning",
    featured: false,
    format: "decision-guide",
    topics: ["evenings", "trip-planning", "attractions"],
    destinations: ["zhangjiajie"],
    heroImagePath:
      "/images/guides/best-zhangjiajie-night-show/night-show-decision-1536.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/best-zhangjiajie-night-show/night-show-decision-1536.jpg",
    imageWidth: 1536,
    imageHeight: 1024,
    datePublished: "2026-07-22",
    dateModified: "2026-07-22",
    sourceReviewedDate: "2026-07-22",
    locales: {
      en: {
        path: "/guides/best-zhangjiajie-night-show/",
        title: "Best Zhangjiajie Night Show? Compare 3 Major Shows",
        headline: "Which Zhangjiajie Night Show Fits Your Trip?",
        description:
          "Compare Tianmen Fox Fairy, Charming Xiangxi and Eternal Love by hotel base, weather, English support and next-day timing—and when to skip all three.",
        heroAlt:
          "Editorial illustration comparing an outdoor canyon stage, folk-performance objects and an indoor theatre.",
        navTitle: "Zhangjiajie night-show guide",
        featuredLinkLabel: "Compare three shows against the whole evening",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/best-zhangjiajie-night-show/",
        title: "张家界三大夜间演出怎么选？天门狐仙、魅力湘西、千古情对比",
        headline: "哪一场张家界夜间演出真正适合你的行程？",
        description:
          "按酒店位置、天气、英语支持和次日安排，对比天门狐仙、魅力湘西与张家界千古情，并判断什么时候三场都不看更合理。",
        heroAlt: "对比峡谷实景舞台、民俗演艺意象与室内剧场的编辑插画。",
        navTitle: "张家界夜间演出指南",
        featuredLinkLabel: "把三场演出放进整个晚上再比较",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/best-zhangjiajie-night-show/",
        title: "장자제 야간 공연 비교: 천문호선·매력상서·천고정",
        headline: "어떤 장자제 야간 공연이 내 일정에 맞을까요?",
        description:
          "숙소 위치, 날씨, 영어 지원, 다음 날 일정으로 천문호선·매력상서·장자제 천고정을 비교하고, 세 공연을 모두 건너뛰는 편이 나은 경우도 확인하세요.",
        heroAlt: "야외 협곡 무대, 민속 공연 소품, 실내 극장을 비교하는 편집 일러스트.",
        navTitle: "장자제 야간 공연 가이드",
        featuredLinkLabel: "세 공연을 저녁 전체 일정과 함께 비교하기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "beijing-zhangjiajie-shanghai-10-days",
    type: "planning",
    featured: false,
    format: "route-analysis",
    topics: ["itinerary-design", "pace", "trip-planning"],
    destinations: ["beijing", "zhangjiajie", "shanghai"],
    heroImagePath:
      "/images/guides/beijing-zhangjiajie-shanghai-10-days/zhangjiajie-base-1800.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/beijing-zhangjiajie-shanghai-10-days/zhangjiajie-base-1800.jpg",
    imageWidth: 1800,
    imageHeight: 1200,
    datePublished: "2026-07-21",
    dateModified: "2026-07-22",
    sourceReviewedDate: "2026-07-21",
    locales: {
      en: {
        path: "/guides/beijing-zhangjiajie-shanghai-10-days/",
        title: "Beijing–Zhangjiajie–Shanghai in 10 Days: Is It Realistic?",
        headline:
          "Beijing–Zhangjiajie–Shanghai in 10 Days: Is It Actually Realistic?",
        description:
          "Can Beijing, Zhangjiajie and Shanghai fit into 10 days? Count the real sightseeing days, see the trade-offs, and test whether your exact trip still works.",
        heroAlt:
          "Zhangjiajie city buildings beside a river, with mountains rising behind them.",
        navTitle: "10-day China route guide",
        featuredLinkLabel: "Check whether three cities really fit into 10 days",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/beijing-zhangjiajie-shanghai-10-days/",
        title: "北京—张家界—上海 10 天够吗？现实路线拆解",
        headline: "北京—张家界—上海，10 天真的够吗？",
        description:
          "北京、张家界和上海能否放进 10 天？先计算真正完整的游览日，再看每座城市必须做出的取舍，以及你的具体行程是否仍然成立。",
        heroAlt: "河畔的张家界市区楼房，背后为群山。",
        navTitle: "北京—张家界—上海 10 天指南",
        featuredLinkLabel: "检查三座城市能否真正放进 10 天",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/beijing-zhangjiajie-shanghai-10-days/",
        title: "베이징·장자제·상하이 10일 일정, 현실적으로 가능할까",
        headline: "베이징·장자제·상하이 10일 여행, 현실적으로 가능할까요?",
        description:
          "베이징·장자제·상하이를 10일 안에 여행할 수 있을까요? 실제 관광일을 계산하고, 도시별로 무엇을 포기해야 하는지, 내 일정도 가능한지 확인해 보세요.",
        heroAlt: "강 건너 장자제 시내와 그 뒤로 이어지는 산봉우리.",
        navTitle: "베이징·장자제·상하이 10일 가이드",
        featuredLinkLabel: "세 도시를 10일에 넣을 수 있는지 확인하기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "beijing-zhangjiajie-shanghai-transport",
    type: "planning",
    featured: false,
    format: "transport",
    topics: ["transport", "trip-planning"],
    destinations: ["beijing", "zhangjiajie", "shanghai"],
    heroImagePath:
      "/images/guides/beijing-zhangjiajie-shanghai-transport/zhangjiajie-west-1600.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/beijing-zhangjiajie-shanghai-transport/zhangjiajie-west-1600.jpg",
    imageWidth: 1600,
    imageHeight: 692,
    datePublished: "2026-07-22",
    dateModified: "2026-07-22",
    sourceReviewedDate: "2026-07-22",
    locales: {
      en: {
        path: "/guides/beijing-zhangjiajie-shanghai-transport/",
        title: "Beijing–Zhangjiajie–Shanghai: Train or Flight?",
        headline:
          "Beijing → Zhangjiajie → Shanghai: What the Travel Days Actually Cost",
        description:
          "Compare the real door-to-door time from Beijing to Zhangjiajie to Shanghai by train and plane, including station and airport transfers and late arrivals.",
        heroAlt:
          "Wide view of Zhangjiajie West Railway Station and its forecourt.",
        navTitle: "Beijing–Zhangjiajie–Shanghai transport guide",
        featuredLinkLabel: "Compare the real train and flight time",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/beijing-zhangjiajie-shanghai-transport/",
        title: "北京—张家界—上海：坐高铁还是飞机？",
        headline: "北京 → 张家界 → 上海：两段交通真正会占掉多少时间",
        description:
          "飞行时间看起来更短，但机场接驳、提前到达和深夜落地都会改变结果。对比北京—张家界—上海坐飞机与高铁的真实门到门时间。",
        heroAlt: "张家界西站及站前广场的横向全景。",
        navTitle: "北京—张家界—上海交通指南",
        featuredLinkLabel: "比较飞机与高铁的真实时间",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/beijing-zhangjiajie-shanghai-transport/",
        title: "베이징–장자제–상하이: 기차와 비행기 중 무엇이 나을까?",
        headline: "베이징 → 장자제 → 상하이: 이동일에 실제로 드는 시간",
        description:
          "비행시간만 보면 항공편이 빠르지만 공항 이동과 늦은 도착까지 계산하면 답이 달라집니다. 베이징–장자제–상하이 구간의 출발지부터 목적지까지 실제 총이동 시간을 비교합니다.",
        heroAlt: "장자제서역과 역 앞 광장의 넓은 전경.",
        navTitle: "베이징–장자제–상하이 교통 가이드",
        featuredLinkLabel: "기차와 항공편의 실제 시간 비교",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "is-your-china-itinerary-too-rushed",
    type: "planning",
    featured: true,
    format: "planning-guide",
    topics: ["pace", "itinerary-design", "trip-planning"],
    destinations: ["china"],
    homeFeaturedRank: 2,
    heroImagePath:
      "/images/guides/china-itinerary-reality/transfer-platform-soft-focus-1200.webp",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/china-itinerary-reality/transfer-platform-soft-focus-1200.webp",
    imageWidth: 1200,
    imageHeight: 800,
    datePublished: "2026-07-22",
    dateModified: "2026-07-22",
    sourceReviewedDate: "2026-07-22",
    locales: {
      en: {
        path: "/guides/is-your-china-itinerary-too-rushed/",
        title: "China Itinerary Too Rushed? A Practical Check",
        headline: "Is Your China Itinerary Too Rushed?",
        description:
          "Check whether your China itinerary is too rushed by testing city changes, door-to-door transfers, hotel moves, fixed bookings and recovery time.",
        heroAlt:
          "A softened railway platform used as a non-location-specific illustration of a transfer day.",
        navTitle: "China itinerary pace guide",
        featuredLinkLabel: "Check whether your China itinerary is too rushed",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/is-your-china-itinerary-too-rushed/",
        title: "中国行程是不是太赶？一份现实检查",
        headline: "你的中国行程是不是太赶了？",
        description:
          "从换城市、门到门转场、换酒店、固定预约与恢复时间，判断你的中国行程是否安排得太赶。",
        heroAlt: "经过柔化处理的火车站站台，用于表达旅行转场日。",
        navTitle: "中国行程节奏指南",
        featuredLinkLabel: "检查你的中国行程是否太赶",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/is-your-china-itinerary-too-rushed/",
        title: "중국 여행 일정이 너무 빠듯한가요? 현실 점검 가이드",
        headline: "중국 여행 일정이 너무 빠듯한가요?",
        description:
          "도시 이동, 출발지부터 도착지까지의 전체 이동, 숙소 변경, 고정 예약과 회복 시간을 기준으로 중국 여행 일정이 너무 빠듯한지 확인해 보세요.",
        heroAlt: "이동일을 표현하기 위해 부드럽게 처리한 기차역 승강장 이미지.",
        navTitle: "중국 일정 속도 가이드",
        featuredLinkLabel: "중국 일정이 너무 빠듯한지 확인하기",
        openGraphLocale: "ko_KR",
      },
    },
  },
] as const satisfies readonly GuideEntry[];

export function getGuideEntry(
  id: GuideId,
  locale: HomegroundLocale = "en",
) {
  const guide = guideRegistry.find((entry) => entry.id === id);

  if (!guide) {
    throw new Error(`Unknown guide: ${id}`);
  }

  const localized = guide.locales[locale];
  const cardImagePath =
    "cardImagePath" in guide ? guide.cardImagePath : guide.heroImagePath;
  const cardImageWidth =
    "cardImageWidth" in guide ? guide.cardImageWidth : guide.imageWidth;
  const cardImageHeight =
    "cardImageHeight" in guide ? guide.cardImageHeight : guide.imageHeight;

  return {
    ...guide,
    ...localized,
    cardImagePath,
    cardImageWidth,
    cardImageHeight,
    canonicalPath: localized.path,
    canonicalUrl: `${SITE_URL}${localized.path}`,
  };
}

export function getFeaturedGuides(
  locale: HomegroundLocale = "en",
  limit = 3,
) {
  return getHomeFeaturedGuides(locale).slice(0, Math.max(0, limit));
}

export function getHomeFeaturedGuides(
  locale: HomegroundLocale = "en",
) {
  return guideRegistry
    .filter((entry) => "homeFeaturedRank" in entry)
    .sort((a, b) => a.homeFeaturedRank - b.homeFeaturedRank)
    .map((entry) => getGuideEntry(entry.id, locale));
}

export function getAllGuides(locale: HomegroundLocale = "en") {
  return guideRegistry
    .map((entry, registryIndex) => ({
      entry,
      registryIndex,
    }))
    .sort(
      (a, b) =>
        b.entry.dateModified.localeCompare(a.entry.dateModified) ||
        b.entry.datePublished.localeCompare(a.entry.datePublished) ||
        a.registryIndex - b.registryIndex,
    )
    .map(({ entry }) => getGuideEntry(entry.id, locale));
}

export function getGuideLanguagePaths(id: GuideId) {
  const en = getGuideEntry(id, "en").canonicalPath;
  const zh = getGuideEntry(id, "zh").canonicalPath;
  const ko = getGuideEntry(id, "ko").canonicalPath;

  return {
    en,
    ko,
    "zh-Hans": zh,
    "x-default": en,
  } as const;
}

export function getGuideLanguageUrls(id: GuideId) {
  const paths = getGuideLanguagePaths(id);

  return Object.fromEntries(
    Object.entries(paths).map(([language, path]) => [
      language,
      `${SITE_URL}${path}`,
    ]),
  ) as Record<keyof typeof paths, string>;
}
