import Image from "next/image";
import Link from "next/link";
import { spanishGuidePath, type SpanishGuide } from "../lib/spanishGuides";
import styles from "./GuidesHubPage.module.css";

/** The guide grid shared by the Spanish guides page and the Spanish home page. */
export function SpanishGuideCards({ guides }: { guides: readonly SpanishGuide[] }) {
  return (
    <ol className={styles.guideGrid}>
      {guides.map((guide, index) => (
        <li className={`${styles.guideSlot} ${index === 0 ? styles.guideSlotLead : styles.guideSlotRow}`} key={guide.slug}>
          <article>
            <Link className={styles.guideLink} href={spanishGuidePath(guide.slug)}>
              <figure className={styles.guideImage}>
                <Image
                  alt={guide.heroImage.alt}
                  height={guide.heroImage.height}
                  sizes={index === 0 ? "(max-width: 53rem) 100vw, 55vw" : "(max-width: 53rem) 100vw, 22vw"}
                  src={guide.heroImage.src}
                  width={guide.heroImage.width}
                />
              </figure>
              <div className={styles.guideBody}>
                <p className={styles.guideMeta}>{guide.navTitle}</p>
                <h3>{guide.headline}</h3>
                <p className={styles.guideDescription}>{guide.description}</p>
                <span className={styles.readGuide}>Leer la guía <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          </article>
        </li>
      ))}
    </ol>
  );
}
