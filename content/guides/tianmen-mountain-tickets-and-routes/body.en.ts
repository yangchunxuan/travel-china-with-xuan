import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Choose your Tianmen Mountain ticket by its transport route, entry point and time slot. A, B and C are different ways through the same mountain visit. During the cableway upgrade, A no longer takes you straight from the city to the summit: you change at the middle station. Compare the complete package price before paying, then save the instructions for your passport and entrance." },
    { id: "price-heading", type: "comparison", title: "How much are Tianmen Mountain tickets?", columns: [
      { heading: "RMB 72: admission", body: "The government-guided admission price, effective from 1 August 2025.", items: ["The Hunan price notice sets the admission component. It is not a quote for the full cableway, bus and escalator journey."] },
      { heading: "RMB 285: published adult package", body: "Tongcheng’s published construction-period notice lists this adult price for A, B and C.", items: ["Reference checked 13 September 2026. Confirm the dated product, additions and final payment total with your seller."] }
    ] },
    { id: "price-copy", type: "paragraph", text: "An online offer may have a different retail or promotional total. Compare matching dates, age categories and inclusions, rather than choosing the lowest headline number. Do not assume an admission discount also makes transport free. For a child, older traveller or student, ask which category applies and which documents that particular product requires before booking." },
    { id: "included-heading", type: "heading", level: 2, text: "What does the construction-period package include?" },
    { id: "included-copy", type: "paragraph", text: "The A/B package described in Tongcheng’s notice includes admission, one trip on the lower city cableway, the sightseeing bus between the middle station and Tianmen Cave, the fast cableway in one direction, and the seven-stage through-mountain escalators both ways between the cave and summit. C instead uses the fast cableway in both directions, with the cave-to-summit escalator connection." },
    { id: "escalator-callout", type: "callout", tone: "neutral", title: "There are two different escalator sections", body: "The included seven-stage escalators connect the back of Tianmen Cave with the summit. The lower ‘Dengtianmen’ escalators run beside the 999-step approach to the cave. During the published construction arrangement, their downward trip is free; the upward trip still costs extra. Check optional summit chairlift and glass-walkway service charges separately." },
    { id: "routes-heading", type: "heading", level: 2, text: "A, B or C: which route should you choose?" },
    { id: "routes-date", type: "paragraph", text: "These routes follow the scenic area’s notice effective from 31 August 2026, carried by Rednet and reviewed on 13 September. The city cableway’s middle-station-to-summit section remains suspended. Round-trip routes A, B and C are listed as open; one-way routes 1 and 2 remain suspended under that notice." },
    { id: "tianmen-route-cards", type: "comparison", title: "Choose your starting point and return journey", columns: [
      { heading: "A: start at the city cableway", body: "City lower station → cableway to middle station → sightseeing bus to Tianmen Cave.", items: ["Use the seven-stage escalators up to the summit and back to the cave.", "Descend by fast cableway to the mountain gate; the published route then uses a shuttle back to the city lower station."] },
      { heading: "B: start at the mountain gate", body: "Mountain gate → fast cableway up to Tianmen Cave.", items: ["Use the seven-stage escalators up to the summit and back to the cave.", "Take the sightseeing bus to the middle station, then the lower city cableway down to the city."] },
      { heading: "C: fast cableway both ways", body: "Mountain gate → fast cableway up to Tianmen Cave.", items: ["Use the seven-stage escalators up to the summit and back to the cave.", "Return by fast cableway to the mountain gate. This route does not use the lower city cableway."] }
    ] },
    { id: "route-choice", type: "paragraph", text: "Choose A if you want to begin at the city cableway and use its operating lower section uphill. Choose B for the fast cableway uphill and the city cableway on the way down. Choose C if you prefer to avoid the middle-station mountain-road transfer. C still involves a cableway and walking; it is not a ground-only route or a guarantee of shorter queues." },
    { id: "route-change", type: "paragraph", text: "The notice lets B visitors choose the fast cableway down to the mountain gate instead of the bus and city cableway. If ice, fog, heavy rain or other conditions make the mountain road unsafe, A and B can be changed to C’s transport route. Arrange your return pickup around the actual exit, and check the latest notice before leaving your hotel." },
    { id: "office-heading", type: "heading", level: 2, text: "Which ticket office or entrance do you need?" },
    { id: "office-copy", type: "paragraph", text: "For A, identify 天门山索道下站, the city cableway’s lower station. B and C begin at the mountain gate, 天门山国家森林公园山门. Your seller may give a separate collection or meeting point before entry, so save both instructions if needed. A ticket-office address is not automatically your first cableway queue. Show the confirmed route and Chinese entrance name when arranging a ride." },
    { id: "hours-copy", type: "paragraph", text: "The 31 August notice gives ticket sales as 7:30–16:00 and operation from 8:00; Tongcheng’s notice lists last entry at 16:00. Arrive for your booked slot. These hours do not guarantee immediate boarding, and 16:00 is not a promise that your whole visit will be finished. Keep a mountain visit clear of a tight onward train or flight." },
    { id: "booking-heading", type: "heading", level: 2, text: "Can you buy online in advance with a foreign passport?" },
    { id: "booking-copy", type: "paragraph", text: "Online sellers offer dated Tianmen Mountain route tickets, but passport handling depends on the channel and product. Check the available date and slot, then confirm the following before payment. A general ‘book now’ button does not establish that the seller accepts your document or overseas contact number." },
    { id: "booking-list", type: "list", ordered: true, items: [
      "Select Tianmen Mountain / 天门山国家森林公园, the correct date, A/B/C route and time slot. Zhangjiajie National Forest Park and the Grand Canyon Glass Bridge require separate tickets.",
      "Confirm the passport option and how to enter every traveller’s surname, given names and passport number. Resolve a field that rejects your details with the seller; do not substitute a Chinese identity-card number or someone else’s information.",
      "Check the phone country code, confirmation-delivery method and accepted payment method. Make sure you can retrieve the actual ticket or entry code, not just the payment receipt.",
      "Read the full total, optional additions and dated cancellation deadline. Ask whether changes require cancellation and rebooking; do not buy a second ticket until you know the first order’s status."
    ] },
    { id: "entry-copy", type: "paragraph", text: "Bring the original passport used for the reservation and save your ticket offline. Tongcheng’s published notice lists passports among documents used for manual identity checks alongside an electronic or paper ticket. Follow your own order’s collection and entry instructions: confirm any exchange location before arrival, rather than assuming every foreign-passport booking uses the same counter." },
    { id: "next-links", type: "internal-links", title: "Fit Tianmen Mountain into your Zhangjiajie trip", items: [
      { label: "Choose your Zhangjiajie sightseeing days", href: "/guides/zhangjiajie-itinerary/" },
      { label: "Forest park tickets and entrances", href: "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/" },
      { label: "Stay in Zhangjiajie city or Wulingyuan?", href: "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/" }
    ] },
    { id: "sources", type: "sources", title: "Price and route references", items: [
      { label: "Tianmen admission price notice, effective 1 August 2025", url: "https://fgw.hunan.gov.cn/fgw/xxgk_70899/tzgg/202508/t20250825_33782047.html", publisher: "Hunan Development and Reform Commission", reviewedAt: "2026-09-13" },
      { label: "Scenic-area route and operating notice, 31 August 2026", url: "https://tour.rednet.cn/m/content/646042/75/16221781.html", publisher: "Rednet; source: Tianmen Mountain scenic area", reviewedAt: "2026-09-13" },
      { label: "Published package components, price and entry notice", url: "https://www.ly.com/scenery/BookSceneryTicket_922.html", publisher: "Tongcheng Travel", reviewedAt: "2026-09-13" }
    ] }
  ]
} satisfies StructuredPageBody;

export default body;
