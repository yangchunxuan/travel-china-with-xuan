import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = { schemaVersion: "1.0.0", blocks: [
  { id: "answer-first", type: "lead", text: "There is no universally best Summer Palace entrance. East Palace Gate gives the clearest palace-to-lake sequence; North Palace Gate is convenient from Metro Line 4 and starts with Suzhou Street and a hill crossing; New Palace Gate places you near the Seventeen-Arch Bridge and broad lake views. Choose the gate from your priority and intended exit. Treat a boat as an optional connector, because wind, rain, weather alerts, season and queues can remove it from the plan." },
  { id: "gate-heading", type: "heading", level: 2, text: "Choose among three useful gates" },
  { id: "gate-table", type: "table", caption: "Gate choice for a first visit", columns: ["Gate", "Best for", "Trade-off"], rows: [
    ["East Palace Gate — 东宫门", "A legible first visit through the administrative-palace area toward Long Corridor, Longevity Hill and the lake.", "Metro Line 4 Xiyuan station still leaves an approach walk; returning to the same gate can create backtracking."],
    ["North Palace Gate — 北宫门", "Direct access from Beigongmen station and a route via Suzhou Street, the hill and Marble Boat.", "The early route includes slopes and stairs unless you deliberately skirt the hill; it is not automatically the easiest mobility option."],
    ["New Palace Gate — 新建宫门", "Seventeen-Arch Bridge, Nanhu Island and a lake-first visit with relatively direct access to the southeast side.", "It is less intuitive for a first-time palace-building sequence, and the nearest metro arrangement may require a road transfer."],
  ] },
  { id: "ticket-heading", type: "heading", level: 2, text: "Base ticket, combined ticket or add-ons" },
  { id: "ticket-comparison", type: "comparison", columns: [
    { heading: "Admission ticket", body: "Covers entry to the main park. It is enough for Long Corridor, Kunming Lake edges, bridges, hillsides and much of the landscape experience." },
    { heading: "Combined ticket", body: "Adds the separately charged garden-within-a-garden sites listed by the operator, currently including the Tower of Buddhist Incense, Garden of Virtue and Harmony, Suzhou Street and Summer Palace Museum." },
    { heading: "Buy selectively", body: "A base ticket plus one add-on can be better when time, stairs or museum interest make the full bundle unrealistic. The combined ticket is access, not a promise that you can use every component before it closes." },
  ] },
  { id: "passport", type: "callout", title: "Foreign visitors have an official booking and on-site route", body: "Beijing's official visitor guide says foreign visitors can book through the Summer Palace WeChat account with a passport or permanent residence permit. The city's official ticketing guidance also describes staff-assisted purchase at a gate service window with a valid passport when online booking is not workable. Carry the original document used for the booking and recheck the live channel before travel.", tone: "neutral" },
  { id: "routes-heading", type: "heading", level: 2, text: "Three route shapes, not one compulsory checklist" },
  { id: "routes", type: "table", caption: "Two realistic Summer Palace routes", columns: ["Route", "Core sequence", "Who should choose it"], rows: [
    ["Palace to lake", "East Palace Gate → Hall of Benevolence and Longevity area → Long Corridor → central Longevity Hill choice → Marble Boat or lake shore → North Palace Gate.", "First-timers who want architecture and landscape in a clear sequence and are comfortable with a cross-park exit."],
    ["Metro-to-metro hill route", "North Palace Gate → Suzhou Street choice → hill crossing or gentler perimeter → Long Corridor → East Palace Gate.", "Travellers prioritising Line 4 access. Decide before entry whether stairs or the longer, gentler detour fits."],
    ["Lake-first low-climb route", "New Palace Gate → Seventeen-Arch Bridge → Nanhu Island choice → east shore → Wenchang area → East Palace Gate.", "Visitors who care more about water, bridges and open views than climbing to the central hill monuments."],
  ] },
  { id: "boat-heading", type: "heading", level: 2, text: "Use the boat to connect places, not to rescue an impossible route" },
  { id: "boat-rules", type: "list", items: [
    "The official operating period is normally mid-March to mid-November, with the exact opening and closing dates announced separately.",
    "Current large-ferry hours are 08:30–17:30, but individual routes are one-way and do not all connect the places a first-time visitor expects.",
    "Read the named origin and destination at the pier before paying. For example, the official Suzhou Street–Suyunyan service is specifically one-way with no return service.",
    "The operator suspends boats for force-four winds or above, heavy rain, weather warnings and sudden severe conditions.",
    "On weekends and holidays, the operator warns that waits can be long. If a queue consumes the time saved on the water, walk the planned shore route instead.",
  ] },
  { id: "boat-plan-b", type: "callout", title: "Every boat plan needs a walking twin", body: "Before entry, identify the shore path that reaches the same next priority. If service is suspended, do not cross the park chasing another pier. Switch to the walking twin and cut the lowest-priority add-on. This keeps the exit and transport plan intact.", tone: "decision" },
  { id: "hours-heading", type: "heading", level: 2, text: "The park and inner attractions close on different clocks" },
  { id: "hours", type: "paragraph", text: "The main park currently opens 06:00–20:00 in peak season (1 April–31 October), with last entry at 19:00; off-season it opens 06:30–19:00, last entry 18:00. Separately charged inner attractions close earlier and normally close on Mondays except specified holidays. A late park entry can therefore still be too late for the Tower of Buddhist Incense, museum or Suzhou Street. Check the official page on the visit date because maintenance and special notices can narrow access." },
  { id: "final-check", type: "list", items: ["Name the entry gate and different exit gate in Chinese and English.", "Choose base or combined ticket from the actual route, not from fear of missing out.", "Check the earliest-closing inner attraction first.", "Save one boat route by exact pier pair and its walking alternative.", "Recheck weather, official boat notice and the final transport connection." ] },
  { id: "internal-links", type: "internal-links", title: "Plan the rest of Beijing", items: [
    { label: "Where to stay in Beijing", href: "/guides/beijing-where-to-stay-first-trip/", description: "Compare hotel areas against the gate and the rest of your Beijing days." },
    { label: "Forbidden City for foreign visitors", href: "/guides/forbidden-city-for-foreign-visitors/", description: "Use a separate south-to-north execution plan for the Palace Museum." },
    { label: "China with older parents", href: "/guides/china-itinerary-with-older-parents/", description: "Decide whether slopes, stairs and a cross-park exit fit the family's real pace." },
  ] },
  { id: "consultation", type: "callout", title: "Need the gate matched to your real day?", body: "A Homeground travel consultant can check the route against your hotel, walking limits, season and the next timed commitment. The useful inputs are your preferred sights, entry time, mobility limits and whether a boat is a priority or merely a bonus.", tone: "neutral" },
  { id: "sources", type: "sources", title: "Official and image sources reviewed", items: [
    { label: "Opening hours, tickets and current boat routes", url: "https://summerpalace.net.cn/en/index.html?_isa=1", publisher: "Summer Palace", reviewedAt: "2026-08-12" },
    { label: "Foreign-passport booking, transport and official route examples", url: "https://english.beijing.gov.cn/specials/parktours/guidevisitors/summerpalace/", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Official ticketing guidance including gate service windows", url: "https://english.beijing.gov.cn/specials/ticketing/parks/202407/t20240719_3753037.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Hero: Kunming Lake in summer by Regina800809, CC BY-SA 3.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Kunming_Lake_(Summer_Palace,_Beijing)_in_summer.JPG", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ] },
] };
export default body;
