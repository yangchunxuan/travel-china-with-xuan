import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "Use the red channel when your baggage contains anything that must be declared. Use green only when you have no declarable goods. If you cannot decide from the current rules, stop before the channel split and ask Customs; uncertainty is a reason to clarify, not to test whether the green lane is faster. Under China Customs Announcement No. 43 of 2025, a required declaration may be filed on paper or electronically, and a traveller without declarable baggage may use green without completing the form.",
    },
    {
      id: "short-decision",
      type: "callout",
      title: "The two-lane rule in one sentence",
      body:
        "Red means ‘I have something to declare or verify.’ Green means ‘I have nothing that requires a written declaration.’ Red is not an admission of wrongdoing, and green is not immunity from inspection.",
      tone: "decision",
    },
    {
      id: "channels-heading",
      type: "heading",
      level: 2,
      text: "What the red and green channels actually mean",
    },
    {
      id: "channel-comparison",
      type: "comparison",
      title: "Choose by the contents of the baggage, not the queue",
      columns: [
        {
          heading: "Red channel",
          body:
            "Present the declaration and the relevant item for Customs review. Officers may ask questions, inspect it, check a permit, assess duty, refer it for quarantine, record a temporary import or give another lawful instruction. Declaring an item does not guarantee that it may enter.",
        },
        {
          heading: "Green channel",
          body:
            "Proceed only when no written-declaration category applies. Customs may still stop and inspect green-channel baggage. A sealed package, personal-use label or gift status does not by itself remove an item from the rules.",
        },
      ],
    },
    {
      id: "official-rule-heading",
      type: "heading",
      level: 2,
      text: "The current declaration categories",
    },
    {
      id: "official-rule-table",
      type: "table",
      caption: "Arrival categories listed in Customs Announcement No. 43 of 2025",
      columns: ["Category", "What it means for a traveller", "What not to assume"],
      rows: [
        [
          "Prohibited goods",
          "They must be declared. Customs decides the lawful treatment.",
          "A declaration does not turn a prohibited item into an allowed one.",
        ],
        [
          "Restricted goods over a limit, or goods needing permits or proof",
          "Bring the supporting document and use red.",
          "‘For myself’ is not a substitute for a licence or a quantity rule.",
        ],
        [
          "Animals, plants, their products and other quarantine articles",
          "Declare them for quarantine review and check eligibility before flying.",
          "Cooked, dried, vacuum-packed or factory-sealed does not automatically mean permitted.",
        ],
        [
          "Human tissues, pathogens, biological products and related public-health articles",
          "Use red and carry the exact approvals or supporting materials required for the item.",
          "A medical or research purpose does not remove the declaration duty.",
        ],
        [
          "Articles contaminated by a quarantinable infectious disease or posing a transmission risk",
          "Declare them and follow the health and Customs inspection process.",
          "Cleaning the outside or packing the article separately does not decide the risk classification.",
        ],
        [
          "Cash above the applicable amount",
          "Check the current rule for the currency and direction of travel, then declare when required.",
          "Do not rely on an old blog threshold or divide cash among companions to avoid a rule.",
        ],
        [
          "Goods over duty-free value or quantity limits",
          "Use red so Customs can determine the treatment.",
          "Duty-free shop packaging is not proof that arrival allowances are satisfied.",
        ],
        [
          "Goods, samples and advertising materials",
          "Commercial character can trigger declaration even when the items are carried in a suitcase.",
          "Being unpaid, promotional or intended as gifts does not necessarily make it personal baggage.",
        ],
        [
          "Baggage arriving separately",
          "Declare separated or unaccompanied baggage as required and retain the transport documents.",
          "Sending a suitcase later does not remove it from passenger-baggage formalities.",
        ],
        [
          "Other baggage that law requires to be declared in writing",
          "Check the current item-specific rule and use red when that duty applies.",
          "A category not named elsewhere in this summary is not automatically exempt.",
        ],
      ],
    },
    {
      id: "red-is-process",
      type: "callout",
      title: "Declaration is a process, not a promise of confiscation",
      body:
        "Possible outcomes depend on the item: release, duty or tax treatment, permit checking, quarantine review, temporary-import registration, surrender, return or detention under formal procedure. Do not promise yourself a particular outcome. Describe the item accurately and ask for official paperwork if Customs keeps it or requires another step.",
      tone: "neutral",
    },
    {
      id: "inventory-heading",
      type: "heading",
      level: 2,
      text: "Make a declaration inventory before landing",
    },
    {
      id: "inventory-list",
      type: "list",
      ordered: true,
      items: [
        "List food, plants, seeds, soil, animal products and anything made from an animal or plant. Read ingredient labels rather than judging only the product name.",
        "List medicines, medical devices, biological materials and controlled substances. Record the generic name, dose, quantity and purpose; keep the original packaging and relevant prescription or letter.",
        "List cash and other monetary instruments by currency, plus valuable goods newly purchased abroad. Check live thresholds with the authority rather than copying a number from an old article.",
        "List work equipment, sale stock, product samples, gifts for a group and items carried for another person. Quantity and purpose can matter as much as value.",
        "Mark anything that will leave China again, such as specialised professional equipment, so you can ask whether temporary-import registration is required.",
        "Mark any suitcase, parcel or equipment case travelling separately from you and keep its airway bill, baggage tag or shipping record.",
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Common arrival scenarios",
    },
    {
      id: "scenario-table",
      type: "table",
      caption: "How to turn a vague baggage question into a channel decision",
      columns: ["What you are carrying", "Question to resolve before arrival", "Safe channel decision"],
      rows: [
        [
          "Packaged snack or home food",
          "What are the exact animal, plant and dairy ingredients, and does the current quarantine list prohibit or control them?",
          "If it is controlled, prohibited or uncertain, declare it; use the separate food-and-biosecurity guide before packing.",
        ],
        [
          "Prescription medicine",
          "Is the ingredient controlled, is the quantity consistent with personal treatment, and is documentation required?",
          "Carry supporting documents and use red when a declaration, permit or clarification is needed.",
        ],
        [
          "Several identical gifts or devices",
          "Could the quantity or purpose look commercial, or exceed an allowance?",
          "Do not divide them among bags to disguise the total; declare when the commercial or allowance rule applies.",
        ],
        [
          "Camera, laptop or ordinary personal electronics",
          "Are they normal personal effects, newly purchased high-value goods, sale stock or professional equipment needing temporary registration?",
          "Ordinary undeclarable personal effects may use green; use red when value, purpose or temporary-import treatment needs review.",
        ],
        [
          "Cash in more than one currency",
          "What is the current declaration rule for each currency and the direction of travel?",
          "Calculate and check before the airport; use red whenever the applicable declaration condition is met.",
        ],
        [
          "A package handed to you by someone else",
          "Do you know its contents, value, ingredients and intended recipient?",
          "Do not carry an item you cannot identify. If you accept it, it remains your responsibility at inspection.",
        ],
      ],
    },
    {
      id: "companions-warning",
      type: "callout",
      title: "One family does not mean one invisible allowance",
      body:
        "Do not redistribute goods or cash merely to make each suitcase look smaller. Keep a truthful inventory of who owns and carries each item. If officers ask about the group total or purpose, answer directly rather than treating companions as separate hiding places.",
      tone: "warning",
    },
    {
      id: "electronic-heading",
      type: "heading",
      level: 2,
      text: "Paper and electronic declarations",
    },
    {
      id: "electronic-process",
      type: "list",
      ordered: true,
      items: [
        "Use the paper passenger baggage declaration at the port, or the electronic route identified by China Customs. The 2025 announcement names the Customs passenger-service mini-program in WeChat or Alipay and an internet form as pre-filing channels.",
        "Enter the goods truthfully. A screenshot that only shows a draft or loading page is not proof that the port has received and confirmed the declaration.",
        "At arrival, follow the notice to the declaration desk or other designated point, confirm the electronic data and present the goods for verification.",
        "Keep the confirmation, declaration number and any Customs document offline until the journey and any temporary-import obligation are complete.",
        "If the electronic service fails, ask for the paper process. A dead battery, blocked page or missing local account does not cancel the declaration duty.",
      ],
    },
    {
      id: "airport-heading",
      type: "heading",
      level: 2,
      text: "What to do at the airport",
    },
    {
      id: "airport-workflow",
      type: "list",
      ordered: true,
      items: [
        "Complete immigration and collect every checked bag before making the Customs-channel decision, unless the airport's transfer procedure gives a different official instruction.",
        "Pause where the red and green signs are still visible. Put declarations, permits, prescriptions, invoices and item photographs where you can reach them without unpacking the entire suitcase.",
        "Choose red if any written-declaration category applies. State what the item is, how much you have, why you carry it and whether it will remain in or leave China.",
        "Choose green only after the inventory contains no declarable item. Continue to follow officers' directions if selected for inspection.",
        "Before leaving the controlled area, read and retain any receipt, tax notice, detention record, surrender record or temporary-import document. Ask how and where the next step must be completed.",
      ],
    },
    {
      id: "inspection-expectation",
      type: "paragraph",
      text:
        "An inspection is not evidence that you chose wrongly. Customs may inspect baggage from either channel. Keep answers short and factual, open bags only when directed, and use a translation tool or request language help if a technical term is unclear. Do not sign a document you have not tried to understand; ask what it records and request your copy.",
    },
    {
      id: "paperwork-heading",
      type: "heading",
      level: 2,
      text: "Documents worth keeping together",
    },
    {
      id: "paperwork-table",
      type: "table",
      caption: "A small offline Customs folder",
      columns: ["Document", "Why it helps", "Limit"],
      rows: [
        [
          "Product label and ingredient list",
          "Identifies food, medicine, biological or plant content.",
          "A label does not replace a required permit.",
        ],
        [
          "Prescription or medical letter",
          "Explains the generic drug, dose, quantity and treatment purpose.",
          "It does not automatically authorise a controlled substance.",
        ],
        [
          "Receipts and invoices",
          "Support value, ownership and purchase date.",
          "Customs decides the applicable valuation and allowance rules.",
        ],
        [
          "Permit, approval or quarantine certificate",
          "Lets officers verify the exact authority and item.",
          "Check validity, name, quantity and port conditions before travel.",
        ],
        [
          "Return ticket, equipment list or serial numbers",
          "Can support an explanation that professional equipment will leave again.",
          "It is not a substitute for temporary-import formalities when those are required.",
        ],
      ],
    },
    {
      id: "mistakes-heading",
      type: "heading",
      level: 2,
      text: "Five shortcuts that create avoidable risk",
    },
    {
      id: "mistakes-list",
      type: "list",
      items: [
        "‘It is sealed’ — packaging says nothing about whether an ingredient or product category is prohibited or controlled.",
        "‘It is a gift’ — gifts can still be restricted, taxable, over an allowance or commercial in quantity.",
        "‘I bought it duty-free’ — departure-store duty-free status does not decide the arrival allowance.",
        "‘I will throw it away if stopped’ — declare first; do not hide or abandon items in the terminal outside an official process.",
        "‘The green line is shorter’ — queue length is never a legal test for the contents of your baggage.",
      ],
    },
    {
      id: "failure-backup",
      type: "callout",
      title: "If you entered green and then remember an item",
      body:
        "Stop before leaving the Customs-controlled area and tell an officer immediately. Explain what you forgot and where it is. Voluntary clarification is safer than concealment or disposal. If the item is retained, taxed, surrendered or returned, request the official record and the exact next step; do not pay an unofficial intermediary.",
      tone: "warning",
    },
    {
      id: "scope-boundary",
      type: "callout",
      title: "Scope and live-rule boundary",
      body:
        "This guide explains how to choose a passenger baggage channel; it does not publish universal alcohol, tobacco, cash, medicine, duty-free or import limits. Those rules change by item, quantity, traveller status and direction. Check the current declaration form and the exact competent authority in the week of travel. Homeground's ‘declare or ask when uncertain’ advice is a risk-control judgment, not a guarantee of admission or penalty treatment.",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Resolve the item before you reach Customs",
      items: [
        {
          label: "Can you bring food, plants or animal products into China?",
          href: "/guides/food-plants-and-animal-products-into-china/",
          description: "Run the quarantine screen before packing, then return here to choose the channel.",
        },
        {
          label: "Check China entry requirements",
          href: "/guides/china-entry-requirements/",
          description: "Immigration permission and Customs clearance are separate decisions.",
        },
        {
          label: "Check power bank rules for flights and trains",
          href: "/guides/china-power-bank-rules-flights-trains/",
          description: "Transport-safety acceptance is separate from Customs treatment.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        {
          label: "Customs Announcement No. 43 of 2025 on passenger baggage declarations",
          url: "https://app.www.gov.cn/govdata/gov/202504/05/526129/article.html",
          publisher: "General Administration of Customs / State Council",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Customs clearance guide",
          url: "https://english.customs.gov.cn/statics/88707c1e-aa4e-40ca-a968-bdbdbb565e4f.html",
          publisher: "General Administration of Customs",
          reviewedAt: "2026-08-12",
        },
        {
          label: "Red and green baggage channels",
          url: "https://english.customs.gov.cn/statics/3a12c746-51e1-4d94-8fc1-44a573fad090.html",
          publisher: "General Administration of Customs",
          reviewedAt: "2026-08-12",
        },
      ],
    },
  ],
};

export default body;
