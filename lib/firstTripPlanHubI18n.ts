import type { HomegroundLocale } from "./homegroundI18n";

export const firstTripPlanStepIds = [
  "entry",
  "payments-connectivity",
  "cities-nights",
  "route-shape",
  "transport",
  "stay",
  "tickets",
  "buffers",
] as const;

export type FirstTripPlanStepId = (typeof firstTripPlanStepIds)[number];

export const firstTripPlanOwnerPaths = {
  entry: "/essentials/entry-transit/",
  payment: "/guides/how-to-pay-in-china-as-a-tourist/",
  connectivity: "/guides/china-esim-vs-local-sim/",
  cities: "/explore/",
  tripLength: "/plan/trip-length-city-order/",
  routeShape: "/guides/china-hub-and-spoke-or-multi-base-route/",
  openJaw: "/guides/china-open-jaw-flights-route-planning/",
  transport: "/transport/",
  highSpeedRail: "/guides/china-high-speed-train-first-time-guide/",
  stay: "/stay/",
  hotelNearMetro: "/guides/china-hotel-near-metro/",
  tickets: "/guides/official-or-reseller-china-tickets/",
  arrivalBuffer:
    "/guides/china-arrival-day-booked-anchor-or-flexible-block/",
  departureBuffer:
    "/guides/china-last-night-before-international-flight/",
  paceDiagnostic: "/guides/is-your-china-itinerary-too-rushed/",
  humanReview: "/china-itinerary-review/",
} as const;

export type FirstTripPlanOwnerId = keyof typeof firstTripPlanOwnerPaths;

interface FirstTripPlanLinkCopy {
  ownerId: FirstTripPlanOwnerId;
  label: string;
}

interface FirstTripPlanStepCopy {
  id: FirstTripPlanStepId;
  title: string;
  task: string;
  doneWhen: string;
  links: readonly FirstTripPlanLinkCopy[];
}

interface FirstTripPlanBoundaryCopy {
  title: string;
  description: string;
  currentLabel: string;
  items: readonly {
    title: string;
    description: string;
    ownerId?: "paceDiagnostic" | "humanReview";
    linkLabel?: string;
  }[];
}

export interface FirstTripPlanHubCopy {
  eyebrow: string;
  title: string;
  titleNoWrap?: string;
  introduction: string;
  doneLabel: string;
  steps: readonly FirstTripPlanStepCopy[];
  boundary: FirstTripPlanBoundaryCopy;
}

const copies: Record<HomegroundLocale, FirstTripPlanHubCopy> = {
  en: {
    eyebrow: "First-trip decision sequence",
    title: "Build the trip in the right order.",
    introduction:
      "Start with constraints, then choose places and bookings. Each step sends you to the existing Homeground page that owns that decision, so you do not have to assemble a first China trip from disconnected search results.",
    doneLabel: "Move on when",
    steps: [
      {
        id: "entry",
        title: "Confirm how you can enter",
        task:
          "Check the passport, purpose, route and length of stay before buying a non-refundable journey.",
        doneWhen:
          "You know which entry route applies and which details still need an official recheck before departure.",
        links: [{ ownerId: "entry", label: "Start with China entry requirements" }],
      },
      {
        id: "payments-connectivity",
        title: "Prepare payment and connectivity",
        task:
          "Choose a primary and backup way to pay, then decide whether data-only eSIM access, a Chinese number or both fit the trip.",
        doneWhen:
          "Your phone is compatible, essential accounts are set up and one failure does not stop the day.",
        links: [
          { ownerId: "payment", label: "Set up tourist payments" },
          { ownerId: "connectivity", label: "Compare eSIM and local SIM" },
        ],
      },
      {
        id: "cities-nights",
        title: "Choose cities and usable nights",
        task:
          "Pick places by what you want to experience, then count complete days rather than treating every hotel night as a sightseeing day.",
        doneWhen:
          "Every city has a reason to stay and enough usable time to justify another hotel base.",
        links: [
          { ownerId: "cities", label: "Compare destination hubs" },
          { ownerId: "tripLength", label: "Browse trip-length and city-order guides" },
        ],
      },
      {
        id: "route-shape",
        title: "Set the route shape",
        task:
          "Decide the city order, whether to use one base or several and whether arriving and leaving from different gateways removes backtracking.",
        doneWhen:
          "The route has a clear beginning, end and direction without an avoidable return journey.",
        links: [
          { ownerId: "routeShape", label: "Compare one hub with multiple bases" },
          { ownerId: "openJaw", label: "Check an open-jaw flight structure" },
        ],
      },
      {
        id: "transport",
        title: "Price the whole transfer day",
        task:
          "Compare airports, stations and city pairs door to door, including baggage, station access and the last leg to the hotel.",
        doneWhen:
          "Each intercity move has a realistic door-to-door block and a workable booking method.",
        links: [
          { ownerId: "transport", label: "Open the China transport index" },
          { ownerId: "highSpeedRail", label: "Learn the first high-speed rail journey" },
        ],
      },
      {
        id: "stay",
        title: "Choose the area before the hotel",
        task:
          "Select a base that fits the daily route, station or airport—not simply the room with the lowest displayed price.",
        doneWhen:
          "You can explain why the area reduces friction and have checked any foreign-guest uncertainty directly with the property.",
        links: [
          { ownerId: "stay", label: "Compare where to stay" },
          { ownerId: "hotelNearMetro", label: "Test whether a hotel is really near the metro" },
        ],
      },
      {
        id: "tickets",
        title: "Book fixed tickets in dependency order",
        task:
          "Identify reservations that can make or break a day, then verify the official channel, passport details and release window before using a reseller.",
        doneWhen:
          "The hardest fixed booking is secured before flexible activities are placed around it.",
        links: [{ ownerId: "tickets", label: "Choose official ticketing or a reseller" }],
      },
      {
        id: "buffers",
        title: "Protect the arrival and departure edges",
        task:
          "Keep the arrival day recoverable and protect the final international departure from a fragile same-day connection.",
        doneWhen:
          "A delay, slow immigration or missed local connection does not destroy the trip's most important booking.",
        links: [
          { ownerId: "arrivalBuffer", label: "Plan the first day with a flexible block" },
          { ownerId: "departureBuffer", label: "Protect the last international-flight night" },
        ],
      },
    ],
    boundary: {
      title: "Choose the right planning page",
      description:
        "These pages are connected, but they do different jobs. This hub stays informational and does not duplicate the diagnostic or paid service.",
      currentLabel: "You are here",
      items: [
        {
          title: "First Trip to China Planner",
          description:
            "Use this page to build a first trip from constraints to bookings in a sensible order.",
        },
        {
          title: "Itinerary pace diagnostic",
          description:
            "Use the existing diagnostic when a day-by-day route already exists and you need to test whether it is too rushed.",
          ownerId: "paceDiagnostic",
          linkLabel: "Check the route's pace",
        },
        {
          title: "Human itinerary review",
          description:
            "Use the paid service when you want a person to review or build the route with a clearly defined scope.",
          ownerId: "humanReview",
          linkLabel: "See review and route-planning services",
        },
      ],
    },
  },
  zh: {
    eyebrow: "第一次中国旅行的决策顺序",
    title: "按正确顺序，一步步规划好行程。",
    titleNoWrap: "一步步",
    introduction:
      "先确认限制条件，再选择城市并安排预订。每一步都会带你进入 Homeground 现有的对应页面，不必再从零散的搜索结果中拼凑第一次来中国的完整行程。",
    doneLabel: "满足这个条件再进入下一步",
    steps: [
      {
        id: "entry",
        title: "确认如何入境",
        task: "预订不可退改的机票或火车票前，先核对护照、来华目的、路线和停留时间。",
        doneWhen: "你知道适用的入境路径，也知道出发前还有哪些细节必须向官方再次核实。",
        links: [{ ownerId: "entry", label: "先查看中国入境要求" }],
      },
      {
        id: "payments-connectivity",
        title: "准备支付和网络",
        task: "准备主要与备用支付方式，再判断只要数据的 eSIM、中国手机号，还是两者都需要。",
        doneWhen: "手机兼容、必要账户已设置，而且一种方式失效时不会让当天行程停摆。",
        links: [
          { ownerId: "payment", label: "设置游客支付方式" },
          { ownerId: "connectivity", label: "比较 eSIM 与本地 SIM" },
        ],
      },
      {
        id: "cities-nights",
        title: "选择城市和真正可用的晚数",
        task: "按想体验的内容选择城市，并计算完整游玩日，不要把每一晚酒店都算成观光日。",
        doneWhen: "每个城市都有明确的停留理由，也有足够时间支撑新增一个住宿基地。",
        links: [
          { ownerId: "cities", label: "比较目的地 Hub" },
          { ownerId: "tripLength", label: "查看天数与城市顺序指南" },
        ],
      },
      {
        id: "route-shape",
        title: "确定路线结构",
        task: "确定城市顺序、单一基地或多基地，并判断不同城市进出是否能减少折返。",
        doneWhen: "路线有明确起点、终点和前进方向，不再包含可以避免的回头路。",
        links: [
          { ownerId: "routeShape", label: "比较单一 Hub 与多基地" },
          { ownerId: "openJaw", label: "检查开口程机票结构" },
        ],
      },
      {
        id: "transport",
        title: "计算完整转场日",
        task: "按门到门比较机场、车站和城市间路线，把行李、进站和前往酒店的最后一段都算进去。",
        doneWhen: "每次跨城移动都有现实的门到门时间，也有可执行的购票方法。",
        links: [
          { ownerId: "transport", label: "打开中国交通索引" },
          { ownerId: "highSpeedRail", label: "准备第一次乘坐高铁" },
        ],
      },
      {
        id: "stay",
        title: "先选区域，再选酒店",
        task: "按每天的路线、车站或机场选择住宿基地，不只看显示价格最低的房间。",
        doneWhen: "你能说明这个区域如何减少麻烦，也已经直接向酒店核实外宾入住的不确定事项。",
        links: [
          { ownerId: "stay", label: "比较住在哪里" },
          { ownerId: "hotelNearMetro", label: "判断酒店是否真的靠近地铁" },
        ],
      },
      {
        id: "tickets",
        title: "按依赖顺序预订固定门票",
        task: "先找出会决定当天成败的预约，再核实官方渠道、护照信息和放票时间，然后才考虑代订平台。",
        doneWhen: "最难取得的固定预约已经落实，弹性活动再围绕它安排。",
        links: [{ ownerId: "tickets", label: "选择官方票务或代订平台" }],
      },
      {
        id: "buffers",
        title: "保护抵达日和离境日",
        task: "让抵达日可以恢复调整，并避免用脆弱的同日转场连接国际离境航班。",
        doneWhen: "延误、入境变慢或错过本地接驳，都不会毁掉全程最重要的预订。",
        links: [
          { ownerId: "arrivalBuffer", label: "用弹性区块安排第一天" },
          { ownerId: "departureBuffer", label: "保护国际航班前最后一晚" },
        ],
      },
    ],
    boundary: {
      title: "选择真正适合的规划页面",
      description: "这些页面彼此相连，但职责不同。本页只做信息型规划，不复制节奏诊断或付费服务。",
      currentLabel: "你正在这里",
      items: [
        {
          title: "第一次中国旅行规划",
          description: "用本页从限制条件到预订，按合理顺序搭建第一次中国行程。",
        },
        {
          title: "行程节奏诊断",
          description: "已有逐日路线，需要判断是否太赶时，进入现有诊断指南。",
          ownerId: "paceDiagnostic",
          linkLabel: "检查路线节奏",
        },
        {
          title: "真人行程审核",
          description: "希望真人在明确服务范围内审核或设计路线时，进入付费服务页。",
          ownerId: "humanReview",
          linkLabel: "查看审核与路线设计服务",
        },
      ],
    },
  },
  ko: {
    eyebrow: "첫 중국 여행 의사결정 순서",
    title: "올바른 순서로 첫 일정을 완성하세요.",
    introduction:
      "먼저 제약 조건을 해결한 뒤 도시와 예약을 선택하세요. 각 단계는 해당 결정을 맡고 있는 기존 Homeground 페이지로 이어지므로, 흩어진 검색 결과를 직접 조립할 필요가 없습니다.",
    doneLabel: "다음 단계로 넘어갈 기준",
    steps: [
      {
        id: "entry",
        title: "입국 방법 확인",
        task: "환불 불가 교통편을 사기 전에 여권, 방문 목적, 이동 경로와 체류 기간을 확인하세요.",
        doneWhen: "적용되는 입국 경로와 출발 전 공식 채널에서 다시 확인할 사항을 알고 있습니다.",
        links: [{ ownerId: "entry", label: "중국 입국 요건부터 확인" }],
      },
      {
        id: "payments-connectivity",
        title: "결제와 통신 준비",
        task: "주 결제 수단과 예비 수단을 준비하고, 데이터 eSIM·중국 번호·두 가지 모두 중 무엇이 필요한지 정하세요.",
        doneWhen: "휴대전화 호환성과 필수 계정 설정을 마쳤고 한 가지 수단이 실패해도 하루 일정이 멈추지 않습니다.",
        links: [
          { ownerId: "payment", label: "여행자 결제 설정" },
          { ownerId: "connectivity", label: "eSIM과 현지 SIM 비교" },
        ],
      },
      {
        id: "cities-nights",
        title: "도시와 실제 사용 가능한 숙박일 선택",
        task: "원하는 경험으로 도시를 고르고, 모든 숙박일을 관광일로 보지 말고 온전한 여행일을 계산하세요.",
        doneWhen: "각 도시를 머무는 이유가 분명하고 숙소 거점을 하나 더 둘 만큼 충분한 시간이 있습니다.",
        links: [
          { ownerId: "cities", label: "도시 허브 비교" },
          { ownerId: "tripLength", label: "여행 기간·도시 순서 가이드 보기" },
        ],
      },
      {
        id: "route-shape",
        title: "동선 구조 결정",
        task: "도시 순서, 단일 거점과 다중 거점, 서로 다른 도시로 입출국해 되돌아가는 이동을 줄일지 결정하세요.",
        doneWhen: "불필요한 왕복 없이 여행의 시작, 끝과 이동 방향이 분명합니다.",
        links: [
          { ownerId: "routeShape", label: "단일 허브와 다중 거점 비교" },
          { ownerId: "openJaw", label: "오픈조 항공 구조 확인" },
        ],
      },
      {
        id: "transport",
        title: "이동일 전체 시간 계산",
        task: "수하물, 역 접근, 호텔까지 마지막 구간을 포함해 공항·기차역·도시 간 이동을 문에서 문까지 비교하세요.",
        doneWhen: "모든 도시 간 이동에 현실적인 전체 시간과 실행 가능한 예약 방법이 있습니다.",
        links: [
          { ownerId: "transport", label: "중국 교통 안내 열기" },
          { ownerId: "highSpeedRail", label: "첫 고속철도 이용 준비" },
        ],
      },
      {
        id: "stay",
        title: "호텔보다 지역을 먼저 선택",
        task: "표시 가격이 가장 싼 객실보다 매일의 동선, 역 또는 공항에 맞는 숙박 거점을 고르세요.",
        doneWhen: "그 지역이 이동 부담을 줄이는 이유를 설명할 수 있고 외국인 투숙 관련 불확실성을 숙소에 직접 확인했습니다.",
        links: [
          { ownerId: "stay", label: "숙박 지역 비교" },
          { ownerId: "hotelNearMetro", label: "호텔이 실제로 지하철역과 가까운지 확인" },
        ],
      },
      {
        id: "tickets",
        title: "의존 순서대로 고정 티켓 예약",
        task: "하루의 성패를 좌우하는 예약을 찾고, 공식 채널·여권 정보·판매 시작 시점을 확인한 뒤 리셀러를 검토하세요.",
        doneWhen: "가장 어려운 고정 예약을 먼저 확보하고 유동적인 활동은 그 주변에 배치했습니다.",
        links: [{ ownerId: "tickets", label: "공식 티켓과 리셀러 선택" }],
      },
      {
        id: "buffers",
        title: "도착일과 출국일 보호",
        task: "도착일은 회복 가능하게 두고, 불안정한 당일 연결로 국제선 출국을 위험하게 만들지 마세요.",
        doneWhen: "지연, 느린 입국 심사나 현지 연결편 실패가 여행의 가장 중요한 예약을 망치지 않습니다.",
        links: [
          { ownerId: "arrivalBuffer", label: "첫날에 유동 블록 두기" },
          { ownerId: "departureBuffer", label: "국제선 전 마지막 밤 보호" },
        ],
      },
    ],
    boundary: {
      title: "목적에 맞는 일정 페이지 선택",
      description: "세 페이지는 연결되어 있지만 역할이 다릅니다. 이 허브는 정보 안내만 맡고 진단이나 유료 서비스를 복제하지 않습니다.",
      currentLabel: "현재 페이지",
      items: [
        {
          title: "첫 중국 여행 플래너",
          description: "이 페이지에서 제약 조건부터 예약까지 합리적인 순서로 첫 여행을 설계하세요.",
        },
        {
          title: "일정 속도 진단",
          description: "이미 일자별 동선이 있고 너무 빠듯한지 확인하려면 기존 진단 가이드를 이용하세요.",
          ownerId: "paceDiagnostic",
          linkLabel: "일정 속도 확인",
        },
        {
          title: "전문가 일정 검토",
          description: "명확한 범위 안에서 사람이 동선을 검토하거나 설계하기를 원할 때 유료 서비스를 이용하세요.",
          ownerId: "humanReview",
          linkLabel: "검토·동선 설계 서비스 보기",
        },
      ],
    },
  },
};

export function getFirstTripPlanHubCopy(locale: HomegroundLocale) {
  return copies[locale];
}

export function getFirstTripPlanOwnerPath(
  ownerId: FirstTripPlanOwnerId,
  locale: HomegroundLocale,
) {
  const path = firstTripPlanOwnerPaths[ownerId];
  return locale === "en" ? path : `/${locale}${path}`;
}
