"use client";

import { HomegroundFooter } from "./HomegroundFooter";
import { getHomegroundCopy } from "../lib/homegroundI18n";
import { footerDestinationLinks } from "../lib/footerDestinationLinks";
export { GermanSiteHeader, GermanTourHeader } from "./GermanHeader";

export function GermanSiteFooter({ currentPath, variant = "default" }: { currentPath: string; variant?: "default" | "homepage" }) {
  const source = getHomegroundCopy("en");
  const copy = { ...source, htmlLang: "de", path: "/de/", businessDescriptor: "Reiseveranstalter in China", navigation: { ...source.navigation, studio: "Unser Team", faq: "Häufige Fragen", visa: "Einreise (Englisch)" }, cities: { ...source.cities, listLabel: "Unsere Reiseziele – Ratgeber auf Englisch" }, footer: { ...source.footer, copyright: (year: number) => `© ${year} Homeground China. Alle Rechte vorbehalten.` } };
  const names: Record<string, string> = { beijing: "Peking", shanghai: "Shanghai", xian: "Xi’an", chengdu: "Chengdu", guangzhou: "Guangzhou", hangzhou: "Hangzhou", zhangjiajie: "Zhangjiajie", chongqing: "Chongqing" };
  return <HomegroundFooter locale="en" pageContext={variant === "homepage" ? "home" : currentPath === "/de/tours/" ? "tours" : currentPath === "/de/guides/" ? "guides" : currentPath === "/de/studio/" ? "studio" : "content"} variant={variant} edition={{
    copy,
    sectionLabels: { guides: "Reisetipps", services: "Alle Leistungen", fullTripSupport: "Individuelle Reiseplanung", attractionReservations: "Tickets buchen lassen", legalLabel: "Rechtliches und Leistungen", legalHeading: "Rechtliche Angaben", exploreHeading: "Entdecken", destinationsHeading: "Reiseziele · Englisch", homegroundHeading: "Homeground", socialLabel: "Homeground folgen", privateTours: "Unsere Reisen", allDestinations: "Alle Reiseziele (Englisch)", operatorPrefix: "Homeground wird betrieben von", operatorSuffix: ".", codeLabel: "Einheitlicher Sozialkreditcode", licenceLabel: "Reiseveranstalterlizenz" },
    related: { business: "Rechtliche Angaben", terms: "Leistungsbedingungen", refund: "Erstattung und Leistungserbringung", privacy: "Datenschutz", contact: "Kontakt" },
    company: { path: "/de/company/", navLabel: "Unser Ansatz" }, manageConsent: "Datenschutzeinstellungen",
    cityLinks: footerDestinationLinks.en.map(city => ({ ...city, label: names[city.id] ?? city.label })),
    paths: { privacy: "/de/privacy/", business: "/de/business-information/", terms: "/de/terms/", refund: "/de/refund-delivery/", services: "/de/services/", fullTripSupport: "/de/services/full-trip-support/", reservations: "/de/services/china-attraction-reservations/", guides: "/de/guides/", tours: "/de/tours/", destinations: "/explore/", studio: "/de/studio/" },
  }} />;
}
