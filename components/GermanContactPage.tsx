import { GermanSiteHeader, GermanSiteFooter } from './GermanChrome';
import { GermanHomeContact } from './GermanHomeContact';
import { germanCoreCopy } from '../lib/germanCoreCopy';
import { germanLanguagePaths } from '../lib/germanSite';
import styles from './HomegroundLegalPage.module.css';
import localeStyles from './LocaleRoot.module.css';

/** No standalone English contact page exists; use the site's hero and contact board. */
export function GermanContactPage() {
  const copy = germanCoreCopy.contact;
  const path = '/de/contact/';
  return <div className={`${localeStyles.root} hg-locale-root ${styles.localeRoot}`} data-homeground-locale="de" lang="de">
    <a className={styles.skipLink} href="#main-content">Zum Inhalt</a>
    <GermanSiteHeader currentPath={path} languagePaths={germanLanguagePaths('/', path)} />
    <main id="main-content">
      <section className={styles.hero} aria-labelledby="contact-page-title">
        <div><p className={styles.eyebrow}>{copy.eyebrow}</p><h1 id="contact-page-title">Sprechen wir über Ihre Reise.</h1><p className={styles.heroIntro}>{copy.intro}</p></div>
        <aside className={styles.callout}><p className={styles.calloutLabel}>Vor der Buchung</p><h2>Ihre Pläne, dann ein schriftliches Angebot.</h2><p>Nennen Sie Reisedaten, Personenzahl und Wünsche. Leistungen und Endpreis werden vor der Zahlung bestätigt. Deutschsprachige Reiseleitung ist nicht im veröffentlichten Preis enthalten; Verfügbarkeit und Preis müssten separat bestätigt werden.</p></aside>
      </section>
      <div className={styles.article}><GermanHomeContact /></div>
    </main>
    <GermanSiteFooter currentPath={path} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'ContactPage','@id':`https://homegroundchina.com${path}#webpage`,url:`https://homegroundchina.com${path}`,name:copy.title,description:copy.description,inLanguage:'de',isPartOf:{'@id':'https://homegroundchina.com/#website'}}).replace(/</g,'\\u003c')}}/>
  </div>;
}
