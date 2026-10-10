import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "From 13 October 2026 Tianmen Mountain sells one route only: C, the fast cableway from the mountain gate, up and down. Routes A and B are off sale because the cableway from Zhangjiajie city closes along its whole length for rebuilding. From 8 to 12 October it is the other way round: the fast cableway is shut for maintenance and only A runs. Find the period your date falls in, compare the complete package price, then save the instructions for your passport and entrance." },
    { id: "status-table", type: "table", caption: "Which Tianmen Mountain routes are on sale, by visit date", columns: ["Visit date", "Routes on sale", "Where you start", "What is closed"], rows: [
      ["Until 7 October 2026", "A, B and C", "A: city cableway lower station. B and C: mountain gate", "City cableway upper half (middle station to summit), closed since 6 November 2025"],
      ["8–12 October 2026", "A only, on a temporary route", "City cableway lower station", "Fast cableway, for maintenance; city cableway upper half"],
      ["From 13 October 2026", "C only", "Mountain gate", "The whole city cableway. No reopening date has been published"]
    ] },
    { id: "status-source", type: "paragraph", text: "The 8–12 October arrangement comes from the scenic area’s notice of 6 October 2026. The arrangement from 13 October is the notice shown on Tongcheng’s Tianmen Mountain ticket page, read on 11 October 2026. It gives the cableway upgrade and the building work at the lower station as the reason and names no end date. One-way routes 1 and 2 stay off sale throughout." },
    {
      "id": "reservation-pretrip-reminder",
      "type": "callout",
      "title": "A Tianmen ticket also decides how your day moves",
      "body": "Your date, entry slot and starting gate decide where you are picked up and how you get back. Check what is on sale for your date before fixing the rest of the day. On the day, allow time for the cableway queue even with a confirmed ticket.",
      "tone": "decision",
      "link": {
        "href": "https://homegroundchina.com/guides/china-attractions-advance-booking-checklist/",
        "label": "See what to arrange before your China trip"
      }
    },
    { id: "price-heading", type: "comparison", title: "How much are Tianmen Mountain tickets?", columns: [
      { heading: "RMB 72: admission", body: "The government-guided admission price, effective from 1 August 2025.", items: ["The Hunan price notice sets the admission component. It is not a quote for the full cableway and escalator journey."] },
      { heading: "RMB 285: published adult package", body: "The notice on Tongcheng’s ticket page lists this adult price for routes A, B and C. It lists RMB 149 and RMB 113 for its two concession categories, and children under 14 free.", items: ["Reference checked 11 October 2026. Confirm the dated product, additions and final payment total with your seller."] }
    ] },
    { id: "price-copy", type: "paragraph", text: "An online offer may have a different retail or promotional total. Compare matching dates, age categories and inclusions, rather than choosing the lowest headline number. Do not assume an admission discount also makes transport free. For a child, older traveller or student, ask which category applies and which documents that particular product requires before booking." },
    { id: "component-prices", type: "table", caption: "Published prices for each part of the visit", columns: ["Item", "Published price", "From 13 October 2026"], rows: [
      ["Admission", "RMB 72", "Needed on every route"],
      ["Fast cableway, mountain gate to Tianmen Cave, one way", "RMB 76", "Running; used both ways on route C"],
      ["Seven-stage through-mountain escalators, cave to summit, one way", "RMB 42", "Running; used both ways on route C"],
      ["City cableway, one way", "RMB 108; RMB 54 for the lower section alone while the upper half was closed", "Closed"],
      ["Mountain-road sightseeing bus, middle station to Tianmen Cave, one way", "RMB 33; RMB 16 while the upper half was closed", "Not part of route C"],
      ["Lower Dengtianmen escalators, downward trip", "RMB 32, given free with the A and B packages", "Not restated in the notice; ask on site"]
    ] },
    { id: "component-copy", type: "paragraph", text: "These are the prices displayed in the notice Tongcheng carries. The package costs less than its parts added together. To buy one item on its own, the notice tells visitors to ask at the scenic area’s customer-service or ticket windows." },
    { id: "included-heading", type: "heading", level: 2, text: "What does the route C package include?" },
    { id: "included-copy", type: "paragraph", text: "Route C, as the notice describes it, covers admission, the fast cableway from the mountain gate up to Tianmen Cave, the seven-stage through-mountain escalators from behind the cave to the summit and back, and the fast cableway down to the mountain gate. Until 12 October the A and B packages instead combined the city cableway’s lower section, the sightseeing bus between the middle station and the cave, the escalators and one ride on the fast cableway." },
    { id: "escalator-callout", type: "callout", tone: "neutral", title: "There are two different escalator sections", body: "The seven-stage escalators connect the back of Tianmen Cave with the summit and are part of the package in both directions. The lower ‘Dengtianmen’ escalators run beside the 999-step approach to the cave. The published package breakdown gives their downward trip free, and the scenic area’s 6 October notice says the upward trip is not included. Expect to climb the steps or pay for the ride up, and check optional summit chairlift and glass-walkway service charges separately." },
    { id: "routes-heading", type: "heading", level: 2, text: "A, B or C: which routes are running?" },
    { id: "routes-date", type: "paragraph", text: "From 13 October 2026 only C is sold. The notice says the city cableway stops carrying passengers between its lower station and the middle station from that date, which takes the whole cableway out of service, and that the A and B packages are withdrawn. C is described first below, then A and B as they ran until 12 October, in case a booking confirmation, an older guide or a map still refers to them." },
    { id: "tianmen-route-cards", type: "comparison", title: "The three round-trip routes", columns: [
      { heading: "C: the only route from 13 October", body: "Mountain gate → fast cableway up to Tianmen Cave.", items: ["Use the seven-stage escalators up to the summit and back to the cave.", "Return by fast cableway to the mountain gate. The route itself has not changed; it never used the city cableway."] },
      { heading: "A: off sale from 13 October", body: "Started at the city cableway’s lower station, changed to a sightseeing bus at the middle station, and came down by fast cableway.", items: ["From 8 to 12 October it runs on a temporary route: city cableway to the middle station, bus to Tianmen Cave, escalators to the summit, then the same way back down.", "It depends on the city cableway’s lower section, which closes on 13 October."] },
      { heading: "B: off sale from 8 October", body: "Started at the mountain gate by fast cableway and came down by sightseeing bus and the city cableway’s lower section.", items: ["Not sold during the 8–12 October maintenance, and withdrawn together with A from 13 October."] }
    ] },
    { id: "route-choice", type: "paragraph", text: "From 13 October there is no route to choose, only a date and a time slot. What changes in practice is the starting point: C begins at the mountain gate, 天门山国家森林公园山门, not at the city cableway station that older guides, maps and hotel directions still point to. According to the notice, the shuttle between the city cableway’s lower station and the mountain gate keeps running, and the lower station keeps its ticket and customer-service windows." },
    { id: "route-change", type: "paragraph", text: "Earlier notices moved A and B onto C’s route when ice, fog or heavy rain closed the mountain road. C does not use that road. It does depend on the fast cableway in both directions, and that cableway was closed for maintenance from 8 to 12 October. The notice adds that routes and hours can change at short notice for weather, maintenance, events or crowds, so read the latest notice before leaving your hotel." },
    { id: "office-heading", type: "heading", level: 2, text: "Which ticket office or entrance do you need?" },
    { id: "office-copy", type: "paragraph", text: "From 13 October, go to the mountain gate, 天门山国家森林公园山门, for route C. Until 12 October, route A starts at 天门山索道下站, the city cableway’s lower station. Your seller may give a separate collection or meeting point before entry, so save both instructions if needed. A ticket-office address is not automatically your first cableway queue. Show the Chinese entrance name when arranging a ride." },
    { id: "hours-copy", type: "paragraph", text: "From 13 October the notice gives operation from 8:00 and the last ticket check at 16:00. From 8 to 12 October the scenic area’s notice gives ticket sales from 6:30 to 16:00 and operation from 7:00. Arrive for your booked slot. These hours do not guarantee immediate boarding, and 16:00 is not a promise that your whole visit will be finished. Keep a mountain visit clear of a tight onward train or flight." },
    { id: "booking-heading", type: "heading", level: 2, text: "Can you buy online in advance with a foreign passport?" },
    { id: "booking-copy", type: "paragraph", text: "Online sellers offer dated Tianmen Mountain route tickets, but passport handling depends on the channel and product. Check the available date and slot, then confirm the following before payment. A general ‘book now’ button does not establish that the seller accepts your document or overseas contact number." },
    { id: "booking-list", type: "list", ordered: true, items: [
      "Select Tianmen Mountain / 天门山国家森林公园, the correct date, the route on sale for that date (C from 13 October) and the time slot. Zhangjiajie National Forest Park and the Grand Canyon Glass Bridge require separate tickets.",
      "Confirm the passport option and how to enter every traveller’s surname, given names and passport number. Resolve a field that rejects your details with the seller; do not substitute a Chinese identity-card number or someone else’s information.",
      "Check the phone country code, confirmation-delivery method and accepted payment method. Make sure you can retrieve the actual ticket or entry code, not just the payment receipt.",
      "Read the full total, optional additions and the refund rule for your date. Tongcheng’s page, for example, says an order cannot change its traveller or date, cannot be refunded in part, and cannot be refunded after 17:00 on the day of the visit. Do not buy a second ticket until you know the first order’s status."
    ] },
    { id: "entry-copy", type: "paragraph", text: "Bring the original passport used for the reservation and save your ticket offline. Tongcheng’s published notice lists passports among documents used for manual identity checks alongside an electronic or paper ticket. Follow your own order’s collection and entry instructions: confirm any exchange location before arrival, rather than assuming every foreign-passport booking uses the same counter." },
    { id: "timeline-heading", type: "heading", level: 2, text: "What has changed since the cableway rebuilding began?" },
    { id: "timeline", type: "table", caption: "Tianmen Mountain cableway changes, November 2025 to October 2026", columns: ["Date", "What changed", "Routes on sale"], rows: [
      ["6 November 2025", "The city cableway’s upper half, from the middle station to the summit, closed for the upgrade. A and B were rerouted through the middle station.", "A, B and C; one-way routes 1 and 2 suspended"],
      ["20 March 2026", "The fast cableway returned to service after a maintenance closure.", "A, B and C"],
      ["31 August 2026", "Ticket sales set at 7:30–16:00, with operation from 8:00.", "A, B and C"],
      ["8–12 October 2026", "The fast cableway closed for maintenance.", "A only, on a temporary route"],
      ["13 October 2026", "The city cableway’s lower section closed as well, taking the whole cableway out of service.", "C only"]
    ] },
    { id: "faq", type: "faq", title: "Questions travellers ask before booking", items: [
      { question: "Which Tianmen Mountain routes are open after the October 2026 maintenance?", answer: "Only route C. From 13 October 2026 the city cableway stops carrying passengers along its whole length, so the A and B packages are withdrawn, and one-way routes 1 and 2 stay off sale. C runs from the mountain gate by fast cableway to Tianmen Cave, by the seven-stage escalators to the summit and back, and down again by fast cableway. This is the notice shown on Tongcheng's ticket page, read on 11 October 2026; it gives no reopening date for the city cableway." },
      { question: "Can I take the cable car straight from the city to the summit?", answer: "No. The upper half of the city cableway has been closed since 6 November 2025, and from 13 October 2026 the lower half stops as well. The cable car you ride now is the fast cableway from the mountain gate to Tianmen Cave; escalators take you from the cave to the summit. According to the notice, a shuttle still links the city cableway's lower station with the mountain gate." },
      { question: "Is the Tianmen Mountain cable car closed from 8 to 12 October 2026?", answer: "The fast cableway is. The scenic area's notice of 6 October closes it for maintenance on those five days and sells only route A: city cableway to the middle station, sightseeing bus to Tianmen Cave, escalators to the summit, and the same way back. Ticket sales run 6:30-16:00 and operation starts at 7:00. Routes B and C and the one-way routes are not sold on those days." },
      { question: "Are the escalators included in my ticket?", answer: "Only one of the two sets. The seven-stage through-mountain escalators between the back of Tianmen Cave and the summit are part of the package both ways. The lower Dengtianmen escalators beside the 999-step approach are separate: the published package breakdown gives the downward trip free, and the scenic area's 6 October notice says the upward trip is not included. Summit chairlift and glass-walkway service charges are separate again." },
      { question: "How much do the Tianmen Mountain cable car and escalators cost on their own?", answer: "The notice carried by Tongcheng displays RMB 76 one way for the fast cableway and RMB 42 one way for the seven-stage through-mountain escalators, on top of RMB 72 admission. The adult package is RMB 285. To buy a single item rather than the package, the notice tells visitors to ask at the scenic area's customer-service or ticket windows." },
      { question: "What time does Tianmen Mountain stop letting visitors in?", answer: "At 16:00. From 13 October 2026 the notice gives operation from 8:00 and the last ticket check at 16:00; from 8 to 12 October ticket sales run 6:30-16:00 with operation from 7:00. Arrive for the time slot you booked. A booking does not mean you board immediately, and 16:00 is not the time your visit will be finished, so keep a tight train or flight off the same day." },
      { question: "What do I need to show at the gate if I booked with a passport?", answer: "The original passport used for the booking, and the ticket itself. The notice carried by Tongcheng lists a passport among the IDs staff check manually, alongside an electronic or paper ticket, so save the ticket offline. Follow the collection and entry instructions on your own order; if it has to be exchanged, find that location in advance rather than assuming every passport booking uses the same counter." },
      { question: "Is RMB 72 the full price for Tianmen Mountain?", answer: "That is admission only. RMB 72 is the government-guided admission price effective from 1 August 2025, and the Hunan price notice sets that component alone, not the cableway and escalator journey. The notice on Tongcheng's ticket page lists RMB 285 as the adult package price for routes A, B and C, a reference checked on 11 October 2026." },
      { question: "Does this ticket also cover Zhangjiajie National Forest Park or the glass bridge?", answer: "No. Zhangjiajie National Forest Park and the Grand Canyon Glass Bridge need their own tickets. When you book, check that the product is Tianmen Mountain National Forest Park with the right date, route and entry time slot, and make sure you can open the actual ticket or entry code afterwards, not only the payment receipt." },
    ] },
    { id: "next-links", type: "internal-links", title: "Fit Tianmen Mountain into your Zhangjiajie trip", items: [
      { label: "Choose your Zhangjiajie sightseeing days", href: "/guides/zhangjiajie-itinerary/" },
      { label: "Forest park tickets and entrances", href: "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/" },
      { label: "Stay in Zhangjiajie city or Wulingyuan?", href: "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/" }
    ] },
    { id: "sources", type: "sources", title: "Price and route references", items: [
      { label: "Tianmen admission price notice, effective 1 August 2025", url: "https://fgw.hunan.gov.cn/fgw/xxgk_70899/tzgg/202508/t20250825_33782047.html", publisher: "Hunan Development and Reform Commission", reviewedAt: "2026-10-11" },
      { label: "Package prices, entry rules and the notice for 13 October 2026 onwards", url: "https://www.ly.com/scenery/BookSceneryTicket_922.html", publisher: "Tongcheng Travel", reviewedAt: "2026-10-11" },
      { label: "Fast-cableway maintenance notice for 8–12 October 2026, full text", url: "https://i.ifeng.com/c/8x1RVAwbJWG", publisher: "Ifeng; source: Tianmen Mountain scenic area", reviewedAt: "2026-10-11" },
      { label: "Scenic-area route and operating notice, 31 August 2026", url: "https://tour.rednet.cn/m/content/646042/75/16221781.html", publisher: "Rednet; source: Tianmen Mountain scenic area", reviewedAt: "2026-10-11" },
      { label: "Fast cableway back in service from 20 March 2026", url: "https://m.voc.com.cn/rmt/article/16078535.html", publisher: "Xinhunan; source: Tianmen Mountain scenic area", reviewedAt: "2026-10-11" },
      { label: "City cableway upper half closed from 6 November 2025", url: "https://m.voc.com.cn/xhn/news/202511/30841914.html", publisher: "Hunan Daily", reviewedAt: "2026-10-11" }
    ] }
  ]
} satisfies StructuredPageBody;

export default body;
