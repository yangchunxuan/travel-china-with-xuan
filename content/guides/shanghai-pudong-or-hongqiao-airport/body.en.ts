import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuidePeakRate, bodyGuideRate, bodyReservationFee, bodyReservationLeadDays, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const shszTour = "shanghai-suzhou-5-day-private-tour";
const shszhzTour = "shanghai-suzhou-hangzhou-6-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "decision-lead",
      type: "lead",
      text: "PVG and SHA are two different airports, about 40 km apart. Hongqiao (SHA) is the closer one: about 13 km west of the city centre, roughly 30 minutes and CNY 100–150 by taxi, and right beside Shanghai Hongqiao Railway Station. Pudong (PVG) is about 30 km east: roughly 50 minutes and CNY 180 by taxi to People's Square, or about an hour on Metro Line 2. Most long-haul international flights use PVG; SHA mainly handles domestic and regional East Asian flights. So when both airports offer a flight that works, SHA is usually the easier airport for central and western Shanghai and the bullet train, and PVG for Lujiazui, eastern Pudong and Disney. Between the two, the Airport Link train takes about 40 minutes and stops around 22:00 (Shanghai government transport guides).",
    },
    {
      id: "quick-answer",
      type: "callout",
      title: "The short answer",
      tone: "decision",
      body: "Let the flight decide first: if the nonstop, the single-ticket connection or the fare you want only exists at one airport, book that airport. If both work, pick SHA for central and western Shanghai or a train from Shanghai Hongqiao, and PVG for Lujiazui, eastern Pudong, most long-haul flights and Disney. Then add the terminal walk, last-train times, luggage and a buffer before you pay.",
    },
    {
      id: "scope-callout",
      type: "callout",
      title: "Compare the ground transfer before booking",
      tone: "neutral",
      body: "Compare each workable flight together with the transfer to your hotel, railway station or Disney-area destination before booking.",
    },
    {
      id: "flight-heading",
      type: "heading",
      level: 2,
      text: "First check: does your flight leave you a choice?",
    },
    {
      id: "flight-checklist",
      type: "list",
      ordered: true,
      items: [
        "Search the exact city pair and travel date, then write down the airport code and terminal for every workable flight.",
        "Compare the schedule, fare conditions, baggage, number of stops and connection protection before valuing ground convenience.",
        "If one option changes airports in Shanghai, label it as a landside transfer—not a normal same-terminal connection.",
        "If both PVG and SHA remain workable, add the full airport-to-hotel, hotel-to-airport or airport-to-railway journey.",
        "Reject a geographically attractive airport when its flight timing creates an unusable arrival, early departure or fragile separate-ticket connection.",
      ],
    },
    {
      id: "airport-code-warning",
      type: "callout",
      title: "Read the code, terminal and transport system together",
      tone: "warning",
      body: "PVG is Shanghai Pudong International Airport / 上海浦东国际机场. SHA is Shanghai Hongqiao International Airport / 上海虹桥国际机场. Shanghai Hongqiao Railway Station / 上海虹桥站 is not airport code SHA, and Hongqiao Airport Terminal 1, Terminal 2 and the railway station are different endpoints inside the wider Hongqiao area. Do not shorten any of them to ‘Hongqiao’ in a timed transfer.",
    },
    {
      id: "traps-heading",
      type: "heading",
      level: 2,
      text: "Eight Shanghai airport traps travellers only meet on the day",
    },
    {
      id: "traps-list",
      type: "list",
      ordered: true,
      items: [
        "PVG and SHA are not one airport with two names. Moving between them is a landside trip across Shanghai, on the Airport Link (about 40 minutes on the train alone), Metro Line 2 or the road. A ticket that lands at one and leaves from the other is a self-made connection.",
        "“Hongqiao” is three places. Terminal 1 is on Metro Line 10 only; Terminal 2 has Lines 2 and 10 and the Airport Link; Shanghai Hongqiao Railway Station is reached from Terminal 2 by a signed corridor. A T1 flight does not get T2's rail convenience.",
        "The Airport Link stops early. Under the April 2026 operating plan the last train leaves PVG at 22:15 and Hongqiao T2 at 22:00, every 15 minutes. Land at PVG at 21:30 and immigration, baggage and the terminal walk can leave you on the platform after the last train.",
        "Changing airports on 24-hour visa-free transit means a border step. Shanghai's immigration guidance says a transit passenger who leaves the transit area to move between PVG and SHA must apply for a temporary entry permit at border inspection.",
        "Holiday peaks are policed. In the 2025 Spring Festival return peak, Shanghai's two airports handled more than 404,000 passengers on 2 February alone, a record. Police steered rail arrivals through the corridor to Terminal 2, held metro passengers in the concourse at the Hongqiao T2 station with one-way flow, and said the hub's underground car park would be flow-limited when it jammed (Shanghai government, source: Shanghai police, 7 February 2025).",
        "A missed train after a late flight costs money. Under China Railway's rules, refunding a ticket less than 24 hours before departure costs 20% of the fare (10% at 24–48 hours, 5% from 48 hours up to 8 days); after departure you can only move to another train the same day if seats are left (12306, checked 20 October 2026), one more reason to leave a real buffer between landing and a fixed train.",
        "The Disney stop is not the park gate. The Airport Link's Shanghai International Resort station sits between the airports, but you still follow the resort's directions to the park or your hotel.",
        "The Maglev does not reach downtown. It runs from PVG to Longyang Road, still in Pudong, where you take your cases onto Metro Line 2 or into a taxi (Shanghai government transport guide).",
      ],
    },
    {
      id: "traps-sales",
      type: "paragraph",
      text: "Traps 1, 2, 3, 7 and 8 all start once you walk out of the terminal, and that is the part a private transfer takes off your hands. Land at PVG at 21:30 and the last Airport Link can leave while you are still at the baggage belt; with a transfer, your driver meets you at the point written into your confirmation instead. Send us your flight number, terminal and hotel; we reply within 12 hours, and before you pay we confirm in writing that a car is available for your landing time, the meeting point and the total price. Our own driver then takes you and your luggage to the hotel, to Hongqiao station or across to the other airport. We send cars in any city in mainland China, so a car from the airport straight to your Suzhou or Hangzhou hotel, or for your next stop, can go in the same quote. Ask for a Shanghai airport transfer.",
      link: { label: "Ask for a Shanghai airport transfer", href: "/services/private-car-and-driver/#car-enquiry" },
    },
    {
      id: "matrix-heading",
      type: "heading",
      level: 2,
      text: "The whole-trip decision matrix",
    },
    {
      id: "whole-trip-matrix",
      type: "table",
      caption: "Use each anchor to choose the first airport to compare—not to override the issued flight",
      columns: ["Trip anchor", "PVG case", "SHA case", "What can reverse the answer"],
      rows: [
        [
          "Only one suitable flight",
          "Choose PVG when the required long-haul, nonstop or protected itinerary operates there",
          "Choose SHA when the useful domestic or regional flight operates there",
          "A much worse schedule, fare rule or separate connection can outweigh every ground advantage",
        ],
        [
          "Hotel in Lujiazui or eastern Pudong",
          "Usually the first comparison because the airport and hotel are on the eastern side of Shanghai",
          "Still possible, but the road or rail journey crosses more of the city",
          "The actual hotel entrance, terminal, arrival hour and live route",
        ],
        [
          "Hotel around People's Square, East Nanjing Road or the Bund",
          "Metro Line 2 and road options exist, but the terminal-to-hotel chain remains substantial",
          "Metro Line 2 from T2 and road options often make SHA attractive",
          "Final walk, a T1 versus T2 flight, luggage and first or last service",
        ],
        [
          "Hotel in Jing'an, Xuhui, Gubei or western Shanghai",
          "A better flight may still justify the longer ground journey",
          "Often the first comparison because SHA is on the western side and Line 10 serves both terminals",
          "The hotel's useful station and entrance—not the district name alone",
        ],
        [
          "Shanghai Hongqiao Railway Station connection",
          "Airport Link reaches Hongqiao Airport T2, followed by the signed hub connection to the railway station",
          "Usually strongest, especially from or to T2; T1 still needs its own transfer",
          "Exact rail station, train time, terminal, luggage and a full flight-to-train or train-to-flight buffer",
        ],
        [
          "Shanghai Disney Resort area",
          "Usually the first comparison; the Airport Link's Shanghai International Resort stop is east of the city but is not the park gate",
          "Airport Link can also run toward the resort stop, but from the opposite side of Shanghai",
          "The actual flight and whether the endpoint is the park, a Disney hotel or an off-site property",
        ],
        [
          "Late arrival or early departure",
          "PVG may have the required flight but can leave a longer or out-of-hours city transfer",
          "SHA may shorten a western or central transfer, but T1/T2 and first/last service still matter",
          "Time outside the aircraft: immigration, baggage, terminal walking, pickup, traffic and hotel access",
        ],
      ],
    },
    {
      id: "matrix-note",
      type: "paragraph",
      text: "Shanghai's official transport guide describes Pudong as serving international and domestic flights, and Hongqiao as primarily serving domestic and regional East Asian flights. Treat this as a rule of thumb, not a timetable: airlines add, move and cancel routes, and the same city pair can run from both airports. The airport code on your ticket is what counts.",
    },
    {
      id: "airport-comparison",
      type: "comparison",
      title: "What each airport changes before the hotel door",
      columns: [
        {
          heading: "Pudong / PVG",
          body: "Shanghai's broad international gateway on the eastern side, with domestic flights as well.",
          items: [
            "Often the necessary choice for a long-haul or specific international service",
            "First comparison for an east-Pudong or Disney-area plan",
            "Metro Line 2, Maglev, Airport Link, buses and road transport serve different city chains",
            "Large-terminal walking, immigration and baggage can make aircraft arrival time a poor proxy for hotel arrival",
          ],
        },
        {
          heading: "Hongqiao / SHA",
          body: "A western airport focused mainly on domestic and regional East Asian services, beside the Hongqiao transport hub.",
          items: [
            "Often the first comparison for a domestic flight, western hotel or Hongqiao rail connection",
            "T1 uses Metro Line 10; T2 uses Lines 2 and 10 and the Airport Link",
            "T2 is the airport terminal connected through the hub corridor toward Shanghai Hongqiao Railway Station",
            "A flight at T1 does not inherit T2's railway and Airport Link convenience automatically",
          ],
        },
      ],
    },
    {
      id: "airport-link-figure",
      type: "figure",
      src: "/images/guides/shanghai-pudong-or-hongqiao-airport/airport-link-pvg-sha-diagram-1440.webp",
      alt: "Homeground orientation diagram showing the seven Airport Link stations between Hongqiao Terminal 2 and Pudong Terminals 1 and 2.",
      width: 1440,
      height: 720,
      caption: "Orientation diagram, not to scale. The Airport Link connects seven stations; its scheduled rail ride excludes terminal exit, waiting, immigration, baggage and the next check-in.",
    },
    {
      id: "hotel-heading",
      type: "heading",
      level: 2,
      text: "Match the airport to the hotel door, not ‘downtown Shanghai’",
    },
    {
      id: "hotel-table",
      type: "table",
      caption: "Hotel geography changes the first and last mile",
      columns: ["Hotel situation", "Airport to compare first", "Hidden friction"],
      rows: [
        [
          "Lujiazui, Zhangjiang or eastern Pudong",
          "PVG",
          "A hotel may still require a transfer or long walk from Line 2, the Maglev or an Airport Link interchange",
        ],
        [
          "People's Square or East Nanjing Road",
          "Compare both",
          "Both airport chains can touch Line 2; the flight terminal, crowding, luggage and final hotel walk decide",
        ],
        [
          "The Bund or Yu Garden edge",
          "Compare both",
          "The district is not an airport station; the final road or walking transfer can erase an apparent direct line",
        ],
        [
          "Jing'an, former French Concession or Xujiahui",
          "Often SHA",
          "Line 10 or a western road approach may help, but the exact property can sit far from the useful entrance",
        ],
        [
          "Gubei, Hongqiao business district or NECC area",
          "Usually SHA",
          "Confirm T1 versus T2 and any large hub walk; ‘near Hongqiao’ does not identify the endpoint",
        ],
        [
          "Disney-area hotel",
          "Usually PVG",
          "The Airport Link station is not the park gate, and an off-site hotel's shuttle may not serve either airport",
        ],
      ],
    },
    {
      id: "hotel-rule",
      type: "callout",
      title: "The hotel pin needs a street-level test",
      tone: "neutral",
      body: "Save the exact hotel name and entrance in Chinese. Test the route at the arrival or departure hour, including the useful station exit, lift, road crossing and whether a vehicle can legally stop.",
    },
    {
      id: "rail-heading",
      type: "heading",
      level: 2,
      text: "Hongqiao railway hub can make SHA the obvious choice—but only after the terminal check",
    },
    {
      id: "rail-copy",
      type: "paragraph",
      text: "Shanghai Hongqiao Railway Station is part of the wider Hongqiao transport hub. Official Shanghai guidance describes a signed connection corridor between the railway station and Hongqiao Airport Terminal 2. The Airport Link station is named Hongqiao Airport Terminal 2, so a traveller arriving from PVG still leaves that train and follows the physical hub route to the railway station. Do not replace that walk, railway entry or luggage movement with the words ‘same complex.’",
    },
    {
      id: "rail-comparison",
      type: "comparison",
      title: "Three Hongqiao rail connections that are not equivalent",
      columns: [
        {
          heading: "SHA Terminal 2 ↔ railway",
          items: [
            "Strongest airport-to-rail geometry",
            "Use the signed corridor and confirm the current terminal exit or entrance",
            "Add baggage, railway security and the walk to the waiting area",
          ],
        },
        {
          heading: "SHA Terminal 1 ↔ railway",
          items: [
            "T1 is a separate endpoint on the other side of the airfield",
            "Use the live Line 10 or road route rather than assuming a T2 walk",
            "A T1 flight can still be useful, but the hub advantage is smaller",
          ],
        },
        {
          heading: "PVG ↔ railway",
          items: [
            "Airport Link provides a direct scheduled rail connection toward Hongqiao T2",
            "The published airport-to-airport train ride is not a flight-to-platform connection time",
            "Check the exact Shanghai railway station: not every train uses Shanghai Hongqiao",
          ],
        },
      ],
    },
    {
      id: "rail-warning",
      type: "callout",
      title: "A train ticket can remove the airport choice",
      tone: "warning",
      body: "If a fixed Shanghai Hongqiao train departs soon after the flight, SHA may be the only sensible airport—but the train must still have a safe flight-to-platform margin. If the flight lands at PVG, do not use the Airport Link's roughly 40-minute scheduled ride as proof the connection works. For 12306, passport, baggage, security and boarding details, use Homeground's first-time high-speed-train guide.",
    },
    {
      id: "disney-heading",
      type: "heading",
      level: 2,
      text: "Disney usually points the comparison east, not directly to the park gate",
    },
    {
      id: "disney-copy",
      type: "paragraph",
      text: "PVG is usually the first airport to compare for a Shanghai Disney Resort start or finish because both sit in eastern Pudong. The Airport Link also places Shanghai International Resort Station between PVG and SHA. But that station is not the park entrance: after arriving, follow the resort's latest directions to the park or the specific hotel. A clearly better SHA flight can remain the better whole-trip choice.",
    },
    {
      id: "disney-callout",
      type: "callout",
      title: "Plan the Disney transfer after choosing PVG",
      tone: "neutral",
      body: "Once PVG is selected, use Homeground's PVG-to-Shanghai-Disney guide for the Airport Link, Bus 50, taxi, luggage and exact endpoint.",
    },
    {
      id: "disney-offer",
      type: "paragraph",
      text: "Travelling with children? Our Shanghai & Disneyland 5-day private tour keeps you in one breakfast-included Shanghai hotel for four nights, with airport or station transfers at both ends, a full Disneyland day with private transport both ways, and guided city days on Days 2 and 4. It has no fixed published price: we quote for your dates, and park tickets follow Disney's official date-based prices. See the Shanghai & Disneyland route.",
      link: { label: "See the Shanghai & Disneyland route", href: "/tours/shanghai-disneyland-5-day-private-tour/" },
    },
    {
      id: "flight-pattern-heading",
      type: "heading",
      level: 2,
      text: "International or domestic is a search filter, not a complete airport rule",
    },
    {
      id: "flight-pattern-table",
      type: "table",
      caption: "Use the airport pattern to search; use the live flight to decide",
      columns: ["Flight situation", "First search", "Decision check"],
      rows: [
        [
          "Long-haul international",
          "PVG first",
          "Confirm the exact nonstop, terminal, timing, fare conditions and onward Shanghai transfer",
        ],
        [
          "Hong Kong, Macao, Taiwan or short East Asian route",
          "Search both PVG and SHA",
          "A central-airport pair at the other end can change the whole trip, but inventory remains date-specific",
        ],
        [
          "Mainland domestic flight",
          "SHA first, then PVG",
          "Both airports handle domestic services; compare the exact schedule and hotel or railway chain",
        ],
        [
          "International-to-domestic connection",
          "Follow the protected itinerary first",
          "Check whether the airport changes, whether bags are through-checked and who protects a missed onward flight",
        ],
        [
          "China arrival city and departure city differ",
          "Quote the whole open-jaw journey",
          "Check the arrival and departure cities, visa or transit conditions and backtracking across the whole route",
        ],
      ],
    },
    {
      id: "flight-pattern-rule",
      type: "callout",
      title: "Do not pay a large flight penalty just to win a shorter taxi ride",
      tone: "decision",
      body: "Compare like with like: same travel date, baggage, fare flexibility, connection protection and realistic arrival time. Ground convenience breaks a close tie; it does not automatically rescue an overnight layover, unprotected ticket or unsuitable flight.",
    },

  {"id": "tour-gateway-heading", "type": "heading", "level": 2, "text": "Check the departure city before choosing between PVG and SHA"},
  {"id": "tour-gateway-choice", "type": "paragraph", "text": "The airport decision changes if the trip continues to Hangzhou. Homeground’s 5-day Shanghai–Suzhou private route starts and ends with transfers between the confirmed Shanghai airport and hotel; Day 5 includes English-speaking guide departure assistance. The 6-day Shanghai–Suzhou–Hangzhou route arrives in Shanghai but finishes at the confirmed Hangzhou airport or railway station, with a driver-only transfer on Day 6. It does not include a return to PVG or SHA. If Shanghai return flights are already fixed, confirm the extra return leg and any final Shanghai night before choosing the six-day route. For a late arrival, share the landing time so pickup, check-in and any out-of-hours service can be confirmed."},
  {"id": "tour-gateway-products", "type": "internal-links", "title": "Match the route to the booked gateways", "items": [{"label": "5-day route with Shanghai airport arrival and departure", "href": "/tours/shanghai-suzhou-5-day-private-tour/", "description": "Stay in the same Shanghai hotel and visit Suzhou for the day."}, {"label": "6-day route ending in Hangzhou", "href": "/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", "description": `Use a different departure city when the flight plan supports it. From ${bodyTourPrice(shszhzTour, 2, "en")} per person for two travellers or ${bodyTourPrice(shszhzTour, 4, "en")} for four.`}]},
    {
      id: "late-heading",
      type: "heading",
      level: 2,
      text: "Early and late flights turn the airport map into an operating-window test",
    },
    {
      id: "dated-window-table",
      type: "table",
      caption: "Dated transport snapshot reviewed August 11, 2026",
      columns: ["Connection", "Official snapshot", "Planning consequence"],
      rows: [
        [
          "Airport Link from Hongqiao Airport T2 toward PVG",
          "First train 05:45; last train 22:00; 15-minute interval under the April 1, 2026 operating plan",
          "T1, the railway station, hotel access and airline deadlines all require additional time",
        ],
        [
          "Airport Link from PVG toward Hongqiao Airport T2",
          "First train 06:00; last train 22:15; 15-minute interval under the same plan",
          "A flight landing before 22:15 may still miss the train after immigration, baggage and the terminal walk",
        ],
        [
          "Shanghai Metro",
          "PVG uses Line 2; SHA T1 uses Line 10; SHA T2 uses Lines 2 and 10",
          "First and last usable trains depend on direction and every transfer; check the travel date",
        ],
        [
          "Road and late-night ground transport",
          "Official airport pages publish taxi, bus and designated pickup information that can change with traffic controls",
          "Save the current terminal pickup point and a vehicle large enough for every traveller and case",
        ],
      ],
    },
    {
      id: "time-warning",
      type: "callout",
      title: "Scheduled landing is not ground-transport departure",
      tone: "warning",
      body: "For arrival, add taxiing, deplaning, border formalities where applicable, baggage delivery and the terminal walk. For departure, work backward from the airline's current check-in, bag-drop and gate deadlines. An old timetable or holiday extension is not proof of service for an ordinary date.",
    },
    {
      id: "door-heading",
      type: "heading",
      level: 2,
      text: "Compare the complete door-to-door time",
    },
    {
      id: "door-steps",
      type: "list",
      ordered: true,
      items: [
        "Start at the actual first door: aircraft seat, hotel entrance, railway arrival hall or Disney-area property.",
        "Add border control where applicable, baggage claim, toilets and the walk to the correct transport system.",
        "Add ticketing or pickup, the wait for the next train or vehicle and any out-of-station transfer.",
        "Add the in-vehicle journey using a live route at the expected hour—not a fixed blog estimate.",
        "Add the final station exit, road crossing, hotel walk, hub corridor or terminal security process.",
        "Add a disruption margin and one usable fallback before comparing the two totals.",
      ],
    },
    {
      id: "luggage-comparison",
      type: "comparison",
      title: "Let the hardest luggage handoff break a close tie",
      columns: [
        {
          heading: "Rail can win",
          items: [
            "Operating hours cover the whole chain with a safe margin",
            "Everyone can control their own case through gates, platforms and corridors",
            "The hotel or railway endpoint is genuinely simple from the arrival station",
          ],
        },
        {
          heading: "A car can win",
          items: [
            "Children, older parents, a stroller or several large cases make transfers fragile",
            "The group reaches the transport concourse after the useful rail window",
            "A precise terminal and hotel pickup can remove multiple handoffs",
          ],
        },
        {
          heading: "The flight can still win",
          items: [
            "A better schedule avoids an extra night or separate connection",
            "One ticket protects the onward journey and another option does not",
            "The geographically easier airport carries an unacceptable fare or change rule",
          ],
        },
      ],
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "If the airports do not match, recover before the margin disappears",
    },
    {
      id: "recovery-warning",
      type: "callout",
      title: "PVG and SHA do not have an airside transfer",
      tone: "warning",
      body: "Moving between them is a landside Shanghai journey. International transit passengers may need permission to enter: Shanghai's Exit-Entry Administration states that a traveller using a 24-hour visa-free transit to leave the transit area for an inter-airport transfer must apply for a temporary entry permit at border inspection. Do not buy a cross-airport connection until the entry basis and ticket responsibility are clear.",
    },
    {
      id: "recovery-steps",
      type: "list",
      ordered: true,
      items: [
        "Stop and read the live itinerary. Confirm PVG or SHA, terminal, flight number, date, departure time and current status.",
        "Contact the operating airline or booking channel immediately. Ask what happens if the check-in or connection is missed; do not begin crossing Shanghai based only on a map.",
        "If the trip remains viable, compare the current Airport Link with a correctly pinned road transfer. Include terminal exit, train or vehicle wait, luggage, the Hongqiao hub walk and the full airline deadline.",
        "If the rail operating window is closed or the margin is not safe, ask for the current ticket-change or rebooking option before spending the remaining time on an unlikely transfer.",
        "Keep the party, passports and luggage together. After the flight status is clear, rebuild the hotel, train, Disney or onward-transfer plan.",
      ],
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "The correct recovery depends on when the mismatch is discovered",
      columns: ["Situation", "Immediate action", "Do not assume"],
      rows: [
        [
          "Before booking",
          "Price the better airport and the full ground chain on the same screen",
          "The cheapest flight remains cheapest after an airport change, extra hotel or lost day",
        ],
        [
          "Ticket issued, travel still weeks away",
          "Check the fare's change options, then compare that cost with keeping the airport and planning the transfer",
          "A city code search means the airline will move the airport without a fare difference",
        ],
        [
          "International arrival at one airport, onward flight at the other",
          "Confirm entry permission, baggage handling, connection protection and the entire landside timeline",
          "Bags transfer automatically or the airline protects an unrelated ground journey",
        ],
        [
          "At the wrong departure airport",
          "Contact the airline now and check the live Airport Link or road route only if a real margin remains",
          "The roughly 40-minute Airport Link ride is a complete terminal-to-gate transfer time",
        ],
        [
          "Check-in closed or flight missed",
          "Seek the airline or booking channel's current handling option for the exact ticket",
          "An old blog's rebooking rule, fixed fee or same-day rescue applies universally",
        ],
      ],
    },
    {
      id: "recovery-figure",
      type: "figure",
      src: "/images/guides/shanghai-pudong-or-hongqiao-airport/hongqiao-t2-railway-wayfinding-1440.webp",
      alt: "The signed passage from Shanghai Hongqiao Railway Station toward Hongqiao Airport Terminal 2.",
      width: 1440,
      height: 960,
      caption: "This passage leads from Shanghai Hongqiao Railway Station toward Airport Terminal 2. Follow the transport system and terminal—not the word Hongqiao alone. Photo: Shwangtianyuan, CC BY-SA 4.0; cropped.",
    },
    {
      id: "verify-heading",
      type: "heading",
      level: 2,
      text: "Final check before paying",
    },
    {
      id: "verification-list",
      type: "list",
      items: [
        "Exact airport code, terminal, flight number, operating airline and travel date",
        "Nonstop or connection structure, baggage path, fare changes and missed-connection responsibility",
        "Exact hotel entrance or Disney endpoint in Chinese",
        "Exact railway station, train time and realistic air-to-rail or rail-to-air margin",
        "Current Airport Link, Metro, Maglev, bus or road operating window in the required direction",
        "Every wait, corridor, station exit, final walk and airline deadline in the door-to-door total",
        "Suitcases, stroller, children, slower walkers and required assistance",
        "Entry permission for any international landside or inter-airport transit",
        "A recovery threshold: when to stop crossing the city and ask about the flight instead",
      ],
    },
    {
      id: "fact-check-box",
      type: "callout",
      title: "Dynamic airport facts reviewed August 11, 2026",
      tone: "neutral",
      body: "At this review, PVG served international and domestic flights and connected to Metro Line 2, the Maglev and the Airport Link. SHA primarily served domestic and regional East Asian flights; T1 used Line 10, while T2 used Lines 2 and 10 plus the Airport Link. The April 2026 Airport Link plan listed 05:45 and 22:00 at Hongqiao T2 toward PVG, 06:00 and 22:15 at PVG toward Hongqiao T2, and 15-minute intervals. The scheduled airport-to-airport rail journey was described as about 40 minutes. Flight inventory, terminals, airline deadlines, railway schedules, transport hours, pickup zones and entry permission remain date- and ticket-specific checks.",
    },
    {
      id: "help-callout",
      type: "callout",
      title: "Not sure your airport chain works?",
      tone: "decision",
      body: "Send the travel date, flight or route, number of travellers, hotel, any train or Disney plan, luggage and fixed deadlines on WhatsApp or by email. We reply within 12 hours and tell you which handoffs are tight, and what a private car would take out of the chain.",
    },
    {
      id: "sales-heading",
      type: "heading",
      level: 2,
      text: "Hand the airport day to us",
    },
    {
      id: "transfer-copy",
      type: "paragraph",
      text: "With a private transfer, the meeting point at PVG or SHA is written into your confirmation before you pay. On arrival, our driver meets you at the terminal named in your confirmation and takes you to your hotel, whichever bank of the river it is on; on departure, the driver collects you and your luggage and drives you to the right terminal, not just “Hongqiao”. The drivers are our own, and we can send a car in any city in mainland China (not Hong Kong or Macau). If you are travelling with children, older parents, a stroller or several large cases, this is the leg where a car pays for itself. See how our airport transfers work.",
      link: { label: "See how our airport transfers work", href: "/services/private-car-and-driver/" },
    },
    {
      id: "transfer-how",
      type: "paragraph",
      text: "How to book: send your flight number, date, terminal, hotel, number of travellers and luggage on WhatsApp or by email. We reply within 12 hours; before you pay we confirm in writing that a car is available for your time, along with the vehicle, meeting point and total price, and nothing is booked until you say yes. Then you pay a 30% deposit by Alipay or VBill and the balance on arrival, with no fees added.",
      link: { label: "on WhatsApp or by email", href: "/services/private-car-and-driver/#car-enquiry" },
    },
    {
      id: "tour-offer",
      type: "paragraph",
      text: `Rather not think about airports at all? Our Shanghai & Suzhou 5-day private tour starts with an English-speaking guide and driver meeting you at your Shanghai airport on Day 1 and ends with a departure transfer on Day 5. You stay four nights in one Ctrip 4-Diamond Shanghai hotel with breakfast, with three full guided days: the Bund, Yu Garden and the Shanghai Tower observation deck, Zhujiajiao water town, and Suzhou by second-class high-speed train for the Humble Administrator's Garden and Pingjiang Road, with the listed adult tickets and station transfers included and no shopping stops. From ${bodyTourPrice(shszTour, 2, "en")} per person for two travellers, ${bodyTourPrice(shszTour, 4, "en")} for four or ${bodyTourPrice(shszTour, 6, "en")} for six; flights are extra. Suzhou's Humble Administrator's Garden sells real-name tickets for a set date and entry slot, bookable only 1–7 days before the visit (checked 26 September 2026); on this tour that ticket is included and booked for you. Send your dates and flight numbers on WhatsApp or by email; we reply within 12 hours, and after you approve the written quote you pay a 30% deposit by Alipay or VBill and the balance on arrival, with no fees added. See the Shanghai & Suzhou route.`,
      link: { label: "See the Shanghai & Suzhou route", href: "/tours/shanghai-suzhou-5-day-private-tour/" },
    },
    {
      id: "guide-offer",
      type: "paragraph",
      text: `Arriving on your own plan? Our own English-speaking guides work in Shanghai by the full day: ${bodyGuideRate("shanghai", "en")} per guide for up to 8 hours (${bodyGuidePeakRate("shanghai", "en")} on peak dates), priced per guide, not per person; transport, tickets and meals are separate. Book a Shanghai guide.`,
      link: { label: "Book a Shanghai guide", href: "/services/private-english-speaking-guides/#shanghai" },
    },
    {
      id: "reservation-offer",
      type: "paragraph",
      text: `Need tickets too? We book the Shanghai Tower observation deck, or the Humble Administrator's Garden for a Suzhou day, in each traveller's own name for a ${bodyReservationFee("en")} fee per person per attraction plus the face-value ticket. Request and pay at least ${bodyReservationLeadDays} days before the visit and the booking is guaranteed; if a booking fails, the fee and ticket money are refunded in full. Ask us to book your Shanghai tickets.`,
      link: { label: "Ask us to book your Shanghai tickets", href: "/services/china-attraction-reservations/#reservation-enquiry" },
    },
    {
      id: "order-copy",
      type: "paragraph",
      text: "Going on to Beijing, Xi'an or Guilin? One planner looks after you from the first reply to the last day: the route is planned around your flights and trains, and the hotels, transfers, guides and attraction bookings are joined up across the whole trip. We are a licensed travel agency (L-BJ10587), with no shopping stops. Tell us about the whole trip.",
      link: { label: "Tell us about the whole trip", href: "/services/full-trip-support/" },
    },
    {
      id: "faq",
      type: "faq",
      title: "Shanghai airport questions answered",
      items: [
        {
          question: "Are PVG and SHA the same airport?",
          answer: "No. PVG is Shanghai Pudong International Airport in eastern Shanghai; SHA is Shanghai Hongqiao International Airport in the west, next to Shanghai Hongqiao Railway Station. Moving between them is a landside trip of about 40 minutes on the Airport Link train alone, plus terminal walking and waiting.",
        },
        {
          question: "Which Shanghai airport is closer to the city centre?",
          answer: "Hongqiao. The Shanghai government's airport guide puts SHA about 13 km from the city centre, roughly 30 minutes and CNY 100–150 by taxi, and PVG about 30 km out, roughly 50 minutes and CNY 180 by taxi to People's Square or about an hour on Metro Line 2.",
        },
        {
          question: "Which Shanghai airport is better, Pudong or Hongqiao?",
          answer: "Start with the flight: if the useful nonstop, protected connection or fare exists at only one airport, that fact decides. When both airports work, compare Hongqiao (SHA) first for western Shanghai and a Shanghai Hongqiao Railway Station connection, and Pudong (PVG) first for eastern Pudong, many long-haul international journeys and a Disney-area start or finish.",
        },
        {
          question: "Is Hongqiao Airport the same as Shanghai Hongqiao Railway Station?",
          answer: "No. Shanghai Hongqiao Railway Station is not airport code SHA, and Hongqiao Airport Terminal 1, Terminal 2 and the railway station are different endpoints inside the wider Hongqiao hub. Official guidance describes a signed connection corridor between the railway station and Terminal 2; Terminal 1 needs its own transfer.",
        },
        {
          question: "How do I get between Pudong and Hongqiao airports?",
          answer: "There is no airside transfer; moving between them is a landside Shanghai journey. At the August 2026 review the Airport Link took about 40 minutes between PVG and Hongqiao Airport T2, with first and last trains of 05:45 and 22:00 from Hongqiao T2 and 06:00 and 22:15 from PVG at 15-minute intervals. A traveller on 24-hour visa-free transit who leaves the transit area for an inter-airport transfer must apply for a temporary entry permit at border inspection.",
        },
        {
          question: "Which metro lines serve PVG and SHA?",
          answer: "At the August 2026 review, PVG connected to Metro Line 2, the Maglev and the Airport Link; SHA Terminal 1 used Line 10, while Terminal 2 used Lines 2 and 10 plus the Airport Link. First and last usable trains depend on direction and every transfer, so check the travel date.",
        },
        {
          question: "Which airport is closer to Shanghai Disney?",
          answer: "PVG is usually the first airport to compare because both sit in eastern Pudong, and the Airport Link's Shanghai International Resort Station lies between PVG and SHA. That station is not the park entrance, and a clearly better SHA flight can still be the better whole-trip choice.",
        },
        {
          question: "Can you pick us up at PVG or SHA?",
          answer: "Yes. Our own drivers do airport transfers at both Shanghai airports and in any other mainland city. Send your flight number, terminal, hotel and group size; we reply within 12 hours and confirm the car, meeting point and total price in writing before you pay.",
        },
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning your Shanghai trip",
      items: [ { label: "Shanghai destination hub", href: "/destinations/shanghai/", description: "Decide complete days, which bank to stay on and the gateway before fixing this detail." },
        {
          label: "Plan the detailed PVG-to-Shanghai-Disney transfer",
          href: "/guides/pudong-airport-to-shanghai-disneyland/",
          description: "Compare the Airport Link, Bus 50, car, luggage and exact Disney endpoint after choosing PVG.",
        },
        {
          label: "Choose the wider international gateway pattern",
          href: "/guides/china-open-jaw-flights-route-planning/",
          description: "Compare different arrival and departure cities without reducing the decision to one Shanghai airport.",
        },
        {
          label: "Protect the last night before an international flight",
          href: "/guides/china-last-night-before-international-flight/",
          description: "Build a protected or self-protected departure buffer around the exact airport and terminal.",
        },
        {
          label: "Use China's high-speed trains for the first time",
          href: "/guides/china-high-speed-train-first-time-guide/",
          description: "Continue with 12306, passports, seats, baggage, security and boarding after the Hongqiao transfer is viable.",
        },
        {
          label: "Test the hotel's real metro access",
          href: "/guides/china-hotel-near-metro/",
          description: "Check the useful entrance, final walk, lifts and luggage route before using a hotel area to choose the airport.",
        },
        { label: "Choose a Shanghai base", href: "/guides/shanghai-where-to-stay-first-trip/", description: "Compare the Bund, People’s Square and the former French Concession by walking, metro reach, evenings, luggage and crowd trade-offs." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources and review record",
      items: [
        {
          label: "Pudong and Hongqiao flight roles, terminals, metro, taxi and airport-to-airport transport; distances, taxi times and fares quoted from this guide (published 14 December 2023)",
          url: "https://english.shanghai.gov.cn/en-Transportation/20231214/649e06ea38f74aaeb573fa2debbe97d3.html",
          publisher: "Shanghai Municipal Government; source: Shanghai Airport Authority",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Airport Link stations, transfers, scheduled journey and luggage facilities",
          url: "https://english.shanghai.gov.cn/en-Transportation/20241231/f66f14bbd4b549ab88e6f3aec375790c.html",
          publisher: "Shanghai Municipal Government; source: Shanghai Metro",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Airport Link operating plan effective April 1, 2026",
          url: "https://www.shanghai.gov.cn/nw17239/20260401/5131b375c3d44c22a2222266ede0a326.html",
          publisher: "Shanghai Municipal Government; source: Shanghai Shentong Metro Group",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Pudong Airport live flights, terminals and ground transport",
          url: "https://www.shairport.com/enpd/",
          publisher: "Shanghai Airport Authority",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Hongqiao Airport ground-transport information",
          url: "https://www.shairport.com/ensh/dmjt/index.html",
          publisher: "Shanghai Airport Authority",
          reviewedAt: "2026-08-11",
        },
        {
          label: "China Railway refund and change rules",
          url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/info/orderWarmTips.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-10-20",
        },
        {
          label: "Hongqiao Railway Station–Terminal 2 connection corridor and peak controls",
          url: "https://www.shanghai.gov.cn/nw31406/20250208/9ebf6c54a952436791e13d2923029d2a.html",
          publisher: "Shanghai Municipal Government; source: Shanghai Public Security",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Shanghai Disney Airport Link and resort rail information",
          url: "https://www.shanghaidisneyresort.com/en/experience/guest-service/rail",
          publisher: "Shanghai Disney Resort",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Inter-airport transit and temporary entry permit requirement",
          url: "https://english.shanghai.gov.cn/en-ImmigrationCustoms/20251022/2d236278d33f4fbfbd178a9343fb1902.html",
          publisher: "Exit-Entry Administration Bureau of Shanghai Municipal Public Security Bureau",
          reviewedAt: "2026-08-11",
        },
        {
          label: "China Railway live train query",
          url: "https://www.12306.cn/en/left-ticket.html?linktypeid=dc",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Hero photograph: Shanghai Airport Link train (cropped)",
          url: "https://commons.wikimedia.org/wiki/File:Train_of_Airport_Link_Line.jpg",
          publisher: "Greencarp via Wikimedia Commons; CC0 1.0",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Photograph: Hongqiao Railway Station passage toward Airport Terminal 2 (cropped)",
          url: "https://commons.wikimedia.org/wiki/File:Shanghai_Hongqiao_Railway_Station_channel_to_Hongqiao_Airport_T2.jpg",
          publisher: "Shwangtianyuan via Wikimedia Commons; CC BY-SA 4.0",
          reviewedAt: "2026-08-11",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
