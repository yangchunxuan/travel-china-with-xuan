import { getSpanishLegalCopy, type SpanishLegalPageId } from '../lib/spanishLegalCopy';
import { getSpanishLegalLayoutCopy, getSpanishPrivacyLayoutCopy } from '../lib/spanishLegalLayoutCopy';
import { spanishLanguagePaths } from '../lib/spanishSite';
import { getNewsletterEndpoint } from '../lib/newsletter';
import { SpanishSiteHeader, SpanishSiteFooter } from './SpanishChrome';
import { HomegroundLegalPage } from './HomegroundLegalPage';
import { HomegroundPrivacyPage } from './HomegroundPrivacyPage';
import privacyStyles from './HomegroundPrivacyPage.module.css';

export function SpanishLegalPage({ pageId }: { pageId: SpanishLegalPageId | 'business-information' }) {
  const path = `/es/${pageId}/`;
  const header = <SpanishSiteHeader currentPath={path} languagePaths={spanishLanguagePaths(`/${pageId}/`, path)} />;
  const footer = <SpanishSiteFooter currentPath={path} />;
  if (pageId === 'privacy') {
    const copy = getSpanishPrivacyLayoutCopy();
    const newsletter = getSpanishLegalCopy('privacy').sections.find(s => s.id === 'newsletter');
    return <>
      <HomegroundPrivacyPage edition={{ copy, header, footer, newsletter: getNewsletterEndpoint() && newsletter ? <section className={privacyStyles.section} aria-labelledby="newsletter-title"><header className={privacyStyles.sectionHeading}><h2 id="newsletter-title">{newsletter.title}</h2>{newsletter.paragraphs?.map(p => <p key={p}>{p}</p>)}</header></section> : null }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', '@id': `https://homegroundchina.com${path}#webpage`, url: `https://homegroundchina.com${path}`, name: copy.metadata.title, description: copy.metadata.description, inLanguage: 'es', isPartOf: { '@id': 'https://homegroundchina.com/#website' } }).replace(/</g, '\\u003c') }} />
    </>;
  }
  return <HomegroundLegalPage pageId={pageId} edition={{ copy: getSpanishLegalLayoutCopy(pageId), header, footer, privacyPath: '/es/privacy/', relatedPath: id => `/es/${id}/`, businessHeroLabels: { entity: 'Empresa registrada', code: 'Código unificado de crédito social' } }} />;
}
