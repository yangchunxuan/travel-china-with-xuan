# Chengdu Destination Hub — internal-link plan

**Draft:** `city-hub-chengdu`
**Review baseline:** `cc6be75e59155935f321df0334588b52769eb6e4`
**Locale rule:** `hub.en.md`, `hub.zh.md` and `hub.ko.md` link to the equivalent locale whenever that locale is public. No locale falls back silently to English.
**Public-link gate:** only routes with exported HTML, a self-canonical, no `noindex` and a sitemap entry in the successful baseline GitHub Pages artifact are linked in traveller-facing copy.

## Verification method

GitHub Pages deployment run `31870273435` completed successfully from the requested baseline. Artifact `9243242244` was inspected locally. For every route used below, the audit confirmed:

- an exported `<route>/index.html` exists;
- the page has the expected self-canonical URL;
- the page does not contain a `noindex` robots directive;
- the canonical URL appears in `sitemap.xml`;
- EN, ZH and KO variants all pass the same test.

This check verifies the production artifact from the review baseline. It does not authorise the proposed Chengdu Hub path itself.

## Links used in all three Hub bodies

| Link role | English path in `hub.en.md` | Chinese path in `hub.zh.md` | Korean path in `hub.ko.md` | Placement | Owner boundary |
|---|---|---|---|---|---|
| Panda venue choice | `/guides/chengdu-panda-base-or-dujiangyan-panda-valley/` | `/zh/guides/chengdu-panda-base-or-dujiangyan-panda-valley/` | `/ko/guides/chengdu-panda-base-or-dujiangyan-panda-valley/` | City-panda section, regional-branch section and current-articles module | Owns exact venue identity, booking, gates, visitor rules and detailed comparison; Hub owns whether pandas belong in the city or Dujiangyan route |
| Chengdu greenway section | `/guides/chengdu-greenway-city-ring/` | `/zh/guides/chengdu-greenway-city-ring/` | `/ko/guides/chengdu-greenway-city-ring/` | City-itself section and current-articles module | Owns entry, surface, exit and practical segment design; Hub owns whether the greenway adds a useful contemporary-city layer |
| Sichuan opera context | `/guides/sichuan-opera-face-changing-with-context/` | `/zh/guides/sichuan-opera-face-changing-with-context/` | `/ko/guides/sichuan-opera-face-changing-with-context/` | City-itself section and current-articles module | Owns performance selection and interpretation; Hub owns the decision to protect one evening |
| Sanxingdui booking and route | `/guides/sanxingdui-museum-booking-and-gallery-order/` | `/zh/guides/sanxingdui-museum-booking-and-gallery-order/` | `/ko/guides/sanxingdui-museum-booking-and-gallery-order/` | Regional-branch section and current-articles module | Owns passport booking, official channel, Guanghan transfer and gallery order; Hub owns whether it is the chosen branch |
| Chengdu–Jiuzhaigou transport | `/guides/chengdu-jiuzhaigou-transport-route/` | `/zh/guides/chengdu-jiuzhaigou-transport-route/` | `/ko/guides/chengdu-jiuzhaigou-transport-route/` | Regional-branch section and current-articles module | Owns station, road handoff, flight and return execution; Hub owns the classification as an independent multi-day route |
| Beijing–Xi’an–Chengdu order | `/guides/beijing-xian-chengdu-route-order/` | `/zh/guides/beijing-xian-chengdu-route-order/` | `/ko/guides/beijing-xian-chengdu-route-order/` | Scenario 1 and current-articles module | Owns three-city gateway, direction and transfer-day calculation; Hub owns Chengdu’s city role and onward edges |
| Leshan land or boat | `/guides/leshan-giant-buddha-land-or-boat-visit/` | `/zh/guides/leshan-giant-buddha-land-or-boat-visit/` | `/ko/guides/leshan-giant-buddha-land-or-boat-visit/` | Regional-branch section and current-articles module | Owns current land/boat execution and recovery; Hub owns day-trip-versus-overnight classification |
| Natural planning entry | `/china-itinerary-review/` | `/zh/china-itinerary-review/` | `/ko/china-itinerary-review/` | Final planning handoff | Owns paid route review/build scope; Hub only identifies when a city-level decision has become a whole-route problem |

## Anchor-text audit

The anchors are descriptive and task-led. They do not use generic `click here`, do not imply a child article is the Hub itself, and do not repeat a single exact-match phrase unnaturally.

| Owner | EN anchor examples | ZH anchor examples | KO anchor examples |
|---|---|---|---|
| Panda choice | `Panda Base versus Panda Valley guide`; `Chengdu Panda Base or Dujiangyan Panda Valley` | `成都熊猫基地还是都江堰熊猫谷`; `场馆选择` | `청두 판다기지와 두장옌 판다밸리 비교`; `시설 선택` |
| Sanxingdui | `Sanxingdui booking and gallery-order guide` | `三星堆预约与展厅顺序` | `싼싱두이 여권 예약과 전시 관람 순서` |
| Jiuzhaigou | `Chengdu–Jiuzhaigou transport guide` | `成都到九寨沟交通` | `청두에서 주자이거우까지 교통` |
| Greenway | `Chengdu greenway guide` | `成都环城绿道怎么选一段` | `청두 순환 녹도 구간 고르는 법` |
| Sichuan opera | `Sichuan opera guide` | `第一次看川剧：别把变脸当成全部` | `처음 보는 천극: 변검이 전부는 아닙니다` |
| Route order | `Beijing–Xi’an–Chengdu route guide` | `北京、西安、成都路线顺序` | `베이징·시안·청두 여행 순서` |
| Leshan | `Leshan land-or-boat guide` | `乐山大佛游山还是游江` | `러산대불 육로와 유람선 선택` |
| Planning service | `China itinerary review and route-planning service` | `中国旅行路线审核与规划` | `중국 여행 일정 검토 및 동선 설계` |

## Page-to-owner handoff logic

### City-level decision stays in the Hub

The Hub answers:

- whether Chengdu belongs in a first China route;
- how city-only 2–3 nights differ from a 4–6-night Chengdu/Sichuan block;
- whether the traveller needs Chunxi Road/Taikoo Li, Tianfu Square, the People’s Park side or a transfer-first East-station hotel;
- how TFU and CTU differ spatially and why the live ticket controls;
- which railway station label must be confirmed;
- whether Dujiangyan, Guanghan, Leshan or Jiuzhaigou is a day branch, overnight branch or independent route;
- how Chengdu connects to Chongqing and Xi’an.

### Execution moves to the child owner

The child link appears when the reader needs:

- a real-time booking, gate, station, transfer, ticket or return procedure;
- a venue-versus-venue comparison;
- a gallery sequence, performance-reading method or greenway route;
- a route-order calculation across several named cities.

The Hub must not duplicate those procedures simply to make the page longer.

## Routes deliberately not linked

- `/guides/chengdu-travel-guide/` — forbidden duplicate; does not exist and must not be created.
- `/destinations/chengdu/`, `/zh/destinations/chengdu/`, `/ko/destinations/chengdu/` — proposed Hub paths; not public at the review baseline and therefore never self-linked from this draft.
- Airport, railway-station or accommodation-area URLs that are only proposed entities — the Hub explains them directly until a reviewed public owner exists.
- Search-result, booking-platform, map-query and arbitrary filtered URLs — not stable canonical content targets.
- External official sources — recorded in `source-log.md`, not inserted as competing navigation inside the Hub copy.

## Future inbound-link candidates for central review

These are proposals only. This patch does not edit the source pages.

| Source owner | Suggested inbound context | Suggested anchor purpose |
|---|---|---|
| `chengdu-panda-base-or-dujiangyan-panda-valley` | Its final route-choice section | Return to the city-level question of how many Chengdu nights to protect |
| `sanxingdui-museum-booking-and-gallery-order` | Chengdu departure or onward-route section | Explain whether Sanxingdui should replace a city day or extend the stay |
| `chengdu-jiuzhaigou-transport-route` | Before booking the Chengdu departure | Separate the Chengdu city stay from the independent Jiuzhaigou segment |
| `chengdu-greenway-city-ring` | “Does this add to a first visit?” section | Return to the broad Chengdu experience mix |
| `sichuan-opera-face-changing-with-context` | Performance-location planning | Return to city-night and hotel-area decisions |
| `beijing-xian-chengdu-route-order` | Chengdu night-allocation block | Open the Chengdu Hub for city-versus-Sichuan depth |
| `leshan-giant-buddha-land-or-boat-visit` | Chengdu return or overnight decision | Compare a Leshan day trip with a wider Sichuan route |

No inbound edit should be made until the Hub receives canonical and publication approval.

## Locale-parity result

Each locale Hub contains the same eight link roles. EN links stay in EN, ZH links use `/zh/`, and KO links use `/ko/`. The links occur in equivalent editorial sections even when sentence order differs for natural language. All draft-document references use `hub.en.md`, `hub.zh.md` and `hub.ko.md`.
