import Link from "next/link";
import { SpanishSiteFooter, SpanishSiteHeader } from "./SpanishChrome";
import { SpanishContactPanel } from "./SpanishContactPanel";
import { SpanishGuideCards } from "./SpanishGuideCards";
import { SpanishTourQuickCard } from "./SpanishTourQuickCard";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { spanishGuides } from "../lib/spanishGuides";
import {
  spanishGeneralContactHrefs,
  spanishGuideLanguageNote,
  spanishLanguagePaths,
  spanishSite,
} from "../lib/spanishSite";
import { getSpanishTourCatalog } from "../lib/spanishTourCatalog";
import localeStyles from "./LocaleRoot.module.css";
import guideStyles from "./GuidesHubPage.module.css";
import styles from "./PrivateToursHubPage.module.css";
import spanishStyles from "./SpanishPages.module.css";

const site = "https://homegroundchina.com";

export const spanishHomeTitle = "Viajes a China en español | Homeground China";
export const spanishHomeDescription =
  "Agencia de viajes en China con rutas privadas en español: Pekín, Xi'an, Shanghái, Zhangjiajie y Guilin, con precio por persona publicado y guías prácticas.";

/**
 * Spanish home page: the published tours, the guides that lead to them and
 * one way to write to us. It reuses the tours-page and guides-page layouts.
 */
export function SpanishHomePage() {
  const tours = getSpanishTourCatalog();
  const contact = spanishGeneralContactHrefs(spanishSite.home);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site}${spanishSite.home}#webpage`,
    url: `${site}${spanishSite.home}`,
    name: spanishHomeTitle,
    description: spanishHomeDescription,
    inLanguage: "es",
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` },
  };

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.toursPage}`} data-homeground-locale="es" lang="es">
      <a className={localeStyles.skipLink} href="#main-content">Ir al contenido</a>
      <SpanishSiteHeader
        contactHref="#contact"
        currentPath={spanishSite.home}
        languagePaths={spanishLanguagePaths("/", spanishSite.home)}
      />
      <main id="main-content" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>Homeground China · en español</p>
              <h1>Viajes privados a China, explicados en español.</h1>
            </div>
            <div className={styles.heroAside}>
              <p>
                Somos una agencia de viajes con licencia en China (<span className={spanishStyles.code}>n.º {homegroundBusiness.travelAgencyLicenceNumber}</span>). Publicamos el itinerario día a día y el precio por persona de cada ruta, y confirmamos el total por escrito antes de que pague.
              </p>
              <a className={styles.heroAction} href="#es-home-tours-title">Ver los viajes <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </header>

        <section aria-labelledby="es-home-tours-title" className={styles.quickCompare}>
          <div className={styles.quickIntro}>
            <div>
              <p className={styles.eyebrow}>Viajes publicados</p>
              <h2 id="es-home-tours-title">Rutas privadas, con el precio a la vista.</h2>
            </div>
            <div className={styles.priceContext}>
              <p>El guía y el vehículo son solo para su grupo, y no hay paradas de compras. {spanishGuideLanguageNote}</p>
            </div>
          </div>
          <ul className={`${styles.quickList} ${spanishStyles.tourList}`}>
            {tours.map((tour) => <SpanishTourQuickCard key={tour.slug} tour={tour} />)}
          </ul>
        </section>

        {/* The guide grid keeps the guides page's own tokens and column. */}
        <div className={guideStyles.guidesPage}>
          <section className={guideStyles.catalog} aria-labelledby="es-home-guides-title">
            <div className={guideStyles.catalogIntro}>
              <div>
                <p className={guideStyles.eyebrow}>Guías en español</p>
                <h2 id="es-home-guides-title">Antes de reservar, lea esto.</h2>
              </div>
              <div className={guideStyles.catalogSummary}>
                <p>El visado con pasaporte español, las montañas de Avatar y Yangshuo, con precios, fuentes y la fecha en que las comprobamos.</p>
                <p className={guideStyles.guideCount}>
                  <Link href={spanishSite.guides}>Todas las guías →</Link>
                </p>
              </div>
            </div>
            <SpanishGuideCards guides={spanishGuides} />
          </section>
        </div>

        <section className={styles.finalSection} id="contact">
          <div className={styles.finalInner}>
            <div>
              <p className={styles.finalEyebrow}>Consultar un viaje</p>
              <h2>Escríbanos en español.</h2>
            </div>
            {/* Wrapped so the tile's `div:last-child > p` rule leaves the panel's own text alone. */}
            <div>
              <SpanishContactPanel
                body="Díganos adónde quiere ir, las fechas aproximadas y cuántos viajan. Respondemos por escrito, con el itinerario y el precio."
                emailHref={contact.email}
                headingId="es-home-contact-title"
                title="Consultar en español"
                whatsappHref={contact.whatsapp}
              />
            </div>
          </div>
        </section>
      </main>
      <SpanishSiteFooter currentPath={spanishSite.home} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
