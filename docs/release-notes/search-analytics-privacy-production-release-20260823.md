# Search, analytics and privacy production release — 2026-08-23

Status: **DEPLOYED AND LIVE-VERIFIED**

Production read-back date: **2026-08-23 (Asia/Shanghai)**

This is the dated production record for the PR #89 static release and its
same-day Search Console actions. Later documentation-only commits do not change
this audited runtime baseline. It supersedes older documents only where they
describe a configuration as current and does not rewrite their dated evidence.

## Release identity

| Field | Verified value |
|---|---|
| Pull request | [#89 — Harden analytics privacy, indexing signals, and traffic operations](https://github.com/yangchunxuan/travel-china-with-xuan/pull/89) |
| PR #89 runtime release SHA | `5bd15583c7c03dadc819d19bb4fc2c7f3ceb1b9e` |
| Merged | `2026-08-23 02:04:04 +08:00` |
| Pages deployment | [Run 32589631161](https://github.com/yangchunxuan/travel-china-with-xuan/actions/runs/32589631161) — success |
| Deployment completed | `2026-08-23 02:06:55 +08:00` |
| New canonical identities in PR #89 | `0` |

The 670-URL production sitemap is the inventory present on the whole release
SHA. PR #89 did not itself add 21 articles, Hubs, tools or canonical identities.

## What shipped

- Lifecycle-owned sitemap `lastmod` values for audited system pages.
- Exact `origin` referrer policy on public layouts.
- Consent-gated GA4 and Meta initialization, revocation and page-view handling.
- Query-free analytics location/referrer handling and bounded retry behavior.
- Privacy wording aligned with the deployed browser behavior.
- Hardened, fail-closed source and release contracts for the optional
  first-party traffic collector and Admin traffic endpoint.
- Cross-platform test and dependency updates.

## Public production read-back

The following was checked after the Pages deployment:

| Check | Result |
|---|---|
| `/`, `/zh/`, `/ko/`, `/privacy/`, `/admin/` | HTTP 200 |
| English homepage title | `Homeground China | China Travel Agency for Tailor-Made Trips` |
| English homepage description | `Homeground China is a China travel agency for private, tailor-made trips, with practical guides, route design, stays, tickets, transport and local support.` |
| Homepage canonical | `https://homegroundchina.com/` |
| Structured identity | One `TravelAgency` identity and `Homeground China` website name |
| Public referrer policy | `origin`; the public layouts do not emit `strict-origin-when-cross-origin` |
| Third-party scripts before consent | No direct GA4 or Meta vendor script in static HTML |
| Cloudflare browser analytics | No Web Analytics/RUM script observed |
| First-party event endpoint | No `v1-traffic-events` endpoint in the public HTML or client bundle |
| `robots.txt` | Public crawling allowed; `/admin/` disallowed; canonical sitemap declared |
| Live sitemap | HTTP 200; 670 `<loc>` values; 670 unique; 0 duplicates |

`/admin/` returning HTTP 200 proves only that the static shell exists. It is not
evidence that private Admin traffic data or its backend is enabled.

## Search Console actions

The authenticated domain property `sc-domain:homegroundchina.com` was checked
without persisting account information, cookies or credentials in this
repository.

- `https://homegroundchina.com/sitemap.xml` was submitted successfully after
  the 670-URL live read-back.
- URL Inspection reported `https://homegroundchina.com/` as already indexed by
  Google.
- One homepage re-index request was accepted and the URL was added to Google's
  priority crawl queue.
- The sitemap table may continue to show the previously processed 649-URL
  snapshot until Google reads the new sitemap. That delay is not a deployment
  failure.
- Do not calculate `indexed / 670` from reports with different dates or grains,
  and do not claim that all 670 URLs are indexed.
- Do not repeatedly request indexing for the English homepage. Monitor the
  branded result and Search Console at 7, 14 and 28 days unless a new material
  homepage change or an explicit indexing error justifies another request.

The English homepage received the URL Inspection and re-index request in this
release. `/zh/` and `/ko/` passed live static checks, but this record does not
claim that separate URL Inspection requests were submitted for them.

## External measurement controls observed

These controls live outside Git history and may drift. They were read back for
this release and must be verified again before a later release relies on them.

- Repository analytics switch: enabled for the consent-gated browser layer.
- Approved GA4 public ID: `G-DPGR2SVC0G`.
- Approved Meta public ID: `1049980710767613`.
- GA4 site-search enhanced measurement: off.
- GA4 query redaction: exact parameter names `q`, `s`, `search`, `query` and
  `keyword`.
- GA4 user-provided data collection: off in the external setting observed for
  this release.
- The shipped browser configuration separately keeps `ad_storage`,
  `ad_user_data` and ad personalization denied.
- Korea-office internal-traffic rule: **Testing**, not Active. The candidate
  office IP is deliberately not copied into this public repository; it still
  requires the agreed stability recheck before any permanent exclusion.
- Cloudflare Web Analytics/browser RUM: disabled.

## Explicit production holds

The release includes hardened source and tests for future traffic operations,
but the following are **not deployed or activated**:

- `NEXT_PUBLIC_HOMEGROUND_WEB_EVENTS_URL` is absent from repository variables.
- The first-party browser collector is therefore paused and fail-closed.
- The new traffic migration, Edge Function revision, secrets, cron jobs and RPC
  grants were not deployed or remotely verified as part of this release.
- `admin-traffic` was not activated; its Admin master and independent traffic
  server-side gates remain off or absent. The public URL/static client presence
  is not activation evidence.
- Route Reality's internal specification was merged via PR #75 and its v4
  technical review passed. The public product was subsequently rejected, so it
  remains `internal-only / not-published`; no page, API, calculator, indexable
  result or further implementation is authorized without a new central
  decision.

Activation of any held traffic component requires the complete read-back and
rollback procedure in
[`docs/first-party-traffic-operations.md`](../first-party-traffic-operations.md).

## Verification evidence

- Full local tests: **545 passed, 0 failed, 1 Windows-only jq skip**; Linux CI
  executed the jq assertions.
- Focused analytics tests: **27/27 passed**.
- Focused traffic-operations tests: **23/23 passed**.
- TypeScript: passed.
- Static production build: **724/724 pages**.
- Sitemap export: **670 unique URLs**.
- `npm audit` and `npm audit --omit=dev`: **0 vulnerabilities**.
- Remediation security scan
  `c2156619-8ac2-4f01-b0d7-b566f2cb3160`: **0 findings**.
- GitHub Pages build and deployment jobs: success.

## Governance boundary for later agents

- The machine Search Map has been reconciled to 182 guide identities, 540
  guide locale URLs and eight published destination Hubs at the release SHA.
- PR #74's five identities are recorded as published; the later PR #80, #83,
  #86 and #87 owners missing from the earlier inventory are also backfilled.
- Treat older 634- and 649-URL records as dated historical evidence, not the
  current live sitemap count.
- Do not change Search Map content identity status because of PR #89; it added
  no canonical identity.
- Draft PR #84 separately holds 60 reserved trilingual guide drafts. It is
  open, still Draft, conflicting with current `main`, and not part of this
  production release; none of its 60 identities is published or authorized for
  merge/deployment.
- Do not infer a Supabase deployment from checked-in migration or function
  source.
- Do not re-enable Cloudflare browser analytics as a second measurement path.
- Do not activate the Korea internal-traffic exclusion while the GA4 filter is
  still intentionally in Testing.
- Never store Search Console account details, cookies, JWTs, secrets, Admin
  UUIDs or temporary credentials in release evidence.
