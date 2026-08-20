# Stay-network source audit — 2026-08-20

Checked in Asia/Shanghai on 2026-08-20. This ledger distinguishes “URL opened”
from “every fact on a page re-reviewed”. A page-level `sourceReviewedDate` may
move only after its complete factual source set and affected claims are checked.

## Foreign-guest booking, registration and refusal recovery

All seven official URLs below reopened successfully on 2026-08-20:

| Claim role | Official source | What it supports | What it does not prove |
| --- | --- | --- | --- |
| National accommodation facilitation rule | [Ministry of Commerce seven-department circular](https://www.mofcom.gov.cn/zwgk/zcfb/art/2024/art_10ddb29858c24ece86b3f575bda1d9c4.html) | authorities/platforms should not use a supposed reception qualification as a barrier; platforms/operators should not unlawfully publish non-acceptance information; complaint/consultation roles | that every booking will execute correctly, a room exists or a platform label is law |
| Official English summary | [State Council English site](https://english.www.gov.cn/news/202407/26/content_WS66a2d827c6d0868f4e8e975c.html) | accessible English summary of the 2024 measures | a replacement for the controlling Chinese circular or property confirmation |
| Hotel versus non-hotel registration | [National Immigration Administration interpretation](https://www.nia.gov.cn/n741440/n741577/c1771556/content.html) | hotels register hotel stays; traveller/host registration within 24 hours applies outside hotels; listed 2026 online pilot geography | that the non-hotel pilot is a hotel check-in route or nationwide |
| Local example | [Beijing Municipal Government registration guide](https://english.beijing.gov.cn/livinginbeijing/applicationfordocuments/202107/t20210719_2439278.html) | local explanation of hotel/non-hotel registration | a nationwide operational promise or another city's procedure |
| Consumer complaint route | [State Administration for Market Regulation](https://www.samr.gov.cn/hd/xfzn/art/2022/art_9d22351e9bee4da38b89c15e843207b4.html) | 12315 complaint direction | refund, compensation or price-difference outcome |
| Non-emergency versus police emergency | [State Council guidance mirrored by Beijing](https://www.beijing.gov.cn/zhengce/gwywj/202205/t20220516_2711529.html) | 12345/110 boundary | that every lodging dispute is an emergency |
| Official-response corroboration | [Xinjiang Department of Culture and Tourism mirror](https://wlt.xinjiang.gov.cn/wlt/xytx/202406/1ee6037434084d3ab23d68b7df174b4d.shtml) | government-hosted report of the official response against refusal for lack of “foreign-related qualification” | replacement for the primary circular or a property-level guarantee |

**Result:** PR #74 records the same 2026-08-20 reopen event in
`foreigners-china-hotel/source-log.md`, while its metadata factual-review date
had remained 2026-08-13. This branch confirmed the log after replaying onto
`ef189874` and aligned the metadata to 2026-08-20. Legal rule, platform display
and property execution remain separate.

Recheck triggers: amendment/replacement of the 2024 measures; NIA pilot
expansion; changes to 12367/12345/12315 routes; local registration changes; the
named property's current check-in process and staffed arrival window.

## Accessible-room verification

The following official/official-hosted sources reopened successfully on
2026-08-20:

- [Accessible Environment Development Law — China Disabled Persons' Federation](https://www.cdpf.org.cn/ztzl/zxzt1/2024/cjrqybzflfggzxxgkxt/xfjfl/lfstl/dbcd52526ef14aa0ba649e7feb25a18d.htm)
- [GB 55019-2021 text — Huai'an Disabled Persons' Federation](https://cl.huaian.gov.cn/col/8349_118464/art/w/17144928/1715582990210UdXHUSlL.html)
- [Mandatory-code implementation announcement — Beijing/MOHURD mirror](https://www.beijing.gov.cn/zhengce/zhengcefagui/qtwj/202204/t20220412_2674451.html)
- [GB/T 47543-2026 hotel accessible-tourism service record — National Public Service Platform for Standards Information](https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=11FB862766387228085E1B8F974590D7)
- [Accessibility-law and construction-standard implementation — China Disabled Persons' Federation](https://www.cdpf.org.cn/xwzx/clyw2/5536a8ea36af499c8c4196f18aa6815e.htm)
- [2026 practical-usability reporting — China Disabled Persons' Federation](https://www.cdpf.org.cn/xwzx/dfdt1/2fc60d439f794270856a7f5d697ee897.htm)

These sources support the legal/standard context and the editorial need to test
actual usability. They do not prove that a named hotel's advertised room, the
assigned room or the entire street-to-bathroom chain works for one traveller.
Exact measurements, dated photos and current property confirmation remain
necessary. The Commons hero-rights record was not part of this factual recheck,
so its image-credit date must not be silently changed.

## Last night before an international flight

This was a **partial**, not page-complete, recheck:

- Air China's conditions page reopened;
- China Railway 12306 FAQ/query pages reopened;
- Beijing Capital International Airport's ground-transport page reopened;
- the Shanghai Airport Authority page did not return a usable page in this
  check;
- the Cathay Pacific separate-ticket source was not included in the official-
  source recheck set for this policy-sensitive network audit.

Therefore `china-last-night-before-international-flight` must retain its
existing page-level `sourceReviewedDate` until every factual source and affected
claim is reopened. A source log may record the partial check without implying a
full factual refresh.

The decision framework remains conditional: exact airport/terminal, protected
versus separate contract, baggage process, carrier deadlines, traveller
execution ability and the last workable fallback. No source proves a fixed
airport-hotel recommendation, permanent timetable, live price or availability.

## City Hub facts

This branch adds conditional decision copy and links to five established Hubs;
it does not reopen every transport, attraction and gateway source already cited
by those Hubs. Consequently:

- update `dateModified` for changed copy;
- retain each existing `sourceReviewedDate`;
- do not interpret a newly linked national owner as a fresh review of all city
  transport operations;
- recheck airport code/terminal, station identity, metro operation, construction
  and scenic-gate arrangements when applying the matrix to a real trip.

Hangzhou and Zhangjiajie runtimes were integrated by PR #74. Their public-route
and Search Map release state were not independently verified in this audit.

## Evidence hierarchy

1. national/local official source for policy, registration, transport, airport,
   station, scenic-gate and public-safety facts;
2. named property/group written confirmation for current property facts;
3. booking platform display as dated transaction evidence only;
4. forums/reviews for discovering questions and failure modes, never as the
   final authority for policy, registration, accessibility or hotel operation.

Every dynamic source record needs: claim ID, publisher, URL, source class,
reviewed-at date, effective window if known, recheck trigger and a statement of
what it does not prove.
