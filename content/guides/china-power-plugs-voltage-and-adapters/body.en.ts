import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "lead", type: "lead", text: "Mainland China runs on 220 V at 50 Hz, and its sockets take Type A (two flat pins), Type C (two round pins) and Type I (three angled flat pins). Most phone, tablet, camera and laptop chargers are labelled 100–240 V, so they need only a plug adapter if the pins do not fit. A device labelled only 110 V or 120 V, such as many American and Japanese hair tools, needs a voltage converter or a replacement: a plug adapter changes the shape, not the voltage. From the UK, Singapore, Malaysia or Hong Kong (Type G), bring an adapter."},
    { id: "answer", type: "callout", title: "The 30-second answer", tone: "decision", body: "Read the INPUT line on every charger. If its range includes 220V and 50Hz, solve only the plug shape. If it does not include 220V, do not connect it directly. If there is no readable label, the safe answer is not to guess—check the exact model with the manufacturer or leave it at home." },
    { id: "two-questions-heading", type: "heading", level: 2, text: "Adapter and converter answer two separate questions" },
    { id: "two-questions-table", type: "table", caption: "Choose from the device label, not your home country", columns: ["What you see", "What it means", "What to pack"], rows: [
    ["INPUT 100–240V, 50/60Hz", "The power supply accepts China's voltage and frequency", "A shape adapter if its plug does not fit; no voltage converter"],
    ["INPUT 220–240V, 50Hz", "Electrically compatible with mainland supply", "A shape adapter if needed"],
    ["INPUT 110V or 120V only", "Not compatible with 220V supply", "A properly rated voltage converter or a different appliance"],
    ["220/240V switch on the appliance", "It may be dual-voltage but requires a manual setting", "Set it correctly while unplugged, then use a suitable adapter"],
    ["Label missing, damaged or ambiguous", "Compatibility cannot be established", "Manufacturer confirmation or a replacement device"]
  ] },
    { id: "socket-heading", type: "heading", level: 2, text: "Expect Type A, C and I—but do not plan around one hotel socket" },
    { id: "socket-copy", type: "paragraph", text: "Shanghai government guidance lists Type A, C and I plugs, while CAAC visitor guidance describes flat two-pin and angled three-pin sockets. In practice, hotels and transport hubs may use multi-standard outlets, USB outlets or a different mix. A North American or Japanese Type A plug may fit a flat two-pin socket, but physical fit says nothing about voltage. A European Type C charger is often straightforward, yet a heavy plug can sit loosely in a worn universal socket. Australian and New Zealand Type I plugs resemble the angled format, but a grounded appliance still needs secure contact and the correct rating." },
    {
    "id": "singapore-malaysia-plug-heading",
    "type": "heading",
    "level": 2,
    "text": "Coming from Singapore or Malaysia with a Type G plug?"
  },
    {
    "id": "singapore-malaysia-plug-answer",
    "type": "paragraph",
    "text": "Pack an adapter that accepts your three rectangular Type G pins and fits the mainland Chinese socket you will use; do not rely on every hotel having a universal socket. Check the charger itself: INPUT 100–240V, 50/60Hz covers China’s supply, so a compatible charger needs only the shape adapter. The home country or a familiar-looking plug is not proof for every appliance. Preserve any required earth connection, stay within the adapter’s rating and do not force the pins."
  },
    { id: "socket-warning", type: "callout", title: "A universal socket is not a universal safety guarantee", tone: "warning", body: "Stop using an outlet if the adapter hangs out, pins remain exposed, it sparks, crackles, smells hot or cannot hold the plug without pressure. Move to another outlet and ask the accommodation to inspect it. Never bend pins, wedge paper around a plug or stack several loose adapters." },
    {id: "traps-heading", type: "heading", level: 2, text: "Five charging mistakes travellers make in China"},
    {id: "traps-list", type: "list", ordered: true, items: ["Packing a 110 V hair tool. Many hair dryers and straighteners from the US and Japan are 110–120 V only; on 220 V they can burn out in seconds. Check the label, or use the hotel's.", "Reading OUTPUT instead of INPUT. The OUTPUT line describes what goes to your phone; only the INPUT line tells you whether the charger accepts 220 V.", "Trusting a worn universal socket. Hotel multi-standard sockets are often loose, and a heavy Type G adapter can drop out overnight. Use the firmest socket in the room.", "Charging the power bank but not checking it. Since 28 June 2025, power banks without a clear CCC mark, and recalled models, are not allowed on flights within China; an imported power bank often has no CCC mark.", "Arriving with a flat phone. In China your phone is your wallet, map and booking record: no battery means no QR payment and no ride-hailing app at the airport."]},
    { id: "label-heading", type: "heading", level: 2, text: "How to read a charger without confusing input and output" },
    { id: "label-list", type: "list", ordered: true, items: [
    "Unplug the device and find INPUT on the power brick, charger base or appliance plate. OUTPUT describes what the charger sends to the phone or laptop and does not prove that the charger accepts 220V.",
    "Read the entire range. A dash in 100–240V means the charger accepts values across that range; a label listing only 120V does not.",
    "Check frequency as well as voltage. 50/60Hz covers China's 50Hz supply. Equipment with motors, timers or frequency-dependent controls needs manufacturer confirmation even when voltage is handled.",
    "Check watts or amps on the appliance and the maximum rating of every adapter, converter and extension in the chain. The lowest-rated component is the limit.",
    "Look for the double-square symbol only as an indication of double insulation; do not treat a two-pin adapter as a way to remove a grounding requirement from a grounded appliance."
  ] },
    { id: "device-heading", type: "heading", level: 2, text: "The device category changes the risk" },
    { id: "device-table", type: "table", caption: "Practical choice by equipment type", columns: ["Equipment", "Usual planning route", "Extra check"], rows: [
    ["Phone, tablet, camera or laptop charger", "Most modern models are wide-input, but verify the printed label", "Use the original or reputable charger and keep ventilation around multi-port units"],
    ["USB-C multi-port charger", "One compatible charger can reduce adapter stacking", "Its total wattage must cover the devices connected at the same time"],
    ["Hair dryer, straightener, curling iron or kettle", "Prefer a verified dual-voltage model or use the hotel's/local appliance", "Heating devices draw high power; many compact converters are not suitable"],
    ["Electric shaver or toothbrush", "Check the charging base as well as the handset", "A bathroom outlet marked for shavers may have use or power limits"],
    ["CPAP, medical device or professional equipment", "Get written manufacturer input requirements and accommodation confirmation", "Plan a spare adapter and power-outage response; do not improvise grounding"]
  ] },
    { id: "converter-heading", type: "heading", level: 2, text: "When a voltage converter is genuinely required" },
    { id: "converter-copy", type: "paragraph", text: "A converter must accept roughly 220V input and provide the voltage the appliance requires. Its continuous wattage rating must exceed the appliance's actual demand, with additional margin for equipment that draws more at startup. Some travel converters are intended only for short use with a narrow class of heating devices; others are transformer-based and heavy. Neither automatically changes 50Hz to 60Hz. Match the exact appliance and use case to the converter manufacturer's instructions rather than buying by plug picture alone." },
    { id: "converter-decision", type: "callout", title: "For one trip, replacing the appliance is often the cleaner answer", tone: "decision", body: "If the only incompatible item is a high-power hair tool or kettle, a locally rated appliance or hotel-provided item usually removes the converter, wattage and overheating problem at once. Keep a converter for equipment that truly cannot be substituted and only after the manufacturer confirms the combination." },
    { id: "room-heading", type: "heading", level: 2, text: "Build one stable charging station in the room" },
    { id: "room-list", type: "list", items: [
    "Bring one reputable, correctly rated adapter rather than several anonymous plug cubes. If you need more ports, use a wide-input USB charger that is designed to power the devices together.",
    "Keep adapters and chargers on a hard, uncovered surface. Do not charge under bedding, behind curtains or where water can reach the connection.",
    "Do not daisy-chain travel adapters, power strips and converters. Each extra joint creates leverage, heat and another rating that can be exceeded.",
    "If bringing an extension lead, confirm it is rated for at least 220V and the intended current, and that grounding continues through the whole chain where required.",
    "Put the adapter and one charging cable in carry-on. A delayed checked bag should not leave the phone, authentication codes and transport bookings without power."
  ] },
    { id: "failure-heading", type: "heading", level: 2, text: "If charging fails after arrival" },
    { id: "failure-table", type: "table", caption: "Troubleshoot without sacrificing the device", columns: ["Symptom", "Safe next step", "Do not do"], rows: [
    ["Nothing powers on", "Disconnect, test the outlet with hotel staff or a known low-power wide-input charger, then test the adapter separately", "Force the pins or repeatedly cycle a suspect outlet"],
    ["Adapter or charger becomes unusually hot", "Unplug immediately and let it cool on a non-flammable surface", "Cover it, keep charging overnight or assume heat is normal"],
    ["Plug is loose", "Use another outlet or a different correctly fitting adapter", "Hold it in place with tape, furniture or an object"],
    ["Breaker trips", "Disconnect the whole chain and ask the accommodation for help", "Reset repeatedly or reconnect the same high-power load"],
    ["Device works slowly", "Check charger output, cable and shared wattage after confirming input compatibility", "Buy a voltage converter when the actual issue is USB power allocation"]
  ] },
    { id: "pack-heading", type: "heading", level: 2, text: "A final packing audit" },
    { id: "pack-list", type: "list", ordered: true, items: [
    "Photograph each device's input label and save the exact model specification offline.",
    "Separate wide-input chargers from single-voltage appliances.",
    "Choose adapters that fit the plug, preserve required grounding and exceed the load rating.",
    "Ask the first hotel about outlets or medical-equipment support when power is mission-critical.",
    "Pack one backup cable and distribute essential charging equipment between responsible adults, not checked bags.",
    "Recheck any converter instructions before use and stop at the first sign of damage or overheating."
  ] },
    {id: "sale-heading", type: "heading", level: 2, text: "Land with the first hour already arranged"},
    {id: "sale-copy", type: "paragraph", text: "The day your phone is most likely to be flat is the day you arrive: a long flight, a new SIM or eSIM, and payment apps that still need testing. A driver waiting at arrivals removes all of that. The same is true of the trip's fixed points. The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time, in each visitor's own passport name, and on 1 October 2025, the first day of China's National Day holiday, its booking page already showed 2 to 7 October fully booked. Hand the booking to us and pay at least 8 days before your visit, and our booking guarantee covers it: if the booking fails, we refund the service fee and the ticket money in full. Inside those 8 days the guarantee no longer applies."},
    { id: "handoff-options", type: "comparison", title: "What we can arrange", columns: [
      { heading: "A private car and driver", body: "You come through arrivals and your driver is there: a private car to your hotel, in any city in mainland China, with no app or phone battery needed.", items: ["Our own drivers.", "Price confirmed in writing before you pay."] },
      { heading: `A private guide: from ${bodyGuideRate("xian", "en")} a day`, body: `Up to 8 hours with a licensed English-speaking guide: from ${bodyGuideRate("xian", "en")} in Xi'an and Zhangjiajie and from ${bodyGuideRate("beijing", "en")} in Beijing and Shanghai, higher on peak dates.`, items: ["Booked by the full day, per guide, not per person.", "Transport, tickets and meals are quoted separately."] },
      { heading: `The whole trip: from ${bodyTourPrice(tour8, 6, "en")} per person`, body: `Our 8-day Beijing, Xi'an and Shanghai private tour is ${bodyTourPrice(tour8, 2, "en")} per person for two and ${bodyTourPrice(tour8, 6, "en")} for six. The 10-day route adding Guilin is ${bodyTourPrice(tour10, 2, "en")} per person for two.`, items: ["Four-star hotels with breakfast, a private guide and car on touring days, every transfer, the trains and flights between cities, and the named admissions.", "If we cannot get your Forbidden City or Tiananmen booking, we refund everything you paid, provided we have your passport details at least 8 days before the Forbidden City visit."] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "Book it with us", items: [{label: "Ask for an airport or station pickup", href: "/services/private-car-and-driver/", description: "Any mainland city. Send your route, date and luggage."}, {label: "See the 8-day Beijing, Xi'an and Shanghai route", href: "/tours/beijing-xian-shanghai-8-day-private-tour/", description: "Day-by-day plan, hotels and the published price table."}, {label: "Hire a guide for the day", href: "/services/private-english-speaking-guides/", description: "Beijing, Shanghai, Xi'an and Zhangjiajie rates."}, {label: "Plan the whole trip with a planner", href: "/services/full-trip-support/", description: "Tell us your dates and budget; the first brief is free."}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "How booking works", body: "Send your dates, the number of travellers and what you want to see by WhatsApp or email from any page above. A planner replies within 12 hours, and you get a written quote before you pay anything; the same planner stays with you from that first reply to your last day. You pay a 30% deposit by Alipay or VBill and the rest after you arrive; we add no fee. Homeground China is a licensed travel agency (L-BJ10587); the guides and drivers are our own, and we never stop at shops."},
    { id: "scope", type: "callout", title: "Scope and live-fact boundary", tone: "neutral", body: "The official pages below support mainland China's 220V/50Hz supply and commonly used plug formats as reviewed on 12 August 2026. They do not certify a particular room outlet, adapter or appliance. This guide covers ordinary travel electronics, not building wiring, hard-wired equipment or a medical-device risk assessment. The device and adapter manufacturers control their specifications; the accommodation controls what is installed on site." },
    { id: "faq", type: "faq", title: "Plug and voltage questions answered", items: [
    { question: "What voltage and plug type does China use?", answer: "Mainland China uses 220V at 50Hz. Shanghai government guidance lists Type A, C and I plugs, and hotels often have multi-standard or USB outlets, but do not plan around one particular hotel socket." },
    { question: "Do I need a voltage converter for China?", answer: "Only for a device whose INPUT label says 110V or 120V alone. A charger marked 100–240V, 50/60Hz accepts China's supply and needs just a plug-shape adapter; a plug adapter never lowers the voltage." },
    { question: "Will my phone or laptop charger work in China?", answer: "Most modern phone, tablet, camera and laptop chargers are wide-input (100–240V), so they work with a plug adapter. Read the INPUT line on each charger to confirm; if there is no readable label, check the exact model with the manufacturer rather than guessing." },
    { question: "Can I bring a Type G plug from Singapore or Malaysia?", answer: "Yes, with an adapter that accepts the three rectangular Type G pins and fits the mainland socket you will use. If the charger's INPUT covers 220V, the shape adapter is all you need; preserve any required earth connection, stay within the adapter's rating and do not force the pins." },
    { question: "Can I use my hair dryer or straightener in China?", answer: "Prefer a verified dual-voltage model or the hotel's appliance. A 110V-only high-power tool needs a converter rated above its actual wattage, and for one trip replacing the appliance is often the cleaner answer than carrying a converter." },, {question: "What happens if my phone dies when I arrive in China?", answer: "You cannot pay by QR code or call a ride-hailing car until it is charged, so keep a charged power bank with a CCC mark and some cash in your cabin bag. If you would rather not depend on it, book a private car: your driver waits at arrivals in any city in mainland China, with the price confirmed in writing before you pay."}] },
    { id: "links", type: "internal-links", title: "Finish the device plan", items: [
    { label: "Power bank rules for flights and trains", href: "/guides/china-power-bank-rules-flights-trains/", description: "Keep charging compatibility separate from battery transport rules." },
    { label: "China eSIM or local SIM", href: "/guides/china-esim-vs-local-sim/", description: "Build a phone setup that still works on arrival." },
    { label: "Final night before an international flight", href: "/guides/china-last-night-before-international-flight/", description: "Put essential chargers and adapters back in carry-on." }
  ] },
    { id: "sources", type: "sources", title: "Official sources reviewed", items: [
        {label: "Domestic-flight power-bank notice: CCC mark required from 28 June 2025", url: "https://www.caac.gov.cn/English/News/202507/t20250709_227894.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-09-10"},
        {label: "Palace Museum ticketing: release time and real-name rules", url: "https://www.dpm.org.cn/subject_booking/", publisher: "The Palace Museum", reviewedAt: "2026-08-22"},
        {label: "Palace Museum fully booked for 2 to 7 October on the first day of the 2025 National Day holiday", url: "https://www.yicai.com/news/102851899.html", publisher: "Yicai", reviewedAt: "2026-10-19"},
    { label: "Electricity in China", url: "https://www.caac.gov.cn/ZTZL/RDZT/YTHYWZ/CHRY/SHZN/Electricity/index.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-08-12" },
    { label: "Beijing pre-departure travel tips", url: "https://english.beijing.gov.cn/travellinginbeijing/quickguideontravelservices/traveltips/202108/t20210811_2466837.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-12" },
    { label: "Shanghai packing guidance listing Type A, C and I plugs", url: "https://english.shanghai.gov.cn/en-FAQs-StudyinShanghai/20250924/e961a223e45a4adca7969b3f7691132b.html", publisher: "Shanghai Municipal Government", reviewedAt: "2026-08-12" }
  ] },
  ],
} as const satisfies StructuredPageBody;

export default body;
