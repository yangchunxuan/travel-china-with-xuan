import type { CorporateLocale, CorporateTrip, CorporateTripSlug } from "./corporateTravelTypes";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { corporateTripsZh } from "./corporateTravel.zh.ts";
// @ts-ignore TS5097: tests run the content adapters directly via Node type stripping.
import { corporateTripsKo } from "./corporateTravel.ko.ts";

export const zhangjiajieImages = "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/";
export const shanghaiImages = "/images/tours/shanghai-suzhou-5-day-private-tour/";

/** English source of the two programmes; the Chinese and Korean files follow the same shape and images. */
export const corporateTrips: CorporateTrip[] = [
  {
    slug: "zhangjiajie-4-day-team-trip",
    title: "Zhangjiajie Company Trip: Four Days Among the Peaks",
    seoTitle: "Zhangjiajie Company Trip | 4 Days, 3 Nights | Homeground China",
    description: "A 4-day Zhangjiajie company trip for 10–30 people: three nights in Wulingyuan, a day among the forest peaks, a valley walk and a team dinner. Planned and quoted for your group.",
    eyebrow: "Company trips · Incentive travel",
    lede: "Three nights in one Wulingyuan hotel, a full day among the sandstone peaks, a gentler walk along Golden Whip Stream and a team dinner to close the trip.",
    duration: "4 days, 3 nights",
    groupSize: "About 10 to 30 people",
    base: "One hotel in Wulingyuan",
    format: "Staff trips and incentives",
    hero: {
      src: `${zhangjiajieImages}wulingyuan-peaks-1600.webp`,
      alt: "Sandstone pillars and green forest in Wulingyuan, Zhangjiajie",
      caption: "Wulingyuan, Zhangjiajie.",
    },
    storyTitle: "A view the whole team shares.",
    story: "Zhangjiajie’s peaks are the kind of sight a group remembers together: everyone stops at the same viewpoint, takes the same photograph and talks about it over dinner. Three nights in one hotel keep the trip easy, and the third day is gentler, so colleagues of every fitness level enjoy it.",
    highlights: [
      { title: "One hotel, three nights", text: "No packing and moving. We choose the Wulingyuan hotel for your rooming list, coach access and budget." },
      { title: "The big day, well planned", text: "Tianzi Mountain and Yuanjiajie with your guide, with the park shuttles, elevator and cable car worked out in advance." },
      { title: "An evening to say thank you", text: "A final team dinner in a private room, with speeches or awards if you want them." },
    ],
    days: [
      {
        title: "Arrive and settle in",
        place: "Zhangjiajie airport or station → Wulingyuan",
        summary: "We meet every arrival and bring the group to the hotel in Wulingyuan. If everyone lands in time, the trip opens with a welcome dinner.",
        details: [
          "Pickups are planned around each flight and train, so no one waits hours for a late arrival.",
          "Single, twin or mixed rooms, all in the same hotel for three nights.",
          "A free afternoon to rest after the journey.",
        ],
        image: { src: `${zhangjiajieImages}wulingyuan-peaks-1600.webp`, alt: "Forest-covered sandstone pillars in the Wulingyuan area of Zhangjiajie", caption: "Wulingyuan, the base for all three nights." },
      },
      {
        title: "A day among the forest peaks",
        place: "Zhangjiajie National Forest Park · Tianzi Mountain & Yuanjiajie",
        summary: "The main day of the trip. Your guide takes the group up among the sandstone pillars of Tianzi Mountain and Yuanjiajie, with lunch in the park and time at the best viewpoints.",
        details: [
          "Park tickets, shuttles, the elevator and the cable car are booked before you arrive.",
          "There are steps and walking between viewpoints. Anyone who prefers a shorter day gets an easier route.",
          "Back at the hotel by late afternoon; dinner together or free, as you choose.",
        ],
        image: { src: `${zhangjiajieImages}tianzi-mountain-panorama-1600.webp`, alt: "A broad view of the forest and sandstone pillars at Tianzi Mountain", caption: "Tianzi Mountain." },
      },
      {
        title: "A valley walk and the team dinner",
        place: "Golden Whip Stream → hotel → team dinner",
        summary: "A gentler morning along Golden Whip Stream, under the peaks you saw from above. The afternoon is free, or used for a short meeting, before the team dinner.",
        details: [
          "We walk a section of the stream path that suits the group, not the whole trail.",
          "If you want a meeting, we book a room with the layout and equipment you need.",
          "The final dinner in a private room, with menus and seating agreed beforehand.",
        ],
        image: { src: `${zhangjiajieImages}golden-whip-stream-1600.webp`, alt: "Green woodland beside Golden Whip Stream in Zhangjiajie", caption: "Golden Whip Stream." },
      },
      {
        title: "Breakfast and onward journeys",
        place: "Wulingyuan → Zhangjiajie airport or station",
        summary: "Breakfast, check-out and transfers timed to each departing flight or train.",
        details: [
          "Departures are grouped by flight and train times.",
          "An extra night or a late check-out can be added to the quote.",
        ],
        image: { src: `${zhangjiajieImages}zhangjiajie-hehua-airport-1600.webp`, alt: "Zhangjiajie Hehua Airport with the mountains beyond", caption: "Zhangjiajie Hehua Airport." },
      },
    ],
    stay: {
      title: "One hotel in Wulingyuan for three nights.",
      body: "We choose the hotel for your rooming list, coach access and budget, with breakfast every morning and a private room for meeting or dining if you need one.",
      details: [
        "Single, twin and mixed rooming priced side by side, so you can compare.",
        "Hotel name, room types and number of rooms confirmed in your proposal.",
        "A meeting room or private dining room on request.",
      ],
    },
    scope: [
      "Three nights in one Wulingyuan hotel with breakfast",
      "Private coach for transfers and touring",
      "A local guide on the touring days",
      "Forest park tickets, shuttles, elevator and cable car",
      "Welcome dinner, lunches on the touring days and the team dinner",
      "One planner on WhatsApp throughout",
    ],
    options: [
      "A meeting room on Day 3, with equipment and tea breaks",
      "Awards setup, microphone and a larger private dining room",
      "A photographer for part of the trip",
      "Extra nights, extra transfers or a shorter walking day",
    ],
    notIncluded: [
      "Flights or trains to and from Zhangjiajie, unless added to the quote",
      "Drinks, room extras and personal spending",
      "Travel insurance and visas",
    ],
    planningNotes: [
      { title: "Two touring days, two travel days", body: "Days 1 and 4 follow your flights and trains. With an early arrival or a late departure we can add more." },
      { title: "Different fitness levels", body: "The park day has steps and outdoor walking. Tell us who prefers an easier day and we plan an alternative for them." },
      { title: "A plan for the weather", body: "Mountain weather changes. We agree a wet-weather plan with you in the proposal." },
    ],
    faqs: [
      { question: "Who is this Zhangjiajie company trip for?", answer: "About 10 to 30 colleagues travelling as one private group, on an annual staff trip or an incentive trip. For other group sizes we adjust the coach, hotel and guides." },
      { question: "What does the four-day plan cover?", answer: "Arrival in Zhangjiajie, three nights in Wulingyuan, a day at Tianzi Mountain and Yuanjiajie, a walk along Golden Whip Stream, a team dinner and departure transfers. Tianmen Mountain and the Glass Bridge can be added on an extra day." },
      { question: "Can we hold a meeting or an awards dinner?", answer: "Yes. We book a meeting room for part of Day 3 and a private room for the final dinner, with speeches or awards. Your company runs the agenda." },
      { question: "How much does a Zhangjiajie company trip cost?", answer: "We quote for your dates, group size and rooming. Single or shared rooms, meals and any meeting change the total, and each option is priced separately in the quote." },
      { question: "Is it suitable for colleagues with different fitness levels?", answer: "Yes, with planning. The park day involves steps and walking, so tell us about anyone who prefers an easier day and we arrange a shorter route or an alternative." },
      { question: "Are flights included, and is the park private?", answer: "Flights and trains are not included unless you ask us to add them. Your coach and guide are for your company only; the national park itself is public." },
    ],
    relatedGuides: [
      { href: "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/", label: "Zhangjiajie city or Wulingyuan: where to stay" },
      { href: "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/", label: "Forest park tickets, entrances and shuttles" },
      { href: "/guides/zhangjiajie-older-travellers/", label: "A gentler Zhangjiajie for less active travellers" },
    ],
  },
  {
    slug: "shanghai-suzhou-4-day-company-retreat",
    title: "Shanghai & Suzhou Company Retreat: Four Days, One Base",
    seoTitle: "Shanghai & Suzhou Company Retreat | 4 Days | Homeground China",
    description: "A 4-day Shanghai and Suzhou company retreat for 10–24 people: three nights in one Shanghai hotel, a Suzhou garden day and an optional half-day meeting. Planned and quoted for your group.",
    eyebrow: "Company trips · Small meetings & retreats",
    lede: "Three nights in one central Shanghai hotel, a morning for your own meeting if you need it, the Bund in the afternoon, and a day among Suzhou’s gardens and canals.",
    duration: "4 days, 3 nights",
    groupSize: "About 10 to 24 people",
    base: "One hotel in central Shanghai",
    format: "Staff trips and team retreats",
    hero: {
      src: `${shanghaiImages}hero-shanghai-clocktower-1600.webp`,
      alt: "The Bund clock tower and Shanghai’s modern skyline at dusk",
      caption: "The Bund, Shanghai.",
    },
    storyTitle: "A city’s energy, a garden’s calm.",
    story: "Shanghai gives a team plenty to see and talk about: the river, the skyline, streets where the old city still shows. Suzhou slows everything down, with gardens, water and stone at a smaller scale. One hotel for three nights means no packing in between, and a half-day for your own meeting fits in without rushing the rest.",
    highlights: [
      { title: "One hotel, three nights", text: "Central Shanghai as the base, Suzhou as a day trip. Check-in once, unpack once." },
      { title: "A meeting that fits the trip", text: "Day 2 morning for your own session, or for the city instead. You choose before booking." },
      { title: "Time together, time free", text: "The Bund, a Suzhou garden and a team dinner, with free time to explore on your own." },
    ],
    days: [
      {
        title: "Arrive in Shanghai",
        place: "Shanghai airport or station → central Shanghai",
        summary: "We meet each arrival at Pudong, Hongqiao or the station and bring everyone to the hotel. If the group lands in time, the evening is a welcome dinner.",
        details: [
          "Pickups planned around each flight and train, from both Shanghai airports if needed.",
          "Same hotel for all three nights, with single, twin or mixed rooms.",
          "Welcome dinner at a restaurant we book for the group.",
        ],
        image: { src: `${shanghaiImages}arrival-shanghai-dusk-1600.webp`, alt: "Shanghai’s riverfront skyline in the evening light", caption: "Shanghai at dusk." },
      },
      {
        title: "Your meeting, then the city",
        place: "Optional meeting → the Bund & central Shanghai",
        summary: "A morning meeting in a room we book, or a relaxed city morning instead. In the afternoon your guide walks the group along the Bund and through the streets behind it.",
        details: [
          "Meeting room with the layout, screen and tea breaks you ask for; your company runs the agenda.",
          "Without a meeting, the morning goes to a part of Shanghai chosen for your team.",
          "Evening free, or a river cruise or rooftop dinner added to the quote.",
        ],
        image: { src: `${shanghaiImages}shanghai-skyline-1600.webp`, alt: "Shanghai Tower and the World Financial Center above Shanghai’s skyline", caption: "Pudong skyline." },
      },
      {
        title: "A day in Suzhou",
        place: "Shanghai → Suzhou garden & Pingjiang Road → Shanghai",
        summary: "A private coach to Suzhou for a classical garden, lunch together and a walk along the canals of Pingjiang Road, then back to Shanghai for the team dinner.",
        details: [
          "The Humble Administrator’s Garden, with tickets booked ahead.",
          "One garden, done well, rather than several in a rush.",
          "Back in Shanghai for the final team dinner, with speeches or awards if you like.",
        ],
        image: { src: `${shanghaiImages}suzhou-humble-garden-1600.webp`, alt: "A pavilion, pond and covered walkways in Suzhou’s Humble Administrator’s Garden", caption: "The Humble Administrator’s Garden, Suzhou." },
      },
      {
        title: "Breakfast and departures",
        place: "Central Shanghai → your airport or station",
        summary: "Breakfast, check-out and transfers timed to each departure.",
        details: [
          "Departures grouped by airport and time.",
          "Colleagues staying on can add nights and their own transfer to the quote.",
        ],
        image: { src: `${shanghaiImages}departure-shanghai-1600.webp`, alt: "A riverfront platform facing the Shanghai skyline", caption: "The Huangpu riverfront." },
      },
    ],
    stay: {
      title: "One central Shanghai hotel for three nights.",
      body: "We look at hotels around People’s Square and Jing’an, close to the airports’ main routes, good restaurants and a meeting room if you need one.",
      details: [
        "Three nights in the same hotel; Suzhou is a day trip.",
        "Single, twin and mixed rooming priced side by side.",
        "Meeting room capacity, layout and equipment checked with the hotel.",
      ],
    },
    scope: [
      "Three nights in one Shanghai hotel with breakfast",
      "Airport and station transfers for every arrival and departure",
      "Private coach for the touring days, including Suzhou",
      "A local guide on the touring days",
      "Suzhou garden tickets",
      "Welcome dinner, lunches on the touring days and the team dinner",
      "One planner on WhatsApp throughout",
    ],
    options: [
      "A half-day meeting room on Day 2, with equipment and tea breaks",
      "Awards setup, microphone and a private dining room",
      "Huangpu river cruise or a rooftop dinner",
      "Extra nights and separate departures",
    ],
    notIncluded: [
      "Flights or trains to and from Shanghai, unless added to the quote",
      "Drinks, room extras and personal spending",
      "Travel insurance and visas",
    ],
    planningNotes: [
      { title: "Two programme days, two travel days", body: "Days 1 and 4 follow your flights. Adding Hangzhou or another city needs at least one more day." },
      { title: "Make the meeting work", body: "Tell us the number of people, the layout and the equipment. Your company runs the content." },
      { title: "A realistic Suzhou day", body: "One garden and one canal street, by private coach, with time to enjoy both." },
    ],
    faqs: [
      { question: "Who is this Shanghai and Suzhou company retreat for?", answer: "About 10 to 24 colleagues who want city time, a Suzhou garden day and time together, as a staff trip or a small retreat with a half-day meeting." },
      { question: "Do we stay overnight in Suzhou?", answer: "No. All three nights are in one Shanghai hotel, and Suzhou is a day trip by private coach on Day 3." },
      { question: "Is the meeting room included in the price?", answer: "The meeting is an option for the Day 2 morning. We quote the room, equipment and tea breaks separately, and your company runs the agenda." },
      { question: "Can you quote single rooms and twin sharing?", answer: "Yes. We price single, twin and mixed rooming side by side so you can compare before you confirm." },
      { question: "Can colleagues arrive at Pudong and Hongqiao?", answer: "Yes. Send each person’s flight or train and we plan pickups from both airports and the stations." },
      { question: "What if it rains on the Suzhou day?", answer: "The gardens are lovely in the rain and have covered walkways. If the weather is bad, we agree an indoor alternative with you." },
    ],
    relatedGuides: [
      { href: "/guides/shanghai-where-to-stay-first-trip/", label: "Where to stay in Shanghai" },
      { href: "/guides/shanghai-to-suzhou-day-trip/", label: "A Shanghai to Suzhou day trip" },
      { href: "/guides/how-to-read-a-suzhou-garden/", label: "How to look at a Suzhou garden" },
      { href: "/guides/shanghai-pudong-or-hongqiao-airport/", label: "Pudong or Hongqiao: which airport" },
    ],
  },
];

const tripsByLocale: Record<CorporateLocale, CorporateTrip[]> = { en: corporateTrips, zh: corporateTripsZh, ko: corporateTripsKo };

export function getCorporateTrips(locale: CorporateLocale = "en"): CorporateTrip[] {
  return tripsByLocale[locale];
}

export function getCorporateTrip(slug: string, locale: CorporateLocale = "en"): CorporateTrip | undefined {
  return tripsByLocale[locale].find((trip) => trip.slug === slug);
}

export function isCorporateTripSlug(slug: string): slug is CorporateTripSlug {
  return corporateTrips.some((trip) => trip.slug === slug);
}
