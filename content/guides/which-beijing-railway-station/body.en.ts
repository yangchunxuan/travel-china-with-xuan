import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "decision-lead",
      type: "lead",
      text: "Beijing Railway Station, West, South, North, Qinghe, Chaoyang, Fengtai and Tongzhou are eight separate railway terminals in different parts of a very large city. Once a ticket is issued, its full station name is the station you must use. Before booking, compare that station with the hotel and the complete door-to-door transfer; after booking, route to the exact name on the ticket.",
    },
    {
      id: "quick-answer",
      type: "callout",
      title: "The short answer",
      tone: "decision",
      body: "Beijing Railway Station commonly serves eastern and northeastern routes; South is the usual first comparison for Tianjin and the Shanghai corridor; West and Fengtai divide many southern, western and southwestern services; North and Qinghe are the main northwest pair; Chaoyang serves many northeast services; and Tongzhou serves a newer group of eastbound intercity trains. These are orientation patterns, not booking rules. Match the exact Chinese station name, train number and date in the live itinerary before paying or leaving the hotel.",
    },
    {
      id: "scope-callout",
      type: "callout",
      title: "This is a station decision guide, not another high-speed-rail manual",
      tone: "neutral",
      body: "Ticket purchase, Railway 12306 accounts, passport verification, seat classes, railway baggage limits, security, station entry and boarding are covered in Homeground's first-time China high-speed-train guide. This page compares Beijing's eight major terminals: ticket names, route direction, hotel geography, early or late trains, luggage and what to do after a station mistake.",
    },
    {
      id: "ticket-heading",
      type: "heading",
      level: 2,
      text: "Read the railway ticket before opening the city map",
    },
    {
      id: "ticket-checklist",
      type: "list",
      ordered: true,
      items: [
        "Copy the complete departure or arrival station from the issued itinerary. Do not shorten it to “Beijing.”",
        "Match the Chinese station name: 北京站, 北京西站, 北京南站, 北京北站, 清河站, 北京朝阳站, 北京丰台站 or 北京通州站. English renderings can vary between “Beijing South” and “Beijingnan,” or “Beijing West” and “Beijingxi.”",
        "Check the train number and date at the same time. A screenshot from an earlier search is not proof of the issued station.",
        "Open the railway station—not a similarly named subway stop, district or generic city pin—in the map app.",
        "For departure, save the current entrance or drop-off point only after the ticket shows a check-in gate or the station publishes a suitable access route.",
      ],
    },
    {
      id: "name-warning",
      type: "callout",
      title: "Qinghe is the name most easily overlooked",
      tone: "warning",
      body: "The railway ticket says Qinghe / 清河站, not “Beijing Qinghe.” It is still one of Beijing's eight major terminals. None of the eight names in the matrix is a substitute for another: Beijing / 北京站, Beijing North / 北京北站 and Beijing Tongzhou / 北京通州站 are all distinct stations.",
    },
    {
      id: "matrix-heading",
      type: "heading",
      level: 2,
      text: "The eight-station decision matrix",
    },
    {
      id: "station-matrix",
      type: "table",
      caption: "Use direction to shortlist all eight terminals; use the live ticket to decide",
      columns: ["Ticket and map name", "Typical rail corridor", "City position and hotel fit", "Direct subway and practical friction"],
      rows: [
        [
          "Beijing Railway Station / 北京站",
          "East and northeast: eastern Hebei, Liaoning and some services toward Nanjing or Shanghai are common patterns",
          "On the eastern edge of the old city; often the simplest rail terminal from Qianmen, Wangfujing and central Dongcheng",
          "Line 2 connects directly; road traffic around the station and the walk from the correct exit still need time",
        ],
        [
          "Beijing South / 北京南站 (also rendered Beijingnan)",
          "Southeast: Tianjin, Shandong, Nanjing, Suzhou, Hangzhou and Shanghai are common patterns",
          "South of the old city; often easier from Qianmen, Xidan or hotels with a simple Line 4 or 14 connection",
          "Lines 4 and 14 are integrated with the railway station; the large hall, gate-specific entrances and final internal walk still need time",
        ],
        [
          "Beijing West / 北京西站 (also rendered Beijingxi)",
          "South and west: Zhengzhou, Wuhan, Changsha, Guangzhou, Hong Kong, Xi'an and other long-distance routes are common",
          "West-southwest of the central visitor area; comparatively useful from Xidan, Financial Street, Military Museum or a practical Line 7/9 route",
          "Lines 7 and 9; north and south squares, multiple pickup zones and a large upper waiting level make the correct side important",
        ],
        [
          "Beijing North / 北京北站 (also rendered Beijingbei)",
          "Northwest: Badaling and Zhangjiakou are common, with some services continuing farther northwest",
          "Beside Xizhimen; often better aligned with northern Dongcheng, Xicheng and hotels that reach Lines 2, 4 or 13 simply",
          "Use Xizhimen's Lines 2, 4 and 13 connections, then follow the railway-station signs rather than a generic Xizhimen pin",
        ],
        [
          "Beijing Chaoyang / 北京朝阳站",
          "Northeast: Chengde, Shenyang, Dalian, Changchun, Changbaishan and Harbin are common",
          "East-northeast Beijing; usually the best station match for Sanlitun or a hotel with easy access to Workers' Stadium and Line 3",
          "Line 3 now connects directly to the B1 railway entrance; central-west and southern hotels can still face a long cross-city approach",
        ],
        [
          "Beijing Fengtai / 北京丰台站",
          "Southwest and west: many services toward Shanxi, Henan, Shaanxi, Jiangxi and Fujian, with some destinations also served from West",
          "Southwest Beijing; compare carefully from central or eastern hotels even if the map shows a one-line metro route",
          "Lines 10 and 16 are integrated; this is a large, vertically layered hub, and high-speed and conventional-train paths are not identical",
        ],
        [
          "Qinghe / 清河站",
          "Northwest: Badaling, Zhangjiakou, Hohhot and Datong are common; some longer central and western services also use Qinghe",
          "Northwestern Haidian near Shangdi; best aligned with north or northwest hotels, Line 13 or the Changping Line",
          "Line 13 and Changping Line are integrated; a central, southern or eastern hotel can turn a short rail journey into a long first-mile transfer",
        ],
        [
          "Beijing Tongzhou / 北京通州站",
          "Eastbound intercity: Tangshan, Qinhuangdao and Tianjin Beichen are among the initial common patterns",
          "Farther east in Tongzhou; best aligned with Tongzhou or the Universal Resort side of Beijing rather than a central or western hotel",
          "Line 6 is integrated with the hub; from the historic centre, the cross-city approach can outweigh a short intercity timetable",
        ],
      ],
    },
    {
      id: "matrix-note",
      type: "paragraph",
      text: "Beijing's official eight-station network assigns broad corridor roles: South for the southeast; West and Fengtai for the southwest; Chaoyang for the east and northeast; North and Qinghe for the northwest; Beijing Railway Station for several eastern services; and Tongzhou for a newer set of eastbound intercity trains. Railway operating plans can move, add or split trains, and several destinations appear at more than one terminal. Never replace a live station check with a memorised destination list.",
    },
    {
      id: "station-figure",
      type: "figure",
      src: "/images/guides/which-beijing-railway-station/chaoyang-line-3-b1-1440.webp",
      alt: "Subway entrance inside the integrated transport hub at Beijing Chaoyang Railway Station.",
      width: 1440,
      height: 960,
      caption: "Beijing Chaoyang's integrated transport hub connects the railway station with the subway. Photo: N509FZ/Wikimedia Commons, CC BY-SA 4.0; cropped.",
    },
    {
      id: "south-west-comparison",
      type: "comparison",
      title: "Beijing Station, South and West serve different sides of the centre",
      columns: [
        {
          heading: "Beijing Railway Station",
          body: "The east-central terminal that can be the cleanest match for Qianmen, Wangfujing and several eastbound services.",
          items: [
            "Line 2 connects the station with Qianmen, Jianguomen and other central interchanges",
            "Do not confuse Beijing Railway Station with the city's generic railway label",
            "A central hotel can make this station easier than an outer hub even when the rail timetable is similar",
          ],
        },
        {
          heading: "Beijing South",
          body: "The station most first-time visitors associate with the Beijing–Shanghai and Beijing–Tianjin corridors.",
          items: [
            "Line 4 can be useful from Xidan and other north–south locations",
            "Line 14 can be useful from the southern or southeastern network",
            "The official 2026 guide describes different entrances for different gate groups; check the live gate before pinning a car",
            "Do not plan around the lower-level rapid-entry halls as permission to arrive late",
          ],
        },
        {
          heading: "Beijing West",
          body: "A major gateway for southbound and westbound routes, including the direct Beijing–Zhangjiajie example used elsewhere on Homeground.",
          items: [
            "Line 7 is useful from Zhushikou and the southern old-city edge",
            "Line 9 connects with western and north–south lines",
            "North and south entrances lead into the same station but can create very different road drop-offs",
            "A generic “Beijing West” ride-hailing pin can leave a longer luggage walk than an entrance-specific pin",
          ],
        },
      ],
    },
    {
      id: "outer-hubs-comparison",
      type: "comparison",
      title: "The five outer hubs make hotel geography more important",
      columns: [
        {
          heading: "Beijing North",
          body: "The Xizhimen-side northwest terminal used by some Badaling and Zhangjiakou services.",
          items: [
            "Lines 2, 4 and 13 meet at Xizhimen",
            "The complete railway station name matters because Xizhimen is also a large subway interchange",
            "Check the actual train: similar northwest destinations may also use Qinghe",
          ],
        },
        {
          heading: "Beijing Chaoyang",
          body: "The northeast high-speed gateway and the clearest match for a Sanlitun or east-side stay when Line 3 works.",
          items: [
            "Line 3 reaches the integrated transport hub",
            "Use current station signs and the live itinerary to choose the railway entrance",
            "Do not confuse Chaoyang Railway Station with the huge Chaoyang District or Chaoyangmen",
          ],
        },
        {
          heading: "Beijing Fengtai",
          body: "A southwest hub that can share destination names with West while using a completely different city approach.",
          items: [
            "Lines 10 and 16 connect inside the hub",
            "A one-seat Line 10 route can still be a long arc from an eastern hotel",
            "The 2026 underground express entrance is for eligible conventional-speed departures—not a universal high-speed shortcut",
          ],
        },
        {
          heading: "Qinghe",
          body: "The northwestern gateway that often matters for Badaling, Zhangjiakou and routes beyond the Great Wall corridor.",
          items: [
            "Lines 13 and Changping serve the integrated station",
            "Xizhimen, Haidian and northern hotels usually align better than Qianmen or the southern city",
            "A Great Wall plan must still use the exact train and station shown for that date",
          ],
        },
        {
          heading: "Beijing Tongzhou",
          body: "The newer east-side intercity hub, best aligned with Tongzhou rather than the historic centre by default.",
          items: [
            "Line 6 is integrated with the station",
            "Initial intercity patterns include Tangshan, Qinhuangdao and Tianjin Beichen",
            "A central or western hotel can turn the approach into the longest part of the journey",
          ],
        },
      ],
    },
    {
      id: "hotel-heading",
      type: "heading",
      level: 2,
      text: "Test the station against the hotel door, not the district label",
    },
    {
      id: "hotel-table",
      type: "table",
      caption: "How common first-trip hotel situations change the first-mile test",
      columns: ["Hotel situation", "Station that often aligns better", "Hidden friction to check"],
      rows: [
        [
          "Qianmen or the southern Central Axis",
          "Beijing Railway Station via Line 2, South via Line 4/14 connections, or West via Line 7 from Zhushikou can be practical",
          "The exact hotel may be far from the useful metro entrance; hutong-edge roads and pedestrian areas complicate a car pickup",
        ],
        [
          "Wangfujing or central Dongcheng",
          "Beijing Railway Station is often the first comparison; South and West usually need a planned transfer, while Chaoyang depends on access to Line 3",
          "A short-looking map distance can hide two metro lines, security at metro entrances and the station's internal walk",
        ],
        [
          "Sanlitun or Workers' Stadium",
          "Chaoyang has the clearest direct Line 3 advantage",
          "Line 10 may technically reach Fengtai without a transfer, but the ride circles a large part of the city; South, West and Qinghe need a different chain",
        ],
        [
          "Northern hutongs",
          "Beijing North can fit Xizhimen-side routes; Chaoyang can work through Line 3; Qinghe may become reasonable from a genuinely northern starting point",
          "“North Beijing” is too broad: verify the walk to the first useful line and whether luggage can reach the pickup street",
        ],
        [
          "Haidian, Xizhimen or Shangdi",
          "Qinghe and Beijing North deserve the first comparison; West may suit a western metro connection",
          "South, Chaoyang and Fengtai cross different sides of the city, so the train's scheduled advantage may disappear door to door",
        ],
        [
          "Tongzhou or the Universal Resort side of Beijing",
          "Beijing Tongzhou is the natural first comparison when the live ticket uses it",
          "From Qianmen, Wangfujing, Sanlitun or western Beijing, the cross-city approach can be substantial; do not choose a hotel there solely for one departure",
        ],
      ],
    },
    {
      id: "hotel-rule",
      type: "callout",
      title: "Do not move a whole Beijing stay for one train automatically",
      tone: "decision",
      body: "If one early departure is the only station-sensitive event, compare a planned car, a final-night hotel change and the cost of staying in a less useful sightseeing area. For most first trips, the better base serves several Beijing days; the correct station transfer is then designed around that base. Homeground's Beijing accommodation guide compares Wangfujing, Qianmen, Sanlitun and the northern hutongs in that wider context.",
    },
    {
      id: "early-late-heading",
      type: "heading",
      level: 2,
      text: "Early and late trains turn the subway map into an operating-hours question",
    },
    {
      id: "early-late-table",
      type: "table",
      caption: "Test the whole hotel-to-platform or platform-to-hotel chain",
      columns: ["Situation", "What to calculate", "Practical stance"],
      rows: [
        [
          "First train of the morning",
          "First usable metro from the hotel's actual station, transfer opening, railway-station walk and the normal entry buffer",
          "If any link is marginal, arrange a road transfer to a verified entrance instead of planning to sprint",
        ],
        [
          "Late-night arrival",
          "Time the group is likely to clear the railway exit, find the subway or pickup area and catch the last useful onward connection",
          "A train's arrival time is not the last-metro boarding time; prepare a taxi or ride-hailing fallback",
        ],
        [
          "Weekend or public-holiday peak",
          "Temporary metro extensions, station controls, taxi queues and road restrictions published for the exact date",
          "Treat an extended service as a dated exception, not a normal timetable",
        ],
        [
          "Same-day attraction or flight after the train",
          "Station exit, luggage handoff and cross-city transfer before the next fixed deadline",
          "Choose the whole chain before buying a nominally faster train from the wrong side of Beijing",
        ],
      ],
    },
    {
      id: "hours-warning",
      type: "callout",
      title: "A direct subway line is not the same as a 24-hour connection",
      tone: "warning",
      body: "Beijing sometimes extends selected metro lines for a holiday travel peak, but the affected lines and dates change. Check the current first and last service in the official network or a live map for the travel date. Do not use an old holiday notice to plan an ordinary Tuesday, and do not assume the final metro waits for a delayed railway arrival.",
    },
    {
      id: "luggage-heading",
      type: "heading",
      level: 2,
      text: "With luggage, count handoffs rather than coloured lines",
    },
    {
      id: "luggage-copy",
      type: "paragraph",
      text: "This article does not repeat national railway baggage rules. The Beijing-specific question is whether everyone can move every case through the walk from the hotel, metro security, transfers, the railway entrance and the waiting hall. A route with fewer transfers and a clearly identified entrance can be easier than one that looks a few minutes shorter on the map.",
    },
    {
      id: "luggage-comparison",
      type: "comparison",
      title: "Let the hardest part of the journey decide the city transfer",
      columns: [
        {
          heading: "Metro can win",
          items: [
            "The hotel entrance is genuinely close to the useful line",
            "The route has no difficult transfer or the lifts are known",
            "Each traveller can control their own case through security and crowds",
          ],
        },
        {
          heading: "A car can win",
          items: [
            "Several large cases, a stroller or a slower walker make transfers fragile",
            "The first or last metro does not leave a safe station buffer",
            "The station entrance can be pinned precisely and road conditions remain acceptable",
          ],
        },
        {
          heading: "Assistance needs advance work",
          items: [
            "Request special-passenger assistance through Railway 12306 or the station when needed",
            "Ask the hotel where a vehicle can actually stop, especially on a pedestrian or hutong street",
            "Keep the Chinese station and entrance name available for the driver and staff",
          ],
        },
      ],
    },
    {
      id: "wrong-heading",
      type: "heading",
      level: 2,
      text: "If you go to the wrong Beijing station, recover in this order",
    },
    {
      id: "wrong-warning",
      type: "callout",
      title: "The wrong station and the wrong entrance are different problems",
      tone: "warning",
      body: "At the correct railway station but the wrong square, level or entrance, follow internal signs or ask staff before leaving the complex. At a different railway station, there is no airside-style transfer and no assumption that the same ticket boards there. First establish which problem you actually have.",
    },
    {
      id: "recovery-steps",
      type: "list",
      ordered: true,
      items: [
        "Stop moving and open the issued ticket. Confirm the Chinese departure station, train number, date and departure time.",
        "Show the station name to railway or metro staff. Ask whether you are inside the correct railway complex but at an inconvenient entrance, or at a completely different station.",
        "If the correct station is elsewhere and there is a genuine buffer, compare a live metro route with a correctly pinned car. Include the wait, road traffic, luggage movement and a normal railway entry margin; do not use a fixed internet transfer time as a guarantee.",
        "If the buffer is not safe, contact China Railway 12306, the station service desk or the booking channel immediately to learn the current change or refund options for that ticket. Do not let the group split across stations with the passports and luggage separated.",
        "After the ticket status is clear, rebuild the hotel, attraction, flight or onward transfer. A hurried cross-city ride without a usable ticket only creates a second problem.",
      ],
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "Choose the recovery action by the actual mistake",
      columns: ["What happened", "Immediate action", "What not to assume"],
      rows: [
        [
          "Correct station, wrong entrance or square",
          "Use station signs or staff to reach the correct waiting area; ask before exiting the full complex",
          "Do not order a cross-city car just because the map pin looks different",
        ],
        [
          "Different station, plenty of verified time",
          "Move as one group using the live metro or road route and recheck the station name on arrival",
          "Do not subtract only the vehicle ride from the departure time",
        ],
        [
          "Different station, tight or uncertain time",
          "Ask the railway or booking channel about ticket options while deciding whether travel to the correct station is still rational",
          "Do not expect the train to wait or the ticket to be accepted at the wrong station",
        ],
        [
          "Train has departed",
          "Seek the current official handling option for that exact ticket and train status",
          "Do not rely on an old blog's universal change or refund promise",
        ],
      ],
    },
    {
      id: "recovery-figure",
      type: "figure",
      src: "/images/guides/which-beijing-railway-station/fengtai-qinghe-transfer-1440.webp",
      alt: "Central hall inside Beijing Fengtai Railway Station.",
      width: 1440,
      height: 960,
      caption: "At a large station such as Beijing Fengtai, confirm the station name, hall and current signs before changing course. Photo: N509FZ/Wikimedia Commons, CC BY-SA 4.0; cropped.",
    },
    {
      id: "verify-heading",
      type: "heading",
      level: 2,
      text: "Final check before paying or leaving the hotel",
    },
    {
      id: "verification-list",
      type: "list",
      ordered: true,
      items: [
        "Complete Chinese departure and arrival station names on the live itinerary",
        "Train number, travel date and issued ticket status",
        "Typical corridor used only as a reasonableness check—not as proof",
        "Hotel door to the first useful metro entrance or legal vehicle pickup point",
        "Current subway first or last service and every required transfer",
        "Railway entrance, square or drop-off pin suitable for the published gate when available",
        "Suitcase, stroller, child and slower-walker handoffs across the whole chain",
        "A wrong-station recovery threshold: when to stop travelling across town and ask about the ticket",
      ],
    },
    {
      id: "fact-check-box",
      type: "callout",
      title: "Dynamic station facts reviewed August 11, 2026",
      tone: "neutral",
      body: "At this review, Beijing Railway Station used Line 2; South Lines 4 and 14; West Lines 7 and 9; North the Xizhimen interchange for Lines 2, 4 and 13; Chaoyang Line 3; Fengtai Lines 10 and 16; Qinghe Line 13 and the Changping Line; and Tongzhou Line 6. Railway stopping patterns, metro hours, entrances, gates and road controls remain travel-date checks.",
    },
    {
      id: "help-callout",
      type: "callout",
      title: "Need a human check on the station match?",
      tone: "decision",
      body: "Send the travel date, train number or proposed route, full ticket station names, hotel name, party size, luggage and any fixed deadline after the train. Homeground can flag which station-to-hotel handoffs need checking; live railway inventory and city transport still need a date-specific recheck.",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue the right part of the plan",
      items: [
        {
          label: "Use China's high-speed trains for the first time",
          href: "/guides/china-high-speed-train-first-time-guide/",
          description: "Continue with Railway 12306, passports, seats, baggage rules, security and boarding after the station is correct.",
        },
        {
          label: "Compare Beijing–Zhangjiajie–Shanghai transport",
          href: "/guides/beijing-zhangjiajie-shanghai-transport/",
          description: "See Beijing West inside a real door-to-door city-pair decision.",
        },
        {
          label: "Choose where to stay in Beijing on a first trip",
          href: "/guides/beijing-where-to-stay-first-trip/",
          description: "Compare Wangfujing, Qianmen, Sanlitun and the northern hutongs by the whole itinerary, not one train alone.",
        },
        {
          label: "Check whether the full China itinerary is too rushed",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description: "Count station access and recovery time as part of the travel day.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources and image credits",
      items: [
        {
          label: "Beijing railway-hub corridor roles and eight-station network",
          url: "https://www.beijing.gov.cn/ywdt/gzdt/202512/t20251227_4368256.html",
          publisher: "People's Government of Beijing Municipality; source: Beijing Daily",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Beijing Tongzhou Railway Station opening, Line 6 integration and initial intercity services",
          url: "https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202512/t20251231_4381067.html",
          publisher: "Beijing International Web Portal",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Typical destination patterns and direct subway lines for Beijing's railway stations",
          url: "https://english.beijing.gov.cn/latest/news/202412/t20241225_3973421.html",
          publisher: "Beijing International Web Portal; source: Beijing Daily App",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Current Beijing railway-station entrances, subway access and gate layouts published March 2026",
          url: "https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202603/t20260311_4554596.html",
          publisher: "People's Government of Beijing Municipality; source: Beijing Daily",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Line 3 connection to Beijing Chaoyang and subway access published in 2024",
          url: "https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202412/t20241216_3966828.html",
          publisher: "Beijing International Web Portal",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Beijing Chaoyang transport-hub entrances, Line 3 and vehicle zones",
          url: "https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202412/t20241217_3967615.html",
          publisher: "Beijing International Web Portal",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Beijing Fengtai underground express entrance effective May 2026",
          url: "https://english.beijing.gov.cn/latest/news/202605/t20260514_4650790.html",
          publisher: "Beijing International Web Portal; source: Beijing Fabu",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Taxi and ride-hailing pickup guidance for Beijing's major railway stations",
          url: "https://english.beijing.gov.cn/travellinginbeijing/transportation/railway/202510/t20251011_4221239.html",
          publisher: "Beijing International Web Portal; source: China Railway Beijing Group",
          reviewedAt: "2026-08-11",
        },
        {
          label: "China Railway 12306 live train search",
          url: "https://www.12306.cn/en/index.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Example of date-specific holiday metro service adjustments",
          url: "https://english.beijing.gov.cn/latest/news/202602/t20260224_4537348.html",
          publisher: "Beijing International Web Portal",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Railway 12306 special-passenger service reservation guidance",
          url: "https://kyfw.12306.cn/otn/view/icentre_qxyyInfo.html",
          publisher: "China Railway 12306",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Hero image: Beijing Chaoyang Railway Station (20251220131259), N509FZ, CC BY-SA 4.0",
          url: "https://commons.wikimedia.org/wiki/File:Beijing_Chaoyang_Railway_Station_(20251220131259).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Body image: Entrance of Metro Chaoyang Railway Station (20241215172322), N509FZ, CC BY-SA 4.0",
          url: "https://commons.wikimedia.org/wiki/File:Entrance_of_Metro_Chaoyang_Railway_Station_(20241215172322).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Body image: Central lobby of Beijing Fengtai Railway Station (20220620140021), N509FZ, CC BY-SA 4.0",
          url: "https://commons.wikimedia.org/wiki/File:Central_lobby_of_Beijing_Fengtai_Railway_Station_(20220620140021).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-11",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
