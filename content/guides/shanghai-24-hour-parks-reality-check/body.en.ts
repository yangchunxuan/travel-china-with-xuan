import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "A Shanghai park labelled ‘24-hour’ may keep only a public route or zone accessible all night. A lake loop, playground, toilet or indoor venue can follow shorter hours; lighting and return transport are separate again. Verify one named park for one intended time."
    },
    {
      id: "direct-answer",
      type: "callout",
      tone: "decision",
      title: "The practical answer",
      body: "Confirm the exact park, night-open zone and entrance, suitable lit route, needed toilet, facility hours and journey home. If a relevant item is unresolved, move earlier, shrink the activity or choose another public space. ‘Open’ is an access designation, not a safety guarantee."
    },
    {
      id: "meaning-heading",
      type: "heading",
      level: 2,
      text: "Translate ‘24-hour’ into the thing you actually need"
    },
    {
      id: "meaning-table",
      type: "table",
      caption: "Six different claims are often hidden inside one opening-hours label",
      columns: ["Claim", "What it can establish", "What it cannot establish"],
      rows: [
        ["Park is listed as 24-hour", "Designated public access exists around the clock at the source date", "Every zone, gate, service or future date remains open"],
        ["A gate appears on a map", "A physical access point may exist", "That gate is the night entrance or is not affected by works"],
        ["Lighting is installed", "A named route or important area may be illuminated", "Every path, stair or waterfront edge is adequately lit"],
        ["The park has a toilet", "A facility exists in or near the park", "It is open, findable or usable at the intended time"],
        ["The park has sports or play facilities", "The daytime park offers the activity", "The facility shares park hours; powered amusement is not provided at night"],
        ["Metro serves the park", "Rail may provide access", "The last train or interchange still works afterwards"]
      ]
    },
    {
      id: "policy-boundary",
      type: "callout",
      tone: "warning",
      title: "Shanghai’s own guideline allows partial night opening",
      body: "The city guideline allows barriers and separate night-open and closed zones, particularly near homes, ecological areas or wildlife habitat. Facility hours should be displayed, and only suitable toilets should open 24 hours. Park-level checking is therefore necessary."
    },
    {
      id: "verification-heading",
      type: "heading",
      level: 2,
      text: "Run a three-source verification stack"
    },
    {
      id: "verification-stack",
      type: "list",
      ordered: true,
      items: [
        "Identify the exact park by Chinese name and address; similar names and adjacent gardens may have different management.",
        "Check current status in Suishenban or the Green Shanghai WeChat park service, the bureau’s stated current-list channels.",
        "Find the newest park, operator, district or city notice for works, weather, events or temporary closure.",
        "Confirm whether the whole park or specified routes are open, and name the exact entrance.",
        "Verify route lighting, toilet, loop, court, playground, café and indoor venue separately.",
        "Check the official metro first/last-train and interchange page; set a legal pickup point if rail will end.",
        "Save the night emergency contact and a lit exit. Recheck that day; old screenshots are not live status."
      ]
    },
    {
      id: "decision-gate",
      type: "table",
      caption: "Do not leave until every relevant gate passes",
      columns: ["Gate", "Pass", "If unknown or failed"],
      rows: [
        ["Status", "Current official service lists the named park as 24-hour", "Treat old lists as historical; contact the park or change time"],
        ["Zone", "The intended route is inside the night-open area", "Do not cross a barrier or assume the closed zone is a shortcut"],
        ["Entrance", "One exact gate is confirmed", "Move earlier or use a confirmed public entrance"],
        ["Light", "The complete intended route is described or observed as lit", "Stay on a shorter verified route or leave"],
        ["Toilet", "A specific toilet and night mode are confirmed", "Use a verified nearby toilet first or shorten the visit"],
        ["Activity", "The facility is permitted and operating at that time", "Replace it with quiet walking in the open area"],
        ["Return", "Last rail or lawful pickup works with delay margin", "Do not start the late visit"]
      ]
    },
    {
      id: "century-heading",
      type: "heading",
      level: 2,
      text: "Named example: Century Park shows why route-level evidence matters"
    },
    {
      id: "century-example",
      type: "paragraph",
      text: "A 2024 Shanghai government announcement described Century Park’s 24-hour opening, lighting upgrades, some dark-area reinforcement, local hazard barriers, updated signs, patrols and recommended night routes. These details do not promise that every path or gate remains equally suitable. Confirm current status and the exact route before a late visit."
    },
    {
      id: "scenario-one",
      type: "callout",
      tone: "neutral",
      title: "Scenario 1: a solo walk at 23:30 in Century Park",
      body: "The designation clears only the first gate. The traveller still identifies a night entrance, recommended lit loop, toilet or pre-visit alternative, park contact and return pickup point. If a park source cannot confirm the route, they move to early evening. The citywide label is not a personal-safety assurance."
    },
    {
      id: "partial-heading",
      type: "heading",
      level: 2,
      text: "A 24-hour park can contain a timed inner zone"
    },
    {
      id: "minhang-example",
      type: "callout",
      tone: "decision",
      title: "Minhang Culture Park: read the parenthesis",
      body: "A Shanghai tourism page reviewed on August 13, 2026 lists Minhang Culture Park as 24-hour but its lake loop as 05:00–21:00. A 05:15 runner can consider it after a same-day recheck; a 04:30 plan cannot. The parenthesis changes the answer."
    },
    {
      id: "facility-heading",
      type: "heading",
      level: 2,
      text: "Facility hours sit inside park hours"
    },
    {
      id: "facility-table",
      type: "table",
      caption: "Check the smallest operating unit that the visit depends on",
      columns: ["Need", "Question to verify", "Conservative fallback"],
      rows: [
        ["Toilet", "Which building or cubicle opens, by which entrance, with what night sign?", "Use a verified toilet first and keep the visit short"],
        ["Running or walking", "Which loop is night-open, lit and not interrupted by construction?", "Use a short out-and-back on the confirmed public route"],
        ["Children’s play", "Is the exact area lit and permitted then?", "Visit earlier; do not infer from the park gate"],
        ["Powered amusement", "Is service offered at night?", "Assume no under the city 24-hour-park guideline"],
        ["Court or fitness area", "What hours are posted; is a reservation required?", "Replace with quiet walking"],
        ["Café, kiosk or indoor venue", "What are the operator’s current hours?", "Carry permitted water; assume commercial services are closed"]
      ]
    },
    {
      id: "night-rules",
      type: "callout",
      tone: "warning",
      title: "All-night access does not mean all-night activity",
      body: "Shanghai’s guideline prohibits instruments or amplified-audio fitness and entertainment from 22:00 to 06:00 and discourages unapproved night groups. Parks may add rules. A quiet walk may fit where a speaker-led class or organised tour does not."
    },
    {
      id: "transport-heading",
      type: "heading",
      level: 2,
      text: "Verify the journey home before the journey in"
    },
    {
      id: "transport-body",
      type: "paragraph",
      text: "The Shanghai Municipal Transportation Commission links to the official metro first/last-train and transfer timetable. Check the exact line, direction and interchange, then add exit walking and delay margin. If rail will end, choose a visible legal pickup point before entry. A ride-hail estimate is not a vehicle guarantee."
    },
    {
      id: "scenario-two",
      type: "callout",
      tone: "neutral",
      title: "Scenario 2: a family wants a playground after 22:00",
      body: "The family depends on the play area, not the park boundary. They check facility hours, lighting, toilet and return. If unresolved, they visit before posted closing, keep only a later lit walk or skip it. Under the city guideline, do not expect powered rides at night."
    },
    {
      id: "field-report-boundary",
      type: "paragraph",
      text: "A July 2026 government-hosted newspaper report found lighting or toilet gaps at some visited 24-hour parks and green spaces. It shows designation and usability can diverge, but is not policy, a complete audit or proof about tonight. It justifies verification, not labelling every park unsafe."
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "Leave cleanly when the evidence fails on site"
    },
    {
      id: "failure-table",
      type: "table",
      caption: "Night failure recovery",
      columns: ["On-site failure", "Immediate action", "Boundary"],
      rows: [
        ["Expected gate is closed", "Use a verified public entrance or abandon the visit", "Never bypass a barrier or informal opening"],
        ["Route becomes dark or unclear", "Turn back along the known lit route to a public street", "Do not improvise beside water, stairs, woodland or works"],
        ["Toilet is closed", "Use the pre-checked external facility or leave", "Do not assume staff facilities are available"],
        ["Facility is closed", "Switch to permitted quiet walking in the open zone", "Park access does not override the facility sign"],
        ["Metro option is lost", "Use the lawful pickup point or another confirmed service", "Do not wait alone inside for an uncertain vehicle"],
        ["Weather or temporary closure notice appears", "Follow the closure and replace the visit", "A saved 24-hour listing does not override a current safety notice"]
      ]
    },
    {
      id: "live-check-heading",
      type: "heading",
      level: 2,
      text: "Same-day check card"
    },
    {
      id: "live-check-list",
      type: "list",
      ordered: false,
      items: [
        "Current status in Suishenban or the Green Shanghai park service.",
        "Newest named park, district or city notice; no weather, works or event closure.",
        "Exact night-open zone, entrance and exit saved in Chinese.",
        "Complete route lighting confirmed; no dark shortcut dependency.",
        "Specific toilet and facility hours confirmed where needed.",
        "Activity complies with the park’s current rules and the 22:00–06:00 amplified-audio restriction.",
        "Official last-train check or lawful pickup, with battery and payment backup.",
        "Night emergency contact and a stop condition shared with the group."
      ]
    },
    {
      id: "dynamic-date",
      type: "callout",
      tone: "warning",
      title: "Dynamic information checked 13 August 2026",
      body: "Opening examples, query routes and transport links can change. Recheck that day. No city list, old screenshot or this article is a permanent operating or safety promise."
    },
    {
      id: "scope",
      type: "callout",
      tone: "neutral",
      title: "What this guide does not do",
      body: "This page does not publish a permanent list, rank parks, guarantee safety or certify facilities. It verifies one named park at one intended time."
    },
    {
      id: "help-cta",
      type: "callout",
      tone: "decision",
      title: "Need a human check?",
      body: "Send your dates, group size and approximate budget. Homeground can help identify which park, facility and return-transport fields still need direct confirmation."
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "Continue planning Shanghai",
      items: [
        { "label": "Browse places to explore in China", "href": "/explore/", "description": "Put the park inside a realistic city day rather than treating late access as extra free time." },
        { "label": "Choose a Shanghai first-trip base", "href": "/guides/shanghai-where-to-stay-first-trip/", "description": "Reduce the late return by choosing the right area first." },
        { "label": "Test whether a hotel is really near the metro", "href": "/guides/china-hotel-near-metro/", "description": "Check the correct exit and final walk after the park." },
        { "label": "Prepare payment in China", "href": "/guides/how-to-pay-in-china-as-a-tourist/", "description": "Keep a backup method for lawful late-night transport." }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "Official sources and current reporting",
      items: [
        { "label": "Shanghai 24-hour city-park management guideline", "url": "https://www.shanghai.gov.cn/gwk/search/content/b238c6a6-795a-49cd-b0ea-f2a7aa21c35d", "publisher": "Shanghai Municipal People’s Government / Shanghai Landscaping and City Appearance Administrative Bureau", "reviewedAt": "2026-08-13" },
        { "label": "Official answer on where to query the current 24-hour park list", "url": "https://web.lhsr.sh.gov.cn/sites/ShanghaiGreen/dyn/zixuntousu_content_jyh.aspx?ctgId=7ef3f3a8-bb3c-4bd3-a610-769bca20a818&infId=9faa0d2d-79c3-488d-b55c-be7e76dbe791", "publisher": "Shanghai Landscaping and City Appearance Administrative Bureau", "reviewedAt": "2026-08-13" },
        { "label": "Century Park 24-hour-opening implementation", "url": "https://www.shanghai.gov.cn/nw4411/20240417/479731e035004c3e9a03dd6c5cfe3099.html", "publisher": "Shanghai Municipal People’s Government", "reviewedAt": "2026-08-13" },
        { "label": "Minhang Culture Park current visitor listing", "url": "https://cmp.whlyj.sh.gov.cn/CMP/news_view.ac?id=ba5beafe94914f0497f56e3525d9a11f", "publisher": "Shanghai Municipal Administration of Culture and Tourism", "reviewedAt": "2026-08-13" },
        { "label": "Official Shanghai rail-transit links", "url": "https://jtw.sh.gov.cn/csgdjt/index.html", "publisher": "Shanghai Municipal Transportation Commission", "reviewedAt": "2026-08-13" },
        { "label": "Government-hosted field reporting on 24-hour public facilities", "url": "https://www.shanghai.gov.cn/nw4411/20260713/7c8d3bccd2ca461f89b659295ac36087.html", "publisher": "Jiefang Daily via Shanghai Municipal People’s Government", "reviewedAt": "2026-08-13" },
        { "label": "Hero image: Century Park at sunset by Mgmoscatello, CC BY-SA 3.0; cropped and converted", "url": "https://commons.wikimedia.org/wiki/File:Shanghai_Century_park_at_sunset.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
