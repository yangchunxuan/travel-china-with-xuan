import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyReservationFee, bodyReservationLeadDays, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const glTour = "guilin-yangshuo-5-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Yes, you can visit the Longji Rice Terraces from Guilin in a day (the Ministry of Culture and Tourism puts them 65 km away), if you leave early, choose one terrace area and keep the evening free of trains and flights. Stay a night when you want the terraces in the evening and at first light, a second chance if cloud hides the view, or a slower pace. Longji is not one viewpoint: it is a mountain region of terraces and villages, with a road approach, an entrance and an uphill walk before the sightseeing starts.",
    },
    {
      id: "answer",
      type: "callout",
      title: "The short answer",
      tone: "decision",
      body: "Day trip: you sleep in Guilin, can leave early, will see one terrace area and have nothing fixed that evening. One night: evening and early-morning light matter, a second weather window would save the visit, someone walks slowly, or Longji sits naturally between two parts of the route. From Yangshuo, work out the whole day door to door before calling it a day trip: two long road legs leave little time on foot.",
    },
    {
      id: "night-heading",
      type: "heading",
      level: 2,
      text: "Longji at night: what staying over actually gives you",
    },
    {
      id: "night-copy",
      type: "paragraph",
      text: "The official sources we checked describe the terraces, villages and living farming system; they do not list a night show or an illuminated route. “Longji at night” in practice means sleeping in one of the terrace villages, so you see the fields in the evening after the day visitors have gone and again at first light, without a mountain drive in between. It also means a village guesthouse rather than a city hotel: a path from where the car stops, steps, limited late services, and dark paths that can be wet and slippery. Cloud can hide both the evening and the morning; an overnight gives you a second try, not a guaranteed view. If you want the night, plan the car around it: up in the afternoon, down the next morning, with the drop-off point and pickup time written into your quote before you pay. Ask for a Longji car.",
      link: { label: "Ask for a Longji car", href: "/services/private-car-and-driver/#car-enquiry" },
    },
    {
      id: "traps-heading",
      type: "heading",
      level: 2,
      text: "Six Longji traps that only show up on the mountain",
    },
    {
      id: "traps-list",
      type: "list",
      ordered: true,
      items: [
        "“Longji” is a region, not a meeting point. China's Ministry of Culture and Tourism names Dazhai Yao terraces, Ping'an Zhuang terraces, Longji Ancient Zhuang Village and Xiaozhai Red Yao terraces within the scenic area, and Guangxi's register puts the whole area at 70.1 square kilometres. A booking that says only “Longji transfer” does not tell you where the car stops or which terraces you will see.",
        "Do not judge the day by the 65 km. The Ministry puts Longji 65 km from Guilin, which looks like a short hop on a map; but after the road come the entrance, internal transport where it runs and an uphill walk to the viewpoints. A late start eats the walking time first.",
        "Your suitcase may not reach the room. Some village stays sit up steps or a path beyond the last point a vehicle can reach. Ask who carries bags, how far, and what happens in rain or after dark.",
        "The colour in the photo is a farming stage, not a timetable. The National Agriculture Museum describes Longji as a living rice-terrace system across 11 administrative villages; water, seedlings, green rice and harvest follow farmers and weather, so a picture from another year promises nothing about your date.",
        "Two areas in one day becomes a race. Crossing from one terrace area to another adds road and walking you cannot see on a map; you usually end up doing neither properly.",
        "A same-evening flight or train is the costliest mistake. Between the viewpoint and your departure sit a mountain road, the weather and the way out of the scenic area, and you control none of them; nobody should ask a driver to win back time on a wet mountain road. Keep Longji away from your last day.",
      ],
    },
    {
      id: "traps-sales",
      type: "paragraph",
      text: "Traps 1, 2, 5 and 6 are planning problems, and one written quote settles them before you pay. Book a private car with one of our own drivers for the day: the quote names the terrace area and village, the drop-off point, how long the driver waits, the time you turn back and the total price. You are collected at your Guilin hotel and brought back, or taken on to your next stop. Cloud and the farming stage nobody can book; the rest is on paper before you pay. We can send a car in any city in mainland China, and we reply within 12 hours. Ask for a Longji day car.",
      link: { label: "Ask for a Longji day car", href: "/services/private-car-and-driver/#car-enquiry" },
    },
    {
      id: "decision-heading",
      type: "heading",
      level: 2,
      text: "Day trip or one night? Decide before choosing a village",
    },
    {
      id: "decision-matrix",
      type: "table",
      caption: "Which shape of trip fits your situation",
      columns: ["Your situation", "Better default", "Why", "What would change it"],
      rows: [
        ["Guilin hotel, one free day, light luggage", "Day trip", "One chosen area makes a complete visit with no hotel move", "A poor forecast, slow walking or a late start make a night safer"],
        ["Photography or landscape is a main reason for the trip", "One night", "A second weather window, and the landscape outside the midday crowd", "Someone who cannot manage the steps, or a hard last path to the guesthouse"],
        ["Starting and ending in Yangshuo", "Rethink the route", "The visit sits between two long road legs, so delays eat the walking time", "A route that does not return to Yangshuo, or an overnight"],
        ["Older parents, young children or limited stair tolerance", "One night, or a deliberately small day trip", "A slow pace and one easy viewpoint matter more than collecting terrace names", "A confirmed low-walking route can make a day trip comfortable"],
        ["Same-evening train, flight or show", "Do not do Longji that day", "Road, weather and the way in and out can each make you late, and you control none of them", "Move the fixed booking or Longji"],
        ["Several large suitcases", "One night only after checking the last path, or leave bags in Guilin", "Some village stays need steps or a walk after the car stops", "A property that confirms car access and named luggage help"],
      ],
    },
    {
      id: "day-heading",
      type: "heading",
      level: 2,
      text: "What a good Longji day trip from Guilin looks like",
    },
    {
      id: "day-shape",
      type: "list",
      ordered: true,
      items: [
        "Leave your Guilin hotel early with the terrace area already agreed in Chinese; do not choose villages in the car.",
        "Go through the current entrance or shuttle, then straight to the one walking loop or set of viewpoints you chose.",
        "Stop for a meal or a rest in the village instead of racing between named platforms.",
        "Keep to the turnaround time you set. The return starts at the viewpoint, not when the car leaves the mountain.",
        "Leave the evening free of any flight, last train or booking whose failure would damage the trip.",
      ],
    },
    {
      id: "area-check",
      type: "table",
      caption: "Get these answers in writing before you pay for a transfer or a room",
      columns: ["Question", "A good answer", "A weak answer"],
      rows: [
        ["Which terraces?", "A named area and village, not only “Longji”", "“The driver knows the best place”"],
        ["Where does the car stop?", "A named parking or drop-off point and the walk from there", "“The hotel is inside the scenic area”"],
        ["How much walking?", "Surface, stairs, climb and a turnaround point", "“Easy for everyone”"],
        ["How do we get in?", "The current entrance, how the ticket works with a passport, and any internal transport", "A screenshot with no date or source"],
        ["How do we get back?", "A named pickup point, the person responsible and the time you leave", "“Call us when you finish”"],
      ],
    },
    {
      id: "area-sales",
      type: "paragraph",
      text: "Our Longji car quote answers rows one, two and five in writing before you pay: the named terrace area and village, the drop-off point, and the pickup point, our own driver and the time you leave. Ask for a Longji day car quote.",
      link: { label: "Ask for a Longji day car quote", href: "/services/private-car-and-driver/#car-enquiry" },
    },
    {
      id: "origin-heading",
      type: "heading",
      level: 2,
      text: "Where you start changes the answer",
    },
    {
      id: "origin-matrix",
      type: "table",
      caption: "Treat each starting point as a different journey",
      columns: ["Starting from", "What it means", "What to check"],
      rows: [
        ["A Guilin city hotel", "The cleanest base for a one-area day trip", "Pickup address, exact terrace area and the time you turn back"],
        ["Guilin airport or station on arrival day", "Usually too fragile for a full visit unless you land early and can cut the plan short safely", "Delays, baggage, the entrance closing and arriving at a village in the dark"],
        ["Yangshuo", "A longer, more fragile day than from Guilin", "The whole route, and whether a night or an onward transfer avoids doubling back"],
        ["Your last days before an international flight", "Keep Longji away from the final deadline", "Sleep near the departure airport on the last night"],
      ],
    },
    {
      id: "origin-sales",
      type: "paragraph",
      text: "Landing in Guilin? Our car can take you from the airport or station to your hotel, and up to Longji the next morning, quoted in writing before you pay. See how our airport and station transfers work.",
      link: { label: "See how our airport and station transfers work", href: "/services/private-car-and-driver/" },
    },
    {
      id: "season-heading",
      type: "heading",
      level: 2,
      text: "Best time for Longji: read the farming calendar",
    },
    {
      id: "season-copy",
      type: "paragraph",
      text: "There is no fixed best week, but there is a farming calendar to read. The Ministry of Culture and Tourism lists the local festivals: a ploughing-start festival in May, a seedling festival in June, a clothes-drying festival in July and the Longji Golden Autumn Terrace Festival in October. Exact dates are set each year and the fields follow farmers and weather, so ask what the terraces look like now and decide in advance how bad the weather must be before you change the plan.",
    },
    {
      id: "season-table",
      type: "table",
      caption: "Enjoy the stage the fields are actually in",
      columns: ["What you find", "What to look for", "What nobody can promise"],
      rows: [
        ["Water-filled plots", "Channels, contours and mountain light on the water", "A perfect mirror or blue sky"],
        ["Growing green rice", "How small fields link to forest and village water", "One “greenest week”"],
        ["Ripening or harvested fields", "Farmers at work; give them room", "A fixed golden date or uncut fields"],
        ["Mist, cloud or muted colour", "The villages, paths and the farming system itself", "That another viewpoint will be clear"],
      ],
    },
    {
      id: "weather",
      type: "callout",
      title: "Cloud is the best argument for one night, not a guarantee",
      tone: "decision",
      body: "A night gives you another attempt, but both windows can be cloudy. Decide in advance how much cloud means you skip a viewpoint, keep one easier village or cultural stop in reserve, and never ask a driver to race wet mountain roads between viewpoints. If an official weather warning or road closure is issued, change the day; do not look for an unofficial way in.",
    },
    {
      id: "luggage-table",
      type: "table",
      caption: "What to ask a terrace guesthouse before you book",
      columns: ["Ask", "Useful answer", "If not"],
      rows: [
        ["Where exactly does the car stop?", "A named drop-off point and a map pin", "Leave big bags in Guilin and carry one night's luggage"],
        ["How far and how steep is the last path?", "Distance, surface, steps and recent photos", "Choose a property a car can reach, or make it a day trip"],
        ["Who carries the bags?", "Named staff, hours and any charge", "Do not count on finding someone on arrival"],
        ["What if we arrive late or in rain?", "Reception hours in writing and a lit meeting point", "Sleep in Guilin and go up next morning"],
      ],
    },
    {
      id: "access",
      type: "callout",
      title: "Terrace paths are not step-free",
      tone: "warning",
      body: "Even when a vehicle, shuttle or cableway removes part of the climb, the viewpoint, village lane, guesthouse entrance and wet-weather route may still have uneven paving and stairs. Check the whole path for the least mobile person in the group.",
    },
    {
      id: "sales-heading",
      type: "heading",
      level: 2,
      text: "Put Longji into a Guilin trip that works",
    },
    {
      id: "tour-offer",
      type: "paragraph",
      text: `Our Guilin & Yangshuo 5-day private tour covers the rest of the region: two nights in Guilin and two in Yangshuo in Ctrip 4-Diamond hotels with breakfast, the Li River cruise with your bags moved separately by road, a guided Yulong River countryside day, Reed Flute Cave or Elephant Trunk Hill, three English-guided days, private transfers and no shopping stops. Longji is not in the published route: tell us whether you want a terrace day or a night in a village, and we fit it in and quote the revised trip in writing before you pay. From ${bodyTourPrice(glTour, 2, "en")} per person for two travellers, ${bodyTourPrice(glTour, 4, "en")} for four or ${bodyTourPrice(glTour, 6, "en")} for six (twin sharing). See the Guilin 5-day route.`,
      link: { label: "See the Guilin 5-day route", href: "/tours/guilin-yangshuo-5-day-private-tour/" },
    },
    {
      id: "cruise-offer",
      type: "paragraph",
      text: `Planning the Li River cruise on your own? Tickets are booked through the official WeChat channel in each passenger's real name, and whether a foreign passport is accepted, and how tickets are collected, has to be confirmed before you book. 3-star boats board at Mopanshan and 4-star boats at Zhujiang, so the pier depends on the ticket you hold. For National Day 2026 the official notice opened full-route boats for booking 15 days ahead, and high water can suspend sailings at short notice. The fare is CNY 215 for a 3-star boat or CNY 360 for a 4-star boat (adult, August 2026 list). We can book it for a ${bodyReservationFee("en")} fee per person plus the face-value fare; request and pay at least ${bodyReservationLeadDays} days ahead and the booking is guaranteed, and if it fails, the fee and fare are refunded in full. Book the Li River cruise with us.`,
      link: { label: "Book the Li River cruise with us", href: "/services/china-attraction-reservations/?attraction=li-river-cruise#reservation-enquiry" },
    },
    {
      id: "trust-copy",
      type: "paragraph",
      text: "Send your dates and group on WhatsApp or by email and we reply within 12 hours. You pay by Alipay or VBill: a 30% deposit, the balance on arrival, and no fees added. Our guides and drivers are our own, we are a licensed travel agency (L-BJ10587), and one planner looks after you from the first reply to the last day. Tell us about the whole trip.",
      link: { label: "Tell us about the whole trip", href: "/services/full-trip-support/" },
    },
    {
      id: "faq",
      type: "faq",
      title: "Questions travellers actually ask",
      items: [
        {
          question: "Can I visit Longji from Guilin in one day?",
          answer: "Yes, if you leave early, choose one terrace area and keep the evening free. Plan the entrance, internal transport, walking and the road back, not only the 65 km drive.",
        },
        {
          question: "What is Longji like at night? Is it worth staying overnight?",
          answer: "The official sources we checked list no night show or lit route. Staying overnight means a village guesthouse with the terraces in the evening and at first light, and a second chance if cloud spoils one of them. A day trip, by definition, misses both. It is worth it if you will use those hours and the path to the guesthouse suits your group.",
        },
        {
          question: "How do I get from Guilin to Longji?",
          answer: "By road. The Ministry of Culture and Tourism puts the scenic area in Longji Town, 65 km from Guilin and 12 km from Longsheng county town; from where the vehicle stops you still go through the entrance and walk or take internal transport. Without a private car or a tour you would have to piece together public transport, and we found no official current timetable, so confirm it locally before you rely on it. A car booked to a named drop-off and pickup point takes those connections out of the day.",
        },
        {
          question: "Can I do it from Yangshuo?",
          answer: "Yes, but it is a longer, more fragile day than from Guilin. A night at Longji, or a route that does not return to Yangshuo, is often more sensible.",
        },
        {
          question: "When is the best time to visit Longji?",
          answer: "There is no fixed best week, but there is a farming calendar to read. The Ministry of Culture and Tourism lists a ploughing-start festival in May, a seedling festival in June, a clothes-drying festival in July and the Longji Golden Autumn Terrace Festival in October. Exact dates are set each year and the fields follow farmers and weather, so ask what the terraces look like now and decide in advance how bad the weather must be before you change the plan.",
        },
        {
          question: "Should I choose Ping'an or Dazhai?",
          answer: "They are different villages of different peoples: the Ministry of Culture and Tourism lists Ping'an as Zhuang terraces and Dazhai as Yao terraces, alongside Longji Ancient Zhuang Village and the Xiaozhai Red Yao terraces. Which suits you depends on how long you stay, how far you can walk, where the car stops and the last path to your guesthouse; settle those first, because neither is best for everyone.",
        },
        {
          question: "Can I bring a large suitcase?",
          answer: "Not without checking the exact drop-off and the last path. Leave it in Guilin, or get written luggage-help details before choosing a terrace stay.",
        },
      ],
    },
    {
      id: "checklist",
      type: "list",
      items: [
        "One named terrace area and entrance, with the destination written in Chinese, not only “Longji”.",
        "A complete route from your real hotel, airport or station, and back or onward.",
        "No hard connection on the evening of a day trip.",
        "A written car, drop-off, walking and luggage plan.",
        "A wet-weather alternative and a time at which you drop extra viewpoints.",
        "Current official ticket, road and opening checks.",
        "Respect for working fields, irrigation paths, homes and village privacy.",
      ],
    },
    {
      id: "links",
      type: "internal-links",
      title: "Connect Longji to the rest of the route",
      items: [
        { label: "Plan the order of Guilin, Yangshuo and Longji", href: "/guides/guilin-yangshuo-longji-route-order/" },
        { label: "Arriving at Guilin Airport or railway station", href: "/guides/guilin-airport-or-railway-station-arrival-guide/", description: "Choose the arrival hub before the mountain transfer." },
        { label: "Guilin to Yangshuo: train, road or river", href: "/guides/guilin-yangshuo-transport-route/", description: "The separate Guilin–Yangshuo transport decision." },
        { label: "Private car and driver in any mainland city", href: "/services/private-car-and-driver/", description: "Day hire, transfers and intercity trips, quoted in writing before you pay." },
        { label: "China itinerary with older parents", href: "/guides/china-itinerary-with-older-parents/", description: "Plan walking, rest and the car around the least mobile traveller." },
        { label: "Yuanyang Rice Terraces viewpoint and village route", href: "/guides/yuanyang-rice-terraces-viewpoint-and-village-route/", description: "Another living terrace system, not a substitute." },
        { label: "China public holidays travel calendar", href: "/guides/china-public-holidays-travel-calendar/", description: "Check holiday traffic before a mountain day." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources and image credit",
      items: [
        { label: "Official Longji overview: named terrace areas, distance from Guilin and local festivals", url: "https://www.mct.gov.cn/preview/special/9160/llxl/202009/t20200923_875345.htm", publisher: "Ministry of Culture and Tourism of China", reviewedAt: "2026-10-20" },
        { label: "Official Guangxi 4A scenic-area register", url: "https://wlt.gxzf.gov.cn/ztzl/rdjj/gxajlyjq/t19045600.shtml", publisher: "Guangxi Department of Culture and Tourism", reviewedAt: "2026-08-21" },
        { label: "Longji Rice Terraces agricultural heritage system", url: "https://jgs.agri.gov.cn/detail/zh/16211.html", publisher: "National Agriculture Museum", reviewedAt: "2026-08-21" },
        { label: "Longji living cultivation and conservation", url: "https://dnr.gxzf.gov.cn/xwzx/gnzx/t19768557.shtml", publisher: "Guangxi Department of Natural Resources", reviewedAt: "2026-08-21" },
        { label: "Li River 2026 National Day notice: real-name booking, full-route boats open for booking 15 days ahead", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/264", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-26" },
        { label: "Li River pier and route guide: 3-star and 4-star boats board at different piers", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/130", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-26" },
        { label: "Hero: Longji rice terraces by Kaur Virunurm, CC0", url: "https://commons.wikimedia.org/wiki/File:Longji_rice_terraces_-_2023_10_11_Kaur_Virunurm.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-21" },
        { label: "Hero licence: CC0 1.0", url: "https://creativecommons.org/publicdomain/zero/1.0/", publisher: "Creative Commons", reviewedAt: "2026-08-21" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
