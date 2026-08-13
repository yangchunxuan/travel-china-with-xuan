import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "Some Chinese high-speed stations are far from the old city because the railway, the station and the future urban district must satisfy different constraints at once: a fast through alignment, land and construction cost, platform capacity, interchange plans, demolition limits and local development goals. Not every high-speed station is remote, and a remote station is not automatically a planning success. For a traveller, the useful response is to compare the exact station-to-hotel chain."},
  {id: "forces", type: "table", caption: "Forces that move a station away from the historic centre", columns: ["Force", "Why an outer site can help", "Trade-off"], rows: [
    ["Rail alignment", "Straighter approaches and through-running can be easier outside dense fabric.", "The city transfer becomes longer."], ["Land and demolition", "A large station and tracks need contiguous space.", "Cheap land does not create passenger access."], ["Capacity", "Outer sites can fit more platforms and future expansion.", "A large concourse adds walking and exit friction."], ["Interchange", "A new hub may connect metro, bus and regional rail.", "Those links may open later or operate less conveniently than planned."], ["Urban development", "A station can anchor a new district.", "Development can lag, leaving an isolated station area."], ["Existing railway", "Reusing a central station preserves access.", "Old approaches may constrain speed, capacity or construction."]
  ]},
  {id: "not-one-actor", type: "heading", level: 2, text: "The railway is not the only actor choosing the site"},
  {id: "not-one-actor-copy", type: "paragraph", text: "Research on Chinese station placement describes negotiation among railway objectives, passenger demand and local development interests. National planning guidance asks cities to coordinate station-area land use and rapid connections with built-up areas and other hubs. That wording matters: it recognises that the station's benefits depend on the local connection, rather than treating the outer location itself as sufficient."},
  {id: "suffix-rule", type: "callout", title: "The station suffix is part of the ticket", body: "‘East’, ‘West’, ‘South’, ‘North’ and ‘New’ are not loose neighbourhood descriptions. They identify different stations. Match the complete bilingual station name on the ticket, hotel route and taxi destination. Never shorten it to the city name when several stations exist.", tone: "warning"},
  {id: "door-to-door", type: "list", ordered: true, items: [
    "Copy the complete departure and arrival station names from the actual train result.",
    "Map the hotel entrance to the correct station entrance, not the station-centre pin.",
    "Add hotel checkout, road or metro time, station entry and security, concourse walking and a realistic buffer.",
    "At arrival, add platform exit, luggage movement, interchange waiting and the final hotel transfer.",
    "Repeat the calculation for an alternative train using a different station; the longer rail time can produce an earlier hotel arrival.",
    "Recheck current metro, bus and station notices before payment and on the travel day."
  ]},
  {id: "scenarios", type: "comparison", title: "Two journeys with the same rail time", columns: [
    {heading: "Metro-linked hotel, light luggage", body: "An outer station can work well when one direct metro line reaches the hotel and the last service safely covers arrival."},
    {heading: "Old-city hotel, family luggage, late arrival", body: "A central station or a slower train may win door to door. Transfers, lift availability and late-night road time become part of the train choice."}
  ]},
  {id: "change-table", type: "table", caption: "When your answer changes", columns: ["New information", "Recalculate"], rows: [
    ["Train arrives after normal transit hours", "Use the verified late-night connection or price a road transfer."], ["Metro requires two long interchanges", "Compare a more central station or direct road transfer."], ["Hotel changes", "Restart from the new entrance; city-centre labels are too broad."], ["Older traveller or bulky luggage", "Count lifts, walking distance and platform-to-vehicle movement."], ["Separate onward ticket", "Protect the station-to-station transfer and missed-connection risk."]
  ]},
  {id: "recovery", type: "callout", title: "If you booked the inconvenient station", body: "Do not assume the ticket can be used at another station in the same city. First check official change/refund options for that ticket. If it must be kept, build a confirmed transfer to the exact station and move the hotel departure earlier; for an arrival, send the hotel the station name and expected time before choosing the final-mile mode.", tone: "decision"},
  {id: "internal-links", type: "internal-links", title: "Apply the mechanism to a real trip", items: [
    {label: "Which Beijing railway station?", href: "/guides/which-beijing-railway-station/", description: "Use the five-station decision matrix for Beijing."},
    {label: "China high-speed rail first-trip guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Keep tickets, documents and boarding in the national guide."},
    {label: "China private transfer or public transport", href: "/guides/china-private-transfer-or-public-transport/", description: "Choose the final mile by group and luggage."}
  ]},
  {id: "sources", type: "sources", title: "Official and independent sources", items: [
    {label: "Guidance on planning around railway passenger stations", url: "https://www.ndrc.gov.cn/xxgk/zcfb/tz/201805/t20180507_962719.html", publisher: "National Development and Reform Commission", reviewedAt: "2026-08-13"},
    {label: "Integrated transport hub planning guidance", url: "https://www.ndrc.gov.cn/xxgk/zcfb/tz/201605/W020190905516928367231.pdf", publisher: "National Development and Reform Commission", reviewedAt: "2026-08-13"},
    {label: "Multi-actor high-speed station placement research", url: "https://ir.pku.edu.cn/handle/20.500.11897/620610", publisher: "Peking University institutional repository", reviewedAt: "2026-08-13"},
    {label: "Station distance and urban impact study", url: "https://ces.xmu.edu.cn/CN/abstract/abstract802.shtml", publisher: "China Economic Studies", reviewedAt: "2026-08-13"},
    {label: "Existing versus new station trade-offs", url: "https://www.ort.shu.edu.cn/CN/10.15960/j.cnki.issn.1007-6093.2023.02.005", publisher: "Operations Research and Management Science", reviewedAt: "2026-08-13"}
  ]}
]}; export default body;
