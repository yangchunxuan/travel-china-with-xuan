import type { HomegroundLocale } from "./homegroundI18n";

export interface ChinaItineraryReviewCopy {
  path: string;
  metadata: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
  };
  navigationLabel: string;
  skipLink: string;
  breadcrumb: { home: string; current: string; ariaLabel: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    pricesAriaLabel: string;
    prices: readonly { price: string; label: string }[];
    consultation: string;
    compareServices: string;
    boundary: string;
  };
  reviewBoard: {
    title: string;
    disclaimer: string;
    rows: readonly {
      day: string;
      route: string;
      state: "tight" | "workable" | "fragile";
      status: string;
      detail: string;
    }[];
    legendLabel: string;
    legend: { workable: string; tight: string; fragile: string };
  };
  services: {
    label: string;
    title: string;
    intro: string;
    receive: string;
    perTrip: string;
    review: ServiceCardCopy;
    build: ServiceCardCopy;
    fullChoice: {
      startingPoint: string;
      title: string;
      summary: string;
      price: string;
      link: string;
    };
  };
  studio: {
    label: string;
    title: string;
    body: string;
    link: string;
  };
  pressure: {
    label: string;
    title: string;
    introBeforeLink: string;
    link: string;
    introAfterLink: string;
    items: readonly { title: string; detail: string }[];
  };
  output: {
    label: string;
    title: string;
    intro: string;
    items: readonly { title: string; detail: string }[];
    boundary: string;
  };
  process: {
    label: string;
    title: string;
    intro: string;
    items: readonly { title: string; detail: string }[];
  };
  example: {
    label: string;
    title: string;
    intro: string;
    before: string;
    beforeSummary: string;
    after: string;
    afterSummary: string;
    citiesBefore: readonly string[];
    citiesAfter: readonly string[];
    choices: readonly string[];
  };
  boundaries: {
    label: string;
    title: string;
    intro: string;
    items: readonly string[];
    note: string;
  };
  fullSupport: {
    label: string;
    title: string;
    paragraphs: readonly string[];
    items: readonly string[];
    button: string;
    note: string;
  };
  faq: {
    label: string;
    title: string;
    items: readonly { question: string; answer: string }[];
  };
  finalCta: {
    label: string;
    title: string;
    body: string;
    review: string;
    build: string;
    support: string;
  };
  schema: {
    pageName: string;
    pageDescription: string;
    serviceName: string;
    serviceType: string;
    countryName: string;
    homeName: string;
    reviewOfferName: string;
    reviewOfferDescription: string;
    buildOfferName: string;
    buildOfferDescription: string;
  };
}

interface ServiceCardCopy {
  startingPoint: string;
  title: string;
  price: "69" | "129";
  summary: string;
  scope: string;
  outputs: readonly string[];
  boundary: string;
  button: string;
  note: string;
}

const en: ChinaItineraryReviewCopy = {
  path: "/china-itinerary-review/",
  metadata: {
    title: "China Itinerary Review & Route Planning",
    description:
      "Have your China itinerary reviewed for US$69, or get a practical route built for US$129. Clear advice on city order, transfers, hotel bases and pace.",
    openGraphTitle: "Plan a China route that works beyond the map | Homeground",
    openGraphDescription:
      "Start with the route you have—or ask Homeground to build the structure before you book the rest.",
  },
  navigationLabel: "Planning services",
  skipLink: "Skip to China route planning",
  breadcrumb: {
    home: "Home",
    current: "Planning services",
    ariaLabel: "Breadcrumb",
  },
  hero: {
    eyebrow: "China itinerary review & route planning",
    title: "Get the route right before you book the rest.",
    lead:
      "Not sure whether you need a route review, a new route or full-trip support? Talk to a planner by WhatsApp or leave your email. If you already know what you need, the three paid services remain available below.",
    pricesAriaLabel: "Route planning prices",
    prices: [
      { price: "US$69", label: "route review" },
      { price: "US$129", label: "route build" },
      { price: "Custom quote", label: "full-trip support" },
    ],
    consultation: "Talk to a China trip planner",
    compareServices: "Compare the three services",
    boundary:
      "Contacting a planner is an enquiry, not a finished route or planning deliverable. We confirm the suitable service, scope, price or quote and delivery timing before sending payment instructions. Paid work begins after payment is confirmed.",
  },
  reviewBoard: {
    title: "Illustrative review excerpt",
    disclaimer: "Not a client report",
    rows: [
      {
        day: "Day 03",
        route: "Beijing → Xi’an",
        state: "tight",
        status: "Tight",
        detail: "Hotel check-out · rail transfer · fixed entry",
      },
      {
        day: "Day 04",
        route: "Xi’an",
        state: "workable",
        status: "Workable",
        detail: "Full day protects the timed visit",
      },
      {
        day: "Day 05",
        route: "Xi’an → Chengdu",
        state: "fragile",
        status: "Fragile",
        detail: "Late arrival followed by an early start",
      },
    ],
    legendLabel: "Review status legend",
    legend: { workable: "Workable", tight: "Tight", fragile: "Fragile" },
  },
  services: {
    label: "Choose where you are starting",
    title: "Which kind of help fits your trip now?",
    intro:
      "Choose Review or Build for a written route service. Choose Full Trip Support when you want Homeground to help shape the wider planning, arrangements and on-the-ground support.",
    receive: "What you receive",
    perTrip: "per trip",
    review: {
      startingPoint: "I already have a usable day-by-day route",
      title: "Review My Route",
      price: "69",
      summary: "A practical second opinion before you book more of the route.",
      scope:
        "Up to 10 travel days · up to 4 overnight bases · one shared route for 1–4 travellers",
      outputs: [
        "A day-by-day workable / tight / fragile check",
        "City order, hotel-move and transfer-day review",
        "The assumptions making particular days vulnerable",
        "Concise Keep / Move / Remove recommendations",
        "A revised route skeleton and official recheck list",
        "A concise explanation of the decisions that matter most",
      ],
      boundary:
        "This reviews an existing route. It does not build several new options, make reservations or provide ongoing chat support.",
      button: "Request a route review",
      note:
        "Choose this service and leave one working contact. A planner confirms the standard scope and delivery timing before sending payment instructions; the full working route is requested when needed.",
    },
    build: {
      startingPoint: "I have dates and priorities, but no usable route",
      title: "Build My Route",
      price: "129",
      summary: "A workable route structure before detailed booking begins.",
      scope:
        "Up to 10 travel days · up to 4 overnight bases · one shared route for 1–4 travellers",
      outputs: [
        "A recommended city order and night allocation",
        "Arrival, departure and intercity transfer logic",
        "A practical route skeleton for each travel day",
        "Hotel-area logic and pace notes for your group",
        "A booking-priority and official recheck list",
        "The assumptions and open decisions behind the proposed structure",
      ],
      boundary:
        "This builds the trip structure. It does not include an hour-by-hour schedule, live fare searches, reservations or support during travel.",
      button: "Request a route build",
      note:
        "Choose this service and leave one working contact. A planner confirms the standard scope and delivery timing before sending payment instructions; complete working material is requested when needed.",
    },
    fullChoice: {
      startingPoint:
        "I also need travel arrangements or local delivery.",
      title: "Full Trip Planning & Ground Support",
      summary:
        "A full-trip planning conversation that turns your needs into a clear scope and custom proposal.",
      price: "Custom quote",
      link: "See full-trip support",
    },
  },
  studio: {
    label: "Who works on your request",
    title: "A China travel agency, with one clear planning thread.",
    body:
      "A lead planner owns the written consultation. Relevant teammates can add first-hand destination and traveller-support experience without changing the published service boundary.",
    link: "Meet the people behind Homeground",
  },
  pressure: {
    label: "Why routes need testing",
    title: "A route can be possible and still be a poor fit.",
    introBeforeLink:
      "Most rushed itineraries do not fail because one train or flight is impossible. They fail because several small demands land on the same day. If you are still diagnosing the problem, start with our ",
    link: "practical China itinerary pace check",
    introAfterLink: ".",
    items: [
      {
        title: "A transfer is more than a train or flight time",
        detail:
          "Hotel check-out, luggage, the departure side, arrival, check-in and the first real activity all belong to the same day.",
      },
      {
        title: "A hotel move is not empty space",
        detail:
          "A second base can be useful, but it needs to buy back something meaningful: a protected morning, less walking or a calmer next day.",
      },
      {
        title: "A timed visit changes the whole day",
        detail:
          "A fixed entry, performance, train or flight creates a hard edge. It should not quietly depend on a long move going perfectly.",
      },
      {
        title: "Fatigue collects in chains",
        detail:
          "Late arrivals, early starts, stairs and long walking days are manageable alone. Together, they can make a route fragile.",
      },
      {
        title: "A map cannot show the group’s pace",
        detail:
          "Parents, children, slower walkers and travellers who value a slower morning need their own definition of a comfortable day.",
      },
    ],
  },
  output: {
    label: "The Route Stress Test",
    title: "A decision map, not a generic “best of China” list.",
    intro:
      "The point is not to make every route slower. It is to show the real cost of each choice, so you decide what deserves the limited time you have.",
    items: [
      { title: "Day-by-day reality map", detail: "Workable, tight or fragile — with the reason beside each day." },
      { title: "Transfer-day check", detail: "Door-to-door pressure is flagged where a city-change day can alter the route." },
      { title: "Keep / Move / Remove", detail: "The first changes worth considering, and what time or energy each one returns." },
      { title: "Hotel-base check", detail: "Where a move earns its place, and where a single base may protect the trip." },
      { title: "Official recheck list", detail: "The operating details that deserve a fresh look before travel." },
    ],
    boundary:
      "A route pack can flag information that needs an official recheck. It cannot guarantee transport, attraction access, weather or third-party bookings.",
  },
  process: {
    label: "How it works",
    title: "Contact a planner or choose a service directly.",
    intro:
      "If you are unsure what fits, use WhatsApp or leave your email. If you already know what you need, choose a published service and share only the details required for that work.",
    items: [
      { title: "Contact us or choose a service", detail: "A general enquiry needs only WhatsApp or one working email. A route review or route build asks for the trip details needed to check the scope. Do not submit passport details, payment information, QR codes or unredacted booking references." },
      { title: "A planner reviews the request", detail: "Homeground confirms which service fits, what information is still needed and whether the published standard scope applies." },
      { title: "Scope, price and delivery timing are confirmed", detail: "We reply with the suitable service, the fixed price or custom quote, the written scope and the expected delivery date." },
      { title: "Payment instructions are sent", detail: "After you agree to proceed, we send the available payment method and any final material request. This website does not take payment." },
      { title: "Paid work begins", detail: "The route review, route build or agreed full-trip work starts after payment is confirmed and the necessary trip material is complete." },
    ],
  },
  example: {
    label: "Illustrative example — not a client trip",
    title: "Removing a city is not the point. Knowing what it returns is.",
    intro:
      "Imagine ten travel days, four hotel bases and three intercity moves. One transfer day includes a timed museum visit; the next morning has an early departure. Every item may be possible. Together, they leave almost no room for a slow check-in, a delayed transfer or a lower-energy day.",
    before: "Before",
    beforeSummary: "10 nights · 5 bases · 4 city changes",
    after: "After one deliberate choice",
    afterSummary: "10 nights · 4 bases · fewer fragile links",
    citiesBefore: ["Beijing", "Xi’an", "Chengdu", "Hangzhou", "Shanghai"],
    citiesAfter: ["Beijing", "Xi’an", "Chengdu", "Shanghai"],
    choices: [
      "Keep the city and move the fixed visit to a full day.",
      "Keep the visit and remove a hotel move.",
      "Keep the core priorities and return a complete day to the route.",
    ],
  },
  boundaries: {
    label: "Fixed-price boundaries",
    title: "What US$69 and US$129 do not include.",
    intro:
      "Operational details can change. We use the information available when the route is prepared and identify what should be checked again closer to travel.",
    items: [
      "Purchasing or holding trains, flights, hotels or attraction tickets",
      "Monitoring live availability, fares or price changes",
      "Contacting hotels, venues or transport operators",
      "Large hotel, restaurant, shopping or activity shortlists",
      "Unlimited route versions or ongoing messaging",
      "Emergency or in-trip support and third-party guarantees",
    ],
    note:
      "Longer trips, more overnight bases, larger parties, multiple route alternatives or unusually complex fixed arrangements may need a separate quote. We tell you before asking for payment.",
  },
  fullSupport: {
    label: "Full trip planning & ground support",
    title: "Need more than a route document?",
    paragraphs: [
      "Bring the whole journey to Homeground. We begin with your dates, travellers, priorities and the support you want, then shape a workable full-trip scope and custom proposal.",
      "You keep one planning conversation. Before payment, the proposal sets out the included services, quote, timing, start conditions and payment details.",
    ],
    items: [
      "the route, booking and ground-support priorities;",
      "what planning or travel services are included;",
      "how the agreed services will move forward;",
      "the quote, payment recipient and what remains outside the arrangement.",
    ],
    button: "Ask about full trip support",
    note: "Use the full-trip button or contact a planner. We confirm the custom scope, quote and delivery timing before sending payment instructions.",
  },
  faq: {
    label: "Practical questions",
    title: "Before you choose a service",
    items: [
      { question: "What if I am not sure which service fits?", answer: "Talk to a China trip planner by WhatsApp or leave your email. You do not need to classify the request yourself: the planner recommends the suitable service and next step before any payment." },
      { question: "What is the difference between Review My Route and Build My Route?", answer: "Review My Route starts with a usable day-by-day itinerary and tests what works, what is tight and what should change. Build My Route starts with dates, priorities and ideas, then creates the city order, night allocation and route structure." },
      { question: "Is the price per person?", answer: "No. The displayed price covers one shared route for 1–4 travellers within the standard scope." },
      { question: "What counts as an overnight base?", answer: "An overnight base is a place where you check into accommodation and sleep. Changing hotels within the same city can also add work, so include every planned hotel move in the trip details." },
      { question: "What if my trip is longer than 10 days or includes more than four bases?", answer: "Contact a planner or choose the closest service. We will either quote the additional scope, suggest a smaller decision to solve first or recommend full trip planning. You will not be charged automatically." },
      { question: "Do I need confirmed trains, flights or hotels?", answer: "No. Candidate times and hotel areas are useful, but they do not need to be booked. Open details are labelled as assumptions rather than presented as confirmed facts." },
      { question: "Can you work around bookings I have already made?", answer: "Yes. Tell us which dates, transport, hotels and timed visits are fixed or difficult to change. The route will be assessed around those real constraints." },
      { question: "Does Build My Route include a complete sightseeing itinerary?", answer: "It provides the route structure, day-level focus, transfer logic, hotel-area logic and booking priorities. It does not include a detailed hour-by-hour schedule or a large list of specific hotels, restaurants and activities." },
      { question: "Can you plan for children, parents or limited mobility?", answer: "Yes. Tell us about walking tolerance, stairs, early starts, room needs and what a comfortable day means for your group. These are route inputs, not notes added at the end." },
      { question: "When will I receive the route?", answer: "We confirm the delivery date after checking the necessary trip details and before asking you to pay. If you have a decision deadline, include it in the request." },
      { question: "Does this page take payment?", answer: "No. You can contact a planner or request a specific service here. We confirm the suitable service, scope, price or quote and delivery timing first. If you agree, we send payment instructions; work begins after payment is confirmed." },
      { question: "How do I send my itinerary for review?", answer: "Choose Review My Route and add a concise route outline or shareable link if useful. After confirming that the standard scope fits, we can request the full working itinerary by reply. Do not send passport or ID images, payment details, QR codes or unredacted booking references." },
      { question: "Can Homeground book and coordinate the trip afterwards?", answer: "Potentially, depending on the route, dates and services required. Full trip planning and ground support have a separate written scope and custom quote." },
    ],
  },
  finalCta: {
    label: "Start from where your trip is now",
    title: "Have a route? Test it. Have a wishlist? Give it shape.",
    body:
      "The published prices apply only to the standard scopes above. If you are unsure, contact a planner. If you choose a service directly, we still confirm the scope, price or quote and delivery timing before sending payment instructions.",
    review: "Request a route review — US$69",
    build: "Request a route build — US$129",
    support: "Or ask about full trip support",
  },
  schema: {
    pageName: "China Itinerary Review & Route Planning",
    pageDescription: "Have a China itinerary reviewed for US$69, or get a practical route built for US$129 with clear scope before payment.",
    serviceName: "China itinerary review and route planning",
    serviceType: "Independent China itinerary review and route planning",
    countryName: "China",
    homeName: "Home",
    reviewOfferName: "Review My Route",
    reviewOfferDescription: "A written review of one usable day-by-day China route for 1–4 travellers within the published standard scope.",
    buildOfferName: "Build My Route",
    buildOfferDescription: "A written China route structure for 1–4 travellers within the published standard scope.",
  },
};

const zh: ChinaItineraryReviewCopy = {
  ...en,
  path: "/zh/china-itinerary-review/",
  metadata: {
    title: "中国旅行路线审核与规划",
    description: "用 69 美元审核已有的中国旅行路线，或用 129 美元获得一份可执行的路线结构建议，涵盖城市顺序、转场、住宿地与节奏。",
    openGraphTitle: "先把中国旅行路线理顺，再继续预订 | Homeground",
    openGraphDescription: "已有逐日路线，我们帮你检查；只有日期与愿望清单，我们帮你搭好路线结构。",
  },
  navigationLabel: "路线规划服务",
  skipLink: "跳到中国路线规划内容",
  breadcrumb: { home: "首页", current: "路线规划服务", ariaLabel: "面包屑导航" },
  hero: {
    eyebrow: "中国旅行路线审核与规划",
    title: "先把路线理顺，再继续预订。",
    lead: "不确定需要路线审核、重新规划，还是全程支持？可以通过 WhatsApp 联系规划师，或只留下一个邮箱。如果你已经知道自己需要什么，下方仍可直接选择三项付费服务。",
    pricesAriaLabel: "路线规划价格",
    prices: [
      { price: "US$69", label: "路线审核" },
      { price: "US$129", label: "路线规划" },
      { price: "单独报价", label: "全程规划与落地支持" },
    ],
    consultation: "联系旅行规划师",
    compareServices: "比较三项付费服务",
    boundary: "联系规划师只是发起咨询，不包含已经完成的路线或规划成果。我们会先确认适合的服务、范围、固定价格或报价与交付时间，再发送付款方式；确认付款后才开始付费工作。",
  },
  reviewBoard: {
    title: "路线审核示意",
    disclaimer: "非真实客户报告",
    rows: [
      { day: "第 03 天", route: "北京 → 西安", state: "tight", status: "偏紧", detail: "退房 · 铁路转场 · 固定时段入场" },
      { day: "第 04 天", route: "西安", state: "workable", status: "可执行", detail: "完整一天为预约项目留出余量" },
      { day: "第 05 天", route: "西安 → 成都", state: "fragile", status: "脆弱", detail: "晚到后紧接第二天早起" },
    ],
    legendLabel: "路线审核状态说明",
    legend: { workable: "可执行", tight: "偏紧", fragile: "脆弱" },
  },
  services: {
    label: "从你现在的进度开始",
    title: "此刻哪一种帮助更适合你的旅行？",
    intro: "已有路线可选“路线审核”，还没有可用路线可选“路线规划”。如果还需要整趟旅行的规划、预订与在地支持，可以直接选择“全程规划与落地支持”。",
    receive: "你会收到",
    perTrip: "每趟旅行",
    review: {
      startingPoint: "我已经有一份可用的逐日路线",
      title: "审核我的路线",
      price: "69",
      summary: "在继续预订前，获得一次务实的第二意见。",
      scope: "最多 10 个旅行日 · 最多 4 个过夜住宿地 · 1–4 位同行者共用一条路线",
      outputs: [
        "逐日标注可执行 / 偏紧 / 脆弱",
        "检查城市顺序、换酒店与转场日",
        "指出让某些天变得脆弱的关键假设",
        "简明的保留 / 调整 / 删除建议",
        "修订后的路线骨架与官方信息复核清单",
        "解释最重要的取舍与决定",
      ],
      boundary: "此服务审核一条已有路线，不会另外设计多套新方案，也不包含代订或持续聊天支持。",
      button: "申请路线审核",
      note: "选择这项服务并留下一个有效联系方式。规划师确认标准范围与交付时间后发送付款方式；需要时再向你索取完整工作路线。",
    },
    build: {
      startingPoint: "我有日期和重点，但还没有可用路线",
      title: "为我规划路线",
      price: "129",
      summary: "在详细预订开始前，先获得一份可执行的路线结构。",
      scope: "最多 10 个旅行日 · 最多 4 个过夜住宿地 · 1–4 位同行者共用一条路线",
      outputs: [
        "建议的城市顺序与住宿晚数分配",
        "抵达、离开与城市间转场逻辑",
        "每个旅行日的实用路线骨架",
        "适合同行者节奏的住宿区域逻辑与节奏提示",
        "预订优先级与官方信息复核清单",
        "建议结构背后的假设与待决定事项",
      ],
      boundary: "此服务搭建旅行结构，不包含逐小时日程、实时票价搜索、代为预订或旅途中的支持。",
      button: "申请路线规划",
      note: "选择这项服务并留下一个有效联系方式。规划师确认标准范围与交付时间后发送付款方式；需要时再向你索取完整工作资料。",
    },
    fullChoice: {
      startingPoint: "我还需要旅游预订或当地履约安排。",
      title: "全程规划与落地支持",
      summary: "从整趟旅行需求出发，与你确认完整服务范围并提供单独方案。",
      price: "单独报价",
      link: "查看全程支持范围",
    },
  },
  studio: {
    label: "谁会处理你的需求",
    title: "一家中国旅行社，一条清晰的负责线。",
    body: "一位主规划师负责书面咨询。团队成员可以补充一线目的地和旅客接待经验，但不会改变页面公开的服务边界。",
    link: "认识 Homeground 团队",
  },
  pressure: {
    label: "为什么路线需要检验",
    title: "一条路线可以做得到，却未必适合你。",
    introBeforeLink: "匆忙路线往往不是因为某一班火车或航班不可行，而是许多小压力集中在同一天。如果你还在判断问题出在哪里，可以先看我们的",
    link: "中国旅行节奏检查",
    introAfterLink: "。",
    items: [
      { title: "转场不只是火车或航班上的时间", detail: "退房、行李、前往车站或机场、抵达、入住和当天第一项真正的活动，都发生在同一天。" },
      { title: "换酒店不是一段空白时间", detail: "增加住宿地可以有价值，但它应该换回真正重要的东西：完整的早晨、更少步行，或更从容的第二天。" },
      { title: "固定时段会改变整天结构", detail: "预约入场、演出、火车或航班都会形成硬边界，不应该暗中依赖一次长距离转场完全不出差错。" },
      { title: "疲劳会沿着日程累积", detail: "晚到、早起、台阶和长距离步行单独看都能应付，连续出现时却可能让路线变得脆弱。" },
      { title: "地图看不出同行者的真实节奏", detail: "带父母、孩子、步行较慢的人，或只是想慢一点开始早晨，都需要属于自己的“舒适一天”定义。" },
    ],
  },
  output: {
    label: "路线压力测试",
    title: "给你一张决策图，而不是泛泛的“中国必去清单”。",
    intro: "目的不是把所有路线都变慢，而是说明每个选择真正占用的时间和体力，让你决定有限时间最值得留给什么。",
    items: [
      { title: "逐日现实度标注", detail: "标明可执行、偏紧或脆弱，并说明原因。" },
      { title: "转场日检查", detail: "找出从门到门的压力，以及它如何影响换城市当天。" },
      { title: "保留 / 调整 / 删除", detail: "先处理最值得改变的部分，并说明每项改变能换回多少时间或精力。" },
      { title: "住宿地检查", detail: "判断一次搬迁是否值得，以及单一住宿地是否更能保护旅行节奏。" },
      { title: "官方信息复核清单", detail: "列出出发前值得再次核对的运营信息。" },
    ],
    boundary: "路线报告可以指出需要用官方渠道复核的信息，但无法保证交通、景点入场、天气或第三方预订。",
  },
  process: {
    label: "服务流程",
    title: "联系规划师，或直接选择一项服务。",
    intro: "如果还不确定需要什么，可以通过 WhatsApp 联系或只留下邮箱；如果已经知道，就直接选择公开服务，只补充完成该项工作真正需要的信息。",
    items: [
      { title: "联系或选择服务", detail: "普通咨询只需 WhatsApp 或一个有效邮箱；路线审核或规划只会询问判断范围所需的旅行信息。请勿提交护照或证件信息、付款信息、二维码或未遮盖的预订编号。" },
      { title: "规划师查看需求", detail: "Homeground 会判断哪项服务更适合、还缺哪些必要信息，以及需求是否适用页面上的标准范围。" },
      { title: "确认范围、价格与交付时间", detail: "我们会回复合适的服务、固定价格或单独报价、书面范围及预计交付日期。" },
      { title: "发送付款方式", detail: "你同意继续后，我们会发送可用的付款方式，并按需索取最终工作资料。本网站不直接收款。" },
      { title: "付款后开始工作", detail: "确认收到付款且必要旅行资料齐全后，我们才开始路线审核、路线规划或约定的全程旅行工作。" },
    ],
  },
  example: {
    label: "示意案例 — 非真实客户行程",
    title: "重点不是删掉一座城市，而是知道能换回什么。",
    intro: "想象一次 10 个旅行日、4 个住宿地、3 次城市间转场的旅行。其中一个转场日安排了定时入馆，第二天清早又要出发。每项单独看也许可行，但放在一起，就几乎无法容纳入住变慢、转场延误或体力不足的一天。",
    before: "调整前",
    beforeSummary: "10 晚 · 5 个住宿地 · 4 次换城市",
    after: "做出一项明确取舍后",
    afterSummary: "10 晚 · 4 个住宿地 · 更少脆弱衔接",
    citiesBefore: ["北京", "西安", "成都", "杭州", "上海"],
    citiesAfter: ["北京", "西安", "成都", "上海"],
    choices: ["保留这座城市，把固定预约移到完整的一天。", "保留这项参观，减少一次换酒店。", "保留核心重点，为整条路线换回一个完整日。"],
  },
  boundaries: {
    label: "固定价格的范围边界",
    title: "69 美元与 129 美元不包含什么。",
    intro: "运营信息可能变化。我们使用制作路线时可得的信息，并标出临近出发时需要再次核对的内容。",
    items: [
      "购买或占位火车、航班、酒店或景点门票",
      "持续监控实时余量、票价或价格变化",
      "联系酒店、场馆或交通运营方",
      "大量酒店、餐厅、购物或活动候选清单",
      "无限版本的路线修改或持续聊天",
      "紧急或旅途中的支持，以及第三方履约保证",
    ],
    note: "更长的旅行、更多住宿地、更大团队、多套路线选择或非常复杂的固定安排，可能需要单独报价。我们会在请你付款前说明。",
  },
  fullSupport: {
    label: "全程规划与落地支持",
    title: "需要的不只是一份路线文件？",
    paragraphs: [
      "把整趟旅行交给 Homeground。从日期、同行者、旅行重点和希望获得的支持开始，我们会与你梳理完整范围并形成单独方案。",
      "你只需要沿着同一条沟通主线继续。付款前，方案会清楚列出包含的服务、报价、时间安排、开始条件与付款信息。",
    ],
    items: ["路线、预订与落地支持的重点；", "包含哪些规划或旅行服务；", "确认后的服务如何继续推进；", "报价、收款方与不在约定范围内的内容。"],
    button: "咨询全程旅行支持",
    note: "可直接选择全程支持，或先联系旅行规划师。我们会先确认定制范围、报价与交付时间，再发送付款方式。",
  },
  faq: {
    label: "常见实际问题",
    title: "选择服务前",
    items: [
      { question: "如果我不确定哪项服务适合怎么办？", answer: "可以通过 WhatsApp 联系旅行规划师，或只留下一个邮箱。你不需要自己完成分类；规划师会在付款前建议适合的服务与下一步。" },
      { question: "“审核我的路线”和“为我规划路线”有什么区别？", answer: "路线审核从一份可用的逐日行程开始，检查哪些部分可行、哪里偏紧、哪里需要调整。路线规划从日期、重点和想法开始，建立城市顺序、住宿晚数与整体结构。" },
      { question: "价格是按人计算吗？", answer: "不是。标准范围内，页面价格覆盖 1–4 位同行者共用的一条路线。" },
      { question: "什么算一个过夜住宿地？", answer: "指你办理入住并过夜的地点。同一城市内换酒店也会增加成本，因此请在旅行信息中列出每次计划中的酒店搬迁。" },
      { question: "旅行超过 10 天或超过 4 个住宿地怎么办？", answer: "请先发送旅行信息。我们会评估增加范围后的报价、建议先解决一个更小的关键决定，或推荐全程旅行规划。系统不会自动向你收费。" },
      { question: "火车、航班或酒店必须已经确认吗？", answer: "不需要。候选时间与酒店区域会有帮助，但无需预订。尚未确定的细节会标为假设，而不会写成已经确认的事实。" },
      { question: "已经订好的项目可以保留吗？", answer: "可以。请告诉我们哪些日期、交通、酒店和定时参观已固定或难以变更，我们会围绕这些真实限制评估路线。" },
      { question: "路线规划包含完整景点行程吗？", answer: "它包含路线结构、每日重点、转场逻辑、住宿区域逻辑和预订优先级，不包含详细的逐小时时间表，也不提供大量具体酒店、餐厅与活动清单。" },
      { question: "可以为儿童、父母或行动不便者规划吗？", answer: "可以。请说明步行耐受度、台阶、早起、房间需求，以及对同行者而言怎样才算舒适的一天。这些是路线输入，不是最后才补上的备注。" },
      { question: "什么时候能收到路线？", answer: "我们会在检查旅行信息后、请你付款前确认交付日期。如果你有决定期限，请写在咨询中。" },
      { question: "这个页面会收款吗？", answer: "不会。你可以先联系规划师，或直接申请一项具体服务。我们会先确认服务、范围、固定价格或报价与交付时间；你同意后再发送付款方式，确认付款后开始工作。" },
      { question: "怎样发送路线供审核？", answer: "选择“审核我的路线”，并按需添加路线摘要或可访问的分享链接。确认符合标准范围后，我们会回复并索取完整工作路线。请勿发送护照或证件图片、付款信息、二维码或未遮盖的预订编号。" },
      { question: "之后 Homeground 可以代订并协调行程吗？", answer: "有可能，取决于路线、日期和所需服务。全程规划与落地支持会另行确认书面范围与定制报价。" },
    ],
  },
  finalCta: {
    label: "从你的旅行现状开始",
    title: "已有路线，就先检验。只有愿望清单，就把它变成结构。",
    body: "公开价格只适用于上方标准范围。如果还不确定，可以先联系规划师；如果直接选择服务，我们仍会先确认范围、固定价格或报价与交付时间，再发送付款方式。",
    review: "申请路线审核 — US$69",
    build: "申请路线规划 — US$129",
    support: "或咨询全程旅行支持",
  },
  schema: {
    pageName: "中国旅行路线审核与规划",
    pageDescription: "用 69 美元审核已有的中国旅行路线，或用 129 美元获得一份范围清晰、可执行的路线结构建议。",
    serviceName: "中国旅行路线审核与规划",
    serviceType: "独立中国旅行路线审核与规划",
    countryName: "中国",
    homeName: "首页",
    reviewOfferName: "审核我的路线",
    reviewOfferDescription: "在公开标准范围内，为 1–4 位同行者的一条可用中国逐日路线提供书面审核。",
    buildOfferName: "为我规划路线",
    buildOfferDescription: "在公开标准范围内，为 1–4 位同行者建立一份书面中国旅行路线结构。",
  },
};

const ko: ChinaItineraryReviewCopy = {
  ...en,
  path: "/ko/china-itinerary-review/",
  metadata: {
    title: "중국 여행 일정 검토 및 동선 설계",
    description: "US$69로 기존 중국 일정을 검토하거나 US$129로 실행 가능한 동선을 설계받으세요. 도시 순서, 이동, 숙박 거점과 여행 속도를 점검합니다.",
    openGraphTitle: "예약을 더 하기 전에 중국 여행 동선부터 정리하세요 | Homeground",
    openGraphDescription: "일별 일정이 있다면 검토하고, 날짜와 우선순위만 있다면 여행 동선의 구조를 설계합니다.",
  },
  navigationLabel: "일정 설계 서비스",
  skipLink: "중국 일정 설계 내용으로 건너뛰기",
  breadcrumb: { home: "홈", current: "일정 설계 서비스", ariaLabel: "이동 경로" },
  hero: {
    eyebrow: "중국 여행 일정 검토 및 동선 설계",
    title: "예약을 더 하기 전에 동선부터 제대로 잡으세요.",
    lead: "일정 검토, 새 동선 설계, 전체 여행 지원 중 무엇이 필요한지 확실하지 않나요? WhatsApp으로 플래너에게 문의하거나 이메일을 남겨 주세요. 이미 필요한 서비스를 안다면 아래의 세 가지 유료 서비스를 바로 선택할 수 있습니다.",
    pricesAriaLabel: "일정 설계 서비스 가격",
    prices: [
      { price: "US$69", label: "일정 검토" },
      { price: "US$129", label: "동선 설계" },
      { price: "맞춤 견적", label: "전체 여행 지원" },
    ],
    consultation: "중국 여행 플래너와 상담하기",
    compareServices: "세 가지 유료 서비스 비교",
    boundary: "플래너에게 문의하는 단계에는 완성된 동선이나 유료 결과물이 포함되지 않습니다. 알맞은 서비스, 범위, 고정 가격 또는 견적과 납품 일정을 확인한 뒤 결제 방법을 안내합니다. 결제가 확인된 후 유료 작업을 시작합니다.",
  },
  reviewBoard: {
    title: "일정 검토 예시",
    disclaimer: "실제 고객 보고서 아님",
    rows: [
      { day: "3일차", route: "베이징 → 시안", state: "tight", status: "빠듯함", detail: "체크아웃 · 철도 이동 · 시간 지정 입장" },
      { day: "4일차", route: "시안", state: "workable", status: "실행 가능", detail: "하루 전체를 확보해 예약 일정 보호" },
      { day: "5일차", route: "시안 → 청두", state: "fragile", status: "취약함", detail: "늦은 도착 다음 날 이른 출발" },
    ],
    legendLabel: "일정 검토 상태 안내",
    legend: { workable: "실행 가능", tight: "빠듯함", fragile: "취약함" },
  },
  services: {
    label: "현재 준비 단계에서 시작하세요",
    title: "지금 내 여행에는 어떤 도움이 맞을까요?",
    intro: "기존 일정이 있다면 검토를, 아직 실행 가능한 동선이 없다면 설계를 선택하세요. 일부 예약이나 현지 조율까지 원한다면 전체 여행 지원을 선택할 수 있습니다.",
    receive: "제공 내용",
    perTrip: "여행 1건",
    review: {
      startingPoint: "이미 사용할 수 있는 일별 일정이 있어요",
      title: "내 일정 검토",
      price: "69",
      summary: "예약을 더 하기 전에 받는 현실적인 두 번째 의견입니다.",
      scope: "최대 10일 · 최대 4개 숙박 거점 · 1–4명이 함께 이용하는 한 개의 동선",
      outputs: [
        "일별 실행 가능 / 빠듯함 / 취약함 판정",
        "도시 순서, 숙소 이동과 도시 간 이동일 검토",
        "특정 날짜를 취약하게 만드는 가정 표시",
        "유지 / 이동 / 삭제 권고안",
        "수정된 동선 골격과 공식 정보 재확인 목록",
        "가장 중요한 선택에 대한 간결한 설명",
      ],
      boundary: "기존 일정 한 개를 검토하는 서비스입니다. 여러 새 대안을 만들거나 예약을 대신하거나 지속적인 채팅 상담을 제공하지 않습니다.",
      button: "일정 검토 요청하기",
      note: "이 서비스를 선택하고 연락 가능한 정보 하나를 남겨 주세요. 플래너가 표준 범위와 납품 일정을 확인한 뒤 결제 방법을 안내하며, 필요할 때 전체 작업 일정을 요청합니다.",
    },
    build: {
      startingPoint: "날짜와 우선순위는 있지만 사용할 수 있는 동선이 없어요",
      title: "내 동선 설계",
      price: "129",
      summary: "세부 예약을 시작하기 전에 실행 가능한 여행 구조를 만듭니다.",
      scope: "최대 10일 · 최대 4개 숙박 거점 · 1–4명이 함께 이용하는 한 개의 동선",
      outputs: [
        "추천 도시 순서와 숙박일 배분",
        "도착, 출발과 도시 간 이동 논리",
        "여행일별 실용적인 동선 골격",
        "일행에 맞는 숙박 지역 논리와 속도 메모",
        "예약 우선순위와 공식 정보 재확인 목록",
        "제안 구조의 가정과 남은 결정 사항",
      ],
      boundary: "여행의 구조를 설계하는 서비스입니다. 시간대별 상세 일정, 실시간 요금 검색, 예약 대행이나 여행 중 지원은 포함하지 않습니다.",
      button: "동선 설계 요청하기",
      note: "이 서비스를 선택하고 연락 가능한 정보 하나를 남겨 주세요. 플래너가 표준 범위와 납품 일정을 확인한 뒤 결제 방법을 안내하며, 필요할 때 전체 작업 자료를 요청합니다.",
    },
    fullChoice: {
      startingPoint: "여행 예약 또는 현지 이행도 필요해요.",
      title: "전체 여행 설계 및 현지 지원",
      summary: "전체 여행의 플래닝, 예약 준비와 현지 지원 범위를 함께 정하고 맞춤 견적을 받습니다.",
      price: "맞춤 견적",
      link: "전체 여행 지원 보기",
    },
  },
  studio: {
    label: "누가 요청을 담당하나요",
    title: "중국 전문 여행사, 하나의 분명한 담당 흐름.",
    body: "한 명의 리드 플래너가 서면 컨설팅을 책임집니다. 팀원은 공개된 서비스 범위를 바꾸지 않고 현장 목적지 경험과 여행자 응대 경험을 더할 수 있습니다.",
    link: "Homeground 팀 만나기",
  },
  pressure: {
    label: "일정을 검토해야 하는 이유",
    title: "가능한 동선이라도 나에게 좋은 동선은 아닐 수 있습니다.",
    introBeforeLink: "빠듯한 일정은 한 대의 기차나 항공편이 불가능해서 무너지기보다 여러 작은 부담이 같은 날 겹쳐서 흔들리는 경우가 많습니다. 아직 문제를 진단하는 중이라면 ",
    link: "중국 여행 속도 체크",
    introAfterLink: "부터 확인해 보세요.",
    items: [
      { title: "이동은 기차나 비행 시간보다 깁니다", detail: "체크아웃, 짐, 출발지까지의 이동, 도착, 체크인과 첫 실제 일정이 모두 같은 날 안에 들어갑니다." },
      { title: "숙소 이동은 빈 시간이 아닙니다", detail: "두 번째 숙박 거점은 유용할 수 있지만 온전한 아침, 줄어든 도보량, 더 여유로운 다음 날처럼 분명한 가치를 돌려줘야 합니다." },
      { title: "시간이 정해진 일정은 하루 전체를 바꿉니다", detail: "예약 입장, 공연, 기차와 항공편은 단단한 시간 경계를 만듭니다. 긴 이동이 완벽하게 진행된다는 가정 위에 두면 안 됩니다." },
      { title: "피로는 일정의 연쇄 속에서 쌓입니다", detail: "늦은 도착, 이른 출발, 계단과 긴 도보는 각각 감당할 수 있어도 연달아 겹치면 동선이 취약해집니다." },
      { title: "지도에는 일행의 속도가 보이지 않습니다", detail: "부모님, 아이, 걷는 속도가 느린 일행, 여유로운 아침을 원하는 여행자에게는 각자 다른 ‘편안한 하루’가 필요합니다." },
    ],
  },
  output: {
    label: "동선 스트레스 테스트",
    title: "뻔한 ‘중국 베스트’ 목록이 아닌 결정 지도를 드립니다.",
    intro: "모든 일정을 느리게 만드는 것이 목적은 아닙니다. 각 선택의 실제 시간과 체력 비용을 보여 주고 한정된 시간을 어디에 쓸지 결정하도록 돕습니다.",
    items: [
      { title: "일별 현실성 지도", detail: "실행 가능, 빠듯함, 취약함을 이유와 함께 표시합니다." },
      { title: "도시 이동일 점검", detail: "문에서 문까지 드는 부담과 도시 이동일 전체에 미치는 영향을 확인합니다." },
      { title: "유지 / 이동 / 삭제", detail: "먼저 바꿀 만한 부분과 각 변경이 돌려주는 시간 또는 체력을 제시합니다." },
      { title: "숙박 거점 점검", detail: "이동이 제값을 하는지, 한 거점이 여행의 속도를 더 잘 지키는지 판단합니다." },
      { title: "공식 정보 재확인 목록", detail: "출발 전에 공식 채널에서 다시 확인할 운영 정보를 정리합니다." },
    ],
    boundary: "일정 자료는 공식 재확인이 필요한 정보를 표시할 수 있지만 교통, 관광지 입장, 날씨나 제3자 예약을 보장하지는 않습니다.",
  },
  process: {
    label: "이용 절차",
    title: "플래너에게 문의하거나 서비스를 바로 선택하세요.",
    intro: "어떤 도움이 필요한지 모르겠다면 WhatsApp으로 문의하거나 이메일을 남기세요. 이미 알고 있다면 공개된 서비스를 선택하고 해당 작업에 필요한 정보만 알려 주면 됩니다.",
    items: [
      { title: "문의하거나 서비스 선택", detail: "일반 문의는 WhatsApp 또는 이메일 하나면 충분합니다. 일정 검토나 동선 설계는 범위를 판단하는 데 필요한 여행 정보만 확인합니다. 여권·신분증 정보, 결제 정보, QR 코드 또는 가리지 않은 예약 번호는 제출하지 마세요." },
      { title: "플래너가 요청 검토", detail: "Homeground가 어떤 서비스가 알맞은지, 어떤 필수 정보가 더 필요한지, 공개된 표준 범위가 적용되는지 확인합니다." },
      { title: "범위, 가격과 납품 일정 확인", detail: "알맞은 서비스, 고정 가격 또는 맞춤 견적, 서면 작업 범위와 예상 납품일을 안내합니다." },
      { title: "결제 방법 안내", detail: "진행에 동의하면 이용 가능한 결제 방법과 필요한 최종 자료를 안내합니다. 이 웹사이트에서는 직접 결제하지 않습니다." },
      { title: "결제 후 작업 시작", detail: "결제가 확인되고 필요한 여행 자료가 준비된 뒤 일정 검토, 동선 설계 또는 합의한 전체 여행 작업을 시작합니다." },
    ],
  },
  example: {
    label: "설명용 예시 — 실제 고객 여행 아님",
    title: "도시 하나를 빼는 것이 목적은 아닙니다. 무엇을 되찾는지가 중요합니다.",
    intro: "10일 동안 4개 숙박 거점과 3번의 도시 간 이동이 있는 여행을 가정해 보세요. 한 이동일에는 시간 지정 박물관 방문이 있고, 다음 날 아침은 일찍 출발합니다. 각각은 가능할 수 있지만 함께 놓으면 느린 체크인, 이동 지연 또는 체력이 떨어지는 날을 받아줄 여유가 거의 없습니다.",
    before: "조정 전",
    beforeSummary: "10박 · 5개 숙박 거점 · 4번의 도시 이동",
    after: "한 가지를 분명히 선택한 뒤",
    afterSummary: "10박 · 4개 숙박 거점 · 줄어든 취약한 연결",
    citiesBefore: ["베이징", "시안", "청두", "항저우", "상하이"],
    citiesAfter: ["베이징", "시안", "청두", "상하이"],
    choices: ["도시를 유지하고 시간 지정 방문을 온전한 하루로 옮깁니다.", "방문을 유지하고 숙소 이동 한 번을 없앱니다.", "핵심 우선순위를 지키고 동선에 하루 전체를 돌려줍니다."],
  },
  boundaries: {
    label: "고정 가격 서비스 범위",
    title: "US$69와 US$129에 포함되지 않는 항목.",
    intro: "운영 정보는 바뀔 수 있습니다. 동선을 준비할 때 확인 가능한 정보를 사용하고, 출발이 가까워지면 다시 확인할 항목을 표시합니다.",
    items: [
      "기차, 항공편, 호텔 또는 관광지 티켓 구매와 홀딩",
      "실시간 좌석, 요금 또는 가격 변동 모니터링",
      "호텔, 시설 또는 교통 운영사 연락",
      "대량의 호텔, 식당, 쇼핑 또는 활동 후보 목록",
      "무제한 일정 버전 또는 지속적인 메시지 상담",
      "긴급·여행 중 지원과 제3자 서비스 보장",
    ],
    note: "더 긴 여행, 더 많은 숙박 거점, 큰 일행, 여러 동선 대안 또는 매우 복잡한 고정 일정은 별도 견적이 필요할 수 있습니다. 결제를 요청하기 전에 먼저 안내합니다.",
  },
  fullSupport: {
    label: "전체 여행 설계 및 현지 지원",
    title: "일정 문서 이상의 도움이 필요한가요?",
    paragraphs: [
      "전체 여행을 Homeground에 알려 주세요. 날짜, 일행, 우선순위와 원하는 지원을 바탕으로 전체 범위를 함께 정하고 맞춤 제안을 만듭니다.",
      "하나의 플래닝 대화로 계속 진행합니다. 결제 전에 포함 서비스, 견적, 일정, 시작 조건과 결제 정보를 명확히 안내합니다.",
    ],
    items: ["동선, 예약 준비와 현지 지원의 우선순위;", "포함되는 플래닝 또는 여행 서비스;", "확정된 서비스를 진행하는 방식;", "견적, 결제 수취인과 범위 밖의 항목."],
    button: "전체 여행 지원 문의하기",
    note: "전체 여행 지원을 바로 선택하거나 플래너에게 먼저 문의하세요. 맞춤 범위, 견적과 납품 일정을 확인한 뒤 결제 방법을 안내합니다.",
  },
  faq: {
    label: "실용적인 질문",
    title: "서비스를 선택하기 전에",
    items: [
      { question: "어떤 서비스가 맞는지 모르겠다면 어떻게 하나요?", answer: "WhatsApp으로 중국 여행 플래너에게 문의하거나 이메일을 남겨 주세요. 서비스를 직접 분류할 필요가 없으며, 플래너가 결제 전에 알맞은 서비스와 다음 단계를 안내합니다." },
      { question: "‘내 일정 검토’와 ‘내 동선 설계’는 무엇이 다른가요?", answer: "일정 검토는 사용할 수 있는 일별 일정에서 시작해 가능한 부분, 빠듯한 부분과 바꿔야 할 부분을 확인합니다. 동선 설계는 날짜, 우선순위와 아이디어에서 시작해 도시 순서, 숙박일 배분과 여행 구조를 만듭니다." },
      { question: "가격은 1인 기준인가요?", answer: "아닙니다. 표시 가격은 표준 범위 안에서 1–4명이 함께 이용하는 한 개의 동선에 적용됩니다." },
      { question: "숙박 거점은 무엇을 뜻하나요?", answer: "체크인하고 잠을 자는 장소를 뜻합니다. 같은 도시 안에서 호텔을 바꾸는 일도 부담을 더하므로 예정된 모든 숙소 이동을 여행 정보에 적어 주세요." },
      { question: "여행이 10일보다 길거나 숙박 거점이 4개보다 많으면 어떻게 하나요?", answer: "먼저 여행 정보를 보내 주세요. 추가 범위를 견적하거나, 더 작은 핵심 결정을 먼저 해결하도록 제안하거나, 전체 여행 설계를 안내합니다. 자동으로 결제되지 않습니다." },
      { question: "기차, 항공편이나 호텔이 확정되어 있어야 하나요?", answer: "아닙니다. 후보 시간과 숙박 지역은 도움이 되지만 예약할 필요는 없습니다. 열린 항목은 확정 사실이 아니라 가정으로 표시합니다." },
      { question: "이미 예약한 항목을 유지할 수 있나요?", answer: "네. 고정되었거나 바꾸기 어려운 날짜, 교통, 호텔과 시간 지정 방문을 알려 주세요. 그 실제 제약을 기준으로 동선을 검토합니다." },
      { question: "동선 설계에 전체 관광 일정이 포함되나요?", answer: "동선 구조, 일별 초점, 이동 논리, 숙박 지역 논리와 예약 우선순위를 제공합니다. 시간대별 상세 일정이나 대량의 특정 호텔, 식당 및 활동 목록은 포함하지 않습니다." },
      { question: "아이, 부모님 또는 이동이 불편한 사람을 위한 설계도 가능한가요?", answer: "네. 도보 가능 거리, 계단, 이른 출발, 객실 요구와 일행에게 편안한 하루의 의미를 알려 주세요. 마지막에 붙이는 메모가 아니라 동선의 입력 조건으로 반영합니다." },
      { question: "일정은 언제 받을 수 있나요?", answer: "여행 정보를 확인한 뒤, 결제를 요청하기 전에 납품일을 확정합니다. 결정해야 하는 기한이 있다면 요청에 적어 주세요." },
      { question: "이 페이지에서 결제하나요?", answer: "아닙니다. 플래너에게 먼저 문의하거나 특정 서비스를 요청할 수 있습니다. 서비스, 범위, 고정 가격 또는 견적과 납품 일정을 확인한 뒤 결제 방법을 안내하며, 결제가 확인된 후 작업을 시작합니다." },
      { question: "검토할 일정을 어떻게 보내나요?", answer: "‘내 일정 검토’를 선택하고 필요하면 간단한 일정 요약이나 공유 링크를 추가하세요. 표준 범위에 맞는지 확인한 뒤 답장을 통해 전체 작업 일정을 요청할 수 있습니다. 여권·신분증 이미지, 결제 정보, QR 코드 또는 가리지 않은 예약 번호는 보내지 마세요." },
      { question: "나중에 Homeground가 예약과 여행 조율도 할 수 있나요?", answer: "동선, 날짜와 필요한 서비스에 따라 가능할 수 있습니다. 전체 여행 설계 및 현지 지원은 별도의 서면 범위와 맞춤 견적으로 진행합니다." },
    ],
  },
  finalCta: {
    label: "지금 준비된 단계에서 시작하세요",
    title: "일정이 있다면 검토하고, 위시리스트만 있다면 구조를 만드세요.",
    body: "공개 가격은 위의 표준 범위에만 적용됩니다. 아직 확실하지 않다면 플래너에게 문의하세요. 서비스를 직접 선택해도 범위, 고정 가격 또는 견적과 납품 일정을 먼저 확인한 뒤 결제 방법을 안내합니다.",
    review: "일정 검토 요청 — US$69",
    build: "동선 설계 요청 — US$129",
    support: "또는 전체 여행 지원 문의",
  },
  schema: {
    pageName: "중국 여행 일정 검토 및 동선 설계",
    pageDescription: "US$69로 중국 일정을 검토하거나 US$129로 범위가 명확한 실행 가능한 동선을 설계받으세요.",
    serviceName: "중국 여행 일정 검토 및 동선 설계",
    serviceType: "독립 중국 여행 일정 검토 및 동선 설계",
    countryName: "중국",
    homeName: "홈",
    reviewOfferName: "내 일정 검토",
    reviewOfferDescription: "공개된 표준 범위 안에서 1–4명이 함께 이용하는 한 개의 중국 일별 일정을 서면으로 검토합니다.",
    buildOfferName: "내 동선 설계",
    buildOfferDescription: "공개된 표준 범위 안에서 1–4명이 함께 이용하는 중국 여행 동선 구조를 서면으로 설계합니다.",
  },
};

export const chinaItineraryReviewCopy: Record<
  HomegroundLocale,
  ChinaItineraryReviewCopy
> = { en, zh, ko };

export function getChinaItineraryReviewCopy(
  locale: HomegroundLocale,
): ChinaItineraryReviewCopy {
  return chinaItineraryReviewCopy[locale];
}

export function getChinaItineraryReviewLanguagePaths(): Record<string, string> {
  return {
    en: en.path,
    "zh-Hans": zh.path,
    ko: ko.path,
    "x-default": en.path,
  };
}
