import type { HomegroundLocale } from "./homegroundI18n";
import type { TourCollectionId } from "./tourCollections";

interface TourCollectionCopy {
  metadata: { title: string; description: string };
  name: string;
  /** The H1, in phrases that are never split. */
  h1Lines: readonly string[];
  lede: string;
  /** Group titles and notes by group id (region groups take the catalogue's region names). */
  groups: Readonly<Record<string, { title?: string; note?: string }>>;
}

export interface TourCollectionsCopy {
  /** The hero eyebrow, from the data. */
  facts: (routes: number, minDays: number, maxDays: number) => string;
  /** The tag on a fixed-departure small group. */
  smallGroup: string;
  /** Under a group heading: how many routes and how long. */
  groupMeta: (routes: number, minDays: number, maxDays: number) => string;
  servicesTitle: string;
  servicesLede: string;
  /** Above the links to the other collections and the full list. */
  otherWays: string;
  collections: Readonly<Record<TourCollectionId, TourCollectionCopy>>;
}

const copy: Record<HomegroundLocale, TourCollectionsCopy> = {
  en: {
    facts: (routes, min, max) => (min === max ? `${routes} routes · ${min} days` : `${routes} routes · ${min}–${max} days`),
    smallGroup: "Small group",
    groupMeta: (routes, min, max) => `${routes} ${routes === 1 ? "route" : "routes"} · ${min === max ? min : `${min}–${max}`} days`,
    otherWays: "Browse another way",
    servicesTitle: "No route fits?",
    servicesLede: "Tell us your days and cities and we'll plan the trip around you. Or book just attraction tickets, or just a guide.",
    collections: {
      "multi-city": {
        metadata: {
          title: "China Multi-City Private Tours: Classic Routes by Length",
          description:
            "Private routes through several cities, grouped by length: up to 10 days, 11 to 14 days, 15 days or more, plus a few fixed-date small groups. Each has a published itinerary and price.",
        },
        name: "Multi-City Classics",
        h1Lines: ["Multi-city classics:", "several cities in one trip."],
        lede:
          "A common first route links Beijing, Xi'an and Shanghai, then adds Guilin, Chengdu, Zhangjiajie or a Yangtze cruise as the days allow. They are sorted by length below; those marked \"Small group\" run on fixed dates with other travellers.",
        groups: {
          "up-to-10": { title: "Up to 10 days", note: "Three cities, or three plus Guilin; the shortest is a 6-day Chongqing and Three Gorges cruise." },
          "11-to-14": { title: "11 to 14 days", note: "More nights per stop, or one or two more regions: Zhangjiajie, Guilin, Yunnan or Huangshan." },
          "15-plus": { title: "15 days or more", note: "The Silk Road, a Yangtze cruise, or a long loop from north to south." },
        },
      },
      regions: {
        metadata: {
          title: "China Single-Region Private Tours: East, Southwest, South and More",
          description:
            "Private routes that stay in one region of China, from East China to the Southwest, the South, the North and Northwest, the Northeast and Central China. Each has a published itinerary and price.",
        },
        name: "One Region at a Time",
        h1Lines: ["One region,", "at an easy pace."],
        lede:
          "Rather not change cities every two days? Pick one region. They are sorted by region below; take one on its own, or before or after a multi-city route.",
        groups: {},
      },
      seasonal: {
        metadata: {
          title: "This Season: Winter in Northeast China, Private Tours",
          description:
            "Winter in the Northeast: Harbin's ice and snow, Changbai Mountain and Yanji. Dates and peak-period conditions are on each tour page.",
        },
        name: "This Season",
        h1Lines: ["This winter:", "the Northeast."],
        lede:
          "Two winter routes in the Northeast: Harbin for ice and snow, or Changbai Mountain and Yanji. Opening dates for the ice and snow sights, and peak-period conditions, are on each tour page.",
        groups: { "winter-northeast": { title: "Winter in the Northeast" } },
      },
    },
  },
  zh: {
    facts: (routes, min, max) => (min === max ? `${routes} 条路线 · ${min} 天` : `${routes} 条路线 · ${min}–${max} 天`),
    smallGroup: "小团",
    groupMeta: (routes, min, max) => `${routes} 条 · ${min === max ? min : `${min}–${max}`} 天`,
    otherWays: "换个方式挑",
    servicesTitle: "没有合适的路线？",
    servicesLede: "告诉我们天数和想去的城市，我们按你的情况安排整趟旅行；也可以只请我们代约景点，或只请导游。",
    collections: {
      "multi-city": {
        metadata: {
          title: "中国多城私家团：北京、西安、上海等经典组合，按天数挑",
          description:
            "一趟走好几座城的私家路线，按天数分组：10 天以内、11 到 14 天、15 天以上；也有几条固定出发的小团。每条都有公开的行程和价格。",
        },
        name: "多城经典线",
        h1Lines: ["多城经典线，", "一趟走好几座城。"],
        lede:
          "常见的走法是先串起北京、西安、上海，再按天数加上桂林、成都、张家界或长江游轮。下面按天数排好；标了“小团”的，是固定日期出发、和其他客人同行的团。",
        groups: {
          "up-to-10": { title: "10 天以内", note: "三座城市，或三城加桂林山水；最短的是 6 天重庆三峡游轮。" },
          "11-to-14": { title: "11 到 14 天", note: "每一站多住几晚，或者再加张家界、桂林、云南、黄山等一两个地区。" },
          "15-plus": { title: "15 天以上", note: "丝绸之路、长江游轮，或者从北到南走一大圈。" },
        },
      },
      regions: {
        metadata: {
          title: "中国单地区私家团：华东、西南、华南等，一个地区慢慢玩",
          description:
            "不想赶路，就只玩一个地区：华东、西南、华南、华北与西北、东北、华中，每个地区都有现成的私家路线和公开的价格。",
        },
        name: "一个地区慢慢玩",
        h1Lines: ["一个地区，", "慢慢玩。"],
        lede:
          "不想每两天换一座城，就只选一个地区。下面按地区排好，可以单独走，也可以接在多城路线的前后。",
        groups: {},
      },
      seasonal: {
        metadata: {
          title: "当季推荐：冬季东北私家团，哈尔滨冰雪与长白山",
          description: "冬天去东北：哈尔滨的冰雪，再到长白山和延吉。具体日期和高峰期条件写在各自的路线页上。",
        },
        name: "当季推荐",
        h1Lines: ["今年冬天，", "去东北。"],
        lede: "冬天去东北，有两条线：哈尔滨看冰雪，或者去长白山玩雪、逛延吉。冰雪项目的开放日期和高峰期条件，以各自路线页写明的为准。",
        groups: { "winter-northeast": { title: "冬季东北" } },
      },
    },
  },
  ko: {
    facts: (routes, min, max) => (min === max ? `일정 ${routes}개 · ${min}일` : `일정 ${routes}개 · ${min}~${max}일`),
    smallGroup: "소그룹",
    groupMeta: (routes, min, max) => `${routes}개 · ${min === max ? min : `${min}~${max}`}일`,
    otherWays: "다른 방식으로 보기",
    servicesTitle: "맞는 일정이 없나요?",
    servicesLede: "여행 기간과 가고 싶은 도시를 알려 주시면 일행에 맞춰 전체 일정을 짜 드립니다. 관광지 예약만, 또는 가이드만 맡기셔도 됩니다.",
    collections: {
      "multi-city": {
        metadata: {
          title: "중국 여러 도시 프라이빗 투어: 기간별 클래식 코스",
          description:
            "여러 도시를 잇는 프라이빗 일정을 기간별로 모았습니다: 10일 이내, 11~14일, 15일 이상. 출발일이 정해진 소그룹도 있습니다. 일정마다 상세 일정표와 가격을 공개합니다.",
        },
        name: "여러 도시 일주",
        h1Lines: ["여러 도시 일주,", "한 번에 여러 도시를."],
        lede:
          "기본은 베이징·시안·상하이를 잇는 코스이고, 기간에 따라 계림·청두·장가계나 양쯔강 크루즈를 더합니다. 아래에 기간별로 정리했으며, '소그룹' 표시는 정해진 날짜에 다른 여행자와 함께 출발하는 상품입니다.",
        groups: {
          "up-to-10": { title: "10일 이내", note: "세 도시, 또는 세 도시에 계림을 더한 일정. 가장 짧은 건 6일 충칭·삼협 크루즈입니다." },
          "11-to-14": { title: "11~14일", note: "도시마다 더 머물거나, 장가계·계림·윈난·황산 같은 지역을 한두 곳 더합니다." },
          "15-plus": { title: "15일 이상", note: "실크로드, 양쯔강 크루즈, 또는 북에서 남까지 크게 한 바퀴." },
        },
      },
      regions: {
        metadata: {
          title: "중국 한 지역 프라이빗 투어: 동부·서남부·남부 등",
          description:
            "이동을 줄이고 한 지역만 깊이 보는 프라이빗 일정. 동부, 서남부, 남부, 북부와 서북부, 동북부, 중부별로 모았으며 일정마다 가격을 공개합니다.",
        },
        name: "한 지역 깊이 보기",
        h1Lines: ["한 지역을,", "여유 있게."],
        lede:
          "이틀마다 도시를 옮기고 싶지 않다면 한 지역만 고르세요. 아래에 지역별로 정리했으며, 단독으로 다녀오거나 여러 도시 일정 앞뒤에 붙이기 좋습니다.",
        groups: {},
      },
      seasonal: {
        metadata: {
          title: "이번 시즌 추천: 겨울 동북 프라이빗 투어, 하얼빈과 창바이산",
          description: "겨울 동북으로: 하얼빈의 얼음과 눈, 그리고 창바이산과 옌지. 날짜와 성수기 조건은 각 투어 페이지에 있습니다.",
        },
        name: "이번 시즌 추천",
        h1Lines: ["올겨울엔,", "동북으로."],
        lede: "겨울 동북 일정은 두 가지입니다. 하얼빈에서 빙설을 보거나, 창바이산에서 눈을 즐기고 옌지를 둘러봅니다. 빙설 명소 운영 날짜와 성수기 조건은 각 투어 페이지를 따릅니다.",
        groups: { "winter-northeast": { title: "겨울 동북" } },
      },
    },
  },
};

export function getTourCollectionsCopy(locale: HomegroundLocale): TourCollectionsCopy {
  return copy[locale];
}
