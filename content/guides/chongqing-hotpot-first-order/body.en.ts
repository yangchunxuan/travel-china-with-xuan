import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Do not start a Chongqing hotpot meal by ticking every famous ingredient. Choose the broth first, then place one small round: for two people, one meat plate, one offal or house-speciality plate, two vegetables or bean products, one staple held for later, and a dipping bowl each. This is a Homeground editorial default, not a city rule. Portion sizes, spice labels and pot designs vary, so look at today's menu, ask for half portions where offered, and add only after seeing the first plates.",
    },
    {
      id: "answer",
      type: "callout",
      title: "The safest useful first decision",
      tone: "decision",
      body: "If everyone wants the classic red broth and tolerates heat, order the restaurant's lowest red-broth level first. If tolerances differ, ask whether a divided pot or a separate clear pot is available. A visible nine-grid may be only a metal rack within one broth; its appearance cannot prove sealed broths, private portions or vegetarian zones. Confirm what the divider means at that restaurant before ordering ingredients.",
    },
    {
      id: "pot-heading",
      type: "heading",
      level: 2,
      text: "Choose the broth before you choose the food",
    },
    {
      id: "pot-p1",
      type: "paragraph",
      text: "The current Sichuan–Chongqing operating standard defines hotpot as a meal in which diners cook ingredients in broth and usually eat them with a dip. It defines a base broadly: animal and/or vegetable oil may be combined with some selection of douban paste, chilli, spices, salt and vegetable products. That definition explains why a red broth is not a short, transparent ingredient list. Removing visible chillies does not remove the oil, seasoning or possible allergens already cooked into it.",
    },
    {
      id: "pot-table",
      type: "table",
      caption: "What each pot request solves — and what still needs asking",
      columns: ["Ask for", "Useful when", "Confirm before saying yes"],
      rows: [
        [
          "Red broth (hong tang / 红汤)",
          "The table wants Chongqing's chilli-and-Sichuan-pepper profile",
          "Spice level, whether the base uses beef tallow or another animal fat, and whether today's base contains an ingredient you avoid",
        ],
        [
          "The lowest red-broth heat offered (wei la / 微辣)",
          "Everyone wants red broth but has limited heat tolerance",
          "What ‘mild’ means at this house. It is still a red broth, not a non-spicy promise",
        ],
        [
          "A divided pot (yuan yang / 鸳鸯 or another house design)",
          "The table wants more than one broth",
          "Which sections are actually sealed, what each broth contains, and whether serving tools will be kept separate",
        ],
        [
          "A clear broth or a separate clear pot (qing tang / 清汤)",
          "Someone needs a less-spicy route or wants to taste an ingredient without red oil",
          "Clear does not automatically mean vegetarian, allergen-free or free of animal stock; ask directly",
        ],
      ],
    },
    {
      id: "pot-warning",
      type: "callout",
      title: "A divided pot is a preference tool, not an allergy barrier",
      tone: "warning",
      body: "Broth can splash, ladles can cross and raw plates may share preparation space. With a severe allergy, ask the restaurant to explain the base and cross-contact controls; if it cannot confirm them, do not continue eating from that kitchen. With a religious or strict vegetarian boundary, continue only if the restaurant can confirm a new dish's ingredients and handling; otherwise leave. Never treat one compartment as protected merely because it looks separate.",
    },
    {
      id: "order-heading",
      type: "heading",
      level: 2,
      text: "Build one first round, not a display table",
    },
    {
      id: "order-p1",
      type: "paragraph",
      text: "Menu photos make a table look incomplete until every gap is filled. Ignore that cue. The regional standard recommends that operators encourage appropriate ordering, and a 2026 Tongnan District consumer notice published on Chongqing's market-regulator portal also tells diners to match orders to group size. The practical answer is to order by role. First choose something substantial, one unfamiliar texture if you want it, something fresh, something that can sit in the broth, and one dip per person. Starch comes only after the first round.",
    },
    {
      id: "order-table",
      type: "table",
      caption: "Homeground's first-round default; confirm actual plate sizes at the restaurant",
      columns: ["Table", "Order first", "Hold back on purpose"],
      rows: [
        [
          "One person",
          "One half portion of meat or a house speciality if offered; one vegetable or tofu product; one dip",
          "Sets, a second protein, noodles and anything sold only as a large plate",
        ],
        [
          "Two people",
          "One meat plate; one offal or house-speciality plate; two vegetable/bean roles; two dips",
          "A third protein and starch until you see the plates",
        ],
        [
          "Three to four",
          "Two proteins with different textures; one offal/speciality; three vegetable/bean roles; a dip each",
          "Duplicate meats, large fried sides and more than one staple",
        ],
        [
          "Five or more",
          "Before lighting the burner, ask staff whether the seats and table need one pot or two; then size a small first round for each pot and include a mild route if tolerances differ",
          "A large second round before every diner can reach a pot without leaning across a burner",
        ],
      ],
    },
    {
      id: "order-p2",
      type: "paragraph",
      text: "‘Half portion’ is a request, not an entitlement. Some kitchens plate in fixed units. If a half is unavailable, remove a role rather than shrinking every role: for two people, keep one protein and two plant or bean items, then add the unfamiliar speciality only if the first plates are genuinely small. A staff recommendation can help, but ask whether it is sized for your table or simply a set menu.",
    },
    {
      id: "menu-heading",
      type: "heading",
      level: 2,
      text: "Read unfamiliar ingredients by function",
    },
    {
      id: "menu-p1",
      type: "paragraph",
      text: "A first meal does not require proving courage with every organ meat. The same 2026 Tongnan District safety notice explicitly names tripe, duck intestine and huanghou (黄喉) and requires thorough cooking. Treat that list as a safety boundary, not a compulsory tasting list. Order one unfamiliar texture, learn how that restaurant cooks it through, and let the rest of the meal be easy to identify.",
    },
    {
      id: "menu-table",
      type: "table",
      caption: "Common menu words and the decision they create",
      columns: ["Menu word", "What it is", "Useful question"],
      rows: [
        [
          "Mao du / 毛肚",
          "Beef tripe, valued for texture",
          "Is this the whole portion, and can staff show us how to cook it thoroughly?",
        ],
        [
          "Ya chang / 鸭肠",
          "Duck intestine",
          "Can staff explain or handle the first batch? If the answer is only a seconds slogan, do not order it",
        ],
        [
          "Huang hou / 黄喉",
          "A hotpot ingredient listed as huanghou (黄喉); the name alone does not identify today's animal source",
          "Which animal is today's portion from, and how does this kitchen cook it thoroughly?",
        ],
        [
          "Ya xue / 鸭血",
          "Duck-blood curd, normally cut into blocks",
          "Has it already been cooked, and how long should this house finish it in the pot?",
        ],
        [
          "Dou pi, you dou pi, dong doufu / 豆皮、油豆皮、冻豆腐",
          "Different soy sheets or tofu textures; porous versions take up broth",
          "Which one absorbs the least red oil, or can it go in clear broth?",
        ],
        [
          "Ou pian, tu dou pian / 藕片、土豆片",
          "Lotus-root and potato slices",
          "Which is the smaller plate? Keep one crisp/root role rather than ordering both automatically",
        ],
        [
          "Kuan fen / 宽粉",
          "Broad starch noodles",
          "Can we order this later? It is a meal closer, not proof that the first round is complete",
        ],
      ],
    },
    {
      id: "cook-heading",
      type: "heading",
      level: 2,
      text: "Cook one batch safely before the table speeds up",
    },
    {
      id: "cook-p1",
      type: "paragraph",
      text: "The first batch is where the table establishes its system. Ask which tongs or long chopsticks are for raw food and which utensils lift cooked food. If the restaurant supplies only one tool, ask for another. Put in a small batch so the broth keeps cooking steadily and every piece remains visible. Accept only guidance that explicitly reaches thorough cooking. If staff offer only a brief-blanching slogan or cannot explain that endpoint, do not eat that ingredient; choose a dish the kitchen can cook through instead.",
    },
    {
      id: "cook-list",
      type: "list",
      items: [
        "Wait for the restaurant's signal that the pot is ready; steam alone does not tell you the broth has returned to the required heat after a large load.",
        "Use the raw tool to place food in the pot. Do not put that tool into your personal bowl or use it to serve a cooked piece.",
        "Add one ingredient or one clearly separated small batch at a time until the group learns the kitchen's guidance.",
        "Keep raw plates away from the cooked-food landing area and from personal chopsticks.",
        "After following a clear instruction through to thorough cooking, move the item with the cooked tool to a personal bowl or dip and let it cool before eating.",
        "If nobody can identify a piece or remember when it entered, leave it in and ask for a clear handling instruction. If uncertainty remains, do not eat it; floating, curling or changing colour is not proof.",
      ],
    },
    {
      id: "cook-warning",
      type: "callout",
      title: "Why this guide gives no ‘seven up, eight down’ timing",
      tone: "warning",
      body: "A 2026 Tongnan District food-safety notice published on Chongqing's market-regulator portal specifically says tripe, duck intestine, huanghou, meat, poultry and seafood must be cooked thoroughly and warns against brief blanching merely to keep them crisp. The restaurant standard has a 70 °C centre-temperature rule for food-service processing, but a diner cannot convert that into one number of seconds for every cut and batch. Ask for an instruction that reaches thorough cooking. If staff offer only a short-blanching slogan or cannot explain it, skip that ingredient or order a kitchen-cooked alternative; do not use a slogan, colour change or this page as a timer.",
    },
    {
      id: "dip-heading",
      type: "heading",
      level: 2,
      text: "Use the dip as seasoning, then read the culture carefully",
    },
    {
      id: "dip-p1",
      type: "paragraph",
      text: "A common Chongqing table offers an oil-based dip, often with garlic and optional additions. The current regional standard defines a hotpot dip broadly as vegetable oil, minced garlic and/or other seasonings used with food after it is cooked; the local gazette records several oil and dry-dip forms. That evidence proves variation. It does not prove that every house should provide the same bowl.",
    },
    {
      id: "dip-table",
      type: "table",
      caption: "What the dipping bowl can and cannot do",
      columns: ["Use it for", "Do not use it to"],
      rows: [
        ["Add garlic, salt, aroma or a different texture after cooking", "Declare a raw item safe"],
        ["Give a cooked piece a place to cool before it reaches your mouth", "Turn a red broth into a non-spicy or allergen-free meal"],
        ["Keep your own seasoning separate from the shared pot", "Rinse away an ingredient already dissolved in the broth"],
        ["Taste the house's version before adding more condiments", "Decide whether one version is the only authentic Chongqing dip"],
      ],
    },
    {
      id: "culture-p1",
      type: "paragraph",
      text: "Official local records connect Chongqing hotpot with riverside labour, changing red-broth techniques and a social meal built around one pot. The city's seventh municipal intangible-heritage list, published in 2026, includes traditional Chongqing-hotpot making technique and related customs. That recognition identifies a protected practice; it does not certify the restaurant in front of you or freeze one recipe. Local promotional writing sometimes turns the dish into proof that Chongqing people are universally ‘fiery’ or ‘straightforward’. Treat that as rhetoric, not a fact about millions of residents.",
    },
    {
      id: "scenario-heading",
      type: "heading",
      level: 2,
      text: "Adapt the table for one diner, mixed tolerances or children",
    },
    {
      id: "scenario-table",
      type: "table",
      caption: "Four real tables and a workable starting plan",
      columns: ["Situation", "Start this way", "Boundary"],
      rows: [
        [
          "Solo diner",
          "Ask for the smallest pot and half portions. Choose one protein, one plant/bean item and one dip; add starch only if still hungry",
          "If everything is large or set-only, this restaurant's shared format may simply be a poor fit for one person",
        ],
        [
          "Friends with different heat tolerances",
          "Ask for genuinely separated red and clear broth, give each side its own ladle, and keep the first round small",
          "Shared preparation and splashes remain; this solves preference, not a severe allergy",
        ],
        [
          "Family with children",
          "Seat children away from the burner, let one adult manage raw tools, use clear broth if the restaurant offers it, and move only confirmed-cooked food to their bowls",
          "Do not let a child retrieve food from the active pot or treat a divided square as a cool zone",
        ],
        [
          "Vegetarian, or avoiding beef tallow or animal stock",
          "Ask what oil and stock are in the base, whether a separate pot and tools are possible, and whether bean/vegetable plates share preparation surfaces",
          "Red versus clear is not a dietary label. Continue only if a new dish's ingredients and handling can also be confirmed; otherwise leave",
        ],
      ],
    },
    {
      id: "repair-heading",
      type: "heading",
      level: 2,
      text: "Recover when the table goes wrong",
    },
    {
      id: "repair-table",
      type: "table",
      caption: "Stop the error before adding another plate",
      columns: ["Problem", "What to do now", "What not to assume"],
      rows: [
        [
          "The red broth is too spicy",
          "Pause the red side. Ask for a separate clear broth if available, plain rice or a kitchen-cooked mild dish. Let cooked food cool before eating",
          "More oil dip or removing visible chilli does not erase seasoning already in the broth",
        ],
        [
          "Red and clear broth have mixed",
          "For preference, ask whether the pot can be replaced. With a severe allergy, stop using the entire pot and do not continue in that kitchen if cross-contact cannot be ruled out. With a religious or vegetarian boundary, continue only after a new dish's ingredients and handling are confirmed",
          "Another grid section becomes safe after liquid or a shared ladle crosses it",
        ],
        [
          "Too much food has arrived",
          "Cancel only items the restaurant says are still cancellable; stop adding raw food; ask whether fully cooked leftovers can be packed and chilled promptly",
          "A served raw plate can automatically be returned or safely carried around unrefrigerated",
        ],
        [
          "You cannot tell whether a piece is cooked",
          "Leave it in and ask for a clear handling instruction. If the answer is only a slogan or uncertainty remains, do not eat it; if it entered a personal bowl, do not taste-test it",
          "Floating, curling, colour or a remembered internet time proves doneness",
        ],
        [
          "Raw and cooked tools were mixed, or a raw tool touched a bowl, dip or cooked-food area",
          "Stop using both tools. Isolate and do not eat contacted ready-to-eat food; replace the tools, bowl, chopsticks and affected dip, and ask staff to discard and replace the affected food. If a severe allergen was involved, stop the meal unless the kitchen can rule out further cross-contact. Restart only with two clearly marked tool sets",
          "A quick wipe, or returning a contacted cooked piece to the plate, removes cross-contamination",
        ],
        [
          "Someone feels unwell",
          "Stop eating, alert the restaurant, keep the receipt and order record, and seek appropriate medical help; describe what was eaten and when",
          "Numbness from Sichuan pepper explains every symptom or makes assessment unnecessary",
        ],
      ],
    },
    {
      id: "language-heading",
      type: "heading",
      level: 2,
      text: "Use a short ordering card and check the bill",
    },
    {
      id: "language-p1",
      type: "paragraph",
      text: "Show the Chinese line rather than relying on a translated menu category. Set broth, portions, serious-allergy limits and possible charges before ordering. Request separate raw/cooked tools before the first raw piece enters the pot; use the doneness line for the first batch and the cancellation line only as recovery. A restaurant may say an option is unavailable. That answer is useful because it lets you remove a risk or leave before the pot is lit.",
    },
    {
      id: "language-table",
      type: "table",
      caption: "Table-ready Chongqing hotpot questions",
      columns: ["Need", "Show or say"],
      rows: [
        ["Lowest red-broth heat", "红汤最低辣度是哪一种？我们先要最低的。"],
        ["Check the fat/stock", "这个锅底有牛油、猪油或其他动物汤吗？"],
        ["Ask for divided or separate clear broth", "可以要真正分开的鸳鸯锅，或者单独一口清汤锅吗？"],
        ["Control portions", "这几道可以点半份吗？两个人先点这些够不够？"],
        ["Serious allergy", "我对___严重过敏。请确认这顿饭的锅底、蘸料、食材和备餐区是否含有或会接触___；不能全部确认请直接告诉我，我们就不在这里用餐。"],
        ["Separate tools", "请给我们两套夹子或长筷：一套夹生食，一套夹熟食。"],
        ["Ask for doneness help", "这个怎样才能彻底煮熟？可以请你按店里的方法帮我们煮第一份吗？"],
        ["Check possible charges", "锅底、蘸料、餐具和茶分别收费吗？请先告诉我们。"],
        ["Stop an order", "这道如果还没做，可以取消吗？"],
      ],
    },
    {
      id: "bill-p1",
      type: "paragraph",
      text: "Before paying, compare the bill with the number of plates actually ordered and ask about any broth, dip, tableware or tea line you did not understand. Those charges are restaurant-specific; this guide does not claim they always exist. If mobile payment fails, settle the payment problem separately rather than rushing through the food check. The meal is complete when the table can explain what it ordered, what is cooked, and what remains—not when every square of the grid is full.",
    },
    {
      id: "links",
      type: "internal-links",
      title: "Plan the rest of the meal",
      items: [
        {
          label: "Your first shared meal in China",
          href: "/guides/first-shared-meal-in-china/",
          description: "Seating, shared dishes, tea and the social bill mechanics this hotpot page assumes.",
        },
        {
          label: "Beijing copper-pot mutton",
          href: "/guides/beijing-copper-pot-mutton-ordering-workflow/",
          description: "A clear-broth northern workflow where the meat and sesame dip, not red oil, lead the meal.",
        },
        {
          label: "A balanced first Hunan meal",
          href: "/guides/hunan-cuisine-balanced-first-meal/",
          description: "Another way to manage heat without turning a regional cuisine into a stereotype.",
        },
        {
          label: "Build a regional food route",
          href: "/guides/china-regional-food-route/",
          description: "Decide where Chongqing hotpot fits among meals in several parts of China.",
        },
        {
          label: "Pay in China as a tourist",
          href: "/guides/how-to-pay-in-china-as-a-tourist/",
          description: "Prepare payment backups before a busy restaurant bill arrives.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources",
      items: [
        {
          label: "DB50/T 10011—2024 / DB51/T 10011—2024: hotpot restaurant processing standard",
          url: "https://dbba.sacinfo.org.cn/stdDetail/99a1ec56165591631b46101374aaa5d4996d274a3c88502230d36c273570d6f4",
          publisher: "National Standard Information Public Service Platform",
          reviewedAt: "2026-09-01",
        },
        {
          label: "Seventh municipal intangible-cultural-heritage list",
          url: "https://whlyw.cq.gov.cn/zwgk_221/zcjd/wzjd/202607/t20260709_15810126.html",
          publisher: "Chongqing Culture and Tourism Development Commission",
          reviewedAt: "2026-09-01",
        },
        {
          label: "Chongqing hotpot in the local cultural record",
          url: "https://dfz.cq.gov.cn/zqlswh/rwby_417819/202412/t20241219_13907530.html",
          publisher: "Chongqing Local Chronicles Office",
          reviewedAt: "2026-09-01",
        },
        {
          label: "2026 holiday food-safety consumer notice",
          url: "https://scjgj.cq.gov.cn/zz/tnq/zfxxgkml/spypjglyjczwgkzl/ggfw/spaqxftsjs/202603/t20260331_15581186.html",
          publisher: "Tongnan District Food and Drug Safety Committee Office",
          reviewedAt: "2026-09-01",
        },
        {
          label: "Hotpot consumer guidance",
          url: "https://scjgj.cq.gov.cn/bkzs/xfts/202404/t20240429_13168055.html",
          publisher: "Chongqing Municipal Administration for Market Regulation",
          reviewedAt: "2026-09-01",
        },
        {
          label: "2026 hotpot back-of-house inspection",
          url: "https://scjgj.cq.gov.cn/zz/ddkq/zwxx_146775/bmdt_146776/202608/t20260803_15885400.html",
          publisher: "Dadukou District Administration for Market Regulation",
          reviewedAt: "2026-09-01",
        },
        {
          label: "2026 hotpot food-safety enforcement cases",
          url: "https://scjgj.cq.gov.cn/zfxxgk_225/gsgg/qtgg/202606/t20260615_15754088.html",
          publisher: "Chongqing Municipal Administration for Market Regulation",
          reviewedAt: "2026-09-01",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
