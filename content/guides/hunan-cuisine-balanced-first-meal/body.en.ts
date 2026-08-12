import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "Hunan food is often introduced through heat, but a first shared meal works better when fresh chili, sour or pickled notes, smoked ingredients, steamed dishes and vegetables are allowed to contrast."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "Order contrast, not ten chilies",
      "body": "For three or four diners, start with one signature protein, one steamed or braised dish, one vegetable or tofu dish and rice. Add a smoked or sour item only if the group wants the stronger regional profile.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "Order contrast, not ten chilies",
      "columns": [
        "Slot",
        "Example direction",
        "Balance question"
      ],
      "rows": [
        [
          "Fresh heat",
          "Chili-led meat or fish",
          "Can one dish carry the main heat?"
        ],
        [
          "Sour/preserved",
          "Pickled chili or vegetable",
          "Is it also salty?"
        ],
        [
          "Smoked/cured",
          "Smoked meat",
          "Pair with a lighter dish"
        ],
        [
          "Relief",
          "Steamed egg, tofu or greens",
          "Confirm less chili clearly"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Tell staff who cannot eat chili, not just who prefers mild.",
        "Use 微辣, 少放辣椒 or 完全不辣, but expect kitchens to vary.",
        "State allergies separately; ‘not spicy’ is not an allergy protocol.",
        "Order rice and vegetables with the first round.",
        "Add only after the table has tasted everything."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "Not all Hunan dishes are equally hot",
      "body": "Regions, families, restaurants and cooks vary. A request for less chili may change a dish and cannot guarantee zero chili, oil contact or allergen separation.",
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
          "label": "Hunan cuisine traditions",
          "url": "https://hunan.gov.cn/topic/ccjhl/djz/202107/t20210716_19935053.html",
          "publisher": "Hunan Provincial Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hunan delicacies and methods",
          "url": "https://whhlyt.hunan.gov.cn/whhlyt/english/Culture/Delicacies/202403/t20240315_33249620.html",
          "publisher": "Hunan Provincial Department of Culture and Tourism",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Hunan home-style fried tofu by Huangdan2060, CC BY 3.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Hunan_cuisine,_Fried_Tofu,_Home_Style.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

