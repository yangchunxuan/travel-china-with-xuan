import type { HomegroundLocale } from "./homegroundI18n";

interface Section {
  id: string;
  title: string;
  lead?: string;
  paragraphs: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

interface SourceLink {
  label: string;
  url: string;
}

export interface SingaporeChinaVisaCopy {
  htmlLang: string;
  homePath: string;
  guidesPath: string;
  skipLink: string;
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbGuides: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  title: string;
  directAnswer: string;
  directAnswerTail: string;
  heroAlt: string;
  heroCaption: string;
  sections: Section[];
  reviewTitle: string;
  reviewBody: string;
  reviewBoundary: string;
  sourcesLabel: string;
  sources: SourceLink[];
  faqTitle: string;
  faq: FaqItem[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaAction: string;
  relatedTitle: string;
  relatedLinks: { id: string; label: string; description: string }[];
  updatedLabel: string;
  updatedDate: string;
  schemaAbout: string[];
}

const sources: SourceLink[] = [
  {
    label:
      "Singapore ICA — Mutual 30-day visa-exemption arrangement between Singapore and China",
    url: "https://www.ica.gov.sg/news-and-publications/newsroom/media-release/mutual-30-day-visa-exemption-arrangement-between-singapore-and-the-people-s-republic-of-china",
  },
  {
    label: "Chinese Embassy in Singapore — visa-free entry FAQ",
    url: "https://sg.china-embassy.gov.cn/eng/lsfwx/zytz/202511/t20251112_11751424.htm",
  },
];

// Singapore is an English-first market. The reader searches and plans in
// English, so the same English copy serves every locale route: the page stays
// discoverable under /zh and /ko without shipping a translation nobody in this
// market would search for.
const englishCopy: Omit<SingaporeChinaVisaCopy, "htmlLang" | "homePath" | "guidesPath"> = {
  skipLink: "Skip to the guide",
  breadcrumbLabel: "Breadcrumb",
  breadcrumbHome: "Home",
  breadcrumbGuides: "Guides",
  breadcrumbCurrent: "Singapore passport: China visa",
  eyebrow: "Entry guide · Singapore",
  title: "You Don't Need a China Visa. Here's the Harder Question.",
  directAnswer:
    "A Singapore passport enters China visa-free for up to 30 days — tourism, business or visiting family, no application, no fee. The two governments waived it for each other in February 2024, and it covers ordinary passports across mainland China.",
  directAnswerTail:
    "So the visa is settled in one paragraph. The question that actually decides your trip is the one no embassy page will answer: what do you do with up to 30 days?",
  heroAlt:
    "Sandstone pillars layered into a deep green valley in Zhangjiajie National Forest Park.",
  heroCaption:
    "Thirty days, no visa. The real planning starts here — not at the consulate.",
  sections: [
    {
      id: "the-visa-part",
      title: "The visa part, in full",
      lead: "There is genuinely not much to it.",
      paragraphs: [
        "Under the mutual arrangement in force since 9 February 2024, a Singapore ordinary passport enters mainland China visa-free for up to 30 days. It covers tourism, business, visiting family or friends, exchanges and transit. The clock is counted from 00:00 on the day after you enter — so the day you land is effectively free — and each entry gets its own 30 days, with no cumulative cap on multiple visits.",
        "What it does not cover: work, study and journalism still need the matching visa, and so does any single stay beyond 30 days. Carry a passport valid for your stay, and since November 2025 fill in the online Arrival Card before you land. That is the whole checklist.",
        "That is why this page spends one section on the visa and the rest on the part that actually goes wrong.",
      ],
    },
    {
      id: "thirty-days",
      title: "Thirty days is not as much as it sounds",
      lead: "It is the ceiling, not the plan.",
      paragraphs: [
        "A Singapore traveller used to weekend cities reads “30 days” as room to spare. Then the trip meets the size of China. Beijing to Zhangjiajie is a flight, not a train hop. Adding Xi'an or Chengdu means another internal sector and another hotel. A single well-chosen region can fill a week at an unhurried pace before you have repeated a single view.",
        "The travellers who run out of trip are usually the ones who treated the visa as the hard part and the itinerary as an afterthought — booking the flights first, then discovering that three cities and a set of elderly parents do not fit the days the way the map suggested.",
        "The 30 days remove the barrier. They do not design the route.",
      ],
    },
    {
      id: "who-this-suits",
      title: "The trips this policy quietly favours",
      paragraphs: [
        "The visa waiver is most useful to the Singapore trips that were always going to be a little complex. A multi-generational family where the pace has to suit both a grandparent and a teenager. A return to an ancestral region that pairs a big city with somewhere smaller and harder to reach. A first proper China trip for a couple who have done the short-haul cities and want one unhurried fortnight instead of three rushed days.",
        "None of those is decided by the entry stamp. They are decided by the order of the cities, how the internal flights and rail connect, where you base yourself, and how much you leave out so the days still feel like a holiday.",
      ],
    },
  ],
  reviewTitle: "Written and checked",
  reviewBody:
    "Homeground is an independent China trip-planning studio with our own ground team. The visa facts on this page come from Singapore's ICA and the Chinese Embassy in Singapore, checked 24 July 2026. Entry rules change; we re-check at least every 90 days.",
  reviewBoundary:
    "We plan the China trip inside the time the policy gives you. We are not a visa agency and do not file applications.",
  sourcesLabel: "Official sources",
  sources,
  faqTitle: "Questions",
  faq: [
    {
      question: "Do Singaporeans need a visa for China in 2026?",
      answer:
        "No, for stays up to 30 days for tourism, business, visiting family or friends, exchanges or transit. Work, study, journalism or a stay beyond 30 days still need the appropriate visa.",
    },
    {
      question: "How are the 30 days counted?",
      answer:
        "From 00:00 on the day after you enter, for 30 calendar days. The arrival day itself does not count against the limit, and each entry gets a fresh 30 days.",
    },
    {
      question: "Does it cover all of mainland China?",
      answer:
        "Yes. Unlike the transit policy, the mutual exemption is a normal visa-free entry — you are not tied to designated ports or permitted areas, and you can travel the mainland as any visa holder would.",
    },
    {
      question: "Do I still need to do anything before flying?",
      answer:
        "Carry a passport valid for your stay and complete the online China Arrival Card, required since November 2025. That is all.",
    },
  ],
  ctaEyebrow: "The visa was the easy part",
  ctaTitle: "Now for the thirty days.",
  ctaBody:
    "Tell us who is travelling, roughly when, and the places on your list. We will tell you what genuinely fits at an unhurried pace, which city order makes the internal flights work, and what to leave for next time. Especially if you are travelling with parents or across generations, the route is where a China trip is won or lost.",
  ctaAction: "Start a trip conversation",
  relatedTitle: "Where to start planning",
  relatedLinks: [
    {
      id: "beijing-zhangjiajie-shanghai-10-days",
      label: "Beijing, Zhangjiajie and Shanghai in 10 days",
      description: "Whether three signature places really fit into one trip.",
    },
    {
      id: "is-your-china-itinerary-too-rushed",
      label: "Is your China itinerary too rushed?",
      description: "The test that matters once the visa is off the table.",
    },
    {
      id: "zhangjiajie-older-travellers",
      label: "Zhangjiajie with older travellers",
      description: "If the trip includes parents, start here.",
    },
  ],
  updatedLabel: "Updated",
  updatedDate: "24 July 2026",
  schemaAbout: [
    "China visa policy",
    "Singapore passport",
    "China travel planning",
    "Visa-free entry",
  ],
};

const copies: Record<HomegroundLocale, SingaporeChinaVisaCopy> = {
  en: { htmlLang: "en", homePath: "/", guidesPath: "/guides/", ...englishCopy },
  zh: {
    htmlLang: "en",
    homePath: "/zh/",
    guidesPath: "/zh/guides/",
    ...englishCopy,
  },
  ko: {
    htmlLang: "en",
    homePath: "/ko/",
    guidesPath: "/ko/guides/",
    ...englishCopy,
  },
};

export function getSingaporeChinaVisaCopy(
  locale: HomegroundLocale,
): SingaporeChinaVisaCopy {
  return copies[locale];
}
