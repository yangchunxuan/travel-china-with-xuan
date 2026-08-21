import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "Once a ride is assigned but pickup fails, stop walking toward the moving map icon. Stand at a safe, legal and recognizable place, compare the app pin with the physical pickup-zone name, and send one precise landmark message through the order channel. Board only the assigned vehicle after the plate and key car/driver details match; if the route cannot be reconciled quickly, record the mismatch, use the platform's cancellation/support flow and switch to a staffed or official transport fallback."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "Short answer",
      "body": "Use a three-way match: assigned car, app pickup point and visible physical landmark. A driver saying 'get in' is not the match. Do not enter a different plate, cross traffic barriers, walk onto a live roadway or share payment/passport credentials to fix a pickup. This page begins after an order exists; it does not rank apps or explain how to hail a ride.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Diagnose the failed meeting point"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "Change one variable at a time so the driver and passenger do not keep circling.",
      "columns": [
        "Signal",
        "Likely mismatch",
        "One useful message",
        "Decision"
      ],
      "rows": [
        [
          "Driver icon is nearby but no car is visible",
          "Different road level, gate or side of a divided street",
          "Send entrance/level, landmark name and a current photo without faces",
          "Stay put while the driver confirms the same landmark"
        ],
        [
          "App pin is inside a building or restricted road",
          "GPS drift or non-permitted pickup point",
          "Select the platform/venue's named pickup zone or ask official staff where ride-hailing cars load",
          "Move only by a safe pedestrian route, then update the driver"
        ],
        [
          "Car appears but plate/details differ",
          "Wrong vehicle or unverified substitution",
          "State that the assigned details do not match",
          "Do not board; contact in-app safety/support"
        ],
        [
          "No contact and waiting time/cancellation warning rises",
          "Driver cannot access the point or order is stalled",
          "Send one final precise location in the order chat",
          "Capture evidence, use platform cancellation/support, then switch"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "Recover the pickup in a short control loop"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Freeze movement. Step into a lit, staffed or designated waiting area clear of traffic, exits and security barriers. Keep children, companions and luggage together.",
        "Read the order, not an incoming stranger: assigned plate, vehicle colour/model if displayed, driver identifier and the masked contact/order channel. Screenshot these details and the current pickup pin.",
        "Name your physical place using venue language: terminal and floor, station exit number, hotel entrance, mall gate or marked ride-hailing bay. A blue-dot screenshot alone may not tell the driver the road level.",
        "Compare the app pin with that place. If it is wrong, choose only a legitimate pickup point offered by the platform or venue; do not drag the pin across barriers to an illegal stopping area.",
        "Send one compact message with the visible landmark, side/level and clothing or luggage colour if comfortable. Use in-app translation or a saved Chinese sentence and keep communication in the order channel.",
        "When a car arrives, read the plate before approaching and compare the remaining assigned details. Ask the driver to confirm the destination in the app without revealing unrelated personal data.",
        "If the car does not match, doors feel unsafe, the driver asks to leave the platform or the pickup requires crossing a hazard, do not board. Return to the staffed safe point and use support.",
        "Set a time boundary based on the trip. When it expires, save contact attempts and pin/vehicle evidence, use the official cancellation reason, and activate metro, official taxi rank, hotel desk or another verified order."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "The boarding triangle"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "Vehicle, place and order",
      "columns": [
        {
          "heading": "Vehicle",
          "body": "The physical plate and displayed vehicle details match the assigned record. Never accept a verbal substitute when the record differs."
        },
        {
          "heading": "Place",
          "body": "Both sides name the same legal pickup bay, entrance, floor and road side. Physical signs resolve map ambiguity."
        },
        {
          "heading": "Order",
          "body": "The active in-app order, destination and supported communication remain intact. Requests to cancel and transact privately break the evidence chain."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "Pickup failures and safe exits"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "The goal is a verified boarding, not merely getting into a car.",
      "columns": [
        "Failure",
        "Do now",
        "Exit route"
      ],
      "rows": [
        [
          "Different plate arrives",
          "Keep distance and say the assigned plate does not match",
          "Report through platform safety/support and wait in the staffed area"
        ],
        [
          "Driver requests off-app cash or cancellation before boarding",
          "Keep the order unchanged while asking support",
          "Decline private carriage and use an official taxi rank or new verified order"
        ],
        [
          "Pin is on another level",
          "Send the exact level/door and follow official pedestrian signs",
          "Ask airport/station/mall staff for the designated ride-hailing zone"
        ],
        [
          "Driver asks passenger onto roadway",
          "Do not enter traffic or cross barriers",
          "Choose a legal bay or cancel with location evidence"
        ],
        [
          "Phone or data stops working",
          "Stay at the last known safe point and use venue Wi-Fi/phone or staffed help",
          "Use an official taxi queue or public transport whose entrance is physically verified"
        ],
        [
          "Passenger feels threatened",
          "Move toward people, staff or security; do not confront the vehicle",
          "Use local emergency help and the platform safety channel as circumstances require"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "Close one failed order before creating the next"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "Capture the map pin, named pickup point, assigned plate, driver messages/calls and time while the order is still visible.",
        "Choose the cancellation reason that accurately describes access, driver or pickup failure; do not invent a cause to avoid a fee.",
        "If a fee appears, use the platform order record and evidence to request review. Keep that fee question separate from personal safety and the next ride.",
        "Move to the fallback pickup place before ordering again so the new pin starts from a stable, legal location.",
        "For an official taxi rank, join the marked queue and use the dispatched vehicle; for metro or bus, verify the entrance and last-service constraint.",
        "Tell a companion or hotel desk the new mode and destination. Reconcile the first order's final status later rather than standing roadside to argue."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "What this recovery cannot guarantee",
      "body": "This guide does not guarantee vehicle identity, driver conduct, pickup access, cancellation-fee reversal, arrival time, route or safety. The platform, venue, driver and live road controls govern the trip. Never board a mismatched vehicle, bypass a traffic barrier, move a transaction off-platform or reveal unrelated passport, banking or verification credentials.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "Before stepping toward the car"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "Waiting point is safe and legal",
        "Physical zone name matches the app",
        "Plate matches exactly",
        "Vehicle/driver details are consistent",
        "Destination remains in the active order",
        "Communication stays in the order channel",
        "Fallback threshold and location are known"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "Ride-pickup questions"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "Should I walk toward the moving driver icon?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "Usually no. First establish a safe physical landmark and confirm it with the driver. Icons can reflect another road level or lag behind the vehicle."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "What if the driver says the plate in the app is wrong?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "Do not board a mismatched vehicle. Stay in a safe place and use the platform's safety/support route to verify or cancel."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Can I move the pin after assignment?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Use only the platform's supported change and a legal venue pickup zone. Tell the driver the physical landmark and do not move into traffic to preserve the order."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Related map, payment and recovery owners",
      "items": [
        {
          "label": "Verified address and navigation backup",
          "href": "/guides/china-navigation-verified-address-backup/",
          "description": "Prepare the Chinese landmark and map proof used at pickup."
        },
        {
          "label": "Private transfer or public transport",
          "href": "/guides/china-private-transfer-or-public-transport/",
          "description": "Choose a fallback mode when a ride order is no longer viable."
        },
        {
          "label": "How tourists pay in China",
          "href": "/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "Keep payment setup separate from pickup safety."
        },
        {
          "label": "Lost phone digital recovery",
          "href": "/guides/lost-phone-in-china-digital-recovery/",
          "description": "Switch to the digital-recovery owner if the order device is gone."
        },
        {
          "label": "Choose a hotel near metro",
          "href": "/guides/china-hotel-near-metro/",
          "description": "Keep an independent public-transport option near the hotel."
        },
        {
          "label": "China robotaxi zones",
          "href": "/guides/china-robotaxi-zones-explained/",
          "description": "Use the existing owner for zone and service-boundary questions."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources",
      "items": [
        {
          "label": "Shanghai guide to using Didi",
          "url": "https://english.shanghai.gov.cn/en-UsefulApps/20240206/976515bc601f4803b9ce2f64ae9f0cd3.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Guide to working and living in China 2025",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "State Council of the People's Republic of China",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Didi safety overview",
          "url": "https://www.didiglobal.com/science/security",
          "publisher": "Didi Global",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Beijing transport guide",
          "url": "https://english.beijing.gov.cn/travellinginbeijing/transportation/202006/t20200623_1931439.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
