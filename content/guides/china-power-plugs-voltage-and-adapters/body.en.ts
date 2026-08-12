import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "China's supply is 220V at 50Hz. A plug adapter changes the physical shape; it does not change voltage. Most modern phone and laptop chargers marked INPUT 100–240V, 50/60Hz need only a suitable plug adapter. A single-voltage appliance designed only for about 110–120V needs a real converter or should stay home."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "Adapter or converter?",
      "columns": [
        "Situation",
        "Route",
        "Action"
      ],
      "rows": [
        [
          "Label says INPUT 100–240V, 50/60Hz",
          "Plug adapter only",
          "Check that the plug fits securely; use the charger normally."
        ],
        [
          "Label says only 110V or 120V",
          "Voltage converter or different appliance",
          "Do not plug directly into 220V."
        ],
        [
          "Label says 220–240V",
          "Usually voltage-compatible",
          "You may still need a shape adapter."
        ],
        [
          "No readable electrical label",
          "Do not guess",
          "Find the manufacturer specification or replace the device."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "The socket-shape reality"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "Official Shanghai guidance describes Type A, C and I sockets. Actual hotel, train and airport outlets vary, and a loose multi-standard socket may not hold a heavy charger well.",
        "Bring one compact grounded adapter from a reputable maker and a short extension or multi-port USB charger if several devices share a room outlet.",
        "A two-pin adapter does not create earth grounding for a three-pin appliance. High-power or grounded equipment needs an appropriately rated, grounded solution.",
        "Hair dryers, straighteners, kettles and heating tools are the common trap: many are single-voltage and draw more power than small travel converters can safely supply."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "Read every charger in sixty seconds"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Find INPUT on the charger or appliance, not OUTPUT on a USB port.",
        "Confirm the full voltage range includes 220V and the frequency includes 50Hz.",
        "Check the adapter's maximum voltage, current and wattage exceed the appliance demand.",
        "Pack the adapter in carry-on and avoid stacking loose adapters.",
        "On arrival, inspect the outlet and stop if it sparks, feels loose, overheats or smells unusual."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "If the plug fits but charging fails",
      "body": "Disconnect it. Try the hotel's known working outlet with the original charger, then test the adapter separately with a low-power universal-voltage device. Ask the hotel rather than forcing pins. A physical fit does not prove correct voltage, grounding or electrical condition.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "Scope and live-rule boundary",
      "body": "Socket availability varies by building and outlet. Official sources establish 220V/50Hz and commonly encountered plug shapes, but they cannot promise a particular hotel room socket. Verify high-power medical or professional equipment with the manufacturer and accommodation before travel.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Power bank transport rules",
          "href": "/guides/china-power-bank-rules-flights-trains/",
          "description": "Make sure the backup battery can travel."
        },
        {
          "label": "China eSIM or local SIM",
          "href": "/guides/china-esim-vs-local-sim/",
          "description": "Keep the phone powered and connected."
        },
        {
          "label": "Final night before a flight",
          "href": "/guides/china-last-night-before-international-flight/",
          "description": "Put essential chargers in carry-on."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "Electricity in China",
          "url": "https://www.caac.gov.cn/ZTZL/RDZT/YTHYWZ/CHRY/SHZN/Electricity/index.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Beijing pre-departure travel tips",
          "url": "https://english.beijing.gov.cn/travellinginbeijing/quickguideontravelservices/traveltips/202108/t20210811_2466837.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Shanghai electricity FAQ",
          "url": "https://english.shanghai.gov.cn/en-FAQs-StudyinShanghai/20250924/e961a223e45a4adca7969b3f7691132b.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
