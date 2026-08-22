import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "Chongqing to Zhangjiajie is one direct high-speed corridor — roughly 500 km, with example services from Chongqing West (重庆西站) to Zhangjiajie West (张家界西站) running about 3.5–4.5 hours (reviewed August 2026). The chain has three decisions, and the last one hides the most time: which Chongqing station you depart from, the fact that Zhangjiajie West sits in the west of the city rather than at any park entrance, and whether tonight ends in Zhangjiajie's urban district or out in Wulingyuan where the park actually lives.",
    },
    {
      id: "first-steps",
      type: "list",
      ordered: true,
      items: [
        "Check ticket characters first: most Chongqing–Zhangjiajie services use 重庆西站; a few itineraries touch 重庆东站 or 重庆北站 — book and board by characters, not by city name.",
        "Search 重庆西 → 张家界西 for your date; example fastest services run near 3h40m, typical band 3h35m–4h45m.",
        "Decide tonight's base before buying onward transport: urban Zhangjiajie (near 天门山 side) or Wulingyuan (beside the park entrances).",
        "Urban base: short taxi or bus ride from Zhangjiajie West into town.",
        "Wulingyuan base: budget an additional road leg of roughly 40–70 minutes by bus or taxi (example band, reviewed August 2026); confirm the day's actual departure times locally.",
        "Treat a 19:00-or-later arrival as a travel day only: park gates and shuttle frequencies wind down early — do not plan same-evening sightseeing.",
        "Screenshot both stations' Chinese names plus your hotel address in Chinese before boarding.",
      ],
    },
    {
      id: "switching-para",
      type: "paragraph",
      text: "A hybrid plan also works and is underrated: night one in town after a later arrival, then a deliberate morning move out to Wulingyuan with luggage stored or forwarded, and the final night back in town before an early departure train. The cost is one extra hotel change; the benefit is that neither arrival nor departure ever fights the long road leg at a bad hour. Families with early risers usually prefer committing fully to Wulingyuan, while late-night arrivals from Chongqing often drift into this hybrid without planning it — better to choose it in advance.",
    },
    {
      id: "verdicts-heading",
      type: "heading",
      level: 2,
      text: "Quick verdicts by traveller type",
    },
    {
      id: "verdicts-table",
      type: "table",
      caption: "Who should land where tonight",
      columns: ["Traveller", "Better arrival branch", "Why"],
      rows: [
        [
          "Park-first visitor with 3+ days",
          "Wulingyuan",
          "The extra road leg happens once; every park morning starts at the gate",
        ],
        [
          "Two-night trip mixing Tianmen and one park day",
          "Urban Zhangjiajie",
          "Tianmen logistics live downtown; one park day tolerates a dawn bus",
        ],
        [
          "Arrival expected after 19:00",
          "Urban Zhangjiajie",
          "Late check-ins, taxis and food survive the hour; Wulingyuan links may not",
        ],
        [
          "Heavy luggage or mobility limits",
          "Match to tomorrow's first gate",
          "Minimising tomorrow's transfers beats minimising tonight's ride",
        ],
      ],
    },
    {
      id: "stations-heading",
      type: "heading",
      level: 2,
      text: "The three stations on each end",
    },
    {
      id: "stations-table",
      type: "table",
      caption: "Name card — check these characters",
      columns: ["Station", "Chinese", "Role on this route"],
      rows: [
        ["Chongqing West", "重庆西站", "Main hub for the Zhangjiajie direction; metro-connected"],
        ["Chongqing North", "重庆北站", "Northern hub; check if any service you consider starts here instead"],
        ["Chongqing East", "重庆东站", "Newer eastern station appearing on some regional itineraries — verify against your ticket"],
        ["Zhangjiajie West", "张家界西站", "High-speed arrival point on the Zhangjihuai line; west of the urban district — NOT at a park gate"],
        ["Zhangjiajie (old)", "张家界站", "Conventional trains closer to downtown; different network from the West station"],
      ],
    },
    {
      id: "bases-heading",
      type: "heading",
      level: 2,
      text: "City base versus Wulingyuan base",
    },
    {
      id: "bases-comparison",
      type: "comparison",
      title: "Where tonight lands changes tomorrow morning",
      columns: [
        { heading: "Urban Zhangjiajie base", items: [
          "Shorter arrival night: roughly 15–25 minutes example from Zhangjiajie West by taxi into the downtown hotel cluster",
          "Evening food streets and 天门山-side logistics; easier late check-ins",
          "Next morning adds a road leg toward the park before your first gate",
        ]},
        { heading: "Wulingyuan base", items: [
          "Longer arrival night: the extra road leg of roughly 40–70 minutes after the train (example band)",
          "Wake up beside park entrances; earliest shuttles reach gates before tour buses",
          "Fewer late-night food options; confirm hotel accepts foreign guests and late arrivals when booking",
        ]},
      ],
    },
    {
      id: "ledger-heading",
      type: "heading",
      level: 2,
      text: "Door-to-door ledger",
    },
    {
      id: "ledger-table",
      type: "table",
      caption: "Seven stages, either direction (example timings reviewed August 2026)",
      columns: ["Stage", "Typical cost", "Notes"],
      rows: [
        ["Hotel to Chongqing gateway", "20–50 min by metro/taxi across the river-valley terrain", "West station is farthest from Jiefangbei; add margin"],
        ["Security + gate buffer", "30–45 min", "Holiday peaks stretch queues"],
        ["Train", "3h35m–4h45m example band via Qianjiang corridor", "Scenic middle section through the mountains"],
        ["Exit Zhangjiajie West", "5–15 min", "Follow signs to bus bay or taxi rank"],
        ["To urban base", "15–25 min example", "Taxi rank usually faster than waiting for buses at night"],
        ["To Wulingyuan base", "40–70 min example", "Direct buses run daytime; taxis cost more but run later"],
        ["Check-in", "10 min", "Late arrivals must be pre-arranged with smaller guesthouses"],
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Three composite scenarios",
    },
    {
      id: "scenario-a-heading",
      type: "heading",
      level: 3,
      text: "Four days, Wulingyuan-centred",
    },
    {
      id: "scenario-a",
      type: "paragraph",
      text: "A couple with four free days wants maximum park time. They take the 11:46 example departure, reach Zhangjiajie West mid-afternoon, and push straight out to Wulingyuan by bus while daylight lasts — accepting that day one ends as logistics. Days two and three open at the gates within minutes of their guesthouse; the return morning reverses the chain with comfortable margin. Their pairing decision was made once, on night zero: every later morning starts beside the park instead of commuting in from town.",
    },
    {
      id: "scenario-b-heading",
      type: "heading",
      level: 3,
      text: "Short trip, urban base, Tianmen focus",
    },
    {
      id: "scenario-b",
      type: "paragraph",
      text: "A traveller with two nights cares about Tianmen Mountain as much as the forest park. An urban base wins: the arrival taxi from Zhangjiajie West is short even late, Tianmen's cable-car lower station sits in town, and the single park day becomes an early bus outing rather than a base move. The chain stays unbroken because both endpoints were chosen for the same district.",
    },
    {
      id: "scenario-c-heading",
      type: "heading",
      level: 3,
      text: "Late arrival after a delayed start",
    },
    {
      id: "scenario-c",
      type: "paragraph",
      text: "A family misses the intended noon departure and boards the 16:02 example service, reaching Zhangjiajie West around 19:36. Wulingyuan buses are finished or nearly so; the honest options are a taxi premium out to a pre-confirmed guesthouse, or one night in town with the Wulingyuan move at dawn. Because they had written option B down before boarding — an urban hotel near the bus station with a 24-hour front desk — recovery costs ten minutes of deciding instead of a midnight negotiation.",
    },
    {
      id: "mistakes-heading",
      type: "heading",
      level: 2,
      text: "Four mistakes this route punishes",
    },
    {
      id: "mistakes-list",
      type: "list",
      ordered: true,
      items: [
        "Assuming 张家界西站 sits near park entrances — it is a city-west rail hub with another road leg between it and the park.",
        "Booking by city name and boarding at 重庆北站 or 重庆东站 when the reserved service leaves 重庆西站.",
        "Planning same-evening gate entry after an afternoon arrival; shuttles and ticketing wind down earlier than trains do.",
        "Choosing a Wulingyuan guesthouse without confirming late check-in or foreign-guest acceptance — small properties enforce both strictly.",
      ],
    },
    {
      id: "corridor-heading",
      type: "heading",
      level: 2,
      text: "Reading the corridor before you commit",
    },
    {
      id: "corridor-para",
      type: "paragraph",
      text: "Direct Chongqing West → Zhangjiajie West services cluster around midday and afternoon in the example schedules reviewed August 2026, which means an early start from your hotel buys the widest choice of arrival times. The mountain routing through Qianjiang is genuinely scenic — river valleys and tunnel chains — but it also means fewer alternative paths when one service fails: this is a single-line corridor for most of its length, not a dense plain network. Practical consequences: book the earliest departure you can tolerate rather than the latest that technically works; treat the timetable's last direct service as a hard deadline for any same-day plan; and remember some departures continue beyond Zhangjiajie toward Changsha, so confirm your train actually calls at 张家界西站 rather than bypassing it.",
    },
    {
      id: "weather-heading",
      type: "heading",
      level: 2,
      text: "Weather and season on this chain",
    },
    {
      id: "weather-para",
      type: "paragraph",
      text: "The corridor crosses mountainous western Hunan and Chongqing, where fog, summer thunderstorms and winter ice can slow or briefly suspend road legs even when trains run. Two rules keep the chain honest. First, never book the last Wulingyuan bus of the day as your only plan — if weather delays the train by ninety minutes, that bus stops existing. Second, in peak summer and Golden Week, both train seats and Wulingyuan rooms sell out days ahead; a confirmed room is part of your transport chain, not separate from it. Winter visitors should assume early dusk: an arrival that feels mid-afternoon in June is effectively evening in December.",
    },
    {
      id: "tickets-heading",
      type: "heading",
      level: 2,
      text: "Tickets: what to expect and when to buy",
    },
    {
      id: "tickets-para",
      type: "paragraph",
      text: "Example second-class fares on the direct corridor sat around ¥273 (reviewed August 2026), with D-services slightly cheaper and slower. The 12306 presale window means holiday-date seats can vanish within minutes of release; set a reminder for the release morning rather than hoping. Foreign passports book as the travel document itself with no local phone requirement, but passport bookings sometimes need manual verification at a counter on first use — build ten extra minutes before your departure station security into day one.",
    },
    {
      id: "arrivalnight-heading",
      type: "heading",
      level: 2,
      text: "Arrival-night checklist",
    },
    {
      id: "arrivalnight-list",
      type: "list",
      ordered: true,
      items: [
        "Before boarding in Chongqing, message tonight's hotel with your train number and estimated arrival; ask them to confirm late check-in in writing.",
        "Decide the branch point — urban or Wulingyuan — before the train leaves, and know which bus stop or taxi rank that implies at Zhangjiajie West.",
        "Keep 武陵源 characters ready on your phone for drivers; pronunciation alone often fails here.",
        "Withdraw a small amount of cash as backup for guesthouses and rural taxis where card acceptance thins out.",
        "Eat on the train or before it: mountain-town kitchens close earlier than big-city ones, and arrival adrenaline hides hunger until it is too late.",
        "Set tomorrow's alarm for gate-opening logic, not hotel-breakfast logic — the park rewards the first hour more than any other.",
      ],
    },
    {
      id: "onward-heading",
      type: "heading",
      level: 2,
      text: "Arriving onward, and handing off cleanly",
    },
    {
      id: "onward-para",
      type: "paragraph",
      text: "Zhangjiajie West also connects toward Changsha by frequent intercity services, but that corridor belongs to its own guide — treat this page as ending at the branch point. If your plan continues to Fenghuang or Changsha after the parks, sequence those decisions after you have fixed tonight's base, because luggage stored at a Wulingyuan guesthouse changes what the onward leg should look like. The park itself has its own ticket-and-entrance system with multiple gates; that decision belongs to the park owner page linked below, not to this chain.",
    },
    {
      id: "routemap-callout",
      type: "callout",
      tone: "neutral",
      title: "The chain, both directions",
      body: "Chongqing hotel → Chongqing gateway (metro/taxi) → security and gate → G/D-service through the Qianjiang mountain corridor (3.5–4.5 h example band) → Zhangjiajie West → branch point: urban base by short taxi or bus, or Wulingyuan base by the longer road leg → hotel door. Reverse every arrow for the return; the corridor is symmetric, but a Wulingyuan morning departure must respect that buses leave earlier than you might guess.",
    },
    {
      id: "evening-heading",
      type: "heading",
      level: 2,
      text: "What a transport day honestly contains",
    },
    {
      id: "evening-para",
      type: "paragraph",
      text: "With a late-morning departure from central Chongqing and a Wulingyuan base, the door-to-door total commonly reaches seven to eight hours including both last miles — this is a travel day, not a sightseeing day. Arriving after roughly 18:00 makes same-evening park access unrealistic in any season: gate entries and intra-area shuttles wind down before the last trains arrive. The conservative plan treats arrival evening as dinner, luggage logistics and an early night, with gates at opening time tomorrow.",
    },
    {
      id: "risks-heading",
      type: "heading",
      level: 2,
      text: "Luggage, late arrivals and failure recovery",
    },
    {
      id: "risks-table",
      type: "table",
      caption: "Recovery paths for common failures",
      columns: ["Failure", "First move", "Then"],
      rows: [
        [
          "Wrong Chongqing station printed on ticket",
          "Check metro/taxi transfer time between stations before attempting a rush",
          "If unreachable in time, rebook per fare rules rather than sprinting across the valley city",
        ],
        [
          "Missed the reserved train",
          "Ticket window or app immediately — missed-train changes follow railway fare rules",
          "If nothing tonight suits, choose tonight's base by which still has confirmed late check-in, not habit",
        ],
        [
          "Arrived Zhangjiajie West after Wulingyuan buses ended",
          "Official taxi rank; give destination in characters (武陵源)",
          "Expect a premium versus the daytime bus; confirm the hotel takes late arrivals first",
        ],
        [
          "Weather closes mountain roads",
          "Follow station announcements over ride-hail rumours",
          "An urban-base fallback protects tomorrow's early gate better than gambling on a midnight road leg",
        ],
        [
          "Heavy luggage",
          "Taxis beat buses for the Wulingyuan leg despite cost",
          "Wulingyuan guesthouses often sit up slopes or stairways — confirm the entrance reality when booking",
        ],
      ],
    },
    {
      id: "dynamic-boundary",
      type: "callout",
      tone: "warning",
      title: "Dated examples, live check required",
      body: "Journey bands, road-leg estimates and service patterns here were reviewed August 2026 and shift with schedules, seasons and local operations. Station geography is stable. Verify today's times in 12306, and confirm local bus departures for Wulingyuan on arrival.",
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "What this guide covers",
      body: "One task: the unbroken Chongqing–Zhangjiajie transport chain including the final choice between urban and Wulingyuan bases. It does not choose Chongqing hotels in depth, plan Changsha routings (separate owner), arrange park tickets or walking orders, or promise any evening sightseeing.",
    },
    {
      id: "more-planning",
      type: "internal-links",
      title: "Related planning guides",
      items: [
        {
          label: "Zhangjiajie city or Wulingyuan base",
          href: "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
          description: "The overnight decision this chain feeds into, argued in full.",
        },
        {
          label: "Park tickets and entrances",
          href: "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/",
          description: "What waits at the gates your arrival chain approaches.",
        },
        {
          label: "First-time high-speed rail basics",
          href: "/guides/china-high-speed-train-first-time-guide/",
          description: "Passport booking, gates and onboard norms assumed above.",
        },
        {
          label: "Rail-only route design",
          href: "/guides/china-rail-only-route/",
          description: "Extending the corridor logic across a longer trip.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources reviewed",
      items: [
        {
          label: "China Railway 12306 — official platform (station names, live timetables)",
          url: "https://www.12306.cn/index/",
          publisher: "China State Railway Group",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Chongqing West → Zhangjiajie West schedule listing (example band 3h34m–4h45m; ~507 km)",
          url: "https://www.gaotie.com.cn/lieche/chongqingxi-zhangjiajiexi.html",
          publisher: "Gaotie.cn aggregator (dated example source)",
          reviewedAt: "2026-08-22",
        },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
