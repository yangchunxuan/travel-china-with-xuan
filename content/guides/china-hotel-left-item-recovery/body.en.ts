import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "Contact the exact property through the booking record or its verified official channel. Give stay dates, lead guest, room and checkout time, then describe the item without revealing its one private identifier. Ask staff to search, open a lost-property record and report the identifier back. Once matched, choose the shortest controlled route: collect yourself, authorise one person, or ship only after an official carrier accepts the exact contents."
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "Short answer",
      "tone": "decision",
      "body": "First verify that the hotel has your item; do not pay a courier based on ‘we found it’ alone. Get a case number, neutral photograph or description, current custodian and deadline. Self-collection has the cleanest chain. An authorised collector works when the hotel accepts a written authorisation and checks identity. Shipping is the last option: agree item list, packaging, declared value or insurance choice, address, official payment, tracking and who carries risk at each handoff. Route passports, active phones, medicines, cash, batteries, liquids and other sensitive or restricted objects through the relevant specialist and carrier rather than assuming they can be posted."
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "This guide coordinates recovery; it does not determine legal ownership, accuse staff, set compensation or approve an item for domestic or international carriage. It cannot promise the search result, preservation condition, storage period, same-day courier, customs acceptance, delivery time or reimbursement. Immediate digital, medical, identity or personal-safety risks take priority over recovering the physical object."
    },
    {
      "id": "triage-heading",
      "type": "heading",
      "level": 2,
      "text": "Choose the recovery route after the item matches"
    },
    {
      "id": "triage-matrix",
      "type": "table",
      "caption": "Use the fewest accountable handoffs",
      "columns": [
        "Item and situation",
        "Verify",
        "Collect",
        "Ship"
      ],
      "rows": [
        [
          "Passport or travel document",
          "Match privately and secure with duty manager",
          "Self or authority-approved route is strongest",
          "Do not assume ordinary shipment; use passport-recovery guidance"
        ],
        [
          "Active phone, keys or wallet",
          "Use hidden identifier; contain accounts/access now",
          "Self or trusted authorised person",
          "Only after security action and carrier acceptance"
        ],
        [
          "Medicine or medical device",
          "Identify exact product without public photos of personal data",
          "Collect urgently or seek safe replacement advice",
          "Carrier and destination rules decide; time may make it unsuitable"
        ],
        [
          "Clothing or ordinary durable item",
          "Colour, brand, pocket detail and room context",
          "Simple if traveller remains nearby",
          "Often possible only after inspection and packaging agreement"
        ],
        [
          "Fragile or high-value item",
          "Serial/mark and condition photographs",
          "Controlled collection preferred",
          "Ask about suitable packaging and declared-value options; no outcome guarantee"
        ],
        [
          "Perishable, leaking or suspicious item",
          "Do not ask staff to handle beyond policy",
          "Follow hotel/authority direction",
          "Do not ship unless an official carrier explicitly accepts it"
        ]
      ]
    },
    {
      "id": "workflow-1-heading",
      "type": "heading",
      "level": 2,
      "text": "Open one verified lost-property record"
    },
    {
      "id": "workflow-1-context",
      "type": "paragraph",
      "text": "The first goal is a match, not a public description. Contact details found in an unsolicited message or search advertisement are not enough."
    },
    {
      "id": "workflow-1-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Open the original booking and confirm property name, Chinese address, stay dates, lead guest, room number and checkout time.",
        "Use the platform thread, official website number or a number confirmed by the platform; ask for the front office or duty manager.",
        "Describe category, colour, likely location and time, but hold back one private marker such as a serial suffix, engraving, pocket contents or distinctive damage.",
        "Ask staff to search the room, linen/housekeeping flow, safe, charging points and lost-property store, then give the held-back marker back to you.",
        "Obtain a case ID, matched description, condition, current custodian, storage location, contact role and the property's stated action deadline in writing."
      ]
    },
    {
      "id": "workflow-2-heading",
      "type": "heading",
      "level": 2,
      "text": "Collect with a signed handoff"
    },
    {
      "id": "workflow-2-context",
      "type": "paragraph",
      "text": "Do not send a ride-hailing driver or unknown courier as an improvised collector unless the hotel explicitly accepts that process and can verify the recipient."
    },
    {
      "id": "workflow-2-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "For self-collection, agree the desk and hours, bring the identity or booking evidence the hotel requests, inspect the object and sign only for what you receive.",
        "For a trusted person, ask the hotel what authorisation and redacted identity copies it needs; name one collector and one collection window.",
        "Send the collector the case ID and a one-use confirmation phrase through a private channel; do not send passport scans into an unverified chat.",
        "Require a handoff photograph or receipt showing date, hotel role, collector and item count, with unnecessary personal data covered."
      ]
    },
    {
      "id": "workflow-3-heading",
      "type": "heading",
      "level": 2,
      "text": "Ship only after the carrier accepts the contents"
    },
    {
      "id": "workflow-3-context",
      "type": "paragraph",
      "text": "The hotel finding the item does not make it mailable. Domestic and international routes, batteries, liquids, medicines, documents, cash and valuables can produce different rules."
    },
    {
      "id": "workflow-3-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Tell an official carrier the exact item, quantity, battery or liquid status, value, origin and destination; ask for the permissible service and required inspection.",
        "Agree in writing who packs, who pays necessary costs, whether the carrier packs, and what declared-value or insurance option is actually available.",
        "Before sealing, obtain photographs of item condition and every included piece; after sealing, photograph the package, label and tamper points without sharing them publicly.",
        "Pay through the hotel's documented channel or the carrier's official link/account, never a stranger's personal request without verification.",
        "Receive the official waybill and tracking number; record the hotel-to-carrier pickup time and name/role, then monitor the first acceptance scan."
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "Recover when the chain breaks"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "Return to the last documented custodian",
      "columns": [
        "Failure",
        "Immediate response",
        "Escalation boundary"
      ],
      "rows": [
        [
          "First shift says nothing was found",
          "Ask for a second search across housekeeping and storage at shift change",
          "Provide facts once; do not repeatedly reveal new identifiers"
        ],
        [
          "Photograph resembles but does not prove the item",
          "Ask staff to check the held-back marker privately",
          "Do not claim, pay or authorise release until it matches"
        ],
        [
          "Hotel requests payment to a personal account",
          "Verify the staff role through the official property/platform channel",
          "Use an official invoice or carrier payment path"
        ],
        [
          "Carrier refuses the contents",
          "Do not conceal, relabel or split the object to bypass inspection",
          "Choose collection, an eligible specialist service or lawful disposal/authority route"
        ],
        [
          "Tracking has no acceptance scan",
          "Contact the last recorded hotel custodian and official carrier",
          "Treat a label alone as not yet handed over; preserve the timeline"
        ],
        [
          "Passport or phone is not secured",
          "Start the specialist identity/digital recovery immediately",
          "Physical search continues in parallel; do not wait for shipping"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "A found-item message is not the completed recovery",
      "tone": "warning",
      "body": "The hotel has to identify an object and claimant safely, and carriers must inspect what they accept. This page cannot guarantee discovery, condition, storage, release to a representative, shipping legality, customs entry, declared-value coverage, tracking or delivery. Do not share passwords, one-time codes, complete card data or unnecessary passport pages, and never misdescribe package contents."
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "Next step: send the search message now",
      "tone": "decision",
      "body": "Send: ‘Booking __, guest __, room __, checkout __. I left a [category/colour] near __. Please open a lost-property record, search housekeeping and storage, and tell me whether it has [private marker] without posting that marker publicly. Please give the case ID, current custodian, condition and action deadline.’ Choose collection or shipping only after the marker matches."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue the recovery and prevention plan",
      "items": [
        {
          "label": "Use the lost-passport exit path",
          "href": "/guides/lost-passport-in-china-exit-recovery/",
          "description": "If the hotel cannot immediately secure and return the passport, protect the exit timeline with the dedicated owner."
        },
        {
          "label": "Contain a lost phone first",
          "href": "/guides/lost-phone-in-china-digital-recovery/",
          "description": "Lock accounts and preserve communications even while the hotel searches."
        },
        {
          "label": "Build an evidence file if recovery fails",
          "href": "/guides/china-booking-dispute-evidence-pack/",
          "description": "Organise the custody, messages, payment and replacement record before escalation."
        },
        {
          "label": "Browse China stay decisions",
          "href": "/stay/",
          "description": "Return to the neutral accommodation-planning collection."
        },
        {
          "label": "Protect the final night next time",
          "href": "/guides/china-last-night-before-international-flight/",
          "description": "Use a final-night document, device and luggage sweep before leaving the hotel."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official hotel-security, civil-law, postal and image sources",
      "items": [
        {
          "label": "Measures for the Security Administration of the Hotel Industry",
          "url": "https://xzfg.moj.gov.cn/mobile/law/detail?LawID=792",
          "publisher": "National Administrative Regulations Database, Ministry of Justice",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Civil Code of the People's Republic of China",
          "url": "https://www.court.gov.cn/zixun/xiangqing/233181.html",
          "publisher": "Supreme People's Court",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Rules on acceptance inspection of mail and express items",
          "url": "https://www.spb.gov.cn/gjyzj/c200045/201507/603f78a94f6f4b4280126eb496ae92bf.shtml",
          "publisher": "State Post Bureau",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Hero: Longhai hotel reception by Vmenkov, CC BY-SA 3.0",
          "url": "https://commons.wikimedia.org/wiki/File:Longhai_-_Hotel_reception_-_P1260519.JPG",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
