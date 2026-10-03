import type { AttractionReservationCityId, AttractionReservationId } from "./attractionReservations";
import type { DestinationHubId } from "./destinationHubs";
import type { GuideId } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import type { PhotoCredit } from "./photoCredits";

export type { PhotoCredit };

/**
 * Must-see sights: the third way into Destinations. A sight page says why it
 * is worth the trip, then hands each next step to its owner: the booking
 * facts and "we book it" to the attraction-reservation rules (one source of
 * truth for release times, passports and prices), the full how-to to the
 * Travel Advice guide, and the tours that visit it to the published
 * catalogue. Nothing here restates those; it only names them.
 *
 * `tourSlugs` were matched against the published itineraries by hand: a tour
 * is listed only when a day plainly visits the sight (not "one garden, such
 * as…", not a two-way choice).
 *
 * `ready` stays false until the sight's own writing is in. Until then its
 * page is reachable from the hub and the menu but asks search engines not to
 * index it, so a page of links never competes with the guide it points to.
 *
 * A sight without its own Travel Advice guide yet (the Bund, Canton Tower)
 * carries its own photo and simply shows no "Full guide" link until one is
 * written.
 */
export const sightsPath: Record<HomegroundLocale, string> = {
  en: "/sights/",
  zh: "/zh/sights/",
  ko: "/ko/sights/",
};

export type SightCityId = AttractionReservationCityId | Extract<DestinationHubId, "zhangjiajie" | "chongqing" | "guangzhou">;

/** Cities in the hub's order. */
export const sightCityIds = [
  "beijing",
  "xian",
  "shanghai",
  "suzhou",
  "hangzhou",
  "chengdu",
  "chongqing",
  "zhangjiajie",
  "guilin",
  "lijiang",
  "guangzhou",
] as const satisfies readonly SightCityId[];

export const sightIds = [
  "forbidden-city",
  "great-wall",
  "temple-of-heaven",
  "summer-palace",
  "national-museum",
  "terracotta-warriors",
  "xian-city-wall",
  "shaanxi-history-museum",
  "the-bund",
  "shanghai-tower",
  "shanghai-museum-east",
  "humble-administrators-garden",
  "west-lake",
  "lingyin",
  "liangzhu",
  "chengdu-panda-base",
  "sanxingdui",
  "leshan-giant-buddha",
  "hongyadong",
  "wulong",
  "dazu-rock-carvings",
  "li-river",
  "jade-dragon-snow-mountain",
  "zhangjiajie-forest-park",
  "tianmen-mountain",
  "zhangjiajie-grand-canyon",
  "chen-clan-hall",
  "canton-tower",
  "shamian",
] as const;
export type SightId = (typeof sightIds)[number];

export interface Sight {
  readonly id: SightId;
  readonly city: SightCityId;
  /** The Travel Advice guide that owns the how-to; its hero photo is the sight's photo. None yet: `image` is required. */
  readonly guideId?: GuideId;
  /**
   * Attraction-reservation rules for this sight, its own entry first: the
   * first rule decides whether we sell booking for the sight as a whole.
   */
  readonly reservationIds: readonly AttractionReservationId[];
  readonly tourSlugs: readonly string[];
  /**
   * A photo of the sight itself when the guide's hero is an illustration, a
   * map or a person, or when there is no guide yet. `credit` is set for an
   * openly licensed photo; it is shown under the photo, never on it.
   */
  readonly image?: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: Readonly<Record<HomegroundLocale, string>>;
    readonly credit?: PhotoCredit;
    /** Where the crop centres when a card or hero cuts the photo (CSS object-position). */
    readonly objectPosition?: string;
  };
  /** The credit of an openly licensed guide photo the sight borrows (from docs/homeground-photo-provenance.md). */
  readonly photoCredit?: PhotoCredit;
  /**
   * The place itself is free to walk into, so the page leads with that and
   * offers the bookable extras (the West Lake boats) below, never "book it".
   */
  readonly freeToVisit?: boolean;
  readonly ready: boolean;
}

export const sights: readonly Sight[] = [
  {
    id: "forbidden-city",
    city: "beijing",
    guideId: "forbidden-city-for-foreign-visitors",
    reservationIds: ["forbidden-city", "tiananmen-square"],
    tourSlugs: ["beijing-highlights-5-day-private-tour", "beijing-xian-shanghai-8-day-private-tour", "beijing-xian-guilin-shanghai-10-day-private-tour"],
    ready: false,
  },
  {
    id: "great-wall",
    city: "beijing",
    guideId: "great-wall-section-selector-from-beijing",
    reservationIds: ["great-wall-badaling", "great-wall-mutianyu"],
    image: {
      src: "/images/destinations/beijing/great-wall-1200.webp",
      width: 1200,
      height: 750,
      alt: {
        en: "A restored Great Wall section on mountain ridges north of Beijing",
        zh: "北京北郊山脊上修复过的一段长城",
        ko: "베이징 북부 산등성이의 복원된 만리장성 구간",
      },
    },
    tourSlugs: ["beijing-highlights-5-day-private-tour", "beijing-xian-shanghai-8-day-private-tour", "beijing-xian-shanghai-12-day-private-tour"],
    ready: false,
  },
  {
    id: "temple-of-heaven",
    city: "beijing",
    guideId: "temple-of-heaven-gates-and-ritual-sequence",
    reservationIds: ["temple-of-heaven"],
    tourSlugs: ["beijing-highlights-5-day-private-tour", "beijing-hangzhou-suzhou-shanghai-11-day-private-tour", "beijing-xian-shanghai-12-day-private-tour"],
    photoCredit: {
      author: "Maros M r a z (Maros)",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Temple_of_Heaven,_Beijing,_China_-_009.jpg",
    },
    ready: false,
  },
  {
    id: "summer-palace",
    city: "beijing",
    guideId: "summer-palace-gates-route-and-boat-plan",
    reservationIds: ["summer-palace"],
    tourSlugs: ["beijing-highlights-5-day-private-tour", "beijing-hangzhou-suzhou-shanghai-11-day-private-tour", "beijing-xian-shanghai-12-day-private-tour"],
    photoCredit: {
      author: "Regina800809",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Kunming_Lake_(Summer_Palace,_Beijing)_in_summer.JPG",
    },
    ready: false,
  },
  {
    id: "national-museum",
    city: "beijing",
    guideId: "national-museum-of-china-booking-and-route",
    reservationIds: ["national-museum-of-china"],
    tourSlugs: [],
    photoCredit: {
      author: "Daniel Case",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:National_Museum_of_China_west_facade,_straight_view.jpg",
    },
    ready: false,
  },
  {
    id: "terracotta-warriors",
    city: "xian",
    guideId: "terracotta-warriors-without-tour",
    reservationIds: ["terracotta-warriors"],
    tourSlugs: ["xian-terracotta-warriors-5-day-private-tour", "beijing-xian-shanghai-8-day-private-tour", "beijing-xian-shanghai-12-day-private-tour"],
    photoCredit: {
      author: "BrokenSphere",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Terracotta_Army_Pit_1.JPG",
    },
    ready: false,
  },
  {
    id: "xian-city-wall",
    city: "xian",
    guideId: "xian-city-wall-tickets-gates-walk-or-bike",
    reservationIds: ["xian-city-wall"],
    tourSlugs: ["xian-terracotta-warriors-5-day-private-tour", "beijing-xian-shanghai-8-day-private-tour", "beijing-xian-shanghai-12-day-private-tour"],
    ready: false,
  },
  {
    id: "shaanxi-history-museum",
    city: "xian",
    guideId: "shaanxi-history-museum-booking-and-collection-plan",
    reservationIds: ["shaanxi-history-museum"],
    tourSlugs: [],
    photoCredit: {
      author: "Danielinblue",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Shaanxi_History_Museum_architecture.JPG",
    },
    ready: false,
  },
  {
    id: "the-bund",
    city: "shanghai",
    // Free to walk; no guide of its own yet.
    reservationIds: [],
    image: {
      src: "/images/destinations/shanghai/bund-architecture-1200.webp",
      width: 1200,
      height: 750,
      alt: {
        en: "Early twentieth-century buildings on the Bund in Shanghai at dusk, including the Customs House clock tower",
        zh: "黄昏时的上海外滩近代建筑群，可以看到海关大楼钟楼",
        ko: "해 질 녘 상하이 와이탄의 근대 건축물과 세관 건물 시계탑",
      },
    },
    tourSlugs: ["shanghai-suzhou-5-day-private-tour", "shanghai-suzhou-hangzhou-6-day-private-tour", "shanghai-disneyland-5-day-private-tour"],
    ready: false,
  },
  {
    id: "shanghai-tower",
    city: "shanghai",
    reservationIds: ["shanghai-tower"],
    image: {
      src: "/images/tours/shanghai-suzhou-5-day-private-tour/shanghai-skyline-1600.webp",
      width: 1600,
      height: 1000,
      alt: {
        en: "Shanghai Tower beside the Jin Mao Tower and the Shanghai World Financial Center at sunset",
        zh: "日落时的上海中心大厦，旁边是金茂大厦和环球金融中心",
        ko: "해 질 녘 진마오타워·상하이 세계금융센터 옆의 상하이 타워",
      },
      objectPosition: "15% 50%",
    },
    tourSlugs: ["shanghai-suzhou-5-day-private-tour"],
    ready: false,
  },
  {
    id: "shanghai-museum-east",
    city: "shanghai",
    guideId: "shanghai-museum-east-entry-reservations",
    reservationIds: ["shanghai-museum-east", "shanghai-museum-east-experience-areas"],
    tourSlugs: [],
    ready: false,
  },
  {
    id: "humble-administrators-garden",
    city: "suzhou",
    guideId: "humble-administrators-garden-tickets-entry",
    reservationIds: ["humble-administrators-garden"],
    tourSlugs: ["shanghai-suzhou-5-day-private-tour", "shanghai-suzhou-hangzhou-6-day-private-tour"],
    photoCredit: {
      author: "Chainwit.",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Humble_Administrator%27s_Garden_Suzhou_(2024)_-_img_01.jpg",
    },
    ready: false,
  },
  {
    id: "west-lake",
    city: "hangzhou",
    // The lake is free to walk around; the boat is what we book.
    reservationIds: ["west-lake-boat"],
    image: {
      src: "/images/sights/west-lake-1200.webp",
      width: 1200,
      height: 800,
      alt: {
        en: "Lotus leaves and a pleasure boat on West Lake, with Leifeng Pagoda on the far shore",
        zh: "西湖的荷叶和游船，对岸是雷峰塔",
        ko: "서호의 연잎과 유람선, 건너편에 뇌봉탑",
      },
    },
    tourSlugs: ["shanghai-suzhou-hangzhou-6-day-private-tour", "beijing-hangzhou-suzhou-shanghai-11-day-private-tour", "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour"],
    freeToVisit: true,
    ready: false,
  },
  {
    id: "lingyin",
    city: "hangzhou",
    reservationIds: ["lingyin-feilai-peak"],
    image: {
      src: "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/lingyin-feilai-peak-1600.webp",
      width: 1600,
      height: 1000,
      alt: {
        en: "Buddhist carvings in the limestone of Feilai Peak beside Lingyin Temple",
        zh: "灵隐寺旁飞来峰岩壁上的佛教造像",
        ko: "영은사 옆 비래봉 석회암 벽면의 불교 조각",
      },
    },
    tourSlugs: ["shanghai-suzhou-hangzhou-6-day-private-tour"],
    ready: false,
  },
  {
    id: "liangzhu",
    city: "hangzhou",
    guideId: "liangzhu-ruins-park-and-museum-sequence",
    reservationIds: ["liangzhu"],
    tourSlugs: [],
    photoCredit: {
      author: "Siyuwj",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Courtyard_of_Liangzhu_Museum,_2016-06-18.jpg",
    },
    ready: false,
  },
  {
    id: "chengdu-panda-base",
    city: "chengdu",
    guideId: "chengdu-panda-base-or-dujiangyan-panda-valley",
    reservationIds: ["chengdu-panda-base"],
    // The guide's photo is a panda sculpture; the card shows live pandas.
    image: {
      src: "/images/sights/chengdu-panda-base-1200.webp",
      width: 1200,
      height: 800,
      alt: {
        en: "Two giant pandas resting on a wooden climbing frame among trees",
        zh: "两只大熊猫在林间的木架上休息",
        ko: "나무 사이 목재 구조물 위에서 쉬고 있는 판다 두 마리",
      },
    },
    tourSlugs: ["chengdu-pandas-sanxingdui-5-day-private-tour", "chengdu-chongqing-8-day-private-tour", "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"],
    ready: false,
  },
  {
    id: "sanxingdui",
    city: "chengdu",
    guideId: "sanxingdui-museum-booking-and-gallery-order",
    reservationIds: ["sanxingdui-museum"],
    tourSlugs: ["chengdu-pandas-sanxingdui-5-day-private-tour"],
    photoCredit: {
      author: "STW932",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:New_Sandingdui_Museum_02.jpg",
    },
    ready: false,
  },
  {
    id: "leshan-giant-buddha",
    city: "chengdu",
    // A day out from Chengdu; its tickets are in the guide, not the booking service.
    guideId: "leshan-giant-buddha-land-or-boat-visit",
    reservationIds: [],
    tourSlugs: ["chengdu-chongqing-8-day-private-tour"],
    ready: false,
  },
  {
    id: "hongyadong",
    city: "chongqing",
    reservationIds: [],
    image: {
      src: "/images/sights/hongyadong-1200.webp",
      width: 1200,
      height: 800,
      alt: {
        en: "Hongyadong's stilt-house-style tiers lit up at night above a busy street",
        zh: "夜里亮灯的洪崖洞吊脚楼式建筑，楼前车流不断",
        ko: "밤에 불이 켜진 홍야동의 조각루 양식 건물과 앞길의 차량 불빛",
      },
    },
    tourSlugs: ["beijing-xian-yangtze-cruise-shanghai-12-day-private-tour", "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour"],
    ready: false,
  },
  {
    id: "wulong",
    city: "chongqing",
    reservationIds: [],
    image: {
      src: "/images/destinations/chongqing/wulong-1200.webp",
      width: 1200,
      height: 800,
      alt: {
        en: "Limestone cliffs of the Three Natural Bridges at Wulong",
        zh: "武隆天生三桥的石灰岩峭壁",
        ko: "우롱 천생삼교의 석회암 절벽",
      },
    },
    tourSlugs: ["chongqing-wulong-5-day-private-tour", "chengdu-chongqing-8-day-private-tour"],
    ready: false,
  },
  {
    id: "dazu-rock-carvings",
    city: "chongqing",
    reservationIds: [],
    image: {
      src: "/images/sights/dazu-rock-carvings-1200.webp",
      width: 1200,
      height: 800,
      alt: {
        en: "A carved Buddha among the painted cliff carvings at Dazu",
        zh: "大足石刻中的一尊佛像和周围的彩绘摩崖造像",
        ko: "대족석각의 불상과 채색 마애 조각",
      },
    },
    tourSlugs: ["chengdu-chongqing-8-day-private-tour"],
    ready: false,
  },
  {
    id: "li-river",
    city: "guilin",
    guideId: "li-river-cruise-tickets-piers-booking",
    reservationIds: ["li-river-cruise"],
    tourSlugs: ["guilin-yangshuo-5-day-private-tour", "beijing-xian-guilin-shanghai-10-day-private-tour", "beijing-xian-guilin-hong-kong-10-day-private-tour"],
    ready: false,
  },
  {
    id: "jade-dragon-snow-mountain",
    city: "lijiang",
    guideId: "jade-dragon-snow-mountain-cable-car-booking",
    reservationIds: ["jade-dragon-snow-mountain"],
    tourSlugs: ["beijing-xian-yunnan-14-day-private-tour"],
    photoCredit: {
      author: "钉钉",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Jade_Dragon_Snow_Mountain,_Yunnan.jpg",
    },
    ready: false,
  },
  {
    id: "zhangjiajie-forest-park",
    city: "zhangjiajie",
    guideId: "zhangjiajie-national-forest-park-tickets-and-entrances",
    // Not in the reservation service: the park's own ticket rules live in the guide.
    reservationIds: [],
    tourSlugs: ["zhangjiajie-forest-4-day-private-tour", "zhangjiajie-furong-fenghuang-7-day-private-tour", "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour"],
    photoCredit: {
      author: "Kuruman",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Zhangjiajie_National_Forest_Park.jpg",
    },
    ready: false,
  },
  {
    id: "tianmen-mountain",
    city: "zhangjiajie",
    // Tickets and routes are in the guide, not the booking service.
    guideId: "tianmen-mountain-tickets-and-routes",
    reservationIds: [],
    tourSlugs: ["zhangjiajie-4-day-private-tour", "zhangjiajie-forest-4-day-private-tour", "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour"],
    ready: false,
  },
  {
    id: "zhangjiajie-grand-canyon",
    city: "zhangjiajie",
    // The guide's own photo is of a person, so the canyon floor stands in.
    guideId: "zhangjiajie-glass-bridge-vs-skywalk",
    reservationIds: [],
    image: {
      src: "/images/sights/zhangjiajie-grand-canyon-1200.webp",
      width: 1200,
      height: 800,
      alt: {
        en: "A jade-green stream and a wooden walkway on the floor of the Zhangjiajie Grand Canyon",
        zh: "张家界大峡谷谷底的碧绿溪流和木栈道",
        ko: "장가계 대협곡 바닥의 옥빛 계곡물과 나무 데크길",
      },
    },
    tourSlugs: ["zhangjiajie-4-day-private-tour"],
    ready: false,
  },
  {
    id: "chen-clan-hall",
    city: "guangzhou",
    reservationIds: [],
    image: {
      src: "/images/destinations/guangzhou/hero-1600.webp",
      width: 1600,
      height: 1000,
      alt: {
        en: "The carved roof ridges of the Chen Clan Ancestral Hall in Guangzhou",
        zh: "广州陈家祠屋顶上的雕饰屋脊",
        ko: "광저우 진가사 지붕 위의 조각 장식",
      },
      credit: {
        author: "Shujianyang",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Chen_Clan_Ancestral_Hall_2025.06_01.jpg",
      },
    },
    tourSlugs: [],
    ready: false,
  },
  {
    id: "canton-tower",
    city: "guangzhou",
    reservationIds: [],
    image: {
      src: "/images/tours/guangzhou-shunde-foshan-5-day-private-tour/hero.webp",
      width: 1589,
      height: 1600,
      alt: {
        en: "Canton Tower lit up at night above the Pearl River",
        zh: "夜里亮灯的广州塔和珠江",
        ko: "밤에 불이 켜진 광저우 타워와 주강",
      },
      credit: {
        author: "Daniel Lu (User:dllu)",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Canton_Tower_at_night_Guangzhou_2024_dllu.jpg",
      },
    },
    tourSlugs: ["guangzhou-shunde-foshan-5-day-private-tour"],
    ready: false,
  },
  {
    id: "shamian",
    city: "guangzhou",
    reservationIds: [],
    image: {
      src: "/images/destinations/guangzhou/shamian-1200.webp",
      width: 1200,
      height: 750,
      alt: {
        en: "A colonial-era building under banyan trees on Shamian Island",
        zh: "沙面岛榕树下的老洋楼",
        ko: "사면도 반얀나무 아래의 근대 건물",
      },
      credit: {
        author: "xiquinhosilva",
        license: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Shamian_Island_03111-Guangzhou_(32831146512).jpg",
      },
    },
    tourSlugs: ["guangzhou-shunde-foshan-5-day-private-tour"],
    ready: false,
  },
];

/**
 * Cities close enough to visit together. A sight whose city has no other
 * sight shows these neighbours instead (Shanghai, Suzhou and Hangzhou are an
 * hour or so apart by train); elsewhere it shows the best-known sights.
 */
export const sightNeighbours: Partial<Record<SightCityId, readonly SightCityId[]>> = {
  shanghai: ["suzhou", "hangzhou"],
  suzhou: ["shanghai", "hangzhou"],
  hangzhou: ["shanghai", "suzhou"],
};

export const sightHighlights: readonly SightId[] = ["great-wall", "forbidden-city", "terracotta-warriors"];

export function sightPath(id: SightId, locale: HomegroundLocale) {
  return `${sightsPath[locale]}${id}/`;
}

export function sightPaths(id: SightId): Record<HomegroundLocale, string> {
  return { en: sightPath(id, "en"), zh: sightPath(id, "zh"), ko: sightPath(id, "ko") };
}

export function getSight(id: string): Sight | undefined {
  return sights.find((sight) => sight.id === id);
}

export function isSightId(value: string): value is SightId {
  return sightIds.some((id) => id === value);
}
