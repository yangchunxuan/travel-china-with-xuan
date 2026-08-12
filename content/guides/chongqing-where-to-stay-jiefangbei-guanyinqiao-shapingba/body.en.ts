import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Chongqing punishes vague location advice. Two hotels that look close on a flat map can be separated by steep roads, stairs, an elevator or several street levels. Choose the base that simplifies your repeated daily journeys, not the one with the longest attraction list." },
  { id: "answer", type: "callout", title: "The short decision", tone: "decision", body: "Choose Jiefangbei for a short first visit centred on Yuzhong's dense sights and late-night river-city atmosphere. Choose Guanyinqiao for a more conventional commercial base with active evenings and fewer reasons to enter the busiest peninsula streets every night. Choose Shapingba when west-side rail or west-side sights are a real part of the itinerary—not merely because the room looks farther from tourist crowds." },
  { id: "matrix-heading", type: "heading", level: 2, text: "What each base changes" },
  { id: "matrix", type: "table", caption: "Compare the daily chain, not district reputation", columns: ["Base", "Strongest fit", "Main sacrifice", "Check before booking"], rows: [
    ["Jiefangbei / central Yuzhong", "First visit, short stay, Hongya Cave–Chaotianmen–peninsula evenings", "Crowds, traffic and deceptive vertical walks", "Hotel entrance level, nearest usable station exit and vehicle drop-off"],
    ["Guanyinqiao", "Food, shopping and late evenings in a modern commercial centre", "Most classic Yuzhong sights require a cross-city journey", "Which side of the large commercial area the hotel actually sits on"],
    ["Shapingba", "West Railway Station logic, Ciqikou or west-side plans", "Longer returns after nights in central Yuzhong", "Exact station or rail connection; do not treat the whole district as one point"]
  ]},
  { id: "terrain", type: "callout", title: "A 600-metre pin is not necessarily a 600-metre walk", tone: "warning", body: "In central Chongqing, inspect the route in elevation as well as distance. Ask the property for the Chinese entrance name, vehicle drop-off point and the station exit it expects guests with luggage to use. A metro icon alone does not describe stairs, slopes or the final building entrance." },
  { id: "fit-heading", type: "heading", level: 2, text: "Choose by the journey you will repeat" },
  { id: "fit", type: "comparison", title: "Three common itineraries", columns: [
    { heading: "Two or three nights, first visit", items: ["Bias toward Jiefangbei", "Keep evening walks near the hotel", "Accept crowds for fewer late transfers"] },
    { heading: "Food and city life", items: ["Consider Guanyinqiao", "Confirm the precise block", "Budget travel time for Yuzhong days"] },
    { heading: "West-side arrival or sights", items: ["Test Shapingba against actual train station", "Group Ciqikou and west-side stops", "Avoid central late nights on every day"] }
  ]},
  { id: "luggage-heading", type: "heading", level: 2, text: "Luggage and late arrival change the answer" },
  { id: "luggage", type: "paragraph", text: "A traveller with children, an older relative or large suitcases should prefer a confirmed vehicle entrance over a theoretically central pin. Save the hotel name and address in Chinese, send the arrival method, and ask whether a car can stop at the same level as reception. If you arrive late, protect the easiest final handoff rather than forcing the perfect sightseeing district." },
  { id: "facts", type: "callout", title: "Dynamic facts checked August 12, 2026", tone: "neutral", body: "Chongqing's official English information continues to describe Kuixing Tower and surrounding Yuzhong sights as examples of the city's multi-level terrain, lists Ciqikou in Shapingba, and identifies Jiefangbei as an active night-time area. Those facts support the geography; the recommendations above are Homeground editorial judgements. Verify live metro service, station exits, road access and construction with official channels and the property for your dates." },
  { id: "checklist", type: "list", ordered: true, items: ["Mark every fixed arrival and departure point.", "Count the two trips you will repeat most often.", "Inspect elevation and the exact hotel entrance.", "Check one realistic late-evening return.", "Ask the property to confirm vehicle access and registration before the free-cancellation deadline."] },
  { id: "help", type: "callout", title: "Need a location check?", tone: "decision", body: "Send your dates, party size, arrival point, planned sights and approximate budget. Homeground can compare the areas and flag the hotel-location details that still need confirmation." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "Commercial aparthotel or residential rental?", href: "/guides/commercial-aparthotel-or-residential-rental-china/", description: "Check the operating model before choosing extra space." },
    { label: "Shanghai first-trip stay areas", href: "/guides/shanghai-where-to-stay-first-trip/", description: "Use the same repeated-journey method in Shanghai." },
    { label: "What ‘near the metro’ should mean", href: "/guides/china-hotel-near-metro/", description: "Test the final walk rather than the label." }
  ]},
  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Official feature on Chongqing's multi-level Yuzhong terrain", url: "https://english.cq.gov.cn/latestnews/Editor/202606/t20260608_15735957.html", publisher: "Chongqing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Official visitor information for Ciqikou in Shapingba", url: "https://english.cq.gov.cn/latestnews/activities/202606/t20260608_15735764.html", publisher: "Chongqing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Official 2026 night-life feature including Jiefangbei", url: "https://english.cq.gov.cn/latestnews/activities/202607/t20260714_15821893.html", publisher: "Chongqing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Hero: Jiefangbei at night by Baycrest, CC BY-SA 2.5; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Jiefangbei_night.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "Hero derivative licence: CC BY-SA 2.5", url: "https://creativecommons.org/licenses/by-sa/2.5/", publisher: "Creative Commons", reviewedAt: "2026-08-12" }
  ]}
] } as const satisfies StructuredPageBody;
export default body;
