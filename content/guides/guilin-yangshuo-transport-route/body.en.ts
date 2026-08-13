import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Guilin and Yangshuo each have several possible arrival and departure points. Guilin has an airport and multiple railway stations, while Yangshuo Railway Station is in Xingping rather than beside most Yangshuo hotels. A Li River cruise also requires separate plans for the departure pier and luggage." },
  { id: "answer", type: "callout", title: "Choose by the two addresses and the purpose of the day", tone: "decision", body: "Compare a road transfer when door-to-door access and luggage matter most. Compare rail only after matching the exact stations and arranging the final drive to the hotel. Choose a Li River cruise when the river itself is the day's experience, not because it looks like a fast shuttle on a map." },
  { id: "matrix-heading", type: "heading", level: 2, text: "Three products that should not be ranked by one duration" },
  { id: "matrix", type: "table", caption: "Every option begins and ends somewhere different", columns: ["Option", "Good fit", "Missing leg", "Verify"], rows: [
    ["Rail to/from Yangshuo Station", "A through train or a convenient Guilin station matches", "Station-to-hotel road transfer on the Yangshuo side", "Exact stations, live train and confirmed onward pickup"],
    ["Pre-booked road vehicle or current scheduled service", "Hotel/airport endpoints, family or several bags", "Traffic, exact pickup and multiple drop-off possibilities", "Current operator, both addresses, luggage and latest check-in"],
    ["Li River sightseeing cruise", "You want the river itself to be the day's experience", "Guilin-side pier access, no luggage storage on the one-way cruise and hotel transfer after arrival", "Mopanshan or Zhujiang departure, Longtoushan arrival, sailing date and operating notice"],
  ]},
  { id: "warning", type: "callout", title: "Yangshuo Station is not beside most Yangshuo hotels", tone: "warning", body: "Check the railway station and the hotel as two separate locations before buying. A short rail segment can lose its advantage if the Guilin departure station or the final road transfer in Yangshuo is poorly matched." },
  { id: "direction-heading", type: "heading", level: 2, text: "Direction matters for a river day" },
  { id: "direction", type: "paragraph", text: "The official Li River guide describes the essence cruise as a one-way trip of about 60 kilometres and four hours: three-star boats leave Mopanshan Passenger Port, four-star boats leave Zhujiang Passenger Port, and both disembark at Yangshuo Longtoushan Pier. The two Guilin departure ports are different places, and this is not a symmetric return service." },
  { id: "groups", type: "comparison", title: "Match the route to the traveller", columns: [
    { heading: "Airport arrival", items: ["Protect flight delay margin", "Road may remove two handoffs", "Tell the hotel if late"] },
    { heading: "Rail through-trip", items: ["Search the exact Yangshuo stop", "Confirm station pickup", "Do not detour through Guilin city without a reason"] },
    { heading: "Scenic, unhurried", items: ["Use the river as the day's purpose", "Do not assume luggage storage exists", "Keep a weather and water-level alternative"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "When the endpoints do not match" },
  { id: "recovery", type: "list", ordered: true, items: ["Read the full booked station, pier or stop.", "Share the exact hotel address with the authorised operator.", "Check hotel reception and the next fixed train before changing transport.", "Use official railway and local transport notices for live changes.", "Do not accept an unnamed roadside vehicle because it says Yangshuo."] },
  { id: "facts", type: "callout", title: "Dynamic transport facts checked August 13, 2026", tone: "neutral", body: "Official Li River guidance describes the essence cruise as a one-way journey of about 60 kilometres and four hours, with different departure ports for three- and four-star boats and arrival at Yangshuo Longtoushan Pier. Its visitor notice recommends buying at least one day ahead in busy periods, says pier access and the journey back from Yangshuo are not included, and confirms that the cruise has no luggage-storage service. Train stops must be checked for the date on 12306. No current official fixed timetable or fare was found for the Yangshuo Station–accommodation road transfer, so confirm that leg instead of relying on an old price or schedule." },
  { id: "help", type: "callout", title: "Need the two endpoints compared?", tone: "decision", body: "Send the date, Guilin arrival point, Yangshuo hotel, people, luggage and whether the river is transport or an experience. Homeground can compare the transfers and identify what must be checked again before travel." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Prepare for rail after choosing the station pair." },
    { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Give the river or road day enough space." },
    { label: "How to pay in China", href: "/guides/how-to-pay-in-china-as-a-tourist/", description: "Keep a payment fallback for the last mile." },
    { label: "Hotel near a metro station", href: "/guides/china-hotel-near-metro/", description: "Understand when a station label actually helps a stay." },
  ]},
  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Official Li River transport and pier guidance", url: "https://en.liriver.com.cn/page/article/lyfw.jtcx", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-08-13" },
    { label: "Official Li River ticket channel", url: "https://en.liriver.com.cn/page/article/lyfw.pwxx", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-08-13" },
    { label: "Official visitor notice: one-way trip, onward transport and no luggage storage", url: "https://www.liriver.com.cn/page/article/zxlj.jqdt/126", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-08-13" },
    { label: "Official railway ticket channel", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-13" },
    { label: "Official land notice locating the Yangshuo railway connection in Xingping", url: "https://dnr.gxzf.gov.cn/villageNews/show/450321?id=1240", publisher: "Guangxi Department of Natural Resources", reviewedAt: "2026-08-13" },
    { label: "Hero: Yangshuo Station by Rat2, CC BY-SA 4.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "Hero derivative licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
