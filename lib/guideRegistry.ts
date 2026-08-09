import { homegroundLocales, type HomegroundLocale } from "./homegroundI18n";

const SITE_URL = "https://homegroundchina.com";

export const guideIds = [
  "zhangjiajie-itinerary",
  "zhangjiajie-from-malaysia",
  "zhangjiajie-glass-bridge-vs-skywalk",
  "kevin-before-the-hotel-pickup",
  "zhangjiajie-older-travellers",
  "best-zhangjiajie-night-show",
  "beijing-zhangjiajie-shanghai-10-days",
  "beijing-zhangjiajie-shanghai-transport",
  "is-your-china-itinerary-too-rushed",
  "china-itinerary-with-older-parents",
  "do-us-citizens-need-visa-china-2026",
  "china-visa-free-uk-citizens-2026",
  "china-visa-free-canadian-citizens-2026",
  "china-visa-free-new-zealand-citizens-2026",
  "china-240-hour-visa-free-transit-route-check",
  "do-singaporeans-need-visa-china",
  "why-are-hotels-in-china-so-cheap",
  "do-you-need-a-tour-guide-in-china",
  "how-much-does-a-china-trip-cost",
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
  | "on-the-ground"
  | "accommodation";

export type GuideDestination =
  "china" | "beijing" | "xian" | "zhangjiajie" | "shanghai";

export type GuidePillar =
  "routes-and-pace" | "transport" | "entry-rules" | "field-notes";

export type GuideAudienceMarket =
  "global" | "malaysia" | "uk" | "us" | "canada" | "singapore" | "new-zealand";

export interface GuideLocaleEntry {
  path: string;
  title: string;
  headline: string;
  description: string;
  heroAlt: string;
  cardImageAlt?: string;
  navTitle: string;
  featuredLinkLabel: string;
  openGraphLocale: string;
}

export interface GuideEntry {
  id: GuideId;
  /** Kept for compatibility with existing article and homepage consumers. */
  type: "route" | "planning" | "field-note";
  featured: boolean;
  pillar: GuidePillar;
  audienceMarkets: readonly GuideAudienceMarket[];
  format: GuideFormat;
  topics: readonly GuideTopic[];
  destinations: readonly GuideDestination[];
  homeFeaturedRank?: number;
  /** Keeps a durable editorial lead on the Guides hub as new guides arrive. */
  hubLead?: boolean;
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
  locales: Partial<Record<HomegroundLocale, GuideLocaleEntry>>;
}

export const guideRegistry = [
  {
    id: "zhangjiajie-itinerary",
    type: "route",
    featured: true,
    pillar: "routes-and-pace",
    audienceMarkets: ["global"],
    format: "itinerary",
    topics: ["itinerary-design", "pace", "trip-planning"],
    destinations: ["zhangjiajie"],
    homeFeaturedRank: 1,
    hubLead: true,
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
    id: "zhangjiajie-from-malaysia",
    type: "planning",
    featured: false,
    pillar: "routes-and-pace",
    audienceMarkets: ["malaysia"],
    format: "planning-guide",
    topics: ["transport", "trip-planning", "on-the-ground", "pace"],
    destinations: ["zhangjiajie"],
    cardImagePath:
      "/images/guides/zhangjiajie-from-malaysia/malaysia-zhangjiajie-card-1200.webp",
    cardImageWidth: 1200,
    cardImageHeight: 750,
    heroImagePath:
      "/images/guides/zhangjiajie-from-malaysia/malaysia-zhangjiajie-og-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/zhangjiajie-from-malaysia/malaysia-zhangjiajie-og-1200.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    datePublished: "2026-07-28",
    dateModified: "2026-07-28",
    sourceReviewedDate: "2026-07-28",
    locales: {
      en: {
        path: "/guides/zhangjiajie-from-malaysia/",
        title: "Zhangjiajie From Malaysia: Private Trip Guide (2026)",
        headline:
          "Zhangjiajie From Malaysia: Choose the Gateway, Hotel Base and Support",
        description:
          "Compare flight gateways, complete sightseeing days, hotel bases, tickets, payment setup and private-trip support for Zhangjiajie from Malaysia.",
        heroAlt:
          "Visitors look toward misty sandstone pillars rising above the forest in Zhangjiajie.",
        navTitle: "Zhangjiajie from Malaysia",
        featuredLinkLabel:
          "Choose the gateway and hotel base for Zhangjiajie from Malaysia",
        openGraphLocale: "en_MY",
      },
      zh: {
        path: "/zh/guides/zhangjiajie-from-malaysia/",
        title: "马来西亚到张家界自由行：航班、住宿与私人协助",
        headline: "从马来西亚去张家界：先选入境点、住宿区域与协助方式",
        description:
          "比较马来西亚到张家界的航班门户、完整游览日、武陵源与市区住宿、门票、支付准备，以及自由行需要多少当地协助。",
        heroAlt: "游客在张家界仰望从森林和云雾间升起的砂岩峰林。",
        navTitle: "马来西亚出发张家界指南",
        featuredLinkLabel: "选对马来西亚到张家界的航班门户与住宿基地",
        openGraphLocale: "zh_MY",
      },
      ko: {
        path: "/ko/guides/zhangjiajie-from-malaysia/",
        title: "말레이시아 출발 장자제 여행: 항공·숙소·현지 지원",
        headline: "말레이시아에서 장자제까지: 관문·숙박 거점·지원 범위 고르기",
        description:
          "말레이시아 출발 장자제 여행의 항공 관문, 온전한 관광일, 우링위안·시내 숙소, 입장권, 결제 준비와 현지 지원 범위를 비교합니다.",
        heroAlt:
          "여행자들이 장자제의 숲과 안개 사이로 솟은 사암 봉우리를 바라보는 모습.",
        navTitle: "말레이시아 출발 장자제 가이드",
        featuredLinkLabel: "말레이시아 출발 장자제의 관문과 숙박 거점 선택하기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "zhangjiajie-glass-bridge-vs-skywalk",
    type: "field-note",
    featured: true,
    pillar: "field-notes",
    audienceMarkets: ["global"],
    format: "field-note",
    topics: ["attractions", "trip-planning", "on-the-ground"],
    destinations: ["zhangjiajie"],
    homeFeaturedRank: 3,
    cardImagePath: "/images/guides/tantan-zhangjiajie/tantan-hero-1200.jpg",
    cardImageWidth: 1200,
    cardImageHeight: 1500,
    heroImagePath: "/images/guides/tantan-zhangjiajie/tantan-hero-og-1200.jpg",
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
        headline: "玻璃桥不是玻璃栈道：Tantan 在张家界替客人核对的 7 个细节",
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
    pillar: "field-notes",
    audienceMarkets: ["global"],
    format: "field-note",
    topics: ["trip-planning", "on-the-ground"],
    destinations: ["china", "zhangjiajie"],
    heroImagePath: "/images/guides/kevin-preparation/kevin-hero-og-1200.jpg",
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
        heroAlt: "Kevin standing beside the coast in warm evening light.",
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
    id: "zhangjiajie-older-travellers",
    type: "planning",
    featured: false,
    pillar: "routes-and-pace",
    audienceMarkets: ["global"],
    format: "planning-guide",
    topics: ["trip-planning", "on-the-ground", "attractions"],
    destinations: ["zhangjiajie"],
    heroImagePath:
      "/images/guides/zhangjiajie-older-travellers/bailong-elevator-og-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/zhangjiajie-older-travellers/bailong-elevator-og-1200.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    datePublished: "2026-07-24",
    dateModified: "2026-07-24",
    sourceReviewedDate: "2026-07-23",
    locales: {
      en: {
        path: "/guides/zhangjiajie-older-travellers/",
        title: "Zhangjiajie with Older Travellers: What Still Works",
        headline:
          "Zhangjiajie with Older Travellers: The Mountain Carries You, but the Questions Need Answering",
        description:
          "Most of Zhangjiajie is ridden, not walked. What decides an older traveller's day is the people on the mountain, not the itinerary — the Tianmen cable car change, the glass bridge rule and the buses with no timetable.",
        heroAlt:
          "The Bailong Elevator rising against a sandstone cliff under a blue sky in Zhangjiajie.",
        navTitle: "Zhangjiajie with older travellers",
        featuredLinkLabel: "See what still works for a slower pace",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/zhangjiajie-older-travellers/",
        title: "带长辈游张家界:哪些还走得动",
        headline: "带长辈游张家界:山替你爬,话得有人替你问",
        description:
          "张家界大部分地方是坐上去的,不是走上去的。决定长辈这一天的,是山上那些人,不是行程表——天门山索道之变、玻璃桥的规定,和没有时刻表的摆渡车。",
        heroAlt: "蓝天下,百龙天梯沿张家界砂岩崖壁升起。",
        navTitle: "带长辈游张家界",
        featuredLinkLabel: "看看慢节奏还走得动哪些",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/zhangjiajie-older-travellers/",
        title: "부모님과 함께 가는 장자제: 어디까지 가능할까",
        headline:
          "부모님과 함께 가는 장자제: 산은 태워 주지만, 물어볼 사람은 있어야 합니다",
        description:
          "장자제는 대부분 타고 오릅니다. 연세 있는 분의 하루를 정하는 것은 일정표가 아니라 산에 있는 사람들입니다 — 톈먼산 케이블카 변경, 유리다리 규정, 시간표 없는 셔틀버스.",
        heroAlt:
          "파란 하늘 아래 장자제 사암 절벽을 따라 솟아오른 바이룽 엘리베이터.",
        navTitle: "부모님과 함께 가는 장자제",
        featuredLinkLabel: "느린 속도로도 가능한 것 보기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "best-zhangjiajie-night-show",
    type: "planning",
    featured: false,
    pillar: "routes-and-pace",
    audienceMarkets: ["global"],
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
        heroAlt:
          "야외 협곡 무대, 민속 공연 소품, 실내 극장을 비교하는 편집 일러스트.",
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
    pillar: "routes-and-pace",
    audienceMarkets: ["global"],
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
    pillar: "transport",
    audienceMarkets: ["global"],
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
    pillar: "routes-and-pace",
    audienceMarkets: ["global"],
    format: "planning-guide",
    topics: ["pace", "itinerary-design", "trip-planning"],
    destinations: ["china"],
    homeFeaturedRank: 2,
    cardImagePath:
      "/images/guides/china-itinerary-reality/airport-apron-card-1200.webp",
    cardImageWidth: 1200,
    cardImageHeight: 1800,
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
        cardImageAlt:
          "Aircraft on an airport apron beneath grey clouds, seen through a terminal window.",
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
        cardImageAlt: "从机场航站楼窗外看到停靠的客机。",
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
        cardImageAlt: "흐린 날 공항 터미널 창 너머로 보이는 계류장의 항공기.",
        navTitle: "중국 일정 속도 가이드",
        featuredLinkLabel: "중국 일정이 너무 빠듯한지 확인하기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "china-itinerary-with-older-parents",
    type: "planning",
    featured: false,
    pillar: "routes-and-pace",
    audienceMarkets: ["global"],
    format: "planning-guide",
    topics: ["pace", "itinerary-design", "trip-planning", "transport"],
    destinations: ["beijing", "xian", "zhangjiajie", "shanghai"],
    heroImagePath:
      "/images/guides/china-itinerary-with-older-parents/route-comparison-og-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/china-itinerary-with-older-parents/route-comparison-og-1200.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    datePublished: "2026-07-31",
    dateModified: "2026-07-31",
    sourceReviewedDate: "2026-07-31",
    locales: {
      en: {
        path: "/guides/china-itinerary-with-older-parents/",
        title: "China With Older Parents: A Realistic 12–14 Day Itinerary",
        headline:
          "Taking Your Parents to China? Build the Route Around Energy, Not Just Cities",
        description:
          "Planning China with older parents? Compare realistic 12- and 14-day routes, with hotel changes, walking, transfer days and recovery time built in.",
        heroAlt:
          "A cut-paper illustration of a China map with three route markers, luggage and a calendar.",
        navTitle: "China with older parents",
        featuredLinkLabel:
          "Compare realistic 12- and 14-day routes with older parents",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/china-itinerary-with-older-parents/",
        title: "带父母游中国：现实可行的 12–14 天行程",
        headline: "带父母来中国旅行？围绕体力，而不只是城市来设计路线",
        description:
          "带年长父母规划中国旅行？比较现实可行的 12 天与 14 天路线，把换酒店、步行、转场日和恢复时间一起算进去。",
        heroAlt: "纸艺风格的中国地图、三个路线标记、行李箱和日历插图。",
        navTitle: "带父母游中国",
        featuredLinkLabel: "比较带父母旅行的 12 天与 14 天现实路线",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/china-itinerary-with-older-parents/",
        title: "부모님과 중국 여행: 현실적인 12~14일 일정",
        headline:
          "부모님과 중국을 여행하나요? 도시 수보다 체력에 맞춰 일정을 짜세요",
        description:
          "부모님과 중국 여행을 준비한다면 12일·14일 현실 일정을 비교해 보세요. 숙소 이동, 걷기, 도시 간 이동일과 회복 시간까지 함께 계산합니다.",
        heroAlt:
          "중국 지도와 세 개의 경로 표식, 여행 가방, 달력을 표현한 종이 공예 일러스트.",
        navTitle: "부모님과 중국 여행",
        featuredLinkLabel: "부모님과 함께하는 현실적인 12일·14일 일정 비교하기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "do-us-citizens-need-visa-china-2026",
    type: "planning",
    featured: false,
    pillar: "entry-rules",
    audienceMarkets: ["us"],
    format: "planning-guide",
    topics: ["trip-planning"],
    destinations: ["china"],
    heroImagePath:
      "/images/guides/beijing-zhangjiajie-shanghai-transport/airport-wayfinding-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/beijing-zhangjiajie-shanghai-transport/airport-wayfinding-1200.jpg",
    imageWidth: 1200,
    imageHeight: 800,
    datePublished: "2026-07-24",
    dateModified: "2026-07-24",
    sourceReviewedDate: "2026-07-24",
    locales: {
      en: {
        path: "/guides/do-us-citizens-need-visa-china-2026/",
        title: "Do US Citizens Need a Visa for China in 2026?",
        headline: "Do US Citizens Need a Visa for China in 2026?",
        description:
          "US passports usually need an L visa for an ordinary mainland holiday. Compare the 240-hour transit route, Hainan’s 30-day regional policy and the rules for a standard round trip.",
        heroAlt:
          "Arrivals concourse at Shanghai Pudong International Airport, with bilingual wayfinding signs overhead.",
        navTitle: "US visa and transit guide",
        featuredLinkLabel: "Check which entry path your route falls under",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/do-us-citizens-need-visa-china-2026/",
        title: "2026 年，美国护照去中国还需要签证吗？",
        headline: "2026 年，美国护照去中国还需要签证吗？",
        description:
          "美国护照普通中国大陆旅行通常需要 L 签。本指南对比 240 小时过境免签、海南 30 天区域免签与标准往返行程。",
        heroAlt: "上海浦东国际机场到达层，头顶是中英双语指示牌。",
        navTitle: "美国签证与过境指南",
        featuredLinkLabel: "看看你的路线属于哪条入境路径",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/do-us-citizens-need-visa-china-2026/",
        title: "2026년, 미국 여권으로 중국에 가려면 비자가 필요할까요?",
        headline: "2026년, 미국 여권으로 중국에 가려면 비자가 필요할까요?",
        description:
          "미국 여권의 일반적인 중국 본토 여행에는 대체로 L 비자가 필요합니다. 240시간 무비자 환승, 하이난 30일 지역 무비자와 일반 왕복 일정을 비교합니다.",
        heroAlt: "상하이 푸둥 국제공항 도착층, 머리 위로 안내 표지판이 보인다.",
        navTitle: "미국 비자·환승 가이드",
        featuredLinkLabel: "내 경로가 어느 입국 경로인지 확인하기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "china-visa-free-uk-citizens-2026",
    type: "planning",
    featured: false,
    pillar: "entry-rules",
    audienceMarkets: ["uk"],
    format: "decision-guide",
    topics: ["trip-planning"],
    destinations: ["china"],
    cardImagePath:
      "/images/guides/china-visa-free-uk-citizens-2026/great-wall-card-1200.jpg",
    cardImageWidth: 1200,
    cardImageHeight: 750,
    heroImagePath:
      "/images/guides/china-visa-free-uk-citizens-2026/great-wall-og-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/china-visa-free-uk-citizens-2026/great-wall-og-1200.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    datePublished: "2026-07-24",
    dateModified: "2026-07-24",
    sourceReviewedDate: "2026-07-24",
    locales: {
      en: {
        path: "/guides/china-visa-free-uk-citizens-2026/",
        title: "China Visa-Free for UK Citizens 2026: 30-Day Rules",
        headline:
          "China Visa-Free for UK Citizens in 2026: When Do You Still Need a Visa?",
        description:
          "A practical guide to China’s 30-day visa-free entry for UK citizens in 2026, including passport types, day counting, Hong Kong re-entry and when a visa is still required.",
        heroAlt:
          "The Great Wall crossing a mountain ridge near Beijing in spring.",
        navTitle: "UK passport China entry guide",
        featuredLinkLabel: "Check whether your UK passport and trip qualify",
        openGraphLocale: "en_GB",
      },
    },
  },
  {
    id: "china-visa-free-canadian-citizens-2026",
    type: "planning",
    featured: false,
    pillar: "entry-rules",
    audienceMarkets: ["canada"],
    format: "decision-guide",
    topics: ["trip-planning"],
    destinations: ["china"],
    cardImagePath:
      "/images/guides/china-visa-free-canadian-citizens-2026/skyline-card-1200.jpg",
    cardImageWidth: 1200,
    cardImageHeight: 750,
    heroImagePath:
      "/images/guides/china-visa-free-canadian-citizens-2026/skyline-og-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/china-visa-free-canadian-citizens-2026/skyline-og-1200.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    datePublished: "2026-07-24",
    dateModified: "2026-07-24",
    sourceReviewedDate: "2026-07-24",
    locales: {
      en: {
        path: "/guides/china-visa-free-canadian-citizens-2026/",
        title: "China Visa-Free for Canadian Citizens 2026: 30-Day Rules",
        headline:
          "China Visa-Free for Canadian Citizens in 2026: When Do You Still Need a Visa?",
        description:
          "A practical guide to China’s 30-day visa-free entry for Canadian citizens in 2026, including passport types, day counting, Hong Kong re-entry and when a visa is still required.",
        heroAlt:
          "Beijing’s contemporary skyline, including the China Zun tower, seen in clear daylight.",
        navTitle: "Canada passport China entry guide",
        featuredLinkLabel:
          "Check whether your Canadian passport and trip qualify",
        openGraphLocale: "en_CA",
      },
    },
  },
  {
    id: "china-visa-free-new-zealand-citizens-2026",
    type: "planning",
    featured: false,
    pillar: "entry-rules",
    audienceMarkets: ["new-zealand"],
    format: "decision-guide",
    topics: ["trip-planning"],
    destinations: ["china"],
    cardImagePath:
      "/images/guides/china-visa-free-new-zealand-citizens-2026/timeline-card-1200.jpg",
    cardImageWidth: 1200,
    cardImageHeight: 750,
    heroImagePath:
      "/images/guides/china-visa-free-new-zealand-citizens-2026/timeline-og-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/china-visa-free-new-zealand-citizens-2026/timeline-og-1200.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    datePublished: "2026-07-24",
    dateModified: "2026-07-24",
    sourceReviewedDate: "2026-07-24",
    locales: {
      en: {
        path: "/guides/china-visa-free-new-zealand-citizens-2026/",
        title: "China Visa-Free for New Zealand Citizens 2026: 30-Day Rules",
        headline:
          "China Visa-Free for New Zealand Citizens in 2026: When Do You Still Need a Visa?",
        description:
          "A practical guide to China’s 30-day visa-free entry for New Zealand citizens in 2026, including passport types, day counting, Hong Kong re-entry and when a visa is still required.",
        heroAlt:
          "An editorial timeline diagram showing New Zealand’s China visa-free policy window from 30 November 2024 through 31 December 2026.",
        navTitle: "New Zealand passport China entry guide",
        featuredLinkLabel:
          "Check whether your New Zealand passport and trip qualify",
        openGraphLocale: "en_NZ",
      },
    },
  },
  {
    id: "china-240-hour-visa-free-transit-route-check",
    type: "planning",
    featured: false,
    pillar: "entry-rules",
    audienceMarkets: ["global"],
    format: "planning-guide",
    topics: ["trip-planning"],
    destinations: ["china"],
    heroImagePath:
      "/images/guides/china-240-hour-visa-free-transit-route-check/route-rule-og-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/china-240-hour-visa-free-transit-route-check/route-rule-og-1200.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    datePublished: "2026-07-24",
    dateModified: "2026-07-24",
    sourceReviewedDate: "2026-07-24",
    locales: {
      en: {
        path: "/guides/china-240-hour-visa-free-transit-route-check/",
        title: "China 240-Hour Visa-Free Transit: Does Your Route Qualify?",
        headline: "China 240-Hour Visa-Free Transit: Does Your Route Qualify?",
        description:
          "One rule decides it: where you fly after China must differ from where you flew in from. Check your route against worked examples, port limits and the next-day clock.",
        heroAlt:
          "Diagram of the transit rule: country or region A, then mainland China, then a different country or region C.",
        navTitle: "240-hour transit route check",
        featuredLinkLabel: "Check whether your route qualifies",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/china-240-hour-visa-free-transit-route-check/",
        title: "中国 240 小时过境免签:你的路线符合条件吗？",
        headline: "中国 240 小时过境免签:你的路线符合条件吗？",
        description:
          "只有一条规则决定:离开中国后飞往的地方,必须和你飞进来之前的不同。对照真实航线例子、口岸范围与次日起算规则核一遍。",
        heroAlt:
          "过境规则示意图:国家或地区 A,中国大陆,另一个不同的国家或地区 C。",
        navTitle: "240 小时过境路线判断",
        featuredLinkLabel: "看看你的路线符不符合",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/china-240-hour-visa-free-transit-route-check/",
        title: "중국 240시간 무비자 환승: 내 경로는 조건을 만족할까요?",
        headline: "중국 240시간 무비자 환승: 내 경로는 조건을 만족할까요?",
        description:
          "규칙은 하나입니다. 중국을 떠나 향하는 곳이 들어오기 전과 달라야 합니다. 실제 경로 예시와 허용 지역, 다음 날 기산 규칙으로 확인하세요.",
        heroAlt:
          "환승 규칙 다이어그램: 국가 또는 지역 A, 중국 본토, 그리고 다른 국가 또는 지역 C.",
        navTitle: "240시간 환승 경로 확인",
        featuredLinkLabel: "내 경로가 조건을 만족하는지 확인하기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "do-singaporeans-need-visa-china",
    type: "planning",
    featured: false,
    pillar: "entry-rules",
    audienceMarkets: ["singapore"],
    format: "planning-guide",
    topics: ["trip-planning"],
    destinations: ["china"],
    heroImagePath:
      "/images/guides/zhangjiajie-older-travellers/pillars-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/zhangjiajie-older-travellers/pillars-1200.jpg",
    imageWidth: 1200,
    imageHeight: 675,
    datePublished: "2026-07-24",
    dateModified: "2026-07-28",
    sourceReviewedDate: "2026-07-28",
    locales: {
      en: {
        path: "/guides/do-singaporeans-need-visa-china/",
        title: "You Don't Need a China Visa. Here's the Harder Question.",
        headline: "You Don't Need a China Visa. Here's the Harder Question.",
        description:
          "A Singapore passport enters China visa-free for 30 days. The visa is settled in a paragraph; the real question is what to do with the time, and where a China route is won or lost.",
        heroAlt:
          "Sandstone pillars layered into a deep green valley in Zhangjiajie National Forest Park.",
        navTitle: "Singapore passport China visa",
        featuredLinkLabel: "The visa is easy — the 30 days are the question",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/do-singaporeans-need-visa-china/",
        title: "新加坡护照去中国免签 30 天：接下来怎样规划？",
        headline: "去中国不需要签证。更难的问题在这里。",
        description:
          "新加坡普通护照可免签进入中国大陆 30 天。本文核对入境规则、入境卡填写方式，以及怎样把这段时间排成真正可执行的中国路线。",
        heroAlt: "张家界国家森林公园内，层层砂岩石柱耸立于深绿色山谷之中。",
        navTitle: "新加坡护照赴华免签指南",
        featuredLinkLabel: "免签 30 天之后，路线怎样安排",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/do-singaporeans-need-visa-china/",
        title: "싱가포르 여권 중국 30일 무비자: 여행은 어떻게 짤까요?",
        headline: "중국 비자는 필요 없습니다. 더 어려운 질문은 따로 있습니다.",
        description:
          "싱가포르 일반 여권은 중국 본토에 30일까지 무비자로 입국할 수 있습니다. 입국 규정과 입국카드 작성 방법, 실제 가능한 중국 동선을 함께 확인하세요.",
        heroAlt:
          "장자제 국가삼림공원의 짙푸른 계곡 위로 겹겹이 솟은 사암 기둥.",
        navTitle: "싱가포르 여권 중국 무비자 가이드",
        featuredLinkLabel: "30일 무비자 이후의 여행 동선 짜기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "why-are-hotels-in-china-so-cheap",
    type: "planning",
    featured: false,
    pillar: "routes-and-pace",
    audienceMarkets: ["global"],
    format: "decision-guide",
    topics: ["accommodation", "trip-planning"],
    destinations: ["china", "zhangjiajie"],
    cardImagePath:
      "/images/guides/china-hotel-value/stay-street-evening-card-1200.jpg",
    cardImageWidth: 1200,
    cardImageHeight: 750,
    heroImagePath:
      "/images/guides/china-hotel-value/stay-street-evening-og-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/china-hotel-value/stay-street-evening-og-1200.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    datePublished: "2026-08-02",
    dateModified: "2026-08-02",
    sourceReviewedDate: "2026-08-02",
    locales: {
      en: {
        path: "/guides/why-are-hotels-in-china-so-cheap/",
        title: "Why Are Hotels in China So Cheap? Find a Stay That Fits",
        headline:
          "Why Are Hotels in China So Cheap—and Which Deals Are Actually Good?",
        description:
          "Cheap hotels and guesthouses are easy to find in China. Homeground helps travellers compare location, current value, recent feedback and passport check-in.",
        heroAlt:
          "A lantern-lit accommodation and dining street in Zhangjiajie filling with people at dusk.",
        navTitle: "China accommodation value guide",
        featuredLinkLabel: "See which cheap stays are actually worth booking",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/why-are-hotels-in-china-so-cheap/",
        title: "中国的酒店为什么这么便宜？怎么挑到真正合适的住处",
        headline: "中国的酒店为什么这么便宜？哪些便宜是真的划算",
        description:
          "在中国找到便宜的酒店和民宿并不难，难的是判断位置、近期房况、外国护照入住和真正可比的价格。Homeground 帮你把长名单收成几个能用的选择。",
        heroAlt: "傍晚亮灯的张家界住宿餐饮街区，行人渐多。",
        navTitle: "中国住宿性价比指南",
        featuredLinkLabel: "看看哪些便宜的住处真的值得订",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/why-are-hotels-in-china-so-cheap/",
        title: "중국 호텔은 왜 이렇게 쌀까? 나에게 맞는 숙소 고르기",
        headline:
          "중국 호텔은 왜 이렇게 쌀까—그리고 어떤 저가가 진짜 좋은 선택일까",
        description:
          "중국에서 싼 호텔과 민박을 찾기는 쉽습니다. 어려운 건 위치, 최근 후기, 외국 여권 체크인, 그리고 진짜 비교 가능한 가격입니다. Homeground가 후보를 좁혀 드립니다.",
        heroAlt:
          "해질 무렵 불이 켜진 장자제의 숙소·식당 거리에 사람들이 모여 있다.",
        navTitle: "중국 숙소 가성비 가이드",
        featuredLinkLabel: "어떤 저가 숙소가 실제로 예약할 만한지 보기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "do-you-need-a-tour-guide-in-china",
    type: "planning",
    featured: false,
    pillar: "routes-and-pace",
    audienceMarkets: ["global"],
    format: "decision-guide",
    topics: ["trip-planning", "on-the-ground"],
    destinations: ["china"],
    cardImagePath:
      "/images/guides/china-tour-guide-decision/longmen-caves-card-1200.webp",
    cardImageWidth: 1200,
    cardImageHeight: 750,
    heroImagePath:
      "/images/guides/china-tour-guide-decision/longmen-caves-og-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/china-tour-guide-decision/longmen-caves-og-1200.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    datePublished: "2026-08-09",
    dateModified: "2026-08-09",
    sourceReviewedDate: "2026-08-09",
    locales: {
      en: {
        path: "/guides/do-you-need-a-tour-guide-in-china/",
        title: "Do You Need a Tour Guide in China? When It’s Worth It",
        headline: "Do You Need a Tour Guide in China—or Better Trip Support?",
        description:
          "You do not need a guide every day in China. See when a private guide, driver or full-trip planning support is worth it for a first visit.",
        heroAlt:
          "Historic Buddhist sculptures carved into the rock at the Longmen Grottoes in Luoyang.",
        navTitle: "China tour guide decision guide",
        featuredLinkLabel: "Decide which days in China actually need support",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/do-you-need-a-tour-guide-in-china/",
        title: "去中国旅行需要导游吗？什么时候值得请",
        headline: "去中国旅行需要导游，还是需要更合适的旅行协助？",
        description:
          "去中国旅行不一定每天都需要导游。分清私人导游、司机、单项协助与全程规划，判断哪些天值得花钱请人帮忙。",
        heroAlt: "洛阳龙门景区岩壁上的古代宗教造像。",
        navTitle: "中国旅行导游选择指南",
        featuredLinkLabel: "判断中国行程中哪些天真正需要协助",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/do-you-need-a-tour-guide-in-china/",
        title: "중국 여행에 가이드가 필요할까? 언제 가치 있을까",
        headline: "중국 여행에 가이드가 필요할까, 더 알맞은 지원이 필요할까?",
        description:
          "중국에서 매일 가이드가 필요한 것은 아닙니다. 전용 가이드, 차량, 현지 지원과 전체 일정 설계가 각각 언제 가치 있는지 비교해 보세요.",
        heroAlt: "중국 허난 용문석굴 암벽에 조각된 역사적인 불교 석상.",
        navTitle: "중국 여행 가이드 선택 안내",
        featuredLinkLabel: "중국 일정 중 실제로 지원이 필요한 날 고르기",
        openGraphLocale: "ko_KR",
      },
    },
  },
  {
    id: "how-much-does-a-china-trip-cost",
    type: "planning",
    featured: false,
    pillar: "routes-and-pace",
    audienceMarkets: ["global"],
    format: "decision-guide",
    topics: ["trip-planning", "accommodation"],
    destinations: ["china", "beijing", "xian", "shanghai", "zhangjiajie"],
    cardImagePath:
      "/images/guides/china-hotel-value/stay-street-evening-card-1200.jpg",
    cardImageWidth: 1200,
    cardImageHeight: 750,
    heroImagePath:
      "/images/guides/china-hotel-value/stay-street-evening-og-1200.jpg",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/china-hotel-value/stay-street-evening-og-1200.jpg",
    imageWidth: 1200,
    imageHeight: 630,
    datePublished: "2026-08-05",
    dateModified: "2026-08-09",
    sourceReviewedDate: "2026-08-09",
    locales: {
      en: {
        path: "/guides/how-much-does-a-china-trip-cost/",
        title: "How Much Does a Trip to China Cost? 2026 Budget Guide",
        headline: "How Much Does a Trip to China Cost?",
        description:
          "Compare three current China-trip prices in their original currencies, understand what each includes and see what a complete private-trip quote should show.",
        heroAlt:
          "A lantern-lit street of guesthouses and restaurants in Zhangjiajie at dusk.",
        navTitle: "China trip cost guide",
        featuredLinkLabel: "See what a multi-city China trip actually costs",
        openGraphLocale: "en_US",
      },
      zh: {
        path: "/zh/guides/how-much-does-a-china-trip-cost/",
        title: "去中国旅行大概多少钱？2026 预算与报价指南",
        headline: "去中国旅行大概多少钱？",
        description:
          "对照三份当前公开的中国旅行原币价格，弄清每份包含什么，并看懂一份完整的私人行程报价应该写清什么。",
        heroAlt: "傍晚亮灯的张家界住宿餐饮街区。",
        navTitle: "中国行程费用指南",
        featuredLinkLabel: "看看一趟多城市中国行程到底多少钱",
        openGraphLocale: "zh_CN",
      },
      ko: {
        path: "/ko/guides/how-much-does-a-china-trip-cost/",
        title: "중국 여행 비용은 얼마나 들까? 2026년 예산 가이드",
        headline: "중국 여행 비용은 얼마나 들까?",
        description:
          "현재 공개된 중국 여행 가격 세 개를 게시 통화로 비교하고, 포함 항목과 완전한 프라이빗 여행 견적에 필요한 내용을 확인합니다.",
        heroAlt: "해질 무렵 불이 켜진 장자제의 숙소·식당 거리.",
        navTitle: "중국 여행 비용 가이드",
        featuredLinkLabel: "다도시 중국 여행의 실제 비용 보기",
        openGraphLocale: "ko_KR",
      },
    },
  },
] as const satisfies readonly GuideEntry[];

export function getGuideEntry(id: GuideId, locale: HomegroundLocale = "en") {
  const guide: GuideEntry | undefined = guideRegistry.find(
    (entry) => entry.id === id,
  );

  if (!guide) {
    throw new Error(`Unknown guide: ${id}`);
  }

  const localized = guide.locales[locale];
  if (!localized) {
    throw new Error(`Guide "${id}" is not available in locale "${locale}".`);
  }
  const cardImagePath =
    "cardImagePath" in guide ? guide.cardImagePath : guide.heroImagePath;
  const cardImageWidth =
    "cardImageWidth" in guide ? guide.cardImageWidth : guide.imageWidth;
  const cardImageHeight =
    "cardImageHeight" in guide ? guide.cardImageHeight : guide.imageHeight;
  const cardImageAlt =
    "cardImageAlt" in localized ? localized.cardImageAlt : localized.heroAlt;

  return {
    ...guide,
    ...localized,
    cardImagePath,
    cardImageWidth,
    cardImageHeight,
    cardImageAlt,
    canonicalPath: localized.path,
    canonicalUrl: `${SITE_URL}${localized.path}`,
  };
}

export function getFeaturedGuides(locale: HomegroundLocale = "en", limit = 3) {
  return getHomeFeaturedGuides(locale).slice(0, Math.max(0, limit));
}

export function getHomeFeaturedGuides(locale: HomegroundLocale = "en") {
  return guideRegistry
    .filter((entry) => "homeFeaturedRank" in entry)
    .sort((a, b) => a.homeFeaturedRank - b.homeFeaturedRank)
    .map((entry) => getGuideEntry(entry.id, locale));
}

export function getAllGuides(locale: HomegroundLocale = "en") {
  return guideRegistry
    .filter((entry) => Boolean(entry.locales[locale]))
    .map((entry, registryIndex) => ({
      entry,
      registryIndex,
    }))
    .sort(
      (a, b) =>
        Number("hubLead" in b.entry && Boolean(b.entry.hubLead)) -
          Number("hubLead" in a.entry && Boolean(a.entry.hubLead)) ||
        b.entry.dateModified.localeCompare(a.entry.dateModified) ||
        b.entry.datePublished.localeCompare(a.entry.datePublished) ||
        a.registryIndex - b.registryIndex,
    )
    .map(({ entry }) => getGuideEntry(entry.id, locale));
}

export function getGuidesByPillar(
  pillar: GuidePillar,
  locale: HomegroundLocale = "en",
) {
  return getAllGuides(locale).filter((guide) => guide.pillar === pillar);
}

export function getGuideAvailableLocales(id: GuideId) {
  const guide: GuideEntry | undefined = guideRegistry.find(
    (entry) => entry.id === id,
  );

  if (!guide) {
    throw new Error(`Unknown guide: ${id}`);
  }

  return homegroundLocales.filter((locale) => Boolean(guide.locales[locale]));
}

export function getGuideLanguagePaths(id: GuideId) {
  const paths: Record<string, string> = {};

  getGuideAvailableLocales(id).forEach((locale) => {
    const language = locale === "zh" ? "zh-Hans" : locale;
    paths[language] = getGuideEntry(id, locale).canonicalPath;
  });

  if (paths.en) {
    paths["x-default"] = paths.en;
  }

  return paths;
}

export function getGuideLanguageUrls(id: GuideId) {
  const paths = getGuideLanguagePaths(id);

  return Object.fromEntries(
    Object.entries(paths).map(([language, path]) => [
      language,
      `${SITE_URL}${path}`,
    ]),
  );
}
