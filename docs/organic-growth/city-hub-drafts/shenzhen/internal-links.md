# Shenzhen Destination Hub — internal-link plan and live-200 gate

- **Checked:** 2026-08-15
- **Draft rule:** a Markdown hyperlink may appear in the body only when the corresponding public Homeground route was independently retrievable at review time.
- **Required owner relationship:** all four Shenzhen owner slugs remain named in the three bodies even when their public links are withheld.
- **No self-link:** the proposed `/destinations/shenzhen/` route is not linked because it does not exist and must not become indexable from this draft.
- **Forbidden duplicate:** no `/guides/shenzhen-travel-guide/` link or page is proposed.

## 1. Hyperlinks currently present in the bodies

| Language | Internal URL | Public verification on 2026-08-15 | Body role | Decision |
|---|---|---|---|---|
| English | `/guides/is-your-china-itinerary-too-rushed/` | Public page retrieved with HTML content through the Homeground guide index | Counts hotel moves, border days and door-to-door transfers before adding Shenzhen | **Keep** |
| Simplified Chinese | `/zh/guides/is-your-china-itinerary-too-rushed/` | Public page retrieved through the English page’s Chinese language switcher | Same route-pacing handoff in Chinese | **Keep** |
| Korean | `/ko/guides/is-your-china-itinerary-too-rushed/` | Public page retrieved through the English page’s Korean language switcher | Same route-pacing handoff in Korean | **Keep** |

No other root-relative internal Markdown links remain in `hub.en.md`, `hub.zh.md` or `hub.ko.md`.

## 2. Required Shenzhen owners: named handoffs, links withheld

Repository evidence confirms the following current owners exist in `origin/main`. The public guide index retrieved on 2026-08-15 displayed 13 guides and did not expose these routes. Exact-slug web searches also did not return them. Container HTTP checks could not resolve the production host. Therefore, repository existence is not being misrepresented as a production HTTP 200.

| Required owner | Intended public route | Handoff location in hub | Current body treatment | Activation condition |
|---|---|---|---|---|
| `shenzhen-where-to-stay-futian-luohu-nanshan` | `/guides/shenzhen-where-to-stay-futian-luohu-nanshan/` plus `/zh/` and `/ko/` variants | Accommodation summary and “next decision” list | Owner slug appears as plain inline code; no hyperlink | Direct production request returns 200 for the language route and canonical response is correct |
| `shenzhen-hong-kong-transport-route` | `/guides/shenzhen-hong-kong-transport-route/` plus locale variants | Station/checkpoint section and “next decision” list | Owner slug appears as plain inline code; no hyperlink | Direct production request returns 200; route is not redirected to a generic page |
| `guangzhou-shenzhen-hong-kong-route-order` | `/guides/guangzhou-shenzhen-hong-kong-route-order/` plus locale variants | Guangzhou→Shenzhen→Hong Kong scenario and regional-route section | Owner slug appears as plain inline code; no hyperlink | Direct production request returns 200 for the intended locale |
| `shenzhen-low-altitude-city-infrastructure` | `/guides/shenzhen-low-altitude-city-infrastructure/` plus locale variants | Nanshan/Shekou experience section and “next decision” list | Owner slug appears as plain inline code; no hyperlink | Direct production request returns 200 and the published owner remains the specialist infrastructure page |

This is intentional. The draft preserves semantic ownership without inserting a link that has not passed the live-200 rule.

## 3. Anchor text to activate after the routes pass 200

Central integration should replace the inline owner references with natural-language anchors only after each public route is live.

| Owner | English anchor | Simplified Chinese anchor | Korean anchor |
|---|---|---|---|
| Accommodation | `Where to stay in Shenzhen: Futian, Luohu or Nanshan?` | `深圳住哪里：福田、罗湖还是南山？` | `선전 숙소 위치: 푸톈·뤄후·난산 중 어디가 맞을까?` |
| Shenzhen–Hong Kong transport | `Shenzhen to Hong Kong: which checkpoint or train?` | `深圳到香港：走哪个口岸或高铁？` | `선전–홍콩 이동: 어느 출입경 지점이나 열차를 이용할까?` |
| Regional order | `Guangzhou, Shenzhen and Hong Kong: which order works?` | `广州、深圳、香港怎样排顺序？` | `광저우·선전·홍콩은 어떤 순서가 맞을까?` |
| Low-altitude infrastructure | `How Shenzhen’s low-altitude services become city infrastructure` | `深圳低空服务怎样成为城市基础设施` | `선전의 저고도 서비스는 어떻게 도시 인프라가 되는가` |

Avoid anchors such as `Shenzhen travel guide`, `best Shenzhen attractions` or `China Silicon Valley`. They would blur the hub/owner boundary or replace a precise decision with a slogan.

## 4. Suggested body-to-owner relationships

| Source module in hub | Destination owner | Link reason | Cannibalisation guardrail |
|---|---|---|---|
| “Where to stay: choose the job of the base” | Accommodation owner | Move from city-level summary to exact hotel-area comparison | Hub does not compare individual hotels or repeat detailed station-to-hotel execution |
| “Stations and checkpoints that must never be merged” | Shenzhen–Hong Kong transport owner | Move from naming clarity to complete border journey | Hub does not reproduce step-by-step crossing instructions or maintain last-service tables |
| Guangzhou→Shenzhen→Hong Kong scenario | Regional-order owner | Decide whether Shenzhen earns a hotel in a three-city sequence | Hub does not become a second three-city itinerary |
| Nanshan/Shekou specialist note | Low-altitude infrastructure owner | Explain a narrow contemporary-city system | Hub does not repeat service/trial/target evidence tables or promise tourist flights |
| “One, two or three nights” and regional-route section | Itinerary pace owner | Test hotel moves and transfer-day cost | The pace owner remains national and reusable; the hub keeps the Shenzhen-specific conclusion |

## 5. Reverse-link recommendations for central review

These are recommendations only; this draft does not edit the existing owners.

| Existing owner | Suggested future reverse link | Rationale |
|---|---|---|
| Accommodation owner | Link `Should Shenzhen be in the trip at all?` to `/destinations/shenzhen/` after publication | Returns users from detailed area choice to the city-level decision |
| Shenzhen–Hong Kong transport owner | Link `Deciding whether to stay in Shenzhen` to the hub | Separates crossing execution from destination selection |
| Regional-order owner | Link `What Shenzhen adds as a stop` to the hub | Lets the route article remain focused on order and hotel changes |
| Low-altitude infrastructure owner | Link `General Shenzhen planning` to the hub | Prevents the specialist article becoming the broad city guide |

Do not add any reverse link until the destination hub has passed central review, has a final canonical route and returns HTTP 200.

## 6. Production-edge verification procedure

Run this after the four owners are deployed and again before merging the hub:

```bash
for locale in '' 'zh/' 'ko/'; do
  for slug in \
    shenzhen-where-to-stay-futian-luohu-nanshan \
    shenzhen-hong-kong-transport-route \
    guangzhou-shenzhen-hong-kong-route-order \
    shenzhen-low-altitude-city-infrastructure \
    is-your-china-itinerary-too-rushed; do
    url="https://homegroundchina.com/${locale}guides/${slug}/"
    curl --fail --silent --show-error --location \
      --output /dev/null \
      --write-out '%{http_code}\t%{url_effective}\t%{content_type}\n' \
      "$url"
  done
done
```

Acceptance criteria:

- final status is 200;
- final URL remains the intended Homeground route, not the homepage or a generic fallback;
- content type is HTML;
- page language and canonical/hreflang relationship are correct;
- the page is not a soft 404;
- the owner title and content match the intended task;
- only then convert the plain owner slug in the hub body into a Markdown link.

## 7. Current gate result

| Check | Result |
|---|---|
| Body contains only independently verified internal hyperlinks | **Pass** — three locale-specific itinerary-pace links only |
| Four required owners are connected semantically | **Pass** — each slug and ownership boundary appears in all three bodies |
| Four required owner links are active | **Blocked intentionally** — production 200 not independently established |
| Proposed hub links to itself | **No** |
| Forbidden `/guides/shenzhen-travel-guide/` link exists | **No** |
| Sitemap or registry changed to make a missing route discoverable | **No** |

Central review must not activate the four required owner links merely because the source directories exist. Live route verification is the final gate.
