# Private-tour selection backend release — 2026-09-05

Status at this checkpoint: **BACKEND DEPLOYED; FRONTEND PENDING**

Record date: **2026-09-05 (Asia/Seoul)**. Runtime source: `89215df09dc0472fb81ca87f90cc8cc106c65910`.

This dated record captures the completed backend steps before frontend release.
At this checkpoint, [PR #125](https://github.com/yangchunxuan/travel-china-with-xuan/pull/125)
had not been merged and the frontend had not been deployed. For subsequent
status, read the PR's actual merge SHA, the corresponding automatic
[Pages deployment](https://github.com/yangchunxuan/travel-china-with-xuan/actions/workflows/deploy.yml)
and the latest dated final release record linked from the
[release index](./README.md). This checkpoint does not assert future completion.

## Completed backend steps

| Step | Observed result |
|---|---|
| Production preflight | 11 existing RPC signatures and privileges checked; service role can execute, anon and authenticated cannot. All three traffic wrappers already exist. |
| `notify-inquiries` | Updated worker deployed through the Supabase dashboard before the SQL change. |
| Selection SQL | `202609050001_homeground_private_tour_selection.sql` executed individually in the dashboard; execution returned success. |
| SQL read-back | Original 13-parameter signature and security-definer search path retained; selection validation, exact selection construction and the forest tour are present. Execution remains service-role-only. |
| `v1-inquiries` | Updated intake deployed through the dashboard after the SQL change. All eight editor source files matched the prepared source before deployment; the legacy JWT verification switch remained false. |

The backed-up production homepage function accepted email-only requests and
required empty attribution. This release adds canonical product identity and
optional validated package/2-or-4-person selection; it is not merely an update
to a previously deployed product allowlist. The old email checks, underlying
atomic inquiry call, idempotency and rate-limit parameters, and the scoped
created/replay update remain unchanged except for the validated answers.

Migration SHA-256:
`d8069f8e78bd8553c94011f36372084e013a386e607a672e2b7ed9410b1bdee2`.

The SQL was run directly in the dashboard. There was no bulk migration push
and no registration of this change in migration history. Before a later
migration operation, compare the deployed function and recorded migration
history and decide how to reconcile them; do not blindly replay this file or
unreviewed earlier migrations.

The intake uses the original base RPC when no usable traffic-session hash is
available, including omitted, null or malformed tokens and a missing optional
hashing secret. A usable hash selects the existing atomic wrapper. A failed or
ambiguous persistence response never triggers a second write through another
RPC. This release deployed no collector, changed no collection switches and
applied no traffic migration. The 2026-08-23 traffic hold remains a historical
observation, not proof that today's wrappers are absent.

## Validation and remaining evidence

- Local complete inquiry suite: 754/754 passed; TypeScript checking passed.
- Local focused compatibility/backend/traffic tests: 119/119 passed. Real
  handlers ran with simulated network responses, including exact SQL argument
  signatures and one-call behavior on uncertain failures.
- Local SQL harness: 114 checks passed. This used a stubbed base inquiry
  function and does not prove production persistence or notification delivery.
- No production inquiry was submitted for this checkpoint. Notification
  receipt, production replay/conflict behavior and GA/Meta ingestion were not
  tested and must not be inferred from successful deployment.
- Frontend merge, successful automatic Pages deployment and localized live
  checks remain pending at this recorded point. A later final record should
  report those results with their actual merge SHA and deployment run.

Keep the updated notification worker if the frontend is rolled back: queued
jobs containing selections must remain readable. Do not rewrite existing
inquiries to infer product selections.
