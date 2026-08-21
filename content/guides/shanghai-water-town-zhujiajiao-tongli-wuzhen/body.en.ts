import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Zhujiajiao, Tongli and Wuzhen share canals, stone bridges and Jiangnan architecture, but they solve different trips. Zhujiajiao is the low-friction Shanghai day escape. Tongli pairs a resident water-town fabric with a major classical garden. Wuzhen is the strongest managed overnight environment, with East and West scenic zones and deliberate night-time infrastructure. Choose one by transfer tolerance and the experience missing from your route." },
    { id: "answer", type: "callout", title: "The direct answer", tone: "decision", body: "Choose Zhujiajiao for a simple day from Shanghai. Choose Tongli when Suzhou, the Retreat and Reflection Garden and a quieter canal-town texture matter. Choose Wuzhen when you can stay overnight and value an extensive, curated evening environment. Do not spend two days collecting similar bridge photographs unless water-town history is the trip's main theme." },
    { id: "matrix-heading", type: "heading", level: 2, text: "The three-town decision matrix" },
    { id: "matrix", type: "table", caption: "One town, one clear role", columns: ["Town", "Best use", "Main compromise"], rows: [
      ["Zhujiajiao", "Half/full day from Shanghai with the least intercity friction", "More day-trip pressure and less reason to move hotels"],
      ["Tongli", "Suzhou-linked day or quiet overnight centred on canals and the Retreat and Reflection Garden", "Requires a separate Shanghai–Suzhou/Tongli chain and current attraction checks"],
      ["Wuzhen", "Purposeful overnight, managed West Scenic Zone evening and a larger resort-like water-town experience", "Highest commitment; ticketed zones and transfer stages make a casual half day inefficient"],
    ] },
    { id: "zhujiajiao-heading", type: "heading", level: 2, text: "Zhujiajiao: choose access and street life" },
    { id: "zhujiajiao", type: "paragraph", text: "Shanghai's government places Zhujiajiao about 40 kilometres from central Shanghai and describes its historic block, bridges, canals and preserved buildings. The town's greatest advantage is that it remains inside the Shanghai travel system. Use it when the trip needs water-town texture without a new hotel or intercity rail task. Walk beyond the first congested bridge, choose one paid interior if desired and leave enough time for the city return." },
    { id: "tongli-heading", type: "heading", level: 2, text: "Tongli: choose a water town with a garden anchor" },
    { id: "tongli", type: "paragraph", text: "Suzhou's government describes Tongli as a canal town divided into islets and connected by old bridges. Its Retreat and Reflection Garden is part of the Classical Gardens of Suzhou World Heritage property. Tongli therefore offers a more specific cultural task than generic bridge-watching: study how a private garden, residences, alleys and water network fit together. It works especially well when Suzhou is already in the route." },
    { id: "wuzhen-heading", type: "heading", level: 2, text: "Wuzhen: choose the overnight transformation" },
    { id: "wuzhen", type: "paragraph", text: "Wuzhen's official tourism site distinguishes the earlier East Scenic Zone from the larger West Scenic Zone, which was developed as a combined sightseeing-and-leisure environment with accommodation, boats, visitor services and night lighting. That managed quality is the point for some travellers and the compromise for others. Choose it for a complete evening-to-morning experience, not for claims that it is the least commercial or most untouched." },
    { id: "what-you-miss", type: "comparison", title: "Choose what your wider route is missing", columns: [
      { heading: "No Suzhou, no spare night", body: "Zhujiajiao adds a water-town day with the lowest route disruption." },
      { heading: "Already visiting Suzhou gardens", body: "Tongli can extend the garden-and-canal story, but skip it if another similar town would feel repetitive." },
      { heading: "Need a slow overnight", body: "Wuzhen creates the strongest day-to-night change; protect arrival time and stay inside the experience long enough to justify the transfer." }
    ] },
    { id: "day-overnight-heading", type: "heading", level: 2, text: "Day trip or overnight?" },
    { id: "day-overnight", type: "table", caption: "The stay decision", columns: ["Pattern", "Best match", "Why"], rows: [
      ["Shanghai half day", "Zhujiajiao", "The route survives a late start and avoids a hotel move"],
      ["Suzhou-based full day", "Tongli", "The city and garden context are already nearby"],
      ["Dedicated one-night stop", "Wuzhen", "Evening lighting and early streets are central to the value"],
      ["Luggage-heavy transit day", "Usually none", "Storage, transfers and check-in can overwhelm the heritage visit"],
    ] },
    { id: "authenticity", type: "callout", title: "Do not rank 'authenticity' as a single number", tone: "neutral", body: "All three are living places shaped by conservation, residents, tourism and commerce in different proportions. Wuzhen openly documents a planned protection-and-tourism model; Tongli retains a resident town and ticketed heritage sites; Zhujiajiao mixes open streets with managed attractions. Ask which form helps you understand the place—not which one can pretend tourism never arrived." },
    { id: "transport", type: "list", items: [
      "Choose the town before buying transport; similarly named stations and scenic-area gates are not interchangeable.",
      "Confirm the final road or metro handoff and the return, not only the intercity train.",
      "For Wuzhen, distinguish East/West scenic zones, visitor centre and accommodation check-in location.",
      "For Tongli, confirm whether the planned garden and ticketed sights are open on the date.",
      "For Zhujiajiao, keep a Shanghai return route that survives evening crowding or weather."
    ] },
    { id: "failure", type: "table", caption: "Common failure and recovery", columns: ["Failure", "Recovery"], rows: [
      ["Rain changes the visit", "Use covered interiors and a shorter canal circuit; stone surfaces can be slippery"],
      ["Ticketed sight is closed", "Keep the town walk, one alternative interior and the return; do not buy from an unofficial workaround"],
      ["Town feels too crowded", "Move away from the first bridge/entrance cluster and shorten shopping stops"],
      ["Transfer runs late", "Protect the hotel or last return; do not force a paid zone just to justify the journey"],
      ["You already saw a similar town", "Focus on the unique garden/management/history layer or skip the second town"],
    ] },
    { id: "boundary", type: "callout", title: "One comparison page owns the choice", tone: "decision", body: "This page merges 'best water town near Shanghai', 'Zhujiajiao vs Tongli' and 'Wuzhen worth overnight' into one owner. It does not create separate thin comparison pages or replace the broader Shanghai–Suzhou–Hangzhou–Nanjing route-order guide." },
    { id: "links", type: "internal-links", title: "Connect the Jiangnan route", items: [
      { label: "Shanghai city hub", href: "/destinations/shanghai/", description: "Decide whether a water town beats another Shanghai day." },
      { label: "Shanghai–Suzhou–Hangzhou–Nanjing order", href: "/guides/shanghai-suzhou-hangzhou-nanjing-route-order/", description: "Place cities and nights before adding a town." },
      { label: "How to read a Suzhou garden", href: "/guides/how-to-read-a-suzhou-garden/", description: "Understand the garden language that makes Tongli distinct." },
      { label: "Shanghai to Hangzhou transport", href: "/guides/shanghai-hangzhou-transport-route/", description: "Keep intercity endpoints separate from a water-town detour." },
      { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Test whether another transfer adds real value." }
    ] },
    { id: "sources", type: "sources", title: "Official sources and image credit", items: [
      { label: "Zhujiajiao Historical and Cultural Block", url: "https://english.shanghai.gov.cn/en-HeritageZones/20240827/66903de4b44047a5aeb1284a2148fc09.html", publisher: "Shanghai Municipal People's Government", reviewedAt: "2026-08-22" },
      { label: "Tongli Ancient Town", url: "https://english.suzhou.gov.cn/szsenglish/sz5ajjq/201911/5212c69295364f8cb2c55ee5d5f13dcc.shtml", publisher: "Suzhou Municipal People's Government", reviewedAt: "2026-08-22" },
      { label: "Wuzhen official introduction and protection model", url: "https://www.wuzhen.com.cn/web/introduction?id=2", publisher: "Wuzhen Tourism", reviewedAt: "2026-08-22" },
      { label: "Wuzhen current visitor and ticket information", url: "https://www.wuzhen.com.cn/web/traver/info", publisher: "Wuzhen Tourism", reviewedAt: "2026-08-22" },
      { label: "Hero: Zhujiajiao by Chensiyuan, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:1_zhujiajiao_ancient_water_town_2023.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
