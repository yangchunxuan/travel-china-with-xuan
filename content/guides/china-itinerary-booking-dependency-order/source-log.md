# Source log — China itinerary booking dependency order

Status: `COPY READY — CENTRAL COLLECTION AND CTA OWNER ASSIGNMENT NEEDED`

Checked at: 2026-09-01 (Asia/Shanghai)

## Search and demand evidence

- Google queries reviewed: `plan China trip before train tickets go on sale` and `China itinerary booking order flights hotels trains attractions`.
- Results were dominated by ticket-purchase instructions, booking platforms, fixed day-by-day itineraries and product pages. People Also Ask focused on how far ahead rail tickets can be bought and whether foreigners can use 12306; few results explained how to keep a multi-city route reversible before exact rail inventory exists.
- A recent traveller asked whether to book hotels, trains, domestic flights and attractions three weeks ahead or while in China: https://www.reddit.com/r/travelchina/comments/1s78ma0/so_i_would_like_to_know_if_its_better_to_book/. The conflicting replies show that the cross-category state question is unresolved. Forums prove demand only and support no operating rule.

## Claim ledger

| Claim | Layer | Source | Checked | Boundary |
|---|---|---|---|---|
| Railway status must distinguish an advance request, waitlist and issued ticket | current rail | https://kyfw.12306.cn/otn/gonggao/alternate.html and https://www.12306.cn/en/faq.html | 2026-09-01 | No fulfilment probability, inventory or future train is inferred |
| Ordinary sale timing and a route-limited Beijing–Shanghai reservation pilot currently coexist | current rail | https://www.12306.cn/mormhweb/zxdt/202205/t20220531_37508.html and https://jnjtj.jinan.gov.cn/col/col15131/art/2026/art_3c25b7293e224f439f9a3053a9b104e2.html | 2026-09-01 | The article stores no nationwide countdown; execution remains with the rail guide |
| Foreign-passport users must complete the applicable identity process before relying on online purchase | current rail identity | https://kyfw.12306.cn/otn/gonggao/saleTicketMeans.html | 2026-09-01 | No verification duration or success promise |
| An air ticket's contracting carrier, actual carrier, connections, fare conditions, baggage and change/refund terms matter before purchase | current aviation contract | https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html | 2026-09-01 | No carrier, fare or universal flexibility is recommended |
| Hotel cancellation labels must disclose the applicable conditions, channel, deadline and refund path | current accommodation standard | https://zwgk.mct.gov.cn/zfxxgkml/hybz/202505/W020250520321654696062.pdf | 2026-09-01 | No room is assumed cancellable; the exact order controls |
| Venue reservation triggers and consequences differ even when two current windows have the same length | current venue operations | https://www.dpm.org.cn/subject_booking/ and https://www.chnmuseum.cn/cg/ | 2026-09-01 | These examples do not create a nationwide attraction rule |
| Temporary venue notices can override a static plan | current venue operations | https://www.dpm.org.cn/announce.html and https://www.chnmuseum.cn/gbgg/ | 2026-09-01 | No named gallery or opening is promised for a future visit |
| Official holiday and adjusted-workday dates come from the State Council's annual notice | current national calendar | https://www.gov.cn/gongbao/2025/issue_12406/material/gwygb202532.pdf | 2026-09-01 | The calendar does not prove sell-outs, fare increases or a crowd index |

## Editorial synthesis

- The page starts after dates and a candidate city skeleton exist. It does not replace the First Trip Planner.
- Commitment order is governed by consequence, reversibility, scarcity and release trigger—not by a universal category list.
- `Provisional`, `conditionally committed`, `confirmed` and `executable` are Homeground editorial states, not operator status labels.
- A rail request, waitlist or assumed service cannot close a downstream dependency. Only the actual official result can change that state.
- If the assumed rail edge fails, relax the lowest-cost downstream dependency before moving an international gateway or other high-consequence anchor.

## Canonical audit

- No exact owner was found on current main or remote `origin/article/*` and `origin/codex/*` branches.
- `/plan/` already owns the broad query “what should I book first”; this child is authorised only for the unavailable-rail interval and provisional-to-executable transition.
- `china-high-speed-train-first-time-guide`, `official-or-reseller-china-tickets`, `passport-name-across-china-bookings` and the remote direct-versus-OTA and hotel-rate owners retain their execution and comparison tasks.

## QA record

- Trilingual parity: PASS — 38 blocks, 9 H2 headings, 8 tables, 7 internal links and 9 visible official sources per locale; block IDs/types/order and all table/list shapes are identical. English has approximately 2,731 reader-visible words, Chinese has 5,359 Han characters and Korean has 6,438 Hangul syllables; neither localized body is a summary.
- Localized links: PASS — all Chinese and Korean internal links use `/zh/` and `/ko/`; all seven current guide or planning targets resolve.
- Blind traveller review: PASS after making request, pre-order, waitlist, payment and issued/fulfilled states mechanically distinct, returning the user to the ledger after rail purchase, tightening the room-rate contract language and requiring one specific recovery witness; P1 0, P2 0.
- SEO/technical adversarial review: PASS after narrowing the metadata and manifest to dates plus candidate-city skeleton already chosen, changing unnatural English “tickets open” copy to “tickets go on sale / rail is bookable,” checking all remote article/codex owners and verifying the hero rights record; P1 0, P2 0.
- Metadata JSON, hero dimensions/hash, guide generation/check, TypeScript, content manifest, font coverage, planning-scope lines, entity coverage, trilingual structure, local links and source-URL parity: PASS on 2026-09-01.
- `npm run check:high-intent-cta-ownership`: **central integration gate remains open** — adding this page changes the plan coverage count to 22 (`COVERAGE_COUNT_DRIFT: plan expected 22`). This branch does not modify the shared CTA ownership registry.
- Full `npm run build`: prebuild, compilation, lint and type validation PASS; page-data collection stops at the existing central integration gate because `beijing-datong-pingyao-xian-route-order` has no reviewed search collection assignment. This article does not modify the shared assignment map.
- Image QA: PASS — the original language-neutral 1600 × 1000 WebP visually matches the provisional-to-executable state diagram; SHA-256 `ed6149eadb390826e4674051f295801fd1d6f923a340d68f8a2d438573bb7881`; no documentary, operator, traveller or booking claim.
