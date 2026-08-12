import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "Flights and trains do not use one interchangeable rule. On China domestic flights, power banks with no clear marking, no CCC mark or a recalled model have been prohibited since 28 June 2025. Aviation also applies carry-on and watt-hour limits. Rail rules allow clearly marked power banks up to 100Wh. Inspect the label before leaving home."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "Flight versus train",
      "columns": [
        "Situation",
        "Route",
        "Action"
      ],
      "rows": [
        [
          "China domestic flight",
          "Carry-on only; clear capacity and CCC mark",
          "Up to 100Wh normally without airline approval; 100–160Wh needs approval, maximum two."
        ],
        [
          "International flight departing China",
          "Aviation lithium-battery rules plus carrier/airport checks",
          "Confirm whether the 2025 domestic-flight CCC notice is applied to your exact sector."
        ],
        [
          "High-speed or conventional train",
          "Clearly marked, rated energy not over 100Wh",
          "Keep terminals protected and device in good condition."
        ],
        [
          "Unclear, damaged or recalled unit",
          "Do not travel with it",
          "Replace it; staff cannot verify an unreadable label."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "Read Wh, not only mAh"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "If watt-hours are printed, use that value. If only voltage and amp-hours are shown, Wh = V × Ah; 10,000mAh equals 10Ah, but the printed rated voltage still matters.",
        "For flights, power banks belong in cabin baggage, not checked baggage. Protect them from short circuit and do not use them during the flight under CAAC guidance.",
        "A visible CE, FCC or other mark is not the same as China's CCC mark. Do not invent or attach a replacement label.",
        "Airlines, security staff and recalled-product notices may be stricter than the general threshold. The final transport decision is operational, not made by this article."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "Packing check"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Photograph both sides of the power bank in good light and confirm brand, model, Wh and markings are legible.",
        "Search the manufacturer and regulator recall information for that model.",
        "For a China domestic flight, confirm the genuine CCC mark; if absent or unclear, use another device.",
        "Put the unit in carry-on baggage, protect terminals and prevent accidental activation.",
        "For a train-only trip, confirm the rated energy is 100Wh or below and clearly printed."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "If security refuses it",
      "body": "Do not argue from an online summary or move it secretly to checked baggage. Ask whether an official surrender, return-to-check-in or non-travel disposal option exists. Protect personal data on any smart accessory, obtain a receipt where available, and continue only through the official security process.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "Scope and live-rule boundary",
      "body": "The 100Wh and 160Wh aviation thresholds are general CAAC limits; the 2025 CCC notice specifically addresses China domestic flights. International sectors, connecting itineraries, airlines and recalls require a same-week check. Railway staff apply the live catalogue and safety condition of the actual device.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Power plugs and adapters",
          "href": "/guides/china-power-plugs-voltage-and-adapters/",
          "description": "Check how you will recharge the approved unit."
        },
        {
          "label": "First high-speed train",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "Prepare station security and boarding."
        },
        {
          "label": "Final night before a flight",
          "href": "/guides/china-last-night-before-international-flight/",
          "description": "Run the label check before repacking."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "CAAC notice on CCC-marked power banks (2025)",
          "url": "https://www.caac.gov.cn/English/News/202507/t20250709_227894.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "CAAC lithium battery and power bank limits",
          "url": "https://www.caac.gov.cn/big5/www.caac.gov.cn/XXGK/XXGK/TZTG/201511/t20151105_11173.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Railway passenger prohibited and restricted items catalogue",
          "url": "https://big5.www.gov.cn/gate/big5/www.gov.cn/zhengce/zhengceku/2022-05/31/content_5693212.htm",
          "publisher": "National Railway Administration / Ministry of Public Security",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
