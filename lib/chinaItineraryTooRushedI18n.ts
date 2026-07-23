import type { HomegroundLocale } from "./homegroundI18n";

export const itineraryRushGuideId = "is-your-china-itinerary-too-rushed" as const;

export interface ItineraryRushGuideCopy {
  htmlLang: string;
  pagePath: string;
  homePath: string;
  studioPath: string;
  servicePath: string;
  transportGuidePath: string;
  metadata: {
    title: string;
    description: string;
    headline: string;
    schemaDescription: string;
    socialImageAlt: string;
    openGraphLocale: string;
  };
  skipLink: string;
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  heroLead: string;
  routeStampLabel: string;
  routeStamp: readonly string[];
  byLabel: string;
  authorLabel: string;
  publishedLabel: string;
  publishedDateLabel: string;
  dynamicDetailsNote: string;
  quickAnswer: {
    label: string;
    title: string;
    detail: string;
    navLabel: string;
    checks: readonly {
      href: string;
      number: string;
      label: string;
      title: string;
      detail: string;
    }[];
  };
  cityChanges: {
    title: string;
    paragraphs: readonly string[];
    questions: readonly string[];
  };
  transferFigureCaption: string;
  transferDays: {
    title: string;
    intro: string;
    steps: readonly { label: string; detail: string }[];
    sourcePrefix: string;
    transportLinkLabel: string;
    sourceBridge: string;
    railLinkLabel: string;
    sourceSuffix: string;
  };
  hotelMoves: {
    title: string;
    intro: string;
    moveHeading: string;
    moveItems: readonly string[];
    stayHeading: string;
    stayItems: readonly string[];
  };
  fixedBookings: {
    title: string;
    paragraphs: readonly string[];
    rule: string;
  };
  fatigueChains: {
    title: string;
    intro: string;
    boardLabel: string;
    chains: readonly (readonly [string, string])[];
    closing: string;
  };
  removeCity: {
    title: string;
    paragraphs: readonly string[];
  };
  pace: {
    title: string;
    compactHeading: string;
    comfortableHeading: string;
    rows: readonly (readonly [string, string])[];
    closing: string;
  };
  workedExample: {
    label: string;
    title: string;
    intro: string;
    options: readonly { label: string; title: string; detail: string }[];
  };
  selfCheck: {
    label: string;
    title: string;
    lead: string;
    items: readonly string[];
    nextLabel: string;
    nextTitle: string;
  };
  services: {
    reviewIntro: string;
    reviewCta: string;
    buildIntro: string;
    buildCta: string;
    exploreIntro: string;
    exploreCta: string;
    exploreNote: string;
  };
  faq: {
    label: string;
    title: string;
    items: readonly { question: string; answer: string }[];
  };
  sourceNote: {
    title: string;
    detail: string;
    railLabel: string;
    palaceLabel: string;
    museumLabel: string;
  };
}

const sharedChecks = {
  hrefs: [
    "#city-changes",
    "#transfer-days",
    "#hotel-moves",
    "#fixed-bookings",
    "#fatigue-chains",
  ],
  numbers: ["01", "02", "03", "04", "05"],
} as const;

const en: ItineraryRushGuideCopy = {
  htmlLang: "en",
  pagePath: "/guides/is-your-china-itinerary-too-rushed/",
  homePath: "/",
  studioPath: "/studio/",
  servicePath: "/china-itinerary-review/",
  transportGuidePath: "/guides/beijing-zhangjiajie-shanghai-transport/",
  metadata: {
    title: "China Itinerary Too Rushed? A Practical Check",
    description:
      "Check whether your China itinerary is too rushed by testing city changes, door-to-door transfers, hotel moves, fixed bookings and recovery time.",
    headline: "Is Your China Itinerary Too Rushed?",
    schemaDescription:
      "A practical China itinerary check for city changes, door-to-door transfers, hotel moves, fixed bookings and recovery time.",
    socialImageAlt:
      "A softened railway platform used as a non-location-specific illustration of a transfer day.",
    openGraphLocale: "en_US",
  },
  skipLink: "Skip to article",
  breadcrumbLabel: "Breadcrumb",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Is this China itinerary too rushed?",
  eyebrow: "China itinerary reality check",
  heroLead:
    "A practical check for city changes, full transfer days, hotel moves, timed visits and the pace your group can actually keep.",
  routeStampLabel: "What this guide checks",
  routeStamp: ["City changes", "Transfer days", "Hotel moves", "Fixed visits"],
  byLabel: "By",
  authorLabel: "Homeground Editorial Team",
  publishedLabel: "Published",
  publishedDateLabel: "22 July 2026",
  dynamicDetailsNote:
    "Dynamic transport and venue details should be checked again before travel.",
  quickAnswer: {
    label: "Quick answer",
    title: "There is no fixed city count that makes a China trip rushed.",
    detail:
      "A route with four cities can work for one group and be a poor fit for another. The real test is the chain of base changes, door-to-door transfers, fixed bookings and recovery time between them.",
    navLabel: "Five itinerary checks",
    checks: [
      {
        href: sharedChecks.hrefs[0],
        number: sharedChecks.numbers[0],
        label: "Base changes",
        title: "Count moves, not only cities",
        detail: "Every check-out and check-in takes usable time from the trip.",
      },
      {
        href: sharedChecks.hrefs[1],
        number: sharedChecks.numbers[1],
        label: "Transfer days",
        title: "Make the whole door-to-door journey visible",
        detail: "The time on a ticket is only one part of the moving day.",
      },
      {
        href: sharedChecks.hrefs[2],
        number: sharedChecks.numbers[2],
        label: "Hotel moves",
        title: "Treat a new base as a cost",
        detail: "A hotel move should earn its place in the route.",
      },
      {
        href: sharedChecks.hrefs[3],
        number: sharedChecks.numbers[3],
        label: "Fixed bookings",
        title: "Protect the hard edges",
        detail: "A timed visit should not depend on a long move working perfectly.",
      },
      {
        href: sharedChecks.hrefs[4],
        number: sharedChecks.numbers[4],
        label: "Fatigue chains",
        title: "Read consecutive days together",
        detail: "Late arrivals and early starts can compound quickly.",
      },
    ],
  },
  cityChanges: {
    title: "How many cities can you realistically visit in China?",
    paragraphs: [
      "There is no useful universal limit. Start with the places where you sleep, then count how often you actually change base. Two routes can contain Beijing, Xi’an, Chengdu and Shanghai yet demand a completely different amount of effort.",
      "One may move in a clean sequence with several nights in each place. The other may add a one-night stop, an arrival-day flight and a hotel switch inside a short stay. On a map, both appear to be four cities. On the ground, they are not the same trip.",
    ],
    questions: [
      "How many times will you check out, carry luggage and check in again?",
      "Does every short stay have a clear reason?",
      "Is a one-night stop giving you a real visit, or only proving that you were there?",
      "Is the route moving in one direction, or doubling back?",
    ],
  },
  transferFigureCaption:
    "A transfer day is made of the moments around the ticket, too.",
  transferDays: {
    title: "Turn every train or flight into a full transfer.",
    intro:
      "The duration printed on a ticket is not the whole journey. China Railway’s own guidance describes station-side steps such as entering the station, security, gates and boarding in addition to the train itself. Read the specific station and ticket guidance for your journey before travel.",
    steps: [
      {
        label: "Leaving the hotel",
        detail: "check-out, luggage and the ride to the station or airport.",
      },
      {
        label: "The departure side",
        detail: "entry, security, finding the gate or platform and boarding.",
      },
      {
        label: "The transport itself",
        detail: "train or flight time is one segment, not the whole day.",
      },
      {
        label: "The arrival side",
        detail:
          "leaving the station or airport, reaching the new hotel, checking in and getting oriented.",
      },
      {
        label: "The first real activity",
        detail: "decide whether it still deserves to be on that day.",
      },
    ],
    sourcePrefix: "See our",
    transportLinkLabel:
      "door-to-door Beijing–Zhangjiajie–Shanghai transport comparison",
    sourceBridge: "for a worked planning example, and read the",
    railLinkLabel: "China Railway English FAQ",
    sourceSuffix:
      "for current official rail guidance. Individual station procedures and ticket rules can change.",
  },
  hotelMoves: {
    title: "Treat a hotel move as a cost, not a blank space.",
    intro:
      "It is easy to write only “transfer to new hotel” and make a day look open. In reality, that move can split the day into two weak halves. A new base earns its place only when the benefit is clear.",
    moveHeading: "A move is earning its place when it protects",
    moveItems: [
      "a better next-day starting point;",
      "less repeated travel or walking;",
      "a fixed visit that would otherwise be too exposed.",
    ],
    stayHeading: "A single base may be stronger when it protects",
    stayItems: [
      "a full morning or easier arrival day;",
      "more room for luggage and check-in friction;",
      "the energy of a parent, child or slower walker.",
    ],
  },
  fixedBookings: {
    title: "Put fixed bookings before flexible ideas.",
    paragraphs: [
      "A timed-entry museum, performance, train or flight creates a hard edge in the day. Put it on the route before loose ideas such as “wander the neighbourhood” or “see another attraction if there is time.”",
      "Reservation systems, opening hours and operating notices can change. Check the official page for the particular museum, park or attraction you care about rather than relying on a generic rule copied from another itinerary.",
    ],
    rule:
      "If a fixed visit matters, avoid making it depend on a long transfer arriving exactly as planned.",
  },
  fatigueChains: {
    title: "Look for fatigue chains, not isolated busy days.",
    intro:
      "An isolated early start may be manageable for some travellers. Several early starts after a late arrival, a long transfer and a high-walking day create a different problem. Read the trip top to bottom and look for patterns that have no recovery window.",
    boardLabel: "Examples of fatigue chains",
    chains: [
      ["Late arrival", "Early start"],
      ["Long transfer", "Timed entry"],
      ["High walking day", "More stairs tomorrow"],
    ],
    closing:
      "You do not need to empty every day. You need to know which days cannot absorb a delay, a changed plan or a lower-energy morning.",
  },
  removeCity: {
    title: "Remove a city only when it gives something specific back.",
    paragraphs: [
      "There is no universal rule that says three cities are better than four. A city is worth removing when doing so returns a full sightseeing day, one less hotel move, space around a non-negotiable booking or a usable recovery window for the people travelling.",
      "Do not remove a place merely because a generic itinerary says so. Remove it when there is no other way to protect the parts of the trip you care about most.",
    ],
  },
  pace: {
    title: "Compact is not the same as comfortable.",
    compactHeading: "A compact route",
    comfortableHeading: "A more comfortable route",
    rows: [
      ["More city changes and a fuller wish list.", "Fewer base changes and clearer priorities."],
      [
        "A transfer day still contains a major fixed activity.",
        "The move is light, or the fixed activity is protected.",
      ],
      [
        "Every day needs to go exactly to plan.",
        "A delay does not erase the only meaningful activity.",
      ],
      [
        "The fastest traveller sets the rhythm.",
        "The pace reflects the people actually travelling.",
      ],
    ],
    closing:
      "Neither style is automatically better. Some travellers knowingly choose a packed trip. The useful question is whether the route matches the pace you have chosen, rather than quietly demanding more than you expected.",
  },
  workedExample: {
    label: "Illustrative example — not a client trip",
    title: "Ten travel days, four bases: where a fragile sequence appears.",
    intro:
      "Imagine a couple with ten travel days, four hotel bases and three intercity moves. One transfer day includes a timed museum. The next morning has an early train. No single item is automatically wrong — together, they make two days depend on every transfer and check-in going smoothly.",
    options: [
      {
        label: "Option A",
        title: "Keep the cities",
        detail:
          "Move the timed visit onto a full day and make the travel day intentionally light.",
      },
      {
        label: "Option B",
        title: "Keep the visit",
        detail:
          "Remove one hotel move so the fixed booking no longer sits beside an unstable day.",
      },
      {
        label: "Option C",
        title: "Protect the priorities",
        detail:
          "Remove one city and return a complete day to the route instead of adding another partial arrival day.",
      },
    ],
  },
  selfCheck: {
    label: "A quick self-check before booking",
    title: "Look closer after two “yes” answers—or one high-consequence conflict.",
    lead:
      "One conflict is enough when it could cost a non-refundable booking or the only meaningful activity in a city.",
    items: [
      "Are you changing cities every one or two nights?",
      "Does a moving day also contain a timed attraction?",
      "Are you moving hotels during a short stay?",
      "Do several early starts follow a late arrival or high-walking day?",
      "Would one delay remove the only meaningful activity in a city?",
    ],
    nextLabel: "Choose by what you already have",
    nextTitle: "Your next step should match the state of your route.",
  },
  services: {
    reviewIntro: "I have a usable day-by-day draft.",
    reviewCta: "Review My Route — US$69",
    buildIntro: "I have dates and priorities, but no workable route yet.",
    buildCta: "Build My Route — US$129",
    exploreIntro: "I am still exploring and want an automated starting point.",
    exploreCta: "Use the free Route Finder",
    exploreNote: "No human review is included.",
  },
  faq: {
    label: "Common planning questions",
    title: "China itinerary pace: practical answers",
    items: [
      {
        question: "How many cities can you realistically visit in China?",
        answer:
          "There is no fixed number that works for every trip. Count overnight bases, door-to-door transfer days, hotel changes and the pace of the people travelling. Four cities can be comfortable in one route and fragile in another.",
      },
      {
        question: "What makes a China itinerary feel rushed?",
        answer:
          "The usual problem is not one busy day. It is a chain of base changes, partial arrival days, timed bookings, early starts and high-walking days with no room for delay or recovery.",
      },
      {
        question: "Is a fast China itinerary always a bad itinerary?",
        answer:
          "No. Some travellers deliberately choose a compact trip. It works when the trade-offs are visible, the group accepts the pace and the important days do not all depend on perfect transfers.",
      },
      {
        question: "Should I remove a city from my China trip?",
        answer:
          "Remove a city only when doing so returns something you actually value: a full sightseeing day, one less hotel move, protection around a fixed booking or a usable recovery window.",
      },
      {
        question: "Does the free Route Finder include a human itinerary review?",
        answer:
          "No. The Route Finder is a free automated starting point for travellers who are still exploring. Human review of a usable day-by-day draft is a separate fixed-scope service priced at US$69.",
      },
    ],
  },
  sourceNote: {
    title: "Source and editorial note",
    detail:
      "This guide deliberately does not give one fixed “arrive X minutes early” rule or a universal city limit. Transport schedules, airport procedures, reservation systems and operating notices change. Check the official source for the specific train, flight or venue before travel.",
    railLabel: "China Railway — English FAQ",
    palaceLabel: "The Palace Museum — Visit information",
    museumLabel: "National Museum of China — Visit information",
  },
};

const zh: ItineraryRushGuideCopy = {
  htmlLang: "zh-Hans",
  pagePath: "/zh/guides/is-your-china-itinerary-too-rushed/",
  homePath: "/zh/",
  studioPath: "/zh/studio/",
  servicePath: "/zh/china-itinerary-review/",
  transportGuidePath: "/zh/guides/beijing-zhangjiajie-shanghai-transport/",
  metadata: {
    title: "中国行程是不是太赶？一份现实检查",
    description:
      "从换城市、门到门转场、换酒店、固定预约与恢复时间，判断你的中国行程是否安排得太赶。",
    headline: "你的中国行程是不是太赶了？",
    schemaDescription:
      "用换城市、门到门转场、酒店搬迁、固定预约和恢复时间，检查一份中国行程是否真正可行。",
    socialImageAlt: "经过柔化处理的火车站站台，用于表达旅行转场日。",
    openGraphLocale: "zh_CN",
  },
  skipLink: "跳到正文",
  breadcrumbLabel: "面包屑导航",
  breadcrumbHome: "首页",
  breadcrumbCurrent: "中国行程是否太赶",
  eyebrow: "中国行程现实检查",
  heroLead:
    "从换城市、完整转场日、换酒店、定时预约，以及同行者真正能承受的节奏，检查你的路线是否合理。",
  routeStampLabel: "这篇指南检查什么",
  routeStamp: ["换城市", "转场日", "换酒店", "固定预约"],
  byLabel: "作者",
  authorLabel: "Homeground 编辑团队",
  publishedLabel: "发布于",
  publishedDateLabel: "2026 年 7 月 22 日",
  dynamicDetailsNote: "交通和场馆信息可能变化，出发前请再次核对。",
  quickAnswer: {
    label: "先说结论",
    title: "没有一个固定的城市数量，能直接判断中国行程是否太赶。",
    detail:
      "四座城市对一组旅客可能很从容，对另一组却可能十分脆弱。真正需要检查的是：换住宿地的次数、门到门转场、固定预约，以及这些安排之间有没有恢复时间。",
    navLabel: "五项行程检查",
    checks: [
      {
        href: sharedChecks.hrefs[0],
        number: sharedChecks.numbers[0],
        label: "更换住宿地",
        title: "不要只数城市，也要数搬迁",
        detail: "每一次退房、带行李移动和重新入住，都会消耗真正可用的旅行时间。",
      },
      {
        href: sharedChecks.hrefs[1],
        number: sharedChecks.numbers[1],
        label: "转场日",
        title: "把整段门到门旅程写出来",
        detail: "车票或机票上的时间，只是转场日的一部分。",
      },
      {
        href: sharedChecks.hrefs[2],
        number: sharedChecks.numbers[2],
        label: "换酒店",
        title: "把新的住宿地当作一项成本",
        detail: "每次换酒店都应该给路线带来明确回报。",
      },
      {
        href: sharedChecks.hrefs[3],
        number: sharedChecks.numbers[3],
        label: "固定预约",
        title: "先保护不能移动的安排",
        detail: "重要的定时参观，不应依赖一次长途转场毫无差错。",
      },
      {
        href: sharedChecks.hrefs[4],
        number: sharedChecks.numbers[4],
        label: "疲劳连锁",
        title: "连续几天放在一起看",
        detail: "晚到与早起叠加，很快就会放大体力压力。",
      },
    ],
  },
  cityChanges: {
    title: "来中国旅行，现实中能去几座城市？",
    paragraphs: [
      "没有一个对所有人都有效的上限。先列出每晚睡在哪里，再数一共要换几次住宿地。两条路线都可以写着北京、西安、成都、上海，但实际消耗的精力可能完全不同。",
      "一条路线可能一路顺行，每座城市住上几晚；另一条却夹着一晚停留、抵达当天的航班，以及短暂停留中的再次换酒店。地图上都是四座城市，落到现实里却不是同一趟旅行。",
    ],
    questions: [
      "你要退房、拖着行李移动、再重新入住多少次？",
      "每一次短暂停留是否都有清楚的理由？",
      "只住一晚，真的能完成一次有内容的游览，还是仅仅证明自己到过？",
      "路线是否大致朝一个方向走，还是不断折返？",
    ],
  },
  transferFigureCaption: "转场日也包括车票时间之外的每一个环节。",
  transferDays: {
    title: "把每一趟火车或航班，还原成完整转场。",
    intro:
      "票面时长并不是整段旅程。中国铁路的官方指引还涉及进站、安检、检票与乘车等站内环节。出发前，应按你的具体车站和车票再次查看相关说明。",
    steps: [
      { label: "离开酒店", detail: "退房、整理行李，再前往火车站或机场。" },
      { label: "出发端", detail: "进站、安检、找检票口或站台，然后登车或登机。" },
      { label: "交通本身", detail: "火车或飞行时长只是一段，不等于整个转场日。" },
      {
        label: "抵达端",
        detail: "离开车站或机场、前往新酒店、办理入住并熟悉周边。",
      },
      { label: "第一项真正的活动", detail: "重新判断它是否还值得留在当天。" },
    ],
    sourcePrefix: "可参考我们的",
    transportLinkLabel: "北京—张家界—上海门到门交通比较",
    sourceBridge: "查看具体的规划示例，并阅读",
    railLinkLabel: "中国铁路 12306 英文常见问题",
    sourceSuffix: "了解当前官方铁路指引。各车站流程与车票规则可能变化。",
  },
  hotelMoves: {
    title: "换酒店不是空白时间，而是一项真实成本。",
    intro:
      "行程里只写一句“前往新酒店”，很容易让这一天看起来仍然很空。实际上一趟搬迁可能把一天切成两个都不好用的半天。只有收益足够明确，新的住宿地才值得加入路线。",
    moveHeading: "当换酒店能保护这些内容时，它才有价值",
    moveItems: [
      "让第二天有更好的出发位置；",
      "减少反复乘车或步行；",
      "保护一项原本容易受影响的固定预约。",
    ],
    stayHeading: "当不换酒店能保护这些内容时，单一住宿地可能更好",
    stayItems: [
      "保住一个完整上午，或让抵达日更轻松；",
      "给行李、退房与入住的不确定性留出空间；",
      "照顾父母、孩子或步行较慢的同行者。",
    ],
  },
  fixedBookings: {
    title: "先放入固定预约，再安排可以移动的想法。",
    paragraphs: [
      "定时入场的博物馆、演出、火车或航班，都会给当天划出不可随意移动的边界。先把它们放进行程，再考虑“逛逛附近”或“有时间再去一个景点”之类的弹性安排。",
      "预约制度、开放时间和临时通知都可能变化。请查看你真正要去的博物馆、公园或景区官方页面，不要依赖从其他路线复制来的通用规则。",
    ],
    rule: "如果一项固定参观很重要，就不要让它依赖一段长途转场必须准点完成。",
  },
  fatigueChains: {
    title: "检查疲劳连锁，而不只是单独看某一天忙不忙。",
    intro:
      "对一些旅客来说，偶尔早起并不难。但如果晚到之后接着早起，前面又有长途转场和高强度步行，问题就完全不同。请从头到尾连着读一遍行程，找出没有恢复窗口的连续安排。",
    boardLabel: "疲劳连锁示例",
    chains: [
      ["深夜抵达", "次日早起"],
      ["长途转场", "定时入场"],
      ["高步行量", "第二天继续爬楼梯"],
    ],
    closing:
      "不必把每一天都清空。你真正需要知道的是：哪些天无法容纳延误、临时调整，或一次体力不足的早晨。",
  },
  removeCity: {
    title: "只有在删掉一座城市能换回具体价值时，才值得删。",
    paragraphs: [
      "没有“三座城市一定比四座更好”的通用规则。删掉一座城市，应该能换回一个完整游览日、少一次换酒店、给不可妥协的预约留出空间，或为同行者提供真正可用的恢复时间。",
      "不要只因为某份模板行程这样建议，就删掉一个地方。只有当没有其他办法保护你最看重的旅行内容时，这项取舍才有意义。",
    ],
  },
  pace: {
    title: "紧凑不等于舒适。",
    compactHeading: "紧凑型路线",
    comfortableHeading: "更舒适的路线",
    rows: [
      ["换更多城市，愿望清单也更满。", "减少住宿地，把优先级写得更清楚。"],
      ["转场日仍塞进一项重要的固定活动。", "转场日保持轻量，或把固定活动放到更稳妥的时间。"],
      ["每一天都必须完全按计划进行。", "即使延误，也不会失去当天唯一有意义的活动。"],
      ["由队伍里走得最快的人决定节奏。", "节奏反映真正同行者的体力与习惯。"],
    ],
    closing:
      "两种方式没有绝对好坏。有些旅客会明确选择高密度旅行。关键是路线是否符合你主动选择的节奏，而不是在不知不觉中要求你付出远超预期的体力。",
  },
  workedExample: {
    label: "说明性示例——不是真实客户行程",
    title: "10 个旅行日、4 个住宿地：脆弱的连续安排如何出现。",
    intro:
      "假设一对伴侣有 10 个旅行日、4 个酒店住宿地和 3 次城际转场。其中一个转场日还安排了定时参观博物馆，第二天一早又要赶火车。单看任何一项都不一定有错；连在一起后，两天的安排都开始依赖每次转场与入住必须顺利完成。",
    options: [
      {
        label: "方案 A",
        title: "保留所有城市",
        detail: "把定时参观移到完整游览日，并有意让转场日保持轻量。",
      },
      {
        label: "方案 B",
        title: "保留固定参观",
        detail: "少换一次酒店，让固定预约不再紧挨着一个不稳定的日子。",
      },
      {
        label: "方案 C",
        title: "保护最高优先级",
        detail: "删掉一座城市，把一个完整游览日还给路线，而不是再增加一个残缺的抵达日。",
      },
    ],
  },
  selfCheck: {
    label: "预订前快速自查",
    title: "出现两个“是”，或一个后果严重的冲突，就值得重新检查。",
    lead: "如果一次冲突可能让你损失不可退款的预订，或错过某座城市唯一重要的活动，一个就已经足够。",
    items: [
      "你是否每隔一两晚就要换一座城市？",
      "转场日是否同时安排了定时入场的景点？",
      "短暂停留期间是否还要更换酒店？",
      "晚到或高步行量之后，是否连续安排了好几个早起日？",
      "一次延误是否会让你失去某座城市唯一有意义的活动？",
    ],
    nextLabel: "按你现在已有的内容选择",
    nextTitle: "下一步应该与你的路线完成程度相匹配。",
  },
  services: {
    reviewIntro: "我已经有一份可以阅读的逐日行程。",
    reviewCta: "审核我的路线 — 69 美元",
    buildIntro: "我有日期和优先事项，但还没有一条可执行的路线。",
    buildCta: "帮我规划路线 — 129 美元",
    exploreIntro: "我还在探索阶段，想先获得一个自动生成的起点。",
    exploreCta: "使用免费路线查找器",
    exploreNote: "不包含人工审核。",
  },
  faq: {
    label: "常见规划问题",
    title: "关于中国旅行节奏的实际回答",
    items: [
      {
        question: "来中国旅行，现实中能去几座城市？",
        answer:
          "没有一个适用于所有行程的固定数字。请同时计算住宿地、门到门转场日、换酒店次数和同行者的节奏。同样是四座城市，一条路线可能很从容，另一条却可能十分脆弱。",
      },
      {
        question: "什么会让中国行程显得太赶？",
        answer:
          "问题通常不在于某一天很忙，而在于换住宿地、残缺的抵达日、定时预约、早起和高步行量连续出现，中间没有应对延误或恢复体力的空间。",
      },
      {
        question: "节奏快的中国行程一定不好吗？",
        answer:
          "不一定。有些旅客会主动选择紧凑路线。只要取舍清楚、同行者接受这个节奏，而且重要日程不全都依赖转场毫无差错，它就可能成立。",
      },
      {
        question: "我应该从中国旅行中删掉一座城市吗？",
        answer:
          "只有当删掉一座城市能换回你真正重视的东西时再删：一个完整游览日、少一次换酒店、保护一项固定预约，或留出可用的恢复时间。",
      },
      {
        question: "免费路线查找器包含人工行程审核吗？",
        answer:
          "不包含。路线查找器是给仍在探索阶段的旅客使用的免费自动化起点。人工审核一份可用的逐日草案，是另一项范围固定、价格为 69 美元的服务。",
      },
    ],
  },
  sourceNote: {
    title: "来源与编辑说明",
    detail:
      "本指南刻意不提供统一的“提前 X 分钟到达”规则，也不规定通用的城市数量上限。交通时刻、机场流程、预约制度和运营通知都可能变化。出发前请为具体车次、航班或场馆查看官方来源。",
    railLabel: "中国铁路 12306 — 英文常见问题",
    palaceLabel: "故宫博物院 — 参观信息",
    museumLabel: "中国国家博物馆 — 参观信息",
  },
};

const ko: ItineraryRushGuideCopy = {
  htmlLang: "ko",
  pagePath: "/ko/guides/is-your-china-itinerary-too-rushed/",
  homePath: "/ko/",
  studioPath: "/ko/studio/",
  servicePath: "/ko/china-itinerary-review/",
  transportGuidePath: "/ko/guides/beijing-zhangjiajie-shanghai-transport/",
  metadata: {
    title: "중국 여행 일정이 너무 빠듯한가요? 현실 점검 가이드",
    description:
      "도시 이동, 출발지부터 도착지까지의 전체 이동, 숙소 변경, 고정 예약과 회복 시간을 기준으로 중국 여행 일정이 너무 빠듯한지 확인해 보세요.",
    headline: "중국 여행 일정이 너무 빠듯한가요?",
    schemaDescription:
      "도시 이동, 출발지부터 도착지까지의 전체 이동, 숙소 변경, 고정 예약과 회복 시간으로 중국 여행 일정의 현실성을 점검하는 가이드입니다.",
    socialImageAlt: "이동일을 표현하기 위해 부드럽게 처리한 기차역 승강장 이미지.",
    openGraphLocale: "ko_KR",
  },
  skipLink: "본문으로 건너뛰기",
  breadcrumbLabel: "현재 위치",
  breadcrumbHome: "홈",
  breadcrumbCurrent: "중국 일정이 너무 빠듯한지 점검",
  eyebrow: "중국 일정 현실 점검",
  heroLead:
    "도시 변경, 온전한 이동일, 숙소 변경, 시간 지정 예약, 그리고 일행이 실제로 감당할 수 있는 속도로 일정을 점검합니다.",
  routeStampLabel: "이 가이드의 점검 항목",
  routeStamp: ["도시 변경", "이동일", "숙소 변경", "고정 일정"],
  byLabel: "작성",
  authorLabel: "Homeground 편집팀",
  publishedLabel: "게시",
  publishedDateLabel: "2026년 7월 22일",
  dynamicDetailsNote: "교통과 시설 정보는 변동될 수 있으므로 출발 전에 다시 확인하세요.",
  quickAnswer: {
    label: "먼저 보는 답",
    title: "도시 수만으로 중국 여행이 빠듯한지 판단할 수는 없습니다.",
    detail:
      "같은 4개 도시라도 어떤 일행에게는 여유롭고 다른 일행에게는 쉽게 무너질 수 있습니다. 실제로 확인할 것은 숙박 거점 변경, 출발지부터 도착지까지의 전체 이동, 고정 예약, 그리고 그 사이의 회복 시간입니다.",
    navLabel: "다섯 가지 일정 점검",
    checks: [
      {
        href: sharedChecks.hrefs[0],
        number: sharedChecks.numbers[0],
        label: "숙박 거점 변경",
        title: "도시뿐 아니라 이동 횟수를 세세요",
        detail: "체크아웃, 짐 이동, 재체크인은 실제 여행 시간을 사용합니다.",
      },
      {
        href: sharedChecks.hrefs[1],
        number: sharedChecks.numbers[1],
        label: "이동일",
        title: "출발지부터 도착지까지 전체 이동을 보세요",
        detail: "표에 적힌 시간은 이동일의 한 부분일 뿐입니다.",
      },
      {
        href: sharedChecks.hrefs[2],
        number: sharedChecks.numbers[2],
        label: "숙소 변경",
        title: "새 숙박 거점을 비용으로 보세요",
        detail: "숙소 변경에는 일정 안에서 분명한 이유가 있어야 합니다.",
      },
      {
        href: sharedChecks.hrefs[3],
        number: sharedChecks.numbers[3],
        label: "고정 예약",
        title: "움직일 수 없는 일정을 보호하세요",
        detail: "시간 지정 방문이 장거리 이동의 완벽한 진행에 의존해서는 안 됩니다.",
      },
      {
        href: sharedChecks.hrefs[4],
        number: sharedChecks.numbers[4],
        label: "피로의 연쇄",
        title: "연속된 날을 함께 읽으세요",
        detail: "늦은 도착과 이른 출발이 겹치면 피로가 빠르게 쌓입니다.",
      },
    ],
  },
  cityChanges: {
    title: "중국에서 현실적으로 몇 개 도시를 여행할 수 있을까요?",
    paragraphs: [
      "모든 여행에 통하는 숫자는 없습니다. 먼저 매일 밤 어디서 자는지 적고, 숙박 거점을 실제로 몇 번 바꾸는지 세어 보세요. 베이징·시안·청두·상하이를 모두 포함한 두 일정도 필요한 체력은 완전히 다를 수 있습니다.",
      "한 일정은 각 도시에서 며칠씩 머물며 한 방향으로 자연스럽게 이어질 수 있습니다. 다른 일정은 1박 경유, 도착일 항공편, 짧은 체류 중 숙소 변경까지 들어갈 수 있습니다. 지도에서는 모두 4개 도시지만 현장에서는 같은 여행이 아닙니다.",
    ],
    questions: [
      "체크아웃하고 짐을 옮긴 뒤 다시 체크인하는 일이 몇 번인가요?",
      "짧은 체류마다 분명한 이유가 있나요?",
      "1박만으로 실제 방문을 할 수 있나요, 아니면 단지 다녀왔다는 사실만 남나요?",
      "일정이 한 방향으로 이어지나요, 아니면 되돌아가나요?",
    ],
  },
  transferFigureCaption: "이동일에는 표에 적힌 시간 전후의 모든 순간도 포함됩니다.",
  transferDays: {
    title: "기차나 항공편을 온전한 이동 과정으로 바꿔 계산하세요.",
    intro:
      "표에 적힌 소요시간이 전체 여정은 아닙니다. 중국철도의 공식 안내도 열차 탑승 외에 역 진입, 보안검색, 개찰구와 승차 절차를 설명합니다. 출발 전 이용할 역과 표에 해당하는 안내를 다시 확인하세요.",
    steps: [
      { label: "호텔에서 출발", detail: "체크아웃, 짐 정리, 역이나 공항까지의 이동." },
      { label: "출발 구간", detail: "진입, 보안검색, 탑승구나 승강장 확인, 승차 또는 탑승." },
      { label: "교통수단 안", detail: "열차나 비행시간은 한 구간일 뿐, 하루 전체가 아닙니다." },
      {
        label: "도착 구간",
        detail: "역이나 공항을 나와 새 호텔로 이동하고 체크인한 뒤 주변을 파악하는 시간.",
      },
      { label: "첫 번째 실제 활동", detail: "그날 꼭 넣을 가치가 여전히 있는지 다시 판단하세요." },
    ],
    sourcePrefix: "구체적인 계획 예시는",
    transportLinkLabel: "베이징–장자제–상하이 전체 이동 비교",
    sourceBridge: "에서 확인하고, 현재 공식 철도 안내는",
    railLinkLabel: "중국철도 영문 FAQ",
    sourceSuffix: "를 참고하세요. 역별 절차와 승차권 규정은 변경될 수 있습니다.",
  },
  hotelMoves: {
    title: "숙소 변경을 빈 시간이 아니라 실제 비용으로 보세요.",
    intro:
      "일정에 ‘새 호텔로 이동’이라고만 쓰면 하루가 여유로워 보이기 쉽습니다. 실제로는 한 번의 이동이 하루를 활용하기 어려운 두 반나절로 나눌 수 있습니다. 분명한 이익이 있을 때만 새 숙박 거점이 제값을 합니다.",
    moveHeading: "숙소 변경으로 다음을 지킬 수 있다면 이동할 가치가 있습니다",
    moveItems: [
      "다음 날 더 좋은 위치에서 출발하기;",
      "반복되는 이동이나 도보 줄이기;",
      "그렇지 않으면 불안정해질 고정 방문 일정 보호하기.",
    ],
    stayHeading: "다음을 지킬 수 있다면 한 숙소에 머무는 편이 더 낫습니다",
    stayItems: [
      "온전한 오전이나 더 쉬운 도착일;",
      "짐과 체크인 변수에 대응할 여유;",
      "부모님, 아이, 걷는 속도가 느린 일행의 체력.",
    ],
  },
  fixedBookings: {
    title: "유동적인 계획보다 고정 예약을 먼저 놓으세요.",
    paragraphs: [
      "시간 지정 박물관, 공연, 기차나 항공편은 하루에 움직이기 어려운 경계를 만듭니다. ‘동네 산책’이나 ‘시간이 되면 다른 명소 방문’ 같은 유동적인 생각보다 먼저 일정에 배치하세요.",
      "예약 방식, 운영시간과 공지는 바뀔 수 있습니다. 다른 일정에서 가져온 일반 규칙에 의존하지 말고 실제로 방문할 박물관, 공원, 명소의 공식 페이지를 확인하세요.",
    ],
    rule: "중요한 고정 방문은 장거리 이동이 정확히 계획대로 도착해야만 가능한 위치에 두지 마세요.",
  },
  fatigueChains: {
    title: "하루의 바쁨보다 피로가 이어지는 구조를 찾으세요.",
    intro:
      "한 번의 이른 출발은 감당할 수 있을지 모릅니다. 하지만 늦은 도착과 장거리 이동, 많이 걷는 날 뒤에 이른 출발이 이어지면 문제가 달라집니다. 일정을 처음부터 끝까지 읽으며 회복할 틈이 없는 패턴을 찾아보세요.",
    boardLabel: "피로 연쇄의 예",
    chains: [
      ["늦은 도착", "이른 출발"],
      ["장거리 이동", "시간 지정 입장"],
      ["많이 걷는 날", "다음 날 또 계단"],
    ],
    closing:
      "매일을 비울 필요는 없습니다. 지연이나 변경, 체력이 떨어진 아침을 받아들일 수 없는 날이 언제인지 알아야 합니다.",
  },
  removeCity: {
    title: "도시 하나를 뺄 때 구체적으로 되찾는 것이 있어야 합니다.",
    paragraphs: [
      "3개 도시가 4개 도시보다 늘 낫다는 규칙은 없습니다. 도시 하나를 빼서 온전한 관광일, 한 번 줄어든 숙소 변경, 꼭 지켜야 하는 예약 주변의 여유, 또는 일행이 실제로 쉴 수 있는 시간을 되찾을 때 의미가 있습니다.",
      "일반적인 일정표가 권한다고 해서 장소를 빼지 마세요. 가장 중요하게 생각하는 여행 요소를 지킬 다른 방법이 없을 때 선택해야 합니다.",
    ],
  },
  pace: {
    title: "빽빽한 일정과 편안한 일정은 다릅니다.",
    compactHeading: "빽빽한 일정",
    comfortableHeading: "더 편안한 일정",
    rows: [
      ["도시 변경이 많고 희망 목록이 가득합니다.", "숙박 거점이 적고 우선순위가 분명합니다."],
      ["이동일에도 중요한 고정 일정이 들어갑니다.", "이동일이 가볍거나 고정 일정이 안전하게 보호됩니다."],
      ["매일이 정확히 계획대로 진행되어야 합니다.", "지연되어도 그날의 유일한 핵심 활동을 잃지 않습니다."],
      ["가장 빠른 사람이 일행의 속도를 정합니다.", "실제로 함께 여행하는 사람들의 속도에 맞춥니다."],
    ],
    closing:
      "어느 방식도 자동으로 더 좋지는 않습니다. 일부 여행자는 의도적으로 빽빽한 여행을 선택합니다. 중요한 것은 일정이 내가 선택한 속도와 맞는지, 예상보다 훨씬 많은 체력을 조용히 요구하고 있지는 않은지입니다.",
  },
  workedExample: {
    label: "설명을 위한 예시 — 실제 고객 일정이 아닙니다",
    title: "여행 10일, 숙박 거점 4곳: 불안정한 연속 일정이 생기는 지점",
    intro:
      "한 커플에게 여행 10일, 호텔 거점 4곳, 도시 간 이동 3회가 있다고 가정해 봅시다. 이동일 하나에 시간 지정 박물관이 있고, 다음 날 아침에는 이른 기차를 탑니다. 하나씩 보면 반드시 잘못된 것은 아니지만, 함께 놓으면 이틀 모두 모든 이동과 체크인이 순조로워야만 성립합니다.",
    options: [
      {
        label: "선택 A",
        title: "도시 유지",
        detail: "시간 지정 방문을 온전한 관광일로 옮기고 이동일은 의도적으로 가볍게 만듭니다.",
      },
      {
        label: "선택 B",
        title: "방문 일정 유지",
        detail: "숙소 변경을 한 번 줄여 고정 예약이 불안정한 날과 붙지 않게 합니다.",
      },
      {
        label: "선택 C",
        title: "우선순위 보호",
        detail: "도시 하나를 빼서 또 하나의 반쪽짜리 도착일 대신 온전한 하루를 되찾습니다.",
      },
    ],
  },
  selfCheck: {
    label: "예약 전 빠른 자가 점검",
    title: "‘예’가 두 개이거나 결과가 큰 충돌이 하나라면 더 자세히 보세요.",
    lead: "한 번의 충돌로 환불 불가 예약이나 한 도시의 유일한 핵심 활동을 잃을 수 있다면 하나만으로도 충분합니다.",
    items: [
      "1박이나 2박마다 도시를 바꾸나요?",
      "이동일에 시간 지정 명소도 들어가나요?",
      "짧은 체류 중에도 호텔을 바꾸나요?",
      "늦은 도착이나 많이 걷는 날 뒤에 이른 출발이 여러 번 이어지나요?",
      "한 번의 지연으로 한 도시의 유일한 핵심 활동을 잃게 되나요?",
    ],
    nextLabel: "현재 가진 자료에 맞춰 선택하세요",
    nextTitle: "다음 단계는 일정의 현재 완성도와 맞아야 합니다.",
  },
  services: {
    reviewIntro: "이미 활용 가능한 일자별 일정 초안이 있습니다.",
    reviewCta: "내 일정 검토 — US$69",
    buildIntro: "날짜와 우선순위는 있지만 실행 가능한 일정은 아직 없습니다.",
    buildCta: "내 일정 설계 — US$129",
    exploreIntro: "아직 탐색 중이며 자동으로 만든 출발점이 필요합니다.",
    exploreCta: "무료 Route Finder 사용",
    exploreNote: "사람이 직접 검토하는 서비스는 포함되지 않습니다.",
  },
  faq: {
    label: "자주 묻는 일정 질문",
    title: "중국 여행 속도에 대한 현실적인 답",
    items: [
      {
        question: "중국에서 현실적으로 몇 개 도시를 여행할 수 있나요?",
        answer:
          "모든 여행에 통하는 고정 숫자는 없습니다. 숙박 거점, 출발지부터 도착지까지 이동하는 날, 숙소 변경, 일행의 속도를 함께 계산하세요. 같은 4개 도시라도 한 일정은 편안하고 다른 일정은 쉽게 무너질 수 있습니다.",
      },
      {
        question: "무엇이 중국 여행 일정을 너무 빠듯하게 만드나요?",
        answer:
          "보통 문제는 바쁜 하루 하나가 아닙니다. 숙박 거점 변경, 반쪽짜리 도착일, 시간 지정 예약, 이른 출발, 많이 걷는 날이 지연이나 회복의 틈 없이 이어지는 구조입니다.",
      },
      {
        question: "빠른 중국 여행 일정은 항상 나쁜가요?",
        answer:
          "아닙니다. 일부 여행자는 의도적으로 빽빽한 일정을 선택합니다. 무엇을 포기하는지 분명하고 일행이 속도에 동의하며 중요한 날이 모두 완벽한 이동에 의존하지 않는다면 가능합니다.",
      },
      {
        question: "중국 여행에서 도시 하나를 빼야 할까요?",
        answer:
          "온전한 관광일, 한 번 줄어든 숙소 변경, 고정 예약 보호, 실제로 쉴 수 있는 시간처럼 내가 중요하게 생각하는 것을 되찾을 때만 도시를 빼세요.",
      },
      {
        question: "무료 Route Finder에 사람의 일정 검토가 포함되나요?",
        answer:
          "아닙니다. Route Finder는 아직 탐색 중인 여행자를 위한 무료 자동 출발점입니다. 활용 가능한 일자별 초안을 사람이 검토하는 서비스는 별도의 고정 범위 서비스이며 가격은 US$69입니다.",
      },
    ],
  },
  sourceNote: {
    title: "출처 및 편집 안내",
    detail:
      "이 가이드는 일률적인 ‘X분 전 도착’ 규칙이나 도시 수 제한을 제시하지 않습니다. 교통 시간표, 공항 절차, 예약 방식과 운영 공지는 바뀔 수 있습니다. 출발 전 실제 열차, 항공편, 시설의 공식 정보를 확인하세요.",
    railLabel: "중국철도 — 영문 FAQ",
    palaceLabel: "고궁박물원 — 관람 안내",
    museumLabel: "중국국가박물관 — 관람 안내",
  },
};

const copies: Record<HomegroundLocale, ItineraryRushGuideCopy> = { en, zh, ko };

export function getItineraryRushGuideCopy(
  locale: HomegroundLocale = "en",
): ItineraryRushGuideCopy {
  return copies[locale];
}
