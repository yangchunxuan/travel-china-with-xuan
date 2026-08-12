import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "Choose by the job your phone must do. A travel eSIM can be the simplest data-only route; a mainland SIM supplies a mainland mobile number; dual SIM can preserve your usual number while adding one of those. Device support, carrier onboarding and network behavior are product-specific, so confirm the live details before paying."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "Start with one of four paths",
      "columns": [
        "Situation",
        "Route",
        "Action"
      ],
      "rows": [
        [
          "I only need data",
          "Travel eSIM or home-carrier roaming",
          "Buy and install before departure; keep the purchase QR code offline."
        ],
        [
          "I need a mainland number",
          "Local SIM from an operator service hall",
          "Bring the original passport and expect real-name registration."
        ],
        [
          "I need both",
          "Dual SIM: keep home line plus data eSIM or local SIM",
          "Check the exact model, region variant and active-line limits."
        ],
        [
          "My phone is incompatible or locked",
          "Compatible unlocked spare phone, pocket Wi-Fi or roaming",
          "Do not buy a profile or SIM until lock and band support are confirmed."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "What each option actually gives you"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "A travel eSIM is commonly data-only. It may not provide a mainland +86 mobile number, ordinary voice service or SMS. Read the product page rather than inferring these features from the word eSIM.",
        "A mainland operator SIM normally provides a local number and requires real-name registration. Official Beijing guidance directs visitors to China Mobile, China Unicom or China Telecom service halls with the original passport.",
        "A local number can be useful where a venue, delivery service or account asks for mainland SMS. It is not required for every visitor task: official payment guidance says major mobile-payment apps can register foreign or Chinese phone numbers.",
        "A dual-SIM label does not mean any two lines can be active together. Apple, Google and Samsung document different model and regional capabilities; confirm your exact model number and whether it is carrier-unlocked."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "Set it up without creating one point of failure"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Before flying, check the model number—not just the marketing name—for eSIM, physical-SIM, dual-active and carrier-lock status.",
        "If choosing a travel eSIM, install it on reliable Wi-Fi but leave it disabled until the provider's activation instructions say otherwise. Save the QR code, order number and support route offline.",
        "If choosing a local SIM, use an official operator service hall. Bring the original passport; ask staff to write down the number, plan expiry, recharge method and cancellation conditions.",
        "Keep your usual line available if it receives bank or account codes. Disable expensive data roaming on that line while preserving SMS access if your carrier permits it.",
        "Test data, calls and SMS separately. A working browser does not prove that the line has voice, a +86 number or incoming verification messages."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "If the first plan fails",
      "body": "No eSIM menu: recheck the precise device variant and lock status, then switch to a physical local SIM, roaming, pocket Wi-Fi or a compatible spare phone. Local SIM activation fails: ask the operator hall to verify the passport entry, not a reseller to improvise it. Data works but an app does not: treat that as an app or routing problem, not proof that all eSIMs or all local SIMs behave the same.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "Scope and live-rule boundary",
      "body": "As reviewed on 12 August 2026, mainland-carrier eSIM support remains device- and carrier-specific. Apple currently documents mainland carrier eSIM for particular mainland-market iPhone models and says foreign-purchased iPhones cannot install mainland-carrier profiles. That restriction is not a universal statement about travel eSIMs or Android devices. Always use the manufacturer and provider pages for the exact phone and product.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Set up payments",
          "href": "/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "Phone-number registration and payments are separate decisions."
        },
        {
          "label": "Check entry requirements",
          "href": "/guides/china-entry-requirements/",
          "description": "Keep passport and arrival documents ready."
        },
        {
          "label": "Plan your first train trip",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Know what must work before the station."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "MIIT real-name registration rules (2026 republication)",
          "url": "https://sdca.miit.gov.cn/zwgk/fgbz/art/2026/art_9b270ddb59cc4643b0a9c6811c4e750d.html",
          "publisher": "Ministry of Industry and Information Technology",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Purchasing SIM cards in Beijing",
          "url": "https://english.beijing.gov.cn/quickguideservices/purchasingsimcards/",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Using eSIM while traveling in China mainland",
          "url": "https://support.apple.com/en-us/118227",
          "publisher": "Apple Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China mainland carrier eSIM on iPhone",
          "url": "https://support.apple.com/en-mide/123879",
          "publisher": "Apple Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Foreign and Chinese phone numbers for mobile payment registration",
          "url": "https://nsd.mofcom.gov.cn/tzyts/art/2024/art_a08888d0b9da42f083b00223edaf1de7.html",
          "publisher": "Ministry of Commerce",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
