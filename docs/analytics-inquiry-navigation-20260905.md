# Inquiry navigation measurement — 2026-09-05

Status: local implementation and mocked runtime verification; not a production
release or account-setting change.

The former query/fragment gate suppressed GA events after ordinary product and
service links opened the homepage contact section. The GA gate now recognizes
only these public navigation choices on `/`, `/zh/` and `/ko/`:

- `tour`: an existing private-tour inquiry slug.
- `package` and `travelers`: both present, validated for the selected tour by
  `getPrivateTourInquirySelection`; only the published 2/4-person choices.
- `service`: an existing route-service ID.
- `planner`: `destinations`, `nights`, `party`, `pace` or `result`.
- Fragment: empty, `#planner-contact`, `#route-finder` or `#planner-handoff`.

Unknown keys, duplicate keys, invalid choices, incomplete package selections,
free-text searches and other fragments remain ineligible. Existing attribution
cleanup still runs before scripts load; navigation choices remain in the
browser URL so the inquiry UI can read them.

Guide CTA events add only `cta_target: private_tour | planner | other`. The
classifier checks local page paths and the existing tour slug allowlist. It
never sends the destination link or its query values, and the event sanitizer
rejects values outside those three categories.

GA defaults and explicit events receive only the sanitized current pathname
with origin as `page_location`, and the referring origin as `page_referrer`.
External measurement-script requests use `no-referrer`. These URL choices are
not automatically copied into event parameters.

Meta still requires query- and fragment-free current and referring URLs. Its
Pixel reads those browser values directly, so the GA allowance does not extend
to Meta. Automatic Meta history page views and automatic configuration remain
disabled. Consent, provider IDs, the master switch and the first-party collector
gate are unchanged. The existing consent module does not implement a separate
GPC/DNT policy; this change adds no such claim.

Page views remain independent per sink. Changing public planner state, cleaning
UTMs, or temporarily visiting private query state on the same pathname does not
create a second page view. A new pathname resets the prior page, including when
measurement is blocked on that new page. Consent withdrawal/re-grant retains its
existing independent reset behavior.

History subscribers keep the privacy shutdown synchronous, then coalesce their
React-facing change notifications into a microtask. This avoids scheduling a
state update inside Next's history insertion effect; unsubscribe cancels queued
notifications. Fresh browser navigation was checked without the earlier React
warning.

`contact_option_clicked` remains a click event. `enquiry_submitted` remains a
separate event; the homepage email form and planner handoff call it only after a
successful response with `state: submitted` and a non-empty public reference.
The reference itself is not sent to analytics. No real inquiry or measurement
request was sent during verification.

Focused verification: `analytics-runtime-behavior`,
`analytics-privacy-consistency` and `navigation-analytics-static` — 37 passed,
0 failed. Runtime vendor queues and collector requests are simulated. A
disabled collector endpoint remains disabled; these results do not prove GA
ingestion, Meta conversion visibility or activation of first-party reporting.
