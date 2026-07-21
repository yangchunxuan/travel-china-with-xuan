import type { NightShowGuideCopy } from "./nightShowGuideCopy.types";

export const nightShowGuideEnglish: NightShowGuideCopy = {
  htmlLang: "en",
  homePath: "/",
  skipLink: "Skip to the guide",
  breadcrumbLabel: "Breadcrumb",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Zhangjiajie night shows",
  hero: {
    eyebrow: "Zhangjiajie evening decision guide",
    title: "Which Zhangjiajie Night Show Fits Your Trip?",
    lead:
      "Tianmen Fox Fairy, Charming Xiangxi and Eternal Love compared by hotel base, the whole evening they consume, weather, language needs and your next morning—not by a generic star rating.",
    quickLabel: "Quick answer",
    quickTitle: "There is no single best show.",
    quickBody:
      "Start with Tianmen Fox Fairy when you sleep downtown and want an outdoor story. In Wulingyuan, compare Charming Xiangxi for folk-variety content with Eternal Love for a large theatre production. If the group is tired or starts early tomorrow, choose no show.",
    figureAlt:
      "Editorial illustration of an outdoor canyon stage, folk-performance objects and an indoor theatre connected by a folded route line.",
    figureCaption:
      "Editorial illustration—not a photograph of any venue. The three objects represent the formats you are comparing.",
    checkedLabel: "Key sources sampled",
    checkedDate: "22 July 2026",
  },
  decisions: [
    {
      label: "Downtown base",
      title: "Investigate Fox Fairy first",
      detail: "Only if its season, weather and return plan work for your date.",
    },
    {
      label: "Wulingyuan base",
      title: "Compare two nearby formats",
      detail: "Folk variety at Charming Xiangxi or large-scale theatre at Eternal Love.",
    },
    {
      label: "Early next morning",
      title: "Protect sleep first",
      detail: "A good performance can still be the wrong itinerary decision.",
    },
  ],
  comparison: {
    sectionLabel: "One-minute comparison",
    title: "Compare the format and route consequence.",
    intro:
      "The table deliberately excludes fixed prices and times. Those are booking facts for your exact date, not reliable evergreen advice.",
    rowLabels: {
      format: "Main format",
      base: "Cleanest hotel base",
      chooseFor: "Choose mainly for",
      mainRisk: "Main planning risk",
    },
    shows: [
      {
        name: "Tianmen Fox Fairy",
        format: "Outdoor love story on a mountain-valley stage",
        base: "Downtown Zhangjiajie",
        chooseFor: "Natural setting and one continuous story",
        mainRisk: "Season, rain, temperature, subtitle view and late return",
      },
      {
        name: "Charming Xiangxi",
        format: "Western-Hunan folk and variety programme",
        base: "Wulingyuan",
        chooseFor: "Shorter acts, costumes, music and local folk themes",
        mainRisk: "Post-park fatigue, changing sessions and uneven language support",
      },
      {
        name: "Eternal Love",
        format: "Large narrative production inside a performance park",
        base: "Wulingyuan",
        chooseFor: "Stage technology and a more controlled theatre setting",
        mainRisk: "The wider park takes more time than the headline show",
      },
    ],
    boundary:
      "Use this as a decision guide, not a timetable. Sessions, programmes, subtitle screens, seat maps, child rules and weather policies must be rechecked for the travel date.",
  },
  need: {
    sectionLabel: "Before comparing tickets",
    title: "First decide whether you need a show at all.",
    intro:
      "A Zhangjiajie night show is optional. The real question is not only whether a performance is worth its ticket price, but whether the entire evening improves the trip after the daytime route, dinner, entry, exit crowd and next morning are included.",
    skipTitle: "Skipping all three is often sensible when",
    skipPoints: [
      "the group has finished a demanding national-park or Tianmen day;",
      "you must change hotels or cross between Wulingyuan and downtown that evening;",
      "parents, young children or a traveller with limited mobility need recovery time;",
      "tomorrow begins with an early park entry, train or flight;",
      "weather makes the outdoor option uncertain, or only a late session remains.",
    ],
    conclusion:
      "A trustworthy route leaves “no show” available as a real answer. The performance should support the landscape days you came for, not weaken them.",
  },
  wholeEvening: {
    sectionLabel: "The information gap rankings miss",
    title: "Match the show to the whole evening.",
    intro:
      "Hotel base alone is not enough. Start with where the daytime route ends, then add where you sleep and how early the following day begins.",
    columnLabels: {
      setup: "Day ends + hotel base",
      nextDay: "Next morning",
      judgement: "More realistic judgement",
    },
    rows: [
      {
        setup: "Forest Park ends; sleep in Wulingyuan",
        nextDay: "Another normal park day",
        judgement: "Compare Charming Xiangxi and Eternal Love; skip if the group is already spent.",
      },
      {
        setup: "Forest Park ends; move to downtown",
        nextDay: "Early Tianmen entry",
        judgement: "Usually do not add a show. Dinner, the hotel move and sleep already use the evening.",
      },
      {
        setup: "Tianmen day ends; sleep downtown",
        nextDay: "Late start or departure",
        judgement: "Investigate Tianmen Fox Fairy if the season, weather and transfer work.",
      },
      {
        setup: "Long-distance arrival night",
        nextDay: "Early entry into the park",
        judgement: "Eat and rest. Arrival delay makes a timed performance fragile.",
      },
      {
        setup: "Wulingyuan base with children",
        nextDay: "Lighter day",
        judgement: "Compare Eternal Love’s full park time with Charming Xiangxi’s actual session and finish.",
      },
    ],
    insight:
      "This is the part a ticket ranking cannot decide: an excellent show can be a poor choice once the hotel change and next morning are visible.",
  },
  hotelBase: {
    sectionLabel: "Geography before ratings",
    title: "Wulingyuan and downtown serve different sightseeing days.",
    introBeforeLink: "Our main Zhangjiajie guide explains ",
    itineraryLink: "why the two bases should not be treated as one district",
    introAfterLink:
      ". Choose the right base for the daytime route first; only then compare evening entertainment.",
    downtown: {
      name: "Downtown Zhangjiajie",
      role: "Tianmen Mountain · rail connections · 72 Qilou",
      detail:
        "Tianmen Fox Fairy is the more natural major-show candidate here, but “same zone” does not make a full mountain day plus a late outdoor production low effort.",
    },
    wulingyuan: {
      name: "Wulingyuan",
      role: "National Forest Park · Grand Canyon · nearby cave and lake days",
      detail:
        "Charming Xiangxi and Eternal Love avoid making downtown the default evening destination. Their convenience still depends on your exact hotel and finish time.",
    },
    transfer:
      "Provincial tourism guidance gives roughly 40 minutes by road from Zhangjiajie city to Wulingyuan in ordinary conditions. Treat that as a distance scale—not a promise for a hotel pickup after a crowded show.",
  },
  shows: {
    sectionLabel: "Three different reasons to go",
    title: "What each show is actually offering.",
    intro:
      "Choose the format you genuinely want, then verify only the date-specific detail unique to that choice. Common checks are collected later in one place.",
    bestFitLabel: "Best fit",
    thinkTwiceLabel: "Think twice",
    verifyLabel: "Unique detail to verify",
    routeViewLabel: "Our route view",
    items: [
      {
        id: "tianmen-fox-fairy",
        number: "01",
        name: "Tianmen Fox Fairy",
        format: "Outdoor mountain setting · continuous love story",
        description:
          "This large live-action musical uses the Tianmen Mountain canyon as its natural stage and follows a human–fox-spirit love story. The 2026 season opened on 13 March, while the 2025 season ended in December: useful evidence that it is seasonal, not proof of future dates.",
        bestFit: [
          "You value the real mountain setting more than a controlled theatre.",
          "You prefer one romantic story to a sequence of separate acts.",
          "You sleep downtown and still have energy for a full evening.",
        ],
        thinkTwice: [
          "You sleep in Wulingyuan without a confirmed return arrangement.",
          "Rain, cold, humidity or a late finish will affect the group.",
          "English text is essential but the current screen and seat view are unknown.",
        ],
        verify:
          "Confirm the operating date, weather rule, covered sections and the current subtitle-screen position before choosing a seat category.",
        routeView:
          "Choose it for the outdoor setting and story—not because it is automatically the “best” or because Tianmen appears in its name.",
      },
      {
        id: "charming-xiangxi",
        number: "02",
        name: "Charming Xiangxi",
        format: "Folk variety · music, dance, costumes and performance skills",
        description:
          "Based in Wulingyuan, Charming Xiangxi presents a sequence of western-Hunan folk-themed acts rather than one continuous drama. Official local reporting in February 2026 described four sessions on some Spring Festival peak days, which shows that the timetable can expand with demand—not that four sessions are normal.",
        bestFit: [
          "You sleep in Wulingyuan after a park day.",
          "Separate shorter acts appeal more than one long narrative.",
          "Folk music, dance, costume and staged customs are the main interest.",
        ],
        thinkTwice: [
          "The group is exhausted after walking and mountain transport.",
          "You dislike tourism-oriented folk-variety productions.",
          "You need every spoken or sung section translated in English.",
        ],
        verify:
          "Ask which indoor and outdoor elements run that night and which parts, if any, have visible English support from your seat.",
        routeView:
          "Its strongest advantage is often geographic fit. That does not make an evening after the park automatically effortless.",
      },
      {
        id: "eternal-love",
        number: "03",
        name: "Zhangjiajie Eternal Love",
        format: "Large theatre narrative · wider performance park",
        description:
          "Songcheng’s production in Wulingyuan combines Zhangjiajie history and legends with large lighting, sound and stage effects. The main show sits inside a wider performance park, so the usable evening is longer than the headline production alone.",
        bestFit: [
          "You sleep in Wulingyuan and prefer a conventional theatre setting.",
          "Large production effects and broad visual storytelling matter most.",
          "Your family has enough time for the wider park as well as the main show.",
        ],
        thinkTwice: [
          "You dislike theme-park-style cultural entertainment.",
          "You plan to arrive only a few minutes before the main production.",
          "You assume an indoor main show makes the entire park weather-proof.",
        ],
        verify:
          "Confirm the park opening time, main-show session, included activities, child/accessibility rules and current on-site language support.",
        routeView:
          "It is the controlled-stage option of the three, but the operator explicitly says projects and performances may change with weather or on-site conditions.",
      },
    ],
  },
  qilou: {
    sectionLabel: "A different kind of evening",
    title: "Is 72 Qilou a fourth competing show?",
    body:
      "Not in the same sense. We treat 72 Qilou as a downtown night attraction combining architecture, lighting, food, shopping and smaller activities—not as a fourth fixed-seat headline production equivalent to the three above.",
    note:
      "That can make it more flexible, but it does not remove the same questions: where is the hotel, how tired is the group, what is operating, and how late will the evening become?",
  },
  evening: {
    sectionLabel: "The useful calculation",
    title: "A one-hour show does not cost only one hour.",
    intro:
      "Write the evening as a chain before buying. The hidden time around the performance is where many otherwise good plans stop working.",
    steps: [
      "Daytime attraction ends",
      "Hotel return or cross-zone transfer",
      "Dinner",
      "Ticket collection and entry buffer",
      "Performance or park time",
      "Exit crowd",
      "Hotel return",
    ],
    formula: "The actual evening + tomorrow’s start time = the real decision",
    conclusion:
      "A less distinctive show can be the better choice because it fits the correct base and protects the next day. Sometimes the best calculation ends with no ticket.",
    ctaTitle: "Does an evening show still fit your route?",
    ctaBody:
      "Start with Zhangjiajie, your China nights, group and preferred pace. If you continue, a planner can ask for the exact date, hotel base and next-morning plan before recommending a show.",
    ctaAction: "Check Zhangjiajie in my route",
    ctaNote:
      "The Route Finder checks destination time first. Live sessions, seats and transfers are confirmed in the human follow-up.",
  },
  checklist: {
    sectionLabel: "What changes by date",
    title: "Four live checks before anyone buys a ticket.",
    intro:
      "These are not extra homework for the traveller. They are the details Homeground verifies after the route itself makes sense.",
    items: [
      {
        number: "01",
        title: "Date and actual session",
        detail:
          "Operating date, real start and finish, ticket-collection deadline, current programme and change policy.",
      },
      {
        number: "02",
        title: "Hotel and return plan",
        detail:
          "Exact hotel—not just “Zhangjiajie”—plus pickup point, realistic road time and transport after the crowd exits.",
      },
      {
        number: "03",
        title: "Daytime load and tomorrow",
        detail:
          "Walking, hotel changes, dinner and recovery tonight; park entry, train or flight time tomorrow.",
      },
      {
        number: "04",
        title: "Language, seat and access",
        detail:
          "Current subtitle screen, full-stage view, weather cover, child rules, steps, toilets and mobility needs.",
      },
    ],
    handoff:
      "The first human reply only needs four things to continue: travel date, hotel or base, daytime/next-morning plan, and any child, mobility or essential-language need.",
  },
  related: {
    label: "Build the day before the evening",
    title: "This choice only makes sense inside the full route.",
    body:
      "First calculate how many full Zhangjiajie days you have. If Zhangjiajie sits between Beijing and Shanghai, check whether the wider ten-day route has enough recovery time before adding an evening production.",
    itineraryAction: "See the 2–4 day Zhangjiajie guide",
    routeAction: "Check the Beijing–Zhangjiajie–Shanghai route",
  },
  faq: {
    sectionLabel: "Search questions, answered directly",
    title: "Zhangjiajie night-show FAQ",
    items: [
      {
        question: "Which Zhangjiajie show is best?",
        answer:
          "There is no universal best. Fox Fairy is the outdoor-story choice, Charming Xiangxi the folk-variety choice, and Eternal Love the large-theatre choice. The right answer changes with the hotel base, whole-evening cost and next morning.",
      },
      {
        question: "Is Tianmen Fox Fairy worth it?",
        answer:
          "It can be worth it if the natural canyon setting and continuous love story are the reason you are going, and the date, weather and return plan work. It is a weaker choice from Wulingyuan or before an early start.",
      },
      {
        question: "Does Tianmen Fox Fairy have English subtitles?",
        answer:
          "Current seller and traveller reports commonly mention English screens, but they do not establish a permanent side or best section. Confirm the current screen and seat map for the actual session.",
      },
      {
        question: "Is Eternal Love indoors?",
        answer:
          "The main production uses a theatre, but the wider performance park includes other activities. The official operator says projects and performances may be adjusted or cancelled because of weather or on-site conditions.",
      },
      {
        question: "Can I watch a show after Zhangjiajie National Forest Park?",
        answer:
          "Often yes when both hotel and venue are in Wulingyuan. Still count the park exit, dinner, entry, show, crowd and return. After a demanding day, rest can be the better route choice.",
      },
      {
        question: "What happens if it rains?",
        answer:
          "The effect differs by production. Fox Fairy is the most exposed outdoor choice; Charming Xiangxi may include outdoor elements; Eternal Love’s wider park can also change. Obtain the current change and refund terms before payment.",
      },
      {
        question: "Are VIP seats automatically better?",
        answer:
          "No. A higher category may improve comfort, shelter or proximity but not the full-stage or subtitle view. Use the current seat map and the traveller’s actual needs, not the label alone.",
      },
    ],
  },
  research: {
    hiddenTitle: "Research method and sources",
    disclosureTitle: "How this guide was checked",
    summary:
      "Official sources for stable facts; live booking details deliberately left date-specific.",
    intro:
      "Official sources establish the venues, formats and current operating notices. Session times, subtitle screens, seats, transfers and ticket rules remain date-specific. Traveller discussions were used to identify recurring questions, not to establish operating facts.",
    boundary:
      "Homeground does not present this as a first-hand review of all three productions and has not invented customer preferences or a “tested best seat.”",
    sourceNames: [
      "Hunan culture and tourism: Wulingyuan transport guidance",
      "Zhangjiajie/Wulingyuan tourism platform: Tianmen Fox Fairy",
      "Zhangjiajie Municipal Government: 2026 Fox Fairy season opening",
      "Zhangjiajie Municipal Government: 2025 Fox Fairy season conclusion",
      "Wulingyuan District Media Center: Charming Xiangxi 2026 peak scheduling",
      "Songcheng official: Zhangjiajie Eternal Love",
    ],
  },
  finalCta: {
    sectionLabel: "A route answer, not a ticket ranking",
    title: "Check the evening only after the Zhangjiajie route works.",
    body:
      "Start with your destination time and group. In the first reply, we can ask for the hotel base, daytime plan and next-morning timing, then check the live show details that actually affect the decision.",
    action: "Check Zhangjiajie in my route",
    note: "One contact is requested only if you choose to continue to a human planner.",
  },
  structuredData: {
    homeName: "Homeground China",
    aboutName: "Zhangjiajie night shows",
    mentions: [
      "Tianmen Fox Fairy",
      "Charming Xiangxi",
      "Zhangjiajie Eternal Love",
      "Wulingyuan",
      "Downtown Zhangjiajie",
    ],
  },
};
