# Mobile navigation menu: minimal type, unfolds in place

Approved by the owner on 9 October 2026. This document is the implementation contract. Where it and the prototype disagree, this document wins.

- Approved prototype (open it on a phone and in a desktop browser):
  - `docs/superpowers/specs/2026-10-09-mobile-menu-prototype.html` (repo copy, self-contained)
  - https://claude.ai/artifact/S3yNxA7o172PjppVonSwAq (owner's private link, version 5)
- Base: `origin/main` at `2b132613` (live).
- Only the "List" expanded layout is approved. The "two columns" toggle and the "current page" toggle in the prototype are demo controls; do not build them.

## 1. Scope

In scope: the panel opened by the menu button below 1180px (`<nav id="homeground-mobile-navigation">`) and the header controls' behaviour while it is open (Plan pill, menu button).

Files that may change:

| File | Change |
|---|---|
| `components/HomegroundHeader.tsx` | Mobile panel markup, expanded-section state, menu-button icon, focus-trap filter |
| `components/HomegroundHeader.module.css` | All mobile panel styles below 1180px; header open-state rules |
| `lib/homegroundI18n.ts` | One new copy key, `navigation.menuTagline`, in the type and in en / zh / ko |
| `supabase/tests/guide-navigation-static.test.mjs`, `supabase/tests/frontend-accessibility.test.mjs` | Replace assertions that pin the old mobile markup (section 10) |
| New test file `supabase/tests/mobile-menu-static.test.mjs` | Assertions for this design (section 10) |

Out of scope, must stay byte-for-byte or pixel-identical: the desktop navigation (≥1180px), `HeaderNavMenu`, the desktop language switch, the header layout and brand fold ("Hi"), every link target and every `onClick` behaviour, `lib/homegroundNavigationModel.ts`, analytics event names, the footer, all page content.

## 2. Information architecture

Inside the panel, top to bottom:

1. **Primary tier**: `destinations`, `tours`, `services`, in model order. Each is a toggle button, not a link.
2. **Secondary tier**: `guides` (Travel Advice), `studio` (About Us), then FAQ.
   - `guides` is a link to `item.href` (it has no menu).
   - `studio` is a toggle like the primary tier.
   - FAQ is a link to `faqHref` with today's FAQ `onClick` (close, track, `handleHomegroundHashClick` on the home page).
3. **Tagline**: `copy.navigation.menuTagline`.
4. **Footer (fixed at the bottom of the panel)**: the planner CTA, then the language row.

Every toggle's panel lists **all** of its menu's entries in model order. Do not filter out the entry whose `href` equals the item's `href` (today's `menu.entries.filter((entry) => entry.href !== item.href)`), because the item itself no longer navigates. This keeps each section's own page reachable: Cities `/explore/`, All Private Tours `/tours/`, Full Trip Planning & Ground Support `/services/full-trip-support/`, Our Mission `/company/` (and their zh/ko paths). Chinese About Us includes Careers.

Each entry shows its label and, beneath it, `entry.description` from the model.

## 3. Markup contract

Use these class names. `mobileSubmenu`, `mobileUtility`, `mobileCta` and `mobileLanguageNav` are existing names and must stay (`tools/check-ja-pilot-export.mjs` finds the language row by `HomegroundHeader_mobileLanguageNav` and requires a `>日本語</a>` anchor in it).

```tsx
<nav id="homeground-mobile-navigation" className={styles.mobileNav} aria-label={copy.navigation.mobileLabel} hidden={!open} data-entered={entered ? "true" : undefined}>
  <div className={styles.mobileMenuScroll} data-has-open={expandedSection ? "true" : undefined}>
    <ul className={styles.mobileSections} data-tier="primary">
      <li className={styles.mobileSection} data-section="tours" data-open="true|undefined" data-current="true|undefined" style={{ "--menu-index": 1 }}>
        <button type="button" id="mobile-section-toggle-tours" className={styles.mobileSectionToggle} aria-expanded aria-controls="mobile-section-tours">
          <span className={styles.mobileSectionLabel}>{item.label}</span>
        </button>
        <div id="mobile-section-tours" className={styles.mobileSectionPanel} role="region" aria-labelledby="mobile-section-toggle-tours" inert={!expanded}>
          <div>
            <ul aria-label={item.label} className={styles.mobileSubmenu} data-menu="tours">
              <li style={{ "--entry-index": 0 }}>
                <MenuLink href={entry.href} aria-current={/* today's entry logic, unchanged */} onClick={/* today's entry onClick, unchanged */}>
                  <span className={styles.mobileEntryLabel}>{entry.label}</span>
                  <span className={styles.mobileEntryDescription}>{entry.description}</span>
                </MenuLink>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <ul className={styles.mobileSections} data-tier="secondary"> {/* guides link, studio toggle, FAQ link: same li/label structure */} </ul>
    <p className={styles.mobileTagline}>{copy.navigation.menuTagline}</p>
  </div>
  <div className={styles.mobileUtility}>
    <Link className={styles.mobileCta} href={plannerHref} onClick={/* today's mobile CTA onClick, unchanged */}>
      <span>{plannerCta}</span><span className={styles.mobileCtaArrow} aria-hidden="true" />
    </Link>
    <div className={styles.mobileLanguageNav} role="group" aria-label={copy.navigation.languageLabel} hidden={!showLanguageNav}>
      {/* today's renderLanguageChoice / renderJapaneseLanguageChoice, mobile labels per section 6 */}
    </div>
  </div>
</nav>
```

- Links in the secondary tier (Travel Advice, FAQ) use the same `li > (Link with span.mobileSectionLabel)` shape so they share type and underline styles.
- `inert` is a React 19 boolean prop (React 19.2.7 is installed). Do not use `tabIndex` juggling instead.
- Do not put `aria-current` on toggle buttons. `data-current` is visual only; the matching entry link keeps today's `aria-current`.
- The old `mobilePrimaryLinks`, `mobileNavCopy`, `mobileUtilityRow` and `mobileUtilityLink` markup and their CSS are removed.

## 4. Visual specification (below 1180px only)

Colours (literal values are used today in this stylesheet; keep them literal or as local custom properties on `.mobileNav`):

| Role | Value |
|---|---|
| Ink | `var(--hg-color-ink, #141413)` |
| Muted text, descriptions, faded secondary labels | `#6b6b66` (5.4:1 on white) |
| Faded primary labels while another section is open | `#938f87` (3.2:1, large text) |
| Hairlines | `#e7e5df` |
| Underline gradient | `linear-gradient(90deg, #d8d8d1, var(--hg-color-rust, #a74731) 70%, #e0a58f)` |
| Panel background | `#fff` |

Type uses `var(--hg-font-editorial, Georgia, "Times New Roman", serif)` for all section labels, entry labels and the CTA, in every locale. Remove today's zh/ko override that switches the mobile primary links to sans.

| Element | en | zh | ko |
|---|---|---|---|
| Primary label | `clamp(2.25rem, 11.2vw, 2.875rem)`, line-height 1.08, letter-spacing −0.03em | `clamp(2rem, 9.6vw, 2.5rem)`, line-height 1.3, letter-spacing 0.03em | `clamp(1.9375rem, 9.2vw, 2.4375rem)`, line-height 1.3, letter-spacing −0.01em |
| Secondary label | 1.375rem, line-height 1.25, letter-spacing −0.01em | same, letter-spacing 0.04em | same, letter-spacing −0.01em |
| Entry label (primary tier) | 1.25rem, line-height 1.22 | same | same |
| Entry label (secondary tier) | 1.0625rem | same | same |
| Entry description | `var(--sans)`, 0.78125rem, line-height 1.45, `#6b6b66`, 0.1875rem above | same | same |
| Tagline | `var(--sans)`, 0.84375rem, line-height 1.6, `#6b6b66`, max-inline-size 16rem | same | same |
| CTA | editorial, 1.125rem | same | same |

All section labels are weight 400.

Spacing and layout:

- `.mobileNav`: keep today's fixed position, `inset: var(--homeground-header-height) 0 0`, white background, `grid-template-rows: minmax(0, 1fr) auto` and `padding-inline` (`clamp(1.25rem, 6vw, 4rem)`; `1.25rem` below 640px).
- `.mobileMenuScroll`: `overflow-y: auto`, `overscroll-behavior: contain`, `padding-block: 1.375rem 1.125rem`, content `max-inline-size: 40rem`.
- Primary toggles: full width, `min-block-size: 2.75rem`, `padding-block: 0.25rem`, text-align start. Secondary tier: `margin-block-start: 1.375rem`; rows `padding-block: 0.3125rem`, `min-block-size: 2.75rem`.
- Section panel: `display: grid; grid-template-rows: 0fr` (collapsed) / `1fr` (open); inner `div` `overflow: hidden`. Entry list: `display: grid; gap: 0.8125rem; padding-block: 0.75rem 1.375rem`. Every entry link at least 2.75rem tall.
- Tagline: `margin-block-start: 1.875rem`. Hidden when `max-height: 640px`.
- Underline: on `.mobileSectionLabel` as `background-image` (gradient above), `no-repeat`, `background-position: 0 96%`, `background-size: 0% 2px`; `100% 2px` when the section is open or `data-current="true"`; `box-decoration-break: clone`.
- Open state: when any section is open (`data-has-open`), other primary labels turn `#938f87` and other secondary labels `#6b6b66`. The open section stays ink.
- Entry with `aria-current`: label colour ink with the gradient underline at `100% 1.5px`.
- `.mobileUtility`: no shadow; `border-block-start: 1px solid #e7e5df`; `display: grid; gap: 0.75rem`; `padding-block: 0.875rem max(0.25rem, env(safe-area-inset-bottom))`.
- `.mobileCta`: no pill, no background; `display: flex; justify-content: space-between; align-items: center; min-block-size: 2.75rem`; ink text.
  - `.mobileCtaArrow`: a 2.625rem × 1px line in `currentColor` with a 7px chevron (`::after`, two 1px borders rotated 45°). It widens to 3.375rem on hover and focus-visible.

## 5. Header while the menu is open (below 1180px)

- Plan pill (`.headerCta`): instead of `display: none`, fade out with `opacity: 0; visibility: hidden; pointer-events: none`, 200ms.
- Menu button: replace the lucide `Menu`/`X` swap with three `<span aria-hidden="true">` bars, 18px × 1.6px, 5px apart, centred.
  - Open state: top bar `translateY(5px) rotate(45deg)`, middle bar `opacity: 0`, bottom bar `translateY(-5px) rotate(-45deg)`, 350ms.
  - Keep the button's size, border, `aria-label` switching, `aria-expanded`, `aria-controls` and key handling.
- Header bottom border is transparent while open, so header and panel read as one surface.

## 6. Language row

- `.mobileLanguageNav`: keep the existing equal-cell grid of 3 columns, and of 4 columns when a fourth (日本語) link exists (keep the `:has(> a:nth-child(4))` rule).
  - Add `border-block-start: 1px solid #e7e5df; padding-block-start: 0.25rem; margin-inline: -0.25rem`.
  - No pills, no borders around cells.
- Cell anchor: `min-block-size: 3.125rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.375rem; color: #6b6b66`. Hover and focus: ink.
  - `::after` draws a 1rem × 1.5px marker, radius 1px, transparent.
  - `[aria-current]`: ink colour; `::after` uses the underline gradient.
- Labels are endonyms, on mobile only: en → `target.languageName` ("English"); zh and ko → `target.languageShort` ("中文", "한국어"); Japanese → "日本語" (unchanged). The desktop switch keeps `languageShort` ("EN").
- Per-script faces via `:lang()` on the anchors (they already carry `lang`):

| Lang | Font | Size | Letter-spacing | Extra |
|---|---|---|---|---|
| en | 500, `-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif` | 0.84375rem | 0.01em | — |
| zh | 500, `"PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif` | 0.8125rem | 0.04em | — |
| ko | 600, `"Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif` | 0.84375rem | 0.02em | `padding-block-start: 2px` (optical baseline) |
| ja | 500, `"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Yu Gothic", sans-serif` | 0.8125rem | 0.04em | — |

- Keep every behaviour of `renderLanguageChoice` and `renderJapaneseLanguageChoice` unchanged:
  - plain `<a>` when crossing root layouts, `Link` otherwise;
  - `handleLanguageChange`, `hrefLang`, `lang`, `aria-current`;
  - the 日本語 link only when `japaneseLanguageHref` exists;
  - `hidden={!showLanguageNav}` and the inline `display: none` it uses today.

## 7. Behaviour

- State: `expandedSection: "destinations" | "tours" | "services" | "studio" | null`, at most one.
  - Tapping the open section's toggle collapses it; tapping another switches directly.
  - Reset to `null` whenever the menu closes and whenever `pathname` changes.
- Toggles never navigate, never close the menu and emit no analytics event.
- Links (entries, Travel Advice, FAQ, CTA, languages) keep today's `href`s and `onClick`s and close the menu as today.
- On expand: after 260ms, if the section's bottom is below the scroll container's visible area, scroll the container so the section is fully visible. If the section is taller than the area, align its top 12px below the container top instead. Use `behavior: "smooth"`, or `"auto"` under `prefers-reduced-motion: reduce`.
- Escape closes the whole menu and returns focus to the menu button (today's behaviour). Resizing to 1180px or wider closes it (today's behaviour).
- Opening: focus still goes to the first focusable element in the panel (now the first toggle), as today.
- Focus trap: the existing `focusable` filter must also exclude elements inside `[inert]`: `.filter((element) => element.getClientRects().length > 0 && !element.closest("[inert]"))`.
- Closing stays instant, with no exit animation (today's behaviour).

## 8. Motion

| Moment | Specification |
|---|---|
| Panel enter | `data-entered="true"` is set two animation frames after `open` becomes true; panel opacity 0 → 1, 300ms |
| Rows enter | Primary rows, secondary rows, tagline and footer: opacity 0 → 1 and `translateY(12px)` → none, 550ms, `cubic-bezier(.2, .7, .2, 1)`, delay `90ms + var(--menu-index) * 55ms`. Indexes: primary 0–2, secondary 3–5, tagline 6, footer 7 |
| Section expand | `grid-template-rows` 500ms; underline `background-size` 500ms; label colour 350ms; entries opacity 0 → 1 and `translateY(8px)` → none, 500ms, delay `140ms + var(--entry-index) * 50ms` |
| Section collapse | Entries fade out over 300ms with no delay |
| Menu button morph | 350ms, same easing |
| Plan pill fade | 200ms |

All easing is `cubic-bezier(.2, .7, .2, 1)` unless stated. Under `prefers-reduced-motion: reduce`, every transition and animation in this menu has 0 duration and no transform.

## 9. Copy and analytics

New key `navigation.menuTagline`. Add it to the `navigation` type and use exactly these strings, taken from each locale's footer line:

| Locale | String |
|---|---|
| en | `Tailored journeys, planned with context.` |
| zh | `每一段旅程，都从真实需求出发。` |
| ko | `실제 조건을 바탕으로 설계하는 맞춤 여행.` |

No other copy is added or changed.

Analytics (names unchanged, no new events):

| Element | Call |
|---|---|
| Entry links, including the newly visible own-page entries (`cities`, `all-tours`, `trip-support`, `company`) | `trackNavigationClick(entry.id, \`mobile-${menuId}-menu\`)` |
| Travel Advice | `trackNavigationClick(item.id, "mobile-primary")` |
| FAQ | `trackNavigationClick("faq", "mobile-utility")` |
| Planner CTA | `trackPlannerClick()` plus today's `openTourContactFromLink(event, plannerHref, locale, menuButtonRef.current)`, `close()` and home-page hash handling |

## 10. Tests

Edit only these assertions, replacing each with an assertion of the new contract:

| File | Old assertion | Replacement |
|---|---|---|
| `guide-navigation-static.test.mjs` | `mobileUtilityLink` + `copy.navigation.faq` (around line 74) | The FAQ link in the mobile secondary tier uses `copy.navigation.faq` |
| same | Old mobile CSS layout: `.mobileUtilityLink {`, `.mobileLanguageNav a { … white-space: nowrap`, the `max-height: 960px / 820px / 650px` chip and row rules (around lines 119–127) | `.mobileSectionPanel` collapses with `grid-template-rows: 0fr`; `.mobileLanguageNav a` has `min-block-size: 3.125rem`; the old chip rules are gone |
| same | `<ul aria-label={item.label} className={styles.mobileSubmenu} data-menu={menuId}>` (around line 208) | Still present inside the section panel (keep this exact JSX string) |
| same | `menu.entries.filter((entry) => entry.href !== item.href)` (around line 211) | The mobile panel renders `menu.entries.map(` without that filter; the desktop menu is unaffected |
| `frontend-accessibility.test.mjs` | `className={styles.mobileUtilityLink}` (around line 258) | The FAQ link's new class |

`navigation-analytics-static.test.mjs` must keep passing unchanged.

New file `supabase/tests/mobile-menu-static.test.mjs` asserts:

1. Toggles have `aria-expanded` and `aria-controls`; panels have `role="region"` and `inert={!…}`.
2. The focus-trap filter contains `closest("[inert]")`.
3. `menuTagline` exists in en, zh and ko with the exact strings above.
4. The mobile language label uses `languageName` for en.
5. The CSS has a `prefers-reduced-motion: reduce` block covering the menu.
6. The faded colours `#938f87` and `#6b6b66` are used for the open state.
7. `.headerCta` in the open state uses `visibility: hidden`, not `display: none`.

## 11. Verification

- `npx tsc --noEmit`, `npm run test:inquiry`, `npm run test:guide-search`, `npm run build`, with all postbuild export checks including `check-ja-pilot-export` and font coverage.
  - The only acceptable local failures are the three PostgreSQL migration tests when a local database cannot start; CI must be fully green.
- Screenshots, compared against the prototype:

| Group | Viewports and pages | States |
|---|---|---|
| Phones and tablets | 320×568, 360×780, 390×844, 430×932, 768×1024, 1024×768; en / zh / ko, on the home page and on `/tours/` (current-section underline) | Closed, open, each section expanded |
| Japanese | One tour page that has a Japanese version | The 4-cell language row |
| Desktop regression | 1280×800 and 1440×900 before and after | Header region must be pixel-identical; no mobile panel present |

- Keyboard: Tab cycles only through visible, non-inert controls; Escape closes; focus returns to the menu button.
- Reduced motion: no movement.
- No horizontal scrolling at any width; every interactive target at least 44×44px.
