import type { DestinationHubId } from "./destinationHubs";
import type { HomegroundLocale } from "./homegroundI18n";
import type { TravelInspirationThemeId } from "./travelInspiration";

interface TravelInspirationThemeCopy {
  metadata: { title: string; description: string };
  /** The theme's name on cards and in the breadcrumb. */
  name: string;
  /** One line on the hub card. */
  teaser: string;
  imageAlt: string;
  /** The H1, in phrases that are never split. */
  h1Lines: readonly string[];
  lede: string;
  groups: Readonly<Record<string, { title: string; note: string }>>;
  citiesTitle: string;
  citiesLede: string;
  servicesTitle: string;
  servicesLede: string;
}

export interface TravelInspirationCopy {
  home: string;
  /** The way in from the city index (/explore/), which also serves phones whose menu hides the row. */
  fromCities: { lead: string; label: string };
  breadcrumb: string;
  hub: {
    metadata: { title: string; description: string };
    h1: string;
    lede: string;
    themesTitle: string;
    themeAction: string;
    routeCount: (count: number) => string;
    citiesTitle: string;
    citiesLede: string;
    allCities: string;
    ctaTitle: string;
    ctaBody: string;
    allTours: string;
  };
  theme: {
    /** The hero's eyebrow: what the page holds, from the data. */
    facts: (routes: number, minDays: number, maxDays: number) => string;
    jumpToRoutes: string;
    routesTitle: string;
    days: (days: number) => string;
    tourAction: string;
    /** Fills a route row that is not full: the way to a trip planned around you. */
    planTile: { title: string; body: string; action: string };
  };
  /** What a city is for, in one line (its own page says how to plan it). */
  cities: Readonly<Record<DestinationHubId, string>>;
  themes: Readonly<Record<TravelInspirationThemeId, TravelInspirationThemeCopy>>;
}

const copy: Record<HomegroundLocale, TravelInspirationCopy> = {
  en: {
    home: "Home",
    fromCities: { lead: "Or start from a theme:", label: "Travel Inspiration" },
    breadcrumb: "Breadcrumb",
    hub: {
      metadata: {
        title: "China Travel Inspiration: Trip Ideas by Theme",
        description:
          "Trip ideas for China by theme, each with ready-made private routes, plus what each of eight cities is best for.",
      },
      h1: "Travel Inspiration",
      lede: "Not sure where to start? Pick a theme: each comes with ready-made routes. Or start from a city.",
      themesTitle: "By theme",
      themeAction: "See the routes",
      routeCount: (count) => `${count} routes`,
      citiesTitle: "By city",
      citiesLede: "One line on each city. Open one to see how to plan your days there.",
      allCities: "Compare cities",
      ctaTitle: "No theme fits?",
      ctaBody: "Tell us where you want to go and for how long, and we will plan the whole trip around you.",
      allTours: "All private tours",
    },
    theme: {
      facts: (routes, min, max) => `${routes} private routes · ${min}–${max} days`,
      jumpToRoutes: "See the routes",
      routesTitle: "Routes by trip length",
      days: (days) => `${days} days`,
      tourAction: "Itinerary & price",
      planTile: {
        title: "None of these?",
        body: "Tell us your days and cities, and we'll plan the trip around you.",
        action: "Plan it with us",
      },
    },
    cities: {
      beijing: "Great Wall, Forbidden City and hutongs",
      shanghai: "The Bund, old lanes and an easy trip to Suzhou",
      xian: "Terracotta Warriors, city wall, Muslim Quarter",
      chengdu: "Pandas, teahouses and Sichuan food",
      guangzhou: "Dim sum mornings, arcaded old streets and the Pearl River",
      hangzhou: "West Lake and the Longjing tea hills",
      zhangjiajie: "Sandstone pillar forests and Tianmen Mountain",
      chongqing: "A hillside city, hotpot and the Yangtze",
    },
    themes: {
      "first-time-in-china": {
        metadata: {
          title: "First Trip to China: Private Routes by Trip Length",
          description:
            "Planning a first trip to China? Start with how long you have: Beijing, Xi'an and Shanghai in a week, Guilin's Li River in ten days, a Yangtze cruise in twelve days, pandas in two weeks. Each route has a published itinerary and price.",
        },
        name: "First time in China",
        teaser: "Ready-made private routes for a first trip, sorted by how long you have.",
        imageAlt: "A restored Great Wall section on mountain ridges north of Beijing",
        h1Lines: ["First time in China?", "How long do you have?"],
        lede:
          "The Great Wall, the Terracotta Warriors and Shanghai's Bund are what most first-time visitors come for. Below are ready-made private routes by trip length, each with its itinerary and price on its own page.",
        groups: {
          week: {
            title: "About a week",
            note: "The classic is Beijing, Xi'an and Shanghai. To stay in one region, take Shanghai with Suzhou and Hangzhou, or Beijing on its own.",
          },
          "ten-days": {
            title: "About ten days",
            note: "Add Guilin's Li River to the three cities, or swap Shanghai for Hong Kong and fly home from there.",
          },
          "two-weeks": {
            title: "12 days to two weeks",
            note: "More nights in each city, or add a Yangtze cruise or Chengdu's pandas.",
          },
        },
        citiesTitle: "Cities on these routes",
        citiesLede: "Want to see what one city is like before you choose a route?",
        servicesTitle: "Other cities, or a different length?",
        servicesLede:
          "If no route fits, we can plan one around you. Or book just attraction tickets, or just a guide.",
      },
    },
  },
  zh: {
    home: "首页",
    fromCities: { lead: "也可以按主题找：", label: "旅行灵感" },
    breadcrumb: "面包屑导航",
    hub: {
      metadata: {
        title: "中国旅行灵感：按主题找玩法",
        description: "按主题找中国旅行灵感，每个主题都配好现成的私家路线；也可以按城市，一句话看懂 8 座城市各自怎么玩。",
      },
      h1: "旅行灵感",
      lede: "不知道从哪开始？先挑一个主题，每个主题都有现成路线；也可以先按城市看。",
      themesTitle: "按主题",
      themeAction: "看路线",
      routeCount: (count) => `${count} 条路线`,
      citiesTitle: "按城市",
      citiesLede: "每座城市一句话，点进去看怎么安排。",
      allCities: "比较各城市",
      ctaTitle: "没有合适的主题？",
      ctaBody: "告诉我们你想去哪、玩几天，我们按你的情况安排整趟旅行。",
      allTours: "全部私家团",
    },
    theme: {
      facts: (routes, min, max) => `${routes} 条私家路线 · ${min}–${max} 天`,
      jumpToRoutes: "看路线",
      routesTitle: "按天数挑路线",
      days: (days) => `${days} 天`,
      tourAction: "看行程与价格",
      planTile: {
        title: "都不太合适？",
        body: "告诉我们天数和想去的城市，我们按你的情况安排整趟旅行。",
        action: "交给我们安排",
      },
    },
    cities: {
      beijing: "长城、故宫和胡同",
      shanghai: "外滩、老弄堂，还能顺路去苏州",
      xian: "兵马俑、城墙和回民街",
      chengdu: "大熊猫、茶馆和川菜",
      guangzhou: "早茶、骑楼老街和珠江",
      hangzhou: "西湖和龙井茶园",
      zhangjiajie: "砂岩峰林和天门山",
      chongqing: "山城、火锅和长江",
    },
    themes: {
      "first-time-in-china": {
        metadata: {
          title: "第一次来中国怎么玩：按天数挑一条私家路线",
          description:
            "第一次来中国，先看你有几天：一周走北京、西安、上海，十天加上桂林漓江，12 天可加长江游轮，两周再加成都大熊猫。每条路线都有公开的行程和价格。",
        },
        name: "第一次来中国",
        teaser: "第一次来中国的现成私家路线，按天数排好。",
        imageAlt: "北京北郊山脊上修复过的一段长城",
        h1Lines: ["第一次来中国，", "先看你有几天。"],
        lede:
          "第一次来中国，大多数人想看的是长城、兵马俑和上海外滩。下面按天数排好了现成路线，都是只接待你们一行人的私家团，行程和价格见各自的路线页。",
        groups: {
          week: {
            title: "一周左右",
            note: "最经典的是北京、西安、上海三城；只想深玩一个片区，就选沪苏杭或北京。",
          },
          "ten-days": {
            title: "十天左右",
            note: "三城再加桂林漓江山水；或者不去上海，改从香港离境。",
          },
          "two-weeks": {
            title: "12 天到两周",
            note: "三座城市各多住几天，或者加长江游轮、成都大熊猫。",
          },
        },
        citiesTitle: "这些路线经过的城市",
        citiesLede: "想先看看一座城市怎么玩，再决定路线？",
        servicesTitle: "想换城市，或者改天数？",
        servicesLede: "现成路线不合适，就交给我们按你的情况重新安排；也可以只请我们代约景点，或只请导游。",
      },
    },
  },
  ko: {
    home: "홈",
    fromCities: { lead: "어디 갈지 막막하다면", label: "테마 여행" },
    breadcrumb: "현재 위치",
    hub: {
      metadata: {
        title: "중국 테마 여행: 주제별 추천 일정",
        description: "주제별로 고르는 중국 프라이빗 투어 추천 일정과 8개 도시의 여행 포인트를 한눈에 소개합니다.",
      },
      h1: "테마 여행",
      lede: "어디부터 가야 할지 막막하다면 테마부터 골라 보세요. 테마마다 추천 일정을 묶어 두었습니다. 도시부터 보셔도 좋습니다.",
      themesTitle: "테마별",
      themeAction: "일정 보기",
      routeCount: (count) => `일정 ${count}개`,
      citiesTitle: "도시별",
      citiesLede: "도시별 핵심을 한 줄로 정리했습니다. 누르면 도시별 일정 팁을 볼 수 있습니다.",
      allCities: "도시 비교하기",
      ctaTitle: "원하는 테마가 없나요?",
      ctaBody: "가고 싶은 곳과 여행 기간만 알려 주세요. 일행에 맞춰 전체 일정을 짜 드립니다.",
      allTours: "프라이빗 투어 전체 보기",
    },
    theme: {
      facts: (routes, min, max) => `프라이빗 일정 ${routes}개 · ${min}~${max}일`,
      jumpToRoutes: "일정 보기",
      routesTitle: "기간별 일정",
      days: (days) => `${days}일`,
      tourAction: "일정·가격 보기",
      planTile: {
        title: "고르기 어려우신가요?",
        body: "여행 기간과 가고 싶은 도시만 알려 주세요. 일행에 맞춰 일정을 짜 드립니다.",
        action: "맞춤 일정 문의",
      },
    },
    cities: {
      beijing: "만리장성·자금성·후퉁 골목",
      shanghai: "와이탄·옛 골목, 근교 쑤저우까지",
      xian: "병마용·성벽·회민거리",
      chengdu: "판다·찻집·쓰촨 요리",
      guangzhou: "아침 딤섬·옛 상가 거리·주장강",
      hangzhou: "서호와 룽징 차밭",
      zhangjiajie: "원가계 기암 봉우리와 천문산",
      chongqing: "입체 도시·훠궈·양쯔강",
    },
    themes: {
      "first-time-in-china": {
        metadata: {
          title: "첫 중국 여행 일정: 여행 기간별 프라이빗 투어",
          description:
            "중국이 처음이라면 여행 기간부터 정하세요. 일주일이면 베이징·시안·상하이, 열흘이면 계림 이강, 12일이면 양쯔강 크루즈, 2주면 청두 판다까지. 일정마다 상세 일정표와 가격을 공개합니다.",
        },
        name: "첫 중국 여행",
        teaser: "첫 중국 여행에 맞는 프라이빗 일정을 여행 기간별로 모았습니다.",
        imageAlt: "베이징 북부 산등성이의 복원된 만리장성 구간",
        h1Lines: ["중국이 처음이라면,", "여행 기간부터 정하세요."],
        lede:
          "만리장성, 병마용, 상하이 와이탄은 첫 중국 여행에서 가장 많이 찾는 곳입니다. 아래에 여행 기간별로 바로 고를 수 있는 일정을 모았습니다. 모두 우리 일행만 다니는 프라이빗 투어이며, 자세한 일정과 가격은 각 상품 페이지에서 확인하세요.",
        groups: {
          week: {
            title: "일주일 안팎",
            note: "정석은 베이징·시안·상하이 3개 도시입니다. 한 지역만 깊게 보려면 상하이·쑤저우·항저우나 베이징 일정을 고르세요.",
          },
          "ten-days": {
            title: "열흘 안팎",
            note: "세 도시에 계림 이강을 더한 일정과, 상하이 대신 홍콩에서 귀국하는 일정이 있습니다.",
          },
          "two-weeks": {
            title: "12일~2주",
            note: "세 도시에 더 오래 머물거나, 양쯔강 크루즈나 청두 판다를 더합니다.",
          },
        },
        citiesTitle: "위 일정에 포함된 도시",
        citiesLede: "일정을 고르기 전에 도시부터 살펴보세요.",
        servicesTitle: "다른 도시나 기간을 원하시나요?",
        servicesLede: "원하는 일정이 없다면 일행에 맞춰 새로 짜 드립니다. 관광지 예약만, 또는 가이드만 맡기셔도 됩니다.",
      },
    },
  },
};

export function getTravelInspirationCopy(locale: HomegroundLocale): TravelInspirationCopy {
  return copy[locale];
}
