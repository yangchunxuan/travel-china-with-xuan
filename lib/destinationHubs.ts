import { homegroundLocales, type HomegroundLocale } from "./homegroundI18n";
import type { GuideId } from "./guideRegistry";

const SITE_URL = "https://homegroundchina.com";

/**
 * Destination entity hubs own the broad `X travel guide` intent for one city
 * at `/destinations/<slug>/`, as reserved in the Phase 1 search-platform spec.
 * They decide city-level shape — nights, base, gateways, clusters, next city —
 * and hand every execution detail to the narrower canonical guide owners
 * listed in `supportGuideIds`.
 */
export const destinationHubIds = ["beijing", "shanghai", "xian"] as const;
export type DestinationHubId = (typeof destinationHubIds)[number];

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
  readonly geography: DestinationGeographyCopy;
}

export interface DestinationHubEntry {
  readonly id: DestinationHubId;
  readonly entityId: string;
  readonly heroImagePath: string;
  readonly heroImageUrl: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly datePublished: string;
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
] as const satisfies readonly DestinationHubEntry[];

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
