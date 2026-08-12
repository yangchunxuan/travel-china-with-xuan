import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "Guozao is Wuhan's everyday idea of getting through breakfast, not a requirement to eat every famous snack at once. Build one main, one shared side and a drink, then stop."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "Choose a breakfast shape",
      "body": "Hot-dry noodles are a concentrated sesame-paste noodle bowl; three-fresh doupi adds crisp bean-and-egg skin over sticky rice filling; mianwo is a fried rice-and-soy ring. For two people, begin with one main each and share only one extra.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "Choose a breakfast shape",
      "columns": [
        "Item",
        "Role",
        "Ask"
      ],
      "rows": [
        [
          "Hot-dry noodles",
          "Main bowl",
          "Mix immediately; check chili"
        ],
        [
          "Three-fresh doupi",
          "Dense shared square",
          "Order a small portion if offered"
        ],
        [
          "Mianwo",
          "Fried contrast",
          "Buy one fresh piece"
        ],
        [
          "Drink or light soup",
          "Relief",
          "Confirm sweetened or unsweetened"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Go in the morning; individual shops may sell out.",
        "Point to the dish and quantity, not only a photo.",
        "Say whether chili is acceptable.",
        "Share before ordering seconds.",
        "Carry another payment method and save the shop name."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "No universal breakfast cutoff",
      "body": "Opening and sell-out times vary by shop and day. A current map listing is a lead, not proof that a stall is open.",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "Share the date, group and constraints. A local human can help verify a practical food or craft plan without turning one venue into a national rule.",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "Your first shared meal",
          "href": "/guides/first-shared-meal-in-china/"
        },
        {
          "label": "How to pay in China",
          "href": "/guides/how-to-pay-in-china-as-a-tourist/"
        },
        {
          "label": "Is your itinerary too rushed?",
          "href": "/guides/is-your-china-itinerary-too-rushed/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources and image credit",
      "items": [
        {
          "label": "Wuhan breakfast culture",
          "url": "https://english.wuhan.gov.cn/H_1/NWP/202601/t20260128_2719906.shtml",
          "publisher": "Wuhan Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Wuhan food introduction",
          "url": "https://english.wuhan.gov.cn/H_1/NWP/202309/t20230921_2268292.shtml",
          "publisher": "Wuhan Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Hot Dry Noodles by ZhengZhou, CC BY-SA 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Hot_Dry_Noodles.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

