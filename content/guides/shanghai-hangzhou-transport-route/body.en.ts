import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Shanghai–Hangzhou trains can be frequent and fast while the wrong station pair still makes the trip slow. The ticket must fit the Shanghai airport or hotel, the correct Shanghai terminal, the correct Hangzhou terminal and the final hotel." },
  { id: "answer", type: "callout", title: "Search more than one station pair, then compare the doors", tone: "decision", body: "Shanghai Hongqiao often deserves the first check for a Hongqiao airport or west-side start. Shanghai Station or Shanghai South can be better for other city addresses when a usable direct train exists. In Hangzhou, search the exact date across Hangzhou East, Hangzhou Station, Hangzhou South and Hangzhou West, then compare only station pairs that 12306 actually offers for that date." },
  { id: "matrix-heading", type: "heading", level: 2, text: "A route is a pair, not two city names" },
  { id: "matrix", type: "table", caption: "The shortest train may carry the longest access legs", columns: ["Station choice", "Good fit", "Practical drawback", "Verify"], rows: [
    ["Shanghai Hongqiao", "Hongqiao Airport, west Shanghai or broad HSR inventory", "Large air-rail complex and a long metro/taxi trip from some districts", "Ticket says Shanghai Hongqiao and your entrance is correct"],
    ["Shanghai Station", "Central/north districts and a direct dated train", "Different inventory and confusion with 'Shanghai' as a city", "Full station name, departure and metro operating window"],
    ["Shanghai South", "Southwest Shanghai and a matching service", "Do not confuse it with Hongqiao or Shanghai Station", "Exact dated train and reopened/changed facilities"],
    ["Hangzhou East, Hangzhou Station, Hangzhou South or Hangzhou West", "One has a better hotel or attraction last mile and a usable dated train", "Large station exits, different urban positions and date-specific rail inventory", "Full arrival station, exit, current local connection and hotel route"],
  ]},
  { id: "warning", type: "callout", title: "The word Shanghai on a result is not a station check", tone: "warning", body: "Shanghai's official guide lists multiple major and smaller passenger stations across the city and explicitly tells travellers to confirm the station. Read the full Chinese and English station name from the ticket before calling a car." },
  { id: "clock-heading", type: "heading", level: 2, text: "Count the complete journey" },
  { id: "clock", type: "list", ordered: true, items: ["Shanghai hotel or airport to the correct station entrance.", "Security, walking and boarding margin.", "The booked train, not a search snippet.", "Hangzhou arrival hall to the correct exit.", "Metro/taxi to the exact hotel plus a late-service fallback."] },
  { id: "groups", type: "comparison", title: "What changes the winning pair", columns: [
    { heading: "Hongqiao flight connection", items: ["Hongqiao rail may reduce the first leg", "Still protect baggage and terminal change", "Do not create a tight air-rail ticket"] },
    { heading: "Central Shanghai hotel", items: ["Compare Shanghai Station inventory", "A longer train can save city travel", "Check the full station name"] },
    { heading: "Late Hangzhou arrival", items: ["Choose by hotel last mile", "Confirm last metro independently", "Keep legal taxi and hotel reception fallback"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "If you reach the wrong station" },
  { id: "recovery", type: "table", caption: "Stop before a cross-city race", columns: ["Problem", "Response"], rows: [
    ["Wrong Shanghai terminal", "Use official ticket change/inventory first; compare that with crossing the city"],
    ["Train no longer appears", "Check 12306 for the date and station pair; schedules change with new timetables"],
    ["Arrive at unexpected Hangzhou station", "Read the station exit map and recalculate the hotel route before leaving"],
    ["Last metro missed", "Use the official taxi queue and notify the hotel; avoid hall solicitors"],
  ]},
  { id: "facts", type: "callout", title: "Dynamic transport facts checked August 13, 2026", tone: "neutral", body: "Shanghai's official guide distinguishes Shanghai, Shanghai South, Shanghai Hongqiao and other stations with different metro access. Current Hangzhou rail information identifies Hangzhou Station, Hangzhou East, Hangzhou South and Hangzhou West as separate passenger stations and tells travellers to confirm the ticketed station and train on 12306. Inventory, fares and urban last services remain date-specific." },
  { id: "help", type: "callout", title: "Need the station pair checked against both hotels?", tone: "decision", body: "Send the date, Shanghai start, Hangzhou address, people, luggage and fixed flight or event. Homeground can compare the complete journey and backup choices; live rail inventory stays with 12306." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "Shanghai Pudong or Hongqiao Airport?", href: "/guides/shanghai-pudong-or-hongqiao-airport/", description: "Choose the airport before relying on an air-rail link." },
    { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Prepare tickets and boarding after the station pair is chosen." },
    { label: "Night train or daytime high-speed rail", href: "/guides/china-night-train-or-daytime-high-speed-rail/", description: "Compare schedule shape for longer onward travel." },
    { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Count the large-city access legs." },
  ]},
  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Guide to Shanghai railway stations", url: "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-08-12" },
    { label: "January 2026 Yangtze Delta timetable update", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260120/4fefd5c7bcfd4ec0a45f6c882cfbbd9e.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Current Hangzhou passenger-station and local-transport notice", url: "https://hznews.hangzhou.com.cn/chengshi/content/2026-04/29/content_9214782.htm", publisher: "Hangzhou.com.cn / Railway Hangzhou Station information", reviewedAt: "2026-08-12" },
    { label: "Official railway ticket channel", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-12" },
    { label: "Hero: Hangzhou East by Staeiou, CC BY-SA 4.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Hangzhou_East_railway_station_interior.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "Hero derivative licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
