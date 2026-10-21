import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "answer-first", type: "lead", text: "Yes, foreigners can stay in ordinary hotels in China; you do not need a hotel with a special \"foreign guest licence\". National measures since 2024 say hotels should not be blocked from receiving overseas guests by qualification requirements, and a hotel should not turn you away only because it claims to lack one. At check-in, every foreign guest, children included, shows an original passport, and the hotel registers your stay with the police for you. What still goes wrong is the property itself: a front desk that has never registered a foreign passport, a self-check-in apartment with only a door code, or a late arrival with nobody at reception."},
    {
      id: "three-layers",
      type: "comparison",
      title: "Keep three records separate",
      columns: [
        {
          heading: "Official rule",
          body: "The hotel checks the document, registers the guest and submits hotel-stay information. The rule does not create a special licence for travellers to find.",
          items: ["Use official policy for a qualification-based refusal.", "Do not use it to prove room availability."],
        },
        {
          heading: "Platform record",
          body: "The listing, guest-policy label, payment, confirmation and chat record show what was sold. They are transaction evidence, not law.",
          items: ["Save the exact branch and terms.", "A label may be stale or wrong."],
        },
        {
          heading: "Front-desk execution",
          body: "The staff on duty must find the booking, check the document and use the registration process. Training or system uncertainty can still cause failure.",
          items: ["Confirm staffed arrival in writing.", "Escalate calmly when execution fails."],
        },
      ],
    },
    {
      id: "answer-boundaries",
      type: "table",
      caption: "The reason changes the solution",
      columns: ["What blocks check-in", "What it means", "First response"],
      rows: [
        ["‘No foreign-guest qualification’", "This conflicts with current national policy.", "Ask the duty manager to check the official notice and registration procedure."],
        ["Wrong branch, date, name or no room", "This is primarily a booking or inventory problem.", "Have platform support reconcile the live reservation."],
        ["Missing, expired or unusable document", "A platform confirmation cannot replace identity verification.", "Seek document guidance from 12367 and the relevant authority or consulate."],
        ["An ordinary condition or lawful restriction", "The national notice does not erase every valid check-in condition.", "Ask for the precise rule and written explanation before deciding the remedy."],
      ],
    },
    {
      id: "before-booking-heading",
      type: "heading",
      level: 2,
      text: "Verify the exact property before arrival",
    },
    {
      id: "prebooking-checklist",
      type: "list",
      items: [
        "Save the property’s Chinese name, branch, full address, map pin and front-desk number.",
        "State that every foreign guest will use an original valid passport or other accepted travel document.",
        "Give the arrival date and time; ask whether reception will be staffed and the room held after late check-in.",
        "Ask whether this exact property completes hotel accommodation registration at check-in.",
        "Keep the answer in platform chat and save an offline screenshot with branch name and timestamp.",
        "Read cancellation and no-show terms; do not assume a refusal automatically creates a refund or price-difference payment.",
      ],
    },
    {
      id: "confirmation-messages",
      type: "table",
      caption: "Three short messages to create a usable record",
      columns: ["Purpose", "Message to send", "Chinese to show"],
      rows: [
        ["Passport and registration", "I will arrive with a [country] passport. Can this exact branch complete hotel accommodation registration?", "我将持[国家]护照入住。请确认这家具体门店可以为我办理旅馆住宿登记。"],
        ["Late arrival", "Will reception be staffed at [time], and will you hold my confirmed room?", "请确认[时间]前台有人值班，并会保留我已确认的房间。"],
        ["Exact branch", "Please reply in this booking chat and include the full branch name.", "请在订单聊天中书面回复，并写明完整门店名称。"],
      ],
    },
    {
      id: "registration-heading",
      type: "heading",
      level: 2,
      text: "What happens at hotel registration",
    },
    {
      id: "desk-materials",
      type: "list",
      ordered: true,
      items: [
        "Go to the exact branch and show the booking name and confirmation.",
        "Each foreign guest presents the original valid passport or other accepted international travel document.",
        "Let staff inspect and record the information required for hotel accommodation registration.",
        "Check that spelling or document details collected by the platform do not point to a different guest.",
        "Ask for the manager if the desk confuses hotel registration with the separate process for a private residence.",
      ],
    },
    {
      id: "hotel-nonhotel",
      type: "table",
      caption: "Registration responsibility depends on the stay type",
      columns: ["Stay", "Who registers", "Traveller check"],
      rows: [
        ["Hotel accommodation", "The hotel registers the guest and submits the hotel-stay information.", "Bring the original document and confirm staffed check-in."],
        ["Private home or another non-hotel residence", "The foreigner or host completes registration within 24 hours.", "Ask which current local online or in-person route applies."],
        ["Unclear apartment, guesthouse or minsu", "First establish whether it operates as hotel or non-hotel accommodation.", "Do not assume a door code or platform label completes registration."],
      ],
    },
    {id: "nonhotel-pilot", type: "callout", tone: "decision", title: "Staying with friends or in a private flat? Register within 24 hours", body: "Outside hotels, you or your host must register your stay with the local police within 24 hours of arriving. Since 21 September 2026 this can be done online anywhere in China, on the National Immigration Administration website, the NIA 12367 app or its WeChat and Alipay mini-programs, with the same effect as registering in person; the local police station remains an option. It does not replace a hotel's own registration."},
    {id: "traps-heading", type: "heading", level: 2, text: "Six hotel surprises foreign travellers meet"},
    {id: "traps-list", type: "list", ordered: true, items: ["\"We cannot take foreigners.\" National measures say a hotel should not refuse you only for lacking \"foreign-related qualifications\". Ask for the duty manager and the exact reason.", "A photo of the passport is not enough. Every foreign guest shows the original passport, children included, at the desk.", "A door code is not a registration. With a self-check-in apartment, ask before you book who registers your stay; if nobody can say, choose a property with a front desk.", "Nobody at reception after midnight. Confirm in writing that the desk is staffed at your arrival time and that the room will be held.", "A deposit you did not budget for. Hotels usually hold a deposit at check-in; pay it with a physical card with room on it.", "Staying with friends without registering. Outside hotels the 24-hour registration is your or your host's job, not the hotel's."]},
    {
      id: "refusal-heading",
      type: "heading",
      level: 2,
      text: "If a confirmed hotel refuses check-in",
    },
    {
      id: "recovery-order",
      type: "list",
      ordered: true,
      items: [
        "Verify the branch, date, booking name, room status and original document once.",
        "Ask the duty manager for the exact reason, not only ‘system problem’ or ‘policy.’",
        "If the sole reason is missing foreign-related qualification, show the official Chinese notice and ask the manager to check the registration procedure.",
        "Open platform support from the active booking; ask it to call the property and record the hotel’s reason.",
        "Tell both sides not to mark you as a no-show. Do not cancel until the platform states in writing how fees will be handled.",
        "Set a short resolution limit, then move to a staffed alternative that has confirmed your document and arrival time.",
        "Keep the original dispute open and save replacement-room and transport receipts for later review.",
      ],
    },
    {
      id: "frontdesk-script",
      type: "table",
      caption: "Calm lines for the front desk",
      columns: ["Task", "Chinese", "Meaning"],
      rows: [
        ["Clarify", "请问无法入住的具体原因是什么？是订单、证件，还是登记流程问题？", "Is the exact problem the booking, document or registration process?"],
        ["Escalate", "请联系值班经理，并核对现行的境外人员住宿规定。", "Please contact the duty manager and check the current rule."],
        ["Protect the record", "请在订单中注明酒店无法办理入住，不要标记为客人未到店。", "Record that the hotel could not check me in; do not mark a no-show."],
        ["Seek an alternative", "请联系预订平台，协助安排已书面确认可以办理入住的替代住宿。", "Please help the platform arrange a replacement that has confirmed check-in."],
      ],
    },
    {
      id: "midnight-scenario",
      type: "callout",
      title: "Scenario: refusal after midnight with children or an older traveller",
      body: "Protect the group before debating the whole case. Record the unresolved refusal, obtain a platform case number, confirm a safe staffed alternative and move. Continue the refund or complaint from the new room.",
      tone: "decision",
    },
    {
      id: "platform-heading",
      type: "heading",
      level: 2,
      text: "Ask the platform for a written operational answer",
    },
    {
      id: "platform-asks",
      type: "list",
      items: [
        "Open a support case on the active reservation and provide the reference.",
        "Call the exact property and identify whether the cause is inventory, booking, document or registration.",
        "Write the property’s answer into the booking record and protect the guest from no-show treatment.",
        "Explain the options under the live terms: hotel resolution, replacement, penalty-free cancellation or refund review.",
        "State whether replacement and transport receipts may be reviewed; never promise reimbursement before written approval.",
      ],
    },
    {
      id: "alternative-scenarios",
      type: "table",
      caption: "Choose the replacement for the failure you actually face",
      columns: ["Situation", "Replacement priority", "Avoid"],
      rows: [
        ["Late-night refusal", "A nearby staffed desk that confirms the travel-document type and arrival time.", "Another remote or door-code check-in."],
        ["Family, mobility need or heavy luggage", "A safe, straightforward transfer and confirmed curb-to-room access.", "Rebooking by district name alone."],
        ["Original dispute remains open", "A separate new confirmation and itemised receipts.", "Letting support cancel or overwrite the disputed record without written terms."],
      ],
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "Keep enough evidence, not unnecessary personal data",
    },
    {
      id: "evidence-table",
      type: "table",
      caption: "A privacy-safe record pack",
      columns: ["Record", "Why keep it", "Privacy rule"],
      rows: [
        ["Confirmation and terms", "Proves branch, date, guest and transaction conditions.", "Redact payment details when sharing outside support."],
        ["Dated listing screenshot", "Shows the platform wording at booking time.", "Treat it as transaction evidence, not law."],
        ["Hotel refusal note or chat", "Records time, stated reason and manager review.", "Collect staff names only when offered and necessary."],
        ["Platform case and resolution", "Records what support confirmed and offered.", "Keep the case number; do not publish the transcript."],
        ["Replacement and transport receipts", "Shows reasonable recovery costs.", "Share only with the platform or competent complaint channel."],
      ],
    },
    {
      id: "channel-heading",
      type: "heading",
      level: 2,
      text: "Use each official channel for its actual role",
    },
    {
      id: "channels",
      type: "table",
      caption: "Official channels do not replace the room for you",
      columns: ["Channel", "Use", "Boundary"],
      rows: [
        ["12367", "Immigration-management and accommodation-registration policy questions.", "It does not decide a platform refund."],
        ["12345", "Non-emergency local-government information, help, complaints and routing.", "It is not an emergency police line."],
        ["12315", "A documented consumer dispute with the hotel or platform.", "It does not produce an immediate room or automatic compensation."],
        ["110", "A genuine immediate threat, suspected crime or police emergency.", "Do not use it for a routine booking or refund argument."],
      ],
    },
    {
      id: "failure-cases-heading",
      type: "heading",
      level: 2,
      text: "Two common scenarios that change the answer",
    },
    {
      id: "failure-cases",
      type: "table",
      caption: "Do not turn every refusal into the same dispute",
      columns: ["Scenario", "Decision", "Recovery"],
      rows: [
        ["The desk says ‘no foreigner qualification,’ but the booking and passport are valid.", "Treat it as a policy/execution problem.", "Manager, official notice, platform record, then 12367 or 12345 if needed."],
        ["The hotel says ‘no room’ or cannot find the reservation.", "Treat it as inventory/transaction failure, not proof of a passport rule.", "Have the platform reconcile or replace under the live terms."],
        ["A self-service apartment sends only a door code.", "The operating and registration model is unclear.", "Ask who registers the stay; use a staffed alternative if the answer remains vague."],
        ["The passport is lost or unusable.", "The booking cannot substitute for a valid document.", "Contact 12367, the local exit-entry authority and the relevant embassy or consulate."],
      ],
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "Foreign-passport hotel check-in: practical FAQ",
    },
    {
      id: "faq-platform-label-heading",
      type: "heading",
      level: 3,
      text: "Can I book a hotel that the platform marks as not accepting foreigners?",
    },
    {
      id: "faq-platform-label-answer",
      type: "paragraph",
      text: "Do not treat the platform label as law or ignore it as harmless. Save the listing, contact the exact branch in writing and ask whether it can process hotel accommodation registration for your passport and arrival time. If the answer is unclear, choose a property that confirms the process before payment.",
    },
    {
      id: "faq-confirmed-refusal-heading",
      type: "heading",
      level: 3,
      text: "What should I do if a confirmed hotel still refuses check-in?",
    },
    {
      id: "faq-confirmed-refusal-answer",
      type: "paragraph",
      text: "Check the branch, date, booking name, room status and travel document once. Ask the duty manager for the exact reason, open a platform case without self-cancelling, prevent a no-show record and move to a staffed replacement if the refusal is not resolved quickly—especially late at night or with children or older travellers.",
    },
    {
      id: "faq-registration-heading",
      type: "heading",
      level: 3,
      text: "Do I personally have to register a hotel stay within 24 hours?",
    },
    {
      id: "faq-registration-answer",
      type: "paragraph",
      text: "At a hotel, the hotel registers the guest and submits the hotel accommodation information. The foreign guest or host completes registration within 24 hours for a stay outside a hotel. If an apartment, guesthouse or minsu has an unclear operating model, establish which category it uses before arrival.",
    },
    {
      id: "faq-self-cancel-heading",
      type: "heading",
      level: 3,
      text: "Should I cancel the booking myself after a refusal?",
    },
    {
      id: "faq-self-cancel-answer",
      type: "paragraph",
      text: "Not until the platform states in writing how cancellation, fees and no-show status will be handled. Self-cancelling can weaken the transaction record. Keep the original case open while arranging a safe replacement and retain only the evidence needed for review.",
    },
    {
      id: "faq-channel-heading",
      type: "heading",
      level: 3,
      text: "Which official number should I use?",
    },
    {
      id: "faq-channel-answer",
      type: "paragraph",
      text: "Use 12367 for immigration and accommodation-registration policy, 12345 for non-emergency local-government help, and 12315 for a documented consumer dispute. Use 110 only for an immediate threat, suspected crime or another police emergency. None of these channels guarantees a room or refund that night.",
    },
    {
      id: "final-checklist",
      type: "callout",
      title: "The two checklists to remember",
      body: "Before arrival: exact branch, original documents, staffed time, written registration confirmation and saved terms. After refusal: exact cause, manager, platform case, no-show protection, confirmed replacement and necessary receipts. Secure safe accommodation first; pursue the commercial or official remedy second.",
      tone: "decision",
    },
    {id: "sale-heading", type: "heading", level: 2, text: "Hotels that are ready for you before you arrive"},
    {id: "sale-copy", type: "paragraph", text: "On our private tours, we choose and book the hotels along your route and name them, with the room types, in writing before you pay; our 8-day route uses four-star hotels with breakfast. A driver meets you on arrival and takes you to the door, so a late flight does not leave you searching for the right branch. The same passport goes on the trip's real-name bookings, and those have deadlines. The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time, in each visitor's own passport name, and on 1 October 2025, the first day of China's National Day holiday, its booking page already showed 2 to 7 October fully booked. Hand the booking to us and pay at least 8 days before your visit, and our booking guarantee covers it: if the booking fails, we refund the service fee and the ticket money in full. Inside those 8 days the guarantee no longer applies."},
    { id: "handoff-options", type: "comparison", title: "What we can arrange", columns: [
      { heading: `The whole trip: from ${bodyTourPrice(tour8, 6, "en")} per person`, body: `Our 8-day Beijing, Xi'an and Shanghai private tour is ${bodyTourPrice(tour8, 2, "en")} per person for two and ${bodyTourPrice(tour8, 6, "en")} for six. The 14-day route with Chengdu and Guilin is ${bodyTourPrice(tour14, 2, "en")} per person for two.`, items: ["Four-star hotels with breakfast, a private guide and car on touring days, every transfer, the trains and flights between cities, and the named admissions.", "If we cannot get your Forbidden City or Tiananmen booking, we refund everything you paid, provided we have your passport details at least 8 days before the Forbidden City visit."] },
      { heading: "A private car and driver", body: "From the airport or station to the exact hotel branch, in any city in mainland China; tell us your arrival time when you ask for the price.", items: ["Our own drivers.", "Price confirmed in writing before you pay."] },
      { heading: `Sight bookings: ${bodyReservationFee("en")} per person`, body: "Per attraction, plus the ticket at face value, booked in each traveller's own passport name: the Forbidden City, the Terracotta Warriors, the Chengdu panda base and more.", items: ["Request and pay at least 8 days before your visit and our booking guarantee covers it: if the booking fails, the fee and ticket money are refunded in full.", "Inside those 8 days the guarantee no longer applies."] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "Book it with us", items: [{label: "See the 8-day Beijing, Xi'an and Shanghai route", href: "/tours/beijing-xian-shanghai-8-day-private-tour/", description: "Day-by-day plan, hotels and the published price table."}, {label: "Plan the whole trip with a planner", href: "/services/full-trip-support/", description: "Tell us your dates and budget; the first brief is free."}, {label: "Ask for an airport or station pickup", href: "/services/private-car-and-driver/", description: "Any mainland city. Send your route, date and luggage."}, {label: "See the attractions we book", href: "/services/china-attraction-reservations/", description: "Release times, prices and the guarantee, attraction by attraction."}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "How booking works", body: "Send your dates, the number of travellers and what you want to see by WhatsApp or email from any page above. A planner replies within 12 hours, and you get a written quote before you pay anything; the same planner stays with you from that first reply to your last day. You pay a 30% deposit by card through a secure VBill link and the rest after you arrive. Homeground China is a licensed travel agency (L-BJ10587); the guides and drivers are our own, and we never stop at shops."},
    {
      id: "light-help",
      type: "callout",
      title: "Need a human check?",
      body: "Use the general planner only for a first contact. In the initial form, share travel dates, the city or areas being considered, traveller and room counts, an approximate accommodation budget if useful, and whether a late arrival needs later discussion. Do not submit children's ages, mobility, medical or accessibility details, passport or other document information, booking or payment records, or identifiable material intended for a hotel, DMC or other supplier. A planner can arrange a separate human follow-up; those details are discussed only when appropriate and with suitable consent. Nothing is shared with a supplier without separate, purpose-specific consent, and Homeground does not rank hotel apps. This is not live inventory and does not guarantee price, availability, foreign-guest acceptance, room type or accessibility.",
      tone: "neutral",
    },
    {
      id: "faq",
      type: "faq",
      title: "More questions about checking in with a foreign passport",
      items: [
        {
          question: "Do I need a hotel with a special foreign-guest licence in China?",
          answer: "No. Current national measures say qualification requirements should not be used to block accommodation operators from receiving overseas guests, and a hotel should not refuse you solely because it claims to lack ‘foreign-related qualifications.’ It does not mean every hotel will work out for you: a valid reservation, an accepted travel document, ordinary check-in conditions and the property's ability to complete registration still matter.",
        },
        {
          question: "What should I ask a hotel before booking as a foreign traveller?",
          answer: "Ask whether that exact property completes hotel accommodation registration at check-in. State that every foreign guest will carry an original valid passport or other accepted travel document, give the arrival date and time, and ask whether reception will be staffed and the room held after a late check-in. Keep the reply in the booking chat and save a screenshot showing the branch name and time.",
        },
        {
          question: "Is a passport photo or photocopy enough at the front desk?",
          answer: "No. Each foreign guest presents the original valid passport or other accepted international travel document, and staff inspect it and record the information required for hotel accommodation registration. Also check that any spelling or document details the platform collected do not point to a different guest, and ask for the duty manager if the desk confuses this with the private-residence process.",
        },
        {
          question: "My apartment booking only sent a door code. Is that a problem?",
          answer: "It means the operating and registration model is unclear. First establish whether the place operates as hotel or non-hotel accommodation, then ask who registers the stay. Do not assume that a door code or a platform label completes registration; if the answer stays vague, move to a property with staffed reception instead.",
        },
        {
          question: "What should I keep as evidence if a hotel refuses me?",
          answer: "Keep the confirmation and terms, a dated screenshot of the listing, a note or chat of the refusal with the time and the reason stated, the platform case number and its outcome, and itemised replacement accommodation and transport receipts. Mask payment details outside customer support, and give the receipts only to the platform or a competent complaints channel.",
        }, {question: "Do serviced apartments need my passport?", answer: "Yes. If it operates as a hotel, the property checks each foreign guest's original passport and registers you; if it is a private flat, you or your host register within 24 hours, online or at the local police station. Ask before you book which it is."}, {question: "Can a group check in together?", answer: "Yes, but each foreign guest still shows their own original passport and is registered individually. Send the hotel the names and arrival time in advance, and ask it in writing whether it can register the whole group on arrival at your time."}],
    },
    {
      id: "related-guides",
      type: "internal-links",
      title: "Continue the stay decision",
      items: [
        { label: "Stay in China", href: "/stay/", description: "Return to the accommodation decision collection." },
        { label: "How to pay in China as a tourist", href: "/guides/how-to-pay-in-china-as-a-tourist/", description: "Prepare payment backups for deposits and replacement bookings." },
        { label: "How to judge a China hotel near the metro", href: "/guides/china-hotel-near-metro/", description: "Verify the usable door-to-platform route separately." },
        { label: "Why are hotels in China so cheap?", href: "/guides/why-are-hotels-in-china-so-cheap/", description: "Compare property type and value without confusing price with registration." },
        { label: "Compare international and local hotels", href: "/guides/international-chain-or-local-hotel-china/", description: "Compare an international chain and a local hotel in China through room facts, passport handling, payment, location and a documented recovery route." },
      ],
    },
    {
      id: "official-sources",
      type: "sources",
      title: "Official sources checked on 20 August 2026",
      items: [
        {label: "Online registration for stays outside hotels available nationwide from 21 September 2026, alongside in-person registration", url: "https://www.nia.gov.cn/n897453/c1806111/content.html", publisher: "National Immigration Administration", reviewedAt: "2026-10-20"},
        {label: "Palace Museum ticketing: release time and real-name rules", url: "https://www.dpm.org.cn/subject_booking/", publisher: "The Palace Museum", reviewedAt: "2026-08-22"},
        {label: "Palace Museum fully booked for 2 to 7 October on the first day of the 2025 National Day holiday", url: "https://www.yicai.com/news/102851899.html", publisher: "Yicai", reviewedAt: "2026-10-19"},
        { label: "Measures facilitating accommodation for overseas visitors", url: "https://www.mofcom.gov.cn/zwgk/zcfb/art/2024/art_10ddb29858c24ece86b3f575bda1d9c4.html", publisher: "Ministry of Commerce and six departments", reviewedAt: "2026-08-20" },
        { label: "English summary of the accommodation measures", url: "https://english.www.gov.cn/news/202407/26/content_WS66a2d827c6d0868f4e8e975c.html", publisher: "State Council website", reviewedAt: "2026-08-20" },
        { label: "Government-hosted report on refusal for lack of foreign-related qualification", url: "https://wlt.xinjiang.gov.cn/wlt/xytx/202406/1ee6037434084d3ab23d68b7df174b4d.shtml", publisher: "Department of Culture and Tourism of Xinjiang", reviewedAt: "2026-08-20" },
        { label: "Hotel and non-hotel accommodation registration interpretation", url: "https://www.nia.gov.cn/n741440/n741577/c1771556/content.html", publisher: "National Immigration Administration", reviewedAt: "2026-08-20" },
        { label: "Beijing accommodation registration guide", url: "https://english.beijing.gov.cn/livinginbeijing/applicationfordocuments/202107/t20210719_2439278.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-20" },
        { label: "Official route to the 12315 consumer platform", url: "https://www.samr.gov.cn/hd/xfzn/art/2022/art_9d22351e9bee4da38b89c15e843207b4.html", publisher: "State Administration for Market Regulation", reviewedAt: "2026-08-20" },
        { label: "Boundary between 12345 and 110", url: "https://www.beijing.gov.cn/zhengce/gwywj/202205/t20220516_2711529.html", publisher: "State Council General Office via Beijing Government", reviewedAt: "2026-08-20" },
        { label: "Hero photograph: Changchun Huatian Hotel check-in counter, N509FZ (CC BY-SA 4.0)", url: "https://commons.wikimedia.org/wiki/File:Check-in_counter_of_Changchun_Huatian_Hotel_(20260120074056).jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-13" }
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
