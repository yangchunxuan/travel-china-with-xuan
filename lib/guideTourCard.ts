import type { StructuredPageBody } from "./content-system/page-body";
import { getGuidePublishedRouteLinks } from "./existingContentCommercialLinks.ts";
import type { GuideId } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import { getPublishedPrivateTourCatalog } from "./publishedPrivateTourCatalog.ts";
import { privateTourCardImageSource, privateTourCardImageSrcSet } from "../components/privateTourCardImages.ts";

/**
 * A brief in-article link to a curated matching tour. The catalog title
 * includes the duration; pricing and service details stay on the product page.
 */
export interface GuideTourCardData {
  readonly productId: string;
  readonly title: string;
  readonly action: string;
  readonly href: string;
  readonly image: { readonly src: string; readonly srcSet: string; readonly alt: string; readonly width: number; readonly height: number; readonly objectPosition?: string };
  readonly label: string;
}

const ui: Record<HomegroundLocale, { action: string; label: string }> = {
  en: { action: "View itinerary", label: "Matching private tour" },
  zh: { action: "查看行程", label: "对应的私家团" },
  ko: { action: "일정 보기", label: "관련 프라이빗 투어" },
};

export function getGuideTourCard(
  guideId: GuideId,
  locale: HomegroundLocale,
): GuideTourCardData | null {
  const target = getGuidePublishedRouteLinks(guideId, locale)[0];
  if (!target) return null;
  const product = getPublishedPrivateTourCatalog(locale).find(
    (item) => item.id === target.id || item.slug === target.id,
  );
  if (!product) return null;
  const text = ui[locale];
  return {
    productId: product.id,
    title: product.title,
    action: text.action,
    href: product.href,
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
