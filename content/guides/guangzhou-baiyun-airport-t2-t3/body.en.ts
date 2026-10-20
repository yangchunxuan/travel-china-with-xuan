import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuidePeakRate, bodyGuideRate, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const gzTour = "guangzhou-shunde-foshan-5-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "decision-lead",
      type: "lead",
      text: "Guangzhou Baiyun Airport (CAN) now handles passenger flights at two terminals only, T2 and T3. T1 closed to passengers on 7 May 2026, and as of 19 October 2026 no reopening date has been announced. Your terminal is set by the exact flight, not the airline, so check the flight number before anything else. T2 has its own metro stop (Line 3, Airport North); T3 has no metro, only the intercity railway at Baiyun Airport East. The two terminals are not a walk apart: to change between them, take the 24-hour landside shuttle from Bay 30 at T2 or Bay 60 at T3.",
    },
    {
      id: "quick-answer",
      type: "callout",
      title: "The short answer",
      tone: "decision",
      body: "T2 → T3: East Coach Station, Bay 30 (东客运站 30号卡位), 24-hour shuttle; the city's notice of 4 May 2026 gives about 25 minutes on board and a bus every 8 minutes by day, every 15–20 minutes at night. T3 → T2: East Coach Station tourist-bus area, Bay 60 (60号卡位). While trains run, the intercity railway also links Baiyun Airport North (T2) and Baiyun Airport East (T3) in one stop. Never head for T1, Metro Airport South or intercity Baiyun Airport South: no passenger trains stop there.",
    },
    {
      id: "wrong-terminal-heading",
      type: "heading",
      level: 2,
      text: "How to get from Guangzhou Airport T2 to T3, or T3 to T2",
    },
    {
      id: "wrong-terminal-copy",
      type: "paragraph",
      text: "First make sure you really are at the wrong terminal: check the operating airline, the live flight status and the departure screens, or ask airport staff. A codeshare or a schedule change often explains the mismatch. If you have already checked in, or the flight is part of a connection the airline protects, speak to that airline before you leave the building. Then use one of the two landside links the airport publishes, with your onward booking ready on your phone: the city's notice describes the T2 → T3 shuttle as for transfer passengers.",
    },
    {
      id: "terminal-shuttle-stops",
      type: "table",
      caption: "T2 ↔ T3 shuttle boarding points: save the Chinese names",
      columns: ["Direction", "Where to board", "Where you get off"],
      rows: [
        [
          "T2 → T3",
          "T2 transport centre, East Coach Station (东客运站), Bay 30 (30号卡位). Follow the signs for 航站楼穿梭巴士 (terminal shuttle bus).",
          "T3 East Coach Station. Follow the terminal signs to your airline's check-in or transfer desk.",
        ],
        [
          "T3 → T2",
          "T3 transport centre, tourist-bus boarding area of the East Coach Station (旅游巴士乘车点／东客运站), Bay 60 (60号卡位).",
          "T2 East Coach Station. Find your airline's counter and keep your passports and flight details on you.",
        ],
      ],
    },
    {
      id: "terminal-shuttle-timing",
      type: "paragraph",
      text: "The airport's terminal-transfer page, checked on 9 September 2026, lists the shuttle as running 24 hours, though arrangements on the day can vary. The Guangzhou government's notice of 4 May 2026 gives the numbers for T2 → T3: about 25 minutes on board, with a bus every 8 minutes from 9:00 to 23:00, every 15 minutes from 23:00 to 3:00 and from 5:00 to 9:00, and every 20 minutes from 3:00 to 5:00. The same notice describes it as a shuttle for transfer passengers only, so keep your onward booking ready to show. Then add the walk to the bay, the walk to the next counter, check-in and security: between 3:00 and 5:00, the wait and the ride alone can take 45 minutes. The car-park buses at Bay 21 (T2) and Bay 71 (T3) look similar and go somewhere else entirely; confirm the destination with staff before you board.",
    },
    {
      id: "terminal-intercity-steps",
      type: "list",
      ordered: true,
      items: [
        "Prefer the train? From T2, follow the Guangdong Intercity signs to Baiyun Airport North (白云机场北) and ride one stop to Baiyun Airport East (白云机场东). From T3, do the reverse.",
        "Check that the next departure stops at your station before you go through the gates. If the ticket machine rejects your passport or card, use the staffed counter.",
        "This is the intercity railway, not Metro Line 3. Metro Airport North cannot take you to T3.",
        "Trains do not run all night. If the next one is unsuitable or rail has finished, go back to the shuttle bay.",
      ],
    },
    {
      id: "airside-callout",
      type: "callout",
      title: "There is no passenger train between T2 and T3 airside",
      tone: "warning",
      body: "The airport's public information describes only landside links. Unless the operating airline confirms a protected process for your exact flights, plan on immigration where it applies, collecting and re-checking your bags, changing terminal landside and going through security again.",
    },
    {
      id: "traps-heading",
      type: "heading",
      level: 2,
      text: "Seven Baiyun traps that cost travellers their flight",
    },
    {
      id: "traps-list",
      type: "list",
      ordered: true,
      items: [
        "Old directions still point to T1. Many blogs, saved map pins and screenshots predate 7 May 2026, when T1 stopped handling passengers and trains stopped calling at Metro Airport South and intercity Baiyun Airport South. A taxi driver told “T1” will take you to a closed terminal.",
        "“Airport North” is not “Baiyun Airport North”. The first is the Metro Line 3 station at T2, the second the Guangdong Intercity station at T2: different networks, different fare gates, different routes. Drop one word in a map search and you are sent the wrong way.",
        "There is no metro to T3. Lines 3 and 9 reach Gaozeng, where a feeder bus, the Gaozeng–T3 Airport Line 2 branch, takes over. An official notice of 8 May 2026 puts its pickup at Gaozeng Exit B and the return at T3 Stop 74: about 15 minutes to T3, a bus every 5 to 10 minutes, CNY 2. It runs from Gaozeng 6:15–23:15 and from T3 only 6:35–22:40, and it is not the 24-hour shuttle between terminals.",
        "The terminal belongs to the flight, not the airline. Airlines moved more than once while T3 opened, a codeshare can show the airline that sold the ticket rather than the one that flies, and your return can leave from the other terminal. The airport's directory, checked on 9 September 2026, lists 9 Air (九元航空, AQ) at T2; treat that as a starting point and confirm your own flight.",
        "At Guangzhou South the intercity station is called Panyu. It sits in the same hub but has its own paid area, so after a high-speed train you walk to a separate station and go through the gates again. Search Panyu → Baiyun Airport North for T2, or Panyu → Baiyun Airport East for T3.",
        "Changing terminals is not a connection. Even on one ticket, a bag is only through-checked if the airline confirms it; ask at the first airport and read the final airport code on the bag tag. On separate tickets, assume you collect the bag, clear customs, change terminal, check in again and pass security, and that the risk of a delay is yours.",
        "The last train comes before the last flight. The terminal shuttle is listed as 24 hours; the metro, the intercity trains and the Gaozeng bus are not. Landing time is not kerbside time: immigration, baggage and the walk to the right pickup point come first.",
      ],
    },
    {
      id: "traps-sales",
      type: "paragraph",
      text: "Six of these seven traps come down to one thing: reaching the right door at the right hour. That is the part a private transfer takes off your hands; the bag-and-connection trap (number 6) stays between you and your airline. Our own drivers do airport and station transfers in Guangzhou and in any other city in mainland China: send us your flight number and hotel, and we confirm the terminal, the meeting point and the total price in writing before you pay. Get a written quote for your Baiyun pickup.",
      link: { label: "Get a written quote for your Baiyun pickup", href: "/services/private-car-and-driver/#car-enquiry" },
    },
    {
      id: "terminal-decision-heading",
      type: "heading",
      level: 2,
      text: "Which terminal is my flight? Check it in this order",
    },
    {
      id: "terminal-checklist",
      type: "list",
      ordered: true,
      items: [
        "Take the flight number and date from your latest booking confirmation, not an early search screenshot.",
        "Find the operating carrier. On a codeshare it may not be the airline that sold you the ticket.",
        "Read the terminal shown for that flight and watch for any airline message about a terminal change.",
        "Recheck the flight on the airline's or Baiyun Airport's flight-status page on the day you travel.",
        "Only then plan the route, and save the terminal name in Chinese for a driver or a map app: 2号航站楼 for T2, 3号航站楼 for T3.",
      ],
    },
    {
      id: "terminal-grid",
      type: "comparison",
      title: "What each terminal gives you",
      columns: [
        {
          heading: "Terminal 2",
          body: "The terminal with both a metro station and an intercity station.",
          items: [
            "Metro Line 3: Airport North (机场北)",
            "Guangdong Intercity: Baiyun Airport North (白云机场北)",
            "Taxis, ride-hailing and airport buses",
            "Airlines here can still move: confirm your flight",
          ],
        },
        {
          heading: "Terminal 3",
          body: "The newer terminal, with an intercity station and no metro.",
          items: [
            "Guangdong Intercity: Baiyun Airport East (白云机场东), level B2 of the transport centre",
            "By metro: Line 3 or 9 to Gaozeng, then the Airport Line 2 branch bus",
            "Taxis, ride-hailing and airport buses use T3's own pickup zones",
            "Domestic, international and regional flights",
          ],
        },
      ],
    },
    {
      id: "station-table",
      type: "table",
      caption: "Five similar station names, two rail systems: use the one that matches your terminal",
      columns: ["Terminal", "Guangzhou Metro", "Guangdong Intercity", "What to know"],
      rows: [
        ["T2", "Airport North (T2) / 机场北（2号航站楼）", "Baiyun Airport North (T2) / 白云机场北（2号航站楼）", "Both serve T2, on separate networks with separate gates."],
        ["T3", "No station. Go to Gaozeng (高增) and take the Airport Line 2 branch bus", "Baiyun Airport East (T3) / 白云机场东（3号航站楼）", "The intercity station is inside the T3 transport centre."],
        ["T1, closed to passengers", "Airport South (T1) / 机场南（1号航站楼）: trains do not stop", "Baiyun Airport South (T1) / 白云机场南（1号航站楼）: trains do not stop", "Ignore any guide that sends you here while the closure lasts."],
      ],
    },
    {
      id: "t3-wayfinding-figure",
      type: "figure",
      src: "/images/guides/guangzhou-baiyun-airport-t2-t3/t3-baiyun-airport-east-wayfinding-1440.webp",
      alt: "Entry gates and platform signs inside Baiyun Airport East intercity station at Guangzhou Baiyun Airport Terminal 3.",
      width: 1440,
      height: 960,
      caption: "Baiyun Airport East: the intercity gates inside the T3 transport centre. Photo: Jacky Cheung/Wikimedia Commons, CC BY-SA 4.0; cropped.",
    },
    {
      id: "origin-heading",
      type: "heading",
      level: 2,
      text: "Getting to T2 or T3 from where you actually start",
    },
    {
      id: "origin-matrix",
      type: "table",
      caption: "What to compare first",
      columns: ["Starting from", "To T2", "To T3", "What can change the answer"],
      rows: [
        ["A hotel near Metro Line 3", "Metro to Airport North", "Metro to Gaozeng, then the Airport Line 2 branch bus", "An early or late flight, several changes, big suitcases, a long walk to the station"],
        ["Guangzhou South railway hub", "Intercity, Panyu → Baiyun Airport North", "Intercity, Panyu → Baiyun Airport East", "Not every train stops at both; allow time to cross the hub"],
        ["Pazhou, Panyu or another stop on the intercity line", "Intercity to Baiyun Airport North", "Intercity to Baiyun Airport East", "First and last trains, and the final walk with luggage"],
        ["Late at night, with older parents, small children or several large cases", "An official taxi or a private car", "An official taxi or a private car", "Whether a car can reach your hotel entrance easily, and whether everyone and every case fits in one car"],
      ],
    },
    {
      id: "t3-route-copy",
      type: "paragraph",
      text: "Baiyun Airport East sits on level B2 of the T3 transport centre and connects on foot to departures, so it is the direct rail answer for T3, though not always the easiest door-to-door one. Coming from the metro, the Gaozeng bus adds a wait and another lift of the bags. For drop-off by car, ask for T3 Departures; after landing, follow the signs to T3's current taxi rank or ride-hailing zone, as pickup levels can change.",
    },
    {
      id: "connections-heading",
      type: "heading",
      level: 2,
      text: "Connecting between T2 and T3 on one ticket or two",
    },
    {
      id: "connection-table",
      type: "table",
      caption: "What to settle before you accept a T2–T3 connection",
      columns: ["Your situation", "Ask the operating airline", "Time people forget", "How to plan"],
      rows: [
        ["One itinerary, bag confirmed to your final airport", "Which transfer desk, and whether there is an airside or escorted process", "Walking, document checks, border control, gate closing", "Follow the airline's connection instructions, not a public-transport shortcut"],
        ["One itinerary, bag status unclear", "Whether the bag is checked through or must be collected in Guangzhou", "Baggage claim, customs and re-check", "If staff cannot confirm it, plan to collect and re-check"],
        ["Separate tickets", "Whether either airline will through-check, and who helps after a delay", "Every landside step plus the second check-in deadline", "Plan as collect and re-check unless you have it in writing"],
        ["Arriving from abroad and flying on", "Entry, transit, customs and terminal steps for your passport and route", "Immigration queues and any need to enter China", "A terminal bus does not give you permission to enter China"],
      ],
    },
    {
      id: "late-heading",
      type: "heading",
      level: 2,
      text: "Landing late: the moment the rail options stop",
    },
    {
      id: "late-copy",
      type: "paragraph",
      text: "A late landing turns a simple ride into a night-time search. The last Gaozeng bus leaves T3 for the metro at 22:40 (official notice, 8 May 2026): land at 22:00 and you have 40 minutes to clear immigration, collect your bags and find Stop 74. Miss it and you are choosing, with luggage and tired people, between T3's taxi rank at arrivals Gate 75 and the ride-hailing pickup on levels 2 and 1M of the P12 car park (city notice, 4 May 2026). Before you fly, save the terminal, your hotel's name and its address in Chinese; check the last metro and intercity train for your date; tell the hotel you are arriving late and keep its phone number offline. For a very early departure, check the whole hotel-to-terminal trip against your check-in deadline: the first Gaozeng bus leaves at 6:15 and reaches T3 at about 6:30.",
    },
    {
      id: "canton-fair",
      type: "paragraph",
      text: "Flying in for the Canton Fair? It is held in Guangzhou every spring and autumn, and the 140th session runs in three phases: 15–19 October, 23–27 October and 31 October–4 November 2026 (Ministry of Commerce website, 24 July 2026). As the fair opened, Xinhua reported about 340,000 overseas buyers attending across the whole session (15 October 2026). If your dates touch a phase, send us your flight and hotel before you fly, so the car is confirmed in writing before you board, not looked for on arrival.",
    },
    {
      id: "sales-heading",
      type: "heading",
      level: 2,
      text: "Land, walk out, get in the car: let us meet you at T2 or T3",
    },
    {
      id: "late-pickup",
      type: "paragraph",
      text: "With a private transfer you are not hunting for T3's taxi rank or the ride-hailing car park at midnight. We check your flight's terminal, agree the meeting point with you in writing, and our driver meets you there and takes you and your bags to your hotel entrance. Late-night arrivals can be booked too; the car counts as booked once we have confirmed it in writing for your time. Departing, we work back from your check-in deadline and drop you at the terminal your flight uses. The drivers are our own, not a ride-hailing lottery, and we can send a car in any city in mainland China (not Hong Kong or Macau), so we can quote the next airport or station on your route in the same reply. See how our private airport transfers work.",
      link: { label: "See how our private airport transfers work", href: "/services/private-car-and-driver/" },
    },
    {
      id: "pickup-how",
      type: "paragraph",
      text: "How to book: send your flight number, date, terminal, number of travellers, luggage and hotel address on WhatsApp or by email. We reply within 12 hours; before you pay, we confirm in writing that a car is available for your time, along with the vehicle, the meeting point and the total price, and nothing is booked or charged until you say yes. You pay by Alipay or VBill, with no added fees. A reply can take up to 12 hours, so a message sent from the departure gate may still be unanswered when you land: write before you leave home.",
      link: { label: "on WhatsApp or by email", href: "/services/private-car-and-driver/#car-enquiry" },
    },
    {
      id: "tour-offer",
      type: "paragraph",
      text: `Staying in Guangzhou for a few days? Our Guangzhou, Shunde & Foshan 5-day private tour includes both airport runs: our driver meets you at the airport or station on arrival and takes you back for your flight on day 5. You sleep four nights in one Guangzhou hotel with breakfast, and one private vehicle takes you through old and new Guangzhou, Shunde's Qinghui Garden and food streets, and Foshan's Ancestral Temple with the lion-dance show on your booking. Entry to Qinghui Garden, the Ancestral Temple and Nanfeng Ancient Kiln, bottled water and basic travel accident insurance are included, and there are no shopping stops. From ${bodyTourPrice(gzTour, 2, "en")} per person for two travellers, or from ${bodyTourPrice(gzTour, 6, "en")} each for six. See the Guangzhou 5-day route.`,
      link: { label: "See the Guangzhou 5-day route", href: "/tours/guangzhou-shunde-foshan-5-day-private-tour/" },
    },
    {
      id: "trust-copy",
      type: "paragraph",
      text: `Flying on from Guangzhou to Guilin, Zhangjiajie or Shanghai? Our planners can line up every airport, station and hotel handoff on the route, with one planner looking after you from the first reply to the last day. If Shanghai or Zhangjiajie is next, add one of our own guides by the full day (up to 8 hours): ${bodyGuideRate("shanghai", "en")} a day in Shanghai (${bodyGuidePeakRate("shanghai", "en")} on peak dates) and ${bodyGuideRate("zhangjiajie", "en")} in Zhangjiajie (${bodyGuidePeakRate("zhangjiajie", "en")} on peak dates); that is the guide only, with transport, tickets and meals separate. We are a licensed travel agency in Beijing (licence L-BJ10587), we never add shopping stops, and for a trip you pay a 30% deposit by Alipay or VBill with the balance due on arrival, with no card fees added. Tell us about the whole trip.`,
      link: { label: "Tell us about the whole trip", href: "/services/full-trip-support/" },
    },
    {
      id: "verify-heading",
      type: "heading",
      level: 2,
      text: "Before you leave for Baiyun Airport",
    },
    {
      id: "final-checklist",
      type: "list",
      ordered: true,
      items: [
        "Flight number, date, operating airline and T2 or T3",
        "That T1, Metro Airport South and intercity Baiyun Airport South are still closed to passengers",
        "Metro and intercity times for your date, including the last train; the last Gaozeng bus leaves T3 at 22:40",
        "The shuttle bay for your direction: Bay 30 at T2, Bay 60 at T3",
        "Where your bag is checked to, and whether you must collect and re-check it",
        "Entry, transit and customs rules for your passport and route",
        "The airline's check-in and boarding deadlines for that flight",
        "The airport's 24-hour service line: 020-96158 inside China, +86 20 96158 from abroad",
      ],
    },
    {
      id: "faq",
      type: "faq",
      title: "Quick answers before you set off",
      items: [
        {
          question: "Does my flight use Guangzhou Baiyun T2 or T3?",
          answer: "The exact flight on your latest booking decides it, not the airline in general. T1 stopped passenger operations on 7 May 2026, so confirm T2 or T3 with the operating airline or the airport's flight-status page on the day you travel.",
        },
        {
          question: "How do I get from Guangzhou Airport T2 to T3?",
          answer: "Take the airport's 24-hour landside shuttle from T2 East Coach Station, Bay 30: about 25 minutes on board, every 8–20 minutes depending on the hour. From T3 to T2 it leaves from Bay 60. While trains run, the intercity railway also connects Baiyun Airport North (T2) and Baiyun Airport East (T3) in one stop. There is no airside passenger train between the terminals.",
        },
        {
          question: "Is there a metro to Guangzhou Airport T3?",
          answer: "No. Metro Line 3 serves T2 at Airport North. For T3, take the intercity railway to Baiyun Airport East, or the metro to Gaozeng and then the Gaozeng–T3 Airport Line 2 branch bus, which runs from T3 only until 22:40 (official notice, 8 May 2026).",
        },
        {
          question: "Are Airport North and Baiyun Airport North the same station?",
          answer: "No. Airport North (T2) is the Metro Line 3 station; Baiyun Airport North (T2) is the Guangdong Intercity station. Search the full name, because the missing word changes the rail system.",
        },
        {
          question: "Is T3 a separate airport?",
          answer: "No. T2 and T3 are both terminals of Guangzhou Baiyun International Airport, code CAN. Flights show the terminal, and the two are linked by the landside shuttle and the intercity railway.",
        },
        {
          question: "When will Terminal 1 reopen?",
          answer: "The official notices we checked on 19 October 2026 give no reopening date. Until one is announced, plan only for T2 or T3.",
        },
        {
          question: "Can someone meet me at Baiyun Airport and take me to my hotel?",
          answer: "Yes, on request. Homeground's own drivers do private airport and station transfers in Guangzhou and in any other city in mainland China. Send your flight, terminal and hotel address; we reply within 12 hours, and before you pay we confirm in writing that a car is available for your time, plus the vehicle, meeting point and total price.",
        },
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning the whole transfer day",
      items: [
        { label: "Private car and driver in any mainland city", href: "/services/private-car-and-driver/", description: "Airport and station transfers, day hire and intercity trips, quoted in writing before you pay." },
        { label: "Guangzhou destination hub", href: "/destinations/guangzhou/", description: "Decide whether the city gets nights, then choose the terminal, the station and the base together." },
        { label: "Check whether a transit route is actually allowed", href: "/guides/china-240-hour-visa-free-transit-route-check/", description: "Airport transport and permission to enter China are separate questions." },
        { label: "Shenzhen airport, railway station or border port?", href: "/guides/shenzhen-airport-railway-station-border-port-selector/", description: "Pick the Shenzhen entry point that matches where you are going next." },
        { label: "Guangzhou to Hong Kong: compare the whole trip", href: "/guides/guangzhou-hong-kong-transport-route/", description: "Compare rail, road and ferry door to door before adding Hong Kong." },
        { label: "Plan China with older parents", href: "/guides/china-itinerary-with-older-parents/", description: "Build around walking, lifts, luggage and recovery time." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources, image credits and review record",
      items: [
        { label: "Notice of 4 May 2026: T1 closed to passengers from 7 May; T1 rail stops suspended; no reopening date; T2 → T3 shuttle about 25 minutes, every 8–20 minutes, transfer passengers only; T3 taxis at Gate 75, ride-hailing at P12", url: "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10798042.html", publisher: "People's Government of Guangzhou Municipality", reviewedAt: "2026-10-19" },
        { label: "T1 airlines relocated to T3 and T1 rail stops suspended from May 7", url: "https://www.eguangzhou.gov.cn/gzlatest/content/post_42957.html", publisher: "Foreign Affairs Office of Guangzhou Municipal Government", reviewedAt: "2026-08-10" },
        { label: "T1 closure follow-up and T3 passenger guide", url: "https://www.eguangzhou.gov.cn/gzlatest/content/post_43024.html", publisher: "Foreign Affairs Office of Guangzhou Municipal Government", reviewedAt: "2026-08-10" },
        { label: "Terminal-to-terminal transport: 24-hour shuttle, Bays 30 and 60, car-park buses at Bays 21 and 71", url: "https://www.baiyunairport.com/guide/terminals?urlKey=terminals", publisher: "Guangzhou Baiyun International Airport", reviewedAt: "2026-09-09" },
        { label: "Ground transport to and from the airport", url: "https://www.baiyunairport.com/traffic/tfa?urlKey=to-from-airport", publisher: "Guangzhou Baiyun International Airport", reviewedAt: "2026-09-09" },
        { label: "Airline and terminal directory", url: "https://www.baiyunairport.com/flight/airline?type=&urlKey=", publisher: "Guangzhou Baiyun International Airport", reviewedAt: "2026-09-09" },
        { label: "Same-day flight search and 24-hour service number", url: "https://www.baiyunairport.com/", publisher: "Guangzhou Baiyun International Airport", reviewedAt: "2026-09-09" },
        { label: "Official T3 transport guide from February 13; Airport South references superseded May 7", url: "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10690829.html", publisher: "People's Government of Guangzhou Municipality", reviewedAt: "2026-08-10" },
        { label: "Gaozeng–T3 Airport Line 2 branch: Exit B, Stop 74, about 15 minutes, CNY 2, from Gaozeng 6:15–23:15 and from T3 6:35–22:40 (notice of 8 May)", url: "https://www.eguangzhou.gov.cn/gzservice/content/post_42999.html", publisher: "Foreign Affairs Office of Guangzhou Municipal Government", reviewedAt: "2026-08-10" },
        { label: "140th Canton Fair: dates of the three phases (24 July 2026)", url: "https://www.mofcom.gov.cn/zwjg/jmxw/md/art/2026/art_784ba2c67efa4c66b430a26ad084ade8.html", publisher: "Ministry of Commerce website (Economic and Commercial Office, Chinese Embassy in Peru)", reviewedAt: "2026-10-19" },
        { label: "140th Canton Fair opens; about 340,000 overseas buyers attending across the session (15 October 2026)", url: "https://www.news.cn/fortune/20261015/ccf371df7833412893f6f6c3cad031c3/c.html", publisher: "Xinhua", reviewedAt: "2026-10-19" },
        { label: "Official Guangdong Intercity station naming approval", url: "https://td.gd.gov.cn/attachment/0/412/412307/3220064.pdf", publisher: "Department of Transport of Guangdong Province", reviewedAt: "2026-08-10" },
        { label: "Guangzhou South hub and airport intercity opening guide", url: "https://jtj.gz.gov.cn/xwdt/tpxw/content/post_10462631.html", publisher: "Guangzhou Municipal Transportation Bureau", reviewedAt: "2026-08-10" },
        { label: "Guangdong Intercity timetable change effective March 15 and current T3 rail access", url: "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10726817.html", publisher: "People's Government of Guangzhou Municipality", reviewedAt: "2026-08-10" },
        { label: "Hero image: Baiyun Airport East concourse by Tim Wu, CC BY-SA 4.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Concourse,_Baiyun_Airport_East_Railway_Station,_PRDIR_20251221.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-11" },
        { label: "Body image: Baiyun Airport East entry gates by Jacky Cheung, CC BY-SA 4.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Entry_Faregates_at_Baiyun_Airport_East_Railway_Station_20251112.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-11" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
