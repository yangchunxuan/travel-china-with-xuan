import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { attractionReservationServiceFeeCny, ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS } from "../../../lib/attractionReservations.ts";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: `A Mutianyu Great Wall visit is three separate tickets: admission, RMB 40; the shuttle bus between the service area and the wall, RMB 15 return; and the cable car, RMB 100 one way or RMB 140 return. The official shop sells them one by one or as a bundle for RMB 200, read on 11 October 2026. Tickets are real-name, a passport is accepted, and booking opens 30 days ahead. Let us handle your ticket booking for CNY ${attractionReservationServiceFeeCny} per person, plus the face-value ticket. Send your date as soon as it is set so we can prepare before tickets open.` },
    { id: "price-table", type: "table", caption: "Mutianyu Great Wall prices on the official ticket shop, 11 October 2026", columns: ["Ticket", "Adult price", "What it covers"], rows: [
      ["Standard admission", "RMB 40", "Entry to the wall. Towers 1 to 20 are open by day"],
      ["Postcard admission", "RMB 45", "The same entry, plus a souvenir postcard collected at the ticket centre after the visit"],
      ["Shuttle bus", "RMB 15", "Return ride between the service area and the wall entrance, 6 km in all"],
      ["Cable car", "RMB 100 one way, RMB 140 return", "Holders enter by the north ticket gate"],
      ["Postcard admission + shuttle", "RMB 60", "Admission and the return shuttle"],
      ["Postcard admission + shuttle + cable car return", "RMB 200", "The all-in bundle"]
    ] },
    { id: "price-copy", type: "paragraph", text: "The scenic area’s rules say the admission policy covers the wall only. The shuttle, the cable car, the chairlift and the toboggan are each paid for separately. The shuttle station is about 3 km from the ticket gate, which is why the shop recommends the bus." },
    { id: "handoff-options", type: "comparison", title: "Prefer to have it done for you?", columns: [
      { heading: `Your tickets booked for you: CNY ${attractionReservationServiceFeeCny} per person`, body: "Leave the booking steps to us. Send your date early; tickets stay at face value, with no mark-up.", items: ["We reserve on the official system in each traveller’s own passport name, for the date and entry window you choose.", "You see exactly what we will book, and the total, in writing before you pay.", `Request and pay at least ${ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS} days before your visit and the booking is guaranteed. If we cannot secure it, the fee and the ticket money are refunded in full.`] },
      { heading: "Add a guide for the day: CNY 1,200", body: "A private, licensed English-speaking guide for up to 8 hours in Beijing. The rate is per guide, not per person; CNY 1,400 on peak dates.", items: ["Your guide settles the gate, the way up and the turnaround time with you, and explains the wall as you walk it.", "Transport, your tickets and meals are quoted separately."] },
      { heading: "On a private tour: reservations included", body: "Book a Homeground private tour and we reserve the attractions in that itinerary at no extra fee.", items: ["The Beijing 5-day private tour starts at USD 669 per person for four travellers, or USD 839 per person for two. Its published route visits the Great Wall at Badaling."] }
    ] },
    { id: "handoff-links", type: "internal-links", title: "Book it with us", items: [
      { label: "See the Beijing 5-day route and what's included", href: "/tours/beijing-highlights-5-day-private-tour/" },
      { label: "Ask for a Beijing guide on your date", href: "/services/private-english-speaking-guides/#beijing" }
    ] },
    { id: "concession-callout", type: "callout", tone: "neutral", title: "Discounts are narrower than they look", body: "The shop lists RMB 20 student and senior admission, but the student ticket needs a student card and the shop marks the senior ticket for visitors from mainland China, Hong Kong, Macau and Taiwan. The rules list foreign minors aged over 6 and up to 18, and taller than 1.2 m, as eligible for the concession ticket; the shop had no product named for them when we read it, so ask at the ticket centre. On the shuttle and the cable car, children 1.2 m or shorter ride free and everyone taller pays the full price." },
    { id: "toboggan-heading", type: "heading", level: 2, text: "Is the toboggan included with the cable car?" },
    { id: "toboggan-copy", type: "paragraph", text: "No. The official rules say the cable car belongs to one company and the chairlift and toboggan to another, and that their tickets cannot be used on each other. A return cable car ticket means coming back the way you went up. Chairlift and toboggan ticket holders enter by the toboggan ticket gate, cable car holders by the north ticket gate. The official shop did not list chairlift or toboggan tickets when we read it, so confirm the seller and the price before you count on the slide down." },
    { id: "booking-heading", type: "heading", level: 2, text: "Can you book with a foreign passport?" },
    { id: "booking-copy", type: "paragraph", text: "Yes, by the scenic area’s own rules. Admission is sold by real-name reservation, and each ID, whether a Chinese ID card, a foreign permanent-resident card or a passport, can hold one admission ticket a day. A visitor who ordered with a foreign passport does not exchange anything at a window: you show the original passport at the gate you booked. We read the shop without registering, so we cannot say whether a non-Chinese mobile number can open an account or which payment methods it accepts." },
    { id: "booking-list", type: "list", ordered: true, items: [
      "Choose the date. Tickets can be booked up to 30 days ahead, and the shop shows how many admission and cable car tickets remain for each day.",
      "Choose the entry window. For 13 October the shop offered 08:30–12:00 and 12:00–17:00.",
      "Add each traveller with the name and passport number exactly as printed. One mobile number registers one account, and every ticket needs its own traveller’s details.",
      "Decide on the shuttle and the cable car now or on the day; they are separate tickets, or one bundle.",
      "Know the refund rule: an unused ticket can be refunded or moved to another date on the purchase platform until midnight on the visit date. After that it cannot be refunded, changed or used."
    ] },
    {
      "id": "reservation-pretrip-reminder",
      "type": "callout",
      "title": "The ticket you buy decides which gate you use",
      "body": "A cable car ticket sends you to the north ticket gate, a chairlift or toboggan ticket to the toboggan gate. Settle the way up before you agree a meeting point or a return time with a driver.",
      "tone": "decision",
      "link": {
        "href": "https://homegroundchina.com/guides/china-attractions-advance-booking-checklist/",
        "label": "See what to arrange before your China trip"
      }
    },
    { id: "hours-heading", type: "heading", level: 2, text: "Opening hours by season" },
    { id: "hours-table", type: "table", caption: "Mutianyu Great Wall opening hours", columns: ["Season", "Dates", "Hours"], rows: [
      ["Peak season", "16 March to 15 November", "Monday to Friday 7:30–18:00; Saturday and Sunday 7:30–18:30"],
      ["Low season", "16 November to 15 March", "8:00–17:30"]
    ] },
    { id: "hours-copy", type: "paragraph", text: "Ticket sales stop an hour before closing and ticket checks half an hour before. The cable car keeps the same hours. By day, towers 1 to 20 are open; the night opening covers towers 10 to 15. The scenic area closes fully or in part in thunderstorms, heavy rain, snow, hail, fog or strong wind, and posts closures on its notice page, so look at it on the morning of your visit." },
    { id: "faq", type: "faq", title: "Questions travellers ask before booking", items: [
      { question: "How much are Mutianyu Great Wall tickets?", answer: "Standard adult admission is RMB 40 on the official ticket shop, read on 11 October 2026, or RMB 45 for the postcard ticket. The shuttle bus is RMB 15 return and the cable car RMB 100 one way or RMB 140 return. The shop's all-in bundle of postcard admission, shuttle and return cable car is RMB 200." },
      { question: "Can someone book Mutianyu Great Wall tickets for me?", answer: `Yes. Send your visit date as soon as it is set. We handle the passport-name booking on the attraction’s own system for CNY ${attractionReservationServiceFeeCny} per person, plus the face-value ticket, with the total confirmed in writing before you pay. Request and pay at least ${ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS} days before your visit and the booking is guaranteed; if we cannot secure it, the fee and ticket money are refunded in full. A private English-speaking guide for the day is CNY 1,200 for up to 8 hours. Send us your date to start.` },
      { question: "How much is the Mutianyu cable car?", answer: "RMB 100 one way and RMB 140 return on the official shop, read on 11 October 2026. It is sold separately from admission, has no child or senior discount, and is free only for children 1.2 m or shorter. Cable car ticket holders enter by the north ticket gate." },
      { question: "Can foreigners book Mutianyu tickets with a passport?", answer: "Yes. The scenic area's rules name the passport as an accepted ID for real-name booking, one admission ticket per passport per day, and say a visitor who booked with a foreign passport shows the original at the gate without exchanging a ticket. We have not tested registering with a non-Chinese mobile number or paying." },
      { question: "How far in advance can I book Mutianyu tickets?", answer: "Up to 30 days ahead, according to the scenic area's rules. The official shop shows the number of admission and cable car tickets left for each date and sells entry by time window, for example 08:30-12:00 and 12:00-17:00." },
      { question: "Can I get a refund or change the date?", answer: "Yes, if the ticket has not been used. The rules allow a refund or a change on the purchase platform until midnight on the booked visit date, with the money returned to the original account within seven working days. After that the ticket cannot be refunded, changed or used." },
      { question: "Is the toboggan included in the Mutianyu cable car ticket?", answer: "No. The official rules say the cable car and the chairlift-and-toboggan are run by two different companies and their tickets are not interchangeable. Toboggan ticket holders enter by the toboggan ticket gate. The official shop did not list toboggan tickets when we read it." },
      { question: "What are the Mutianyu Great Wall opening hours?", answer: "From 16 March to 15 November: 7:30-18:00 on weekdays and 7:30-18:30 at weekends. From 16 November to 15 March: 8:00-17:30. Ticket sales stop one hour before closing and ticket checks half an hour before, and the cable car keeps the same hours." },
      { question: "Do I need the shuttle bus at Mutianyu?", answer: "It is optional, but the shuttle station is about 3 km from the ticket gate and the official shop recommends the bus. A return ticket is RMB 15. Children 1.2 m or shorter ride free; there is no other discount." },
    ] },
    { id: "next-links", type: "internal-links", title: "Plan the rest of the Great Wall day", items: [
      { label: "Beijing to Mutianyu: transport options", href: "/guides/beijing-to-mutianyu-great-wall-transfer/" },
      { label: "Which Great Wall section suits you", href: "/guides/great-wall-section-selector-from-beijing/" },
      { label: "Forbidden City booking for foreign visitors", href: "/guides/forbidden-city-for-foreign-visitors/" }
    ] },
    { id: "sources", type: "sources", title: "Price and rule references", items: [
      { label: "Official ticket shop: prices, dates and entry windows", url: "https://fx.mutianyugreatwall.com/fore/index", publisher: "Mutianyu Great Wall scenic area", reviewedAt: "2026-10-11" },
      { label: "Official visitor information: booking, ID, refund and opening rules", url: "https://www.mutianyugreatwall.com/cnInformation", publisher: "Mutianyu Great Wall scenic area", reviewedAt: "2026-10-11" },
      { label: "Official notices, including closures", url: "https://www.mutianyugreatwall.com/cnNotices", publisher: "Mutianyu Great Wall scenic area", reviewedAt: "2026-10-11" },
      { label: "Hero: Mutianyu in autumn by Francesco Bini (Sailko), CC BY-SA 4.0; resized", url: "https://commons.wikimedia.org/wiki/File:Mutianyu,_grande_muraglia_cinese,_veduta_(autunno_2024)_11.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-10-11" },
      { label: "Hero derivative licence: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-10-11" }
    ] }
  ]
} satisfies StructuredPageBody;

export default body;
