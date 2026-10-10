// @ts-ignore Source-TypeScript tests require the explicit extension.
import { getSpanishTourCopy, spanishTourPath } from "./spanishTourCopy.ts";
import {
  localizePrivateTourProduct,
  type LocalizedPrivateTourProduct,
  type PrivateTourProduct,
// @ts-ignore Source-TypeScript tests require the explicit extension.
} from "./privateTourProducts.ts";

// Spanish pages show the same published USD amounts as the English page,
// written the way Spain writes numbers (2.390 USD).
const spanishPrice = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
  maximumFractionDigits: 0,
  useGrouping: "always",
});

export function formatSpanishUsd(amount: number): string {
  return spanishPrice.format(amount).replace(/ /g, " ");
}

/** Keeps the source itinerary, images, service options and published price rows. */
export function localizeSpanishPrivateTourProduct(
  product: PrivateTourProduct,
): LocalizedPrivateTourProduct {
  const copy = getSpanishTourCopy(product.slug);
  if (!copy) throw new Error(`Spanish tour copy is missing for ${product.slug}`);
  const source = localizePrivateTourProduct(product, "en");
  if (copy.itinerary.length !== source.itinerary.length ||
      copy.gallery.length !== source.gallery.length ||
      copy.packages.length !== source.packages.length ||
      copy.routeMedia.length !== source.routeMedia.length) {
    throw new Error(`Spanish tour copy does not match the source structure: ${product.slug}`);
  }
  const packageCopy = new Map(copy.packages.map((item) => [item.id, item]));
  return {
    ...source,
    path: spanishTourPath(product.slug),
    title: copy.title,
    metadataTitle: copy.metadataTitle,
    metadataDescription: copy.metadataDescription,
    eyebrow: copy.eyebrow,
    lede: copy.lede,
    summary: copy.summary,
    highlights: copy.highlights,
    itinerary: source.itinerary.map((day, index) => ({
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
      const translated = copy.routeMedia.find((item) => item.day === group.day);
      if (!translated || translated.variants.length !== group.variants.length) {
        throw new Error(`Spanish route photo copy does not match source: ${product.slug}, day ${group.day}`);
      }
      return {
        day: group.day,
        variants: group.variants.map((variant, index) => ({
          label: translated.variants[index].label,
          image: {
            ...variant.image,
            alt: translated.variants[index].alt,
            caption: translated.variants[index].caption,
          },
        })),
      };
    }),
    packages: source.packages.map((tourPackage) => {
      const translated = packageCopy.get(tourPackage.id);
      if (!translated) throw new Error(`Spanish package copy is missing: ${product.slug}/${tourPackage.id}`);
      return {
        ...tourPackage,
        label: translated.label,
        summary: translated.summary,
        rows: tourPackage.rows.map((row) => ({ ...row, formatted: formatSpanishUsd(row.amount) })),
      };
    }),
  };
}
