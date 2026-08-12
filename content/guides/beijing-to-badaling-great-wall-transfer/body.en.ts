import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Badaling has several public routes, but they leave from different Beijing hubs and do not deliver you to an identical point. Start with the hotel-to-hub leg and the return inventory, not the smallest vehicle-time number." },
  { id: "answer", type: "callout", title: "The route name is only half the answer", tone: "decision", body: "High-speed rail is worth checking when Qinghe or Beijing North fits the hotel and the exact date has usable trains. S2 suburban rail begins from its own current terminal. Bus 877 can suit a Deshengmen start. A current airport route is relevant only when the airport is genuinely one endpoint, not as a city transfer shortcut." },
  { id: "matrix-heading", type: "heading", level: 2, text: "Four routes, four different first legs" },
  { id: "matrix", type: "table", caption: "Verify every named terminal on the travel date", columns: ["Route", "Best starting condition", "Friction", "Do not assume"], rows: [
    ["High-speed rail", "Qinghe or Beijing North is convenient and a train fits", "Reserved inventory, security, large stations and the steep station exit system", "All trains use the same Beijing station"],
    ["S2 suburban rail", "Its current Beijing terminal and timetable fit", "Separate terminal identity, limited dated services and queues", "Old articles naming another terminal remain current"],
    ["Bus 877", "Deshengmen is easy to reach and road variability is acceptable", "Finding the official stop, queues, traffic and return cutoff", "Any nearby bus with a similar sign is the official service"],
    ["Airport direct bus", "Capital Airport is the real arrival or departure point", "Dated schedule, airport terminal and attraction operating day", "It runs daily forever or serves Daxing Airport"],
  ]},
  { id: "names", type: "callout", title: "Save the complete names", tone: "warning", body: "Badaling Great Wall Railway Station, Badaling S2 stop and the road-bus arrival are not interchangeable labels. In Beijing, save Qinghe, Beijing North, Huangtudian and Deshengmen in Chinese with the booked route; confirm which one applies today." },
  { id: "clock-heading", type: "heading", level: 2, text: "Count the journey in both directions" },
  { id: "clock", type: "list", ordered: true, items: ["Hotel or airport to the correct terminal.", "Waiting, security or queue margin.", "The scheduled vehicle and its delay exposure.", "Arrival point to the chosen entrance and uphill movement.", "Descent, regrouping and the last safe return."] },
  { id: "groups", type: "comparison", title: "Which friction matters most?", columns: [
    { heading: "Light and flexible", items: ["Compare all current public routes", "Keep a second return option", "Carry Chinese names"] },
    { heading: "Family or parents", items: ["Reduce terminal uncertainty", "Plan steep walking and lifts", "Leave before the last return"] },
    { heading: "Airport or train connection", items: ["Use only a dated official link", "Protect baggage and check-in time", "Avoid a same-day fragile chain"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "Wrong hub or missed service" },
  { id: "recovery", type: "table", caption: "Recover before moving farther", columns: ["Problem", "Action"], rows: [
    ["At the wrong Beijing rail station", "Check official ticket changes and route from your current station; do not race across the city on a guess"],
    ["S2 timetable does not fit", "Compare 877 and dated HSR inventory from the current location"],
    ["Unclear bus stop", "Ask uniformed staff and match the full route and destination in Chinese"],
    ["Return is failing", "Leave the scenic area, secure the next verified service and notify the hotel or onward carrier"],
  ]},
  { id: "facts", type: "callout", title: "Dynamic transport facts checked August 12, 2026", tone: "neutral", body: "Beijing's official information currently describes Bus 877, S2 suburban rail and high-speed rail as distinct routes. A direct Capital Airport–Badaling service was announced for 2026 with dated operation. Terminals, schedules, fares, attraction access and operating days remain changeable; verify them before travel." },
  { id: "help", type: "callout", title: "Need a route checked against your hotel?", tone: "decision", body: "Send the date, Beijing hotel or airport terminal, group size, mobility needs and fixed evening plan. Homeground can compare the complete chain and its recovery points without guaranteeing live inventory." },
  { id: "links", type: "internal-links", title: "Keep planning", items: [
    { label: "Which Beijing railway station?", href: "/guides/which-beijing-railway-station/", description: "Identify Qinghe, Beijing North and the other major terminals." },
    { label: "Where to stay in Beijing", href: "/guides/beijing-where-to-stay-first-trip/", description: "The district changes the first leg." },
    { label: "Beijing to Mutianyu", href: "/guides/beijing-to-mutianyu-great-wall-transfer/", description: "Use this only after choosing the Mutianyu section." },
    { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Protect a day with long transfers." },
  ]},
  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Badaling public transport routes", url: "https://english.beijing.gov.cn/latest/news/202406/t20240624_3725018.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Bus 877 visitor guidance", url: "https://english.beijing.gov.cn/latest/news/202407/t20240728_3760871.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "2026 Capital Airport direct service", url: "https://english.beijing.gov.cn/livinginbeijing/transportation/bus/202602/t20260211_4507827.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Hero: Badaling station by N509FZ, CC BY-SA 4.0; cropped", url: "https://commons.wikimedia.org/wiki/File:Exterior_of_Badaling_Great_Wall_Railway_Station_(20220109161541).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
