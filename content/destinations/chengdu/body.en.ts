import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Chengdu earns a place in a China itinerary for three different reasons, and they are not the same trip. It is a slower urban counterweight to Beijing, Xi'an or Shanghai. It is the easiest big-city base for a first panda visit. And it is the planning gateway for a much larger Sichuan journey. Decide which of those you are actually buying before you decide how many nights to book.",
    },
    {
      id: "role-heading",
      type: "heading",
      level: 2,
      text: "What Chengdu is doing in your route",
    },
    {
      id: "role-1",
      type: "paragraph",
      text: "Chengdu is often described as relaxed, which people hear as small. It is neither small nor frictionless: a very large provincial capital with two active airports, several separate railway hubs and attractions pointing in different directions. The slower reputation comes from how the city can be used rather than from how little there is. A tea-house block is allowed to stay a tea-house block. A meal can anchor an afternoon instead of being squeezed between monuments.",
    },
    {
      id: "role-2",
      type: "paragraph",
      text: "The recurring route mistake is to call everything reachable through Chengdu a Chengdu attraction. The Panda Base sits on the city's edge and can still be a Chengdu morning. Dujiangyan is a separate city to the west. Sanxingdui is in Guanghan. Leshan is another city to the south. Jiuzhaigou is a mountain destination with its own transport chain and its own beds. Chengdu is their gateway, not their neighbourhood.",
    },
    {
      id: "nights-heading",
      type: "heading",
      level: 2,
      text: "How many complete days does Chengdu itself need?",
    },
    {
      id: "nights-1",
      type: "paragraph",
      text: "Count sightseeing days, not itinerary labels. An evening landing at Tianfu produces dinner, not a Chengdu day. A morning train toward Jiuzhaigou is a transfer day even when the rail segment looks short.",
    },
    {
      id: "nights-table",
      type: "table",
      caption: "Chengdu and Sichuan stay shapes",
      columns: [
        "Stay shape",
        "Nights in the Chengdu block",
        "Usable sightseeing days",
        "What it holds honestly",
        "What to leave out",
      ],
      rows: [
        [
          "Tight city introduction",
          "2",
          "About 1.5",
          "A panda-focused morning plus one central-city block",
          "Sanxingdui, Leshan and any claim of having seen Sichuan",
        ],
        [
          "Recommended city stay",
          "3",
          "About 2–2.5",
          "Pandas, central culture and food, one flexible half day",
          "More than one major outbound excursion",
        ],
        [
          "City plus one branch",
          "4",
          "About 3",
          "Chengdu plus Sanxingdui, Dujiangyan or Leshan as one deliberate branch",
          "Jiuzhaigou as a day trip; two distant branches back to back",
        ],
        [
          "Chengdu and wider Sichuan",
          "5–6+",
          "About 4–5+",
          "Two city days plus an overnight or multi-day regional route",
          "Keeping every night downtown just to avoid moving hotels",
        ],
      ],
    },
    {
      id: "nights-2",
      type: "paragraph",
      text: "Two nights work when transport is kind: arrive by midday, give the next morning to pandas, then let the centre have one substantial block before a later departure. Three nights are far more resilient, because the panda visit no longer has to share a day with an opera evening or an unhurried central walk.",
    },
    {
      id: "nights-3",
      type: "paragraph",
      text: "Four nights should not mean three day trips. Two city days plus one branch is a stronger shape. Five or six allow Chengdu plus an overnight at Leshan or Dujiangyan, or an independent Jiuzhaigou segment. The honest measure is where the luggage sleeps, not what a package calls Chengdu.",
    },
    {
      id: "stay-heading",
      type: "heading",
      level: 2,
      text: "Where to stay: give each area one job",
    },
    {
      id: "stay-1",
      type: "paragraph",
      text: "The best base protects the majority of the trip, not the single closest attraction. Metro access, the actual hotel entrance, breakfast and the first and last transport day matter more than the district's reputation.",
    },
    {
      id: "stay-table",
      type: "table",
      caption: "Four Chengdu bases compared by job",
      columns: ["Area", "Best job", "What becomes easier", "What becomes harder", "Best fit"],
      rows: [
        [
          "Chunxi Road / Taikoo Li",
          "Central first-time base",
          "Dining, evenings, the Daci Temple block, multi-direction metro",
          "It is busy, and a landmark-view hotel can still be entered through a mall",
          "First visits, couples, food-led evenings",
        ],
        [
          "Tianfu Square",
          "Transport-balanced centre",
          "Orientation, museums, the People's Park side, simple interchanges",
          "The square itself is not the city's most intimate evening",
          "Families, short stays, predictable mornings",
        ],
        [
          "Kuanzhai Alleys / People's Park side",
          "Tea-house and older-street rhythm",
          "People's Park, lanes, slow mornings, the western centre",
          "Tourist pressure; vehicle access and older-property facilities vary",
          "Culture-led and repeat visitors",
        ],
        [
          "Chengdu East station area",
          "Transfer-first base",
          "Very early or very late trains using Chengdu East",
          "A weak way to experience the city; most sights need a separate ride",
          "One-night rail buffers only",
        ],
      ],
    },
    {
      id: "stay-2",
      type: "paragraph",
      text: "Chunxi Road and Taikoo Li are the practical default when evenings matter, but “near Taikoo Li” can mean an entrance buried inside a commercial complex — check the walk from the metro and the vehicle pickup point. Tianfu Square is a better orientation choice than its photographs suggest: it sits between several central tasks instead of owning one atmosphere.",
    },
    {
      id: "stay-3",
      type: "paragraph",
      text: "The Kuanzhai Alleys and People's Park side express the city's tea-house rhythm best, but the exact property decides whether a lane address is memorable or awkward with large luggage. Chengdu East is a logistics answer, not a general recommendation: use it for a protected night around a fixed train, then move downtown for the stay itself.",
    },
    {
      id: "teahouse-note",
      type: "callout",
      title: "The tea house is the itinerary, not a stop on it",
      body: "A central tea house rewards sitting long enough to watch a public park, a social routine and a commercial service overlap. Budget an hour or two, not a photograph. This is the single easiest way to feel why Chengdu is planned differently from Beijing or Xi'an.",
      tone: "decision",
    },
    {
      id: "gateways-heading",
      type: "heading",
      level: 2,
      text: "TFU, CTU and the railway stations are separate decisions",
    },
    {
      id: "gateways-1",
      type: "paragraph",
      text: "Chengdu Tianfu International (TFU) and Chengdu Shuangliu International (CTU) are both active passenger airports, and services move between them. During 2026 a group of Hong Kong, Macau and Taiwan regional flights transferred from Tianfu back to Shuangliu, so an itinerary written earlier in the year can send you to the wrong airport. The durable rule is to read the airport code and terminal on the current itinerary for every sector, and to confirm it with the operating carrier and the airport's own notice close to travel.",
    },
    {
      id: "gateways-table",
      type: "table",
      caption: "Chengdu gateways and what each one changes",
      columns: ["Hub", "Practical role", "City-side implication", "Planning rule"],
      rows: [
        [
          "TFU — Tianfu International",
          "Large newer airport south-east of the traditional centre",
          "A long transfer; Metro Line 18 helps but the full hotel-to-gate chain still has to be counted",
          "A late arrival is not a city evening; confirm the terminal for the exact flight",
        ],
        [
          "CTU — Shuangliu International",
          "Active airport south-west of the centre",
          "Usually closer to established central and south-western districts",
          "Do not assume it is domestic-only; some regional and international services use it",
        ],
        [
          "Chengdu East",
          "Primary high-speed gateway for many routes",
          "Strong metro links, but not central walking distance",
          "The ticketed station name controls; protect queue and in-station time",
        ],
        [
          "Chengdu South",
          "Passenger station on the south side",
          "Pairs naturally with south-city hotels and Line 18 airport access",
          "Some services use South instead of East; never substitute from memory",
        ],
        [
          "Chengdu West",
          "Western rail hub",
          "Useful for selected westbound and regional services",
          "Check the train number and the Chinese station name before booking a car",
        ],
        [
          "Chengdu Station (the old “north station”)",
          "Closed for reconstruction",
          "It cannot be used, whatever an old map label says",
          "Reported at over 70% complete in mid-2026 with a 2027 target; do not plan around a reopening",
        ],
      ],
    },
    {
      id: "gateways-2",
      type: "paragraph",
      text: "The same discipline applies to rail as to air. Chengdu East is the common first assumption because many high-speed services use it, but South and West are real hubs rather than alternative names for the same building. “Chengdu” on a route summary is not enough: save the full Chinese station name from the ticket and arrange the hotel departure around that exact building.",
    },
    {
      id: "city-heading",
      type: "heading",
      level: 2,
      text: "What actually belongs to the city day",
    },
    {
      id: "city-1",
      type: "paragraph",
      text: "A good Chengdu city day is built from compatible experiences rather than the maximum number of famous pins. One pattern starts at People's Park or another central tea house, moves through the western centre and a museum or older-street block, and ends with an unhurried meal. A second uses Daci Temple and the eastern central city to set older religious space beside contemporary commerce, then continues into neighbourhood dining without another cross-city hop.",
    },
    {
      id: "city-2",
      type: "paragraph",
      text: "A third takes Wuhou Shrine and its historical narrative, treating the commercial streets beside it as context rather than as evidence of a preserved ancient city. Travellers who prefer contemporary urban infrastructure can swap that block for one well-connected section of the city-ring greenway instead of pretending the whole ring is a single attraction.",
    },
    {
      id: "jinjiang-figure",
      type: "figure",
      src: "/images/destinations/chengdu/jinjiang-bridge-1200.webp",
      alt: "A covered bridge over the Jin River in central Chengdu at dusk, with modern office towers reflected in the water.",
      width: 1200,
      height: 750,
      caption:
        "The Jin River gives the central city an evening that does not require another cross-town transfer. Keeping one block near the water is usually worth more than adding a fourth daytime sight.",
    },
    {
      id: "city-3",
      type: "paragraph",
      text: "The Panda Base belongs to the city's visitor system, but it still consumes a serious morning plus its transport. Pair it with a flexible afternoon on the same side of the city — not with a distant museum, a fixed intercity train and an evening performance on the assumption that pandas are a one-hour stop.",
    },
    {
      id: "city-links",
      type: "internal-links",
      title: "Hand the city decisions to their owners",
      items: [
        {
          label: "Chengdu Panda Base or Dujiangyan Panda Valley?",
          href: "/guides/chengdu-panda-base-or-dujiangyan-panda-valley/",
          description:
            "Which venue suits the visit, and what each one really costs in time and travel.",
        },
        {
          label: "The Chengdu city-ring greenway",
          href: "/guides/chengdu-greenway-city-ring/",
          description:
            "Why one well-connected segment is more useful than treating the whole ring as an attraction.",
        },
        {
          label: "Sichuan opera and face-changing, in context",
          href: "/guides/sichuan-opera-face-changing-with-context/",
          description:
            "How to choose a programme and venue, and where face-changing sits in the wider tradition.",
        },
      ],
    },
    {
      id: "branches-heading",
      type: "heading",
      level: 2,
      text: "Which Sichuan places are branches, not half-days",
    },
    {
      id: "branches-1",
      type: "paragraph",
      text: "This is where most Chengdu itineraries break. Each of the following is reached from Chengdu, and none of them is a downtown add-on.",
    },
    {
      id: "branches-table",
      type: "table",
      caption: "Branches from Chengdu and the time each really needs",
      columns: ["Branch", "Where it actually is", "Minimum honest shape", "Common mistake"],
      rows: [
        [
          "Dujiangyan and Panda Valley",
          "Dujiangyan, a separate city west of Chengdu",
          "A full day, or an overnight if Qingcheng is added",
          "Calling Panda Valley a downtown panda alternative with no transfer cost",
        ],
        [
          "Sanxingdui Museum",
          "Guanghan, north-east of Chengdu",
          "A full day with a timed reservation and a real gallery route",
          "Treating a major archaeological museum as an afternoon stop",
        ],
        [
          "Leshan",
          "Another city to the south",
          "A long full day at minimum; an overnight makes it calmer",
          "Combining it with Emei in one day from Chengdu",
        ],
        [
          "Jiuzhaigou",
          "A mountain destination far to the north",
          "Its own transport chain and its own beds, usually several days",
          "Any version of the sentence “a day trip to Jiuzhaigou”",
        ],
      ],
    },
    {
      id: "dujiangyan-figure",
      type: "figure",
      src: "/images/destinations/chengdu/dujiangyan-1200.webp",
      alt: "The Dujiangyan irrigation site seen from above, with the river dividing between wooded hills and the town beyond.",
      width: 1200,
      height: 750,
      caption:
        "Dujiangyan is a river-scale engineering landscape in its own city. The view is the argument for giving it a day rather than an afternoon.",
    },
    {
      id: "branch-links",
      type: "internal-links",
      title: "Open the branch owner before booking it",
      items: [
        {
          label: "Sanxingdui Museum: booking and gallery order",
          href: "/guides/sanxingdui-museum-booking-and-gallery-order/",
          description: "Reservation, venue choice and a collection route that fits the day.",
        },
        {
          label: "Chengdu to Jiuzhaigou: the transport route",
          href: "/guides/chengdu-jiuzhaigou-transport-route/",
          description:
            "Air and road options, and what the journey costs before the valley starts.",
        },
      ],
    },
    {
      id: "recheck-heading",
      type: "heading",
      level: 2,
      text: "What to recheck shortly before you travel",
    },
    {
      id: "recheck-list",
      type: "list",
      items: [
        "The airport code and terminal for every sector, with the operating carrier — Chengdu's two airports exchange services.",
        "The full Chinese station name on each rail ticket, because East, South and West are different buildings.",
        "Timed reservations for the Panda Base and Sanxingdui, which control the shape of those days.",
        "Jiuzhaigou access and any seasonal or weather-driven change, which can move an entire segment.",
        "Public-holiday weeks, when Sichuan's headline sites and their transport behave differently.",
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two ways this goes wrong, and the fix",
    },
    {
      id: "scenario-1-heading",
      type: "heading",
      level: 3,
      text: "Three nights that were really one and a half days",
    },
    {
      id: "scenario-1",
      type: "paragraph",
      text: "A couple lands at Tianfu at 21:00, plans Sanxingdui on the first full day, pandas on the second morning and a 13:00 train out. In practice the arrival costs the next morning, Sanxingdui takes the whole first day, and the panda morning collides with checkout and a cross-city ride to the station. The fix is not to move faster: it is to drop Sanxingdui to a later branch day or add a night, and to let the panda morning and the departure sit on different days.",
    },
    {
      id: "scenario-2-heading",
      type: "heading",
      level: 3,
      text: "Four nights spent commuting from one downtown hotel",
    },
    {
      id: "scenario-2",
      type: "paragraph",
      text: "A family keeps a single central hotel and commutes to Dujiangyan, Leshan and Sanxingdui on consecutive days. Every day starts early, ends late, and the city they came for never happens. The fix is two protected Chengdu days plus one branch, or an overnight at the branch so the return journey stops eating the following morning.",
    },
    {
      id: "next-heading",
      type: "heading",
      level: 2,
      text: "Where Chengdu sits in the wider route",
    },
    {
      id: "next-1",
      type: "paragraph",
      text: "After Beijing or Xi'an, Chengdu changes the register toward everyday life, regional cooking and the landscapes of Sichuan. Before Chongqing it sets up a deliberate contrast with a steeper, faster city. Added to a tight Beijing–Xi'an–Shanghai line purely for pandas, it can become an expensive detour — decide whether you are buying the city, the pandas or the province.",
    },
    {
      id: "next-links",
      type: "internal-links",
      title: "Continue with the route owners",
      items: [
        {
          label: "Beijing, Xi'an and Chengdu: choose the route order",
          href: "/guides/beijing-xian-chengdu-route-order/",
          description:
            "Direction, gateways and how many usable half-days each order really produces.",
        },
        {
          label: "China in October: Golden Week or later?",
          href: "/guides/china-in-october-golden-week-or-later/",
          description:
            "How the holiday weeks change crowding, booking and transport across Sichuan.",
        },
        {
          label: "Is your China itinerary too rushed?",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description:
            "Read this when the problem is the number of bases and transfers rather than Chengdu itself.",
        },
      ],
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "Frequently asked questions",
    },
    {
      id: "faq-1-heading",
      type: "heading",
      level: 3,
      text: "How many nights do I need in Chengdu?",
    },
    {
      id: "faq-1",
      type: "paragraph",
      text: "Three is the comfortable answer for the city itself, producing roughly two to two and a half usable days. Two can work when arrival and departure are kind. Anything beyond three is usually buying a Sichuan branch rather than more Chengdu.",
    },
    {
      id: "faq-2-heading",
      type: "heading",
      level: 3,
      text: "Should I fly into Tianfu or Shuangliu?",
    },
    {
      id: "faq-2",
      type: "paragraph",
      text: "Whichever the booked ticket says. Both are active and services have moved between them during 2026, so an older transfer plan can be wrong. Shuangliu is usually closer to established central districts; Tianfu needs a larger door-to-door allowance.",
    },
    {
      id: "faq-3-heading",
      type: "heading",
      level: 3,
      text: "Can I see Sanxingdui and the Panda Base on the same day?",
    },
    {
      id: "faq-3",
      type: "paragraph",
      text: "Not honestly. Sanxingdui is in another city with a timed reservation and a museum that deserves real time; the Panda Base consumes a morning plus transport. Putting both in one day means doing neither properly.",
    },
    {
      id: "faq-4-heading",
      type: "heading",
      level: 3,
      text: "Is Jiuzhaigou a day trip from Chengdu?",
    },
    {
      id: "faq-4",
      type: "paragraph",
      text: "No. It is a mountain destination with its own transport chain and its own accommodation. Treat it as a separate segment of the trip, not as an excursion from a Chengdu hotel.",
    },
    {
      id: "faq-5-heading",
      type: "heading",
      level: 3,
      text: "Which Chengdu railway station will I use?",
    },
    {
      id: "faq-5",
      type: "paragraph",
      text: "Read it from the ticket. Chengdu East handles many high-speed services, but South and West are separate hubs, and the old central station is closed for reconstruction with a 2027 target — it cannot be part of a current plan.",
    },
    {
      id: "cta-heading",
      type: "heading",
      level: 2,
      text: "Turn the Chengdu choice into a China route",
    },
    {
      id: "cta-1",
      type: "paragraph",
      text: "When the trip is still a list of cities, test which sequence the available nights can actually hold. When flights and a day-by-day plan already exist, the better question is whether the plan protects real Chengdu days and gives each Sichuan branch its own time.",
    },
    {
      id: "cta-links",
      type: "internal-links",
      title: "Two ways to continue",
      items: [
        {
          label: "Route Finder",
          href: "/#route-finder",
          description: "Test which city sequence fits the nights you actually have.",
        },
        {
          label: "China itinerary review",
          href: "/china-itinerary-review/",
          description: "Bring an existing day-by-day route and have the weak links checked.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources and review record",
      items: [
        {
          label: "Chengdu Research Base of Giant Panda Breeding — visitor information",
          url: "https://www.panda.org.cn/en/about/introduction/",
          publisher: "Chengdu Research Base of Giant Panda Breeding",
          reviewedAt: "2026-08-17",
        },
        {
          label: "Jiuzhaigou official arrival modes and access",
          url: "https://www.jiuzhai.com/intelligent-service/arrival-mode",
          publisher: "Jiuzhaigou Valley Scenic and Historic Interest Area",
          reviewedAt: "2026-08-17",
        },
        {
          label:
            "Chengdu Station reconstruction reported above 70% complete with a 2027 opening target",
          url: "http://sc.people.com.cn/n2/2026/0617/c379471-41612759.html",
          publisher: "People's Daily Online, Sichuan channel",
          reviewedAt: "2026-08-17",
        },
        {
          label: "China Railway 12306 — confirm the exact station before booking",
          url: "https://www.12306.cn/en/index.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-17",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
