# City hub drafts — source packages and central review record

These three packages are the **drafts** submitted on 2026-08-15 on
`codex/city-hub-beijing-draft-20260815` (`a7dc923f`),
`codex/city-hub-shanghai-draft-20260815` (`abe16b9b`) and
`codex/city-hub-xian-draft-20260815` (`0ba778b3`). They are retained here as
the editorial review record only. They are **not** the published copy.

The published trilingual copy lives in `content/destinations/<city>/body.<locale>.ts`
and renders at `/destinations/<city>/`, `/zh/destinations/<city>/` and
`/ko/destinations/<city>/`.

## What central review changed before publication

1. **Stale "owner pending" language removed.** All three drafts were written
   against an older `main` and repeatedly stated that Beijing stay, station,
   Great Wall, Forbidden City, Temple of Heaven, Summer Palace and National
   Museum owners were "pending until their trilingual public pages are verified
   live". Every one of those owners is published on `main`. The Beijing hub was
   under-linked as a result; the published body links eleven real canonical
   owners.
2. **Slug references converted to real links.** The Xi'an draft referenced its
   owners as inline slugs in parentheses (`terracotta-warriors-without-tour`).
   Those are now ordinary `internal-links` blocks with locale-correct paths.
3. **Station facts refreshed against primary sources.** Xi'an East Railway
   Station is stated as in use since 30 June 2026 (Xi'an Municipal People's
   Government). The existing Songjiang South station was renamed Shanghai
   Songjiang in May 2024; the expanded hub, with a new north station building
   and the former station as its south section, opened on 26 December 2024.
   Shanghai East Railway Station is named explicitly as a station that has
   *not* opened, with its stated July 2027 target, so it cannot enter a live
   itinerary by accident.
4. **No frozen live data.** Fares, timetables, service frequencies, opening
   hours and crowd levels were deliberately kept out. Every volatile statement
   defers to the operator, government or museum source recorded in each page's
   default-collapsed Sources block.
5. **Dates corrected.** Draft `lastFactReview: 2026-08-15` was replaced with the
   real publication and review date, 2026-08-16, recorded in
   `lib/destinationHubs.ts`.
6. **Hub scope enforced.** The drafts already avoided attraction listicles; the
   published bodies keep that boundary and hand every execution detail — gates,
   reservations, transfers, property-level lodging — to the narrower owners.

## Image plans

The `image-plan.md` files in these packages are draft proposals. The images
actually published, with their source paths, permission basis, crops and
SHA-256 values, are recorded in `docs/homeground-photo-provenance.md` under the
destination-hub pilot release. This batch uses **0 AI or AI-assisted images**.
