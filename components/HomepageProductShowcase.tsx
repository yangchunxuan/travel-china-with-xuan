"use client";

import { ArrowRight } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getHomepageProductShowcaseCopy } from "../lib/homepageProductShowcaseI18n";
import type { HomepageGuideRailItem } from "../lib/homepageEditorial";
import styles from "./HomepageProductShowcase.module.css";

interface HomepageProductShowcaseProps {
  readonly locale: HomegroundLocale;
  readonly tour: HomepageGuideRailItem;
  readonly guides: readonly HomepageGuideRailItem[];
  readonly onItemClick?: (item: HomepageGuideRailItem) => void;
}

export function HomepageProductShowcase({
  locale,
  tour,
  guides,
  onItemClick,
}: HomepageProductShowcaseProps) {
  const copy = getHomepageProductShowcaseCopy(locale);

  return (
    <section
      aria-labelledby="homepage-products-title"
      className={styles.section}
      data-homeground-locale={locale}
      data-homepage-product-showcase="true"
      id="travel-products"
    >
      <div className={styles.inner}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h2 id="homepage-products-title">{copy.title}</h2>
          <p className={styles.lead}>{copy.intro}</p>
        </header>

        <article
          className={styles.featured}
          data-homepage-offer-kind="tour"
        >
          <a
            className={styles.featuredLink}
            href={tour.href}
            onClick={() => onItemClick?.(tour)}
          >
            <span className={styles.featuredImageFrame}>
              <img
                alt={tour.image.alt}
                className={styles.featuredImage}
                decoding="async"
                fetchPriority="high"
                height={tour.image.height}
                loading="eager"
                src={tour.image.src}
                width={tour.image.width}
              />
            </span>
            <div className={styles.featuredCopy}>
              <span className={styles.kindLabel}>{copy.productLabel}</span>
              <h3 className={styles.featuredTitle}>{copy.featuredTitle}</h3>
              <p className={styles.featuredSubtitle}>
                {copy.featuredSubtitle}
              </p>
              <p className={styles.featuredMeta}>{copy.featuredMeta}</p>
              <p className={styles.featuredDescription}>
                {tour.description}
              </p>
              <span className={styles.featuredAction}>
                <span>{tour.linkLabel}</span>
                <ArrowRight aria-hidden="true" size={19} />
              </span>
            </div>
          </a>
        </article>

        <div className={styles.guideIntro}>
          <h3>{copy.guideHeading}</h3>
          <p>{copy.guideIntro}</p>
        </div>

        <ol aria-label={copy.guideListLabel} className={styles.guideGrid}>
          {guides.map((guide) => (
            <li data-homepage-offer-kind="guide" key={guide.id}>
              <a
                className={styles.guideCard}
                href={guide.href}
                onClick={() => onItemClick?.(guide)}
              >
                <span className={styles.guideImageFrame}>
                  <img
                    alt={guide.image.alt}
                    className={styles.guideImage}
                    decoding="async"
                    height={guide.image.height}
                    loading="lazy"
                    src={guide.image.src}
                    width={guide.image.width}
                  />
                </span>
                <div className={styles.guideCopy}>
                  <span className={styles.kindLabel}>{copy.guideLabel}</span>
                  <h4 className={styles.guideTitle}>{guide.title}</h4>
                  <span className={styles.guideAction}>
                    <span>{guide.linkLabel}</span>
                    <ArrowRight aria-hidden="true" size={17} />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
