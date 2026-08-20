import { homegroundLocales, type HomegroundLocale } from "./homegroundI18n";
import type { GuideId } from "./guideRegistry";

const SITE_URL = "https://homegroundchina.com";

/**
 * Destination entity hubs own the broad `X travel guide` intent for one city
 * at `/destinations/<slug>/`, as reserved in the Phase 1 search-platform spec.
 * They decide city-level shape — nights, base, gateways, clusters, next city —
 * and hand every execution detail to the narrower canonical guide owners
 * listed in `supportGuideIds`. The authored inventory also retains reviewed
 * copy that is not yet authorised for a public route, so this list must never
 * be used to infer release status.
 */
export const destinationHubIds = [
  "beijing",
  "shanghai",
  "xian",
  "chengdu",
  "guangzhou",
  "hangzhou",
  "zhangjiajie",
] as const;
export type DestinationHubId = (typeof destinationHubIds)[number];
export type DestinationHubLifecycle = "published" | "release-candidate";

/** A node on the hand-drawn city-geography diagram. Coordinates are 0–1. */
export interface DestinationGeographyNode {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  /**
   * `core` is the central sightseeing anchor, `cluster` a same-city task that
   * still needs its own block of time, `outside` a task beyond the ordinary
   * city day, and `gateway` an airport or railway hub.
   */
  readonly kind: "core" | "cluster" | "outside" | "gateway";
}

export interface DestinationGeographyCopy {
  readonly title: string;
  readonly caption: string;
  readonly legend: Readonly<Record<"core" | "cluster" | "outside" | "gateway", string>>;
  readonly nodes: Readonly<Record<string, { readonly label: string; readonly note: string }>>;
}

export interface DestinationHubLocaleEntry {
  readonly path: string;
  readonly title: string;
  readonly h1: string;
  readonly description: string;
  readonly navTitle: string;
  /**
   * Independently written destination summary. Gate B of the Phase 1 spec
   * requires this rather than a separate overview page.
   */
  readonly summary: string;
  readonly heroAlt: string;
  readonly heroCaption: string;
  readonly openGraphLocale: string;
  /**
   * Reviewed query terms for the manifest entry. Hubs stay outside the Phase 1
   * guide search corpus, so these describe the page rather than power a live
   * index; they must be phrases the page actually answers.
   */
  readonly searchTerms?: readonly string[];
  readonly geography: DestinationGeographyCopy;
}

export interface DestinationHubEntry {
  readonly id: DestinationHubId;
  readonly lifecycle: DestinationHubLifecycle;
  readonly entityId: string;
  readonly heroImagePath: string;
  readonly heroImageUrl: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly datePublished: string | null;
  readonly dateModified: string;
  readonly sourceReviewedDate: string;
  /**
   * Reviewed canonical owners for which this city is the primary or an
   * explicitly served entity. Phase 1 Gate B counts these, and the hub must
   * not restate what they already own.
   */
  readonly supportGuideIds: readonly GuideId[];
  readonly geometry: readonly DestinationGeographyNode[];
  readonly locales: Readonly<Record<HomegroundLocale, DestinationHubLocaleEntry>>;
}

function hubPath(id: DestinationHubId, locale: HomegroundLocale) {
  return locale === "en"
    ? `/destinations/${id}/`
    : `/${locale}/destinations/${id}/`;
}

export const destinationHubRegistry = [
  {
    id: "beijing",
    lifecycle: "published",
    entityId: "city-beijing",
    heroImagePath: "/images/destinations/beijing/hero-1600.webp",
    heroImageUrl:
      "https://homegroundchina.com/images/destinations/beijing/hero-1600.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    datePublished: "2026-08-16",
    dateModified: "2026-08-16",
    sourceReviewedDate: "2026-08-16",
    supportGuideIds: [
      "beijing-where-to-stay-first-trip",
      "beijing-courtyard-hotel-or-modern-hotel",
      "which-beijing-railway-station",
      "beijing-south-station-to-capital-or-daxing-airport",
      "beijing-to-mutianyu-great-wall-transfer",
      "beijing-to-badaling-great-wall-transfer",
      "forbidden-city-for-foreign-visitors",
      "temple-of-heaven-gates-and-ritual-sequence",
      "summer-palace-gates-route-and-boat-plan",
      "national-museum-of-china-booking-and-route",
      "beijing-xian-chengdu-route-order",
    ],
    geometry: [
      { id: "axis", x: 0.5, y: 0.52, kind: "core" },
      { id: "south", x: 0.47, y: 0.78, kind: "cluster" },
      { id: "northwest", x: 0.2, y: 0.3, kind: "cluster" },
      { id: "gulou", x: 0.5, y: 0.28, kind: "cluster" },
      { id: "chaoyang", x: 0.78, y: 0.45, kind: "cluster" },
      { id: "wall", x: 0.83, y: 0.1, kind: "outside" },
      { id: "pek", x: 0.85, y: 0.28, kind: "gateway" },
      { id: "pkx", x: 0.5, y: 0.95, kind: "gateway" },
    ],
    locales: {
      en: {
        path: hubPath("beijing", "en"),
        title: "Beijing Travel Guide: Nights, Areas, Stations, Next City",
        h1: "Beijing travel guide: build the city around complete days, not a landmark list",
        description:
          "How many nights Beijing really needs, which area should be your base, how PEK, PKX and eight railway stations reshape the first and last day, and which city should follow.",
        navTitle: "Beijing",
        summary:
          "Beijing is one municipality holding an imperial centre, a modern political core, hutong neighbourhoods, large gardens, two airports and eight major railway stations. Plan it as four or five nights that buy three or four complete sightseeing days, decide the job of your base before its reputation, and keep the Great Wall and the departure train independent of each other.",
        heroAlt:
          "Forbidden City roofs seen from the north, with central Beijing beyond.",
        heroCaption:
          "Seen from the north, the Forbidden City reads as a whole district rather than one building. That scale is the argument for giving the central axis a complete day.",
        openGraphLocale: "en_US",
        geography: {
          title: "Beijing as five directions, not a list of pins",
          caption:
            "Orientation diagram, not to scale. It shows which Beijing tasks share a direction and which need a day of their own.",
          legend: {
            core: "Central anchor",
            cluster: "Own block of time",
            outside: "Independent full day",
            gateway: "Airport or rail gateway",
          },
          nodes: {
            axis: {
              label: "Tiananmen · Forbidden City · Jingshan",
              note: "One substantial central day, walked south to north",
            },
            south: {
              label: "Qianmen · Temple of Heaven",
              note: "Southern axis; half to full day",
            },
            northwest: {
              label: "Summer Palace · northwest",
              note: "Strong half day, often most of a day",
            },
            gulou: {
              label: "Gulou · Shichahai",
              note: "Neighbourhood scale and evenings",
            },
            chaoyang: {
              label: "Chaoyang · CBD",
              note: "Modern city, dining, late arrivals",
            },
            wall: {
              label: "Great Wall",
              note: "Outward and return journey; never a companion task",
            },
            pek: { label: "PEK", note: "Northeast, via Dongzhimen" },
            pkx: { label: "PKX", note: "Far south, via Caoqiao" },
          },
        },
      },
      zh: {
        path: hubPath("beijing", "zh"),
        title: "北京旅行指南：住几晚、住哪里、机场车站与下一站",
        h1: "北京旅行指南：先分配完整的一天，再安排景点",
        description:
          "北京到底需要住几晚、选哪个区域做基地、首都机场与大兴机场和八座主要铁路站怎样改变首末两天，以及北京之后适合接哪座城市。",
        navTitle: "北京",
        summary:
          "皇城中心、现代政治中心、胡同街区、大型园林、两座机场和八座主要铁路站都在同一个直辖市里。把北京规划成四到五晚、换来三到四个完整游览日；先问住宿区域承担什么任务，再看它的名气；并让长城日和离京车次互不牵连。",
        heroAlt: "从北侧俯瞰故宫屋顶，远处是北京城区。",
        heroCaption:
          "从北面看过去，故宫是一整片城区，而不是一座建筑。这个尺度就是中轴线值得留出完整一天的理由。",
        openGraphLocale: "zh_CN",
        geography: {
          title: "把北京看成五个方向，而不是一串坐标点",
          caption:
            "方位示意图，非按比例。它说明哪些北京任务共享同一个方向，哪些必须独立成日。",
          legend: {
            core: "城市中心锚点",
            cluster: "需要独立时段",
            outside: "需要独立整天",
            gateway: "机场或铁路门户",
          },
          nodes: {
            axis: {
              label: "天安门 · 故宫 · 景山",
              note: "一个扎实的中心日，由南向北走",
            },
            south: {
              label: "前门 · 天坛",
              note: "南部中轴；半天到一天",
            },
            northwest: {
              label: "颐和园 · 西北方向",
              note: "扎实半天，常常接近一天",
            },
            gulou: {
              label: "鼓楼 · 什刹海",
              note: "街区尺度与夜间时间",
            },
            chaoyang: {
              label: "朝阳 · 国贸",
              note: "现代城市、餐饮、晚到航班",
            },
            wall: {
              label: "长城",
              note: "需要完整往返；不能当作顺带项目",
            },
            pek: { label: "PEK 首都机场", note: "东北方向，经东直门" },
            pkx: { label: "PKX 大兴机场", note: "远南方向，经草桥" },
          },
        },
      },
      ko: {
        path: hubPath("beijing", "ko"),
        title: "베이징 여행 가이드: 숙박 일수·지역·기차역·다음 도시",
        h1: "베이징 여행 가이드: 명소 목록보다 온전한 하루를 먼저 배분하세요",
        description:
          "베이징에 몇 박이 필요한지, 어느 지역을 거점으로 삼을지, PEK·PKX와 여덟 개 주요 기차역이 첫날과 마지막 날을 어떻게 바꾸는지, 다음 도시는 어디가 좋은지 정리합니다.",
        navTitle: "베이징",
        summary:
          "옛 황성의 중심, 현대 정치 중심, 후퉁 동네, 대형 정원, 두 공항과 여덟 개 주요 기차역이 하나의 직할시 안에 있습니다. 4~5박으로 3~4일의 온전한 관광일을 만들고, 숙소는 평판이 아니라 맡길 일로 고르며, 만리장성 하루와 출발 열차가 서로 의존하지 않게 하세요.",
        heroAlt: "북쪽에서 내려다본 자금성 지붕과 그 너머의 베이징 도심.",
        heroCaption:
          "북쪽에서 보면 자금성은 건물 하나가 아니라 하나의 구역으로 읽힙니다. 이 규모가 중앙축에 온전한 하루를 주어야 하는 이유입니다.",
        openGraphLocale: "ko_KR",
        geography: {
          title: "베이징은 목록이 아니라 다섯 방향입니다",
          caption:
            "축척이 아닌 방위 개념도입니다. 어떤 과제가 같은 방향을 공유하고 어떤 과제가 하루를 통째로 요구하는지 보여 줍니다.",
          legend: {
            core: "도심 중심축",
            cluster: "별도 시간대 필요",
            outside: "독립된 하루 필요",
            gateway: "공항 또는 철도 관문",
          },
          nodes: {
            axis: {
              label: "톈안먼 · 자금성 · 징산",
              note: "남에서 북으로 걷는 도심 하루",
            },
            south: {
              label: "첸먼 · 천단공원",
              note: "남부 축; 반나절에서 하루",
            },
            northwest: {
              label: "이허위안 · 서북부",
              note: "충실한 반나절, 흔히 하루에 가까움",
            },
            gulou: {
              label: "구러우 · 스차하이",
              note: "동네 규모와 저녁 시간",
            },
            chaoyang: {
              label: "차오양 · CBD",
              note: "현대 도시, 식사, 늦은 도착",
            },
            wall: {
              label: "만리장성",
              note: "왕복 이동이 필요; 곁들이는 일정이 될 수 없음",
            },
            pek: { label: "PEK 서우두공항", note: "북동쪽, 둥즈먼 경유" },
            pkx: { label: "PKX 다싱공항", note: "먼 남쪽, 차오차오 경유" },
          },
        },
      },
    },
  },
  {
    id: "shanghai",
    lifecycle: "published",
    entityId: "city-shanghai",
    heroImagePath: "/images/destinations/shanghai/hero-1600.webp",
    heroImageUrl:
      "https://homegroundchina.com/images/destinations/shanghai/hero-1600.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    datePublished: "2026-08-16",
    dateModified: "2026-08-16",
    sourceReviewedDate: "2026-08-16",
    supportGuideIds: [
      "shanghai-where-to-stay-first-trip",
      "shanghai-pudong-or-hongqiao-airport",
      "pudong-airport-to-shanghai-disneyland",
      "shanghai-hangzhou-transport-route",
      "shanghai-suzhou-hangzhou-nanjing-route-order",
      "shanghai-24-hour-parks-reality-check",
      "yangshan-automated-port-explained",
      "how-to-read-a-chinese-sponge-city",
    ],
    geometry: [
      { id: "bund", x: 0.45, y: 0.45, kind: "core" },
      { id: "oldcity", x: 0.38, y: 0.62, kind: "cluster" },
      { id: "square", x: 0.32, y: 0.38, kind: "cluster" },
      { id: "jingan", x: 0.16, y: 0.42, kind: "cluster" },
      { id: "lujiazui", x: 0.62, y: 0.42, kind: "cluster" },
      { id: "hongqiao", x: 0.06, y: 0.6, kind: "gateway" },
      { id: "pvg", x: 0.92, y: 0.35, kind: "gateway" },
      { id: "disney", x: 0.86, y: 0.72, kind: "outside" },
    ],
    locales: {
      en: {
        path: hubPath("shanghai", "en"),
        title: "Shanghai Travel Guide: Days, Areas, Airports, Next City",
        h1: "Shanghai travel guide: how many complete days, which bank, which gateway",
        description:
          "Decide how many complete Shanghai days you have, whether to base in Puxi or Pudong, how PVG, SHA and the Airport Link change arrival, and whether Suzhou or Hangzhou is a day trip or the next hotel.",
        navTitle: "Shanghai",
        summary:
          "Shanghai is three decisions at once: an international gateway, a city worth its own days, and the strongest transport node in the Yangtze Delta. Three complete city days is the balanced first-trip stay, central Puxi is the default base unless a flight or exhibition says otherwise, and Disneyland or a delta city is a separate day rather than an extra afternoon.",
        heroAlt:
          "Puxi rooftops in the foreground with the Lujiazui skyline in Pudong beyond, at dusk.",
        heroCaption:
          "One frame holds the whole argument: older Puxi in front, the Lujiazui towers across the Huangpu. Most first-trip decisions are really about which bank a day belongs to.",
        openGraphLocale: "en_US",
        geography: {
          title: "Read Shanghai west to east across the Huangpu",
          caption:
            "Orientation diagram, not to scale. The river, not a ranking of attractions, is what organises a Shanghai day.",
          legend: {
            core: "Central anchor",
            cluster: "Own block of time",
            outside: "Independent full day",
            gateway: "Airport or rail gateway",
          },
          nodes: {
            bund: { label: "The Bund", note: "Waterfront hinge between both banks" },
            oldcity: {
              label: "Old City · Yu Garden",
              note: "Enclosed garden, market and lanes",
            },
            square: {
              label: "People's Square · E Nanjing Rd",
              note: "Civic, museum and commercial spine",
            },
            jingan: {
              label: "Jing'an · Former French Concession",
              note: "Neighbourhood scale and long walks",
            },
            lujiazui: {
              label: "Lujiazui",
              note: "Towers and the return view to Puxi",
            },
            hongqiao: {
              label: "Hongqiao hub",
              note: "SHA and the main high-speed station; far west",
            },
            pvg: { label: "PVG", note: "Long-haul gateway; far east" },
            disney: {
              label: "Disneyland",
              note: "Eastern resort; a separate full day",
            },
          },
        },
      },
      zh: {
        path: hubPath("shanghai", "zh"),
        title: "上海旅行指南：几个完整日、住哪一岸、机场与下一站",
        h1: "上海旅行指南：先算完整游览日，再决定住哪一岸",
        description:
          "上海真正能有几个完整游览日、住浦西还是浦东、浦东与虹桥机场和机场联络线怎样改变抵达，以及苏州杭州应当当日往返还是直接换城。",
        navTitle: "上海",
        summary:
          "上海同时是三件事：国际门户、值得单独停留的城市，以及长三角最强的交通节点。第一次来，三个完整游览日是平衡的停留；除非航班或展会另有要求，浦西中心区是默认基地；迪士尼或一座长三角城市要按独立一天计算，而不是一个下午。",
        heroAlt: "黄昏时分，前景是浦西屋顶，远处是浦东陆家嘴天际线。",
        heroCaption:
          "一张照片就说清了核心问题：前面是老浦西，黄浦江对岸是陆家嘴。第一次来上海的多数决定，其实都是在决定这一天属于哪一岸。",
        openGraphLocale: "zh_CN",
        geography: {
          title: "沿黄浦江由西向东读上海",
          caption: "方位示意图，非按比例。组织上海一天的是这条江，不是景点排行。",
          legend: {
            core: "城市中心锚点",
            cluster: "需要独立时段",
            outside: "需要独立整天",
            gateway: "机场或铁路门户",
          },
          nodes: {
            bund: { label: "外滩", note: "连接两岸的滨江枢纽" },
            oldcity: { label: "老城厢 · 豫园", note: "园林、市集与街巷尺度" },
            square: {
              label: "人民广场 · 南京东路",
              note: "公共、博物馆与商业主轴",
            },
            jingan: {
              label: "静安 · 原法租界一带",
              note: "街区尺度，适合长时间步行",
            },
            lujiazui: { label: "陆家嘴", note: "高楼群，以及回望浦西的视角" },
            hongqiao: {
              label: "虹桥枢纽",
              note: "虹桥机场与主要高铁站；位于西端",
            },
            pvg: { label: "浦东机场", note: "远程国际门户；位于东端" },
            disney: { label: "上海迪士尼", note: "东部度假区；独立一天" },
          },
        },
      },
      ko: {
        path: hubPath("shanghai", "ko"),
        title: "상하이 여행 가이드: 온전한 일수·지역·공항·다음 도시",
        h1: "상하이 여행 가이드: 온전한 하루를 먼저 세고, 어느 강안에 묵을지 정하세요",
        description:
          "상하이에서 온전한 관광일이 며칠인지, 푸시와 푸둥 중 어디에 묵을지, PVG·SHA와 공항연락선이 도착을 어떻게 바꾸는지, 쑤저우와 항저우는 당일치기인지 다음 도시인지 정리합니다.",
        navTitle: "상하이",
        summary:
          "상하이는 국제 관문이자 그 자체로 며칠을 쓸 만한 도시이며 창장 삼각주에서 가장 강한 교통 결절점입니다. 첫 여행이라면 온전한 사흘이 균형 잡힌 체류이고, 항공편이나 전시 일정이 아니라면 푸시 중심이 기본 거점이며, 디즈니랜드나 삼각주 도시는 오후가 아니라 독립된 하루로 계산해야 합니다.",
        heroAlt:
          "해질 무렵 앞쪽으로 푸시의 지붕들이, 강 건너로 푸둥 루자쭈이 스카이라인이 보인다.",
        heroCaption:
          "한 장면에 핵심이 다 들어 있습니다. 앞은 오래된 푸시, 황푸강 건너는 루자쭈이입니다. 첫 여행의 결정 대부분은 결국 그날이 어느 강안에 속하는지의 문제입니다.",
        openGraphLocale: "ko_KR",
        geography: {
          title: "황푸강을 기준으로 서에서 동으로 읽기",
          caption:
            "축척이 아닌 방위 개념도입니다. 상하이의 하루를 정리하는 것은 명소 순위가 아니라 이 강입니다.",
          legend: {
            core: "도심 중심축",
            cluster: "별도 시간대 필요",
            outside: "독립된 하루 필요",
            gateway: "공항 또는 철도 관문",
          },
          nodes: {
            bund: { label: "와이탄", note: "양안을 잇는 강변 축" },
            oldcity: { label: "올드시티 · 위위안", note: "정원, 시장, 골목 규모" },
            square: {
              label: "인민광장 · 난징둥루",
              note: "공공·박물관·상업 축",
            },
            jingan: {
              label: "징안 · 옛 프랑스 조계",
              note: "동네 규모, 오래 걷기 좋은 구역",
            },
            lujiazui: { label: "루자쭈이", note: "고층 군집과 푸시를 되돌아보는 시점" },
            hongqiao: {
              label: "훙차오 허브",
              note: "SHA와 주요 고속철도역; 서쪽 끝",
            },
            pvg: { label: "PVG 푸둥공항", note: "장거리 국제 관문; 동쪽 끝" },
            disney: { label: "상하이 디즈니랜드", note: "동부 리조트; 독립된 하루" },
          },
        },
      },
    },
  },
  {
    id: "xian",
    lifecycle: "published",
    entityId: "city-xian",
    heroImagePath: "/images/destinations/xian/hero-1600.webp",
    heroImageUrl:
      "https://homegroundchina.com/images/destinations/xian/hero-1600.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    datePublished: "2026-08-16",
    dateModified: "2026-08-16",
    sourceReviewedDate: "2026-08-16",
    supportGuideIds: [
      "terracotta-warriors-without-tour",
      "shaanxi-history-museum-booking-and-collection-plan",
      "xian-where-to-stay-city-wall-or-dayanta",
      "beijing-xian-chengdu-route-order",
      "chinese-city-walls-gates-and-urban-order",
      "ritual-bronze-vessels-and-inscriptions",
    ],
    geometry: [
      { id: "wall", x: 0.36, y: 0.45, kind: "core" },
      { id: "south", x: 0.4, y: 0.74, kind: "cluster" },
      { id: "lintong", x: 0.76, y: 0.36, kind: "outside" },
      { id: "huashan", x: 0.93, y: 0.62, kind: "outside" },
      { id: "north", x: 0.34, y: 0.12, kind: "gateway" },
      { id: "xiy", x: 0.12, y: 0.14, kind: "gateway" },
      { id: "east", x: 0.66, y: 0.14, kind: "gateway" },
    ],
    locales: {
      en: {
        path: hubPath("xian", "en"),
        title: "Xi'an Travel Guide: Nights, Base, Stations and Next City",
        h1: "Xi'an travel guide: how many nights, which base, and what comes next",
        description:
          "Three nights is the balanced Xi'an stay. Compare bases inside and south of the City Wall, read XIY and three railway stations correctly, and decide whether Mount Hua earns another day.",
        navTitle: "Xi'an",
        summary:
          "Xi'an is not one old square with sights around it. A central walled cluster, a southern museum-and-pagoda cluster, the Lintong mausoleum landscape and Mount Hua are four different jobs. Three nights normally protect two complete days — one for Lintong, one for the city — and Mount Hua pushes the practical minimum to four.",
        heroAlt:
          "Xi'an's south gate and city wall at dusk, with the main avenue running north to the Bell Tower and the modern city beyond.",
        heroCaption:
          "The wall, the gate, the avenue and the Bell Tower are one continuous structure. Reading that line first is what stops Xi'an from becoming a scattered checklist.",
        openGraphLocale: "en_US",
        geography: {
          title: "Four Xi'an jobs at four distances",
          caption:
            "Orientation diagram, not to scale. Distance from the walled centre is what decides how much of a day each task takes.",
          legend: {
            core: "Central anchor",
            cluster: "Own block of time",
            outside: "Independent full day",
            gateway: "Airport or rail gateway",
          },
          nodes: {
            wall: {
              label: "City Wall · Bell and Drum Towers",
              note: "Old-city orientation and evenings",
            },
            south: {
              label: "Shaanxi History Museum · Dayanta",
              note: "Museum morning, pagoda afternoon; timed reservation",
            },
            lintong: {
              label: "Lintong · Terracotta Warriors",
              note: "Most of a day, outside the hotel area",
            },
            huashan: {
              label: "Mount Hua",
              note: "External mountain day or overnight",
            },
            north: { label: "Xi'an North", note: "Main high-speed hub, north of the centre" },
            xiy: { label: "XIY airport", note: "Northwest, on the Xianyang side" },
            east: { label: "Xi'an East", note: "Eastern hub in use since 2026" },
          },
        },
      },
      zh: {
        path: hubPath("xian", "zh"),
        title: "西安旅行指南：住几晚、住哪里、车站与下一站",
        h1: "西安旅行指南：住几晚、以哪里为基地、下一站去哪",
        description:
          "西安通常三晚最平衡。比较城墙内与城南两类住宿基地，正确理解咸阳机场与三座铁路站，并判断华山值不值得再加一天。",
        navTitle: "西安",
        summary:
          "西安不是一个古城广场加一圈景点。城墙钟鼓楼的中心区、城南博物馆与雁塔片区、临潼的帝陵景观、华山，是四件不同的事。三晚通常能保住两个完整日：一天给临潼，一天给城市；如果要去华山，实用下限就变成四晚。",
        heroAlt:
          "黄昏时的西安南门与城墙，中轴大街向北通往钟楼，远处是现代城区。",
        heroCaption:
          "城墙、城门、大街与钟楼本来就是一条连续结构。先读懂这条线，西安才不会变成一份散落的清单。",
        openGraphLocale: "zh_CN",
        geography: {
          title: "四件西安任务，四种距离",
          caption:
            "方位示意图，非按比例。离城墙中心多远，决定了每件任务会吃掉多少时间。",
          legend: {
            core: "城市中心锚点",
            cluster: "需要独立时段",
            outside: "需要独立整天",
            gateway: "机场或铁路门户",
          },
          nodes: {
            wall: {
              label: "城墙 · 钟鼓楼",
              note: "老城定位与夜间时间",
            },
            south: {
              label: "陕西历史博物馆 · 大雁塔",
              note: "上午博物馆、下午雁塔；需分时预约",
            },
            lintong: {
              label: "临潼 · 兵马俑",
              note: "占掉大半天，且不在住宿区",
            },
            huashan: {
              label: "华山",
              note: "城外整日行程或过夜延伸",
            },
            north: { label: "西安北站", note: "主要高铁枢纽，在城北" },
            xiy: { label: "咸阳机场", note: "西北方向，位于咸阳一侧" },
            east: { label: "西安东站", note: "2026 年启用的东部枢纽" },
          },
        },
      },
      ko: {
        path: hubPath("xian", "ko"),
        title: "시안 여행 가이드: 숙박 일수·거점·기차역·다음 도시",
        h1: "시안 여행 가이드: 몇 박, 어느 거점, 그리고 다음 도시",
        description:
          "시안은 보통 3박이 균형점입니다. 성벽 안과 성 남쪽 거점을 비교하고, XIY 공항과 세 기차역을 정확히 읽고, 화산에 하루를 더 쓸지 판단하세요.",
        navTitle: "시안",
        summary:
          "시안은 옛 광장 하나에 명소가 둘러선 도시가 아닙니다. 성벽과 종고루의 중심 권역, 남쪽 박물관·대안탑 권역, 린퉁의 능묘 경관, 화산은 서로 다른 네 가지 과제입니다. 3박이면 보통 온전한 이틀을 지킬 수 있고, 하루는 린퉁에 하루는 도시에 씁니다. 화산을 넣으면 실질 최소는 4박이 됩니다.",
        heroAlt:
          "해질 무렵 시안 남문과 성벽, 북쪽 종루로 이어지는 중앙 대로와 그 너머 현대 도심.",
        heroCaption:
          "성벽, 성문, 대로, 종루는 원래 하나의 연속된 구조입니다. 이 선을 먼저 읽어야 시안이 흩어진 목록이 되지 않습니다.",
        openGraphLocale: "ko_KR",
        geography: {
          title: "네 가지 과제, 네 가지 거리",
          caption:
            "축척이 아닌 방위 개념도입니다. 성벽 중심에서 얼마나 떨어져 있는지가 그 과제가 하루의 얼마를 쓰는지를 결정합니다.",
          legend: {
            core: "도심 중심축",
            cluster: "별도 시간대 필요",
            outside: "독립된 하루 필요",
            gateway: "공항 또는 철도 관문",
          },
          nodes: {
            wall: {
              label: "성벽 · 종루와 고루",
              note: "옛 도심 파악과 저녁 시간",
            },
            south: {
              label: "산시역사박물관 · 대안탑",
              note: "오전 박물관, 오후 대안탑; 시간대 예약 필요",
            },
            lintong: {
              label: "린퉁 · 병마용",
              note: "하루의 대부분을 쓰며 숙소 권역 밖",
            },
            huashan: {
              label: "화산",
              note: "도시 밖 하루 일정 또는 1박 연장",
            },
            north: { label: "시안북역", note: "도심 북쪽의 주요 고속철도 허브" },
            xiy: { label: "XIY 공항", note: "북서쪽, 셴양 방향" },
            east: { label: "시안동역", note: "2026년부터 운영되는 동부 허브" },
          },
        },
      },
    },
  },
  {
    id: "chengdu",
    lifecycle: "published",
    entityId: "city-chengdu",
    heroImagePath: "/images/destinations/chengdu/hero-1600.webp",
    heroImageUrl:
      "https://homegroundchina.com/images/destinations/chengdu/hero-1600.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    sourceReviewedDate: "2026-08-17",
    supportGuideIds: [
      "chengdu-panda-base-or-dujiangyan-panda-valley",
      "sanxingdui-museum-booking-and-gallery-order",
      "chengdu-jiuzhaigou-transport-route",
      "chengdu-greenway-city-ring",
      "sichuan-opera-face-changing-with-context",
      "beijing-xian-chengdu-route-order",
      "china-in-october-golden-week-or-later",
    ],
    geometry: [
      { id: "centre", x: 0.46, y: 0.48, kind: "core" },
      { id: "panda", x: 0.63, y: 0.28, kind: "cluster" },
      { id: "wuhou", x: 0.34, y: 0.58, kind: "cluster" },
      { id: "dujiangyan", x: 0.14, y: 0.2, kind: "outside" },
      { id: "sanxingdui", x: 0.6, y: 0.08, kind: "outside" },
      { id: "leshan", x: 0.38, y: 0.9, kind: "outside" },
      { id: "tfu", x: 0.82, y: 0.68, kind: "gateway" },
      { id: "ctu", x: 0.26, y: 0.72, kind: "gateway" },
      { id: "east", x: 0.68, y: 0.48, kind: "gateway" },
    ],
    locales: {
      en: {
        path: hubPath("chengdu", "en"),
        title: "Chengdu Travel Guide: Nights, Base, Airports, Sichuan Next",
        h1: "Chengdu travel guide: settle the city first, then build the Sichuan route",
        description:
          "How many complete days Chengdu itself needs, which base protects them, why TFU and CTU are separate decisions, and which Sichuan trips are branches rather than half-days.",
        navTitle: "Chengdu",
        summary:
          "Chengdu does three jobs at once: a slower counterweight to Beijing, Xi'an or Shanghai, the easiest big-city base for a first panda visit, and the gateway to a much larger Sichuan journey. Two or three nights cover the city. Dujiangyan, Sanxingdui, Leshan and Jiuzhaigou are separate branches that need their own days or their own beds, not a longer commute from one downtown hotel.",
        heroAlt:
          "Visitors drinking tea in bamboo chairs under a covered pavilion at a traditional tea house in Chengdu's People's Park.",
        heroCaption:
          "A People's Park tea house is not a ten-minute photo stop. Sitting long enough to watch the place work is the clearest illustration of how Chengdu spends a day.",
        openGraphLocale: "en_US",
        searchTerms: [
          "how many days in Chengdu",
          "where to stay in Chengdu first time",
          "Tianfu or Shuangliu airport",
          "Chengdu to Dujiangyan day trip",
          "Chengdu Sichuan itinerary",
        ],
        geography: {
          title: "Chengdu, and the Sichuan trips that only start there",
          caption:
            "Orientation diagram, not to scale. Distance from the centre is what decides whether something is a Chengdu day or a separate journey.",
          legend: {
            core: "Central anchor",
            cluster: "Own block of time",
            outside: "Separate day or its own bed",
            gateway: "Airport or rail gateway",
          },
          nodes: {
            centre: {
              label: "People's Park · Tianfu Square",
              note: "Tea houses, museums, central walking",
            },
            panda: {
              label: "Chengdu Panda Base",
              note: "City-edge morning plus its transport block",
            },
            wuhou: {
              label: "Wuhou Shrine · Jinli",
              note: "Historical narrative and its commercial frame",
            },
            dujiangyan: {
              label: "Dujiangyan · Panda Valley",
              note: "A separate city west of Chengdu; full day",
            },
            sanxingdui: {
              label: "Sanxingdui, Guanghan",
              note: "Another city north-east; timed reservation",
            },
            leshan: {
              label: "Leshan",
              note: "A city to the south; never a half-day",
            },
            tfu: { label: "TFU Tianfu Airport", note: "Far south-east; long transfer" },
            ctu: { label: "CTU Shuangliu Airport", note: "South-west; closer in" },
            east: { label: "Chengdu East", note: "Main high-speed gateway" },
          },
        },
      },
      zh: {
        path: hubPath("chengdu", "zh"),
        title: "成都旅行指南：住几晚、住哪里、机场与四川下一站",
        h1: "成都旅行指南：先把城市住稳，再搭四川路线",
        description:
          "成都本身需要几个完整日、哪个基地能保住这些日子、天府与双流为什么是两个独立决定，以及哪些四川行程是独立支线而不是半天。",
        navTitle: "成都",
        summary:
          "成都同时承担三件事：北京、西安、上海之后的慢节奏对照，第一次看熊猫最省事的大城市基地，以及整段四川行程的门户。城市本身两到三晚够用；都江堰、三星堆、乐山和九寨沟是各自独立的支线，需要自己的一天或自己的床位，而不是从市中心酒店反复长途通勤。",
        heroAlt: "成都人民公园传统茶馆的廊下，游客坐在竹椅上喝盖碗茶。",
        heroCaption:
          "人民公园的茶馆不是十分钟拍照点。坐得够久、看清这个地方怎么运转，才最能说明成都的一天该怎么花。",
        openGraphLocale: "zh_CN",
        searchTerms: [
          "成都要玩几天",
          "第一次去成都住哪里",
          "天府机场还是双流机场",
          "成都到都江堰一日游",
          "成都四川行程怎么排",
        ],
        geography: {
          title: "成都，以及那些只是从成都出发的四川行程",
          caption: "方位示意图，非按比例。离市中心多远，决定了它是成都的一天，还是一段独立行程。",
          legend: {
            core: "城市中心锚点",
            cluster: "需要独立时段",
            outside: "需要独立一天或自己的住宿",
            gateway: "机场或铁路门户",
          },
          nodes: {
            centre: { label: "人民公园 · 天府广场", note: "茶馆、博物馆与中心步行" },
            panda: { label: "成都大熊猫繁育研究基地", note: "城市边缘的上午，加上往返时段" },
            wuhou: { label: "武侯祠 · 锦里", note: "历史叙事及其商业外壳" },
            dujiangyan: { label: "都江堰 · 熊猫谷", note: "成都以西的另一座城市；整天" },
            sanxingdui: { label: "广汉三星堆", note: "东北方向另一座城市；需分时预约" },
            leshan: { label: "乐山", note: "南面的另一座城市；从来不是半天" },
            tfu: { label: "天府机场 TFU", note: "东南远端；接驳时间长" },
            ctu: { label: "双流机场 CTU", note: "西南方向；离城更近" },
            east: { label: "成都东站", note: "主要高铁门户" },
          },
        },
      },
      ko: {
        path: hubPath("chengdu", "ko"),
        title: "청두 여행 가이드: 숙박 일수·거점·공항·쓰촨 다음 코스",
        h1: "청두 여행 가이드: 도시를 먼저 정하고 쓰촨 동선을 붙이세요",
        description:
          "청두 자체에 온전한 며칠이 필요한지, 어느 거점이 그 시간을 지켜 주는지, TFU와 CTU가 왜 별개의 결정인지, 어떤 쓰촨 일정이 반나절이 아니라 독립된 갈래인지 정리합니다.",
        navTitle: "청두",
        summary:
          "청두는 세 가지 역할을 동시에 합니다. 베이징·시안·상하이 뒤의 느린 대비, 첫 판다 방문에 가장 수월한 대도시 거점, 그리고 훨씬 큰 쓰촨 여정의 관문입니다. 도시 자체는 2~3박이면 충분하고, 두장옌·싼싱두이·러산·주자이거우는 각자의 하루나 각자의 잠자리를 요구하는 별개의 갈래입니다.",
        heroAlt:
          "청두 인민공원의 전통 찻집 정자 아래에서 대나무 의자에 앉아 차를 마시는 사람들.",
        heroCaption:
          "인민공원 찻집은 10분짜리 사진 명소가 아닙니다. 그곳이 돌아가는 모습을 볼 만큼 앉아 있는 것이 청두의 하루를 가장 잘 설명합니다.",
        openGraphLocale: "ko_KR",
        searchTerms: [
          "청두 며칠",
          "청두 첫 여행 숙소",
          "톈푸공항 솽류공항 차이",
          "청두 두장옌 당일치기",
          "청두 쓰촨 일정",
        ],
        geography: {
          title: "청두, 그리고 청두에서 출발할 뿐인 쓰촨 일정들",
          caption:
            "축척이 아닌 방위 개념도입니다. 도심에서 얼마나 떨어져 있는지가 그것이 청두의 하루인지 별개의 여정인지를 결정합니다.",
          legend: {
            core: "도심 중심축",
            cluster: "별도 시간대 필요",
            outside: "독립된 하루 또는 별도 숙박",
            gateway: "공항 또는 철도 관문",
          },
          nodes: {
            centre: { label: "인민공원 · 톈푸광장", note: "찻집, 박물관, 도심 보행" },
            panda: { label: "청두 자이언트판다 기지", note: "도시 외곽의 오전과 이동 시간" },
            wuhou: { label: "우허우츠 · 진리", note: "역사 서사와 그 상업적 외피" },
            dujiangyan: { label: "두장옌 · 판다밸리", note: "청두 서쪽의 다른 도시; 하루" },
            sanxingdui: { label: "광한 싼싱두이", note: "북동쪽 다른 도시; 시간대 예약" },
            leshan: { label: "러산", note: "남쪽의 다른 도시; 반나절이 될 수 없음" },
            tfu: { label: "TFU 톈푸공항", note: "남동쪽 끝; 이동이 긺" },
            ctu: { label: "CTU 솽류공항", note: "남서쪽; 도심에 더 가까움" },
            east: { label: "청두동역", note: "주요 고속철도 관문" },
          },
        },
      },
    },
  },
  {
    id: "guangzhou",
    lifecycle: "published",
    entityId: "city-guangzhou",
    heroImagePath: "/images/destinations/guangzhou/hero-1600.webp",
    heroImageUrl:
      "https://homegroundchina.com/images/destinations/guangzhou/hero-1600.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    datePublished: "2026-08-17",
    dateModified: "2026-08-17",
    sourceReviewedDate: "2026-08-17",
    supportGuideIds: [
      "guangzhou-baiyun-airport-t2-t3",
      "guangzhou-hong-kong-transport-route",
      "guangzhou-macau-transport-route",
      "guangzhou-shenzhen-hong-kong-route-order",
      "how-guangzhou-morning-tea-works",
      "when-metro-construction-meets-archaeology",
    ],
    geometry: [
      { id: "liwan", x: 0.3, y: 0.48, kind: "core" },
      { id: "yuexiu", x: 0.44, y: 0.46, kind: "cluster" },
      { id: "tianhe", x: 0.62, y: 0.44, kind: "cluster" },
      { id: "pazhou", x: 0.64, y: 0.6, kind: "cluster" },
      { id: "panyu", x: 0.55, y: 0.86, kind: "outside" },
      { id: "baiyun", x: 0.42, y: 0.08, kind: "gateway" },
      { id: "gzstation", x: 0.38, y: 0.3, kind: "gateway" },
      { id: "east", x: 0.66, y: 0.3, kind: "gateway" },
      { id: "south", x: 0.46, y: 0.72, kind: "gateway" },
    ],
    locales: {
      en: {
        path: hubPath("guangzhou", "en"),
        title: "Guangzhou Travel Guide: Nights, Base, Terminal, Station",
        h1: "Guangzhou travel guide: decide whether the city gets nights, then pick the terminal and the station",
        description:
          "Whether Guangzhou deserves its own nights, which district to base in, how Baiyun's terminals and five railway stations change the plan, and what Foshan, Shunde or Chimelong really cost.",
        navTitle: "Guangzhou",
        summary:
          "Guangzhou is an international arrival city, the centre of Lingnan urban culture, and a rail hinge for the Pearl River Delta. Two nights buy one strong old-city day; three let Liwan and the new Pearl River axis coexist. The airport terminal, the railway station and the hotel district have to be chosen as one chain, because none of those names is interchangeable.",
        heroAlt:
          "The front hall of the Chen Clan Ancestral Hall in Guangzhou, with carved ridge sculpture along the roofline.",
        heroCaption:
          "Lingnan craft reads at roof level. The Chen Clan Ancestral Hall is a focused architecture visit, not a wing of a larger old-town circuit.",
        openGraphLocale: "en_US",
        searchTerms: [
          "how many nights in Guangzhou",
          "where to stay in Guangzhou first time",
          "Baiyun airport terminal T2 or T3",
          "which Guangzhou railway station",
          "Guangzhou to Hong Kong or Macao",
        ],
        geography: {
          title: "Guangzhou as an old west, a new east and four separate gateways",
          caption:
            "Orientation diagram, not to scale. The gateways sit on different sides of the city, which is why the hotel cannot be chosen before the ticket.",
          legend: {
            core: "Central anchor",
            cluster: "Own block of time",
            outside: "Separate full day",
            gateway: "Airport or rail gateway",
          },
          nodes: {
            liwan: {
              label: "Liwan · Shamian",
              note: "Lingnan old city, lanes, a slower evening",
            },
            yuexiu: {
              label: "Beijing Road · Yuexiu",
              note: "Civic history, museums, visible road layers",
            },
            tianhe: {
              label: "Tianhe · Zhujiang New Town",
              note: "The contemporary central axis",
            },
            pazhou: {
              label: "Pazhou",
              note: "Exhibition district; a fair changes prices and crowds",
            },
            panyu: {
              label: "Chimelong, Panyu",
              note: "A southern family zone; its own full day",
            },
            baiyun: { label: "Baiyun Airport", note: "Far north; T2 and T3 differ" },
            gzstation: { label: "Guangzhou Station", note: "Central-north; high-speed since Jan 2026" },
            east: { label: "Guangzhou East", note: "Tianhe side; strong city access" },
            south: { label: "Guangzhou South", note: "Panyu; large and not downtown" },
          },
        },
      },
      zh: {
        path: hubPath("guangzhou", "zh"),
        title: "广州旅行指南：住不住、住哪里、哪个航站楼、哪个车站",
        h1: "广州旅行指南：住几晚、住哪个区、走哪个门户",
        description:
          "广州值不值得单独住几晚、以哪个城区为基地、白云机场航站楼与五个火车站怎样改变计划，以及佛山、顺德和长隆真正要花多少时间。",
        navTitle: "广州",
        summary:
          "广州同时是国际到达城市、岭南城市文化的中心，以及珠三角的铁路枢纽。住两晚能换来一个扎实的老城日；三晚才能让荔湾和珠江新城这条新轴线同时成立。航站楼、火车站和住宿区必须当成一条链一起选，因为这几个名字没有一个是可以互换的。",
        heroAlt: "广州陈家祠前殿，屋脊上是成排的灰塑与陶塑装饰。",
        heroCaption:
          "岭南工艺要抬头看屋脊。陈家祠是一次集中的建筑参观，不是某条老城线路顺路的一站。",
        openGraphLocale: "zh_CN",
        searchTerms: [
          "广州要住几晚",
          "第一次去广州住哪个区",
          "白云机场 T2 还是 T3",
          "广州哪个火车站",
          "广州去香港澳门怎么走",
        ],
        geography: {
          title: "广州：西边的老城、东边的新轴线，和四个分散的门户",
          caption: "方位示意图，非按比例。门户分布在城市不同侧，这就是酒店不能先于车票决定的原因。",
          legend: {
            core: "城市中心锚点",
            cluster: "需要独立时段",
            outside: "需要独立整天",
            gateway: "机场或铁路门户",
          },
          nodes: {
            liwan: { label: "荔湾 · 沙面", note: "岭南老城、街巷与更慢的晚上" },
            yuexiu: { label: "北京路 · 越秀", note: "城市史、博物馆与可见的路面层" },
            tianhe: { label: "天河 · 珠江新城", note: "当代中央轴线" },
            pazhou: { label: "琶洲", note: "会展片区；展会会改变房价与人流" },
            panyu: { label: "番禺长隆", note: "南部亲子片区；需要独立一天" },
            baiyun: { label: "白云机场", note: "城北远端；T2 与 T3 不同" },
            gzstation: { label: "广州站", note: "城中偏北；2026 年 1 月起转高铁" },
            east: { label: "广州东站", note: "天河一侧；进城方便" },
            south: { label: "广州南站", note: "在番禺；很大且不在市区" },
          },
        },
      },
      ko: {
        path: hubPath("guangzhou", "ko"),
        title: "광저우 여행 가이드: 숙박 여부·지역·터미널·기차역",
        h1: "광저우 여행 가이드: 묵을지부터 정하고 터미널과 역을 고르세요",
        description:
          "광저우에 따로 묵을 가치가 있는지, 어느 지역을 거점으로 삼을지, 바이윈공항 터미널과 다섯 기차역이 계획을 어떻게 바꾸는지, 포산·순더·침롱이 실제로 얼마를 쓰는지 정리합니다.",
        navTitle: "광저우",
        summary:
          "광저우는 국제선 도착 도시이자 링난 도시 문화의 중심이며 주장 삼각주의 철도 결절점입니다. 2박이면 탄탄한 옛 도심 하루를, 3박이면 리완과 주장신청 축을 함께 담을 수 있습니다. 터미널과 기차역, 숙소 지역은 하나의 사슬로 함께 골라야 합니다. 그 이름들 중 서로 바꿔 쓸 수 있는 것은 하나도 없습니다.",
        heroAlt: "광저우 천가사 앞 전각과 지붕마루를 따라 늘어선 조소 장식.",
        heroCaption:
          "링난 공예는 지붕마루에서 읽힙니다. 천가사는 옛 도심 코스에 곁들이는 곳이 아니라 집중해서 보는 건축 방문입니다.",
        openGraphLocale: "ko_KR",
        searchTerms: [
          "광저우 몇 박",
          "광저우 첫 여행 숙소 지역",
          "바이윈공항 T2 T3",
          "광저우 어느 기차역",
          "광저우 홍콩 마카오 이동",
        ],
        geography: {
          title: "서쪽의 옛 도심, 동쪽의 새 축, 그리고 흩어진 네 관문",
          caption:
            "축척이 아닌 방위 개념도입니다. 관문이 도시의 서로 다른 방향에 있어서 티켓보다 숙소를 먼저 정할 수 없습니다.",
          legend: {
            core: "도심 중심축",
            cluster: "별도 시간대 필요",
            outside: "독립된 하루 필요",
            gateway: "공항 또는 철도 관문",
          },
          nodes: {
            liwan: { label: "리완 · 사몐", note: "링난 옛 도심, 골목, 느린 저녁" },
            yuexiu: { label: "베이징루 · 웨슈", note: "도시사, 박물관, 드러난 옛 노면" },
            tianhe: { label: "톈허 · 주장신청", note: "현대의 중앙축" },
            pazhou: { label: "파저우", note: "전시 구역; 박람회가 가격과 혼잡을 바꿈" },
            panyu: { label: "판위 침롱", note: "남부 가족 구역; 독립된 하루" },
            baiyun: { label: "바이윈공항", note: "도시 북쪽 끝; T2와 T3가 다름" },
            gzstation: { label: "광저우역", note: "도심 북쪽; 2026년 1월부터 고속철도" },
            east: { label: "광저우동역", note: "톈허 쪽; 도심 접근 좋음" },
            south: { label: "광저우남역", note: "판위 소재; 크고 도심이 아님" },
          },
        },
      },
    },
  },
  {
    id: "hangzhou",
    lifecycle: "release-candidate",
    entityId: "city-hangzhou",
    heroImagePath: "/images/home/hangzhou-1600.jpg",
    heroImageUrl: "https://homegroundchina.com/images/home/hangzhou-1600.jpg",
    imageWidth: 1600,
    imageHeight: 1066,
    datePublished: null,
    dateModified: "2026-08-20",
    sourceReviewedDate: "2026-08-20",
    supportGuideIds: [
      "shanghai-hangzhou-transport-route",
      "shanghai-suzhou-hangzhou-nanjing-route-order",
      "liangzhu-ruins-park-and-museum-sequence",
      "white-snake-legend-hangzhou-zhenjiang",
      "grand-canal-everyday-urban-history",
      "tea-landscape-regions-of-china",
      "when-metro-construction-meets-archaeology",
    ],
    geometry: [
      { id: "east", x: 0.67, y: 0.51, kind: "core" },
      { id: "north", x: 0.49, y: 0.3, kind: "cluster" },
      { id: "south", x: 0.47, y: 0.69, kind: "cluster" },
      { id: "west", x: 0.23, y: 0.48, kind: "cluster" },
      { id: "canal", x: 0.65, y: 0.13, kind: "cluster" },
      { id: "liangzhu", x: 0.16, y: 0.12, kind: "outside" },
      { id: "hgh", x: 0.92, y: 0.69, kind: "gateway" },
      { id: "eaststation", x: 0.87, y: 0.4, kind: "gateway" },
    ],
    locales: {
      en: {
        path: hubPath("hangzhou", "en"),
        title: "Hangzhou Travel Guide: Day Trip, Nights, Areas and Routes",
        h1: "Hangzhou travel guide: decide whether the city is a day trip or a real stay",
        description:
          "Choose a Shanghai day trip or two- to three-night Hangzhou stay, then match the hotel area, station, West Lake cluster, western hills, Grand Canal and Liangzhu.",
        navTitle: "Hangzhou",
        summary:
          "Hangzhou is not one lake stop beside Shanghai. West Lake meets the city on its east shore, Lingyin and Longjing sit in the western hills, the Grand Canal forms a northern corridor and Liangzhu is a separate suburban heritage day. A disciplined day trip can explain West Lake; two nights let lake, hills and local mornings coexist; a third night creates room for a second geography.",
        heroAlt: "Small boats crossing West Lake in Hangzhou beneath wooded hills and mist.",
        heroCaption:
          "West Lake is a cultural landscape joined to a working city, not one viewpoint. The day-trip decision starts with which shore and cluster can be completed without a fragile return.",
        openGraphLocale: "en_US",
        searchTerms: [
          "Hangzhou day trip or overnight",
          "how many nights in Hangzhou",
          "where to stay in Hangzhou first visit",
          "which Hangzhou railway station",
          "West Lake Lingyin Longjing route",
        ],
        geography: {
          title: "One lake, western hills and two separate heritage directions",
          caption:
            "Orientation diagram, not to scale. It shows why a fast Shanghai train does not make every Hangzhou cluster a day trip.",
          legend: {
            core: "City–lake anchor",
            cluster: "Own block of time",
            outside: "Independent day",
            gateway: "Airport or rail gateway",
          },
          nodes: {
            east: { label: "Hubin · east shore", note: "Urban entrance, evenings, first orientation" },
            north: { label: "Beishan · north shore", note: "Causeways, Gushan and cultural landscape" },
            south: { label: "South line · Leifeng", note: "A second lake perspective, not a full circuit" },
            west: { label: "Lingyin · Longjing", note: "Western hills; selective half or full day" },
            canal: { label: "Grand Canal", note: "Separate northern urban-history block" },
            liangzhu: { label: "Liangzhu", note: "Museum and archaeological landscape; dedicated day" },
            hgh: { label: "HGH airport", note: "Xiaoshan, outside the lake's walking zone" },
            eaststation: { label: "Hangzhou East", note: "Major rail hub east of the visitor core" },
          },
        },
      },
      zh: {
        path: hubPath("hangzhou", "zh"),
        title: "杭州旅行指南：一日往返、住几晚、住宿区域与路线",
        h1: "杭州旅行指南：先决定一日往返，还是把杭州真正住下来",
        description:
          "判断从上海一日往返还是在杭州住两至三晚，再选择住宿区域、铁路站、西湖分区、西部山地、大运河与良渚。",
        navTitle: "杭州",
        summary:
          "杭州不是上海旁边的一座湖。西湖东岸连着城市，灵隐与龙井位于西部山地，大运河形成北部走廊，良渚则是独立的郊区遗产日。克制的一日往返可以读懂西湖；两晚能让湖、山和本地早晚时间同时存在；第三晚才为另一套遗产地理留出空间。",
        heroAlt: "杭州西湖上的小船从水面驶过，远处是树林覆盖的山和雾气。",
        heroCaption:
          "西湖是与城市相接的文化景观，不是一个观景点。一日往返是否成立，取决于能否完整完成一个岸线与分区，并守住返程。",
        openGraphLocale: "zh_CN",
        searchTerms: [
          "杭州一日游还是住一晚",
          "杭州第一次住几晚",
          "杭州住哪个区域",
          "杭州哪个火车站方便",
          "西湖灵隐龙井怎么安排",
        ],
        geography: {
          title: "一座湖、西部山地，以及两个彼此独立的遗产方向",
          caption: "方位示意图，非按比例。它说明为什么上海到杭州车程快，不等于所有分区都适合塞进一日往返。",
          legend: {
            core: "城市—湖面锚点",
            cluster: "需要独立时段",
            outside: "需要独立一天",
            gateway: "机场或铁路门户",
          },
          nodes: {
            east: { label: "湖滨 · 东岸", note: "城市入口、夜间时间、第一次定向" },
            north: { label: "北山 · 北岸", note: "堤岸、孤山与文化景观" },
            south: { label: "南线 · 雷峰", note: "第二种湖景，不是强行环湖" },
            west: { label: "灵隐 · 龙井", note: "西部山地；择重点安排半天或一天" },
            canal: { label: "大运河", note: "独立的北部城市史时段" },
            liangzhu: { label: "良渚", note: "博物院与考古景观；独立一天" },
            hgh: { label: "HGH 萧山机场", note: "位于萧山，不在西湖步行范围" },
            eaststation: { label: "杭州东站", note: "位于游览核心以东的主要铁路枢纽" },
          },
        },
      },
      ko: {
        path: hubPath("hangzhou", "ko"),
        title: "항저우 여행 가이드: 당일치기·숙박 일수·지역·동선",
        h1: "항저우 여행 가이드: 당일치기인지 제대로 머물 도시인지 먼저 정하세요",
        description:
          "상하이 당일치기와 항저우 2~3박을 비교하고 숙소 지역, 기차역, 서호 구역, 서쪽 구릉, 대운하와 량주를 맞춥니다.",
        navTitle: "항저우",
        summary:
          "항저우는 상하이 옆의 호수 하나가 아닙니다. 서호 동쪽은 도시와 만나고, 링인과 룽징은 서쪽 구릉에 있으며, 대운하는 북쪽 회랑을 이루고 량주는 별도의 교외 유산 하루입니다. 절제된 당일치기로 서호의 의미를 볼 수 있고, 2박이면 호수와 구릉 및 현지의 아침·저녁을 함께 담으며, 3박째에 두 번째 유산 지리를 넣을 수 있습니다.",
        heroAlt: "나무가 우거진 산과 안개 아래 항저우 서호를 가로지르는 작은 배들.",
        heroCaption:
          "서호는 한 전망대가 아니라 도시와 이어진 문화경관입니다. 당일치기의 성패는 한 물가 구역을 완성하고 안전한 귀환을 지킬 수 있는지에 달렸습니다.",
        openGraphLocale: "ko_KR",
        searchTerms: [
          "항저우 당일치기 숙박",
          "항저우 몇 박",
          "항저우 첫 여행 숙소 지역",
          "항저우 어느 기차역",
          "서호 링인 룽징 동선",
        ],
        geography: {
          title: "호수 하나, 서쪽 구릉, 서로 다른 두 유산 방향",
          caption: "축척이 아닌 방위 개념도입니다. 상하이에서 기차가 빠르다고 모든 항저우 구역이 당일치기에 들어가는 것은 아닙니다.",
          legend: {
            core: "도시–호수 중심",
            cluster: "별도 시간대 필요",
            outside: "독립된 하루 필요",
            gateway: "공항 또는 철도 관문",
          },
          nodes: {
            east: { label: "후빈 · 동쪽 물가", note: "도시 입구, 저녁, 첫 방향 잡기" },
            north: { label: "베이산 · 북쪽 물가", note: "제방, 구산과 문화경관" },
            south: { label: "남쪽 구간 · 레이펑", note: "두 번째 호수 시선, 억지 일주가 아님" },
            west: { label: "링인 · 룽징", note: "서쪽 구릉; 선택적인 반나절 또는 하루" },
            canal: { label: "대운하", note: "별도의 북쪽 도시사 블록" },
            liangzhu: { label: "량주", note: "박물관과 고고학 경관; 전용 하루" },
            hgh: { label: "HGH 공항", note: "샤오산, 서호 도보권 밖" },
            eaststation: { label: "항저우동역", note: "관광 중심 동쪽의 주요 철도 거점" },
          },
        },
      },
    },
  },
  {
    id: "zhangjiajie",
    lifecycle: "release-candidate",
    entityId: "city-zhangjiajie",
    heroImagePath: "/images/home/zhangjiajie-1600.jpg",
    heroImageUrl: "https://homegroundchina.com/images/home/zhangjiajie-1600.jpg",
    imageWidth: 1600,
    imageHeight: 954,
    datePublished: null,
    dateModified: "2026-08-20",
    sourceReviewedDate: "2026-08-20",
    supportGuideIds: [
      "zhangjiajie-itinerary",
      "zhangjiajie-national-forest-park-tickets-and-entrances",
      "zhangjiajie-city-or-wulingyuan-hotel-base",
      "zhangjiajie-glass-bridge-vs-skywalk",
      "zhangjiajie-older-travellers",
      "best-zhangjiajie-night-show",
      "beijing-zhangjiajie-shanghai-transport",
      "beijing-zhangjiajie-shanghai-10-days",
      "zhangjiajie-from-malaysia",
      "china-in-october-golden-week-or-later",
    ],
    geometry: [
      { id: "city", x: 0.39, y: 0.78, kind: "core" },
      { id: "wulingyuan", x: 0.7, y: 0.48, kind: "cluster" },
      { id: "yuanjiajie", x: 0.57, y: 0.26, kind: "cluster" },
      { id: "tianzi", x: 0.78, y: 0.18, kind: "cluster" },
      { id: "tianmen", x: 0.27, y: 0.53, kind: "outside" },
      { id: "grandcanyon", x: 0.93, y: 0.6, kind: "outside" },
      { id: "dyg", x: 0.17, y: 0.86, kind: "gateway" },
      { id: "weststation", x: 0.27, y: 0.68, kind: "gateway" },
    ],
    locales: {
      en: {
        path: hubPath("zhangjiajie", "en"),
        title: "Zhangjiajie Travel Guide: Days, Bases, Parks and Routes",
        h1: "Zhangjiajie travel guide: separate the city, Wulingyuan and the mountain systems",
        description:
          "Choose 2, 3 or 4 full days, Zhangjiajie city or Wulingyuan as a base, then connect the National Forest Park, Tianmen Mountain, Grand Canyon and the next city.",
        navTitle: "Zhangjiajie",
        summary:
          "Zhangjiajie is one destination name covering a city gateway and several mountain systems that do not share one entrance. Most first trips need three complete sightseeing days and at least one deliberate hotel-base decision. The city serves Tianmen Mountain, the airport and railway station; Wulingyuan protects early National Forest Park starts. Grand Canyon and Fenghuang are separate route decisions, not spare stops.",
        heroAlt: "Mist moving among sandstone pillars in Zhangjiajie National Forest Park.",
        heroCaption:
          "The pillars explain the destination, but they do not explain the gates, hotel base or transfer chain. Zhangjiajie works only after those systems are separated.",
        openGraphLocale: "en_US",
        searchTerms: [
          "Zhangjiajie travel guide",
          "how many days in Zhangjiajie",
          "Zhangjiajie city or Wulingyuan",
          "Zhangjiajie National Forest Park entrances",
          "Zhangjiajie Tianmen Mountain Grand Canyon route",
        ],
        geography: {
          title: "A city gateway and three separate mountain decisions",
          caption: "Orientation diagram, not to scale. Ticket names and map pins do not make these systems interchangeable.",
          legend: {
            core: "City gateway",
            cluster: "National-park cluster",
            outside: "Separate attraction day",
            gateway: "Airport or rail gateway",
          },
          nodes: {
            city: { label: "Zhangjiajie city", note: "Tianmen base, airport, rail and late arrivals" },
            wulingyuan: { label: "Wulingyuan", note: "Main park-side base and east-gate area" },
            yuanjiajie: { label: "Yuanjiajie", note: "Upper plateau; reached through a transport chain" },
            tianzi: { label: "Tianzi Mountain", note: "Separate upper scenic cluster" },
            tianmen: { label: "Tianmen Mountain", note: "City-side ticket system; independent day" },
            grandcanyon: { label: "Grand Canyon", note: "Glass Bridge area; not inside the forest park" },
            dyg: { label: "DYG airport", note: "City-side gateway" },
            weststation: { label: "Zhangjiajie West", note: "Rail gateway north of the city core" },
          },
        },
      },
      zh: {
        path: hubPath("zhangjiajie", "zh"),
        title: "张家界旅行指南：玩几天、住哪里、景区关系与路线",
        h1: "张家界旅行指南：先分清市区、武陵源和不同山岳系统",
        description:
          "选择2、3或4个完整游览日，决定住张家界市区还是武陵源，再串联森林公园、天门山、大峡谷与下一座城市。",
        navTitle: "张家界",
        summary:
          "“张家界”这个目的地名同时指向城市门户和几套入口互不相通的山岳系统。多数第一次旅行需要三个完整游览日，并认真决定至少一次住宿基地。市区服务天门山、机场和铁路站；武陵源保护森林公园早出发。大峡谷和凤凰是独立路线决策，不是顺路补空。",
        heroAlt: "云雾在张家界国家森林公园的石英砂岩峰柱之间流动。",
        heroCaption:
          "峰林解释了为什么来，却没有解释该走哪个门、住哪一边、怎样接驳。先把这些系统分开，张家界才会变得可执行。",
        openGraphLocale: "zh_CN",
        searchTerms: [
          "张家界旅行指南",
          "张家界玩几天",
          "张家界市区还是武陵源",
          "张家界国家森林公园入口",
          "张家界天门山大峡谷怎么安排",
        ],
        geography: {
          title: "一个城市门户，三套彼此独立的山岳决策",
          caption: "方位示意图，非按比例。票名和地图坐标相近，不代表这些系统可以互换。",
          legend: {
            core: "城市门户",
            cluster: "森林公园分区",
            outside: "独立景区日",
            gateway: "机场或铁路门户",
          },
          nodes: {
            city: { label: "张家界市区", note: "天门山基地、机场铁路与晚到" },
            wulingyuan: { label: "武陵源", note: "森林公园侧主要基地与东门区域" },
            yuanjiajie: { label: "袁家界", note: "山顶台地；需要完整交通链" },
            tianzi: { label: "天子山", note: "另一套山顶游览分区" },
            tianmen: { label: "天门山", note: "市区侧独立票务系统；单独一天" },
            grandcanyon: { label: "大峡谷", note: "玻璃桥所在区域；不在森林公园内" },
            dyg: { label: "DYG 荷花机场", note: "市区侧门户" },
            weststation: { label: "张家界西站", note: "位于市区核心以北的铁路门户" },
          },
        },
      },
      ko: {
        path: hubPath("zhangjiajie", "ko"),
        title: "장자제 여행 가이드: 일정·숙소 거점·공원·다음 도시",
        h1: "장자제 여행 가이드: 시내, 우링위안과 서로 다른 산악 체계를 나누세요",
        description:
          "2·3·4일의 온전한 관광일과 장자제 시내 또는 우링위안 거점을 정한 뒤 국가삼림공원, 톈먼산, 대협곡과 다음 도시를 연결합니다.",
        navTitle: "장자제",
        summary:
          "장자제라는 목적지 이름은 도시 관문과 입구를 공유하지 않는 여러 산악 체계를 함께 가리킵니다. 첫 여행은 보통 온전한 관광일 3일과 명확한 숙소 거점 선택이 필요합니다. 시내는 톈먼산, 공항과 철도역을 맡고 우링위안은 국가삼림공원의 이른 출발을 지켜 줍니다. 대협곡과 펑황은 남는 시간에 넣는 곳이 아니라 별도 동선 결정입니다.",
        heroAlt: "장자제 국가삼림공원의 사암 봉우리 사이로 흐르는 안개.",
        heroCaption:
          "봉우리는 여행 이유를 보여 주지만 게이트, 숙소 거점과 환승 사슬은 알려 주지 않습니다. 이 체계를 나눠야 장자제 일정이 실행 가능합니다.",
        openGraphLocale: "ko_KR",
        searchTerms: [
          "장자제 여행 가이드",
          "장자제 며칠",
          "장자제 시내 우링위안 숙소",
          "장자제 국가삼림공원 입구",
          "장자제 톈먼산 대협곡 일정",
        ],
        geography: {
          title: "도시 관문 하나와 서로 다른 세 산악 결정",
          caption: "축척이 아닌 방위 개념도입니다. 표 이름과 지도 핀이 가깝다고 이 체계들을 서로 바꿔 쓸 수 있는 것은 아닙니다.",
          legend: {
            core: "도시 관문",
            cluster: "국가공원 구역",
            outside: "별도 관광일",
            gateway: "공항 또는 철도 관문",
          },
          nodes: {
            city: { label: "장자제 시내", note: "톈먼산 거점, 공항·철도와 늦은 도착" },
            wulingyuan: { label: "우링위안", note: "공원 쪽 주요 거점과 동문 권역" },
            yuanjiajie: { label: "위안자제", note: "상부 고원; 교통 사슬로 접근" },
            tianzi: { label: "톈쯔산", note: "별도의 상부 경관 구역" },
            tianmen: { label: "톈먼산", note: "시내 쪽 독립 티켓 체계; 별도 하루" },
            grandcanyon: { label: "대협곡", note: "유리다리 권역; 삼림공원 안이 아님" },
            dyg: { label: "DYG 공항", note: "시내 쪽 관문" },
            weststation: { label: "장자제서역", note: "시내 중심 북쪽의 철도 관문" },
          },
        },
      },
    },
  },
] as const satisfies readonly DestinationHubEntry[];

export type PublishedDestinationHubId = Extract<
  (typeof destinationHubRegistry)[number],
  { readonly lifecycle: "published" }
>["id"];

type PublishedDestinationHubEntry = Extract<
  (typeof destinationHubRegistry)[number],
  { readonly lifecycle: "published" }
>;

function isPublishedDestinationHubEntry(
  hub: (typeof destinationHubRegistry)[number],
): hub is PublishedDestinationHubEntry {
  return hub.lifecycle === "published";
}

export const publishedDestinationHubRegistry = destinationHubRegistry.filter(
  isPublishedDestinationHubEntry,
);

export const publishedDestinationHubIds: readonly PublishedDestinationHubId[] =
  publishedDestinationHubRegistry.map((hub) => hub.id);

export function getDestinationHub(id: DestinationHubId): DestinationHubEntry {
  const hub = destinationHubRegistry.find((entry) => entry.id === id);
  if (!hub) throw new Error(`Unknown destination hub: ${id}`);
  return hub;
}

export function getDestinationHubEntry(
  id: DestinationHubId,
  locale: HomegroundLocale = "en",
) {
  const hub = getDestinationHub(id);
  const localized = hub.locales[locale];

  return {
    ...hub,
    ...localized,
    canonicalPath: localized.path,
    canonicalUrl: `${SITE_URL}${localized.path}`,
  };
}

export function getDestinationHubLanguagePaths(id: DestinationHubId) {
  const hub = getDestinationHub(id);
  return Object.fromEntries(
    homegroundLocales.map((locale) => [locale, hub.locales[locale].path]),
  ) as Record<HomegroundLocale, string>;
}

export function isDestinationHubId(value: string): value is DestinationHubId {
  return destinationHubIds.some((id) => id === value);
}

export function isPublishedDestinationHubId(
  value: string,
): value is PublishedDestinationHubId {
  return publishedDestinationHubIds.some((id) => id === value);
}

export function assertPublishedDestinationHubId(
  value: string,
): asserts value is PublishedDestinationHubId {
  if (!isPublishedDestinationHubId(value)) {
    throw new Error(`Destination Hub is not published: ${value}`);
  }
}
