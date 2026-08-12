import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "If a China ATM gives no cash but your app shows a withdrawal, do not try again. Record the ATM bank, machine ID, location, exact time, amount, result, receipt and error. Call the ATM bank through a verified official number and obtain an incident reference. Then ask your card issuer whether the entry is pending or posted and open the correct cash-not-received dispute. Keep both case numbers; no alert or machine report guarantees the outcome.",
    },
    {
      id: "five-minute-heading",
      type: "heading",
      level: 2,
      text: "The first five minutes at the ATM",
    },
    {
      id: "five-minute-steps",
      type: "list",
      ordered: true,
      items: [
        "Let the transaction finish. Read the final screen, check the cash slot without force and wait briefly. Do not strike, open or tamper with the machine.",
        "Do not make the same withdrawal again. A second attempt can create another authorization or debit and make the evidence harder to separate.",
        "Keep the printed receipt even if it says declined. Photograph the ATM bank name, machine or terminal number, branch or venue, and the on-screen error when safe.",
        "Write down local date and time, requested amount and currency, actual cash received, card last four digits, and whether your app labels the item pending, processing or posted.",
        "Use the bank's official website, app or verified branch number to confirm the support number. A sticker placed over the machine's original notice can be fraudulent.",
        "Call the ATM-owning bank and ask it to log a no-cash or partial-cash incident. Request a case number and the exact next evidence or branch step before leaving.",
      ],
    },
    {
      id: "repeat-warning",
      type: "callout",
      title: "An alert is not always a final debit",
      body: "Describe exactly what the account shows: pending authorization, processing entry or posted withdrawal. Do not promise yourself an automatic reversal, but do not call a pending item a settled loss either. Preserve the first transaction and use another payment method while the issuer tells you whether and how to dispute it.",
      tone: "warning",
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "Build one evidence pack before details disappear",
    },
    {
      id: "evidence-table",
      type: "table",
      caption: "Fields that let both banks identify the same transaction",
      columns: ["Evidence field", "What to save", "Privacy control"],
      rows: [
        ["ATM identity", "Bank name, machine/terminal ID, branch or venue, street address and a wide location photo", "Do not photograph other customers or security procedures."],
        ["Transaction time", "Local date, exact time, time zone if known, and the order in which alerts appeared", "Keep the original screenshot metadata where possible."],
        ["Money result", "Amount and currency requested, amount actually received, and therefore the exact missing amount", "Count partial cash privately; do not display it publicly."],
        ["Card and account", "Card network, issuing bank, account screenshot and only the last four card digits in the working file", "Redact full card number, balance, CVV, PIN and one-time codes."],
        ["Machine output", "Receipt, error text, transaction or sequence reference and whether the machine reported completion", "Do not upload an unredacted receipt to social media."],
        ["Contact trail", "ATM bank case number, issuer case number, call time, agent/channel and requested follow-up", "Use official secure upload channels for documents."],
      ],
    },
    {
      id: "lanes-heading",
      type: "heading",
      level: 2,
      text: "Open two linked cases, not one vague complaint",
    },
    {
      id: "lanes-comparison",
      type: "comparison",
      title: "The machine side and account side have different owners",
      columns: [
        {
          heading: "ATM-owning bank",
          items: [
            "Owns the terminal, journal and physical cash reconciliation on the accepting side.",
            "Can log the machine incident and identify the exact ATM from its ID, location and time.",
            "May ask you to visit a branch or provide the receipt; get a reference number before ending contact.",
            "Do not assume it can directly credit a foreign-issued card or decide your issuer's dispute.",
          ],
        },
        {
          heading: "Your card issuer",
          items: [
            "Owns your cardholder account and can explain whether the entry is pending or posted.",
            "Takes the formal cardholder claim under the issuer and card-network process.",
            "Use the precise category: cash not received, partial cash, duplicate ATM debit or retained card.",
            "Ask for the filing deadline, secure evidence channel, case number and status method; these are issuer-specific.",
          ],
        },
        {
          heading: "Card network support",
          items: [
            "Can provide network support or emergency-service routing for eligible cards and markets.",
            "Visa and Mastercard both direct transaction disputes to the issuing financial institution.",
            "UnionPay's stated FAQ process also begins with the issuing bank for its described scenario.",
            "A network help line is not a substitute for getting the issuer to register the dispute.",
          ],
        },
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Name the failure accurately",
    },
    {
      id: "scenario-table",
      type: "table",
      caption: "The facts change the dispute and recovery path",
      columns: ["What happened", "How to report it", "Immediate recovery"],
      rows: [
        ["No cash; account item is pending", "Say no cash was received and the item is pending. Give the exact time and amount; ask the issuer how it handles the authorization.", "Log the ATM incident, preserve evidence and stop repeat attempts. Use another payment method."],
        ["No cash; withdrawal is posted", "Ask the issuer to open its formal cash-not-received dispute and give the ATM-bank case number.", "Submit documents only through the issuer's verified channel and track both references."],
        ["Only part of the cash arrived", "State requested, received and missing amounts separately. Visa and Mastercard materials recognise partial-cash problems.", "Count once in private, retain the notes and receipt, and dispute only the missing amount unless the issuer directs otherwise."],
        ["Card was retained as well", "Report a retained card to the ATM bank and tell the issuer the card is no longer in your possession.", "Follow the issuer's lock/replacement guidance; never accept a stranger's offer to retrieve it."],
        ["A second attempt created another debit", "List each time, amount and reference separately; do not merge them into one number.", "Stop further attempts and ask the issuer whether the entries are duplicate, separate pending authorizations or posted withdrawals."],
        ["The withdrawal was not yours", "Report an unauthorized transaction, not cash-not-received, and follow the issuer's fraud controls immediately.", "Secure the card/account and preserve the separate evidence; do not mix it with an authorized failed withdrawal."],
      ],
    },
    {
      id: "waiting-heading",
      type: "heading",
      level: 2,
      text: "Use a cash fallback without multiplying the dispute",
    },
    {
      id: "waiting-list",
      type: "list",
      items: [
        "Use a mobile-payment method that was already set up and tested; do not configure a sensitive account over an unknown network during the incident.",
        "Use another physical card for a necessary small payment. If cash is essential, record the failure before choosing a staffed bank or clearly supported different ATM.",
        "Exchange foreign cash at a commercial-bank outlet, qualified exchange counter or self-service machine displaying the official Exchange sign; accepted currencies and hours vary.",
        "Ask a trusted travel companion to pay and record the amount between you. Do not ask strangers to receive transfers or expose account information in a public post.",
        "Keep enough funds available for transport, food and accommodation while the disputed amount is unavailable. A dispute case is not spendable money.",
      ],
    },
    {
      id: "privacy-warning",
      type: "callout",
      title: "Share evidence, not credentials",
      body: "Bank staff may need to verify identity through an official process, but nobody needs your PIN, CVV or one-time code to photograph an ATM failure. Keep the full card number and unredacted statement out of email, chat groups and social media. Verify every phone number and upload link independently, and preserve original files in private storage.",
      tone: "warning",
    },
    {
      id: "final-heading",
      type: "heading",
      level: 2,
      text: "Track the case until the account record is complete",
    },
    {
      id: "final-steps",
      type: "list",
      ordered: true,
      items: [
        "Confirm that the ATM bank recorded the correct terminal, time, requested amount and zero or partial cash result.",
        "Confirm that the issuer recorded the correct category and whether the item is pending or posted. Ask what event would require a new filing.",
        "Submit only the documents requested, using the secure channel, and save proof of submission plus both case numbers.",
        "Check account history for reversal, posting, duplicate entries, fees or a request for more information. Do not infer closure from a notification disappearing.",
        "If either institution closes the case, request a durable result and reason. If you disagree, use its official complaint or review route.",
        "Retain the pack until the balance, statement and case status all agree. A complaint-response deadline is not the same as a cross-border cash-return deadline.",
      ],
    },
    {
      id: "scope-boundary",
      type: "callout",
      title: "Financial and timing boundary",
      body: "Official materials were reviewed on 13 August 2026. This guide does not decide liability or promise reversal, provisional credit, refund amount or completion date. Pending or posted status, partial cash, issuer, network, product, ATM records, country of issue and law can change the route. Complaint rules do not guarantee a return date. Follow the issuer's live deadline and evidence instructions.",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Keep the rest of the payment plan working",
      items: [
        { "label": "China travel essentials", "href": "/essentials/", "description": "Return to the practical collection for payment, connectivity and recovery planning." },
        { "label": "How to pay in China as a tourist", "href": "/guides/how-to-pay-in-china-as-a-tourist/", "description": "Build a mobile, card and cash setup with more than one fallback." },
        { "label": "Choose a China eSIM or local SIM", "href": "/guides/china-esim-vs-local-sim/", "description": "Keep a working connection available for verified bank calls and secure evidence uploads." },
        { "label": "Recover after losing a phone in China", "href": "/guides/lost-phone-in-china-digital-recovery/", "description": "Secure payment access and account recovery if the device is also lost." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official banking, network and government sources reviewed",
      items: [
        { "label": "Card-use Frequently Asked Questions", "url": "https://www.unionpayintl.com/cn/serviceCenter/questionAnswer/", "publisher": "UnionPay International", "reviewedAt": "2026-08-13" },
        { "label": "ICBC Credit Card Use Guide", "url": "https://big5.icbc.com.cn/page/721854095303671836.html", "publisher": "Industrial and Commercial Bank of China", "reviewedAt": "2026-08-13" },
        { "label": "Bank of China Credit Card Use Guide", "url": "https://www.boc.cn/bcservice/bc3/bc31/201106/t20110607_1414163.html", "publisher": "Bank of China", "reviewedAt": "2026-08-13" },
        { "label": "Visa Consumer Support", "url": "https://usa.visa.com/support.html", "publisher": "Visa", "reviewedAt": "2026-08-13" },
        { "label": "Dispute Management Guidelines for Visa Merchants", "url": "https://by.visa.com/dam/VCOM/global/support-legal/documents/merchants-dispute-management-guidelines.pdf", "publisher": "Visa", "reviewedAt": "2026-08-13" },
        { "label": "Chargeback Guide Merchant Edition, 19 May 2026", "url": "https://www.mastercard.com/content/dam/mccom/shared/business/support/rules-pdfs/chargeback-guide.pdf", "publisher": "Mastercard", "reviewedAt": "2026-08-13" },
        { "label": "Mastercard Frequently Asked Questions", "url": "https://www.mastercard.com/us/en/personal/get-support/frequently-asked-questions.html", "publisher": "Mastercard", "reviewedAt": "2026-08-13" },
        { "label": "Guide to Payment Services in China", "url": "https://www.mct.gov.cn/whzx/ggtz/202505/t20250520_960129.htm", "publisher": "People's Bank of China via Ministry of Culture and Tourism", "reviewedAt": "2026-08-13" },
        { "label": "Guide to Working and Living in China as Business Expatriates 2025", "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025", "publisher": "State Council of the PRC", "reviewedAt": "2026-08-13" },
      ],
    },
  ],
};

export default body;
