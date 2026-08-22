import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Verify the flowers before you choose the boat. Almost every disappointed Puzhehei trip starts the same way — someone saw a photograph, assumed a month, and booked. This page does not tell you when the lotus peaks, because nobody honestly can in advance. What it gives you instead is a verification ladder to run before you book and again on the morning you go, and then a way to choose between going out on the water and staying on land, once you know what the water and the weather are actually doing." },

  { id: "answer", type: "callout", title: "Four questions, not one", tone: "decision", body: "People collapse \"is the lotus out?\" into a single question. It is four. What are the broad seasons here in general? What is this particular year doing? What has the operator or the county said recently? And what is actually happening today — the weather, the water level, and whether the boats are running normally? Only the last two can decide your day, and only the last one can decide your morning. Everything in this guide is organised around keeping those four apart." },

  { id: "layers-heading", type: "heading", level: 2, text: "Separate the four layers before you look at a single photo" },
  { id: "layers-copy", type: "paragraph", text: "The reason this matters is that each layer ages at a different speed, and mixing them produces confident nonsense. A general season is stable across decades and tells you almost nothing about a Tuesday. A year's trend can run early or late. An operator's recent post is real but may be a week old. And the day itself — rain, wind, water level, whether a particular water route is running — can overturn all three by breakfast." },
  { id: "layers-table", type: "table", caption: "Four layers, four sources, four shelf lives", columns: ["Layer", "What it can tell you", "Where it comes from", "How long it stays true"], rows: [
    ["Broad season", "Roughly which part of the year is warm and wet enough for lotus, and when the scenic area runs its long-day schedule", "The operator's published opening seasons and its own descriptions of what each water route looks like in summer versus autumn and winter", "Years"],
    ["This year's trend", "Whether the season is running early or late", "Recent operator posts and county-level publicity", "Weeks"],
    ["Current official observation", "What the site itself says is happening now", "Scenic area announcements and recent news items on the operator's own site", "Days"],
    ["Today", "Whether you should go, and whether by boat", "Weather from the national meteorological service, plus same-day operator notices on boats and safety", "Hours"],
  ]},
  { id: "layers-warning", type: "callout", title: "A photograph from last July is not evidence about this July", tone: "warning", body: "Social posts and travel-site galleries are the single most common cause of a wasted trip here. They are usually undated, frequently reposted from other years, and almost never say what the water level was. Treat every image as a picture of some past day at an unknown point in some season, and go and check the four layers above instead. That includes the photograph at the top of this page, which was taken in June 2014 and is used to show the landscape, not this year's flowers." },

  { id: "ladder-heading", type: "heading", level: 2, text: "The verification ladder" },
  { id: "ladder-copy", type: "paragraph", text: "Run this once when you are deciding whether to come, and again on the morning you plan to go out. It takes a few minutes and it is the whole value of this page." },
  { id: "ladder-list", type: "list", ordered: true, items: [
    "Start with the scenic area operator's own site and official mini-programme. This is the only channel that speaks for the water itself, and it is where boarding reservations, route changes and closures appear first.",
    "Read the operator's recent announcements and news items rather than its evergreen description pages. The evergreen pages tell you what a route is; the announcements tell you what is happening.",
    "Cross-check with the county's own government and publicity channels, which cover festivals, road works and anything happening around the lakes rather than on them.",
    "Check the weather with the national meteorological service rather than a general app, and look for warnings as well as a forecast. Rain here is not just a comfort question; it changes water conditions.",
    "On the morning itself, re-check the operator for same-day boat and safety notices before you travel to a wharf. A route that ran yesterday is not a route that is running now.",
    "If anything is ambiguous, telephone the operator's published service line rather than guessing or asking a reseller.",
  ]},
  { id: "ladder-callout", type: "callout", title: "Reserve the boarding time, and reserve the hill", tone: "neutral", body: "Two things at Puzhehei work on advance reservation and catch people out. The operator states that boat boarding times can be reserved in advance through its official mini-programme, and that you should then arrive on time at the corresponding wharf to check in and board. Separately, it states that visiting Qinglong Hill requires an advance reservation through the mini-programme, that the reservation is free, and that once it succeeds you may climb. That hill is the classic elevated view over the lakes — which makes it the single most useful thing to have reserved if you end up choosing land over water." },

  { id: "water-heading", type: "heading", level: 2, text: "What the operator actually runs on the water" },
  { id: "water-copy", type: "paragraph", text: "\"Taking a boat at Puzhehei\" is not one product. The operator lists several distinct water experiences using different craft, and they are not interchangeable — the boat type changes how wet, how fast, how exposed and how sociable the trip is. Knowing which one you are buying is half the decision." },
  { id: "water-table", type: "table", caption: "The water routes as the operator lists them, checked 22 August 2026", columns: ["Route", "Craft", "What the operator says about it"], rows: [
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

  { id: "level-heading", type: "heading", level: 2, text: "Water level is the variable nobody checks" },
  { id: "level-copy", type: "paragraph", text: "Bloom gets all the attention, and water level quietly decides more. Puzhehei is a connected system of karst lakes, ponds and village waterways rather than a single reservoir, and the operator's own route descriptions read as a chain of linked bodies of water — one line runs between the hill and a reed pond, passing a second lake, a bridge, a third lake and villages on the way. A system like that responds to rainfall rather than holding a fixed line, and that has consequences for both of the choices in front of you." },
  { id: "level-list", type: "list", ordered: false, items: [
    "High water after heavy rain can make a route rougher, change what a boat can pass under or through, and is exactly the situation in which same-day notices appear.",
    "Low water can leave lotus beds sitting differently against the surface, which changes what a photograph from a boat will actually show.",
    "From above, on the hill, water level is legible at a glance in a way it simply is not from a boat at water height — one more reason to go up before you go out.",
    "Rain is not only a comfort question here. The operator's own visitor rules make damp, falling in and loss the visitor's responsibility, which is a fair warning about conditions rather than a disclaimer to skim.",
    "Neither the operator nor this page will publish a water level. Check the weather, read the same-day notices, and look at the lake before you commit money to a route.",
  ]},
  { id: "level-callout", type: "callout", title: "Rain changes the answer more than it changes the view", tone: "warning", body: "A wet day at Puzhehei is not simply a greyer version of a dry one. It can alter which routes run, how a small open boat feels, and how much of your equipment survives. If your verification on the morning turns up rain, the honest move is to reorder the day — hill and shore while it is wet, water later if it clears — rather than to press on with a booking made in better weather." },

  { id: "choice-heading", type: "heading", level: 2, text: "Boat or shore: what each one actually gives you" },
  { id: "choice-copy", type: "paragraph", text: "Once the flowers and the weather are verified, this is the real decision, and it is not a question of which is better. They give you different things and they fail in different ways." },
  { id: "choice-comparison", type: "comparison", title: "Two ways to see the same lakes", columns: [
    { heading: "On the water", items: ["You are inside the landscape, at flower height, moving between lakes and villages", "You are committed for the length of the route and cannot easily stop", "You will get wet in the splashing season, and possibly in rain", "Depends entirely on boats running normally on the day"] },
    { heading: "From the shore and the hill", items: ["You get the wide view that shows the karst peaks, the lakes and the fields together", "You can stop, wait out weather, and go back later in better light", "Much less affected by wind, water level or a suspended water route", "Needs the free Qinglong Hill reservation, and a shuttle plan"] },
    { heading: "Both, in the right order", items: ["Shore or hill first to read the landscape and see the actual state of the flowers", "Then the water route that matches what you saw", "Uses the shuttle rides an East line ticket already includes", "The most robust plan when the day is uncertain"] },
  ]},
  { id: "choice-callout", type: "callout", title: "Mobility, children and the elderly change this", tone: "decision", body: "The operator requires that elderly visitors and children be accompanied by an adult throughout, tells you that boarding and alighting are slippery, and says outright that anyone unwell should not board. A small boat is low, unstable to step into, and offers nowhere to sit out a squall. If anyone in your group would be uncomfortable with that, the shore-and-hill version of this trip is not a consolation prize; it is the better plan, and it happens to be the one that survives bad weather." },

  { id: "matrix-heading", type: "heading", level: 2, text: "Bloom, weather and boat status: the decision matrix" },
  { id: "matrix-copy", type: "paragraph", text: "Read down the column that matches what your verification found this morning. Nothing here assumes a month." },
  { id: "matrix-table", type: "table", caption: "What to do, given what you have actually confirmed", columns: ["Flowers", "Weather", "Boats", "Do this"], rows: [
    ["Confirmed good by the operator's own recent posts", "Clear or light cloud", "Running normally", "Go, and take a main water line. This is the day the trip was for"],
    ["Confirmed good", "Rain or strong wind", "Running, with cautions", "Do the hill and the shore first, and take the water later in the day only if it clears"],
    ["Confirmed good", "Rain", "Suspended or altered", "Shore and hill only. Do not wait at a wharf for a route that is not running"],
    ["Uncertain, or the season is running late", "Clear", "Running normally", "Go up the hill first. You can see the actual state of the water from above before you spend anything on a boat"],
    ["Poor, or clearly past", "Any", "Running", "Treat the water as a karst-and-village trip rather than a flower trip; the operator itself describes the autumn and winter routes as quiet rather than floral"],
    ["Unknown because you could not verify", "Any", "Any", "Do not build the day around the flowers. Build it around the landscape, and treat blooms as a bonus"],
  ]},

  { id: "fallback-heading", type: "heading", level: 2, text: "When the water is not an option" },
  { id: "fallback-copy", type: "paragraph", text: "A suspended water route is not the end of the visit, and this is worth planning before it happens rather than improvising at a wharf in the rain." },
  { id: "fallback-list", type: "list", ordered: false, items: [
    "The elevated viewpoint on Qinglong Hill is the single best substitute, and its reservation is free — reserve it whether or not you expect to use it.",
    "The shuttle network reaches the lake's north, west, east and south entrances and a number of shore points, including a stop named for the lotus boulevard, so a shore day is a real day rather than standing in one place.",
    "The traditional villages the water routes pass are also reachable on land, and the operator runs dedicated shuttle lines to several of them.",
    "The night tour is a separate product with its own timing, and can rescue an afternoon that was rained off.",
    "If the whole day fails, the operator's own recent posts suggest the wider area is the fallback, not a second attempt at the same water route in worse conditions.",
  ]},

  { id: "never-heading", type: "heading", level: 2, text: "What this page will never do" },
  { id: "never-copy", type: "paragraph", text: "Three commitments, because a flower-season page is unusually easy to write badly. First, it will never print a peak-bloom date or a date range presented as this year's answer — that is a forecast dressed as a fact, and the flowers do not read calendars. Second, it will never judge current conditions from social media photographs, however recent they look. Third, it will never be split into a page per month; the verification method is the same in every month, and a set of monthly pages would just be twelve chances to be out of date." },
  { id: "never-copy2", type: "paragraph", text: "What it will do is stay useful for years, because everything above is a method rather than a snapshot. The operator's channels, the county's channels, the meteorological service and the same-day check will still be the right ladder long after any particular season has passed." },

  { id: "facts", type: "callout", title: "Reviewed 22 August 2026", tone: "neutral", body: "The scenic area's opening seasons, boat operating times, water routes and craft, boarding-reservation arrangement, the free Qinglong Hill reservation, the shuttle network and its stops, the boat and visitor rules, and the water-splashing etiquette are all as published by the site's operator, Yunnan Puzhehei Culture and Tourism Development Co., Ltd., on the date shown. **Qiubei county government sites could not be opened from the network used for this research**, so the county layer of the ladder is described as a step to take rather than quoted; see the source log. No bloom date, no water level, no price and no current condition of any kind is asserted anywhere on this page. Bloom state, water level, boat routes and weather are all high-volatility facts that must be re-verified on the day you travel." },

  { id: "help", type: "callout", title: "Want help reading the conditions before you commit?", tone: "decision", body: "Send your dates, who is travelling and whether being on the water matters to you more than seeing the wide view. Homeground can help you run the ladder and shape a day that survives a bad forecast. We do not know the current bloom state, we do not hold boat reservations, and we will not guess at either — those come from the operator on the day." },

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
    { label: "Puzhehei scenic area: visitor rules, boat rules, shuttle network, opening seasons and reservation requirements", url: "https://www.qbpzh.net/tourism.html", publisher: "Yunnan Puzhehei Culture and Tourism Development Co., Ltd. (scenic area operator)", reviewedAt: "2026-08-22" },
    { label: "Puzhehei scenic area: announcements, recent news and the list of water routes", url: "https://www.qbpzh.net/", publisher: "Yunnan Puzhehei Culture and Tourism Development Co., Ltd.", reviewedAt: "2026-08-22" },
    { label: "East line by willow-leaf boat: route, stops, seasonal character and boat ticket-check times", url: "https://www.qbpzh.net/project_detail/c-_detailId%3D1846819502897463296.html", publisher: "Yunnan Puzhehei Culture and Tourism Development Co., Ltd.", reviewedAt: "2026-08-22" },
    { label: "National weather forecasts, warnings and public meteorological services", url: "https://www.cma.gov.cn/en/", publisher: "China Meteorological Administration", reviewedAt: "2026-08-22" },
    { label: "Public weather service portal", url: "https://weather.cma.cn/", publisher: "China Meteorological Administration", reviewedAt: "2026-08-22" },
    { label: "Hero: Puzhehei scenic area seen from the Qinglong Hill viewing platform, by Zhangmoon618, CC BY-SA 3.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Puzhehei_in_Yunnan,_China.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" },
    { label: "Hero derivative licence: CC BY-SA 3.0", url: "https://creativecommons.org/licenses/by-sa/3.0/", publisher: "Creative Commons", reviewedAt: "2026-08-22" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
