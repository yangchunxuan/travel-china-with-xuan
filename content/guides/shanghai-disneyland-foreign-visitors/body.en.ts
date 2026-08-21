import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "A foreign visitor can plan Shanghai Disneyland independently, but the day has two systems: identity before entry and priority after entry. The passport record, order and official channel must agree. Once inside, the official app becomes the live operating layer. No static article can promise a ride list, queue time, show or Premier Access product for your date." },
    { id: "answer", type: "callout", title: "The direct answer", tone: "decision", body: "Buy only through a channel currently identified by Shanghai Disney Resort or one of its listed authorised partners. Enter the passport details exactly, carry the original physical passport used for the order and install the official resort app before the visit. Choose three must-do experiences from different failure categories, place one flexible indoor or low-wait substitute near each, and let the live app—not an old internet itinerary—decide the order." },
    { id: "before-heading", type: "heading", level: 2, text: "Before paying: bind the right person to the right date" },
    { id: "identity", type: "table", caption: "The identity chain", columns: ["Record", "Check", "Why it matters"], rows: [
      ["Official or authorised order", "Correct park, date, product and guest count", "A payment receipt is not proof that every visitor is correctly registered"],
      ["Passport", "Full name, document number and validity match the order", "Shanghai Disney's real-name rules require the specified original valid ID"],
      ["Official app account", "You can sign in and locate the current linking/help path", "App functions and linking steps can change before the visit"],
      ["Group plan", "Each adult knows whose account, order and original document control entry", "One dead phone should not erase the whole group's recovery path"],
    ] },
    { id: "channels", type: "callout", title: "Do not let a search advertisement define 'official'", tone: "warning", body: "The resort currently lists its website, app, WeChat account, reservation centre and named official stores or travel partners as purchase paths. Begin from the resort's own channel page. A seller using Disney images or the word 'official' in a marketplace title is not evidence of authorisation." },
    { id: "passport", type: "list", ordered: true, items: [
      "Type the name and passport number from the document, not from memory or a translated nickname.",
      "Check every visitor and the visit date before payment.",
      "Save the order number and the official customer-service route without sharing a readable passport image.",
      "Carry the same original physical passport. Copies and digital images are not a safe substitute for the specified ID.",
      "If the order cannot be found, solve it through the purchase channel or official guest services before travelling to the gate."
    ] },
    { id: "app-heading", type: "heading", level: 2, text: "Prepare the app, but do not build a day around a button" },
    { id: "app", type: "paragraph", text: "Install and update the Shanghai Disney Resort official app on hotel Wi-Fi, allow enough battery and keep a power bank that complies with China's current transport rules. Learn where the app shows park hours, attraction status, entertainment, map and guest-service information. Linking, party and paid-access flows can differ by product or purchase channel; follow the live prompts and official help rather than forcing a sequence copied from a forum." },
    { id: "priorities-heading", type: "heading", level: 2, text: "Build a priority triangle instead of a ride ranking" },
    { id: "priorities", type: "comparison", title: "Choose three different reasons to remember the day", columns: [
      { heading: "One signature attraction", body: "Pick the experience that would make the visit worthwhile even if the rest of the plan changes. Check height, health and accessibility requirements in the current app." },
      { heading: "One atmosphere or character goal", body: "A land, parade, character encounter or castle moment gives the day value even when a ride pauses. Timing and availability remain live facts." },
      { heading: "One group-friendly experience", body: "Choose something the whole group can genuinely do together. Do not assume a child, older traveller or motion-sensitive guest will recover quickly from an unsuitable ride." }
    ] },
    { id: "morning", type: "paragraph", text: "After entry, open the live map before walking. If the signature attraction is operating with a manageable path, start there. If it is delayed, use the preselected nearby substitute rather than joining a crowd that is also waiting for information. A resilient morning protects geography: finish one area before crossing the park for a second uncertain target." },
    { id: "midday", type: "paragraph", text: "At midday, stop for a real meal and reassess the group. Heat, rain, wet clothing, low blood sugar and phone battery can destroy a theoretically efficient plan. Keep one indoor or seated block, then reserve the late day for the remaining must-do or the atmosphere goal. Do not make a night show the only acceptable ending; weather and operations can change it." },
    { id: "day-shapes", type: "table", caption: "Three workable one-day styles", columns: ["Style", "Protect", "Accept"], rows: [
      ["First-time highlights", "One signature attraction, castle/land atmosphere and one live entertainment goal", "You will not complete every major ride"],
      ["Family pace", "Height-compatible attractions, food, toilets, shade and a calm reset", "Adults may split briefly for one incompatible ride"],
      ["Thrill priority", "Two or three suitable high-demand experiences and geographic efficiency", "Characters, shopping or a full parade position may be cut"],
    ] },
    { id: "failure-heading", type: "heading", level: 2, text: "Recovery matters more than a perfect order" },
    { id: "failure", type: "table", caption: "When the plan breaks", columns: ["Problem", "Action"], rows: [
      ["Passport/order mismatch", "Do not improvise another identity; use the official purchase channel or Main Entrance Guest Services"],
      ["App cannot locate the order", "Keep the order and passport; follow the product-specific linking help or ask official staff"],
      ["Must-do ride pauses", "Take the nearby substitute and check later; a temporary pause is not a promise of reopening"],
      ["Rain or heat changes the day", "Move to the prepared indoor/seated block and protect hydration and safe movement"],
      ["Phone fails", "Use the second charged device, written order details and Guest Services rather than sharing account credentials with strangers"],
    ] },
    { id: "paid-access", type: "callout", title: "Premier Access is optional, dynamic and not a rescue for a bad identity record", tone: "neutral", body: "Availability, included attractions, price and conditions can change. Buy only through the resort's currently identified direct channels after reading the live terms. A paid product does not guarantee that an attraction will operate, remove eligibility rules or replace the passport required for the ticket." },
    { id: "transport-boundary", type: "callout", title: "Airport-to-Disney transport has its own owner", tone: "neutral", body: "This page starts with the park-day task. It does not repeat the Pudong Airport transfer decision, promise a last metro or tell a traveller to risk a same-day flight connection. Use the dedicated airport guide and protect a hotel fallback." },
    { id: "final-check", type: "list", items: [
      "Every visitor's passport record, date and product are correct in a confirmed order.",
      "The original passports are in the group's control.",
      "The official app is updated, signed in and available on more than one charged device when possible.",
      "The visit-day calendar, park hours, attraction rules and weather have been rechecked.",
      "The group has three priorities, nearby substitutes, a meal/reset plan and a return route."
    ] },
    { id: "links", type: "internal-links", title: "Continue the Shanghai plan", items: [
      { label: "Pudong Airport to Shanghai Disneyland", href: "/guides/pudong-airport-to-shanghai-disneyland/", description: "Choose the correct transfer endpoint and a delay fallback." },
      { label: "Shanghai city hub", href: "/destinations/shanghai/", description: "Decide nights, districts and how the park fits the city stay." },
      { label: "Pudong or Hongqiao Airport", href: "/guides/shanghai-pudong-or-hongqiao-airport/", description: "Choose the airport for the whole trip, not only Disney." },
      { label: "China power-bank rules", href: "/guides/china-power-bank-rules-flights-trains/", description: "Carry a compliant backup battery across the transport chain." },
      { label: "China public holidays", href: "/guides/china-public-holidays-travel-calendar/", description: "Check high-pressure dates before buying a dated ticket." },
      { label: "Where to stay in Shanghai", href: "/guides/shanghai-where-to-stay-first-trip/", description: "Balance the park day against the rest of the city." }
    ] },
    { id: "sources", type: "sources", title: "Official sources and image credit", items: [
      { label: "Official ticket rules, authorised channels and original-ID requirements", url: "https://www.shanghaidisneyresort.com/en/ticket/", publisher: "Shanghai Disney Resort", reviewedAt: "2026-08-22" },
      { label: "Shanghai government notice on real-name ticketing", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20241121/16891d39bb1e4c0aa66e65254027adc3.html", publisher: "Shanghai Municipal People's Government", reviewedAt: "2026-08-22" },
      { label: "Hero: Enchanted Storybook Castle by Fayhoo, CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Enchanted_Storybook_Castle_of_Shanghai_Disneyland.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
