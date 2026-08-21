import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Universal Beijing Resort is a full operating system, not seven themed lands that can be completed in any order. A foreign visitor must first create a clean passport-linked ticket record. Inside the park, weather, attraction status, performances, height rules and queues become live facts. Plan by priority and geography, then keep enough flexibility to recover." },
    { id: "answer", type: "callout", title: "The direct answer", tone: "decision", body: "Use a purchase path identified by Universal Beijing Resort or the Beijing government, enter passport details exactly and carry the original passport. Install the official app before the visit. Choose one non-negotiable land, one major attraction and one show or shared group experience. Begin with the live map, finish one adjacent cluster at a time and keep a substitute in every part of the park. Do not buy the day around a queue prediction." },
    { id: "identity-heading", type: "heading", level: 2, text: "Make the passport, order and app agree" },
    { id: "identity", type: "table", caption: "Pre-entry chain", columns: ["Item", "Verify", "Failure boundary"], rows: [
      ["Ticket order", "Visit date, product, guest count and official/authorised seller", "A marketplace screenshot is not an entry record"],
      ["Passport", "Full name and number match the ticket", "Never invent a Chinese ID or transfer another person's identity-linked ticket"],
      ["Official app or mini-program", "Current version, login and live map work on the device", "A button or linking flow can change without notice"],
      ["Original document", "Packed with the visitor, not in hotel storage", "A photo of the passport is a travel backup, not a promised substitute"],
    ] },
    { id: "official-buy", type: "paragraph", text: "Beijing's official English service page says foreign visitors can buy through the Universal Beijing Resort app, its official Fliggy store or the contact centre and that passport details are required. The resort's own site supplies current ticket, app and contact routes. Start there. If an overseas payment or account flow fails, use the official contact centre rather than repeatedly entering identity data into similarly named sites." },
    { id: "privacy", type: "callout", title: "Photo validation is a choice with a live notice", tone: "neutral", body: "The resort describes photo-validation functions for entry and says guests may contact staff, visit Guest Services to opt out or obtain more information. Read the current privacy notice before pre-uploading a face image. This article does not tell anyone to bypass entry controls or promise that one verification method will be available on the travel date." },
    { id: "app-heading", type: "heading", level: 2, text: "Use the official app as the day's control panel" },
    { id: "app-list", type: "list", items: [
      "Check the actual opening calendar, attraction status, entertainment and map on the visit day.",
      "Read ride restrictions for the specific traveller; a land's theme does not imply suitability.",
      "Locate Guest Services, health services, lockers and luggage storage before a problem occurs.",
      "Keep a charged second device or written order details so one battery failure does not strand the group.",
      "Treat Universal Express products as optional live products with current terms, not as guaranteed access."
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "Build the route around one anchor land" },
    { id: "route", type: "comparison", title: "Three honest day styles", columns: [
      { heading: "First-visit sampler", body: "Choose one anchor land, one major attraction elsewhere and one show. Use the remaining time for adjacent lower-friction experiences. Best when different people want different franchises." },
      { heading: "Thrill-led day", body: "Protect two or three compatible high-intensity attractions, read every safety restriction and accept that full land exploration, shopping and character goals will shrink." },
      { heading: "Family or mixed group", body: "Build around shared attractions, shows, food and a seated reset. Plan a clearly timed split only when adults, documents, phones and meeting points are independent." }
    ] },
    { id: "geography", type: "paragraph", text: "Do not zigzag because a wait number falls by a few minutes. A queue estimate can change while you walk. Complete the anchor land's must-do and nearby substitute, then move once to the next cluster. The park contains Beijing's Universal CityWalk outside the admission task as well as the ticketed theme park; do not spend the best operating hour solving shopping or restaurant decisions that can wait." },
    { id: "day", type: "table", caption: "A resilient day rhythm", columns: ["Window", "Decision", "What to avoid"], rows: [
      ["Before entry", "Confirm documents, live park information and the first anchor", "Rebuilding the whole plan at the gate"],
      ["First operating block", "Complete the anchor or use its nearby substitute", "Cross-park chasing of a delayed attraction"],
      ["Midday", "Eat, hydrate, reassess weather and the weakest traveller", "Treating exhaustion as lost time"],
      ["Afternoon", "One second cluster plus a show/shared goal", "Adding every missed headline attraction"],
      ["Final block", "Return to one remaining priority or enjoy atmosphere", "Depending on a last-minute reopening"],
    ] },
    { id: "weather", type: "callout", title: "Weather changes more than comfort", tone: "warning", body: "Heat, lightning, wind, rain, ice or poor air can alter outdoor attractions and performances. Build a legal indoor/seated fallback, carry suitable clothing and follow staff instructions. A ticket, Express product or long journey does not require the operator to run an unsafe attraction." },
    { id: "failure-heading", type: "heading", level: 2, text: "Recover without making the problem larger" },
    { id: "failure", type: "table", caption: "Failure and recovery", columns: ["Problem", "Recovery"], rows: [
      ["Passport details are wrong", "Stop and contact the official seller or resort before travel; do not create a second conflicting identity"],
      ["App or mini-program fails", "Keep the original passport and order, use the official website/contact centre or Guest Services"],
      ["Anchor attraction closes", "Take the nearby substitute, check later and protect the shared experience"],
      ["Group separates", "Use the named physical meeting point and time; never rely only on chat notifications"],
      ["Luggage is too large", "Use only current official storage and read size, fee and closing conditions onsite"],
    ] },
    { id: "return", type: "paragraph", text: "Protect the trip back to central Beijing. Save the official public-transport or pickup location in Chinese, know the final acceptable departure time and do not place an irreplaceable flight or train immediately after the park. The resort's operating close is not the same thing as a guaranteed last train, short taxi queue or fast road journey." },
    { id: "check", type: "list", items: [
      "Confirmed order and original passport match for every visitor.",
      "Official app, map and contact routes work on charged devices.",
      "Current hours, weather, restrictions and entertainment are rechecked.",
      "One anchor land, one major attraction, one shared goal and nearby substitutes are named.",
      "The return route and a latest departure decision are saved."
    ] },
    { id: "links", type: "internal-links", title: "Continue planning Beijing", items: [
      { label: "Beijing city hub", href: "/destinations/beijing/", description: "Decide nights and how the park fits the first visit." },
      { label: "Where to stay in Beijing", href: "/guides/beijing-where-to-stay-first-trip/", description: "Choose a base that also works for the rest of Beijing." },
      { label: "Which Beijing railway station?", href: "/guides/which-beijing-railway-station/", description: "Match the issued ticket to the correct station after the park." },
      { label: "China public holidays", href: "/guides/china-public-holidays-travel-calendar/", description: "Check high-pressure dates before buying." },
      { label: "China power-bank rules", href: "/guides/china-power-bank-rules-flights-trains/", description: "Keep the app available without carrying a non-compliant battery." },
      { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Do not attach the park to a fragile intercity transfer." }
    ] },
    { id: "sources", type: "sources", title: "Official sources and image credit", items: [
      { label: "Foreign-visitor ticket purchase and passport requirement", url: "https://english.beijing.gov.cn/consuminginbeijing/faq/202306/t20230630_3151223.html", publisher: "Beijing Municipal Government", reviewedAt: "2026-08-22" },
      { label: "Guest Services, app, lockers and luggage storage", url: "https://www.universalbeijingresort.com/en/ubrbasepage/youkefuwu", publisher: "Universal Beijing Resort", reviewedAt: "2026-08-22" },
      { label: "Official contact centre and guest-service routes", url: "https://www.universalbeijingresort.com/en/contact/contactus", publisher: "Universal Beijing Resort", reviewedAt: "2026-08-22" },
      { label: "Photo-validation system and opt-out information", url: "https://www.universalbeijingresort.com/en/photo-validation-system-introduction", publisher: "Universal Beijing Resort", reviewedAt: "2026-08-22" },
      { label: "Hero: Universal Beijing Resort by Hhhh2, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Universal_Beijing_Resort.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
