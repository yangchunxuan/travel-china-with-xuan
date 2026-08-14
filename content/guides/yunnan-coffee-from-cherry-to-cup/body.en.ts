import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "Yunnan coffee is not one flavour. Trace a lot through place and variety, cherry selection, processing, drying, hulling, green-bean trade, roasting and brewing. More Yunnan businesses now preserve those stages instead of selling anonymous bulk green coffee, but a policy target, ‘specialty’ claim or the word Yunnan cannot prove a particular bag."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "The shortest way to read a Yunnan coffee",
      body: "Find five linked facts: a location narrower than the province, producer or station, variety, harvest and process, and roaster with roast date. Ask whether they follow one lot or were assembled as marketing copy. Every stage can add value or break traceability.",
      tone: "decision"
    },
    {
      id: "scope-heading",
      type: "heading",
      level: 2,
      text: "What ‘from Yunnan’ does—and does not—locate"
    },
    {
      id: "scope",
      type: "paragraph",
      text: "Coffee grows in warm parts of Pu’er, Baoshan, Lincang, Dehong, Xishuangbanna and elsewhere in mountainous Yunnan. Conditions vary within each area. A lot may be one estate, several smallholders delivering to a station, or a regional blend. ‘Yunnan’ is valid but coarse; a narrower name helps only when the seller connects it to the batch."
    },
    {
      id: "chain-heading",
      type: "heading",
      level: 2,
      text: "The chain has nine handoffs"
    },
    {
      id: "chain-table",
      type: "table",
      caption: "Follow the batch rather than a generic bean",
      columns: ["Stage", "What changes", "Evidence worth keeping"],
      rows: [
        ["1. Place and variety", "Site and genetics set raw material, not one taste.", "Origin, producer or collection area, and variety."],
        ["2. Picking", "Ripeness variation enters or is removed from the lot.", "Harvest period and selective-picking or sorting method."],
        ["3. Reception", "An estate, cooperative or station sorts and may combine fruit.", "Delivery code and separation rules."],
        ["4. Primary processing", "Skin, pulp and mucilage are removed before or after drying.", "Washed, natural, honey or a described experimental protocol."],
        ["5. Drying", "Water is reduced for storage and hulling.", "Equipment, dates, separation and moisture record."],
        ["6. Hulling and grading", "Parchment or husk is removed; beans are sorted.", "Mill, preparation specification and retained lot identity."],
        ["7. Green-bean trade", "Coffee is sampled, stored and sold unroasted.", "Crop, trade lot, storage and seller."],
        ["8. Roasting", "Heat makes the coffee soluble and changes origin expression.", "Roaster, roast date, batch and intended use."],
        ["9. Brewing", "Water, grind, dose and extraction make the final cup.", "A repeatable recipe—not an origin slogan."]
      ]
    },
    {
      id: "identity-heading",
      type: "heading",
      level: 2,
      text: "Lot identity begins before the fruit reaches a mill"
    },
    {
      id: "identity-list",
      type: "list",
      items: [
        "Variety is one variable, not a taste certificate; farm, harvest and processing still matter.",
        "Selective ripe picking narrows variation. A red-cherry photograph does not prove uniform ripeness.",
        "A cooperative can preserve deliveries as a community lot or blend them without stating the boundary.",
        "An estate name may identify a property, brand, village or product line. Ask who grew and processed the lot."
      ]
    },
    {
      id: "coffee-lot-passport",
      type: "table",
      caption: "Homeground coffee-lot passport: leave unknown fields blank instead of turning a story into provenance",
      columns: ["Stage", "Minimum identity field", "Evidence to keep", "Do not infer"],
      rows: [
        ["Farm or cherry source", "Producer, village/county, harvest window and variety if known", "Producer record, bag/lot label or named interview", "A cafe address proves where cherries grew"],
        ["Processing station", "Station, lot code, process and start date", "Intake/processing record or labelled batch", "Washed/natural/honey guarantees flavour"],
        ["Drying and storage", "Method, end condition, storage owner and separation", "Drying log, labelled bed/bag and custody note", "One photograph represents the whole lot"],
        ["Green trade", "Lot identity, grade/size language, buyer and transfer date", "Contract, sample label or traceable invoice with private data redacted", "Export language is an independent quality score"],
        ["Roasting and cup", "Roaster, roast date, batch link and brew used", "Bag label and explicit link back to green lot", "Roasted in Yunnan means grown in Yunnan"],
      ],
    },
    {
      id: "processing-heading",
      type: "heading",
      level: 2,
      text: "Primary processing changes the batch before roasting"
    },
    {
      id: "processing-comparison",
      type: "comparison",
      title: "Three common method families",
      columns: [
        {
          heading: "Washed / 水洗",
          body: "Fruit is depulped; fermentation, mechanical action and washing remove mucilage; parchment coffee is dried. Water, fermentation and effluent control matter. ‘Washed’ specifies neither one tank time nor one taste."
        },
        {
          heading: "Natural / 日晒",
          body: "Whole cherries dry before hulling. Turning, airflow, weather protection and defect removal matter. ‘Natural’ alone does not prove sweetness or cleanliness."
        },
        {
          heading: "Honey and named experiments",
          body: "Honey processing dries depulped coffee with some mucilage. Controlled fermentations also carry branded names. Ask what was done, for how long and under what monitoring."
        }
      ]
    },
    {
      id: "processing-caveat",
      type: "callout",
      title: "A process name predicts neither quality nor a single taste",
      body: "A controlled Yunnan Arabica study found chemical and sensory differences among six processes applied to the same variety and ripe fruit. Processing matters, but method names are not universal flavour formulas.",
      tone: "neutral"
    },
    {
      id: "drying-heading",
      type: "heading",
      level: 2,
      text: "Drying and storage are quiet points of failure"
    },
    {
      id: "drying",
      type: "paragraph",
      text: "Drying must remove water evenly, prevent rewetting, manage heat and airflow, and keep lots separate. After resting and hulling, green beans can be sorted by density, size, colour and defects. A fermentation story is weak if drying and storage are unknown. Recommended local standard DB53/T 149.4-2023 covers green-bean primary processing; its existence does not prove a bag complied."
    },
    {
      id: "green-heading",
      type: "heading",
      level: 2,
      text: "Green coffee is the commercial hinge"
    },
    {
      id: "green-table",
      type: "table",
      caption: "What changes when dried coffee becomes a saleable green lot",
      columns: ["Question", "Why it matters", "What it cannot prove alone"],
      rows: [
        ["Is the lot separated?", "A code connects samples, bags and records.", "A code without a real ledger proves little."],
        ["How was it prepared?", "Sorting and defect limits shape consistency.", "A grade is not a flavour profile."],
        ["Which crop?", "Harvest period frames freshness and storage.", "A recent crop can be mishandled."],
        ["Who bought and roasted it?", "Custody shows where identity changed.", "Reputation cannot repair a false claim."],
        ["Was it evaluated?", "Protocol and evaluator contextualise a score.", "One score is not a permanent guarantee."]
      ]
    },
    {
      id: "value-heading",
      type: "heading",
      level: 2,
      text: "What moving beyond bulk beans actually means"
    },
    {
      id: "value-shift",
      type: "paragraph",
      text: "Official accounts once described much Yunnan coffee leaving as relatively anonymous raw material. Change now means differentiated green lots, central cherry processing, local roasting and products such as extracts, instant, freeze-dried and drip bags. These keep different skills and value at origin, but form no taste hierarchy: a traceable green lot and a sophisticated instant product serve different purposes."
    },
    {
      id: "metrics-conflict",
      type: "callout",
      title: "The official 2025 figures conflict—read the trend, not a false precision",
      body: "Reviewed 13 August 2026: a January release reports 2025 精品率 of 31.6%, deep processing of 80% and 146.3万亩 planted. A later provincial account gives 41.7% and 85%, while the accessible pages used here report the same 146.3万亩 area. Without common denominators, cut-offs or revision notes for the percentage figures, we record both percentage versions and use only the upward trend. The 2022 goals of 30% and 80% by 2024 were targets. 精品率 is an aggregate policy/industry measure, not an independent specialty score or retail guarantee.",
      tone: "warning"
    },
    {
      id: "roasting-heading",
      type: "heading",
      level: 2,
      text: "Roasting and brewing finish the story"
    },
    {
      id: "roasting-comparison",
      type: "comparison",
      title: "The same green lot can become different cups",
      columns: [
        {
          heading: "Roaster decisions",
          items: [
            "Choose a production profile from samples",
            "Balance development and intended brewing",
            "Link roast batch and date to the green lot",
            "Give any blend a new identity"
          ]
        },
        {
          heading: "Brewer decisions",
          items: [
            "Use stable water and grinding",
            "Start with the roaster’s recipe, then adjust",
            "Treat tasting notes as suggestions",
            "Judge the cup before the entire origin"
          ]
        }
      ]
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two buying scenarios"
    },
    {
      id: "scenarios",
      type: "comparison",
      title: "Choose by evidence and use, not packaging drama",
      columns: [
        {
          heading: "A bag says only ‘Yunnan washed coffee’",
          body: "For an everyday brew, check the roaster, roast date, blend status, intended method and contact. If origin cannot be narrowed, buy it as a roaster-led product, not a verified single-farm story. Rebuy on performance, not imagined ‘Yunnan flavour.’"
        },
        {
          heading: "A higher-priced bag tells a detailed estate story",
          body: "For a specific lot, match farm or station, county, variety, harvest, process and green-lot details across bag and page. Ask what an experimental process means and who roasted it. If answers become generic, save the page and choose a better-documented lot."
        }
      ]
    },
    {
      id: "verify-heading",
      type: "heading",
      level: 2,
      text: "A verification chain before you buy"
    },
    {
      id: "verification-chain",
      type: "list",
      ordered: true,
      items: [
        "Identify the form: green, roasted, ground, drip bag, instant, extract or ready-to-drink. Yunnan processing does not prove Yunnan-grown beans.",
        "Separate grower, processor, trader, brand and roaster, even when one company has several roles.",
        "Match variety, harvest, process and lot code across package and page; save the page.",
        "For unusual fermentation or honey terms, request a plain description of the physical process.",
        "Check roast date, format and brew use; a farm story does not prove freshness or equipment fit.",
        "When provenance drives the decision, request written batch confirmation. Prefer honest uncertainty to invented precision."
      ]
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "When the trace breaks"
    },
    {
      id: "failure-recovery",
      type: "table",
      caption: "Recover without turning uncertainty into an accusation",
      columns: ["Problem", "Immediate step", "Decision rule"],
      rows: [
        ["Bag and page disagree", "Photograph both and ask which matches the batch.", "Identify the batch from the package received; clarify added origin claims in writing."],
        ["Farm cannot be located", "Request county, Chinese name and whether it is property, cooperative, village, processor or brand.", "Do not repeat a vague estate claim."],
        ["Process is only a branded phrase", "Ask what happened to fruit layers, fermentation and drying.", "Treat it as marketing until explained."],
        ["No roast date or batch link", "Ask the roaster or choose a documented product.", "Do not infer freshness from origin detail."],
        ["Cup differs from notes", "Check water, grind, dose and recipe; report a persistent defect with the batch.", "Difference alone does not prove false origin."]
      ]
    },
    {
      id: "conditions-heading",
      type: "heading",
      level: 2,
      text: "Conditions that should change your conclusion"
    },
    {
      id: "conditions",
      type: "list",
      items: [
        "For a declared regional blend, judge traceability at the blend boundary—not a fictional farm.",
        "For instant or extract, ingredient origin, manufacturer and format may matter more than farm detail.",
        "A cooperative’s recorded smallholder community lot can be honest and useful.",
        "A Yunnan company with unstated bean origin proves processing or roasting, not growing.",
        "A new crop, lot or process can make older reviews obsolete."
      ]
    },
    {
      id: "label-heading",
      type: "heading",
      level: 2,
      text: "A practical label checklist"
    },
    {
      id: "label-checklist",
      type: "table",
      caption: "Useful evidence; not a list of claims every package is legally required to carry",
      columns: ["Look for", "Strong version", "Weak version"],
      rows: [
        ["Origin", "County plus estate, village or station", "Yunnan / high mountain"],
        ["Lot", "Code tied to harvest and process", "Uncoded limited edition"],
        ["Variety", "Named cultivar or ‘not specified’", "Unsupported rare variety"],
        ["Harvest", "Crop or harvest period", "Undated fresh crop"],
        ["Process", "Method plus explanation of unusual terms", "Process buzzword alone"],
        ["Roast", "Roaster, date, batch and format", "Undated freshly roasted"],
        ["Evaluation", "Lot, protocol, evaluator", "Unreferenced award or specialty"],
        ["Responsibility", "Seller and usable contact", "Story without accountable business"]
      ]
    },
    {
      id: "environment-heading",
      type: "heading",
      level: 2,
      text: "Value also depends on environmental and farmer realities"
    },
    {
      id: "environment",
      type: "paragraph",
      text: "Well-managed central processing can improve equipment use, lot control and wastewater treatment; poor separation or treatment creates risks. Research in Pu’er and Xishuangbanna found farmers recognised both benefits and drawbacks of shade trees, so agroforestry choices must fit local conditions. Ask who controls processing, how water and by-products are handled, how suppliers are recorded and where added value remains. A sustainability logo cannot answer alone."
    },
    {
      id: "boundary",
      type: "callout",
      title: "This is not a café list or an estate-access promise",
      body: "This is a production and supply-chain explainer, not a café ranking, food route, live-price page or promise of farm access. Obtain current written permission and directions before visiting any property.",
      tone: "warning"
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Connect the coffee story to a real Yunnan trip",
      items: [
        {
          label: "Order Kunming, Dali, Lijiang and Shangri-La without backtracking",
          href: "/guides/kunming-dali-lijiang-shangri-la-route-order/",
          description: "Build the intercity route separately instead of turning coffee production into a sightseeing shortcut."
        },
        {
          label: "Choose a transparent Bai tie-dye workshop in Zhoucheng",
          href: "/guides/zhoucheng-bai-tie-dye-workshop-choice/",
          description: "Use another provenance-first checklist for a living craft in Yunnan."
        },
        {
          label: "Plan Yuanyang viewpoints and villages responsibly",
          href: "/guides/yuanyang-rice-terraces-viewpoint-and-village-route/",
          description: "Keep agricultural landscapes, village access and transport timing distinct."
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and research sources reviewed 13 August 2026",
      items: [
        {
          label: "Yunnan measures to raise the coffee 精品率 and deep-processing rate",
          url: "https://www.yn.gov.cn/zcwjk/html/2022/wjkformal_1123/10373.html",
          publisher: "People’s Government of Yunnan Province",
          reviewedAt: "2026-08-13"
        },
        {
          label: "January 2026 Yunnan coffee press conference and 2025 industry figures",
          url: "https://nync.yn.gov.cn/html/2026/hudongjiaoliu-xinwenfabu_0109/1423691.html",
          publisher: "Yunnan Provincial Department of Agriculture and Rural Affairs",
          reviewedAt: "2026-08-13"
        },
        {
          label: "DB53/T 149.4-2023 Arabica coffee, Part 4: green-bean primary processing",
          url: "https://std.samr.gov.cn/db/search/stdDBDetailed?id=04357299374219C2E06397BE0A0A4FC4",
          publisher: "National Public Service Platform for Standards Information",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Official response on washed, natural and honey processing and central cherry stations",
          url: "https://nync.yn.gov.cn/html/2022/tianjianyibanli2022_0606/387119.html",
          publisher: "Yunnan Provincial Department of Agriculture and Rural Affairs",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Yunnan coffee standards across planting, primary processing and geographical indications",
          url: "https://amr.yn.gov.cn/info/1014/50011.htm",
          publisher: "Yunnan Administration for Market Regulation",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Yunnan coffee industry chain case and 2023 transformation figures",
          url: "https://nync.yn.gov.cn/html/2024/yunnongkuanxun-new_0407/406228.html",
          publisher: "Yunnan Provincial Department of Agriculture and Rural Affairs",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Later provincial account with a different 2025 精品率 and deep-processing rate",
          url: "https://www.ynxc.gov.cn/html/2026/focus_0706/3035313.html",
          publisher: "Yunnan Provincial Publicity / Yunnan Net",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Influence of different primary processes on Yunnan Arabica coffee quality",
          url: "https://doi.org/10.13982/j.mfst.1673-9078.2019.2.021",
          publisher: "Modern Food Science and Technology",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Using farmers’ local knowledge for coffee-agroforestry landscapes in southwest China",
          url: "https://doi.org/10.1371/journal.pone.0204046",
          publisher: "PLOS ONE",
          reviewedAt: "2026-08-13"
        },
        {
          label: "Review of chemistry and craft behind coffee flavour in Yunnan",
          url: "https://doi.org/10.1016/j.jfca.2026.108886",
          publisher: "Journal of Food Composition and Analysis",
          reviewedAt: "2026-08-13"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
