import type { GuideId } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import { getPublishedPrivateTourCatalog } from "./publishedPrivateTourCatalog.ts";
import { buildRouteServiceContactHref } from "./routeServiceInterest.ts";
import { privateTourCardImageSource, privateTourCardImageSrcSet } from "../components/privateTourCardImages.ts";

/**
 * The single in-article sales card for guides whose readers cannot be sent to
 * a fixed product as if it already fitted them. Three meanings, never mixed:
 *
 * - private-tour-product: one named route that the article is genuinely about.
 * - private-tour-collection: the published tour list, for articles that cover
 *   several cities or a question (a visa) that does not choose a destination.
 * - trip-consultation: the planner, for needs (access, hotel rooms) that have
 *   to be checked before any route can be offered.
 *
 * None of this copy may say a route, room or vehicle has already been checked
 * for access, children or older travellers. That is what the enquiry is for.
 */
export type GuideSalesCardKind =
  | "private-tour-product"
  | "private-tour-collection"
  | "trip-consultation";

export type GuideSalesCardImageKey =
  | "beijing-tour-photo"
  | "wheelchair-guide-photo"
  | "hotel-guide-photo";

export interface GuideSalesCardData {
  readonly kind: GuideSalesCardKind;
  /** Product slug, `private-tours` or the planner service id. */
  readonly ctaId: string;
  readonly label: string;
  readonly title: string;
  readonly note?: string;
  readonly action: string;
  readonly href: string;
  readonly image: {
    readonly src: string;
    readonly srcSet: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  };
}

interface CardCopy {
  readonly label: string;
  readonly title: string;
  readonly note?: string;
  readonly action: string;
}

type LocalizedCardCopy = Readonly<Record<HomegroundLocale, CardCopy>>;

type GuideSalesCardPlan =
  | {
      readonly kind: "private-tour-product";
      readonly productId: "zhangjiajie-4-day-private-tour";
      readonly copy: LocalizedCardCopy;
    }
  | {
      readonly kind: "private-tour-collection";
      readonly image: GuideSalesCardImageKey;
      readonly copy: LocalizedCardCopy;
    }
  | {
      readonly kind: "trip-consultation";
      readonly serviceId: "full-trip-support";
      readonly image: GuideSalesCardImageKey;
      readonly copy: LocalizedCardCopy;
    };

export const privateTourCollectionCtaId = "private-tours";

const sharedImages: Record<
  GuideSalesCardImageKey,
  {
    readonly productId?: string;
    readonly src?: string;
    readonly width?: number;
    readonly height?: number;
    readonly alt?: Readonly<Record<HomegroundLocale, string>>;
  }
> = {
  "beijing-tour-photo": {
    productId: "beijing-highlights-5-day-private-tour",
  },
  "wheelchair-guide-photo": {
    src: "/images/guides/wheelchair-accessible-china-route-planning/hero-1600.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "The ramp beside stairs at Beijing Subway Beiyuan Station Exit A, showing one access node rather than an accessible route guarantee",
      zh: "北京地铁北苑站 A 口楼梯旁的坡道，仅展示一个无障碍节点，不代表整条路线可达",
      ko: "베이징 지하철 베이위안역 A출구 계단 옆 경사로로, 전체 동선 보장이 아닌 한 접근성 지점만 보여 준다",
    },
  },
  "hotel-guide-photo": {
    src: "/images/guides/china-accessible-hotel-room-verification/hero-1600.webp",
    width: 1600,
    height: 1000,
    alt: {
      en: "The entrance approach and doors at Ji Hotel Nanxieyu Street in Suzhou; the photograph alone does not verify room accessibility",
      zh: "苏州南斜峪街全季酒店的入口通道与门；单凭照片不能核实客房无障碍条件",
      ko: "쑤저우 난셰위제 지호텔의 진입부와 출입문으로, 사진만으로 객실 접근성을 확인할 수는 없다",
    },
  },
};

const collectionAction = {
  en: "Compare private tours",
  zh: "查看私家路线",
  ko: "프라이빗 일정 보기",
} as const;

const consultationAction = {
  en: "Ask a trip planner",
  zh: "咨询旅行规划师",
  ko: "여행 플래너에게 문의",
} as const;

const collectionLabel = {
  en: "Published private tours",
  zh: "已发布的私家路线",
  ko: "공개된 프라이빗 일정",
} as const;

const defaultCollectionCopy: LocalizedCardCopy = {
  en: {
    label: "Private China tours",
    title: "Explore our private China itineraries",
    action: "View itineraries",
  },
  zh: {
    label: "中国私家路线",
    title: "查看我们的中国私人行程",
    action: "查看行程",
  },
  ko: {
    label: "중국 프라이빗 일정",
    title: "중국 프라이빗 일정을 살펴보세요",
    action: "일정 보기",
  },
};

const consultationLabel = {
  en: "Private trip planning",
  zh: "私人行程规划",
  ko: "프라이빗 여행 상담",
} as const;

export const guideSalesCardPlans = {
  "zhangjiajie-older-travellers": {
    kind: "private-tour-product",
    productId: "zhangjiajie-4-day-private-tour",
    copy: {
      en: {
        label: "Related private route",
        title: "Related 4-day Zhangjiajie private route",
        note: "Actual walking, steps and daily pace are adjusted after confirmation.",
        action: "View itinerary",
      },
      zh: {
        label: "相关私家路线",
        title: "相关的张家界四日私家路线",
        note: "实际步行、台阶和每日节奏会在确认后调整。",
        action: "查看行程",
      },
      ko: {
        label: "관련 프라이빗 일정",
        title: "관련 장자제 4일 프라이빗 일정",
        note: "실제 도보 거리, 계단, 하루 일정 속도는 확인 후 조정합니다.",
        action: "일정 보기",
      },
    },
  },
  "china-itinerary-with-older-parents": {
    kind: "private-tour-collection",
    image: "beijing-tour-photo",
    copy: {
      en: {
        label: collectionLabel.en,
        title: "Private China tours for families travelling with parents",
        action: collectionAction.en,
      },
      zh: {
        label: collectionLabel.zh,
        title: "适合全家同行参考的中国私家路线",
        action: collectionAction.zh,
      },
      ko: {
        label: collectionLabel.ko,
        title: "부모님과 함께 비교할 수 있는 중국 프라이빗 일정",
        action: collectionAction.ko,
      },
    },
  },
  "china-itinerary-with-young-children": {
    kind: "private-tour-collection",
    image: "beijing-tour-photo",
    copy: {
      en: {
        label: collectionLabel.en,
        title: "Start with our published private China tours",
        note: "When you enquire, the route is adjusted for your children's ages, naps and walking.",
        action: collectionAction.en,
      },
      zh: {
        label: collectionLabel.zh,
        title: "先查看现有的中国私家路线",
        note: "咨询时再根据孩子的年龄、午休和步行能力调整。",
        action: collectionAction.zh,
      },
      ko: {
        label: collectionLabel.ko,
        title: "먼저 공개된 중국 프라이빗 일정을 살펴보세요",
        note: "문의하시면 아이의 나이, 낮잠 시간, 걷는 힘에 맞춰 일정을 조정합니다.",
        action: collectionAction.ko,
      },
    },
  },
  "do-singaporeans-need-visa-china": {
    kind: "private-tour-collection",
    image: "beijing-tour-photo",
    copy: {
      en: {
        label: collectionLabel.en,
        title: "Visa question settled? Continue with private China itineraries",
        action: collectionAction.en,
      },
      zh: {
        label: collectionLabel.zh,
        title: "签证问题确认后，可以继续查看中国私人行程",
        action: collectionAction.zh,
      },
      ko: {
        label: collectionLabel.ko,
        title: "비자 확인이 끝났다면 중국 프라이빗 일정을 이어서 살펴보세요",
        action: collectionAction.ko,
      },
    },
  },
  "wheelchair-accessible-china-route-planning": {
    kind: "trip-consultation",
    serviceId: "full-trip-support",
    image: "wheelchair-guide-photo",
    copy: {
      en: {
        label: consultationLabel.en,
        title: "Plan a private trip around your access needs",
        note: "Sites, vehicles, hotels and real access conditions are checked one by one before we quote.",
        action: consultationAction.en,
      },
      zh: {
        label: consultationLabel.zh,
        title: "按你的行动需求规划私人行程",
        note: "景点、车辆、酒店和实际通行条件会在报价前逐项核实。",
        action: consultationAction.zh,
      },
      ko: {
        label: consultationLabel.ko,
        title: "이동 편의 요구에 맞춘 프라이빗 여행 상담",
        note: "명소, 차량, 호텔과 실제 이동 조건은 견적 전에 하나씩 확인합니다.",
        action: consultationAction.ko,
      },
    },
  },
  "china-accessible-hotel-room-verification": {
    kind: "trip-consultation",
    serviceId: "full-trip-support",
    image: "hotel-guide-photo",
    copy: {
      en: {
        label: consultationLabel.en,
        title: "Check your hotel needs within a full private trip",
        note: "Room facilities, room type and availability are confirmed before quoting and booking.",
        action: consultationAction.en,
      },
      zh: {
        label: consultationLabel.zh,
        title: "把酒店需求放进完整私人行程中核实",
        note: "客房设施、房型与可用情况须在报价和预订前确认。",
        action: consultationAction.zh,
      },
      ko: {
        label: consultationLabel.ko,
        title: "숙소 요구 사항을 전체 프라이빗 여행 안에서 확인하세요",
        note: "객실 시설, 객실 유형과 이용 가능 여부는 견적과 예약 전에 확인합니다.",
        action: consultationAction.ko,
      },
    },
  },
} as const satisfies Partial<Record<GuideId, GuideSalesCardPlan>>;

export type GuideWithSalesCardPlan = keyof typeof guideSalesCardPlans;

export const guideSalesCardGuideIds = Object.freeze(
  Object.keys(guideSalesCardPlans) as GuideWithSalesCardPlan[],
);

function homePath(locale: HomegroundLocale) {
  return locale === "en" ? "/" : `/${locale}/`;
}

function toursPath(locale: HomegroundLocale) {
  return locale === "en" ? "/tours/" : `/${locale}/tours/`;
}

function sharedImage(key: GuideSalesCardImageKey, locale: HomegroundLocale) {
  const image = sharedImages[key];
  if (image.productId) {
    const product = getPublishedPrivateTourCatalog(locale).find((item) => item.id === image.productId);
    if (!product) throw new Error(`Unpublished image product in guide sales card: ${image.productId}`);
    return {
      src: privateTourCardImageSource(product.id, 640),
      srcSet: privateTourCardImageSrcSet(product.id),
      alt: product.image.alt,
      width: product.image.width,
      height: product.image.height,
    };
  }
  if (!image.src || !image.width || !image.height || !image.alt) {
    throw new Error(`Incomplete shared guide sales card image: ${key}`);
  }
  return {
    src: image.src,
    srcSet: `${image.src} ${image.width}w`,
    alt: image.alt[locale],
    width: image.width,
    height: image.height,
  };
}

export function hasGuideSalesCardPlan(guideId: string): guideId is GuideWithSalesCardPlan {
  return Object.hasOwn(guideSalesCardPlans, guideId);
}

export function getGuideSalesCard(
  guideId: GuideWithSalesCardPlan,
  locale: HomegroundLocale,
): GuideSalesCardData {
  const plan: GuideSalesCardPlan = guideSalesCardPlans[guideId];
  const copy = plan.copy[locale];
  const text = { label: copy.label, title: copy.title, action: copy.action, ...(copy.note ? { note: copy.note } : {}) };

  if (plan.kind === "private-tour-product") {
    const product = getPublishedPrivateTourCatalog(locale).find((item) => item.id === plan.productId);
    if (!product) throw new Error(`Unpublished product in guide sales card: ${plan.productId}`);
    return {
      kind: plan.kind,
      ctaId: product.id,
      ...text,
      href: product.href,
      image: {
        src: privateTourCardImageSource(product.id, 640),
        srcSet: privateTourCardImageSrcSet(product.id),
        alt: product.image.alt,
        width: product.image.width,
        height: product.image.height,
      },
    };
  }

  if (plan.kind === "private-tour-collection") {
    return {
      kind: plan.kind,
      ctaId: privateTourCollectionCtaId,
      ...text,
      href: toursPath(locale),
      image: sharedImage(plan.image, locale),
    };
  }

  return {
    kind: plan.kind,
    ctaId: plan.serviceId,
    ...text,
    href: buildRouteServiceContactHref(homePath(locale), plan.serviceId),
    image: sharedImage(plan.image, locale),
  };
}

/**
 * Safe default for every published guide that has no reviewed product or
 * service mapping. It links to the full tour collection and uses one existing
 * route photograph without naming a fixed route, so a generic guide never
 * implies that one itinerary has already been matched to the reader.
 */
export function getDefaultGuideSalesCard(
  _guideId: GuideId,
  locale: HomegroundLocale,
): GuideSalesCardData {
  const copy = defaultCollectionCopy[locale];
  return {
    kind: "private-tour-collection",
    ctaId: privateTourCollectionCtaId,
    ...copy,
    href: toursPath(locale),
    image: sharedImage("beijing-tour-photo", locale),
  };
}
