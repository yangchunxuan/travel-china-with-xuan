import { ArabicSiteHeader, ArabicSiteFooter } from './ArabicChrome';
import { GermanSiteHeader, GermanSiteFooter } from './GermanChrome';
import { FrenchSiteHeader, FrenchSiteFooter } from './FrenchChrome';
import { SpanishSiteHeader, SpanishSiteFooter } from './SpanishChrome';
import { serviceDetailLanguagePaths, serviceEditionPath, type ServiceEditionLocale } from '../lib/serviceEdition';
import { JapaneseSiteHeader, JapaneseSiteFooter } from './JapaneseTourChrome';

export function ServiceEditionHeader({ language, slug, plannerHrefOverride }: { language: ServiceEditionLocale; slug: string; plannerHrefOverride?: string }) {
  const props = { currentPath: serviceEditionPath(language, slug), languagePaths: serviceDetailLanguagePaths(slug), ...(plannerHrefOverride ? { contactHref: plannerHrefOverride } : {}) };
  if (language === 'ja') return <JapaneseSiteHeader contactMode="anchor" currentPath={props.currentPath} languagePaths={props.languagePaths} contactHref={plannerHrefOverride ?? '#reservation-form'} />;
  return language === 'ar' ? <ArabicSiteHeader {...props} /> : language === 'de' ? <GermanSiteHeader {...props} /> : language === 'fr' ? <FrenchSiteHeader {...props} /> : <SpanishSiteHeader {...props} />;
}
export function ServiceEditionFooter({ language, slug }: { language: ServiceEditionLocale; slug: string }) {
  const currentPath = serviceEditionPath(language, slug);
  if (language === 'ja') return <JapaneseSiteFooter currentPath={currentPath} />;
  return language === 'ar' ? <ArabicSiteFooter currentPath={currentPath} /> : language === 'de' ? <GermanSiteFooter currentPath={currentPath} /> : language === 'fr' ? <FrenchSiteFooter currentPath={currentPath} /> : <SpanishSiteFooter currentPath={currentPath} />;
}
