import Link from "next/link";
import { SpanishSiteFooter, SpanishSiteHeader } from "./SpanishChrome";
import { SpanishContactPanel } from "./SpanishContactPanel";
import { SpanishGuideCards } from "./SpanishGuideCards";
import { spanishGuidePath, spanishGuides } from "../lib/spanishGuides";
import {
  spanishGeneralContactHrefs,
  spanishLanguagePaths,
  spanishSite,
} from "../lib/spanishSite";
import localeStyles from "./LocaleRoot.module.css";
import styles from "./GuidesHubPage.module.css";
import hubStyles from "./JapaneseGuidesHubPage.module.css";

const site = "https://homegroundchina.com";

export const spanishGuidesHubTitle = "Guías para viajar a China en español";
export const spanishGuidesHubDescription =
  "Guías para un primer viaje a China: visado con pasaporte español, las montañas de Avatar en Zhangjiajie y Yangshuo, con precios y fuentes comprobadas.";

export function SpanishGuidesHubPage() {
  const contact = spanishGeneralContactHrefs(spanishSite.guides);
  const url = `${site}${spanishSite.guides}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: spanishGuidesHubTitle,
    description: spanishGuidesHubDescription,
    inLanguage: "es",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: spanishGuides.length,
      itemListElement: spanishGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.headline,
        url: `${site}${spanishGuidePath(guide.slug)}`,
      })),
    },
  };

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.guidesPage}`} data-homeground-locale="es" lang="es">
      <a className={localeStyles.skipLink} href="#guides-main">Ir al contenido</a>
      <SpanishSiteHeader
        contactHref="#contact"
        currentPath={spanishSite.guides}
        languagePaths={spanishLanguagePaths("/guides/", spanishSite.guides)}
      />
      <main id="guides-main" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.heroTopline}>
            <p className={styles.eyebrow}>Homeground China · Antes de viajar</p>
          </div>
          <div className={styles.heroGrid}>
            <h1>Guías para viajar a China</h1>
            <p>Qué ver, cuántos días hacen falta, cuánto cuesta y qué papeles se necesitan. Cada guía indica sus fuentes y la fecha en que las comprobamos.</p>
          </div>
        </header>

        <section className={styles.catalog} id="guide-list" aria-labelledby="guides-catalog-title">
          <div className={styles.catalogIntro}>
            <div>
              <p className={styles.eyebrow}>Guías en español</p>
              <h2 id="guides-catalog-title">Lo que conviene saber antes de reservar.</h2>
            </div>
            <div className={styles.catalogSummary}>
              <p>Empezamos por lo que más se pregunta: el visado, Zhangjiajie y Yangshuo. Iremos añadiendo más guías.</p>
              <p className={styles.guideCount}>Publicadas: {spanishGuides.length}</p>
            </div>
          </div>
          <SpanishGuideCards guides={spanishGuides} />
          <p className={hubStyles.otherLanguages}>
            Hay muchas más guías prácticas en inglés: <Link href="/guides/" hrefLang="en" lang="en">English guides</Link>.
          </p>
        </section>

        <section className={styles.cta} id="contact" aria-labelledby="guide-contact-title">
          <div className={styles.ctaInner}>
            <p className={styles.ctaEyebrow}>Después de leer</p>
            <div className={styles.ctaGrid}>
              <div>
                <h2 id="guide-contact-title">También organizamos el viaje.</h2>
                <p>Si ya tiene fechas y una idea de la ruta, díganos cuántos viajan.</p>
                <Link className={styles.ctaAction} href={spanishSite.tours}>Ver los viajes en español <span aria-hidden="true">→</span></Link>
              </div>
              <SpanishContactPanel
                body="Puede escribirnos aunque todavía no haya decidido las fechas ni la ruta."
                emailHref={contact.email}
                headingId="es-guides-contact-panel-title"
                title="Consultar en español"
                whatsappHref={contact.whatsapp}
              />
            </div>
          </div>
        </section>
      </main>
      <SpanishSiteFooter currentPath={spanishSite.guides} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
