"use client";

import { HomegroundFooter } from "./HomegroundFooter";
import { getHomegroundCopy } from "../lib/homegroundI18n";
import { destinationEditionFooterCityLinks, destinationsHubEditionPath, hasAllDestinationEditionCities } from "../lib/destinationEditions";
export { FrenchSiteHeader, FrenchTourHeader } from "./FrenchHeader";

export function FrenchSiteFooter({ currentPath, variant = "default" }: { currentPath: string; variant?: "default" | "homepage" }) {
  const source = getHomegroundCopy("en");
  // The city links open the French city pages; the list stops saying "in English" once all eight are French.
  const localCities = hasAllDestinationEditionCities("fr");
  const copy = { ...source, htmlLang: "fr", path: "/fr/", businessDescriptor: "Agence de voyages en Chine", navigation: { ...source.navigation, studio: "Studio", faq: "Questions fréquentes", visa: "Formalités d’entrée" }, cities: { ...source.cities, listLabel: localCities ? "Nos destinations" : "Nos destinations — guides en anglais" }, footer: { ...source.footer, copyright: (year: number) => `© ${year} Homeground China. Tous droits réservés.` } };
  const names: Record<string, string> = { beijing: "Pékin", shanghai: "Shanghai", xian: "Xi’an", chengdu: "Chengdu", guangzhou: "Canton", hangzhou: "Hangzhou", zhangjiajie: "Zhangjiajie", chongqing: "Chongqing" };
  return <HomegroundFooter locale="en" pageContext={variant === "homepage" ? "home" : currentPath === "/fr/tours/" ? "tours" : currentPath === "/fr/guides/" ? "guides" : currentPath === "/fr/studio/" ? "studio" : currentPath === "/fr/company/" ? "company" : "content"} variant={variant} edition={{
    copy,
    sectionLabels: { guides: "Conseils de voyage", services: "Tous nos services", fullTripSupport: "Voyage sur mesure", attractionReservations: "Nous confier vos billets", legalLabel: "Informations légales et services", legalHeading: "Informations légales", exploreHeading: "Explorer", destinationsHeading: localCities ? "Destinations" : "Destinations · en anglais", homegroundHeading: "Homeground", socialLabel: "Suivre Homeground", privateTours: "Nos circuits", allDestinations: "Toutes les destinations", operatorPrefix: "Homeground est exploité par", operatorSuffix: ".", codeLabel: "Code unifié de crédit social", licenceLabel: "Licence d’agence de voyages" },
    related: { business: "Informations légales", terms: "Conditions de service", refund: "Remboursement et livraison", privacy: "Confidentialité", contact: "Nous écrire" },
    company: { path: "/fr/company/", navLabel: "Notre mission" }, manageConsent: "Choix de confidentialité",
    cityLinks: destinationEditionFooterCityLinks("fr", names),
    paths: { privacy: "/fr/privacy/", business: "/fr/business-information/", terms: "/fr/terms/", refund: "/fr/refund-delivery/", services: "/fr/services/", fullTripSupport: "/fr/services/full-trip-support/", reservations: "/fr/services/china-attraction-reservations/", guides: "/fr/guides/", tours: "/fr/tours/", destinations: destinationsHubEditionPath.fr, studio: "/fr/studio/", entry: "/fr/guides/china-entry-requirements/" },
  }} />;
}
