import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "No single passport-validity and blank-page rule covers every China trip. Identify whether you will apply for a visa, use a current visa-free policy, use 240-hour visa-free transit or present an existing visa. Check that route's authority, the operating airline and every transit country. If the passport is damaged, near expiry or short of required pages, renewal before non-refundable travel is the lower-risk choice.",
    },
    {
      id: "practical-decision",
      type: "callout",
      title: "Do not use “six months and two pages” as a universal answer",
      body: "Many Chinese visa offices publish a six-month and two-blank-page application baseline, but local instructions and requested visa validity can demand more. China's unilateral visa-free FAQ instead says an eligible ordinary passport must cover the intended stay. The 240-hour transit notice uses a separate three-month threshold. These are different routes, not conflicting versions of one rule.",
      tone: "decision",
    },
    {
      id: "route-heading",
      type: "heading",
      level: 2,
      text: "Choose the travel route before counting months",
    },
    {
      id: "route-table",
      type: "table",
      caption: "The first authority and threshold depend on how you enter",
      columns: ["Your route", "What the reviewed official source says", "What to verify now"],
      rows: [
        ["Applying for a Chinese visa", "The Toronto visa centre asks for at least six months from application and two blank visa pages; other jurisdictions differ.", "Use the embassy or designated centre where you may legally apply, plus your exact visa-category page."],
        ["Eligible unilateral visa-free visit", "The Foreign Ministry FAQ says an ordinary passport must be valid for at least the intended stay.", "Recheck nationality, ordinary-passport status, purpose, maximum stay and policy end date. Do not assume an emergency travel document qualifies."],
        ["Eligible 240-hour visa-free transit", "The NIA notice requires an international travel document valid for at least three months, third-country eligibility and confirmed onward travel within 240 hours.", "Confirm nationality, entry port, permitted area, third-country routing and onward evidence on the live NIA page."],
        ["Entering with an existing visa", "The passport and visa must be valid, have an unused entry when required, and survive border examination.", "Read the visa's Enter Before date, entries, duration of stay, passport number and remarks; ask the issuing authority about any renewed passport."],
        ["International or codeshare flight", "The carrier checks travel documents and may refuse carriage when they appear incomplete or not in order.", "Ask the operating carrier, not only the seller, and check every transit country and transfer."],
      ],
    },
    {
      id: "inspection-heading",
      type: "heading",
      level: 2,
      text: "Run a physical and date audit",
    },
    {
      id: "inspection-list",
      type: "list",
      ordered: true,
      items: [
        "Copy the expiry date exactly. Compare it separately with the visa-application date, outbound flight, each transit, China arrival and planned departure; do not calculate from only one of those dates.",
        "Identify the document type. A policy for an ordinary passport may not cover a refugee document, laissez-passer, temporary passport or emergency travel document.",
        "Count pages that the responsible visa office describes as blank visa pages. Do not count observation, amendment or partly stamped pages unless that office confirms they qualify.",
        "Inspect the bio page, laminate, binding and every page for tears, water damage, stains, missing pages or separation. A readable number alone does not settle whether a damaged passport is accepted.",
        "Compare the passport name, date of birth, nationality and number with the visa and all bookings. If a new passport changed any identity detail, do not assume an old visa can travel with it.",
        "Check how long the requested visa would remain valid. A multiple-entry or long-duration request can require passport validity beyond a local six-month baseline.",
        "Check the passport rules of every country or region where you will enter or pass immigration, including an overnight or self-transfer connection.",
      ],
    },
    {
      id: "blank-page-boundary",
      type: "callout",
      title: "Blank-page requirements are visibly local",
      body: "The Toronto service-centre page asks for two blank visa pages; the Chinese Embassy in Azerbaijan publishes four for its applicants. Open your own office's current page rather than choosing the smaller number. A visa-free traveller should not import a blank-page rule from a visa checklist, but should resolve a nearly full passport before travel.",
      tone: "warning",
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Three common borderline cases",
    },
    {
      id: "scenario-comparison",
      type: "comparison",
      title: "The same expiry date can produce a different answer",
      columns: [
        {
          heading: "Five months left, visa-free visit",
          items: [
            "The current unilateral visa-free FAQ may cover an eligible traveller whose passport lasts through the intended stay.",
            "That does not bind the airline or a transit country. Check the operating carrier before treating the trip as cleared.",
            "If eligibility, purpose or policy dates do not fit, switch to the applicable visa route and its passport requirements.",
          ],
        },
        {
          heading: "Eight months left, long-validity visa request",
          items: [
            "Eight months can exceed a basic six-month application threshold yet still be too short for the validity and stay requested.",
            "The Norway embassy page expressly tells multiple-entry applicants to cover visa validity plus the stay period.",
            "Ask the local office whether to request a shorter visa or renew the passport first; consular officers decide what is issued.",
          ],
        },
        {
          heading: "Valid dates, damaged document",
          items: [
            "A torn, water-damaged, separating or incomplete passport creates a document-integrity question that date arithmetic cannot solve.",
            "Stop relying on photographs of the document and ask the issuing passport authority about renewal or emergency replacement.",
            "Also confirm with the relevant Chinese visa office and carrier before travel; no website checklist guarantees acceptance of the individual document.",
          ],
        },
      ],
    },
    {
      id: "confirmation-heading",
      type: "heading",
      level: 2,
      text: "Use the authority that owns each decision",
    },
    {
      id: "confirmation-steps",
      type: "list",
      ordered: true,
      items: [
        "Start at the Chinese Foreign Ministry's Visa for China portal. Determine whether the trip uses a visa, a current visa-free policy or NIA transit rules.",
        "For a visa application, open the website of the Chinese embassy or consulate with jurisdiction and follow the visa centre it designates. Record the page title, URL and access date.",
        "Send a precise question: nationality, passport type, expiry date, number and condition of blank pages, application country, visa category, requested entries, arrival and departure dates. Ask for a written answer where available.",
        "For China border or transit-policy interpretation, use the live NIA material or China Immigration Service Hotline 12367. A visa centre does not own an airline's boarding decision.",
        "Give the same itinerary to the operating airline, including codeshares and self-transfers. Ask whether its document check or the transit point needs a longer validity buffer.",
        "Save the answers with the booking. Recheck close to departure because nationality lists, policy dates, carrier practices and visa-centre instructions can change.",
      ],
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "When the answer is unclear or changes",
    },
    {
      id: "failure-table",
      type: "table",
      caption: "Recovery routes for an unresolved passport check",
      columns: ["Problem", "Do next", "Do not assume"],
      rows: [
        ["Embassy and visa-centre pages differ", "Use the newest instruction for the office that will accept the application and ask that office to resolve the conflict.", "A requirement from another country overrides local jurisdiction."],
        ["Airline advice differs from entry-policy wording", "Ask the operating carrier to confirm its boarding standard in writing; consider renewal if the buffer is tight.", "A border FAQ forces an airline to carry you."],
        ["Passport was renewed after the visa was issued", "Ask the visa-issuing authority whether both passports can be used or a transfer/new visa is needed.", "An old valid visa automatically follows every new passport."],
        ["Passport damage is discovered near departure", "Contact the passport-issuing authority immediately, then recheck visa and carrier consequences before changing bookings.", "A clear photograph or intact chip makes the document acceptable."],
        ["No authoritative answer arrives", "Renew early when practical, or delay irreversible bookings until the responsible office confirms the route.", "A travel forum, agent or airport anecdote transfers the risk."],
      ],
    },
    {
      id: "final-heading",
      type: "heading",
      level: 2,
      text: "Final check before applying and again before flying",
    },
    {
      id: "final-list",
      type: "list",
      items: [
        "The chosen entry route is still live for your nationality, passport type, purpose and dates.",
        "Passport validity clears the correct calculation point for that route, the operating carrier and all transit stops.",
        "The responsible application office confirms enough qualifying blank pages for the requested visa.",
        "The passport is physically sound and its identity data match the visa and bookings.",
        "The visa, if used, has the correct passport number, an available entry, a usable Enter Before date and a sufficient stay period.",
        "Screenshots or written confirmations show the source URL and 2026-08-13-or-later review date; any later change has been checked.",
      ],
    },
    {
      id: "scope-boundary",
      type: "callout",
      title: "Live-rule and decision boundary",
      body: "Official sources were reviewed on 13 August 2026. Visa policies, nationalities, service-centre instructions, carrier checks and transit rules can change. A visa does not guarantee entry: consular authorities decide issuance, carriers decide transport under their rules, and Chinese border inspection decides admission under law. This guide cannot decide an individual application, boarding or entry case.",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue the entry and document plan",
      items: [
        { "label": "China travel essentials", "href": "/essentials/", "description": "Return to the parent collection for practical entry and payment preparation." },
        { "label": "Recover from a lost passport in China", "href": "/guides/lost-passport-in-china-exit-recovery/", "description": "Keep the official replacement and lawful-exit sequence available as a failure fallback." },
        { "label": "Check a 240-hour visa-free transit route", "href": "/guides/china-240-hour-visa-free-transit-route-check/", "description": "Validate the itinerary, port and permitted area for the transit path." },
        { "label": "Keep passport names consistent across bookings", "href": "/guides/passport-name-across-china-bookings/", "description": "Prevent identity mismatches after choosing which passport will be used." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        { "label": "FAQs on Visa-free Entry into China", "url": "https://cs.mfa.gov.cn/gyls/lsgz/fwxx/202511/t20251110_11749824.shtml", "publisher": "Ministry of Foreign Affairs", "reviewedAt": "2026-08-13" },
        { "label": "Conditions for 240-Hour Visa-Free Transit", "url": "https://en.nia.gov.cn/n147418/n147468/c187308/content.html", "publisher": "National Immigration Administration", "reviewedAt": "2026-08-13" },
        { "label": "Exit and Entry Administration Law of the PRC", "url": "https://en.nia.gov.cn/n147418/n147458/c155978/content.html", "publisher": "National Immigration Administration", "reviewedAt": "2026-08-13" },
        { "label": "Visa category and passport documents for Toronto applicants", "url": "https://www.visaforchina.cn/YTO3_EN/qianzhengyewu/jichuzhishi/banliliucheng/257421912265855019.html", "publisher": "Chinese Visa Application Service Center", "reviewedAt": "2026-08-13" },
        { "label": "Visa Categories and Documents Required, updated May 2026", "url": "https://no.china-embassy.gov.cn/eng/lsfw_0/qzyw/202309/t20230905_11138640.htm", "publisher": "Embassy of China in Norway", "reviewedAt": "2026-08-13" },
        { "label": "Guidelines for Visa Applications", "url": "https://az.china-embassy.gov.cn/eng/lsfw/qzyw/bzxz/", "publisher": "Embassy of China in Azerbaijan", "reviewedAt": "2026-08-13" },
        { "label": "Administrative Formalities for International Carriage", "url": "https://m.airchina.com/c/invoke/ystjnextpage/abroadbackpack14%40pg", "publisher": "Air China", "reviewedAt": "2026-08-13" },
      ],
    },
  ],
};

export default body;
