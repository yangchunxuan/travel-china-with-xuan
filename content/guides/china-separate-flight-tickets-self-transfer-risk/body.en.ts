import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead-answer", type: "lead", text: "Treat separately ticketed flights as two independent journeys unless the seller and carrier explicitly confirm a protected through connection. If the first flight changes, the second ticket may remain unchanged and unusable. Do not solve that contract gap with a generic minimum connection time; remove the same-day dependency, create a genuinely recoverable buffer, or buy an itinerary that protects the connection." },
  { id: "quick-choice", type: "comparison", title: "Choose the connection structure", columns: [
    { heading: "Protected through itinerary", body: "Prefer when missing the onward flight would endanger an international departure, event or expensive non-refundable booking." },
    { heading: "Separate tickets with an overnight", body: "Often defensible when the first city has a useful stay and the next flight leaves enough time to recover." },
    { heading: "Same-day self-transfer", body: "Use only after testing baggage, formalities, airport geography, last viable alternative and the cost of failure." }
  ] },
  { id: "official-heading", type: "heading", level: 2, text: "“Sold together” does not prove one contract" },
  { id: "official", type: "paragraph", text: "CAAC guidance says a through itinerary contains two or more flights on the same ticket number, and requires sellers to tell passengers whether multiple booked flights are through flights. It also warns that non-through flights are usually issued independently under separate contracts: a disruption to one does not automatically change the other, and each ticket follows its own carrier conditions. Confirm the ticket structure in writing before paying; a single checkout screen or one agency order number is not enough evidence by itself." },
  { id: "contract-check-heading", type: "heading", level: 2, text: "Confirm what you are actually buying" },
  { id: "contract-check", type: "list", ordered: true, items: [
    "Ask the seller whether the flights are a through connection, not merely a combined search result or self-transfer product.",
    "Check the ticket numbers and operating carriers. Save the written product description and applicable change/refund conditions.",
    "Ask whether checked baggage is accepted through to the final destination. Do not infer this from airline alliance, shared branding or airport layout.",
    "Ask what the seller or carrier will do if the first flight is delayed or cancelled and the onward flight is missed.",
    "If the answer is conditional or unclear, price the journey as separate contracts and assume you may need to collect bags and re-check."
  ] },
  { id: "risk-map-heading", type: "heading", level: 2, text: "Map the full self-transfer" },
  { id: "risk-map", type: "table", caption: "A connection is a sequence of gates, not one time gap", columns: ["Stage", "What to verify", "Failure consequence"], rows: [
    ["First arrival", "Arrival airport, terminal and plausible delay exposure", "Available transfer time shrinks before you reach the terminal"],
    ["Entry formalities", "Whether immigration, customs or security applies to your itinerary and documents", "Queues or document problems stop the connection"],
    ["Baggage", "Whether bags are through-checked; reclaim and bag-drop cut-offs if not", "You cannot proceed airside or check the bag in time"],
    ["Ground transfer", "Same terminal, terminal change or airport change, using a realistic mode", "Traffic or wrong terminal consumes the margin"],
    ["Second check-in", "Carrier's current check-in, bag-drop and gate requirements", "A valid ticket can still become unusable after cut-off"],
    ["Recovery", "Last viable later option, room, entry permission and support channel", "Failure becomes an unplanned overnight or a lost onward itinerary"]
  ] },
  { id: "buffer-heading", type: "heading", level: 2, text: "Build a buffer from consequences, not a universal number" },
  { id: "buffer", type: "list", ordered: false, items: [
    "Start with all mandatory processing time: deplaning, formalities, bags, transfer, check-in, security and gate access.",
    "Add operational uncertainty appropriate to the route and season using current airport and carrier information.",
    "Add recovery time if the next viable flight is infrequent. A long nominal gap is weak if there is no later option.",
    "Increase protection for checked bags, airport changes, children, mobility needs or documents that require staffed processing.",
    "If failure would threaten the final international departure, move the first flight to the previous day rather than arguing over minutes."
  ] },
  { id: "example-heading", type: "heading", level: 2, text: "Planning example: one city, two airports" },
  { id: "example", type: "callout", tone: "neutral", title: "An example, not a safe-connection promise", body: "A search result combines a domestic arrival and an international departure under one agency order, but the flights have separate ticket numbers and use different airports in the same city. The displayed gap is not transfer time: it must absorb arrival, bags, ground travel, new check-in, security and the second carrier's cut-offs. If missing the international flight would be costly, the robust answer is usually an overnight near the departure airport or a protected itinerary—not a tighter taxi plan." },
  { id: "failure-heading", type: "heading", level: 2, text: "If the first flight is disrupted" },
  { id: "failure", type: "list", ordered: true, items: [
    "Verify the first flight's status with its carrier and identify whether the change is voluntary or involuntary under that ticket's terms.",
    "Contact the second carrier or seller before its check-in cut-off. Explain that the tickets are separate and ask for the available paid or discretionary options; do not claim automatic protection.",
    "Compare the last viable same-day alternative with an overnight and next-day departure. Protect the highest-value onward commitment, not the original sequence at any cost.",
    "If an agency marketed a specific self-transfer guarantee, read its exact eligibility, notification and evidence requirements before acting.",
    "Save carrier messages, receipts and the original product description for any claim to the seller, insurer or responsible provider. Coverage is determined by their terms."
  ] },
  { id: "red-flags-heading", type: "heading", level: 2, text: "Red flags that should change the plan" },
  { id: "red-flags", type: "table", caption: "Do not let a low fare hide a brittle connection", columns: ["Red flag", "Why it matters", "Better option"], rows: [
    ["Seller cannot clearly answer whether flights are through", "Responsibility at disruption is uncertain", "Buy directly confirmed protection or treat as separate"],
    ["Airport or terminal change", "Ground travel adds a failure system outside both tickets", "Overnight or use one airport"],
    ["Checked bags with a tight same-day gap", "Reclaim and re-check create hard cut-offs", "Protected through-check or much wider plan"],
    ["Last flight of the day", "No same-day recovery after a delay", "Earlier onward option or overnight"],
    ["Connection precedes international departure", "One domestic disruption can lose the most expensive ticket", "Arrive in the departure city the previous day"]
  ] },
  { id: "switch-heading", type: "heading", level: 2, text: "When separate tickets are still reasonable" },
  { id: "switch-rule", type: "paragraph", text: "Separate tickets can be rational when the price or route advantage is real, the traveller understands the contracts, and the itinerary includes an overnight or several viable recovery options. Choose a protected itinerary when the downside is difficult to absorb, the transfer involves bags or airports, or the traveller cannot confidently complete every formal step. The decision is about recoverability, not bravery." },
  { id: "booking-checklist", type: "list", ordered: false, items: [
    "The seller has confirmed through or non-through status in writing.",
    "Ticket numbers, airports, terminals, operating carriers and baggage treatment are known.",
    "All formalities and carrier cut-offs fit inside a conservative transfer plan.",
    "A last viable alternative and its likely cost are identified.",
    "The final international departure is not exposed to a fragile same-day self-transfer."
  ] },
  { id: "dynamic-boundary", type: "callout", tone: "warning", title: "Recheck every named operator", body: "Airline conditions, terminal assignments, airport processes and seller guarantees change. Verify the exact tickets and date near travel. This guide does not provide a universal safe connection time or legal opinion." },
  { id: "scope", type: "callout", tone: "neutral", title: "What this guide covers", body: "This guide covers contract and recovery risk for separately ticketed flights. Use airport-specific guides for ground transfers, the fare-bundle guide for baggage and flexibility pricing, and the last-night guide for positioning before international departure." },
  { id: "help-cta", type: "callout", tone: "decision", title: "Want a self-transfer stress test?", body: "Send anonymised flight dates, airports, terminals, ticket structure, baggage and onward commitment. Do not send names, passport numbers, ticket numbers or payment data." },
  { id: "more-planning", type: "internal-links", title: "Continue planning", items: [
    { label: "Protect the last night before departure", href: "/guides/china-last-night-before-international-flight/", description: "Avoid making the self-transfer the final single point of failure." },
    { label: "Check the exact Shanghai airport", href: "/guides/shanghai-pudong-or-hongqiao-airport/", description: "An airport change is not a connection." },
    { label: "Compare flight fare bundles", href: "/guides/china-domestic-flight-fare-bundle-baggage/", description: "Price baggage and change conditions before declaring a ticket cheap." }
  ] },
  { id: "sources", type: "sources", title: "Official sources reviewed", items: [
    { label: "CAAC guidance on through and non-through flights", url: "https://www.caac.gov.cn/INDEX/HLFW/HKLXCS/202303/t20230316_217590.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-08-12" },
    { label: "Public air passenger service rules", url: "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-08-12" }
  ] }
]} satisfies StructuredPageBody;
export default body;
