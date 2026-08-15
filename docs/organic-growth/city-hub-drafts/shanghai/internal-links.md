# Shanghai Destination Hub internal-link plan

- Artifact status: central review required
- Reviewed repository base: `origin/main@cc6be75e59155935f321df0334588b52769eb6e4`
- Proposed hub paths: `/destinations/shanghai/`, `/zh/destinations/shanghai/`, `/ko/destinations/shanghai/`
- Forbidden duplicate: `/guides/shanghai-travel-guide/`
- Ownership rule: the Hub answers broad Shanghai choice questions; airport, hotel-area, Disney and regional execution remain with their existing canonical owners.

## Outbound links placed in the three locale drafts

| Owner | English anchor and path | Chinese anchor and path | Korean anchor and path | Hub placement | Boundary protected |
| --- | --- | --- | --- | --- | --- |
| `shanghai-pudong-or-hongqiao-airport` | [Pudong or Hongqiao airport for Shanghai](/guides/shanghai-pudong-or-hongqiao-airport/) | [浦东机场还是虹桥机场](/zh/guides/shanghai-pudong-or-hongqiao-airport/) | [상하이 푸둥공항과 훙차오공항 선택 가이드](/ko/guides/shanghai-pudong-or-hongqiao-airport/) | Airport section and owner handoff list | Hub explains how airport geography changes the trip; owner keeps terminal-level execution and current services. |
| `shanghai-where-to-stay-first-trip` | [Shanghai first-trip accommodation guide](/guides/shanghai-where-to-stay-first-trip/) | [第一次去上海住哪里](/zh/guides/shanghai-where-to-stay-first-trip/) | [첫 상하이 여행 숙소 지역 가이드](/ko/guides/shanghai-where-to-stay-first-trip/) | Accommodation section and handoff list | Hub assigns a job to each broad area; owner keeps detailed hotel-area selection. |
| `pudong-airport-to-shanghai-disneyland` | [PVG-to-Shanghai-Disneyland guide](/guides/pudong-airport-to-shanghai-disneyland/) | [浦东机场到上海迪士尼](/zh/guides/pudong-airport-to-shanghai-disneyland/) | [PVG에서 상하이 디즈니랜드 가는 법](/ko/guides/pudong-airport-to-shanghai-disneyland/) | Disney/outer-city cluster and handoff list | Hub treats Disney as a separate task; owner keeps the luggage and transfer sequence. |
| `shanghai-24-hour-parks-reality-check` | [Shanghai 24-hour parks reality check](/guides/shanghai-24-hour-parks-reality-check/) | [上海24小时公园核查](/zh/guides/shanghai-24-hour-parks-reality-check/) | [상하이 24시간 공원 현실 확인](/ko/guides/shanghai-24-hour-parks-reality-check/) | Outer-city/late-access caution and handoff list | Hub warns that all-night claims are dynamic; owner keeps park-by-park evidence. |
| `shanghai-hangzhou-transport-route` | [Shanghai–Hangzhou station and route guide](/guides/shanghai-hangzhou-transport-route/) | [上海—杭州交通与站点选择](/zh/guides/shanghai-hangzhou-transport-route/) | [상하이–항저우 교통과 역 선택](/ko/guides/shanghai-hangzhou-transport-route/) | Railway section and handoff list | Hub says the station pair matters; owner keeps the detailed transport selector. |
| `shanghai-suzhou-hangzhou-nanjing-route-order` | [Shanghai–Suzhou–Hangzhou–Nanjing route-order guide](/guides/shanghai-suzhou-hangzhou-nanjing-route-order/) | [上海、苏州、杭州、南京怎样排序](/zh/guides/shanghai-suzhou-hangzhou-nanjing-route-order/) | [상하이–쑤저우–항저우–난징 노선 순서](/ko/guides/shanghai-suzhou-hangzhou-nanjing-route-order/) | Railway/regional decision and handoff list | Hub gives the day-trip/next-city judgment; owner keeps the full regional comparison. |
| `yangshan-automated-port-explained` | [Yangshan automated-port explainer](/guides/yangshan-automated-port-explained/) | [洋山自动化码头如何运转](/zh/guides/yangshan-automated-port-explained/) | [양산 자동화항 설명](/ko/guides/yangshan-automated-port-explained/) | Outer-city boundary and handoff list | Hub states that the working port is controlled; owner keeps technical and access evidence. |
| `beijing-zhangjiajie-shanghai-transport` | [Beijing–Zhangjiajie–Shanghai transport guide](/guides/beijing-zhangjiajie-shanghai-transport/) | [北京—张家界—上海交通](/zh/guides/beijing-zhangjiajie-shanghai-transport/) | [베이징–장자제–상하이 교통 가이드](/ko/guides/beijing-zhangjiajie-shanghai-transport/) | China-route start/end section and handoff list | Hub applies the door-to-door principle; owner keeps the dated multimodal calculation. |
| Planning entry | [China itinerary review and route-planning entry](/china-itinerary-review/) | [中国行程点评与路线规划入口](/zh/china-itinerary-review/) | [중국 일정 검토와 노선 설계](/ko/china-itinerary-review/) | Final owner handoff list | This is the natural-planning conversion path, not a substitute for destination information. |

Each locale uses its own localized route. No English-locale link is inserted into the Chinese or Korean body.

## Public `200` gate

A destination draft may contain only links that return a public `200` when the runtime page is merged. Repository presence alone is not a substitute for the final HTTP check.

| Route family | Evidence available on 2026-08-15 | Merge-gate status |
| --- | --- | --- |
| `beijing-zhangjiajie-shanghai-transport` | English production page directly opened in the public web review; localized production implementation present on reviewed main | Direct English page confirmed; recheck all three locale URLs before merge |
| `shanghai-hangzhou-transport-route` | Exact public result surfaced during review; localized production implementation present on reviewed main | Recheck all three locale URLs immediately before merge |
| `shanghai-suzhou-hangzhou-nanjing-route-order` | Exact public result surfaced during review; localized production implementation present on reviewed main | Recheck all three locale URLs immediately before merge |
| `/china-itinerary-review/` | English production page directly opened; localized routes implemented | Recheck localized URLs before merge |
| Airport, stay, Disney, 24-hour parks and Yangshan owner families | Published metadata and localized bodies are present on reviewed main, but the external crawler did not surface every new direct URL | **Open release gate:** run direct HTTP checks; any non-`200` link must remain out of the rendered Hub until its owner is live |
| Proposed `/destinations/shanghai/` family | Draft proposal only; no runtime route exists on reviewed main | Not linked from any body copy |

The markdown bodies contain the required owner connections for central review. They are not authorised for publication until the direct `200` smoke test passes. This limitation is recorded again in `qa.md`; it is not hidden behind repository metadata.

## Recommended inbound links after the Hub route exists

These are recommendations only. This draft does not edit any owner file, registry, sitemap or template.

| Source owner/page | Recommended localized anchor concept | Best placement | Reason |
| --- | --- | --- | --- |
| `shanghai-pudong-or-hongqiao-airport` | “Plan the rest of your first Shanghai stay” | After the airport decision summary | Returns readers from terminal execution to days, areas and onward-city decisions. |
| `shanghai-where-to-stay-first-trip` | “See the complete Shanghai first-trip decision” | After the area comparison | Prevents the lodging page from becoming an isolated city overview owner. |
| `pudong-airport-to-shanghai-disneyland` | “Count Disney separately from your Shanghai city days” | After the transfer options | Connects execution back to night allocation and city structure. |
| `shanghai-24-hour-parks-reality-check` | “Build a realistic Shanghai city plan” | In related planning | Moves readers from one dynamic claim to the broader visit. |
| `shanghai-hangzhou-transport-route` | “Should Hangzhou be a day trip or the next base?” | Before the final planning CTA | Routes broad intent to the Hub while preserving station-pair ownership. |
| `shanghai-suzhou-hangzhou-nanjing-route-order` | “Start with the Shanghai city hub” | In the Shanghai section or related reading | Establishes the Hub as the broad Shanghai entity entry. |
| `yangshan-automated-port-explained` | “What belongs in a first Shanghai visit?” | In related reading | Makes clear that industrial interest is separate from the central first-trip plan. |
| `beijing-zhangjiajie-shanghai-transport` | “How many complete Shanghai days should remain?” | In the Shanghai arrival section | Converts transport arithmetic into destination-day allocation. |
| Future Suzhou, Hangzhou and Nanjing hubs | “Shanghai as previous/next city” | Their route-connection modules | Builds reciprocal city-entity edges without copying regional guides. |

## Anchor and ownership rules

- Use descriptive anchors that state the decision; avoid repeated “click here” or exact-match keyword stuffing.
- The first contextual link should appear where the reader’s question arises. The final handoff list may repeat the same owner once for scanability.
- Do not link the Hub to itself.
- Do not create `/guides/shanghai-travel-guide/` as a fallback.
- Do not make the airport guide own “how many days,” make the accommodation guide own the whole city, or make the regional-order guide own Shanghai’s central spatial explanation.
- Do not link to future Shanghai East or Baoshan station pages as if those stations were operational.
- Dynamic transport and venue claims should point to the owner or official operator rather than receive a second detailed implementation inside the Hub.

## Link-count check in the draft bodies

Expected unique internal destination targets per locale:

1. airport owner;
2. accommodation owner;
3. Disney transfer owner;
4. 24-hour parks owner;
5. Shanghai–Hangzhou owner;
6. regional route-order owner;
7. Yangshan owner;
8. Beijing–Zhangjiajie–Shanghai transport owner;
9. itinerary review/planning entry.

The intended count is nine unique internal targets in each locale. Repeated contextual and handoff links to the same owner do not create a new target.
