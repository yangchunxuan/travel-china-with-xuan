import { homegroundLocales, type HomegroundLocale } from "./homegroundI18n";
import type { GuideId } from "./guideRegistry";
import type { PhotoCredit } from "./photoCredits";

const SITE_URL = "https://homegroundchina.com";

/**
 * Destination entity hubs own the broad `X travel guide` intent for one city
 * at `/destinations/<slug>/`, as reserved in the Phase 1 search-platform spec.
 * They decide city-level shape — nights, base, gateways, clusters, next city —
 * and hand every execution detail to the narrower canonical guide owners
 * listed in `supportGuideIds`.
 */
export const destinationHubIds = [
  "beijing",
  "shanghai",
  "xian",
  "chengdu",
  "guangzhou",
  "hangzhou",
  "zhangjiajie",
  "chongqing",
] as const;
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
  readonly entityId: string;
  readonly heroImagePath: string;
  /** Set for an openly licensed hero photo; shown on a line under it. */
  readonly heroCredit?: PhotoCredit;
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
    heroImagePath: "/images/destinations/beijing/gulou-hutong-hero-1600.webp",
    heroImageUrl:
      "https://homegroundchina.com/images/destinations/beijing/gulou-hutong-hero-1600.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    datePublished: "2026-08-16",
    dateModified: "2026-08-22",
    sourceReviewedDate: "2026-08-22",
    supportGuideIds: [
      "china-10-day-itinerary",
      "beijing-where-to-stay-first-trip",
      "beijing-courtyard-hotel-or-modern-hotel",
      "which-beijing-railway-station",
      "beijing-south-station-to-capital-or-daxing-airport",
      "great-wall-section-selector-from-beijing",
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
        title: "Beijing Travel Guide: 4–5 Nights and Where to Stay",
        h1: "Beijing: palaces, the Great Wall and hutongs, over four or five nights",
        description:
          "Give Beijing four or five nights: the Forbidden City, the Great Wall, the hutongs. See where to stay, which airport and station to use, and where to go next.",
        navTitle: "Beijing",
        summary:
          "Walk north from Tiananmen through the Forbidden City, climb Jingshan, and a whole field of golden-tiled roofs spreads out below you. Give another day to the Great Wall on its mountain ridges outside the city, and spend your evenings eating and wandering the hutong lanes around the Drum Tower. Each of Beijing's big sights takes half a day to a full day, so four or five nights give you three or four real days without rushing.",
        heroAlt:
          "Beijing's Drum Tower and Bell Tower rising above grey-tiled hutong roofs, with a busy lane on the right.",
        heroCaption:
          "Below the Drum Tower and the Bell Tower, grey-tiled hutongs spread in every direction. Come in the late afternoon, eat in the lanes, then walk a few minutes to the lakes at Shichahai.",
        openGraphLocale: "en_US",
        searchTerms: [
          "Beijing travel guide",
          "how many days in Beijing",
          "4 days in Beijing",
          "where to stay in Beijing first time",
          "Great Wall day trip from Beijing",
          "which Great Wall section from Beijing",
          "Beijing Capital or Daxing airport",
        ],
        geography: {
          title: "Beijing's sights sit in five directions",
          caption:
            "Not to scale. Sights in the same direction fit in the same day; the Great Wall needs a whole day of its own.",
          legend: {
            core: "City centre",
            cluster: "Half a day or more",
            outside: "A whole day",
            gateway: "Airport",
          },
          nodes: {
            axis: {
              label: "Tiananmen · Forbidden City · Jingshan",
              note: "A full day, walking south to north",
            },
            south: {
              label: "Qianmen · Temple of Heaven",
              note: "Half a day to a full day",
            },
            northwest: {
              label: "Summer Palace · northwest",
              note: "At least half a day, often most of one",
            },
            gulou: {
              label: "Gulou · Shichahai",
              note: "Hutong walks and evening meals",
            },
            chaoyang: {
              label: "Chaoyang · CBD",
              note: "Dinners, nightlife, easy after a late flight",
            },
            wall: {
              label: "Great Wall",
              note: "Out and back takes the whole day; add nothing else",
            },
            pek: { label: "PEK", note: "Northeast; airport train to Dongzhimen" },
            pkx: { label: "PKX", note: "Far south; airport train to Caoqiao" },
          },
        },
      },
      zh: {
        path: hubPath("beijing", "zh"),
        title: "北京旅游攻略：故宫长城胡同，四五晚怎么玩、住哪里",
        h1: "北京：故宫、长城和胡同，留足四五晚",
        description:
          "故宫、长城和胡同，留足四五晚才玩得从容。第一次来住哪里方便，两座机场、八座火车站怎么认，下一站去西安还是上海，这里一次讲清。",
        navTitle: "北京",
        summary:
          "从天安门一路往北穿过故宫，再爬上景山，一片金黄的琉璃瓦屋顶就铺在脚下；另找一天出城，去山脊上走长城；傍晚钻进鼓楼一带的胡同，吃饭、散步。北京的大景点一个就要半天到一天，住四到五晚，才能真正玩满三四天，不用赶。",
        heroAlt: "北京鼓楼与钟楼立在灰瓦胡同屋顶之上，右侧是热闹的街巷。",
        heroCaption:
          "鼓楼和钟楼底下，是成片的灰瓦胡同。傍晚来这里，在巷子里吃顿饭，再走几分钟就到什刹海边。",
        openGraphLocale: "zh_CN",
        searchTerms: [
          "北京旅游攻略",
          "北京自由行攻略",
          "北京玩几天合适",
          "第一次去北京住哪里",
          "北京长城哪段好玩",
          "首都机场还是大兴机场",
        ],
        geography: {
          title: "北京的景点分在五个方向",
          caption:
            "示意图，不按比例。同一个方向的景点可以排在同一天；长城要单独留出一整天。",
          legend: {
            core: "市中心",
            cluster: "留半天以上",
            outside: "留一整天",
            gateway: "机场",
          },
          nodes: {
            axis: {
              label: "天安门 · 故宫 · 景山",
              note: "由南往北走，留一整天",
            },
            south: {
              label: "前门 · 天坛",
              note: "半天到一天",
            },
            northwest: {
              label: "颐和园 · 西北方向",
              note: "至少半天，常常要一整天",
            },
            gulou: {
              label: "鼓楼 · 什刹海",
              note: "逛胡同、傍晚吃饭",
            },
            chaoyang: {
              label: "朝阳 · 国贸",
              note: "吃饭、夜生活，晚到也方便",
            },
            wall: {
              label: "长城",
              note: "来回就是一整天，别再塞别的景点",
            },
            pek: { label: "PEK 首都机场", note: "东北方向，坐机场线到东直门" },
            pkx: { label: "PKX 大兴机场", note: "城南很远，坐机场线到草桥" },
          },
        },
      },
      ko: {
        path: hubPath("beijing", "ko"),
        title: "베이징 여행: 자금성·만리장성·후퉁, 4~5박 일정과 숙소",
        h1: "베이징: 자금성, 만리장성, 후퉁까지 4~5박은 머무세요",
        description:
          "자금성과 만리장성, 후퉁 골목까지 제대로 보려면 4~5박은 머무세요. 처음 묵기 좋은 지역, 공항과 기차역 확인법, 다음 도시 시안·상하이까지 정리했습니다.",
        navTitle: "베이징",
        summary:
          "톈안먼에서 북쪽으로 자금성을 지나 징산공원에 오르면, 황금빛 기와지붕이 발아래 끝없이 펼쳐집니다. 하루는 도시 밖으로 나가 산등성이를 따라 만리장성을 걷고, 저녁에는 구러우 일대 후퉁 골목에서 밥을 먹고 산책해 보세요. 베이징의 큰 명소는 한 곳에 반나절에서 하루가 걸리니, 4~5박은 머물러야 서두르지 않고 3~4일을 온전히 즐길 수 있습니다.",
        heroAlt: "회색 기와 후퉁 지붕 위로 솟은 베이징의 고루와 종루, 오른쪽으로는 붐비는 골목.",
        heroCaption:
          "고루와 종루 아래로 회색 기와의 후퉁이 펼쳐집니다. 늦은 오후에 와서 골목에서 저녁을 먹고, 몇 분만 걸으면 스차하이 호숫가입니다.",
        openGraphLocale: "ko_KR",
        searchTerms: [
          "베이징 여행",
          "베이징 여행 코스",
          "베이징 자유여행",
          "베이징 4박5일",
          "베이징 여행 며칠",
          "베이징 숙소 추천",
        ],
        geography: {
          title: "베이징의 명소는 다섯 방향에 나뉘어 있습니다",
          caption:
            "축척이 아닌 개념도입니다. 같은 방향의 명소는 하루에 묶을 수 있고, 만리장성은 하루를 따로 비워 두세요.",
          legend: {
            core: "도심",
            cluster: "반나절 이상",
            outside: "하루 전체",
            gateway: "공항",
          },
          nodes: {
            axis: {
              label: "톈안먼 · 자금성 · 징산",
              note: "남에서 북으로 걷는 하루",
            },
            south: {
              label: "첸먼 · 천단공원",
              note: "반나절에서 하루",
            },
            northwest: {
              label: "이화원 · 서북부",
              note: "최소 반나절, 흔히 거의 하루",
            },
            gulou: {
              label: "구러우 · 스차하이",
              note: "후퉁 산책과 저녁 식사",
            },
            chaoyang: {
              label: "차오양 · CBD",
              note: "식사·밤 문화, 늦게 도착해도 편함",
            },
            wall: {
              label: "만리장성",
              note: "왕복만으로 하루, 다른 일정은 넣지 마세요",
            },
            pek: { label: "PEK 서우두공항", note: "북동쪽, 공항철도로 둥즈먼까지" },
            pkx: { label: "PKX 다싱공항", note: "먼 남쪽, 공항철도로 차오차오까지" },
          },
        },
      },
    },
  },
  {
    id: "shanghai",
    entityId: "city-shanghai",
    heroImagePath: "/images/destinations/shanghai/suzhou-creek-dusk-hero-1600.webp",
    heroImageUrl:
      "https://homegroundchina.com/images/destinations/shanghai/suzhou-creek-dusk-hero-1600.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    datePublished: "2026-08-16",
    dateModified: "2026-09-23",
    sourceReviewedDate: "2026-08-22",
    supportGuideIds: [
      "china-10-day-itinerary",
      "shanghai-where-to-stay-first-trip",
      "shanghai-pudong-or-hongqiao-airport",
      "pudong-airport-to-shanghai-disneyland",
      "shanghai-hangzhou-transport-route",
      "shanghai-suzhou-hangzhou-nanjing-route-order",
      "shanghai-to-suzhou-day-trip",
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
        title: "Shanghai Travel Guide: 4 Nights and Where to Stay",
        h1: "Shanghai: the Bund at dusk, old lanes and skyscrapers, over four nights",
        description:
          "Give Shanghai four nights for the Bund at dusk, Yu Garden and the old lanes. See where to stay, Pudong or Hongqiao, and why Hangzhou comes next.",
        navTitle: "Shanghai",
        summary:
          "Wander Yu Garden and the market lanes of the Old City, then walk on to the Bund as the light fades. Century-old stone banks stand behind you, Pudong's glass towers rise across the river, and then both banks light up. Give another day to the tree-lined streets of the Former French Concession, with their lane houses, shops and cafés. Arrival and departure days mostly go to travel, so four nights give you three full days; a trip to Disneyland or Suzhou takes up a whole one.",
        heroAlt:
          "Two bridges cross Suzhou Creek at dusk, with older Puxi buildings in front and the Oriental Pearl Tower and Shanghai Tower beyond.",
        heroCaption:
          "Older Puxi buildings line Suzhou Creek, with the Oriental Pearl Tower and Shanghai Tower beyond. Follow the creek to the Huangpu, then walk south along the Bund as the lights come on.",
        openGraphLocale: "en_US",
        searchTerms: [
          "Shanghai travel guide",
          "how many days in Shanghai",
          "3 days in Shanghai",
          "where to stay in Shanghai first time",
          "Pudong or Hongqiao airport",
          "Suzhou day trip from Shanghai",
        ],
        geography: {
          title: "Shanghai's sights on both banks of the Huangpu",
          caption:
            "Not to scale. Most first-trip days are spent west of the river, in Puxi; Disneyland needs a whole day of its own.",
          legend: {
            core: "City centre",
            cluster: "Half a day or more",
            outside: "A whole day",
            gateway: "Airports and station",
          },
          nodes: {
            bund: {
              label: "The Bund",
              note: "Riverside walk; best from dusk into dark",
            },
            oldcity: {
              label: "Old City · Yu Garden",
              note: "Garden and market lanes; walk on to the Bund",
            },
            square: {
              label: "People's Square · E Nanjing Rd",
              note: "Metro hub; shopping street to the Bund",
            },
            jingan: {
              label: "Jing'an · Former French Concession",
              note: "Tree-lined streets, lane houses, cafés",
            },
            lujiazui: {
              label: "Lujiazui",
              note: "Among the towers, looking back at the Bund",
            },
            hongqiao: {
              label: "Hongqiao hub",
              note: "Far west; SHA airport and high-speed station",
            },
            pvg: {
              label: "PVG",
              note: "East; most long-haul flights land here",
            },
            disney: {
              label: "Disneyland",
              note: "A whole day; it won't fit into an evening",
            },
          },
        },
      },
      zh: {
        path: hubPath("shanghai", "zh"),
        title: "上海旅游攻略：外滩夜景和老弄堂，四晚怎么玩、住哪里",
        h1: "上海：外滩夜景、老弄堂和摩天楼，留足四晚",
        description:
          "外滩夜景、豫园老街和原法租界的林荫道，住四晚才能玩满三天。第一次来住哪里方便，浦东和虹桥别跑错，杭州为什么值得住下、苏州为什么一天就够，这里一次讲清。",
        navTitle: "上海",
        summary:
          "逛完豫园和老城厢的小街，走到外滩时天正暗下来：身后是百年石头老楼，对岸是浦东的玻璃高楼，接着两岸的灯一起亮了。另找一天，去原法租界的林荫道上，在老弄堂、小店和咖啡馆之间走走。到达和离开那两天基本花在路上，住四晚才能玩满三天；去迪士尼或苏州，要占掉其中一整天。",
        heroAlt: "黄昏的苏州河上有两座桥，前面是浦西的老建筑，远处是东方明珠和上海中心大厦。",
        heroCaption:
          "苏州河边是浦西老楼，远处是东方明珠和上海中心。沿河走到黄浦江边，再顺着外滩往南，看两岸亮灯。",
        openGraphLocale: "zh_CN",
        searchTerms: [
          "上海旅游攻略",
          "上海自由行攻略",
          "上海玩几天合适",
          "第一次去上海住哪里",
          "浦东机场还是虹桥机场",
          "上海去苏州一日游",
        ],
        geography: {
          title: "上海的景点分在黄浦江两岸",
          caption:
            "示意图，不按比例。第一次来，多数日子都在黄浦江西边的浦西；迪士尼要单独留一整天。",
          legend: {
            core: "市中心",
            cluster: "留半天以上",
            outside: "留一整天",
            gateway: "机场和车站",
          },
          nodes: {
            bund: {
              label: "外滩",
              note: "江边散步，傍晚看亮灯",
            },
            oldcity: {
              label: "老城厢 · 豫园",
              note: "园林小街，顺路走到外滩",
            },
            square: {
              label: "人民广场 · 南京东路",
              note: "换乘方便，步行街通外滩",
            },
            jingan: {
              label: "静安 · 原法租界一带",
              note: "林荫道、老弄堂、咖啡馆",
            },
            lujiazui: {
              label: "陆家嘴",
              note: "站在高楼间回望外滩",
            },
            hongqiao: {
              label: "虹桥枢纽",
              note: "城西很远，机场和高铁站",
            },
            pvg: {
              label: "浦东机场",
              note: "城东，远程航班多在此落地",
            },
            disney: {
              label: "上海迪士尼",
              note: "整整一天，别塞进晚上",
            },
          },
        },
      },
      ko: {
        path: hubPath("shanghai", "ko"),
        title: "상하이 여행: 와이탄 야경·옛 골목, 4박 일정과 숙소",
        h1: "상하이: 와이탄 야경, 옛 골목, 마천루까지 4박은 머무세요",
        description:
          "와이탄 야경과 예원, 옛 프랑스 조계 골목까지 보려면 4박은 머무세요. 처음 묵기 좋은 지역, 푸둥공항과 홍차오 차이, 다음 도시 항저우와 쑤저우 당일치기까지 정리했습니다.",
        navTitle: "상하이",
        summary:
          "예원과 구시가 골목을 둘러본 뒤 해 질 녘 와이탄에 서면, 등 뒤로 백 년 된 석조 건물이, 강 건너로 푸둥의 유리 빌딩이 보이고 곧 양쪽 강변에 불이 들어옵니다. 다른 하루는 옛 프랑스 조계의 가로수길과 옛 골목, 가게와 카페 사이를 걸어 보세요. 도착일과 출발일은 대부분 이동에 쓰이니 4박은 해야 온전한 3일이 남고, 디즈니랜드나 쑤저우에 가면 그중 하루를 다 씁니다.",
        heroAlt:
          "해 질 녘의 쑤저우강과 다리 두 개, 앞쪽의 푸시 옛 건물들, 그 너머로 솟은 동방명주와 상하이 타워.",
        heroCaption:
          "푸시의 옛 건물 너머로 동방명주와 상하이 타워가 보입니다. 쑤저우강을 따라 황푸강까지 간 뒤, 불이 켜지는 와이탄을 남쪽으로 걸어 보세요.",
        openGraphLocale: "ko_KR",
        searchTerms: [
          "상하이 여행",
          "상하이 여행 코스",
          "상하이 자유여행",
          "상하이 4박5일",
          "상하이 숙소 추천",
          "푸둥공항 홍차오공항 차이",
          "상하이 쑤저우 당일치기",
        ],
        geography: {
          title: "상하이의 명소는 황푸강 양쪽에 있습니다",
          caption:
            "축척이 아닌 개념도입니다. 첫 여행은 대부분 강 서쪽 푸시에서 보내고, 디즈니랜드는 하루를 따로 비워 두세요.",
          legend: {
            core: "도심",
            cluster: "반나절 이상",
            outside: "하루 전체",
            gateway: "공항·기차역",
          },
          nodes: {
            bund: {
              label: "와이탄",
              note: "강변 산책, 해 질 녘부터 밤까지",
            },
            oldcity: {
              label: "구시가 · 예원",
              note: "정원과 시장 골목, 와이탄까지 걷기",
            },
            square: {
              label: "인민광장 · 난징둥루",
              note: "환승 편리, 와이탄까지 이어진 쇼핑 거리",
            },
            jingan: {
              label: "징안 · 옛 프랑스 조계",
              note: "가로수길, 옛 골목, 카페",
            },
            lujiazui: {
              label: "루자쭈이",
              note: "빌딩 숲에서 와이탄 돌아보기",
            },
            hongqiao: {
              label: "홍차오 허브",
              note: "먼 서쪽, SHA 공항과 고속철도역",
            },
            pvg: {
              label: "PVG 푸둥공항",
              note: "동쪽, 장거리 국제선 대부분 도착",
            },
            disney: {
              label: "상하이 디즈니랜드",
              note: "꼬박 하루, 저녁에 끼울 수 없음",
            },
          },
        },
      },
    },
  },
  {
    id: "xian",
    entityId: "city-xian",
    heroImagePath: "/images/destinations/xian/bell-tower-night-hero-1600.webp",
    heroImageUrl:
      "https://homegroundchina.com/images/destinations/xian/bell-tower-night-hero-1600.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    datePublished: "2026-08-16",
    dateModified: "2026-08-21",
    sourceReviewedDate: "2026-08-16",
    supportGuideIds: [
      "china-10-day-itinerary",
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
        title: "Xi'an Travel Guide: 3 Nights and Where to Stay",
        h1: "Xi'an: Terracotta Warriors, the city wall and food lanes, over three nights",
        description:
          "Give Xi'an three nights: a day for the Terracotta Warriors, one for the city wall and food lanes. See where to stay, which station to use, and where to go next.",
        navTitle: "Xi'an",
        summary:
          "Step into the hall over Pit 1 in Lintong and the army is suddenly below you: life-size clay soldiers, rank after rank, their faces and beards changing from one to the next. Back in the city, walk the top of the wall, wide as a road, then end the evening around the Bell and Drum Towers, eating in the lanes of the Muslim Quarter. The warriors take most of a day, so three nights give you one full day for them and one for Xi'an itself.",
        heroAlt:
          "Xi'an's Bell Tower lit up gold against a deep-blue evening sky, with streaks of light from the traffic passing in front.",
        heroCaption:
          "The Bell Tower stands at the heart of the walled city. Walk past the Drum Tower to eat in the lanes of the Muslim Quarter, or fifteen minutes down South Street to climb the wall at the South Gate.",
        openGraphLocale: "en_US",
        searchTerms: [
          "Xi'an travel guide",
          "how many days in Xi'an",
          "where to stay in Xi'an first time",
          "how to get to the Terracotta Warriors",
          "Xi'an North railway station",
          "Xi'an to Chengdu train",
        ],
        geography: {
          title: "Xi'an's sights run south and east from the wall",
          caption:
            "Not to scale. The old city and the museum to its south take half a day each; the warriors fill most of a day, Mount Hua all of one.",
          legend: {
            core: "Old city centre",
            cluster: "Half a day or more",
            outside: "A day out of town",
            gateway: "Airport and stations",
          },
          nodes: {
            wall: {
              label: "City Wall · Bell and Drum Towers",
              note: "Wall walks and Muslim Quarter dinners",
            },
            south: {
              label: "Shaanxi History Museum · Dayanta",
              note: "Half a day: museum, then the pagoda",
            },
            lintong: {
              label: "Lintong · Terracotta Warriors",
              note: "Most of a day, with the ride out and back",
            },
            huashan: {
              label: "Mount Hua",
              note: "A whole day, or stay the night nearby",
            },
            north: {
              label: "Xi'an North",
              note: "Main high-speed station, north of the centre",
            },
            xiy: {
              label: "XIY airport",
              note: "Northwest, on the Xianyang side",
            },
            east: {
              label: "Xi'an East",
              note: "Eastern station, open since June 2026",
            },
          },
        },
      },
      zh: {
        path: hubPath("xian", "zh"),
        title: "西安旅游攻略：兵马俑城墙回民街，三晚怎么玩、住哪里",
        h1: "西安：兵马俑、古城墙和回民街，留足三晚",
        description:
          "兵马俑、古城墙和回民街，留足三晚：一天给兵马俑，一天给城里。第一次来住哪里方便，三个火车站怎么认，下一站去成都还是北京，这里一次讲清。",
        navTitle: "西安",
        summary:
          "走进临潼一号坑的展厅，整支军队一下子出现在脚下：真人大小的陶俑一排接一排，脸型、胡须一个个都不一样。回到城里，登上城墙，墙顶宽得像一条大路；傍晚走到钟楼、鼓楼一带，钻进回民街的小巷吃饭。兵马俑一去就是大半天，住三晚，才能一天给它、一天给西安城。",
        heroAlt:
          "夜色中灯火通明的西安钟楼，背后是深蓝的天空，前方车流拖出一道道光带。",
        heroCaption:
          "钟楼立在城墙围起的老城正中。走过鼓楼，就是回民街的小吃巷子；沿南大街往南走 15 分钟，到南门登城墙。",
        openGraphLocale: "zh_CN",
        searchTerms: [
          "西安旅游攻略",
          "西安自由行攻略",
          "西安玩几天合适",
          "第一次去西安住哪里",
          "西安住钟楼还是大雁塔",
          "西安兵马俑怎么去",
        ],
        geography: {
          title: "西安景点从城墙往南、往东铺开",
          caption:
            "示意图，不按比例。老城和城南的博物馆各要半天；兵马俑要大半天，华山要一整天。",
          legend: {
            core: "老城中心",
            cluster: "留半天以上",
            outside: "出城一天",
            gateway: "机场和车站",
          },
          nodes: {
            wall: {
              label: "城墙 · 钟鼓楼",
              note: "上城墙走走，回民街吃饭",
            },
            south: {
              label: "陕西历史博物馆 · 大雁塔",
              note: "半天，先博物馆再大雁塔",
            },
            lintong: {
              label: "临潼 · 兵马俑",
              note: "连来回，要大半天",
            },
            huashan: {
              label: "华山",
              note: "单独一整天，或在附近住一晚",
            },
            north: {
              label: "西安北站",
              note: "主要高铁站，在城北",
            },
            xiy: {
              label: "咸阳机场",
              note: "西北方向，在咸阳一侧",
            },
            east: {
              label: "西安东站",
              note: "2026 年 6 月启用",
            },
          },
        },
      },
      ko: {
        path: hubPath("xian", "ko"),
        title: "시안 여행: 병마용·성벽·회족거리, 3박 일정과 숙소",
        h1: "시안: 병마용, 성벽, 회족거리까지 3박은 머무세요",
        description:
          "병마용에 하루, 성벽과 회족거리에 하루를 쓰려면 3박은 머무세요. 처음 묵기 좋은 지역, 세 기차역과 공항 확인법, 다음 도시 청두·베이징까지 정리했습니다.",
        navTitle: "시안",
        summary:
          "린퉁 1호갱 전시관에 들어서면 군대 전체가 갑자기 발아래 펼쳐집니다. 실물 크기의 흙 병사들이 줄지어 서 있고, 얼굴도 수염도 하나하나 다릅니다. 시내로 돌아와서는 큰길처럼 넓은 성벽 위를 걷고, 저녁에는 종루와 고루 일대 회족거리 골목에서 밥을 먹어 보세요. 병마용만으로 하루가 거의 다 가니, 3박은 머물러야 병마용에 하루, 시내에 하루를 온전히 쓸 수 있습니다.",
        heroAlt:
          "짙푸른 저녁 하늘 아래 금빛으로 불을 밝힌 시안 종루와, 그 앞을 지나는 차들이 남긴 불빛 궤적.",
        heroCaption:
          "종루는 성벽 안 한가운데에 있습니다. 여기서 고루를 지나 회족거리 골목에서 저녁을 먹거나, 남대가를 따라 15분 걸어 남문에서 성벽에 올라 보세요.",
        openGraphLocale: "ko_KR",
        searchTerms: [
          "시안 여행",
          "시안 여행 코스",
          "시안 자유여행",
          "시안 3박4일",
          "시안 병마용 가는 법",
          "시안 숙소 추천",
        ],
        geography: {
          title: "시안 명소는 성벽에서 남쪽·동쪽으로 이어집니다",
          caption:
            "축척이 아닌 개념도입니다. 옛 도심과 남쪽 박물관 일대는 각각 반나절, 병마용은 하루의 대부분, 화산은 하루를 통째로 씁니다.",
          legend: {
            core: "옛 도심",
            cluster: "반나절 이상",
            outside: "도시 밖 하루",
            gateway: "공항과 기차역",
          },
          nodes: {
            wall: {
              label: "성벽 · 종루와 고루",
              note: "성벽 산책, 회족거리에서 저녁",
            },
            south: {
              label: "산시역사박물관 · 대안탑",
              note: "반나절, 박물관 다음 대안탑",
            },
            lintong: {
              label: "린퉁 · 병마용",
              note: "오가는 시간까지 하루의 대부분",
            },
            huashan: {
              label: "화산",
              note: "하루를 통째로, 또는 근처에서 1박",
            },
            north: {
              label: "시안북역",
              note: "도심 북쪽의 주요 고속철도역",
            },
            xiy: {
              label: "XIY 공항",
              note: "북서쪽, 셴양 방면",
            },
            east: {
              label: "시안동역",
              note: "2026년 6월 문을 연 동쪽 역",
            },
          },
        },
      },
    },
  },
  {
    id: "chengdu",
    entityId: "city-chengdu",
    heroImagePath: "/images/destinations/chengdu/hero-1600.webp",
    heroImageUrl:
      "https://homegroundchina.com/images/destinations/chengdu/hero-1600.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    datePublished: "2026-08-17",
    dateModified: "2026-09-09",
    sourceReviewedDate: "2026-08-22",
    supportGuideIds: [
      "chengdu-chongqing-zhangjiajie-itinerary",
      "chengdu-panda-base-or-dujiangyan-panda-valley",
      "sanxingdui-museum-booking-and-gallery-order",
      "chengdu-jiuzhaigou-transport-route",
      "leshan-giant-buddha-land-or-boat-visit",
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
        title: "Chengdu Travel Guide: 3 Nights and Where to Stay",
        h1: "Chengdu: pandas, tea houses and Sichuan hotpot, over three nights",
        description:
          "Give Chengdu three nights for the pandas, tea in People's Park and Sichuan hotpot. See where to stay, Tianfu or Shuangliu airport, and why Chongqing is next.",
        navTitle: "Chengdu",
        summary:
          "Be at the Panda Base as the gates open. Round a bend and you may find a giant panda sitting back against a log like a person, working through a stalk of bamboo held in both paws. Another morning, take a bamboo chair at a tea house in People's Park and let an hour or two slip by, then end the day over hotpot. The pandas alone fill a morning, so three nights give you two full days, one for each, without rushing.",
        heroAlt:
          "People drinking tea in bamboo chairs under a covered wooden pavilion hung with red lanterns, at a tea house in Chengdu's People's Park.",
        heroCaption:
          "Linger over your tea and the life of the park drifts past your table. In this park, at the century-old Heming teahouse, you can even have your ears cleaned, if you dare.",
        openGraphLocale: "en_US",
        searchTerms: [
          "Chengdu travel guide",
          "how many days in Chengdu",
          "where to stay in Chengdu first time",
          "Chengdu panda base",
          "Tianfu or Shuangliu airport",
          "Chengdu to Dujiangyan day trip",
        ],
        geography: {
          title: "Chengdu's sights, and three cities beyond it",
          caption:
            "Not to scale. The Panda Base sits on the city's edge; Dujiangyan, Sanxingdui and Leshan are other cities, each a whole day out.",
          legend: {
            core: "City centre",
            cluster: "Half a day or more",
            outside: "A whole day out",
            gateway: "Airports and station",
          },
          nodes: {
            centre: {
              label: "People's Park · Tianfu Square",
              note: "Tea in the park, museums, central walks",
            },
            panda: {
              label: "Chengdu Panda Base",
              note: "City's edge; a morning, best at opening",
            },
            wuhou: {
              label: "Wuhou Shrine · Jinli",
              note: "Three Kingdoms shrine, shops beside it",
            },
            dujiangyan: {
              label: "Dujiangyan · Panda Valley",
              note: "A separate city to the west; a whole day",
            },
            sanxingdui: {
              label: "Sanxingdui, Guanghan",
              note: "Bronze faces, north-east; a whole day",
            },
            leshan: {
              label: "Leshan",
              note: "The Giant Buddha, south; a long day",
            },
            tfu: {
              label: "TFU Tianfu Airport",
              note: "Far south-east; a long ride in",
            },
            ctu: {
              label: "CTU Shuangliu Airport",
              note: "South-west; usually closer to the centre",
            },
            east: {
              label: "Chengdu East",
              note: "Many high-speed trains; check your ticket",
            },
          },
        },
      },
      zh: {
        path: hubPath("chengdu", "zh"),
        title: "成都旅游攻略：熊猫茶馆火锅，三晚怎么玩、住哪里",
        h1: "成都：熊猫、茶馆和火锅，留足三晚",
        description:
          "开园就去看熊猫、在人民公园喝茶、晚上吃火锅，留足三晚。第一次来住哪里方便，机票上是天府还是双流，下一站去重庆还是四川周边，这里一次讲清。",
        navTitle: "成都",
        summary:
          "开园就进熊猫基地，拐个弯，也许就能看见一只大熊猫靠着木头坐着，两只前掌抱着竹子，一节一节往嘴里送。换一个上午，在人民公园的茶馆找把竹椅坐下，一坐就是一两个小时，晚上再吃顿火锅。熊猫一去就是一个上午，住三晚，它和茶馆才能各占一天，不用赶。",
        heroAlt: "成都人民公园传统茶馆的廊下挂着红灯笼，人们坐在竹椅上喝盖碗茶。",
        heroCaption:
          "泡上一杯茶多坐一会儿，看公园里人来人往。这座公园里的百年老店鹤鸣茶社，胆子大的还能掏个耳朵。",
        openGraphLocale: "zh_CN",
        searchTerms: [
          "成都旅游攻略",
          "成都要玩几天",
          "第一次去成都住哪里",
          "成都大熊猫基地攻略",
          "天府机场还是双流机场",
          "成都到都江堰一日游",
        ],
        geography: {
          title: "成都城里，和城外三个去处",
          caption:
            "示意图，不按比例。熊猫基地在城边；都江堰、三星堆、乐山在别的城市，各留一整天。",
          legend: {
            core: "市中心",
            cluster: "留半天以上",
            outside: "出城一整天",
            gateway: "机场和车站",
          },
          nodes: {
            centre: {
              label: "人民公园 · 天府广场",
              note: "公园喝茶、逛博物馆",
            },
            panda: {
              label: "成都大熊猫基地",
              note: "在城边，开园就去，留一上午",
            },
            wuhou: {
              label: "武侯祠 · 锦里",
              note: "三国故事，旁边是商业街",
            },
            dujiangyan: {
              label: "都江堰 · 熊猫谷",
              note: "成都以西另一座城，一整天",
            },
            sanxingdui: {
              label: "广汉三星堆",
              note: "东北方向看青铜面具，一整天",
            },
            leshan: {
              label: "乐山",
              note: "南边看大佛，一个长长的整天",
            },
            tfu: {
              label: "天府机场 TFU",
              note: "东南方向，进城路远",
            },
            ctu: {
              label: "双流机场 CTU",
              note: "西南，通常离市中心更近",
            },
            east: {
              label: "成都东站",
              note: "很多高铁从这里走，看准车票",
            },
          },
        },
      },
      ko: {
        path: hubPath("chengdu", "ko"),
        title: "청두 여행: 판다·찻집·훠궈, 3박 일정과 숙소",
        h1: "청두: 판다, 찻집, 훠궈까지 3박은 머무세요",
        description:
          "판다기지, 인민공원 찻집, 저녁 훠궈까지 즐기려면 3박은 머무세요. 처음 묵기 좋은 지역, 톈푸·솽류공항 확인법, 다음 도시 충칭까지 정리했습니다.",
        navTitle: "청두",
        summary:
          "문이 열리자마자 청두 판다기지에 들어가면, 통나무에 기대앉은 판다가 두 앞발로 대나무를 쥐고 한 마디씩 먹고 있을지도 모릅니다. 다른 날 오전에는 인민공원 찻집의 대나무 의자에 앉아 한두 시간 차를 마시고, 저녁은 훠궈로 마무리하세요. 판다기지 하나에 오전이 통째로 들어가니, 3박은 머물러야 판다와 찻집에 하루씩 주고 이틀을 온전히 즐길 수 있습니다.",
        heroAlt:
          "청두 인민공원 전통 찻집의 홍등이 걸린 정자 아래에서 대나무 의자에 앉아 차를 마시는 사람들.",
        heroCaption:
          "차 한 잔 앞에 두고 오래 앉아 있으면 공원의 일상이 눈앞을 지나갑니다. 이 공원의 100년 넘은 찻집 학명다사에서는 용기가 있다면 귀 청소도 받아 볼 수 있습니다.",
        openGraphLocale: "ko_KR",
        searchTerms: [
          "청두 여행",
          "청두 여행 코스",
          "청두 자유여행",
          "청두 판다기지",
          "청두 숙소 추천",
          "톈푸공항 솽류공항 차이",
          "청두 도강언 당일치기",
        ],
        geography: {
          title: "청두 시내, 그리고 시외 세 곳",
          caption:
            "축척이 아닌 개념도입니다. 판다기지는 도시 가장자리에 있고, 도강언·싼싱두이·낙산은 다른 도시라 각각 하루를 잡으세요.",
          legend: {
            core: "도심",
            cluster: "반나절 이상",
            outside: "시외로 하루",
            gateway: "공항과 기차역",
          },
          nodes: {
            centre: {
              label: "인민공원 · 톈푸광장",
              note: "공원 찻집, 박물관, 도심 산책",
            },
            panda: {
              label: "청두 판다기지",
              note: "도시 가장자리, 아침 개장에 맞춰",
            },
            wuhou: {
              label: "무후사 · 금리",
              note: "삼국지 이야기, 옆은 상점가",
            },
            dujiangyan: {
              label: "도강언 · 판다밸리",
              note: "서쪽의 다른 도시, 하루",
            },
            sanxingdui: {
              label: "광한 싼싱두이",
              note: "북동쪽 청동 가면, 하루",
            },
            leshan: {
              label: "낙산",
              note: "남쪽 낙산대불, 꼬박 하루",
            },
            tfu: {
              label: "TFU 톈푸공항",
              note: "남동쪽 멀리, 지하철 18호선",
            },
            ctu: {
              label: "CTU 솽류공항",
              note: "남서쪽, 대체로 도심에 더 가까움",
            },
            east: {
              label: "청두동역",
              note: "고속열차 다수, 표의 역명 확인",
            },
          },
        },
      },
    },
  },
  {
    id: "guangzhou",
    entityId: "city-guangzhou",
    heroImagePath: "/images/guides/how-guangzhou-morning-tea-works/hero-1600.webp",
    heroImageUrl:
      "https://homegroundchina.com/images/guides/how-guangzhou-morning-tea-works/hero-1600.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    datePublished: "2026-08-17",
    dateModified: "2026-08-21",
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
        title: "Guangzhou Travel Guide: 3 Nights and Where to Stay",
        h1: "Guangzhou: morning tea, old lanes and the Pearl River, over three nights",
        description:
          "Give Guangzhou three nights for morning tea, old lanes and Canton Tower by night. See where to stay, which terminal and station to use, and where to go next.",
        navTitle: "Guangzhou",
        summary:
          "Start the day with morning tea in Liwan, bamboo steamers of dim sum crowding the table. Then look up at the Chen Clan Ancestral Hall, where clay figures fill the roof ridges, and wander the lanes of Yongqingfang to Shamian's quiet street under camphor trees. After dark, Canton Tower lights up over the Pearl River. Arriving and leaving take more of the day than you expect, so three nights let you enjoy the old city and the new one by the river without rushing either.",
        heroAlt:
          "Dim sum in bamboo steamers, red rice-noodle rolls, a teapot, a brass kettle and a wicker flask on a round table at Pan Xi Restaurant.",
        heroCaption:
          "Morning tea at Pan Xi Restaurant in Liwan, baskets shared round the table. Then give the day to the old west, from the Chen Clan Ancestral Hall through Yongqingfang to Shamian by late afternoon.",
        openGraphLocale: "en_US",
        searchTerms: [
          "Guangzhou travel guide",
          "how many days in Guangzhou",
          "where to stay in Guangzhou first time",
          "Guangzhou Baiyun airport T2 or T3",
          "Guangzhou South railway station",
          "Guangzhou to Hong Kong train",
        ],
        geography: {
          title: "Old Guangzhou lies west, the new city east",
          caption:
            "Not to scale. The old west makes one easy day on foot; Chimelong, south in Panyu, needs a whole day of its own.",
          legend: {
            core: "Old city",
            cluster: "Half a day or more",
            outside: "A whole day",
            gateway: "Airport and stations",
          },
          nodes: {
            liwan: {
              label: "Liwan · Shamian",
              note: "Morning tea, old lanes, Shamian at dusk",
            },
            yuexiu: {
              label: "Beijing Road · Yuexiu",
              note: "Old roads on view under the street; museums",
            },
            tianhe: {
              label: "Tianhe · Zhujiang New Town",
              note: "The skyline; Canton Tower across the river",
            },
            pazhou: {
              label: "Pazhou",
              note: "Canton Fair halls; fairs push hotel prices up",
            },
            panyu: {
              label: "Chimelong, Panyu",
              note: "A whole day for the family; add nothing else",
            },
            baiyun: {
              label: "Baiyun Airport",
              note: "T2 or T3 only; T1 is closed",
            },
            gzstation: {
              label: "Guangzhou Station",
              note: "High-speed trains to Beijing since 2026",
            },
            east: {
              label: "Guangzhou East",
              note: "Tianhe side; trains to Shenzhen",
            },
            south: {
              label: "Guangzhou South",
              note: "Vast station in Panyu; trains to Hong Kong",
            },
          },
        },
      },
      zh: {
        path: hubPath("guangzhou", "zh"),
        title: "广州旅游攻略：早茶老街和珠江，三晚怎么玩、住哪里",
        h1: "广州：早茶、老街和珠江，留足三晚",
        description:
          "荔湾饮早茶、走永庆坊老街到沙面、夜看珠江边的广州塔，留足三晚。第一次来住哪个区，白云机场航站楼和火车站怎么认，下一站为什么去香港，这里一次讲清。",
        navTitle: "广州",
        summary:
          "早上在荔湾饮早茶，一笼笼点心摆满一桌；再去陈家祠，抬头看屋脊上挤满的彩色陶人，然后穿过永庆坊的老街巷走到沙面，沿着樟树成荫的安静大街慢慢逛。天黑以后，广州塔在珠江边亮起灯来。到达和离开那两天总比想的更费时间，住三晚，老城和江边新城才都能从容逛到。",
        heroAlt: "广州荔湾泮溪酒家的一张圆桌：竹蒸笼里的点心、一碟红色肠粉、茶壶、铜水壶和藤编热水瓶，几双筷子正伸过去。",
        heroCaption:
          "荔湾泮溪酒家的早茶，几笼点心大家分着吃。吃完就把一天留给西边老城：陈家祠、永庆坊，傍晚到沙面。",
        openGraphLocale: "zh_CN",
        searchTerms: [
          "广州旅游攻略",
          "广州玩几天合适",
          "第一次去广州住哪个区",
          "广州住哪里方便",
          "白云机场T2还是T3",
          "广州去香港怎么走",
        ],
        geography: {
          title: "老城在西，新城在东",
          caption:
            "示意图，不按比例。西边老城走路逛一天正好；番禺长隆要单独留出一整天。",
          legend: {
            core: "老城",
            cluster: "留半天以上",
            outside: "留一整天",
            gateway: "机场和车站",
          },
          nodes: {
            liwan: {
              label: "荔湾 · 沙面",
              note: "早茶、老街，傍晚上沙面",
            },
            yuexiu: {
              label: "北京路 · 越秀",
              note: "看街下旧路面、逛博物馆",
            },
            tianhe: {
              label: "天河 · 珠江新城",
              note: "高楼林立，对岸是广州塔",
            },
            pazhou: {
              label: "琶洲",
              note: "广交会展馆，展期酒店贵",
            },
            panyu: {
              label: "番禺长隆",
              note: "亲子玩一整天，别再塞别的",
            },
            baiyun: {
              label: "白云机场",
              note: "只用T2、T3，T1已关闭",
            },
            gzstation: {
              label: "广州站",
              note: "2026年起有京广高铁",
            },
            east: {
              label: "广州东站",
              note: "天河一侧，有去深圳的车",
            },
            south: {
              label: "广州南站",
              note: "番禺的大站，有车去香港",
            },
          },
        },
      },
      ko: {
        path: hubPath("guangzhou", "ko"),
        title: "광저우 여행: 딤섬·옛 골목·주강 야경, 3박 일정과 숙소",
        h1: "광저우: 아침 딤섬, 옛 골목, 주강까지 3박은 머무세요",
        description:
          "리완의 아침 딤섬, 사면도 가는 옛 골목, 주강 야경까지 보려면 3박은 머무세요. 처음 묵기 좋은 지역, 공항 터미널과 기차역, 다음 도시 홍콩까지 정리했습니다.",
        navTitle: "광저우",
        summary:
          "아침은 리완에서 얌차(딤섬을 곁들인 아침 차)로 시작하세요. 대나무 찜기가 식탁을 가득 채웁니다. 진가사에서 도자기 인형이 빼곡한 용마루를 올려다보고, 융칭팡 골목을 지나 녹나무 그늘 아래 사면도 거리를 걷습니다. 어두워지면 주강 위로 광저우 타워에 불이 들어옵니다. 오가는 날은 생각보다 시간이 많이 드니, 3박은 해야 옛 도심과 강변 새 도심을 서두르지 않고 둘러봅니다.",
        heroAlt: "광저우 리완 판시 레스토랑의 둥근 식탁 위 대나무 찜기 딤섬과 붉은 창펀, 찻주전자, 황동 주전자, 등나무로 감싼 보온병, 젓가락을 뻗는 손들.",
        heroCaption:
          "리완 판시 레스토랑의 얌차입니다. 딤섬 몇 판을 나눠 먹고 나면 하루는 서쪽 옛 도심에 쓰세요. 진가사와 융칭팡을 거쳐 늦은 오후에 사면도에 닿으면 됩니다.",
        openGraphLocale: "ko_KR",
        searchTerms: [
          "광저우 여행",
          "광저우 여행 코스",
          "광저우 자유여행",
          "광저우 숙소 추천",
          "바이윈공항 T2 T3",
          "광저우 홍콩 고속철",
        ],
        geography: {
          title: "옛 도심은 서쪽, 새 도심은 동쪽",
          caption:
            "축척이 아닌 개념도입니다. 서쪽 옛 도심은 걸어서 하루면 알맞고, 판위의 침롱은 하루를 따로 비워 두세요.",
          legend: {
            core: "옛 도심",
            cluster: "반나절 이상",
            outside: "하루 전체",
            gateway: "공항·기차역",
          },
          nodes: {
            liwan: {
              label: "리완 · 사면도",
              note: "얌차, 옛 골목, 해 질 녘 사면도",
            },
            yuexiu: {
              label: "베이징루 · 웨슈",
              note: "거리 아래 옛 노면, 박물관",
            },
            tianhe: {
              label: "톈허 · 주장신청",
              note: "고층 빌딩, 강 건너 광저우 타워",
            },
            pazhou: {
              label: "파저우",
              note: "광교회 전시장, 박람회 때 숙박비 상승",
            },
            panyu: {
              label: "판위 침롱",
              note: "가족과 하루 종일, 다른 일정은 빼세요",
            },
            baiyun: {
              label: "바이윈공항",
              note: "T1 운영 중단, T2·T3만 이용",
            },
            gzstation: {
              label: "광저우역",
              note: "2026년부터 베이징행 고속열차",
            },
            east: {
              label: "광저우동역",
              note: "톈허 쪽, 선전행 열차",
            },
            south: {
              label: "광저우남역",
              note: "판위의 큰 역, 홍콩행 열차",
            },
          },
        },
      },
    },
  },
  {
    id: "hangzhou",
    entityId: "city-hangzhou",
    heroImagePath: "/images/home/hangzhou-1600.jpg",
    heroImageUrl: "https://homegroundchina.com/images/home/hangzhou-1600.jpg",
    imageWidth: 1600,
    imageHeight: 1066,
    datePublished: "2026-08-20",
    dateModified: "2026-08-21",
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
        title: "Hangzhou Travel Guide: 2 Nights or a Day Trip from Shanghai",
        h1: "Hangzhou: West Lake, Lingyin and the Longjing tea villages, over two nights",
        description:
          "Give Hangzhou two nights, not a day trip: West Lake at dawn and dusk, Lingyin and the Longjing tea villages. See where to stay, which station and what's next.",
        navTitle: "Hangzhou",
        summary:
          "Be on the Su Causeway early, while mist still hangs over the water and willows trail into it. Take a boat out to the three little stone pagodas pictured on the back of the one-yuan note. Give a morning to Lingyin, where a clear stream runs beneath a cliff full of carved Buddhas, then stop in the Longjing villages for tea grown on the slopes around you. A day trip from Shanghai can't hold all that; two nights give you the lake at dusk and dawn as well.",
        heroAlt: "Small boats crossing West Lake in Hangzhou beneath wooded hills and mist.",
        heroCaption:
          "Small boats cross West Lake beneath low, wooded hills. When the shore gets busy, head west to the foot of the hills, where the crowds thin out among backwaters and woods.",
        openGraphLocale: "en_US",
        searchTerms: [
          "Hangzhou travel guide",
          "Hangzhou day trip from Shanghai",
          "how many days in Hangzhou",
          "where to stay in Hangzhou",
          "West Lake Hangzhou",
          "Hangzhou East railway station",
        ],
        geography: {
          title: "Around West Lake, and two places further north",
          caption:
            "Not to scale. Take the lake one side at a time; Liangzhu, about 25 km north-west, needs a whole day of its own.",
          legend: {
            core: "Lakeside city centre",
            cluster: "Half a day or more",
            outside: "A whole day",
            gateway: "Airport and station",
          },
          nodes: {
            east: {
              label: "Hubin · east shore",
              note: "Hotels, dinner and evening walks by the lake",
            },
            north: {
              label: "Beishan · north shore",
              note: "Bai Causeway, Broken Bridge and Gushan",
            },
            south: {
              label: "South shore · Leifeng Pagoda",
              note: "Climb the pagoda for the whole lake below",
            },
            west: {
              label: "Lingyin · Longjing",
              note: "Carved Buddhas, incense and tea villages",
            },
            canal: {
              label: "Grand Canal",
              note: "A working waterway in the city's north",
            },
            liangzhu: {
              label: "Liangzhu",
              note: "A 5,000-year-old city among rice fields",
            },
            hgh: {
              label: "HGH airport",
              note: "In Xiaoshan, outside central Hangzhou",
            },
            eaststation: {
              label: "Hangzhou East",
              note: "Often the most trains, many to Shanghai",
            },
          },
        },
      },
      zh: {
        path: hubPath("hangzhou", "zh"),
        title: "杭州旅游攻略：西湖灵隐龙井，两晚怎么玩、住哪里",
        h1: "杭州：西湖、灵隐和龙井茶园，住上两晚",
        description:
          "苏堤晨雾、灵隐石壁上的佛像、龙井村的茶，从上海一日往返装不下，住上两晚才从容。第一次来住哪里，高铁坐到哪个站，下一站去上海还是苏州，这里一次讲清。",
        navTitle: "杭州",
        summary:
          "一早走上苏堤，薄雾还浮在水面，柳枝垂进湖里；再坐船去看一元人民币背面那三座小石塔。留一个上午给灵隐，沿着清亮的溪水走，石壁上到处是佛像；回程在龙井村停一停，喝一杯身边山坡上长出来的茶。从上海一日往返装不下这些，住两晚，西湖的傍晚和清晨也都赶得上。",
        heroAlt: "杭州西湖上的小船从水面驶过，远处是树林覆盖的山和雾气。",
        heroCaption:
          "小船从西湖上驶过，远处是低低的青山。湖边人多时，就往西走到山脚下，拐进水湾和树林，人就少多了。",
        openGraphLocale: "zh_CN",
        searchTerms: [
          "杭州旅游攻略",
          "上海到杭州一日游",
          "杭州玩几天合适",
          "杭州住哪里方便",
          "杭州东站到西湖",
          "西湖灵隐龙井怎么安排",
        ],
        geography: {
          title: "景点围着西湖，北边另有两处",
          caption:
            "示意图，不按比例。西湖一次看一边就好；良渚在西北约 25 公里，要单独留一整天。",
          legend: {
            core: "湖边市中心",
            cluster: "留半天以上",
            outside: "留一整天",
            gateway: "机场和车站",
          },
          nodes: {
            east: {
              label: "湖滨 · 东岸",
              note: "住宿、晚饭、湖边散步",
            },
            north: {
              label: "北山 · 北岸",
              note: "白堤、断桥和孤山",
            },
            south: {
              label: "南岸 · 雷峰塔",
              note: "登上塔顶看整个西湖",
            },
            west: {
              label: "灵隐 · 龙井",
              note: "飞来峰佛像、寺院和茶园",
            },
            canal: {
              label: "大运河",
              note: "城北至今还在用的水路",
            },
            liangzhu: {
              label: "良渚",
              note: "稻田间五千年前的古城",
            },
            hgh: {
              label: "HGH 萧山机场",
              note: "在萧山，不在市中心",
            },
            eaststation: {
              label: "杭州东站",
              note: "车次多，去上海的也多",
            },
          },
        },
      },
      ko: {
        path: hubPath("hangzhou", "ko"),
        title: "항저우 여행: 서호·영은사·용정차 마을, 2박 일정과 숙소",
        h1: "항저우: 서호, 영은사, 용정차 마을까지 2박은 머무세요",
        description:
          "서호의 아침과 저녁, 영은사, 용정차 마을은 상하이 당일치기로 다 담기 어려우니 2박은 머무세요. 처음 묵기 좋은 지역, 어느 역에 내릴지, 다음 도시 상하이·쑤저우까지 정리했습니다.",
        navTitle: "항저우",
        summary:
          "이른 아침 소제에는 물안개가 깔리고 버들가지가 물에 닿습니다. 배로 섬에 가면 1위안 지폐 뒷면의 돌탑 세 개가 물 위에 서 있습니다. 오전에는 영은사에서 맑은 개울을 따라 불상이 가득한 바위 절벽을 지나고, 돌아오는 길에 용정차 마을에 들러 주변 비탈에서 자란 차를 마셔 보세요. 상하이 당일치기로는 다 담기 어려우니, 2박은 머물러야 서호의 저녁과 아침까지 누립니다.",
        heroAlt: "나무가 우거진 산과 안개 아래 항저우 서호를 가로지르는 작은 배들.",
        heroCaption:
          "작은 배들이 나지막한 숲 언덕 아래로 서호를 건넙니다. 호숫가가 붐비면 서쪽 산자락으로 가 보세요. 물굽이와 숲으로 들어서면 사람이 훨씬 적습니다.",
        openGraphLocale: "ko_KR",
        searchTerms: [
          "항저우 여행",
          "항저우 여행 코스",
          "상하이 항저우 당일치기",
          "항저우 2박3일",
          "항저우 숙소 추천",
          "항저우 서호 여행",
        ],
        geography: {
          title: "서호를 둘러싼 명소와 북쪽의 두 곳",
          caption:
            "축척이 아닌 개념도입니다. 서호는 한 번에 한쪽씩 보고, 북서쪽 약 25km의 량주는 하루를 따로 비워 두세요.",
          legend: {
            core: "호숫가 도심",
            cluster: "반나절 이상",
            outside: "하루 전체",
            gateway: "공항·기차역",
          },
          nodes: {
            east: {
              label: "후빈 · 동쪽 물가",
              note: "숙소·저녁 식사·호숫가 산책",
            },
            north: {
              label: "베이산 · 북쪽 물가",
              note: "백제(白堤)·단교·구산",
            },
            south: {
              label: "남쪽 물가 · 뇌봉탑",
              note: "탑에 오르면 서호가 한눈에",
            },
            west: {
              label: "영은사 · 용정",
              note: "비래봉 불상·향 연기·차밭",
            },
            canal: {
              label: "대운하",
              note: "도시 북쪽, 지금도 쓰이는 물길",
            },
            liangzhu: {
              label: "량주",
              note: "논 사이에 남은 5천 년 전 도시",
            },
            hgh: {
              label: "HGH 공항",
              note: "샤오산, 도심 밖",
            },
            eaststation: {
              label: "항저우동역",
              note: "열차가 많고 상하이행도 많음",
            },
          },
        },
      },
    },
  },
  {
    id: "zhangjiajie",
    entityId: "city-zhangjiajie",
    heroImagePath: "/images/home/zhangjiajie-1600.jpg",
    heroImageUrl: "https://homegroundchina.com/images/home/zhangjiajie-1600.jpg",
    imageWidth: 1600,
    imageHeight: 954,
    datePublished: "2026-08-20",
    dateModified: "2026-08-21",
    sourceReviewedDate: "2026-08-20",
    supportGuideIds: [
      "chengdu-chongqing-zhangjiajie-itinerary",
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
        title: "Zhangjiajie Travel Guide: 4–5 Nights and Where to Stay",
        h1: "Zhangjiajie: sandstone pillars in the clouds, over four or five nights",
        description:
          "Give Zhangjiajie four or five nights for the sandstone pillars and Tianmen Mountain. See where to stay, which airport and station to use, and where to go next.",
        navTitle: "Zhangjiajie",
        summary:
          "Walk out to the rim at Yuanjiajie and the ground drops away. Hundreds of sandstone pillars rise sheer from the forest below, pines clinging to their tops. Then go down to Golden Whip Stream and walk the valley floor, looking up at them. On another day, climb Tianmen Mountain's 999 steps into a hole right through the cliff. The Forest Park deserves two days and Tianmen one. Four nights give you those three full days; five leave a spare one in case fog hides the view.",
        heroAlt: "Tall grey and tan sandstone pillars capped with trees, with white mist drifting between them, in Zhangjiajie National Forest Park.",
        heroCaption:
          "After rain, cloud lifts out of the valleys and drifts between the pillars, so whole columns fade and come back as you watch. Try for a morning like this at the rim of Yuanjiajie or Tianzi Mountain.",
        openGraphLocale: "en_US",
        searchTerms: [
          "Zhangjiajie travel guide",
          "how many days in Zhangjiajie",
          "where to stay in Zhangjiajie",
          "Zhangjiajie city or Wulingyuan",
          "Zhangjiajie National Forest Park",
          "Tianmen Mountain Zhangjiajie",
          "Avatar mountains Zhangjiajie",
        ],
        geography: {
          title: "Zhangjiajie's sights sit in three areas",
          caption:
            "Not to scale. Tianmen, the Forest Park and the Grand Canyon lie apart, so give each its own day. The airport and station are by the city.",
          legend: {
            core: "Zhangjiajie city",
            cluster: "Half a day or more",
            outside: "A day of its own",
            gateway: "Airport and station",
          },
          nodes: {
            city: {
              label: "Zhangjiajie city",
              note: "Near Tianmen; easy after a late arrival",
            },
            wulingyuan: {
              label: "Wulingyuan",
              note: "By the East Gate; stay here for the park",
            },
            yuanjiajie: {
              label: "Yuanjiajie",
              note: "The stone bridge and the Avatar pillar",
            },
            tianzi: {
              label: "Tianzi Mountain",
              note: "The widest view over the pillars",
            },
            tianmen: {
              label: "Tianmen Mountain",
              note: "The arch and cliff paths; a whole day",
            },
            grandcanyon: {
              label: "Grand Canyon",
              note: "The glass bridge, then down to waterfalls",
            },
            dyg: {
              label: "DYG airport",
              note: "By the city; a drive from the park",
            },
            weststation: {
              label: "Zhangjiajie West",
              note: "High-speed trains, by the city",
            },
          },
        },
      },
      zh: {
        path: hubPath("zhangjiajie", "zh"),
        title: "张家界旅游攻略：森林公园天门山，四五晚怎么玩、住哪里",
        h1: "张家界：云雾里的石柱，留足四五晚",
        description:
          "袁家界的石柱、金鞭溪的溪谷、天门山的999级台阶，留足四五晚。住武陵源还是市区，机场和高铁站在哪，看完山为什么去凤凰住一晚，这里一次讲清。",
        navTitle: "张家界",
        summary:
          "走到袁家界崖边，脚下的地面一下子断了，几百根砂岩石柱从林子里直直立起，柱顶长着松树。再下到谷底，沿着金鞭溪边走边抬头看。另挑一天上天门山，爬 999 级台阶，钻进把山打穿的大洞。森林公园值得玩两天，天门山一天；住四晚刚好玩满这三天，住五晚还能多留一天等雾散。",
        heroAlt: "张家界国家森林公园里，一根根顶上长着树的灰黄色砂岩石柱，白色云雾在中间飘。",
        heroCaption:
          "雨后，云从山谷里升起来，在石柱间飘，整根柱子忽隐忽现。挑个雨后的早上，到袁家界或天子山的崖边看看。",
        openGraphLocale: "zh_CN",
        searchTerms: [
          "张家界旅游攻略",
          "张家界玩几天合适",
          "张家界住市区还是武陵源",
          "张家界国家森林公园攻略",
          "天门山怎么玩",
          "张家界大峡谷玻璃桥",
        ],
        geography: {
          title: "张家界的景点分在三片",
          caption:
            "示意图，不按比例。天门山、森林公园、大峡谷彼此分开，各留一天；机场和车站都在市区那边。",
          legend: {
            core: "市区",
            cluster: "留半天以上",
            outside: "单独留一天",
            gateway: "机场和车站",
          },
          nodes: {
            city: {
              label: "张家界市区",
              note: "离天门山近，晚到也方便",
            },
            wulingyuan: {
              label: "武陵源",
              note: "东门外小镇，玩公园住这里",
            },
            yuanjiajie: {
              label: "袁家界",
              note: "天下第一桥、“阿凡达山”",
            },
            tianzi: {
              label: "天子山",
              note: "看石柱最开阔的地方",
            },
            tianmen: {
              label: "天门山",
              note: "天门洞和悬崖栈道，一整天",
            },
            grandcanyon: {
              label: "大峡谷",
              note: "走玻璃桥，再下谷底看瀑布",
            },
            dyg: {
              label: "DYG 荷花机场",
              note: "在市区那边，去公园要坐车",
            },
            weststation: {
              label: "张家界西站",
              note: "高铁站，在市区那边",
            },
          },
        },
      },
      ko: {
        path: hubPath("zhangjiajie", "ko"),
        title: "장가계 여행: 원가계·천문산, 4~5박 일정과 숙소",
        h1: "장가계: 구름 속 봉우리 숲, 4~5박은 머무세요",
        description:
          "원가계 봉우리 숲과 금편계, 천문산까지 보려면 4~5박은 머무세요. 무릉원과 시내 중 숙소 고르기, 공항과 기차역, 다음 도시 봉황고성까지 정리했습니다.",
        navTitle: "장가계",
        summary:
          "원가계 절벽 끝에 서면 발밑의 땅이 뚝 끊기고, 꼭대기에 소나무가 자란 사암 봉우리 수백 개가 숲에서 곧게 솟아 있습니다. 골짜기로 내려가 금편계를 걸으며 봉우리를 올려다보고, 다른 날에는 천문산 999계단을 올라 산을 꿰뚫은 천문동에 들어서 보세요. 삼림공원에 이틀, 천문산에 하루를 쓰니 4박이면 그 사흘을 채우고, 5박이면 안개가 걷히길 기다릴 하루가 더 생깁니다.",
        heroAlt: "장가계 국가삼림공원에서 꼭대기에 나무가 자란 회색과 황갈색의 사암 봉우리들 사이로 하얀 안개가 흐르는 모습.",
        heroCaption:
          "비가 그치면 골짜기에서 구름이 피어올라 봉우리 사이를 흐르고, 봉우리가 사라졌다 다시 나타납니다. 비 온 뒤 아침에 원가계나 천자산 절벽 끝에 서 보세요.",
        openGraphLocale: "ko_KR",
        searchTerms: [
          "장가계 여행",
          "장가계 여행 코스",
          "장가계 자유여행",
          "장가계 4박5일",
          "장가계 무릉원 숙소",
          "장가계 원가계 천문산",
          "장가계 대협곡 유리다리",
        ],
        geography: {
          title: "장가계의 명소는 세 곳에 나뉘어 있습니다",
          caption:
            "축척이 아닌 개념도입니다. 천문산·삼림공원·대협곡은 서로 떨어져 있어 하루씩 따로 잡으세요. 공항과 기차역은 시내 쪽입니다.",
          legend: {
            core: "장가계 시내",
            cluster: "반나절 이상",
            outside: "하루 따로",
            gateway: "공항·기차역",
          },
          nodes: {
            city: {
              label: "장가계 시내",
              note: "천문산과 가깝고, 늦게 와도 편함",
            },
            wulingyuan: {
              label: "무릉원",
              note: "동문 앞 마을, 공원 가는 날 숙소",
            },
            yuanjiajie: {
              label: "원가계",
              note: "천하제일교와 ‘아바타’ 봉우리",
            },
            tianzi: {
              label: "천자산",
              note: "봉우리 숲이 가장 넓게 보이는 곳",
            },
            tianmen: {
              label: "천문산",
              note: "천문동과 절벽 잔도, 하루 꼬박",
            },
            grandcanyon: {
              label: "대협곡",
              note: "유리다리 건너 폭포 협곡으로",
            },
            dyg: {
              label: "DYG 허화공항",
              note: "시내 쪽, 공원까지는 차로 이동",
            },
            weststation: {
              label: "장가계서역",
              note: "고속열차역, 시내 쪽",
            },
          },
        },
      },
    },
  },
  {
    id: "chongqing",
    entityId: "city-chongqing",
    heroImagePath: "/images/destinations/chongqing/qiansimen-sunset-hero-1600.webp",
    heroImageUrl:
      "https://homegroundchina.com/images/destinations/chongqing/qiansimen-sunset-hero-1600.webp",
    imageWidth: 1600,
    imageHeight: 1000,
    datePublished: "2026-08-21",
    dateModified: "2026-09-09",
    sourceReviewedDate: "2026-08-21",
    supportGuideIds: [
      "chengdu-chongqing-zhangjiajie-itinerary",
      "chongqing-upper-lower-city-orientation",
      "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba",
      "china-tiankeng-sinkholes-explained",
      "sichuan-opera-face-changing-with-context",
      "chongqing-railway-station-selector",
    ],
    geometry: [
      { id: "yuzhong", x: 0.5, y: 0.48, kind: "core" },
      { id: "jiangbei", x: 0.5, y: 0.2, kind: "cluster" },
      { id: "nanan", x: 0.55, y: 0.75, kind: "cluster" },
      { id: "liziba", x: 0.22, y: 0.46, kind: "cluster" },
      { id: "wulong", x: 0.82, y: 0.92, kind: "outside" },
      { id: "dazu", x: 0.08, y: 0.72, kind: "outside" },
      { id: "ckg", x: 0.75, y: 0.08, kind: "gateway" },
      { id: "eaststation", x: 0.78, y: 0.63, kind: "gateway" },
    ],
    locales: {
      en: {
        path: hubPath("chongqing", "en"),
        title: "Chongqing Travel Guide: 3 Nights and Where to Stay",
        h1: "Chongqing: stepped lanes, two rivers and city lights, over three nights",
        description:
          "Give Chongqing three nights for its stepped lanes, two rivers and Hongyadong lit up at night. See where to stay, which station to use, and why Chengdu is next.",
        navTitle: "Chongqing",
        summary:
          "Start at the Liberation Monument and wander down Shibati's old street of steps. At Chaotianmen, watch the Jialing meet the Yangtze, usually the clearer river against the muddier one. After dinner, Hongyadong's eleven storeys glow gold above the water. Next day, cross to the south bank, drift down through Danzishi's lanes and eat by the river, looking back at Yuzhong's towers. Three nights give you those two full days; add at least one more for Wulong's stone bridges or Dazu's carvings.",
        heroAlt:
          "The Yuzhong skyline across the Jialing River at sunset, with the red-lit Qiansimen Bridge on the right.",
        heroCaption:
          "Yuzhong's towers glow across the Jialing River at sunset, and Qiansimen Bridge lights up red. After dark, walk out to the middle of the bridge and look back at Hongyadong.",
        openGraphLocale: "en_US",
        searchTerms: [
          "Chongqing travel guide",
          "how many days in Chongqing",
          "where to stay in Chongqing first time",
          "Hongyadong Chongqing",
          "Chongqing to Wulong",
          "Chongqing to Chengdu train",
        ],
        geography: {
          title: "Two rivers split Chongqing's centre into three",
          caption:
            "Not to scale. Banks that look close can be a bridge or tunnel apart; Wulong and Dazu each need a whole day.",
          legend: {
            core: "City centre",
            cluster: "Half a day or more",
            outside: "A whole day",
            gateway: "Airport and station",
          },
          nodes: {
            yuzhong: {
              label: "Yuzhong · Jiefangbei",
              note: "A full day; Hongyadong lit up at night",
            },
            jiangbei: {
              label: "Jiangbei · Guanyinqiao",
              note: "Shopping and late dinners across the river",
            },
            nanan: {
              label: "Nan'an · Nanshan",
              note: "Riverside dinner, looking back at Yuzhong",
            },
            liziba: {
              label: "Liziba · west side",
              note: "Train through a building; pair with Ciqikou",
            },
            wulong: {
              label: "Wulong",
              note: "Stone bridges in a gorge; better with a night",
            },
            dazu: {
              label: "Dazu",
              note: "Rock carvings; a whole day by road",
            },
            ckg: {
              label: "CKG airport",
              note: "North of the centre; a car if you land late",
            },
            eaststation: {
              label: "Chongqing East",
              note: "South bank; trains to Wulong, Zhangjiajie",
            },
          },
        },
      },
      zh: {
        path: hubPath("chongqing", "zh"),
        title: "重庆旅游攻略：洪崖洞两江夜景，三晚怎么玩、住哪里",
        h1: "重庆：爬坡上坎、两江夜色，留足三晚",
        description:
          "十八梯老街、朝天门两江交汇、洪崖洞夜景，留足三晚。住哪里方便，四个火车站和机场怎么认，去武隆要不要加一晚，下一站为什么是成都，这里一次讲清。",
        navTitle: "重庆",
        summary:
          "从解放碑出发，顺着十八梯老街一级级往下走；到朝天门，看嘉陵江和长江汇合，平时一清一黄。天黑后，洪崖洞十一层吊脚楼沿江亮起金光。第二天过江到南岸，顺着弹子石老街的巷子往下逛，坐在江边吃晚饭，回望渝中的高楼。住三晚，正好玩满这两天；想去武隆或大足，至少再加一晚。",
        heroAlt: "日落时分，隔着嘉陵江看渝中半岛的高楼，右边是亮着红灯的千厮门大桥。",
        heroCaption:
          "日落时，渝中的高楼隔着嘉陵江亮起来，千厮门大桥也亮成红色。天黑后走到桥中间回头，整栋亮灯的洪崖洞就在眼前。",
        openGraphLocale: "zh_CN",
        searchTerms: [
          "重庆旅游攻略",
          "重庆玩几天合适",
          "第一次去重庆住哪里",
          "重庆住解放碑还是观音桥",
          "重庆到武隆怎么去",
          "重庆去成都高铁",
        ],
        geography: {
          title: "两条江把重庆城区分成三块",
          caption:
            "示意图，不按比例。隔江看着近，也得过桥或穿隧道；武隆、大足各要一整天。",
          legend: {
            core: "市中心",
            cluster: "留半天以上",
            outside: "留一整天",
            gateway: "机场和车站",
          },
          nodes: {
            yuzhong: {
              label: "渝中 · 解放碑",
              note: "留一整天，晚上看洪崖洞",
            },
            jiangbei: {
              label: "江北 · 观音桥",
              note: "过江逛街、晚上吃饭",
            },
            nanan: {
              label: "南岸 · 南山",
              note: "江边吃饭，回望渝中",
            },
            liziba: {
              label: "李子坝 · 西侧",
              note: "列车穿楼，可连磁器口",
            },
            wulong: {
              label: "武隆",
              note: "峡谷石桥，住一晚更从容",
            },
            dazu: {
              label: "大足",
              note: "石刻，坐车来回一整天",
            },
            ckg: {
              label: "CKG 江北机场",
              note: "在城北，晚到就坐车",
            },
            eaststation: {
              label: "重庆东站",
              note: "在南岸，去武隆、张家界",
            },
          },
        },
      },
      ko: {
        path: hubPath("chongqing", "ko"),
        title: "충칭 여행: 홍야동 야경·계단 골목, 3박 일정과 숙소",
        h1: "충칭: 계단 골목과 두 강의 야경, 3박은 머무세요",
        description:
          "스바티 계단길, 두 강이 만나는 조천문, 홍야동 야경까지 보려면 3박은 머무세요. 처음 묵기 좋은 지역, 네 기차역과 공항, 다음 도시 청두까지 정리했습니다.",
        navTitle: "충칭",
        summary:
          "해방비에서 출발해 스바티 옛 계단길을 한 칸씩 내려갑니다. 조천문에서는 대개 더 맑은 자링강과 누런 장강이 만나는 모습이 보입니다. 해가 지면 홍야동 11층 건물이 강가에서 금빛으로 빛납니다. 다음 날은 강 건너 단쯔스 골목을 내려가 강변에서 저녁을 먹으며 위중의 빌딩숲을 바라보세요. 3박이면 이 이틀을 온전히 쓸 수 있고, 우롱이나 대족에 가려면 최소 1박을 더하세요.",
        heroAlt: "해 질 녘 자링강 건너편으로 보이는 위중반도의 고층 빌딩과 오른쪽의 붉은 조명이 켜진 천사문대교.",
        heroCaption:
          "해 질 녘 자링강 건너 위중의 빌딩에 불이 들어오고 천사문대교도 붉게 빛납니다. 어두워지면 다리 한가운데까지 걸어가 뒤돌아보세요. 불 켜진 홍야동이 한눈에 들어옵니다.",
        openGraphLocale: "ko_KR",
        searchTerms: [
          "충칭 여행",
          "충칭 여행 코스",
          "충칭 자유여행",
          "충칭 홍야동 야경",
          "충칭 숙소 추천",
          "충칭 우롱 천생삼교",
        ],
        geography: {
          title: "두 강이 충칭 도심을 셋으로 나눕니다",
          caption:
            "축척이 아닌 개념도입니다. 가까워 보이는 강변도 다리나 터널을 건너야 하고, 우롱과 대족은 각각 하루가 필요합니다.",
          legend: {
            core: "도심",
            cluster: "반나절 이상",
            outside: "하루 전체",
            gateway: "공항과 기차역",
          },
          nodes: {
            yuzhong: {
              label: "위중 · 해방비",
              note: "하루 전체, 밤에는 홍야동 야경",
            },
            jiangbei: {
              label: "장베이 · 관인차오",
              note: "강 건너 쇼핑과 늦은 저녁",
            },
            nanan: {
              label: "난안 · 난산",
              note: "강변 저녁, 위중을 건너다보는 곳",
            },
            liziba: {
              label: "리쯔바 · 서쪽",
              note: "건물을 통과하는 열차, 츠치커우와 함께",
            },
            wulong: {
              label: "우롱",
              note: "천생삼교, 1박하면 여유롭습니다",
            },
            dazu: {
              label: "대족",
              note: "석각을 보러 차로 오가는 하루",
            },
            ckg: {
              label: "CKG 공항",
              note: "도심 북쪽, 늦게 도착하면 차로",
            },
            eaststation: {
              label: "충칭동역",
              note: "난안, 우롱·장가계행 열차",
            },
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

export function getDestinationHubsForGuide(
  guideId: GuideId,
  locale: HomegroundLocale = "en",
) {
  return destinationHubRegistry
    .filter((hub) => (hub.supportGuideIds as readonly GuideId[]).includes(guideId))
    .map((hub) => getDestinationHubEntry(hub.id, locale));
}

export function isDestinationHubId(value: string): value is DestinationHubId {
  return destinationHubIds.some((id) => id === value);
}
