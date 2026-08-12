import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Check a power bank twice when a China trip includes both flights and trains: aviation and railway rules are separate. For a domestic flight in China, the power bank must travel in carry-on, its rated energy must be identifiable, and since 28 June 2025 it must also have a clear CCC mark and not belong to a recalled model or batch. A clearly marked railway power bank must not exceed 100Wh. Passing train security does not prove it will pass airport security." },
  { id: "answer", type: "callout", title: "The safest trip-wide default", tone: "decision", body: "Carry one undamaged, clearly labelled power bank at or below 100Wh, with a legible CCC mark when a China domestic flight is involved. Keep it accessible in hand baggage, protect it from accidental activation and short circuit, and verify the model against current recall information. This is a practical route through both modes, not a guarantee that an airline, airport or officer will accept a damaged or recalled unit." },
  { id: "mode-heading", type: "heading", level: 2, text: "Flight and train rules answer different questions" },
  { id: "mode-table", type: "table", caption: "Core rules reviewed on 12 August 2026", columns: ["Check", "China domestic flight", "China railway journey"], rows: [
    ["Where to pack it", "Carry-on or on your person; never checked baggage", "Keep it protected and available for security inspection"],
    ["Rated energy", "Up to 100Wh without airline approval; over 100Wh to 160Wh requires airline approval and is limited to two; over 160Wh is prohibited", "Clearly marked rated energy must not exceed 100Wh"],
    ["Marking", "Rated energy must be shown or calculable from other marked parameters", "Rated energy marking must be clear"],
    ["CCC rule", "From 28 June 2025, domestic flights prohibit units without a CCC mark, with an unclear CCC mark, or from recalled models/batches", "The cited national railway restricted-items catalogue uses the 100Wh clear-marking rule; do not import the flight CCC rule into the rail claim"],
    ["Use during travel", "Do not use the power bank to charge devices during flight; keep its switch off throughout the flight when it has one", "Follow onboard safety instructions and stop using any unit that becomes hot, swollen, damaged or smells unusual"],
    ["Operator layer", "Airline and route-specific dangerous-goods conditions can add restrictions", "Security and railway staff apply the current railway rule; local handling may still require inspection"]
  ] },
  { id: "domestic-heading", type: "heading", level: 2, text: "The 2025 CCC restriction is specifically a domestic-flight rule" },
  { id: "domestic-copy", type: "paragraph", text: "The Civil Aviation Administration of China announced that, starting 28 June 2025, passengers may not carry power banks without CCC markings, with unclear CCC markings, or belonging to recalled models or batches on domestic flights. CCC is the China Compulsory Certification mark; a CE, FCC, airline icon or recycle symbol is not the same mark. Do not draw a new CCC logo onto an old device or use a sticker supplied by an unaccountable seller. Security needs the original product marking and the unit must not be recalled." },
  { id: "itinerary-boundary", type: "callout", title: "An international ticket can still contain a domestic segment", tone: "warning", body: "Read every flight coupon. Beijing–Chengdu followed by Chengdu–Singapore includes a China domestic flight even if it sits inside one international itinerary. A separate domestic positioning flight also triggers the domestic-flight check. For the international sector, verify the operating airline and departure airport because airline and jurisdiction rules may add to the baseline aviation limits." },
  { id: "label-heading", type: "heading", level: 2, text: "Read the physical label before leaving home" },
  { id: "label-table", type: "table", caption: "A usable power-bank identity record", columns: ["Find on the unit", "Why it matters", "Red flag"], rows: [
    ["Rated energy in Wh", "Security can compare the unit directly with the mode limit", "Missing, rubbed off, covered or contradictory"],
    ["Nominal voltage and capacity", "CAAC allows Wh to be calculated when both are marked", "Only a marketing capacity with no voltage or rated energy"],
    ["Manufacturer, model and batch/serial information", "Lets you check recalls and identify the exact product", "Generic unit with no accountable maker or model"],
    ["CCC mark", "Required under the 2025 China domestic-flight restriction", "Absent, hand-added, damaged beyond recognition or confused with another symbol"],
    ["Case and ports", "Shows whether the battery is intact and terminals can be protected", "Swelling, cracks, leaking, scorch marks, loose cells or unusual heat"]
  ] },
  { id: "math-heading", type: "heading", level: 2, text: "Convert mAh to Wh only from the correct voltage" },
  { id: "math-copy", type: "paragraph", text: "The official aviation formula is Wh = V × Ah, and Ah = mAh ÷ 1,000. A label showing 20,000mAh at a nominal 3.7V therefore gives 74Wh. A label showing 30,000mAh at 3.7V gives 111Wh, which is above the railway's 100Wh ceiling and falls into aviation's airline-approval band. These are arithmetic examples, not acceptance certificates. USB output voltage is not necessarily the cell's nominal voltage, and a calculation cannot repair a missing CCC mark, unreadable label, recall or damaged case." },
  { id: "math-warning", type: "callout", title: "Do not calculate from the biggest number on the box", tone: "warning", body: "Marketing may display mAh prominently while rated energy and nominal voltage appear in small print on the device. Security evaluates the physical unit, not an online listing screenshot. If the necessary parameters cannot be read on the power bank itself, replace it before the trip rather than arguing from packaging." },
  { id: "recall-heading", type: "heading", level: 2, text: "A CCC mark does not cancel a recall" },
  { id: "recall-list", type: "list", ordered: true, items: [
    "Record the full manufacturer, model and batch or serial information from the unit.",
    "Check the manufacturer's official recall notice and China's official market-regulation recall information shortly before departure.",
    "Match the exact model and affected batch; a similar brand name or capacity is not enough.",
    "If the unit is recalled, stop using it and follow the manufacturer's official return or disposal process. Do not carry it to the airport hoping security will decide for you.",
    "Recheck after a long gap between purchase and travel because a recall can be announced later."
  ] },
  { id: "packing-heading", type: "heading", level: 2, text: "Pack for the strictest segment" },
  { id: "packing-list", type: "list", ordered: true, items: [
    "List every flight and train in order, including domestic legs inside an international ticket and separately booked positioning flights.",
    "Use the strictest applicable limit across the route. If one train caps the unit at 100Wh, an airline approval for 120Wh does not make it rail-compliant.",
    "Photograph the label and serial information for your records, but keep the physical marking visible for inspection.",
    "Place the power bank in hand baggage where it cannot be crushed. Protect exposed terminals and prevent buttons from being pressed accidentally.",
    "Do not put it into a bag that might be gate-checked. Remove it before handing over any cabin bag.",
    "Carry a cable and charge devices before boarding so the plan does not depend on using the power bank in flight."
  ] },
  { id: "security-heading", type: "heading", level: 2, text: "At airport or station security" },
  { id: "security-copy", type: "paragraph", text: "Keep the unit easy to present and allow staff to inspect the label and condition. If asked for airline approval for a unit above 100Wh, a chat message from a booking agent is not necessarily approval from the operating carrier. Obtain the carrier's process before travel and keep the confirmation accessible. Do not conceal a second unit, transfer it to a companion or alter the label after a refusal." },
  { id: "failure-heading", type: "heading", level: 2, text: "If security refuses the power bank" },
  { id: "failure-table", type: "table", caption: "Recover without missing the departure", columns: ["Reason", "Immediate response", "Do not assume"], rows: [
    ["No or unclear CCC mark on a domestic flight", "Accept the instruction and ask whether the airport has an official surrender or storage route", "A receipt, online product page or self-applied sticker will cure the physical marking"],
    ["Rated energy missing or not calculable", "Show only the original marked parameters; if they are insufficient, remove the unit from travel", "Staff must accept your estimate"],
    ["Above the applicable Wh limit", "Use prior airline approval only where the aviation rule allows it; a rail segment still needs 100Wh or below", "Approval can be created at the checkpoint or transferred between modes"],
    ["Recalled or damaged", "Stop using it and follow official handling instructions", "Checking it, mailing it casually or giving it to another passenger is a safe workaround"],
    ["Cabin bag will be checked", "Remove the power bank and keep it in the cabin before surrendering the bag", "A gate tag changes the checked-baggage prohibition"]
  ] },
  { id: "storage-warning", type: "callout", title: "Do not build the itinerary around airport storage", tone: "warning", body: "CAAC asked airports to provide appropriate voluntary-disposal or temporary-storage areas, but availability, eligibility, hours, fees and collection procedure are airport-specific. Verify a named airport service directly. When departure is close, protecting the flight matters more than trying an unofficial courier or leaving the unit with a stranger." },
  { id: "onboard-heading", type: "heading", level: 2, text: "Watch for damage during the journey" },
  { id: "onboard-list", type: "list", items: [
    "Do not use a power bank to charge a device during flight, and keep its switch off when fitted.",
    "Never use a swollen, cracked, leaking, wet, unusually hot or chemical-smelling unit.",
    "If heat, smoke or odour appears onboard, stop handling it and alert crew or railway staff immediately; do not hide it in a bag or cover it with clothing.",
    "Do not leave it charging unattended on a hotel bed or under soft material. Use intact cables and a stable surface.",
    "After a heavy impact, inspect the case before the next segment even if the LEDs still work."
  ] },
  { id: "scope", type: "callout", title: "Scope and live-rule boundary", tone: "neutral", body: "This guide covers ordinary passenger power banks, not mobility aids, installed laptop batteries, professional battery packs, cargo shipments or disposal law. The CAAC notices and national railway catalogue below were reviewed on 12 August 2026. Recheck the operating airline, departure airport, railway notice and exact model shortly before travel. Staff make the operational decision; Homeground does not certify a product from a photograph." },
  { id: "links", type: "internal-links", title: "Complete the device and transport check", items: [
    { label: "China power plugs, voltage and adapters", href: "/guides/china-power-plugs-voltage-and-adapters/", description: "Separate battery transport rules from charging voltage and plug shape." },
    { label: "China domestic flight fare bundles and baggage", href: "/guides/china-domestic-flight-fare-bundle-baggage/", description: "Audit the fare and operating carrier before the airport." },
    { label: "China rail-only route planning", href: "/guides/china-rail-only-route/", description: "Test whether every long transfer works without a flight." }
  ] },
  { id: "sources", type: "sources", title: "Official sources reviewed", items: [
    { label: "CAAC notice on CCC-marked power banks and recalled models (2025)", url: "https://www.caac.gov.cn/English/News/202507/t20250709_227894.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-08-12" },
    { label: "CAAC rules and rated-energy calculation for passenger power banks", url: "https://www.caac.gov.cn/big5/www.caac.gov.cn/XXGK/XXGK/TZTG/201511/t20151105_11173.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-08-12" },
    { label: "Railway passenger prohibited and restricted items catalogue", url: "https://www.gov.cn/zhengce/zhengceku/2022-05/31/content_5693212.htm", publisher: "National Railway Administration / Ministry of Public Security", reviewedAt: "2026-08-12" }
  ] }
] } as const satisfies StructuredPageBody;

export default body;
