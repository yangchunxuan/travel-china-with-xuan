import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Choose by what the property can actually do for you on arrival and departure, not by the word on the listing. A hostel dormitory bed, a hostel private room and a budget hotel room are three different products, and the gap between the first and the second is often larger than the gap between the second and the third. There is no national rule that makes one of them cheaper, friendlier or more accessible than the others. What varies is the individual property: its front-desk hours, its ability to register your particular document, its bathroom arrangement, its lift, its luggage storage and its late-arrival policy." },

  { id: "answer", type: "callout", title: "Three products, one verification method", tone: "decision", body: "Treat \"hostel or budget hotel\" as a choice between three things, not two: a bed in a shared room, a private room inside a hostel, and a private room in a budget hotel. Decide first whether you need a lockable private room — that single question settles most cases. Then, whichever you choose, verify the same short list of operational facts with that specific property before you pay. Every meaningful difference in this decision is property-level, which is why this guide is a checklist rather than a ranking." },

  { id: "products-heading", type: "heading", level: 2, text: "Three products, and the real dividing line" },
  { id: "products-copy", type: "paragraph", text: "The common framing pits \"hostel\" against \"hotel\" as if the categories were opposites. They are not. A hostel private room and a budget hotel room are close relatives: a lockable door, your own space, and a nightly rate that often lands in the same range. The dormitory bed is the genuinely different object, and almost every claim people make about hostels — the sociability, the noise, the cheapness, the shared bathroom — is really a claim about dormitories. Separate the three before you compare anything." },
  { id: "products-table", type: "table", caption: "What you are actually buying in each case", columns: ["What you are comparing", "Dormitory bed", "Hostel private room", "Budget hotel room"], rows: [
    ["The unit you buy", "One bed in a shared room", "The whole room", "The whole room"],
    ["Lockable door of your own", "No — a locker at best", "Yes", "Yes"],
    ["Who controls when the lights go off", "Whoever is in the room", "You", "You"],
    ["Bathroom", "Usually shared, sometimes en suite for the dorm only", "Varies — must be checked, not assumed", "Usually en suite, but confirm"],
    ["Realistic use of luggage", "Kept in a locker or under a bed; opening a large case is awkward", "Open the case in your own space", "Open the case in your own space"],
    ["Working or a long video call", "Common areas only", "Possible, depending on desk and Wi-Fi", "Possible, depending on desk and Wi-Fi"],
    ["Arriving at 01:00", "Depends entirely on the property", "Depends entirely on the property", "Depends entirely on the property"],
  ]},
  { id: "products-callout", type: "callout", title: "The question that resolves most cases", tone: "decision", body: "Do you need a door you can lock, on the nights in question? If yes, you are choosing between a hostel private room and a budget hotel room, and the decision comes down to the property checklist further down rather than the category. If no, you are choosing a dormitory, and you should read the dormitory column above honestly before you commit to it for several nights in a row." },

  { id: "law-heading", type: "heading", level: 2, text: "They are the same legal category, and that is why you must ask" },
  { id: "law-copy", type: "paragraph", text: "A widespread assumption is that hostels sit in some lighter regulatory tier than hotels. They do not. The State Council-approved Measures for Public Security Administration of the Hotel Industry state that they apply to establishments receiving guests for accommodation — hotels, guesthouses, inns, hostels and similar — regardless of whether they are state, collective, partnership, individual, joint-venture or cooperative ventures, whether accommodation is their main business or a sideline, and whether they operate year-round or seasonally. One rulebook, all of them." },
  { id: "law-list", type: "list", ordered: false, items: [
    "Registration is compulsory. The Measures require a property receiving a guest to register the stay, to inspect the guest's identity document, and to record the prescribed fields truthfully.",
    "For overseas guests there is an additional step: the property must submit the accommodation registration form to the local public security authority within 24 hours.",
    "Storage of valuables is not a courtesy. The Measures require properties to provide a safe-deposit box, cabinet, storage room or safe, with a named person responsible and a register-and-handover system for items deposited.",
    "A bed is assigned to a registered person. The Measures state that guests may not privately let others stay or transfer a bed — which is precisely why a dormitory bed cannot be casually swapped or shared.",
    "Fire and building requirements apply. Premises, fire equipment, exits and passages must comply with the Fire Protection Law and related rules, and necessary anti-theft security facilities are required.",
    "Local rules differ, legitimately. The Measures explicitly allow provinces, autonomous regions and municipalities to issue their own implementing rules, approved locally and filed with the Ministry of Public Security.",
  ]},
  { id: "law-copy2", type: "paragraph", text: "That last point is the one to internalise. Because implementing detail is set locally and operational capability is set by each property — its systems, its staffing, its training — no honest guide can tell you what \"hostels in China\" will do about your document, your age, your deposit or your arrival hour. What a guide can do is tell you exactly what to ask, and warn you that the answer belongs to one property in one place at one time." },
  { id: "law-warning", type: "callout", title: "What this page will not claim", tone: "warning", body: "This page makes no statement about whether hostels in general accept foreign guests, about age limits, about gender rules in dormitories, about deposits, or about front-desk hours. Those are not national facts. Any source that states them as national facts is guessing. Ask the property, get the answer in writing in your booking correspondence, and treat that answer as applying to that property only. Registration requirements for foreign guests specifically are a separate topic with its own guide, linked at the foot." },

  { id: "differences-heading", type: "heading", level: 2, text: "What genuinely differs, and how much it matters" },
  { id: "differences-copy", type: "paragraph", text: "Once the category question is settled, these are the dimensions that decide whether a stay works. Note how few of them are about money." },
  { id: "differences-table", type: "table", caption: "Weigh these against your actual trip, not against a general preference", columns: ["Dimension", "Where it usually bites", "How to settle it before booking"], rows: [
    ["Privacy", "Dormitories, on the third or fourth consecutive night rather than the first", "Be honest about how many nights in a row you can do it"],
    ["Noise", "Dormitories, and any property on a street with late-night trade", "Ask which floor and which side; ask about a common area below your room"],
    ["Bathroom", "Both hostels and budget hotels; \"private bathroom\" is not universal in either", "Ask explicitly whether the bathroom is inside your room"],
    ["Luggage", "Dormitories, where a large case has nowhere to live", "Ask locker dimensions, not just whether lockers exist"],
    ["Laundry", "Long multi-city routes, where it becomes the deciding factor by week two", "Ask whether laundry is on site, chargeable or nearby"],
    ["Lift", "Older buildings of both kinds, especially above the third floor", "Ask directly; do not infer it from photographs"],
    ["Workspace", "Anyone with calls or deadlines", "Ask about a desk, a chair and the wired or wireless connection in the room"],
    ["Front desk hours", "Late arrivals and pre-dawn departures", "Ask the staffed hours, and what happens outside them"],
  ]},

  { id: "listing-heading", type: "heading", level: 2, text: "Read the listing words for what they do not promise" },
  { id: "listing-copy", type: "paragraph", text: "Most bad bookings in this category start with a word on a listing being read as a guarantee. Listings are written to be attractive and are frequently translated loosely, so the useful skill is knowing which words carry an operational commitment and which are decoration. The pattern is consistent: words describing the property's character promise nothing, while words describing a facility only promise something if you can pin them to a specific arrangement." },
  { id: "listing-table", type: "table", caption: "What a listing word does and does not settle", columns: ["The listing says", "What it may still mean", "The question that settles it"], rows: [
    ["\"Private room\"", "A private room that shares a bathroom on the corridor", "Is the bathroom inside the room I am booking?"],
    ["\"24-hour reception\"", "A phone answered at night, or a security guard who cannot register a guest", "Can someone complete my registration at the hour I arrive?"],
    ["\"Luggage storage\"", "A corner of the lobby, unstaffed, at your own risk", "Is it locked, is it staffed, and is it available before check-in and after check-out?"],
    ["\"Female dormitory\" or \"mixed dormitory\"", "A room configuration that can change with occupancy", "Is the room I am booked into fixed, and what happens if it changes?"],
    ["\"Central\"", "Central relative to a district you have not chosen", "Which metro station and exit, and how far on foot at night?"],
    ["\"Free Wi-Fi\"", "Lobby coverage that does not reach the room", "Does it work in the room, and is it strong enough for a call?"],
    ["\"Elevator\"", "A lift in the building that does not serve your floor, or a goods lift", "Is there a lift to my floor that guests can use?"],
  ]},
  { id: "listing-copy2", type: "paragraph", text: "None of this is a reason to distrust listings generally. It is a reason to convert the two or three items that actually matter for your trip into direct questions, because a written answer from the property is worth more than any adjective — and, if something goes wrong, it is also the evidence you will want." },

  { id: "shapes-heading", type: "heading", level: 2, text: "Trip shape decides more than category does" },
  { id: "shapes-comparison", type: "comparison", title: "Four shapes that change the answer", columns: [
    { heading: "Arriving very late", items: ["The only thing that matters is whether someone can register you at that hour", "Registration is a legal step, not a nicety — it cannot be skipped because the desk is closed", "Confirm the staffed hours and the procedure outside them", "This alone can rule out an otherwise ideal property"] },
    { heading: "Leaving before dawn", items: ["Ask how you settle and leave when the desk may be unstaffed", "Ask where luggage can wait if your room must be vacated first", "A dormitory departure at 05:00 disturbs everyone else in the room", "A private room is worth paying for on this specific night"] },
    { heading: "Two or more people together", items: ["Two dormitory beds often approach the price of one private room", "Compare per-room, not per-person, before assuming the dormitory is cheaper", "A private room also removes the risk of being split across rooms", "For three or four, ask whether a family or multi-bed private room exists"] },
    { heading: "A long multi-city route", items: ["Laundry, luggage storage and reliable sleep compound over weeks", "One bad night early is recoverable; a fortnight of them is not", "Consider mixing: dormitories in some cities, private rooms where you need to reset", "Front-desk help with onward logistics is worth more on a long trip"] },
  ]},

  { id: "checklist-heading", type: "heading", level: 2, text: "The per-property checklist" },
  { id: "checklist-copy", type: "paragraph", text: "Send these as a single message to the property before paying, and keep the reply. This list is deliberately short enough to actually send, and every item on it has stranded someone." },
  { id: "checklist", type: "list", ordered: true, items: [
    "Can you register a guest travelling on my specific document? Name the document type rather than asking whether foreigners are accepted.",
    "What hours is the front desk staffed, and what happens if I arrive outside them?",
    "Is there a curfew, a locked front door at night, or a time after which entry is not possible?",
    "For a dormitory: what are the room's rules on who may be booked into it, and are there separate rooms?",
    "Is luggage storage available before check-in and after check-out, and is it staffed or self-service?",
    "Is the bathroom inside the room I am booking, or shared? If shared, how many rooms or beds share it?",
    "Is there a lift, and on which floor is the room?",
    "Can check-in be held for a late arrival, and does that require a deposit or a card?",
    "If I arrive and the room is not as booked, what is the property's own remedy?",
    "What is the cancellation and no-show policy in writing?",
  ]},
  { id: "checklist-callout", type: "callout", title: "Look for the notice board when you arrive", tone: "neutral", body: "Chinese properties commonly display a guest registration notice at the desk, issued by the local public security authority, listing which identity documents are accepted and stating that registration must be real-name and real-time. Reading it takes ten seconds and tells you what the desk is working from. The example photographed for this guide's header is one city's notice; the documents listed and the wording are that city's, not a national list, which is exactly the point — read the one in front of you." },

  { id: "recovery-heading", type: "heading", level: 2, text: "If you arrive and cannot check in" },
  { id: "recovery-copy", type: "paragraph", text: "This is the failure people are least prepared for, and the wrong move is to stand at the desk arguing while the evening disappears. Work in this order." },
  { id: "recovery-table", type: "table", caption: "First hour after a failed check-in", columns: ["Situation", "Do this", "Not this"], rows: [
    ["The desk cannot complete your registration", "Ask what specifically is blocking it, then ask the property to help you find an alternative nearby", "Assume it is a rule about your nationality; it may be a systems or training issue at that property"],
    ["The desk is unstaffed and you have no contact", "Use the booking platform's own contact channel, which creates a timestamped record", "Wait indefinitely without documenting the attempt"],
    ["The room is not what you booked", "Photograph what you were given, and ask for the property's remedy before accepting it", "Accept the room first and complain afterwards"],
    ["The dormitory turns out to be unsuitable", "Ask whether a private room is available at the same property tonight before looking elsewhere", "Book a second property before cancelling the first"],
    ["It is late and nothing is resolving", "Secure a bed for tonight anywhere workable, then resolve the booking in the morning", "Spend the night resolving a booking"],
  ]},
  { id: "recovery-copy2", type: "paragraph", text: "Throughout, keep the evidence: the confirmation, the correspondence in which the property answered your checklist, timestamps, and photographs. A booking dispute is far easier when the property's own written answer is sitting in your inbox — which is the practical reason the checklist above is worth sending in writing rather than asking at the desk." },

  { id: "assumptions-heading", type: "heading", level: 2, text: "Three assumptions worth dropping" },
  { id: "assumptions-list", type: "list", ordered: true, items: [
    "That a hostel is always cheaper. Compare the price of the room you would actually accept — for two people, two dormitory beds often approach one private room, and a hostel private room is not budget-priced by definition.",
    "That a hostel is always more social. Sociability is a function of the common areas, the season and who happens to be there that week, not of the category. A quiet hostel in a low season is quieter than a busy budget hotel lobby.",
    "That a dormitory is the natural choice for a solo traveller. It suits some solo trips and not others. A solo traveller arriving at 23:30 with a large case and an early train the next morning has a stronger case for a private room than a couple would.",
  ]},

  { id: "facts", type: "callout", title: "Reviewed 22 August 2026", tone: "neutral", body: "The regulatory statements above are drawn from the Measures for Public Security Administration of the Hotel Industry as published in the State Council Gazette — approved by the State Council on 23 September 1987, issued by the Ministry of Public Security on 10 November 1987, and revised by the State Council's 2011 decision on repealing and amending certain administrative regulations. Provincial implementing rules and individual property practice sit on top of that and are not reproduced here. Nothing on this page states a national position on document acceptance, age, gender, deposits or opening hours, because those are property-level and locality-level facts. Confirm each one with the property for your dates." },

  { id: "help", type: "callout", title: "Want the checklist run against a shortlist you have already found?", tone: "decision", body: "Send the properties you are considering, your dates, your arrival and departure times, how many of you there are and how much luggage you have. Homeground can tell you which questions matter most for that particular shortlist and where the answers usually go wrong. We do not hold inventory and cannot confirm a property's document handling on its behalf — that answer has to come from the property." },

  { id: "links", type: "internal-links", title: "Continue planning", items: [
    { label: "Foreign guests and Chinese hotels", href: "/guides/foreigners-china-hotel/", description: "The registration question in full, which this page deliberately does not absorb." },
    { label: "Minsu homestay or hotel?", href: "/guides/minsu-homestay-or-hotel-china/", description: "The other direction the accommodation choice can go." },
    { label: "Serviced apartment or hotel?", href: "/guides/serviced-apartment-or-hotel-china/", description: "If the stay is long enough to change the arithmetic." },
    { label: "International chain or local hotel?", href: "/guides/international-chain-or-local-hotel-china/", description: "A different axis of the same booking decision." },
    { label: "Choosing a hotel near the metro", href: "/guides/china-hotel-near-metro/", description: "Once the type is settled, the location checks still apply." },
    { label: "Hotel fire and emergency exit checks", href: "/guides/china-hotel-emergency-exit-fire-safety-check/", description: "What to check in the first five minutes, in either kind of property." },
    { label: "Verifying an accessible hotel room", href: "/guides/china-accessible-hotel-room-verification/", description: "If a lift or a step-free route is not optional for you." },
    { label: "Building a booking dispute evidence pack", href: "/guides/china-booking-dispute-evidence-pack/", description: "What to keep, in case the check-in does go wrong." },
  ]},

  { id: "sources", type: "sources", title: "Official sources and image credit", items: [
    { label: "Measures for Public Security Administration of the Hotel Industry (full text, as revised 2011)", url: "https://www.gov.cn/gongbao/content/2011/content_1860754.htm", publisher: "State Council Gazette, the Central People's Government of the People's Republic of China", reviewedAt: "2026-08-22" },
    { label: "Measures for Public Security Administration of the Hotel Industry, national administrative regulations database entry", url: "http://xzfg.moj.gov.cn/front/law/detail?LawID=1292", publisher: "Ministry of Justice, national administrative regulations database", reviewedAt: "2026-08-22" },
    { label: "Hero: reception desk of a hotel in Longhai City, with the local guest registration notice board, by Vmenkov, CC BY-SA 3.0; cropped and converted to WebP", url: "https://commons.wikimedia.org/wiki/File:Longhai_-_Hotel_reception_-_P1260519.JPG", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" },
    { label: "Hero derivative licence: CC BY-SA 3.0", url: "https://creativecommons.org/licenses/by-sa/3.0/", publisher: "Creative Commons", reviewedAt: "2026-08-22" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
