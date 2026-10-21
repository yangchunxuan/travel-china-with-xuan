import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "quick-answer-lead", type: "lead", text: "Yes, foreigners ride China's high-speed trains on a passport: you book in your passport name on 12306, scan the same passport at the gate, and need no paper ticket. Most tickets go on sale 15 days ahead, counting the travel day. Ticket gates close a few minutes before departure, at a time each station sets: 2, 3, 5 or 7 minutes at most stations, 12 at Badaling Great Wall. The things that actually go wrong are the wrong station in a city with several, passport details typed differently from the passport, and a suitcase bigger than the high-speed limit."},
    {
      id: "quick-answer",
      type: "callout",
      title: "Quick answer",
      tone: "decision",
      body: "Confirm the exact stations, book with the passenger’s passport details, carry that same original passport, and leave a sensible station buffer. Your electronic booking and passport normally replace a paper boarding ticket, but a passport may need a staffed lane. The local order of entry checks can vary, so follow signs and staff rather than memorising one gate layout.",
    },
    {
      id: "before-booking",
      type: "heading",
      level: 2,
      text: "Before booking: settle the route, station and passport details",
    },
    {
      id: "station-name-warning",
      type: "callout",
      title: "The city name is not enough",
      tone: "warning",
      body: "A city’s main station, South, West, East and North stations can be in completely different places. Check the full station name in Chinese and English, map the journey from your hotel to the departure entrance, and map the arrival station to the next hotel before paying.",
    },
    {
      id: "passport-details",
      type: "paragraph",
      text: "China Railway uses real-name tickets. For a foreign passport, enter the name and passport number according to the current 12306 passport-entry instructions, check nationality and expiry details, and complete identity verification before relying on the booking. The current official guidance allows automatic verification, a passport-page upload for manual review, or verification at a station ticket window. Do this early: a pending or failed verification can block purchase.",
    },
    {
      id: "passport-original",
      type: "paragraph",
      text: "Carry the same original, valid passport used for the ticket. A booking screenshot, itinerary sheet or reimbursement receipt is useful as a reference but is not the travel document used for entry and boarding. If a passport is renewed between booking and travel, resolve the document change with 12306 or a station before departure instead of assuming the new number will match.",
    },
    {
      id: "ticket-windows",
      type: "paragraph",
      text: "Most domestic tickets use a 15-day advance-sale period that includes the departure date. In calendar terms, a ticket for 15 August normally opens on 1 August, at the release time for the departure station; check that station’s current time in 12306 because it can change.",
    },
    {
      id: "beijing-shanghai-reservation-pilot",
      type: "paragraph",
      text: "A 2026 pilot covers more than 200 eligible trains on the Beijing–Shanghai High-Speed Railway and the Beijing–Shanghai Railway. As of 10 August 2026, it is still in transition: from 20 July through 29 August, requests are limited to journeys on or after 15 September. From 30 August, passengers can submit requests in the Railway 12306 app 17–60 days before departure, and the system attempts fulfilment 16–20 days before departure. A fulfilled request is not a confirmed ticket until it is paid by 23:00 that day; an unpaid order is cancelled. This is a limited pilot, not a nationwide 60-day sales window, and submitting a request never guarantees fulfilment.",
    },
    {
      id: "booking-channels",
      type: "heading",
      level: 2,
      text: "Where to buy: official channel, station window or a third party",
    },
    {
      id: "booking-channel-table",
      type: "table",
      caption: "Booking channels for a foreign visitor",
      columns: ["Channel", "Best for", "Important trade-off"],
      rows: [
        ["Railway 12306 website or app", "Travellers who want the official inventory, waitlist and direct change/refund tools", "Account and passport verification take preparation; use the genuine Railway 12306 platform"],
        ["Railway-station ticket window", "Travellers who need in-person identity help or are already at the correct station", "Queues and language support vary; bring the original passport and do not leave a popular train until the last minute"],
        ["Established third-party platform or ticket agency", "Travellers who value a familiar language, payment flow or support layer", "It may charge fees or submit only when railway sales open; China Railway says it does not handle problems caused by other websites"],
      ],
    },
    {
      id: "booking-confirmation",
      type: "paragraph",
      text: "Whichever channel you use, do not confuse a request, pre-order or waitlist with an issued ticket. Confirm the train number, travel date, full departure and arrival station names, seat class, carriage and seat, passenger name, passport number, and a successful payment or ticket status.",
    },
    {
      id: "seat-class",
      type: "heading",
      level: 2,
      text: "Second, first or business class?",
    },
    {
      id: "seat-class-table",
      type: "table",
      caption: "Common seat classes on mainland China high-speed trains",
      columns: ["Class", "Typical layout", "Choose it when"],
      rows: [
        ["Second class", "Usually 3+2 seats across", "Value matters most and an ordinary reserved seat is sufficient"],
        ["First class", "Usually 2+2 seats across with more personal space", "A longer ride, larger body size or easier movement is worth the extra fare"],
        ["Business class", "Usually 2+1 or 1+1 with much more space; service varies by train", "Privacy, rest or mobility is the priority and the fare fits the trip"],
      ],
    },
    {
      id: "seat-variation",
      type: "paragraph",
      text: "These are typical layouts, not promises for every trainset. Premium first, sleeper and other products appear only on some services. Compare the exact train and fare rather than assuming the most expensive class is necessary; second class is the standard practical choice for many visitors.",
    },
    {
      id: "station-process",
      type: "heading",
      level: 2,
      text: "From station arrival to your seat",
    },
    {
      id: "station-flow",
      type: "list",
      ordered: true,
      items: [
        "Arrive at the exact station and find the railway departure entrance, not only a metro exit or taxi drop-off.",
        "Security: put bags through the X-ray machine and pass the passenger screening required for station entry.",
        "Identity and ticket verification: present the original passport used to book. Try the indicated passport-capable gate; use the staffed lane if the document is not read.",
        "Waiting: match the train number and departure time to the main board, then find the assigned waiting area or gate. Platforms may be announced later.",
        "Ticket gate: when checking opens, present the passport again at the automatic or staffed gate and follow the platform and carriage signs.",
        "Board: stand near the carriage marker, let arriving passengers off, enter the correct carriage and place luggage without blocking the aisle or doors.",
      ],
    },
    {
      id: "flow-variation",
      type: "paragraph",
      text: "Some stations combine or reverse parts of the entrance, security and identity-check sequence. Automatic passport reading also differs by station and document. The reliable anchors are the original passport, train number, departure time, gate and staff instructions—not a screenshot of another station’s layout.",
    },
    {id: "arrival-time", type: "callout", tone: "decision", title: "How early should you arrive?", body: "Earlier than the gate closes. China Railway explained in 2023 that each station sets its own cut-off from the distance between gates and platforms: Zhengzhou East stops checking 3 minutes before departure, parts of Xinxiang 7, Badaling Great Wall 12. Checking usually starts about 20 minutes before departure at the station where the train begins its run, and China Railway suggests arriving at least 25–30 minutes early. On a first trip, allow about 45–60 minutes after reaching the correct station building, and more for a huge station, holiday crowds, passport help at a staffed lane, children or bulky luggage."},
    {id: "traps-heading", type: "heading", level: 2, text: "Seven mistakes that cost first-time riders their train"},
    {id: "traps-list", type: "list", ordered: true, items: ["Going to the wrong station. Beijing, Shanghai and Xi'an each have several, often far apart. Check the full station name on the booking against your hotel and your route there.", "Typing the passport differently. The ticket is in your passport name and number; a different spelling, order or digit can stop you at the gate. Follow 12306's passport-entry rules exactly.", "Leaving identity verification to the last day. 12306 verifies a foreign passport automatically, from an uploaded photo page, or at a station ticket window. No processing time is published, so do it as soon as you register.", "Treating departure time as the deadline. The gate closes 2 to 12 minutes earlier, depending on the station.", "Bringing a suitcase over 130 cm. On high-speed trains each item's length, width and height must add up to no more than 130 cm, and each adult may carry 20 kg free.", "Renewing the passport after booking. The ticket stays tied to the old number; ask 12306 or the station before you travel.", "Waiting for holiday tickets. Sales open 15 days ahead, counting the travel day: for a holiday journey, count back from the travel date and book on the first day of sale."]},
    {
      id: "on-platform",
      type: "paragraph",
      text: "Boarding can be brief at an intermediate stop. Keep the passport and confirmation accessible, watch the train number rather than only the destination, and move to the correct carriage marker before the train arrives. On board, use the carriage and seat printed in the booking; do not assume an apparently empty seat remains free for the whole route.",
    },
    {
      id: "luggage-security",
      type: "heading",
      level: 2,
      text: "Luggage and security: the written limit is not the whole problem",
    },
    {
      id: "luggage-rule",
      type: "paragraph",
      text: "Current China Railway guidance sets free carry-on luggage at 20 kg for most passengers and 10 kg for children, with the sum of length, width and height of each item limited to 130 cm on EMU high-speed trains; a single item may not exceed 20 kg. Foldable wheelchairs used by disabled passengers are treated separately. Check the exact train and current rules if you are near a limit or need consignment or luggage-transfer service.",
    },
    {
      id: "luggage-reality",
      type: "paragraph",
      text: "A bag can meet the formal limit and still be hard to manage. You usually lift and move it yourself through screening, long concourses, escalators or lifts, the platform gap and the carriage. Overhead racks suit smaller cases; larger storage areas are finite and differ by train. Keep medicines, passport, valuables and a small arrival kit with you, and never leave a suitcase in an aisle or doorway.",
    },
    {
      id: "restricted-items",
      type: "callout",
      title: "Check toiletries and batteries before leaving the hotel",
      tone: "warning",
      body: "The current national catalog bans weapons, explosives, many flammable, toxic and corrosive substances and restricts everyday items. Examples reviewed on 10 August 2026 include clearly marked power banks or lithium batteries of no more than 100 Wh each; nail polish/remover up to 50 ml total; flammable perfume, spray or gel in non-pressurised containers up to 100 ml per container, one of each type; and self-pressurised products such as hairspray up to 150 ml each, one of each type and 600 ml total. Special periods can apply tighter controls. Check the latest official catalog rather than relying on an old packing blog.",
    },
    {
      id: "changes",
      type: "heading",
      level: 2,
      text: "Changes, refunds and a missed train",
    },
    {
      id: "changes-principles",
      type: "list",
      items: [
        "A ticket can normally be changed once, subject to seats being available. The route, timing and ticket status determine which changes the system permits.",
        "Refund fees are time-based. Under the rules reviewed on 10 August 2026, the standard scale for ordinary advance-sale tickets is no fee 8 days or more before departure, then 5%, 10% or 20% as departure gets closer. The Beijing–Shanghai reservation pilot is an explicit exception: once a reservation is fulfilled and paid, a refund requested 8–20 days before departure costs 5%; less than 8 days before departure, the existing advance-sale rules apply. Changed and other special tickets can have additional conditions.",
        "Online, cash, printed reimbursement-receipt and third-party bookings may follow different handling paths even when the underlying railway rule is the same.",
        "If the railway changes or cancels the service, follow the official notice; railway-responsibility arrangements are different from a voluntary change.",
      ],
    },
    {
      id: "missed-train",
      type: "callout",
      title: "If the train has departed",
      tone: "warning",
      body: "Go immediately to a railway service or ticket-change window. A change to another service may still be possible under current rules if seats exist, but it is not automatic and later-date changes can carry a fee. Do not buy a second ticket until you understand the status of the first, and do not assume an endorsed ticket remains refundable after departure.",
    },
    {
      id: "families-mobility",
      type: "heading",
      level: 2,
      text: "With children, older parents or large bags",
    },
    {
      id: "children",
      type: "paragraph",
      text: "Children’s railway tickets are age-based. On the travel date, a child aged 6 or older but under 14 needs a child discount ticket; a child aged 14 or over needs a full-price ticket. Each ticketed adult may declare one child under 6 to travel free without a separate seat; additional under-6 children or any child needing a seat require a child ticket. Declare the free child during booking and carry the original identity document used for the child’s travel record.",
    },
    {
      id: "mobility-planning",
      type: "paragraph",
      text: "For older travellers or anyone with limited mobility, measure the transfer by walking, lifts, waiting and toilet access—not only train time. Official rules require priority and necessary human assistance for passengers who need help, and some large stations offer service counters or wheelchairs, but the facility and booking process vary. Check with 12306 or the specific station in advance and keep the group’s train details together.",
    },
    {
      id: "group-luggage",
      type: "paragraph",
      text: "If one adult must manage two children and several large cases, a technically valid booking can still be a poor plan. Reduce bags, split lifting responsibility, avoid a very tight connection and arrange the final hotel transfer before arrival. First class may improve seat space, but it does not guarantee unlimited luggage storage or eliminate long walks through the station.",
    },
    {
      id: "train-or-flight",
      type: "heading",
      level: 2,
      text: "When high-speed rail wins—and when a flight may be better",
    },
    {
      id: "mode-comparison",
      type: "comparison",
      title: "Compare the complete travel day",
      columns: [
        {
          heading: "High-speed rail often fits",
          items: [
            "The rail stations are convenient for both hotels",
            "A direct or simple train runs at a useful time",
            "You value a city-centre arrival and keeping luggage with you",
            "The train journey is short or medium enough to preserve the day",
          ],
        },
        {
          heading: "A flight or another option may fit",
          items: [
            "The rail journey is very long, indirect or badly timed",
            "The airport is much closer to the actual start or finish",
            "A nonstop flight avoids a difficult rail transfer",
            "Mobility, luggage or a late arrival makes a private transfer more workable",
          ],
        },
      ],
    },
    {
      id: "door-to-door",
      type: "paragraph",
      text: "Compare hotel door to hotel door: local transfer, recommended buffer, security and waiting, scheduled journey, arrival exit, bag collection if flying, and the final transfer. High-speed rail is not always faster; a short flight is not automatically the shorter travel day either.",
    },
    {
      id: "checklist",
      type: "heading",
      level: 2,
      text: "Departure checklist",
    },
    {
      id: "departure-checklist",
      type: "list",
      items: [
        "Exact departure and arrival station names checked on a map",
        "Confirmed ticket—not only a request, waitlist or unpaid order",
        "Passenger name and passport number checked against the original document",
        "Original passport packed where it is easy to reach",
        "Train number, date, time, carriage, seat and gate or waiting-area information saved",
        "Route and realistic travel time to the correct station entrance checked",
        "Luggage manageable by the people travelling and within current limits",
        "Power banks, sprays, liquids and other doubtful items checked against the current official catalog",
        "Children’s tickets or free-child declarations and documents confirmed",
        "Arrival transfer, hotel address and a fallback contact available offline",
      ],
    },
    {id: "sale-heading", type: "heading", level: 2, text: "Trains are the easy part when the rest is arranged"},
    {id: "sale-copy", type: "paragraph", text: "Our multi-city private tours include the long train journeys: the 8-day route takes second-class seats from Beijing to Xi'an, and a driver takes you to every station and meets you at the other end. The sights at each stop open their tickets later than the trains do. The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time, in each visitor's own passport name, and on 1 October 2025, the first day of China's National Day holiday, its booking page already showed 2 to 7 October fully booked. Hand the booking to us and pay at least 8 days before your visit, and our booking guarantee covers it: if the booking fails, we refund the service fee and the ticket money in full. Inside those 8 days the guarantee no longer applies."},
    { id: "handoff-options", type: "comparison", title: "What we can arrange", columns: [
      { heading: "A private car and driver", body: "A private car between your hotel and the station on your ticket, in Beijing, Shanghai, Xi'an or any other city in mainland China.", items: ["Our own drivers.", "Price confirmed in writing before you pay."] },
      { heading: `Sight bookings: ${bodyReservationFee("en")} per person`, body: "Per attraction, plus the ticket at face value, booked in each traveller's own passport name: the Forbidden City, the Terracotta Warriors, the Chengdu panda base and more.", items: ["Request and pay at least 8 days before your visit and our booking guarantee covers it: if the booking fails, the fee and ticket money are refunded in full.", "Inside those 8 days the guarantee no longer applies."] },
      { heading: `The whole trip: from ${bodyTourPrice(tour8, 6, "en")} per person`, body: `Our 8-day Beijing, Xi'an and Shanghai private tour is ${bodyTourPrice(tour8, 2, "en")} per person for two and ${bodyTourPrice(tour8, 6, "en")} for six. The 14-day route with Chengdu and Guilin is ${bodyTourPrice(tour14, 2, "en")} per person for two.`, items: ["Four-star hotels with breakfast, a private guide and car on touring days, every transfer, the trains and flights between cities, and the named admissions.", "If we cannot get your Forbidden City or Tiananmen booking, we refund everything you paid, provided we have your passport details at least 8 days before the Forbidden City visit."] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "Book it with us", items: [{label: "See the 8-day Beijing, Xi'an and Shanghai route", href: "/tours/beijing-xian-shanghai-8-day-private-tour/", description: "Day-by-day plan, hotels and the published price table."}, {label: "Ask for an airport or station pickup", href: "/services/private-car-and-driver/", description: "Any mainland city. Send your route, date and luggage."}, {label: "See the attractions we book", href: "/services/china-attraction-reservations/", description: "Release times, prices and the guarantee, attraction by attraction."}, {label: "Plan the whole trip with a planner", href: "/services/full-trip-support/", description: "Tell us your dates and budget; the first brief is free."}]},
    {id: "contact-homeground", type: "callout", tone: "decision", title: "How booking works", body: "Send your dates, the number of travellers and what you want to see by WhatsApp or email from any page above. A planner replies within 12 hours, and you get a written quote before you pay anything; the same planner stays with you from that first reply to your last day. You pay a 30% deposit by card through a secure VBill link and the rest after you arrive. Homeground China is a licensed travel agency (L-BJ10587); the guides and drivers are our own, and we never stop at shops."},
    {
      id: "faq",
      type: "faq",
      title: "High-speed train questions answered",
      items: [
        {
          question: "How far in advance can I book China high-speed train tickets?",
          answer: "Most domestic tickets use a 15-day advance-sale period that includes the departure date, so a ticket for 15 August normally opens on 1 August at the departure station's release time. A separate 2026 pilot on the Beijing–Shanghai corridor lets passengers submit requests 17–60 days ahead in the Railway 12306 app, but a fulfilled request is not a ticket until it is paid.",
        },
        {
          question: "Do I need a paper ticket to board a train in China?",
          answer: "Normally no. Your electronic booking and the same original passport used to book replace a paper boarding ticket, though a passport may need a staffed lane at the ticket gate. A booking screenshot or reimbursement receipt is a reference, not the travel document.",
        },
        {
          question: "How early should I arrive at a Chinese railway station?",
          answer: "China Railway suggests arriving at least 25–30 minutes before departure. Ticket checking usually starts about 20 minutes ahead at the station where the train begins its run, and stops 2 to 12 minutes before departure, depending on the station. On a first trip, allow about 45–60 minutes after reaching the correct station building, and more for a huge unfamiliar station, holiday crowds, passport assistance, children, older travellers or bulky luggage.",
        },
        {
          question: "What is the luggage allowance on China's high-speed trains?",
          answer: "Current China Railway guidance allows free carry-on luggage of 20 kg for most passengers and 10 kg for children, with the sum of length, width and height of each item limited to 130 cm on EMU high-speed trains and no single item over 20 kg. You usually lift and move bags yourself through screening, concourses and the carriage.",
        },
        {
          question: "Do children need a train ticket in China?",
          answer: "It depends on age on the travel date: a child aged 6 or older but under 14 needs a child discount ticket, and a child aged 14 or over needs a full-price ticket. Each ticketed adult may declare one child under 6 to travel free without a separate seat; additional under-6 children or any child needing a seat require a child ticket.",
        },
        {
          question: "What is the refund fee for a Chinese train ticket?",
          answer: "Refund fees are time-based. Under the rules reviewed on 10 August 2026, ordinary advance-sale tickets carry no fee 8 days or more before departure, then 5%, 10% or 20% as departure gets closer. A ticket can normally be changed once, subject to seats being available.",
        }, {question: "How many minutes before departure do Chinese train stations stop checking tickets?", answer: "Each station sets its own time from the distance between gates and platforms: 2, 3, 5 or 7 minutes at most stations, and 12 minutes at Badaling Great Wall. China Railway suggests arriving at least 25–30 minutes early; on a first trip, allow 45–60 minutes. Security comes before the gate, so clear it before the gate closes."}, {question: "How long does 12306 take to verify a foreign passport?", answer: "12306 does not publish a processing time. It verifies automatically when it can, or from a photo of the passport data page; if your account stays pending, take the passport to a station ticket window and have it verified there. Do it well before you need to buy."}],
    },
    {
      id: "related-guides",
      type: "internal-links",
      title: "Plan the journey around the train",
      items: [
        {
          label: "Compare train and flight time on a three-city route",
          href: "/guides/beijing-zhangjiajie-shanghai-transport/",
          description: "See why scheduled travel time is only one part of a transfer day.",
        },
        {
          label: "Check whether your China itinerary is too rushed",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description: "Test hotel changes, recovery time and door-to-door transfers together.",
        },
        {
          label: "Decide when a guide or local support is useful",
          href: "/guides/do-you-need-a-tour-guide-in-china/",
          description: "Separate independent travel days from the points where help adds value.",
        },
        { label: "Match the hub to the correct slope", href: "/guides/changbai-mountain-hubs-to-park-gates/", description: "Use a confirmed North or West Scenic Area booking to choose Changbaishan Station, Changbaishanxi Station or Changbaishan Airport and plan the road transfer." },
        { label: "Plan a child-compatible route", href: "/guides/china-itinerary-with-young-children/", description: "Design a China route for young children by sleep, food, toilets, carrying load, hotel stability and current child-ticket rules." },
        { label: "Compare Guilin to Yangshuo", href: "/guides/guilin-yangshuo-transport-route/", description: "Compare rail, road transfer and river travel between Guilin and Yangshuo by station, airport, hotel, luggage, direction and return plan." },
      ],
    },
    {
      id: "official-sources",
      type: "sources",
      title: "Official sources and review date",
      items: [
        {label: "How many minutes before departure do stations stop checking tickets? (from China Railway)", url: "https://m.gmw.cn/toutiao/2023-04/06/content_1303333333.htm", publisher: "China Youth Daily, on Guangming Online", reviewedAt: "2026-10-20"},
        {label: "Palace Museum ticketing: release time and real-name rules", url: "https://www.dpm.org.cn/subject_booking/", publisher: "The Palace Museum", reviewedAt: "2026-08-22"},
        {label: "Palace Museum fully booked for 2 to 7 October on the first day of the 2025 National Day holiday", url: "https://www.yicai.com/news/102851899.html", publisher: "Yicai", reviewedAt: "2026-10-19"},
        {
          label: "China Railway 12306 English ticketing, change, refund, child and luggage FAQ",
          url: "https://www.12306.cn/en/faq.html?item=2",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Guide to ticket purchase, identity verification and station entry for foreign travellers",
          url: "https://www.enghunan.gov.cn/hneng/Services/Live/Transportation/RailwayStations/202505/t20250529_33680117.html",
          publisher: "Hunan Provincial Government; source: Ministry of Commerce of the People’s Republic of China",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Foreign-passport name and number entry instructions",
          url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/passportInstruction/passport-entry-instructions.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Official 15-day ticket advance-sale period, including the departure date",
          url: "https://www.12306.cn/mormhweb/zxdt/202205/t20220531_37508.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Official station ticket-release-time lookup",
          url: "https://www.12306.cn/index/view/infos/sale_time.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Current ticket refund and change instructions",
          url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/info/orderWarmTips.html?hiddenNav=true&tabIndex=6",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Current child ticket rules",
          url: "https://kyfw.12306.cn/otn/gonggao/children.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Catalogue of items prohibited or restricted for railway passengers",
          url: "https://www.nra.gov.cn/xxgk/gkml/ztjg/gfzd/gfxw/202205/t20220527_326566.shtml",
          publisher: "National Railway Administration and Ministry of Public Security",
          reviewedAt: "2026-08-10",
        },
        {
          label: "2026 Beijing–Shanghai advance ticket-reservation pilot",
          url: "https://english.beijing.gov.cn/travellinginbeijing/transportation/railway/202607/t20260720_4772390.html",
          publisher: "Beijing International Web Portal; source: China Railway",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Official clarification of typical high-speed train seat layouts",
          url: "https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202507/t20250721_4153521.html",
          publisher: "Beijing International Web Portal; source: China Railway",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Railway passenger rules on priority and necessary human assistance",
          url: "https://xxgk.mot.gov.cn/jigou/fgs/202211/t20221117_3710710.html",
          publisher: "Ministry of Transport of the People’s Republic of China",
          reviewedAt: "2026-08-10",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
