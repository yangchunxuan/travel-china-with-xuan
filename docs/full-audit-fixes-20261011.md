# Full audit fixes — 11 October 2026

Base: main `8cce47371259669511afadee531202b289e61e41`. This record describes
source fixes and local verification; it is not evidence of a production rollout.

## Changes

| Finding | Result |
|---|---|
| B01 incomplete recovery scope | Include `homeground_recovery`; actual encrypted restore checks deletion replay, rights deletion, retention and access controls. Import the latest independent deletion ledger before serving restored data. |
| B03 receipt capacity before rate limiting | Admit the receipt in the successful inquiry transaction; rejected requests cannot allocate intent rows. |
| B02 ambiguous notification retries | Guard claim, freeze and manual requeue at 23 hours from first provider attempt; retain the 72-hour limit for never-attempted backlog. |
| B04 stale monitoring success | Bind a successful observation to its timestamp and exact workflow run/attempt/SHA; reject stale/future/missing evidence. Add an inactive independent scheduled sampler for reviewed operational handoff. |
| FE01 retained contact receipt | Keep the receipt for the same request; show a new form for a different route/selection. Preserve immutable in-flight/uncertain requests. |
| FE02 lost tour selection | Carry validated package and traveller count through quick email, WhatsApp, alternative email and the contact-card label. |
| FE03 Escape reopens search | Restore input focus before dismissing suggestions so focus capture cannot undo dismissal. |
| Tour directory freshness | Derive five-language hub modification dates from published content instead of fixed old dates or build time. |
| AI directory factual errors | Distinguish 47 priced routes and 8 quote-only routes; link to the actual contact entry. No change to seasonal, service-version or validity details, as requested by the owner. |
| Development dependency alert | Update only fast-uri 3.1.5 to 3.1.8; full npm audit is clean. |
| Windows validation | File-URL imports, normalized checkout line endings and privilege-free directory-junction boundary tests. Real encryption and TLS tests still run; POSIX permission modes are enforced on Linux. |

## Verification

- Final complete inquiry suite on WSL Ubuntu / Node 22 / PostgreSQL 17 / age /
  OpenSSL / jq, with CI and required-PostgreSQL flags: **1,397 passed, no failures
  or skips**. Includes actual migration replay and encrypted database restoration.
- Native Windows inquiry run: 1,346 passed, no failures; 14 database/jq-dependent
  cases skipped locally and covered by the complete Linux run.
- Guide search: 7/7. Typecheck and full production-configured build, including
  all prebuild/postbuild checks: passed. Priority index and ten-day guide checks
  also passed. Full dependency audit: zero vulnerabilities.
- Independent final export scan: 1,321 HTML pages, 1,267 sitemap entries,
  3,226 unique local resource paths and 84 CSS files. No missing resources or new
  canonical, indexing, metadata, internal-link, JSON-LD or reciprocal-hreflang
  issues. Existing noindex-to-noindex alternate and dynamic-modal-anchor hints
  match the previous baseline exactly.
- Browser, existing Chrome tab: same-context success retains receipt; client
  navigation to a different tour restores the form and a second local inquiry
  succeeds; changing group size resets the form and updates all contact text.
  At 390×844, the quote panel opens with the correct selection; ArrowDown then
  Escape closes search suggestions; editing reopens them and a click navigates
  to the chosen guide. No captured script errors.
- Browser submissions used the existing memory-only mock through a local test
  server. A local CSP blocked external connections; no real inquiry, email or
  production heartbeat was generated. The original browser page and viewport
  were restored after testing.
- Separate production read-only recheck at 21:08 CST: 15/15 TLS/site checks
  healthy, sampled pages and redirects correct, six deliberately incomplete
  intake probes return 422/not_persisted. Production still serves the base SHA.

## Release order and remaining operational checks

1. Apply migration `202610110002_inquiry_receipt_and_retry_hardening.sql`, then
   deploy `v1-inquiries`. Never reverse this order. Old Edge code during the
   interval still saves inquiries, but new optional confirmation emails may be
   disabled until the new Edge bundle is deployed.
2. Verify deployed migration/function parity and authenticated aggregate queue
   health. Investigate pre-existing failed or ambiguous sends; do not blindly
   resend them or reset their provider timestamp.
3. Merge/deploy the static site, backup and GitHub monitoring changes after CI.
   Verify a new encrypted backup includes the recovery schema and confirm the
   independent deletion-ledger procedure before treating recovery as ready.
4. The new Worker is intentionally disabled with no Cron. Configure a dedicated
   new Better Stack heartbeat and the existing read-only monitor credential,
   verify account quota, deploy, then verify two real scheduled observations.
   Only then switch the repository reporter to Cloudflare and retire the old
   heartbeat. Each heartbeat must have one emitter; keep GitHub during handoff.

Detailed procedures: [receipt and retry rollout](inquiry-receipt-retry-hardening.md),
[monitoring/restore runbook](site-stability-runbook.md), and
[local validation prerequisites](local-validation.md).
