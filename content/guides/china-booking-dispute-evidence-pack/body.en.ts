import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "Before you argue, freeze the record. Save the order state, listing, checkout terms, payment reference, communications and delivery, each with date, time and time zone. Keep one untouched master and make redacted copies for the booking company and payment provider. Then use two accountable channels: seller/platform/supplier for performance, and payment institution or card issuer for the money trail. A neat evidence pack aids investigation; it does not prove liability or guarantee a refund.",
    },
    {
      id: "first-ten-minutes",
      type: "heading",
      level: 2,
      text: "Freeze the disappearing evidence first",
    },
    {
      id: "freeze-steps",
      type: "list",
      ordered: true,
      items: [
        "Stop retrying payment, cancellation or rebooking until you know whether the first action is pending, complete or failed. A second attempt can create another booking or charge.",
        "Capture the full order page: URL or app route, seller and supplier names, order status, product, date, traveller count, amount, currency and the device time. Use a screen recording if a status changes across pages.",
        "Save the product listing and the refund, change, no-show and delivery terms visible when you bought. Export or print the page rather than keeping only a cropped screenshot.",
        "Download the confirmation email, invoice, voucher and receipt. Save the payment transaction reference and only the last four card digits in the working copy.",
        "Record what happened: who could not find the booking, when, what service was offered or refused, and any reasonable replacement you bought.",
      ],
    },
    {
      id: "master-warning",
      type: "callout",
      title: "One master, separate submission copies",
      body:
        "Keep original files unchanged, with complete timestamps and context. Duplicate them into working folders for each case, then cover fields that the recipient does not need. Never overwrite the master with an annotated or compressed version. A public social post is not a case folder and should never contain travel-document, payment, contact, QR-code or precise location data.",
      tone: "warning",
    },
    {
      id: "fields-heading",
      type: "heading",
      level: 2,
      text: "Build one evidence index an investigator can follow",
    },
    {
      id: "evidence-fields",
      type: "table",
      caption: "Evidence-pack fields and the fact each one establishes",
      columns: ["Field", "Record", "Purpose"],
      rows: [
        ["Parties", "Platform, storefront, operating seller, named supplier and service venue", "Shows who sold, processed or was meant to deliver"],
        ["Order", "Order ID, supplier confirmation or voucher reference, product, date, time, people and status", "Separates a request from a confirmed service"],
        ["Identity", "Traveller name and document type exactly as submitted; full number only in a necessary private copy", "Tests whether a real-name mismatch caused failure"],
        ["Price", "Currency, total, taxes, fees, add-ons, coupon and quoted refund amount", "Prevents a dispute about different totals"],
        ["Payment", "Channel, merchant descriptor, transaction reference, card last four, authorised/pending/posted/refunded state", "Connects the order to the money movement"],
        ["Terms", "Listing, checkout and supplier cancellation/refund/change terms with capture time", "Preserves the rule version presented at purchase"],
        ["Communications", "Date, time zone, channel, case ID, team and factual summary", "Creates a contact history"],
        ["Delivery", "What was promised, what was provided, refusal/cancellation details and venue confirmation", "Defines the performance gap without speculation"],
        ["Mitigation", "Replacement booking, transport or other reasonable expense with receipt", "Shows what you did after the failure"],
        ["Request", "One precise requested outcome and amount, plus the calculation", "Gives the recipient an answerable question"],
      ],
    },
    {
      id: "timeline-heading",
      type: "heading",
      level: 2,
      text: "Turn screenshots into a short factual timeline",
    },
    {
      id: "timeline-copy",
      type: "paragraph",
      text:
        "Use one line per event: local date and time plus time zone; actor; action or exact status; what changed; and the supporting filename. For example: ‘13 Aug, 09:14 CST — venue desk searched supplier reference ABC — no reservation located — IMG_04 and desk note.’ Separate what the screen showed from what someone said. If you translate a message, keep the original beside the translation. Do not edit an old row when a status changes; add a new row.",
    },
    {
      id: "status-table",
      type: "table",
      caption: "Do not collapse different booking and payment states",
      columns: ["State shown", "What it can mean", "Next proof"],
      rows: [
        ["Submitted / processing", "A request exists but inventory or supplier confirmation may still be pending", "Final confirmation and supplier reference"],
        ["Paid / authorised", "Money was authorised or posted; service may still be unconfirmed", "Order-to-transaction match and booking status"],
        ["Confirmed", "The seller says the service is booked", "Supplier or venue-verifiable record and correct identity"],
        ["Cancelled", "The service is no longer active", "Who cancelled, when, under which term and the refund state"],
        ["Refund requested", "A request entered a workflow", "Case ID, requested amount and written acceptance/rejection"],
        ["Refund processed", "The seller/payment side says it sent funds", "Refund reference and posting to the original method"],
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Two common disputes need different proof",
    },
    {
      id: "scenario-comparison",
      type: "comparison",
      title: "Diagnose before choosing the claim",
      columns: [
        {
          heading: "Card charged, supplier cannot find booking",
          items: [
            "Show the order, payment and supplier reference in one row.",
            "Ask the platform which supplier owns fulfilment and whether the order is actually confirmed.",
            "Ask the venue only to verify whether its system contains the reference; do not demand it resolve a reseller payment.",
            "If time-critical, document a reasonable replacement.",
          ],
        },
        {
          heading: "Seller says refunded, account shows no credit",
          items: [
            "Save the cancellation, approved amount, refund date and refund reference.",
            "Check whether the original transaction and refund are pending or posted.",
            "Give the payment provider the merchant and refund reference, not just a seller screenshot.",
            "Do not promise an arrival date; posting depends on the route and account provider.",
          ],
        },
      ],
    },
    {
      id: "two-channels",
      type: "callout",
      title: "Two channels means two commercial functions",
      body:
        "Channel A resolves booking performance: seller or supplier, then the platform case system; the venue verifies delivery where appropriate. Channel B traces payment through the wallet/payment institution or card issuer. Update both if a merchant refund arrives. Do not copy one complaint to several regulators at once.",
      tone: "decision",
    },
    {
      id: "escalation-heading",
      type: "heading",
      level: 2,
      text: "Escalate in a controlled sequence",
    },
    {
      id: "escalation-steps",
      type: "list",
      ordered: true,
      items: [
        "Open a written case with the seller or platform. State the order, one-sentence failure, desired outcome, amount and attached evidence index. Ask for a case number and written final position.",
        "Contact the named supplier if the platform identifies one. Ask whether it accepted the order, issued inventory and can verify the reference. Do not expose more identity data than the official channel requires.",
        "For Alipay, use its transaction/help route; for an overseas card, contact the issuer. Describe an authorised service dispute accurately unless the transaction was genuinely unauthorised.",
        "If commercial routes fail, choose the public channel matching the respondent and issue. A seller/platform complaint may fit 12315; a covered Chinese bank or payment-institution complaint follows its complaint route and, where applicable, the competent PBOC branch.",
        "Report any later refund, correction, replacement or settlement to every active case and adjust overlapping requests.",
      ],
    },
    {
      id: "regulatory-boundary",
      type: "callout",
      title: "Regulatory intake is not an instant refund mechanism",
      body:
        "Current SAMR rules require a real complainant, identifiable respondent, specific request and factual basis. PBOC consumer-protection rules similarly require identity, contact details, a clear institution, request and reasons. Both have jurisdiction and prior-proceeding limits. Intake, transfer or mediation periods are procedural—not promised payment dates or a contract decision.",
      tone: "neutral",
    },
    {
      id: "privacy-heading",
      type: "heading",
      level: 2,
      text: "Redact for the recipient, especially before sharing",
    },
    {
      id: "privacy-list",
      type: "list",
      items: [
        "Never share a PIN, CVV, password, one-time code, wallet recovery phrase or full card image—even with someone claiming to process a refund.",
        "Cover full passport and card numbers, birth date, address, phone, email, QR/barcode, precise itinerary and unrelated companion data in ordinary case copies.",
        "Send full identity fields only through the organisation’s official private channel when needed for matching or verification.",
        "Do not post unredacted chats or name individual support staff publicly. Public pressure can expose innocent people and does not replace the formal record.",
        "Number files and store the master in a protected account or encrypted location, not an open link.",
      ],
    },
    {
      id: "failure-recovery-heading",
      type: "heading",
      level: 2,
      text: "If the case stalls or a deadline is close",
    },
    {
      id: "failure-recovery",
      type: "table",
      caption: "Recovery without making the loss larger",
      columns: ["Problem", "Do now", "Do not do"],
      rows: [
        ["No written response", "Reply in the same case, ask for status and final position, and preserve the silence with timestamps", "Open many duplicate cases that fragment the evidence"],
        ["Travel date is imminent", "Ask for a documented fulfilment decision; price a reasonable backup and save its terms", "Keep repurchasing the same uncertain inventory"],
        ["Platform and supplier blame each other", "Put both names, references and conflicting statements in one timeline and ask each to correct a specific fact", "Guess which party is legally liable"],
        ["Issuer asks for more detail", "Supply the indexed contract, delivery failure, merchant contacts and amounts requested", "Call an authorised service dispute ‘fraud’ for leverage"],
        ["Merchant refund appears during dispute", "Notify the issuer/payment provider and reconcile amounts immediately", "Keep both recoveries without disclosure"],
      ],
    },
    {
      id: "final-heading",
      type: "heading",
      level: 2,
      text: "Final verification before you press submit",
    },
    {
      id: "final-check",
      type: "list",
      items: [
        "Respondent, order, payment and supplier references identify one transaction.",
        "The request states one outcome and an exact amount with a transparent calculation.",
        "Every material assertion points to a dated file or timeline row.",
        "The claim category matches the facts and the institution’s definitions.",
        "The working copy omits unnecessary sensitive information; the master remains unchanged.",
        "You recorded every case number and will report any later refund, replacement or resolution to the other channel.",
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Prepare the surrounding booking and payment setup",
      items: [
        {
          label: "China travel essentials",
          href: "/essentials/",
          description: "Return to the practical entry, payment and connectivity collection.",
        },
        {
          label: "Set up payments for China",
          href: "/guides/how-to-pay-in-china-as-a-tourist/",
          description: "Keep payment setup separate from an individual dispute workflow.",
        },
        {
          label: "Keep passport names consistent across bookings",
          href: "/guides/passport-name-across-china-bookings/",
          description: "Prevent a real-name mismatch from becoming a fulfilment dispute.",
        },
        {
          label: "Recover after losing a phone",
          href: "/guides/lost-phone-in-china-digital-recovery/",
          description: "Restore access to booking and payment evidence without exposing accounts.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official and primary sources reviewed",
      items: [
        {
          label: "Measures for Handling Market-Regulation Complaints and Reports",
          url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2026/art_e4d03a20c0fd49769e408c7bf3791ff5.html",
          publisher: "State Administration for Market Regulation",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Measures for the Supervision and Administration of Online Transactions",
          url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2025/art_4b47c79b8d994a42bba4835997688faa.html",
          publisher: "State Administration for Market Regulation",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Implementation Measures for the Protection of Financial Consumer Rights",
          url: "https://www.pbc.gov.cn/zhengwugongkai/attachDir/2025/11/2025111914422147275.pdf",
          publisher: "People’s Bank of China",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Regulations on Supervision and Administration of Non-bank Payment Institutions",
          url: "https://www.pbc.gov.cn/tiaofasi/144941/144953/5174993/index.html",
          publisher: "State Council / People’s Bank of China",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Personal Information Protection Law",
          url: "https://www.cac.gov.cn/2021-08/20/c_1631050028355286.htm",
          publisher: "Cyberspace Administration of China",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Official Alipay service centre",
          url: "https://help.alipay.com/hall/index.htm?src=yy_ss_06",
          publisher: "Alipay",
          reviewedAt: "2026-08-13",
        },
      ],
    },
  ],
};

export default body;
