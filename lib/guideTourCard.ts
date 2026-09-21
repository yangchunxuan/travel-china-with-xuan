import type { StructuredPageBody } from "./content-system/page-body";
import { getGuidePublishedRouteLinks } from "./existingContentCommercialLinks.ts";
import type { GuideId } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import { getPublishedPrivateTourCatalog } from "./publishedPrivateTourCatalog.ts";
import {
  buildGuideProductSalesCard,
  getDefaultGuideSalesCard,
  getGuideSalesCard,
  hasGuideSalesCardPlan,
  type GuideSalesCardData,
} from "./guideSalesCards.ts";

/**
 * A brief in-article sales card. Guides with an explicit plan in
 * `guideSalesCards` get exactly that reviewed product card. Every other
 * commercial guide keeps its curated product. Guides without a reviewed
 * mapping get one stable market-weighted product with destination/topic
 * affinity considered first. No guide card falls back to the generic list.
 */
export type GuideTourCardData = GuideSalesCardData;

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
      return buildGuideProductSalesCard(product.id, locale);
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
