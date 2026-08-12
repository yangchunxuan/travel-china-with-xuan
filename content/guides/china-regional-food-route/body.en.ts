import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-answer",
      type: "lead",
      text: "Build a China food route around two or three connected regional roles, not famous restaurants. Give each region a different job—perhaps a social breakfast, seasonal market, cooking-technique contrast or shared evening meal—then test whether the transport direction leaves real meal windows. Every important role needs a same-region substitute. If one closure breaks the route, it is a restaurant list, not a resilient food journey."
    },
    {
      id: "definition-heading",
      type: "heading",
      level: 2,
      text: "A food route is a set of regional roles"
    },
    {
      id: "definition-body",
      type: "paragraph",
      text: "China's national intangible-cultural-heritage material describes ingredients, preparation, cooking and eating customs; the Ministry of Culture and Tourism's 2026 food routes use specific places and traditions. That supports planning around local systems of eating. It does not certify a restaurant, make one dish represent a province or prove a tradition is available daily. Define the region's role before choosing a venue."
    },
    {
      id: "role-matrix-heading",
      type: "heading",
      level: 2,
      text: "Assign each candidate region one primary role"
    },
    {
      id: "role-matrix",
      type: "table",
      caption: "Regional-role matrix: choose contrast without turning cuisines into stereotypes",
      columns: ["Role", "What earns route space", "Evidence to verify", "Fallback unit"],
      rows: [
        ["Meal format", "A distinctive way of eating together or at a particular time of day", "Local cultural or heritage material, current service window", "Another venue offering the same meal format"],
        ["Technique", "Preparation, preservation or cooking methods that differ from the previous region", "Official heritage record or credible local interpretation", "A market, museum or different dish demonstrating the technique"],
        ["Staple and everyday food", "A useful contrast in grains, noodles, breads or ordinary meals", "What residents can actually obtain beyond a ceremonial tasting", "A breakfast shop, food hall or simple neighbourhood meal"],
        ["Market and season", "Produce, tea or preserved foods tied to place and time", "Market opening, season and whether tasting is permitted", "A covered market, specialty shop or cultural display"],
        ["Shared-table experience", "A meal whose ordering and group format adds social context", "Group size, dietary fit and reservation conditions", "A smaller shared meal or an individually ordered version" ]
      ]
    },
    {
      id: "selection-rule",
      type: "comparison",
      title: "Decide whether another region deserves a place",
      columns: [
        {
          heading: "Add it",
          body: "It contributes a role the route does not yet have, lies in the forward travel direction and still receives at least one unhurried meal window."
        },
        {
          heading: "Keep it optional",
          body: "The contrast is valuable but depends on a seasonal market, a narrow service period or a transport connection that must be checked later."
        },
        {
          heading: "Cut it",
          body: "Its only argument is one famous restaurant, it repeats an existing role, or reaching it consumes the breakfast, lunch or dinner the detour was meant to create."
        }
      ]
    },
    {
      id: "scenario-one",
      type: "callout",
      tone: "neutral",
      title: "Traveller scenario 1: two strong chapters beat four rushed labels",
      body: "A couple has nine nights, enters through an eastern gateway and leaves from Chengdu. They want seasonal cooking, everyday noodles, tea and Sichuan flavours. An eastern region can cover market, season and lighter shared meals; the Sichuan Basin adds technique and flavour contrast. Cut a southern morning-tea detour if it leaves only an airport evening and rushed breakfast. This illustrates selection, not a prescribed itinerary."
    },
    {
      id: "transport-heading",
      type: "heading",
      level: 2,
      text: "Make the transport chain protect the meals"
    },
    {
      id: "transport-body",
      type: "paragraph",
      text: "A timetable shows that two cities connect, not that the move creates a useful food day. Count hotel exit, terminal access, security, waiting, travel, new-hotel access and recovery. A lunchtime arrival may miss a market's active morning; a late train may remove dinner. Check current transport after choosing the direction, and treat availability as a verification field rather than a permanent fact."
    },
    {
      id: "transport-workflow",
      type: "list",
      ordered: true,
      items: [
        "Place international arrival and departure gateways first; an open-jaw trip can prevent doubling back.",
        "Draw one forward chain and mark every hotel change. A fast train alone does not justify another region.",
        "For each transfer, mark the breakfast, lunch and dinner windows left after door-to-door movement.",
        "Put narrow-time experiences on stable nights, not arrival or departure edges. A morning format needs a real morning.",
        "Keep the first post-transfer meal replaceable and close to the hotel; fatigue and delay change appetite too.",
        "Before booking, confirm the official channel, exact terminal, operating day and current service pattern."
      ]
    },
    {
      id: "transfer-tax",
      type: "table",
      caption: "Do not hide the transfer tax inside a food label",
      columns: ["Route signal", "What it costs", "Editorial response"],
      rows: [
        ["A separate flight for one meal", "Airport access, security, baggage and disruption exposure", "Require a broader regional role or remove the detour"],
        ["A rail stop with a different station on departure", "Two unfamiliar last-mile chains and another hotel move", "Verify both stations before calling it an easy stop"],
        ["Arrival during the signature meal window", "The experience exists on paper but not in usable time", "Move the transfer or choose a replaceable meal"],
        ["Two regions with the same role", "More movement without more contrast", "Keep the region with the stronger route geometry or dietary fit"]
      ]
    },
    {
      id: "change-condition",
      type: "callout",
      tone: "decision",
      title: "What changes the conclusion",
      body: "Add a region when an open-jaw flight removes backtracking, a longer stay creates several meal windows or the region supplies a missing role. Remove it for limited stamina, repeated hotel changes, a fragile service window or dietary needs that erase most of the contrast. These are Homeground editorial decisions, not official endorsements."
    },
    {
      id: "diet-heading",
      type: "heading",
      level: 2,
      text: "Put dietary limits into route design, not a note at the end"
    },
    {
      id: "diet-questions",
      type: "table",
      caption: "Questions that must be answered before an experience becomes an anchor",
      columns: ["Question", "Why it matters", "If the answer is unclear"],
      rows: [
        ["Which exact ingredient must be avoided?", "Broad words such as vegetarian or nut-free may not identify stocks, sauces or cooking oils", "Use a written ingredient statement and simplify the meal"],
        ["Is cross-contact a serious risk?", "A menu label cannot describe every shared wok, fryer, knife or serving utensil", "Choose a venue able to answer directly or use a controlled fallback"],
        ["Can at least one traveller explain the restriction in writing?", "A busy market is a poor place to improvise a medical conversation", "Prepare Chinese text and an emergency plan before travel"],
        ["Does the regional role survive the restriction?", "A route may promise contrast while leaving the traveller unable to participate", "Change the role from tasting to technique, culture or a safer meal format"],
        ["Is there a nearby alternative?", "A single must-eat venue creates pressure to accept an uncertain answer", "Record one confirmed substitute and one simple backup meal" ]
      ]
    },
    {
      id: "allergy-boundary",
      type: "callout",
      tone: "warning",
      title: "No route can guarantee an allergen-safe kitchen",
      body: "State Administration for Market Regulation guidance advises people with food allergies to read packaged labels, ask when uncertain and explain needs when dining out. That reduces uncertainty but does not prove a kitchen prevents cross-contact. For a severe allergy, seek direct confirmation, carry prescribed emergency medication and leave when answers are unclear. Individual risk management needs medical advice."
    },
    {
      id: "scenario-two",
      type: "callout",
      tone: "neutral",
      title: "Traveller scenario 2: the restriction changes the route role",
      body: "A family includes a vegetarian traveller with a severe peanut allergy. Repeated market tasting creates ingredient and cross-contact uncertainty. They keep the region but change its role: a pre-confirmed meal, a tea or food-culture visit and packaged specialties with readable labels replace uncontrolled sampling. If a restaurant cannot explain oil, sauce and shared equipment, they use a simple backup rather than negotiate while hungry and rushed."
    },
    {
      id: "fallback-heading",
      type: "heading",
      level: 2,
      text: "Build a fallback ladder before choosing restaurant names"
    },
    {
      id: "fallback-ladder",
      type: "table",
      caption: "Four levels of recovery keep one closure from breaking the route",
      columns: ["Level", "Failure", "Replacement"],
      rows: [
        ["1. Same role, same area", "The chosen venue is closed or full", "Use another nearby venue serving the same meal format or technique"],
        ["2. Same region, different format", "The meal window or reservation is lost", "Use a market, food hall, tea experience, cultural display or simpler meal"],
        ["3. Same route, different day", "Weather, fatigue or transport removes the current window", "Move the regional role to another stable meal window already in that base"],
        ["4. Protect health and pace", "No answer is safe or the detour no longer fits", "Use the simple backup, rest, and delete the experience without adding another transfer"]
      ]
    },
    {
      id: "closure-example",
      type: "callout",
      tone: "decision",
      title: "Recovery example: replace the role, not the postcode",
      body: "If a famous breakfast venue closes, look for the same morning format nearby. Otherwise keep the regional chapter through a market, tea session or ordinary local breakfast. Do not cross—or add—another city to preserve a restaurant name. The cultural purpose can survive the original pin."
    },
    {
      id: "failures-heading",
      type: "heading",
      level: 2,
      text: "Five ways food routes become fragile"
    },
    {
      id: "failure-table",
      type: "table",
      caption: "Common failure and recovery patterns",
      columns: ["Failure", "Why it fails", "Repair"],
      rows: [
        ["One signature dish per city", "It confuses collection with cultural depth", "Give each region a broader role and allow more than one expression"],
        ["Every meal is a reservation", "Delays and appetite changes have nowhere to go", "Protect only scarce anchors; leave ordinary meals flexible"],
        ["A viral list defines authenticity", "Popularity, opening and ownership can change", "Use official cultural context, then verify the current venue directly"],
        ["Transfer days count as full tasting days", "Door-to-door movement removes meal windows", "Audit breakfast, lunch and dinner separately"],
        ["Dietary needs are translated once", "Ingredients and shared equipment change by dish and kitchen", "Ask the exact question at every anchor and keep a fallback"]
      ]
    },
    {
      id: "verify-heading",
      type: "heading",
      level: 2,
      text: "Final verification before committing the route"
    },
    {
      id: "verification-list",
      type: "list",
      ordered: false,
      items: [
        "Each region has one primary role and does not merely repeat the previous stop.",
        "The route moves forward between sensible international gateways.",
        "Every transfer has been converted into remaining breakfast, lunch and dinner windows.",
        "Time-specific markets and meal formats sit on stable nights, not optimistic arrival edges.",
        "Official railway or airline channels confirm the relevant connection, station or airport close to booking.",
        "Every anchor has a current opening or service check and a same-region substitute.",
        "Dietary questions, written translations, medication and a simple backup meal are ready where relevant.",
        "No non-refundable restaurant booking is carrying more risk than the experience is worth."
      ]
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "What this guide does not do",
      body: "This page does not rank food cities or cuisines, certify restaurants, provide a day-by-day route or guarantee allergy safety. It explains how to choose regional roles and preserve them when a venue, meal window or connection changes."
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "Need a human check of the route?",
      body: "Send your dates, travellers, gateways, dietary limits and approximate budget. Homeground can identify duplicated roles, transfer-heavy detours and experiences needing a confirmed fallback."
    },
    {
      id: "more-planning",
      type: "internal-links",
      title: "Continue planning",
      items: [
        { "label": "Browse the China planning collection", "href": "/plan/", "description": "Place the food route inside the wider transport, timing and culture plan." },
        { "label": "Prepare for a first shared meal", "href": "/guides/first-shared-meal-in-china/", "description": "Understand ordering, sharing and paying once the route reaches the table." },
        { "label": "Understand Guangzhou morning tea", "href": "/guides/how-guangzhou-morning-tea-works/", "description": "Use the dedicated guide if that regional meal format earns a place." },
        { "label": "Use China's high-speed rail for the first time", "href": "/guides/china-high-speed-train-first-time-guide/", "description": "Verify the operating steps after the regional direction is chosen." }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources reviewed",
      items: [
        { "label": "40 intangible-cultural-heritage food routes", "url": "https://www.mct.gov.cn/whzx/bnsj/fwzwhycs/202601/t20260128_964439.html", "publisher": "Ministry of Culture and Tourism", "reviewedAt": "2026-08-13" },
        { "label": "Chinese culinary techniques and customs", "url": "https://www.ihchina.cn/project_details/23583.html", "publisher": "China Intangible Cultural Heritage Digital Museum", "reviewedAt": "2026-08-13" },
        { "label": "Sichuan cuisine techniques", "url": "https://www.ihchina.cn/project_details/23586.html", "publisher": "China Intangible Cultural Heritage Digital Museum", "reviewedAt": "2026-08-13" },
        { "label": "Guangzhou morning-tea protection rules", "url": "https://wglj.gz.gov.cn/gzdt/zwxx/content/post_10755149.html", "publisher": "Guangzhou Municipal Culture, Radio, Television and Tourism Bureau", "reviewedAt": "2026-08-13" },
        { "label": "Food-safety consumer guidance", "url": "https://www.samr.gov.cn/cms_files/filemanager/1647978232/attach/20233/P020190618522322788915.pdf", "publisher": "State Administration for Market Regulation", "reviewedAt": "2026-08-13" },
        { "label": "Official railway FAQ", "url": "https://www.12306.cn/en/faq.html?item=2", "publisher": "China Railway 12306", "reviewedAt": "2026-08-13" }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
