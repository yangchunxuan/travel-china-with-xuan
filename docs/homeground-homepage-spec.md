# Homeground English Homepage — Product Spec

Version: 2026-07-17.1
Primary market: English-speaking, long-haul travellers planning China
Primary conversion: a traveller sees a useful route before choosing planner contact

## 1. Product promise

Within ten seconds, a visitor should understand:

- Homeground helps plan a China journey around the actual travel party.
- Four answers produce a useful starting route with cities, nights and trade-offs.
- Personal contact, detailed planning and pricing come after that result.
- Homeground shapes the journey and coordinates delivery with selected local operators.

The homepage does not lead with “travel agency”, public pricing or a founder personality.

## 2. One connected user journey

```text
Beijing hero
  → Q1 travel party
  → Q2 desired experience
  → Q3 reference trip length
  → Q4 preferred pace
  → deterministic route result
  → edit one / edit all / restart
  → optional planner email with the full result attached
```

Every visible homepage section supports that same journey:

1. **Hero + Route Finder** — immediate value.
2. **Planning Proof** — shows what human planning adds after the route shape.
3. **Studio** — explains ownership, specialists and delivery handoffs without team photos.
4. **FAQ** — resolves the few objections that affect starting or contacting.
5. **Return CTA** — changes between Find, Continue and View according to planner state.

There is no standalone route gallery, generic process strip, “Why Xuan” section, early contact gate or global chat bubble.

## 3. Route Finder rules

Inputs:

- Party: two adults, family with children, parents/older travellers, friends or solo.
- Experience: first-time classic, dramatic landscapes, food/city energy, slower China or unsure.
- Reference length: 7, 10, 14 or 18 hotel nights.
- Pace: gentle, balanced or full.

Outputs:

- Ordered cities and an exact night allocation.
- Total hotel nights.
- Between-city moves in the draft; arrival/departure transfers are explicitly excluded.
- Two reasons tied to the answers.
- A visible trade-off or omitted city.
- Assumptions not yet checked.
- Stable `routeId` and `ruleVersion` for planner or future AI handoff.

Personalisation must change the structure, not just the explanation. Where a broader route exists, gentle pace, older travellers, and most family cases use the lower-move profile with fewer bases and longer stays. Seven-night routes already use the minimum two-base structure. Exact airports, dates, seasonal transport, hotel standard and budget remain outside the automatic result.

Non-PII progress is stored in `sessionStorage` so refresh and section navigation do not discard the route.

## 4. Contact and validation

The current result-only CTA opens a prefilled email containing:

- all four answers;
- route allocation and between-city moves;
- reasons, trade-off and assumptions;
- route ID and rule version.

`planner_email_clicked` measures CTA intent only. It is not counted as a submitted lead.

For reliable conversion measurement, replace or supplement email with a result-only structured form that posts to a real external/serverless lead endpoint. Record success only after that endpoint accepts the enquiry. Keep email as the fallback.

Funnel events contain no contact details or free text:

- `planner_started`
- `planner_step_completed`
- `planner_result_viewed`
- `planner_result_revised`
- `planner_email_clicked`

## 5. AI decision

Do **not** use the Codex SDK for traveller chat. Codex is a coding-agent surface, while this product needs a narrow customer conversation tied to one route result.

AI is a later, optional layer inside the result:

```text
Deterministic RouteMatch
  ├─ Ask a question about this route (optional AI)
  └─ Ask a planner to review it (always visible)
```

The AI receives the same `answers + RouteMatch + locale` and may:

- explain why a city or night allocation appears;
- ask for one useful missing condition such as airports, dates or mobility;
- summarise clarifications for the human planner.

It may not:

- create a competing route outside the same rule source;
- quote or guarantee pricing, availability, tickets or operating partners;
- present a draft as a booking or confirmed itinerary;
- replace the human review CTA.

Because the site uses static export, model keys must never be placed in browser code. The production boundary is:

```text
Static homepage → serverless/backend endpoint → OpenAI Responses API
```

Use a hosted/custom chat UI only if it preserves the result context. Add the Agents SDK later only if the conversation truly needs tools, specialist handoffs, guardrails or tracing.

Official references:

- Codex SDK: <https://learn.chatgpt.com/docs/codex-sdk>
- ChatKit: <https://developers.openai.com/api/docs/guides/chatkit>
- Agents SDK: <https://developers.openai.com/api/docs/guides/agents>
- Conversation state: <https://developers.openai.com/api/docs/guides/conversation-state>

## 6. Visual and content rules

- Fixed Beijing hero; do not rotate cities behind the core promise.
- Warm off-white, deep green and restrained terracotta palette.
- Use supplied high-resolution city photography only when it adds specific meaning.
- Keep one illustrative planning extract instead of several generic city cards.
- Do not place team portraits on the homepage; the studio framework remains ready for names and roles later.
- English is the only exposed locale until Chinese and Korean pages are brought onto the same studio model.

## 7. Inputs still needed for launch

Only four inputs materially improve the current funnel:

1. A studio-owned lead destination: form endpoint/CRM, shared email or approved chat channel.
2. One anonymised real planning extract to replace the illustrative proof when available.
3. Team names and responsibilities for a later Studio/Team page, not homepage portraits.
4. The real YouTube URL and thumbnail once the 80% China-trip explainer exists.

Public pricing, contracts and detailed operator terms are intentionally outside this homepage version.
