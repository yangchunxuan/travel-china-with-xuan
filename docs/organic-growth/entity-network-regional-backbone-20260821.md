# Entity Network Regional Backbone — 2026-08-21

## Outcome

This batch connects the existing guide destination vocabulary to a reviewed first-level regional backbone. It does not publish a destination Hub, add a route, change a canonical URL, or create a new article identity.

| Coverage measure | Before | After |
|---|---:|---:|
| Controlled destination tokens | 11 | 36 |
| Guides with at least one unmapped destination token | 85 | 72 |
| Unique unmapped destination tokens | 142 | 117 |
| Compatibility country fallback | 40 | 7 |
| Country-only guides that still contain an unmapped local token | 50 | 10 |

The last two rows are different measures. `countryFallbackGuideCount` records how the compatibility resolver reached `country-china`; `countryOnlyWithUnmappedTokenCount` records the resulting semantic gap even when metadata explicitly contained `china`. After this batch, the 10 country-only local gaps comprise 7 compatibility fallbacks plus 3 records whose explicit China token previously hid the same problem.

## Scope

- Connected the six province-level entities already present in `core-places.json`.
- Added 17 province-level records and two special administrative region records required by current guide metadata.
- Kept all 19 new records at `review`; entity registration is not Hub publication approval.
- Moved destination-token ownership out of the freshness policy and into an exact, fail-closed registry.
- Added one official State Council source snapshot for first-level English names and administrative kinds.
- Kept unknown and ambiguous tokens visible. No fuzzy, transliterated, or inferred alias matching is allowed.
- Distinguished Shaanxi and Shanxi in Korean display names as well as in canonical IDs.

## Residual backlog

The remaining 117 tokens require lower-level entities, transport nodes, attractions, or a metadata decision. Eleven are explicitly ambiguous and must not be mapped one-token-to-one-entity without an owner decision: `baoshan`, `chaoyang`, `giant-buddha`, `huangshan`, `jingxian`, `jiuzhaigou`, `liangzhu`, `palace-museum`, `sanxingdui`, `shilin`, and `sunan`.

Strict entity coverage therefore remains intentionally red until the lower-level batches are completed. This batch must not weaken strict mode or reinterpret a partially mapped guide as complete.

## Release invariants

- Guide identities: unchanged at 176.
- Published destination Hubs: unchanged at 7.
- Published destination Hub locale URLs: unchanged at 21.
- Sitemap target: unchanged at 649 unique URLs.
- No new public destination route is authorized by an entity record.

## Source

- The State Council of the People's Republic of China, “Administrative Division,” official English first-level administrative division list: https://english.www.gov.cn/archive/china_abc/2014/08/27/content_281474983873401.htm (retrieved 2026-08-21).
