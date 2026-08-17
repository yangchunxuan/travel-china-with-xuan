import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "Guangzhou morning tea is not simply tea and it is not simply breakfast. It is a shared meal built around tea, small Cantonese dishes and time at the table. Yum cha is the Cantonese expression for the act of drinking tea; dim sum is the food. On a first visit, expect a per-person tea charge, several possible ordering systems and a meal that moves more slowly than a takeaway breakfast.",
    },
    {
      id: "three-terms-heading",
      type: "heading",
      level: 2,
      text: "Three terms that are related but not interchangeable",
    },
    {
      id: "three-terms",
      type: "comparison",
      columns: [
        {
          heading: "Morning tea — 早茶",
          body:
            "The whole Guangzhou meal and social occasion: tea, dim sum, conversation and the restaurant service around them. It can continue into lunch at some venues, so the name does not guarantee a fixed service window.",
        },
        {
          heading: "Yum cha — 飲茶／饮茶",
          body:
            "The Cantonese reading of “drink tea.” In everyday use it can mean going out for the entire tea-and-dim-sum occasion, not ordering a cup of tea by itself.",
        },
        {
          heading: "Dim sum — 點心／点心",
          body:
            "The small savoury or sweet dishes served with tea: steamed, baked, fried or prepared as rice rolls, congee and other forms. Dim sum is one component of yum cha, not a perfect synonym for it.",
        },
      ],
    },
    {
      id: "regional-scope",
      type: "callout",
      title: "This is a regional practice, not a rule for all China",
      body:
        "Guangfu tea-drinking customs developed in Guangzhou and the wider Pearl River Delta and also travelled to Hong Kong, Macao and overseas Cantonese communities. Restaurants in those places share vocabulary and many dishes, but service, recipes and etiquette vary. This guide stays with Guangzhou rather than turning one regional custom into a claim about every Chinese diner.",
      tone: "neutral",
    },
    {
      id: "history-heading",
      type: "heading",
      level: 2,
      text: "What the history supports—and what it does not",
    },
    {
      id: "history-intro",
      type: "paragraph",
      text:
        "There is no securely documented moment when one person “invented” morning tea. The strongest local account links its recognisable modern form to late-Qing Guangzhou, when inexpensive establishments known as yiliguan and erliguan served tea, simple food and places to rest or exchange news. Academic work also places the custom in the Qing period and interprets its growth alongside Guangzhou's port and commercial life. That is a historical development, not a single-origin story.",
    },
    {
      id: "history-timeline",
      type: "table",
      caption: "A cautious timeline of Guangzhou morning tea",
      columns: ["Period", "What is documented", "How to interpret it"],
      rows: [
        [
          "Late Qing: Xianfeng and Tongzhi reigns",
          "Guangzhou's official intangible-heritage account identifies yiliguan and erliguan as forerunners of modern teahouses and says the custom of tea with dim sum took shape around them.",
          "A useful starting point for the modern custom, not proof that tea-and-snack gatherings had never existed earlier.",
        ],
        [
          "Late Qing to early twentieth century",
          "Larger chaju and chalou developed, serving different customers and turning the tea table into a place for leisure, family meetings, information and business.",
          "The room became social infrastructure as well as a food business. No single class or age group owned the practice.",
        ],
        [
          "2022",
          "Guangfu tea-drinking customs were included in Guangdong's eighth batch of provincial representative intangible-cultural-heritage items.",
          "This recognises a living regional custom; it does not freeze one restaurant format forever.",
        ],
        [
          "2026",
          "Guangzhou's dedicated Morning Tea Inheritance and Protection Regulation took effect on 1 May, followed in July by a voluntary evaluation programme for traditional morning-tea shops.",
          "Morning tea is now both everyday restaurant life and an object of formal cultural protection.",
        ],
      ],
    },
    {
      id: "fact-levels",
      type: "callout",
      title: "How this guide labels evidence",
      body:
        "Dates, heritage status and 2026 business duties come from government or UNESCO records. The social interpretation of teahouses comes from academic and cultural research. Stories about emperors creating table gestures are treated as legends. Advice on how much to order is Homeground's planning judgment, not a historical rule.",
      tone: "decision",
    },
    {
      id: "table-flow-heading",
      type: "heading",
      level: 2,
      text: "What usually happens at the table",
    },
    {
      id: "table-flow",
      type: "list",
      ordered: true,
      items: [
        "Check the restaurant's current morning-tea service hours and join its queue or reservation system. “Morning tea” does not promise that the full menu is available all day.",
        "After seating, choose tea. A tea fee, or chaweifei, is commonly charged for each person rather than once per pot, so ask what it includes before ordering.",
        "Order dim sum through the system in use that day: a paper checklist, a stamped card, a QR menu, a server, or—in fewer traditional rooms—a trolley or cart.",
        "Share the small dishes and add more gradually. Steamers and plates often contain two to four pieces, but size and count vary too much for a universal formula.",
        "Ask for hot-water refills when needed. Offsetting a pot lid is a recorded local signal, but a service button or a direct request may be clearer in a modern restaurant.",
        "Review the itemised bill, including tea charges and dish categories, before paying.",
      ],
    },
    {
      id: "ordering-systems",
      type: "comparison",
      title: "The old image and the present reality",
      columns: [
        {
          heading: "Trolleys and stamped cards",
          body:
            "Servers circulate with ready dishes, announce them and mark a bill card. This is a recognisable historic service form and still exists in some rooms, but it is not guaranteed.",
        },
        {
          heading: "Paper checklist",
          body:
            "You mark quantities on a printed list and hand it to a server. Keeping the Chinese dish names on your phone makes this format easier without turning the meal into a translation exercise.",
        },
        {
          heading: "QR or app ordering",
          body:
            "Many contemporary restaurants use a digital menu, sometimes alongside staff ordering. Data access, a working phone and a payment fallback still matter, and the interface may not have English.",
        },
      ],
    },
    {
      id: "regulation-heading",
      type: "heading",
      level: 2,
      text: "What changed in Guangzhou in 2026",
    },
    {
      id: "regulation-summary",
      type: "paragraph",
      text:
        "Guangzhou's Morning Tea Inheritance and Protection Regulation is unusually concrete for a food custom. Effective 1 May 2026, it defines Guangzhou morning tea as a regional food-consumption form centred on tea with Cantonese dim sum and combining Lingnan food culture, social customs and traditional skills. The rules require clear, consistent pricing across menus, labels and self-ordering apps.",
    },
    {
      id: "regulation-details",
      type: "table",
      caption: "Traveller-facing parts of the 2026 regulation, checked 10 August 2026",
      columns: ["Rule", "What a diner may notice", "Important limit"],
      rows: [
        [
          "Tea charge",
          "If a venue charges a tea-seat fee, it must offer tea choices such as black, green, oolong, Pu'er or chrysanthemum tea and provide the related tea service.",
          "The law does not set one citywide price or promise identical refill practices at every restaurant.",
        ],
        [
          "How food was made",
          "Menus or another prominent notice must distinguish morning-tea food made on site by traditional methods from food made by non-traditional methods.",
          "Different prices are allowed for the two versions of the same food.",
        ],
        [
          "Time from production to service",
          "Food described as traditionally made on site generally must be served within 24 hours of production.",
          "An industry body can identify exceptions where the traditional process itself requires more than 24 hours.",
        ],
        [
          "Visible production",
          "Operators are directed to show food preparation through transparent, open or video-monitored kitchens or visitor passages.",
          "The exact form will differ by premises; it is not a promise of a public kitchen tour.",
        ],
        [
          "Traditional-shop designation",
          "A voluntary third-party evaluation programme began in July 2026, and certified shops can receive a plaque.",
          "An old restaurant is not automatically certified, and absence of a plaque is not proof that its food is inauthentic.",
        ],
      ],
    },
    {
      id: "dishes-heading",
      type: "heading",
      level: 2,
      text: "A small menu vocabulary is more useful than a giant checklist",
    },
    {
      id: "dish-table",
      type: "table",
      caption: "Common Guangzhou morning-tea dishes and what to check",
      columns: ["Menu name", "What it is", "Dietary watch"],
      rows: [
        [
          "虾饺 — har gow / shrimp dumpling",
          "A steamed dumpling with a translucent wheat-starch skin and shrimp filling; bamboo shoot and pork fat may also appear.",
          "Shellfish is central. The translucent wrapper does not make it gluten-free or pork-free by default.",
        ],
        [
          "干蒸烧卖 — siu mai",
          "An open-topped steamed dumpling, commonly made with pork and shrimp in the Guangzhou style.",
          "Usually contains pork and may contain shellfish; recipes vary.",
        ],
        [
          "叉烧包 — char siu bao",
          "A steamed or baked bun filled with sweet-savoury Cantonese barbecued pork.",
          "Contains pork and wheat; sauce ingredients vary.",
        ],
        [
          "肠粉 — cheung fun / steamed rice roll",
          "Thin steamed rice sheets rolled around shrimp, beef, char siu or another filling and finished with sauce.",
          "A plain-looking roll may still carry meat stock, soy, shellfish or shared-kitchen exposure.",
        ],
        [
          "糯米鸡 — lo mai gai",
          "Glutinous rice steamed in a lotus leaf, usually with chicken, pork, mushroom and other savoury fillings.",
          "“Glutinous” describes the sticky rice texture, not necessarily gluten; fillings and sauces still need checking.",
        ],
        [
          "蛋挞 — egg tart",
          "A baked pastry shell with egg custard, reflecting the adaptive and internationally connected history of Cantonese pastry.",
          "Usually contains egg, dairy and wheat.",
        ],
      ],
    },
    {
      id: "dietary-warning",
      type: "callout",
      title: "Do not identify dietary suitability by appearance",
      body:
        "Pork fat, dried seafood, shrimp, oyster sauce, stock and shared preparation can appear where an overseas diner may not expect them. For an allergy, show the ingredient in written Chinese and ask about both the dish and cross-contact. For vegetarian, halal, kosher or other requirements, choose a venue that can answer clearly rather than treating a vegetable filling as proof.",
      tone: "warning",
    },
    {
      id: "etiquette-heading",
      type: "heading",
      level: 2,
      text: "Etiquette: useful signals, ordinary courtesy and colourful legends",
    },
    {
      id: "etiquette-table",
      type: "table",
      caption: "How firmly each morning-tea custom can be stated",
      columns: ["Practice", "Evidence level", "A visitor-friendly response"],
      rows: [
        [
          "Pouring tea for other people before yourself",
          "A widely observed courtesy at shared tea tables, but not a legal code or a practice performed identically by every group.",
          "If the pot is within reach, offer to pour. Accept a host's lead without making a performance of it.",
        ],
        [
          "Tapping two bent fingers on the table after someone pours",
          "The finger-tapping thanks, kouzhi chali, is recorded as part of Guangfu tea custom. The popular story that it began with the Qianlong emperor travelling incognito is a legend, not documented proof of origin.",
          "A small tap is fine if others use it. A spoken thank-you is also fine; tourists are not tested on the gesture.",
        ],
        [
          "Offsetting or lifting the teapot lid for a refill",
          "Jiegai xushui is recorded in the provincial heritage account. Stories explaining exactly how it began vary and should not be treated as settled history.",
          "Use it only when it is clearly understood in that room; otherwise ask a server or use the service button.",
        ],
        [
          "Keeping the lazy Susan still while someone takes food",
          "Ordinary shared-table courtesy rather than a Guangzhou-only ritual.",
          "Wait until the person has finished serving themselves, then turn it gently.",
        ],
      ],
    },
    {
      id: "etiquette-callout",
      type: "callout",
      title: "Observation beats memorisation",
      body:
        "The respectful first-visit method is simple: watch how the table and staff are working, keep shared dishes reachable, pour or pass things when useful, and ask when a signal is unclear. Knowing the legend is less important than not interrupting another diner who is serving food.",
      tone: "decision",
    },
    {
      id: "one-bowl-heading",
      type: "heading",
      level: 2,
      text: "“One tea vessel, two baskets of dim sum” is a cultural shorthand, not an order rule",
    },
    {
      id: "one-bowl-explanation",
      type: "paragraph",
      text:
        "In the traditional phrase yizhong liangjian—一盅两件—the Guangzhou cultural authority explains liangjian as two baskets of dim sum served with one vessel of tea. It helps explain how deeply tea and small dishes belong together. It is a historical shorthand, not a promise that a modern restaurant sells one standard package or a rule that diners must stop after two baskets. Modern menus range from restrained classics to elaborate new creations.",
    },
    {
      id: "social-life-heading",
      type: "heading",
      level: 2,
      text: "Why the meal still matters in a modern city",
    },
    {
      id: "social-life",
      type: "paragraph",
      text:
        "Morning tea makes a public table available for a family catch-up, a meeting with friends, a business conversation or simply a long read over repeated hot-water refills. That social use helps explain why a meal with small portions can occupy a large, noisy room for hours. It would still be a stereotype to say that every Guangzhou resident goes every day: work schedules, age, budget, neighbourhood and family habits all change who appears and when.",
    },
    {
      id: "living-culture",
      type: "paragraph",
      text:
        "Its survival is not the same as staying unchanged. Pushcarts gave way in many venues to checklists and QR menus; heritage dishes sit beside new flavours; government protection now distinguishes traditional on-site production from other methods. The continuity is the relationship among tea, shareable food, skilled work and social time—not one frozen interior or menu.",
    },
    {
      id: "unesco-clarification",
      type: "callout",
      title: "Is Guangzhou morning tea UNESCO-listed? Not as a separate element",
      body:
        "Checked 10 August 2026: UNESCO's Representative List includes China's broader “Traditional tea processing techniques and associated social practices,” inscribed in 2022. Guangfu tea-drinking customs hold provincial heritage status in Guangdong. Guangzhou's 2026 regulation says the city will promote a separate UNESCO application for morning-tea culture; that wording is an aim, not a completed inscription.",
      tone: "warning",
    },
    {
      id: "first-visit-heading",
      type: "heading",
      level: 2,
      text: "A realistic first visit",
    },
    {
      id: "first-visit-plan",
      type: "list",
      ordered: true,
      items: [
        "Choose a Guangzhou teahouse or Cantonese restaurant using its current menu, recent service information and location—not an undated list of “most authentic” venues.",
        "Go during its stated morning-tea period and allow more time than a quick breakfast. Peak queues and dish availability are venue- and day-specific.",
        "Save the Chinese characters for three or four dishes you genuinely want and one tea choice. That is more useful than memorising a hundred-item menu.",
        "For two diners, Homeground's cautious starting point is tea plus three or four small dishes, then add more. This is an ordering heuristic, not the meaning of yizhong liangjian.",
        "Confirm the per-person tea charge, portion count and any dietary restrictions before sending the order.",
        "If dining alone, ask whether smaller portions are available and expect less variety; taking leftovers is more sensible than over-ordering for a photograph.",
      ],
    },
    {
      id: "not-assume-heading",
      type: "heading",
      level: 2,
      text: "Five assumptions to leave outside the teahouse",
    },
    {
      id: "not-assume-list",
      type: "list",
      items: [
        "Yum cha and dim sum mean exactly the same thing.",
        "Every Guangzhou restaurant still uses pushcarts.",
        "Every local eats morning tea daily or follows every gesture.",
        "Guangzhou morning tea is already a separate UNESCO-listed element.",
        "A dish is vegetarian, pork-free or allergy-safe because its wrapper looks plain.",
      ],
    },
    {
      id: "final-connection",
      type: "callout",
      title: "Use the meal to read the city",
      body:
        "A well-placed morning-tea stop can explain Guangzhou's food craft, social pace and commercial history more clearly than another generic attraction list. If you want help fitting a real teahouse experience into a wider China route, a Homeground human planner can discuss the context and logistics; current restaurant hours, menus and dietary handling should still be confirmed directly.",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Keep planning Guangzhou and your wider China trip",
      items: [ { label: "Guangzhou destination hub", href: "/destinations/guangzhou/", description: "Decide whether the city gets nights, then choose the terminal, the station and the base together." },
        {
          label: "Confirm whether your Baiyun Airport flight uses T2 or T3",
          href: "/guides/guangzhou-baiyun-airport-t2-t3/",
          description: "Check the flight's terminal before choosing the correct metro, intercity rail or shuttle route.",
        },
        {
          label: "Check whether your China itinerary is too rushed",
          href: "/guides/is-your-china-itinerary-too-rushed/",
          description: "Leave usable time for morning tea, transport and adjustments instead of filling every gap.",
        },
        {
          label: "Decide whether you need a tour guide in China",
          href: "/guides/do-you-need-a-tour-guide-in-china/",
          description: "Put human help where cultural context or on-the-ground coordination matters most.",
        },
        { label: "Choose a tea landscape", href: "/guides/tea-landscape-regions-of-china/", description: "Choose a Chinese tea region by the landscape, work and community relationships you can actually observe—not by a best-tea ranking." },
      ],
    },
    {
      id: "official-sources",
      type: "sources",
      title: "Official, academic and image sources checked in August 2026",
      items: [
        {
          label: "Guangzhou Morning Tea Inheritance and Protection Regulation — effective 1 May 2026",
          url: "https://wglj.gz.gov.cn/gkmlpt/content/10/10753/post_10753247.html",
          publisher: "Guangzhou Municipal Bureau of Culture, Radio, Television and Tourism",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Guangzhou traditional morning-tea shop voluntary evaluation notice — 9 July 2026",
          url: "https://scjgj.gz.gov.cn/zwdt/tzgg/content/post_10894364.html",
          publisher: "Guangzhou Administration for Market Regulation",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Guangzhou government — Guangfu tea-drinking customs added to Guangdong's provincial intangible-heritage list",
          url: "https://www.gz.gov.cn/zt/jrshts/2022n/dwj/tpxw/content/post_8293092.html",
          publisher: "Guangzhou Municipal People's Government",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Guo et al. — Cantonese morning tea (Yum Cha): a bite of Cantonese culture",
          url: "https://link.springer.com/article/10.1186/s42779-023-00180-9",
          publisher: "Journal of Ethnic Foods, Springer Nature",
          reviewedAt: "2026-08-10",
        },
        {
          label: "UNESCO — Traditional tea processing techniques and associated social practices in China",
          url: "https://ich.unesco.org/en/RL/traditional-tea-processing-techniques-and-associated-social-practices-in-china-01884?RL=01884",
          publisher: "UNESCO Intangible Cultural Heritage",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Guangzhou government — current introduction to classic Guangzhou morning-tea dishes",
          url: "https://www.gz.gov.cn/zt/jrshts/2026n/nwzgz/nwgz/content/post_10689712.html",
          publisher: "Guangzhou Municipal People's Government",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Guangzhou culture authority — teahouse culture, yizhong liangjian and evolving dim sum",
          url: "https://wglj.gz.gov.cn/ztmb/gzhyn/whgz/content/post_8832957.html",
          publisher: "Guangzhou Municipal Bureau of Culture, Radio, Television and Tourism",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Hong Kong Tourism Board — standard English names for Cantonese dim sum dishes",
          url: "https://www.discoverhongkong.com/eng/food-and-drink/must-try-street-food-in-hong-kong.html",
          publisher: "Hong Kong Tourism Board",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Hero image: a dim sum table at Pan Xi Restaurant by MeiOLA 2290 WMENSZ, CC0; cropped and converted to WebP",
          url: "https://commons.wikimedia.org/wiki/File:GD_%E5%BB%A3%E6%9D%B1_Guangdong_%E5%BB%A3%E5%B7%9E_Guangzhou_%E8%8D%94%E7%81%A3%E5%8D%80_Liwan_%E9%BE%8D%E6%B4%A5%E8%A5%BF%E8%B7%AF_Longjin_West_Road_shop_%E6%B3%AE%E6%BA%AA%E9%85%92%E5%AE%B6_Pan_Xi_Restaurant_%E9%BB%9E%E5%BF%83_dim_sum_June_2025_R12S_30.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-11",
        },
      ],
    },
  ],
};

export default body;
