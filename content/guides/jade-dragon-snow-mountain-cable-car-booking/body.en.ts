import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "A Jade Dragon Snow Mountain day needs two separate bookings: scenic-area entry (CNY 100, plus a CNY 20 eco-bus) in the 玉龙雪山服务 mini-program, and a cable car in the 丽江旅游集团 mini-program. Glacier Park cable-car tickets (CNY 120) for the next seven days open every evening at 20:00 China time; Spruce Meadow (CNY 40) at 21:00. Cable cars are real-name with a face check, the Yak Meadow cable car has been closed for rebuilding since 4 March 2026, and wind or snow can stop a cable car on the day. Book the cable car first and keep a spare day." },
    { id: "pressure-callout", type: "callout", tone: "warning", title: "February 2025: four hours for the cable car down", body: "On 2 February 2025, in heavy snow, visitors queued from about 14:00 until about 18:00 for the cable car down. From noon on 4 February the scenic area limited visitor flow, and that day's cable-car tickets were all gone (Cover News, on the People's Daily site, 5 February 2025). The cable car is the scarce part of the day, and weather can take it away." },
    { id: "tickets-heading", type: "heading", level: 2, text: "Which tickets you actually need" },
    { id: "tickets-table", type: "table", caption: "Published 2026 list prices per person, checked 26 September 2026", columns: ["Item", "Listed price", "Official individual channel"], rows: [
      ["Scenic-area entry", "CNY 100", "玉龙雪山服务 WeChat mini-program, up to 7 days ahead; also sold at the Baisha visitor centre, though the scenic area may change on-site sales at peak times"],
      ["Eco-bus", "CNY 20", "Check with the dated entry product"],
      ["Glacier Park cable car", "CNY 120", "丽江旅游集团 WeChat mini-program, released daily at 20:00 for the next 7 days"],
      ["Spruce Meadow cable car", "CNY 40", "丽江旅游集团 WeChat mini-program, released daily at 21:00 for the next 7 days"],
      ["Spruce Meadow area shuttle", "CNY 15 one way, CNY 20 return", "Listed separately on the same 2026 notice"],
    ] },
    { id: "release-heading", type: "heading", level: 2, text: "The two cable cars release at different hours" },
    { id: "release", type: "paragraph", text: "The cable-car operator's published system opens Glacier Park tickets for the next seven days at 20:00 every evening and Spruce Meadow tickets at 21:00. Entry is sold separately, also up to seven days ahead. They are different products in different mini-programs: securing entry does not secure a cable-car seat. In China time, 20:00 is 12:00 noon in London (13:00 in summer) and 07:00 in New York (08:00 in summer)." },
    { id: "mistakes", type: "callout", tone: "warning", title: "Do not plan around Yak Meadow", body: "The Yak Meadow cable car closed for rebuilding on 4 March 2026. An operator forecast points to about 2028, not a confirmed reopening date. Older itineraries and social posts that still offer it are out of date." },
    { id: "choice-heading", type: "heading", level: 2, text: "Glacier Park or Spruce Meadow?" },
    { id: "choice", type: "comparison", title: "Choose the day you want, then book the matching cable car", columns: [
      { heading: "Glacier Park", body: "The upper cable car, and the one the operator limits partly because of high-altitude wind. The CNY 120 fare is not the whole day: add entry, the eco-bus and whatever your dated ticket says." },
      { heading: "Spruce Meadow", body: "A separate lower-area cable car at CNY 40, released at 21:00. A different visit, not a substitute ticket for Glacier Park. Our eight-day Yunnan tour plans Spruce Meadow and Blue Moon Valley." },
    ] },
    { id: "traps-heading", type: "heading", level: 2, text: "Traps that cost visitors the mountain" },
    { id: "traps-table", type: "table", caption: "What goes wrong, and why", columns: ["Trap", "What actually happens", "Where this comes from"], rows: [
      ["Buying entry and assuming the cable car is included", "Entry and each cable car are separate tickets in separate mini-programs.", "Jade Dragon management notice; Lijiang cable-car operator"],
      ["Waking up to book at 20:00 your time", "The release is 20:00 China time: midday in London, early morning in New York.", "Lijiang cable-car operator release rule"],
      ["Planning on Yak Meadow", "Closed for rebuilding since 4 March 2026.", "Lijiang tourism operator filing, 3 March 2026"],
      ["Booking for someone else", "Cable cars are real-name with a face check; the person on the ticket has to be the person at the gate.", "Lijiang cable-car operator"],
      ["Leaving no spare day", "Wind or snow can suspend a cable car. For Glacier Park, you can switch to a later date only where tickets are left in the next seven days; otherwise priority places start on the eighth day after the stoppage.", "China Tourism News, quoting the operator, June 2025"],
      ["Placing and cancelling orders to test the system", "Since April 2025, self-refunds and unpaid Glacier Park orders count as purchases under a 90-day limit per identity; ten across the three cable cars in a year freeze Glacier Park booking for a year. Weather stoppages do not count.", "China Tourism News, quoting the operator, June 2025"],
      ["Going in heavy snow without a plan B", "On 2 February 2025 visitors queued about four hours for the cable car down; on 4 February flow was limited and the day's cable-car tickets were all gone.", "Cover News (People's Daily site), 5 February 2025"],
    ] },
    { id: "workflow-heading", type: "heading", level: 2, text: "A safer order for your booking" },
    { id: "workflow", type: "list", ordered: true, items: [
      "Choose Glacier Park or Spruce Meadow first, and check that it is operating for your date.",
      "Book the cable car at its release time, 20:00 or 21:00 China time, seven days ahead, in 丽江旅游集团; it uses real-name and face checks.",
      "Book entry in 玉龙雪山服务 for the same date.",
      "Check each order, and keep the original document used for the booking.",
      "Keep one Lijiang day flexible: if the cable car stops for weather, follow the operator's change or refund instruction for your order.",
    ] },
    { id: "passport", type: "callout", tone: "neutral", title: "Using a foreign passport?", body: "Book foreign passports in a separate order from Chinese ID cards (operator notice). The system asks for face recognition and real-name verification before you can buy, and the operator advises doing this two or three days early in peak season, so sort out the passport check before 20:00, not at it. Or let us check it before you pay, and bring the original document used in your order." },
    { id: "sales-heading", type: "heading", level: 2, text: "Hand the mountain day to us" },
    { id: "sales-copy", type: "paragraph", text: "We book the entry and the cable car together on the operators' own systems in each traveller's name, at face value plus one booking fee of USD 7 per person for the mountain (entry and cable car), and we check before you pay how your passports can be booked and verified. Request and pay at least 8 days ahead, the day before the cable car even opens your date, and the booking is guaranteed; if we cannot secure it, we refund the fee and the ticket money in full. If the weather closes the cable car, the operator's change or refund rule applies to your order, and we tell you what it means for your plan. Our own driver can take you from your Lijiang hotel to the mountain and back, and we can keep a spare day in your plan for the weather. Or travel with our eight-day Yunnan tour, which plans Spruce Meadow and Blue Moon Valley.", link: { label: "We book the entry and the cable car together", href: "/services/china-attraction-reservations/?attraction=jade-dragon-snow-mountain#reservation-enquiry" } },
    { id: "sales-products", type: "table", caption: "What we can take off your hands in Yunnan", columns: ["Service", "What you get", "Price"], rows: [
      ["Attraction booking", "Jade Dragon entry and the Glacier Park or Spruce Meadow cable car, booked in each traveller's name, with each booking record sent to you", "USD 7 per person for the mountain (entry and cable car), plus the tickets at face value; guaranteed when you request and pay 8 or more days ahead"],
      ["Car and driver", "Our own driver from your Lijiang hotel to the mountain and back; any city in mainland China", "Quoted in writing before you pay; nothing charged until you accept"],
      ["Yunnan 8-day private tour: Kunming, Dali & Lijiang", "Two nights in Kunming, three in Dali and two in Lijiang, with Spruce Meadow and Blue Moon Valley on the mountain day; Glacier Park can be checked and quoted separately", "From USD 880 per person for 6 travellers"],
    ], rowLinks: [
      "/services/china-attraction-reservations/?attraction=jade-dragon-snow-mountain#reservation-enquiry",
      "/services/private-car-and-driver/",
      "/tours/kunming-dali-lijiang-8-day-private-tour/",
    ] },
    { id: "how-to-book", type: "callout", tone: "neutral", title: "How to book with us", body: "Send your dates, group size and which cable car you want from our booking form, which opens WhatsApp or your email with the details filled in. No passport number is needed to ask. A planner replies within 12 hours, you get a written quote before you pay, and nothing is charged until you accept it. Tours are secured with a 30% deposit by Alipay or VBill, with no added card fees, and the balance is paid when you arrive. We are a licensed travel agency (licence L-BJ10587); our guides and drivers are our own, and there are no shopping stops." },
    { id: "faq", type: "faq", title: "Jade Dragon Snow Mountain booking questions", items: [
      { question: "When do Glacier Park cable-car tickets open?", answer: "Every evening at 20:00 China time, for the next seven days, in the 丽江旅游集团 mini-program. Weather can still change operations on the day." },
      { question: "When do Spruce Meadow cable-car tickets open?", answer: "At 21:00 every evening, for the next seven days, in the same mini-program. It is a separate ticket from Glacier Park." },
      { question: "How much are Jade Dragon Snow Mountain tickets?", answer: "The 2026 list shows CNY 100 entry and a CNY 20 eco-bus. Glacier Park adds a CNY 120 cable car, about CNY 240 for the day. Spruce Meadow adds a CNY 40 cable car and a CNY 15–20 area shuttle, about CNY 180." },
      { question: "Does a mountain-entry ticket include the cable car?", answer: "Do not assume it does. Entry, the eco-bus and each cable car are listed separately; check the exact items on any combined product." },
      { question: "Can I use the Yak Meadow cable car in 2026?", answer: "No. It closed for rebuilding on 4 March 2026; about 2028 is a forecast, not a confirmed date." },
      { question: "What if the weather stops my cable car?", answer: "For Glacier Park: if you are told of a stoppage before your slot, you can switch the order in the mini-program, before the original slot ends, to any date in the next seven days that still has tickets. If the cable car stops on the day and you could not switch, or nothing is left in the next seven days, you get priority booking: from the eighth day after the stoppage, 100 places a day are set aside for affected visitors, valid for a year (China Tourism News, quoting the operator, June 2025). Each Glacier Park order can also be changed once, by yourself, before its slot. For Spruce Meadow, follow the operator's notice for your order." },
      { question: "Is Glacier Park included in Homeground's eight-day Yunnan tour?", answer: "The published route plans Spruce Meadow and Blue Moon Valley, not Glacier Park. Ask for a separate check and quote if Glacier Park is the priority." },
    ] },
    { id: "internal-links", type: "internal-links", title: "Put the mountain day into a Lijiang journey", items: [
      { label: "Kunming, Dali & Lijiang eight-day private tour", href: "/tours/kunming-dali-lijiang-8-day-private-tour/", description: "The published Spruce Meadow and Blue Moon Valley plan; Glacier Park needs a separate check." },
      { label: "Lijiang: Old Town fee, what to see and how many days", href: "/guides/lijiang-old-town/", description: "The three World Heritage parts, the CNY 50 maintenance fee and the snow mountain." },
      { label: "Lijiang or Shangri-La route order", href: "/guides/lijiang-shangri-la-transport-route/", description: "Check the wider journey before fixing your mountain date." },
    ] },
    { id: "sources", type: "sources", title: "Official and operator references", items: [
      { label: "2026 ticket prices", url: "https://www.lijiang.cn/article/175988.html", publisher: "Jade Dragon Snow Mountain management notice / Lijiang city media", reviewedAt: "2026-09-26" },
      { label: "Current entry mini-program and seven-day window", url: "https://www.lijiang.cn/article/181225.html", publisher: "Jade Dragon Snow Mountain management statement / Lijiang city media", reviewedAt: "2026-09-26" },
      { label: "Baisha service centre notice", url: "https://www.lijiang.cn/article/164510.html", publisher: "Jade Dragon Snow Mountain management notice / Lijiang city media", reviewedAt: "2026-09-26" },
      { label: "Cable-car reservation and weather rules", url: "https://www.ctnews.com.cn/dongtai/content/2025-06/25/content_175505.html", publisher: "China Tourism News, quoting the operator", reviewedAt: "2026-09-26" },
      { label: "Older operator advice for foreign-passport bookings", url: "https://www.lijiang.cn/article/133126.html", publisher: "Lijiang cable-car operator / Lijiang city media", reviewedAt: "2026-09-26" },
      { label: "Yak Meadow cable-car suspension", url: "https://static.cninfo.com.cn/finalpage/2026-03-03/1224991096.PDF", publisher: "Lijiang tourism operator stock-exchange filing", reviewedAt: "2026-09-26" },
      { label: "Cover News: four-hour queue for the cable car down on 2 February 2025; flow limited and cable-car tickets gone on 4 February (5 February 2025)", url: "https://www.peopleapp.com/column/30048174845-500006077194", publisher: "Cover News via People's Daily", reviewedAt: "2026-10-20" },
      { label: "Mountain photograph and CC BY-SA 4.0 licence", url: "https://commons.wikimedia.org/wiki/File:Jade_Dragon_Snow_Mountain,_Yunnan.jpg", publisher: "Wikimedia Commons / 钉钉", reviewedAt: "2026-09-26" },
    ] },
  ],
} as const satisfies StructuredPageBody;

export default body;
