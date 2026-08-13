import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "A classic Nanchang breakfast puts two separate orders together: Nanchang Banfen (南昌拌粉), cooked rice noodles tossed with seasonings and garnishes, and Waguan Tang (瓦罐汤), soup slowly cooked in a small earthenware crock. Nanchang government food introductions repeatedly present the pair as a representative local breakfast. That establishes the pairing, not one compulsory recipe, shop or soup. Your task at the counter is to identify the noodle form, choose one available soup by ingredient, and set chilli and portion before the bowl is mixed."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "What should a first-timer order?",
      body: "Order one portion of Nanchang Banfen and one crock soup whose main ingredient you recognize. A plain meat-patty, radish-and-rib or lotus-root-and-rib soup is an editorially practical starting point when that shop actually lists it; it is not an official ranking. Ask for less chilli before mixing, and share one set if your group wants to sample without committing to two full noodle portions.",
      tone: "decision"
    },
    {
      id: "menu-heading",
      type: "heading",
      level: 2,
      text: "Decode the noodle side of the board"
    },
    {
      id: "menu-table",
      type: "table",
      caption: "Three similar-looking names lead to different breakfasts",
      columns: ["Menu words", "What arrives", "Useful question"],
      rows: [
        ["南昌拌粉 / 拌粉", "Rice noodles drained and mixed with a seasoned dressing and shop-specific garnishes", "‘Is the chilli already mixed in?’ 辣椒已经拌进去了吗？"],
        ["炒粉", "Rice noodles stir-fried in a wok rather than drained and mixed; oil, heat and preparation vary by shop", "‘Is this stir-fried?’ 这个是炒的吗？"],
        ["汤粉", "Rice noodles served in broth as one bowl", "‘Does this already include soup?’ 这个本来就带汤吗？"],
        ["瓦罐汤", "A separate soup cooked and served from an earthenware crock; it is not a clay-pot rice dish", "‘Which crock soups are left?’ 现在哪些瓦罐汤还有？"]
      ]
    },
    {
      id: "meal-heading",
      type: "heading",
      level: 2,
      text: "Build the meal in counter order"
    },
    {
      id: "meal-workflow",
      type: "list",
      ordered: true,
      items: [
        "Look for `南昌拌粉` or `拌粉`; point to it rather than saying only ‘noodles’, which could produce fried or soup noodles.",
        "Choose chilli before the server tosses the bowl: `少辣` for less, `不要辣椒` for none, or `辣椒另外放` to keep it on the side. Confirm whether chilli oil or sauce is already in the base.",
        "Scan the soup list for a main ingredient you can identify. Meat-patty, pork-rib, radish, lotus root, kelp, tea-tree mushroom and egg combinations appear on one verifiable Nanchang chain’s menu, but stock and recipes vary by branch and day.",
        "Ask which crock is available now. Soup can be sold out even while its permanent board or online product page remains visible.",
        "Set quantity: one noodles plus one soup per hungry adult is straightforward; one complete set shared by two light eaters is a lower-risk tasting order. Ask whether a noodle portion comes in different sizes rather than assuming.",
        "Pay according to the shop’s current sequence, collect any number or receipt, and check whether you pick up noodles and soup at separate windows.",
        "Mix the noodles thoroughly before deciding they are bland. Seasoning can sit under the rice noodles; add side chilli gradually rather than pouring it all in."
      ]
    },
    {
      id: "soup-heading",
      type: "heading",
      level: 2,
      text: "Choose soup by ingredient and appetite, not by a universal hierarchy"
    },
    {
      id: "soup-comparison",
      type: "comparison",
      title: "Three practical soup families",
      columns: [
        {"heading": "Meat-patty soups", "body": "Examples on a current first-party menu include plain, egg, mushroom and century-egg meat-patty soup. They make the protein explicit but can still contain ingredients or seasoning not visible in the name. Ask about egg, mushroom and processed meat if relevant."},
        {"heading": "Pork-rib soups", "body": "Radish, lotus root, kelp or tea-tree mushroom may accompany ribs. Pick by a familiar vegetable and confirm bone-in pork. The named ingredient does not establish a light sodium level or one standard broth."},
        {"heading": "Unknown or seasonal crocks", "body": "Read or ask for the two main ingredients before ordering. A handwritten item or seasonal soup may be excellent, but a photograph, crock colour or neighbouring table cannot safely identify meat, allergens or price."}
      ]
    },
    {
      id: "phrases-heading",
      type: "heading",
      level: 2,
      text: "Six phrases that solve the actual counter problems"
    },
    {
      id: "phrases-table",
      type: "table",
      caption: "Show the Chinese line if the room is noisy",
      columns: ["Need", "Chinese", "Meaning"],
      rows: [
        ["Basic pair", "一份南昌拌粉，再要一罐这个汤。", "One Nanchang Banfen, plus one crock of this soup."],
        ["Less chilli", "拌粉少辣，谢谢。", "Less chilli in the mixed noodles, please."],
        ["No chilli", "不要辣椒，底料也不要辣。", "No chilli; please make the base non-spicy too."],
        ["Chilli aside", "辣椒另外放。", "Put the chilli on the side."],
        ["Availability", "这个汤还有吗？没有的话，现在哪个有？", "Is this soup left? If not, which one is available now?"],
        ["Ingredients", "这个汤里有什么？有花生、蛋或者猪肉吗？", "What is in this soup? Does it contain peanuts, egg or pork?"]
      ]
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two breakfasts that do not require guessing"
    },
    {
      id: "traveller-scenarios",
      type: "comparison",
      title: "Adjust the same local pair to the traveller",
      columns: [
        {"heading": "Solo traveller who eats mild food", "body": "Ask for one Banfen with chilli on the side, then select one currently available soup with a familiar ingredient. Photograph the menu text rather than the food if you want to remember the name. Taste the mixed base before adding any chilli."},
        {"heading": "Family or group sampling breakfast", "body": "Start with fewer noodle portions than diners and two differently named soups only if staff confirm both ingredients. Put chilli aside for the table. Order a second noodle after seeing portion size; do not make one person’s tolerance the group setting."}
      ]
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "Recover from sell-outs, heat and ordering mistakes"
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "Do the next useful thing instead of restarting the meal",
      columns: ["Failure", "Recovery"],
      rows: [
        ["Your chosen soup is sold out", "Ask which crocks are physically available. Switch within a known family—another rib soup or another meat-patty soup—only after confirming its added ingredient."],
        ["All crock soups are sold out", "Keep the Banfen if you still want it, reduce chilli, and do not let a seller relabel an unrelated bowl as Waguan Tang. Try the pair another morning."],
        ["The noodles are much hotter than requested", "Stop adding sauce, mix from the bottom to distribute it, and ask whether an unseasoned portion can be remade. Soup may soften the meal but is not guaranteed to remove chilli already mixed in."],
        ["You received fried or soup noodles", "Show `拌粉` on the board or your saved text. Decide whether to keep the different dish before asking for a remake; do not insist that every rice-noodle bowl is interchangeable."],
        ["The portion is larger than expected", "Share before ordering more. Confirm whether the shop allows takeaway and use a clean container; do not return shared food to a communal condiment station."],
        ["An ingredient or allergy remains unclear", "Do not infer from a photo. Ask staff to check the recipe or choose a clearly labelled alternative; kitchens and shared utensils may still involve cross-contact."]
      ]
    },
    {
      id: "evidence-boundary",
      type: "callout",
      title: "Representative does not mean identical everywhere",
      body: "Government sources support Banfen plus Waguan Tang as a recognizable Nanchang breakfast and document efforts to standardize and promote local food. They do not prove that every shop uses one recipe, that every listed soup is available, or that a recognized brand is automatically the best choice. The named soup examples here come from one operator’s own menu checked on 13 August 2026; they are menu evidence, not a citywide inventory.",
      tone: "warning"
    },
    {
      id: "final-check",
      type: "list",
      items: [
        "Before leaving for breakfast, verify that the specific branch still serves morning noodles and crock soups; no universal opening time is assumed.",
        "At the board, confirm `拌粉`, chilli level, soup name, current stock, quantity and price before paying.",
        "For dietary restrictions, ask about the full base, garnish and soup—not only the ingredient visible in the title.",
        "When saving a food photograph, record the shop, date and exact receipt/menu name. If staff did not identify the soup, caption it only as an unidentified crock soup.",
        "Menus, stock, portion, price and branch hours were last checked on 13 August 2026 and remain dynamic."
      ]
    },
    {
      id: "links",
      type: "internal-links",
      title: "Continue with regional breakfast and table skills",
      items: [
        {"label": "Browse Homeground’s China guides", "href": "/guides/", "description": "Return to the complete guide collection."},
        {"label": "Build a Wuhan breakfast route", "href": "/guides/wuhan-breakfast-hot-dry-noodles-doupi-route/", "description": "Compare another rice-noodle breakfast with a different ordering rhythm."},
        {"label": "Choose a balanced first Hunan meal", "href": "/guides/hunan-cuisine-balanced-first-meal/", "description": "Use a regional-food framework that manages heat and variety."},
        {"label": "Navigate your first shared meal in China", "href": "/guides/first-shared-meal-in-china/", "description": "Carry ordering, sharing and paying skills into a group meal."}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and first-party sources checked on 13 August 2026",
      items: [
        {"label": "Nanchang breakfast: mixed rice noodles and crock soup", "url": "https://sgj.nc.gov.cn/ncsgj/mlnc/202105/abbc06c46e8e47518fde111b31cae22f.shtml", "publisher": "Nanchang Administration for Market Regulation", "reviewedAt": "2026-08-13"},
        {"label": "Nanchang food introduction", "url": "https://www.nc.gov.cn/ncszf/jrnc/202601/f817b2e448964eb59971056204e053cd.shtml", "publisher": "Nanchang People’s Government", "reviewedAt": "2026-08-13"},
        {"label": "Implementation opinion on Nanchang food development", "url": "https://www.nc.gov.cn/ncszf/xxgkzcwj/201806/9c230f5447d44de184cf2da71eee89be.shtml", "publisher": "Nanchang People’s Government", "reviewedAt": "2026-08-13"},
        {"label": "Current product menu", "url": "https://www.wanfangyuan.com/chanpinzhongxin", "publisher": "Wanfangyuan", "reviewedAt": "2026-08-13"},
        { label: "Hero left photograph: stirred rice noodles in Nanchang, N509FZ (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:Stirred_rice_noodles_in_Nanchang_(20190619174747).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" },
        { label: "Hero right photograph: Nanchang clay-pot soup breakfast, Qa003qa003 (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:%E7%93%A6%E7%BD%90%E6%B1%A4_20150119_085552.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
