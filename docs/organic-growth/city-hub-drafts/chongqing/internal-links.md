# Internal-link plan — Chongqing Destination Hub

Status: **RELEASE LINK GATE PASSED — MERGE REQUIRES CENTRAL ACTION**
Checked: **2026-08-21**
Rule: a body link is allowed only after the exact production URL resolves to the intended page with HTTP 200. Repository presence, a planned release, a redirect or another locale does not satisfy the gate.

## Release reconciliation — 2026-08-21

All five qualifying specialist owners now return the intended page in English,
Simplified Chinese and Korean: **15 / 15 HTTP 200 checks passed**. Runtime Hub
bodies link all five locale-correct owners, the four nationwide accommodation
owners, itinerary review and the general trip brief. Each of the five
specialist owners now links back to the locale-correct Chongqing Hub path.

The August 15 allow-list and `BLOCKED_PENDING_EXACT_LIVE_200` rows below are
retained as draft history and are superseded by this release reconciliation.
No second `/guides/chongqing-travel-guide/` canonical was created.

## 1. Active body links

The three guide-library pages and three planning-service pages were reachable as the intended production pages during the final audit. They are the only active Markdown links in `hub.en.md`, `hub.zh.md` and `hub.ko.md`.

| Locale | Active body URL | Anchor purpose | Audit result |
|---|---|---|---|
| English | `/guides/` | Current Homeground travel-guide library | intended production page reachable |
| English | `/china-itinerary-review/` | Compare route review, route build and full-trip support | intended production page reachable |
| Simplified Chinese | `/zh/guides/` | 当前 Homeground 旅行指南库 | intended production page reachable |
| Simplified Chinese | `/zh/china-itinerary-review/` | 比较路线点评、代排路线与全程支持 | intended production page reachable |
| Korean | `/ko/guides/` | 현재 Homeground 여행 가이드 라이브러리 | intended production page reachable |
| Korean | `/ko/china-itinerary-review/` | 일정 검토, 일정 설계, 전체 현지 지원 비교 | intended production page reachable |

No proposed destination path is linked from the draft. `/destinations/chongqing/`, `/zh/destinations/chongqing/` and `/ko/destinations/chongqing/` remain proposals for central integration.

## 2. Mandatory owner connections

All four mandatory owners are named in every locale body and receive a precise editorial handoff. Their repository IDs remain visible in code formatting. The expected deep paths are kept out of active Markdown until each exact locale URL passes a fresh production audit.

| Owner | Hub handoff | Expected English target | Expected Chinese target | Expected Korean target | Draft status |
|---|---|---|---|---|---|
| `chongqing-upper-lower-city-orientation` | Full bank–level–entrance–connection method, vertical connectors and closure-sensitive route logic | `/guides/chongqing-upper-lower-city-orientation/` | `/zh/guides/chongqing-upper-lower-city-orientation/` | `/ko/guides/chongqing-upper-lower-city-orientation/` | `BLOCKED_PENDING_EXACT_LIVE_200` |
| `chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba` | Complete Jiefangbei–Guanyinqiao–Shapingba comparison and property-level access checks | `/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/` | `/zh/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/` | `/ko/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/` | `BLOCKED_PENDING_EXACT_LIVE_200` |
| `china-tiankeng-sinkholes-explained` | Tiankeng terminology, geological distinctions and managed-access boundary | `/guides/china-tiankeng-sinkholes-explained/` | `/zh/guides/china-tiankeng-sinkholes-explained/` | `/ko/guides/china-tiankeng-sinkholes-explained/` | `BLOCKED_PENDING_EXACT_LIVE_200` |
| `sichuan-opera-face-changing-with-context` | Named-programme choice, repertoire context and performance rechecks | `/guides/sichuan-opera-face-changing-with-context/` | `/zh/guides/sichuan-opera-face-changing-with-context/` | `/ko/guides/sichuan-opera-face-changing-with-context/` | `BLOCKED_PENDING_EXACT_LIVE_200` |

### Activation procedure

1. Request the exact locale URL and confirm the final response is HTTP 200.
2. Confirm the body is the intended owner page, not a soft 404, redirect-only shell, wrong locale or unrelated index.
3. Replace only the corresponding plain-text title in that locale body with a Markdown link.
4. Do not point an unavailable Chinese or Korean owner link to the English page.
5. Run the repository local-link/export guard and render all three locale pages.
6. Recheck the target after deployment because owner publication and route generation are dynamic.

## 3. Ownership boundaries retained in the link architecture

| Broad Hub task | Supporting owner | What the Hub deliberately does not duplicate |
|---|---|---|
| Decide how to understand Chongqing’s vertical form | `chongqing-upper-lower-city-orientation` | Street-by-street entrances, a universal connector list or a fixed walking-time table |
| Decide which district reduces repeated movement | `chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba` | Full three-area scorecard, hotel shortlist or property-level access audit |
| Decide whether Wulong’s landscape justifies the extension | `china-tiankeng-sinkholes-explained` | Geological textbook content or a rewritten tiankeng article |
| Decide whether a regional performance fits the route | `sichuan-opera-face-changing-with-context` | Full Sichuan-opera history, guarded technique explanations or a permanent venue calendar |

The Hub may mention these owners before their links activate because the editorial handoff itself is part of the draft. It may not expose an unverified production URL.

## 4. Future destination and route links

The body discusses Chengdu, Zhangjiajie, Furong Town, Fenghuang and the Yangtze cruise as onward-route decisions. No deep destination or route link is active in this draft because the exact canonical owner and live locale path were not established within this task.

Central integration may add those links only after:

- confirming the canonical destination or route owner;
- checking the exact locale URL for HTTP 200;
- verifying that the link supports the paragraph’s decision rather than creating intent collision;
- ensuring that a future railway or dynamic cruise handoff is not represented as permanent.

## 5. Forbidden link outcome

Do not create, publish, redirect to or internally link any of the following:

- `/guides/chongqing-travel-guide/`
- `/zh/guides/chongqing-travel-guide/`
- `/ko/guides/chongqing-travel-guide/`

The broad Chongqing travel-guide intent belongs to the proposed destination paths:

- `/destinations/chongqing/`
- `/zh/destinations/chongqing/`
- `/ko/destinations/chongqing/`

Those destination routes must be integrated centrally; this draft does not edit the sitemap, route registry, Search Map or indexability system.

## 6. Final body-link allow-list

Until central review activates additional owners, the complete allowed internal-link set is:

```text
/guides/
/china-itinerary-review/
/zh/guides/
/zh/china-itinerary-review/
/ko/guides/
/ko/china-itinerary-review/
```

Any other Markdown link found in the three body files should fail QA.
