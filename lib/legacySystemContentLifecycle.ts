/**
 * Audited lifecycle records for legacy system pages.
 *
 * These values describe public-content events, not build or deployment time.
 * `dateModified` changes only when the rendered page, metadata, or structured
 * data changes materially. A review without a public change belongs in
 * `lastReviewed` and must not manufacture a sitemap lastmod value.
 */
export const legacySystemContentIds = [
  "home",
  "studio",
  "author-evan",
  "guides",
  "itinerary-review",
  "zhangjiajie-4-day-private-tour",
  "entry-requirements",
  "privacy",
  "business-information",
  "terms",
  "refund-delivery",
] as const;

export type LegacySystemContentId =
  (typeof legacySystemContentIds)[number];

export interface LegacySystemContentLifecycleRecord {
  readonly datePublished: string;
  readonly dateModified: string;
  readonly lastReviewed: string;
  readonly evidence: {
    readonly commit: string;
    readonly changedAt: string;
    readonly summary: string;
  };
}

/**
 * Exact timestamp of the evidenced PR #88 author-profile change. When a
 * ProfilePage emits dateModified, Google expects a complete DateTime with a
 * timezone; sitemap lifecycle data intentionally keeps the calendar date.
 */
export const EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT =
  "2026-08-22T22:33:16+08:00";

/**
 * Publication dates preserve the repository's established public lifecycle.
 * PR #88 materially updated Homeground China identity, visible copy, metadata,
 * or structured data on the affected system identities. Shared header chrome
 * alone does not advance the three legal documents: their substantive content,
 * metadata and review date remain at the evidenced 2026-07-24 lifecycle event.
 * Review dates remain independent where a change did not re-review a full page.
 */
export const legacySystemContentLifecycle = {
  home: {
    datePublished: "2026-07-24",
    dateModified: "2026-08-22",
    lastReviewed: "2026-07-24",
    evidence: {
      commit: "e7a0d19e320adc3dc3ce88eb9283f9765ea1d22f",
      changedAt: "2026-08-22",
      summary:
        "PR #88 updated the homepage's visible travel-agency identity, metadata and structured data after the discovery redesign in PR #85.",
    },
  },
  studio: {
    datePublished: "2026-07-22",
    dateModified: "2026-08-22",
    lastReviewed: "2026-07-22",
    evidence: {
      commit: "e7a0d19e320adc3dc3ce88eb9283f9765ea1d22f",
      changedAt: "2026-08-22",
      summary:
        "PR #88 materially rewrote the studio identity and team copy as a China travel agency.",
    },
  },
  "author-evan": {
    datePublished: "2026-08-13",
    dateModified: EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT.slice(0, 10),
    lastReviewed: "2026-08-13",
    evidence: {
      commit: "e7a0d19e320adc3dc3ce88eb9283f9765ea1d22f",
      changedAt: EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT.slice(0, 10),
      summary:
        "PR #88 updated the author profile's organization relationship and brand identity.",
    },
  },
  guides: {
    datePublished: "2026-08-09",
    dateModified: "2026-08-22",
    lastReviewed: "2026-08-09",
    evidence: {
      commit: "e7a0d19e320adc3dc3ce88eb9283f9765ea1d22f",
      changedAt: "2026-08-22",
      summary:
        "PR #88 updated the Guides hub's website and travel-agency graph after the substantive hub expansion on 2026-08-21.",
    },
  },
  "itinerary-review": {
    datePublished: "2026-07-22",
    dateModified: "2026-08-22",
    lastReviewed: "2026-07-22",
    evidence: {
      commit: "e7a0d19e320adc3dc3ce88eb9283f9765ea1d22f",
      changedAt: "2026-08-22",
      summary:
        "PR #88 materially changed the service page from studio language to the confirmed travel-agency identity.",
    },
  },
  "zhangjiajie-4-day-private-tour": {
    datePublished: "2026-08-16",
    dateModified: "2026-08-22",
    lastReviewed: "2026-08-16",
    evidence: {
      commit: "e7a0d19e320adc3dc3ce88eb9283f9765ea1d22f",
      changedAt: "2026-08-22",
      summary:
        "PR #88 linked the public tour to the canonical Homeground China TravelAgency and WebSite entities.",
    },
  },
  "entry-requirements": {
    datePublished: "2026-07-24",
    dateModified: "2026-08-22",
    lastReviewed: "2026-07-24",
    evidence: {
      commit: "e7a0d19e320adc3dc3ce88eb9283f9765ea1d22f",
      changedAt: "2026-08-22",
      summary:
        "PR #88 replaced the entry hub's generic website identity with the canonical brand and travel-agency graph.",
    },
  },
  privacy: {
    datePublished: "2026-07-24",
    dateModified: "2026-08-23",
    lastReviewed: "2026-07-31",
    evidence: {
      commit: "607ec5619471346d0f05de8818075c90c1081b6c",
      changedAt: "2026-08-23",
      summary:
        "The privacy notice now records deployed Cloudflare edge processing and disabled browser RUM, and distinguishes bootstrap-request limits from accepted-event retention; the separate full-review date remains 2026-07-31.",
    },
  },
  "business-information": {
    datePublished: "2026-07-24",
    dateModified: "2026-07-24",
    lastReviewed: "2026-07-24",
    evidence: {
      commit: "6c4295d77bce295a4a546d8c4dc6818e9626cf42",
      changedAt: "2026-07-24",
      summary:
        "The registered-business trust release published this legal document; later shared-header branding did not alter its substantive copy or metadata.",
    },
  },
  terms: {
    datePublished: "2026-07-24",
    dateModified: "2026-07-24",
    lastReviewed: "2026-07-24",
    evidence: {
      commit: "6c4295d77bce295a4a546d8c4dc6818e9626cf42",
      changedAt: "2026-07-24",
      summary:
        "The registered-business trust release published these terms; later shared-header branding did not alter their substantive copy or metadata.",
    },
  },
  "refund-delivery": {
    datePublished: "2026-07-24",
    dateModified: "2026-07-24",
    lastReviewed: "2026-07-24",
    evidence: {
      commit: "6c4295d77bce295a4a546d8c4dc6818e9626cf42",
      changedAt: "2026-07-24",
      summary:
        "The registered-business trust release published this policy; later shared-header branding did not alter its substantive copy or metadata.",
    },
  },
} as const satisfies Record<
  LegacySystemContentId,
  LegacySystemContentLifecycleRecord
>;

export function getLegacySystemContentLifecycle(
  id: LegacySystemContentId,
): LegacySystemContentLifecycleRecord {
  return legacySystemContentLifecycle[id];
}
