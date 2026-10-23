import Image from "next/image";
import Link from "next/link";
import { spanishGuidePath, type SpanishGuide } from "../lib/spanishGuides";
import styles from "./GuidesHubPage.module.css";

// The same slots as the English hub (GuidesHubPage.tsx, guideImageSizes): on a
// phone a row is a 5.5-6rem thumbnail, not the full screen width, so a phone
// no longer downloads the 1280px file for a 90px picture.
const leadImageSizes = "(max-width: 53.75rem) calc(100vw - 2rem), (max-width: 80rem) calc((100vw - 3rem) * 0.58), 44rem";
const rowImageSizes = "(max-width: 26.25rem) 5.5rem, (max-width: 42.5rem) 6rem, 10rem";

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
                  sizes={index === 0 ? leadImageSizes : rowImageSizes}
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
