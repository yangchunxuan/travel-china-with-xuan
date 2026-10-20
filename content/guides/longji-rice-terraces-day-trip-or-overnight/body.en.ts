import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyReservationFee, bodyReservationLeadDays, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const glTour = "guilin-yangshuo-5-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Yes, you can visit the Longji Rice Terraces from Guilin in a day, if you leave early, choose one terrace area and keep the evening free of trains and flights. Stay a night when you want the terraces in the evening and at first light, a second chance if cloud hides the view, or a slower pace. Longji is not one viewpoint: it is a mountain region of terraces and villages, with a road approach, an entrance process and an uphill walk before the sightseeing starts.",
    },
    {
      id: "answer",
      type: "callout",
      title: "The short answer",
      tone: "decision",
      body: "Day trip: you sleep in Guilin, can leave early, will see one terrace area and have nothing fixed that evening. One night: evening and early-morning light matter, a second weather window would save the visit, someone walks slowly, or Longji sits naturally between two parts of the route. From Yangshuo, work out the whole door-to-door day before calling it a day trip: two long road legs leave little time on foot.",
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
      text: "The official sources we checked describe the terraces, villages and living farming system; they do not list a night show or an illuminated route. “Longji at night” in practice means sleeping in one of the terrace villages, so you see the fields in the evening after the day visitors have gone and again at first light, without a mountain drive in between. It also means a village guesthouse rather than a city hotel: a path from where the car stops, steps, limited late services, and darkness on paths that are wet half the year. Cloud can hide both the evening and the morning; an overnight gives you a second try, not a guaranteed view.",
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
        "“Longji” is a region, not a place to meet. China's Ministry of Culture and Tourism names Dazhai Yao terraces, Ping'an Zhuang terraces, Longji Ancient Zhuang Village and Xiaozhai Red Yao terraces within the scenic area, and Guangxi's register puts the whole area at 70.1 square kilometres. A booking that says only “Longji transfer” does not tell you where the car stops or which terraces you will see.",
        "The drive is not the day. After the road there is an entrance, internal transport where it runs, and an uphill walk to the viewpoints; a late start eats the walking time first.",
        "Your suitcase may not reach the room. Some village stays sit up steps or a path beyond the last point a vehicle can reach. Ask who carries bags, how far, and what happens in rain or after dark.",
        "The colour in the photo is a farming stage, not a timetable. The National Agriculture Museum describes Longji as a living rice-terrace system across 11 administrative villages; water, seedlings, green rice and harvest follow farmers and weather, so a picture from another year promises nothing about your date.",
        "Two areas in one day becomes a race. Crossing from one terrace area to another adds road and walking you cannot see on a map; the second area usually costs you the first.",
        "A same-evening flight or train is the costliest mistake. Mountain roads, weather and the entrance process create cut-offs you do not control; keep Longji away from your last day.",
      ],
    },
    {
      id: "traps-sales",
      type: "paragraph",
      text: "Most of this is solved before you leave Guilin. With a private car and one of our own drivers for the day, you are collected at your Guilin hotel, taken to the terrace area you chose, and the driver waits for your agreed turnaround time and brings you back, or on to your next stop. We can send a car in any city in mainland China; the route, the drop-off point, the waiting time and the total price are written into your quote before you pay, and we reply within 12 hours. Ask for a Longji day car.",
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
        ["Guilin hotel, one free day, light luggage", "Day trip", "One chosen area makes a complete visit with no hotel move", "A poor forecast, slow walking or a late start make a night more useful"],
        ["Photography or landscape is a main reason for the trip", "One night", "A second weather window, and the landscape outside the midday crowd", "A bad mobility match or a hard last mile to the guesthouse"],
        ["Starting and ending in Yangshuo", "Usually rethink the route", "The visit sits between two long road legs, so delays eat the walking time", "A route that does not return to Yangshuo, or an overnight"],
        ["Older parents, young children or limited stair tolerance", "One night, or a deliberately small day trip", "A slow pace and one easy viewpoint matter more than collecting terrace names", "A confirmed low-walking route can make a day trip comfortable"],
        ["Same-evening train, flight or show", "Do not do Longji that day", "Roads, weather and entry create several cut-offs you do not control", "Move the fixed booking or Longji"],
        ["Several large suitcases", "One night only after checking the last mile, or leave bags in Guilin", "Some village stays need steps or a walk after the car stops", "A property that confirms car access and named luggage help"],
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
        "Go through the current entrance or shuttle process, then straight to the one walking loop or set of viewpoints you chose.",
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
        ["How do we get in?", "The current entrance, passport method, ticket and any internal transport", "A screenshot with no date or source"],
        ["How do we get back?", "A named pickup point, the person responsible and a departure cut-off", "“Call us when you finish”"],
      ],
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
        ["A Guilin city hotel", "The cleanest base for a one-area day trip", "Pickup address, exact terrace area and the return margin"],
        ["Guilin airport or station on arrival day", "Usually too fragile for a full visit unless you land early and can cut the plan short safely", "Delays, baggage, entrance cut-off and arriving at a village in the dark"],
        ["Yangshuo", "A longer, more fragile day than from Guilin", "The whole door-to-door route, and whether a night or an onward transfer avoids doubling back"],
        ["Your last days before an international flight", "Keep Longji away from the final deadline", "Sleep near the departure airport on the last night"],
      ],
    },
    {
      id: "season-heading",
      type: "heading",
      level: 2,
      text: "Best time for Longji: read the farming, not a colour calendar",
    },
    {
      id: "season-table",
      type: "table",
      caption: "Enjoy the stage the fields are actually in",
      columns: ["What you find", "What to look for", "What nobody can promise"],
      rows: [
        ["Water-filled plots", "Channels, contours and mountain light on the water", "A perfect mirror or blue sky"],
        ["Growing green rice", "How small fields link to forest and village water", "One “greenest week”"],
        ["Ripening or harvested fields", "Patterns of work; give farmers space", "A fixed golden date or uncut fields"],
        ["Mist, cloud or muted colour", "The villages, paths and the farming system itself", "That another viewpoint will be clear"],
      ],
    },
    {
      id: "weather",
      type: "callout",
      title: "Cloud is the best argument for one night, not a guarantee",
      tone: "decision",
      body: "A night gives you another attempt, but both windows can be cloudy. Set a visibility cut-off, keep one lower-effort village or cultural stop in reserve, and never ask a driver to race wet mountain roads between viewpoints. If an official weather warning or road closure is issued, change the day; do not look for an unofficial way in.",
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
      text: `Our Guilin & Yangshuo 5-day private tour covers the rest of the region: two nights in Guilin and two in Yangshuo, the Li River cruise with your bags moved separately by road, a guided Yulong River countryside day, three English-guided days, private transfers and no shopping stops. Longji is not part of the published route; ask us to add a terrace day or a night and we quote the revised trip in writing before you pay. From ${bodyTourPrice(glTour, 2, "en")} per person for two travellers, ${bodyTourPrice(glTour, 4, "en")} for four or ${bodyTourPrice(glTour, 6, "en")} for six (twin sharing). See the Guilin 5-day route.`,
      link: { label: "See the Guilin 5-day route", href: "/tours/guilin-yangshuo-5-day-private-tour/" },
    },
    {
      id: "cruise-offer",
      type: "paragraph",
      text: `Planning the Li River cruise on your own? It is booked in each passenger's real name, 3-star and 4-star boats leave from different piers, and for National Day 2026 the official notice opened full-route boats 15 days ahead. We can book it for a ${bodyReservationFee("en")} fee per person plus the face-value fare; request and pay at least ${bodyReservationLeadDays} days ahead and the booking is guaranteed, and if it fails, the fee and fare are refunded in full. Book the Li River cruise with us.`,
      link: { label: "Book the Li River cruise with us", href: "/services/china-attraction-reservations/?attraction=li-river-cruise#reservation-enquiry" },
    },
    {
      id: "trust-copy",
      type: "paragraph",
      text: "Send your dates and group on WhatsApp or by email and we reply within 12 hours. For a tour you pay a 30% deposit by Alipay or VBill and the balance on arrival, with no fees added. Our guides and drivers are our own, we are a licensed travel agency (L-BJ10587), and one planner looks after you from the first reply to the last day. Tell us about the whole trip.",
      link: { label: "Tell us about the whole trip", href: "/services/full-trip-support/" },
    },
    {
      id: "faq",
      type: "faq",
      title: "Questions travellers actually ask",
      items: [
        {
          question: "Can I visit Longji from Guilin in one day?",
          answer: "Yes, if you leave early, choose one terrace area and keep the evening free. Plan the entrance, internal transport, walking and the road back, not only the headline drive.",
        },
        {
          question: "What is Longji like at night? Is it worth staying overnight?",
          answer: "The official sources we checked list no night show or lit route. Staying overnight means a village guesthouse with the terraces in the evening and at first light, and a second chance if cloud spoils one of them. It is worth it if you will use those hours and the path to the guesthouse suits your group.",
        },
        {
          question: "How do I get from Guilin to Longji?",
          answer: "By road, to the terrace area you choose; from where the vehicle stops you continue through the entrance and on foot or by internal transport. A private car with a named drop-off and pickup point is the simplest; our own drivers do this from Guilin, quoted in writing before you pay.",
        },
        {
          question: "Can I do it from Yangshuo?",
          answer: "It can be possible, but it is a longer and more fragile day than from Guilin. A night at Longji, or a route that does not return to Yangshuo, is often more sensible.",
        },
        {
          question: "When is the best time to visit Longji?",
          answer: "There is no fixed best week. Longji is a working rice-terrace system, so water, green rice and harvest follow farming and weather each year. Ask what the fields look like now, and keep a weather cut-off.",
        },
        {
          question: "Should I choose Ping'an or Dazhai?",
          answer: "Decide the length of stay, walking tolerance, where the car stops and the guesthouse's last mile first. Neither area is best for everyone.",
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
        "One named terrace area, entrance and Chinese endpoint, not only “Longji”.",
        "A complete route from your real hotel, airport or station, and back or onward.",
        "No hard connection on the evening of a day trip.",
        "A written car, drop-off, walking and luggage plan.",
        "A weather alternative and a cut-off for dropping extra viewpoints.",
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
        { label: "Official Longji overview and named terrace areas", url: "https://www.mct.gov.cn/preview/special/9160/llxl/202009/t20200923_875345.htm", publisher: "Ministry of Culture and Tourism of China", reviewedAt: "2026-08-21" },
        { label: "Official Guangxi 4A scenic-area register", url: "https://wlt.gxzf.gov.cn/ztzl/rdjj/gxajlyjq/t19045600.shtml", publisher: "Guangxi Department of Culture and Tourism", reviewedAt: "2026-08-21" },
        { label: "Longji Rice Terraces agricultural heritage system", url: "https://jgs.agri.gov.cn/detail/zh/16211.html", publisher: "National Agriculture Museum", reviewedAt: "2026-08-21" },
        { label: "Longji living cultivation and conservation", url: "https://dnr.gxzf.gov.cn/xwzx/gnzx/t19768557.shtml", publisher: "Guangxi Department of Natural Resources", reviewedAt: "2026-08-21" },
        { label: "Li River 2026 National Day notice: real-name booking, full-route boats open 15 days ahead", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/264", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-26" },
        { label: "Li River pier and route guide: 3-star and 4-star boats board at different piers", url: "https://www.liriver.com.cn/page/article/zxlj.tzgg/130", publisher: "Guilin Li River Scenic Area", reviewedAt: "2026-09-26" },
        { label: "Hero: Longji rice terraces by Kaur Virunurm, CC0", url: "https://commons.wikimedia.org/wiki/File:Longji_rice_terraces_-_2023_10_11_Kaur_Virunurm.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-21" },
        { label: "Hero licence: CC0 1.0", url: "https://creativecommons.org/publicdomain/zero/1.0/", publisher: "Creative Commons", reviewedAt: "2026-08-21" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
