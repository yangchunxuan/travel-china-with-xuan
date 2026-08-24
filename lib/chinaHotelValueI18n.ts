import type { HomegroundLocale } from "./homegroundI18n";

export const chinaHotelValueGuideId = "why-are-hotels-in-china-so-cheap" as const;

export interface HotelValueSource {
  /** Short label rendered inline next to a claim. */
  label: string;
  url: string;
}

export interface HotelValueCheck {
  number: string;
  title: string;
  detail: string;
}

export interface HotelValueQuestion {
  title: string;
  paragraphs: readonly string[];
}

export interface HotelValueStayType {
  type: string;
  why: string;
  watch: string;
}

export interface HotelValueFaq {
  question: string;
  answer: string;
}

export interface ChinaHotelValueCopy {
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
  breadcrumb: {
    home: string;
    guides: string;
    current: string;
  };

  hero: {
    eyebrow: string;
    reviewedLabel: string;
    reviewedDate: string;
    lead: readonly string[];
    imageCaption: string;
    imageAlt: string;
  };

  /** Early, non-pushy CTA card. */
  earlyCta: {
    label: string;
    title: string;
    detail: string;
    button: string;
  };

  shortAnswer: {
    title: string;
    paragraphs: readonly string[];
    /** Rendered as a bordered statistic strip. */
    stats: readonly {
      value: string;
      caption: string;
      sourceIndex: number;
    }[];
    pullQuote: string;
    afterStats: string;
  };

  /** Why the national figures and an international search both miss part of the market. */
  coverage: {
    title: string;
    paragraphs: readonly string[];
    /** Explicitly attributed first-hand observation — never presented as a statistic. */
    observationLabel: string;
    observation: string;
  };

  questions: {
    title: string;
    intro: string;
    items: readonly HotelValueQuestion[];
    /** Index of the item that carries the government-guidance citation. */
    passportSourceIndex: number;
  };

  shortlist: {
    title: string;
    intro: readonly string[];
    checks: readonly HotelValueCheck[];
    outcomeTitle: string;
    outcomes: readonly string[];
    caveat: string;
  };

  zhangjiajie: {
    title: string;
    intro: string;
    options: readonly string[];
    afterOptions: readonly string[];
    imageAlt: string;
    imageCaption: string;
  };

  stayTypes: {
    title: string;
    intro: string;
    columns: { type: string; why: string; watch: string };
    rows: readonly HotelValueStayType[];
    note: string;
  };

  audience: {
    title: string;
    intro: string;
    items: readonly string[];
    closing: string;
  };

  faq: {
    title: string;
    items: readonly HotelValueFaq[];
  };

  finalCta: {
    title: string;
    intro: string;
    listLabel: string;
    items: readonly string[];
    detail: string;
    button: string;
  };

  sourcesTitle: string;
  sources: readonly HotelValueSource[];
  sourceNote: string;
  imageCreditLabel: string;
  imageCredit: string;
}

const SOURCE_URLS = {
  nbsCpi:
    "https://www.stats.gov.cn/xxgk/jd/sjjd2020/202601/t20260119_1962341.html",
  mct2024:
    "https://zwgk.mct.gov.cn/zfxxgkml/tjxx/202505/t20250530_960335.html",
  mct2025:
    "https://zwgk.mct.gov.cn/zfxxgkml/tjxx/202606/t20260602_966073.html",
  ndrcSurvey:
    "https://www.ndrc.gov.cn/wsdwhfz/202605/t20260519_1405290.html",
  foreignGuests:
    "https://english.www.gov.cn/news/202407/26/content_WS66a2d827c6d0868f4e8e975c.html",
} as const;

const en: ChinaHotelValueCopy = {
  htmlLang: "en",
  pagePath: "/guides/why-are-hotels-in-china-so-cheap/",
  homePath: "/",
  guidesPath: "/guides/",
  plannerHref:
    "/?utm_source=website&utm_medium=guide&utm_campaign=stay-shortlist&utm_content=china-hotels-cheap#planner-contact",

  metadata: {
    title: "Why Are Hotels in China So Cheap? Find a Stay That Fits",
    description:
      "Cheap hotels and guesthouses are easy to find in China. Homeground helps travellers compare location, current value, recent feedback and passport check-in.",
    headline:
      "Why Are Hotels in China So Cheap—and Which Deals Are Actually Good?",
    schemaDescription:
      "Why accommodation in China can be genuinely cheap, what a low nightly rate does not tell you, and how Homeground narrows a long list into a small shortlist that fits the route.",
    openGraphLocale: "en_US",
    inLanguage: "en",
    heroAlt:
      "A lantern-lit accommodation and dining street in Zhangjiajie filling with people at dusk.",
    about: [
      "Accommodation in China",
      "Hotel prices in China",
      "Choosing where to stay in China",
    ],
  },

  skipLink: "Skip to the guide",
  breadcrumb: {
    home: "Home",
    guides: "Travel guides",
    current: "Why hotels in China are cheap",
  },

  hero: {
    eyebrow: "Accommodation decision guide",
    reviewedLabel: "Reviewed",
    reviewedDate: "2 August 2026",
    lead: [
      "Search for accommodation in China and some prices look almost too low to be real. Often, they are real.",
      "The hard part is not finding a cheap room. It is knowing whether it is clean, in the right place for your route, ready for your passport and arrival, and still good value once the booking terms are compared. That is what Homeground narrows down.",
    ],
    imageCaption:
      "An accommodation and dining street near Wulingyuan, Zhangjiajie. Where a stay sits changes the day around it.",
    imageAlt:
      "A lantern-lit accommodation and dining street in Zhangjiajie filling with people at dusk.",
  },

  earlyCta: {
    label: "Already comparing places to stay?",
    title: "Send the basics and a planner will narrow the list",
    detail:
      "Send us your travel dates, destinations, group size and rough nightly budget. A real Homeground planner can help narrow the options by route location, current like-for-like value, recent guest feedback and written confirmation of foreign-passport check-in.",
    button: "Ask Homeground about my stay",
  },

  shortAnswer: {
    title: "The short answer: low prices can be real, but not every deal is good",
    paragraphs: [
      "International hotels, domestic chains, independent hotels, apartments and locally run guesthouses all appear in the same search. That competition produces genuinely low prices, especially away from peak dates and the strongest locations. Official evidence supports a softer market — not a nationwide collapse.",
    ],
    stats: [
      {
        value: "−1.5%",
        caption:
          "Hotel-accommodation consumer prices in 2025, reported by China’s National Bureau of Statistics.",
        sourceIndex: 0,
      },
      {
        value: "RMB 371.7 → 360.2",
        caption:
          "Average room rate in the Ministry of Culture and Tourism’s star-rated hotel sample, 2024 to 2025—a decline of about 3.1%.",
        sourceIndex: 1,
      },
      {
        value: "64.55%",
        caption:
          "Share of surveyed homestays reporting annual occupancy below 40%, in a 2026 survey published by a research body under the National Development and Reform Commission.",
        sourceIndex: 3,
      },
    ],
    afterStats:
      "Weak occupancy helps explain why individual owners may discount aggressively. It does not mean that every city, date or property is cheaper than before.",
    pullQuote:
      "There are real bargains in China, but the national statistics cannot tell you whether one particular room is a good choice.",
  },

  coverage: {
    title: "What those numbers do not cover",
    paragraphs: [
      "The figures above describe hotels: a consumer price index, and the Ministry’s sample of star-rated hotels. Small, locally run guesthouses are not in that sample. The national numbers are not a reading of that part of the market.",
      "They also describe a different market from the one you are searching. A guesthouse that has never listed on an international booking site does not show up in an international search at a higher price. It does not show up at all. Many small properties in China sell through domestic platforms, a messaging app, or a phone number.",
      "So the list an international traveller sees is a subset of what exists — and not a random one. Homeground works from the local side of that gap.",
    ],
    observationLabel: "From our own work on the ground",
    observation:
      "Competition between small properties has been hard recently, and asking prices have moved with it. That is what we see locally rather than a published statistic, so we do not put a figure on it — and we do not promise that any particular stay will be cheaper than what you found.",
  },

  questions: {
    title: "Why a low price does not answer the important questions",
    intro:
      "A nightly rate is one number. These are the four things it leaves out.",
    items: [
      {
        title: "Is it the room in the main photograph?",
        paragraphs: [
          "The first price shown may be a smaller room, a room without a window, a different bed type or a non-refundable rate — while the photographs lead with the best room in the building. That room can still be good value. It just has to be compared against the exact room and terms you will receive.",
        ],
      },
      {
        title: "Is it in the right place for the route?",
        paragraphs: [
          "In Zhangjiajie, “near Zhangjiajie” can mean the city, Tianmen Mountain, a railway station, or Wulingyuan beside the national forest park. Those are different bases, and a lower price in the wrong one turns into repeated taxis, earlier starts or an extra hotel move. Large cities have the same problem.",
          "Homeground picks the accommodation area from the route first, then compares individual buildings.",
        ],
      },
      {
        title: "What do recent guests say about the room now?",
        paragraphs: [
          "An overall rating hides what matters to a particular group. Recent comments reveal the repeats: cleanliness, smoke, noise, bathrooms, heating, stairs, luggage access.",
          "We do not guarantee the condition of a room we have not inspected. We use recent feedback to remove options that will not suit the travellers.",
        ],
      },
      {
        title: "Will the arrival work with a foreign passport?",
        paragraphs: [
          "The old claim that only licensed “foreigner hotels” may take international guests does not match current policy: in 2024, seven government departments told authorities and booking platforms not to impose improper qualification requirements.",
          "Handling still varies at small or self-check-in properties. For an unfamiliar one, we ask for written confirmation of passport type and arrival time before recommending it.",
        ],
      },
    ],
    passportSourceIndex: 4,
  },

  shortlist: {
    title: "What Homeground checks before narrowing the options",
    intro: [
      "A search engine can show hundreds of rooms. Our job is to reduce uncertainty before you commit — around four questions.",
    ],
    checks: [
      {
        number: "01",
        title: "Does the location support the itinerary?",
        detail:
          "The real arrival point, the next day’s plans, and whether the address creates extra transfers or hotel changes.",
      },
      {
        number: "02",
        title: "Is the price genuinely comparable?",
        detail:
          "Same dates, guests, room category, breakfast and cancellation terms. No historical price or different room type used to manufacture a saving.",
      },
      {
        number: "03",
        title: "What does recent evidence say?",
        detail:
          "Current guest comments and photographs on the issues that matter to your group — not the headline rating.",
      },
      {
        number: "04",
        title: "Can the property handle the arrival?",
        detail:
          "Where it matters: foreign-passport check-in, reception or host availability, arrival time, deposits and cancellation.",
      },
    ],
    outcomeTitle:
      "The result is a small number of understandable choices, each with a reason:",
    outcomes: [
      "the strongest fit for the route;",
      "the best current value;",
      "a more distinctive stay when atmosphere matters.",
    ],
    caveat:
      "Prices and inventory can change, so Homeground does not promise the lowest rate on the internet. The point is to find a price that remains reasonable after the location, room, arrival and booking terms are considered together.",
  },

  zhangjiajie: {
    title: "Why this matters particularly in Zhangjiajie",
    intro:
      "Zhangjiajie is a good example of why accommodation should not be selected separately from the route. A traveller may be comparing:",
    options: [
      "Zhangjiajie city for Tianmen Mountain, the airport or some rail connections;",
      "Wulingyuan for access to the national forest park;",
      "a scenic guesthouse that offers atmosphere but requires a specific arrival arrangement;",
      "a conventional staffed hotel that is easier for a late arrival or luggage.",
    ],
    afterOptions: [
      "There is no single correct area. The right base depends on the arrival, park days, next destination, luggage and who is travelling.",
      "This is also where a very low local rate becomes genuinely useful: in the correct base, with sound recent feedback and a confirmed arrival, a locally run guesthouse can beat a familiar international name. Fail those conditions and the saving reappears as a cost elsewhere.",
    ],
    imageAlt:
      "Visitors walking toward the Wulingyuan park gateway in Zhangjiajie on an overcast morning.",
    imageCaption:
      "The Wulingyuan gateway. Staying here or in Zhangjiajie city changes the first and last hour of every park day.",
  },

  stayTypes: {
    title: "Hotel, apartment or minsu?",
    intro:
      "The English word “hotel” can hide several different products in a China search.",
    columns: {
      type: "Type",
      why: "Why travellers consider it",
      watch: "What Homeground pays attention to",
    },
    rows: [
      {
        type: "Staffed hotel",
        why: "Predictable reception, luggage and late arrival",
        watch: "Correct branch, route location and current room condition",
      },
      {
        type: "Independent hotel",
        why: "Often strong local value",
        watch: "Recent cleanliness feedback, noise, smoke and passport handling",
      },
      {
        type: "Serviced apartment",
        why: "Space, washing machine or kitchen",
        watch: "Reception point, deposits, check-in method and registration",
      },
      {
        type: "Minsu or guesthouse",
        why: "Character and local setting",
        watch: "Host availability, road access, stairs, breakfast and arrival",
      },
    ],
    note:
      "A minsu can operate like a small boutique hotel or depend on an owner meeting each guest. The name alone does not show which experience the traveller will receive.",
  },

  audience: {
    title: "Who benefits most from accommodation help?",
    intro: "Homeground’s shortlist is particularly useful when:",
    items: [
      "several Chinese cities must connect smoothly;",
      "the right neighbourhood or scenic-area base is unclear;",
      "you are comparing a local guesthouse with a conventional hotel;",
      "a flight or train arrives late, or the group has older parents, children or heavy luggage;",
      "the price is so low it is hard to explain;",
      "you want local character without creating a route problem.",
    ],
    closing:
      "The aim is not to move you into a more expensive room — it is to tell where a cheap stay genuinely works.",
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "Are very cheap rooms in China real?",
        answer:
          "Many are. Large supply, local competition and weaker dates all produce low prices. Whether one is a good deal still depends on its exact category, location and terms.",
      },
      {
        question: "Why is one guesthouse so much cheaper than a hotel?",
        answer:
          "Location, staffing, facilities, room category, cancellation rules and demand on those dates can all differ. The cheaper one may be excellent — but the two prices are not the same product until you check.",
      },
      {
        question: "Do hotels in China accept foreign passports?",
        answer:
          "Current policy prohibits improper restrictions and notices refusing foreign guests. Check-in can still vary at small or self-check-in properties, so we seek written confirmation from an unfamiliar property when it matters.",
      },
      {
        question: "Are Chinese booking platforms always cheaper?",
        answer:
          "No. Promotions, inventory, payment methods and cancellation terms differ by platform. We compare the final usable product rather than assuming one platform always wins.",
      },
      {
        question: "Is a homestay better than a hotel?",
        answer:
          "Neither is automatically better. A good homestay offers character and space; a staffed hotel is more reliable for a late arrival, luggage or a short transfer night. The route and the travellers decide.",
      },
    ],
  },

  finalCta: {
    title: "Ask Homeground to narrow your stay",
    intro:
      "You do not need to send us a finished itinerary or a spreadsheet of hotels.",
    listLabel: "Start with:",
    items: [
      "your travel dates;",
      "the destinations you are considering;",
      "the number of travellers;",
      "your rough nightly room budget.",
    ],
    detail:
      "That is enough for a planner to start comparing route location, like-for-like value, recent guest feedback, booking terms and foreign-passport arrival.",
    button: "Ask Homeground about my stay",
  },

  sourcesTitle: "Sources",
  sources: [
    {
      label: "National Bureau of Statistics — 2025 consumer price commentary",
      url: SOURCE_URLS.nbsCpi,
    },
    {
      label: "Ministry of Culture and Tourism — 2024 star-rated hotel statistics",
      url: SOURCE_URLS.mct2024,
    },
    {
      label: "Ministry of Culture and Tourism — 2025 star-rated hotel statistics",
      url: SOURCE_URLS.mct2025,
    },
    {
      label: "NDRC-affiliated research body — 2026 homestay survey",
      url: SOURCE_URLS.ndrcSurvey,
    },
    {
      label:
        "The State Council — 2024 guidance on accommodation for foreign travellers",
      url: SOURCE_URLS.foreignGuests,
    },
  ],
  sourceNote:
    "Figures describe national or sample-level trends on the dates published. They are not a forecast for any single property, city or stay date.",
  imageCreditLabel: "Photographs",
  imageCredit:
    "Homeground field photography, Zhangjiajie. Properties shown are street and neighbourhood context only and are not inspected or recommended listings.",
};

const zh: ChinaHotelValueCopy = {
  htmlLang: "zh-CN",
  pagePath: "/zh/guides/why-are-hotels-in-china-so-cheap/",
  homePath: "/zh/",
  guidesPath: "/zh/guides/",
  plannerHref:
    "/zh/?utm_source=website&utm_medium=guide&utm_campaign=stay-shortlist&utm_content=china-hotels-cheap#planner-contact",

  metadata: {
    title: "中国的酒店为什么这么便宜？怎么挑到真正合适的住处",
    description:
      "在中国找到便宜的酒店和民宿并不难，难的是判断位置、近期房况、外国护照入住和真正可比的价格。Homeground 帮你把长名单收成几个能用的选择。",
    headline: "中国的酒店为什么这么便宜？哪些便宜是真的划算",
    schemaDescription:
      "中国住宿为什么可能真的便宜、一个低房价没有回答的问题，以及 Homeground 如何把一长串房源收成适合这趟路线的少数选择。",
    openGraphLocale: "zh_CN",
    inLanguage: "zh-CN",
    heroAlt: "傍晚亮灯的张家界住宿餐饮街区，行人渐多。",
    about: ["中国住宿", "中国酒店价格", "在中国怎么选住处"],
  },

  skipLink: "跳到正文",
  breadcrumb: {
    home: "首页",
    guides: "旅行指南",
    current: "中国酒店为什么便宜",
  },

  hero: {
    eyebrow: "住宿决策指南",
    reviewedLabel: "核校日期",
    reviewedDate: "2026 年 8 月 2 日",
    lead: [
      "在中国搜住宿，有些价格低到让人怀疑是不是真的。多数时候，它确实是真的。",
      "难的不是找到便宜的房间，而是判断它够不够干净、位置对不对路线、能不能接待外国护照和你的到店时间，以及条款比完之后是否仍然划算。这正是 Homeground 帮你收窄的部分。",
    ],
    imageCaption:
      "张家界武陵源附近的住宿餐饮街区。住在哪一片，会改变这一天的其余安排。",
    imageAlt: "傍晚亮灯的张家界住宿餐饮街区，行人渐多。",
  },

  earlyCta: {
    label: "已经在比住处了？",
    title: "把几项基本信息发来，规划师帮你收窄名单",
    detail:
      "告诉我们出行日期、想去的目的地、同行人数和大致的每晚预算。Homeground 的真人规划师会按路线位置、同口径的当前价格、近期住客反馈，以及外国护照入住的书面确认，帮你把选择收窄。",
    button: "找 Homeground 看看住哪儿",
  },

  shortAnswer: {
    title: "简短回答：低价可能是真的，但不等于每个便宜都值得住",
    paragraphs: [
      "国际品牌、国内连锁、单体酒店、公寓和当地人经营的民宿，会出现在同一次搜索结果里。这种竞争确实会压出真正的低价，尤其在非高峰日期和不那么核心的位置。官方数据支持“市场偏软”，但不支持“全国普遍暴跌”。",
    ],
    stats: [
      {
        value: "−1.5%",
        caption: "国家统计局公布的 2025 年宾馆住宿类居民消费价格变动。",
        sourceIndex: 0,
      },
      {
        value: "371.7 → 360.2 元",
        caption:
          "文化和旅游部星级饭店样本的平均房价，2024 年至 2025 年，降幅约 3.1%。",
        sourceIndex: 1,
      },
      {
        value: "64.55%",
        caption:
          "国家发展改革委下属研究机构 2026 年一项调查中，年出租率低于 40% 的受访民宿占比。",
        sourceIndex: 3,
      },
    ],
    afterStats:
      "出租率偏低，可以解释为什么部分业主愿意大幅降价。但这并不意味着每一个城市、每一个日期、每一家房源都比过去便宜。",
    pullQuote:
      "中国确实有真正划算的住宿，但全国层面的统计数字回答不了“这一间房到底值不值得订”。",
  },

  coverage: {
    title: "这些数字没有覆盖的部分",
    paragraphs: [
      "上面的数字讲的是酒店：居民消费价格，和文旅部的星级饭店样本。当地人经营的小型民宿不在那个样本里，所以这些全国数字并不是对那一部分市场的读数。",
      "它们讲的也是另一个市场。一家从未在国际预订网站上架过的民宿，不会以更高的价格出现在你的搜索结果里——它根本不会出现。中国大量小房源只在国内平台、聊天软件或一个电话号码上做生意。",
      "所以外国旅客看到的那份列表，是这个市场的一个子集，而且不是随机的子集。Homeground 站在这道缝的本地那一侧。",
    ],
    observationLabel: "来自我们自己的一线观察",
    observation:
      "近来小房源之间的竞争很激烈，报价也随之松动。这是我们在当地看到的情况，不是已发布的统计，所以我们不给它安一个数字——也不承诺任何一间房一定比你已经找到的更便宜。",
  },

  questions: {
    title: "一个低价没有回答的四件事",
    intro: "房价只是一个数字。下面这四件事，它没有说。",
    items: [
      {
        title: "你看到的价格，是主图那间房吗？",
        paragraphs: [
          "首屏那个价格，可能对应更小的房间、没有窗户的房间、不同床型或不可退款的预订方式，而照片用的是楼里最好的一间。这间房仍然可能很划算，只是价格必须和你实际住到的房型与条款放在一起比。",
        ],
      },
      {
        title: "它的位置，对这条路线合适吗？",
        paragraphs: [
          "在张家界，“张家界附近”可能指市区、天门山、某个火车站，也可能指靠近国家森林公园的武陵源。这些是不同的落脚点，选错片区省下的房费会变成来回打车、更早出发或中途多换一次酒店。大城市同理。",
          "所以 Homeground 的顺序是：先按路线定住宿片区，再比具体的楼。",
        ],
      },
      {
        title: "近期住客怎么说房间的当前状况？",
        paragraphs: [
          "总评分会掩盖掉对某一组客人真正重要的信息。近期评价能看出反复出现的问题：清洁、烟味、噪音、卫生间、供暖、楼梯和搬行李是否方便。",
          "对没有实地看过的房间，我们不承诺它的物理状况；我们用近期反馈把不适合这组客人的选项去掉。",
        ],
      },
      {
        title: "持外国护照，入住办得下来吗？",
        paragraphs: [
          "“只有特许的涉外酒店才能接待外国客人”不符合现行政策：2024 年七部门要求各地和预订平台，不得对接待外国旅客的住宿经营者设置不当的资质要求。",
          "但在小型或自助入住的房源，实际操作仍可能不同。对不熟悉的房源，我们会在推荐前请对方就护照类型和到店时间给出书面确认。",
        ],
      },
    ],
    passportSourceIndex: 4,
  },

  shortlist: {
    title: "Homeground 在收窄名单前会核什么",
    intro: [
      "搜索引擎能列出几百间房。我们的作用是在你下单之前减少不确定性——围绕四个问题。",
    ],
    checks: [
      {
        number: "01",
        title: "这个位置撑得住这份行程吗？",
        detail:
          "真实的到达点、第二天的安排，以及这个地址会不会带来多余的接驳或换酒店。",
      },
      {
        number: "02",
        title: "现在这个价格，真的可比吗？",
        detail:
          "同样的入住日期、人数、房型、早餐和取消条款。不拿历史价格或另一个房型制造“省了多少”。",
      },
      {
        number: "03",
        title: "近期证据说明了什么？",
        detail:
          "当前的住客评论和照片，只看这组客人真正在意的问题，不看总评分。",
      },
      {
        number: "04",
        title: "这家房源接得住你的到店吗？",
        detail:
          "必要时确认：外国护照入住、前台或业主是否在、到店时间、押金和取消条件。",
      },
    ],
    outcomeTitle: "最后交到你手上的，是少数几个能讲清楚理由的选择：",
    outcomes: [
      "最贴合这条路线的一个；",
      "当前性价比最好的一个；",
      "在意氛围时，更有特点的一个。",
    ],
    caveat:
      "价格和房量会变，所以 Homeground 不承诺全网最低价。我们要找的，是把位置、房型、到店和预订条款一起考虑之后，仍然合理的价格。",
  },

  zhangjiajie: {
    title: "为什么在张家界，这件事尤其明显",
    intro:
      "张家界很能说明“住宿不该脱离路线单独选”。一位旅客可能正在比较：",
    options: [
      "张家界市区——方便天门山、机场和部分铁路班次；",
      "武陵源——方便进国家森林公园；",
      "景区里的民宿——氛围好，但到店方式需要专门安排；",
      "常规的有人值守酒店——夜里到、行李多时更省事。",
    ],
    afterOptions: [
      "没有一个片区适合所有人。落脚点取决于怎么到、玩几天、下一站去哪、行李多少和同行是谁。",
      "这也正是极低的本地房价真正有用的地方：片区对、近期反馈没问题、到店也确认过，当地人经营的民宿完全可能比熟悉的国际品牌更划算。这几条不成立，省下的钱多半会在行程别处还回去。",
    ],
    imageAlt: "阴天上午，游客走向张家界武陵源景区入口。",
    imageCaption:
      "武陵源入口。住在这里还是住在张家界市区，会改变每个进山日的头一个小时和最后一个小时。",
  },

  stayTypes: {
    title: "酒店、公寓，还是民宿？",
    intro: "在中文和英文的搜索结果里，“酒店”这个词其实盖住了好几种不同的产品。",
    columns: {
      type: "类型",
      why: "客人为什么会考虑它",
      watch: "Homeground 会特别看什么",
    },
    rows: [
      {
        type: "有人值守的酒店",
        why: "前台、行李和夜里到店比较有保障",
        watch: "别订错门店、位置是否对路线、房间当前状况",
      },
      {
        type: "单体酒店",
        why: "本地性价比常常很强",
        watch: "近期清洁反馈、噪音、烟味、外国护照登记",
      },
      {
        type: "服务式公寓",
        why: "空间大，可能有洗衣机或厨房",
        watch: "取钥匙的地点、押金、入住方式、住宿登记",
      },
      {
        type: "民宿",
        why: "有特色，能感受当地环境",
        watch: "业主是否在、车能否开到、有无楼梯、早餐、到店安排",
      },
    ],
    note:
      "民宿可能像一家小型精品酒店那样运作，也可能完全依赖业主本人来接每一位客人。光看名字，看不出客人会遇到哪一种。",
  },

  audience: {
    title: "什么情况下最需要有人帮着挑住宿？",
    intro: "在下面这些情况里，Homeground 的短名单特别有用：",
    items: [
      "要把中国的好几个城市顺畅地串起来；",
      "不确定该住哪个街区或哪个景区落脚点；",
      "在当地民宿和常规酒店之间拿不定主意；",
      "航班或火车到得很晚，或同行有年长父母、小孩、大件行李；",
      "价格低到让人不放心；",
      "想要一点当地特色，又不想把路线弄乱。",
    ],
    closing:
      "目的不是把你换到更贵的房间，而是分清楚哪些便宜是真的划算。",
  },

  faq: {
    title: "常见问题",
    items: [
      {
        question: "中国那些特别便宜的房间是真的吗？",
        answer:
          "很多是真的。供给量大、本地竞争、非旺季日期都会压出低价。但值不值得订，仍取决于具体房型、位置和条款。",
      },
      {
        question: "为什么这家民宿比那家酒店便宜这么多？",
        answer:
          "位置、人手、设施、房型、取消规则和当天需求都可能不同。便宜那家完全可能很好，但在核对之前，两个价格不是同一件商品。",
      },
      {
        question: "中国的酒店接待外国护照吗？",
        answer:
          "现行政策禁止不当限制，也禁止张贴拒接外宾的告示。但小型或自助入住的房源体验仍可能不同，遇到不熟悉且这件事重要时，我们会去要一份书面确认。",
      },
      {
        question: "中国的预订平台一定更便宜吗？",
        answer:
          "不一定。各平台的促销、可售房量、支付方式和取消条款都不一样。我们比的是最终能用的那个产品。",
      },
      {
        question: "民宿一定比酒店好吗？",
        answer:
          "都不天然更好。好的民宿有特色、空间大；有人值守的酒店在夜里到店、寄存行李或过渡一晚时更可靠。该由路线和同行的人来决定。",
      },
    ],
  },

  finalCta: {
    title: "让 Homeground 帮你把住宿收窄",
    intro: "你不需要先做好完整行程，也不用整理一张酒店比价表。",
    listLabel: "先给这四项就行：",
    items: [
      "出行日期；",
      "在考虑的目的地；",
      "同行人数；",
      "大致的每晚房费预算。",
    ],
    detail:
      "有这些就够规划师开始比对：路线位置、同口径的当前价格、近期住客反馈、预订条款，以及外国护照到店的可行性。",
    button: "找 Homeground 看看住哪儿",
  },

  sourcesTitle: "资料来源",
  sources: [
    { label: "国家统计局 · 2025 年居民消费价格解读", url: SOURCE_URLS.nbsCpi },
    { label: "文化和旅游部 · 2024 年星级饭店统计", url: SOURCE_URLS.mct2024 },
    { label: "文化和旅游部 · 2025 年星级饭店统计", url: SOURCE_URLS.mct2025 },
    { label: "国家发展改革委下属研究机构 · 2026 年民宿调查", url: SOURCE_URLS.ndrcSurvey },
    {
      label: "中国政府网 · 2024 年关于接待外国旅客住宿的指导",
      url: SOURCE_URLS.foreignGuests,
    },
  ],
  sourceNote:
    "以上数字描述的是发布当时的全国或样本层面趋势，不构成对任何单一房源、城市或入住日期的预测。",
  imageCreditLabel: "图片",
  imageCredit:
    "Homeground 实地拍摄于张家界。画面仅用于街区与环境示意，不是已核验或正在推荐的房源。",
};

const ko: ChinaHotelValueCopy = {
  htmlLang: "ko",
  pagePath: "/ko/guides/why-are-hotels-in-china-so-cheap/",
  homePath: "/ko/",
  guidesPath: "/ko/guides/",
  plannerHref:
    "/ko/?utm_source=website&utm_medium=guide&utm_campaign=stay-shortlist&utm_content=china-hotels-cheap#planner-contact",

  metadata: {
    title: "중국 호텔은 왜 이렇게 쌀까? 나에게 맞는 숙소 고르기",
    description:
      "중국에서 싼 호텔과 민박을 찾기는 쉽습니다. 어려운 건 위치, 최근 후기, 외국 여권 체크인, 그리고 진짜 비교 가능한 가격입니다. Homeground가 후보를 좁혀 드립니다.",
    headline: "중국 호텔은 왜 이렇게 쌀까—그리고 어떤 저가가 진짜 좋은 선택일까",
    schemaDescription:
      "중국 숙소 가격이 실제로 낮을 수 있는 이유, 낮은 1박 요금이 말해 주지 않는 것들, 그리고 Homeground가 긴 목록을 여행 동선에 맞는 소수의 선택지로 좁히는 방법.",
    openGraphLocale: "ko_KR",
    inLanguage: "ko",
    heroAlt: "해질 무렵 불이 켜진 장자제의 숙소·식당 거리에 사람들이 모여 있다.",
    about: ["중국 숙소", "중국 호텔 가격", "중국에서 숙소 고르기"],
  },

  skipLink: "본문으로 건너뛰기",
  breadcrumb: {
    home: "홈",
    guides: "실용 가이드",
    current: "중국 호텔이 싼 이유",
  },

  hero: {
    eyebrow: "숙소 결정 가이드",
    reviewedLabel: "검토일",
    reviewedDate: "2026년 8월 2일",
    lead: [
      "중국 숙소를 검색하면 “이게 진짜 가격인가” 싶은 요금이 보일 때가 있습니다. 대체로 진짜입니다.",
      "어려운 건 저렴한 방을 찾는 게 아닙니다. 충분히 청결한지, 이번 동선에 맞는 위치인지, 외국 여권과 도착 시간을 감당할 수 있는지, 예약 조건까지 비교한 뒤에도 괜찮은 값인지를 판단하는 일입니다. Homeground가 좁혀 드리는 부분이 바로 이것입니다.",
    ],
    imageCaption:
      "장자제 우링위안 인근의 숙소·식당 거리. 어느 구역에 묵느냐가 그날의 나머지 일정을 바꿉니다.",
    imageAlt: "해질 무렵 불이 켜진 장자제의 숙소·식당 거리에 사람들이 모여 있다.",
  },

  earlyCta: {
    label: "이미 숙소를 비교하고 계신가요?",
    title: "기본 정보만 보내주시면 플래너가 후보를 좁혀 드립니다",
    detail:
      "여행 날짜, 가려는 도시, 인원, 그리고 대략적인 1박 예산을 보내주세요. Homeground의 실제 플래너가 동선상의 위치, 같은 조건으로 비교한 현재 가격, 최근 투숙객 후기, 외국 여권 체크인 서면 확인을 기준으로 선택지를 좁혀 드립니다.",
    button: "숙소 문의하기",
  },

  shortAnswer: {
    title: "짧은 답: 낮은 가격은 진짜일 수 있지만, 모든 저가가 좋은 선택은 아닙니다",
    paragraphs: [
      "국제 브랜드, 국내 체인, 개별 호텔, 아파트먼트, 현지인이 운영하는 민박이 한 번의 검색 결과에 함께 나옵니다. 이 경쟁이 실제로 낮은 가격을 만듭니다. 성수기가 아니거나 최고 입지가 아닐 때 특히 그렇습니다. 공식 통계도 “시장이 약해졌다”는 정도를 말하지, 전국적인 폭락을 말하지는 않습니다.",
    ],
    stats: [
      {
        value: "−1.5%",
        caption: "중국 국가통계국이 발표한 2025년 호텔 숙박 소비자물가 변동.",
        sourceIndex: 0,
      },
      {
        value: "371.7 → 360.2 위안",
        caption:
          "문화여유부 별등급 호텔 표본의 평균 객실 요금, 2024년에서 2025년으로 약 3.1% 하락.",
        sourceIndex: 1,
      },
      {
        value: "64.55%",
        caption:
          "국가발전개혁위원회 산하 연구기관의 2026년 조사에서 연간 객실 가동률이 40% 미만이라고 답한 민박 비율.",
        sourceIndex: 3,
      },
    ],
    afterStats:
      "가동률이 낮으면 일부 업주가 큰 폭으로 할인하는 이유는 설명됩니다. 다만 모든 도시, 모든 날짜, 모든 숙소가 예전보다 싸졌다는 뜻은 아닙니다.",
    pullQuote:
      "중국에는 실제로 저렴하고 좋은 숙소가 있습니다. 다만 전국 통계는 “이 방 하나가 좋은 선택인지”를 말해 주지 못합니다.",
  },

  coverage: {
    title: "그 숫자들이 담지 못하는 부분",
    paragraphs: [
      "위 수치가 말하는 것은 호텔입니다. 소비자물가지수, 그리고 문화여유부의 별등급 호텔 표본입니다. 현지인이 운영하는 소규모 민박은 그 표본에 들어 있지 않습니다. 전국 통계는 그 영역을 읽은 값이 아닙니다.",
      "그 숫자들이 말하는 시장도 지금 검색하고 있는 시장과 다릅니다. 국제 예약 사이트에 올라간 적이 없는 민박은, 국제 검색 결과에 더 비싼 가격으로 나오는 게 아닙니다. 아예 나오지 않습니다. 중국의 많은 소규모 숙소는 국내 플랫폼, 메신저, 또는 전화번호 하나로 영업합니다.",
      "그래서 해외 여행자가 보는 목록은 실제로 존재하는 것의 일부이고, 무작위로 뽑힌 일부도 아닙니다. Homeground는 그 간극의 현지 쪽에서 일합니다.",
    ],
    observationLabel: "현장에서 저희가 보는 것",
    observation:
      "최근 소규모 숙소들 사이의 경쟁이 치열해지면서 제시 가격도 함께 움직였습니다. 이는 발표된 통계가 아니라 현지에서 저희가 관찰한 내용이므로 수치로 제시하지 않으며, 특정 숙소가 이미 찾으신 가격보다 저렴하다고 약속하지도 않습니다.",
  },

  questions: {
    title: "낮은 가격이 답해 주지 않는 네 가지",
    intro: "1박 요금은 숫자 하나일 뿐입니다. 그 숫자가 빠뜨리는 것들입니다.",
    items: [
      {
        title: "대표 사진 속 그 방이 맞나요?",
        paragraphs: [
          "처음 보이는 가격은 더 작은 방, 창문 없는 방, 다른 침대 타입, 또는 환불 불가 조건일 수 있습니다. 사진은 건물에서 가장 좋은 방을 씁니다. 그래도 좋은 숙소일 수 있지만, 그 가격은 실제로 묵게 될 객실과 조건에 맞춰 비교해야 합니다.",
        ],
      },
      {
        title: "이번 동선에 맞는 위치인가요?",
        paragraphs: [
          "장자제에서 “장자제 근처”는 시내일 수도, 톈먼산일 수도, 기차역일 수도, 국가삼림공원과 가까운 우링위안일 수도 있습니다. 서로 다른 거점이고, 잘못된 구역에서 아낀 요금은 반복되는 택시비, 더 이른 출발, 불필요한 숙소 이동으로 되돌아옵니다. 대도시도 마찬가지입니다.",
          "그래서 Homeground는 동선에 따라 숙박 구역을 먼저 정하고, 그다음에 개별 숙소를 비교합니다.",
        ],
      },
      {
        title: "최근 투숙객은 객실 상태를 어떻게 말하나요?",
        paragraphs: [
          "종합 평점은 특정 일행에게 중요한 부분을 가립니다. 최근 후기에서는 반복되는 지점이 드러납니다. 청결, 담배 냄새, 소음, 욕실, 난방, 계단과 짐 이동입니다.",
          "직접 확인하지 않은 객실의 상태를 보장하지는 않습니다. 최근 후기를 근거로, 이 일행에게 맞지 않는 선택지를 걸러 냅니다.",
        ],
      },
      {
        title: "외국 여권으로 체크인이 되나요?",
        paragraphs: [
          "“허가받은 외국인 전용 호텔만 외국인을 받는다”는 오래된 이야기는 현행 정책과 맞지 않습니다. 2024년 7개 부처가 지방 당국과 예약 플랫폼에 부당한 자격 요건을 부과하지 말라고 지시했습니다.",
          "다만 소규모·셀프 체크인 숙소에서는 처리 방식이 다를 수 있습니다. 익숙하지 않은 숙소라면 추천 전에 여권 종류와 도착 시간에 대한 서면 확인을 요청합니다.",
        ],
      },
    ],
    passportSourceIndex: 4,
  },

  shortlist: {
    title: "Homeground가 후보를 좁히기 전에 확인하는 것",
    intro: [
      "검색 엔진은 수백 개의 객실을 보여 줍니다. 저희 역할은 결제 전에 불확실성을 줄이는 것이고, 기준은 네 가지 질문입니다.",
    ],
    checks: [
      {
        number: "01",
        title: "이 위치가 일정을 받쳐 주나요?",
        detail:
          "실제 도착 지점, 다음 날 일정, 그리고 이 주소가 불필요한 이동이나 숙소 변경을 만들지 않는지.",
      },
      {
        number: "02",
        title: "지금 이 가격이 정말 비교 가능한가요?",
        detail:
          "같은 날짜·인원·객실 등급·조식·취소 조건으로 비교합니다. 과거 가격이나 다른 객실 타입으로 “절약”을 만들지 않습니다.",
      },
      {
        number: "03",
        title: "최근 근거는 무엇을 말하나요?",
        detail:
          "대표 평점이 아니라, 이 일행에게 실제로 중요한 항목을 기준으로 현재 후기와 사진을 봅니다.",
      },
      {
        number: "04",
        title: "이 숙소가 도착을 감당할 수 있나요?",
        detail:
          "필요하면 확인합니다. 외국 여권 체크인, 프런트·호스트 상주 여부, 도착 시간, 보증금과 취소 조건.",
      },
    ],
    outcomeTitle: "결과는 이유를 설명할 수 있는 소수의 선택지입니다:",
    outcomes: [
      "동선에 가장 잘 맞는 곳;",
      "현재 기준으로 가성비가 가장 좋은 곳;",
      "분위기가 중요할 때 더 개성 있는 곳.",
    ],
    caveat:
      "가격과 객실 상황은 바뀌므로, Homeground는 인터넷 최저가를 약속하지 않습니다. 위치, 객실, 도착, 예약 조건을 함께 놓고 봐도 여전히 합리적인 가격을 찾는 것이 목표입니다.",
  },

  zhangjiajie: {
    title: "장자제에서 특히 두드러지는 이유",
    intro:
      "장자제는 숙소를 동선과 따로 고르면 안 되는 이유를 잘 보여 줍니다. 이런 선택지들을 놓고 비교하게 됩니다:",
    options: [
      "장자제 시내 — 톈먼산, 공항, 일부 기차 연결에 유리;",
      "우링위안 — 국가삼림공원 접근에 유리;",
      "경치 좋은 민박 — 분위기는 좋지만 도착 방식을 따로 정해야 함;",
      "일반적인 상주 프런트 호텔 — 늦은 도착이나 짐이 많을 때 수월함.",
    ],
    afterOptions: [
      "모든 여행에 맞는 정답 구역은 없습니다. 어떻게 도착하는지, 며칠을 보내는지, 다음 목적지가 어디인지, 짐과 일행이 어떤지에 따라 달라집니다.",
      "아주 낮은 현지 요금이 정말 유용해지는 지점도 여기입니다. 거점이 맞고, 최근 후기에 문제가 없고, 도착도 확인됐다면 현지인이 운영하는 민박이 익숙한 국제 브랜드보다 나을 수 있습니다. 조건이 어긋나면 아낀 금액은 여행의 다른 곳에서 사라집니다.",
    ],
    imageAlt: "흐린 아침, 장자제 우링위안 공원 입구로 걸어가는 방문객들.",
    imageCaption:
      "우링위안 입구. 여기에 묵는지 장자제 시내에 묵는지에 따라 공원 가는 날의 첫 시간과 마지막 시간이 달라집니다.",
  },

  stayTypes: {
    title: "호텔, 아파트먼트, 아니면 민쑤?",
    intro:
      "검색 결과에서 “호텔”이라는 한 단어가 서로 다른 여러 상품을 가리고 있을 수 있습니다.",
    columns: {
      type: "유형",
      why: "여행자가 고려하는 이유",
      watch: "Homeground가 특히 보는 것",
    },
    rows: [
      {
        type: "상주 프런트 호텔",
        why: "프런트, 짐, 늦은 도착이 예측 가능",
        watch: "지점 혼동, 동선상의 위치, 현재 객실 상태",
      },
      {
        type: "개별 호텔",
        why: "현지 기준 가성비가 좋은 경우가 많음",
        watch: "최근 청결 후기, 소음, 담배 냄새, 여권 처리",
      },
      {
        type: "서비스드 아파트먼트",
        why: "공간, 세탁기 또는 주방",
        watch: "키 수령 장소, 보증금, 체크인 방식, 숙박 등록",
      },
      {
        type: "민쑤(民宿)·게스트하우스",
        why: "개성과 현지 분위기",
        watch: "호스트 상주 여부, 차량 접근, 계단, 조식, 도착 방식",
      },
    ],
    note:
      "민쑤는 작은 부티크 호텔처럼 운영될 수도 있고, 주인이 손님마다 직접 맞이해야 하는 곳일 수도 있습니다. 이름만으로는 어느 쪽인지 알 수 없습니다.",
  },

  audience: {
    title: "숙소 도움이 특히 필요한 경우",
    intro: "다음과 같은 상황에서 Homeground의 후보 목록이 특히 유용합니다:",
    items: [
      "중국의 여러 도시를 매끄럽게 이어야 할 때;",
      "어느 동네나 어느 관광지 거점에 묵어야 할지 불확실할 때;",
      "현지 민박과 일반 호텔을 두고 고민할 때;",
      "항공편·기차가 늦게 도착하거나, 연로한 부모님·아이·큰 짐이 함께일 때;",
      "가격이 너무 낮아 설명이 안 될 때;",
      "현지다운 분위기는 원하지만 동선을 망치고 싶지는 않을 때.",
    ],
    closing:
      "목표는 더 비싼 방으로 옮기는 게 아니라, 어떤 저가가 실제로 통하는지를 구분하는 것입니다.",
  },

  faq: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "중국의 아주 저렴한 객실은 진짜인가요?",
        answer:
          "상당수는 진짜입니다. 큰 공급량, 현지 경쟁, 비수기 날짜가 모두 낮은 가격을 만듭니다. 좋은 선택인지는 객실 등급, 위치, 조건에 따라 달라집니다.",
      },
      {
        question: "어떤 민박은 호텔보다 훨씬 저렴한 이유가 뭔가요?",
        answer:
          "위치, 인력, 시설, 객실 등급, 취소 규정, 해당 날짜의 수요가 다릅니다. 저렴한 쪽이 훌륭할 수도 있지만, 확인 전에는 같은 상품이 아닙니다.",
      },
      {
        question: "중국 호텔은 외국 여권을 받나요?",
        answer:
          "현행 정책은 부당한 제한과 외국인 투숙 거부 안내를 금지합니다. 다만 소규모·셀프 체크인 숙소는 실제 경험이 다를 수 있어, 중요한 경우 서면 확인을 요청합니다.",
      },
      {
        question: "중국 예약 플랫폼이 항상 더 저렴한가요?",
        answer:
          "아닙니다. 플랫폼마다 프로모션, 잔여 객실, 결제 수단, 취소 조건이 다릅니다. 저희는 최종적으로 쓸 수 있는 상품을 비교합니다.",
      },
      {
        question: "민박이 호텔보다 나은가요?",
        answer:
          "어느 쪽도 자동으로 낫지는 않습니다. 좋은 민박은 개성과 공간을, 상주 프런트 호텔은 늦은 도착·짐 보관·경유 숙박의 안정성을 줍니다. 동선과 일행이 결정할 문제입니다.",
      },
    ],
  },

  finalCta: {
    title: "숙소 좁히기, Homeground에 맡기세요",
    intro: "완성된 일정표나 호텔 비교 스프레드시트를 보내실 필요는 없습니다.",
    listLabel: "이 네 가지면 시작할 수 있습니다:",
    items: [
      "여행 날짜;",
      "고려 중인 목적지;",
      "여행 인원;",
      "대략적인 1박 예산.",
    ],
    detail:
      "이 정도면 플래너가 비교를 시작할 수 있습니다. 동선상의 위치, 같은 조건의 현재 가격, 최근 투숙객 후기, 예약 조건, 외국 여권 도착 처리까지.",
    button: "숙소 문의하기",
  },

  sourcesTitle: "출처",
  sources: [
    { label: "국가통계국 · 2025년 소비자물가 해설", url: SOURCE_URLS.nbsCpi },
    { label: "문화여유부 · 2024년 별등급 호텔 통계", url: SOURCE_URLS.mct2024 },
    { label: "문화여유부 · 2025년 별등급 호텔 통계", url: SOURCE_URLS.mct2025 },
    {
      label: "국가발전개혁위원회 산하 연구기관 · 2026년 민박 조사",
      url: SOURCE_URLS.ndrcSurvey,
    },
    {
      label: "중국 정부망 · 2024년 외국인 투숙 관련 지침",
      url: SOURCE_URLS.foreignGuests,
    },
  ],
  sourceNote:
    "위 수치는 발표 시점의 전국 또는 표본 수준 추세를 설명합니다. 특정 숙소·도시·숙박 날짜에 대한 예측이 아닙니다.",
  imageCreditLabel: "사진",
  imageCredit:
    "장자제에서 Homeground가 직접 촬영. 거리와 주변 환경을 보여 주기 위한 사진이며, 확인을 마쳤거나 추천 중인 숙소가 아닙니다.",
};

const copy: Record<HomegroundLocale, ChinaHotelValueCopy> = { en, zh, ko };

export function getChinaHotelValueCopy(
  locale: HomegroundLocale,
): ChinaHotelValueCopy {
  return copy[locale] ?? copy.en;
}

/** Image assets are shared across locales; only alt text is localized. */
export const CHINA_HOTEL_VALUE_IMAGES = {
  hero: {
    basePath: "/images/guides/china-hotel-value/stay-street-evening",
    width: 1200,
    height: 750,
  },
  gateway: {
    basePath: "/images/guides/china-hotel-value/wulingyuan-gateway",
    width: 1200,
    height: 750,
  },
} as const;
