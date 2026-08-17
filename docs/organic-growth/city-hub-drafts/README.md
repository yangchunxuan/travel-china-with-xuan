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

## Batch two (August 17, 2026): Chengdu and Guangzhou published, Chongqing held

The Chengdu, Chongqing and Guangzhou draft packages were submitted on
2026-08-15 on `codex/city-hub-chengdu-draft-20260815` (`33d5879`),
`codex/city-hub-chongqing-draft-20260815` (`dd62d0e`) and
`codex/city-hub-guangzhou-draft-20260815` (`7aba360`).

**Chengdu and Guangzhou are published.** Their reviewed copy lives in
`content/destinations/{chengdu,guangzhou}/body.<locale>.ts`.

**Chongqing is deliberately not published.** It has four qualifying support
owners (`chongqing-upper-lower-city-orientation`,
`chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba`,
`china-tiankeng-sinkholes-explained`, `sichuan-opera-face-changing-with-context`)
across three sections. Phase 1 Gate B requires at least five owners across at
least three sections, and the national guides that merely mention Chongqing
(`china-last-night-before-international-flight`,
`china-private-transfer-or-public-transport`,
`international-chain-or-local-hotel-china`) carry `destinations: ["china"]`, so
the spec's own rule excludes them from counting as destination support.

The owner's decision on 2026-08-17 was to unblock it by publishing a fifth
Chongqing-primary owner rather than by weakening the gate or implementing
Gate A:

- Topic Universe id `hg-topic-0860`, canonical slug
  `chongqing-railway-station-selector`, a trilingual editorial transport guide
  (not a public tool), assigned to Employee 1 (transport).
- Its canonical boundary is choosing the right railway station from an already
  booked route, the stay area, Chongqing's vertical geography and the last-mile
  transfer — not airport choice, not fixed timetables, fares or permanent train
  lists, and not a repeat of the Chengdu–Chongqing intercity article or the
  upper/lower city article. It must include a wrong-station recovery plan.
- The stations still handling passenger services must be re-verified before
  writing, and the title adjusted to the official result rather than preserving
  four station names that may be out of date.

Only once that article passes central review and enters the release baseline
should `chongqing` be added to the hub registry with five owners across four
sections. If it fails a factual, image or build gate, Chongqing stays held; the
gate must not be worked around.

### What central review changed in the two published packages

1. **Guangzhou's airport section was re-verified and tightened.** Baiyun T1 has
   been closed to passengers since 7 May 2026, its eleven domestic airlines
   moved to T3, and the T1-linked metro and intercity stations stopped serving
   passengers. A renovation design was selected in July 2026 with no announced
   reopening. T3 has no direct metro; the airport's own advice is Metro Line 3
   or Line 9 to Gaozeng plus the shuttle, and the published copy says Line 3
   **or Line 9** rather than Line 3 alone.
2. **The Guangzhou station table was corrected, not just copied.** The draft
   offered Guangzhou Baiyun as a Changsha or Zhangjiajie option. From
   26 January 2026 Guangzhou Station stopped originating and terminating
   conventional trains and took over the Beijing–Guangzhou high-speed services
   that previously started at Guangzhou Baiyun, which now concentrates on
   conventional trains and other high-speed directions. The published table
   states the swap and names it as a thing older guidance gets wrong.
3. **Chengdu's closed central station is stated as unusable.** The draft called
   it a "rebuilt central rail project with changing operational status". It is
   closed for reconstruction, reported above 70% complete in mid-2026 with a
   2027 target, and the published table says so plainly.
4. **Chengdu's two airports are framed by a live example.** Services move
   between Tianfu and Shuangliu, so the page states the rule and requires the
   airport code and terminal to be read from the current itinerary.
5. **Every page carries an explicit pre-travel recheck list**, so the volatile
   facts are named rather than buried.
6. **Dates are the real release date, 2026-08-17**, not the 2026-08-15 draft
   date.
