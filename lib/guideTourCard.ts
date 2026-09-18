import type { StructuredPageBody } from "./content-system/page-body";
import { getGuidePublishedRouteLinks } from "./existingContentCommercialLinks.ts";
import type { GuideId } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import { getPublishedPrivateTourCatalog } from "./publishedPrivateTourCatalog.ts";
import { privateTourCardImageSource, privateTourCardImageSrcSet } from "../components/privateTourCardImages.ts";
import {
  getDefaultGuideSalesCard,
  getGuideSalesCard,
  hasGuideSalesCardPlan,
  type GuideSalesCardData,
} from "./guideSalesCards.ts";

/**
 * A brief in-article sales card. Guides with an explicit plan in
 * `guideSalesCards` get exactly that card (a named route, the tour collection
 * or the planner). Every other commercial guide keeps its curated product.
 * Guides without a reviewed mapping get the neutral private-tour collection,
 * so current and future articles always have a truthful next step.
 */
export type GuideTourCardData = GuideSalesCardData;

const ui: Record<HomegroundLocale, { action: string; label: string }> = {
  en: { action: "View itinerary", label: "Related private route" },
  zh: { action: "查看行程", label: "相关私家路线" },
  ko: { action: "일정 보기", label: "관련 프라이빗 일정" },
};

export function getGuideTourCard(
  guideId: GuideId,
  locale: HomegroundLocale,
): GuideTourCardData {
  if (hasGuideSalesCardPlan(guideId)) return getGuideSalesCard(guideId, locale);
  const target = getGuidePublishedRouteLinks(guideId, locale)[0];
  if (target) {
    const product = getPublishedPrivateTourCatalog(locale).find(
      (item) => item.id === target.id || item.slug === target.id,
    );
    if (product) {
      const text = ui[locale];
      return {
        kind: "private-tour-product",
        ctaId: product.id,
        title: product.title,
        action: text.action,
        href: product.href,
        image: {
          src: privateTourCardImageSource(product.id, 640),
          srcSet: privateTourCardImageSrcSet(product.id),
          alt: product.image.alt,
          width: product.image.width,
          height: product.image.height,
        },
        label: text.label,
      };
    }
  }
  return getDefaultGuideSalesCard(guideId, locale);
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
