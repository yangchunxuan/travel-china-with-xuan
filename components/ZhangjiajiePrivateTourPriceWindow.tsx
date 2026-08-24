"use client";

import { useEffect, useState } from "react";
import type { ProductPreviewLocale } from "../lib/zhangjiajiePrivateTourPreview";
import styles from "./ZhangjiajiePrivateTourPreviewPage.module.css";

export type PriceWindowStatus = "checking" | "current" | "expired";

interface PublicPriceTier {
  id: string;
  name: string;
  description: string;
  fromPrice?: number;
  price?: number;
  regularPrice?: number;
  featured: boolean;
}

interface PublicPricing {
  validFrom: string;
  validUntil: string;
  publicNote: string;
  tiers: readonly PublicPriceTier[];
}

interface PriceCopy {
  checkingPrice: string;
  expiredPrice: string;
  featured: string;
  fromLabel: string;
  perPerson: string;
  regularLabel: string;
  exactStayNote: string;
  validThrough: string;
}

function formatPrice(value: number, locale: ProductPreviewLocale) {
  const numberLocale = {
    en: "en",
    zh: "zh-CN",
    ko: "ko-KR",
  }[locale];

  return new Intl.NumberFormat(numberLocale, {
    maximumFractionDigits: 0,
  }).format(value);
}

export function ZhangjiajiePrivateTourPriceWindow({
  locale,
  copy,
  pricing,
  variant = "full",
}: {
  locale: ProductPreviewLocale;
  copy: PriceCopy;
  pricing: PublicPricing;
  variant?: "full" | "summary";
}) {
  const [status, setStatus] = useState<PriceWindowStatus>("checking");

  useEffect(() => {
    const now = Date.now();
    setStatus(
      now >= new Date(`${pricing.validFrom}T00:00:00+08:00`).getTime() &&
        now <= new Date(pricing.validUntil).getTime()
        ? "current"
        : "expired",
    );
  }, [pricing.validFrom, pricing.validUntil]);

  if (status === "checking") {
    return (
      <div
        aria-live="polite"
        className={styles.priceStatus}
      >
        <span>{copy.checkingPrice}</span>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div
        aria-live="polite"
        className={styles.priceStatus}
      >
        <strong>{copy.expiredPrice}</strong>
      </div>
    );
  }

  if (variant === "summary") {
    const startingTier = pricing.tiers
      .map((tier) => ({ ...tier, displayedPrice: tier.fromPrice ?? tier.price }))
      .filter((tier): tier is typeof tier & { displayedPrice: number } =>
        typeof tier.displayedPrice === "number",
      )
      .reduce((lowest, tier) =>
        tier.displayedPrice < lowest.displayedPrice ? tier : lowest,
      );

    return (
      <p aria-live="polite" className={styles.compactPrice}>
        <span>{copy.fromLabel}</span>
        <strong>CNY {formatPrice(startingTier.displayedPrice, locale)}</strong>
        <small>{copy.perPerson}</small>
      </p>
    );
  }

  return (
    <div aria-live="polite">
      <p className={styles.priceValidity}>{copy.validThrough}</p>
      <div className={styles.priceGrid}>
        {pricing.tiers.map((tier) => {
          const fromPrice = tier.fromPrice;
          const price = tier.price;
          const regularPrice = tier.regularPrice;
          const displayedPrice = fromPrice ?? price;

          return (
            <article
              className={`${styles.priceCard} ${
                tier.featured ? styles.priceCardFeatured : ""
              }`}
              key={tier.id}
            >
              {tier.featured ? (
                <span className={styles.featuredLabel}>{copy.featured}</span>
              ) : null}
              <h3>{tier.name}</h3>
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
              <p>{tier.description}</p>
              <p className={styles.confirmationLine}>{copy.exactStayNote}</p>
            </article>
          );
        })}
      </div>
      <p className={styles.priceFootnote}>{pricing.publicNote}</p>
    </div>
  );
}
