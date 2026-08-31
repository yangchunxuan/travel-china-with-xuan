"use client";

import { ArrowRight } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import type { HomepagePrivateTourItem } from "../lib/homepagePrivateTourCatalog";
import { getHomepageProductShowcaseCopy } from "../lib/homepageProductShowcaseI18n";
import { privateTourHubPaths } from "../lib/privateTourHubI18n";
import styles from "./HomepageProductShowcase.module.css";

interface HomepageProductShowcaseProps {
  readonly locale: HomegroundLocale;
  readonly products: readonly HomepagePrivateTourItem[];
  readonly onItemClick?: (
    item: HomepagePrivateTourItem,
    position: number,
  ) => void;
}

export function HomepageProductShowcase({
  locale,
  products,
  onItemClick,
}: HomepageProductShowcaseProps) {
  const copy = getHomepageProductShowcaseCopy(locale);

  return (
    <section
      aria-labelledby="homepage-products-title"
      className={styles.section}
      data-homeground-locale={locale}
      data-homepage-product-count={products.length}
      data-homepage-product-showcase="true"
      id="travel-products"
    >
      <div className={styles.inner}>
        <header className={styles.intro}>
          <div className={styles.sectionMeta}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <p className={styles.count}>{copy.countLabel(products.length)}</p>
          </div>
          <div className={styles.introGrid}>
            <h2 id="homepage-products-title" tabIndex={-1}>
              {copy.title}
            </h2>
            <p className={styles.lead}>{copy.intro(products.length)}</p>
          </div>
        </header>

        <ul aria-label={copy.productListLabel} className={styles.productGrid}>
          {products.map((product, index) => (
            <li
              data-homepage-offer-kind="tour"
              data-homepage-product-slug={product.id}
              key={product.id}
            >
              <a
                className={styles.productCard}
                href={product.href}
                onClick={() => onItemClick?.(product, index + 1)}
              >
                <span className={styles.imageFrame}>
                  <img
                    alt={product.image.alt}
                    className={styles.image}
                    decoding="async"
                    height={product.image.height}
                    loading="lazy"
                    src={product.image.src}
                    style={
                      product.image.objectPosition
                        ? { objectPosition: product.image.objectPosition }
                        : undefined
                    }
                    width={product.image.width}
                  />
                </span>
                <div className={styles.cardCopy}>
                  <div className={styles.cardMeta}>
                    <span>{copy.productLabel}</span>
                    <span>
                      {copy.durationLabel(product.days, product.nights)}
                    </span>
                  </div>
                  <h3 className={styles.cardTitle}>{product.title}</h3>
                  <p className={styles.cardDescription}>
                    {product.description}
                  </p>
                  <span className={styles.cardAction}>
                    <span>{copy.actionLabel}</span>
                    <ArrowRight aria-hidden="true" size={18} />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.showcaseFooter}>
          <a className={styles.hubLink} href={privateTourHubPaths[locale]}>
            <span>{copy.hubActionLabel}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
