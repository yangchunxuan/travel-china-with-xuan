import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "Build a China departure-tax-refund claim as a chain of evidence, not an expected cash amount. Before paying, confirm that the shop participates and ask which path it supports: the standard refund at departure or an instant-refund arrangement that still carries departure obligations. Keep the eligible goods, passport, invoice, refund form and payment/refund instrument together; reach the departure point early enough to complete customs verification before the refund-agency handoff."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "Short answer",
      "body": "A shop's tax-refund sign starts the check; it does not guarantee eligibility or a final amount. Verify the current rules, obtain correctly issued documents, keep goods available for customs and follow the airport or port sequence before check-in when required. Instant refund is not 'finished at the shop': departure verification and any agreed authorization or guarantee still matter.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Choose the correct processing lane"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "The store's paperwork and the current departure-port process determine the lane.",
      "columns": [
        "Purchase position",
        "Evidence to confirm",
        "Departure action",
        "Risk to avoid"
      ],
      "rows": [
        [
          "Participating shop, standard departure refund",
          "Passport, sales invoice and completed refund application form",
          "Present goods and documents to customs, then use the designated refund agency",
          "Checking in the goods before learning whether customs needs to inspect them"
        ],
        [
          "Participating instant-refund shop",
          "Instant-refund agreement, payment/refund instrument and departure obligations",
          "Complete the required customs verification and agency/guarantee release at departure",
          "Treating the advance payment as unconditional or final"
        ],
        [
          "Several purchases or regions",
          "A separate valid document set for each purchase and the currently supported processing route",
          "Sort forms by shop and ask the departure service point how the current cross-region process applies",
          "Combining totals or assuming every port handles every document identically"
        ],
        [
          "Document, goods or identity mismatch",
          "Store correction or official service-desk instruction",
          "Resolve before the final processing cutoff if possible",
          "Editing documents yourself or promising that staff can waive a missing requirement"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "From shop counter to departure"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Before purchase, check the State Taxation Administration's current eligibility conditions and ask the store to show its departure-tax-refund participation. Confirm whether it offers standard departure processing or instant refund.",
        "Present the same valid passport you will use to depart. Ask the shop to check the name, document number, invoice details and goods against its system before you leave the counter.",
        "Collect the sales invoice, departure refund application form and any instant-refund agreement or authorization. Photograph both sides, but preserve the originals in a dedicated envelope.",
        "Keep the goods identifiable and available for customs. Do not use, consume, open, separate or check them in until you understand the current eligibility and inspection rule for that category and port.",
        "Before departure day, locate the customs verification point and refund agency for the correct terminal or port. Ask whether verification occurs before airline check-in, especially for items intended for checked baggage.",
        "At customs, present the passport, eligible goods, invoice and refund form as directed. A customs release or verification is a separate step from payment by the refund agency.",
        "Proceed to the designated agency with the verified documents and requested payment/refund instrument. For instant refund, complete any release of the preauthorization or guarantee required by the current process.",
        "Keep the stamped or electronic outcome, receipts and transaction reference until the refund or guarantee status is reconciled. Record who to contact before leaving the port."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "Confirm the evidence chain"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "Store, customs and refund agency",
      "columns": [
        {
          "heading": "Store",
          "body": "Confirms participation and issues the invoice, application and any instant-refund agreement against the traveller's actual passport and goods."
        },
        {
          "heading": "Customs",
          "body": "Performs the required departure verification. Keep goods accessible and follow the actual port sequence; a store form does not replace this step."
        },
        {
          "heading": "Refund agency",
          "body": "Processes the verified claim or closes the instant-refund authorization under current rules. Method, fees and settlement are not guaranteed by this page."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "Failure points and recovery"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "A missing link can stop the claim; identify it before improvising.",
      "columns": [
        "Problem",
        "Best next action",
        "What cannot be promised"
      ],
      "rows": [
        [
          "Store is not participating",
          "Do not buy on the assumption of a refund; compare the purchase on its final retail price",
          "That another branch or a sign nearby makes this transaction eligible"
        ],
        [
          "Name, passport number or invoice detail is wrong",
          "Return to the issuing store or its official service channel immediately",
          "That airport staff can correct store-issued evidence"
        ],
        [
          "Goods already checked in",
          "Tell customs exactly where they are and follow the port's instruction",
          "That inspection can be waived or the bag retrieved in time"
        ],
        [
          "Instant-refund departure verification incomplete",
          "Contact the designated agency using the agreement/reference and preserve proof of departure attempts",
          "That an advance refund will remain yours or a guarantee will be released"
        ],
        [
          "Payment has not appeared",
          "Use the agency transaction reference and issuer records to trace it",
          "A settlement date, exchange rate, fee or final amount"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "If the claim cannot be completed as planned"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "Pause before airline check-in if customs may need to see checked goods; ask the official port desk for the correct sequence.",
        "Separate a store-document error from a customs-verification problem and a refund-agency payment problem. Each has a different owner.",
        "Request a written or electronic record of rejection, missing evidence or pending status instead of accepting only a verbal explanation.",
        "For instant refund, contact the named service provider promptly and follow the agreement's official correction or guarantee process.",
        "Keep invoices, forms, goods photos, boarding pass, departure evidence and transaction references until every charge and refund line is reconciled.",
        "If a deadline or eligibility condition is missed, close the trip budget without counting the refund and seek professional tax advice only for a material unresolved case."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "No refund amount or outcome is promised",
      "body": "This guide does not determine whether a purchase qualifies, calculate or guarantee the refund, fees, exchange rate, payment time, customs release or instant-refund guarantee outcome. Current tax rules, the participating store, the goods, documents, departure facts, customs and the refund agency control the result. Budget as though the refund may be delayed or unavailable.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "Evidence packet to carry"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "Departure passport",
        "Original sales invoices",
        "Original refund forms",
        "Instant-refund agreement and instrument if used",
        "Eligible goods kept identifiable and accessible",
        "Correct port/terminal customs location",
        "Refund-agency details and transaction references",
        "Enough time before check-in and security"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "China tourist tax refund questions"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "Does instant refund mean there is nothing to do at the airport?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "No. The current official process still links the advance to departure verification and related authorization or guarantee steps. Read the agreement and complete the port workflow."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Can I pack the goods in checked baggage?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "First ask the departure port where customs inspection occurs. If customs must see the goods before check-in, keep the bag accessible until verification is complete."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "How much will I receive?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Do not use this guide as a calculator. Ask the participating store and designated agency for the current transaction-specific calculation, including any fee and payment method."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Related evidence and departure owners",
      "items": [
        {
          "label": "China customs red and green channels",
          "href": "/guides/china-customs-red-green-channels/",
          "description": "Keep declaration decisions separate from the refund counter."
        },
        {
          "label": "Last night before an international flight",
          "href": "/guides/china-last-night-before-international-flight/",
          "description": "Protect the time needed for departure formalities."
        },
        {
          "label": "How tourists pay in China",
          "href": "/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "Set up the payment instrument used at the shop."
        },
        {
          "label": "Evidence pack for a booking dispute",
          "href": "/guides/china-booking-dispute-evidence-pack/",
          "description": "Apply the same clean-record method to unresolved transactions."
        },
        {
          "label": "Missing or damaged checked bag",
          "href": "/guides/china-airport-checked-bag-missing-damaged/",
          "description": "Know what to record if a checked bag creates a departure problem."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources",
      "items": [
        {
          "label": "Departure tax refund policy upgrade effective July 2026",
          "url": "https://www.chinatax.gov.cn/eng/c101269/c5250095/content.html",
          "publisher": "State Taxation Administration",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Departure tax refund policy overview",
          "url": "https://www.chinatax.gov.cn/eng/c101276/c102444/c5240901/content.html",
          "publisher": "State Taxation Administration",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Instant tax refund process",
          "url": "https://www.chinatax.gov.cn/eng/c101276/c102444/c5240464/content.html",
          "publisher": "State Taxation Administration",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Refund-upon-departure process",
          "url": "https://www.chinatax.gov.cn/eng/c101276/c102444/c5240906/content.html",
          "publisher": "State Taxation Administration",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
