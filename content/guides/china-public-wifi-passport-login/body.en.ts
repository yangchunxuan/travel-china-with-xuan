import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "Public Wi-Fi in China does not have one national login method. Some major airports now document passport-based access through a kiosk or scanner; other networks use SMS, room credentials or staff-issued codes. Treat Wi-Fi as a venue service, not your only connection, and follow the instructions displayed at that location."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "Match the venue's login",
      "columns": [
        "Situation",
        "Route",
        "Action"
      ],
      "rows": [
        [
          "Airport with passport kiosk or scanner",
          "Use the official terminal or portal",
          "Keep the passport in your hand and confirm the network name on airport signage."
        ],
        [
          "Hotel",
          "Ask reception for the official SSID and login",
          "Room number, surname or a code may be required."
        ],
        [
          "Venue asking for SMS",
          "Use a number the portal accepts",
          "Foreign numbers may or may not be supported; do not assume."
        ],
        [
          "No usable login",
          "Switch to eSIM, local SIM, roaming or pocket Wi-Fi",
          "Avoid entering passport data into an unverified lookalike portal."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "Passport login is specific, not universal"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "Beijing Capital and Daxing airport guidance describes passport-based access, while Shanghai's Pudong airport published its own passport Wi-Fi process. These examples do not prove every airport, station or café uses the same system.",
        "An airport kiosk may print or display credentials after scanning a travel document. Shield the passport and collect any printout; do not leave copies behind.",
        "Confirm the SSID on official signs or with staff. A network name that looks plausible can still be a rogue hotspot.",
        "Assume public Wi-Fi is untrusted: use HTTPS, avoid sensitive account changes, disable file sharing and forget the network after use."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "A safe connection sequence"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Turn off automatic join and ask staff or signage for the exact network name.",
        "Open the venue's official captive portal; if it uses a kiosk, complete that process before repeatedly retrying SMS.",
        "Read what identity data is requested and stop if the domain, certificate or screen appears inconsistent.",
        "Use the connection for necessary low-risk tasks, then switch to your own data for banking, password recovery or identity uploads.",
        "Forget the network and remove any downloaded profile you did not intentionally install."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "If the portal loops or rejects your passport",
      "body": "Do not keep submitting different document formats to an unverified page. Ask the airport or hotel information desk whether there is a foreign-passport terminal, manual code or service desk. If not, use your independent data route. Screenshot the error without exposing the passport number if you contact official support.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "Scope and live-rule boundary",
      "body": "Passport Wi-Fi availability and instructions are venue-specific and can change. The official airport pages cited here support particular services as reviewed on 12 August 2026; they do not guarantee coverage, speed, access to any service or acceptance of every document.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "China eSIM or local SIM",
          "href": "/guides/china-esim-vs-local-sim/",
          "description": "Build the independent data backup."
        },
        {
          "label": "Paying in China",
          "href": "/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "Avoid making public Wi-Fi a payment dependency."
        },
        {
          "label": "First high-speed train",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Download tickets and instructions before the station."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "Beijing airports connectivity guide",
          "url": "https://english.beijing.gov.cn/latest/specials/essentialtipsfornewarrivals/getconnected/202408/t20240830_3785643.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Beijing Capital Airport Wi-Fi",
          "url": "https://english.beijing.gov.cn/specials/beijingservice/pek/wifi/",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Daxing Airport passport Wi-Fi service",
          "url": "https://english.beijing.gov.cn/latest/news/202512/t20251205_4322494.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Pudong Airport passport Wi-Fi update",
          "url": "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260424/88cde5e96ef242daa534102069450a03.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
