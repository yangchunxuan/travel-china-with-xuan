import type { CorporateTrip } from "./corporateTravelTypes";

const zhangjiajieImages =
  "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/";
const shanghaiImages = "/images/tours/shanghai-suzhou-5-day-private-tour/";

export const corporateTrips: CorporateTrip[] = [
  {
    slug: "zhangjiajie-4-day-team-trip",
    title: "Zhangjiajie: Together Among the Peaks",
    seoTitle: "Zhangjiajie Company Trip | 4 Days, 3 Nights | Homeground China",
    description:
      "A sample 4-day Zhangjiajie company trip for 10–30 people: three nights in Wulingyuan, forest-park scenery, a gentle valley walk and a team dinner. Quote on request.",
    eyebrow: "Company trips · Incentive travel",
    lede:
      "Give your team a few days beyond the familiar. Walk beneath Zhangjiajie’s sandstone peaks, share a table at the end of the day, and leave room for the conversations that rarely happen at work.",
    duration: "4 days / 3 nights",
    groupSize: "Suggested: 10–30 people",
    base: "Wulingyuan · one hotel for three nights",
    format: "Private company trip · sample itinerary",
    hero: {
      src: `${zhangjiajieImages}wulingyuan-peaks-1600.webp`,
      alt: "Sandstone pillars and green forest in Wulingyuan, Zhangjiajie",
      caption: "A different setting for time together, in Hunan’s Wulingyuan landscape.",
    },
    storyTitle: "A shared experience, with room to breathe",
    story:
      "The best moments on a company trip are often unplanned: a conversation on a forest path, a photograph everyone wants to be in, a toast to someone whose work deserves recognition. This four-day sample keeps those moments in view. One hotel in Wulingyuan, one main mountain day, and a gentler day below the peaks give the trip a clear rhythm. We shape the walking, meals and time together around the people coming.",
    highlights: [
      {
        title: "Three nights, one base",
        text: "Stay together in Wulingyuan. Hotel selection starts with the rooming list, coach access and your budget, so the group can settle in rather than keep packing.",
      },
      {
        title: "Scenery you can share",
        text: "A guided day around Tianzi Mountain and Yuanjiajie balances the major viewpoints with sensible breaks. Park transport and walking requirements are explained in the proposal.",
      },
      {
        title: "An evening to say thank you",
        text: "A final team dinner gives you space to recognise good work. A private room, speeches, awards and technical equipment can be considered when we know your plans.",
      },
    ],
    days: [
      {
        title: "Arrive, settle in, find your rhythm",
        place: "Zhangjiajie arrival point → Wulingyuan",
        summary:
          "Meet the local team and travel to your hotel in Wulingyuan. The first day is built around arrivals, with a welcome dinner if the group reaches the hotel in time.",
        details: [
          "Share everyone’s flights or trains before we plan the pickups. Separate arrival waves can be priced as additional transfers rather than leaving the whole group waiting.",
          "Check into the same hotel for three nights. We prepare a rooming plan for single rooms, shared twins or a mixture, subject to the hotel’s actual room availability.",
          "Keep the afternoon free for rest. If timing allows, gather for a short welcome briefing and an agreed group dinner; late arrivals are planned separately.",
        ],
        image: {
          src: `${zhangjiajieImages}wulingyuan-peaks-1600.webp`,
          alt: "Forest-covered sandstone pillars in the Wulingyuan area of Zhangjiajie",
          caption: "Wulingyuan is the proposed overnight base; the hotel is selected for your group.",
        },
      },
      {
        title: "A day among the forest peaks",
        place: "Zhangjiajie National Forest Park · Tianzi Mountain & Yuanjiajie",
        summary:
          "Spend the main touring day high among the sandstone pillars. Follow a planned route through Tianzi Mountain and Yuanjiajie, with shared viewpoints, a lunch break and time to look around.",
        details: [
          "After breakfast, travel to the park with your guide. We agree the entry gate, scenic shuttle connections, cableway or elevator journeys and ticket costs before booking.",
          "Visit Tianzi Mountain and Yuanjiajie’s viewpoints. The final order follows ticket arrangements, operating conditions and the group’s walking pace; the day is not a timed hiking challenge.",
          "Allow for steps, queues and walking between viewpoints. We discuss mobility needs beforehand and plan a suitable alternative for anyone who cannot comfortably join the main route.",
          "Return to the hotel after the park. Keep the evening relaxed, with dinner either arranged in the meal plan or left free as agreed with your organiser.",
        ],
        image: {
          src: `${zhangjiajieImages}tianzi-mountain-panorama-1600.webp`,
          alt: "A broad view of the forest and sandstone pillars at Tianzi Mountain",
          caption: "Tianzi Mountain’s peak landscape; mountain visibility varies with the weather.",
        },
      },
      {
        title: "A gentler path, an evening together",
        place: "Golden Whip Stream → hotel → team dinner",
        summary:
          "Change the pace with a selected stretch of Golden Whip Stream. Return for an unhurried afternoon, then gather for a dinner that belongs to your team.",
        details: [
          "Walk a suitable section of the valley path rather than committing everyone to the full trail. Distance, turning point and rest stops are agreed around the group’s needs and the day’s conditions.",
          "Have lunch, then return to the hotel for personal time. An optional short internal meeting can use part of this afternoon, with the walk shortened if necessary.",
          "For a meeting, your company supplies the agenda and leads the session. We can source a suitable room and quote the seating layout, equipment and refreshments separately.",
          "Come together for the final team dinner. Confirm menus, dietary requirements and seating in advance; speeches or awards can be planned within the venue’s agreed arrangements.",
        ],
        image: {
          src: `${zhangjiajieImages}golden-whip-stream-1600.webp`,
          alt: "Green woodland beside Golden Whip Stream in Zhangjiajie",
          caption: "Golden Whip Stream offers a different perspective from below the peaks.",
        },
      },
      {
        title: "Breakfast, goodbyes, onward journeys",
        place: "Wulingyuan → Zhangjiajie airport or railway station",
        summary:
          "Finish with breakfast and transfers timed around your booked departures. Leave a comfortable margin for luggage, check-out and the journey onward.",
        details: [
          "Check out after breakfast, with departure groups organised from the final flight or train list.",
          "The transfer destination is agreed in your proposal: Zhangjiajie Hehua Airport, Zhangjiajie West Railway Station or another named arrival/departure point.",
          "A late departure may allow free time, but extra touring, late check-out, additional vehicles or an extra night need to be agreed and priced first.",
        ],
        image: {
          src: `${zhangjiajieImages}zhangjiajie-hehua-airport-1600.webp`,
          alt: "Zhangjiajie Hehua Airport with the mountains beyond",
          caption: "Departure transfers follow your confirmed airport or railway station and timing.",
        },
      },
    ],
    stay: {
      title: "Stay together in Wulingyuan",
      body:
        "We propose three nights at one hotel in the Wulingyuan area. For a company group, a workable room block matters as much as the photographs: the right mix of beds, a reliable breakfast arrangement, vehicle access and a useful place to gather.",
      details: [
        "Compare a single-room plan with a twin-sharing plan, or price a mix. Single occupancy changes the per-person cost.",
        "Hotel names, room categories, bed types and the number of rooms are checked for your dates and written into the proposal before confirmation.",
        "A room block on the same floor, connecting rooms, private dining or a meeting room must be requested and confirmed separately.",
      ],
    },
    scope: [
      "Three nights in one Wulingyuan hotel, with breakfast and your chosen single or twin room arrangement.",
      "Private arrival and departure transfers, plus the vehicle schedule and luggage capacity specified for your group.",
      "English-speaking guiding for the sightseeing programme.",
      "Zhangjiajie National Forest Park admission and the exact scenic shuttles, elevator and cableway journeys listed in the written quote.",
      "An agreed meal plan, including a welcome dinner where arrival times allow, touring-day lunches and the final team dinner.",
      "A local point of contact, with on-site coordination set out in your proposal.",
    ],
    options: [
      "A short company-led meeting on Day 3, with room hire, layout, equipment and tea breaks quoted separately.",
      "A private dining room, awards setup, microphone or other agreed upgrades for the final dinner.",
      "A photographer for selected parts of the trip, with usage rights and deliverables agreed in advance.",
      "Additional airport transfers, extra nights, a shorter walking route or other changes to the sample plan.",
    ],
    notIncluded: [
      "Flights or trains to and from Zhangjiajie, unless expressly added to the quote.",
      "Meeting rooms, event equipment, photographers and dinner upgrades unless specifically quoted.",
      "Meals, drinks, room extras and personal expenses beyond the agreed meal and service plan.",
      "Travel insurance, visa arrangements and services not listed in the written quote.",
    ],
    planningNotes: [
      {
        title: "Four calendar days, two main activity days",
        body: "Day 1 and Day 4 are arrival and departure days. This sample is not four full touring days; flight times may require an extra night or a revised route.",
      },
      {
        title: "Built around the people coming",
        body: "Tell us about walking comfort, step-free requirements and any colleagues who prefer a quieter day. Scenic transport does not remove all steps, queues or outdoor walking.",
      },
      {
        title: "A practical plan for changing conditions",
        body: "Mountain weather, visibility, park operations and crowd levels can affect the order of visits. We agree a weather contingency and the treatment of any price difference in your proposal.",
      },
      {
        title: "A proposal your organiser can use",
        body: "Send your date window, headcount, rooming preference and budget. We then check suppliers and provide an itemised proposal, payment schedule and cancellation conditions for approval.",
      },
    ],
    faqs: [
      {
        question: "Who is this Zhangjiajie company trip designed for?",
        answer:
          "This four-day sample is designed around 10–30 colleagues travelling as one private group. It can suit an annual staff trip or an incentive trip for a smaller team. Other headcounts can be reviewed, but may need a different vehicle, staffing or hotel plan.",
      },
      {
        question: "What does the four-day itinerary cover?",
        answer:
          "It proposes arrival in Zhangjiajie, three nights in Wulingyuan, a main forest-park day around Tianzi Mountain and Yuanjiajie, a shorter Golden Whip Stream walk, a final team dinner and departure transfers. Day 1 and Day 4 are travel days. Tianmen Mountain and the Glass Bridge are not part of this sample.",
      },
      {
        question: "Can we include a meeting or awards dinner?",
        answer:
          "Yes, we can check a suitable meeting room for part of Day 3 and consider speeches or awards at the final dinner. Your company leads its own meeting. Venue hire, equipment, refreshments and any event setup are separately confirmed and priced; facilitation or training is not included in this sample.",
      },
      {
        question: "How much does a Zhangjiajie company trip cost?",
        answer:
          "The price is quoted for your dates, headcount and rooming list. Single rooms, twin sharing, guide arrangements, scenic transport, meals and any meeting requirements all affect the total. This sample has no fixed public package price; the written proposal shows the services and payment conditions for your group.",
      },
      {
        question: "Will everyone need to share a room?",
        answer:
          "No. We can price single occupancy, twin sharing or a combination. Tell us the number of each room type needed. The hotel and actual room block must be checked before confirmation, and rooms on one floor cannot be assumed.",
      },
      {
        question: "Is the trip suitable for colleagues with different fitness levels?",
        answer:
          "It can be adapted, but the main park day still involves outdoor walking, steps and possible queues. We need to know any mobility needs before recommending the route. A shorter valley walk or an alternative arrangement can be considered and priced rather than expecting everyone to follow the same pace.",
      },
      {
        question: "Can you arrange vegetarian, halal or allergy-aware meals?",
        answer:
          "Please share dietary requirements when you enquire, including any certification or allergy-related needs. We’ll check suitable restaurants, menus and preparation practices with suppliers before confirming the meal plan.",
      },
      {
        question: "Are flights included, and is the park private?",
        answer:
          "Flights and trains to Zhangjiajie are excluded unless added in writing. Your vehicle and agreed guide service are for your company, but the national park, scenic shuttles and viewpoints are public. Private service does not mean exclusive park access or queue-free entry.",
      },
    ],
    relatedGuides: [
      {
        href: "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/",
        label: "Choosing between Zhangjiajie city and Wulingyuan",
      },
      {
        href: "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/",
        label: "Forest park tickets, entrances and scenic transport",
      },
      {
        href: "/guides/zhangjiajie-older-travellers/",
        label: "Walking, steps and a gentler Zhangjiajie itinerary",
      },
    ],
  },
  {
    slug: "shanghai-suzhou-4-day-company-retreat",
    title: "Shanghai & Suzhou: Time for Your Team",
    seoTitle: "Shanghai & Suzhou Company Retreat | 4 Days | Homeground China",
    description:
      "A sample 4-day Shanghai and Suzhou company retreat for 10–24 people, with three nights in Shanghai, a Suzhou day trip and an optional half-day meeting. Quote on request.",
    eyebrow: "Company trips · Small meetings & retreats",
    lede:
      "Bring everyone to one city, then give them space to see it together. Three nights in Shanghai, a day among Suzhou’s gardens and canals, and time for your own conversations make a short trip feel well spent.",
    duration: "4 days / 3 nights",
    groupSize: "Suggested: 10–24 people",
    base: "Central Shanghai · one hotel for three nights",
    format: "Private company retreat · sample itinerary",
    hero: {
      src: `${shanghaiImages}hero-shanghai-clocktower-1600.webp`,
      alt: "The Bund clock tower and Shanghai’s modern skyline at dusk",
      caption: "One Shanghai base, with a day in Suzhou and time together between the visits.",
    },
    storyTitle: "A city’s energy, a garden’s quieter pace",
    story:
      "Shanghai gives a team plenty to talk about: the river, the changing skyline, and streets where the city’s earlier lives are still visible. Suzhou changes the scale. A doorway frames a garden; water and stone make a smaller world. This sample brings the two places together without moving hotels. It also protects a half-day for your own meeting if you need one, so the company’s purpose and the pleasure of travelling can both have their place.",
    highlights: [
      {
        title: "One hotel, three nights",
        text: "Use central Shanghai as the base, with Suzhou as a day trip. A single hotel keeps check-ins, luggage and the rooming list manageable.",
      },
      {
        title: "A meeting that fits the trip",
        text: "Reserve part of Day 2 for a company-led session, or use the same morning for a relaxed city visit. The programme makes that choice before booking.",
      },
      {
        title: "Shared experiences, free time too",
        text: "A Bund walk, one Suzhou garden and a team dinner give the trip a common thread. Unscheduled time lets colleagues enjoy the city in their own way.",
      },
    ],
    days: [
      {
        title: "Arrive in Shanghai, meet around the table",
        place: "Shanghai airport or railway station → central Shanghai",
        summary:
          "Gather in Shanghai and settle into the hotel that will be your base for all three nights. If arrival times allow, begin with a relaxed welcome dinner.",
        details: [
          "Plan pickups from the named Shanghai airport or railway station using the group’s actual arrival list. Pudong and Hongqiao arrivals are arranged separately where needed.",
          "Check in, unpack and leave the rest of the afternoon open. A first-day sightseeing visit is added only if the arrival schedule makes it comfortable.",
          "Meet for a welcome dinner at an agreed restaurant, with time for introductions and a brief look at the days ahead. Late arrivals may need a separate meal arrangement.",
        ],
        image: {
          src: `${shanghaiImages}arrival-shanghai-dusk-1600.webp`,
          alt: "Shanghai’s riverfront skyline in the evening light",
          caption: "Shanghai is the arrival city and the proposed base for all three nights.",
        },
      },
      {
        title: "Your conversation, then the city",
        place: "Optional internal meeting → the Bund & central Shanghai",
        summary:
          "Use the morning for a half-day internal meeting, or choose a city experience instead. In the afternoon, come together along the Bund and explore the surrounding streets with your guide.",
        details: [
          "For the meeting version, your company sets the agenda and leads the discussion. We check a suitable hotel or nearby meeting room and quote room hire, layout, equipment and refreshments separately.",
          "If you prefer a leisure trip, spend the morning exploring Shanghai at an easy pace, with the route chosen around your team’s interests.",
          "After lunch, follow a guided walk along the Bund and selected central streets, with time to pause, take photographs and understand the riverfront’s contrasting architecture.",
          "Finish with free time or an agreed dinner arrangement. A river cruise, observation deck or other ticketed evening activity can be added to the quote if wanted.",
        ],
        image: {
          src: `${shanghaiImages}shanghai-skyline-1600.webp`,
          alt: "Shanghai Tower and the World Financial Center above Shanghai’s skyline",
          caption: "Shanghai’s skyline provides the setting; ticketed tower visits are optional.",
        },
      },
      {
        title: "Suzhou, at the scale of a garden",
        place: "Shanghai → Suzhou garden & Pingjiang Road → Shanghai",
        summary:
          "Travel to Suzhou for one carefully paced day. Visit a classical garden, share lunch and walk a stretch of Pingjiang Road before returning to Shanghai for the final team dinner.",
        details: [
          "Travel by a private vehicle sized for the group. The proposal names the transport arrangement and allows for traffic, breaks and the return to Shanghai.",
          "Visit the Humble Administrator’s Garden, subject to ticket availability, or agree another suitable garden in advance. Keep the visit focused on one garden rather than fitting several into the day.",
          "After an agreed lunch, explore part of Pingjiang Road’s canal-side streets. Allow personal time within a clear meeting point and departure plan; activities such as a boat ride are included only when listed in the quote.",
          "Return to the same Shanghai hotel. Gather for the final team dinner, with any speeches, recognition or private-room requirements arranged beforehand.",
        ],
        image: {
          src: `${shanghaiImages}suzhou-humble-garden-1600.webp`,
          alt: "A pavilion, pond and covered walkways in Suzhou’s Humble Administrator’s Garden",
          caption: "The proposed Suzhou garden visit; the specific garden is confirmed with your booking.",
        },
      },
      {
        title: "A last morning, then onward",
        place: "Central Shanghai → your named airport or railway station",
        summary:
          "Have breakfast and leave for your onward journey. Transfers follow the final departure list, with free time only where the schedule allows.",
        details: [
          "Coordinate check-out and luggage around the group’s departure waves. Extra transfers are itemised when colleagues leave from different airports or at different times.",
          "Your departure plan names the airport or station for each group, with transfer times planned around their booked journeys.",
          "If some colleagues stay on for business or leisure, we can quote separate extra nights and transfers. These extensions are agreed independently of the company programme.",
        ],
        image: {
          src: `${shanghaiImages}departure-shanghai-1600.webp`,
          alt: "A riverfront platform facing the Shanghai skyline",
          caption: "A quiet Shanghai scene; the departure-day schedule follows your transport bookings.",
        },
      },
    ],
    stay: {
      title: "A Shanghai base chosen for the whole programme",
      body:
        "We start the hotel search in central Shanghai, considering areas such as People’s Square or Jing’an against your arrival points, dining plans and meeting needs. The most useful choice is a hotel that works for the group’s whole schedule, not simply the one closest to a famous view.",
      details: [
        "Three nights in one hotel; Suzhou is a return day trip. No hotel move is planned during the sample programme.",
        "Compare single occupancy and twin sharing before approving the budget. Room categories, bed types, breakfast and the actual room block appear in the proposal.",
        "If a meeting is required, check room capacity, seating layout, privacy, equipment and refreshments as part of the venue selection.",
      ],
    },
    scope: [
      "Three nights in one Shanghai hotel, with breakfast and your chosen single or twin room arrangement.",
      "Arrival and departure transfers for the named airports or stations and the agreed number of pickup waves.",
      "Private group transport for the planned touring, including the return Suzhou day trip.",
      "English-speaking guiding for the sightseeing programme.",
      "Admission to the named Suzhou garden and any other tickets expressly listed in the proposal.",
      "An agreed meal plan covering the welcome dinner where timing permits, touring-day lunches and the final team dinner.",
      "A local point of contact, with on-site coordination set out in your proposal.",
    ],
    options: [
      "A half-day company-led meeting on Day 2, with venue, equipment and refreshments separately priced.",
      "A private dining room, microphone, awards setup or another agreed dinner upgrade.",
      "A river cruise, observation deck, photography or other experience selected for the group.",
      "Additional pickup waves, extra hotel nights, separate departures or post-event leisure extensions.",
    ],
    notIncluded: [
      "Flights or trains to and from Shanghai, unless specifically added to the written quote.",
      "Meeting facilities, technical production, facilitation and interpretation unless separately agreed.",
      "Unlisted meals, drinks, optional activities, room extras and personal expenses.",
      "Travel insurance, visa arrangements, factory or business visits and services outside the agreed programme.",
    ],
    planningNotes: [
      {
        title: "A four-day outline, not four full touring days",
        body: "The first and last days follow your travel arrangements. With three nights and two main programme days, this sample stays in Shanghai and Suzhou; adding another city would need a longer or revised itinerary.",
      },
      {
        title: "Make the meeting useful",
        body: "Tell us the purpose, delegate count, layout, privacy needs and equipment. Your company provides the content and session leadership; specialist facilitation or event production requires a separate brief and confirmed supplier.",
      },
      {
        title: "Keep the Suzhou day realistic",
        body: "The sample uses a private road transfer, one garden and a selected canal-side walk. We review the date, traffic, ticket availability and mobility needs before fixing the schedule.",
      },
      {
        title: "Approve the practical details together",
        body: "The final proposal identifies the hotel, rooming basis, meal plan, transfers, guiding and any meeting costs. Supplier availability, payment dates and cancellation terms are confirmed before you commit.",
      },
    ],
    faqs: [
      {
        question: "Who is this Shanghai and Suzhou company retreat for?",
        answer:
          "This four-day sample is designed around 10–24 colleagues who want shared city experiences, a Suzhou day trip and time together. It can work as a company trip or a small retreat with a half-day internal meeting. Different group sizes need a fresh review of transport, rooms and staffing.",
      },
      {
        question: "Do we stay overnight in Suzhou?",
        answer:
          "No. The sample keeps all three nights at one Shanghai hotel and visits Suzhou by private vehicle on Day 3. The Suzhou programme focuses on one classical garden and a selected stretch of Pingjiang Road before returning to Shanghai.",
      },
      {
        question: "Is a meeting included in the itinerary price?",
        answer:
          "There is no fixed public price for this sample. A half-day meeting is an optional use of the Day 2 morning, replacing the leisure programme in that slot. Venue hire, equipment, tea breaks and any specialist support are separately checked and shown in your quote. Your company supplies the agenda and leads the session.",
      },
      {
        question: "Can you quote single rooms as well as shared twins?",
        answer:
          "Yes. We can compare single occupancy with twin sharing or work with a mixed rooming list. The price depends on the actual number and category of rooms, dates and hotel availability. The final hotel and room block are confirmed in writing; a whole floor or exclusive hotel use is not assumed.",
      },
      {
        question: "Can colleagues arrive at Pudong and Hongqiao separately?",
        answer:
          "Yes, separate transfer arrangements can be planned. Send the arrival and departure airport or station, flight or train number and timing for each person. Additional pickup waves or different arrival points may change the vehicle schedule and total cost.",
      },
      {
        question: "What happens if garden tickets are unavailable or it rains?",
        answer:
          "We check ticket arrangements before confirming the Suzhou programme and agree a suitable alternative if needed. Weather can change outdoor walking plans. The proposal should identify the contingency, any transport changes and how a price difference is handled rather than assuming every alternative costs the same.",
      },
      {
        question: "Can you accommodate dietary requirements and an awards dinner?",
        answer:
          "We can check restaurants, menus and a suitable dinner room for your group. Tell us about vegetarian or halal requirements, allergies, alcohol preferences and any speeches or awards. Supplier suitability, private-room terms and equipment are verified and priced before confirmation.",
      },
      {
        question: "What information is needed for a formal proposal?",
        answer:
          "Send your company name, preferred dates, approximate headcount, single or twin room preference, overall budget and the purpose of the trip. Add any meeting requirements and known arrival plans. We use that brief to check suppliers and prepare a proposal with a total, listed services, payment schedule and cancellation terms.",
      },
    ],
    relatedGuides: [
      {
        href: "/guides/shanghai-where-to-stay-first-trip/",
        label: "Choosing a practical Shanghai hotel area",
      },
      {
        href: "/guides/shanghai-to-suzhou-day-trip/",
        label: "Planning a Shanghai to Suzhou day trip",
      },
      {
        href: "/guides/how-to-read-a-suzhou-garden/",
        label: "How to look at a classical Suzhou garden",
      },
      {
        href: "/guides/shanghai-pudong-or-hongqiao-airport/",
        label: "Pudong or Hongqiao: choosing the right arrival airport",
      },
    ],
  },
];

export function getCorporateTrip(slug: string): CorporateTrip | undefined {
  return corporateTrips.find((trip) => trip.slug === slug);
}
