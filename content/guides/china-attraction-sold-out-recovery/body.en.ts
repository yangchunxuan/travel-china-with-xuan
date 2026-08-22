import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "When an official attraction channel shows sold out, first verify the correct date, session, visitor category and entrance. Then use only options the attraction itself recognizes: a later official release, a returned slot if the rules provide one, a different official date/session, or a different place. Do not buy a stranger's named ticket, lend a passport, pay a scalper or follow instructions that bypass real-name controls."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "Short answer",
      "body": "Give the original attraction one bounded official recheck, then protect the day. Save the sold-out evidence, check the attraction's official notice for release/cancellation rules and choose a timed decision point. If no legitimate inventory appears, switch to an official alternative before transport and meal plans collapse around a ticket that does not exist.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Choose a legitimate recovery lane"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "Availability must be both real and usable by the named visitor.",
      "columns": [
        "What you find",
        "Legitimate action",
        "Identity check",
        "Stop condition"
      ],
      "rows": [
        [
          "Official channel shows another date or session",
          "Rebuild the day around that official inventory",
          "Enter every actual visitor through the permitted booking flow",
          "Stop if the new time breaks transport or another fixed anchor"
        ],
        [
          "Official rules describe returns or additional release",
          "Recheck only at the stated time/channel",
          "Confirm the returned slot can be issued to your traveller record",
          "Stop after the planned check window; do not refresh all day"
        ],
        [
          "Official combined or guided product exists",
          "Verify it on the attraction's own recognized channel and read inclusions",
          "Ensure every visitor and document is registered lawfully",
          "Reject any seller claiming no identity check or a hidden entrance"
        ],
        [
          "No official usable inventory",
          "Choose a different attraction, district walk or museum with official availability",
          "Book through that alternative's real rules",
          "Close the original attempt and move the itinerary"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "Recover the day without chasing unofficial stock"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Confirm that 'sold out' applies to the intended attraction, date, session, visitor category and entrance. Record the official URL, time checked and message; a reseller page alone is not the inventory authority.",
        "Read the attraction's current official ticket notice. Identify its named sales channels, advance window, real-name requirements, release pattern, cancellation/return rule and whether same-day onsite sales exist.",
        "Set one or two official recheck times only if the notice supports later or returned inventory. Use the correct traveller details and never run simultaneous speculative orders that may lock records or create duplicate charges.",
        "Audit any package, tour or combined ticket on the official site. Confirm that the attraction recognizes the product, the exact admission is included, the visitor will be registered and cancellation terms are clear.",
        "Choose a switch time based on the day's travel. If official inventory has not appeared by then, cancel dependent transport or meals within their terms and activate the alternative.",
        "Book the alternative through its own official or authorized route and save the confirmation. Prefer a plan in the same area so the day still works without rushed cross-city movement.",
        "If money was paid to an unrecognized party, do not send identity images or another payment. Preserve the listing, messages, receipt and promised product, then use the payment provider or dispute owner."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "Use a two-part validity test"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "Inventory and identity must both pass",
      "columns": [
        {
          "heading": "Official inventory",
          "body": "The attraction or a channel it explicitly recognizes confirms the exact date, session and product. A screenshot or seller message is not live inventory."
        },
        {
          "heading": "Named visitor validity",
          "body": "The actual traveller and accepted document are registered under current rules. A transferable-looking QR code may still fail real-name admission."
        },
        {
          "heading": "Whole-day fit",
          "body": "Transport, opening hours and other fixed reservations still work. A valid slot is not a recovery if reaching it destroys the rest of the day."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "Red flags that end the attempt"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "These signals call for a switch, not a clever workaround.",
      "columns": [
        "Red flag",
        "Why it fails",
        "Safe response"
      ],
      "rows": [
        [
          "Seller asks to borrow or alter passport details",
          "It undermines the named-visitor record and creates identity risk",
          "Do not send documents; use the official channel or alternative"
        ],
        [
          "Promise of a side door, staff contact or no scan",
          "It proposes bypassing controlled admission",
          "Decline and keep the official sold-out result"
        ],
        [
          "QR code offered without an order in the visitor's name",
          "The code may be cancelled, duplicated or rejected at identity check",
          "Do not buy; require official order validation"
        ],
        [
          "Pressure to pay again because release is 'about to close'",
          "Scarcity pressure blocks verification and dispute protection",
          "Pause, verify independently and let the original attraction go"
        ],
        [
          "Official warning says no third-party agents",
          "The attraction has expressly rejected the claimed channel",
          "Use only the listed official route and report impersonation where appropriate"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "Turn a sold-out anchor into a working day"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "Freeze further spending around the unavailable ticket and list reservations that still have free cancellation.",
        "Pick the alternative by geography and opening certainty, not by fame: same district, confirmed entry and a realistic travel time.",
        "Move flexible meals and transport after the replacement confirmation arrives; keep one unbooked buffer around the new anchor.",
        "Tell the group exactly what changed and which booking was abandoned so nobody continues buying duplicate or unofficial tickets.",
        "If the original official channel later releases valid inventory, compare it with the confirmed replacement before changing again; do not create a second cascading failure.",
        "Archive sold-out screenshots and cancellation records for any connected refundable booking, while accepting that sold-out status itself does not create compensation rights."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "No hidden-ticket promise",
      "body": "This guide cannot produce inventory, guarantee a cancellation, validate a reseller, reserve a future release or promise entry. It never recommends scalpers, identity lending, fake details, automated queue abuse, unofficial entrances or other real-name bypasses. Current attraction rules and its recognized channels control admission.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "A 15-minute recovery checklist"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "Correct official date/session/category confirmed sold out",
        "Official release and cancellation rule read",
        "One bounded recheck window set",
        "No identity or side-door workaround accepted",
        "Alternative with verified availability selected",
        "Dependent bookings reviewed before deadlines",
        "Evidence retained for any actual payment dispute"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "Sold-out attraction questions"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "Can a hotel or guide get tickets after the official site sells out?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "Only rely on a product or channel the attraction itself currently recognizes, with the actual visitor registered. A person's confidence is not proof of inventory."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Can I use someone else's ticket or passport information?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "No. Do not borrow identity, buy a named stranger's ticket or alter records. These actions create access and identity risks and may breach the attraction's rules."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Should I keep refreshing all day?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Only recheck at bounded times if the official notice describes later or returned inventory. Otherwise switch early enough to preserve a useful day."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Related ticket and itinerary owners",
      "items": [
        {
          "label": "Official or reseller tickets",
          "href": "/guides/official-or-reseller-china-tickets/",
          "description": "Verify a sales channel before sending money or identity data."
        },
        {
          "label": "Forbidden City for foreign visitors",
          "href": "/guides/forbidden-city-for-foreign-visitors/",
          "description": "Use the venue owner for a complete Forbidden City day."
        },
        {
          "label": "National Museum booking and route",
          "href": "/guides/national-museum-of-china-booking-and-route/",
          "description": "Check official availability and build a nearby alternative."
        },
        {
          "label": "Sanxingdui booking and gallery order",
          "href": "/guides/sanxingdui-museum-booking-and-gallery-order/",
          "description": "Use the specific owner for that museum's release and visit workflow."
        },
        {
          "label": "Booked anchor or flexible block",
          "href": "/guides/china-arrival-day-booked-anchor-or-flexible-block/",
          "description": "Avoid placing a scarce ticket where disruption risk is highest."
        },
        {
          "label": "Booking dispute evidence pack",
          "href": "/guides/china-booking-dispute-evidence-pack/",
          "description": "Preserve proof if an unrecognized seller took payment."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources",
      "items": [
        {
          "label": "Palace Museum ticket instructions",
          "url": "https://intl.dpm.org.cn/ticket_details.html",
          "publisher": "Palace Museum",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "National Museum warning on unofficial ticket channels",
          "url": "https://en.chnmuseum.cn/home_527/news/202602/t20260203_278439.html",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "National Museum reservation system",
          "url": "https://pcticket.chnmuseum.cn/museum-en/",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Dunhuang Academy official-channel warning",
          "url": "https://www.dha.ac.cn/info/1018/7786.htm",
          "publisher": "Dunhuang Academy",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Interim provisions for online tourism services",
          "url": "https://www.mct.gov.cn/preview/whhlyqyzcxxfw/zhgl/202012/t20201222_919903.html",
          "publisher": "Ministry of Culture and Tourism",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
