import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "A child-friendly China trip is not an adult itinerary with earlier dinners. Build it around the hardest hour: the arrival after poor sleep, a long station crossing, a toilet emergency, or carrying a sleeping child while someone else handles every bag and passport. Fewer bases, one major anchor per day and protected recovery after each move usually produce more usable family time." },
  { id: "quick-choice", type: "comparison", title: "Choose the route shape for the family you have", columns: [
    { heading: "One or two stable bases", body: "Best when naps, familiar food, lots of luggage or limited adult hands make hotel changes expensive." },
    { heading: "Slow forward route", body: "Works when each move clearly improves the next several days and transfer days carry no must-see booking." },
    { heading: "Adult-paced route", body: "Use only when the children already tolerate comparable days at home; do not rely on hoped-for holiday behaviour." }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "Ticket eligibility and comfort are different decisions" },
  { id: "official", type: "paragraph", text: "Current 12306 guidance says children aged 6 to under 14 should use a child discount ticket, while each ticketed adult may carry one child under 6 free if that child does not occupy a separate seat; age is calculated on the travel date. A free child must be declared using a valid identity document, and a child who needs a separate seat requires the applicable ticket. Recheck the rule before purchase. Even when free travel is permitted, a dedicated seat may be the more workable family choice." },
  { id: "systems-heading", type: "heading", level: 2, text: "Protect four family systems" },
  { id: "systems", type: "table", caption: "Turn family needs into route decisions", columns: ["System", "Route response", "Fragile shortcut"], rows: [
    ["Sleep", "Keep arrival and move days free of irreplaceable anchors; preserve the usual sleep window where possible", "Assuming a stroller or vehicle guarantees a nap"],
    ["Movement", "Count stairs, walking distance, stroller folding, bags and the adult with free hands", "Calling a transfer easy because the train is fast"],
    ["Food and toilets", "Place predictable options before queues and near the hotel; carry an age-appropriate fallback", "Waiting until a child is hungry to search"],
    ["Regulation", "Use the exact passport details and current child-ticket rule for every transport booking", "Treating airline, railway and attraction age rules as identical"]
  ] },
  { id: "route-workflow-heading", type: "heading", level: 2, text: "Build the family route in eight decisions" },
  { id: "route-workflow", type: "list", ordered: true, items: [
    "Write the child's normal sleep, meal and toilet pattern, plus what happens after one poor night. Plan for the observed child, not an idealised age group.",
    "Count adults, children, suitcases, stroller, day bag and free hands. If one adult must carry a sleeping child, reassign every other item.",
    "Choose the arrival hotel for low friction from the real airport or station and for useful food nearby, not only for a landmark view.",
    "Limit each day to one protected anchor. Place optional activities nearby so dropping them does not create a cross-city failure.",
    "After every intercity move, reserve a recovery block. Do not attach a timed highlight to the scheduled arrival.",
    "Check the exact station entrances, lifts or accessibility assistance with the operator when they matter. Keep a carrying or alternate-transport fallback.",
    "Choose seats and tickets for the family arrangement, then verify every traveller's document details before payment.",
    "Delete a whole base before compressing sleep, meals and transfer margin across every day."
  ] },
  { id: "transfer-heading", type: "heading", level: 2, text: "Run the transfer rehearsal on paper" },
  { id: "transfer", type: "table", caption: "Ask who does what at each stage", columns: ["Stage", "Questions", "Safer design"], rows: [
    ["Leaving the hotel", "Can everyone be ready after breakfast? Who checks the room while supervising children?", "Pack most items the previous evening and protect one small essentials bag"],
    ["Station or airport", "Can the group stay together through document checks, security and toilets?", "Arrive with margin and assign one adult to documents, one to children where possible"],
    ["On board", "Does the child have the booked seat, food, layers and familiar quiet activity?", "Keep critical supplies in the day bag, not checked luggage"],
    ["Arrival", "What if the child sleeps, the stroller must fold or the room is not ready?", "Preselect the simplest fallback transfer and confirm luggage storage" ]
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "Planning example: the “short” train that adds a hotel" },
  { id: "example", type: "callout", tone: "neutral", title: "A planning example, not a fixed itinerary", body: "A family sees a short rail segment and adds another city for one famous attraction. The real move requires checkout, a large station, two suitcases, a stroller and a room that may not be ready. If the new city offers only that one activity, the family can lose more usable time than it gains. A focused day visit from a stable base—or removing the stop—may protect the activity without adding a full transfer day." },
  { id: "failure-heading", type: "heading", level: 2, text: "Common failures and recovery" },
  { id: "failure", type: "table", caption: "Make the plan recoverable", columns: ["Failure", "Immediate response", "Next design change"], rows: [
    ["Child sleeps through a timed booking", "Let one adult attend only if the family agreed beforehand; otherwise release the booking", "Do not place irreplaceable anchors in the usual nap or arrival window"],
    ["Stroller route is blocked", "Use the carrying fallback or staffed assistance; do not force an unsafe path", "Confirm the exact entrance and reduce bags next time"],
    ["Food refusal before a long queue", "Use the familiar backup and pause", "Schedule predictable food before, not after, the anchor"],
    ["Travel delay removes the evening", "Go to the hotel and keep dinner simple", "Keep move days free of headline activities"],
    ["One adult becomes unwell", "Cancel optional movement and stay near the hotel", "Use fewer bases and retain flexible bookings"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "When to choose the slower option" },
  { id: "switch-rule", type: "paragraph", text: "Choose fewer bases when the group has more bags than free adult hands, a nap-dependent child, uncertain stroller access or little tolerance for poor sleep. A forward route can still work when moves are infrequent, door-to-door transport solves a real barrier and every new base supports several family priorities. If the only defence of a stop is that the train is short, remove it." },
  { id: "packing-heading", type: "heading", level: 2, text: "Keep one disruption bag reachable" },
  { id: "packing", type: "list", ordered: false, items: [
    "Original travel documents and booking references for every traveller.",
    "A change of child clothing, weather layer and supplies appropriate to the child's needs.",
    "Water and familiar food where transport and security rules permit.",
    "Offline hotel address in Chinese and a contact method that does not rely on one phone.",
    "Any essential medication with its original labelling and appropriate medical advice; this guide does not provide medical or import guidance."
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "Recheck rules and exact facilities", body: "Child ticket rules, attraction age rules, station facilities and temporary access routes can change. Verify each named operator and location near travel. Never assume nationwide stroller accessibility from one successful station." },
  { id: "scope", type: "callout", tone: "neutral", title: "What this guide covers", body: "This guide focuses on family route pacing and transfer design. It does not provide paediatric advice, guarantee accessibility, list attraction age rules or duplicate the general high-speed rail procedure." },
  { id: "help-cta", type: "callout", tone: "decision", title: "Want a family route stress test?", body: "Send dates, children's ages and routines, adult count, luggage, stroller needs and candidate bases. A useful review should identify the hardest transfer hour and the first safe cut." },
  { id: "more-planning", type: "internal-links", title: "Continue planning", items: [
    { label: "Prepare for a first high-speed train", href: "/guides/china-high-speed-train-first-time-guide/", description: "Handle passports, tickets and stations after choosing the route." },
    { label: "Choose a hotel near useful transport", href: "/guides/china-hotel-near-metro/", description: "Reduce daily walking and transfers, not just map distance." },
    { label: "Check the usable sightseeing days", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Count arrival, transfer and recovery time honestly." }
  ] },
  { id: "sources", type: "sources", title: "Official source reviewed", items: [
    { label: "Railway child-ticket rules", url: "https://kyfw.12306.cn/otn/gonggao/children.html", publisher: "China Railway 12306", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
