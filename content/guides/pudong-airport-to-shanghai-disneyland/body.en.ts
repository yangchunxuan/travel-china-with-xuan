import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "decision-lead",
      type: "lead",
      text: "The Airport Link is often the sensible public-transport choice from Pudong Airport to the Shanghai Disney area—but it does not reach the park gate. A direct taxi or correctly booked ride-hailing car is usually easier when children, several large cases, a stroller, a late arrival or an exact hotel door matter more than the lowest fare.",
    },
    {
      id: "quick-answer",
      type: "callout",
      title: "The short answer",
      tone: "decision",
      body: "Choose the Airport Link only when the train and either a usable Bus 50 connection or the required onward hotel connection are still running, and everyone can move every bag through the transfer. Choose a car when the group needs one vehicle to an exact hotel, cannot comfortably manage the station–bus–walk chain, or may leave the arrivals hall too late for rail. For the park, use West Public Transportation Hub as the official taxi destination; for a hotel, save the exact property name and address in Chinese.",
    },
    {
      id: "endpoint-heading",
      type: "heading",
      level: 2,
      text: "Decide the real endpoint before comparing transport",
    },
    {
      id: "endpoint-intro",
      type: "paragraph",
      text: "“Shanghai Disney” can mean the park entrance, one of the two Disney Resort hotels, or one of the independently operated hotels spread across the wider resort area. Those are not interchangeable pins. The option that looks fastest to a station may still leave a bus, hotel shuttle or substantial luggage handoff.",
    },
    {
      id: "endpoint-table",
      type: "table",
      caption: "Start with where the travellers and their bags actually need to arrive",
      columns: ["Actual destination", "Public-transport chain to check", "Car instruction", "Question to confirm"],
      rows: [
        [
          "Shanghai Disneyland, Disneytown or Wishing Star Park",
          "Airport Link to Shanghai International Resort Station; Exit 3; Pudong Bus 50 from Chuanzhan Road / Tanghuang Road to its Disney Metro Station stop beside Metro Line 11's Disney Resort Station; then walk or use the current resort shuttle",
          "For park access, Shanghai Disney directs taxis to West Public Transportation Hub; follow current ride-hailing app and on-site instructions",
          "Where will the bags be stored before park security?",
        ],
        [
          "Shanghai Disneyland Hotel",
          "Complete the Airport Link and Bus 50 chain, then verify the hotel's current West Hub, shuttle or water-transport boarding point",
          "Use the exact hotel name and Chinese address, not a generic Disneyland pin",
          "Is the hotel's luggage service available at the planned arrival time?",
        ],
        [
          "Toy Story Hotel",
          "Complete the Airport Link and Bus 50 chain, then use the hotel's current resort shuttle instructions",
          "Use the exact hotel name and Chinese address",
          "Where is the current hotel shuttle stop and when does it operate?",
        ],
        [
          "An off-site “Disney-area” hotel",
          "Do not assume Bus 50 or a Disney shuttle serves it; route to the property's exact entrance",
          "Save the property's Chinese name, address and front-desk number",
          "Does its written shuttle policy cover the airport, a station or only the park—and can it carry the luggage?",
        ],
      ],
    },
    {
      id: "station-trap",
      type: "callout",
      title: "Two similar station names are not the same place",
      tone: "warning",
      body: "Shanghai International Resort Station (上海国际旅游度假区站) is the Airport Link station serving the wider resort area. Disney Resort Station (迪士尼站) is the Metro Line 11 station beside the park area. Shanghai Disney's English rail page also renders the first name as “International Tourist Resort Station.” A search result that says the Airport Link is one stop from PVG has not yet described the bus and final walk to the park.",
    },
    {
      id: "station-figure",
      type: "figure",
      src: "/images/guides/pudong-airport-to-shanghai-disneyland/airport-link-exit-3-1440.webp",
      alt: "Exit 3 of Shanghai International Resort Station, with the station name and exit number visible.",
      width: 1440,
      height: 960,
      caption: "This is Exit 3 of Shanghai International Resort Station; the current Pudong Bus 50 stop still needs a live check. Photo: Kmchang28/Wikimedia Commons, CC BY-SA 4.0; cropped.",
    },
    {
      id: "airport-link-heading",
      type: "heading",
      level: 2,
      text: "How the Airport Link route works",
    },
    {
      id: "airport-link-steps",
      type: "list",
      ordered: true,
      items: [
        "At Pudong Airport T1 & T2 Station, follow signs for the Shanghai Suburban Railway Airport Link—not the Maglev or Metro Line 2.",
        "Take the Airport Link one stop toward Hongqiao to Shanghai International Resort Station (上海国际旅游度假区站). Check the live platform display: Airport Link trains can use four- or eight-car formations, so the part of the platform where the screen doors open can differ.",
        "Leave through Exit 3. Shanghai Disney's current rail instructions direct passengers to the Pudong Bus 50 stop at Chuanzhan Road / Tanghuang Road (川展路唐黄路).",
        "Take Pudong Bus 50 to its Disney Metro Station stop (迪士尼地铁站), beside Metro Line 11's Disney Resort Station (迪士尼站). Recheck the bus stop, direction, first and last service on the travel day.",
        "From the Disney Resort Station area, walk to Shanghai Disneyland, Disneytown or Wishing Star Park, or use Resort Shuttle Bus No. 1 or No. 2 as currently directed. Hotel guests should verify their hotel's separate shuttle pickup point.",
      ],
    },
    {
      id: "airport-link-snapshot",
      type: "callout",
      title: "A dated service snapshot, not a connection guarantee",
      tone: "neutral",
      body: "The Shanghai municipal Airport Link page reviewed August 11, 2026 lists service at roughly 15-minute intervals, Pudong Airport departures from 06:00 and a final departure at 22:15. Shanghai Disney's rail page still displayed 22:00 at review, so use the newer operator or municipal timetable and check it live before relying on either cutoff. The final train is not held for a late flight; immigration, baggage delivery, the terminal walk, ticketing and the Bus 50 connection all sit outside the aircraft's scheduled arrival time.",
    },
    {
      id: "mode-comparison",
      type: "comparison",
      title: "Airport Link or car: choose by handoffs, not only ride time",
      columns: [
        {
          heading: "Airport Link + Bus 50",
          body: "A predictable rail first leg followed by a street-level bus transfer and final walk or resort transfer.",
          items: [
            "Usually the first option to compare in daytime",
            "The rail leg does not depend on road traffic; Bus 50 and the final transfer still can",
            "Requires the group to manage every case through station, exit, bus and final handoff",
            "The fare, bus hours and waiting time must be checked for the date",
          ],
        },
        {
          heading: "Taxi or ride-hailing car",
          body: "One road journey to a precisely chosen park hub or hotel entrance, subject to traffic and pickup rules.",
          items: [
            "Often simpler with small children, older parents, a stroller or several large cases",
            "Shanghai Disney's current estimate from PVG to the resort area is about 30–50 minutes by taxi, not a promise for every hotel or entrance",
            "Choose a vehicle category that actually fits every passenger and bag",
            "Use the signed taxi rank or the airport's current designated ride-hailing pickup area",
          ],
        },
      ],
    },
    {
      id: "maglev-warning",
      type: "callout",
      title: "The Maglev is not the default luggage route to Disney",
      tone: "warning",
      body: "Many search results still lead with the Maglev to Longyang Road and then stack metro transfers toward Line 11. It can be interesting as a rail experience, but it is not a direct Disney service. From PVG, compare the newer one-stop Airport Link first; add the Bus 50 and final walk before deciding whether it beats a car for this group.",
    },
    {
      id: "luggage-heading",
      type: "heading",
      level: 2,
      text: "Plan the suitcase handoff before planning a park day",
    },
    {
      id: "luggage-intro",
      type: "paragraph",
      text: "The difficult part is rarely placing a suitcase on the Airport Link. It is moving the same suitcase off the train, through Exit 3, onto a public bus, off again and toward the park or hotel while keeping children and documents together. Pudong Bus 50 is a city bus; do not plan on guaranteed luggage racks, reserved seats or help loading bags unless the operator confirms otherwise.",
    },
    {
      id: "luggage-table",
      type: "table",
      caption: "What the current official rules mean for an airport-to-park day",
      columns: ["Stage", "Official snapshot reviewed August 11, 2026", "Planning consequence"],
      rows: [
        [
          "Airport Link",
          "Each item must be under 23 kg, no more than 0.2 m³, and no more than 1.8 m when length, width and height are added; trains provide luggage racks",
          "Confirm unusual or oversized items before travel; keep valuables and documents with you",
        ],
        [
          "Shanghai Disneyland security",
          "Wheeled luggage is prohibited, as are bags, boxes or containers larger than 56 × 36 × 23 cm",
          "Do not take airport suitcases to the security queue expecting to carry them inside",
        ],
        [
          "Park luggage storage",
          "The official facility is opposite the West Gate of Wishing Star Park; the current page lists RMB 80 per ordinary item per day and RMB 10 for a small item whose three dimensions total no more than 60 cm",
          "Recheck price and hours, then allow time to store and collect each item",
        ],
        [
          "Disney resort hotel guest",
          "The current luggage page describes delivery between park luggage storage and a Shanghai Disney resort hotel for hotel guests",
          "Confirm eligibility, cutoff and collection point with the hotel; this is not an airport baggage-transfer promise",
        ],
      ],
    },
    {
      id: "luggage-warning",
      type: "callout",
      title: "Hotel shuttle does not automatically mean airport pickup",
      tone: "neutral",
      body: "Shanghai Disney publishes resort-area transport for its hotels. An off-site property's “Disney shuttle” may run only between that hotel and the park, at fixed times, and may limit large baggage. Ask for the exact stop, hours, reservation rule and luggage capacity in writing; do not infer airport service from the word shuttle.",
    },
    {
      id: "traveller-comparison",
      type: "comparison",
      title: "Let the least mobile traveller break the tie",
      columns: [
        {
          heading: "First trip to China",
          items: [
            "Save both station names and the final destination in Chinese",
            "Prefer fewer undocumented handoffs over a route that is only cheaper on paper",
            "Keep passports, booking and hotel phone number available offline",
          ],
        },
        {
          heading: "Family with children",
          items: [
            "Count adults' free hands after luggage, stroller and child are assigned",
            "Book a vehicle size that fits the whole party; a standard car is not guaranteed to fit four people plus four large cases",
            "Choose storage before reaching park security",
          ],
        },
        {
          heading: "Older parents or limited mobility",
          items: [
            "Treat the bus boarding, standing wait and final walk as part of the route",
            "Use a direct car if the slowest traveller cannot complete the chain comfortably",
            "Request any airport or hotel assistance from the responsible operator in advance",
          ],
        },
      ],
    },
    {
      id: "late-heading",
      type: "heading",
      level: 2,
      text: "A late flight changes the answer before the aircraft lands",
    },
    {
      id: "late-copy",
      type: "paragraph",
      text: "Do not compare the published landing time with the Airport Link's last departure. Compare the time the last traveller is likely to reach the ground-transport concourse after immigration where applicable, baggage claim and any delay. Even catching the train does not guarantee a useful Bus 50 or hotel shuttle connection at the other end.",
    },
    {
      id: "late-checklist",
      type: "list",
      items: [
        "Check the live final Airport Link and Bus 50 services for the travel date.",
        "Save the correct terminal pickup instructions and the exact hotel or West Public Transportation Hub pin before flying.",
        "If using ride-hailing, confirm the airport's current pickup level and vehicle capacity in the app after landing.",
        "Tell the hotel about a late arrival and ask whether reception and any promised shuttle will still operate.",
        "Keep a road-transfer fallback that does not depend on a driver contacting a phone without roaming or data.",
      ],
    },
    {
      id: "return-heading",
      type: "heading",
      level: 2,
      text: "For the return to PVG, reverse the whole chain—not just the train",
    },
    {
      id: "return-copy",
      type: "paragraph",
      text: "The Airport Link makes the resort-to-airport rail leg simple once the group is at Shanghai International Resort Station, but the park is still not that station. Add luggage collection, movement to Disney Resort Metro Station, Pudong Bus 50, the walk into the Airport Link station and a margin for the next train. Check the live airport terminal and airline deadline separately; a short rail leg cannot rescue a late park departure.",
    },
    {
      id: "verify-heading",
      type: "heading",
      level: 2,
      text: "Recheck these facts on the travel date",
    },
    {
      id: "verification-list",
      type: "list",
      ordered: true,
      items: [
        "Arrival terminal and the realistic time the party will leave the arrivals hall",
        "Airport Link first and last train, frequency, live platform and segment fare",
        "Pudong Bus 50 stop, direction, first and last service and any operating notice",
        "The exact park hub, Disney hotel or off-site hotel entrance in Chinese",
        "Taxi rank or ride-hailing pickup area and a vehicle category large enough for the group",
        "Park opening, luggage-storage hours, prices and prohibited-item rules",
        "Disney hotel or off-site hotel shuttle stop, reservation rule, luggage capacity and final departure",
        "Return-flight terminal, check-in deadline and the time needed to collect stored luggage",
      ],
    },
    {
      id: "fact-check-box",
      type: "callout",
      title: "Dynamic transport facts reviewed August 11, 2026",
      tone: "neutral",
      body: "At this review, the Airport Link served PVG T1 & T2 and Shanghai International Resort Station as adjacent stops; the municipal page listed roughly 15-minute service and a 22:15 final departure from PVG; Shanghai Disney instructed Airport Link users to take Exit 3 and Pudong Bus 50 to its Disney Metro Station stop beside Metro Line 11's Disney Resort Station; and taxis serving the park used West Public Transportation Hub. The Disney rail page still showed 22:00, so the newer operator or municipal timetable takes priority. Timetables, fares, exits, bus stops, pickup areas, storage prices, park rules and hotel shuttles remain live checks. The 22:15 time applies to the published PVG Airport Link departure, not to a flight, bus connection or hotel transfer.",
    },
    {
      id: "help-callout",
      type: "callout",
      title: "Need a human check on the handoffs?",
      tone: "decision",
      body: "Send the travel date, flight and terminal, number and ages of travellers, suitcase and stroller count, exact hotel or park plan, and approximate transfer budget. Homeground can flag which handoffs need checking; live transport still needs a date-specific recheck.",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning the arrival day",
      items: [
        {
          label: "Check whether the wider China itinerary is too rushed",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description: "Count airport, hotel, luggage and park handoffs as real travel time.",
        },
        {
          label: "Plan China with older parents",
          href: "/guides/china-itinerary-with-older-parents/",
          description: "Build the transfer around walking tolerance and recovery time.",
        },
        {
          label: "Check a 240-hour visa-free transit route",
          href: "/guides/china-240-hour-visa-free-transit-route-check/",
          description: "Airport transport and permission to enter China are separate decisions.",
        },
        {
          label: "Decide where human help is actually useful",
          href: "/guides/do-you-need-a-tour-guide-in-china/",
          description: "Use local support at the difficult handoffs instead of adding it everywhere.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources, image credits and review record",
      items: [
        {
          label: "Shanghai Airport Link stations, service pattern, baggage limits and April 2026 hours",
          url: "https://english.shanghai.gov.cn/en-Transportation/20241231/f66f14bbd4b549ab88e6f3aec375790c.html",
          publisher: "Shanghai Municipal People's Government",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Pudong Airport's official Airport Link operating hours and frequency",
          url: "https://www.shairport.com/pudong/syt/index.html",
          publisher: "Shanghai Airport Authority",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Official Pudong Airport taxi-stand locations and current taxi information",
          url: "https://www.shairport.com/pudong/czc/index.html",
          publisher: "Shanghai Airport Authority",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Shanghai Disney travel information for airport, taxi hubs and resort hotels",
          url: "https://www.shanghaidisneyresort.com/en/experience/guest-service/travel-information",
          publisher: "Shanghai Disney Resort",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Shanghai Disney Airport Link, Exit 3 and Pudong Bus 50 instructions",
          url: "https://www.shanghaidisneyresort.com/en/experience/guest-service/rail",
          publisher: "Shanghai Disney Resort",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Shanghai Disney luggage-storage locations, prices and hotel delivery service",
          url: "https://www.shanghaidisneyresort.com/en/experience/guest-service/luggage-storage",
          publisher: "Shanghai Disney Resort",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Shanghai Disneyland park rules for luggage and prohibited items",
          url: "https://www.shanghaidisneyresort.com/en/announcement/park-rules",
          publisher: "Shanghai Disney Resort",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Hero image: Shanghai International Resort Station platform by Kmchang28, CC BY-SA 4.0; cropped and converted to WebP",
          url: "https://commons.wikimedia.org/wiki/File:The_Platform_of_Shanghai_International_Resort_Station_in_Shanghai_2024.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Body image: Shanghai International Resort Station Exit 3 by Kmchang28, CC BY-SA 4.0; cropped and converted to WebP",
          url: "https://commons.wikimedia.org/wiki/File:Exit_3_of_Shanghai_International_Resort_Station_in_Shanghai_2024.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-11",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
