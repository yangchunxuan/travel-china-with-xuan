import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = { schemaVersion: "1.0.0", blocks: [
  { id: "answer-first", type: "lead", text: "For the clearest first visit, enter at the South Gate and walk north: Circular Mound Altar, Imperial Vault of Heaven and Echo Wall, Danbi Bridge, then the Hall of Prayer for Good Harvests. This follows the spatial logic from the southern altar toward the northern prayer complex. If Metro Line 5 convenience matters more, enter at the East Gate, see the Hall of Prayer first and reverse the central sequence toward the South Gate. In either case, buy access to the three charged core sights; a park-only ticket does not include them." },
  { id: "ticket-heading", type: "heading", level: 2, text: "The park ticket and the ritual core are different" },
  { id: "tickets", type: "comparison", columns: [
    { heading: "Park admission", body: "Covers the large outer park, mature trees and public landscape. It does not by itself admit you to the Hall of Prayer for Good Harvests, Echo Wall or Circular Mound Altar." },
    { heading: "Combo ticket", body: "Includes general park admission and the three main charged attractions. For a first visit centred on the famous ritual architecture, this is normally the relevant product." },
    { heading: "Separate core ticket", body: "The operator also lists admission for the three scenic spots. Read the live purchase screen and service-counter advice so that you do not accidentally pay for park access twice." },
  ] },
  { id: "foreign-booking", type: "callout", title: "Passport booking is supported—but the live phone flow still matters", body: "Beijing's 2026 official guide says foreign visitors can book through the Temple of Heaven WeChat account, then present the e-ticket QR code and the same passport or other booked ID. The municipal parks guide also supports passport booking through the official Visiting Beijing Parks channels. If a foreign phone number blocks real-name verification, use the comprehensive service counter with the original passport rather than an unofficial reseller.", tone: "neutral" },
  { id: "gate-heading", type: "heading", level: 2, text: "Choose the route from the gate" },
  { id: "gates", type: "table", caption: "Temple of Heaven starting-gate choices", columns: ["Start", "Route logic", "Transport and trade-off"], rows: [
    ["South Gate", "Circular Mound → Echo Wall/Imperial Vault → Danbi Bridge → Hall of Prayer → East or North exit.", "Tianqiao station on Line 8 is the useful rail approach. Best narrative sequence, but not the shortest first walk from a metro gate."],
    ["East Gate", "Long Corridor → Hall of Prayer → Danbi Bridge → Echo Wall → Circular Mound → South Gate.", "Tiantandongmen station on Line 5 is immediately useful. Easy arrival, but the central ritual sequence runs in reverse."],
    ["West Gate", "A quieter landscape approach with optional Divine Music Administration or Hall of Abstinence before joining the axis.", "Useful when those secondary sites matter. Less efficient for a short first visit focused only on the three core attractions."],
  ] },
  { id: "sequence-heading", type: "heading", level: 2, text: "What each stop contributes to the sequence" },
  { id: "sequence", type: "list", items: [
    "At the Circular Mound, notice the exposed, circular stone geometry and its southern position. Do not reduce the visit to testing an acoustic trick at the centre.",
    "At the Imperial Vault courtyard, understand that the Echo Wall encloses a specific ritual space. Its acoustic effect depends on conditions and other visitors; it is not a guaranteed performance.",
    "Walk Danbi Bridge as the connective axis. The official park describes it as rising gradually from south to north between the Circular Mound altar and the prayer complex.",
    "End the south-to-north route at the Hall of Prayer for Good Harvests, where the scale, colour and elevated terraces provide a deliberate visual culmination.",
    "Only then add a secondary site such as the Hall of Abstinence or Divine Music Administration if its separate hours, ticket and your remaining energy allow it.",
  ] },
  { id: "hours-heading", type: "heading", level: 2, text: "Late park hours do not mean late access to the monuments" },
  { id: "hours", type: "paragraph", text: "The outer park currently stays open until 22:00, with last entry at 21:00. The charged core sites operate Tuesday–Sunday: 08:00–18:00 with last entry 17:30 from 1 April to 31 October, and 08:00–17:00 with last entry 16:30 from 1 November to 31 March. They normally close on Mondays except statutory holidays. A sunset walk in the outer park is therefore different from a complete first visit to the ritual buildings." },
  { id: "pace", type: "callout", title: "Homeground planning judgment: allow two to three hours", body: "About two hours can cover the three core sites on a direct cross-park route. Three hours lets you slow down on the axis, take a break and add one secondary place. Security, crowds, photography and detours can change the pace; this is not an official duration.", tone: "decision" },
  { id: "mistakes-heading", type: "heading", level: 2, text: "Common route failures" },
  { id: "mistakes", type: "list", items: ["Buying park-only admission and discovering the three famous monuments require additional access.", "Entering East Gate for metro convenience but planning to exit East Gate after walking all the way south.", "Arriving late because the park closes at 22:00, then finding the core sites already closed.", "Treating Echo Wall acoustics as guaranteed in a busy public space.", "Adding both secondary complexes when the traveller really needs a seated break."] },
  { id: "internal-links", type: "internal-links", title: "Build a realistic Beijing stay", items: [
    { label: "Where to stay in Beijing", href: "/guides/beijing-where-to-stay-first-trip/", description: "Compare Line 5 and Line 8 access with the rest of your trip." },
    { label: "National Museum booking and route", href: "/guides/national-museum-of-china-booking-and-route/", description: "Use a separate booking and a focused indoor route for another major Beijing site." },
    { label: "China with older parents", href: "/guides/china-itinerary-with-older-parents/", description: "Account for the long park distances even when the central axis looks simple on a map." },
    { label: "Read a Chinese city wall", href: "/guides/chinese-city-walls-gates-and-urban-order/", description: "Distinguish surviving fabric, conservation repair, reconstruction and archaeological traces, then read gates and streets as parts of an urban system." },
  ] },
  { id: "consultation", type: "callout", title: "Need the route fitted around another Beijing booking?", body: "A Homeground travel consultant can match the gate, direction and pace to your hotel and the day's other fixed time. Share the date, preferred start, mobility limits and whether the three core sights or the wider park matters more.", tone: "neutral" },
  { id: "sources", type: "sources", title: "Official and image sources reviewed", items: [
    { label: "Official park hours, three-sight through ticket and services", url: "https://www.tiantanpark.cn/en/index.html", publisher: "Temple of Heaven", reviewedAt: "2026-08-12" },
    { label: "2026 foreign-passport booking, current prices and entry rules", url: "https://english.beijing.gov.cn/travellinginbeijing/parks/202603/t20260320_4562532.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Official park routes, Metro approaches and ticket scope", url: "https://english.beijing.gov.cn/specials/parktours/guidevisitors/templeofheaven/", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Danbi Bridge official description", url: "https://www.tiantanpark.cn/en/Scenic/detail/1389.html", publisher: "Temple of Heaven", reviewedAt: "2026-08-12" },
    { label: "Hero: Temple of Heaven by Maros Mraz, CC BY-SA 3.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Temple_of_Heaven,_Beijing,_China_-_009.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ] },
] };
export default body;
