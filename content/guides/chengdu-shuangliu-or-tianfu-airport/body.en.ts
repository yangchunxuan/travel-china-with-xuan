import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "After a ticket is issued, CTU or TFU is not a preference: the airport code and terminal on the booking control. Before booking, compare only flights that really operate on the date, then add the complete journey from the current hotel or previous city to check-in—and from baggage claim to the first Chengdu bed or onward connection."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "The flight chooses the airport; the whole trip chooses the flight",
      "tone": "decision",
      "body": "CTU often enters the shortlist for central or western Chengdu because it is the older city-side airport; TFU is a major airport southeast of the city and may offer the right flight. Neither is universally better. A cheaper or faster flight can lose its advantage when an early departure, late arrival, cross-city railway transfer or rural onward leg is added."
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "What this page owns",
      "tone": "neutral",
      "body": "This page owns pre-book CTU/TFU choice, post-book code and terminal confirmation, full airport–hotel/rail chain and wrong-airport recovery. It does not rank airlines, freeze terminal assignments or coach schedules, decide the last night for every China flight, or repeat the Chengdu–Jiuzhaigou and panda-site owners."
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "Screenshot the active CTU/TFU code, terminal, flight and airline deadline for offline use; never replace it with a map shorthand.",
        "Write the first door as the exact Chengdu hotel, railway station or rural return point and the last door as the correct airport terminal or first Chengdu accommodation branch.",
        "Mark the hard cutoff—airline check-in/boarding and any separate rail booking—and the latest safe abandonment point.",
        "Count terminal walking, cross-airport distance and every bag segment by segment instead of copying the main-leg duration.",
        "Save a current verification path through the airline, CTU/TFU airport service and current Chengdu transport, plus airline rebooking or a staffed airport-side overnight if it fails."
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Compare the complete trip, not the city label"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "The live ticket and exact destination overrule every shortcut",
      "columns": [
        "Node or chain",
        "When it enters the shortlist",
        "Question that decides it",
        "Mistake to prevent"
      ],
      "rows": [
        [
          "Chengdu Shuangliu International Airport / 成都双流国际机场 / CTU",
          "The actual flight operates here and its city-side chain to the hotel, railway station or next booking is stronger.",
          "Does the shorter city transfer survive the real flight time, terminal, luggage and check-in margin?",
          "Do not assume CTU handles every domestic flight or that an old airline list remains valid."
        ],
        [
          "Chengdu Tianfu International Airport / 成都天府国际机场 / TFU",
          "The useful flight operates at TFU, or an east/southeast-side chain and current ground access make the total journey work.",
          "After airport exit, is the exact hotel, station or onward departure still reachable with a recoverable margin?",
          "TFU's large network does not make it closer to every Chengdu hotel or a guaranteed link to every rail departure."
        ],
        [
          "CTU ↔ TFU cross-airport recovery",
          "Only after the booked code is confirmed and the traveller is physically at the wrong airport.",
          "Does a current official road/rail option reach the correct terminal before the airline deadline with a clearly safe margin?",
          "A map duration is not a protected connection; transfer, rebook or overnight are three different decisions."
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "Do not turn today's operating pattern into a permanent rule",
      "tone": "warning",
      "body": "Airlines can move flights between CTU, TFU and terminals, while airport rail and coach windows change independently. The active booking controls after purchase; in the release week, recheck both airport sites and Chengdu's current ground access without publishing a permanent airline list."
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "Three journeys that produce different answers"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "Start at the traveller's real first and last doors",
      "columns": [
        "Traveller chain",
        "Working method",
        "Failure to protect against"
      ],
      "rows": [
        [
          "International arrival and a central Chengdu first night",
          "Compare the immigration and baggage exit, current airport rail/road choice, the exact hotel branch, final walk and reception. The airport with the more convenient flight may still lose if the arrival-side transfer becomes too late.",
          "The traveller lands at the right airport but reaches an unstaffed hotel branch after the last verified connection."
        ],
        [
          "Early flight after a panda or Jiuzhaigou plan",
          "Let the last-night guide decide where to sleep; this page supplies the actual airport, terminal, check-in deadline and ground chain. Do not protect one extra sightseeing hour by creating an unverified pre-dawn transfer.",
          "A rural or late-returning traveller discovers the booked airport is on the opposite side of Chengdu before dawn."
        ],
        [
          "Flight to a same-day Chengdu railway departure",
          "Identify both the airport code and full Chinese railway station. Add immigration/baggage, airport exit, actual cross-city access, station entrance and a disruption buffer. Separate tickets provide no promise that the train waits.",
          "The traveller reaches the correct airport but the wrong Chengdu railway station, losing the last connection."
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "Build the door-to-door chain"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "Compare two complete airport chains",
      "columns": [
        {
          "heading": "Departure-side chain",
          "items": [
            "Hotel or previous city to the correct airport",
            "Correct terminal and airline deadline",
            "Luggage, security and immigration where applicable"
          ]
        },
        {
          "heading": "Arrival-side chain",
          "items": [
            "Immigration or domestic arrival and baggage claim",
            "Current airport rail, bus or authorised road pickup",
            "Exact hotel entrance and reception"
          ]
        },
        {
          "heading": "Connection chain",
          "items": [
            "Full Chinese railway station or named onward base",
            "Separate-ticket disruption buffer",
            "Rebook or staffed overnight fallback"
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "Luggage, late arrival and mobility can reverse the choice"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "Protect the weakest handoff, not the shortest line on a map",
      "columns": [
        "Constraint",
        "Safer working plan",
        "Do not assume"
      ],
      "rows": [
        [
          "Late TFU or CTU arrival",
          "Recheck current official airport transport after baggage claim. Use the signed taxi/ride-hail process or a verified hotel transfer and notify the exact branch.",
          "A daytime metro or coach remains available after a delayed flight."
        ],
        [
          "Large luggage or reduced mobility",
          "Count terminal walking, lift certainty, every vehicle change and the final hotel entrance. A direct legal vehicle can be compared without assuming availability or price.",
          "The airport rail icon proves a step-free journey to the hotel."
        ],
        [
          "Wrong airport before departure",
          "Confirm code and terminal, contact the airline, compare a current cross-airport arrival against check-in/boarding deadlines, then choose transfer, rebook or overnight.",
          "A fast taxi estimate means the airline will accept a late passenger."
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "Wrong node: recover in this order"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Open the active booking and read CTU or TFU, terminal, flight number, date and airline deadline.",
        "Confirm whether you are at the wrong terminal within one airport or at the wrong airport entirely.",
        "Contact the airline or airport service point before committing to a long transfer; ask about the live booking, not a hypothetical rule.",
        "Compare a current official rail/road arrival at the correct terminal with check-in and boarding deadlines plus security time.",
        "When the margin is weak, rebook or protect an overnight instead of racing across Chengdu on an unprotected connection.",
        "Tell the hotel, rail operator or next pickup about the changed arrival before its own cutoff."
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "The answer changes when…"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "The actual flight is reassigned to another airport or terminal.",
        "The first or last hotel moves from central/western Chengdu to the east or southeast.",
        "A same-day train, Jiuzhaigou departure or timed panda visit becomes the hard deadline.",
        "The flight moves to an early or late hour outside the verified ground-transport window.",
        "Luggage or mobility needs make the extra airport–city transfer unacceptable."
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "Final booking and release-day checklist"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "Read CTU or TFU and the terminal from the live booking, not the city name.",
        "Reopen the airline and Chengdu Airports lookup in the publication week.",
        "Save the exact hotel branch and Chinese address.",
        "Verify the current airport rail, bus, taxi and ride-hail pickup options for the actual hour.",
        "Write the airline check-in and boarding deadlines into the plan.",
        "Protect a separate-ticket rail or rural connection with a real fallback.",
        "Set the point at which transfer becomes rebook or overnight."
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "Frequently asked questions"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "Is CTU closer to downtown than TFU?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "CTU is generally on the city side compared with southeast TFU, but distance alone cannot choose the trip. The available flight, exact hotel, terminal, arrival hour and next connection decide the usable chain."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Does one Chengdu airport handle all international flights?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "Do not use a flight-type rule. Airport and terminal assignments can change, and a July 2026 regional-flight adjustment is evidence of that volatility. The active airline booking wins."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Can I connect between CTU and TFU on the same day?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Possibly, but it is an unprotected cross-city transfer. Check the current official route, terminal-to-terminal arrival and both airline deadlines. If the margin is not plainly safe, change the flight or protect an overnight."
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "Which airport is better for Jiuzhaigou?"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "There is no permanent airport answer. First choose a real flight, then hand the onward mode and base decision to the Chengdu–Jiuzhaigou owner. Count any hotel night, railway station or long road transfer between them."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue the correct part of the plan",
      "items": [
        {
          "label": "Start with the Chengdu city guide",
          "href": "/destinations/chengdu/",
          "description": "Place the airport inside the complete first-trip plan."
        },
        {
          "label": "Continue from Chengdu to Jiuzhaigou",
          "href": "/guides/chengdu-jiuzhaigou-transport-route/",
          "description": "Choose the onward mode and base after the actual airport is known."
        },
        {
          "label": "Choose a Chengdu panda site",
          "href": "/guides/chengdu-panda-base-or-dujiangyan-panda-valley/",
          "description": "Keep the timed attraction decision separate from airport selection."
        },
        {
          "label": "Protect the last night before a flight",
          "href": "/guides/china-last-night-before-international-flight/",
          "description": "Decide where to sleep after the actual airport and departure hour are fixed."
        },
        {
          "label": "Compare a private transfer and public transport",
          "href": "/guides/china-private-transfer-or-public-transport/",
          "description": "Judge the ground leg by handoffs, luggage, operating window and fallback."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources and image credit",
      "items": [
        {
          "label": "Dated 30 July 2026 regional-flight adjustment",
          "url": "https://www.cdairport.com/news_detail.aspx?cid=6393&page=1&t=60",
          "publisher": "Chengdu Airports",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Official Chengdu airport ground-transport entry point",
          "url": "https://www.cdairport.com/traffic3.aspx?t=36",
          "publisher": "Chengdu Airports",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Official airport notice archive",
          "url": "https://www.cdairport.com/news_detail.aspx?cid=2507&page=4&t=60",
          "publisher": "Chengdu Airports",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "China Railway live station and train search",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Hero: Chengdu Tianfu International Airport",
          "url": "https://commons.wikimedia.org/wiki/File%3A%E6%88%90%E9%83%BD%E5%A4%A9%E5%BA%9C%E5%9B%BD%E9%99%85%E6%9C%BA%E5%9C%BA_Chengdu_Tianfu_International_Airport_2.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
