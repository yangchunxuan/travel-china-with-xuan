import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "Jingdezhen is not one museum surrounded by souvenir shops. Its ceramic story is spatial. Taoyangli and the Imperial Kiln place archaeology, imperial production and old lanes in the historic core. Taoxichuan turns a twentieth-century porcelain factory into an industrial-heritage and contemporary creative district. Sanbao spreads studios, residencies and rural creative spaces along a valley. The right route begins by choosing which ceramic city you want to meet." },
    { id: "answer", type: "callout", title: "The direct answer", tone: "decision", body: "With one day, combine Taoyangli/Imperial Kiln and Taoxichuan: old-city production history first, then industrial heritage and current making. Add Sanbao only with a separate half day, a verified studio appointment or a strong reason to explore the dispersed valley. If archaeology is your main interest, protect the Imperial Kiln area and use the dedicated museum-interpretation guide rather than rushing all three districts." },
    { id: "matrix-heading", type: "heading", level: 2, text: "Three districts, three layers of ceramic history" },
    { id: "matrix", type: "table", caption: "Choose by task", columns: ["District", "Primary task", "Common mistake"], rows: [
      ["Taoyangli / Imperial Kiln", "Read imperial-kiln archaeology, museum architecture and the old production neighbourhood", "Treating the new museum building as the entire site or assuming every old lane is an untouched workshop"],
      ["Taoxichuan", "Understand industrial heritage, contemporary design, markets and reuse of a former porcelain factory", "Calling it an ancient kiln district or assuming a market runs every day"],
      ["Sanbao", "Encounter a dispersed studio/residency landscape and rural creative ecology", "Treating 'Sanbao' as one gated attraction that can be walked quickly"],
    ] },
    { id: "imperial-heading", type: "heading", level: 2, text: "Taoyangli: start with archaeology and the old city" },
    { id: "imperial", type: "paragraph", text: "Jingdezhen's government describes Taoyangli as a 3.2-square-kilometre historic tourism area whose core includes the nationally protected Imperial Kiln site, the Imperial Kiln Museum, lanes, guild halls, porcelain shops, workshop remains and industrial heritage. The spatial lesson is continuity and change: imperial production, urban life, archaeology, reconstruction and contemporary presentation occupy the same district but are not the same age." },
    { id: "imperial-route", type: "list", ordered: true, items: [
      "Begin with the archaeological and museum layer while attention is fresh.",
      "Use the museum's displays to identify what was excavated, reconstructed or newly designed.",
      "Walk a bounded set of surrounding lanes rather than claiming the entire old city.",
      "Separate an object, a kiln remain, a modern interpretation and a commercial workshop in your notes.",
      "Leave before a second museum destroys the contrast with Taoxichuan."
    ] },
    { id: "taoxichuan-heading", type: "heading", level: 2, text: "Taoxichuan: read the factory before the market" },
    { id: "taoxichuan", type: "paragraph", text: "The city government says Taoxichuan's first phase grew around the former Cosmic Porcelain Factory and was created through ceramic industrial-heritage conservation and reuse. Look for factory scale, chimneys, production buildings and how new galleries, shops and studios inhabit them. A creative market can add living makers, but its dates, vendors and weather conditions are dynamic; do not make the whole visit depend on a social-media market calendar." },
    { id: "sanbao-heading", type: "heading", level: 2, text: "Sanbao: a valley plan, not a final city stop" },
    { id: "sanbao", type: "callout", title: "Go to Sanbao with named destinations", tone: "decision", body: "The municipal government describes Sanbao as an international ceramic valley and a cluster of culture, design, studios and hospitality. Those uses are distributed. Before travelling, choose one or two confirmed studios, institutions or public spaces, check whether visitors are welcome and save exact Chinese addresses. Do not ask a driver to drop you at 'Sanbao' and expect a complete pedestrian attraction." },
    { id: "day-heading", type: "heading", level: 2, text: "Build the day by era, not by popularity" },
    { id: "day", type: "table", caption: "One-day sequence", columns: ["Block", "Question", "Cut rule"], rows: [
      ["Taoyangli / Imperial Kiln", "How did imperial production shape the old city, and how is archaeology presented now?", "Keep one museum/site route and a bounded lane walk"],
      ["Transfer and meal", "How far apart are the districts in real city traffic?", "Do not insert a remote studio without an appointment"],
      ["Taoxichuan", "How did modern factory production become contemporary creative infrastructure?", "Keep one gallery/industrial route; market is a bonus"],
      ["Evening", "Does the current programme add a genuinely different layer?", "Leave if the event is unverified or repeats shopping"],
    ] },
    { id: "two-day", type: "comparison", title: "If you have a second day", columns: [
      { heading: "Studio-and-maker day", body: "Use confirmed appointments, Sanbao or another production cluster and time for conversation. Never photograph people, processes or designs without permission." },
      { heading: "Museum-and-archaeology depth", body: "Return to the Imperial Kiln interpretation, add one complementary collection and read ceramics by material, firing and use rather than dynasty labels alone." },
      { heading: "Shopping with evidence", body: "Choose a maker or market for a specific technique, ask about authorship and firing, and arrange safe packing. Price is not proof of age or authenticity." }
    ] },
    { id: "buying", type: "callout", title: "A beautiful object is not automatically antique, local or handmade", tone: "warning", body: "Ask who made it, where it was fired, whether decals or hand painting were used and how it should be packed. Do not seek export paperwork or cultural-relic advice from a sales pitch. This page does not authenticate objects, rank sellers or promise that a studio accepts walk-ins." },
    { id: "failure", type: "table", caption: "Failure and recovery", columns: ["Problem", "Response"], rows: [
      ["Museum or market is closed", "Keep the district's spatial story and use one official alternative; do not follow an unofficial locked-gate workaround"],
      ["Sanbao pin is too vague", "Stop, contact the named venue and use the exact address; return to town if no visit is confirmed"],
      ["Rain changes the valley day", "Protect indoor museum/industrial heritage and move studios only with confirmation"],
      ["Shopping consumes the route", "Set a purchase window and return to the historical question"],
      ["Claims about an 'ancient' object conflict", "Do not buy on urgency; seek qualified independent evidence"],
    ] },
    { id: "boundary", type: "callout", title: "Canonical boundary with the Imperial Kiln article", tone: "neutral", body: "This page owns the spatial choice among Taoyangli/Imperial Kiln, Taoxichuan and Sanbao. The dedicated Imperial Kiln guide owns archaeology, museum interpretation and how to read the site in depth. Neither page creates separate thin owners for each market, lane or studio." },
    { id: "links", type: "internal-links", title: "Continue the ceramic route", items: [
      { label: "China high-speed train guide", href: "/guides/china-high-speed-train-first-time-guide/", description: "Handle the rail arrival before choosing city districts." },
      { label: "Night train or daytime high-speed rail", href: "/guides/china-night-train-or-daytime-high-speed-rail/", description: "Choose the transfer that preserves a usable first day in Jingdezhen." },
      { label: "Open-jaw flight route planning", href: "/guides/china-open-jaw-flights-route-planning/", description: "Avoid forcing the ceramic-city stop into a return journey." },
      { label: "China public holidays", href: "/guides/china-public-holidays-travel-calendar/", description: "Check closure and crowd pressure before relying on a one-day route." },
      { label: "Is your itinerary too rushed?", href: "/guides/is-your-china-itinerary-too-rushed/", description: "Test whether a rural studio day fits the transfer budget." }
    ] },
    { id: "sources", type: "sources", title: "Official sources and image credit", items: [
      { label: "Taoyangli Imperial Kiln Scenic Area", url: "https://www.jdz.gov.cn/zjcd/mljdz/sj/t932856.shtml", publisher: "Jingdezhen Municipal People's Government", reviewedAt: "2026-08-22" },
      { label: "Taoxichuan Creative District", url: "https://www.jdz.gov.cn/zjcd/mljdz/sj/t932854.shtml", publisher: "Jingdezhen Municipal People's Government", reviewedAt: "2026-08-22" },
      { label: "Municipal coverage of Sanbao and city ceramic districts", url: "https://jdz.gov.cn/zwzx/jrcd/t1092010.shtml", publisher: "Jingdezhen Municipal People's Government", reviewedAt: "2026-08-22" },
      { label: "Hero: Jingdezhen Imperial Kiln Museum by Zhu Pei, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:01-Jingdezhen_Imperial_Kiln_Museum.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }
    ] }
  ]
} as const satisfies StructuredPageBody;

export default body;
