import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "Some Chinese high-speed stations sit outside the established centre because planners balance railway alignment and capacity, construction and demolition constraints, local access and, sometimes, development goals. The balance differs by city. National guidance says new stations should be in or as close as possible to built-up areas, so an outer site is not a policy success by itself. The six-factor table below is Homeground's synthesis of official guidance and cited research, not a verbatim government checklist. For a traveller, the useful response is to compare the exact station-to-hotel chain."},
  {id: "forces", type: "table", caption: "Planning mechanisms synthesized from official guidance and cited research", columns: ["Force", "Why an outer site can help", "Trade-off"], rows: [
    ["Rail alignment", "Straighter approaches and through-running can be easier outside dense fabric.", "The city transfer becomes longer."], ["Land and demolition", "A large station and tracks need contiguous space.", "Cheap land does not create passenger access."], ["Capacity", "Outer sites can fit more platforms and future expansion.", "A large concourse adds walking and exit friction."], ["Interchange", "A new hub may connect metro, bus and regional rail.", "Those links may open later or operate less conveniently than planned."], ["Urban development", "A station can anchor a new district.", "Development can lag, leaving an isolated station area."], ["Existing railway", "Reusing a central station preserves access.", "Old approaches may constrain speed, capacity or construction."]
  ]},
  {id: "not-one-actor", type: "heading", level: 2, text: "The railway is not the only actor choosing the site"},
  {id: "not-one-actor-copy", type: "paragraph", text: "Research on Chinese station placement describes negotiation among railway objectives, passenger demand and local development interests. National planning guidance calls for new stations to be in central urban areas or near built-up areas where possible, rejects blind station-led city building and requires rapid links to existing districts and other hubs. An outer station works for passengers only when that local connection works."},
  {id: "suffix-rule", type: "callout", title: "Treat every qualifier as part of the station name", body: "When a direction or another qualifier appears in the official station name, copy the full name—and the Chinese characters where available—from the 12306 result or booking confirmation into the hotel route and taxi destination. ‘East’, ‘West’, ‘South’ and ‘North’ can identify entirely different stations; do not infer a separate station from an unofficial translation alone.", tone: "warning"},
  {id: "comparison-card", type: "table", caption: "Compare two tickets on one door-to-door card", columns: ["Write down", "Ticket A", "Ticket B"], rows: [
    ["Exact departure and arrival stations", "Full ticketed names", "Full ticketed names"],
    ["Hotel door → departure platform", "Transfer, station entry, walking, buffer", "Transfer, station entry, walking, buffer"],
    ["Published train time", "Ticket time", "Ticket time"],
    ["Arrival platform → next hotel door", "Exit, interchange, waiting, final mile", "Exit, interchange, waiting, final mile"],
    ["Weakest link", "Last metro, stairs, traffic or separate ticket", "Last metro, stairs, traffic or separate ticket"],
    ["Usable arrival", "Time everyone and every bag reaches the next door", "Time everyone and every bag reaches the next door"]
  ]},
  {id: "door-to-door", type: "list", ordered: true, items: [
    "Copy the complete departure and arrival station names from the actual train result.",
    "Route between the hotel's actual entrance and the exact railway station using the real metro or bus stop, or the confirmed vehicle pickup/drop-off area. A station-centre pin is not a door-to-door endpoint.",
    "Add hotel checkout, road or metro time, station entry and security, concourse walking and a realistic buffer.",
    "At arrival, add platform exit, luggage movement, interchange waiting and the final hotel transfer.",
    "Repeat the calculation for an alternative train using a different station; the longer rail time can produce an earlier hotel arrival.",
    "Recheck current metro, bus and station notices before payment and on the travel day."
  ]},
  {id: "scenarios", type: "comparison", title: "Two journeys with the same rail time", columns: [
    {heading: "Metro-linked hotel, light luggage", body: "An outer station can work well when one direct metro line reaches the hotel and the last service safely covers arrival."},
    {heading: "Old-city hotel, family luggage, late arrival", body: "A central station or a slower train may win door to door. Transfers, lift availability and late-night road time become part of the train choice."}
  ]},
  {id: "decision-rule", type: "callout", title: "Choose the usable arrival, not the impressive train time", body: "The faster train wins only when its complete chain still wins after the group, bags, station walking and last connection are counted. If the result is close, prefer the option with fewer fragile handoffs or the one that leaves a recoverable alternative after arrival.", tone: "decision"},
  {id: "change-table", type: "table", caption: "When your answer changes", columns: ["New information", "Recalculate"], rows: [
    ["Train arrives after normal transit hours", "Use the verified late-night connection or price a road transfer."], ["Metro requires two long interchanges", "Compare a more central station or direct road transfer."], ["Hotel changes", "Restart from the new entrance; city-centre labels are too broad."], ["Older traveller or bulky luggage", "Verify an end-to-end step-free route; lifts shown at individual stations do not prove every interchange works."], ["Separate onward ticket", "Protect the station-to-station transfer and missed-connection risk."]
  ]},
  {id: "recovery", type: "callout", title: "If you booked the inconvenient station", body: "Do not assume the ticket can be used at another station in the same city. Check the current options in the official 12306 order. If keeping it, save the exact station and hotel name/address in Chinese, verify the final transit cutoff and a road fallback, and leave earlier. If the planned connection fails on arrival, ask station staff for the current authorised taxi or ride-hail pickup point.", tone: "decision"},
  {id: "help", type: "callout", title: "Need two station options compared door to door?", body: "Send Homeground the date, exact train choices, both hotel entrances, group size, luggage, walking limits and next fixed booking. We can compare the full chains and flag the live transport facts to recheck; the railway and local operators control inventory and operations.", tone: "neutral"},
  {id: "internal-links", type: "internal-links", title: "Apply the mechanism to a real trip", items: [
    {label: "Which Beijing railway station?", href: "/guides/which-beijing-railway-station/", description: "Use the guide to Beijing's eight major railway terminals."},
    {label: "China high-speed rail first-trip guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Keep tickets, documents and boarding in the national guide."},
    {label: "China private transfer or public transport", href: "/guides/china-private-transfer-or-public-transport/", description: "Choose the final mile by group and luggage."}
  ]},
  {id: "sources", type: "sources", title: "Official and independent sources", items: [
    {label: "Guidance on planning around railway passenger stations", url: "https://www.ndrc.gov.cn/xxgk/zcfb/tz/201805/t20180507_962719.html", publisher: "National Development and Reform Commission", reviewedAt: "2026-08-13"},
    {label: "Integrated transport hub planning guidance", url: "https://www.ndrc.gov.cn/xxgk/zcfb/tz/201605/W020190905516928367231.pdf", publisher: "National Development and Reform Commission", reviewedAt: "2026-08-13"},
    {label: "Multi-actor high-speed station placement research", url: "https://ir.pku.edu.cn/handle/20.500.11897/620610", publisher: "Peking University institutional repository", reviewedAt: "2026-08-13"},
    {label: "Station distance and urban impact study", url: "https://ces.xmu.edu.cn/CN/abstract/abstract802.shtml", publisher: "China Economic Studies", reviewedAt: "2026-08-13"},
    {label: "Existing versus new station trade-offs", url: "https://www.ort.shu.edu.cn/CN/10.15960/j.cnki.issn.1007-6093.2023.02.005", publisher: "Operations Research and Management Science", reviewedAt: "2026-08-13"},
    {label: "Hero photograph: Kunming South west square and station building — Baycrest, 2017 (cropped)", url: "https://commons.wikimedia.org/wiki/File:Kunming_South_Railway_Station.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13"},
    {label: "CC BY-SA 2.5 licence for the cropped hero photograph", url: "https://creativecommons.org/licenses/by-sa/2.5/", publisher: "Creative Commons", reviewedAt: "2026-08-13"}
  ]}
]}; export default body;
