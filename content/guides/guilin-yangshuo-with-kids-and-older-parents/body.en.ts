import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "For a family travelling with a young child and an older parent, give Guilin and Yangshuo five days if you can. Use the Li River cruise to move from Guilin to Yangshuo, keep a second night in Yangshuo for a gentler countryside day, then return to Guilin before flying or taking a train out. Three days can work, but only after cutting activities—not by squeezing a cruise, a bamboo raft and Longji Rice Terraces into every available hour." },
    { id: "decision-heading", type: "heading", level: 2, text: "Choose the pace before choosing more sights" },
    { id: "pace-table", type: "table", caption: "A planning comparison, not a promise that every activity runs on your date", columns: ["Time available", "Reasonable shape", "What to leave out"], rows: [
      ["3 days / 2 nights", "Pick one main river experience and one base; protect the arrival and departure legs.", "Do not add Longji and a second river outing just to fill a checklist."],
      ["5 days / 4 nights", "Guilin → Yangshuo → Guilin, with two consecutive Yangshuo nights and one countryside day.", "Treat bamboo rafting as an optional, separately checked activity."],
      ["Longji is essential", "Give the rice terraces their own time and rework the route and quote.", "Do not assume Longji fits the published five-day Guilin–Yangshuo tour."],
    ] },
    { id: "five-day-heading", type: "heading", level: 2, text: "What a five-day family route actually does" },
    { id: "five-day", type: "list", ordered: true, items: [
      "Day 1: Arrive in Guilin. Go to the hotel and leave the evening open; arrival day is not a sightseeing day.",
      "Day 2: Check out and take the booked Li River cruise toward Yangshuo. Decide in writing where the luggage goes by road and who receives it at the Yangshuo hotel.",
      "Day 3: Stay in the same Yangshuo room. Visit the Yulong River countryside at an easy pace; choose one suitable family activity or gentle cycling, rather than stacking extra paid experiences.",
      "Day 4: Return to Guilin with your bags. Visit Reed Flute Cave or Elephant Trunk Hill, one of the two, then sleep in Guilin.",
      "Day 5: Keep the morning for the airport or railway transfer. Do not sell a last-minute attraction before a fixed departure.",
    ] },
    { id: "hotel-heading", type: "heading", level: 2, text: "The tiring part may be the hotel moves" },
    { id: "hotel-copy", type: "paragraph", text: "This shape has two changes of hotel: Guilin to Yangshuo and Yangshuo back to Guilin. The return protects a Guilin departure, but a child who naps or a relative who needs a quiet break will feel the check-outs. Before paying, ask which hotel has a lift, where the vehicle can stop, who carries bags between the cruise pier and hotel, and whether the family needs connecting rooms or another room layout. A private car does not remove a staircase at the hotel door." },
    { id: "river-heading", type: "heading", level: 2, text: "The Li River cruise and Yulong bamboo rafting are different decisions" },
    { id: "river-compare", type: "comparison", columns: [
      { heading: "Li River cruise", body: "In Homeground's published five-day route, the Day 2 Guilin-to-Yangshuo cruise is included. It also changes your overnight base. Confirm the actual sailing, cabin, pier, boarding route and separate luggage handover before paying; weather and river conditions can alter the plan." },
      { heading: "Yulong River bamboo raft", body: "This is a separate, optional water activity, not the included Li River cruise. The five-day route's Day 3 includes one simple family activity or gentle cycling; a bamboo-raft upgrade costs extra and must be checked for the chosen pier and every traveller." },
    ] },
    { id: "raft-rule", type: "callout", tone: "warning", title: "Do not use one raft rule for the whole Yulong River", body: "The Yulong River operator's page for the Longcun Pier–Daba Bridge two-person return raft says children under 1 metre and adults aged 70 or over cannot ride that specific route; it also lists health and mobility restrictions. Those are not blanket rules for every Yulong pier. Check the current notice for the exact raft section, measured child height, each passenger and weather before booking. If anyone cannot or does not want to raft, a countryside drive and short, suitable walk can still be the day's focus." },
    { id: "family-heading", type: "heading", level: 2, text: "Four questions to settle before reserving" },
    { id: "family-checks", type: "list", items: [
      "Can every traveller board and leave the actual boat and reach the vehicle from the named pier? Ask for the real boarding route, not a generic claim that the cruise is family-friendly.",
      "How many room moves can this family handle? Confirm lifts, room layout and a place to rest, especially on cruise and return days.",
      "If a raft is requested, which pier and section is it, and what does that operator currently allow for each child and older traveller? The cruise ticket does not answer this.",
      "What replaces an outdoor activity if river levels or weather change? Agree on the fallback before the family is standing at a closed pier.",
    ] },
    { id: "faq", type: "faq", title: "Guilin and Yangshuo with family: quick answers", items: [
      { question: "Is three days enough for Guilin and Yangshuo with a child and older parents?", answer: "It can be enough for a deliberately narrow trip, but not for the Li River cruise, Yulong countryside, Longji and multiple hotel moves all together. Five days give the published Guilin–Yangshuo route a full countryside day and a protected departure day." },
      { question: "Does the five-day private tour include Yulong bamboo rafting?", answer: "No. It includes the Guilin-to-Yangshuo Li River cruise. Day 3 includes one simple family activity or gentle cycling, chosen for the group. Bamboo rafting is an optional extra, subject to the exact operator's rules and availability." },
      { question: "Can a toddler or a 70-year-old ride a Yulong River bamboo raft?", answer: "There is no safe yes-or-no answer for every pier. The operator's Longcun Pier–Daba Bridge return route prohibits children under 1 metre and people aged 70 or over; other route conditions must be checked separately. Measure the child, identify the exact section and read the current operator notice before booking." },
      { question: "How many hotels are in the five-day Guilin–Yangshuo route?", answer: "Four nights are split Guilin 1, Yangshuo 2 and Guilin 1. That is two hotel changes. The second Yangshuo night keeps the countryside day free of packing, and the final Guilin night protects the departure transfer." },
    ] },
    { id: "links", type: "internal-links", title: "Build the route from the real decisions", items: [
      { label: "Guilin–Yangshuo five-day private tour", href: "/tours/guilin-yangshuo-5-day-private-tour/", description: "See the exact day-by-day route, included cruise, guide days, rooms and exclusions." },
      { label: "Li River cruise booking and piers", href: "/guides/li-river-cruise-tickets-piers-booking/", description: "Check the boat, booking channel and Guilin-to-Yangshuo luggage chain." },
      { label: "Yangshuo town or Yulong River: where to stay", href: "/guides/yangshuo-town-or-yulong-river-where-to-stay/", description: "Choose a hotel area by door access, evenings and the group's need to rest." },
      { label: "Longji day trip or overnight", href: "/guides/longji-rice-terraces-day-trip-or-overnight/", description: "If Longji is non-negotiable, decide what extra time it needs." },
    ] },
    { id: "inquiry", type: "callout", tone: "decision", title: "Ask for a version that fits your family", body: "Send the travel month, number and ages of travellers, arrival and departure points, room needs and any walking or boarding concerns. If bamboo rafting matters, add the children's heights. We can then confirm the actual pier, cruise, luggage handover and what the five-day plan includes before quoting." },
    { id: "sources", type: "sources", title: "Operator rules checked 26 September 2026", items: [
      { label: "Longcun Pier–Daba Bridge raft rules (specific two-person return route)", url: "https://www.ysylh.cn/jdjs/2024/6a7d914728304f999d023243c40b8680.shtml", publisher: "Yulong River scenic operator", reviewedAt: "2026-09-26" },
      { label: "Li River official ticketing and cruise information", url: "https://www.liriver.com.cn/page/article/lyfw.pwxx", publisher: "Guilin Li River scenic area", reviewedAt: "2026-09-26" },
    ] },
  ],
} as const satisfies StructuredPageBody;

export default body;
