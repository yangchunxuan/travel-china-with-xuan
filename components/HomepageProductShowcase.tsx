"use client";

import type { MouseEventHandler } from "react";
import { ArrowRight } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import type { HomepagePrivateTourItem } from "../lib/homepagePrivateTourCatalog";
import { getHomepageProductShowcaseCopy } from "../lib/homepageProductShowcaseI18n";
import { privateTourHubPaths } from "../lib/privateTourHubI18n";
import {
  privateTourCardImageSource,
  privateTourCardImageSrcSet,
} from "./privateTourCardImages";
import styles from "./HomepageProductShowcase.module.css";

interface HomepageProductShowcaseProps {
  readonly locale: HomegroundLocale;
  readonly products: readonly HomepagePrivateTourItem[];
  readonly onItemClick?: (
    item: HomepagePrivateTourItem,
    position: number,
  ) => void;
  readonly plannerHref: string;
  readonly onPlannerClick?: MouseEventHandler<HTMLAnchorElement>;
}

const homepageProductImageSizes =
  "(max-width: 39.999rem) 6.5rem, (max-width: 63.999rem) calc((100vw - 3.5rem) / 2), (max-width: 79.999rem) calc((100vw - 6rem) / 3), 24.667rem";

export function HomepageProductShowcase({
  locale,
  products,
  onItemClick,
  plannerHref,
  onPlannerClick,
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
                    sizes={homepageProductImageSizes}
                    src={privateTourCardImageSource(product.id, 640)}
                    srcSet={privateTourCardImageSrcSet(product.id)}
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
                  <p className={styles.cardPrice}>
                    <span>{copy.startingPriceLabel}</span>
                    <strong>{product.startingPrice.formatted}</strong>
                    <small>
                      {copy.perPersonLabel} ·{" "}
                      {copy.groupBasis(product.startingPrice.travelers)}
                      {product.startingPrice.serviceLabel && <> · {product.startingPrice.serviceLabel}</>}
                    </small>
                  </p>
                  <p className={styles.cardDescription}>
                    {product.appeal}
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

        <ul aria-label={copy.trustListLabel} className={styles.trustList}>
          {copy.trustItems.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </li>
          ))}
        </ul>

        <aside
          aria-labelledby="homepage-products-enquiry-title"
          className={styles.enquiryStrip}
        >
          <div>
            <p>{copy.enquiryEyebrow}</p>
            <h3 id="homepage-products-enquiry-title">{copy.enquiryTitle}</h3>
            <span>{copy.enquiryBody}</span>
          </div>
          <a href={plannerHref} onClick={onPlannerClick}>
            {copy.enquiryAction}
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </aside>
      </div>
    </section>
  );
}
