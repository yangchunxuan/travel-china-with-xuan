import type { HomegroundLocale } from "./homegroundI18n";
import type { DestinationPlan } from "./destinationPlanner";
import type { RouteServiceId } from "./routeServiceInterest";

export const homepagePlanningIntentIds = [
  "itinerary-review",
  "route-build",
  "full-trip-support",
  "explore",
] as const;

export type HomepagePlanningIntentId =
  (typeof homepagePlanningIntentIds)[number];

export type PlanningQuestionKey =
  | "destinations"
  | "nights"
  | "party"
  | "pace";

export interface HomepagePlanningIntentOption {
  id: HomepagePlanningIntentId;
  kind: "paid" | "free";
  statement: string;
  label: string;
  priceLabel: string;
  summary: string;
  scope: string;
}

export interface PlanningQuestionContextCopy {
  introTitle: string;
  introBody: string;
  titles: Record<PlanningQuestionKey, string>;
  completeLabel: string;
}

export interface PaidBriefReadyCopy {
  kicker: string;
  title: string;
  body: string;
  noPayment: string;
  scopeLabel: string;
  scope: string;
  deliverablesLabel: string;
  deliverables: readonly string[];
  nextLabel: string;
  nextSteps: readonly string[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  successBackLabel: string;
}

export interface HomepagePlanningDeskCopy {
  eyebrow: string;
  title: string;
  intro: string;
  options: readonly HomepagePlanningIntentOption[];
  continue: string;
  keepCurrent: string;
  requiredError: string;
  selectedLabel: string;
  change: string;
  boundary: string;
  changeWarning: string;
  selectedAnnouncement: (label: string) => string;
  outsideStandardScope: {
    priceLabel: string;
    briefBody: string;
    scopeLabel: string;
    scope: string;
    note: (label: string) => string;
  };
  freeUpgrade: {
    eyebrow: string;
    title: string;
    body: string;
    optionLabel: string;
  };
  questionContexts: Record<
    HomepagePlanningIntentId,
    PlanningQuestionContextCopy
  >;
  paidBriefs: Record<RouteServiceId, PaidBriefReadyCopy>;
}

const standardScopeEn =
  "Up to 10 travel days · up to 4 overnight bases · one shared route for 1–4 travellers";
const standardScopeZh =
  "最多 10 个旅行日 · 最多 4 个过夜住宿地 · 1–4 位同行者共用一条路线";
const standardScopeKo =
  "여행일 최대 10일 · 숙박 거점 최대 4곳 · 1–4명이 함께 이용하는 하나의 동선";

export function routeNeedsScopeConfirmation(
  _match: DestinationPlan,
  serviceId: RouteServiceId,
): boolean {
  return serviceId !== "full-trip-support";
}

const en: HomepagePlanningDeskCopy = {
  eyebrow: "Homeground planning desk",
  title: "What do you have so far?",
  intro:
    "Choose the sentence closest to where your China trip stands. You can change the path without re-entering the shared trip details.",
  options: [
    {
      id: "itinerary-review",
      kind: "paid",
      statement: "I already have a usable day-by-day route.",
      label: "Review My Route",
      priceLabel: "US$69 per trip",
      summary:
        "A human second opinion on pace, transfers, hotel moves and fragile days.",
      scope: `Standard scope · ${standardScopeEn}`,
    },
    {
      id: "route-build",
      kind: "paid",
      statement: "I have dates and priorities, but no usable route.",
      label: "Build My Route",
      priceLabel: "US$129 per trip",
      summary:
        "A workable city order, night allocation and route structure before detailed booking.",
      scope: `Standard scope · ${standardScopeEn}`,
    },
    {
      id: "full-trip-support",
      kind: "paid",
      statement:
        "I want help with the full trip, including selected arrangements or local coordination.",
      label: "Full Trip Planning & Ground Support",
      priceLabel: "Custom quote",
      summary:
        "A written scope built around the planning and delivery you want Homeground to handle.",
      scope: "Scope and quote depend on the actual trip.",
    },
    {
      id: "explore",
      kind: "free",
      statement: "I’m still exploring.",
      label: "Free route timing check",
      priceLabel: "Free",
      summary:
        "Compare your wishlist with the nights you have. No contact details required.",
      scope: "Automated first check · no human route review",
    },
  ],
  continue: "Continue with this path",
  keepCurrent: "Keep my current path",
  requiredError: "Choose the option closest to your current trip stage.",
  selectedLabel: "Selected planning path",
  change: "Change",
  boundary:
    "This first brief is free. No payment or file upload happens here. For paid services, Homeground confirms fit, scope and delivery timing before emailing payment instructions.",
  changeWarning:
    "Changing the service will clear the service-specific route note you entered. Your shared trip answers and contact details will stay. Continue?",
  selectedAnnouncement: (label) =>
    `${label} selected. You can continue with the trip brief.`,
  outsideStandardScope: {
    priceLabel: "Scope & price to confirm",
    briefBody:
      "The advertised fixed price applies only after Homeground confirms the standard scope. These four shared answers do not confirm every scope limit, so no fixed price or payment has been confirmed.",
    scopeLabel: "Standard-scope fit needs human confirmation",
    scope:
      "Homeground will confirm the travel-day count, overnight bases and traveller count by email. If the trip fits the published standard scope, the advertised fixed price applies; otherwise we simplify it or quote separately.",
    note: (label) =>
      `Requested service: ${label}. Standard-scope fit and the applicable price must be confirmed before payment.`,
  },
  freeUpgrade: {
    eyebrow: "Want human help next?",
    title: "Continue with the part of the route you want us to solve.",
    body:
      "Your free timing check stays available. Choose a paid path only if you want a human review, a new route structure or help across the full trip.",
    optionLabel: "Human planning options",
  },
  questionContexts: {
    explore: {
      introTitle: "Which places are on your China wishlist?",
      introBody:
        "Choose every place you genuinely want. This free check compares the wishlist with the nights and pace you enter.",
      titles: {
        destinations: "Which places are on your China wishlist?",
        nights: "How many nights do you have in China?",
        party: "Who is travelling?",
        pace: "What pace would feel right?",
      },
      completeLabel: "Show my free route check",
    },
    "itinerary-review": {
      introTitle: "Which cities are already in your draft route?",
      introBody:
        "Share the route basics first. We ask for the complete working itinerary only after confirming the request fits the standard review scope.",
      titles: {
        destinations: "Which cities are already in your draft route?",
        nights: "How many nights does this route cover?",
        party: "Who does this route need to work for?",
        pace: "What pace should we use to review it?",
      },
      completeLabel: "Prepare my review brief",
    },
    "route-build": {
      introTitle: "Which places or experiences matter most?",
      introBody:
        "Start with the wishlist. We use the same trip basics to understand the route you want us to build.",
      titles: {
        destinations: "Which places or experiences matter most?",
        nights: "How many nights should the route fit?",
        party: "Who should this route be designed for?",
        pace: "What pace should the new route protect?",
      },
      completeLabel: "Prepare my route-build brief",
    },
    "full-trip-support": {
      introTitle: "Where are you thinking of going?",
      introBody:
        "A rough wishlist is enough. We use these basics to decide what needs a trip-specific planning and support scope.",
      titles: {
        destinations: "Where are you thinking of going?",
        nights: "About how many nights is the full trip?",
        party: "Who will be travelling?",
        pace: "How should the trip balance activity and rest?",
      },
      completeLabel: "Prepare my full-trip brief",
    },
  },
  paidBriefs: {
    "itinerary-review": {
      kicker: "Route review brief ready",
      title: "We have the basics for your route review.",
      body:
        "This is the request brief for a human review, not the finished US$69 review and not the free automated timing result.",
      noPayment: "No payment has been taken.",
      scopeLabel: "US$69 per trip · standard scope",
      scope: standardScopeEn,
      deliverablesLabel: "What the review covers",
      deliverables: [
        "A day-by-day workable / tight / fragile check",
        "Transfer-day, city-order and hotel-move review",
        "Keep / Move / Remove recommendations and a recheck list",
      ],
      nextLabel: "What happens next",
      nextSteps: [
        "Leave one working contact and an optional route outline.",
        "Homeground checks the fit and confirms the scope and delivery timing by email.",
        "We send secure payment instructions; work begins after payment is confirmed and the necessary route material is complete.",
      ],
      submitLabel: "Request my route review",
      successTitle: "Your route-review request is in.",
      successBody:
        "No payment has been taken. We’ll review the brief and email the confirmed scope, delivery timing and payment instructions.",
      successBackLabel: "Back to my trip brief",
    },
    "route-build": {
      kicker: "Route-build brief ready",
      title: "We have the basics for the route you want built.",
      body:
        "This is the request brief for the US$129 human route-build service, not a finished route and not the free automated timing result.",
      noPayment: "No payment has been taken.",
      scopeLabel: "US$129 per trip · standard scope",
      scope: standardScopeEn,
      deliverablesLabel: "What the route build covers",
      deliverables: [
        "Recommended city order and night allocation",
        "Arrival, departure, transfer and hotel-area logic",
        "A practical daily route skeleton and booking-priority list",
      ],
      nextLabel: "What happens next",
      nextSteps: [
        "Leave one working contact and any essential priorities.",
        "Homeground checks the fit and confirms the scope and delivery timing by email.",
        "We send secure payment instructions; work begins after payment is confirmed and the necessary trip material is complete.",
      ],
      submitLabel: "Request my route build",
      successTitle: "Your route-build request is in.",
      successBody:
        "No payment has been taken. We’ll review the brief and email the confirmed scope, delivery timing and payment instructions.",
      successBackLabel: "Back to my trip brief",
    },
    "full-trip-support": {
      kicker: "Full-trip brief ready",
      title: "We have enough to start defining the right scope.",
      body:
        "Full-trip planning and ground support is not a fixed package. This brief starts a human scope conversation around the actual journey.",
      noPayment: "No payment has been taken.",
      scopeLabel: "Trip-specific scope · custom quote",
      scope:
        "The written scope can include detailed planning, selected arrangements and local coordination only where agreed.",
      deliverablesLabel: "What we define with you",
      deliverables: [
        "The planning and coordination Homeground will own",
        "The arrangements, partners or traveller actions outside that scope",
        "The quote, payment schedule and start conditions",
      ],
      nextLabel: "What happens next",
      nextSteps: [
        "Leave one working contact and the most important trip constraints.",
        "Homeground reviews the brief and follows up to define the written scope and quote.",
        "Planning begins after the agreed payment is confirmed and the necessary information is complete.",
      ],
      submitLabel: "Request a custom scope",
      successTitle: "Your full-trip request is in.",
      successBody:
        "No payment has been taken. We’ll review the brief and contact you about the written scope, quote and next step.",
      successBackLabel: "Back to my trip brief",
    },
  },
};

const zh: HomepagePlanningDeskCopy = {
  eyebrow: "Homeground 旅行规划台",
  title: "你现在已经准备到哪一步？",
  intro:
    "选择最接近你当前状态的一项。之后更换服务时，共用的旅行信息无需重新填写。",
  options: [
    {
      id: "itinerary-review",
      kind: "paid",
      statement: "我已经有一份可用的逐日路线。",
      label: "审核我的路线",
      priceLabel: "US$69／趟",
      summary: "由真人检查节奏、转场、酒店搬迁和容易出问题的日期。",
      scope: `标准范围 · ${standardScopeZh}`,
    },
    {
      id: "route-build",
      kind: "paid",
      statement: "我有日期和重点，但还没有可用路线。",
      label: "为我规划路线",
      priceLabel: "US$129／趟",
      summary: "在详细预订前，建立可执行的城市顺序、住宿夜数和路线结构。",
      scope: `标准范围 · ${standardScopeZh}`,
    },
    {
      id: "full-trip-support",
      kind: "paid",
      statement: "我希望有人协助整趟旅行，包括部分具体安排或在地协调。",
      label: "全程规划与落地支持",
      priceLabel: "单独报价",
      summary: "根据你希望 Homeground 承担的规划和执行内容，先确认书面范围。",
      scope: "服务范围和报价取决于实际行程。",
    },
    {
      id: "explore",
      kind: "free",
      statement: "我还在找方向。",
      label: "免费初步路线检查",
      priceLabel: "免费",
      summary: "比较愿望清单和可用夜数，无需留下联系方式。",
      scope: "自动初步检查 · 不包含真人路线审核",
    },
  ],
  continue: "按这条路径继续",
  keepCurrent: "保留当前选择",
  requiredError: "请选择最接近你当前旅行准备阶段的一项。",
  selectedLabel: "已选择的规划路径",
  change: "更换",
  boundary:
    "提交第一份旅行简报不收费，这里也不会付款或上传文件。付费服务由 Homeground 先确认是否适合、服务范围和交付时间，再通过邮件发送付款说明。",
  changeWarning:
    "更换服务会清空你填写的服务专属路线说明；共用的旅行答案和联系方式会保留。是否继续？",
  selectedAnnouncement: (label) => `已选择${label}，现在可以继续填写旅行简报。`,
  outsideStandardScope: {
    priceLabel: "范围与价格待确认",
    briefBody:
      "公开固定价格只在 Homeground 确认符合标准范围后适用。这四项共用答案无法确认所有范围上限，因此目前没有确认固定价格，也没有付款。",
    scopeLabel: "标准范围需由人工确认",
    scope:
      "Homeground 会通过邮件确认旅行日、过夜住宿地和同行人数。符合公开标准范围时适用固定价；否则会与你确认精简方案或单独报价。",
    note: (label) =>
      `申请的服务：${label}。付款前必须确认是否符合标准范围及适用价格。`,
  },
  freeUpgrade: {
    eyebrow: "下一步需要真人协助？",
    title: "选择希望 Homeground 帮你解决的部分。",
    body:
      "免费时间检查会继续保留。只有当你需要真人审核、新路线结构或整趟旅行协助时，才需要选择付费路径。",
    optionLabel: "真人规划选项",
  },
  questionContexts: {
    explore: {
      introTitle: "哪些地方在你的中国旅行愿望里？",
      introBody:
        "选出所有真正想去的地方。免费检查会把愿望清单与你填写的夜数和节奏进行比较。",
      titles: {
        destinations: "哪些地方在你的中国旅行愿望里？",
        nights: "你在中国有多少晚？",
        party: "谁会一起旅行？",
        pace: "怎样的节奏更适合你？",
      },
      completeLabel: "查看免费路线检查",
    },
    "itinerary-review": {
      introTitle: "你现有的路线已经包括哪些城市？",
      introBody:
        "先填写路线的基本信息。确认符合标准审核范围后，我们才会向你索取完整工作路线。",
      titles: {
        destinations: "你现有的路线已经包括哪些城市？",
        nights: "这份路线覆盖多少晚？",
        party: "这份路线需要照顾谁的节奏？",
        pace: "你希望我们用什么节奏标准审核？",
      },
      completeLabel: "准备路线审核简报",
    },
    "route-build": {
      introTitle: "哪些地方或体验对你最重要？",
      introBody:
        "先从愿望清单开始。这些共用信息会帮助我们理解你希望建立的路线。",
      titles: {
        destinations: "哪些地方或体验对你最重要？",
        nights: "新路线需要安排在多少晚内？",
        party: "这条路线要为谁设计？",
        pace: "新路线应该保护怎样的节奏？",
      },
      completeLabel: "准备路线规划简报",
    },
    "full-trip-support": {
      introTitle: "目前考虑去哪些地方？",
      introBody:
        "粗略的愿望清单就足够。我们会用这些基本信息判断整趟旅行需要怎样的规划和支持范围。",
      titles: {
        destinations: "目前考虑去哪些地方？",
        nights: "整趟旅行大约多少晚？",
        party: "谁会参加这趟旅行？",
        pace: "全程规划应怎样平衡活动和休息？",
      },
      completeLabel: "准备全程旅行简报",
    },
  },
  paidBriefs: {
    "itinerary-review": {
      kicker: "路线审核简报已准备好",
      title: "我们已经了解路线审核所需的基本信息。",
      body:
        "这是交给真人的服务申请，不是已经完成的 US$69 路线审核，也不是免费自动结果。",
      noPayment: "目前没有收取任何款项。",
      scopeLabel: "US$69／趟 · 标准范围",
      scope: standardScopeZh,
      deliverablesLabel: "路线审核包括什么",
      deliverables: [
        "逐日标记可执行、偏紧或脆弱，并说明原因",
        "检查转场日、城市顺序和酒店搬迁",
        "给出保留／移动／删除建议和官方复核清单",
      ],
      nextLabel: "接下来会发生什么",
      nextSteps: [
        "留下一个有效联系方式，可选填简短路线说明。",
        "Homeground 人工确认是否适合，并通过邮件确认范围和交付时间。",
        "我们发送安全付款说明；支付确认且路线资料齐全后开始制作。",
      ],
      submitLabel: "提交路线审核申请",
      successTitle: "你的路线审核申请已提交。",
      successBody:
        "目前没有收取任何款项。我们会审核旅行简报，并通过邮件发送确认后的范围、交付时间和付款说明。",
      successBackLabel: "返回我的旅行简报",
    },
    "route-build": {
      kicker: "路线规划简报已准备好",
      title: "我们已经了解你希望建立的路线基础。",
      body:
        "这是 US$129 真人路线规划服务的申请，不是已经完成的路线，也不是免费自动结果。",
      noPayment: "目前没有收取任何款项。",
      scopeLabel: "US$129／趟 · 标准范围",
      scope: standardScopeZh,
      deliverablesLabel: "路线规划包括什么",
      deliverables: [
        "推荐城市顺序和住宿夜数",
        "抵离、城际转场与住宿区域逻辑",
        "每日路线骨架和预订优先级清单",
      ],
      nextLabel: "接下来会发生什么",
      nextSteps: [
        "留下一个有效联系方式和最重要的旅行重点。",
        "Homeground 人工确认是否适合，并通过邮件确认范围和交付时间。",
        "我们发送安全付款说明；支付确认且旅行资料齐全后开始制作。",
      ],
      submitLabel: "提交路线规划申请",
      successTitle: "你的路线规划申请已提交。",
      successBody:
        "目前没有收取任何款项。我们会审核旅行简报，并通过邮件发送确认后的范围、交付时间和付款说明。",
      successBackLabel: "返回我的旅行简报",
    },
    "full-trip-support": {
      kicker: "全程旅行简报已准备好",
      title: "这些信息足够我们开始确认合适的服务范围。",
      body:
        "全程规划与落地支持不是固定套餐。这份简报会开启一次围绕真实行程的人工范围沟通。",
      noPayment: "目前没有收取任何款项。",
      scopeLabel: "按行程确认范围 · 单独报价",
      scope:
        "书面范围只包括双方确认的详细规划、部分具体安排和在地协调。",
      deliverablesLabel: "我们会与你确认什么",
      deliverables: [
        "Homeground 负责的规划与协调内容",
        "范围之外由合作方或旅行者负责的事项",
        "报价、付款安排和正式开工条件",
      ],
      nextLabel: "接下来会发生什么",
      nextSteps: [
        "留下一个有效联系方式和最重要的旅行限制。",
        "Homeground 审核简报，并进一步确认书面范围和报价。",
        "双方约定的款项确认到账且必要资料齐全后，开始规划和执行。",
      ],
      submitLabel: "申请确认定制范围",
      successTitle: "你的全程旅行申请已提交。",
      successBody:
        "目前没有收取任何款项。我们会审核旅行简报，并联系你确认书面范围、报价和下一步。",
      successBackLabel: "返回我的旅行简报",
    },
  },
};

const ko: HomepagePlanningDeskCopy = {
  eyebrow: "Homeground 여행 플래닝 데스크",
  title: "지금 어느 단계인가요?",
  intro:
    "현재 준비 상태와 가장 가까운 항목을 선택하세요. 나중에 서비스를 바꿔도 공통 여행 정보는 다시 입력하지 않아도 됩니다.",
  options: [
    {
      id: "itinerary-review",
      kind: "paid",
      statement: "이미 일자별 일정이 있어요.",
      label: "내 일정 검토",
      priceLabel: "여행 1건당 US$69",
      summary: "사람 플래너가 속도, 이동, 숙소 변경과 불안정한 날짜를 검토합니다.",
      scope: `표준 범위 · ${standardScopeKo}`,
    },
    {
      id: "route-build",
      kind: "paid",
      statement: "날짜와 우선순위는 정했지만, 구체적인 여행 동선은 아직 없어요.",
      label: "내 동선 설계",
      priceLabel: "여행 1건당 US$129",
      summary: "세부 예약 전에 실행 가능한 도시 순서, 숙박일과 여행 구조를 만듭니다.",
      scope: `표준 범위 · ${standardScopeKo}`,
    },
    {
      id: "full-trip-support",
      kind: "paid",
      statement: "일정뿐 아니라 일부 예약 준비나 현지 조율까지 도움받고 싶어요.",
      label: "전체 여행 설계 및 현지 지원",
      priceLabel: "맞춤 견적",
      summary: "Homeground가 맡을 플래닝과 실행 범위를 실제 여행에 맞춰 서면으로 정합니다.",
      scope: "서비스 범위와 견적은 실제 여행에 따라 달라집니다.",
    },
    {
      id: "explore",
      kind: "free",
      statement: "아직 아이디어를 정리하는 단계예요.",
      label: "무료 초기 동선 점검",
      priceLabel: "무료",
      summary: "희망 장소와 가능한 숙박일을 비교합니다. 연락처는 필요하지 않습니다.",
      scope: "자동 초기 점검 · 사람 플래너의 일정 검토는 포함되지 않음",
    },
  ],
  continue: "이 경로로 계속하기",
  keepCurrent: "현재 선택 유지하기",
  requiredError: "현재 여행 준비 단계와 가장 가까운 항목을 선택해 주세요.",
  selectedLabel: "선택한 플래닝 경로",
  change: "변경",
  boundary:
    "첫 여행 브리프는 무료이며 여기서는 결제나 파일 업로드가 진행되지 않습니다. 유료 서비스는 Homeground가 적합 여부, 범위와 완료 예정일을 먼저 확인한 뒤 이메일로 결제 방법을 안내합니다.",
  changeWarning:
    "서비스를 바꾸면 서비스별 일정 메모가 삭제됩니다. 공통 여행 답변과 연락처는 유지됩니다. 계속할까요?",
  selectedAnnouncement: (label) => `${label}을 선택했습니다. 여행 브리프를 계속 작성할 수 있습니다.`,
  outsideStandardScope: {
    priceLabel: "범위·가격 확인 필요",
    briefBody:
      "안내된 정액 가격은 Homeground가 표준 범위 적합성을 확인한 뒤에만 적용됩니다. 네 가지 공통 답변만으로는 모든 범위 한도를 확인할 수 없어 고정 가격이나 결제는 아직 확정되지 않았습니다.",
    scopeLabel: "표준 범위 적합성 확인 필요",
    scope:
      "Homeground가 이메일로 여행일, 숙박 거점 수와 여행자 수를 확인합니다. 공개된 표준 범위에 맞으면 정액 가격이 적용되며, 그렇지 않으면 조정안 또는 별도 견적을 안내합니다.",
    note: (label) =>
      `요청 서비스: ${label}. 결제 전에 표준 범위 적합성과 적용 가격을 확인해야 합니다.`,
  },
  freeUpgrade: {
    eyebrow: "다음 단계에 사람의 도움이 필요하신가요?",
    title: "Homeground가 해결할 여행 부분을 선택하세요.",
    body:
      "무료 시간 점검 결과는 그대로 유지됩니다. 사람의 일정 검토, 새로운 동선 설계 또는 여행 전체 지원이 필요할 때만 유료 경로를 선택하세요.",
    optionLabel: "사람 플래닝 옵션",
  },
  questionContexts: {
    explore: {
      introTitle: "중국에서 어디를 가고 싶으신가요?",
      introBody:
        "정말 가고 싶은 곳을 모두 선택하세요. 무료 점검은 희망 장소를 숙박일과 원하는 여행 속도에 맞춰 비교합니다.",
      titles: {
        destinations: "중국에서 어디를 가고 싶으신가요?",
        nights: "중국에서 몇 박을 보내시나요?",
        party: "누구와 함께 여행하시나요?",
        pace: "어떤 여행 속도가 잘 맞나요?",
      },
      completeLabel: "무료 동선 점검 보기",
    },
    "itinerary-review": {
      introTitle: "현재 일정에 어떤 도시가 들어 있나요?",
      introBody:
        "먼저 일정의 기본 정보를 알려 주세요. 표준 검토 범위에 맞는지 확인한 뒤 전체 작업 일정을 요청합니다.",
      titles: {
        destinations: "현재 일정에 어떤 도시가 들어 있나요?",
        nights: "이 일정은 몇 박인가요?",
        party: "누구에게 맞는 일정이어야 하나요?",
        pace: "어떤 속도를 기준으로 검토할까요?",
      },
      completeLabel: "일정 검토 브리프 준비하기",
    },
    "route-build": {
      introTitle: "가장 중요한 장소나 경험은 무엇인가요?",
      introBody:
        "희망 목록부터 시작하세요. 공통 여행 정보로 어떤 동선을 설계해야 하는지 파악합니다.",
      titles: {
        destinations: "가장 중요한 장소나 경험은 무엇인가요?",
        nights: "새 동선은 몇 박 안에 맞춰야 하나요?",
        party: "누구를 위한 동선인가요?",
        pace: "새 동선에서 어떤 여행 속도를 지켜야 하나요?",
      },
      completeLabel: "동선 설계 브리프 준비하기",
    },
    "full-trip-support": {
      introTitle: "어디로 갈 생각이신가요?",
      introBody:
        "대략적인 희망 목록이면 충분합니다. 이 기본 정보로 여행별 플래닝과 지원 범위를 판단합니다.",
      titles: {
        destinations: "어디로 갈 생각이신가요?",
        nights: "전체 여행은 대략 몇 박인가요?",
        party: "누가 함께 여행하나요?",
        pace: "활동과 휴식의 균형을 어떻게 맞출까요?",
      },
      completeLabel: "전체 여행 브리프 준비하기",
    },
  },
  paidBriefs: {
    "itinerary-review": {
      kicker: "일정 검토 브리프 준비 완료",
      title: "일정 검토에 필요한 기본 정보를 확인했습니다.",
      body:
        "이것은 사람 플래너에게 보내는 서비스 요청서입니다. US$69 일정 검토가 완료된 것이 아니며 무료 자동 결과도 아닙니다.",
      noPayment: "아직 결제된 금액은 없습니다.",
      scopeLabel: "여행 1건당 US$69 · 표준 범위",
      scope: standardScopeKo,
      deliverablesLabel: "일정 검토에 포함되는 내용",
      deliverables: [
        "날짜별 실행 가능 / 빠듯함 / 불안정함 점검",
        "이동일, 도시 순서와 숙소 변경 검토",
        "유지 / 이동 / 제외 제안과 공식 재확인 목록",
      ],
      nextLabel: "다음 단계",
      nextSteps: [
        "사용 가능한 연락처와 선택 사항인 간단한 일정 설명을 남깁니다.",
        "Homeground가 적합 여부를 검토하고 이메일로 범위와 완료 예정일을 확인합니다.",
        "안전한 결제 방법을 안내하며, 결제가 확인되고 필요한 일정 자료가 모두 준비되면 작업을 시작합니다.",
      ],
      submitLabel: "일정 검토 요청하기",
      successTitle: "일정 검토 요청을 접수했습니다.",
      successBody:
        "아직 결제된 금액은 없습니다. 브리프를 검토한 뒤 확정 범위, 완료 예정일과 결제 방법을 이메일로 안내하겠습니다.",
      successBackLabel: "여행 브리프로 돌아가기",
    },
    "route-build": {
      kicker: "동선 설계 브리프 준비 완료",
      title: "원하시는 여행 동선의 기본 정보를 확인했습니다.",
      body:
        "이것은 US$129 사람 플래너 동선 설계 서비스 요청서입니다. 완성된 동선이나 무료 자동 결과가 아닙니다.",
      noPayment: "아직 결제된 금액은 없습니다.",
      scopeLabel: "여행 1건당 US$129 · 표준 범위",
      scope: standardScopeKo,
      deliverablesLabel: "동선 설계에 포함되는 내용",
      deliverables: [
        "추천 도시 순서와 숙박일 배분",
        "도착, 출발, 도시 간 이동과 숙소 지역의 원칙",
        "날짜별 동선 뼈대와 예약 우선순위 목록",
      ],
      nextLabel: "다음 단계",
      nextSteps: [
        "사용 가능한 연락처와 가장 중요한 여행 우선순위를 남깁니다.",
        "Homeground가 적합 여부를 검토하고 이메일로 범위와 완료 예정일을 확인합니다.",
        "안전한 결제 방법을 안내하며, 결제가 확인되고 필요한 여행 자료가 모두 준비되면 작업을 시작합니다.",
      ],
      submitLabel: "동선 설계 요청하기",
      successTitle: "동선 설계 요청을 접수했습니다.",
      successBody:
        "아직 결제된 금액은 없습니다. 브리프를 검토한 뒤 확정 범위, 완료 예정일과 결제 방법을 이메일로 안내하겠습니다.",
      successBackLabel: "여행 브리프로 돌아가기",
    },
    "full-trip-support": {
      kicker: "전체 여행 브리프 준비 완료",
      title: "알맞은 서비스 범위를 정하기 위한 기본 정보를 확인했습니다.",
      body:
        "전체 여행 설계 및 현지 지원은 고정 패키지가 아닙니다. 이 브리프를 바탕으로 실제 여행에 맞는 범위를 사람 플래너와 정합니다.",
      noPayment: "아직 결제된 금액은 없습니다.",
      scopeLabel: "여행별 범위 · 맞춤 견적",
      scope:
        "서면으로 합의한 세부 플래닝, 일부 예약 준비와 현지 조율만 범위에 포함됩니다.",
      deliverablesLabel: "함께 정할 내용",
      deliverables: [
        "Homeground가 맡을 플래닝과 조율 업무",
        "범위 밖에서 파트너 또는 여행자가 맡을 업무",
        "견적, 결제 일정과 작업 시작 조건",
      ],
      nextLabel: "다음 단계",
      nextSteps: [
        "사용 가능한 연락처와 가장 중요한 여행 조건을 남깁니다.",
        "Homeground가 브리프를 검토하고 서면 범위와 견적을 함께 정합니다.",
        "합의한 결제가 확인되고 필요한 정보가 모두 준비되면 플래닝과 실행을 시작합니다.",
      ],
      submitLabel: "맞춤 범위 요청하기",
      successTitle: "전체 여행 요청을 접수했습니다.",
      successBody:
        "아직 결제된 금액은 없습니다. 브리프를 검토한 뒤 서면 범위, 견적과 다음 단계를 안내하겠습니다.",
      successBackLabel: "여행 브리프로 돌아가기",
    },
  },
};

const copies: Record<HomegroundLocale, HomepagePlanningDeskCopy> = {
  en,
  zh,
  ko,
};

export function getHomepagePlanningDeskCopy(
  locale: HomegroundLocale,
): HomepagePlanningDeskCopy {
  return copies[locale];
}

export function isHomepagePlanningIntentId(
  value: string | null | undefined,
): value is HomepagePlanningIntentId {
  return Boolean(
    value &&
      homepagePlanningIntentIds.includes(value as HomepagePlanningIntentId),
  );
}
