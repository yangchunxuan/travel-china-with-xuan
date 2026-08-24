"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "../lib/analytics";
import type { HomegroundLocale } from "../lib/homegroundI18n";

export function PrivateTourCatalogLink({
  children,
  className,
  href,
  locale,
  position,
  productSlug,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  locale: HomegroundLocale;
  position: number;
  productSlug: string;
}) {
  return (
    <Link
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
