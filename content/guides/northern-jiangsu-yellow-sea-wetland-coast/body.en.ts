import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "Choose one public wetland experience and sleep near it. Dongtai is the practical base for the Tiaozini coast; Dafeng is the base for the Chinese Milu Park; Yancheng city works for the Yellow Sea Wetland Museum and a separately arranged visit toward the Red-crowned Crane Wetland Ecotourism Area. These places belong to one larger conservation story, but they are not one walkable park. Wildlife is free-moving: no responsible guide can promise a named bird, flock, tide spectacle or close encounter."},
  {id: "serial-map", type: "callout", title: "The World Heritage property is serial and protected", body: "UNESCO's Migratory Bird Sanctuaries along the Coast of Yellow Sea–Bohai Gulf are made of separate components, not a continuous visitor promenade. A World Heritage boundary can include habitat with no general visitor access. Use UNESCO maps to understand the conservation system; before travelling, ask the current site management which areas are open to visitors.", tone: "neutral"},
  {id: "components-heading", type: "heading", level: 2, text: "Translate the component map into public visitor choices"},
  {id: "component-matrix", type: "table", caption: "Northern Jiangsu wetland components and visitor choices", columns: ["Area", "What visitors can do", "Access boundary"], rows: [
    ["Dongtai / Tiaozini", "Intertidal-landscape interpretation and birdwatching from whatever scenic route or hides the site currently opens to visitors.", "Before travelling, ask the current site management which entrance, paths, observation points and transport are operating. Nearby restoration or breeding habitat is not an invitation to enter."],
    ["Dafeng / Chinese Milu Park", "Learn about milu conservation and observe animals through the park's controlled visitor system.", "A park visit is not free roaming in the national nature reserve; animal position and visibility vary."],
    ["Sheyang coast / Red-crowned Crane Wetland Ecotourism Area", "Wetland education and seasonal bird context within its public tourism zone.", "The public ecotourism area is only part of a much larger reserve. Winter does not guarantee a wild crane sighting."],
    ["Yancheng city / Yellow Sea Wetland Museum", "Read the whole migration, tidal-flat and World Heritage story indoors before choosing one coast.", "The museum is orientation, not proof that a distant reserve road, hide or tidal flat is open."],
    ["Unnamed seawall, aquaculture road or map pin", "No reliable visitor access unless a competent local authority confirms it.", "Do not stop on working roads, cross gates or enter a mudflat because a birding post shows coordinates."]
  ]},
  {id: "base-heading", type: "heading", level: 2, text: "Pick the base with a one-question test"},
  {id: "base-selector", type: "list", items: [
    "If your non-negotiable is Tiaozini's coastal habitat, stay in or near Dongtai and ask the current site management which entrance and road transfer are in use before travelling.",
    "If your non-negotiable is milu interpretation, stay near Dafeng; do not add Tiaozini merely because both appear on a Yellow Sea map.",
    "If your priority is broad context, easier rail arrival or a weather-proof first day, use Yancheng city and begin at the Wetland Museum.",
    "If your priority is a particular migratory species, choose dates from official monitoring and migration guidance, then accept that presence is still not guaranteed.",
    "If you have only one day, never join two distant coastal products without written drive times, current opening confirmation and a protected daylight return."
  ]},
  {id: "scenarios", type: "table", caption: "Two common traveller decisions", columns: ["Traveller", "Recommended base", "Plan"], rows: [
    ["First-time visitor without specialist optics", "Yancheng city or Dafeng", "Use the museum for context, or choose the controlled Milu Park. Make wildlife understanding—not a rare-species photograph—the success measure."],
    ["Experienced birder with a scope and one target migration window", "Dongtai, after local confirmation", "Book a lawful observation service, share the target species but demand no guarantee, and obtain current tide, entrance and meeting-point details."],
    ["Family visiting in rain or strong wind", "Yancheng city", "Keep the museum as the full day; move the exposed coast only if the current site management confirms safe access."]
  ]},
  {id: "ethics-heading", type: "heading", level: 2, text: "How you watch matters more than the species checklist"},
  {id: "ethics", type: "list", items: [
    "Stay on designated roads, boardwalks and hides; signs and staff instructions override a birding app.",
    "Do not use playback, drones, spotlights, feeding or close pursuit. Breeding, roosting and feeding birds need distance.",
    "Keep voices low, minimise repeated shutter noise and let birds move away without following them.",
    "Never collect eggs, feathers, plants or mudflat animals. Yancheng's coastal-wetland regulation prohibits hunting, egg collection and nest damage.",
    "Do not publish nest sites or sensitive real-time coordinates. Share records through conservation-appropriate channels.",
    "Use a guide to stay within permitted areas and understand what you see, not to pressure wildlife into a photograph.",
    "Accept a distant identification or no identification. A telescope view is not a promise of a phone-camera image."
  ]},
  {id: "season", type: "paragraph", text: "Long-term pattern: migration, wintering, breeding, tide, wind and visibility alter what can be observed. Official 2026 Yancheng materials describe spring breeding at Tiaozini and seasonal crane and milu activity, but those reports document ecological conditions, not an appointment with an individual animal. Homeground's planning judgment is to choose a habitat and learning experience first, then treat each sighting as a bonus."},
  {id: "failure-heading", type: "heading", level: 2, text: "Build a day that still works when the birds do not appear"},
  {id: "failure-recovery", type: "table", caption: "Alternatives for poor weather or no sightings", columns: ["What changed", "Better alternative", "Do not do"], rows: [
    ["Rain, fog or strong coastal wind", "Use the Yellow Sea Wetland Museum; ask the current coastal management whether a later safe window exists.", "Do not walk an exposed seawall or mudflat to rescue the day."],
    ["Target species absent", "Observe habitat, common species, tracks and interpretation; log conditions rather than forcing a sighting.", "Do not ask a driver to search unmarked reserve roads."],
    ["Tide or entrance timing changed", "Follow the current site's revised public route or shorten the visit.", "Do not cross barriers to reach the waterline."],
    ["One visitor area closes", "Keep the day within the same base: the museum in Yancheng, a legitimate indoor or forest visit near Dongtai, or a town-based rest near Dafeng.", "Do not replace it with an unverified ‘secret wetland’."],
    ["Wildlife is far away", "Use binoculars or a scope and accept distance as successful low-disturbance viewing.", "Do not approach, feed or fly a drone for scale."]
  ]},
  {id: "route", type: "callout", title: "A responsible two-part visit", body: "First, arrive at your base and confirm the next day's opening notice, tide or weather note, entrance and return transport with the current site management. Then visit one public component, stay inside its managed route and return to the same base. Add the Wetland Museum before or after the coast only when the drive time is sensible; do not market a museum–Tiaozini–milu–crane sprint as one wetland day.", tone: "decision"},
  {id: "final-check", type: "list", items: [
    "One base and one non-negotiable public component selected.",
    "Exact entrance, current site contact, passport/ticket method and current hours confirmed before travel.",
    "Tide, weather, road and reserve notices checked again before departure.",
    "No species, flock size or close photograph is promised.",
    "Playback, drones, feeding and entry beyond barriers are excluded.",
    "Return transport and a no-sighting indoor alternative are ready.",
    "Any sensitive location data will not be published."
  ]},
  {id: "internal-links", type: "internal-links", title: "Connect the wetland base to the wider trip", items: [
    {label: "Explore China", href: "/explore/", description: "Compare destination roles before adding another coastal stop."},
    {label: "One hub or multiple bases?", href: "/guides/china-hub-and-spoke-or-multi-base-route/", description: "Decide whether a Dongtai or Dafeng overnight earns the hotel change."},
    {label: "China rail-only route planning", href: "/guides/china-rail-only-route/", description: "Separate the intercity rail leg from the final coastal road transfer."},
    {label: "China shoulder-season trade-offs", href: "/guides/china-shoulder-season-value-tradeoff/", description: "Treat seasonal value as a trade-off, not a wildlife guarantee."},
    { label: "Compare wetland protection with desert-restoration evidence", href: "/guides/desert-restoration-travellers-can-see/", description: "Read management boundaries, water trade-offs, restoration claims and public access at the exact site and date." },
    { label: "Compare urban sponge features with a coastal wetland water system", href: "/guides/how-to-read-a-chinese-sponge-city/", description: "Use a mechanism-and-boundary check rather than treating green space as proof of storage, drainage or ecological performance." }
  ]},
  {id: "consultation", type: "callout", title: "Need the coast matched to your dates?", body: "A Homeground travel consultant can compare the practical base, currently open visitor area, road transfer and bad-weather alternative for your dates. Tell us whether habitat, photography, milu or a particular migration window matters most.", tone: "neutral"},
  {id: "sources", type: "sources", title: "Official sources reviewed on 13 August 2026", items: [
    {label: "Migratory Bird Sanctuaries World Heritage property and component maps", url: "https://whc.unesco.org/en/list/1606/", publisher: "UNESCO World Heritage Centre", reviewedAt: "2026-08-13"},
    {label: "Yancheng Yellow Sea wetland official portal", url: "https://www.yellowsea-wetland.cn/", publisher: "Yancheng Yellow Sea Wetland World Natural Heritage Management Office", reviewedAt: "2026-08-13"},
    {label: "2026 public wetland attractions and education products", url: "https://www.yancheng.gov.cn/art/2026/4/26/art_34154_4420721.html", publisher: "Yancheng Municipal People's Government", reviewedAt: "2026-08-13"},
    {label: "Tiaozini breeding-habitat conservation update", url: "https://wap.yancheng.gov.cn/art/2026/5/9/art_45136_4424125.html", publisher: "Yancheng Municipal People's Government", reviewedAt: "2026-08-13"},
    {label: "Yancheng Yellow Sea wetland protection regulation", url: "https://www.yancheng.gov.cn/art/2019/10/25/art_13184_3279209.html", publisher: "Yancheng Municipal People's Government", reviewedAt: "2026-08-13"},
    {label: "Hero image: Yancheng coastal saltmarsh and distant Père David’s deer, photographed by zhangshen on 8 September 2021", url: "https://commons.wikimedia.org/wiki/File:P%C3%A8re_David%27s_Deer_imported_from_iNaturalist_photo_162354434_on_24_January_2024.jpg", publisher: "Wikimedia Commons / zhangshen", reviewedAt: "2026-08-13"},
    {label: "Hero image licence: Creative Commons Attribution 4.0", url: "https://creativecommons.org/licenses/by/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
