export interface NightShowGuideCopy {
  htmlLang: string;
  homePath: string;
  skipLink: string;
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  hero: {
    eyebrow: string;
    title: string;
    titleNoBreak?: string;
    lead: string;
    quickLabel: string;
    quickTitle: string;
    quickBody: string;
    figureAlt: string;
    figureCaption: string;
    checkedLabel: string;
    checkedDate: string;
  };
  decisions: readonly {
    label: string;
    title: string;
    detail: string;
  }[];
  comparison: {
    sectionLabel: string;
    title: string;
    intro: string;
    rowLabels: {
      format: string;
      base: string;
      chooseFor: string;
      mainRisk: string;
    };
    shows: readonly {
      name: string;
      format: string;
      base: string;
      chooseFor: string;
      mainRisk: string;
    }[];
    boundary: string;
  };
  need: {
    sectionLabel: string;
    title: string;
    intro: string;
    skipTitle: string;
    skipPoints: readonly string[];
    conclusion: string;
  };
  wholeEvening: {
    sectionLabel: string;
    title: string;
    intro: string;
    columnLabels: {
      setup: string;
      nextDay: string;
      judgement: string;
    };
    rows: readonly {
      setup: string;
      nextDay: string;
      judgement: string;
    }[];
    insight: string;
  };
  hotelBase: {
    sectionLabel: string;
    title: string;
    introBeforeLink: string;
    itineraryLink: string;
    introAfterLink: string;
    downtown: {
      name: string;
      role: string;
      detail: string;
    };
    wulingyuan: {
      name: string;
      role: string;
      detail: string;
    };
    transfer: string;
  };
  shows: {
    sectionLabel: string;
    title: string;
    intro: string;
    bestFitLabel: string;
    thinkTwiceLabel: string;
    verifyLabel: string;
    routeViewLabel: string;
    items: readonly {
      id: "tianmen-fox-fairy" | "charming-xiangxi" | "eternal-love";
      number: string;
      name: string;
      format: string;
      description: string;
      bestFit: readonly string[];
      thinkTwice: readonly string[];
      verify: string;
      routeView: string;
    }[];
  };
  qilou: {
    sectionLabel: string;
    title: string;
    body: string;
    note: string;
  };
  evening: {
    sectionLabel: string;
    title: string;
    intro: string;
    steps: readonly string[];
    formula: string;
    conclusion: string;
    ctaTitle: string;
    ctaBody: string;
    ctaAction: string;
    ctaNote: string;
  };
  checklist: {
    sectionLabel: string;
    title: string;
    intro: string;
    items: readonly {
      number: string;
      title: string;
      detail: string;
    }[];
    handoff: string;
  };
  related: {
    label: string;
    title: string;
    body: string;
    itineraryAction: string;
    routeAction: string;
  };
  faq: {
    sectionLabel: string;
    title: string;
    items: readonly {
      question: string;
      answer: string;
    }[];
  };
  research: {
    hiddenTitle: string;
    disclosureTitle: string;
    summary: string;
    intro: string;
    boundary: string;
    sourceNames: readonly string[];
  };
  finalCta: {
    sectionLabel: string;
    title: string;
    body: string;
    action: string;
    note: string;
  };
  structuredData: {
    homeName: string;
    aboutName: string;
    mentions: readonly string[];
  };
}
