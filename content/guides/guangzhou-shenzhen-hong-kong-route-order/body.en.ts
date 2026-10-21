import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const gzTour = "guangzhou-shunde-foshan-5-day-private-tour";
const szTour = "shenzhen-family-tech-4-day-private-tour";
const hkTour = "beijing-xian-guilin-hong-kong-10-day-private-tour";
// Trap 6 and the Canton Fair source expire after 4 November 2026: replace with the next session's Ministry of Commerce dates once they are published.
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "On the map the three cities sit on one diagonal running north-west to south-east: Guangzhou at the top, Shenzhen on the border, Hong Kong just below it. The high-speed line from Guangzhou South to Hong Kong West Kowloon runs through Shenzhen, and the land crossings change name at the border: Futian Checkpoint comes out at Lok Ma Chau in Hong Kong, and Luohu at Lo Wu. So if you arrive in Guangzhou and leave from Hong Kong, travel Guangzhou → Shenzhen → Hong Kong; reverse it when your flights run the other way, and never cross the border twice without a reason. Add a Shenzhen hotel only when the places you want to see there justify a night. Then choose the Hong Kong crossing by both hotel locations and your luggage, and leave time for the border." },
  { id: "quick-choice", type: "comparison", title: "Choose where to stay overnight", columns: [
    { heading: "Three bases", body: "Choose this when each city has at least one thing you would not drop, and your hotels on both sides of the border are near the crossing you will use." },
    { heading: "Guangzhou + Hong Kong", body: "Choose this when nothing in Shenzhen is a must: pass through, or visit for the day without moving hotels." },
    { heading: "Shenzhen + Hong Kong", body: "Choose this when Guangzhou is not why you came and what you want in Shenzhen sits in one part of the city." }
  ] },
  { id: "traps-heading", type: "heading", level: 2, text: "Seven Pearl River Delta traps travellers only meet at the border" },
  { id: "traps-list", type: "list", ordered: true, items: [
    "Hong Kong uses up a mainland entry. In mainland immigration terms, going to Hong Kong is an exit and coming back is a new entry, even on a day trip, and a single-entry visa is not restored once you leave (Ministry of Foreign Affairs consular department; National Immigration Administration). A Guangzhou → Hong Kong → Shenzhen plan needs a visa or visa-free rule that covers both entries; on a single-entry visa with a flight home from Guangzhou, a Hong Kong day in the middle means you cannot get back in for that flight.",
    "Hong Kong counts as a separate region for 240-hour visa-free transit, and that cuts both ways. Fly from home into Guangzhou and leave through Hong Kong, and eligible passport holders may stay up to 10 days without a visa. Fly into Hong Kong, visit Shenzhen and Guangzhou and go back out through Hong Kong, and it is not a transit: you came from and left for the same region. Check that your entry airport and exit crossing are on the National Immigration Administration's list; its rules and the border officer decide.",
    "West Kowloon has a 30-minute cut-off. Heading back to the mainland, MTR stops real-name checks, security and immigration 30 minutes before departure and closes the gates 5 minutes before; the checks usually take 30–45 minutes, so be there at least 75 minutes ahead (from 90 minutes if you hold a passport). Miss the train, and on a ticket bought on 12306 you can only move to another train the same day if seats are left (12306, checked 20 October 2026).",
    "The land crossings close. The Shenzhen Port Office gives Futian Checkpoint 6:30–22:30 and Luohu 6:30–24:00; a late arrival in Shenzhen can leave you at a closed gate.",
    "“Guangzhou” is not one station. 12306's cross-boundary products list Guangzhou South (out in Panyu) and Guangzhou East separately; the wrong one adds a cross-city ride before the train.",
    "Canton Fair weeks are not ordinary weeks. The 140th session runs 15–19 October, 23–27 October and 31 October–4 November 2026 (Ministry of Commerce), with about 340,000 overseas buyers across the session (Xinhua). If your Guangzhou nights fall in those weeks, you are booking hotels and trains alongside them: lock those two in before anything else on the trip.",
    "Our car stops at the border. Our drivers work only in mainland China, so we take you to the Shenzhen side of a checkpoint or to the station, and you walk through both immigration halls with your own bags. On the Hong Kong side, Futian comes out at Lok Ma Chau and Luohu at Lo Wu (Shenzhen Port Office): that is the name to give anyone meeting you in Hong Kong.",
  ] },
  { id: "traps-sales", type: "paragraph", text: "Traps 4, 5 and 7 all happen on the mainland road to the border, and none of them forgives a late or wrong turn: Futian closes at 22:30, Luohu at midnight, and the wrong Guangzhou station costs a cross-city ride before the train. That stretch is what a private car covers. Our own driver can meet you at Guangzhou Baiyun Airport or your Guangzhou hotel, take you and your luggage to your Shenzhen hotel, then to the Shenzhen side of Futian or Luohu, or straight to Guangzhou South for the Hong Kong train, with no metro changes carrying bags. Send us your flight or train, hotels, dates and crossing; we reply within 12 hours, and before you pay we confirm in writing that a car is available for your time, the vehicle and the total price. We send cars in any city in mainland China (not Hong Kong or Macau). Ask for a Guangzhou–Shenzhen car quote.", link: { label: "Ask for a Guangzhou–Shenzhen car quote", href: "/services/private-car-and-driver/#car-enquiry" } },
  { id: "official-heading", type: "heading", level: 2, text: "The border is a process, not a line on the rail map" },
  { id: "official", type: "paragraph", text: "Hong Kong has several land crossings by rail and road, each with its own transport links and opening hours (Hong Kong Security Bureau), and MTR runs the official planner for trains from West Kowloon. No crossing is best for everyone: the right one is close to both of your hotels and works with your passport, your luggage and the next day's plan. Check the official notices again shortly before you travel." },
  { id: "gateway-heading", type: "heading", level: 2, text: "Let your arrival and departure cities set the direction" },
  { id: "gateway", type: "table", caption: "Start with arrival and departure, then fit the cities", columns: ["Flights in and out", "Likely order", "Question that can reverse it"], rows: [
    ["Arrive Guangzhou area; depart Hong Kong", "Guangzhou → Shenzhen → Hong Kong", "Is there enough in Shenzhen for a night?"],
    ["Arrive Hong Kong; depart Guangzhou area", "Hong Kong → Shenzhen → Guangzhou", "Which crossing is closest to your Hong Kong hotel?"],
    ["Both long-haul flights use Hong Kong", "Hong Kong at one or both ends; cross the border as few times as you can", "Does every passport have a visa or visa-free entry for the mainland? In from Hong Kong and back out to Hong Kong is not a 240-hour transit."],
    ["Both flights use a mainland city", "Add Hong Kong only if you want to see it, not as a stop on the way", "Can every passport get back into the mainland after Hong Kong?"]
  ] },
  { id: "shenzhen-test-heading", type: "heading", level: 2, text: "The Shenzhen overnight test" },
  { id: "shenzhen-test", type: "list", ordered: false, items: [
    "Name the one thing in Shenzhen you would keep if the trip got shorter. “It is on the way” does not count.",
    "Check that it is near your Shenzhen hotel and your next crossing. A famous district far from both adds two extra rides across the city.",
    "Ask whether a day visit from your Guangzhou hotel would give you the same thing, with luggage storage confirmed in advance.",
    "Count the checkout, the luggage, the border and the new check-in. A night is worth it only if it buys you more time in Shenzhen than all that costs.",
    "If the Shenzhen night forces a second border crossing or squeezes your flight home from Hong Kong, cut it first."
  ] },
  { id: "one-base-heading", type: "heading", level: 2, text: "Keep one Guangzhou hotel, or sleep in Shenzhen?" },
  { id: "one-base-choice", type: "list", ordered: false, items: [
    "Keep the Guangzhou hotel if Shenzhen is a day trip and you would rather not check out again. Leave the main luggage there, but if Hong Kong comes next, count the ride back to Guangzhou that evening and the trip to the station the next morning.",
    "Sleep in Shenzhen if you plan the visit and the Hong Kong leg together. Guangzhou → Shenzhen, one night, then Hong Kong saves you that ride back to Guangzhou. Weigh one more hotel and one more luggage move against the travel you save, and pick the Shenzhen area by what you will see and which crossing you will use.",
    "If you want several days in Hong Kong, compare sleeping there with day trips from a mainland hotel. Count the border time and fares each way, and check that every passport can re-enter the mainland before you book. A cheaper room alone does not make the trip cheaper or easier."
  ] },
  { id: "crossing-heading", type: "heading", level: 2, text: "Choose the crossing from both hotel doors" },
  { id: "crossing", type: "table", caption: "Pick the crossing after the city order", columns: ["Factor", "What to compare", "Do not assume"], rows: [
    ["Hong Kong side", "Hotel to West Kowloon, Lok Ma Chau or Lo Wu", "Every Hong Kong district is equally close"],
    ["Mainland side", "Arrival point to the Shenzhen or Guangzhou hotel", "The nearest crossing on the map is quickest door to door"],
    ["Documents", "Each passport's current entry rules and the tickets in that name", "An earlier entry means you qualify now"],
    ["Baggage", "Stairs, walking, security and who carries each piece", "A fast train means no carrying"],
    ["Opening hours and trains", "Current official opening hours, timetables and notices", "Old hours or a blog screenshot still hold"]
  ] },
  { id: "hong-kong-return-heading", type: "heading", level: 2, text: "Returning from Hong Kong the same evening" },
  {
    "id": "hong-kong-return",
    "type": "paragraph",
    "text": "Work back from your train: at least 75 minutes at West Kowloon, plus the ride from your hotel. If you hold a passport, travel on a busy day or take the last train, be there when the checks open, 90 minutes before departure (MTR)."
  },
  {
    "id": "hong-kong-return-official",
    "type": "sources",
    "title": "West Kowloon departure guide",
    "items": [
      {
        "label": "MTR: departure procedures and deadlines",
        "url": "https://www.highspeed.mtr.com.hk/en/guide/process-departure.html"
      }
    ]
  },
  { id: "workflow-heading", type: "heading", level: 2, text: "Build the route in seven decisions" },
  { id: "workflow", type: "list", ordered: true, items: [
    "Fix your international arrival and departure cities before you give any city nights.",
    "Check each traveller's mainland China and Hong Kong entry rules with the authorities; the route does not decide whether you qualify.",
    "Write down one thing you can only do in Guangzhou, one in Shenzhen and one in Hong Kong; a city with nothing on its line gets no nights.",
    "Choose a one-way order that does not repeat the same border crossing.",
    "Pick the crossing by both hotels, your luggage and what you do next that day, not by train minutes alone.",
    "Book nothing with a fixed time straight after the border, and tell the next hotel you may check in late.",
    "Only then check current tickets and notices on the official sites listed below."
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "Planning example: Shenzhen without a hotel" },
  { id: "example", type: "callout", tone: "neutral", title: "An example, not a prescribed itinerary", body: "A family wants food and old streets in Guangzhou, several days in Hong Kong and one building in Shenzhen: they keep two hotels and see Shenzhen on a day visit with the luggage left in Guangzhou. If that Shenzhen stop needed an evening or a second district, a night there would earn its place." },
  { id: "failure-heading", type: "heading", level: 2, text: "Border-day failures and recovery" },
  { id: "failure", type: "table", caption: "Protect the onward plan", columns: ["Failure", "What to do now", "Next time"], rows: [
    ["The crossing is far from the hotel", "Work out a new route from current official transport; do not race an unrealistic one", "Choose from both hotel doors before booking"],
    ["Train or crossing delay", "Tell the hotel and drop optional evening plans", "Put nothing with a fixed time straight after the border"],
    ["Document problem", "Follow the border officer's or carrier's instructions; do not guess what you qualify for", "Check every traveller before anything non-refundable"],
    ["The Shenzhen night leaves only a few hours to see anything", "Keep the best thing and drop the rest", "Cut the Shenzhen night next time"],
    ["Too little time before the Hong Kong flight home", "Get to Hong Kong earlier and protect the flight", "Avoid crossing the border on the day you fly"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "When to choose the shorter route" },
  { id: "switch-rule", type: "paragraph", text: "Sleep in all three cities only when each has a reason that survives cuts and a delay on the border day would not wreck the next plan. Drop the Shenzhen night when it is there only to tick off the city. Drop Guangzhou when what you want there is not worth the extra mainland travel. Drop Hong Kong only when you are neither visiting it nor flying from it, not because the map makes the border look like nothing." },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "Border information changes", body: "Opening hours, transport, tickets and entry rules at the crossings change. Check the Hong Kong and mainland authorities and the operator shortly before you travel. This guide does not decide whether you need a visa or qualify for entry." },
  { id: "help-cta", type: "callout", tone: "decision", title: "Not sure which order, which crossing or how many entries you need?", body: "Send your arrival and departure cities, passport nationalities, hotel areas, luggage and one must-do per city on WhatsApp or by email. We reply within 12 hours with the order and crossing that fit both hotels; if you want a car on the mainland side, its price is confirmed in writing before you pay. Visa and entry decisions stay with the authorities. Do not send passport numbers or document images at this stage." },
  { id: "sales-heading", type: "heading", level: 2, text: "Let us join up the three cities" },
  { id: "gz-tour-offer", type: "paragraph", text: `Starting in Guangzhou? Our Guangzhou, Shunde & Foshan 5-day private tour includes airport or station transfers, four nights with breakfast in one Guangzhou hotel and one private vehicle through old and new Guangzhou, Shunde and Foshan, with entry to Qinghui Garden, Foshan Ancestral Temple and Nanfeng Ancient Kiln and the lion-dance show on your booking, and no shopping stops; on Day 5 our driver can take you to your confirmed station for the train south. From ${bodyTourPrice(gzTour, 2, "en")} per person for two travellers, ${bodyTourPrice(gzTour, 4, "en")} for four or ${bodyTourPrice(gzTour, 6, "en")} for six. See the Guangzhou 5-day route.`, link: { label: "See the Guangzhou 5-day route", href: "/tours/guangzhou-shunde-foshan-5-day-private-tour/" } },
  { id: "sz-tour-offer", type: "paragraph", text: `Travelling with school-age children and giving Shenzhen real time? Our Shenzhen Family Science & Technology 4-day private tour is built around the Shenzhen Science and Technology Museum and Huaqiangbei, with three nights in one Shenzhen hotel with breakfast, two days with a private English-speaking guide, driver, vehicle and named admissions, and transfers at your confirmed Shenzhen airport or station on Days 1 and 4: from ${bodyTourPrice(szTour, 2, "en")} per person for two travellers, ${bodyTourPrice(szTour, 4, "en")} for four or ${bodyTourPrice(szTour, 6, "en")} for six. See the Shenzhen 4-day route.`, link: { label: "See the Shenzhen 4-day route", href: "/tours/shenzhen-family-tech-4-day-private-tour/" } },
  { id: "gz-sz-combo", type: "paragraph", text: "Doing the whole Guangzhou → Shenzhen → Hong Kong line? These two tours join end to end. On Day 5 of the Guangzhou tour our driver takes you to the station; Day 1 of the Shenzhen tour starts with a driver meeting you at the Shenzhen station and taking you to the hotel; on its Day 4 we take you to your confirmed station for the Hong Kong train, or quote a car to the Shenzhen side of Futian or Luohu in writing. The train between the two cities is not part of either tour; if you would rather not carry bags onto it, ask for a written quote for a car from your Guangzhou hotel to your Shenzhen hotel. That is the order this guide recommends, with every price confirmed in writing before you pay. Ask for both tours on one booking.", link: { label: "Ask for both tours on one booking", href: "/services/full-trip-support/#trip-enquiry" } },
  { id: "hk-tour-offer", type: "paragraph", text: `Ending a longer China trip in Hong Kong? Our Beijing, Xi'an, Guilin & Hong Kong 10-day private tour starts in Beijing and ends in Hong Kong (international flights are not included), with the train from Guilin to West Kowloon and the tour's own transfer to your Hong Kong hotel and on to the airport. Because the mainland part ends with that train, eligible passport holders flying into Beijing from a third country may be able to do it on 240-hour visa-free transit instead of a tourist visa; the border officer decides, and we do not handle visas. Get passport details to us at least 8 days before the Forbidden City visit, and if we cannot book the Forbidden City and Tiananmen for your date, you get back everything you have paid. From ${bodyTourPrice(hkTour, 2, "en")} per person for two travellers, ${bodyTourPrice(hkTour, 4, "en")} for four or ${bodyTourPrice(hkTour, 6, "en")} for six. See the 10-day route.`, link: { label: "See the 10-day route", href: "/tours/beijing-xian-guilin-hong-kong-10-day-private-tour/" } },
  { id: "order-copy", type: "paragraph", text: "Want the order, the crossing and the hotels worked out together? One planner looks after you from the first reply to the last day and plans the mainland part around your flights and trains. Send your arrival and departure cities, dates and one must-do per city on WhatsApp or by email; we reply within 12 hours. You pay a 30% deposit by Alipay or VBill and the balance on arrival, with no fees added. We are a licensed travel agency (L-BJ10587), with no shopping stops. Tell us about the whole trip.", link: { label: "Tell us about the whole trip", href: "/services/full-trip-support/" } },
  { id: "faq", type: "faq", title: "Route order questions answered", items: [
    { question: "Where are Guangzhou, Shenzhen and Hong Kong on the map?", answer: "On one diagonal from north-west to south-east: Guangzhou at the top, Shenzhen on the border, Hong Kong just south of it. The high-speed line from Guangzhou South to Hong Kong West Kowloon runs through Shenzhen, so a one-way trip in either direction avoids doubling back. On a Hong Kong map, look for Lok Ma Chau (opposite Futian) and Lo Wu (opposite Luohu) for the two land crossings." },
    { question: "What order should I visit Guangzhou, Shenzhen and Hong Kong?", answer: "Follow your flights in one direction: arriving in Guangzhou and departing from Hong Kong means Guangzhou → Shenzhen → Hong Kong, and the reverse when the flights run the other way. Avoid crossing the border the same way twice." },
    { question: "Is Shenzhen worth an overnight stop between Guangzhou and Hong Kong?", answer: "Only when one thing in Shenzhen would survive cuts; “it is on the way” does not count. Count the checkout, luggage, border and new check-in, and drop the night if it forces a second crossing or squeezes your flight home from Hong Kong." },
    { question: "Can I visit Shenzhen without changing hotels?", answer: "Yes. Keep the Guangzhou hotel if Shenzhen is a day trip and you would rather not check out again, with luggage storage confirmed. Sleep in Shenzhen only if you plan the visit and the Hong Kong leg together." },
    { question: "How early should I arrive at Hong Kong West Kowloon for a high-speed train?", answer: "MTR gives a usual processing time of about 30–45 minutes for document checks, security and both immigration controls; procedures can start 90 minutes before departure, identity and ticket checks close 30 minutes before, and boarding gates close five minutes before. Allow at least 75 minutes; passport holders and busy-day or last-train passengers need more." },
    { question: "Can your car take us from Guangzhou to Hong Kong?", answer: "Only to the border. Our own drivers work in any mainland city, not in Hong Kong or Macau, so we can drive you from Guangzhou or Shenzhen to the Shenzhen side of Futian or Luohu Checkpoint, or to the station for the Hong Kong train, with the price confirmed in writing before you pay." },
    { question: "Which Hong Kong border crossing should I use?", answer: "Choose from both hotel doors, not train minutes alone: compare your Hong Kong hotel to West Kowloon, Lok Ma Chau or Lo Wu, your mainland arrival point to your Shenzhen or Guangzhou hotel, each passport's entry rules and who carries each bag. The Hong Kong Security Bureau lists several land crossings, each with its own transport links and hours." },
  ] },
  { id: "scope", type: "callout", tone: "neutral", title: "What this guide covers", body: "This guide covers the three-city order and whether Shenzhen deserves a night. The Guangzhou–Hong Kong and Shenzhen–Hong Kong guides below cover the trains, stations and crossings in detail." },
  { id: "more-planning", type: "internal-links", title: "Continue planning", items: [ { label: "Guangzhou destination hub", href: "/destinations/guangzhou/", description: "Decide whether the city gets nights, then choose the terminal, the station and the base together." },
    { label: "Compare Guangzhou–Hong Kong transport", href: "/guides/guangzhou-hong-kong-transport-route/", description: "Choose stations and mode after the route order is fixed." },
    { label: "Choose a Shenzhen–Hong Kong crossing", href: "/guides/shenzhen-hong-kong-transport-route/", description: "Match the crossing to your hotels and the next day's plan." },
    { label: "Hong Kong–Macao trips and your mainland entries", href: "/guides/hong-kong-macau-mainland-reentry-count/", description: "Whether a single-entry visa still gets you back into the mainland after Hong Kong." },
    { label: "Private car and driver in any mainland city", href: "/services/private-car-and-driver/", description: "Guangzhou and Shenzhen transfers to the station or the Shenzhen side of the border, quoted in writing." },
    { label: "Test an open-jaw flight", href: "/guides/china-open-jaw-flights-route-planning/", description: "See whether different arrival and departure cities remove backtracking." },
    { label: "Compare Shenzhen stay areas", href: "/guides/shenzhen-where-to-stay-futian-luohu-nanshan/", description: "Compare Futian, Luohu and Nanshan by arrival hub, Hong Kong crossing, business addresses, attractions, evenings and luggage." },
  ] },
  { id: "sources", type: "sources", title: "Official sources reviewed", items: [
    { label: "West Kowloon departure checks, immigration and boarding cutoffs", url: "https://www.highspeed.mtr.com.hk/en/guide/process-departure.html", publisher: "MTR High Speed Rail", reviewedAt: "2026-09-08" },
    { label: "Cross-boundary high-speed rail trip planning", url: "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html", publisher: "MTR High Speed Rail", reviewedAt: "2026-08-12" },
    { label: "Hong Kong land control-point information", url: "https://www.sb.gov.hk/eng/special/bound/control.html", publisher: "Hong Kong Security Bureau", reviewedAt: "2026-08-12" },
    { label: "China visa terms and entries", url: "https://cs.mfa.gov.cn/wgrlh/lhqz/", publisher: "Department of Consular Affairs, Ministry of Foreign Affairs of China", reviewedAt: "2026-08-13" },
    { label: "Exit and Entry Administration Law of the People's Republic of China", url: "https://en.nia.gov.cn/n147418/n147458/c155978/content.html", publisher: "National Immigration Administration", reviewedAt: "2026-08-13" },
    { label: "China's 240-hour visa-free transit policy interpretation", url: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html", publisher: "National Immigration Administration", reviewedAt: "2026-08-13" },
    { label: "Futian Checkpoint hours and Lok Ma Chau connection", url: "https://ka.sz.gov.cn/bmfw/katgfw/ftkazt/index.html", publisher: "Office of Port of Entry and Exit of Shenzhen Municipal People's Government", reviewedAt: "2026-10-20" },
    { label: "Luohu Checkpoint hours and Lo Wu connection", url: "https://ka.sz.gov.cn/bmfw/katgfw/lhkazt/index.html", publisher: "Office of Port of Entry and Exit of Shenzhen Municipal People's Government", reviewedAt: "2026-10-20" },
    { label: "12306 cross-boundary product station list", url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/newTicketRule/newTicketRule-GuangShenGangThirtyDay.html", publisher: "China Railway 12306", reviewedAt: "2026-08-12" },
    { label: "China Railway refund and change rules", url: "https://mobile.12306.cn/otsmobile/h5/otsbussiness/info/orderWarmTips.html", publisher: "China Railway 12306", reviewedAt: "2026-10-20" },
    { label: "140th Canton Fair: dates of the three phases (24 July 2026)", url: "https://www.mofcom.gov.cn/zwjg/jmxw/md/art/2026/art_784ba2c67efa4c66b430a26ad084ade8.html", publisher: "Ministry of Commerce website", reviewedAt: "2026-10-19" },
    { label: "140th Canton Fair opens; about 340,000 overseas buyers attending across the session (15 October 2026)", url: "https://www.news.cn/fortune/20261015/ccf371df7833412893f6f6c3cad031c3/c.html", publisher: "Xinhua", reviewedAt: "2026-10-19" }
  ] },
]} satisfies StructuredPageBody;
export default body;
