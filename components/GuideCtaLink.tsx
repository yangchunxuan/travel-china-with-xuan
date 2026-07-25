"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { captureGuideSource, trackEvent } from "../lib/analytics";
import type { HomegroundLocale } from "../lib/homegroundI18n";

/**
 * The planner CTA at the foot of a guide, wrapped so the click is measurable.
 *
 * Guide pages are server components, so they cannot carry an onClick. This is
 * the smallest possible client boundary: the surrounding article stays static.
 *
 * Without this event the funnel can only see arrivals and submissions, which
 * makes three different failures look identical — nobody read the guide, they
 * read it but were not persuaded, or they were persuaded but the form lost
 * them. Each needs a different fix.
 */
export function GuideCtaLink({
  href,
  guideId,
  locale,
  position = "footer",
  className,
  children,
}: {
  href: string;
  /** Which guide the click came from, so CTA rates are comparable per article. */
  guideId: string;
  locale: HomegroundLocale;
  /**
   * Where in the article the link sits. Several guides offer the planner more
   * than once; without this they would be indistinguishable, and "move the CTA
   * higher" would stay an untestable opinion.
   */
  position?: "header" | "inline" | "footer";
  className?: string;
  children: ReactNode;
}) {
  const destination = new URL(href, "https://homegroundchina.com");
  destination.searchParams.set("source_guide", guideId);
  const attributedHref = `${destination.pathname}${destination.search}${destination.hash}`;

  return (
    <Link
      className={className}
      href={attributedHref}
      onClick={() => {
        captureGuideSource(guideId);
        trackEvent("guide_cta_clicked", {
          guide_id: guideId,
          page_language: locale,
          cta_position: position,
        });
      }}
    >
      {children}
    </Link>
  );
}
