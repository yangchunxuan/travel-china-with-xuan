import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "answer-first", type: "lead", text: "It depends on how you enter. For a Chinese visa, most visa offices ask for a passport valid at least six months from the application date, with two blank visa pages (some offices ask for more). For China's 30-day visa-free entry, the Foreign Ministry says an ordinary passport must be valid for at least your intended stay. For 240-hour visa-free transit, the National Immigration Administration requires at least three months. Your airline and any transit country can apply their own, stricter check. If the passport is close to any of these limits, or damaged, renew it before you book anything non-refundable."},
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
    {id: "traps-heading", type: "heading", level: 2, text: "Six passport surprises that stop China trips"},
    {id: "traps-list", type: "list", ordered: true, items: ["Using the wrong rule. Six months and two pages is a visa-application baseline; visa-free entry asks for the length of your stay and 240-hour transit for three months. Work out your route first.", "Forgetting the airline. The operating carrier checks documents before you board and can refuse carriage under its own rules, whatever the Chinese policy says.", "Renewing after you book. Real-name bookings are tied to the passport number you booked with: the Forbidden City in each visitor's own passport, trains on 12306, and any visa in the old passport. Renew first, then book.", "Counting the wrong pages. Blank-page rules are local: the Toronto visa centre asks for two, the Chinese Embassy in Azerbaijan publishes four. Open your own office's page.", "Assuming the visa-free policy has no end date. For most visa-free countries it currently runs until 31 December 2026; for a trip that enters or stays into 2027, check the current notice and the airline before you pay a deposit.", "Travelling on a damaged passport. Tears, water damage or a loose page are a document-integrity question that valid dates cannot answer."]},
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
    {id: "sale-heading", type: "heading", level: 2, text: "Passport sorted? Book the parts that use it"},
    {id: "sale-copy", type: "paragraph", text: "Once the passport is settled, its number goes on every real-name booking of the trip, so this is the moment to book them. If you renew later, every one of those bookings has to be redone in the new number. The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time, in each visitor's own passport name, and on 1 October 2025, the first day of China's National Day holiday, its booking page already showed 2 to 7 October fully booked. Hand the booking to us and pay at least 8 days before your visit, and our booking guarantee covers it: if the booking fails, we refund the service fee and the ticket money in full. Inside those 8 days the guarantee no longer applies."},
    {id: "visa-papers", type: "callout", tone: "decision", title: "Need a visa? Book with us and the paperwork comes with it", body: "When you book a trip with us, we provide the day-by-day itinerary, the hotel bookings and a travel-agency invitation letter for your visa application. If your visa is refused after you have paid the 30% deposit, we refund the deposit in full."},
    { id: "handoff-options", type: "comparison", title: "What we can arrange", columns: [
      { heading: `Sight bookings: ${bodyReservationFee("en")} per person`, body: "Per attraction, plus the ticket at face value, booked in each traveller's own passport name: the Forbidden City, the Terracotta Warriors, the Chengdu panda base and more.", items: ["Request and pay at least 8 days before your visit and our booking guarantee covers it: if the booking fails, the fee and ticket money are refunded in full.", "Inside those 8 days the guarantee no longer applies."] },
      { heading: `The whole trip: from ${bodyTourPrice(tour8, 6, "en")} per person`, body: `Our 8-day Beijing, Xi'an and Shanghai private tour is ${bodyTourPrice(tour8, 2, "en")} per person for two and ${bodyTourPrice(tour8, 6, "en")} for six. The 14-day route with Chengdu and Guilin is ${bodyTourPrice(tour14, 2, "en")} per person for two.`, items: ["Four-star hotels with breakfast, a private guide and car on touring days, every transfer, the trains and flights between cities, and the named admissions.", "If we cannot get your Forbidden City or Tiananmen booking, we refund everything you paid, provided we have your passport details at least 8 days before the Forbidden City visit."] },
      { heading: "A private car and driver", body: "Airport and station pickups or a car for the day, in any city in mainland China.", items: ["Our own drivers.", "Price confirmed in writing before you pay."] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "Book it with us", items: [{label: "See the attractions we book", href: "/services/china-attraction-reservations/", description: "Release times, prices and the guarantee, attraction by attraction."}, {label: "See the 8-day Beijing, Xi'an and Shanghai route", href: "/tours/beijing-xian-shanghai-8-day-private-tour/", description: "Day-by-day plan, hotels and the published price table."}, {label: "Plan the whole trip with a planner", href: "/services/full-trip-support/", description: "Tell us your dates and budget; the first brief is free."}, {label: "Ask for an airport or station pickup", href: "/services/private-car-and-driver/", description: "Any mainland city. Send your route, date and luggage."}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "How booking works", body: "Send your dates, the number of travellers and what you want to see by WhatsApp or email from any page above. A planner replies within 12 hours, and you get a written quote before you pay anything; the same planner stays with you from that first reply to your last day. You pay a 30% deposit by Alipay or VBill and the rest after you arrive; we add no fee. Homeground China is a licensed travel agency (L-BJ10587); the guides and drivers are our own, and we never stop at shops."},
    {
      id: "scope-boundary",
      type: "callout",
      title: "What this guide can and cannot decide",
      body: "Official sources were reviewed on 13 August 2026. Visa policies, nationalities, service-centre instructions, carrier checks and transit rules can change. A visa does not guarantee entry: consular authorities decide issuance, carriers decide transport under their rules, and Chinese border inspection decides admission under law. This guide cannot decide an individual application, boarding or entry case.",
      tone: "neutral",
    },
    {
      id: "faq",
      type: "faq",
      title: "Passport validity questions answered",
      items: [
        {
          question: "Does my passport need six months of validity to enter China?",
          answer: "No, not for every route. Many Chinese visa offices publish a six-month and two-blank-page baseline for visa applications, but China's unilateral visa-free FAQ says an eligible ordinary passport must be valid for at least the intended stay, and the 240-hour visa-free transit notice requires a travel document valid for at least three months. Identify your route first, then check its authority and your airline.",
        },
        {
          question: "How many blank pages do I need for a China visa?",
          answer: "It depends on the office. The Toronto visa centre asks for two blank visa pages, while the Chinese Embassy in Azerbaijan publishes four; open your own office's current page rather than choosing the smaller number. A visa-free traveller should not import a blank-page rule from a visa checklist but should still resolve a nearly full passport before travel.",
        },
        {
          question: "Can I travel to China visa-free with five months left on my passport?",
          answer: "The Foreign Ministry FAQ for unilateral visa-free entry requires an ordinary passport valid for at least the intended stay, but the operating airline and any transit country apply their own document checks. Ask the carrier in writing and consider renewal if the buffer is tight.",
        },
        {
          question: "What if I renewed my passport after my Chinese visa was issued?",
          answer: "Ask the visa-issuing authority whether both passports can be used together or whether a transfer or new visa is needed. Compare the passport name, date of birth, nationality and number with the visa and all bookings before travelling.",
        },
        {
          question: "Does a valid Chinese visa mean I will be admitted?",
          answer: "No. Consular authorities decide issuance, carriers decide transport under their rules, and Chinese border inspection decides admission under law. A damaged passport, exhausted entries or an expired Enter Before date can still stop the trip, so inspect the document and its dates before non-refundable travel.",
        },, {question: "Can Homeground help with the documents for a Chinese visa?", answer: "Yes, when you book a trip with us: we provide the day-by-day itinerary, the hotel bookings and a travel-agency invitation letter for your application. If your visa is refused after you have paid the 30% deposit, we refund the deposit in full. The visa office decides the application."}],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue the entry and document plan",
      items: [
        { label: "China travel essentials", href: "/essentials/", description: "Return to the parent collection for practical entry and payment preparation." },
        { label: "Recover from a lost passport in China", href: "/guides/lost-passport-in-china-exit-recovery/", description: "Keep the official replacement and lawful-exit sequence available as a failure fallback." },
        { label: "Check a 240-hour visa-free transit route", href: "/guides/china-240-hour-visa-free-transit-route-check/", description: "Validate the itinerary, port and permitted area for the transit path." },
        { label: "Keep passport names consistent across bookings", href: "/guides/passport-name-across-china-bookings/", description: "Prevent identity mismatches after choosing which passport will be used." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        {label: "Conditions for 240-hour visa-free transit: a travel document valid for at least 3 months (announcement of 3 November 2025)", url: "https://en.nia.gov.cn/n147418/n147468/c187308/content.html", publisher: "National Immigration Administration", reviewedAt: "2026-10-20"},
        {label: "Department of Consular Affairs notice (3 November 2025): unilateral visa-free policy extended to 31 December 2026", url: "https://bio.visaforchina.cn/BRN4_EN/tongzhigonggao/552376639691034668.html", publisher: "Chinese Visa Application Service Center, reproducing the MFA notice", reviewedAt: "2026-10-20"},
        {label: "Palace Museum ticketing: release time and real-name rules", url: "https://www.dpm.org.cn/subject_booking/", publisher: "The Palace Museum", reviewedAt: "2026-08-22"},
        {label: "Palace Museum fully booked for 2 to 7 October on the first day of the 2025 National Day holiday", url: "https://www.yicai.com/news/102851899.html", publisher: "Yicai", reviewedAt: "2026-10-19"},
        { label: "FAQs on Visa-free Entry into China (Consular Affairs, via 领事直通车, 10 November 2025): passport valid for the trip; end dates", url: "https://wb.beijing.gov.cn/home/index/wsjx/202511/t20251111_4271104.html", publisher: "Beijing Municipal Foreign Affairs Office", reviewedAt: "2026-10-20" },
        { label: "Conditions for 240-Hour Visa-Free Transit", url: "https://en.nia.gov.cn/n147418/n147468/c187308/content.html", publisher: "National Immigration Administration", reviewedAt: "2026-08-13" },
        { label: "Exit and Entry Administration Law of the PRC", url: "https://en.nia.gov.cn/n147418/n147458/c155978/content.html", publisher: "National Immigration Administration", reviewedAt: "2026-08-13" },
        { label: "Visa category and passport documents for Toronto applicants", url: "https://www.visaforchina.cn/YTO3_EN/qianzhengyewu/jichuzhishi/banliliucheng/257421912265855019.html", publisher: "Chinese Visa Application Service Center", reviewedAt: "2026-08-13" },
        { label: "Visa Categories and Documents Required, updated May 2026", url: "https://no.china-embassy.gov.cn/eng/lsfw_0/qzyw/202309/t20230905_11138640.htm", publisher: "Embassy of China in Norway", reviewedAt: "2026-08-13" },
        { label: "Guidelines for Visa Applications", url: "https://az.china-embassy.gov.cn/eng/lsfw/qzyw/bzxz/", publisher: "Embassy of China in Azerbaijan", reviewedAt: "2026-08-13" },
        { label: "Administrative Formalities for International Carriage", url: "https://m.airchina.com/c/invoke/ystjnextpage/abroadbackpack14%40pg", publisher: "Air China", reviewedAt: "2026-08-13" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
