import { jaPilot } from "./jaPilot";
import { localizeJapaneseJiangnanProduct } from "./japaneseJiangnanProduct";
import { getJapaneseTourCopy, type JapaneseTourCopy } from "./japaneseTourCopy";
import { japaneseCruiseOverrides } from "./japaneseCruiseOverrides";
import { japaneseExpansionOverrides } from "./japaneseExpansionOverrides";
import { japaneseSmallGroupOverrides } from "./japaneseSmallGroupOverrides";
import {
  localizePrivateTourProduct,
  type LocalizedPrivateTourProduct,
  type PrivateTourPriceTier,
  type PrivateTourProduct,
} from "./privateTourProducts";

function sourcePrice(tier: PrivateTourPriceTier) {
  const currency = tier.publishedPrice?.currency ?? "CNY";
  const amount = tier.publishedPrice?.amountPerPerson ?? tier.cnyPerPerson;
  return {
    travelers: tier.travelers,
    cny: tier.cnyPerPerson,
    amount,
    currency,
    formatted: new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency,
      currencyDisplay: "code",
      maximumFractionDigits: 0,
    }).format(amount),
  };
}

/** Keep the source itinerary, images, service options and published price rows. */
export function localizeJapanesePrivateTourProduct(
  product: PrivateTourProduct,
  override?: JapaneseTourCopy,
): LocalizedPrivateTourProduct {
  if (product.slug === jaPilot.tourSlug && !override) {
    return localizeJapaneseJiangnanProduct(product);
  }
  const baseCopy = override ?? getJapaneseTourCopy(product.slug);
  if (!baseCopy) throw new Error(`Japanese tour copy is missing for ${product.slug}`);
  const copy: JapaneseTourCopy = {
    ...baseCopy,
    ...japaneseCruiseOverrides[product.slug],
    ...japaneseExpansionOverrides[product.slug],
    ...japaneseSmallGroupOverrides[product.slug],
  };
  const source = localizePrivateTourProduct(product, "en");
  if (copy.itinerary.length !== product.itinerary.length ||
      copy.gallery.length !== product.gallery.length ||
      copy.packages.length !== product.packages.length) {
    throw new Error(`Japanese tour copy does not match the source structure: ${product.slug}`);
  }
  const packageCopy = new Map(copy.packages.map((item) => [item.id, item]));
  return {
    ...source,
    path: `/ja/tours/${product.slug}/`,
    title: copy.title,
    metadataTitle: copy.metadataTitle,
    metadataDescription: copy.metadataDescription,
    eyebrow: copy.eyebrow,
    lede: copy.lede,
    summary: copy.summary,
    highlights: copy.highlights,
    itinerary: product.itinerary.map((day, index) => ({
      day: day.day,
      title: copy.itinerary[index].title,
      description: copy.itinerary[index].description,
    })),
    hotelNote: copy.hotelNote,
    serviceNote: copy.serviceNote,
    exclusions: copy.exclusions,
    bookingNote: copy.bookingNote,
    faq: copy.faq,
    heroImage: { ...source.heroImage, ...copy.heroImage },
    gallery: source.gallery.map((image, index) => ({ ...image, ...copy.gallery[index] })),
    routeMedia: source.routeMedia.map((group) => {
      const translated = copy.routeMedia?.find((item) => item.day === group.day);
      if (translated && translated.variants.length !== group.variants.length) {
        throw new Error(`Japanese route media does not match source: ${product.slug}, day ${group.day}`);
      }
      return {
        day: group.day,
        variants: group.variants.map((variant, index) => ({
          label: translated?.variants[index]?.label ?? variant.label,
          image: {
            ...variant.image,
            alt: translated?.variants[index]?.alt ?? variant.image.alt,
            caption: translated?.variants[index]?.caption ?? variant.image.caption,
          },
        })),
      };
    }),
    packages: product.packages.map((tourPackage) => {
      const translated = packageCopy.get(tourPackage.id);
      if (!translated) throw new Error(`Japanese package copy is missing: ${product.slug}/${tourPackage.id}`);
      return {
        id: tourPackage.id,
        guideMode: tourPackage.guideMode,
        label: translated.label,
        summary: translated.summary,
        quoteOnly: tourPackage.quoteOnly === true,
        rows: tourPackage.prices.map(sourcePrice),
      };
    }),
  };
}
