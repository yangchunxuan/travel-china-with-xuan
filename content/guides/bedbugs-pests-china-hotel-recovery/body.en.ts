import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "If you suspect bedbugs or see obvious pests in your China hotel room, stop unpacking before anything else. Containment comes first, documentation second, negotiation third: seal your luggage away from soft furnishings, record what you actually observed with timestamps, and involve the front desk and your booking platform while deciding whether another room in the same building is genuinely safe enough. Do not diagnose the species from a bite, do not spray unknown chemicals, and do not turn suspicion into a public accusation - those steps damage you more than they help.",
    },
    {
      id: "dont-heading",
      type: "heading",
      level: 2,
      text: "Four things not to do first",
    },
    {
      id: "dont-list",
      type: "list",
      items: [
        "Do not carry your open suitcase into another room. That is exactly how insects travel between rooms and floors - and how your own belongings become contaminated.",
        "Do not spread clothes, bags or bedding through corridors, lifts or the lobby while you decide what to do.",
        "Do not douse the room or your belongings with supermarket pesticides. Unknown chemicals on bedding are a health risk, can ruin evidence, and do not solve an established infestation - public-health agencies point travellers toward professional treatment instead.",
        "Do not post names, room numbers, staff faces or unverified claims online. Suspicion is not confirmation, and misidentification travels faster than corrections.",
      ],
    },
    {
      id: "tree-heading",
      type: "heading",
      level: 2,
      text: "The containment-first action tree",
    },
    {
      id: "tree-list",
      type: "list",
      ordered: true,
      items: [
        "Stop unpacking. Zip every bag closed. Whatever has been opened stays in one pile in one place.",
        "Isolate luggage: move suitcases and sealed bags onto the hard, smooth surface furthest from the bed - many travellers use the bathroom floor or a luggage rack pulled to the centre of tiled areas. Keep everything off upholstered chairs and beds.",
        "Record at low risk: photograph what you saw where you saw it - seams of the mattress, headboard, skirting boards, chair seams - without handling insects bare-handed. Note the exact date, time and room number.",
        "Contact the hotel calmly and ask for the duty manager rather than debating with the newest clerk. Show what you observed and ask what their procedure is: inspection, treatment, relocation.",
        "Judge whether a different room is enough. A room change only helps when the new room is far from the affected one - pests that live near beds tend to stay within a few metres of where people sleep, so the next-door room is usually not the answer.",
        "Change hotels or request professional treatment if the property cannot offer a distant, verified room tonight or cannot commit to proper pest-control service. Keep receipts for any replacement lodging and transport.",
        "Handle clothing afterwards: launder travel-worn garments at high heat where fabric-care labels allow, and dry-clean what cannot be washed, following current public-agency guidance. Re-inspect bags before they touch another bed anywhere.",
      ],
    },
    {
      id: "evidence-heading",
      type: "heading",
      level: 2,
      text: "What you saw, and what it can honestly prove",
    },
    {
      id: "evidence-table",
      type: "table",
      caption: "Observation strength and the response each one justifies",
      columns: ["Observation", "What it supports", "Reasonable response"],
      rows: [
        ["A live insect consistent with descriptions of bedbugs, photographed in place", "Strong reason to demand immediate inspection and relocation options.", "Containment plus duty-manager conversation the same evening."],
        ["Dark spotting or small rust-coloured stains along mattress seams", "Consistent with described harbourage signs; still not species-level proof by itself.", "Ask for inspection; treat as presumptive until someone qualified checks."],
        ["Pale translucent shed skins in furniture seams", "Moulting evidence consistent with an active population nearby.", "Same as above; mention precisely where skins were found."],
        ["Bite marks on skin alone", "Very weak evidence - reactions are not specific to any insect, and some people show no marks at all.", "Do not accuse based on bites alone; note timing and seek medical advice if skin reactions worry you."],
        ["A professional inspector confirms the species", "The only full confirmation.", "Then compensation, treatment records and relocation talks proceed on solid ground."],
      ],
    },
    {
      id: "contain-heading",
      type: "heading",
      level: 2,
      text: "Containment details that actually matter",
    },
    {
      id: "contain-list",
      type: "list",
      items: [
        "Bag it: seal suitcases, day packs and anything fabric in plastic bags you have or can buy downstairs. Double-bag items that were on or near the bed.",
        "Hard surfaces only: bathroom floors and tiled areas are the least friendly terrain for hiding insects. Nothing on the bed, nothing on upholstery, until this is resolved.",
        "Laundry lane: worn clothes go into a separate sealed bag immediately; wash hot and dry hot where labels allow. Dry-clean-only pieces stay bagged until they can be treated professionally.",
        "Electronics and documents: inspect seams and zip pockets under bright light; wipe hard cases rather than spraying them.",
        "Before checkout anywhere else: re-inspect bag exteriors, wheel housings and inner pockets over a bright, hard floor.",
      ],
    },
    {
      id: "move-heading",
      type: "heading",
      level: 2,
      text: "Room change, floor change, or hotel change",
    },
    {
      id: "move-table",
      type: "table",
      caption: "Choosing the right escape distance",
      columns: ["Option", "When it is reasonable", "Conditions to insist on"],
      rows: [
        ["Different room, same corridor", "Almost never - harbourages travel with the corridor's soft furnishings and shared walls.", "Only if the hotel shows a documented inspection clearing that specific room after treatment."],
        ["Distant room or different floor", "Acceptable middle ground when the hotel acts professionally tonight.", "Verified distance from the affected area, fresh inspection, and a written note of who approved the move."],
        ["Different hotel entirely", "Late nights, family travel, or any refusal to take the report seriously.", "Platform-mediated rebooking or self-paid fallback with receipts; original booking handled as a failed-stay claim afterwards."],
      ],
    },
    {
      id: "talk-heading",
      type: "heading",
      level: 2,
      text: "Talking to the hotel without turning it into a fight",
    },
    {
      id: "talk-list",
      type: "list",
      items: [
        "State observations, not verdicts: \"I found this insect and these spots beside the bed seam at 21:40\" beats \"your hotel has bedbugs\".",
        "Ask three concrete questions: Who will inspect, when? What is the treatment plan if confirmed? What are my relocation choices tonight?",
        "Request written acknowledgment of the report - even a short chat message to your own phone works as a timestamp.",
        "Involve the booking platform early for prepaid orders: platforms must assist travellers under China's online-travel rules, and some publish explicit guarantees for failed stays. Refund or relocation outcomes still follow your product terms and the property's actual handling - nobody can promise an amount in advance.",
        "Keep the tone boring and factual. Managers respond to contained, documented guests far better than to escalations.",
      ],
    },
    {
      id: "health-callout",
      type: "callout",
      title: "If your skin or health worries you",
      body: "Reactions to insect bites differ widely, and serious allergic responses are rare but real. This guide does not diagnose bites, recommend medicines or give doses. If itching is intense, blisters spread, or you feel unwell, seek qualified medical care - hospital dermatology departments in major Chinese cities handle foreign patients routinely, and your insurer's assistance line can direct you. Bring your medication list if you take prescriptions.",
      tone: "warning",
    },
    {
      id: "review-heading",
      type: "heading",
      level: 2,
      text: "Writing reviews and complaints that hold up",
    },
    {
      id: "review-list",
      type: "list",
      items: [
        "Describe only what you personally observed, with dates and times: the insect, the spots, the room number, whom you informed, what the hotel did.",
        "Include the hotel's response honestly - including prompt, decent handling. Fairness makes your account credible.",
        "Avoid medical conclusions, species declarations and motive claims unless professionally confirmed.",
        "Never publish other guests' images, staff names, or documents containing booking references.",
        "For money recovery, work the dispute route with your evidence pack rather than review pressure alone - reviews inform future travellers; disputes move refunds.",
      ],
    },
    {
      id: "scenario-heading",
      type: "heading",
      level: 2,
      text: "One pest evening, step by step (an illustrative composite)",
    },
    {
      id: "scenario-p1",
      type: "paragraph",
      text: "To make the sequence concrete, here is how a well-handled evening typically unfolds. This is a teaching scenario assembled from the guidance above - not a real booking and not any specific property.",
    },
    {
      id: "scenario-list",
      type: "list",
      ordered: true,
      items: [
        "21:20 - While unpacking you notice small dark spotting along a mattress seam and one insect near the headboard. You stop, zip every bag, and photograph everything in place with the room-number card visible.",
        "21:35 - Luggage moves to the bathroom floor; worn clothes go into a sealed bag; the rack sits away from soft furnishings.",
        "21:45 - The duty manager arrives. You show observations, not conclusions. She orders an immediate inspection and offers a fourth-floor room while the affected floor is checked.",
        "22:10 - You ask what inspection that room received tonight and have the answer written into your front-desk chat thread; you accept only after a distant room was confirmed inspected or treated.",
        "22:40 - Platform support is informed in writing: order number, times, observations, hotel response. The case is logged under your product's terms.",
        "Morning - Worn clothes are laundered hot where labels allow; bags are re-inspected on a hard floor. If skin reactions worry you, qualified medical care comes first, paperwork second.",
        "After checkout - Your review states observed facts and the hotel's handling honestly; your dispute file, if needed, holds timestamps rather than adjectives.",
      ],
    },
    {
      id: "slept-heading",
      type: "heading",
      level: 2,
      text: "If you already slept there",
    },
    {
      id: "slept-p1",
      type: "paragraph",
      text: "Many reports happen the morning after. Nothing changes about containment: shower normally, keep from scratching anything itchy, seal fabric items immediately, and inspect seams over a bright, hard floor. Report to the front desk before checkout even if you plan to move anyway - a same-day record makes later claims workable. Marks can appear hours to days later, so their absence tonight proves nothing either way; keep notes factual.",
    },
    {
      id: "treatment-heading",
      type: "heading",
      level: 2,
      text: "What professional treatment should look like",
    },
    {
      id: "treatment-p1",
      type: "paragraph",
      text: "If the property commits to pest-control service, public-agency guidance describes professional treatment as inspection plus targeted application by trained operators, usually with follow-up visits rather than a single spray. Ask three questions: which licensed operator will attend, when; whether neighbouring rooms will be inspected too; and what written record you will receive. A promise of one anonymous aerosol pass is not professional treatment.",
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "Three questions this page gets asked",
    },
    {
      id: "faq-list",
      type: "list",
      items: [
        "If I walk out at midnight, do I get my money back? Not automatically - and often not in full. Leaving without any record converts a strong case into a weak one. Either get the hotel's failure acknowledged in writing first, or pay for the fallback knowingly and claim documented costs afterwards.",
        "Should I throw my suitcase away? Almost never. Sealed bags, hot laundering where labels allow and a careful inspection over a hard floor handle nearly every travel situation; public agencies describe professional treatment for established home infestations, not luggage funerals.",
        "How do I avoid this on my next trip? Keep luggage off beds and upholstered chairs from the first minute, unpack from sealed bags onto hard surfaces, re-inspect bag seams before they touch another bed, and make the arrival room walk-through - including seam checks - a fixed habit rather than an emergency skill.",
      ],
    },
    {
      id: "boundary-heading",
      type: "heading",
      level: 2,
      text: "Deliberate boundaries of this page",
    },
    {
      id: "boundary-list",
      type: "list",
      items: [
        "No list of hotels in China with reported infestations - such lists decay instantly and defame easily.",
        "No identification of insects from reader photos, and no treatment of bite photographs as diagnostic evidence.",
        "No pesticide recipes, concentrations or brand recommendations - misuse in sleeping areas is dangerous.",
        "No promised refund amounts for pest events; outcomes depend on contracts, platform guarantees and actual handling.",
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Related recovery reading",
      items: [
        { "label": "Build a booking-dispute evidence pack", "href": "/guides/china-booking-dispute-evidence-pack/", "description": "Turn tonight's notes into a case file for refunds." },
        { "label": "Hotel room safety check on arrival", "href": "/guides/china-hotel-emergency-exit-fire-safety-check/", "description": "Make a quick room walk-through a fixed arrival habit." },
        { "label": "Foreign passports and China hotels", "href": "/guides/foreigners-china-hotel/", "description": "Registration-fit questions when relocating to another property." },
        { "label": "International chain or local hotel in China", "href": "/guides/international-chain-or-local-hotel-china/", "description": "Choose a replacement property quickly when changing hotels." },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "Primary sources reviewed",
      items: [
        { "label": "About Bed Bugs (signs around beds; travel spread in luggage seams; reducing risk)", "url": "https://www.cdc.gov/bed-bugs/about/index.html", "publisher": "US Centers for Disease Control and Prevention", "reviewedAt": "2026-08-22" },
        { "label": "DPDx Bed Bugs (bite reactions not specifically diagnostic; confirmation by identifying collected specimens)", "url": "https://www.cdc.gov/dpdx/bedbugs/index.html", "publisher": "US Centers for Disease Control and Prevention", "reviewedAt": "2026-08-22" },
        { "label": "Bed Bug Fact Sheet (laundering hot wash / high dryer heat; professional treatment; not known to spread disease)", "url": "https://www.dshs.texas.gov/sites/default/files/region1/documents/Epi/Bed-Bugs-Fact-Sheet.pdf", "publisher": "Texas Department of State Health Services", "reviewedAt": "2026-08-22" },
        { "label": "Interim Provisions on the Administration of Online Tourism Business Services (platform assistance duty)", "url": "https://zwgk.mct.gov.cn/zfxxgkml/zcfg/bmgz/202012/t20201204_905349.html", "publisher": "Ministry of Culture and Tourism of the PRC", "reviewedAt": "2026-08-22" },
      ],
    },
  ],
};

export default body;
