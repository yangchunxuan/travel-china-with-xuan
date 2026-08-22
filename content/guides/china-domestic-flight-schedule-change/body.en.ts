import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "Work this sequence when a China domestic flight moves, delays or cancels — and touch no refund button until step five. One: confirm status on the operating carrier's own app, hotline or the airport display, never on a forwarded message alone. Two: save evidence first — screenshot the change notice, photograph the display with something timestamped visible, keep your boarding pass and every receipt. Three: identify who issued your ticket, and whether any connecting flights share its ticket number. Four: note where you are and the cause the carrier officially states; meals, hotels and free changes depend on exactly that combination. Five: compare four exits before choosing one — accept the new flight, take the free involuntary rebooking, take the fee-free involuntary refund, or move this leg to high-speed rail while seats still exist. Six: protect what comes after — hotels, trains, tours, transfers and any international departure. Seven: if channels stall, complain in writing to the carrier, then to CAAC's 12326 platform, and track every case number.",
    },
    {
      id: "triage",
      type: "comparison",
      title: "Which disruption is this?",
      columns: [
        {
          heading: "Advance schedule change",
          items: [
            "A cancellation or new-time notice arrives hours or days out.",
            "Options are widest now — act before seats vanish.",
          ],
        },
        {
          heading: "Delay at origin",
          items: [
            "Meals and hotels depend on whether airline or weather caused it.",
            "Set a trigger time to switch from waiting to refund or rail.",
          ],
        },
        {
          heading: "Cancellation at origin",
          items: [
            "Ask specifically for involuntary change or refund so no fee applies.",
            "If today's last option is gone, decide hotel versus overnight rail deliberately.",
          ],
        },
        {
          heading: "Stopover or diversion",
          items: [
            "Meals and lodging are provided regardless of cause on domestic flights.",
            "Confirm checked-bag status before leaving the transit area.",
          ],
        },
        {
          heading: "Missed connection",
          items: [
            "One ticket number: ask the carrier to rebook the whole remaining journey.",
            "Separate tickets: no automatic protection; contact the second seller immediately.",
          ],
        },
      ],
    },
    {
      id: "verify-status-heading",
      type: "heading",
      level: 2,
      text: "Verify the status through channels you can trust",
    },
    {
      id: "verify-status",
      type: "paragraph",
      text: "Chinese rules require carriers to publish delay and cancellation information within 30 minutes of confirming a status change — with the reason — through their app, website, call centre, SMS, broadcast and airport displays. In practice the operating carrier's own app and the terminal board are the fastest truthful sources; agency notifications arrive later and occasionally garbled. Treat any disruption message arriving by SMS or chat — especially with a link, a compensation offer, or a fee payable to a personal account — as unverified until it matches an official channel; fake disruption notices are a recurring phishing pattern around Chinese holidays.",
    },
    {
      id: "evidence-first-heading",
      type: "heading",
      level: 2,
      text: "Save evidence before touching any button",
    },
    {
      id: "evidence-first",
      type: "list",
      ordered: true,
      items: [
        "Screenshot the original booking and the exact change or cancellation notice with send time, sender and flight number visible.",
        "Photograph the airport display showing your flight delayed or cancelled, with a clock, boarding pass or date in frame.",
        "Keep the e-ticket itinerary with ticket numbers — one ticket number means through-itinerary protection; separate numbers mean separate contracts.",
        "Write down staff statements: time, desk, what was offered or refused, stated reason. Ask for it in writing where possible.",
        "Keep receipts for anything you paid yourself; they support later reimbursement under carrier conditions or insurance.",
        "Do not submit any request labelled “voluntary” until you have confirmed how this disruption will be coded (below).",
      ],
    },
    {
      id: "matrix-heading",
      type: "heading",
      level: 2,
      text: "Responsibility matrix: what the rules require in each situation",
    },
    {
      id: "matrix-note",
      type: "paragraph",
      text: "China's flight regularity provisions and CAAC passenger guidance distinguish situations by place and cause, and the 2026 Civil Aviation Law elevates carriers' duties to publish conditions, announce information, and arrange ticket changes plus meals or lodging. The map below is what travellers need; “carrier” means the operating airline on your boarding pass.",
    },
    {
      id: "responsibility-matrix",
      type: "table",
      caption: "Who owes you what, by place and cause",
      columns: ["Situation", "Meals and lodging", "Rebooking and refund baseline"],
      rows: [
        [
          "Origin disruption, carrier cause (maintenance, crew, deployment)",
          "Provided at the carrier's cost; reason announced within 30 minutes",
          "Free involuntary rebooking, including onto another carrier with consent; fee-free refund of unused segments",
        ],
        [
          "Origin disruption, non-carrier cause (weather, ATC, emergencies, security, passenger)",
          "Carrier assists arranging; passenger pays",
          "Refund stays fee-free under major carriers' conditions; rebooking windows follow each carrier's terms",
        ],
        [
          "Domestic stopover delay or cancellation",
          "Provided regardless of cause",
          "Continue, rebook or refund per conditions; confirm bag status before moving",
        ],
        [
          "Diversion of a domestic flight",
          "Provided regardless of cause",
          "Choose waiting, surface transport or refund; confirm bags before leaving",
        ],
        [
          "Missed connection on one ticket number",
          "Per the rules above while you wait",
          "Carrier rebooks remaining sectors free, endorsing to others with consent — ask for the whole journey in one request",
        ],
        [
          "Separately issued second ticket missed",
          "At your own cost unless a rule above applies",
          "No automatic protection; ask the second seller for goodwill options; keep documents for a later claim against the first carrier",
        ],
      ],
    },
    {
      id: "voluntary-heading",
      type: "heading",
      level: 2,
      text: "Do not tap “voluntary refund” before checking how the change is coded",
    },
    {
      id: "voluntary-intro",
      type: "paragraph",
      text: "The same disruption can travel two pipelines. Coded involuntary — airline-caused, or flagged as a schedule change in an agency's flow — it triggers fee-free changes and refunds under the carrier's conditions. Coded voluntary, your fare's own rules apply and fees follow. Systems label this inconsistently: an agency screen may show a refund fee until the airline's irregular-flight code reaches it, and tapping “apply for refund” at the wrong moment can convert your case into a voluntary one.",
    },
    {
      id: "voluntary-check",
      type: "list",
      ordered: true,
      items: [
        "Ask the app, hotline or counter to confirm in writing that your case is processed as involuntary because of the disruption.",
        "If a fee appears on an agency screen, pause and contact support: platforms often show zero fee once an airline-caused change registers, but the airline makes the final call.",
        "Check which rebooking window applies before accepting a new date — published windows differ between carriers (see below).",
        "Never become a no-show while a change or refund request is open; silent abandonment is treated as voluntary and can void remaining value.",
        "If you already accepted one alternative, further changes may fall back to voluntary rules. Compare first, then commit once.",
      ],
    },
    {
      id: "coding-callout",
      type: "callout",
      tone: "warning",
      title: "Not all carriers use the same windows",
      body: "Verified conditions of carriage differ where it matters. China Eastern limits free involuntary rebooking to flights within three days either side of the original. China Southern allows domestic changes within seven days including the departure day, and adds a second fee-free change in five listed situations such as family members split across flights or a connection longer than 240 minutes. Air China grants one free involuntary change covering adjacent connecting flights without publishing a day window. Assume nothing uniform: ask staff which window applies to you.",
    },
    {
      id: "who-heading",
      type: "heading",
      level: 2,
      text: "Airline, agency, ground staff: who actually handles what",
    },
    {
      id: "who-table",
      type: "table",
      caption: "Four parties, four different levers",
      columns: ["Party", "What they handle", "Practical limits"],
      rows: [
        [
          "Operating carrier",
          "Flight decisions; 30-minute announcements; meals and lodging per the matrix; written certificates on request; rebooking on its own flights",
          "Hotlines saturate in mass disruptions; endorsement needs the receiving carrier's consent",
        ],
        [
          "Ticket issuer (airline shop, agency or OTA)",
          "Payment-side refund and change processing; relaying notices; submitting involuntary-case requests",
          "Cannot create seats or override the airline's coding; may add service fees; keep its case number separate from the airline's",
        ],
        [
          "Airport counters and ground handlers",
          "Same-day rebooking execution, meal and hotel arrangements, confirming the disruption on documents",
          "Act only for the carrier they serve; payment refunds route back to the original seller",
        ],
        [
          "Downstream providers on separate contracts",
          "Their own change rules for their own tickets — hotels, trains, tours, separately issued flights",
          "One carrier's remedy never rewrites another contract — notify each provider yourself, early",
        ],
      ],
    },
    {
      id: "who-close",
      type: "paragraph",
      text: "Two consequences follow. Work two channels in parallel — the carrier for services and status, the issuer for money. And put every refusal in words: “the counter cannot process refunds for agency tickets; here is what it can do” is progress you can act on, silence is not. If a written delay or cancellation certificate may matter later, demand it explicitly — regulations require prompt provision on request. Air China's conditions state such certificates are not themselves the basis for service decisions, and China Eastern issues self-service ones for up to two years after the flight. If you dispute a stated cause, CAAC's 12326 platform verifies it; confirmed errors must be reissued within seven days of your request.",
    },
    {
      id: "tarmac-heading",
      type: "heading",
      level: 2,
      text: "Held on board? Time-based floors exist",
    },
    {
      id: "tarmac",
      type: "paragraph",
      text: "Once doors close, tarmac-delay rules apply regardless of cause: crews must update passengers roughly every 30 minutes, provide food and water when the onboard hold reaches two hours, and arrange disembarkation at three hours with no definite take-off time and safety permitting. These are floors, not targets — boarding a visibly delayed aircraft without a realistic slot justifies asking about the hold duration and onward plan first.",
    },
    {
      id: "rail-heading",
      type: "heading",
      level: 2,
      text: "When switching to high-speed rail beats waiting",
    },
    {
      id: "rail-intro",
      type: "paragraph",
      text: "There is no universal “under N hours take the train” rule, and repeating one from forums gets people stranded. Compare complete alternatives door to door, tonight, with your bags and your next commitment attached:",
    },
    {
      id: "rail-table",
      type: "table",
      caption: "Door-to-door test before abandoning the queue",
      columns: ["Compare", "Ask yourself", "Why it swings"],
      rows: [
        [
          "Door-to-door arrival time",
          "New flight departure plus airport transfers, versus train plus city-centre station",
          "An earlier departure can still deliver you later than rail",
        ],
        [
          "Seats that exist now",
          "Is the train actually bookable on 12306 while the flight seat is only promised?",
          "A confirmed seat outranks a possible one in mass disruptions",
        ],
        [
          "Where you stand",
          "Distance to the rail station versus staying airside",
          "Crossing a jammed megacity erases nominal advantages",
        ],
        [
          "Money certainty",
          "Has the fee-free involuntary refund been confirmed, or is rebooking still pending?",
          "Secure refund or documented credit first; never hold both outcomes open on one ticket",
        ],
        [
          "Last connection tonight",
          "Last usable train versus last rebooked flight, including arrival-side transport",
          "Missing both strands means an unplanned hotel anyway",
        ],
        [
          "Bags and mobility",
          "Checked bags committed to the aircraft versus dragging them through stations",
          "Bag reclaim adds hours the timetable does not show",
        ],
        [
          "Onward promises",
          "What did you already tell tomorrow's hotel, guide or family?",
          "Rail often protects a fixed next-morning commitment better than a rolling delay",
        ],
      ],
    },
    {
      id: "rail-close",
      type: "paragraph",
      text: "If rail wins, buy the ticket, then close the flight side cleanly: confirm the involuntary refund amount in writing or accept the documented credit, and keep both receipts. Foreign passports work on 12306 and at station gates, but verification steps differ from ID cards — the first-time rail guide below covers them.",
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "Five situations, worked through",
    },
    {
      id: "scenario-ahead-heading",
      type: "heading",
      level: 3,
      text: "A cancellation notice arrives the day before",
    },
    {
      id: "scenario-ahead",
      type: "paragraph",
      text: "You are not at the airport yet — use that distance. Verify the cancellation on the carrier's own app first; advance-notice scams circulate in peak seasons. Then contact the issuing channel while options are widest: earlier flights, rebooking within the carrier's window, fee-free involuntary refunds, or rail seats before they sell. If an agency holds the ticket, open a written case with its support line at once. Check now whether connecting flights on the same ticket number need rebooking together — ask for the whole remaining journey in one request.",
    },
    {
      id: "scenario-airport-heading",
      type: "heading",
      level: 3,
      text: "Cancelled at the airport for a carrier reason",
    },
    {
      id: "scenario-airport",
      type: "paragraph",
      text: "Maintenance, crew or scheduling failures are carrier causes: meals and accommodation are owed at the airline's cost, with free involuntary rebooking or refund. Work the counter and the app in parallel — they queue differently. Ask explicitly for “involuntary” processing, and if today's last realistic departure is gone, decide the night deliberately: arranged airport hotel, or refund plus an early train if that protects tomorrow better. Before leaving the counter, have staff confirm on paper or in the app that a carrier-cause cancellation occurred and your case exists — that record unlocks everything downstream.",
    },
    {
      id: "scenario-weather-heading",
      type: "heading",
      level: 3,
      text: "Weather delay at the origin",
    },
    {
      id: "scenario-weather",
      type: "paragraph",
      text: "Weather, air traffic control and similar causes flip the accommodation rule: the carrier must help arrange meals and lodging, but you pay. Decide early instead of drifting with each new estimated time. Set a trigger — when the delay has eaten the trip's purpose, or when tonight's last usable train is about to sell — and act on it: fee-free involuntary refund still applies under the major carriers' conditions, and rail often wins once queues form. During large-scale disruptions the airport operator must coordinate and disperse passengers; trust official announcements over rumour chains. If you board and hold, remember the two-hour food floor and three-hour disembarkation threshold.",
    },
    {
      id: "scenario-stopover-heading",
      type: "heading",
      level: 3,
      text: "Stranded mid-route at a stopover or after a diversion",
    },
    {
      id: "scenario-stopover",
      type: "paragraph",
      text: "Domestic flights delayed or cancelled at a stopover, and diversions, oblige the carrier to provide meals and lodging regardless of cause — the strictest service tier in Chinese rules. Two traps remain. Checked bags may be held airside or forwarded without you: confirm their status before leaving the transit area, and photograph bag tags. And onward decisions compress: whether you wait, take surface transport, or abandon the leg, get the carrier to state in writing what it has arranged and what it will refund. Keep every receipt even where the carrier pays.",
    },
    {
      id: "scenario-intl-heading",
      type: "heading",
      level: 3,
      text: "A domestic delay threatens a separately booked international flight",
    },
    {
      id: "scenario-intl",
      type: "paragraph",
      text: "This is the highest-stakes version, because the international ticket has no protection from the domestic disruption. Split the work. On the domestic side, push for the earliest arrival: endorsement to another carrier, different routing, or overnight rail plus a morning flight. On the international side, call its own airline before check-in closes — some apply goodwill changes or paid same-day switches; none owe you anything automatic, and fees vary by fare family. Document everything: times, stated reasons, receipts. Chinese law makes carriers liable for delay damage unless they prove all reasonable measures, with a 21-day objection window and two-year litigation limit. A claim is possible but never guaranteed — protecting the international departure itself outranks optimising the domestic leg.",
    },
    {
      id: "downstream-heading",
      type: "heading",
      level: 2,
      text: "Protect what comes after the flight",
    },
    {
      id: "downstream-list",
      type: "list",
      items: [
        "Hotels: shift or cancel before the same-day cutoff; prepaid nights may become a documented loss worth claiming, not a silent abandonment.",
        "Separate train tickets: 12306 change-and-refund rules differ from airlines' — check before buying replacements.",
        "Tours, guides, transfers and attraction tickets: message providers early; many hold slots for guests who communicate before the deadline, few forgive silence.",
        "International departures: recalculate the whole chain backward from the airline's check-in deadline, not your planned arrival.",
        "Keep every mitigation receipt in one dated folder — it is the evidence spine for reimbursement requests and claims.",
      ],
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "When things stall: six common failures and the way through",
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "Recovery moves when a channel stops working",
      columns: ["Failure", "Do this"],
      rows: [
        [
          "Airline app and agency screen disagree — agency caches lag, or the irregular code has not propagated",
          "Treat the carrier's channel as authoritative; screenshot both with times; require the agency to state its source in writing",
        ],
        [
          "Counter says “contact whoever sold the ticket” — true only for payment; information, meals, lodging and certificates stay carrier-side duties",
          "Have the counter do what it can (same-day rebooking, disruption confirmation); route money questions to the issuer with both case numbers",
        ],
        [
          "Refund approved but not arriving — processing runs seller-side then bank-side; China Southern commits to seven working days excluding bank time; platforms quote about fifteen business days for cards",
          "Record the promise made to you, chase the issuer's written status, then use the payment-dispute path if the deadline passes",
        ],
        [
          "No Chinese phone number — some hotlines and SMS flows assume a local number",
          "Use app and web self-service, e-ticket contact numbers, your hotel concierge, and CAAC's www.12326.cn online real-name submission",
        ],
        [
          "No reasonable flight left today — queues guard seats that may not exist",
          "Decide hotel versus overnight rail with the door-to-door test; claim arranged accommodation first when the cause is carrier-side at origin; keep receipts either way",
        ],
        [
          "Certificate not issued immediately — delay certificates generate after actual departure; self-service windows can run two years",
          "Apply via app after landing; use airport counters during the event; dispute wrong stated causes via 12326 — errors reissue within seven days of request",
        ],
      ],
    },
    {
      id: "privacy-heading",
      type: "heading",
      level: 2,
      text: "An evidence list that stays private",
    },
    {
      id: "privacy-save",
      type: "paragraph",
      text: "Keep one untouched master folder with everything, then a short redacted copy per recipient. The master holds: booking confirmation and e-ticket itinerary, the disruption notice, display-board photos, staff statements with times, agency chats, receipts, and any certificate. The working copy contains only what its recipient needs to act.",
    },
    {
      id: "privacy-redact",
      type: "list",
      items: [
        "Never post or send publicly: passport scans or numbers, full card details, boarding-pass barcodes or QR codes, home addresses, or an itinerary exposing tonight's bed.",
        "When asking anyone to review your case, share facts, not identity: carrier, flight number, date, disruption type, stated cause, what was offered or refused, amounts.",
        "Provide identity documents only through an organisation's own authenticated channel — app form, logged-in case system, staffed counter — never chat apps, email attachments or social media.",
        "Cover fellow travellers' data before sharing; a shared booking implies no consent.",
        "Treat any “customer service” account that contacts you first asking for codes, card photos or fees as hostile until verified through published channels.",
      ],
    },
    {
      id: "escalate-heading",
      type: "heading",
      level: 2,
      text: "Complain and track in the right order",
    },
    {
      id: "escalate-steps",
      type: "list",
      ordered: true,
      items: [
        "Open written cases with the carrier and your ticket issuer separately: one sentence of fact, one of request, evidence attached, case numbers demanded.",
        "Give first lines their regulatory room — acknowledgement within seven days, substantive reply within ten for domestic respondents. Chase in writing; daily calls reset nothing.",
        "Escalate to CAAC's Consumer Affairs Center via www.12326.cn or hotline 12326: real name required, within six months, with a specific request. Acceptance is decided within seven working days; respondents post results within ten working days of referral.",
        "Unsatisfied? Request mediation within ten working days of that result; it completes within twenty. Beyond that lie arbitration and courts — note the two-year litigation limit and 21-day objection window for delay-damage claims.",
        "Report any later refund or settlement to every open case so overlapping claims close cleanly.",
      ],
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "Questions travellers actually ask mid-disruption",
    },
    {
      id: "faq-hotel-heading",
      type: "heading",
      level: 3,
      text: "Does the airline have to pay for my hotel?",
    },
    {
      id: "faq-hotel",
      type: "paragraph",
      text: "It depends on place and cause, not on how long you complain. At the origin, the airline pays for meals and lodging when its own failure caused the disruption; for weather, air traffic control and similar causes it must help arrange them but you pay. At a domestic stopover or after a diversion, meals and lodging are provided regardless of cause. During mass disruptions airports coordinate arrangements, and special announcements sometimes add options — check official airport channels rather than assuming either extreme.",
    },
    {
      id: "faq-comp-heading",
      type: "heading",
      level: 3,
      text: "Am I owed fixed compensation like European passengers get?",
    },
    {
      id: "faq-comp",
      type: "paragraph",
      text: "No foreign compensation regime applies automatically to Chinese domestic flights, and Chinese rules set no statutory payout: each carrier's conditions must state whether delay compensation exists and on what terms. As examples of genuinely published rules, three major carriers each define tiers of ¥200 for four-to-eight-hour delays and ¥400 beyond — with different triggers. One requires the ticket bought before the delay plus actual boarding; another measures arrival delay for passengers who flew; another counts commercial causes among carrier failures. Read the operating carrier's current conditions; treat forum claims of guaranteed cash as noise.",
    },
    {
      id: "faq-cert-heading",
      type: "heading",
      level: 3,
      text: "Do I need a delay certificate to get my refund?",
    },
    {
      id: "faq-cert",
      type: "paragraph",
      text: "Not for the involuntary refund or rebooking itself: regulations require carriers to process those for disrupted flights, and at least one major carrier states its certificate is not the basis for such services. The certificate matters elsewhere — insurers, employers, downstream providers — so request it if anyone may ask. Apply through the carrier's app after the flight operates, use airport counters during the event, and dispute a wrong stated cause via 12326 verification; confirmed errors reissue within seven days.",
    },
    {
      id: "faq-sep-heading",
      type: "heading",
      level: 3,
      text: "My connecting flight was on a separate ticket — what can the first airline do about it?",
    },
    {
      id: "faq-sep",
      type: "paragraph",
      text: "Nothing automatic: the second ticket is its own contract with its own carrier. What remains is a possible damage claim — Chinese law makes the delaying carrier liable for losses caused by delay unless it proves it took all reasonable measures, claimed within twenty-one days in writing. Travellers do recover costs this way sometimes, but outcomes are uncertain and depend on evidence discipline from minute one. That asymmetry is why experienced planners protect fragile connections structurally — protected through tickets, buffers, positioning nights — rather than trusting remedies afterwards.",
    },
    {
      id: "dynamic-boundary",
      type: "callout",
      tone: "warning",
      title: "Recheck the moving parts near travel",
      body: "Airline conditions, agency flows, airport procedures and complaint timelines are revised regularly; conditions cited here were reviewed in August 2026 and differ between airlines. Verify the operating carrier's current conditions for your date. This guide explains traveller-facing rules and published carrier conditions; it is not legal advice.",
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "What this guide covers",
      body: "One task: deciding what to do when a China domestic flight you already hold changes, delays, cancels, strands you en route or breaks a connection — who handles what, evidence, hotels versus rail, and escalation. It does not compare fares before purchase, judge whether separate tickets are worth buying, plan ordinary transfers, handle lost baggage, cover international-flight regimes, rank airlines or predict punctuality.",
    },
    {
      id: "more-planning",
      type: "internal-links",
      title: "Related planning guides",
      items: [
        {
          label: "Read fare rules before you need them",
          href: "/guides/china-domestic-flight-fare-bundle-baggage/",
          description: "The change and refund conditions attached to your fare decide how gentle a voluntary fallback is — compare them at purchase, not mid-disruption.",
        },
        {
          label: "Understand separate-ticket risk before buying",
          href: "/guides/china-separate-flight-tickets-self-transfer-risk/",
          description: "Why separately issued flights break protection, and how to price the recovery gap in advance.",
        },
        {
          label: "Build the full dispute evidence pack",
          href: "/guides/china-booking-dispute-evidence-pack/",
          description: "When a refund stalls or parties blame each other, extend this guide's flight evidence into a complete order-and-payment case.",
        },
        {
          label: "Ride high-speed rail as a confident replacement",
          href: "/guides/china-high-speed-train-first-time-guide/",
          description: "Booking, passport gates, station navigation and changes when rail becomes your recovery leg.",
        },
        {
          label: "Design routes that survive without flights",
          href: "/guides/china-rail-only-route/",
          description: "If disruption risk dominates your itinerary, build the corridor on rails from the start.",
        },
        {
          label: "Protect the night before an international flight",
          href: "/guides/china-last-night-before-international-flight/",
          description: "Positioning decisions that keep a domestic disruption away from your international departure.",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        {
          label: "CAAC air-travel knowledge: irregular flights (delay, cancellation, diversion duties)",
          url: "https://www.caac.gov.cn/INDEX/HLFW/HKLXCS/202303/t20230316_217596.html",
          publisher: "Civil Aviation Administration of China",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Provisions on the Administration of Flight Regularity (English translation, MOT Order No. 56 of 2016)",
          url: "https://www.caac.gov.cn/English/Regulations/CCAR/202303/P020230331321500699645.pdf",
          publisher: "Ministry of Transport / CAAC",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Civil Aviation Law of the PRC, effective 1 July 2026 (Arts. 132, 134–136, 140, 142–143, 152–156, 251)",
          url: "https://www.caac.gov.cn/XXGK/XXGK/FLFG/202512/t20251227_229597.html",
          publisher: "Civil Aviation Administration of China",
          reviewedAt: "2026-08-22",
        },
        {
          label: "CAAC air-travel knowledge: complaints and rights protection (12326 platform scope and timelines)",
          url: "https://www.caac.gov.cn/INDEX/HLFW/HKLXCS/202303/t20230316_217603.html",
          publisher: "Civil Aviation Administration of China",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Air China general conditions of carriage for passengers and baggage (April 2026 edition)",
          url: "https://www.airchina.com.cn/cn/trans_conditions/general202309.shtml",
          publisher: "Air China",
          reviewedAt: "2026-08-22",
        },
        {
          label: "China Eastern general conditions for passengers and baggage (January 2026 edition)",
          url: "https://www.ceair.com/global/static/Announcement/TravelTips/dsGeneralCondition/chinaEasternLuggageRules/domesticRules/202108/W020260119333307070958.pdf",
          publisher: "China Eastern Airlines",
          reviewedAt: "2026-08-22",
        },
        {
          label: "China Eastern self-service irregular-flight certificate and refund-change page",
          url: "https://www.ceair.com/self-service/before/refund-change-nonormal",
          publisher: "China Eastern Airlines",
          reviewedAt: "2026-08-22",
        },
        {
          label: "China Southern general conditions of carriage, domestic transport (current full text)",
          url: "https://www.csair.com/newh5/cn/tourguide/booking/orders/order/gnysztj/",
          publisher: "China Southern Airlines",
          reviewedAt: "2026-08-22",
        },
        {
          label: "Trip.com official guide: flight refunds and airline-caused cancellations",
          url: "https://www.trip.com/guide/info/flight-refund.html",
          publisher: "Trip.com",
          reviewedAt: "2026-08-22",
        },
      ],
    },
  ],
} satisfies StructuredPageBody;

export default body;
