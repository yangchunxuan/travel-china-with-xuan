"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "../lib/analytics";
import type { HomegroundLocale } from "../lib/homegroundI18n";

export function PrivateTourCatalogLink({
  ariaLabelledBy,
  children,
  className,
  href,
  locale,
  position,
  productSlug,
}: {
  /** Short accessible name (title + price) instead of the whole card text. */
  ariaLabelledBy?: string;
  children: ReactNode;
  className?: string;
  href: string;
  locale: HomegroundLocale;
  position: number;
  productSlug: string;
}) {
  return (
    <Link
      aria-labelledby={ariaLabelledBy}
      className={className}
      href={href}
      data-tour-card-source="tours_hub"
      data-tour-product-id={productSlug}
      onClick={() => {
        trackEvent("tour_catalog_product_clicked", {
          page_language: locale,
          product_position: position,
          product_slug: productSlug,
          search_surface: "tours-hub",
        });
      }}
    >
      {children}
    </Link>
  );
}
