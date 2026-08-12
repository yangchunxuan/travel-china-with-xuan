import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "Movable type did not simply arrive and make woodblocks obsolete. The useful comparison is the workflow: carving or selecting, composing, correcting, printing, storing and reprinting."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "Compare the job, not a winner",
      "body": "Blocks can preserve a stable page for repeated impressions; type can recombine characters but requires a large, organized inventory and careful composition.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "Compare the job, not a winner",
      "columns": [
        "Decision",
        "Woodblock",
        "Movable type"
      ],
      "rows": [
        [
          "Prepare",
          "Carve the page",
          "Select and compose characters"
        ],
        [
          "Correct",
          "Alter or recut the block",
          "Replace type and reset lines"
        ],
        [
          "Store",
          "Keep page blocks",
          "Sort and retain type"
        ],
        [
          "Reprint",
          "Reuse the same page",
          "Recompose if dismantled"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "Find the physical block or type case.",
        "Identify whether the display is original, replica or demonstration.",
        "Follow the sequence from text to impression.",
        "Ask what kind of book or record it served.",
        "Do not write a simple replacement timeline."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "Living practice and history differ",
      "body": "UNESCO's Rui'an wooden movable-type entry documents a living lineage-genealogy practice. It does not prove every historical workshop used the same tools or sequence.",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "Send the date and place. A local human can check current access, displays or programmes without promising unverified conditions.",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "How Guangzhou morning tea works",
          "href": "/guides/how-guangzhou-morning-tea-works/"
        },
        {
          "label": "Visit the Terracotta Army independently",
          "href": "/guides/terracotta-warriors-without-tour/"
        },
        {
          "label": "Do you need a guide in China?",
          "href": "/guides/do-you-need-a-tour-guide-in-china/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Institutional sources and image credit",
      "items": [
        {
          "label": "Wooden movable type printing of China",
          "url": "https://ich.unesco.org/en/usl/wooden-movable-type-printing-of-china-00322",
          "publisher": "UNESCO Intangible Cultural Heritage",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China Printing Museum introduction",
          "url": "https://english.visitbeijing.com.cn/article/47OMvX0dE0F",
          "publisher": "Beijing Municipal Culture and Tourism Bureau",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: wooden movable types by Popolon, CC BY-SA 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Beijing_printing_museum.wooden_movable_types.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

