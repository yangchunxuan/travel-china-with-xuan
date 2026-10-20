import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const gzTour = "guangzhou-shunde-foshan-5-day-private-tour";
const szTour = "shenzhen-family-tech-4-day-private-tour";
const hkTour = "beijing-xian-guilin-hong-kong-10-day-private-tour";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "On the map the three cities sit in a line: Guangzhou to the north, Shenzhen on the border, Hong Kong to the south, and the high-speed line from Guangzhou South to Hong Kong West Kowloon runs through Shenzhen. So if you arrive in Guangzhou and leave from Hong Kong, travel Guangzhou → Shenzhen → Hong Kong; reverse it when your flights run the other way, and never cross the border twice without a reason. Add a Shenzhen hotel only when the places you want to see there justify a night. Then choose the Hong Kong crossing by both hotel locations and your luggage, and leave time for the border." },
  { id: "quick-choice", type: "comparison", title: "Choose where to stay overnight", columns: [
    { heading: "Three bases", body: "Use when each city has at least one full local priority and both border-side hotels support the chosen crossing." },
    { heading: "Guangzhou + Hong Kong", body: "Use when Shenzhen has no protected anchor; pass through or make a focused visit rather than adding a hotel." },
    { heading: "Shenzhen + Hong Kong", body: "Use when Guangzhou is not central to the trip and Shenzhen priorities are geographically coherent." }
  ] },
  { id: "traps-heading", type: "heading", level: 2, text: "Seven Pearl River Delta traps travellers only meet at the border" },
  { id: "traps-list", type: "list", ordered: true, items: [
    "Hong Kong uses up a mainland entry. In mainland immigration terms, going to Hong Kong is an exit and coming back is a new entry, even on a day trip, and a single-entry visa is not restored once you leave (Ministry of Foreign Affairs consular department; National Immigration Administration). A Guangzhou → Hong Kong → Shenzhen plan needs a visa or visa-free rule that covers both entries.",
    "Hong Kong counts as a separate region for 240-hour visa-free transit. Eligible passport holders entering from one country or region and leaving for another may stay up to 10 days; the National Immigration Administration's rules and the border officer decide.",
    "West Kowloon has a 30-minute cut-off. Heading back to the mainland, MTR stops real-name checks, security and immigration 30 minutes before departure, and both Hong Kong and mainland immigration are done inside the station.",
    "The land crossings close. The Shenzhen Port Office gives Futian Checkpoint 6:30–22:30 and Luohu 6:30–24:00; a late arrival in Shenzhen can leave you at a closed gate.",
    "“Guangzhou” is not one station. 12306's cross-boundary products list Guangzhou South (out in Panyu) and Guangzhou East separately; the wrong one adds a cross-city ride before the train.",
    "Canton Fair weeks are not ordinary weeks. The 140th session runs 15–19 October, 23–27 October and 31 October–4 November 2026 (Ministry of Commerce), with about 340,000 overseas buyers across the session (Xinhua).",
    "A mainland car stops at the border. Ours, and any mainland car hire, take you to the Shenzhen side of a checkpoint or to the station; you cross from there.",
  ] },
  { id: "traps-sales", type: "paragraph", text: "Traps 4, 5 and 7 are about the road to the border, and that is the part a private car covers: our own driver can take you and your luggage from your Guangzhou hotel to your Shenzhen hotel, then to the Shenzhen side of Futian or Luohu, or straight to Guangzhou South for the Hong Kong train. Send us your hotels, dates and crossing; we reply within 12 hours, and before you pay we confirm in writing that a car is available for your time, the vehicle and the total price. We send cars in any city in mainland China (not Hong Kong or Macau). Ask for a Guangzhou–Shenzhen car quote.", link: { label: "Ask for a Guangzhou–Shenzhen car quote", href: "/services/private-car-and-driver/#car-enquiry" } },
  { id: "official-heading", type: "heading", level: 2, text: "The border is a process, not a line on the rail map" },
  { id: "official", type: "paragraph", text: "Hong Kong Security Bureau lists multiple land control points, including railway and road-based crossings, each with its own transport and operating information. MTR High Speed Rail provides official cross-boundary planning for Hong Kong West Kowloon. These sources establish options, not one universally best crossing. Your passport, immigration eligibility, hotels, baggage and onward plan determine the useful one; verify current official requirements before travel." },
  { id: "gateway-heading", type: "heading", level: 2, text: "Let your arrival and departure cities set the direction" },
  { id: "gateway", type: "table", caption: "Start with arrival and departure, then fit the cities", columns: ["Gateway pattern", "Likely order", "Question that can reverse it"], rows: [
    ["Arrive Guangzhou area; depart Hong Kong", "Guangzhou → Shenzhen → Hong Kong", "Does Shenzhen have enough value for a night?"],
    ["Arrive Hong Kong; depart Guangzhou area", "Hong Kong → Shenzhen → Guangzhou", "Which crossing works from the Hong Kong hotel?"],
    ["Both long-haul flights use Hong Kong", "Hong Kong at one or both ends; avoid unnecessary repeated crossing", "Would one Mainland block plus final Hong Kong night reduce risk?"],
    ["Both flights use a Mainland gateway", "Keep Hong Kong as a deliberate extension, not a transit assumption", "Are entry and re-entry permissions confirmed for this passport?" ]
  ] },
  { id: "shenzhen-test-heading", type: "heading", level: 2, text: "The Shenzhen overnight test" },
  { id: "shenzhen-test", type: "list", ordered: false, items: [
    "Name the Shenzhen experience that would survive cuts. “It is on the way” is not an experience.",
    "Check whether that priority lies near the chosen hotel and the next crossing. A famous district far from both can create two extra local transfers.",
    "Ask whether a focused stop without changing hotels can deliver the same value, with luggage storage confirmed in advance.",
    "Count the checkout, luggage, border process and new check-in. A night must create enough usable local time to repay them.",
    "If the Shenzhen night forces a second border crossing or weakens the final international departure, remove it first."
  ] },
  { id: "one-base-heading", type: "heading", level: 2, text: "Keep one Guangzhou hotel, or sleep in Shenzhen?" },
  { id: "one-base-choice", type: "list", ordered: false, items: [
    "Keep the Guangzhou hotel if Shenzhen is a spontaneous day trip and avoiding another checkout matters most. Leave the main luggage there, but count the extra journey back to Guangzhou and the next morning's trip to the station if Hong Kong follows.",
    "Sleep in Shenzhen if its visit and the onward Hong Kong leg are planned together. Guangzhou → Shenzhen, overnight → Hong Kong removes that intermediate return to Guangzhou. Compare the extra hotel and luggage move with the travel you save; choose the Shenzhen area around your actual visit and crossing.",
    "If Hong Kong needs several days, compare staying there with repeated day trips to Hong Kong from a mainland hotel. Include border processing and transport in the budget, and verify every mainland re-entry before booking. A lower room rate alone does not establish the cheaper or easier trip."
  ] },
  { id: "crossing-heading", type: "heading", level: 2, text: "Choose the crossing from both hotel doors" },
  { id: "crossing", type: "table", caption: "Mode and route execution belong after city order", columns: ["Factor", "What to compare", "Do not assume"], rows: [
    ["Hong Kong side", "Hotel to West Kowloon or the relevant control point", "Every Hong Kong district is equally close"],
    ["Mainland side", "Arrival point to the Shenzhen or Guangzhou hotel", "The geographically nearest border is quickest door to door"],
    ["Documents", "Current eligibility, required original documents and ticket details", "Past entry means current eligibility"],
    ["Baggage", "Stairs, walking, security and who carries each piece", "Fast rail removes handling"],
    ["Operating information", "Current official opening, train and service notices", "Old hours or a blog screenshot remain valid"]
  ] },
  { id: "hong-kong-return-heading", type: "heading", level: 2, text: "Returning from Hong Kong the same evening" },
  {
    "id": "hong-kong-return",
    "type": "paragraph",
    "text": "At West Kowloon, allow for document checks, security and both immigration controls before boarding. MTR gives a usual processing time of about 30–45 minutes; passport holders and busy-day or last-train passengers need extra time. Procedures can start 90 minutes before departure. Identity and ticket checks close 30 minutes before departure, and boarding gates close five minutes before. These are different deadlines: add your journey to the station and a queue buffer."
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
    "Fix the international arrival and departure airports before assigning nights.",
    "Confirm each traveller's Mainland China and Hong Kong entry requirements from the responsible authorities; do not rely on route logic for eligibility.",
    "Give Guangzhou, Shenzhen and Hong Kong one non-substitutable purpose each, then remove any city with no protected purpose.",
    "Choose a one-way order that avoids repeating the same cross-boundary leg.",
    "Select the crossing by both hotel locations, baggage and the day's onward plan—not rail minutes alone.",
    "Keep the border move free of an immediate, irreplaceable timed activity and retain a late-arrival hotel plan.",
    "Only then search current tickets and operating notices through the named official sources."
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "Planning example: Shenzhen without a hotel" },
  { id: "example", type: "callout", tone: "neutral", title: "An example, not a prescribed itinerary", body: "A traveller has strong food and heritage priorities in Guangzhou and several full days of Hong Kong priorities, but only one Shenzhen architecture stop. A separate Shenzhen hotel adds another check-in and checkout, and moves the luggage through another stage. If current transport and storage make a focused visit workable, keeping Guangzhou and Hong Kong as the two bases may deliver the Shenzhen priority with less friction. If the Shenzhen activity needs an evening or a second district, the overnight can earn its place." },
  { id: "failure-heading", type: "heading", level: 2, text: "Border-day failures and recovery" },
  { id: "failure", type: "table", caption: "Protect the onward plan", columns: ["Failure", "Immediate response", "Design lesson"], rows: [
    ["Wrong control point for the hotel", "Recalculate using current official transport; do not race an unrealistic route", "Choose from both doors before booking"],
    ["Train or crossing delay", "Notify the hotel and release optional evening plans", "No timed highlight immediately after the border"],
    ["Document problem", "Follow official immigration or carrier instructions; do not improvise eligibility advice", "Verify every traveller before non-refundable booking"],
    ["Shenzhen night creates only a few usable hours", "Keep the strongest activity and drop the rest", "Remove the overnight on the next revision"],
    ["Final Hong Kong departure becomes fragile", "Move to Hong Kong earlier and protect the flight", "Keep the final cross-boundary move away from the flight day"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "When to choose the shorter route" },
  { id: "switch-rule", type: "paragraph", text: "Use all three bases only when each has a durable purpose and the border day remains recoverable. Drop Shenzhen as an overnight when it exists mainly to complete the city list. Drop Guangzhou when its priorities are weak relative to the extra Mainland movement. Drop Hong Kong only when it is not an intended destination or gateway—never because the map makes border formalities look invisible." },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "Entry and re-entry eligibility is confirmed for every passport.",
    "The direction follows actual flight gateways and avoids repeated crossing.",
    "Shenzhen has a named priority that justifies its hotel, or no hotel is added.",
    "The chosen control point works from both hotels with the real baggage.",
    "Current operating information is rechecked and the border day has recovery space."
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "Border information changes", body: "Control-point hours, transport, ticketing and immigration requirements are dynamic. Check Hong Kong and Mainland authorities plus the named operator close to travel. This route guide does not determine visa or entry eligibility." },
  { id: "scope", type: "callout", tone: "neutral", title: "What this guide covers", body: "This guide covers the three-city order and whether Shenzhen deserves an overnight. Use the Guangzhou–Hong Kong and Shenzhen–Hong Kong guides for exact modes, stations and control-point procedures." },
  { id: "help-cta", type: "callout", tone: "decision", title: "Want the border-sensitive route checked?", body: "Send your flight gateways, passport nationalities, hotel areas, luggage and one priority per city on WhatsApp or by email; we reply within 12 hours. Do not send passport numbers or document images at this stage." },
  { id: "sales-heading", type: "heading", level: 2, text: "Let us join up the three cities" },
  { id: "gz-tour-offer", type: "paragraph", text: `Starting in Guangzhou? Our Guangzhou, Shunde & Foshan 5-day private tour includes airport or station transfers, four nights with breakfast in one Guangzhou hotel and one private vehicle through old and new Guangzhou, Shunde and Foshan, with no shopping stops; on Day 5 our driver can take you to your confirmed station for the train south. From ${bodyTourPrice(gzTour, 2, "en")} per person for two travellers, ${bodyTourPrice(gzTour, 4, "en")} for four or ${bodyTourPrice(gzTour, 6, "en")} for six. See the Guangzhou 5-day route.`, link: { label: "See the Guangzhou 5-day route", href: "/tours/guangzhou-shunde-foshan-5-day-private-tour/" } },
  { id: "sz-tour-offer", type: "paragraph", text: `Giving Shenzhen real time? Our Shenzhen Family Science & Technology 4-day private tour has three nights in one Shenzhen hotel with breakfast, two days with a private English-speaking guide, driver and vehicle, and transfers at your confirmed Shenzhen airport or station on Days 1 and 4: from ${bodyTourPrice(szTour, 2, "en")} per person for two travellers or ${bodyTourPrice(szTour, 6, "en")} for six. See the Shenzhen 4-day route.`, link: { label: "See the Shenzhen 4-day route", href: "/tours/shenzhen-family-tech-4-day-private-tour/" } },
  { id: "hk-tour-offer", type: "paragraph", text: `Ending a longer China trip in Hong Kong? Our Beijing, Xi'an, Guilin & Hong Kong 10-day private tour starts in Beijing and ends in Hong Kong (international flights are not included), with the train from Guilin to West Kowloon and the tour's own transfer to your Hong Kong hotel and on to the airport. Get passport details to us at least 8 days before the Forbidden City visit, and if we cannot book the Forbidden City and Tiananmen for your date, you get back everything you have paid. From ${bodyTourPrice(hkTour, 2, "en")} per person for two travellers or ${bodyTourPrice(hkTour, 6, "en")} for six. See the 10-day route.`, link: { label: "See the 10-day route", href: "/tours/beijing-xian-guilin-hong-kong-10-day-private-tour/" } },
  { id: "order-copy", type: "paragraph", text: "Want the order, the crossing and the hotels worked out together? One planner looks after you from the first reply to the last day and plans the mainland part around your flights and trains. Send your gateways, dates and one priority per city on WhatsApp or by email; we reply within 12 hours. You pay a 30% deposit by Alipay or VBill and the balance on arrival, with no fees added. We are a licensed travel agency (L-BJ10587), with no shopping stops. Tell us about the whole trip.", link: { label: "Tell us about the whole trip", href: "/services/full-trip-support/" } },
  { id: "faq", type: "faq", title: "Route order questions answered", items: [
    { question: "Where are Guangzhou, Shenzhen and Hong Kong on the map?", answer: "In a line from north to south: Guangzhou in the north, Shenzhen on the border, Hong Kong to the south. The high-speed line from Guangzhou South to Hong Kong West Kowloon runs through Shenzhen, so a one-way trip in either direction avoids doubling back." },
    { question: "What order should I visit Guangzhou, Shenzhen and Hong Kong?", answer: "Follow your flights in one direction: arriving in Guangzhou and departing from Hong Kong means Guangzhou → Shenzhen → Hong Kong, and the reverse when the flights run the other way. Avoid repeating the same cross-boundary leg." },
    { question: "Is Shenzhen worth an overnight stop between Guangzhou and Hong Kong?", answer: "Only when a named Shenzhen priority survives cuts; “it is on the way” is not an experience. Count the checkout, luggage, border process and new check-in, and drop the night if it forces a second crossing or weakens the final international departure." },
    { question: "Can I visit Shenzhen without changing hotels?", answer: "Yes. Keep the Guangzhou hotel if Shenzhen is a focused day trip and avoiding another checkout matters most, with luggage storage confirmed. Sleep in Shenzhen only if its visit and the onward Hong Kong leg are planned together." },
    { question: "How early should I arrive at Hong Kong West Kowloon for a high-speed train?", answer: "MTR gives a usual processing time of about 30–45 minutes for document checks, security and both immigration controls; procedures can start 90 minutes before departure, identity and ticket checks close 30 minutes before, and boarding gates close five minutes before. Passport holders and busy-day or last-train passengers need extra time." },
    { question: "Can your car take us from Guangzhou to Hong Kong?", answer: "Only to the border. Our own drivers work in any mainland city, not in Hong Kong or Macau, so we can drive you from Guangzhou or Shenzhen to the Shenzhen side of Futian or Luohu Checkpoint, or to the station for the Hong Kong train, with the price confirmed in writing before you pay." },
    { question: "Which Hong Kong border crossing should I use?", answer: "Choose from both hotel doors, not rail minutes alone: compare the Hong Kong hotel to West Kowloon or the relevant control point, the mainland arrival point to your Shenzhen or Guangzhou hotel, current document requirements and who carries each bag. The Hong Kong Security Bureau lists multiple land control points, each with its own transport and operating information." },
  ] },
  { id: "more-planning", type: "internal-links", title: "Continue planning", items: [ { label: "Guangzhou destination hub", href: "/destinations/guangzhou/", description: "Decide whether the city gets nights, then choose the terminal, the station and the base together." },
    { label: "Compare Guangzhou–Hong Kong transport", href: "/guides/guangzhou-hong-kong-transport-route/", description: "Choose stations and mode after the route order is fixed." },
    { label: "Choose a Shenzhen–Hong Kong crossing", href: "/guides/shenzhen-hong-kong-transport-route/", description: "Match the control point to your hotels and onward plan." },
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
    { label: "140th Canton Fair: dates of the three phases (24 July 2026)", url: "https://www.mofcom.gov.cn/zwjg/jmxw/md/art/2026/art_784ba2c67efa4c66b430a26ad084ade8.html", publisher: "Ministry of Commerce website", reviewedAt: "2026-10-19" },
    { label: "140th Canton Fair opens; about 340,000 overseas buyers attending across the session (15 October 2026)", url: "https://www.news.cn/fortune/20261015/ccf371df7833412893f6f6c3cad031c3/c.html", publisher: "Xinhua", reviewedAt: "2026-10-19" }
  ] },
]} satisfies StructuredPageBody;
export default body;
