import type { HomegroundLocale } from "./homegroundI18n";
import type { DestinationPlan } from "./destinationPlanner";
import type { RouteServiceId } from "./routeServiceInterest";

export const homepagePlanningIntentIds = [
  "conversation",
  "itinerary-review",
  "route-build",
  "full-trip-support",
] as const;

export type HomepagePlanningIntentId =
  (typeof homepagePlanningIntentIds)[number];

export const homepageStarterIntentIds = [
  "arrange-trip",
  "self-book-route",
  "existing-route",
  "unsure",
  "open-text",
] as const;

export type HomepageStarterIntentId =
  (typeof homepageStarterIntentIds)[number];

export interface HomepageStarterIntentOption {
  id: HomepageStarterIntentId;
  label: string;
  planningIntent: HomepagePlanningIntentId;
}

export const bookingResponsibilityIds = [
  "traveller",
  "homeground-selected",
  "homeground-most",
  "unsure",
] as const;

export type BookingResponsibilityId =
  (typeof bookingResponsibilityIds)[number];

export interface BookingResponsibilityCopy {
  legend: string;
  hint: string;
  options: readonly { id: BookingResponsibilityId; label: string }[];
  error: string;
  fixedScopeHint: string;
}

export function isBookingResponsibilityId(
  value: string | null | undefined,
): value is BookingResponsibilityId {
  return Boolean(
    value &&
      bookingResponsibilityIds.includes(value as BookingResponsibilityId),
  );
}

export type PlanningQuestionKey =
  | "destinations"
  | "nights"
  | "party"
  | "pace";

export interface HomepagePlanningIntentOption {
  id: HomepagePlanningIntentId;
  kind: "conversation" | "paid";
  statement: string;
  label: string;
  priceLabel: string;
  summary: string;
  scope: string;
}

export interface PlanningQuestionContextCopy {
  introTitle: string;
  introBody?: string;
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
  starterPrompts: readonly HomepageStarterIntentOption[];
  openStarterLabel: string;
  noteLabel: string;
  noteOptionalTag: string;
  noteHint: string;
  contactStart: {
    whatsappEyebrow: string;
    whatsappTitle: string;
    whatsappAction: string;
    whatsappOpensExternally: string;
    whatsappUnavailable: string;
    messengerLead: string;
    messengerAction: string;
    messengerOpensExternally: string;
    emailEyebrow: string;
    emailTitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailAction: string;
    emailSubmitting: string;
    emailUse: string;
    privacyLead: string;
    privacyAction: string;
    emailInvalid: string;
    emailSuccessTitle: string;
    emailSuccessBody: string;
    referenceLabel: string;
    retryAction: string;
    failed: string;
    uncertain: string;
    emailUnavailable: string;
    fallbackEmailAction: string;
    fallbackEmailSubject: string;
  };
  serviceShortcutLabel: string;
  serviceShortcutIntro: string;
  options: readonly HomepagePlanningIntentOption[];
  continue: string;
  keepCurrent: string;
  requiredError: string;
  selectedLabel: string;
  change: string;
  boundary: string;
  changeWarning: string;
  selectedAnnouncement: (label: string) => string;
  bookingResponsibility: BookingResponsibilityCopy;
  outsideStandardScope: {
    priceLabel: string;
    briefBody: string;
    scopeLabel: string;
    scope: string;
    note: (label: string) => string;
  };
  questionContexts: Record<
    HomepagePlanningIntentId,
    PlanningQuestionContextCopy
  >;
  conversationBrief: PaidBriefReadyCopy;
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
  eyebrow: "Talk to a China trip planner",
  title: "Start with the easiest way to reach us.",
  starterPrompts: [
    {
      id: "arrange-trip",
      label: "Plan and help arrange the trip",
      planningIntent: "conversation",
    },
    {
      id: "self-book-route",
      label: "Build a route I’ll book myself",
      planningIntent: "conversation",
    },
    {
      id: "existing-route",
      label: "Review a route I already have",
      planningIntent: "conversation",
    },
    {
      id: "unsure",
      label: "I’m not sure yet",
      planningIntent: "conversation",
    },
  ],
  openStarterLabel: "Told us in your own words",
  noteLabel: "Anything useful to know?",
  noteOptionalTag: "Optional",
  noteHint:
    "Dates, travellers, places you’re considering, or what you’d like Homeground to handle. No passport or payment details, please.",
  contactStart: {
    whatsappEyebrow: "Direct chat",
    whatsappTitle: "Talk on WhatsApp",
    whatsappAction: "Open WhatsApp",
    whatsappOpensExternally:
      "Opens WhatsApp in a new tab or app. Nothing is submitted to this website.",
    whatsappUnavailable:
      "Direct WhatsApp is temporarily unavailable.",
    messengerLead: "Prefer Facebook?",
    messengerAction: "Message us on Messenger",
    messengerOpensExternally:
      "Opens Messenger in a new tab or app. Nothing is submitted to this website.",
    emailEyebrow: "One field",
    emailTitle: "Leave your email",
    emailLabel: "Your email address",
    emailPlaceholder: "you@example.com",
    emailAction: "Ask Homeground to email me",
    emailSubmitting: "Saving your email…",
    emailUse:
      "Used only to reply to this enquiry. No marketing signup.",
    privacyLead: "How we handle this:",
    privacyAction: "Privacy notice",
    emailInvalid: "Enter a complete email address.",
    emailSuccessTitle: "Your email has been saved.",
    emailSuccessBody:
      "A Homeground planner can now reply. No itinerary details were collected here.",
    referenceLabel: "Reference",
    retryAction: "Check and try again",
    failed:
      "Your email was not saved. Please try again, or use WhatsApp.",
    uncertain:
      "We could not confirm whether your email was saved. Retry with the same email to check safely.",
    emailUnavailable:
      "The email form is temporarily unavailable.",
    fallbackEmailAction: "Open your email app instead",
    fallbackEmailSubject: "China trip enquiry",
  },
  serviceShortcutLabel: "Already know what you need?",
  serviceShortcutIntro:
    "Start directly with a published service. You can still change the path before payment.",
  options: [
    {
      id: "conversation",
      kind: "conversation",
      statement: "I want to explain the trip before choosing a service.",
      label: "Trip conversation",
      priceLabel: "Free to enquire",
      summary:
        "A Homeground planner reviews the brief and confirms the appropriate next step.",
      scope: "No payment is taken here.",
    },
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
  ],
  continue: "Start my trip brief",
  keepCurrent: "Keep my current path",
  requiredError:
    "Choose a starting point, or write a short note first — either works.",
  selectedLabel: "Your starting point",
  change: "Change",
  boundary:
    "Free to enquire. We use this first brief to confirm the right scope; detailed personalised route work begins after the agreed payment is confirmed. No payment is taken here.",
  changeWarning:
    "Changing the service will clear the service-specific route note you entered. Your shared trip answers and contact details will stay. Continue?",
  selectedAnnouncement: (label) =>
    `${label} selected. You can continue with the trip brief.`,
  bookingResponsibility: {
    legend: "Who do you expect to handle the bookings and arrangements?",
    hint: "This is the single most useful signal for recommending the right service. Nothing is locked in.",
    options: [
      { id: "traveller", label: "I’ll make all bookings myself" },
      {
        id: "homeground-selected",
        label: "I’d like Homeground to help with selected arrangements",
      },
      {
        id: "homeground-most",
        label: "I’d like help handling most of the trip",
      },
      { id: "unsure", label: "I’m not sure yet" },
    ],
    error:
      "Choose who you expect to handle the bookings and arrangements.",
    fixedScopeHint:
      "The US$69 and US$129 options are written route services. If you want help beyond the document, send the same brief and a planner will discuss the broader scope and next step with you.",
  },
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
  questionContexts: {
    conversation: {
      introTitle: "Which places are you considering?",
      titles: {
        destinations: "Which places are you considering?",
        nights: "About how many nights do you have?",
        party: "Who will be travelling?",
        pace: "What pace would feel right?",
      },
      completeLabel: "Prepare my trip brief",
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
      titles: {
        destinations: "Where are you thinking of going?",
        nights: "About how many nights is the full trip?",
        party: "Who will be travelling?",
        pace: "How should the trip balance activity and rest?",
      },
      completeLabel: "Prepare my full-trip brief",
    },
  },
  conversationBrief: {
    kicker: "Trip brief ready",
    title: "We have the basics to decide the right next step.",
    body:
      "This is a free enquiry brief for a planner to review, not a finished route, booking or paid planning deliverable.",
    noPayment: "No payment has been taken.",
    scopeLabel: "What this first conversation does",
    scope:
      "Homeground uses the brief to understand the request, check fit and explain the appropriate service and price before paid work begins.",
    deliverablesLabel: "What a planner will check",
    deliverables: [
      "Whether you need a route review, a new route or full-trip help",
      "Which important details are still needed before work can be scoped",
      "The next practical step, service price or quotation process",
    ],
    nextLabel: "What happens next",
    nextSteps: [
      "Leave one working contact and any essential trip constraints.",
      "A Homeground planner reviews the brief and replies with the appropriate next step.",
      "Detailed personalised work begins only after the scope and agreed payment are confirmed.",
    ],
    submitLabel: "Send my trip brief",
    successTitle: "Your trip brief is in.",
    successBody:
      "No payment has been taken. We’ll review what you need and contact you with the appropriate next step.",
    successBackLabel: "Back to my trip brief",
  },
  paidBriefs: {
    "itinerary-review": {
        kicker: "Route review brief ready",
        title: "We have the basics for your route review.",
        body:
          "This is the request brief for the US$69 human review, not the finished review itself.",
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
        "We send payment instructions identifying the registered consultation operator; work begins after payment is confirmed and the necessary route material is complete.",
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
          "This is the request brief for the US$129 human route-build service, not the finished route itself.",
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
        "We send payment instructions identifying the registered consultation operator; work begins after payment is confirmed and the necessary trip material is complete.",
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
        "Homeground reviews the whole journey and turns this brief into a clear planning conversation, proposed scope and custom quote.",
      deliverablesLabel: "What we define with you",
      deliverables: [
        "The route structure and priorities that matter most",
        "The planning, booking and on-the-ground support you want handled",
        "The proposed scope, custom quote and start conditions",
      ],
      nextLabel: "What happens next",
      nextSteps: [
        "Leave one working contact and the most important trip constraints.",
        "Homeground reviews the brief and follows up to shape the right solution with you.",
        "Before payment, you receive the written scope, quote, start timing and payment details.",
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
  eyebrow: "联系中国旅行规划师",
  title: "选择最方便的方式，先和我们聊聊。",
  starterPrompts: [
    {
      id: "arrange-trip",
      label: "帮我规划并协调整趟旅行",
      planningIntent: "conversation",
    },
    {
      id: "self-book-route",
      label: "为我搭建路线，预订由我自己完成",
      planningIntent: "conversation",
    },
    {
      id: "existing-route",
      label: "审核我已经准备好的路线",
      planningIntent: "conversation",
    },
    {
      id: "unsure",
      label: "我还不确定",
      planningIntent: "conversation",
    },
  ],
  openStarterLabel: "用自己的话说明",
  noteLabel: "还有什么想先告诉我们？",
  noteOptionalTag: "选填",
  noteHint:
    "可以写日期、同行者、考虑中的地方，或希望 Homeground 负责的部分。请不要填写护照或付款信息。",
  contactStart: {
    whatsappEyebrow: "直接聊天",
    whatsappTitle: "通过 WhatsApp 直接聊",
    whatsappAction: "打开 WhatsApp",
    whatsappOpensExternally:
      "将在新标签页或应用中打开 WhatsApp；不会向本网站提交任何内容。",
    whatsappUnavailable: "WhatsApp 直接联系暂时不可用。",
    messengerLead: "更常用 Facebook？",
    messengerAction: "通过 Messenger 联系",
    messengerOpensExternally:
      "将在新标签页或应用中打开 Messenger；不会向本网站提交任何内容。",
    emailEyebrow: "只填一项",
    emailTitle: "留下你的邮箱",
    emailLabel: "你的邮箱",
    emailPlaceholder: "you@example.com",
    emailAction: "请 Homeground 邮件联系我",
    emailSubmitting: "正在保存邮箱……",
    emailUse: "只用于回复本次咨询，不会自动订阅营销邮件。",
    privacyLead: "信息如何处理：",
    privacyAction: "隐私说明",
    emailInvalid: "请输入完整有效的邮箱地址。",
    emailSuccessTitle: "邮箱已保存。",
    emailSuccessBody:
      "Homeground 规划师现在可以回复你。本页没有收集任何行程详情。",
    referenceLabel: "查询编号",
    retryAction: "检查并重试",
    failed: "邮箱没有保存成功。请重试，或改用 WhatsApp。",
    uncertain:
      "目前无法确认邮箱是否已保存。使用同一个邮箱重试，可以安全核对结果。",
    emailUnavailable: "邮箱表单暂时不可用。",
    fallbackEmailAction: "改用邮件应用发送",
    fallbackEmailSubject: "中国旅行咨询",
  },
  serviceShortcutLabel: "已经知道自己需要什么？",
  serviceShortcutIntro:
    "可以直接从公开服务开始；付款前仍可根据实际需求调整路径。",
  options: [
    {
      id: "conversation",
      kind: "conversation",
      statement: "我想先说明旅行需求，再决定服务。",
      label: "旅行需求沟通",
      priceLabel: "提交需求免费",
      summary: "Homeground 规划师会查看简报，并确认适合的下一步。",
      scope: "本页不会收款。",
    },
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
  ],
  continue: "开始填写旅行简报",
  keepCurrent: "保留当前选择",
  requiredError: "请先选择一个起点，或写几句你的旅行想法，两种都可以。",
  selectedLabel: "你的起点",
  change: "更换",
  boundary:
    "提交需求不收费。我们会用这份简报确认适合的范围；详细个性化路线在双方约定的款项确认后开始制作。本页不会收款。",
  changeWarning:
    "更换服务会清空你填写的服务专属路线说明；共用的旅行答案和联系方式会保留。是否继续？",
  selectedAnnouncement: (label) => `已选择${label}，现在可以继续填写旅行简报。`,
  bookingResponsibility: {
    legend: "你希望由谁完成预订和具体安排？",
    hint: "这是判断适合服务最重要的信号，不会锁定任何选择。",
    options: [
      { id: "traveller", label: "全部预订我自己完成" },
      {
        id: "homeground-selected",
        label: "希望 Homeground 协助部分旅游安排",
      },
      {
        id: "homeground-most",
        label: "希望有人帮我负责大部分行程安排",
      },
      { id: "unsure", label: "我还不确定" },
    ],
    error: "请选择你希望由谁完成预订和安排。",
    fixedScopeHint:
      "69 美元与 129 美元是书面路线服务。如果你希望获得路线文件以外的帮助，可以继续提交同一份简报，规划师会与你沟通更完整的服务范围和下一步。",
  },
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
  questionContexts: {
    conversation: {
      introTitle: "目前考虑去哪些地方？",
      titles: {
        destinations: "目前考虑去哪些地方？",
        nights: "整趟旅行大约多少晚？",
        party: "谁会一起旅行？",
        pace: "怎样的旅行节奏更适合你？",
      },
      completeLabel: "准备旅行简报",
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
      titles: {
        destinations: "目前考虑去哪些地方？",
        nights: "整趟旅行大约多少晚？",
        party: "谁会参加这趟旅行？",
        pace: "全程规划应怎样平衡活动和休息？",
      },
      completeLabel: "准备全程旅行简报",
    },
  },
  conversationBrief: {
    kicker: "旅行简报已准备好",
    title: "这些信息足以让我们判断合适的下一步。",
    body:
      "这是一份供规划师查看的免费需求简报，不是已经完成的路线、预订或付费规划成果。",
    noPayment: "目前没有付款。",
    scopeLabel: "第一次沟通会做什么",
    scope:
      "Homeground 会用这份简报理解需求、确认是否适合，并在付费工作开始前说明合适的服务和价格。",
    deliverablesLabel: "规划师会判断什么",
    deliverables: [
      "适合路线审核、新路线规划，还是全程协助",
      "正式确认工作范围前还需要哪些重要信息",
      "下一步、公开服务价格或定制报价方式",
    ],
    nextLabel: "接下来会发生什么",
    nextSteps: [
      "留下一个可用的联系方式和必要的旅行限制。",
      "Homeground 规划师查看简报，并回复适合的下一步。",
      "详细个性化工作只在范围与约定款项确认后开始。",
    ],
    submitLabel: "提交旅行简报",
    successTitle: "旅行简报已提交。",
    successBody:
      "目前没有付款。我们会查看你的需求，并联系你说明适合的下一步。",
    successBackLabel: "返回旅行简报",
  },
  paidBriefs: {
    "itinerary-review": {
        kicker: "路线审核简报已准备好",
        title: "我们已经了解路线审核所需的基本信息。",
        body:
          "这是 US$69 真人路线审核的服务申请，不是已经完成的审核成果。",
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
        "付款说明会明确登记咨询经营主体；支付确认且路线资料齐全后开始制作。",
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
          "这是 US$129 真人路线规划服务的申请，不是已经完成的路线成果。",
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
        "付款说明会明确登记咨询经营主体；支付确认且旅行资料齐全后开始制作。",
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
        "Homeground 会从整趟旅行出发审核这份简报，与你梳理需求，并进一步确认服务范围与单独报价。",
      deliverablesLabel: "我们会与你确认什么",
      deliverables: [
        "整趟旅行的路线结构与优先事项",
        "你希望我们协助的规划、预订与落地支持",
        "建议的服务范围、单独报价与开始条件",
      ],
      nextLabel: "接下来会发生什么",
      nextSteps: [
        "留下一个有效联系方式和最重要的旅行限制。",
        "Homeground 审核简报，并联系你一起完善合适的方案。",
        "付款前，你会收到书面范围、报价、开始时间与付款信息。",
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
  eyebrow: "중국 여행 플래너와 상담하기",
  title: "가장 편한 방법으로 먼저 이야기해 보세요.",
  starterPrompts: [
    {
      id: "arrange-trip",
      label: "여행 전체 설계와 일부 예약·현지 조율이 필요해요",
      planningIntent: "conversation",
    },
    {
      id: "self-book-route",
      label: "예약은 직접 하고, 여행 동선만 설계받고 싶어요",
      planningIntent: "conversation",
    },
    {
      id: "existing-route",
      label: "이미 준비한 일정을 검토받고 싶어요",
      planningIntent: "conversation",
    },
    {
      id: "unsure",
      label: "아직 잘 모르겠어요",
      planningIntent: "conversation",
    },
  ],
  openStarterLabel: "직접 적은 이야기",
  noteLabel: "먼저 알려 주고 싶은 내용이 있나요?",
  noteOptionalTag: "선택",
  noteHint:
    "날짜, 여행자, 생각 중인 장소 또는 Homeground가 맡았으면 하는 부분을 적어 주세요. 여권이나 결제 정보는 입력하지 마세요.",
  contactStart: {
    whatsappEyebrow: "바로 대화",
    whatsappTitle: "WhatsApp으로 바로 상담하기",
    whatsappAction: "WhatsApp 열기",
    whatsappOpensExternally:
      "새 탭이나 앱에서 WhatsApp으로 이동하며 이 웹사이트에는 아무 내용도 제출되지 않습니다.",
    whatsappUnavailable:
      "WhatsApp 바로 연결을 잠시 사용할 수 없습니다.",
    messengerLead: "Facebook이 더 편한가요?",
    messengerAction: "Messenger로 메시지 보내기",
    messengerOpensExternally:
      "새 탭이나 앱에서 Messenger로 이동하며 이 웹사이트에는 아무 내용도 제출되지 않습니다.",
    emailEyebrow: "한 항목만 입력",
    emailTitle: "이메일 남기기",
    emailLabel: "이메일 주소",
    emailPlaceholder: "you@example.com",
    emailAction: "Homeground의 이메일 답장 받기",
    emailSubmitting: "이메일 저장 중…",
    emailUse:
      "이번 문의에 답장할 때만 사용하며 마케팅 구독으로 처리하지 않습니다.",
    privacyLead: "정보 처리 방법:",
    privacyAction: "개인정보 안내",
    emailInvalid: "완전한 이메일 주소를 입력해 주세요.",
    emailSuccessTitle: "이메일이 저장되었습니다.",
    emailSuccessBody:
      "이제 Homeground 플래너가 답장할 수 있습니다. 이곳에서는 일정 세부 정보를 수집하지 않았습니다.",
    referenceLabel: "문의 번호",
    retryAction: "확인 후 다시 시도",
    failed:
      "이메일이 저장되지 않았습니다. 다시 시도하거나 WhatsApp을 이용해 주세요.",
    uncertain:
      "이메일 저장 여부를 확인하지 못했습니다. 같은 이메일로 다시 시도하면 안전하게 확인할 수 있습니다.",
    emailUnavailable:
      "이메일 양식을 잠시 사용할 수 없습니다.",
    fallbackEmailAction: "이메일 앱으로 직접 보내기",
    fallbackEmailSubject: "중국 여행 문의",
  },
  serviceShortcutLabel: "필요한 서비스를 이미 알고 있나요?",
  serviceShortcutIntro:
    "공개된 서비스에서 바로 시작할 수 있으며, 결제 전 실제 필요에 따라 경로를 바꿀 수 있습니다.",
  options: [
    {
      id: "conversation",
      kind: "conversation",
      statement: "서비스를 고르기 전에 여행 요청부터 설명하고 싶어요.",
      label: "여행 요청 상담",
      priceLabel: "문의 제출 무료",
      summary:
        "Homeground 플래너가 브리프를 검토하고 적절한 다음 단계를 안내합니다.",
      scope: "이 페이지에서는 결제가 진행되지 않습니다.",
    },
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
  ],
  continue: "여행 브리프 시작하기",
  keepCurrent: "현재 선택 유지하기",
  requiredError:
    "출발점을 선택하거나 여행 메모를 간단히 적어 주세요. 둘 중 하나면 충분합니다.",
  selectedLabel: "여행의 출발점",
  change: "변경",
  boundary:
    "문의 제출은 무료입니다. 이 브리프로 적절한 범위를 먼저 확인하며, 상세 맞춤 일정 작업은 합의된 결제가 확인된 뒤 시작합니다. 이 페이지에서는 결제가 진행되지 않습니다.",
  changeWarning:
    "서비스를 바꾸면 서비스별 일정 메모가 삭제됩니다. 공통 여행 답변과 연락처는 유지됩니다. 계속할까요?",
  selectedAnnouncement: (label) => `${label}을 선택했습니다. 여행 브리프를 계속 작성할 수 있습니다.`,
  bookingResponsibility: {
    legend: "예약과 준비는 누가 맡게 될까요?",
    hint: "알맞은 서비스를 추천하는 데 가장 중요한 정보이며, 선택이 확정되는 것은 아닙니다.",
    options: [
      { id: "traveller", label: "예약은 모두 제가 직접 할 거예요" },
      {
        id: "homeground-selected",
        label: "Homeground가 일부 여행 준비를 도와주길 원해요",
      },
      {
        id: "homeground-most",
        label: "여행 대부분의 준비를 도움받고 싶어요",
      },
      { id: "unsure", label: "아직 잘 모르겠어요" },
    ],
    error: "예약과 준비를 누가 맡을지 선택해 주세요.",
    fixedScopeHint:
      "US$69와 US$129는 서면 일정 서비스입니다. 문서 외의 도움이 필요하면 같은 브리프를 보내 주세요. 플래너가 더 넓은 서비스 범위와 다음 단계를 함께 논의합니다.",
  },
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
  questionContexts: {
    conversation: {
      introTitle: "어디로 갈 생각이신가요?",
      titles: {
        destinations: "어디로 갈 생각이신가요?",
        nights: "전체 여행은 대략 몇 박인가요?",
        party: "누가 함께 여행하나요?",
        pace: "어떤 여행 속도가 편할까요?",
      },
      completeLabel: "여행 브리프 준비하기",
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
      titles: {
        destinations: "어디로 갈 생각이신가요?",
        nights: "전체 여행은 대략 몇 박인가요?",
        party: "누가 함께 여행하나요?",
        pace: "활동과 휴식의 균형을 어떻게 맞출까요?",
      },
      completeLabel: "전체 여행 브리프 준비하기",
    },
  },
  conversationBrief: {
    kicker: "여행 브리프 준비 완료",
    title: "알맞은 다음 단계를 판단할 기본 정보가 준비되었습니다.",
    body:
      "플래너가 검토할 무료 문의 브리프이며, 완성된 일정·예약 또는 유료 플래닝 결과물이 아닙니다.",
    noPayment: "아직 결제된 금액은 없습니다.",
    scopeLabel: "첫 상담에서 확인하는 것",
    scope:
      "Homeground는 브리프로 요청과 적합성을 확인하고, 유료 작업 전에 알맞은 서비스와 가격을 설명합니다.",
    deliverablesLabel: "플래너가 판단하는 내용",
    deliverables: [
      "일정 검토, 새 동선 설계 또는 전체 여행 지원 중 알맞은 범위",
      "작업 범위를 확정하기 전에 더 필요한 핵심 정보",
      "다음 단계, 공개 서비스 가격 또는 맞춤 견적 방식",
    ],
    nextLabel: "다음 단계",
    nextSteps: [
      "연락 가능한 수단 하나와 중요한 여행 조건을 남깁니다.",
      "Homeground 플래너가 브리프를 검토하고 알맞은 다음 단계를 안내합니다.",
      "상세 맞춤 작업은 범위와 합의된 결제가 확인된 뒤에만 시작합니다.",
    ],
    submitLabel: "여행 브리프 보내기",
    successTitle: "여행 브리프가 접수되었습니다.",
    successBody:
      "아직 결제된 금액은 없습니다. 필요한 내용을 검토한 뒤 적절한 다음 단계를 안내하겠습니다.",
    successBackLabel: "여행 브리프로 돌아가기",
  },
  paidBriefs: {
    "itinerary-review": {
        kicker: "일정 검토 브리프 준비 완료",
        title: "일정 검토에 필요한 기본 정보를 확인했습니다.",
        body:
          "US$69 사람 플래너 일정 검토를 요청하는 브리프이며, 아직 완성된 검토 결과는 아닙니다.",
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
        "등록 컨설팅 사업자가 명시된 결제 방법을 안내하며, 결제가 확인되고 필요한 일정 자료가 모두 준비되면 작업을 시작합니다.",
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
          "US$129 사람 플래너 동선 설계 서비스를 요청하는 브리프이며, 아직 완성된 동선 결과는 아닙니다.",
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
        "등록 컨설팅 사업자가 명시된 결제 방법을 안내하며, 결제가 확인되고 필요한 여행 자료가 모두 준비되면 작업을 시작합니다.",
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
        "Homeground가 여행 전체를 기준으로 브리프를 검토하고 필요한 내용을 정리한 뒤 맞춤 범위와 견적을 안내합니다.",
      deliverablesLabel: "함께 정할 내용",
      deliverables: [
        "전체 여행의 동선 구조와 우선순위",
        "도움이 필요한 플래닝, 예약 준비와 현지 지원",
        "제안 범위, 맞춤 견적과 시작 조건",
      ],
      nextLabel: "다음 단계",
      nextSteps: [
        "사용 가능한 연락처와 가장 중요한 여행 조건을 남깁니다.",
        "Homeground가 브리프를 검토하고 알맞은 여행안을 함께 다듬습니다.",
        "결제 전에 서면 범위, 견적, 시작 일정과 결제 정보를 받습니다.",
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

export function isHomepageStarterIntentId(
  value: string | null | undefined,
): value is HomepageStarterIntentId {
  return Boolean(
    value &&
      homepageStarterIntentIds.includes(value as HomepageStarterIntentId),
  );
}
