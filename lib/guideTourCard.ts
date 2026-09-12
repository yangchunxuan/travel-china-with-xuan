import type { ContentSection } from "./content-system/types";
import type { StructuredPageBody } from "./content-system/page-body";
import { getGuidePublishedRouteLinks } from "./existingContentCommercialLinks.ts";
import type { GuideId } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import { getHomepageProductShowcaseCopy } from "./homepageProductShowcaseI18n.ts";
import { getPublishedPrivateTourCatalog } from "./publishedPrivateTourCatalog.ts";
import { privateTourCardImageSource, privateTourCardImageSrcSet } from "../components/privateTourCardImages.ts";

/**
 * The in-article private-tour card: the guide has just helped the reader with
 * one worry (where to stay, how to get there, how to get in), and the card
 * offers the matching tour in the same breath. Only guides with a curated
 * product target (existingContentCommercialLinks) get one; the hook line is
 * chosen by the guide's section so it speaks to the worry the reader came with.
 */
export interface GuideTourCardData {
  readonly productId: string;
  readonly hook: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly appeal: string;
  readonly priceFrom: string;
  readonly priceBasis: string;
  readonly priceValidityNote?: string;
  readonly action: string;
  readonly href: string;
  readonly image: { readonly src: string; readonly srcSet: string; readonly alt: string; readonly width: number; readonly height: number; readonly objectPosition?: string };
  readonly label: string;
}

type HookKey = "stay" | "transport" | "explore" | "default";

const hooks: Record<HomegroundLocale, Record<HookKey, string>> = {
  en: {
    stay: "Rather not solve the hotel puzzle yourself?",
    transport: "Rather not manage the transfers yourself?",
    explore: "Rather have the tickets and timing handled for you?",
    default: "Rather have this trip run for you?",
  },
  zh: {
    stay: "不想自己研究住哪、怎么排？",
    transport: "接送和换乘不想自己操心？",
    explore: "门票预约和时间安排，想交给我们？",
    default: "想把这趟行程直接交给我们？",
  },
  ko: {
    stay: "숙소와 동선, 직접 고민하지 않아도 됩니다.",
    transport: "이동과 환승, 직접 챙기지 않아도 됩니다.",
    explore: "예약과 시간 배분, 맡기고 싶다면.",
    default: "이 여행, 통째로 맡기고 싶다면.",
  },
};

const ui: Record<HomegroundLocale, { from: string; action: string; label: string }> = {
  en: { from: "From", action: "See the day-by-day and prices", label: "Matching private tour" },
  zh: { from: "起价", action: "看每日行程和价格", label: "对应的私家团" },
  ko: { from: "시작가", action: "일정과 가격 보기", label: "관련 프라이빗 투어" },
};

function hookKey(section: ContentSection | undefined): HookKey {
  if (section === "stay" || section === "transport" || section === "explore") return section;
  return "default";
}

export function getGuideTourCard(
  guideId: GuideId,
  locale: HomegroundLocale,
  section: ContentSection | undefined,
): GuideTourCardData | null {
  const target = getGuidePublishedRouteLinks(guideId, locale)[0];
  if (!target) return null;
  const product = getPublishedPrivateTourCatalog(locale).find(
    (item) => item.id === target.id || item.slug === target.id,
  );
  if (!product) return null;
  const copy = getHomepageProductShowcaseCopy(locale);
  const text = ui[locale];
  return {
    productId: product.id,
    hook: hooks[locale][hookKey(section)],
    eyebrow: `${copy.productLabel} · ${copy.durationLabel(product.days, product.nights)}`,
    title: product.title,
    appeal: product.comparison.appeal,
    priceFrom: `${text.from} ${product.startingPrice.formatted}`,
    priceBasis: [
      copy.perPersonLabel,
      copy.groupBasis(product.startingPrice.travelers),
      product.startingPrice.serviceLabel,
    ].filter(Boolean).join(" · "),
    priceValidityNote: product.startingPrice.validityNote,
    action: text.action,
    href: product.startingPriceHref,
    image: {
      src: privateTourCardImageSource(product.id, 640),
      srcSet: privateTourCardImageSrcSet(product.id),
      alt: product.image.alt,
      width: product.image.width,
      height: product.image.height,
      objectPosition: product.image.objectPosition,
    },
    label: text.label,
  };
}

/**
 * Where the card goes: after the reader has finished one real section, not
 * before they have read anything. With four or more headings it sits before
 * the third; with two or three, before the second; otherwise at the end.
 */
export function guideTourCardBlockIndex(body: StructuredPageBody): number {
  const headings = body.blocks
    .map((block, index) => (block.type === "heading" ? index : -1))
    .filter((index) => index >= 0);
  if (headings.length >= 4) return headings[2] - 1;
  if (headings.length >= 2) return headings[1] - 1;
  return body.blocks.length - 1;
}
