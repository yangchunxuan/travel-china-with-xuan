import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "After a legitimate booking has been completed, treat the exact passport linked to the order as both the identity key and the recovery key. Save the confirmed order and traveller record, carry the original valid passport, and arrive early enough to use a staffed verification lane if an automatic reader does not accept it. A screenshot can help staff find the order, but it does not replace the identity document or create a valid ticket."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "Short answer",
      "body": "Use one chain: confirmed order → exact document record → original passport → official checkpoint. Before travel, compare the order's document number and journey/visit details with the passport in hand. At the venue or station, try the instructed lane once; if it fails, stop and ask staff to retrieve the booking instead of scanning repeatedly, borrowing another document or following someone through.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Know what each item proves"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "Different evidence solves different parts of the handoff.",
      "columns": [
        "Item",
        "What it proves",
        "What it cannot replace",
        "Where to use it"
      ],
      "rows": [
        [
          "Original passport used in the booking",
          "Identity and the linked document number",
          "A missing, cancelled or wrong-date order",
          "Identity reader or staffed verification point"
        ],
        [
          "Official confirmed order",
          "Product, date/time, traveller and order/reference status",
          "The original identity document",
          "Pre-departure check and staff lookup"
        ],
        [
          "Screenshot or offline PDF",
          "A readable copy of reference details when connectivity fails",
          "Live validity or admission",
          "Show to staff as a lookup aid"
        ],
        [
          "Paper voucher or collection notice",
          "A channel-specific instruction if the official issuer supplied one",
          "Universal permission to bypass the named-ID check",
          "Only at the stated collection or entry point"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "Run the booking-to-gate handoff"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Begin only after a legal booking is confirmed through its existing official or authorized purchase channel. This guide does not choose a seller or explain how to enter a name.",
        "Open the final order and record the operator/venue, date, time, service, departure or entrance point, traveller name as displayed, masked document digits, order number and status.",
        "Compare the linked document with the physical passport you will carry. If the passport was renewed, replaced, reported lost or entered incorrectly, contact the issuer before travel rather than hoping the gate can repair it.",
        "Save the official confirmation offline and retain any collection instruction. Keep it in the same trip folder as the route to the correct station entrance, terminal or attraction gate.",
        "Check the operator's current arrival and identity-verification instructions. Allow extra time for security, manual document reading and a staffed queue; a foreign passport may use a different lane from local ID cards.",
        "At the checkpoint, present the original passport exactly as instructed. Remove covers only if staff request it, keep the document in view and do not hand it to an unofficial helper.",
        "If the reader fails once, move to the staffed lane with the original passport and order reference. Ask staff to confirm the order record, document type and correct entry point before changing anything.",
        "After successful entry or boarding, keep the passport and order available for any later onboard, gallery or exit check specified by the operator."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "Separate validation from recovery"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "Three records to keep aligned",
      "columns": [
        {
          "heading": "Identity record",
          "body": "The original passport and the exact document entry attached to the confirmed order. Replacement or correction belongs to the issuer's official process."
        },
        {
          "heading": "Entitlement record",
          "body": "The confirmed service, date/time, traveller and order status. A passport cannot turn a pending or wrong-date order into valid access."
        },
        {
          "heading": "Access instruction",
          "body": "The current station, airport or venue lane and any staffed alternative. Machine failure changes the lane, not the identity requirement."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "When the passport does not open the gate"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "Match the symptom to the record owner.",
      "columns": [
        "Symptom",
        "Likely record to check",
        "Recovery"
      ],
      "rows": [
        [
          "No order found",
          "Order/reference, date and issuing channel",
          "Show the official confirmation at the operator's staffed service point and contact the issuer if the status is not confirmed"
        ],
        [
          "Document not recognized",
          "Document type, number and reader/lane",
          "Ask staff to perform the supported manual verification; do not substitute another person's ID"
        ],
        [
          "Name or passport number mismatch",
          "Identity record in the confirmed booking",
          "Use the issuer's official correction/reissue rule; staff may refuse access when records do not match"
        ],
        [
          "Wrong station, entrance or time slot",
          "Access instruction and current location",
          "Ask official staff whether a lawful reroute or rebooking exists; do not cross a controlled gate"
        ],
        [
          "Passport missing or damaged",
          "Physical identity document",
          "Stop using the booking workflow and follow the passport-loss/replacement owner and operator instructions"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "A clean staffed-lane recovery"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "Step away from the reader so repeated attempts do not block the queue or confuse the error state.",
        "Open the official confirmation and state one precise request: 'Please check this order with this passport.'",
        "Let staff compare the original passport, document type, order number, service and date. Note which field or access point failed.",
        "If the operator can validate the order manually, follow the named staffed lane and keep the result or replacement credential they issue.",
        "If the issuer must correct or reissue, use only its official service channel and ask what happens to the original order before paying again.",
        "If time expires, retain the rejection/error record and receipts for the applicable refund or dispute process; do not attempt an identity workaround."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "What a passport-linked order does not guarantee",
      "body": "This workflow starts after a legitimate booking. It does not validate a seller, prescribe name entry, guarantee admission or boarding, waive security or identity checks, or promise that staff can correct a mismatch. Current operator rules and the confirmed order control access. Never borrow an identity document, edit a record or bypass a controlled gate.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "Five-minute pre-departure check"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "Order status says confirmed",
        "Date, time, service and entry point match the plan",
        "Original booking passport is present and valid",
        "Document record matches the passport",
        "Official confirmation is saved offline",
        "Staffed verification location is known",
        "Enough time remains for manual processing"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "Passport-as-ticket questions"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "Is a photo of my passport enough?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "No. It can support a lookup, but operators commonly require the original identity document linked to the order. Follow the current official instruction."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "What if the automatic gate cannot scan a foreign passport?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "Stop after the normal attempt and use the staffed lane. Present the original passport and confirmed order so staff can verify the supported path."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Can I use a new passport with an order made on the old one?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Do not assume the link transfers. Contact the official issuer before travel and follow its correction or reissue rule."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Related identity and access owners",
      "items": [
        {
          "label": "Passport name across bookings",
          "href": "/guides/passport-name-across-china-bookings/",
          "description": "Use the existing owner for name-entry and consistency decisions."
        },
        {
          "label": "Official or reseller tickets",
          "href": "/guides/official-or-reseller-china-tickets/",
          "description": "Choose and verify the purchase channel before this workflow starts."
        },
        {
          "label": "First China high-speed train",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Continue from identity check to station and train procedure."
        },
        {
          "label": "Lost passport recovery",
          "href": "/guides/lost-passport-in-china-exit-recovery/",
          "description": "Switch owners immediately if the original passport is missing."
        },
        {
          "label": "Forbidden City for foreign visitors",
          "href": "/guides/forbidden-city-for-foreign-visitors/",
          "description": "Use the attraction owner for the complete visit plan."
        },
        {
          "label": "Booking dispute evidence pack",
          "href": "/guides/china-booking-dispute-evidence-pack/",
          "description": "Preserve the failed handoff if access is refused."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources",
      "items": [
        {
          "label": "12306 identity-document FAQ",
          "url": "https://www.12306.cn/en/faq.html?item=2",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "12306 English FAQ",
          "url": "https://www.12306.cn/en/faq.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Guide to working and living in China 2025",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "State Council of the People's Republic of China",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Palace Museum ticket instructions",
          "url": "https://intl.dpm.org.cn/ticket_details.html",
          "publisher": "Palace Museum",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Beijing Capital passenger information",
          "url": "https://www.bcia.com.cn/lkxz.html",
          "publisher": "Beijing Capital International Airport",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
