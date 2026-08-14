import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Do not assume every Chinese community canteen admits foreign travellers—or infer a nationwide ban. China has no single visitor-access, price or discount rule for this label. Some venues serve the public at ordinary prices while prioritising eligible older residents; others are senior meal halls, collection points or resident facilities. Identify the venue, ask whether non-residents may eat, and pay the ordinary price if admitted. A social service is not a cheap-food attraction."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "The safe decision rule",
      body: "Treat the sign as a clue, not permission. Confirm who may enter; any local ID or meal card; ordinary price and payment; today's meal window and remaining food; and whether the route and menu work for your party. If service is limited, thank staff and use a normal restaurant or prepared-food counter.",
      tone: "decision"
    },
    {
      id: "names-heading",
      type: "heading",
      level: 2,
      text: "Decode the name before asking to eat"
    },
    {
      id: "names",
      type: "table",
      caption: "Similar signs can describe different service models",
      columns: ["Name you may see", "Likely function", "Do not assume"],
      rows: [
        ["社区食堂 — community canteen", "Community-oriented dining; some local policies encourage public access", "That every venue admits non-residents or uses one price"],
        ["社区长者食堂 / 老年食堂 — senior canteen", "A service designed primarily for older people", "That a visiting older person receives local discounts"],
        ["长者饭堂 — elder dining hall", "A Guangzhou term for locally defined senior meal services", "That its age, residence and eligibility rules apply elsewhere"],
        ["助餐点 / 助餐服务点 — meal-assistance point", "A collection, reheating, serving or delivery node", "That it has public seats or accepts walk-ins"],
        ["食堂 — canteen/cafeteria", "A generic word also used by workplaces, universities and institutions", "That the public may enter merely because the sign says 食堂"]
      ]
    },
    {
      id: "national-heading",
      type: "heading",
      level: 2,
      text: "The national framework leaves key decisions local"
    },
    {
      id: "national",
      type: "paragraph",
      text: "The national older-adult meal-service plan supports dining halls, meal points, community or care facilities, restaurants, work-unit canteens, central kitchens and delivery. Local governments define support scope, method and standards; operators carry food-safety and information duties. The plan creates no single public-admission rule, visitor discount or menu. Local policy and current property operation control the answer."
    },
    {
      id: "local-heading",
      type: "heading",
      level: 2,
      text: "Local examples prove variety, not a national rule"
    },
    {
      id: "local",
      type: "table",
      caption: "Read each policy only within its jurisdiction and date",
      columns: ["Example", "What the official source says", "Editorial limit"],
      rows: [
        ["Hangzhou", "Guidance encourages senior canteens to develop into community canteens that prioritise older people while opening to all citizens, with differentiated charges", "A Hangzhou policy does not open every Chinese canteen"],
        ["Guangzhou", "Rules define 长者饭堂 around services for resident older adults and allow several facility and partnership forms", "Its name and eligibility model are local"],
        ["Shanghai", "The city uses community canteens, restaurants, central kitchens and delivery within its older-meal network", "Network membership does not itself establish tourist access"],
        ["Beijing", "A work guide standardises community restaurants within subdistrict and township elder-service centres", "This is another local facility type, not a nationwide category"],
        ["Named Shanghai cases", "A 2026 official report documents foreign diners at named canteens; another described Wannan Senior Community Canteen as public-facing", "These dated cases show that some venues receive outsiders, not that all do"]
      ]
    },
    {
      id: "models-heading",
      type: "heading",
      level: 2,
      text: "A dining room can sit on top of different operating systems"
    },
    {
      id: "models",
      type: "comparison",
      title: "The kitchen, operator and subsidy may be separate",
      columns: [
        {
          heading: "Cooked on site",
          body: "The venue has a kitchen and seats. Public authorities may provide premises or support while a social or commercial operator runs meals. Public access still depends on local and property rules."
        },
        {
          heading: "Central kitchen plus service point",
          body: "Food may arrive for reheating, collection or delivery. The point may have few seats and a narrow window; a map marker does not make it a restaurant."
        },
        {
          heading: "Partner restaurant or institution",
          body: "A restaurant, care facility, university or work-unit canteen may reserve service for eligible older residents while retaining wider access controls."
        }
      ]
    },
    {
      id: "verify-heading",
      type: "heading",
      level: 2,
      text: "Verify the property, not the category"
    },
    {
      id: "verify",
      type: "list",
      ordered: true,
      items: [
        "Match the Chinese name, address, entrance and operator. Another branch's map result does not answer access here.",
        "Ask whether non-community residents may dine in today. If yes, ask whether there is a separate ordinary price.",
        "Ask whether entry requires local ID, resident or age verification, a meal card or booking. Never borrow another person's identity.",
        "Confirm the meal window and whether food remains. A canteen may stop serving when the prepared allocation sells out, before the building closes.",
        "Check payment at this counter: cash, a foreign-linked mobile wallet, bank card or another method. Do not infer nationwide payment support from one city's guidance.",
        "Trace street-to-seat access: kerb, ramp, door, lift, queue, tray carrying, seat and toilet. A nearby pin is not a usable route.",
        "For allergies or dietary requirements, ask about the exact dish, ingredients and shared cooking. If staff cannot confirm, choose another meal.",
        "Ask before photographing signage or interiors. Do not capture diners, meal cards, resident information, payment screens or order records."
      ]
    },
    {
      id: "canteen-five-gate-card",
      type: "table",
      caption: "Homeground five-gate card: every row must be confirmed for the exact canteen",
      columns: ["Gate", "Ask or observe", "Record", "If unconfirmed"],
      rows: [
        ["Public access", "Can a non-resident or visitor eat here today?", "Yes, no, or a named eligibility condition", "Use an ordinary public restaurant"],
        ["Ordinary price", "Which price applies without age, residence or benefit status?", "Exact dish/meal and current ordinary price", "Do not budget from the subsidised price"],
        ["Card and payment", "Is a meal card, app, cash or mobile payment required?", "A method your group can actually use", "Keep cash/card/payment fallback"],
        ["Meal window and stock", "When does public service begin, and can dishes sell out?", "Date, meal period and latest useful arrival", "Move the meal earlier or choose backup"],
        ["Diet and access", "Can the venue explain ingredients, seating, toilet and step-free route?", "Confirmed needs and unresolved risks", "Do not rely on the venue for this meal"],
      ],
    },
    {
      id: "food-boundary",
      type: "callout",
      title: "Food-safety oversight is not an allergy guarantee",
      body: "Official documents assign operators food-safety, inspection and information duties. That does not prove every dish suits an allergy, halal or vegetarian diet, texture need or medical restriction. Menus may be incomplete or change daily. When consequences are serious, use a provider that can answer ingredient and cross-contact questions.",
      tone: "warning"
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two visitors, two valid decisions"
    },
    {
      id: "scenarios",
      type: "comparison",
      title: "Access and suitability are separate checks",
      columns: [
        {
          heading: "Solo traveller sees a Hangzhou community canteen",
          body: "City guidance supports public-facing canteens, but the traveller asks whether this venue admits non-residents at ordinary price. Staff require a local meal card, so the traveller uses a public restaurant. Local policy was context, not permission."
        },
        {
          heading: "Traveller brings an older parent in Shanghai",
          body: "They confirm public access, step-free entry, seating and an identifiable soft dish. They claim no resident discount and pay ordinary price. If texture or ingredients remain uncertain, they use their checked backup despite admission."
        }
      ]
    },
    {
      id: "phrases-heading",
      type: "heading",
      level: 2,
      text: "Four questions that keep the conversation clear"
    },
    {
      id: "phrases",
      type: "table",
      caption: "Show the Chinese text if spoken communication is difficult",
      columns: ["Chinese", "Meaning", "Decision it answers"],
      rows: [
        ["您好，请问这里对非本社区居民开放吗？", "Hello, is this open to people who do not live in this community?", "Public access"],
        ["我不享受居民或老年优惠，按普通价格可以吗？", "I do not qualify for resident or senior discounts. May I pay the ordinary price?", "Price and eligibility"],
        ["需要本地证件或饭卡吗？", "Do I need local identification or a meal card?", "Documents and card"],
        ["今天几点停止供餐？现在还有餐吗？", "When does meal service stop today, and is food still available?", "Meal window and sold-out risk"]
      ]
    },
    {
      id: "payment",
      type: "callout",
      title: "Pay as an ordinary customer",
      body: "A subsidy or discount normally follows a locally eligible person or service arrangement; it is not automatically attached to every plate. If a venue admits you, ask for the ordinary charge and pay through a method the property confirms. Do not pressure staff to apply an older resident's entitlement, and do not photograph another person's card to reproduce it.",
      tone: "neutral"
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "When the meal does not work"
    },
    {
      id: "failure",
      type: "table",
      caption: "Leave without turning a service limit into a confrontation",
      columns: ["Problem", "Recovery", "Do not"],
      rows: [
        ["Residents or eligible seniors only", "Thank staff and choose a normal public restaurant", "Argue that a community service owes tourists admission"],
        ["Meal card or local ID required", "Ask whether ordinary-price walk-in purchase exists; otherwise leave", "Borrow an identity or demand a discount"],
        ["Food sold out or service ended", "Use a previously checked restaurant or supermarket prepared-food counter", "Treat posted building hours as a meal guarantee"],
        ["Payment method fails", "Ask whether cash or another accepted method is possible", "Repeat payment without checking the first transaction"],
        ["No step-free route or usable seat", "Use the accessible backup and record the barrier for your own planning", "Ask diners to carry a mobility device through an unsafe route"],
        ["Ingredients cannot be confirmed", "Choose a provider able to answer the dietary question", "Assume a simple-looking dish is safe"]
      ]
    },
    {
      id: "meaning-heading",
      type: "heading",
      level: 2,
      text: "Why community canteens matter beyond one meal"
    },
    {
      id: "meaning",
      type: "paragraph",
      text: "These venues can shorten the practical path to a cooked meal, connect dining with delivery or care, and provide a familiar place for social contact. Research at one Shanghai canteen found that physical comfort, service interaction, belonging and respect shaped older diners' satisfaction. A study of 50 Guangzhou senior dining halls linked use with features such as floor level, seating and surroundings. Both are contextual studies, not proof that every canteen produces the same social or health effect."
    },
    {
      id: "respect",
      type: "list",
      items: [
        "Describe the venue as local meal infrastructure, not a poverty kitchen, political spectacle or secret bargain.",
        "Let older residents and eligible users take priority where the service is designed for them.",
        "Do not interview or photograph diners without informed consent merely to make the article feel authentic.",
        "Do not publish a resident's name, face, card, subsidy status, payment screen or daily routine.",
        "A polite refusal is useful verification. Leaving promptly is part of responsible travel."
      ]
    },
    {
      id: "dynamic-check",
      type: "callout",
      title: "Recheck the named property close to the meal",
      body: "Access, operator, meal windows, remaining portions, menu, ordinary price, discount eligibility, meal-card requirements, payment and step-free routes can change. Official reports about one venue record a dated example; they do not preserve current conditions. Core and changing facts on this page were reviewed on 13 August 2026.",
      tone: "neutral"
    },
    {
      id: "links",
      type: "internal-links",
      title: "Prepare for an ordinary meal in China",
      items: [
        {
          label: "Follow your first shared meal from seat to bill",
          href: "/guides/first-shared-meal-in-china/",
          description: "Use the restaurant-flow guide for ordering, sharing and paying outside a community service."
        },
        {
          label: "Set up payment for China",
          href: "/guides/how-to-pay-in-china-as-a-tourist/",
          description: "Prepare mobile payment and cash without assuming what one canteen accepts."
        },
        {
          label: "Verify a wheelchair-accessible China route",
          href: "/guides/wheelchair-accessible-china-route-planning/",
          description: "Check the continuous street-to-seat access chain for the actual traveller."
        },
        {
          label: "Understand the wider 15-minute neighbourhood",
          href: "/guides/china-15-minute-neighbourhoods/",
          description: "Place one canteen inside the broader service network without assuming every community facility is public."
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and research sources checked on 13 August 2026",
      items: [
        {
          label: "National action plan for developing older-adult meal services",
          url: "https://jdjc.mof.gov.cn/fgzd/202310/t20231024_3912907.htm",
          publisher: "Ministry of Civil Affairs and partner departments / Ministry of Finance",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Hangzhou community-canteen construction and operating guidance",
          url: "https://zfgb.hangzhou.gov.cn/11/105220253/t116220253054/518190.shtml",
          publisher: "Hangzhou Municipal People's Government",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Guangzhou elder-dining-hall management rules",
          url: "https://www.gz.gov.cn/zwgk/gzsrmzfgbn/2024/20/content/post_10640632.html",
          publisher: "Guangzhou Municipal People's Government",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Shanghai implementation opinion on older-adult meal services",
          url: "https://mzj.sh.gov.cn/MZ_zhuzhan2739_0-2-8-15-55/20240320/3cfd45fa5c4f4ab9b9086602e58c3392.html",
          publisher: "Shanghai Civil Affairs Bureau",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Beijing community-restaurant work guide",
          url: "https://www.beijing.gov.cn/zhengce/gfxwj/sj/202407/t20240712_3744070.html",
          publisher: "Beijing Municipal People's Government",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Jinyang subdistrict dining-network and access case",
          url: "https://www.pudong.gov.cn/zwgk/14543.gkml_ywl_shbz/2024/15/322024.html",
          publisher: "Pudong New Area People's Government",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Foreign diner at named Shanghai community canteens",
          url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260331/9e72aa737f734fcfaa108b5f0c1858c0.html",
          publisher: "Shanghai Municipal People's Government",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Wannan Community Senior Canteen case",
          url: "https://mzj.sh.gov.cn/2026bsmz/20260116/03798a22b533417d973a6ba6bbf04101.html",
          publisher: "Shanghai Civil Affairs Bureau",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Older diners' experience at one Shanghai community canteen",
          url: "https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2026.1701296/full",
          publisher: "Frontiers in Public Health",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Spatial and service factors across 50 Guangzhou senior dining halls",
          url: "https://www.nature.com/articles/s41599-024-03880-y",
          publisher: "Humanities and Social Sciences Communications",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Hero image: Zhongshan Road community cafeteria in Jinhua by MNXANL, CC BY-SA 4.0; cropped and resized",
          url: "https://commons.wikimedia.org/wiki/File:202308_Community_Cafeteria_of_Zhongshanlu,_Jinhua.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-13"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
