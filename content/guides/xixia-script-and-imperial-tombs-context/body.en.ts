import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "The Xixia Imperial Tombs (西夏陵, Xīxià Líng) do not offer a complete dynastic story carved into one monument. At the foot of the Helan Mountains, earth-built mausoleums, subsidiary tombs, drainage works, architectural remains, objects and fragments written in the Xixia—or Tangut—script survive in different states. UNESCO inscribed the property in 2025. A useful visit joins those traces while keeping their confidence levels separate: what is visible now, what excavation documented, and what researchers infer."
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "Can fragmentary evidence reconstruct a civilization?",
      body: "It can support a connected but incomplete account. Script can preserve language, titles or institutional expression where readable text survives; objects show materials, craft and ritual contexts; landscape shows how the royal cemetery was organized. None of the three automatically identifies every tomb occupant, restores every ceremony or reveals what all Xixia subjects believed.",
      tone: "decision"
    },
    {
      id: "triangle-heading",
      type: "heading",
      level: 2,
      text: "Build a three-sided evidence triangle"
    },
    {
      id: "evidence-triangle",
      type: "comparison",
      title: "Each evidence class answers a different question",
      columns: [
        {"heading": "Script", "body": "Xixia-script and Chinese inscriptions can preserve names, titles, dates, religious language or administrative wording. A fragment supports only the legible passage and documented find context; a translated museum label is an interpretation, not the original surface."},
        {"heading": "Objects", "body": "Building components, sculpture fragments, ceramics, metalwork and burials record manufacture, exchange, status and practice. An object’s strongest meaning comes from its excavated layer and association, not from resemblance to a later artwork."},
        {"heading": "Landscape", "body": "Nine imperial mausoleums, 271 subordinate tombs, a northern architectural complex and 32 flood-control works form the UNESCO-listed cemetery. Their distribution demonstrates planned use of the Helan foothills, but a plan alone cannot name every user or event."}
      ]
    },
    {
      id: "confidence-heading",
      type: "heading",
      level: 2,
      text: "Use confidence labels before telling the story"
    },
    {
      id: "confidence-table",
      type: "table",
      caption: "A portable evidence scale for labels, guides and your own notes",
      columns: ["Label", "What qualifies", "How to phrase it"],
      rows: [
        ["Observed", "A feature or object is visible and its identity is stated by the site", "‘The surviving rammed-earth core has…’"],
        ["Documented", "An official excavation report records context, measurements or finds", "‘Excavation recorded…’"],
        ["Corroborated", "Different evidence classes point in the same direction", "‘The inscription and find context together support…’"],
        ["Attributed", "Researchers assign a person, date or function from indirect evidence", "‘The tomb is attributed to…’ or ‘may belong to…’"],
        ["Proposed", "A plausible interpretation remains open to revision", "‘The complex has been proposed as…’"],
        ["Unknown", "The surviving record does not resolve the question", "Say ‘not securely identified’ rather than filling the gap"]
      ]
    },
    {
      id: "site-order-heading",
      type: "heading",
      level: 2,
      text: "Read the museum before the horizon"
    },
    {
      id: "site-order",
      type: "list",
      ordered: true,
      items: [
        "Begin with the site map. Locate the Helan range, nine mausoleums, subordinate tomb fields, northern complex and flood-control system before focusing on one photogenic mound.",
        "Find a Xixia-script sample and compare it with Chinese text. Notice the distinct graphic system, but do not pretend to translate characters from shape alone.",
        "Choose one excavated object with a clear tomb or structure number. Record its material, find context and whether the display is original, replica or reconstruction.",
        "Outside, separate visible remains from protective additions and visitor paths. A clean edge, stair or platform may be modern site management rather than Xixia fabric.",
        "Use the mountain and drainage works to read placement and environmental adaptation. The relationship is evidence; a claim that every axis had one symbolic meaning needs a cited argument.",
        "Finish by revisiting one museum label. Ask whether its conclusion came from writing, an object, spatial comparison or a combination of evidence."
      ]
    },
    {
      id: "cases-heading",
      type: "heading",
      level: 2,
      text: "Four cases show why wording matters"
    },
    {
      id: "cases-table",
      type: "table",
      caption: "Official records and their limits",
      columns: ["Case", "What official evidence supports", "What remains bounded"],
      rows: [
        ["Mausoleum No. 3", "Clearance and excavation of its above-ground architectural remains in 2000–2001 clarified parts of its form and construction technique", "Architecture does not by itself settle every ritual performed there"],
        ["Mausoleum No. 6", "Excavations took place in 1972–1975 and 2007–2008; inscription evidence has been used to infer an association with Li Deming", "The owner should be described as inferred or attributed, not presented as an undisputed identification"],
        ["Northern architectural complex", "Excavation recorded a high-status group of structures, and both Xixia-script and Chinese stele fragments were found in this area", "Its interpretation as an ancestral temple is a research proposal, not a surviving building nameplate"],
        ["Gilded bronze ox", "The object came from subordinate tomb MIII-107 and demonstrates sophisticated metalworking and a specific burial context", "One elite object does not describe ordinary Xixia households or prove a single ethnic style"]
      ]
    },
    {
      id: "misread-callout",
      type: "callout",
      title: "Do not let reconstruction become invisible",
      body: "A drawing, model, digital scene or restored silhouette can make lost buildings understandable, but it must remain labelled as a reconstruction. Check which elements follow excavated foundations, which use comparison, and which are illustrative choices. The UNESCO property emphasizes surviving setting, materials and in-situ remains; that does not mean every visible visitor-facing surface is untouched medieval fabric.",
      tone: "warning"
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two realistic visit strategies"
    },
    {
      id: "traveller-scenarios",
      type: "comparison",
      title: "Choose the evidence depth that fits your day",
      columns: [
        {"heading": "First-time visitor with two hours", "body": "Use the museum to learn one script fragment and one securely provenanced object, then visit one mausoleum zone and a viewpoint that shows the Helan setting. Your goal is a complete evidence triangle, not a rushed count of nine mausoleums."},
        {"heading": "Archaeology-focused visitor", "body": "Download the UNESCO map and note structure numbers before arrival. At each display, record the excavation campaign, provenance, restoration status and confidence language. Ask staff which areas or galleries are currently open rather than assuming the full nominated property is accessible."}
      ]
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "Recover from the common evidence failures"
    },
    {
      id: "recovery-list",
      type: "list",
      items: [
        "If a guide gives a tomb name with certainty, ask what inscription or excavation record supports it and whether the official label says ‘attributed’. Silence is better than a false identity.",
        "If an object is separated from its context in a display, photograph or note the accession and tomb number where permitted; style alone is not provenance.",
        "If a reconstruction looks complete, find its legend. Record the evidence-based and conjectural parts separately.",
        "If the script is presented as mysterious or unreadable, remember that specialists can read substantial Xixia texts; the problem at the tombs is often fragment survival and context, not an undeciphered writing system.",
        "If weather, conservation or routing closes an outdoor zone, build the triangle in the museum and use the official site map for spatial context. Do not cross barriers to ‘verify’ a feature.",
        "Before travel, verify the current museum name, ticketing, shuttle route, open mausoleum areas and temporary conservation notices. Operational details were last checked on 13 August 2026."
      ]
    },
    {
      id: "final-check",
      type: "callout",
      title: "The five-line note to leave with",
      body: "Write down one readable script claim, one object with provenance, one landscape relationship, one interpretation labelled by confidence, and one unanswered question. That small record is a more honest reconstruction of Xixia than a seamless story assembled from unlabeled guesses.",
      tone: "decision"
    },
    {
      id: "links",
      type: "internal-links",
      title: "Continue with evidence-led heritage visits",
      items: [
        {"label": "Browse Homeground’s China guides", "href": "/guides/", "description": "Return to the complete guide collection."},
        {"label": "Sequence Liangzhu ruins park and museum", "href": "/guides/liangzhu-ruins-park-and-museum-sequence/", "description": "Compare another museum–landscape evidence chain."},
        {"label": "Read ritual bronzes and inscriptions", "href": "/guides/ritual-bronze-vessels-and-inscriptions/", "description": "Practice linking text, object and archaeological context."},
        {"label": "Choose a route through the Yungang Grottoes", "href": "/guides/yungang-grottoes-cave-order-and-museum/", "description": "Apply confidence and conservation boundaries at another major site."}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources checked on 13 August 2026",
      items: [
        {"label": "Xixia Imperial Tombs World Heritage property", "url": "https://whc.unesco.org/en/list/1736", "publisher": "UNESCO World Heritage Centre", "reviewedAt": "2026-08-13"},
        {"label": "Xixia Imperial Tombs nomination dossier", "url": "https://whc.unesco.org/en/documents/206074", "publisher": "UNESCO World Heritage Centre", "reviewedAt": "2026-08-13"},
        {"label": "Archaeological work at the Xixia Imperial Tombs", "url": "https://whhlyt.nx.gov.cn/xxfb/wlyw/202311/t20231113_4347356_zzb.html", "publisher": "Ningxia Department of Culture and Tourism", "reviewedAt": "2026-08-13"},
        {"label": "Xixia archaeology and inscribed stele fragments", "url": "https://www.nopss.gov.cn/n1/2026/0121/c461625-40649844.html", "publisher": "National Office for Philosophy and Social Sciences", "reviewedAt": "2026-08-13"},
        {"label": "Xixia Imperial Tombs Museum visitor overview", "url": "https://www.yinchuan.gov.cn/sshc/lyjd/zdwbcs/202511/t20251125_5090985.html", "publisher": "Yinchuan People’s Government", "reviewedAt": "2026-08-13"},
        { label: "Hero photograph: Xixia Imperial Tombs landscape, Thebrainchamber1 (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:Western_Xia_mausoleums_3.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
