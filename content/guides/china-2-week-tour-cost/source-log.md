# Source log: china-2-week-tour-cost

Reviewed 2026-09-25.

- Price amounts displayed in the proposed product data and fixed departure dates are read from `lib/privateTourLongHaulProducts.ts`. Regenerate the guide bodies when a long-haul price or date changes. Other figures, service rules, inclusions and route comparisons are written in the generator and must be reviewed against the product pages and supplier facts separately.
- The product URLs are part of this proposed release; they remain unavailable on the live site until this branch is approved and deployed.
- Travel times and site rules were checked against the product drafts on 2026-09-25 (see the long-haul handoff). Recheck date-sensitive details before release.
