import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import {
  ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS,
  attractionReservationHref,
  attractionReservationPath,
  attractionReservationServiceFeeCny,
  formatAttractionFaceValue,
  formatAttractionReservationFee,
  getAttractionReservationRule,
  type AttractionReservationRule,
} from "./attractionReservations.ts";

/**
 * Attraction reservation offers inside English guides that are not about one
 * bookable attraction (a packing guide, two hotel-base guides, Tianmen
 * Mountain), and the wording of the existing booking card on two attraction
 * guides. The owner asked for these on 18 October 2026 so that readers of
 * popular guides learn that Homeground China books selected attractions.
 *
 * Every fee, attraction name, preselect link, fare and release time is read
 * from lib/attractionReservations; the copy only adds context. Nothing here
 * promises scarcity, queue times, entry or a booking outside the existing
 * guarantee, and the Tianmen offer states that Tianmen Mountain is not sold
 * through the service. Chinese and Korean guides are unchanged.
 */

const days = ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS;
const guaranteeLine = `Request and pay at least ${days} days ahead for a guaranteed booking.`;

export interface GuideReservationOfferExample {
  /** An `offered` rule: the link opens the request form with it ticked. */
  attractionId: string;
  /** A short display name; the form shows the rule's full name. */
  label: string;
}

interface OfferSpec {
  /** The offer follows this body block. A missing id fails the build. */
  afterBlockId: string;
  variant: "card" | "line";
  /** The one attraction the action preselects; omitted, the action opens the service page. */
  attractionId?: string;
  label: string;
  title: string;
  body: (rule: AttractionReservationRule | null) => string;
  feeUnit: string;
  examples?: readonly GuideReservationOfferExample[];
  action: string;
  smallPrint?: (rule: AttractionReservationRule | null) => readonly string[];
}

export interface GuideReservationOffer {
  afterBlockId: string;
  variant: "card" | "line";
  label: string;
  title: string;
  body: string;
  fee: string;
  feeUnit: string;
  examples: readonly (GuideReservationOfferExample & { href: string })[];
  action: string;
  href: string;
  smallPrint: readonly string[];
}

const serviceLabel = "Homeground China · Attraction reservations";
const generalFeeUnit = "per person per attraction, plus the official ticket price";
const seeAttractions = "See the attractions we book";

const offers: Record<string, readonly OfferSpec[]> = {
  // Pre-departure: after the packing workflow, before arrival at Customs.
  "food-plants-and-animal-products-into-china": [{
    afterBlockId: "before-list",
    variant: "card",
    label: serviceLabel,
    title: "Packing sorted? Book the sights before you fly",
    body: () =>
      "Customs is one job to finish before departure; attraction tickets can be another. Some of China's best-known sights, including the Forbidden City, are visited only with a real-name reservation made in advance. Homeground China can book selected attractions for you in each traveller's own passport name. Send your dates and group size, and get a written quote before you pay.",
    feeUnit: generalFeeUnit,
    examples: [
      { attractionId: "forbidden-city", label: "Forbidden City" },
      { attractionId: "terracotta-warriors", label: "Terracotta Warriors" },
      { attractionId: "chengdu-panda-base", label: "Chengdu panda base" },
      { attractionId: "li-river-cruise", label: "Li River cruise" },
      { attractionId: "shanghai-tower", label: "Shanghai Tower" },
    ],
    action: seeAttractions,
    smallPrint: () => [guaranteeLine],
  }],

  // Where the guide hands the Guilin–Yangshuo arrival to another guide.
  "yangshuo-town-or-yulong-river-where-to-stay": [{
    afterBlockId: "scope-boundary",
    variant: "card",
    attractionId: "li-river-cruise",
    label: "Homeground China · Li River cruise booking",
    title: "Arriving by Li River cruise? We can book the boat",
    body: () =>
      "If you plan to sail from Guilin to Yangshuo, Homeground China can reserve the Li River cruise for you. Send your sailing date, the number of travellers and the boat class you want, and we confirm the booking details and your full quote in writing before you pay. This is the cruise ticket only, not your hotel transfer or a Yulong River bamboo raft.",
    feeUnit: "per person, plus the official boat fare",
    action: "Send your cruise date",
    smallPrint: (rule) => [
      ...(rule?.price?.kind === "cny" ? [`Published fare: ${formatAttractionFaceValue(rule.price.amount, "en")}, ${rule.price.basis.en}.`] : []),
      ...(rule?.disclosure ? [rule.disclosure.en] : []),
      guaranteeLine,
    ],
  }],

  // After the base is chosen and the evenings are planned.
  "shanghai-where-to-stay-first-trip": [{
    afterBlockId: "evenings-copy",
    variant: "card",
    label: serviceLabel,
    title: "Hotel settled? Line up the sights next",
    body: () =>
      "Not every Shanghai sight needs a reservation. For the attractions on our list, in Shanghai and in cities that often come next, such as Suzhou and Hangzhou, Homeground China can do the booking for you. Send your dates and group size, and get a written quote before you pay.",
    feeUnit: generalFeeUnit,
    examples: [
      { attractionId: "shanghai-tower", label: "Shanghai Tower observation deck" },
      { attractionId: "shanghai-museum-peoples-square", label: "Shanghai Museum, People's Square" },
      { attractionId: "shanghai-museum-east-experience-areas", label: "Shanghai Museum East experience areas" },
      { attractionId: "humble-administrators-garden", label: "Humble Administrator's Garden, Suzhou" },
      { attractionId: "west-lake-boat", label: "West Lake boats, Hangzhou" },
    ],
    action: seeAttractions,
    smallPrint: () => [guaranteeLine],
  }],

  // After the Tianmen booking section: the rest of the route, never Tianmen itself.
  "tianmen-mountain-tickets-and-routes": [{
    afterBlockId: "entry-copy",
    variant: "card",
    label: serviceLabel,
    title: "Beyond Zhangjiajie: bookings elsewhere on your route",
    body: () =>
      "Tianmen Mountain tickets are not sold through this service. Elsewhere on your China route, Homeground China can reserve selected attractions for you, from the Forbidden City in Beijing to the Terracotta Warriors in Xi'an and the Li River cruise in Guilin. Send your dates and group size, and get a written quote before you pay.",
    feeUnit: generalFeeUnit,
    examples: [
      { attractionId: "forbidden-city", label: "Forbidden City" },
      { attractionId: "terracotta-warriors", label: "Terracotta Warriors" },
      { attractionId: "chengdu-panda-base", label: "Chengdu panda base" },
      { attractionId: "li-river-cruise", label: "Li River cruise" },
    ],
    action: seeAttractions,
    smallPrint: () => [
      "For Tianmen Mountain and Zhangjiajie National Forest Park, use the private tour or the guide for the day described on this page.",
    ],
  }],

  // Step 1 is where booking it yourself becomes real work: offer the alternative once, briefly.
  "forbidden-city-for-foreign-visitors": [{
    afterBlockId: "email-boundary",
    variant: "line",
    attractionId: "forbidden-city",
    label: serviceLabel,
    title: "Prefer not to do this yourself?",
    body: () => "Homeground China can book your Palace Museum tickets in each traveller's own passport name.",
    feeUnit: "per person, plus the ticket at face value",
    action: "Send your date",
  }],
};

/** Guide-specific wording for the existing attraction booking card (GuideReservationCta). */
const ctaWording: Record<string, { title: string; feeUnit: string; body: (rule: AttractionReservationRule) => string; action: string }> = {
  "li-river-cruise-tickets-piers-booking": {
    title: "Let Homeground China book your Li River cruise",
    feeUnit: "per person, plus the official boat fare",
    body: () =>
      `Send your sailing date, the number of travellers and the boat class you want. We check that the booking accepts your passports, confirm the boarding pier and your full quote in writing before you pay, then send each traveller's booking record. ${guaranteeLine}`,
    action: "Send your date and group size",
  },
  "forbidden-city-for-foreign-visitors": {
    title: "Rather not handle the Palace Museum booking yourself?",
    feeUnit: "per person, plus the official ticket price",
    body: (rule) =>
      `Booking it yourself means an English portal account with email verification, tickets released ${rule.release?.en.split(";")[0] ?? "ahead of your date"}, and exact passport details for every traveller. Leave it to Homeground China: send your date and group size, get a written quote before you pay, and receive each traveller's booking record. ${guaranteeLine}`,
    action: "Send your date and group size",
  },
};

function offeredRule(attractionId: string, guideId: string): AttractionReservationRule {
  const rule = getAttractionReservationRule(attractionId);
  if (!rule || rule.status !== "offered") {
    throw new Error(`Guide reservation offer on ${guideId} names an attraction the service does not book: ${attractionId}`);
  }
  return rule;
}

export function getGuideReservationOffers(guideId: string, locale: HomegroundLocale): readonly GuideReservationOffer[] {
  if (locale !== "en") return [];
  const fee = formatAttractionReservationFee(attractionReservationServiceFeeCny, locale);
  return (offers[guideId] ?? []).map((spec) => {
    const rule = spec.attractionId ? offeredRule(spec.attractionId, guideId) : null;
    return {
      afterBlockId: spec.afterBlockId,
      variant: spec.variant,
      label: spec.label,
      title: spec.title,
      body: spec.body(rule),
      fee,
      feeUnit: spec.feeUnit,
      examples: (spec.examples ?? []).map((example) => ({
        ...example,
        href: attractionReservationHref(locale, offeredRule(example.attractionId, guideId).id),
      })),
      action: spec.action,
      href: rule ? attractionReservationHref(locale, rule.id) : attractionReservationPath[locale],
      smallPrint: spec.smallPrint?.(rule) ?? [],
    };
  });
}

export function getGuideReservationCtaWording(guideId: string, locale: HomegroundLocale, rule: AttractionReservationRule) {
  const wording = locale === "en" ? ctaWording[guideId] : undefined;
  return wording ? { title: wording.title, feeUnit: wording.feeUnit, body: wording.body(rule), action: wording.action } : null;
}

/** For tests: every guide that carries an offer or reworded card. */
export const guideReservationOfferGuideIds = Object.freeze(Object.keys(offers));
export const guideReservationCtaWordingGuideIds = Object.freeze(Object.keys(ctaWording));
