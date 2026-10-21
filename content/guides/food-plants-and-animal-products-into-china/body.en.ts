import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";
const tour8 = "beijing-xian-shanghai-8-day-private-tour";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "Mostly no. China's official list bans meat (raw or cooked, so beef jerky, salami and ham too), animal milk and dairy (cheese, butter, yoghurt), eggs and egg products (salted egg yolk included), fresh fruit and vegetables, seeds and soil from your luggage, and from the post. Vacuum packing, a duty-free bag or \"it's only a small gift\" changes nothing. Packaged plant-based snacks such as biscuits, crisps, coffee, tea and dried fruit are not on the list, but each is judged by what it contains, so read the full ingredients before it goes in your bag. Anything you are unsure about: declare it and use the red channel." },
  { id: "answer", type: "callout", title: "The rule that settles most bags", tone: "decision", body: "Judge each food by what is inside it, not by its packaging. If it contains meat, animal milk or egg, or is fresh produce, seeds or soil, leave it at home. If you cannot tell what is inside, leave it at home too." },
  { id: "quick-heading", type: "heading", level: 2, text: "Can I bring cheese, beef jerky, fruit or snacks into China?" },
  { id: "quick-table", type: "table", caption: "Common foods, checked against China's prohibited list (Announcement No. 470)", columns: ["Food", "Can it go in your bag?", "Why"], rows: [
    ["Cheese of any kind, including hard, vacuum-packed or duty-free", "No", "Animal-origin milk and dairy are on the list, and cheese is named in it"],
    ["Beef jerky, salami, ham, sausages, meat floss", "No", "Meat raw or cooked, and its products, are on the list; drying or curing changes nothing"],
    ["Canned meat, canned or long-life milk", "No", "A can is not an exception: canned meat is still meat, canned milk still dairy"],
    ["Eggs, salted egg yolk snacks, mayonnaise", "No", "The list names fresh eggs, salted eggs, preserved eggs, liquid egg and mayonnaise"],
    ["Fresh fruit and vegetables, including fruit from the flight", "No", "Fresh fruit and vegetables are on the list"],
    ["Dried fruit, guava paste (goiabada), jam", "Usually, after a check", "Processed fruit is not fresh fruit, but seeds that can still grow are on the list; check for animal ingredients too"],
    ["Biscuits, crisps, chocolate, coffee, tea, instant noodles", "Usually, after a check", "Not named on the list; read the ingredients and the flavour sachets for meat, egg or milk"],
    ["Dried shrimp, dried squid, fish snacks, shrimp paste, fish sauce", "Usually, after a check", "Fresh and frozen seafood is banned, but the list excepts dried, cooked and fermented sauce-type aquatic products. Customs still inspects them, endangered species stay banned, and the amount must be for your own use"],
    ["Bird's nest", "Only commercially sterilised canned bird's nest", "The list excludes that one form; loose or dried bird's nest stays banned"]
  ] },
  { id: "quick-note", type: "paragraph", text: "The list applies the same way to checked bags, cabin bags and parcels. Moving cheese from your suitcase to your hand luggage, or posting it to your hotel, does not make it allowed." },
  { id: "traps-heading", type: "heading", level: 2, text: "Eight things travellers only find out at the border" },
  { id: "traps-list", type: "list", ordered: true, items: [
    "Duty-free does not mean allowed. Cheese or ham bought airside on your way to China is treated like any other cheese or ham: it is still on the list.",
    "The fruit on your meal tray counts. Fresh fruit is on the list wherever it came from, so eat it on board or leave it on the tray.",
    "Mooncakes and snacks with salted egg yolk are egg products. The list names salted eggs, so check fillings, not just the box.",
    "Instant noodle flavour sachets often contain beef, chicken or egg. Read the sachet, not only the packet front.",
    "Chinese medicine can be on the list. Animal-origin medicinal materials are named in it, and Gongbei Customs gives deer antler as one that may not be carried in.",
    "Seeds hide in souvenirs. Seed necklaces, seed packets and anything that could still grow count as propagating material.",
    "Tobacco leaf is on the list, as are fresh-cut flowers and soil, including soil on plant roots.",
    "Declaring does not make a banned item allowed. Since 1 April 2025, China's baggage rules (Customs Announcement No. 43) require you to declare animal and plant products you carry, and under Article 29 of the Animal and Plant Quarantine Law anything on the list is returned or destroyed. Declare anyway: not declaring is a breach of its own."
  ] },
  { id: "special-heading", type: "heading", level: 2, text: "Pets, medicine and gifts packed by someone else" },
  { id: "special-list", type: "list", items: [
    "A dog or cat can travel only with an official animal health certificate and a vaccination certificate from the exporting country, one per person. It is a formal procedure, not a baggage question.",
    "Medicines and traditional remedies may contain animal, plant or endangered-species ingredients. Quarantine is one layer; medicine and wildlife rules can apply as well.",
    "Open gift boxes packed by friends or family and ask what every filling contains. If it is in your bag, you are the one declaring it.",
    "Any approved exception needs its approval and an official quarantine certificate before you travel. A shop's label or an email from the seller is not an approval."
  ] },
  { id: "arrival-heading", type: "heading", level: 2, text: "On the plane and at the customs hall" },
  { id: "arrival-table", type: "table", caption: "Settle every uncertain item before the green channel", columns: ["When", "Do this", "Not this"], rows: [
    ["Before landing", "Finish or hand back fruit and food from the flight", "Pocket it to deal with later"],
    ["Before choosing a channel", "Think through every bag, including gifts packed by someone else", "Assume checked bags are not inspected"],
    ["Item is banned or you are unsure", "Declare it and walk through the red channel", "Choose green because the amount is small"],
    ["An officer asks to inspect", "Show the item and its label truthfully", "Hide part of it or hand it to another traveller"],
    ["The item is not allowed in", "Follow the officer's instruction and keep any notice you are given", "Argue that you declared it"]
  ] },
  { id: "after-customs-heading", type: "heading", level: 2, text: "Customs is one check. The sights need theirs before you fly" },
  { id: "tickets-urgency", type: "paragraph", text: "Packing can wait until the night before you fly. The Forbidden City cannot. It sells no tickets on the day: tickets open 7 days ahead at 20:00 China time, in each visitor's own passport name. On 1 October 2025, the first day of China's National Day holiday, the museum's booking page already showed 2 to 7 October fully booked. Send the booking to us, pay and share every traveller's passport details at least 8 days before your visit, and our booking guarantee covers it: if the booking fails, we refund the service fee and the ticket money in full. Leave it until you are inside those 8 days and that guarantee no longer applies." },
  { id: "before-list", type: "list", ordered: true, items: [
    "Check every food, gift and souvenir against the table above, and take out anything uncertain.",
    "Fill in the free online arrival card once your flight and first hotel are booked.",
    "Book the sights that open only days ahead, starting with the Forbidden City if Beijing is on your route.",
    "Arrange how you get from the airport to your hotel, so the first hour in China is settled before you land."
  ] },
  { id: "handoff-options", type: "comparison", title: "What we can take off your list", columns: [
    { heading: "A driver waiting at arrivals", body: "You walk out of the customs hall and your driver is at the arrivals exit: a private car to your hotel, in any city in mainland China.", items: ["Our own drivers, waiting when you come through arrivals.", "Price confirmed in writing for your flight before you pay."] },
    { heading: `A private guide: from ${bodyGuideRate("xian", "en")} a day`, body: `Up to 8 hours with a licensed English-speaking guide: from ${bodyGuideRate("xian", "en")} in Xi'an and Zhangjiajie and from ${bodyGuideRate("beijing", "en")} in Beijing and Shanghai, higher on peak dates. The rate is per guide, not per person.`, items: ["Booked by the full day, not by the hour.", "Transport, tickets and meals are quoted separately."] },
    { heading: `The whole trip: from ${bodyTourPrice(tour8, 6, "en")} per person`, body: `Our 8-day Beijing, Xi'an and Shanghai private tour is ${bodyTourPrice(tour8, 2, "en")} per person for two, ${bodyTourPrice(tour8, 6, "en")} for six. The 14-day route adding Chengdu and Guilin is ${bodyTourPrice(tour14, 2, "en")} for two.`, items: ["Four-star hotels with breakfast, a private guide and car on touring days, every transfer, the trains and flights between cities, and the named admissions.", "If we cannot get your Forbidden City or Tiananmen booking, we refund everything you paid, provided we have your passport details at least 8 days before the Forbidden City visit."] }
  ] },
  { id: "handoff-links", type: "internal-links", title: "Book it with us", items: [
    { label: "Ask for an airport pickup", href: "/services/private-car-and-driver/", description: "Any mainland city. Send your flight number and the number of bags." },
    { label: "See the 8-day Beijing, Xi'an and Shanghai route", href: "/tours/beijing-xian-shanghai-8-day-private-tour/", description: "Day-by-day plan, hotels and the published price table." },
    { label: "Hire a guide for the day", href: "/services/private-english-speaking-guides/", description: "Beijing, Shanghai, Xi'an and Zhangjiajie rates." },
    { label: "Plan the whole trip with a planner", href: "/services/full-trip-support/", description: "Tell us your dates and budget; the first brief is free." }
  ] },
  { id: "how-to-book", type: "callout", tone: "decision", title: "How booking works", body: "Send your dates, the number of travellers and what you want to see by WhatsApp or email from any page above. A planner replies within 12 hours, and you get a written quote before you pay anything; the same planner stays with you from that first reply to your last day. You pay a 30% deposit by card through a secure VBill link and the rest after you arrive. Homeground China is a licensed travel agency (L-BJ10587); the guides and drivers are our own, and we never stop at shops." },
  { id: "faq", type: "faq", title: "Questions travellers ask before packing", items: [
    { question: "Can I bring cheese into China?", answer: "No. Animal-origin milk and dairy products are on China's prohibited list, and cheese is named in it. Hard, soft, vacuum-packed and duty-free cheese are all covered, in checked and cabin bags alike." },
    { question: "Can I bring beef jerky, salami or other meat into China?", answer: "No. The list covers meat raw or cooked and its products, whatever the packaging. Drying, curing or commercial sealing does not create an exception." },
    { question: "Can I bring snacks, chocolate or instant noodles?", answer: "Packaged snacks without meat, egg or milk are not on the list and usually pass. Read the full ingredients, including flavour sachets, and declare anything you are unsure about." },
    { question: "Can I take fruit from the flight through the airport?", answer: "No. Fresh fruit and vegetables are on the list wherever they came from. Eat them on board or leave them with the cabin crew." },
    { question: "What happens if customs finds food I should not have brought?", answer: "A banned item can be returned or destroyed under the officer's instruction, whether you declared it or not. Declaring it keeps the matter simple; not declaring it adds a problem of its own." },
    { question: "Can Homeground meet us at the airport?", answer: "Yes. We send a private car with our own driver to the arrivals exit in any city in mainland China. Send your flight number, the number of travellers and bags; we confirm the price in writing before you pay and reply within 12 hours." }
  ] },
  { id: "links", type: "internal-links", title: "Finish the arrival check", items: [
    { label: "China customs red and green channels", href: "/guides/china-customs-red-green-channels/", description: "Choose the right channel after checking every bag." },
    { label: "China online arrival card", href: "/guides/china-online-arrival-card/", description: "Fill in the free official form before you land." },
    { label: "Power bank rules for flights and trains", href: "/guides/china-power-bank-rules-flights-trains/", description: "The other bag check that stops travellers." },
    { label: "Vegetarian and vegan in China", href: "/guides/vegetarian-vegan-china-travel/", description: "What hides in dishes and how meals are planned." }
  ] },
  { id: "sources", type: "sources", title: "Official sources reviewed", items: [
        {"label": "Customs Q&A: dried aquatic products, fish maw, sea cucumber and deer antler", "url": "https://paper.people.com.cn/hwbwap/html/2024-08/24/content_26076641.htm", "publisher": "Gongbei Customs, in People's Daily Overseas Edition", "reviewedAt": "2026-10-20"},
        {"label": "Law on Entry and Exit Animal and Plant Quarantine, Article 29: listed items are returned or destroyed", "url": "https://fgw.sh.gov.cn/cmsres/3f/3f141f71412c4c20a1eb2eadf1ef57c3/ac1a1bae6b10b9bbc58b67c4df2e3bd8.pdf", "publisher": "Official text published by the Shanghai Development and Reform Commission", "reviewedAt": "2026-10-20"},
    { label: "Announcement No. 470: list of animals, plants and products banned from being carried or mailed into China", url: "https://npc.chinaport.gov.cn/npcdeclhome/home/pages/notice/%E7%AE%A1%E9%99%90%E7%9B%AE%E5%BD%95.html", publisher: "China Electronic Port / General Administration of Customs", reviewedAt: "2026-10-20" },
    { label: "Announcement No. 470: scope (carried, checked and mailed items) and updates", url: "https://xmsyj.moa.gov.cn/gjjlhz/202111/t20211102_6381054.htm", publisher: "Ministry of Agriculture and Rural Affairs / General Administration of Customs", reviewedAt: "2026-09-09" },
    { label: "Customs baggage declaration rules, Announcement No. 43 of 2025", url: "https://app.www.gov.cn/govdata/gov/202504/05/526129/article.html", publisher: "General Administration of Customs", reviewedAt: "2026-09-09" },
    { label: "Palace Museum ticketing: release time and real-name rules", url: "https://www.dpm.org.cn/subject_booking/", publisher: "The Palace Museum", reviewedAt: "2026-08-22" },
    { label: "Palace Museum fully booked for 2 to 7 October on the first day of the 2025 National Day holiday", url: "https://www.yicai.com/news/102851899.html", publisher: "Yicai", reviewedAt: "2026-10-19" }
  ] }
] } as const satisfies StructuredPageBody;

export default body;
