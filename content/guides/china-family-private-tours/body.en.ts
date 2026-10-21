import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "A Homeground family tour of China is a private trip: in each city one English-speaking guide and one vehicle serve your family alone, on a route and at a pace agreed around your children. Published prices are adult reference prices, from USD 1,190 per adult for six adults sharing twin rooms on the 8-day Beijing, Xi’an and Shanghai route; groups of eight to twelve are quoted lower per person. Children are priced separately by age, and you get the full plan and your family’s total in writing before you pay. International flights are not included." },
    { id: "routes-heading", type: "heading", level: 2, text: "Five routes families ask about" },
    { id: "routes-intro", type: "paragraph", text: "All five are built the same way: four-star hotels with breakfast, a private guide and vehicle in each city, and the trains or flights between cities. What changes is how much you see and how much breathing room the days have. If you want a rest day, the 14-day routes have more room for one than the 8- and 10-day routes." },
    { id: "family-routes-table", type: "table", caption: "Family-friendly private routes and prices per adult, with an English-speaking guide", columns: ["Route", "Days", "Who it suits and the pace", "Six adults · per adult"], rows: [
      ["Beijing, Xi’an & Shanghai", "8", "A first look when time is short: the Great Wall at Mutianyu, the Forbidden City and the Terracotta Warriors, with a flight instead of a six-hour train. Brisk: there is no rest day.", "USD 1,190"],
      ["Beijing, Xi’an, Guilin & Shanghai", "10", "Adds the Li River cruise to Yangshuo, a change of pace after the big cities.", "USD 1,670"],
      ["Beijing, Hangzhou, Suzhou & Shanghai", "11", "For families who would rather not fly inside China: trains and a private car only. West Lake by boat, a tea village, a Suzhou garden and a canal water town.", "USD 1,540"],
      ["Beijing, Xi’an, Chengdu, Guilin & Shanghai", "14", "The panda route: the Chengdu panda base near opening time, when the pandas are usually moving around, plus the Li River cruise and, when the water level and operator allow, a bamboo raft on the Yulong River.", "USD 2,360"],
      ["Beijing, Xi’an, Zhangjiajie, Guilin & Shanghai", "14", "For older children who enjoy walking: the Zhangjiajie peaks behind Avatar and Tianmen Mountain. Allow several hours on paths and steps even with the elevator and cable car.", "USD 2,430"]
    ], rowLinks: [
      "/tours/beijing-xian-shanghai-8-day-private-tour/",
      "/tours/beijing-xian-guilin-shanghai-10-day-private-tour/",
      "/tours/beijing-hangzhou-suzhou-shanghai-11-day-private-tour/",
      "/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/",
      "/tours/beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour/"
    ] },
    { id: "prices-heading", type: "heading", level: 2, text: "How the prices work" },
    { id: "prices-copy", type: "paragraph", text: "Every price in the table is per adult, not per family, and six adults sharing twin rooms is the main reference. For the group, multiply by the number of adults; children are quoted on top. Your written quote shows the whole family’s total, based on your dates, the hotels you choose and the children’s ages." },
    { id: "family-price-table", type: "table", caption: "Who is travelling and how the price is set, with the 8‑day route as the example", columns: ["Who is travelling", "How it is priced", "8-day route"], rows: [
      ["Six adults sharing twin rooms", "Main reference: the per-adult price in the table above", "USD 1,190 per adult; USD 7,140 for the six"],
      ["Four adults sharing twin rooms", "Published per-adult price for four", "USD 1,310 per adult; USD 5,240 for the four"],
      ["Eight to twelve, such as two families", "Supplementary reference: lower per person than six, quoted for the whole group", "Written group quote"],
      ["Children", "Quoted one by one, from each child’s age and room and bedding needs", "Added to your family total"],
      ["Two adults with children, or another group size", "Not a published tier: adults and children are quoted together", "Written family quote before you pay"]
    ] },
    { id: "included-heading", type: "heading", level: 2, text: "What the route price includes" },
    { id: "family-included-comparison", type: "comparison", columns: [
      { heading: "Included on all five routes", items: [
        "Hotel nights with breakfast in twin rooms at the four-star standard. Hotel names, room types and child bedding are confirmed in writing before payment.",
        "On touring days, an English-speaking local guide and a vehicle for your party only, with a driver taking you to each train or flight and another meeting you.",
        "The trains and domestic flights between cities in the itinerary. The 11-day route uses trains only.",
        "The named first admissions, and the reservations for the attractions in your itinerary at no extra fee."
      ] },
      { heading: "Not included", items: [
        "International flights to and from China",
        "Lunches, dinners and drinks",
        "Travel insurance, visas, tips and personal expenses",
        "Room upgrades, public-holiday surcharges and single-room supplements"
      ] }
    ] },
    { id: "limits", type: "callout", tone: "neutral", title: "Good to know before you ask", body: "Guides work city by city rather than travelling with you from start to finish, and you can talk through rest stops and priorities with us before you book. The big sights involve walking and steps, the Great Wall and Zhangjiajie most of all, so tell us how far each traveller can comfortably walk." },
    { id: "booking-heading", type: "heading", level: 2, text: "How to get your family’s quote" },
    { id: "booking-list", type: "list", ordered: true, items: [
      "Tell us the month, the route or number of days, everyone’s ages and the rooms you need.",
      "A planner checks hotels, guides and tickets for your dates and sends a written plan with your family’s total.",
      "You decide. Payment comes only after you have the written confirmation of what is included."
    ] },
    { id: "tours", type: "internal-links", title: "See the routes in detail", items: [
      { label: "Beijing, Xi’an & Shanghai: 8-day private tour", href: "/tours/beijing-xian-shanghai-8-day-private-tour/" },
      { label: "Beijing, Xi’an, Guilin & Shanghai: 10-day private tour", href: "/tours/beijing-xian-guilin-shanghai-10-day-private-tour/" },
      { label: "Beijing, Hangzhou, Suzhou & Shanghai: 11-day private tour", href: "/tours/beijing-hangzhou-suzhou-shanghai-11-day-private-tour/" },
      { label: "Beijing, Xi’an, Chengdu, Guilin & Shanghai: 14-day private tour", href: "/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/" },
      { label: "Beijing, Xi’an, Zhangjiajie, Guilin & Shanghai: 14-day private tour", href: "/tours/beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour/" },
      { label: "Planning a China itinerary with young children", href: "/guides/china-itinerary-with-young-children/" },
      { label: "Every published private tour price", href: "/guides/china-private-tour-prices/" }
    ] },
    { id: "faq", type: "faq", title: "Questions families ask", items: [
      { question: "How much does a China family tour cost?", answer: "Homeground's published private-tour prices are per adult. They start at USD 1,190 per adult for six adults sharing twin rooms on the 8-day Beijing, Xi'an and Shanghai route, and USD 2,360 per adult for six adults sharing twin rooms on the 14-day route that includes the Chengdu pandas. For four adults sharing twin rooms, the same routes are USD 1,310 and USD 2,620 per adult. Groups of eight to twelve are quoted lower per person. Children are quoted individually, and a family with children receives one written total based on the children’s ages and room needs. Prices include hotels with breakfast, private guides and vehicles on touring days, named tickets and the trains and flights between cities; international flights are not included." },
      { question: "What is the best China tour for a family with kids?", answer: "It depends on the days you have and the children's ages. With 14 days, the Beijing, Xi'an, Chengdu, Guilin and Shanghai route adds the panda base and a river day. With 8 days, Beijing, Xi'an and Shanghai covers the Great Wall, the Forbidden City and the Terracotta Warriors. To avoid domestic flights, the 11-day Beijing, Hangzhou, Suzhou and Shanghai route uses trains and a private car only." },
      { question: "Do children get a discount on a China private tour?", answer: "There is no fixed child price in the public list. Each child is quoted individually from their age and what they need on the trip, so send the ages with your enquiry and the written quote will cover the whole family." },
      { question: "Is a private tour better than a group tour for a family?", answer: "On a private tour the guide and vehicle serve your family only, so the pace, the stops and the starting times are yours. If budget matters more than pace, two of the 14-day routes also run as small-group departures from USD 2,650 per person." },
      { question: "How many days does a family need in China?", answer: "Eight days is the shortest published route that covers Beijing, Xi'an and Shanghai, and it has no rest day. Ten to fourteen days is easier with children: the 14-day routes have more room for a rest day and add pandas or the Li River." },
      { question: "Can grandparents travel with us?", answer: "Yes. Tell us the ages in your party, the rooms you need and how long each traveller can comfortably walk. Gardens, temple grounds, the Great Wall and Zhangjiajie all involve steps and uneven ground, and the plan is checked against that before you book." },
      { question: "Do you book the attraction tickets for a family tour?", answer: "Yes. The named first admissions on each route are included in the price, and the reservations for the attractions in your itinerary are made by us at no extra fee." },
    ] },
    { id: "sources", type: "sources", title: "Prices, inclusions and photograph", items: [
      { label: "Published prices and inclusions: Beijing, Xi’an & Shanghai 8-day private tour", url: "https://homegroundchina.com/tours/beijing-xian-shanghai-8-day-private-tour/", publisher: "Homeground China", reviewedAt: "2026-10-11" },
      { label: "Published prices and inclusions: 14-day private tour with Chengdu", url: "https://homegroundchina.com/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/", publisher: "Homeground China", reviewedAt: "2026-10-11" },
      { label: "All published private tour prices", url: "https://homegroundchina.com/guides/china-private-tour-prices/", publisher: "Homeground China", reviewedAt: "2026-10-11" },
      { label: "Hero: panda at the Chengdu Research Base of Giant Panda Breeding by George Lu, CC BY 2.0; resized", url: "https://commons.wikimedia.org/wiki/File:Panda_in_Chengdu_Research_Base_of_Giant_Panda_Breeding_-_7708872342.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-10-11" },
      { label: "Hero licence: CC BY 2.0", url: "https://creativecommons.org/licenses/by/2.0/", publisher: "Creative Commons", reviewedAt: "2026-10-11" }
    ] }
  ]
} satisfies StructuredPageBody;

export default body;
