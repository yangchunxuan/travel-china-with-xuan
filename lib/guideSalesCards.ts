// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { guideRegistry, type GuideId } from "./guideRegistry.ts";
import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import {
  buildGuideProductAssignments,
  getGuideProductDistributionSummary,
  type GuideProductAssignment,
  type GuideProductId,
} from "./guideProductDistribution.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { getPrimaryGuideProductId } from "./guideCommercialTargets.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { getPublishedPrivateTourCatalog } from "./publishedPrivateTourCatalog.ts";
import { privateTourCardImageSource, privateTourCardImageSrcSet } from "../components/privateTourCardImages.ts";

/** Every guide card now opens one published product, never the generic tour list. */
export type GuideSalesCardKind = "private-tour-product";

export interface GuideSalesCardData {
  readonly kind: GuideSalesCardKind;
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
  readonly note?: string;
  readonly action: string;
}

type LocalizedCardCopy = Readonly<Record<HomegroundLocale, CardCopy>>;

interface GuideSalesCardPlan {
  readonly kind: "private-tour-product";
  readonly productId: GuideProductId;
  readonly copy: LocalizedCardCopy;
}

const relatedCopy: LocalizedCardCopy = {
  en: { label: "Related private route", action: "View itinerary" },
  zh: { label: "相关私家路线", action: "查看行程" },
  ko: { label: "관련 프라이빗 일정", action: "일정 보기" },
};

const forecastCopy: LocalizedCardCopy = {
  en: { label: "One published private route", action: "View itinerary" },
  zh: { label: "一条已发布私家路线", action: "查看行程" },
  ko: { label: "공개된 프라이빗 일정 한 가지", action: "일정 보기" },
};

/**
 * Six pages need copy that avoids claiming a route has already been checked
 * for a family, mobility need or room requirement. They still open one real
 * product, in line with the site-wide product-card rule.
 */
export const guideSalesCardPlans = {
  "zhangjiajie-older-travellers": {
    kind: "private-tour-product",
    productId: "zhangjiajie-4-day-private-tour",
    copy: {
      en: {
        label: "A Zhangjiajie route to review",
        note: "Actual walking, steps and daily pace must be checked against your group before quoting.",
        action: "View itinerary",
      },
      zh: {
        label: "可继续查看的张家界路线",
        note: "实际步行、台阶和每日节奏须根据同行情况在报价前逐项核实。",
        action: "查看行程",
      },
      ko: {
        label: "검토할 장자제 프라이빗 일정",
        note: "실제 도보 거리, 계단과 하루 일정 속도는 견적 전에 일행 기준으로 확인해야 합니다.",
        action: "일정 보기",
      },
    },
  },
  "china-itinerary-with-older-parents": {
    kind: "private-tour-product",
    productId: "shanghai-suzhou-hangzhou-6-day-private-tour",
    copy: {
      en: {
        label: "One private route to start from",
        note: "Walking, hotel moves and the daily pace must be checked against your group before quoting.",
        action: "View itinerary",
      },
      zh: {
        label: "可作为起点的一条私家路线",
        note: "步行量、换酒店次数和每日节奏须根据同行情况在报价前逐项核实。",
        action: "查看行程",
      },
      ko: {
        label: "출발점으로 볼 프라이빗 일정",
        note: "도보량, 숙소 이동과 하루 속도는 견적 전에 일행 기준으로 확인해야 합니다.",
        action: "일정 보기",
      },
    },
  },
  "china-itinerary-with-young-children": {
    kind: "private-tour-product",
    productId: "chengdu-pandas-sanxingdui-5-day-private-tour",
    copy: {
      en: {
        label: "One private route to start from",
        note: "Children's ages, naps and walking must be checked before this route is quoted.",
        action: "View itinerary",
      },
      zh: {
        label: "可作为起点的一条私家路线",
        note: "孩子年龄、午休和步行情况须在这条路线报价前逐项核实。",
        action: "查看行程",
      },
      ko: {
        label: "출발점으로 볼 프라이빗 일정",
        note: "아이의 나이, 낮잠 시간과 도보 가능 범위는 이 일정의 견적 전에 확인해야 합니다.",
        action: "일정 보기",
      },
    },
  },
  "do-singaporeans-need-visa-china": {
    kind: "private-tour-product",
    productId: "shanghai-suzhou-hangzhou-6-day-private-tour",
    copy: forecastCopy,
  },
  "wheelchair-accessible-china-route-planning": {
    kind: "private-tour-product",
    productId: "shanghai-suzhou-5-day-private-tour",
    copy: {
      en: {
        label: "One route to assess with your access needs",
        note: "Sites, vehicles, hotels and real access conditions are checked one by one before we quote.",
        action: "View itinerary",
      },
      zh: {
        label: "可按行动需求逐项评估的一条路线",
        note: "景点、车辆、酒店和实际通行条件会在报价前逐项核实。",
        action: "查看行程",
      },
      ko: {
        label: "이동 편의 요구와 함께 검토할 일정",
        note: "명소, 차량, 호텔과 실제 이동 조건은 견적 전에 하나씩 확인합니다.",
        action: "일정 보기",
      },
    },
  },
  "china-accessible-hotel-room-verification": {
    kind: "private-tour-product",
    productId: "shanghai-suzhou-5-day-private-tour",
    copy: {
      en: {
        label: "One route to assess with your hotel needs",
        note: "Room facilities, room type and availability are confirmed before quoting and booking.",
        action: "View itinerary",
      },
      zh: {
        label: "可连同酒店需求一起核实的一条路线",
        note: "客房设施、房型与可用情况须在报价和预订前确认。",
        action: "查看行程",
      },
      ko: {
        label: "숙소 요구 사항과 함께 검토할 일정",
        note: "객실 시설, 객실 유형과 이용 가능 여부는 견적과 예약 전에 확인합니다.",
        action: "일정 보기",
      },
    },
  },
} as const satisfies Partial<Record<GuideId, GuideSalesCardPlan>>;

export type GuideWithSalesCardPlan = keyof typeof guideSalesCardPlans;

export const guideSalesCardGuideIds = Object.freeze(
  Object.keys(guideSalesCardPlans) as GuideWithSalesCardPlan[],
);

export function hasGuideSalesCardPlan(guideId: string): guideId is GuideWithSalesCardPlan {
  return Object.hasOwn(guideSalesCardPlans, guideId);
}

const publishedProductKeys = new Set(
  getPublishedPrivateTourCatalog("en").flatMap((product) => [product.id, product.slug]),
);

/** Guides that reach the weighted selector after reviewed and curated products. */
export const guideProductFallbackGuideIds = Object.freeze(
  guideRegistry
    .filter((guide) => {
      if (hasGuideSalesCardPlan(guide.id)) return false;
      const productId = getPrimaryGuideProductId(guide.id);
      return !productId || !publishedProductKeys.has(productId);
    })
    .map((guide) => guide.id),
);

const guideProductFallbackAssignments = buildGuideProductAssignments(
  guideProductFallbackGuideIds,
);

export function getDefaultGuideProductAssignment(
  guideId: GuideId,
): GuideProductAssignment {
  const assignment = guideProductFallbackAssignments.get(guideId);
  if (!assignment) {
    throw new Error(`Guide does not use the weighted product fallback: ${guideId}`);
  }
  return assignment;
}

export function getDefaultGuideProductDistributionSummary() {
  return getGuideProductDistributionSummary(guideProductFallbackAssignments);
}

export function buildGuideProductSalesCard(
  productId: string,
  locale: HomegroundLocale,
  copy: CardCopy = relatedCopy[locale],
): GuideSalesCardData {
  const product = getPublishedPrivateTourCatalog(locale).find((item) => item.id === productId);
  if (!product) throw new Error(`Unpublished product in guide sales card: ${productId}`);
  return {
    kind: "private-tour-product",
    ctaId: product.id,
    label: copy.label,
    title: product.title,
    ...(copy.note ? { note: copy.note } : {}),
    action: copy.action,
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

export function getGuideSalesCard(
  guideId: GuideWithSalesCardPlan,
  locale: HomegroundLocale,
): GuideSalesCardData {
  const plan: GuideSalesCardPlan = guideSalesCardPlans[guideId];
  return buildGuideProductSalesCard(plan.productId, locale, plan.copy[locale]);
}

/**
 * Stable product fallback for every published guide without a reviewed direct
 * mapping. Strong destination/topic matches form the candidate pool first;
 * otherwise the 100-point market forecast supplies the weighted pool.
 */
export function getDefaultGuideSalesCard(
  guideId: GuideId,
  locale: HomegroundLocale,
): GuideSalesCardData {
  const assignment = getDefaultGuideProductAssignment(guideId);
  const copy = assignment.relevance === "guide-signals" ? relatedCopy[locale] : forecastCopy[locale];
  return buildGuideProductSalesCard(assignment.productId, locale, copy);
}
