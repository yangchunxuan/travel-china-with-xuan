import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Mount Emei has two famous identities that sit far apart in elevation and time. The Golden Summit is the high-altitude icon reached through long internal transport and a final ascent. The temple-and-forest mountain is a network of older religious sites, stone paths and ecological zones. A one-day visitor usually chooses one. Seeing both with depth is a two-day decision, not a faster bus connection." },
    { id: "answer", type: "callout", title: "The direct answer", tone: "decision", body: "Choose the Golden Summit when the high panorama, summit religious complex and sense of elevation are the main reasons to come; use the current official shuttle and cableway system, while accepting clouds and closures. Choose a lower/mid-mountain temple route when Buddhist landscape, forest walking and smaller sites matter more. Combine them only with an overnight, separate operating checks and a cut plan." },
    { id: "two-mountains-heading", type: "heading", level: 2, text: "Treat Emei as two mountains for planning" },
    { id: "two-mountains", type: "table", caption: "The core choice", columns: ["Route", "What you gain", "What you give up"], rows: [
      ["Golden Summit focus", "High-elevation atmosphere, summit temples, major icon and possible cloud/sky phenomena", "Much of the slower forest-and-temple sequence"],
      ["Temple-and-forest focus", "Wannian/Qingyin-area heritage, gradual landscape change and a walk that connects religious sites", "The summit icon and its long internal ascent"],
      ["Overnight combination", "One high route and one lower/mid-mountain route with recovery", "A simple day trip; weather and lodging logistics become part of the plan"],
    ] },
    { id: "heritage-heading", type: "heading", level: 2, text: "Why the temple route is not the 'lesser' option" },
    { id: "heritage", type: "paragraph", text: "UNESCO describes Mount Emei as a cultural landscape where Buddhism became established in China, with more than 30 temples integrated into the mountain environment. It specifically identifies Wannian Temple, Qingyin Pavilion, Baoguo Temple and other sites, as well as vegetation ranging from subtropical forest to subalpine forest. The value is the relationship between buildings, paths and ecology—not only the summit statue." },
    { id: "summit-heading", type: "heading", level: 2, text: "Golden Summit: a transport chain with mountain conditions" },
    { id: "summit", type: "list", ordered: true, items: [
      "Confirm the scenic-area opening notice, shuttle route and cableway operation for the date.",
      "Start from the correct visitor centre and allow for ticketing, vehicle queues and the long ascent.",
      "Carry layers and rain protection; temperature, wind and visibility differ sharply from the gateway.",
      "Treat cloud cover as a normal mountain outcome, not grounds to take an unsafe route.",
      "Set a latest descent decision that protects the current shuttle/cableway system and the return to the hotel."
    ] },
    { id: "summit-reality", type: "callout", title: "A cableway does not make the summit step-free or weather-proof", tone: "warning", body: "Vehicles remove large elevation sections, but queues, stairs, sloped paths, altitude, standing and final walking remain. Cableways can pause in unsafe weather. Ask the current operator about accessibility and do not infer that an older traveller or wheelchair user can complete the entire chain from a photograph of the summit." },
    { id: "temple-heading", type: "heading", level: 2, text: "Temple route: choose one connected spiritual landscape" },
    { id: "temple", type: "comparison", title: "Three lower/mid-mountain approaches", columns: [
      { heading: "Wannian anchor", body: "Use the temple as the main heritage destination, then add a confirmed walking segment. Strong for religious art and a bounded day; check the current cableway/path chain." },
      { heading: "Qingyin and forest", body: "Prioritise water, forest and garden-temple relationships. Better for walkers who value landscape sequence over a headline summit." },
      { heading: "Gateway temples", body: "Use Baoguo/Fuhu-area heritage for a shorter, lower-risk visit when weather, arrival time or mobility defeats the mountain plan." }
    ] },
    { id: "combine-heading", type: "heading", level: 2, text: "How to combine both without pretending" },
    { id: "combine", type: "table", caption: "A two-day framework, not a timetable", columns: ["Day", "Primary job", "Cut rule"], rows: [
      ["Day 1", "One lower or mid-mountain temple-and-forest sequence", "Stop before the route threatens the hotel check-in or next day's early start"],
      ["Day 2", "Golden Summit using the current official transport chain", "If weather or operation fails, use a lower heritage fallback rather than unsafe improvisation"],
    ] },
    { id: "wildlife", type: "callout", title: "Monkeys are wildlife, not a promised attraction", tone: "warning", body: "Do not feed, tease, touch or display food. Follow current park signs, keep distance and secure loose items. A route cannot guarantee a monkey encounter, and a viral clip is not safety guidance." },
    { id: "failure-heading", type: "heading", level: 2, text: "Recover from the mountain you actually find" },
    { id: "failure", type: "table", caption: "Failure and recovery", columns: ["Problem", "Response"], rows: [
      ["Summit hidden by cloud", "Decide whether the religious complex and mountain atmosphere still justify the ascent; do not wait beyond the descent margin"],
      ["Cableway or shuttle suspended", "Follow the official closure; use a lower/mid-mountain route only if current access and daylight support it"],
      ["Temple path is slippery or tiring", "Turn at the next safe staffed point; do not convert a one-way walk into a race"],
      ["Arrival is late", "Use gateway heritage or stay overnight; do not attempt a compressed summit chain"],
      ["Altitude or illness appears", "Stop ascending and seek staff/medical help; a summit is optional"],
    ] },
    { id: "leshan-boundary", type: "callout", title: "Leshan is a separate visitor day", tone: "neutral", body: "UNESCO lists Mount Emei and the Leshan Giant Buddha in one World Heritage property, but they are two discrete scenic areas. Shared heritage status does not make a rushed same-day visit operationally sound. This page does not own Leshan tickets, boats or cliff routes." },
    { id: "checklist", type: "list", items: [
      "Current scenic-area notice, transport and cableway status checked.",
      "Weather, temperature and visibility read for the actual elevation.",
      "One route identity selected; the second is a fallback or next day, not a hidden obligation.",
      "Footwear, layers, food and safe descent decision prepared.",
      "Hotel and onward transport remain viable if the mountain day runs late."
    ] },
    { id: "links", type: "internal-links", title: "Connect Mount Emei", items: [
      { label: "Chengdu city hub", href: "/destinations/chengdu/", description: "Decide whether Emei fits the Chengdu route and nights." },
      { label: "China with older parents", href: "/guides/china-itinerary-with-older-parents/", description: "Plan recovery and mountain alternatives across the trip." },
      { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Count the scenic-area transport chain as real time." },
      { label: "China public holidays", href: "/guides/china-public-holidays-travel-calendar/", description: "Check crowd pressure before the mountain day." },
      { label: "Do you need a tour guide in China?", href: "/guides/do-you-need-a-tour-guide-in-china/", description: "Separate interpretation value from basic transport execution." }
    ] },
    { id: "sources", type: "sources", title: "Primary sources and image credit", items: [
      { label: "Mount Emei and Leshan Giant Buddha World Heritage description", url: "https://whc.unesco.org/en/list/779", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-22" },
      { label: "Mount Emei official scenic-area portal", url: "https://www.ems517.com/", publisher: "Mount Emei Scenic Area", reviewedAt: "2026-08-22" },
      { label: "Hero: Mount Emei Golden Summit by George N, CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:%E5%B3%A8%E7%9C%89%E5%B1%B1%E9%A3%8E%E6%99%AF%E5%8C%BA_Mount_Emei_Scenic_Area_04.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
