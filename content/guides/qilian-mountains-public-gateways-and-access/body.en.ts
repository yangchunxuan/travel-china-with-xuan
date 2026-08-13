import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "direct-answer", type: "lead", text: "Do not search for one ‘Qilian Mountains National Park entrance’. As of 13 August 2026, national and provincial official pages still describe the proposed park as the Qilian Mountains National Park candidate area. The mountain system crosses Gansu and Qinghai, while public museums, entrance-community projects and separately operated scenic areas have different managers and access evidence. Choose a town first, then one named public site, and treat everything beyond its signed visitor boundary as closed unless the responsible authority explicitly opens it."},
  {id: "status-boundary", type: "callout", title: "Current official status: candidate area, not one ticketed national park", body: "This is a 2026 fact, not a wording preference. A State Forestry and Grassland Administration report published in February 2026 still used ‘candidate area’; a December 2025 report did the same for the Qinghai section. Old pilot-plan maps and lists of proposed entrance communities explain policy, but they do not prove that a gate, road, trail or shuttle is open today.", tone: "warning"},
  {id: "ledger-heading", type: "heading", level: 2, text: "Know which places are actually public before choosing a base"},
  {id: "gateway-ledger", type: "table", caption: "What each Qilian access label proves—and does not prove", columns: ["Place or label", "What official evidence supports", "What you must not infer"], rows: [
    ["Qilian Mountains National Park candidate area", "A cross-provincial conservation and park-establishment programme covering parts of Gansu and Qinghai.", "It is not a single attraction, a universal ticket or permission to enter a mapped protected zone."],
    ["Hongwansi town, Sunan", "Zhangye forestry authorities identify the Qilian Mountains National Park Natural Museum in Hongwansi as a public-education facility.", "A museum visit does not authorise a self-drive route into the candidate area's core or prove every nearby road is open."],
    ["Mati township entrance community", "National and Zhangye sources document entrance-community development and the established Mati Temple scenic area outside the idea of unrestricted park access.", "‘Entrance community’ is a planning and service term, not an open backcountry gate."],
    ["Kangle town and other Zhangye-side communities", "Official plans and education programmes place public services and nature education in communities on the park edge.", "A promotional landscape name, grassland photo or accommodation pin is not access evidence for protected land."],
    ["Babao town / Qilian County side", "The 2019 pilot plan listed Babao and nearby Qinghai communities as proposed entrance-service locations; newer sources confirm the Qinghai candidate section remains under conservation management.", "The old plan does not show what is open today. Before travelling, confirm one named public venue or registered local activity for your date."],
    ["A map pin, viewpoint or wildlife location posted online", "Nothing by itself. Coordinates can point to a village road, grazing land, reserve, patrol route or unsafe track.", "Do not enter, fly a drone, camp or follow an unsigned track because another traveller posted it."]
  ]},
  {id: "bases-heading", type: "heading", level: 2, text: "Choose the base by the public experience you can actually confirm"},
  {id: "base-choice", type: "table", caption: "Practical base choices for different Qilian trips", columns: ["Base", "Choose it when", "Build the day around"], rows: [
    ["Zhangye + Sunan / Hongwansi", "You want the strongest documented public interpretation and a road-based Zhangye-side trip.", "The Natural Museum, a separately confirmed Sunan scenic site and a return to town. Before travelling, ask each venue about current hours and road conditions."],
    ["Zhangye + Mati township", "You want an established cultural attraction and an entrance-community context rather than a claim of wilderness access.", "Mati Temple, community services and a conservative return. Confirm current ticketing, internal transport and weather restrictions with the scenic area before travelling."],
    ["Qilian County / Babao", "Your wider Qinghai route already reaches Haibei and you can confirm one named public attraction or registered local programme.", "Use only that named attraction or activity. Staying in the county does not authorise unsupervised driving in protected areas."],
    ["No overnight mountain base", "Only vague social-media coordinates are available, roads are affected, or the person arranging the visit cannot identify the managing authority.", "Use a public museum or city-based nature-education day and postpone the mountain-edge component."]
  ]},
  {id: "workflow-heading", type: "heading", level: 2, text: "How to book without guessing about access"},
  {id: "lawful-workflow", type: "list", items: [
    "Write the exact destination in Chinese, including the county, township and full venue or organiser name; ‘Qilian Mountains’ is not enough for a driver.",
    "Ask who manages the site, which gate or visitor centre checks admission, and whether a passport can be used for the current ticket or registration.",
    "Request a dated notice for seasonal closure, forest or grassland fire control, flood damage, snow, road works and vehicle restrictions.",
    "Separate the public highway, the community service zone and the signed visitor area. Permission on one does not transfer to the others.",
    "For a driver, put the legal turnaround point, waiting time, what to do if mobile signal drops and the town return in writing.",
    "Do not ask a hotel or driver to ‘find a quiet entrance’. Ask for an officially open site and the authority that confirms it.",
    "Carry water, sun and cold protection, but do not treat equipment as permission to camp, hike off route or approach wildlife.",
    "Check once more on the evening before departure; high-elevation road and fire-control decisions can change after an itinerary is booked."
  ]},
  {id: "prohibited-alternatives", type: "callout", title: "If an activity is prohibited, replace the activity—not the rule", body: "Closed road: use the public museum or community exhibit. No off-road access: stay on the signed scenic route. No drone: use ground-level photography from a public viewpoint. No camping or fire: sleep in a licensed town property. Wildlife encounter: remain in the vehicle or designated area, give the animal distance and never publish sensitive coordinates. Homeground's planning judgment is to lose a photograph rather than turn uncertainty into entry.", tone: "decision"},
  {id: "scenarios-heading", type: "heading", level: 2, text: "Two trips that should produce different answers"},
  {id: "traveller-scenarios", type: "table", caption: "Scenario decisions", columns: ["Traveller", "Better decision", "Reason"], rows: [
    ["Rail traveller with one spare day in Zhangye", "Use Zhangye as the hotel base; pair the Hongwansi museum with one separately confirmed public place in Sunan, or choose Mati township as a different day.", "It preserves a reliable city return and avoids selling the entire mountain range as a day-trip attraction."],
    ["Self-driver crossing Qinghai with older parents", "Keep Babao/Qilian County as a service base only after confirming a named public activity; prefer short signed access and a daylight return.", "Altitude, long roads and uncertain toilets matter more than adding a remote map pin."],
    ["Photographer requesting sunrise inside a reserve", "Use an authorised public viewpoint or registered programme; otherwise cancel that shot.", "Sunrise timing does not override protection zoning, road closure or resident land boundaries."]
  ]},
  {id: "conditions", type: "paragraph", text: "Long-term pattern: the Qilian range has large elevation changes, exposed roads and sharp local weather differences. That supports generous buffers, layered clothing and conservative daylight travel; it does not support a weather guarantee for the whole range. The 2026 fact is the candidate-area status. Homeground's judgment is to plan from the outside in—base, named public venue, signed visitor boundary—rather than building a trip around an attractive coordinate."},
  {id: "final-check", type: "list", items: [
    "Current official status checked again before publication and departure.",
    "Exact county, township, venue and current management contact saved in Chinese.",
    "Public opening evidence is current, not only a pilot plan or promotion.",
    "Passport, ticket or registration method confirmed with the current venue before travel.",
    "Road, fire-control, snow and flood notices checked for the date.",
    "Driver knows the lawful turnaround point and return time.",
    "No off-road route, drone, camping, fire or wildlife approach is assumed.",
    "A museum or town-based replacement is ready if access closes."
  ]},
  {id: "internal-links", type: "internal-links", title: "Place the gateway in a wider China plan", items: [
    {label: "Explore China", href: "/explore/", description: "Return to the destination collection before adding another remote region."},
    {label: "China climate regions for trip timing", href: "/guides/china-climate-regions-for-trip-timing/", description: "Plan a multi-region trip without treating western China as one weather zone."},
    {label: "One hub or multiple bases?", href: "/guides/china-hub-and-spoke-or-multi-base-route/", description: "Decide whether a remote overnight base earns its hotel change."},
    {label: "China high-speed trains for first-time visitors", href: "/guides/china-high-speed-train-first-time-guide/", description: "Keep the Zhangye rail leg separate from the final road transfer."}
  ]},
  {id: "consultation", type: "callout", title: "Need help choosing the Qilian side of your trip?", body: "A Homeground travel consultant can check the named gateway, currently open public venue, road conditions and a closure alternative for your dates. Share the exact towns, mobility needs and any activity you have been promised; we will not turn an unconfirmed protected-area pin into a route.", tone: "neutral"},
  {id: "sources", type: "sources", title: "Official sources reviewed on 13 August 2026", items: [
    {label: "Qilian candidate-area conservation work in 2026", url: "https://www.forestry.gov.cn/c/www/lcdt/660657.jhtml", publisher: "National Forestry and Grassland Administration", reviewedAt: "2026-08-13"},
    {label: "Qinghai section still described as a candidate area", url: "https://www.forestry.gov.cn/c/www/zrgjgy/651864.jhtml", publisher: "National Forestry and Grassland Administration", reviewedAt: "2026-08-13"},
    {label: "Public sharing, Hongwansi museum and Mati entrance community", url: "https://www.forestry.gov.cn/c/www/zrzrbhq/602242.jhtml", publisher: "National Forestry and Grassland Administration", reviewedAt: "2026-08-13"},
    {label: "Zhangye natural-education and museum network", url: "https://www.zhangye.gov.cn/lyj/dzdt/gzdt/202512/t20251212_1487338.html", publisher: "Zhangye Forestry and Grassland Bureau", reviewedAt: "2026-08-13"},
    {label: "Qilian pilot plan and proposed entrance communities (planning evidence only)", url: "https://www.forestry.gov.cn/html/main/main_4461/20190215090310544360608/file/20190215091240236906983.pdf", publisher: "National Forestry and Grassland Administration", reviewedAt: "2026-08-13"},
    {label: "Hero image: Mati Temple in Sunan County, photographed by guan on 30 September 2011", url: "https://commons.wikimedia.org/wiki/File:%E7%94%98%E8%82%83%E7%9C%81%E5%BC%A0%E6%8E%96%E5%B8%82%E8%82%83%E5%8D%97_%E9%A9%AC%E8%B9%84%E5%AF%BA_-_panoramio_(2).jpg", publisher: "Wikimedia Commons / guan", reviewedAt: "2026-08-13"},
    {label: "Hero image licence: Creative Commons Attribution 3.0", url: "https://creativecommons.org/licenses/by/3.0/", publisher: "Creative Commons", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
