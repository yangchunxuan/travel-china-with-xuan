import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "For a first shared meal in China, do not try to perform a perfect set of ‘Chinese table manners.’ Follow the table. Let the organiser indicate seats, state dietary needs before the order is sent, take shared food in small amounts, use serving utensils when they are provided, and clarify the bill instead of assuming. The common structure is several dishes for the table, but who orders, when rice arrives, whether tea is charged and who pays can change with the region, restaurant, family and purpose of the meal.",
    },
    {
      id: "scope-heading",
      type: "heading",
      level: 2,
      text: "The meal this guide is walking through",
    },
    {
      id: "scope-comparison",
      type: "comparison",
      columns: [
        {
          heading: "Our main scene",
          body:
            "Three to six friends or relatives at an ordinary sit-down restaurant in mainland China. Someone may have invited the group, but this is not a ceremonial occasion.",
        },
        {
          heading: "What can still change",
          body:
            "Regional cuisine, family habits, age, restaurant style, dietary or religious needs, group budget and whether one person clearly said they were treating.",
        },
        {
          heading: "Different meal systems",
          body:
            "A business banquet, wedding, hotpot, tabletop barbecue, fast-food meal, private home meal or Guangzhou morning tea has additional mechanics and should not be forced into this script.",
        },
      ],
    },
    {
      id: "national-code-warning",
      type: "callout",
      title: "There is no single national table code",
      body:
        "Formal etiquette guides document honour seats, hosts and serving order. Those conventions can matter when a table is visibly formal, but they do not prove that every casual family or friend group follows the same diagram. In an ordinary meal, a short pause and a simple question are more respectful than announcing a rule to the people who invited you.",
      tone: "warning",
    },
    {
      id: "evidence-levels",
      type: "callout",
      title: "How strongly to read the advice",
      body:
        "Shared dishes are a well-documented dining pattern. Public-chopstick and anti-waste guidance appears in current standards and law. Seating rank, tea habits, the first person to eat and the payer are context-dependent. Homeground's recommendations—watch, ask and take a small first portion—are low-risk traveller defaults, not claims about every Chinese person.",
      tone: "neutral",
    },
    {
      id: "meal-map-heading",
      type: "heading",
      level: 2,
      text: "The whole meal in seven moments",
    },
    {
      id: "meal-map",
      type: "table",
      caption: "A first shared meal from arrival to goodbye",
      columns: ["Moment", "What may happen", "Your safest default"],
      rows: [
        [
          "1. Sit",
          "A host may indicate places, or friends may choose freely.",
          "Pause, then ask where to sit if it is not obvious.",
        ],
        [
          "2. Order",
          "One person may lead a paper, staff or QR order for the table.",
          "State allergies, non-negotiable restrictions and budget concerns before the order is submitted.",
        ],
        [
          "3. Tea and drinks",
          "Tea, water or other drinks may be offered, automatic, chargeable or absent.",
          "Accept or decline plainly; ask about a charge if it matters.",
        ],
        [
          "4. Begin",
          "Dishes may arrive one at a time rather than in a fixed course order.",
          "Follow the table's cue; you need not wait for every dish if everyone has begun.",
        ],
        [
          "5. Share",
          "Central dishes, a rotating tray and serving utensils may appear in different combinations.",
          "Take a small amount to your own bowl or plate and avoid interrupting someone who is serving.",
        ],
        [
          "6. Pay",
          "A clear host may treat, friends may split, or regular companions may take turns.",
          "Clarify the social arrangement before arguing about the payment method.",
        ],
        [
          "7. Close",
          "The table slows, leftovers are packed and the organiser signals departure.",
          "Say you have eaten well, thank the group and leave with the group rather than staging an etiquette performance.",
        ],
      ],
    },
    {
      id: "sit-heading",
      type: "heading",
      level: 2,
      text: "1. Arrive, then let the table show you where to sit",
    },
    {
      id: "sit-body",
      type: "paragraph",
      text:
        "If someone reserved the restaurant or invited you, give them a moment to organise the table. They may place an older relative, a guest or the person handling staff in a particular seat. At a casual meal, the choice may be as ordinary as making space for a child, avoiding a draught or putting the best Mandarin speaker near the server. You do not need to calculate which direction is most honourable. ‘Where should I sit?’ solves the actual problem.",
    },
    {
      id: "seating-contexts",
      type: "table",
      caption: "Read the table before applying a seating rule",
      columns: ["Context", "Likely signal", "Visitor response"],
      rows: [
        [
          "Casual friends",
          "People sit wherever conversation and space work.",
          "Choose an open place after a brief pause.",
        ],
        [
          "Family with a clear organiser",
          "Someone gestures to a seat or keeps places for relatives.",
          "Take the offered seat without turning it into a debate about rank.",
        ],
        [
          "A visibly formal table",
          "Place cards, a private room, a planned host and guests waiting for direction.",
          "Follow the organiser. Formal banquet and business etiquette sit outside this guide.",
        ],
      ],
    },
    {
      id: "order-heading",
      type: "heading",
      level: 2,
      text: "2. Order for the table, but protect your own limits early",
    },
    {
      id: "order-body",
      type: "paragraph",
      text:
        "A shared meal is usually assembled as a group rather than as one entrée per person. The person who knows the restaurant, invited the group or can operate the menu may lead. That does not make other diners silent passengers: preferences, allergies, religious restrictions and budget limits are useful before the order is sent. A paper menu, a QR menu and staff ordering are all possible; no one interface can be assumed nationwide.",
    },
    {
      id: "ordering-table",
      type: "table",
      caption: "Five decisions before the order goes through",
      columns: ["Decision", "What to ask", "Why it matters"],
      rows: [
        [
          "Portion size",
          "How many people is this dish meant to serve?",
          "A photo rarely shows scale, and dish size changes by restaurant.",
        ],
        [
          "Table balance",
          "Do we have something everyone can eat, a vegetable and enough substance for the group?",
          "Balance should follow this table's tastes, not a formula such as ‘one dish per person plus one.’",
        ],
        [
          "Staple food",
          "Are rice, noodles, buns or another staple being ordered, and should it come now?",
          "Rice is not automatically included with every restaurant dish and may arrive at a different point.",
        ],
        [
          "Restrictions",
          "What ingredient must be absent, and can the kitchen manage cross-contact?",
          "A vegetable-looking dish or a menu icon is not enough for a serious requirement.",
        ],
        [
          "Quantity and price",
          "Can we start with less and add? Are any market-price or extra charges clear?",
          "A smaller first order is easier to repair than an oversized table.",
        ],
      ],
    },
    {
      id: "dietary-warning",
      type: "callout",
      title: "An allergy is not an etiquette test",
      body:
        "Show the ingredient in written Chinese, describe the reaction as an allergy rather than a preference, and ask before the group order is submitted. If the restaurant cannot answer clearly about ingredients or cross-contact, choose another dish or venue. A host's wish to share food never outranks medical safety.",
      tone: "warning",
    },
    {
      id: "useful-phrases",
      type: "table",
      caption: "Useful Mandarin before the order is sent",
      columns: ["Chinese", "Pinyin", "Use"],
      rows: [
        ["这个菜够几个人吃？", "Zhège cài gòu jǐ ge rén chī?", "How many people will this dish serve?"],
        ["我们先少点，不够再加。", "Wǒmen xiān shǎo diǎn, bú gòu zài jiā.", "Let's start with less and add more if needed."],
        ["我对___过敏。", "Wǒ duì ___ guòmǐn.", "I am allergic to ___."],
        ["我不吃___。", "Wǒ bù chī ___.", "I don't eat ___."],
        ["主食现在上吗？", "Zhǔshí xiànzài shàng ma?", "Should the staple come now?"],
      ],
    },
    {
      id: "tea-heading",
      type: "heading",
      level: 2,
      text: "3. Treat tea as part of this table, not a national ceremony",
    },
    {
      id: "tea-body",
      type: "paragraph",
      text:
        "Tea may be poured before ordering, listed as a paid item, replaced by hot water or bottled drinks, or never appear. If a pot is being passed and sits near you, offering to refill a nearby cup is considerate; if staff handle it, let them. A spoken xièxie is sufficient when someone serves you. You are not being examined on a silent hand signal.",
    },
    {
      id: "tea-variation",
      type: "callout",
      title: "Tea customs are especially local",
      body:
        "Do not assume tea is free, compulsory or served the same way in every city. Check a listed tea or service charge when ordering or reviewing the bill. Guangzhou morning tea is a separate regional dining system; it is intentionally not explained here.",
      tone: "decision",
    },
    {
      id: "dishes-heading",
      type: "heading",
      level: 2,
      text: "4. When dishes arrive, wait for a cue—not an imaginary gong",
    },
    {
      id: "start-body",
      type: "paragraph",
      text:
        "A cold dish may already be on the table, hot dishes may arrive whenever they are ready, and a staple or soup can appear early or late. If people pause for the organiser, pause with them. When someone says chī ba—‘let's eat’—or the table begins serving, join in. At a relaxed meal, people may start while later dishes are still cooking. ‘Always wait for the oldest person’ is too rigid for every family and setting.",
    },
    {
      id: "sharing-table",
      type: "table",
      caption: "How to handle the shared centre of the table",
      columns: ["What you see", "Useful action", "What not to assume"],
      rows: [
        [
          "Serving chopsticks or spoon",
          "Use it to move food to your own bowl or plate, then return it to the dish.",
          "Colour and length are not standard everywhere; ask which utensil is shared if unclear.",
        ],
        [
          "A rotating tray",
          "Wait until another diner has finished serving, then turn it gently.",
          "Not every table has one, and clockwise is not a moral rule.",
        ],
        [
          "No obvious serving utensil",
          "Ask for gōngkuài or a serving spoon, especially when hygiene matters to you.",
          "Its absence does not prove that the group is careless or that you must copy one method.",
        ],
        [
          "Someone offers food into your bowl",
          "Accept a small amount if comfortable, or decline plainly for an allergy, restriction or fullness.",
          "The gesture may express care, but accepting every bite is not compulsory.",
        ],
        [
          "A dish that is awkward to divide",
          "Let the most confident diner or server portion it, or ask for help.",
          "You do not have to demonstrate skill with a whole fish, bone or slippery piece.",
        ],
      ],
    },
    {
      id: "public-chopsticks",
      type: "callout",
      title: "Public chopsticks are a modern hygiene norm, not proof of identical practice",
      body:
        "China's current separate-dining standard and many local rules support public chopsticks and serving spoons. Use them when supplied and request them when useful. Actual provision still differs by restaurant and household. If another diner uses personal chopsticks to offer you food, handle the relationship kindly while keeping your own health boundary.",
      tone: "neutral",
    },
    {
      id: "chopstick-basics",
      type: "list",
      items: [
        "Do not leave chopsticks standing vertically in rice or another dish; place them on a rest or beside your bowl.",
        "Do not point at a person, drum on bowls or search through a shared dish for one preferred piece.",
        "Take a manageable bite to your bowl rather than holding food above the table while talking.",
        "If chopsticks are difficult, ask for a spoon or fork. Practical control is more courteous than dropping food repeatedly to prove a point.",
      ],
    },
    {
      id: "pace-heading",
      type: "heading",
      level: 2,
      text: "5. Eat in rounds and let conversation set the pace",
    },
    {
      id: "pace-body",
      type: "paragraph",
      text:
        "Take a small portion, eat it from your own bowl or plate, and return to dishes you enjoy. This leaves room for everyone and for later dishes. A shared meal can be lively or quiet; volume, slurping, toasts and phone use vary too much to describe as one Chinese personality. Notice what this table is doing. A sincere comment about a dish or local flavour is warmer than praising every plate mechanically.",
    },
    {
      id: "leftover-myth",
      type: "callout",
      title: "Do not deliberately waste food to prove you are full",
      body:
        "Older etiquette lists sometimes tell guests to leave food so a host appears generous. That is not a safe contemporary default. China's Anti-Food Waste Law and current public guidance promote appropriate ordering and packing leftovers. You do not need to clear every communal plate personally, but you also do not need to manufacture leftovers as a compliment.",
      tone: "warning",
    },
    {
      id: "pay-heading",
      type: "heading",
      level: 2,
      text: "6. Decide who is paying before worrying about how",
    },
    {
      id: "pay-body",
      type: "paragraph",
      text:
        "The social arrangement and the payment channel are separate questions. If someone clearly invited you and said wǒ qǐng—‘my treat’—they will often expect to pay. A group of peers may split the total. Friends who eat together repeatedly may take turns, settling fairness across several meals rather than this receipt. None of those systems is uniquely or universally Chinese.",
    },
    {
      id: "paying-contexts",
      type: "table",
      caption: "Four bill situations and a low-drama response",
      columns: ["Situation", "Likely arrangement", "Good response"],
      rows: [
        [
          "A clear invitation",
          "The inviter intends to treat.",
          "Offer once if appropriate; if they confirm, thank them and consider reciprocating another time.",
        ],
        [
          "Friends planned the meal together",
          "Split, one person paying and collecting transfers, or an established rotation are all possible.",
          "Ask ‘How are we splitting this?’ before someone reaches the cashier.",
        ],
        [
          "You explicitly invited everyone",
          "Your wording may have sounded like an offer to host.",
          "Be ready to pay, or clarify the budget and split when arranging the meal rather than at the last second.",
        ],
        [
          "No one is sure",
          "The ambiguity is real; etiquette will not solve it silently.",
          "Use a direct, friendly question. Do not grab phones, block the cashier or turn generosity into a physical contest.",
        ],
      ],
    },
    {
      id: "paying-phrases",
      type: "table",
      caption: "Useful Mandarin at the bill",
      columns: ["Chinese", "Pinyin", "Meaning"],
      rows: [
        ["这顿我请。", "Zhè dùn wǒ qǐng.", "This meal is on me."],
        ["我们AA吧。", "Wǒmen AA ba.", "Let's split the bill."],
        ["怎么分？", "Zěnme fēn?", "How shall we divide it?"],
        ["谢谢，下次我请。", "Xièxie, xià cì wǒ qǐng.", "Thank you; I'll treat next time."],
      ],
    },
    {
      id: "tipping-callout",
      type: "callout",
      title: "A tip and a service charge are not the same thing",
      body:
        "Tipping is not generally expected at an ordinary mainland Chinese restaurant. A hotel, premium venue or particular restaurant may list a service charge; that should be disclosed as part of the price, not invented by the diner as a cultural obligation. Review the itemised bill and follow the venue's stated charge.",
      tone: "decision",
    },
    {
      id: "close-heading",
      type: "heading",
      level: 2,
      text: "7. Finish without turning the goodbye into another ritual",
    },
    {
      id: "closing-steps",
      type: "list",
      ordered: true,
      items: [
        "When you are full, say ‘Wǒ chī hǎo le, xièxie’—‘I've eaten well, thank you’—instead of accepting food until uncomfortable.",
        "If dishes remain, ask whether the group wants them packed. Packing food is a practical close, not an admission that the meal failed.",
        "Thank the inviter and the other diners. Mentioning one dish you genuinely enjoyed is enough.",
        "Complete any agreed reimbursement privately and promptly; the restaurant bill and the group's internal split need not happen at the same moment.",
        "Check belongings and follow the group's departure cue. If someone treated, ‘next time is on me’ is useful only when you genuinely expect another meeting.",
      ],
    },
    {
      id: "home-meal-note",
      type: "callout",
      title: "At a private home, the household matters more",
      body:
        "The sharing principles may look familiar, but the ordering and restaurant-bill stages disappear. Family routines around seats, serving elders, shoes, kitchen help and leftovers can be stronger or looser than anything in this guide. Follow the host, state health needs early, and offer to help once without insisting after they answer. A full home-visit guide needs its own treatment.",
      tone: "neutral",
    },
    {
      id: "final-connection",
      type: "callout",
      title: "The goal is participation, not imitation",
      body:
        "A good first shared meal is one where the table can understand your needs and you can notice how this particular group cares for one another. If you want human help choosing restaurants for a China route, explaining allergies or finding a local food experience that fits your group, Homeground can discuss the context without pretending one table represents the whole country.",
      tone: "decision",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue from one shared table",
      items: [
        { label: "Prepare for Lunar New Year customs as a visitor", href: "/guides/lunar-new-year-customs-for-visitors/", description: "Carry the same observe-first approach into a family festival without treating one household as a national script." },
        { label: "Understand China's community canteens", href: "/guides/china-community-canteens-explained/", description: "Compare a shared restaurant table with a neighbourhood public-service model without assuming access or eligibility." },
        { label: "Read Zhenjiang's living vinegar culture", href: "/guides/zhenjiang-vinegar-living-fermentation/", description: "Follow one familiar condiment into fermentation craft and city identity, not a health or authenticity shortcut." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and academic sources checked on 11 August 2026",
      items: [
        {
          label: "Solo Dining in Chinese Restaurants: A Mixed-Method Study in Macao — communal-dining literature and regional variation",
          url: "https://shura.shu.ac.uk/26655/3/17th%20July%20%20-%202020%20Accepted%20version%20solo%20dining%20body%20.pdf",
          publisher: "Sheffield Hallam University Research Archive",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Food, eating behavior, and culture in Chinese society",
          url: "https://www.sciencedirect.com/science/article/pii/S2352618115000657",
          publisher: "Journal of Ethnic Foods",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Geography and similarity of regional cuisines in China",
          url: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0079161",
          publisher: "PLOS ONE",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Guide to table etiquette in China — formal seating, shared utensils and bill conventions",
          url: "https://english.shanghai.gov.cn/en-LearnChinese/20240910/e8fe407acb494a41a5836f606eedf44b.html",
          publisher: "Shanghai Municipal People's Government",
          reviewedAt: "2026-08-11",
        },
        {
          label: "GB/T 39002-2020 Guidance on individual dining system in catering service — current standard record",
          url: "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=C07AF2A9821A56C245A1A6465A016787",
          publisher: "State Administration for Market Regulation and Standardization Administration of China",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Anti-Food Waste Law of the People's Republic of China",
          url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2023/art_5f92392ecaa14e048bd9a673715c20ca.html",
          publisher: "State Administration for Market Regulation",
          reviewedAt: "2026-08-11",
        },
        {
          label: "2026 examples of preventing catering food waste",
          url: "https://www.ndrc.gov.cn/xwdt/dt/sjdt/202605/t20260511_1405151.html",
          publisher: "National Development and Reform Commission and State Administration for Market Regulation",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Relational settlement and obligation — rotating payment and ability-based contribution",
          url: "https://sociology.ssap.com.cn/skwx_shx/LiteratureDetail.aspx?id=1057415",
          publisher: "Social Sciences Academic Press sociology database",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Guidance on tips and disclosed service charges",
          url: "https://whlyj.sh.gov.cn/flzs/20160906/0022-47.html",
          publisher: "Shanghai Municipal Administration of Culture and Tourism",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Chinese chopsticks and table-culture education — upright chopsticks, pointing and searching a dish",
          url: "https://news.blcu.edu.cn/info/1034/34618.htm",
          publisher: "Beijing Language and Culture University",
          reviewedAt: "2026-08-11",
        },
        {
          label: "2026 restaurant price-disclosure guidance — a current Fujian example, not a nationwide rule",
          url: "https://scjgj.quanzhou.gov.cn/xxgk/gsyw/202602/t20260214_3268329.htm",
          publisher: "Quanzhou Administration for Market Regulation",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Hero photograph: Chinese meal in Suzhou — ZiCheng Xu, modified crop",
          url: "https://commons.wikimedia.org/wiki/File:Chinese_meal.jpg",
          publisher: "Wikimedia Commons · CC BY-SA 2.5",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Creative Commons Attribution-ShareAlike 2.5 licence",
          url: "https://creativecommons.org/licenses/by-sa/2.5/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-11",
        },
      ],
    },
  ],
};

export default body;
