import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer", type: "lead", text: "Keep all three cities only when each has a different job: Qingdao for the strongest rail/air gateway and a layered old-city-to-modern-bay urban coast; Yantai for a north-facing port-city stay built around Zhifu's historical streets and wine/port identity; Weihai for a smaller-scale coastal base where the sea, hills and walking or public-transport logistics dominate. Connect them as Qingdao → Yantai → Weihai, or reverse it, but search each leg by exact station. If two stops both mean ‘walk the waterfront and eat seafood’, remove one."},
  {id: "role-heading", type: "heading", level: 2, text: "Run the anti-duplication test before opening 12306"},
  {id: "role-table", type: "table", caption: "Different jobs for the three coastal cities", columns: ["City", "Distinct role", "Evidence that it is becoming repetitive"], rows: [
    ["Qingdao", "Major arrival/departure gateway; old-city streets and Zhanqiao can lead into a long urban coast toward Badaguan and the modern bay.", "You only plan a beach, one seafood meal and generic night lights—tasks the other cities can also provide."],
    ["Yantai", "Zhifu's compact port-history axis, including Yantai Hill, Chaoyang Street and Suochengli, plus a city identity tied to the north coast and wine.", "You are staying outside Zhifu only for another long promenade, with no port-history or wine-related task."],
    ["Weihai", "A smaller coastal-city rhythm, with a choice between central/historical context and an outdoor half-day such as the managed Huancheng coast.", "You are adding it only for an internet-famous street photograph or another sunset that weather can erase."]
  ]},
  {id: "decision-rule", type: "callout", title: "A city earns a hotel change by adding a verb", body: "‘See the sea’ is one verb, no matter how many cities perform it. Keep a city when it adds a different action: read a port history, walk a coherent old-city axis, use a calmer coastal base, visit a managed island or build a slower outdoor day. This is Homeground's route judgment, not an official ranking of which city is best.", tone: "decision"},
  {id: "scenarios-heading", type: "heading", level: 2, text: "Start with the traveller, not a fixed number of nights"},
  {id: "scenarios", type: "table", caption: "Traveller scenarios and the cities they keep", columns: ["Traveller", "Keep", "Cut or condition"], rows: [
    ["First China coast trip, arriving by air and continuing inland", "Qingdao plus either Yantai or Weihai", "Cut the third city unless it has a named task; protect the onward rail day."],
    ["Port, architecture and urban-history traveller", "Qingdao + Yantai", "Add Weihai only for a clearly different outdoor or historical component."],
    ["Family wanting slower coast and fewer big-city days", "Qingdao gateway + Weihai base", "Cut Yantai if the family will not use the Zhifu port-history axis."],
    ["Repeat visitor focused on eastern Shandong", "Yantai + Weihai, with Qingdao as transport only if needed", "Do not force central Qingdao sightseeing into an arrival or departure connection."]
  ]},
  {id: "rail-heading", type: "heading", level: 2, text: "Build a rail arc, not three separate returns"},
  {id: "rail-workflow", type: "list", items: [
    "Choose the open end first: arrive in Qingdao and leave from Weihai/Yantai, or reverse the route, when flight and onward-rail options allow.",
    "Search Qingdao Station and Qingdao North separately. The first can suit the old-city side; the second may offer a stronger network but creates a city transfer.",
    "Search Yantai Station and Yantai South separately. A train labelled for the city is not automatically near a Zhifu hotel.",
    "Search Weihai Station and Weihai North separately. Match the arrival to the final hotel and coastal task, not merely the shortest train result.",
    "Check the direct result for Qingdao–Yantai, Yantai–Weihai and any proposed skip leg in the official 12306 system for the exact travel date.",
    "Save train number, full station name, passenger passport record and hotel-to-station transfer together.",
    "Do not quote a permanent frequency. The timetable is dynamic; a 2026 municipal notice that added Qingdao–Weihai trains proves connectivity, not your date's departure.",
    "Leave a recovery departure later in the day or be willing to shorten the previous city's final activity."
  ]},
  {id: "station-table", type: "table", caption: "Station choice changes the city experience", columns: ["Station pair", "Use it to ask", "Common planning error"], rows: [
    ["Qingdao / Qingdao North", "Does the train advantage outweigh the cross-city transfer from my old-city or bay hotel?", "Treating ‘Qingdao’ as one platform."],
    ["Yantai / Yantai South", "Am I staying on the Zhifu historical axis or elsewhere in the urban area?", "Choosing the fastest train but losing the time in the final road transfer."],
    ["Weihai / Weihai North", "Which station gives the simpler hotel and next-day coastal connection?", "Selecting by city name without checking the exit-to-hotel route."],
    ["Intermediate station such as Muping", "Is the station genuinely near my named eastern-Yantai task and does my chosen train stop?", "Using a current promotional journey as if every train and visitor should do the same."]
  ]},
  {id: "city-execution-heading", type: "heading", level: 2, text: "Give each retained city one coherent execution line"},
  {id: "city-lines", type: "list", items: [
    "Qingdao: old-city arrival around the railway-station/Zhanqiao side → a chosen historical neighbourhood segment → one later coastal zone. Do not attempt the entire municipal shoreline.",
    "Yantai: Yantai Hill or the port edge → Chaoyang Street → Suochengli, then decide whether the evening remains in Zhifu. Current city sources position these as one historical port-city area.",
    "Weihai: choose either central historical/harbour context or an outdoor coastal segment. In 2026, parts of the Banyue Bay Huancheng Road auxiliary line had seasonal vehicle and bicycle restrictions; on-site controls decide the usable route.",
    "For every city: record the final station transfer before adding the last waterfront walk. The final photograph is expendable; the train is not."
  ]},
  {id: "cut-heading", type: "heading", level: 2, text: "When to remove one city"},
  {id: "cut-table", type: "table", caption: "Fast deletion rules", columns: ["Constraint", "Remove first when", "What you keep instead"], rows: [
    ["Few nights or an onward inland route", "The third city adds only coast, food and a hotel change.", "Two distinct city roles and one protected transfer day."],
    ["Poor weather across the peninsula", "A city has no indoor, historical or culinary task independent of the sea view.", "The stop with a museum, old-city axis or easier onward rail."],
    ["Older parents, children or heavy luggage", "The station–hotel–coast chain needs repeated long road transfers.", "One longer base and a deliberate day, not three short check-ins."],
    ["Peak-period inventory", "The useful direct train or suitable hotel cannot be secured.", "A simpler open-jaw arc rather than a forced backtrack."],
    ["Same photo brief in two cities", "Both plans are beach, sunset and a photogenic road.", "The city with the better transport fit; give the remaining city a different task."]
  ]},
  {id: "failure", type: "callout", title: "If a rail leg or coast closes, shorten the arc", body: "No useful direct train: check the other station pair, then consider deleting the weakest city rather than building an uncertain road transfer. Strong wind, rain or seasonal access control: move the city toward its old streets, museum or food task; do not chase a closed auxiliary road. Missed train: use official 12306 change/refund rules and return to a staffed station process. Never protect all three city names at the expense of a safe onward connection.", tone: "warning"},
  {id: "final-check", type: "list", items: [
    "Each retained city has a different verb and named area.",
    "The arc has an open end or a justified onward connection.",
    "Exact station pairs were searched on 12306 for the travel date.",
    "Hotel-to-station transfer is saved for every leg.",
    "No permanent frequency or journey time is promised.",
    "Seasonal coastal controls and weather are rechecked.",
    "One city is marked as removable if rail or weather fails."
  ]},
  {id: "internal-links", type: "internal-links", title: "Plan the wider route", items: [
    {label: "Explore China", href: "/explore/", description: "Compare this regional role with the next destination."},
    {label: "China high-speed trains for first-time visitors", href: "/guides/china-high-speed-train-first-time-guide/", description: "Book exact station names and passport records correctly."},
    {label: "China rail-only route planning", href: "/guides/china-rail-only-route/", description: "Test whether the whole itinerary still works without domestic flights."},
    {label: "One hub or multiple bases?", href: "/guides/china-hub-and-spoke-or-multi-base-route/", description: "Price every hotel change in time and energy."}
  ]},
  {id: "consultation", type: "callout", title: "Need one city removed from the arc?", body: "A Homeground travel consultant can compare exact trains, stations, hotel areas and city roles for your dates, then identify which stop adds the least value without turning the route into a sales itinerary.", tone: "neutral"},
  {id: "sources", type: "sources", title: "Official sources reviewed on 13 August 2026", items: [
    {label: "Official train search and ticketing", url: "https://www.12306.cn/en/index.html", publisher: "China Railway 12306", reviewedAt: "2026-08-13"},
    {label: "Qingdao official coastal and old-city route roles", url: "https://www.qingdao.gov.cn/zwgk/xxgk/whly/gkml/gzxx/202603/t20260303_10522933.shtml", publisher: "Qingdao Municipal People's Government", reviewedAt: "2026-08-13"},
    {label: "Yantai Zhifu historical-port night route and current visitor information", url: "https://whlyj.yantai.gov.cn/col/col42216/art/2026/art_bc76c53b606143c985396e5808ffecd9.html", publisher: "Yantai Culture and Tourism Bureau", reviewedAt: "2026-08-13"},
    {label: "2026 Qingdao–Weihai service update", url: "https://www.weihai.gov.cn/art/2026/4/2/art_58820_6260365.html", publisher: "Weihai Municipal People's Government", reviewedAt: "2026-08-13"},
    {label: "2026 seasonal vehicle controls on the Banyue Bay coastal auxiliary road", url: "https://www.weihai.gov.cn/art/2026/4/20/art_58820_6296986.html", publisher: "Weihai Municipal People's Government", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
