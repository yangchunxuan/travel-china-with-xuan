import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Guangzhou is three things at once: a major international arrival city, the historic centre of Lingnan urban culture, and a rail hinge for the Pearl River Delta and the routes toward Hong Kong and Macao. The first decision is not where to go — it is whether the city gets nights of its own, or whether it is only where the plane lands.",
    },
    {
      id: "decision-heading",
      type: "heading",
      level: 2,
      text: "Does Guangzhou get nights, or only a connection?",
    },
    {
      id: "decision-1",
      type: "paragraph",
      text: "Give it nights when Cantonese food culture, river trade, clan architecture, neighbourhood life and the contrast between an old commercial city and a contemporary regional capital are things you actually want. Use it as a mainland start or finish for Shenzhen, Hong Kong or Macao. Skip a dedicated stay when a cheap flight was the only reason and the connection leaves no usable time outside the airport and rail corridor.",
    },
    {
      id: "decision-2",
      type: "paragraph",
      text: "Two nights buy one strong old-city day. Three let Lingnan Guangzhou and the newer Pearl River axis coexist without either being rushed. Chimelong in Panyu is a separate full day, and Foshan or Shunde is an extension that consumes additional time rather than another Guangzhou neighbourhood.",
    },
    {
      id: "nights-table",
      type: "table",
      caption: "What each length of stay can honestly hold",
      columns: ["Time in Guangzhou", "What it realistically covers", "What to leave out", "Route role"],
      rows: [
        [
          "One night",
          "An arrival, one well-chosen evening, then a compact morning cluster",
          "The old city, Canton Tower, Pazhou and Chimelong in one sweep",
          "Gateway stop before a later train or flight",
        ],
        [
          "Two nights",
          "One full old-city day plus either the Pearl River axis or a real arrival buffer",
          "A full Chimelong day, unless nearly everything else goes",
          "A meaningful introduction inside a larger China trip",
        ],
        [
          "Three nights",
          "Liwan, Beijing Road and Yuexiu, the new axis, and morning tea without it becoming the whole itinerary",
          "Foshan, Shunde and Chimelong still compete for the same hours",
          "Guangzhou as a destination in its own right",
        ],
        [
          "Three nights plus Chimelong",
          "Two central days and a protected Panyu park day, often with an extra night",
          "Commuting across the city for an early park start just to keep one hotel",
          "Family-led Guangzhou stop",
        ],
        [
          "Four or more with Foshan or Shunde",
          "The Guangzhou core plus one regional extension chosen for a clear reason",
          "Describing every delta city as a Guangzhou day trip",
          "Regional base or slower South China stay",
        ],
      ],
    },
    {
      id: "nights-note",
      type: "paragraph",
      text: "Count usable hours rather than the label “two days”. A mid-afternoon arrival followed by luggage and check-in is not an afternoon, and a morning departure from Guangzhou South consumes time long before the train leaves.",
    },
    {
      id: "stay-heading",
      type: "heading",
      level: 2,
      text: "Where to stay: choose the task, not the district's reputation",
    },
    {
      id: "stay-table",
      type: "table",
      caption: "Five Guangzhou bases compared by job",
      columns: ["Area", "Best for", "What becomes easier", "What becomes harder"],
      rows: [
        [
          "Liwan / Shamian",
          "A first cultural visit, older streets, a slower evening",
          "Chen Clan Ancestral Hall, Yongqingfang and Shamian as one plan; morning-tea culture",
          "Tianhe business addresses, Pazhou events and early Panyu starts",
        ],
        [
          "Beijing Road / Yuexiu",
          "A balanced first stay with central access",
          "Beijing Road's excavated road layers, Yuexiu sights, museums, cross-city metro",
          "It is beside neither Guangzhou South nor the airport; some hotels sit on busy pedestrian streets",
        ],
        [
          "Tianhe / Zhujiang New Town",
          "Business extension and the contemporary city",
          "The new central axis, Huacheng Square, international-style hotels",
          "Liwan's older fabric becomes a planned trip rather than an evening walk",
        ],
        [
          "Haizhu / Pazhou",
          "Canton Fair or a tightly scheduled exhibition visit",
          "The fair complex and Pazhou meetings",
          "Leisure evenings need travel; prices and availability swing sharply during fairs",
        ],
        [
          "Panyu",
          "Chimelong or a Guangzhou South connection",
          "Early park access and south-side departures",
          "The historic centre and riverfront are not next door; a “Guangzhou hotel” can hide a long crossing",
        ],
      ],
    },
    {
      id: "stay-1",
      type: "paragraph",
      text: "Liwan and Shamian are related but not identical: Shamian is a compact historic island, Liwan a much larger living district. Check the hotel's actual metro entrance and walking route rather than the district name. Beijing Road and Yuexiu make a practical centre with visible older road layers, civic history, parks and museums.",
    },
    {
      id: "shamian-figure",
      type: "figure",
      src: "/images/destinations/guangzhou/shamian-1200.webp",
      alt: "An early twentieth-century villa on Shamian Island in Guangzhou, framed by large banyan trees along a quiet street.",
      width: 1200,
      height: 750,
      caption:
        "Shamian is a small island with its own scale and quiet. Treating it as the whole of Liwan is the fastest way to misjudge how long the western old city takes.",
    },
    {
      id: "stay-2",
      type: "paragraph",
      text: "Tianhe and Zhujiang New Town are efficient for business and the new axis, but they do not replace the old city — protect a deliberate Liwan or Yuexiu block. Pazhou is task-specific: stay near the venue only when repeated attendance justifies it. Panyu makes sense when Chimelong or Guangzhou South is the anchor, but a split adds checkout, luggage and another check-in.",
    },
    {
      id: "airport-heading",
      type: "heading",
      level: 2,
      text: "Baiyun Airport: T1 is closed, and that changes the ground plan",
    },
    {
      id: "airport-1",
      type: "paragraph",
      text: "This is the single most out-of-date fact in older Guangzhou advice. From 7 May 2026, Baiyun's eleven domestic airlines moved out of Terminal 1 to Terminal 3, and T1 — in service for nearly twenty-two years — ceased passenger operations for an upgrade. A renovation design was selected in July 2026 and no reopening date has been announced, so a reopening cannot be planned around. At the same time, the metro's Airport South station and the intercity railway's Baiyun Airport South station, both tied to T1, stopped serving passengers.",
    },
    {
      id: "airport-table",
      type: "table",
      caption: "Baiyun terminals and their rail access after the May 2026 change",
      columns: ["Terminal", "Passenger role", "Rail access to compare", "Planning rule"],
      rows: [
        [
          "T1",
          "Closed to passengers since 7 May 2026, under renovation",
          "Airport South metro and Baiyun Airport South intercity no longer serve passengers",
          "Do not follow an old map, saved pin or pre-May instruction to T1",
        ],
        [
          "T2",
          "Active passenger terminal",
          "Metro Line 3 at Airport North and Guangdong Intercity at Baiyun Airport North",
          "Confirm the operating carrier, then choose metro, intercity or road by the hotel",
        ],
        [
          "T3",
          "Active domestic, international and regional terminal",
          "Guangdong Intercity at Baiyun Airport East; no direct metro station",
          "The airport's own advice is Metro Line 3 or Line 9 to Gaozeng, then the airport shuttle bus",
        ],
      ],
    },
    {
      id: "airport-2",
      type: "paragraph",
      text: "For a codeshare, identify the operating carrier first, read T2 or T3 from the latest itinerary, recheck on the travel day and save the Chinese terminal name. Families with several cases may still prefer an official taxi over the Gaozeng transfer, even though the rail option exists.",
    },
    {
      id: "airport-links",
      type: "internal-links",
      title: "Hand the terminal decision to its owner",
      items: [
        {
          label: "Guangzhou Baiyun Airport: T2 or T3?",
          href: "/guides/guangzhou-baiyun-airport-t2-t3/",
          description:
            "Airline allocation, ground transport in detail and how to recover from arriving at the wrong terminal.",
        },
        {
          label: "The last night before an international flight",
          href: "/guides/china-last-night-before-international-flight/",
          description:
            "Whether a central hotel or an airport-side hotel protects an early or very late departure.",
        },
      ],
    },
    {
      id: "stations-heading",
      type: "heading",
      level: 2,
      text: "Five railway stations, and one of them changed job in January 2026",
    },
    {
      id: "stations-1",
      type: "paragraph",
      text: "The word “Guangzhou” on a route idea is not enough. A scheduled running time can look efficient while the hotel-to-station transfer ruins the whole journey. The January 2026 timetable also moved work between two of these stations, so older guidance can be confidently wrong.",
    },
    {
      id: "stations-table",
      type: "table",
      caption: "Guangzhou's main stations and what each is for",
      columns: ["Station", "Role", "Directions to check first", "Common mistake"],
      rows: [
        [
          "Guangzhou South (广州南站)",
          "Huge high-speed hub in Panyu, south of the historic centre",
          "Hong Kong West Kowloon, Shenzhen, Changsha South, Zhuhai and many national routes",
          "Treating it as downtown and leaving too little time for the approach and the station interior",
        ],
        [
          "Guangzhou East (广州东站)",
          "Tianhe-side hub with strong city access",
          "Shenzhen and date-specific Hong Kong or eastbound services",
          "Assuming every Hong Kong or Shenzhen train uses South",
        ],
        [
          "Guangzhou Railway Station (广州站)",
          "Central station that stopped originating and terminating conventional trains on 26 January 2026 and took over Beijing–Guangzhou high-speed services",
          "Beijing–Guangzhou, Guiyang, Nanning and Shantou-direction high-speed routes",
          "Using an older guide that still calls it the conventional-train terminus",
        ],
        [
          "Guangzhou Baiyun (广州白云站)",
          "Baiyun hub now focused on conventional services plus Guangzhou–Zhanjiang high-speed and new cross-province EMU trains",
          "Conventional long-distance routes and south-western directions",
          "Confusing it with Baiyun Airport, or still expecting the Beijing–Guangzhou high-speed trains that moved to Guangzhou Station",
        ],
        [
          "Guangzhou North (广州北站)",
          "Huadu district station north of the central city",
          "Selected northbound services when the exact train fits",
          "Booking it because “North” sounds convenient, without checking the long city transfer",
        ],
      ],
    },
    {
      id: "stations-2",
      type: "paragraph",
      text: "For Hong Kong, search Guangzhou South first and Guangzhou East separately for the exact date. For Shenzhen, match the Guangzhou station to the Shenzhen endpoint rather than to habit. Passport, luggage and boarding procedure belong to the high-speed train guide; this hub owns only the station overview.",
    },
    {
      id: "station-links",
      type: "internal-links",
      title: "Continue with the transport owners",
      items: [
        {
          label: "Using China's high-speed trains for the first time",
          href: "/guides/china-high-speed-train-first-time-guide/",
          description: "12306, passports, seats, luggage, security and boarding.",
        },
        {
          label: "Guangzhou to Hong Kong: the transport route",
          href: "/guides/guangzhou-hong-kong-transport-route/",
          description: "Station choice, border processing and the honest door-to-door comparison.",
        },
        {
          label: "Guangzhou to Macao: the transport route",
          href: "/guides/guangzhou-macau-transport-route/",
          description: "The Zhuhai/Gongbei and Hengqin border chains, compared.",
        },
      ],
    },
    {
      id: "clusters-heading",
      type: "heading",
      level: 2,
      text: "Read Guangzhou as an old west and a new east",
    },
    {
      id: "cluster-1-heading",
      type: "heading",
      level: 3,
      text: "Chen Clan Ancestral Hall, Yongqingfang and Shamian",
    },
    {
      id: "cluster-1",
      type: "paragraph",
      text: "These three share western Guangzhou but are not one continuous attraction. The Chen Clan Ancestral Hall is a focused architecture visit, Yongqingfang a renewed historic neighbourhood, and Shamian a separate river island. Start with whichever has the firmest opening constraint, move through Liwan at neighbourhood pace, and reach Shamian later in the day.",
    },
    {
      id: "cluster-2-heading",
      type: "heading",
      level: 3,
      text: "Beijing Road and Yuexiu",
    },
    {
      id: "cluster-2",
      type: "paragraph",
      text: "Beijing Road is a working commercial street laid over excavated older road surfaces, and Yuexiu supplies the wider civic and historical setting. Read the street as evidence rather than as a shopping list, and pair it with a Yuexiu museum or park instead of an immediate cross-city dash.",
    },
    {
      id: "cluster-3-heading",
      type: "heading",
      level: 3,
      text: "Zhujiang New Town and Canton Tower",
    },
    {
      id: "cluster-3",
      type: "paragraph",
      text: "Zhujiang New Town sits on the north bank of the contemporary axis; Canton Tower stands across the river in Haizhu. Together they explain the new centre from opposite sides. An observation ticket is optional — decide whether the paid high view adds more than the riverfront itself. The value here is the contrast with Liwan and Yuexiu, not the height.",
    },
    {
      id: "zjnt-figure",
      type: "figure",
      src: "/images/destinations/guangzhou/zhujiang-new-town-1200.webp",
      alt: "The Zhujiang New Town skyline in Guangzhou seen across the Pearl River, with high-rise towers along the waterfront.",
      width: 1200,
      height: 750,
      caption:
        "The new axis is best understood from the opposite bank. One side gives the view, the other puts you inside it — doing both is the point, not the tower ticket.",
    },
    {
      id: "cluster-4-heading",
      type: "heading",
      level: 3,
      text: "Pazhou, and Chimelong as a separate zone",
    },
    {
      id: "cluster-4",
      type: "paragraph",
      text: "Pazhou lies farther east in Haizhu and is organised around conventions and exhibitions; outside an event it is not an automatic first-visit priority, and during one it changes hotel prices and transport demand across the city. Chimelong is a Panyu family zone south of the centre and needs a full day rather than a slot between an old-city morning and a Tianhe evening.",
    },
    {
      id: "extensions-heading",
      type: "heading",
      level: 2,
      text: "Foshan, Shunde, Shenzhen, Hong Kong and Macao",
    },
    {
      id: "extensions-table",
      type: "table",
      caption: "Day extension or next stop",
      columns: ["Place", "Works as a day extension when", "Better as the next stop when", "Boundary to keep clear"],
      rows: [
        [
          "Foshan",
          "One or two Lingnan cultural sites are the whole purpose",
          "You want several districts or onward western Guangdong travel",
          "Foshan is an independent city, not a Guangzhou neighbourhood",
        ],
        [
          "Shunde",
          "A food-led day with a disciplined geographic plan",
          "Food culture is a major trip theme and evenings matter",
          "Shunde is a district of Foshan; its food identity does not make venues close together",
        ],
        [
          "Shenzhen",
          "One specific activity justifies a transport-heavy day",
          "Contemporary urbanism or business deserves real time",
          "Do not add a Shenzhen hotel merely because it lies on the way to Hong Kong",
        ],
        [
          "Hong Kong",
          "Rarely — a border-heavy leisure day is a poor first choice",
          "It gets at least one night as a destination or gateway",
          "A Special Administrative Region with its own entry process, not an ordinary Guangdong city",
        ],
        [
          "Macao",
          "Only with a generous day and a carefully chosen border chain",
          "The historic centre, Cotai or an onward flight justify an overnight",
          "The rail ticket from Guangzhou does not cross the border for you",
        ],
      ],
    },
    {
      id: "extension-links",
      type: "internal-links",
      title: "Decide the regional order with its owner",
      items: [
        {
          label: "Guangzhou, Shenzhen and Hong Kong: route order",
          href: "/guides/guangzhou-shenzhen-hong-kong-route-order/",
          description:
            "Whether Shenzhen earns a hotel, and which crossing to choose once it does not.",
        },
        {
          label: "How Guangzhou morning tea works",
          href: "/guides/how-guangzhou-morning-tea-works/",
          description:
            "Ordering, sharing, tea charges and the social culture behind the meal.",
        },
        {
          label: "When metro construction meets archaeology",
          href: "/guides/when-metro-construction-meets-archaeology/",
          description:
            "The evidence framework behind Beijing Road's visible road layers and similar sites.",
        },
      ],
    },
    {
      id: "recheck-heading",
      type: "heading",
      level: 2,
      text: "What to recheck shortly before you travel",
    },
    {
      id: "recheck-list",
      type: "list",
      items: [
        "The operating carrier and terminal for every Baiyun sector, since T1 is closed and T2 and T3 have different rail access.",
        "Whether the T3 rail-plus-shuttle chain still matches the airport's current advice, and what it means with heavy luggage.",
        "The exact railway station on each ticket, because Guangzhou Station and Guangzhou Baiyun swapped roles in January 2026.",
        "Canton Fair session dates if the trip lands near one, because hotel prices and transport demand change city-wide.",
        "Entry eligibility and border processing for Hong Kong or Macao, which are separate from mainland travel.",
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
      text: "Is Guangzhou worth a dedicated stay, or should I only transit?",
    },
    {
      id: "faq-1",
      type: "paragraph",
      text: "Stay when Cantonese food culture, Lingnan urban history or the South China route matters. Two nights create one strong city day; three let the old city and the Pearl River axis coexist. Transit only when the wider route is already full.",
    },
    {
      id: "faq-2-heading",
      type: "heading",
      level: 3,
      text: "Which Baiyun terminal should I use?",
    },
    {
      id: "faq-2",
      type: "paragraph",
      text: "The one assigned to your exact flight, which will be T2 or T3. T1 has been closed to passengers since 7 May 2026 with no announced reopening. T2 has direct metro and intercity stations; T3 has an intercity station but no direct metro, so the airport advises Line 3 or Line 9 to Gaozeng and then the shuttle.",
    },
    {
      id: "faq-3-heading",
      type: "heading",
      level: 3,
      text: "Which Guangzhou station goes to Hong Kong?",
    },
    {
      id: "faq-3",
      type: "paragraph",
      text: "Search Guangzhou South first for Hong Kong West Kowloon, and check Guangzhou East separately for your date. Then compare the hotel-to-station journey: the right answer is the train that exists and produces the best complete trip.",
    },
    {
      id: "faq-4-heading",
      type: "heading",
      level: 3,
      text: "Has Guangzhou Railway Station changed?",
    },
    {
      id: "faq-4",
      type: "paragraph",
      text: "Yes. From 26 January 2026 it stopped originating and terminating conventional trains and took over Beijing–Guangzhou high-speed services that previously started at Guangzhou Baiyun, which now concentrates on conventional trains and other high-speed directions. Book from the current timetable, not an older description.",
    },
    {
      id: "faq-5-heading",
      type: "heading",
      level: 3,
      text: "Does Chimelong require a separate hotel?",
    },
    {
      id: "faq-5",
      type: "paragraph",
      text: "Not always. A Panyu night can protect an early park start or a next-day Guangzhou South train, but it adds a luggage move. Split only when the saved transfer outweighs checkout and check-in. Either way, Chimelong is a separate full day.",
    },
    {
      id: "faq-6-heading",
      type: "heading",
      level: 3,
      text: "How should ordinary tourists handle the Canton Fair?",
    },
    {
      id: "faq-6",
      type: "paragraph",
      text: "Book earlier, keep flexible terms, and expect stronger demand around Pazhou and the business districts. Stay near the fair only if you are attending repeatedly; otherwise keep the hotel aligned with your sightseeing and check the official session dates.",
    },
    {
      id: "cta-heading",
      type: "heading",
      level: 2,
      text: "Turn the Guangzhou choice into a route",
    },
    {
      id: "cta-1",
      type: "paragraph",
      text: "When the trip is still a set of cities, test which sequence the available nights can hold. When flights and a day-by-day plan exist, the better question is whether the terminal, the station and the hotel were chosen as one chain.",
    },
    {
      id: "cta-links",
      type: "internal-links",
      title: "Two ways to continue",
      items: [
        {
          label: "Route Finder",
          href: "/#route-finder",
          description: "Test which city sequence fits the nights you actually have.",
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
            "Baiyun T1 airlines relocated to T3 and the T1-linked rail stations became non-stopping from 7 May 2026",
          url: "https://www.eguangzhou.gov.cn/gzlatest/content/post_42957.html",
          publisher: "Foreign Affairs Office of Guangzhou Municipal Government",
          reviewedAt: "2026-08-17",
        },
        {
          label:
            "T1 ceased operations; T3 has no direct metro link and the airport advises Line 3 or Line 9 to Gaozeng plus the shuttle",
          url: "https://www.eguangzhou.gov.cn/gzlatest/content/post_43024.html",
          publisher: "Foreign Affairs Office of Guangzhou Municipal Government",
          reviewedAt: "2026-08-17",
        },
        {
          label:
            "From 26 January 2026 Guangzhou Station no longer originates or terminates conventional trains",
          url: "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10648700.html",
          publisher: "People's Government of Guangzhou Municipality",
          reviewedAt: "2026-08-17",
        },
        {
          label:
            "Guangzhou Station moves to high-speed operation while Guangzhou Baiyun takes on conventional services",
          url: "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10675644.html",
          publisher: "People's Government of Guangzhou Municipality",
          reviewedAt: "2026-08-17",
        },
        {
          label: "China Railway 12306 — confirm the exact station pair before booking",
          url: "https://www.12306.cn/en/index.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-17",
        },
        {
          label:
            "Hero: Chen Clan Ancestral Hall by Shujianyang, CC BY-SA 4.0; cropped and converted",
          url: "https://commons.wikimedia.org/wiki/File:Chen_Clan_Ancestral_Hall_2025.06_01.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-17",
        },
        {
          label: "Shamian Island photograph by xiquinhosilva, CC BY 2.0; cropped and converted",
          url: "https://commons.wikimedia.org/wiki/File:Shamian_Island_03111-Guangzhou_(32831146512).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-17",
        },
        {
          label:
            "Zhujiang New Town photograph by Nissangeniss, CC BY-SA 4.0; cropped and converted",
          url: "https://commons.wikimedia.org/wiki/File:The_architectural_complex_of_the_Zhujiang_New_Town_in_2017_12(2).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-17",
        },
        {
          label: "Licence: CC BY-SA 4.0",
          url: "https://creativecommons.org/licenses/by-sa/4.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-17",
        },
        {
          label: "Licence: CC BY 2.0",
          url: "https://creativecommons.org/licenses/by/2.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-17",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
