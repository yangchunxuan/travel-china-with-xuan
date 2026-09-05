import type { HomegroundLocale } from "./homegroundI18n";
import type { DestinationPlan } from "./destinationPlanner";
import type { RouteServiceId } from "./routeServiceInterest";

export const homepagePlanningIntentIds = ["conversation", "full-trip-support"] as const;

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
  contactPanelLabel: string;
  contactNoPayment: string;
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
    emailFallbackAction: string;
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

export function routeNeedsScopeConfirmation(
  _match: DestinationPlan,
  serviceId: RouteServiceId,
): boolean {
  return serviceId !== "full-trip-support";
}

const en: HomepagePlanningDeskCopy = {
  eyebrow: "Talk to a China trip planner",
  title: "Start with the easiest way to reach us.",
  contactPanelLabel: "WhatsApp, Messenger or email",
  contactNoPayment: "No payment to start.",
  starterPrompts: [
    {
      id: "arrange-trip",
      label: "Plan and help arrange the trip",
      planningIntent: "conversation",
    },
    {
      id: "self-book-route",
      label: "Help with selected trip arrangements",
      planningIntent: "conversation",
    },
    {
      id: "existing-route",
      label: "I have dates or existing bookings",
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
    emailFallbackAction: "Email Homeground directly",
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
      "The initial private-tour enquiry is free. We confirm the arrangements, inclusions and quotation for your dates and group before booking.",
  },
  outsideStandardScope: {
    priceLabel: "Scope & price to confirm",
    briefBody:
      "The initial private-tour enquiry is free. We confirm the arrangements, inclusions and quotation for your dates and group before booking.",
    scopeLabel: "Trip scope and quotation to confirm",
    scope:
      "The initial private-tour enquiry is free. We confirm the arrangements, inclusions and quotation for your dates and group before booking.",
    note: (label) =>
      `Requested service: ${label}. Trip scope and quotation must be confirmed before booking.`,
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
      "The private-tour arrangements you would like Homeground to handle",
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
  contactPanelLabel: "WhatsApp、Messenger 或邮箱",
  contactNoPayment: "",
  starterPrompts: [
    {
      id: "arrange-trip",
      label: "帮我规划并协调整趟旅行",
      planningIntent: "conversation",
    },
    {
      id: "self-book-route",
      label: "协助安排旅行中的部分服务",
      planningIntent: "conversation",
    },
    {
      id: "existing-route",
      label: "我已有日期或部分预订",
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
    emailFallbackAction: "直接发送邮件",
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
      "初次私家团询价免费。具体安排、包含项和报价会根据日期与同行人数在预订前确认。",
  },
  outsideStandardScope: {
    priceLabel: "范围与价格待确认",
    briefBody:
      "初次私家团询价免费。具体安排、包含项和报价会根据日期与同行人数在预订前确认。",
    scopeLabel: "旅行范围与报价待确认",
    scope:
      "初次私家团询价免费。具体安排、包含项和报价会根据日期与同行人数在预订前确认。",
    note: (label) =>
      `申请的服务：${label}。预订前确认旅行范围与报价。`,
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
      "希望 Homeground 负责哪些私家团安排",
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
  contactPanelLabel: "WhatsApp, Messenger 또는 이메일",
  contactNoPayment: "시작할 때 결제할 필요가 없습니다.",
  starterPrompts: [
    {
      id: "arrange-trip",
      label: "여행 전체 설계와 일부 예약·현지 조율이 필요해요",
      planningIntent: "conversation",
    },
    {
      id: "self-book-route",
      label: "일부 여행 준비를 맡기고 싶어요",
      planningIntent: "conversation",
    },
    {
      id: "existing-route",
      label: "날짜나 일부 예약이 있어요",
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
    emailFallbackAction: "Homeground에 직접 이메일 보내기",
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
      "첫 프라이빗 투어 문의는 무료입니다. 여행 날짜와 인원에 따른 준비, 포함 사항과 견적은 예약 전에 확인합니다.",
  },
  outsideStandardScope: {
    priceLabel: "범위·가격 확인 필요",
    briefBody:
      "첫 프라이빗 투어 문의는 무료입니다. 여행 날짜와 인원에 따른 준비, 포함 사항과 견적은 예약 전에 확인합니다.",
    scopeLabel: "여행 범위와 견적 확인 필요",
    scope:
      "첫 프라이빗 투어 문의는 무료입니다. 여행 날짜와 인원에 따른 준비, 포함 사항과 견적은 예약 전에 확인합니다.",
    note: (label) =>
      `요청 서비스: ${label}. 예약 전에 여행 범위와 견적을 확인합니다.`,
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
      "Homeground에 맡기고 싶은 프라이빗 투어 준비",
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
