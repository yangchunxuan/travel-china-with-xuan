# Homepage section three — scope of help

Redesign of the third homepage section, reviewed and approved 2026-07-29. It
replaces the previous "Hand us the whole trip" block in all three languages.

The branch is `agent/planning-scope-redesign-20260729`. It is **not merged and
not deployed**: `.github/workflows/deploy.yml` runs only on a push to `main` or
a manual `workflow_dispatch`.

## What the section has to say

Five things, in this order. Do not add a sixth.

1. Homeground can plan a whole private China trip.
2. Or only the hardest parts of one.
3. Flights, hotels and independent days already booked stay as they are.
4. A planner weighs transport, which area to stay in, reservations and the
   pace of each day together.
5. Scope, fee and responsibilities are agreed before any paid work.

## Structure

Four blocks, no rules anywhere on the page — separation is space, alignment and
type size only. The single hard edge is the dark panel.

1. **Head** — rust eyebrow, headline with per-language authored line breaks.
2. **The choice** — two options side by side; the second drops down the page so
   the block reads as a diagonal rather than a table. A closing line returns to
   the left margin with the "already booked stays booked" promise.
3. **The worked example** — Hangzhou picture and a charcoal panel, aligned top
   and bottom. Three beats: what the traveller booked, what is actually hard,
   how the day ends up.
4. **The boundary** — rust label over one quiet line about scope and fee.

### Colour

Assigned by role, each colour in exactly one context:

- **Black** organises the argument — headline, the two option names, the
  promise line, the panel.
- **Rust `#913b28`** speaks — the small-caps labels, the same value every other
  homepage section uses for its eyebrow.
- **Inside the dark panel nothing is coloured**, matching
  `.studioSection .eyebrow` on the homepage.

No green anywhere. No colour outside the existing homepage tokens.

## Files

| File | Role |
| --- | --- |
| `components/PlanningScopeSection.tsx` | The section. No interactive elements, no motion. |
| `components/PlanningScopeSection.module.css` | All of its styling. Reasoning is in the file's comments. |
| `lib/homegroundPlanningScopeI18n.ts` | Copy for en / zh / ko, written natively per language. |
| `components/HomegroundHomePage.tsx` | `planningSection` prop, defaulting to `"scope-v2"`. |
| `tools/check-planning-scope-lines.mjs` | Asserts authored line breaks rebuild each sentence exactly. |
| `tools/check-font-coverage.mjs` | Extended to cover the two new source files. |
| `tools/prune-production-export.mjs` | Also strips `(lab)` chunks and lab route names. |
| `app/(lab)/**` | The review harness, disabled as `page.lab.tsx`. |

## Do not change without re-checking

- **The headline text** in any language. The wording was fixed by the owner.
- **Authored line breaks** (`titleLines`, `detailLines`, `keepNoteLines`). Edit
  the plain string and the lines together, then run
  `npm run check:planning-scope-lines`.
- **Korean and Chinese copy** — the fonts are subset to the characters the site
  currently uses. A new character fails `npm run check:font-coverage`; pick a
  different word rather than regenerating a subset.
- **`word-break: keep-all` on Chinese** plus the `|` soft break in the Chinese
  headline. Without them a phone drops a closing `。` onto its own line, which
  Chinese typesetting does not allow.
- **`id="planning-proof"` and `tabIndex={-1}` on the h2.** The header nav and
  the hash-scroll behaviour both depend on them.

## Verified

Every command below passed on the final state.

```sh
npx tsc --noEmit
npm run test:inquiry                  # 238 passed
npm run check:font-coverage
npm run check:planning-scope-lines
npm run build                         # 72 pages, export + prune
npm run check:indexable-export
npm run check:ten-day-guide-export
```

Browser sweep, 3 languages × 15 widths from 320px to 1920px:

- horizontal overflow: 0
- rendered borders inside the section: 0
- picture and panel bottom alignment above 860px: 0px drift
- 218 line breaks checked, 0 lines starting with closing punctuation

Section height against its neighbours after compression:

| | desktop 1280 | phone 390 |
| --- | --- | --- |
| guides section above | 920–985 | 1618–1647 |
| **section three** | **1172–1186** | **1438–1495** |
| studio section below | 635–728 | 977–1166 |

Down 24% on desktop and 15–17% on phones from the first approved build; on a
phone it is now shorter than the guides section above it.

## Rolling back

One word in `components/HomegroundHomePage.tsx`:

```
planningSection = "scope-v2"   // current
planningSection = "current"    // previous section
```

The previous section's markup and its `copy.proof` strings are untouched.

## Open decisions for the owner

1. **The homepage guide cards fight the national positioning.** Two of the
   three featured guides are Zhangjiajie, including the large lead card
   (`homeFeaturedRank` in `lib/guideRegistry.ts`). A reader meets "Zhangjiajie
   specialist" immediately before "we plan trips across China". Changing the
   ranks is a few lines; it was left alone because sections one and two were
   out of scope.
2. **One insider detail would sharpen the example.** "Which station you land
   at" carries the panel today. A specific, non-obvious fact from real trips
   would carry it further, but it has to come from the owner — it must not be
   invented.
