# Source log — First 24 Hours in China system

- Policy/product sources accessed: **2026-08-20**
- Repository/production live state checked: **2026-08-21**
- Baseline: `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01`
- Ownership boundary: employee 4 / planning owns canonical First 24 Hours page
  execution; employee 6 / entry-practical owns source maintenance and the
  trilingual draft handoff only.
- Source rule: use an authority only for the exact fact it owns. An older
  government guide can be useful for a durable fallback while being stale for a
  later port count. Platform and device sources are primary only for their own
  product behavior, never for immigration or Customs law.
- Freshness note: the 2026-08-21 sync re-read repository and production state,
  not every policy/product source. The NIA arrival-card A-01/A-02
  publication-day source recheck remains pending; their truthful access date is
  2026-08-20. No form submission window or entry eligibility is inferred.

## Repository and publication state

1. [GitHub PR #74 — Complete SEO gap batch and synchronize Search Map](https://github.com/yangchunxuan/travel-china-with-xuan/pull/74)
   — checked again on 2026-08-21. Merged into `main` at
   `ef1898745a3c7a6e7cd308aa341c352f24fe9d01`. Its five production identities
   are `destination-zhangjiajie`, `china-online-arrival-card`,
   `zhangjiajie-national-forest-park-tickets-and-entrances`,
   `chongqing-railway-station-selector` and `destination-hangzhou`. All five ×
   EN/ZH/KO returned HTTP 200 with self-canonicals and appeared once in the live
   sitemap. The merged Search Map retains a stale pre-release
   `draft-submitted / not-published` snapshot; it is not current production
   evidence.
2. `origin/main@ef1898745a3c7a6e7cd308aa341c352f24fe9d01` — fetched
   2026-08-21 and used for repository identity. Live
   [sitemap.xml](https://homegroundchina.com/sitemap.xml) returned HTTP 200 with
   **649 unique URL records and no duplicate locations**. The arrival-card
   [EN](https://homegroundchina.com/guides/china-online-arrival-card/),
   [ZH](https://homegroundchina.com/zh/guides/china-online-arrival-card/) and
   [KO](https://homegroundchina.com/ko/guides/china-online-arrival-card/) pages
   each returned HTTP 200, `index, follow`, self-canonical and one sitemap
   record. Sitemap inclusion is discovery evidence, not a search-index or
   search-volume claim.

## Immigration, visas and arrival card

3. National Immigration Administration, [Beware of Fraudulent Websites for
   Arrival Card Filling](https://en.nia.gov.cn/n147418/n147463/c191530/content.html),
   published 2025-12-05, accessed 2026-08-20. Supports the official free
   channel, NIA host, fraud warning and port device/paper fallback.
4. National Immigration Administration, [Announcement on Implementing 10 New
   Measures](https://en.nia.gov.cn/n147418/n147468/c187308/content.html), published
   2025-11-03, accessed 2026-08-20. Supports the arrival-card start, seven
   exemption categories and the current 55-country/65-port 240-hour conditions
   recorded in that announcement. Must be re-opened on release day.
5. NIA Government Service Platform, [official online arrival-card
   service](https://s.nia.gov.cn/ArrivalCardFillingPC/), accessed 2026-08-20.
   Dynamic JavaScript interface; the live notice reviewed on that date showed
   an eighth exemption category beyond the seven in the dated 2025
   announcement. Preserve that distinction and do not freeze fields, errors,
   exemption counts or output format.
6. National Immigration Administration, [Visa-Free Transit
   Policies](https://en.nia.gov.cn/n147418/n147463/c183412/content.html),
   published 2025-07-04, accessed 2026-08-20. Current policy routing source;
   verify any later NIA notice before release.
7. Chinese Embassy in the UK, [Visa waiver for the UK and
   Canada](https://gb.china-embassy.gov.cn/eng/visa/notice/202602/t20260216_11860580.htm),
   published 2026-02-15, accessed 2026-08-20. UK-specific owner only.
8. Chinese Embassy in Canada, [Visa-free policy for Canada and the
   UK](https://ca.china-embassy.gov.cn/eng/zytz_0/202602/t20260216_11860601.htm),
   published 2026-02-15, accessed 2026-08-20. Canada-specific owner only.
9. Chinese Embassy in the United States, [Requirements and Procedures for
   Chinese Visa Application](https://us.china-embassy.gov.cn/eng/lsfw/zj/notice/202509/t20250920_11712385.htm),
   updated September 2025, accessed 2026-08-20. US application owner only; the
   responsible consular jurisdiction still controls an individual application.
10. Department of Consular Affairs, MFA, [China–Singapore mutual visa-exemption
    agreement](https://cs.mfa.gov.cn/lgk1/202401/t20240125_11233014.shtml),
    published 2024-01-25, accessed 2026-08-20. Singapore ordinary-passport
    owner only.

## Accommodation registration

11. National Immigration Administration via the State Council, [Online
    Accommodation Registration Service for Foreigners Residing or Staying in
    Domiciles Other Than Hotels](https://english.www.gov.cn/services/visitchina/202603/21/content_WS69ce124cc6d00ca5f9a0a368.html),
    updated 2026-03-21, accessed 2026-08-20. Supports hotel/non-hotel split,
    24-hour duty, online workflow, seven-region pilot and local window/police
    station/12367 recovery.
12. Ministry of Commerce and six departments, [Measures facilitating
    accommodation for overseas visitors](https://www.mofcom.gov.cn/zwgk/zcfb/art/2024/art_10ddb29858c24ece86b3f575bda1d9c4.html),
    accessed 2026-08-20. Controls the policy boundary; does not guarantee an
    individual booking or check-in.

## Customs and biosecurity

13. General Administration of Customs, [Customs Clearance Guide for
    International Passengers](https://english.customs.gov.cn/statics/88707c1e-aa4e-40ca-a968-bdbdbb565e4f.html),
    accessed 2026-08-20. Supports red/green selection and choosing red/asking
    when uncertain; check current item thresholds before reproducing them.
14. General Administration of Customs, [Customs clearance of passenger
    baggage](https://english.customs.gov.cn/statics/3a12c746-51e1-4d94-8fc1-44a573fad090.html),
    accessed 2026-08-20. Supports honest declaration and inspection regardless
    of lane.
15. Ministry of Agriculture and Rural Affairs / GACC, [Announcement No. 470 and
    current prohibited quarantine-object catalogue](https://xmsyj.moa.gov.cn/gjjlhz/202111/t20211102_6381054.htm),
    published 2021-11-02, accessed 2026-08-20. Catalogue owner; recheck for
    amendments and origin-specific controls.
16. GACC / State Council data mirror, [Customs Announcement No. 43 of
    2025](https://app.www.gov.cn/govdata/gov/202504/05/526129/article.html),
    accessed 2026-08-20. Current passenger declaration categories in the
    published channel owner.
17. General Administration of Customs, [current Chinese passenger baggage
    declaration guide](https://online.customs.gov.cn/static/pages/guides/000629014002/000629014002.html),
    accessed 2026-08-20. Supports no declaration form when nothing is
    declarable, the red channel when goods are declarable or uncertain, and
    the current official service path. Re-open on release day.
18. General Administration of Customs, [Order No. 276 on inbound and outbound
    passenger baggage quarantine](https://npc.chinaport.gov.cn/npcdeclhome/home/pages/notice/276%E5%8F%B7.html),
    effective 2025-04-01, accessed 2026-08-20; current-effect status
    cross-checked in the [MOFCOM policy database](https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=102126).
    This is the active quarantine-process owner and expressly repeals the older
    carried-item measure. It supports paper/electronic declaration and choosing
    red when uncertain, not an outcome promise for a particular item.

## Connectivity and payment

19. Ministry of Industry and Information Technology, [Telephone user real-name
    registration rules](https://sdca.miit.gov.cn/zwgk/fgbz/art/2026/art_9b270ddb59cc4643b0a9c6811c4e750d.html),
    republished 2026-03-23, accessed 2026-08-20. Supports identity registration
    and foreign passports as an accepted document category; does not promise
    stock, plan, activation or every outlet’s workflow.
20. State Council / Ministry of Commerce, [Guide to Working and Living in China
    (2025 edition)](https://english.www.gov.cn/2025special/bizexpatsinchina2025),
    accessed 2026-08-20. Supports operator-office SIM application, multiple
    payment methods and issuer/platform failure escalation. Its older 54/60
    transit summary is superseded by the later NIA source and must not be copied.
21. Apple Support, [Using eSIM while travelling in China
    mainland](https://support.apple.com/en-us/118227), accessed 2026-08-20.
    Exact-device/vendor evidence only; never generalize it to every phone,
    carrier, travel eSIM or roaming route.
22. People's Bank of China / State Council, [Opinions on improving payment
    services](https://www.pbc.gov.cn/en/3688253/3689006/5300530/2024032216572428952.pdf),
    accessed 2026-08-20. Supports coexisting mobile, card and cash methods and
    cash as a backstop; does not promise acceptance at every merchant.
23. State Council, [Guide to Payment Services in
    China](https://english.www.gov.cn/news/202408/22/content_WS66c71b3ec6d0868f4e8ea2b1.html),
    updated 2024-08-22, accessed 2026-08-20. General official navigation; live
    platform terms and errors still require same-week product checks.

## Airport and transfer sources

The Hub publishes no airport terminal, timetable, fare or pickup-zone fact.
Before release and before each trip, the exact airport, airline, rail/metro
operator and accommodation are the primary sources. If any narrower airport
owner is linked, its own source log and last review date control the claim.

## Conflict rule

When two official pages disagree, prefer the competent authority’s later,
more specific source; record the conflict and narrow the copy. Do not silently
average counts or choose the more convenient rule. If the current answer still
cannot be established, remove the conclusion, keep the official confirmation
path and traveller fallback, and mark the dynamic item blocked.
