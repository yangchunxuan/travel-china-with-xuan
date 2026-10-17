import { getGermanLegalCopy, type GermanLegalPageId } from '../lib/germanLegalCopy';
import { getGermanLegalLayoutCopy, getGermanPrivacyLayoutCopy } from '../lib/germanLegalLayoutCopy';
import { germanLanguagePaths } from '../lib/germanSite';
import { getNewsletterEndpoint } from '../lib/newsletter';
import { GermanSiteHeader, GermanSiteFooter } from './GermanChrome';
import { HomegroundLegalPage } from './HomegroundLegalPage';
import { HomegroundPrivacyPage } from './HomegroundPrivacyPage';
import privacyStyles from './HomegroundPrivacyPage.module.css';

export function GermanLegalPage({ pageId }: { pageId: GermanLegalPageId | 'business-information' }) {
  const path = `/de/${pageId}/`;
  const header = <GermanSiteHeader currentPath={path} languagePaths={germanLanguagePaths(`/${pageId}/`, path)} />;
  const footer = <GermanSiteFooter currentPath={path} />;
  if (pageId === 'privacy') {
    const copy = getGermanPrivacyLayoutCopy();
    const newsletter = getGermanLegalCopy('privacy').sections.find(s => s.id === 'newsletter');
    return <>
      <HomegroundPrivacyPage edition={{ copy, header, footer, newsletter: getNewsletterEndpoint() && newsletter ? <section className={privacyStyles.section} aria-labelledby="newsletter-title"><header className={privacyStyles.sectionHeading}><h2 id="newsletter-title">{newsletter.title}</h2>{newsletter.paragraphs?.map(p => <p key={p}>{p}</p>)}</header></section> : null }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', '@id': `https://homegroundchina.com${path}#webpage`, url: `https://homegroundchina.com${path}`, name: copy.metadata.title, description: copy.metadata.description, inLanguage: 'de', isPartOf: { '@id': 'https://homegroundchina.com/#website' } }).replace(/</g, '\\u003c') }} />
    </>;
  }
  return <HomegroundLegalPage pageId={pageId} edition={{ copy: getGermanLegalLayoutCopy(pageId), header, footer, privacyPath: '/de/privacy/', relatedPath: id => `/de/${id}/`, businessHeroLabels: { entity: 'Eingetragenes Unternehmen', code: 'Einheitlicher Sozialkreditcode' } }} />;
}
