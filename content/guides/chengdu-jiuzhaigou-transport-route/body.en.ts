import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "A rail ticket from Chengdu can remove much of the road journey, but it does not put you at Jiuzhaigou Valley. The useful product is rail plus a named station-to-valley transfer plus a return that still operates on your date." },
  { id: "answer", type: "callout", title: "Book the handoff and the return as part of the route", tone: "decision", body: "Check rail to Huanglongjiuzhai first, then the official or named onward transfer. Search Songpan only as a dated alternative with a confirmed valley connection. Compare a flight or through-road vehicle when the complete chain better fits the group, weather margin or Chengdu endpoints." },
  { id: "matrix-heading", type: "heading", level: 2, text: "The mode is really a chain" },
  { id: "matrix", type: "table", caption: "No option is complete without the Jiuzhaigou last mile", columns: ["Chain", "Strong fit", "Hidden friction", "Verify"], rows: [
    ["Chengdu rail → Huanglongjiuzhai → valley", "Train and station transfer fit on the same date", "Correct Chengdu station, mountain-road last mile and timed connection", "Train, station, licensed/official transfer, drop-off and return"],
    ["Chengdu rail → Songpan → valley", "Useful inventory and a confirmed onward service exist", "A different station and road transfer; not an automatic substitute", "Exact pickup and whether it serves your accommodation"],
    ["Flight → airport transfer", "The flight and airport legs genuinely shorten the whole trip", "Airport access, weather, baggage and the remaining road leg", "Airport, flight, pickup and disruption policy"],
    ["Through road vehicle", "A group values one pickup and can tolerate the road day", "Long mountain-road exposure, driver rest and weather", "Legal vehicle, driver, stops, seat belts and cancellation"],
  ]},
  { id: "warning", type: "callout", title: "Huanglongjiuzhai is a railway station, not the valley gate", tone: "warning", body: "Keep three pins: the rail station, your Jiuzhaigou accommodation and the scenic-area entrance you will use. A shuttle ticket that reaches one does not necessarily reach the other." },
  { id: "steps-heading", type: "heading", level: 2, text: "Build the booking in this order" },
  { id: "steps", type: "list", ordered: true, items: ["Choose the Jiuzhaigou hotel and arrival cutoff.", "Find a dated, named station or airport transfer with a precise drop-off.", "Choose the train or flight that leaves a safe handoff margin.", "Repeat the chain in reverse before confirming the outbound.", "Add mountain weather and service-disruption recovery."] },
  { id: "groups", type: "comparison", title: "What changes the answer", columns: [
    { heading: "Light, independent", items: ["Rail plus coach can work cleanly", "Keep Chinese pickup details", "Carry food and power"] },
    { heading: "Family or parents", items: ["Reduce roadside handoffs", "Plan altitude and rest without diagnosing", "Confirm hotel reception time"] },
    { heading: "Winter or fixed flight", items: ["Add a larger disruption buffer", "Avoid separate unprotected tickets", "Keep a Chengdu or local night fallback"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "If one leg fails" },
  { id: "recovery", type: "table", caption: "Protect the next safe place", columns: ["Failure", "Recovery"], rows: [
    ["Train delay threatens shuttle", "Contact the named transfer before arrival and ask for its written policy"],
    ["At the wrong station", "Stop, read the ticketed station and compare official inventory from the current location"],
    ["Mountain road interruption", "Follow transport, tourism and operator notices; do not hire an unverified roadside vehicle"],
    ["Return inventory disappears", "Protect accommodation and the next flight before creating a new multi-leg chain"],
  ]},
  { id: "facts", type: "callout", title: "Dynamic transport facts checked August 12, 2026", tone: "neutral", body: "Sichuan's official sources describe passenger transfers from Huanglongjiuzhai railway station toward Jiuzhaigou and later capacity development involving Huanglongjiuzhai and Songpan. Train inventory, transfer departures, road conditions, flight operations and attraction access remain date-specific; this page does not promise times or fares." },
  { id: "help", type: "callout", title: "Need the rail and road handoff checked?", tone: "decision", body: "Send dates, Chengdu hotel, Jiuzhaigou hotel, group size, luggage and fixed flights. Homeground can mark the handoffs and conservative buffers; live operations remain with the carriers." },
  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Use after selecting the exact station pair." },
    { label: "Night train or daytime high-speed rail", href: "/guides/china-night-train-or-daytime-high-speed-rail/", description: "Compare schedule shape, not only duration." },
    { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Give mountain transfers a real buffer." },
    { label: "How to pay in China", href: "/guides/how-to-pay-in-china-as-a-tourist/", description: "Prepare payment recovery for each leg." },
  ]},
  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Huanglongjiuzhai station transfer arrangements", url: "https://wlt.sc.gov.cn/scwlt/hydt/2024/8/30/5008ba73ea8b45b6bf1d9fedf998f465.shtml", publisher: "Sichuan Department of Culture and Tourism", reviewedAt: "2026-08-12" },
    { label: "Huanglongjiuzhai and Songpan capacity update", url: "https://gzw.sc.gov.cn/scsgzw/CU230505/2025/10/23/f65a8a3aaf9948b9908811db46f92f8b.shtml", publisher: "Sichuan SASAC", reviewedAt: "2026-08-12" },
    { label: "Official railway ticket channel", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-12" },
    { label: "Hero: Jiuzhaigou by Chensiyuan, CC BY-SA 4.0; cropped", url: "https://commons.wikimedia.org/wiki/File:1_jiuzhaigou_valley_wu_hua_hai_2011b.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
