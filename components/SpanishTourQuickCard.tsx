import Link from "next/link";
import type { SpanishCatalogTour } from "../lib/spanishTourCatalog";
import { spanishGuideLanguageBadge } from "../lib/spanishSite";
import {
  getPrivateTourStartingPrice,
  getPrivateTourTwoTravellerPrice,
} from "../lib/privateTourStartingPrice";
import styles from "./PrivateToursHubPage.module.css";

/** One row of the Spanish tour list (tours page and home page). */
export function SpanishTourQuickCard({ tour }: { tour: SpanishCatalogTour }) {
  const starting = getPrivateTourStartingPrice(tour);
  const twoTravellers = getPrivateTourTwoTravellerPrice(tour);
  return (
    <li className={styles.quickItem}>
      <Link className={styles.quickLink} href={tour.path}>
        <figure className={styles.quickImage}>
          <img
            alt={tour.heroImage.alt}
            decoding="async"
            height={tour.heroImage.height}
            loading="lazy"
            src={tour.heroImage.src}
            style={{ objectPosition: tour.heroImage.objectPosition }}
            width={tour.heroImage.width}
          />
        </figure>
        <div className={styles.quickIdentity}>
          <p>Viaje privado</p>
          <h3>{tour.title}</h3>
          <p className={styles.quickAppeal}>{tour.lede}</p>
        </div>
        <p className={styles.quickFacts}>
          {starting ? <>
            <span className={styles.priceLabel}>Precio publicado, desde</span>
            {twoTravellers ? <>
              <span className={styles.priceTiers}>
                <span><span>2 viajeros</span> <strong>{twoTravellers.formatted}</strong></span>
                <span><span>{starting.selection.travelers} viajeros</span> <strong>{starting.formatted}</strong></span>
              </span>
              <span>por persona</span>
            </> : <>
              <strong>{starting.formatted}</strong>
              <span>{`por persona, con ${starting.selection.travelers} viajeros`}</span>
            </>}
          </> : <>
            <strong>Presupuesto según fechas</strong>
            <span>Confirmamos grupo, habitaciones y servicios</span>
          </>}
          <span className={styles.guideBadge} data-guide-language="">{spanishGuideLanguageBadge}</span>
        </p>
        <div className={styles.quickMeta}>
          <dl className={styles.quickDetails}>
            <div><dt>Duración</dt><dd>{tour.days} días · {tour.nights} noches</dd></div>
          </dl>
        </div>
        <span className={styles.quickAction}>
          <span>{tour.days} días</span>
          <span>Ver el itinerario <span aria-hidden="true">→</span></span>
        </span>
      </Link>
    </li>
  );
}
