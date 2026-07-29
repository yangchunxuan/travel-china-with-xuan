# Homepage section three — whole-trip planning

Redesigned on 2026-07-30 after the owner clarified the commercial focus:
Homeground primarily plans complete private China trips. The homepage should
not present one-off problem solving as an equal offer, and it should not spend
space explaining how already-booked flights or hotels are handled.

The implementation branch is
`agent/planning-scope-redesign-20260729`. Production deployment is triggered
only after the change reaches `main`; `.github/workflows/deploy.yml` runs on a
push to `main` or a manual `workflow_dispatch`.

## What this section says

Only four things:

1. Homeground makes a whole China trip work from start to finish.
2. Planning considers the traveller's dates, interests and companions.
3. The practical outcomes are sensible city duration, workable connections
   and a daily pace the group can enjoy.
4. The next step is to contact a trip planner.

Do not reintroduce the removed Hangzhou case study, the "hardest parts" offer,
bookings already made, or the payment boundary here. Other homepage and legal
sections already carry the relevant commercial detail.

## Structure

1. A two-column editorial introduction on wide screens: headline on the left,
   one explanatory sentence on the right. It stacks on narrower screens.
2. One existing West Lake photograph, used only for atmosphere.
3. One separate editorial outcomes row on the canvas, containing three value
   statements and the contact CTA.

The photograph is decorative (`alt=""`) because visible copy does not present
Hangzhou as a case or destination. Desktop crop: `2.5 / 1`, centered at 54%;
mobile crop: `4 / 3`, centered. Do not replace it without the owner's approval.

No green, attached black image band, carousel, collage, image caption, text
overlay, extra card, numbered process, decorative rule or secondary CTA.

## Owner-approved Chinese copy

> 让整趟中国旅行，从头到尾都安排得顺。
>
> 我们根据你的日期、兴趣和同行人，统筹城市顺序、住宿区域、城际交通、预约和每天节奏。
>
> 城市与天数匹配
>
> 城市之间衔接合理
>
> 每天节奏适合同行人
>
> 联系旅行规划师

English and Korean are native localized versions of the same proposition in
`lib/homegroundPlanningScopeI18n.ts`.

## Files

| File | Role |
| --- | --- |
| `components/PlanningScopeSection.tsx` | Semantic markup and contact-link focus handling. |
| `components/PlanningScopeSection.module.css` | Responsive editorial layout. |
| `lib/homegroundPlanningScopeI18n.ts` | Concise en / zh / ko copy. |
| `tools/check-planning-scope-lines.mjs` | Confirms authored headline lines rebuild each sentence. |
| `components/HomegroundHomePage.tsx` | Keeps the old section behind the `planningSection` switch. |

## Do not change without re-checking

- Preserve `id="planning-proof"` and `tabIndex={-1}` on the heading; homepage
  navigation and hash focus depend on them.
- Keep `handleHomegroundHashClick` on the CTA; it moves keyboard focus to the
  contact heading rather than leaving it behind after the scroll.
- Edit `title` and `titleLines` together, then run
  `npm run check:planning-scope-lines`.
- New Chinese or Korean characters must pass `npm run check:font-coverage`.
- Recheck the section at 320px whenever copy, padding or crop values change.

## Verification

Passed on 2026-07-30:

```sh
npx tsc --noEmit
npm run check:planning-scope-lines
npm run check:font-coverage
npm run build
npm run check:indexable-export
npm run check:ten-day-guide-export
```

The full inquiry suite passed all 238 tests.

Browser checks:

- Chinese desktop and 390px mobile visually reviewed.
- English desktop visually reviewed.
- en / zh / ko checked at 320px; this section itself has no horizontal
  overflow.
- CTA changes the URL to `#planner-contact` and moves focus to
  `planning-intent-title`.

## Rollback

One word in `components/HomegroundHomePage.tsx`:

```ts
planningSection = "scope-v2" // redesigned section
planningSection = "current"  // previous section
```
