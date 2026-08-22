import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Xiamen Island and Gulangyu face each other, but they are not one continuous old-town walk. Xiamen gives you a working coastal city, neighbourhood food, temples and long shoreline. Gulangyu is a pedestrian island whose heritage value lies in its street fabric, gardens, music history and mixed architecture. The ferry is a timed border between the two experiences." },
    { id: "answer", type: "callout", title: "The direct answer", tone: "decision", body: "For a first one-day visit, give the morning and early afternoon to Gulangyu only if the official visitor ferry is already confirmed. Return with enough margin, then choose one compact Xiamen evening area—often the Zhongshan Road/old-port side or a separate coastal stop. If the ferry is not secured, do not spend the day chasing it: build a good Xiamen city day and move Gulangyu to another date." },
    { id: "two-places-heading", type: "heading", level: 2, text: "Let each place do one job" },
    { id: "two-places", type: "table", caption: "Two visits, not one checklist", columns: ["Place", "Protect", "Do not force"], rows: [
      ["Gulangyu", "A slow street sequence, one heritage/house/garden anchor and time to notice the island's mixed urban fabric", "Every paid sight, summit, beach and snack street in one loop"],
      ["Xiamen Island", "One neighbourhood or shoreline story plus dinner and a resilient return to the hotel", "Nanputuo, university area, Zhongshan Road, beaches and every coastal village in one evening"],
      ["Ferry handoff", "Correct terminals, passport/order, check-in margin and a weather fallback", "A timetable copied into this article or a guarantee of the return pier"],
    ] },
    { id: "ferry-boundary", type: "callout", title: "Use the dedicated ferry guide for the operating chain", tone: "warning", body: "This article deliberately does not repeat ticket windows, terminal names, check-in cutoffs or passport handling. Those facts change and already have one canonical owner. Open the official Xiamen Ferry channel and the Homeground ferry-terminal guide, then return here only after the outbound and return framework is understood." },
    { id: "gulangyu-heading", type: "heading", level: 2, text: "On Gulangyu, choose a theme before a path" },
    { id: "gulangyu", type: "comparison", title: "Three honest island visits", columns: [
      { heading: "Architecture and lanes", body: "Follow a coherent cluster of historic streets and buildings, reading Southern Fujian, Western revival, veranda and Amoy Deco influences. Best aligned with the World Heritage reason to visit." },
      { heading: "Garden and view", body: "Choose one garden, high point or coastal viewpoint, then add nearby streets. Check current tickets, queues and weather rather than stacking every paid sight." },
      { heading: "Slow island atmosphere", body: "Walk away from the most compressed shopping lanes, stop for music or a courtyard and accept fewer named attractions. Strong for an overnight or repeat visit." }
    ] },
    { id: "heritage", type: "paragraph", text: "UNESCO describes Kulangsu as a historic international settlement whose urban fabric records Sino-foreign exchange and includes traditional Southern Fujian, Western Classical Revival, veranda colonial and Amoy Deco architecture. That value is distributed. A route that rushes between only the most photographed pins can miss the street network that makes the island legible." },
    { id: "xiamen-heading", type: "heading", level: 2, text: "After the ferry, choose one Xiamen ending" },
    { id: "xiamen", type: "table", caption: "Evening endings", columns: ["Ending", "Why choose it", "Boundary"], rows: [
      ["Old port / Zhongshan Road area", "Keeps the day geographically close to the city-facing side and adds food and street life", "Do not expect every historic shop or food stall to keep fixed hours"],
      ["One coastal segment", "Gives an open-shore contrast after the dense pedestrian island", "Choose one legal access point; the coastal road is long"],
      ["Hotel-area dinner and rest", "Best after heat, ferry delay, luggage or a long island walk", "Rest is a successful cut, not a failed itinerary"],
    ] },
    { id: "day-heading", type: "heading", level: 2, text: "A realistic one-day sequence" },
    { id: "day", type: "list", ordered: true, items: [
      "Confirm the exact outbound ferry, mainland terminal, island pier, passport record and return framework.",
      "Arrive with the operator's current check-in margin; do not attach the sailing to a tight flight or train.",
      "On Gulangyu, complete one chosen theme and one flexible second layer.",
      "At the midday checkpoint, decide whether the second island anchor still protects the return.",
      "Return to Xiamen Island with weather and onward-transport margin.",
      "Finish with one compact city area, dinner and a simple hotel return."
    ] },
    { id: "cut", type: "callout", title: "Cut the second city cluster before cutting the ferry margin", tone: "decision", body: "When the island runs late, remove the beach, temple, university-area or second market idea. Do not respond by choosing an unverified pier, sprinting with luggage or placing the last return against a train or flight. The ferry is the irreversible handoff; the Xiamen evening is the flexible layer." },
    { id: "who", type: "table", caption: "Adjust for the group", columns: ["Traveller", "Better plan"], rows: [
      ["Heavy luggage", "Store it through a verified service or keep a mainland base; Gulangyu's pedestrian lanes and steps matter"],
      ["Older parents or limited walking", "One short island cluster, seated breaks and an early return; verify stairs at each paid sight"],
      ["Children", "Protect food, toilets and shade; choose fewer buildings with a beach/garden contrast if weather permits"],
      ["Late arrival", "Stay on Xiamen Island and move Gulangyu to a full morning"],
    ] },
    { id: "failure", type: "table", caption: "Recovery plan", columns: ["Problem", "Response"], rows: [
      ["No confirmed visitor ferry", "Stop treating Gulangyu as today's task; use a Xiamen city route"],
      ["Wrong terminal pin", "Match the full Chinese terminal in the official order before unloading"],
      ["Weather disruption", "Follow Xiamen Ferry notices, notify any island accommodation and stay on the mainland if needed"],
      ["Island walking takes longer", "Drop the second paid sight and return with margin"],
      ["Return changes", "Use the operator's current instruction; do not infer a permanent mainland pier"],
    ] },
    { id: "overnight", type: "paragraph", text: "An overnight changes the decision. Early and late streets can reveal the island beyond peak day-trip pressure, but the stay adds luggage, pedestrian last mile and ferry-dependent checkout. Choose it for repeated island value, not simply to add another hotel. The Xiamen stay-area guide owns the broader mainland-versus-island base choice." },
    { id: "links", type: "internal-links", title: "Continue planning Xiamen", items: [
      { label: "Xiamen hubs to Gulangyu ferry", href: "/guides/xiamen-hubs-to-gulangyu-ferry-terminal/", description: "Execute the passport, terminal and ferry handoff." },
      { label: "Where to stay in Xiamen", href: "/guides/xiamen-where-to-stay-zhongshan-gulangyu-zengcuoan/", description: "Choose Zhongshan Road, Gulangyu or Zengcuo'an as a base." },
      { label: "Hub-and-spoke or multi-base route", href: "/guides/china-hub-and-spoke-or-multi-base-route/", description: "Decide whether Xiamen works as a real base rather than a compressed stop." },
      { label: "China public holidays", href: "/guides/china-public-holidays-travel-calendar/", description: "Check peak-date pressure before committing to the island." },
      { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Count ferry and walking friction honestly." }
    ] },
    { id: "sources", type: "sources", title: "Official sources and image credit", items: [
      { label: "Kulangsu World Heritage description", url: "https://whc.unesco.org/en/list/1541/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-22" },
      { label: "Current visitor purchase and passport FAQ", url: "https://xmferry.com/wybm/wshlk/wlgpp/index.htm", publisher: "Xiamen Ferry Co.", reviewedAt: "2026-08-22" },
      { label: "Current check-in and return FAQ", url: "https://xmferry.com/wybm/wshlk/chch/index.htm", publisher: "Xiamen Ferry Co.", reviewedAt: "2026-08-22" },
      { label: "Hero: Gulangyu from Xiamen by Slyronit, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Gulangyu_Island_from_Zhongshan_Road,_Xiamen.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
