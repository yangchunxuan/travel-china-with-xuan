// @ts-ignore Source-TypeScript tests require the explicit extension.
import { aeropuertoGuangzhouBaiyun } from "./spanish-guides/aeropuerto-guangzhou-baiyun.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { comoPagarEnChina } from "./spanish-guides/como-pagar-en-china.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { dondeAlojarseEnPekin } from "./spanish-guides/donde-alojarse-en-pekin.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { espectaculosNocturnosZhangjiajie } from "./spanish-guides/espectaculos-nocturnos-zhangjiajie.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { guerrerosDeTerracotaXian } from "./spanish-guides/guerreros-de-terracota-xian.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { montanasDeAvatarChina } from "./spanish-guides/montanas-de-avatar-china.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { murallaChinaDesdePekin } from "./spanish-guides/muralla-china-desde-pekin.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { ososPandaChengdu } from "./spanish-guides/osos-panda-chengdu.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { puenteDeCristalZhangjiajie } from "./spanish-guides/puente-de-cristal-zhangjiajie.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { tarjetaDeLlegadaChina } from "./spanish-guides/tarjeta-de-llegada-china.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { visaChinaMexicanos } from "./spanish-guides/visa-china-mexicanos.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { visadoChinaEspanoles } from "./spanish-guides/visado-china-espanoles.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { yangshuoQueVer } from "./spanish-guides/yangshuo-que-ver.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { precioViajeAChina } from "./spanish-guides/precio-viaje-a-china.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { chinaPorLibreOViajeOrganizado } from "./spanish-guides/china-por-libre-o-viaje-organizado.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { comoElegirAgenciaViajeChina } from "./spanish-guides/como-elegir-agencia-viaje-china.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { entradasCiudadProhibidaTiananmen } from "./spanish-guides/entradas-ciudad-prohibida-tiananmen.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { circuitoChinaCiudadProhibida } from "./spanish-guides/circuito-china-ciudad-prohibida.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { entradasGuerrerosTerracotaPandasChengdu } from "./spanish-guides/entradas-guerreros-terracota-pandas-chengdu.ts";
import type { SpanishGuide } from "./spanishGuideTypes";

export type { SpanishGuide } from "./spanishGuideTypes";

/** Spanish guides, in the order the Spanish guides page lists them. */
export const spanishGuides: readonly SpanishGuide[] = Object.freeze([
  // Before the trip.
  visadoChinaEspanoles,
  visaChinaMexicanos,
  comoPagarEnChina,
  tarjetaDeLlegadaChina,
  // Places.
  murallaChinaDesdePekin,
  dondeAlojarseEnPekin,
  guerrerosDeTerracotaXian,
  ososPandaChengdu,
  montanasDeAvatarChina,
  puenteDeCristalZhangjiajie,
  espectaculosNocturnosZhangjiajie,
  yangshuoQueVer,
  aeropuertoGuangzhouBaiyun,
  // Prices, tickets and choosing how to travel.
  precioViajeAChina,
  chinaPorLibreOViajeOrganizado,
  comoElegirAgenciaViajeChina,
  entradasCiudadProhibidaTiananmen,
  circuitoChinaCiudadProhibida,
  entradasGuerrerosTerracotaPandasChengdu,
]);

export function spanishGuidePath(slug: string): string {
  return `/es/guias/${slug}/`;
}

export function getSpanishGuide(slug: string): SpanishGuide | undefined {
  return spanishGuides.find((guide) => guide.slug === slug);
}

/** Spanish page of an English guide, if one exists (for hreflang). */
export function getSpanishGuidePathForSource(guideId: string): string | undefined {
  const guide = spanishGuides.find((candidate) => candidate.sourceGuideId === guideId);
  return guide ? spanishGuidePath(guide.slug) : undefined;
}

/** Guides about a tour's places first, then the guides every traveller needs. */
export function spanishGuidesForTour(tourSlug: string) {
  const specific = spanishGuides.filter((guide) => !guide.general && guide.tourSlugs.includes(tourSlug));
  const general = spanishGuides.filter((guide) => guide.general);
  return [...specific, ...general]
    .map((guide) => ({ slug: guide.slug, path: spanishGuidePath(guide.slug), navTitle: guide.navTitle }));
}
