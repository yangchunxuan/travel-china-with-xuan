import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "Order one decision at a time: identify the dish from the restaurant's current menu, show the exact item, set the quantity, state dine-in or takeaway, confirm the displayed total and then pay. Start with the simplest interface that works—staffed counter or paper menu—before moving to a QR menu. Use delivery only when you have a verified address, working contact channel and enough time to solve a handoff."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "Short answer",
      "body": "Keep the original Chinese dish name beside any translation and ask staff to point to the final order before payment. A photo is more useful than a broad request such as 'something not spicy.' For allergies or other high-consequence restrictions, a translation card is only the opening question: ask the responsible restaurant staff to confirm ingredients and preparation, and choose not to order when they cannot.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Pick the lowest-friction ordering surface"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "Move down the ladder only when the current method cannot complete the order.",
      "columns": [
        "Ordering surface",
        "Best when",
        "Confirmation moment",
        "Fallback trigger"
      ],
      "rows": [
        [
          "Staffed counter/display",
          "Items are visible and staff can point",
          "Point to the exact item and show quantity; read the register total",
          "Item unavailable or the counter only redirects to QR"
        ],
        [
          "Paper or wall menu",
          "Names, pictures or prices can be matched",
          "Photograph the Chinese name and ask staff to mark the selected line",
          "No current price, sold-out mark or unclear portion"
        ],
        [
          "QR table menu",
          "Phone, network and supported payment work",
          "Review basket, quantity, table number and final total before submit",
          "Page will not open, table is wrong, or payment cannot complete"
        ],
        [
          "Delivery",
          "Verified pin/address and reachable phone are ready",
          "Check merchant, items, delivery address, notes and handoff point",
          "Address cannot be verified or arrival timing is critical"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "The five-part order handshake"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Choose the surface. Ask whether ordering happens at the counter, from a paper menu, by scanning the table code or through a delivery platform. Do not assume the QR code is payment-only.",
        "Capture the original. Photograph or screenshot the current Chinese dish name, price and any size/options. Translate that exact selection while preserving the source text for staff.",
        "Select one item at a time. Point to the line or screen and show the quantity with digits. If sharing, ask about portion size rather than ordering several unknown dishes at once.",
        "State the service: dine in, takeaway or delivery. For dine-in QR orders, verify the table number; for takeaway, ask where and under what number/name it will be collected.",
        "Handle restrictions separately from preferences. Show a concise bilingual card naming the ingredient or preparation concern, then ask a yes/no confirmation from responsible staff. Cross-contact and recipes may be uncertain.",
        "Read back the basket: dish, variant, quantity, additions, service method and displayed total. Take a screenshot before submitting a QR order so a duplicate or missing order can be traced.",
        "Pay only after the order is visible. Keep the receipt/order number and watch for an accepted status rather than treating a spinning page or bank notification alone as restaurant confirmation.",
        "At handoff, match the number and items. Open takeaway packaging nearby enough to correct a clear mismatch, while respecting staff and queue flow."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "Confirm meaning at three levels"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "Dish, transaction and handoff",
      "columns": [
        {
          "heading": "Dish",
          "body": "The current Chinese menu line, size and options match what you intend. Translation assists the comparison; the restaurant confirms what it makes."
        },
        {
          "heading": "Transaction",
          "body": "The basket, table/address, quantity, total and accepted order status are visible. A payment alert alone may not prove the kitchen received it."
        },
        {
          "heading": "Handoff",
          "body": "The order number or name, service mode and pickup/delivery point match. Delivery also requires a reachable communication route."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "Common ordering failures"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "Switch the interface while preserving the exact item and transaction evidence.",
      "columns": [
        "Failure",
        "Immediate check",
        "Working fallback"
      ],
      "rows": [
        [
          "QR page will not load",
          "Ask staff whether the code is current and whether venue Wi-Fi is required",
          "Use paper/menu photos or let staff enter the order at the counter"
        ],
        [
          "Translation makes no sense",
          "Return to the original dish name and translate a smaller phrase or option",
          "Ask staff to point to a picture/display item; choose a simpler known dish"
        ],
        [
          "Payment left the account but order is absent",
          "Show the merchant, time, amount and transaction status to staff",
          "Do not pay again until the restaurant checks its order/payment record"
        ],
        [
          "Wrong table or duplicate quantity",
          "Open the basket/order history and show the submitted record",
          "Ask staff to correct before preparation; accept that cancellation may not be possible"
        ],
        [
          "Dietary restriction cannot be confirmed",
          "Ask the named ingredient/preparation question once more to responsible staff",
          "Choose a sealed labelled product or another restaurant; do not infer safety"
        ],
        [
          "Driver cannot find the handoff",
          "Send the verified Chinese address, landmark and current pin",
          "Move to an agreed safe visible point or ask the hotel/front desk to receive if permitted"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "Recover without placing a second unknown order"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "Freeze the screen and photograph the order number, merchant, amount, table/address and status.",
        "Ask one owner: restaurant counter for kitchen/order state, delivery support for dispatch state, or payment provider only for the transaction state.",
        "Show the exact Chinese item line rather than retranslating the whole conversation. Mark what is missing, duplicated or wrong.",
        "Wait for a clear cancellation, correction or accepted status before submitting a replacement. If staff cannot resolve it, choose a different payment or item only after the first state is recorded.",
        "For delivery handoff failure, keep communication inside the official order channel where possible and do not disclose unrelated passport or payment credentials.",
        "Preserve the receipt and screenshots until charges match the food actually received; use the platform or payment dispute process for a material unresolved duplicate."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "What language tools cannot confirm",
      "body": "This guide cannot guarantee menu accuracy, ingredient absence, allergen safety, cross-contact control, availability, price, payment acceptance, delivery time or refund. The current menu, responsible restaurant staff, platform and payment provider control those facts. When a health-critical restriction cannot be clearly confirmed, do not place the order.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "Pocket ordering kit"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "Screenshots work offline",
        "Chinese dish name preserved",
        "Digits ready for quantity",
        "Dine-in/takeaway phrase ready",
        "One concise restriction card if needed",
        "A second payment method",
        "Verified delivery address and landmark",
        "Receipt/order number retained"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "Food-ordering questions"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "Do I need a Chinese phone number for every QR menu?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "No single rule covers every restaurant. Try the current flow; if it requires an unavailable login or payment route, ask staff for counter or paper ordering."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Can translation confirm that a dish is allergy-safe?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "No. Preserve the original wording and ask responsible staff about the specific ingredient and preparation. If they cannot confirm, choose another option."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Should I use delivery as the default?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Only when the address, pin, contact and handoff are reliable. A nearby staffed counter is often easier when connectivity or address confidence is low."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Related food, payment and address owners",
      "items": [
        {
          "label": "Translate without Chinese",
          "href": "/guides/translate-china-without-chinese-offline-backups/",
          "description": "Build the screenshot and offline text method used at menus."
        },
        {
          "label": "How tourists pay in China",
          "href": "/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "Set up and verify payment before the restaurant queue."
        },
        {
          "label": "Verified address and navigation backup",
          "href": "/guides/china-navigation-verified-address-backup/",
          "description": "Prepare a Chinese address and landmark for delivery."
        },
        {
          "label": "First shared meal in China",
          "href": "/guides/first-shared-meal-in-china/",
          "description": "Plan portions, shared dishes and table flow."
        },
        {
          "label": "China regional food route",
          "href": "/guides/china-regional-food-route/",
          "description": "Choose where food belongs in the wider itinerary."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources",
      "items": [
        {
          "label": "Shanghai food-delivery app guide",
          "url": "https://english.shanghai.gov.cn/en-UsefulApps/20240109/89844b5729d64b199463a156bc8ef43d.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Menu translation service guide",
          "url": "https://english.shanghai.gov.cn/en-CIIE2025Service-Onsite/20251016/a8cde7a821ae4df5a957b6014f7c3814.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Payment guide for overseas visitors",
          "url": "https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html",
          "publisher": "State Council of the People's Republic of China",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Civilized dining guidance",
          "url": "https://zwgk.mct.gov.cn/zfxxgkml/qt/202210/t20221017_936555.html",
          "publisher": "Ministry of Culture and Tourism",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
