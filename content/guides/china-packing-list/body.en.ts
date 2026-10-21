import type { StructuredPageBody } from "../../../lib/content-system/page-body";
import { bodyGuideRate, bodyTourPrice } from "../../../lib/guideBodyPrices.ts";

const tour8 = "beijing-xian-shanghai-8-day-private-tour";
const tour14 = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {id: "lead", type: "lead", text: "For 7 to 14 days in China, pack about five days of clothes and plan a wash every three or four days; one main case and one day bag is enough. Dress in comfortable, casual layers and walking shoes you have already broken in: China's cities are informal, and most sightseeing days involve a lot of walking and steps. Build the rest around the coldest and wettest stop on your route, not around \"China\". Keep your passport, medicines and charging kit in the bag that stays with you. Before you choose the suitcase, check the high-speed train limit below."},
    {
      "id": "bag-choice",
      "type": "callout",
      "tone": "decision",
      "title": "One main bag + one day bag",
      "body": "Choose a main bag you can comfortably move through a station and lift over a few steps, or arrange help before the trip. A bag that meets the airline limit can still be awkward on a route with frequent hotel changes. Pack the day bag inside your cabin allowance; a second bag is not automatically free."
    },
    {
      "id": "carry-heading",
      "type": "heading",
      "level": 2,
      "text": "Keep these in your carry-on"
    },
    {
      "id": "carry-list",
      "type": "list",
      "items": [
        "Water bottles: carry the bottle empty through security and fill it airside; check your airline's rules before putting liquids in checked bags.",
        "Original passport or other accepted document used for your bookings, plus any visa and entry or transit documents required for your route. Keep backup copies separately; they do not replace the original.",
        "Offline flight and train details, the first hotel's name and address in Chinese, insurance details and a contact you can reach if your phone setup fails.",
        "Phone, charging cable, compatible wall charger and plug adapter. Add a power bank only after checking its label, model and the rules for every transport leg.",
        "Regular medicines you have verified for entry and carriage, in labelled packaging, with the relevant prescription or medical information. Keep glasses and other essentials you cannot easily replace here too.",
        "A payment card and some cash kept separately from your phone; prepare your mobile-payment account before departure.",
        "One change of underwear and a light top, plus the layer you will need on arrival. If your checked bag is delayed, you can still charge your phone and change clothes.",
        "Tissues, a small toiletry kit and an empty water bottle. Check your departure airport's cabin-liquid rules before adding liquids, gels or aerosols."
      ]
    },
    {
      "id": "documents-links",
      "type": "internal-links",
      "title": "Prepare the things you cannot replace with a spare shirt",
      "items": [
        {
          "label": "Passport validity and blank pages",
          "href": "/guides/china-passport-validity-and-blank-pages/"
        },
        {
          "label": "Set up payments in China",
          "href": "/guides/how-to-pay-in-china-as-a-tourist/"
        },
        {
          "label": "Choose an eSIM, local SIM or roaming",
          "href": "/guides/china-esim-vs-local-sim/"
        }
      ]
    },
    {id: "traps-heading", type: "heading", level: 2, text: "Five packing surprises travellers meet in China"},
    {id: "traps-list", type: "list", ordered: true, items: ["A big suitcase can be too big for the high-speed train. China Railway allows each adult 20 kg of free luggage, and on high-speed (EMU) trains each item's length, width and height must add up to no more than 130 cm. A typical large checked case measures more than that, and many medium cases do too: 65 × 45 × 27 cm already adds up to 137 cm. If your route is by train, measure the case before you pack it.", "Your hotel room may have no toothbrush. Since the end of 2025, China's plastic-reduction rules have told every hotel, guesthouse and homestay not to put single-use plastic items in rooms unprompted. Ask at the front desk, or pack your own toothbrush, razor and comb.", "The power bank you flew in with may not be allowed on a domestic flight. Since 28 June 2025, units without a clear CCC mark, and recalled models, are not allowed on flights within China. A power bank bought outside China may have no CCC mark at all; check the label.", "Your plug may fit and your device may still not cope. Mainland sockets supply 220 V at 50 Hz; check the INPUT range on each charger, because an adapter changes the plug shape, not the voltage.", "Food gifts are a customs question, not a packing one. Cheese, meat, egg products and fresh fruit are on China's prohibited list whatever the packaging; check them before they go in the case."]},
    {
      "id": "clothes-heading",
      "type": "heading",
      "level": 2,
      "text": "A clothing list for 7–14 days"
    },
    {
      "id": "clothes-intro",
      "type": "paragraph",
      "text": "These are starting quantities for one adult on a city-focused trip with laundry every few days. They include what you wear on the flight. Choose pieces that work together, then add only the seasonal items your route needs."
    },
    {
      "id": "clothes-table",
      "type": "comparison",
      "title": "A small clothing rotation, including your travel outfit",
      "columns": [
        {
          "heading": "Everyday tops",
          "body": "Starting quantity: 4–5",
          "items": [
            "Easy to wash and comfortable for walking; one can be a neater dinner top."
          ]
        },
        {
          "heading": "Trousers, skirts or other bottoms",
          "body": "Starting quantity: 2",
          "items": [
            "Choose pieces you can wear with several tops; avoid two bulky pairs that do the same job."
          ]
        },
        {
          "heading": "Underwear",
          "body": "Starting quantity: 5–7 changes",
          "items": [
            "Use the higher end if laundry timing is uncertain."
          ]
        },
        {
          "heading": "Socks",
          "body": "Starting quantity: 4–5 pairs",
          "items": [
            "Match them to your walking shoes; add a spare if your days are particularly active."
          ]
        },
        {
          "heading": "Sleepwear",
          "body": "Starting quantity: 1 set",
          "items": [
            "Keep it compact and separate from outdoor clothing."
          ]
        },
        {
          "heading": "Light warm layer",
          "body": "Starting quantity: 1",
          "items": [
            "Useful for cool evenings and strong indoor air conditioning."
          ]
        },
        {
          "heading": "Rain protection",
          "body": "Starting quantity: 1 light shell or compact umbrella",
          "items": [
            "Choose for the route; a shell leaves both hands free on steps."
          ]
        },
        {
          "heading": "Shoes",
          "body": "Starting quantity: 1 worn-in walking pair",
          "items": [
            "Wear these in transit. Add one compact second pair only for a specific use, such as a beach or hotel pool."
          ]
        }
      ]
    },
    {
      "id": "case-extras",
      "type": "paragraph",
      "text": "Add your toothbrush, everyday skincare, deodorant and other toiletries in quantities suited to the trip, with leak protection. Pack a small laundry bag and a foldable bag for separating wet or dirty items. Bring swimwear only if swimming is actually in your plan. Ask the hotel about a hairdryer before carrying your own; avoid filling the case with duplicate appliances."
    },
    {
      "id": "laundry-heading",
      "type": "heading",
      "level": 2,
      "text": "Use laundry to keep a two-week bag manageable"
    },
    {
      "id": "laundry-list",
      "type": "list",
      "items": [
        "For seven days, plan one wash around day 3 or 4. For fourteen days, plan two or three washes, roughly every four days, and adjust for activity and weather.",
        "Choose a hotel stay of at least two nights for laundry. Confirm whether there is a guest washer and dryer or a paid service, its hours and when clothes will be ready.",
        "Wash before you use the last clean set. Keep a dry outfit for the next day, and collect everything before the next hotel move.",
        "Do not rely on a thick cotton top or jeans drying overnight in a bathroom. If there is no reliable dryer, choose lighter fabrics or add a little more clothing.",
        "If you will not do laundry, increase underwear and tops to suit the trip, then weigh the result before choosing the bag. Two weeks of full outfits is a luggage decision, not a necessity."
      ]
    },
    {
      "id": "day-heading",
      "type": "heading",
      "level": 2,
      "text": "What to take out each morning"
    },
    {
      "id": "day-copy",
      "type": "paragraph",
      "text": "Keep the large case at your accommodation during sightseeing. Your day bag needs your booking document where required, phone, a payment backup, drinking water, tissues, the day's essential medicines, and the rain or warm layer relevant to that outing. Add a hat and sunscreen for exposed days. Leave spare shoes, full toiletry bottles and the week's clothes at the hotel."
    },
    {
      "id": "summer-heading",
      "type": "heading",
      "level": 2,
      "text": "Summer packing: add sun and rain protection"
    },
    {
      "id": "summer-copy",
      "type": "paragraph",
      "text": "For a summer city trip, favour light, washable tops and comfortable bottoms. Add a sun hat, sunglasses, sunscreen and light rain protection; keep the thin indoor layer. If you expect to change after a sweaty walking day, add one extra top and underwear change, or wash more often. Sandals can be a second pair, but do not make unfamiliar sandals your only shoes for long sightseeing days."
    },
    {
      "id": "winter-heading",
      "type": "heading",
      "level": 2,
      "text": "Winter packing: build around the coldest stop"
    },
    {
      "id": "winter-copy",
      "type": "paragraph",
      "text": "For a cold northern city, add a thermal base layer, insulating mid-layer, warm outer coat, hat, gloves and a scarf or neck covering. Choose footwear with useful grip and space for suitable socks. Wear the bulky coat during transfers when practical, and keep it accessible before leaving the arrival terminal."
    },
    {
      "id": "winter-variation",
      "type": "paragraph",
      "text": "Harbin ice-and-snow days need a more substantial cold-weather setup than a short city walk: plan insulated footwear, warm socks and enough dry layers for repeated outdoor sessions. A Hainan stay needs a different bag; do not carry a full snow kit unless another stop requires it. Pick clothing for the named places and forecast, rather than for the word ‘China’."
    },
    {
      "id": "mountain-heading",
      "type": "heading",
      "level": 2,
      "text": "Mountain days: add warmth without another suitcase"
    },
    {
      "id": "mountain-copy",
      "type": "paragraph",
      "text": "For a sightseeing route with mountain walks, add a wind- and rain-resistant outer layer, a warm layer and spare socks in a dry bag. Use shoes you have already walked in, with soles suited to wet or uneven steps. Check conditions at the mountain itself, not only in the city where you sleep. Put those layers in the day bag before leaving the hotel; a coat in the main suitcase will not help at a viewpoint. Multi-day trekking needs a separate equipment plan."
    },
    {
      "id": "season-link",
      "type": "internal-links",
      "title": "Check the route before choosing the layers",
      "items": [
        {
          "label": "How China's climate regions change a trip",
          "href": "/guides/china-climate-regions-for-trip-timing/"
        }
      ]
    },
    {
      "id": "market-heading",
      "type": "heading",
      "level": 2,
      "text": "Coming from Australia, Singapore or Malaysia?"
    },
    {
      "id": "market-season",
      "type": "paragraph",
      "text": "Australia and China are in opposite hemispheres: leaving an Australian summer in December can mean arriving in a northern Chinese winter. In June, the seasonal switch runs the other way. Travellers from Singapore or Malaysia should also pack from the destination forecast rather than the weather at home. Put the arrival layer in your cabin bag, particularly if you will reach your hotel late."
    },
    {
      "id": "market-plugs",
      "type": "paragraph",
      "text": "For Singaporean or Malaysian equipment with a three-rectangular-pin Type G plug, bring an adapter that accepts it and fits mainland sockets. Australian Type I pins resemble the angled Chinese format, but check fit, grounding and the device rating rather than assuming every outlet will work. On each charger, the INPUT range must cover 220V and 50Hz; a plug-shape adapter does not change voltage. One compatible multi-port charger can reduce the number of chargers you carry."
    },
    {
      "id": "power-link",
      "type": "internal-links",
      "title": "Choose the right adapter",
      "items": [
        {
          "label": "China plugs, voltage and device labels",
          "href": "/guides/china-power-plugs-voltage-and-adapters/"
        }
      ]
    },
    {
      "id": "rules-heading",
      "type": "heading",
      "level": 2,
      "text": "Check these before closing the bag"
    },
    {
      "id": "baggage-copy",
      "type": "paragraph",
      "text": "Read the cabin and checked-baggage allowance on each ticket, including separate domestic flights. Some international fares do not include free checked baggage. Weigh the packed case and cabin bag; do not choose a suitcase from an assumed ‘China allowance’. For rail journeys, also consider how you will move the bag and store it onboard."
    },
    {
      "id": "battery-copy",
      "type": "paragraph",
      "text": "Keep a permitted power bank in your cabin bag, accessible for inspection. China domestic flights prohibit units without a clear CCC mark and recalled models or batches under the rule effective from 28 June 2025. An international itinerary can still include a domestic flight. Check the exact unit and current carrier rules; railway limits are separate."
    },
    {
      "id": "restricted-copy",
      "type": "paragraph",
      "text": "Make a separate review pile for food gifts, supplements and medicines before packing them. Keep full ingredient or active-ingredient names and original labels available, and check the product's entry requirements. Sealed packaging, personal use or a prescription does not give every item permission to enter. Use the food guide below and its Customs sources for the exact category; seek the relevant official medication guidance before carrying a medicine whose status is unclear."
    },
    {
      "id": "rules-links",
      "type": "internal-links",
      "title": "Resolve an item before packing it",
      "items": [
        {
          "label": "Power-bank rules for flights and trains",
          "href": "/guides/china-power-bank-rules-flights-trains/"
        },
        {
          "label": "Food, plants and animal products at entry",
          "href": "/guides/food-plants-and-animal-products-into-china/"
        },
        {
          "label": "Customs red and green channels",
          "href": "/guides/china-customs-red-green-channels/"
        },
        {
          "label": "First-time high-speed train travel",
          "href": "/guides/china-high-speed-train-first-time-guide/"
        }
      ]
    },
    {
      "id": "last-heading",
      "type": "heading",
      "level": 2,
      "text": "The five-minute check before you leave"
    },
    {
      "id": "last-list",
      "type": "list",
      "ordered": true,
      "items": [
        "Put the original booking document, phone, medicines and arrival layer in the bag that stays with you.",
        "Charge your devices, save the first hotel's Chinese address offline and make sure you can receive the account codes you need.",
        "Check every suitcase pocket for forgotten batteries, liquids, food or other items that need a different packing or clearance decision.",
        "Weigh each bag against the actual ticket allowance and try moving everything together. Remove a duplicate pair of shoes or bulky outfit if that makes the journey easier.",
        "Confirm where the first laundry wash fits, and leave some room in the case for purchases on the trip."
      ]
    },
    {id: "lighter-heading", type: "heading", level: 2, text: "Pack lighter by moving less"},
    {id: "lighter-copy", type: "paragraph", text: "The bag is easiest to manage when someone else handles the moves. On our multi-city private tours, a driver takes you and your luggage from the hotel to the station or airport on every travel day, and another meets you at the other end; on the 14-day route, your bags are moved separately while you cruise the Li River. You still lift the case onto the train, so the 130 cm rule above still applies. And the trip has its own deadlines. The Forbidden City opens tickets only 7 days ahead at 20:00 China time and sells none on the day; on 1 October 2025, the first day of China's National Day holiday, its booking page already showed 2 to 7 October fully booked. We book it for CNY 45 (about USD 7) per person plus the ticket at face value. Hand the booking to us and pay at least 8 days before your visit, and our booking guarantee covers it: if the booking fails, we refund the fee and the ticket money in full. Inside those 8 days the guarantee no longer applies."},
    { id: "handoff-options", type: "comparison", title: "What we can arrange", columns: [
      { heading: "Station and airport transfers", body: "A private car between your hotel and the station or airport, in any city in mainland China, with room for your bags.", items: ["Our own drivers.", "Price confirmed in writing before you pay."] },
      { heading: `A private guide: from ${bodyGuideRate("xian", "en")} a day`, body: `Up to 8 hours with a licensed English-speaking guide: from ${bodyGuideRate("xian", "en")} in Xi'an and Zhangjiajie and from ${bodyGuideRate("beijing", "en")} in Beijing and Shanghai, higher on peak dates. Per guide, not per person.`, items: ["Booked by the full day, not by the hour.", "Transport, tickets and meals are quoted separately."] },
      { heading: `The whole trip: from ${bodyTourPrice(tour8, 6, "en")} per person`, body: `The 8-day Beijing, Xi'an and Shanghai private tour is ${bodyTourPrice(tour8, 2, "en")} per person for two, ${bodyTourPrice(tour8, 6, "en")} for six; the 14-day route with Chengdu and Guilin is ${bodyTourPrice(tour14, 2, "en")} for two.`, items: ["Four-star hotels with breakfast, a private guide and car on touring days, every transfer, the trains and flights between cities and the named admissions.", "If we cannot get your Forbidden City or Tiananmen booking, we refund everything you paid, provided we have your passport details at least 8 days before the Forbidden City visit."] }
    ] },
    {id: "handoff-links", type: "internal-links", title: "Book it with us", items: [{label: "See the attractions we book", href: "/services/china-attraction-reservations/", description: "Release times, prices and the guarantee, attraction by attraction."}, {label: "Ask for a station or airport transfer", href: "/services/private-car-and-driver/", description: "Any mainland city. Send your route, date and luggage."}, {label: "See the 8-day Beijing, Xi'an and Shanghai route", href: "/tours/beijing-xian-shanghai-8-day-private-tour/", description: "Day-by-day plan, hotels and the published price table."}, {label: "Plan the whole trip with a planner", href: "/services/full-trip-support/", description: "Tell us your dates and budget; the first brief is free."}]},
    {id: "how-to-book", type: "callout", tone: "decision", title: "How booking works", body: "Send your dates, the number of travellers and what you want to see by WhatsApp or email from any page above. A planner replies within 12 hours, and you get a written quote before you pay anything; the same planner stays with you from that first reply to your last day. You pay a 30% deposit by Alipay or VBill and the rest after you arrive; we add no fee. Homeground China is a licensed travel agency (L-BJ10587); the guides and drivers are our own, and we never stop at shops."},
    {
      "id": "faq",
      "type": "faq",
      "title": "Questions travellers ask while packing",
      "items": [
        {
          "question": "How many clothes do I need for a two-week China trip?",
          "answer": "About five days of clothing plus a laundry plan. The starting quantities for one adult on a city-focused trip are 4-5 everyday tops, 2 bottoms, 5-7 underwear changes, 4-5 pairs of socks and one sleepwear set, including what you wear on the flight. For fourteen days, plan two or three washes, roughly every four days."
        },
        {
          "question": "Can I take my power bank on a domestic flight in China?",
          "answer": "Keep a permitted power bank in your cabin bag, accessible for inspection. China domestic flights prohibit units without a clear CCC mark and recalled models or batches under the rule effective from 28 June 2025. An international itinerary can still include a domestic flight, so check the exact unit and current carrier rules; railway limits are separate."
        },
        {
          "question": "Will my Singapore or Australian plug fit a Chinese socket?",
          "answer": "Check the fit and the device label, not just the pin shape. For a three-rectangular-pin Type G plug, bring an adapter that accepts it and fits mainland sockets. Australian Type I pins resemble the angled Chinese format, but check fit, grounding and the device rating. Each charger's INPUT range must cover 220V and 50Hz; a plug-shape adapter does not change voltage."
        },
        {
          "question": "What should I keep in my carry-on in case the checked bag is late?",
          "answer": "One change of underwear, a light top and the outer layer you will wear on arrival. Add the passport you booked with, your phone, cable and charger, a payment card and some cash kept apart from the phone, and medicines you have already checked, in their labelled packaging. Then you can charge the phone and change into clean clothes even if the case arrives late."
        },
        {
          "question": "Can I bring food gifts, supplements and medicines into China?",
          "answer": "Make a separate review pile before packing them. Keep full ingredient or active-ingredient names and original labels available, and check the product's entry requirements. Sealed packaging, personal use or a prescription does not give every item permission to enter. Seek the relevant official medication guidance before carrying a medicine whose status is unclear."
        },
        {
          "question": "Is my day bag free in addition to the suitcase?",
          "answer": "Not automatically. Pack the day bag inside your cabin allowance, and read the cabin and checked-baggage allowance on each ticket, including separate domestic flights. Some international fares do not include free checked baggage. Weigh the packed case and cabin bag rather than choosing a suitcase from an assumed China allowance."
        }, {question: "What should I wear in China?", answer: "Casual, comfortable clothes in layers and walking shoes you have already worn in. Chinese cities are informal, and sightseeing days mean long walks and many steps. Add sun and rain protection in summer and proper cold-weather layers for a northern winter."}, {question: "What size suitcase works on Chinese high-speed trains?", answer: "China Railway's limit is 20 kg of free luggage per adult, and on high-speed (EMU) trains each item's length, width and height together must not exceed 130 cm. Measure before you buy: a 65 × 45 × 27 cm medium case is already 137 cm, while a cabin-size case is usually well inside the limit."}]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "Official travel information",
      "items": [
        {label: "Palace Museum fully booked for 2 to 7 October on the first day of the 2025 National Day holiday", url: "https://www.yicai.com/news/102851899.html", publisher: "Yicai", reviewedAt: "2026-10-19"},
        {label: "Free luggage limits: 20 kg per adult; 130 cm per item on EMU trains, 160 cm on other trains", url: "https://www.12306.cn/en/faq.html?item=2", publisher: "China Railway 12306", reviewedAt: "2026-10-20"},
        {label: "Opinions on further strengthening plastic pollution control: hotels stop providing single-use plastic items unprompted (all hotels by the end of 2025)", url: "https://www.mee.gov.cn/xxgk2018/xxgk/xxgk10/202001/t20200120_760495.html", publisher: "National Development and Reform Commission / Ministry of Ecology and Environment", reviewedAt: "2026-10-20"},
        {label: "Palace Museum ticketing: release time and real-name rules", url: "https://www.dpm.org.cn/subject_booking/", publisher: "The Palace Museum", reviewedAt: "2026-08-22"},
        {
          "label": "Official guidance for narcotic and psychotropic medicines",
          "url": "https://english.shanghai.gov.cn/en-ImmigrationCustoms/20240516/632357dc3fbe483c923a5c296795b618.html",
          "publisher": "Shanghai Customs",
          "reviewedAt": "2026-09-10"
        },
        {
          "label": "Railway booking documents",
          "url": "https://www.12306.cn/en/faq.html?item=2",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-09-10"
        },
        {
          "label": "International fare and baggage differences",
          "url": "https://webresource.airchina.com.cn/en-US/content/c/2024-02-09/16521.shtml",
          "publisher": "Air China",
          "reviewedAt": "2026-09-10"
        },
        {
          "label": "Domestic-flight power-bank notice",
          "url": "https://www.caac.gov.cn/English/News/202507/t20250709_227894.html",
          "publisher": "CAAC",
          "reviewedAt": "2026-09-10"
        },
        {
          "label": "Electricity in China",
          "url": "https://www.caac.gov.cn/ZTZL/RDZT/YTHYWZ/CHRY/SHZN/Electricity/index.html",
          "publisher": "CAAC",
          "reviewedAt": "2026-09-10"
        }
      ]
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
