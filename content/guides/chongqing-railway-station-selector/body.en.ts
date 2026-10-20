import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const cqTour = "chongqing-wulong-5-day-private-tour";
const cdcqTour = "chengdu-chongqing-8-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "decision-lead",
      type: "lead",
      text: "Chongqing has four main railway stations for travellers: Chongqing North (重庆北站), Chongqing West (重庆西站), Chongqing East (重庆东站, opened in 2025) and Shapingba (沙坪坝站). The old Chongqing Station (重庆站) at Caiyuanba has had no passenger trains since 2022. There is no single “best” station: the right one is the station printed on your ticket, and before you book it is the one with a suitable train on your date that is easiest to reach from your hotel door.",
    },
    {
      id: "stations-at-a-glance",
      type: "table",
      caption: "The four stations at a glance, and the one that is closed (checked 20 August 2026)",
      columns: ["Station", "Chinese name to show a driver", "Where", "Metro"],
      rows: [
        ["Chongqing North", "重庆北站", "Longtousi, on the Yubei side", "North Square: Lines 4 and 10; South Square: Lines 3 and 10 and the Loop Line"],
        ["Chongqing West", "重庆西站", "Shangqiao, west and southwest of the centre", "Line 5 and the Loop Line"],
        ["Chongqing East (opened 2025)", "重庆东站", "Southeast of Chayuan, Nan’an", "Line 6 East section, then a same-platform transfer into Line 6"],
        ["Shapingba", "沙坪坝站", "Shapingba's commercial centre", "Lines 1 and 9 and the Loop Line"],
        ["Chongqing Station (closed)", "重庆站", "Caiyuanba", "No passenger trains since 2022; under reconstruction"],
      ],
    },
    {
      id: "quick-answer",
      type: "callout",
      title: "Which Chongqing station should I use?",
      tone: "decision",
      body: "Ticket already issued: go to the station printed on it, matched character for character (重庆北, 重庆西, 重庆东 or 沙坪坝). The four are far apart, and one cannot stand in for another. Not booked yet: search your date on 12306 and note the station each train leaves from. In 2026 official examples, Chengdu trains ran from Shapingba, North and West; Guiyang and Guangzhou trains from West; Qianjiang, Wulong and some Zhangjiajie and Changsha trains from East. When two trains suit you, take the one whose station is easier to reach from your hotel door: often Shapingba for a Shapingba hotel and East for Nan'an or Chayuan. The ticket, not this list, has the last word.",
    },
    {
      id: "traps-heading",
      type: "heading",
      level: 2,
      text: "Six Chongqing station traps that cost travellers their train",
    },
    {
      id: "traps-list",
      type: "list",
      ordered: true,
      items: [
        "“Chongqing Station” is a real, closed station. 重庆站 at Caiyuanba stopped carrying passengers in 2022 and was still being rebuilt in the city's July 2026 update. Tell a driver “Chongqing railway station” and you may end up there. 重庆汽车站 is a bus station, not a railway terminal either.",
        "Direction does not decide the station. The July 2026 timetable change moved some services between Chongqing North and West (Chongqing government, June 2026), so an older guide's answer may no longer hold. “Going north, so Chongqing North” is exactly the shortcut that sends people across town.",
        "Chongqing East is new and missing from older guides. It opened in 2025 southeast of Chayuan; recent official examples make it relevant for Qianjiang, Wulong and some Zhangjiajie and Changsha searches. By metro you ride the Line 6 East section to Liujiaping (刘家坪) and change there, on the same platform, into Line 6. Lines 24 and 27 were still being built when we checked.",
        "Not every Chengdu train stops at Shapingba. It is the most central of the four for a Shapingba hotel, but Chengdu trains also leave from North and West. Only your ticket settles it.",
        "Two squares, one station. Chongqing North's north and south sides have been connected inside since 2021, but the metro still names two stops, 重庆北站北广场 and 重庆北站南广场. Arrive at the “wrong” square and you are still at the right station: follow the signs inside rather than crossing the city.",
        "A short map distance can be a long climb. Chongqing's roads, podiums, station concourses and hotel lobbies sit on different levels; a hotel's walk-in entrance and its car entrance can be floors apart. Check the whole chain of entrances, lifts and escalators, not the line on the map.",
      ],
    },
    {
      id: "traps-sales",
      type: "paragraph",
      text: "Every one of these traps catches you alone, with a ticket, a map and a clock. A private transfer takes them off your hands. Send us your train number, station and hotel; we reply within 12 hours, and before you pay we confirm in writing that a car is available for your time, the pickup point at your hotel and the total price. On the day, our own driver takes you and your luggage to the station printed on your ticket, not to the closed 重庆站. We send cars in any city in mainland China, so the station at the other end can go in the same quote. Ask for a Chongqing station transfer.",
      link: { label: "Ask for a Chongqing station transfer", href: "/services/private-car-and-driver/#car-enquiry" },
    },
    {
      id: "matrix-heading",
      type: "heading",
      level: 2,
      text: "The four stations compared",
    },
    {
      id: "station-matrix",
      type: "table",
      caption: "Rechecked 20 August 2026. Route examples are dated clues, never a substitute for your ticket",
      columns: ["Ticket says", "Where trains went in 2026 official examples", "Getting there in the city", "Mistake to avoid"],
      rows: [
        ["Chongqing North / 重庆北", "Recent 2026 official examples include Xi'an and regional services, while other trains moved between North and West", "Longtousi, Yubei side. North Square metro: Lines 4 and 10; South Square: Lines 3, 10 and Loop. Your drop-off side changes the walk inside", "Treating “northbound” as a rule, or the two square names as two stations"],
        ["Chongqing West / 重庆西", "2026 examples: Guiyang, Guangzhou and other long-distance and regional trains; some routes moved between West and North", "Shangqiao, west and southwest. Lines 5 and Loop; taxis, ride-hailing and metro sit on different levels of a big complex", "Assuming every train to Guangzhou, Guiyang or Chengdu uses West"],
        ["Chongqing East / 重庆东", "Recent examples: Qianjiang, Wulong, some Zhangjiajie and Changsha trains", "Southeast of Chayuan, Nan'an. Line 6 East section, then a same-platform change into Line 6", "Swapping an East ticket for North or West because an older guide leaves East out"],
        ["Shapingba / 沙坪坝", "Mainly when a suitable Chengdu–Chongqing high-speed or regional train runs on your date", "Inside Shapingba's commercial centre, linked to Lines 1, 9 and Loop", "Assuming every Chengdu train stops here"],
      ],
    },
    {
      id: "choice-heading",
      type: "heading",
      level: 2,
      text: "Choose the train and the city transfer together",
    },
    {
      id: "choice-table",
      type: "table",
      caption: "Pick a workable train first; let the station's location break a tie",
      columns: ["Situation", "What to do", "What to check"],
      rows: [
        ["Ticket already issued", "Both stations are fixed. Solve getting there and the pickup at the other end; do not shop for a “better” station", "Exact Chinese names, the entrance or square, the route in the city and a normal margin for station entry"],
        ["Several workable trains", "Compare hotel door to platform and platform to hotel, not just train time", "Each hotel's real entrance and street level, changes, walking inside the station and the pickup at the other end"],
        ["Early departure or late arrival", "Use the metro only if the whole chain runs at that hour; keep a road fallback", "First and last trains, interchange closing times, the signed drop-off or pickup zone and hotel reception"],
        ["Big bags, children, older parents or slow walkers", "Prefer fewer handoffs and clear lifts, even if the map distance is longer", "Lifts on the whole route, stairs, long concourses, toilets, a meeting point and the size of the car"],
        ["Only one realistic train", "Accept its station or rethink the day; another Chongqing station cannot take the same ticket", "Change and refund conditions, seats left and the knock-on cost to the rest of the trip"],
      ],
    },
    {
      id: "door-to-door-check",
      type: "list",
      ordered: true,
      items: [
        "Pin your hotel's walk-in entrance and its car entrance; in Chongqing they may be on different street levels.",
        "Build the route to the exact station, including every metro change, not just the line names.",
        "Find the station entrance, the North Station square if relevant, or the signed taxi and ride-hailing drop-off level before you leave the hotel.",
        "Add normal time for security, finding the waiting hall and walking inside the station. A car reaching the complex is not you reaching the platform.",
        "Plan the pickup at the other end separately, and reverse all of this when you arrive in Chongqing.",
      ],
    },
    {
      id: "scenarios",
      type: "comparison",
      title: "Three real decisions",
      columns: [
        { heading: "Hotel at Jiefangbei, ticket says 重庆西", items: ["West it is", "Pin the right station drop-off and the hotel's road-level lobby", "With two big cases, compare a direct car with the whole metro chain, not part of it; send us the train number and we confirm a car and its price in writing before you pay"] },
        { heading: "Hotel in Shapingba, two Chengdu trains", items: ["Consider Shapingba only if a train really leaves from there on your date", "Compare its short city transfer with the other train's full chain", "If the ticket you buy says North or West, go there"] },
        { heading: "Family in Chayuan, train to Zhangjiajie", items: ["Check East first, but do not assume it", "Confirm the exact dated train and the same-platform change from the Line 6 East section", "For a very early or late train, check the whole chain runs and keep a road fallback"] },
      ],
    },
    {
      id: "wrong-station-heading",
      type: "heading",
      level: 2,
      text: "At the wrong station? Recover in this order",
    },
    {
      id: "wrong-station-recovery",
      type: "list",
      ordered: true,
      items: [
        "Stop. Recheck the Chinese departure station, train, date, time and that the ticket is issued. Do not keep moving on a guess.",
        "Work out whether you are at the right station but the wrong entrance or level, or at a different station altogether. Ask uniformed staff if the signs are unclear.",
        "If the ticket is valid, compare the live travel time to the correct entrance plus a normal station-entry margin. If that is clearly safe, keep the ticket and go.",
        "If it is not clearly safe, sort the ticket out before crossing the city. If you bought the ticket yourself on 12306 (website, app or Alipay mini-program) less than 30 minutes ago and departure is more than 4 hours away, you may be able to refund it free as a “mistaken purchase”, once a day per account. Changed, waitlist and group tickets do not qualify, and neither do tickets bought through third-party sellers.",
        "If that is not available, check the current change and refund options or ask staff. Another Chongqing station cannot simply honour your original departure station.",
        "Only with a valid plan and enough time should you take the metro or a licensed taxi to the correct station. Keep passports, luggage and the group together.",
        "If departure is close, the app shows no workable option or the train has gone, go to the service desk or contact 12306 straight away.",
      ],
    },
    {
      id: "sales-heading",
      type: "heading",
      level: 2,
      text: "Let us drive you to the right station",
    },
    {
      id: "transfer-copy",
      type: "paragraph",
      text: "Going to the wrong station has a price. Under China Railway's rules, refunding a ticket less than 24 hours before departure costs 20% of the fare (10% at 24–48 hours, 5% from 48 hours up to 8 days). Once the train has gone, you can still change to another train that same day with no change fee, but only if seats are left, and a ticket changed after departure can no longer be refunded (China Railway 12306 refund and change rules, checked 20 October 2026). And Chongqing is the Chinese city where “it's only 2 km” can mean three levels, two lifts and a car that cannot reach your hotel's front door. With a private transfer, the pickup point at your hotel is written into your confirmation before you pay (in Chongqing, that means the entrance a car can actually reach). On the day, our driver collects you and your luggage there and drives you to the station printed on your ticket; on arrival, the driver collects you at the pickup point named in your confirmation and takes you to your hotel. The drivers are our own, and we can send a car in any city in mainland China (not Hong Kong or Macau), so the station at the other end can be quoted in the same reply. See how our station transfers work.",
      link: { label: "See how our station transfers work", href: "/services/private-car-and-driver/" },
    },
    {
      id: "transfer-how",
      type: "paragraph",
      text: "How to book: send your train number, date, station, hotel, number of travellers and luggage on WhatsApp or by email. We reply within 12 hours; before you pay we confirm in writing that a car is available for your time, along with the vehicle, meeting point and total price, and nothing is booked until you say yes. When you do, you pay a 30% deposit by Alipay or VBill and the balance on arrival, with no fees added. Most train tickets go on sale 15 days ahead, counting the travel day, at the departure station's release time (China Railway 12306), so the station is fixed the moment you buy: sort the car out then, not on the platform.",
      link: { label: "on WhatsApp or by email", href: "/services/private-car-and-driver/#car-enquiry" },
    },
    {
      id: "tour-offer",
      type: "paragraph",
      text: `Spending a few days here? Our Chongqing & Wulong 5-day private tour starts with your English-speaking guide and driver meeting you at Chongqing airport or railway station on Day 1 and ends with the same transfer on Day 5. In between: Liziba and the river viewpoints, the Three Natural Bridges with the standard admission, a night in Wulong and Fairy Mountain or Furong Cave, three English-guided touring days, four nights in Ctrip 4-Diamond hotels with breakfast (twin sharing) and no shopping stops. From ${bodyTourPrice(cqTour, 2, "en")} per person for two travellers, ${bodyTourPrice(cqTour, 4, "en")} for four or ${bodyTourPrice(cqTour, 6, "en")} for six; flights are extra. See the Chongqing & Wulong route.`,
      link: { label: "See the Chongqing & Wulong route", href: "/tours/chongqing-wulong-5-day-private-tour/" },
    },
    {
      id: "trust-copy",
      type: "paragraph",
      text: `Combining Chengdu and Chongqing? Our Chengdu, Leshan, Chongqing, Wulong & Dazu 8-day private tour includes the second-class high-speed train between the two cities and the transfers at both stations, plus seven nights in four-star-standard hotels with breakfast (twin sharing), private transport and an English-speaking guide: from ${bodyTourPrice(cdcqTour, 2, "en")} per person for two travellers or ${bodyTourPrice(cdcqTour, 6, "en")} for six. See the 8-day route. For any trip, one planner looks after you from the first reply to the last day, and we are a licensed travel agency (L-BJ10587).`,
      link: { label: "See the 8-day route", href: "/tours/chengdu-chongqing-8-day-private-tour/" },
    },
    {
      id: "order-copy",
      type: "paragraph",
      text: "To book a tour or a transfer, send your dates and group on WhatsApp or by email and we reply within 12 hours. You pay a 30% deposit by Alipay or VBill and the balance on arrival, with no fees added. Tell us about the whole trip.",
      link: { label: "Tell us about the whole trip", href: "/services/full-trip-support/" },
    },
    {
      id: "final-check-heading",
      type: "heading",
      level: 2,
      text: "Before you leave for the station",
    },
    {
      id: "final-check",
      type: "list",
      items: [
        "Issued ticket: exact Chinese departure and arrival stations, train, date and time",
        "Hotel: correct branch, address, entrance, street level and reception hours",
        "Getting there: the metro stop or signed car drop-off side and level",
        "Timing: first and last trains in the city plus a realistic margin inside the station",
        "Group: luggage, children, slow walkers, lift needs and one meeting point",
        "Your cut-off: the time you stop trying to cross town and ask railway staff for a ticket solution",
      ],
    },
    {
      id: "faq",
      type: "faq",
      title: "Chongqing station questions answered",
      items: [
        {
          question: "Which railway station should I use in Chongqing?",
          answer: "The one printed on your ticket, matched character for character: 重庆北, 重庆西, 重庆东 or 沙坪坝. If you have not booked, search trains for your date first, then compare the journey from your hotel door to the platform; a closer station with no suitable train is no use.",
        },
        {
          question: "How many train stations does Chongqing have?",
          answer: "For travellers in the city, four main ones: Chongqing North, Chongqing West, Chongqing East and Shapingba. The old Chongqing Station (重庆站) at Caiyuanba has had no passenger trains since 2022 and is being rebuilt. The wider municipality has many smaller stations; follow your ticket if it names one.",
        },
        {
          question: "What is the Chinese name of Chongqing East railway station?",
          answer: "重庆东站 (Chóngqìng Dōngzhàn). It opened in 2025 southeast of Chayuan in Nan'an; by metro you take the Line 6 East section. Show 重庆东站 in full to a driver and do not confuse it with 重庆站, which has had no passenger trains since 2022.",
        },
        {
          question: "Is Chongqing Station (重庆站) the main station?",
          answer: "No. 重庆站 is a specific station at Caiyuanba that stopped passenger service in 2022 and was still under reconstruction in the city's July 2026 update. 重庆汽车站 is a bus station, not a railway terminal.",
        },
        {
          question: "Which Chongqing station is for Chengdu trains?",
          answer: "There is no fixed answer. Shapingba is worth considering when a suitable Chengdu–Chongqing train runs from there on your date, but Chengdu trains also use North and West, and the July 2026 timetable change moved some services between them. Your ticket decides.",
        },
        {
          question: "Are Chongqing North's north square and south square different stations?",
          answer: "No. The two sides have been connected inside since the 2021 upgrade; the metro still names two stops, 重庆北站北广场 (Lines 4 and 10) and 重庆北站南广场 (Lines 3, 10 and Loop). Stay inside the complex and follow the signs.",
        },
        {
          question: "We went to the wrong station and missed the train. Can we still travel today?",
          answer: "Possibly. Until midnight on the travel day you can change to another train that day with no change fee, if seats remain; any fare difference is settled, and a ticket changed after departure cannot be refunded. Go to the ticket office or check 12306 straight away (China Railway 12306 rules).",
        },
        {
          question: "Can someone take us from our hotel to the right Chongqing station?",
          answer: "Yes, on request. Homeground's own drivers do station and airport transfers in Chongqing and any other city in mainland China. Send your train, station and hotel; we reply within 12 hours and confirm in writing, before you pay, that a car is available for your time, plus the vehicle, meeting point and total price.",
        },
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning",
      items: [
        { label: "Private car and driver in any mainland city", href: "/services/private-car-and-driver/", description: "Station and airport transfers, day hire and intercity trips, quoted in writing before you pay." },
        { label: "Chongqing & Wulong: 5-day private tour", href: "/tours/chongqing-wulong-5-day-private-tour/", description: "Station or airport pickup, Three Natural Bridges and a Wulong night, with published prices." },
        { label: "Start with the Chongqing city guide", href: "/destinations/chongqing/", description: "Choose nights, base, gateway and whether Wulong or Dazu belongs before using this guide." },
        { label: "China high-speed train first-time guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Tickets, documents, station entry and boarding once the station pair is settled." },
        { label: "Where to stay in Chongqing", href: "/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/", description: "Compare Jiefangbei, Guanyinqiao and Shapingba before testing the station transfer." },
        { label: "Read Chongqing's upper and lower street levels", href: "/guides/chongqing-upper-lower-city-orientation/", description: "Check road height, station exit and building entrance before trusting a short walk." },
        { label: "Private transfer or public transport?", href: "/guides/china-private-transfer-or-public-transport/", description: "When a car is worth it for a station run, and when the metro is enough." },
        { label: "Tell us about the whole trip", href: "/services/full-trip-support/", description: "One planner, every station and hotel handoff, quoted in writing before you pay." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources and image credit",
      items: [
        { label: "2026 Spring Festival passenger activity at Chongqing North, West, East and Shapingba", url: "https://jtysw.cq.gov.cn/sy_240/bmdt/202602/t20260224_15449936.html", publisher: "Chongqing Municipal Commission of Transport", reviewedAt: "2026-08-20" },
        { label: "July 2026 railway adjustment and recent station-pattern examples", url: "https://www.cq.gov.cn/ywdt/jrcq/202606/t20260626_15778151.html", publisher: "Chongqing Municipal Government", reviewedAt: "2026-08-20" },
        { label: "January 2026 Chongqing West route-pattern examples", url: "https://www.cq.gov.cn/zwgk/zfxxgkml/zdlyxxgk/jt/jtzx/202601/t20260126_15354224.html", publisher: "Chongqing Municipal Government", reviewedAt: "2026-08-20" },
        { label: "Chongqing East opening, location and initial passenger operation", url: "https://jtysw.cq.gov.cn/sy_240/bmdt/202506/t20250626_14748304.html", publisher: "Chongqing Municipal Commission of Transport", reviewedAt: "2026-08-20" },
        { label: "Line 6 East section operating pattern", url: "https://www.cq.gov.cn/ywdt/bmts/202507/t20250728_14853868.html", publisher: "Chongqing Municipal Government", reviewedAt: "2026-08-20" },
        { label: "Line 24 remained in testing and construction", url: "https://jkq.cq.gov.cn/zwxx/jkdt/202601/t20260108_15301324_wap.html", publisher: "Chongqing Economic and Technological Development Zone", reviewedAt: "2026-08-20" },
        { label: "Line 27 remained under construction", url: "https://www.cq.gov.cn/zwgk/zfxxgkzl/fdzdgknr/zdxm/dtxx/202607/t20260703_15798127.html", publisher: "Chongqing Municipal Government", reviewedAt: "2026-08-20" },
        { label: "Chongqing North integrated north and south station sides", url: "https://jtysw.cq.gov.cn/sy_240/bmdt/202101/t20210120_8788761.html", publisher: "Chongqing Municipal Commission of Transport", reviewedAt: "2026-08-20" },
        { label: "Official Chongqing metro station names and line table", url: "https://fzggw.cq.gov.cn/zwgk/zfxxgkml/zcwj/xzgfxwj/sfzggwxzgfxwj/202507/W020250915569783850930.pdf", publisher: "Chongqing Development and Reform Commission", reviewedAt: "2026-08-20" },
        { label: "Chongqing West multi-level transport interchange", url: "https://jtysw.cq.gov.cn/sy_240/jdtp/202209/t20220919_11122399.html", publisher: "Chongqing Municipal Commission of Transport", reviewedAt: "2026-08-20" },
        { label: "Shapingba rail and metro integration", url: "https://jtysw.cq.gov.cn/sy_240/bmdt/202209/t20220930_11159836.html", publisher: "Chongqing Municipal Commission of Transport", reviewedAt: "2026-08-20" },
        { label: "Official 15-day ticket advance-sale period, including the departure date", url: "https://www.12306.cn/mormhweb/zxdt/202205/t20220531_37508.html", publisher: "China Railway 12306", reviewedAt: "2026-08-10" },
        { label: "China Railway ticket change and refund rules: refund charges, same-day change after departure, mistaken-purchase refund", url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/info/orderWarmTips.html", publisher: "China Railway 12306", reviewedAt: "2026-10-20" },
        { label: "Chongqing Station suspension of passenger service", url: "https://www.cq.gov.cn/ywdt/bmts/202206/t20220615_10817239.html", publisher: "Chongqing Municipal Government", reviewedAt: "2026-08-20" },
        { label: "July 2026 Chongqing Station construction update", url: "https://jtysw.cq.gov.cn/sy_240/jdtp/202607/t20260715_15825144.html", publisher: "Chongqing Municipal Commission of Transport", reviewedAt: "2026-08-20" },
        { label: "Hero: Chongqing East Railway Station by Renek78, CC0 1.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:September_2025_at_Chongqing_East_Railway_Station_02.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-20" },
        { label: "Hero source licence: CC0 1.0", url: "https://creativecommons.org/publicdomain/zero/1.0/", publisher: "Creative Commons", reviewedAt: "2026-08-20" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
