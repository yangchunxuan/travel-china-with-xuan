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
          "A common first route links Beijing, Xi'an and Shanghai, then adds Guilin, Chengdu, Zhangjiajie or a Yangtze cruise as the days allow. They are sorted by length below; a \"Small-Group Tour\" runs on fixed dates with other travellers.",
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
            "Compare Northeast winter private tours through Harbin, Yabuli, Snow Town, Mohe, Changbai Mountain and Yanji. Check each route's departure dates and winter conditions.",
        },
        name: "This Season",
        h1Lines: ["This winter:", "the Northeast."],
        lede:
          "Choose from Harbin's ice sights, skiing near Yabuli or Changbai Mountain, Snow Town, and sleeper-train journeys toward Mohe. Each route page lists its own dates, group prices and winter conditions.",
        groups: { "winter-northeast": { title: "Winter in the Northeast" } },
      },
    },
  },
  zh: {
    facts: (routes, min, max) => (min === max ? `${routes} 条路线 · ${min} 天` : `${routes} 条路线 · ${min}–${max} 天`),
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
          "常见的走法是先串起北京、西安、上海，再按天数加上桂林、成都、张家界或长江游轮。下面按天数排好；名称里写着“小团”的，是固定日期出发、和其他客人同行的团。",
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
          description: "比较哈尔滨、亚布力、雪乡、漠河、长白山和延吉的冬季私家路线；出发日期、人数价格及冬季条件见各路线页。",
        },
        name: "当季推荐",
        h1Lines: ["今年冬天，", "去东北。"],
        lede: "想看哈尔滨冰雪、到亚布力或长白山滑雪、住雪乡，或乘卧铺去漠河，可以从下面的路线挑。每条的适用日期、人数价格和冬季条件都写在详情页。",
        groups: { "winter-northeast": { title: "冬季东北" } },
      },
    },
  },
  ko: {
    facts: (routes, min, max) => (min === max ? `일정 ${routes}개 · ${min}일` : `일정 ${routes}개 · ${min}~${max}일`),
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
          "기본은 베이징·시안·상하이를 잇는 코스이고, 기간에 따라 계림·청두·장가계나 장강 크루즈를 더합니다. 아래에 기간별로 정리했으며, 이름에 '소규모 그룹'이 붙은 상품은 정해진 날짜에 다른 여행자와 함께 출발합니다.",
        groups: {
          "up-to-10": { title: "10일 이내", note: "세 도시, 또는 세 도시에 계림을 더한 일정. 가장 짧은 건 6일 충칭·삼협 크루즈입니다." },
          "11-to-14": { title: "11~14일", note: "도시마다 더 머물거나, 장가계·계림·윈난·황산 같은 지역을 한두 곳 더합니다." },
          "15-plus": { title: "15일 이상", note: "실크로드, 장강 크루즈, 또는 북에서 남까지 크게 한 바퀴." },
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
          title: "이번 시즌 추천: 겨울 동북 프라이빗 투어, 하얼빈과 백두산(창바이산)",
          description: "하얼빈·야부리·설향·모허·백두산·연길의 겨울 프라이빗 일정을 비교해 보세요. 출발 기간과 인원별 요금은 각 상세 페이지에서 확인할 수 있습니다.",
        },
        name: "이번 시즌 추천",
        h1Lines: ["올겨울엔,", "동북으로."],
        lede: "하얼빈 빙설 명소, 야부리 또는 백두산 스키, 설향 숙박, 모허로 가는 침대열차 일정 중 골라 보세요. 각 상품의 적용 기간과 인원별 요금, 겨울 운영 조건은 상세 페이지에 있습니다.",
        groups: { "winter-northeast": { title: "겨울 동북" } },
      },
    },
  },
};

export function getTourCollectionsCopy(locale: HomegroundLocale): TourCollectionsCopy {
  return copy[locale];
}
