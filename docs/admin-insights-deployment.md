# Homeground private saved-inquiry insights

Status: deployed only to an independent Supabase Staging project and kept
fail-closed. Production has not been changed. The twelve database migrations,
both Admin Edge Functions and the updated public Inquiry handler exist in
Staging, but the administrator has not completed password setup or TOTP, the
Admin API remains disabled, public Inquiry submissions remain disabled, and
no production hosting/security-header gate has passed.

The approved product boundary is:

- one authenticated page at `/admin/`;
- one 90-day aggregate response;
- one operational-health response;
- no individual enquiry, contact detail, public reference, free text, budget,
  country, visitor event, platform metric, UTM, entry path, CRM field, search,
  export or write action;
- one bounded auxiliary attribution view: only allowlisted guide slugs whose
  browser-supplied planner-entry identifier appears on at least five saved enquiries in a
  fixed 90-day window. It returns no total, suppressed count or individual
  row and is not described as first-touch, a unique visitor or a conversion
  cause.

The HTML route is a static asset and its URL is not secret. Protection of the
data comes from Supabase Auth, TOTP MFA, the server-side administrator UUID
allow-list, restricted aggregate RPCs and exact-origin API rules.

## Current activation state

The implementation and current Staging deployment are deliberately
fail-closed:

- missing public build configuration shows `私有后台尚未启用` and does not
  call either business-data endpoint;
- `ADMIN_API_ENABLED` defaults to `false` at the Edge API;
- no administrator UUID or server credential belongs in the browser bundle;
- no migration or function deployment is performed by `npm run build`;
- the existing GitHub Pages workflow does not create an Auth user or enable
  TOTP;
- production activation remains blocked until the purpose, legal basis,
  processor/cross-border map, fixed retention, rights runbook and actual
  security-header delivery have been approved and verified.

Twelve migrations were applied in timestamp order through the Staging SQL
Editor or the isolated linked CLI workspace. The expected objects, forced RLS,
grants, fixed RPCs, contracts and cron definitions were inspected there.
Because this remains a manual deployment, Supabase migration-history metadata
was not populated; do not run an automatic `db push` against Staging until
that history gap is deliberately reconciled. The dual-version
`admin-health`, updated `admin-insights`, updated `v1-inquiries`, and
`202607250001` attribution migration are deployed in Staging. Negative Admin
endpoint checks return 403 for a wrong or missing Origin and 503 for the exact
temporary verification Origin while `ADMIN_API_ENABLED=false`.

The current attribution implementation passes the complete 236-test suite,
the production build and font coverage locally. Staging V5 persistence,
idempotency, validation, aggregate suppression, ACL and data-quality-hold
runtime checks passed. The Admin aggregate UI passed blind screenshot review
at 1024 × 900 and 390 × 844. Authenticated Staging Admin evidence is still
required after the owner completes password setup and TOTP; none of these
checks is evidence of production activation.

## Data flow

```text
/admin/ static page
  -> Supabase Auth: password login and TOTP challenge
  -> user JWT with aal2
  -> GET admin-health / GET admin-insights
  -> exact-Origin and disabled-state checks
  -> server getUser verification + JWT claim checks + UUID allow-list
  -> admin-insights runs two fixed service-role-only RPCs in parallel
  -> aggregate JSON with no individual enquiry data
     - 90-day planning distributions
     - 90-day, k>=5 allowlisted last-guide-CTA counts
```

The browser sends both of the credentials required for an authenticated
Supabase Edge Function call:

- `Authorization: Bearer <signed-in user JWT>`;
- `apikey: <public publishable key>`.

The publishable key is not an administrator secret. A secret/service-role key
must never appear in a `NEXT_PUBLIC_*` value, browser storage, page source or
GitHub repository variable.

## Contracts

Only these Homeground business-data calls are permitted:

```text
GET /functions/v1/admin-insights
GET /functions/v1/admin-health
```

Supabase Auth calls for login, factor enrolment/challenge/verification, token
handling and logout are separate authentication calls and cannot return
enquiry data.

The frontend accepts only:

- `homeground-admin-insights.v2`, which contains the existing aggregate
  read model and `homeground-admin-guide-inquiries.v1`;
- `homeground-admin-health.v1`.

It validates the full response shape, rejects forbidden field names and stops
displaying a section when the contract is not the approved version.

Every authorized Admin read also attempts to write one fixed-enum access
record containing only the administrator UUID, endpoint, controlled result
and database time. Those records have a fixed 30-day TTL and never contain a
request body, response body, query, IP address, User-Agent or customer value.
Production activation requires evidence that this ledger and its daily prune
job work. A successful Admin data response fails closed when its audit write
cannot be confirmed. Authorized error responses may still be returned because
they contain no aggregate data.

## Public build configuration

Store these as GitHub Actions repository variables. They are compiled into
the static site and therefore public:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_URL` | Exact project origin, such as `https://PROJECT.supabase.co` |
| `NEXT_PUBLIC_HOMEGROUND_ADMIN_SUPABASE_PUBLISHABLE_KEY` | Project publishable key |
| `NEXT_PUBLIC_HOMEGROUND_ADMIN_INSIGHTS_URL` | Exact `admin-insights` Edge URL |
| `NEXT_PUBLIC_HOMEGROUND_ADMIN_HEALTH_URL` | Exact `admin-health` Edge URL |

All four must be present and HTTPS in a production build. Partial or malformed
configuration keeps the page disabled.

## Server-only Edge configuration

The hosted project supplies its own `SUPABASE_URL`, publishable-key dictionary
and secret-key dictionary. The application-specific settings are:

| Variable | Rule |
|---|---|
| `ADMIN_API_ENABLED` | Defaults to `false`; set exactly `true` only after every activation gate passes |
| `ADMIN_ALLOWED_ORIGIN` | One exact canonical HTTPS origin, normally `https://homegroundchina.com`; no path or wildcard |
| `ADMIN_ALLOWED_USER_IDS` | Comma-separated Supabase Auth user UUIDs; never email addresses |
| `ADMIN_ENVIRONMENT` | Controlled label such as `staging` or `production` |
| `ADMIN_MAX_TOKEN_LIFETIME_SECONDS` | Maximum accepted user-JWT lifetime; defaults to 3600 and must remain within 300–7200 |

For local compatibility the functions may read the documented single-key or
legacy fallbacks, but production must prefer the hosted key dictionaries. Do
not try to replace Supabase-reserved hosted variables with repository secrets.

## Administrator account

Do not reuse a public website password or a shared staff login.

1. Choose the exact administrator email with the owner.
2. Create or invite one Supabase Auth user in the intended project.
3. Set a unique password using the Auth flow; never commit it or send it in a
   task transcript.
4. Copy the immutable Auth user UUID into `ADMIN_ALLOWED_USER_IDS`.
5. Log in at `/admin/` and enrol a TOTP authenticator.
6. Complete the TOTP challenge and confirm the resulting JWT has `aal2`.
7. Store recovery procedures outside the website repository.

Email login alone is `aal1` and cannot read either Admin API. Login success is
also insufficient when the Auth user UUID is not in the server allow-list.

Staging has one pending invitation and its immutable UUID is already in the
server allow-list. The first superseded invitation was deleted and must not be
used. The Auth Site URL is the exact local `/admin/accept-invite/` setup route,
with no redirect wildcard. The setup page scrubs the implicit-flow fragment
before parsing or configuration access, stores no session in browser storage,
uses a fixed ten-minute client deadline, and never reads business data. A
request that returns after that deadline is not shown as confirmed success.
The owner must use only the newest email, set the password privately, then log
in and bind TOTP; passwords, OTPs and recovery codes never belong in this
runbook or a task transcript.

## Database and function deployment

Use a separate staging Supabase project first. Verify the linked project
before every command.

The steady-state public Inquiry API allow-list contains only the current paired
form/privacy version (`2026-07-25.1`). During this static-site rollout only,
record the owner and end time before temporarily accepting the matching
`2026-07-21.1,2026-07-25.1` pairs. Remove `2026-07-21.1` when the bounded
cache/retry window closes. `admin-health` is expected to show `attention`
during that deliberate overlap; it must return to current-only afterward.
The older RPCs remain in source for controlled transition and idempotent
compatibility; that is not permission to accept attributed legacy submissions
indefinitely.

For a normal CLI-managed environment, apply migrations in timestamp order.
This Staging project has no reconciled migration ledger, so do not run
`supabase db push` there. Before applying the 07-25 migration, verify that
`public.get_homeground_admin_health()`, V4, and
`homeground_private.admin_metric_compatibility` exist, while
`homeground_private.get_homeground_admin_health_20260721()` does not. A failed
preflight means the Staging baseline must be repaired; do not make the
migration silently skip unknown state.

Deploy the dual-version `admin-health` parser first. It accepts only the
complete `07-21/07-21` and `07-25/07-25` producer pairs and rejects a mixed
pair. This keeps health readable across the database cutover. Then review and
execute only `202607250001_homeground_guide_attribution.sql` against Staging,
validate V5 and both aggregate RPCs, and deploy the remaining functions:

```bash
supabase functions deploy admin-health
supabase functions deploy admin-insights
supabase functions deploy v1-inquiries --no-verify-jwt
```

Show the exact SQL and Staging runtime evidence to the owner and obtain
explicit approval before any production database change. The production
order is the dual-version `admin-health` parser, database migration,
temporary paired-version secrets, `admin-insights`, `v1-inquiries`, the
static site, then removal of `2026-07-21.1` after the cache/retry window.
Do not roll `admin-health` back to the old single-version parser after the
database producer changes. Never publish the `2026-07-25.1` form before its
V5 RPC exists in that environment.

The current Staging project signs Auth JWTs with an asymmetric key. Its legacy
gateway `Verify JWT with legacy secret` switch is therefore disabled for both
Admin functions, while each handler still performs its own Supabase Auth
`getUser` verification, token-claim/lifetime checks, `aal2` requirement and
server-side UUID allow-list before any RPC. This is not an unauthenticated
business API. A later CLI deployment can change the gateway setting, so verify
the setting and repeat all negative authorization tests after every deploy.
Never disable handler-side verification or rely only on CORS.

For this particular Staging project, the twelve migrations were applied
manually and no migration ledger was created. Reconcile that ledger before
using `supabase db push`; do not mark migrations as applied without matching
the actual database definitions.

During validation a Staging-only legacy service-role credential surfaced in
restricted tool output. It was not copied into source or documentation, and
no production credential was read or changed. The Staging project still lists
legacy anon and service-role API keys alongside its current publishable and
secret keys, so credential rotation is an open staging-hardening item rather
than a completed claim. Keep both application kill switches off until that
rotation is coordinated with the Edge secrets and followed by a complete
authorization regression test.

The database migration is privileged and must be reviewed before it reaches
production. In particular, confirm:

- all private tables retain forced RLS;
- aggregate and health RPC execution is revoked from `public`, `anon` and
  ordinary `authenticated`;
- only fixed, parameter-free server RPCs are exposed;
- the approved 12-month enquiry and 60-day outbox TTLs are legally and
  operationally accepted before their cleanup schedule is activated;
- cleanup records failures without storing enquiry content;
- backup-restoration deletion replay is either proven or shown as
  `not_verified`, never inferred;
- test enquiries are never written into the production business tables.

## Hosting security-header gate

`robots.txt`, `noindex`, an unlinked URL and a CSP `<meta>` tag are not access
control.

The current GitHub Pages deployment does not provide a repository-controlled,
route-specific response-header configuration for `/admin/`. Before production
data access is enabled, put the route behind a header-capable delivery layer
or move it to a host that can verifiably return, at minimum:

- a reviewed `Content-Security-Policy` with an exact Supabase
  `connect-src`, `object-src 'none'`, `base-uri 'none'`,
  `form-action 'self'` and `frame-ancestors 'none'`;
- `X-Content-Type-Options: nosniff`;
- `Referrer-Policy: no-referrer`;
- an appropriate permissions policy;
- no caching of authenticated Admin API JSON. The static HTML shell may use
  ordinary asset caching only because it never embeds a session or business
  data.

Next.js static hydration may require build-specific CSP hashes. Do not add a
broad third-party origin or silently weaken the policy just to make a build
load. Capture the actual production response headers as acceptance evidence.

## Activation sequence

This sequence governs Admin data access, not the independent public
first-party-attribution release. The V5 migration and public form may be
approved under `docs/inquiry-deployment.md` while `ADMIN_API_ENABLED=false`;
doing so does not satisfy the password, TOTP, authorized-read, audit-ledger,
prune or response-header checks below. If the migration was already applied by
that public rollout, verify its checksum and database objects instead of
executing it a second time.

1. Approve the purpose matrix, legal basis, three-language notice, processors,
   cross-border map, fixed TTLs and rights/deletion runbook.
2. Approve a header-capable Admin delivery path.
3. Apply and test the migration in staging. **Done manually; migration-history
   reconciliation remains open. V5, ACL, k-suppression and the transactional
   data-quality hold passed.**
4. Deploy both Admin Edge Functions and the updated public Inquiry handler in
   staging with handler-side Auth verification and
   `ADMIN_API_ENABLED=false`. **Done. Wrong/missing Origin returns 403; the
   exact temporary verification Origin returns 503 while disabled. The public
   Inquiry handler was exercised, then returned to
   `INQUIRY_ACCEPTING_SUBMISSIONS=false`.**
5. Create the named administrator account and verify TOTP. **Invitation sent;
   password and TOTP are still pending.**
6. Configure the exact origin and UUID allow-list. **A non-routable temporary
   verification Origin is configured in Staging and the pending user's UUID
   remains allowlisted. Replace it only after the owner completes password and
   TOTP setup; do not point live visitors at Staging.**
7. Set `ADMIN_API_ENABLED=true` in staging. **Not done; keep false until the
   owner completes password/TOTP and the remaining gates pass.**
8. Pass every authentication, response-contract, suppression, deletion and
   no-PII test below, including the Admin access-ledger write and 30-day prune.
9. In production, either repeat the reviewed migration/function process or,
   when the public attribution rollout already applied the same checksum,
   verify the existing objects and deploy only the reviewed Admin function
   build. Keep the production kill switch false.
10. Configure the four public repository variables and publish the static
    route.
11. Verify production response headers and authentication while the Admin API
    is still disabled.
12. Set `ADMIN_API_ENABLED=true`, perform a read-only smoke test, then record
    the activation evidence and owner.

## Required acceptance checks

- no login -> both GETs rejected;
- valid login at `aal1` -> both GETs rejected;
- `aal2` but UUID not allowed -> both GETs rejected;
- allowed UUID at `aal2` -> only the two fixed GETs succeed;
- wrong/missing Origin -> no usable CORS response;
- missing/false kill switch -> no Auth or database read;
- every success and error response uses `Cache-Control: no-store` and
  `Pragma: no-cache`;
- page bundle contains no secret/service-role key, monitor secret,
  administrator UUID or enquiry data;
- response contains no ID, public reference, contact, country, budget,
  free text, UTM, entry path, IP, User-Agent, query or referrer; only the
  fixed `sourceGuide` slug and a count of at least five may appear in the
  auxiliary attribution list;
- all eight metric compatibility sets distinguish `Unknown` from
  `Not applicable`;
- a compatibility denominator below five is not displayed exactly;
- sparse mutually exclusive categories use complementary suppression;
- authorized reads create only the fixed, body-free Admin access record and
  its daily prune removes rows older than 30 days;
- percentages remain hidden below 20 compatible records;
- multi-select percentages explain that their sum can exceed 100%;
- Data Quality Hold hides distributions without altering source rows;
- production write health remains `not_directly_verified` unless a real,
  non-persistent production probe exists;
- provider accepted is never described as delivered, read or replied;
- 320 px, keyboard, visible focus, live errors and 44 px targets pass;
- logout and 15 minutes without administrator activity clear the tab session
  and all displayed responses.

## Maintaining the guide-source allow-list

The privacy-preserving source list is intentionally duplicated at three
enforcement layers:

- the database aggregate RPC in a versioned migration;
- `supabase/functions/_shared/admin-contracts.ts`;
- `lib/adminClient.ts`.

Adding a guide to the editorial registry does not automatically add it to
Admin attribution. A future guide requires a new reviewed SQL migration plus
matching Edge/client allow-lists and tests at all three layers. Until then its
source may be retained on a saved `2026-07-25.1` enquiry but must not appear in
the aggregate response.

The 90-day view begins with saved enquiries using form version
`2026-07-25.1`; older `2026-07-21.1` enquiries are not retroactively counted.
The label must remain “提交时携带的文章入口（辅助归因）”, not “文章带来的咨询”. It is a browser-supplied, allowlisted auxiliary signal and can still be affected by repeated, test, or abusive submissions, so it must not be used alone for a business decision.

## Known residual: differences between two refreshes

The server suppresses sparse values and an additional complement within each
single response. That prevents direct subtraction inside that response. It
does not make a live aggregate anonymous and cannot prevent an authorized
administrator from comparing two responses taken at different times. A new
or deleted submission can change several exact visible counts, allowing a
small change to be inferred.

For V1:

- the page has no automatic polling and disables refresh while either request
  is in flight;
- production activation permits only one named administrator after MFA
  protection and the server UUID allow-list have both been verified;
- all aggregates remain restricted data, even when every visible bucket is
  above five;
- the administrator must not align before/after changes with notification
  timestamps to reconstruct an individual submission;
- successful reads must be reviewable through the 30-day Admin access ledger.

If access expands beyond the single trusted owner, or anyone wants to describe
the output as anonymous, stop and redesign it around delayed batch releases,
coarser windows, query budgeting, or a reviewed differential-privacy method.
Do not claim that `k<5` suppression alone prevents cross-time differencing.

## Emergency disable

Use the narrowest reversible control:

1. set `ADMIN_API_ENABLED=false`;
2. verify both business GETs return the disabled response without an Auth/RPC
   call;
3. if an account may be compromised, also disable that Auth user and remove
   its UUID from the allow-list;
4. revoke/rotate credentials only when their exposure is plausible;
5. do not delete enquiries or operational evidence to hide an incident.

The static `/admin/` HTML can remain reachable while disabled; it contains no
business data and must display a failure state rather than cached results.

## Local invite page troubleshooting

If `/admin/accept-invite/` remains indefinitely on `正在准备安全账户设置……`,
do not assume the invitation is invalid. That text is the server-rendered
initial state and normally disappears after hydration.

1. Check that every script referenced by the page under `/_next/static/`
   returns 200. A page response of 200 alone is insufficient.
2. If core chunks return 404, stop the local development server, move the
   generated `.next` directory aside, and restart the server with the same
   Staging public configuration.
3. Verify a token-free diagnostic visit leaves the preparing state and shows
   the missing-invitation state.
4. Only then ask the owner to refresh the original invitation tab. If its URL
   fragment was preserved, the invitation can still be consumed; if it was
   replaced or scrubbed, open the newest invitation email again.

Never copy or log the invitation URL while diagnosing this condition. The URL
fragment contains temporary credentials even when the page failed to hydrate.
The invite page's skip control must focus the main element without changing
`location.hash`; an ordinary `href="#..."` skip link can overwrite an
unconsumed implicit-flow fragment before hydration.
