"use client";

import { useEffect, useState } from "react";
import {
  isProductPriceCurrent,
  productPreviewCopy,
  type ProductPreviewLocale,
  zhangjiajiePrivateTourPricing,
} from "../lib/zhangjiajiePrivateTourPreview";
import styles from "./ZhangjiajiePrivateTourPreviewPage.module.css";

type PriceWindowStatus = "checking" | "current" | "expired";

function formatPrice(value: number, locale: ProductPreviewLocale) {
  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en", {
    maximumFractionDigits: 0,
  }).format(value);
}

export function ZhangjiajiePrivateTourPriceWindow({
  locale,
  mode,
}: {
  locale: ProductPreviewLocale;
  mode: "hero" | "tiers";
}) {
  const [status, setStatus] = useState<PriceWindowStatus>("checking");
  const copy = productPreviewCopy[locale];
  const pricing = zhangjiajiePrivateTourPricing;

  useEffect(() => {
    setStatus(
      isProductPriceCurrent(pricing.valid_from, pricing.valid_until)
        ? "current"
        : "expired",
    );
  }, [pricing.valid_from, pricing.valid_until]);

  if (status === "checking") {
    return (
      <div
        aria-live="polite"
        className={mode === "hero" ? styles.heroPrice : styles.priceStatus}
      >
        <span>{copy.checkingPrice}</span>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div
        aria-live="polite"
        className={mode === "hero" ? styles.heroPrice : styles.priceStatus}
      >
        <strong>{copy.expiredPrice}</strong>
      </div>
    );
  }

  const startingTier = pricing.tiers.find((tier) => tier.featured);

  if (mode === "hero") {
    const startingPrice =
      startingTier && "from_price_per_person" in startingTier
        ? startingTier.from_price_per_person
        : undefined;

    return (
      <div aria-live="polite" className={styles.heroPrice}>
        <span>{copy.fromLabel}</span>
        <strong>
          CNY {startingPrice ? formatPrice(startingPrice, locale) : "—"}
        </strong>
        <small>{copy.perPerson}</small>
      </div>
    );
  }

  return (
    <div aria-live="polite">
      <div className={styles.priceGrid}>
        {pricing.tiers.map((tier) => {
          const fromPrice =
            "from_price_per_person" in tier
              ? tier.from_price_per_person
              : undefined;
          const price =
            "price_per_person" in tier ? tier.price_per_person : undefined;
          const regularPrice =
            "regular_price_per_person" in tier
              ? tier.regular_price_per_person
              : undefined;
          const displayedPrice = fromPrice ?? price;

          return (
            <article
              className={`${styles.priceCard} ${
                tier.featured ? styles.priceCardFeatured : ""
              }`}
              key={tier.tier_id}
            >
              {tier.featured ? (
                <span className={styles.featuredLabel}>{copy.featured}</span>
              ) : null}
              <h3>{locale === "zh" ? tier.name_zh : tier.name_en}</h3>
              <p className={styles.priceValue}>
                {fromPrice ? <span>{copy.fromLabel}</span> : null}
                <strong>
                  CNY {displayedPrice ? formatPrice(displayedPrice, locale) : "—"}
                </strong>
                <small>{copy.perPerson}</small>
              </p>
              {regularPrice ? (
                <p className={styles.regularPrice}>
                  {copy.regularLabel}: CNY {formatPrice(regularPrice, locale)}
                </p>
              ) : null}
              <p>
                {
                  copy.tierDescriptions[
                    tier.tier_id as keyof typeof copy.tierDescriptions
                  ]
                }
              </p>
              <p className={styles.confirmationLine}>{copy.exactStayNote}</p>
            </article>
          );
        })}
      </div>
      <p className={styles.priceFootnote}>
        {locale === "zh"
          ? pricing.public_notes["zh-CN"]
          : pricing.public_notes.en}
      </p>
    </div>
  );
}
