import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "A Homeground family tour of China is a private trip: in each city one English-speaking guide and one vehicle serve your family alone, on a route and at a pace agreed around your children. Published prices start at USD 1,190 per person for six travellers on the 8-day Beijing, Xi’an and Shanghai route. Groups of eight to twelve pay considerably less per person and are quoted for the group. Children are quoted individually, so tell us their ages and you get the full plan and the family total in writing before you pay." },
    { id: "included-heading", type: "heading", level: 2, text: "What your family gets" },
    { id: "included-list", type: "list", items: [
      "A private guide and vehicle. On touring days the English-speaking local guide and the vehicle serve your party only, and you can talk through rest stops and priorities with us before you book.",
      "Hotels with breakfast every night. Room types and child bedding are confirmed in writing before payment.",
      "The long journeys booked for you. High-speed trains and domestic flights between cities are in the price, with a driver seeing you off and another meeting you.",
      "Tickets handled. Named first admissions are included, and the attraction reservations in your itinerary carry no extra fee.",
      "A written plan first. You see the route, the hotels and the total before you decide."
    ] },
    { id: "limits", type: "callout", tone: "neutral", title: "What to know before you ask", body: "Guides work city by city rather than travelling with you from start to finish. Published prices are for two, four or six adults sharing twin rooms. Groups of seven to twelve, families of three or five, and every child get their own quote. The big sights involve walking and steps, the Great Wall and Zhangjiajie most of all, so tell us how far each traveller can comfortably walk." },
    { id: "routes-heading", type: "heading", level: 2, text: "Five routes families ask about" },
    { id: "routes-table", type: "table", caption: "Family-friendly private routes and prices per person, with an English-speaking guide", columns: ["Route", "Days", "Why families choose it", "Six travellers"], rows: [
      ["Beijing, Xi’an & Shanghai", "8", "The shortest way to see the Great Wall at Mutianyu, the Forbidden City and the Terracotta Warriors, with a flight instead of a six-hour train. There is no rest day.", "USD 1,190"],
      ["Beijing, Xi’an, Guilin & Shanghai", "10", "Adds the Li River cruise to Yangshuo, a change of pace after the big cities.", "USD 1,670"],
      ["Beijing, Hangzhou, Suzhou & Shanghai", "11", "No domestic flights: trains and a private car only. West Lake by boat, a tea village, a Suzhou garden and a canal water town.", "USD 1,540"],
      ["Beijing, Xi’an, Chengdu, Guilin & Shanghai", "14", "The panda route: the Chengdu panda base near opening time, when the pandas are usually moving around, plus the Li River cruise and a bamboo raft on the Yulong River.", "USD 2,360"],
      ["Beijing, Xi’an, Zhangjiajie, Guilin & Shanghai", "14", "For older children: the Zhangjiajie peaks behind Avatar and Tianmen Mountain. Allow several hours on paths and steps even with the elevator and cable car.", "USD 2,430"]
    ] },
    { id: "routes-copy", type: "paragraph", text: "These are the published six-traveller prices. Two families travelling together, or any group of eight to twelve, pay considerably less per person; tell us the group size and we quote it. A family of four pays more per person, USD 1,310 on the 8-day route for example. If you want a rest day, the 14-day routes have more room for one than the 8- and 10-day routes. Your quote depends on your dates, the hotels you choose and the children’s ages." },
    { id: "children-heading", type: "heading", level: 2, text: "How pricing works with children" },
    { id: "children-copy", type: "paragraph", text: "Children are not priced from a table. Each child is quoted from their age and what they need on the trip, and a family that is not two, four or six people gets its own quote as well. Send the ages and your room needs with the enquiry so that the written quote covers the whole family, not only the adults." },
    { id: "booking-heading", type: "heading", level: 2, text: "How booking works" },
    { id: "booking-list", type: "list", ordered: true, items: [
      "Tell us the month, the children’s ages, and the route or the number of days you have in mind.",
      "A planner checks hotels, guides and tickets for your dates and sends a written plan with the total.",
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
      { question: "How much does a China family tour cost?", answer: "Homeground's published private-tour prices start at USD 1,190 per person for six travellers on the 8-day Beijing, Xi'an and Shanghai route, and USD 2,360 per person for six on the 14-day route that includes the Chengdu pandas. A family of four pays USD 1,310 and USD 2,620 per person on the same routes. Groups of eight to twelve are quoted lower per person. They include hotels with breakfast, private guides and vehicles on touring days, named tickets and the trains and flights between cities. Children are quoted individually." },
      { question: "What is the best China tour for a family with kids?", answer: "It depends on the days you have and the children's ages. With 14 days, the Beijing, Xi'an, Chengdu, Guilin and Shanghai route adds the panda base and a river day. With 8 days, Beijing, Xi'an and Shanghai covers the Great Wall, the Forbidden City and the Terracotta Warriors. To avoid domestic flights, the 11-day Beijing, Hangzhou, Suzhou and Shanghai route uses trains and a private car only." },
      { question: "Do children get a discount on a China private tour?", answer: "There is no fixed child price in the public list. Each child is quoted individually from their age and what they need on the trip, so send the ages with your enquiry and the written quote will cover the whole family." },
      { question: "Is a private tour better than a group tour for a family?", answer: "On a private tour the guide and vehicle serve your family only, so the pace, the stops and the starting times are yours. If budget matters more than pace, two of the 14-day routes also run as small-group departures from USD 2,140 per person." },
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
