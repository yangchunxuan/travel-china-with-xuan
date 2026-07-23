import type { HomegroundLocale } from "./homegroundI18n";

export interface GuideTimelineStop {
  day: string;
  zone: string;
  coreVisit: string;
  sleepBase: string;
  condition: string;
}

interface GuideEvidenceItem {
  type: string;
  title: string;
  fact: string;
  calculation?: string;
  consequence: string;
  sources: readonly {
    index: number;
    label: string;
  }[];
}

export interface ZhangjiajieGuideCopy {
  htmlLang: string;
  homePath: string;
  skipLink: string;
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  hero: {
    eyebrow: string;
    lead: string;
    preparedBy: string;
    publishedLabel: string;
    publishedDate: string;
    updatedLabel: string;
    updatedDate: string;
    liveCheck: string;
  };
  quick: {
    sectionLabel: string;
    title: string;
    summaryBeforeEmphasis: string;
    summaryEmphasis: string;
    summaryAfterEmphasis: string;
    jumpLabel: string;
    fullDayLabel: string;
    fullDayBody: string;
    fullDayExampleLabel: string;
    fullDayExample: string;
    action: string;
    decisions: readonly {
      days: string;
      href: string;
      label: string;
      detail: string;
    }[];
  };
  routeLogic: {
    sectionLabel: string;
    title: string;
    intro: string;
    figureCaption: string;
    zones: readonly {
      number: string;
      name: string;
      sights: string;
      role: string;
    }[];
  };
  timelineLabels: {
    sleepBase: string;
    planAround: string;
    suffix: string;
  };
  twoDay: {
    sectionLabel: string;
    title: string;
    intro: string;
    whatStaysOut: string;
    options: readonly {
      label: string;
      title: string;
      stops: readonly GuideTimelineStop[];
      tradeoff: string;
    }[];
  };
  threeDay: {
    sectionLabel: string;
    title: string;
    intro: string;
    timelineLabel: string;
    stops: readonly GuideTimelineStop[];
    replacementLabel: string;
    replacementTitle: string;
    replacementBody: string;
    backLink: string;
  };
  fourDay: {
    sectionLabel: string;
    title: string;
    intro: string;
    sharedLabel: string;
    sharedTimelineLabel: string;
    sharedStops: readonly GuideTimelineStop[];
    branchMarker: string;
    tradeoffLabel: string;
    backLink: string;
    branches: readonly {
      id: "stay-deeper" | "continue-west";
      label: string;
      title: string;
      intro: string;
      stops: readonly GuideTimelineStop[];
      tradeoff: string;
    }[];
  };
  figures: {
    tianmen: {
      alt: string;
      title: string;
      caption: string;
    };
    fenghuang: {
      alt: string;
      title: string;
      caption: string;
    };
  };
  combination: {
    sectionLabel: string;
    title: string;
    groups: readonly {
      label: string;
      items: readonly {
        title: string;
        detail: string;
      }[];
    }[];
  };
  evidence: {
    sectionLabel: string;
    title: string;
    calculationLabel: string;
    liveConfirmation: string;
    checkedLabel: string;
    checkedDate: string;
    items: readonly GuideEvidenceItem[];
  };
  faq: {
    sectionLabel: string;
    title: string;
    items: readonly {
      question: string;
      answer: string;
    }[];
  };
  sources: {
    hiddenTitle: string;
    disclosureTitle: string;
    summary: string;
    intro: string;
    names: readonly string[];
  };
  finalCta: {
    sectionLabel: string;
    title: string;
    body: string;
    action: string;
  };
  structuredData: {
    homeName: string;
    placeName: string;
    mentions: readonly string[];
  };
}

const english: ZhangjiajieGuideCopy = {
  htmlLang: "en",
  homePath: "/",
  skipLink: "Skip to the guide",
  breadcrumbLabel: "Breadcrumb",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Zhangjiajie itinerary",
  hero: {
    eyebrow: "Route guide · Full days on the ground",
    lead:
      "See the national park properly, understand which sights can share a day, and know when adding Furong or Fenghuang changes the whole route.",
    preparedBy:
      "Prepared by Homeground China · local background: Xuan grew up in Zhangjiajie",
    publishedLabel: "Published",
    publishedDate: "20 July 2026",
    updatedLabel: "Updated",
    updatedDate: "21 July 2026",
    liveCheck: "Live details rechecked before booking",
  },
  quick: {
    sectionLabel: "The short answer",
    title: "Count full days on the ground.",
    summaryBeforeEmphasis:
      "Two days force a choice. Three cover the classic first visit. Four let you stay deeper ",
    summaryEmphasis: "or",
    summaryAfterEmphasis: " continue to Fenghuang.",
    jumpLabel: "Jump to an itinerary",
    fullDayLabel: "A full day assumes",
    fullDayBody:
      "You are already sleeping in the right base before Day 1. An intercity arrival at noon is an arrival day, not a full sightseeing day.",
    fullDayExampleLabel: "Concrete example",
    fullDayExample:
      "Arrive Monday evening and tour Tuesday plus Wednesday: that is 2 full days. Two nights work only with a safe Wednesday-evening departure; three nights is more comfortable. Apply the same rule to 3 or 4 full sightseeing days. A Day 4 transfer to Fenghuang is a four-day regional route, not four full Zhangjiajie sightseeing days.",
    action: "Check these days against my China route",
    decisions: [
      {
        days: "2 days",
        href: "#itinerary-2-days",
        label: "Choose depth or variety",
        detail: "Either two park days, or one park day plus Tianmen.",
      },
      {
        days: "3 days",
        href: "#itinerary-3-days",
        label: "Best first visit",
        detail: "Two proper park days plus one Tianmen day.",
      },
      {
        days: "4 days",
        href: "#itinerary-4-days",
        label: "Make one clear choice",
        detail: "Use four full days locally, or make Day 4 the westbound travel day.",
      },
    ],
  },
  routeLogic: {
    sectionLabel: "Route logic",
    title: "Four bases shape the route.",
    intro: "Wulingyuan → downtown → west. Reverse it and the hotel plan changes.",
    figureCaption: "Planning schematic · not to scale",
    zones: [
      {
        number: "01",
        name: "Wulingyuan",
        sights: "National Forest Park · Grand Canyon · Huanglong Cave",
        role: "Use as the base for park days.",
      },
      {
        number: "02",
        name: "Downtown",
        sights: "Tianmen Mountain · Zhangjiajie 72 Qilou · West railway station",
        role: "Switch base before the Tianmen day.",
      },
      {
        number: "03",
        name: "Furong",
        sights: "Riverside old town on the westbound rail corridor",
        role: "Add only when the wider route has another day.",
      },
      {
        number: "04",
        name: "Fenghuang",
        sights: "Ancient town · riverside evening · overnight stay",
        role: "Treat as the next overnight destination.",
      },
    ],
  },
  timelineLabels: {
    sleepBase: "Sleep base",
    planAround: "Plan around",
    suffix: "timeline",
  },
  twoDay: {
    sectionLabel: "2 full days",
    title: "Choose park depth or variety.",
    intro:
      "Two days cannot hold the park, Tianmen and the extensions. Choose one complete mini-route.",
    whatStaysOut: "What stays out",
    options: [
      {
        label: "Option A · Park depth",
        title: "Use both days inside the national park",
        stops: [
          {
            day: "Day 1",
            zone: "Wulingyuan",
            coreVisit: "East Gate → Tianzi Mountain → Yuanjiajie → Bailong Elevator",
            sleepBase: "Wulingyuan",
            condition:
              "Morning entry; recheck the reserved gate, cableway and elevator operation.",
          },
          {
            day: "Day 2",
            zone: "Wulingyuan",
            coreVisit: "South Gate → Huangshi Village → Golden Whip Stream → East Gate",
            sleepBase: "Wulingyuan",
            condition:
              "Allow more than the official walking estimates for viewpoints, queues, rest and wet paths.",
          },
        ],
        tradeoff:
          "Tianmen Mountain, Grand Canyon, Huanglong Cave, Furong and Fenghuang stay out.",
      },
      {
        label: "Option B · First look",
        title: "See one park sector and Tianmen Mountain",
        stops: [
          {
            day: "Day 1",
            zone: "Wulingyuan",
            coreVisit: "East Gate → Tianzi Mountain → Yuanjiajie → Bailong Elevator",
            sleepBase: "Move downtown after the park day",
            condition:
              "Treat this as a highlights edit; confirm entry, luggage and the hotel transfer in advance.",
          },
          {
            day: "Day 2",
            zone: "Downtown",
            coreVisit: "Tianmen Mountain",
            sleepBase: "Downtown or depart after a safe buffer",
            condition: "A suitable Tianmen entry period is available.",
          },
        ],
        tradeoff:
          "The second national-park day, Grand Canyon, cave and westbound towns stay out.",
      },
    ],
  },
  threeDay: {
    sectionLabel: "3 full days",
    title: "Best first visit: two park days + Tianmen.",
    intro: "Do not compress the national park into one hurried circuit.",
    timelineLabel: "Three-day Zhangjiajie timeline",
    stops: [
      {
        day: "Day 1",
        zone: "Wulingyuan",
        coreVisit: "East Gate → Tianzi Mountain → Yuanjiajie → Bailong Elevator",
        sleepBase: "Wulingyuan",
        condition:
          "Morning entry; the reserved gate and operating conditions can still change the order.",
      },
      {
        day: "Day 2",
        zone: "Wulingyuan",
        coreVisit: "South Gate → Huangshi Village → Golden Whip Stream → East Gate",
        sleepBase: "Move downtown after sightseeing",
        condition:
          "Allow extra time beyond the official walking estimates, then arrange luggage and the base change.",
      },
      {
        day: "Day 3",
        zone: "Downtown",
        coreVisit: "Tianmen Mountain",
        sleepBase: "Downtown or onward after a safe buffer",
        condition:
          "Confirm the entry period, queues and weather; 72 Qilou is optional.",
      },
    ],
    replacementLabel: "Replacement decision",
    replacementTitle: "If the Glass Bridge matters more",
    replacementBody:
      "Replace Tianmen with the Grand Canyon. Keep both park days, then confirm the Canyon route and ticket period live.",
    backLink: "Back to 2, 3 or 4-day choices",
  },
  fourDay: {
    sectionLabel: "4 days · one branch uses a travel day",
    title: "Keep two park days, then choose a direction.",
    intro:
      "Use four full sightseeing days to stay deeper around Zhangjiajie, or make Day 4 the travel-and-arrival day to Fenghuang. Four calendar days cannot do both.",
    sharedLabel: "Days 1–2 · Shared start",
    sharedTimelineLabel: "Shared first two days",
    sharedStops: [
      {
        day: "Day 1",
        zone: "Wulingyuan",
        coreVisit: "East Gate → Tianzi Mountain → Yuanjiajie → Bailong Elevator",
        sleepBase: "Wulingyuan",
        condition:
          "Morning entry; recheck the reserved gate, cableway and elevator operation.",
      },
      {
        day: "Day 2",
        zone: "Wulingyuan",
        coreVisit: "South Gate → Huangshi Village → Golden Whip Stream → East Gate",
        sleepBase: "Depends on the Day 3 branch",
        condition:
          "Allow extra walking time and choose the branch before booking the second hotel base.",
      },
    ],
    branchMarker: "Days 3–4 · Choose one direction",
    tradeoffLabel: "The trade-off",
    backLink: "Back to 2, 3 or 4-day choices",
    branches: [
      {
        id: "stay-deeper",
        label: "Branch A · Stay deeper",
        title: "Use all four days around Zhangjiajie",
        intro: "Choose this when the landscape matters more than another town.",
        stops: [
          {
            day: "Day 3",
            zone: "Wulingyuan area",
            coreVisit: "Grand Canyon · Huanglong Cave only if live checks allow",
            sleepBase: "Wulingyuan, then move downtown",
            condition:
              "Plan the Canyon as the core. Add the cave only with compatible entry times, arranged transport and no evening departure.",
          },
          {
            day: "Day 4",
            zone: "Downtown",
            coreVisit: "Tianmen Mountain",
            sleepBase: "Downtown or onward after a safe buffer",
            condition:
              "Tianmen slot, weather and departure align; 72 Qilou is optional.",
          },
        ],
        tradeoff: "Furong and Fenghuang stay out of this four-day route.",
      },
      {
        id: "continue-west",
        label: "Branch B · Continue west",
        title: "Use Day 4 to reach Fenghuang",
        intro: "Fenghuang fits only as the next overnight stop.",
        stops: [
          {
            day: "Day 3",
            zone: "Downtown",
            coreVisit: "Tianmen Mountain",
            sleepBase: "Downtown",
            condition: "A workable entry slot; 72 Qilou stays optional.",
          },
          {
            day: "Day 4",
            zone: "Zhangjiajie → Fenghuang",
            coreVisit: "Travel west · Fenghuang afternoon and evening",
            sleepBase: "Fenghuang",
            condition: "No return to Zhangjiajie; leave Fenghuang no earlier than Day 5.",
          },
        ],
        tradeoff:
          "Grand Canyon, Huanglong Cave and Furong stay out. Adding Furong requires more time.",
      },
    ],
  },
  figures: {
    tianmen: {
      alt: "Visitors climbing the steep stairway toward Tianmen Cave beneath low cloud at Tianmen Mountain.",
      title: "Tianmen Mountain",
      caption: "Plan it as a separate sightseeing day based from downtown Zhangjiajie.",
    },
    fenghuang: {
      alt: "Aerial view of Fenghuang Ancient Town, with a covered bridge over the Tuojiang River at dusk.",
      title: "Fenghuang at dusk",
      caption:
        "Treat it as the next overnight stop, not a rushed return trip to Zhangjiajie.",
    },
  },
  combination: {
    sectionLabel: "Combination rules",
    title: "Which pairings can share a day?",
    groups: [
      {
        label: "Can combine after checks",
        items: [
          {
            title: "Tianmen Mountain + Zhangjiajie 72 Qilou",
            detail:
              "Possible when the Tianmen slot, queues and traveller energy leave a comfortable evening.",
          },
          {
            title: "Grand Canyon + Huanglong Cave",
            detail:
              "Conditional, not the default. The Canyon’s complete B route alone is listed at about 3.5 hours; add the cave only with compatible entry times, arranged transport, an early start and no evening departure.",
          },
        ],
      },
      {
        label: "Do not promise by default",
        items: [
          {
            title: "Tianmen Mountain + Grand Canyon",
            detail:
              "Different zones and two queue-sensitive attractions make this an unreliable default.",
          },
          {
            title: "Furong + Fenghuang in one day",
            detail:
              "Even perfect transfers reduce both towns to timed stops; do not promise it.",
          },
        ],
      },
    ],
  },
  evidence: {
    sectionLabel: "Why this recommendation",
    title: "Five pieces of evidence change the route.",
    calculationLabel: "Input and calculation",
    liveConfirmation: "Requires live ticket and operator confirmation",
    checkedLabel: "Checked",
    checkedDate: "21 July 2026",
    items: [
      {
        type: "Official fact",
        title: "Two national-park days are not padding",
        fact:
          "The geopark’s two-day route separates high viewpoints from Huangshi Village and Golden Whip Stream; the stream walk alone is listed at 7.5 km and about two hours.",
        consequence: "One park day is a highlights edit; two protect the core landscape.",
        sources: [{ index: 1, label: "Official geopark route" }],
      },
      {
        type: "Homeground calculation",
        title: "A downtown hotel can add nearly three hours",
        fact:
          "Provincial guidance puts downtown–Wulingyuan at roughly 40 minutes by road.",
        calculation: "40 min × 4 hotel–park legs ≈ 160 min",
        consequence: "Two park nights in Wulingyuan avoid repeated backtracking.",
        sources: [{ index: 2, label: "Hunan transport guidance" }],
      },
      {
        type: "Planning judgement",
        title: "Fenghuang works as the next overnight stop",
        fact:
          "Rail continues west via Furong and Jishou to Fenghuang; the station still needs a local transfer to the old town.",
        consequence:
          "Use Fenghuang as the next overnight stop, not a same-day return.",
        sources: [
          { index: 5, label: "Westbound rail-corridor notice" },
          { index: 6, label: "Fenghuang station transfer guide" },
        ],
      },
      {
        type: "Booking gate",
        title: "A same-day pairing is never a promise",
        fact: "These pairings are working combinations, not confirmed products.",
        consequence: "Recheck live tickets, transfers, season and traveller pace.",
        sources: [],
      },
      {
        type: "Official duration + planning judgement",
        title: "Grand Canyon + Huanglong Cave is conditional",
        fact:
          "The Grand Canyon’s official guide lists about 3.5 hours for its complete B route. An official transport corridor reaches Huanglong Cave before the Canyon, but that does not make two timed attractions automatic.",
        consequence:
          "Keep the Canyon as the core; add the cave only after entry periods, transport, mobility and the evening buffer are confirmed.",
        sources: [
          { index: 7, label: "Official Canyon route times" },
          { index: 8, label: "Official transport corridor" },
          { index: 9, label: "Official Huanglong Cave overview" },
        ],
      },
    ],
  },
  faq: {
    sectionLabel: "Before you book",
    title: "Zhangjiajie planning questions",
    items: [
      {
        question: "Is two days enough for Zhangjiajie?",
        answer:
          "Yes for a first look: one compact day in the national park and one day at Tianmen Mountain. If the national park is the main reason for visiting, use both days there instead. Two days cannot also hold the Grand Canyon, cave and westbound towns.",
      },
      {
        question: "Can Tianmen Mountain and the Grand Canyon share one day?",
        answer:
          "Do not plan them together by default. They sit in different zones, both are vulnerable to queues and timed entry, and the transfer removes the recovery time a mountain day needs.",
      },
      {
        question: "Can Zhangjiajie Grand Canyon and Huanglong Cave share one day?",
        answer:
          "Sometimes, but treat it as a conditional long day rather than the default. Start early from Wulingyuan, confirm compatible entry periods and transport, and do not attach a train or flight that evening. Keep only the Grand Canyon if queues, weather or mobility reduce the buffer.",
      },
      {
        question: "Should I stay in Wulingyuan or downtown Zhangjiajie?",
        answer:
          "Use Wulingyuan for the national park, Grand Canyon and Huanglong Cave. Downtown is more practical for Tianmen Mountain, Zhangjiajie 72 Qilou and the main rail connections. A split stay often saves repeated backtracking.",
      },
      {
        question: "Can all seven wishlist stops fit in four days?",
        answer:
          "No. Keep every place on the wishlist, but choose one four-day branch: stay deeper around Zhangjiajie, or continue to Fenghuang and sleep there. A planner can then test the conflict against the rest of your China route.",
      },
    ],
  },
  sources: {
    hiddenTitle: "Sources and live checks",
    disclosureTitle: "Sources & live checks",
    summary: "10 official references · checked 21 July 2026",
    intro:
      "We use official destination and transport sources, then recheck entry times, operating conditions and transfers before booking.",
    names: [
      "Wulingyuan District: 2025 summer timed-entry notice (historical context)",
      "Zhangjiajie UNESCO Global Geopark: official two-day route",
      "Hunan Department of Culture and Tourism: Zhangjiajie transport baseline",
      "Hunan Department of Culture and Tourism: three-day planning guidance",
      "Hunan Government: Zhangjiajie 72 Qilou as an evening experience",
      "Ministry of Culture and Tourism: Zhangjiajie–Furong–Fenghuang rail connections",
      "Hunan Government: Fenghuang station transfer guide",
      "Zhangjiajie Grand Canyon: official visitor routes and estimated duration",
      "Hunan Road Transport Administration: Zhangjiajie Grand Canyon corridor",
      "Hunan Department of Culture and Tourism: Huanglong Cave overview",
    ],
  },
  finalCta: {
    sectionLabel: "Your whole China route",
    title: "Check Zhangjiajie against your whole China wishlist.",
    body:
      "Choose your China stops, total nights, party and pace. A person then checks Zhangjiajie arrival and departure timing, hotel changes and live ticket conflicts.",
    action: "Check my trip timing",
  },
  structuredData: {
    homeName: "Home",
    placeName: "Zhangjiajie",
    mentions: [
      "Wulingyuan",
      "Tianmen Mountain",
      "Furong Town",
      "Fenghuang Ancient Town",
    ],
  },
};

const chinese: ZhangjiajieGuideCopy = {
  htmlLang: "zh-Hans",
  homePath: "/zh/",
  skipLink: "跳到路线指南",
  breadcrumbLabel: "面包屑导航",
  breadcrumbHome: "首页",
  breadcrumbCurrent: "张家界路线指南",
  hero: {
    eyebrow: "路线指南 · 按完整游览日计算",
    lead:
      "认真游览国家森林公园，分清哪些景点可以同日安排，也看清加入芙蓉镇或凤凰古城后整条路线会如何改变。",
    preparedBy: "由 Homeground China 整理 · 本地背景：Xuan 在张家界长大",
    publishedLabel: "发布于",
    publishedDate: "2026年7月20日",
    updatedLabel: "更新于",
    updatedDate: "2026年7月21日",
    liveCheck: "预订前会重新核对实时信息",
  },
  quick: {
    sectionLabel: "先说结论",
    title: "按真正完整的游览日来计算。",
    summaryBeforeEmphasis: "2 天必须取舍，3 天适合第一次到访；4 天可以深度游张家界，",
    summaryEmphasis: "或者",
    summaryAfterEmphasis: "继续前往凤凰古城。",
    jumpLabel: "跳到对应天数的行程",
    fullDayLabel: "“完整一天”的前提",
    fullDayBody:
      "第 1 天前一晚已经住在合适的区域。中午才从其他城市抵达，只能算抵达日，不能算完整游览日。",
    fullDayExampleLabel: "具体例子",
    fullDayExample:
      "周一晚抵达，周二和周三游览，才算 2 个完整游览日。只有周三晚能安全离开时，2 晚才成立；更舒适是住 3 晚。3 或 4 个完整游览日也按同一规则计算。若第 4 天前往凤凰，那是四日区域路线，不是四个完整的张家界游览日。",
    action: "把这些天数放进我的中国路线检查",
    decisions: [
      {
        days: "2 天",
        href: "#itinerary-2-days",
        label: "在深度与丰富度之间选择",
        detail: "要么两天都给森林公园，要么森林公园一天加天门山一天。",
      },
      {
        days: "3 天",
        href: "#itinerary-3-days",
        label: "第一次来最合适",
        detail: "完整游览森林公园两天，再安排一天天门山。",
      },
      {
        days: "4 天",
        href: "#itinerary-4-days",
        label: "明确选择一个方向",
        detail: "四个完整日留在张家界，或把第 4 天作为向西移动日。",
      },
    ],
  },
  routeLogic: {
    sectionLabel: "路线逻辑",
    title: "四个住宿基地决定路线走向。",
    intro: "武陵源 → 市区 → 向西。方向反过来，住宿安排也要跟着变。",
    figureCaption: "路线规划示意 · 非实际比例",
    zones: [
      {
        number: "01",
        name: "武陵源",
        sights: "张家界国家森林公园 · 大峡谷 · 黄龙洞",
        role: "森林公园游览日以这里为住宿基地。",
      },
      {
        number: "02",
        name: "张家界市区",
        sights: "天门山 · 七十二奇楼 · 张家界西站",
        role: "天门山游览前切换到市区住宿。",
      },
      {
        number: "03",
        name: "芙蓉镇",
        sights: "位于向西铁路走廊上的河畔古镇",
        role: "只有整条路线多出一天时再加入。",
      },
      {
        number: "04",
        name: "凤凰古城",
        sights: "古城 · 沱江夜景 · 住宿一晚",
        role: "把这里当作下一站住宿地。",
      },
    ],
  },
  timelineLabels: {
    sleepBase: "住宿基地",
    planAround: "安排条件",
    suffix: "行程时间线",
  },
  twoDay: {
    sectionLabel: "2 个完整游览日",
    title: "选择深度，或选择丰富度。",
    intro: "2 天装不下森林公园、天门山和周边延伸，只能选一条完整的小路线。",
    whatStaysOut: "本方案不包含",
    options: [
      {
        label: "方案 A · 深入森林公园",
        title: "两天都留给国家森林公园",
        stops: [
          {
            day: "第 1 天",
            zone: "武陵源",
            coreVisit: "东门 → 天子山 → 袁家界 → 百龙天梯",
            sleepBase: "武陵源",
            condition: "早上入园；重新核对预约入口、索道与电梯运营情况。",
          },
          {
            day: "第 2 天",
            zone: "武陵源",
            coreVisit: "南门 → 黄石寨 → 金鞭溪 → 东门",
            sleepBase: "武陵源",
            condition: "在官方步行估时之外，为观景、排队、休息和湿滑路面留出更多时间。",
          },
        ],
        tradeoff: "天门山、大峡谷、黄龙洞、芙蓉镇和凤凰古城。",
      },
      {
        label: "方案 B · 初次看重点",
        title: "森林公园一个片区，加一天天门山",
        stops: [
          {
            day: "第 1 天",
            zone: "武陵源",
            coreVisit: "东门 → 天子山 → 袁家界 → 百龙天梯",
            sleepBase: "游览结束后转住市区",
            condition: "这是一日重点版；提前确认入口、行李和换酒店安排。",
          },
          {
            day: "第 2 天",
            zone: "张家界市区",
            coreVisit: "天门山",
            sleepBase: "住市区，或预留安全余量后离开",
            condition: "有合适的天门山入园时段。",
          },
        ],
        tradeoff: "森林公园第二天、大峡谷、黄龙洞和向西的古镇。",
      },
    ],
  },
  threeDay: {
    sectionLabel: "3 个完整游览日",
    title: "第一次来最合适：森林公园两天 + 天门山。",
    intro: "不要把国家森林公园压缩成一条匆忙的单日环线。",
    timelineLabel: "张家界三日路线",
    stops: [
      {
        day: "第 1 天",
        zone: "武陵源",
        coreVisit: "东门 → 天子山 → 袁家界 → 百龙天梯",
        sleepBase: "武陵源",
        condition: "早上入园；预约入口与实时运营仍可能改变当天顺序。",
      },
      {
        day: "第 2 天",
        zone: "武陵源",
        coreVisit: "南门 → 黄石寨 → 金鞭溪 → 东门",
        sleepBase: "游览结束后转住市区",
        condition: "在官方步行估时外另留余量，再安排好行李和住宿切换。",
      },
      {
        day: "第 3 天",
        zone: "张家界市区",
        coreVisit: "天门山",
        sleepBase: "住市区，或预留安全余量后前往下一站",
        condition: "确认入园时段、排队和天气；七十二奇楼为可选夜游。",
      },
    ],
    replacementLabel: "替换方案",
    replacementTitle: "如果玻璃桥对你更重要",
    replacementBody:
      "用大峡谷替换天门山。森林公园两天保持不变，再实时确认大峡谷路线和门票时段。",
    backLink: "返回 2、3、4 天方案选择",
  },
  fourDay: {
    sectionLabel: "4 天 · 其中一个分支含移动日",
    title: "保留森林公园两天，再选择一个方向。",
    intro:
      "四个完整游览日可以深入张家界周边；也可以把第 4 天作为前往凤凰的移动与抵达日。四个自然日不能两者都做。",
    sharedLabel: "第 1–2 天 · 两条分支相同",
    sharedTimelineLabel: "两条方案共同的前两天",
    sharedStops: [
      {
        day: "第 1 天",
        zone: "武陵源",
        coreVisit: "东门 → 天子山 → 袁家界 → 百龙天梯",
        sleepBase: "武陵源",
        condition: "早上入园；重新核对预约入口、索道与电梯运营情况。",
      },
      {
        day: "第 2 天",
        zone: "武陵源",
        coreVisit: "南门 → 黄石寨 → 金鞭溪 → 东门",
        sleepBase: "取决于第 3 天选择的分支",
        condition: "为步行另留余量，并在预订第二个住宿基地前先确定分支。",
      },
    ],
    branchMarker: "第 3–4 天 · 选择一个方向",
    tradeoffLabel: "需要放弃",
    backLink: "返回 2、3、4 天方案选择",
    branches: [
      {
        id: "stay-deeper",
        label: "分支 A · 深入张家界",
        title: "四天全部留在张家界周边",
        intro: "如果自然景观比再去一座古镇更重要，选择这条。",
        stops: [
          {
            day: "第 3 天",
            zone: "武陵源周边",
            coreVisit: "大峡谷；实时条件允许时再加黄龙洞",
            sleepBase: "武陵源，之后转住市区",
            condition: "以大峡谷为核心；只有入园时段、车辆和晚间余量都匹配时才加入黄龙洞。",
          },
          {
            day: "第 4 天",
            zone: "张家界市区",
            coreVisit: "天门山",
            sleepBase: "住市区，或预留安全余量后前往下一站",
            condition: "入园时段、天气和离开交通能衔接；七十二奇楼可选。",
          },
        ],
        tradeoff: "芙蓉镇和凤凰古城不进入这条四日路线。",
      },
      {
        id: "continue-west",
        label: "分支 B · 向西继续",
        title: "第 4 天前往凤凰古城",
        intro: "凤凰古城只能作为下一晚的住宿地加入。",
        stops: [
          {
            day: "第 3 天",
            zone: "张家界市区",
            coreVisit: "天门山",
            sleepBase: "张家界市区",
            condition: "需要可行的入园时段；七十二奇楼仍是可选项。",
          },
          {
            day: "第 4 天",
            zone: "张家界 → 凤凰古城",
            coreVisit: "向西移动 · 下午和晚上游凤凰古城",
            sleepBase: "凤凰古城",
            condition: "不返回张家界；最早在第 5 天离开凤凰。",
          },
        ],
        tradeoff: "大峡谷、黄龙洞和芙蓉镇不加入；加入芙蓉镇需要更多时间。",
      },
    ],
  },
  figures: {
    tianmen: {
      alt: "游客在低云笼罩的天门山中沿陡峭台阶走向天门洞。",
      title: "天门山",
      caption: "以张家界市区为住宿基地，单独安排一个完整游览日。",
    },
    fenghuang: {
      alt: "傍晚俯瞰凤凰古城，风雨桥横跨沱江。",
      title: "傍晚的凤凰古城",
      caption: "把它作为下一站住宿地，不要安排成当天往返张家界。",
    },
  },
  combination: {
    sectionLabel: "组合规则",
    title: "哪些景点可以放在同一天？",
    groups: [
      {
        label: "核对实时条件后可以组合",
        items: [
          {
            title: "天门山 + 七十二奇楼",
            detail: "当天门山时段、排队和体力都给晚上留下舒适余量时，可以组合。",
          },
          {
            title: "大峡谷 + 黄龙洞",
            detail:
              "这是有条件的长日，不是默认方案。大峡谷完整 B 线官方估时已约 3.5 小时；只有早出发、入园时段和车辆匹配，且当晚没有离开交通时，才加入黄龙洞。",
          },
        ],
      },
      {
        label: "默认不要承诺",
        items: [
          {
            title: "天门山 + 大峡谷",
            detail: "两个区域不同，且都容易受排队和分时入园影响，不适合作为默认组合。",
          },
          {
            title: "芙蓉镇 + 凤凰古城同一天",
            detail: "即使接驳完美，也会把两座古镇压缩成赶时间的停靠，不要默认承诺。",
          },
        ],
      },
    ],
  },
  evidence: {
    sectionLabel: "为什么这样建议",
    title: "五条依据会改变路线。",
    calculationLabel: "输入与计算",
    liveConfirmation: "需要实时确认门票和实际运营条件",
    checkedLabel: "核对于",
    checkedDate: "2026年7月21日",
    items: [
      {
        type: "官方事实",
        title: "森林公园安排两天并不是凑时长",
        fact:
          "世界地质公园的官方两日路线把山上观景区与黄石寨、金鞭溪拆开；仅金鞭溪步行路线就标注为 7.5 公里、约两小时。",
        consequence: "一天只能取重点；两天才能保住核心景观体验。",
        sources: [{ index: 1, label: "世界地质公园官方路线" }],
      },
      {
        type: "Homeground 计算",
        title: "住市区可能额外增加近三小时往返",
        fact: "湖南省文旅资料给出的市区至武陵源公路时间约为 40 分钟。",
        calculation: "40 分钟 × 4 段酒店—景区往返 ≈ 160 分钟",
        consequence: "两个森林公园游览日住武陵源，可以避免重复折返。",
        sources: [{ index: 2, label: "湖南交通指引" }],
      },
      {
        type: "路线判断",
        title: "凤凰古城适合作为下一晚住宿地",
        fact: "铁路向西经芙蓉镇、吉首通往凤凰；到站后仍需当地接驳进入古城。",
        consequence: "把凤凰作为下一晚住宿地，而不是当天往返张家界。",
        sources: [
          { index: 5, label: "向西铁路走廊通知" },
          { index: 6, label: "凤凰站接驳指南" },
        ],
      },
      {
        type: "预订闸门",
        title: "任何同日组合都不是预先承诺",
        fact: "这些是可检验的组合思路，不是已经确认的产品。",
        consequence: "预订前重新核对实时门票、接驳、季节和客人体力。",
        sources: [],
      },
      {
        type: "官方时长 + 路线判断",
        title: "大峡谷与黄龙洞只能有条件组合",
        fact:
          "大峡谷官方导览给完整 B 线的参考时长约为 3.5 小时。官方客运线路先经黄龙洞再到大峡谷，但同一交通走廊不等于两个分时景点能自动同日完成。",
        consequence:
          "以大峡谷为核心；确认入园时段、车辆、步行能力和晚间余量后，再决定是否加入黄龙洞。",
        sources: [
          { index: 7, label: "大峡谷官方路线时长" },
          { index: 8, label: "官方景区交通走廊" },
          { index: 9, label: "黄龙洞官方介绍" },
        ],
      },
    ],
  },
  faq: {
    sectionLabel: "预订前",
    title: "张家界路线常见问题",
    items: [
      {
        question: "张家界两天够吗？",
        answer:
          "如果只是第一次看重点，可以：国家森林公园精简一天，天门山一天。如果国家森林公园才是此行重点，就把两天都留在园内。两天无法同时容纳大峡谷、黄龙洞和向西的古镇。",
      },
      {
        question: "天门山和大峡谷能安排在同一天吗？",
        answer:
          "默认不要这样安排。两地分属不同区域，都容易受排队和分时入园影响，转场还会挤掉山地游览所需的休息余量。",
      },
      {
        question: "大峡谷和黄龙洞能安排在同一天吗？",
        answer:
          "有时可以，但只能当作有条件的长日，而不是默认方案。需要从武陵源早出发，确认相容的入园时段与车辆，并且当晚不安排火车或航班。如果排队、天气或步行能力压缩了余量，就只保留大峡谷。",
      },
      {
        question: "住武陵源还是张家界市区？",
        answer:
          "国家森林公园、大峡谷和黄龙洞适合住武陵源；天门山、七十二奇楼和主要铁路衔接适合住市区。拆分住宿通常比每天来回折返更省时间。",
      },
      {
        question: "四天能把愿望清单里的七个景点全部走完吗？",
        answer:
          "不能。保留全部愿望，但四天只选择一个分支：留在张家界深度游，或前往凤凰古城并在那里住宿。之后再由人工结合整条中国路线判断冲突。",
      },
    ],
  },
  sources: {
    hiddenTitle: "信息来源与实时核对",
    disclosureTitle: "信息来源与实时核对",
    summary: "10 条官方参考 · 核对于 2026年7月21日",
    intro: "我们先使用目的地和交通官方信息，预订前再核对入园时段、运营情况与接驳。",
    names: [
      "武陵源区：2025 年暑期分时预约通知（历史背景）",
      "张家界世界地质公园：官方两日路线",
      "湖南省文化和旅游厅：张家界交通基础信息",
      "湖南省文化和旅游厅：三日游规划指引",
      "湖南省政府：七十二奇楼夜游体验",
      "文化和旅游部：张家界—芙蓉镇—凤凰铁路衔接",
      "湖南省政府：凤凰站接驳指南",
      "张家界大峡谷：官方游览路线与参考时长",
      "湖南省道路运输管理局：张家界大峡谷景区交通走廊",
      "湖南省文化和旅游厅：黄龙洞介绍",
    ],
  },
  finalCta: {
    sectionLabel: "你的整条中国路线",
    title: "把张家界放回整条中国旅行里检查。",
    body:
      "选择想去的城市、总晚数、同行人和旅行节奏。之后由人工核对张家界抵离时间、换酒店安排和实时门票冲突。",
    action: "检查我的旅行时间",
  },
  structuredData: {
    homeName: "首页",
    placeName: "张家界",
    mentions: ["武陵源", "天门山", "芙蓉镇", "凤凰古城"],
  },
};

const korean: ZhangjiajieGuideCopy = {
  htmlLang: "ko",
  homePath: "/ko/",
  skipLink: "일정 가이드로 바로가기",
  breadcrumbLabel: "현재 위치",
  breadcrumbHome: "홈",
  breadcrumbCurrent: "장자제 일정 가이드",
  hero: {
    eyebrow: "일정 가이드 · 현지에서 온전히 보내는 날짜 기준",
    lead:
      "국가삼림공원을 제대로 보는 방법, 하루에 묶을 수 있는 명소, 푸룽진이나 펑황고성을 더할 때 전체 동선이 어떻게 달라지는지 정리했습니다.",
    preparedBy: "Homeground China 작성 · 현지 배경: Xuan은 장자제에서 자랐습니다",
    publishedLabel: "게시",
    publishedDate: "2026년 7월 20일",
    updatedLabel: "업데이트",
    updatedDate: "2026년 7월 21일",
    liveCheck: "예약 전 최신 운영 정보를 다시 확인합니다",
  },
  quick: {
    sectionLabel: "먼저 결론",
    title: "온전히 관광할 수 있는 날짜로 계산하세요.",
    summaryBeforeEmphasis: "2일이면 선택이 필요하고, 3일이면 첫 방문의 핵심을 볼 수 있습니다. 4일이면 장자제를 더 깊게 볼 수 있고, ",
    summaryEmphasis: "또는",
    summaryAfterEmphasis: " 펑황고성으로 이동할 수 있습니다.",
    jumpLabel: "일정별 안내로 이동",
    fullDayLabel: "‘온전한 하루’의 전제",
    fullDayBody:
      "1일 차 전날 알맞은 지역에서 숙박해야 합니다. 다른 도시에서 정오에 도착하는 날은 도착일이지 온전한 관광일이 아닙니다.",
    fullDayExampleLabel: "구체적인 예",
    fullDayExample:
      "월요일 저녁 도착 후 화요일과 수요일에 관광하면 온전한 2일입니다. 수요일 저녁 안전하게 출발할 수 있을 때만 2박이 가능하고, 3박이 더 편합니다. 온전한 3일이나 4일도 같은 방식으로 계산하세요. 4일 차에 펑황으로 이동하면 4일 지역 일정이지 장자제에서 온전히 관광하는 4일은 아닙니다.",
    action: "이 일수를 내 중국 전체 일정과 확인하기",
    decisions: [
      {
        days: "2일",
        href: "#itinerary-2-days",
        label: "깊이와 다양성 중 선택",
        detail: "공원을 이틀 보거나, 공원 하루와 톈먼산 하루를 선택합니다.",
      },
      {
        days: "3일",
        href: "#itinerary-3-days",
        label: "첫 방문에 가장 알맞음",
        detail: "국가삼림공원 이틀과 톈먼산 하루를 배정합니다.",
      },
      {
        days: "4일",
        href: "#itinerary-4-days",
        label: "한 방향을 분명히 선택",
        detail: "온전한 4일을 현지에서 보내거나 4일 차를 서쪽 이동일로 씁니다.",
      },
    ],
  },
  routeLogic: {
    sectionLabel: "동선의 원리",
    title: "네 곳의 숙박 거점이 일정을 결정합니다.",
    intro: "우링위안 → 장자제 시내 → 서쪽. 반대로 이동하면 숙박 순서도 달라집니다.",
    figureCaption: "일정 구성도 · 실제 거리 비율과 다름",
    zones: [
      {
        number: "01",
        name: "우링위안",
        sights: "장자제 국가삼림공원 · 대협곡 · 황룽동",
        role: "국가삼림공원 관광일의 숙박 거점입니다.",
      },
      {
        number: "02",
        name: "장자제 시내",
        sights: "톈먼산 · 장자제 72기루 · 장자제서역",
        role: "톈먼산 관광 전에 시내로 숙소를 옮깁니다.",
      },
      {
        number: "03",
        name: "푸룽진",
        sights: "서쪽 철도 구간에 자리한 강변 옛 마을",
        role: "전체 일정에 하루가 더 있을 때만 넣습니다.",
      },
      {
        number: "04",
        name: "펑황고성",
        sights: "고성 · 강변 야경 · 1박",
        role: "다음 숙박 목적지로 계획합니다.",
      },
    ],
  },
  timelineLabels: {
    sleepBase: "숙박 거점",
    planAround: "확인할 조건",
    suffix: "일정",
  },
  twoDay: {
    sectionLabel: "온전한 2일",
    title: "공원의 깊이와 명소의 다양성 중 선택하세요.",
    intro: "2일 안에 국가삼림공원, 톈먼산, 주변 도시까지 모두 넣을 수는 없습니다. 완결된 소규모 동선 하나를 고르세요.",
    whatStaysOut: "제외되는 곳",
    options: [
      {
        label: "선택 A · 공원을 깊게",
        title: "이틀 모두 국가삼림공원에 사용",
        stops: [
          {
            day: "1일 차",
            zone: "우링위안",
            coreVisit: "동문 → 톈쯔산 → 위안자제 → 바이룽 엘리베이터",
            sleepBase: "우링위안",
            condition: "아침 입장; 예약한 입구와 케이블카·엘리베이터 운영을 다시 확인합니다.",
          },
          {
            day: "2일 차",
            zone: "우링위안",
            coreVisit: "남문 → 황스자이 → 진볜시 → 동문",
            sleepBase: "우링위안",
            condition: "공식 도보 예상 시간 외에 전망, 대기, 휴식과 젖은 길을 위한 시간을 더 둡니다.",
          },
        ],
        tradeoff: "톈먼산, 대협곡, 황룽동, 푸룽진, 펑황고성.",
      },
      {
        label: "선택 B · 첫 핵심 보기",
        title: "공원 한 구역과 톈먼산을 각각 하루씩",
        stops: [
          {
            day: "1일 차",
            zone: "우링위안",
            coreVisit: "동문 → 톈쯔산 → 위안자제 → 바이룽 엘리베이터",
            sleepBase: "공원 관광 후 장자제 시내로 이동",
            condition: "핵심만 보는 하루입니다. 입구, 짐과 숙소 이동을 미리 확정합니다.",
          },
          {
            day: "2일 차",
            zone: "장자제 시내",
            coreVisit: "톈먼산",
            sleepBase: "시내 숙박 또는 충분한 여유 뒤 출발",
            condition: "알맞은 톈먼산 입장 시간대가 있어야 합니다.",
          },
        ],
        tradeoff: "국가삼림공원 둘째 날, 대협곡, 황룽동, 서쪽 옛 마을.",
      },
    ],
  },
  threeDay: {
    sectionLabel: "온전한 3일",
    title: "첫 방문의 정석: 국가삼림공원 이틀 + 톈먼산.",
    intro: "국가삼림공원을 서두르는 하루짜리 순환 코스로 압축하지 마세요.",
    timelineLabel: "장자제 3일 일정",
    stops: [
      {
        day: "1일 차",
        zone: "우링위안",
        coreVisit: "동문 → 톈쯔산 → 위안자제 → 바이룽 엘리베이터",
        sleepBase: "우링위안",
        condition: "아침 입장; 예약한 입구와 당일 운영 상황에 따라 순서가 달라질 수 있습니다.",
      },
      {
        day: "2일 차",
        zone: "우링위안",
        coreVisit: "남문 → 황스자이 → 진볜시 → 동문",
        sleepBase: "관광 후 장자제 시내로 이동",
        condition: "공식 도보 예상 시간 외에 여유를 두고 짐과 숙소 이동을 정리합니다.",
      },
      {
        day: "3일 차",
        zone: "장자제 시내",
        coreVisit: "톈먼산",
        sleepBase: "시내 숙박 또는 충분한 여유 뒤 다음 목적지로 이동",
        condition: "입장 시간, 대기, 날씨를 확인하고 72기루는 선택 사항으로 둡니다.",
      },
    ],
    replacementLabel: "대체 선택",
    replacementTitle: "유리다리가 더 중요하다면",
    replacementBody: "톈먼산 대신 대협곡을 선택하세요. 공원 이틀은 유지하고 대협곡 동선과 입장 시간을 최신 정보로 확인합니다.",
    backLink: "2·3·4일 선택으로 돌아가기",
  },
  fourDay: {
    sectionLabel: "4일 · 한 방향은 이동일 포함",
    title: "공원 이틀을 지키고, 한 방향을 선택하세요.",
    intro:
      "온전한 관광일 4일은 장자제 주변을 더 깊게 보는 데 쓰거나, 4일 차를 펑황으로 이동하고 도착하는 날로 씁니다. 달력상 4일 안에 두 방향을 모두 할 수는 없습니다.",
    sharedLabel: "1–2일 차 · 공통 시작",
    sharedTimelineLabel: "두 일정의 공통 첫 이틀",
    sharedStops: [
      {
        day: "1일 차",
        zone: "우링위안",
        coreVisit: "동문 → 톈쯔산 → 위안자제 → 바이룽 엘리베이터",
        sleepBase: "우링위안",
        condition: "아침 입장; 예약한 입구와 케이블카·엘리베이터 운영을 다시 확인합니다.",
      },
      {
        day: "2일 차",
        zone: "우링위안",
        coreVisit: "남문 → 황스자이 → 진볜시 → 동문",
        sleepBase: "3일 차에 선택할 방향에 따라 결정",
        condition: "도보 시간을 넉넉히 잡고 두 번째 숙소를 예약하기 전에 방향을 정합니다.",
      },
    ],
    branchMarker: "3–4일 차 · 한 방향 선택",
    tradeoffLabel: "포기해야 하는 것",
    backLink: "2·3·4일 선택으로 돌아가기",
    branches: [
      {
        id: "stay-deeper",
        label: "방향 A · 장자제를 더 깊게",
        title: "4일 모두 장자제 주변에서 보내기",
        intro: "다른 옛 마을보다 자연 풍경이 더 중요할 때 선택합니다.",
        stops: [
          {
            day: "3일 차",
            zone: "우링위안 일대",
            coreVisit: "대협곡 · 최신 조건이 맞을 때만 황룽동 추가",
            sleepBase: "우링위안, 이후 장자제 시내로 이동",
            condition: "대협곡을 핵심으로 두고, 입장 시간·차량·저녁 여유가 모두 맞을 때만 황룽동을 더합니다.",
          },
          {
            day: "4일 차",
            zone: "장자제 시내",
            coreVisit: "톈먼산",
            sleepBase: "시내 숙박 또는 충분한 여유 뒤 다음 목적지로 이동",
            condition: "입장 시간, 날씨, 출발 교통이 맞아야 하며 72기루는 선택 사항입니다.",
          },
        ],
        tradeoff: "푸룽진과 펑황고성은 이 4일 일정에서 제외됩니다.",
      },
      {
        id: "continue-west",
        label: "방향 B · 서쪽으로 이동",
        title: "4일 차에 펑황고성 도착",
        intro: "펑황고성은 다음 숙박지로만 자연스럽게 들어갑니다.",
        stops: [
          {
            day: "3일 차",
            zone: "장자제 시내",
            coreVisit: "톈먼산",
            sleepBase: "장자제 시내",
            condition: "가능한 입장 시간대가 필요하며 72기루는 선택 사항입니다.",
          },
          {
            day: "4일 차",
            zone: "장자제 → 펑황고성",
            coreVisit: "서쪽 이동 · 오후와 저녁의 펑황고성",
            sleepBase: "펑황고성",
            condition: "장자제로 돌아오지 않으며, 가장 빨라도 5일 차에 펑황을 떠납니다.",
          },
        ],
        tradeoff: "대협곡, 황룽동, 푸룽진은 제외됩니다. 푸룽진을 더하려면 시간이 더 필요합니다.",
      },
    ],
  },
  figures: {
    tianmen: {
      alt: "낮은 구름 아래 톈먼산의 가파른 계단을 따라 톈먼동으로 오르는 여행객들.",
      title: "톈먼산",
      caption: "장자제 시내를 숙박 거점으로 삼아 별도의 관광일로 계획합니다.",
    },
    fenghuang: {
      alt: "해 질 무렵 퉈장강과 다리가 내려다보이는 펑황고성의 항공 전경.",
      title: "해 질 무렵의 펑황고성",
      caption: "장자제 당일 왕복이 아니라 다음 숙박 목적지로 계획합니다.",
    },
  },
  combination: {
    sectionLabel: "조합 원칙",
    title: "어떤 명소를 하루에 묶을 수 있을까?",
    groups: [
      {
        label: "최신 조건 확인 후 조합 가능",
        items: [
          {
            title: "톈먼산 + 장자제 72기루",
            detail: "톈먼산 입장 시간, 대기, 체력이 저녁에 충분한 여유를 남길 때 가능합니다.",
          },
          {
            title: "대협곡 + 황룽동",
            detail:
              "조건부 긴 일정이지 기본 일정이 아닙니다. 대협곡 전체 B 코스만 공식 예상 약 3.5시간이므로, 일찍 출발하고 입장 시간과 차량이 맞으며 저녁 이동이 없을 때만 황룽동을 더하세요.",
          },
        ],
      },
      {
        label: "기본 일정으로 약속하지 않음",
        items: [
          {
            title: "톈먼산 + 대협곡",
            detail: "서로 다른 지역이고 둘 다 대기와 시간 지정 입장의 영향을 받아 안정적인 기본 조합이 아닙니다.",
          },
          {
            title: "푸룽진 + 펑황고성을 하루에",
            detail: "이동이 완벽해도 두 곳 모두 시간에 쫓기는 정차가 되므로 기본적으로 약속하지 않습니다.",
          },
        ],
      },
    ],
  },
  evidence: {
    sectionLabel: "이렇게 권하는 이유",
    title: "다섯 가지 근거가 동선을 바꿉니다.",
    calculationLabel: "입력값과 계산",
    liveConfirmation: "실시간 입장권과 현지 운영 확인이 필요합니다",
    checkedLabel: "확인일",
    checkedDate: "2026년 7월 21일",
    items: [
      {
        type: "공식 정보",
        title: "국가삼림공원 이틀은 시간을 채우기 위한 구성이 아닙니다",
        fact: "세계지질공원의 공식 2일 코스는 고지대 전망 구간과 황스자이·진볜시를 나눕니다. 진볜시 도보 구간만 7.5km, 약 2시간으로 안내합니다.",
        consequence: "하루면 핵심만 추려야 하고, 이틀이어야 대표 경관을 제대로 볼 수 있습니다.",
        sources: [{ index: 1, label: "세계지질공원 공식 일정" }],
      },
      {
        type: "Homeground 계산",
        title: "시내 숙박은 왕복 이동을 거의 세 시간 늘릴 수 있습니다",
        fact: "후난성 관광 안내는 장자제 시내에서 우링위안까지 도로 이동을 약 40분으로 제시합니다.",
        calculation: "40분 × 호텔–공원 4구간 ≈ 160분",
        consequence: "공원 이틀을 우링위안에서 숙박하면 반복 이동을 줄일 수 있습니다.",
        sources: [{ index: 2, label: "후난성 교통 안내" }],
      },
      {
        type: "일정 판단",
        title: "펑황고성은 다음 숙박지로 넣는 편이 맞습니다",
        fact: "철도는 푸룽진과 지서우를 거쳐 서쪽 펑황으로 이어지며, 역에서 고성까지는 다시 현지 이동이 필요합니다.",
        consequence: "장자제 당일 왕복이 아니라 다음 숙박지로 이용합니다.",
        sources: [
          { index: 5, label: "서쪽 철도 구간 안내" },
          { index: 6, label: "펑황역 환승 안내" },
        ],
      },
      {
        type: "예약 전 확인",
        title: "하루에 묶는 일정은 미리 확정된 약속이 아닙니다",
        fact: "위 조합은 검토 가능한 일정안이지 이미 확정된 상품이 아닙니다.",
        consequence: "예약 전 최신 입장권, 차량 이동, 계절, 여행자의 보행 속도를 다시 확인합니다.",
        sources: [],
      },
      {
        type: "공식 소요 시간 + 일정 판단",
        title: "대협곡과 황룽동 조합은 조건부입니다",
        fact:
          "대협곡 공식 안내는 전체 B 코스를 약 3.5시간으로 제시합니다. 공식 교통 노선은 황룽동을 거쳐 대협곡으로 가지만, 같은 이동 구간이라고 두 시간 지정 명소를 자동으로 하루에 끝낼 수 있는 것은 아닙니다.",
        consequence:
          "대협곡을 핵심으로 두고 입장 시간, 차량, 보행 능력과 저녁 여유를 확인한 뒤 황룽동 추가 여부를 정합니다.",
        sources: [
          { index: 7, label: "대협곡 공식 코스 시간" },
          { index: 8, label: "공식 관광 교통 구간" },
          { index: 9, label: "황룽동 공식 안내" },
        ],
      },
    ],
  },
  faq: {
    sectionLabel: "예약 전에",
    title: "장자제 일정에서 자주 묻는 질문",
    items: [
      {
        question: "장자제는 이틀이면 충분한가요?",
        answer: "처음 핵심을 보는 일정이라면 가능합니다. 국가삼림공원 핵심 하루와 톈먼산 하루로 구성하세요. 국가삼림공원이 여행의 주목적이라면 이틀 모두 공원에 쓰는 편이 낫습니다. 이틀 안에 대협곡, 황룽동, 서쪽 옛 마을까지 함께 넣을 수는 없습니다.",
      },
      {
        question: "톈먼산과 대협곡을 같은 날 볼 수 있나요?",
        answer: "기본 일정으로는 권하지 않습니다. 서로 다른 지역에 있고, 둘 다 대기와 시간 지정 입장의 영향을 받습니다. 지역 간 이동은 산악 관광에 필요한 회복 시간도 없앱니다.",
      },
      {
        question: "대협곡과 황룽동을 같은 날 볼 수 있나요?",
        answer: "경우에 따라 가능하지만 기본 일정이 아니라 조건부 긴 하루입니다. 우링위안에서 일찍 출발하고, 서로 맞는 입장 시간과 차량을 확인하며, 그날 저녁 기차나 항공편을 두지 마세요. 대기, 날씨나 보행 능력 때문에 여유가 줄면 대협곡만 남깁니다.",
      },
      {
        question: "우링위안과 장자제 시내 중 어디에 숙박해야 하나요?",
        answer: "국가삼림공원, 대협곡, 황룽동은 우링위안에서 접근하기 좋습니다. 톈먼산, 72기루, 주요 철도 연결은 장자제 시내가 편리합니다. 숙박지를 나누면 반복 왕복을 줄일 수 있습니다.",
      },
      {
        question: "희망 명소 일곱 곳을 4일 안에 모두 볼 수 있나요?",
        answer: "불가능합니다. 희망지는 모두 남기되 4일 동선은 하나를 선택해야 합니다. 장자제에 머물며 깊게 보거나, 펑황고성으로 이동해 숙박하세요. 이후 담당자가 중국 전체 일정과 함께 충돌을 검토할 수 있습니다.",
      },
    ],
  },
  sources: {
    hiddenTitle: "출처와 최신 정보 확인",
    disclosureTitle: "출처와 최신 정보 확인",
    summary: "공식 자료 10건 · 2026년 7월 21일 확인",
    intro: "공식 관광·교통 자료를 사용하고, 예약 전 입장 시간, 운영 상황, 차량 이동을 다시 확인합니다.",
    names: [
      "우링위안구: 2025년 여름 시간대별 입장 안내(과거 운영 참고)",
      "장자제 유네스코 세계지질공원: 공식 2일 코스",
      "후난성 문화관광청: 장자제 교통 기본 정보",
      "후난성 문화관광청: 3일 일정 안내",
      "후난성 정부: 장자제 72기루 야간 체험",
      "중국 문화여유부: 장자제–푸룽진–펑황 철도 연결",
      "후난성 정부: 펑황역 환승 안내",
      "장자제 대협곡: 공식 관광 코스와 예상 소요 시간",
      "후난성 도로운수관리국: 장자제 대협곡 관광 교통 구간",
      "후난성 문화관광청: 황룽동 안내",
    ],
  },
  finalCta: {
    sectionLabel: "중국 전체 일정",
    title: "장자제를 중국 전체 희망 일정과 함께 확인하세요.",
    body:
      "가고 싶은 도시, 총 숙박일, 동행 유형과 여행 속도를 선택하세요. 이후 담당자가 장자제 도착·출발 시간, 숙소 변경과 최신 입장권 충돌을 확인합니다.",
    action: "내 여행 시간 확인하기",
  },
  structuredData: {
    homeName: "홈",
    placeName: "장자제",
    mentions: ["우링위안", "톈먼산", "푸룽진", "펑황고성"],
  },
};

const copies: Record<HomegroundLocale, ZhangjiajieGuideCopy> = {
  en: english,
  zh: chinese,
  ko: korean,
};

export function getZhangjiajieGuideCopy(
  locale: HomegroundLocale = "en",
) {
  return copies[locale];
}
