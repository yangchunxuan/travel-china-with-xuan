import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "A Chinese ‘15-minute neighbourhood’ is a planning idea, not a promise that everyone can reach every need in 15 minutes. One framework concentrates everyday commerce near residents; a broader community-life-circle framework includes education, health, care, culture, parks and employment. Use it to understand urban life, but test the real route, hours and public access. This is where people live—not an attraction or proof of one national model."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "What should a visitor expect?",
      body: "Expect overlapping layers rather than a branded district: shops and markets, repair and delivery services, public space, and sometimes care facilities. Some serve anyone; others serve registered residents, children, older people or appointment holders. ‘15 minutes’ is an approximate radius for an assumed pedestrian. Gates, crossings, hills, mobility needs and schedules can make your usable circle smaller or different.",
      tone: "decision"
    },
    {
      id: "terms-heading",
      type: "heading",
      level: 2,
      text: "Two related ideas sit behind the English label"
    },
    {
      id: "terms",
      type: "comparison",
      title: "Do not flatten the Chinese terms into one programme",
      columns: [
        {
          heading: "城市一刻钟便民生活圈",
          body: "The Ministry of Commerce describes this as a community-based commerce and service cluster within roughly a 15-minute walk. Its guide covers groceries, markets, repair and deliveries, plus elder care, childcare and leisure."
        },
        {
          heading: "15分钟社区生活圈",
          body: "This broader spatial-planning approach can include education, culture, health, care, recreation, employment and public space. Shanghai uses five dimensions: liveability, work, recreation, learning and care. It is more than a retail catchment."
        },
        {
          heading: "A local implementation",
          body: "A district may publish a map, renew a market, reuse a building or add a service after resident consultation. Names, boundaries and digital tools are local choices; one Shanghai community map is not a national directory or access pass."
        }
      ]
    },
    {
      id: "framework-heading",
      type: "heading",
      level: 2,
      text: "The policy is a construction process, not a finished nationwide condition"
    },
    {
      id: "framework",
      type: "paragraph",
      text: "National plans use pilots, assessment and staged expansion. The 2023 plan addressed eligible prefecture-level cities and called for ‘one circle, one policy.’ A July 2026 notice still placed pilot batches at different stages and set 10,000 circles during 2026 as a target—not an achieved count. It favoured gradual improvements over one-size-fits-all redevelopment."
    },
    {
      id: "layers",
      type: "table",
      caption: "Read what each service layer does before judging the neighbourhood",
      columns: ["Layer", "What you may see", "What it does not prove"],
      rows: [
        ["Daily essentials", "Convenience shops, fresh-food markets, pharmacies or breakfast counters", "That every product, language or payment method suits a visitor"],
        ["Maintenance and logistics", "Repair stalls, laundry, household services, courier stations", "That staff accept walk-ins or can handle overseas parcels"],
        ["Care and support", "Senior dining, childcare, health or community-service points", "That a tourist can enter, use a subsidy or book care"],
        ["Public life", "Parks, paths, seating, libraries or cultural rooms", "That every room beyond the public frontage is unrestricted"],
        ["Participation and digital tools", "Noticeboards, resident consultation, local maps or mini-programs", "That the tool works with a foreign phone number or in English"]
      ]
    },
    {
      id: "reality-heading",
      type: "heading",
      level: 2,
      text: "Planning goal and lived reality can diverge"
    },
    {
      id: "reality",
      type: "callout",
      title: "A circle on a map is not your walking result",
      body: "Research finds access differences between central and suburban areas, cities and population groups. Facility supply can also miss age-specific needs. These studies show patterns; they do not certify a street or one traveller's reach. For a wheelchair user, older parent or young child, measure the continuous usable route and that person's time.",
      tone: "warning"
    },
    {
      id: "cases-heading",
      type: "heading",
      level: 2,
      text: "Three local cases show why there is no single visual formula"
    },
    {
      id: "cases",
      type: "table",
      caption: "Use named cases as examples, not national templates",
      columns: ["Case", "Planning approach", "Lesson for a visitor"],
      rows: [
        ["Caoyang, Shanghai", "A mature neighbourhood combines public-space renewal, age-group services and a local digital map", "The map can orient a walk, but current access and app requirements still need checking"],
        ["Minzhu Village, Chongqing", "An older neighbourhood used micro-renovation to combine a market, repairs, dining, reading and health-related spaces", "Topography and crossings can matter as much as the list of facilities"],
        ["Wenhua Community, Xiong'an", "A newer community was planned with education, health, culture, care and daily commerce", "A purpose-planned district and a retrofitted old district should not be judged by the same visual expectations"]
      ]
    },
    {
      id: "walk-heading",
      type: "heading",
      level: 2,
      text: "How to test one real route"
    },
    {
      id: "walk",
      type: "list",
      ordered: true,
      items: [
        "Choose a public anchor such as a metro exit, public park, ordinary street or market entrance. Do not begin by trying to enter a residents' compound.",
        "Identify three needs—not photo stops: perhaps fresh food, repair or delivery, and a place to sit. Trace connections rather than collecting façades.",
        "Map the actual path: legal crossings, gates, gradients, kerbs, stairs, lifts, shade and rest points—not a straight radius.",
        "Check each sign and current hours. A map pin or old article does not establish an unchanged operator, entrance or service window.",
        "Separate public streets, parks and shops from resident rooms, schools, clinics and care facilities. Ask before entering and accept refusal immediately.",
        "Photograph buildings or public signs only where permitted. Avoid identifiable residents, especially children and care recipients, and never capture lists, access cards or health details.",
        "Stop when ordinary observation answers the question. Do not follow residents through a gate or turn daily routines into a performance."
      ]
    },
    {
      id: "access-heading",
      type: "heading",
      level: 2,
      text: "Publicly visible does not always mean publicly usable"
    },
    {
      id: "access",
      type: "table",
      caption: "A practical access test",
      columns: ["What you encounter", "Default approach", "Verification question"],
      rows: [
        ["Street shop or public market", "Use it as an ordinary customer if open", "Are this entrance and payment method available?"],
        ["Public park or signed public path", "Stay on the open route and follow posted rules", "Are any gates, sections or hours restricted?"],
        ["Community canteen", "Do not assume public access or visitor discounts", "Can a non-resident eat here at the ordinary price?"],
        ["Community centre, clinic or service desk", "Ask at reception", "Is this public, appointment-based or resident-only?"],
        ["School, childcare, elder-care or residential interior", "Treat it as private or controlled unless expressly invited", "Do not seek entry merely to observe or photograph"]
      ]
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "The traveller changes the circle"
    },
    {
      id: "scenarios",
      type: "comparison",
      title: "Let the traveller and route change the conclusion",
      columns: [
        {
          heading: "A solo visitor in Caoyang",
          body: "They start at public transport, use the local map only for orientation, and connect a park, market frontage and street services. A community room excludes non-residents, so they remain in public space. The network is still legible without entering every facility."
        },
        {
          heading: "A wheelchair user with an older parent in Chongqing",
          body: "A market and service centre look close, but a steep segment, kerb and inconvenient crossing break the route. They verify a shorter step-free public section and keep an ordinary shop as fallback. Their usable circle is smaller than the planning graphic—the correct practical conclusion."
        }
      ]
    },
    {
      id: "conditions-heading",
      type: "heading",
      level: 2,
      text: "Conditions that change the answer"
    },
    {
      id: "conditions",
      type: "list",
      items: [
        "Topography, large roads, walls and limited crossings can turn a short straight-line distance into a long route.",
        "Walking speed, wheelchair routing, rest needs or a child change both time and usable entrances.",
        "Morning markets, meal services, clinics and community rooms may operate only in narrow windows.",
        "A service can be publicly funded yet reserved for eligible residents or delivered by appointment.",
        "Local apps may require a Chinese number, real-name account or language ability; they are evidence, not the neighbourhood itself.",
        "Construction, operator changes and newly gated paths can make a recently published local map inaccurate."
      ]
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "When the planned walk or facility does not work"
    },
    {
      id: "failure",
      type: "table",
      caption: "Recover without pressuring residents or staff",
      columns: ["Failure", "Useful response", "Avoid"],
      rows: [
        ["Facility is closed or has moved", "Check the dated notice, then use an open public shop, park or market nearby", "Treating an old map as a promise"],
        ["Reception says residents only", "Thank staff and leave; observe only the public frontage", "Arguing that a government-supported facility must admit tourists"],
        ["App cannot register your phone", "Use street signs, an official web page or ask a simple question in person", "Borrowing someone's identity or account"],
        ["The route is not step-free", "Backtrack to the last safe crossing and choose a shorter verified segment", "Using traffic lanes or unsafe kerbs to preserve the 15-minute claim"],
        ["Photography makes people uncomfortable", "Put the camera away and continue without images", "Framing residents as scenery or evidence of a social category"]
      ]
    },
    {
      id: "verify-heading",
      type: "heading",
      level: 2,
      text: "Verification checklist for one real walk"
    },
    {
      id: "verify",
      type: "list",
      items: [
        "Name the exact community and city; do not caption a generic street as a designated life circle.",
        "Record the official planning or local map source and its publication date.",
        "Check the actual public starting point, legal crossings and continuous route.",
        "Confirm current hours and operator for any facility central to the walk.",
        "Ask whether entry is public, resident-only, age-limited or appointment-based.",
        "Test step-free access and rest needs for the specific traveller rather than an assumed pedestrian.",
        "Use only images with traceable place, creator, licence and privacy clearance.",
        "Recheck access, apps, construction and opening information near the visit. Facts here were reviewed on 13 August 2026."
      ]
    },
    {
      id: "scope",
      type: "callout",
      title: "What this guide does—and does not—claim",
      body: "This guide explains planning vocabulary and a respectful field method. It does not certify a neighbourhood, measure your walking time, grant entry to resident facilities or rank communities. The recommended community-life-circle industry guide is distinct from a proposed future national standard; recheck the standards platform before calling the latter effective.",
      tone: "neutral"
    },
    {
      id: "links",
      type: "internal-links",
      title: "Connect the neighbourhood walk to practical planning",
      items: [
        {
          label: "Check whether a community canteen is actually public",
          href: "/guides/china-community-canteens-explained/",
          description: "Apply a property-level access, ordinary-price and meal-card check to one service inside the wider neighbourhood network."
        },
        {
          label: "Verify a wheelchair-accessible China route",
          href: "/guides/wheelchair-accessible-china-route-planning/",
          description: "Replace a nominal radius with a continuous, traveller-specific access chain."
        },
        {
          label: "Plan a China itinerary with young children",
          href: "/guides/china-itinerary-with-young-children/",
          description: "Adjust walking, rest and service assumptions for a family day."
        },
        {
          label: "Confirm a shifted map pin in China",
          href: "/guides/china-map-coordinate-offset-explained/",
          description: "Cross-check the exact entrance instead of trusting one imported map marker."
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and academic sources checked on 13 August 2026",
      items: [
        {
          label: "Urban quarter-hour convenient-living-circle construction guide",
          url: "https://www.mofcom.gov.cn/zwgk/gztz/art/2021/art_04807f8fe711403485c7d962a83a1172.html",
          publisher: "Ministry of Commerce of the People's Republic of China",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Three-year action plan for convenient-living circles",
          url: "https://www.mofcom.gov.cn/ghjh/art/2023/art_a1495044fd694f0c920f1430b4dca1de.html",
          publisher: "Ministry of Commerce of the People's Republic of China",
          reviewedAt: "2026-08-13"
        },
        {
          label: "2026 construction and pilot-work notice",
          url: "https://www.mofcom.gov.cn/zwgk/gztz/art/2026/art_ad0a1e1608be4bcd8ebf6e76ed8dbfbe.html",
          publisher: "Ministry of Commerce of the People's Republic of China",
          reviewedAt: "2026-08-13"
        },
        {
          label: "TD/T 1062-2021 Community Life Circle Planning Technical Guide announcement",
          url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/qtwj/202204/t20220407_2668427.html",
          publisher: "Beijing Municipal People's Government / Ministry of Natural Resources",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Shanghai 15-minute community life-circle action guide",
          url: "https://ghzyj.sh.gov.cn/nw2431/20230606/2a4788a79cd447a0af84a14a7642ebf0.html",
          publisher: "Shanghai Municipal Bureau of Planning and Natural Resources",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Caoyang community life-circle map",
          url: "https://ghzyj.sh.gov.cn/nw2448/20230823/bdd2c719962f4547924f404d9a93b824.html",
          publisher: "Shanghai Municipal Bureau of Planning and Natural Resources",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Caoyang community renewal case",
          url: "https://ghzyj.sh.gov.cn/pt/20260306/f392035387c04945bbe2886d4126d2cd.html",
          publisher: "Shanghai Municipal Bureau of Planning and Natural Resources",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Minzhu Village convenient-living-circle renewal case",
          url: "https://ltfzs.mofcom.gov.cn/jyjl/art/2024/art_290d7db13cc54dd794f2b48ed5cda1fe.html",
          publisher: "Ministry of Commerce of the People's Republic of China",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Wenhua Community service-network case",
          url: "https://www.xiongan.gov.cn/20260404/852e71ea182f4f3db753c69e3da97821/c.html",
          publisher: "Xiong'an New Area Administrative Committee",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Service-level disparities across four Chinese megacities",
          url: "https://www.nature.com/articles/s41599-023-01812-w",
          publisher: "Humanities and Social Sciences Communications",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Social inequalities in Shanghai 15-minute walkability",
          url: "https://doi.org/10.1016/j.jth.2019.05.005",
          publisher: "Journal of Transport & Health",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Proposed national standard plan for urban and rural community life circles",
          url: "https://std.samr.gov.cn/gb/search/gbDetailed?id=3E68E420F12A352EE06397BE0A0ACBAE",
          publisher: "National Standards Information Public Service Platform",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Hero image: Shenzhen OCT community center by LaouZEI bOENFUOO, CC0; cropped and resized",
          url: "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%8D%97%E5%B1%B1%E5%8D%80_Nanshan_%E6%B7%B1%E5%8D%97%E5%A4%A7%E9%81%93_Shennan_Blvd_OCT_community_center_July_2024_R12S_01.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-13"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
