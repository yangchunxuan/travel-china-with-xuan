import type { HomegroundLocale } from "./homegroundI18n";

export const chinaTripCostGuideId = "how-much-does-a-china-trip-cost" as const;

export interface TripCostSource {
  label: string;
  url: string;
}

/** One row of the published-price comparison. */
export interface TripCostTier {
  way: string;
  example: string;
  price: string;
  includes: string;
  excludes: string;
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
  };

  earlyCta: {
    label: string;
    title: string;
    detail: string;
    button: string;
  };

  /** Three verified published examples, stated before the explanation. */
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

  /** Why published China-trip prices can differ so widely. */
  spread: {
    title: string;
    intro: string;
    factors: readonly { title: string; detail: string }[];
    closing: string;
  };

  ground: {
    title: string;
    intro: string;
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
  wendyWuShortStay:
    "https://www.wendywutours.com.au/china/tours/beijing-shanghai-short-stay.htm",
  wendyWuPandas:
    "https://www.wendywutours.com.au/china/tours/in-pursuit-of-pandas.htm",
  mctHotels:
    "https://zwgk.mct.gov.cn/zfxxgkml/tjxx/202606/t20260602_966073.html",
} as const;

const en: ChinaTripCostCopy = {
  htmlLang: "en",
  pagePath: "/guides/how-much-does-a-china-trip-cost/",
  homePath: "/",
  guidesPath: "/guides/",
  plannerHref:
    "/?utm_source=website&utm_medium=guide&utm_campaign=trip-cost&utm_content=china-trip-cost#planner-contact",

  metadata: {
    title: "How Much Does a Trip to China Cost? 2026 Budget Guide",
    description:
      "Compare three current China-trip prices in their original currencies, understand what each includes and see what a complete private-trip quote should show.",
    headline: "How Much Does a Trip to China Cost?",
    schemaDescription:
      "A 2026 China trip budget guide separating land cost from international airfare, with published reference prices and the details that make private-trip quotes differ.",
    openGraphLocale: "en_US",
    inLanguage: "en",
    heroAlt:
      "Beijing's CBD skyline and elevated roads at dusk.",
    about: ["China trip cost", "China private tour price", "China travel budget"],
  },

  skipLink: "Skip to the guide",
  breadcrumb: { home: "Home", guides: "Travel guides", current: "China trip cost" },

  hero: {
    eyebrow: "Cost guide",
    reviewedLabel: "Prices checked",
    reviewedDate: "August 2026",
    lead: [
      "There is no honest single price for a China trip. Among the live listings we checked, an 8-day private land tour starts at US$1,462.71 per person, a 6-day private short stay starts at A$2,470, and a 10-day escorted tour with flights from selected Australian cities starts at A$5,130.",
      "Those are different products, not a cheapest-to-most-expensive ranking. Your useful number depends on the month, group size, route, hotel standard and what the price must include. Homeground can turn those details into a realistic range before you commit to a finished itinerary.",
    ],
    imageAlt: "Beijing's CBD skyline and elevated roads at dusk.",
  },

  earlyCta: {
    label: "Working out a budget?",
    title: "Send the trip shape. We will narrow the realistic range.",
    detail:
      "Your month, group size, cities and rough hotel standard are enough. A Homeground planner can flag the likely range, what will move it and which parts are worth paying more for before you commit.",
    button: "Ask what my trip would cost",
  },

  shortAnswer: {
    title: "Three real prices — and why they are not the same thing",
    intro:
      "These current public listings are useful reference points only when their conditions stay attached.",
    bands: [
      {
        range: "From US$1,462.71 pp",
        label: "8-day private land tour",
        detail:
          "Viator: Beijing–Xi’an–Shanghai, seven 4-star hotel nights, private guiding and transport within China. International flights are excluded.",
      },
      {
        range: "From A$2,470 pp",
        label: "6-day private short stay",
        detail:
          "Wendy Wu: Beijing and Shanghai, low season and twin share, with private transfers, guides, tickets and first-class rail. International flights are excluded.",
      },
      {
        range: "From A$5,130 pp",
        label: "10-day escorted tour with flights",
        detail:
          "Wendy Wu: promotional group-tour price including international flights and taxes from selected Australian gateways, 4-star hotels and meals.",
      },
    ],
    caveat:
      "Prices checked 9 August 2026 and kept in their original currencies. All are per person and marked “from”; dates, availability, departure city, room basis and sale conditions can change the payable amount.",
  },

  tiers: {
    title: "Published examples: compare the scope before the price",
    intro:
      "These are reference points, not like-for-like quotes. They cover different dates, durations and inclusions. Read across each row before deciding which number is actually cheaper.",
    columns: {
      way: "Published example",
      example: "Trip shape",
      price: "Published price",
      includes: "Includes",
      excludes: "Excludes or conditions",
    },
    rows: [
      {
        way: "Viator private tour",
        example: "8 days, Beijing–Xi’an–Shanghai; land-only",
        price: "From US$1,462.71 per person",
        includes:
          "7 nights in 4-star hotels, breakfasts and most lunches, bullet train, one domestic flight, private vehicle, guide and admission tickets",
        excludes:
          "International flights, most dinners, tips and optional activities; exact price requires dates and traveller count",
      },
      {
        way: "Wendy Wu private short stay",
        example: "6 days / 5 nights, Beijing and Shanghai; land-only",
        price: "From A$2,470 per person",
        includes:
          "Private airport transfers, guides and admission, first-class rail, 5 hotel nights, 5 breakfasts and 3 lunches",
        excludes:
          "International flights and other meals; published basis is low season and two people sharing",
      },
      {
        way: "Wendy Wu escorted group tour",
        example: "10 days / 8 nights; group of up to 28, departing Australia",
        price: "From A$5,130 per person",
        includes:
          "International flights and taxes from selected Australian gateways, 4-star hotels, guides, admission, 8 breakfasts, 7 lunches and 8 dinners",
        excludes:
          "Promotional price and selected origins only; supplements, tips and personal spending may apply",
      },
    ],
    fxNote:
      "Prices were checked on 9 August 2026 and are shown in the original currencies so exchange-rate choices do not create a false comparison. They are published “from” prices, not Homeground quotes.",
  },

  spread: {
    title: "Why published China-trip prices can be thousands apart",
    intro:
      "The same cities and the same number of days do not make the same product. Four details usually explain most of the difference.",
    factors: [
      {
        title: "Hotel grade, and which branch",
        detail:
          "Hotels are often one of the largest line items. A four-star beside the station and a four-star an hour out can share a rating while changing both the price and the shape of the day.",
      },
      {
        title: "Whether inter-city transport is flights or rail",
        detail:
          "Choosing a domestic flight instead of rail changes both the total and the usable sightseeing time. The cheaper ticket is not always the cheaper day.",
      },
      {
        title: "Truly private, or private guide with shared vehicle",
        detail:
          "“Private” is used for both. Ask how many parties share the car, and whether the guide is with you all day or meets you at each site.",
      },
      {
        title: "Which tickets and cable cars are inside the price",
        detail:
          "In places such as Zhangjiajie, park admission, lifts and cableways may be separate line items. When they are excluded, they reappear as payments during the trip.",
      },
    ],
    closing:
      "A useful comparison puts the exact hotel branch, inter-city seats, vehicle arrangement, tickets and support responsibility side by side. Otherwise the lower total may simply be missing more.",
  },

  ground: {
    title: "What sits inside the final price",
    intro:
      "Public ticket prices are only one layer. A complete trip price also depends on live hotel availability, room type and location, booked train or flight inventory, transfers, guiding and who handles a disruption.",
    accommodation:
      "Accommodation: the Ministry of Culture and Tourism’s star-rated hotel sample averaged ¥360.2 per room night in 2025. That national sample is context, not a quote. The exact branch, room type, date, cancellation policy and foreign-passport check-in matter more for a real booking.",
    transport:
      "Inter-city transport: second-class high-speed rail is common, but the useful number is the fare for the train that fits the route and still has seats. A cheaper departure can cost a sightseeing half-day or create an awkward transfer.",
  },

  diy: {
    title: "DIY or arranged: where the extra money goes",
    intro:
      "The decision is less about finding a universal price gap and more about deciding how much responsibility you want to keep during the trip.",
    yourself: {
      title: "Booking it yourself works when",
      points: [
        "you are staying in one or two cities and not moving much;",
        "you are comfortable with domestic apps for trains, tickets and payment;",
        "your group can absorb a changed train, hotel issue or weather day without outside help.",
      ],
    },
    arranged: {
      title: "Paying someone is worth it when",
      points: [
        "three or more cities, arrivals and hotel moves need to connect cleanly;",
        "older parents, children or heavy luggage change the workable pace;",
        "you want one responsible contact when transport, weather or a booking changes.",
      ],
    },
    closing:
      "The practical question is not whether you can click the bookings. It is how much of the trip depends on those bookings joining up, and who fixes the join when it does not.",
  },

  howWeQuote: {
    title: "How Homeground quotes",
    paragraphs: [
      "We do not publish a fixed price for a trip, because the same route costs different money in April and October, at two people and at six.",
      "We first give a realistic range. If the trip moves forward, the written quote shows one total, what is included, what is excluded and which party is responsible for each part.",
    ],
    listLabel: "A quote from us is built from:",
    items: [
      "named hotels or a clearly defined hotel standard, room basis and location;",
      "the transport, vehicles, tickets, guiding and support included in the total;",
      "the exclusions, cancellation basis and who responds if the plan changes.",
    ],
    noPricePromise:
      "We do not promise the lowest headline number. We make the scope comparable, so a lower price cannot hide a distant hotel, shared vehicle or missing ticket.",
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "Is China expensive to travel in?",
        answer:
          "A simple stay in one city and a privately arranged multi-city journey are different products, so one label is not very useful. Hotel choice, transport between cities and the amount of private support usually matter more than the country-wide average.",
      },
      {
        question: "How much should I budget per day?",
        answer:
          "There is no defensible daily figure without a route, month, group size and hotel basis. Build the land total from those inputs first, then divide it by the number of days. If you send us those four details, we can narrow the realistic range without requiring a finished itinerary.",
      },
      {
        question: "Do these prices include international flights?",
        answer:
          "Only where a line says so. Everything else is land cost. Flights from Europe, North America or Australia can equal the entire land cost of the trip, which is why we keep them separate.",
      },
      {
        question: "Why do quotes for the same itinerary differ so much?",
        answer:
          "Hotel grade and branch, flights versus rail between cities, how the vehicle and guide are provided, and which tickets are inside the price. These details often explain much of the gap.",
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
      "the hotel standard or rough total budget you are comfortable with.",
    ],
    detail:
      "A Homeground planner will narrow the likely range, explain what moves it and identify where paying more would materially improve the trip.",
    button: "Ask what my trip would cost",
  },

  sourcesTitle: "Sources",
  sources: [
    {
      label: "Viator — 8 Days Private Tour of Beijing, Xian and Shanghai",
      url: SOURCE_URLS.viatorPrivate8,
    },
    {
      label: "Wendy Wu Tours Australia — Beijing & Shanghai Short Stay",
      url: SOURCE_URLS.wendyWuShortStay,
    },
    {
      label: "Wendy Wu Tours Australia — In Pursuit of Pandas",
      url: SOURCE_URLS.wendyWuPandas,
    },
    {
      label: "Ministry of Culture and Tourism — 2025 star-rated hotel statistics",
      url: SOURCE_URLS.mctHotels,
    },
  ],
  sourceNote:
    "Listing prices and inclusions were checked on 9 August 2026. Viator and Wendy Wu figures are current “from,” low-season or promotional examples and require exact dates, traveller count and departure details. They remain in their original currencies and are not Homeground offers. Prices and availability can change.",
};

const zh: ChinaTripCostCopy = {
  htmlLang: "zh-CN",
  pagePath: "/zh/guides/how-much-does-a-china-trip-cost/",
  homePath: "/zh/",
  guidesPath: "/zh/guides/",
  plannerHref:
    "/zh/?utm_source=website&utm_medium=guide&utm_campaign=trip-cost&utm_content=china-trip-cost#planner-contact",

  metadata: {
    title: "去中国旅行大概多少钱？2026 预算与报价指南",
    description:
      "对照三份当前公开的中国旅行原币价格，弄清每份包含什么，并看懂一份完整的私人行程报价应该写清什么。",
    headline: "去中国旅行大概多少钱？",
    schemaDescription:
      "2026 年中国多城市旅行预算指南：把地面费用与国际机票分开，对照公开参考价格，并解释私人行程报价为什么会不同。",
    openGraphLocale: "zh_CN",
    inLanguage: "zh-CN",
    heroAlt: "暮色中的北京 CBD 天际线与城市立交。",
    about: ["中国旅行费用", "中国私人定制游价格", "中国旅行预算"],
  },

  skipLink: "跳到正文",
  breadcrumb: { home: "首页", guides: "旅行指南", current: "中国行程费用" },

  hero: {
    eyebrow: "费用指南",
    reviewedLabel: "价格核对于",
    reviewedDate: "2026 年 8 月",
    lead: [
      "中国旅行没有一个适用于所有人的固定价格。我们核对到的在售案例里，8 天私人地面行程每人 1,462.71 美元起，6 天私人短途行程每人 2,470 澳元起；另一份从澳大利亚指定城市出发、含国际机票的 10 天随团产品则是每人 5,130 澳元起。",
      "这三项不是从低价到高价的排名，而是三种不同产品。对你真正有用的数字，要看月份、人数、路线、酒店标准和总价里必须包含什么。把这些发给 Homeground，我们可以先帮你缩小现实预算，不要求你已经写好完整行程。",
    ],
    imageAlt: "暮色中的北京 CBD 天际线与城市立交。",
  },

  earlyCta: {
    label: "正在算预算？",
    title: "把行程的大致形状发来，我们帮你缩小现实区间",
    detail:
      "月份、同行人数、想去的城市和大致住宿标准就够。Homeground 的规划师会先判断可能的区间、什么因素会让它变化，以及哪些地方值得多花钱。",
    button: "问问我这趟大概多少钱",
  },

  shortAnswer: {
    title: "三个真实价格，三种不同产品",
    intro:
      "这些当前公开在售价格可以作为参照，但只有连同条件一起看才有意义。",
    bands: [
      {
        range: "每人 1,462.71 美元起",
        label: "8 天私人地面行程",
        detail:
          "Viator：北京—西安—上海，7 晚四星住宿，含中国境内的私人导览和交通，不含国际机票。",
      },
      {
        range: "每人 2,470 澳元起",
        label: "6 天私人短途行程",
        detail:
          "Wendy Wu：北京和上海，低季、两人同住一间房，含私人接送、导游、门票和一等座高铁，不含国际机票。",
      },
      {
        range: "每人 5,130 澳元起",
        label: "10 天含机票随团产品",
        detail:
          "Wendy Wu：促销中的随团产品，含澳大利亚指定出发城市的国际机票与相关费用、四星住宿和餐食。",
      },
    ],
    caveat:
      "价格核对于 2026 年 8 月 9 日，并保留原币。三项都是人均“起”价；日期、余位、出发城市、房间基础和促销条件都会改变最终应付金额。",
  },

  tiers: {
    title: "公开价格对照：先比较包含范围，再比较数字",
    intro:
      "这些只是参照点，不是完全相同的报价。日期、天数和包含项并不一致；必须把每一行横着看完，才知道哪个数字真正更便宜。",
    columns: {
      way: "公开产品类型",
      example: "行程形状",
      price: "公开原币价格",
      includes: "含",
      excludes: "不含或适用条件",
    },
    rows: [
      {
        way: "Viator 私人行程",
        example: "8 天，北京—西安—上海；不含国际机票",
        price: "每人 1,462.71 美元起",
        includes:
          "7 晚四星住宿、早餐和多数午餐、高铁、一段国内航班、私人车辆、导游和门票",
        excludes:
          "国际机票、多数晚餐、小费和自费项目；具体价格要输入日期与人数",
      },
      {
        way: "Wendy Wu 私人短途行程",
        example: "6 天 5 晚，北京和上海；不含国际机票",
        price: "每人 2,470 澳元起",
        includes:
          "私人机场接送、导游与门票、一等座高铁、5 晚住宿、5 次早餐和 3 次午餐",
        excludes:
          "国际机票和其余餐食；公开价格按低季、两人同住一间房计算",
      },
      {
        way: "Wendy Wu 随团产品",
        example: "10 天 8 晚；最多 28 人，从澳大利亚出发",
        price: "每人 5,130 澳元起",
        includes:
          "从澳大利亚指定城市出发的国际机票与相关费用、四星住宿、导游、门票、8 次早餐、7 次午餐和 8 次晚餐",
        excludes:
          "促销价且只适用于指定出发地；其他城市附加费、小费和个人消费可能另计",
      },
    ],
    fxNote:
      "价格核对于 2026 年 8 月 9 日，并保留原币，避免汇率口径造成虚假的精确比较。它们是外部网站的公开“起”价，不是 Homeground 的报价。",
  },

  spread: {
    title: "为什么公开的中国旅行价格能相差这么多",
    intro:
      "城市相同、天数相同，并不代表买到的是同一个产品。大部分差价通常来自下面四个细节。",
    factors: [
      {
        title: "酒店档次，以及是哪一家门店",
        detail:
          "住宿通常是较大的费用项之一。车站旁边的四星和一小时车程外的四星，星级可以一样，但价格和一天的安排都会不同。",
      },
      {
        title: "城际是飞还是坐高铁",
        detail:
          "国内航班和高铁会同时改变总价与可游览时间。票面更便宜，不代表这一天的总成本更低。",
      },
      {
        title: "是真私人，还是私人导游配拼车",
        detail:
          "“私人”这个词两种都在用。要问清楚：车上会不会有别的客人，导游是全天跟着还是每个景点门口碰头。",
      },
      {
        title: "哪些门票和索道算在价里",
        detail:
          "在张家界等目的地，大门票、电梯和索道可能分开计费。不含的话，旅行途中就要另外付款。",
      },
    ],
    closing:
      "真正可比的报价，要把具体酒店门店、城际座位、用车方式、门票和出现变化时由谁负责并排写清。否则低价可能只是少包含了更多东西。",
  },

  ground: {
    title: "最终价格里到底包含了什么",
    intro:
      "公开门票只是其中一层。完整价格还取决于酒店的实时房量、房型和位置，能买到的火车或航班，接送与导览，以及行程变化时由谁处理。",
    accommodation:
      "住宿：文化和旅游部星级饭店样本 2025 年平均房价为每间夜 360.2 元。这只能作为市场背景，不是报价。真实预订更要看具体门店、房型、日期、取消政策和外国护照入住情况。",
    transport:
      "城际交通：高铁二等座很常见，但真正有用的是那一班既适合路线又还有座位的票价。更便宜的车次可能吃掉半天游览时间，或者制造一次麻烦的转场。",
  },

  diy: {
    title: "自己订还是让人安排：差价买到了什么",
    intro:
      "这里不适合用一个固定差价做决定。更重要的是，你希望旅行中有多少责任由自己承担。",
    yourself: {
      title: "自己订完全够用，如果",
      points: [
        "只待一两个城市，移动不多；",
        "你能熟练用国内 App 买票、订票、支付；",
        "遇到换车次、酒店问题或天气变化时，同行人能自行调整。",
      ],
    },
    arranged: {
      title: "花钱让人安排值得，如果",
      points: [
        "三个以上城市、抵达和换酒店需要顺畅衔接；",
        "同行有年长父母、小孩或大件行李，现实节奏会改变；",
        "交通、天气或预订发生变化时，你希望有一个明确负责的联系人。",
      ],
    },
    closing:
      "关键不是你会不会点下订单，而是这些订单有多少必须准确接起来，以及接不上时由谁处理。",
  },

  howWeQuote: {
    title: "Homeground 怎么报价",
    paragraphs: [
      "我们不公布固定价格，因为同一条路线在四月和十月不是一个价，两个人和六个人也不是一个价。",
      "我们会先给出现实区间。确定继续后，书面报价会写清一个总价、包含与不包含的项目，以及每个环节由哪一方负责。",
    ],
    listLabel: "一份可比较的报价会写清：",
    items: [
      "具体酒店，或者明确的住宿标准、房型基础和位置；",
      "总价中包含的交通、车辆、门票、导览和旅行支持；",
      "不包含的项目、取消条件，以及计划变化时由谁回应。",
    ],
    noPricePromise:
      "我们不承诺页面上的最低数字，而是把范围写到可以比较，避免低价藏着偏远酒店、拼车或漏掉的门票。",
  },

  faq: {
    title: "常见问题",
    items: [
      {
        question: "在中国旅行贵吗？",
        answer:
          "只住一个城市的简单行程，和有人安排的多城市私人旅行，是两种不同产品，所以很难用一个“贵”或“不贵”概括。酒店选择、城际交通和需要多少私人支持，通常比全国平均数字更有用。",
      },
      {
        question: "每天该按多少预算？",
        answer:
          "没有路线、月份、人数和住宿基础，就没有一个可靠的每日数字。应先按这些条件算出整趟地面费用，再除以天数。把这四项发给我们，不用先写完整行程，也可以缩小现实区间。",
      },
      {
        question: "这些价格含国际机票吗？",
        answer:
          "只有明确写了的才含，其余都是地面费用。从欧洲、北美或澳洲飞过来的机票可能和整趟地面费用相当，所以我们把它单独拿开。",
      },
      {
        question: "为什么同一条行程的报价能差这么多？",
        answer:
          "酒店档次和门店位置、城际是飞还是高铁、车辆与导游如何提供，以及哪些门票算在价里。这些细节通常能解释很大一部分差价。",
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
      "你能接受的住宿标准或大致总预算。",
    ],
    detail:
      "Homeground 的规划师会缩小这趟行程的可能区间，说明数字为什么会变，并指出哪些地方多花钱会真正改善体验。",
    button: "问问我这趟大概多少钱",
  },

  sourcesTitle: "资料来源",
  sources: [
    { label: "Viator · 8 天北京西安上海私人游", url: SOURCE_URLS.viatorPrivate8 },
    {
      label: "Wendy Wu Tours 澳洲站 · 北京与上海私人短途行程",
      url: SOURCE_URLS.wendyWuShortStay,
    },
    {
      label: "Wendy Wu Tours 澳洲站 · In Pursuit of Pandas",
      url: SOURCE_URLS.wendyWuPandas,
    },
    { label: "文化和旅游部 · 2025 年星级饭店统计", url: SOURCE_URLS.mctHotels },
  ],
  sourceNote:
    "在售价格与包含项核对于 2026 年 8 月 9 日。Viator 与 Wendy Wu 的数字是当时的“起”价、低季价或促销案例，实际金额要看日期、人数和出发信息。本文保留原币，不是 Homeground 的报价；价格与可售情况可能变化。",
};

const ko: ChinaTripCostCopy = {
  htmlLang: "ko",
  pagePath: "/ko/guides/how-much-does-a-china-trip-cost/",
  homePath: "/ko/",
  guidesPath: "/ko/guides/",
  plannerHref:
    "/ko/?utm_source=website&utm_medium=guide&utm_campaign=trip-cost&utm_content=china-trip-cost#planner-contact",

  metadata: {
    title: "중국 여행 비용은 얼마나 들까? 2026년 예산 가이드",
    description:
      "현재 공개된 중국 여행 가격 세 개를 게시 통화로 비교하고, 포함 항목과 완전한 프라이빗 여행 견적에 필요한 내용을 확인합니다.",
    headline: "중국 여행 비용은 얼마나 들까?",
    schemaDescription:
      "2026년 중국 다도시 여행 예산 가이드. 현지 비용과 국제선을 분리하고 공개 참고 가격과 프라이빗 여행 견적이 달라지는 이유를 설명합니다.",
    openGraphLocale: "ko_KR",
    inLanguage: "ko",
    heroAlt: "해 질 무렵의 베이징 CBD 스카이라인과 고가도로.",
    about: ["중국 여행 비용", "중국 프라이빗 투어 가격", "중국 여행 예산"],
  },

  skipLink: "본문으로 건너뛰기",
  breadcrumb: { home: "홈", guides: "여행 가이드", current: "중국 여행 비용" },

  hero: {
    eyebrow: "비용 가이드",
    reviewedLabel: "가격 확인",
    reviewedDate: "2026년 8월",
    lead: [
      "중국 여행에는 모두에게 적용되는 하나의 고정 가격이 없습니다. 현재 확인한 상품 중 8일 프라이빗 현지 여행은 1인 US$1,462.71부터, 6일 프라이빗 단기 여행은 1인 A$2,470부터였습니다. 호주 일부 도시에서 출발하는 국제선 포함 10일 단체 여행은 1인 A$5,130부터였습니다.",
      "세 상품은 저가부터 고가까지의 순위가 아니라 서로 다른 상품입니다. 내 여행에 필요한 금액은 여행 시기, 인원, 동선, 숙소 기준과 총액에 무엇을 넣는지에 따라 달라집니다. 이 정보를 Homeground에 보내면 완성된 일정표 없이도 현실적인 범위를 먼저 알려 드릴 수 있습니다.",
    ],
    imageAlt: "해 질 무렵의 베이징 CBD 스카이라인과 고가도로.",
  },

  earlyCta: {
    label: "예산을 잡고 계신가요?",
    title: "여행의 형태를 보내주시면 현실적인 범위를 좁혀 드립니다",
    detail:
      "여행 월, 인원, 고려 중인 도시와 대략적인 숙소 기준이면 충분합니다. Homeground 플래너가 가능한 범위와 금액이 움직이는 이유, 더 지불할 가치가 있는 부분을 먼저 짚어 드립니다.",
    button: "내 여행 비용 물어보기",
  },

  shortAnswer: {
    title: "실제 가격 세 개, 서로 다른 여행 세 가지",
    intro:
      "현재 공개된 아래 가격은 조건을 함께 읽을 때만 유용한 참고점이 됩니다.",
    bands: [
      {
        range: "1인 US$1,462.71부터",
        label: "8일 프라이빗 현지 여행",
        detail:
          "Viator: 베이징–시안–상하이, 4성 호텔 7박과 중국 내 프라이빗 가이드·이동 포함. 국제선은 불포함입니다.",
      },
      {
        range: "1인 A$2,470부터",
        label: "6일 프라이빗 단기 여행",
        detail:
          "Wendy Wu: 베이징과 상하이, 비수기·2인 1실 기준. 프라이빗 이동, 가이드, 입장권과 1등석 열차 포함, 국제선 불포함입니다.",
      },
      {
        range: "1인 A$5,130부터",
        label: "국제선 포함 10일 단체 여행",
        detail:
          "Wendy Wu: 호주 일부 출발 도시의 국제선과 세금, 4성 숙소와 식사가 포함된 프로모션 단체 상품입니다.",
      },
    ],
    caveat:
      "가격 확인일은 2026년 8월 9일이며 원화폐 그대로 표시했습니다. 모두 1인당 ‘최저’ 가격입니다. 날짜, 좌석, 출발 도시, 객실 기준과 프로모션 조건에 따라 실제 결제액이 달라집니다.",
  },

  tiers: {
    title: "공개 가격 비교: 숫자보다 포함 범위를 먼저 보세요",
    intro:
      "아래 가격은 참고점이지 동일 조건의 견적이 아닙니다. 날짜, 기간과 포함 항목이 서로 다르므로 각 행을 끝까지 읽어야 실제로 어느 쪽이 더 저렴한지 알 수 있습니다.",
    columns: {
      way: "공개 상품 유형",
      example: "여행 형태",
      price: "공개 원화폐 가격",
      includes: "포함",
      excludes: "불포함 또는 조건",
    },
    rows: [
      {
        way: "Viator 프라이빗 여행",
        example: "8일, 베이징–시안–상하이; 국제선 불포함",
        price: "1인 US$1,462.71부터",
        includes:
          "4성 호텔 7박, 조식과 대부분의 중식, 고속철, 국내선 1회, 프라이빗 차량, 가이드와 입장권",
        excludes:
          "국제선, 대부분의 석식, 팁과 선택 관광; 정확한 가격은 날짜와 인원을 입력해야 확인 가능",
      },
      {
        way: "Wendy Wu 프라이빗 단기 여행",
        example: "6일 / 5박, 베이징과 상하이; 국제선 불포함",
        price: "1인 A$2,470부터",
        includes:
          "프라이빗 공항 이동, 가이드와 입장권, 1등석 열차, 호텔 5박, 조식 5회와 중식 3회",
        excludes:
          "국제선과 나머지 식사; 공개 가격은 비수기·2인 1실 기준",
      },
      {
        way: "Wendy Wu 인솔 단체 여행",
        example: "10일 / 8박; 최대 28명, 호주 출발",
        price: "1인 A$5,130부터",
        includes:
          "호주 일부 도시 출발 국제선과 세금, 4성 호텔, 가이드, 입장권, 조식 8회, 중식 7회와 석식 8회",
        excludes:
          "프로모션 가격이며 일부 출발지만 적용; 다른 출발지 추가금, 팁과 개인 지출이 발생할 수 있음",
      },
    ],
    fxNote:
      "가격은 2026년 8월 9일에 확인했고 환율 선택이 잘못된 정밀도를 만들지 않도록 원화폐로 표시했습니다. 외부 사이트의 공개 ‘최저’ 가격이며 Homeground 견적이 아닙니다.",
  },

  spread: {
    title: "공개된 중국 여행 가격이 크게 다른 이유",
    intro:
      "도시와 일수가 같아도 같은 상품을 사는 것은 아닙니다. 대부분의 차이는 아래 네 가지 세부사항에서 나옵니다.",
    factors: [
      {
        title: "호텔 등급, 그리고 어느 지점인지",
        detail:
          "숙소는 대체로 큰 비용 항목 중 하나입니다. 역 옆의 4성과 차로 한 시간 거리의 4성은 등급이 같아도 가격과 하루 동선이 달라질 수 있습니다.",
      },
      {
        title: "도시 간 이동이 항공인지 철도인지",
        detail:
          "국내선과 철도 중 무엇을 고르는지에 따라 총액과 실제 관광 시간이 함께 달라집니다. 표 값이 더 싸다고 그날의 총비용도 낮은 것은 아닙니다.",
      },
      {
        title: "진짜 프라이빗인지, 가이드만 전담이고 차량은 공유인지",
        detail:
          "“프라이빗”은 두 경우 모두에 쓰입니다. 차량에 다른 팀이 함께 타는지, 가이드가 하루 종일 동행하는지 각 명소 앞에서 만나는지 확인하세요.",
      },
      {
        title: "어떤 입장권과 케이블카가 가격에 들어 있는지",
        detail:
          "장자제 같은 목적지에서는 공원 입장권, 엘리베이터와 케이블카가 별도 항목일 수 있습니다. 불포함이면 여행 중 따로 결제하게 됩니다.",
      },
    ],
    closing:
      "비교 가능한 견적은 정확한 호텔 지점, 도시 간 좌석, 차량 방식, 입장권과 변경 시 책임자를 나란히 보여 줍니다. 그렇지 않으면 낮은 가격은 단지 더 많은 항목이 제외된 결과일 수 있습니다.",
  },

  ground: {
    title: "최종 가격에는 무엇이 들어 있을까",
    intro:
      "공개 입장권은 한 층에 불과합니다. 완전한 여행 가격은 실시간 호텔 객실, 객실 유형과 위치, 예약 가능한 열차나 항공, 픽업과 가이드, 그리고 변경 시 누가 처리하는지에 따라 달라집니다.",
    accommodation:
      "숙소: 문화여유부 별등급 호텔 표본의 2025년 평균 객실 요금은 1박 360.2위안입니다. 이는 시장 배경이지 견적이 아닙니다. 실제 예약에서는 정확한 지점, 객실 유형, 날짜, 취소 조건과 외국 여권 체크인이 더 중요합니다.",
    transport:
      "도시 간 이동: 고속철 2등석이 흔하지만, 실제로 유용한 숫자는 동선에 맞고 좌석이 남은 열차의 요금입니다. 더 싼 출발편이 관광 반나절을 없애거나 불편한 환승을 만들 수 있습니다.",
  },

  diy: {
    title: "직접 예약과 맡기는 여행: 차액이 사는 것",
    intro:
      "하나의 고정된 가격 차이로 결정하기보다 여행 중 어느 정도의 책임을 직접 맡을지 정하는 것이 중요합니다.",
    yourself: {
      title: "직접 예약으로 충분한 경우",
      points: [
        "한두 도시에 머물고 이동이 많지 않을 때;",
        "기차·입장권·결제를 국내 앱으로 다루는 데 익숙할 때;",
        "열차 변경, 호텔 문제나 날씨 변화가 생겨도 일행이 직접 조정할 수 있을 때.",
      ],
    },
    arranged: {
      title: "비용을 지불할 가치가 있는 경우",
      points: [
        "세 개 이상 도시, 도착과 호텔 이동이 매끄럽게 이어져야 할 때;",
        "연로한 부모님, 아이나 큰 짐 때문에 현실적인 속도가 달라질 때;",
        "교통, 날씨나 예약이 바뀔 때 책임지고 응답할 한 명의 담당자를 원할 때.",
      ],
    },
    closing:
      "핵심은 예약 버튼을 누를 수 있느냐가 아니라, 예약들이 얼마나 정확히 이어져야 하는지와 이어지지 않을 때 누가 처리하는지입니다.",
  },

  howWeQuote: {
    title: "Homeground는 어떻게 견적을 내는가",
    paragraphs: [
      "저희는 고정 가격을 공개하지 않습니다. 같은 동선이 4월과 10월에 다르고, 2명일 때와 6명일 때 다르기 때문입니다.",
      "먼저 현실적인 범위를 드립니다. 계속 진행하면 서면 견적에 하나의 총액, 포함·불포함 항목과 각 부분의 책임 주체를 적습니다.",
    ],
    listLabel: "비교 가능한 견적에는 다음이 적혀야 합니다:",
    items: [
      "정확한 호텔 또는 명확한 숙소 기준, 객실 조건과 위치;",
      "총액에 포함된 교통, 차량, 입장권, 가이드와 여행 지원;",
      "불포함 항목, 취소 조건과 계획이 바뀔 때 응답하는 주체.",
    ],
    noPricePromise:
      "가장 낮은 숫자를 약속하지는 않습니다. 대신 범위를 비교 가능하게 적어 먼 호텔, 공유 차량이나 빠진 입장권이 낮은 가격 뒤에 숨지 않게 합니다.",
  },

  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "중국 여행은 비싼가요?",
        answer:
          "한 도시에 머무는 단순한 여행과 여러 도시를 프라이빗하게 연결하는 여행은 서로 다른 상품이어서 ‘비싸다’ 한마디로 정리하기 어렵습니다. 숙소 선택, 도시 간 이동과 필요한 지원 수준이 전국 평균보다 더 중요한 기준입니다.",
      },
      {
        question: "하루 예산은 얼마로 잡아야 하나요?",
        answer:
          "동선, 여행 시기, 인원과 숙소 기준이 없으면 신뢰할 만한 하루 금액도 없습니다. 먼저 이 조건으로 전체 현지 비용을 계산한 뒤 일수로 나누는 편이 정확합니다. 네 가지 정보를 보내주시면 완성된 일정표 없이도 현실적인 범위를 좁혀 드립니다.",
      },
      {
        question: "이 가격에 국제선이 포함되나요?",
        answer:
          "포함이라고 적힌 줄만 그렇습니다. 나머지는 모두 현지 비용입니다. 유럽·북미·호주에서 오는 항공권은 여행 전체 현지 비용과 맞먹을 수 있어 따로 분리했습니다.",
      },
      {
        question: "같은 일정인데 견적이 왜 그렇게 다른가요?",
        answer:
          "호텔 등급과 지점 위치, 도시 간 이동이 항공인지 철도인지, 차량과 가이드가 어떻게 제공되는지, 어떤 입장권이 포함되는지에 따라 달라집니다. 이런 세부사항이 차액의 큰 부분을 설명합니다.",
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
      "원하는 숙소 수준 또는 감당 가능한 대략적인 총예산.",
    ],
    detail:
      "Homeground 플래너가 가능한 범위를 좁히고 금액이 움직이는 이유와 더 지불하면 실제로 좋아지는 부분을 설명해 드립니다.",
    button: "내 여행 비용 물어보기",
  },

  sourcesTitle: "출처",
  sources: [
    { label: "Viator · 8일 베이징·시안·상하이 프라이빗 투어", url: SOURCE_URLS.viatorPrivate8 },
    {
      label: "Wendy Wu Tours 호주 · 베이징·상하이 프라이빗 단기 여행",
      url: SOURCE_URLS.wendyWuShortStay,
    },
    {
      label: "Wendy Wu Tours 호주 · In Pursuit of Pandas",
      url: SOURCE_URLS.wendyWuPandas,
    },
    { label: "문화여유부 · 2025년 별등급 호텔 통계", url: SOURCE_URLS.mctHotels },
  ],
  sourceNote:
    "판매 가격과 포함 항목은 2026년 8월 9일에 확인했습니다. Viator와 Wendy Wu 금액은 당시의 ‘최저’, 비수기 또는 프로모션 사례이며 실제 금액은 날짜, 인원과 출발 정보에 따라 달라집니다. 원화폐로 표시했고 Homeground 견적이 아닙니다. 가격과 예약 가능 여부는 바뀔 수 있습니다.",
};

const copy: Record<HomegroundLocale, ChinaTripCostCopy> = { en, zh, ko };

export function getChinaTripCostCopy(
  locale: HomegroundLocale,
): ChinaTripCostCopy {
  return copy[locale] ?? copy.en;
}

export const CHINA_TRIP_COST_IMAGES = {
  hero: {
    basePath: "/images/guides/china-trip-cost/beijing-cbd-city-mobility",
    width: 1200,
    height: 750,
  },
} as const;
