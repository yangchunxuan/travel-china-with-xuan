import { editionLanguagePaths } from "../lib/editionLanguagePaths";
import type { ServiceEditionLocale } from "../lib/serviceEdition";
import { ArabicSiteFooter, ArabicSiteHeader } from "./ArabicChrome";
import { FrenchSiteFooter, FrenchSiteHeader } from "./FrenchChrome";
import { GermanSiteFooter, GermanSiteHeader } from "./GermanChrome";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import { SpanishSiteFooter, SpanishSiteHeader } from "./SpanishChrome";

/** The site editions with their own header and footer: French, Spanish, German, Arabic and Japanese. */
export type SiteEditionLocale = ServiceEditionLocale;

/**
 * Header for a page shared by several editions, so each page does not repeat
 * the per-language choice. The menu itself is each edition's own and stays the
 * same on every page.
 */
export function EditionSiteHeader({ language, currentPath, languagePaths, contactHref }: {
  language: SiteEditionLocale;
  currentPath: string;
  languagePaths: Readonly<Partial<Record<string, string>>>;
  contactHref?: string;
}) {
  const props = { currentPath, languagePaths: editionLanguagePaths(languagePaths), ...(contactHref ? { contactHref } : {}) };
  if (language === "ja") return <JapaneseSiteHeader {...props} contactHref={contactHref ?? "/ja/#planner-contact"} />;
  if (language === "fr") return <FrenchSiteHeader {...props} />;
  if (language === "es") return <SpanishSiteHeader {...props} />;
  if (language === "de") return <GermanSiteHeader {...props} />;
  return <ArabicSiteHeader {...props} />;
}

export function EditionSiteFooter({ language, currentPath }: { language: SiteEditionLocale; currentPath: string }) {
  if (language === "ja") return <JapaneseSiteFooter currentPath={currentPath} />;
  if (language === "fr") return <FrenchSiteFooter currentPath={currentPath} />;
  if (language === "es") return <SpanishSiteFooter currentPath={currentPath} />;
  if (language === "de") return <GermanSiteFooter currentPath={currentPath} />;
  return <ArabicSiteFooter currentPath={currentPath} />;
}
