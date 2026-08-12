import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "The Xiamen-to-Gulangyu handoff has four names that must agree: your mainland arrival hub, the ticketed Xiamen ferry terminal, the ticketed island pier and the accommodation. Solving only 'airport to ferry' can still send you to the wrong boat." },
  { id: "answer", type: "callout", title: "Buy the dated ferry first, then connect the hub", tone: "decision", body: "Use Xiamen Ferry's official visitor purchase channel to select an available route and read both terminal names. Then price and time the transfer from Xiamen Airport, Xiamen Station or Xiamen North. Do not choose a downtown pier because an old map looks closer." },
  { id: "matrix-heading", type: "heading", level: 2, text: "Start points change the mainland transfer" },
  { id: "matrix", type: "table", caption: "The ferry ticket owns the terminal decision", columns: ["Start", "Main friction", "Protect"], rows: [
    ["Xiamen Airport", "Flight delay, baggage claim, road traffic and check-in cutoff", "A later ferry or mainland hotel fallback"],
    ["Xiamen Station", "Which exit, road pickup and city traffic", "Exact terminal pin and enough check-in margin"],
    ["Xiamen North Station", "Longer city transfer and a large rail hub", "Rail delay margin and a direct authorised pickup"],
    ["Xiamen hotel", "A short map distance can hide road access and crowds", "Ticketed terminal name, not 'nearest ferry'"],
  ]},
  { id: "warning", type: "callout", title: "Terminal names are operational facts", tone: "warning", body: "Visitor routes, resident routes, daytime arrangements and temporary changes are not interchangeable. Copy the full Chinese Xiamen terminal and Gulangyu arrival pier from the current booking; show both to the driver." },
  { id: "chain-heading", type: "heading", level: 2, text: "Build the chain through the island hotel" },
  { id: "chain", type: "list", ordered: true, items: ["Arrival hub to the exact ticketed terminal entrance.", "Identity/ticket checks and the operator's required margin.", "The named sailing to the named island pier.", "Pier to accommodation with realistic walking and luggage.", "Return sailing, mainland onward transport and weather recovery."] },
  { id: "groups", type: "comparison", title: "Luggage changes the island arrival", columns: [
    { heading: "Day trip, light bag", items: ["More walking remains possible", "Keep return inventory visible", "Carry the booking names"] },
    { heading: "Island hotel", items: ["Ask which pier the hotel recommends", "Confirm luggage help separately", "Do not assume vehicles meet the ferry"] },
    { heading: "Family or large cases", items: ["Avoid the tightest connection", "Keep documents with each traveller", "Consider a mainland first night after a late arrival"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "Wrong terminal or missed sailing" },
  { id: "recovery", type: "table", caption: "Use the operator record, not street advice", columns: ["Problem", "Response"], rows: [
    ["Driver reaches a different pier", "Do not unload until the full ticketed terminal is matched"],
    ["Flight/train delay", "Use the ferry operator's official change channel and protect a mainland night"],
    ["Ticket and identity do not match", "Ask official service staff; never buy a resold identity-linked ticket"],
    ["Weather disruption", "Follow Xiamen Ferry notices and tell the island accommodation before rerouting"],
  ]},
  { id: "facts", type: "callout", title: "Dynamic transport facts checked August 12, 2026", tone: "neutral", body: "Xiamen Ferry maintains the official visitor purchase channel and route/terminal information, and warns against unofficial ticket resale. Routes, sailings, terminals, check-in, identity rules, fares, baggage and weather operations can change. The ticket for the travel date controls." },
  { id: "help", type: "callout", title: "Need the hub and ferry matched?", tone: "decision", body: "Send the date, flight or train, ticketed terminals, island hotel, group and luggage. Homeground can check the handoffs and recovery margin; ferry inventory remains with the official operator." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Prepare the rail arrival before the ferry handoff." },
    { label: "China's last night before an international flight", href: "/guides/china-last-night-before-international-flight/", description: "Protect the return from an island transfer." },
    { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Do not compress rail, road and ferry cutoffs." },
    { label: "How to pay in China", href: "/guides/how-to-pay-in-china-as-a-tourist/", description: "Keep payment recovery for mainland transport." },
  ]},
  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Official visitor ferry purchase and routes", url: "https://xmferry.com/wybm/wshlk/xchgpp/index.htm", publisher: "Xiamen Ferry Co.", reviewedAt: "2026-08-12" },
    { label: "Official terminal and route guide", url: "https://www.xmferry.com/xwzx/zxgg/25004.htm", publisher: "Xiamen Ferry Co.", reviewedAt: "2026-08-12" },
    { label: "Official anti-resale warning", url: "https://www.xmferry.com/xwzx/zxgg/22943.htm", publisher: "Xiamen Ferry Co.", reviewedAt: "2026-08-12" },
    { label: "Hero: Cruise Center bus area by HualinXMN, CC BY 4.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Cruise_Center_Bus_Station(Xiamen)._20190203.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "Hero derivative licence: CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
