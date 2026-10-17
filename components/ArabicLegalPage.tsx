import { getArabicLegalCopy, type ArabicLegalPageId } from '../lib/arabicLegalCopy';
import { getArabicLegalLayoutCopy, getArabicPrivacyLayoutCopy } from '../lib/arabicLegalLayoutCopy';
import { arabicLanguagePaths } from '../lib/arabicSite';
import { getNewsletterEndpoint } from '../lib/newsletter';
import { ArabicSiteHeader, ArabicSiteFooter } from './ArabicChrome';
import { HomegroundLegalPage } from './HomegroundLegalPage';
import { HomegroundPrivacyPage } from './HomegroundPrivacyPage';
import privacyStyles from './HomegroundPrivacyPage.module.css';

export function ArabicLegalPage({ pageId }: { pageId: ArabicLegalPageId | 'business-information' }) {
  const path = `/ar/${pageId}/`;
  const header = <ArabicSiteHeader currentPath={path} languagePaths={arabicLanguagePaths(`/${pageId}/`, path)} />;
  const footer = <ArabicSiteFooter currentPath={path} />;
  if (pageId === 'privacy') {
    const copy = getArabicPrivacyLayoutCopy();
    const newsletter = getArabicLegalCopy('privacy').sections.find(s => s.id === 'newsletter');
    return <>
      <HomegroundPrivacyPage edition={{ copy, header, footer, newsletter: getNewsletterEndpoint() && newsletter ? <section className={privacyStyles.section} aria-labelledby="newsletter-title"><header className={privacyStyles.sectionHeading}><h2 id="newsletter-title">{newsletter.title}</h2>{newsletter.paragraphs?.map(p => <p key={p}>{p}</p>)}</header></section> : null }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', '@id': `https://homegroundchina.com${path}#webpage`, url: `https://homegroundchina.com${path}`, name: copy.metadata.title, description: copy.metadata.description, inLanguage: 'ar', isPartOf: { '@id': 'https://homegroundchina.com/#website' } }).replace(/</g, '\\u003c') }} />
    </>;
  }
  return <HomegroundLegalPage pageId={pageId} edition={{ copy: getArabicLegalLayoutCopy(pageId), header, footer, privacyPath: '/ar/privacy/', relatedPath: id => `/ar/${id}/`, businessHeroLabels: { entity: 'الشركة المسجّلة', code: 'رمز الائتمان الاجتماعي الموحّد' } }} />;
}
