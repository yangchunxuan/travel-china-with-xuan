import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "decision-lead",
      type: "lead",
      text: "If a flight or train ticket is already issued, the gateway is fixed: KWL means Guilin Liangjiang International Airport, while 桂林, 桂林北 and 桂林西 are three different railway stations. If you have not booked, start with the services that actually operate on your date, then compare the complete journey to the real hotel door—including luggage, the final walk, reception hours and a late-arrival fallback.",
    },
    {
      id: "quick-answer",
      type: "callout",
      title: "The useful default is a test, not a rule",
      tone: "decision",
      body: "For a central Guilin hotel, test a workable train at Guilin Railway Station first; it often removes a longer city transfer. Use Guilin North or Guilin West when the better live train and the full onward journey justify them. Use KWL when the flight is the right intercity product. If the first bed is in Yangshuo or a rural property, compare the gateway-to-property chain before buying—do not route through central Guilin automatically.",
    },
    {
      id: "scope-boundary",
      type: "callout",
      title: "What this guide covers",
      tone: "neutral",
      body: "This page chooses among KWL, Guilin, Guilin North and Guilin West for an arrival or departure tied to an exact accommodation address. It explains name errors, luggage, late arrival and recovery. It does not rank every train, publish a timetable or fare, recommend drivers, compare individual hotels, or decide whether rail, road or a Li River cruise is best between Guilin and Yangshuo. That city-pair choice remains in the linked Guilin–Yangshuo guide. Yangshuo Station appears here only to prevent a naming mistake and direct you to that detailed guide.",
    },
    {
      id: "record-check",
      type: "list",
      ordered: true,
      items: [
        "Read the transport record before opening a map: flight number and KWL, or train number plus the complete Chinese origin and destination station names.",
        "Write the first night's exact property name, branch and Chinese address—not just ‘Guilin’, ‘Yangshuo’ or ‘Longji’.",
        "Mark the vehicle-accessible entrance separately from the pedestrian entrance when the hotel is on a narrow, scenic or countryside road.",
        "Add arrival processing, pickup or bus waiting, the road leg, the last walk, luggage handoffs and reception hours.",
        "Choose the backup before paying: a legal road ride, a later valid train, or a staffed arrival-side hotel if the rural handoff fails.",
      ],
    },
    {
      id: "matrix-heading",
      type: "heading",
      level: 2,
      text: "Four Guilin gateways, compared without a frozen route list",
    },
    {
      id: "gateway-matrix",
      type: "table",
      caption: "Search the real date first; the issued record then overrules every planning shortcut",
      columns: ["Gateway on the record", "When it enters the shortlist", "Door-to-door question", "Mistake to prevent"],
      rows: [
        [
          "Guilin Liangjiang International Airport / 桂林两江国际机场 / KWL",
          "A flight is the useful intercity choice, or the trip begins or ends with that flight.",
          "After immigration or baggage claim, does the current airport bus, authorised taxi/ride-hail or confirmed property transfer reach the exact first bed at the required hour?",
          "KWL is outside the central sightseeing area. A flight landing time is not a hotel arrival time, and a daytime bus is not an all-night promise.",
        ],
        [
          "Guilin Railway Station / 桂林站",
          "A live train calls here and the first or last address is in central Guilin; it is usually the first rail option to test for that situation.",
          "Can everyone move from the station exit to the actual hotel entrance with the planned bags, rather than stopping at a district label or scenic-area pin?",
          "桂林站 is one exact station. ‘Guilin’ on an English map is not permission to use North or West with the same ticket.",
        ],
        [
          "Guilin North Railway Station / 桂林北站",
          "The live train is clearly better, or a north-side hotel, pickup or onward road chain makes the total trip work.",
          "Does the train advantage survive the city transfer, station walking, luggage and the arrival hour?",
          "Do not select North from a compass rule or assume every useful high-speed train uses it. The exact dated train decides.",
        ],
        [
          "Guilin West Railway Station / 桂林西站",
          "A suitable train calls there and a confirmed road pickup makes the more outlying Lingchuan-side gateway rational.",
          "Who meets the group, at which signed pickup point, and what happens if the train is late or the driver cannot be found?",
          "Guilin West is not Yangshuo West Street. A hotel saying ‘near West Street’ says nothing about 桂林西站.",
        ],
      ],
    },
    {
      id: "direction-warning",
      type: "callout",
      title: "Never turn a railway corridor into a permanent station rule",
      tone: "warning",
      body: "Guilin, Guilin North and Guilin West are all real passenger stations, but stopping patterns change by date and timetable period. A recent train seen at one station is only a search clue. Search the exact journey in China Railway 12306 and read the issued Chinese station name character for character.",
    },
    {
      id: "destination-heading",
      type: "heading",
      level: 2,
      text: "Let the first real destination choose the last mile",
    },
    {
      id: "destination-table",
      type: "table",
      caption: "A city name is not a final address",
      columns: ["First real destination", "Gateway logic", "Hidden work before booking"],
      rows: [
        [
          "Central Guilin hotel, Two Rivers and Four Lakes or Elephant Trunk Hill side",
          "Test a workable Guilin Station train first, then compare North or West only when their live train produces a better full chain. From KWL, compare the current central-city airport corridor with an authorised direct vehicle.",
          "Correct hotel branch, road-accessible lobby, final walk, arrival time and reception—not a generic central-Guilin map pin.",
        ],
        [
          "Yangshuo town or West Street area",
          "Compare the actual KWL or Guilin rail gateway with a direct road link or a dated rail-plus-road chain. Do not add a Guilin city stop unless it serves the itinerary.",
          "The exact Yangshuo hotel, vehicle drop-off, traffic or pedestrian restriction and latest check-in. Use the separate Guilin–Yangshuo guide for the mode decision.",
        ],
        [
          "Yulong River countryside, Xingping or another Yangshuo-area property",
          "The accommodation's real road endpoint matters more than the word Yangshuo. A route to Yangshuo town may still finish far from the bed.",
          "Village/property name, driver contact, road reach, final walk, darkness and luggage handling. Yangshuo Station is in Xingping and is not a town-centre substitute.",
        ],
        [
          "A Longji terrace village or rural lodge",
          "Use the booked air or rail gateway only as the start of a separate road-and-walking chain. There is no single useful ‘Longji drop-off’.",
          "Confirmed village or entrance, property pickup, road closure/weather plan, vehicle limit, stairs or footpath and what happens to large cases.",
        ],
        [
          "Guilin city first, Yangshuo later",
          "Choose the arrival gateway for the first Guilin hotel. Build the later Guilin–Yangshuo move as a second decision rather than forcing both into one arrival transfer.",
          "Hotel luggage storage, departure pickup and the separate rail/road/river choice for the later day.",
        ],
      ],
    },
    {
      id: "yangshuo-boundary",
      type: "callout",
      title: "Yangshuo Station is a handoff, not a complete Yangshuo arrival",
      tone: "warning",
      body: "阳朔站 is a railway station in Xingping, separate from most Yangshuo town and Yulong River accommodation. This page mentions it only so that travellers do not confuse it with Guilin West or with the hotel address. To decide among train, road transfer and a Li River cruise—and to price in the final Yangshuo road leg—continue to the dedicated Guilin–Yangshuo transport guide.",
    },
    {
      id: "names-heading",
      type: "heading",
      level: 2,
      text: "The station-name errors that cause real missed connections",
    },
    {
      id: "name-table",
      type: "table",
      caption: "Save the Chinese record offline before travel",
      columns: ["Name seen", "What it means", "It does not mean"],
      rows: [
        ["桂林站", "Guilin Railway Station, one specific railway terminal", "Any station in the Guilin area"],
        ["桂林北站", "Guilin North Railway Station", "The north entrance of 桂林站"],
        ["桂林西站", "Guilin West Railway Station", "West Street in Yangshuo, or a western exit of another station"],
        ["桂林两江国际机场 / KWL", "Guilin Liangjiang International Airport", "A railway station or a downtown air terminal"],
        ["阳朔站", "Yangshuo Railway Station in Xingping", "Yangshuo town centre or the hotel on West Street"],
      ],
    },
    {
      id: "door-heading",
      type: "heading",
      level: 2,
      text: "Calculate arrival at the bed, not arrival at the building",
    },
    {
      id: "door-chain",
      type: "comparison",
      title: "Three chains that look short until the missing pieces are added",
      columns: [
        {
          heading: "Flight to central hotel",
          items: [
            "Immigration or domestic arrival and baggage claim",
            "Current bus wait or signed taxi/ride-hail pickup",
            "Road journey to the correct branch",
            "Vehicle drop-off, final walk and reception",
          ],
        },
        {
          heading: "Train to city hotel",
          items: [
            "Correct destination station and exit",
            "Queue, pickup point or public-transport wait",
            "Road or bus leg with all bags",
            "Hotel entrance and check-in at the actual hour",
          ],
        },
        {
          heading: "Gateway to rural property",
          items: [
            "Confirmed named driver or current public service",
            "Road endpoint, not just county or scenic-area name",
            "Final lane, stairs, footpath or property shuttle",
            "Late-arrival and luggage fallback",
          ],
        },
      ],
    },
    {
      id: "luggage-heading",
      type: "heading",
      level: 2,
      text: "With luggage, count hands and surfaces",
    },
    {
      id: "luggage-copy",
      type: "paragraph",
      text: "A rolling case behaves differently on a station forecourt, a bus aisle, a taxi queue, a narrow hotel lane and village steps. Count how often each bag must be lifted, watched, transferred or carried. A direct vehicle can be worth comparing for several large cases, a stroller, an older traveller or a rural final leg; a current airport or city bus can work well when its real stop, operating window and final walk fit the group.",
    },
    {
      id: "luggage-service",
      type: "callout",
      title: "A luggage service is an option, not a route assumption",
      tone: "neutral",
      body: "A Guangxi transport authority update for the 2026 Spring Festival listed China Railway's ‘Light Travel’ door-to-station and station-to-door service at Guilin and Guilin North. Coverage, eligible orders, reservation windows and delivery areas can change, and that notice did not establish the same service at Guilin West. Check the current 12306 product for the exact journey; never book a difficult last mile on the assumption that a bag will be collected.",
    },
    {
      id: "late-heading",
      type: "heading",
      level: 2,
      text: "Late arrival changes the answer",
    },
    {
      id: "late-table",
      type: "table",
      caption: "Protect the weakest after-hours handoff",
      columns: ["Late-arrival situation", "Safer working plan", "Do not assume"],
      rows: [
        [
          "International or domestic flight reaches KWL late",
          "Recheck the airport's current bus sale, then keep the official taxi/ride-hail pickup and a hotel-notification plan. If a Yangshuo or rural link is no longer verified, stay on the arrival side or in Guilin and rebuild in daylight.",
          "The last published bus waits for a delayed flight, every app has cars, or a rural reception remains open.",
        ],
        [
          "Train reaches Guilin, North or West late",
          "Share the exact station and arrival update with the hotel or confirmed pickup. Keep an authorised road fallback and a staffed urban overnight if the final long transfer fails.",
          "A daytime bus still runs, the driver knows which Guilin station you mean, or the hotel door is vehicle-accessible.",
        ],
        [
          "Connection to Yangshuo or a village is missed",
          "Stop improvising long-distance transport at the curb. Contact the named property/operator, confirm the next valid option and sleep at a staffed, verified address if necessary.",
          "An unsolicited vehicle is authorised, insured, correctly priced or heading to the exact property.",
        ],
      ],
    },
    {
      id: "wrong-heading",
      type: "heading",
      level: 2,
      text: "If you reach the wrong station, recover in this order",
    },
    {
      id: "recovery-steps",
      type: "list",
      ordered: true,
      items: [
        "Stop and open the issued record. Confirm the Chinese departure station, train number, date, departure time and ticket status; do not navigate from a cropped screenshot or saved search.",
        "Decide whether you are at the correct railway station but the wrong entrance, square or pickup area, or at a completely different station. Ask uniformed railway staff before leaving the complex.",
        "If the correct station is elsewhere, compare the live road and public-transport arrival time at the correct entrance, then add ordinary station entry and luggage time. Keep the group, passports and cases together.",
        "If that margin is not clearly safe, ask 12306 or station staff about the current change or refund options before racing across Guilin. A ticket for one station does not become valid at another because the city name matches.",
        "If the error is on arrival, tell the hotel or named pickup which station you are actually at. Rebuild the transfer from that station rather than asking an unknown curbside driver to guess the destination.",
        "When the final rural or Yangshuo handoff can no longer be confirmed, use a verified staffed overnight and continue in daylight.",
      ],
    },
    {
      id: "first-trip-heading",
      type: "heading",
      level: 2,
      text: "First-time traveller checklist",
    },
    {
      id: "first-trip-checklist",
      type: "list",
      ordered: false,
      items: [
        "Issued flight or rail record saved offline, including KWL or the full Chinese station names",
        "Exact hotel branch, Chinese address, phone number, reception hours and vehicle-accessible entrance",
        "Arrival processing, station exit, pickup zone or current bus boarding point checked",
        "Every suitcase, stroller and mobility need tested against each handoff and final surface",
        "Property or authorised operator has the live arrival number and knows the exact gateway",
        "Current 12306, airport transport and navigation information rechecked on the travel date",
        "A clear cutoff for abandoning an uncertain long transfer and using a verified overnight",
      ],
    },
    {
      id: "dynamic-boundary",
      type: "table",
      caption: "What remains useful and what must be checked again",
      columns: ["Status", "Information", "Traveller action"],
      rows: [
        [
          "Durable decision logic",
          "An issued gateway is fixed; Guilin, Guilin North and Guilin West are not interchangeable; the hotel door and onward handoffs complete the journey.",
          "Use these rules on every trip.",
        ],
        [
          "Reviewed 21 August 2026",
          "Official sources separately listed KWL, the three Guilin railway stations and Yangshuo Station; the airport published central-city, North/West and Yangshuo ground-transport channels; railway luggage service was listed at Guilin and North in a dated 2026 notice.",
          "Treat this as a dated baseline, not a permanent timetable, fare or coverage promise.",
        ],
        [
          "Check for the exact journey",
          "Flight/train operation, station call, airport bus sale, first/last local connection, pickup zone, road access, hotel reception, luggage product and ticket remedy.",
          "Use the airline or 12306, the airport's current transport pages, live navigation and the named property/operator.",
        ],
      ],
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "Frequently asked questions",
    },
    {
      id: "faq-central",
      type: "heading",
      level: 3,
      text: "Which railway station is best for central Guilin?",
    },
    {
      id: "faq-central-answer",
      type: "paragraph",
      text: "Guilin Railway Station is usually the first one to test for a central hotel because it can reduce the city-side transfer. It wins only when a suitable live train calls there and the exact hotel chain works. A materially better train at Guilin North or West can still be the better door-to-door choice.",
    },
    {
      id: "faq-north",
      type: "heading",
      level: 3,
      text: "Are Guilin Station and Guilin North the same place?",
    },
    {
      id: "faq-north-answer",
      type: "paragraph",
      text: "No. 桂林站 and 桂林北站 are separate railway stations. The suffix is part of the ticketed name, not an entrance direction.",
    },
    {
      id: "faq-west-street",
      type: "heading",
      level: 3,
      text: "Is Guilin West close to Yangshuo West Street?",
    },
    {
      id: "faq-west-street-answer",
      type: "paragraph",
      text: "No. 桂林西站 is a Guilin-area railway station on the Lingchuan side. ‘West Street’ is a place in Yangshuo. Treat the station and hotel as separate endpoints and use the Guilin–Yangshuo guide for the route between them.",
    },
    {
      id: "faq-yangshuo",
      type: "heading",
      level: 3,
      text: "Should I use KWL or a railway station for a Yangshuo hotel?",
    },
    {
      id: "faq-yangshuo-answer",
      type: "paragraph",
      text: "Start with the flight or train choices that work for the intercity journey, then compare their complete transfer to the exact Yangshuo property. KWL has current official Yangshuo transport channels, but availability is dated; rail still needs the correct Guilin or Yangshuo station and a final road leg. There is no universal winner.",
    },
    {
      id: "faq-late",
      type: "heading",
      level: 3,
      text: "What if I arrive after the planned bus or pickup?",
    },
    {
      id: "faq-late-answer",
      type: "paragraph",
      text: "Contact the named property or operator, check the official current alternative and use an authorised road vehicle only from a confirmed pickup area. If the long or rural handoff cannot be verified, sleep at a staffed, verified address and continue in daylight.",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue the right part of the plan",
      items: [
        {
          label: "Compare Guilin and Yangshuo by rail, road or river",
          href: "/guides/guilin-yangshuo-transport-route/",
          description: "Use the detailed city-pair guide after the gateway and real Yangshuo address are known.",
        },
        {
          label: "Use China's high-speed trains for the first time",
          href: "/guides/china-high-speed-train-first-time-guide/",
          description: "Continue with 12306, passports, station entry, baggage rules and boarding after choosing the exact station.",
        },
        {
          label: "Choose a private transfer or public transport",
          href: "/guides/china-private-transfer-or-public-transport/",
          description: "Compare the last mile by handoffs, luggage, operating window and recovery.",
        },
        {
          label: "Plan the last night before an international flight",
          href: "/guides/china-last-night-before-international-flight/",
          description: "Decide whether a city or airport-side final night protects the KWL departure without sacrificing the whole stay.",
        },
        {
          label: "Test a hotel advertised as near transport",
          href: "/guides/china-hotel-near-metro/",
          description: "Check the real entrance, final walk and luggage route instead of trusting a distance label.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources and image credit",
      items: [
        { label: "Current Guilin city airport-bus channels, including central Guilin, Guilin North and Guilin West", url: "https://gl.airport.gx.cn/html/jiaotongxinxi/jiaotonggongju/snjcdb/73.html", publisher: "Guilin Liangjiang International Airport", reviewedAt: "2026-08-21" },
        { label: "Current airport intercity transport page, including Yangshuo channels", url: "https://gl.airport.gx.cn/html/jiaotongxinxi/jiaotonggongju/chengjidaba/", publisher: "Guilin Liangjiang International Airport", reviewedAt: "2026-08-21" },
        { label: "Official international-arrival and ground-transport choices", url: "https://gl.airport.gx.cn/html/chengjizhinan/daoda/daodazhinan/6.html", publisher: "Guilin Liangjiang International Airport", reviewedAt: "2026-08-21" },
        { label: "Official Li River transport page listing KWL, Guilin, Guilin North, Guilin West and Yangshuo Station separately", url: "https://en.liriver.com.cn/page/article/lyfw.jtcx", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-08-21" },
        { label: "China Railway live journey search", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-21" },
        { label: "2026 railway passenger and Light Travel luggage-service update", url: "https://jtt.gxzf.gov.cn/xwdt/zwxmtxx/t27181214.shtml", publisher: "Guangxi Department of Transport; source: China Railway Nanning Group", reviewedAt: "2026-08-21" },
        { label: "Official land record for the Guilin West-side transport project in Dingjiang, Lingchuan", url: "https://dnr.gxzf.gov.cn/z/exproInfoDetails?a=21984&b=450323&iframe=1", publisher: "Guangxi Department of Natural Resources", reviewedAt: "2026-08-21" },
        { label: "Hero image: Guilin Railway Station 202102, Rat2, cropped; CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Guilin_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-21" },
        { label: "Official app-based ride-hailing pickup guidance", url: "https://gl.airport.gx.cn/html/jiaotongxinxi/tingchechang/wycskd/", publisher: "Guilin Liangjiang International Airport", reviewedAt: "2026-08-21" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
