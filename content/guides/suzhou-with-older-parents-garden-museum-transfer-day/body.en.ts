import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "If you are travelling with an older parent, do not treat the Humble Administrator's Garden, Suzhou Museum, Tiger Hill and the move to Hangzhou as four stops to finish in one day. Homeground's published six-day Shanghai–Suzhou–Hangzhou route splits them: on Day 3, choose Panmen or Tiger Hill after arriving in Suzhou; on Day 4, visit the garden, museum (subject to a reservation) and Pingjiang Road before continuing to Hangzhou. The Suzhou night between them matters more than a faster checklist." },
    { id: "answer", type: "callout", tone: "decision", title: "The rest decision", body: "A seated lunch and a shorter walk can fit the published transfer day if your parent is comfortable with the morning visits. If a hotel nap after checkout, a change to Day 4's listed stops or transfer, or both Tiger Hill and Panmen on arrival day is needed, request a revised written itinerary and quote. The original inclusions and price cannot be promised." },
    { id: "days-heading", type: "heading", level: 2, text: "Use the Suzhou night to divide the effort" },
    { id: "days", type: "table", caption: "The published six-day route, not a promise of fixed visit times", columns: ["Day", "What the route includes", "Where to protect energy"], rows: [
      ["Day 3: Shanghai → Suzhou", "A half-day in Shanghai, then travel with luggage to Suzhou; Panmen or Tiger Hill, Shantang Street, and a night in Suzhou.", "Choose one of Panmen and Tiger Hill. Decide how long to stay at Shantang Street after seeing how your parent feels on arrival."],
      ["Day 4: Suzhou → Hangzhou", "Check out; Humble Administrator's Garden, Suzhou Museum subject to reservations, and Pingjiang Road in the feasible order; continue to Hangzhou and check in.", "Keep a seated lunch break and avoid making Pingjiang Road another long walk. Lunch is separate from the tour price."],
    ] },
    { id: "booking-heading", type: "heading", level: 2, text: "Let the two reservations set the order" },
    { id: "booking", type: "paragraph", text: "The garden and the museum need separate arrangements. Suzhou's 19 June 2026 garden notice describes real-name, timed online booking 1–7 days before visiting. Suzhou Museum's 16 September 2026 notice says its main building requires a timed reservation, available up to seven days ahead counting the day you make the booking. That museum notice gives special hours for named September and October holidays, not a permanent timetable. Confirm your actual slots and opening notices before deciding whether the garden or museum comes first; an enquiry does not hold either place." },
    { id: "transfer-heading", type: "heading", level: 2, text: "Protect the transfer, not just the museum slot" },
    { id: "transfer", type: "list", ordered: true, items: [
      "Before checking out of the Suzhou hotel, confirm who handles the luggage and whether your agreed intercity plan uses rail with transfers at both ends or a door-to-door vehicle. The published six-day route allows either, according to the confirmed party plan.",
      "Work back from a comfortable Hangzhou hotel arrival. If travelling by rail, verify the date, full station names and train on 12306; add time for the station transfer and boarding rather than treating the train ride as the entire move.",
      "If your parent needs a hotel rest after lunch, ask to move or remove a stop, change the transfer, or add another Suzhou night before paying. Get the revised sights, transport, hotel nights and total in writing."
    ] },
    { id: "faq", type: "faq", title: "Questions before confirming the day", items: [
      { question: "Can we do Tiger Hill after the garden and museum?", answer: "That is not the published six-day sequence. Day 3 offers Panmen or Tiger Hill; Day 4 already has the garden, reservation-dependent museum, Pingjiang Road and the move to Hangzhou. Ask for a revised plan and quote if you want Tiger Hill on Day 4." },
      { question: "What if Suzhou Museum has no suitable slot?", answer: "Do not plan around an unconfirmed entry. Ask for the order or included stops to be revised in writing; the main museum building's reservation is separate from the garden booking." },
      { question: "Is a midday hotel nap included on the transfer day?", answer: "The published Day 4 starts with hotel checkout and ends with a Hangzhou check-in. A lunch pause is easier to fit than returning to a room after checkout. If a nap is essential, request a different written itinerary and quote." }
    ] },
    { id: "links", type: "internal-links", title: "Check the full route and separate entry rules", items: [
      { label: "Shanghai, Suzhou & Hangzhou: 6-day private tour", href: "/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", description: "See the Day 3 choice, Day 4 sequence, transport and written inclusions." },
      { label: "Humble Administrator's Garden tickets and entry", href: "/guides/humble-administrators-garden-tickets-entry/", description: "Check the named garden's booking and document details." },
      { label: "Shanghai to Suzhou day trip", href: "/guides/shanghai-to-suzhou-day-trip/", description: "For a same-day Shanghai return, which is a different travel decision." }
    ] },
    { id: "sources", type: "sources", title: "Dated official planning sources", items: [
      { label: "Suzhou Museum main-building reservation and holiday hours (16 September 2026)", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202609/2d1a50ec4496485d9f5c332de585dfdc.shtml", publisher: "Suzhou Museum via Suzhou Municipal Government", reviewedAt: "2026-09-26" },
      { label: "Garden booking window and temporary early opening through 7 October 2026", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202606/face4650ec2245ce818aecc53eb4aaaa.shtml", publisher: "Suzhou Municipal Government", reviewedAt: "2026-09-26" },
      { label: "Suzhou Station onward transport toward old-city sights (2 April 2026)", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202604/568a4eac0636443c968cfc195b9a3e29.shtml", publisher: "Suzhou Municipal Government", reviewedAt: "2026-09-26" },
      { label: "Search actual-date rail services and stations", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-09-26" }
    ] }
  ]
} satisfies StructuredPageBody;

export default body;
