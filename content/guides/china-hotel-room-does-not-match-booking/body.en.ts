import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "Pause at the room door. Before using the bed or bathroom, save the confirmation and photograph the assigned room in one continuous sequence. Separate a material mismatch—wrong beds, smoking status, window, access feature, occupancy or unsafe/unusable condition—from a preference. Ask the duty manager for one workable correction and a short written cutoff; relocate only when an essential condition cannot be restored safely."
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "Short answer",
      "tone": "decision",
      "body": "Verify first, because the room name alone may not describe the booked attributes. If the difference is material, show the confirmation and request either the confirmed room or one specific equivalent that preserves every essential feature. Inspect the replacement before moving luggage. If there is a safety issue, no usable room, or no accountable answer by your stated cutoff, secure a reasonable nearby replacement and preserve both the original order and new receipt. A room change, refund or reimbursement is never automatic."
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "This is an on-site recovery workflow, not a damages calculator or legal determination. It does not promise an upgrade, free stay, cash refund, card reversal or 12315 result. A floor, décor or broad ‘view’ preference is not automatically equivalent to a confirmed bed count, non-smoking room, accessible feature or other essential booking term; compare the actual written record."
    },
    {
      "id": "triage-heading",
      "type": "heading",
      "level": 2,
      "text": "Choose the next action by risk and materiality"
    },
    {
      "id": "triage-matrix",
      "type": "table",
      "caption": "Make one evidence-backed request, then use a cutoff",
      "columns": [
        "Observed gap",
        "Verify",
        "Change rooms",
        "Relocate"
      ],
      "rows": [
        [
          "Listing label is vague",
          "Ask staff to map the room to booked attributes",
          "Only if a confirmed attribute is missing",
          "Not before the property has a fair chance to clarify"
        ],
        [
          "Wrong bed count or occupancy",
          "Show confirmation and room number",
          "Request booked or truly equivalent configuration",
          "If the group cannot sleep legally or safely"
        ],
        [
          "Smoking, window or essential access feature missing",
          "Record room and exact confirmed term",
          "Inspect one compliant alternative",
          "When the essential condition cannot be restored"
        ],
        [
          "Cleanliness defect that can be fixed quickly",
          "Record before use",
          "Change if cleaning cannot restore the room",
          "For serious, recurring or unsafe conditions"
        ],
        [
          "View, floor or décor differs",
          "Check whether it was guaranteed or only pictured",
          "Ask without presenting a preference as a confirmed term",
          "Usually only if another essential condition also fails"
        ],
        [
          "Immediate safety concern",
          "Do not remain to build perfect evidence",
          "Use only a demonstrably safe alternative",
          "Move to a safe staffed property; contact emergency services if needed"
        ]
      ]
    },
    {
      "id": "workflow-1-heading",
      "type": "heading",
      "level": 2,
      "text": "Freeze the booked-versus-assigned record"
    },
    {
      "id": "workflow-1-context",
      "type": "paragraph",
      "text": "Keep the comparison narrow enough that a manager can answer it. Do not photograph unrelated guests or expose passport and payment data."
    },
    {
      "id": "workflow-1-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Save the full confirmation, room-type description, selected add-ons, guest count, dates, total and seller/supplier names with the current time.",
        "At the doorway, make a continuous video from room number to beds, window, bathroom and the exact missing feature; add close photographs only where needed.",
        "Write one line: ‘Booked: __. Assigned: __. Essential because: __.’ Avoid claims about motive or fraud.",
        "Return to reception with luggage still packed when safe; ask for the duty manager's name or role and create an in-app or written case."
      ]
    },
    {
      "id": "workflow-2-heading",
      "type": "heading",
      "level": 2,
      "text": "Request one inspectable correction"
    },
    {
      "id": "workflow-2-context",
      "type": "paragraph",
      "text": "A precise request is easier to fulfil and easier to assess later than a demand for ‘compensation’ before shelter is fixed."
    },
    {
      "id": "workflow-2-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Ask first for the confirmed room; if unavailable, define an equivalent by bed count and each essential attribute, not by a higher marketing category.",
        "Set a realistic short cutoff based on the hour, the needs of the group and safe nearby alternatives; write the clock time and time zone.",
        "View the replacement before closing the original case. Recheck smell, window, bathroom, access route, locks and the initially missing feature.",
        "If acceptable, obtain the new room number or category and any price treatment in writing; retain the original evidence without posting it publicly."
      ]
    },
    {
      "id": "workflow-3-heading",
      "type": "heading",
      "level": 2,
      "text": "Relocate without breaking the evidence chain"
    },
    {
      "id": "workflow-3-context",
      "type": "paragraph",
      "text": "Secure shelter before pursuing money. Do not cancel the original order or abandon the key until the property or platform records what it wants you to do, unless staying creates a safety risk."
    },
    {
      "id": "workflow-3-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Send a final factual message: gap, requested correction, deadline, response and that you will obtain a reasonable replacement if no usable room is provided.",
        "Open the platform case from the original order and record the case ID; ask whether it wants the property to cancel, you to cancel, or the order left open.",
        "Choose a nearby replacement that meets the failed essential condition without an avoidable luxury jump; save its terms and itemised receipt.",
        "After everyone is safe, build the full dispute evidence pack and use the seller, platform, payment or regulator channel appropriate to the facts."
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "Recover when the first correction also fails"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "Protect sleep and safety while keeping the record coherent",
      "columns": [
        "Failure",
        "Immediate response",
        "Boundary"
      ],
      "rows": [
        [
          "Staff say the rooms are ‘the same’",
          "Compare the exact confirmed attribute, not category names",
          "Ask for a written denial if no correction is offered"
        ],
        [
          "Replacement has another defect",
          "Photograph before use and return once to the duty manager",
          "Do not cycle through rooms indefinitely; apply the cutoff"
        ],
        [
          "Hotel and platform send you to each other",
          "Message both in one timeline and record case IDs",
          "Secure shelter when the cutoff expires; assign liability later"
        ],
        [
          "Only an expensive alternative remains",
          "Capture a reasonable search set and why cheaper options failed",
          "Keep costs proportionate; reimbursement is not guaranteed"
        ],
        [
          "Personal safety deteriorates",
          "Leave evidence work and move to a public staffed safe place",
          "Call local emergency services for immediate danger, not a consumer channel"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "Evidence improves the decision; it does not guarantee the remedy",
      "tone": "warning",
      "body": "The result depends on the confirmed wording, assigned room, property response, platform terms, payment route and applicable process. This page cannot guarantee availability, an upgrade, refund, reimbursement, regulatory acceptance or a specific legal result. Do not sacrifice immediate safety, privacy or necessary sleep to make a perfect case."
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "Next step: send the four-line room request",
      "tone": "decision",
      "body": "Send: ‘Order __ confirms __. Room __ provides __. The missing essential feature is __. Please show a compliant room by __ local time, or confirm in writing that none is available so I can secure a reasonable replacement.’ Keep the reply, then inspect or relocate when the cutoff arrives."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue the hotel-recovery workflow",
      "items": [
        {
          "label": "Build the full booking-dispute file",
          "href": "/guides/china-booking-dispute-evidence-pack/",
          "description": "After immediate shelter is stable, organise the order, communication and payment trail for escalation."
        },
        {
          "label": "Browse China stay decisions",
          "href": "/stay/",
          "description": "Return to the neutral accommodation-planning collection."
        },
        {
          "label": "Verify an accessible room",
          "href": "/guides/china-accessible-hotel-room-verification/",
          "description": "Audit the continuous drop-off-to-room-to-bathroom chain."
        },
        {
          "label": "Run the hotel exit-safety check",
          "href": "/guides/china-hotel-emergency-exit-fire-safety-check/",
          "description": "A room dispute does not suspend fire safety: inspect the assigned floor and relocate if egress is unusable."
        },
        {
          "label": "Check foreign-guest registration",
          "href": "/guides/foreigners-china-hotel/",
          "description": "Keep a room-condition dispute separate from any passport-registration or refused-check-in problem."
        },
        {
          "label": "Recheck the next hotel type",
          "href": "/guides/international-chain-or-local-hotel-china/",
          "description": "Use operating fit and verification quality rather than assuming a brand will prevent every mismatch."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official consumer-law, complaint and image sources",
      "items": [
        {
          "label": "Consumer Rights and Interests Protection Law",
          "url": "https://www.samr.gov.cn/zfjcj/tzgg/art/2023/art_615af9ed6bcd4974bf853dd2e02bc663.html",
          "publisher": "State Administration for Market Regulation",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Regulations implementing the Consumer Rights Protection Law",
          "url": "https://app.www.gov.cn/govdata/gov/202403/19/513111/article.html",
          "publisher": "State Council / Chinese Government Network",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Market Regulation Complaint and Report Handling Measures",
          "url": "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2026/art_e4d03a20c0fd49769e408c7bf3791ff5.html",
          "publisher": "State Administration for Market Regulation",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Hero: Shanghai hotel room by Edo-biscuit, CC BY-SA 4.0",
          "url": "https://commons.wikimedia.org/wiki/File:Room_of_Toy_Story_Hotel_Shanghai.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
