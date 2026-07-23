export interface TenDayGuideCopy {
  htmlLang: string;
  brandAriaLabel: string;
  brandTagline: string;
  skipLink: string;
  navigation: {
    primaryLabel: string;
    languageLabel: string;
    planning: string;
    studio: string;
    questions: string;
    cta: string;
  };
  breadcrumb: {
    label: string;
    home: string;
    current: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    lead: string;
    quickLabel: string;
    quickTitle: string;
    hotelNights: string;
    fullSightseeingDays: string;
    quickBody: string;
    routeLabel: string;
    planLabel: string;
    planUnit: string;
    planDays: readonly [string, string, string];
    places: readonly [string, string, string];
    editorialNote: string;
  };
  definition: {
    label: string;
    title: string;
    intro: string;
    counts: readonly {
      number: string;
      title: string;
      detail: string;
      note: string;
      featured: boolean;
    }[];
    planningRule: string;
  };
  length: {
    label: string;
    title: string;
    intro: string;
    recommendTag: string;
    options: readonly {
      nights: string;
      days: string;
      split: string;
      verdict: string;
      detail: string;
      recommended: boolean;
    }[];
  };
  calendar: {
    label: string;
    title: string;
    intro: string;
    items: readonly {
      day: string;
      place: string;
      itemLabel: string;
      kind: "edge" | "full" | "transfer";
    }[];
    summary: readonly {
      number: string;
      label: string;
    }[];
  };
  tradeoffs: {
    label: string;
    title: string;
    intro: string;
    fullDays: string;
    cities: readonly {
      number: string;
      city: string;
      promise: string;
      cost: string;
    }[];
    zhangjiajieLink: string;
  };
  diagnostic: {
    label: string;
    title: string;
    intro: string;
    imageAlt: string;
    imageLabel: string;
    imageCaption: string;
    decisions: readonly {
      title: string;
      question: string;
      consequence: string;
    }[];
  };
  transfer: {
    label: string;
    title: string;
    intro: string;
    imageAlt: string;
    imageLabel: string;
    imageCaption: string;
    formulaLabel: string;
    steps: readonly string[];
    directionTitle: string;
    directionBody: string;
    plannerLink: string;
  };
  fit: {
    label: string;
    title: string;
    worksHeading: string;
    longerHeading: string;
    worksWhen: readonly string[];
    chooseLongerWhen: readonly string[];
  };
  questions: {
    label: string;
    title: string;
    intro: string;
    items: readonly {
      question: string;
      detail: string;
    }[];
  };
  trust: {
    label: string;
    title: string;
    intro: string;
    imageAlt: string;
    imageCaption: string;
    methods: readonly {
      title: string;
      detail: string;
    }[];
    boundary: string;
  };
  faq: {
    label: string;
    title: string;
    items: readonly {
      question: string;
      answer: string;
    }[];
  };
  cta: {
    label: string;
    title: string;
    intro: string;
    button: string;
    note: string;
  };
  source: {
    summary: string;
    intro: string;
    links: readonly [string, string, string, string];
    releaseNote: string;
  };
  footer: {
    navigationLabel: string;
    zhangjiajieGuide: string;
    privacy: string;
    cta: string;
    copyright: (year: number) => string;
  };
}
