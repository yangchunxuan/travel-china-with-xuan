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
    preparedBy: "Prepared by Homeground China",
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
      "Sleep in the right base before Day 1; do not count an intercity arrival as sightseeing time.",
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
        detail: "Add more Zhangjiajie, or continue west to Fenghuang.",
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
            coreVisit: "National Forest Park · high viewpoints",
            sleepBase: "Wulingyuan",
            condition: "Morning entry; sleep in Wulingyuan the night before.",
          },
          {
            day: "Day 2",
            zone: "Wulingyuan",
            coreVisit: "National Forest Park · valleys and walking routes",
            sleepBase: "Wulingyuan",
            condition:
              "Walking pace and the next intercity departure remain realistic.",
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
            coreVisit: "National Forest Park · compact highlights",
            sleepBase: "Move downtown after the park day",
            condition: "The hotel change and luggage plan are confirmed in advance.",
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
        coreVisit: "National Forest Park · high viewpoints",
        sleepBase: "Wulingyuan",
        condition: "Morning entry; route order still follows live conditions.",
      },
      {
        day: "Day 2",
        zone: "Wulingyuan",
        coreVisit: "National Forest Park · valleys and walking routes",
        sleepBase: "Move downtown after sightseeing",
        condition: "Luggage and the base change are arranged before Day 3.",
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
    sectionLabel: "4 full days",
    title: "Keep two park days, then choose a direction.",
    intro:
      "Stay deeper around Zhangjiajie, or use Day 4 to continue west. Four days cannot do both.",
    sharedLabel: "Days 1–2 · Shared start",
    sharedTimelineLabel: "Shared first two days",
    sharedStops: [
      {
        day: "Day 1",
        zone: "Wulingyuan",
        coreVisit: "National Forest Park · high viewpoints",
        sleepBase: "Wulingyuan",
        condition: "Morning entry and a useful arrival the previous night.",
      },
      {
        day: "Day 2",
        zone: "Wulingyuan",
        coreVisit: "National Forest Park · valleys and walking routes",
        sleepBase: "Depends on the Day 3 branch",
        condition: "Choose the branch before booking the second hotel base.",
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
            coreVisit: "Grand Canyon + Huanglong Cave",
            sleepBase: "Wulingyuan, then move downtown",
            condition: "Possible long day only with compatible tickets and transfer.",
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
              "A possible long day when ticket periods and a confirmed transfer align.",
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
    title: "Four pieces of evidence change the route.",
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
    summary: "7 official references · checked 21 July 2026",
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
    ],
  },
  finalCta: {
    sectionLabel: "Your whole China route",
    title: "Check Zhangjiajie against your whole China wishlist.",
    body: "Keep every city. We surface the timing conflict before a person shapes the route.",
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
    preparedBy: "由 Homeground China 整理",
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
    fullDayBody: "第 1 天前一晚已经住在合适的区域；跨城市抵达当天不算完整游览时间。",
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
        detail: "继续深挖张家界，或向西前往凤凰古城。",
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
            coreVisit: "国家森林公园 · 山上观景区",
            sleepBase: "武陵源",
            condition: "早上入园；前一晚已经住在武陵源。",
          },
          {
            day: "第 2 天",
            zone: "武陵源",
            coreVisit: "国家森林公园 · 山谷与步行路线",
            sleepBase: "武陵源",
            condition: "步行强度与下一段跨城交通都留有现实余量。",
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
            coreVisit: "国家森林公园 · 精简重点",
            sleepBase: "游览结束后转住市区",
            condition: "提前确认换酒店与行李安排。",
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
        coreVisit: "国家森林公园 · 山上观景区",
        sleepBase: "武陵源",
        condition: "早上入园；当天顺序仍要根据实时情况调整。",
      },
      {
        day: "第 2 天",
        zone: "武陵源",
        coreVisit: "国家森林公园 · 山谷与步行路线",
        sleepBase: "游览结束后转住市区",
        condition: "提前安排好行李和第 3 天前的住宿切换。",
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
    sectionLabel: "4 个完整游览日",
    title: "保留森林公园两天，再选择一个方向。",
    intro: "要么深入张家界周边，要么第 4 天向西继续；4 天不能两者都做。",
    sharedLabel: "第 1–2 天 · 两条分支相同",
    sharedTimelineLabel: "两条方案共同的前两天",
    sharedStops: [
      {
        day: "第 1 天",
        zone: "武陵源",
        coreVisit: "国家森林公园 · 山上观景区",
        sleepBase: "武陵源",
        condition: "早上入园，且前一晚能有效抵达。",
      },
      {
        day: "第 2 天",
        zone: "武陵源",
        coreVisit: "国家森林公园 · 山谷与步行路线",
        sleepBase: "取决于第 3 天选择的分支",
        condition: "预订第二个住宿基地前先确定分支。",
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
            coreVisit: "大峡谷 + 黄龙洞",
            sleepBase: "武陵源，之后转住市区",
            condition: "只有门票时段与接驳能配合时，才适合安排成长日。",
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
            detail: "门票时段与接驳确认匹配后，可以组成一个较长的游览日。",
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
    title: "四条依据会改变路线。",
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
    summary: "7 条官方参考 · 核对于 2026年7月21日",
    intro: "我们先使用目的地和交通官方信息，预订前再核对入园时段、运营情况与接驳。",
    names: [
      "武陵源区：2025 年暑期分时预约通知（历史背景）",
      "张家界世界地质公园：官方两日路线",
      "湖南省文化和旅游厅：张家界交通基础信息",
      "湖南省文化和旅游厅：三日游规划指引",
      "湖南省政府：七十二奇楼夜游体验",
      "文化和旅游部：张家界—芙蓉镇—凤凰铁路衔接",
      "湖南省政府：凤凰站接驳指南",
    ],
  },
  finalCta: {
    sectionLabel: "你的整条中国路线",
    title: "把张家界放回整条中国旅行里检查。",
    body: "保留每个想去的地方。我们先发现时间冲突，再由人工整理路线。",
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
    preparedBy: "Homeground China 작성",
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
    fullDayBody: "1일 차 전날 알맞은 지역에서 숙박해야 하며, 다른 도시에서 도착하는 날은 온전한 관광일로 계산하지 않습니다.",
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
        detail: "장자제를 더 깊게 보거나 서쪽 펑황고성으로 이동합니다.",
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
            coreVisit: "국가삼림공원 · 고지대 전망 구간",
            sleepBase: "우링위안",
            condition: "아침 입장; 전날 밤 우링위안에서 숙박합니다.",
          },
          {
            day: "2일 차",
            zone: "우링위안",
            coreVisit: "국가삼림공원 · 계곡과 도보 구간",
            sleepBase: "우링위안",
            condition: "걷는 속도와 다음 도시로의 이동에 현실적인 여유를 둡니다.",
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
            coreVisit: "국가삼림공원 · 핵심 구간 압축",
            sleepBase: "공원 관광 후 장자제 시내로 이동",
            condition: "숙소 변경과 짐 이동을 미리 확정합니다.",
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
        coreVisit: "국가삼림공원 · 고지대 전망 구간",
        sleepBase: "우링위안",
        condition: "아침 입장; 세부 순서는 당일 운영 상황에 맞춥니다.",
      },
      {
        day: "2일 차",
        zone: "우링위안",
        coreVisit: "국가삼림공원 · 계곡과 도보 구간",
        sleepBase: "관광 후 장자제 시내로 이동",
        condition: "3일 차 전에 짐과 숙소 이동을 정리합니다.",
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
    sectionLabel: "온전한 4일",
    title: "공원 이틀을 지키고, 한 방향을 선택하세요.",
    intro: "장자제 주변을 더 깊게 보거나 4일 차에 서쪽으로 이동합니다. 4일 안에 두 방향을 모두 할 수는 없습니다.",
    sharedLabel: "1–2일 차 · 공통 시작",
    sharedTimelineLabel: "두 일정의 공통 첫 이틀",
    sharedStops: [
      {
        day: "1일 차",
        zone: "우링위안",
        coreVisit: "국가삼림공원 · 고지대 전망 구간",
        sleepBase: "우링위안",
        condition: "아침 입장; 전날 밤 실질적으로 도착해 있어야 합니다.",
      },
      {
        day: "2일 차",
        zone: "우링위안",
        coreVisit: "국가삼림공원 · 계곡과 도보 구간",
        sleepBase: "3일 차에 선택할 방향에 따라 결정",
        condition: "두 번째 숙소를 예약하기 전에 방향을 정합니다.",
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
            coreVisit: "대협곡 + 황룽동",
            sleepBase: "우링위안, 이후 장자제 시내로 이동",
            condition: "입장 시간과 차량 이동이 맞을 때만 긴 하루로 묶을 수 있습니다.",
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
            detail: "입장 시간과 확정된 차량 이동이 맞으면 긴 하루로 구성할 수 있습니다.",
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
    title: "네 가지 근거가 동선을 바꿉니다.",
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
    summary: "공식 자료 7건 · 2026년 7월 21일 확인",
    intro: "공식 관광·교통 자료를 사용하고, 예약 전 입장 시간, 운영 상황, 차량 이동을 다시 확인합니다.",
    names: [
      "우링위안구: 2025년 여름 시간대별 입장 안내(과거 운영 참고)",
      "장자제 유네스코 세계지질공원: 공식 2일 코스",
      "후난성 문화관광청: 장자제 교통 기본 정보",
      "후난성 문화관광청: 3일 일정 안내",
      "후난성 정부: 장자제 72기루 야간 체험",
      "중국 문화여유부: 장자제–푸룽진–펑황 철도 연결",
      "후난성 정부: 펑황역 환승 안내",
    ],
  },
  finalCta: {
    sectionLabel: "중국 전체 일정",
    title: "장자제를 중국 전체 희망 일정과 함께 확인하세요.",
    body: "가고 싶은 도시는 모두 남겨 두세요. 사람이 동선을 짜기 전에 시간 충돌부터 확인합니다.",
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
