import { getFrenchLegalCopy, type FrenchLegalPageId } from '../lib/frenchLegalCopy';
import { getFrenchLegalLayoutCopy, getFrenchPrivacyLayoutCopy } from '../lib/frenchLegalLayoutCopy';
import { frenchLanguagePaths } from '../lib/frenchSite';
import { getNewsletterEndpoint } from '../lib/newsletter';
import { FrenchSiteHeader, FrenchSiteFooter } from './FrenchChrome';
import { HomegroundLegalPage } from './HomegroundLegalPage';
import { HomegroundPrivacyPage } from './HomegroundPrivacyPage';
import privacyStyles from './HomegroundPrivacyPage.module.css';

export function FrenchLegalPage({ pageId }: { pageId: FrenchLegalPageId | 'business-information' }) {
  const path = `/fr/${pageId}/`;
  const header = <FrenchSiteHeader currentPath={path} languagePaths={frenchLanguagePaths(`/${pageId}/`, path)} />;
  const footer = <FrenchSiteFooter currentPath={path} />;
  if (pageId === 'privacy') {
    const copy = getFrenchPrivacyLayoutCopy();
    const newsletter = getFrenchLegalCopy('privacy').sections.find(s => s.id === 'newsletter');
    return <>
      <HomegroundPrivacyPage edition={{ copy, header, footer, newsletter: getNewsletterEndpoint() && newsletter ? <section className={privacyStyles.section} aria-labelledby="newsletter-title"><header className={privacyStyles.sectionHeading}><h2 id="newsletter-title">{newsletter.title}</h2>{newsletter.paragraphs?.map(p => <p key={p}>{p}</p>)}</header></section> : null }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', '@id': `https://homegroundchina.com${path}#webpage`, url: `https://homegroundchina.com${path}`, name: copy.metadata.title, description: copy.metadata.description, inLanguage: 'fr', isPartOf: { '@id': 'https://homegroundchina.com/#website' } }).replace(/</g, '\\u003c') }} />
    </>;
  }
  return <HomegroundLegalPage pageId={pageId} edition={{ copy: getFrenchLegalLayoutCopy(pageId), header, footer, privacyPath: '/fr/privacy/', relatedPath: id => `/fr/${id}/`, businessHeroLabels: { entity: 'Société enregistrée', code: 'Code unifié de crédit social' } }} />;
}
