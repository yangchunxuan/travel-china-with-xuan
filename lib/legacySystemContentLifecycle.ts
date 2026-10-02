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
  "attraction-reservations",
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
 * The attraction reservation release is recorded against the commit it was
 * built on until the merge commit is known; replace it at merge time.
 */
/**
 * The visit reference line release is recorded against the commit it was
 * built on until the merge commit is known; replace it at merge time.
 */
const VISIT_REF_RELEASE_COMMIT =
  "dcf57dfb8fcd987e7d4ff7faa6badcf4eb22bc56";

const ATTRACTION_RESERVATION_RELEASE_COMMIT =
  "b2bc7803c880dbc7540ab60af15db27082bce2e0";

/**
 * Publication dates preserve the repository's established public lifecycle.
 * PR #88 materially updated Homeground China identity, visible copy, metadata,
 * or structured data on the affected system identities. Shared header chrome
 * alone does not advance legal documents. The 2026-09-15 operator alignment
 * updates the homepage identity, business information and privacy controller;
 * terms and refund information retain their original substantive lifecycle
 * event. Review dates remain independent where a change did not re-review a
 * full page.
 */
export const legacySystemContentLifecycle = {
  home: {
    datePublished: "2026-07-24",
    dateModified: "2026-09-15",
    lastReviewed: "2026-07-24",
    evidence: {
      commit: "9ff9d3de0d254821d3b8cff33e9049f4da19b38b",
      changedAt: "2026-09-15",
      summary:
        "The owner-alignment change replaced the homepage footer and Organization identity with the licensed Beijing travel agency's registered name, credit code and licence number.",
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
    dateModified: "2026-09-05",
    lastReviewed: "2026-07-22",
    evidence: {
      commit: "edce6726ab00322c2cd4e53446f1d181c4ce4a74",
      changedAt: "2026-09-05",
      summary:
        "The trilingual service introduction now states the route-review deliverables and separates review from building a new route.",
    },
  },
  "zhangjiajie-4-day-private-tour": {
    datePublished: "2026-08-16",
    dateModified: "2026-09-23",
    lastReviewed: "2026-08-16",
    evidence: {
      commit: "166e4ad247e50c4dfe3d9f6185a1411537cb7982",
      changedAt: "2026-09-23",
      summary:
        "Published a six-person price for every stay tier and linked each tier to a validated six-traveller inquiry in all three supported languages.",
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
    dateModified: "2026-10-02",
    lastReviewed: "2026-08-24",
    evidence: {
      commit: VISIT_REF_RELEASE_COMMIT,
      changedAt: "2026-10-02",
      summary:
        "The privacy notice now explains the short reference line added to prepared WhatsApp, email and KakaoTalk messages for visitors in Korea, the United States, Singapore, Malaysia, Australia and Hong Kong, the 30-day first-visit local-storage entry behind it and how refusing analytics deletes it; the separate full-review date remains unchanged.",
    },
  },
  "business-information": {
    datePublished: "2026-07-24",
    dateModified: "2026-09-15",
    lastReviewed: "2026-09-15",
    evidence: {
      commit: "9ff9d3de0d254821d3b8cff33e9049f4da19b38b",
      changedAt: "2026-09-15",
      summary:
        "The operating entity, registration details and three-language licence facts now match the owner-supplied Beijing business and travel-agency certificates.",
    },
  },
  terms: {
    datePublished: "2026-07-24",
    dateModified: "2026-09-29",
    lastReviewed: "2026-09-29",
    evidence: {
      commit: ATTRACTION_RESERVATION_RELEASE_COMMIT,
      changedAt: "2026-09-29",
      summary:
        "Added the paid attraction reservation service's scope, fee, face-value tickets, eight-day booking guarantee, refund and change rules in all three languages.",
    },
  },
  "refund-delivery": {
    datePublished: "2026-07-24",
    dateModified: "2026-09-29",
    lastReviewed: "2026-09-29",
    evidence: {
      commit: ATTRACTION_RESERVATION_RELEASE_COMMIT,
      changedAt: "2026-09-29",
      summary:
        "Added the attraction reservation service's delivery, not-secured refund and issued-ticket cancellation rules in all three languages.",
    },
  },
  "attraction-reservations": {
    datePublished: "2026-09-29",
    dateModified: "2026-09-29",
    lastReviewed: "2026-09-29",
    evidence: {
      commit: ATTRACTION_RESERVATION_RELEASE_COMMIT,
      changedAt: "2026-09-29",
      summary:
        "Published the trilingual attraction reservation service page with its dated per-attraction booking rules for Beijing, Shanghai, Xi'an, Chengdu and Hangzhou.",
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
