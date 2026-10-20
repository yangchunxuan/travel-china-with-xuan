import type { GuideReservationOffer } from "./guideReservationOffers";
import type { GuideSalesCardData } from "./guideSalesCards";
import type { SpanishGuide, SpanishGuideOffer } from "./spanishGuideTypes";
import {
  ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS,
  attractionReservationServiceFeeCny,
  getAttractionReservationRule,
} from "./attractionReservations";
import { formatAttractionReservationEditionMoney, getAttractionReservationEditionRule } from "./attractionReservationEditions";
import { localizedReservationHref } from "./guideReservationOffers";
import { spanishLegacyPricing, spanishLegacyTourCards } from "./spanishLegacyTours";
import { getSpanishTourCatalog } from "./spanishTourCatalog";
import { privateTourCardImageSource, privateTourCardImageSrcSet } from "../components/privateTourCardImages";

export type ResolvedSpanishGuideOffer =
  | { readonly afterBlockId: string; readonly kind: "tour"; readonly card: GuideSalesCardData }
  | { readonly afterBlockId: string; readonly kind: "attraction-reservation"; readonly offer: GuideReservationOffer };

/** The published price, read from the tour's own price table. */
function tourCard(offer: Extract<SpanishGuideOffer, { kind: "tour" }>): GuideSalesCardData {
  const image = (alt: string, width: number, height: number) => ({
    src: privateTourCardImageSource(offer.tourSlug, 640),
    srcSet: privateTourCardImageSrcSet(offer.tourSlug),
    alt,
    width,
    height,
  });
  const legacy = spanishLegacyTourCards.find((card) => card.slug === offer.tourSlug);
  if (legacy) {
    // The featured stay's base price applies to 2 to 4 adults; a separate rate applies to exactly 6.
    const tier = spanishLegacyPricing.tiers.find((candidate) => candidate.featured) ?? spanishLegacyPricing.tiers[0];
    const until = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Shanghai" })
      .format(new Date(spanishLegacyPricing.validUntil));
    return {
      kind: "private-tour-product", ctaId: offer.tourSlug, label: offer.label, title: legacy.title,
      note: `${offer.note} Tres noches de hotel incluidas. Precio publicado: desde ${tier.base} por persona de 2 a 4 adultos, o ${tier.six} con 6 adultos; válido hasta el ${until}.`,
      action: offer.action, href: legacy.path,
      image: image(legacy.image.alt, legacy.image.width, legacy.image.height),
    };
  }
  const tour = getSpanishTourCatalog().find((candidate) => candidate.slug === offer.tourSlug);
  if (!tour) throw new Error(`Spanish guide offer names a tour without a Spanish page: ${offer.tourSlug}`);
  // Every priced service option, so a price without a guide is never read as the price with one.
  const options = tour.packages.filter((pkg) => pkg.rows.length > 0).map((pkg) => {
    const lowest = pkg.rows.reduce((min, row) => (row.cny < min.cny ? row : min));
    const two = pkg.rows.find((row) => row.travelers === 2);
    const name = pkg.label.charAt(0).toLowerCase() + pkg.label.slice(1);
    return {
      label: pkg.guideMode === "self-guided" ? `${name}, con conductor y asistencia a distancia` : name,
      from: two && two !== lowest
        ? `desde ${two.formatted} por persona con 2 viajeros, o ${lowest.formatted} con ${lowest.travelers}`
        : `desde ${lowest.formatted} por persona con ${lowest.travelers} viajeros`,
    };
  });
  const price = options.length === 0
    ? "Precio según fechas y grupo, confirmado por escrito antes de pagar."
    : options.length === 1
      ? `Precio publicado (${options[0].label}): ${options[0].from}.`
      : `Precios publicados: ${options.map((option) => `${option.label}, ${option.from}`).join("; ")}.`;
  return {
    kind: "private-tour-product", ctaId: offer.tourSlug, label: offer.label, title: tour.title,
    note: `${offer.note} ${price}`, action: offer.action, href: tour.path,
    image: image(tour.heroImage.alt, tour.heroImage.width, tour.heroImage.height),
  };
}

/** The booking fee, attraction names and guarantee, read from the reservation rules. */
function reservationOffer(guide: SpanishGuide, offer: Extract<SpanishGuideOffer, { kind: "attraction-reservation" }>): GuideReservationOffer {
  const examples = offer.attractionIds.map((attractionId) => {
    const rule = getAttractionReservationRule(attractionId);
    if (rule?.status !== "offered") throw new Error(`${guide.slug}: ${attractionId} is not booked by the service`);
    return { attractionId, label: getAttractionReservationEditionRule(rule, "es").name, href: localizedReservationHref("es", attractionId) };
  });
  const days = ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS;
  return {
    afterBlockId: offer.afterBlockId,
    variant: "card",
    label: "Homeground China · Reserva de entradas",
    title: offer.title,
    body: offer.body,
    fee: formatAttractionReservationEditionMoney(attractionReservationServiceFeeCny, "es"),
    feeUnit: "de gestión por persona y lugar, más la entrada oficial",
    examplesLabel: "Lugares que reservamos:",
    examples,
    action: offer.action,
    href: localizedReservationHref("es", offer.preselect),
    smallPrint: [`Si nos lo pide y paga al menos ${days} días antes, la reserva está garantizada; si no la conseguimos, le devolvemos íntegramente la tarifa y la entrada.`],
  };
}

export function resolveSpanishGuideOffers(guide: SpanishGuide): readonly ResolvedSpanishGuideOffer[] {
  return (guide.offers ?? []).map((offer) => offer.kind === "tour"
    ? { afterBlockId: offer.afterBlockId, kind: "tour", card: tourCard(offer) }
    : { afterBlockId: offer.afterBlockId, kind: "attraction-reservation", offer: reservationOffer(guide, offer) });
}
