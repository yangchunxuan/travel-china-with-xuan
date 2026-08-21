import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "If a ticket has been issued, the destination printed on it is fixed: 西安, 西安北 and 西安东 are different stations. If you have not booked, search the real date in 12306 first, then compare the complete trip to the actual hotel or next booking. Xi'an East opened on 30 June 2026, so an older map or article that lists only Xi'an and Xi'an North is no longer a safe planning model."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "The ticket wins; before booking, the whole trip wins",
      "tone": "decision",
      "body": "Test Xi'an Station first for a central City Wall-side arrival only when a suitable live train calls there. Xi'an North is a large high-speed hub and often enters the shortlist, but its northern transfer still counts. Xi'an East can be valuable for trains that actually use it and for east-side chains, but the opening did not move every route there. Never search or drive to an invented 'Xi'an West' because an English label was shortened."
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "The Xi'an station choice this guide resolves",
      "tone": "neutral",
      "body": "This page owns the choice among the principal Xi'an passenger stations that appear for a traveller's real date, plus ticket-name checks, hotel-side friction and wrong-station recovery. It does not teach national 12306 booking, decide where to stay, repeat the Terracotta Warriors transfer, or publish permanent route directions by station."
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "Screenshot the ticket's 西安 / 西安北 / 西安东 name and train date for offline use; never replace it with a map shorthand.",
        "Write the first door as the Xi'an hotel door or inbound transfer and the last door as the named station entrance and the next hotel or Terracotta Warriors pickup.",
        "Mark the hard cutoff—station entry and the next timed departure—and the latest safe abandonment point.",
        "Count North/East-side city distance, cases and a possible station change segment by segment instead of copying the main-leg duration.",
        "Save a current verification path through 12306 and uniformed Xi'an station staff, plus rebook at the named station or protect a staffed Xi'an night if it fails."
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Match 西安, 西安北 or 西安东 to the actual journey"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "The Chinese station name on the 12306 order settles the departure",
      "columns": [
        "Xi'an station or connection",
        "Why it fits this Xi'an trip",
        "Xi'an-side check that settles it",
        "Station-name error to avoid"
      ],
      "rows": [
        [
          "Xi'an Railway Station / 西安站",
          "A workable live train calls here and the first or last address is near the City Wall or central north side.",
          "Does its central position still win after station entry, traffic, luggage and the exact hotel entrance are counted?",
          "Do not assume every conventional train—or every train with Xi'an in the search—uses this station."
        ],
        [
          "Xi'an North Railway Station / 西安北站",
          "The best live high-speed product uses North, or the onward rail connection makes the larger northern hub rational.",
          "Does the train advantage survive the transfer to the City Wall, Dayanta, hotel lobby or next attraction gate?",
          "'North' is part of the ticketed name, not the north entrance of Xi'an Station."
        ],
        [
          "Xi'an East Railway Station / 西安东站",
          "A live train actually uses the station and an east-side hotel, Terracotta Warriors direction or onward chain benefits.",
          "Are current city connections, entrances and construction conditions verified for the travel hour?",
          "Opening on 30 June 2026 did not make East the default for every route or hotel."
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "Xi'an East makes old two-station rules unsafe",
      "tone": "warning",
      "body": "Xi'an East began passenger service in 2026, so old two-station diagrams are unsafe. Reopen 12306 and current Xi'an transport notices in the publication week; never turn one launch-day train pattern, entrance or metro connection into a permanent station role."
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "City Wall, Dayanta and a missed-station rescue"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "Measure from the Xi'an hotel door to the printed station name",
      "columns": [
        "Xi'an journey",
        "How to test this station choice",
        "Xi'an failure to prevent"
      ],
      "rows": [
        [
          "Evening arrival to a City Wall hotel",
          "Compare only trains that sell on the real date. Add exit, legal pickup or metro, traffic, the final walk and reception hours; a slightly slower train into Xi'an Station may beat a faster North/East product, but only if the full chain is live.",
          "A late train reaches the correct city but the hotel entrance or reception is no longer usable."
        ],
        [
          "Dayanta stay with a timed Terracotta Warriors visit",
          "Keep the stay owner and Terracotta owner separate. This page chooses the rail node that leaves a recoverable city transfer; the attraction page then controls its booked entrance, passport and time slot.",
          "A traveller treats East as automatically closest to the Terracotta Warriors and ignores the actual train and gate chain."
        ],
        [
          "Wrong station with a hard onward departure",
          "Read the Chinese station on the active order, ask railway staff whether a change is possible, and compare verified arrival at the correct entrance against the station-entry margin. Abandon a cross-city race when the margin is not plainly safe.",
          "A taxi estimate is mistaken for a boarding guarantee and the group loses both the train and its recovery option."
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "Trace the Xi'an hotel-to-platform journey"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "The station door is only the middle of the journey",
      "columns": [
        {
          "heading": "Before the train",
          "items": [
            "Hotel checkout and real vehicle pickup",
            "Traffic or metro access with all bags",
            "Correct station entrance, security and boarding margin"
          ]
        },
        {
          "heading": "On the record",
          "items": [
            "Full Chinese origin and destination names",
            "Train number, date and current order status",
            "No substitution because the English city name looks similar"
          ]
        },
        {
          "heading": "After arrival",
          "items": [
            "Exit and authorised pickup or metro",
            "Exact hotel, attraction or next station entrance",
            "Late-arrival and luggage fallback"
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "Cases and late arrivals magnify Xi'an's north–east distances"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "Protect the cross-city station margin before saving rail minutes",
      "columns": [
        "Xi'an constraint",
        "Safer Xi'an arrangement",
        "Unsafe station shortcut"
      ],
      "rows": [
        [
          "Several large cases or older travellers",
          "Prefer fewer lifts and verified step-free handoffs even if the rail leg is not the shortest. Confirm which entrance a legal vehicle can reach.",
          "A metro icon proves lifts, short walks or room for every case."
        ],
        [
          "Arrival after the planned local connection",
          "Tell the hotel which station you are actually at, use current official transport or an authorised vehicle, and choose a staffed urban overnight if the final handoff cannot be verified.",
          "A daytime route, open exit or hotel reception still operates at midnight."
        ],
        [
          "A short rail connection between different Xi'an stations",
          "Treat it as a cross-city transfer: exit, road/metro, correct entrance, security and boarding time all count. Rebook when the verified margin is weak.",
          "The word Xi'an makes the stations interchangeable."
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "At the wrong Xi'an station: check the ticket before crossing the city"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Stop and open the active 12306 order. Confirm the complete Chinese departure station, date, time, train number and ticket status.",
        "Ask uniformed railway staff whether you are at a wrong entrance or a different station; do not leave until that distinction is clear.",
        "Check current change or refund options before committing to a cross-city vehicle. Eligibility depends on the live order and railway rules.",
        "If transferring, navigate to the correct station entrance, not merely the station district, and add ordinary entry and luggage time.",
        "Tell the hotel, attraction or pickup which station you will actually reach and revise any timed booking before its cutoff.",
        "When neither the original train nor a safe transfer remains, protect passports, the group and the next night; rebuild the route with staffed help."
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "Reconsider the Xi'an station when…"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "The live train uses a different station than the route pattern you remembered.",
        "The first bed moves from the City Wall to Dayanta or an east-side property.",
        "A timed Terracotta Warriors entry or hard onward train becomes the controlling deadline.",
        "Luggage, a stroller or step-free uncertainty makes one extra transfer unacceptable.",
        "A release-day metro, station-entrance or construction notice changes access."
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "Xi'an station check before purchase and departure"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "Search the exact date in 12306 and save the active order offline.",
        "Match 西安, 西安北 or 西安东 character for character.",
        "Pin the correct station and the correct entrance in the navigation app.",
        "Save the hotel branch, Chinese address, phone and reception hours.",
        "Recheck Xi'an East access and any construction in the publication week.",
        "Build a wrong-station cutoff before departure.",
        "Keep the national boarding process in the dedicated first-train guide."
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
      "text": "Is Xi'an North the same as Xi'an Station?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "No. 西安北 and 西安 are different stations and the suffix is part of the ticket. A driver or hotel needs the complete Chinese name."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Should every high-speed train use Xi'an North?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "Do not use that rule. Xi'an East is now open and stopping patterns change. Search the real origin, destination and date in 12306; the issued ticket decides."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Is Xi'an East automatically best for the Terracotta Warriors?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "No. It enters the shortlist only when a suitable train uses it and the complete chain to the booked entrance works. The Terracotta Warriors guide owns the attraction-side execution."
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "What if I am already at the wrong Xi'an station?"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "Confirm the active ticket and ask railway staff about change/refund options before racing across the city. Transfer only when verified arrival at the correct entrance leaves a plainly safe boarding margin."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue from the Xi'an station decision",
      "items": [
        {
          "label": "Start with the Xi'an city guide",
          "href": "/destinations/xian/",
          "description": "Place the station decision inside a first-trip city plan."
        },
        {
          "label": "Choose City Wall or Dayanta for the hotel base",
          "href": "/guides/xian-where-to-stay-city-wall-or-dayanta/",
          "description": "Let the real hotel area supply the arrival-side door."
        },
        {
          "label": "Visit the Terracotta Warriors without a tour",
          "href": "/guides/terracotta-warriors-without-tour/",
          "description": "Continue from the city rail decision to the booked attraction entrance."
        },
        {
          "label": "Use a China train for the first time",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Handle passports, station entry, security and boarding after selecting the exact station."
        },
        {
          "label": "Order Beijing, Xi'an and Chengdu",
          "href": "/guides/beijing-xian-chengdu-route-order/",
          "description": "Keep regional route order separate from the live Xi'an station choice."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources and image credit",
      "items": [
        {
          "label": "China Railway live journey and station search",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Official opening record for Xi'an East Railway Station",
          "url": "https://en.xa.gov.cn/MediaCenter/News/2072253459180654594.html",
          "publisher": "Xi'an Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Municipal railway-station information",
          "url": "https://jtj.xa.gov.cn/zmhd/xxcx/hczxx/6502b33ff8fd1c1a7038fae1.html",
          "publisher": "Xi'an Transport Bureau",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Current Xi'an transport notices",
          "url": "https://jtj.xa.gov.cn/",
          "publisher": "Xi'an Transport Bureau",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Hero: Xi'an North Railway Station northern building",
          "url": "https://commons.wikimedia.org/wiki/File%3A%E8%A5%BF%E5%AE%89%E5%8C%97%E7%AB%99%E5%8C%97%E7%AB%99%E6%88%BF_02.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
