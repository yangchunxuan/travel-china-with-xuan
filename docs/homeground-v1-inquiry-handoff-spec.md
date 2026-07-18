# Homeground V1 Inquiry Handoff — Product & Technical Spec

Version: 2026-07-18.2
Status: Pilot implemented and production launch configuration verified
Primary market: English-speaking long-haul China travellers
Supported locales: English (`en`), Simplified Chinese (`zh`), Korean (`ko`)
Related decision plan: `docs/homeground-validation-and-city-constraints-plan.md`

> ## 2026-07-18 Pilot implementation delta（先读这一段）
>
> 本文件保留完整产品研究与长期设计，不删除原章节。当前代码已经从“只生成外部邮件草稿”升级为真实 Inquiry：路线结果 → 三语表单 → 服务端复算与校验 → 事务保存 → outbox → 共享品牌邮箱 → 人工回复。只有服务端确认保存后，页面才显示参考号和成功状态。
>
> 为了让首版真正可用且避免再造一套没人操作的 CRM，当前 Pilot 对第 3.1、19、20 节的数据模型与人工工作台设计作以下明确替代：
>
> - 共享品牌邮箱是人工处理的唯一工作台；`New → Claimed → Replied → Closed` 使用邮箱标签，不在数据库里维护一套假同步状态。
> - 通知邮件包含处理咨询所需的联系方式、路线和选填说明；Email 咨询设置旅客为 `Reply-To`，工作人员从共享邮箱直接回复。原“通知不得含 PII、只链接受保护 ops 详情页”的方案暂不执行。
> - 数据库只承担可靠接收、幂等、防滥用与事务 outbox；自定义 operator queue、详情后台、分配字段、qualification、duplicate review、内部状态 mutation 和 inquiry audit UI 暂不实施。
> - WhatsApp 联系方式默认关闭，只有号码归属、设备、值班人与真实收发测试全部通过后才开启。
> - 隐私页只有在 controller、provider/region、retention、删除方式和品牌联系方式补齐后才发布；这些内容现已补齐并通过三语检查。
>
> 品牌邮箱、Supabase、邮件服务、调度密钥、隐私事实、回复时效与真实收件演练已经完成，Inquiry 开关可随正式网站发布启用。若未来咨询量证明共享邮箱不够用，再以真实操作数据决定是否恢复第 19/20 节的受保护队列，而不是预先搭建孤岛。

## 1. Outcome

V1 solves one complete user problem:

> After receiving a starting route, a traveller can send that exact route to Homeground through one reliable inquiry flow, see whether it was received, and understand what happens next.

The release is successful only when all of the following work together:

```text
route result
  → correct result-state CTA
  → one Inquiry form
  → server-side validation and persistence
  → Homeground notification
  → visible success or recoverable failure
  → human follow-up and status tracking
```

This is an atomic release. The frontend CTA must not ship before the API, persistence, notification, privacy notice, brand mailbox and operational response process are ready.

## 2. Product principles

1. Give the route before asking for contact details.
2. Preserve the existing four-question route finder.
3. Ask only for one reply channel and one optional context note.
4. Keep one Inquiry object even when the traveller chooses WhatsApp.
5. Never describe an Inquiry as a booking, quote, confirmed itinerary or transport-checked route.
6. Do not create a normal-state second contact funnel through `mailto:`, a floating chat widget or a direct WhatsApp button. A short brand-email `mailto:` is allowed only after definitive non-persistence or during an explicit rollback.
7. A saved Inquiry and an internal notification are different states.
8. Client analytics clicks are not successful leads.
9. English, Chinese and Korean use the same state machine and data contract.
10. No personal data enters the URL, route storage, GA or ordinary application logs.

## 3. Scope

### 3.1 Included in V1

- Keep the current four questions and deterministic route rules unchanged.
- Replace the result-only long `mailto:` handoff with one inline Inquiry form.
- Correct Header, Studio and Final CTA behavior after a result exists.
- Add Email / WhatsApp as conditional reply methods inside the same form.
- Add one optional open-text context field.
- Add client-side and server-side validation.
- Add a separate serverless Inquiry API to the current static site.
- Persist the Inquiry and a canonical server-generated route snapshot.
- Add a transactional notification outbox and brand mailbox notification.
- Add success, validation, retry and failure states.
- Add minimal operator status updates and an audit history.
- Add localized UI, errors, success states and privacy copy for all three locales.
- Add a Privacy Notice, analytics consent control and permanent footer access.
- Remove or unpublish the old personal-brand Visa page before release.
- Replace the personal Gmail address with a brand-owned mailbox.

### 3.2 Explicitly excluded from V1

- Structured city selection or city autocomplete.
- Parsing places from the optional note.
- “Already included / not included” city feedback.
- Automatic route recalculation from the note.
- Direct Inquiry before completing the four questions.
- Shareable result URLs or cross-device route recovery.
- AI chat, Codex SDK, Tawk or a floating chat widget.
- Public Inquiry status lookup.
- A custom CRM or polished internal dashboard.
- Pricing, quote calculation, contracts, payments or accounts.
- Appointment scheduling.
- Automatic WhatsApp messages.
- PDF itinerary generation.
- New route cities, route families or transport feasibility rules.
- A/B tests or `experiment_subject_id`.
- New homepage sections, city galleries, maps, testimonials or team portraits.
- Visual redesign, new photography or font changes.
- Lab page redesign or unrelated legacy refactoring.

## 4. Current baseline that must remain stable

The existing product has:

- four questions: party, travel style, hotel nights and pace;
- 300 possible answer combinations;
- approximately 28 route shapes;
- 9 supported cities;
- deterministic `route_id` and `rule_version`;
- route result, reasons, trade-off, assumptions and answer editing;
- non-PII route progress in `sessionStorage`;
- English, Chinese and Korean pages.

V1 must not change:

- answer IDs;
- question order;
- scoring or route family selection;
- city allocation;
- current `route_id` values;
- current `rule_version`;
- the meaning of any route result.

If a route rule changes during implementation, that work becomes a separate release and must increment `rule_version`.

## 5. User journey

The page owns two state machines.

```text
PlannerStatus
  new → in-progress → result

HandoffStatus
  mount + handoff flag off → disabled
  mount + handoff flag on → idle
  idle → editing → submitting → success
             ↘ validation-error → editing
  submitting → failed → editing | submitting
  submitting → uncertain → submitting
  success + route revision → idle
```

`HandoffStatus` is ignored until `PlannerStatus=result`. Every transition above is explicit; there is no separate unhandled `route_result`, `handoff_ready` or `handoff_editing` page state.

`disabled` is a release/rollback initialization state. It renders a stable fallback container rather than the Inquiry form. The handoff flag is fixed for the current document lifetime: a rollback affects new page loads but must not overwrite an existing `submitting`, `uncertain`, `rate_limited` or `success` state. Existing uncertain requests keep their same-key recovery path; existing success confirmations remain visible.

### 5.1 Result content order

The result DOM and visual order must be:

1. result kicker, title and summary;
2. city and night allocation;
3. total nights and between-city moves;
4. reasons and the main trade-off;
5. service boundary statement;
6. Planner Handoff;
7. detailed assumptions;
8. answer review and edit controls;
9. restart.

On mobile, the beginning of Planner Handoff must appear no more than one current viewport after the end of the route summary and trade-off.

### 5.2 Service boundary before contact

The user must see this meaning before opening or submitting the form:

> This is a starting route. Dates, airports, seasonal transport and specific services have not yet been checked or booked.

No nearby copy may claim the route is already “feasible”, “transport checked” or ready to book.

## 6. Page and CTA state contract

| Composite state | Header, Studio and Final primary CTA | Target |
|---|---|---|
| `PlannerStatus=new` | Find my starting route | `#route-finder` |
| `PlannerStatus=in-progress` | Continue my route | `#route-finder` |
| `result + idle|editing` | `globalHandoffReadyCta`: Ask a planner to review this route | `#planner-handoff` |
| `result + validation-error` | `globalValidationErrorCta`: Finish my planner request | `#planner-handoff` |
| `result + submitting` | `globalSubmittingCta`: Sending request… | `#planner-handoff` |
| `result + failed` | `globalFailedCta`: Return to my request | `#planner-handoff` |
| `result + uncertain` | `globalUncertainCta`: View request status | `#planner-handoff` |
| `result + success` | `globalSuccessCta`: View request confirmation | `#planner-handoff` |
| `result + disabled` | `globalDisabledCta`: Contact Homeground | `#planner-handoff` |

Rules:

- All result-state primary CTAs target the same `#planner-handoff`.
- Result-state primary CTAs never target `#route-finder`.
- Global CTAs are navigation controls: they scroll to `#planner-handoff` and focus its current heading; they never submit, retry or check status by themselves.
- `Edit answers` and `Start again` remain secondary actions.
- Activating a CTA scrolls the handoff into view and focuses its heading, not the first input.
- There is exactly one `PlannerHandoff` instance on the page.
- Editing any form field changes `validation-error` or `failed` back to `editing`.
- Retry from `failed` or `uncertain` changes to `submitting`.
- In `disabled`, keep a visible `<section id="planner-handoff">` containing the service boundary, short route reference and brand Email fallback; do not remove the anchor.

## 7. Component contract

### 7.1 `HomegroundHomePage`

Responsibilities:

- own the current `PlannerStatus`;
- receive the current answers and `RouteMatch`;
- own the current `HandoffStatus`;
- derive the global CTA label and target;
- mount one `PlannerHandoff`;
- coordinate route revision after an Inquiry was submitted.

It must not:

- construct API payloads itself;
- render a second form;
- own PII outside the handoff state.

### 7.2 `RouteFinder`

Responsibilities:

- keep the four questions;
- generate and edit the route;
- produce:
  - answers;
  - `route_id`;
  - `rule_version`;
  - `RouteMatch`;
  - `journey_id`;
  - `journey_revision`;
- retain the existing route session behavior.

Changes:

- remove the existing `mailto:` contact aside;
- remove `buildPlannerMailto` from the active result path;
- render `resultCardCta`: `Continue to planner request` after the service boundary;
- make `resultCardCta` target `#planner-handoff` and focus the handoff heading;
- when the handoff is `disabled`, use `globalDisabledCta` in the result card instead;
- expose route state to `HomegroundHomePage`.

It must not:

- collect contact details;
- submit Inquiry data;
- generate a trusted route snapshot for persistence.

### 7.3 `PlannerHandoff`

Responsibilities:

- render the only Inquiry form;
- own unsent contact and note values in React memory;
- choose Email or WhatsApp;
- validate fields;
- generate and retain an idempotency key;
- send the request;
- map API error codes to localized messages;
- show submitting, success, failure and uncertain states;
- expose `HandoffStatus` to the page.

### 7.4 `InquiryStatus`

Responsibilities:

- announce submitting, success, failure and uncertain states;
- focus the success heading after the form is replaced by confirmation;
- focus the failure or uncertain-status heading after a failed request;
- display the public Inquiry reference;
- display the configured reply SLA;
- provide a safe retry path;
- provide the brand mailbox fallback only after a genuine failure.
- make `backToRoute` target `#route-result` and focus the route-result heading without changing route or form state.

## 8. Form specification

### 8.1 Structure

The form contains exactly:

1. reply method — required;
2. conditional contact value — required;
3. optional context note;
4. what-happens-next explanation;
5. privacy explanation and link;
6. final Submit.

No name, budget, dates, airports, group size or hotel-standard field is added in V1.

### 8.2 Reply method

Use native:

```html
<fieldset>
  <legend>How should we reply?</legend>
  <!-- Email and WhatsApp radio inputs -->
</fieldset>
```

Rules:

- Email is selected by default.
- Selecting Email shows only the Email field.
- Selecting WhatsApp shows only the WhatsApp field.
- The hidden channel field is not validated or submitted.
- Switching methods may retain the other value in current React memory, but only the selected channel enters the payload.
- WhatsApp is controlled by a release flag. If real end-to-end testing is incomplete, the WhatsApp option is hidden and Email is the only method.

### 8.3 Email

- `type="email"`
- `autocomplete="email"`
- maximum 254 characters
- visible label and hint
- validate on blur and Submit

### 8.4 WhatsApp

- `type="tel"`
- `autocomplete="tel"`
- visible hint to include the international country code
- normalize server-side to E.164
- allowed format after normalization: `+[1-9][0-9]{7,14}`
- submit the traveller-entered value as `phoneRaw`; do not label unnormalized client input as E.164
- never trigger automatic outbound WhatsApp in V1

### 8.5 Optional note

- `<textarea>`
- maximum 2,000 Unicode characters
- visible `(optional)` label
- no HTML
- reject control characters other than ordinary line breaks and tabs
- do not parse places or health information
- hint asks only for functional travel needs, not medical diagnosis

After the user enters a note, show:

> This note will be attached for planner review. It has not changed the starting route.

### 8.6 Submit behavior

- Submit remains enabled in the normal editing state.
- On Submit, validate all visible required fields.
- If invalid, focus the error summary.
- If valid, move to `handoff_submitting`, set `aria-busy="true"` and prevent duplicate actions.
- The visible button label changes to the localized “Sending…” text.
- Duplicate protection must rely on server idempotency, not only the disabled/busy client control.

## 9. Route revision and form lifecycle

### 9.1 Before successful submission

- Editing answers keeps Email, WhatsApp and note in current React memory.
- The pending payload always uses the latest route revision.
- Any payload change after a definitive validation or failure response generates a new idempotency key and returns the handoff to `editing`.
- A network timeout or uncertain request reuses the same key while the payload is unchanged.

### 9.2 During submission

- Temporarily block `Edit answers` and `Start again`.
- Do not allow a route revision to race with the request snapshot.
- Announce that the request is being sent.

### 9.3 After an uncertain response

While `HandoffStatus=uncertain`:

- lock reply method, contact value, note, locale change, `Edit answers` and `Start again`;
- retain the exact serialized request snapshot, canonical payload hash and idempotency key used for the dispatched request;
- make `Check and try again` the only action that can submit;
- resend that exact snapshot with the same key;
- do not expose an Email or WhatsApp fallback that could create a second conversation;
- do not offer a create-new-request action in V1.

The controls unlock only after the same-key retry returns the original/new success response or a trustworthy API envelope proves non-persistence. Closing or leaving the page may lose this in-memory recovery state, so the uncertain-state warning must say to retry before leaving.

### 9.4 After successful submission

- Store the submitted `route_id`, `rule_version`, answers and `journey_revision` in the success state.
- If the user edits the route afterward, show:

  > Your earlier request was sent with the previous route. These changes have not been sent.

- The revised route receives a fresh handoff state.
- A later explicit submission creates a new `inquiry_id`.
- V1 does not accept a client-supplied previous-Inquiry relationship. A second Inquiry is independent and can be reconciled by staff if needed.
- Never silently update an already submitted Inquiry.

### 9.5 Restart

`Start again` clears:

- route answers and route session;
- unsent Email and WhatsApp values;
- unsent note;
- idempotency key;
- handoff status.

It does not delete an Inquiry already stored on the server.

### 9.6 Language change with dirty form

PII must not be written to `sessionStorage` or `localStorage`.

If the form contains unsent contact details or a note, changing language must:

- show a localized leave confirmation; or
- preserve the form only in in-memory navigation state.

The implementation must not silently lose dirty form data.

## 10. Canonical English copy

### 10.1 Entry and boundary

| Key | English |
|---|---|
| `resultCardCta` | Continue to planner request |
| `globalHandoffReadyCta` | Ask a planner to review this route |
| `globalValidationErrorCta` | Finish my planner request |
| `globalSubmittingCta` | Sending request… |
| `globalFailedCta` | Return to my request |
| `globalUncertainCta` | View request status |
| `globalSuccessCta` | View request confirmation |
| `globalDisabledCta` | Contact Homeground |
| `handoffEyebrow` | Personal planning |
| `handoffTitle` | Want us to make this route work for your trip? |
| `handoffBody` | Your route and four answers will be included, so you won’t need to explain them again. |
| `scopeBoundary` | This is a starting route. Dates, airports, seasonal transport and specific services have not yet been checked or booked. |

### 10.2 Fields

| Key | English |
|---|---|
| `contactLegend` | How should we reply? |
| `emailOption` | Email |
| `whatsappOption` | WhatsApp |
| `emailLabel` | Email address |
| `emailHint` | We’ll only use this address to reply to this request. |
| `whatsappLabel` | WhatsApp number, including country code |
| `whatsappHint` | For example, +44 7700 900123. We’ll only use it to reply to this request. |
| `noteLabel` | Anything this route should respect? (optional) |
| `noteHint` | Fixed places, flights already booked, places you have visited, walking needs, or anything else. Please do not include medical records. |
| `noteAttached` | This note will be attached for planner review. It has not changed the starting route. |

### 10.3 Process and privacy

| Key | English |
|---|---|
| `nextTitle` | What happens next |
| `nextBody` | We’ll first confirm your dates, arrival and departure points, walking needs and anything that cannot change. Detailed planning and pricing come after that conversation. |
| `privacyBody` | By sending this request, you agree that Homeground may use these details to reply to this enquiry. We will not use them for marketing without separate permission. |
| `privacyLink` | Read our Privacy Notice |
| `serviceBoundary` | Sending this request is not a booking. Homeground plans the journey and coordinates local delivery. Before anything is confirmed, we’ll make clear who is responsible for each service. |

### 10.4 Submit and status

| Key | English |
|---|---|
| `submit` | Send this route to a planner |
| `submitting` | Sending your request… |
| `successTitle` | Your request is with Homeground. |
| `successBody` | We’ve saved your route, answers and contact details. |
| `successReference` | Request reference: {publicReference} |
| `successReplyEmail` | We’ll reply by email within {replySla}. Nothing has been booked. |
| `successReplyWhatsapp` | We’ll reply on WhatsApp within {replySla}. Nothing has been booked. |
| `backToRoute` | Back to my route |
| `failureTitle` | We couldn’t send your request. |
| `fallbackFailureBody` | Nothing has been lost. Try again, or email {brandEmail} and include route reference {routeReference}. |
| `retry` | Try again |
| `emailFallback` | Email Homeground |
| `disabledTitle` | Planner requests are temporarily unavailable. |
| `disabledBody` | Email {brandEmail} and include route reference {routeReference}. |
| `uncertainTitle` | We couldn’t confirm whether your request arrived. |
| `uncertainBody` | Your details are still here. Try again; we’ll use the same request key so it cannot create a duplicate. |
| `uncertainLeaveWarning` | Retry before leaving this page. If you leave, this browser may no longer be able to check the request. |
| `uncertainRetry` | Check and try again |

### 10.5 Validation

| Key | English |
|---|---|
| `errorSummary` | Check the details below. |
| `contactError` | Choose Email or WhatsApp. |
| `emailError` | Enter a valid email address. |
| `whatsappError` | Enter a WhatsApp number with its country code, for example +44 7700 900123. |
| `noteTooLong` | Keep this note to 2,000 characters or fewer. |
| `requestTooLarge` | This request is too long to send. Shorten the optional note and try again. |
| `technicalError` | We could not process this request. Your details are still here. Try again. |
| `rateLimited` | Too many requests have been sent. Wait {retryAfter} and try again. |
| `routeMismatch` | This route has been updated. Review the refreshed route, then send your request again. |
| `unsupportedRuleVersion` | This route was created with an older rule version. Refresh it, review the updated route and send again. |
| `idempotencyConflict` | This request changed while it was being sent. Review the details and submit it again. |

`{brandEmail}` and Privacy Notice URLs are launch configuration, not translator-owned text.

`replySla` is localized configuration with all three values required, for example:

```json
{
  "en": "one working day",
  "zh": "1 个工作日",
  "ko": "영업일 기준 1일"
}
```

## 11. Localization contract

- All keys in Section 10 must exist in `en`, `zh` and `ko` before public release.
- English is the semantic source, but Chinese and Korean must be rewritten naturally rather than translated word for word.
- Do not use browser-native validation bubbles as the only error UI; they may appear in the wrong language.
- The same request in all three locales sends the same answer IDs and route identifiers.
- Locale changes presentation only; it does not change route logic.
- `<html lang>` must be correct on every route.
- User text must preserve Unicode through API, storage, notification and operator display.
- No text may be embedded into images.
- Long Korean labels and Chinese error summaries must wrap without overflow.

Localized copy is defined in Appendix A.

## 12. Architecture

The current Next.js application uses `output: "export"` and cannot securely persist Inquiry data or hold secrets.

V1 keeps the static frontend and adds one separate serverless API:

```text
Homeground static site
  → HTTPS Inquiry API
  → managed relational database
  → transactional notification outbox
  → brand mailbox
  → authenticated operator status tool
```

Recommended public endpoint:

```text
https://api.homegroundchina.com/v1/inquiries
```

The provider may differ, but the implementation must decide before development:

- provider account owner;
- deployment region;
- database region;
- data controller;
- secret owner;
- notification provider;
- brand mailbox;
- deletion operator.

If a separate serverless API is rejected, the site must first migrate to a server-capable deployment. Browser-only submission is not acceptable.

## 13. Identifier contract

| Object | Identifier | Meaning |
|---|---|---|
| Route | `route_id + rule_version` | A deterministic route shape and rule version; shared by many users |
| Journey | `journey_id` | One anonymous route exploration in one browser session |
| Inquiry | `inquiry_id` | One submitted human-planning request generated by the server |
| Public reference | `public_reference` | A non-secret, user-readable reference for support and operator search |

Rules:

- Generate `journey_id` with `crypto.randomUUID()` when the first result is created.
- Editing answers keeps the same `journey_id` and increments `journey_revision`.
- `journey_id` is not an authentication token.
- `route_id` is not unique per user and cannot be the Inquiry reference.
- The server generates an unpredictable `inquiry_id`.
- The server generates a separate, unique `public_reference` using at least 60 bits of cryptographic randomness, formatted like `HG-7K4M-9Q2P-X6RT`.
- `public_reference` has a unique database index, is safe to read aloud, and grants no access to Inquiry data.
- `experiment_subject_id` is `null` in V1.

The client also derives a non-unique fallback `routeReference`:

```text
{route_id}@{rule_version}
```

Example:

```text
classic-14-standard@2026-07-17.1
```

It is used only when no Inquiry was persisted and the user must contact the brand mailbox. It is not an Inquiry ID, authentication secret or database lookup key.

## 14. API contract

### 14.1 Endpoint

```http
POST /v1/inquiries
OPTIONS /v1/inquiries
```

There is no public `GET /v1/inquiries/:id`.

### 14.2 Headers

```http
Content-Type: application/json
Idempotency-Key: <UUID v4>
```

Maximum request size: 16 KiB.

### 14.3 Request

```json
{
  "schemaVersion": 1,
  "formVersion": "2026-07-18.1",
  "entryPath": "generated_route",
  "locale": "en",
  "journey": {
    "journeyId": "6cf3c986-1713-4bc7-b3dd-2a1f5c00e995",
    "revision": 1,
    "answers": {
      "party": "couple",
      "travelStyle": "classic",
      "nights": "14",
      "pace": "balanced"
    },
    "routeId": "classic-14-standard",
    "ruleVersion": "2026-07-17.1"
  },
  "contact": {
    "channel": "email",
    "email": "traveller@example.com"
  },
  "note": "We have already booked flights into Beijing.",
  "privacyNoticeVersion": "2026-07-18.1",
  "attribution": {
    "landingPath": "/",
    "utmSource": "youtube",
    "utmMedium": "video",
    "utmCampaign": "first-china-trip"
  },
  "experiment": null,
  "antiAbuse": {
    "companyWebsite": ""
  }
}
```

WhatsApp is a discriminated union:

```json
{
  "contact": {
    "channel": "whatsapp",
    "phoneRaw": "+44 7700 900123"
  }
}
```

Email and `phoneRaw` cannot be submitted together. The API parses `phoneRaw` and stores only the normalized E.164 value.

### 14.4 Success

New Inquiry:

```http
201 Created
```

```json
{
  "inquiryId": "019c8f2e-7e8d-7d91-9dfa-99fb81270d6a",
  "publicReference": "HG-7K4M-9Q2P-X6RT",
  "state": "submitted",
  "receivedAt": "2026-07-18T10:21:33.410Z",
  "duplicate": false,
  "requestId": "req_01..."
}
```

Idempotent replay:

```http
200 OK
```

It returns the same `inquiryId` with `duplicate: true` and does not send a second notification.

### 14.5 Error envelope

```json
{
  "error": {
    "code": "validation_failed",
    "retryable": false,
    "persistenceState": "not_persisted",
    "fieldErrors": {
      "contact.email": "invalid"
    },
    "requestId": "req_01..."
  }
}
```

The client maps codes to localized text and never displays raw server messages.

`persistenceState` is part of the recovery contract:

- `not_persisted` means the API transaction did not commit and an Email fallback cannot duplicate a saved Inquiry;
- `unknown` is never inferred from a status code; it is the browser state used when no trustworthy API envelope arrived after dispatch;
- an API response must not claim `not_persisted` after its Inquiry transaction commits.

| Status | Meaning | Client behavior |
|---|---|---|
| `400` | Malformed JSON | Generic failure; retain values |
| `413` | Request over 16 KiB | Localized size error |
| `415` | Wrong content type | Generic failure |
| `422` | Field validation | Error summary and linked field errors |
| `409 idempotency_conflict` | Same key with a different canonical payload | Retain values; discard the conflicting key only after explicit review; do not refresh the route automatically |
| `409 route_mismatch` | Client route ID does not match the server result | Retain contact and note; refresh/recompute route context; require explicit resubmit with a new key |
| `409 unsupported_rule_version` | API no longer supports the submitted rule version | Retain contact and note; refresh to a supported route; require review and a new key |
| `429` | Rate limit | Retain values; show retry time |
| `503` | Persistence unavailable | Retain values; retry with the same key |

## 15. Server validation and canonical route

The API rejects unknown fields and only accepts:

- locale: `en | zh | ko`;
- party: `couple | family | parents | friends | solo`;
- travel style: `classic | landscape | food | slow | unsure`;
- nights: `7 | 10 | 14 | 18`;
- pace: `gentle | balanced | full`;
- `entryPath: generated_route`;
- a current allowed Privacy Notice version;
- `experiment: null`;
- empty honeypot.

Additional rules:

- Email: valid format, maximum 254 characters.
- WhatsApp `phoneRaw`: maximum 64 characters; parse common spaces, hyphens and parentheses with a maintained phone-number parser, require an explicit country code, and reject ambiguous or impossible numbers.
- Stored WhatsApp value: normalized E.164 `+[1-9][0-9]{7,14}`.
- Note: optional, maximum 2,000 Unicode characters.
- Each UTM value: maximum 100 characters.
- Do not store a full referrer URL.
- Reject unknown structured-city properties.

The browser does not submit a trusted route snapshot.

The API must:

1. validate answer IDs;
2. load the requested supported `rule_version`;
3. run the same pure route rules on the server;
4. compare the computed route ID with the client route ID;
5. return `409 route_mismatch` on disagreement;
6. save the server-generated canonical snapshot.

The canonical snapshot contains:

- route ID and rule version;
- route family and profile;
- answer IDs;
- city IDs and nights;
- total nights and between-city moves;
- title, reasons, trade-off and assumptions as submitted in the selected locale.

The route rules must be one shared, versioned TypeScript source or package. The frontend and API must not maintain independent copies.

Rule releases use:

1. API supports old and new versions;
2. static frontend publishes the new version;
3. old support is removed only after an agreed buffer period.

## 16. Idempotency and transaction

The browser creates one UUID v4 idempotency key for a normalized payload.

The server stores:

- a hash of the idempotency key;
- a normalized payload hash;
- the generated Inquiry ID.

The normalized payload hash is deterministic:

1. Validate all fields and reject unknown fields.
2. Normalize all strings to Unicode NFC and line endings to `\n`.
3. Trim surrounding whitespace from Email, phone and UTM fields.
4. For Email, preserve the local part and lowercase/IDNA-normalize the domain.
5. Parse `phoneRaw` and replace it with the canonical E.164 value.
6. Trim only the outer whitespace of `note`; preserve interior spacing.
7. Build a fixed-field object containing schema/form/privacy versions, entry path, locale, journey revision, answers, route/rule IDs, selected normalized contact, note, whitelisted attribution and `experiment: null`.
8. Exclude the honeypot, request ID and transport metadata from the semantic payload.
9. Serialize with JSON Canonicalization Scheme semantics: recursively sorted object keys, stable arrays and UTF-8.
10. Hash the canonical bytes with SHA-256.

Behavior:

- same key + same payload → return the original Inquiry;
- same key + different payload → `409 idempotency_conflict`;
- Inquiry row and notification outbox row are written in one database transaction;
- failed persistence never returns success;
- failed notification never deletes a saved Inquiry.

The browser retains the same key after:

- timeout;
- connection loss after request dispatch;
- `503`;
- an uncertain response.

It creates a new key after:

- route revision;
- any contact, note, locale, attribution or route change following a definitive validation or failure response;
- a successful Inquiry followed by an explicit new request.

## 17. Data model

### 17.1 `inquiries`

```text
inquiry_id                  UUID/UUIDv7 primary key
public_reference            unique text
created_at                  timestamptz
updated_at                  timestamptz
schema_version              smallint
form_version                text
entry_path                  generated_route
locale                      en | zh | ko

journey_id                  UUID
journey_revision            integer
route_id                    text
rule_version                text
answers_json                json/jsonb
route_snapshot_json         json/jsonb

contact_channel             email | whatsapp
contact_email               nullable text
contact_phone_e164          nullable text
contact_fingerprint_hmac    text
fingerprint_key_version     smallint
note                        nullable text

privacy_notice_version      text
landing_path                text
attribution_json            json/jsonb

experiment_id               nullable text
experiment_variant          nullable text
experiment_subject_id       nullable UUID

status                      inquiry_status
status_reason               nullable text
status_changed_at           timestamptz
assigned_to                 nullable operator identity
assigned_at                 nullable timestamptz
claim_due_at                timestamptz
first_response_due_at       timestamptz
first_replied_at            nullable timestamptz
last_activity_at            timestamptz
qualified_at                nullable timestamptz
qualification_reason        nullable text
duplicate_of_inquiry_id     nullable UUID
sla_stopped_at              nullable timestamptz
row_version                 bigint

idempotency_key_hash        unique text
payload_hash                text
pii_deleted_at              nullable timestamptz
```

Constraints:

- Email channel requires Email and forbids phone.
- WhatsApp channel requires phone and forbids Email.
- `experiment_*` stays null in V1.
- `public_reference` is independently random and uniquely indexed.
- Notification state does not live on the Inquiry row; `notification_outbox` is the authoritative source.
- `claim_due_at` and `first_response_due_at` are calculated by the server from the approved working-hours calendar.
- `assigned_to` can change only through an audited claim or transfer action.
- `first_replied_at` is written only after a staff member confirms that a human message was actually sent.
- `duplicate_of_inquiry_id` is set only after human review; similar contact details never trigger automatic deletion or merging.
- The contact fingerprint is a server-secret, versioned HMAC of the normalized selected contact value, used only for possible-duplicate review; it is not sent to analytics or logs and is erased with the contact PII.
- `row_version` increments on every operator mutation and is used for optimistic concurrency checks.

### 17.2 `inquiry_events`

```text
event_id
inquiry_id
actor_id
event_type                  status_transition | claimed | transferred |
                            reply_marked | qualification_marked |
                            duplicate_reviewed | duplicate_linked |
                            pii_action
from_status                 nullable inquiry_status
to_status                   nullable inquiry_status
from_assignee               nullable operator identity
to_assignee                 nullable operator identity
reply_channel               nullable email | whatsapp
reason_code                 nullable text
metadata_json               non-PII json/jsonb
created_at
```

This table is append-only. Claim, transfer, reply, qualification and PII actions are never represented only by overwriting the current Inquiry row.

### 17.3 `notification_outbox`

```text
job_id
inquiry_id
status                      pending | processing | accepted | failed
attempt_count
next_attempt_at
lease_until                 nullable timestamptz
leased_by                   nullable text
lease_token                 nullable UUID
provider_message_id
last_error_code
row_version                 bigint
created_at
updated_at
```

### 17.4 `inquiry_duplicate_candidates`

```text
candidate_id
earlier_inquiry_id
later_inquiry_id
status                      pending | confirmed_duplicate |
                            confirmed_distinct
created_at
review_due_at               timestamptz
resolved_at                 nullable timestamptz
resolved_by                 nullable operator identity
reason_code                 nullable text
row_version                 bigint
```

The ordered pair is unique, and a partial unique constraint permits at most one row with `status=pending` for a given `later_inquiry_id`. The earlier/later ordering is deterministic by `created_at` and then `inquiry_id`. A pending candidate blocks first-reply actions only on the later Inquiry; the earlier Inquiry continues under its existing owner.

### 17.5 `operators`

```text
operator_id                 stable identity-provider subject
role                        planner | supervisor | privacy_admin
active                      boolean
display_name                text
created_at                  timestamptz
disabled_at                 nullable timestamptz
```

The authenticated identity provider is the source of login state. An operator row grants studio authorization only while `active=true`; deleting a UI account or hiding a name is not sufficient offboarding.

Role boundary:

- `planner`: view the active queue, claim, send/mark replies and make routine status transitions for owned Inquiries;
- `supervisor`: view all queues, transfer ownership, link duplicates and retry failed outbox work;
- `privacy_admin`: perform approved access, export, anonymization and deletion actions; this role does not imply permission to contact travellers.

### 17.6 `operator_operation_idempotency`

```text
operator_id
idempotency_key_hash
operation_name
target_type
target_id
payload_hash
response_status
response_json               non-PII json/jsonb
created_at
expires_at
```

`operator_id + idempotency_key_hash` is unique. The record is committed in the same transaction as the operator mutation and audit event. Retain it for at least seven days.

## 18. Inquiry and notification states

Business status:

```text
submitted
  → replied | unreachable | spam | duplicate

replied
  → qualified | unqualified | no_response

qualified
  → proposal_started | lost

proposal_started
  → paid | lost

no_response | unreachable
  → replied
```

`qualified` means:

- the traveller can be contacted;
- the traveller has genuine China travel intent;
- after a Homeground reply, the traveller agrees to discuss concrete needs.

It is a human decision, never an automatic form classification. The transition writes `qualified_at`, a controlled `qualification_reason` and an `inquiry_events` record.

`duplicate` is terminal:

- it is available only from `submitted`;
- it cannot be replied to, qualified, claimed again or included in reply-SLA escalation;
- it is excluded from eligible-Inquiry and qualified-conversion denominators;
- the canonical/original Inquiry retains its owner and continues normally.

Possible-duplicate detection:

- compare the versioned HMAC contact fingerprint within an approved window, initially 30 days;
- serialize new-Inquiry creation on the fingerprint with a transaction-scoped advisory lock or equivalent so simultaneous submissions cannot both enter the normal reply queue;
- create the single pending review in the same transaction as the later Inquiry and its outbox row, before returning success;
- choose the most recent non-duplicate same-fingerprint Inquiry as the deterministic earlier anchor, resolving any existing duplicate link to its canonical root;
- persist only that one anchor/later pair, while showing the supervisor every same-fingerprint match in the review window as the complete review set;
- set `review_due_at` in business time before 50% of the public first-response SLA;
- optionally show route ID and submission-time proximity to the operator;
- never auto-link, auto-delete or auto-suppress;
- never expose the fingerprint to the browser, analytics or notification Email.
- place the later Inquiry in `Possible duplicate` review rather than the ordinary first-reply queue until a supervisor resolves it.

Human confirmation locks the candidate and canonical rows and atomically:

1. resolves the canonical root;
2. rejects self-links and cycles;
3. sets `duplicate_of_inquiry_id`;
4. changes the later Inquiry to `duplicate`;
5. sets `sla_stopped_at`;
6. changes the candidate to `confirmed_duplicate`;
7. appends `duplicate_reviewed` and `duplicate_linked` to `inquiry_events`.

Human confirmation that the requests are distinct is a decision against the complete displayed match set. It atomically changes the sole pending candidate to `confirmed_distinct`, records actor/reason/time and releases the later Inquiry only after verifying no pending candidate remains. A pending candidate never silently expires or auto-resolves.

Assignment is separate from business status:

```text
unassigned → claimed → transferred
```

An Inquiry remains `submitted` while it is claimed but not yet answered.

Notification status is separate:

```text
pending → processing → accepted | pending | failed
```

The notification outbox:

- is the single authoritative source for notification status, attempts and provider IDs;
- is written in the same transaction as the Inquiry;
- sends asynchronously to the brand mailbox;
- sends no traveller Email, phone, note or other user-entered text through the notification provider;
- contains only `public_reference`, locale, route ID, reply channel, created time, reply deadline and an authenticated operator URL;
- requires staff to open the protected operator tool to view contact details and the note;
- uses the Inquiry ID as the provider idempotency reference;
- records provider acceptance, not fictional delivery.

Worker concurrency:

- Claim a due job atomically with a database lock/lease such as `FOR UPDATE SKIP LOCKED`, or an equivalent managed-queue lease.
- On every claim or reclaim, atomically set `status=processing`, `leased_by`, a new cryptographically random `lease_token`, `lease_until` and increment `row_version` before calling the provider.
- A second worker cannot claim an unexpired lease.
- An expired lease may be reclaimed only by issuing a new token and version; the prior worker is fenced out.
- Use `inquiry_id` as the notification-provider idempotency reference.
- After the provider returns, update provider result and attempt count only with a compare-and-swap over `job_id + status=processing + lease_token + claimed row_version`; then increment `row_version` and clear the lease.
- If that fencing predicate no longer matches, discard the stale worker result. It must not overwrite the result of a newer lease.
- Never copy outbox attempts or provider status into a second mutable Inquiry field.

Suggested retry schedule:

```text
immediate → 1 minute → 5 minutes → 30 minutes → 2 hours
```

After maximum retries:

- retain the Inquiry;
- mark notification failed;
- raise an operational alert;
- keep it visible to the operator.

The user sees success when the Inquiry is saved, even when notification is still pending.

## 19. Operator access

V1 does not require a CRM. It does require a small private studio queue. The database queue is the source of truth; notification Email is only an alert.

### 19.1 Complete handoff

```text
traveller submits route
  → Inquiry + outbox commit in one transaction
  → traveller sees public reference
  → Inquiry appears immediately in the private studio queue
  → outbox sends a non-PII alert to the shared brand inbox
  → on-duty planner signs in and claims the Inquiry
  → planner replies through the traveller's chosen channel
  → planner confirms the send and the system records `replied`
  → the same owner follows up and records the outcome
```

A missing, delayed or spam-filtered notification Email cannot hide an Inquiry from the studio queue.

### 19.2 Private studio queue

Recommended address:

```text
https://ops.homegroundchina.com/inquiries
```

The exact domain is launch configuration. The tool must:

- require an approved studio identity and MFA;
- reveal no Inquiry data from the URL or Email link before authentication;
- treat the notification link as navigation, never as an authentication credential;
- send `Cache-Control: no-store`;
- contain no GA, advertising pixels or third-party session replay;
- show `Unassigned`, `Due soon`, `Overdue`, `Notification failed` and `Possible duplicate` queues;
- find an Inquiry by `inquiry_id` or `public_reference`;
- display the route, answers, selected contact channel, contact value, note, deadlines, assignee, business status, notification status and audit history;
- permit only audited actions, never direct database editing.

For the later member of a pending duplicate candidate, ordinary planners receive a redacted review view with no contact value or reply controls. A supervisor receives the comparison needed to decide duplicate/distinct, but the UI still exposes no reply action until the decision commits.

### 19.3 Receiving and claiming

The internal notification subject may contain:

```text
[Homeground] New inquiry HG-7K4M-9Q2P-X6RT · EN · Email
```

The body contains the public reference, locale, route ID, reply channel, received time, response deadline and protected operator link. It contains no traveller Email, phone number or note.

Before the first reply, a staff member must click `Claim inquiry`.

- Claim uses an atomic conditional update and succeeds for only one operator.
- A second operator sees the current owner and cannot send the first reply.
- Transfer records the former owner, new owner, actor and time.
- One on-duty planner owns all new Inquiries for the shift; one named backup owns escalation.
- If an Inquiry is the later member of a pending duplicate candidate, it goes first to supervisor review; no operator can retrieve reply material, open a draft or mark its first reply until the supervisor records `confirmed_duplicate` or `confirmed_distinct`.

### 19.4 Human Email reply

For an Email Inquiry, the protected page provides:

- `Copy email address`;
- `Open brand Email draft`;
- a localized first-response draft with the public reference.

These controls request reply material from the protected API only when the current status, owner, version and duplicate-review state allow a reply. Contact details are not embedded into a disabled or pending-review button.

The draft:

1. confirms receipt;
2. refers to the starting route;
3. asks for dates, arrival/departure points and anything fixed;
4. explains that detailed planning and pricing follow the conversation.

It opens in the configured shared brand mailbox. The planner reviews and sends it manually. Opening or copying the draft never changes status.

Only after the message has actually been sent may the assigned planner choose `Mark reply as sent`. That transaction:

- changes `submitted → replied`;
- sets `first_replied_at` once;
- updates `last_activity_at`;
- appends an `inquiry_events` record with actor and `reply_channel=email`.

The customer replies to the shared brand mailbox, and the assigned planner continues in that thread. V1 does not copy message bodies into the Inquiry database.

### 19.5 Human WhatsApp reply

WhatsApp remains hidden until the studio number is registered with WhatsApp Business and a real cross-border test passes.

For a WhatsApp Inquiry, the protected page provides `Open in WhatsApp Business` with the normalized traveller number and a localized draft. It does not use the WhatsApp API and does not send automatically.

- The planner sends from the studio-managed WhatsApp account on an approved device.
- Opening WhatsApp does not change status.
- After the message is visibly sent, the assigned planner chooses `Mark reply as sent`; the same reply transaction records `reply_channel=whatsapp`.
- V1 does not synchronize WhatsApp conversation contents or delivery state.
- Staff use only the channel selected by the traveller unless the traveller later permits a change.

### 19.6 SLA, escalation and reconciliation

At submission the server calculates:

- an internal claim deadline;
- the public first-response deadline.

Required behavior:

- an unclaimed Inquiry approaching `claim_due_at` alerts the on-duty planner;
- a pending duplicate review approaching `review_due_at` alerts the on-duty supervisor and escalates to the supervisor backup through the independent operational channel;
- an unreplied Inquiry at 80% of its SLA alerts the backup;
- an overdue Inquiry stays at the top of the queue until resolved;
- notification failure and SLA failure use an operational alert channel independent of the shared brand mailbox;
- the on-duty planner checks the queue at the beginning and end of each shift;
- the shift cannot close with an unassigned Inquiry approaching its deadline without an audited transfer.

`replied` means a human message was sent, not that the internal alert was accepted. `unreachable` records an actual delivery/contact failure. `qualified` requires a customer response and willingness to discuss concrete planning.

### 19.7 Authorization and concurrency

Inquiry, event, operator and outbox tables live in a private schema or otherwise deny direct browser table access. The public static client never receives a service-role credential.

Every protected operation must:

1. verify the operator JWT;
2. require MFA assurance level `aal2`;
3. load an `active=true` operator and authorize its role;
4. derive `actor_id` from the verified authentication context, never from request JSON;
5. perform the business mutation and append its audit event in one transaction.

If an Edge Function uses a service-role database client that bypasses Row Level Security, it may do so only after these checks. The client receives no direct CRUD grant on Inquiry tables.

Offboarding immediately:

- sets the operator inactive;
- revokes or invalidates active sessions;
- removes the identity from the allowed studio group;
- transfers open assignments;
- retains historical `actor_id` references.

All mutating endpoints require an operation idempotency key plus the caller's expected version of the primary target:

- Inquiry mutations use `inquiries.row_version`;
- duplicate resolution uses `inquiry_duplicate_candidates.row_version` and locks both Inquiry rows;
- outbox retry uses `notification_outbox.row_version`, expected status and lease state.

The operator-operation idempotency contract is:

- same operator + same key + same canonical operation payload after a committed mutation → replay the stored non-PII response, even though the target version has advanced;
- same operator + same key + different payload → `409 idempotency_conflict`;
- concurrent use of the same key → wait for the winner or return a retryable `409 operation_in_progress`;
- a transaction that did not commit leaves no success ledger and is safe to retry with the same key.

After resolving idempotency replay, a new operation uses a row lock or compare-and-swap predicate over the relevant status, assignee, version and lease:

- `claim`: `status=submitted`, not duplicate and `assigned_to IS NULL`;
- `transfer`: current assignee/version must still match and the actor must be the owner or a supervisor;
- `mark-replied`: `status=submitted`, actor is current assignee, no duplicate link, no pending duplicate candidate for this later Inquiry and the version matches;
- reply-material preparation: apply the same owner/status/version/duplicate predicates before returning an Email address, WhatsApp number, draft or external-app link; a pending review returns `409 duplicate_review_required`;
- `transition`: the current status/version and allowed transition must still match;
- duplicate resolution: lock the candidate and both Inquiry rows; require candidate `status=pending`, later Inquiry `status=submitted`, no later reply, canonical root valid and no self-link/cycle;
- outbox manual retry: require the expected outbox row version, `failed` or due `pending`, and no unexpired worker lease.

A stale or racing operation returns `409 operation_conflict`, makes no partial change and tells the operator to reload. Opening a draft never holds a database lock.

### 19.8 Fallback Email during a confirmed outage

The database queue is the source of truth for persisted web Inquiries. The short brand-Email fallback is a deliberate outage-only exception and must itself be operated as a queue.

The fallback `mailto:` uses:

```text
Subject: [Fallback inquiry] {routeReference}
```

The shared mailbox must automatically place it in a `Fallback inquiry` view. That view has explicit states or assignment labels:

```text
New → Claimed → Replied → Closed
                 ↘ Unreachable
```

Rules:

- the on-duty planner owns `New`; the backup monitors unclaimed and overdue fallback messages;
- staff claim before replying and reply only from the shared brand mailbox;
- the route reference remains in the subject;
- after a real send, mark `Replied`; after resolution, mark `Closed` or `Unreachable`;
- a notification or API failure must not redirect fallback mail to a personal Gmail account;
- fallback cases count in response-SLA reporting.

After API recovery, an operator reconciles every fallback message received during the incident:

1. search the protected queue by sender, route reference and incident window;
2. if a persisted Inquiry exists, assign one owner, link the mailbox thread to its public reference and suppress a second first reply;
3. if none exists, keep the Email case in the fallback queue through closure and mark it `Email-only`;
4. record the reconciliation actor, time and result in the incident log;
5. leave no fallback message in `New` or `Claimed` when the incident is closed.

The brand Email fallback is disabled unless the selected mailbox supports shared assignment/status and an auditable incident reconciliation process.

### 19.9 Minimal protected operations

```http
GET  /ops/v1/inquiries?queue=unassigned|due|overdue|attention
GET  /ops/v1/inquiries/{publicReference}
POST /ops/v1/inquiries/{inquiryId}/claim
POST /ops/v1/inquiries/{inquiryId}/transfer
POST /ops/v1/inquiries/{inquiryId}/prepare-reply
POST /ops/v1/inquiries/{inquiryId}/mark-replied
POST /ops/v1/inquiries/{inquiryId}/transition
POST /ops/v1/duplicate-candidates/{candidateId}/resolve
POST /ops/v1/outbox/{jobId}/retry
```

Every endpoint is authenticated, authorized, CSRF-protected where applicable and audited. Direct, unlogged database edits do not satisfy the requirement.

### 19.10 Default implementation proposal

If infrastructure review does not select an equivalent stack, use:

- Supabase Edge Functions for the public and protected APIs;
- Supabase Postgres for Inquiry, events and outbox data;
- Supabase Auth plus Row Level Security for studio identities and access;
- Resend for idempotent non-PII internal notification Email;
- a real shared mailbox on the Homeground domain for human Email conversations;
- the verified studio WhatsApp Business account for manual WhatsApp conversations.

This adds no public homepage module. The private queue is an operational tool, and AI remains outside V1.

## 20. Privacy and security

### 20.1 Inquiry processing

- Inquiry submission is used only to answer the traveller’s active request.
- It is separate from analytics and marketing permission.
- There is no preselected marketing consent.
- The form links to a localized Privacy Notice.
- The notice states purpose, reply channel, providers, storage region, retention and deletion route.
- Mobility copy asks about walking or access needs, not diagnosis.
- WhatsApp data flow is documented if WhatsApp is enabled.

### 20.2 Analytics consent

- GA and other non-essential analytics do not load before valid consent.
- Reject is as easy as Accept.
- Users can withdraw consent later.
- Refusing analytics does not block the route or Inquiry.
- Consent UI and Privacy/Cookie links exist in all three languages.

### 20.3 Data boundaries

Email, phone and note must not enter:

- GA or `dataLayer`;
- URL parameters;
- route `sessionStorage`;
- `localStorage`;
- browser logs;
- ordinary server logs;
- notification subjects;
- error telemetry payloads.

The versioned contact fingerprint is pseudonymous personal data. It remains server-only and is removed or irreversibly anonymized in the same workflow as the underlying Email/phone value.

### 20.4 API security

- HTTPS only.
- Allow only the production origin and explicit development origins.
- Strict JSON content type.
- Reject unknown fields.
- Limit request body to 16 KiB.
- Apply server-side length, enum and format validation to every field, including UTM and landing path.
- Escape user content at every notification or operator rendering boundary.
- Use a honeypot, edge rate limiting and spam flags.
- Do not add CAPTCHA until real automated abuse justifies it.
- Never place API, database or mail credentials in the static bundle.
- Store secrets only in server-side environment variables.
- Enable MFA and least privilege for operator access.
- Do not persist raw IP in Inquiry rows.
- Do not log request bodies.
- Add the Inquiry API only to the necessary CSP `connect-src`.

Suggested initial edge limits:

- 5 submissions per 10 minutes per IP;
- 20 submissions per 24 hours per IP.

Final values must be tested for false positives.

### 20.5 Retention proposal

Subject to final privacy review:

- spam: delete PII after 30 days;
- unqualified, unreachable, no response or lost: anonymize 12 months after last activity;
- active, qualified or proposal started: review after 18 months;
- operational logs: 30 days;
- rolling backups: 30 days;
- paid clients: move to the later contract/booking retention policy.

Notification email and the notification provider contain no traveller PII or note. If an implementation later puts PII into notifications, that provider and every mailbox copy must be added to the same access, retention, export and deletion workflow before release.

## 21. Analytics contract

Only after valid analytics consent:

- `planner_result_viewed`
- `planner_result_revised`
- `handoff_viewed`
- `handoff_started`
- `handoff_submitted_from_route`
- `handoff_failed`

`handoff_submitted_from_route` fires only after API `200` or `201`.

Allowed event parameters:

- locale;
- route ID;
- rule version;
- route family and profile;
- contact channel;
- form version;
- non-PII error code.

Forbidden parameters:

- Inquiry ID;
- journey ID;
- Email;
- phone;
- note;
- full URL or referrer;
- experiment subject ID;
- mobility or access text.

Server operational logs contain only:

- request ID;
- timestamp;
- endpoint;
- status code;
- latency;
- error code.

## 22. Accessibility, responsive and localization requirements

Target: WCAG 2.2 AA.

### 22.1 Semantics and keyboard

- Use native `form`, `fieldset`, `legend`, `label`, `input`, `textarea` and `button`.
- All visible labels are programmatically associated.
- Complete the flow using Tab, Shift+Tab, arrow keys, Space and Enter.
- No positive `tabindex`.
- No keyboard trap.
- All focus indicators are visible with at least 3:1 adjacent contrast.
- Touch targets are at least 44×44 CSS pixels.
- Heading levels remain sequential.
- There is one page H1.

### 22.2 Focus and announcements

- CTA activation focuses the handoff heading.
- Validation failure focuses the error summary.
- Error summary items link to fields.
- Field errors use `aria-describedby` or `aria-errormessage`.
- Submitting and success use `role="status"` or a polite live region.
- Failure uses `role="alert"`.
- When success replaces the form, programmatically focus the success heading with `tabindex="-1"`.
- When failure or an uncertain result appears, focus its status heading/container; retry remains next in normal tab order.
- Conditional fields enter normal DOM order.
- Status is never conveyed by color alone.
- Reduced-motion users receive no non-essential smooth scroll or transition.

### 22.3 Responsive

Test:

- 320×568;
- 375×812;
- 390×844;
- 430×932;
- mobile landscape;
- 200% zoom.

Requirements:

- no horizontal page scrolling;
- single-column mobile form;
- input font size at least 1rem;
- software keyboard does not hide an unrecoverable Submit or error;
- long Korean labels wrap;
- Chinese error summaries do not overflow;
- fixed headers do not cover anchor targets;
- current mobile menu focus behavior remains intact.

### 22.4 Three-language quality

- Every label, hint, error, success state and Privacy link is localized.
- Chinese and Korean IME composition does not submit early, clear or duplicate text.
- Unicode survives API, database, notification and operator display.
- Approved Chinese and Korean fonts remain active without tofu glyphs or incorrect fallback.
- The same answers produce the same `route_id + rule_version` in all locales.
- Locale changes do not change route logic.

## 23. Error and recovery contract

`FailureKind` is a required discriminated UI value when `HandoffStatus=failed`:

```text
request_too_large
rate_limited
idempotency_conflict
route_mismatch
unsupported_rule_version
offline_before_dispatch
not_persisted
```

| Condition | State / variant | Recovery contract | User state | Email fallback |
|---|---|---|---|---|
| Client validation or `422 validation_failed` | `validation-error` | Nothing persisted | Keep all values; focus the linked error summary | No |
| `409 idempotency_conflict` | `failed / idempotency_conflict` | Nothing new persisted; do not refresh the route automatically | Keep values; explain the content changed; require review before creating a new key | No |
| `409 route_mismatch` | `failed / route_mismatch` | Nothing persisted | Keep contact and note; recompute the route; focus the updated route; require explicit resubmit with a new key | No |
| `409 unsupported_rule_version` | `failed / unsupported_rule_version` | Nothing persisted | Keep contact and note; refresh onto a supported rule version; require review and explicit resubmit with a new key | No |
| `413` | `failed / request_too_large` | Nothing persisted | Keep values; show `requestTooLarge`; focus the note when it caused the limit | No |
| `429` | `failed / rate_limited` | Nothing persisted | Keep values and the current key; show the server-provided retry time; disable retry until allowed | No |
| Idempotent replay | `success` | Return the original stored result | Show the original success and public reference | Not applicable |
| Browser is offline before dispatch | `failed / offline_before_dispatch` | The request definitely left no browser | Keep values; allow retry and show the short brand Email fallback | Yes |
| Timeout, gateway failure or loss of connection after dispatch | `uncertain` | Persistence is unknown | Lock the original request; offer only “Check and try again” with the same key and payload | No |
| Explicit `400/415/500/503` application envelope with `persistenceState=not_persisted` | `failed / not_persisted` | Transaction did not commit | Never show success; retain values; allow retry and the short brand Email fallback | Yes |
| Inquiry saved, notification pending or failed | `success` | Inquiry exists | Show success; retry or alert on notification internally | Not applicable |
| Handoff disabled during rollback | `disabled` | No submission control is available | Keep the `#planner-handoff` fallback container with the route reference | Yes |

The client must never merge `uncertain` and definitive `failure`. A retry from `uncertain` reuses the exact idempotency key and canonical payload. A retry after `route_mismatch`, `unsupported_rule_version` or an explicitly reviewed `idempotency_conflict` uses a new key.

The Email fallback is available only when non-persistence is definitive or the form is disabled before submission. It must not recreate the current long `mailto:` body. It contains only:

- a short route reference;
- a request to copy the visible route summary if helpful.

## 24. Visa, brand and privacy launch requirements

Before V1 public release:

- The old Visa page is migrated to the studio brand, or it is removed from production, navigation, footer and sitemap.
- If the old URL remains temporarily, it is `noindex` and cannot show “About Xuan”, “Talk to Xuan” or unverifiable absolute promises.
- A clean production deployment removes stale exported Visa files.
- The new Homeground mark is used consistently for favicon/app icon.
- No public page exposes the personal Gmail as the primary contact.
- The brand mailbox can send and receive.
- SPF, DKIM and DMARC are checked.
- The reply SLA is a real operational commitment.
- Privacy and Cookie links are permanently available in the footer.

## 25. Test and acceptance matrix

### 25.1 Functional

- `F01` Existing four-question routes and edits still work.
- `F02` New/in-progress CTAs target the finder.
- `F03` Result-state CTAs target only `#planner-handoff`.
- `F04` One and only one Inquiry form exists.
- `F05` Email and WhatsApp fields are mutually exclusive.
- `F06` Unverified WhatsApp is hidden by release flag.
- `F07` The API receives the latest answers and route revision.
- `F08` Server recomputation defeats a forged client route.
- `F09` Success appears only after persistence.
- `F10` Duplicate actions create one Inquiry and one notification.
- `F11` A post-success route edit does not mutate the previous Inquiry.
- `F12` Restart clears unsent PII.
- `F13` All global CTA states are consistent.

### 25.2 Error recovery

- `E01` Invalid Email and phone show linked localized errors.
- `E02` `409 idempotency_conflict` retains values, does not refresh the route and requires explicit review before a new key.
- `E03` `409 route_mismatch` refreshes the route while retaining contact and note, then requires explicit resubmission.
- `E04` `409 unsupported_rule_version` moves to a supported version while retaining contact and note, then requires review and explicit resubmission.
- `E05` Every `FailureKind` maps to its specified copy, focus, retry behavior and Email-fallback permission; `413`, `422` and `429` never display the fallback.
- `E06` A timeout after dispatch enters `uncertain`; every payload-affecting control is locked, the payload hash is unchanged, and a retry with the same key returns one Inquiry without exposing an Email fallback.
- `E07` Saved Inquiry + failed notification still shows success.
- `E08` A definitive non-persistence outage provides a working short brand mailbox fallback.
- `E09` Language change does not silently discard a dirty form.

### 25.3 Security

- `S01` Invalid Origin, method and content type are rejected.
- `S02` Unknown fields and structured-city properties are rejected.
- `S03` Script, HTML, header injection and oversized UTM values render as inert text.
- `S04` Secrets are absent from static assets and client logs.
- `S05` Logs contain no Email, phone or note.
- `S06` Operator access requires authentication and records status history.
- `S07` Honeypot, limits and request size enforcement work.

### 25.4 Privacy

- `P01` No GA request occurs before analytics consent.
- `P02` Reject and withdrawal work.
- `P03` Inquiry works without analytics consent.
- `P04` PII is absent from URL, analytics and route storage.
- `P05` A test Inquiry can be found, exported and deleted.
- `P06` No marketing use occurs without separate permission.

### 25.5 Accessibility and mobile

- `A01` Keyboard-only English submission succeeds.
- `A02` A full English submission succeeds on a physical iPhone in current Safari with VoiceOver.
- `A03` A full localized submission succeeds on a physical Android phone in current Chrome; TalkBack covers entry, validation and confirmation.
- `A04` Axe reports no critical or serious issues.
- `A05` 320px and 200% zoom have no horizontal overflow.
- `A06` Focus order follows visual order.
- `A07` Error, submitting, success, failure and uncertain states are announced.
- `A08` Touch targets are at least 44×44 CSS pixels.
- `A09` Reduced motion is respected.

### 25.6 Three-language E2E

- `L01` Submit one real Email Inquiry in each locale.
- `L02` If WhatsApp is enabled, submit and reply through one real target-market number for each locale.
- `L03` Route IDs match across locales for identical answers.
- `L04` Unicode survives the full pipeline.
- `L05` No English fallback copy or browser-only error remains.
- `L06` No Korean or Chinese layout overflow or font regression.

### 25.7 Operational E2E

- `O01` Persistence, canonical route, notification and operator view agree.
- `O02` A forced notification failure retries and alerts.
- `O03` Two operators cannot claim the same Inquiry; transfer retains both identities and timestamps.
- `O04` Brand Email reaches real Gmail and Outlook accounts.
- `O05` A production smoke Inquiry succeeds and its test data is deleted.
- `O06` An Inquiry is visible in the studio queue even when its notification Email is forced to fail.
- `O07` An unauthenticated notification link reveals no PII.
- `O08` Opening an Email draft or WhatsApp conversation without sending leaves status at `submitted`.
- `O09` Human confirmation after a real send records `replied`, the channel, timestamp and actor.
- `O10` Staff can transition replied → qualified with controlled reason and audit history.
- `O11` Unclaimed and unreplied deadlines trigger the configured on-duty and backup alerts.
- `O12` Two different idempotency keys with the same normalized contact create a persisted pending candidate; while pending, an ordinary planner receives no contact value or reply controls, and no operator can prepare/open reply material or mark the later Inquiry replied. Confirming duplicate atomically makes it terminal and stops its SLA; confirming distinct releases it for normal reply. Both decisions preserve actor, reason and audit records.
- `O13` A fallback Email is claimed, replied to, closed and reconciled after API recovery without entering a personal inbox.
- `O14` Racing transfer/reply/duplicate/retry operations allow one valid mutation and return `409 operation_conflict` for stale attempts.
- `O15` An inactive, non-MFA or unauthorized operator cannot read or mutate Inquiry data; `actor_id` cannot be forged in request JSON.
- `O16` Replaying a committed operator mutation with the same key and payload returns its original response; a changed payload conflicts, and a stale target version without a replay ledger returns `409 operation_conflict`.
- `O17` A worker returning after lease expiry cannot overwrite a reclaimed job; only the current lease token/version may write the provider result.
- `O18` A pending duplicate review has one ownerable review record, alerts the supervisor before half the first-response SLA and escalates to the supervisor backup if overdue.

### 25.8 Regression and performance

- `R01` `npm run build` and font coverage pass.
- `R02` All current answer combinations return valid nights, cities and moves.
- `R03` Known route IDs remain unchanged.
- `R04` Menus, FAQ, edit, restart and session restore still work.
- `R05` Sitemap, robots, 404 and public pages contain no stale contact path.
- `R06` Homepage first-load JavaScript does not increase more than 10% without an approved reason.
- `R07` CLS remains below 0.1.
- `R08` No Lab dependency is introduced into the homepage.

## 26. Deployment and rollback

### 26.1 Release order

1. Provision the staging API, database, notification provider, operator access and brand-mailbox test path.
2. Deploy the staging API and staging frontend with the same route rule version, localized Privacy/Cookie pages, consent behavior and launch flags.
3. Run staging security, idempotency, notification, privacy, accessibility and three-language E2E, including physical iPhone Safari and Android Chrome.
4. Provision the separate production database, API, notification credentials and authenticated operator access; keep the public handoff flag disabled.
5. Deploy the production API, verify health, allowed origins, migrations, route rule version and a non-PII notification check while the frontend form remains disabled.
6. Configure and verify production monitoring and alerts for API failure, persistence failure, notification failure/lease expiry and operator backlog; prove an alert can reach its owner.
7. Deploy the production static frontend with the verified API endpoint, real brand mailbox, reply SLA and final WhatsApp flag; enable the handoff only after the API checks and monitoring checks pass.
8. Run one production smoke Inquiry in each enabled contact channel, verify persistence, notification, operator access and monitoring evidence, then delete the smoke PII through the real deletion path.
9. Record the release evidence package and begin the response-SLA watch.

### 26.2 Monitoring

Monitor without PII:

- API request rate;
- validation failure rate;
- persistence failure rate;
- notification pending/failed count;
- latency;
- rate-limit and spam counts;
- client `handoff_failed`;
- mailbox and operator response backlog.
- pending and overdue duplicate-review count.

### 26.3 Rollback

Frontend or availability rollback:

- disable the Inquiry form for new page loads behind the release flag;
- keep the `#planner-handoff` fallback container;
- show the brand mailbox fallback with a short route reference only when the mailbox and its data handling are healthy;
- do not restore the long route `mailto:`;
- keep a healthy API and operator access available for already saved Inquiry records and same-key uncertain retries;
- preserve notification retries;
- do not replace an already loaded `submitting`, `uncertain`, `rate_limited` or `success` UI with the fallback;
- do not delete saved Inquiry data during frontend rollback.

API, security or privacy incident response:

- close or isolate the public `POST /v1/inquiries` at the edge when accepting more data is unsafe;
- pause notification workers if the provider, payload boundary or credentials may be affected;
- revoke or isolate operator sessions according to impact;
- rotate affected API, database, mail and provider credentials;
- preserve the database, backups, access logs, outbox and audit evidence; do not delete records as an incident shortcut;
- do not expose the brand Email fallback unless the mailbox, access controls and privacy path are confirmed unaffected;
- do not tell an `uncertain` user to create a second request; restore same-key recovery or reconcile the original record when safe;
- follow the approved incident and data-notification process before reopening.

## 27. Launch configuration required

Implementation cannot move to public release until the owner supplies or approves:

1. Shared brand mailbox, sending domain, fallback assignment/status support and at least two MFA-capable operators.
2. Public reply SLA, internal claim target, working hours, timezone, weekends and holidays.
3. Serverless provider and account owner.
4. Database provider, region and account owner.
5. Notification provider.
6. Data controller name and Privacy contact.
7. Retention policy approval.
8. WhatsApp enabled or disabled.
9. If enabled, confirmation that `+86 131 7421 5999` is registered and has passed real cross-border tests.
10. Named on-duty planner, on-duty supervisor, their backup owners and handover rules; one person may hold both roles only when explicitly scheduled.
11. Operational alert channel independent of the shared brand mailbox.
12. Approved English, Chinese and Korean first-response drafts.

These are launch configuration, not extra homepage modules.

## 28. Definition of done

V1 is done only when:

- every Included item is implemented;
- every Excluded item remains absent;
- all required launch configuration is real, not placeholder text;
- all three locales pass functional submission;
- Email E2E passes;
- WhatsApp is either verified and passing or hidden;
- the API persists before success;
- duplicate retries create one record;
- notification failure is recoverable;
- every new Inquiry appears in the authenticated studio queue;
- only one operator can own the first reply;
- a real Email/WhatsApp send, not a draft click, is required before `replied`;
- confirmed duplicates become terminal and stop reply/SLA work;
- pending duplicate reviews have one record, a deadline, a supervisor and a tested escalation;
- outage fallback Email has been claimed, replied, closed and reconciled in a real drill;
- stale concurrent operator actions cannot create conflicting state;
- SLA and independent escalation alerts have been exercised;
- PII is absent from analytics, URL and logs;
- privacy and analytics consent are live;
- the old personal-brand Visa path is migrated or removed;
- no P0 or P1 defect remains;
- both frontend/availability rollback and API/security/privacy incident rollback have been rehearsed;
- the evidence package includes screenshots, mobile video, keyboard recording, axe output, redacted API/database records, a real notification and privacy network capture.

## Appendix A — Localized UI copy

This appendix is part of the implementation contract. No locale may launch with missing keys.

The English source values are in Section 10.

| Key | 简体中文 | 한국어 |
|---|---|---|
| `resultCardCta` | 继续提交规划请求 | 플래너 문의 계속하기 |
| `globalHandoffReadyCta` | 请规划师复核这条路线 | 플래너에게 이 일정 검토 요청하기 |
| `globalValidationErrorCta` | 完成规划请求 | 플래너 문의 마무리하기 |
| `globalSubmittingCta` | 正在提交… | 문의 보내는 중… |
| `globalFailedCta` | 回到规划请求 | 문의로 돌아가기 |
| `globalUncertainCta` | 查看提交状态 | 문의 상태 보기 |
| `globalSuccessCta` | 查看提交确认 | 문의 접수 확인하기 |
| `globalDisabledCta` | 联系 Homeground | Homeground에 문의하기 |
| `handoffEyebrow` | 下一步 · 人工复核 | 다음 단계 · 플래너 검토 |
| `handoffTitle` | 想让这条路线真正适合你的旅行吗？ | 이 일정을 실제 여행에 맞게 다듬어 볼까요? |
| `handoffBody` | 你刚刚看到的路线和四项回答会一起提交，无需重新填写。 | 지금 확인한 일정과 네 가지 답변이 함께 전달되므로 다시 입력하실 필요가 없습니다. |
| `scopeBoundary` | 这还是一份根据当前回答生成的起始路线。日期、出发和抵达机场、季节及具体交通尚未核验，也不代表任何服务已经预订。 | 이 일정은 현재 답변을 바탕으로 만든 초안입니다. 날짜, 출도착 공항, 계절별 교통편은 아직 확인되지 않았으며 예약이 완료된 상태도 아닙니다. |
| `contactLegend` | 你希望我们通过哪种方式回复？ | 어떤 방법으로 답변드릴까요? |
| `emailOption` | 电子邮箱 | 이메일 |
| `whatsappOption` | WhatsApp | WhatsApp |
| `emailLabel` | 电子邮箱 | 이메일 |
| `emailHint` | 我们会通过这个邮箱回复你的咨询。 | 입력하신 이메일로 문의 답변을 보내드립니다. |
| `whatsappLabel` | WhatsApp 号码（包含国家或地区代码） | WhatsApp 번호(국가 번호 포함) |
| `whatsappHint` | 例如 +44 7700 900123。我们只会用这个号码回复本次咨询。 | 예: +82 10 1234 5678. 입력하신 번호는 이번 문의에 답변하는 용도로만 사용합니다. |
| `noteLabel` | 还有哪些情况希望规划师提前了解？（选填） | 플래너가 미리 알아야 할 내용이 있나요? (선택) |
| `noteHint` | 可以写下必去地点、已订航班、去过的地方、步行或行动方面的需要，以及其他不能改变的条件。请不要填写病历或诊断信息。 | 꼭 포함하고 싶은 곳, 이미 예약한 항공편, 이전에 방문한 곳, 걷기나 이동에 필요한 사항, 그 밖에 바꿀 수 없는 조건을 적어 주세요. 진료 기록이나 진단 정보는 입력하지 마세요. |
| `noteAttached` | 这些说明会随咨询一起交给规划师复核，目前不会自动改变这条起始路线。 | 입력하신 내용은 플래너 검토용으로 문의에 함께 전달됩니다. 현재 일정 초안에는 자동으로 반영되지 않습니다. |
| `nextTitle` | 提交后会怎么进行？ | 문의 후에는 어떻게 진행되나요? |
| `nextBody` | 我们会先确认旅行日期、出发和抵达地点、步行与行动需要，以及不能改变的条件。详细行程和费用会在进一步沟通后提供。 | 먼저 여행 날짜, 출도착 지점, 걷기와 이동에 필요한 사항, 반드시 지켜야 할 조건을 확인합니다. 자세한 일정과 비용은 그다음 상담을 거쳐 안내드립니다. |
| `privacyBody` | 我们只会使用你提供的信息来回复并处理这次旅行咨询，未经你另行同意不会用于营销。 | 입력하신 정보는 이번 여행 문의에 답변하고 상담을 진행하는 데에만 사용합니다. 별도 동의 없이 마케팅에 사용하지 않습니다. |
| `privacyLink` | 查看隐私说明 | 개인정보 처리 안내 보기 |
| `serviceBoundary` | 提交咨询不代表预订。Homeground 负责规划旅程并协调当地交付；任何服务确认前，我们会明确说明每项服务由谁负责。 | 문의를 보낸다고 예약이 완료되는 것은 아닙니다. Homeground는 여행을 설계하고 현지 서비스 진행을 조율합니다. 어떤 서비스든 확정하기 전에 각 서비스의 책임 주체를 명확히 안내드립니다. |
| `submit` | 发送给规划师 | 플래너에게 보내기 |
| `submitting` | 正在提交… | 보내는 중… |
| `successTitle` | 已收到你的咨询 | 문의가 접수되었습니다 |
| `successBody` | 这份路线、你的回答和补充说明已经提交给 Homeground。 | 일정 초안, 답변과 추가로 남긴 내용이 Homeground에 전달되었습니다. |
| `successReference` | 咨询编号：{publicReference} | 문의 번호: {publicReference} |
| `successReplyEmail` | 我们会在 {replySla} 内通过电子邮箱回复。此时尚未产生任何预订。 | {replySla} 이내에 이메일로 답변드리겠습니다. 아직 예약된 내용은 없습니다. |
| `successReplyWhatsapp` | 我们会在 {replySla} 内通过 WhatsApp 回复。此时尚未产生任何预订。 | {replySla} 이내에 WhatsApp으로 답변드리겠습니다. 아직 예약된 내용은 없습니다. |
| `backToRoute` | 返回查看路线 | 내 일정으로 돌아가기 |
| `failureTitle` | 暂时未能提交 | 문의를 보내지 못했습니다 |
| `fallbackFailureBody` | 你填写的内容还在。请重试，或发送邮件至 {brandEmail}，并附上路线编号 {routeReference}。 | 입력하신 내용은 그대로 남아 있습니다. 다시 시도하거나 {brandEmail}로 이메일을 보내면서 일정 참조 번호 {routeReference}를 함께 적어 주세요. |
| `retry` | 重试 | 다시 시도 |
| `emailFallback` | 发送邮件给 Homeground | Homeground에 이메일 보내기 |
| `disabledTitle` | 暂时无法提交规划请求 | 현재 플래너 문의를 보낼 수 없습니다 |
| `disabledBody` | 请发送邮件至 {brandEmail}，并附上路线编号 {routeReference}。 | {brandEmail}로 이메일을 보내면서 일정 참조 번호 {routeReference}를 함께 적어 주세요. |
| `uncertainTitle` | 暂时无法确认咨询是否已经送达 | 문의가 접수되었는지 확인하지 못했습니다 |
| `uncertainBody` | 你填写的内容还在。请再次尝试；我们会使用同一个请求标识，不会重复创建咨询。 | 입력하신 내용은 그대로 남아 있습니다. 다시 시도해 주세요. 같은 요청 키를 사용하므로 문의가 중복으로 생성되지 않습니다. |
| `uncertainLeaveWarning` | 请在离开此页面前重试。如果离开，浏览器可能无法继续核对这次提交。 | 이 페이지를 떠나기 전에 다시 시도해 주세요. 페이지를 떠나면 이 브라우저에서 이번 문의의 접수 여부를 계속 확인하지 못할 수 있습니다. |
| `uncertainRetry` | 检查并重试 | 확인하고 다시 시도 |
| `errorSummary` | 请检查以下内容后再提交： | 아래 항목을 확인한 뒤 다시 보내 주세요. |
| `contactError` | 请选择电子邮箱或 WhatsApp。 | 이메일 또는 WhatsApp을 선택해 주세요. |
| `emailError` | 请输入有效的电子邮箱地址。 | 올바른 이메일 주소를 입력해 주세요. |
| `whatsappError` | 请输入包含国家或地区代码的有效 WhatsApp 号码。 | 국가 번호를 포함한 올바른 WhatsApp 번호를 입력해 주세요. |
| `noteTooLong` | 请将说明控制在 2,000 个字符以内。 | 2,000자 이내로 작성해 주세요. |
| `requestTooLarge` | 这次咨询内容过长，无法提交。请缩短选填说明后重试。 | 문의 내용이 너무 길어 전송할 수 없습니다. 선택 입력 내용을 줄인 뒤 다시 시도해 주세요. |
| `technicalError` | 暂时无法处理这次咨询。你填写的内容还在，请重试。 | 현재 문의를 처리할 수 없습니다. 입력하신 내용은 그대로 남아 있으니 다시 시도해 주세요. |
| `rateLimited` | 提交次数过多，请等待 {retryAfter} 后再试。 | 너무 많은 요청이 전송되었습니다. {retryAfter} 후 다시 시도해 주세요. |
| `routeMismatch` | 这条路线已经更新。请查看更新后的路线，然后重新提交咨询。 | 일정이 업데이트되었습니다. 변경된 일정을 확인한 뒤 문의를 다시 보내 주세요. |
| `unsupportedRuleVersion` | 这条路线使用了较早的规则版本。请刷新并查看更新后的路线，再重新提交。 | 이 일정은 이전 규칙 버전으로 생성되었습니다. 새로고침해 업데이트된 일정을 확인한 뒤 다시 보내 주세요. |
| `idempotencyConflict` | 提交过程中内容发生了变化。请检查信息后重新提交。 | 전송 중 문의 내용이 변경되었습니다. 내용을 확인한 뒤 다시 보내 주세요. |
