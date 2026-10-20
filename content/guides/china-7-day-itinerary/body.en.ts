import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyReservationFee, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour10 = "beijing-xian-guilin-shanghai-10-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";
const bj5 = "beijing-highlights-5-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "lead", type: "lead", text: "The best first week in China is two cities, not four: three nights in Beijing for the Forbidden City and the Great Wall, then three in Shanghai for the Bund, the old lanes and, if you like, a day in Suzhou. That gives you four full sightseeing days, one travel day by high-speed train and no rushing. If the Terracotta Warriors matter more to you than Shanghai's skyline, swap Shanghai for Xi'an. Whichever pair you choose, the week is built around two bookings that cannot wait: the Forbidden City and the train between the cities."},
    {
      "id": "time-heading",
      "type": "heading",
      "level": 2,
      "text": "What seven days actually gives you"
    },
    {
      "id": "time-count",
      "type": "callout",
      "tone": "decision",
      "title": "Beijing 3 nights + Shanghai 3 nights",
      "body": "This plan starts with arrival in Beijing on day 1 and ends with departure from Shanghai on day 7. Sleep in Beijing on nights 1–3 and Shanghai on nights 4–6. Day 4 is the intercity move; days 2, 3, 5 and 6 are the four full sightseeing days."
    },
    {
      "id": "time-2",
      "type": "paragraph",
      "text": "International flights may use extra calendar days outside China. If your whole holiday is one week from leaving home to returning, count your actual days in China first. A late arrival still uses day 1, and an early flight home still uses day 7."
    },
    {id: "traps-heading", type: "heading", level: 2, text: "Six things that can break a one-week China trip"},
    {id: "traps-list", type: "list", ordered: true, items: ["Landing on a Monday and planning the Forbidden City for Tuesday without tickets. The museum normally closes on Mondays, sells nothing on the day and opens tickets 7 days ahead at 20:00 China time, in each visitor's own passport name.", "Counting flight days as holiday days. A late arrival still uses day 1, and an early flight home still uses day 7.", "Leaving the train until Beijing. Tickets go on sale 15 days ahead, counting the travel day; on a busy date, the train you want may be gone.", "Treating the train time as the deadline. Ticket gates close 2 to 12 minutes before departure, depending on the station.", "Assuming the Great Wall ticket covers everything. At Badaling and Mutianyu, admission, transport and the cable car are separate.", "Flying home from a different city. If your international flight leaves from Beijing, the trip needs another travel day or loses one in Shanghai."]},
    {
      "id": "itinerary-heading",
      "type": "heading",
      "level": 2,
      "text": "Your seven days, day by day"
    },
    {
      "id": "day-1-heading",
      "type": "heading",
      "level": 3,
      "text": "Day 1 — Arrive in Beijing and settle in"
    },
    {
      "id": "day-1-1",
      "type": "paragraph",
      "text": "Go to your hotel, unpack for three nights and find an easy dinner nearby. If you arrive early and feel rested, take a short neighbourhood walk to get your bearings. Keep the evening close to your hotel: tomorrow involves plenty of walking, and jet lag can arrive after the initial excitement. Sleep in Beijing, night 1 of 3."
    },
    {
      "id": "day-2-heading",
      "type": "heading",
      "level": 3,
      "text": "Day 2 — Give the Forbidden City your attention"
    },
    {
      "id": "day-2-1",
      "type": "paragraph",
      "text": "Make the Palace Museum the main visit. Walk through the great courtyards, then slow down for painted beams, gateways and smaller spaces instead of rushing between photo stops. Follow the south-to-north visitor route and plan your onward journey from the exit you use."
    },
    {
      "id": "day-2-2",
      "type": "paragraph",
      "text": "This day depends on a confirmed booking. The museum normally closes on Mondays, with holiday exceptions, and does not sell same-day tickets. Swap days 2 and 3 when the calendar and reservations allow. If you also want Tiananmen Square, check its current access arrangements before adding it. Sleep in Beijing, night 2 of 3."
    },
    {
      "id": "day-3-heading",
      "type": "heading",
      "level": 3,
      "text": "Day 3 — Spend the day at the Great Wall"
    },
    {
      "id": "day-3-1",
      "type": "paragraph",
      "text": "Use Badaling for this example and give the outing the whole day, including travel from and back to your hotel. Decide how far to walk after seeing the steps and conditions; a comfortable stretch with time to pause can be more enjoyable than chasing the furthest tower."
    },
    {
      "id": "day-3-2",
      "type": "paragraph",
      "text": "Arrange the journey both ways and check which entrance and optional uphill transport suit your group. Before paying, check whether your booking covers admission alone or also transport and a cable car. Return to Beijing for dinner and pack for the move tomorrow. Sleep in Beijing, night 3 of 3."
    },
    {
    "id": "sightseeing-execution-links",
    "type": "internal-links",
    "title": "Plan these sightseeing days",
    "items": [
      {
        "label": "Badaling: transport and the right entrance",
        "href": "/guides/beijing-to-badaling-great-wall-transfer/"
      }
    ]
  },
    {
      "id": "day-4-heading",
      "type": "heading",
      "level": 3,
      "text": "Day 4 — Travel from Beijing to Shanghai"
    },
    {
      "id": "day-4-1",
      "type": "paragraph",
      "text": "Start by comparing available daytime trains from Beijing South to Shanghai Hongqiao. Check the exact stations, travel date and arrival time before buying. A flight can also work if its full hotel-to-hotel journey fits better; include airport travel, check-in and baggage time in that comparison."
    },
    {
      "id": "day-4-2",
      "type": "paragraph",
      "text": "Treat checkout, travel and reaching the next hotel as the day’s main job. After three nights in Beijing, this is your only change of hotel base. Have dinner near the Shanghai hotel and leave the first big city walk until tomorrow. Sleep in Shanghai, night 1 of 3."
    },
    {
      "id": "day-5-heading",
      "type": "heading",
      "level": 3,
      "text": "Day 5 — See Shanghai from the river and the streets"
    },
    {
      "id": "day-5-1",
      "type": "paragraph",
      "text": "Begin with the Bund waterfront: look at the older buildings behind you and the Pudong skyline across the Huangpu River. Take time to walk, sit and have lunch rather than treating it as one quick photograph."
    },
    {
      "id": "day-5-2",
      "type": "paragraph",
      "text": "For the afternoon, choose one extra focus. Cross to Pudong if seeing the towers up close appeals to you, or stay on the west bank for streets, shops and cafés. If a paid observation deck is important, check its entry arrangements and the weather before booking. Sleep in Shanghai, night 2 of 3."
    },
    {
      "id": "day-6-heading",
      "type": "heading",
      "level": 3,
      "text": "Day 6 — Stay in Shanghai, or replace the day with Suzhou"
    },
    {
      "id": "day-6-1",
      "type": "paragraph",
      "text": "The easier choice is another Shanghai day. Explore Wukang Road and the surrounding lanes, with time for architecture, small shops and a long lunch. Choose a short walking area rather than crossing the city repeatedly. This also leaves room for rain, tired feet or something you missed yesterday."
    },
    {
      "id": "day-6-2",
      "type": "paragraph",
      "text": "Choose Suzhou if a classical garden and canal-side streets are a priority. Replace the Shanghai plan with one garden, such as the Humble Administrator’s Garden, and a walk around Pingjiang Road. Confirm the garden entry, outward and return trains, exact stations and local transfers before committing. Keep the same Shanghai hotel and leave your main luggage there. The extra travel uses time you would otherwise spend exploring Shanghai; return to Shanghai for night 3 of 3."
    },
    {
      "id": "day-7-heading",
      "type": "heading",
      "level": 3,
      "text": "Day 7 — Depart from Shanghai"
    },
    {
      "id": "day-7-1",
      "type": "paragraph",
      "text": "Build the morning around your confirmed flight and its departure airport. A late flight may allow a nearby breakfast or short walk, but keep this as the departure day. If your international ticket requires a return to Beijing, add that journey explicitly: it will take sightseeing time or require another day. There is no seventh hotel night in this example."
    },
    {
      "id": "stay-heading",
      "type": "heading",
      "level": 2,
      "text": "Choose hotels that make the week easier"
    },
    {
      "id": "stay-1",
      "type": "paragraph",
      "text": "Use one hotel for all three nights in each city. In Beijing, compare Wangfujing, Qianmen and a hutong-area base against your arrival and sightseeing plans. In Shanghai, compare the Bund, People’s Square and the former French Concession area. Check the actual hotel’s station access, lift and luggage arrangements. A convenient neighbourhood matters more over three nights than staying beside a station used only once."
    },
    {
      "id": "stay-links",
      "type": "internal-links",
      "title": "Choose your hotel area and garden visit",
      "items": [
        {
          "label": "where to stay in Beijing",
          "href": "/guides/beijing-where-to-stay-first-trip/"
        },
        {
          "label": "where to stay in Shanghai",
          "href": "/guides/shanghai-where-to-stay-first-trip/"
        },
        {
          "label": "choosing a Suzhou garden",
          "href": "/guides/how-to-read-a-suzhou-garden/"
        }
      ]
    },
    {
      "id": "booking-heading",
      "type": "heading",
      "level": 2,
      "text": "Settle the key bookings before filling the gaps"
    },
    {
      "id": "booking-1",
      "type": "paragraph",
      "text": "Confirm your international arrival and departure cities, then the six hotel nights and day 4 transport. Book the Palace Museum through its official visitor and ticket page, using each traveller’s correct document details. Check the China Railway ticketing guidance and carry the same passport used to book your train. For Badaling, check the attraction ticket and your chosen access route separately. Leave optional evening activities until these main pieces fit."
    },
    {
      "id": "booking-links",
      "type": "sources",
      "title": "Official booking pages and sources",
      "items": [
        {label: "How many minutes before departure do stations stop checking tickets? (from China Railway)", url: "https://m.gmw.cn/toutiao/2023-04/06/content_1303333333.htm", publisher: "China Youth Daily, on Guangming Online", reviewedAt: "2026-10-20"},
        {label: "Railway tickets: 15-day advance sale, counting the travel day", url: "https://www.12306.cn/mormhweb/zxdt/202205/t20220531_37508.html", publisher: "China Railway 12306", reviewedAt: "2026-08-10"},
        {label: "Palace Museum ticketing: release time and real-name rules", url: "https://www.dpm.org.cn/subject_booking/", publisher: "The Palace Museum", reviewedAt: "2026-08-22"},
        {label: "Palace Museum fully booked for 2 to 7 October on the first day of the 2025 National Day holiday", url: "https://www.yicai.com/news/102851899.html", publisher: "Yicai", reviewedAt: "2026-10-19"},
        {
          "label": "official visitor and ticket page",
          "url": "https://intl.dpm.org.cn/visit.html"
        },
        {
          "label": "China Railway ticketing guidance",
          "url": "https://www.12306.cn/en/faq.html?item=2"
        }
      ]
    },
    {
      "id": "alternative-heading",
      "type": "heading",
      "level": 2,
      "text": "Prefer Xi’an to Shanghai? Keep it a two-city trip"
    },
    {
      "id": "alternative-1",
      "type": "paragraph",
      "text": "Keep Beijing on days 1–3, travel to Xi’an on day 4 and spend nights 4–6 there. Give day 5 to the Terracotta Warriors, including the return journey, and day 6 to the city wall area and time for food and old-city streets. Depart from Xi’an on day 7, subject to a workable onward flight. This swaps river views and modern Shanghai for more ancient history. Confirm the Beijing–Xi’an transport and departure connection before choosing it."
    },
    {id: "help-heading", type: "heading", level: 2, text: "One week, booked end to end"},
    {id: "help-1", type: "paragraph", text: "A week leaves no spare day to recover a missed booking. The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time, in each visitor's own passport name, and on 1 October 2025, the first day of China's National Day holiday, its booking page already showed 2 to 7 October fully booked. Hand the booking to us and pay at least 8 days before your visit, and our booking guarantee covers it: if the booking fails, we refund the service fee and the ticket money in full. Inside those 8 days the guarantee no longer applies."},
    { id: "handoff-options", type: "comparison", title: "What we can arrange", columns: [
      { heading: `The whole trip: from ${bodyTourPrice(tour8, 6, "en")} per person`, body: `Our 8-day Beijing, Xi'an and Shanghai private tour is ${bodyTourPrice(tour8, 2, "en")} per person for two and ${bodyTourPrice(tour8, 6, "en")} for six. The 10-day route adding Guilin is ${bodyTourPrice(tour10, 2, "en")} per person for two.`, items: ["Four-star hotels with breakfast, a private guide and car on touring days, every transfer, the trains and flights between cities, and the named admissions.", "If we cannot get your Forbidden City or Tiananmen booking, we refund everything you paid, provided we have your passport details at least 8 days before the Forbidden City visit."] },
      { heading: `Beijing only, 5 days: from ${bodyTourPrice(bj5, 6, "en", "english-guided")} per person`, body: `${bodyTourPrice(bj5, 2, "en", "english-guided")} per person for two with an English-speaking guide on days 2 to 4; four nights in a four-star Beijing hotel with breakfast, the Forbidden City and the Great Wall.`, items: ["Private airport or station transfers and a private car on touring days; no shopping stops.", "If we cannot get your Forbidden City or Tiananmen booking, we refund everything you paid, provided we have your passport details at least 8 days before the Forbidden City visit."] },
      { heading: `A private guide: from ${bodyGuideRate("xian", "en")} a day`, body: `Up to 8 hours with a licensed English-speaking guide: from ${bodyGuideRate("xian", "en")} in Xi'an and Zhangjiajie and from ${bodyGuideRate("beijing", "en")} in Beijing and Shanghai, higher on peak dates.`, items: ["Booked by the full day, per guide, not per person.", "Transport, tickets and meals are quoted separately."] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "Book it with us", items: [{label: "See the 8-day Beijing, Xi'an and Shanghai route", href: "/tours/beijing-xian-shanghai-8-day-private-tour/", description: "Day-by-day plan, hotels and the published price table."}, {label: "See the attractions we book", href: "/services/china-attraction-reservations/", description: "Release times, prices and the guarantee, attraction by attraction."}, {label: "Hire a guide for the day", href: "/services/private-english-speaking-guides/", description: "Beijing, Shanghai, Xi'an and Zhangjiajie rates."}, {label: "Ask for an airport or station pickup", href: "/services/private-car-and-driver/", description: "Any mainland city. Send your route, date and luggage."}, {label: "Plan the whole trip with a planner", href: "/services/full-trip-support/", description: "Tell us your dates and budget; the first brief is free."}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "How booking works", body: "Send your dates, the number of travellers and what you want to see by WhatsApp or email from any page above. A planner replies within 12 hours, and you get a written quote before you pay anything; the same planner stays with you from that first reply to your last day. You pay a 30% deposit by Alipay or VBill and the rest after you arrive; we add no fee. Homeground China is a licensed travel agency (L-BJ10587); the guides and drivers are our own, and we never stop at shops."},
    {
    "id": "faq",
    "type": "faq",
    "title": "Questions about the seven-day route",
    "items": [
      {
        "question": "How many full sightseeing days do I actually get on a 7-day China trip?",
        "answer": "Four. The plan starts with arrival in Beijing on day 1 and ends with departure from Shanghai on day 7, and day 4 is the intercity move, so days 2, 3, 5 and 6 are the four full sightseeing days. You sleep in Beijing on nights 1-3 and in Shanghai on nights 4-6."
      },
      {
        "question": "Is the Forbidden City closed on Mondays?",
        "answer": "Normally yes, with holiday exceptions, and the museum does not sell same-day tickets either, so day 2 depends on a confirmed booking. Swap days 2 and 3 when the calendar and reservations allow, which brings the Great Wall day forward. If you also want Tiananmen Square, check its current access arrangements before adding it."
      },
      {
        "question": "Should we take the train or fly from Beijing to Shanghai on day 4?",
        "answer": "Start by comparing daytime trains from Beijing South to Shanghai Hongqiao, and check the exact stations, travel date and arrival time before buying. A flight can also work if its full hotel-to-hotel journey fits better; include airport travel, check-in and baggage time in that comparison. Treat checkout, travel and reaching the next hotel as the day's main job."
      },
      {
        "question": "Can we add Suzhou as a day trip?",
        "answer": "Swap it in for the day 6 Shanghai plan. Choose one garden, such as the Humble Administrator's Garden, and a walk around Pingjiang Road, then confirm the garden entry, outward and return trains, exact stations and local transfers before committing. The extra travel uses time you would otherwise spend in Shanghai, so keep the same hotel, leave your main luggage there and return for night 3 of 3."
      },
      {
        "question": "Our international flight home leaves from Beijing, not Shanghai. Does this route still work?",
        "answer": "Add that journey explicitly. A return to Beijing will take sightseeing time or require another day, so build day 7 around your confirmed flight and its departure airport. A late flight may allow a nearby breakfast or short walk, but keep this as the departure day. There is no seventh hotel night in this example."
      },
      {
        "question": "Can we swap Shanghai for Xi'an?",
        "answer": "Yes, and it stays a two-city trip. Keep Beijing on days 1-3, travel to Xi'an on day 4 and spend nights 4-6 there. Day 5 goes to the Terracotta Warriors including the return journey, and day 6 to the city wall area, food and old-city streets. Depart from Xi'an on day 7, subject to a workable onward flight, and confirm the Beijing-Xi'an transport and departure connection before choosing it."
      }, {question: "Is there a 7-day China tour I can book?", answer: "Our nearest published route is the 8-day Beijing, Xi'an and Shanghai private tour: Beijing 3 nights, Xi'an 2 and Shanghai 2, with hotels, guide and car, transfers, the train and flight between cities and the named admissions included. For a seven-day Beijing and Shanghai week as above, we quote it separately in writing before you pay."}, {question: "When should I book the Forbidden City for a one-week trip?", answer: "Tickets open 7 days ahead at 20:00 China time, and none are sold on the day. If you hand the booking to us and pay at least 8 days before your visit, our booking guarantee covers it: if the booking fails, the fee and ticket money are refunded in full."}]
  },
    {
      "id": "help-links",
      "type": "internal-links",
      "title": "Plan your next step",
      "items": [
        {label: "Choose a winter destination: snow, cities or coast", href: "/guides/china-in-winter/"},
        {label: "Build your China packing list", href: "/guides/china-packing-list/"},
        {
          "label": "China private tours: itineraries and prices",
          "href": "/#travel-products"
        },
        {
          "label": "talk to a China trip planner",
          "href": "/#planner-contact"
        },
        {
          "label": "compare the ten-day China routes",
          "href": "/guides/china-10-day-itinerary/"
        }
      ]
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
