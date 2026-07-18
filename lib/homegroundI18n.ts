export const homegroundLocales = ["en", "zh", "ko"] as const;

export type HomegroundLocale = (typeof homegroundLocales)[number];

export interface LocalizedOption {
  id: string;
  label: string;
  description: string;
}

export interface RouteQuestionCopy {
  eyebrow: string;
  title: string;
  help: string;
}

export interface HomegroundCopy {
  htmlLang: string;
  path: string;
  languageName: string;
  languageShort: string;
  metadata: {
    title: string;
    description: string;
    openGraphTitle: string;
  };
  skipLink: string;
  brandTagline: string;
  navigation: {
    primaryLabel: string;
    mobileLabel: string;
    footerLabel: string;
    languageLabel: string;
    languageChangeWarning: string;
    homeLabel: string;
    planning: string;
    studio: string;
    faq: string;
    visa: string;
    openMenu: string;
    closeMenu: string;
    plannerCta: {
      new: string;
      inProgress: string;
      result: string;
      disabled: string;
      validationError: string;
      submitting: string;
      success: string;
      failed: string;
      uncertain: string;
    };
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    trustLabel: string;
    trust: readonly string[];
    imageAlt: string;
    caption: string;
  };
  proof: {
    eyebrow: string;
    title: string;
    intro: string;
    imageAlt: string;
    imageBadge: string;
    cardLabel: string;
    cardTitle: string;
    cardTag: string;
    extract: readonly {
      term: string;
      detail: string;
    }[];
    pointLabel: string;
    point: string;
    handledLabel: string;
    handledTitle: string;
    handled: readonly {
      title: string;
      detail: string;
    }[];
  };
  studio: {
    eyebrow: string;
    title: string;
    intro: string;
    roles: readonly {
      title: string;
      detail: string;
    }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    intro: string;
    items: readonly {
      question: string;
      answer: string;
    }[];
  };
  finalCta: {
    resultLabel: string;
    inProgressLabel: string;
    newLabel: string;
    resultTitle: string;
    inProgressTitle: string;
    newTitle: string;
  };
  handoff: {
    eyebrow: string;
    title: string;
    body: string;
    boundary: string;
    contactLegend: string;
    emailOption: string;
    emailOptionDescription: string;
    whatsappOption: string;
    whatsappOptionDescription: string;
    requiredText: string;
    emailLabel: string;
    emailHint: string;
    whatsappLaunchHint: string;
    whatsappPrivacyNote: string;
    whatsappOpen: string;
    whatsappAttemptTitle: string;
    whatsappAttemptBody: string;
    whatsappOpenAgain: string;
    whatsappUseEmail: string;
    whatsappMessageIntro: string;
    whatsappMessageRouteLabel: string;
    whatsappMessagePartyLabel: string;
    whatsappMessageStyleLabel: string;
    whatsappMessageLengthLabel: string;
    whatsappMessagePaceLabel: string;
    whatsappMessageClosing: string;
    noteLabel: string;
    noteHint: string;
    noteAttached: string;
    noteCount: (current: number, maximum: number) => string;
    nextTitle: string;
    nextBody: string;
    privacyBody: string;
    privacyLink: string;
    serviceBoundary: string;
    submit: string;
    submitting: string;
    errorSummary: string;
    contactError: string;
    emailError: string;
    noteTooLong: string;
    noteInvalid: string;
    formVersionUnsupported: string;
    privacyNoticeUnsupported: string;
    successTitle: string;
    successBody: string;
    successReference: (publicReference: string) => string;
    successReplyEmail: (maskedEmail: string, replySla?: string) => string;
    backToRoute: string;
    previousRequestNotice: (publicReference: string) => string;
    routeEditingNotice: string;
    failureTitle: string;
    technicalError: string;
    offlineError: string;
    notPersisted: string;
    requestTooLarge: string;
    rateLimited: (retryAfter: string) => string;
    routeMismatch: string;
    unsupportedRuleVersion: string;
    idempotencyConflict: string;
    retry: string;
    emailFallback: string;
    fallbackEmailSubject: (routeReference: string) => string;
    fallbackEmailBody: (routeReference: string) => string;
    fallbackFailureBody: (routeReference: string) => string;
    disabledTitle: string;
    disabledBody: (routeReference: string) => string;
    brandEmailUnavailable: string;
    uncertainTitle: string;
    uncertainBody: string;
    uncertainLeaveWarning: string;
    uncertainRetry: string;
  };
  footer: {
    studioLabel: string;
    privacy: string;
    copyright: (year: number) => string;
  };
  schemaDescription: string;
  finder: {
    hiddenTitle: string;
    introEyebrow: string;
    introTitle: string;
    introBody: string;
    questions: {
      party: RouteQuestionCopy;
      travelStyle: RouteQuestionCopy;
      nights: RouteQuestionCopy;
      pace: RouteQuestionCopy;
    };
    options: {
      party: readonly LocalizedOption[];
      travelStyle: readonly LocalizedOption[];
      nights: readonly LocalizedOption[];
      pace: readonly LocalizedOption[];
    };
    progress: (current: number, total: number) => string;
    cancelEdits: string;
    back: string;
    showRoute: string;
    continue: string;
    answerRequired: string;
    resultKicker: string;
    routeAriaLabel: string;
    nights: (count: number) => string;
    totalNights: (count: number) => string;
    moves: (count: number) => string;
    transferNote: string;
    whyTitle: string;
    omittedTitle: string;
    assumptionsTitle: string;
    scopeNote: string;
    answersTitle: string;
    editAll: string;
    answerLabels: {
      party: string;
      travelStyle: string;
      nights: string;
      pace: string;
    };
    change: string;
    changeAria: (label: string) => string;
    contactEyebrow: string;
    contactTitle: string;
    contactBody: string;
    contactButton: string;
    contactNote: string;
    restart: string;
  };
  route: {
    cityNames: Record<string, string>;
    partyPhrases: Record<string, string>;
    familyLabels: Record<string, string>;
    lowerMoveTitle: (family: string) => string;
    lowerMoveSummary: (nights: number) => string;
    lowerMoveReason: (bases: number, moves: number) => string;
    secondReason: (
      party: string,
      shortestStay: number,
      pace: string,
    ) => string;
    lowerMoveTradeoff: (cities: readonly string[]) => string;
    commonAssumptions: readonly [string, string];
    partyAssumptions: Record<string, string>;
  };
}

export interface LocalizedRouteVariantText {
  title: string;
  summary: string;
  routeReason: string;
  tradeoff: string;
}

const cityNamesEn = {
  Beijing: "Beijing",
  "Xi’an": "Xi’an",
  Chengdu: "Chengdu",
  Hangzhou: "Hangzhou",
  Shanghai: "Shanghai",
  Zhangjiajie: "Zhangjiajie",
  Fenghuang: "Fenghuang",
  Chongqing: "Chongqing",
  Jingdezhen: "Jingdezhen",
};

const cityNamesZh = {
  Beijing: "北京",
  "Xi’an": "西安",
  Chengdu: "成都",
  Hangzhou: "杭州",
  Shanghai: "上海",
  Zhangjiajie: "张家界",
  Fenghuang: "凤凰古城",
  Chongqing: "重庆",
  Jingdezhen: "景德镇",
};

const cityNamesKo = {
  Beijing: "베이징",
  "Xi’an": "시안",
  Chengdu: "청두",
  Hangzhou: "항저우",
  Shanghai: "상하이",
  Zhangjiajie: "장자제",
  Fenghuang: "펑황고성",
  Chongqing: "충칭",
  Jingdezhen: "징더전",
};

export const homegroundCopy: Record<HomegroundLocale, HomegroundCopy> = {
  en: {
    htmlLang: "en",
    path: "/",
    languageName: "English",
    languageShort: "EN",
    metadata: {
      title: "Plan a China trip that fits you",
      description:
        "Answer four questions to see a sensible China starting route, including cities, nights and the trade-offs behind it. Personal planner review comes after the result.",
      openGraphTitle: "Homeground China — Plan a China trip that fits you",
    },
    skipLink: "Skip to main content",
    brandTagline: "Independent China trip planning",
    navigation: {
      primaryLabel: "Primary navigation",
      mobileLabel: "Mobile navigation",
      footerLabel: "Footer navigation",
      languageLabel: "Choose language",
      languageChangeWarning:
        "Switching languages will clear the contact details you entered. Continue?",
      homeLabel: "Homeground China home",
      planning: "How we plan",
      studio: "Studio",
      faq: "FAQ",
      visa: "Visa guide",
      openMenu: "Open navigation",
      closeMenu: "Close navigation",
      plannerCta: {
        new: "Find my starting route",
        inProgress: "Continue my route",
        result: "Ask a planner to review my route",
        disabled: "Contact Homeground",
        validationError: "Finish my request",
        submitting: "Sending request…",
        success: "View request confirmation",
        failed: "Return to my request",
        uncertain: "Check request status",
      },
    },
    hero: {
      eyebrow: "Independent China trips, planned around real people",
      title: "A China trip that actually fits you.",
      lead:
        "Answer four questions to get a sensible China starting route. A person checks the real travel details and suitable local services only after you choose to get in touch.",
      trustLabel: "What to expect",
      trust: [
        "No budget question",
        "No contact details before your result",
        "Group and pace can change the route structure",
      ],
      imageAlt:
        "The Forbidden City Corner Tower in Beijing reflected in its moat",
      caption: "Beijing · The Forbidden City Corner Tower",
    },
    proof: {
      eyebrow: "What personal planning changes",
      title: "A route is more than a list of cities.",
      intro:
        "The first result gives you the shape. Human planning turns it into a journey that works on the ground.",
      imageAlt: "Small boats crossing a misty lake in Hangzhou",
      imageBadge: "Illustrative planning extract · Hangzhou",
      cardLabel: "What gets added after the route",
      cardTitle: "A transfer day that still feels like part of the trip",
      cardTag: "Example format, not a fixed package",
      extract: [
        {
          term: "Move",
          detail:
            "Beijing → Hangzhou, with one hotel change and protected buffer time.",
        },
        {
          term: "Base",
          detail:
            "A neighbourhood chosen around evening access, walking load and the next departure.",
        },
        {
          term: "Energy",
          detail:
            "No headline attraction is forced onto the arrival evening.",
        },
        {
          term: "Still to confirm",
          detail:
            "Train time, room setup, luggage support and your actual arrival point.",
        },
      ],
      pointLabel: "The point:",
      point:
        "the route finder chooses the shape. Personal planning resolves the decisions that make that shape workable.",
      handledLabel: "What the studio works through",
      handledTitle: "The decisions behind the route",
      handled: [
        {
          title: "Transport logic",
          detail:
            "Flights, trains, transfer time and a realistic arrival day.",
        },
        {
          title: "Where to base yourself",
          detail:
            "Neighbourhood, room needs and the walking each location creates.",
        },
        {
          title: "Days that fit together",
          detail:
            "Tickets, guide time, opening patterns and room to recover.",
        },
        {
          title: "A written scope",
          detail:
            "What is planned, who delivers it and what remains outside the arrangement.",
        },
      ],
    },
    studio: {
      eyebrow: "The studio",
      title: "One planning thread, clear handoffs.",
      intro:
        "Homeground is a coordinated China trip-planning studio. One planning thread holds the route and written brief; suitable local services are checked only after the real travel details are clear.",
      roles: [
        {
          title: "One planner owns the brief",
          detail:
            "Your priorities and open questions stay in one place instead of being restarted at every handoff.",
        },
        {
          title: "Specialists join where useful",
          detail:
            "Team members and local partners enter for the cities and services their knowledge actually covers.",
        },
        {
          title: "Responsibility stays explicit",
          detail:
            "Before confirmation, the written scope should show who plans, who delivers and what remains outside it.",
        },
      ],
    },
    faq: {
      eyebrow: "What to know next",
      title: "The questions that change the decision.",
      intro: "Everything else can wait until your route has a useful shape.",
      items: [
        {
          question: "Is this a group tour?",
          answer:
            "No fixed group package is required. We plan for solo travellers, couples, families, friends and private groups, then shape the route around that party.",
        },
        {
          question: "What happens after I request a planner review?",
          answer:
            "A planner checks the starting route against your dates, arrival and departure points, walking needs and non-negotiables. Detailed planning and a quote come only after that deeper conversation.",
        },
        {
          question: "Who actually delivers the trip?",
          answer:
            "Homeground shapes the journey, then checks suitable local delivery after the real details are clear. Before anything is confirmed, the service scope and delivery partner should be clear in writing.",
        },
        {
          question:
            "Can you plan for children, parents or limited mobility?",
          answer:
            "Yes. Walking distance, stairs, early starts, room setup, food needs and recovery time are planning inputs—not small notes added at the end.",
        },
        {
          question: "What if flights or a few cities are already booked?",
          answer:
            "Keep them. The starting route is a draft, and a planner can rebuild it around fixed airports, dates or must-visit places.",
        },
      ],
    },
    finalCta: {
      resultLabel: "Your route is ready for a human review",
      inProgressLabel: "Your answers are saved as you go",
      newLabel: "Your starting point is four answers away",
      resultTitle: "Ready to turn this starting route into a real trip?",
      inProgressTitle: "Finish the remaining questions to see your route.",
      newTitle: "Find the shape of your China trip first.",
    },
    handoff: {
      eyebrow: "Human planning",
      title: "How would you like to continue?",
      body:
        "Your starting route and four answers are ready. Choose one way to contact us—you won’t need to explain them again.",
      boundary: "This is an enquiry, not a booking.",
      contactLegend: "Choose Email or WhatsApp",
      emailOption: "Email",
      emailOptionDescription:
        "Send your route and receive a human reply by email.",
      whatsappOption: "WhatsApp",
      whatsappOptionDescription:
        "Open WhatsApp with your route summary ready to send.",
      requiredText: "(required)",
      emailLabel: "Your email",
      emailHint: "Only for replying to this enquiry.",
      whatsappLaunchHint:
        "WhatsApp will open with your route summary. Tap Send there to start the conversation.",
      whatsappPrivacyNote:
        "Your route summary is passed to WhatsApp to prepare the message. Homeground receives it only after you tap Send.",
      whatsappOpen: "Continue in WhatsApp",
      whatsappAttemptTitle: "We tried to open WhatsApp.",
      whatsappAttemptBody:
        "We can’t confirm whether it opened or whether your message was sent. If the conversation did not start, open WhatsApp again and tap Send.",
      whatsappOpenAgain: "Open WhatsApp again",
      whatsappUseEmail: "Use email instead",
      whatsappMessageIntro:
        "Hi Homeground, I’d like help planning this China trip.",
      whatsappMessageRouteLabel: "Starting route",
      whatsappMessagePartyLabel: "Travellers",
      whatsappMessageStyleLabel: "Travel style",
      whatsappMessageLengthLabel: "Length",
      whatsappMessagePaceLabel: "Pace",
      whatsappMessageClosing: "What information do you need next?",
      noteLabel: "Anything this route should respect? (optional)",
      noteHint:
        "Fixed places, flights already booked, places you have visited, walking needs, or anything else. Please do not include medical records.",
      noteAttached:
        "This note will be attached for planner review. It has not changed the starting route.",
      noteCount: (current, maximum) =>
        `${current} of ${maximum} characters`,
      nextTitle: "What happens next",
      nextBody:
        "A planner will confirm dates, arrival and departure points, and anything that cannot change before discussing details or price.",
      privacyBody:
        "By sending this request, you acknowledge that Homeground may use these details to reply to this enquiry. We will not use them for marketing without separate permission.",
      privacyLink: "Read our Privacy Notice",
      serviceBoundary: "Nothing has been booked.",
      submit: "Send my route",
      submitting: "Sending your request…",
      errorSummary: "Check the details below.",
      contactError: "Choose Email or WhatsApp.",
      emailError: "Enter a valid email address.",
      noteTooLong: "Keep this note to 2,000 characters or fewer.",
      noteInvalid:
        "Remove unsupported control characters from the optional note.",
      formVersionUnsupported:
        "This request form is out of date. Refresh the page before trying again.",
      privacyNoticeUnsupported:
        "The Privacy Notice for this form is no longer current. Refresh the page before trying again.",
      successTitle: "Your route is saved.",
      successBody:
        "We’ve saved your route and four answers for a human review.",
      successReference: (publicReference) =>
        `Support reference: ${publicReference}`,
      successReplyEmail: (maskedEmail, replySla) =>
        `We’ll reply to ${maskedEmail}${replySla ? ` within ${replySla}` : ""}. Nothing has been booked.`,
      backToRoute: "Back to my route",
      previousRequestNotice: (publicReference) =>
        `Your earlier request ${publicReference} was sent with the previous route. These changes have not been sent.`,
      routeEditingNotice:
        "Finish or cancel your route changes before sending this request. Your contact details and note are still here.",
      failureTitle: "We couldn’t send your request.",
      technicalError:
        "We could not process this request. Your details are still here. Try again.",
      offlineError:
        "You appear to be offline, so this request did not leave your browser.",
      notPersisted:
        "The service confirmed that it did not save this request. Your details are still here.",
      requestTooLarge:
        "This request is too long to send. Shorten the optional note and try again.",
      rateLimited: (retryAfter) =>
        `Too many requests have been sent. Try again after ${retryAfter}.`,
      routeMismatch:
        "This route has been updated. Review the refreshed route, then send your request again.",
      unsupportedRuleVersion:
        "This route was created with an older rule version. Refresh it, review the updated route and send again.",
      idempotencyConflict:
        "This request changed while it was being sent. Review the details and submit it again.",
      retry: "Try again",
      emailFallback: "Email Homeground",
      fallbackEmailSubject: (routeReference) =>
        `[Homeground][Fallback] Route request · ${routeReference}`,
      fallbackEmailBody: (routeReference) =>
        `Hello Homeground,\n\nI’d like a human review of route ${routeReference}.\n\nPlease tell me what trip details you need next.\n`,
      fallbackFailureBody: (routeReference) =>
        `The request was not saved. If you use the verified brand email, include route code ${routeReference}.`,
      disabledTitle: "Planner requests are temporarily unavailable.",
      disabledBody: (routeReference) =>
        `The secure request service is not configured for this site build. Route code: ${routeReference}.`,
      brandEmailUnavailable:
        "A verified Homeground email is not configured either, so there is no working fallback on this page yet.",
      uncertainTitle:
        "We couldn’t confirm whether your request arrived.",
      uncertainBody:
        "Your details are still here. Try again; we’ll use the same request key so it cannot create a duplicate.",
      uncertainLeaveWarning:
        "Retry before leaving this page. If you leave, this browser may no longer be able to check the request.",
      uncertainRetry: "Check and try again",
    },
    footer: {
      studioLabel: "China trip studio",
      privacy: "Privacy",
      copyright: (year) =>
        `© ${year} Homeground China. Tailored journeys, planned with context.`,
    },
    schemaDescription:
      "A China trip-planning studio creating tailored starting routes and manually checking suitable local services after travel details are clear.",
    finder: {
      hiddenTitle: "Find a sensible starting route",
      introEyebrow: "Start with you, not a map",
      introTitle: "Find a sensible starting route",
      introBody:
        "Answer four questions and see a useful first route before deciding whether you want personal planning.",
      questions: {
        party: {
          eyebrow: "Plan for the people",
          title: "Who are you travelling with?",
          help: "Party, ages and mobility can change the route.",
        },
        travelStyle: {
          eyebrow: "Start with the feeling",
          title: "What kind of China are you hoping to experience?",
          help:
            "You do not need to know the city names. Choose the closest feeling.",
        },
        nights: {
          eyebrow: "Protect the time you have",
          title: "How many nights do you have in China?",
          help:
            "Choose the closest total for now. The result will allocate that reference total, and a planner can adjust exact dates later.",
        },
        pace: {
          eyebrow: "Choose the daily rhythm",
          title: "How should most days feel?",
          help:
            "This is about energy, not ambition. A slower route can still include remarkable places.",
        },
      },
      options: {
        party: [
          {
            id: "couple",
            label: "Two adults",
            description: "A trip for a couple or two travelling companions.",
          },
          {
            id: "family",
            label: "Family with children",
            description: "A route that leaves room for younger travellers.",
          },
          {
            id: "parents",
            label: "Parents or older travellers",
            description: "Comfort, walking and recovery time matter.",
          },
          {
            id: "friends",
            label: "Friends",
            description:
              "Shared experiences with some room for different interests.",
          },
          {
            id: "solo",
            label: "Solo",
            description: "A clear route for one independent traveller.",
          },
        ],
        travelStyle: [
          {
            id: "classic",
            label: "China’s essential first chapter",
            description:
              "Famous history, major landmarks and a clear first-time route.",
          },
          {
            id: "landscape",
            label: "Mountains and dramatic landscapes",
            description:
              "Big landscapes, quieter mornings and less time in major cities.",
          },
          {
            id: "food",
            label: "Food and city energy",
            description:
              "Neighbourhoods, night views and the kind of meals worth travelling for.",
          },
          {
            id: "slow",
            label: "Slower, softer China",
            description: "Lakes, gardens, local craft and fewer hotel changes.",
          },
          {
            id: "unsure",
            label: "I honestly don’t know yet",
            description:
              "Use my time, travel party and preferred pace to narrow it down.",
          },
        ],
        nights: [
          {
            id: "7",
            label: "7 nights",
            description: "One focused region or two well-connected bases.",
          },
          {
            id: "10",
            label: "10 nights",
            description:
              "Enough time for a clear route with two or three bases.",
          },
          {
            id: "14",
            label: "14 nights",
            description:
              "A broader first journey with meaningful stays in each city.",
          },
          {
            id: "18",
            label: "18 nights",
            description:
              "More contrast, with room to slow down between chapters.",
          },
        ],
        pace: [
          {
            id: "gentle",
            label: "Gentle",
            description:
              "More breathing room, fewer early starts and lighter days.",
          },
          {
            id: "balanced",
            label: "Balanced",
            description:
              "One main experience, with unplanned time around it.",
          },
          {
            id: "full",
            label: "Full",
            description:
              "I am comfortable fitting more into most days.",
          },
        ],
      },
      progress: (current, total) => `Question ${current} of ${total}`,
      cancelEdits: "Cancel edits",
      back: "Back",
      showRoute: "Show my starting route",
      continue: "Continue",
      answerRequired: "Choose one answer to continue.",
      resultKicker: "Your starting route",
      routeAriaLabel: "Suggested route, in order",
      nights: (count) => `${count} ${count === 1 ? "night" : "nights"}`,
      totalNights: (count) => `${count} nights total`,
      moves: (count) =>
        `${count} between-city ${count === 1 ? "move" : "moves"} in this draft`,
      transferNote: "Arrival and departure transfers are not included.",
      whyTitle: "Why this fits your answers",
      omittedTitle: "What this route leaves out",
      assumptionsTitle: "Current assumptions",
      scopeNote:
        "This is a starting allocation, not a final itinerary. Exact transport, hotel choices, day-by-day timing, tickets and pricing have not been added yet.",
      answersTitle: "Your answers",
      editAll: "Edit all",
      answerLabels: {
        party: "Travelling party",
        travelStyle: "Trip style",
        nights: "Total nights",
        pace: "Daily pace",
      },
      change: "Change",
      changeAria: (label) => `Change ${label.toLowerCase()}`,
      contactEyebrow: "Details come next",
      contactTitle: "Want the version built around your group?",
      contactBody:
        "Add anything already fixed, then choose how you would like us to reply with this result prepared. A planner can review it against your dates, comfort needs and priorities before any booking conversation.",
      contactButton: "Choose a contact option",
      contactNote:
        "Your route is prepared for the contact option you choose. It is not sent until you send it.",
      restart: "Start again",
    },
    route: {
      cityNames: cityNamesEn,
      partyPhrases: {
        couple: "two adults",
        family: "a family with children",
        parents: "parents or older travellers",
        friends: "friends travelling together",
        solo: "a solo traveller",
      },
      familyLabels: {
        classic: "first-time classic",
        landscape: "landscape-led",
        food: "food and city",
        slow: "slower eastern",
      },
      lowerMoveTitle: (family) =>
        `A ${family} route with fewer hotel changes`,
      lowerMoveSummary: (nights) =>
        `${nights === 18 ? "An" : "A"} ${nights}-night starting shape with longer stays and fewer changes of base.`,
      lowerMoveReason: (bases, moves) =>
        `Your group and preferred rhythm point to ${bases} bases and ${moves} between-city ${moves === 1 ? "move" : "moves"}, rather than the broader version of this route.`,
      secondReason: (party, shortestStay, pace) =>
        `For ${party}, every base has at least ${shortestStay} nights; the day-by-day plan would still need to be tuned to your ${pace.toLowerCase()} pace.`,
      lowerMoveTradeoff: (cities) =>
        `${cities.join(" and ")} ${cities.length === 1 ? "is" : "are"} left out to reduce hotel changes. A planner can revisit that choice once your airports and mobility needs are known.`,
      commonAssumptions: [
        "Exact dates, arrival and departure airports, seasonal conditions and transport availability have not been checked.",
        "Budget and hotel standard have not been used for this starting route.",
      ],
      partyAssumptions: {
        couple:
          "Hotel level, room setup and any mobility or dietary needs are not yet known.",
        family:
          "Children’s ages, daily routines and walking tolerance are not yet known.",
        parents:
          "Walking tolerance, stairs, mobility needs and rest requirements are not yet known.",
        friends:
          "Room setup, budget split and whether the group wants independent time are not yet known.",
        solo:
          "Hotel level, solo-transfer comfort and preferred support level are not yet known.",
      },
    },
  },
  zh: {
    htmlLang: "zh-Hans",
    path: "/zh/",
    languageName: "简体中文",
    languageShort: "中文",
    metadata: {
      title: "找到真正适合你的中国旅行路线",
      description:
        "回答四个问题，先查看包含城市、住宿晚数与路线取舍的中国旅行初步方案，再决定是否请旅行规划师进一步调整。",
      openGraphTitle: "Homeground China｜找到适合你的中国旅行路线",
    },
    skipLink: "跳到主要内容",
    brandTagline: "独立中国旅行规划",
    navigation: {
      primaryLabel: "主导航",
      mobileLabel: "移动端导航",
      footerLabel: "页脚导航",
      languageLabel: "选择语言",
      languageChangeWarning:
        "切换语言会清空你已填写的联系方式，是否继续？",
      homeLabel: "Homeground China 首页",
      planning: "我们如何规划",
      studio: "工作室",
      faq: "常见问题",
      visa: "免签指南",
      openMenu: "打开导航",
      closeMenu: "关闭导航",
      plannerCta: {
        new: "找到我的初步路线",
        inProgress: "继续选择路线",
        result: "请规划师复核这条路线",
        disabled: "联系 Homeground",
        validationError: "完成咨询信息",
        submitting: "正在发送…",
        success: "查看咨询确认",
        failed: "返回咨询",
        uncertain: "核对发送状态",
      },
    },
    hero: {
      eyebrow: "为真实同行者规划独立中国旅行",
      title: "真正适合你的中国之旅。",
      lead:
        "回答四个问题，先得到一条包含城市、住宿晚数和明确取舍的初步路线。只有在你选择联系后，我们才会人工核对真实条件和合适的当地服务。",
      trustLabel: "你可以放心",
      trust: [
        "暂时不问预算",
        "看到结果前无需留下联系方式",
        "同行者和旅行节奏会真正改变路线结构",
      ],
      imageAlt: "北京故宫角楼倒映在护城河中",
      caption: "北京 · 故宫角楼",
    },
    proof: {
      eyebrow: "旅行规划师会补上什么",
      title: "一条路线，不只是几个城市的排列。",
      intro:
        "初步结果先给出旅行的骨架；旅行规划师再把它细化成一段真正可执行的行程。",
      imageAlt: "小船驶过杭州薄雾中的湖面",
      imageBadge: "规划示例节选 · 杭州",
      cardLabel: "得到路线之后，我们会补上什么",
      cardTitle: "让转场日也成为旅行的一部分",
      cardTag: "仅展示规划方式，并非固定产品",
      extract: [
        {
          term: "转场",
          detail: "北京 → 杭州，只换一次酒店，并为交通衔接留出足够余量。",
        },
        {
          term: "落脚点",
          detail:
            "结合晚间出行、步行负担和下一程出发方式来选择住宿区域。",
        },
        {
          term: "体力",
          detail: "抵达当天晚上不强塞所谓“必去景点”。",
        },
        {
          term: "仍需确认",
          detail: "车次、房型、行李协助和你实际抵达的机场或车站。",
        },
      ],
      pointLabel: "重点在于：",
      point:
        "路线工具负责确定整体结构，旅行规划师负责补全让这套结构真正可执行的细节。",
      handledLabel: "工作室会逐项梳理",
      handledTitle: "藏在路线背后的决定",
      handled: [
        {
          title: "交通逻辑",
          detail: "航班、高铁、转场耗时，以及抵达当天能承受的安排。",
        },
        {
          title: "住在哪里",
          detail: "住宿区域、房型需求，以及不同位置带来的步行负担。",
        },
        {
          title: "每天如何衔接",
          detail: "门票、向导时间、开放规律和恢复体力的空间。",
        },
        {
          title: "书面服务范围",
          detail: "谁负责规划、谁落地执行，以及哪些内容不在安排之内。",
        },
      ],
    },
    studio: {
      eyebrow: "工作室",
      title: "一条清晰的规划主线，明确的交接。",
      intro:
        "Homeground 是一个协作式中国旅行规划工作室。路线和书面需求由同一条规划主线统筹；条件明确后，再人工核对合适的当地服务。",
      roles: [
        {
          title: "由一位旅行规划师负责完整需求",
          detail:
            "你的重点与待确认问题始终集中在一处，不会每次交接都重新讲一遍。",
        },
        {
          title: "需要时再加入对应专家",
          detail:
            "团队成员和当地合作方只在其真正熟悉的城市与服务环节参与。",
        },
        {
          title: "责任边界保持清楚",
          detail:
            "确认之前，书面范围会说明谁规划、谁执行，以及哪些事项不包含在内。",
        },
      ],
    },
    faq: {
      eyebrow: "接下来需要知道的",
      title: "真正影响决定的几个问题。",
      intro: "其他细节，可以等路线先有一个清楚的形状再讨论。",
      items: [
        {
          question: "这是跟团游吗？",
          answer:
            "不要求参加固定团。无论独自出行、情侣、家庭、朋友还是私人小团，我们都会围绕实际同行者来设计路线。",
        },
        {
          question: "请旅行规划师进一步调整后会发生什么？",
          answer:
            "旅行规划师会结合具体日期、进出城市、步行需求和不能妥协的事项检查初步路线。深入沟通后，才会进入详细规划和报价。",
        },
        {
          question: "最终是谁来落地执行？",
          answer:
            "Homeground 负责设计行程，并在条件明确后人工核对合适的当地服务。确认之前，服务范围和实际执行方都会以书面方式说明。",
        },
        {
          question: "可以为孩子、父母或行动不便的人规划吗？",
          answer:
            "可以。步行距离、台阶、早起、房型、饮食需求和休息时间，都会从一开始进入规划，而不是最后随手加上的备注。",
        },
        {
          question: "如果机票或部分城市已经订好了怎么办？",
          answer:
            "保留即可。初步路线只是草案，旅行规划师可以围绕已经确定的机场、日期或必去地点重新调整。",
        },
      ],
    },
    finalCta: {
      resultLabel: "你的路线已准备好进入人工复核",
      inProgressLabel: "你的选择会随进度保留",
      newLabel: "再回答四个问题，就能看到起点",
      resultTitle: "准备把这条初步路线变成真正可执行的旅行吗？",
      inProgressTitle: "完成剩余问题，查看你的初步路线。",
      newTitle: "先找到这趟中国旅行该有的结构。",
    },
    handoff: {
      eyebrow: "人工旅行规划",
      title: "你想通过哪种方式继续？",
      body:
        "你的初步路线和四项选择已经整理好。选择一种方式联系工作室，不需要重新说明。",
      boundary: "这只是咨询，不是预订。",
      contactLegend: "选择电子邮件或 WhatsApp",
      emailOption: "电子邮件",
      emailOptionDescription: "通过网站发送路线，由人工通过电子邮件回复。",
      whatsappOption: "WhatsApp",
      whatsappOptionDescription: "打开 WhatsApp，路线摘要会自动填入。",
      requiredText: "（必填）",
      emailLabel: "你的电子邮箱",
      emailHint: "仅用于回复本次咨询。",
      whatsappLaunchHint:
        "WhatsApp 将打开并填入你的路线摘要。请在 WhatsApp 中选择“发送”，对话才会开始。",
      whatsappPrivacyNote:
        "为了准备消息，路线摘要会交给 WhatsApp。只有在你选择“发送”后，Homeground 才会收到消息。",
      whatsappOpen: "在 WhatsApp 中继续",
      whatsappAttemptTitle: "我们已尝试打开 WhatsApp。",
      whatsappAttemptBody:
        "网站无法确认 WhatsApp 是否成功打开，也无法确认消息是否已经发送。如果对话没有开始，请再次打开 WhatsApp 并选择“发送”。",
      whatsappOpenAgain: "再次打开 WhatsApp",
      whatsappUseEmail: "改用电子邮件",
      whatsappMessageIntro:
        "你好，Homeground。我想继续规划这趟中国旅行。",
      whatsappMessageRouteLabel: "初步路线",
      whatsappMessagePartyLabel: "同行者",
      whatsappMessageStyleLabel: "旅行偏好",
      whatsappMessageLengthLabel: "时长",
      whatsappMessagePaceLabel: "节奏",
      whatsappMessageClosing: "接下来需要我提供哪些信息？",
      noteLabel: "还有哪些需要我们注意的条件？（选填）",
      noteHint:
        "例如必去地点、已订航班、去过的地方、步行需求或其他事项。请不要填写病历等医疗记录。",
      noteAttached:
        "这段说明会附在咨询中供规划师查看，但不会自动改变当前初步路线。",
      noteCount: (current, maximum) => `已输入 ${current} / ${maximum} 字`,
      nextTitle: "接下来会发生什么",
      nextBody:
        "规划师会先确认日期、进出城市和不能改变的事项，再讨论细节与价格。",
      privacyBody:
        "发送本次咨询即表示你知悉 Homeground 会使用这些信息回复本次咨询。未经单独许可，我们不会将其用于营销。",
      privacyLink: "阅读隐私说明",
      serviceBoundary: "目前没有任何预订。",
      submit: "发送我的路线",
      submitting: "正在发送咨询…",
      errorSummary: "请检查以下信息。",
      contactError: "请选择电子邮件或 WhatsApp。",
      emailError: "请输入有效的电子邮箱。",
      noteTooLong: "选填说明不能超过 2,000 字。",
      noteInvalid: "请删除选填说明中不支持的控制字符。",
      formVersionUnsupported:
        "当前咨询表单版本已经过期，请刷新页面后再试。",
      privacyNoticeUnsupported:
        "当前表单对应的隐私说明已经更新，请刷新页面后再试。",
      successTitle: "你的路线已保存。",
      successBody: "我们已保存你的路线和四项选择，供人工查看。",
      successReference: (publicReference) =>
        `查询参考号：${publicReference}`,
      successReplyEmail: (maskedEmail, replySla) =>
        `我们会${replySla ? `在${replySla}内` : ""}回复至 ${maskedEmail}。目前没有任何预订。`,
      backToRoute: "返回我的路线",
      previousRequestNotice: (publicReference) =>
        `之前的咨询 ${publicReference} 使用的是上一版路线；当前修改尚未发送。`,
      routeEditingNotice:
        "请先完成或取消路线修改，再发送本次咨询。你填写的联系方式和说明仍保留在本页。",
      failureTitle: "本次咨询未能发送。",
      technicalError:
        "系统暂时无法处理本次咨询。你填写的信息还在，可以稍后重试。",
      offlineError: "当前似乎没有网络，本次咨询没有离开你的浏览器。",
      notPersisted:
        "系统已确认没有保存本次咨询。你填写的信息仍保留在这里。",
      requestTooLarge:
        "本次咨询内容过长。请缩短选填说明后再试。",
      rateLimited: (retryAfter) =>
        `短时间内发送次数过多，请在 ${retryAfter} 后再试。`,
      routeMismatch:
        "这条路线已经更新。请先查看更新后的路线，再重新发送咨询。",
      unsupportedRuleVersion:
        "这条路线由旧版规则生成。请刷新并查看更新后的路线，再重新发送。",
      idempotencyConflict:
        "发送过程中咨询内容发生了变化。请检查后重新提交。",
      retry: "重试",
      emailFallback: "发送邮件给 Homeground",
      fallbackEmailSubject: (routeReference) =>
        `[Homeground][Fallback] 路线咨询 · ${routeReference}`,
      fallbackEmailBody: (routeReference) =>
        `Homeground 团队，你好：\n\n我希望人工复核路线 ${routeReference}。\n\n请说明接下来需要补充哪些旅行信息。\n`,
      fallbackFailureBody: (routeReference) =>
        `本次咨询没有保存。如使用已验证的品牌邮箱，请在邮件中写明路线代码 ${routeReference}。`,
      disabledTitle: "人工咨询目前暂不可用。",
      disabledBody: (routeReference) =>
        `此版本网站尚未配置安全咨询服务。路线代码：${routeReference}。`,
      brandEmailUnavailable:
        "网站也尚未配置已验证的 Homeground 品牌邮箱，因此当前没有可用的备用联系方式。",
      uncertainTitle: "暂时无法确认咨询是否已经送达。",
      uncertainBody:
        "你填写的信息仍在这里。再次尝试时会使用同一请求键，不会产生重复咨询。",
      uncertainLeaveWarning:
        "请在离开本页前重试；离开后，这个浏览器可能无法继续核对本次请求。",
      uncertainRetry: "核对并重试",
    },
    footer: {
      studioLabel: "中国旅行规划工作室",
      privacy: "隐私说明",
      copyright: (year) =>
        `© ${year} Homeground China。每一段旅程，都从真实需求出发。`,
    },
    schemaDescription:
      "一家提供定制初步路线，并在旅行条件明确后人工核对合适当地服务的中国旅行规划工作室。",
    finder: {
      hiddenTitle: "找到一条合理的初步路线",
      introEyebrow: "先看你需要什么，而不是先看地图",
      introTitle: "找到一条合理的初步路线",
      introBody:
        "回答四个问题，先看到一条有参考价值的路线，再决定是否需要旅行规划师继续细化。",
      questions: {
        party: {
          eyebrow: "先考虑同行的人",
          title: "这次和谁一起旅行？",
          help: "同行者、年龄和行动能力，都可能改变路线。",
        },
        travelStyle: {
          eyebrow: "先选你想要的感受",
          title: "你想体验怎样的中国？",
          help: "不需要先知道城市名称，选择最接近你期待的感觉即可。",
        },
        nights: {
          eyebrow: "把有限时间用在真正值得的地方",
          title: "你计划在中国停留多少晚？",
          help:
            "先选择最接近的总晚数。结果会按这个参考值分配，具体日期之后还能再调整。",
        },
        pace: {
          eyebrow: "选择每天的节奏",
          title: "你希望大多数日子是什么节奏？",
          help: "这是在选择体力分配，不是在比谁看得更多。放慢节奏，也可以看到很精彩的中国。",
        },
      },
      options: {
        party: [
          {
            id: "couple",
            label: "两位成人",
            description: "情侣，或两位结伴出行的成人。",
          },
          {
            id: "family",
            label: "带孩子的家庭",
            description: "给小朋友留出节奏和休息空间。",
          },
          {
            id: "parents",
            label: "父母或年长同行者",
            description: "舒适度、步行量和恢复时间更重要。",
          },
          {
            id: "friends",
            label: "朋友结伴",
            description: "一起体验，也为不同兴趣留出一点空间。",
          },
          {
            id: "solo",
            label: "独自旅行",
            description: "为一位独立旅行者提供清楚的路线结构。",
          },
        ],
        travelStyle: [
          {
            id: "classic",
            label: "第一次来中国的经典篇章",
            description: "重要历史、代表性地标和清楚的首次旅行路线。",
          },
          {
            id: "landscape",
            label: "群山与震撼风景",
            description: "更多大自然、更安静的早晨，减少大城市时间。",
          },
          {
            id: "food",
            label: "美食与城市活力",
            description: "街区、夜景，以及值得专程而来的味道。",
          },
          {
            id: "slow",
            label: "更舒缓、更细腻的中国",
            description: "湖泊、园林、地方手艺，以及更少的酒店更换。",
          },
          {
            id: "unsure",
            label: "我现在确实不知道",
            description: "根据时间、同行者和理想节奏帮我缩小范围。",
          },
        ],
        nights: [
          {
            id: "7",
            label: "7晚",
            description: "专注一个区域，或选择两个交通顺畅的落脚点。",
          },
          {
            id: "10",
            label: "10晚",
            description: "足够安排一条包含两到三个落脚点的清晰路线。",
          },
          {
            id: "14",
            label: "14晚",
            description: "可以展开更丰富的首次旅行，并在每座城市真正停留。",
          },
          {
            id: "18",
            label: "18晚",
            description: "体验更多对比，也有余地在不同篇章之间放慢节奏。",
          },
        ],
        pace: [
          {
            id: "gentle",
            label: "轻松",
            description: "留出更多空白，少些早起，每天安排更轻。",
          },
          {
            id: "balanced",
            label: "平衡",
            description: "每天一个主要体验，周围保留自由时间。",
          },
          {
            id: "full",
            label: "充实",
            description: "我可以接受大多数日子安排得更丰富。",
          },
        ],
      },
      progress: (current, total) => `第 ${current} 题，共 ${total} 题`,
      cancelEdits: "取消修改",
      back: "返回",
      showRoute: "查看我的初步路线",
      continue: "继续",
      answerRequired: "请选择一个答案后继续。",
      resultKicker: "你的初步路线",
      routeAriaLabel: "按顺序排列的建议路线",
      nights: (count) => `${count}晚`,
      totalNights: (count) => `共 ${count} 晚`,
      moves: (count) => `这份草案需要换城 ${count} 次`,
      transferNote: "不包含抵达和离境当天的接送。",
      whyTitle: "为什么这条路线适合你的答案",
      omittedTitle: "这条路线主动舍弃了什么",
      assumptionsTitle: "目前的前提假设",
      scopeNote:
        "这是住宿晚数的初步分配，并非最终行程。具体交通、酒店、每日时间、门票和价格尚未加入。",
      answersTitle: "你的选择",
      editAll: "全部修改",
      answerLabels: {
        party: "同行者",
        travelStyle: "旅行偏好",
        nights: "总晚数",
        pace: "每日节奏",
      },
      change: "修改",
      changeAria: (label) => `修改${label}`,
      contactEyebrow: "接下来再补充细节",
      contactTitle: "想把这条路线真正调整到适合你们吗？",
      contactBody:
        "补充已经确定的事项后，选择希望我们回复你的方式，并带上这份初步结果。正式讨论预订之前，旅行规划师会结合日期、舒适度需求和优先事项进一步调整。",
      contactButton: "选择联系渠道",
      contactNote:
        "路线会为你选择的联系渠道准备好；在你主动发送前，它不会被提交。",
      restart: "重新开始",
    },
    route: {
      cityNames: cityNamesZh,
      partyPhrases: {
        couple: "两位成人",
        family: "带孩子的家庭",
        parents: "父母或年长同行者",
        friends: "结伴出行的朋友",
        solo: "独自旅行者",
      },
      familyLabels: {
        classic: "首次中国经典",
        landscape: "自然风景",
        food: "美食与城市",
        slow: "慢节奏华东",
      },
      lowerMoveTitle: (family) => `减少换酒店次数的${family}路线`,
      lowerMoveSummary: (nights) =>
        `${nights}晚的初步结构，以更长停留和更少换住宿地点为优先。`,
      lowerMoveReason: (bases, moves) =>
        `根据同行者和理想节奏，这条路线采用 ${bases} 个落脚点、换城 ${moves} 次，而不是范围更大的版本。`,
      secondReason: (party, shortestStay, pace) =>
        `对于${party}，每个落脚点至少停留 ${shortestStay} 晚；每日安排仍需根据你选择的“${pace}”节奏继续调整。`,
      lowerMoveTradeoff: (cities) =>
        `为减少更换酒店，${cities.join("和")}暂不纳入。确认进出机场和行动需求后，旅行规划师可以重新评估这个取舍。`,
      commonAssumptions: [
        "尚未核对具体日期、进出机场、季节条件和交通余位。",
        "这份初步路线尚未使用预算和酒店标准作为条件。",
      ],
      partyAssumptions: {
        couple: "尚不清楚酒店档次、房型，以及行动或饮食方面的需求。",
        family: "尚不清楚孩子年龄、日常作息和可承受的步行量。",
        parents: "尚不清楚步行能力、台阶、行动协助和休息需求。",
        friends: "尚不清楚房型、预算分配，以及是否需要各自活动时间。",
        solo: "尚不清楚酒店档次、独自转场的接受度和所需协助程度。",
      },
    },
  },
  ko: {
    htmlLang: "ko",
    path: "/ko/",
    languageName: "한국어",
    languageShort: "한국어",
    metadata: {
      title: "나에게 맞는 중국 여행 동선 찾기",
      description:
        "네 가지 질문에 답하고 도시, 숙박일수, 선택 기준이 담긴 중국 여행 동선 초안을 확인하세요. 자세한 상담과 견적은 그다음에 진행됩니다.",
      openGraphTitle: "Homeground China | 나에게 맞는 중국 여행 동선",
    },
    skipLink: "본문으로 바로가기",
    brandTagline: "독립 중국 여행 플래닝",
    navigation: {
      primaryLabel: "주요 메뉴",
      mobileLabel: "모바일 메뉴",
      footerLabel: "하단 메뉴",
      languageLabel: "언어 선택",
      languageChangeWarning:
        "언어를 바꾸면 입력한 연락처가 없어집니다. 계속할까요?",
      homeLabel: "Homeground China 홈",
      planning: "여행 설계 방식",
      studio: "스튜디오",
      faq: "자주 묻는 질문",
      visa: "무비자 안내",
      openMenu: "메뉴 열기",
      closeMenu: "메뉴 닫기",
      plannerCta: {
        new: "나의 여행 동선 찾기",
        inProgress: "여행 동선 찾기 계속하기",
        result: "플래너에게 이 동선 검토 요청하기",
        disabled: "Homeground에 문의하기",
        validationError: "문의 작성 마치기",
        submitting: "문의 보내는 중…",
        success: "접수 확인 보기",
        failed: "문의로 돌아가기",
        uncertain: "문의 상태 확인",
      },
    },
    hero: {
      eyebrow: "실제 일행을 기준으로 설계하는 독립 중국 여행",
      title: "나에게 정말 맞는 중국 여행.",
      lead:
        "네 가지 질문에 답하면 도시, 숙박일수, 솔직한 선택 기준이 담긴 여행 동선 초안을 볼 수 있습니다. 연락을 선택한 뒤에야 사람이 실제 조건과 적합한 현지 서비스를 확인합니다.",
      trustLabel: "먼저 확인할 수 있는 것",
      trust: [
        "예산은 아직 묻지 않습니다",
        "결과를 보기 전에는 연락처가 필요 없습니다",
        "일행과 여행 속도가 실제 동선 구조를 바꿉니다",
      ],
      imageAlt: "해자에 비친 베이징 자금성 각루",
      caption: "베이징 · 자금성 각루",
    },
    proof: {
      eyebrow: "개인 맞춤 설계가 바꾸는 것",
      title: "여행 동선은 도시 이름의 목록이 아닙니다.",
      intro:
        "첫 결과가 여행의 뼈대를 보여 준다면, 사람의 설계는 그 뼈대가 실제 현장에서 작동하도록 만듭니다.",
      imageAlt: "안개 낀 항저우 호수를 지나는 작은 배",
      imageBadge: "여행 설계 예시 · 항저우",
      cardLabel: "동선 초안이 나온 뒤 더해지는 것",
      cardTitle: "이동하는 날도 여행의 일부가 되도록",
      cardTag: "고정 패키지가 아닌 설계 방식 예시",
      extract: [
        {
          term: "이동",
          detail:
            "베이징 → 항저우, 호텔은 한 번만 바꾸고 충분한 여유 시간을 둡니다.",
        },
        {
          term: "숙소 위치",
          detail:
            "저녁 이동, 도보 부담, 다음 출발 동선을 함께 보고 지역을 고릅니다.",
        },
        {
          term: "체력",
          detail: "도착한 날 저녁에 대표 명소를 억지로 넣지 않습니다.",
        },
        {
          term: "추가 확인",
          detail:
            "열차 시간, 객실 구성, 수하물 지원, 실제 도착 공항이나 역입니다.",
        },
      ],
      pointLabel: "핵심은:",
      point:
        "동선 찾기가 전체 형태를 정하고, 개인 맞춤 설계가 그 형태를 실행할 수 있도록 세부 결정을 구체화합니다.",
      handledLabel: "스튜디오가 함께 검토하는 것",
      handledTitle: "여행 동선 뒤에 있는 실제 결정들",
      handled: [
        {
          title: "교통의 흐름",
          detail: "항공, 열차, 이동 시간과 무리 없는 도착일 계획.",
        },
        {
          title: "어디에 머물지",
          detail: "숙소 지역, 객실 조건과 위치에 따라 달라지는 도보량.",
        },
        {
          title: "이어지는 하루",
          detail: "입장권, 가이드 시간, 운영 일정과 회복할 여유.",
        },
        {
          title: "문서로 확인하는 범위",
          detail:
            "무엇을 설계하고 누가 실행하며 어떤 항목이 포함되지 않는지.",
        },
      ],
    },
    studio: {
      eyebrow: "스튜디오",
      title: "하나의 설계 흐름, 분명한 인계.",
      intro:
        "Homeground는 협업형 중국 여행 플래닝 스튜디오입니다. 한 흐름 안에서 여행 동선과 요청서를 관리하고, 실제 조건이 분명해진 뒤 적합한 현지 서비스를 사람이 확인합니다.",
      roles: [
        {
          title: "한 명의 플래너가 요청서를 책임집니다",
          detail:
            "중요한 조건과 미해결 질문이 한곳에 남아, 인계할 때마다 처음부터 설명하지 않아도 됩니다.",
        },
        {
          title: "필요한 지점에 전문가가 합류합니다",
          detail:
            "팀원과 현지 파트너는 실제로 잘 아는 도시와 서비스 영역에 참여합니다.",
        },
        {
          title: "책임 범위를 분명히 합니다",
          detail:
            "확정 전 문서에서 누가 설계하고 누가 실행하며 무엇이 범위 밖인지 확인합니다.",
        },
      ],
    },
    faq: {
      eyebrow: "다음으로 알아둘 것",
      title: "결정을 바꾸는 중요한 질문들.",
      intro: "나머지는 여행 동선의 형태가 잡힌 뒤에 확인해도 늦지 않습니다.",
      items: [
        {
          question: "단체 패키지여행인가요?",
          answer:
            "정해진 단체 패키지에 참여할 필요는 없습니다. 혼자, 커플, 가족, 친구, 소규모 단독 그룹 등 실제 일행에 맞춰 여행 동선을 설계합니다.",
        },
        {
          question: "플래너 검토를 요청하면 다음에는 무엇을 하나요?",
          answer:
            "플래너가 날짜, 입출국 도시, 도보 조건과 꼭 지켜야 할 사항을 기준으로 여행 동선 초안을 검토합니다. 자세한 설계와 견적은 충분히 이야기한 뒤에 진행됩니다.",
        },
        {
          question: "실제 여행 서비스는 누가 운영하나요?",
          answer:
            "Homeground가 여행을 설계한 뒤 실제 조건이 분명해지면 적합한 현지 서비스를 확인합니다. 확정 전 서비스 범위와 실제 운영 주체를 문서로 분명히 안내합니다.",
        },
        {
          question:
            "아이, 부모님 또는 이동이 불편한 일행도 설계할 수 있나요?",
          answer:
            "네. 도보 거리, 계단, 이른 출발, 객실 구성, 식사 조건과 회복 시간은 마지막에 덧붙이는 메모가 아니라 처음부터 반영하는 설계 조건입니다.",
        },
        {
          question: "항공권이나 일부 도시를 이미 예약했다면요?",
          answer:
            "그대로 두셔도 됩니다. 여행 동선은 초안이므로 확정된 공항, 날짜, 꼭 가고 싶은 장소에 맞춰 다시 구성할 수 있습니다.",
        },
      ],
    },
    finalCta: {
      resultLabel: "여행 동선이 사람의 검토를 받을 준비가 되었습니다",
      inProgressLabel: "답변은 진행하는 동안 저장됩니다",
      newLabel: "네 가지 답변이면 출발점이 보입니다",
      resultTitle: "이 동선을 실제 여행으로 이어갈 준비가 되셨나요?",
      inProgressTitle: "남은 질문에 답하고 여행 동선 초안을 확인하세요.",
      newTitle: "중국 여행의 전체 형태부터 찾아보세요.",
    },
    handoff: {
      eyebrow: "1:1 여행 플래닝",
      title: "어떤 방법으로 이어갈까요?",
      body:
        "초기 여행 동선과 네 가지 답변이 정리되었습니다. 한 가지 연락 방법을 선택하면 처음부터 다시 설명하지 않아도 됩니다.",
      boundary: "문의 단계이며 예약이 아닙니다.",
      contactLegend: "이메일 또는 WhatsApp 선택",
      emailOption: "이메일",
      emailOptionDescription:
        "웹사이트에서 여행 동선을 보내면 이메일로 직접 답변드립니다.",
      whatsappOption: "WhatsApp",
      whatsappOptionDescription:
        "여행 동선 요약이 미리 입력된 WhatsApp 채팅창이 열립니다.",
      requiredText: "(필수)",
      emailLabel: "이메일 주소",
      emailHint: "이 문의에 답변하는 용도로만 사용합니다.",
      whatsappLaunchHint:
        "WhatsApp에 여행 동선 요약이 미리 입력됩니다. 대화를 시작하려면 WhatsApp에서 ‘보내기’를 선택해 주세요.",
      whatsappPrivacyNote:
        "메시지를 준비하기 위해 여행 동선 요약이 WhatsApp으로 전달됩니다. Homeground는 ‘보내기’를 누른 뒤에만 메시지를 받습니다.",
      whatsappOpen: "WhatsApp에서 계속하기",
      whatsappAttemptTitle: "WhatsApp 열기를 요청했습니다.",
      whatsappAttemptBody:
        "WhatsApp이 실제로 열리는지 또는 메시지가 전송되었는지는 웹사이트에서 확인할 수 없습니다. 대화가 시작되지 않았다면 WhatsApp을 다시 열고 ‘보내기’를 선택해 주세요.",
      whatsappOpenAgain: "WhatsApp 다시 열기",
      whatsappUseEmail: "이메일로 보내기",
      whatsappMessageIntro:
        "Homeground와 함께 이번 중국 여행을 더 구체적으로 계획하고 싶습니다.",
      whatsappMessageRouteLabel: "초기 여행 동선",
      whatsappMessagePartyLabel: "일행",
      whatsappMessageStyleLabel: "여행 취향",
      whatsappMessageLengthLabel: "기간",
      whatsappMessagePaceLabel: "여행 페이스",
      whatsappMessageClosing: "다음으로 어떤 정보를 드리면 될까요?",
      noteLabel: "이 동선에서 꼭 고려해야 할 내용이 있나요? (선택)",
      noteHint:
        "꼭 가야 할 곳, 이미 예약한 항공편, 이전에 방문한 곳, 도보 조건 등을 적어 주세요. 진료 기록과 같은 의료 정보는 입력하지 마세요.",
      noteAttached:
        "이 내용은 플래너 검토용으로 첨부되며 현재 여행 동선을 자동으로 변경하지 않습니다.",
      noteCount: (current, maximum) => `${current} / ${maximum}자`,
      nextTitle: "문의 후 진행 과정",
      nextBody:
        "플래너가 날짜, 입출국 도시와 바꿀 수 없는 사항을 먼저 확인한 뒤 세부 내용과 가격을 논의합니다.",
      privacyBody:
        "문의를 보내면 Homeground가 본 문의에 답변하기 위해 이 정보를 사용하는 것을 확인한 것으로 간주합니다. 별도 동의 없이 마케팅에 사용하지 않습니다.",
      privacyLink: "개인정보 처리 안내 보기",
      serviceBoundary: "아직 예약된 항목은 없습니다.",
      submit: "내 여행 동선 보내기",
      submitting: "문의를 보내는 중…",
      errorSummary: "아래 내용을 확인해 주세요.",
      contactError: "이메일 또는 WhatsApp을 선택해 주세요.",
      emailError: "올바른 이메일 주소를 입력해 주세요.",
      noteTooLong: "선택 메모는 2,000자 이내로 작성해 주세요.",
      noteInvalid: "선택 메모에서 지원하지 않는 제어 문자를 삭제해 주세요.",
      formVersionUnsupported:
        "현재 문의 양식이 이전 버전입니다. 페이지를 새로 고친 뒤 다시 시도해 주세요.",
      privacyNoticeUnsupported:
        "이 양식의 개인정보 처리 안내가 업데이트되었습니다. 페이지를 새로 고친 뒤 다시 시도해 주세요.",
      successTitle: "여행 동선이 저장되었습니다.",
      successBody: "여행 동선과 네 가지 답변을 사람의 검토를 위해 저장했습니다.",
      successReference: (publicReference) =>
        `문의 확인 번호: ${publicReference}`,
      successReplyEmail: (maskedEmail, replySla) =>
        `${replySla ? `${replySla} 이내에 ` : ""}${maskedEmail}로 답변드리겠습니다. 아직 예약된 항목은 없습니다.`,
      backToRoute: "내 여행 동선으로 돌아가기",
      previousRequestNotice: (publicReference) =>
        `이전 문의 ${publicReference}는 이전 여행 동선으로 전송되었습니다. 현재 변경 사항은 아직 전송되지 않았습니다.`,
      routeEditingNotice:
        "여행 동선 수정을 완료하거나 취소한 뒤 문의를 보내 주세요. 입력한 연락처와 메모는 그대로 유지됩니다.",
      failureTitle: "문의를 보내지 못했습니다.",
      technicalError:
        "현재 이 문의를 처리할 수 없습니다. 입력한 내용은 그대로 있으니 다시 시도해 주세요.",
      offlineError:
        "현재 오프라인 상태인 것 같습니다. 문의가 브라우저 밖으로 전송되지 않았습니다.",
      notPersisted:
        "서비스가 이 문의를 저장하지 않았음을 확인했습니다. 입력한 내용은 그대로 있습니다.",
      requestTooLarge:
        "문의 내용이 너무 깁니다. 선택 메모를 줄인 뒤 다시 시도해 주세요.",
      rateLimited: (retryAfter) =>
        `짧은 시간에 너무 많은 문의가 전송되었습니다. ${retryAfter} 후 다시 시도해 주세요.`,
      routeMismatch:
        "여행 동선이 업데이트되었습니다. 새 동선을 확인한 뒤 문의를 다시 보내 주세요.",
      unsupportedRuleVersion:
        "이 여행 동선은 이전 규칙으로 만들어졌습니다. 새로 고침 후 업데이트된 동선을 확인하고 다시 보내 주세요.",
      idempotencyConflict:
        "전송 중 문의 내용이 변경되었습니다. 내용을 확인한 뒤 다시 제출해 주세요.",
      retry: "다시 시도",
      emailFallback: "Homeground에 이메일 보내기",
      fallbackEmailSubject: (routeReference) =>
        `[Homeground][Fallback] 여행 동선 문의 · ${routeReference}`,
      fallbackEmailBody: (routeReference) =>
        `Homeground 팀께,\n\n여행 동선 ${routeReference}의 사람 검토를 요청드립니다.\n\n다음으로 필요한 여행 정보를 알려 주세요.\n`,
      fallbackFailureBody: (routeReference) =>
        `문의가 저장되지 않았습니다. 확인된 브랜드 이메일을 이용할 경우 동선 코드 ${routeReference}를 적어 주세요.`,
      disabledTitle: "현재 플래너 문의를 이용할 수 없습니다.",
      disabledBody: (routeReference) =>
        `이 사이트 버전에는 안전한 문의 서비스가 설정되지 않았습니다. 동선 코드: ${routeReference}.`,
      brandEmailUnavailable:
        "확인된 Homeground 브랜드 이메일도 설정되지 않아 현재 이 페이지에서 이용할 수 있는 대체 연락 방법이 없습니다.",
      uncertainTitle: "문의 도착 여부를 확인할 수 없습니다.",
      uncertainBody:
        "입력한 내용은 그대로 있습니다. 같은 요청 키로 다시 시도하므로 중복 문의가 생기지 않습니다.",
      uncertainLeaveWarning:
        "이 페이지를 떠나기 전에 다시 시도해 주세요. 페이지를 떠나면 이 브라우저에서 요청을 다시 확인하지 못할 수 있습니다.",
      uncertainRetry: "확인하고 다시 시도",
    },
    footer: {
      studioLabel: "중국 여행 플래닝 스튜디오",
      privacy: "개인정보 처리 안내",
      copyright: (year) =>
        `© ${year} Homeground China. 실제 조건을 바탕으로 설계하는 맞춤 여행.`,
    },
    schemaDescription:
      "맞춤형 중국 여행 동선 초안을 만들고 여행 조건이 분명해진 뒤 적합한 현지 서비스를 사람이 확인하는 여행 플래닝 스튜디오.",
    finder: {
      hiddenTitle: "현실적인 여행 동선 찾기",
      introEyebrow: "지도보다 사람부터",
      introTitle: "현실적인 여행 동선 찾기",
      introBody:
        "네 가지 질문에 답하고 쓸모 있는 여행 동선 초안을 확인한 뒤, 개인 맞춤 설계가 필요한지 결정하세요.",
      questions: {
        party: {
          eyebrow: "함께 가는 사람부터",
          title: "누구와 함께 여행하시나요?",
          help: "일행, 연령과 이동 조건에 따라 여행 동선이 달라질 수 있습니다.",
        },
        travelStyle: {
          eyebrow: "원하는 느낌부터",
          title: "어떤 중국을 경험하고 싶으신가요?",
          help:
            "도시 이름을 미리 알 필요는 없습니다. 가장 가까운 느낌을 골라 주세요.",
        },
        nights: {
          eyebrow: "주어진 시간을 지키기",
          title: "중국에서 몇 박을 머무르나요?",
          help:
            "지금은 가장 가까운 총 숙박일수를 골라 주세요. 결과는 그 기준으로 나누며, 정확한 날짜는 나중에 조정할 수 있습니다.",
        },
        pace: {
          eyebrow: "하루의 리듬 정하기",
          title: "대부분의 하루를 어떤 속도로 보내고 싶으신가요?",
          help:
            "욕심보다 체력에 관한 질문입니다. 천천히 가도 인상적인 장소를 충분히 만날 수 있습니다.",
        },
      },
      options: {
        party: [
          {
            id: "couple",
            label: "성인 두 명",
            description: "커플 또는 두 명의 여행 동행을 위한 여행.",
          },
          {
            id: "family",
            label: "아이와 함께하는 가족",
            description: "어린 여행자의 리듬과 휴식 여유를 둡니다.",
          },
          {
            id: "parents",
            label: "부모님 또는 연세가 있는 분",
            description: "편안함, 도보량과 회복 시간이 중요합니다.",
          },
          {
            id: "friends",
            label: "친구",
            description:
              "함께하는 경험과 서로 다른 취향을 위한 시간을 모두 둡니다.",
          },
          {
            id: "solo",
            label: "혼자",
            description: "혼자 여행하는 분을 위한 명확한 여행 동선.",
          },
        ],
        travelStyle: [
          {
            id: "classic",
            label: "첫 중국 여행의 핵심",
            description:
              "대표 역사, 주요 명소와 흐름이 분명한 첫 여행 동선.",
          },
          {
            id: "landscape",
            label: "산과 압도적인 자연 풍경",
            description:
              "큰 풍경과 한적한 아침을 늘리고 대도시 체류는 줄입니다.",
          },
          {
            id: "food",
            label: "미식과 도시의 활기",
            description:
              "동네, 야경과 일부러 찾아갈 만한 지역의 맛을 경험합니다.",
          },
          {
            id: "slow",
            label: "조금 더 느리고 부드러운 중국",
            description: "호수, 정원, 지역 공예와 숙소 이동을 줄인 여행.",
          },
          {
            id: "unsure",
            label: "아직 정말 모르겠어요",
            description:
              "여행 기간, 일행과 선호 속도를 바탕으로 범위를 좁혀 주세요.",
          },
        ],
        nights: [
          {
            id: "7",
            label: "7박",
            description:
              "한 지역에 집중하거나 이동이 편한 두 곳을 거점으로 합니다.",
          },
          {
            id: "10",
            label: "10박",
            description:
              "두세 곳을 거점으로 흐름이 분명한 여행 동선을 만들 수 있습니다.",
          },
          {
            id: "14",
            label: "14박",
            description:
              "각 도시에서 충분히 머무르는 폭넓은 첫 여행이 가능합니다.",
          },
          {
            id: "18",
            label: "18박",
            description:
              "더 다양한 대비를 경험하면서도 중간중간 속도를 늦출 수 있습니다.",
          },
        ],
        pace: [
          {
            id: "gentle",
            label: "여유롭게",
            description:
              "빈 시간을 늘리고 이른 출발과 강도 높은 일정을 줄입니다.",
          },
          {
            id: "balanced",
            label: "균형 있게",
            description:
              "하루 한 가지 주요 경험을 중심으로 자유 시간을 둡니다.",
          },
          {
            id: "full",
            label: "알차게",
            description: "대부분의 날에 더 많은 일정을 넣어도 괜찮습니다.",
          },
        ],
      },
      progress: (current, total) => `${total}개 중 ${current}번째 질문`,
      cancelEdits: "수정 취소",
      back: "이전",
      showRoute: "내 여행 동선 보기",
      continue: "계속",
      answerRequired: "계속하려면 답변 하나를 선택해 주세요.",
      resultKicker: "나의 여행 동선 초안",
      routeAriaLabel: "순서대로 표시한 추천 여행 동선",
      nights: (count) => `${count}박`,
      totalNights: (count) => `총 ${count}박`,
      moves: (count) => `이 초안의 도시 간 이동 ${count}회`,
      transferNote:
        "공항·기차역과 숙소 사이의 도착·출발 이동은 이 횟수에 포함하지 않습니다.",
      whyTitle: "이 답변에 맞는 이유",
      omittedTitle: "이 동선 초안에서 제외한 것",
      assumptionsTitle: "현재 전제 조건",
      scopeNote:
        "숙박일수를 나눈 첫 초안이며 최종 일정이 아닙니다. 정확한 교통, 호텔, 일자별 시간, 입장권과 가격은 아직 포함하지 않았습니다.",
      answersTitle: "나의 답변",
      editAll: "모두 수정",
      answerLabels: {
        party: "여행 일행",
        travelStyle: "여행 취향",
        nights: "총 숙박일수",
        pace: "하루 속도",
      },
      change: "변경",
      changeAria: (label) => `${label} 변경`,
      contactEyebrow: "세부 내용은 다음 단계에서",
      contactTitle: "우리 일행에 맞춘 버전이 필요하신가요?",
      contactBody:
        "이미 정해진 조건을 더한 뒤, 이 결과와 함께 답변받을 방법을 선택해 주세요. 예약을 논의하기 전에 플래너가 날짜, 편의 조건과 우선순위를 기준으로 검토합니다.",
      contactButton: "연락 방법 선택하기",
      contactNote:
        "여행 동선은 선택한 연락 방법에 맞게 준비됩니다. 직접 보내기 전에는 전달되지 않습니다.",
      restart: "처음부터 다시",
    },
    route: {
      cityNames: cityNamesKo,
      partyPhrases: {
        couple: "성인 두 명",
        family: "아이와 함께하는 가족",
        parents: "부모님 또는 연세가 있는 분",
        friends: "함께 여행하는 친구들",
        solo: "혼자 여행하는 분",
      },
      familyLabels: {
        classic: "클래식 중국 여행 동선",
        landscape: "자연 풍경 중심 여행 동선",
        food: "미식과 도시의 활기를 담은 여행 동선",
        slow: "여유로운 중국 동부 여행 동선",
      },
      lowerMoveTitle: (family) => `숙소 이동을 줄인 ${family}`,
      lowerMoveSummary: (nights) =>
        `${nights}박 동안 각 지역에 여유 있게 머물며 숙소 이동 횟수를 줄인 여행 동선 초안입니다.`,
      lowerMoveReason: (bases, moves) =>
        `일행과 선호 속도를 고려해 더 넓은 버전 대신 ${bases}개 거점과 도시 간 이동 ${moves}회로 구성했습니다.`,
      secondReason: (party, shortestStay, _pace) =>
        `여행 일행이 ‘${party}’인 점을 고려해 각 거점에 최소 ${shortestStay}박을 배정했습니다. 일자별 일정은 선택한 여행 속도에 맞춰 다시 조정해야 합니다.`,
      lowerMoveTradeoff: (cities) =>
        `숙소 이동을 줄이기 위해 이번 초안에서 제외한 도시: ${cities.join(", ")}. 입출국 공항과 이동 조건을 확인한 뒤 플래너가 이 선택을 다시 검토할 수 있습니다.`,
      commonAssumptions: [
        "정확한 날짜, 입출국 공항, 계절 조건과 교통편 이용 가능 여부는 아직 확인하지 않았습니다.",
        "이 여행 동선 초안에는 예산과 호텔 등급을 아직 반영하지 않았습니다.",
      ],
      partyAssumptions: {
        couple:
          "호텔 등급, 객실 구성, 이동 또는 식사 관련 조건은 아직 확인하지 않았습니다.",
        family:
          "아이의 연령, 생활 리듬과 감당할 수 있는 도보량은 아직 확인하지 않았습니다.",
        parents:
          "도보 가능 거리, 계단, 이동 지원과 휴식 조건은 아직 확인하지 않았습니다.",
        friends:
          "객실 구성, 예산 분담과 각자 보내는 시간이 필요한지는 아직 확인하지 않았습니다.",
        solo:
          "호텔 등급, 혼자 이동하는 데 대한 부담과 필요한 지원 수준은 아직 확인하지 않았습니다.",
      },
    },
  },
};

export const localizedRouteVariantText: Partial<
  Record<
    HomegroundLocale,
    Record<string, Record<string, LocalizedRouteVariantText>>
  >
> = {
  zh: {
    classic: {
      "7": {
        title: "经典中国初游，也能走得从容",
        summary: "从帝都历史到现代城市，用两个重点篇章完成第一次中国之旅。",
        routeReason:
          "7 晚只安排北京 4 晚和上海 3 晚，比硬塞第三座城市更能利用好有限时间。",
        tradeoff:
          "这版有意不安排西安；如果加入，就会变成三个短停留和两次换城。",
      },
      "10": {
        title: "节奏合理的经典初游路线",
        summary: "沿一条清晰的向东路线，串起中国最容易理解的历史脉络。",
        routeReason:
          "10 晚可以分成三个有分量的篇章，不需要安排只住一晚的匆忙停留。",
        tradeoff:
          "这版不加入大山大景和小城，让历史主线不至于变成走马观花的清单。",
      },
      "14": {
        title: "经典路线，再加一段美食篇章",
        summary:
          "第一次来中国的代表性体验之外，成都带来美食、茶馆和更松弛的城市节奏。",
        routeReason:
          "14 晚足以支撑四个不同的落脚城市，并让每一站至少停留 3 晚。",
        tradeoff:
          "这版不安排张家界；加入后会多一次换城，或者迫使每座城市都缩短停留。",
      },
      "18": {
        title: "内容丰富，也留得出呼吸空间的中国初游",
        summary: "历史、美食与一段湖畔慢时光，最后在现代城市收尾。",
        routeReason:
          "18 晚可以容纳五个反差鲜明的落脚城市，又不用依赖只住一两晚的短停留。",
        tradeoff:
          "这是一条覆盖面较广的初游路线；为保护节奏，暂时不安排张家界和云南。",
      },
    },
    landscape: {
      "7": {
        title: "不赶路的张家界之旅",
        summary: "一段山水和一座河畔古城，不把 7 晚变成匆忙的全国打卡。",
        routeReason:
          "山中停留 4 晚、古城停留 3 晚，才能真正把时间留给风景。",
        tradeoff:
          "这版不安排北京、西安和上海；它选择深入一个区域，而不是完成全国景点清单。",
      },
      "10": {
        title: "两段城市体验，加一场真正的大山大景",
        summary:
          "以北京开场、张家界为核心、上海收尾，感受首都、砂岩峰林与现代都市的反差。",
        routeReason:
          "为张家界完整保留 4 晚，同时用北京和上海给整条路线一个清晰的开始和结束。",
        tradeoff:
          "这版不安排西安，因为张家界已经带来更长的交通衔接和第二次换城。",
      },
      "14": {
        title: "经典代表城市，加上张家界",
        summary:
          "在一条清晰的初游路线里，同时看到重要历史与极具辨识度的自然风景。",
        routeReason:
          "14 晚让北京和张家界两个重点篇章各住 4 晚，其余两座城市也各有 3 晚。",
        tradeoff:
          "这版不安排成都；加入后会变成四次换城，并进一步压缩恢复时间。",
      },
      "18": {
        title: "中国历史、美食与砂岩峰林",
        summary:
          "从帝都历史到美食文化、山地风景，最后在上海收尾，完成一趟反差鲜明的旅程。",
        routeReason:
          "18 晚可以安排五个落脚城市，同时仍为张家界保留完整的 4 晚。",
        tradeoff:
          "这版不安排杭州和华东小城；五个落脚城市已经意味着四次换城。",
      },
    },
    food: {
      "7": {
        title: "为美食和夜色出发",
        summary:
          "两座相邻却性格不同的城市，把时间留给街区、一餐一饭和入夜后的城市。",
        routeReason:
          "紧凑的双城路线，能为街区探索和吃饭本身保留足够时间。",
        tradeoff:
          "这版不安排北京和上海；它优先选择区域性的城市生活，而不是代表性名胜。",
      },
      "10": {
        title: "古城街巷、茶馆与立体山城",
        summary:
          "一条中国西部路线，串起历史、美食文化与重庆独特的城市地形。",
        routeReason:
          "10 晚足以安排三座互相补充的西部城市，不需要横跨整个中国。",
        tradeoff:
          "这版不安排北京和上海，把更多时间留给地方美食与城市街巷。",
      },
      "14": {
        title: "从美食与城市读懂更大的中国故事",
        summary: "历史与美食并行，并把更多时间留给成都和重庆。",
        routeReason:
          "14 晚可以支撑四座城市，其中 8 晚完整留给成都与重庆两段美食主线。",
        tradeoff:
          "这版不安排上海；加入后会多一次换城，也会缩短西部城市的停留。",
      },
      "18": {
        title: "深入不同中国城市文化的长线旅程",
        summary: "历史、地方美食、街区生活，最后在现代上海收尾。",
        routeReason:
          "这条路线用 18 晚感受五座中国城市各自的生活气质，而不只看它们有哪些景点。",
        tradeoff:
          "这版不安排杭州和主要自然景区，始终把城市文化放在中心。",
      },
    },
    slow: {
      "7": {
        title: "更柔和的第一次中国之旅",
        summary:
          "一座充满活力的城市，加一个更安静的湖畔落脚点，尽量减少换酒店。",
        routeReason:
          "全程只有一次换城，7 晚中能留下更多晚起和自由安排的时间。",
        tradeoff:
          "这版不安排北京和西安，以较少的帝都历史换取更柔和的旅行节奏。",
      },
      "10": {
        title: "水、园林与在地手艺",
        summary:
          "一条更安静的华东路线，围绕城市氛围、水景与手艺传统展开。",
        routeReason:
          "三个落脚城市能整齐分配 10 晚，并把最长、最慢的一段留给杭州。",
        tradeoff:
          "这版不安排北京和西安；景德镇的具体交通衔接仍需要进一步核对。",
      },
      "14": {
        title: "从首都历史，走进更慢的华东",
        summary:
          "一个重要的历史篇章，加上湖泊、手艺与现代海岸城市，整体保持从容。",
        routeReason:
          "14 晚让北京和杭州各成为 4 晚的重点停留，同时没有任何一站少于 3 晚。",
        tradeoff:
          "这版不安排西安，避免把慢游路线变成五城打卡清单。",
      },
      "18": {
        title: "用更慢的节奏感受中国历史",
        summary:
          "经典历史篇章之外，用湖畔时光与一段手艺之城的停留放慢整趟旅程。",
        routeReason:
          "18 晚让历史主线和两段更安静的华东停留能够同时成立。",
        tradeoff:
          "这版不安排张家界和成都；加入其中任何一座，都会破坏当前的慢节奏。",
      },
    },
  },
  ko: {
    classic: {
      "7": {
        title: "무리하지 않는 중국 핵심 여행",
        summary:
          "황실 역사로 시작해 현대 도시로 마무리하는 집중도 높은 첫 중국 여행입니다.",
        routeReason:
          "7박에 세 번째 도시를 억지로 넣기보다 베이징 4박과 상하이 3박으로 나누는 편이 시간을 더 잘 쓸 수 있습니다.",
        tradeoff:
          "시안은 의도적으로 제외했습니다. 더하면 세 곳 모두 짧게 머물고 도시 간 이동도 두 번 해야 합니다.",
      },
      "10": {
        title: "처음 중국을 위한 클래식 동선, 알맞은 속도로",
        summary:
          "중국의 대표적인 역사 흐름을 따라 동쪽으로 자연스럽게 이동하는 동선입니다.",
        routeReason:
          "10박을 세 구간으로 나누되 어느 도시도 1박만 머무는 경유지가 되지 않도록 했습니다.",
        tradeoff:
          "역사 여행이 명소 체크리스트가 되지 않도록 산악 지역과 소도시는 제외했습니다.",
      },
      "14": {
        title: "미식 한 장을 더한 클래식 동선",
        summary:
          "첫 중국 여행의 대표 명소에 청두의 음식, 찻집, 한결 부드러운 도시 리듬을 더합니다.",
        routeReason:
          "14박이면 서로 다른 네 거점을 두면서도 각 도시에 최소 3박을 머물 수 있습니다.",
        tradeoff:
          "장자제는 제외했습니다. 더하면 도시 간 이동이 한 번 늘거나 모든 도시의 체류가 짧아집니다.",
      },
      "18": {
        title: "여유를 남긴 폭넓은 첫 중국 여행",
        summary:
          "역사와 미식을 지나 호숫가에서 속도를 늦춘 뒤 현대 도시에서 마무리합니다.",
        routeReason:
          "18박이면 한두 밤짜리 짧은 경유 없이 서로 다른 다섯 거점에 머물 수 있습니다.",
        tradeoff:
          "중국의 여러 모습을 폭넓게 보는 동선이지만, 속도를 지키기 위해 장자제와 윈난은 제외했습니다.",
      },
    },
    landscape: {
      "7": {
        title: "서두르지 않고 만나는 장자제",
        summary:
          "전국의 명소를 급하게 훑는 대신 한 산악 지역과 강변 고성 한 곳에 집중합니다.",
        routeReason:
          "장자제 4박과 펑황 3박을 배정해 풍경을 충분히 만날 시간을 지킵니다.",
        tradeoff:
          "베이징, 시안, 상하이는 제외했습니다. 전국 일주보다 한 지역을 깊게 보는 선택입니다.",
      },
      "10": {
        title: "두 도시와 한 번의 압도적인 자연",
        summary:
          "수도와 사암 봉우리, 상하이의 대비를 중심으로 구성한 첫 중국 여행입니다.",
        routeReason:
          "자연을 위해 4박을 확보하고, 베이징과 상하이가 여행의 시작과 끝을 분명하게 잡아 줍니다.",
        tradeoff:
          "장자제가 긴 이동과 두 번째 도시 간 이동을 만들기 때문에 시안은 제외했습니다.",
      },
      "14": {
        title: "대표 명소에 장자제를 더한 동선",
        summary:
          "중국의 대표적인 역사와 압도적인 자연 풍경을 하나의 첫 여행에 담습니다.",
        routeReason:
          "14박 중 깊게 볼 베이징과 장자제에는 각각 4박, 나머지 도시에는 각각 3박을 둡니다.",
        tradeoff:
          "청두는 제외했습니다. 더하면 도시 간 이동이 네 번으로 늘고 회복할 시간이 줄어듭니다.",
      },
      "18": {
        title: "중국의 역사와 미식, 사암 봉우리를 잇는 여행",
        summary:
          "황실 역사에서 음식 문화, 산악 풍경, 해안 도시까지 큰 대비를 만나는 여행입니다.",
        routeReason:
          "18박이면 다섯 거점에 머물면서도 장자제에 4박을 온전히 확보할 수 있습니다.",
        tradeoff:
          "항저우와 중국 동부의 소도시는 제외했습니다. 다섯 거점만으로도 도시 간 이동이 이미 네 번입니다.",
      },
    },
    food: {
      "7": {
        title: "미식과 밤의 에너지를 따라",
        summary:
          "서로 가까우면서도 분위기가 다른 두 도시에서 동네와 식사, 저녁 시간을 즐깁니다.",
        routeReason:
          "두 도시에 집중해 동네를 걷고 식사를 경험할 시간을 충분히 남깁니다.",
        tradeoff:
          "베이징과 상하이는 제외했습니다. 대표 명소보다 지역의 도시 생활을 우선한 동선입니다.",
      },
      "10": {
        title: "옛 거리, 찻집, 입체적인 도시 풍경",
        summary:
          "역사와 음식 문화, 충칭의 독특한 도시 풍경을 잇는 중국 서부 동선입니다.",
        routeReason:
          "전국을 가로지르지 않고도 서로 잘 어울리는 중국 서부의 세 도시를 10박에 경험할 수 있습니다.",
        tradeoff:
          "음식 문화와 지역의 거리에 더 오래 머물기 위해 베이징과 상하이는 제외했습니다.",
      },
      "14": {
        title: "중국의 큰 이야기를 음식과 도시로",
        summary:
          "역사와 미식을 함께 따라가되 청두와 충칭에 더 많은 시간을 둡니다.",
        routeReason:
          "14박으로 네 도시를 잇고, 주요 미식 구간인 청두와 충칭에 총 8박을 배정합니다.",
        tradeoff:
          "상하이는 제외했습니다. 더하면 도시 간 이동이 네 번으로 늘고 중국 서부 체류가 짧아집니다.",
      },
      "18": {
        title: "중국 도시 문화를 깊게 잇는 여행",
        summary:
          "역사, 지역 음식, 동네의 일상과 현대적인 해안 도시의 마무리를 함께 경험합니다.",
        routeReason:
          "18박을 활용해 다섯 도시의 명소뿐 아니라 도시마다 다른 분위기까지 느낄 수 있도록 했습니다.",
        tradeoff:
          "항저우와 주요 자연 지역은 제외했습니다. 이 동선은 도시 문화를 중심에 둡니다.",
      },
    },
    slow: {
      "7": {
        title: "한결 여유로운 중국의 첫 일주일",
        summary:
          "활기찬 도시 한 곳과 차분한 호숫가 거점 한 곳을 연결해 숙소 이동을 최소화합니다.",
        routeReason:
          "도시 간 이동이 한 번뿐이어서 7박 중 더 많은 시간을 느긋한 아침과 자유 시간에 쓸 수 있습니다.",
        tradeoff:
          "베이징과 시안은 제외했습니다. 황실 역사보다 부드러운 여행 리듬을 선택한 동선입니다.",
      },
      "10": {
        title: "물과 정원, 지역 공예를 따라",
        summary:
          "물가의 분위기와 지역의 만드는 전통을 중심으로 한 차분한 중국 동부 여행입니다.",
        routeReason:
          "세 번의 체류로 10박을 깔끔하게 나누고, 가장 느린 구간인 항저우에 4박을 둡니다.",
        tradeoff:
          "베이징과 시안은 제외했습니다. 징더전으로 이동하는 교통편은 실제 일정에 맞춰 추가로 확인해야 합니다.",
      },
      "14": {
        title: "수도에서 시작해 천천히 만나는 중국 동부",
        summary:
          "대표적인 역사 구간 하나에 호수와 공예, 해안 도시의 마무리를 차분하게 연결합니다.",
        routeReason:
          "베이징과 항저우에 각각 4박을 확보하고, 어느 도시도 3박보다 짧지 않게 구성했습니다.",
        tradeoff:
          "느린 여행이 다섯 도시 체크리스트가 되지 않도록 시안은 제외했습니다.",
      },
      "18": {
        title: "느린 호흡으로 만나는 중국의 역사",
        summary:
          "중국의 핵심 역사에 호숫가의 시간과 공예 중심의 체류를 더해 속도를 낮춥니다.",
        routeReason:
          "18박이면 대표적인 역사 구간과 중국 동부의 조용한 두 체류를 함께 둘 수 있습니다.",
        tradeoff:
          "장자제와 청두는 제외했습니다. 둘 중 하나라도 더하면 느린 여행 리듬을 지키기 어렵습니다.",
      },
    },
  },
};

export function getHomegroundCopy(locale: HomegroundLocale): HomegroundCopy {
  return homegroundCopy[locale];
}

export function localePath(locale: HomegroundLocale): string {
  return homegroundCopy[locale].path;
}
