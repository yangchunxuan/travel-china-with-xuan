import type { HomegroundLocale } from "./homegroundI18n";

export const tourGuideDecisionGuideId =
  "do-you-need-a-tour-guide-in-china" as const;

export interface TourGuideDecisionSource {
  title: string;
  url: string;
  note: string;
}

export interface TourGuideSupportType {
  name: string;
  bestFor: string;
  notFor: string;
}

export interface TourGuideDayDecision {
  label: string;
  title: string;
  decision: string;
  body: string;
}

export interface TourGuideDecisionSection {
  title: string;
  intro: string;
  paragraphs: readonly string[];
  listLabel: string;
  items: readonly string[];
  closing: string;
}

export interface TourGuideDecisionFaq {
  question: string;
  answer: string;
}

export interface TourGuideDecisionCopy {
  htmlLang: string;
  pagePath: string;
  homePath: string;
  guidesPath: string;
  plannerHref: string;

  metadata: {
    title: string;
    description: string;
    headline: string;
    schemaDescription: string;
    openGraphLocale: string;
    inLanguage: string;
    about: readonly string[];
    heroAlt: string;
  };

  skipLink: string;
  breadcrumb: { home: string; guides: string; current: string };

  hero: {
    eyebrow: string;
    reviewedLabel: string;
    reviewedDate: string;
    lead: readonly string[];
    imageAlt: string;
  };

  shortAnswer: {
    title: string;
    body: readonly string[];
    principle: string;
  };

  supportTypes: {
    title: string;
    intro: string;
    items: readonly TourGuideSupportType[];
  };

  dayDecision: {
    title: string;
    intro: string;
    items: readonly TourGuideDayDecision[];
  };

  independent: TourGuideDecisionSection;
  guideWorth: TourGuideDecisionSection;
  driverEnough: TourGuideDecisionSection;
  fullTrip: TourGuideDecisionSection;
  hybrid: TourGuideDecisionSection;

  checklist: {
    title: string;
    intro: string;
    items: readonly string[];
  };

  earlyCta: {
    label: string;
    title: string;
    detail: string;
    button: string;
  };

  finalCta: {
    label: string;
    title: string;
    detail: string;
    button: string;
  };

  related: {
    title: string;
    items: readonly { title: string; description: string; href: string }[];
  };

  faq: { title: string; items: readonly TourGuideDecisionFaq[] };
  sources: readonly TourGuideDecisionSource[];
  footer: string;
}

const SOURCE_URLS = {
  railway: "https://www.12306.cn/en/faq.html?item=1",
  palaceMuseum: "https://intl.dpm.org.cn/ticket_details.html",
  tourismLaw:
    "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2023/art_55b4bbc9a30547a9912e7ed61ffa7e20.html",
  shanghaiTravel:
    "https://english.shanghai.gov.cn/en-TravelServices/20240516/1b2805e883af4ee2a8317a31aa47fb6e.html",
  mctContract:
    "https://zwgk.mct.gov.cn/zfxxgkml/scgl/202601/t20260119_964189.html",
  firstTripDiscussion:
    "https://www.reddit.com/r/travelchina/comments/1vhvcwi/first_china_trip_is_it_worth_booking_a_tour/",
  cityGuideDiscussion:
    "https://www.reddit.com/r/travelchina/comments/1u3bux9/do_i_need_a_tour_guide_for_beijing_and_shanghai/",
  guidedValueDiscussion:
    "https://www.reddit.com/r/chinatravel/comments/1mtgin1/is_a_guided_tour_worth_it_or_too_much/",
  selectedDaysDiscussion:
    "https://www.reddit.com/r/chinatravel/comments/1qanpzx/advice_for_itinerary_for_november_2026/",
} as const;

const en: TourGuideDecisionCopy = {
  htmlLang: "en",
  pagePath: "/guides/do-you-need-a-tour-guide-in-china/",
  homePath: "/",
  guidesPath: "/guides/",
  plannerHref:
    "/?utm_source=website&utm_medium=guide&utm_campaign=tour-guide-decision&utm_content=free-consultation#planner-contact",

  metadata: {
    title: "Do You Need a Tour Guide in China? A Practical 2026 Guide",
    description:
      "Compare independent travel, selected guide days, driver-only support and a fully arranged private China trip—and choose what fits your group.",
    headline: "Do You Need a Tour Guide in China—or Better Trip Support?",
    schemaDescription:
      "A practical decision guide to travelling independently in China, hiring a guide for selected days, using a driver, or arranging a fully supported private trip.",
    openGraphLocale: "en_US",
    inLanguage: "en",
    about: [
      "Travelling independently in China",
      "Private tour guides in China",
      "China private tours",
      "China trip planning",
    ],
    heroAlt:
      "Historic Buddhist sculptures carved into the rock at the Longmen Grottoes in Luoyang.",
  },

  skipLink: "Skip to the decision guide",
  breadcrumb: {
    home: "Home",
    guides: "Travel guides",
    current: "Do you need a tour guide?",
  },

  hero: {
    eyebrow: "China travel decision guide",
    reviewedLabel: "Reviewed",
    reviewedDate: "9 August 2026",
    lead: [
      "No, you do not automatically need a tour guide in China. Foreign passport holders can book trains, reserve many attractions and use public transport without joining a tour.",
      "The better question is which days would local interpretation or coordination materially improve. For many travellers, the answer is a deliberate mix rather than a fully guided tour or complete independence.",
    ],
    imageAlt:
      "Historic Buddhist sculptures carved into the rock at the Longmen Grottoes in Luoyang.",
  },

  shortAnswer: {
    title: "The short answer",
    body: [
      "If you can compare routes, use translation and map apps, manage timed reservations and allow for small mistakes, many parts of China are realistic to travel independently. Major cities have extensive public transport and bookable travel inventory.",
      "A guide matters more at a history-heavy site, on a remote excursion with several hand-offs, inside a complex scenic area, or when a family’s pace must change in real time. Full-trip support fits travellers who want to transfer the entire coordination burden.",
      "Decide day by day, then connect those decisions into one workable route.",
    ],
    principle:
      "Use support where it changes the quality of the day; keep your independence where it does not.",
  },

  supportTypes: {
    title: "Five different things people mean by ‘a tour guide’",
    intro:
      "Before comparing offers, identify what you actually want. These services solve different problems and should not be treated as interchangeable.",
    items: [
      {
        name: "Travel completely independently",
        bestFor:
          "Travellers who enjoy research, manage bookings and want freedom over meals, mornings and route changes.",
        notFor:
          "Anyone expecting someone else to monitor reservations or solve missed connections.",
      },
      {
        name: "Driver or transfer only",
        bestFor:
          "Transfers, luggage-heavy moves, remote pick-ups or days when transport is the main need.",
        notFor:
          "Interpretation or an English-speaking companion unless explicitly included.",
      },
      {
        name: "A guide for selected days",
        bestFor:
          "Historical sites, food exploration, a complicated excursion, or a day with a child or older parent.",
        notFor: "Travellers wanting every booking coordinated as one system.",
      },
      {
        name: "Planning and booking support",
        bestFor:
          "Independent travellers wanting a workable route and help checking difficult reservations, but no daily companion.",
        notFor: "Groups needing real-time, in-person support or a vehicle.",
      },
      {
        name: "A fully arranged private trip",
        bestFor:
          "Travellers valuing one route, confirmed hand-offs and continuous responsibility between cities.",
        notFor:
          "Travellers who dislike structure or prefer to resolve every booking themselves.",
      },
    ],
  },

  earlyCta: {
    label: "Not sure how much support fits?",
    title: "Start with the trip, not a package",
    detail:
      "Tell us your dates, who is travelling, the cities you are considering and a rough budget. A real Homeground planner will help you identify which parts can stay independent and where support may be worth adding.",
    button: "Ask for a free consultation",
  },

  dayDecision: {
    title: "Make the decision one day at a time",
    intro:
      "A country-wide yes or no is too blunt. Put each important day through these four tests.",
    items: [
      {
        label: "01 · Access",
        title: "Can you book and reach it directly?",
        decision: "Usually independent",
        body: "If booking is clear, transport frequent and the meeting point easy to verify, a guide is not required for access. China Railway’s English service lets foreign passengers buy real-name tickets with valid passport details.",
      },
      {
        label: "02 · Meaning",
        title: "Would the place feel flat without context?",
        decision: "Consider a guide",
        body: "At a palace, temple or historic neighbourhood, value may come from interpretation. Decide whether you want discussion or whether your own reading and an audio guide are enough.",
      },
      {
        label: "03 · Friction",
        title: "How many moving parts are packed into the day?",
        decision: "Add targeted support",
        body: "A train, luggage move, distant attraction and evening reservation may each be manageable. Combine them under a tight clock and one delay matters more. Guides, drivers and coordinators solve different parts.",
      },
      {
        label: "04 · People",
        title: "Who needs the day to bend?",
        decision: "Plan around the group",
        body: "Children, limited mobility and different energy levels do not automatically require a guide. They make pace, vehicle access and contingency planning more important. Ask whether the service can adapt.",
      },
    ],
  },

  independent: {
    title: "When independent travel is a good choice",
    intro:
      "Independent travel in China is realistic for travellers who accept that convenience comes from preparation.",
    paragraphs: [
      "Foreign passengers can buy real-name rail tickets with valid passports through China Railway. Booking and translation tools reduce routine friction, but names, passport numbers, stations and reservation windows still need careful checking.",
      "Independence preserves freedom: stay longer over lunch, return to a neighbourhood, sleep after a late arrival or drop an uninteresting sight. Many experienced travellers value that control over perfect efficiency.",
    ],
    listLabel: "Independent travel is more likely to fit when:",
    items: [
      "your route concentrates on well-connected cities;",
      "you enjoy researching transport and reservations;",
      "your schedule has enough buffer for a wrong exit or changed plan;",
      "everyone in the group can manage a similar walking pace;",
      "you want flexibility more than continuous explanation.",
    ],
    closing:
      "Possible is not effortless. DIY moves the coordination work to you; it does not remove it.",
  },

  guideWorth: {
    title: "When a guide is worth paying for",
    intro:
      "A good guide should change the day. Value is clearest when knowledge, timing and human judgement interact.",
    paragraphs: [
      "At a historical site, a guide can connect buildings and events into a coherent story and answer questions. In a large scenic area, value may be choosing routes based on weather and the group’s energy.",
      "A first day or food-focused day can also benefit from local help. The gain is personal: travellers who prefer solitude or have researched deeply may need less.",
    ],
    listLabel: "A selected guide day is easier to justify when:",
    items: [
      "you care about history, culture or local conversation, not only photographs;",
      "the day has several reservations, transfers or route choices;",
      "you have limited time and cannot simply return tomorrow;",
      "the group needs flexible pacing or active coordination;",
      "you want help making sense of a place rather than just reaching it.",
    ],
    closing:
      "Ask what the guide will do that you would not do alone. Specifics matter more than a sight list.",
  },

  driverEnough: {
    title: "When a driver may be enough",
    intro:
      "Sometimes the difficult part is the road, luggage or distance—not the visit. Then a full guide may solve the wrong problem.",
    paragraphs: [
      "A pre-arranged transfer can simplify a late arrival, remote hotel or heavy bags. A vehicle can reduce walking between disconnected stops. It is transport support and should be described that way.",
      "Do not assume a driver is a guide, speaks your language or enters attractions. Confirm vehicle size, luggage, waiting time, pick-up, overtime and the contact for changed arrival times.",
    ],
    listLabel: "Driver-only support can fit:",
    items: [
      "airport or station transfers;",
      "remote day trips where public transport consumes too much time;",
      "groups with luggage, a stroller or limited walking tolerance;",
      "days where you already understand the attraction and only need reliable transport.",
    ],
    closing:
      "If you need interpretation and transport, confirm whether the quote provides two people or one clearly defined role.",
  },

  fullTrip: {
    title: "When full-trip support makes sense",
    intro:
      "A fully arranged private trip is not simply more guiding. Its product is continuity between bookings and cities.",
    paragraphs: [
      "It becomes more useful across several cities, multiple station or airport hand-offs, a large family or a timetable with little room for delay. One team can retain the agreed pace, room requirements and transport plan.",
      "The trade-off is structure. Free evenings and independent days must be designed deliberately. A proposal that fills every hour or treats shopping as sightseeing is a poor proposal, not an inevitable feature of private travel.",
    ],
    listLabel: "Before accepting full-trip support, confirm:",
    items: [
      "which company is contracting with you and which local operators will deliver services;",
      "the hotels or hotel standard, room type and breakfast arrangement;",
      "whether trains, domestic flights, tickets, meals, guides and vehicles are included;",
      "how much free time remains and how changes are handled;",
      "whether any shopping stops or optional paid activities are built into the route.",
    ],
    closing:
      "The 2026 model contracts are a useful reminder: inclusions, hand-offs, shopping and optional activities should become clearer before payment, not vaguer.",
  },

  hybrid: {
    title: "For many travellers, the hybrid trip is the sensible middle",
    intro:
      "A hybrid trip keeps easy days independent and adds people where they create clear value. It can be the original design.",
    paragraphs: [
      "A couple might take trains and explore cities alone, hire a guide for one historical day and use a driver for a remote excursion. A family might arrange transfers and one adaptable guided day. Another traveller may buy planning help but no daily guide.",
      "The hand-offs must be visible: who holds each booking, where your responsibility begins and whom to contact when a supported segment changes. Unrelated bookings do not automatically form a coherent plan.",
    ],
    listLabel: "A workable hybrid plan identifies:",
    items: [
      "the days you genuinely want to explore alone;",
      "the days where interpretation or local judgement matters;",
      "the transfers where a vehicle removes disproportionate friction;",
      "the reservations that must be checked before the trip;",
      "one clear contact for every paid service.",
    ],
    closing:
      "Buy the right support while preserving the freedom you came to enjoy.",
  },

  checklist: {
    title: "Eight questions to ask before booking a guide or private trip",
    intro:
      "A polished itinerary does not tell you who will actually deliver it. Ask for operational answers before paying.",
    items: [
      "Who contracts with you, and who operates locally?",
      "Is the guide agency-assigned and licensed?",
      "Which language is confirmed?",
      "What are the hours, meeting point, overtime and cancellation terms?",
      "Which tickets, transport, meals, tips, driver and vehicle are included?",
      "Are there shopping stops or optional paid activities?",
      "Can the pace change for your group, weather or delays?",
      "What remains your responsibility, and who is the emergency contact?",
    ],
  },

  related: {
    title: "Plan the rest of the decision",
    items: [
      {
        title: "Beijing–Zhangjiajie–Shanghai: Train or Flight?",
        description:
          "Compare the real door-to-door time before fixing the route around transport.",
        href: "/guides/beijing-zhangjiajie-shanghai-transport/",
      },
      {
        title: "Is Your China Itinerary Too Rushed?",
        description:
          "Check how much usable time remains after transfers and reservations.",
        href: "/guides/is-your-china-itinerary-too-rushed/",
      },
      {
        title: "China with Older Parents",
        description: "Review walking, transfers, hotel bases and buffer time.",
        href: "/guides/china-itinerary-with-older-parents/",
      },
    ],
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "Can I travel around China without a tour guide?",
        answer:
          "Yes. Visitors can book trains, hotels and attractions and use public transport independently. The work is preparation, accurate passport details, reservation timing and unfamiliar apps—not a requirement to join a tour.",
      },
      {
        question: "Do I need a guide in Beijing or Shanghai?",
        answer:
          "Not for ordinary access or transport. A guide may still add historical interpretation, manage a tight excursion or adapt a group’s pace. Decide by the day, not the whole city.",
      },
      {
        question: "Can a guide get tickets that I cannot buy myself?",
        answer:
          "Do not assume so. Attractions have real-name rules. The Palace Museum does not authorize third-party ticket agents. A guide may explain the process but cannot promise unavailable inventory.",
      },
      {
        question: "Is a driver the same as a guide?",
        answer:
          "No. A driver provides transport; a guide provides interpretation and visitor services. Confirm roles, language and inclusions.",
      },
      {
        question: "Should families or older travellers always book a guide?",
        answer:
          "No. Consider mobility, pace, group size, transport and the coordination your family wants to carry. The service must adapt to your actual needs.",
      },
      {
        question: "How do I check whether a guide or agency is legitimate?",
        answer:
          "Ask for the contracting company, travel-agency licence, operating party and written inclusions. Chinese law requires guides to be agency-assigned rather than privately soliciting work.",
      },
    ],
  },

  finalCta: {
    label: "A free first conversation",
    title: "Work out where support would actually help",
    detail:
      "Send your travel dates, who is coming, the cities you are considering and a rough budget. We will start with your group and route, then discuss which parts can remain independent and which may deserve local support. No completed itinerary is required.",
    button: "Start a free trip consultation",
  },

  sources: [
    {
      title: "China Railway 12306 · English ticketing FAQ",
      url: SOURCE_URLS.railway,
      note: "Official foreign-passenger ticketing guidance.",
    },
    {
      title: "Palace Museum · Ticketing information",
      url: SOURCE_URLS.palaceMuseum,
      note: "Official reservation and ticket-agent information.",
    },
    {
      title: "Tourism Law of the People’s Republic of China",
      url: SOURCE_URLS.tourismLaw,
      note: "Official guide certification and assignment rules.",
    },
    {
      title: "Shanghai Government · Common tourism issues",
      url: SOURCE_URLS.shanghaiTravel,
      note: "Official English licence-check guidance.",
    },
    {
      title:
        "Ministry of Culture and Tourism & SAMR · 2026 model package-tour contracts",
      url: SOURCE_URLS.mctContract,
      note: "Official overview of the 2026 model contracts, including clearer rules for service scope, shopping and optional activities.",
    },
    {
      title: "Traveller discussion · First China trip: tour or independent?",
      url: SOURCE_URLS.firstTripDiscussion,
      note: "A 2026 discussion used to identify questions, not universal outcomes.",
    },
    {
      title: "Traveller discussion · Guides in Beijing and Shanghai",
      url: SOURCE_URLS.cityGuideDiscussion,
      note: "A 2026 discussion of independent cities and selective guides.",
    },
    {
      title: "Traveller discussion · Is a guided tour worth it?",
      url: SOURCE_URLS.guidedValueDiscussion,
      note: "A 2025 discussion of value and hybrid travel.",
    },
    {
      title: "Traveller discussion · Hiring guides for selected days",
      url: SOURCE_URLS.selectedDaysDiscussion,
      note: "A 2026 discussion; individual experiences are anecdotal.",
    },
  ],
  footer:
    "Rules change. Recheck operators and attractions before travel. Traveller discussions show questions, not guaranteed outcomes.",
};

const zh: TourGuideDecisionCopy = {
  htmlLang: "zh-CN",
  pagePath: "/zh/guides/do-you-need-a-tour-guide-in-china/",
  homePath: "/zh/",
  guidesPath: "/zh/guides/",
  plannerHref:
    "/zh/?utm_source=website&utm_medium=guide&utm_campaign=tour-guide-decision&utm_content=free-consultation#planner-contact",

  metadata: {
    title: "来中国旅游需要导游吗？2026 年实用选择指南",
    description:
      "比较自由行、单日导游、包车、路线协助和全程私人服务，按同行者、行程难度与预算选择合适的支持程度。",
    headline: "去中国旅行需要导游，还是需要更合适的旅行协助？",
    schemaDescription:
      "帮助来华游客在完全自由行、部分日期请导游、单独用车、路线协助和全程私人服务之间作出选择。",
    openGraphLocale: "zh_CN",
    inLanguage: "zh-CN",
    about: ["中国自由行", "中国私人导游", "中国私人旅行", "中国旅行规划"],
    heroAlt: "洛阳龙门景区岩壁上的古代宗教造像。",
  },

  skipLink: "跳到选择指南",
  breadcrumb: { home: "首页", guides: "旅行指南", current: "需要导游吗" },

  hero: {
    eyebrow: "中国旅行选择指南",
    reviewedLabel: "复核日期",
    reviewedDate: "2026 年 8 月 9 日",
    lead: [
      "来中国旅游，并不是一定要请导游。外国游客可以使用护照购买火车票、预订许多景点，也可以在大城市依靠公共交通完成自由行。",
      "但这不代表导游没有价值。真正该问的是：哪些天自己走就很顺，哪些天有当地人讲解、带路或协调，体验会明显更好？很多人的最佳答案既不是全程跟团，也不是所有事情都自己处理，而是有选择地组合。",
    ],
    imageAlt: "洛阳龙门景区岩壁上的古代宗教造像。",
  },

  shortAnswer: {
    title: "先说结论",
    body: [
      "如果你愿意比较路线、使用翻译和地图工具、处理实名预约，也能接受偶尔走错出口或临时调整，那么中国很多地方都可以自己旅行。北京、上海、西安、成都、广州等大城市，公共交通成熟，可预订的酒店和交通信息也很多。",
      "当一天的价值不只在“到达”时，导游才更容易体现作用。比如你希望真正理解一处历史遗址；一次城外行程包含多次换乘；景区内部路线复杂；或者一家人的体力、休息和用车需要随时调整。若你连城市顺序、酒店、交通和交接都不想自己统筹，全程规划与接待才可能更合适。",
      "不要一次性判断‘在中国要不要导游’，而要逐日判断，再把这些天连接成一条顺畅的路线。",
    ],
    principle:
      "真正值得买的支持，应该改变当天的质量；没有明显价值的部分，就保留自由。",
  },

  supportTypes: {
    title: "大家说的“请导游”，其实可能是五种不同服务",
    intro:
      "先弄清自己要解决什么问题，再比较价格。下面五种服务承担的责任并不一样。",
    items: [
      {
        name: "完全自由行",
        bestFor:
          "喜欢自己研究、能独立预订，并且希望每天可以临时改变吃饭、起床和游览安排的人。",
        notFor:
          "希望有人持续检查预约、处理误车或临时变化，并在途中替你协调的人。",
      },
      {
        name: "只安排司机或接送",
        bestFor:
          "机场和车站接送、携带大件行李、酒店位置偏远，或当天主要困难只是点到点交通。",
        notFor:
          "历史讲解、景点路线设计或全程外语陪同，除非报价中明确包含这些内容。",
      },
      {
        name: "只在关键日期请导游",
        bestFor:
          "历史文化内容较重、城外交通复杂、想深入体验美食，或需要照顾孩子和长辈节奏的某一两天。",
        notFor: "希望酒店、城际交通、所有预约和每天交接都由一个团队统筹的人。",
      },
      {
        name: "只做路线和预订协助",
        bestFor:
          "想自己走，但希望有人把城市顺序、住宿位置和较难的预约先检查清楚的人。",
        notFor: "需要旅途中实时处理问题、安排车辆，或希望每天有人陪同的团队。",
      },
      {
        name: "全程私人规划与接待",
        bestFor:
          "重视连续性的人：一条完整路线、清楚的交接、事先确认的服务范围，以及跨城市有人负责。",
        notFor:
          "不喜欢任何结构、习惯每天早上才决定去哪里，或本来就享受自己解决所有预订的人。",
      },
    ],
  },

  earlyCta: {
    label: "不确定需要多少支持？",
    title: "先谈旅程，不必先选套餐",
    detail:
      "告诉我们日期、同行者、考虑中的城市和大致预算。Homeground 的真人规划人员会先帮你看哪些部分适合自己走，哪些环节可能值得增加支持。",
    button: "免费聊聊我的行程",
  },

  dayDecision: {
    title: "按每一天作决定",
    intro: "用一个答案概括整个中国过于笼统。每个重要日程都可以问下面四个问题。",
    items: [
      {
        label: "01 · 可达性",
        title: "你能否直接预订并自己到达？",
        decision: "通常可以自由行",
        body: "如果官方预订方式清楚、交通班次多、集合地点容易确认，导游更多是提升舒适度，而不是进入景点或乘车的前提。中国铁路英文服务允许外国旅客使用有效护照信息实名购票。",
      },
      {
        label: "02 · 理解深度",
        title: "如果没有背景讲解，这个地方会不会只剩拍照？",
        decision: "可以考虑导游",
        body: "宫殿、宗教场所、历史街区和考古遗址的价值，往往不只在建筑本身。你需要判断自己想听完整脉络并随时追问，还是提前阅读加语音导览已经足够。",
      },
      {
        label: "03 · 环节数量",
        title: "这一天塞进了多少个必须衔接的步骤？",
        decision: "增加针对性支持",
        body: "火车、行李转运、城外景点、景区内部交通和晚餐预约，单独看都可能不难；如果全部挤在严格时间表里，一次延误的代价就会放大。导游、司机和行程协调分别解决不同问题。",
      },
      {
        label: "04 · 同行者",
        title: "谁需要行程随时调整？",
        decision: "围绕人来安排",
        body: "孩子、行动不便、饮食需求或体力差异，并不等于必须请导游。但这些情况会让用车、休息点、步行量和备用方案更重要。应该问的是服务人员能否真正为这组客人调整。",
      },
    ],
  },

  independent: {
    title: "什么情况下适合自己旅行",
    intro:
      "在中国自由行是很现实的选择。它最适合愿意把准备工作换成旅行自由的人，而不是期待所有流程都和自己的国家一模一样。",
    paragraphs: [
      "外国旅客可以通过中国铁路官方系统，用有效护照购买实名火车票。大型预订平台也让酒店和交通更容易比较，翻译工具能够解决许多日常沟通。但姓名、护照号、车站名称和预约开放时间，仍然需要自己认真核对。",
      "自由行最大的收益不是省下一个人，而是掌握自己的时间。午餐喜欢就多坐一会儿，晚上再回到喜欢的街区，前一天太累就晚点出门，不感兴趣的景点也可以随时删掉。对有经验的旅行者来说，这种控制感可能比一天走完多少地方更重要。",
    ],
    listLabel: "下面这些情况更适合自由行：",
    items: [
      "路线主要由交通方便的大城市组成；",
      "你本来就喜欢研究交通和预约；",
      "日程留有走错路或临时改变的缓冲；",
      "同行者的步行能力和节奏比较接近；",
      "你重视自由度，胜过持续讲解。",
    ],
    closing:
      "“可以自己走”不等于“完全不用费力”。自由行只是把协调工作交给了你自己，并没有让这些工作消失。",
  },

  guideWorth: {
    title: "什么情况下导游值得花钱",
    intro:
      "好的导游应该让这一天发生变化，而不是只跟在旁边。最明显的价值，通常出现在知识、时间和现场判断互相影响的时候。",
    paragraphs: [
      "在历史景点，导游可以把建筑、历史制度和时代变化串成一个能听懂的故事，也能根据你的兴趣继续追问。在大型景区，价值可能是根据天气和体力选择路线，并及时放弃地图上看起来很顺、实际体验却不好的组合。",
      "刚到中国的第一天，或以当地饮食为重点的一天，也可能适合有人陪同。前者帮助你快速熟悉当地节奏，后者的价值来自点餐、街区经验和人与人的交流。不过这些收益很个人化：喜欢独处、准备充分的人未必需要同样的服务。",
    ],
    listLabel: "以下情况更容易让单日导游产生价值：",
    items: [
      "你想理解历史、文化和当地生活，而不只是拍照；",
      "一天里有多次预约、换乘或路线选择；",
      "时间很紧，错过后无法第二天再来；",
      "团队需要随时改变节奏或有人现场协调；",
      "你需要的是理解一个地方，而不只是抵达。",
    ],
    closing:
      "预订前直接问：这名导游会做哪些我自己做不到或不想做的事？具体回答比一串景点名称更有用。",
  },

  driverEnough: {
    title: "什么时候只要司机就够了",
    intro:
      "有些日子的难点只是路程、行李或距离，并不是参观本身。此时购买全程讲解，可能并没有解决你真正的问题。",
    paragraphs: [
      "提前安排接送，可以简化深夜抵达、清晨出发、偏远酒店和携带大件行李的移动。对家庭来说，车辆也能减少几个分散景点之间的无效步行。这属于交通服务，应该用交通服务的范围来确认。",
      "不要默认司机同时具备导游资质、会使用你的语言、会陪同进入景点，或能够重新设计当天行程。应事先确认车型、行李容量、等候时间、接车位置、超时规则，以及航班或火车变化后联系谁。",
    ],
    listLabel: "只用车通常适合：",
    items: [
      "机场或火车站接送；",
      "公共交通耗时过长的城外行程；",
      "携带行李、童车或不适合长距离步行的团队；",
      "你已经了解景点，只缺稳定的点到点交通。",
    ],
    closing:
      "如果既需要讲解又需要车辆，要确认报价提供的是独立司机加导游，还是由一人承担明确写出的工作内容。",
  },

  fullTrip: {
    title: "什么时候适合全程规划与接待",
    intro:
      "全程私人服务并不只是“多请几天导游”。它真正提供的是城市之间、预订之间和服务人员之间的连续性。",
    paragraphs: [
      "当路线跨越多个城市，包含多次车站或机场交接，同行人数多，或者几乎没有延误空间时，全程统筹的理由会变强。带长辈或孩子的家庭，也可能希望同一个团队从开始就了解步行量、房间和交通需求。",
      "它的代价是一定程度的结构。私人行程当然可以保留自由活动和空白晚上，但必须主动设计。如果方案把每个小时都塞满、每天过早出发，或者把购物点当成景点，问题不在于私人旅行，而在于这份方案和合同本身。",
    ],
    listLabel: "确认全程服务前，要问清：",
    items: [
      "谁与你签约，实际由哪些当地服务方执行；",
      "酒店名称或等级、房型与早餐安排；",
      "火车、国内航班、门票、餐食、导游和车辆是否包含；",
      "行程保留多少自由时间，临时变化如何处理；",
      "是否包含购物点或另行付费的自选项目。",
    ],
    closing:
      "2026 年版团队旅游合同示范文本提醒我们：服务包含内容、实际执行方、购物和另行付费项目，越接近付款越应该写得清楚，而不是越来越模糊。",
  },

  hybrid: {
    title: "对很多人来说，混合安排才是最自然的答案",
    intro:
      "简单的日子自己走，只在价值明显的地方增加人员。这不是规划失败后的妥协，而是可以从一开始就采用的方式。",
    paragraphs: [
      "一对情侣可以自己乘火车和逛市中心，在历史内容较重的一天请导游，在偏远城外游览时单独安排司机。家庭可以把轻松的城市日留给自己，只安排接送和一个可随时调整的导览日。也有人只请人检查路线与关键预约，实际旅行时不需要每天陪同。",
      "这种方式成立的前提是交接清楚。每个预订由谁持有，哪一段开始需要自己负责，已经购买的服务发生变化时联系谁，都应该事先知道。把许多互不相干的订单放在一起，并不会自动变成一条完整路线。",
    ],
    listLabel: "一条可执行的混合路线应标明：",
    items: [
      "哪些天你确实想完全自己探索；",
      "哪些天讲解或当地判断会带来明显价值；",
      "哪些转移用车后能大幅减少麻烦；",
      "哪些预约必须在出发前重点核对；",
      "每项付费服务对应的明确联系人。",
    ],
    closing:
      "目标不是一味减少服务，而是只购买真正有用的部分，同时保留你想要的旅行自由。",
  },

  checklist: {
    title: "预订导游或私人行程前，问清这 8 件事",
    intro: "漂亮的行程单不能说明最终由谁执行。付款前应得到可以落地的回答。",
    items: [
      "与你签约的是哪家公司，实际接待方是谁？",
      "导游是否通过旅行社委派，并具备相应资质？",
      "导游使用什么语言，这个人已经确认还是仍在申请？",
      "每天工作时间、集合地点、超时费用和取消规则是什么？",
      "门票、景区内部交通、索道、餐食、小费、司机和车辆是否包含？",
      "行程是否包含购物点、返佣点或标题价格中看不出来的自费项目？",
      "能否根据团队节奏调整，天气或延误改变计划后如何处理？",
      "哪些预订仍需你自己负责，服务期间的紧急联系人是谁？",
    ],
  },

  related: {
    title: "继续完成你的旅行决策",
    items: [
      {
        title: "北京—张家界—上海：坐高铁还是飞机？",
        description:
          "先比较两段交通的真实门到门时间，再决定路线应该怎样衔接。",
        href: "/zh/guides/beijing-zhangjiajie-shanghai-transport/",
      },
      {
        title: "你的中国行程是不是太赶了？",
        description:
          "检查交通、换酒店和固定预约之后，还剩多少真正可以使用的时间。",
        href: "/zh/guides/is-your-china-itinerary-too-rushed/",
      },
      {
        title: "带父母来中国，行程应该怎么调整？",
        description: "先考虑步行量、换乘、住宿位置和缓冲，再决定需要哪种支持。",
        href: "/zh/guides/china-itinerary-with-older-parents/",
      },
    ],
  },

  faq: {
    title: "常见问题",
    items: [
      {
        question: "外国游客可以不跟团，在中国自己旅行吗？",
        answer:
          "可以。很多游客会自己预订火车、酒店和景点，并使用公共交通。真正需要承担的是提前准备、正确填写护照信息、掌握预约时间，以及适应不熟悉的应用，而不是法律上必须参团。",
      },
      {
        question: "北京和上海需要导游吗？",
        answer:
          "日常交通和普通参观并不要求导游。但如果你重视历史讲解、城外行程时间很紧，或者同行者需要特别调整节奏，某一天请导游仍可能值得。不要简单给整座城市贴上容易或困难的标签。",
      },
      {
        question: "导游能买到我自己买不到的门票吗？",
        answer:
          "不要这样假设。大型景点有自己的实名预约规则。故宫博物院明确表示未授权任何第三方机构或个人代理门票。导游可以帮助理解流程，但不能承诺并不存在的余票。",
      },
      {
        question: "司机和导游是一回事吗？",
        answer:
          "不是。司机提供交通，导游提供讲解和游客服务。有些安排同时包含两者，但应分别确认工作内容、语言和具体包含内容，不能只看车辆报价自行推断。",
      },
      {
        question: "带孩子或长辈就一定要请导游吗？",
        answer:
          "不一定。真正的判断因素是行动能力、节奏、团队人数、交通复杂度，以及家人愿意自己承担多少协调。只有服务确实能够为这组人调整，导游才有价值。",
      },
      {
        question: "如何确认导游或旅行社是否正规？",
        answer:
          "要求提供签约公司名称、旅行社许可信息、实际执行方和书面服务范围。中国《旅游法》规定，导游应由旅行社委派，不得私自接受导游业务。",
      },
    ],
  },

  finalCta: {
    label: "先免费聊一次",
    title: "判断哪些地方真的值得增加支持",
    detail:
      "把旅行日期、同行者、考虑中的城市和大致预算发给我们。我们会先从你们这组人和路线出发，再讨论哪些部分适合自己走，哪些环节值得安排当地支持。不需要提前准备完整行程单。",
    button: "开始免费旅行咨询",
  },

  sources: [
    {
      title: "中国铁路 12306 · 英文购票常见问题",
      url: SOURCE_URLS.railway,
      note: "关于外国旅客使用有效护照实名购买火车票的官方说明。",
    },
    {
      title: "故宫博物院 · 购票信息",
      url: SOURCE_URLS.palaceMuseum,
      note: "关于预约、身份证件和第三方门票代理的官方信息。",
    },
    {
      title: "《中华人民共和国旅游法》",
      url: SOURCE_URLS.tourismLaw,
      note: "导游资格与旅行社委派等规定，见第三十七条和第四十条。",
    },
    {
      title: "上海市政府 · 旅游常见问题",
      url: SOURCE_URLS.shanghaiTravel,
      note: "核验营业执照、旅行社业务许可和寻求帮助的英文官方说明。",
    },
    {
      title: "文化和旅游部、市场监管总局 · 2026 年版团队旅游合同示范文本",
      url: SOURCE_URLS.mctContract,
      note: "官方介绍了示范文本对服务范围、购物和另行付费项目等内容的完善。",
    },
    {
      title: "游客讨论 · 第一次去中国，跟团还是自由行？",
      url: SOURCE_URLS.firstTripDiscussion,
      note: "2026 年公开讨论，仅用于识别反复出现的问题，不能代表所有游客。",
    },
    {
      title: "游客讨论 · 北京和上海是否需要导游",
      url: SOURCE_URLS.cityGuideDiscussion,
      note: "2026 年公开讨论，同时呈现大城市自由行和选择性讲解需求。",
    },
    {
      title: "游客讨论 · 导览服务是否值得",
      url: SOURCE_URLS.guidedValueDiscussion,
      note: "2025 年关于成本、自由度、文化理解与混合旅行的公开讨论。",
    },
    {
      title: "游客讨论 · 只在部分日期请导游",
      url: SOURCE_URLS.selectedDaysDiscussion,
      note: "2026 年公开讨论，用于说明混合方式；个人经历仅属个案。",
    },
  ],
  footer:
    "官方规定和预订流程可能变化，出发前请再次核对相关运营方与景点。游客讨论用于呈现真实问题，不用于推算成功率，也不保证任何具体体验。",
};

const ko: TourGuideDecisionCopy = {
  htmlLang: "ko",
  pagePath: "/ko/guides/do-you-need-a-tour-guide-in-china/",
  homePath: "/ko/",
  guidesPath: "/ko/guides/",
  plannerHref:
    "/ko/?utm_source=website&utm_medium=guide&utm_campaign=tour-guide-decision&utm_content=free-consultation#planner-contact",

  metadata: {
    title: "중국 여행에 가이드가 필요할까? 2026 실전 선택 가이드",
    description:
      "자유여행, 필요한 날만 가이드, 차량, 일정 지원, 전 일정 프라이빗 여행을 비교해 동행과 예산에 맞는 방식을 고르세요.",
    headline: "중국 여행에 가이드가 필요할까, 더 알맞은 지원이 필요할까?",
    schemaDescription:
      "중국 자유여행, 일부 일정 가이드, 차량만 이용하기, 일정 지원과 전 일정 프라이빗 여행 사이에서 선택하는 실전 가이드.",
    openGraphLocale: "ko_KR",
    inLanguage: "ko",
    about: [
      "중국 자유여행",
      "중국 현지 가이드",
      "중국 프라이빗 여행",
      "중국 여행 계획",
    ],
    heroAlt: "중국 허난 용문석굴 암벽에 조각된 역사적인 불교 석상.",
  },

  skipLink: "선택 가이드로 바로 가기",
  breadcrumb: {
    home: "홈",
    guides: "여행 가이드",
    current: "가이드가 필요할까",
  },

  hero: {
    eyebrow: "중국 여행 선택 가이드",
    reviewedLabel: "검토일",
    reviewedDate: "2026년 8월 9일",
    lead: [
      "중국을 여행한다고 해서 반드시 가이드를 고용해야 하는 것은 아닙니다. 외국 여권으로 기차표를 사고, 여러 관광지를 예약하고, 대도시의 대중교통을 이용해 자유여행을 할 수 있습니다.",
      "그렇다고 가이드가 쓸모없다는 뜻도 아닙니다. 더 좋은 질문은 ‘어느 날 현지 설명이나 조율이 여행의 질을 실제로 바꿀까?’입니다. 많은 여행자에게 맞는 답은 전 일정 가이드도, 모든 일을 혼자 하는 것도 아닌 선별적인 조합입니다.",
    ],
    imageAlt: "중국 허난 용문석굴 암벽에 조각된 역사적인 불교 석상.",
  },

  shortAnswer: {
    title: "먼저 결론부터",
    body: [
      "동선을 비교하고 번역·지도 앱을 쓰며 실명 예약을 직접 처리할 수 있고, 작은 시행착오를 받아들일 수 있다면 중국의 많은 지역을 자유여행으로 다닐 수 있습니다. 베이징, 상하이, 시안, 청두, 광저우 같은 대도시는 대중교통망이 넓고 예약 가능한 숙소와 교통편도 많습니다.",
      "가이드는 앱으로 재현하기 어려운 날에 더 가치가 있습니다. 역사적 배경이 중요한 유적, 여러 번 갈아타야 하는 도심 밖 일정, 내부 동선이 복잡한 관광지, 아이나 부모님의 컨디션에 맞춰 실시간으로 속도를 바꿔야 하는 날이 대표적입니다. 도시 순서부터 호텔, 이동, 현장 인계까지 모두 맡기고 싶다면 전 일정 지원을 검토할 수 있습니다.",
      "중국 전체를 한 번에 ‘가이드 필요’ 또는 ‘불필요’로 결정하지 마세요. 하루씩 판단한 뒤 하나의 실행 가능한 여행으로 연결하는 편이 정확합니다.",
    ],
    principle:
      "그날의 경험을 실제로 바꾸는 곳에는 지원을 쓰고, 그렇지 않은 날에는 자유를 남겨 두세요.",
  },

  supportTypes: {
    title: "‘가이드 여행’이라는 말 안에 들어 있는 다섯 가지 방식",
    intro:
      "무엇을 해결하고 싶은지 먼저 정해야 견적을 제대로 비교할 수 있습니다. 아래 서비스는 서로 다른 책임을 집니다.",
    items: [
      {
        name: "완전한 자유여행",
        bestFor:
          "검색과 예약을 즐기고, 식사·출발 시간·동선을 현장에서 자유롭게 바꾸고 싶은 여행자.",
        notFor:
          "누군가가 예약을 계속 확인하고, 연결편 문제와 갑작스러운 변경을 대신 조율해 주길 원하는 경우.",
      },
      {
        name: "기사 또는 픽업만 이용",
        bestFor:
          "공항·역 이동, 짐이 많은 날, 도심 밖 숙소, 또는 문 앞에서 문 앞까지의 교통이 핵심인 일정.",
        notFor:
          "역사 해설, 관광 동선 설계, 선호 언어로의 동행. 견적에 명시되어 있지 않다면 포함된 것으로 보면 안 됩니다.",
      },
      {
        name: "필요한 날만 가이드",
        bestFor:
          "역사 유적, 음식 탐방, 복잡한 도심 밖 일정, 아이나 부모님과 함께하는 하루처럼 현장 판단이 중요한 날.",
        notFor:
          "호텔, 도시 간 이동, 모든 예약과 인계를 한 팀이 전부 관리해 주길 원하는 경우.",
      },
      {
        name: "일정·예약 지원만 받기",
        bestFor:
          "직접 여행하되 도시 순서, 숙소 위치, 까다로운 예약만 미리 점검받고 싶은 여행자.",
        notFor:
          "여행 중 실시간 문제 해결, 차량 또는 매일 현장에 있는 담당자가 필요한 경우.",
      },
      {
        name: "전 일정 프라이빗 진행",
        bestFor:
          "한 동선, 확인된 인계, 명확한 포함 사항, 도시가 바뀌어도 이어지는 책임을 중요하게 보는 여행자.",
        notFor:
          "정해진 구조를 원하지 않고 매일 아침 목적지를 정하거나 모든 예약을 직접 해결하는 과정을 즐기는 경우.",
      },
    ],
  },

  earlyCta: {
    label: "어느 정도의 지원이 맞을지 모르겠다면",
    title: "상품보다 여행 이야기부터 시작하세요",
    detail:
      "날짜, 동행, 생각 중인 도시와 대략적인 예산을 알려 주세요. Homeground의 실제 플래너가 자유여행으로 남겨도 좋은 부분과 지원을 더할 만한 구간을 함께 살펴봅니다.",
    button: "무료 여행 상담하기",
  },

  dayDecision: {
    title: "하루씩 나눠서 결정하기",
    intro:
      "중국 전체에 하나의 답을 붙이는 것은 너무 거칩니다. 중요한 하루마다 다음 네 가지를 확인해 보세요.",
    items: [
      {
        label: "01 · 접근",
        title: "직접 예약하고 찾아갈 수 있나요?",
        decision: "대체로 자유여행 가능",
        body: "공식 예약 경로가 명확하고, 교통편이 자주 있으며, 만나는 장소를 쉽게 확인할 수 있다면 가이드는 편의를 더할 뿐 입장 조건은 아닙니다. 중국철도 영문 서비스에서는 외국인 승객도 유효한 여권 정보로 실명 승차권을 구매할 수 있습니다.",
      },
      {
        label: "02 · 배경",
        title: "설명이 없으면 사진만 남을 장소인가요?",
        decision: "가이드 검토",
        body: "궁궐, 사찰, 역사 지구와 유적지는 건물만 보는 것보다 시대와 사람의 이야기를 이해할 때 가치가 커질 수 있습니다. 질문을 주고받을 해설이 필요한지, 사전 독서와 오디오 가이드로 충분한지 판단하세요.",
      },
      {
        label: "03 · 복잡도",
        title: "하루에 몇 개의 연결 단계가 있나요?",
        decision: "필요한 부분만 지원",
        body: "기차, 짐 이동, 도심 밖 관광지, 내부 셔틀, 저녁 예약은 각각 혼자 처리할 수 있습니다. 하지만 여유 없는 시간표 안에 한꺼번에 들어가면 한 번의 지연이 커집니다. 가이드, 기사, 일정 코디네이터는 서로 다른 부분을 해결합니다.",
      },
      {
        label: "04 · 동행",
        title: "누구의 컨디션에 맞춰 하루를 바꿔야 하나요?",
        decision: "사람 중심으로 설계",
        body: "어린아이, 이동 제약, 식사 요구, 체력 차이가 있다고 무조건 가이드가 필요한 것은 아닙니다. 다만 차량 접근, 휴식, 도보량과 대안이 더 중요해집니다. 제안받은 서비스가 실제로 이를 조정할 수 있는지 물어보세요.",
      },
    ],
  },

  independent: {
    title: "자유여행이 잘 맞는 경우",
    intro:
      "중국 자유여행은 충분히 현실적인 선택입니다. 다만 익숙한 나라와 모든 과정이 같기를 기대하기보다, 준비에 들인 시간을 자유와 바꾸려는 사람에게 더 잘 맞습니다.",
    paragraphs: [
      "외국인 승객은 중국철도 공식 시스템에서 유효한 여권으로 실명 승차권을 구매할 수 있습니다. 대형 예약 사이트에서는 숙소와 교통을 비교할 수 있고 번역 도구도 일상적인 언어 장벽을 낮춥니다. 그래도 이름, 여권번호, 역 이름, 판매 시작 시점은 직접 꼼꼼히 확인해야 합니다.",
      "자유여행의 장점은 단순히 비용이 아닙니다. 마음에 드는 점심을 길게 즐기고, 밤에 같은 동네를 다시 찾고, 늦게 도착한 다음 날 늦잠을 자고, 관심 없는 장소를 뺄 수 있습니다. 여행 경험이 있는 사람에게는 완벽한 효율보다 이런 통제감이 더 중요할 수 있습니다.",
    ],
    listLabel: "다음과 같은 여행이라면 자유여행이 잘 맞습니다:",
    items: [
      "대중교통이 잘 연결된 도시 중심의 동선;",
      "교통과 예약을 알아보는 과정을 즐기는 편;",
      "출구를 잘못 찾거나 계획이 바뀌어도 대처할 여유가 있음;",
      "동행의 보행 속도와 체력이 비슷함;",
      "계속되는 설명보다 자유로운 시간을 중시함.",
    ],
    closing:
      "‘혼자 할 수 있다’와 ‘아무 노력도 들지 않는다’는 다릅니다. 자유여행은 조율 업무를 없애는 것이 아니라 여행자에게 옮깁니다.",
  },

  guideWorth: {
    title: "가이드 비용이 아깝지 않은 경우",
    intro:
      "좋은 가이드는 옆에 서 있기만 하는 사람이 아니라 그날을 바꾸는 사람이어야 합니다. 지식, 시간, 현장 판단이 겹치는 날에 가치가 가장 분명해집니다.",
    paragraphs: [
      "역사 유적에서는 건축, 의례, 시대 변화를 하나의 이야기로 연결하고 관심에 맞춰 후속 질문을 받을 수 있습니다. 넓은 관광지에서는 날씨와 체력을 보며 동선을 고르고, 지도상으로는 효율적이지만 실제로는 좋지 않은 조합을 피하는 것이 가치가 될 수 있습니다.",
      "중국의 흐름을 익히는 첫날이나 음식이 중심인 하루에도 동행이 도움이 될 수 있습니다. 후자는 주문, 골목 지식, 대화에서 가치가 생깁니다. 다만 이는 개인적입니다. 혼자 있는 시간을 좋아하거나 이미 충분히 공부한 여행자에게는 도움이 크지 않을 수 있습니다.",
    ],
    listLabel: "필요한 날만 가이드를 쓰기 좋은 경우:",
    items: [
      "사진뿐 아니라 역사, 문화, 현지 대화를 원함;",
      "하루에 여러 예약, 이동, 동선 선택이 있음;",
      "시간이 짧아 다음 날 다시 올 수 없음;",
      "동행의 속도를 실시간으로 조정해야 함;",
      "목적지에 도착하는 것보다 이해하는 것이 중요합니다.",
    ],
    closing:
      "예약 전에 ‘혼자였다면 하지 못했거나 하지 않았을 일을 이 가이드가 무엇을 해 주는가?’라고 물어보세요. 구체적인 답이 유명 관광지 목록보다 중요합니다.",
  },

  driverEnough: {
    title: "기사만 있어도 충분한 경우",
    intro:
      "어떤 날은 방문 자체보다 도로, 짐, 거리만 어렵습니다. 이때 전 일정 해설을 사면 필요하지 않은 문제까지 해결하려는 결과가 될 수 있습니다.",
    paragraphs: [
      "사전 픽업은 늦은 도착, 이른 출발, 도심 밖 숙소, 무거운 짐이 있는 이동을 단순하게 만듭니다. 가족은 서로 떨어진 장소 사이의 불필요한 도보를 줄일 수 있습니다. 이는 교통 지원이며 그 범위에 맞춰 확인하고 비교해야 합니다.",
      "기사가 가이드 자격도 있고, 원하는 언어를 하며, 관광지 안까지 동행하거나 일정을 다시 설계할 것이라고 가정하지 마세요. 차량 크기, 짐 공간, 대기 시간, 픽업 장소, 초과 시간, 도착편 변경 시 연락처를 확인해야 합니다.",
    ],
    listLabel: "기사만 이용하기 좋은 상황:",
    items: [
      "공항 또는 기차역 이동;",
      "대중교통으로 시간이 지나치게 오래 걸리는 도심 밖 일정;",
      "짐, 유모차, 긴 보행이 어려운 동행이 있는 경우;",
      "관광지는 이미 이해하고 있고 안정적인 이동만 필요한 날.",
    ],
    closing:
      "해설과 차량이 모두 필요하다면 기사와 가이드가 따로 오는지, 한 사람이 어떤 역할을 맡는지 견적에 분명히 적어 달라고 하세요.",
  },

  fullTrip: {
    title: "전 일정 지원이 맞는 경우",
    intro:
      "전 일정 프라이빗 여행은 단순히 가이드 일수를 늘리는 상품이 아닙니다. 여행자가 따로 연결해야 할 도시, 예약, 현장 인계를 하나로 이어 주는 것이 핵심입니다.",
    paragraphs: [
      "여러 도시를 이동하고, 역이나 공항 인계가 많고, 가족 인원이 많거나, 지연을 흡수할 시간이 거의 없다면 전 일정 조율의 필요성이 커집니다. 부모님이나 아이와 함께라면 한 팀이 처음부터 보행량, 객실, 차량 조건을 알고 있는 것도 장점이 될 수 있습니다.",
      "대신 구조가 생깁니다. 프라이빗 일정에도 자유 저녁과 독립 일정은 넣을 수 있지만 처음부터 설계해야 합니다. 매시간을 채우고, 원치 않는 이른 출발을 반복하거나 쇼핑을 관광처럼 넣었다면 프라이빗 여행의 문제가 아니라 제안서와 계약의 문제입니다.",
    ],
    listLabel: "전 일정 지원을 결정하기 전에 확인하세요:",
    items: [
      "계약 회사와 실제 현지 서비스를 제공하는 업체;",
      "호텔 또는 등급, 객실 형태와 조식 조건;",
      "기차, 국내선, 입장권, 식사, 가이드, 차량 포함 여부;",
      "자유시간과 변경 처리 방식;",
      "쇼핑 일정이나 현장 유료 선택 항목의 존재 여부.",
    ],
    closing:
      "2026년 팀 여행 표준계약서는 서비스 포함 범위, 실제 수행 주체, 쇼핑과 선택 관광을 결제 전에 더 분명히 확인해야 한다는 점을 보여 줍니다.",
  },

  hybrid: {
    title: "많은 여행자에게는 혼합 방식이 가장 자연스럽습니다",
    intro:
      "쉬운 날은 자유롭게 두고, 가치가 분명한 구간에만 사람을 더하는 방식입니다. 계획이 실패한 뒤 택하는 타협이 아니라 처음부터 설계할 수 있는 여행입니다.",
    paragraphs: [
      "커플은 기차와 도심 산책은 직접 하고, 역사 중심의 하루에는 가이드를, 도심 밖 일정에는 기사만 이용할 수 있습니다. 가족은 느긋한 도시 일정은 자유롭게 두고 픽업과 조정 가능한 가이드 하루만 배치할 수 있습니다. 누군가에게 도시 순서와 주요 예약만 점검받고 매일의 가이드는 두지 않는 방법도 있습니다.",
      "다만 인계가 보여야 합니다. 각 예약을 누가 보유하는지, 어디부터 여행자 책임인지, 지원 구간이 바뀌면 누구에게 연락하는지 알아야 합니다. 서로 무관한 예약을 여러 개 모았다고 저절로 하나의 여행이 되지는 않습니다.",
    ],
    listLabel: "실행 가능한 혼합 일정에는 다음이 보입니다:",
    items: [
      "완전히 혼자 둘러보고 싶은 날;",
      "해설이나 현지 판단이 실제 가치를 만드는 날;",
      "차량이 불필요한 마찰을 크게 줄이는 이동;",
      "출발 전에 반드시 재확인해야 할 예약;",
      "각 유료 서비스의 명확한 담당자.",
    ],
    closing:
      "무조건 지원을 줄이는 것이 목표가 아닙니다. 필요한 지원은 제대로 사고, 여행하러 온 자유는 남겨 두는 것이 목표입니다.",
  },

  checklist: {
    title: "가이드나 프라이빗 여행 결제 전 확인할 8가지",
    intro:
      "보기 좋은 일정표만으로 실제 진행자를 알 수는 없습니다. 결제 전 운영에 관한 답을 받아 두세요.",
    items: [
      "어느 여행사와 계약하며 실제 현지 진행사는 어디인가요?",
      "가이드는 여행사를 통해 배정되고 해당 업무 자격을 갖추었나요?",
      "어떤 언어로 진행하며 담당자가 확정됐나요, 요청 단계인가요?",
      "근무 시간, 만나는 곳, 초과 비용, 취소 규정은 무엇인가요?",
      "입장권, 내부 셔틀, 케이블카, 식사, 팁, 기사와 차량이 포함됐나요?",
      "쇼핑, 수수료 방문지, 제목 가격에 보이지 않는 선택 일정이 있나요?",
      "동행의 속도에 맞출 수 있고 날씨나 지연 시 어떻게 바꾸나요?",
      "직접 책임질 예약은 무엇이며 지원 구간의 긴급 연락처는 누구인가요?",
    ],
  },

  related: {
    title: "다음 선택도 함께 확인하세요",
    items: [
      {
        title: "베이징–장자제–상하이: 기차와 비행기 중 무엇이 나을까?",
        description:
          "두 구간의 실제 출발지부터 목적지까지 걸리는 시간을 비교한 뒤 이동을 중심으로 일정을 정하세요.",
        href: "/ko/guides/beijing-zhangjiajie-shanghai-transport/",
      },
      {
        title: "내 중국 일정은 너무 빠를까요?",
        description:
          "이동, 호텔 변경, 고정 예약을 모두 넣은 뒤 실제로 쓸 수 있는 시간을 확인하세요.",
        href: "/ko/guides/is-your-china-itinerary-too-rushed/",
      },
      {
        title: "부모님과 가는 중국 여행",
        description:
          "도보량, 이동, 숙소 거점과 여유 시간을 먼저 보고 필요한 지원을 정하세요.",
        href: "/ko/guides/china-itinerary-with-older-parents/",
      },
    ],
  },

  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "가이드 없이 중국을 여행할 수 있나요?",
        answer:
          "네. 많은 방문객이 기차, 호텔, 관광지를 직접 예약하고 대중교통을 이용합니다. 필요한 것은 준비, 정확한 여권 정보, 예약 시점과 낯선 앱에 적응하는 일이지, 투어 참가 의무가 아닙니다.",
      },
      {
        question: "베이징이나 상하이에서도 가이드가 필요한가요?",
        answer:
          "일반적인 이동과 입장에는 필요하지 않습니다. 역사 해설, 시간이 촉박한 도심 밖 일정, 동행에 맞춘 속도 조정이 중요한 날에는 여전히 가치가 있을 수 있습니다. 도시 전체보다 하루의 성격으로 판단하세요.",
      },
      {
        question: "가이드가 제가 못 구하는 표를 구해 줄 수 있나요?",
        answer:
          "그렇게 가정하면 안 됩니다. 주요 관광지는 자체 실명 예약 규정이 있습니다. 고궁박물원은 제3자 기관이나 개인에게 입장권 판매를 위임하지 않았다고 안내합니다. 가이드는 절차 이해를 도울 수 있지만 없는 재고를 약속할 수 없습니다.",
      },
      {
        question: "기사와 가이드는 같은가요?",
        answer:
          "아닙니다. 기사는 교통을 제공하고 가이드는 해설과 여행자 서비스를 제공합니다. 두 역할이 함께 포함된 상품도 있지만, 차량 가격만 보고 역할·언어·포함 사항을 추측하면 안 됩니다.",
      },
      {
        question: "아이 또는 부모님과 가면 항상 가이드를 써야 하나요?",
        answer:
          "아닙니다. 이동 능력, 속도, 인원, 교통의 복잡도와 가족이 직접 맡고 싶은 조율 범위가 판단 기준입니다. 제안된 서비스가 그 가족의 필요에 맞춰 바뀔 수 있어야 의미가 있습니다.",
      },
      {
        question: "가이드나 여행사가 정식 업체인지 어떻게 확인하나요?",
        answer:
          "계약 회사명, 여행사 허가 정보, 실제 진행 업체와 서면 포함 사항을 요청하세요. 중국 관광법상 가이드는 여행사를 통해 배정되어야 하며 개인적으로 가이드 업무를 수주해서는 안 됩니다.",
      },
    ],
  },

  finalCta: {
    label: "첫 대화는 무료입니다",
    title: "어디에 지원이 필요한지부터 함께 정하세요",
    detail:
      "여행 날짜, 동행, 생각 중인 도시와 대략적인 예산을 보내 주세요. 먼저 여행자와 동선을 확인한 뒤 자유롭게 둘 부분과 현지 지원이 유용한 구간을 함께 이야기합니다. 완성된 일정표는 필요하지 않습니다.",
    button: "무료 여행 상담 시작하기",
  },

  sources: [
    {
      title: "중국철도 12306 · 영문 승차권 FAQ",
      url: SOURCE_URLS.railway,
      note: "외국인 승객의 유효 여권을 이용한 실명 승차권 구매에 관한 공식 안내.",
    },
    {
      title: "고궁박물원 · 입장권 안내",
      url: SOURCE_URLS.palaceMuseum,
      note: "예약, 신분증명, 제3자 입장권 대리에 관한 공식 정보.",
    },
    {
      title: "중화인민공화국 관광법",
      url: SOURCE_URLS.tourismLaw,
      note: "가이드 자격과 여행사 배정에 관한 제37조와 제40조 공식 법령.",
    },
    {
      title: "상하이시 정부 · 관광 관련 자주 발생하는 문제",
      url: SOURCE_URLS.shanghaiTravel,
      note: "사업자·여행사 허가 확인과 도움 요청에 관한 영문 공식 안내.",
    },
    {
      title: "중국 문화여유부·시장감독관리총국 · 2026년 팀 여행 표준계약서",
      url: SOURCE_URLS.mctContract,
      note: "서비스 범위, 쇼핑 및 선택 관광 규정을 보완한 2026년 표준계약서에 관한 공식 안내.",
    },
    {
      title: "여행자 토론 · 첫 중국 여행, 투어인가 자유여행인가",
      url: SOURCE_URLS.firstTripDiscussion,
      note: "반복되는 질문을 확인하기 위한 2026년 공개 토론이며 모든 여행자를 대표하지 않습니다.",
    },
    {
      title: "여행자 토론 · 베이징과 상하이의 가이드 필요성",
      url: SOURCE_URLS.cityGuideDiscussion,
      note: "대도시 자유여행과 선택적 해설 수요를 함께 보여 주는 2026년 공개 토론.",
    },
    {
      title: "여행자 토론 · 가이드 투어의 가치",
      url: SOURCE_URLS.guidedValueDiscussion,
      note: "비용, 자유도, 문화 이해와 혼합 여행을 다루는 2025년 공개 토론.",
    },
    {
      title: "여행자 토론 · 일부 날짜만 가이드 이용",
      url: SOURCE_URLS.selectedDaysDiscussion,
      note: "선택적 가이드 방식을 보여 주는 2026년 공개 토론. 개인 경험은 사례일 뿐입니다.",
    },
  ],
  footer:
    "공식 규정과 예약 절차는 바뀔 수 있으므로 출발 전에 해당 운영사와 관광지 정보를 다시 확인하세요. 여행자 토론은 실제 질문을 보여 주기 위한 것이며 성공률을 추정하거나 특정 경험을 보장하지 않습니다.",
};

const copy: Record<HomegroundLocale, TourGuideDecisionCopy> = { en, zh, ko };

export function getTourGuideDecisionCopy(
  locale: HomegroundLocale,
): TourGuideDecisionCopy {
  return copy[locale] ?? copy.en;
}

export const TOUR_GUIDE_DECISION_IMAGES = {
  hero: {
    basePath: "/images/guides/china-tour-guide-decision/longmen-caves",
    width: 3456,
    height: 2104,
  },
} as const;
