import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Guilin and Yangshuo are not two single pins. Guilin has an airport and several rail stations; Yangshuo Railway Station is a transport hub, not a substitute for your Yangshuo hotel. River travel is an experience with its own pier and luggage chain." },
  { id: "answer", type: "callout", title: "Choose by the two addresses and the job of the day", tone: "decision", body: "Use a road transfer when airport or hotel doors and luggage matter most. Use rail when the exact station pair and onward vehicle make a clean chain. Treat a Li River cruise as a sightseeing day that changes the transfer, not as a generic fast shuttle." },
  { id: "matrix-heading", type: "heading", level: 2, text: "Three products that should not be ranked by one duration" },
  { id: "matrix", type: "table", caption: "Every option begins and ends somewhere different", columns: ["Option", "Good fit", "Missing leg", "Verify"], rows: [
    ["Rail to/from Yangshuo Station", "A through train or a convenient Guilin station matches", "Station-to-hotel road transfer on the Yangshuo side", "Exact stations, live train and confirmed onward pickup"],
    ["Road coach or vehicle", "Hotel/airport endpoints, family or several bags", "Traffic, exact pickup and multiple drop-off possibilities", "Licensed operator, both pins, luggage and latest check-in"],
    ["Li River cruise", "The river journey is a planned experience and direction fits", "Pier access, luggage handling, weather/river operations and hotel transfer", "Official/authorised product, pier, sailing date, bag rule and arrival"],
  ]},
  { id: "warning", type: "callout", title: "A ticket to Yangshuo Station is not a ticket to West Street", tone: "warning", body: "Pin the railway station and the accommodation separately before buying. A short rail segment can lose its advantage if the Guilin departure station or Yangshuo road handoff is wrong." },
  { id: "direction-heading", type: "heading", level: 2, text: "Direction matters for a river day" },
  { id: "direction", type: "paragraph", text: "Do not assume a sightseeing sailing is a symmetric transport service. Confirm the departure pier, arrival pier, operating date, luggage handling and how you will reach the hotel afterward. Build the reverse journey independently rather than mirroring the outbound." },
  { id: "groups", type: "comparison", title: "Match the chain to the traveller", columns: [
    { heading: "Airport arrival", items: ["Protect flight delay margin", "Road may remove two handoffs", "Tell the hotel if late"] },
    { heading: "Rail through-trip", items: ["Search the exact Yangshuo stop", "Confirm station pickup", "Do not detour through Guilin city without a reason"] },
    { heading: "Scenic, unhurried", items: ["Use the river as the day's purpose", "Move or store luggage deliberately", "Keep weather recovery"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "When the endpoints do not match" },
  { id: "recovery", type: "list", ordered: true, items: ["Read the full booked station, pier or stop.", "Share the exact hotel pin with the authorised operator.", "Protect check-in and the next fixed train before changing modes.", "Use official railway and local transport notices for live changes.", "Do not accept an unnamed roadside vehicle because it says Yangshuo."] },
  { id: "facts", type: "callout", title: "Dynamic transport facts checked August 12, 2026", tone: "neutral", body: "Guangxi official planning treats airport, rail stations, road transport and major scenic areas as separate nodes whose last-mile links require coordination. Train services, road coaches, sailings, piers, fares, baggage rules and weather operations are date-specific. This page publishes no fixed timetable." },
  { id: "help", type: "callout", title: "Need the two endpoints compared?", tone: "decision", body: "Send the date, Guilin arrival point, Yangshuo hotel, people, luggage and whether the river is transport or an experience. Homeground can map the handoffs and facts to recheck." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Prepare for rail after choosing the station pair." },
    { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Give the river or road day enough space." },
    { label: "How to pay in China", href: "/guides/how-to-pay-in-china-as-a-tourist/", description: "Keep a payment fallback for the last mile." },
    { label: "Hotel near a metro station", href: "/guides/china-hotel-near-metro/", description: "Understand when a station label actually helps a stay." },
  ]},
  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Guilin transport and last-mile policy", url: "https://fgw.gxzf.gov.cn/zfxxgkzl/wjzx/tzgg/t2196037.shtml", publisher: "Guangxi Development and Reform Commission", reviewedAt: "2026-08-12" },
    { label: "Current rail-operation reminder", url: "https://jtt.gxzf.gov.cn/xwdt/tpxw/t8700434.shtml", publisher: "Guangxi Department of Transport", reviewedAt: "2026-08-12" },
    { label: "Official railway ticket channel", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-12" },
    { label: "Hero: Yangshuo Station by Rat2, CC BY-SA 4.0; cropped", url: "https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
