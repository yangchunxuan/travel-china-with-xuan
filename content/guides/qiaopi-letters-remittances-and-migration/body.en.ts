import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "A Qiaopi (侨批, qiáopī)—often called Yinxin (银信) in the Wuyi area—is best read as a small packet of relationships: a message from an emigrant, money or evidence of money, and marks left by the people and institutions that moved both toward a family in China. UNESCO’s registered collection includes letters, reports, account books and remittance receipts, not one uniform document type. Begin with names, places, dates, currencies and institutional marks before reading the emotional story. One sheet can reveal a route; it cannot stand for every emigrant or every family."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "What makes Qiaopi different from an ordinary letter?",
      body: "The message and remittance function were coupled. A letter might travel with a remittance receipt, a short note might be written on financial paperwork, and agents generated account books, delivery notes and return receipts around the transaction. The archive therefore records family news, money and trust infrastructure at the same time.",
      tone: "decision"
    },
    {
      id: "anatomy-heading",
      type: "heading",
      level: 2,
      text: "Anatomy of one Qiaopi"
    },
    {
      id: "field-anatomy",
      type: "table",
      caption: "Fields to inspect before interpreting the story",
      columns: ["Field or mark", "What it may establish", "Caution"],
      rows: [
        ["Sender and place of origin", "An overseas person, firm, port or settlement", "Spellings and place names may be historical, dialectal or written by an agent"],
        ["Addressee and home address", "The intended household and a village-level destination", "Kinship terms are not always unique personal identifiers"],
        ["Written or processed date", "One point in the document’s journey", "A letter date, office date, postmark and delivery date can differ"],
        ["Amount and currency", "The remitted denomination or an amount recorded by an agent", "Do not silently convert old currencies or assume the recipient received the face amount"],
        ["Fees, rate or account notation", "Possible handling, exchange or bookkeeping", "A number without its column heading is not self-explanatory"],
        ["Qiaopi bureau, bank or post-office name", "An institution in the handling chain", "Its stamp does not prove it carried every leg"],
        ["Postmarks, seals and serial numbers", "Processing sequence, control or routing clues", "Some marks may be archival, exhibition or later ownership marks"],
        ["Courier or delivery note", "Last-mile handoff, collection or acknowledgment", "Absence does not prove that delivery failed"],
        ["Family message", "Needs, news, instructions, affection or tension in this exchange", "A private voice is contextual evidence, not a national personality"],
        ["Return batch or receipt", "A response, acknowledgment or later linked transaction", "It must be matched by catalogue number or institutional evidence, not appearance alone"]
      ]
    },
    {
      id: "three-flows-heading",
      type: "heading",
      level: 2,
      text: "Trace three flows without collapsing them"
    },
    {
      id: "three-flows",
      type: "comparison",
      title: "Letter, money and route answer different questions",
      columns: [
        {"heading": "Message", "body": "Who wrote to whom, what news or request was expressed, which kinship terms were used, and what remained unsaid."},
        {"heading": "Money", "body": "What amount and currency were recorded, which agent handled it, what fees or exchange notation appears, and whether receipt is documented."},
        {"heading": "Delivery", "body": "Which overseas and domestic offices appear, what transport or postmarks survive, who handled the last mile, and whether a return record exists."}
      ]
    },
    {
      id: "route-heading",
      type: "heading",
      level: 2,
      text: "Build a route from marks, not from a romantic map"
    },
    {
      id: "route-sequence",
      type: "list",
      ordered: true,
      items: [
        "Locate the overseas sender and the home recipient. The UNESCO nomination records Qiaopi arriving from Southeast Asia, the Americas and Oceania, but one document supports only the places actually written or stamped on it.",
        "Identify the first handling agent. Depending on period and place, private banking agents, Qiaopi bureaus, post offices and later financial institutions could be involved.",
        "Separate the physical letter from the financial record. They may be on one sheet, enclosed together or represented by linked paperwork.",
        "Follow dated stamps in order. Sea, air and wartime detours changed routes; a neat straight line is an editorial diagram, not proof of a direct voyage.",
        "Find the domestic transfer and last mile. Local offices, couriers or ‘water travellers’ could connect a port or town to a village household.",
        "Look for acknowledgment. A return slip, signed receipt or later Qiaopi can close part of the chain, but do not invent a successful delivery when the record is incomplete."
      ]
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "What the archive proves—and what it does not"
    },
    {
      id: "evidence-table",
      type: "table",
      caption: "Evidence boundaries for museum reading",
      columns: ["Observation", "Supported reading", "Unsupported leap"],
      rows: [
        ["A 2012 nomination counted more than 160,000 preserved items", "The nominated corpus was very large and distributed across Guangdong and Fujian holdings", "That number is the complete or current worldwide total in 2026"],
        ["The same family appears repeatedly", "A continuing documentary relationship may survive", "Every interval or family conflict is preserved"],
        ["Money was sent regularly", "Remittances mattered in that documented relationship", "All overseas earnings or household income came through Qiaopi"],
        ["An agent’s marks recur", "The agent participated in several documented transactions", "The agent was informal, dishonest or the only available route"],
        ["A letter mentions hardship", "The writer reported hardship in that moment and context", "Every migrant from that place had the same experience"],
        ["A museum displays a transcription", "The institution offers a reading of the script", "Every uncertain character, date or place has been conclusively resolved"]
      ]
    },
    {
      id: "privacy-callout",
      type: "callout",
      title: "A public display is still a private family record",
      body: "Follow the holding institution’s photography rule. Quote only the minimum needed, prefer an official transcription, and do not publish full addresses or information about potentially living descendants. If a character is unclear, mark it as uncertain rather than letting OCR invent a fluent sentence. Access and reuse can depend on archival, privacy and intellectual-property rules; a photograph’s licence does not automatically clear all underlying text for reuse.",
      tone: "warning"
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two ways to use a museum visit"
    },
    {
      id: "traveller-scenarios",
      type: "comparison",
      title: "Choose depth before you enter",
      columns: [
        {"heading": "General visitor in Shantou", "body": "Choose one clearly labelled Qiaopi and spend ten minutes on sender, recipient, amount, agent and route. Then compare it with one account book or delivery record. This is more useful than photographing a wall of letters without reading any chain."},
        {"heading": "Family-history or migration researcher", "body": "Record the institution, collection name, catalogue number, document date and any linked item before transcribing. Ask whether the display is an original, facsimile or digital reproduction and use the archive’s access procedure for higher-resolution study."}
      ]
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "Recover when the document will not yield a clean story"
    },
    {
      id: "recovery-list",
      type: "list",
      items: [
        "If handwriting is unreadable, capture the label and catalogue number where photography is allowed; do not guess from one character shape.",
        "If currencies or amounts conflict, preserve each notation and identify which office wrote it before calculating anything.",
        "If two place names look similar, use the institution’s historical gazetteer or catalogue; modern map search can erase old administrative boundaries.",
        "If the displayed route is a museum graphic, treat it as interpretation and return to the document’s own stamps for item-level claims.",
        "If an original is unavailable, a digitization or facsimile can still support reading, but label the medium and do not claim to have inspected paper, ink or physical layering.",
        "Before visiting, verify the current exhibition, accepted identity documents, opening notice and photography policy with the holding institution. The Shantou venue’s direct notice was last checked on 13 August 2026; it lists free entry with valid ID, but current rules can change."
      ]
    },
    {
      id: "links",
      type: "internal-links",
      title: "Continue reading archives and migration evidence",
      items: [
        {"label": "Browse Homeground’s China guides", "href": "/guides/", "description": "Return to the complete guide collection."},
        {"label": "Read Liye Qin slips as local records", "href": "/guides/liye-qin-slips-local-government-records/", "description": "Compare family-financial papers with administrative records."},
        {"label": "Read Nanhai No. 1 through cargo and conservation", "href": "/guides/nanhai-one-shipwreck-cargo-and-conservation/", "description": "Use another evidence chain to understand maritime movement."},
        {"label": "Choose a Fujian Tulou cluster", "href": "/guides/fujian-tulou-cluster-selection/", "description": "Place documentary migration history beside the built landscapes of Fujian communities."},
        {"label": "Read the Meizhou Mazu Ancestral Temple in context", "href": "/guides/meizhou-mazu-ancestral-temple-reading-guide/", "description": "Continue from maritime migration records to a coastal institution, living belief and layered modern temple complex without merging their evidence."}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources checked on 13 August 2026",
      items: [
        {"label": "Qiaopi and Yinxin correspondence and remittance documents", "url": "https://www.unesco.org/en/memory-world/qiaopi-and-yinxin-correspondence-and-remittance-documents-overseas-chinese", "publisher": "UNESCO Memory of the World", "reviewedAt": "2026-08-13"},
        {"label": "2012 nomination form", "url": "https://media.unesco.org/sites/default/files/webform/mow001/china_qiaopi_and_yinxin.pdf", "publisher": "UNESCO Memory of the World", "reviewedAt": "2026-08-13"},
        {"label": "Illustrated guide to Qiaopi archives", "url": "https://www.da.gd.gov.cn/portal_home/content/8105", "publisher": "Guangdong Provincial Archives", "reviewedAt": "2026-08-13"},
        {"label": "Haibang Shengfu: Guangdong Qiaopi Archives", "url": "https://www.da.gd.gov.cn/portal_home/content/385", "publisher": "Guangdong Provincial Archives", "reviewedAt": "2026-08-13"},
        {"label": "Shantou Qiaopi Museum visitor notice", "url": "https://daj.shantou.gov.cn/daj/1500/202104/94d280030d3a49fc9f954c238534cc38.shtml", "publisher": "Shantou Municipal Archives", "reviewedAt": "2026-08-13"},
        {"label": "2026 accession of 3,969 Qiaopi-related records", "url": "https://daj.shantou.gov.cn/daj/0500/202604/9f1a0a37c33343be853288e5e32c26a9.shtml", "publisher": "Shantou Municipal Archives", "reviewedAt": "2026-08-13"},
        { label: "Hero photograph: Shantou Qiaopi Museum, Lhzss8 (CC BY 4.0)", url: "https://commons.wikimedia.org/wiki/File:Shantou_Qiaopi_Museum.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
