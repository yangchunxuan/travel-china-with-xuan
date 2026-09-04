# Source and editorial audit — Canton Fair accommodation base

Status: **COPY DRAFT — EDITORIAL REVIEW COMPLETE; ADDITIONAL AREA ASSETS OPTIONAL**

- Candidate: `stay-seo-20260901-01`
- Baseline: `origin/main@c13d83e1abc8f5f25ee2250de11eed8c424a0196`
- Full factual review: **2026-09-01 (Asia/Shanghai)**
- Primary intent: choose Pazhou, Tianhe or Yuexiu after attendance at a particular Canton Fair phase is fixed.

## Demand research — question evidence only

Current Google results and related question-shaped results were checked for `where to stay Canton Fair`, `Pazhou vs Tianhe hotel Canton Fair` and `Canton Fair hotel shuttle`. Results were heavily weighted toward “best hotels” lists, sales pages and current-price claims. Recent traveller questions include:

- <https://www.reddit.com/r/guangzhou/comments/1taec16/>
- <https://www.reddit.com/r/guangzhou/comments/1sgyu74/>

These threads establish that people are trying to choose among the areas and verify shuttles. They are not used for transport, badge, hotel or policy facts.

## Official and first-party factual sources

| ID | Source | Fact used | Limit |
| --- | --- | --- | --- |
| `CF-01` | [2026 Attendance Guide for Overseas Buyers](https://www.cantonfair.org.cn/en-US/pages/598494791797825536) — China Import and Export Fair | Current official attendance-guide hub and multilingual attachments | The attachment and session details can change; the page does not choose a hotel area |
| `CF-02` | [139th Canton Fair Buyer Guide](https://www.cantonfair.org.cn/en-US/pages/682045446818172928) — China Import and Export Fair | Official phase guides and complex address; establishes that exact hall/area belongs to a session guide | Spring-session navigation is not assumed permanent for a later session |
| `CF-03` | [Your Canton Fair travel guide](https://www.eguangzhou.gov.cn/gzspecialreports/139thCantonFair/content/post_42667.html) — Guangzhou municipal international portal | Pazhou and Xingangdong are the named Metro approaches; the page shows different rail/airport chains | Published for the 139th session; no fixed duration is reused |
| `CF-04` | [Your metro guide for the 139th Canton Fair](https://www.gz.gov.cn/guangzhouinternational/Canton%20Fair/content/post_10769860.html) — Guangzhou Municipal People's Government | Official municipal confirmation of Lines 8/11 and the venue stations | Session-specific hours and enhancements are deliberately excluded |
| `CF-05` | [Easy Canton Fair Badge Registration](https://www.cantonfair.org.cn/en-US/posts/1006458668226895872) — China Import and Export Fair | Official reminder that hotel badge locations are session-specific and subject to latest updates | The named hotels are not accommodation recommendations or permanent registration desks |
| `CF-06` | [Guangzhou hotels launch Canton Fair services](https://www.eguangzhou.gov.cn/gzlatest/content/post_42773.html) — Guangzhou international portal | Shows that some named properties offered shuttles and multilingual services for one session | A dated service announcement cannot guarantee another property, date, seat or return |
| `CF-IMG` | [Canton Fair Complex aerial photograph](https://commons.wikimedia.org/wiki/File:Aerial_View,_Canton_Fair_Complex_20230701-A.jpg) — Tim Wu / Wikimedia Commons | Real hero place and CC BY-SA 4.0 rights | Image is not operating evidence |

## Editorial judgements separated from facts

- **Pazhou default:** Homeground judgement for travellers with several full fair days or very early venue work, because it removes the largest repeated venue leg. It is not an official recommendation and still requires the exact door-to-hall check.
- **Tianhe override:** Homeground judgement when client offices, dinners and evening work around Zhujiang New Town/Tianhe repeat enough to justify a daily fair transfer.
- **Yuexiu override:** Homeground judgement for travellers whose non-fair work, established central hotel operations or old-city evenings repeat there. “Yuexiu” is too broad to prove a simple fair commute.
- **No automatic split stay:** Homeground judgement based on packing and check-in friction. A move earns its place only if it removes at least two repeated transfers or protects a fixed early/late event.

No source is used to claim live price, inventory, room quality, foreign-guest eligibility, step-free access, shuttle capacity or traffic time.

## Locale, links and structure

EN, ZH and KO use the same block IDs/types, table dimensions, list lengths, four internal destinations and six factual sources plus one image source. Prose is independently localized: Chinese uses normal Canton Fair/Guangzhou terminology; Korean retains the familiar `캔톤페어` name and explains the area decision without transliterating English sentence order.

## Review record

- **Traveller blind review — 2026-09-01:** no P1; four P2 findings covered the missing minimum-data/privacy consultation boundary, inconsistent Tianhe geography across locales, one mistranslated Korean decision cell and an internal `owner` term in English recovery copy. All were corrected. The same reviewer rechecked the complete EN/ZH/KO page, including the three scenarios, trade-offs, recovery and consultation boundary, and returned `TRAVELLER RE-REVIEW PASS` with no remaining P1/P2.
- **SEO/technical adversarial review — 2026-09-01:** no P1; two P2 findings covered the same Korean decision-cell error escaping the shape-only test and the audit status being marked complete before evidence existed. The copy and a targeted semantic assertion were corrected; the status remained in progress until review closed. The same reviewer rechecked canonical ownership, metadata, entities, citations, source timing, privacy and guarantee boundaries, image rights and tests, then returned `SEO/TECH RE-REVIEW PASS` with no remaining P1/P2.
- Tests cannot prove translation quality. Korean decision meaning was reviewed manually after the mechanical EN/ZH/KO structure test; the test now also pins the corrected high-impact cell and rejects the known erroneous phrases.

## Verification record

Run after the final review fixes on **2026-09-01**:

- `node --experimental-strip-types --test supabase/tests/canton-fair-pazhou-tianhe-yuexiu-hotel-base-static.test.mjs` — **PASS, 4/4**. A Node module-type performance warning was emitted; it did not change the result.
- `npm run guide:generate` — **PASS**, 174 independent guide folders verified and two ignored temporary generated files refreshed.
- `npm run guide:check` — **PASS**, 174 independent guide folders verified.
- `npm run content:check` — **PASS**, current generated content manifest verified.
- `npm run typecheck` — **PASS**.
- `npm run check:guide-entities -- --strict` — **not a global PASS**: the command reports 94 pre-existing guides with unmapped tokens on the `origin/main` baseline. This new owner itself resolves to `city-guangzhou` and emitted no unmapped token. No central entity/Search Map file was changed to hide the baseline issue.
- `git diff --cached --check` — **PASS** for the exact article, hero and dedicated-test file set.

A full production build is reserved for the completed six-guide branch and is not claimed here.
