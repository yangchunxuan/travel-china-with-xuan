import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-001",
      type: "lead",
      text: "Chongqing is difficult to plan because several kinds of geography occupy the same map: two rivers, steep banks, stacked roads, buildings with entrances on different levels, and a municipality large enough to contain both a dense megacity and distant World Heritage landscapes."
    },
    {
      id: "paragraph-002",
      type: "paragraph",
      text: "For a first trip, the useful question is not “Which viral viewpoint should I collect?” It is: which part of Chongqing belongs in this route, where should I sleep, which transport hub is actually on my ticket, and how much energy will the city ask from my group?"
    },
    {
      id: "paragraph-003",
      type: "paragraph",
      text: "This hub makes those decisions. It does not replace a street-by-street orientation tutorial, a complete hotel-area comparison, a tiankeng geology lesson or a full Sichuan-opera guide."
    },
    {
      id: "heading-004",
      type: "heading",
      level: 2,
      text: "The decision in one minute"
    },
    {
      id: "list-005",
      type: "list",
      ordered: false,
      items: [
        "Two nights usually protect one full urban day. Keep the plan in central Yuzhong and one nearby evening area; do not add Wulong or Dazu.",
        "Three nights usually provide two full days. That is the practical minimum for central Chongqing plus one cross-river or cross-district choice.",
        "Four or five nights make one outlying extension possible. Wulong needs a landscape-first day and may justify an overnight; Dazu needs a heritage-first day and currently remains a road-based excursion.",
        "Jiefangbei is the simplest first base for central sights; Guanyinqiao suits modern commercial life and late evenings; Nan’an is chosen for the south bank; Shapingba is mainly a transport and west-side decision.",
        "Read the exact station on the ticket. Chongqing North, Chongqing West, Shapingba and Chongqing East are different hubs.",
        "A short line on a map is not a walking-time promise. Check the river bank, street level, entrance and vertical connection."
      ]
    },
    {
      id: "heading-006",
      type: "heading",
      level: 2,
      text: "1. Chongqing’s role in a China route"
    },
    {
      id: "river-confluence",
      type: "figure",
      src: "/images/destinations/chongqing/confluence-1200.webp",
      alt: "The Yangtze and Jialing rivers meeting below the Yuzhong peninsula in Chongqing.",
      width: 1200,
      height: 800,
      caption: "The river confluence explains why nearby-looking districts can still require a bridge, tunnel or rail connection."
    },
    {
      id: "paragraph-007",
      type: "paragraph",
      text: "Chongqing is one of China’s four provincial-level municipalities. It connects directly to China in the administrative hierarchy; it is not a city inside Sichuan. “Chongqing” can mean the central urban area, the much larger municipality, or a gateway to places several hours from the centre."
    },
    {
      id: "paragraph-008",
      type: "paragraph",
      text: "The city sits where the Yangtze and Jialing rivers meet and has three route roles:"
    },
    {
      id: "list-009",
      type: "list",
      ordered: true,
      items: [
        "A city destination in the Chengdu–Chongqing pair. The cities combine easily by rail but are not interchangeable. Chengdu is flatter and often used for pandas, teahouses and Sichuan-side excursions; Chongqing is steeper, river-defined and stronger as a dramatic urban landscape and Yangtze gateway.",
        "An upper-Yangtze start or finish. The main Three Gorges market still centres on Chongqing–Yichang itineraries. Operators also use other embarkation points and route variants, so the cruise is a separate transport product with an assigned pier—not a boat that always leaves from one Chaotianmen berth.",
        "A southwest and Wuling-mountain connector. Current rail patterns include the southeast corridor through Chongqing East toward Wulong South and Qianjiang, plus selected Zhangjiajie services. Furong Town and Fenghuang need a date-specific check; the approved future Qianjiang–Jishou railway is not a current connection."
      ]
    },
    {
      id: "heading-010",
      type: "heading",
      level: 3,
      text: "Decision table: does Chongqing fit your trip?"
    },
    {
      id: "table-011",
      type: "table",
      caption: "Decision table: does Chongqing fit your trip?",
      columns: [
        "Main interest",
        "Fit",
        "Why it works",
        "Main warning"
      ],
      rows: [
        [
          "Layered cityscape and infrastructure",
          "Strong",
          "Rivers, bridges, rail and escarpments are part of the experience",
          "A photo checklist hides the route logic"
        ],
        [
          "Food and late urban life",
          "Strong",
          "Dense neighbourhood dining and active commercial districts",
          "Early sleepers may not use the evening advantage"
        ],
        [
          "Night views",
          "Strong but secondary",
          "The skyline makes more sense after seeing the river structure in daylight",
          "One queue or viewpoint should not control the whole visit"
        ],
        [
          "Natural landscape",
          "Strong with added time",
          "Wulong gives a major karst extension",
          "Wulong is not downtown"
        ],
        [
          "Buddhist art and heritage",
          "Strong with a dedicated day",
          "Dazu Rock Carvings justify a focused excursion",
          "The sites are separate from central Chongqing"
        ],
        [
          "Low-walking city break",
          "Possible with redesign",
          "Rail, cars, lifts and seated river views can reduce effort",
          "“Near” does not mean level or step-free"
        ]
      ]
    },
    {
      id: "heading-012",
      type: "heading",
      level: 2,
      text: "2. How many nights do you need?"
    },
    {
      id: "paragraph-013",
      type: "paragraph",
      text: "Count complete sightseeing days, not only hotel nights. A late arrival and early departure can turn three nights into one usable day. Chongqing also rewards a light arrival evening: finding the correct hotel entrance and eating nearby is often better than forcing a cross-city list."
    },
    {
      id: "heading-014",
      type: "heading",
      level: 3,
      text: "Decision table: night allocation"
    },
    {
      id: "table-015",
      type: "table",
      caption: "Decision table: night allocation",
      columns: [
        "Time",
        "What it protects",
        "Reasonable scope",
        "Leave out"
      ],
      rows: [
        [
          "2 nights",
          "Usually 1 full day",
          "Jiefangbei–Hongyadong–Chaotianmen, plus either Shibati/Mountain City Trail or a nearby evening view",
          "Wulong, Dazu and a Liziba–Ciqikou–Nanshan circuit"
        ],
        [
          "3 nights",
          "Usually 2 full days",
          "Central Yuzhong on one day; one cross-river or cross-district day on the other",
          "Both outer extensions"
        ],
        [
          "4 nights",
          "Usually 3 full days",
          "Two urban days plus either Wulong or Dazu",
          "Pretending the extension still leaves a full city day"
        ],
        [
          "5 nights",
          "3–4 full days",
          "Two urban days plus Wulong with an optional overnight, or a slower Dazu day",
          "Both outer areas unless transfers are unusually favourable"
        ],
        [
          "6+ nights",
          "A real city-and-municipality stay",
          "Central city, one or two outer areas and recovery time",
          "Repeated hotel moves without a clear benefit"
        ]
      ]
    },
    {
      id: "paragraph-016",
      type: "paragraph",
      text: "Two urban nights work for a concentrated stop in a wider route, not a representative municipality trip. Three nights are the best minimum for most first visitors. Adding Wulong changes the trip into city plus landscape: station access, local transfer, shuttles, weather and walking still make a full operational day. Adding Dazu creates a culture-and-heritage day. Build that excursion from transport and opening information verified for the travel date; this Hub does not rely on proposed future infrastructure."
    },
    {
      id: "heading-017",
      type: "heading",
      level: 2,
      text: "3. Read Chongqing in four questions"
    },
    {
      id: "crown-escalator",
      type: "figure",
      src: "/images/destinations/chongqing/crown-escalator-1200.webp",
      alt: "The Crown Escalator in Chongqing climbing between two street levels.",
      width: 1200,
      height: 750,
      caption: "A real vertical connector is more useful than a straight-line map distance in Chongqing."
    },
    {
      id: "paragraph-018",
      type: "paragraph",
      text: "Before walking, ask:"
    },
    {
      id: "list-019",
      type: "list",
      ordered: true,
      items: [
        "Which river bank am I on? Yuzhong, Jiangbei and Nan’an may look adjacent across water but require a bridge, tunnel, ferry or rail connection.",
        "Which level is the destination on? A road may pass beneath another street or meet the same building several floors apart.",
        "Which entrance is usable? A hotel, mall, station or attraction can have entrances that solve very different height changes.",
        "What is the vertical connector? Rail, lift, escalator, stairs, ramp, taxi approach or an indoor passage may determine the route."
      ]
    },
    {
      id: "paragraph-020",
      type: "paragraph",
      text: "Calling Chongqing an “8D magic city” does not tell a traveller how to reach the lobby, whether the final path has stairs, or why a straight line between two pins becomes a detour. Use the specialist owner Chongqing Upper and Lower City Orientation (chongqing-upper-lower-city-orientation) for the full bank–level–entrance–connection method and current closure warnings; this hub keeps only the decision framework."
    },
    {
      id: "heading-021",
      type: "heading",
      level: 2,
      text: "4. Where to stay: choose a task, not a famous name"
    },
    {
      id: "paragraph-022",
      type: "paragraph",
      text: "A hotel area should reduce repeated travel for the itinerary you have. In Chongqing, the exact property entrance matters almost as much as the district. Before paying, check the road used by cars, the lobby level, the practical rail entrance and the final route with luggage."
    },
    {
      id: "heading-023",
      type: "heading",
      level: 3,
      text: "Decision table: accommodation bases"
    },
    {
      id: "table-024",
      type: "table",
      caption: "Decision table: accommodation bases",
      columns: [
        "Base",
        "Best for",
        "Main advantage",
        "Main cost",
        "Booking check"
      ],
      rows: [
        [
          "Jiefangbei",
          "First visits focused on central Chongqing",
          "Strong access to Jiefangbei, Hongyadong, Chaotianmen and Shibati",
          "Crowds and steep last-mile routes",
          "Exact lobby level and vehicle entrance"
        ],
        [
          "Guanyinqiao",
          "Modern shopping, food, nightlife and a northern base",
          "Active neighbourhood life and useful Jiangbei/Yubei access",
          "Repeated travel to old Yuzhong",
          "Whether most mornings still begin across the river"
        ],
        [
          "Nan’an",
          "South-bank skyline, Nanbin Road, Nanping or Nanshan priorities",
          "Views and a different relationship with the rivers",
          "“Nan’an” covers several distinct bases",
          "Name the exact sub-area and test repeated trips"
        ],
        [
          "Shapingba",
          "Chengdu rail links, west-side arrivals or Ciqikou",
          "Convenient when a station or west-side task is fixed",
          "Weak for repeated Jiefangbei evenings",
          "Confirm Shapingba versus Chongqing West"
        ]
      ]
    },
    {
      id: "paragraph-025",
      type: "paragraph",
      text: "Choose Jiefangbei when central Yuzhong dominates the first two mornings. Choose Guanyinqiao when contemporary commercial life, late dining and northern access matter more. Treat Nan’an as a family of bases: Nanbin Road, Nanping, Danzishi and Nanshan do not solve the same trip. Shapingba earns its place when a matching train, west-side schedule or Ciqikou-focused day is genuinely important."
    },
    {
      id: "paragraph-026",
      type: "paragraph",
      text: "Use the specialist owner Where to Stay in Chongqing: Jiefangbei, Guanyinqiao or Shapingba (chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba) for the complete three-area comparison and property checks. Nan’an remains a Hub-level choice because its correct sub-area depends on the whole route."
    },
    {
      id: "heading-027",
      type: "heading",
      level: 2,
      text: "5. Airport and railway stations: the ticket decides"
    },
    {
      id: "chongqing-east-station",
      type: "figure",
      src: "/images/destinations/chongqing/chongqing-east-station-1200.webp",
      alt: "The concourse frontage of Chongqing East railway station.",
      width: 1200,
      height: 750,
      caption: "Chongqing East is a distinct ticketed hub, not another name for North or West."
    },
    {
      id: "paragraph-028",
      type: "paragraph",
      text: "“Chongqing station” is not precise enough. China Railway tickets show an exact station, and services change with national timetables. Search Railway 12306 for the travel date, then calculate hotel-to-station time."
    },
    {
      id: "heading-029",
      type: "heading",
      level: 3,
      text: "Decision table: current major transport hubs"
    },
    {
      id: "table-030",
      type: "table",
      caption: "Decision table: current major transport hubs",
      columns: [
        "Hub",
        "Planning role",
        "Main mistake"
      ],
      rows: [
        [
          "Chongqing Jiangbei International Airport (CKG)",
          "International and domestic gateway north of central Yuzhong",
          "Using an outdated T2 assignment, or treating T3B as a separate landside terminal"
        ],
        [
          "Chongqing North",
          "Largest established rail hub with broad regional and long-distance service",
          "Going to Chongqing West"
        ],
        [
          "Chongqing West",
          "Major west-side long-distance and high-speed hub",
          "Underestimating the transfer from Jiefangbei"
        ],
        [
          "Shapingba",
          "Smaller urban station with important Chengdu-corridor services",
          "Assuming every Chengdu train uses it"
        ],
        [
          "Chongqing East",
          "New Nan’an/Chayuan hub for the southeast corridor and selected intercity services",
          "Omitting it from an old guide or assuming future metro lines are open"
        ]
      ]
    },
    {
      id: "heading-031",
      type: "heading",
      level: 3,
      text: "CKG airport"
    },
    {
      id: "paragraph-032",
      type: "paragraph",
      text: "Since 23 December 2025, CKG's scheduled domestic, international and regional passenger flights have used the T3 system. Passengers should still follow the terminal and gate shown by the airline rather than relying on an older guide. Rail transit serves the airport, but a car can be the better arrival choice with large luggage, a late landing or a difficult hotel last mile. Recheck the airline record before arranging pickup because flight operations remain dynamic."
    },
    {
      id: "heading-033",
      type: "heading",
      level: 3,
      text: "Chongqing North, West, Shapingba and East"
    },
    {
      id: "paragraph-034",
      type: "paragraph",
      text: "Do not choose a station first and then search for a train. Search the route and date, compare viable departures, and calculate the full transfer. Chongqing North and West handle the greatest volume; Shapingba can be excellent for a matching Chengdu train; Chongqing East is essential for the southeast corridor and appears in the 2026 timetable with services involving Wulong South, Qianjiang and Zhangjiajie West."
    },
    {
      id: "paragraph-035",
      type: "paragraph",
      text: "A proper handoff includes the Chinese station name, train number, confirmed entrance information and planned hotel departure time. “Go to Chongqing railway station” is not enough. Chongqing Station at Caiyuanba is still under reconstruction in 2026 and is not a current passenger alternative; the nearby Chongqing Bus Station is a separate facility."
    },
    {
      id: "heading-036",
      type: "heading",
      level: 2,
      text: "6. How the main urban clusters relate"
    },
    {
      id: "liziba-geography",
      type: "figure",
      src: "/images/destinations/chongqing/liziba-1200.webp",
      alt: "Layered roads, rail infrastructure and riverbank terrain near Liziba in Chongqing.",
      width: 1200,
      height: 800,
      caption: "Liziba belongs to a westward cluster, not the central-peninsula walking route."
    },
    {
      id: "heading-037",
      type: "heading",
      level: 3,
      text: "Jiefangbei–Hongyadong–Chaotianmen"
    },
    {
      id: "paragraph-038",
      type: "paragraph",
      text: "These belong to the same broad central cluster but not one flat promenade. Jiefangbei is the commercial centre; Hongyadong occupies a steep river-edge structure with entrances at different levels; Chaotianmen lies toward the peninsula tip and confluence. Group them by direction and level, not social-media order. One coherent pass and one evening perspective are enough; there is no need to return to Hongyadong several times."
    },
    {
      id: "heading-039",
      type: "heading",
      level: 3,
      text: "Shibati and the Mountain City Trail"
    },
    {
      id: "paragraph-040",
      type: "paragraph",
      text: "These areas help explain older slope-based urban form and are best when the route itself is visible. They add stairs, uneven surfaces and exposure to heat or rain. Choose one coherent uphill or downhill logic after checking entrances; do not join disconnected pins and call it a walk."
    },
    {
      id: "heading-041",
      type: "heading",
      level: 3,
      text: "Nan’an and Nanshan"
    },
    {
      id: "paragraph-042",
      type: "paragraph",
      text: "The south bank gives the “looking back at Yuzhong” perspective. Nanbin Road, Danzishi, Nanping and Nanshan sit at different levels. Nanshan is not simply the upper floor of the riverside; a viewpoint may require a separate road journey. Choose it when the view justifies the crossing and return."
    },
    {
      id: "heading-043",
      type: "heading",
      level: 3,
      text: "Liziba and other cross-district points"
    },
    {
      id: "paragraph-044",
      type: "paragraph",
      text: "Liziba is a useful example of rail integrated with a building, but it is not part of the central peninsula walk. Combine it with another westward task or treat it as a short transit stop. Current works and exit closures must be checked. Ciqikou, the zoo and Guanyinqiao also belong to separate clusters; adding all of them creates a transport day."
    },
    {
      id: "heading-045",
      type: "heading",
      level: 2,
      text: "7. Food, night views and performance context"
    },
    {
      id: "paragraph-046",
      type: "paragraph",
      text: "Plan food as a neighbourhood meal near the hotel, a reserved destination meal, or a flexible evening—not one compulsory “hotpot stop.” Keep one meal uncommitted so the day can respond to energy and weather."
    },
    {
      id: "paragraph-047",
      type: "paragraph",
      text: "Night views are strongest after daylight has explained the rivers and banks. One river-level view, one higher view or one seated cruise can be enough. Sightseeing boats, small ferries and themed sailings use different piers and schedules; verify the exact product and boarding point."
    },
    {
      id: "paragraph-048",
      type: "paragraph",
      text: "Sichuan opera belongs to the wider Sichuan–Chongqing cultural region, but “face changing” is not a complete performance description. Use Sichuan Opera and Face Changing, with Context (sichuan-opera-face-changing-with-context) to choose a named programme and recheck venue, cast, running order, surtitles and photography rules."
    },
    {
      id: "heading-049",
      type: "heading",
      level: 2,
      text: "8. Wulong and Dazu are not downtown attractions"
    },
    {
      id: "wulong-landscape",
      type: "figure",
      src: "/images/destinations/chongqing/wulong-1200.webp",
      alt: "Natural bridges in Wulong Karst, Chongqing Municipality.",
      width: 1200,
      height: 800,
      caption: "Wulong is a separate landscape day with local transfer, walking and weather exposure."
    },
    {
      id: "dazu-heritage",
      type: "figure",
      src: "/images/destinations/chongqing/dazu-1200.webp",
      alt: "Rock carvings at Baodingshan in Dazu, Chongqing Municipality.",
      width: 1200,
      height: 800,
      caption: "Dazu is a dedicated heritage excursion, not a downtown Chongqing attraction."
    },
    {
      id: "paragraph-050",
      type: "paragraph",
      text: "Both are inside Chongqing Municipality. That administrative fact does not make them central-city sights."
    },
    {
      id: "heading-051",
      type: "heading",
      level: 3,
      text: "Decision table: Wulong or Dazu?"
    },
    {
      id: "table-052",
      type: "table",
      caption: "Decision table: Wulong or Dazu?",
      columns: [
        "Decision",
        "Wulong",
        "Dazu"
      ],
      rows: [
        [
          "Main reason",
          "Karst landscape, natural bridges, gorges, caves and mountain environment",
          "Rock carvings, religious art, history and conservation"
        ],
        [
          "Best traveller",
          "Nature-first and comfortable with a long, weather-sensitive day",
          "Culture-first and willing to dedicate a road day"
        ],
        [
          "Day trip",
          "Possible with an early, coordinated rail/road and local-transfer plan",
          "Possible by road with a defined site sequence"
        ],
        [
          "Overnight",
          "Better for multiple sites, slower pace or weather resilience",
          "Optional when combining several carving groups"
        ],
        [
          "Physical demand",
          "Shuttles, steps, gradients and weather exposure vary",
          "Walking and steps still matter but the day is less landscape-intensive"
        ],
        [
          "Skip when",
          "Only two full city days and Chongqing itself is the priority",
          "Heritage is not a priority or the road day removes the only relaxed city day"
        ]
      ]
    },
    {
      id: "paragraph-053",
      type: "paragraph",
      text: "A ticket to Wulong South is not a ticket to the natural-bridges entrance. Decide which sites you want, then build the station transfer, visitor centre, internal transport and walking around them. The specialist owner China Tiankeng and Sinkholes Explained (china-tiankeng-sinkholes-explained) owns the geology; this Hub owns whether Wulong deserves a day or overnight."
    },
    {
      id: "paragraph-054",
      type: "paragraph",
      text: "Plan Dazu around specific carvings. Baodingshan is the usual first priority; adding Beishan or other groups changes transport and visiting time. Check current protection work, events and opening arrangements before travel."
    },
    {
      id: "heading-055",
      type: "heading",
      level: 2,
      text: "9. Two stamina and luggage scenarios"
    },
    {
      id: "heading-056",
      type: "heading",
      level: 3,
      text: "Scenario A: arriving with two large suitcases"
    },
    {
      id: "paragraph-057",
      type: "paragraph",
      text: "You arrive at Chongqing West and your hotel is near Jiefangbei. The final approach includes traffic, a building podium and an entrance different from the first map pin."
    },
    {
      id: "paragraph-058",
      type: "paragraph",
      text: "Better plan: book a car to the exact hotel vehicle entrance, send the Chinese property name and ask which level contains reception. Keep the first evening within the hotel’s real walking radius. Do not test a multi-level shortcut with luggage."
    },
    {
      id: "heading-059",
      type: "heading",
      level: 3,
      text: "Scenario B: older parent, young child or low-energy day"
    },
    {
      id: "paragraph-060",
      type: "paragraph",
      text: "The list contains Shibati, the Mountain City Trail, Liziba, Ciqikou, Hongyadong and Nanshan in one day. Each is possible; together they require repeated level changes, transfers and evening crowd tolerance."
    },
    {
      id: "paragraph-061",
      type: "paragraph",
      text: "Better plan: keep one bank and one main level for each half-day. Use a car between clusters, protect a seated lunch and rest, and choose either a south-bank view or a river cruise. Recheck lifts, escalators, rail exits and boarding steps. One working facility does not make the whole route step-free."
    },
    {
      id: "heading-062",
      type: "heading",
      level: 2,
      text: "10. Where Chongqing goes next"
    },
    {
      id: "heading-063",
      type: "heading",
      level: 3,
      text: "Decision table: onward routes"
    },
    {
      id: "table-064",
      type: "table",
      caption: "Decision table: onward routes",
      columns: [
        "Next stop",
        "Chongqing’s role",
        "Planning rule"
      ],
      rows: [
        [
          "Chengdu",
          "Natural two-city pair with frequent rail options",
          "Compare exact stations and hotel-to-hotel time; divide nights by interests"
        ],
        [
          "Zhangjiajie",
          "Southeast-to-Wuling transition; selected direct services now use Chongqing East",
          "Check the exact 12306 train and keep a full transfer block"
        ],
        [
          "Furong Town",
          "Continuation within a wider western-Hunan route",
          "Treat it as a new overnight base, usually coordinated with Zhangjiajie"
        ],
        [
          "Fenghuang",
          "Further western-Hunan base with its own station-to-old-town transfer",
          "Do not plan around the unbuilt Qianjiang–Jishou railway"
        ],
        [
          "Yangtze cruise",
          "Upstream embarkation city for the main Chongqing–Yichang route",
          "Confirm operator, ship, assigned pier and boarding time"
        ]
      ]
    },
    {
      id: "paragraph-065",
      type: "paragraph",
      text: "For Chengdu, three nights in each city is a balanced starting point. Give Chongqing the extra night for Wulong, Dazu or a cruise; give Chengdu the extra night for pandas and Sichuan excursions."
    },
    {
      id: "paragraph-066",
      type: "paragraph",
      text: "The 2026 timetable established selected Zhangjiajie West–Chongqing East service, but diagrams are changing quickly. Search the exact date. Furong Town and Fenghuang normally sit after Zhangjiajie in a west-Hunan sequence or require another verified connection; they are not Chongqing side trips."
    },
    {
      id: "paragraph-067",
      type: "paragraph",
      text: "Place at least one Chongqing night before a Yangtze cruise when arriving by international flight or a long train. This protects the ship and gives time to receive final pier instructions. The purchased product—not a generic map pin—decides the route."
    },
    {
      id: "heading-068",
      type: "heading",
      level: 2,
      text: "11. Current planning articles and next steps"
    },
    {
      id: "paragraph-069",
      type: "paragraph",
      text: "The broad Chongqing decision belongs to this destination Hub. Specialist depth remains with five published owners:"
    },
    {
      id: "list-070",
      type: "list",
      ordered: false,
      items: [
        "Chongqing Upper and Lower City Orientation — bank, level, entrance, connection and vertical-access logic.",
        "Where to Stay in Chongqing: Jiefangbei, Guanyinqiao or Shapingba — full three-base comparison and property checks.",
        "China Tiankeng and Sinkholes Explained — geological terminology and managed-access boundaries.",
        "Sichuan Opera and Face Changing, with Context — performance choice and cultural reading.",
        "Which Chongqing Railway Station Should You Use? — dated route, ticketed station, hotel transfer and wrong-station prevention."
      ]
    },
    {
      id: "paragraph-071",
      type: "paragraph",
      text: "All five specialist URLs were verified live on 21 August 2026. Use their links below when the city-level decision becomes a station, accommodation, geology, performance or vertical-route task."
    },
    {
      id: "heading-072",
      type: "heading",
      level: 2,
      text: "Frequently asked questions"
    },
    {
      id: "heading-073",
      type: "heading",
      level: 3,
      text: "How many nights does Chongqing need?"
    },
    {
      id: "paragraph-074",
      type: "paragraph",
      text: "Three nights is the practical minimum for most first visits because it usually protects two full urban days. Two nights works for one concentrated day. Add at least one night for Wulong or Dazu."
    },
    {
      id: "heading-075",
      type: "heading",
      level: 3,
      text: "Should I stay in Jiefangbei or Guanyinqiao?"
    },
    {
      id: "paragraph-076",
      type: "paragraph",
      text: "Choose Jiefangbei when central Yuzhong dominates. Choose Guanyinqiao for modern neighbourhood life, late dining and northern access. Check the exact hotel entrance in either area."
    },
    {
      id: "heading-077",
      type: "heading",
      level: 3,
      text: "Which Chongqing railway station should I use?"
    },
    {
      id: "paragraph-078",
      type: "paragraph",
      text: "Use the station printed on the selected ticket. Chongqing North, West, Shapingba and East are separate hubs. Search Railway 12306 for your date before planning the transfer."
    },
    {
      id: "heading-079",
      type: "heading",
      level: 3,
      text: "Why does the map show two places as close when the walk is long?"
    },
    {
      id: "paragraph-080",
      type: "paragraph",
      text: "The map may hide a river crossing, steep bank, stacked road, entrance on another level or closed connector. Check bank, level, entrance and connection; never convert straight-line distance into a promised walk time."
    },
    {
      id: "heading-081",
      type: "heading",
      level: 3,
      text: "With only two full days, should I go to Wulong?"
    },
    {
      id: "paragraph-082",
      type: "paragraph",
      text: "Usually not on a first visit. Wulong would consume one day and leave only one for the city. Choose it only when karst landscape is the main reason for coming."
    },
    {
      id: "heading-083",
      type: "heading",
      level: 3,
      text: "Wulong or Dazu?"
    },
    {
      id: "paragraph-084",
      type: "paragraph",
      text: "Choose Wulong for major natural landscape and a weather-sensitive operational day. Choose Dazu for sculpture, religious art and cultural heritage. Neither is downtown; both need a dedicated day."
    },
    {
      id: "heading-085",
      type: "heading",
      level: 3,
      text: "How should older travellers, children or heavy luggage change the plan?"
    },
    {
      id: "paragraph-086",
      type: "paragraph",
      text: "Reduce clusters, use vehicles for level changes, verify entrances and protect seated breaks. Take luggage to the vehicle entrance. Treat step-free access as an end-to-end route question."
    },
    {
      id: "heading-087",
      type: "heading",
      level: 3,
      text: "How should I divide time between Chongqing and Chengdu?"
    },
    {
      id: "paragraph-088",
      type: "paragraph",
      text: "Start with three nights each. Add Chongqing time for Wulong, Dazu or a cruise; add Chengdu time for pandas and Sichuan excursions. The rail ride is only one part of the transfer day."
    },
    {
      id: "heading-089",
      type: "heading",
      level: 3,
      text: "Can I board a Yangtze cruise at Chaotianmen?"
    },
    {
      id: "paragraph-090",
      type: "paragraph",
      text: "Many sailings use the central riverfront, but the assigned pier or even embarkation city can vary by operator, vessel, route and operating conditions. Follow the final written boarding notice."
    },
    {
      id: "heading-091",
      type: "heading",
      level: 2,
      text: "Final planning rule"
    },
    {
      id: "paragraph-092",
      type: "paragraph",
      text: "Chongqing becomes manageable when every day answers four questions: which bank, which level, which entrance and which connection? Once those are clear, the city becomes a route you can actually use."
    },
    {
      id: "canonical-owner-links",
      type: "internal-links",
      title: "Use the narrower owner when the decision becomes executable",
      items: [
        {
          label: "Read Chongqing's banks and levels",
          href: "/guides/chongqing-upper-lower-city-orientation/",
          description: "Use the bank–level–entrance–connection method before attempting a walking route."
        },
        {
          label: "Choose a Chongqing accommodation base",
          href: "/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/",
          description: "Compare Jiefangbei, Guanyinqiao and Shapingba, then verify the exact property entrance."
        },
        {
          label: "Understand Wulong's tiankeng landscape",
          href: "/guides/china-tiankeng-sinkholes-explained/",
          description: "Keep geology and managed-access detail with the specialist owner."
        },
        {
          label: "Choose Sichuan opera with context",
          href: "/guides/sichuan-opera-face-changing-with-context/",
          description: "Compare a named programme instead of treating face changing as the whole art form."
        },
        {
          label: "Choose the correct Chongqing railway station",
          href: "/guides/chongqing-railway-station-selector/",
          description: "Match the dated ticket, hotel and onward corridor across North, West, Shapingba and East."
        }
      ]
    },
    {
      id: "stay-owner-links",
      type: "internal-links",
      title: "Finish the property decision with the nationwide stay owners",
      items: [
        {
          label: "Test whether ‘near the metro’ is useful",
          href: "/guides/china-hotel-near-metro/",
          description: "Verify the exact exit and complete route to the lobby."
        },
        {
          label: "Verify an actually usable accessible room",
          href: "/guides/china-accessible-hotel-room-verification/",
          description: "Check the complete arrival-to-room route before paying."
        },
        {
          label: "Can foreigners stay at any hotel in China?",
          href: "/guides/foreigners-china-hotel/",
          description: "Separate the legal rule, platform display and the property's current operation."
        },
        {
          label: "Plan the last night before an international flight",
          href: "/guides/china-last-night-before-international-flight/",
          description: "Work backwards from the named CKG terminal and check-in requirement."
        }
      ]
    },
    {
      id: "stay-quote-handoff",
      type: "callout",
      title: "Ask for a human Chongqing property-fit check",
      body: "Use the general planner only for a first contact. In the initial form, share travel dates, the city or areas being compared, traveller and room counts, and an approximate accommodation budget if useful. You may say that you want to discuss family or accessibility arrangements later, but do not submit children's ages, mobility, medical or accessibility details, passport or other document information, booking or payment records, or identifiable material intended for a hotel, DMC or other supplier. A planner can arrange a separate human follow-up; those details are discussed only when appropriate and with suitable consent. Nothing is shared with a supplier without separate, purpose-specific consent. This is not live inventory, and Homeground cannot guarantee price, cannot guarantee availability, cannot guarantee foreign-guest acceptance, cannot guarantee room type and cannot guarantee accessibility.",
      tone: "decision"
    },
    {
      id: "planning-links",
      type: "internal-links",
      title: "Turn the Chongqing choice into a whole route",
      items: [
        {
          label: "Check whether the itinerary is too rushed",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description: "Count station access, luggage, vertical movement and the cost of another hotel move."
        },
        {
          label: "Review an existing China itinerary",
          href: "/china-itinerary-review/",
          description: "Bring the current day-by-day route for an evidence-based weak-link review."
        },
        {
          label: "Ask Homeground to plan the complete trip",
          href: "/#planner-contact",
          description: "Use the general trip brief only after the city, dates and main constraints are clear."
        }
      ]
    },
    {
      id: "official-sources",
      type: "sources",
      title: "Official sources and image records",
      items: [
        {
          label: "Chongqing airport passenger-terminal arrangement",
          url: "https://www.cq.gov.cn/ywdt/bmts/202512/t20251222_15262188.html",
          publisher: "Chongqing Municipal Government",
          reviewedAt: "2026-08-21"
        },
        {
          label: "2026 Q3 Chongqing railway timetable roles",
          url: "https://www.cq.gov.cn/ywdt/jrcq/202606/t20260626_15778151.html",
          publisher: "Chongqing Municipal Government",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Chongqing East station Line 6 access",
          url: "https://www.cq.gov.cn/ywdt/bmts/202507/t20250728_14853868.html",
          publisher: "Chongqing Municipal Government",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Chongqing Station passenger-service suspension",
          url: "https://www.cq.gov.cn/ywdt/bmts/202206/t20220615_10817239.html",
          publisher: "Chongqing Municipal Government",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Chongqing Station reconstruction progress",
          url: "https://jtysw.cq.gov.cn/sy_240/jdtp/202607/t20260715_15825144.html",
          publisher: "Chongqing Municipal Commission of Transport",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Liziba works and staged exit closures",
          url: "https://wap.cq.gov.cn/ywdt/jrcq/202606/t20260613_15751500.html",
          publisher: "Chongqing Municipal Government",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Wulong weather-related operating notices",
          url: "https://www.cq.gov.cn/ywdt/bmts/202606/t20260608_15737519.html",
          publisher: "Chongqing Municipal Government",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Wulong Karst official overview",
          url: "https://english.cq.gov.cn/aboutchongqing/culture/NaturalHeritage/202606/t20260612_15751145.html",
          publisher: "Chongqing Municipal Government",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Dazu Rock Carvings official overview",
          url: "https://english.cq.gov.cn/aboutchongqing/travel/5ALevelTouristAttraction/202606/t20260611_15745500.html",
          publisher: "Chongqing Municipal Government",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Chongqing cruise-market operating context",
          url: "https://admin.cq.gov.cn/ywdt/jrcq/202607/t20260712_15816815.html",
          publisher: "Chongqing Municipal Government",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Yuzhong, Chongqing photograph",
          url: "https://commons.wikimedia.org/wiki/File:Yuzhong,_Chongqing.jpg",
          publisher: "Wikimedia Commons / Kingswang192",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Yangtze and Jialing river junction photograph",
          url: "https://commons.wikimedia.org/wiki/File:The_junction_of_Yangtze_River_and_Jialing_River.jpg",
          publisher: "Wikimedia Commons / Tauno Tõhk",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Liziba photograph",
          url: "https://commons.wikimedia.org/wiki/File:201908_Liziba,_Chongqing.jpg",
          publisher: "Wikimedia Commons / MNXANL",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Wulong natural bridges photograph",
          url: "https://commons.wikimedia.org/wiki/File:Wulongtianshengsanqiao.JPG",
          publisher: "Wikimedia Commons / Brookqi",
          reviewedAt: "2026-08-21"
        },
        {
          label: "Dazu Baodingshan photograph",
          url: "https://commons.wikimedia.org/wiki/File:Dazu_rock_carvings_-_Baodingshan,_大足石刻-宝顶山摩崖造像,_Chongqing,_2023_(53563776088).jpg",
          publisher: "Wikimedia Commons / JL Cogburn",
          reviewedAt: "2026-08-21"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
