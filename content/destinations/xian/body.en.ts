import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "For most first-time visitors, three nights is the balanced Xi'an stay. It normally creates two protected sightseeing days: one for the Terracotta Warriors and Lishan Garden in Lintong, and one for Xi'an itself. Two nights can work when the priority is narrow. One night is a fragile stopover rather than a rounded visit. Mount Hua needs a separate full day and usually pushes the practical minimum to four nights.",
    },
    {
      id: "role-heading",
      type: "heading",
      level: 2,
      text: "Xi'an is the historical core and rail hinge of many first China routes",
    },
    {
      id: "role-1",
      type: "paragraph",
      text: "The main planning mistake is treating every Xi'an sight as if it sat around one old-city square. It does not. The City Wall, Bell and Drum Towers and the Muslim Quarter approaches form a central cluster. Shaanxi History Museum, the Giant Wild Goose Pagoda and the modern Tang-themed evening district form a second cluster south of the wall. The Terracotta Warriors and Lishan Garden are in Lintong District, outside the central hotel area. Mount Hua lies farther east and is an independent excursion or overnight extension.",
    },
    {
      id: "role-2",
      type: "paragraph",
      text: "Xi'an is strongest when it gives a first China journey a clear inland historical layer without forcing a detour. Beijing supplies a later imperial and national frame, Shanghai often supplies the coastal gateway, and Chengdu adds a different regional pace. Xi'an contributes early imperial archaeology, a legible walled-city structure and a useful position on major rail corridors — but only when it receives at least one protected day and the transfer days are counted honestly.",
    },
    {
      id: "who-heading",
      type: "heading",
      level: 2,
      text: "Who should prioritise Xi'an?",
    },
    {
      id: "who-table",
      type: "table",
      caption: "Xi'an fit by traveller type",
      columns: ["Traveller", "Xi'an fit", "Minimum planning condition", "Main risk"],
      rows: [
        [
          "History-first visitor",
          "Very strong",
          "Protect Lintong and one city cluster as different tasks",
          "Turning the stay into a dynasty checklist",
        ],
        [
          "Archaeology-focused visitor",
          "Very strong",
          "Reserve the museum and choose museum depth deliberately",
          "Confusing the pits, Lishan Garden and the central museums",
        ],
        [
          "Family with school-age children",
          "Strong when paced",
          "One major story per half-day and an easy evening",
          "Queues, too many museums and no recovery",
        ],
        [
          "Short first-China route",
          "Strong if it lies on the route line",
          "Give Xi'an at least one protected full day",
          "Treating arrival or departure as a full visit",
        ],
        [
          "Food- and neighbourhood-first traveller",
          "Moderate to strong",
          "Pair the old city with another distinct interest",
          "Reducing the city to one market street",
        ],
        [
          "Older or limited-mobility traveller",
          "Workable with support",
          "Verify entrances, lifts, vehicle access and standing time",
          "Choosing atmosphere before the curb-to-room chain",
        ],
      ],
    },
    {
      id: "who-1",
      type: "paragraph",
      text: "Xi'an is particularly efficient between Beijing and Chengdu. It can also anchor a heritage corridor toward Luoyang or Pingyao. It is least convincing when an overloaded route leaves only a late arrival and an early departure.",
    },
    {
      id: "nights-heading",
      type: "heading",
      level: 2,
      text: "Count complete days before counting attractions",
    },
    {
      id: "nights-1",
      type: "paragraph",
      text: "Two consecutive hotel nights normally create one protected full day between them; three nights normally create two. Arrival, departure and intercity-transfer days start at zero sightseeing credit and earn a usable half-day only after the complete door-to-door chain is known. Landing at Xi'an Xianyang International Airport is not the same as reaching a central hotel, and arriving at Xi'an North is not the same as checking in near the Bell Tower.",
    },
    {
      id: "nights-table",
      type: "table",
      caption: "Xi'an stay lengths and what each protects",
      columns: [
        "Xi'an stay",
        "Protected full days",
        "What can realistically fit",
        "What usually fails",
      ],
      rows: [
        [
          "1 night",
          "0",
          "One carefully chosen city half-day",
          "The Terracotta Warriors plus a proper city visit; any delay removes the plan",
        ],
        [
          "2 nights",
          "1",
          "A full Lintong day, with one light central or south-side block",
          "Both major city clusters at depth; Mount Hua",
        ],
        [
          "3 nights",
          "2",
          "Lintong plus one full city day, with evenings near the hotel",
          "Old city, south side and Lintong all at maximum depth",
        ],
        [
          "4 nights",
          "3",
          "Lintong, a balanced city day and a separate Mount Hua or deeper museum day",
          "Assuming Mount Hua is immune to weather or operating changes",
        ],
        [
          "5 nights or more",
          "4+",
          "A slower city reading, specialist museums, recovery or a Mount Hua overnight",
          "Filling every day merely because the nights exist",
        ],
      ],
    },
    {
      id: "nights-2",
      type: "paragraph",
      text: "One night works only for a single purpose. An early arrival may leave a central old-city afternoon and evening; a late departure after an early start may permit Lintong, but luggage, queues, traffic and the outbound terminal make that plan fragile. Two nights usually mean one complete day, and most first visitors give it to the Terracotta Warriors and Lishan Garden.",
    },
    {
      id: "nights-3",
      type: "paragraph",
      text: "Three nights normally provide two complete days. Give one to Lintong and use the other for Xi'an itself, choosing depth rather than racing every cluster. A common balance is an old-city morning followed by a south-side afternoon and evening, but the museum reservation, weather, walking tolerance and hotel base may change the order.",
    },
    {
      id: "hua-callout",
      type: "callout",
      title: "Adding Mount Hua: add a day, not a bullet point",
      body: "Huashan North station is only the gateway. Mountain transfer, entry, route choice, queues, weather, ropeway or hiking decisions and the return all still matter. Treat the mountain as a separate full day or an overnight extension. When Lintong and a meaningful city day are already priorities, four nights is the practical baseline.",
      tone: "decision",
    },
    {
      id: "stay-heading",
      type: "heading",
      level: 2,
      text: "Where to stay: choose the base where ordinary nights end",
    },
    {
      id: "stay-1",
      type: "paragraph",
      text: "At hub level the choice is between a Bell Tower or central old-city base, the Yongningmen edge and the Dayanta or Xiaozhai side. “Inside the City Wall” is not precise enough: the exact gate, metro exit, road crossing and vehicle entrance matter more than the marketing label.",
    },
    {
      id: "stay-table",
      type: "table",
      caption: "Xi'an base areas compared by job",
      columns: ["Base", "Best for", "What it shortens", "Main trade-off"],
      rows: [
        [
          "Bell Tower / central inside the wall",
          "A first visit, old-city evenings, a short stay",
          "Bell and Drum Towers, Muslim Quarter approaches, central orientation",
          "Crowds, noise and difficult curb access at some properties",
        ],
        [
          "Yongningmen / South Gate",
          "Travellers splitting the old city and the south side",
          "City Wall access and a simpler north–south position",
          "Not every “South Gate” hotel is equally close or luggage-friendly",
        ],
        [
          "Dayanta / Xiaozhai",
          "Museum, pagoda and repeated south-side evenings",
          "Shaanxi History Museum, the Giant Wild Goose Pagoda and the Tang-themed evening zone",
          "A longer return after old-city nights",
        ],
        [
          "Near Xi'an North",
          "A very late arrival or a very early train only",
          "One specific rail transfer",
          "Weak for ordinary sightseeing and evenings",
        ],
        [
          "Near XIY airport",
          "A flight-protection night",
          "An early departure or disruption recovery",
          "It is not a Xi'an sightseeing base",
        ],
      ],
    },
    {
      id: "stay-2",
      type: "paragraph",
      text: "Bell Tower is usually the default for a short first visit. Yongningmen is a strong compromise when the exact hotel has clear access. Dayanta or Xiaozhai becomes better when the south-side museum and evening cluster repeats. With children, older parents or heavy bags, the complete curb–reception–lift–room chain can outweigh a more atmospheric lane.",
    },
    {
      id: "stay-links",
      type: "internal-links",
      title: "Compare Xi'an bases in the detailed stay guide",
      items: [
        {
          label: "Where to stay in Xi'an: City Wall, Bell Tower or Dayanta?",
          href: "/guides/xian-where-to-stay-city-wall-or-dayanta/",
          description:
            "Property-level comparison of entrances, night patterns, luggage access and metro exits.",
        },
        {
          label: "Is the hotel really near the metro?",
          href: "/guides/china-hotel-near-metro/",
          description:
            "Audit the useful exit, wall or road crossing and lobby route instead of trusting a map radius.",
        },
        {
          label: "Verify an actually usable accessible room",
          href: "/guides/china-accessible-hotel-room-verification/",
          description:
            "Request room-specific measurements and evidence for the complete street-to-room route.",
        },
        {
          label: "Foreign-guest booking, registration and refusal recovery",
          href: "/guides/foreigners-china-hotel/",
          description:
            "Separate the national rule, a platform listing and what the named property can execute at check-in.",
        },
        {
          label: "Choose the last night before an international flight",
          href: "/guides/china-last-night-before-international-flight/",
          description:
            "Compare a central Xi'an night with an XIY-side buffer from the exact flight and fallback chain.",
        },
      ],
    },
    {
      id: "stay-quote-handoff",
      type: "callout",
      title: "Need a hotel-area and room-fit check?",
      tone: "decision",
      body: "Use the general planner only for a first contact. In the initial form, share travel dates, the city or areas being compared, traveller and room counts, and an approximate accommodation budget if useful. You may say that you want to discuss family or accessibility arrangements later, but do not submit children's ages, mobility, medical or accessibility details, passport or other document information, booking or payment records, or identifiable material intended for a hotel, DMC or other supplier. A planner can arrange a separate human follow-up; those details are discussed only when appropriate and with suitable consent. Nothing is shared with a supplier without separate, purpose-specific consent, and this is not live inventory or a guarantee of price, availability, guest acceptance, room type or accessibility.",
    },
    {
      id: "gateways-heading",
      type: "heading",
      level: 2,
      text: "XIY airport and Xi'an's railway stations",
    },
    {
      id: "gateways-1",
      type: "paragraph",
      text: "The relationships below are stable orientation, not a timetable. Recheck the booked flight or train, the terminal, the station and the live route shortly before travel.",
    },
    {
      id: "gateways-table",
      type: "table",
      caption: "Xi'an gateways and the planning decision each forces",
      columns: [
        "Arrival or departure point",
        "Geographic role",
        "Relationship to common bases",
        "Planning decision",
      ],
      rows: [
        [
          "Xi'an Xianyang International Airport (XIY)",
          "Northwest of central Xi'an, on the Xianyang side",
          "Airport rail or road transfer still needs a complete terminal-to-hotel plan",
          "Use the terminal shown by the airline; the airport now includes Terminal 5 and allocation can change",
        ],
        [
          "Xi'an North Railway Station",
          "Major high-speed hub north of the centre",
          "Bell Tower and Yongningmen remain city transfers, not station-adjacent walks",
          "Search the exact date and station pair in 12306",
        ],
        [
          "Xi'an Railway Station",
          "Immediately north of the old-city wall area",
          "Closer to the central city than Xi'an North, but serves a different train set",
          "Use it only when the ticket says Xi'an; never navigate to “the main station” by habit",
        ],
        [
          "Xi'an East Railway Station",
          "Eastern hub, in use since 30 June 2026",
          "Can materially change an east-side arrival or departure",
          "Copy the exact station from the ticket; older guides may omit it entirely",
        ],
        [
          "Huashan North Railway Station",
          "External gateway in Huayin",
          "Not a Xi'an urban station",
          "Build the mountain transfer and the return separately",
        ],
      ],
    },
    {
      id: "gateways-2",
      type: "paragraph",
      text: "For rail, search the travel date in China Railway 12306 and save the complete station pair. A label such as “Xi'an to Beijing” is insufficient: the same city has several terminals, and a newer hub can make plausible older transfer advice wrong.",
    },
    {
      id: "clusters-heading",
      type: "heading",
      level: 2,
      text: "Four clusters with four different jobs",
    },
    {
      id: "cluster-1-heading",
      type: "heading",
      level: 3,
      text: "City Wall, Bell and Drum Towers, Muslim Quarter approaches",
    },
    {
      id: "cluster-1",
      type: "paragraph",
      text: "This is the old-city orientation cluster. Use it to understand the wall, gates and central avenues, then let the evening finish near food and the hotel. The Bell Tower is a navigation node, not the whole old city. A focused wall section often teaches more than racing the complete circuit: choose the gate that fits the day, check current access and distinguish historic fabric, conservation repair and modern visitor additions. The busiest commercial lane is not a complete account of Xi'an's Muslim communities or food culture.",
    },
    {
      id: "cluster-2-heading",
      type: "heading",
      level: 3,
      text: "Shaanxi History Museum, Giant Wild Goose Pagoda and the Tang district",
    },
    {
      id: "cluster-2",
      type: "paragraph",
      text: "This south-side cluster broadens the story beyond the Qin mausoleum. It works well as a museum morning followed by a pagoda-area afternoon or evening, but only when the reservation exists and the correct venue has been selected: the Main Building near Xiaozhai and the separate Qin-Han gallery are not interchangeable. The surrounding Tang-themed district is a contemporary evening environment, not proof that every visible building is surviving Tang fabric.",
    },
    {
      id: "dayanta-figure",
      type: "figure",
      src: "/images/destinations/xian/dayanta-1200.webp",
      alt: "The Giant Wild Goose Pagoda in Xi'an seen across a reflecting pool with autumn ginkgo trees on both sides.",
      width: 1200,
      height: 750,
      caption:
        "The south-side cluster sits well away from the walled centre. Treat it as its own half-day rather than an add-on to an old-city morning.",
    },
    {
      id: "cluster-3-heading",
      type: "heading",
      level: 3,
      text: "Lintong: Terracotta Warriors and Lishan Garden",
    },
    {
      id: "cluster-3",
      type: "paragraph",
      text: "Lintong is a separate excursion from central Xi'an. The Emperor Qinshihuang's Mausoleum Site Museum covers both the Terracotta Warriors pits area and Lishan Garden on one admission, with a free shuttle between them, and reservation uses passport or ID details through official channels. Add the journey from Xi'an, document checks, walking, queues, meals and the return to the substantial time the site itself requires.",
    },
    {
      id: "terracotta-figure",
      type: "figure",
      src: "/images/destinations/xian/terracotta-pit-one-1200.webp",
      alt: "The interior of Pit 1 at the Terracotta Warriors museum in Lintong, with ranks of figures under the vaulted hall.",
      width: 1200,
      height: 750,
      caption:
        "Pit 1 alone is a long walk under one roof. Protecting most of a day for Lintong is a scale decision, not caution.",
    },
    {
      id: "cluster-3b",
      type: "paragraph",
      text: "Huaqing Palace can be paired with Lintong when it is a genuine priority and the group accepts a longer day. It is separately ticketed and can reduce Lishan Garden time or push the return late, so decide which story matters before buying a bundle.",
    },
    {
      id: "cluster-4-heading",
      type: "heading",
      level: 3,
      text: "Mount Hua: an external extension, not a fourth city cluster",
    },
    {
      id: "cluster-4",
      type: "paragraph",
      text: "Weather, visibility, seasonal daylight, trail and ropeway operation, ticket controls and the exact rail connection can all change the usable plan. Choose a route appropriate to the group rather than assuming the most dramatic online photograph represents an ordinary first visit. A day trip works when the first and last transport chains are confirmed and the group accepts an early start; an overnight near Huashan reduces return pressure but adds a hotel move.",
    },
    {
      id: "sight-links",
      type: "internal-links",
      title: "Open the detailed guide when you are ready to book",
      items: [
        {
          label: "Visiting the Terracotta Army without a tour",
          href: "/guides/terracotta-warriors-without-tour/",
          description:
            "Passport reservation, official channels, transport, the three pits, Lishan Garden and the return.",
        },
        {
          label: "Shaanxi History Museum: passport booking and collection plan",
          href: "/guides/shaanxi-history-museum-booking-and-collection-plan/",
          description:
            "Choose the right venue, reserve with a foreign passport and use a focused collection route.",
        },
        {
          label: "How to read Chinese city walls",
          href: "/guides/chinese-city-walls-gates-and-urban-order/",
          description:
            "Separate surviving fabric, conservation repair, reconstruction and modern additions.",
        },
        {
          label: "Chinese ritual bronzes: form, function and inscriptions",
          href: "/guides/ritual-bronze-vessels-and-inscriptions/",
          description: "An evidence-led method to use inside the museum galleries.",
        },
      ],
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "If the museum reservation fails, keep the function",
    },
    {
      id: "failure-1",
      type: "paragraph",
      text: "Reject unofficial promises of a guaranteed free reservation. Keep the function rather than the building: choose another verified museum, spend more time in the pagoda and temple precinct, add archaeological context at the mausoleum site, or take a focused old-city heritage block. Recheck official cancellations, but keep the day workable without them.",
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two realistic travel situations",
    },
    {
      id: "scenario-1-heading",
      type: "heading",
      level: 3,
      text: "A couple travelling Beijing → Xi'an → Chengdu, three Xi'an nights",
    },
    {
      id: "scenario-1",
      type: "paragraph",
      text: "They arrive at the exact Xi'an station shown in 12306 in the afternoon, stay near Yongningmen and have two complete days before a morning departure. Day one is Lintong. Day two uses a confirmed museum slot, then the Giant Wild Goose Pagoda and a south-side evening. The City Wall or Bell Tower remains optional on the arrival afternoon, and the Chengdu transfer carries no timed attraction. This is balanced because both major sightseeing days are protected.",
    },
    {
      id: "scenario-2-heading",
      type: "heading",
      level: 3,
      text: "A family landing at XIY in the evening, two Xi'an nights",
    },
    {
      id: "scenario-2",
      type: "paragraph",
      text: "Two adults and a school-age child land in the evening and stay near the Bell Tower. The arrival earns zero sightseeing credit. Their one protected day goes to Lintong because the Terracotta Warriors are the priority, and after returning they have a simple central dinner. A short City Wall or Bell and Drum Tower block fits the next morning only if the outbound station and luggage plan leave a real margin. Adding the museum, the pagoda and Mount Hua would not be efficient; it would be a different trip length.",
    },
    {
      id: "next-heading",
      type: "heading",
      level: 2,
      text: "What should come after Xi'an?",
    },
    {
      id: "next-table",
      type: "table",
      caption: "Choosing the city after Xi'an",
      columns: ["Next city", "Xi'an's route role", "Choose it when", "Main caution"],
      rows: [
        [
          "Beijing",
          "Connects early imperial archaeology with a later imperial and national capital",
          "International flights or a northbound route support the line",
          "Beijing has multiple stations and two airports; protect the final-flight buffer",
        ],
        [
          "Chengdu",
          "Continues southwest into Sichuan food, neighbourhood life and regional extensions",
          "The route is Beijing–Xi'an–Chengdu or the reverse",
          "Do not follow a late arrival with an unprotected early fixed visit",
        ],
        [
          "Luoyang",
          "Builds an archaeology, caves and historic-capitals corridor eastward",
          "Heritage depth matters more than adding a contrasting modern city",
          "Longmen and the rail station still require a local transfer",
        ],
        [
          "Pingyao",
          "Adds a smaller walled-town scale and Shanxi merchant history",
          "The route is deliberately heritage-heavy and the dated rail works",
          "It can feel repetitive when the overall trip is already short",
        ],
        [
          "Shanghai or another flight gateway",
          "Makes Xi'an the inland historical stop before departure",
          "A dated direct service and an open-jaw flight reduce backtracking",
          "Compare the exact airport, terminal and final buffer, not only flight duration",
        ],
      ],
    },
    {
      id: "next-1",
      type: "paragraph",
      text: "Beijing and Chengdu are the clearest first-trip continuations because Xi'an can sit between them. Luoyang adds another archaeological and Buddhist-art layer. Pingyao adds urban-form comparison but is not automatically better than giving Xi'an or Beijing another night.",
    },
    {
      id: "route-links",
      type: "internal-links",
      title: "Continue with the detailed route guides",
      items: [
        {
          label: "Beijing, Xi'an and Chengdu: choose the route order",
          href: "/guides/beijing-xian-chengdu-route-order/",
          description:
            "Direction, gateways and how many usable half-days each order really produces.",
        },
        {
          label: "Is your China itinerary too rushed?",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description:
            "Read this when the problem may be base changes and transfer chains rather than Xi'an itself.",
        },
      ],
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "Frequently asked questions",
    },
    {
      id: "faq-1-heading",
      type: "heading",
      level: 3,
      text: "Can I see the Terracotta Warriors and the City Wall with one night in Xi'an?",
    },
    {
      id: "faq-1",
      type: "paragraph",
      text: "Only with unusually favourable arrival and departure times, a confirmed reservation, efficient transfers and a deliberately short wall visit. It is fragile: one night creates no protected full day, and a delay, queue or luggage problem can remove one stop. Two nights is the safer minimum when the Terracotta Warriors are essential.",
    },
    {
      id: "faq-2-heading",
      type: "heading",
      level: 3,
      text: "Do I need two nights or three nights in Xi'an?",
    },
    {
      id: "faq-2",
      type: "paragraph",
      text: "Choose two nights for one main full day plus a flexible supporting block. Choose three nights when you want the Terracotta Warriors and a meaningful city day without placing either on a transfer. Three nights is the default first-visit recommendation; two nights is conscious compression.",
    },
    {
      id: "faq-3-heading",
      type: "heading",
      level: 3,
      text: "Should I stay near the Bell Tower, Yongningmen or the Giant Wild Goose Pagoda?",
    },
    {
      id: "faq-3",
      type: "paragraph",
      text: "Bell Tower suits a short central first visit and old-city evenings. Yongningmen can balance the wall and the south-side corridor when the exact hotel has good access. Dayanta or Xiaozhai suits repeated museum, pagoda and south-side evenings. The exact entrance, metro exit, road crossing and quiet-side room matter more than the district label.",
    },
    {
      id: "faq-4-heading",
      type: "heading",
      level: 3,
      text: "Can the Terracotta Warriors and Huaqing Palace be visited on the same day?",
    },
    {
      id: "faq-4",
      type: "paragraph",
      text: "Yes, but the Terracotta Warriors and Lishan Garden already form a substantial linked visit. Add Huaqing Palace only for a genuine interest and accept less site depth or a longer day. Confirm the separate ticketing and current operations before committing.",
    },
    {
      id: "faq-5-heading",
      type: "heading",
      level: 3,
      text: "Is Mount Hua worth adding a day?",
    },
    {
      id: "faq-5",
      type: "paragraph",
      text: "Yes for travellers who actively want a mountain day and can add a separate full day rather than compress Xi'an. It is less worthwhile when it removes the only city day, follows several early starts or depends on a tight same-day departure. Weather and operating conditions can change the answer close to travel.",
    },
    {
      id: "faq-6-heading",
      type: "heading",
      level: 3,
      text: "Is the Muslim Quarter a full sightseeing day?",
    },
    {
      id: "faq-6",
      type: "paragraph",
      text: "Usually not. Treat it as part of the old-city cluster and an evening or meal environment rather than a substitute for the City Wall, the museums or Lintong. Go beyond the busiest commercial lane when neighbourhood and food culture are genuine interests, and do not use one market street as a complete account of Xi'an's Muslim history.",
    },
    {
      id: "faq-7-heading",
      type: "heading",
      level: 3,
      text: "Should my last Xi'an night be near XIY airport?",
    },
    {
      id: "faq-7",
      type: "paragraph",
      text: "Use the exact terminal, check-in deadline, central-hotel departure chain and a real fallback. An airport-side night is stronger when that chain would be fragile, particularly for an early international departure, children, older travellers or heavy luggage. Keep the central hotel when the dated transfer is defensible and the final Xi'an evening still matters. Apply the nationwide last-night method linked above; do not move solely because XIY looks far away on a map.",
    },
    {
      id: "cta-heading",
      type: "heading",
      level: 2,
      text: "Turn the Xi'an choice into a China route",
    },
    {
      id: "cta-1",
      type: "paragraph",
      text: "When the trip is still a set of cities, test which sequence fits the nights you actually have. When flights, cities and a day-by-day plan already exist, the better question is whether the route creates real Xi'an sightseeing days, which base reduces repeated crossings, and whether the next city keeps the line linear.",
    },
    {
      id: "cta-links",
      type: "internal-links",
      title: "Two ways to continue",
      items: [
        {
          label: "Free human planning check",
          href: "/#planner-contact",
          description:
            "Send the route and stay constraints for a free first look; no paid service is preselected.",
        },
        {
          label: "China itinerary review",
          href: "/china-itinerary-review/",
          description: "Bring an existing day-by-day route and have the weak links checked.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources and review record",
      items: [
        {
          label:
            "Xi'an East Railway Station entered use on 30 June 2026 with the Xi'an–Shiyan high-speed railway",
          url: "http://www.xa.gov.cn/xw/zwzx/msyw/2072145741715947521.html",
          publisher: "Xi'an Municipal People's Government",
          reviewedAt: "2026-08-16",
        },
        {
          label: "Xi'an Xianyang International Airport Terminal 5",
          url: "https://en.xa.gov.cn/CultureTravel/Transportation/1873656097505083393.html",
          publisher: "Xi'an Municipal People's Government",
          reviewedAt: "2026-08-16",
        },
        {
          label:
            "One admission covering the Terracotta Warriors pits and Lishan Garden, the free shuttle and passport reservation",
          url: "https://www.bmy.com.cn/guide/",
          publisher: "Emperor Qinshihuang's Mausoleum Site Museum",
          reviewedAt: "2026-08-16",
        },
        {
          label: "Shaanxi History Museum visit and reservation guide",
          url: "https://www.sxhm.com/guide.h",
          publisher: "Shaanxi History Museum",
          reviewedAt: "2026-08-16",
        },
        {
          label: "China Railway 12306 — confirm the exact station pair before booking",
          url: "https://www.12306.cn/en/index.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-16",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
