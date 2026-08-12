import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "A lost passport is recoverable, but a photocopy is not a travel document. The official sequence is local exit-entry documentation, replacement through your embassy or consulate, then any required visa or stay-document reissue before departure. Start immediately and keep every receipt and certificate."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "The recovery chain",
      "columns": [
        "Situation",
        "Route",
        "Action"
      ],
      "rows": [
        [
          "1. Secure",
          "Protect accounts and search safely",
          "Record where and when the passport disappeared; report theft to police."
        ],
        [
          "2. Document",
          "Contact the local public security exit-entry authority",
          "Ask for the passport loss certificate or the locally required proof."
        ],
        [
          "3. Replace",
          "Contact your embassy or consulate",
          "Follow its emergency passport or travel-document process."
        ],
        [
          "4. Regularise and exit",
          "Return to the local exit-entry authority if required",
          "Obtain the visa, stay permit or exit document needed for lawful departure."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "What to do in the first hour"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "If there was theft or immediate danger, call police on 110. For a simple loss, ask hotel staff or a trusted local contact for the nearest public security and exit-entry office.",
        "Freeze or monitor anything stored with the passport, but do not publish a full passport scan online. Save a copy of the photo page, visa, entry stamp, police record and booking confirmations in a controlled folder.",
        "Call the embassy or consulate using contact details from its official website. Ask what identity evidence, photos, appointment, fee and police or exit-entry proof it requires.",
        "Tell your airline, rail operator and hotel that the identity document will change. Do not cancel first if a documented correction path exists."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "Rebuild the documents in order"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Obtain the local loss certificate or other proof directed by the public security exit-entry authority.",
        "Apply to your embassy or consulate for a replacement passport or emergency travel document. Processing and eligibility are country-specific.",
        "With the new document and loss proof, ask the local exit-entry authority whether your visa, stay permit or exit document must be reissued.",
        "Check the new document number and name against every flight, train, hotel and insurance record; use the provider's official correction route.",
        "Carry originals and copies to the airport and arrive early. Border inspection—not the airline or hotel—decides whether exit documents are sufficient."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "If departure is close",
      "body": "Do not assume an embassy emergency document alone completes the China-side process. Contact the local NIA/exit-entry office and airline immediately, document every instruction, and move flexible bookings only after you understand what cannot be issued in time. Overstay or document questions need official handling, not a workaround.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "Scope and live-rule boundary",
      "body": "Embassy procedures, local office appointments and document names vary. The National Immigration Administration describes the core sequence, but your embassy issues your national travel document and the local exit-entry authority decides the China-side visa or exit paperwork. This guide cannot promise same-day replacement or border acceptance.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "China entry requirements",
          "href": "/guides/china-entry-requirements/",
          "description": "Understand the document roles you are rebuilding."
        },
        {
          "label": "Final night before an international flight",
          "href": "/guides/china-last-night-before-international-flight/",
          "description": "Recheck documents and airport timing."
        },
        {
          "label": "Open-jaw flight planning",
          "href": "/guides/china-open-jaw-flights-route-planning/",
          "description": "Review a changed departure city without losing the route logic."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "Lost or damaged foreign passport procedure",
          "url": "https://en.nia.gov.cn/n147428/n147498/n147780/n147970/c159250/content.html",
          "publisher": "National Immigration Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Entry and stay rules for foreigners",
          "url": "https://en.nia.gov.cn/n147423/n147478/n147715/c158215/content.html",
          "publisher": "National Immigration Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China guide for business expatriates (emergency numbers)",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "State Council of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
