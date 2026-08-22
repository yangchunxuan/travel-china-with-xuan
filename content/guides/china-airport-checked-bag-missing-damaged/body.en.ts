import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "If a checked bag is absent after the belt closes or arrives visibly damaged, report it at the responsible airline or baggage-service counter before leaving the reclaim/customs area whenever access rules allow. Bring the baggage tag, boarding pass and passport; photograph the belt/notice, bag or damage and obtain a written reference before you continue. Use that carrier reference—not a generic lost-property post—to trace the case and update a deliverable address."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "Short answer",
      "body": "First classify the incident: missing checked bag, damaged checked bag, or an item lost in the cabin/terminal. Only the first two belong in this workflow. Do not surrender the original bag tag or damaged item without a receipt, do not repair/discard the bag before the carrier documents it, and do not let urgent purchases erase the evidence trail. This guide does not decide legal liability, compensation or deadlines.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Route the incident to the right owner"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "Where the item was last under control determines the first report.",
      "columns": [
        "Incident",
        "First owner",
        "Evidence to present",
        "Do before leaving"
      ],
      "rows": [
        [
          "Checked tag issued; bag never appears",
          "Final operating carrier's baggage service at arrival",
          "Bag tag, boarding pass, passport, bag description and itinerary",
          "Obtain an irregularity/tracing reference and delivery/contact record"
        ],
        [
          "Checked bag arrives torn, crushed, wet or with missing external parts",
          "Carrier baggage service before exiting",
          "Bag, tag, photos from all sides and contents impact",
          "Have the visible condition recorded; ask before emergency repair"
        ],
        [
          "Bag appears on another belt or tag looks wrong",
          "Baggage hall staff and operating carrier",
          "Both physical tag and claim tag",
          "Do not take an unverified bag; let staff reconcile identifiers"
        ],
        [
          "Cabin item or terminal property missing",
          "Airline cabin service or airport lost property/security",
          "Seat/area, time and item description",
          "Switch to the correct lost-property process; no checked-bag report"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "Make the airport report usable"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Stay by the assigned belt until the flight display closes or staff confirm unloading is complete. Check oversize/special-baggage delivery and nearby belts without removing an unverified bag.",
        "Photograph the belt number, flight display and any service notice. For damage, photograph the bag where received—full bag, tag, damaged area, wheels/handles and affected contents—before altering it.",
        "Go to the final operating carrier or contracted baggage-service desk inside the controlled area. If customs routing affects access, ask uniformed airport/customs staff where the report must be made before exiting.",
        "Present the original claim tag, boarding pass, passport and full itinerary. Describe the bag by colour, brand, size, material and distinctive features; do not guess contents you cannot verify.",
        "Review the created report line by line: passenger/contact, tag number, flight/date, bag description, missing or damage classification and delivery address. Correct errors before signing or leaving.",
        "Get a case/reference number, a readable copy or electronic report, the official tracking/support channel and instructions for updating a hotel or onward-city address. Keep the original tag unless staff retain it with a written receipt.",
        "For damage, ask the carrier what inspection, repair estimate or retention it requires before arranging a repair or discarding packaging. Photograph any item handed over and obtain a receipt.",
        "Before leaving, ask how to report itinerary/address changes and where a returned bag will be delivered or collected. Confirm that the hotel accepts luggage and whose name/number staff should use."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "Build a traceable incident record"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "Bag identity, condition and handoff",
      "columns": [
        {
          "heading": "Bag identity",
          "body": "Claim-tag number, physical description, flight and passenger are aligned. A photo of the bag from before the trip helps distinguish it."
        },
        {
          "heading": "Incident condition",
          "body": "Missing versus damaged is recorded with time and images before repair, disposal or onward handling changes the evidence."
        },
        {
          "heading": "Recovery handoff",
          "body": "Carrier reference, tracking channel and a reachable delivery/collection address are confirmed. Update them when the itinerary moves."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "When the first report is incomplete"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "Repair the evidence record without inventing facts or legal claims.",
      "columns": [
        "Problem",
        "Action",
        "Trip-continuity fallback"
      ],
      "rows": [
        [
          "Counter cannot find the tag",
          "Show the boarding record and claim-tag photo; ask the final carrier to verify acceptance and transfer scans",
          "Keep the no-report interaction details and contact the carrier's official baggage channel"
        ],
        [
          "Desk is closed or already exited",
          "Photograph the closed desk/location and contact the carrier/airport immediately through its official route",
          "Request written instructions and a reference; do not wait until the trip ends"
        ],
        [
          "Delivery address will change",
          "Update the case through the official channel and confirm the new hotel can receive",
          "Choose carrier collection if delivery cannot be reliably accepted"
        ],
        [
          "Essential medication or equipment is inside",
          "Tell the baggage desk exactly what is needed, then contact a pharmacist/medical provider or equipment owner",
          "Do not wait for the bag when health or safe mobility requires a replacement plan"
        ],
        [
          "Carrier asks to keep the damaged bag",
          "Photograph it, inventory handed-over contents and obtain a signed/electronic receipt",
          "Retain essentials and a copy of every document"
        ],
        [
          "Tracking page has no change",
          "Use the case number to ask the responsible carrier for a current trace note",
          "Continue the trip with a controlled essentials budget; no promised delivery time"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "Continue the trip while the case is open"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "Make a 24-hour essentials list from actual need: medication replacement through an appropriate professional, basic toiletries, one clothing layer and required charging/accessibility items.",
        "Ask the responsible carrier or insurer what evidence and approval it requires before spending. Keep the answer as guidance, not a promise of reimbursement.",
        "Buy proportionately and preserve itemized receipts, payment records and photos. Separate essentials from convenience or replacement of high-value items.",
        "Keep a contact log with date, time, channel, staff/agent identifier, case number and the factual update. Save screenshots without overwriting earlier states.",
        "Update delivery instructions before changing hotels or cities. Include the booking guest name, dates, front-desk contact and what happens if the hotel refuses the bag.",
        "When a bag returns, photograph the seal/condition before accepting, compare the tag and contents, and add new damage or missing contents to the existing official case promptly.",
        "Close the record only after physical receipt and transaction questions are reconciled; retain copies for any separate airline, insurer or legal process."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "No liability, compensation or timing decision",
      "body": "This operational guide does not determine legal liability, treaty application, claim deadlines, compensation, reimbursement, repair value or delivery time. Those depend on the itinerary, carrier terms, applicable law, evidence and the competent decision-maker. Obtain carrier and qualified legal or insurance advice for those questions. The practical priority here is a prompt report, preserved evidence, a traceable handoff and safe trip continuity.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "Leave the baggage hall with"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "Correct case/reference number",
        "Copy of the report",
        "Original tag or receipt for anything retained",
        "Bag/damage and belt photographs",
        "Official tracking/support channel",
        "Reachable delivery or collection plan",
        "Address-update method",
        "Essential-purchase evidence rule understood"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "Checked-baggage incident questions"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "Should I leave the baggage hall and report later?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "Report before leaving whenever the controlled-area rules allow. If the desk is inaccessible or closed, document that fact and contact the responsible carrier immediately through its official channel."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Can the airport lost-property desk trace my checked bag?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "A checked bag should begin with the responsible operating carrier or its baggage-service contractor. Cabin or terminal items follow a different airline/airport lost-property route."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Will the airline pay for replacement items?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "This page cannot promise that. Ask the carrier or insurer what it currently requires and preserve itemized evidence; liability and reimbursement need a case-specific decision."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Related baggage, evidence and trip-recovery owners",
      "items": [
        {
          "label": "Domestic fare and baggage bundles",
          "href": "/guides/china-domestic-flight-fare-bundle-baggage/",
          "description": "Confirm purchased baggage before departure."
        },
        {
          "label": "Separate-ticket self-transfer risk",
          "href": "/guides/china-separate-flight-tickets-self-transfer-risk/",
          "description": "Understand who controls a bag at a self-transfer handoff."
        },
        {
          "label": "Booking dispute evidence pack",
          "href": "/guides/china-booking-dispute-evidence-pack/",
          "description": "Organize records for an unresolved carrier or payment issue."
        },
        {
          "label": "China airport layover decisions",
          "href": "/guides/china-airport-layover-immigration-bags-airside-overnight/",
          "description": "Confirm baggage collection and transfer before a layover."
        },
        {
          "label": "Lost passport recovery",
          "href": "/guides/lost-passport-in-china-exit-recovery/",
          "description": "Use the identity-document owner if the passport, not a checked bag, is missing."
        },
        {
          "label": "Last night before an international flight",
          "href": "/guides/china-last-night-before-international-flight/",
          "description": "Keep departure records and essentials accessible."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources",
      "items": [
        {
          "label": "China civil aviation passenger and baggage rules",
          "url": "https://www.caac.gov.cn/big5/www.caac.gov.cn/English/News/202305/W020230515366504232292.pdf",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Air China baggage irregularity guidance",
          "url": "https://webresource.airchina.com.cn/en-US/content/c/2022-10-21/5411.shtml?hySource=airchina-pc&hyUploadType=series",
          "publisher": "Air China",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Air China baggage tracking",
          "url": "https://www.airchina.com.cn/flight/query-services/baggage-loss-and-delay",
          "publisher": "Air China",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "China Southern baggage tracking",
          "url": "https://www.csair.com/en/online/outbaggage/?orderChannel=FWDT-ZJC",
          "publisher": "China Southern Airlines",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
