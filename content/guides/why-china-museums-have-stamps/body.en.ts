import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "This guide is about visitor ink and rubber stamps in Chinese museums—not postage stamps or philately. People collect these stamps because one physical action can mark a visit, turn objects into a souvenir, create a gallery route and produce a collection to compare. Museums and shops also use them for education, temporary exhibitions and cultural-creative retail. But there is no national system. A stamp may be free, tied to a paid booklet, event-only, shop-operated or unavailable today. Check the venue before making it a mission."
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
      title: "Culture, institution and visitor action are related—but not identical",
      columns: [
        {
          heading: "A familiar visual language",
          body: "Seals, red impressions and seal-carving are recognisable parts of Chinese material and artistic history. A souvenir stamp can borrow that familiarity without becoming an official seal or unbroken ancient custom."
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
      text: "The historical connection is real; the origin story should stay modest"
    },
    {
      id: "history-body",
      type: "paragraph",
      text: "Shanghai Museum distinguishes two connected histories: seals used mainly as credentials, and seal carving as art. That explains why an inked impression feels recognisable and suits a museum page; it does not prove today's rally descends from an ancient ritual. A 2026 cross-case study instead describes stamp passports as low-tech tools for movement, attention and motivation, with effects varying by museum and route."
    },
    {
      id: "mechanisms-heading",
      type: "heading",
      level: 2,
      text: "“There are stamps” can describe six different arrangements"
    },
    {
      id: "mechanism-table",
      type: "table",
      caption: "Confirm the operating mechanism before joining the queue",
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
      text: "Dated examples show why the details cannot be frozen"
    },
    {
      id: "dated-examples",
      type: "table",
      caption: "Documented examples, not a list of services promised for August 2026",
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
      body: "The examples above were published for earlier exhibitions, work reports or activities. They are included to show how systems differ. None should be used as a 2026 stamp-point map without a fresh notice from the venue."
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
      text: "Failure recovery without chasing every impression"
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
        "Free, paid, temporary, shop-operated and machine-based points are not conflated.",
        "The notebook is separate from every travel and identity document.",
        "At least one collection object—not only the stamp page—will be remembered."
      ]
    },
    {
      id: "dynamic-boundary",
      type: "callout",
      tone: "warning",
      title: "Dynamic facts reviewed 13 August 2026",
      body: "Stamp designs, locations, fees, booklets, machines, exhibition dates, shop hours and participation rules change quickly and may not appear on an English page. This guide therefore explains mechanisms and verification, not a permanent stamp map or a promise that any museum has stamps today."
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "What this guide does not claim",
      body: "It does not rank museums by stamps, treat collecting as an ancient rite, guarantee availability or tell visitors to alter official documents. It treats stamp collecting as an optional visitor practice that should support, not displace, the museum collection."
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
        {"label": "Stamp-collecting trend in Beijing museums", "url": "https://www.beijing.gov.cn/renwen/sy/whkb/202211/t20221101_2849254.html", "publisher": "Beijing Daily via Beijing Municipal Government", "reviewedAt": "2026-08-13"},
        {"label": "April 2024 Beijing museum education activities, including Xu Beihong Memorial Museum stamps", "url": "https://wwj.beijing.gov.cn/bjww/wwjzz/wwjapp/zzbsy/zxhd/436421368/index.html", "publisher": "Beijing Municipal Cultural Heritage Bureau", "reviewedAt": "2026-08-13"},
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
