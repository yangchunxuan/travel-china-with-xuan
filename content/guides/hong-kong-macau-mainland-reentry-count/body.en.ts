import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";
const tourHK = "beijing-xian-guilin-hong-kong-10-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "answer-first", type: "lead", text: "Yes, it counts. Leaving mainland China for Hong Kong or Macau ends your mainland stay, and coming back through mainland border inspection is a new entry, even on the same day. On a single-entry visa, that entry is used up. On China's 30-day visa-free policy, entries are not limited, so coming back is a new visa-free entry with its own 30 days, provided you still qualify when you arrive; for most countries the policy currently runs until 31 December 2026. Hong Kong and Macau check you separately, under their own rules."},
    {
      id: "jurisdiction-heading",
      type: "heading",
      level: 2,
      text: "Treat the mainland, Hong Kong and Macao as three admission checks",
    },
    {
      id: "jurisdiction-explainer",
      type: "paragraph",
      text: "They are all parts of China, but they do not share one visitor-admission record. At a mainland–Hong Kong or mainland–Macao boundary, you complete mainland exit or entry inspection and the relevant SAR's clearance. A Chinese mainland visa does not itself admit you to Hong Kong or Macao, and permission to visit either SAR does not give you a mainland entry.",
    },
    {
      id: "crossing-map",
      type: "table",
      caption: "What each direct crossing does to the mainland count",
      columns: ["Actual movement", "Mainland count", "What must be checked"],
      rows: [
        ["Mainland → Hong Kong", "One mainland exit", "Hong Kong admission for your passport or travel document"],
        ["Hong Kong → Mainland", "One new mainland entry", "An unused, unexpired mainland entry basis"],
        ["Mainland → Macao → Mainland", "One exit plus one new entry", "Macao admission and permission to re-enter the mainland"],
        ["Hong Kong → Macao by direct ferry or bridge shuttle", "No mainland entry", "Separate Hong Kong departure and Macao arrival requirements"],
        ["Hong Kong → Shenzhen → Zhuhai → Macao", "One mainland entry and one mainland exit", "Mainland permission is needed for the overland middle section"],
        ["International airside connection without mainland immigration", "Normally no mainland entry", "Confirm that the airport and itinerary allow you to remain in the transit area"],
      ],
    },
    {
      id: "route-line-heading",
      type: "heading",
      level: 2,
      text: "Draw the route by jurisdictions, not by hotel nights",
    },
    {
      id: "route-line-explainer",
      type: "paragraph",
      text: "Write every place in order and place a vertical mark whenever immigration control changes. Shanghai → Hong Kong → Shenzhen contains two mainland stays: the first ends on departure for Hong Kong, and the second begins at Shenzhen border inspection. The number of nights in Hong Kong, the transport mode and whether both mainland cities are on one holiday do not combine those stays.",
    },
    {
      id: "route-examples",
      type: "table",
      caption: "Worked route sketches",
      columns: ["Itinerary", "Mainland arrivals to justify", "Planning consequence"],
      rows: [
        ["Home → Beijing → Hong Kong → Home", "One", "No mainland re-entry after Hong Kong"],
        ["Home → Beijing → Hong Kong → Shanghai → Home", "Two", "A single-entry visa alone does not cover both mainland stays"],
        ["Home → Hong Kong → Shenzhen → Macao → Home", "One", "Check Hong Kong, mainland and Macao admission separately"],
        ["Home → Shanghai → Macao → Zhuhai → Hong Kong → Home", "Two", "Macao → Zhuhai starts the second mainland stay"],
        ["Hong Kong → Macao direct → Hong Kong", "Zero", "This does not enter the mainland if the route stays outside mainland immigration"],
      ],
    },
    {
      id: "entry-basis-heading",
      type: "heading",
      level: 2,
      text: "Match every mainland arrival to one valid entry basis",
    },
    {
      id: "entry-basis-table",
      type: "table",
      caption: "What common documents and policies do—and do not—cover",
      columns: ["Entry basis", "How to count it", "Critical check before travel"],
      rows: [
        ["Single-entry mainland visa", "The permitted entry is used when you enter the mainland", "After a mainland exit, the same used entry does not become available again"],
        ["Double-entry mainland visa", "Up to two mainland entries while the visa remains valid", "Confirm that the second entry is unused and occurs before the enter-before deadline"],
        ["Multiple-entry mainland visa", "Repeated entries within the printed validity and conditions", "Validity, passport details and permitted duration of each stay still matter"],
        ["Valid foreigner's residence permit", "May provide multiple mainland entries without a separate visa", "Verify that the permit and linked passport details remain valid for the return"],
        ["Visa-free entry", "Eligibility is assessed for the particular arrival", "Recheck passport, purpose, stay limit and current policy for every planned entry"],
        ["Transit without a visa", "A conditional transit admission, not a spare tourist entry", "Nationality, port, permitted area and confirmed onward route to a third country or region must all qualify"],
      ],
    },
    {
      id: "visa-fields-heading",
      type: "heading",
      level: 2,
      text: "Do not confuse entries, validity and duration of stay",
    },
    {
      id: "visa-fields-explainer",
      type: "paragraph",
      text: "A visa's number of entries says how many mainland admissions it can support. Its entry validity says when an unused entry may be used. Its duration of stay limits the stay after each admission. A visa can therefore be unusable because its entries are exhausted even though the printed expiry date is in the future, or because its validity has ended even though an entry appears unused.",
    },
    {
      id: "single-entry-warning",
      type: "callout",
      title: "A side trip does not pause a single-entry stay",
      body: "If you entered the mainland on a single-entry visa and then clear mainland exit inspection for Hong Kong or Macao, that mainland stay has ended. Remaining days from the earlier stay are not a return ticket, and the used entry does not revive when you come back.",
      tone: "warning",
    },
    {id: "visa-free-heading", type: "heading", level: 2, text: "Visa-free travellers: what a side trip does to your 30 days"},
    {id: "visa-free-list", type: "list", items: ["Under China's unilateral visa-free policy, there is no limit on the number of entries or on total days, and each stay runs for 30 days from the day after you enter. A Hong Kong or Macau side trip therefore ends one visa-free stay and the return starts another, if you still qualify on arrival.", "Malaysians enter under a mutual agreement instead, which adds a ceiling: no more than 90 days in China in any 180.", "For most visa-free countries the policy is currently set to run until 31 December 2026. If your trip enters or stays into 2027, check the current official notice, and the airline, before you pay a deposit.", "The border officer still decides each admission, and the purpose must stay within tourism, business, family visits, exchanges or transit."]},
    {
      id: "separate-admission-heading",
      type: "heading",
      level: 2,
      text: "Check Hong Kong and Macao admission separately",
    },
    {
      id: "separate-admission-explainer",
      type: "paragraph",
      text: "Hong Kong's visitor visa or entry-permit requirement depends on nationality and travel-document type. Macao likewise has its own passport-validity, visa or authorization, onward-ticket and admission rules. A mainland visa, a mainland visa-free policy or a through ticket does not replace either SAR's check. Consult the Hong Kong Immigration Department and Macao SAR Government pages for the exact passport before committing to non-refundable transport.",
    },
    {
      id: "sar-checklist",
      type: "list",
      items: [
        "Check the exact passport or travel document—not just country of residence.",
        "Confirm the purpose and permitted length of the SAR visit, including any pre-arrival registration or visa requirement.",
        "Check passport validity, onward or return evidence and any proof of funds required by the relevant authority.",
        "Repeat the check for the second SAR if the itinerary includes both Hong Kong and Macao.",
        "Remember that meeting published conditions does not remove the immigration officer's admission decision.",
      ],
    },
    {
      id: "transit-heading",
      type: "heading",
      level: 2,
      text: "Use transit-without-visa only when the route is genuinely eligible",
    },
    {
      id: "transit-explainer",
      type: "paragraph",
      text: "China's transit policies require movement through the mainland to a third country or region and impose live conditions on passports, ports, tickets and permitted travel areas. Hong Kong or Macao can be an onward region in a qualifying itinerary, but that does not make every mainland–SAR return trip a transit. For example, Hong Kong → mainland → Hong Kong does not show onward travel to a different country or region.",
    },
    {
      id: "transit-checklist",
      type: "list",
      items: [
        "Write origin, mainland entry port, mainland exit port and onward country or region exactly as ticketed.",
        "Check that the passport nationality and both mainland ports are covered by the current policy.",
        "Confirm that all mainland movements remain inside the policy's permitted area and time limit.",
        "Use confirmed onward transport with the required seat and departure details; do not assume separate tickets will be accepted without checking.",
        "Ask the operating carrier and the relevant border-inspection authority when the route is unusual or the documents do not present a clear through journey.",
      ],
    },
    {
      id: "booking-workflow-heading",
      type: "heading",
      level: 2,
      text: "Run this six-step check before paying",
    },
    {
      id: "booking-workflow",
      type: "list",
      ordered: true,
      items: [
        "Draw the full route, including every actual land, rail, ferry and airport transfer.",
        "Mark each mainland entry and exit; do not merge separate mainland stays.",
        "For every mainland arrival, write the exact legal basis and its live conditions.",
        "Check Hong Kong and Macao admission independently for the same passport.",
        "Verify the carrier, border port and connection method, especially if a transfer may require immigration and baggage re-check.",
        "Only then buy the fixed tickets; save the official policy pages and confirmations used for the decision.",
      ],
    },
    {
      id: "document-pack-heading",
      type: "heading",
      level: 2,
      text: "Carry a route evidence pack",
    },
    {
      id: "document-pack",
      type: "list",
      items: [
        "The original passport and any valid mainland visa, residence permit or other entry document relied upon.",
        "Confirmed onward tickets showing dates, ports and the next country or region.",
        "Accommodation details for each jurisdiction and contact details for the operators involved.",
        "Offline copies of the relevant official policy pages and any written answer from an official support channel.",
        "A simple one-line itinerary that makes the sequence of jurisdictions visible to you and, if asked, to the carrier.",
      ],
    },
    {
      id: "common-errors-heading",
      type: "heading",
      level: 2,
      text: "Common route-counting mistakes",
    },
    {
      id: "common-errors",
      type: "list",
      items: [
        "Counting one holiday as one entry even though it contains two separate mainland stays.",
        "Reading the visa expiry date but not checking whether the permitted entries have already been used.",
        "Assuming a same-day Hong Kong or Macao visit does not count as a mainland exit.",
        "Treating a multiple-entry visa as unlimited without checking its validity, linked passport and stay duration.",
        "Using a direct Hong Kong–Macao route on the map while actually booking an overland transfer through Shenzhen or Zhuhai.",
        "Calling any short mainland visit a transit even when origin and onward destination do not meet the third-country-or-region rule.",
        "Checking only mainland permission and discovering too late that Hong Kong or Macao requires separate advance authorization.",
      ],
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "If you discover that the route needs an entry you do not have",
    },
    {
      id: "recovery-explainer",
      type: "paragraph",
      text: "Fix the route before approaching the border. If you are still lawfully in the mainland, the lowest-risk option may be to move Hong Kong or Macao to the end and depart internationally from there, or remove the side trip. If you are already in an SAR, do not assume a visa can be issued there quickly; check lawful stay time, contact the relevant Chinese visa authority and consider departing from that SAR instead of attempting mainland re-entry.",
    },
    {
      id: "recovery-steps",
      type: "list",
      ordered: true,
      items: [
        "Stop further non-refundable bookings and keep proof of your current lawful admission and permitted stay.",
        "Call the China Immigration Service Hotline 12367 or the relevant mainland exit-entry authority for mainland policy questions.",
        "Contact Hong Kong Immigration or Macao immigration for questions about remaining or changing plans in that SAR.",
        "Ask the operating airline, railway or ferry company which reroute it can actually ticket and board.",
        "For a new mainland visa or passport-specific advice, use the responsible Chinese embassy, consulate or visa service channel; allow for refusal and processing time.",
        "Choose a route that remains lawful even if the hoped-for new permission is not issued.",
      ],
    },
    {
      id: "border-warning",
      type: "callout",
      title: "Do not cross out to test whether you can come back",
      body: "A border attempt is not a harmless eligibility check. Carriers may refuse boarding and border authorities make the admission decision. Resolve unclear eligibility through the responsible authorities while you still have a lawful fallback route.",
      tone: "warning",
    },
    {id: "sale-heading", type: "heading", level: 2, text: "End the trip in Hong Kong and there is nothing to re-count"},
    {id: "sale-copy", type: "paragraph", text: "The simplest way to see Hong Kong is to finish there. Our 10-day private tour flies into Beijing, continues through Xi'an and Guilin, and takes the high-speed train to Hong Kong on day 9, so there is one mainland entry and one exit; travellers from the US and other eligible countries who fly in from another country may be able to use 240-hour visa-free transit instead of a tourist visa, with a confirmed onward ticket; the border officer decides on arrival. If your trip runs into 2027, the current visa-free policy ends on 31 December 2026, so check before paying a deposit. The sights on the way still have deadlines. The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time, in each visitor's own passport name, and on 1 October 2025, the first day of China's National Day holiday, its booking page already showed 2 to 7 October fully booked. Hand the booking to us and pay at least 8 days before your visit, and our booking guarantee covers it: if the booking fails, we refund the service fee and the ticket money in full. Inside those 8 days the guarantee no longer applies."},
    { id: "handoff-options", type: "comparison", title: "What we can arrange", columns: [
      { heading: `Beijing to Hong Kong in 10 days: from ${bodyTourPrice(tourHK, 6, "en")} per person`, body: `${bodyTourPrice(tourHK, 2, "en")} per person for two, ${bodyTourPrice(tourHK, 6, "en")} for six. Beijing 3 nights, Xi'an 2, Guilin and Yangshuo 3, Hong Kong 1.`, items: ["Four-star hotels with breakfast, a private guide and car in each mainland city on touring days, the train from Guilin to Hong Kong and every transfer, including West Kowloon station to your Hong Kong hotel and on to the airport.", "If we cannot get your Forbidden City or Tiananmen booking, we refund everything you paid, provided we have your passport details at least 8 days before the Forbidden City visit."] },
      { heading: "A private car and driver in mainland China", body: "A private car to or from the Shenzhen or Zhuhai border crossing, or anywhere else in mainland China (not within Hong Kong or Macau).", items: ["Our own drivers.", "Price confirmed in writing before you pay."] },
      { heading: `Sight bookings: ${bodyReservationFee("en")} per person`, body: "Per attraction, plus the ticket at face value, booked in each traveller's own passport name: the Forbidden City, the Terracotta Warriors, the Chengdu panda base and more.", items: ["Request and pay at least 8 days before your visit and our booking guarantee covers it: if the booking fails, the fee and ticket money are refunded in full.", "Inside those 8 days the guarantee no longer applies."] }
    ] },
    {id: "visa-papers", type: "callout", tone: "decision", title: "Need a visa? Book with us and the paperwork comes with it", body: "When you book a trip with us, we provide the day-by-day itinerary, the hotel bookings and a travel-agency invitation letter for your visa application. If your visa is refused after you have paid the 30% deposit, we refund the deposit in full."},
    {id: "handoff-links", type: "internal-links", title: "Book it with us", items: [{label: "See the Beijing, Xi'an, Guilin and Hong Kong 10-day route", href: "/tours/beijing-xian-guilin-hong-kong-10-day-private-tour/", description: "Day-by-day plan, hotels and the published price table."}, {label: "Ask for an airport or station pickup", href: "/services/private-car-and-driver/", description: "Any mainland city. Send your route, date and luggage."}, {label: "See the attractions we book", href: "/services/china-attraction-reservations/", description: "Release times, prices and the guarantee, attraction by attraction."}, {label: "Plan the whole trip with a planner", href: "/services/full-trip-support/", description: "Tell us your dates and budget; the first brief is free."}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "How booking works", body: "Send your dates, the number of travellers and what you want to see by WhatsApp or email from any page above. A planner replies within 12 hours, and you get a written quote before you pay anything; the same planner stays with you from that first reply to your last day. You pay a 30% deposit by Alipay or VBill and the rest after you arrive; we add no fee. Homeground China is a licensed travel agency (L-BJ10587); the guides and drivers are our own, and we never stop at shops."},
    {
      id: "scope-boundary",
      type: "callout",
      title: "What this guide covers",
      body: "This guide explains how to count jurisdictions and identify the questions that require an official answer. It does not determine eligibility for a particular nationality, visa-free policy, residence status or port. Recheck the exact passport, documents, dates, ports and onward itinerary against current official rules shortly before travel.",
      tone: "neutral",
    },
    {
      id: "faq",
      type: "faq",
      title: "Re-entry questions answered",
      items: [
        {
          question: "Does a day trip to Hong Kong or Macao use up my China visa entry?",
          answer: "For mainland immigration purposes, leaving the mainland for Hong Kong or Macao ends that mainland stay, and coming back through mainland border inspection is a new mainland entry, even after a same-day visit. On a single-entry visa the used entry does not revive when you return.",
        },
        {
          question: "Can I return to mainland China from Hong Kong on a single-entry visa?",
          answer: "Not on the same entry. Once you clear mainland exit inspection for Hong Kong or Macao, that stay has ended, and remaining days from the earlier stay are not a return ticket. The new mainland arrival needs its own valid entry basis, such as another visa entry or an eligible visa-free policy.",
        },
        {
          question: "Does a Chinese mainland visa let me enter Hong Kong or Macao?",
          answer: "No. The mainland, Hong Kong and Macao do not share one visitor-admission record. Hong Kong's visa or entry-permit requirement depends on nationality and travel-document type, and Macao has its own passport-validity, visa, onward-ticket and admission rules; check each separately for the same passport.",
        },
        {
          question: "How do I count mainland entries for a route like Beijing → Hong Kong → Shanghai?",
          answer: "Two. The first mainland stay ends when you depart for Hong Kong, and the second begins at Shanghai border inspection. Write every place in order and mark each point where immigration control changes; a direct Hong Kong → Macao ferry or bridge shuttle adds no mainland entry.",
        },
        {
          question: "Can I use China's 240-hour visa-free transit for a Hong Kong side trip?",
          answer: "Only when the route is genuinely eligible. The transit policies require movement through the mainland to a third country or region, with live conditions on passports, ports, tickets and permitted areas; Hong Kong or Macao can be the onward region in a qualifying itinerary, but that does not make every short mainland visit a transit. Ask the operating carrier and the border-inspection authority when the route is unusual.",
        },, {question: "Does a Hong Kong trip reset China's 30-day visa-free stay?", answer: "Coming back from Hong Kong or Macau is a new mainland entry. The unilateral visa-free policy sets no limit on entries or total days, and each stay runs 30 days from the day after you enter, so the return starts a new 30-day stay if you still qualify on arrival. Malaysians have a 90-days-in-180 ceiling, and the border officer decides each entry."}],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning",
      items: [
        {
          label: "Shenzhen–Hong Kong transport",
          href: "/guides/shenzhen-hong-kong-transport-route/",
          description: "Choose the crossing only after mainland and Hong Kong eligibility is clear.",
        },
        {
          label: "Hong Kong–Macao transport",
          href: "/guides/hong-kong-macau-transport-route/",
          description: "Compare direct routes that do not enter the mainland.",
        },
        {
          label: "Passport names across China bookings",
          href: "/guides/passport-name-across-china-bookings/",
          description: "Keep the same travel-document identity across every leg.",
        },
        {
          label: "Lost passport recovery in China",
          href: "/guides/lost-passport-in-china-exit-recovery/",
          description: "Protect the exit plan if the document changes mid-trip.",
        },
        { label: "Compare Zhuhai and Hengqin for Macau", href: "/guides/guangzhou-macau-transport-route/", description: "Choose Guangzhou South to Zhuhai/Gongbei or Hengqin by your Guangzhou starting point, Macau hotel, luggage, border hours and required spare time." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        {label: "FAQs on visa-free entry: 30 days from the day after entry, no limit on entries or total days, policy end dates", url: "https://www.shanghai.gov.cn/nw17239/20251110/8bf34bf9718842f3ac32d6ea8fa5d9e5.html", publisher: "Shanghai Municipal Foreign Affairs Office", reviewedAt: "2026-10-20"},
        {label: "Department of Consular Affairs notice (3 November 2025): unilateral visa-free policy extended to 31 December 2026", url: "https://bio.visaforchina.cn/BRN4_EN/tongzhigonggao/552376639691034668.html", publisher: "Chinese Visa Application Service Center, reproducing the MFA notice", reviewedAt: "2026-10-20"},
        {label: "FAQs on the China–Malaysia mutual visa exemption: 30 days per entry, 90 days in any 180", url: "https://my.china-embassy.gov.cn/eng/fwzc/lsyw/qz/202508/t20250801_11681401.htm", publisher: "Embassy of the People's Republic of China in Malaysia", reviewedAt: "2026-09-24"},
        {label: "Palace Museum ticketing: release time and real-name rules", url: "https://www.dpm.org.cn/subject_booking/", publisher: "The Palace Museum", reviewedAt: "2026-08-22"},
        {label: "Palace Museum fully booked for 2 to 7 October on the first day of the 2025 National Day holiday", url: "https://www.yicai.com/news/102851899.html", publisher: "Yicai", reviewedAt: "2026-10-19"},
        {
          label: "China visa terms, entries and residence-permit guidance",
          url: "https://cs.mfa.gov.cn/wgrlh/lhqz/",
          publisher: "Department of Consular Affairs, Ministry of Foreign Affairs of China",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Exit and Entry Administration Law of the People's Republic of China",
          url: "https://en.nia.gov.cn/n147418/n147458/c155978/content.html",
          publisher: "National Immigration Administration",
          reviewedAt: "2026-08-13",
        },
        {
          label: "China's 240-hour visa-free transit policy interpretation",
          url: "https://en.nia.gov.cn/n147418/n147463/c183412/content.html",
          publisher: "National Immigration Administration",
          reviewedAt: "2026-08-13",
        },
        {
          label: "China Immigration Service Hotline 12367",
          url: "https://en.nia.gov.cn/n147413/c194788/content.html",
          publisher: "National Immigration Administration",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Hong Kong visit visa and entry-permit requirements",
          url: "https://www.immd.gov.hk/eng/services/visas/visit-transit/visit-visa-entry-permit.html",
          publisher: "Hong Kong Immigration Department",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Immigration clearance of non-residents of Macao",
          url: "https://www.gov.mo/en/services/ps-1474/ps-1474b/",
          publisher: "Macao SAR Government",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Hong Kong–Macao and Hong Kong–Zhuhai bridge shuttle routes",
          url: "https://www.hzmb.gov.hk/en/cross-boundary.html",
          publisher: "Hong Kong–Zhuhai–Macao Bridge Hong Kong Port",
          reviewedAt: "2026-08-13",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
