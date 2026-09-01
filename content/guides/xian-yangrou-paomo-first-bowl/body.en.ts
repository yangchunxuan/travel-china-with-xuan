import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Order Xi'an paomo in this order: choose lamb or beef, confirm what the broth contains, ask how this shop handles the bread, and only then accept the amount you will break. For a first solo bowl, Homeground's default is the smallest complete order the shop offers—not a fixed number of breads. Break the confirmed bread into small, even pieces, return the marked bowl as staff directs, and choose a broth style only if it is actually available. Keep chilli paste and pickled garlic separate until you taste the finished bowl. This sequence matters more than performing a supposedly perfect local ritual.",
    },
    {
      id: "answer",
      type: "callout",
      title: "The direct answer",
      tone: "decision",
      body: "No, every visitor is not required to perform one compulsory ritual across Xi'an. Official heritage records document careful hand-breaking in named lineages, but they do not establish one current service process for every restaurant. Ask whether this shop expects you to break the bread and have staff explain today's full handoff before accepting it. If self-breaking is required, aim for small, even pieces rather than dust or large cubes. If time or hand dexterity makes that process unsuitable, ask whether the shop can offer an accessible alternative; none is guaranteed, so choose another dish if it cannot.",
    },
    {
      id: "choice-heading",
      type: "heading",
      level: 2,
      text: "Choose the meat and broth before anyone takes the bowl",
    },
    {
      id: "choice-table",
      type: "table",
      caption: "A first decision based on what you can actually eat",
      columns: ["Your situation", "Practical starting order", "What must be confirmed"],
      rows: [
        [
          "You eat lamb and want the named dish",
          "Ask for 羊肉泡馍 (yangrou paomo) in the smallest complete portion offered",
          "Bread amount, available soup style, meat add-ons and whether accompaniments are included",
        ],
        [
          "You prefer beef",
          "Ask whether 牛肉泡馍 (beef paomo) is available",
          "Whether the broth also contains lamb, lamb bone or another ingredient you avoid",
        ],
        [
          "You are vegetarian or observe a religious boundary",
          "Do not assume bread plus a ‘clear’ soup is suitable; ask for an explicitly confirmed alternative",
          "Stock, fat, meat garnish, condiments and shared preparation; leave if the boundary cannot be confirmed",
        ],
        [
          "You eat lightly or have little time",
          "Ask for the smallest bread and bowl option before breaking anything",
          "Whether self-breaking is required and today's estimated wait from bowl handoff to pickup",
        ],
      ],
    },
    {
      id: "choice-p1",
      type: "paragraph",
      text: "The label `yangrou paomo` names lamb, while many established Xi'an records and menus discuss beef and lamb paomo together. That does not make the two interchangeable for an allergy, religious rule or personal boundary. A beef topping does not disclose the stock, fat or shared preparation. Likewise, the word `qingzhen` (清真) belongs to a business's actual practice and current status; it cannot be inferred from a bowl photograph or from the absence of pork on one menu line. Ask the chosen restaurant, not an image-search caption.",
    },
    {
      id: "diet-warning",
      type: "callout",
      title: "A severe allergy changes the decision",
      tone: "warning",
      body: "Before bread or bowl goes to the kitchen, name the allergen and ask staff to confirm the meat, stock, fat, garnishes, condiments and cross-contact. If they cannot confirm all of them, do not order paomo in that kitchen. Removing visible meat or chilli after cooking does not remove an allergen already present in broth or shared preparation.",
    },
    {
      id: "workflow-heading",
      type: "heading",
      level: 2,
      text: "Follow the bowl from order counter to kitchen and back",
    },
    {
      id: "workflow-p1",
      type: "paragraph",
      text: "Paomo is not simply soup poured over a finished bread bowl. In the named heritage lineages, the diner breaks a dense flatbread called tuotuomo (饦饦馍), and the kitchen cooks those pieces with broth and the ordered ingredients as an individual bowl. A current restaurant will have its own handoff and order-identification process; no citywide version is verified here. Before the bowl leaves you, ask staff to point out what identifies your order and where it goes. Keep whatever record the shop provides with the correct bowl, and follow staff instructions rather than copying the table beside you.",
    },
    {
      id: "workflow-list",
      type: "list",
      ordered: true,
      items: [
        "Read the exact dish name. Distinguish 羊肉泡馍, 牛肉泡馍 and other dishes that merely contain the word 泡馍.",
        "Confirm meat, broth, dietary boundaries, the smallest suitable portion, bread service and any soup-style choice.",
        "Accept only the bread assigned to that order. If the quantity looks large, stop and ask before breaking it.",
        "Handle the bread only as the shop directs. Keep pieces in the assigned bowl; do not mix your group's bowls or order markers.",
        "When finished, show staff the bowl, ask where it goes and what will identify your order. Keep any record the shop provides until the cooked bowl returns.",
        "Check that the returned bowl matches the meat and style ordered before adding chilli, garlic or coriander.",
        "Taste from one area first. Add accompaniments gradually and decide whether you need anything else only after several mouthfuls.",
      ],
    },
    {
      id: "handoff-warning",
      type: "callout",
      title: "Do not lose the order identity",
      tone: "neutral",
      body: "If several people are handling bread, keep each bowl and any shop-provided order record directly in front of its owner. A severe-allergy bowl should not be passed around for comparison. If you can no longer tell whose bowl it is, stop the handoff. If staff cannot reliably restore the meat, broth and dietary boundary from the shop's record, that bowl must not enter the kitchen or be eaten; establish a newly marked order, or leave if a safe identity still cannot be confirmed.",
    },
    {
      id: "break-heading",
      type: "heading",
      level: 2,
      text: "Break for even cooking, not to pass a test of localness",
    },
    {
      id: "break-p1",
      type: "paragraph",
      text: "The Lao Sun Jia, Tong Sheng Xiang and Lao Liu Jia records all describe small pieces; two use the memorable phrase `黄豆粒大小`, roughly soybean-sized. That is useful evidence for those lineages, but it is not permission to mock a beginner or reject a different shop's instruction. Start by splitting the bread, then pinch off compact pieces of similar size. Avoid powder, thin flakes and a few large blocks: the practical goal is a batch the kitchen can cook evenly according to its own method. Show staff an early sample if you are unsure instead of spending twenty minutes on the wrong size.",
    },
    {
      id: "break-table",
      type: "table",
      caption: "What the bowl is telling you before it reaches the kitchen",
      columns: ["What you see", "What to do now", "What not to infer"],
      rows: [
        [
          "The shop gives whole bread and an empty bowl",
          "Ask for the target size and whether every piece should be broken",
          "Every Xi'an shop requires a long hand-breaking ritual",
        ],
        [
          "Staff says this shop handles the bread in a different way",
          "Ask them to show the required process and confirm it belongs to your selected meat and portion before proceeding",
          "A different process makes the meal culturally worthless",
        ],
        [
          "Your pieces are visibly uneven",
          "Pause, show staff, and adjust only if they ask; keep the remaining bread intact until confirmed",
          "Large pieces will automatically be refused or small pieces guarantee quality",
        ],
        [
          "The amount feels too large",
          "Ask whether unbroken bread can be removed from the order before continuing",
          "The documented two-bread method at one lineage is the correct portion for every traveller",
        ],
      ],
    },
    {
      id: "styles-heading",
      type: "heading",
      level: 2,
      text: "Use the four style names as questions, not universal menu promises",
    },
    {
      id: "styles-table",
      type: "table",
      caption: "Four documented relationships between bread and broth",
      columns: ["Name you may see", "Documented idea", "Best question at this shop"],
      rows: [
        [
          "干拔 / 干泡 (ganba / ganpao)",
          "A dry result with little or no free broth after the bread absorbs it",
          "Is this style available today, and is it the driest option?",
        ],
        [
          "口汤 (koutang)",
          "The finished bowl is intended to leave roughly one mouthful of broth",
          "Does your 口汤 use this meaning, and can a first-timer order it?",
        ],
        [
          "水围城 (shuiweicheng)",
          "More broth sits around the central bread and ingredients like a moat",
          "Is this your more soupy cooked style, and how large is the portion?",
        ],
        [
          "单走 (danzou)",
          "Bread and soup travel separately rather than being cooked into one dense bowl",
          "Are bread and soup actually served separately here, and how should I combine them?",
        ],
      ],
    },
    {
      id: "styles-p1",
      type: "paragraph",
      text: "Tong Sheng Xiang and Lao Liu Jia official brand records describe all four, but even their vocabulary differs: one says `干泡`, another `干拔`. A translated menu may flatten them into ‘dry’, ‘soup’ or ‘separate’. Point to the Chinese term and ask what today's kitchen means. If the restaurant offers only one house style, accept that answer or choose a different dish; heritage documentation is not a coupon that obliges the cook to reproduce four versions on demand.",
    },
    {
      id: "eat-heading",
      type: "heading",
      level: 2,
      text: "Taste the bowl before changing it with chilli, garlic or stirring",
    },
    {
      id: "eat-p1",
      type: "paragraph",
      text: "A finished bowl may contain bread, slices of lamb or beef, broth, glass noodles and green aromatics, but ingredients vary. Heritage descriptions at named restaurants pair paomo with sugar-pickled garlic, chilli paste and coriander and describe eating gradually from one part of the bowl. Treat that as a useful way to compare texture, not a rule enforced across the city. Start at one edge, taste broth and bread together, and move inward. Constantly turning the whole bowl makes it harder to notice which pieces stayed firm and which absorbed more broth.",
    },
    {
      id: "eat-list",
      type: "list",
      items: [
        "Check the meat before the first bite. If it is wrong and the distinction matters, stop rather than eating around it.",
        "Taste the unaltered broth first; chilli paste can be salty as well as hot, and it cannot be removed once mixed through.",
        "Use sugar garlic as an optional accompaniment, not as proof of authenticity or a remedy for an ingredient you cannot tolerate.",
        "Keep coriander off the bowl if you dislike it or need the garnish excluded; ask before kitchen handoff when possible.",
        "The bowl can be dense and filling. Pause before ordering more bread, meat or side dishes.",
      ],
    },
    {
      id: "culture-heading",
      type: "heading",
      level: 2,
      text: "Read paomo as living restaurant lineages, not a single ancient-origin tale",
    },
    {
      id: "culture-p1",
      type: "paragraph",
      text: "The strongest evidence is concrete. The national ICH database records Lao Sun Jia's technique as a fifth-batch extension in 2021 and describes a lineage beginning in 1898. The Ministry of Commerce's old-brand museum records Tong Sheng Xiang from 1920 and Lao Liu Jia from 1932. These records also place important paomo traditions within Xi'an's Hui and qingzhen restaurant history. They do not imply that all Hui families cook one way, that every paomo shop is qingzhen, or that a visitor should treat a working restaurant as a staged ethnic performance.",
    },
    {
      id: "timeline-table",
      type: "table",
      caption: "What is securely documented—and at what level",
      columns: ["Record", "What it confirms", "What it does not confirm"],
      rows: [
        [
          "Lao Sun Jia, 1898 lineage date in the national ICH record",
          "A named modern transmission line and its registered protection unit",
          "That the modern bowl has an unbroken recipe back to antiquity",
        ],
        [
          "Tong Sheng Xiang, founded 1920 in the Ministry of Commerce record",
          "A named qingzhen restaurant lineage and its documented house process",
          "That its bread size and four forms bind every other restaurant",
        ],
        [
          "Lao Liu Jia, restaurant history from 1932 in the Ministry record",
          "Another named lineage with overlapping but not identical terminology",
          "That two breads or one cooking method suit every customer",
        ],
        [
          "2021 fifth national ICH list extension",
          "Formal recognition of Lao Sun Jia's traditional noodle-and-bread technique",
          "Certification of every commercial bowl marketed as ‘intangible heritage’",
        ],
      ],
    },
    {
      id: "evidence-warning",
      type: "callout",
      title: "Do not turn lamb-soup stories into a dated recipe",
      tone: "neutral",
      body: "Heritage and brand pages connect paomo to ancient lamb soup, imperial food and Silk Road exchange. Those narratives explain how institutions present cultural meaning; they do not by themselves prove that today's combination of tuotuomo, broth, broken pieces and named soup styles existed unchanged in the Zhou, Han or Tang periods. Enjoy the story, but label it as interpretation rather than a continuous recipe archive.",
    },
    {
      id: "scenario-heading",
      type: "heading",
      level: 2,
      text: "Choose a version that fits the traveller, not an authenticity performance",
    },
    {
      id: "scenario-table",
      type: "table",
      caption: "Four first-bowl situations",
      columns: ["Traveller", "Best working plan", "Exit condition"],
      rows: [
        [
          "Solo light eater",
          "Order the smallest complete meat-and-bread portion offered, hold extra meat and sides, and add nothing until the bowl arrives",
          "If only a large fixed set is sold and sharing or reduction is not allowed, choose another dish",
        ],
        [
          "Two people with different meat preferences",
          "Keep each bowl and any shop-provided order record separate, and confirm each broth; do not swap broken bread",
          "If the kitchen cannot keep the required boundary clear, the affected traveller should not order paomo",
        ],
        [
          "Limited hand dexterity or a child",
          "Explain the dexterity or child-access need before ordering and ask whether the shop can offer a workable process; confirm the portion before kitchen handoff",
          "If the required process does not work for you, choose another meal without treating it as failure",
        ],
        [
          "Tight sightseeing schedule",
          "Before paying, ask whether self-breaking is required and today's estimated wait from bowl handoff to pickup",
          "If the actual wait does not fit, leave before bread is broken rather than pressuring staff to skip the house process",
        ],
      ],
    },
    {
      id: "repair-heading",
      type: "heading",
      level: 2,
      text: "Repair the order before a small mismatch becomes a whole wrong bowl",
    },
    {
      id: "repair-table",
      type: "table",
      caption: "Paomo failure recovery",
      columns: ["Problem", "Recovery", "Do not assume"],
      rows: [
        [
          "You received more bread than expected",
          "Stop breaking and ask whether untouched bread can be removed or the order reduced",
          "All supplied bread must enter the bowl or can be cancelled after breaking",
        ],
        [
          "Pieces are too large or uneven",
          "Show staff before handoff; re-break only as directed and keep the rest intact",
          "The kitchen will reject them, or grinding them into crumbs is safer",
        ],
        [
          "The wrong meat or broth was entered",
          "Have staff correct the order before cooking. For an allergy or religious boundary, do not accept a bowl made with the wrong stock",
          "Visible meat can simply be removed after cooking",
        ],
        [
          "The cooked bowl is drier or soupier than expected",
          "Explain the mismatch and ask whether broth can be adjusted; accept the kitchen's answer about what can still be changed",
          "All four named styles were available or a remake is automatically owed",
        ],
        [
          "You cannot tell which bowl belongs to which order",
          "Stop the handoff or collection and ask staff to match it to the shop's record before cooking or eating. If meat, broth and dietary boundary cannot be restored reliably, start a newly marked order or leave",
          "The nearest similar bowl must be yours",
        ],
        [
          "The meal is too filling",
          "Stop adding sides and eat only what is comfortable; ask the restaurant whether safe packing is possible for that food",
          "Finishing the bowl is required to show respect or prove you understood the culture",
        ],
      ],
    },
    {
      id: "language-heading",
      type: "heading",
      level: 2,
      text: "Use a short Chinese order card before breaking the bread",
    },
    {
      id: "language-p1",
      type: "paragraph",
      text: "Show the Chinese sentence rather than relying on a translated menu category. Ask the restriction questions first, then portion, bread service and soup style. A staff member may answer that an option is unavailable. That is useful information: it lets you change the order while the bread and broth are still separate.",
    },
    {
      id: "language-table",
      type: "table",
      caption: "Ten phrases for one bowl",
      columns: ["Task", "Show this"],
      rows: [
        ["Ask for the first-time process", "第一次吃，请问今天怎么点、怎么掰、掰好交给谁？"],
        ["Choose lamb or beef", "有羊肉泡馍和牛肉泡馍吗？"],
        ["Check beef broth", "牛肉泡馍的汤里有羊肉、羊骨或羊油吗？"],
        ["State a severe allergy", "我对___严重过敏。请确认肉、汤、油脂、配菜、调味和备餐过程是否含有或接触___。任何一项不能确认，请直接告诉我；我就不在这里用餐。"],
        ["State a religious food boundary", "我不吃___，汤、油、配料和共用备餐也不能有___。不能确认，我就不点。"],
        ["Ask for the smallest portion", "一个人吃，请给我最小份；要掰多少馍？"],
        ["Ask about bread service", "这家店今天需要客人自己掰馍吗？请告诉我完整流程。"],
        ["Ask about soup style", "今天可以做口汤、水围城、干拔或单走吗？"],
        ["Keep condiments separate", "辣酱、香菜和糖蒜请分开。"],
        ["Repair the handoff", "这碗是谁的？请先帮我核对肉、汤和订单。不能确认，我就不吃这碗。"],
      ],
    },
    {
      id: "bill-p1",
      type: "paragraph",
      text: "Before paying, check the meat, base bowl, extra meat, extra bread, accompaniments and any items you cancelled. A broken bread portion may already be committed to the kitchen, so ask before assuming it can be removed. Keep whatever record the shop gives you until the bowl returns and the bill is settled. The most successful first paomo is not the one with the most ceremony; it is the one whose meat, broth, portion and handoff you understood before the cooking began.",
    },
    {
      id: "links",
      type: "internal-links",
      title: "Connect the bowl to the rest of the trip",
      items: [
        {
          label: "Build a regional food route",
          href: "/guides/china-regional-food-route/",
          description: "Decide where one dense Xi'an paomo meal fits among food stops in several regions.",
        },
        {
          label: "Your first shared meal in China",
          href: "/guides/first-shared-meal-in-china/",
          description: "Use the broader seating, sharing, tea and bill etiquette around this individual-bowl workflow.",
        },
        {
          label: "Where to stay in Xi'an",
          href: "/guides/xian-where-to-stay-city-wall-or-dayanta/",
          description: "Choose a base before fitting a sit-down paomo meal into a city day.",
        },
        {
          label: "Pay in China as a tourist",
          href: "/guides/how-to-pay-in-china-as-a-tourist/",
          description: "Prepare a payment backup before ordering in a busy restaurant.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Sources",
      items: [
        {
          label: "Traditional noodle technique: Lao Sun Jia yangrou paomo",
          url: "https://www.ihchina.cn/art/detail/id/23792.html",
          publisher: "China Intangible Cultural Heritage Network",
          reviewedAt: "2026-09-01",
        },
        {
          label: "Fifth national intangible-cultural-heritage list",
          url: "https://www.gov.cn/gbgl/92e7fad3d97742f1b1b2beb1fda9c049/files/8525ced0638e4480a1368790d9433924.pdf",
          publisher: "State Council of the People's Republic of China",
          reviewedAt: "2026-09-01",
        },
        {
          label: "Tong Sheng Xiang old-brand and technique record",
          url: "https://lzhbwg.mofcom.gov.cn/edi_ecms_web_front/thb/detail/8ea7499ff4034e3ebc602297ac323064",
          publisher: "Ministry of Commerce Old Brands Digital Museum",
          reviewedAt: "2026-09-01",
        },
        {
          label: "Lao Liu Jia old-brand and technique record",
          url: "https://lzhbwg.mofcom.gov.cn/edi_ecms_web_front/thb/detail/eb84796a9f21424b954a50e5096b052a",
          publisher: "Ministry of Commerce Old Brands Digital Museum",
          reviewedAt: "2026-09-01",
        },
        {
          label: "Xi'an's recommendatory traditional-snack technical rules",
          url: "https://food.cctv.com/2016/05/27/ARTIzSSaSzalUFiPIBNBOCPO160527.shtml",
          publisher: "Xinhua via CCTV",
          reviewedAt: "2026-09-01",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
