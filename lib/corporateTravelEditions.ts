import en from "./corporateTravelLocales/en.json" with { type: "json" };
import zh from "./corporateTravelLocales/zh.json" with { type: "json" };
import ko from "./corporateTravelLocales/ko.json" with { type: "json" };
import ja from "./corporateTravelLocales/ja.json" with { type: "json" };
import es from "./corporateTravelLocales/es.json" with { type: "json" };
import fr from "./corporateTravelLocales/fr.json" with { type: "json" };
import de from "./corporateTravelLocales/de.json" with { type: "json" };
import ar from "./corporateTravelLocales/ar.json" with { type: "json" };
import type { CorporateFaq, CorporateTrip } from "./corporateTravelTypes";
import type { CorporateLocale } from "./corporateTravelLocalePaths";

export interface CorporateEdition {
  ui: Record<string, string>;
  hub: { title: string; description: string; faqs: CorporateFaq[]; purposes: { id: string; number: string; title: string; body: string; note: string }[] };
  trips: CorporateTrip[];
}
const editions = { en, zh, ko, ja, es, fr, de, ar } as unknown as Record<CorporateLocale, CorporateEdition>;
/** Server-only content selection; clients receive only their current UI strings. */
export function getCorporateEdition(locale: CorporateLocale = "en"): CorporateEdition { return editions[locale]; }
export function corporateTranslator(copy: Record<string, string>) {
  return (source: string) => copy[source] ?? source;
}
