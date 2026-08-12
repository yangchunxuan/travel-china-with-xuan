import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "For mainland immigration purposes, Hong Kong and Macao are separate border jurisdictions. Leaving mainland China for either place is an exit from the mainland; returning is a new mainland entry. Whether that return is allowed depends on your passport, visa entries, visa-free policy and the exact route—not on how short the side trip is."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "Count crossings, not hotel nights",
      "columns": [
        "Situation",
        "Route",
        "Action"
      ],
      "rows": [
        [
          "Mainland → Hong Kong",
          "One mainland exit",
          "The current mainland stay ends at border inspection."
        ],
        [
          "Hong Kong → Mainland",
          "One new mainland entry",
          "You need valid permission for that entry."
        ],
        [
          "Mainland → Macao → Mainland",
          "Exit plus a new entry",
          "A same-day turn still crosses two immigration controls."
        ],
        [
          "Hong Kong → Macao",
          "No mainland entry",
          "Hong Kong and Macao apply their own admission rules."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "Draw your route before buying tickets"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "Write each jurisdiction in order: for example, Shanghai → Hong Kong → Shenzhen contains two separate mainland stays.",
        "A single-entry mainland visa is normally consumed when you first enter the mainland. If you then leave for Hong Kong or Macao, it does not become reusable merely because it remains within its printed validity dates.",
        "A double- or multiple-entry visa must still be valid on the return date and have an unused entry. Duration of each stay and visa validity are different fields.",
        "Visa-free and transit-without-visa schemes have their own nationality, port, onward-ticket and region rules. Do not treat them as spare entries without checking the live policy."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "A safer booking test"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "Mark every mainland entry and exit on one line.",
        "For each mainland arrival, write the legal basis: unused visa entry, applicable visa-free entry, or a specifically eligible transit policy.",
        "Check Hong Kong and Macao admission separately on their official immigration sites.",
        "Confirm that every carrier and border port accepts your documents and route; a ferry, train and land crossing can have different check-in steps.",
        "Keep onward tickets and hotel evidence available, but understand that documents support an application—they do not guarantee admission."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "If you discover the entry problem mid-trip",
      "body": "Do not travel to the border hoping a short visit will reset permission. Contact the National Immigration Administration service channel, the nearest mainland exit-entry authority and your airline or operator. Change the route while you remain lawfully admitted; if professional advice is needed, use a qualified immigration adviser or your embassy.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "Scope and live-rule boundary",
      "body": "This guide explains border counting, not individual eligibility. Nationality, ordinary visas, unilateral visa-free arrangements and transit-without-visa rules change. Recheck official rules for the exact passport, dates, ports and onward itinerary in the same week you travel.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "Continue planning",
      "items": [
        {
          "label": "China entry requirements",
          "href": "/guides/china-entry-requirements/",
          "description": "Check the entry basis for each mainland arrival."
        },
        {
          "label": "Shenzhen–Hong Kong transport",
          "href": "/guides/shenzhen-hong-kong-transport-route/",
          "description": "Choose a crossing after eligibility is clear."
        },
        {
          "label": "Hong Kong–Macao transport",
          "href": "/guides/hong-kong-macau-transport-route/",
          "description": "Plan the non-mainland leg separately."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official sources reviewed",
      "items": [
        {
          "label": "Exit and Entry Administration Law (bilingual PDF)",
          "url": "https://fgw.sh.gov.cn/cmsres/59/59f5d2526744beaaa10ec0316a16586/8ac6aae3143b2aea1d9a69bdd52edd3e.pdf",
          "publisher": "Shanghai Municipal Government / National law",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Chinese visa FAQ explaining Hong Kong and Macao entries",
          "url": "https://sk.china-embassy.gov.cn/slo/consularaffairs/VISA/202005/P020210712030405067319.pdf",
          "publisher": "Embassy of China in Slovakia",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Border inspection for travel between mainland and Hong Kong/Macao",
          "url": "https://en.nia.gov.cn/n147413/c177654/content.html",
          "publisher": "National Immigration Administration",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
