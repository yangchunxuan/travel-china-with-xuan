import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "Use the identity shown on the passport you will physically travel with. Flights and real-name rail tickets must match the valid document used for travel; hotels and apps may format fields differently, but that is not permission to invent a nickname or switch documents. Build one source record from the passport, then preserve evidence of any platform formatting."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "One identity, different forms",
      "columns": [
        "Situation",
        "Route",
        "Action"
      ],
      "rows": [
        [
          "Airline ticket",
          "Name and valid ID must match",
          "Follow the carrier's passport-name instructions and review confirmation immediately."
        ],
        [
          "China Railway 12306",
          "Use document type, name and number accurately",
          "Travel with the original passport used for the booking."
        ],
        [
          "Hotel booking",
          "Use passport identity; notify property of display quirks",
          "Keep confirmation and original passport for check-in."
        ],
        [
          "App has short or split fields",
          "Use the platform's official format guidance",
          "Screenshot the entry and do not invent abbreviations without support."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "Create a passport source record"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "Copy the surname, given names, passport number, nationality, date of birth and expiry from the photo page. The machine-readable zone can help resolve punctuation and ordering, but the booking provider's own instructions control its fields.",
        "Hyphens, spaces, apostrophes and multiple given names may display differently after ticketing. A cosmetic display change is not automatically an error, but only the provider can confirm acceptance.",
        "Do not mix an old passport number with a new passport name, or use a residence card for one booking and assume the passport will substitute later.",
        "Chinese domestic systems may use uppercase Latin letters or remove spaces. Preserve the confirmation and ask support when the resulting identity is ambiguous."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "A correction-first workflow"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Enter identity from the passport that will be valid on travel day.",
        "Before paying, compare every character, document type and number.",
        "Immediately after ticketing, inspect the issued ticket or order—not only the form you typed.",
        "For a mismatch, contact the airline, 12306, agent or hotel through its official channel before cancelling. Ask whether correction, reissue or a new booking is required.",
        "Carry the original passport and written confirmation of any accepted formatting or document update."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "If the passport is renewed after booking",
      "body": "Contact each provider separately. Airlines, railway and hotels do not share one update process. Keep both old and new passport details and evidence of renewal where lawful, but do not assume carrying the old passport automatically fixes the record. Let the provider specify correction or reissue.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "Scope and live-rule boundary",
      "body": "This guide cannot decide whether a particular abbreviation or missing character will be accepted. Real-name checks are made by carriers, China Railway, hotels and border authorities under their own systems. Use their official support before travel; never rely on a third-party forum's formatting promise.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "First high-speed train",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Use the same passport at the station."
        },
        {
          "label": "Lost passport recovery",
          "href": "/guides/lost-passport-in-china-exit-recovery/",
          "description": "Repair bookings after a document replacement."
        },
        {
          "label": "China entry requirements",
          "href": "/guides/china-entry-requirements/",
          "description": "Match the travel document to entry permission."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "China guide for business expatriates (real-name rail travel)",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "State Council of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "12306 real-name ticket information",
          "url": "https://kyfw.12306.cn/mormhweb/zxdt/201401/t20140117_1318.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "12306 real-name ticket FAQ",
          "url": "https://kyfw.12306.cn/otn/gonggao/realNameTicket.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "CAAC air travel ID and ticket guidance",
          "url": "https://www.caac.gov.cn/big5/www.caac.gov.cn/INDEX/HLFW/HKLXCS/",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
