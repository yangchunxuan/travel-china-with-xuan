import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "A foreign passport is not a reason to search for a hotel with a special ‘foreign guest licence.’ Current national policy says qualification requirements should not be used to stop accommodation operators receiving overseas guests, and hotels must not use a lack of ‘foreign-related qualifications’ as the reason for refusal. But ‘any hotel’ is still too broad as a booking guarantee: the exact property must have a room, accept the booking under its ordinary terms, verify a valid travel document and complete registration correctly. A platform label, a confirmed reservation and what the night-shift desk actually does are three different things.",
    },
    {
      id: "three-layers",
      type: "comparison",
      title: "Separate three layers before deciding what went wrong",
      columns: [
        {
          heading: "Official rule",
          body: "Hotels register foreign guests; current national policy does not support a supposed special foreign-guest qualification as a blanket barrier.",
          items: [
            "The hotel handles hotel accommodation registration.",
            "The guest presents a valid passport or other accepted travel document.",
            "Non-hotel stays follow a separate process.",
          ],
        },
        {
          heading: "Platform record",
          body: "The listing, guest-policy label, confirmation, payment and chat record describe the transaction—not the law.",
          items: [
            "Useful for proving what was displayed or promised.",
            "May be wrong, stale or attached to the wrong branch.",
            "Refund and rebooking depend on the live terms and support decision.",
          ],
        },
        {
          heading: "Front-desk execution",
          body: "The exact property and staff on duty must locate the booking, verify the document and operate the registration process.",
          items: [
            "Training or system confusion can still cause a refusal.",
            "Late or self-service arrivals carry more operational risk.",
            "A calm escalation path protects the night and the evidence.",
          ],
        },
      ],
    },
    {
      id: "no-absolute-promise",
      type: "paragraph",
      text: "The useful answer is therefore: a hotel should not reject you solely because it claims to lack a special qualification for foreigners, but the national policy is not a promise that every property must honour every attempted stay regardless of room availability, identity documents, the actual booking, ordinary check-in conditions or a lawful local restriction. Confirm the transaction and the property’s ability to execute it without turning a platform filter into a legal rule.",
    },
    {
      id: "official-rule-heading",
      type: "heading",
      level: 2,
      text: "What the official rule actually says",
    },
    {
      id: "current-policy",
      type: "paragraph",
      text: "Checked on 11 August 2026, the clearest national policy is the July 2024 circular issued by the Ministry of Commerce and six other departments. It says local departments and online platforms should not use qualification requirements as a threshold restricting accommodation operators from receiving overseas guests; platforms and accommodation operators should not illegally publish information saying they do not receive overseas guests. A May 2024 response on the China Government Network is more direct: hotels must not refuse overseas guests on the ground that they lack ‘foreign-related qualifications.’",
    },
    {
      id: "no-special-licence",
      type: "callout",
      title: "Do not turn an old label into a new legal test",
      body: "‘Accepts foreigners,’ ‘foreigner-friendly’ and similar platform wording can be useful operational clues. They are not the name of a special licence that the traveller must find. If a hotel says ‘we have no foreign-guest qualification,’ ask a manager to check the current rule and the registration procedure.",
      tone: "decision",
    },
    {
      id: "registration-heading",
      type: "heading",
      level: 2,
      text: "What happens during hotel registration",
    },
    {
      id: "hotel-checkin-steps",
      type: "list",
      ordered: true,
      items: [
        "Go to the exact property named in the reservation. A chain name without the branch, Chinese address and front-desk number is not enough.",
        "Each foreign guest should carry the original valid passport or other accepted international travel document. Do not assume a screenshot or photocopy will replace the document check.",
        "Give the booking name and confirmation, and make sure the spelling and document number match the booking record where the platform collected them.",
        "The hotel checks the document, records the required accommodation information and submits the hotel-stay information through the applicable public-security process.",
        "A hotel guest does not normally leave reception to complete the separate non-hotel 24-hour registration. If staff tell you to do that, first ask whether the property is legally operating as a hotel or as a different accommodation type.",
      ],
    },
    {
      id: "hotel-nonhotel-table",
      type: "table",
      caption: "The word ‘accommodation’ can hide different registration responsibilities",
      columns: ["Stay type", "Who handles registration", "Traveller’s practical check"],
      rows: [
        [
          "Hotel, inn or other property operating as hotel accommodation",
          "The hotel registers the foreign guest and submits the hotel accommodation information.",
          "Bring the original valid travel document and ask the exact branch to confirm staffed check-in at your arrival time.",
        ],
        [
          "Private home or another residence outside a hotel",
          "The foreigner or the person providing accommodation must register within 24 hours under Article 39.",
          "Ask the host which current local online or in-person route applies; do not assume a door code completes registration.",
        ],
        [
          "Serviced apartment, guesthouse or minsu whose legal operation is unclear",
          "The answer depends on whether the exact property is operating and registering guests as a hotel or as non-hotel accommodation.",
          "Get the classification and registration procedure in writing before paying, especially for self-check-in or an unstaffed arrival.",
        ],
      ],
    },
    {
      id: "nonhotel-pilot",
      type: "callout",
      title: "The 2026 online pilot is for stays outside hotels",
      body: "The NIA says that from 20 March 2026, online non-hotel accommodation registration was piloted in Hebei, Liaoning, Zhejiang, Hubei, Guangxi, Chongqing and Sichuan. It was not described as nationwide when checked on 11 August 2026. This pilot does not replace the hotel’s registration duty. Recheck the NIA platform and the local process for your travel date.",
      tone: "warning",
    },
    {
      id: "platform-heading",
      type: "heading",
      level: 2,
      text: "What a booking-platform label can—and cannot—tell you",
    },
    {
      id: "display-law-execution",
      type: "comparison",
      title: "Use each piece of evidence for the job it can do",
      columns: [
        {
          heading: "A listing label",
          body: "Evidence of what the platform displayed when you booked.",
          items: [
            "Save a dated screenshot.",
            "Check that it belongs to the exact branch.",
            "Do not treat it as a legal licence.",
          ],
        },
        {
          heading: "Written hotel confirmation",
          body: "Evidence that the exact property was told your passport type and arrival time.",
          items: [
            "Useful if the front desk later changes its answer.",
            "Stronger when the branch, date and arrival time are explicit.",
            "Still not an absolute guarantee against another booking problem.",
          ],
        },
        {
          heading: "Official policy",
          body: "The rule governing qualification barriers and hotel registration.",
          items: [
            "Use it to challenge the ‘no foreign qualification’ explanation.",
            "It does not set a platform’s refund amount.",
            "It does not prove that a particular room remains available.",
          ],
        },
      ],
    },
    {
      id: "prebooking-checklist",
      type: "list",
      items: [
        "Save the exact Chinese property name, complete address, map pin and front-desk phone number.",
        "Tell the property that you will use a foreign passport, state the arrival date and approximate time, and ask whether staffed reception can complete hotel accommodation registration.",
        "For a late arrival, ask whether the desk will still be staffed and whether the reservation will be held after the normal check-in time.",
        "Keep the reply inside the booking platform where possible; also save an offline screenshot with the branch name and timestamp.",
        "Read the cancellation and no-show terms. Do not assume the platform will automatically refund a hotel-side refusal or pay a price difference.",
        "If the property only offers a door code or remote identity upload, ask whether it is a hotel stay or non-hotel stay and who completes the legally required registration.",
      ],
    },
    {
      id: "booking-message-table",
      type: "table",
      caption: "Short messages to send before payment or before arrival",
      columns: ["Purpose", "English", "Chinese to show the property"],
      rows: [
        [
          "Confirm passport check-in",
          "I will check in with a [country] passport on [date] at about [time]. Can this exact property complete hotel accommodation registration?",
          "我将于[日期][时间]左右持[国家]护照入住。请确认这家具体门店可以为我办理旅馆住宿登记。",
        ],
        [
          "Confirm a late arrival",
          "Will the front desk be staffed at [time], and will you hold my confirmed reservation?",
          "请确认[时间]前台是否有人值班，并会为我保留已确认的订单。",
        ],
        [
          "Create a usable record",
          "Please reply in this booking chat and include the exact hotel branch name.",
          "请在这个订单聊天中书面回复，并写明具体酒店门店名称。",
        ],
      ],
    },
    {
      id: "refusal-heading",
      type: "heading",
      level: 2,
      text: "If a confirmed hotel refuses check-in: recover in this order",
    },
    {
      id: "recovery-order",
      type: "list",
      ordered: true,
      items: [
        "Verify the basics once: exact branch, stay date, booking name, room status and the original valid passport. A wrong branch or name mismatch needs a different solution from a nationality-based refusal.",
        "Ask for the duty manager and a precise reason. Request a written message in the platform chat or booking record rather than arguing about a vague ‘system problem.’",
        "If the only reason is ‘no foreign-guest qualification,’ show the Chinese seven-department notice or China Government Network response and ask the manager to check the current registration procedure with the competent local authority.",
        "Open platform support from the live booking while you are still at the property. Ask support to call the hotel, record the hotel-side reason and give you a case number.",
        "Ask the hotel and platform not to mark you as a no-show. Do not cancel the order yourself until the platform writes how the fee and refund will be handled.",
        "If check-in will not be resolved quickly, secure a safe, staffed alternative that has confirmed your passport and arrival time. Keep the original dispute open while you move.",
        "Save the replacement and transport receipts, then continue the refund, reimbursement request or official complaint after everyone has a safe room.",
      ],
    },
    {
      id: "bed-before-debate",
      type: "callout",
      title: "At midnight, the first objective is a safe bed",
      body: "You can preserve your rights without keeping children, older travellers or luggage in a lobby for hours. Set a short limit for manager and platform intervention, document the unresolved refusal, then move to a confirmed alternative. Continue the dispute from a safe place.",
      tone: "decision",
    },
    {
      id: "frontdesk-heading",
      type: "heading",
      level: 2,
      text: "A calm front-desk script",
    },
    {
      id: "frontdesk-script",
      type: "table",
      caption: "Use the lines that match the actual problem; do not threaten staff",
      columns: ["Task", "Chinese sentence", "Meaning"],
      rows: [
        [
          "Clarify the reason",
          "请问无法办理入住的具体原因是什么？是订单问题、证件问题，还是前台不知道如何办理境外人员住宿登记？",
          "What is the exact reason check-in cannot be completed: the booking, the document or uncertainty about foreign-guest registration?",
        ],
        [
          "Ask for a manager",
          "请联系值班经理，并核对商务部等七部门关于便利境外人员住宿的现行规定。",
          "Please contact the duty manager and check the current seven-department accommodation measures.",
        ],
        [
          "Ask for registration guidance",
          "如果前台不熟悉登记流程，请联系属地公安机关咨询，或拨打12367了解住宿登记政策。",
          "If the desk does not know the procedure, please ask the local public-security authority or call 12367 for registration-policy guidance.",
        ],
        [
          "Protect the booking record",
          "如果酒店今天无法办理，请在平台订单中注明‘酒店无法办理入住’，不要标记为客人未到店。",
          "If the hotel cannot check me in today, please record that the hotel could not provide check-in and do not mark me as a no-show.",
        ],
        [
          "Request practical help",
          "请与预订平台联系，协助安排附近已确认可以办理外国护照住宿登记的替代住宿。",
          "Please contact the booking platform and help arrange a nearby alternative that has confirmed foreign-passport registration.",
        ],
      ],
    },
    {
      id: "platform-escalation-heading",
      type: "heading",
      level: 2,
      text: "What to ask the booking platform to do",
    },
    {
      id: "platform-asks",
      type: "list",
      items: [
        "Open a support case against the active reservation and give you the case or chat reference.",
        "Call the exact property and confirm whether the problem is availability, the booking, identity documents or foreign-guest registration.",
        "Write the hotel’s answer in the order record and protect the booking from being treated as a guest no-show.",
        "Explain the options under this booking’s live terms: hotel-side resolution, replacement booking, cancellation without penalty or refund review.",
        "If you must pay for a replacement or transport, state whether receipts should be submitted and whether any price-difference or transport request will be reviewed. Ask; do not assume approval.",
        "Send the final resolution in writing, including any refund amount, processing route and expected timeline the platform is actually willing to commit to.",
      ],
    },
    {
      id: "cancel-warning",
      type: "callout",
      title: "Do not erase your own evidence with one tap",
      body: "If support asks you to press ‘cancel,’ first get a written statement that the cancellation is hotel-side or penalty-free and will not be treated as a voluntary change or no-show. The exact refund still follows the booking terms and the platform’s written resolution.",
      tone: "warning",
    },
    {
      id: "replacement-heading",
      type: "heading",
      level: 2,
      text: "How to choose a replacement without repeating the problem",
    },
    {
      id: "replacement-checklist",
      type: "list",
      items: [
        "Choose a genuinely staffed property, especially for a late-night arrival. A remote door-code stay creates a second registration question.",
        "Call or message the exact branch, not only the chain, and state the passport type, number of guests and arrival time.",
        "Ask for written confirmation that the desk can complete hotel accommodation registration for each foreign guest.",
        "Give priority to a safe, simple transfer and a desk that is open over finding the perfect price, neighbourhood or room type that night.",
        "Keep the new booking separate from the original case and save the replacement confirmation before leaving the first property.",
        "At the new hotel, present the original documents and complete normal check-in; do not ask staff to copy the disputed hotel’s explanation.",
      ],
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "What records to keep",
    },
    {
      id: "evidence-table",
      type: "table",
      caption: "Keep enough to prove the transaction and recovery cost—without collecting unnecessary personal data",
      columns: ["Record", "What it establishes", "Good practice"],
      rows: [
        [
          "Booking confirmation and payment record",
          "The exact property, dates, room, guest name, amount and booking terms.",
          "Save offline before arrival; redact payment details before sharing beyond support or an official complaint.",
        ],
        [
          "Listing and guest-policy screenshots",
          "What the platform displayed at the time, including any foreign-passport or check-in wording.",
          "Include the branch name, capture date and relevant cancellation terms. Treat the label as transaction evidence, not law.",
        ],
        [
          "Hotel refusal record",
          "The time, stated reason and whether a manager was asked to review it.",
          "Prefer a written platform message or a contemporaneous note. Record staff roles or names only when offered and necessary.",
        ],
        [
          "Platform support case",
          "What the platform was told, what it confirmed and what remedy it offered.",
          "Keep the case number, chat transcript and written resolution.",
        ],
        [
          "Replacement and transport receipts",
          "The reasonable cost of recovering from the failed check-in.",
          "Keep itemised receipts and do not assume reimbursement until it is approved in writing.",
        ],
      ],
    },
    {
      id: "official-channels-heading",
      type: "heading",
      level: 2,
      text: "Which official channel fits which problem",
    },
    {
      id: "official-channels-table",
      type: "table",
      caption: "Use official channels for their actual remit, not as an instant rebooking desk",
      columns: ["Channel", "Use it for", "Do not expect"],
      rows: [
        [
          "12367 — National Immigration Administration",
          "Immigration-management and accommodation-registration policy questions; the 2024 measures also call for it to receive relevant inquiries, complaints and suggestions.",
          "A platform refund decision or a guaranteed replacement room.",
        ],
        [
          "12345 — local government service hotline",
          "Non-emergency government-service inquiries, help, complaints and routing when the responsible local department is unclear.",
          "Emergency police response or an immediate commercial refund.",
        ],
        [
          "12315 — consumer complaint route",
          "A later consumer dispute about the hotel or platform, supported by the operator name, facts, request and records.",
          "An emergency room for the night or automatic compensation.",
        ],
        [
          "110 — police emergency line",
          "An immediate threat to personal or property safety, suspected crime or another genuine police emergency.",
          "Routine mediation of a booking, cancellation or refund disagreement.",
        ],
      ],
    },
    {
      id: "channel-boundary",
      type: "paragraph",
      text: "No hotline guarantees that the original hotel will produce a room or that a platform will refund a particular amount on the spot. Use 12367 for the registration-policy question, 12345 for non-emergency local-government help, 12315 for the documented consumer dispute and 110 only for a real emergency. The property and booking platform remain the first operational contacts for that night’s room.",
    },
    {
      id: "common-cases-heading",
      type: "heading",
      level: 2,
      text: "Common cases that need different responses",
    },
    {
      id: "common-cases-table",
      type: "table",
      caption: "Do not treat every failed check-in as the same legal problem",
      columns: ["What you hear", "What it may mean", "Next move"],
      rows: [
        [
          "‘This hotel does not accept foreigners’ or ‘we have no qualification’",
          "The explanation conflicts with the current policy against qualification barriers.",
          "Ask for the manager, show the official Chinese notice, open the platform case and use 12367 or 12345 if policy guidance is needed.",
        ],
        [
          "‘The system cannot read this passport’",
          "A document-entry, training or system problem may be blocking the desk; do not guess which one.",
          "Ask the manager to identify the exact error and seek official registration guidance. Move if it cannot be solved promptly.",
        ],
        [
          "‘There is no reservation’ or ‘no room’",
          "This is primarily an inventory or transaction dispute, not proof of a foreign-passport rule.",
          "Have platform support reconcile the booking and provide its written remedy under the live terms.",
        ],
        [
          "‘Use the door code; there is no front desk’",
          "The property may be a non-hotel stay or may have an unclear registration process.",
          "Ask who completes registration and under which accommodation type. Use a staffed alternative if the answer remains vague.",
        ],
        [
          "Your passport is lost, expired or badly damaged",
          "The hotel cannot treat a platform label as a replacement for valid identity verification.",
          "Contact 12367 or the local exit-entry authority for the document process and your embassy or consulate where appropriate.",
        ],
      ],
    },
    {
      id: "decision-heading",
      type: "heading",
      level: 2,
      text: "The two checklists to remember",
    },
    {
      id: "two-checklists",
      type: "list",
      ordered: true,
      items: [
        "Before arrival: identify the exact branch, bring the original valid passport, disclose the passport type and arrival time, obtain written property confirmation, save the listing and know the cancellation terms.",
        "At refusal: verify the real cause, ask for the manager, show the official rule only when relevant, open platform support, protect the no-show record, move to a confirmed alternative and preserve receipts.",
        "After everyone is safe: continue the platform case, request the remedy supported by the booking terms, then use 12367, 12345 or 12315 only for the part each channel actually handles.",
      ],
    },
    {
      id: "related-guides",
      type: "internal-links",
      title: "Keep price, location and payment as separate decisions",
      items: [
        {
          label: "Why are hotels in China so cheap?",
          href: "/guides/why-are-hotels-in-china-so-cheap/",
          description: "Compare hotel value and property type without confusing price with passport-registration execution.",
        },
        {
          label: "Where to stay in Beijing on a first trip",
          href: "/guides/beijing-where-to-stay-first-trip/",
          description: "Choose the Beijing area after understanding the nationwide check-in rule.",
        },
        {
          label: "How to pay in China as a tourist",
          href: "/guides/how-to-pay-in-china-as-a-tourist/",
          description: "Prepare a payment backup for deposits, replacement bookings and an unexpected late arrival.",
        },
      ],
    },
    {
      id: "light-help",
      type: "callout",
      title: "Need a human check on the stay plan?",
      body: "Send the travel dates, number of travellers, cities, approximate nightly budget, passport nationality and any late arrivals. Homeground can help assess the accommodation type, confirmation questions and recovery risk without turning this into a hotel ranking.",
      tone: "neutral",
    },
    {
      id: "official-sources",
      type: "sources",
      title: "Official sources checked on 11 August 2026",
      items: [
        {
          label: "Seven-department measures to facilitate accommodation for overseas visitors",
          url: "https://www.mofcom.gov.cn/zwgk/zcfb/art/2024/art_10ddb29858c24ece86b3f575bda1d9c4.html",
          publisher: "Ministry of Commerce of the People’s Republic of China and six other departments",
          reviewedAt: "2026-08-11",
        },
        {
          label: "English summary of the 2024 accommodation measures",
          url: "https://english.www.gov.cn/news/202407/26/content_WS66a2d827c6d0868f4e8e975c.html",
          publisher: "State Council website / Xinhua News Agency",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Government response on hotels refusing overseas guests for lack of foreign-related qualifications",
          url: "https://www.gov.cn/hudong/202405/content_6952770.htm?show_loading=0&webview_progress_bar=1",
          publisher: "China Government Network; response by the Ministry of Public Security, Ministry of Commerce and National Immigration Administration",
          reviewedAt: "2026-08-11",
        },
        {
          label: "2026 policy interpretation of hotel and non-hotel accommodation registration",
          url: "https://en.nia.gov.cn/n147418/n147463/c197328/content.html",
          publisher: "National Immigration Administration",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Beijing guide distinguishing hotel and non-hotel accommodation registration",
          url: "https://english.beijing.gov.cn/livinginbeijing/applicationfordocuments/202107/t20210719_2439278.html",
          publisher: "People’s Government of Beijing Municipality",
          reviewedAt: "2026-08-11",
        },
        {
          label: "Official 12315 consumer complaint route",
          url: "https://www.samr.gov.cn/hd/xfzn/art/2022/art_9d22351e9bee4da38b89c15e843207b4.html",
          publisher: "State Administration for Market Regulation",
          reviewedAt: "2026-08-11",
        },
        {
          label: "State Council guidance on the boundary between 12345 and 110",
          url: "https://www.beijing.gov.cn/zhengce/gwywj/202205/t20220516_2711529.html",
          publisher: "General Office of the State Council via the People’s Government of Beijing Municipality",
          reviewedAt: "2026-08-11",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
