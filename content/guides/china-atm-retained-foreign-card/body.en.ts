import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "A China ATM kept your card - stay calm and do not re-enter your PIN or try another transaction on that machine. Confirm the screen has returned to its start page, then record four things before you walk away: the bank name on the machine, the machine or terminal number, the exact location, and the time. Retention (吞卡) has standard procedures inside Chinese banks - typically retrieval in person at the machine's own outlet within about thirty days, with your passport as ID - but every step depends on which bank owns the machine, whether it sits inside a staffed branch, and how quickly you can reach your own issuer abroad.",
    },
    {
      id: "first-heading",
      type: "heading",
      level: 2,
      text: "The first ten minutes, in order",
    },
    {
      id: "first-list",
      type: "list",
      ordered: true,
      items: [
        "Confirm the session has truly ended: the screen should show its welcome or insert-card page. If options still show, press cancel once and wait for the reset.",
        "Do not re-insert or re-enter anything. A second PIN attempt on a confused machine deepens retention and muddies what happened.",
        "Photograph the machine straight-on: bank name and logo, any machine or terminal number label, and the surrounding address or shop sign.",
        "Find the ownership sticker (operating bank name and service number) and photograph it too - but verify any phone number independently before calling, because stickers over original notices are a known fraud trick.",
        "Note any on-screen retention message (for example 吞卡). Keep the printed receipt if one came out.",
        "Read the room: a 24-hour lobby attached to a staffed branch, a wall machine outside a branch, or a standalone unit in a mall each offer different help tonight.",
        "Protect the account first: if your banking app can lock or freeze the card instantly, do it on the spot. Freezing survives even if someone later extracts the card; unfreezing is instant once it is back in your hand.",
      ],
    },
    {
      id: "scenes-heading",
      type: "heading",
      level: 2,
      text: "Which scenario are you in?",
    },
    {
      id: "scenes-table",
      type: "table",
      caption: "Location decides who can help you tonight",
      columns: ["Scenario", "What it means", "Best next move"],
      rows: [
        ["Inside a staffed branch lobby", "Branch staff may access the machine's retention records and storage during opening hours.", "Go to the counter with your passport; ask them to check this machine's retained-card box now."],
        ["Wall machine outside a branch", "Same owner, but the retention box is usually opened only by authorized staff on schedule.", "Call the operating bank's verified hotline, note the owning outlet, return in business hours."],
        ["Standalone machine in a mall or airport", "Some bank owns it; venue staff cannot open anything.", "Identify the operating bank from logo and sticker, call its official line, ask for the owning outlet and procedure."],
        ["It is after hours", "Retention boxes open only on schedule; nobody retrieves cards at midnight.", "Freeze the card now; plan a branch visit at opening, or retrieve later if your itinerary allows."],
        ["Your app still controls the card", "You can lock, freeze and monitor in real time.", "Freeze immediately, watch for transactions, and unfreeze the moment the card is physically back."],
        ["You cannot reach your foreign issuer", "Time zones and queues happen.", "Try the number printed on the card, your issuer's app chat, or international access from your hotel; keep retrying after the local paperwork below."],
      ],
    },
    {
      id: "owner-heading",
      type: "heading",
      level: 2,
      text: "Who owes you what",
    },
    {
      id: "owner-comparison",
      type: "comparison",
      title: "Three parties, three different powers",
      columns: [
        {
          heading: "Chinese ATM-operating bank",
          items: [
            "Owns the machine and its retention box; sets the retrieval window, location, documents and hours.",
            "Published rules are concrete but bank-specific: ICBC instructs holders to bring valid ID to the machine's own outlet within thirty natural days from the day after retention, and to contact the other bank directly when their machine kept a card issued elsewhere; ABC's debit-card charter uses the same shape (thirty days from the retention date); CCB's security guide says to collect within the time designated by the machine's managing institution, warning that unclaimed cards are processed per regulations afterwards.",
            "Cannot touch your foreign account, cannot release frozen funds, and will not mail a card across borders on request.",
          ],
        },
        {
          heading: "Your foreign issuing bank",
          items: [
            "Owns your account: freezing, replacement, and disputes all live here.",
            "Card networks route everything through issuers - Visa directs cardholders to the number on the back of the card for questions and disputed charges.",
            "Ask for three things when you reach them: confirm the card is locked, start a replacement if retrieval looks unlikely, and get the correct procedure for a card physically held by a foreign ATM operator.",
          ],
        },
        {
          heading: "Card network (UnionPay / Visa / Mastercard)",
          items: [
            "UnionPay International operates 24-hour service hotlines whose stated services include handling situations where an ATM has taken a card - useful for locating the owning outlet of a UnionPay-logo machine.",
            "Networks do not hold your card and cannot open retention boxes; they coordinate information between banks.",
            "Treat network hotlines as routing help, not as a substitute for the two steps above.",
          ],
        },
      ],
    },
    {
      id: "why-heading",
      type: "heading",
      level: 2,
      text: "Why machines keep cards at all",
    },
    {
      id: "why-p1",
      type: "paragraph",
      text: "Retention is usually protection, not punishment. Common triggers include entering the wrong PIN repeatedly, walking away without completing the take-back cycle, a card left past the machine's timer after the cash arrived, faults mid-session, and holds triggered by risk systems. None of these means your account is compromised - most are the machine doing what its owner configured. The consequence is the same either way: the card now sits in a locked box only the operating bank's staff can open. Every retention is also logged in the machine's journal, which is exactly what makes the retrieval process above workable when you arrive with the time and card details in hand.",
    },
    {
      id:"fraud-heading",
      type: "heading",
      level: 2,
      text: "Fraud protection while the card sits in a machine",
    },
    {
      id: "fraud-list",
      type: "list",
      items: [
        "Nobody legitimate needs your PIN - not bank staff, not 'technicians', not helpful bystanders. Never speak it aloud or let anyone watch you use the keypad.",
        "Never share SMS verification codes with anyone who calls about the incident; banks never ask for them to 'retrieve a card'.",
        "Do not install any remote-control or 'security' app suggested by a caller; that is account-takeover tooling.",
        "Verify every phone number independently: use your issuer's official app or website, the number printed on the back of your physical card, or the operating bank's official site - not stickers taped near the keypad, which fraudsters replace.",
        "If a stranger offers to retrieve the card for you, decline. Only authorized bank staff can open retention storage.",
        "Keep photographs of the incident off social media until resolved; machine numbers and locations are useful to scammers watching for stranded travellers.",
      ],
    },
    {
      id: "backup-heading",
      type: "heading",
      level: 2,
      text: "Building today's payment fallback",
    },
    {
      id: "backup-list",
      "type": "list",
      "items": [
        "Carry a second card from a different network or account whenever you travel; today is why.",
        "Mobile payments you already set up and tested keep working even when the plastic is gone - check limits before relying on them.",
        "Keep a small amount of cash somewhere separate from the retained card's wallet pocket.",
        "Agree an emergency arrangement with travel companions before splitting up: who pays, and how you settle later.",
        "None of these fallbacks is instant if it needs setup - assume configuration takes hours, and start it before you actually need it.",
      ],
    },
    {
      id: "counter-heading",
      type: "heading",
      level: 3,
      text: "At the counter, in two languages",
    },
    {
      id: "counter-list",
      type: "list",
      items: [
        "English: 'This ATM kept my card yesterday evening at about [time]. Here are my passport, the card details, and photos of the machine and its number.' - 中文：[日期]晚上 [时间] 左右这台 ATM 吞了我的卡。这是我的护照、卡片信息和机器照片。",
        "English: 'Could you check the machine's retention records for that time window?' - 中文：请帮我查一下那个时间段这台机器的吞卡记录好吗？",
        "English: 'If it is here, may I retrieve it with my passport now? If not yet found, whom should I follow up with, and what is the reference number?' - 中文：如果在的话，我现在可以凭护照领走吗？如果还没找到，我该跟谁跟进、参考号是多少？",
        "Korean readers: the Korean version of this page carries Korean–Chinese lines with the same functions.",
      ],
    },
    {
      id: "retrieval-heading",
      type: "heading",
      level: 2,
      text: "Retrieval day: what actually happens at the outlet",
    },
    {
      id: "retrieval-list",
      type: "list",
      ordered: true,
      items: [
        "Go inside business hours to the outlet that owns the machine - the one named on its sticker or given by the hotline, not just any nearby branch.",
        "Bring your passport and the payment card details you have: last four digits, network logo, issuing bank name, and the exact date and time of the failed withdrawal.",
        "Staff will not have your foreign account on file. They identify the event from the machine's own journal instead, matching the time window and the physical card pulled from the retention box.",
        "Expect identity verification and a simple receipt or handover form; keep whatever they give you.",
        "If the journal shows nothing at first, ask for the acquisition or operations department to be contacted - reconciliations sometimes take a day or two, so get a reference number and a follow-up channel rather than walking away.",
        "Once the card is back in your hand, unfreeze it in front of the counter if you froze it, then confirm with your issuer that no transactions occurred while it was held.",
      ],
    },
    {
      id: "notfound-heading",
      type: "heading",
      level: 3,
      text: "If the outlet cannot find your card",
    },
    {
      id: "notfound-p1",
      type: "paragraph",
      text: "It happens: the journal shows no retention at that time, or the box is empty. Do not conclude the card vanished. Ask the staff to widen the search window by an hour either way, to check whether the machine belongs to a different sub-branch of the same bank, and to log your inquiry with a reference number you can quote later. Retained cards are sometimes moved during collection rounds, so give reconciliation a day or two before treating the card as lost. Meanwhile treat it as lost anyway with your issuer - cancel or replace, and rely on the fallbacks above. If the card later surfaces after all, having cancelled in advance costs you nothing more than a phone call to reactivate or shred it.",
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "Three questions travellers ask about retained cards",
    },
    {
      id: "faq-list",
      type: "list",
      items: [
        "Can a travel companion retrieve the card for me? Published rules describe the holder collecting in person with valid ID. Some banks accept authorised collection under extra conditions, but practice varies by institution - ask the operating bank directly rather than assuming either way.",
        "I fly out of China tomorrow. What then? Try the outlet at opening time; many retentions are resolved in minutes when the journal matches. If timing fails, tell your issuer the card is physically held abroad, ask whether to cancel immediately, and remember unclaimed cards are processed per each bank's regulations once the window closes.",
        "My machine showed no clear bank name. Now what? Work from the network logo on the machine and your card: a UnionPay-marked machine can be traced through UnionPay International's service hotlines, which list handling situations where an ATM has taken a card among their services. Visa and Mastercard holders should still start from their issuer, who sees the acquiring side of the withdrawal.",
      ],
    },
    {
      id: "boundary-heading",
      type: "heading",
      level: 2,
      text: "What nobody can promise",
    },
    {
      id: "boundary-list",
      type: "list",
      items: [
        "Same-day retrieval depends on branch staffing, machine location and your schedule - wall machines and standalone units often wait for the next business day.",
        "Return of the card is likely but not guaranteed; unclaimed cards are destroyed per each bank's regulations after its window closes.",
        "Procedures differ by bank and by machine owner; there is no nationwide uniform process, and rules quoted here were published by specific banks in specific documents.",
        "No one can promise a foreign-issued card follows the same domestic flow - expect extra verification steps and slower answers.",
        "This page never shows real card numbers, PINs or codes anywhere; nothing here helps circumvent a bank's security checks.",
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Related payment reading",
      items: [
        { "label": "ATM debited but gave no cash", "href": "/guides/china-atm-cash-not-dispensed/", "description": "A money failure at the machine, with its own dispute lanes." },
        { "label": "How to pay in China as a tourist", "href": "/guides/how-to-pay-in-china-as-a-tourist/", "description": "Build the multi-layer payment setup before you need fallbacks." },
        { "label": "Recover after losing a phone in China", "href": "/guides/lost-phone-in-china-digital-recovery/", "description": "When the device holding your banking apps disappears too." },
        { "label": "Choose a China eSIM or local SIM", "href": "/guides/china-esim-vs-local-sim/", "description": "Stay reachable for issuer hotlines while abroad." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Primary sources reviewed",
      items: [
        { "label": "如何办理自助机具吞卡业务 (retrieval within 30 natural days with valid ID at the machine's outlet; other-bank machines: contact that bank)", "url": "https://m.icbc.com.cn/icbc/%E7%83%AD%E7%82%B9%E7%AD%94%E7%96%91/%E4%B8%AA%E4%BA%BA%E9%87%91%E8%9E%8D/%E5%A6%82%E4%BD%95%E5%8A%9E%E7%90%86%E8%87%AA%E5%8A%A9%E6%9C%BA%E5%85%B7%E5%90%9E%E5%8D%A1%E4%B8%9A%E5%8A%A1.htm", "publisher": "Industrial and Commercial Bank of China", "reviewedAt": "2026-08-23" },
        { "label": "中国农业银行借记卡章程 ABC(2022)4001, Article 15 (30-day retrieval window)", "url": "https://www.abchina.com/cn/PersonalServices/zcxy221101/zhkh221101/202301/P020230111446368301264.pdf", "publisher": "Agricultural Bank of China", "reviewedAt": "2026-08-23" },
        { "label": "中国建设银行银行卡安全用卡常识 (retention handled per the device manager's designated time; unclaimed cards processed per regulations)", "url": "https://www.ccb.com/chn/2021-12/07/article_2021120711085428480.shtml", "publisher": "China Construction Bank", "reviewedAt": "2026-08-23" },
        {
          label: "UnionPay International 24H service hotline (services include managing situations where an ATM has taken a card)",
          url: "https://www.unionpayintl.com/en/serviceCenter/hotline/",
          publisher: "UnionPay International",
          reviewedAt: "2026-08-23",
        },
        {
          label: "Guide to Payment Services in China (foreigners may withdraw RMB at ATMs bearing card-network logos)",
          url: "https://www.mct.gov.cn/whzx/ggtz/202505/t20250520_960129.htm",
          publisher: "People's Bank of China via Ministry of Culture and Tourism",
          reviewedAt: "2026-08-23",
        },
        {
          label: "Visa Contact Us (questions and disputed charges route through your issuer; number on the back of the card)",
          url: "https://usa.visa.com/contact-us.html",
          publisher: "Visa",
          reviewedAt: "2026-08-23",
        },
      ],
    },
  ],
};

export default body;

