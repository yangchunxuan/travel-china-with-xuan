import type { MalaysiaZhangjiajieGuideCopy } from "./zhangjiajieFromMalaysiaGuide";

export const malaysiaZhangjiajieGuideCopyEn = {
  htmlLang: "en-MY",
  homePath: "/",
  studioPath: "/studio/",
  skipLink: "Skip to the guide",
  breadcrumb: {
    label: "Breadcrumb",
    home: "Home",
    guides: "Travel guides",
    current: "Zhangjiajie from Malaysia",
  },
  toc: {
    label: "On this page",
    items: [
      { href: "#door-to-door", label: "Choose the gateway" },
      { href: "#responsibility", label: "Decide who handles what" },
      { href: "#traveller-evidence", label: "What current trips reveal" },
      { href: "#hotel-bases", label: "Choose the hotel bases" },
      { href: "#people-and-meals", label: "Pace, meals and weather" },
      { href: "#support-level", label: "Choose the support level" },
      { href: "#trip-length", label: "Count the complete days" },
      { href: "#quote-checklist", label: "Check a private proposal" },
      { href: "#start-conversation", label: "Start a conversation" },
    ],
  },
  hero: {
    eyebrow: "Malaysia route guide · reviewed 28 July 2026",
    titleParts: [
      "Zhangjiajie ",
      "From Malaysia: ",
      "Choose the Gateway, ",
      "Hotel Base ",
      "and Support",
    ],
    lead:
      "Search the journey to your Zhangjiajie hotel—not only the cheapest flight. The right route depends on your Malaysian departure city, exact travel date, complete sightseeing days and how much you want to arrange yourself.",
    anchor: "Compare the three gateway patterns",
    byLabel: "Prepared by",
    authorName: "Evan · Homeground planning desk",
    reviewedLabel: "Fact-checked",
    reviewedDate: "28 July 2026",
    localNote:
      "Kuala Lumpur is the primary example; travellers starting elsewhere in Malaysia need one extra connection decision.",
  },
  direct: {
    label: "The short answer",
    title: "Start with the departure city and date—not a 7D5N label.",
    body:
      "A workable private trip joins three decisions. First choose the gateway that creates the best hotel arrival. Then count the complete Zhangjiajie days. Finally decide which bookings remain yours and which require local responsibility.",
    journeys: [
      {
        title: "Compare gateways",
        body:
          "Search DYG, CSX and a protected one-stop route for the same dates. Compare the full arrival, not just airfare.",
      },
      {
        title: "Count usable days",
        body:
          "Remove flight, immigration, transfer and return-protection time before assigning mountain days.",
      },
      {
        title: "Assign responsibility",
        body:
          "Keep the bookings you enjoy; define who handles stations, tickets, vehicles, changes and special needs.",
      },
    ],
    conclusion:
      "A private journey is not automatically a luxury package or the opposite of independent travel. It is a route whose handoffs and responsibilities have been made explicit.",
  },
  journey: {
    label: "Gateway and door-to-door route",
    title: "There are three useful ways to reach Zhangjiajie from Malaysia.",
    intro:
      "This guide uses Kuala Lumpur as the main international gateway. From Penang, Johor Bahru, Sabah or Sarawak, compare a protected through-itinerary with positioning to KUL before you commit to a separate ticket.",
    routeSummary:
      "Malaysia origin → KUL or protected connection → DYG, CSX or another China gateway → Zhangjiajie arrival node → Wulingyuan or downtown hotel",
    ariaLabel:
      "Decision route from a Malaysian departure city to a Zhangjiajie hotel base",
    nodes: [
      { place: "Malaysia origin", role: "Your real departure city" },
      { place: "Flight gateway", role: "KUL or a protected connection" },
      { place: "China arrival", role: "DYG, CSX or another hub" },
      { place: "Onward leg", role: "Road, railway or domestic flight" },
      { place: "Arrival node", role: "Airport or Zhangjiajie West" },
      { place: "Hotel base", role: "Wulingyuan or downtown" },
    ],
    legs: [
      {
        id: "gateway-patterns",
        title: "1. Compare three gateway patterns on your exact dates",
        paragraphs: [
          "A nonstop Kuala Lumpur–Zhangjiajie (DYG) ticket, when it is genuinely operating and on sale for your dates, removes the Changsha transfer. The route has operated before, but do not build a trip around it until you can buy the actual flight.",
          "As of this review, Malaysia Airlines and AirAsia X list nonstop Kuala Lumpur–Changsha (CSX) services. Changsha can offer more date choice, but it adds immigration, luggage, a first sleep or transfer, and the onward journey to Zhangjiajie. Operating days and timings can change.",
          "A protected one-stop itinerary through another Chinese or regional hub may be better for travellers outside KUL, or when that hub belongs in a wider China trip. A single booking with protected connections is not equivalent to two unrelated tickets.",
        ],
        bullets: [
          "Compare arrival at the final hotel, not departure from Malaysia.",
          "Add checked-bag rules, an unprotected self-transfer and the first hotel to the real cost.",
          "Do not treat an inaugural or sample flight time as the permanent timetable.",
        ],
        sourceIds: [
          "kuala-lumpur-zhangjiajie-launch",
          "malaysia-airlines-changsha",
          "airasia-changsha",
          "airasia-changsha-booking",
        ],
      },
      {
        id: "outside-kuala-lumpur",
        title: "2. Starting outside Kuala Lumpur adds a protection decision",
        paragraphs: [
          "A cheap domestic positioning flight to KUL can become expensive if a delay makes you miss an unrelated international ticket. Compare a through-ticket or protected one-stop itinerary against a separate KUL connection with a deliberate buffer or overnight stay.",
          "For Sabah and Sarawak especially, the best route may not pass through KUL at all. Search the whole journey first; use KUL only when the door-to-door result is actually better.",
        ],
        pullQuote:
          "The cheapest first flight is not necessarily the cheapest way to arrive in the right hotel.",
      },
      {
        id: "changsha-transfer",
        title: "3. If you use Changsha, plan the whole transfer",
        paragraphs: [
          "Changsha airport, Changsha railway station and Changsha South are different places. Search the real travel date on the official 12306 railway service before choosing the first hotel or airport transfer.",
          "Foreign travellers can use a valid passport for real-name rail tickets. Carry the same document used for booking. Allow for the trip to the station, security, luggage, the walk to the gate and the final transfer after reaching Zhangjiajie West.",
        ],
        bullets: [
          "A late arrival may make sleep the safest first decision.",
          "Choose the railway station from the train you will actually use.",
          "Zhangjiajie West is an arrival node, not a park entrance.",
        ],
        sourceIds: ["railway-12306", "zhangjiajie-tourist-buses"],
      },
      {
        id: "ticket-boundaries",
        title: "4. Keep the two Zhangjiajie mountain systems separate",
        paragraphs: [
          "Wulingyuan and Tianmen Mountain are separate attractions with different locations and ticket systems. Hunan’s 2025 government-priced attraction directory lists the Wulingyuan core ticket as valid for four consecutive days and says transport tools are not included. Do not assume that lifts, cableways and every other item form one all-inclusive fee.",
          "Check live inventory, operating notices and the exact inclusions before payment. A proposal that says only “Zhangjiajie tickets included” is not specific enough.",
        ],
        sourceIds: ["wulingyuan-tickets"],
      },
    ],
    dynamicLabel: "Recheck before payment",
    dynamicNote:
      "Airlines, flight times, trains, park inventory and operating notices change. Use this page to choose the route pattern, then verify the live services for your travel date.",
  },
  responsibility: {
    label: "Responsibility map",
    title: "Decide who owns each handoff before paying anyone.",
    intro:
      "You do not need a guide beside you every hour. You do need to know who acts when separate bookings meet, a ticket changes or the party cannot follow the planned pace.",
    ariaLabel:
      "Responsibility matrix for a private Zhangjiajie journey from Malaysia",
    columns: ["Journey part", "Can you self-book it?", "What must be explicit"],
    rows: [
      [
        "International flights",
        "Usually",
        "Final hotel arrival, baggage and missed-connection exposure",
      ],
      [
        "China railway",
        "Yes, through 12306",
        "Passport setup, correct station and connection margin",
      ],
      [
        "Hotel bases",
        "Yes",
        "Actual location, not only star rating or city name",
      ],
      [
        "Park tickets",
        "Possible",
        "Entrance, date, shuttle, lift, cableway and timed inventory",
      ],
      [
        "Vehicle and guide",
        "Needs a named provider",
        "Which days, language, pickup, luggage and waiting time",
      ],
      [
        "Meals",
        "Possible",
        "Certification standard, hotel breakfast and scenic-area lunch",
      ],
      [
        "Weather or closure changes",
        "Someone must decide",
        "Who monitors, rearranges and pays any difference",
      ],
    ],
    closing:
      "If responsibility cannot be located in writing, it has not been included—no matter how reassuring the itinerary sounds.",
  },
  evidence: {
    label: "What the market and completed trips reveal",
    title: "The same day-count label can hide very different journeys.",
    intro:
      "These examples show the range of products and practical issues that exist. They are not market-share statistics and are not Homeground testimonials.",
    paragraphs: [
      {
        text:
          "Current Malaysia-market offers range from a 5D4N private ground-only trip with a minimum party size, to fixed 7D5N group departures and longer 9D6N products. International flights, group size, room basis, shopping stops and included attraction transport differ, so the headline price or day count is not a valid like-for-like comparison.",
        sourceIds: [
          "mayflower-private-tour",
          "koiman-package",
          "apple-package",
        ],
      },
      {
        text:
          "Recent public accounts from Kuala Lumpur and Malaysia describe why local support mattered to their particular parties: navigating tickets and routes, adjusting the pace, coordinating hotels and transport, and supporting an older traveller using a wheelchair. These accounts demonstrate possible needs, not a universal Malaysian preference.",
        sourceIds: ["tripadvisor-private-reviews"],
      },
      {
        text:
          "Other Malaysian travel accounts record the physical reality behind a compact itinerary: long road sectors, about 10.9 kilometres of movement on one day, a Tianmen queue approaching two hours and food requirements that needed better handling. Enjoying a trip and finding it tiring can both be true.",
        sourceIds: ["minhakim-trip-account", "sj-echo-trip-account"],
      },
    ],
    lessons: [
      "Compare exact inclusions and responsibility, not only nights and price.",
      "Treat walking, queues and road sectors as part of the itinerary.",
      "Define special needs before the route and restaurants are fixed.",
    ],
    boundary:
      "Third-party products and traveller accounts are used as evidence of published offers and reported experiences only. Homeground has not bought, ranked or endorsed them.",
  },
  bases: {
    label: "Hotel-base logic",
    title: "Choose the nights before filling the days.",
    intro:
      "A hotel base should protect a specific part of the journey. A low room rate in the wrong place can return its savings as early departures, repeated road travel and luggage moves.",
    ariaLabel:
      "Functional relationship between Changsha, Zhangjiajie West, Wulingyuan, downtown Zhangjiajie and Fenghuang",
    items: [
      {
        place: "Changsha",
        role: "Gateway or flight-protection night",
        title: "Use it only when the flight structure needs it",
        body:
          "A late arrival, early departure or uncertain self-transfer can justify a Changsha night. It should solve a connection problem, not appear by habit.",
      },
      {
        place: "Zhangjiajie West",
        role: "Rail arrival node",
        title: "Pass through—do not plan park days from here",
        body:
          "The station connects the intercity journey to the local one. Your final base is still Wulingyuan or downtown Zhangjiajie.",
      },
      {
        place: "Wulingyuan",
        role: "National Forest Park base",
        title: "Protect consecutive park mornings",
        body:
          "This base usually suits consecutive Wulingyuan park days. The exact hotel location and intended entrance still matter.",
      },
      {
        place: "Downtown Zhangjiajie",
        role: "Tianmen Mountain and transport base",
        title: "Use it for Tianmen and selected arrival days",
        body:
          "A downtown night can fit before or after Tianmen Mountain and may simplify some airport or railway movements.",
      },
      {
        place: "Fenghuang",
        role: "Optional next destination",
        title: "Add it only when it earns another transfer",
        body:
          "Fenghuang adds a transport leg and hotel move. Include it for the old town itself, not because a package template always does.",
      },
    ],
    closing:
      "Private planning does not remove every transfer. It makes every transfer solve a real problem or deliver an experience the party values.",
    disclaimer:
      "This diagram shows the role of each place. Its spacing is not live road distance or a promised transfer time.",
  },
  people: {
    label: "Party and pace",
    title: "The people travelling should change the route.",
    intro:
      "“Four adults” is not enough information for a mountain itinerary. The same sights can produce a very different day for a confident couple, young children, a photographer or parents who need more rest.",
    questionTitle: "Questions to answer before anyone promises a pace",
    questions: [
      "How long can each person walk comfortably, including stairs?",
      "Does anyone use a cane, wheelchair or knee support?",
      "Are early starts and long winding-road sectors acceptable?",
      "Are regular toilet, medication or rest stops needed?",
      "Will the party divide for glass walkways or longer trails?",
      "How much time should be protected for photography or children?",
    ],
    actionTitle: "Turn the answers into route decisions",
    actions: [
      "Use one major mountain system per day.",
      "Choose lifts and cableways deliberately.",
      "Set a meeting point if the party divides.",
      "Use a private vehicle when mobility or luggage justifies it.",
      "Do not place a long old-town evening after the hardest park day.",
    ],
    closing:
      "The value of a private route is not merely avoiding a coach. It is allowing one party to move at its own useful pace.",
  },
  meals: {
    label: "Meal requirements",
    title: "Define what “halal-friendly” means before choosing restaurants.",
    intro:
      "Halal-certified, Muslim-operated or self-described halal, no pork/no lard, and vegetarian are not interchangeable standards.",
    questions: [
      "Is recognised halal certification required?",
      "Would no pork and no lard be sufficient?",
      "What evidence is expected from a restaurant or supplier?",
      "Does the same requirement apply to hotel breakfast?",
      "How will lunch work inside a large scenic area?",
      "Are allergies or vegetarian needs separate requirements?",
    ],
    paragraphs: [
      {
        text:
          "JAKIM’s halal guidance covers ingredients, preparation, equipment, storage and cross-contact—not only the absence of pork. Recognition and certification status can change, so verify a current claim rather than relying on an old list or a package’s broad “halal meals” label.",
        sourceIds: ["jakim-halal-guide"],
      },
      {
        text:
          "A useful private proposal should state the promised meal standard, how hotel breakfast and park-day lunch will be handled, and what the fallback is when the planned restaurant is unavailable.",
        sourceIds: [],
      },
    ],
    note:
      "The meal standard, restaurant location and day route need to be designed together.",
  },
  weather: {
    label: "Weather and operations",
    title: "Flexibility needs a mechanism, not a promise.",
    intro:
      "Rain, fog, high demand and maintenance can change the value or availability of a mountain day. Decide what can move before everything is fixed.",
    actions: [
      "Keep the core Zhangjiajie nights together.",
      "Identify which reservations can change and which cannot.",
      "Prepare a lower-visibility alternative.",
      "Recheck official notices and weather before final ticket decisions.",
      "Agree who is authorised to rearrange the day.",
    ],
    closing: [
      "No planner can promise perfect visibility or unlimited last-minute changes.",
      "A credible route shows which parts can move, who makes the decision and what remains fixed.",
    ],
  },
  selfBooking: {
    label: "Choose the support level",
    title: "You can keep control without keeping every problem.",
    intro:
      "Choose support by responsibility and complexity, not by an artificial argument between “independent” and “tour”.",
    profiles: [
      {
        title: "Self-booked journey",
        body:
          "Suitable when the party is comfortable with separate apps, passport setup, park research and handling changes.",
        items: [
          "You book flights, rail, hotels and tickets",
          "You keep responsibility when one booking affects another",
          "A written route review or plan can still check the structure",
        ],
      },
      {
        title: "Selective local support",
        body:
          "Suitable when you want to keep major bookings but hand off difficult nodes.",
        items: [
          "Selected airport or station transfers",
          "Private vehicle or guide on defined days",
          "Ticket sequencing and a local contact",
        ],
      },
      {
        title: "Coordinated private journey",
        body:
          "Suitable when the party wants one joined route and clearly assigned local responsibility.",
        items: [
          "A route designed around the party",
          "Agreed ground arrangements coordinated together",
          "Inclusions, exclusions and change handling defined before payment",
        ],
      },
    ],
  },
  duration: {
    label: "Calendar reality",
    title: "Count complete sightseeing days before choosing the trip length.",
    intro:
      "A package label counts calendar days. Your body experiences flights, immigration, transfers, hotel arrivals and complete mountain days.",
    days: [
      "Departure from your Malaysian city",
      "Arrival, immigration, sleep or onward transfer",
      "Complete sightseeing days based in Zhangjiajie",
      "Return transfer and international-flight protection",
      "Arrival back in Malaysia",
    ],
    explanation: [
      "For example, an overnight KUL–CSX flight followed by a first sleep and next-day transfer can consume the departure day and much of the next calendar day before the first complete park day. In that specific pattern, a seven-calendar-day trip may shrink to roughly three complete Hunan sightseeing days.",
      "A well-timed DYG nonstop, a different connection or a wider China route changes the calculation. That is why “7, 8 or 9 days?” has no universal answer until the actual flights are inserted.",
    ],
    formula:
      "Calendar days − flight, recovery, transfer and return-protection time = usable complete days",
    relatedGuideId: "zhangjiajie-itinerary",
    relatedLabel: "See what fits into 2, 3 or 4 complete Zhangjiajie days",
    relatedDescription:
      "After the gateway and transfers are fixed, allocate the remaining full days across the park systems.",
  },
  models: {
    label: "Before you pay",
    title: "A private proposal should say what the price actually covers.",
    intro:
      "Ask for operational detail, not a longer list of attraction names. These checks make quotations comparable without forcing the trip into the cheapest template.",
    ariaLabel: "Checklist for reviewing a private Zhangjiajie proposal",
    cards: [
      {
        label: "Transport and people",
        title: "Who appears, where and when?",
        body:
          "Identify every handoff that depends on a driver, guide or transfer.",
        items: [
          "Are international and domestic flights included?",
          "Which airport and station transfers are included?",
          "Which days have a guide, in which language?",
          "Is luggage capacity stated?",
        ],
      },
      {
        label: "Hotels and tickets",
        title: "What exactly has been reserved?",
        body:
          "A city name, star rating or “all tickets” label is too broad.",
        items: [
          "Exact hotel or at least exact area and room basis",
          "Park entrance, shuttle, lift and cableway inclusions",
          "Optional shows, glass attractions and extra fees",
          "Shopping stops or compulsory commercial visits",
        ],
      },
      {
        label: "Meals and changes",
        title: "What happens when the plan moves?",
        body:
          "Special needs and change rules should be visible before payment.",
        items: [
          "The exact halal, vegetarian or allergy standard",
          "Weather, closure and ticket-change responsibility",
          "Insurance, tips, refunds and rescheduling rules",
          "Who pays a fare or ticket difference",
        ],
      },
    ],
    closing:
      "If two proposals do not describe the same responsibilities, their prices are not directly comparable.",
  },
  preDeparture: {
    label: "Before departure",
    title: "Check entry, payment and mobile access before you fly.",
    paragraphs: [
      {
        text:
          "Malaysian ordinary-passport holders travelling for an eligible short visit can currently enter China visa-free for up to 30 days per entry, subject to no more than 90 days in any 180-day period. The passport should have at least six months’ validity. Border officers may ask for onward tickets, accommodation and evidence of travel purpose; private accommodation normally requires registration within 24 hours.",
        sourceIds: ["visa"],
      },
      {
        text:
          "Before departure, set up and test at least one China-compatible mobile payment option. Official guidance says overseas phone numbers and eligible foreign cards can be linked to major payment apps. Touch ’n Go eWallet may work at supported merchant QR codes, but it does not replace every attraction, transport or person-to-person payment workflow. Keep a physical card and some RMB cash as backups.",
        sourceIds: ["china-visitor-guide", "touch-n-go-china"],
      },
      {
        text:
          "Foreign visitors can buy a China SIM with a passport. Plan mobile data before relying on QR tickets, maps, railway messages or payment apps, and do not make the whole trip depend on one wallet or one phone.",
        sourceIds: ["china-visitor-guide"],
      },
    ],
    warningLabel: "Dynamic information",
    warning:
      "Entry rules, supported cards, app workflows and transport operations can change. Recheck the official guidance for your passport and travel date.",
  },
  cta: {
    label: "Start with the real journey",
    title: "Tell us where you start and what you want handled.",
    body:
      "You do not need a finished itinerary or a pre-selected Homeground product. We first identify the workable gateway, hotel-base pattern, complete sightseeing days and the parts that can remain self-booked.",
    prompt: "A useful first message includes:",
    items: [
      "Your Malaysian departure city",
      "Approximate dates or flights under consideration",
      "Who is travelling and the preferred pace",
      "The experiences that matter most",
      "Meal, mobility or comfort requirements",
      "What you want to book yourself and what you want handled",
    ],
    action: "Discuss my Zhangjiajie journey",
    note:
      "The first conversation is free. Detailed personalised work and any agreed ground arrangements begin only after the scope, responsible parties, delivery and payment are clear.",
    formNote:
      "Send one trip brief. You do not need to choose Route Review, Route Planning or Full Trip Support before speaking with us.",
  },
  methodology: {
    label: "How the guide was checked",
    title: "Rules, current offers and travel experience are kept separate.",
    paragraphs: [
      "We first checked official entry, airline, railway, visitor-payment and attraction information. Current supplier pages show what is on offer; completed-trip accounts add practical examples of what particular travellers encountered.",
      "No single package or review determines the route recommended here. Time-sensitive statements are dated and linked so they can be checked again.",
    ],
    dynamicNote:
      "Flight inventory, timetables, attraction operations and entry procedures are dynamic. The review date is shown at the top so time-sensitive claims can be checked again.",
  },
  related: {
    label: "Continue planning",
    title: "Solve the next Zhangjiajie decision",
    items: [
      {
        guideId: "zhangjiajie-itinerary",
        label: "What fits into 2, 3 or 4 complete days",
        description:
          "Allocate the usable days across Wulingyuan, Tianmen Mountain and optional additions.",
      },
      {
        guideId: "zhangjiajie-older-travellers",
        label: "Planning Zhangjiajie with parents or slower walkers",
        description:
          "Put walking, cableways, shuttle buses and recovery time into the same day.",
      },
      {
        guideId: "zhangjiajie-glass-bridge-vs-skywalk",
        label: "The Glass Bridge is not the glass skywalk",
        description:
          "Separate easily confused attraction names before buying the wrong ticket.",
      },
      {
        guideId: "best-zhangjiajie-night-show",
        label: "Which Zhangjiajie night show fits",
        description:
          "Compare the evening by hotel base, transport and the following morning.",
      },
      {
        guideId: "is-your-china-itinerary-too-rushed",
        label: "Is your wider China itinerary too rushed?",
        description:
          "Subtract flights, transfers and hotel changes from the printed day count.",
      },
    ],
    allGuides: "View all travel guides",
  },
  sources: {
    title: "Sources and review record",
    intro:
      "Sources are grouped by what they can prove. Dynamic details should be verified again for the traveller’s exact date.",
    categoryLabels: {
      official: "Official and operator sources",
      completed: "Completed-trip accounts and reviews",
      market: "Current Malaysia-market offers",
    },
    labels: {
      visa: "Chinese Embassy in Malaysia — visa-exemption FAQ",
      "malaysia-airlines-changsha":
        "Malaysia Aviation Group — Kuala Lumpur–Changsha route launch",
      "airasia-changsha":
        "AirAsia X — Kuala Lumpur–Changsha service resumption",
      "airasia-changsha-booking":
        "AirAsia — live Kuala Lumpur–Changsha flight page",
      "kuala-lumpur-zhangjiajie-launch":
        "Hunan Provincial Government — Kuala Lumpur–Zhangjiajie route launch",
      "railway-12306":
        "China Railway 12306 — foreign-passenger ticketing guidance",
      "zhangjiajie-tourist-buses":
        "Hunan Provincial Government — Zhangjiajie tourist-bus connections",
      "wulingyuan-tickets":
        "Hunan Development and Reform Commission — 2025 Wulingyuan ticket boundary",
      "china-visitor-guide":
        "Chinese Government — guide for visitors, payments and mobile services",
      "touch-n-go-china":
        "Touch ’n Go — official overseas QR payment coverage",
      "jakim-halal-guide": "JAKIM — official halal guidance",
      "tripadvisor-private-reviews":
        "Tripadvisor — recent Malaysian private-trip accounts",
      "minhakim-trip-account":
        "Minhakim Travels — first-person 7D5N Zhangjiajie account",
      "sj-echo-trip-account":
        "SJ Echo — Kuala Lumpur group’s Chongqing and Zhangjiajie account",
      "mayflower-private-tour":
        "Mayflower Holidays — current 5D4N private ground package",
      "koiman-package": "Koiman — current 7D5N Zhangjiajie package",
      "apple-package": "Apple Vacations — current 9D6N Zhangjiajie route",
    },
    inlineLabel: "Sources",
    externalLabel: "opens in a new tab",
  },
  images: {
    heroAlt:
      "Visitors look toward misty sandstone pillars rising above the forest in Zhangjiajie.",
    heroCaption:
      "The useful question is not how many sights fit on paper, but how the journey reaches the right base with enough complete days.",
    entranceAlt:
      "Travellers gather beneath dense green trees at an entrance to Zhangjiajie National Forest Park.",
    entranceCaption:
      "A park day includes entrances, queues, internal transport and walking pace—not only attraction names.",
  },
  structuredData: {
    description:
      "Plan Zhangjiajie from Malaysia by comparing flight gateways, hotel bases, complete sightseeing days, tickets, payments and private-trip support.",
    about: [
      "Zhangjiajie from Malaysia",
      "Kuala Lumpur to Changsha",
      "Kuala Lumpur to Zhangjiajie",
      "Private Zhangjiajie travel",
      "Wulingyuan hotel base",
      "China Railway 12306",
    ],
    audience:
      "Travellers starting in Malaysia who want a private or self-booked Zhangjiajie journey",
  },
} as const satisfies MalaysiaZhangjiajieGuideCopy;
