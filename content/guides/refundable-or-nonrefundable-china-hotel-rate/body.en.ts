import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "The refundable-vs-non-refundable question is not answered by a price tag or a rule of thumb. It is answered by your dependencies: how many earlier commitments — flights, visas, attraction reservations, companions, weather-exposed routes — must succeed for this specific night to happen as planned. Count them before you look at rates. When several hard dependencies sit in front of a hotel night, the flexible rate's premium buys you an exit; when almost nothing can go wrong in front of it, the non-refundable price is a legitimate saving. China adds one twist: there is no nationwide standard cancellation policy, so every protection you get lives inside the rate rules of the exact rate code you book.",
    },
    {
      id: "first-steps-heading",
      type: "heading",
      level: 2,
      text: "Six things to do before choosing a rate",
    },
    {
      id: "first-steps-list",
      type: "list",
      ordered: true,
      items: [
        "List what must already be true for this night to happen: visa granted, international flight booked, onward train reserved, attraction slots confirmed, travel companion committed.",
        "Open both rate options for the same room type and read only the cancellation line first: deadline, fee ladder, and whether changes are allowed at all.",
        "Convert the free-cancellation deadline into your home time zone once, then write down both times next to the booking.",
        "Identify the payment structure: prepaid online, pay at the property, or card-guaranteed with later charging.",
        "Decide who needs to change plans most easily on this trip — usually the first and last nights.",
        "Before paying, save the order number, the full rate-rule text, the deadline time zone, room type, guest name spelling, and where confirmation comes from — platform, property, or both.",
      ],
    },
    {
      id: "formula-heading",
      type: "heading",
      level: 2,
      text: "A decision formula without invented prices",
    },
    {
      id: "formula-p1",
      type: "paragraph",
      text: "You do not need statistics to make this decision well. You need four honest inputs about your own trip:",
    },
    {
      id: "formula-list",
      type: "list",
      ordered: true,
      items: [
        "Flexible-rate premium: the difference between the cancellable rate and the cheapest non-refundable rate for the same room, same night. Whatever it is, write it down.",
        "Maximum non-refundable loss: the total money that disappears if you cancel late or no-show under the non-refundable rules — including any prepayment and guaranteed amounts.",
        "Dependency count: how many separate earlier commitments must all succeed for this night to be needed. One dependent flight is one; a visa plus a flight plus two attraction bookings is four.",
        "Failure consequence: what happens to the rest of the trip if this night collapses — an inconvenient extra transfer, or a missed park-entry window, or nothing at all because you were flexible anyway.",
      ],
    },
    {
      id: "formula-callout",
      type: "callout",
      title: "How to weigh it",
      body: "As dependency count rises, or failure consequence becomes severe, paying the premium for flexibility becomes rational even when the premium feels large relative to one night. As dependencies fall toward zero and consequences become trivial, the non-refundable rate is simply cheaper execution of a plan that is unlikely to change. Neither input requires a forecast — only honesty about the trip you actually booked.",
      tone: "decision",
    },
    {
      id: "matrix-heading",
      type: "heading",
      level: 2,
      text: "Dependency matrix: which nights carry hidden risk",
    },
    {
      id: "matrix-table",
      type: "table",
      caption: "Typical risk profile of six common hotel nights in a China itinerary",
      columns: ["Night", "What sits in front of it", "Why flexibility matters more here"],
      rows: [
        ["First night after international arrival", "Visa or entry decision, long-haul flight, immigration queue, possible missed connection, jet-lagged timing.", "Any upstream failure lands here. A same-day switch of cities or a delayed passport stamp makes the original night unusable."],
        ["Night depending on separate transport", "An independently booked train, flight or ferry arriving that evening.", "If that service slips a day or cancels, the hotel is stranded. Separate tickets multiply this exposure."],
        ["Scenic-area base night", "Park or museum reservations, weather-dependent cable cars, seasonal road access.", "Attractions close for weather or capacity control; if the sightseeing day moves, the base night may need to move with it."],
        ["Typhoon-season or winter-exposure night", "Storm warnings, ferry suspensions, mountain-road closures, flight waves during disruption days.", "Regional disruptions arrive in clusters; being locked into one exposed property on one fixed night is exactly when refunds matter."],
        ["Last night before leaving China", "International departure flight, airport transfer, checkout timing.", "Moving the final night or trimming it entirely is a common adjustment; heavy penalties here are painful near the end of a budget."],
        ["Ordinary mid-trip city night", "Little beyond your own pace decisions.", "Low dependency, low consequence. This is the natural place to accept a non-refundable rate and keep budget elsewhere."],
      ],
    },
    {
      id: "terms-heading",
      type: "heading",
      level: 2,
      text: "What the rate terms actually control",
    },
    {
      id: "terms-intro",
      type: "paragraph",
      text: "China has no nationwide standard hotel cancellation law that fixes deadlines or refunds; rights come from the rate code you selected and the seller's terms layered over it. Read these six mechanics before paying, because each one changes what \"refundable\" means in practice.",
    },
    {
      id: "terms-deadline",
      type: "paragraph",
      text: "Free-cancellation deadline. Refundable does not mean refundable forever. The rate shows a moment in time after which fees appear or everything is forfeited. Note whether the deadline is expressed in the property's local clock or another zone, convert it once to your own zone, and remember that mainland China runs on a single national standard time — Beijing time, eight hours ahead of UTC, year-round with no daylight switching — so within-China comparisons are simpler than they look; the conversion that matters is between China time and your home zone.",
    },
    {
      id: "terms-payment",
      type: "paragraph",
      text: "Prepaid versus pay-at-property versus card guarantee. Booking platforms state plainly that some products require online prepayment while others are paid when you use the product, such as checking in. Prepaid non-refundable rates put your money out early; pay-at-property keeps cash with you but may still charge a penalty through the card on file if you fail to arrive under the rate rules. A guarantee card authorizes the property to apply the stated no-show charge; it is authorization, not an automatic empty threat, and not a blank check either — only what the rate rules state can be taken.",
    },
    {
      id: "terms-changes",
      type: "paragraph",
      text: "Changing dates and shortening stays are distinct operations. Some flexible rates let you move dates freely before the deadline; others allow cancellation but not modification, which forces a cancel-and-rebook at today's price. Shortening a multi-night stay is treated by many properties as a partial cancellation of remaining nights — under a semi-flexible code the last nights may still carry fees even when the first ones do not. No-show — not cancelling and not arriving — is usually the worst outcome under any code: under non-refundable rules the whole amount is typically forfeited, and under flexible rules missing the cancellation deadline can convert the whole stay into a charged no-show.",
    },
    {
      id: "terms-partial",
      type: "paragraph",
      text: "Partial refunds exist but are computed, not promised. Where a fee ladder applies (for example, different percentages by days-before-arrival), the refund is the paid amount minus the applicable tier. Platform mediation can adjust outcomes when a supplier fails, but voluntary changes you request follow the published ladder. Nobody owes you a refund outside the rules you accepted at checkout.",
    },
    {
      id: "terms-reread",
      type: "paragraph",
      text: "One more habit closes most disputes before they start. Booking flows often summarize rules in badges and tooltips, but those summaries are not the contract — the full rate text is. Before any change or cancellation request, reopen the order and read the binding wording again rather than relying on what you remember from checkout. Rules can differ between two rates of the same room on the same night, and a summary that hides a modification ban or an early deadline is exactly how flexible plans turn into forfeits.",
    },
    {
      id: "examples-heading",
      type: "heading",
      level: 2,
      text: "Three worked patterns (illustrative examples, not live prices)",
    },
    {
      id: "example-table",
      type: "table",
      caption: "How the formula resolves three common situations",
      columns: ["Situation", "Inputs in plain language", "Reasonable outcome"],
      rows: [
        ["Low-risk ordinary city night", "Mid-trip, own transport, walkable plans, nothing booked in front except dinner. Premium for the flexible rate exists but the failure consequence is small.", "Non-refundable is defensible. If the plan melts down, the loss is bounded by one night you chose to save on."],
        ["High-risk international arrival night", "Visa issued recently, long-haul arrival late evening, domestic connection next morning booked separately. Multiple dependencies; severe consequence if entry or the flight fails.", "Pay the premium. Flexibility here protects the whole first 48 hours, not just one bed. Anchor the cancellation deadline to your departure city's clock."],
        ["Multi-city route not yet locked", "Four stops sketched, two scenic reservations pending, typhoon season, intercity tickets bought only a few days ahead. Dependencies high and uneven across nights.", "Split the strategy: flexible rates for arrival night, exposed coastal or island nights, and the pre-departure night; non-refundable acceptable for stable inland mid-trip nights once tickets exist."],
      ],
    },
    {
      id: "examples-note",
      type: "callout",
      title: "These are teaching examples",
      body: "The three rows describe structures, not real bookings, and deliberately contain no prices or percentages. Real premiums vary by city, date, property and platform hour by hour; compare your actual two rates rather than trusting anyone's average.",
      tone: "neutral",
    },
    {
      id: "proof-heading",
      type: "heading",
      level: 2,
      text: "A screenshot is not enough: build the proof pack",
    },
    {
      id: "proof-intro",
      type: "paragraph",
      text: "If you ever need to argue a cancellation, a screenshot of a rate table will disappoint you. Save these six elements while booking, in text form wherever possible:",
    },
    {
      id: "proof-list",
      type: "list",
      items: [
        "Order number — the platform reference plus any property-side confirmation number; both identify the same stay in different systems.",
        "The specific rate-rule text — copy the exact cancellation and change wording shown for your chosen rate code, not the general help-page version.",
        "Time zone of the deadline — written explicitly, converted to your home zone once.",
        "Room type and occupancy — the exact code name; 'same category' disputes start when this is vague.",
        "Guest name spelling — matching the passport, since registration mismatches create their own problems at the desk.",
        "Both confirmations — what the platform sent and what (if anything) the property sent; note the gap if the property has not confirmed yet.",
      ],
    },
    {
      id: "proof-callout",
      type: "callout",
      title: "Where to keep it",
      body: "Store the pack offline together with payment proof. If a dispute ever escalates — to the platform, a card inquiry or a consumer channel — dated, complete records are what those processes consume. Our evidence-pack guide explains the escalation mechanics; this page only insists you collect the inputs.",
      tone: "decision",
    },
    {
      id: "boundary-heading",
      type: "heading",
      level: 2,
      text: "What no choice can promise",
    },
    {
      id: "boundary-list",
      type: "list",
      items: [
        "\"Refundable\" never means full refund at any time — every refundable rate has a boundary moment, and some exclude modifications entirely.",
        "A non-refundable rate is not automatically a mistake — for low-dependency nights it is the rational buy; the error is buying it for fragile nights to save a small difference.",
        "No nationwide Chinese cancellation statute fixes hotel deadlines or refunds — outcomes come from your rate code, the seller's contract, and any platform-specific guarantee attached to your product.",
        "This page publishes no average premiums, savings percentages or price levels — those numbers move constantly and mean nothing without your exact dates and room.",
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Related stay planning",
      items: [
        { "label": "Foreign passports and China hotels", "href": "/guides/foreigners-china-hotel/", "description": "Confirm guest-registration fit before locking any rate." },
        { "label": "Last night before an international flight", "href": "/guides/china-last-night-before-international-flight/", "description": "Treat the departure-eve night as its own risk decision." },
        { "label": "Build a booking-dispute evidence pack", "href": "/guides/china-booking-dispute-evidence-pack/", "description": "Escalate with dated records if a cancellation goes wrong." },
        { "label": "International chain or local hotel in China", "href": "/guides/international-chain-or-local-hotel-china/", "description": "Property-type choice interacts with rate consistency and support." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Primary sources reviewed",
      items: [
        { "label": "Trip.com Terms and Conditions (prepayment vs pay-at-use; product terms shown at checkout form part of the contract; unpaid sums may lead to cancellation)", "url": "https://www.trip.com/contents/service-guideline/terms.html", "publisher": "Trip.com", "reviewedAt": "2026-08-22" },
        { "label": "Interim Provisions on the Administration of Online Tourism Business Services (truthful information; open, queryable booking channels)", "url": "https://zwgk.mct.gov.cn/zfxxgkml/zcfg/bmgz/202012/t20201204_905349.html", "publisher": "Ministry of Culture and Tourism of the PRC", "reviewedAt": "2026-08-22" },
        { "label": "Beijing Time explained (single national standard time UTC+8, generated and broadcast by NTSC)", "url": "http://www.ntsc.cas.cn/xwzx_/cmsm/200503/t20050323_5772482.html", "publisher": "National Time Service Center, Chinese Academy of Sciences", "reviewedAt": "2026-08-22" },
      ],
    },
  ],
};

export default body;

