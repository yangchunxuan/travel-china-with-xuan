# Homeground private saved-inquiry insights

Status: deployed only to an independent Supabase Staging project and kept
fail-closed. Production has not been changed. The Staging database objects and
two Edge Functions exist, but the administrator has not completed password
setup or TOTP, the Admin API remains disabled, public Inquiry submissions
remain disabled, and no production hosting/security-header gate has passed.

The approved product boundary is:

- one authenticated page at `/admin/`;
- one 90-day aggregate response;
- one operational-health response;
- no individual enquiry, contact detail, public reference, free text, budget,
  country, visitor event, platform metric, source attribution, CRM field,
  search, export or write action.

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

Eleven migrations were applied in timestamp order through the Staging SQL
Editor and the expected objects, forced RLS, grants, fixed RPCs, contracts and
cron definitions were inspected there. Because this was a manual console
deployment, Supabase migration-history metadata was not populated; do not run
an automatic `db push` against Staging until that history gap is deliberately
reconciled. The two Admin functions are deployed. Negative endpoint checks
return 403 for a wrong or missing Origin and 503 for the allowed local Origin
while `ADMIN_API_ENABLED=false`.

Source verification currently passes TypeScript, 115/115 contract and Admin
tests, the production build, dependency audit, font coverage and desktop/320
px browser checks. The local invite page is available while the owner finishes
the one-time setup; this is not evidence of production activation.

## Data flow

```text
/admin/ static page
  -> Supabase Auth: password login and TOTP challenge
  -> user JWT with aal2
  -> GET admin-health / GET admin-insights
  -> exact-Origin and disabled-state checks
  -> server getUser verification + JWT claim checks + UUID allow-list
  -> service-only fixed RPC
  -> aggregate JSON with no individual enquiry data
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

- `homeground-admin-insights.v1`;
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
form/privacy version (`2026-07-21.1`). If a static-site rollout requires an
overlap for pages that were already open, record the owner and end time before
temporarily adding the matching older pairs. Remove them when that bounded
window closes. The older RPCs remain in source for controlled transition and
idempotent compatibility; that is not permission to accept new attributed
legacy submissions indefinitely.

For a normal CLI-managed environment, apply migrations in timestamp order,
then deploy:

```bash
supabase db push
supabase functions deploy admin-insights
supabase functions deploy admin-health
```

The current Staging project signs Auth JWTs with an asymmetric key. Its legacy
gateway `Verify JWT with legacy secret` switch is therefore disabled for both
Admin functions, while each handler still performs its own Supabase Auth
`getUser` verification, token-claim/lifetime checks, `aal2` requirement and
server-side UUID allow-list before any RPC. This is not an unauthenticated
business API. A later CLI deployment can change the gateway setting, so verify
the setting and repeat all negative authorization tests after every deploy.
Never disable handler-side verification or rely only on CORS.

For this particular Staging project, the eleven migrations were applied
manually and no migration ledger was created. Reconcile that ledger before
using `supabase db push`; do not mark migrations as applied without matching
the actual database definitions.

During console validation a Staging-only legacy credential surfaced in tool
output. It was not copied into source or documentation. The legacy anon and
service-role API keys were disabled, the previous legacy signing key was
revoked, and the unused temporary secret key created during remediation was
deleted. Current hosted publishable/secret-key dictionaries are preferred.
Production credentials and configuration were not changed.

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

1. Approve the purpose matrix, legal basis, three-language notice, processors,
   cross-border map, fixed TTLs and rights/deletion runbook.
2. Approve a header-capable Admin delivery path.
3. Apply and test the migration in staging. **Done manually; migration-history
   reconciliation remains open.**
4. Deploy both Edge Functions in staging with handler-side Auth verification
   and `ADMIN_API_ENABLED=false`. **Done and negative checks passed.**
5. Create the named administrator account and verify TOTP. **Invitation sent;
   password and TOTP are still pending.**
6. Configure the exact origin and UUID allow-list. **Local exact origin and the
   pending user's UUID are configured.**
7. Set `ADMIN_API_ENABLED=true` in staging. **Not done; keep false until the
   owner completes password/TOTP and the remaining gates pass.**
8. Pass every authentication, response-contract, suppression, deletion and
   no-PII test below, including the Admin access-ledger write and 30-day prune.
9. Repeat the reviewed migration/function process in production while the
   production kill switch remains false.
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
  free text, UTM, IP, User-Agent, query or referrer;
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
- there is one named, MFA-protected, UUID-allowlisted administrator;
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
