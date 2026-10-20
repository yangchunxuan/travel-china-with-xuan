import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore Focused Node checks execute source modules.
import { guideReservationOfferTranslations, type GuideReservationTranslationLocale } from "./guideReservationOfferTranslations.ts";
// @ts-ignore Focused Node checks execute source modules.
import { getAttractionReservationEditionRule, formatAttractionReservationEditionMoney } from "./attractionReservationEditions.ts";
export type GuideReservationLocale = HomegroundLocale | GuideReservationTranslationLocale;
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
  examplesLabel: string;
  examples: readonly (GuideReservationOfferExample & { href: string })[];
  action: string;
  href: string;
  smallPrint: readonly string[];
}

const serviceLabel = "Homeground China · Attraction reservations";
const generalFeeUnit = "booking service fee per person per attraction, plus the official ticket price";
const seeAttractions = "See the attractions we book";

const offers: Record<string, readonly OfferSpec[]> = {
  // Pre-departure: after the packing workflow, before arrival at Customs.
  "food-plants-and-animal-products-into-china": [{
    afterBlockId: "before-list",
    variant: "card",
    label: serviceLabel,
    title: "Book the sights before you fly",
    body: () =>
      "Some of China's best-known sights take bookings only in each visitor's own passport name, and the Forbidden City opens them just 7 days ahead. Homeground China books selected attractions for you, from the Forbidden City to the Terracotta Warriors and the Chengdu panda base. Send your dates and group size, and get a written quote before you pay.",
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
    feeUnit: "booking service fee per person, plus the official boat fare",
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
    feeUnit: "booking service fee per person, plus the ticket at face value",
    action: "Send your date",
  }],
  // 2026-10-19 owner: itinerary and planning guides name sights that need a
  // booking, yet many readers expect to buy at the gate. State the real rule
  // where they plan the route, then offer the booking. Appended after the
  // original five so the translation order stays aligned.
  "china-14-day-itinerary": [{
    afterBlockId: "fit",
    variant: "card",
    label: serviceLabel,
    title: "Before you fly: book the sights on this route",
    body: () =>
      "Several sights on this route are entered only with a booking made in each traveller's own passport name. The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time. The Chengdu panda base sells online up to 14 days ahead. Homeground China can book the ones on your route together: send your dates and group size, and get a written quote before you pay.",
    feeUnit: generalFeeUnit,
    examples: [
      { attractionId: "forbidden-city", label: "Forbidden City" },
      { attractionId: "temple-of-heaven", label: "Temple of Heaven" },
      { attractionId: "terracotta-warriors", label: "Terracotta Warriors" },
      { attractionId: "chengdu-panda-base", label: "Chengdu panda base" },
      { attractionId: "sanxingdui-museum", label: "Sanxingdui Museum" },
    ],
    action: seeAttractions,
    smallPrint: () => [guaranteeLine],
  }],
  "china-10-day-itinerary": [{
    afterBlockId: "duration-options",
    variant: "card",
    label: serviceLabel,
    title: "Before you fly: book the sights on this route",
    body: () =>
      "Several sights on this route are entered only with a booking made in each traveller's own passport name. The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time. Homeground China can book the ones on your route together: send your dates and group size, and get a written quote before you pay.",
    feeUnit: generalFeeUnit,
    examples: [
      { attractionId: "forbidden-city", label: "Forbidden City" },
      { attractionId: "temple-of-heaven", label: "Temple of Heaven" },
      { attractionId: "great-wall-badaling", label: "Badaling Great Wall" },
      { attractionId: "terracotta-warriors", label: "Terracotta Warriors" },
    ],
    action: seeAttractions,
    smallPrint: () => [guaranteeLine],
  }],
  "china-7-day-itinerary": [{
    afterBlockId: "time-2",
    variant: "card",
    label: serviceLabel,
    title: "Before you fly: book the sights on this route",
    body: () =>
      "On a seven-day trip there is no spare day to make up for a missed booking. The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time, in each traveller's own passport name. Homeground China can book the sights on your route together: send your dates and group size, and get a written quote before you pay.",
    feeUnit: generalFeeUnit,
    examples: [
      { attractionId: "forbidden-city", label: "Forbidden City" },
      { attractionId: "great-wall-badaling", label: "Badaling Great Wall" },
      { attractionId: "terracotta-warriors", label: "Terracotta Warriors" },
      { attractionId: "humble-administrators-garden", label: "Humble Administrator's Garden, Suzhou" },
    ],
    action: seeAttractions,
    smallPrint: () => [guaranteeLine],
  }],
  "beijing-where-to-stay-first-trip": [{
    afterBlockId: "hutong-arrival-photo",
    variant: "card",
    label: serviceLabel,
    title: "Hotel settled? Book Beijing's sights next",
    body: () =>
      "The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time, in each traveller's own passport name. Mutianyu Great Wall and the Temple of Heaven are booked by real name too. Homeground China can book them together: send your dates and group size, and get a written quote before you pay.",
    feeUnit: generalFeeUnit,
    examples: [
      { attractionId: "forbidden-city", label: "Forbidden City" },
      { attractionId: "great-wall-mutianyu", label: "Mutianyu Great Wall" },
      { attractionId: "temple-of-heaven", label: "Temple of Heaven" },
      { attractionId: "summer-palace", label: "Summer Palace" },
    ],
    action: seeAttractions,
    smallPrint: () => [guaranteeLine],
  }],
  "first-china-trip-jiangnan-6-or-beijing-11-days": [{
    afterBlockId: "compare",
    variant: "card",
    label: serviceLabel,
    title: "Whichever trip you choose, book its sights before you fly",
    body: () =>
      "The Beijing route depends on bookings made in each traveller's own passport name. The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time. Homeground China can book the sights on your route together: send your dates and group size, and get a written quote before you pay.",
    feeUnit: generalFeeUnit,
    examples: [
      { attractionId: "forbidden-city", label: "Forbidden City" },
      { attractionId: "great-wall-mutianyu", label: "Mutianyu Great Wall" },
      { attractionId: "temple-of-heaven", label: "Temple of Heaven" },
      { attractionId: "terracotta-warriors", label: "Terracotta Warriors" },
    ],
    action: seeAttractions,
    smallPrint: () => [guaranteeLine],
  }],
  "china-family-private-tours": [{
    afterBlockId: "limits",
    variant: "card",
    label: serviceLabel,
    title: "Travelling with children? Book the big sights before you fly",
    body: () =>
      "Children need their own booking in their own passport name, just like adults. The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time. The Chengdu panda base sells online up to 14 days ahead, by morning or afternoon entry. Homeground China can book them for the whole family: send your dates and group size, and get a written quote before you pay.",
    feeUnit: generalFeeUnit,
    examples: [
      { attractionId: "forbidden-city", label: "Forbidden City" },
      { attractionId: "great-wall-mutianyu", label: "Mutianyu Great Wall" },
      { attractionId: "terracotta-warriors", label: "Terracotta Warriors" },
      { attractionId: "chengdu-panda-base", label: "Chengdu panda base" },
    ],
    action: seeAttractions,
    smallPrint: () => [guaranteeLine],
  }],
  "beijing-xian-chengdu-route-order": [{
    afterBlockId: "gateway-scenarios",
    variant: "card",
    label: serviceLabel,
    title: "Route settled? Book the sights that open days ahead",
    body: () =>
      "Each city on this route has a sight that opens its bookings only days before the visit. The Forbidden City opens 7 days ahead at 20:00 China time and sells nothing on the day; the Shaanxi History Museum opens 5 days ahead at 17:00; the Chengdu panda base sells online up to 14 days ahead. Homeground China can book them together in each traveller's own passport name: send your dates and group size, and get a written quote before you pay.",
    feeUnit: generalFeeUnit,
    examples: [
      { attractionId: "forbidden-city", label: "Forbidden City" },
      { attractionId: "terracotta-warriors", label: "Terracotta Warriors" },
      { attractionId: "shaanxi-history-museum", label: "Shaanxi History Museum" },
      { attractionId: "chengdu-panda-base", label: "Chengdu panda base" },
    ],
    action: seeAttractions,
    smallPrint: () => [guaranteeLine],
  }],
  "china-online-arrival-card": [{
    afterBlockId: "final-checklist",
    variant: "card",
    label: serviceLabel,
    title: "Arrival card done? Book the sights before you fly",
    body: () =>
      "The arrival card gets you through the border; the big sights need their own booking, made online in each traveller's own passport name. The Forbidden City sells no tickets on the day: they open 7 days ahead at 20:00 China time. Homeground China can book the sights on your route: send your dates and group size, and get a written quote before you pay.",
    feeUnit: generalFeeUnit,
    examples: [
      { attractionId: "forbidden-city", label: "Forbidden City" },
      { attractionId: "terracotta-warriors", label: "Terracotta Warriors" },
      { attractionId: "chengdu-panda-base", label: "Chengdu panda base" },
      { attractionId: "li-river-cruise", label: "Li River cruise" },
    ],
    action: seeAttractions,
    smallPrint: () => [guaranteeLine],
  }],
};

/** Guide-specific wording for the existing attraction booking card (GuideReservationCta). */
const ctaWording: Record<string, { title: string; feeUnit: string; body: (rule: AttractionReservationRule) => string; action: string }> = {
  "li-river-cruise-tickets-piers-booking": {
    title: "Let Homeground China book your Li River cruise",
    feeUnit: "booking service fee per person, plus the official boat fare",
    body: () =>
      `Send your sailing date, the number of travellers and the boat class you want. We check that the booking accepts your passports, confirm the boarding pier and your full quote in writing before you pay, then send each traveller's booking record. ${guaranteeLine}`,
    action: "Send your date and group size",
  },
  "forbidden-city-for-foreign-visitors": {
    title: "The Forbidden City sells no tickets on the day.",
    feeUnit: "booking service fee per person, plus the official ticket price",
    body: (rule) =>
      `Tickets open ${rule.release?.en.split(";")[0] ?? "ahead of your date"}, in each traveller's own passport name, and nothing is sold at the gate. Once a date is fully booked, nothing at the gate will get you in that day; type one passport number wrong and the ticket cannot be changed to fix it. Booking it yourself also means an English portal account with email verification. Leave it to Homeground China: send your date and group size, get a written quote before you pay, and receive each traveller's booking record. ${guaranteeLine}`,
    action: "Send your date and group size",
  },
  // 2026-10-19 owner: lead with the booking rule many visitors only meet at the gate.
  "national-museum-of-china-booking-and-route": {
    title: "The National Museum is free, but entry needs a booking in your passport name.",
    feeUnit: "booking service fee per person; basic admission is free",
    body: (rule) =>
      `Every visitor is booked in their own passport name. When places open: ${rule.release?.en ?? "ahead of your date"}. Leave it to Homeground China: send your date and group size, get a written quote before you pay, and receive each traveller's booking record. ${guaranteeLine}`,
    action: "Send your date and group size",
  },
  "shaanxi-history-museum-booking-and-collection-plan": {
    title: "Shaanxi History Museum bookings open only 5 days ahead.",
    feeUnit: "booking service fee per person; basic admission is free",
    body: (rule) =>
      `Basic admission is free, but every visitor needs a booking in their own passport name. When places open: ${rule.release?.en ?? "ahead of your date"}. Leave it to Homeground China: send your date and group size, get a written quote before you pay, and receive each traveller's booking record. ${guaranteeLine}`,
    action: "Send your date and group size",
  },
  "chengdu-panda-base-or-dujiangyan-panda-valley": {
    title: "Panda Base tickets are sold online, by morning or afternoon entry.",
    feeUnit: "booking service fee per person, plus the official ticket price",
    body: (rule) =>
      `Tickets are booked in each traveller's own passport name. When they open: ${rule.release?.en ?? "ahead of your date"}. Leave it to Homeground China: send your date and group size, get a written quote before you pay, and receive each traveller's booking record. ${guaranteeLine}`,
    action: "Send your date and group size",
  },
  "jade-dragon-snow-mountain-cable-car-booking": {
    title: "Jade Dragon cable cars open each evening, 7 days ahead.",
    feeUnit: "booking service fee per person, plus the official ticket price",
    body: (rule) =>
      `When places open: ${rule.release?.en ?? "ahead of your date"}. Entry is booked in each traveller's own name. Leave it to Homeground China: send your date and group size, get a written quote before you pay, and receive each traveller's booking record. ${guaranteeLine}`,
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

export function getGuideReservationOffers(guideId: string, locale: GuideReservationLocale): readonly GuideReservationOffer[] {
  if (locale !== "en") {
    const copy = guideReservationOfferTranslations[locale];
    const index = Object.keys(offers).indexOf(guideId);
    if (index < 0) return [];
    const translated = copy.offers[index];
    // An offer exists only in the languages that translate it (the newer route offers: Chinese and Korean).
    if (!translated) return [];
    return (offers[guideId] ?? []).map(spec => {
      const rule = spec.attractionId ? offeredRule(spec.attractionId, guideId) : null;
      const ruleCopy = rule ? localizedReservationRule(rule, locale) : null;
      const smallPrint = guideId === "tianmen-mountain-tickets-and-routes" ? [copy.tianmenNote] : spec.variant === "line" ? [] : [
        ...(rule?.price?.kind === "cny" && ruleCopy ? [`${copy.publishedFare}: ${localizedReservationMoney(rule.price.amount, locale)}, ${ruleCopy.basis}.`] : []),
        ...(ruleCopy?.disclosure ? [ruleCopy.disclosure] : []),
        copy.guarantee.replace("{days}", String(days)),
      ];
      return { afterBlockId:spec.afterBlockId, variant:spec.variant, label:copy.label, ...translated,
        fee:localizedReservationFee(locale), feeUnit:spec.attractionId === "li-river-cruise" ? copy.boatFeeUnit : copy.feeUnit,
        examplesLabel:copy.examples,
        examples:(spec.examples ?? []).map(example => ({...example,label:localizedReservationRule(offeredRule(example.attractionId,guideId),locale).name,href:localizedReservationHref(locale,example.attractionId)})),
        action:spec.attractionId ? copy.dateAction : copy.action, href:localizedReservationHref(locale,spec.attractionId), smallPrint };
    });
  }
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
      examplesLabel: "Attractions we can book",
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

export function getGuideReservationCtaWording(guideId: string, locale: GuideReservationLocale, rule: AttractionReservationRule) {
  if (locale !== "en" && ctaWording[guideId]) {
    const copy=guideReservationOfferTranslations[locale];
    const card=copy.cards?.[guideId];
    if (card) {
      return {title:card.title, body:`${card.body.replace("{release}",localizedReservationRule(rule,locale).release ?? "")} ${copy.guarantee.replace("{days}",String(days))}`,
        feeUnit:copy.feeUnit, action:copy.dateAction};
    }
    if (guideId !== "li-river-cruise-tickets-piers-booking" && guideId !== "forbidden-city-for-foreign-visitors") return null;
    const cruise=guideId === "li-river-cruise-tickets-piers-booking";
    const wording=cruise ? copy.cruiseCard : copy.palaceCard;
    return {title:wording.title, body:`${wording.body.replace("{release}",localizedReservationRule(rule,locale).release ?? "")} ${copy.guarantee.replace("{days}",String(days))}`,
      feeUnit:cruise ? copy.boatFeeUnit : copy.feeUnit, action:copy.dateAction};
  }
  const wording = locale === "en" ? ctaWording[guideId] : undefined;
  return wording ? { title: wording.title, feeUnit: wording.feeUnit, body: wording.body(rule), action: wording.action } : null;
}

/** For tests: every guide that carries an offer or reworded card. */
export const guideReservationOfferGuideIds = Object.freeze(Object.keys(offers));
export const guideReservationCtaWordingGuideIds = Object.freeze(Object.keys(ctaWording));

export function localizedReservationHref(locale: GuideReservationLocale, attractionId?: string) {
  const path = `${locale === "en" ? "" : `/${locale}`}/services/china-attraction-reservations/`;
  return attractionId ? `${path}?attraction=${encodeURIComponent(attractionId)}#reservation-enquiry` : path;
}
export function localizedReservationMoney(amount: number, locale: GuideReservationLocale) {
  return locale === "en" || locale === "zh" || locale === "ko" ? formatAttractionFaceValue(amount,locale) : formatAttractionReservationEditionMoney(amount,locale);
}
export function localizedReservationFee(locale: GuideReservationLocale) {
  return locale === "en" || locale === "zh" || locale === "ko" ? formatAttractionReservationFee(attractionReservationServiceFeeCny,locale) : formatAttractionReservationEditionMoney(attractionReservationServiceFeeCny,locale);
}
export function localizedReservationRule(rule: AttractionReservationRule, locale: GuideReservationLocale) {
  return locale === "en" || locale === "zh" || locale === "ko" ? {name:rule.name[locale], release:rule.release?.[locale], basis:rule.price?.kind === "cny" ? rule.price.basis[locale] : undefined, disclosure:rule.disclosure?.[locale]} : getAttractionReservationEditionRule(rule,locale);
}
