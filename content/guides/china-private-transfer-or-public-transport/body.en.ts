import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "Pay for a private transfer when it removes a verified weak link whose failure would matter: repeated bag handling, an unusable last stretch, a mobility constraint, an operating-hours gap or a costly missed connection. If public transport is one direct, operating line and every traveller can complete its first and last stretches, it is usually the simpler choice. A car whose pickup point, capacity, waiting and cancellation terms are unknown is not an easier solution."
    },
    {
      id: "single-segment",
      type: "callout",
      tone: "decision",
      title: "Judge one ground segment, not transport in China",
      body: "Write one origin and one destination: for example, the actual arrival terminal to the hotel vehicle entrance, or the hotel entrance to the correct railway-station security area. A good answer for that segment does not become a rule for the rest of the trip."
    },
    { id: "chain-heading", type: "heading", level: 2, text: "Compare the whole friction chain" },
    {
      id: "friction-chain",
      type: "table",
      caption: "The vehicle or train ride is only the middle",
      columns: ["Link", "Public transport proof", "Private-transfer proof"],
      rows: [
        ["Starting point", "Correct terminal or station exit and the walk to the platform", "Named pickup zone, parking building or floor—not just ‘arrivals’"],
        ["Operating window", "Current first/last service and any maintenance notice", "Driver coverage for the actual landing or departure window"],
        ["Handling", "Number of lifts, stairs, gates and times every bag must be moved", "Confirmed vehicle, usable luggage capacity and who loads it"],
        ["Ride", "Direct line or exact transfers, including ticket/payment method", "Included route, tolls, parking, night fees and stops"],
        ["Last stretch", "Usable exit, surface, weather exposure and hotel entrance", "Where the vehicle can legally stop and the final distance to reception"],
        ["Failure", "Next operating service and an official taxi or hotel fallback", "Wait start, flight tracking, no-show, cancellation and replacement process"]
      ]
    },
    { id: "exclusion-heading", type: "heading", level: 2, text: "Eliminate an option before comparing comfort" },
    {
      id: "exclusion-gates",
      type: "list",
      ordered: true,
      items: [
        "Remove a public route if its current operating hours, lift/stair chain or last stretch cannot be verified for the actual travellers.",
        "Remove a private service if the operating provider or booking counterparty cannot be identified, any required local credentials cannot be checked, or the pickup point, vehicle and luggage capacity are unknown.",
        "Remove a private service if waiting starts at an unclear moment or flight delay, terminal change, cancellation and refund terms are missing.",
        "Remove either option if the planned arrival leaves no tested recovery before a separately booked train, flight or timed event.",
        "If both are removed, redesign the segment: change the hotel, protect a buffer night or divide the trip at an airport/station hotel."
      ]
    },
    { id: "decision-heading", type: "heading", level: 2, text: "Use conditions, not a convenience score" },
    {
      id: "decision-table",
      type: "table",
      caption: "Conditional decision table for the same named segment",
      columns: ["Conditions", "Lean", "Why"],
      rows: [
        ["One direct public line; light, controllable bags; usable last walk; no immediate fixed connection", "Public transport", "A reserved car removes little and adds a meeting-point dependency"],
        ["Several transfers; bags exceed the party's free hands; difficult hotel vehicle-to-door gap is solved by the car", "Private transfer", "It removes repeated handling and a verified weak last stretch"],
        ["Strong airport or rail line, but the final station-to-hotel leg is poor", "Hybrid", "Keep the reliable trunk and buy only the difficult last segment"],
        ["Late arrival near public-service closure; driver terms and alternate official taxi rank are confirmed", "Private or official taxi", "The operating-hours gap matters more than a generic speed claim"],
        ["Wheelchair or other mobility requirement", "Whichever chain is directly confirmed", "A private car is not automatically accessible, and a lift symbol is not proof of a complete public chain"],
        ["A separate train or flight follows soon", "Redesign first", "Buying a car cannot turn an unprotected separate connection into a guaranteed one"]
      ]
    },
    {
      id: "official-example",
      type: "paragraph",
      text: "Official airport pages illustrate why labels are insufficient. Beijing Capital International Airport publishes specific ride-hailing pickup locations by terminal and parking level, so ‘the driver meets me at arrivals’ is not a safe assumption. Its Airport Express information describes a public trunk with named stations and operating hours. Shanghai's official airport transport information lists several modes and warns that detailed services can change. These are examples to verify, not nationwide promises."
    },
    { id: "travellers-heading", type: "heading", level: 2, text: "Three travellers expose three different weak links" },
    {
      id: "traveller-cases",
      type: "table",
      caption: "Examples apply the method; they do not prescribe a vendor or route",
      columns: ["Traveller", "What decides it", "Likely answer"],
      rows: [
        ["Solo traveller, one suitcase they can lift, hotel beside a direct airport-line station, no timed booking", "The platform and final exit are usable; no bag handoff or connection consequence needs to be purchased away", "Public transport normally wins, with the official taxi point saved as backup"],
        ["Family with a young child, stroller and several bags, evening arrival, complicated hotel last stretch", "Free hands, lift chain, service window, child equipment, vehicle capacity and the hotel's vehicle entrance all matter", "A private transfer may be worth it only after the vehicle, child arrangement, waiting and entrance are confirmed"],
        ["Wheelchair traveller", "Compare public lifts and station assistance with vehicle door width, chair dimensions, transfer requirement, securement and driver help", "Choose the chain that the operators confirm end to end; do not assume the car is accessible"]
      ]
    },
    { id: "quote-heading", type: "heading", level: 2, text: "Before paying, turn the car into a written service" },
    {
      id: "private-questions",
      type: "list",
      ordered: false,
      items: [
        "Who is the contracting operator, and what booking record or receipt identifies it?",
        "Which exact terminal, exit, parking building and level is the meeting point? Who contacts whom after landing?",
        "What vehicle is committed, how many passengers and actual bags fit, and are a wheelchair or child arrangement directly confirmed?",
        "When does included waiting begin: scheduled arrival, actual arrival, landing, baggage delivery or driver contact?",
        "What happens after a flight delay, terminal change, bag delay, missed call, driver no-show or wrong meeting point?",
        "Which tolls, parking, night, extra-stop and overtime charges are included, and what are cancellation and refund conditions?"
      ]
    },
    {
      id: "consumer-boundary",
      type: "callout",
      tone: "neutral",
      title: "Keep evidence; do not treat regulation as a service guarantee",
      body: "China's official rules require ride-hailing fares to be clearly displayed and support complaint handling based on an identifiable operator, facts and a specific request. Homeground's planning inference is to retain the operator identity, written quote, route, vehicle, waiting terms, messages and payment record. Those documents do not certify that the vehicle is suitable or that the pickup will succeed."
    },
    { id: "recovery-heading", type: "heading", level: 2, text: "The backup must begin at an official node" },
    {
      id: "failure-recovery",
      type: "table",
      caption: "Recovery actions for the named segment",
      columns: ["Failure", "Do now", "Do not do"],
      rows: [
        ["Flight is delayed", "Update the booked operator before landing and compare the delay with the written waiting terms", "Assume flight tracking creates unlimited free waiting"],
        ["Driver is absent or at another terminal", "Stay at the official pickup area, preserve the order record and switch to the airport's official taxi/ride-hailing point", "Follow an unsolicited tout away from the signed transport area"],
        ["Checked bag is delayed", "Obtain the airline's baggage incident record and agree collection or delivery before deciding whether the car waits", "Leave without a documented baggage process merely to protect the booking"],
        ["Public service has stopped", "Use the current official bus/taxi option or an airport hotel and remove nonessential later activity", "Build an improvised chain of closing lines"],
        ["Network or payment fails", "Go to a staffed transport desk or official taxi queue and show an offline Chinese hotel address", "Enter an unverified vehicle because the app does not work"]
      ]
    },
    { id: "change-heading", type: "heading", level: 2, text: "Recalculate when any of these conditions changes" },
    {
      id: "change-conditions",
      type: "comparison",
      columns: [
        { heading: "The car becomes more valuable", body: "More bags or travellers are added; a child, mobility or weather constraint makes repeated handling harder; arrival moves outside the useful public window; the last stretch becomes unusable; or missing the next node has a serious consequence." },
        { heading: "Public transport becomes more valuable", body: "The hotel moves beside a direct line; luggage is reduced; arrival shifts into a comfortable operating window; the private pickup requires a long parking-building walk; or driver and waiting terms remain vague." }
      ]
    },
    { id: "verification-heading", type: "heading", level: 2, text: "Final verification on the travel date" },
    {
      id: "final-verification",
      type: "list",
      ordered: false,
      items: [
        "Actual airport terminal or railway station and the correct exit or security area.",
        "Public operating hours, maintenance notices, transfers, lift/stair route and final walk.",
        "Hotel vehicle entrance, reception hours and an offline Chinese address with map pin.",
        "Contracting operator, driver contact, plate, vehicle, passenger and bag capacity, and any mobility or child equipment.",
        "Pickup sign, meeting point, waiting start, flight tracking, included charges, cancellation and refund terms.",
        "One official fallback node and the consequence if the next ticket or booking is missed."
      ]
    },
    {
      id: "scope",
      type: "callout",
      tone: "warning",
      title: "What this guide does not claim",
      body: "It does not rank suppliers, publish a national fare table, guarantee the fastest mode or replace a named airport route guide. It decides whether buying help for one high-friction arrival or departure segment removes enough verified risk to justify its quoted cost."
    },
    {
      id: "help",
      type: "callout",
      tone: "decision",
      title: "Want a human comparison for your segment?",
      body: "Leave your date, party size, actual bags, mobility needs, arrival or departure node, hotel area and approximate budget. We can compare the complete public, private and hybrid chains without choosing from a generic supplier ranking."
    },
    {
      id: "links",
      type: "internal-links",
      title: "Continue planning",
      items: [
        { label: "Plan your China trip", href: "/plan/", description: "Return to the planning collection." },
        { label: "Choose Pudong or Hongqiao Airport", href: "/guides/shanghai-pudong-or-hongqiao-airport/", description: "Airport choice can remove the difficult ground segment." },
        { label: "Connect Beijing South with Capital or Daxing Airport", href: "/guides/beijing-south-station-to-capital-or-daxing-airport/", description: "Use the named corridor guide for exact mode execution." },
        { label: "Test whether a hotel is really near the metro", href: "/guides/china-hotel-near-metro/", description: "Inspect the correct exit and last stretch." },
        { label: "Plan an accessible China route", href: "/guides/wheelchair-accessible-china-route-planning/", description: "Verify the complete station, vehicle, hotel and attraction chain for a wheelchair user." },
        { label: "Protect the last night before an international flight", href: "/guides/china-last-night-before-international-flight/", description: "Do not ask a ground transfer to rescue a fragile departure chain." },
        { label: "Protect the first day", href: "/guides/china-arrival-day-booked-anchor-or-flexible-block/", description: "Decide whether a China arrival day can reliably support a timed reservation by testing immigration, bags, transfers, hotel logistics and missed-entry rules." },
        { label: "Understand China's robotaxi zones", href: "/guides/china-robotaxi-zones-explained/", description: "Understand robotaxi zones, pilot stages, vehicle supervision and why an open test road is not necessarily a public ride service." },
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        { label: "Ride-hailing pickup locations", url: "https://www.bcia.com.cn/jcwyc.html", publisher: "Beijing Capital International Airport", reviewedAt: "2026-08-13" },
        { label: "Airport Express information", url: "https://www.bcia.com.cn/dtjcx.html", publisher: "Beijing Capital International Airport", reviewedAt: "2026-08-13" },
        { label: "Shanghai airport transport overview", url: "https://english.shanghai.gov.cn/en-Transportation/20231214/649e06ea38f74aaeb573fa2debbe97d3.html", publisher: "Shanghai Municipal People's Government", reviewedAt: "2026-08-13" },
        { label: "Station entry and rail ticket FAQ", url: "https://www.12306.cn/en/faq.html?item=2", publisher: "China Railway 12306", reviewedAt: "2026-08-13" },
        { label: "Public air transport passenger service rules", url: "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html", publisher: "Civil Aviation Administration of China", reviewedAt: "2026-08-13" },
        { label: "Interim measures for online ride-hailing services", url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2023/art_1f0d6bf9e2e6476aa22af1d17f38e1ef.html", publisher: "State Administration for Market Regulation", reviewedAt: "2026-08-13" },
        { label: "Market-supervision complaint handling measures", url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2026/art_e4d03a20c0fd49769e408c7bf3791ff5.html", publisher: "State Administration for Market Regulation", reviewedAt: "2026-08-13" }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
