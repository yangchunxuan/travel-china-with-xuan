import type { HomegroundLocale } from "./homegroundI18n";

interface Section {
  id: string;
  title: string;
  lead?: string;
  paragraphs: string[];
}

interface RouteRow {
  route: string;
  verdict: "yes" | "no" | "ask";
  why: string;
}

interface AreaRow {
  where: string;
  open: string;
  /** Marks the rows that quietly break itineraries. */
  restricted?: boolean;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface SourceLink {
  label: string;
  url: string;
}

export interface TransitRouteCheckCopy {
  htmlLang: string;
  homePath: string;
  guidesPath: string;
  skipLink: string;
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbGuides: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  title: string;
  directAnswer: string;
  directAnswerTail: string;
  directAnswerClose: string;
  heroAlt: string;
  heroCaption: string;
  ruleSection: Section;
  tableTitle: string;
  tableColumnRoute: string;
  tableColumnVerdict: string;
  tableColumnWhy: string;
  verdictLabels: Record<RouteRow["verdict"], string>;
  routes: RouteRow[];
  tableNote: string;
  needSection: Section;
  breakSection: Section;
  areaTitle: string;
  areaIntro: string;
  areaColumnWhere: string;
  areaColumnOpen: string;
  areas: AreaRow[];
  areaNote: string;
  areaTableLinkLabel: string;
  areaTableUrl: string;
  clockSection: Section;
  reviewTitle: string;
  reviewBody: string;
  reviewBoundary: string;
  sourcesLabel: string;
  sources: SourceLink[];
  hotlineNote: string;
  faqTitle: string;
  faq: FaqItem[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaAction: string;
  relatedTitle: string;
  relatedLinkLabel: string;
  relatedLinkDescription: string;
  updatedLabel: string;
  updatedDate: string;
  schemaAbout: string[];
}

const sharedSources: SourceLink[] = [
  {
    label:
      "National Immigration Administration — Announcement No. 4 (2025): 65 ports, conditions, next-day clock",
    url: "https://en.nia.gov.cn/n147413/c187308/content.html",
  },
  {
    label:
      "National Immigration Administration — current 240-hour transit policy",
    url: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
  },
  {
    label: "National Immigration Administration — 30-day visa-free list",
    url: "https://en.nia.gov.cn/n147418/n147463/c183390/content.html",
  },
];

const areaTableUrl = "https://en.nia.gov.cn/n147413/c187308/part/189828.png";

const copies: Record<HomegroundLocale, TransitRouteCheckCopy> = {
  en: {
    htmlLang: "en",
    homePath: "/",
    guidesPath: "/guides/",
    skipLink: "Skip to the guide",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbGuides: "Guides",
    breadcrumbCurrent: "240-hour visa-free transit route check",
    eyebrow: "Entry guide · Route check",
    title: "China 240-Hour Visa-Free Transit: Does Your Route Qualify?",
    directAnswer:
      "An A → mainland China → C route is necessary, but route direction alone does not make you eligible for 240-hour visa-free transit.",
    directAnswerTail:
      "You must also hold an ordinary passport from one of the 57 eligible countries, have at least three months of passport validity, use designated ports, stay within permitted areas and carry a confirmed onward ticket to a different country or region within 240 hours.",
    directAnswerClose:
      "Check every condition against the current National Immigration Administration rules and your airline before departure. Homeground can screen the route; the airline and Chinese immigration make the final decision.",
    heroAlt:
      "Diagram of the transit rule: country or region A, then mainland China, then a different country or region C.",
    heroCaption:
      "This diagram tests only the A → China → C route direction; it does not establish full eligibility.",
    ruleSection: {
      id: "the-rule",
      title: "The route-direction test, in two examples",
      paragraphs: [
        "New York → Shanghai → Tokyo passes the route-direction test. You arrived from the US and leave for Japan: two different places.",
        "New York → Shanghai → Los Angeles fails the route-direction test. You arrived from the US and leave for the US. A round trip is still a round trip, even when the two American cities are three thousand miles apart.",
        "These examples test route direction only. Nationality, passport, ticket, port and permitted-area conditions still apply.",
      ],
    },
    tableTitle: "Does the route direction pass?",
    tableColumnRoute: "Your route",
    tableColumnVerdict: "Verdict",
    tableColumnWhy: "Why",
    verdictLabels: {
      yes: "Route passes",
      no: "Route fails",
      ask: "Ask the airline",
    },
    routes: [
      {
        route: "New York → Shanghai → Tokyo",
        verdict: "yes",
        why: "US in, Japan out",
      },
      {
        route: "Seoul → Shanghai → London",
        verdict: "yes",
        why: "Korea in, UK out",
      },
      {
        route: "London → Shanghai → Hong Kong",
        verdict: "yes",
        why: "Hong Kong counts as a separate region — an official Shanghai example",
      },
      {
        route: "Taipei → Shanghai → Seoul",
        verdict: "yes",
        why: "Taiwan region counts, per the official 2026 guide",
      },
      {
        route: "US → Beijing → Xi'an → Shanghai → Japan",
        verdict: "yes",
        why: "Enter and leave by different Chinese cities; travel between permitted areas is allowed",
      },
      {
        route: "Busan → Beijing → Hong Kong, different airlines",
        verdict: "yes",
        why: "Beijing's official guide confirms separate airlines don't break it",
      },
      {
        route: "Tokyo → Shanghai → Tokyo",
        verdict: "no",
        why: "Japan in, Japan out",
      },
      {
        route: "Los Angeles → Beijing → Shanghai → New York",
        verdict: "no",
        why: "US in, US out — the Chinese leg doesn't change that",
      },
      {
        route: "Sydney → Shanghai → Melbourne",
        verdict: "no",
        why: "Australia in, Australia out",
      },
      {
        route: "Tokyo → Hong Kong stop → Shanghai → Tokyo",
        verdict: "ask",
        why: "Depends whether Hong Kong is a real connection or just a stop on one through-flight",
      },
    ],
    tableNote:
      "This table checks route direction only. Long itineraries are judged on the sectors immediately either side of China: Shanghai treats London → Tokyo → Shanghai → London as Tokyo → Shanghai → London, so its direction passes.",
    needSection: {
      id: "do-you-need-it",
      title: "First — do you even need this?",
      lead: "If you hold a UK, Irish, Canadian, Australian or New Zealand passport, probably not.",
      paragraphs: [
        "Those passports currently get 30 days visa-free for tourism with no third-country requirement at all. No A-to-C puzzle, no onward ticket to prove. Check your own end date, then stop reading this page and go plan the trip.",
        "This page is for everyone else — most notably US passports, which are not on that 30-day list. For many ordinary US mainland round trips, an L tourist visa is still required; this transit policy helps only when every condition above is met.",
      ],
    },
    breakSection: {
      id: "where-routes-break",
      title: "Where routes actually break",
      lead: "Even when the A-to-C direction works, three practical ticketing checks can still break the plan.",
      paragraphs: [
        "Connections versus through-flights. A stop in Hong Kong on a single through-flight is not the same as connecting through Hong Kong on separate sectors — and it can change what counts as your A. Only the airline can tell you how your ticket is written.",
        "Separate tickets. Not disqualifying in themselves. But you need both carriers to actually see and verify your onward journey, and separately-booked flights have a way of not talking to each other at check-in.",
        "The airline decides before China does. Your documents get checked at the departure gate by an airline agent, hours before any Chinese official sees them. If the agent isn't up to date — many pages still say 60 ports when it has been 65 since 5 November 2025 — show them the current announcement.",
      ],
    },
    areaTitle: "Inside China: not everywhere",
    areaIntro:
      "Twenty-four provincial-level regions take part, and you can travel between the permitted areas. But “the province is on the list” does not always mean the whole province.",
    areaColumnWhere: "Where",
    areaColumnOpen: "What's actually open",
    areas: [
      { where: "Beijing · Shanghai · Chongqing", open: "The whole municipality" },
      { where: "Xi'an", open: "All of Shaanxi" },
      { where: "Zhangjiajie", open: "All of Hunan" },
      { where: "Guangzhou · Shenzhen", open: "All of Guangdong" },
      {
        where: "Chengdu",
        open: "11 named Sichuan cities only",
        restricted: true,
      },
      {
        where: "Guilin",
        open: "12 named Guangxi cities only",
        restricted: true,
      },
    ],
    areaNote:
      "Chengdu and Guilin are where plans quietly fail. Check the official port-and-area table for every stop.",
    areaTableLinkLabel: "official port-and-area table",
    areaTableUrl,
    clockSection: {
      id: "the-clock",
      title: "The clock starts tomorrow, not now",
      paragraphs: [
        "The 240 hours are counted from 00:00 on the day after you enter — not from the moment you land.",
        "Arrive in Shanghai at 3pm on 1 August, and the clock starts at midnight going into 2 August. You have until the end of 11 August. In practice that is closer to eleven days than ten.",
        "Follow the deadline immigration actually gives you at the port, and leave slack for a cancelled flight.",
      ],
    },
    reviewTitle: "Written and checked",
    reviewBody:
      "Homeground China is a China travel agency drawing on our planning team’s first-hand local experience. The policy conditions on this page come from the National Immigration Administration and official municipal guidance, checked 20 September 2026. We re-check because ports and country lists change.",
    reviewBoundary:
      "We screen route structure. We do not decide immigration eligibility, file visa applications, or guarantee entry — the airline and Chinese immigration make those calls.",
    sourcesLabel: "Official sources",
    sources: sharedSources,
    hotlineNote:
      "China Immigration Service Hotline 12367 for a route no page can settle.",
    faqTitle: "Questions",
    faq: [
      {
        question: "Does Hong Kong count as leaving China?",
        answer:
          "Yes. Hong Kong, Macao and Taiwan region all count as third regions — confirmed in the official 2026 multi-agency guide. You still need to be admissible to wherever you're going.",
      },
      {
        question: "Can I enter at Beijing and leave from Shanghai?",
        answer:
          "Yes, provided both are eligible ports and every stop in between sits inside a permitted area.",
      },
      {
        question: "What do I need to show?",
        answer:
          "An ordinary passport from an eligible country with at least three months left, a confirmed onward ticket to your third country or region within 240 hours, and the right to enter that destination. Immigration may also require the temporary-entry arrival card and its normal inspection.",
      },
      {
        question: "Is this a visa?",
        answer:
          "No. It's processed as temporary entry when you land. There's nothing to apply for beforehand.",
      },
    ],
    ctaEyebrow: "Once the entry path is settled",
    ctaTitle: "Then the real question starts: whether the days actually work.",
    ctaBody:
      "Ten days sounds generous until you price in the flight from Beijing to Zhangjiajie, the afternoon lost to a hotel change, and the fact that your last day ends at an airport. Send us the route you're considering — the cities, roughly when, and where you're flying onward to. We'll tell you what fits in the time the policy gives you, and what to drop.",
    ctaAction: "Start a trip conversation",
    relatedTitle: "Related guide",
    relatedLinkLabel: "Do US citizens need a visa for China in 2026?",
    relatedLinkDescription:
      "The same routing question, answered for an American passport.",
    updatedLabel: "Updated",
    updatedDate: "20 September 2026",
    schemaAbout: [
      "China 240-hour visa-free transit",
      "Transit route qualification",
      "China travel planning",
    ],
  },
  zh: {
    htmlLang: "zh-Hans",
    homePath: "/zh/",
    guidesPath: "/zh/guides/",
    skipLink: "跳到正文",
    breadcrumbLabel: "面包屑导航",
    breadcrumbHome: "首页",
    breadcrumbGuides: "指南",
    breadcrumbCurrent: "240 小时过境免签路线判断",
    eyebrow: "入境指南 · 路线判断",
    title: "中国 240 小时过境免签:你的路线符合条件吗?",
    directAnswer:
      "A → 中国大陆 → C 的路线方向是必要条件,但路线方向正确,不等于整个人已经符合 240 小时过境免签。",
    directAnswerTail:
      "你还必须持 57 个适用国家之一的普通护照,护照剩余有效期至少三个月,经指定口岸进出,只在许可区域内停留,并持有 240 小时内前往不同国家或地区、日期和座位已确认的续程票。",
    directAnswerClose:
      "出发前请同时核对国家移民管理局最新规则与承运航空公司的要求。Homeground 可以帮你检查路线结构;最终是否承运和准予入境,由航空公司与中国边检决定。",
    heroAlt: "过境规则示意图:国家或地区 A,中国大陆,另一个不同的国家或地区 C。",
    heroCaption: "这张图只判断 A → 中国 → C 的路线方向,不能单独证明整个人符合政策。",
    ruleSection: {
      id: "the-rule",
      title: "路线方向判断,两个例子说清",
      paragraphs: [
        "纽约 → 上海 → 东京,通过路线方向检查。你从美国来,往日本去:两个不同的地方。",
        "纽约 → 上海 → 洛杉矶,没有通过路线方向检查。你从美国来,往美国去。往返就是往返,哪怕这两座美国城市相隔三千英里。",
        "这些例子只判断路线方向。国籍、护照、票据、口岸和许可停留区域仍需逐项符合。",
      ],
    },
    tableTitle: "路线方向能通过吗?",
    tableColumnRoute: "路线",
    tableColumnVerdict: "判断",
    tableColumnWhy: "原因",
    verdictLabels: {
      yes: "方向通过",
      no: "方向不通过",
      ask: "问航空公司",
    },
    routes: [
      { route: "纽约 → 上海 → 东京", verdict: "yes", why: "美国进,日本出" },
      { route: "首尔 → 上海 → 伦敦", verdict: "yes", why: "韩国进,英国出" },
      {
        route: "伦敦 → 上海 → 香港",
        verdict: "yes",
        why: "香港算作单独地区 —— 这是上海官方给的例子",
      },
      {
        route: "台北 → 上海 → 首尔",
        verdict: "yes",
        why: "按 2026 版官方指南,台湾地区可作为第三地区",
      },
      {
        route: "美国 → 北京 → 西安 → 上海 → 日本",
        verdict: "yes",
        why: "可从不同的中国城市进出;许可区域之间可以跨省往来",
      },
      {
        route: "釜山 → 北京 → 香港,不同航司",
        verdict: "yes",
        why: "北京官方指南确认,不同航司不影响",
      },
      { route: "东京 → 上海 → 东京", verdict: "no", why: "日本进,日本出" },
      {
        route: "洛杉矶 → 北京 → 上海 → 纽约",
        verdict: "no",
        why: "美国进,美国出 —— 中间那段国内行程改变不了这一点",
      },
      { route: "悉尼 → 上海 → 墨尔本", verdict: "no", why: "澳大利亚进,澳大利亚出" },
      {
        route: "东京 →(经停香港)→ 上海 → 东京",
        verdict: "ask",
        why: "取决于香港是真正的中转,还是同一航班的经停",
      },
    ],
    tableNote:
      "这张表只判断路线方向。长行程看中国两侧紧邻的两段:上海把伦敦 → 东京 → 上海 → 伦敦视作东京 → 上海 → 伦敦,因此方向通过。",
    needSection: {
      id: "do-you-need-it",
      title: "先问一句 —— 你真的需要这条政策吗?",
      lead: "如果你持英国、爱尔兰、加拿大、澳大利亚或新西兰护照,大概率不需要。",
      paragraphs: [
        "这些护照目前可以免签停留 30 天用于旅游,完全没有第三国要求。不用解 A 到 C 的题,也不用证明续程票。确认一下你那本的政策截止日期,然后就别读这页了,去规划旅行吧。",
        "这一页是给其他人的 —— 尤其是美国护照,它不在那份 30 天名单里。对许多普通的美国护照中国大陆往返行程,仍需办理 L 旅游签;只有每项条件都符合时,这项过境政策才适用。",
      ],
    },
    breakSection: {
      id: "where-routes-break",
      title: "路线真正出问题的地方",
      lead: "即使 A 到 C 的方向正确,仍有三项票务核验可能让计划失效。",
      paragraphs: [
        "中转与经停的区别。同一趟直飞航班在香港经停,和分成两段中转香港,不是一回事 —— 而这会改变哪里算你的 A。你的票是怎么开的,只有航空公司能告诉你。",
        "分开买的票。本身不影响资格。但你需要两家航司都真的看到并核验你的续程行程,而分开订的航班在值机时经常互相不认。",
        "决定权先在航空公司,不在中国。你的证件是在登机口由地勤核查的,比任何中国边检看到它们早好几个小时。如果地勤的信息没更新 —— 很多页面还写 60 个口岸,而 2025 年 11 月 5 日起已经是 65 个 —— 把最新公告给他们看。",
      ],
    },
    areaTitle: "在中国境内:不是哪儿都能去",
    areaIntro:
      "24 个省级地区参与,许可区域之间可以往来。但“这个省在名单上”不等于整个省都开放。",
    areaColumnWhere: "地方",
    areaColumnOpen: "实际开放范围",
    areas: [
      { where: "北京 · 上海 · 重庆", open: "整个直辖市" },
      { where: "西安", open: "陕西全省" },
      { where: "张家界", open: "湖南全省" },
      { where: "广州 · 深圳", open: "广东全省" },
      { where: "成都", open: "仅四川 11 个指定城市", restricted: true },
      { where: "桂林", open: "仅广西 12 个指定城市", restricted: true },
    ],
    areaNote:
      "成都和桂林是计划悄悄失效的地方。每一站都去官方口岸与区域表核一遍。",
    areaTableLinkLabel: "官方口岸与许可区域表",
    areaTableUrl,
    clockSection: {
      id: "the-clock",
      title: "计时从明天开始,不是现在",
      paragraphs: [
        "240 小时自入境次日 00:00 起算 —— 不是从落地那一刻。",
        "8 月 1 日下午三点到上海,计时从进入 8 月 2 日的那个午夜开始。你可以待到 8 月 11 日结束。实际上更接近十一天,而不是十天。",
        "以边检现场给你的截止时间为准,并为航班取消留出余量。",
      ],
    },
    reviewTitle: "撰写与核实",
    reviewBody:
      "Homeground China 是一家拥有自己地接团队的中国旅行社。本页政策条件来自国家移民管理局与官方地方指引,核实于 2026 年 9 月 20 日。口岸和适用国家名单可能变化,我们会持续复核。",
    reviewBoundary:
      "我们判断路线结构。我们不认定入境资格、不代办签证、不保证入境 —— 这些由航空公司和中国边检决定。",
    sourcesLabel: "官方来源",
    sources: sharedSources,
    hotlineNote: "任何页面都定不了的路线,可拨中国移民管理服务热线 12367。",
    faqTitle: "常见问题",
    faq: [
      {
        question: "香港算离开中国吗?",
        answer:
          "算。香港、澳门和台湾地区都可作为第三地区 —— 2026 版官方多部门指南已明确。前提是你有资格进入目的地。",
      },
      {
        question: "能从北京入境、上海离境吗?",
        answer: "可以,前提是两地都是适用口岸,且中间每一站都在许可区域内。",
      },
      {
        question: "需要出示什么?",
        answer:
          "适用国家签发、剩余有效期三个月以上的普通护照,240 小时内前往第三国或地区且日期和座位已确认的续程票,以及进入该目的地的资格。边检还会要求填写临时入境卡并配合正常查验。",
      },
      {
        question: "这算签证吗?",
        answer: "不算。落地时按临时入境办理,事先没有什么可申请的。",
      },
    ],
    ctaEyebrow: "入境路径定下来之后",
    ctaTitle: "真正的问题才开始:这些天数到底够不够。",
    ctaBody:
      "十天听起来很宽裕,直到你算上北京飞张家界那一程、换酒店消耗掉的那个下午,以及最后一天是在机场结束的这件事。把你正在考虑的路线发给我们 —— 城市、大概什么时候、以及下一程飞往哪里。我们会告诉你在这个政策给的时间里什么放得进去,什么该舍掉。",
    ctaAction: "开始一次行程沟通",
    relatedTitle: "相关指南",
    relatedLinkLabel: "2026 年,美国护照去中国还需要签证吗?",
    relatedLinkDescription: "同一个路线问题,针对美国护照的答案。",
    updatedLabel: "最近更新",
    updatedDate: "2026 年 9 月 20 日",
    schemaAbout: ["240 小时过境免签", "过境路线判断", "中国旅行规划"],
  },
  ko: {
    htmlLang: "ko",
    homePath: "/ko/",
    guidesPath: "/ko/guides/",
    skipLink: "본문으로 건너뛰기",
    breadcrumbLabel: "탐색 경로",
    breadcrumbHome: "홈",
    breadcrumbGuides: "가이드",
    breadcrumbCurrent: "240시간 무비자 환승 경로 확인",
    eyebrow: "입국 가이드 · 경로 확인",
    title: "중국 240시간 무비자 환승: 내 경로는 조건을 만족할까요?",
    directAnswer:
      "A → 중국 본토 → C라는 경로 방향은 필수 조건이지만, 방향만 맞는다고 240시간 무비자 환승 자격이 확정되는 것은 아닙니다.",
    directAnswerTail:
      "57개 대상국 중 하나의 일반 여권, 3개월 이상의 여권 잔여 유효기간, 지정 출입국장, 허용 체류 지역, 그리고 240시간 안에 다른 국가·지역으로 출발하는 날짜와 좌석이 확정된 다음 구간 항공권도 필요합니다.",
    directAnswerClose:
      "출발 전 국가이민관리국의 최신 규정과 이용 항공사의 확인 기준을 함께 확인하세요. Homeground는 경로 구조를 점검해 드릴 수 있지만, 탑승 허용과 입국 최종 판단은 항공사와 중국 출입국 당국이 합니다.",
    heroAlt:
      "환승 규칙 다이어그램: 국가 또는 지역 A, 중국 본토, 그리고 다른 국가 또는 지역 C.",
    heroCaption: "이 그림은 A → 중국 → C의 경로 방향만 확인하며, 전체 자격을 증명하지는 않습니다.",
    ruleSection: {
      id: "the-rule",
      title: "경로 방향 판단, 두 가지 예시",
      paragraphs: [
        "뉴욕 → 상하이 → 도쿄는 경로 방향 검사를 통과합니다. 미국에서 와서 일본으로 떠나므로 서로 다른 두 곳입니다.",
        "뉴욕 → 상하이 → 로스앤젤레스는 경로 방향 검사를 통과하지 못합니다. 미국에서 와서 미국으로 떠납니다. 두 미국 도시가 5천 킬로미터 떨어져 있어도 왕복은 왕복입니다.",
        "이 예시는 경로 방향만 판단합니다. 국적, 여권, 항공권, 출입국장과 허용 체류 지역 조건도 모두 충족해야 합니다.",
      ],
    },
    tableTitle: "경로 방향은 통과할까요?",
    tableColumnRoute: "경로",
    tableColumnVerdict: "판정",
    tableColumnWhy: "이유",
    verdictLabels: {
      yes: "방향 통과",
      no: "방향 불통과",
      ask: "항공사에 확인",
    },
    routes: [
      { route: "뉴욕 → 상하이 → 도쿄", verdict: "yes", why: "미국 입국, 일본 출국" },
      { route: "서울 → 상하이 → 런던", verdict: "yes", why: "한국 입국, 영국 출국" },
      {
        route: "런던 → 상하이 → 홍콩",
        verdict: "yes",
        why: "홍콩은 별개 지역으로 인정 — 상하이 공식 예시",
      },
      {
        route: "타이베이 → 상하이 → 서울",
        verdict: "yes",
        why: "2026년 공식 안내에 따라 대만 지역도 인정",
      },
      {
        route: "미국 → 베이징 → 시안 → 상하이 → 일본",
        verdict: "yes",
        why: "서로 다른 중국 도시로 입·출국 가능하며 허용 지역 간 이동도 허용",
      },
      {
        route: "부산 → 베이징 → 홍콩, 다른 항공사",
        verdict: "yes",
        why: "베이징 공식 안내가 다른 항공사도 무방하다고 확인",
      },
      { route: "도쿄 → 상하이 → 도쿄", verdict: "no", why: "일본 입국, 일본 출국" },
      {
        route: "로스앤젤레스 → 베이징 → 상하이 → 뉴욕",
        verdict: "no",
        why: "미국 입국, 미국 출국 — 중국 국내 구간은 이를 바꾸지 못합니다",
      },
      { route: "시드니 → 상하이 → 멜버른", verdict: "no", why: "호주 입국, 호주 출국" },
      {
        route: "도쿄 →(홍콩 경유)→ 상하이 → 도쿄",
        verdict: "ask",
        why: "홍콩이 실제 환승인지, 같은 항공편의 경유인지에 따라 달라집니다",
      },
    ],
    tableNote:
      "이 표는 경로 방향만 확인합니다. 긴 일정은 중국 바로 양쪽 구간으로 판단합니다. 상하이는 런던 → 도쿄 → 상하이 → 런던을 도쿄 → 상하이 → 런던으로 보므로 방향 검사를 통과합니다.",
    needSection: {
      id: "do-you-need-it",
      title: "먼저 — 이 정책이 정말 필요하신가요?",
      lead: "영국·아일랜드·캐나다·호주·뉴질랜드 여권이라면 아마 필요 없습니다.",
      paragraphs: [
        "이 여권들은 현재 관광 목적으로 30일 무비자 입국이 가능하며 제3국 요건이 전혀 없습니다. A에서 C로 이어지는 퍼즐도, 증명해야 할 다음 구간 항공권도 없습니다. 본인 여권의 정책 종료일만 확인하고, 이 페이지는 닫고 여행 계획으로 넘어가세요.",
        "이 페이지는 그 외의 분들을 위한 것입니다. 특히 그 30일 명단에 없는 미국 여권이 그렇습니다. 일반적인 미국 여권의 중국 본토 왕복 일정에는 여전히 L 관광비자가 필요하며, 이 환승 정책은 위의 모든 조건을 충족할 때만 적용됩니다.",
      ],
    },
    breakSection: {
      id: "where-routes-break",
      title: "경로가 실제로 무너지는 지점",
      lead: "A–C 방향이 맞더라도 세 가지 실무 항공권 확인에서 계획이 어긋날 수 있습니다.",
      paragraphs: [
        "환승과 경유의 차이. 같은 항공편이 홍콩에 경유하는 것과, 구간을 나누어 홍콩에서 환승하는 것은 다릅니다. 그리고 이것이 어디를 A로 볼지를 바꿀 수 있습니다. 항공권이 어떻게 발권되었는지는 항공사만 알려 줄 수 있습니다.",
        "따로 구매한 항공권. 그 자체로 자격을 잃는 것은 아닙니다. 다만 두 항공사가 실제로 다음 구간을 확인해 줘야 하는데, 따로 예약된 항공편은 체크인에서 서로를 인식하지 못하는 일이 잦습니다.",
        "결정은 중국보다 항공사가 먼저 합니다. 서류는 탑승 게이트에서 항공사 직원이 확인하며, 이는 중국 당국이 보기 몇 시간 전입니다. 직원의 정보가 갱신되지 않았다면 — 2025년 11월 5일부터 65개 항구인데 아직 60개라고 적힌 페이지가 많습니다 — 최신 공고를 보여 주세요.",
      ],
    },
    areaTitle: "중국 안에서: 어디든 되는 것은 아닙니다",
    areaIntro:
      "24개 성급 지역이 참여하며 허용 지역 사이를 이동할 수 있습니다. 다만 “그 성이 명단에 있다”가 곧 “성 전체가 열려 있다”는 뜻은 아닙니다.",
    areaColumnWhere: "지역",
    areaColumnOpen: "실제 허용 범위",
    areas: [
      { where: "베이징 · 상하이 · 충칭", open: "직할시 전역" },
      { where: "시안", open: "산시성 전역" },
      { where: "장자제", open: "후난성 전역" },
      { where: "광저우 · 선전", open: "광둥성 전역" },
      { where: "청두", open: "쓰촨 지정 11개 도시만", restricted: true },
      { where: "구이린", open: "광시 지정 12개 도시만", restricted: true },
    ],
    areaNote:
      "청두와 구이린이 계획이 조용히 어긋나는 지점입니다. 모든 경유지를 공식 표로 확인하세요.",
    areaTableLinkLabel: "공식 항구·허용지역 표",
    areaTableUrl,
    clockSection: {
      id: "the-clock",
      title: "시계는 오늘이 아니라 내일 시작합니다",
      paragraphs: [
        "240시간은 입국한 다음 날 00:00부터 계산됩니다. 착륙한 순간이 아닙니다.",
        "8월 1일 오후 3시에 상하이에 도착하면, 시계는 8월 2일로 넘어가는 자정에 시작됩니다. 8월 11일이 끝날 때까지 머무를 수 있습니다. 실제로는 열흘보다 열하루에 가깝습니다.",
        "출입국 당국이 현장에서 부여한 기한을 따르고, 결항에 대비한 여유를 남기세요.",
      ],
    },
    reviewTitle: "작성과 확인",
    reviewBody:
      "Homeground China는 자체 현지 팀을 둔 중국 전문 여행사입니다. 이 페이지의 정책 조건은 국가이민관리국과 공식 지방 안내를 바탕으로 하며 2026년 9월 20일에 확인했습니다. 출입국장과 대상 국가 명단이 바뀔 수 있어 계속 재확인합니다.",
    reviewBoundary:
      "저희는 경로 구조를 확인합니다. 입국 자격을 판정하거나 비자를 대행하거나 입국을 보장하지 않습니다. 그 판단은 항공사와 중국 출입국 당국이 합니다.",
    sourcesLabel: "공식 출처",
    sources: sharedSources,
    hotlineNote:
      "어떤 페이지로도 결론이 나지 않는 경로는 중국 이민 서비스 핫라인 12367로 문의하세요.",
    faqTitle: "자주 묻는 질문",
    faq: [
      {
        question: "홍콩은 중국을 떠난 것으로 보나요?",
        answer:
          "그렇습니다. 홍콩, 마카오, 대만 지역 모두 제3지역으로 인정되며 2026년 공식 안내에 명시되어 있습니다. 물론 목적지에 입국할 자격은 있어야 합니다.",
      },
      {
        question: "베이징으로 들어가 상하이로 나올 수 있나요?",
        answer:
          "가능합니다. 두 곳 모두 적용 항구이고, 그 사이 모든 경유지가 허용 지역 안에 있어야 합니다.",
      },
      {
        question: "무엇을 제시해야 하나요?",
        answer:
          "대상국이 발급한 잔여 유효기간 3개월 이상의 일반 여권, 240시간 안에 제3국·지역으로 출발하는 날짜와 좌석이 확정된 다음 구간 항공권, 그리고 그 목적지에 입국할 자격이 필요합니다. 임시 입국카드 작성과 일반적인 출입국 심사에도 협조해야 합니다.",
      },
      {
        question: "이건 비자인가요?",
        answer:
          "아닙니다. 도착 시 임시 입국으로 처리됩니다. 미리 신청할 것은 없습니다.",
      },
    ],
    ctaEyebrow: "입국 경로가 정해지면",
    ctaTitle: "그때 진짜 질문이 시작됩니다. 그 일수가 실제로 되는가.",
    ctaBody:
      "열흘은 넉넉해 보입니다. 베이징에서 장자제로 가는 비행, 호텔을 옮기느라 사라지는 오후, 그리고 마지막 날이 공항에서 끝난다는 사실을 계산에 넣기 전까지는요. 고민 중인 경로를 보내 주세요. 도시, 대략의 시기, 그리고 다음에 어디로 향하는지를요. 이 정책이 주는 시간 안에 무엇이 들어가고 무엇을 빼야 하는지 알려 드리겠습니다.",
    ctaAction: "여행 상담 시작하기",
    relatedTitle: "관련 가이드",
    relatedLinkLabel: "2026년, 미국 여권으로 중국에 가려면 비자가 필요할까요?",
    relatedLinkDescription: "같은 경로 문제를, 미국 여권 기준으로 답한 글입니다.",
    updatedLabel: "최종 업데이트",
    updatedDate: "2026년 9월 20일",
    schemaAbout: ["중국 240시간 무비자 환승", "환승 경로 판단", "중국 여행 설계"],
  },
};

export function getTransitRouteCheckCopy(
  locale: HomegroundLocale,
): TransitRouteCheckCopy {
  return copies[locale];
}
