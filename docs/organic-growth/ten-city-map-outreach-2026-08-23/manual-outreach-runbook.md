# Ten-city map manual outreach runbook

Last reviewed: 2026-08-23
Scope: 25 named outreach targets for the Homeground China ten-city arrival, stay and departure map
Machine-readable source of truth: `target-status.json`

## What this campaign is

This is a manual, editorially relevant outreach queue for one reusable travel-planning asset. It is not a bulk email campaign and it is not a request to exchange, buy or guarantee links.

Asset URLs, which must be checked on production immediately before any send:

- Canonical page: <https://homegroundchina.com/guides/first-trip-china-airport-station-stay-map/>
- Download package: <https://homegroundchina.com/downloads/homeground-china-10-city-arrival-stay-departure-v1.zip>
- Licence: <https://creativecommons.org/licenses/by/4.0/>

The outreach purpose is to offer a genuinely useful, attributed source or correction aid. A recipient may ignore it, cite it, download it, adapt it under the published licence, or reply without linking. No outcome is promised.

Production gate: **PASSED on 2026-08-23** at runtime merge SHA
`0031b17b7f2ecbf4d4a192a2d8422cc6dff538df`. The canonical page, ZIP and licence
returned HTTP 200, and the live sitemap contained 671 unique URLs. This shared
gate does not replace the current-page review or Gmail Sent duplicate check
required immediately before each individual message.

## Non-negotiable operating rules

1. Do not bulk-send, mail-merge or send the same template to multiple targets. Open the target's current page and write one message for that page and audience.
2. Do not ask for a `dofollow` link, a keyword anchor, a reciprocal link, payment, placement guarantee or publication deadline.
3. Do not describe the message as a guest-post offer unless the target's current guidelines explicitly invite pitches and the proposed work satisfies them.
4. Before every send, search the real sender mailbox's Gmail Sent folder for the organisation name, domain and recipient address. If a prior send exists, do not send a new first-touch message.
5. The repository must never contain Gmail message IDs, thread IDs, private reply content, personal email addresses, phone numbers or other personal data. Publicly advertised business/editorial mailboxes may be recorded here.
6. While `homegroundchina.com` mail authentication is not verified, send only from an existing real-name mailbox controlled by the operator. Do not impersonate a domain mailbox or an editor.
7. Check that the canonical page, ZIP and visible CC BY 4.0 terms return successfully before promoting any `ready-after-live` target.
8. State what the asset is: an original schematic/editorial matrix, not a live timetable, live fare tool or navigational map. Dynamic airport, station, route and entry facts must still be checked with operators or authorities.
9. Personalise the subject, first sentence, cited recipient page and usefulness claim. Remove every claim that cannot be supported by the live asset or a current recipient page.
10. Record only the public-safe state transition in `target-status.json`. The Gmail Sent folder remains the evidence for whether a message was actually sent.

## Status meanings

- `monitor`: a prior send may already exist. Gmail Sent is the authority; do not start a second thread. If a valid prior send is confirmed, wait and apply the one-follow-up rule.
- `ready-after-live`: the target and angle are usable only after the map page, package and licence are live and the Gmail Sent duplicate check is clear.
- `needs-one-item`: the target is plausible but one named input must be completed before it can move to `ready-after-live`.
- `hold`: do not send. The present asset/angle/channel fit is insufficient. Promote only after the stated trigger exists and the target is re-reviewed.

Current queue: 4 `monitor`, 9 `ready-after-live`, 3 `needs-one-item`, 9 `hold`.

## Send workflow

1. Open the live canonical page, ZIP and licence in a signed-out/private browser context. Confirm they are public, readable and internally consistent.
2. Open the target's current public contact or contribution page. Recheck its scope, prohibitions and recipient route on the day of sending.
3. Search Gmail Sent using the organisation name, its domain and the public recipient email. If any plausible match exists, read enough to determine whether it is the same campaign; never rely on this repository as send evidence.
4. Draft a short message in the real sender's own voice. Lead with the recipient-specific usefulness or correction, not with Homeground's services.
5. Include the canonical asset page once. Include the ZIP only when the recipient's workflow benefits from a downloadable package. Mention CC BY 4.0 only when reuse is relevant.
6. Check every factual sentence, recipient name, URL and attachment. Do not attach large files unless the recipient's instructions ask for them.
7. Send one message manually. Do not add multiple recipients, BCC a list or automate form submission.
8. Update only the public-safe status/counts. Do not copy private correspondence into Git.

## Follow-up rule

- Maximum: one follow-up per original outreach thread.
- Timing: 7–10 business days after the confirmed original send, and only if no reply, bounce or explicit decline exists.
- The follow-up must stay in the original thread, be shorter than the first message and add one useful fact, corrected file or current reason—not “just checking in.”
- Never follow up after a decline, unsubscribe request, bounce, warning, form rejection or recipient policy that says no follow-ups.
- After the single follow-up, close the target as no-response and do not restart the sequence unless the recipient later initiates contact or a materially new asset justifies a fresh review.

## Target queue

### Monitor — verify possible prior sends before any action

| ID | Target | Public contact route | Personalised hook | Send prerequisite / next action |
|---|---|---|---|---|
| HG-001 | China Admissions | [Support centre](https://www.china-admissions.com/support/) | Their international-student audience must turn an admission into a workable first arrival; the airport/station-to-stay-area matrix can support that transition without replacing university or visa advice. | Search Gmail Sent for the organisation/domain. Do not resend. If a prior thread is confirmed and unanswered, follow up once only after 7–10 business days. |
| HG-002 | The Helpful Panda | [Contact page](https://thehelpfulpanda.com/contact/) · `admin@thehelpfulpanda.com` | Their practical first-time-China guidance covers the friction before and during arrival; offer the map as a free visual companion to airport, train, app and accommodation guidance. | Search Gmail Sent first. Do not pitch generic “collaboration” or a link exchange; keep any permitted follow-up about reader utility. |
| HG-003 | Sapore di Cina | [Contact page](https://www.saporedicina.com/english/contact/) · `info@saporedicina.com` | Their readers already plan visas, routes and stays across China; the CC BY 4.0 package gives editors a reusable ten-city gateway visual with a canonical source. | Search Gmail Sent first. Do not create a second first-touch. If following up, point to the live licence/package rather than asking for placement. |
| HG-007 | SmartShanghai | [Contact page](https://www.smartshanghai.com/contact/?e=101) | The Shanghai card distinguishes PVG, SHA, Shanghai/Hongqiao railway choices and stay areas—a compact correction/reference aid for locally edited arrival content. | Search Gmail Sent first. Use the current feedback/editorial route, not an advertising path. One follow-up maximum if a prior valid send is confirmed. |

### Ready after the live package is verified

| ID | Target | Public contact route | Personalised hook | Send prerequisite / next action |
|---|---|---|---|---|
| HG-004 | TripZilla | [Contact form](https://www.tripzilla.com/contact-us) | Its Southeast Asian first-trip audience often compares Beijing, Shanghai, Chengdu and other China gateways; offer the map as a concise decision aid, not a promotional placement request. | Confirm page/ZIP/licence live, search Gmail Sent, then submit one tailored editorial/resource note through the form. |
| HG-006 | The Broke Backpacker | [Contact page](https://www.thebrokebackpacker.com/contact-us/) · `hello@thebrokebackpacker.com` | Lead as feedback/correction support for budget travellers who can lose time and money by choosing the wrong airport, station or overnight area; their public page assigns corrections to this mailbox. | Cite the specific current recipient article reviewed that day. Do not present it as a routine guest post or paid partnership. |
| HG-008 | The Travel Intern | [Contact form](https://thetravelintern.com/contact/) | A Singapore-based audience planning multi-city China needs a quick comparison of gateways and first-night bases; the downloadable cards can support a practical itinerary article. | Confirm live assets and duplicate-free Sent search, then use one form submission tailored to a current China article. |
| HG-010 | China Briefing | [Editorial contact context](https://www.china-briefing.com/news/meet-china-briefing) · `editor@china-briefing.com` | International business visitors also face airport-versus-station and first-night-location decisions; offer the matrix as a supporting visual/reference, not as legal, tax or immigration advice. | First identify one current inbound-business or mobility page where the asset materially helps. Send only if that page-level fit still exists. |
| HG-011 | TripSavvy | [About/contact and editorial standards](https://www.tripsavvy.com/about-us-4777100) | Offer a specific, sourced update to a current China airport, station or arrival paragraph and the map as supporting evidence; do not make an unsupported claim that their whole guide is outdated. | Record the exact public article URL in the private working draft, verify the fact against primary sources, search Sent, then send through the current feedback route. |
| HG-014 | Go Overseas | [Contact page](https://www.gooverseas.com/contact-go-overseas) · `PR@GoOverseas.com` | Students, teachers and programme participants arriving in China benefit from understanding which gateway and stay area matches the booked campus or programme city. | Treat this as an editorial resource note, not sponsored coverage. Confirm a relevant current China programme/article before sending. |
| HG-022 | Never Ending Footsteps | [Contact form](https://www.neverendingfootsteps.com/contact-us/) | The site values independent, first-hand, unsponsored advice; offer a concise free reference that helps readers avoid wrong-node transfers, clearly disclosing that the graphic is deterministic/editorial rather than generative artwork. | Keep the message brief and specific, with no sponsorship, free trip, guest-post or custom-itinerary request. Search Sent before one manual form submission. |
| HG-024 | Sleeping in Airports | [Guide update form](https://www.sleepinginairports.net/update-airport-guide.htm) · `guides@sleepinginairports.com` | Submit only gateway-specific, source-backed corrections for a named China airport guide; use the map/page to explain the airport–station–stay relationship rather than making a generic backlink pitch. | Verify the exact airport guide and current official fact first. Prefer the update form. One airport/update per submission where practical. |
| HG-025 | AFAR | [Contributor guidelines](https://www.afar.com/about/pitch-guidelines) · `mbaran@afar.com` | The strongest fit is an “Intel” source note or tightly reported angle on why wrong-node choices consume a first China trip; the map can support the story but is not itself a commissioned story. | Follow the current guidelines exactly. A full pitch requires an honest real-author bio, expertise and relevant clips; otherwise send only a concise source note with no attachment or coverage demand. |

### Needs one item before it can be ready

| ID | Target | Public contact route | Personalised hook | Missing item / promotion rule |
|---|---|---|---|---|
| HG-012 | Chengdu-Expat | [Contributor guidance](https://chengdu-expat.com/write-for-us-at-chengdu-expat/) · `info@chengdu-expat.com` | A Chengdu-specific card can clarify CTU versus TFU, Chengdu East/South and practical stay areas for newcomers and short-stay visitors. | Missing item: production Chengdu card inside the live, licensed package. Promote only after visually checking that card and its labels on production. |
| HG-013 | DestinAsian | [Contributor guidelines](https://destinasian.com/contribute) · `editor@destinasian.com` | A possible luxury-travel angle is the design and time value of choosing the right gateway and first-night base, with the map only as supporting material. | Missing item: a real named author, short bio and relevant published clips, plus an original post-trip story idea under 100 words. Do not pitch an already-published article. |
| HG-017 | LTL Beijing | [Public Beijing contact page](https://ltl-beijing.com/) | Incoming language students need a clear Beijing airport, railway and first-night orientation, and the wider cards can help multi-campus travellers. | Missing item: a currently verified editorial/content recipient or submission route. General student-adviser contacts are not permission to send an editorial link pitch. |

### Hold — do not contact with the current package alone

| ID | Target | Public contact route | Why it is on hold | Promotion trigger |
|---|---|---|---|---|
| HG-018 | Hostelworld | [Contact page](https://www.hostelworldgroup.com/contact-us) · `corporate@hostelworld.com` | The public routes are press, corporate, affiliate and partnership channels; the ten-city map alone does not justify a cold corporate pitch. | A hostel-neighbourhood or anonymised traveller-friction dataset with a named editorial/press use case and a rechecked recipient. |
| HG-019 | THE Student | [Student contact page](https://www.timeshighereducation.com/student/contact-us) · `THEStudent@timeshighereducation.com` | Its contributor remit centres on advice by students, alumni, agents or university professionals; a general tourist map is not enough. | A genuine student/international-education author and a China arrival story that follows the current AI and contributor rules. |
| HG-020 | Expat Focus | [Contact page](https://www.expatfocus.com/contact) | The current asset is for first-trip travel decisions, while this audience prioritises relocation and long-term living. | A relocation-specific China gateway/housing-area asset backed by lived experience and current entry/residency sources. |
| HG-021 | GoAbroad | [Contact form](https://www.goabroad.com/contact) | Its core is meaningful travel and programme selection; the map lacks a programme/campus workflow and participant voice. | A student/programme arrival worksheet, verified programme examples and a contributor angle that fits current editorial guidance. |
| HG-023 | The World of Chinese | [Contact page](https://www.theworldofchinese.com/contact-us/) · `editor@theworldofchinese.com` | The publication's strength is language, culture and human-centred China reporting; a tactical transport map alone is too thin. | An original reported culture/language story with human sources in which movement between the ten cities is materially relevant. |
| HG-026 | Fodor's | [About and pitch route](https://www.fodors.com/about-us) | Its current writer process requires a distinct editorial pitch through the specified form; offering a published map by itself is not that pitch. | A genuinely original, locally reported story proposal that follows the current Google Form and pitching guidelines. |
| HG-027 | Travel Tomorrow | [Contact page](https://traveltomorrow.com/get-in-touch/) | The public page does not expose a clear editorial submission route, and the map currently lacks a timely European traveller or industry news peg. | A current named editor/channel plus a documented trend, policy change or original dataset relevant to its audience. |
| HG-028 | Nomadic Matt | [Public contact context](https://www.nomadicmatt.com/about-matt/) · `matt@nomadicmatt.com` | The brand stresses tested, first-hand and unsponsored budget advice; a schematic alone cannot establish on-the-ground cost or route performance. | First-hand route tests or an original budget/time-loss dataset that can be offered without sponsorship, freebies or generic guest-post language. |
| HG-030 | That's Shanghai / That's Beijing | [Publication site](https://www.thatsmags.com/) | The national map is broader than the city-edition editorial focus, and no current verified editorial submission route is recorded. | A Shanghai- or Beijing-specific correction/story hook plus a current editor or public editorial form verified on the day of contact. |

## Minimum manual message shape

This is a structure, not reusable copy:

1. One sentence proving the sender read a named current page.
2. One sentence describing the precise reader problem or correction.
3. One sentence explaining what the Homeground asset contains and what it does not claim.
4. One canonical link; add the ZIP/licence link only if reuse is relevant.
5. A low-pressure close such as “Use it if it is helpful; no reply is needed.”

Never add a service sales CTA to an editorial outreach message unless the recipient specifically asks what Homeground sells.

## Public-safe state updates

Allowed repository updates:

- status category;
- public contact route last checked date;
- prerequisite completed/failed;
- public URL of a published citation or correction;
- aggregate counts such as sent, replied, cited and declined, without message IDs or private text.

Not allowed in the repository:

- Gmail message/thread IDs;
- recipient personal data not deliberately published as a business/editorial contact;
- private replies, signatures or quoted email content;
- tracking pixels, open tracking or inferred personal behaviour;
- passwords, authentication state, cookies or account screenshots.
