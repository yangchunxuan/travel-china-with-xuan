# Guangzhou destination hub internal-link plan

**Base commit:** `cc6be75e59155935f321df0334588b52769eb6e4`
**Rule:** Link only to guide identities already present in the base repository with locale paths in published metadata. Do not link to the proposed Guangzhou destination URL until central implementation creates and approves it.

## 1. Required owner links

| Owner ID | Hub function | English | 简体中文 | 한국어 |
|---|---|---|---|---|
| `guangzhou-baiyun-airport-t2-t3` | Airport terminal, ground-access and wrong-terminal owner | `/guides/guangzhou-baiyun-airport-t2-t3/` | `/zh/guides/guangzhou-baiyun-airport-t2-t3/` | `/ko/guides/guangzhou-baiyun-airport-t2-t3/` |
| `guangzhou-hong-kong-transport-route` | Guangzhou–Hong Kong station, border and door-to-door owner | `/guides/guangzhou-hong-kong-transport-route/` | `/zh/guides/guangzhou-hong-kong-transport-route/` | `/ko/guides/guangzhou-hong-kong-transport-route/` |
| `guangzhou-macau-transport-route` | Guangzhou–Macao Zhuhai/Gongbei versus Hengqin owner | `/guides/guangzhou-macau-transport-route/` | `/zh/guides/guangzhou-macau-transport-route/` | `/ko/guides/guangzhou-macau-transport-route/` |
| `guangzhou-shenzhen-hong-kong-route-order` | Three-city order and Shenzhen-overnight owner | `/guides/guangzhou-shenzhen-hong-kong-route-order/` | `/zh/guides/guangzhou-shenzhen-hong-kong-route-order/` | `/ko/guides/guangzhou-shenzhen-hong-kong-route-order/` |
| `how-guangzhou-morning-tea-works` | Morning-tea culture, ordering and etiquette owner | `/guides/how-guangzhou-morning-tea-works/` | `/zh/guides/how-guangzhou-morning-tea-works/` | `/ko/guides/how-guangzhou-morning-tea-works/` |
| `when-metro-construction-meets-archaeology` | National urban-archaeology process owner | `/guides/when-metro-construction-meets-archaeology/` | `/zh/guides/when-metro-construction-meets-archaeology/` | `/ko/guides/when-metro-construction-meets-archaeology/` |

## 2. Supporting internal links

| Owner ID | Hub function | English | 简体中文 | 한국어 |
|---|---|---|---|---|
| `china-high-speed-train-first-time-guide` | National ticket, passport, security, luggage and boarding process | `/guides/china-high-speed-train-first-time-guide/` | `/zh/guides/china-high-speed-train-first-time-guide/` | `/ko/guides/china-high-speed-train-first-time-guide/` |
| `china-hotel-near-metro` | General method for testing a hotel’s real metro access | `/guides/china-hotel-near-metro/` | `/zh/guides/china-hotel-near-metro/` | `/ko/guides/china-hotel-near-metro/` |
| `china-last-night-before-international-flight` | Departure-city positioning and last-night buffer | `/guides/china-last-night-before-international-flight/` | `/zh/guides/china-last-night-before-international-flight/` | `/ko/guides/china-last-night-before-international-flight/` |

## 3. Placement plan

### Airport section

Use one contextual link after the current T1/T2/T3 summary:

- EN anchor: `Guangzhou Baiyun Airport T2 or T3`
- ZH anchor: `广州白云机场T2还是T3`
- KO anchor: `광저우 바이윈공항 T2·T3 가이드`

Do not add a second airport link inside every terminal row. The hub should establish the decision and route once.

### Railway section

Use:

- the Guangzhou–Hong Kong owner after explaining that Guangzhou South is the first search but Guangzhou East remains date-specific;
- the national high-speed rail guide after the five-station table, for passport, station-entry and boarding procedure.

Do not reproduce the national boarding checklist in the hub.

### Stay-area section

The current draft explains the five stay tasks directly. It may link once to `china-hotel-near-metro` in a future rendered module if the central editor wants an execution aid. The three language drafts currently keep the stay section focused and do not overlink every district.

### Food and culture section

Link once to `how-guangzhou-morning-tea-works` in the current-owner module. The Hub may state that morning tea is a reason to stay and a time-allocation factor; the owner keeps tea charges, ordering systems, dish vocabulary, etiquette and historical evidence.

### Archaeology context

Link once from Beijing Road/Yuexiu to `when-metro-construction-meets-archaeology`. The anchor should promise a process explanation, not imply that the page is a Guangzhou attraction guide.

### Greater Bay Area and next-stop section

Use:

- `guangzhou-shenzhen-hong-kong-route-order` for the order and Shenzhen-overnight decision;
- `guangzhou-hong-kong-transport-route` for the Guangzhou–Hong Kong execution choice;
- `guangzhou-macau-transport-route` for the Zhuhai/Gongbei versus Hengqin chain.

Do not link to Hong Kong or Macao as children of a Guangdong taxonomy.

### Departure FAQ

Use `china-last-night-before-international-flight` once in the late-arrival/early-departure answer. It supports the buffer decision without turning the hub into a general airport-risk article.

## 4. Anchor-text rules

- Prefer descriptive task anchors over “read more.”
- Match the destination spelling already used by the locale.
- Do not use identical anchor text for two different owners.
- Do not promise current fares, hours or inventory in the anchor.
- Do not use `Guangzhou travel guide` as anchor text for a supporting guide; that broad query belongs to the future destination hub.
- Keep each specialist owner to one or two meaningful links, not repeated links in every paragraph.

## 5. Paths excluded from this draft

Explicitly excluded:

- `/guides/guangzhou-travel-guide/`
- `/zh/guides/guangzhou-travel-guide/`
- `/ko/guides/guangzhou-travel-guide/`

Proposed but not linked because no public route is created here:

- `/destinations/guangzhou/`
- `/zh/destinations/guangzhou/`
- `/ko/destinations/guangzhou/`

Not created or linked:

- a Guangzhou restaurant ranking;
- a Canton Fair business manual;
- a Chimelong complete guide;
- a generic Greater Bay Area border guide;
- a second Guangzhou airport guide;
- one page per Guangzhou railway station.

## 6. Verification record

At the base commit, all nine selected guide identities have:

- an existing content folder;
- English, Simplified Chinese and Korean locale paths in metadata;
- a canonical-owner role consistent with the Search Map and existing article body;
- no proposed Guangzhou destination path as a dependency.

Before central publication, run one final deployed-site HTTP 200 sweep for all 27 locale URLs and fail implementation if any owner has been redirected, withdrawn or made non-indexable without a recorded replacement.
