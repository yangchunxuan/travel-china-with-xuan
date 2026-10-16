import { FrenchSiteHeader, FrenchSiteFooter } from './FrenchChrome';
import { FrenchHomeContact } from './FrenchHomeContact';
import { frenchCoreCopy } from '../lib/frenchCoreCopy';
import { frenchLanguagePaths } from '../lib/frenchSite';
import styles from './HomegroundLegalPage.module.css';
import localeStyles from './LocaleRoot.module.css';

/** No standalone English contact page exists; use the site's hero and contact board. */
export function FrenchContactPage() {
  const copy = frenchCoreCopy.contact;
  const path = '/fr/contact/';
  return <div className={`${localeStyles.root} hg-locale-root ${styles.localeRoot}`} data-homeground-locale="fr" lang="fr">
    <a className={styles.skipLink} href="#main-content">Aller au contenu</a>
    <FrenchSiteHeader currentPath={path} languagePaths={frenchLanguagePaths('/', path)} />
    <main id="main-content">
      <section className={styles.hero} aria-labelledby="contact-page-title">
        <div><p className={styles.eyebrow}>{copy.eyebrow}</p><h1 id="contact-page-title">Parlons de votre voyage.</h1><p className={styles.heroIntro}>{copy.intro}</p></div>
        <aside className={styles.callout}><p className={styles.calloutLabel}>Avant de réserver</p><h2>Un projet, puis un devis écrit.</h2><p>Indiquez vos dates, le nombre de voyageurs et vos envies. Les prestations et le prix final sont confirmés avant paiement. Un guide francophone fait l’objet d’un supplément sur devis.</p></aside>
      </section>
      <div className={styles.article}><FrenchHomeContact /></div>
    </main>
    <FrenchSiteFooter currentPath={path} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'ContactPage','@id':`https://homegroundchina.com${path}#webpage`,url:`https://homegroundchina.com${path}`,name:copy.title,description:copy.description,inLanguage:'fr',isPartOf:{'@id':'https://homegroundchina.com/#website'}}).replace(/</g,'\\u003c')}}/>
  </div>;
}
