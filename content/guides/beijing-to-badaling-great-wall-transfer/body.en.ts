import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Badaling has several public routes, but they leave from different Beijing hubs and do not deliver you to an identical point. Start with the hotel-to-hub leg and the return inventory, not the smallest vehicle-time number." },
  { id: "answer", type: "callout", title: "The route name is only half the answer", tone: "decision", body: "High-speed rail is worth checking when Qinghe or Beijing North fits the hotel and the exact date has usable trains. S2 suburban rail currently starts at Nankou. Bus 877 currently starts near Beitucheng metro station. An airport route is relevant only when the airport is genuinely one endpoint, not as a city transfer shortcut." },
  { id: "matrix-heading", type: "heading", level: 2, text: "Four routes, four different first legs" },
  { id: "matrix", type: "table", caption: "Verify every named terminal on the travel date", columns: ["Route", "Best starting condition", "Practical difficulty", "Do not assume"], rows: [
    ["High-speed rail", "Qinghe or Beijing North is convenient and a train fits", "Reserved inventory, security, large stations and the steep station exit system", "All trains use the same Beijing station"],
    ["S2 suburban rail", "Nankou and the dated timetable fit", "A separate station, limited frequency and queues", "Older Huangtudian instructions are still current"],
    ["Bus 877", "Beitucheng is easy to reach and road variability is acceptable", "Finding the official stop, queues, traffic and return cutoff", "Older Deshengmen instructions are still current"],
    ["Airport direct bus", "Capital Airport is the real arrival or departure point", "Dated schedule, airport terminal and attraction operating day", "It runs daily forever or serves Daxing Airport"],
  ]},
  { id: "names", type: "callout", title: "Save the complete names", tone: "warning", body: "Badaling Great Wall Railway Station, Badaling S2 stop and the road-bus arrival are not interchangeable labels. In Beijing, save Qinghe or Beijing North for high-speed rail, Nankou for S2 and Beitucheng for Bus 877 in Chinese, then confirm the dated service before leaving." },
  { id: "clock-heading", type: "heading", level: 2, text: "Count the journey in both directions" },
  { id: "clock", type: "list", ordered: true, items: ["Hotel or airport to the correct terminal.", "Waiting, security or queue margin.", "The scheduled vehicle and its delay exposure.", "Arrival point to the chosen entrance and uphill movement.", "Descent, regrouping and the last safe return."] },
  { id: "groups", type: "comparison", title: "Which practical difficulty matters most?", columns: [
    { heading: "Light and flexible", items: ["Compare all current public routes", "Keep a second return option", "Carry Chinese names"] },
    { heading: "Family or parents", items: ["Reduce terminal uncertainty", "Plan steep walking and lifts", "Leave before the last return"] },
    { heading: "Airport or train connection", items: ["Use only a dated official link", "Allow enough time for baggage and check-in", "Avoid a risky same-day connection"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "Wrong hub or missed service" },
  { id: "recovery", type: "table", caption: "Choose a confirmed backup before moving farther", columns: ["Problem", "Action"], rows: [
    ["At the wrong Beijing rail station", "Check official ticket changes and route from your current station; do not race across the city on a guess"],
    ["S2 timetable does not fit", "Compare 877 and dated HSR inventory from the current location"],
    ["Unclear bus stop", "Ask uniformed staff and match the full route and destination in Chinese"],
    ["Return is failing", "Leave the scenic area, secure the next verified service and notify the hotel or onward carrier"],
  ]},
  { id: "facts", type: "callout", title: "Transport facts checked August 13, 2026", tone: "neutral", body: "Beijing Bus moved Route 877 from Deshengmen to Beitucheng on March 27, 2025. Beijing's transport authority says the S2 line has started at Nankou since October 25, 2025. High-speed rail uses separate railway stations, and a Capital Airport–Badaling service has dated operation. Recheck schedules, fares and operating days before travel." },
  { id: "help", type: "callout", title: "Need a route checked against your hotel?", tone: "decision", body: "Send the date, Beijing hotel or airport terminal, group size, mobility needs and fixed evening plan. Homeground can compare the complete journey and practical backup points without guaranteeing live inventory." },
  { id: "links", type: "internal-links", title: "Keep planning", items: [
    { label: "Which Beijing railway station?", href: "/guides/which-beijing-railway-station/", description: "Identify Qinghe, Beijing North and the other major terminals." },
    { label: "Where to stay in Beijing", href: "/guides/beijing-where-to-stay-first-trip/", description: "The district changes the first leg." },
    { label: "Beijing to Mutianyu", href: "/guides/beijing-to-mutianyu-great-wall-transfer/", description: "Use this only after choosing the Mutianyu section." },
    { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Protect a day with long transfers." },
  ]},
  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Badaling public transport routes", url: "https://english.beijing.gov.cn/latest/news/202406/t20240624_3725018.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Bus 877 moved to Beitucheng", url: "https://www.bjbus.com/home/fun_news_detail.php?uNewsCode=00010196&uNewsType=1", publisher: "Beijing Public Transport", reviewedAt: "2026-08-13" },
    { label: "S2 now starts at Nankou", url: "https://jtw.beijing.gov.cn/sjtl/202111/t20211118_2540164.html", publisher: "Beijing Municipal Commission of Transport", reviewedAt: "2026-08-13" },
    { label: "2026 Capital Airport direct service", url: "https://english.beijing.gov.cn/livinginbeijing/transportation/bus/202602/t20260211_4507827.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Hero: Badaling station by N509FZ, CC BY-SA 4.0; cropped", url: "https://commons.wikimedia.org/wiki/File:Exterior_of_Badaling_Great_Wall_Railway_Station_(20220109161541).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "Hero derivative licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
