import { getFrenchLegalCopy, type FrenchLegalPageId } from "../lib/frenchLegalCopy";
import { frenchLanguagePaths } from "../lib/frenchSite";
import { getNewsletterEndpoint } from "../lib/newsletter";
import { FrenchSiteHeader, FrenchSiteFooter } from "./FrenchChrome";
import styles from "./HomegroundLegalPage.module.css";

const links = [
  ["business-information", "Informations légales"],
  ["terms", "Conditions de service"],
  ["refund-delivery", "Remboursement et livraison"],
  ["privacy", "Confidentialité"],
] as const;

/** Full French notices using the established legal-page layout. */
export function FrenchLegalPage({ pageId }: { pageId: FrenchLegalPageId }) {
  const copy = getFrenchLegalCopy(pageId);
  const sections = copy.sections.filter(section => section.id !== "newsletter" || Boolean(getNewsletterEndpoint()));
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://homegroundchina.com${copy.pagePath}#webpage`,
    url: `https://homegroundchina.com${copy.pagePath}`,
    name: copy.metadata.title,
    description: copy.metadata.description,
    inLanguage: "fr",
    isPartOf: { "@id": "https://homegroundchina.com/#website" },
  };

  return (
    <div className={styles.localeRoot} data-legal-locale="fr" lang="fr">
      <a className={styles.skipLink} href="#legal-content">Aller au contenu</a>
      <FrenchSiteHeader currentPath={copy.pagePath} languagePaths={frenchLanguagePaths(`/${pageId}/`, copy.pagePath)} />
      <main id="legal-content">
        <section className={styles.hero} aria-labelledby="legal-title">
          <div>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 id="legal-title">{copy.hero.title}</h1>
            <p className={styles.heroIntro}>{copy.hero.intro}</p>
            <p className={styles.reviewed}><span>Dernière révision du texte source</span><strong>{copy.hero.reviewedValue}</strong></p>
          </div>
          {copy.callout ? <aside className={styles.callout}>
            <p className={styles.calloutLabel}>{copy.callout.label}</p>
            <h2>{copy.callout.title}</h2>
            <p>{copy.callout.body}</p>
            {copy.callout.bullets ? <ul className={styles.list}>{copy.callout.bullets.map(item => <li key={item}>{item}</li>)}</ul> : null}
          </aside> : null}
        </section>
        <article className={styles.article}>
          <nav className={styles.related} aria-label="Sommaire de la page">
            <p>Sur cette page</p>
            <div>{sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</div>
          </nav>
          {sections.map(section => <section key={section.id} id={section.id} className={styles.section} aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {section.facts ? <dl className={styles.factList}>{section.facts.map(fact => <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>
                {fact.href ? <a href={fact.href}><strong>{fact.value}</strong></a> : <strong>{fact.value}</strong>}
                {fact.detail ? <p>{fact.detail}</p> : null}
              </dd>
            </div>)}</dl> : null}
            {section.cards ? <div className={styles.cardGrid}>{section.cards.map(card => <article className={styles.card} key={card.title}><h3>{card.title}</h3><p>{card.body}</p></article>)}</div> : null}
            {section.bullets ? <ul className={styles.list}>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul> : null}
            {section.numbered ? <ol className={styles.steps}>{section.numbered.map((item, index) => <li key={item}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol> : null}
          </section>)}
          <nav className={styles.related} aria-label="Informations sur les services et l’entreprise">
            <p>Informations sur les services et l’entreprise</p>
            <div>{links.map(([id, label]) => id === pageId ? <span key={id} aria-current="page">{label}</span> : <a key={id} href={`/fr/${id}/`}>{label}</a>)}</div>
          </nav>
        </article>
      </main>
      <FrenchSiteFooter currentPath={copy.pagePath} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
