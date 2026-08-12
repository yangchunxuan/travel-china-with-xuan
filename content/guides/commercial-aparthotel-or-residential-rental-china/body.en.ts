import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "An apartment icon does not tell you who operates the property, who checks passports, whether there is a staffed desk or who helps when access fails. Compare the actual operating setup, not the platform category.",
    },
    {
      id: "answer",
      type: "callout",
      title: "The short decision",
      tone: "decision",
      body: "Prefer a commercial aparthotel when you need a staffed arrival, predictable guest registration, luggage help, invoices or support after a delayed arrival. Consider a residential rental when privacy and household space matter more and the host has clearly confirmed lawful operation, building access, foreign-guest registration, support and cancellation in writing.",
    },
    {
      id: "layers",
      type: "table",
      caption: "Keep three layers separate",
      columns: ["Layer", "What it can establish", "What it cannot"],
      rows: [
        [
          "Official rule",
          "Hotels register hotel guests; people staying outside hotels have a separate local registration duty",
          "That a particular listing will execute correctly",
        ],
        [
          "Platform display",
          "Room features, seller text and a booking record",
          "Legal status, registration capability or guaranteed access",
        ],
        [
          "Property execution",
          "Actual desk, keys, operator, registration and support",
          "A nationwide rule based on one stay",
        ],
      ],
    },
    {
      id: "verify",
      type: "callout",
      title: "Send one written verification message",
      tone: "warning",
      body: "Ask for the operating business name, exact staffed check-in location and hours, whether it will complete the required accommodation registration using your passport, how late arrival and key failure are handled, and which entity receives the deposit. Save the answer and listing. A platform label is evidence of what was advertised, not proof of legality.",
    },
    {
      id: "facts",
      type: "callout",
      title: "Policy facts checked August 12, 2026",
      tone: "neutral",
      body: "National Immigration Administration guidance distinguishes hotel accommodation—where the hotel registers foreign guests—from accommodation outside hotels, where the foreign guest or host must complete registration with the local public-security authority within 24 hours. A March 2026 online-registration pilot applies in specified regions, not automatically nationwide. Local procedures and property execution can differ; use official local channels.",
    },
    {
      id: "links",
      type: "internal-links",
      title: "Continue planning",
      items: [
        {
          label: "Serviced apartment or hotel?",
          href: "/guides/serviced-apartment-or-hotel-china/",
          description: "Compare service and contract fit for a longer stay.",
        },
        {
          label: "Shenzhen stay areas",
          href: "/guides/shenzhen-where-to-stay-futian-luohu-nanshan/",
          description: "Put the operating choice in the right district.",
        },
        {
          label: "Check everyday hotel access",
          href: "/guides/china-hotel-near-metro/",
          description:
            "Test the final walk after choosing the operating model.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources",
      items: [
        {
          label:
            "Official interpretation of foreigner accommodation registration and 2026 online pilot",
          url: "https://s.nia.gov.cn/mps/zcjd/202601/t20260750_1012.html",
          publisher: "National Immigration Administration",
          reviewedAt: "2026-08-12",
        },
        {
          label: "English government notice on the online registration service",
          url: "https://english.www.gov.cn/services/visitchina/202603/21/content_WS69ce124cc6d00ca5f9a0a368.html",
          publisher: "State Council of the PRC",
          reviewedAt: "2026-08-12",
        },
        {
          label: "National Enterprise Credit Information Publicity System",
          url: "https://www.gsxt.gov.cn/",
          publisher: "State Administration for Market Regulation",
          reviewedAt: "2026-08-12",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;
export default body;
