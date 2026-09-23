import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead-answer", type: "lead", text: "The cheapest displayed domestic fare is not necessarily the cheapest ticket you can actually use. Compare the final basket for the same passengers: payment total, checked and cabin baggage, seats you genuinely need, change and refund conditions, and the value at risk if late arrival breaks the next booking. Buy only after the checkout page confirms all five." },
    { id: "quick-choice", type: "comparison", title: "Which fare type fits the trip?", columns: [
      { heading: "Lean fare", body: "Reasonable when everyone travels light, the date is firm and nothing expensive depends on arrival." },
      { heading: "Included-bag fare", body: "Often cleaner when several travellers will check luggage and add-on prices erase the headline saving." },
      { heading: "More flexible fare", body: "Worth comparing when the flight protects an international departure, fixed train, event or non-refundable hotel night." }
    ] },
    { id: "official-rules-heading", type: "heading", level: 2, text: "Why the conditions on the exact product matter" },
    { id: "official-rules", type: "paragraph", text: "CAAC passenger-service rules require the seller to disclose whether multiple flights are a connection, the applicable fare and ticket conditions, and baggage details including size, weight and free allowance. The rules do not create one universal allowance or one change fee for every airline. The carrier's current conditions and the fare product displayed at checkout therefore control the comparison." },
    { id: "basket-heading", type: "heading", level: 2, text: "Build one fair comparison basket" },
    { id: "basket", type: "table", caption: "Record the same line items for every option", columns: ["Line item", "What to capture", "Common mistake"], rows: [
      ["Ticket total", "Base fare, taxes and any unavoidable payment charge in one currency", "Comparing a search-card price with a checkout total"],
      ["Checked baggage", "Pieces, weight, dimensions and price for each direction and traveller", "Assuming one added bag covers a group or return journey"],
      ["Cabin baggage", "The exact product's number, size and weight limits", "Treating cabin and checked allowances as interchangeable"],
      ["Seat need", "Only seats that solve a real need, such as keeping a carer and child together", "Adding every optional extra without valuing it"],
      ["Change and refund", "Fee, fare difference, time bands, no-show treatment and channel", "Reading “changeable” as “free to change”"],
      ["Arrival dependency", "Replacement cost or lost value of the next fixed booking", "Calling two fares equal when one arrival carries much more risk"]
    ] },
    { id: "checkout-heading", type: "heading", level: 2, text: "A seven-step checkout audit" },
    { id: "checkout", type: "list", ordered: true, items: [
      "Enter every passenger and both directions before comparing. A one-way teaser cannot represent a round-trip basket.",
      "Confirm airport, terminal, operating carrier and flight date. Similar city and airport names are not interchangeable.",
      "Open the fare conditions from the product you are about to buy. Record voluntary change and refund rules at the time bands that could actually matter.",
      "Add the bags the group will really carry. Check both cabin and checked baggage; do not infer an allowance from the cabin name alone.",
      "Add only necessary seats and services. If a service matters, verify that it is confirmed rather than merely requested.",
      "Check whether the seller calls multiple flights a through connection. If not, evaluate the self-transfer separately before paying.",
      "Save the confirmation, ticket number and dated conditions after purchase. A search screenshot is not proof of what was contracted."
    ] },
    { id: "example-heading", type: "heading", level: 2, text: "Planning example: a cheap fare before a fixed train" },
    { id: "example", type: "callout", tone: "neutral", title: "Compare consequences, not invented prices", body: "Imagine Fare A excludes the checked bag and has restrictive voluntary changes, while Fare B includes the bag and offers more workable conditions. If the flight lands before a replaceable hotel evening, Fare A may still win after add-ons. If it feeds a fixed onward train and losing that train would also remove the first hotel night, Fare B's flexibility may carry real value. Calculate with the prices and rules shown on your date; this example does not claim either product is always cheaper." },
    { id: "risk-heading", type: "heading", level: 2, text: "When the fare should carry more protection" },
    { id: "risk", type: "list", ordered: false, items: [
      "The flight is the last domestic sector before an international departure.",
      "A separately ticketed flight or fixed train follows on the same day.",
      "A non-refundable event, permit, cruise or limited-entry attraction depends on arrival.",
      "The travel date may change because a passport, visa, work schedule or health decision is unresolved.",
      "The group has several checked bags, a child, limited mobility or another reason why last-minute rebooking is harder."
    ] },
    { id: "disruption-heading", type: "heading", level: 2, text: "If the flight changes or is cancelled" },
    { id: "disruption", type: "list", ordered: true, items: [
      "Read the carrier's message and verify the flight status through the carrier or airport; do not act on a screenshot forwarded by a stranger.",
      "Determine whether the proposed change is voluntary or involuntary. CAAC rules distinguish the two, and the applicable options can differ.",
      "Before accepting a replacement, check the arrival airport, terminal and every onward booking.",
      "Contact the ticket seller or carrier through the channel stated in the booking. Keep the order number and written notices.",
      "If the new arrival breaks a separately contracted train, hotel or flight, contact that provider too; one carrier's remedy does not automatically rewrite another contract.",
      "Keep receipts and records if you intend to ask the responsible provider or insurer for a remedy. Do not assume reimbursement without reading the relevant terms."
    ] },
    { id: "failure-table", type: "table", caption: "Warnings that should stop checkout", columns: ["Warning", "Why it matters", "Better action"], rows: [
      ["Baggage rule visible only in a generic help page", "The exact fare may differ", "Open the rule attached to the product or ask the seller before paying"],
      ["Two flights presented together but not confirmed as connected", "A disruption may leave the second ticket unchanged", "Use the self-transfer test and consider a protected connection"],
      ["Airport code or terminal differs from your plan", "Ground transfer may erase the saving", "Recalculate door to door"],
      ["Changeable but fee not clear", "A fare difference or time-band fee may still apply", "Record the actual formula or choose a clearer product"],
      ["Very short arrival buffer before an expensive booking", "The cheapest fare has become a single point of failure", "Move the onward booking, travel earlier or buy appropriate protection"]
    ] },
    { id: "switch-heading", type: "heading", level: 2, text: "When to choose the other option" },
    { id: "switch-rule", type: "paragraph", text: "Choose the leaner fare when its completed basket is still lower and the journey can absorb a change. Choose the more inclusive or flexible fare when add-ons narrow the gap or the downside of disruption is materially larger. If neither product leaves a safe arrival plan, change the travel day or transport architecture rather than trying to buy certainty from a label." },
    { id: "dynamic-boundary", type: "callout", tone: "warning", title: "Fare products change", body: "Recheck the exact carrier, seller, flight and date at checkout. Baggage limits, fees, refund rules and optional-service prices can change; this guide intentionally does not publish a permanent airline comparison table." },
    { id: "scope", type: "callout", tone: "neutral", title: "What this guide covers", body: "This guide compares domestic-flight fare bundles. It does not rank airlines, quote live fares, promise baggage allowances, explain airport-specific transfers or replace the separate-ticket risk guide." },
    { id: "help-cta", type: "callout", tone: "decision", title: "Want two fare baskets checked?", body: "Send anonymised checkout terms, travel date, passenger count, real baggage and the next fixed booking. Remove names, passport numbers, ticket numbers and payment details." },
    { id: "faq", type: "faq", title: "Questions travellers ask before booking a fare", items: [
      { question: "Is the cheapest fare on the search page really the cheapest ticket?", answer: "Not necessarily. The cheapest displayed domestic fare is not necessarily the cheapest ticket you can actually use. Compare the final basket for the same passengers: payment total, checked and cabin baggage, seats you genuinely need, change and refund conditions, and the value at risk if late arrival breaks the next booking. Buy only after the checkout page confirms all five." },
      { question: "Does a China domestic ticket include a checked bag?", answer: "It depends on the exact fare product, not on the airline alone. CAAC passenger-service rules require the seller to disclose baggage details including size, weight and free allowance, but they do not create one universal allowance or one change fee for every airline. Open the fare conditions attached to the product you are about to buy, and check cabin and checked baggage separately." },
      { question: "The fare says it is changeable — does that mean changes are free?", answer: "No. Reading changeable as free to change is a common mistake; a fare difference or a time-band fee may still apply. Open the product's own conditions and record the actual formula: fee, fare difference, time bands, no-show treatment and the channel you must use. If the rule stays unclear, choose a product that states it more clearly." },
      { question: "When is it worth paying for a more flexible fare?", answer: "When the downside of disruption is materially larger. Five situations: the flight is the last domestic sector before an international departure; a separately ticketed flight or fixed train follows on the same day; a non-refundable event, permit, cruise or limited-entry attraction depends on arrival; the travel date may change because a passport, visa, work schedule or health decision is unresolved; or the group has several checked bags, a child or limited mobility." },
      { question: "Two flights are shown together in one booking — are they treated as a connection?", answer: "Check whether the seller calls them a through connection. If it does not, evaluate the self-transfer separately before paying: when two flights are presented together but not confirmed as connected, a disruption on the first may leave the second ticket unchanged. Compare a protected connection before you decide." },
      { question: "The cheap fare uses a different airport from the one I planned — does that matter?", answer: "Yes, recalculate before paying. When the airport code or terminal differs from your plan, the ground transfer can erase the saving, so compare the journey door to door rather than by ticket price. Confirm airport, terminal, operating carrier and flight date at checkout, because similar city and airport names are not interchangeable." },
    ] },
    { id: "more-planning", type: "internal-links", title: "Continue planning", items: [
      { label: "Check separate-ticket risk", href: "/guides/china-separate-flight-tickets-self-transfer-risk/", description: "A cheap bundle can still expose the onward trip." },
      { label: "Understand China trip costs", href: "/guides/how-much-does-a-china-trip-cost/", description: "Place the flight decision inside the whole budget." },
      { label: "Compare route-shaping flights", href: "/guides/china-open-jaw-flights-route-planning/", description: "A higher fare may remove a costly return journey." },
      { label: "Separate Wenchang's space sites", href: "/guides/wenchang-commercial-space-city/", description: "Distinguish Wenchang's national launch site, commercial launch center and aerospace development—and verify any visitor arrangement afresh." },
    ] },
    { id: "sources", type: "sources", title: "Official sources reviewed", items: [
      { label: "Public air passenger service rules", url: "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-08-12" },
      { label: "CAAC air-travel ticket guidance", url: "https://www.caac.gov.cn/INDEX/HLFW/HKLXCS/", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-08-12" },
      { label: "Civil Aviation Law effective 1 July 2026", url: "https://www.caac.gov.cn/XXGK/XXGK/FLFG/202512/t20251227_229597.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-08-12" }
    ] }
  ]
} satisfies StructuredPageBody;
export default body;
