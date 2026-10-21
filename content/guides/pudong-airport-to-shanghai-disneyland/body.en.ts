import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuidePeakRate, bodyGuideRate, bodyReservationFee, bodyReservationLeadDays } from "../../../lib/guideBodyPrices.ts";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "decision-lead",
      type: "lead",
      text: "By public transport: take the Airport Link one stop from Pudong Airport to Shanghai International Resort Station, leave by Exit 3, ride Pudong Bus 50 to its Disney Metro Station stop, then walk or take the resort shuttle. The last Airport Link train leaves PVG at 22:15 (Shanghai municipal timetable, checked August 2026) and does not wait for late flights. By car, Shanghai Disney estimates 30–50 minutes to the resort area; set the destination to West Public Transportation Hub for the park, or to your hotel's exact address. With children, several large cases, a stroller or a late landing, one car to the right door is usually the easier trip.",
    },
    {
      id: "quick-answer",
      type: "callout",
      title: "The short answer",
      tone: "decision",
      body: "Take the Airport Link if the last train and Bus 50 will still be running when you reach the platform, and every adult can handle their own bags through a train, a bus and a walk. Take a car if you are going straight to a hotel, travelling with small children, older parents, a stroller or more cases than free hands, or landing late. For the park, the taxi destination is West Public Transportation Hub; for a hotel, save its exact name and address in Chinese.",
    },
    {
      id: "traps-heading",
      type: "heading",
      level: 2,
      text: "Six traps between PVG and the Disney gate",
    },
    {
      id: "traps-list",
      type: "list",
      ordered: true,
      items: [
        "“One stop” is not the park. The Airport Link stops at Shanghai International Resort Station (上海国际旅游度假区站); the park sits by Disney Resort Station (迪士尼站) on Metro Line 11. In between are Exit 3, a street-level city bus and a walk.",
        "The last train does not wait for your flight. The Shanghai municipal page lists the final Airport Link departure from PVG at 22:15; Shanghai Disney's own rail page still showed 22:00 when we checked. Land at 21:30 and immigration, baggage and the terminal walk can put you on the platform too late.",
        "Your suitcase cannot go into the park. Shanghai Disneyland prohibits wheeled luggage and any bag larger than 56 × 36 × 23 cm; the official storage opposite Wishing Star Park's West Gate listed RMB 80 per ordinary item per day. Four cases straight from the airport means RMB 320 and two extra trips to the storage desk: one before security, one at the end of a long day with tired children.",
        "Pudong Bus 50 is a city bus. There are no reserved seats, guaranteed luggage racks or help loading bags, and you change from train to bus with every case, child and stroller.",
        "A hotel's “Disney shuttle” is not an airport pickup. Off-site shuttles may run only between the hotel and the park, at fixed times, with limits on large bags.",
        "“Disneyland” is not one drop-off. Shanghai Disney sends taxis for the park to West Public Transportation Hub; each resort hotel and each off-site hotel has its own entrance. A generic pin can leave you on the wrong side of the resort.",
      ],
    },
    {
      id: "traps-sales",
      type: "paragraph",
      text: "Each of these traps is a handoff, and a private transfer takes them all out of the day: one car from the arrivals hall to the exact door, bags in the boot, no Exit 3, no Bus 50. A taxi or ride-hailing car removes the bus too, but you choose it after landing, on whatever data or Wi-Fi you have, and a standard car is not guaranteed to fit four people and four large cases. With us, the vehicle size, meeting point and total price can be settled in writing before you fly. Send us your flight number, terminal, number of travellers, cases and strollers, and the hotel or park entrance; we reply within 12 hours, and before you pay we confirm in writing that a car is available for your landing time. Our own drivers do this at Pudong (PVG), Hongqiao (SHA) and in any city in mainland China. Ask for a PVG to Disney transfer.",
      link: { label: "Ask for a PVG to Disney transfer", href: "/services/private-car-and-driver/#car-enquiry" },
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
      text: "“Shanghai Disney” can mean the park entrance, one of the two Disney Resort hotels, or one of the independently operated hotels spread across the wider resort area. Those are not interchangeable pins. The route that reaches a station fastest can still leave you with a bus, a hotel shuttle and every suitcase to move again.",
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
      body: "Many search results still lead with the Maglev to Longyang Road and then stack metro transfers toward Line 11. Ride it for the experience, not to reach Disney: it stops at Longyang Road, and from there it is more metro changes to Line 11. From PVG, compare the newer one-stop Airport Link first; add the Bus 50 and final walk before deciding whether it beats a car for this group.",
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
      text: "Once you are at Shanghai International Resort Station, the airport is one easy stop away; the catch is that the park is not at that station. Add luggage collection, movement to Disney Resort Metro Station, Pudong Bus 50, the walk into the Airport Link station and a margin for the next train. Check the live airport terminal and airline deadline separately; a short rail leg cannot rescue a late park departure. Flying out on park day? Put the return transfer in the same request: the driver collects you and the bags and drives to your terminal.",
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
      body: "At this review, PVG T1 & T2 and Shanghai International Resort Station were adjacent Airport Link stops; the municipal timetable listed roughly 15-minute service and a 22:15 last departure from PVG (Disney's rail page still showed 22:00); Disney directed Airport Link users to Exit 3 and Pudong Bus 50, and park taxis to West Public Transportation Hub. Timetables, fares, exits, bus stops, pickup areas, storage prices, park rules and hotel shuttles remain live checks. The 22:15 time applies to the published PVG Airport Link departure, not to a flight, bus connection or hotel transfer.",
    },
    {
      id: "help-callout",
      type: "callout",
      title: "Landing late, or with more cases than free hands?",
      tone: "decision",
      body: "That is exactly who the 22:15 last train and the no-wheeled-luggage rule catch out. Send the travel date, flight and terminal, number and ages of travellers, suitcase and stroller count, and the exact hotel or park plan on WhatsApp or by email. We reply within 12 hours; before you pay, the car, meeting point and total price are confirmed in writing.",
    },
    {
      id: "sales-heading",
      type: "heading",
      level: 2,
      text: "Let us do the airport run",
    },
    {
      id: "transfer-copy",
      type: "paragraph",
      text: "With a private transfer, the meeting point at PVG is written into your confirmation before you pay. On arrival, our driver meets you at the terminal named in your confirmation and drives you to your Disney hotel, an off-site hotel's front door or West Public Transportation Hub; on the way home, the driver collects you and your luggage and takes you to the right terminal. We confirm a vehicle that fits every traveller, case and stroller in writing, rather than hoping a standard car will do. The drivers are our own. See how our airport transfers work.",
      link: { label: "See how our airport transfers work", href: "/services/private-car-and-driver/" },
    },
    {
      id: "transfer-how",
      type: "paragraph",
      text: "How to book: send your flight number, date, terminal, hotel or park plan, number and ages of travellers, cases and strollers on WhatsApp or by email. We reply within 12 hours; before you pay we confirm in writing that a car is available for your time, along with the vehicle, meeting point and total price, and nothing is booked until you say yes. Then you pay a 30% deposit by card through a secure VBill link and the balance on arrival. A reply can take up to 12 hours, so a request sent from the departure lounge may reach us after you have landed. Book it once your flight is ticketed, so a late landing is planned for, not discovered at 22:16.",
      link: { label: "on WhatsApp or by email", href: "/services/private-car-and-driver/#car-enquiry" },
    },
    {
      id: "tour-offer",
      type: "paragraph",
      text: "Doing Disney as part of a Shanghai trip? Our Shanghai & Disneyland 5-day private tour is built around the traps above. Day 1 has no fixed sightseeing, so a late landing does not eat into a touring day: our driver meets you at the confirmed airport or station and takes you to the hotel. All four nights are in one breakfast-included Shanghai hotel, so the cases are unpacked once. Days 2 and 4 bring a private English-speaking guide and vehicle (the Bund, Yu Garden and the old city; then the former French Concession with a free afternoon). Day 3 is a full park day with private transport there and back; we book your date-specific park ticket once your dates and passport details are confirmed, and there is no in-park guide unless separately confirmed. Day 5 is the transfer to your flight or train. This route has no published price yet: send your dates, group, rooming and flights on WhatsApp or by email, we reply within 12 hours, and the hotel, transport and total are confirmed in writing before you pay. Then it is a 30% deposit by card through a secure VBill link, with the balance on arrival. See the Shanghai & Disneyland 5-day route.",
      link: { label: "See the Shanghai & Disneyland 5-day route", href: "/tours/shanghai-disneyland-5-day-private-tour/" },
    },
    {
      id: "guide-offer",
      type: "paragraph",
      text: `Planning the city days yourself? Our own English-speaking guides work in Shanghai by the full day: ${bodyGuideRate("shanghai", "en")} per guide for up to 8 hours (${bodyGuidePeakRate("shanghai", "en")} on peak dates), priced per guide, not per person; transport, tickets and meals are separate. Ask on WhatsApp or by email; we reply within 12 hours. Book a Shanghai guide.`,
      link: { label: "Book a Shanghai guide", href: "/services/private-english-speaking-guides/#shanghai" },
    },
    {
      id: "reservation-offer",
      type: "paragraph",
      text: `Want the Shanghai Tower observation deck, or Shanghai Museum East's Curio-City and Digital Gallery (each needs its own advance reservation), on a free afternoon? We can reserve them: ${bodyReservationFee("en")} per person per attraction plus the face-value ticket; request, pay and send every traveller's passport details at least ${bodyReservationLeadDays} days before the visit and the booking is guaranteed, and if a booking fails, the fee and ticket money are refunded in full. Ask us to reserve them.`,
      link: { label: "Ask us to reserve them", href: "/services/china-attraction-reservations/#reservation-enquiry" },
    },
    {
      id: "order-copy",
      type: "paragraph",
      text: "Going on to Suzhou, Hangzhou, Beijing or Xi'an after the park? One planner looks after you from the first reply to the last day and plans the route around your flights and trains, with the transfers, hotels, guides and attraction bookings joined up. We are a licensed travel agency (L-BJ10587), with no shopping stops. Send the whole route on WhatsApp or by email; we reply within 12 hours. Tell us about the whole trip.",
      link: { label: "Tell us about the whole trip", href: "/services/full-trip-support/" },
    },
    {
      id: "faq",
      type: "faq",
      title: "Pudong to Disneyland questions answered",
      items: [
        {
          question: "How do I get from Pudong Airport to Shanghai Disneyland by public transport?",
          answer: "Take the Airport Link one stop from Pudong Airport T1 & T2 Station toward Hongqiao to Shanghai International Resort Station, then leave through Exit 3. From Chuanzhan Road / Tanghuang Road take Pudong Bus 50 to its Disney Metro Station stop, which sits beside Metro Line 11's Disney Resort Station. From there walk, or use Resort Shuttle Bus No. 1 or No. 2 as currently directed.",
        },
        {
          question: "Which airport is closest to Shanghai Disneyland?",
          answer: "Pudong (PVG). On the Airport Link, Pudong Airport T1 & T2 Station is the stop next to Shanghai International Resort Station. Hongqiao (SHA) is at the far end of the same line, five stops further west, so from Hongqiao the rail leg is much longer before the same Exit 3 and Bus 50 transfer.",
        },
        {
          question: "Does the Airport Link go to the park entrance?",
          answer: "No, it does not reach the park gate. Shanghai International Resort Station is the Airport Link station serving the wider resort area, while Disney Resort Station is the Metro Line 11 station beside the park area. A search result that says the Airport Link is one stop from PVG has not yet described the bus and the final walk to the park.",
        },
        {
          question: "What time is the last Airport Link train from Pudong Airport?",
          answer: "The Shanghai municipal Airport Link page reviewed August 11, 2026 lists a final departure at 22:15, with departures from Pudong Airport from 06:00 at roughly 15-minute intervals. Shanghai Disney's rail page still showed 22:00 at that review, so use the newer operator or municipal timetable and check it live. The last train is not held for a late flight.",
        },
        {
          question: "Can I take my suitcase into Shanghai Disneyland?",
          answer: "No. Wheeled luggage is prohibited, as are bags, boxes or containers larger than 56 × 36 × 23 cm. The official storage facility is opposite the West Gate of Wishing Star Park, and the current page lists RMB 80 per ordinary item per day and RMB 10 for a small item whose three dimensions total no more than 60 cm. Recheck price and hours.",
        },
        {
          question: "How long does a taxi take from PVG to the Disney resort area?",
          answer: "Shanghai Disney's current estimate is about 30–50 minutes by taxi, and that is not a promise for every hotel or entrance, because a road journey depends on traffic. Use the signed taxi rank or the airport's current designated ride-hailing pickup area, and choose a vehicle category that actually fits every passenger and bag.",
        },
        {
          question: "Where should I tell a taxi driver to drop me at Shanghai Disney?",
          answer: "For the park, Shanghai Disney directs taxis to the West Public Transportation Hub, so set that rather than a general Disneyland pin. For a hotel, save the property's exact Chinese name and address before you fly, because resort hotels and hotels outside the resort are different drop-offs. For ride-hailing, follow the app and the airport's current on-site signs.",
        },
        {
          question: "Can you pick us up at Pudong Airport and drive us to our Disney hotel?",
          answer: "Yes, we can quote it. Our own drivers do airport transfers at Pudong (PVG), Hongqiao (SHA) and in any other mainland city. Send your flight number, terminal, hotel, number of travellers and luggage on WhatsApp or by email; we reply within 12 hours and confirm the car, meeting point and total price in writing before you pay. Then you pay a 30% deposit by card through a secure VBill link and the balance on arrival.",
        },
      ],
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
          label: "Private car and driver in any mainland city",
          href: "/services/private-car-and-driver/",
          description: "Airport transfers by our own drivers, quoted in writing before you pay.",
        },
        {
          label: "Decide where human help is actually useful",
          href: "/guides/do-you-need-a-tour-guide-in-china/",
          description: "See which parts of a China trip are hardest to do alone, and where a guide or driver changes the day.",
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
