import type { HomegroundLocale } from "./homegroundI18n";

export const chinaTripCostGuideId = "how-much-does-a-china-trip-cost" as const;

export interface TripCostSource {
  label: string;
  url: string;
}

/** One row of the "three ways to buy" comparison. */
export interface TripCostTier {
  way: string;
  example: string;
  price: string;
  includes: string;
  excludes: string;
}

/** One published ground cost, quoted in RMB from an official price. */
export interface GroundCost {
  item: string;
  price: string;
  note: string;
}

export interface TripCostFaq {
  question: string;
  answer: string;
}

export interface ChinaTripCostCopy {
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
    heroAlt: string;
    about: readonly string[];
  };

  skipLink: string;
  breadcrumb: { home: string; guides: string; current: string };

  hero: {
    eyebrow: string;
    reviewedLabel: string;
    reviewedDate: string;
    lead: readonly string[];
    imageAlt: string;
    imageCaption: string;
  };

  earlyCta: {
    label: string;
    title: string;
    detail: string;
    button: string;
  };

  /** Headline range, stated before any explanation. */
  shortAnswer: {
    title: string;
    intro: string;
    bands: readonly { range: string; label: string; detail: string }[];
    caveat: string;
  };

  tiers: {
    title: string;
    intro: string;
    columns: {
      way: string;
      example: string;
      price: string;
      includes: string;
      excludes: string;
    };
    rows: readonly TripCostTier[];
    fxNote: string;
  };

  /** Why two "8-day, 3-city private tours" can differ by nearly half. */
  spread: {
    title: string;
    intro: string;
    factors: readonly { title: string; detail: string }[];
    closing: string;
  };

  ground: {
    title: string;
    intro: string;
    columns: { item: string; price: string; note: string };
    rows: readonly GroundCost[];
    accommodation: string;
    transport: string;
  };

  diy: {
    title: string;
    intro: string;
    yourself: { title: string; points: readonly string[] };
    arranged: { title: string; points: readonly string[] };
    closing: string;
  };

  howWeQuote: {
    title: string;
    paragraphs: readonly string[];
    listLabel: string;
    items: readonly string[];
    noPricePromise: string;
  };

  faq: { title: string; items: readonly TripCostFaq[] };

  finalCta: {
    title: string;
    intro: string;
    listLabel: string;
    items: readonly string[];
    detail: string;
    button: string;
  };

  sourcesTitle: string;
  sources: readonly TripCostSource[];
  sourceNote: string;
}

const SOURCE_URLS = {
  viatorPrivate8:
    "https://www.viator.com/tours/Beijing/8-Days-Private-Tour-of-Beijing-Xian-and-Shanghai/d321-10289P147",
  viatorMultiDay: "https://www.viator.com/China-tours/Multi-day-Tours/d13-g20-c85",
  wendyWu: "https://www.wendywutours.com.au/china/tours/",
  mctHotels:
    "https://zwgk.mct.gov.cn/zfxxgkml/tjxx/202606/t20260602_966073.html",
  zjjPark: "http://www.hnzjj.com/index.php/Article/show/560.html",
  boc: "https://www.boc.cn/sourcedb/whpj/",
} as const;

const en: ChinaTripCostCopy = {
  htmlLang: "en",
  pagePath: "/guides/how-much-does-a-china-trip-cost/",
  homePath: "/",
  guidesPath: "/guides/",
  plannerHref:
    "/?utm_source=website&utm_medium=guide&utm_campaign=trip-cost&utm_content=china-trip-cost#planner-contact",

  metadata: {
    title: "How Much Does a Trip to China Cost? Real 2026 Prices",
    description:
      "What a 6–10 day, 2–3 city China trip actually costs, using published prices from booking platforms and tour operators, plus official ticket and hotel figures.",
    headline: "How Much Does a Trip to China Cost?",
    schemaDescription:
      "Published price bands for multi-city China trips in 2026, what separates a cheaper private tour from an expensive one, and what the ground costs are before anyone adds a margin.",
    openGraphLocale: "en_US",
    inLanguage: "en",
    heroAlt:
      "A lantern-lit street of guesthouses and restaurants in Zhangjiajie at dusk.",
    about: ["China trip cost", "China private tour price", "China travel budget"],
  },

  skipLink: "Skip to the guide",
  breadcrumb: { home: "Home", guides: "Travel guides", current: "China trip cost" },

  hero: {
    eyebrow: "Cost guide",
    reviewedLabel: "Prices checked",
    reviewedDate: "August 2026",
    lead: [
      "Most answers to this question are either a shrug or a sales page. This one uses prices you can open and check yourself.",
      "Everything below is land cost — hotels, transport inside China, tickets and guiding — unless a line says it includes international flights. International flights are the one part that depends entirely on where you start.",
    ],
    imageAlt:
      "A lantern-lit street of guesthouses and restaurants in Zhangjiajie at dusk.",
    imageCaption:
      "The same street, the same week, can sit at three different price points depending on how the trip is put together.",
  },

  earlyCta: {
    label: "Working out a budget?",
    title: "Tell us the shape of the trip and we will tell you the range",
    detail:
      "Dates, cities, how many of you and a rough nightly budget is enough. A Homeground planner will come back with a realistic range for that trip before anything is booked or paid.",
    button: "Ask what my trip would cost",
  },

  shortAnswer: {
    title: "The short answer",
    intro:
      "For a 6–10 day trip covering two or three Chinese cities, land cost per person usually falls in one of three bands.",
    bands: [
      {
        range: "¥4,000 – ¥8,000",
        label: "Booking it yourself",
        detail:
          "Economy or mid-range hotels, second-class high-speed rail, tickets bought at the gate or on a domestic app, no guide. You do all the planning and all the problem-solving.",
      },
      {
        range: "¥10,000 – ¥18,000",
        label: "A private trip, arranged",
        detail:
          "Three or four-star hotels with breakfast, transfers in a private vehicle, a licensed guide, admission tickets and inter-city transport handled. This is where most published private multi-city tours sit.",
      },
      {
        range: "¥24,000 and up",
        label: "Escorted group, flights included",
        detail:
          "The prices Western tour operators publish, which bundle international flights into the package.",
      },
    ],
    caveat:
      "These are bands, not quotes. Season, city, hotel grade and group size move a trip inside its band, and sometimes out of it.",
  },

  tiers: {
    title: "Three ways to buy the same trip",
    intro:
      "Every price below is published on a page anyone can open, converted at one dated rate.",
    columns: {
      way: "Way to buy",
      example: "Real listing",
      price: "Per person",
      includes: "Includes",
      excludes: "Excludes",
    },
    rows: [
      {
        way: "Private, booked on a marketplace",
        example: "8 days, Beijing–Xi’an–Shanghai, private",
        price: "≈ ¥10,100",
        includes:
          "7 nights 4-star with breakfast, bullet train and a domestic flight, private vehicle and driver, guide, admission tickets",
        excludes: "International flights, most lunches and dinners, tips",
      },
      {
        way: "Private, a more expensive operator",
        example: "8 days, Beijing–Xi’an–Shanghai, private, with hotels",
        price: "≈ ¥17,900",
        includes: "Same shape of trip, different hotels and inclusions",
        excludes: "International flights",
      },
      {
        way: "Land-only package from a Western operator",
        example: "6 days, Beijing and Shanghai",
        price: "≈ ¥11,800",
        includes: "Fixed itinerary, hotels, transfers, guiding",
        excludes: "International flights",
      },
      {
        way: "Escorted group with flights",
        example: "10 days, multi-city",
        price: "≈ ¥24,500",
        includes: "International flights, hotels, guiding, most meals",
        excludes: "Personal spending, optional activities",
      },
      {
        way: "A single private city segment",
        example: "2–3 days in one city, private guide and vehicle",
        price: "≈ ¥2,300 – ¥3,600",
        includes: "Private guide and driver, tickets, hotel pickup",
        excludes: "Hotels, meals, transport between cities",
      },
    ],
    fxNote:
      "Foreign-currency listings converted at the Bank of China published rate on the date shown in the sources below. Rates move; the original currency is the price that binds.",
  },

  spread: {
    title: "Why one private 8-day trip costs ¥10,100 and another ¥17,900",
    intro:
      "Same cities, same length, same words on the page. Almost the whole gap comes from four things.",
    factors: [
      {
        title: "Hotel grade, and which branch",
        detail:
          "The single biggest line. A four-star beside the station and a four-star an hour out are the same star rating and a very different price — and a very different day.",
      },
      {
        title: "Whether inter-city transport is flights or rail",
        detail:
          "A domestic flight instead of a bullet train can move a three-city trip by a four-figure amount, and it usually buys back half a day.",
      },
      {
        title: "Truly private, or private guide with shared vehicle",
        detail:
          "“Private” is used for both. Ask how many parties share the car, and whether the guide is with you all day or meets you at each site.",
      },
      {
        title: "Which tickets and cable cars are inside the price",
        detail:
          "In Zhangjiajie alone, park admission, the lift and the cableways are separate line items. Left out, they reappear as several hundred yuan a day.",
      },
    ],
    closing:
      "When two quotes differ, they are almost never quoting the same trip. Comparing them means putting these four things side by side first.",
  },

  ground: {
    title: "What the ground costs before anyone adds a margin",
    intro:
      "These are published prices. Any operator, including us, starts from numbers like these.",
    columns: { item: "Item", price: "Published price", note: "Note" },
    rows: [
      {
        item: "Zhangjiajie National Forest Park admission",
        price: "¥228",
        note: "Valid four days",
      },
      { item: "Tianmen Mountain", price: "¥258 + ¥3", note: "Insurance added" },
      { item: "Grand Canyon Glass Bridge", price: "¥138", note: "" },
      { item: "Bailong lift", price: "¥75", note: "One way" },
      { item: "Tianzi Mountain cableway", price: "¥72", note: "One way" },
      { item: "Huangshizhai cableway", price: "¥118", note: "Return" },
    ],
    accommodation:
      "Accommodation: the Ministry of Culture and Tourism’s star-rated hotel sample averaged ¥360.2 per room night in 2025. That is a national average across a specific sample — a guesthouse in Wulingyuan and a four-star beside a Shanghai station sit a long way either side of it.",
    transport:
      "Inter-city transport: second-class high-speed rail is the usual choice between these cities. Fares vary by route and class and are published on the official 12306 channel, so this guide does not quote a single figure for them.",
  },

  diy: {
    title: "So should you just book it yourself?",
    intro:
      "Often, yes. The gap between the two bands is real money, and it buys specific things rather than magic.",
    yourself: {
      title: "Booking it yourself works when",
      points: [
        "you are staying in one or two cities and not moving much;",
        "you are comfortable with domestic apps for trains, tickets and payment;",
        "your arrival times are civilised and your luggage is light;",
        "nobody in the group needs the day to bend if something goes wrong.",
      ],
    },
    arranged: {
      title: "Paying someone is worth it when",
      points: [
        "three or more cities have to connect without a wasted day;",
        "a late train or flight would leave someone standing outside a closed reception;",
        "older parents, children or heavy luggage change what is actually walkable;",
        "you want the park days planned around queues and cable-car hours rather than a map.",
      ],
    },
    closing:
      "The honest test is not price. It is how much of the trip stops working if one thing goes wrong, and who is on the phone when it does.",
  },

  howWeQuote: {
    title: "How Homeground quotes",
    paragraphs: [
      "We do not publish a fixed price for a trip, because the same route costs different money in April and October, at two people and at six.",
      "What we can do is answer quickly and in a range, before you commit to anything.",
    ],
    listLabel: "A quote from us is built from:",
    items: [
      "the ground cost of the exact hotels, transport, tickets and guiding your route needs;",
      "the season and the group size, which move that ground cost more than most people expect;",
      "a clearly stated coordination fee, so you can see what is the trip and what is us.",
    ],
    noPricePromise:
      "We do not promise to be the cheapest. Anyone can be cheaper by moving you further from the station, sharing your vehicle or leaving the cable cars out of the price.",
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "Is China expensive to travel in?",
        answer:
          "Compared with Western Europe or Japan, the ground costs are usually lower: admission, transport and hotels all sit below what the same quality costs in those places. What catches people out is the number of moving parts, not the price of each one.",
      },
      {
        question: "How much should I budget per day?",
        answer:
          "As a rough shape, ¥500–900 per person per day covers a self-booked trip with mid-range hotels, rail and tickets. A privately arranged trip with a guide and vehicle typically runs ¥1,200–2,200 per person per day.",
      },
      {
        question: "Do these prices include international flights?",
        answer:
          "Only where a line says so. Everything else is land cost. Flights from Europe, North America or Australia can equal the entire land cost of the trip, which is why we keep them separate.",
      },
      {
        question: "Why do quotes for the same itinerary differ so much?",
        answer:
          "Hotel grade and branch, flights versus rail between cities, whether the vehicle is genuinely yours, and which tickets and cable cars are inside the price. Four things explain nearly all of it.",
      },
      {
        question: "Can you work to a budget I set?",
        answer:
          "Usually yes, or we will tell you early that the route does not fit the budget and what would have to change. That is a faster conversation than quoting something nobody can afford.",
      },
    ],
  },

  finalCta: {
    title: "Ask what your trip would cost",
    intro:
      "You do not need a finished itinerary. A rough shape is enough for a realistic range.",
    listLabel: "Send:",
    items: [
      "your travel dates, or the month;",
      "the cities you are considering;",
      "how many of you, and whether anyone needs an easier pace;",
      "a rough per-night or total budget, if you have one.",
    ],
    detail:
      "A Homeground planner will come back with a range for that trip, and say plainly where the number would move.",
    button: "Ask what my trip would cost",
  },

  sourcesTitle: "Sources",
  sources: [
    {
      label: "Viator — 8 Days Private Tour of Beijing, Xian and Shanghai",
      url: SOURCE_URLS.viatorPrivate8,
    },
    { label: "Viator — China multi-day tours", url: SOURCE_URLS.viatorMultiDay },
    { label: "Wendy Wu Tours Australia — China tours", url: SOURCE_URLS.wendyWu },
    {
      label: "Ministry of Culture and Tourism — 2025 star-rated hotel statistics",
      url: SOURCE_URLS.mctHotels,
    },
    {
      label: "Zhangjiajie Wulingyuan official tourism site — ticket prices",
      url: SOURCE_URLS.zjjPark,
    },
    { label: "Bank of China — published exchange rates", url: SOURCE_URLS.boc },
  ],
  sourceNote:
    "Listing prices were read on 2 August 2026 and are promotional or “from” prices, not dated quotes for specific stay dates. Foreign currency converted at the Bank of China rate published 5 August 2026. Prices and availability change; treat every figure here as a band, not an offer.",
};

const zh: ChinaTripCostCopy = {
  htmlLang: "zh-CN",
  pagePath: "/zh/guides/how-much-does-a-china-trip-cost/",
  homePath: "/zh/",
  guidesPath: "/zh/guides/",
  plannerHref:
    "/zh/?utm_source=website&utm_medium=guide&utm_campaign=trip-cost&utm_content=china-trip-cost#planner-contact",

  metadata: {
    title: "去中国旅行大概多少钱？2026 年真实价格对照",
    description:
      "6–10 天、2–3 个城市的中国行程实际要花多少：用预订平台和旅行社的公开报价，加上官方票价与酒店统计，一条条摆出来。",
    headline: "去中国旅行大概多少钱？",
    schemaDescription:
      "2026 年中国多城市行程的公开价格带、便宜的私人游和贵的私人游差在哪，以及在任何人加价之前，地面成本本身是多少。",
    openGraphLocale: "zh_CN",
    inLanguage: "zh-CN",
    heroAlt: "傍晚亮灯的张家界住宿餐饮街区。",
    about: ["中国旅行费用", "中国私人定制游价格", "中国旅行预算"],
  },

  skipLink: "跳到正文",
  breadcrumb: { home: "首页", guides: "旅行指南", current: "中国行程费用" },

  hero: {
    eyebrow: "费用指南",
    reviewedLabel: "价格核对于",
    reviewedDate: "2026 年 8 月",
    lead: [
      "这个问题的答案，通常要么是“看情况”，要么是一个销售页。这一篇用的是你自己能点开核对的价格。",
      "下面除非写明含国际机票，否则都是地面费用——住宿、中国境内交通、门票和导览。国际机票完全取决于你从哪出发，所以单独拿开。",
    ],
    imageAlt: "傍晚亮灯的张家界住宿餐饮街区。",
    imageCaption:
      "同一条街、同一周，因为行程组织方式不同，可以落在三个完全不同的价位上。",
  },

  earlyCta: {
    label: "正在算预算？",
    title: "把行程的大致形状告诉我们，我们给你一个区间",
    detail:
      "日期、想去的城市、几个人、大致每晚预算就够。Homeground 的规划师会在你预订或付款之前，先给出这趟行程的现实区间。",
    button: "问问我这趟大概多少钱",
  },

  shortAnswer: {
    title: "先给答案",
    intro:
      "6–10 天、走两到三个中国城市，人均地面费用通常落在下面三档之一。",
    bands: [
      {
        range: "4,000 – 8,000 元",
        label: "自己订",
        detail:
          "经济型或中档酒店、高铁二等座、门票现场或用国内 App 买、没有导游。全部规划和出问题时的处理都由你自己来。",
      },
      {
        range: "10,000 – 18,000 元",
        label: "有人安排的私人行程",
        detail:
          "三到四星含早、私人车辆接送、持证导游、门票和城际交通都安排好。市面上公开标价的私人多城市行程，大多落在这一档。",
      },
      {
        range: "24,000 元以上",
        label: "含国际机票的随团",
        detail: "欧美旅行社公开的价格，把国际机票打进了套餐里。",
      },
    ],
    caveat:
      "这是价格带，不是报价。季节、城市、酒店档次和同行人数会让一趟行程在带内浮动，有时会直接跳出这一带。",
  },

  tiers: {
    title: "同一趟行程的三种买法",
    intro: "下面每一个价格都来自任何人都能点开的页面，按同一个带日期的汇率折算。",
    columns: {
      way: "买法",
      example: "真实在售产品",
      price: "每人",
      includes: "含",
      excludes: "不含",
    },
    rows: [
      {
        way: "在平台上订的私人游",
        example: "8 天，北京—西安—上海，私人",
        price: "约 ¥10,100",
        includes:
          "7 晚四星含早、高铁 + 一段国内航班、私人车辆与司机、导游、门票",
        excludes: "国际机票、多数午晚餐、小费",
      },
      {
        way: "同类但更贵的运营商",
        example: "8 天，北京—西安—上海，私人含酒店",
        price: "约 ¥17,900",
        includes: "行程形态相同，酒店和包含项不同",
        excludes: "国际机票",
      },
      {
        way: "欧美旅行社的 land-only 套餐",
        example: "6 天，北京和上海",
        price: "约 ¥11,800",
        includes: "固定行程、住宿、接送、导览",
        excludes: "国际机票",
      },
      {
        way: "含机票的随团",
        example: "10 天，多城市",
        price: "约 ¥24,500",
        includes: "国际机票、住宿、导览、多数餐食",
        excludes: "个人消费、自费项目",
      },
      {
        way: "单个城市的私人段",
        example: "某一城 2–3 天，私人导游和车",
        price: "约 ¥2,300 – ¥3,600",
        includes: "私人导游和司机、门票、酒店接送",
        excludes: "住宿、餐食、城际交通",
      },
    ],
    fxNote:
      "外币报价按中国银行公布汇率折算，日期见下方来源。汇率会变，起约束力的是原币价格。",
  },

  spread: {
    title: "为什么同样 8 天私人游，一个 10,100 一个 17,900",
    intro: "一样的城市、一样的天数、页面上一样的字。差价几乎全部来自四件事。",
    factors: [
      {
        title: "酒店档次，以及是哪一家门店",
        detail:
          "最大的一项。车站旁边的四星和一小时车程外的四星，星级一样、价格差很远——而且这一天过得也很不一样。",
      },
      {
        title: "城际是飞还是坐高铁",
        detail:
          "一段国内航班替掉高铁，能让三城行程差出四位数，而且通常换回半天时间。",
      },
      {
        title: "是真私人，还是私人导游配拼车",
        detail:
          "“私人”这个词两种都在用。要问清楚：车上会不会有别的客人，导游是全天跟着还是每个景点门口碰头。",
      },
      {
        title: "哪些门票和索道算在价里",
        detail:
          "光张家界，大门票、百龙天梯和各条索道就是分开计费的。不含的话，它们会以每天几百元的形式再冒出来。",
      },
    ],
    closing:
      "两份报价不一样的时候，它们几乎从来不是在报同一趟行程。要比，得先把这四件事并排摆开。",
  },

  ground: {
    title: "在任何人加价之前，地面成本是多少",
    intro: "以下都是公开票价。任何运营商——包括我们——都是从这样的数字开始算的。",
    columns: { item: "项目", price: "公开票价", note: "说明" },
    rows: [
      { item: "张家界国家森林公园大门票", price: "228 元", note: "4 日有效" },
      { item: "天门山", price: "258 元 + 3 元", note: "含保险" },
      { item: "大峡谷玻璃桥", price: "138 元", note: "" },
      { item: "百龙天梯", price: "75 元", note: "单程" },
      { item: "天子山索道", price: "72 元", note: "单程" },
      { item: "黄石寨索道", price: "118 元", note: "双程" },
    ],
    accommodation:
      "住宿：文化和旅游部星级饭店样本 2025 年平均房价为每间夜 360.2 元。那是一个特定样本的全国均值——武陵源的民宿和上海车站旁的四星，会落在它两边很远的位置。",
    transport:
      "城际交通：这几个城市之间通常坐高铁二等座。票价按线路和席别浮动，官方渠道 12306 可查，所以本文不给一个统一数字。",
  },

  diy: {
    title: "那是不是自己订就行了？",
    intro:
      "很多时候是的。两档之间的差价是真金白银，它买到的是很具体的东西，不是玄学。",
    yourself: {
      title: "自己订完全够用，如果",
      points: [
        "只待一两个城市，移动不多；",
        "你能熟练用国内 App 买票、订票、支付；",
        "到达时间正常，行李不重；",
        "同行的人里没有谁需要行程随时能改。",
      ],
    },
    arranged: {
      title: "花钱让人安排值得，如果",
      points: [
        "三个以上城市要串起来，还不能浪费掉一天；",
        "晚点的火车或航班会让人站在已经关门的前台外面；",
        "同行有年长父母、小孩或大件行李，“能不能走过去”的答案会变；",
        "你希望进山那几天是按排队时间和索道运营时间排的，不是按地图排的。",
      ],
    },
    closing:
      "真正的判断标准不是价格，而是：一件事出岔子的时候，整趟行程有多少会跟着停摆，以及那时候电话那头有没有人。",
  },

  howWeQuote: {
    title: "Homeground 怎么报价",
    paragraphs: [
      "我们不公布固定价格，因为同一条路线在四月和十月不是一个价，两个人和六个人也不是一个价。",
      "我们能做的是：在你承诺任何事之前，快速给出一个区间。",
    ],
    listLabel: "我们的报价由三部分构成：",
    items: [
      "你这条路线实际需要的酒店、交通、门票和导览的地面成本；",
      "季节和人数——这两项对地面成本的影响比多数人想象的大；",
      "一笔写明的协调服务费，让你看得出哪部分是行程、哪部分是我们。",
    ],
    noPricePromise:
      "我们不承诺最便宜。任何人都可以更便宜——把你安排得离车站更远、让你的车拼给别人，或者把索道从价里拿掉。",
  },

  faq: {
    title: "常见问题",
    items: [
      {
        question: "在中国旅行贵吗？",
        answer:
          "和西欧或日本比，地面费用通常更低：门票、交通和住宿的同等品质，价格都低于那些地方。真正让人措手不及的是环节多，不是单价高。",
      },
      {
        question: "每天该按多少预算？",
        answer:
          "大致形状是：自己订、中档住宿、高铁加门票，人均每天 500–900 元。有导游和车的私人安排，通常人均每天 1,200–2,200 元。",
      },
      {
        question: "这些价格含国际机票吗？",
        answer:
          "只有明确写了的才含，其余都是地面费用。从欧洲、北美或澳洲飞过来的机票可能和整趟地面费用相当，所以我们把它单独拿开。",
      },
      {
        question: "为什么同一条行程的报价能差这么多？",
        answer:
          "酒店档次和门店位置、城际是飞还是高铁、车是不是真的只归你、以及哪些门票和索道算在价里。四件事解释了差价的绝大部分。",
      },
      {
        question: "能按我定的预算来做吗？",
        answer:
          "通常可以；如果这条路线装不进这个预算，我们会尽早说，并告诉你要改什么。这比报一个没人付得起的价格要快。",
      },
    ],
  },

  finalCta: {
    title: "问问你这趟大概多少钱",
    intro: "不需要完整行程表，一个大致形状就够我们给出现实区间。",
    listLabel: "发这些就行：",
    items: [
      "出行日期，或者只说月份；",
      "在考虑的城市；",
      "几个人，以及有没有人需要慢一点的节奏；",
      "大致的每晚或总预算，如果你有的话。",
    ],
    detail:
      "Homeground 的规划师会给出这趟行程的区间，并直说这个数字在什么情况下会变。",
    button: "问问我这趟大概多少钱",
  },

  sourcesTitle: "资料来源",
  sources: [
    { label: "Viator · 8 天北京西安上海私人游", url: SOURCE_URLS.viatorPrivate8 },
    { label: "Viator · 中国多日游", url: SOURCE_URLS.viatorMultiDay },
    { label: "Wendy Wu Tours 澳洲站 · 中国产品", url: SOURCE_URLS.wendyWu },
    { label: "文化和旅游部 · 2025 年星级饭店统计", url: SOURCE_URLS.mctHotels },
    { label: "张家界武陵源旅游官方网站 · 门票价格", url: SOURCE_URLS.zjjPark },
    { label: "中国银行 · 外汇牌价", url: SOURCE_URLS.boc },
  ],
  sourceNote:
    "在售价格读取于 2026 年 8 月 2 日，均为促销价或“起”价，不是针对具体入住日期的正式报价。外币按中国银行 2026 年 8 月 5 日公布汇率折算。价格和可售情况会变，本文所有数字请当作价格带，不是要约。",
};

const ko: ChinaTripCostCopy = {
  htmlLang: "ko",
  pagePath: "/ko/guides/how-much-does-a-china-trip-cost/",
  homePath: "/ko/",
  guidesPath: "/ko/guides/",
  plannerHref:
    "/ko/?utm_source=website&utm_medium=guide&utm_campaign=trip-cost&utm_content=china-trip-cost#planner-contact",

  metadata: {
    title: "중국 여행 비용은 얼마나 들까? 2026년 실제 가격 비교",
    description:
      "6~10일, 2~3개 도시 중국 여행에 실제로 드는 비용을 예약 플랫폼과 여행사의 공개 가격, 공식 입장권과 호텔 통계로 정리했습니다.",
    headline: "중국 여행 비용은 얼마나 들까?",
    schemaDescription:
      "2026년 중국 다도시 여행의 공개 가격대, 저렴한 프라이빗 투어와 비싼 프라이빗 투어의 차이, 그리고 누군가 마진을 붙이기 전의 현지 비용.",
    openGraphLocale: "ko_KR",
    inLanguage: "ko",
    heroAlt: "해질 무렵 불이 켜진 장자제의 숙소·식당 거리.",
    about: ["중국 여행 비용", "중국 프라이빗 투어 가격", "중국 여행 예산"],
  },

  skipLink: "본문으로 건너뛰기",
  breadcrumb: { home: "홈", guides: "여행 가이드", current: "중국 여행 비용" },

  hero: {
    eyebrow: "비용 가이드",
    reviewedLabel: "가격 확인",
    reviewedDate: "2026년 8월",
    lead: [
      "이 질문의 답은 대개 “경우에 따라 다르다”거나, 아니면 판매 페이지입니다. 이 글은 직접 열어서 확인할 수 있는 가격만 씁니다.",
      "아래 금액은 국제선 포함이라고 명시한 줄을 빼면 모두 현지 비용입니다. 숙소, 중국 국내 이동, 입장권, 가이드입니다. 국제선 항공권은 출발지에 따라 완전히 달라지므로 따로 뺐습니다.",
    ],
    imageAlt: "해질 무렵 불이 켜진 장자제의 숙소·식당 거리.",
    imageCaption:
      "같은 거리, 같은 주라도 여행을 어떻게 구성하느냐에 따라 세 가지 가격대에 놓입니다.",
  },

  earlyCta: {
    label: "예산을 잡고 계신가요?",
    title: "여행의 대략적인 형태를 알려주시면 범위를 드립니다",
    detail:
      "날짜, 고려 중인 도시, 인원, 대략적인 1박 예산이면 충분합니다. 예약이나 결제 전에 Homeground 플래너가 그 여행의 현실적인 범위를 알려 드립니다.",
    button: "내 여행 비용 물어보기",
  },

  shortAnswer: {
    title: "먼저 답부터",
    intro:
      "6~10일 동안 중국 도시 두세 곳을 도는 경우, 1인당 현지 비용은 보통 아래 세 구간 중 하나에 들어갑니다.",
    bands: [
      {
        range: "4,000 – 8,000위안",
        label: "직접 예약",
        detail:
          "이코노미·중급 호텔, 고속철 2등석, 입장권은 현장이나 국내 앱에서 구매, 가이드 없음. 계획도 문제 해결도 전부 직접 합니다.",
      },
      {
        range: "10,000 – 18,000위안",
        label: "누군가 준비해 주는 프라이빗 여행",
        detail:
          "조식 포함 3~4성, 프라이빗 차량 이동, 자격을 갖춘 가이드, 입장권과 도시 간 이동까지 처리. 공개 가격이 붙은 프라이빗 다도시 상품은 대부분 이 구간입니다.",
      },
      {
        range: "24,000위안 이상",
        label: "국제선 포함 인솔 단체",
        detail: "서구 여행사가 공개하는 가격으로, 국제선 항공권이 패키지에 포함됩니다.",
      },
    ],
    caveat:
      "이것은 가격대이지 견적이 아닙니다. 계절, 도시, 호텔 등급, 인원에 따라 구간 안에서 움직이고 때로는 구간을 벗어납니다.",
  },

  tiers: {
    title: "같은 여행을 사는 세 가지 방법",
    intro:
      "아래 모든 가격은 누구나 열어 볼 수 있는 페이지에 공개된 것이며, 날짜가 명시된 하나의 환율로 환산했습니다.",
    columns: {
      way: "구매 방식",
      example: "실제 판매 상품",
      price: "1인",
      includes: "포함",
      excludes: "불포함",
    },
    rows: [
      {
        way: "마켓플레이스의 프라이빗 투어",
        example: "8일, 베이징–시안–상하이, 프라이빗",
        price: "약 10,100위안",
        includes:
          "조식 포함 4성 7박, 고속철과 국내선 1구간, 프라이빗 차량과 기사, 가이드, 입장권",
        excludes: "국제선, 점심·저녁 대부분, 팁",
      },
      {
        way: "같은 형태의 더 비싼 운영사",
        example: "8일, 베이징–시안–상하이, 호텔 포함 프라이빗",
        price: "약 17,900위안",
        includes: "여행 형태는 동일, 호텔과 포함 항목이 다름",
        excludes: "국제선",
      },
      {
        way: "서구 여행사의 현지 패키지",
        example: "6일, 베이징과 상하이",
        price: "약 11,800위안",
        includes: "고정 일정, 숙소, 이동, 가이드",
        excludes: "국제선",
      },
      {
        way: "국제선 포함 인솔 단체",
        example: "10일, 다도시",
        price: "약 24,500위안",
        includes: "국제선, 숙소, 가이드, 대부분의 식사",
        excludes: "개인 지출, 선택 관광",
      },
      {
        way: "도시 한 곳의 프라이빗 구간",
        example: "한 도시 2~3일, 프라이빗 가이드와 차량",
        price: "약 2,300 – 3,600위안",
        includes: "프라이빗 가이드와 기사, 입장권, 호텔 픽업",
        excludes: "숙소, 식사, 도시 간 이동",
      },
    ],
    fxNote:
      "외화 표시 가격은 중국은행 고시 환율로 환산했으며 날짜는 아래 출처에 있습니다. 환율은 변하며, 구속력을 갖는 것은 원화폐 가격입니다.",
  },

  spread: {
    title: "같은 8일 프라이빗인데 왜 하나는 10,100, 하나는 17,900일까",
    intro:
      "같은 도시, 같은 일수, 페이지에 적힌 말도 같습니다. 차액은 거의 전부 네 가지에서 나옵니다.",
    factors: [
      {
        title: "호텔 등급, 그리고 어느 지점인지",
        detail:
          "가장 큰 항목입니다. 역 옆의 4성과 차로 한 시간 거리의 4성은 등급이 같고 가격은 크게 다르며, 그날 하루도 완전히 달라집니다.",
      },
      {
        title: "도시 간 이동이 항공인지 철도인지",
        detail:
          "고속철 대신 국내선을 넣으면 3개 도시 일정의 비용이 네 자리 수만큼 움직이고, 보통 반나절을 되사옵니다.",
      },
      {
        title: "진짜 프라이빗인지, 가이드만 전담이고 차량은 공유인지",
        detail:
          "“프라이빗”은 두 경우 모두에 쓰입니다. 차량에 다른 팀이 함께 타는지, 가이드가 하루 종일 동행하는지 각 명소 앞에서 만나는지 확인하세요.",
      },
      {
        title: "어떤 입장권과 케이블카가 가격에 들어 있는지",
        detail:
          "장자제만 해도 공원 입장권, 바이룽 엘리베이터, 각 케이블카가 따로 계산됩니다. 빠져 있으면 하루 수백 위안으로 다시 나타납니다.",
      },
    ],
    closing:
      "두 견적이 다를 때, 그 둘은 거의 언제나 같은 여행을 견적한 게 아닙니다. 비교하려면 이 네 가지를 먼저 나란히 놓아야 합니다.",
  },

  ground: {
    title: "누군가 마진을 붙이기 전, 현지 비용은 얼마인가",
    intro:
      "아래는 공개된 가격입니다. 저희를 포함한 모든 운영사가 이런 숫자에서 출발합니다.",
    columns: { item: "항목", price: "공개 가격", note: "비고" },
    rows: [
      { item: "장자제 국가삼림공원 입장권", price: "228위안", note: "4일 유효" },
      { item: "톈먼산", price: "258위안 + 3위안", note: "보험 포함" },
      { item: "대협곡 유리다리", price: "138위안", note: "" },
      { item: "바이룽 엘리베이터", price: "75위안", note: "편도" },
      { item: "톈쯔산 케이블카", price: "72위안", note: "편도" },
      { item: "황스자이 케이블카", price: "118위안", note: "왕복" },
    ],
    accommodation:
      "숙소: 문화여유부 별등급 호텔 표본의 2025년 평균 객실 요금은 1박 360.2위안입니다. 특정 표본의 전국 평균이며, 우링위안의 민박과 상하이 역 옆 4성은 그 양쪽으로 한참 떨어져 있습니다.",
    transport:
      "도시 간 이동: 이 도시들 사이는 보통 고속철 2등석입니다. 요금은 노선과 좌석 등급에 따라 달라지고 공식 채널 12306에 공개되어 있어, 이 글에서는 하나의 숫자로 제시하지 않습니다.",
  },

  diy: {
    title: "그럼 직접 예약하면 되지 않나요?",
    intro:
      "많은 경우 그렇습니다. 두 구간 사이의 차액은 실제 돈이고, 그 돈이 사는 것은 마법이 아니라 아주 구체적인 것들입니다.",
    yourself: {
      title: "직접 예약으로 충분한 경우",
      points: [
        "한두 도시에 머물고 이동이 많지 않을 때;",
        "기차·입장권·결제를 국내 앱으로 다루는 데 익숙할 때;",
        "도착 시간이 무난하고 짐이 가벼울 때;",
        "일행 중 일정이 유연해야 하는 사람이 없을 때.",
      ],
    },
    arranged: {
      title: "비용을 지불할 가치가 있는 경우",
      points: [
        "세 개 이상 도시를 하루도 버리지 않고 이어야 할 때;",
        "기차나 항공이 늦어지면 누군가 닫힌 프런트 앞에 서 있게 될 때;",
        "연로한 부모님, 아이, 큰 짐이 있어 “걸어갈 수 있는가”의 답이 달라질 때;",
        "공원 일정이 지도가 아니라 대기 시간과 케이블카 운영 시간에 맞춰 짜이길 원할 때.",
      ],
    },
    closing:
      "진짜 판단 기준은 가격이 아닙니다. 하나가 어긋났을 때 여행의 몇 퍼센트가 함께 멈추는지, 그리고 그때 전화를 받을 사람이 있는지입니다.",
  },

  howWeQuote: {
    title: "Homeground는 어떻게 견적을 내는가",
    paragraphs: [
      "저희는 고정 가격을 공개하지 않습니다. 같은 동선이 4월과 10월에 다르고, 2명일 때와 6명일 때 다르기 때문입니다.",
      "대신 무엇에도 약속하기 전에, 빠르게 범위를 드릴 수 있습니다.",
    ],
    listLabel: "저희 견적은 세 부분으로 구성됩니다:",
    items: [
      "그 동선에 실제로 필요한 호텔·이동·입장권·가이드의 현지 비용;",
      "계절과 인원 — 이 둘이 현지 비용을 생각보다 크게 움직입니다;",
      "명시된 코디네이션 비용 — 어디까지가 여행이고 어디부터가 저희인지 보이도록.",
    ],
    noPricePromise:
      "가장 저렴하겠다고 약속하지 않습니다. 역에서 더 멀리 배치하거나, 차량을 다른 팀과 공유하게 하거나, 케이블카를 가격에서 빼면 누구든 더 싸게 만들 수 있습니다.",
  },

  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "중국 여행은 비싼가요?",
        answer:
          "서유럽이나 일본과 비교하면 현지 비용은 대체로 낮습니다. 입장권, 이동, 숙소 모두 같은 품질 기준으로 그 지역들보다 저렴합니다. 사람들이 당황하는 지점은 단가가 아니라 챙겨야 할 요소의 수입니다.",
      },
      {
        question: "하루 예산은 얼마로 잡아야 하나요?",
        answer:
          "대략적인 형태로, 직접 예약에 중급 숙소·철도·입장권이면 1인당 하루 500~900위안입니다. 가이드와 차량이 붙는 프라이빗 구성은 보통 1인당 하루 1,200~2,200위안입니다.",
      },
      {
        question: "이 가격에 국제선이 포함되나요?",
        answer:
          "포함이라고 적힌 줄만 그렇습니다. 나머지는 모두 현지 비용입니다. 유럽·북미·호주에서 오는 항공권은 여행 전체 현지 비용과 맞먹을 수 있어 따로 분리했습니다.",
      },
      {
        question: "같은 일정인데 견적이 왜 그렇게 다른가요?",
        answer:
          "호텔 등급과 지점 위치, 도시 간 이동이 항공인지 철도인지, 차량이 정말 전용인지, 그리고 어떤 입장권과 케이블카가 가격에 들어 있는지. 네 가지가 차액의 대부분을 설명합니다.",
      },
      {
        question: "제가 정한 예산에 맞춰 주실 수 있나요?",
        answer:
          "대개 가능합니다. 그 동선이 그 예산에 들어가지 않으면 일찍 말씀드리고 무엇을 바꿔야 하는지 알려 드립니다. 아무도 감당 못 할 금액을 견적하는 것보다 빠른 대화입니다.",
      },
    ],
  },

  finalCta: {
    title: "내 여행 비용 물어보기",
    intro: "완성된 일정표는 필요 없습니다. 대략적인 형태면 현실적인 범위가 나옵니다.",
    listLabel: "이것만 보내주세요:",
    items: [
      "여행 날짜, 또는 월만;",
      "고려 중인 도시;",
      "인원, 그리고 더 여유로운 속도가 필요한 분이 있는지;",
      "대략적인 1박 또는 총예산이 있다면 그 금액.",
    ],
    detail:
      "Homeground 플래너가 그 여행의 범위를 드리고, 어떤 조건에서 금액이 움직이는지 분명히 말씀드립니다.",
    button: "내 여행 비용 물어보기",
  },

  sourcesTitle: "출처",
  sources: [
    { label: "Viator · 8일 베이징·시안·상하이 프라이빗 투어", url: SOURCE_URLS.viatorPrivate8 },
    { label: "Viator · 중국 다일정 투어", url: SOURCE_URLS.viatorMultiDay },
    { label: "Wendy Wu Tours 호주 · 중국 상품", url: SOURCE_URLS.wendyWu },
    { label: "문화여유부 · 2025년 별등급 호텔 통계", url: SOURCE_URLS.mctHotels },
    { label: "장자제 우링위안 공식 관광 사이트 · 입장권 가격", url: SOURCE_URLS.zjjPark },
    { label: "중국은행 · 외환 고시 환율", url: SOURCE_URLS.boc },
  ],
  sourceNote:
    "판매 가격은 2026년 8월 2일에 확인했으며 프로모션가 또는 “최저가”이지, 특정 숙박 날짜에 대한 견적이 아닙니다. 외화는 중국은행 2026년 8월 5일 고시 환율로 환산했습니다. 가격과 예약 가능 여부는 변하므로, 이 글의 모든 숫자는 청약이 아니라 가격대로 보시기 바랍니다.",
};

const copy: Record<HomegroundLocale, ChinaTripCostCopy> = { en, zh, ko };

export function getChinaTripCostCopy(
  locale: HomegroundLocale,
): ChinaTripCostCopy {
  return copy[locale] ?? copy.en;
}

export const CHINA_TRIP_COST_IMAGES = {
  hero: {
    basePath: "/images/guides/china-hotel-value/stay-street-evening",
    width: 1200,
    height: 750,
  },
} as const;
