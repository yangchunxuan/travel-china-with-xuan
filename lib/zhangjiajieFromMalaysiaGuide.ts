import type { GuideId } from "./guideRegistry";

export const malaysiaZhangjiajieGuideId =
  "zhangjiajie-from-malaysia" as const;

export const MALAYSIA_ZHANGJIAJIE_IMAGE_ROOT =
  "/images/guides/zhangjiajie-from-malaysia";

export const MALAYSIA_ZHANGJIAJIE_SOURCES = [
  {
    id: "visa",
    category: "official",
    url: "https://my.china-embassy.gov.cn/eng/fwzc/lsyw/qz/202508/t20250801_11681401.htm",
  },
  {
    id: "malaysia-airlines-changsha",
    category: "official",
    url: "https://www.malaysiaaviationgroup.com.my/en/MAG-media-centre/news-releases/2026/shenzhen-changsha-route-launch.html",
  },
  {
    id: "airasia-changsha",
    category: "official",
    url: "https://newsroom.airasia.com/news/airasia-x-resumes-services-to-changsha-reconnecting-kuala-lumpur-with-the-capital-and-largest-city-of-hunan-province",
  },
  {
    id: "airasia-changsha-booking",
    category: "official",
    url: "https://www.airasia.com/flights/from-kuala-lumpur-kul-to-changsha-csx/",
  },
  {
    id: "kuala-lumpur-zhangjiajie-launch",
    category: "official",
    url: "https://enghunan.gov.cn/hneng/News/Localnews/202310/t20231017_31693142.html",
  },
  {
    id: "railway-12306",
    category: "official",
    url: "https://www.12306.cn/en/faq.html?item=2",
  },
  {
    id: "zhangjiajie-tourist-buses",
    category: "official",
    url: "https://enghunan.gov.cn/hneng/News/Localnews/202404/t20240420_33281425.html",
  },
  {
    id: "wulingyuan-tickets",
    category: "official",
    url: "https://fgw.hunan.gov.cn/fgw/jgzc11/202507/t20250724_33748635.html",
  },
  {
    id: "china-visitor-guide",
    category: "official",
    url: "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
  },
  {
    id: "touch-n-go-china",
    category: "official",
    url: "https://www.touchngo.com.my/consumer/payments/cross-border-payments/",
  },
  {
    id: "jakim-halal-guide",
    category: "official",
    url: "https://www.halal.gov.my/index.php?data=bW9kdWxlcy9jb2xsYXBzaWJsZV9jb250ZW50Ozs7Ow%3D%3D&utama=panduan&view=%27",
  },
  {
    id: "tripadvisor-private-reviews",
    category: "completed",
    url: "https://www.tripadvisor.com.sg/Attraction_Review-g494933-d12395549-Reviews-Zhangjiajie_Travel_Service-Zhangjiajie_Hunan.html",
  },
  {
    id: "minhakim-trip-account",
    category: "completed",
    url: "https://minhakimtravels.com/memori-zhangjiajie-fenghuang-7h5m/",
  },
  {
    id: "sj-echo-trip-account",
    category: "completed",
    url: "https://sjecho.com.my/community/a-trip-to-chongqing-and-zhangjiajie/",
  },
  {
    id: "mayflower-private-tour",
    category: "market",
    url: "https://www.mayflower.com.my/ground-package/5d4n-zhangjiajie-private-tour-nature-s-masterpiece-in-luxury",
  },
  {
    id: "koiman-package",
    category: "market",
    url: "https://travel4u.my/international/land-of-avatar-zhangjiajie/",
  },
  {
    id: "apple-package",
    category: "market",
    url: "https://applevacations.my/en/tour.php?pckg_id=7455&sectorlocation=14",
  },
] as const;

export type MalaysiaZhangjiajieSourceCategory =
  (typeof MALAYSIA_ZHANGJIAJIE_SOURCES)[number]["category"];

export type MalaysiaZhangjiajieSourceId =
  (typeof MALAYSIA_ZHANGJIAJIE_SOURCES)[number]["id"];

interface GuideLeg {
  id: string;
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  pullQuote?: string;
  sourceIds?: readonly MalaysiaZhangjiajieSourceId[];
}

interface CopyCard {
  title: string;
  body: string;
}

interface CopyCardWithList extends CopyCard {
  label?: string;
  items: readonly string[];
}

interface CitedParagraph {
  text: string;
  sourceIds: readonly MalaysiaZhangjiajieSourceId[];
}

export interface MalaysiaZhangjiajieGuideCopy {
  htmlLang: string;
  homePath: string;
  studioPath: string;
  skipLink: string;
  breadcrumb: {
    label: string;
    home: string;
    guides: string;
    current: string;
  };
  toc: {
    label: string;
    items: readonly { href: string; label: string }[];
  };
  hero: {
    eyebrow: string;
    titleParts: readonly string[];
    lead: string;
    anchor: string;
    byLabel: string;
    authorName: string;
    reviewedLabel: string;
    reviewedDate: string;
    localNote: string;
  };
  direct: {
    label: string;
    title: string;
    body: string;
    journeys: readonly [CopyCard, CopyCard, CopyCard];
    conclusion: string;
  };
  journey: {
    label: string;
    title: string;
    intro: string;
    routeSummary: string;
    ariaLabel: string;
    nodes: readonly { place: string; role: string }[];
    legs: readonly GuideLeg[];
    dynamicLabel: string;
    dynamicNote: string;
  };
  responsibility: {
    label: string;
    title: string;
    intro: string;
    ariaLabel: string;
    columns: readonly [string, string, string];
    rows: readonly [string, string, string][];
    closing: string;
  };
  evidence: {
    label: string;
    title: string;
    intro: string;
    paragraphs: readonly CitedParagraph[];
    lessons: readonly string[];
    boundary: string;
  };
  bases: {
    label: string;
    title: string;
    intro: string;
    ariaLabel: string;
    items: readonly (CopyCard & { place: string; role: string })[];
    closing: string;
    disclaimer: string;
  };
  people: {
    label: string;
    title: string;
    intro: string;
    questionTitle: string;
    questions: readonly string[];
    actionTitle: string;
    actions: readonly string[];
    closing: string;
  };
  meals: {
    label: string;
    title: string;
    intro: string;
    questions: readonly string[];
    paragraphs: readonly CitedParagraph[];
    note: string;
  };
  weather: {
    label: string;
    title: string;
    intro: string;
    actions: readonly string[];
    closing: readonly string[];
  };
  selfBooking: {
    label: string;
    title: string;
    intro: string;
    profiles: readonly CopyCardWithList[];
  };
  duration: {
    label: string;
    title: string;
    intro: string;
    days: readonly string[];
    explanation: readonly string[];
    formula: string;
    relatedGuideId: GuideId;
    relatedLabel: string;
    relatedDescription: string;
  };
  models: {
    label: string;
    title: string;
    intro: string;
    ariaLabel: string;
    cards: readonly CopyCardWithList[];
    closing: string;
  };
  preDeparture: {
    label: string;
    title: string;
    paragraphs: readonly CitedParagraph[];
    warningLabel: string;
    warning: string;
  };
  cta: {
    label: string;
    title: string;
    body: string;
    prompt: string;
    items: readonly string[];
    action: string;
    note: string;
    formNote: string;
  };
  methodology: {
    label: string;
    title: string;
    paragraphs: readonly string[];
    dynamicNote: string;
  };
  related: {
    label: string;
    title: string;
    items: readonly {
      guideId: GuideId;
      label: string;
      description: string;
    }[];
    allGuides: string;
  };
  sources: {
    title: string;
    intro: string;
    categoryLabels: Record<MalaysiaZhangjiajieSourceCategory, string>;
    labels: Record<MalaysiaZhangjiajieSourceId, string>;
    inlineLabel: string;
    externalLabel: string;
  };
  images: {
    heroAlt: string;
    heroCaption: string;
    entranceAlt: string;
    entranceCaption: string;
  };
  structuredData: {
    description: string;
    about: readonly string[];
    audience: string;
  };
}
