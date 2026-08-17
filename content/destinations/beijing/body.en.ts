import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Beijing is often the strongest place to begin a first China trip, because it teaches the country's scale before the route starts moving quickly. An imperial centre, a modern political core, hutong neighbourhoods, large gardens, business districts, two airports and eight major railway stations share one municipality. That range is the city's advantage and the reason a short visit turns inefficient: the Forbidden City, the Great Wall, the Summer Palace and a departure train are not interchangeable pins on a map.",
    },
    {
      id: "role-heading",
      type: "heading",
      level: 2,
      text: "What Beijing is for in a first China trip",
    },
    {
      id: "role-1",
      type: "paragraph",
      text: "Beijing is not simply the history city. The Forbidden City and the north–south ceremonial axis show how imperial order was written into urban space. Tiananmen Square and the National Museum place that inherited centre inside a modern capital. The hutongs around the Drum and Bell Towers work at a much smaller street scale, and Chaoyang and the CBD stop the trip from reducing Beijing to the past.",
    },
    {
      id: "role-2",
      type: "paragraph",
      text: "That makes Beijing a strong opening city. One stable central base gives an international arrival time to recover while introducing passport-linked reservations, subway navigation, long walking distances inside single sites, and the difference between a ticket time and a complete day. Those lessons make later cities easier. Beijing can also finish a trip, but the end of a route has less tolerance: a long-distance rail arrival, a Great Wall day and a next-morning international flight should never depend on one another.",
    },
    {
      id: "who-heading",
      type: "heading",
      level: 2,
      text: "Who Beijing suits, and who should keep it short",
    },
    {
      id: "who-1",
      type: "paragraph",
      text: "Beijing is particularly strong for first-time visitors, families introducing children to China, architecture and history travellers, museum visitors, neighbourhood walkers, and groups willing to give the Great Wall a complete day. It also suits travellers who dislike moving hotels: five Beijing nights are often easier than splitting the same time between two cities and adding another transfer.",
    },
    {
      id: "who-2",
      type: "paragraph",
      text: "It is less natural for travellers who want every day to stay spontaneous. Several major venues use timed or identity-linked entry, and the city's scale magnifies the cost of a last-minute cross-town change. Travellers who dislike long walks, security queues or early starts can still enjoy Beijing, but should reduce the number of large sites per day. Travellers prioritising tropical scenery, compact old towns or nightlife can reasonably hold Beijing to three or four nights.",
    },
    {
      id: "who-3",
      type: "paragraph",
      text: "The useful question is not whether Beijing is worth it. It is whether this trip needs a three-night introduction, a five-night first-trip anchor or a seven-night cultural stay.",
    },
    {
      id: "first-trip-answer",
      type: "callout",
      title: "The useful default for a first visit",
      tone: "decision",
      body: "Start with four or five hotel nights, one central base around Wangfujing or Dongdan, one complete Tiananmen–Forbidden City day, one independent Great Wall day, and one southern or northwest task. Confirm the actual arrival airport and departure station before paying for the hotel, and lock identity-linked reservations before filling the flexible neighbourhood time. Shorten this only by dropping a whole task—not by compressing the Wall and the imperial centre into the same day.",
    },
    {
      id: "nights-heading",
      type: "heading",
      level: 2,
      text: "How many nights does Beijing need?",
    },
    {
      id: "nights-1",
      type: "paragraph",
      text: "Count hotel nights, complete sightseeing days and partial arrival or departure days separately. A flight landing at 15:00 is not a Beijing day. Neither is a morning that starts with checkout, station travel, security and boarding.",
    },
    {
      id: "nights-table",
      type: "table",
      caption: "Beijing stay shapes and what each can honestly hold",
      columns: [
        "Stay shape",
        "Hotel nights",
        "Likely complete days",
        "What it can hold",
        "Main compromise",
      ],
      rows: [
        [
          "Minimum first look",
          "3",
          "2",
          "One central-axis day and either the Great Wall or a second city cluster",
          "Major clusters must be dropped; almost no recovery margin",
        ],
        [
          "Recommended first visit",
          "4–5",
          "3–4",
          "Central axis, Great Wall, Summer Palace or Temple of Heaven, plus a neighbourhood or museum block",
          "Secondary sights stay optional",
        ],
        [
          "Deeper Beijing stay",
          "6–7",
          "5–6",
          "Every major cluster at a calmer pace, with neighbourhood time, museums and weather margin",
          "You must deliberately resist adding another city",
        ],
      ],
    },
    {
      id: "nights-2",
      type: "paragraph",
      text: "Three nights work best as an evening arrival, two complete days and a later departure. One day follows Tiananmen–Forbidden City–Jingshan; the other is the Great Wall. That is a valid visit, but it usually omits the Summer Palace and leaves nowhere to move a failed reservation.",
    },
    {
      id: "nights-3",
      type: "paragraph",
      text: "Four nights usually produce three real days and are a practical minimum for many first trips. Five nights let the Wall stay independent, stop the northwest competing with the centre and keep the arrival day light. Six or seven suit travellers who value imperial architecture, museums, hutongs or slower mornings. The extra nights buy choice and recovery, not simply more attractions.",
    },
    {
      id: "booking-order-heading",
      type: "heading",
      level: 2,
      text: "Book Beijing in dependency order, not in browsing order",
    },
    {
      id: "booking-order-table",
      type: "table",
      caption: "The order that prevents one missing confirmation from breaking the city",
      columns: ["Order", "Decision", "Why it comes here", "What stays flexible"],
      rows: [
        ["1", "International arrival and the confirmed onward train or flight", "They define the airport, terminal, exact station and usable hotel nights", "Airport transfer method until the live arrival time is known"],
        ["2", "The Palace Museum and any other must-have identity-linked venue", "A sold-out date can force the central day to move; Tiananmen Square remains a separate access check", "Jingshan, Beihai, hutong and park blocks"],
        ["3", "Great Wall section and door-to-door transport method", "The section, weather exposure and return chain occupy their own day", "Which city day becomes the weather backup"],
        ["4", "Hotel area and property", "The gateway pair, first fixed sight and luggage route now reveal the job of the base", "Exact restaurant and evening choices"],
        ["5", "Temple of Heaven, Summer Palace, museums and neighbourhood sequence", "These complete the route after the scarce dependencies are visible", "The movable day that absorbs weather, closure or fatigue"],
      ],
    },
    {
      id: "stay-heading",
      type: "heading",
      level: 2,
      text: "Where to stay: choose the job of the neighbourhood",
    },
    {
      id: "stay-1",
      type: "paragraph",
      text: "Until the first and last transport tasks are known, there is no single best Beijing area. A hotel beside a famous sight can still be inconvenient when its entrance sits deep inside a lane, the group has large luggage, or the final train leaves from the opposite side of the city. Compare what each area has to do, not its reputation.",
    },
    {
      id: "stay-table",
      type: "table",
      caption: "Four Beijing base areas compared by job",
      columns: [
        "Area",
        "Best job",
        "What becomes easier",
        "What becomes harder",
        "Best fit",
      ],
      rows: [
        [
          "Wangfujing / Dongdan",
          "Central first-trip base",
          "Historic centre, several subway directions, broad hotel choice, simple evenings",
          "Great Wall and the northwest still need dedicated travel",
          "First-time couples, families, short stays",
        ],
        [
          "Qianmen",
          "Southern central-axis base",
          "Qianmen, Dashilar and the Temple of Heaven pair naturally",
          "Pedestrian lanes complicate luggage; northern tasks take longer",
          "Atmosphere-led travellers with a south-central plan",
        ],
        [
          "Gulou–Shichahai",
          "Hutong and evening base",
          "Drum and Bell Towers, the lakes, lanes and neighbourhood time",
          "Vehicle access, lifts, sound insulation and room size vary sharply",
          "Couples, repeat visitors, light packers",
        ],
        [
          "Dongzhimen / Chaoyang",
          "Airport, dining and modern-city base",
          "PEK-side access, Sanlitun, newer hotels",
          "Imperial sights become deliberate cross-city trips",
          "Business-plus-leisure, late PEK arrivals, nightlife priorities",
        ],
      ],
    },
    {
      id: "stay-2",
      type: "paragraph",
      text: "Wangfujing and Dongdan do the same city-level job: they reduce first-trip uncertainty. Central does not mean everything is walkable; it means several directions stay manageable. Qianmen is stronger when the southern axis should feel continuous, but “near Qianmen” can mean a main-road hotel or a property inside a pedestrian lane, and those are different arrival experiences with luggage.",
    },
    {
      id: "stay-3",
      type: "paragraph",
      text: "Gulou–Shichahai rewards property-level scrutiny. A courtyard hotel can be memorable, but heritage character does not guarantee a lift, soundproofing, a spacious room or vehicle access to the door. Dongzhimen and Chaoyang make sense when airport access, newer hotels, dining or evenings matter more than waking beside the old centre.",
    },
    {
      id: "gulou-figure",
      type: "figure",
      src: "/images/destinations/beijing/gulou-hutong-1200.webp",
      alt: "Beijing's Drum Tower and Bell Tower rising above grey-tiled hutong roofs, with a busy lane on the right.",
      width: 1200,
      height: 750,
      caption:
        "The Gulou–Shichahai area works at lane scale. That is its appeal and also why the specific building, not the district name, decides whether luggage, lifts and late arrivals will be easy.",
    },
    {
      id: "stay-links",
      type: "internal-links",
      title: "Compare Beijing bases in the detailed stay guides",
      items: [
        {
          label: "Where to stay in Beijing on a first trip",
          href: "/guides/beijing-where-to-stay-first-trip/",
          description:
            "Compares Wangfujing, Qianmen, Sanlitun and the northern hutongs by itinerary, arrival station, evenings, luggage and walking tolerance.",
        },
        {
          label: "Beijing courtyard hotel or modern hotel?",
          href: "/guides/beijing-courtyard-hotel-or-modern-hotel/",
          description:
            "What courtyard character actually changes about rooms, lifts, noise, heating and vehicle access.",
        },
        {
          label: "Is the hotel really near the metro?",
          href: "/guides/china-hotel-near-metro/",
          description:
            "Audit the useful station exit, pavement, crossings and lobby route instead of trusting a map radius.",
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
            "Compare a central Beijing night with an airport-side buffer from the exact flight and fallback chain.",
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
      text: "Two airports and eight major railway stations shape the first and last day",
    },
    {
      id: "gateways-1",
      type: "paragraph",
      text: "The planning order is fixed: confirm the actual flight or train, identify the terminal or the complete station name, then choose the transfer and the hotel implications. Never pick a “Beijing station” from a map before the ticket exists.",
    },
    {
      id: "gateways-table",
      type: "table",
      caption: "Beijing gateways and what each one changes",
      columns: ["Hub", "City-side orientation", "What it changes"],
      rows: [
        [
          "PEK — Capital Airport",
          "Northeast; the Capital Airport Express links Dongzhimen and Sanyuanqiao",
          "Favours Dongzhimen or Chaoyang for a late first night; a central Dongcheng hotel still needs a full transfer allowance",
        ],
        [
          "PKX — Daxing Airport",
          "Far south; the Daxing Airport Express runs to Caoqiao",
          "Can suit Qianmen or a south-side rail sequence; a late arrival should not precede an early northern sight",
        ],
        [
          "Beijing Railway Station",
          "East of the historic centre",
          "Works well from Dongdan or Jianguomen for the trains that actually use it",
        ],
        [
          "Beijing West",
          "West of the centre",
          "Important for many westbound routes, including numerous Xi'an services; eastern hotels need a deliberate transfer",
        ],
        [
          "Beijing South",
          "South of the centre",
          "Major high-speed gateway toward Shanghai, Tianjin and eastern corridors; more natural from Qianmen than from the far northeast",
        ],
        [
          "Beijing North",
          "Northwest of the old centre",
          "Serves selected northwest corridors, but the actual train may use Qinghe instead",
        ],
        [
          "Qinghe",
          "Northwest, beyond the inner centre",
          "Relevant to northwest high-speed services and some Badaling and Zhangjiakou trains; never a central default",
        ],
        [
          "Beijing Chaoyang",
          "Northeast",
          "Major northeast high-speed gateway; convenient from Chaoyang, awkward from Qianmen or the far west",
        ],
        [
          "Beijing Fengtai",
          "Southwest",
          "Handles a mixed and growing set of long-distance services; rely on the ticket, not an old rule of thumb",
        ],
        [
          "Beijing Tongzhou",
          "Eastern municipal sub-centre",
          "Relevant to selected eastbound intercity services; rarely the first assumption for a central stay",
        ],
      ],
    },
    {
      id: "station-count-change",
      type: "callout",
      title: "Why some Beijing pages still say seven stations",
      tone: "neutral",
      body: "Official Beijing pages published before the end of 2025 described seven major railway stations. Beijing Tongzhou Railway Station began passenger operations on 30 December 2025, creating the current eight-station system. That does not make Tongzhou the default for a first visitor: it serves selected eastbound intercity routes from the municipal sub-centre. The train ticket and current 12306 result remain the authority.",
    },
    {
      id: "gateways-2",
      type: "paragraph",
      text: "PEK versus PKX has no permanent winner. PEK is usually easier for Dongzhimen and the northeast; PKX can be more logical for southern Beijing and some onward rail sequences. Airfare, landing time and the next hotel matter more than a distance comparison, and a cheap midnight arrival can cost the following morning.",
    },
    {
      id: "gateways-3",
      type: "paragraph",
      text: "Rail follows the same rule. Beijing South is strongly associated with Shanghai and Beijing West with Xi'an, but the ticket remains the authority. Keep the Chinese station name alongside the English one, and plan the hotel departure only after the exact station is fixed. For a same-day station-to-airport connection, count leaving the platform, crossing the city, entering the correct terminal and preserving the airline buffer; an extra night is often more rational when the tickets are separate.",
    },
    {
      id: "first-last-day-table",
      type: "table",
      caption: "What the first and last Beijing day can realistically do",
      columns: ["Transport shape", "Defensible city plan", "Do not attach"],
      rows: [
        ["International arrival before mid-afternoon", "Immigration, baggage, transfer, check-in and one light block near the hotel if energy remains", "A passport-linked timed attraction or a cross-city evening promise"],
        ["International arrival in the evening", "Reach the booked hotel, eat nearby and prepare the next day's documents", "A show, distant hutong booking or early Wall departure without recovery"],
        ["Intercity rail arrival", "Use the exact station-to-hotel chain, then stay inside the hotel's local cluster", "A major attraction whose entry time assumes a perfect train and transfer"],
        ["Rail or flight departure day", "Treat checkout, terminal or station access, security and boarding as the primary task", "A last major sight that cannot be abandoned without consequence"],
      ],
    },
    {
      id: "transport-links",
      type: "internal-links",
      title: "Continue with the detailed airport and station guides",
      items: [
        {
          label: "Which Beijing railway station do you need?",
          href: "/guides/which-beijing-railway-station/",
          description:
            "The eight-station matrix, read from the ticket rather than from the city name.",
        },
        {
          label: "Beijing South Station to Capital or Daxing airport",
          href: "/guides/beijing-south-station-to-capital-or-daxing-airport/",
          description:
            "Whether a same-day station-to-airport link is defensible, and when to buy a hotel night instead.",
        },
        {
          label: "Which Great Wall section should you choose from Beijing?",
          href: "/guides/great-wall-section-selector-from-beijing/",
          description:
            "Compare Mutianyu, Badaling, Jinshanling and Simatai before choosing a transfer.",
        },
        {
          label: "Beijing to Mutianyu Great Wall transfer",
          href: "/guides/beijing-to-mutianyu-great-wall-transfer/",
          description: "How the Mutianyu day is actually executed door to door.",
        },
        {
          label: "Beijing to Badaling Great Wall transfer",
          href: "/guides/beijing-to-badaling-great-wall-transfer/",
          description:
            "Rail, suburban rail and bus options to Badaling, with the return plan.",
        },
      ],
    },
    {
      id: "clusters-heading",
      type: "heading",
      level: 2,
      text: "Read Beijing as four spatial tasks",
    },
    {
      id: "clusters-1",
      type: "paragraph",
      text: "The central planning mistake is grouping sights by fame instead of by geography and operating constraints.",
    },
    {
      id: "clusters-table",
      type: "table",
      caption: "Four Beijing tasks and their honest time shape",
      columns: [
        "Task",
        "Natural sequence",
        "Fix before the day",
        "Honest time shape",
        "What not to attach",
      ],
      rows: [
        [
          "Tiananmen–Forbidden City–Jingshan",
          "A south-to-north ceremonial and visual sequence",
          "Palace Museum booking; verify Tiananmen Square access separately if the square is intended",
          "One substantial central day",
          "The Great Wall, an airport departure or a distant timed museum",
        ],
        [
          "Qianmen–Temple of Heaven",
          "Historic commercial approach plus a southern ritual landscape",
          "Temple of Heaven ticket and gate choice; Qianmen remains the flexible half",
          "Half to full day depending on depth",
          "The Summer Palace as a casual add-on",
        ],
        [
          "Summer Palace and the northwest",
          "Imperial garden, lake and hill landscape",
          "Ticket, usable entrance and exit; treat boat operation as optional",
          "A strong half day, often most of a day",
          "A tightly timed central attraction before or after",
        ],
        [
          "Great Wall",
          "One selected section with complete outward and return transport",
          "Current opening, section, entry and complete return method",
          "An independent full day",
          "The Forbidden City, a major museum or a same-day intercity departure",
        ],
      ],
    },
    {
      id: "axis-heading",
      type: "heading",
      level: 3,
      text: "Tiananmen, the Forbidden City and Jingshan belong together",
    },
    {
      id: "axis-1",
      type: "paragraph",
      text: "Tiananmen and the square establish the monumental southern approach. The Forbidden City carries the route through the former imperial centre. Jingshan sits immediately north and gives the clearest view of the palace's scale and alignment. Walking south to north reduces backtracking and lets the city's structure explain itself. The National Museum is geographically close but operationally separate, with its own reservation, security and real visit time.",
    },
    {
      id: "south-heading",
      type: "heading",
      level: 3,
      text: "Qianmen and the Temple of Heaven form the southern task",
    },
    {
      id: "south-1",
      type: "paragraph",
      text: "Qianmen and Dashilar show the commercial side of the old centre. The Temple of Heaven lies farther south and works at a larger scale: a ritual landscape rather than a single hall. They pair well because the route keeps moving south. The gate you enter changes the walking sequence, so choose it after mobility, transport and available hours are known.",
    },
    {
      id: "northwest-heading",
      type: "heading",
      level: 3,
      text: "The Summer Palace is a northwest commitment",
    },
    {
      id: "northwest-1",
      type: "paragraph",
      text: "The Summer Palace is not a compact palace building. Its lake, hill, gates and internal distances make it a substantial outdoor visit, easiest when the day is already oriented northwest and the entrance and exit support the next movement. Boats can change the route when operating, but the day must still work without them. With only two complete Beijing days, leaving the Summer Palace out is a reasonable trade.",
    },
    {
      id: "wall-figure",
      type: "figure",
      src: "/images/destinations/beijing/great-wall-1200.webp",
      alt: "A restored section of the Great Wall following mountain ridges north of Beijing, with watchtowers on the skyline.",
      width: 1200,
      height: 750,
      caption:
        "The Wall sits outside the central sightseeing system. The ridgeline in this frame is the reason it needs an outward and return journey rather than an afternoon.",
    },
    {
      id: "wall-heading",
      type: "heading",
      level: 3,
      text: "The Great Wall is its own day",
    },
    {
      id: "wall-1",
      type: "paragraph",
      text: "Mutianyu and Badaling differ in access, terrain, facilities and crowd pattern, but both need an outward journey, entry, real time on the wall and a return. A cable car reduces the climb; it does not turn the Wall into a half-day companion to the Forbidden City.",
    },
    {
      id: "wall-2",
      type: "paragraph",
      text: "Mutianyu is often a strong family default because assisted ascent and different walking lengths can be combined. Badaling can suit travellers who value rail access, extensive facilities or the best-known restored section. Travellers who genuinely want to hike should select a route by current opening status, verified route condition, weather, transport and their own capacity rather than by a dramatic photograph.",
    },
    {
      id: "sight-links",
      type: "internal-links",
      title: "Open the detailed guide when you are ready to book",
      items: [
        {
          label: "The Forbidden City for foreign visitors",
          href: "/guides/forbidden-city-for-foreign-visitors/",
          description:
            "Passport reservation, entrance sequence and what a realistic visit costs in time.",
        },
        {
          label: "Temple of Heaven: gates and ritual sequence",
          href: "/guides/temple-of-heaven-gates-and-ritual-sequence/",
          description: "Which gate to use, and how the park reads as one landscape.",
        },
        {
          label: "Summer Palace: gates, route and boat plan",
          href: "/guides/summer-palace-gates-route-and-boat-plan/",
          description:
            "Entrances, internal distances and a route that still works when boats are not running.",
        },
        {
          label: "National Museum of China: booking and route",
          href: "/guides/national-museum-of-china-booking-and-route/",
          description:
            "Its own reservation and a focused collection route, so it is never treated as an automatic substitute.",
        },
      ],
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "What to do when a reservation fails",
    },
    {
      id: "failure-1",
      type: "paragraph",
      text: "A failed reservation should change the day architecture, not trigger a random search for another famous sight. Protect the Great Wall day and the intercity departure first, then move a flexible geographic cluster into the open day.",
    },
    {
      id: "failure-2",
      type: "paragraph",
      text: "If the Forbidden City is unavailable, keep the central geography without pretending the experience is identical: Jingshan, Beihai or a hutong block can form a coherent day, subject to current requirements. The Temple of Heaven or the Summer Palace can move into a full open day. The National Museum replaces the palace only when its own reservation is secured. This is exactly where five nights beat three: a fixed visit has somewhere else to go.",
    },
    {
      id: "failure-table",
      type: "table",
      caption: "A Beijing fallback should preserve geography and dependencies",
      columns: ["Failure", "Protect", "Move or replace"],
      rows: [
        ["Palace Museum sold out or booking unconfirmed", "The Great Wall day and onward transport", "Move the palace to another available Beijing day; otherwise use a coherent central park–hutong day, not a supposed walk-up exception"],
        ["Great Wall weather or temporary access problem", "The section's current official safety instruction", "Use the movable city cluster and shift the Wall only if opening, transport and the later forecast are confirmed"],
        ["National Museum reservation fails", "The central route's realistic walking and security load", "Use another confirmed museum or neighbourhood block; do not treat geographic proximity as admission"],
        ["Arrival is late or the group is exhausted", "The next day's fixed reservation and original documents", "Delete the arrival-night attraction and keep only food and a short local walk"],
        ["Train, terminal or flight changes", "The ticketed departure and minimum transfer chain", "Drop the last sightseeing block before changing hotels or buying a fragile same-day connection"],
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two traveller scenarios",
    },
    {
      id: "scenario-1-heading",
      type: "heading",
      level: 3,
      text: "Family of four, five nights, PEK arrival, Shanghai next",
    },
    {
      id: "scenario-1",
      type: "paragraph",
      text: "The family lands at PEK in the afternoon and stays near Wangfujing or Dongdan. Day one follows Tiananmen–Forbidden City–Jingshan. Day two is an independent Mutianyu day. Day three combines Qianmen and the Temple of Heaven at a child-compatible pace. Day four stays flexible: the Summer Palace if energy is good, otherwise Shichahai with a lighter park or museum block. The fifth night protects the route, and they leave for Shanghai from the station printed on the ticket — often Beijing South for this corridor, but never assumed before booking.",
    },
    {
      id: "scenario-2-heading",
      type: "heading",
      level: 3,
      text: "Culture-and-walking couple, six nights, PKX arrival, Xi'an next",
    },
    {
      id: "scenario-2",
      type: "paragraph",
      text: "The couple arrives at PKX and chooses Qianmen for the southern-axis atmosphere. Their complete days cover the central palace sequence, the Temple of Heaven and Qianmen in depth, Gulou–Shichahai, the Summer Palace and one Wall section chosen for walking rather than name recognition. The final full day stays movable: they confirm the actual departure station for Xi'an and keep the transfer day light. The sixth night is what lets bad Wall weather or a missed palace reservation move without collapsing the route.",
    },
    {
      id: "next-heading",
      type: "heading",
      level: 2,
      text: "Where Beijing should go next",
    },
    {
      id: "next-table",
      type: "table",
      caption: "Choosing the city after Beijing",
      columns: ["Next stop", "Why it follows Beijing", "Route implication", "Choose it when"],
      rows: [
        [
          "Xi'an",
          "Continues the capital-and-empire story at a different scale",
          "Usually a straightforward high-speed leg; many services use Beijing West, but verify",
          "History is central and several nights remain",
        ],
        [
          "Shanghai",
          "Creates an old-capital and modern-metropolis contrast, and supports open-jaw flights",
          "High-speed rail is often practical; many services run Beijing South to Shanghai Hongqiao",
          "You want a clean first-trip arc or fly home from Shanghai",
        ],
        [
          "Zhangjiajie",
          "Replaces urban monumentality with mountain scenery",
          "Usually deserves a flight comparison; rail can consume a full day",
          "Nature is a priority and two complete local days are protected",
        ],
        [
          "Chengdu",
          "Adds food culture, a slower urban rhythm and panda-focused visits",
          "Often stronger after Xi'an than as a direct add-on",
          "The route is long enough to continue west before turning east or south",
        ],
      ],
    },
    {
      id: "next-1",
      type: "paragraph",
      text: "Xi'an is the continuous answer; Shanghai is the contrasting one. Beijing–Xi'an–Shanghai can form a clean rail-based route. Add Zhangjiajie only after accepting two significant transfer days.",
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
          label: "Beijing → Zhangjiajie → Shanghai: what the travel days cost",
          href: "/guides/beijing-zhangjiajie-shanghai-transport/",
          description:
            "Door-to-door comparison of train and flight once those three cities are shortlisted.",
        },
        {
          label: "Beijing–Zhangjiajie–Shanghai in 10 days: is it realistic?",
          href: "/guides/beijing-zhangjiajie-shanghai-10-days/",
          description: "Read this when 10 days is the hard constraint.",
        },
        {
          label: "Is your China itinerary too rushed?",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description:
            "Read this when the problem may be base changes and transfer chains rather than Beijing itself.",
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
      text: "Are three nights enough for Beijing?",
    },
    {
      id: "faq-1",
      type: "paragraph",
      text: "Yes for a selective first look, usually two complete sightseeing days. Protect one central day and choose between the Great Wall and another cluster. Four or five nights are better when both the Wall and the Summer Palace or Temple of Heaven matter.",
    },
    {
      id: "faq-2-heading",
      type: "heading",
      level: 3,
      text: "Should I fly into PEK or PKX?",
    },
    {
      id: "faq-2",
      type: "paragraph",
      text: "Choose by international route, arrival time and fare, then test the ground transfer. PEK is northeast and links through Sanyuanqiao and Dongzhimen; PKX is far south and links through Caoqiao. Hotel location and landing hour often matter more than the airport label.",
    },
    {
      id: "faq-3-heading",
      type: "heading",
      level: 3,
      text: "Can I visit the Forbidden City and the Great Wall on the same day?",
    },
    {
      id: "faq-3",
      type: "paragraph",
      text: "Do not plan them together for a normal first visit. The Forbidden City belongs to a substantial central sequence and the Wall needs an independent outward and return journey. Combining them removes all resilience and reduces both visits.",
    },
    {
      id: "faq-4-heading",
      type: "heading",
      level: 3,
      text: "Which Beijing railway station do I need?",
    },
    {
      id: "faq-4",
      type: "paragraph",
      text: "The one printed on the ticket. Beijing, West, South, North, Qinghe, Chaoyang, Fengtai and Tongzhou are separate hubs. Confirm the complete English and Chinese station name before planning the hotel departure.",
    },
    {
      id: "faq-5-heading",
      type: "heading",
      level: 3,
      text: "Is Beijing walkable?",
    },
    {
      id: "faq-5",
      type: "paragraph",
      text: "Individual clusters are walkable, but Beijing is not a walk-between-everything city. Use the subway or a vehicle between districts, then walk within the central axis, Qianmen, Shichahai or the Summer Palace. Internal distances still count after you reach the gate.",
    },
    {
      id: "faq-6-heading",
      type: "heading",
      level: 3,
      text: "Do I need to change hotels inside Beijing?",
    },
    {
      id: "faq-6",
      type: "paragraph",
      text: "Usually not. One well-chosen base is worth more than the time lost to a hotel move. Change only when it clearly protects a very early airport or station departure, solves a mobility problem, or supports a materially different second half of a long stay.",
    },
    {
      id: "faq-7-heading",
      type: "heading",
      level: 3,
      text: "Should my last Beijing night be near PEK or PKX?",
    },
    {
      id: "faq-7",
      type: "paragraph",
      text: "Use the exact airport, terminal, check-in deadline and fallback chain. An airport-side night becomes stronger when a central transfer would be fragile, especially with an early departure, children, older travellers or heavy luggage. Keep the central hotel when the dated transfer is defensible and the final Beijing evening still matters. Apply the nationwide last-night method linked above; do not choose from the airport name alone.",
    },
    {
      id: "faq-8-heading",
      type: "heading",
      level: 3,
      text: "Are Tiananmen Square and the Forbidden City the same reservation?",
    },
    {
      id: "faq-8",
      type: "paragraph",
      text: "No. They have separate access ownership, and a Tiananmen Square record never replaces a Palace Museum ticket. Under the current publicly available Tiananmen measures, a valid same-day Palace Museum reservation lets the visitor enter the square without a separate square reservation; show that record at the on-site check. Recheck official notices before major events or temporary controls, and use the detailed Forbidden City guide for the Palace-only approach.",
    },
    {
      id: "faq-9-heading",
      type: "heading",
      level: 3,
      text: "What should I book first for a first Beijing trip?",
    },
    {
      id: "faq-9",
      type: "paragraph",
      text: "Confirm the flights and exact onward station first, then secure the Palace Museum and any non-negotiable identity-linked venue, then fix the Great Wall section and transport, and only then choose the hotel property and flexible clusters. This order prevents a cheap hotel or a casual attraction list from controlling the scarce parts of the trip.",
    },
    {
      id: "cta-heading",
      type: "heading",
      level: 2,
      text: "Turn the Beijing choice into a China route",
    },
    {
      id: "cta-1",
      type: "paragraph",
      text: "When the trip is still a set of cities, test which sequence fits the available nights before committing to Beijing–Xi'an, Beijing–Shanghai or Beijing–Zhangjiajie–Shanghai. When flights, cities and a day-by-day plan already exist, the better question is whether the route protects the right Beijing days, stations and reservations.",
    },
    {
      id: "cta-links",
      type: "internal-links",
      title: "Two ways to continue",
      items: [
        {
          label: "Ask a Beijing planning question",
          href: "/#planner-contact",
          description:
            "Share the route and stay constraints only if one dependency still does not resolve; no paid service is preselected.",
        },
        {
          label: "China itinerary review",
          href: "/china-itinerary-review/",
          description:
            "Bring an existing day-by-day route and have the weak links checked.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources and image credit",
      items: [
        {
          label: "Beijing's eight-station and two-airport hub system after Tongzhou opening",
          url: "https://www.beijing.gov.cn/ywdt/gzdt/202512/t20251229_4374283.html",
          publisher: "Beijing Municipal Government",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Beijing Tongzhou Railway Station began passenger operations on 30 December 2025",
          url: "https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202512/t20251231_4381067.html",
          publisher: "Beijing Municipal Government",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Capital Airport Express route through Sanyuanqiao and Dongzhimen",
          url: "https://english.beijing.gov.cn/livinginbeijing/transportation/airport/202005/t20200516_1899219.html",
          publisher: "Beijing Municipal Government",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Daxing Airport Express route to Caoqiao",
          url: "https://english.beijing.gov.cn/travellinginbeijing/transportation/airport/202005/t20200516_1899220.html",
          publisher: "Beijing Municipal Government",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Tiananmen reservation measures and the Palace Museum exemption",
          url: "https://tamgw.beijing.gov.cn/zhengwugongkai/tzgg/202111/t20211119_2541156.html",
          publisher: "Tiananmen Area Management Committee",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Palace Museum English ticket and international-visitor booking instructions",
          url: "https://intl.dpm.org.cn/ticket_details.html",
          publisher: "The Palace Museum",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Palace Museum Chinese ticketing, identity and entry rules",
          url: "https://www.dpm.org.cn/subject_booking/",
          publisher: "The Palace Museum",
          reviewedAt: "2026-08-22",
        },
        {
          label: "National Museum of China visitor reservation guidelines",
          url: "https://en.chnmuseum.cn/visit_692/",
          publisher: "National Museum of China",
          reviewedAt: "2026-08-22",
        },
        {
          label: "China Railway 12306 — confirm the exact station pair before booking",
          url: "https://www.12306.cn/en/index.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-22",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
