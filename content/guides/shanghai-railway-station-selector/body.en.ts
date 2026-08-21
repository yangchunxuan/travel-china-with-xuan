import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "decision-lead",
      "type": "lead",
      "text": "Shanghai, Shanghai Hongqiao, Shanghai South and Shanghai Songjiang are four different major passenger stations. The issued Chinese station name is fixed. Before booking, compare live trains and the complete chain to the actual hotel, SHA/PVG flight or next city—not an old rule about which direction uses which station."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "Hongqiao is useful for some chains, not the default for Shanghai",
      "tone": "decision",
      "body": "Hongqiao's rail–airport complex can reduce a real SHA connection; Shanghai Station can serve central districts; South can suit southern Xuhui-side tasks; Songjiang can change a southwest or regional chain. The official Shanghai guide treats all four as major stations, but the actual dated train and final door decide."
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "The Shanghai station choice this guide is responsible for",
      "tone": "neutral",
      "body": "This page owns the four-station decision, Hongqiao rail–airport handoff boundary and wrong-station recovery. It does not compare PVG and SHA, repeat the Shanghai–Hangzhou corridor, choose a hotel area or publish per-station and direction pages."
    },
    {
      "id": "before-booking",
      "type": "list",
      "ordered": true,
      "items": [
        "Download the order that spells out 上海, 上海虹桥, 上海南 or 上海松江 and keep the train number beside it; do not send a city-only pin.",
        "Separate the hotel-to-station movement from any station-to-PVG, SHA or next-city connection so Hongqiao's integrated hub does not conceal a second transfer.",
        "Calculate the latest safe station entry, then apply the earlier cutoff if a flight or independently ticketed train follows.",
        "Measure Songjiang distance, central traffic and the internal Hongqiao walk with the group's cases rather than using the scheduled rail minutes.",
        "Use the live 12306 order and Shanghai access notices; when the cross-city margin collapses, rebook or move the night toward the correct gateway."
      ]
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Place Shanghai, Hongqiao, South or Songjiang inside the whole trip"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "The printed 上海 station name outranks a generic city pin",
      "columns": [
        "Shanghai rail node",
        "Trip pattern that brings it in",
        "Address-side test",
        "Name confusion to prevent"
      ],
      "rows": [
        [
          "Shanghai Railway Station / 上海站",
          "A live train and a central Jing'an or nearby hotel chain make it the practical node.",
          "Does the central transfer outweigh a materially better train elsewhere?",
          "上海站 means one station, not any station in Shanghai."
        ],
        [
          "Shanghai Hongqiao / 上海虹桥站",
          "The live train is strong, a west-side hotel fits, or a verified SHA connection benefits from the integrated hub.",
          "Is the traveller connecting to the railway station or airport terminal, and is the terminal/deadline verified?",
          "Hongqiao Railway Station and Hongqiao Airport are connected but not the same check-in point."
        ],
        [
          "Shanghai South / 上海南站",
          "The actual train uses South and a Xuhui/southern-city or regional onward chain works.",
          "Does its southern position reduce the real last mile without sacrificing the train?",
          "South is not the south entrance of Shanghai Station."
        ],
        [
          "Shanghai Songjiang / 上海松江站",
          "A live train uses Songjiang and a southwest hotel, attraction or regional chain benefits.",
          "Is the traveller actually going to Songjiang or merely choosing it because the train is fast?",
          "A major new station is not automatically convenient for the Bund or central hotel."
        ]
      ]
    },
    {
      "id": "dynamic-warning",
      "type": "callout",
      "title": "Songjiang and live timetables make old Shanghai shortcuts expire",
      "tone": "warning",
      "body": "Shanghai and Shanghai Songjiang are not interchangeable, and Hongqiao's rail–airport convenience depends on the real terminal and time. Reopen 12306 and Shanghai operator notices before release; do not freeze station-by-direction rules or airport-line hours."
    },
    {
      "id": "scenarios-heading",
      "type": "heading",
      "level": 2,
      "text": "Airport, Bund-side and Songjiang trips point to different stations"
    },
    {
      "id": "scenario-table",
      "type": "table",
      "caption": "Measure from the real Shanghai address through the printed rail node",
      "columns": [
        "Shanghai door pair",
        "Station comparison method",
        "Transfer failure to contain"
      ],
      "rows": [
        [
          "Rail to a Hongqiao flight",
          "Confirm SHA, terminal, airline deadline and the actual train station. Add rail exit, walking/transfer, airport security and disruption buffer; do not treat the shared place name as a protected connection.",
          "The traveller reaches Hongqiao rail on time but misses an airport-terminal deadline."
        ],
        [
          "Late train to a central hotel",
          "Compare the real train with current after-hours local transport, hotel branch and reception. A central Shanghai Station arrival can reduce risk; a late Hongqiao/South/Songjiang arrival needs a verified road fallback.",
          "A metro route used in planning has stopped, leaving luggage and an unstaffed final walk."
        ],
        [
          "Regional train and a southwest Shanghai task",
          "Songjiang or South enters the shortlist only when the train and exact southwest door benefit together. Keep Shanghai–Hangzhou station-pair execution in its existing owner.",
          "A faster line-haul leaves the traveller far from the hotel or next departure."
        ]
      ]
    },
    {
      "id": "chain-heading",
      "type": "heading",
      "level": 2,
      "text": "Join the Shanghai hotel, station entrance and next fixed booking"
    },
    {
      "id": "door-to-door-chain",
      "type": "comparison",
      "title": "the printed 上海 / 上海虹桥 / 上海南 / 上海松江 station is only the middle of the journey",
      "columns": [
        {
          "heading": "Leave from the Shanghai hotel, PVG/SHA flight or suburban address",
          "items": [
            "Start with the lobby, airport baggage hall or suburban address that will release the traveller, then match it to a station-side entrance.",
            "At Hongqiao, separate the rail building from SHA terminals; for Songjiang, include the long city approach before entering the station.",
            "Protect the earliest of rail entry, airline bag drop and the next independently ticketed departure."
          ]
        },
        {
          "heading": "Read the printed 上海 / 上海虹桥 / 上海南 / 上海松江 station literally",
          "items": [
            "Keep the train number beside 上海, 上海虹桥, 上海南 or 上海松江 so a changed order cannot be mistaken for an old screenshot.",
            "Check the dated service in 12306 and use Shanghai transport notices only for the station access that applies that day.",
            "Keep 上海, 上海虹桥, 上海南 or 上海松江 in the working record; a generic Shanghai pin cannot stand in for the ticket."
          ]
        },
        {
          "heading": "Finish at the correct station entrance and the next airport, hotel or city",
          "items": [
            "Use the signed concourse for the booked Shanghai station, then follow the current metro or licensed-pickup plan for that location.",
            "From the actual exit, recompute PVG, SHA, the hotel or the next city booking; Hongqiao co-location helps only when the correct terminal is involved.",
            "If an airport deadline is already lost, change the affected ticket or move to that gateway instead of betting on Shanghai traffic."
          ]
        }
      ]
    },
    {
      "id": "late-heading",
      "type": "heading",
      "level": 2,
      "text": "Airport deadlines and bulky cases can overturn the fastest Shanghai train"
    },
    {
      "id": "late-table",
      "type": "table",
      "caption": "Protect the airport or hotel handoff before trimming the rail leg",
      "columns": [
        "Shanghai transfer constraint",
        "More resilient station choice",
        "Map assumption to discard"
      ],
      "rows": [
        [
          "Hongqiao's integrated hub, central-city transfers and Songjiang distance",
          "Choose the live train whose lobby-to-platform path needs the fewest long walks and transfers. Hongqiao's scale and Songjiang's distance matter more with several cases.",
          "A single airport-and-rail icon does not guarantee a short walk, a luggage trolley route or the right SHA terminal."
        ],
        [
          "Arrival threatens rail security plus an airport or separate-ticket cutoff",
          "Tell the airline or hotel the new arrival first, then have railway staff check whether a later train preserves the connection better than a cross-city vehicle.",
          "A transfer that works before the evening peak may fail after a delay, and a separate flight receives no railway protection."
        ],
        [
          "A separate booking after the correct station entrance and the next airport, hotel or city",
          "For a flight after rail, include the platform-to-concourse walk, terminal change, airline check-in and security; for another train, repeat station entry at the second node.",
          "A combined calendar entry is not through-ticketing between China Railway and an airline or separate rail operator."
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "At the wrong Shanghai station: compare rebooking with the cross-city run"
    },
    {
      "id": "recovery-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Stop at the staffed area and read the order's full 上海 station label and train number, not the English navigation result.",
        "Have railway staff distinguish a wrong Hongqiao entrance from Shanghai Station, South or Songjiang before anybody enters a taxi.",
        "Ask what the active ticket currently permits; only then compare that option with the time and cost of crossing Shanghai.",
        "If staff judge the correct station reachable, use its precise entrance and reserve ordinary security time plus any airline cutoff.",
        "Notify the affected hotel, airline or next railway booking with the station where the group is physically waiting.",
        "If no safe move remains, keep the party together and place the night near the gateway used by the replacement booking."
      ]
    },
    {
      "id": "changes-heading",
      "type": "heading",
      "level": 2,
      "text": "Reopen the Shanghai station decision when…"
    },
    {
      "id": "answer-changes",
      "type": "list",
      "ordered": false,
      "items": [
        "The live train uses another of the four major stations.",
        "The hotel moves between central, west, south or Songjiang-side Shanghai.",
        "A SHA or PVG flight becomes the controlling deadline.",
        "Airport Link, metro, taxi or construction access changes.",
        "Late arrival removes the last verified local connection."
      ]
    },
    {
      "id": "checklist-heading",
      "type": "heading",
      "level": 2,
      "text": "Shanghai station and onward-deadline check"
    },
    {
      "id": "final-checklist",
      "type": "list",
      "ordered": false,
      "items": [
        "Repeat the 12306 search on the actual date and retain the selected train number.",
        "Match the four possible Chinese station names with the hotel and any PVG or SHA booking.",
        "Save the station entrance and airport terminal as different navigation targets.",
        "Check current Songjiang access and construction or entrance notices for the chosen node.",
        "Walk through the plan with every suitcase and the real time of day.",
        "Set the point at which a railway change is safer than attempting Shanghai traffic.",
        "In publication week, verify both the train and onward gateway; move the ticket or night if either connection has broken."
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
      "text": "Are Shanghai Station and Hongqiao Station the same?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "No. 上海站 is the central railway station, whereas 上海虹桥站 sits inside the Hongqiao transport hub beside—but not inside—the airport terminals."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Is Hongqiao Railway Station inside the airport?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "They form a connected hub, but railway arrival and airport check-in are different processes and points. Confirm the flight terminal and allow transfer, security and airline deadlines."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "Should I use Songjiang for central Shanghai?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Only if a suitable train and the complete transfer beat the alternatives. A fast train to Songjiang does not erase the southwest-to-centre last mile."
    },
    {
      "id": "faq-4-question",
      "type": "heading",
      "level": 3,
      "text": "What if I go to the wrong Shanghai station?"
    },
    {
      "id": "faq-4-answer",
      "type": "paragraph",
      "text": "Read the full active ticket, ask railway staff about changes, and compare verified arrival at the correct entrance with boarding time. Rebook when the margin is weak."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue after choosing the Shanghai rail node",
      "items": [
        {
          "label": "Start with the Shanghai city guide",
          "href": "/destinations/shanghai/",
          "description": "Place the station inside the complete city plan."
        },
        {
          "label": "Choose a Shanghai hotel area",
          "href": "/guides/shanghai-where-to-stay-first-trip/",
          "description": "Let the actual hotel supply the final door."
        },
        {
          "label": "Choose PVG or SHA",
          "href": "/guides/shanghai-pudong-or-hongqiao-airport/",
          "description": "Keep the airport decision separate from the railway-station choice."
        },
        {
          "label": "Travel between Shanghai and Hangzhou",
          "href": "/guides/shanghai-hangzhou-transport-route/",
          "description": "Use the existing bidirectional station-pair owner for that corridor."
        },
        {
          "label": "Use a China train for the first time",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Continue with passports, station entry and boarding."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources and image credit",
      "items": [
        {
          "label": "Live train and station search",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Official guide to Shanghai railway stations",
          "url": "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026 evidence for four major railway hubs",
          "url": "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260214/9d1620c5ff0841b881409229fd1ec219.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2026 station-area access inspection",
          "url": "https://www.shanghai.gov.cn/nw31406/20260224/bf18a9f6bfa9420f89b83b44c4a3b043.html",
          "publisher": "Shanghai Transport Commission",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Hero: Shanghai Hongqiao Railway Station platform",
          "url": "https://commons.wikimedia.org/wiki/File%3AShanghai_Hongqiao_Station-20150519-RM-110424.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
