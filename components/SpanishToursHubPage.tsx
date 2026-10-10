import Link from "next/link";
import { SpanishSiteFooter, SpanishSiteHeader } from "./SpanishChrome";
import { SpanishContactPanel } from "./SpanishContactPanel";
import { SpanishTourQuickCard } from "./SpanishTourQuickCard";
import {
  spanishGeneralContactHrefs,
  spanishGuideLanguageNote,
  spanishLanguagePaths,
  spanishSite,
} from "../lib/spanishSite";
import { getSpanishTourCatalog } from "../lib/spanishTourCatalog";
import localeStyles from "./LocaleRoot.module.css";
import styles from "./PrivateToursHubPage.module.css";
import spanishStyles from "./SpanishPages.module.css";

const site = "https://homegroundchina.com";

export const spanishToursHubTitle = "Viajes privados a China con precio publicado";
export const spanishToursHubDescription =
  "Rutas privadas por China en español: Pekín, Xi'an, Shanghái, Zhangjiajie y Guilin. Itinerario día a día, qué incluye y precio por persona publicado.";

export function SpanishToursHubPage() {
  const tours = getSpanishTourCatalog();
  const contact = spanishGeneralContactHrefs(spanishSite.tours);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site}${spanishSite.tours}#webpage`,
    url: `${site}${spanishSite.tours}`,
    name: spanishToursHubTitle,
    description: spanishToursHubDescription,
    inLanguage: "es",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tours.length,
      itemListElement: tours.map((tour, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tour.title,
        url: `${site}${tour.path}`,
      })),
    },
  };

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.toursPage}`} data-homeground-locale="es" lang="es">
      <a className={localeStyles.skipLink} href="#private-tours-main">Ir a la lista de viajes</a>
      <SpanishSiteHeader
        contactHref="#contact"
        currentPath={spanishSite.tours}
        languagePaths={spanishLanguagePaths("/tours/", spanishSite.tours)}
      />
      <main id="private-tours-main" tabIndex={-1}>
        <header className={styles.hero}>
          <nav aria-label="Ruta de navegación" className={styles.breadcrumb}>
            <ol>
              <li><Link href={spanishSite.home}>Inicio</Link></li>
              <li aria-current="page">Viajes a China</li>
            </ol>
          </nav>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{tours.length} rutas privadas en español</p>
              <h1>Viajes privados a China, con el precio a la vista.</h1>
            </div>
            <div className={styles.heroAside}>
              <p>Cada página muestra el itinerario día a día, lo que incluye el precio y lo que va aparte. El guía y el vehículo son solo para su grupo, y no hay paradas de compras.</p>
              <a className={styles.heroAction} href="#tour-quick-compare-title">Ver los viajes <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </header>

        <section aria-labelledby="tour-quick-compare-title" className={styles.quickCompare}>
          <div className={styles.quickIntro}>
            <div>
              <p className={styles.eyebrow}>Viajes publicados</p>
              <h2 id="tour-quick-compare-title">Compare las rutas y elija.</h2>
            </div>
            <div className={styles.priceContext}>
              <p>Los precios son por persona, desde, para el número de viajeros indicado; el precio final es el del presupuesto por escrito, antes de pagar. {spanishGuideLanguageNote}</p>
            </div>
          </div>
          <ul className={`${styles.quickList} ${spanishStyles.tourList}`}>
            {tours.map((tour) => <SpanishTourQuickCard key={tour.slug} tour={tour} />)}
          </ul>
        </section>

        <section className={styles.finalSection} id="contact">
          <div className={styles.finalInner}>
            <div>
              <p className={styles.finalEyebrow}>Consultar un viaje</p>
              <h2>¿Ya sabe adónde quiere ir?</h2>
            </div>
            {/* Wrapped so the tile's `div:last-child > p` rule leaves the panel's own text alone. */}
            <div>
              <SpanishContactPanel
                body="Díganos la ruta que le interesa, las fechas aproximadas y cuántos viajan. Si todavía no ha elegido ruta, también puede escribirnos."
                emailHref={contact.email}
                headingId="es-tours-contact-title"
                title="Consultar en español"
                whatsappHref={contact.whatsapp}
              />
            </div>
          </div>
        </section>
      </main>
      <SpanishSiteFooter currentPath={spanishSite.tours} />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </div>
  );
}
