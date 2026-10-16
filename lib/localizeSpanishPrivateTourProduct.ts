// @ts-ignore Node source tests use explicit TypeScript extensions.
import { getSpanishTourCopy, spanishTourPath } from './spanishTourCopy.ts';
import {
  localizePrivateTourProduct, type LocalizedPrivateTourProduct, type PrivateTourProduct,
// @ts-ignore Node source tests use explicit TypeScript extensions.
} from './privateTourProducts.ts';

export function localizeSpanishPrivateTourProduct(product: PrivateTourProduct): LocalizedPrivateTourProduct {
  const copy = getSpanishTourCopy(product.slug);
  if (!copy) throw new Error(`Missing Spanish product: ${product.slug}`);
  const source = localizePrivateTourProduct(product, 'en');
  if (copy.itinerary.length !== source.itinerary.length || copy.gallery.length !== source.gallery.length || copy.packages.length !== source.packages.length || copy.routeMedia.length !== source.routeMedia.length) {
    throw new Error(`Spanish/source structure mismatch: ${product.slug}`);
  }
  return {
    ...source,
    path: spanishTourPath(product.slug),
    openGraphLocale: 'es_ES',
    title: copy.title, metadataTitle: copy.metadataTitle, metadataDescription: copy.metadataDescription,
    eyebrow: copy.eyebrow, lede: copy.lede, summary: copy.summary, highlights: copy.highlights,
    itinerary: source.itinerary.map((day, index) => ({ day: day.day, ...copy.itinerary[index] })),
    hotelNote: copy.hotelNote, serviceNote: copy.serviceNote, bookingNote: copy.bookingNote,
    exclusions: copy.exclusions, faq: copy.faq, facts: copy.facts,
    heroImage: { ...source.heroImage, ...copy.heroImage },
    gallery: source.gallery.map((image, index) => ({ ...image, ...copy.gallery[index] })),
    routeMedia: source.routeMedia.map(group => {
      const translated = copy.routeMedia.find(item => item.day === group.day);
      if (!translated || translated.variants.length !== group.variants.length) throw new Error(`Spanish photo mismatch: ${product.slug}/${group.day}`);
      return { day: group.day, variants: group.variants.map((variant, index) => ({
        label: translated.variants[index].label,
        image: { ...variant.image, alt: translated.variants[index].alt, caption: translated.variants[index].caption },
      })) };
    }),
    packages: source.packages.map(pkg => {
      const translated = copy.packages.find(item => item.id === pkg.id);
      if (!translated) throw new Error(`Spanish package mismatch: ${product.slug}/${pkg.id}`);
      return { ...pkg, label: translated.label, summary: translated.summary,
        rows: pkg.rows.map(row => ({ ...row, formatted: new Intl.NumberFormat('es-ES', { style: 'currency', currency: row.currency, currencyDisplay: 'code', maximumFractionDigits: 0 }).format(row.amount) })),
      };
    }),
  };
}
