import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "decision-lead",
      type: "lead",
      text: "Beijing South, West, Chaoyang, Fengtai and Qinghe are separate railway stations in different parts of a very large city. The full station name on the issued ticket is an instruction, not a suggestion. Before buying, compare the train's station with the hotel and whole city transfer; after buying, route to that exact station.",
    },
    {
      id: "quick-answer",
      type: "callout",
      title: "The short answer",
      tone: "decision",
      body: "Beijing South is the usual first comparison for Tianjin and the Shanghai corridor; Beijing West for many Zhengzhou, Wuhan, Changsha, Guangzhou, Hong Kong and western routes; Beijing Chaoyang for the northeast; Beijing Fengtai for a different set of southwest and westbound services; and Qinghe for Badaling, Zhangjiakou and many northwest services. These are patterns, not booking rules. Match the exact Chinese station name, train number and date in the live itinerary before paying or leaving the hotel.",
    },
    {
      id: "scope-callout",
      type: "callout",
      title: "This is a station decision guide, not another high-speed-rail manual",
      tone: "neutral",
      body: "Ticket purchase, Railway 12306 accounts, passport verification, seat classes, railway baggage limits, security, station entry and boarding are covered in Homeground's first-time China high-speed-train guide. This page stays with five Beijing terminals: ticket names, route direction, hotel geography, city-transfer friction, early or late trains, suitcases and wrong-station recovery.",
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
        "Match the Chinese station name: 北京南站, 北京西站, 北京朝阳站, 北京丰台站 or 清河站. English renderings can vary between “Beijing South” and “Beijingnan,” or “Beijing West” and “Beijingxi.”",
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
      body: "The railway ticket says Qinghe / 清河站, not “Beijing Qinghe.” It is still a major Beijing terminal. Conversely, Beijing Railway Station / 北京站, Beijing North / 北京北站 and Beijing Tongzhou / 北京通州站 are other stations, not alternative names for any of the five in this matrix. If the ticket shows one of those, stop and route to that exact station instead of forcing it into this guide.",
    },
    {
      id: "matrix-heading",
      type: "heading",
      level: 2,
      text: "The five-station decision matrix",
    },
    {
      id: "station-matrix",
      type: "table",
      caption: "Use direction to shortlist; use the live ticket to decide",
      columns: ["Ticket and map name", "Typical rail corridor", "City position and hotel fit", "Direct subway and practical friction"],
      rows: [
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
          "Beijing Chaoyang / 北京朝阳站",
          "Northeast: Chengde, Shenyang, Dalian, Changchun, Changbaishan and Harbin are common",
          "East-northeast Beijing; strongest of the five for Sanlitun or a hotel with easy access to Workers' Stadium and Line 3",
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
      ],
    },
    {
      id: "matrix-note",
      type: "paragraph",
      text: "Beijing's official hub plan describes broad corridors: South for the southeast, West and Fengtai for the southwest, Chaoyang for the east and northeast, and Qinghe with Beijing North for the northwest. Railway operating plans can move, add or split trains, and several destinations appear at more than one Beijing terminal. Never replace a live station check with a memorised destination list.",
    },
    {
      id: "station-figure",
      type: "figure",
      src: "/images/guides/which-beijing-railway-station/chaoyang-line-3-b1-1440.webp",
      alt: "Real bilingual wayfinding between Beijing Subway Line 3 and the B1 railway entrance at Beijing Chaoyang Railway Station.",
      width: 1440,
      height: 960,
      caption: "Line 3 solved the old no-subway problem at Beijing Chaoyang—but only travellers whose hotel route reaches Line 3 simply receive the full benefit.",
    },
    {
      id: "south-west-comparison",
      type: "comparison",
      title: "South and West are central enough to look interchangeable—but they are not",
      columns: [
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
      title: "Chaoyang, Fengtai and Qinghe make hotel geography more important",
      columns: [
        {
          heading: "Beijing Chaoyang",
          body: "The northeast high-speed gateway and the clearest match for a Sanlitun or east-side stay when Line 3 works.",
          items: [
            "Line 3 reaches the transport hub and B1 entrance",
            "Road drop-off uses the North or South Entrance; those platforms are drop-off only",
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
          "South via Line 4/14 connections; West via Line 7 from Zhushikou can also be practical",
          "The exact hotel may be far from the useful metro entrance; hutong-edge roads and pedestrian areas complicate a car pickup",
        ],
        [
          "Wangfujing or central Dongcheng",
          "No universal winner; South and West often need one planned transfer, while Chaoyang depends on access to Line 3",
          "A short-looking map distance can hide two metro lines, security at metro entrances and the station's internal walk",
        ],
        [
          "Sanlitun or Workers' Stadium",
          "Chaoyang has the clearest direct Line 3 advantage",
          "Line 10 may technically reach Fengtai without a transfer, but the ride circles a large part of the city; South, West and Qinghe need a different chain",
        ],
        [
          "Northern hutongs",
          "Chaoyang can work through Line 3; Qinghe may become reasonable from a genuinely northern starting point",
          "“North Beijing” is too broad: verify the walk to the first useful line and whether luggage can reach the pickup street",
        ],
        [
          "Haidian, Xizhimen or Shangdi",
          "Qinghe often deserves the first comparison; West may suit a western metro connection",
          "South, Chaoyang and Fengtai cross different sides of the city, so the train's scheduled advantage may disappear door to door",
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
      text: "This article does not repeat national railway baggage rules. The Beijing-specific question is whether everyone can move every case through the hotel walk, metro security, platforms, transfers, railway entrance and waiting hall. Beijing West's north–south layout, Fengtai's multiple levels and the road pickup walks published for several stations can matter more than one extra metro stop.",
    },
    {
      id: "luggage-comparison",
      type: "comparison",
      title: "Let the hardest handoff decide the city transfer",
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
            "Request railway assistance through the responsible operator when needed",
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
      alt: "Real railway, subway, taxi and ride-hailing wayfinding inside Beijing Fengtai or Qinghe Railway Station.",
      width: 1440,
      height: 960,
      caption: "Recovery begins by reading the transport system, station and level on the sign—not by following the nearest train icon.",
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
      body: "At this review, Beijing South used Lines 4 and 14; Beijing West Lines 7 and 9; Beijing Chaoyang Line 3; Beijing Fengtai Lines 10 and 16; and Qinghe Line 13 and the Changping Line. Line 3's direct Chaoyang hub connection was operating. Fengtai's new underground express entrance applied to qualifying conventional-speed passengers, not every high-speed departure. Railway stopping patterns, metro hours, entrances, gates, road controls and taxi or ride-hailing zones remain travel-date checks.",
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
      title: "Official sources and review record",
      items: [
        {
          label: "Beijing railway-hub corridor roles and eight-station network",
          url: "https://www.beijing.gov.cn/ywdt/gzdt/202512/t20251227_4368256.html",
          publisher: "People's Government of Beijing Municipality; source: Beijing Daily",
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
          label: "Line 3 connection to Beijing Chaoyang and subway access to the seven major stations",
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
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
