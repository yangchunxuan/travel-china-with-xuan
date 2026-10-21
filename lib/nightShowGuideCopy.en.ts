import type { NightShowGuideCopy } from "./nightShowGuideCopy.types";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { bodyTourPrice } from "./guideBodyPrices.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { bodyZhangjiajieFourDayPrice, bodyZhangjiajieFourDayValidUntil } from "./guideBodyZhangjiajiePrice.ts";

const forestTour = "zhangjiajie-forest-4-day-private-tour";

export const nightShowGuideEnglish: NightShowGuideCopy = {
  htmlLang: "en",
  homePath: "/",
  skipLink: "Skip to the guide",
  breadcrumbLabel: "Breadcrumb",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Zhangjiajie night shows",
  hero: {
    eyebrow: "Zhangjiajie evening decision guide",
    title: "Zhangjiajie Night Shows: Tianmen Fox Fairy, Charming Xiangxi or Eternal Love?",
    lead:
      "Three big shows, in two different parts of Zhangjiajie, about 40 minutes apart by road. Which one is right depends less on the stage than on where you sleep, what you did that day and how early tomorrow starts.",
    quickLabel: "Quick answer",
    quickTitle: "There is no single best show.",
    quickBody:
      "Sleeping in downtown Zhangjiajie and want an outdoor story? Tianmen Fox Fairy, staged in the Tianmen Mountain canyon. Sleeping in Wulingyuan by the Forest Park? Choose between Charming Xiangxi, a programme of western-Hunan folk music and dance, and Zhangjiajie Eternal Love, Songcheng's large theatre production. If the group is worn out or starts early tomorrow, choose no show. If the hard part is getting back, we can quote a car with our own driver for that night.",
    figureAlt:
      "Illustration of a mountain at night with a glowing gate near its top, a long stair up to it, and the moon.",
    figureCaption:
      "Editorial illustration—not a photograph of any venue.",
    checkedLabel: "Key sources sampled",
    checkedDate: "22 July 2026",
  },
  decisions: [
    {
      label: "Downtown base",
      title: "Look at Fox Fairy first",
      detail: "If it is in season on your date, and the weather and your ride back both work.",
    },
    {
      label: "Wulingyuan base",
      title: "Compare the two nearby shows",
      detail: "Folk variety at Charming Xiangxi, or big-stage theatre at Eternal Love.",
    },
    {
      label: "Early start tomorrow",
      title: "Protect your sleep",
      detail: "A good show can still be the wrong choice for the trip.",
    },
  ],
  comparison: {
    sectionLabel: "One-minute comparison",
    title: "What each show is, and what it costs you in time.",
    intro:
      "Ticket prices and start times are not in this table because they change by date and session. For Fox Fairy and Eternal Love, the booking lines in the show sections and the FAQ below are where you get them for your own evening; for Charming Xiangxi, check the session with the venue for your date, or leave it to our planner.",
    jumpLabel: "Jump to a show",
    rowLabels: {
      format: "What it is",
      base: "Easiest hotel base",
      chooseFor: "Choose it for",
      mainRisk: "What can go wrong",
    },
    shows: [
      {
        name: "Tianmen Fox Fairy",
        format: "Outdoor love story staged in a mountain canyon",
        base: "Downtown Zhangjiajie",
        chooseFor: "The natural setting and one continuous story",
        mainRisk: "Season, rain, cold, a poor view of the subtitle screen and a late ride back",
      },
      {
        name: "Charming Xiangxi",
        format: "Western-Hunan folk music, dance and variety acts",
        base: "Wulingyuan",
        chooseFor: "Short acts, costumes, music and local customs",
        mainRisk: "Tiredness after the park, changing sessions, patchy English",
      },
      {
        name: "Zhangjiajie Eternal Love",
        format: "Large theatre production inside a performance park",
        base: "Wulingyuan",
        chooseFor: "Stage effects and a roof over your head",
        mainRisk: "The park around the show takes longer than the show itself",
      },
    ],
    boundary:
      "Use this as a decision guide, not a timetable. Sessions, programmes, subtitle screens, seat maps, rules for children and wet-weather policies all need checking for your date.",
  },
  need: {
    sectionLabel: "Before you compare tickets",
    title: "First decide whether you want a show at all.",
    intro:
      "Every Zhangjiajie night show is optional. The real question is not whether the ticket is good value, but whether the whole evening improves the trip once you add the day you have just had, dinner, getting in, the crowd on the way out and tomorrow morning.",
    skipTitle: "Skipping all three is often the smart move when",
    skipPoints: [
      "the group has just done a long Forest Park or Tianmen Mountain day;",
      "you change hotels or cross between Wulingyuan and downtown that evening;",
      "parents, small children or anyone with limited mobility need to recover;",
      "tomorrow starts with an early park entry, train or flight;",
      "the weather makes the outdoor show doubtful, or only a late session is left.",
    ],
    conclusion:
      "A good plan keeps “no show” as a real option. The evening should serve the landscape days you came for, not wear them down. And the days are where Zhangjiajie really bites. After 2 May 2025, a holiday peak day, Wulingyuan district publicly apologised for that day's long waits at the park's lifts, cableways and shuttle buses, and one visitor there on 2–3 May counted more than nine hours of queuing over two days, about two of them for the Bailong Elevator (Guangming Online, 4 May 2025; 36Kr, 6 May 2025). If your dates touch a Chinese holiday, settle the daytime first, then the ride back, and only then the ticket.",
  },
  wholeEvening: {
    sectionLabel: "What show rankings leave out",
    title: "Match the show to the whole evening.",
    intro:
      "Your hotel base is only the start. Begin with where the day's sightseeing ends, then where you sleep, then how early the next day begins.",
    columnLabels: {
      setup: "Day ends + where you sleep",
      nextDay: "Next morning",
      judgement: "Realistic call",
    },
    rows: [
      {
        setup: "Forest Park day; sleep in Wulingyuan",
        nextDay: "Another normal park day",
        judgement: "Compare Charming Xiangxi and Eternal Love; skip both if the group is already spent.",
      },
      {
        setup: "Forest Park day; move to downtown",
        nextDay: "Early Tianmen Mountain entry",
        judgement: "Usually no show. Dinner, the hotel move and sleep already fill the evening.",
      },
      {
        setup: "Tianmen Mountain day; sleep downtown",
        nextDay: "Late start or departure",
        judgement: "Look at Tianmen Fox Fairy if the season, weather and ride back work.",
      },
      {
        setup: "Arrival night after a long journey",
        nextDay: "Early park entry",
        judgement: "Eat and rest. A delayed flight or train makes a timed show fragile.",
      },
      {
        setup: "Wulingyuan base with children",
        nextDay: "A lighter day",
        judgement: "Compare the full park time at Eternal Love with Charming Xiangxi's actual session and finish.",
      },
    ],
    insight:
      "This is what a ticket ranking cannot tell you: an excellent show can be a poor choice once the hotel change and the next morning are on the table. When you plan with us, your planner works through this table for your real dates before anything is booked.",
  },
  hotelBase: {
    sectionLabel: "Geography before ratings",
    title: "Wulingyuan or downtown: choose the base for tomorrow's sightseeing.",
    introBeforeLink: "Our main Zhangjiajie guide explains ",
    itineraryLink: "why the two bases are not one district",
    introAfterLink:
      ". Choose the base for the daytime route first; only then compare evening entertainment.",
    downtown: {
      name: "Downtown Zhangjiajie",
      role: "Tianmen Mountain · rail connections · 72 Wonder Tower",
      detail:
        "Tianmen Fox Fairy is the natural big-show candidate here, but being in the same area does not make a full mountain day plus a late outdoor show an easy evening. From 13 October 2026 Tianmen Mountain runs route C only until further notice: up from the mountain gate by the fast cableway to Tianmen Cave, then escalators to the top, and back down the same way (Xinhunan, 10 October 2026).",
    },
    wulingyuan: {
      name: "Wulingyuan",
      role: "National Forest Park · Grand Canyon · nearby cave and lake days",
      detail:
        "Charming Xiangxi and Eternal Love spare you a trip downtown in the evening. How convenient they are still depends on your exact hotel and the finish time.",
    },
    transfer:
      "Hunan's tourism authority puts Zhangjiajie city about 40 minutes by road from Wulingyuan in ordinary traffic. Treat that as a rough guide, not a promise for the ride back after a show, when the whole audience leaves at once. A holiday makes it worse: on 2 May 2025 the roads from the Forest Park's south gate into Wulingyuan town jammed between 19:20 and 20:30, and the last visitors were not cleared until 21:53 (Wulingyuan district media centre via Guangming Online, 4 May 2025). That is exactly when you would be heading to dinner and a show. This is the part we can take off your hands: send us the show, the date and your hotel, and we quote a car with our own driver, who waits at the exit and takes you back, in writing before you pay.",
  },
  shows: {
    sectionLabel: "Three different reasons to go",
    title: "What each show actually offers.",
    intro:
      "Pick the kind of evening you genuinely want, then check only the details that matter for that choice. The checks every show shares are listed further down.",
    bestFitLabel: "Best for",
    thinkTwiceLabel: "Think twice if",
    verifyLabel: "Check before you buy",
    routeViewLabel: "Our view",
    items: [
      {
        id: "tianmen-fox-fairy",
        number: "01",
        name: "Tianmen Fox Fairy",
        format: "Outdoor mountain setting · continuous love story",
        description:
          "A large live-action musical that uses the Tianmen Mountain canyon as its stage and tells a love story between a man and a fox spirit. It runs by season: the 2025 season ended in December and the 2026 season did not open until 13 March. Travelling in winter? Check first that it is running at all. Charming Xiangxi, in Wulingyuan, was performing through the February 2026 Spring Festival.",
        bestFit: [
          "You care more about the real mountain setting than a controlled theatre.",
          "You prefer one romantic story to a string of separate acts.",
          "You sleep downtown and still have energy for a full evening.",
        ],
        thinkTwice: [
          "You sleep in Wulingyuan and have no ride back arranged.",
          "Rain, cold, humidity or a late finish would hit the group hard.",
          "You need English text but do not know where the screen is from your seat.",
        ],
        verify:
          "For seats and the English screen, call the published booking line, +86 744 8956666, and use the questions in the FAQ below. Ask for the seating plan for your actual session, and check the wet-weather rules and covered sections before you choose a category.",
        routeView:
          "Go for the outdoor setting and the story, not because it is automatically “the best” or because Tianmen is in its name.",
      },
      {
        id: "charming-xiangxi",
        number: "02",
        name: "Charming Xiangxi",
        format: "Folk variety · music, dance, costumes and performance skills",
        description:
          "Based in Wulingyuan, Charming Xiangxi strings together western-Hunan folk acts rather than one continuous drama. Local official media reported four sessions a night on 18–20 February 2026, the Spring Festival peak, with the last one pushed back to 22:00: a sign that the timetable stretches with demand on holidays, not that four sessions are normal. On those nights, the late session means a late road back.",
        bestFit: [
          "You sleep in Wulingyuan after a park day.",
          "Shorter separate acts appeal more than one long story.",
          "Folk music, dance, costumes and staged customs are what you want to see.",
        ],
        thinkTwice: [
          "The group is exhausted after a day of walking and mountain lifts.",
          "You dislike folk-variety shows made for tourists.",
          "You need every spoken or sung part translated into English.",
        ],
        verify:
          "Ask which indoor and outdoor parts run that night, and which parts, if any, have English you can read from your seat.",
        routeView:
          "Its biggest advantage is usually location. That still does not make an evening after the park effortless.",
      },
      {
        id: "eternal-love",
        number: "03",
        name: "Zhangjiajie Eternal Love",
        format: "Large theatre production · wider performance park",
        description:
          "Songcheng's show in Wulingyuan retells Zhangjiajie's history and legends with big lighting, sound and stage effects. The main show is staged inside a wider performance park, so the evening you set aside is longer than the headline production.",
        bestFit: [
          "You sleep in Wulingyuan and prefer a conventional theatre.",
          "Big production effects and visual storytelling matter most.",
          "Your family has time for the park around the show as well as the show itself.",
        ],
        thinkTwice: [
          "You dislike theme-park-style cultural entertainment.",
          "You plan to arrive a few minutes before the main show.",
          "You assume an indoor main show makes the whole park weatherproof.",
        ],
        verify:
          "Confirm the park opening time, the main-show session, what the ticket includes, rules for children and access, and what language support there is on the day. Songcheng posts the opening time, sessions and programme on its WeChat account; its enquiry line is +86 744 5550077.",
        routeView:
          "It is the most controlled stage of the three, but the operator itself says projects and performances can change with the weather or conditions on site.",
      },
    ],
  },
  qilou: {
    sectionLabel: "A different kind of evening",
    title: "Is 72 Wonder Tower a fourth show to compare?",
    body:
      "Not really. 72 Wonder Tower (七十二奇楼, also listed as 72 Qilou) is a downtown night attraction of architecture, lights, food, shopping and smaller activities, not a fourth fixed-seat production like the three above.",
    note:
      `That makes it more flexible, but the same questions apply: where is the hotel, how tired is everyone, what is open, and how late will it get? Our Zhangjiajie Forest 4-day fixed-route private tour builds it into your arrival night, standard evening ticket included: our driver takes you there on the way to Wulingyuan, waits while you look around, then takes you to the villa or 4-star hotel where you stay all three nights. An English-speaking guide is with you for the whole Forest Park day and the daytime at Tianmen Mountain. Day 3 ends with a free evening in Wulingyuan and Day 4 is just breakfast and departure, so that is the night Charming Xiangxi or Eternal Love fits most easily, in the same district as your bed (unless a late arrival moves 72 Wonder Tower to that evening). From ${bodyTourPrice(forestTour, 2, "en")} per person for two travellers, or ${bodyTourPrice(forestTour, 6, "en")} each for six, on non-holiday dates.`,
  },
  evening: {
    sectionLabel: "The calculation that matters",
    title: "A one-hour show does not cost only one hour.",
    intro:
      "Write the evening out as a chain before you buy. The hidden time around the performance is where good plans fall apart.",
    steps: [
      "Daytime sightseeing ends",
      "Back to the hotel, or across to the other area",
      "Dinner",
      "Ticket collection and getting in",
      "The show, or the park around it",
      "The crowd on the way out",
      "Back to the hotel",
    ],
    formula: "The real evening + tomorrow's start time = the real decision",
    conclusion:
      "A less striking show can be the better choice because it fits the right base and protects the next day. Sometimes the right answer is no ticket at all. If the hard part is the ride back or crossing between the two areas, let us do it: tell us your hotel, the show and the date, and we quote that evening's car in writing.",
    ctaTitle: "Plan the days first, then the evening",
    ctaBody:
      `Our Zhangjiajie 4-day private tour covers the Forest Park and the Grand Canyon Glass Bridge with an English-speaking guide, Tianmen Mountain, three hotel nights in the city and private transfers from the airport or station and back. On holiday dates your guide plans the park entry time and direction so you go in early, ahead of the busiest hours. Published price from ${bodyZhangjiajieFourDayPrice("two-to-four", "en")} per person for two to four adults, or ${bodyZhangjiajieFourDayPrice("six", "en")} for six, for travel until ${bodyZhangjiajieFourDayValidUntil("en")}. All three nights are in the city, so Tianmen Fox Fairy is the show nearest your hotel, and the evening to consider is Day 3, after the Glass Bridge, with Tianmen Mountain and your departure on Day 4. If Fox Fairy is between seasons on your dates, we tell you before you book. Tell us your Day 4 flight or train: we check that night's session and quote the car in writing before you pay.`,
    ctaAction: "View the 4-day Zhangjiajie private tour",
    ctaNote:
      "Shows are optional extras outside the tour’s base price. Any evening you add gets its own availability, transport and price confirmed in writing before you pay.",
  },
  checklist: {
    sectionLabel: "What changes by date",
    title: "Four things to check before anyone buys a ticket.",
    intro:
      "If we plan your trip, these are not your homework: our planner checks them once the daytime route works.",
    items: [
      {
        number: "01",
        title: "Date and actual session",
        detail:
          "Whether it runs that night, the real start and finish, the ticket-collection deadline, the programme and the change policy.",
      },
      {
        number: "02",
        title: "Hotel and ride back",
        detail:
          "Your exact hotel, not just “Zhangjiajie”, plus the pickup point, a realistic road time and how you get back once the crowd pours out.",
      },
      {
        number: "03",
        title: "Today's effort and tomorrow",
        detail:
          "Walking, hotel changes, dinner and rest tonight; park entry, train or flight time tomorrow.",
      },
      {
        number: "04",
        title: "Language, seat and access",
        detail:
          "Where the subtitle screen is, whether you see the whole stage, weather cover, rules for children, steps, toilets and mobility needs.",
      },
    ],
    handoff:
      "To get started we only need four things: your travel date, your hotel or base, what you are doing that day and the next morning, and any child, mobility or language need. Send them on WhatsApp or by email and we reply within 12 hours. Your guide and driver are our own, there are no shopping stops, and one planner stays with you from the first reply to the last day. For a private tour you pay a 30% deposit by Alipay or VBill and the balance on arrival, with no fees added; for a show-night car alone, the price is quoted in writing before you pay.",
  },
  related: {
    label: "Build the day before the evening",
    title: "The show only makes sense inside the whole route.",
    body:
      "First work out how many full days you have in Zhangjiajie. If it sits between Beijing and Shanghai, check that the ten-day route leaves enough recovery time before you add an evening show.",
    itineraryAction: "See the 2–4 day Zhangjiajie guide",
    routeAction: "Check the Beijing–Zhangjiajie–Shanghai route",
  },
  faq: {
    sectionLabel: "Search questions, answered directly",
    title: "Zhangjiajie night show FAQ",
    items: [
      {
        question: "What is the Zhangjiajie Eternal Love show?",
        answer:
          "Zhangjiajie Eternal Love is Songcheng's large theatre production in Wulingyuan, at 1 Chaoyang Road, retelling the area's history and legends with big lighting, sound and stage effects. The main show sits inside a wider performance park with other activities, so allow more time than the show alone. Songcheng's own show page does not list session times: it sends visitors to its WeChat account for the park opening time, that day's Eternal Love sessions and the programme, and gives an enquiry line, 0744-5550077 inside China or +86 744 5550077 from abroad. It suits travellers who sleep in Wulingyuan and want a conventional indoor theatre.",
      },
      {
        question: "Which Zhangjiajie show is best?",
        answer:
          "There is no universal best. Fox Fairy is the outdoor story, Charming Xiangxi the folk variety, and Eternal Love the big theatre. The right one depends on your hotel base, the length of the whole evening and what you do the next morning.",
      },
      {
        question: "Tianmen Fox Fairy or Charming Xiangxi: which is better?",
        answer:
          "They suit different bases. Tianmen Fox Fairy is outdoors in the Tianmen Mountain canyon near downtown and tells one love story. Charming Xiangxi is in Wulingyuan and is a sequence of folk music and dance acts. Sleep downtown and want the setting: Fox Fairy. Sleep in Wulingyuan after a park day: Charming Xiangxi, or Eternal Love.",
      },
      {
        question: "How can I check the Tianmen Fox Fairy seating plan before buying?",
        answer:
          "The venue booking number published by Yongding District's official media is 0744-8956666 inside China, or +86 744 8956666 from abroad; the notice dates from 2023, so first confirm you have reached the current ticket desk. Give your date and session, then ask: “请发当场座位图，标出英文字幕屏；这个区域能看清英文吗？能选具体排座，还是只选区域？” That asks them to send the seating plan for your session, mark the English subtitle screen, say whether it is readable from your section, and whether you can pick a row and seat or only a zone. Also ask about covered seats, steps to your row and the wet-weather refund rule. Keep the dated reply and plan before you pay. If you get neither a plan nor a clear answer about the screen, and you rely on English, keep the evening optional.",
      },
      {
        question: "Is Tianmen Fox Fairy worth it?",
        answer:
          "It can be, if the canyon setting and the continuous love story are why you are going, and the date, weather and ride back work. It is a weaker choice from a Wulingyuan hotel or before an early start.",
      },
      {
        question: "Does Tianmen Fox Fairy have English subtitles?",
        answer:
          "English subtitle screens are reported, but we could not confirm a current seat map or screen position for the coming sessions. If English matters, ask the booking line, +86 744 8956666, for the dated seating plan with the English screen marked and the view from your section, and ask whether the whole story or only parts are translated. Do not pick a row just because an old review calls it the best.",
      },
      {
        question: "Is Eternal Love indoors?",
        answer:
          "The main show is in a theatre, but the performance park around it has other activities. The operator says projects and performances can be adjusted or cancelled because of the weather or conditions on site.",
      },
      {
        question: "Can I watch a show after Zhangjiajie National Forest Park?",
        answer:
          "Often yes, when both your hotel and the venue are in Wulingyuan. Still count the park exit, dinner, getting in, the show, the crowd and the ride back. After a hard day, rest can be the better choice.",
      },
      {
        question: "What happens if it rains?",
        answer:
          "It depends on the show. Fox Fairy is the most exposed; Charming Xiangxi may include outdoor parts; Eternal Love's wider park can change too. Get the current change and refund terms before you pay.",
      },
      {
        question: "Can someone drive us back to the hotel after the show?",
        answer:
          "Yes. Our own driver can wait at the exit and take you back to your hotel, in Wulingyuan or downtown. Send the show, the date and your hotel on WhatsApp or by email; we reply within 12 hours and confirm the car and its price in writing before you pay. If you are booking one of our Zhangjiajie private tours, tell us the show night when you book and we quote that evening's car together with the rest of the trip.",
      },
    ],
  },
  research: {
    hiddenTitle: "Research method and sources",
    disclosureTitle: "How this guide was checked",
    summary:
      "Official sources for the stable facts; booking details left to be checked for your date.",
    intro:
      "Official sources establish the venues, formats and current operating notices. Session times, subtitle screens, seats, transfers and ticket rules change by date. The seat-contact advice was checked on 9 September 2026; we could not obtain a current seating chart or English-screen layout from the operator. The May 2025 holiday queues and evening congestion come from Guangming Online (reprinting the Wulingyuan district media centre, 4 May 2025) and 36Kr (6 May 2025); the Tianmen Mountain route C notice comes from Xinhunan (10 October 2026).",
    boundary:
      "Homeground does not present this as a first-hand review of all three shows and has not invented guest preferences or a “tested best seat”.",
    sourceNames: [
      "Hunan culture and tourism: Wulingyuan transport guidance",
      "Zhangjiajie/Wulingyuan tourism platform: Tianmen Fox Fairy",
      "Zhangjiajie Municipal Government: 2026 Fox Fairy season opening",
      "Zhangjiajie Municipal Government: 2025 Fox Fairy season conclusion",
      "Wulingyuan District Media Center: Charming Xiangxi 2026 peak scheduling",
      "Songcheng official: Zhangjiajie Eternal Love",
      "Yongding District official media: published Fox Fairy booking contact (2023 notice)",
    ],
  },
  finalCta: {
    sectionLabel: "A route answer, not a ticket ranking",
    title: "Get the Zhangjiajie days right, and the evening falls into place.",
    body:
      "Use WhatsApp or leave your email. A planner looks at how the evening fits your hotel base, your day and the next morning, and replies within 12 hours. For a private tour you pay a 30% deposit by Alipay or VBill and the rest on arrival, with no fees added. We are a licensed agency (L-BJ10587).",
    action: "Talk to a China trip planner",
    note:
      "Your first enquiry is free. We confirm the arrangements, what is included and the price for your dates and group in writing before you book.",
  },
  structuredData: {
    homeName: "Homeground China",
    aboutName: "Zhangjiajie night shows",
    mentions: [
      "Tianmen Fox Fairy",
      "Charming Xiangxi",
      "Zhangjiajie Eternal Love",
      "Wulingyuan",
      "Downtown Zhangjiajie",
    ],
  },
};
