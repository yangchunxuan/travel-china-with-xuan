import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Verify the flowers before you choose the boat. A photograph and a month label can make a past season look current, while bloom timing and same-day operations may change. This guide does not predict a peak date. It gives you a short check to run before booking and again on the morning you go, followed by a way to choose between a confirmed boat product and the land access open that day." },

  { id: "answer", type: "callout", title: "Four checks, not one", tone: "decision", body: "Treat \"is the lotus out?\" as four separate checks: broad seasonal context, recent flower updates for this year, current official notices, and the weather warnings and actual access on your travel day. Use the first two as context. Build the day from the latest notice and the operator's same-day confirmation." },

  { id: "layers-heading", type: "heading", level: 2, text: "Separate the four layers before you look at a single photo" },
  { id: "layers-copy", type: "paragraph", text: "Each layer has a different shelf life. Broad seasonal context cannot describe a particular day, and a current-year flower update may soon age or omit your product. For the final plan, read the latest dated notice, check official weather warnings and confirm the exact route or entrance that day." },
  { id: "layers-table", type: "table", caption: "Four layers, four sources, four shelf lives", columns: ["Layer", "What it can tell you", "Where it comes from", "How long it stays true"], rows: [
    ["Broad season", "The operator's published seasonal context and when the scenic area uses its longer opening schedule", "The operator's opening seasons and descriptions of summer versus autumn and winter on the water routes", "Years"],
    ["This year's trend", "Whether the season is running early or late", "Recent operator posts and county-level publicity", "Weeks"],
    ["Current official observation", "What the site itself says is happening now", "Scenic area announcements and recent news items on the operator's own site", "Days"],
    ["Today", "Whether you should go, and whether by boat", "Weather from the national meteorological service, plus same-day operator notices on boats and safety", "Hours"],
  ]},
  { id: "layers-warning", type: "callout", title: "A photograph from last July is not evidence about this July", tone: "warning", body: "A social post or travel gallery may be undated or reposted from another year. Treat it as a past visit, not proof of current bloom, weather or boat access. The photograph at the top of this page was taken in June 2014 and shows the landscape, not this year's flowers." },

  { id: "ladder-heading", type: "heading", level: 2, text: "The verification ladder" },
  { id: "ladder-copy", type: "paragraph", text: "Use this sequence when deciding whether to come, then repeat the time-sensitive checks on the morning you plan to go out." },
  { id: "ladder-list", type: "list", ordered: true, items: [
    "Start with the scenic area operator's own site and official mini-programme. They are the primary sources for boarding reservations, route descriptions and operator closure notices.",
    "Read the operator's recent announcements and news items rather than its evergreen description pages. The evergreen pages tell you what a route is; the announcements tell you what is happening.",
    "Cross-check with the county's own government and publicity channels, which cover festivals, road works and anything happening around the lakes rather than on them.",
    "Check the national meteorological service and read warnings as well as the forecast. Use those warnings when deciding whether any outdoor plan is suitable.",
    "On the morning itself, re-check the operator for same-day boat and safety notices before you travel to a wharf. A route that ran yesterday is not a route that is running now.",
    "If anything is ambiguous, telephone the operator's published service line rather than guessing or asking a reseller.",
  ]},
  { id: "ladder-callout", type: "callout", title: "Reserve the boarding time, and reserve the hill", tone: "neutral", body: "The operator states that boat boarding times can be reserved through its official mini-programme; after booking, arrive on time at the corresponding wharf. Qinglong Hill also requires a free advance reservation. A successful reservation allows you to climb when the entrance is open, making it a useful land-view option when it suits your group and the day's access." },

  { id: "water-heading", type: "heading", level: 2, text: "What the operator actually runs on the water" },
  { id: "water-copy", type: "paragraph", text: "\"Taking a boat at Puzhehei\" is not one product. The operator lists several distinct water experiences using different craft, and they are not interchangeable — the boat type changes how wet, how fast, how exposed and how sociable the trip is. Knowing which one you are buying is half the decision." },
  { id: "water-table", type: "table", caption: "The water routes as the operator lists them, checked 23 August 2026", columns: ["Route", "Craft", "What the operator says about it"], rows: [
    ["East line", "Willow-leaf small boat", "Runs between Qinglong Hill and Pucaotang one way, passing Pucaotang, Xianren Lake, Lovers' Bridge, Puzhehei Lake and the traditional villages; described as summer water fights and lotus, quiet in autumn and winter"],
    ["East line mini tour", "Willow-leaf small boat", "A shorter version of the same idea"],
    ["Middle line", "Covered pleasure boat", "A separate main line"],
    ["West line", "Bamboo raft", "A separate main line"],
    ["Water-village visiting", "Black-awning or oar boat", "A different, slower experience through the village waterways"],
    ["Night tour", "Boat", "An evening product, separate from the day routes"],
    ["Swan Lake", "Entry, not a line", "Ticketed separately from the three main lines"],
  ]},
  { id: "water-copy2", type: "paragraph", text: "The operator refers to the East, Middle and West lines as the three main lines, and prices concessions against them as a group, which is a useful signal that these are the backbone and the rest are additions. It also states that an East line ticket carries four free shuttle rides on the day, valid from first check-in — worth knowing, because the shuttle network is how you move between the lake's entrances and the shore-side viewpoints." },
  { id: "water-rules", type: "list", ordered: false, items: [
    "Life jackets are to be worn for the whole trip, and you are told not to put your head, hands or feet outside the boat.",
    "The operator states plainly that people who are intoxicated or physically unwell should not board.",
    "Summer at Puzhehei includes organised water-splashing, and the operator publishes etiquette for it: do not splash the elderly, children, crew or anyone who does not want to be splashed, and do not use oars for water fights.",
    "You are told to waterproof electronics and secure valuables, and the operator states that losses from damp, falling in the water or loss are the visitor's own responsibility.",
    "Bring a change of clothes if you are going out in the water-fight season, and avoid a sudden cold soaking after strong sun.",
  ]},

  { id: "level-heading", type: "heading", level: 2, text: "Do not guess what water conditions mean" },
  { id: "level-copy", type: "paragraph", text: "The operator does not publish a water-level threshold that a traveller can use to predict access. Each boat product has its own operating decision. Do not turn recent rain, a photograph or a glance at the shore into a claim that a route will run; check the notice and ask about the exact product." },
  { id: "level-list", type: "list", ordered: false, items: [
    "Do not infer navigability from recent rain or from a visible water line. The operator's same-day notice and ticket desk decide whether a route is running.",
    "Old photographs cannot establish today's water or flower conditions, even when they were taken in the same month.",
    "Qinglong Hill can help you see the landscape and the visible state of the flowers; it is not a water-level gauge.",
    "Rain still matters for wet and slippery surfaces and for electronics. The operator tells visitors to waterproof devices and makes damp damage, falling into the water and loss the visitor's responsibility.",
    "Before paying, check the national forecast and warnings, read the operator's current notices, and ask whether the exact product you want is boarding.",
  ]},
  { id: "level-callout", type: "callout", title: "Rain changes what you must verify", tone: "warning", body: "Check official weather warnings and the operator's same-day notices before leaving. Do not assume that a hill is safe because a boat is suspended, or that a night sailing will run because rain stops later. Use only the options the operator confirms are open under the current conditions." },

  { id: "choice-heading", type: "heading", level: 2, text: "Boat or shore: what each one actually gives you" },
  { id: "choice-copy", type: "paragraph", text: "Once the flowers and the weather are verified, this is the real decision, and it is not a question of which is better. They give you different things and they fail in different ways." },
  { id: "choice-comparison", type: "comparison", title: "Two ways to see the same lakes", columns: [
    { heading: "On the water", items: ["You are inside the landscape, at flower height, moving between lakes and villages", "You are committed for the length of the route and cannot easily stop", "You may get wet during water-splashing activities or rain", "Requires confirmation that your chosen product is boarding that day"] },
    { heading: "From the shore and the hill", items: ["You get the wide view that shows the karst peaks, the lakes and the fields together", "You can stop or return later in better light when access remains open", "Not dependent on a boat route, but hill and shore access can still be affected by wind, rain or closures", "Needs the free Qinglong Hill reservation, and a shuttle plan"] },
    { heading: "Both, in the right order", items: ["Shore or hill first to read the landscape and see the actual state of the flowers", "Then the water route that matches what you saw", "Uses the shuttle rides an East line ticket currently includes", "Confirm both the entrance and boat product before combining them"] },
  ]},
  { id: "choice-callout", type: "callout", title: "Mobility, children and the elderly change this", tone: "decision", body: "The operator requires elderly visitors and children to be accompanied by an adult, warns that boarding and alighting can be slippery, and says anyone unwell should not board. If anyone in your group is uncomfortable with those conditions, choose a land-based visit only when the operator confirms that the relevant shore or hill access is open." },

  { id: "matrix-heading", type: "heading", level: 2, text: "Bloom, weather and boat status: the decision matrix" },
  { id: "matrix-copy", type: "paragraph", text: "Read down the column that matches what your verification found this morning. Nothing here assumes a month." },
  { id: "matrix-table", type: "table", caption: "What to do, given what you have actually confirmed", columns: ["Flowers", "Weather", "Boats", "Do this"], rows: [
    ["Confirmed good by the operator's own recent posts", "Clear or light cloud", "Running normally", "Go, and take a main water line. This is the day the trip was for"],
    ["Confirmed good", "Rain or strong wind", "Running, with cautions", "Follow the operator's restrictions; do not add a hill or boat solely because this table lists it"],
    ["Confirmed good", "Rain", "Suspended or altered", "Use only land access the operator confirms remains open; do not wait at a wharf for a suspended route"],
    ["Uncertain, or the season is running late", "Clear", "Running normally", "If Qinglong Hill access is open and reserved, use the view to inspect the visible flower state before choosing a boat"],
    ["Poor, or clearly past", "Any", "Running", "Treat the water as a karst-and-village trip rather than a flower trip; the operator itself describes the autumn and winter routes as quiet rather than floral"],
    ["Unknown because you could not verify", "Any", "Any", "Do not build the day around the flowers. Build it around the landscape, and treat blooms as a bonus"],
  ]},

  { id: "fallback-heading", type: "heading", level: 2, text: "When the water is not an option" },
  { id: "fallback-copy", type: "paragraph", text: "A suspended water route is not the end of the visit, and this is worth planning before it happens rather than improvising at a wharf in the rain." },
  { id: "fallback-list", type: "list", ordered: false, items: [
    "Qinglong Hill is a useful land alternative when its access is open. The reservation is free, so reserve it if it fits your plan and mobility.",
    "The shuttle network reaches the lake's north, west, east and south entrances and a number of shore points, including a stop named for the lotus boulevard, so a shore day is a real day rather than standing in one place.",
    "The traditional villages the water routes pass are also reachable on land, and the operator runs dedicated shuttle lines to several of them.",
    "The night tour is a separate product, not an automatic rain fallback. Consider it only if the operator confirms that it is running after conditions improve.",
    "If weather affects all outdoor options, use a pre-planned non-boat fallback rather than assuming a later sailing will run.",
  ]},

  { id: "never-heading", type: "heading", level: 2, text: "Three shortcuts to avoid" },
  { id: "never-copy", type: "paragraph", text: "Do not treat a fixed peak-bloom date as this year's answer. Do not use an undated social-media photograph as a current report. And do not assume a page labelled with your travel month replaces a fresh check: useful evidence is dated and specific to the visit or product." },
  { id: "never-copy2", type: "paragraph", text: "Use the operator for reservations, route descriptions and operating notices; county channels as an optional check for surrounding roads or events; the meteorological service for forecasts and warnings; and the operator again for same-day confirmation." },

  { id: "facts", type: "callout", title: "Reviewed 23 August 2026", tone: "neutral", body: "The operator's current pages support the opening seasons, boat times, listed water products and craft, boarding arrangement, free Qinglong Hill reservation, five shuttle lines and stops, visitor rules and water-splashing etiquette used here. This page publishes no bloom date, water level, price or claim that a route is running today. Flower state, weather, access and each boat product must be checked again on the day." },

  { id: "help", type: "callout", title: "Want help reading the conditions before you commit?", tone: "decision", body: "Send your dates, who is travelling and whether being on the water matters more than the wide view. Homeground can help compare confirmed options and prepare a non-boat alternative. Current bloom state and boat availability still need to come from the operator for your travel day." },

  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "China's climate regions and when to travel", href: "/guides/china-climate-regions-for-trip-timing/", description: "Where Yunnan's karst lake country sits in the national picture." },
    { label: "Shoulder season in China: the real trade-off", href: "/guides/china-shoulder-season-value-tradeoff/", description: "What you gain and lose by travelling outside the obvious weeks." },
    { label: "Kunming, Dali, Lijiang and Shangri-La in what order?", href: "/guides/kunming-dali-lijiang-shangri-la-route-order/", description: "If Puzhehei is one stop in a longer Yunnan route." },
    { label: "Yuanyang rice terraces: viewpoints and villages", href: "/guides/yuanyang-rice-terraces-viewpoint-and-village-route/", description: "Another Yunnan landscape where the light and the season decide the day." },
    { label: "China's public holiday travel calendar", href: "/guides/china-public-holidays-travel-calendar/", description: "The operator runs longer hours around the National Day period; plan for the crowds that come with it." },
    { label: "Reading China's karst sinkholes", href: "/guides/china-tiankeng-sinkholes-explained/", description: "The same limestone story that produced these lakes and peaks." },
    { label: "China itineraries with young children", href: "/guides/china-itinerary-with-young-children/", description: "Relevant here, because small boats and children need a deliberate plan." },
  ]},

  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Puzhehei scenic area: visitor rules, boat rules, shuttle network, opening seasons and reservation requirements", url: "https://www.qbpzh.net/tourism.html", publisher: "Yunnan Puzhehei Culture and Tourism Development Co., Ltd. (scenic area operator)", reviewedAt: "2026-08-23" },
    { label: "Puzhehei scenic area: announcements, recent news and the list of water routes", url: "https://www.qbpzh.net/", publisher: "Yunnan Puzhehei Culture and Tourism Development Co., Ltd.", reviewedAt: "2026-08-23" },
    { label: "East line by willow-leaf boat: route, stops, seasonal character and boat ticket-check times", url: "https://www.qbpzh.net/project_detail/c-_detailId%3D1846819502897463296.html", publisher: "Yunnan Puzhehei Culture and Tourism Development Co., Ltd.", reviewedAt: "2026-08-23" },
    { label: "National weather forecasts, warnings and public meteorological services", url: "https://www.cma.gov.cn/en/", publisher: "China Meteorological Administration", reviewedAt: "2026-08-23" },
    { label: "Public weather service portal", url: "https://weather.cma.cn/", publisher: "China Meteorological Administration", reviewedAt: "2026-08-23" },
    { label: "Hero: Puzhehei scenic area seen from the Qinglong Hill viewing platform, by Zhangmoon618, CC BY-SA 3.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Puzhehei_in_Yunnan,_China.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-23" },
    { label: "Hero derivative licence: CC BY-SA 3.0", url: "https://creativecommons.org/licenses/by-sa/3.0/", publisher: "Creative Commons", reviewedAt: "2026-08-23" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
