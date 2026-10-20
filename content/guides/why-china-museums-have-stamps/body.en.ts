import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "This guide is about the ink stamps visitors press into notebooks in Chinese museums, not postage stamps. People collect them because one small action marks a visit, turns objects into a souvenir, gives a route through the galleries and builds a collection to compare. Museums and their shops use them for education, temporary exhibitions and cultural-creative sales. But there is no national system: a stamp may be free, tied to a paid booklet, event-only, run by a shop or simply gone today. And the stamp never gets you in: many of China's biggest museums, including the National Museum, the Shaanxi History Museum and Sanxingdui, need a real-name booking that opens only days ahead, and the stamp hunt starts after that."
    },
    {
      id: "layers-heading",
      type: "heading",
      level: 2,
      text: "Three layers explain the trend"
    },
    {
      id: "layers",
      type: "comparison",
      title: "Three things are going on at once",
      columns: [
        {
          heading: "A familiar visual language",
          body: "Seals, red impressions and seal-carving are recognisable parts of Chinese material and artistic history. A souvenir stamp borrows that look; it is not an official seal or an ancient custom."
        },
        {
          heading: "A museum mechanism",
          body: "A venue can turn architecture, collection objects or exhibition graphics into stamps, then place them along a route, at a service desk, inside a cultural-creative shop or in a machine."
        },
        {
          heading: "A visitor practice",
          body: "Collectors choose paper, seek the points, queue, compare impressions and share the finished page. That can deepen attention—or replace the exhibition if completion becomes the only goal."
        }
      ]
    },
    {
      id: "history-heading",
      type: "heading",
      level: 2,
      text: "Old seals explain the look, not the habit"
    },
    {
      id: "history-body",
      type: "paragraph",
      text: "Shanghai Museum distinguishes two connected histories: seals used mainly as credentials, and seal carving as art. That explains why an inked impression feels recognisable and suits a museum page; it does not prove today's rally descends from an ancient ritual. Museums use stamp passports for a simpler reason: they get people to walk the route and look closely, and some routes do it better than others (a 2026 study of several museums)."
    },
    {
      id: "mechanisms-heading",
      type: "heading",
      level: 2,
      text: "“There are stamps here” can mean six different things"
    },
    {
      id: "mechanism-table",
      type: "table",
      caption: "Find out which one before you queue",
      columns: ["Mechanism", "What to ask", "Typical failure"],
      rows: [
        ["Free visitor stamp", "Is outside paper allowed, and where is the current point?", "The stamp has moved, dried out or is resting for maintenance"],
        ["Paid booklet or card", "Does buying the specified product unlock the stamps?", "A traveller assumes admission includes the booklet"],
        ["Self-service machine", "What paper size, orientation or product does it accept?", "The page does not fit or the machine is offline"],
        ["Gallery route", "Must the points be completed in order or before last entry?", "The final point lies beyond a one-way route"],
        ["Temporary exhibition or event", "What exact dates and participation conditions apply?", "An old social post survives after the stamps are removed"],
        ["Shop or partner counter", "Who operates it and does the counter close before the museum?", "The galleries remain open but the stamp counter does not"]
      ]
    },
    {
      id: "dated-heading",
      type: "heading",
      level: 2,
      text: "Past examples show how much it varies"
    },
    {
      id: "dated-examples",
      type: "table",
      caption: "Examples from past years, not a list of what runs today",
      columns: ["Venue and date", "Documented mechanism", "What it demonstrates"],
      rows: [
        ["Beijing Art Museum, reported 2022", "Six cards matched stamped motifs with objects and architectural details", "A stamp route can redirect attention to the collection"],
        ["Xu Beihong Memorial Museum, April 2024 listing", "Twelve activity stamps were planned, one monthly, in a second-floor area", "Availability can be monthly and event-specific"],
        ["Nanjing Museum, 2022 annual report", "Exhibition-linked stamps and points formed an exhibition-plus-cultural-creative model", "Stamps can sit between interpretation and retail"],
        ["Yiyang Museum, 2024 work reported in 2025", "Nine self-service machines sold creative kits with collection-derived designs", "A machine can be retail, not a free ink pad"],
        ["Jining Museum, September 2024 notice", "The Culture and Tourism Bureau described free stamps based on museum objects and local heritage", "Some institutions clearly label a free mechanism"]
      ]
    },
    {
      id: "dated-warning",
      type: "callout",
      tone: "warning",
      title: "A dated example is evidence of the format, not current availability",
      body: "The examples above were published for earlier exhibitions, work reports or activities. They are included to show how systems differ. None should be used as a 2026 stamp-point map without a fresh notice from the venue. Stamp points, booklets and machines change quickly, so check the museum's own notice for your date."
    },
    {
      id: "first-visit-heading",
      type: "heading",
      level: 2,
      text: "A first museum-stamp visit in nine steps"
    },
    {
      id: "first-visit-steps",
      type: "list",
      ordered: true,
      items: [
        "Book admission, identity-document entry and timed exhibitions first. Stamps do not replace a reservation.",
        "Check the museum's current website or official account for 集章 (stamp collecting), 印章 (stamp), 文创 (cultural-creative products) or 活动 (event).",
        "Ask the service desk: 请问现在有集章活动吗？在哪里？需要购买盖章本吗？ ('Is there a stamp activity now; where is it; must I buy the booklet?').",
        "Confirm whether the point is free, purchase-linked, temporary or inside a shop, and whether your own notebook is accepted.",
        "Use a dedicated notebook, postcard or venue card. Never stamp a passport, residence permit, visa page, ticket barcode or travel document.",
        "Choose two or three objects or rooms you want to understand before you begin collecting.",
        "At each point, read the motif label and find the object, building or exhibition element it represents.",
        "Make one careful impression, close the pad or follow the machine prompt, and move aside before inspecting the result.",
        "Before the final point, check closing time, one-way gallery flow and whether leaving for a shop would end re-entry."
      ]
    },
    {
      id: "paper-callout",
      type: "callout",
      tone: "neutral",
      title: "Carry a small, replaceable paper setup",
      body: "A compact uncoated notebook, practice sheet and clean paper protecting the facing page are enough. Let impressions dry. Do not test on walls, labels, tickets or leaflets unless the venue provides them for that purpose."
    },
    {
      id: "stamp-paper-decision-tree",
      type: "table",
      caption: "Homeground stamp-paper decision tree: protect documents before collecting",
      columns: ["Paper in hand", "First check", "Decision", "Reason"],
      rows: [
        ["Passport, visa, residence card or identity document", "No further check", "Stop—never stamp it", "Ink, damage or an unofficial mark can compromise an important document"],
        ["Ticket with barcode, QR code or required re-entry section", "Ask whether a blank detachable area is designated", "Use only a clearly permitted area; otherwise choose other paper", "The stamp must not block scanning or re-entry"],
        ["Your own notebook or postcard", "Ask whether outside paper is accepted and test page size", "Use one blank page if permitted", "Some machines, routes or pads require venue paper"],
        ["Venue booklet or free card", "Confirm whether purchase, order or date conditions apply", "Use it under the current rules", "A branded booklet may be optional, required or event-only"],
        ["No suitable paper", "Ask for an official blank card or skip the point", "Do not improvise on walls, labels or personal documents", "Completing a set is never worth damaging property or records"],
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Choose your level of collecting"
    },
    {
      id: "scenario-one",
      type: "callout",
      tone: "decision",
      title: "Scenario 1: the exhibition is the priority",
      body: "A first-time visitor has two hours. They select three objects, collect only the stamps attached to those objects, and ignore a long shop queue. The finished page records a coherent visit rather than an incomplete master list. If a stamp is unavailable, they write the object name and date in the space instead."
    },
    {
      id: "scenario-two",
      type: "callout",
      tone: "decision",
      title: "Scenario 2: completing the stamp route is part of the visit",
      body: "A collector checks the current notice, allows extra time, confirms any paid booklet and maps points against the one-way route. Their exit rule: if a queue threatens a reserved exhibition or transport home, collecting stops. Completion is optional; admission and safe departure are not."
    },
    {
      id: "etiquette-heading",
      type: "heading",
      level: 2,
      text: "Queue and object etiquette"
    },
    {
      id: "etiquette-list",
      type: "list",
      ordered: false,
      items: [
        "Prepare the correct page before reaching the front; do not reorganise a large scrapbook at the station.",
        "Take one clean impression unless staff explicitly permit repeats; never re-ink or dismantle museum equipment yourself.",
        "Keep bags, wet pages and elbows away from cases and other visitors.",
        "Do not hold the queue to film several attempts or build a layered composition.",
        "Follow staff instructions when a stamp rests, moves or closes. A social-media map does not override the venue."
      ]
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "When a stamp is missing"
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "A missing stamp need not break the museum visit",
      columns: ["Problem", "Immediate response", "Keep the memory"],
      rows: [
        ["Stamp moved or cannot be found", "Ask the service desk once; do not search staff-only areas", "Write the gallery and object name in the planned space"],
        ["Ink is dry or impression is partial", "Do not press repeatedly or add your own ink", "Keep the imperfect print as the real visit record"],
        ["Machine or shop requires purchase", "Decide on the product, not on sunk queue time", "Skip it if the object is not worth buying"],
        ["Point closes before the galleries", "Protect admission, transport and exit time", "Add date and a short observation instead"],
        ["Queue becomes the visit", "Pause collecting and return to the next chosen object", "Finish with fewer stamps and more notes"]
      ]
    },
    {
      id: "final-check",
      type: "list",
      ordered: false,
      items: [
        "Admission and identity-document rules are confirmed independently of stamp access.",
        "The stamp information comes from the current museum or operator, with a date.",
        "You know whether each point is free, paid, temporary, in a shop or a machine.",
        "The notebook is separate from every travel and identity document.",
        "At least one collection object—not only the stamp page—will be remembered."
      ]
    },
    {
      id: "booking-first-heading",
      type: "heading",
      level: 2,
      text: "The stamp is free; the museum booking is not optional",
    },
    {
      id: "booking-first-copy",
      type: "paragraph",
      text: "The stamp hunt only starts once you are inside, and getting inside is the hard part. On 7 July 2025 the National Museum of China's booking system showed every day for the next seven days fully booked, and people without a booking were told to turn back at the entrance (The Paper). The Shaanxi History Museum reported more than 600,000 booking attempts a day for about 12,000 places in 2023. On the first day of National Day 2025, tickets were gone at Sanxingdui Museum (Yicai). No stamp point lets you in without the booking, so secure the museum first and treat the stamps as the reward.",
    },
    {
      id: "booking-first-products",
      type: "table",
      caption: "What we can take off your hands",
      columns: ["Service", "What you get", "Price"],
      rows: [
        ["Museum bookings", "The National Museum of China, the Shaanxi History Museum, Sanxingdui, the Shanghai Museum's bookable areas and other sights on our list, each booked in every traveller's passport name", "USD 7 per person per attraction, plus any ticket at face value; guaranteed when you request and pay 8 or more days ahead, or a full refund"],
        ["Private guide", "A licensed English-speaking guide for up to 8 hours in Beijing, Shanghai or Xi'an, who keeps the galleries first and the day to time", "From CNY 900 per guide per day in Xi'an and CNY 1,200 in Beijing and Shanghai (higher in peak season)"],
        ["Xi'an & the Terracotta Warriors: 5-day private tour", "4 nights in a Ctrip 4-Diamond Xi'an hotel with breakfast, transfers, an English-speaking guide and private car on the touring days, and listed adult tickets including the Terracotta Warriors", "From USD 440 per person for 6 travellers (USD 598 for 2)"],
        ["Chengdu, Pandas & Sanxingdui: 5-day private tour", "The panda base, Sanxingdui Museum and Dujiangyan with a guide, private car and listed tickets", "From USD 730 per person for 6 travellers (USD 949 for 2)"],
      ],
      rowLinks: [
        "/services/china-attraction-reservations/#reservation-enquiry",
        "/services/private-english-speaking-guides/",
        "/tours/xian-terracotta-warriors-5-day-private-tour/",
        "/tours/chengdu-pandas-sanxingdui-5-day-private-tour/",
      ],
    },
    {
      id: "how-to-book",
      type: "callout",
      title: "How to book with us",
      body: "Send your dates, the museums you want and your group size from our booking form, which opens WhatsApp or your email with the details filled in. No passport number is needed to ask. A planner replies within 12 hours, you get a written quote before you pay, and nothing is charged until you accept it. Tours are secured with a 30% deposit by Alipay or VBill, with no added card fees, and the balance is paid when you arrive. We are a licensed travel agency (licence L-BJ10587); our guides and drivers are our own, and there are no shopping stops.",
      tone: "neutral",
    },
    {
      id: "faq",
      type: "faq",
      title: "Questions visitors ask about museum stamps",
      items: [
        {
          question: "Do I need to book the museum to collect its stamps?",
          answer: "Usually, yes. The stamp points are inside the museum, and many of China's major museums need a real-name booking before you arrive, often opened only days ahead: the National Museum of China releases places at 17:00 China time seven days before, and on 7 July 2025 the next seven days were all fully booked. Book the museum first.",
        },
        {
          question: "Are museum stamps in China free?",
          answer: "It depends on the venue, because there is no national system. A stamp may be free, tied to a paid booklet, event-only, shop-operated or paused today. Some institutions label a free mechanism clearly, while a self-service machine can be a retail terminal rather than a free ink pad. Check the venue's current notice before making collecting a mission.",
        },
        {
          question: "I saw a stamp point in a post from last year — will it still be there?",
          answer: "Treat it as evidence that a mechanism existed, not that it runs today. The documented cases come from past exhibitions, work reports and event notices, and without a new notice from the venue they are not a 2026 stamp map. A temporary or exhibition stamp can be withdrawn while the old social post stays online.",
        },
        {
          question: "Can I stamp my passport or my entry ticket?",
          answer: "Never stamp a passport, visa, residence card or identity document — ink, damage or an unofficial mark can create problems on an important document. For a ticket with a barcode, QR code or re-entry section, ask first whether a blank detachable area is designated, and use only a clearly permitted area, because the stamp must not block scanning or re-entry.",
        },
        {
          question: "How do I ask where the stamps are?",
          answer: "At the service desk, ask 请问现在有集章活动吗？在哪里？需要购买盖章本吗？ — “Is there a stamp activity now; where is it; must I buy the booklet?” Before the visit, search the museum's current website or official account for 集章, 印章, 文创 or 活动. Then confirm whether the point is free, purchase-linked, temporary or inside a shop, and whether your own notebook is accepted.",
        },
        {
          question: "Is stamp collecting an ancient Chinese tradition?",
          answer: "No. Shanghai Museum separates seals used mainly as credentials from seal carving as an art form, which explains why an inked impression feels culturally familiar and suits a museum page. It does not prove that today's stamp rally descends from an ancient ritual. A 2026 cross-case study instead describes stamp passports as low-tech tools for movement, attention and motivation.",
        },
        {
          question: "The stamp has moved or the ink is dry — what should I do?",
          answer: "Ask the service desk once and do not search staff-only areas, and do not press repeatedly or add your own ink. Keep the imperfect print as the real record of the visit, or write the gallery and object name in the space you left for it. If the queue starts to replace the visit, pause collecting and go back to the next object you chose.",
        },
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Plan the museum visit around the collection",
      items: [
        {"label": "Book and route the National Museum of China", "href": "/guides/national-museum-of-china-booking-and-route/", "description": "Protect admission and choose a focused collection route before optional activities."},
        {"label": "Plan Shaanxi History Museum by collection", "href": "/guides/shaanxi-history-museum-booking-and-collection-plan/", "description": "Use the passport booking and gallery plan for the actual visit."},
        {"label": "Choose a Sanxingdui gallery order", "href": "/guides/sanxingdui-museum-booking-and-gallery-order/", "description": "Make the galleries—not a completion task—the backbone of the day."},
        {"label": "Sequence Liangzhu Museum and the Ruins Park", "href": "/guides/liangzhu-ruins-park-and-museum-sequence/", "description": "Connect objects with an archaeological landscape through a verified route."}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and independent sources reviewed",
      items: [
        { label: "The Paper: National Museum of China fully booked for seven days (7 July 2025)", url: "https://m.thepaper.cn/newsDetail_forward_31119054", publisher: "The Paper", reviewedAt: "2026-10-20" },
        { label: "Huashang Bao (via The Paper): Shaanxi History Museum, 600,000 daily booking attempts (4 August 2023)", url: "https://m.thepaper.cn/newsDetail_forward_24110428", publisher: "The Paper", reviewedAt: "2026-10-20" },
        { label: "Yicai: tickets gone at the Palace Museum, Jiuzhaigou and Sanxingdui Museum on 1 October 2025", url: "https://www.yicai.com/news/102851899.html", publisher: "Yicai", reviewedAt: "2026-10-20" },
        {"label": "Stamp-collecting trend in Beijing museums", "url": "https://www.beijing.gov.cn/renwen/sy/whkb/202211/t20221101_2849254.html", "publisher": "Beijing Daily via Beijing Municipal Government", "reviewedAt": "2026-08-13"},
        {"label": "April 2024 Beijing museum education activities, including Xu Beihong Memorial Museum stamps", "url": "https://wwj.beijing.gov.cn/", "publisher": "Beijing Municipal Cultural Heritage Bureau", "reviewedAt": "2026-08-13"},
        {"label": "Nanjing Museum 2022 annual report", "url": "https://www.njmuseum.com/files/nb/news/files/2023/02/13/89d976f1cd9fff8638ea34ef842df434.pdf", "publisher": "Nanjing Museum", "reviewedAt": "2026-08-13"},
        {"label": "Jining Museum stamp notice", "url": "https://www.jining.gov.cn/art/2024/9/25/art_65757_2895180.html", "publisher": "Jining Municipal Culture and Tourism Bureau", "reviewedAt": "2026-08-13"},
        {"label": "Yiyang Museum 2024 work and self-service stamp machines", "url": "https://www.yiyang.gov.cn/wlgt/uploadfiles/202505/2025050610251159177.pdf", "publisher": "Yiyang Municipal Culture, Tourism, Radio, Television and Sports Bureau", "reviewedAt": "2026-08-13"},
        {"label": "Chinese Seal and Seal Carving Gallery", "url": "https://www.shanghaimuseum.net/mu/frontend/pg/m/article/id/RI00004032", "publisher": "Shanghai Museum", "reviewedAt": "2026-08-13"},
        {"label": "Stamp-Based Gamification as Low-Tech Immersive Media in Museums", "url": "https://www.jimmux.com/index.php/imue/article/view/10", "publisher": "Immersive Media and User Experience", "reviewedAt": "2026-08-13"},
        {"label": "Study of museum stamp collecting and memory-making among young visitors", "url": "https://pdf.hanspub.org/ass20241312_472398137.pdf", "publisher": "Advances in Social Sciences", "reviewedAt": "2026-08-13"}
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
