import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Guilin and Yangshuo are not two single pins. Guilin has an airport and several rail stations; Yangshuo Railway Station is a transport hub, not a substitute for your Yangshuo hotel. River travel is an experience with its own pier and luggage chain." },
  { id: "answer", type: "callout", title: "Choose by the two addresses and the job of the day", tone: "decision", body: "Use a road transfer when airport or hotel doors and luggage matter most. Use rail when the exact station pair and onward vehicle make a clean chain. Treat a Li River cruise as a sightseeing day that changes the transfer, not as a generic fast shuttle." },
  { id: "matrix-heading", type: "heading", level: 2, text: "Three products that should not be ranked by one duration" },
  { id: "matrix", type: "table", caption: "Every option begins and ends somewhere different", columns: ["Option", "Good fit", "Missing leg", "Verify"], rows: [
    ["Rail to/from Yangshuo Station", "A through train or a convenient Guilin station matches", "Station-to-hotel road transfer on the Yangshuo side", "Exact stations, live train and confirmed onward pickup"],
    ["Pre-booked road vehicle or current scheduled service", "Hotel/airport endpoints, family or several bags", "Traffic, exact pickup and multiple drop-off possibilities", "Current operator, both pins, luggage and latest check-in"],
    ["Li River sightseeing cruise", "You want the river itself to be the day's experience", "Guilin-side pier access, no luggage storage on the one-way cruise and hotel transfer after arrival", "Mopanshan or Zhujiang departure, Longtoushan arrival, sailing date and operating notice"],
  ]},
  { id: "warning", type: "callout", title: "Yangshuo Station is in Xingping, not at your hotel", tone: "warning", body: "Pin the railway station and the accommodation separately before buying. A short rail segment can lose its advantage if the Guilin departure station or Yangshuo road handoff is wrong." },
  { id: "direction-heading", type: "heading", level: 2, text: "Direction matters for a river day" },
  { id: "direction", type: "paragraph", text: "The official Li River guide describes the essence cruise as a one-way trip of about 60 kilometres and four hours: three-star boats leave Mopanshan Passenger Port, four-star boats leave Zhujiang Passenger Port, and both disembark at Yangshuo Longtoushan Pier. The two Guilin departure ports are different places, and this is not a symmetric return service." },
  { id: "groups", type: "comparison", title: "Match the chain to the traveller", columns: [
    { heading: "Airport arrival", items: ["Protect flight delay margin", "Road may remove two handoffs", "Tell the hotel if late"] },
    { heading: "Rail through-trip", items: ["Search the exact Yangshuo stop", "Confirm station pickup", "Do not detour through Guilin city without a reason"] },
    { heading: "Scenic, unhurried", items: ["Use the river as the day's purpose", "Do not assume luggage storage exists", "Keep a weather and water-level alternative"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "When the endpoints do not match" },
  { id: "recovery", type: "list", ordered: true, items: ["Read the full booked station, pier or stop.", "Share the exact hotel pin with the authorised operator.", "Protect check-in and the next fixed train before changing modes.", "Use official railway and local transport notices for live changes.", "Do not accept an unnamed roadside vehicle because it says Yangshuo."] },
  { id: "facts", type: "callout", title: "Dynamic transport facts checked August 12, 2026", tone: "neutral", body: "Official Li River guidance describes the essence cruise as a one-way journey of about 60 kilometres and four hours, with different departure ports for three- and four-star boats and arrival at Yangshuo Longtoushan Pier. The official site uses advance sales, keeps only limited same-day inventory and posts water-level closures and resumptions. Train calls must be checked for the date on 12306. No current official passenger timetable was found for the Yangshuo Station–town road connection, so confirm that leg rather than relying on an old fixed fare or schedule." },
  { id: "help", type: "callout", title: "Need the two endpoints compared?", tone: "decision", body: "Send the date, Guilin arrival point, Yangshuo hotel, people, luggage and whether the river is transport or an experience. Homeground can map the handoffs and facts to recheck." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Prepare for rail after choosing the station pair." },
    { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Give the river or road day enough space." },
    { label: "How to pay in China", href: "/guides/how-to-pay-in-china-as-a-tourist/", description: "Keep a payment fallback for the last mile." },
    { label: "Hotel near a metro station", href: "/guides/china-hotel-near-metro/", description: "Understand when a station label actually helps a stay." },
  ]},
  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Official Li River cruise endpoints and transport guidance", url: "https://en.liriver.com.cn/page/article/lyfw.jtcx", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-08-12" },
    { label: "Official cruise operating notices", url: "https://www.liriver.com.cn/mobile/article/zxlj.tzgg", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-08-12" },
    { label: "Official cruise notice: identity, one-way trip and no luggage storage", url: "https://www.liriver.com.cn/page/article/zxlj.jqdt/126", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-08-12" },
    { label: "Current Guangxi rail-service notice", url: "https://jtt.gxzf.gov.cn/xwdt/zwxmtxx/t27417062.shtml", publisher: "Guangxi Department of Transport", reviewedAt: "2026-08-12" },
    { label: "Yangshuo Station location in Xingping", url: "https://m.qlgl.gov.cn/article-3-43849-1.html", publisher: "Guilin Municipal Commission for Discipline Inspection", reviewedAt: "2026-08-12" },
    { label: "Official railway ticket channel", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-12" },
    { label: "Hero: Yangshuo Station by Rat2, CC BY-SA 4.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "Hero derivative licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
