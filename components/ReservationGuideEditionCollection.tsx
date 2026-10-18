import Link from "next/link";
import Image from "next/image";
import { reservationGuideEditionSlugs, reservationGuideEditionPath, type ReservationGuideEditionLocale } from "../lib/reservationGuideEditionPaths";
import { getReservationGuideEdition, reservationGuideEditionUi } from "../lib/reservationGuideEditions";
import { getGuideEntry, type GuideId } from "../lib/guideRegistry";
import styles from "./GuidesHubPage.module.css";

export function ReservationGuideEditionCollection({language}:{language:ReservationGuideEditionLocale}) {
  const copy=reservationGuideEditionUi[language];
  return <section className={styles.catalog} aria-labelledby="translated-reservation-guides-title" data-translated-reservation-guides={language}>
    <div className={styles.catalogIntro}><div><p className={styles.eyebrow}>{copy.guides}</p><h2 id="translated-reservation-guides-title">{copy.collection}</h2></div></div>
    <ol className={styles.guideGrid}>{reservationGuideEditionSlugs.map(slug=>{
      const guide=getReservationGuideEdition(language,slug)!;
      const source=getGuideEntry(slug as GuideId,"en");
      return <li key={slug} className={`${styles.guideSlot} ${styles.guideSlotRow}`}><article><Link className={styles.guideLink} href={reservationGuideEditionPath(language,slug)}>
        <figure className={styles.guideImage}><Image src={source.heroImagePath} alt={guide.heroAlt} width={source.imageWidth} height={source.imageHeight} sizes="(max-width: 53rem) 100vw, 30vw"/></figure>
        <div className={styles.guideBody}><h3>{guide.headline}</h3><p className={styles.guideDescription}>{guide.description}</p><span className={styles.readGuide}>{copy.read} <span aria-hidden="true">→</span></span></div>
      </Link></article></li>;
    })}</ol>
  </section>;
}
