import type { HomegroundLocale } from "./homegroundI18n";

interface TransportComparisonRow {
  leg: string;
  mode: string;
  publishedTime: string;
  planningTime: string;
  dayCost: string;
  recommendation: string;
}

interface TransportLeg {
  id: "beijing-to-zhangjiajie" | "zhangjiajie-to-shanghai";
  number: string;
  eyebrow: string;
  title: string;
  verdict: string;
  body: string;
  chooseFlightTitle: string;
  chooseFlight: readonly string[];
  chooseTrainTitle: string;
  chooseTrain: readonly string[];
  watchTitle: string;
  watch: readonly string[];
}

export interface TransportGuideCopy {
  htmlLang: string;
  homePath: string;
  skipLink: string;
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  hero: {
    eyebrow: string;
    headlineTail: string;
    lead: string;
    preparedBy: string;
    publishedLabel: string;
    publishedDate: string;
    checkedLabel: string;
    checkedDate: string;
    dynamicNote: string;
  };
  quick: {
    sectionLabel: string;
    title: string;
    intro: string;
    cards: readonly {
      route: string;
      verdict: string;
      planningCost: string;
      detail: string;
      href: string;
    }[];
    boundary: string;
  };
  timeMath: {
    sectionLabel: string;
    title: string;
    intro: string;
    formulaLabel: string;
    scrollHint: string;
    steps: readonly {
      label: string;
      detail: string;
    }[];
    note: string;
  };
  visuals: {
    ariaLabel: string;
    midpoint: {
      alt: string;
      title: string;
      caption: string;
    };
    rail: {
      alt: string;
      title: string;
      caption: string;
    };
    airport: {
      alt: string;
      title: string;
      caption: string;
    };
  };
  comparison: {
    sectionLabel: string;
    title: string;
    intro: string;
    tableLabel: string;
    tableHint: string;
    columns: {
      leg: string;
      mode: string;
      publishedTime: string;
      planningTime: string;
      dayCost: string;
      recommendation: string;
    };
    rows: readonly TransportComparisonRow[];
    calculationsLabel: string;
    calculations: readonly {
      route: string;
      formula: string;
      result: string;
    }[];
    sampleNote: string;
  };
  legs: readonly TransportLeg[];
  base: {
    sectionLabel: string;
    title: string;
    intro: string;
    cards: readonly {
      place: string;
      title: string;
      body: string;
    }[];
  };
  tripLength: {
    sectionLabel: string;
    title: string;
    intro: string;
    options: readonly {
      nights: string;
      title: string;
      body: string;
      rule: string;
    }[];
    linkLead: string;
    linkLabel: string;
  };
  travellers: {
    sectionLabel: string;
    title: string;
    groups: readonly {
      label: string;
      recommendation: string;
    }[];
  };
  checklist: {
    sectionLabel: string;
    title: string;
    intro: string;
    items: readonly string[];
  };
  evidence: {
    sectionLabel: string;
    title: string;
    items: readonly {
      type: string;
      title: string;
      finding: string;
      sourceIndices: readonly number[];
    }[];
    sourceLabel: string;
    checkedLabel: string;
    checkedDate: string;
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
    aboutName: string;
    mentions: readonly string[];
  };
}

const english: TransportGuideCopy = {
  htmlLang: "en",
  homePath: "/",
  skipLink: "Skip to the transport guide",
  breadcrumbLabel: "Breadcrumb",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Beijing–Zhangjiajie–Shanghai transport",
  hero: {
    eyebrow: "Transport decision · Door to door",
    headlineTail: "What the Travel Days Actually Cost",
    lead:
      "The fastest-looking ticket is not always the shortest travel day. Compare both legs of this route before giving away the time you meant to spend in China.",
    preparedBy: "Prepared by Homeground China",
    publishedLabel: "Published",
    publishedDate: "22 July 2026",
    checkedLabel: "Transport checked",
    checkedDate: "22 July 2026",
    dynamicNote: "Exact trains and flights are rechecked for the traveller's dates",
  },
  quick: {
    sectionLabel: "The answer in 30 seconds",
    title: "It is not one train-versus-flight decision.",
    intro:
      "For most 10-night first trips, fly from Beijing to Zhangjiajie when a sensible nonstop operates. From Zhangjiajie to Shanghai, compare the actual departure and hotel-arrival times: the fastest direct train can beat a flight that reaches the hotel very late.",
    cards: [
      {
        route: "Beijing → Zhangjiajie",
        verdict: "Usually fly",
        planningCost: "About 6–8 hours by air",
        detail: "The direct high-speed train exists, but the current sample spends about 12 hours on board before transfers.",
        href: "#beijing-to-zhangjiajie",
      },
      {
        route: "Zhangjiajie → Shanghai",
        verdict: "Compare the exact date",
        planningCost: "About 6–8 hours by air; 9–13 by rail",
        detail: "A flight normally saves time, but its operating day and Shanghai airport must be checked. A well-timed direct train arrives at Hongqiao.",
        href: "#zhangjiajie-to-shanghai",
      },
      {
        route: "Whole route",
        verdict: "Protect two transfer days",
        planningCost: "Across two dates, flights still take about 12–16 hours door to door",
        detail: "Using long daytime trains for both legs turns two separate days into transport days.",
        href: "#trip-length",
      },
    ],
    boundary:
      "Here, ‘cost’ means usable travel time, not a fixed ticket price. Timetables are a dated snapshot, not a promise; availability and operating times must be checked again before booking.",
  },
  timeMath: {
    sectionLabel: "The missing maths",
    title: "A two-hour flight is not a two-hour transfer.",
    intro:
      "Search results usually compare time in the seat. A usable itinerary has to count every step between the two hotel doors.",
    formulaLabel: "Homeground door-to-door model",
    scrollHint: "Swipe to follow all six steps",
    steps: [
      { label: "Check out", detail: "Pack, settle the room and leave the hotel" },
      { label: "First mile", detail: "Reach the correct airport or railway station" },
      { label: "Departure buffer", detail: "Check in, clear security or enter the station" },
      { label: "Published journey", detail: "The flight or train time shown on the ticket" },
      { label: "Arrival process", detail: "Exit, collect bags and find onward transport" },
      { label: "Final mile", detail: "Reach the next hotel, not merely the destination city" },
    ],
    note:
      "For planning, allow roughly 1.5–2 hours before a domestic flight and 30–45 minutes before a train, then add the real first and final miles. These are working allowances, not carrier guarantees.",
  },
  visuals: {
    ariaLabel: "Beijing, Zhangjiajie and airport transport photo sequence",
    midpoint: {
      alt: "Wide view of Zhangjiajie West Railway Station and its forecourt.",
      title: "Zhangjiajie West Railway Station",
      caption:
        "The station is not the hotel. Arrival still needs a confirmed transfer to downtown or Wulingyuan.",
    },
    rail: {
      alt: "South entrance of Beijing West Railway Station with taxis and travellers.",
      title: "Beijing West Railway Station",
      caption:
        "A train choice still begins with reaching the correct station, security and a departure buffer.",
    },
    airport: {
      alt: "Airport terminal hall with signs for arrivals, metro, maglev and ground transport.",
      title: "Airport ground transport",
      caption:
        "Landing is not arrival: wayfinding and the final transfer remain part of the travel day.",
    },
  },
  comparison: {
    sectionLabel: "One route, four choices",
    title: "Compare the day you lose—not only the time in the seat.",
    intro:
      "Rail times below use an official 12306 sample for 23 July 2026. Flight entries are Homeground planning allowances rather than an official airline timetable. Every flight, airport and operating day must be checked for the traveller's date.",
    tableLabel: "Door-to-door comparison for Beijing, Zhangjiajie and Shanghai",
    tableHint: "Swipe to compare all six columns",
    columns: {
      leg: "Leg",
      mode: "Mode",
      publishedTime: "Seat / scheduled time",
      planningTime: "Door to door",
      dayCost: "Travel-day cost",
      recommendation: "Default decision",
    },
    rows: [
      {
        leg: "Beijing → Zhangjiajie",
        mode: "Nonstop flight — check airport and operating day",
        publishedTime: "Varies by date; check the operating airline",
        planningTime: "About 6–8 hours to a Zhangjiajie-area hotel",
        dayCost: "Roughly half a day",
        recommendation: "Best default when the time and airport work",
      },
      {
        leg: "Beijing West → Zhangjiajie West",
        mode: "Direct high-speed train",
        publishedTime: "12h 01m in the checked sample",
        planningTime: "About 13.5–15.5 hours",
        dayCost: "A complete travel day",
        recommendation: "Choose for preference, price or a poor flight schedule",
      },
      {
        leg: "Zhangjiajie → Shanghai",
        mode: "Nonstop flight — check the Shanghai airport",
        publishedTime: "Varies by date; check the operating airline",
        planningTime: "About 6–8 hours from Wulingyuan in a Pudong-arrival case",
        dayCost: "Roughly half a day",
        recommendation: "Usually fastest; reject a very late hotel arrival",
      },
      {
        leg: "Zhangjiajie West → Shanghai Hongqiao",
        mode: "Direct high-speed train",
        publishedTime: "7h 18m–9h 49m in the checked sample",
        planningTime: "About 9–13 hours from Wulingyuan",
        dayCost: "Most or all of a day",
        recommendation: "Reasonable when the fastest train beats a poor flight time",
      },
    ],
    calculationsLabel: "How the flight ranges are built",
    calculations: [
      {
        route: "Beijing hotel → Zhangjiajie-area hotel",
        formula:
          "60–90m to the Beijing airport + 90–120m airport allowance + about 150m flight allowance + 30–45m arrival process + 20–75m local transfer, depending on downtown or Wulingyuan",
        result: "Homeground planning range: roughly 6–8 hours",
      },
      {
        route: "Wulingyuan hotel → Shanghai hotel, using Pudong as the arrival case",
        formula:
          "45–75m to Hehua Airport + 90–120m airport allowance + 125–150m flight allowance + 30–45m arrival process + 60–90m Pudong transfer",
        result: "Homeground planning range: roughly 6–8 hours",
      },
    ],
    sampleNote:
      "The sample included direct trains G3649, G221, G1367 and G1473. Train numbers, schedules, flight airports and operating days can change; never build the trip around this sample without a fresh search.",
  },
  legs: [
    {
      id: "beijing-to-zhangjiajie",
      number: "01",
      eyebrow: "First leg",
      title: "Beijing → Zhangjiajie: flying normally wins.",
      verdict:
        "The direct train is real, but direct does not mean time-efficient. The checked high-speed service leaves Beijing West in the morning and reaches Zhangjiajie West late at night.",
      body:
        "A suitable nonstop flight usually saves enough time to protect either a Beijing morning or a usable evening in Zhangjiajie. The decision still depends on whether the flight leaves from Capital (PEK) or Daxing (PKX), its operating day and the time you can actually enter your Zhangjiajie hotel.",
      chooseFlightTitle: "Choose the flight when",
      chooseFlight: [
        "the trip has only 10–12 nights;",
        "a nonstop operates at a sensible time;",
        "you want the next day to be a full Zhangjiajie sightseeing day;",
        "children or older travellers would struggle with a 12-hour seated journey.",
      ],
      chooseTrainTitle: "Choose the train when",
      chooseTrain: [
        "you actively prefer rail and accept losing the day;",
        "the flight is badly timed, unavailable or disproportionately expensive;",
        "your route has enough nights that one full transport day is a preference rather than a compromise.",
      ],
      watchTitle: "Do not miss",
      watch: [
        "Beijing West is not Beijing South; PEK and PKX are not interchangeable.",
        "Zhangjiajie West is not at the national-park gate; the final transfer still remains.",
        "In the same 23 July sample, Z295 left Beijing West at 11:13 and arrived at 05:20 the next day, so it did not preserve a Beijing sightseeing day.",
      ],
    },
    {
      id: "zhangjiajie-to-shanghai",
      number: "02",
      eyebrow: "Second leg",
      title: "Zhangjiajie → Shanghai: arrival time decides.",
      verdict:
        "Flying remains faster in most cases, but the headline saving shrinks once Wulingyuan, airport buffers, baggage and—if the flight uses Pudong—the longer Shanghai transfer are counted.",
      body:
        "This leg deserves an actual timetable comparison. A daytime nonstop can preserve half a day. A late flight may put a family into its Shanghai hotel after midnight, while the fastest direct train reaches the well-connected Hongqiao hub in the evening. Compare hotel arrival—not take-off against train departure.",
      chooseFlightTitle: "Choose the flight when",
      chooseFlight: [
        "it operates nonstop at a useful hour;",
        "your Shanghai hotel arrival stays comfortably before bedtime;",
        "the whole trip has only 10 nights and Shanghai needs two proper days;",
        "you are not relying on a tight, separate-ticket international connection.",
      ],
      chooseTrainTitle: "Choose the train when",
      chooseTrain: [
        "the fastest direct service is available on your date;",
        "the flight is late, expensive or operationally awkward;",
        "arriving at Hongqiao is materially easier for the next hotel or train;",
        "your group prefers one predictable ground journey over airport handling.",
      ],
      watchTitle: "Do not miss",
      watch: [
        "Do not infer the Shanghai airport from the city name. Check whether the actual flight lists Pudong (PVG) or Hongqiao (SHA), then add the hotel transfer.",
        "A last park day in Wulingyuan cannot quietly become a same-day afternoon departure.",
        "Reach Shanghai at least the day before an international departure when tickets are separate.",
      ],
    },
  ],
  base: {
    sectionLabel: "The Zhangjiajie variable",
    title: "Where you sleep changes both answers.",
    intro:
      "“Leaving Zhangjiajie” can mean leaving a hotel beside Tianmen Mountain or leaving Wulingyuan after a park day. Those are different transfer plans.",
    cards: [
      {
        place: "Wulingyuan",
        title: "Best for national-park days",
        body:
          "As a Homeground planning allowance, budget roughly 45–75 minutes to Zhangjiajie West or Hehua Airport, then add traffic and weather margin. A Hunan Government notice reported tourist-bus links between the west station, downtown and scenic areas in April 2024; verify the current route and timetable.",
      },
      {
        place: "Downtown Zhangjiajie",
        title: "Better before Tianmen or an onward trip",
        body:
          "A 2019 Hunan transport page listed about 20 minutes from Hehua Airport to the Civil Aviation Hotel. Treat that only as a location baseline and recheck current ground transport. A downtown final night can still make an early or late flight less punishing.",
      },
      {
        place: "Shanghai",
        title: "Hongqiao and Pudong are different arrivals",
        body:
          "The direct train enters Hongqiao. For a flight, do not infer the airport from the city name: check whether the actual service lists Pudong (PVG) or Hongqiao (SHA), then add the hotel transfer before deciding which option is truly earlier.",
      },
    ],
  },
  tripLength: {
    sectionLabel: "What the route length changes",
    title: "Train becomes a preference only after the route has enough time.",
    intro:
      "The same transfer can be sensible in a 14-night trip and damaging in a 10-night trip. Do not use the city count alone; count complete sightseeing days after both moves.",
    options: [
      {
        nights: "10 nights",
        title: "Flights protect limited sightseeing time",
        body:
          "Use an open-jaw international trip, protect Zhangjiajie's full days and normally fly the Beijing leg. Adding another base creates a timing conflict: keep the wish in your brief, but expect the planner to show what must become faster, shorter or optional.",
        rule: "Transport rule: flight timing matters more when every complete sightseeing day counts.",
      },
      {
        nights: "12 nights",
        title: "One rail day becomes easier to absorb",
        body:
          "One rail leg can become reasonable if its departure time helps the route. There is room for a slower day or weather buffer without pretending every transfer is sightseeing.",
        rule: "Default: choose each leg by the actual timetable, not ideology.",
      },
      {
        nights: "14 nights",
        title: "Both modes become workable preferences",
        body:
          "Rail can be a genuine preference rather than a sacrifice. Extra places are still not automatic: the sequence, international flights and Zhangjiajie base must agree first.",
        rule: "Default: optimise comfort and arrival quality, not only speed.",
      },
    ],
    linkLead: "Need the Zhangjiajie part itself?",
    linkLabel: "See what actually fits in 2, 3 or 4 full days",
  },
  travellers: {
    sectionLabel: "Choose for the people travelling",
    title: "The fastest ticket can still be the hardest day.",
    groups: [
      {
        label: "Parents, children or older travellers",
        recommendation:
          "Prioritise a nonstop journey and a civilised hotel-arrival time. Avoid pairing a late arrival with an early park entry.",
      },
      {
        label: "Budget-first travellers",
        recommendation:
          "Compare live fares, baggage, airport transfers and the value of the sightseeing time lost. Rail is not automatically the cheaper total decision.",
      },
      {
        label: "Travellers who avoid flying",
        recommendation:
          "The route works by rail, but record Beijing–Zhangjiajie as a complete travel day and select the fastest sensible Shanghai train.",
      },
      {
        label: "International departure from Shanghai",
        recommendation:
          "Sleep in Shanghai the night before departure. Do not use a separate domestic ticket as a tight same-day connection to an international flight.",
      },
    ],
  },
  checklist: {
    sectionLabel: "Before you book",
    title: "Check these six facts for your actual dates.",
    intro:
      "A route can change because one airport, one hotel base or one late arrival changes. These details matter more than a generic ‘flight versus train’ verdict.",
    items: [
      "Are you counting hotel nights, calendar days or full sightseeing days?",
      "Do your international flights arrive in Beijing and leave from Shanghai, avoiding backtracking?",
      "Does the Beijing flight use Capital (PEK) or Daxing (PKX)?",
      "Will your final Zhangjiajie night be in Wulingyuan or downtown?",
      "Does a nonstop flight actually operate on that date, and where in Shanghai does it land?",
      "What time will your group reach the next hotel—not simply the station or airport?",
    ],
  },
  evidence: {
    sectionLabel: "Evidence and calculation",
    title: "What is official, and what is our planning estimate?",
    items: [
      {
        type: "Official timetable sample",
        title: "Beijing has a direct high-speed train to Zhangjiajie.",
        finding:
          "The 12306 search for 23 July 2026 returned direct G3649 from Beijing West to Zhangjiajie West at 10:23–22:24, a 12-hour 1-minute journey.",
        sourceIndices: [0, 1],
      },
      {
        type: "Official timetable sample",
        title: "Zhangjiajie has several direct high-speed trains to Shanghai.",
        finding:
          "The same dated search returned direct journeys to Shanghai Hongqiao ranging from 7 hours 18 minutes to 9 hours 49 minutes.",
        sourceIndices: [0, 2],
      },
      {
        type: "Dated government baseline",
        title: "The Zhangjiajie arrival point is not the national-park gate.",
        finding:
          "A 2019 Hunan transport page places Hehua Airport near downtown, while an April 2024 notice reported tourist-bus links between the west station, downtown and scenic areas. These confirm the geography, not today's timetable; recheck the actual transfer before booking.",
        sourceIndices: [4, 5],
      },
      {
        type: "Homeground calculation",
        title: "Door-to-door ranges add the parts the ticket omits.",
        finding:
          "Our planning values combine hotel departure, ground transfer, a practical departure buffer, the published journey, arrival friction and the final hotel transfer. They are intentionally ranges, not promised durations.",
        sourceIndices: [],
      },
    ],
    sourceLabel: "Source",
    checkedLabel: "Checked",
    checkedDate: "22 July 2026",
  },
  faq: {
    sectionLabel: "Common planning questions",
    title: "Before choosing the ticket",
    items: [
      {
        question: "Is there a direct train from Beijing to Zhangjiajie?",
        answer:
          "Yes. In the official sample checked for 23 July 2026, a direct high-speed train ran from Beijing West to Zhangjiajie West in about 12 hours. It is direct but still consumes the full day, and the timetable must be checked again for your date.",
      },
      {
        question: "Does the Beijing–Zhangjiajie sleeper save a hotel night?",
        answer:
          "It can replace one hotel night, but it does not preserve the Beijing sightseeing day. In the 23 July 2026 sample, Z295 left Beijing West at 11:13 and arrived at Zhangjiajie West at 05:20 the next day.",
      },
      {
        question: "Which Shanghai airport does the Zhangjiajie flight use?",
        answer:
          "Do not infer the airport from the city name. Check whether the actual flight lists Pudong (PVG) or Hongqiao (SHA), then add that airport's transfer to the Shanghai hotel before comparing it with the train.",
      },
      {
        question: "Can I sightsee in Zhangjiajie and travel to Shanghai on the same day?",
        answer:
          "Only with a deliberately limited morning and a later departure. A full national-park day does not combine honestly with an afternoon airport or station transfer from Wulingyuan.",
      },
      {
        question: "Can I connect to an international flight in Shanghai on the same day?",
        answer:
          "We would not build a tight connection on separate tickets. Domestic delays, the distance from Pudong or Hongqiao and the loss of protection between tickets make an overnight in Shanghai the safer plan.",
      },
      {
        question: "Does reversing the route make it easier?",
        answer:
          "It can, but only after the international flight cities and domestic schedules are known. The same rule applies in reverse: compare hotel-to-hotel arrival times and protect the full Zhangjiajie days.",
      },
    ],
  },
  sources: {
    hiddenTitle: "Transport sources",
    disclosureTitle: "Sources and timetable boundary",
    summary: "Official links and the dated schedule sample used for this guide",
    intro:
      "Rail results were checked on 22 July 2026 for travel on 23 July 2026. Flights and trains change by season and operating day. Recheck 12306 and the operating airline before paying.",
    names: [
      "China Railway 12306: official English booking and timetable service",
      "Manual 12306 check: Beijing West to Zhangjiajie West for 23 July 2026, checked 22 July 2026",
      "Manual 12306 check: Zhangjiajie West to Shanghai Hongqiao for 23 July 2026, checked 22 July 2026",
      "Hunan Airport Group: May 2026 holiday frequency increase on Beijing and Shanghai routes",
      "Hunan Department of Transportation: 2019 Hehua Airport location and transfer baseline",
      "Hunan Government: April 2024 tourist-bus links connecting the west station, downtown and scenic areas",
      "Shanghai Airport Authority: Pudong airport ground transport",
    ],
  },
  finalCta: {
    sectionLabel: "Check the shape first",
    title: "Do these three cities fit your available nights?",
    body:
      "Use the free Route Finder to compare your wishlist with your total nights and preferred pace. You see the timing result before sharing contact details. It is a first check, not a transport booking or finished itinerary.",
    action: "Start the free route check",
  },
  structuredData: {
    homeName: "Homeground China",
    aboutName: "Beijing–Zhangjiajie–Shanghai transport planning",
    mentions: [
      "Beijing",
      "Zhangjiajie",
      "Shanghai",
      "Beijing West railway station",
      "Zhangjiajie West railway station",
      "Zhangjiajie Hehua International Airport",
      "Shanghai Hongqiao railway station",
      "Shanghai Pudong International Airport",
    ],
  },
};

const chinese: TransportGuideCopy = {
  ...english,
  htmlLang: "zh-Hans",
  homePath: "/zh/",
  skipLink: "跳到交通指南正文",
  breadcrumbLabel: "面包屑导航",
  breadcrumbHome: "首页",
  breadcrumbCurrent: "北京—张家界—上海交通",
  hero: {
    eyebrow: "交通决策 · 门到门时间",
    headlineTail: "两段交通真正会占掉多少时间",
    lead:
      "票面上最快的选择，不一定让旅行日最短。先把整条路线的两段交通算清楚，再决定愿意牺牲多少在中国真正游玩的时间。",
    preparedBy: "Homeground China 整理",
    publishedLabel: "发布于",
    publishedDate: "2026 年 7 月 22 日",
    checkedLabel: "交通信息核查于",
    checkedDate: "2026 年 7 月 22 日",
    dynamicNote: "实际预订前按客人日期重新核对车次和航班",
  },
  quick: {
    sectionLabel: "30 秒结论",
    title: "这不是一道统一的 “高铁还是飞机” 选择题。",
    intro:
      "对多数第一次来中国、只有 10 晚的客人，北京到张家界如果有时间合适的直飞，通常应坐飞机；张家界到上海则要比较真实的出发时间和到酒店时间——最快的直达高铁，有时比深夜才落地浦东的航班更实用。",
    cards: [
      {
        route: "北京 → 张家界",
        verdict: "通常选飞机",
        planningCost: "门到门约 6–8 小时",
        detail: "目前确有直达高铁，但样本车次仅在车上就约 12 小时，还没计算两端接驳。",
        href: "#beijing-to-zhangjiajie",
      },
      {
        route: "张家界 → 上海",
        verdict: "按实际日期比较",
        planningCost: "飞机约 6–8 小时；高铁约 9–13 小时",
        detail: "飞机通常更省时间，但必须按日期核对运行日和抵达上海的机场；时间合适的直达高铁则到达虹桥。",
        href: "#zhangjiajie-to-shanghai",
      },
      {
        route: "整条路线",
        verdict: "把两段交通分别按移动日计算",
        planningCost: "两次移动分布在两天，即使都飞，门到门合计也约 12–16 小时",
        detail: "如果两段都用长距离日间列车，就要诚实地把两天记为交通日。",
        href: "#trip-length",
      },
    ],
    boundary:
      "这里的“代价”指可用于旅行的时间，不是固定票价。本文时刻表是带日期的核查样本，不是承诺；预订前必须重新确认余票和运行时间。",
  },
  timeMath: {
    sectionLabel: "最容易漏掉的计算",
    title: "两小时的航班，不等于两小时的移动。",
    intro: "搜索结果常只比较乘坐时间，真正能执行的行程必须从上一家酒店门口算到下一家酒店门口。",
    formulaLabel: "Homeground 门到门模型",
    scrollHint: "向左滑动，查看全部六个步骤",
    steps: [
      { label: "退房", detail: "收拾行李、处理退房并离开酒店" },
      { label: "前段接驳", detail: "到达正确的机场或火车站" },
      { label: "出发缓冲", detail: "值机、安检，或进站候车" },
      { label: "票面行程", detail: "机票或火车票上显示的乘坐时间" },
      { label: "抵达流程", detail: "出站、取行李并找到下一段交通" },
      { label: "后段接驳", detail: "真正抵达下一家酒店，而不是只到目的城市" },
    ],
    note:
      "规划时，国内航班通常预留起飞前约 1.5–2 小时，高铁预留约 30–45 分钟，再加上真实的前后接驳。这是工作用缓冲，不是承运方保证。",
  },
  visuals: {
    ariaLabel: "北京、张家界与机场交通实景",
    midpoint: {
      alt: "张家界西站及站前广场的横向全景。",
      title: "张家界西站",
      caption: "到站不等于到酒店，还要确认去张家界市区或武陵源的接驳。",
    },
    rail: {
      alt: "北京西站南进站口外的出租车与旅客。",
      title: "北京西站",
      caption: "坐高铁也要先到正确车站、完成安检，并预留进站时间。",
    },
    airport: {
      alt: "机场航站楼内的到达、地铁、磁浮与地面交通指示牌。",
      title: "机场地面交通",
      caption: "落地不等于完成移动，导向与最后一段接驳仍属于交通日。",
    },
  },
  comparison: {
    sectionLabel: "一条路线，四种选择",
    title: "比较整段交通实际占用的时间，而不只是票面时间。",
    intro:
      "下方铁路时间采用 12306 对 2026 年 7 月 23 日的官方查询样本。航班部分是 Homeground 的规划预留，并非航空公司官方时刻表；每一趟航班、机场和运行日都必须按客人的真实日期重新核对。",
    tableLabel: "北京、张家界、上海门到门交通比较",
    tableHint: "向左滑动，查看完整六列比较",
    columns: {
      leg: "路段",
      mode: "方式",
      publishedTime: "乘坐／计划时间",
      planningTime: "门到门",
      dayCost: "交通日代价",
      recommendation: "默认判断",
    },
    rows: [
      {
        leg: "北京 → 张家界",
        mode: "直飞——核对机场和运行日",
        publishedTime: "随日期变化；请向实际承运航司核对",
        planningTime: "到张家界区域酒店约 6–8 小时",
        dayCost: "约半天",
        recommendation: "时间和机场合适时的默认选择",
      },
      {
        leg: "北京西 → 张家界西",
        mode: "直达高铁",
        publishedTime: "核查样本为 12 小时 1 分钟",
        planningTime: "约 13.5–15.5 小时",
        dayCost: "完整交通日",
        recommendation: "因偏好、价格或航班不合适时选择",
      },
      {
        leg: "张家界 → 上海",
        mode: "直飞——核对抵达上海的机场",
        publishedTime: "随日期变化；请向实际承运航司核对",
        planningTime: "按抵达浦东的情况，从武陵源出发约 6–8 小时",
        dayCost: "约半天",
        recommendation: "通常最快，但不要接受过晚到酒店",
      },
      {
        leg: "张家界西 → 上海虹桥",
        mode: "直达高铁",
        publishedTime: "核查样本为 7 小时 18 分–9 小时 49 分",
        planningTime: "从武陵源出发约 9–13 小时",
        dayCost: "大半天至一整天",
        recommendation: "最快车次的到达时间优于不理想的航班时可选",
      },
    ],
    calculationsLabel: "航班时间范围如何计算",
    calculations: [
      {
        route: "北京酒店 → 张家界区域酒店",
        formula:
          "前往北京机场 60–90 分钟 + 机场预留 90–120 分钟 + 航班时长规划估算约 150 分钟 + 抵达流程 30–45 分钟 + 当地接驳 20–75 分钟（取决于市区或武陵源）",
        result: "Homeground 规划范围：约 6–8 小时",
      },
      {
        route: "武陵源酒店 → 上海酒店，以抵达浦东为例",
        formula:
          "前往荷花机场 45–75 分钟 + 机场预留 90–120 分钟 + 航班时长规划估算 125–150 分钟 + 抵达流程 30–45 分钟 + 浦东接驳 60–90 分钟",
        result: "Homeground 规划范围：约 6–8 小时",
      },
    ],
    sampleNote:
      "本次样本包含 G3649、G221、G1367 和 G1473。车次、时刻、航班机场和运行日都可能变化，不能不经重新查询就围绕这组样本订整趟旅行。",
  },
  legs: [
    {
      id: "beijing-to-zhangjiajie",
      number: "01",
      eyebrow: "第一段",
      title: "北京 → 张家界：通常飞机胜出。",
      verdict:
        "直达高铁确实存在，但“直达”不等于省时间。核查到的高铁早上从北京西出发，深夜才到张家界西。",
      body:
        "时间合适的直飞，通常足以保住北京的半天或张家界一个可用的夜晚。但仍要确认航班究竟从首都机场（PEK）还是大兴机场（PKX）出发、哪天运行，以及几点能真正进入张家界酒店。",
      chooseFlightTitle: "以下情况选飞机",
      chooseFlight: [
        "整趟旅行只有 10–12 晚；",
        "当天有时间合理的直飞；",
        "希望第二天成为完整的张家界游览日；",
        "儿童或老人难以承受连续 12 小时乘坐。",
      ],
      chooseTrainTitle: "以下情况选高铁",
      chooseTrain: [
        "明确偏好铁路，并接受把这一天用于交通；",
        "航班时间很差、没有直飞或价格明显不合理；",
        "行程夜数足够，一个完整交通日只是偏好而不是妥协。",
      ],
      watchTitle: "不要漏掉",
      watch: [
        "北京西不是北京南；首都机场和大兴机场也不能互换。",
        "张家界西站不在国家森林公园门口，最后一段接驳仍然存在。",
        "在同一组 7 月 23 日样本中，Z295 于 11:13 从北京西出发，次日 05:20 到达，因此无法保住北京当天的游览时间。",
      ],
    },
    {
      id: "zhangjiajie-to-shanghai",
      number: "02",
      eyebrow: "第二段",
      title: "张家界 → 上海：由到达时间决定。",
      verdict:
        "多数情况下飞机仍然更快，但把武陵源接驳、机场缓冲、取行李和浦东进城算进去后，差距不会像票面时间看起来那么大。",
      body:
        "这一段必须查真实时刻。一班白天直飞可以保住半天；一班很晚的飞机可能让一家人凌晨才进上海酒店，而最快的直达高铁会在晚上到接驳方便的虹桥。要比较的是到酒店时间，不是起飞时间和高铁发车时间。",
      chooseFlightTitle: "以下情况选飞机",
      chooseFlight: [
        "当天有时间合理的直飞；",
        "抵达上海酒店的时间不会破坏休息；",
        "整趟旅行只有 10 晚，上海需要两个完整游览日；",
        "不打算用分开出票的国内段，去衔接当天时间紧张的国际航班。",
      ],
      chooseTrainTitle: "以下情况选高铁",
      chooseTrain: [
        "当天能买到最快的直达车；",
        "航班过晚、过贵或运行条件不理想；",
        "抵达虹桥对下一家酒店或下一段火车明显更方便；",
        "团队更愿意接受一次稳定的地面移动，而不是机场流程。",
      ],
      watchTitle: "不要漏掉",
      watch: [
        "不要只凭“上海”二字判断机场。核对实际航班标注的是浦东（PVG）还是虹桥（SHA），再加上到酒店的接驳时间。",
        "在武陵源完整游览一天后，不能默认还来得及衔接当天下午的航班或高铁。",
        "如果国际航班使用独立机票，至少提前一晚到上海。",
      ],
    },
  ],
  base: {
    sectionLabel: "张家界变量",
    title: "张家界最后一晚住哪里，会改变两段交通的判断。",
    intro:
      "“离开张家界”可能是从天门山附近的酒店出发，也可能是从武陵源玩完后出发。这是两种完全不同的交通计划。",
    cards: [
      {
        place: "武陵源",
        title: "适合国家森林公园游览日",
        body:
          "作为 Homeground 的规划估算，到张家界西站或荷花机场大致预留 45–75 分钟，再给天气和交通留余量。湖南政府在 2024 年 4 月的一则通知中提到西站、市区和景区之间的旅游巴士；请重新核对目前的线路和时刻。",
      },
      {
        place: "张家界市区",
        title: "适合天门山或第二天离开",
        body:
          "湖南省交通运输厅一则 2019 年页面显示，荷花机场到民航酒店约 20 分钟。这里只能把它当作位置基线，并重新核对目前的地面交通；最后一晚住市区，仍能减轻赶早班机或搭乘晚班机的压力。",
      },
      {
        place: "上海",
        title: "虹桥和浦东是两种抵达",
        body:
          "直达高铁进入虹桥。航班则不要只凭城市名判断机场：先核对实际航班标注的是浦东（PVG）还是虹桥（SHA），再加上到酒店的接驳，判断哪个选择真正更早。",
      },
    ],
  },
  tripLength: {
    sectionLabel: "总行程长度如何改变选择",
    title: "只有当整趟旅行时间够用，高铁才真正成为偏好。",
    intro:
      "同一段交通放进 14 晚路线可以合理，放进 10 晚路线却可能破坏核心游览。不要只数城市，要在两次移动之后数还剩多少完整游览日。",
    options: [
      {
        nights: "10 晚",
        title: "航班更能保护有限的游览时间",
        body:
          "国际航班应尽量北京进、上海出，保护张家界的完整游览日，北京这一段通常坐飞机。如果再加一个住宿基地，就会出现时间冲突：可以把愿望保留在需求中，但规划师会说明哪些地方必须加快、缩短或改为选去。",
        rule: "交通判断：当每一个完整游览日都很重要时，航班时刻的影响更大。",
      },
      {
        nights: "12 晚",
        title: "更容易容纳一天铁路交通",
        body:
          "如果某段高铁时间对路线有利，可以选择一段铁路。行程也有空间容纳慢一点的一天或天气缓冲，不再假装交通日也是游览日。",
        rule: "默认：按实际时刻选择每一段，不预先站队飞机或高铁。",
      },
      {
        nights: "14 晚",
        title: "飞机和高铁都能成为可行的偏好选择",
        body:
          "铁路可以成为真正的个人偏好，而不是牺牲核心景点。要加其他地方仍需先核对顺序、国际航班和张家界住宿基地。",
        rule: "默认：优化舒适度和到达质量，而不仅是速度。",
      },
    ],
    linkLead: "需要安排张家界内部路线？",
    linkLabel: "查看 2、3、4 个完整游览日分别能安排什么",
  },
  travellers: {
    sectionLabel: "根据同行人选择",
    title: "最快的票，也可能是最难熬的一天。",
    groups: [
      {
        label: "带父母、儿童或老人",
        recommendation: "优先直达和正常的到酒店时间，不要把深夜抵达接在第二天清晨入园之前。",
      },
      {
        label: "预算优先",
        recommendation: "比较实时票价、行李、机场接驳和损失的游览时间；高铁并不自动代表总成本更低。",
      },
      {
        label: "不愿坐飞机",
        recommendation: "全程铁路可以执行，但必须把北京到张家界记为完整交通日，并选择最合理的上海直达车。",
      },
      {
        label: "从上海搭国际航班离境",
        recommendation: "前一晚住进上海，不要把分开出票的国内段与当天国际航班安排得过紧。",
      },
    ],
  },
  checklist: {
    sectionLabel: "预订前",
    title: "按你的真实日期核对这六件事。",
    intro:
      "一个机场、一个住宿基地或一次深夜抵达，就能改变整条路线。它们比笼统的“飞机还是高铁”结论更重要。",
    items: [
      "你说的是住宿晚数、日历天数，还是完整游览日？",
      "国际航班是否北京进、上海出，从而避免折返？",
      "北京航班使用首都机场（PEK）还是大兴机场（PKX）？",
      "张家界最后一晚住武陵源还是市区？",
      "当天是否真的有直飞，且会降落上海哪个机场？",
      "团队几点能到下一家酒店，而不是仅仅几点到站或落地？",
    ],
  },
  evidence: {
    sectionLabel: "证据与计算",
    title: "哪些来自官方，哪些是我们的规划估算？",
    items: [
      {
        type: "官方时刻样本",
        title: "北京确有直达张家界的高铁。",
        finding:
          "12306 对 2026 年 7 月 23 日的查询显示，G3649 从北京西 10:23 出发，22:24 到张家界西，运行 12 小时 1 分钟。",
        sourceIndices: [0, 1],
      },
      {
        type: "官方时刻样本",
        title: "张家界有多趟直达上海的高铁。",
        finding: "同一日期的查询显示，直达上海虹桥的行程约为 7 小时 18 分至 9 小时 49 分。",
        sourceIndices: [0, 2],
      },
      {
        type: "官方交通基线",
        title: "张家界的抵达点不是国家森林公园门口。",
        finding:
          "政府资料说明荷花机场靠近市区，并有旅游巴士连接西站、市区和景区。因此最后一段接驳必须保留在行程里。",
        sourceIndices: [4, 5],
      },
      {
        type: "Homeground 规划估算",
        title: "门到门范围补上了票面没有写的环节。",
        finding:
          "规划值由离开酒店、地面接驳、出发缓冲、票面行程、抵达流程和下一家酒店接驳组成。它们刻意使用范围，而不是承诺固定时间。",
        sourceIndices: [],
      },
    ],
    sourceLabel: "来源",
    checkedLabel: "核查于",
    checkedDate: "2026 年 7 月 22 日",
  },
  faq: {
    sectionLabel: "常见规划问题",
    title: "选票之前先回答这些问题",
    items: [
      {
        question: "北京到张家界有直达高铁吗？",
        answer:
          "有。对 2026 年 7 月 23 日的官方查询样本中，北京西到张家界西有约 12 小时的直达高铁。它虽然直达，但仍会占掉完整一天；你的日期需要重新查询。",
      },
      {
        question: "北京—张家界卧铺能省下一晚酒店吗？",
        answer:
          "它可以替代一晚酒店，但无法保住北京当天的游览时间。在 2026 年 7 月 23 日的样本中，Z295 于 11:13 从北京西出发，次日 05:20 到达张家界西。",
      },
      {
        question: "张家界飞上海会使用哪个机场？",
        answer:
          "不要只凭城市名判断机场。先核对实际航班标注的是浦东（PVG）还是虹桥（SHA），再把该机场到上海酒店的接驳时间加进去，与高铁比较。",
      },
      {
        question: "能不能上午在张家界玩，下午再去上海？",
        answer:
          "只有主动限制上午行程并选择晚一点的交通才可能。武陵源的完整国家森林公园游览日，无法再稳妥衔接当天下午前往机场或车站的交通。",
      },
      {
        question: "可以当天到上海再转国际航班吗？",
        answer:
          "不建议把两张独立机票做成紧张连接。国内段延误、浦东或虹桥的距离，以及分开出票后无法获得联程保障，都让前一晚住上海更稳妥。",
      },
      {
        question: "反向走上海—张家界—北京会更容易吗？",
        answer:
          "有可能，但必须先知道国际航班城市和当天国内班次。反向同样要比较酒店到酒店的时间，并保护张家界完整游览日。",
      },
    ],
  },
  sources: {
    hiddenTitle: "交通资料来源",
    disclosureTitle: "资料来源与时刻边界",
    summary: "本指南使用的官方链接和带日期时刻样本",
    intro:
      "铁路结果于 2026 年 7 月 22 日查询，乘车日期为 7 月 23 日。航班与车次会随季节和运行日变化，付款前请重新查看 12306 和实际承运航司。",
    names: [
      "中国铁路 12306 英文官方购票与时刻服务",
      "12306 人工查询记录：2026 年 7 月 23 日北京西—张家界西，查询于 7 月 22 日",
      "12306 人工查询记录：2026 年 7 月 23 日张家界西—上海虹桥，查询于 7 月 22 日",
      "湖南机场集团：2026 年 5 月假期张家界往返北京、上海航班频次增加",
      "湖南省交通运输厅：2019 年荷花机场位置与接驳基线",
      "湖南政府：2024 年 4 月连接西站、市区和景区的旅游巴士",
      "上海机场集团：浦东机场地面交通",
    ],
  },
  finalCta: {
    sectionLabel: "先检查路线结构",
    title: "你的旅行晚数能放下这三座城市吗？",
    body:
      "使用免费的 Route Finder，把目的地愿望、总晚数和旅行节奏放在一起检查。无需先填写联系方式即可看到时间判断；它是第一轮路线检查，不是交通预订或完整行程。",
    action: "开始免费路线检查",
  },
  structuredData: {
    homeName: "Homeground China",
    aboutName: "北京—张家界—上海交通规划",
    mentions: ["北京", "张家界", "上海", "北京西站", "张家界西站", "张家界荷花国际机场", "上海虹桥站", "上海浦东国际机场"],
  },
};

const korean: TransportGuideCopy = {
  ...english,
  htmlLang: "ko",
  homePath: "/ko/",
  skipLink: "교통 가이드 본문으로 이동",
  breadcrumbLabel: "현재 위치",
  breadcrumbHome: "홈",
  breadcrumbCurrent: "베이징–장자제–상하이 교통",
  hero: {
    eyebrow: "교통 선택 · 호텔에서 호텔까지",
    headlineTail: "이동일에 실제로 드는 시간",
    lead:
      "표에 적힌 시간이 가장 짧다고 해서 이동일 전체가 가장 짧은 것은 아닙니다. 중국에서 실제로 여행할 시간을 허비하지 않도록 두 구간을 함께 비교합니다.",
    preparedBy: "Homeground China 작성",
    publishedLabel: "게시",
    publishedDate: "2026년 7월 22일",
    checkedLabel: "교통 확인",
    checkedDate: "2026년 7월 22일",
    dynamicNote: "실제 예약 전 여행 날짜에 맞춰 열차와 항공편을 다시 확인합니다",
  },
  quick: {
    sectionLabel: "30초 결론",
    title: "두 구간에 같은 ‘기차냐 비행기냐’ 답을 적용할 수는 없습니다.",
    intro:
      "첫 중국 여행이 10박이라면 적절한 직항이 있는 날짜에는 베이징에서 장자제까지 비행기를 권합니다. 장자제에서 상하이까지는 실제 출발 시각과 호텔 도착 시각을 비교해야 합니다. 너무 늦게 푸둥에 도착하는 항공편보다 가장 빠른 직행 열차가 더 유용할 수 있습니다.",
    cards: [
      {
        route: "베이징 → 장자제",
        verdict: "대부분 비행기",
        planningCost: "항공 이용 시 호텔 간 약 6–8시간",
        detail: "직행 고속열차가 있지만, 현재 표본은 환승 시간을 제외하고도 열차 안에서 약 12시간을 보냅니다.",
        href: "#beijing-to-zhangjiajie",
      },
      {
        route: "장자제 → 상하이",
        verdict: "실제 날짜로 비교",
        planningCost: "항공 약 6–8시간, 철도 약 9–13시간",
        detail: "항공편이 보통 시간을 절약하지만 운항일과 상하이 도착 공항을 확인해야 합니다. 시간이 좋은 직행 열차는 훙차오에 도착합니다.",
        href: "#zhangjiajie-to-shanghai",
      },
      {
        route: "전체 동선",
        verdict: "이동일 이틀을 따로 계산",
        planningCost: "두 날짜에 걸쳐 이동하며, 모두 비행해도 호텔 간 총 약 12–16시간",
        detail: "두 구간 모두 장거리 주간열차를 이용하면 이틀을 교통일로 계산해야 합니다.",
        href: "#trip-length",
      },
    ],
    boundary:
      "여기서 ‘비용’은 고정된 티켓 가격이 아니라 여행에 쓸 수 있는 시간을 뜻합니다. 시간표는 특정 날짜 기준 표본일 뿐 약속이 아니므로, 예약 전에 좌석과 운행시간을 다시 확인해야 합니다.",
  },
  timeMath: {
    sectionLabel: "빠지기 쉬운 계산",
    title: "2시간 비행은 2시간 이동이 아닙니다.",
    intro: "검색 결과는 보통 탑승 시간만 비교합니다. 실행 가능한 일정은 이전 호텔 문에서 다음 호텔 문까지 계산해야 합니다.",
    formulaLabel: "Homeground 호텔 간 이동 모델",
    scrollHint: "왼쪽으로 밀어 여섯 단계를 모두 확인하세요",
    steps: [
      { label: "체크아웃", detail: "짐을 정리하고 체크아웃을 마친 뒤 호텔을 나섭니다" },
      { label: "첫 이동", detail: "정확한 공항이나 기차역까지 갑니다" },
      { label: "출발 여유", detail: "체크인과 보안 검색 또는 역 입장과 대기" },
      { label: "승차·비행시간", detail: "항공권이나 기차표에 적힌 탑승 시간" },
      { label: "도착 절차", detail: "출구 이동, 수하물 수취와 다음 교통 찾기" },
      { label: "마지막 이동", detail: "도시 도착이 아니라 다음 호텔까지 이동" },
    ],
    note:
      "국내선은 출발 1.5–2시간 전, 고속열차는 30–45분 전에 도착하도록 잡고 양쪽 지상 이동시간도 더합니다. 이는 계획용 범위이지 운송사의 보장 시간이 아닙니다.",
  },
  visuals: {
    ariaLabel: "베이징·장자제·공항 이동 사진",
    midpoint: {
      alt: "장자제서역과 역 앞 광장의 넓은 전경.",
      title: "장자제서역",
      caption:
        "역에 도착해도 호텔까지 끝난 것은 아닙니다. 시내 또는 우링위안으로 가는 이동을 확인해야 합니다.",
    },
    rail: {
      alt: "택시와 여행객이 있는 베이징서역 남쪽 출입구.",
      title: "베이징서역",
      caption:
        "열차를 선택해도 정확한 역까지 이동하고 보안 검색과 출발 여유시간을 거쳐야 합니다.",
    },
    airport: {
      alt: "공항 터미널의 도착·지하철·자기부상열차·지상교통 안내 표지판.",
      title: "공항 지상교통",
      caption:
        "착륙이 이동의 끝은 아닙니다. 길 찾기와 마지막 이동도 여행일에 포함됩니다.",
    },
  },
  comparison: {
    sectionLabel: "한 노선, 네 가지 선택",
    title: "티켓에 적힌 시간이 아니라 이동에 실제로 드는 시간을 비교하세요.",
    intro:
      "아래 철도 시간은 2026년 7월 23일 12306 공식 조회 표본을 사용했습니다. 항공편 항목은 항공사의 공식 시간표가 아니라 Homeground의 계획용 여유시간입니다. 모든 항공편, 공항과 운항일은 여행자의 실제 날짜로 다시 확인해야 합니다.",
    tableLabel: "베이징, 장자제, 상하이 호텔 간 교통 비교",
    tableHint: "왼쪽으로 밀어 여섯 항목을 모두 비교하세요",
    columns: {
      leg: "구간",
      mode: "수단",
      publishedTime: "탑승／예정 시간",
      planningTime: "호텔 간",
      dayCost: "이동일에 미치는 영향",
      recommendation: "기본 판단",
    },
    rows: [
      {
        leg: "베이징 → 장자제",
        mode: "직항—공항과 운항일 확인",
        publishedTime: "날짜별 상이—실제 운항 항공사 확인",
        planningTime: "장자제 지역 호텔까지 약 6–8시간",
        dayCost: "약 반나절",
        recommendation: "시간과 공항이 맞을 때 기본 선택",
      },
      {
        leg: "베이징 서역 → 장자제 서역",
        mode: "직행 고속열차",
        publishedTime: "확인 표본 12시간 1분",
        planningTime: "약 13.5–15.5시간",
        dayCost: "하루 전체",
        recommendation: "열차를 선호하거나 요금 또는 항공편 시간이 불리할 때",
      },
      {
        leg: "장자제 → 상하이",
        mode: "직항—상하이 도착 공항 확인",
        publishedTime: "날짜별 상이—실제 운항 항공사 확인",
        planningTime: "푸둥 도착 기준, 우링위안 출발 약 6–8시간",
        dayCost: "약 반나절",
        recommendation: "보통 가장 빠르지만 너무 늦은 도착은 피하기",
      },
      {
        leg: "장자제 서역 → 상하이 훙차오",
        mode: "직행 고속열차",
        publishedTime: "확인 표본 7시간 18분–9시간 49분",
        planningTime: "우링위안 출발 약 9–13시간",
        dayCost: "하루 대부분 또는 전체",
        recommendation: "가장 빠른 열차의 일정이 항공편보다 유리할 때",
      },
    ],
    calculationsLabel: "항공 이동시간 범위 계산 방법",
    calculations: [
      {
        route: "베이징 호텔 → 장자제 지역 호텔",
        formula:
          "베이징 공항까지 60–90분 + 공항 여유 90–120분 + 항공편 시간 계획치 약 150분 + 도착 절차 30–45분 + 도심 또는 우링위안 기준 현지 이동 20–75분",
        result: "Homeground 계획 범위: 약 6–8시간",
      },
      {
        route: "우링위안 호텔 → 상하이 호텔, 푸둥 도착 기준",
        formula:
          "허화 국제공항까지 45–75분 + 공항 여유 90–120분 + 항공편 시간 계획치 125–150분 + 도착 절차 30–45분 + 푸둥 이동 60–90분",
        result: "Homeground 계획 범위: 약 6–8시간",
      },
    ],
    sampleNote:
      "표본에는 G3649, G221, G1367, G1473이 포함되었습니다. 열차 번호, 시각, 항공편 공항과 운항일은 바뀔 수 있으므로 새 조회 없이 이 표본에 맞춰 여행 전체를 예약하지 마세요.",
  },
  legs: [
    {
      id: "beijing-to-zhangjiajie",
      number: "01",
      eyebrow: "첫 번째 구간",
      title: "베이징 → 장자제: 대부분 비행기가 낫습니다.",
      verdict:
        "직행 열차는 실제로 있지만 ‘직행’이 곧 시간 효율을 뜻하지는 않습니다. 확인한 고속열차는 아침에 베이징 서역을 떠나 밤늦게 장자제 서역에 도착합니다.",
      body:
        "적절한 직항은 베이징의 반나절이나 장자제에서 활용할 수 있는 저녁 시간을 지켜주는 경우가 많습니다. 다만 수도공항(PEK)과 다싱공항(PKX) 중 어디서 출발하는지, 실제 운항일, 장자제 호텔에 언제 들어갈 수 있는지를 함께 확인해야 합니다.",
      chooseFlightTitle: "비행기를 선택할 때",
      chooseFlight: [
        "전체 여행이 10–12박일 때.",
        "적절한 시간의 직항이 운항할 때.",
        "다음 날을 온전한 장자제 관광일로 쓰고 싶을 때.",
        "아이 또는 고령자가 12시간 탑승을 힘들어할 때.",
      ],
      chooseTrainTitle: "열차를 선택할 때",
      chooseTrain: [
        "기차 여행을 선호하고 하루를 이동에 쓰는 것을 받아들일 수 있을 때.",
        "항공편 시간이 불편하거나 직항이 없고 가격이 지나치게 높을 때.",
        "하루를 이동에 써도 핵심 일정이 줄지 않을 만큼 여행 기간이 길 때.",
      ],
      watchTitle: "놓치지 말 것",
      watch: [
        "베이징 서역은 베이징 남역이 아니며 PEK와 PKX도 서로 바꿀 수 없습니다.",
        "장자제 서역은 국가삼림공원 입구가 아니므로 마지막 이동이 남습니다.",
        "같은 7월 23일 표본에서 Z295는 베이징 서역을 11:13에 출발해 다음 날 05:20에 도착했으므로, 베이징 관광일을 보존하지 못했습니다.",
      ],
    },
    {
      id: "zhangjiajie-to-shanghai",
      number: "02",
      eyebrow: "두 번째 구간",
      title: "장자제 → 상하이: 도착 시각이 선택을 좌우합니다.",
      verdict:
        "대부분 항공편이 더 빠르지만 우링위안에서 공항까지의 이동, 공항 여유, 수하물과 푸둥에서 시내까지를 더하면 표면적인 차이는 줄어듭니다.",
      body:
        "이 구간은 실제 시간표를 비교해야 합니다. 낮 시간대 직항편은 반나절을 확보해 줄 수 있습니다. 늦은 항공편은 가족을 자정 이후 상하이 호텔에 도착하게 할 수 있지만, 가장 빠른 직행 열차는 연결이 편리한 훙차오에 저녁 도착합니다. 비교 기준은 이륙 시각이 아니라 호텔 도착 시각입니다.",
      chooseFlightTitle: "비행기를 선택할 때",
      chooseFlight: [
        "적절한 시간에 직항이 운항할 때.",
        "무리 없이 잠자리에 들 수 있는 시간 전에 상하이 호텔에 도착할 때.",
        "전체 여행이 10박이고 상하이에 온전한 이틀이 필요할 때.",
        "별도 발권한 국제선과 당일 촉박하게 연결하지 않아도 될 때.",
      ],
      chooseTrainTitle: "열차를 선택할 때",
      chooseTrain: [
        "해당 날짜에 가장 빠른 직행 고속열차를 이용할 수 있을 때.",
        "항공편이 너무 늦거나 비싸고 운항 조건이 불편할 때.",
        "훙차오 도착이 다음 호텔이나 열차에 확실히 유리할 때.",
        "공항 절차보다 한 번의 예측 가능한 지상 이동을 선호할 때.",
      ],
      watchTitle: "놓치지 말 것",
      watch: [
        "도시 이름만 보고 상하이 공항을 판단하지 마세요. 실제 항공편이 푸둥(PVG)인지 훙차오(SHA)인지 확인한 뒤 호텔 이동시간을 더하세요.",
        "우링위안에서 공원을 온종일 본 뒤 같은 날 오후 항공편이나 열차를 일정에 무리하게 넣을 수 없습니다.",
        "별도 항공권으로 국제선을 탈 경우 최소 전날 상하이에 도착하세요.",
      ],
    },
  ],
  base: {
    sectionLabel: "장자제의 변수",
    title: "장자제에서 마지막 밤을 어디서 보내느냐에 따라 두 구간의 판단이 달라집니다.",
    intro:
      "‘장자제를 떠난다’는 말은 톈먼산 근처 호텔에서 출발할 수도, 우링위안 공원 관광 뒤 출발할 수도 있습니다. 두 계획은 같지 않습니다.",
    cards: [
      {
        place: "우링위안",
        title: "국가삼림공원 관광일에 유리",
        body:
          "Homeground의 계획용 추정치로 장자제 서역 또는 허화 국제공항까지 약 45–75분을 잡고 교통과 날씨 여유를 더하세요. 후난성 정부의 2024년 4월 안내에는 서역, 도심과 관광지를 잇는 관광버스가 소개되어 있으므로, 현재 노선과 시간표를 다시 확인해야 합니다.",
      },
      {
        place: "장자제 도심",
        title: "톈먼산 또는 다음 날 출발에 유리",
        body:
          "후난성 교통운수청의 2019년 페이지에는 허화 국제공항에서 민항호텔까지 약 20분이라고 적혀 있습니다. 이는 위치를 파악하는 과거 기준으로만 사용하고 현재 지상 교통을 다시 확인하세요. 마지막 밤을 도심에서 보내면 이른 항공편이나 늦은 항공편이 덜 힘듭니다.",
      },
      {
        place: "상하이",
        title: "훙차오 도착과 푸둥 도착은 다릅니다",
        body:
          "직행 열차는 훙차오로 들어옵니다. 항공편은 도시 이름만 보고 공항을 판단하지 말고 실제 편명이 푸둥(PVG)인지 훙차오(SHA)인지 확인한 뒤 호텔 이동시간을 더해 어느 쪽이 실제로 더 이른지 비교하세요.",
      },
    ],
  },
  tripLength: {
    sectionLabel: "전체 여행 길이가 바꾸는 것",
    title: "일정에 여유가 있어야 기차가 ‘희생’이 아닌 취향이 됩니다.",
    intro:
      "같은 이동도 14박 일정에서는 합리적이지만 10박 일정에서는 핵심 관광을 해칠 수 있습니다. 도시 수가 아니라 두 번 이동한 뒤 남는 온전한 관광일을 세세요.",
    options: [
      {
        nights: "10박",
        title: "항공편이 제한된 관광시간을 지켜줍니다",
        body:
          "국제선은 베이징 도착, 상하이 출발로 구성하고 장자제의 온전한 관광일을 확보하며 베이징 구간은 대체로 비행기를 이용하세요. 숙박 거점을 하나 더 추가하면 시간 충돌이 생깁니다. 희망 장소는 요청서에 그대로 남기되, 무엇을 더 빠르게 하거나 줄이거나 선택 일정으로 바꿔야 하는지는 플래너가 설명합니다.",
        rule: "교통 판단: 온전한 관광일 하루하루가 중요할수록 항공편 시각의 영향이 커집니다.",
      },
      {
        nights: "12박",
        title: "열차 이동 하루를 넣기가 쉬워집니다",
        body:
          "시간표가 전체 동선에 유리하면 한 구간을 열차로 선택할 수 있습니다. 느린 하루나 날씨 여유도 넣을 수 있어 이동일을 관광일로 억지 계산하지 않아도 됩니다.",
        rule: "기본: 비행기나 열차를 미리 고집하지 말고 실제 시간표로 각 구간 선택.",
      },
      {
        nights: "14박",
        title: "두 교통수단 모두 가능한 취향 선택이 됩니다",
        body:
          "열차가 핵심 관광을 희생하는 선택이 아니라 실제 취향이 될 수 있습니다. 다른 도시 추가는 순서, 국제선과 장자제 숙박 거점을 먼저 맞춘 뒤 판단합니다.",
        rule: "기본: 속도만이 아니라 편안함과 도착의 질을 최적화.",
      },
    ],
    linkLead: "장자제 안의 일정이 필요하신가요?",
    linkLabel: "2·3·4일에 실제로 가능한 일정 보기",
  },
  travellers: {
    sectionLabel: "동행자에 맞춰 선택",
    title: "가장 빠른 표가 가장 힘든 하루가 될 수도 있습니다.",
    groups: [
      {
        label: "부모님, 아이 또는 고령자와 여행",
        recommendation: "직항 또는 직통 이동과 무리 없는 호텔 도착 시각을 우선하고, 늦은 도착 다음 날 이른 입장 일정을 잡지 마세요.",
      },
      {
        label: "예산 우선 여행자",
        recommendation: "실시간 운임, 수하물, 공항 이동과 잃는 관광 시간까지 비교하세요. 철도가 항상 전체 비용이 저렴한 것은 아닙니다.",
      },
      {
        label: "비행을 피하는 여행자",
        recommendation: "전 구간을 기차로 이동할 수는 있지만 베이징–장자제를 온전한 이동일로 기록하고 가장 합리적인 상하이 직행열차를 고르세요.",
      },
      {
        label: "상하이에서 국제선 출국",
        recommendation: "출국 전날 상하이에서 숙박하고 별도 발권한 국내선을 당일 국제선과 촉박하게 연결하지 마세요.",
      },
    ],
  },
  checklist: {
    sectionLabel: "예약 전",
    title: "실제 날짜로 이 여섯 가지를 확인하세요.",
    intro:
      "공항 하나, 숙소 거점 하나 또는 늦은 도착 한 번이 전체 동선을 바꿉니다. 일반적인 ‘비행기냐 기차냐’ 결론보다 중요한 정보입니다.",
    items: [
      "숙박 박수, 달력상 일수, 온전한 관광일 중 무엇을 세고 있나요?",
      "국제선은 베이징으로 입국하고 상하이에서 출국해 불필요한 되돌아가기를 피하나요?",
      "베이징 항공편이 수도공항(PEK)과 다싱공항(PKX) 중 어디를 사용하나요?",
      "장자제 마지막 밤은 우링위안과 도심 중 어디인가요?",
      "해당 날짜에 직항이 실제 운항하며 상하이 어느 공항에 도착하나요?",
      "역이나 공항이 아니라 다음 호텔에는 몇 시에 도착하나요?",
    ],
  },
  evidence: {
    sectionLabel: "근거와 계산",
    title: "무엇이 공식 정보이고 무엇이 계획 추정치인가요?",
    items: [
      {
        type: "공식 시간표 표본",
        title: "베이징에서 장자제까지 직행 고속열차가 있습니다.",
        finding:
          "2026년 7월 23일 12306 조회에서 G3649는 베이징 서역 10:23 출발, 장자제 서역 22:24 도착으로 12시간 1분이었습니다.",
        sourceIndices: [0, 1],
      },
      {
        type: "공식 시간표 표본",
        title: "장자제에서 상하이까지 여러 직행 고속열차가 있습니다.",
        finding: "같은 날짜 조회에서 상하이 훙차오 직행은 7시간 18분에서 9시간 49분이었습니다.",
        sourceIndices: [0, 2],
      },
      {
        type: "공식 교통 기준",
        title: "장자제 도착 지점은 국가삼림공원 입구가 아닙니다.",
        finding:
          "정부 자료는 허화 국제공항이 도심 가까이에 있고 서역, 도심과 관광지를 연결하는 관광버스가 있음을 설명합니다. 마지막 이동은 일정에 남겨야 합니다.",
        sourceIndices: [4, 5],
      },
      {
        type: "Homeground 계산",
        title: "호텔 간 예상시간에는 티켓에 표시되지 않는 단계까지 포함됩니다.",
        finding:
          "계획값은 호텔 출발, 지상 이동, 출발 여유, 공식 운행시간, 도착 절차와 다음 호텔 이동을 합칩니다. 고정된 시간을 보장하지 않고 범위로 제시합니다.",
        sourceIndices: [],
      },
    ],
    sourceLabel: "출처",
    checkedLabel: "확인",
    checkedDate: "2026년 7월 22일",
  },
  faq: {
    sectionLabel: "자주 묻는 일정 질문",
    title: "티켓을 고르기 전에",
    items: [
      {
        question: "베이징에서 장자제까지 직행 열차가 있나요?",
        answer:
          "네. 2026년 7월 23일 공식 조회 표본에는 베이징 서역에서 장자제 서역까지 약 12시간의 직행 고속열차가 있었습니다. 직행이지만 하루 전체를 사용하며 여행 날짜에는 다시 확인해야 합니다.",
      },
      {
        question: "베이징–장자제 침대열차로 호텔 1박을 아낄 수 있나요?",
        answer:
          "호텔 1박을 대신할 수는 있지만 베이징 관광일은 보존하지 못합니다. 2026년 7월 23일 표본에서 Z295는 베이징 서역을 11:13에 출발해 다음 날 05:20에 장자제 서역에 도착했습니다.",
      },
      {
        question: "장자제발 상하이행 항공편은 어느 공항을 이용하나요?",
        answer:
          "도시 이름만 보고 공항을 판단하지 마세요. 실제 항공편이 푸둥(PVG)인지 훙차오(SHA)인지 확인한 뒤 해당 공항에서 상하이 호텔까지의 이동시간을 더해 열차와 비교하세요.",
      },
      {
        question: "장자제를 관광하고 같은 날 상하이로 갈 수 있나요?",
        answer:
          "오전 일정을 의도적으로 줄이고 늦은 교통편을 선택할 때만 가능합니다. 우링위안 국가삼림공원 온종일 관광과 같은 날 오후 공항 또는 역 이동을 무리 없이 함께 넣기는 어렵습니다.",
      },
      {
        question: "상하이 도착 당일 국제선으로 연결해도 되나요?",
        answer:
          "별도 발권으로 촉박하게 연결하지 않는 편이 좋습니다. 국내선 지연, 푸둥 또는 훙차오의 거리와 분리 발권 시 연결편 보호를 받을 수 없는 점 때문에 전날 상하이 숙박이 안전합니다.",
      },
      {
        question: "상하이–장자제–베이징 역방향이 더 쉬운가요?",
        answer:
          "가능하지만 국제선 도시와 당일 국내 교통편을 알아야 판단할 수 있습니다. 역방향도 호텔 간 시간을 비교하고 장자제의 온전한 관광일을 지키는 원칙은 같습니다.",
      },
    ],
  },
  sources: {
    hiddenTitle: "교통 자료 출처",
    disclosureTitle: "자료 출처와 시간표 유의사항",
    summary: "이 가이드에 사용한 공식 링크와 특정 날짜 기준 시간표 조회 결과",
    intro:
      "철도 결과는 2026년 7월 22일에 7월 23일 여행일로 조회했습니다. 항공편과 열차는 계절 및 운행일에 따라 바뀌므로 결제 전 12306과 실제 운항 항공사를 다시 확인하세요.",
    names: [
      "중국철도 12306 공식 영문 예약·시간표 서비스",
      "12306 수동 조회 기록: 2026년 7월 23일 베이징 서역–장자제 서역, 7월 22일 확인",
      "12306 수동 조회 기록: 2026년 7월 23일 장자제 서역–상하이 훙차오, 7월 22일 확인",
      "후난공항그룹: 2026년 5월 연휴 장자제–베이징·상하이 노선 증편",
      "후난성 교통운수청: 2019년 허화 국제공항 위치와 이동 기준",
      "후난성 정부: 2024년 4월 서역·도심·관광지를 잇는 관광버스",
      "상하이공항공사: 푸둥공항 지상 교통",
    ],
  },
  finalCta: {
    sectionLabel: "먼저 동선의 형태를 확인하세요",
    title: "여행 숙박일수에 이 세 도시가 들어갈까요?",
    body:
      "무료 Route Finder에서 희망 목적지, 총 숙박일수와 여행 속도를 함께 확인하세요. 연락처를 입력하기 전에 시간 판단 결과를 볼 수 있습니다. 이는 1차 동선 점검이며 교통 예약이나 완성 일정은 아닙니다.",
    action: "무료 동선 확인 시작하기",
  },
  structuredData: {
    homeName: "Homeground China",
    aboutName: "베이징–장자제–상하이 교통 계획",
    mentions: ["베이징", "장자제", "상하이", "베이징 서역", "장자제 서역", "장자제 허화 국제공항", "상하이 훙차오역", "상하이 푸둥국제공항"],
  },
};

const copies: Record<HomegroundLocale, TransportGuideCopy> = {
  en: english,
  zh: chinese,
  ko: korean,
};

export function getTransportGuideCopy(locale: HomegroundLocale = "en") {
  return copies[locale];
}
