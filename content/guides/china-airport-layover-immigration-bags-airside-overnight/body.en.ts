import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "Do not decide a China layover from the connection time or nationality alone. First ask the operating airlines and transfer desk whether you and your checked bag stay airside at this airport and terminal. If any step requires entering mainland China, independently confirm current entry or transit-without-visa eligibility with the National Immigration Administration and the border inspection authority. Only then choose an airside rest plan, a landside hotel or a protected fallback."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "Short answer",
      "body": "Treat the passenger route, the bag route and the overnight route as three separate confirmations. A through boarding pass does not by itself prove that a bag is through-checked, and an overnight connection does not by itself grant entry. Keep the onward ticket, bag receipt and official eligibility evidence accessible; if staff cannot confirm a step, use the option that does not depend on it.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Decide which confirmation lane applies"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "Start with what the itinerary actually requires, not what a similar trip allowed.",
      "columns": [
        "Observed situation",
        "Confirm with",
        "Do not assume",
        "Safe planning move"
      ],
      "rows": [
        [
          "Same airport, onward boarding pass and bag tagged to final destination",
          "Operating airline and airport transfer desk",
          "That every terminal connection remains airside",
          "Follow transfer signs and verify the next gate/terminal before leaving the sterile area"
        ],
        [
          "Bag tag ends at the China airport, separate ticket, or airline says collect",
          "Both operating carriers plus baggage desk",
          "That staff can retag the bag without entry",
          "Confirm whether collection requires immigration and build time for reclaim, customs and recheck"
        ],
        [
          "Airport change, landside terminal move or hotel outside security",
          "NIA/border authority, airport and airline",
          "That a transit policy automatically covers the move",
          "Use the exact port, route, nationality, documents and permitted destination in the official check"
        ],
        [
          "Overnight but airside route is confirmed",
          "Airport service desk and current terminal notice",
          "That lounges, hotels, food or security lanes stay open all night",
          "Reserve only a service that confirms airside access and keep a gate-area fallback"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "Build the layover plan before departure"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Write the complete sequence: inbound flight, arrival terminal, onward flight, departure terminal, ticket numbers and operating carriers. Codeshare marketing names are not enough for a handoff question.",
        "Ask the first carrier two explicit questions: where is the bag tag printed to, and at which airport must you physically collect and recheck it? Photograph the issued tag after check-in.",
        "Ask whether the passenger route stays inside international transfer control. Confirm any terminal bus, train, security rescreening or airport change and whether that movement is airside or landside.",
        "If entry may be required, use the NIA's current official rules and contact the port border inspection authority or airline for the exact itinerary. Present nationality, passport validity, confirmed onward destination, dates and every airport; do not reduce the question to 'Can I transit China?'.",
        "Check the airport's live transfer page for the actual date. Record the transfer counter, minimum connection constraint supplied by the carrier, last internal transport and the location/hours of any overnight service.",
        "Save an offline evidence packet: e-tickets, onward confirmation, bag receipt, terminal map, airline contacts, official policy links and the address of a refundable landside hotel that you will use only if entry is lawfully permitted.",
        "At arrival, follow the transfer signs before walking toward immigration or baggage claim. Show the itinerary to transfer staff and re-confirm both the passenger and bag routes when a sign or boarding pass conflicts with the plan."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "Keep three confirmations separate"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "Passenger, baggage and overnight lanes",
      "columns": [
        {
          "heading": "Passenger route",
          "body": "Confirmed terminals, security steps and whether any movement crosses immigration. The controlling decision belongs to border inspection, not this page."
        },
        {
          "heading": "Baggage route",
          "body": "The printed tag destination and carrier confirmation. If collection is required, determine whether lawful entry and recheck time are available."
        },
        {
          "heading": "Overnight route",
          "body": "A service you can actually reach after the final security/transfer step, with current hours and a no-entry fallback."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "What can fail at the airport"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "Resolve the failed dependency rather than following an unverified shortcut.",
      "columns": [
        "Failure signal",
        "Immediate action",
        "Fallback"
      ],
      "rows": [
        [
          "No onward boarding pass",
          "Go to the airline transfer counter and show the confirmed ticket",
          "Ask staff whether processing is possible airside; do not walk through immigration merely to find a check-in desk"
        ],
        [
          "Bag tag ends here",
          "Ask baggage/transfer staff to state the collection route",
          "If collection needs entry and entry is not confirmed, escalate to the operating carrier for a protected solution"
        ],
        [
          "Terminal route is closed or landside",
          "Stop at the staffed checkpoint and show both flights",
          "Use the airport/airline reroute; do not follow another passenger through a controlled door"
        ],
        [
          "Overnight service unavailable",
          "Ask for the currently accessible airside rest area",
          "Stay in the permitted zone with water, medication and alarms; use a landside hotel only after lawful entry is confirmed"
        ],
        [
          "Border officer does not permit entry",
          "Follow the officer's instructions and contact the airline immediately",
          "Request an airside or airline-protected solution; a hotel booking is not permission to enter"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "If the original connection plan breaks"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "Stay at the last staffed and permitted decision point; note the terminal, time and staff desk.",
        "Contact the operating carrier that controls the disrupted segment and ask for the available protected routing in writing or on the updated booking.",
        "Show the bag receipt and ask where the bag is held or retagged. Do not enter a reclaim route until entry and access are confirmed.",
        "If immigration is involved, let border inspection make the eligibility decision from the real documents. Do not argue from a screenshot, blog or another traveller's outcome.",
        "Rebook accommodation or ground transport only after the new permitted route is known; choose refundable arrangements while eligibility is unresolved.",
        "Save new boarding passes, disruption notices, receipts and staff instructions so later airline or insurance questions have a clean record."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "What this guide cannot promise",
      "body": "This page does not determine transit-without-visa eligibility, admission, airside access, baggage through-checking, connection protection or overnight service availability. Those depend on current law, the exact itinerary, the port, operating carriers and live airport operations. Border inspection makes the entry decision; airlines and airports control carriage and transfer operations.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "Before boarding the inbound flight"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "Operating carriers and terminals written down",
        "Passenger path confirmed as airside or entry-required",
        "Printed bag destination checked",
        "Official entry/TWOV evidence reviewed if any landside step exists",
        "Live transfer and overnight service checked",
        "Offline documents and contacts saved",
        "Fallback does not depend on unconfirmed entry"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "China layover questions"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "Does a long layover mean I can leave the airport?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "No. Duration alone does not establish entry eligibility. Check the current NIA rule against the exact itinerary and let border inspection decide at the port."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Will my checked bag always go to the final city on one booking?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "Do not infer it from one booking reference. Read the printed bag tag and confirm with the operating airline, especially when terminals, airports or carriers change."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Should I book an airport hotel for an overnight transfer?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Only after confirming whether it is airside or landside, whether you can reach it at the relevant hour and what cancellation terms apply. Keep an accessible airside fallback."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Related planning owners",
      "items": [
        {
          "label": "Separate-ticket self-transfer risk",
          "href": "/guides/china-separate-flight-tickets-self-transfer-risk/",
          "description": "Check where protection ends before accepting a self-transfer."
        },
        {
          "label": "Last night before an international flight",
          "href": "/guides/china-last-night-before-international-flight/",
          "description": "Plan the final airport approach and timing."
        },
        {
          "label": "China online arrival card",
          "href": "/guides/china-online-arrival-card/",
          "description": "Use the current official arrival-card owner if entry is required."
        },
        {
          "label": "Customs red and green channels",
          "href": "/guides/china-customs-red-green-channels/",
          "description": "Understand the customs step after lawful entry and bag collection."
        },
        {
          "label": "Domestic fare and baggage bundles",
          "href": "/guides/china-domestic-flight-fare-bundle-baggage/",
          "description": "Confirm the next flight's purchased baggage allowance."
        },
        {
          "label": "Pudong or Hongqiao",
          "href": "/guides/shanghai-pudong-or-hongqiao-airport/",
          "description": "Avoid treating Shanghai's two airports as one transfer point."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources",
      "items": [
        {
          "label": "240-hour visa-free transit policy",
          "url": "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
          "publisher": "National Immigration Administration",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "NIA transit-policy update",
          "url": "https://en.nia.gov.cn/n147418/n147468/c187308/content.html",
          "publisher": "National Immigration Administration",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Beijing Capital transfer guide",
          "url": "https://www.bcia.com.cn/lkznzj.html",
          "publisher": "Beijing Capital International Airport",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Beijing Capital live notices",
          "url": "https://www.bcia.com.cn/index.html",
          "publisher": "Beijing Capital International Airport",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
