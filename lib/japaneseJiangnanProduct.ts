import { jaPilot } from "./jaPilot";
import { jaPilotCopy } from "./jaPilotCopy";
import {
  localizePrivateTourProduct,
  type LocalizedPrivateTourProduct,
  type PrivateTourProduct,
} from "./privateTourProducts";

/**
 * Only this fully authored tour has a Japanese offer. Keep the canonical tour's
 * images, dates, package id and CNY prices; supply Japanese customer copy here.
 * The English locale on the internal view is only for the existing media UI;
 * the page renderer receives ja separately and never exposes English service copy.
 */
export function localizeJapaneseJiangnanProduct(
  product: PrivateTourProduct,
): LocalizedPrivateTourProduct {
  if (product.slug !== jaPilot.tourSlug) {
    throw new RangeError(`Japanese tour copy is unavailable for ${product.slug}`);
  }
  const copy = jaPilotCopy.tour;
  const source = localizePrivateTourProduct(product, "en");
  const offer = product.packages.find((item) => item.id === "standard-guided");
  if (!offer || offer.prices.map((row) => row.travelers).join(",") !== "2,4,6") {
    throw new Error("Japanese tour requires the published 2, 4 and 6 person offer");
  }
  const currency = new Intl.NumberFormat("ja-JP");
  return {
    ...source,
    path: jaPilot.tour,
    title: copy.title,
    metadataTitle: copy.title,
    metadataDescription: copy.lede,
    eyebrow: copy.eyebrow,
    lede: copy.lede,
    summary: copy.fit,
    highlights: [...copy.presentation.highlights],
    itinerary: copy.days.map((day, index) => ({
      day: index + 1,
      title: day.title.split("｜")[1] ?? day.title,
      description: day.body,
    })),
    hotelNote: copy.included[0],
    serviceNote: `${copy.guideNote} ${copy.included.slice(1).join(" ")}`,
    exclusions: [...copy.excluded],
    bookingNote: copy.priceNote,
    faq: copy.notes.map((answer, index) => ({
      question: copy.presentation.beforeChooseLabels[index],
      answer,
    })),
    heroImage: {
      ...source.heroImage,
      alt: copy.photos.deck[0].alt,
      caption: copy.photos.deck[0].caption,
    },
    gallery: source.gallery.map((image, index) => ({
      ...image,
      alt: copy.photos.deck[index + 1]?.alt ?? image.alt,
      caption: copy.photos.deck[index + 1]?.caption ?? image.caption,
    })),
    routeMedia: source.routeMedia.map((group) => ({
      ...group,
      variants: group.variants.map((variant) => {
        const photo = copy.photos.route[group.day - 1];
        return {
          ...variant,
          label: photo?.label ?? variant.label,
          image: {
            ...variant.image,
            alt: photo?.alt ?? variant.image.alt,
            caption: photo?.caption ?? variant.image.caption,
          },
        };
      }),
    })),
    packages: [{
      id: offer.id,
      guideMode: offer.guideMode,
      label: copy.packageLabel,
      summary: copy.guideNote,
      quoteOnly: false,
      rows: offer.prices.map((row) => ({
        travelers: row.travelers,
        cny: row.cnyPerPerson,
        amount: row.cnyPerPerson,
        currency: "CNY" as const,
        formatted: `CNY ${currency.format(row.cnyPerPerson)}`,
      })),
    }],
  };
}
