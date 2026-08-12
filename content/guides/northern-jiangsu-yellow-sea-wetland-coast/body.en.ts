import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "Choose one public wetland task and sleep near it. Dongtai is the practical base for the Tiaozini coast; Dafeng is the base for the Chinese Milu Park; Yancheng city works for the Yellow Sea Wetland Museum and a separately arranged visit toward the Red-crowned Crane Wetland Ecotourism Area. These places belong to one larger conservation story, but they are not one walkable park. Wildlife is free-moving: no responsible operator can promise a named bird, flock, tide spectacle or close encounter."},
  {id: "serial-map", type: "callout", title: "The World Heritage property is serial and protected", body: "UNESCO's Migratory Bird Sanctuaries along the Coast of Yellow Sea–Bohai Gulf are made of separate components, not a continuous visitor promenade. A World Heritage boundary can include habitat with no general visitor access. Use UNESCO maps to understand the conservation system; use the current site operator to decide where the public may actually stand.", tone: "neutral"},
  {id: "components-heading", type: "heading", level: 2, text: "Translate the component map into public visitor choices"},
  {id: "component-matrix", type: "table", caption: "Northern Jiangsu wetland components and visitor products", columns: ["Area", "Public task", "Access boundary"], rows: [
    ["Dongtai / Tiaozini", "Intertidal-landscape interpretation and birdwatching from the current public scenic route or hides.", "Use only opened paths, observation points and operator transport. Nearby restoration or breeding habitat is not an invitation to enter."],
    ["Dafeng / Chinese Milu Park", "Learn about milu conservation and observe animals through the park's controlled visitor system.", "A park visit is not free roaming in the national nature reserve; animal position and visibility vary."],
    ["Sheyang coast / Red-crowned Crane Wetland Ecotourism Area", "Wetland education and seasonal bird context within its public tourism zone.", "The public ecotourism area is only part of a much larger reserve. Winter does not guarantee a wild crane sighting."],
    ["Yancheng city / Yellow Sea Wetland Museum", "Read the whole migration, tidal-flat and World Heritage story indoors before choosing one coast.", "The museum is orientation, not proof that a distant reserve road, hide or tidal flat is open."],
    ["Unnamed seawall, aquaculture road or map pin", "No reliable public task unless a competent local authority confirms it.", "Do not stop on working roads, cross gates or enter a mudflat because a birding post shows coordinates."]
  ]},
  {id: "base-heading", type: "heading", level: 2, text: "Pick the base with a one-question test"},
  {id: "base-selector", type: "list", items: [
    "If your non-negotiable is Tiaozini's coastal habitat, stay in or near Dongtai and verify the exact scenic-area entrance and road transfer.",
    "If your non-negotiable is milu interpretation, stay near Dafeng; do not add Tiaozini merely because both appear on a Yellow Sea map.",
    "If your priority is broad context, easier rail arrival or a weather-proof first day, use Yancheng city and begin at the Wetland Museum.",
    "If your priority is a particular migratory species, choose dates from official monitoring and migration guidance, then accept that presence is still not guaranteed.",
    "If you have only one day, never join two distant coastal products without written drive times, current opening confirmation and a protected daylight return."
  ]},
  {id: "scenarios", type: "table", caption: "Two common traveller decisions", columns: ["Traveller", "Recommended base", "Plan"], rows: [
    ["First-time visitor without specialist optics", "Yancheng city or Dafeng", "Use the museum for context, or choose the controlled Milu Park. Make wildlife understanding—not a rare-species photograph—the success measure."],
    ["Experienced birder with a scope and one target migration window", "Dongtai, after local confirmation", "Book a lawful observation service, share the target species but demand no guarantee, and obtain tide, gate and meeting-point details."],
    ["Family visiting in rain or strong wind", "Yancheng city", "Keep the museum as the full day; move the exposed coast only if the operator confirms safe access."]
  ]},
  {id: "ethics-heading", type: "heading", level: 2, text: "The sighting protocol matters more than the checklist"},
  {id: "ethics", type: "list", items: [
    "Stay on designated roads, boardwalks and hides; signs and staff instructions override a birding app.",
    "Do not use playback, drones, spotlights, feeding or close pursuit. Breeding, roosting and feeding birds need distance.",
    "Keep voices low, minimise repeated shutter noise and let birds move away without following them.",
    "Never collect eggs, feathers, plants or mudflat animals. Yancheng's coastal-wetland regulation prohibits hunting, egg collection and nest damage.",
    "Do not publish nest sites or sensitive real-time coordinates. Share records through conservation-appropriate channels.",
    "Use a guide for access compliance and interpretation, not to pressure wildlife into a photograph.",
    "Accept a distant identification or no identification. A telescope view is not a promise of a phone-camera image."
  ]},
  {id: "season", type: "paragraph", text: "Long-term pattern: migration, wintering, breeding, tide, wind and visibility alter what can be observed. Official 2026 Yancheng materials describe spring breeding at Tiaozini and seasonal crane and milu activity, but those reports document ecological conditions, not an appointment with an individual animal. Homeground's planning judgment is to choose a habitat and learning task first, then treat each sighting as a bonus."},
  {id: "failure-heading", type: "heading", level: 2, text: "Build a day that still works when the birds do not appear"},
  {id: "failure-recovery", type: "table", caption: "Weather and no-sighting recovery", columns: ["Failure", "Recovery", "Do not do"], rows: [
    ["Rain, fog or strong coastal wind", "Use the Yellow Sea Wetland Museum; ask the coastal operator whether a later safe window exists.", "Do not walk an exposed seawall or mudflat to rescue the day."],
    ["Target species absent", "Observe habitat, common species, tracks and interpretation; log conditions rather than forcing a sighting.", "Do not ask a driver to search unmarked reserve roads."],
    ["Tide or gate timing changed", "Follow the operator's revised public route or shorten the visit.", "Do not cross barriers to reach the waterline."],
    ["One component closes", "Keep the day within the same base: museum in Yancheng, forest or licensed indoor product near Dongtai, town-based rest near Dafeng.", "Do not replace it with an unverified ‘secret wetland’."],
    ["Wildlife is far away", "Use binoculars or a scope and accept distance as successful low-disturbance viewing.", "Do not approach, feed or fly a drone for scale."]
  ]},
  {id: "route", type: "callout", title: "A responsible two-stage route", body: "Stage 1: arrive at your base, verify tomorrow's operator message, tide or weather note, gate and return. Stage 2: visit one public component, stay inside its managed route and return to the same base. Add the Wetland Museum before or after the coast only when the road chain is realistic; do not market a museum–Tiaozini–milu–crane sprint as one wetland day.", tone: "decision"},
  {id: "final-check", type: "list", items: [
    "One base and one non-negotiable public component selected.",
    "Exact entrance, operator, passport/ticket method and current hours confirmed.",
    "Tide, weather, road and reserve notices rechecked.",
    "No species, flock size or close photograph is promised.",
    "Playback, drones, feeding and entry beyond barriers are excluded.",
    "Return transport and a no-sighting indoor alternative are ready.",
    "Any sensitive location data will not be published."
  ]},
  {id: "internal-links", type: "internal-links", title: "Connect the wetland base to the wider trip", items: [
    {label: "Explore China", href: "/explore/", description: "Compare destination roles before adding another coastal stop."},
    {label: "One hub or multiple bases?", href: "/guides/china-hub-and-spoke-or-multi-base-route/", description: "Decide whether a Dongtai or Dafeng overnight earns the hotel change."},
    {label: "China rail-only route planning", href: "/guides/china-rail-only-route/", description: "Separate the intercity rail leg from the final coastal road transfer."},
    {label: "China shoulder-season trade-offs", href: "/guides/china-shoulder-season-value-tradeoff/", description: "Treat seasonal value as a trade-off, not a wildlife guarantee."}
  ]},
  {id: "consultation", type: "callout", title: "Need the coast matched to your dates?", body: "A Homeground travel consultant can compare the actual base, public operator, road transfer and bad-weather recovery for your dates. Tell us whether habitat, photography, milu or a particular migration window matters most.", tone: "neutral"},
  {id: "sources", type: "sources", title: "Official sources reviewed on 13 August 2026", items: [
    {label: "Migratory Bird Sanctuaries World Heritage property and component maps", url: "https://whc.unesco.org/en/list/1606/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-13"},
    {label: "Yancheng Yellow Sea wetland official portal", url: "https://www.yellowsea-wetland.cn/", publisher: "Yancheng Yellow Sea Wetland World Natural Heritage Management Office", reviewedAt: "2026-08-13"},
    {label: "2026 public wetland attractions and education products", url: "https://www.yancheng.gov.cn/art/2026/4/26/art_34154_4420721.html", publisher: "Yancheng Municipal People's Government", reviewedAt: "2026-08-13"},
    {label: "Tiaozini breeding-habitat conservation update", url: "https://wap.yancheng.gov.cn/art/2026/5/9/art_45136_4424125.html", publisher: "Yancheng Municipal People's Government", reviewedAt: "2026-08-13"},
    {label: "Yancheng Yellow Sea wetland protection regulation", url: "https://www.yancheng.gov.cn/art/2019/10/25/art_13184_3279209.html", publisher: "Yancheng Municipal People's Government", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
