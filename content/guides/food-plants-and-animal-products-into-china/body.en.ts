import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Do not use ‘sealed’, ‘cooked’, ‘vacuum-packed’, ‘a gift’ or ‘for personal use’ as proof that food can enter China. China's current quarantine list prohibits broad categories including raw or cooked meat and meat products, animal-origin milk and dairy products, eggs and egg products, fresh fruit and vegetables, seeds and planting material, and soil. Screen the exact ingredients and product form before packing; if an item is prohibited, declaring it does not turn it into an allowed item." },
  { id: "answer", type: "callout", title: "The safest packing rule", tone: "decision", body: "Leave fresh produce, meat, dairy, eggs, seeds, live plants and soil at home unless you have verified a specific lawful exception and completed any approval and certificate requirements before travel. For a processed snack, read the full ingredients instead of relying on the front label. If you cannot identify the contents or prove an exception, do not pack it." },
  { id: "screen-heading", type: "heading", level: 2, text: "Run every uncertain item through this screen" },
  { id: "screen-table", type: "table", caption: "The product name is only the start", columns: ["What is inside", "Default travel decision", "Why it needs attention"], rows: [
    ["Raw or cooked meat, offal or a meat-derived filling", "Leave it out", "The official list covers meat and its products whether raw or cooked"],
    ["Animal-origin milk, cream, butter, cheese, yoghurt or condensed milk", "Leave it out unless a stated exception clearly applies", "Dairy appears as a prohibited category"],
    ["Egg, salted egg, preserved egg, liquid egg, eggshell or mayonnaise", "Leave it out unless a stated exception clearly applies", "The official list names eggs and egg-derived products"],
    ["Fresh fruit, fresh vegetables or cut flowers", "Do not pack", "These are expressly listed plant-quarantine categories"],
    ["Seeds, seedlings, cuttings, bulbs or other propagating material", "Do not pack without the required advance route", "Even a small souvenir can reproduce or carry pests"],
    ["Soil or organic growing medium", "Do not pack", "Soil and related quarantine material are specifically controlled"],
    ["Commercially packaged plant-based snack", "Check every ingredient and current rule", "Packaging alone does not reveal an animal ingredient or origin-specific restriction"]
  ] },
  { id: "ingredients-heading", type: "heading", level: 2, text: "Read the ingredient panel, not the souvenir story" },
  { id: "ingredients-list", type: "list", items: [
    "Jerky, sausage, pâté, meat floss, meat stock, bouillon, gravy powder and filled pastries remain meat products even when cooked or shelf-stable.",
    "Mooncakes, buns, biscuits and instant meals can hide meat, egg yolk, mayonnaise, milk powder or cheese behind a broad product name.",
    "Chocolate, nutrition powders, coffee mixes and confectionery may contain animal-origin milk ingredients. Do not infer an exception from a small percentage.",
    "Fresh fruit taken from an aircraft, lounge, cruise, hotel breakfast or another country is still fresh fruit at the border. Eat it before arrival or leave it behind where instructed.",
    "Dried flowers, seeds in jewellery, herbal mixtures, unprocessed grains and natural craft items need an exact material check; ‘decorative’ does not remove quarantine risk.",
    "A label you cannot read is not a safe item. Obtain a reliable translation of the ingredients, origin and product form before deciding."
  ] },
  { id: "official-list-heading", type: "heading", level: 2, text: "The official list has detail—and narrow exceptions" },
  { id: "official-list-table", type: "table", caption: "Examples from Announcement No. 470", columns: ["Category in the list", "Important detail", "Planning implication"], rows: [
    ["Aquatic animal products", "The list states an exception for dried, cooked or fermented edible sauce products", "That wording is not a blanket exception for every seafood snack; identify the exact form"],
    ["Bird's nest", "Commercially sterile canned bird's nest is excluded from the listed prohibition", "Loose, dried or informally packed bird's nest does not gain that exception"],
    ["Animal-derived hides, bones, horns and shells", "Certain processed handicrafts without blood, muscle or fat are excluded", "A clean-looking souvenir still needs enough material and processing evidence"],
    ["Dogs and cats", "The live-animal category notes a separate exception, subject to its own requirements", "Pet entry is a formal procedure, not ordinary baggage permission"],
    ["Approved quarantine goods", "A note allows goods with competent approval and an official export-country quarantine certificate outside the list restriction", "Approval and certification must exist before travel; an airport explanation is not a substitute"]
  ] },
  { id: "exception-heading", type: "heading", level: 2, text: "An exception must match the exact item and paperwork" },
  { id: "exception-copy", type: "paragraph", text: "Treat an exception as a checklist, not a resemblance. Match the scientific or commercial identity, ingredients, treatment, packaging, country or region of origin, quantity, traveller channel and required documents. A permit for one species, batch or import route does not automatically cover a similar souvenir in personal baggage. Where approval and an exporting authority's quarantine certificate are required, obtain both through the competent process before departure and carry the originals or the form Customs specifies." },
  { id: "exception-warning", type: "callout", title: "Declaration is not permission", tone: "warning", body: "The 2025 baggage declaration rules require incoming travellers carrying animals, plants, their products or other quarantine objects to declare and accept inspection. Choosing the red channel is the correct handling route for declarable or uncertain items, but Customs may still refuse entry, order treatment, return or disposal under the applicable rule. Do not pack a prohibited item on the assumption that honesty guarantees release." },
  { id: "before-heading", type: "heading", level: 2, text: "A pre-departure workflow that avoids an airport argument" },
  { id: "before-list", type: "list", ordered: true, items: [
    "Put every food, plant, natural-material gift and animal-derived item in one review pile before it enters checked or cabin baggage.",
    "Photograph the full product, ingredients, origin label and manufacturer details. Open unlabelled gift boxes and ask the giver what every filling contains.",
    "Compare the exact category with the current Announcement No. 470 list and any newer Customs risk notice for the origin country or product.",
    "If relying on an exception, save the exact clause and obtain all approval and quarantine documents before travel. A retailer's message is not government authorization.",
    "Remove items that remain ambiguous. Do not split them between bags or companions to reduce visibility.",
    "Keep items that appear eligible in original labelled packaging and accessible for inspection; place certificates with the item, not in a different checked bag."
  ] },
  { id: "arrival-heading", type: "heading", level: 2, text: "What to do on the aircraft and at arrival" },
  { id: "arrival-table", type: "table", caption: "Resolve uncertainty before the green channel", columns: ["Moment", "Action", "Do not do"], rows: [
    ["Before landing", "Finish or discard airline fruit and other uncertain food only through the carrier's instructed collection route", "Put it into a pocket to deal with later"],
    ["Before choosing a channel", "Review all cabin and checked baggage, including gifts packed by someone else", "Assume checked baggage follows different quarantine rules"],
    ["Item is controlled or uncertain", "Complete the required paper or electronic declaration and use the red channel", "Choose green because the quantity is small"],
    ["Officer asks to inspect", "Present the item, label, permit and certificate truthfully", "Open sealed Customs baggage or hide part of the product"],
    ["Entry is refused", "Follow the official return, treatment or disposal direction and keep any record provided", "Hand the item to another traveller or remove it from the controlled area"]
  ] },
  { id: "special-heading", type: "heading", level: 2, text: "Items that need a different owner or process" },
  { id: "special-list", type: "list", items: [
    "Infant formula, medical nutrition and special dietary foods may involve narrow conditions. Verify the exact current provision and quantity; a medical need does not create an unwritten exemption.",
    "Medicines and traditional remedies can contain animal, plant, endangered-species or controlled-drug ingredients. Quarantine is only one layer; medicine and wildlife rules may also apply.",
    "Pet dogs and cats use a dedicated entry procedure involving animal health documents and other conditions. Do not rely on this food-and-souvenir screen for a pet journey.",
    "Mail, courier and cross-border e-commerce are included in the Announcement No. 470 scope. Posting a prohibited product instead of carrying it is not a workaround.",
    "Commercial samples, sales stock and large quantities are outside an ordinary personal-baggage assumption and need a proper import route."
  ] },
  { id: "failure", type: "callout", title: "If you discover a questionable item after packing", tone: "warning", body: "Before departure, remove it and contact Customs through an official channel with the exact product name, ingredients, origin and intended route. At arrival, do not abandon it in a toilet or ordinary bin and do not ask another passenger to carry it. Declare it and follow the officer's directions. Preserve any seizure, return or disposal record if insurance or the sender needs evidence." },
  { id: "scope", type: "callout", title: "Scope and live-rule boundary", tone: "neutral", body: "This is a passenger packing and declaration screen, not a clearance certificate. Announcement No. 470 says the list can be dynamically adjusted following risk assessment, and disease- or origin-specific controls can change. Recheck the current list and relevant Customs notices shortly before travel. Customs decides inspection and release; Homeground cannot determine admissibility from a photo or commercial label." },
  { id: "links", type: "internal-links", title: "Complete the arrival check", items: [
    { label: "China customs red and green channels", href: "/guides/china-customs-red-green-channels/", description: "Choose the correct arrival channel after screening every bag." },
    { label: "China entry requirements", href: "/guides/china-entry-requirements/", description: "Keep immigration documents separate from Customs and quarantine." },
    { label: "Power bank rules for flights and trains", href: "/guides/china-power-bank-rules-flights-trains/", description: "Finish the other high-friction baggage check." }
  ] },
  { id: "sources", type: "sources", title: "Official sources reviewed", items: [
    { label: "Announcement No. 470 and the prohibited quarantine-items list", url: "https://xmsyj.moa.gov.cn/gjjlhz/202111/t20211102_6381054.htm", publisher: "Ministry of Agriculture and Rural Affairs / General Administration of Customs", reviewedAt: "2026-08-12" },
    { label: "Official gazette copy of the prohibited list", url: "https://www.moa.gov.cn/nybgb/2022/202202/202204/P020220401365957599038.pdf", publisher: "Ministry of Agriculture and Rural Affairs / General Administration of Customs", reviewedAt: "2026-08-12" },
    { label: "Customs baggage declaration Announcement No. 43 of 2025", url: "https://app.www.gov.cn/govdata/gov/202504/05/526129/article.html", publisher: "General Administration of Customs", reviewedAt: "2026-08-12" }
  ] }
] } as const satisfies StructuredPageBody;

export default body;
