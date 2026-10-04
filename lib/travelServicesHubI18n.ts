import type { HomegroundLocale } from "./homegroundI18n";

export interface TravelServiceCardCopy {
  id: "tours" | "guides" | "reservations" | "support";
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
      "Browse published private tours, or tell us your dates, group and the arrangements you need. We confirm what can be provided and the trip quotation before booking.",
    cards: [
      { id: "tours", eyebrow: "Published journeys", title: "Compare private tours", body: "Open real day-by-day routes with public starting prices, inclusions and booking boundaries.", action: "Compare private tours" },
      { id: "guides", eyebrow: "Help for selected days", title: "Private English-speaking Guides", body: "Shanghai, Beijing, Xi'an and Zhangjiajie: compare rates for one English-speaking guide for an 8-hour day. Group size, route and transport are confirmed separately.", action: "See guide services and rates" },
      { id: "reservations", eyebrow: "Timed, real-name entry", title: "Attraction reservations", body: "Beijing, Shanghai, Suzhou, Hangzhou, Xi'an, Chengdu, Guilin and Lijiang: we book through official channels in your own passport name for a {fee} service fee per person per attraction, plus the ticket price.", action: "See attraction reservations" },
      { id: "support", eyebrow: "The trip also needs delivery", title: "Full Trip Planning & Ground Support", body: "Connect planning with the local hotels, tickets, transfers and on-the-ground arrangements the journey needs.", action: "See full-trip support" },
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
      "你可以比较已发布的私家团，或告诉我们日期、同行人数和需要的具体安排。可提供的服务与旅行报价会在预订前确认。",
    cards: [
      { id: "tours", eyebrow: "已发布路线", title: "比较私家团", body: "查看真实逐日路线、公开起价、包含项和预订边界，再判断是否适合自己的日期。", action: "比较私家团" },
      { id: "guides", eyebrow: "只在需要的日子安排协助", title: "私人英文导游", body: "上海、北京、西安、张家界：查看一位英文导游每天 8 小时的城市报价；人数、路线与交通另行确认。", action: "查看导游服务与报价" },
      { id: "reservations", eyebrow: "实名分时入场", title: "景点代预约", body: "北京、上海、苏州、杭州、西安、成都、桂林、丽江：通过官方渠道、以你本人护照实名预约，服务费每人每个景点 {fee}，门票另按官方原价。", action: "查看景点代预约" },
      { id: "support", eyebrow: "还需要本地执行", title: "全程规划与落地支持", body: "把路线与酒店、门票、接送及现场安排连接起来，并在开始前写清责任范围。", action: "查看全程支持" },
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
      "공개된 프라이빗 투어를 비교하거나 날짜, 인원과 필요한 준비를 알려 주세요. 제공 가능한 서비스와 여행 견적은 예약 전에 확인합니다.",
    cards: [
      { id: "tours", eyebrow: "공개된 여정", title: "프라이빗 투어 비교", body: "실제 일자별 동선, 공개 시작가, 포함 사항과 예약 조건을 확인하세요.", action: "프라이빗 투어 비교" },
      { id: "guides", eyebrow: "필요한 날의 현지 도움", title: "프라이빗 한국어 가이드", body: "상하이·베이징·시안·장가계에서 한국어 가이드 1명, 하루 8시간 기준 요금을 확인하세요. 인원, 동선과 교통은 별도로 확인합니다.", action: "가이드 서비스와 요금 보기" },
      { id: "reservations", eyebrow: "시간 지정 실명 입장", title: "관광지 예약 대행", body: "베이징·상하이·쑤저우·항저우·시안·청두·계림·리장: 공식 채널에서 본인 여권 실명으로 예약하며, 수수료는 관광지당 1인 {fee}이고 입장료는 공식 가격 그대로 별도입니다.", action: "관광지 예약 대행 보기" },
      { id: "support", eyebrow: "현지 진행도 필요해요", title: "전체 여행 설계 및 현지 지원", body: "일정과 숙소, 티켓, 이동 및 현지 준비를 연결하고 시작 전에 책임 범위를 명확히 합니다.", action: "전체 여행 지원 보기" },
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
