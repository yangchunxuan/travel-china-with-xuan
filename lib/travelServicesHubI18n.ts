import type { HomegroundLocale } from "./homegroundI18n";

export interface TravelServiceCardCopy {
  id: "tours" | "review" | "build" | "support";
  eyebrow: string;
  title: string;
  body: string;
  action: string;
}

const copies = {
  en: {
    breadcrumb: "Breadcrumb",
    choicesEyebrow: "Start with what you already have",
    choicesTitle: "Choose the kind of help, not a vague service category.",
    choicesBody:
      "A published tour suits travellers who want a ready foundation. Route review and route build are written planning services. Full-trip support is for the journey that also needs local delivery.",
    cards: [
      { id: "tours", eyebrow: "Published journeys", title: "Compare private tours", body: "Open real day-by-day routes with public starting prices, inclusions and booking boundaries.", action: "Compare private tours" },
      { id: "review", eyebrow: "You already have a route", title: "Route review", body: "Stress-test the city order, pace, transfers and weak days in an itinerary you already drafted.", action: "See route review" },
      { id: "build", eyebrow: "You have dates and priorities", title: "Route build", body: "Turn a rough brief into a usable written route before hotels and non-refundable transport lock it in.", action: "See route build" },
      { id: "support", eyebrow: "The trip also needs delivery", title: "Full-trip support", body: "Connect planning with the local hotels, tickets, transfers and on-the-ground arrangements the journey needs.", action: "See full-trip support" },
    ] satisfies readonly TravelServiceCardCopy[],
    methodEyebrow: "How decisions are made",
    methodTitle: "Understand the method before asking for help.",
    methodBody:
      "Homeground explains what can stay self-planned, what must be checked again and what we would be responsible for before any paid work begins.",
    methodAction: "See how Homeground plans",
    adviceAction: "Solve a travel question first",
  },
  zh: {
    breadcrumb: "当前位置",
    choicesEyebrow: "从你已经有的内容开始",
    choicesTitle: "选择真正需要的协助，不必先理解内部服务分类。",
    choicesBody:
      "想从成熟路线开始，可以比较已发布私家团；已经有路线，可做路线审核；只有日期和重点，可选择路线规划；还需要本地执行时，再看全程支持。",
    cards: [
      { id: "tours", eyebrow: "已发布路线", title: "比较私家团", body: "查看真实逐日路线、公开起价、包含项和预订边界，再判断是否适合自己的日期。", action: "比较私家团" },
      { id: "review", eyebrow: "已经有一份路线", title: "路线审核", body: "检查现有行程的城市顺序、节奏、转场和最容易出问题的旅行日。", action: "查看路线审核" },
      { id: "build", eyebrow: "已经有日期和重点", title: "路线规划", body: "在酒店和不可退交通锁定之前，把一份简要需求整理成真正可用的书面路线。", action: "查看路线规划" },
      { id: "support", eyebrow: "还需要本地执行", title: "全程旅行支持", body: "把路线与酒店、门票、接送及现场安排连接起来，并在开始前写清责任范围。", action: "查看全程支持" },
    ] satisfies readonly TravelServiceCardCopy[],
    methodEyebrow: "我们如何判断",
    methodTitle: "需要协助之前，先看懂我们的规划方法。",
    methodBody:
      "Homeground 会说明哪些可以继续自己安排、哪些必须再次核实，以及付费工作开始前我们会承担什么。",
    methodAction: "了解 Homeground 如何规划",
    adviceAction: "先解决一个旅行问题",
  },
  ko: {
    breadcrumb: "현재 위치",
    choicesEyebrow: "이미 준비한 것에서 시작하세요",
    choicesTitle: "모호한 서비스 분류보다 필요한 도움을 선택하세요.",
    choicesBody:
      "완성된 기본 동선이 필요하면 공개 투어를 비교하고, 기존 일정이 있으면 검토를, 날짜와 우선순위만 있다면 동선 설계를 선택하세요. 현지 진행까지 필요할 때 전체 여행 지원을 확인하면 됩니다.",
    cards: [
      { id: "tours", eyebrow: "공개된 여정", title: "프라이빗 투어 비교", body: "실제 일자별 동선, 공개 시작가, 포함 사항과 예약 조건을 확인하세요.", action: "프라이빗 투어 비교" },
      { id: "review", eyebrow: "이미 일정이 있어요", title: "일정 검토", body: "작성한 일정의 도시 순서, 속도, 이동과 가장 취약한 날을 점검합니다.", action: "일정 검토 보기" },
      { id: "build", eyebrow: "날짜와 우선순위가 있어요", title: "동선 설계", body: "호텔과 환불 불가 교통을 확정하기 전에 간단한 요청을 실제로 쓸 수 있는 서면 동선으로 만듭니다.", action: "동선 설계 보기" },
      { id: "support", eyebrow: "현지 진행도 필요해요", title: "전체 여행 지원", body: "일정과 숙소, 티켓, 이동 및 현지 준비를 연결하고 시작 전에 책임 범위를 명확히 합니다.", action: "전체 여행 지원 보기" },
    ] satisfies readonly TravelServiceCardCopy[],
    methodEyebrow: "판단 방식",
    methodTitle: "도움을 요청하기 전에 계획 방식을 확인하세요.",
    methodBody:
      "Homeground는 직접 준비해도 되는 부분, 다시 확인할 부분과 유료 업무 시작 전에 맡을 책임을 분명히 설명합니다.",
    methodAction: "Homeground의 여행 설계 방식 보기",
    adviceAction: "여행 질문부터 해결하기",
  },
} as const;

export function getTravelServicesHubCopy(locale: HomegroundLocale) {
  return copies[locale];
}
