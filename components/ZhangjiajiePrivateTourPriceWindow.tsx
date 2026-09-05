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
  formattedPrice: string;
  formattedRegularPrice?: string;
  featured: boolean;
}

interface PublicPricing {
  validFrom: string;
  validUntil: string;
  validFromLabel: string;
  validUntilLabel: string;
  timeZoneLabel: string;
  referenceNote: string;
  basisLabel: string;
  guideLanguageNote: string;
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

export function ZhangjiajiePrivateTourPriceWindow({
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
    let timer: ReturnType<typeof setTimeout> | undefined;
    const checkWindow = () => {
      const now = Date.now();
      const startsAt = new Date(`${pricing.validFrom}T00:00:00+08:00`).getTime();
      const endsAt = new Date(pricing.validUntil).getTime();
      setStatus(
        now >= startsAt && now <= endsAt ? "current" : "expired",
      );
      // Recheck at the boundary if the visitor leaves the page open.
      const nextBoundary = now < startsAt ? startsAt : endsAt + 1;
      if (Number.isFinite(nextBoundary) && nextBoundary > now) {
        timer = setTimeout(checkWindow, Math.min(nextBoundary - now, 2_147_483_647));
      }
    };
    checkWindow();
    return () => clearTimeout(timer);
  }, [pricing.validFrom, pricing.validUntil]);

  const validity = (
    <p className={styles.priceValidity}>
      <time dateTime={`${pricing.validFrom}T00:00:00+08:00`}>{pricing.validFromLabel}</time>
      {" – "}
      <time dateTime={pricing.validUntil}>{pricing.validUntilLabel}</time>
      {" · "}{pricing.timeZoneLabel}
    </p>
  );

  if (status === "expired") {
    return (
      <div
        aria-live="polite"
        className={styles.priceStatus}
      >
        <strong>{copy.expiredPrice}</strong>
        {validity}
      </div>
    );
  }

  if (variant === "summary") {
    const startingTier = pricing.tiers
      .map((tier) => ({ ...tier, displayedPrice: tier.fromPrice ?? tier.price }))
      .filter((tier): tier is typeof tier & { displayedPrice: number } =>
        typeof tier.displayedPrice === "number",
      )
      .sort((left, right) => left.displayedPrice - right.displayedPrice)[0];

    return (
      <div aria-live="polite" className={styles.priceSummary}>
        {status === "checking" ? <strong>{copy.checkingPrice}</strong> : null}
        <p className={styles.compactPrice}>
          <span>{copy.fromLabel}</span>
          <strong>{startingTier?.formattedPrice ?? "—"}</strong>
          <small>{copy.perPerson}</small>
        </p>
        {startingTier ? <p>{startingTier.name}</p> : null}
        <p>{pricing.basisLabel}</p>
        {validity}
        {status === "checking" ? <p>{pricing.referenceNote}</p> : null}
        <p>{pricing.guideLanguageNote}</p>
      </div>
    );
  }

  return (
    <div aria-live="polite">
      {status === "checking" ? (
        <div className={styles.priceReference}>
          <strong>{copy.checkingPrice}</strong>
          <p>{pricing.referenceNote}</p>
        </div>
      ) : null}
      {validity}
      <p className={styles.priceBasis}>{pricing.basisLabel}</p>
      <div className={styles.priceGrid}>
        {pricing.tiers.map((tier) => {
          const fromPrice = tier.fromPrice;
          const regularPrice = tier.regularPrice;

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
                <strong>{tier.formattedPrice}</strong>
                <small>{copy.perPerson}</small>
              </p>
              {regularPrice ? (
                <p className={styles.regularPrice}>
                  {copy.regularLabel}: {tier.formattedRegularPrice}
                </p>
              ) : null}
              <p>{tier.description}</p>
              <p className={styles.confirmationLine}>{copy.exactStayNote}</p>
            </article>
          );
        })}
      </div>
      <p className={styles.priceFootnote}>{pricing.publicNote}</p>
      <p className={styles.priceFootnote}>{pricing.guideLanguageNote}</p>
    </div>
  );
}
