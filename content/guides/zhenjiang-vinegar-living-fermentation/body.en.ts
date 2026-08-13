import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "Zhenjiang's vinegar culture is alive because it still joins an operating food industry to inherited fermentation knowledge, recognizable aromas, museum objects and everyday cooking. The key is not simply that the city sells a dark vinegar. Its best-documented tradition turns cooked grain into alcohol, then exposes a solid vinegar mash to a mixed microbial community while workers manage heat and oxygen by layering and turning. Extraction and aging continue to change the liquid. That chain links an invisible biological process to skilled work, industrial records and a city name carried on labels within a geographical-indication standard system."
    },
    {
      id: "process-map",
      type: "table",
      caption: "Read the craft as transformations, not a secret recipe",
      columns: ["Stage", "What changes", "What a visitor may notice", "What not to assume"],
      rows: [
        ["Grain preparation", "Starchy grain is cleaned, cooked and prepared for conversion", "Rice, steaming vessels or an interpreted raw-material display", "Every product uses exactly the same grain mix or batch size"],
        ["Saccharification and alcoholic fermentation", "Enzymes and microorganisms make fermentable sugars and then alcohol", "Jars, starter displays and an explanation that vinegar first passes through a wine-like stage", "Sourness appears directly from cooked rice"],
        ["Solid-state acetic fermentation", "A mixed solid mash supports acetic-acid bacteria and other microorganisms", "Layers of vinegar mash, bran or husk, warmth and a strong changing aroma", "One named microbe creates the whole flavour"],
        ["Turning the mash", "Mixing redistributes oxygen, heat, moisture and active material", "A turning tool, hand demonstration or mechanical turning equipment", "A short visitor demonstration equals responsibility for a production batch"],
        ["Extraction and heat treatment", "Acidic liquid and flavour compounds are separated and stabilized according to the product process", "Draining, storage vessels or an interpreted modern line", "All dark liquid at the site is the same grade or age"],
        ["Aging and blending", "Acids, sugars, phenolics and volatile compounds continue to interact; producers select a product profile", "Tanks or jars labelled by batch and age", "Older is automatically better, or one duration applies to every Zhenjiang vinegar"]
      ]
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "Why vinegar became a city identity",
      body: "Zhenjiang aromatic vinegar joins place, technique and repeatable public memory. The national intangible-cultural-heritage record names Hengshun's layered solid-state brewing technique; the geographical-indication standard system defines requirements and origin for a named product rather than a generic dark condiment; and the national industrial-heritage list identifies core workshops, tools and business documents. A museum makes these layers visible, while shops and meals keep the taste in ordinary circulation. None of this means one company, one recipe or one museum is the whole city.",
      tone: "decision"
    },
    {
      id: "five-things-heading",
      type: "heading",
      level: 2,
      text: "Look for five kinds of living evidence"
    },
    {
      id: "five-things",
      type: "list",
      ordered: true,
      items: [
        "Material evidence: identify grain, bran or husk, starter, water and the vessels that hold them. A display should say whether an object was used in production, transferred from an older factory, recreated for interpretation or made for a demonstration.",
        "Biological evidence: fermentation is a community process. Peer-reviewed studies find changing bacterial and fungal communities and many organic acids, amino acids and volatile compounds. This supports the idea of a managed ecosystem; it does not reduce traditional practice to a single laboratory species.",
        "Skilled-work evidence: turning vinegar mash is not theatre when it controls oxygen, temperature and microbial activity. In a visitor activity, however, you may only copy one motion on a prepared demonstration bed. Ask whether the material will enter saleable production.",
        "Time evidence: researchers have measured changes across brewing and aging, including acids, sugars, phenolics and aroma compounds. Time therefore matters chemically, but an age printed on one premium bottle cannot be generalized to the entire category.",
        "Institutional evidence: the Chinese ICH record, national standard platform, national industrial-heritage list, museum collections and company archive document or govern different things. Technique, product specification, buildings, objects and corporate memory should not be collapsed into one authenticity stamp."
      ]
    },
    {
      id: "museum-reading-heading",
      type: "heading",
      level: 2,
      text: "Use the museum to connect craft and city—then test its framing"
    },
    {
      id: "museum-reading",
      type: "table",
      caption: "A practical evidence checklist at the China Vinegar Culture Museum",
      columns: ["Evidence", "Useful question", "Safe conclusion"],
      rows: [
        ["Old licence, trademark, ledger or seal", "Is it an original, reproduction or digital copy, and from which business period?", "It documents a stage in Zhenjiang's sauce-and-vinegar trade when provenance is given"],
        ["Old gate, workshop tool or jar", "Was it moved from the historic production area or built for this museum?", "It can show material scale and working method without proving the whole room is intact"],
        ["Demonstration mash", "Is this live fermentation, a teaching batch or a static replica?", "You observed the explained stage, not the complete production cycle"],
        ["Modern process display", "Which steps are mechanized and which still require sensory or manual decisions?", "Living heritage can change tools while retaining documented knowledge"],
        ["Tasting sample", "What is the exact product, ingredient list, age statement and serving context?", "You tasted one labelled product; you did not rank all Zhenjiang vinegars"],
        ["City slogan or festival poster", "Who issued it and for which year?", "It shows how institutions publicly frame vinegar culture, not how every resident identifies"]
      ]
    },
    {
      id: "two-scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two ways to encounter the culture without making a food route"
    },
    {
      id: "two-scenarios",
      type: "comparison",
      title: "Match the evidence to your time",
      columns: [
        {
          heading: "Process-focused half-day",
          body: "Confirm the museum's first-party opening and reservation information. Move in process order: grain and starter, alcoholic stage, vinegar mash, turning, extraction, aging, then company and city history. Photograph labels only where permitted and note whether each scene is active, transferred or reconstructed. Finish with one labelled taste if it suits your diet; do not add an unverified factory tour."
        },
        {
          heading: "Everyday city reading",
          body: "If you do not visit the museum, look for how vinegar enters a meal, a grocery shelf and a piece of city language. Compare the Chinese name 镇江香醋, producer, ingredient list, product standard and age claim rather than choosing by dark colour alone. Ask a restaurant how a vinegar is used in that dish. This reveals daily circulation without turning Zhenjiang into a checklist of shops and noodles."
        }
      ]
    },
    {
      id: "boundaries-heading",
      type: "heading",
      level: 2,
      text: "Keep heritage, flavour and health claims separate"
    },
    {
      id: "boundaries",
      type: "list",
      items: [
        "The national ICH item is specifically named 镇江恒顺香醋酿制技艺—Hengshun's Zhenjiang aromatic-vinegar brewing technique. Do not use that listing to certify every producer or bottle bearing the city name.",
        "A geographical-indication standard concerns defined product requirements and origin. It is not a taste award, and the visible words ‘Zhenjiang vinegar’ should still be checked against the current label and applicable standard.",
        "Scientific papers on phenolics, antioxidant capacity or microbial metabolites describe samples and laboratory measurements. They do not prove that drinking vinegar prevents or treats disease.",
        "‘Traditional’ does not mean unchanged. Open fermentation, mechanized handling, quality control and modern visitor interpretation can coexist; the claim must name which element persists.",
        "A sweet or mellow impression can come from multiple acids, sugars, amino acids and aromas. It should not be explained as acetic acid alone or promised identically across products.",
        "The vinegar museum is built and operated within a company-linked heritage system. Use it as a rich primary source, then cross-check fermentation science and industrial-history claims independently."
      ]
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "If the smell, access or evidence does not match expectations"
    },
    {
      id: "recovery",
      type: "list",
      items: [
        "If the museum is closed, do not enter an industrial area or follow delivery vehicles. Use the ICH record, national industrial-heritage list and a labelled retail bottle as three separate evidence types.",
        "If a ‘workshop’ only offers packaging decoration or a tasting, describe exactly that. Ask which fermentation step, if any, participants perform before paying.",
        "If strong acidic aromas trigger discomfort, move to fresh air and skip active-fermentation or tasting spaces. Contact the venue in advance about ventilation, steps and an early exit; this is not medical advice.",
        "If you have grain, gluten, alcohol, sodium or other dietary concerns, read the current ingredient and allergen information for the exact product and ask the venue. Do not infer suitability from the word ‘vinegar.’",
        "If two sources give different dates, process counts or aging periods, attach each number to its named producer, standard, research sample or exhibition. Do not force a universal timeline.",
        "Before travel, verify the museum's official notice, address, reservation channel, photography policy, tasting content and whether any live demonstration is running. Annual vinegar festivals and temporary workshops are date-specific, not permanent services."
      ]
    },
    {
      id: "final-check",
      type: "callout",
      title: "Final verification",
      body: "A sound visit should leave you able to distinguish four things: the Hengshun brewing technique named in the national ICH record, the broader product category called Zhenjiang aromatic vinegar, the physical industrial heritage, and the modern visitor presentation. Current museum access and event information was reviewed on 13 August 2026, but no opening hour, ticket price, festival date or workshop inventory is treated as permanent.",
      tone: "warning"
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning craft and food culture",
      items: [
        {"label": "Browse all Homeground China guides", "href": "/guides/", "description": "Return to the parent guide collection."},
        {"label": "Plan a regional food route", "href": "/guides/china-regional-food-route/", "description": "Put a Zhenjiang meal into a route without relying on one famous shop."},
        {"label": "Choose a Jingxian Xuan-paper visit", "href": "/guides/jingxian-xuan-paper-museum-workshop-choice/", "description": "Use the same museum, live process and workshop distinctions with another living craft."},
        {"label": "Choose a Zhoucheng tie-dye workshop", "href": "/guides/zhoucheng-bai-tie-dye-workshop-choice/", "description": "Check which step a visitor actually performs before booking."}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official, primary and independent sources checked on 13 August 2026",
      items: [
        {"label": "Zhenjiang Hengshun aromatic-vinegar brewing technique", "url": "https://www.ihchina.cn/project_details/14372", "publisher": "China Intangible Cultural Heritage Network", "reviewedAt": "2026-08-13"},
        {"label": "National standard record for geographical-indication Zhenjiang vinegar", "url": "https://std.samr.gov.cn/gb/search/gbDetailed?id=E116673E2B0BA3B7E05397BE0A0AC6BF", "publisher": "National Public Service Platform for Standards Information", "reviewedAt": "2026-08-13"},
        {"label": "Revision project for Zhenjiang-vinegar geographical-indication requirements", "url": "https://std.samr.gov.cn/gb/search/gbDetailed?id=3E68BCF716812CAEE06397BE0A0AE36A", "publisher": "National Public Service Platform for Standards Information", "reviewedAt": "2026-08-13"},
        {"label": "Reviewed national industrial-heritage list: Hengshun Zhenjiang vinegar brewing area", "url": "https://www.gov.cn/zhengce/zhengceku/202510/P020251023673841442628.pdf", "publisher": "Ministry of Industry and Information Technology via State Council", "reviewedAt": "2026-08-13"},
        {"label": "China Vinegar Culture Museum as a science-education base", "url": "https://jsgzw.jiangsu.gov.cn/art/2023/3/21/art_61556_10839620.html", "publisher": "State-owned Assets Supervision and Administration Commission of Jiangsu", "reviewedAt": "2026-08-13"},
        {"label": "2026 Hengshun sauce-and-vinegar culture carnival", "url": "https://www.saac.gov.cn/daj/c100199/202602/0999f9676f1d49dfa5bc24226a781424.shtml", "publisher": "National Archives Administration of China", "reviewedAt": "2026-08-13"},
        {"label": "Physicochemical and bioactive changes during Zhenjiang vinegar brewing", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6864686/", "publisher": "Foods", "reviewedAt": "2026-08-13"},
        {"label": "Inoculation strategies, microbial composition and flavour", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10033837/", "publisher": "Frontiers in Microbiology", "reviewedAt": "2026-08-13"},
        {"label": "Seasonal factors, microbial succession and flavour quality", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11335490/", "publisher": "Foods", "reviewedAt": "2026-08-13"},
        {"label": "Research on protection and reuse of Zhenjiang industrial heritage", "url": "https://m.fx361.com/news/2022/0207/10191682.html", "publisher": "International Business Technology", "reviewedAt": "2026-08-13"}
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
