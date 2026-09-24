import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Yes, Suzhou can be a day trip from Shanghai if you keep one clear priority and book a return you can actually reach. A train time alone is not the day-trip time: count both hotel-to-station journeys, station entry and travel inside Suzhou. For a first visit, one garden and Pingjiang Road make a more useful starting plan than a long checklist." },
    { id: "answer", type: "callout", tone: "decision", title: "Make the return decision first", body: "Pick the garden and check its dated last-admission time. Then work backwards from a return train that leaves enough time to reach the correct Suzhou station and pass station entry. If the only workable return cuts your visit short, stay a night in Suzhou instead." },
    { id: "stations-heading", type: "heading", level: 2, text: "Which Shanghai and Suzhou stations?" },
    { id: "stations", type: "table", caption: "Read the full station names on both tickets", columns: ["Decision", "What to check"], rows: [
      ["Leave Shanghai", "Compare Shanghai Station and Shanghai Hongqiao against your actual hotel or airport and the trains 12306 offers on your date. They are different terminals."],
      ["Arrive in Suzhou", "Suzhou Station can work well for the old-city garden area; Suzhou North is a separate station. Compare the local connection before choosing by train time alone."],
      ["Return to Shanghai", "Confirm the Suzhou departure station and the Shanghai arrival station independently. A late arrival at the wrong Shanghai terminal can undo the apparent time saving."],
    ] },
    { id: "station-source", type: "paragraph", text: "Suzhou's city government lists metro links from Suzhou Station to the Humble Administrator's Garden area and Pingjiang Road. That makes Suzhou Station a useful candidate, not a rule for every train or every hotel. Search the actual travel date on 12306 before fixing the route." },
    { id: "clock-heading", type: "heading", level: 2, text: "Count the full day, not just the train" },
    { id: "clock", type: "list", ordered: true, items: ["Shanghai hotel to the correct departure station; allow for luggage and the morning rush.", "Station entry, security, boarding and the booked train.", "Suzhou arrival station to the first sight; add walking and queues inside the garden.", "Last sight to the correct Suzhou departure station, with a boarding margin.", "Arrival station back to your Shanghai hotel, especially if the return is late."] },
    { id: "day-heading", type: "heading", level: 2, text: "A Suzhou day that does not depend on rushing" },
    { id: "day-plan", type: "paragraph", text: "Start with one garden, such as the Humble Administrator's Garden, after checking that garden's admission rules and last-entry time. Keep the next block for lunch and Pingjiang Road. Add Hanshan Temple only if your dated trains, garden visit and local connections leave room; otherwise leave it out. This is an editorial planning order, not a promised timed itinerary or a ticket reservation." },
    { id: "day-tradeoff", type: "comparison", title: "Choose your version of the day", columns: [
      { heading: "Independent, focused day", body: "Book your own trains and garden entry; aim for one garden and one nearby street, then return to the same Shanghai hotel." },
      { heading: "More time in Suzhou", body: "Stay overnight if you want another garden, an unhurried evening or a museum visit. Suzhou Museum's main building currently requires timed reservations; other sites may differ. Check the dated notice before adding a museum." },
    ] },
    { id: "products-heading", type: "heading", level: 2, text: "How the published private routes handle Suzhou" },
    { id: "products", type: "paragraph", text: "Homeground's five-day Shanghai–Suzhou private tour keeps all four hotel nights in Shanghai. Its Suzhou day includes second-class return high-speed rail, private transfers at both ends, guiding, the Humble Administrator's Garden, Hanshan Temple and Pingjiang Road; it is a complete five-day tour, not a standalone Suzhou day-trip price. The six-day Shanghai–Suzhou–Hangzhou tour stays one night in Suzhou before continuing to Hangzhou, with different transport and sightseeing. Check the actual dates, party size and written inclusions before comparing prices." },
    { id: "product-links", type: "internal-links", title: "Compare the two real routes", items: [
      { label: "5-day Shanghai–Suzhou private tour", href: "/tours/shanghai-suzhou-5-day-private-tour/", description: "A Suzhou day trip within a four-night Shanghai stay." },
      { label: "6-day Shanghai–Suzhou–Hangzhou private tour", href: "/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", description: "Stay in Suzhou, then continue to Hangzhou instead of returning to Shanghai that night." },
      { label: "Choose a Suzhou garden", href: "/guides/how-to-read-a-suzhou-garden/", description: "Decide which garden is worth your limited time." },
    ] },
    { id: "faq", type: "faq", title: "Before you book", items: [
      { question: "Is one day enough for Suzhou from Shanghai?", answer: "Enough for a focused first visit, not for every major garden and old street. Start with one garden and Pingjiang Road, then decide whether the complete door-to-door return still feels worthwhile." },
      { question: "Is Suzhou Station the same as Suzhou North?", answer: "No. The full station name on the train ticket matters. Suzhou Station has official metro connections toward the old-city sights; Suzhou North needs its own last-mile calculation." },
      { question: "Do I need a reservation for the garden or museum?", answer: "Check the named garden's current rules and last admission. Suzhou Museum's main building currently uses timed reservations, while its other sites may have different rules; check the dated museum notice. The museum is not in Homeground's published five-day day-trip itinerary." },
      { question: "Does Homeground sell this as a one-day Suzhou tour?", answer: "The published option is a five-day Shanghai-based private tour with a Suzhou day included. A separate one-day service, if requested, would need its own scope and quote; the published five-day price is not a one-day price." },
    ] },
    { id: "sources", type: "sources", title: "Official planning sources and image credit", items: [
      { label: "Search dated train services and station names", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-09-23" },
      { label: "Suzhou Station onward connections", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202604/568a4eac0636443c968cfc195b9a3e29.shtml", publisher: "Suzhou Municipal Government", reviewedAt: "2026-09-23" },
      { label: "Garden visiting rules", url: "https://ylj.suzhou.gov.cn/szsylj/ryxz/nav_list.shtml", publisher: "Suzhou Gardens and Greening Administration", reviewedAt: "2026-09-23" },
      { label: "Garden opening and last-admission information", url: "https://ylj.suzhou.gov.cn/szsylj/kfsj/wztt.shtml", publisher: "Suzhou Gardens and Greening Administration", reviewedAt: "2026-09-23" },
      { label: "Dated garden notices", url: "https://ylj.suzhou.gov.cn/szsylj/tzgg/list.shtml", publisher: "Suzhou Gardens and Greening Administration", reviewedAt: "2026-09-23" },
      { label: "Suzhou Museum reservation rules by site", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202609/2d1a50ec4496485d9f5c332de585dfdc.shtml", publisher: "Suzhou Municipal Government", reviewedAt: "2026-09-23" },
      { label: "Pingjiang Road photograph by kevinmcgill, CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:A_stone_arch_bridge_in_Pingjiang_Road,_Suzhou.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-23" },
    ] },
  ],
} satisfies StructuredPageBody;

export default body;
