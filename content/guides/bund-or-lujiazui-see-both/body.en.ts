import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "The Bund and Lujiazui are not rival versions of the same viewpoint. The Bund is the west-bank promenade where Shanghai's historic commercial facades sit behind you and the modern skyline stands across the Huangpu. Lujiazui is the east-bank district where you stand among those towers and look back toward the Bund. Choose the view you want, then cross the river once." },
    { id: "answer", type: "callout", title: "The direct answer", tone: "decision", body: "If this is your first evening, begin on the Bund before the best light, walk a bounded section, then cross by a currently operating ferry or metro to Lujiazui for the close-up tower experience. Reverse it when a timed observation deck, museum or Pudong booking controls the day. If you have only one hour, stay on the Bund: it gives the clearest two-bank composition without another transport task." },
    { id: "difference-heading", type: "heading", level: 2, text: "The two banks answer different questions" },
    { id: "difference", type: "table", caption: "Choose by experience, not by skyline fame", columns: ["Side", "Best for", "Trade-off"], rows: [
      ["The Bund / Puxi", "Historic facades, the full Lujiazui skyline, a long public promenade and the classic river contrast", "You look at the towers rather than stand inside them; crowd pressure can be intense"],
      ["Lujiazui / Pudong", "Tower scale, observation decks, malls, museums and looking back across the river", "Ground-level tower views are fragmented and the Bund facade is less dramatic from some points"],
      ["Both", "Reading Shanghai as two connected urban stories", "The crossing consumes time and can erase the best light if unplanned"],
    ] },
    { id: "bund-heading", type: "heading", level: 2, text: "On the Bund, look both ways" },
    { id: "bund", type: "paragraph", text: "Shanghai's government describes the Bund as a 1.5-kilometre protected historical waterfront with 52 Gothic and Baroque-style buildings on the west side of the river. The essential visit is therefore not one skyline selfie. Walk a manageable section, turn inland to read the facades and entrances, then return to the rail to see how the older finance-and-trade frontage faces the later Pudong skyline." },
    { id: "lujiazui-heading", type: "heading", level: 2, text: "In Lujiazui, choose a ground-level or vertical experience" },
    { id: "lujiazui", type: "comparison", title: "Do not combine every Pudong option", columns: [
      { heading: "Ground-level riverfront", body: "Use the east-bank promenade and one close tower view. Best when the skyline scale and river crossing matter more than a paid observation deck." },
      { heading: "One observation deck", body: "Choose one building by live hours, weather, visibility and access. Timed entry can control which bank comes first; this page does not rank commercial decks." },
      { heading: "Museum or indoor anchor", body: "Use one ticketed institution or mall as a weather fallback, then keep a short outside segment. Opening and admission remain venue-level facts." }
    ] },
    { id: "light-heading", type: "heading", level: 2, text: "Protect the transition from daylight to night" },
    { id: "light", type: "table", caption: "A one-crossing sequence", columns: ["Window", "Action", "Why"], rows: [
      ["Late afternoon", "Walk the Bund while building detail is still visible", "Darkness hides the facade story behind the skyline"],
      ["Dusk", "Hold one west-bank viewpoint instead of constantly moving", "The changing sky matters more than another pin"],
      ["After the skyline comes on", "Cross once by the confirmed ferry or metro route", "You already captured the two-bank composition"],
      ["Night", "Use one Lujiazui riverfront or tower experience", "The close-up city scale becomes the second story"],
    ] },
    { id: "crossing-heading", type: "heading", level: 2, text: "Choose the crossing for the day that actually exists" },
    { id: "crossing", type: "comparison", title: "Ferry, metro or sightseeing tunnel", columns: [
      { heading: "Public ferry", body: "The crossing itself becomes part of the visit and offers open-river views. Routes and hours are operational facts: Shanghai's official guidance tells travellers to check the Shanghai Ferry channel for current service." },
      { heading: "Metro", body: "More resilient in poor weather and useful when the exact start and finish are near stations. It is transport, not a river view, and station walking still matters." },
      { heading: "Sightseeing tunnel", body: "A separate paid attraction under the river, not a substitute for deciding which bank you want to see. Use it only if the attraction itself is a priority after checking current operation." }
    ] },
    { id: "ferry", type: "callout", title: "Do not freeze a ferry timetable in the itinerary", tone: "warning", body: "The city's current visitor guidance describes the Dongjin ferry between East Jinling Road and Dongchang Road and explicitly directs travellers to the 'Shanghai Ferry' WeChat account for updated hours. Weather, maintenance or route changes can intervene. Confirm the full pier names and service immediately before walking there; keep the metro fallback saved." },
    { id: "short-plans-heading", type: "heading", level: 2, text: "Use the time you truly have" },
    { id: "short-plans", type: "table", caption: "Time-based choices", columns: ["Available time", "Plan", "Cut"], rows: [
      ["About one hour", "One bounded Bund walk and the Lujiazui skyline view", "Crossing and tower entry"],
      ["Two to three hours", "Bund detail, dusk viewpoint, one crossing and short Pudong riverfront", "Multiple decks, malls and museums"],
      ["Half day", "Add one indoor or vertical anchor on the side that fits the weather", "A second commercial viewpoint with the same task"],
    ] },
    { id: "recovery", type: "table", caption: "When the plan breaks", columns: ["Problem", "Recovery"], rows: [
      ["Fog or rain removes the skyline", "Read the Bund architecture and use one indoor Pudong anchor; do not buy a view blindly"],
      ["Ferry is not operating", "Use the saved metro route and keep the same one-direction plan"],
      ["Crowds block the preferred rail", "Walk to a less compressed legal section rather than entering the road or pushing"],
      ["Timed deck is delayed", "Reverse the banks only if the new sequence still protects the reservation"],
    ] },
    { id: "boundary", type: "callout", title: "This is not a Shanghai attraction encyclopedia", tone: "neutral", body: "The page owns the two-bank choice, light sequence and crossing logic. It does not rank every tower, cruise, restaurant or museum, repeat airport transfers or turn each Bund building into a separate thin page." },
    { id: "links", type: "internal-links", title: "Continue planning Shanghai", items: [
      { label: "Shanghai city hub", href: "/destinations/shanghai/", description: "Fit the riverbanks into the rest of the city." },
      { label: "Where to stay in Shanghai", href: "/guides/shanghai-where-to-stay-first-trip/", description: "Choose a base by repeated daily tasks, not one night view." },
      { label: "Pudong or Hongqiao Airport", href: "/guides/shanghai-pudong-or-hongqiao-airport/", description: "Keep airport choice separate from Pudong sightseeing." },
      { label: "Choose a water town from Shanghai", href: "/guides/shanghai-water-town-zhujiajiao-tongli-wuzhen/", description: "Compare a Jiangnan day trip without confusing it with a Shanghai waterfront day." },
      { label: "Shanghai to Hangzhou transport", href: "/guides/shanghai-hangzhou-transport-route/", description: "Match the next-city train to the correct endpoints." }
    ] },
    { id: "sources", type: "sources", title: "Official sources and image credit", items: [
      { label: "The Bund historical district and waterfront", url: "https://english.shanghai.gov.cn/en-ScenicSpots/20231205/584672cc6d044eabb5f7f6fc9049a19f.html", publisher: "Shanghai Municipal People's Government", reviewedAt: "2026-08-22" },
      { label: "Official visitor guide to ferries and Huangpu River crossings", url: "https://english.shanghai.gov.cn/en-Transportation/20250910/65267b72530645bdacc119d56380d363.html", publisher: "Shanghai Municipal People's Government", reviewedAt: "2026-08-22" },
      { label: "Hero: Lujiazui from the Bund by Kallerna, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Lujiazui_from_The_Bund.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
