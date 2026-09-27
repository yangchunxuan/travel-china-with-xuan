import Link from "next/link";
import type { JapaneseCatalogTour } from "../lib/japaneseTourCatalog";
import { getPrivateTourStartingPrice } from "../lib/privateTourStartingPrice";
import styles from "./PrivateToursHubPage.module.css";
import { KeepWords } from "./text/KeepWords";

/** One row of the Japanese tour list (tours hub and destination sections). */
export function JapaneseTourQuickCard({ tour }: { tour: JapaneseCatalogTour }) {
  const starting = getPrivateTourStartingPrice(tour);
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
          <p>{tour.tourFormat === "small-group" ? "出発日指定の少人数グループ" : "プライベートツアー"}</p>
          <h3><KeepWords locale="ja" text={tour.title} /></h3>
          <p className={styles.quickAppeal}>{tour.lede}</p>
        </div>
        <p className={styles.quickFacts}>
          {starting ? <>
            <span className={styles.priceLabel}>公開料金の目安</span>
            <strong>{starting.formatted}</strong>
            <span>{tour.tourFormat === "small-group" ? "2名1室・1名あたり" : `${starting.selection.travelers}名参加時・1名あたり`}</span>
            <span className={styles.priceService}>{starting.serviceLabel}</span>
          </> : <>
            <strong>日程に合わせてお見積もり</strong>
            <span>人数・お部屋・プランを確認してご案内</span>
          </>}
        </p>
        <div className={styles.quickMeta}>
          <dl className={styles.quickDetails}>
            <div><dt>日数</dt><dd>{tour.days}日間・{tour.nights}泊</dd></div>
          </dl>
        </div>
        <span className={styles.quickAction}>
          <span>{tour.days}日間</span>
          <span>行程を見る <span aria-hidden="true">→</span></span>
        </span>
      </Link>
    </li>
  );
}
