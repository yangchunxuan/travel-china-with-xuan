import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "There is no single map-app winner for every visitor, device or Chinese city. Use the app that works on your phone as a working map, but make the destination independent of that app: save the official Chinese name, city, district, complete address, branch or terminal, usable entrance, phone number and a nearby landmark. Search those fields inside the receiving map and keep the text offline. A verified address survives a broken link, a different app and a drifting blue dot."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "Choose the destination before the app",
      "body": "For an iPhone already set up in China, Apple Maps may be a convenient front end; Apple says its China map service uses Amap. Amap and Baidu can expose strong local place data, but neither brand name proves that a particular result is the correct branch or open gate. Confirm the place identity first, then keep a second same-day route or staffed landmark as backup. This is a verification workflow, not an app ranking.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "Use this confirmation matrix"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "The weakest field decides whether a route is safe to start",
      "columns": [
        "What you have",
        "What it can confirm",
        "What is still missing",
        "Decision"
      ],
      "rows": [
        [
          "An English hotel or attraction name",
          "The intended brand or broad place",
          "Chinese branch, district, street number and entrance",
          "Do not start; obtain the Chinese destination card."
        ],
        [
          "A pin shared from another app",
          "A point selected by the sender at one moment",
          "How the receiving app interprets it and whether the gate is current",
          "Search the accompanying Chinese text inside your app."
        ],
        [
          "Chinese name plus full address",
          "Place identity at street and building level",
          "The gate required by your transport mode or ticket",
          "Call or message the venue for the usable entrance."
        ],
        [
          "Matching address, branch, entrance and phone in two sources",
          "A defensible destination identity",
          "Live road closures, pickup restrictions and device location",
          "Start the route with an offline screenshot and fallback anchor."
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "Build the destination card before leaving Wi-Fi"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Open the venue's own website, official account, issued booking or direct message. Copy the Chinese name exactly, including branch, tower, terminal or gate suffixes.",
        "Record city and district separately. Same-name hotels, hospitals, stations and restaurants can exist across districts or even cities.",
        "Copy the complete Chinese street address and public telephone number. Never include a passport number, booking code, room number or payment screenshot in the travel card.",
        "Ask which pedestrian entrance, vehicle gate or pickup point is operating for your arrival time. A property centre is not automatically an accessible entrance.",
        "Search the Chinese text in the map you will actually use. Match category, district, address and phone before accepting the result.",
        "Cross-check with a second local map or a same-app link sent by the venue. Agreement on place identity matters more than visually identical coordinates.",
        "Save the text, one privacy-safe screenshot, the venue contact and a staffed nearby landmark offline. Recheck the entrance on the travel day."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "Keep three layers separate"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "A correct trip needs place, entrance and live-position evidence",
      "columns": [
        {
          "heading": "Place identity",
          "items": [
            "Chinese official name and branch",
            "City, district, street and building",
            "Public venue phone or official contact"
          ]
        },
        {
          "heading": "Operational entrance",
          "items": [
            "Named gate, terminal, floor or pickup area",
            "Ticket and vehicle access for that time",
            "A visible landmark where staff can help"
          ]
        },
        {
          "heading": "Live navigation",
          "items": [
            "Current route and road condition",
            "Device permission and signal quality",
            "A second route or staffed fallback"
          ]
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "Diagnose the failure you can see"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "Do not invent a coordinate correction when the identity may be wrong",
      "columns": [
        "Symptom",
        "Likely problem",
        "Safe recovery"
      ],
      "rows": [
        [
          "Two apps place the same link on opposite sides of a complex",
          "Property centre versus entrance, or a cross-app handoff",
          "Search the named gate in each app and confirm it with the venue."
        ],
        [
          "The route heads to another district",
          "Wrong same-name branch",
          "Stop safely, compare district and phone, then rebuild the destination from Chinese text."
        ],
        [
          "The fixed destination looks right but your blue dot jumps",
          "Positioning or indoor-signal issue",
          "Follow signs to an open known anchor and reacquire location; do not move the destination pin."
        ],
        [
          "The planned gate is closed",
          "Operational access changed after the POI was saved",
          "Use the venue's current notice or staffed main entrance and update all saved handoffs."
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "Recover without turning one wrong pin into several"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "Stop at a safe public place; do not cross a barrier, express road, construction zone or private drive to reach a pin.",
        "Read the Chinese name, district and branch aloud or show the destination card to staff.",
        "Ask the venue to send the current entrance in the same map used by the driver or traveller.",
        "If a vehicle is already moving, ask the driver to pull over legally before changing the destination.",
        "If the phone or data fails, route to the saved staffed landmark, then complete the last segment with local help.",
        "After arrival, replace the failed pin in every traveller's shared note so the group does not repeat the error."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "What this guide cannot promise",
      "body": "It cannot promise that Amap, Apple Maps or Baidu Maps will be available, equally translated, equally current or accurate on a particular device and date. It does not rank the apps, teach coordinate conversion or bypass mapping rules. Roads, POIs, gates and product features change. The venue's current official address and staffed operational confirmation control; never follow a map into a restricted or unsafe area.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "Ready-to-leave check"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "Chinese name and branch copied from a current first-party record",
        "City, district, street, building and public phone all match",
        "Pedestrian or vehicle entrance confirmed for the arrival time",
        "Destination searched in the map that will actually be used",
        "Second source or venue contact agrees on the place identity",
        "Text, screenshot and staffed fallback landmark saved offline",
        "No private data appears in the shareable destination card"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "Common navigation questions"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "Is Amap always better than Apple Maps or Baidu Maps?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "No. Device support, language, city data and personal workflow differ. The durable choice is the app in which the verified Chinese address and entrance can be confirmed, with an offline backup."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "Should I copy coordinates between apps?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "Do not make coordinates the primary handoff. Copy the Chinese destination fields and search again in the receiving app; a bare pair does not reveal branch, entrance or data interpretation."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "What should I show a taxi driver?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "Show the Chinese destination card and the result inside the driver's map. Highlight the district, branch and entrance, and keep the venue's public phone available."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Keep the rest of the arrival system connected",
      "items": [
        {
          "label": "Understand China map mismatches",
          "href": "/guides/china-map-coordinate-offset-explained/",
          "description": "Diagnose cross-app pins without inventing a correction."
        },
        {
          "label": "Choose an eSIM or local SIM",
          "href": "/guides/china-esim-vs-local-sim/",
          "description": "Keep a tested data path and a no-data fallback."
        },
        {
          "label": "Choose a hotel near the right metro stop",
          "href": "/guides/china-hotel-near-metro/",
          "description": "Verify the exact station exit and hotel entrance together."
        },
        {
          "label": "Compare private and public transport",
          "href": "/guides/china-private-transfer-or-public-transport/",
          "description": "Match the verified pickup and final door before choosing a mode."
        },
        {
          "label": "Recover after losing a phone",
          "href": "/guides/lost-phone-in-china-digital-recovery/",
          "description": "Keep addresses reachable when the primary device is gone."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official map and address sources",
      "items": [
        {
          "label": "Digital map services expand support for international visitors",
          "url": "https://english.shanghai.gov.cn/en-EasyShanghai/20260713/379bcea6e1bd4defaa7db2451d68d3dd.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Apple Maps & Privacy — Maps Service in China",
          "url": "https://www.apple.com/legal/privacy/data/en/apple-maps/",
          "publisher": "Apple",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Geocoding and reverse geocoding",
          "url": "https://lbs.amap.com/api/webservice/guide/api/georegeo/",
          "publisher": "Amap Open Platform",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Place Search 3.0",
          "url": "https://lbsyun.baidu.com/docs/webapi?title=placev3%2Fguide%2Fwebservice-placeapiV3%2FinterfaceDocumentV3",
          "publisher": "Baidu Maps Open Platform",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "GB/T 39609-2020 Rules for geocode of address",
          "url": "https://std.samr.gov.cn/gb/search/gbDetailed?id=TFB%2FwAU5XAs%3D&mode=p",
          "publisher": "National Public Service Platform for Standards Information",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
