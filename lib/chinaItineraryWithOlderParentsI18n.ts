import type { HomegroundLocale } from "./homegroundI18n";

export const chinaItineraryWithOlderParentsGuideId =
  "china-itinerary-with-older-parents" as const;

export type ParentGuideSourceId =
  | "palace"
  | "mutianyu"
  | "terracotta"
  | "railway-assistance"
  | "railway-id"
  | "zhangjiajie-access";

export interface ParentGuideSource {
  id: ParentGuideSourceId;
  organization: string;
  title: string;
  url: string;
  additionalLinks?: readonly {
    label: string;
    url: string;
  }[];
  publishedDate?: string;
  checkedDate: string;
  volatility: string;
  usageNote: string;
}

export interface ParentGuideSummaryOption {
  id: "twelve-day" | "comfort-first" | "nature-extension";
  title: string;
  nights: string;
  hotelChanges: string;
  designedFor: string;
  verdict: string;
}

export interface ParentGuideDay {
  day: string;
  title: string;
  plan: string;
  reason: string;
  sourceIds?: readonly ParentGuideSourceId[];
}

export interface ParentGuideVariant {
  id: "comfort-first" | "zhangjiajie";
  title: string;
  nights: string;
  hotelChanges: string;
  pace: string;
  summary: string;
  outline: readonly string[];
  notes: readonly string[];
  sourceIds?: readonly ParentGuideSourceId[];
}

export interface ParentGuideFrictionSection {
  id: "transfer" | "hotel" | "effort";
  title: string;
  intro: string;
  items: readonly string[];
  closing?: string;
  factNote?: string;
  sourceIds?: readonly ParentGuideSourceId[];
}

export interface ParentGuideFaqItem {
  question: string;
  answer: string;
}

export interface ParentGuideRelatedItem {
  title: string;
  description: string;
  href: string;
}

export interface ChinaItineraryWithOlderParentsCopy {
  htmlLang: string;
  pagePath: string;
  homePath: string;
  guidesPath: string;
  plannerContactHref: string;
  metadata: {
    title: string;
    description: string;
    headline: string;
    schemaDescription: string;
    openGraphLocale: string;
  };
  navigation: {
    skipLink: string;
    breadcrumbLabel: string;
    breadcrumbHome: string;
    breadcrumbGuides: string;
    breadcrumbCurrent: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    scopeNote: string;
    reviewedLabel: string;
    reviewedDate: string;
    preparedBy: string;
    highlights: readonly string[];
  };
  summaryOptions: {
    label: string;
    title: string;
    intro: string;
    columns: {
      nights: string;
      hotelChanges: string;
      designedFor: string;
    };
    options: readonly ParentGuideSummaryOption[];
    boundary: string;
  };
  abilityQuestions: {
    title: string;
    intro: string;
    questions: readonly string[];
    boundary: string;
  };
  twelveDay: {
    title: string;
    intro: string;
    days: readonly ParentGuideDay[];
  };
  variants: {
    title: string;
    intro: string;
    options: readonly ParentGuideVariant[];
    closing: string;
  };
  friction: {
    label: string;
    title: string;
    intro: string;
    sections: readonly ParentGuideFrictionSection[];
  };
  support: {
    title: string;
    intro: string;
    highFrictionTitle: string;
    highFrictionDays: readonly string[];
    body: string;
    boundary: string;
  };
  mistakes: {
    title: string;
    items: readonly string[];
  };
  faq: {
    label: string;
    title: string;
    items: readonly ParentGuideFaqItem[];
  };
  sources: {
    title: string;
    intro: string;
    checkedLabel: string;
    checkedDate: string;
    items: readonly ParentGuideSource[];
  };
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    primaryLabel: string;
    secondaryLabel: string;
    primaryHref: string;
    secondaryHref: string;
    boundary: string;
  };
  related: {
    title: string;
    items: readonly ParentGuideRelatedItem[];
  };
  schemaAbout: readonly string[];
}

const english: ChinaItineraryWithOlderParentsCopy = {
  htmlLang: "en",
  pagePath: "/guides/china-itinerary-with-older-parents/",
  homePath: "/",
  guidesPath: "/guides/",
  plannerContactHref: "/#planner-contact",
  metadata: {
    title: "China With Older Parents: A Realistic 12–14 Day Itinerary",
    description:
      "Planning China with older parents? Compare realistic 12- and 14-day routes, with hotel changes, walking, transfer days and recovery time built in.",
    headline: "Taking Your Parents to China?",
    schemaDescription:
      "A practical 12- to 14-day first-trip framework for China with older parents, covering route pace, hotel changes, transfers, walking demands and recovery time.",
    openGraphLocale: "en_US",
  },
  navigation: {
    skipLink: "Skip to the guide",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbGuides: "Guides",
    breadcrumbCurrent: "China with older parents",
  },
  hero: {
    eyebrow: "China itinerary · Older parents",
    title: "Taking Your Parents to China? Build the Route Around Energy, Not Just Cities",
    lead:
      "A China itinerary can look reasonable on a map and still exhaust the people travelling through it. This guide uses Beijing, Xi’an and Shanghai as a 12–14-day first-trip framework, then shows when Zhangjiajie can justify a fourth hotel base.",
    scopeNote:
      "This is a planning framework, not a universal prescription or a medical assessment. The right route depends on the travellers, dates, confirmed transport and current venue conditions.",
    reviewedLabel: "Facts checked",
    reviewedDate: "31 July 2026",
    preparedBy: "Prepared by the Homeground Editorial Team",
    highlights: [
      "12 days: three hotel bases",
      "14 days: add recovery before another city",
      "Judge pace by ability, not age alone",
    ],
  },
  summaryOptions: {
    label: "The answer in 30 seconds",
    title: "Possible and comfortable are not the same promise.",
    intro:
      "For many families planning a first trip, the useful question is not how many city names fit on a map. It is how many check-outs, transfer days, fixed visits and demanding walking days the group can absorb in sequence.",
    columns: {
      nights: "Hotel nights",
      hotelChanges: "Hotel changes",
      designedFor: "Designed for",
    },
    options: [
      {
        id: "twelve-day",
        title: "12-day classic",
        nights: "Beijing 4 · Xi’an 3 · Shanghai 4",
        hotelChanges: "2",
        designedFor:
          "A first visit with headline sights and room to recover between them.",
        verdict: "The strongest starting point for many families.",
      },
      {
        id: "comfort-first",
        title: "14-day comfort-first",
        nights: "Beijing 5 · Xi’an 3 · Shanghai 5",
        hotelChanges: "2",
        designedFor:
          "More recovery time, fewer forced decisions and space for one carefully chosen day trip.",
        verdict: "The most comfortable of the three structures.",
      },
      {
        id: "nature-extension",
        title: "14-day nature extension",
        nights: "Beijing 4 · Xi’an 3 · Zhangjiajie 3 · Shanghai 3",
        hotelChanges: "3",
        designedFor:
          "Independent walkers who place a high priority on mountain scenery.",
        verdict: "Can be workable, but it is not a leisurely route.",
      },
    ],
    boundary:
      "This guide counts calendar days in China. Twelve days usually means eleven hotel nights; fourteen days means thirteen. International flying hours are not counted as sightseeing time.",
  },
  abilityQuestions: {
    title: "Do not plan from age alone.",
    intro:
      "Two people of the same age may need very different routes. One may climb stairs comfortably; another may find an hour standing in a queue more difficult than walking. Before choosing the number of bases, ask:",
    questions: [
      "How long can each traveller walk continuously on level ground?",
      "Are stairs and uneven surfaces manageable with pauses?",
      "Is standing in a queue harder than walking?",
      "How much recovery is normally needed after a full day out?",
      "Can everyone manage their own luggage through a large station?",
      "Is an early start acceptable after a hotel change?",
      "Does anyone use a cane, walker or wheelchair, even occasionally?",
    ],
    boundary:
      "These are travel-planning questions. If a health concern affects the journey, seek advice from the traveller’s own medical professional and confirm access venue by venue.",
  },
  twelveDay: {
    title: "A realistic 12-day route: Beijing, Xi’an and Shanghai",
    intro:
      "This structure protects the international arrival, gives the Great Wall and Terracotta Warriors their own days, and treats both intercity moves as transfer days rather than spare sightseeing time.",
    days: [
      {
        day: "Day 1",
        title: "Arrive in Beijing",
        plan: "Transfer to the hotel, eat nearby and rest. Keep any walk optional.",
        reason:
          "Immigration, luggage, road traffic and fatigue are variable. Do not make a prepaid attraction depend on the arrival running perfectly.",
      },
      {
        day: "Day 2",
        title: "A low-pressure introduction",
        plan:
          "Choose one area: perhaps the Temple of Heaven with lunch, a shorter hutong visit with arranged transport, or a quiet neighbourhood near the hotel.",
        reason:
          "Use it as an early pace check for jet lag, weather, traffic and walking.",
      },
      {
        day: "Day 3",
        title: "The Forbidden City",
        plan:
          "Make the Palace Museum the day’s main sightseeing block. Decide the exit and pickup point before entering; follow the central route first and add side galleries only if energy remains.",
        reason:
          "The Palace Museum does not sell same-day tickets. Tickets currently open at 20:00 China time seven days before the visit. Non-mainland visitors may book with an accepted identity document, including a passport, and must bring the original used for booking. Entry is through the Meridian Gate; visitors leave through the Gate of Divine Prowess or East Prosperity Gate. The museum also publishes two-hour and half-day routes.",
        sourceIds: ["palace"],
      },
      {
        day: "Day 4",
        title: "Mutianyu Great Wall",
        plan:
          "Use arranged transport, the shuttle and cable car where suitable, then choose a deliberately short section of wall. Leave the afternoon free of another major attraction.",
        reason:
          "Official tourism information lists accessible parking, ramps between parking and cable-car areas, rest seating and mobility equipment at a senior service point. These facilities do not certify the wall route as fully step-free. Check current cable-car operation and passenger-suitability rules directly with the operator before relying on it.",
        sourceIds: ["mutianyu"],
      },
      {
        day: "Day 5",
        title: "Beijing to Xi’an",
        plan:
          "Treat this as a transfer day. Keep dinner or a short walk optional after check-in.",
        reason:
          "The real journey includes check-out, station access, security, waiting, luggage, arrival pickup and another check-in.",
      },
      {
        day: "Day 6",
        title: "Terracotta Warriors",
        plan:
          "Begin with the main museum complex and decide later whether to continue to Lishan Garden. Let the group’s experience of crowds, standing, temperature and walking make that decision.",
        reason:
          "The official guide describes two areas, each generally requiring about 1.5 hours, with a free shuttle between them. Wheelchair rental is listed, but availability is not guaranteed. Visitors booking with passport information must carry the original valid document used. Verify any senior concession in the live booking flow rather than promising it.",
        sourceIds: ["terracotta"],
      },
      {
        day: "Day 7",
        title: "Xi’an at the family’s pace",
        plan:
          "Choose one direction: a short section of the City Wall, one museum, the Bell and Drum Tower area, or a food-focused neighbourhood visit.",
        reason:
          "The day can absorb a slower morning or an overrun from Day 6. Cycling the whole wall is optional.",
      },
      {
        day: "Day 8",
        title: "Xi’an to Shanghai",
        plan:
          "Protect the second transfer day. Compare train and flight door to door, using the actual hotels, departure time, luggage and arrival pickup.",
        reason:
          "Ticket time does not show the energy left after a full base change.",
      },
      {
        day: "Day 9",
        title: "A selected stretch of the Bund",
        plan:
          "Choose the views the family values, set a clear pickup point and add a seated meal or short cruise if suitable.",
        reason:
          "Aim for a good Shanghai day, not the entire waterfront on foot.",
      },
      {
        day: "Day 10",
        title: "Museum or neighbourhood day",
        plan:
          "Choose one museum or neighbourhood. Check the exact branch, exhibition and reservation rule before travel.",
        reason:
          "An indoor day is less weather-dependent and changes the trip’s physical rhythm.",
      },
      {
        day: "Day 11",
        title: "The flexible day",
        plan:
          "Use it for a local Shanghai day, one carefully chosen Suzhou or Hangzhou excursion, shopping and food, or genuine rest.",
        reason:
          "It can absorb weather, tiredness, a changed reservation or a new interest.",
      },
      {
        day: "Day 12",
        title: "Departure",
        plan: "Keep the schedule dependent only on the flight and airport transfer.",
        reason:
          "Avoid exposing departure to a distant visit or another hotel move.",
      },
    ],
  },
  variants: {
    title: "How to use two additional days",
    intro:
      "Fourteen days does not automatically justify another hotel. First decide whether the family gains more from recovery and choice, or from a new landscape that matters enough to accept another transfer.",
    options: [
      {
        id: "comfort-first",
        title: "14 days: comfort first",
        nights: "Beijing 5 · Xi’an 3 · Shanghai 5",
        hotelChanges: "2",
        pace: "The more forgiving route",
        summary:
          "The additional Beijing day lets another major sight stand alone. The additional Shanghai day can protect the end of the trip, make one day trip possible without sacrificing the city, or remain genuinely free.",
        outline: [
          "Beijing: five nights, including the arrival night",
          "Xi’an: three nights",
          "Shanghai: five nights, including the night before departure",
        ],
        notes: [
          "Only two hotel changes across the journey.",
          "More room to change a plan after seeing how the group feels.",
          "A free day is useful even if it never becomes another excursion.",
        ],
      },
      {
        id: "zhangjiajie",
        title: "14 days: add Zhangjiajie",
        nights: "Beijing 4 · Xi’an 3 · Zhangjiajie 3 · Shanghai 3",
        hotelChanges: "3",
        pace: "Realistic for the right group, not leisurely",
        summary:
          "Use this structure only when mountain scenery is a leading reason for the trip and the travellers can walk independently, handle several internal transfers and recover well from moving days.",
        outline: [
          "Days 1–4: Beijing",
          "Days 5–7: Xi’an",
          "Day 8: travel and settle into the chosen Zhangjiajie base",
          "Day 9: one National Forest Park route",
          "Day 10: Tianmen Mountain, subject to current route and operation",
          "Days 11–13: Shanghai",
          "Day 14: departure",
        ],
        notes: [
          "This version contains three intercity transfer days and two weather-sensitive mountain days.",
          "Do not add the Grand Canyon, a long evening show and another ancient town simply because the names fit inside three calendar boxes.",
          "A Hunan government report dated 25 March 2026 said three designated routes in Golden Whip Stream, Yuanjiajie and Tianzi Mountain had “basically achieved barrier-free touring throughout.” It is not a technical access map and does not guarantee every entrance, transfer or viewpoint is step-free. Wheelchair users and travellers using mobility aids should confirm the exact entrance, lift or cableway, vehicle access and staff assistance for the chosen route before treating it as viable.",
        ],
        sourceIds: ["zhangjiajie-access"],
      },
    ],
    closing:
      "A fourth base should earn its place through something the family deeply values. If it mainly produces another check-out and two partial days, use the time to strengthen the first three bases instead.",
  },
  friction: {
    label: "What the map hides",
    title: "The hardest parts are often between the attractions.",
    intro:
      "Older-parent planning is not about making every day empty. It is about finding the chains that concentrate luggage, standing, uncertain access and early starts before they become a problem.",
    sections: [
      {
        id: "transfer",
        title: "A transfer day costs more than the ticket time.",
        intro:
          "A traveller experiences the entire move, not only the hours printed beside a train or flight.",
        items: [
          "Pack, check out and reach a large station or airport.",
          "Complete identity checks and security, find the waiting area and reach the correct carriage or gate.",
          "Board with luggage and make the scheduled journey.",
          "Navigate the destination, locate the pickup and drive to the next hotel.",
          "Check in, learn a new neighbourhood and decide whether any planned activity still deserves to remain.",
        ],
        closing:
          "Planning rule: if a day contains an intercity move and a hotel change, do not make a must-see attraction depend on that move running perfectly.",
        factNote:
          "China Railway’s special-assistance service is for passengers who need special care because of age, physical condition or similar circumstances, including travellers who rely on mobility aids. It is not automatic for everyone over 60. Online requests must be submitted at least six hours before departure. If less than six hours remain, request help at the departure station no later than 60 minutes before departure. Each connecting train requires a separate request. Railway staff may verify identity, ticket, need and supporting documents, and may refuse service when conditions are not met. Carry the original valid identity document used to buy the ticket, such as the passport used for booking.",
        sourceIds: ["railway-assistance", "railway-id"],
      },
      {
        id: "hotel",
        title: "Hotel location can matter more than another star.",
        intro:
          "A five-star hotel in the wrong place can create more work than a well-run four-star hotel beside the actual route. “Good location” depends on the days the family will take.",
        items: [
          "Can a vehicle stop close to the entrance?",
          "Is there a step-free route from the vehicle to the room?",
          "Are the lifts reliable, and can a suitable shower or room near the lift be requested?",
          "Can breakfast work with fixed-entry days, and can dinner be reached without another long journey?",
          "Is the hotel practical for the correct railway station or airport?",
          "Would changing hotels reduce real effort, or only create another check-out?",
        ],
      },
      {
        id: "effort",
        title: "Daily step counts do not show the difficult parts.",
        intro:
          "Ten thousand flat, self-paced steps with regular seating may be easier than six thousand steps with a steep approach, uneven paving, an hour standing and no convenient pickup.",
        items: [
          "What is the longest continuous walking section?",
          "Which surfaces, gradients and stairs are unavoidable?",
          "How long could the traveller be standing or queuing?",
          "Where is the first reliable place to sit?",
          "Can part of the route be removed without ruining the day?",
          "What is scheduled the following morning?",
        ],
        closing:
          "The useful unit is not only distance. It is continuous effort followed by the time available to recover.",
      },
    ],
  },
  support: {
    title: "Where private planning support creates the most value",
    intro:
      "The answer is not necessarily a guide beside the family every hour. Support often matters most on days with fixed entrances, luggage, large stations or complicated internal transport; free afternoons can remain free.",
    highFrictionTitle: "High-friction moments to plan as one journey",
    highFrictionDays: [
      "International arrival and the first hotel transfer",
      "Railway-station or airport moves with luggage",
      "The Forbidden City’s fixed entrance and separate exits",
      "The Great Wall and Terracotta Warriors",
      "Zhangjiajie entrances, shuttles, lifts and cableways",
      "Any day combining a hotel change with a fixed reservation",
    ],
    body:
      "Homeground plans the trip as a whole. Where local guides, drivers or booking support are included, their roles are coordinated around the itinerary rather than treated as disconnected add-ons.",
    boundary:
      "The exact planning, booking and on-trip responsibilities are confirmed in writing before paid work begins. Current transport, venue and access conditions still require a final date-specific check.",
  },
  mistakes: {
    title: "Seven mistakes to remove before booking",
    items: [
      "Counting the international arrival as a full sightseeing day.",
      "Adding a fourth city before protecting the first three bases.",
      "Putting an early fixed-entry attraction after a late transfer.",
      "Choosing hotels from star ratings without checking location and access.",
      "Treating a cable car or lift as proof of a fully step-free route.",
      "Promising a senior concession before confirming the passport and live booking conditions.",
      "Filling every free half-day before seeing how the family actually feels.",
    ],
  },
  faq: {
    label: "Common planning questions",
    title: "Practical answers for a first trip with parents",
    items: [
      {
        question: "How many days should I allow for China with older parents?",
        answer:
          "For Beijing, Xi’an and Shanghai, twelve days is a useful starting point. Fourteen gives more recovery time and room for a day trip or another region.",
      },
      {
        question: "How many cities fit into twelve days?",
        answer:
          "For a comfort-first trip, use three hotel bases. A fourth adds another check-out and increases dependence on favourable transport and good recovery.",
      },
      {
        question: "Is an eight-day Beijing–Xi’an–Shanghai trip possible?",
        answer:
          "Yes, but it is compact and leaves less margin for jet lag, tiredness, fixed tickets and hotel changes. Possible does not mean comfortable for every family.",
      },
      {
        question: "Is high-speed rail suitable for older travellers?",
        answer:
          "Often, yes. Station size, luggage, boarding distance, departure time and pickup arrangements may matter more than the difference between train classes.",
      },
      {
        question: "Is the Great Wall suitable for older parents?",
        answer:
          "Mutianyu can reduce some climbing through shuttles and cable-car options, but the wall itself still has uneven sections and stairs. Check the individual traveller, current cable-car operation and passenger-suitability rules before relying on it.",
      },
      {
        question: "Is Zhangjiajie suitable for older travellers?",
        answer:
          "It can be for independent walkers who can handle transfers, queues and some uneven terrain. A lift or cableway does not make the entire route step-free. Travellers using mobility aids need a detailed, route-specific access check.",
      },
      {
        question: "Should we use a private guide and driver every day?",
        answer:
          "Not necessarily. Their value is usually highest on fixed-reservation days, large-station transfers, mountain routes and days with luggage. The level of support should match the difficult parts rather than fill every free hour.",
      },
    ],
  },
  sources: {
    title: "Official sources and update notes",
    intro:
      "Ticketing, transport, assistance and access conditions can change. The dated statements below were checked against the listed official sources; recheck the live rule for the family’s actual travel date before booking.",
    checkedLabel: "Page facts checked",
    checkedDate: "31 July 2026",
    items: [
      {
        id: "palace",
        organization: "The Palace Museum",
        title: "Official booking rules and visitor information",
        url: "https://www.dpm.org.cn/subject_booking/",
        additionalLinks: [
          {
            label: "Official visitor information",
            url: "https://www.dpm.org.cn/Visit.html",
          },
          {
            label: "International visitor information",
            url: "https://intl.dpm.org.cn/visit.html",
          },
        ],
        checkedDate: "2026-07-31",
        volatility: "High — booking rules should be checked again before purchase.",
        usageNote:
          "Supports the booking window, accepted identity documents, entrance and exit arrangement, and official shorter routes.",
      },
      {
        id: "mutianyu",
        organization: "Beijing Municipal tourism information and Mutianyu operator",
        title: "Visitor facilities and cable-car information",
        url: "https://english.visitbeijing.com.cn/article/4NlmchKDzhY",
        additionalLinks: [
          {
            label: "Mutianyu visitor information",
            url: "https://www.mutianyugreatwall.com/cnInformation",
          },
          {
            label: "Mutianyu cable-car safety rules",
            url: "https://www.mutianyugreatwall.com/cndetailcon1101",
          },
        ],
        checkedDate: "2026-07-31",
        volatility: "High — operation and passenger-suitability rules can change.",
        usageNote:
          "Supports the listed facilities while explicitly not certifying the wall route as fully step-free.",
      },
      {
        id: "terracotta",
        organization: "Emperor Qinshihuang’s Mausoleum Site Museum",
        title: "Official visitor guide",
        url: "https://www.bmy.com.cn/guide/",
        checkedDate: "2026-07-31",
        volatility: "High — reservations, services and concessions should be rechecked.",
        usageNote:
          "Supports the two visitor areas, estimated time, free shuttle, listed wheelchair rental and identity-document requirements. Wheelchair availability and senior concessions are not promised.",
      },
      {
        id: "railway-assistance",
        organization: "China Railway 12306",
        title: "Special-assistance request rules",
        url: "https://kyfw.12306.cn/otn/view/icentre_qxyyInfo.html",
        additionalLinks: [
          {
            label: "Railway ticket notice",
            url: "https://kyfw.12306.cn/otn/view/ticket_notice.html",
          },
        ],
        checkedDate: "2026-07-31",
        volatility: "High — request windows and eligibility should be rechecked.",
        usageNote:
          "Supports eligibility boundaries, the six-hour online window, the 60-minute station request deadline and separate requests for connecting trains.",
      },
      {
        id: "railway-id",
        organization: "China Railway 12306",
        title: "English ticket and identity-document guidance",
        url: "https://www.12306.cn/en/faq.html?item=2",
        checkedDate: "2026-07-31",
        volatility: "Medium — recheck the document used for the live booking.",
        usageNote:
          "Supports carrying the original valid identity document used to purchase the ticket, such as the passport used for booking.",
      },
      {
        id: "zhangjiajie-access",
        organization: "Hunan Provincial Government",
        title: "Report on three designated barrier-free touring routes",
        url: "https://www.hunan.gov.cn/hnszf/hnyw/sy/hnyw1/202603/t20260325_33940630.html",
        additionalLinks: [
          {
            label: "Hunan transport-facility update",
            url: "https://amr.hunan.gov.cn/amr/xxx/szdtx/202604/t20260427_33965078.html",
          },
        ],
        publishedDate: "2026-03-25",
        checkedDate: "2026-07-31",
        volatility:
          "High — this is a government news report, not a technical access certification.",
        usageNote:
          "The report does not provide a technical access map or guarantee every entrance, transfer and viewpoint is step-free. Confirm the chosen route individually.",
      },
    ],
  },
  cta: {
    eyebrow: "Plan the journey as a whole",
    title: "Planning China with your parents?",
    body:
      "Whether you are starting with a blank page or already have a draft route, tell us your dates, who is travelling and anything already fixed. A Homeground trip planner can ask the remaining questions in conversation and help shape a workable private journey.",
    primaryLabel: "Contact a trip planner",
    secondaryLabel: "Email Homeground",
    primaryHref: "/#planner-contact",
    secondaryHref: "/#planner-contact",
    boundary:
      "You do not need to complete a long travel form first. Scope, responsibilities and any price or quote are confirmed before paid work begins.",
  },
  related: {
    title: "Continue planning",
    items: [
      {
        title: "Is Your China Itinerary Too Rushed?",
        description:
          "Test any draft route for base changes, full transfer days, fixed bookings and recovery time.",
        href: "/guides/is-your-china-itinerary-too-rushed/",
      },
      {
        title: "Beijing–Zhangjiajie–Shanghai: What the Travel Days Cost",
        description:
          "A door-to-door comparison of the long transport legs that disappear on a simple route map.",
        href: "/guides/beijing-zhangjiajie-shanghai-transport/",
      },
      {
        title: "Zhangjiajie with Older Travellers",
        description:
          "A closer look at route conditions, internal transport and questions to confirm before adding the mountains.",
        href: "/guides/zhangjiajie-older-travellers/",
      },
    ],
  },
  schemaAbout: [
    "China itineraries",
    "Travel with older parents",
    "Accessible travel planning",
    "Beijing",
    "Xi’an",
    "Shanghai",
    "Zhangjiajie",
  ],
};

const chinese: ChinaItineraryWithOlderParentsCopy = {
  htmlLang: "zh-Hans",
  pagePath: "/zh/guides/china-itinerary-with-older-parents/",
  homePath: "/zh/",
  guidesPath: "/zh/guides/",
  plannerContactHref: "/zh/#planner-contact",
  metadata: {
    title: "带父母来中国：一条现实可行的12–14天路线",
    description:
      "带年长父母来中国，12天或14天怎样安排才不过度疲劳？比较住宿基地、转场、步行强度、固定预约和恢复时间。",
    headline: "带父母来中国，路线该怎样安排？",
    schemaDescription:
      "一份面向首次带年长父母来中国旅行的12至14天路线框架，涵盖住宿搬迁、门到门转场、步行负担与恢复时间。",
    openGraphLocale: "zh_CN",
  },
  navigation: {
    skipLink: "跳到指南正文",
    breadcrumbLabel: "面包屑导航",
    breadcrumbHome: "首页",
    breadcrumbGuides: "旅行指南",
    breadcrumbCurrent: "带父母来中国",
  },
  hero: {
    eyebrow: "中国路线 · 年长父母同行",
    title: "带父母来中国，不要只按城市数量排路线",
    lead:
      "一条路线在地图上看起来很顺，真正走起来仍可能让同行的人精疲力尽。这份指南以北京、西安和上海为12至14天首次中国之行的基础，再判断张家界是否值得成为第四个住宿基地。",
    scopeNote:
      "这是一套旅行规划框架，不是适合所有人的固定答案，也不构成医疗评估。真正的路线取决于同行者、日期、已确认交通和景区当期条件。",
    reviewedLabel: "事实核验",
    reviewedDate: "2026年7月31日",
    preparedBy: "Homeground 编辑团队整理",
    highlights: [
      "12天：三个住宿基地",
      "14天：先增加恢复时间",
      "按实际能力判断，不只看年龄",
    ],
  },
  summaryOptions: {
    label: "30秒看懂",
    title: "“走得通”和“走得舒服”不是同一个承诺。",
    intro:
      "对许多第一次带父母来中国的家庭，真正的问题不是地图上能放几个城市，而是连续的退房、转场、固定预约和高强度步行日，同行者能不能承受。",
    columns: {
      nights: "住宿晚数",
      hotelChanges: "换酒店次数",
      designedFor: "适合",
    },
    options: [
      {
        id: "twelve-day",
        title: "12天经典版",
        nights: "北京4晚 · 西安3晚 · 上海4晚",
        hotelChanges: "2",
        designedFor: "第一次来中国，保留主要体验，同时让高强度日之间有恢复空间。",
        verdict: "对许多家庭来说，这是最稳妥的起点。",
      },
      {
        id: "comfort-first",
        title: "14天舒适优先版",
        nights: "北京5晚 · 西安3晚 · 上海5晚",
        hotelChanges: "2",
        designedFor: "增加恢复和选择余地，并留出一次经过筛选的一日游。",
        verdict: "三种结构中最从容的一种。",
      },
      {
        id: "nature-extension",
        title: "14天自然延伸版",
        nights: "北京4晚 · 西安3晚 · 张家界3晚 · 上海3晚",
        hotelChanges: "3",
        designedFor: "能独立步行，而且把山景列为核心愿望的同行者。",
        verdict: "合适的人可以执行，但不能称为轻松路线。",
      },
    ],
    boundary:
      "本文按在中国的日历天数计算。12天通常对应11个酒店夜晚，14天对应13个夜晚；国际飞行时间不当作观光时间。",
  },
  abilityQuestions: {
    title: "不要只按年龄判断。",
    intro:
      "年龄相同的两个人，可能需要完全不同的路线。有人能轻松爬台阶，有人站着排队一小时比走路更累。决定住宿基地数量前，先问：",
    questions: [
      "每位同行者能在平地上连续走多久？",
      "台阶和不平整地面在适当休息后能否应对？",
      "站着排队是否比走路更难受？",
      "完整外出一天后通常需要多久恢复？",
      "每个人能否在大型车站自己处理行李？",
      "换酒店后的第二天能否接受早起？",
      "是否有人偶尔也会使用手杖、助行器或轮椅？",
    ],
    boundary:
      "这些是旅行规划问题。若健康状况会影响旅行，应咨询旅客自己的医疗专业人士，并逐个场所确认无障碍和协助条件。",
  },
  twelveDay: {
    title: "一条现实的12天路线：北京、西安、上海",
    intro:
      "这套结构保护国际抵达日，给长城和兵马俑各留一个完整主场景，并把两次跨城移动视为转场日，而不是剩余观光时间。",
    days: [
      {
        day: "第1天",
        title: "抵达北京",
        plan: "前往酒店、在附近吃饭并休息。散步可以有，但必须是可取消的。",
        reason:
          "入境、行李、机场道路和疲劳都存在变量，不要让已经付费的景点依赖国际航班完全准时。",
      },
      {
        day: "第2天",
        title: "低压力认识北京",
        plan:
          "只选一个主要区域，例如天坛加一顿坐下来吃的午餐、配合车辆的短版胡同游，或酒店附近的安静街区。",
        reason:
          "这一天能先看清时差、天气、交通和步行对家人的实际影响，再进入北京两个更费体力的日子。",
      },
      {
        day: "第3天",
        title: "故宫",
        plan:
          "把故宫博物院作为当天唯一的主要参观板块。进门前确定离院门和接车点，先走中轴路线，有余力再增加支线展馆。",
        reason:
          "故宫博物院不售当日票，门票于参观前7日20:00（中国时间）开始预约。非中国内地观众可以使用护照等获认可的有效证件预约，并须携带预约时使用的证件原件。观众由午门入院，可由神武门或东华门离院；官网也提供两小时游和半日游推荐路线。",
        sourceIds: ["palace"],
      },
      {
        day: "第4天",
        title: "慕田峪长城",
        plan:
          "使用事先安排的交通，并在条件适合时使用摆渡车和缆车；城墙只选一段短路线，下午不再塞入另一个大型景点。",
        reason:
          "北京市官方旅游信息列出了无障碍停车位、停车区域与缆车区域之间的防滑坡道、休息座位，以及老年服务点的部分行动辅助设备。这些设施不代表城墙路线全程无台阶。依赖缆车安排行程前，应向运营方确认当日运行和乘客适乘条件。",
        sourceIds: ["mutianyu"],
      },
      {
        day: "第5天",
        title: "北京到西安",
        plan: "把这一天当作转场日。入住后只保留无需预约的晚餐或短距离散步。",
        reason:
          "真实旅程还包括退房、去车站、进站安检、候车、带行李上车、抵达接车和再次入住。",
      },
      {
        day: "第6天",
        title: "兵马俑",
        plan:
          "先参观兵马俑博物馆，再根据现场人流、站立时间、温度和步行状态决定是否继续前往丽山园。",
        reason:
          "官方导览显示两处区域各约需1.5小时，并有免费摆渡车往返。官网列有轮椅租赁，但不保证数量或随到随有。使用护照信息预约时须携带预约所用有效证件原件；老年优惠应在实时购票流程中确认，不能预先承诺。",
        sourceIds: ["terracotta"],
      },
      {
        day: "第7天",
        title: "按家人节奏看西安",
        plan:
          "只选一个方向：城墙短段、一座博物馆、钟鼓楼区域，或以饮食为主的街区体验。",
        reason:
          "这一天可以容纳一个较晚的早晨，也能补偿前一天超时。骑完整段城墙是一种选择，不是默认安排。",
      },
      {
        day: "第8天",
        title: "西安到上海",
        plan:
          "保护第二个转场日。用实际酒店、出发时间、行李和抵达接车，比较火车与飞机的门到门过程。",
        reason: "票面运行时间并不能说明完整换城后还剩多少可用体力。",
      },
      {
        day: "第9天",
        title: "外滩的一段",
        plan:
          "选择家人真正想看的江景段，事先确定接车点，并在合适时搭配坐下用餐或短程游船。",
        reason: "目标是过好上海的一天，而不是用双脚完成整条滨水区域。",
      },
      {
        day: "第10天",
        title: "博物馆或街区",
        plan:
          "选择一座博物馆或一个街区，不要反复横穿上海。出发前确认具体馆址、展览与预约规则。",
        reason: "室内日受天气影响较小，也能改变整段行程的体力节奏。",
      },
      {
        day: "第11天",
        title: "弹性日",
        plan:
          "用于上海本地、一次经过筛选的苏州或杭州一日游、购物与饮食，或者真正休息。",
        reason:
          "这块未被占满的时间可以吸收天气、疲劳、预约变化，或者抵达后才发现的新兴趣。",
      },
      {
        day: "第12天",
        title: "离境",
        plan: "当天安排只依赖航班和机场接送。",
        reason: "不要让旅程最后一天暴露在远途一日游、固定预约或再次换酒店的风险中。",
      },
    ],
  },
  variants: {
    title: "多出的两天应该怎样用",
    intro:
      "14天不等于必须多住一个城市。先判断家人从恢复和选择余地中得到的价值，是否高于一个新目的地带来的额外转场。",
    options: [
      {
        id: "comfort-first",
        title: "14天：舒适优先",
        nights: "北京5晚 · 西安3晚 · 上海5晚",
        hotelChanges: "2",
        pace: "更有容错空间",
        summary:
          "北京增加的一天能让另一个大型景点单独成日；上海增加的一天可以保护旅程结尾、安排一次一日游而不牺牲上海，或者保持真正空白。",
        outline: [
          "北京5晚，包括抵达夜",
          "西安3晚",
          "上海5晚，包括离境前一晚",
        ],
        notes: [
          "全程只有两次换酒店。",
          "到现场看清家人状态后，还有调整余地。",
          "即使最后没有变成一日游，空白日仍然有价值。",
        ],
      },
      {
        id: "zhangjiajie",
        title: "14天：加入张家界",
        nights: "北京4晚 · 西安3晚 · 张家界3晚 · 上海3晚",
        hotelChanges: "3",
        pace: "对合适的人可执行，但不轻松",
        summary:
          "只有当山景是全家最重要的旅行理由之一，而且同行者能独立步行、应对景区内部换乘并在移动日后恢复良好时，才采用这套结构。",
        outline: [
          "第1–4天：北京",
          "第5–7天：西安",
          "第8天：转场并入住经过判断的张家界住宿基地",
          "第9天：国家森林公园一条路线",
          "第10天：天门山，取决于当期路线与运行情况",
          "第11–13天：上海",
          "第14天：离境",
        ],
        notes: [
          "这套路线包含三个跨城转场日和两个受天气影响的山区日。",
          "不要因为名称能塞进日历，就继续加入大峡谷、长时间晚间演出和另一座古镇。",
          "湖南省政府2026年3月25日发布的报道指出，金鞭溪、袁家界和天子山的三条指定精品线路“基本实现全程无障碍游览”。该报道不是技术性无障碍地图，也不保证每个入口、换乘和观景点都无台阶。轮椅或助行器使用者应逐项确认所选路线的入口、升降机或索道、车辆通行和工作人员协助后，再判断是否可执行。",
        ],
        sourceIds: ["zhangjiajie-access"],
      },
    ],
    closing:
      "第四个住宿基地必须用家人非常重视的体验证明自己的价值。如果它主要带来一次退房和两个残缺日，就把时间用于强化前三个基地。",
  },
  friction: {
    label: "地图没有显示的部分",
    title: "最累的环节，往往发生在景点之间。",
    intro:
      "带年长父母规划，不是把每一天排空，而是提前找出行李、站立、准入不确定性和连续早起集中出现的链条。",
    sections: [
      {
        id: "transfer",
        title: "转场日的成本不只是一张车票。",
        intro: "旅客经历的是完整换城，不是火车或飞机票面上的几个小时。",
        items: [
          "收拾行李、退房并前往大型车站或机场。",
          "核验证件、安检、寻找候车区并走到正确车厢或登机口。",
          "携带行李上车，并完成票面旅程。",
          "在目的地找到出口和接车点，再前往下一家酒店。",
          "办理入住、熟悉新区域，并重新判断当天原计划是否还值得保留。",
        ],
        closing:
          "规划原则：一天内既跨城又换酒店时，不要让一个必去景点依赖转场完美运行。",
        factNote:
          "中国铁路的特殊重点旅客预约服务面向因年龄、身体状况等原因需要特殊照顾的旅客，包括依靠行动辅助器具出行者，并非所有60岁以上旅客均可自动获得。线上申请须在开车前至少6小时提交；不足6小时时，应在乘车站现场提出申请，且不得晚于开车前60分钟。中转换乘行程须按每段列车分别申请。铁路部门可以核验身份、车票、实际需求和证明材料，不符合条件时可以拒绝服务。乘车时应携带购票所用有效身份证件原件，例如预约时使用的护照。",
        sourceIds: ["railway-assistance", "railway-id"],
      },
      {
        id: "hotel",
        title: "酒店位置可能比多一颗星更重要。",
        intro:
          "位置错误的五星级酒店，可能比贴着实际路线的优质四星酒店更费力。“位置好”取决于这家人真正要过的每一天。",
        items: [
          "车辆能否停在接近入口的位置？",
          "从下车点到房间是否有无台阶路线？",
          "电梯是否可靠，能否申请适合的淋浴或靠近电梯的房间？",
          "早餐时间是否配合固定预约日，晚餐是否需要再次长途移动？",
          "酒店是否方便前往正确的火车站或机场？",
          "换酒店真的减少了体力负担，还是只增加一次退房？",
        ],
      },
      {
        id: "effort",
        title: "每日步数看不见真正困难的部分。",
        intro:
          "一万步平路、按自己速度行走并定期坐下，可能比六千步陡坡、不平地面、一小时站立和没有接车点更轻松。",
        items: [
          "最长的连续步行段有多长？",
          "哪些路面、坡度和台阶无法避开？",
          "可能要站立或排队多久？",
          "第一个可靠的休息座位在哪里？",
          "能否删掉一段而不破坏当天体验？",
          "第二天早晨安排了什么？",
        ],
        closing: "有用的单位不只是距离，而是连续消耗以及之后是否有恢复时间。",
      },
    ],
  },
  support: {
    title: "私人规划最能在哪些地方创造价值",
    intro:
      "答案不一定是让导游每小时都陪在身边。真正需要支持的，往往是固定入口、行李、大型车站和内部交通复杂的日子；自由下午仍可以保持自由。",
    highFrictionTitle: "应该当作一段完整旅程处理的高摩擦环节",
    highFrictionDays: [
      "国际抵达和第一次酒店接送",
      "带行李的火车站或机场转场",
      "故宫固定入口和不同离院门",
      "长城与兵马俑",
      "张家界的入口、摆渡车、升降机和索道",
      "任何同时换酒店又有固定预约的日子",
    ],
    body:
      "Homeground 从整段旅程出发进行规划。当约定范围包含当地导游、司机或预约支持时，这些角色会围绕同一份行程协调，而不是成为互不衔接的附加产品。",
    boundary:
      "付费工作开始前，会书面确认具体规划、预订和在途责任。交通、景区和无障碍条件仍需按实际出行日期做最终复核。",
  },
  mistakes: {
    title: "预订前应该删除的七个错误",
    items: [
      "把国际抵达日当成完整观光日。",
      "前三个基地还没保护好，就先加入第四个城市。",
      "在晚间转场后的第二天安排很早的固定入场。",
      "只看酒店星级，不检查位置和通行条件。",
      "把缆车或电梯当成全程无台阶的证明。",
      "没有核对护照和实时购票条件，就承诺老年优惠。",
      "还不知道家人现场状态，就先填满所有空白半天。",
    ],
  },
  faq: {
    label: "常见规划问题",
    title: "第一次带父母来中国的现实答案",
    items: [
      {
        question: "带年长父母来中国应该安排多少天？",
        answer:
          "如果第一次以北京、西安和上海为主，12天是一个有用的起点。14天能增加恢复时间，也更容易容纳一次一日游或认真考虑另一个地区。",
      },
      {
        question: "12天适合放几个城市？",
        answer:
          "舒适优先时，使用三个住宿基地。第四个基地可能在物理上走得通，但会增加一次退房，也让更多行程依赖交通顺利和恢复良好。",
      },
      {
        question: "8天走北京—西安—上海可以吗？",
        answer:
          "可以，但非常紧凑。它给时差、疲劳、固定票务和换酒店留下的余量更少。运营上走得通，不代表同样速度适合每个家庭。",
      },
      {
        question: "高铁适合年长旅客吗？",
        answer:
          "很多时候适合，但座位只是判断的一部分。车站大小、行李、上车距离、出发时间和抵达接车，可能比座位等级差异更重要。",
      },
      {
        question: "长城适合年长父母吗？",
        answer:
          "慕田峪可通过摆渡车和缆车选项减少部分攀爬，但城墙仍有不平路段和台阶。依赖缆车前，需要同时确认个人能力、当日运行和乘客适乘条件。",
      },
      {
        question: "张家界适合年长旅客吗？",
        answer:
          "对能独立步行、应对多次换乘、排队和部分不平地面的旅客，可以适合。电梯或索道不代表全程无台阶；使用行动辅助器具的人需要逐路线核查。",
      },
      {
        question: "每天都需要私人导游和司机吗？",
        answer:
          "不一定。他们的价值通常集中在固定预约、大型车站转场、山区路线和带行李的日子。支持强度应该对应真正困难的部分，而不是占满每个自由小时。",
      },
    ],
  },
  sources: {
    title: "官方来源与更新说明",
    intro:
      "票务、交通、协助和无障碍条件都会变化。以下事实截至标注日期已通过所列官方来源复核；预订前仍应按家人的实际出行日期确认实时规则。",
    checkedLabel: "本页事实核验",
    checkedDate: "2026年7月31日",
    items: [
      {
        id: "palace",
        organization: "故宫博物院",
        title: "官方预约规则与参观信息",
        url: "https://www.dpm.org.cn/subject_booking/",
        additionalLinks: [
          {
            label: "官方参观信息",
            url: "https://www.dpm.org.cn/Visit.html",
          },
          {
            label: "国际访客信息",
            url: "https://intl.dpm.org.cn/visit.html",
          },
        ],
        checkedDate: "2026-07-31",
        volatility: "高：购票前应再次确认预约规则。",
        usageNote:
          "用于支持预约窗口、认可证件、入院与离院安排，以及官方短路线。",
      },
      {
        id: "mutianyu",
        organization: "北京市官方旅游信息与慕田峪运营方",
        title: "游客设施与缆车信息",
        url: "https://english.visitbeijing.com.cn/article/4NlmchKDzhY",
        additionalLinks: [
          {
            label: "慕田峪参观信息",
            url: "https://www.mutianyugreatwall.com/cnInformation",
          },
          {
            label: "慕田峪缆车安全规则",
            url: "https://www.mutianyugreatwall.com/cndetailcon1101",
          },
        ],
        checkedDate: "2026-07-31",
        volatility: "高：运行状态和乘客适乘条件可能变化。",
        usageNote:
          "用于支持已列设施，但不证明城墙游览路线全程无台阶。",
      },
      {
        id: "terracotta",
        organization: "秦始皇帝陵博物院",
        title: "官方参观指南",
        url: "https://www.bmy.com.cn/guide/",
        checkedDate: "2026-07-31",
        volatility: "高：预约、便民服务和优惠条件都应复核。",
        usageNote:
          "用于支持两处区域、建议时间、免费摆渡车、所列轮椅租赁和证件要求；不承诺轮椅供应或老年优惠。",
      },
      {
        id: "railway-assistance",
        organization: "中国铁路12306",
        title: "特殊重点旅客预约规则",
        url: "https://kyfw.12306.cn/otn/view/icentre_qxyyInfo.html",
        additionalLinks: [
          {
            label: "铁路购票须知",
            url: "https://kyfw.12306.cn/otn/view/ticket_notice.html",
          },
        ],
        checkedDate: "2026-07-31",
        volatility: "高：申请时间和适用条件应再次确认。",
        usageNote:
          "用于支持适用边界、提前6小时线上申请、开车前60分钟现场申请，以及中转换乘逐段申请。",
      },
      {
        id: "railway-id",
        organization: "中国铁路12306",
        title: "英文购票与身份证件指南",
        url: "https://www.12306.cn/en/faq.html?item=2",
        checkedDate: "2026-07-31",
        volatility: "中：应按实时购票所用证件复核。",
        usageNote: "用于支持携带购票所用有效身份证件原件，例如预约时使用的护照。",
      },
      {
        id: "zhangjiajie-access",
        organization: "湖南省人民政府",
        title: "三条指定精品线路无障碍游览报道",
        url: "https://www.hunan.gov.cn/hnszf/hnyw/sy/hnyw1/202603/t20260325_33940630.html",
        additionalLinks: [
          {
            label: "湖南交通设施更新",
            url: "https://amr.hunan.gov.cn/amr/xxx/szdtx/202604/t20260427_33965078.html",
          },
        ],
        publishedDate: "2026-03-25",
        checkedDate: "2026-07-31",
        volatility: "高：这是政府新闻报道，不是技术性无障碍认证。",
        usageNote:
          "报道没有提供技术地图，也不保证每个入口、换乘和观景点无台阶；必须逐路线确认。",
      },
    ],
  },
  cta: {
    eyebrow: "从整段旅程开始",
    title: "正在计划带父母来中国？",
    body:
      "无论你还在从零开始，还是已经有一份路线草稿，只需先告诉我们日期、同行者和已经确定的部分。Homeground 旅行规划师会在沟通中补问必要信息，帮助你们把想法变成可执行的私人旅程。",
    primaryLabel: "联系旅行规划师",
    secondaryLabel: "给 Homeground 留下 Email",
    primaryHref: "/zh/#planner-contact",
    secondaryHref: "/zh/#planner-contact",
    boundary:
      "无需先填写冗长旅行表单。付费工作开始前，会确认服务范围、责任和价格或报价。",
  },
  related: {
    title: "继续规划",
    items: [
      {
        title: "你的中国行程是不是太赶了？",
        description: "用住宿基地、完整转场日、固定预约和恢复时间检查任何路线草稿。",
        href: "/zh/guides/is-your-china-itinerary-too-rushed/",
      },
      {
        title: "北京—张家界—上海：转场日真正花多久",
        description: "比较简单路线图上看不到的门到门长距离交通成本。",
        href: "/zh/guides/beijing-zhangjiajie-shanghai-transport/",
      },
      {
        title: "带年长旅客去张家界",
        description: "加入山区前，进一步理解景区内部交通、路线条件和必须确认的问题。",
        href: "/zh/guides/zhangjiajie-older-travellers/",
      },
    ],
  },
  schemaAbout: [
    "中国旅行路线",
    "带年长父母旅行",
    "无障碍旅行规划",
    "北京",
    "西安",
    "上海",
    "张家界",
  ],
};

const korean: ChinaItineraryWithOlderParentsCopy = {
  htmlLang: "ko",
  pagePath: "/ko/guides/china-itinerary-with-older-parents/",
  homePath: "/ko/",
  guidesPath: "/ko/guides/",
  plannerContactHref: "/ko/#planner-contact",
  metadata: {
    title: "부모님과 중국 여행: 현실적인 12–14일 일정",
    description:
      "부모님과 중국을 여행한다면 12일과 14일 일정을 비교해 보세요. 숙소 이동, 환승일, 걷기 부담과 회복 시간을 함께 계산합니다.",
    headline: "부모님과 중국을 여행하시나요?",
    schemaDescription:
      "부모님과 함께하는 첫 중국 여행을 위한 현실적인 12–14일 일정 프레임으로, 숙소 이동, 출발지부터 도착지까지의 환승, 걷기 부담과 회복 시간을 다룹니다.",
    openGraphLocale: "ko_KR",
  },
  navigation: {
    skipLink: "가이드 본문으로 이동",
    breadcrumbLabel: "이동 경로",
    breadcrumbHome: "홈",
    breadcrumbGuides: "실용 가이드",
    breadcrumbCurrent: "부모님과 중국 여행",
  },
  hero: {
    eyebrow: "중국 일정 · 부모님 동행",
    title: "부모님과 중국을 여행한다면 도시 수보다 체력을 기준으로 일정을 짜세요",
    lead:
      "지도에서는 자연스러워 보이는 일정도 실제로 이동하면 일행을 지치게 할 수 있습니다. 이 가이드는 베이징·시안·상하이를 12–14일 첫 중국 여행의 기본 틀로 삼고, 장자제를 네 번째 숙박 거점으로 더할 가치가 있는지 판단합니다.",
    scopeNote:
      "이 글은 여행 설계의 출발점이지 모든 사람에게 맞는 고정 답이나 의료 평가가 아닙니다. 실제 일정은 여행자, 날짜, 확정된 교통편과 현장 운영 조건에 따라 달라집니다.",
    reviewedLabel: "사실 확인",
    reviewedDate: "2026년 7월 31일",
    preparedBy: "Homeground 편집팀 작성",
    highlights: [
      "12일: 숙박 거점 3곳",
      "14일: 도시보다 회복 시간을 먼저 추가",
      "나이보다 실제 이동 능력으로 판단",
    ],
  },
  summaryOptions: {
    label: "30초 요약",
    title: "‘가능한 일정’과 ‘편안한 일정’은 같은 약속이 아닙니다.",
    intro:
      "부모님과 첫 중국 여행을 준비할 때 중요한 것은 지도에 몇 개 도시를 넣느냐가 아닙니다. 연속되는 체크아웃, 이동일, 시간 지정 방문과 많이 걷는 날을 일행이 감당할 수 있는지가 핵심입니다.",
    columns: {
      nights: "숙박",
      hotelChanges: "숙소 변경",
      designedFor: "적합한 여행",
    },
    options: [
      {
        id: "twelve-day",
        title: "12일 기본형",
        nights: "베이징 4박 · 시안 3박 · 상하이 4박",
        hotelChanges: "2회",
        designedFor:
          "대표 명소를 보면서도 강도 높은 날 사이에 회복 시간을 두는 첫 여행.",
        verdict: "많은 가족에게 가장 안정적인 출발점입니다.",
      },
      {
        id: "comfort-first",
        title: "14일 편안함 우선형",
        nights: "베이징 5박 · 시안 3박 · 상하이 5박",
        hotelChanges: "2회",
        designedFor:
          "회복과 선택의 여유를 늘리고 신중히 고른 당일치기 한 번을 포함하는 여행.",
        verdict: "세 구조 중 가장 여유롭습니다.",
      },
      {
        id: "nature-extension",
        title: "14일 자연 확장형",
        nights: "베이징 4박 · 시안 3박 · 장자제 3박 · 상하이 3박",
        hotelChanges: "3회",
        designedFor:
          "독립적으로 걸을 수 있고 산악 풍경을 매우 중요하게 생각하는 여행자.",
        verdict: "적합한 일행에게는 가능하지만 느긋한 일정은 아닙니다.",
      },
    ],
    boundary:
      "이 글은 중국 체류 달력일을 기준으로 합니다. 12일은 보통 호텔 11박, 14일은 13박이며 국제선 비행시간은 관광 시간으로 계산하지 않습니다.",
  },
  abilityQuestions: {
    title: "나이만으로 일정을 정하지 마세요.",
    intro:
      "같은 나이의 두 사람도 전혀 다른 일정이 필요할 수 있습니다. 계단을 편하게 오르는 분이 있는 반면, 한 시간 서서 기다리는 것이 걷기보다 힘든 분도 있습니다. 숙박 거점 수를 정하기 전에 다음을 확인하세요.",
    questions: [
      "평지에서 쉬지 않고 얼마나 오래 걸을 수 있나요?",
      "중간에 쉬면 계단과 울퉁불퉁한 바닥을 감당할 수 있나요?",
      "걷기보다 서서 기다리는 것이 더 힘든가요?",
      "하루 종일 외출한 뒤 보통 얼마나 회복 시간이 필요한가요?",
      "큰 역에서 각자 짐을 다룰 수 있나요?",
      "숙소를 바꾼 다음 날 이른 출발이 가능한가요?",
      "가끔이라도 지팡이, 보행기 또는 휠체어를 사용하나요?",
    ],
    boundary:
      "이는 여행 설계 질문입니다. 건강 문제가 여행에 영향을 준다면 본인의 의료 전문가와 상의하고 시설별 접근 조건을 확인하세요.",
  },
  twelveDay: {
    title: "현실적인 12일 일정: 베이징, 시안, 상하이",
    intro:
      "이 구조는 국제선 도착일을 비워 두고 만리장성과 병마용에 각각 하루의 중심 자리를 줍니다. 두 번의 도시 이동도 남는 관광 시간이 아니라 이동일로 계산합니다.",
    days: [
      {
        day: "1일차",
        title: "베이징 도착",
        plan: "호텔로 이동해 가까운 곳에서 식사하고 쉽니다. 산책은 언제든 뺄 수 있게 둡니다.",
        reason:
          "입국, 수하물, 공항 도로와 피로는 변수가 큽니다. 유료 명소가 국제선 도착의 완벽한 진행에 의존해서는 안 됩니다.",
      },
      {
        day: "2일차",
        title: "부담 낮은 베이징 첫날",
        plan:
          "천단공원과 앉아서 먹는 점심, 차량을 포함한 짧은 후퉁 방문, 또는 호텔 근처 조용한 동네 중 한 구역만 선택합니다.",
        reason:
          "시차, 날씨, 현지 교통과 걷기에 가족이 어떻게 반응하는지 먼저 확인한 뒤 더 힘든 베이징 이틀로 넘어갈 수 있습니다.",
      },
      {
        day: "3일차",
        title: "고궁박물원",
        plan:
          "고궁을 이날의 유일한 핵심 방문으로 둡니다. 입장 전에 퇴장문과 차량 만남 장소를 정하고 중앙 동선을 먼저 본 뒤 체력이 남을 때만 옆 전시를 더합니다.",
        reason:
          "고궁박물원은 당일 입장권을 판매하지 않습니다. 입장권은 방문일 7일 전 중국 시간 오후 8시에 예매가 시작됩니다. 중국 본토 외 방문객은 여권을 포함한 인정 신분증으로 예약할 수 있으며 예약에 사용한 원본을 지참해야 합니다. 오문으로 입장하고 신무문 또는 동화문으로 퇴장하며, 공식 사이트에는 2시간 및 반일 추천 동선도 있습니다.",
        sourceIds: ["palace"],
      },
      {
        day: "4일차",
        title: "무톈위 만리장성",
        plan:
          "사전 차량과 적합한 경우 셔틀·케이블카를 이용하고 성벽은 짧은 구간만 선택합니다. 오후에는 다른 대형 명소를 넣지 않습니다.",
        reason:
          "베이징시 공식 관광 정보에는 접근 가능한 주차 공간, 주차 구역과 케이블카 구역 사이의 미끄럼 방지 경사로, 휴식 좌석과 고령자 서비스 지점의 이동 보조 장비가 안내되어 있습니다. 이는 성벽 전체가 무단차라는 뜻이 아닙니다. 케이블카를 전제로 하기 전에 당일 운행과 탑승 적합 조건을 운영사에 확인하세요.",
        sourceIds: ["mutianyu"],
      },
      {
        day: "5일차",
        title: "베이징에서 시안으로",
        plan:
          "이날은 이동일입니다. 체크인 뒤에는 예약 없는 저녁이나 짧은 동네 산책만 선택 사항으로 둡니다.",
        reason:
          "실제 이동에는 체크아웃, 역까지 가는 시간, 입장과 보안 검색, 대기, 짐을 들고 탑승, 도착 후 픽업과 새 호텔 체크인이 모두 포함됩니다.",
      },
      {
        day: "6일차",
        title: "병마용",
        plan:
          "병마용박물관부터 보고 현장의 혼잡, 서 있는 시간, 기온과 걷기 상태를 확인한 뒤 여산원까지 갈지 결정합니다.",
        reason:
          "공식 안내상 두 구역은 각각 약 1시간 30분이 소요되고 무료 셔틀로 연결됩니다. 휠체어 대여가 안내되어 있지만 즉시 이용은 보장되지 않습니다. 여권 정보로 예약했다면 사용한 유효 신분증 원본을 지참하고, 고령자 할인은 실제 구매 절차에서 확인해야 합니다.",
        sourceIds: ["terracotta"],
      },
      {
        day: "7일차",
        title: "가족 속도로 보는 시안",
        plan:
          "성벽의 짧은 구간, 박물관 한 곳, 종루·고루 일대, 또는 음식 중심 동네 중 한 방향만 고릅니다.",
        reason:
          "늦은 아침을 허용하고 전날 병마용 일정이 길어진 경우도 흡수합니다. 성벽 전체 자전거 주행은 선택이지 기본값이 아닙니다.",
      },
      {
        day: "8일차",
        title: "시안에서 상하이로",
        plan:
          "두 번째 이동일을 지킵니다. 실제 호텔, 출발 시각, 수하물과 도착 픽업을 넣어 열차와 항공을 문 앞에서 문 앞까지 비교합니다.",
        reason: "표에 적힌 이동시간만으로는 숙소를 옮긴 뒤 남는 체력을 알 수 없습니다.",
      },
      {
        day: "9일차",
        title: "와이탄의 선택한 구간",
        plan:
          "가족이 원하는 전망이 있는 구간만 고르고 차량 만남 장소를 정합니다. 필요하면 앉아서 하는 식사나 짧은 유람선을 더합니다.",
        reason: "목표는 상하이에서 좋은 하루를 보내는 것이지 강변 전체를 완주하는 것이 아닙니다.",
      },
      {
        day: "10일차",
        title: "박물관 또는 동네",
        plan:
          "상하이를 여러 번 가로지르지 말고 박물관 한 곳이나 동네 한 곳을 선택합니다. 정확한 지점, 전시와 예약 규칙을 확인하세요.",
        reason: "실내 일정은 날씨 영향을 덜 받고 여행의 신체적 리듬을 바꿔 줍니다.",
      },
      {
        day: "11일차",
        title: "유연한 하루",
        plan:
          "상하이 현지 일정, 신중히 고른 쑤저우 또는 항저우 당일치기, 쇼핑과 음식, 혹은 실제 휴식에 씁니다.",
        reason:
          "비워 둔 시간은 날씨, 피로, 예약 변경 또는 도착한 뒤 새로 생긴 관심사를 흡수할 수 있습니다.",
      },
      {
        day: "12일차",
        title: "출국",
        plan: "항공편과 공항 이동 외에는 일정이 의존하지 않게 둡니다.",
        reason: "여행 마지막 날을 먼 당일치기, 시간 지정 방문 또는 또 다른 숙소 변경에 노출하지 않습니다.",
      },
    ],
  },
  variants: {
    title: "추가 이틀을 쓰는 방법",
    intro:
      "14일이라고 반드시 숙박 도시를 하나 더할 필요는 없습니다. 새로운 풍경이 추가 이동을 감수할 만큼 중요한지, 아니면 회복과 선택의 여유가 가족에게 더 가치 있는지 먼저 판단하세요.",
    options: [
      {
        id: "comfort-first",
        title: "14일: 편안함 우선",
        nights: "베이징 5박 · 시안 3박 · 상하이 5박",
        hotelChanges: "2회",
        pace: "변수에 더 강한 일정",
        summary:
          "베이징의 추가 하루는 큰 명소 하나를 독립된 날로 만들고, 상하이의 하루는 여행 막바지를 보호하거나 도시를 희생하지 않고 당일치기를 가능하게 하며 그대로 비워 둘 수도 있습니다.",
        outline: [
          "베이징 5박, 도착일 포함",
          "시안 3박",
          "상하이 5박, 출국 전날 포함",
        ],
        notes: [
          "전체 여행에서 숙소 변경은 두 번뿐입니다.",
          "현장에서 가족 상태를 확인한 뒤 일정을 바꿀 여지가 있습니다.",
          "결국 당일치기를 하지 않아도 빈 하루는 가치가 있습니다.",
        ],
      },
      {
        id: "zhangjiajie",
        title: "14일: 장자제 추가",
        nights: "베이징 4박 · 시안 3박 · 장자제 3박 · 상하이 3박",
        hotelChanges: "3회",
        pace: "적합한 가족에게는 가능하지만 느긋하지 않음",
        summary:
          "산악 풍경이 여행의 핵심 이유이고, 여행자가 독립적으로 걸으며 여러 내부 환승을 처리하고 이동일 뒤에도 잘 회복할 때만 이 구조를 사용합니다.",
        outline: [
          "1–4일차: 베이징",
          "5–7일차: 시안",
          "8일차: 이동 후 판단한 장자제 숙박 거점에 체크인",
          "9일차: 국가삼림공원 동선 한 개",
          "10일차: 현재 동선과 운행 상황을 확인한 톈먼산",
          "11–13일차: 상하이",
          "14일차: 출국",
        ],
        notes: [
          "도시 간 이동일 세 번과 날씨 영향을 받는 산악일 이틀이 포함됩니다.",
          "달력 칸에 이름이 들어간다는 이유로 대협곡, 긴 야간 공연과 또 다른 고성을 더하지 마세요.",
          "2026년 3월 25일 후난성 정부 보도는 금편계·원가계·천자산의 3개 지정 동선이 ‘전 구간 무장애 관람을 기본적으로 실현했다’고 전했습니다. 이는 기술적 접근성 지도나 모든 입구·환승·전망 지점의 무단차를 보장하지 않습니다. 휠체어나 보행 보조기구 사용자는 선택 동선의 정확한 입구, 승강기 또는 케이블카, 차량 접근과 직원 지원을 개별 확인한 뒤 실행 가능성을 판단해야 합니다.",
        ],
        sourceIds: ["zhangjiajie-access"],
      },
    ],
    closing:
      "네 번째 숙박 거점은 가족이 매우 중요하게 여기는 경험으로 그 가치를 증명해야 합니다. 주로 또 한 번의 체크아웃과 반쪽짜리 이틀을 만든다면 첫 세 거점을 더 탄탄하게 만드는 편이 낫습니다.",
  },
  friction: {
    label: "지도에 보이지 않는 것",
    title: "가장 힘든 순간은 명소 사이에 있을 때가 많습니다.",
    intro:
      "부모님과의 여행은 매일을 비우는 일이 아닙니다. 짐, 서 있는 시간, 불확실한 접근 조건과 이른 출발이 연속되는 구간을 먼저 찾아내는 일입니다.",
    sections: [
      {
        id: "transfer",
        title: "이동일의 비용은 표에 적힌 시간보다 큽니다.",
        intro: "여행자는 열차나 항공의 운행시간이 아니라 숙소에서 숙소까지의 전 과정을 경험합니다.",
        items: [
          "짐을 싸고 체크아웃한 뒤 큰 역이나 공항으로 갑니다.",
          "신분 확인과 보안 검색을 거쳐 대기 구역과 정확한 객차 또는 탑승구를 찾습니다.",
          "짐을 들고 탑승해 표에 적힌 이동을 합니다.",
          "도착지에서 출구와 픽업 지점을 찾아 다음 호텔로 갑니다.",
          "체크인하고 새 동네를 익힌 뒤 원래 활동을 남길 가치가 있는지 다시 판단합니다.",
        ],
        closing:
          "설계 원칙: 도시 간 이동과 숙소 변경이 같은 날이면 필수 명소가 완벽한 이동에 의존하지 않게 하세요.",
        factNote:
          "중국철도의 특별 중점 여객 지원 서비스는 연령이나 신체 상태 등의 이유로 특별한 돌봄이 필요한 승객을 위한 것으로, 이동 보조기구 사용자 등이 포함됩니다. 만 60세 이상 모든 승객에게 자동 제공되지는 않습니다. 온라인 신청은 출발 최소 6시간 전에 해야 하며, 6시간이 남지 않았다면 출발역에서 열차 출발 60분 전까지 현장 신청해야 합니다. 환승 여정은 열차 구간별로 각각 신청해야 합니다. 철도 측은 신원, 승차권, 실제 필요와 증빙 자료를 확인하고 요건을 충족하지 않으면 거절할 수 있습니다. 예약에 사용한 여권 등 승차권 구매에 사용한 유효 신분증 원본을 지참하세요.",
        sourceIds: ["railway-assistance", "railway-id"],
      },
      {
        id: "hotel",
        title: "호텔 위치가 별 하나보다 더 중요할 수 있습니다.",
        intro:
          "잘못된 곳의 5성급 호텔은 실제 동선 옆의 좋은 4성급보다 더 많은 이동을 만들 수 있습니다. ‘좋은 위치’는 가족이 보내는 실제 하루에 따라 달라집니다.",
        items: [
          "차량이 입구 가까이 정차할 수 있나요?",
          "하차 지점에서 객실까지 무단차 동선이 있나요?",
          "엘리베이터가 안정적이고 적합한 샤워 또는 엘리베이터 가까운 객실을 요청할 수 있나요?",
          "조식 시간이 예약일에 맞고 저녁을 위해 또 멀리 이동하지 않아도 되나요?",
          "정확한 기차역이나 공항으로 가기 편한가요?",
          "숙소 변경이 실제 수고를 줄이나요, 아니면 체크아웃만 하나 더 만드나요?",
        ],
      },
      {
        id: "effort",
        title: "하루 걸음 수만으로 어려운 구간을 알 수 없습니다.",
        intro:
          "규칙적으로 앉아 쉬며 자기 속도로 걷는 평지 1만 보는 가파른 접근로, 고르지 않은 바닥, 한 시간 서 있기와 픽업 지점이 없는 6천 보보다 쉬울 수 있습니다.",
        items: [
          "가장 긴 연속 보행 구간은 얼마나 되나요?",
          "피할 수 없는 노면, 경사와 계단은 무엇인가요?",
          "얼마나 오래 서 있거나 줄을 서야 하나요?",
          "첫 번째로 확실히 앉을 수 있는 곳은 어디인가요?",
          "하루를 망치지 않고 일부 동선을 뺄 수 있나요?",
          "다음 날 아침에는 무엇이 예정되어 있나요?",
        ],
        closing:
          "유용한 단위는 거리만이 아닙니다. 연속적인 부담과 그 뒤에 확보된 회복 시간을 함께 봐야 합니다.",
      },
    ],
  },
  support: {
    title: "개인 여행 설계의 가치가 가장 커지는 곳",
    intro:
      "매시간 가이드가 곁에 있어야 한다는 뜻은 아닙니다. 지원은 고정 입장, 수하물, 큰 역과 내부 교통이 복잡한 날에 가장 가치가 크며 자유로운 오후는 그대로 둘 수 있습니다.",
    highFrictionTitle: "하나의 여정으로 연결해 설계할 마찰이 큰 순간",
    highFrictionDays: [
      "국제선 도착과 첫 호텔 이동",
      "수하물을 동반한 기차역 또는 공항 이동",
      "고궁의 고정 입구와 서로 다른 퇴장문",
      "만리장성과 병마용",
      "장자제 입구, 셔틀, 승강기와 케이블카",
      "숙소 변경과 시간 지정 예약이 같은 날",
    ],
    body:
      "Homeground는 여행 전체를 기준으로 설계합니다. 합의한 범위에 현지 가이드, 차량 또는 예약 지원이 포함된다면 서로 분리된 부가상품이 아니라 하나의 일정 안에서 역할을 조율합니다.",
    boundary:
      "유료 작업 전 구체적인 설계, 예약 및 현지 책임을 서면으로 확인합니다. 교통, 시설 운영과 접근 조건은 실제 여행 날짜에 맞춰 최종 확인해야 합니다.",
  },
  mistakes: {
    title: "예약 전에 없앨 일곱 가지 실수",
    items: [
      "국제선 도착일을 온전한 관광일로 계산하기.",
      "첫 세 거점을 보호하기 전에 네 번째 도시를 더하기.",
      "늦은 이동 다음 날 이른 시간 지정 방문을 배치하기.",
      "위치와 접근 조건을 확인하지 않고 호텔 별점만 보기.",
      "케이블카나 엘리베이터를 전체 무단차 동선의 증거로 보기.",
      "여권과 실제 구매 조건을 확인하기 전에 고령자 할인을 약속하기.",
      "현지에서 부모님의 상태를 보기 전에 모든 반나절을 채우기.",
    ],
  },
  faq: {
    label: "자주 묻는 일정 질문",
    title: "부모님과 첫 중국 여행을 위한 현실적인 답",
    items: [
      {
        question: "부모님과 중국 여행은 며칠이 적당한가요?",
        answer:
          "베이징·시안·상하이 중심의 첫 여행이라면 12일이 유용한 출발점입니다. 14일은 회복 시간을 늘리고 당일치기 한 번이나 다른 지역을 진지하게 고려할 여유를 줍니다.",
      },
      {
        question: "12일 동안 몇 개 도시가 적당한가요?",
        answer:
          "편안함을 우선한다면 숙박 거점 세 곳을 사용하세요. 네 번째도 물리적으로 가능할 수 있지만 체크아웃을 하나 더 만들고 좋은 교통과 회복에 더 의존하게 됩니다.",
      },
      {
        question: "8일 베이징–시안–상하이 여행이 가능한가요?",
        answer:
          "가능하지만 빽빽합니다. 시차, 피로, 시간 지정 입장과 숙소 변경에 대한 여유가 적습니다. 운영상 가능하다는 사실이 모든 가족에게 편안한 속도라는 뜻은 아닙니다.",
      },
      {
        question: "고속철도는 고령 여행자에게 적합한가요?",
        answer:
          "대체로 적합할 수 있지만 좌석만으로 판단할 수 없습니다. 역의 크기, 짐, 탑승 거리, 출발 시각과 도착 픽업이 좌석 등급 차이보다 중요할 수 있습니다.",
      },
      {
        question: "만리장성은 부모님께 적합한가요?",
        answer:
          "무톈위는 셔틀과 케이블카로 일부 오르막을 줄일 수 있지만 성벽에는 여전히 고르지 않은 구간과 계단이 있습니다. 개인의 능력, 당일 운행과 탑승 적합 조건을 함께 확인하세요.",
      },
      {
        question: "장자제는 고령 여행자에게 적합한가요?",
        answer:
          "여러 환승, 줄 서기와 일부 고르지 않은 지형을 감당하며 독립적으로 걸을 수 있다면 가능할 수 있습니다. 엘리베이터나 케이블카가 전 구간 무단차를 뜻하지 않으므로 보조기구 사용자는 동선별 확인이 필요합니다.",
      },
      {
        question: "매일 개인 가이드와 차량이 필요한가요?",
        answer:
          "꼭 그렇지는 않습니다. 시간 지정 예약, 큰 역 이동, 산악 동선과 짐이 있는 날에 가치가 가장 큽니다. 지원 수준은 모든 자유 시간을 채우기보다 어려운 부분에 맞추세요.",
      },
    ],
  },
  sources: {
    title: "공식 출처 및 업데이트 안내",
    intro:
      "입장권, 교통, 지원 서비스와 접근 조건은 바뀔 수 있습니다. 아래 사실은 표시된 날짜에 공식 출처로 확인했으며, 예약 전에 가족의 실제 여행 날짜에 맞춰 최신 규정을 다시 확인해야 합니다.",
    checkedLabel: "페이지 사실 확인",
    checkedDate: "2026년 7월 31일",
    items: [
      {
        id: "palace",
        organization: "고궁박물원",
        title: "공식 예약 규정과 관람 안내",
        url: "https://www.dpm.org.cn/subject_booking/",
        additionalLinks: [
          {
            label: "공식 관람 안내",
            url: "https://www.dpm.org.cn/Visit.html",
          },
          {
            label: "국제 방문객 안내",
            url: "https://intl.dpm.org.cn/visit.html",
          },
        ],
        checkedDate: "2026-07-31",
        volatility: "높음: 구매 전에 예약 규정을 다시 확인하세요.",
        usageNote:
          "예약 시작 시각, 인정 신분증, 입·퇴장 동선과 공식 단축 관람 동선을 뒷받침합니다.",
      },
      {
        id: "mutianyu",
        organization: "베이징시 공식 관광 정보 및 무톈위 운영사",
        title: "방문객 시설과 케이블카 정보",
        url: "https://english.visitbeijing.com.cn/article/4NlmchKDzhY",
        additionalLinks: [
          {
            label: "무톈위 관람 정보",
            url: "https://www.mutianyugreatwall.com/cnInformation",
          },
          {
            label: "무톈위 케이블카 안전 규정",
            url: "https://www.mutianyugreatwall.com/cndetailcon1101",
          },
        ],
        checkedDate: "2026-07-31",
        volatility: "높음: 운행과 탑승 적합 조건은 바뀔 수 있습니다.",
        usageNote:
          "안내된 시설을 뒷받침하지만 성벽 전체의 무단차를 인증하지 않습니다.",
      },
      {
        id: "terracotta",
        organization: "진시황제릉박물원",
        title: "공식 관람 안내",
        url: "https://www.bmy.com.cn/guide/",
        checkedDate: "2026-07-31",
        volatility: "높음: 예약, 편의 서비스와 할인 조건을 다시 확인하세요.",
        usageNote:
          "두 관람 구역, 예상 시간, 무료 셔틀, 안내된 휠체어 대여와 신분증 요건을 뒷받침합니다. 휠체어 이용 가능 여부나 고령자 할인은 보장하지 않습니다.",
      },
      {
        id: "railway-assistance",
        organization: "중국철도 12306",
        title: "특별 중점 여객 지원 신청 규정",
        url: "https://kyfw.12306.cn/otn/view/icentre_qxyyInfo.html",
        additionalLinks: [
          {
            label: "철도 승차권 안내",
            url: "https://kyfw.12306.cn/otn/view/ticket_notice.html",
          },
        ],
        checkedDate: "2026-07-31",
        volatility: "높음: 신청 시간과 대상 조건을 다시 확인하세요.",
        usageNote:
          "대상 범위, 온라인 6시간 전 신청, 역에서 60분 전 신청과 환승 열차별 신청 요건을 뒷받침합니다.",
      },
      {
        id: "railway-id",
        organization: "중국철도 12306",
        title: "영문 승차권 및 신분증 안내",
        url: "https://www.12306.cn/en/faq.html?item=2",
        checkedDate: "2026-07-31",
        volatility: "중간: 실제 구매에 사용한 신분증을 다시 확인하세요.",
        usageNote:
          "예약에 사용한 여권 등 승차권 구매에 사용한 유효 신분증 원본 지참을 뒷받침합니다.",
      },
      {
        id: "zhangjiajie-access",
        organization: "후난성 인민정부",
        title: "3개 지정 무장애 관람 동선 보도",
        url: "https://www.hunan.gov.cn/hnszf/hnyw/sy/hnyw1/202603/t20260325_33940630.html",
        additionalLinks: [
          {
            label: "후난 교통시설 업데이트",
            url: "https://amr.hunan.gov.cn/amr/xxx/szdtx/202604/t20260427_33965078.html",
          },
        ],
        publishedDate: "2026-03-25",
        checkedDate: "2026-07-31",
        volatility: "높음: 정부 보도이며 기술적 접근성 인증이 아닙니다.",
        usageNote:
          "기술 지도나 모든 입구·환승·전망 지점의 무단차를 보장하지 않으므로 선택 동선을 개별 확인해야 합니다.",
      },
    ],
  },
  cta: {
    eyebrow: "여행 전체부터 설계하세요",
    title: "부모님과 중국 여행을 준비하고 계신가요?",
    body:
      "처음부터 시작하든 이미 일정 초안이 있든, 날짜와 일행, 확정된 부분만 먼저 알려 주세요. Homeground 여행 플래너가 대화에서 필요한 질문을 이어가며 실행 가능한 맞춤 여행으로 다듬어 드립니다.",
    primaryLabel: "여행 플래너에게 문의하기",
    secondaryLabel: "Homeground에 이메일 남기기",
    primaryHref: "/ko/#planner-contact",
    secondaryHref: "/ko/#planner-contact",
    boundary:
      "긴 여행 양식을 먼저 작성할 필요가 없습니다. 유료 작업 전 서비스 범위, 책임과 가격 또는 견적을 확인합니다.",
  },
  related: {
    title: "계속 계획하기",
    items: [
      {
        title: "내 중국 일정은 너무 빠듯한가요?",
        description:
          "숙박 거점 변경, 전체 이동일, 시간 지정 예약과 회복 시간으로 일정 초안을 점검합니다.",
        href: "/ko/guides/is-your-china-itinerary-too-rushed/",
      },
      {
        title: "베이징–장자제–상하이: 이동일의 실제 비용",
        description:
          "단순한 노선도에서 보이지 않는 장거리 이동을 숙소에서 숙소까지 비교합니다.",
        href: "/ko/guides/beijing-zhangjiajie-shanghai-transport/",
      },
      {
        title: "고령 여행자와 장자제",
        description:
          "산악 지역을 더하기 전에 내부 교통, 동선 조건과 확인할 질문을 자세히 살펴봅니다.",
        href: "/ko/guides/zhangjiajie-older-travellers/",
      },
    ],
  },
  schemaAbout: [
    "중국 여행 일정",
    "부모님과 여행",
    "접근 가능한 여행 설계",
    "베이징",
    "시안",
    "상하이",
    "장자제",
  ],
};

const copies: Record<
  HomegroundLocale,
  ChinaItineraryWithOlderParentsCopy
> = {
  en: english,
  zh: chinese,
  ko: korean,
};

export function getChinaItineraryWithOlderParentsCopy(
  locale: HomegroundLocale = "en",
): ChinaItineraryWithOlderParentsCopy {
  return copies[locale];
}
