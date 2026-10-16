"use client";

import { HomegroundFooter } from "./HomegroundFooter";
import { getHomegroundCopy } from "../lib/homegroundI18n";
import { footerDestinationLinks } from "../lib/footerDestinationLinks";
export { FrenchSiteHeader, FrenchTourHeader } from "./FrenchHeader";

export function FrenchSiteFooter({ currentPath, variant = "default" }: { currentPath: string; variant?: "default" | "homepage" }) {
  const source = getHomegroundCopy("en");
  const copy = { ...source, htmlLang: "fr", path: "/fr/", businessDescriptor: "Agence de voyages en Chine", navigation: { ...source.navigation, studio: "Notre équipe", faq: "Questions fréquentes", visa: "Formalités d’entrée (en anglais)" }, cities: { ...source.cities, listLabel: "Nos destinations — guides en anglais" }, footer: { ...source.footer, copyright: (year: number) => `© ${year} Homeground China. Tous droits réservés.` } };
  const names: Record<string, string> = { beijing: "Pékin", shanghai: "Shanghai", xian: "Xi’an", chengdu: "Chengdu", guangzhou: "Canton", hangzhou: "Hangzhou", zhangjiajie: "Zhangjiajie", chongqing: "Chongqing" };
  return <HomegroundFooter locale="en" pageContext={variant === "homepage" ? "home" : currentPath === "/fr/tours/" ? "tours" : currentPath === "/fr/guides/" ? "guides" : currentPath === "/fr/studio/" ? "studio" : "content"} variant={variant} edition={{
    copy,
    sectionLabels: { guides: "Conseils de voyage", services: "Tous nos services", fullTripSupport: "Voyage sur mesure", attractionReservations: "Réserver des billets", legalLabel: "Informations légales et services", legalHeading: "Informations légales", exploreHeading: "Explorer", destinationsHeading: "Destinations · en anglais", homegroundHeading: "Homeground", socialLabel: "Suivre Homeground", privateTours: "Nos circuits", allDestinations: "Toutes les destinations (en anglais)", operatorPrefix: "Homeground est exploité par", operatorSuffix: ".", codeLabel: "Code unifié de crédit social", licenceLabel: "Licence d’agence de voyages" },
    related: { business: "Informations légales", terms: "Conditions de service", refund: "Remboursement et livraison", privacy: "Confidentialité", contact: "Nous écrire" },
    company: { path: "/company/", navLabel: "Notre approche (en anglais)" }, manageConsent: "Choix de confidentialité",
    cityLinks: footerDestinationLinks.en.map(city => ({ ...city, label: names[city.id] ?? city.label })),
    paths: { privacy: "/fr/privacy/", business: "/fr/business-information/", terms: "/fr/terms/", refund: "/fr/refund-delivery/", services: "/fr/services/", fullTripSupport: "/fr/services/full-trip-support/", reservations: "/fr/services/china-attraction-reservations/", guides: "/fr/guides/", tours: "/fr/tours/", destinations: "/explore/", studio: "/fr/studio/" },
  }} />;
}
