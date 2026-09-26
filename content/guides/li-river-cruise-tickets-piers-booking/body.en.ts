import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "For the Guilin-to-Yangshuo Li River cruise, start with the scenic area's official WeChat service account, 漓江售票处. Its August 2026 fare list puts an adult 3-star boat at RMB 215 and a 4-star boat at RMB 360; the operator's pier guide assigns them to different Guilin piers, so choose the boat before arranging your pickup. No universal non-holiday ticket-release time has been verified." },
    { id: "booking-heading", type: "heading", level: 2, text: "Book the boat and the pier as one decision" },
    { id: "booking-rules", type: "table", caption: "Published adult fares and piers, checked 26 September 2026", columns: ["Boat", "Published adult fare", "Guilin boarding pier", "Yangshuo end"], rows: [
      ["3-star", "RMB 215", "Mopanshan Passenger Port (磨盘山客运港)", "Longtoushan Pier (龙头山码头)"],
      ["4-star", "RMB 360", "Zhujiang Pier (竹江码头)", "Longtoushan Pier (龙头山码头)"]
    ] },
    { id: "release", type: "paragraph", text: "The official 2026 National Day notice opens these full-route boats 15 days ahead and says remaining-ticket information refreshes at 11:00 and 16:00. Those are holiday rules and inventory updates, not a promise that ordinary dates always open 15 days ahead at either hour. Check the notice for your own travel date before setting an alarm or paying a reseller." },
    { id: "mistakes", type: "callout", tone: "warning", title: "Three easy ways to get this wrong", body: "A 3-star confirmation does not send you to the 4-star pier. An 11:00 or 16:00 inventory refresh is not a universal release time. And a third-party order is not automatically collectible at the official pier kiosks; follow the collection instructions for the seller you actually used." },
    { id: "options-heading", type: "heading", level: 2, text: "Is the 4-star boat worth the difference?" },
    { id: "options", type: "comparison", title: "Compare like for like", columns: [
      { heading: "3-star: RMB 215", body: "The lower published fare for the full Guilin–Yangshuo sailing. Board at Mopanshan under the operator's pier guide. Check the dated product for its exact onboard service and meal arrangement." },
      { heading: "4-star: RMB 360", body: "A different boat category and Zhujiang boarding pier, not a different Yangshuo arrival town. Compare the cabin, seating and meal terms shown for your date before deciding whether the extra RMB 145 matters to your party." }
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "Plan a one-way day, not a round trip to Guilin" },
    { id: "route-list", type: "list", ordered: true, items: [
      "Confirm the exact boat class, sailing date and boarding pier on the paid order. The two Guilin piers are not interchangeable.",
      "Arrange a ride to that pier with time for the real-name ticket and security checks. The operator describes a roughly four-hour river journey, but the actual departure is the time on your order.",
      "Leave the boat in Yangshuo at the arrival pier named on your confirmation, then continue to your Yangshuo hotel. Do not leave luggage or a same-day pickup waiting at the Guilin pier.",
      "Keep a weather and water-level alternative. The scenic area issued short-notice suspensions during 2026 high-water periods."
    ] },
    { id: "hours-heading", type: "heading", level: 2, text: "What time should you be at the pier?" },
    { id: "hours", type: "paragraph", text: "Use the boarding time and ticket-collection method on the live order; the official site does not publish one reliable departure timetable for every boat and date. Allow for the road journey from Guilin, document checks and any change announced by the operator. The trip is a transfer between Guilin and Yangshuo as well as sightseeing, so protect the rest of that day." },
    { id: "practical-heading", type: "heading", level: 2, text: "If you are booking with a foreign passport" },
    { id: "practical", type: "list", items: [
      "The official notice requires real-name booking and a match between traveller, ticket and identity document. Enter each person's details exactly as the booking channel accepts them.",
      "The published official instructions do not explain the foreign-passport flow in the WeChat account. Confirm that your passport can be used, and how the ticket is collected, before paying.",
      "Carry the original document used for the successful booking and save the order offline. A payment screenshot is not a substitute for the issued ticket.",
      "A reduced scenic-area admission component does not prove that the entire boat fare is reduced. Check a concession against the actual product and documents."
    ] },
    { id: "final-check", type: "callout", tone: "decision", title: "Before you leave the hotel", body: "Read your confirmed date, boat class, boarding pier, departure and collection instructions together. Ask the operator about any weather notice, and tell your driver the Chinese pier name on the order rather than only saying ‘Li River cruise’." },
    { id: "faq", type: "faq", title: "Li River cruise booking questions", items: [
      { question: "Where do I book an official Li River cruise ticket?", answer: "The Li River scenic area's September 2026 notice names the WeChat service account 漓江售票处 as its official reservation channel. Book a named traveller and a dated boat, then check the successful order for its boarding pier and ticket-collection method." },
      { question: "Do Li River tickets always go on sale five days ahead at 09:00?", answer: "No such general rule was confirmed on the official site. The 2026 National Day notice used 15 days for the full Guilin–Yangshuo boats; its 11:00 and 16:00 times are remaining-inventory refreshes. Other holidays have used different windows, so check the current notice for your dates." },
      { question: "What is the difference between a 3-star and 4-star Li River boat?", answer: "The August 2026 official adult fares are RMB 215 and RMB 360. The operator's pier guide puts 3-star boats at Mopanshan and 4-star boats at Zhujiang, both ending in Yangshuo. Compare the dated onboard and meal terms instead of assuming the higher fare includes every extra." },
      { question: "Which pier do I use for the Guilin-to-Yangshuo cruise?", answer: "Under the Li River operator's published pier guide, 3-star boats board at Mopanshan Passenger Port and 4-star boats at Zhujiang Pier. Your successful order controls the final boarding point; confirm it before booking a car from Guilin." },
      { question: "Can I book the Li River cruise with a foreign passport?", answer: "The official material confirms real-name booking but does not publish a clear foreign-passport walkthrough for 漓江售票处. Before paying, ask the official seller whether it accepts your passport and how you will collect the ticket. Carry the original document used in the confirmed order." },
      { question: "Does the boat return to Guilin after the cruise?", answer: "The standard full-route cruise described here runs from the Guilin-side pier to Yangshuo. Plan your hotel and luggage around Yangshuo arrival; do not assume the same boat returns you to Guilin. Separate return products, if available for your date, need their own booking." }
    ] },
    { id: "internal-links", type: "internal-links", title: "Fit the boat into a Guilin trip", items: [
      { label: "Guilin & Yangshuo five-day private tour", href: "/tours/guilin-yangshuo-5-day-private-tour/", description: "See how the river day fits the hotel and driver plan." },
      { label: "Guilin to Yangshuo: boat, car or train?", href: "/guides/guilin-yangshuo-transport-route/", description: "Choose the transport route before reserving a pier pickup." },
      { label: "Where to stay in Yangshuo", href: "/guides/yangshuo-town-or-yulong-river-where-to-stay/", description: "Decide the hotel base after the boat lands." }
    ] },
    { id: "consultation", type: "callout", tone: "neutral", title: "Want the cruise to fit the whole journey?", body: "Homeground can plan the Guilin pickup, the confirmed boat class and the Yangshuo onward drive as one route. Share your date and group size; we will check actual availability and the written inclusions before quoting." },
    { id: "sources", type: "sources", title: "Official Li River references", items: [
      { label: "2026 National Day advance-booking notice", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/264", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-26" },
      { label: "Published boat fares", url: "https://www.liriver.com.cn/page/article/lyfw.pwxx", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-26" },
      { label: "Pier and route guide", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/130", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-26" },
      { label: "Ticket collection and third-party orders", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/128", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-26" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
