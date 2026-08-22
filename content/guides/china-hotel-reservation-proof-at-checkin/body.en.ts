import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "You are at the front desk, passport on the counter, confirmation on your phone — and the clerk says no reservation exists. Do not argue theory and do not rebook yet. Work the first fifteen minutes in order: verify this is the correct property and branch, re-check date and name spelling, ask which system they searched, then put the platform and its supplier network into play while the desk tries again. Most cases end in one of four ways: the order appears under another channel, the name was mismatched, the property confirms late through the platform, or the night genuinely failed and you secure alternative lodging first and recover money afterwards.",
    },
    {
      id: "first-heading",
      type: "heading",
      level: 2,
      text: "The first fifteen minutes, in order",
    },
    {
      id: "first-list",
      type: "list",
      ordered: true,
      items: [
        "Confirm you are at the correct property and branch. Chains, sister properties and same-name hostels sit blocks apart; the address pin in your booking app beats memory and taxi assumptions.",
        "Re-verify the arrival date against local time, including any date shift caused by overnight flights crossing time zones on the way in.",
        "Re-check the guest name exactly as booked: surname-first errors, missing middle names, and nickname spellings all defeat searches.",
        "Check the order status in your booking app: 'confirmed', 'processing', 'cancelled', or payment still pending each lead to different fixes.",
        "Show the order number first, then the confirmation email or voucher; ask the desk to search by order number AND by name AND by phone digits.",
        "Ask the desk to look beyond one screen: their own property management system, the platform's extranet/fax queue, and any central reservations office for chains.",
        "Contact the selling platform's in-app support from the lobby. Ask them to confirm whether the supplier issued the reservation to the property and to send written confirmation to both you and the hotel.",
      ],
    },
    {
      id: "cause-heading",
      type: "heading",
      level: 2,
      text: "Find which failure you actually have",
    },
    {
      id: "cause-table",
      type: "table",
      caption: "Eight causes of a missing reservation and where each one gets fixed",
      columns: ["Cause", "How it usually shows", "Who can fix it fastest"],
      rows: [
        ["Wrong property or branch", "Desk finds nothing; app map points elsewhere; a twin property answers the phone.", "You — travel to the correct address; the platform can re-check the geocoded address."],
        ["Name or document mismatch", "A near-match exists under a variant spelling, or the passport name order differs from the booking.", "Front desk plus platform; corrections may need the supplier to reissue the name."],
        ["Order not yet synced", "Platform shows confirmed; property has nothing. Common with low-cost prepaid rates routed via wholesalers.", "Platform chases the wholesaler; some rates reach the property only hours after booking."],
        ["Payment or guarantee failure", "Order shows unpaid, card authorization failed, or the guarantee card was declined.", "You plus your bank; the platform can retry or rebook once payment clears."],
        ["Hotel is oversold", "Reservation existed but no room remains at the agreed rate.", "Hotel duty manager leads relocation; platform applies pressure under its guarantee terms."],
        ["Order was cancelled upstream", "Status reads cancelled — sometimes triggered silently by a failed charge or an expired hold.", "Platform explains the cancellation reason; rebooking at current prices may be unavoidable."],
        ["Foreign-guest reception problem", "Room exists but staff say the system cannot register foreign passports.", "This is a registration-fit question owned by our foreign-passport guide, not a lost-order case."],
        ["Room-type mismatch", "Check-in works but the assigned room differs from the voucher.", "Owned by the room-mismatch guide; resolve at the door before unpacking."],
      ],
    },
    {
      id: "owner-heading",
      type: "heading",
      level: 2,
      text: "Who really owes you a fix",
    },
    {
      id: "owner-comparison",
      type: "comparison",
      title: "Five desks, five different powers",
      columns: [
        {
          heading: "Front desk",
          items: [
            "Controls tonight's keys and can see only systems connected to the property.",
            "Can search alternate channels, call their reservations team, and flag walk-in displacement.",
            "Cannot see wholesaler queues or force a platform to pay; be specific when asking what they checked.",
          ],
        },
        {
          heading: "Hotel reservations department",
          items: [
            "Holds group, corporate and delayed-sync bookings that the night-shift screen may miss.",
            "Ask the front desk to phone them directly while you wait; this resolves many sync gaps.",
          ],
        },
        {
          heading: "OTA platform",
          items: [
            "Owns your order record and the relationship with whichever supplier sold the rate.",
            "Under China's online-travel rules platforms must assist travellers actively, and advance compensation by platforms is encouraged in disputes.",
            "Some platforms publish explicit guarantees when a confirmed booking is cancelled by the supplier — read yours; it defines what to demand.",
          ],
        },
        {
          heading: "Wholesaler / bedbank",
          items: [
            "Invisible intermediary behind many prepaid rates; often the party that failed to deliver your rooming entry.",
            "You rarely contact it directly — the platform does. Ask the platform for the supplier's confirmation trail.",
          ],
        },
        {
          heading: "Your card issuer",
          items: [
            "Owns payment disputes: charges for services not received, double charges, or failed refunds.",
            "Relevant after lodging is secured; keep every receipt and chat log as input.",
          ],
        },
      ],
    },
    {
      id: "overbooking-heading",
      type: "heading",
      level: 2,
      text: "Oversold: relocation without fairy tales",
    },
    {
      id: "overbooking-p1",
      type: "paragraph",
      text: "When the hotel confirms your booking but has no room left at the agreed rate, you have crossed from 'missing order' into 'failed supply'. Ask the duty manager for relocation: a comparable or better room nearby tonight, transport there arranged or reimbursed, and any price difference covered — then ask for all three in writing, because who actually pays for replacement lodging, transport and differences depends on your contract chain and the property's handling, not on a published national standard. China regulates airline denied boarding with mandatory published procedures; hotels have no equivalent national floor, so everything above goodwill rests on the platform's guarantee and the hotel's own policy.",
    },
    {
      id: "overbooking-callout",
      type: "callout",
      title: "What to request, precisely",
      body: "Equivalent or better room within walking distance or a short ride; the ride paid; the difference refunded or absorbed; a written note of who approved it; and a new confirmation number. If the substitute requires prepayment, keep both receipts — the original charge and the new booking are separate claims until someone merges them.",
      tone: "decision",
    },
    {
      id: "night-heading",
      type: "heading",
      level: 2,
      text: "If it is late: safety first, paperwork second",
    },
    {
      id: "night-list",
      type: "list",
      ordered: true,
      items: [
        "Set a time limit: if the order is not found and no relocation is on the table after a reasonable window (for example thirty minutes of parallel calls), stop debating and book the nearest available room with good late-night access yourself.",
        "Choose safety over optimality: well-lit area, working lifts and locks, reachable by taxi or metro at that hour. Perfection can wait until morning.",
        "Keep every artifact: the failed-search screenshots with timestamps, chat logs with the platform, receipts for the replacement room, taxi fares, and any price difference.",
        "Do not accept cash refunds handed over informally at midnight without any record; a written or in-app acknowledgment protects both sides.",
        "Next morning, reopen the case calmly: cancel-or-honour the original order formally, claim documented extra costs, and escalate through the evidence-pack route if responses stall.",
      ],
    },
    {
      id: "answers-heading",
      type: "heading",
      level: 2,
      text: "Reading the desk: three standard answers and what they mean",
    },
    {
      id: "answers-comparison",
      type: "comparison",
      title: "The wording predicts the fix",
      columns: [
        {
          heading: "It is not in our system",
          items: [
            "Meaning: nothing arrived through any channel they can see - a sync or delivery failure upstream.",
            "Next move: platform chat in front of them; ask the platform to confirm delivery to this exact property name and to phone the property's own reservations office.",
            "Watch for: a near-match under a variant spelling on their screen; that converts the case into a name-correction fix.",
          ],
        },
        {
          heading: "Your rate came from a third party, we cannot see it",
          items: [
            "Meaning: the property expects your rooming entry from a wholesaler queue that has not delivered.",
            "Next move: ask the platform for the supplier's confirmation trail and a direct confirmation number; ask the desk to accept the voucher number as a temporary reference while it lands.",
            "Watch for: refusal to record anything at all - then insist on a written note of time, order number and presented documents before you leave the counter.",
          ],
        },
        {
          heading: "We are full tonight",
          items: [
            "Meaning: the order exists but inventory at your rate is gone - oversold, not lost.",
            "Next move: switch from finding the order to negotiating relocation: equivalent-or-better room nearby, transport covered, difference absorbed, all confirmed in writing by the duty manager.",
            "Watch for: being walked to a clearly worse property far away without consent - you may decline unreasonable relocation and claim against the original booking instead.",
          ],
        },
      ],
    },
    {
      id: "phrases-heading",
      type: "heading",
      level: 2,
      text: "Say it at the desk: copy-ready lines",
    },
    {
      id: "phrases-list",
      type: "list",
      items: [
        "English: \"I have a confirmed booking through Trip.com, order number shown here, guest name exactly as printed. Could you search by the order number first, then by my family name?\" — 中文：我通过携程有一个已确认的预订，订单号在这里，住客姓名与护照一致。请先按订单号查一下，再按我的姓查一次好吗？",
        "English: \"Which system did you check? Could you also call your reservations office and look at the Ctrip extranet queue for tonight's arrivals?\" — 中文：您刚才查的是哪个系统？可以再给预订部打个电话，并查看今晚到店的平台端队列吗？",
        "English: \"If the booking truly cannot be located, please note in writing that I presented a valid confirmation at [time]. I will then ask the platform to arrange equivalent lodging.\" — 中文：如果确实找不到订单，请书面记录我在某时间出示了有效确认。之后我会要求平台安排同等住宿。",
        "Korean readers: the Korean version of this page carries Korean–Chinese lines with the same functions for desk conversations.",
      ],
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "Four questions travellers actually ask at this moment",
    },
    {
      id: "faq-list",
      type: "list",
      items: [
        "Can the front desk just give me a key without registering me? No. Guest registration against valid identity documents is mandatory for every overnight guest in China - the notice boards at small properties state it plainly, one person one document. A desk offering to skip registration is creating risk for you, not solving your problem.",
        "The room exists but staff insist their system cannot take foreign passports. Then the failure is reception capability, not your order. Ask them to try manual entry of your passport details or call their reservations office; if refusal stands, switch properties and treat the original booking as a supplier-failure claim.",
        "Should I pay for a new room now or wait for the platform? Time-box it. Give parallel channels thirty to forty-five minutes. If neither produces an order nor a written relocation offer, pay for the fallback yourself while keeping every receipt - a confirmed bed tonight is worth more than a perfect case file tomorrow morning.",
        "Will the platform refund me automatically when the hotel cannot find me? Not automatically. Refunds follow the product terms you bought plus whatever guarantee your platform publishes for supplier failures. Open the chat, state the facts with timestamps, and ask which clause of your booking applies - vague complaints get vague answers.",
      ],
    },
    {
      id: "boundary-heading",
      type: "heading",
      level: 2,
      text: "What this page cannot promise",
    },
    {
      id: "boundary-list",
      type: "list",
      items: [
        "No rule forces a hotel to honour a booking it cannot find, and none guarantees a refund amount for a failed night — outcomes follow your contract chain and the platform's product-specific guarantee.",
        "Relocation standards (distance, quality, transport, difference) are negotiable facts of each incident, not statutory rights.",
        "Real-time availability cannot be promised by anyone reading this page; fallback rooms depend on live inventory.",
        "Never hand your passport, full card numbers or verification codes to anyone beyond the lawful registration process; nobody legitimate needs them to 'find an order'.",
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Keep the recovery moving",
      items: [
        { "label": "Foreign passports and China hotels", "href": "/guides/foreigners-china-hotel/", "description": "Separate reception-fit problems from lost-order problems at the desk." },
        { "label": "Build a booking-dispute evidence pack", "href": "/guides/china-booking-dispute-evidence-pack/", "description": "Turn tonight's timestamps and chats into a case file tomorrow." },
        { "label": "International chain or local hotel in China", "href": "/guides/international-chain-or-local-hotel-china/", "description": "Chain central-reservation behaviour differs from independent desks." },
        { "label": "How to pay in China as a tourist", "href": "/guides/how-to-pay-in-china-as-a-tourist/", "description": "Keep a working payment method ready for a fallback room." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Primary sources reviewed",
      items: [
        { "label": "Trip.com Terms and Conditions (availability-at-booking caveat; supplier terms separate; ID-mismatch exclusions)", "url": "https://www.trip.com/contents/service-guideline/terms.html", "publisher": "Trip.com", "reviewedAt": "2026-08-22" },
        { "label": "Booking Guarantee (if a confirmed booking is canceled by the supplier: full refund plus compensation worth not less than 20% of the booking total)", "url": "https://us.trip.com/pages/customer-service/", "publisher": "Trip.com", "reviewedAt": "2026-08-22" },
        { "label": "Interim Provisions on the Administration of Online Tourism Business Services (platform duty to assist travellers; advance compensation encouraged)", "url": "https://zwgk.mct.gov.cn/zfxxgkml/zcfg/bmgz/202012/t20201204_905349.html", "publisher": "Ministry of Culture and Tourism of the PRC", "reviewedAt": "2026-08-22" },
        { "label": "Provisions on Public Air Transport Passenger Services (carriers must publish denied-boarding/overbooking procedures — aviation contrast cited to show hotels have no equivalent national standard)", "url": "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html", "publisher": "Civil Aviation Administration of China", "reviewedAt": "2026-08-22" },
      ],
    },
  ],
};

export default body;
