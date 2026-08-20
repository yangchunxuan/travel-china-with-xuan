# China planning Hub system — editorial draft package

**Prepared:** 2026-08-20

**Baseline:** `origin/main` at `ef1898745a3c7a6e7cd308aa341c352f24fe9d01` after PR #74 merged

**Branch:** `article/worker-4-china-planning-hub-system-20260820`

**Package state:** central review required; no public implementation is included

This package gives Homeground one broad discovery owner and one broad planning owner without creating another generic China page:

| Search task | Existing owner to strengthen | Locale paths | Role |
|---|---|---|---|
| China Travel Guide | `system-guides` | `/guides/`, `/zh/guides/`, `/ko/guides/` | National orientation and guide-library entrance |
| China Itinerary / First Trip to China | `hub-plan` | `/plan/`, `/zh/plan/`, `/ko/plan/` | First-trip route and itinerary decision entrance |

The drafts are deliberately Hub-shaped. They answer the first decision, show the next useful owner, and move the reader through **inspiration → choice → validation → human help**. They do not concatenate the bodies of route, transport, hotel, holiday, ticket or entry articles.

## Deliverables

- `canonical-boundaries.md` — Search Map and PR #74 ownership decision.
- `planning-content-audit.md` — keep/link, update and consolidate matrix for existing planning material.
- `journey-and-cta-map.md` — the end-to-end user and service path.
- `china-travel-guide/` — complete English, Simplified Chinese and Korean Hub drafts plus query, link, source, image and QA records.
- `china-itinerary-first-trip/` — complete English, Simplified Chinese and Korean Hub drafts plus query, link, source, image and QA records.
- `route-reality/` — internal-only data model, deterministic rules, test scenarios and engineering handoff.

## Publication boundary

This branch changes documentation only. It does **not** change the current Hub components, homepage, guide Registry, Search Map, sitemap, manifest, indexability, commercial logic or any published guide. Central may use these drafts to update the existing locale Hubs after editorial, SEO, design and implementation review. PR #74 merged while this package was being prepared; the worktree is moved to that merge baseline before delivery rather than treating the former draft head as a parallel source.

The Route Reality material is a knowledge and engineering specification. It does not create a calculator, API, interactive UI, public route, index URL or generated itinerary. The public educational owner remains `/guides/is-your-china-itinerary-too-rushed/` in each locale until central explicitly authorizes a separate implementation.

## Review order

1. Approve the canonical boundaries before editing live metadata.
2. Review the two trilingual Hub bodies for equal decisions and locale-natural expression.
3. Confirm the internal-link allowlist against the publication state at integration time.
4. Approve image rights and create the original diagrams.
5. Review the Route Reality v2 semantics and tests separately; do not infer implementation approval from Hub approval.

**Current status:** `CHINA PLANNING HUB SYSTEM READY — CENTRAL REVIEW REQUIRED` is reserved for the final committed and pushed package.
