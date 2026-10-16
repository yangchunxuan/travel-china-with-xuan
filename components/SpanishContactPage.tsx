import { SpanishSiteHeader, SpanishSiteFooter } from './SpanishChrome';
import { SpanishHomeContact } from './SpanishHomeContact';
import { spanishCoreCopy } from '../lib/spanishCoreCopy';
import { spanishLanguagePaths } from '../lib/spanishSite';
import styles from './HomegroundLegalPage.module.css';
import localeStyles from './LocaleRoot.module.css';
export function SpanishContactPage() {
  const copy=spanishCoreCopy.contact, path='/es/contact/';
  return <div className={`${localeStyles.root} hg-locale-root ${styles.localeRoot}`} data-homeground-locale="es" lang="es">
    <a className={styles.skipLink} href="#main-content">Ir al contenido</a>
    <SpanishSiteHeader currentPath={path} languagePaths={spanishLanguagePaths('/',path)}/>
    <main id="main-content">
      <section className={styles.hero} aria-labelledby="contact-page-title">
        <div><p className={styles.eyebrow}>{copy.eyebrow}</p><h1 id="contact-page-title">Hablemos de tu viaje.</h1><p className={styles.heroIntro}>{copy.intro}</p></div>
        <aside className={styles.callout}><p className={styles.calloutLabel}>Antes de reservar</p><h2>Primero tu idea. Después, un presupuesto claro.</h2><p>Cuéntanos tus fechas, cuántas personas viajan y qué te gustaría hacer. Confirmamos los servicios y el precio final antes del pago. El guía en español se presupuesta aparte.</p></aside>
      </section>
      <div className={styles.article}><SpanishHomeContact/></div>
    </main>
    <SpanishSiteFooter currentPath={path}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'ContactPage','@id':`https://homegroundchina.com${path}#webpage`,url:`https://homegroundchina.com${path}`,name:copy.title,description:copy.description,inLanguage:'es',isPartOf:{'@id':'https://homegroundchina.com/#website'}}).replace(/</g,'\\u003c')}}/>
  </div>;
}
