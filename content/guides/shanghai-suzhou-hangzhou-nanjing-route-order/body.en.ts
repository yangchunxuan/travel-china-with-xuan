import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "If flights allow different gateways, a practical four-city chain is Nanjing → Suzhou → Shanghai → Hangzhou, or the reverse. If both long-haul flights use Shanghai, do not force a one-way label: use Shanghai as one base, add one strategic second base, or accept a return only after comparing complete door-to-door blocks. The right answer depends on airports, exact railway stations and what each city must deliver." },
  { id: "quick-choice", type: "comparison", title: "Choose the architecture first", columns: [
    { heading: "One-way chain", body: "Best when Nanjing and Hangzhou can sit near opposite gateways and every hotel move supports real local priorities." },
    { heading: "Shanghai base", body: "Best when hotel stability matters, excursions are focused and the repeated station approaches remain tolerable." },
    { heading: "Two-base hybrid", body: "Often strongest when one move removes the longest returns without creating four separate check-ins." }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "Station geography can reverse the route" },
  { id: "official", type: "paragraph", text: "Shanghai's municipal guide lists several major and smaller railway stations spread across the city and tells travellers to confirm the exact station before departure. Suzhou's transport authority records the opening of Suzhou South and Shengze on the Shanghai–Suzhou–Huzhou line, adding more route possibilities beyond the familiar central and northern station names. These facts are why city-to-city labels are insufficient: search the exact service and station in 12306 for your date." },
  { id: "roles-heading", type: "heading", level: 2, text: "Give each city a distinct job" },
  { id: "roles", type: "table", caption: "A city earns a base through activities, not name recognition", columns: ["City", "Possible route role", "When not to add a hotel"], rows: [
    ["Shanghai", "International gateway, deep city base and connection point", "A transit night adds a check-in but no useful city time"],
    ["Suzhou", "Focused garden, canal, craft or museum priorities in a compact plan", "One protected visit works from another base and luggage would add more friction"],
    ["Hangzhou", "Lake, tea-area or wider city priorities that benefit from local mornings and evenings", "The plan contains only one central activity easily reached as a focused visit"],
    ["Nanjing", "History, museums, city-wall or other dispersed priorities that merit a local base", "It is included only because the rail segment looks short"]
  ] },
  { id: "gateway-heading", type: "heading", level: 2, text: "Start with airports and exact stations" },
  { id: "gateway", type: "table", caption: "Test these shapes before allocating nights", columns: ["Gateway pattern", "Structure to test first", "Main hidden cost"], rows: [
    ["Arrive Shanghai, leave Hangzhou or Nanjing", "One-way chain toward the departure side", "Too many one-night bases along the way"],
    ["Both flights use Shanghai", "Shanghai base or two-base hybrid", "Repeated rail commutes or a final return to the airport"],
    ["Hongqiao airport plus Hongqiao rail services", "Place the connected segment near arrival or departure", "Assuming every desired train uses Hongqiao"],
    ["Pudong airport", "Protect the longer urban transfer and final night", "Treating Shanghai airport access as part of the rail ride" ]
  ] },
  { id: "suzhou-heading", type: "heading", level: 2, text: "Suzhou: day visit or overnight?" },
  { id: "suzhou", type: "list", ordered: false, items: [
    "Choose a day visit when the priorities are concentrated, the useful station matches the activity area and the fixed return does not cut the visit short.",
    "Choose an overnight when early or late local time matters, priorities span more than one area, or the next forward train removes a return to Shanghai.",
    "Write the exact Suzhou station beside the hotel and activity. Suzhou, Suzhou North and newer southern-corridor stations are not interchangeable.",
    "If carrying luggage through a visit, confirm storage from a named provider. Do not build the route around assumed lockers.",
    "Do not add an overnight just because Suzhou is famous; decide what you will actually see and how long it requires."
  ] },
  { id: "workflow-heading", type: "heading", level: 2, text: "Build the four-city route in eight decisions" },
  { id: "workflow", type: "list", ordered: true, items: [
    "Fix the actual arrival and departure airports before deciding a direction.",
    "Give every city one non-substitutable purpose and remove cities kept only for completeness.",
    "Search the exact station pairs in 12306; record station names, not just city names.",
    "For each city, compare a base with a focused visit using hotel-door to activity-door time.",
    "Count every checkout, luggage transfer, storage interval and repeated station approach.",
    "Test the one-way chain, Shanghai hub and two-base hybrid using the same complete ledger.",
    "Keep move-day arrivals free of an irreplaceable timed highlight.",
    "Choose the structure with fewer forced returns and fewer weak hotel changes, then assign nights."
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "Planning example: four names, two bases" },
  { id: "example", type: "callout", tone: "neutral", title: "An example, not a prescribed itinerary", body: "A traveller flies in and out of Shanghai, wants a focused Suzhou garden day, several full Shanghai priorities, and enough Hangzhou time for a local morning, while Nanjing has only one optional museum. A two-base Shanghai–Hangzhou plan with Suzhou as a focused visit may be stronger than four hotels; Nanjing is the first cut. If Nanjing becomes a core history stop and a different departure gateway is available, the one-way chain becomes more defensible." },
  { id: "failure-heading", type: "heading", level: 2, text: "Failures and recovery" },
  { id: "failure", type: "table", caption: "Repair the architecture, not just the train", columns: ["Failure", "Immediate response", "Next design change"], rows: [
    ["Wrong Shanghai or Suzhou station", "Recalculate local transport and protect the next fixed departure", "Record exact station in every itinerary line"],
    ["Day visit loses half its time to station access", "Keep only the highest priority and return safely", "Use a local base or remove the visit"],
    ["Four hotels create three check-in gaps", "Use storage only if confirmed and drop optional move-day activities", "Rebuild as two bases"],
    ["Final return to Shanghai is fragile", "Move back earlier and protect the flight", "Compare open-jaw gateways or a final Shanghai night"],
    ["Construction or timetable update changes a station", "Follow current operator instructions", "Re-run exact 12306 searches before travel"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "When to choose another shape" },
  { id: "switch-rule", type: "paragraph", text: "Use a one-way chain when gateway geometry removes a return and each city merits local time. Use a Shanghai hub when the room stability outweighs complete commute blocks. Use two bases when it captures most of the geographical gain with one move. Cut the city with the weakest distinct purpose; do not keep four names by reducing every city to an arrival evening and rushed morning." },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "Actual airports and exact railway stations appear in the route.",
    "Every city has a distinct purpose that survives cuts.",
    "Suzhou day visit versus overnight is decided by activities and station geography.",
    "All hotel moves and repeated station approaches are counted door to door.",
    "Current 12306 services and named transport notices are rechecked."
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "The network is still changing", body: "Station use, construction, train patterns and airport links change. Verify exact dates and stations in 12306 and official local notices. This guide does not promise a live train, journey time or universal day-trip rule." },
  { id: "scope", type: "callout", tone: "neutral", title: "What this guide covers", body: "This guide covers the four-city order and the choice among a one-way chain, Shanghai hub and two-base hybrid. Use city transport guides for exact modes, the Suzhou garden guide for the visit itself, and the airport guide for Pudong versus Hongqiao." },
  { id: "help-cta", type: "callout", tone: "decision", title: "Need the Yangtze Delta route checked?", body: "Send arrival and departure airports, dates, hotel preferences, luggage and one priority per city. A useful review should identify the weakest hotel and the longest full hotel-to-station transfer." },
  { id: "more-planning", type: "internal-links", title: "Continue planning", items: [ { label: "Shanghai destination hub", href: "/destinations/shanghai/", description: "Decide complete days, which bank to stay on and the gateway before fixing this detail." },
    { label: "Plan Shanghai–Hangzhou transport", href: "/guides/shanghai-hangzhou-transport-route/", description: "Choose stations after the city order." },
    { label: "Understand a Suzhou garden visit", href: "/guides/how-to-read-a-suzhou-garden/", description: "Give Suzhou a purpose before adding a hotel." },
    { label: "Choose Pudong or Hongqiao", href: "/guides/shanghai-pudong-or-hongqiao-airport/", description: "The flight airport can reverse the best route." },
    { label: "Read the Grand Canal today", href: "/guides/grand-canal-everyday-urban-history/", description: "Separate protected heritage, working waterways and neighbourhood life, then choose a public section where their relationship is visible." },
    { label: "Choose a Yellow Sea wetland base", href: "/guides/northern-jiangsu-yellow-sea-wetland-coast/", description: "Separate Yancheng's dispersed wetland areas, choose Dongtai, Dafeng or the city as a practical base, and plan ethical birding with a no-sighting alternative." },
  ] },
  { id: "sources", type: "sources", title: "Official sources reviewed", items: [
    { label: "Guide to railway stations in Shanghai", url: "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Opening of Suzhou South and Shengze stations", url: "https://jtj.suzhou.gov.cn/szjt/tjgl/202501/4cbd95cd41d747d98bc277a1916c1ad7.shtml", publisher: "Suzhou Transport Bureau", reviewedAt: "2026-08-12" },
    { label: "China Railway passenger service", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
