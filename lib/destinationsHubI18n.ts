import type { HomegroundLocale } from "./homegroundI18n";
import type { DestinationHubId } from "./destinationHubs";

interface DestinationComparison {
  bestFor: string;
  stay: string;
  routeRole: string;
}

interface DestinationsHubCopy {
  breadcrumbLabel: string;
  homeLabel: string;
  currentLabel: string;
  cityEyebrow: string;
  cityTitle: string;
  cityIntroduction: (count: number) => string;
  cityCount: (count: number) => string;
  bestForLabel: string;
  stayLabel: string;
  routeRoleLabel: string;
  cityComparisons: Readonly<Record<DestinationHubId, DestinationComparison>>;
  openCity: string;
  winterGuideLabel: string;
  winterGuidePath: string;
  scaleEyebrow: string;
  scaleTitle: string;
  scaleIntroduction: string;
  openScale: string;
  handoffEyebrow: string;
  handoffTitle: string;
  handoffBody: string;
  guidesAction: string;
  toursAction: string;
}

const copies: Record<HomegroundLocale, DestinationsHubCopy> = {
  en: {
    breadcrumbLabel: "Breadcrumb",
    homeLabel: "Home",
    currentLabel: "Destinations",
    cityEyebrow: "City guides",
    cityTitle: "Compare eight cities before you build the route.",
    cityIntroduction: (count) =>
      `Use these ${count} city guides to compare fit, time and route role. Open one for stay areas, arrival points, major sights and sensible next stops.`,
    cityCount: (count) => `${count} published city guides`,
    bestForLabel: "Best for",
    stayLabel: "Allow",
    routeRoleLabel: "Route role",
    cityComparisons: {
      beijing: {
        bestFor: "A first trip, imperial history and the Great Wall",
        stay: "4–5 nights",
        routeRole: "Northern gateway; a natural start before Xi’an or a southbound route",
      },
      shanghai: {
        bestFor: "Modern China, neighbourhoods and the Yangtze Delta",
        stay: "3 complete city days",
        routeRole: "International gateway and a practical start or finish",
      },
      xian: {
        bestFor: "Ancient capitals, the Terracotta Warriors and the city wall",
        stay: "3 nights; 4 with Mount Hua",
        routeRole: "A compact history stop between north China and the southwest",
      },
      chengdu: {
        bestFor: "Pandas, Sichuan food and a slower city base",
        stay: "2–3 city nights; longer for Sichuan extensions",
        routeRole: "Southwest base for trips deeper into Sichuan",
      },
      guangzhou: {
        bestFor: "Cantonese food, Lingnan culture and a working southern city",
        stay: "2–3 nights",
        routeRole: "Southern gateway for the Pearl River Delta",
      },
      hangzhou: {
        bestFor: "West Lake, tea landscapes and an easy change of pace",
        stay: "A day trip or 2 nights",
        routeRole: "A natural extension from Shanghai rather than a rushed add-on",
      },
      zhangjiajie: {
        bestFor: "Sandstone peaks, forest walks and mountain scenery",
        stay: "3 complete sightseeing days",
        routeRole: "A mountain segment that needs its own full days and base",
      },
      chongqing: {
        bestFor: "A steep megacity, night views and bold regional food",
        stay: "3 nights",
        routeRole: "Southwest gateway; keep Wulong as a separate extension",
      },
    },
    openCity: "Open city guide",
    winterGuideLabel: "Travelling in December, January or February? Compare winter destinations.",
    winterGuidePath: "/guides/china-in-winter/",
    scaleEyebrow: "Browse by place type",
    scaleTitle: "Look beyond the city name.",
    scaleIntroduction:
      "Use these place indexes when the question is geographic: which region, which kind of city, or which sight and landscape belongs in the route.",
    openScale: "Browse places",
    handoffEyebrow: "A different kind of question?",
    handoffTitle: "Use Travel Advice when you need an answer, not a place.",
    handoffBody:
      "Entry rules, payments, transport, hotel decisions and travel timing belong in the searchable advice library. Published itineraries belong in Private Tours.",
    guidesAction: "Open Travel Advice",
    toursAction: "Compare Private Tours",
  },
  zh: {
    breadcrumbLabel: "当前位置",
    homeLabel: "首页",
    currentLabel: "目的地",
    cityEyebrow: "城市入口",
    cityTitle: "比较八座城市，再决定整条路线。",
    cityIntroduction: (count) =>
      `先用这 ${count} 个城市指南比较适合谁、留多久和路线作用；进入城市页后再看住宿区域、进出门户、主要景点与下一站。`,
    cityCount: (count) => `已发布 ${count} 个城市指南`,
    bestForLabel: "更适合",
    stayLabel: "建议停留",
    routeRoleLabel: "路线作用",
    cityComparisons: {
      beijing: {
        bestFor: "第一次来中国、帝都历史与长城",
        stay: "4—5 晚",
        routeRole: "北方门户，适合作为西安或南下路线的起点",
      },
      shanghai: {
        bestFor: "现代中国、城市街区与长三角",
        stay: "3 个完整城市游览日",
        routeRole: "国际门户，适合作为整趟旅行的起点或终点",
      },
      xian: {
        bestFor: "古都历史、兵马俑与城墙",
        stay: "3 晚；加入华山则 4 晚",
        routeRole: "连接华北与西南的紧凑历史城市",
      },
      chengdu: {
        bestFor: "熊猫、川菜与节奏较慢的城市生活",
        stay: "市区 2—3 晚；延伸到四川其他地区则需更久",
        routeRole: "深入四川不同方向的西南基地",
      },
      guangzhou: {
        bestFor: "粤菜、岭南文化与真实的南方城市生活",
        stay: "2—3 晚",
        routeRole: "珠江三角洲的南方门户",
      },
      hangzhou: {
        bestFor: "西湖、茶园与更轻松的旅行节奏",
        stay: "当日往返或住 2 晚",
        routeRole: "适合从上海延伸，不要塞成匆忙的顺带一站",
      },
      zhangjiajie: {
        bestFor: "砂岩峰林、森林徒步与山岳风景",
        stay: "3 个完整游览日",
        routeRole: "需要独立完整游览日与住宿基地的山岳段落",
      },
      chongqing: {
        bestFor: "立体山城、夜景与鲜明的地方饮食",
        stay: "3 晚",
        routeRole: "西南门户；武隆应作为独立延伸安排",
      },
    },
    openCity: "打开城市指南",
    winterGuideLabel: "12 月、1 月或 2 月出发？比较适合冬季的目的地。",
    winterGuidePath: "/zh/guides/china-in-winter/",
    scaleEyebrow: "按地点类型浏览",
    scaleTitle: "城市名称之外，还可以按地理层级寻找。",
    scaleIntroduction:
      "当你的问题是“哪个地区、哪类城市或哪处景观应该进入路线”时，再使用下面三个地点索引。",
    openScale: "浏览地点",
    handoffEyebrow: "如果你问的不是地点",
    handoffTitle: "需要解决旅行问题时，请进入实用指南。",
    handoffBody:
      "入境、支付、交通、住宿选择和出行时间属于可搜索的实用指南；已经上线的完整路线属于私家团。",
    guidesAction: "打开实用指南",
    toursAction: "比较私家团",
  },
  ko: {
    breadcrumbLabel: "현재 위치",
    homeLabel: "홈",
    currentLabel: "여행지",
    cityEyebrow: "도시 가이드",
    cityTitle: "여덟 도시를 비교한 뒤 전체 동선을 정하세요.",
    cityIntroduction: (count) =>
      `${count}개 도시 가이드에서 여행 성향, 체류 기간과 동선 역할을 먼저 비교하세요. 각 도시 페이지에서 숙소 지역, 관문, 주요 명소와 다음 여행지를 확인할 수 있습니다.`,
    cityCount: (count) => `공개 도시 가이드 ${count}개`,
    bestForLabel: "추천 여행",
    stayLabel: "권장 체류",
    routeRoleLabel: "동선 역할",
    cityComparisons: {
      beijing: {
        bestFor: "첫 중국 여행, 황실 역사와 만리장성",
        stay: "4–5박",
        routeRole: "북부 관문이자 시안 또는 남행 동선의 자연스러운 시작",
      },
      shanghai: {
        bestFor: "현대 중국, 도시의 여러 동네와 장강 삼각주",
        stay: "온전한 도시 관광 3일",
        routeRole: "국제 관문이자 여행을 시작하거나 마치기 좋은 도시",
      },
      xian: {
        bestFor: "고대 수도, 병마용과 성벽",
        stay: "3박, 화산 포함 시 4박",
        routeRole: "화북과 서남부 사이에 넣기 좋은 역사 도시",
      },
      chengdu: {
        bestFor: "판다, 쓰촨 음식과 여유로운 도시 생활",
        stay: "도심 2–3박, 쓰촨 확장 시 더 길게",
        routeRole: "쓰촨 각 지역으로 이어지는 서남부 거점",
      },
      guangzhou: {
        bestFor: "광둥 음식, 링난 문화와 실제 남부 도시 생활",
        stay: "2–3박",
        routeRole: "주강 삼각주의 남부 관문",
      },
      hangzhou: {
        bestFor: "시후, 차밭과 한결 느긋한 여행",
        stay: "당일치기 또는 2박",
        routeRole: "상하이와 자연스럽게 연결되지만, 짧게 끼워 넣기보다 충분한 시간을 둘 곳",
      },
      zhangjiajie: {
        bestFor: "사암 봉우리, 숲길과 산악 풍경",
        stay: "온전한 관광 3일",
        routeRole: "온전한 일정과 숙박 거점이 따로 필요한 산악 구간",
      },
      chongqing: {
        bestFor: "입체적인 산악 도시, 야경과 강한 지역 음식",
        stay: "3박",
        routeRole: "서남부 관문, 우룽은 별도 확장 일정으로 구성",
      },
    },
    openCity: "도시 가이드 열기",
    winterGuideLabel: "12월, 1월 또는 2월 여행인가요? 겨울 여행지를 비교하세요.",
    winterGuidePath: "/ko/guides/china-in-winter/",
    scaleEyebrow: "장소 유형별 탐색",
    scaleTitle: "도시 이름 너머의 지리 관계를 살펴보세요.",
    scaleIntroduction:
      "어느 지역, 어떤 도시 유형, 어떤 명소와 풍경을 동선에 넣을지 고민할 때 아래 여행지 목록을 사용하세요.",
    openScale: "장소 둘러보기",
    handoffEyebrow: "장소가 아닌 질문이 있나요?",
    handoffTitle: "답이 필요할 때는 실용 가이드를 이용하세요.",
    handoffBody:
      "입국, 결제, 교통, 숙소 선택과 여행 시기는 검색 가능한 실용 가이드에서, 공개된 완성 일정은 프라이빗 투어에서 확인할 수 있습니다.",
    guidesAction: "실용 가이드 열기",
    toursAction: "프라이빗 투어 비교",
  },
};

export function getDestinationsHubCopy(
  locale: HomegroundLocale = "en",
): DestinationsHubCopy {
  return copies[locale];
}
