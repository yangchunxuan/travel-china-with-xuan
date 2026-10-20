import type { HomegroundServiceNavigationId } from "./homegroundNavigationModel";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { japaneseDestinationEditionNavigation } from "./japaneseDestinationEditionUi.ts";

type Entry = { readonly label: string; readonly description: string; readonly href: string };

/**
 * What each edition's header menu says, for the edition Destinations pages:
 * where the Destinations step of the breadcrumb goes (the edition's own
 * destinations hub, lib/destinationEditions.ts) and the service rows, named
 * and described exactly as the edition's Services menu names them
 * (components/FrenchHeader.tsx and the others; Japanese, whose header has no
 * Services menu, as its services page names them).
 * supabase/tests/sights-inspiration-editions.test.mjs keeps them equal.
 */
export const destinationEditionNavigation: Readonly<Record<"fr" | "es" | "de" | "ar" | "ja", {
  readonly destinationsHref: string;
  readonly services: Readonly<Record<HomegroundServiceNavigationId, Entry>>;
}>> = {
  fr: {
    destinationsHref: "/fr/explore/",
    services: {
      "attraction-tickets": { label: "Billets et réservations", description: "Vos billets, sans les démarches. Contactez-nous dès vos dates fixées.", href: "/fr/services/china-attraction-reservations/" },
      "english-guides": { label: "Guides anglophones privés", description: "Un guide à la journée dans quatre villes ; guide francophone en supplément", href: "/fr/services/private-english-speaking-guides/" },
      "private-car": { label: "Voiture avec chauffeur", description: "Transferts aéroport et journées en véhicule privé", href: "/fr/services/private-car-and-driver/" },
      "trip-support": { label: "Organisation du séjour", description: "Hôtels, transferts et coordination sur place", href: "/fr/services/full-trip-support/" },
    },
  },
  es: {
    destinationsHref: "/es/explore/",
    services: {
      "attraction-tickets": { label: "Entradas y reservas", description: "Reservamos tus entradas. Escríbenos en cuanto tengas fechas.", href: "/es/services/china-attraction-reservations/" },
      "english-guides": { label: "Guías privados en inglés", description: "Guías por días en cuatro ciudades; el español tiene suplemento", href: "/es/services/private-english-speaking-guides/" },
      "private-car": { label: "Vehículo con conductor", description: "Traslados de aeropuerto y recorridos en vehículo privado", href: "/es/services/private-car-and-driver/" },
      "trip-support": { label: "Organización del viaje", description: "Hoteles, traslados y coordinación durante el viaje", href: "/es/services/full-trip-support/" },
    },
  },
  de: {
    destinationsHref: "/de/explore/",
    services: {
      "attraction-tickets": { label: "Tickets und Reservierungen", description: "Wir buchen Ihre Tickets. Melden Sie sich, sobald Ihre Termine feststehen.", href: "/de/services/china-attraction-reservations/" },
      "english-guides": { label: "Private englischsprachige Reiseleitung", description: "Private Tagesführungen auf Englisch in vier Städten", href: "/de/services/private-english-speaking-guides/" },
      "private-car": { label: "Privatwagen mit Fahrer", description: "Flughafentransfers und Tagesfahrten im Privatwagen", href: "/de/services/private-car-and-driver/" },
      "trip-support": { label: "Reiseorganisation", description: "Hotels, Transfers und Koordination vor Ort", href: "/de/services/full-trip-support/" },
    },
  },
  ar: {
    destinationsHref: "/ar/explore/",
    services: {
      "attraction-tickets": { label: "التذاكر والحجوزات", description: "نتولى حجز تذاكرك. راسلنا فور تحديد مواعيدك.", href: "/ar/services/china-attraction-reservations/" },
      "english-guides": { label: "مرشد خاص باللغة الإنجليزية", description: "جولات يومية خاصة بالإنجليزية في أربع مدن", href: "/ar/services/private-english-speaking-guides/" },
      "private-car": { label: "سيارة خاصة مع سائق", description: "انتقالات المطار والرحلات اليومية بسيارة خاصة", href: "/ar/services/private-car-and-driver/" },
      "trip-support": { label: "تنظيم الرحلة", description: "الإقامة والانتقالات والتنسيق المحلي", href: "/ar/services/full-trip-support/" },
    },
  },
  ja: japaneseDestinationEditionNavigation,
};
