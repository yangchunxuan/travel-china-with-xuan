import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "The Xiamen-to-Gulangyu handoff has four names that must agree: your mainland arrival hub, the ticketed Xiamen ferry terminal, the ticketed island pier and the accommodation. Solving only 'airport to ferry' can still send you to the wrong boat." },
  { id: "answer", type: "callout", title: "Buy the dated ferry first, then connect the hub", tone: "decision", body: "Start with Xiamen Ferry's current official visitor channel: its FAQ now directs travellers to the `xmferry` WeChat account or the Alipay service account “屿见厦门轮渡”. Select an available route and read both terminal names before timing the transfer from Xiamen Airport, Xiamen Station or Xiamen North. Do not substitute a downtown pier because an old map looks closer." },
  { id: "matrix-heading", type: "heading", level: 2, text: "Start points change the mainland transfer" },
  { id: "matrix", type: "table", caption: "The ferry booking determines the terminal", columns: ["Start", "Main risk", "Plan for"], rows: [
    ["Xiamen Airport", "Flight delay, baggage claim, road traffic and check-in cutoff", "A later ferry or mainland hotel fallback"],
    ["Xiamen Station", "Which exit, road pickup and city traffic", "Exact terminal location and enough check-in margin"],
    ["Xiamen North Station", "Longer city transfer and a large rail hub", "Rail delay margin and a direct authorised pickup"],
    ["Xiamen hotel", "A short map distance can still hide awkward road access and crowds", "Ticketed terminal name, not 'nearest ferry'"],
  ]},
  { id: "warning", type: "callout", title: "Terminal names are operational facts", tone: "warning", body: "Visitor routes, resident routes, daytime arrangements and temporary changes are not interchangeable. Copy the full Chinese Xiamen terminal and Gulangyu arrival pier from the current booking; show both to the driver." },
  { id: "chain-heading", type: "heading", level: 2, text: "Plan the whole route to the island hotel" },
  { id: "chain", type: "list", ordered: true, items: ["Arrival hub to the exact terminal entrance printed in the booking.", "Passport or ticket verification and enough time before check-in closes.", "The named sailing to the named island pier.", "Pier to accommodation with realistic walking and luggage.", "Return eligibility, mainland onward transport and a weather backup."] },
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
  { id: "facts", type: "callout", title: "Dynamic transport facts checked August 13, 2026", tone: "neutral", body: "The current FAQ directs online buyers to the official WeChat or Alipay channel; foreign visitors can enter passport details through a verified Alipay account, although some documents need manual verification. The sales window is 15 days including the sailing date, with day 15 opening at 09:00. Check-in starts 20 minutes before departure and closes 10 minutes before it. A dated outbound ticket normally includes one free return within 20 days on an eligible current visitor route, but it does not reserve a return sailing or permanently guarantee a pier. The same FAQ contains older answers, so confirm the live channel and route before paying." },
  { id: "help", type: "callout", title: "Need the hub and ferry matched?", tone: "decision", body: "Send the date, flight or train, ticketed terminals, island hotel, group and luggage. Homeground can check the handoffs and time buffer; ferry inventory remains with the official operator." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Prepare the rail arrival before the ferry handoff." },
    { label: "China's last night before an international flight", href: "/guides/china-last-night-before-international-flight/", description: "Protect the return from an island transfer." },
    { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Do not compress rail, road and ferry cutoffs." },
    { label: "How to pay in China", href: "/guides/how-to-pay-in-china-as-a-tourist/", description: "Keep a backup way to pay for mainland transport." },
  ]},
  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Official online-purchase FAQ: current channels, passports and return validity", url: "https://xmferry.com/wybm/wshlk/wlgpp/index.htm", publisher: "Xiamen Ferry Co.", reviewedAt: "2026-08-13" },
    { label: "Official 2026 notice: 15-day advance-sales window", url: "https://www.xmferry.com/xwzx/zxgg/32338.htm", publisher: "Xiamen Ferry Co.", reviewedAt: "2026-08-13" },
    { label: "Official check-in and return FAQ", url: "https://xmferry.com/wybm/wshlk/chch/index.htm", publisher: "Xiamen Ferry Co.", reviewedAt: "2026-08-13" },
    { label: "Hero: Cruise Center bus area by HualinXMN, CC BY 4.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Cruise_Center_Bus_Station(Xiamen)._20190203.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "Hero derivative licence: CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
