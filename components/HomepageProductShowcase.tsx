"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import type { HomepagePrivateTourItem } from "../lib/homepagePrivateTourCatalog";
import { getHomepageProductShowcaseCopy } from "../lib/homepageProductShowcaseI18n";
import { privateTourHubPaths } from "../lib/privateTourHubI18n";
import { KeepWords } from "./text/KeepWords";
import { CharReveal } from "./motion/CharReveal";
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
}

/* Phones: a square thumbnail beside each row. Tablets: a two-column card
   grid. Wide screens: a small thumbnail in each index row, with the large
   photo beside the list. That photo is a 4:5 crop of a 16:10 image, so it
   draws at about twice the width of its frame. */
const homepageProductImageSizes =
  "(max-width: 39.999rem) 6.5rem, (max-width: 63.999rem) calc((100vw - 3.5rem) / 2), 7rem";
const homepageProductPreviewSizes = "(max-width: 79.999rem) 72vw, 55rem";
const wideIndexQuery = "(min-width: 64rem)";

export function HomepageProductShowcase({
  locale,
  products,
  onItemClick,
}: HomepageProductShowcaseProps) {
  const copy = getHomepageProductShowcaseCopy(locale);
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  // Large photos load only once their route (or the one before it) has been
  // reached, not all six at once.
  const [warm, setWarm] = useState<ReadonlySet<number>>(() => new Set([0, 1]));
  const activate = useCallback((index: number) => {
    setActive(index);
    setWarm((current) =>
      current.has(index) && current.has(index + 1)
        ? current
        : new Set([...current, index, index + 1]),
    );
  }, []);

  // Wide screens: the route crossing the middle of the viewport becomes the
  // active one, so the large photo follows the reader down the list. The
  // watcher follows the window across the wide-screen breakpoint.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const wide = window.matchMedia(wideIndexQuery);
    let observer: IntersectionObserver | undefined;
    const sync = () => {
      observer?.disconnect();
      observer = undefined;
      if (!wide.matches) return;
      const next = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const index = Number(
              (entry.target as HTMLElement).dataset.homepageProductIndex,
            );
            if (Number.isInteger(index)) activate(index);
          }
        },
        { rootMargin: "-45% 0px -50% 0px" },
      );
      list.querySelectorAll(":scope > li").forEach((row) => next.observe(row));
      observer = next;
    };
    sync();
    wide.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      observer?.disconnect();
    };
  }, [activate, products.length]);

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

        <div className={styles.showcaseBody}>
          {/* Wide screens: the active route's photo, beside the index. Each
              row keeps its own thumbnail and alt text, so this is decoration. */}
          <div aria-hidden="true" className={styles.preview}>
            <div className={styles.previewFrame}>
              {products.map((product, index) =>
                warm.has(index) ? (
                  <img
                    alt=""
                    data-active={index === active || undefined}
                    decoding="async"
                    height={product.image.height}
                    key={product.id}
                    loading="lazy"
                    sizes={homepageProductPreviewSizes}
                    src={privateTourCardImageSource(product.id, 640)}
                    srcSet={privateTourCardImageSrcSet(product.id)}
                    style={
                      product.image.objectPosition
                        ? { objectPosition: product.image.objectPosition }
                        : undefined
                    }
                    width={product.image.width}
                  />
                ) : null,
              )}
            </div>
            <div className={styles.previewCount}>
              <span>{String(active + 1).padStart(2, "0")}</span>
              <span className={styles.previewTrack}>
                <span
                  style={{
                    transform: `scaleX(${(active + 1) / products.length})`,
                  }}
                />
              </span>
              <span>{String(products.length).padStart(2, "0")}</span>
            </div>
          </div>

          <ul
            aria-label={copy.productListLabel}
            className={styles.productGrid}
            ref={listRef}
          >
            {products.map((product, index) => (
              <li
                data-active={index === active || undefined}
                data-homepage-offer-kind="tour"
                data-homepage-product-index={index}
                data-homepage-product-slug={product.id}
                key={product.id}
                onFocus={() => activate(index)}
                onPointerEnter={() => activate(index)}
              >
                <Link
                  className={styles.productCard}
                  href={product.href}
                  onClick={() => onItemClick?.(product, index + 1)}
                >
                  <span aria-hidden="true" className={styles.rowIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
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
                    <h3 className={styles.cardTitle}>
                      <KeepWords locale={locale} text={product.title} />
                    </h3>
                    <p className={styles.cardPrice}>
                      <span>{copy.startingPriceLabel}</span>
                      <strong>
                        <CharReveal text={product.startingPrice.formatted} />
                      </strong>
                      <small>
                        {copy.perPersonLabel} ·{" "}
                        {copy.groupBasis(product.startingPrice.travelers)}
                      </small>
                      {product.startingPrice.serviceLabel && (
                        <small>{product.startingPrice.serviceLabel}</small>
                      )}
                      {product.startingPrice.validityNote && (
                        <small className={styles.cardValidity}>
                          {product.startingPrice.validityNote}
                        </small>
                      )}
                    </p>
                    <p className={styles.cardDescription}>
                      {product.appeal}
                    </p>
                    <span className={styles.cardAction}>
                      <span className={styles.actionRoll}>
                        <span>{copy.actionLabel}</span>
                        <span aria-hidden="true">{copy.actionLabel}</span>
                      </span>
                      <ArrowRight aria-hidden="true" size={18} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.showcaseFooter}>
          <Link className={styles.hubLink} href={privateTourHubPaths[locale]}>
            <span>{copy.hubActionLabel}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
