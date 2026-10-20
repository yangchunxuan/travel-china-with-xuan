import Link from "next/link";
import Image from "next/image";
import { reservationGuideEditionSlugs, reservationGuideEditionPath, type ReservationGuideEditionLocale } from "../lib/reservationGuideEditionPaths";
import { getReservationGuideEdition, reservationGuideEditionUi } from "../lib/reservationGuideEditions";
import { getGuideEntry, type GuideId } from "../lib/guideRegistry";
import styles from "./GuidesHubPage.module.css";

/** An edition's own guide outside the six reservation guides (the Japanese edition has two). */
export interface EditionGuideRow {
  href: string;
  headline: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
}

export function ReservationGuideEditionCollection({language, leadingGuides = []}:{language:ReservationGuideEditionLocale; leadingGuides?: readonly EditionGuideRow[]}) {
  const copy=reservationGuideEditionUi[language];
  return <section className={styles.catalog} aria-labelledby="translated-reservation-guides-title" data-translated-reservation-guides={language}>
    <div className={styles.catalogIntro}><div><p className={styles.eyebrow}>{copy.guides}</p><h2 id="translated-reservation-guides-title">{copy.collection}</h2></div></div>
    <ol className={styles.guideGrid}>{leadingGuides.map(guide=><li key={guide.href} className={`${styles.guideSlot} ${styles.guideSlotRow}`}><article><Link className={styles.guideLink} href={guide.href}>
        <figure className={styles.guideImage}><Image src={guide.image.src} alt={guide.image.alt} width={guide.image.width} height={guide.image.height} sizes="(max-width: 53rem) 100vw, 30vw"/></figure>
        <div className={styles.guideBody}><h3>{guide.headline}</h3><p className={styles.guideDescription}>{guide.description}</p><span className={styles.readGuide}>{copy.read} <span aria-hidden="true">→</span></span></div>
      </Link></article></li>)}{reservationGuideEditionSlugs.map(slug=>{
      const guide=getReservationGuideEdition(language,slug)!;
      const source=getGuideEntry(slug as GuideId,"en");
      return <li key={slug} className={`${styles.guideSlot} ${styles.guideSlotRow}`}><article><Link className={styles.guideLink} href={reservationGuideEditionPath(language,slug)}>
        <figure className={styles.guideImage}><Image src={source.heroImagePath} alt={guide.heroAlt} width={source.imageWidth} height={source.imageHeight} sizes="(max-width: 53rem) 100vw, 30vw"/></figure>
        <div className={styles.guideBody}><h3>{guide.headline}</h3><p className={styles.guideDescription}>{guide.description}</p><span className={styles.readGuide}>{copy.read} <span aria-hidden="true">→</span></span></div>
      </Link></article></li>;
    })}</ol>
  </section>;
}
