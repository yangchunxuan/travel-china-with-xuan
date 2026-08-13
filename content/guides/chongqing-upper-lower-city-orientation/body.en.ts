import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "Steep terrain and dense development make Chongqing a three-dimensional city: streets close on a flat map may sit many metres apart in height, with no direct staircase between them. Escalators, public lifts, bridges, tunnels and rail integrated with buildings help connect those levels. Here, ‘upper and lower’ means the street level and usable entrance for your route—not a complete guide to Yuzhong's historical Upper and Lower City districts."},
  {id: "three-coordinates", type: "table", caption: "A Chongqing destination has three coordinates", columns: ["Coordinate", "What to verify", "Typical failure"], rows: [
    ["Horizontal position", "The correct name, branch and block.", "You reach a same-name place nearby."], ["Vertical level", "Upper road, lower road, riverside or podium level.", "The pin is overhead or below with no visible path."], ["Usable connection", "Named station exit, lift, escalator, bridge or public stair.", "A short straight line becomes a long climb or detour."]
  ]},
  {id: "machines-as-streets", type: "heading", level: 2, text: "The machines are part of the street network"},
  {id: "machines-copy", type: "paragraph", text: "Official city material identifies the Kaixuan Road lift as urban vertical public transport and records the scale and connecting role of the Crown Escalator. Neighbourhood design guidance likewise treats lifts and escalators as vertical mobility infrastructure. These examples explain the city's form; they do not prove either facility is open or suitable for today's route."},
  {id: "liziba", type: "heading", level: 2, text: "Liziba is an integrated station, not an accidental collision"},
  {id: "liziba-copy", type: "paragraph", text: "Official city accounts describe Liziba Station and the building as a coordinated design. The rail structure is separated from the building structure to control vibration and noise. The famous view is therefore one engineered response to constrained terrain and dense urban fabric—not evidence that an old apartment was casually pierced by a later train line."},
  {id: "route-heading", type: "heading", level: 2, text: "How to plan a short Chongqing walk"},
  {id: "route-method", type: "list", ordered: true, items: [
    "Save the destination's full Chinese name and the entrance you need, not only a map pin.",
    "Check the station exit number and whether its description names an upper or lower road.",
    "Inspect the route for stairs, sharp contours, bridges, tunnels, malls or building passages.",
    "Ask the hotel or venue to confirm the final approach in Chinese if luggage, a wheelchair or a slower walker is involved.",
    "On arrival, compare street name and building entrance before committing to a long descent.",
    "If a lift, escalator or passage is closed, return to the last named public road or station concourse and recalculate from there."
  ]},
  {id: "destination-card", type: "table", caption: "Build this destination card before a difficult last kilometre", columns: ["Field", "What to record"], rows: [
    ["Place", "Full Chinese name and branch."],
    ["Road level", "Upper road, lower road, riverside, podium or floor."],
    ["Rail exit", "Line, station and exact exit number."],
    ["Step-free link", "Named lift, escalator or vehicle-accessible road—and a current closure check."],
    ["Taxi point", "The road-level drop-off entrance, not the attraction's centre pin."],
    ["Fallback", "A staffed station entrance, hotel desk or named main road to return to."]
  ]},
  {id: "scenarios", type: "comparison", title: "Two ways the same map distance changes", columns: [
    {heading: "Light day bag", body: "A signed staircase may be an efficient and memorable connection. Keep enough energy to climb back if the next link is closed."},
    {heading: "Suitcase, parent or limited mobility", body: "Choose a confirmed lift, escalator, taxi-accessible road or station exit even when the map route is longer. Vertical certainty matters more than straight-line distance."}
  ]},
  {id: "step-free-boundary", type: "callout", title: "One lift does not make the whole route step-free", body: "A lift or escalator removes one climb; it does not prove an end-to-end accessible route. Verify every station exit, kerb, passage and destination entrance, and keep a road-level vehicle fallback if any link cannot be confirmed.", tone: "warning"},
  {id: "wrong-level-recovery", type: "callout", title: "If the destination seems directly above or below you", body: "Do not enter an unsigned residential stairwell or climb a traffic ramp. Photograph or save the current street name, return to a staffed station entrance, hotel desk or main public road, and ask for the named upper/lower entrance. A taxi may also need the road-level entrance rather than the attraction pin.", tone: "warning"},
  {id: "change-conditions", type: "table", caption: "When the route decision should change", columns: ["Condition", "Better response"], rows: [
    ["Rain or slippery steps", "Prefer covered rail, a public lift/escalator or a road transfer."], ["Temporary station-exit closure", "Follow the current station notice; do not reuse an old social-media route."], ["Late arrival", "Use a confirmed, lit road-level entrance. Do not depend on an after-hours mall, building passage, lift or escalator unless access is confirmed."], ["Large luggage", "Confirm a vehicle-accessible entrance before leaving the hotel."], ["Heat or fatigue", "Break the route at a rail station or public vertical link rather than stacking climbs."]
  ]},
  {id: "dynamic-boundary", type: "callout", title: "Checked 13 August 2026", body: "The physical examples explain Chongqing's urban form; they are not a promise that every lift, escalator, exit or passage is open. Works and closures change. Check current Chongqing Rail Transit and venue notices on the day.", tone: "neutral"},
  {id: "help", type: "callout", title: "Need one Chongqing route checked in three dimensions?", body: "Send Homeground the date, exact hotel and destination entrances, group size, luggage, walking limits and intended arrival time. We can flag the level, exit and vertical link that need confirmation without promising a lift, escalator or passage will remain open.", tone: "decision"},
  {id: "internal-links", type: "internal-links", title: "Plan the city around the right base and pace", items: [
    {label: "Where to stay in Chongqing", href: "/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/", description: "Choose a base by actual trip and station access."},
    {label: "China map pin shift and entrance checks", href: "/guides/china-map-coordinate-offset-explained/", description: "Rebuild a destination from its Chinese address and usable entrance."},
    {label: "Wheelchair-accessible China route planning", href: "/guides/wheelchair-accessible-china-route-planning/", description: "Verify each mobility link instead of assuming an accessible label covers the route."}
  ]},
  {id: "sources", type: "sources", title: "Official and independent sources", items: [
    {label: "Chongqing terrain and rail engineering", url: "https://www.cq.gov.cn/ywdt/jrcq/202111/t20211125_10030692.html", publisher: "Chongqing Municipal Government", reviewedAt: "2026-08-13"},
    {label: "Liziba station and building", url: "https://www.cq.gov.cn/zjcq/cycq/jplyxl/dsy/dsjp/202409/t20240905_13599583.html", publisher: "Chongqing Municipal Government", reviewedAt: "2026-08-13"},
    {label: "Public lift and Crown Escalator safety report", url: "https://scjgj.cq.gov.cn/zfxxgk_225/gsgg/qtgg/202504/t20250428_14564659.html", publisher: "Chongqing Market Regulation Administration", reviewedAt: "2026-08-13"},
    {label: "Mountain community vertical-mobility guidance", url: "https://zfcxjw.cq.gov.cn/zwgk_166/zfxxgkmls/zcwj/qtwj/202206/W020260528580878403095.pdf", publisher: "Chongqing Housing and Urban-Rural Development Commission", reviewedAt: "2026-08-13"},
    {label: "Current example of station-exit and escalator closures", url: "https://cq.gov.cn/ywdt/bmts/202606/t20260630_15787973.html", publisher: "Chongqing Municipal Government", reviewedAt: "2026-08-13"},
    {label: "Current Chongqing Rail Transit service information", url: "https://www.cqmetro.cn/smbsj.html", publisher: "Chongqing Rail Transit", reviewedAt: "2026-08-13"},
    {label: "Walking behaviour in 3D vertical cities", url: "https://www.sciencedirect.com/science/article/pii/S016920462200192X", publisher: "Landscape and Urban Planning", reviewedAt: "2026-08-13"}
  ]}
]};
export default body;
