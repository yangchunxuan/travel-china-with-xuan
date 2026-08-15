# Shenzhen Destination Hub — image plan

- **Review date:** 2026-08-15
- **Visual rule:** use real, attributable Shenzhen photography for all documentary city images. Do not generate a synthetic skyline, street, station, checkpoint, port or “future city” photograph.
- **Diagram rule:** the two relationship graphics may be original editorial SVGs because they explain planning structure rather than depict a documentary scene. They must be labelled “illustrative, not to scale.”
- **Asset status:** candidate selection only. Re-open each source page, download the original file, record the final derivative dimensions and confirm the licence immediately before ingestion.

## 1. Required visual set

| Slot | Asset type | Required purpose | Proposed treatment |
|---|---|---|---|
| Hero | Real Shenzhen photograph | Establish a modern waterfront city without reducing Shenzhen to a corporate slogan | Talent Park / Shenzhen Bay cityscape, wide responsive crop |
| Diagram A | Original editorial SVG | Explain Shenzhen’s east–west structure and the off-axis location of Dapeng and Shenzhen North | Linear structure diagram, not a geographic map |
| Diagram B | Original editorial SVG | Separate railway stations, checkpoints and Hong Kong counterparts | Node-and-edge relationship diagram with explicit “not the same place” labels |
| Place photo 1 | Real photograph | Futian civic/public-space cluster | Civic Center exterior |
| Place photo 2 | Real photograph | Electronics-trade street context | Huaqiangbei pedestrian street |
| Place photo 3 | Real photograph | Shekou port/reuse/waterfront identity | Sea World / Minghua setting |
| Place photo 4 | Real photograph | Luohu rail-border urban layer | Shenzhen Railway Station exterior |

This gives one real hero plus four real place photographs, within the requested 3–5 location-photo range.

## 2. Hero candidate

### H1 — Shenzhen Talent Park and the Shenzhen Bay skyline

- **Commons file:** `File:SHENZHEN TALENTS PARK.jpg`
- **Source page:** https://commons.wikimedia.org/wiki/File:SHENZHEN_TALENTS_PARK.jpg
- **Photographer:** Dinkun Chen
- **Source description:** own work
- **Capture date:** 1 December 2024
- **Original dimensions:** 8,192 × 5,464 px
- **Licence:** CC BY-SA 4.0
- **Why it fits:** the image presents skyline, park and water together. It communicates recent urbanism and public space without using a private-company campus or a generic electronics montage.
- **Editorial crop:** create a wide 16:9 or approximately 2:1 derivative with the skyline and waterfront retained. Do not crop so tightly that the image becomes only a tower panorama.
- **Suggested alt text:** `Shenzhen skyline seen across the water and landscaped paths of Talent Park.`
- **Suggested caption:** `Talent Park and the Shenzhen Bay skyline show the relationship between work districts, waterfront space and the modern city.`
- **Attribution line:** `Photo: Dinkun Chen / Wikimedia Commons, CC BY-SA 4.0. Cropped from the original.`
- **Licence action:** link the author/source and CC BY-SA 4.0; state that a crop was made; retain the same or a compatible licence for the derivative.

### Hero rejection rules

Reject a replacement hero when it:

- is an AI-generated or composited “future Shenzhen” scene;
- depicts only a logo, company headquarters or drone mock-up;
- is actually Hong Kong but labelled Shenzhen;
- relies on a night skyline so heavily processed that the documentary location is unclear;
- lacks a traceable creator, source file and reuse licence.

## 3. Original diagram A — Shenzhen’s east–west planning structure

### Editorial question

Why can a hotel or transport hub be “in Shenzhen” yet still create a long cross-city journey?

### Layout

Use a horizontal SVG with four main bands and one off-axis eastern branch:

```text
EAST                                                                                 WEST
Dapeng (separate full day)
   ↘
Luohu ───── Futian ───── Nanshan / Houhai ───── Shekou ───── Bao’an / SZX
 rail-border   civic +        tech + waterfront       port +         airport
 commercial    Huaqiangbei                              evening
                    ↑
          Shenzhen North (north of corridor)
```

### Production specification

- **Format:** hand-authored SVG or design-system vector; no map tiles, tracing or route-scraping.
- **Scale statement:** `Illustrative city structure — not to scale and not a journey-time map.`
- **Nodes:** Luohu, Futian, Nanshan/Houhai, Shekou, Bao’an/SZX, Shenzhen North and Dapeng.
- **Visual grammar:** one main east–west line; Shenzhen North above the line; Dapeng on a visibly separate far-eastern branch.
- **Do not imply:** exact distance, equal spacing, a single metro line, or that Dapeng is east of Luohu by only one ordinary urban segment.
- **Optional secondary labels:** Shenzhen Railway Station/Luohu Port under Luohu; Futian Railway Station and Futian Port as separate labels under Futian; Shenzhen Bay Port near western Nanshan; Airport Station under SZX.
- **Suggested alt text:** `Illustrative east-to-west structure of Shenzhen, with Luohu, Futian, Nanshan, Shekou and SZX on the main corridor, Shenzhen North to the north and Dapeng shown as a separate distant eastern outing.`
- **Caption:** `Shenzhen is long and polycentric. Dapeng and Shenzhen North do not sit on the same simple central sightseeing line.`
- **Source basis:** Shenzhen Government district, rail and metro information; diagram is an editorial abstraction.

## 4. Original diagram B — stations and checkpoints are separate nodes

### Editorial question

Which similarly named places are a railway station, a Mainland checkpoint or a Hong Kong control point?

### Layout

Use three vertical columns:

1. **Mainland rail / metro arrival**
2. **Shenzhen boundary facility**
3. **Hong Kong system after clearance**

Suggested core relationships:

```text
Futian Railway Station ───── train to ───── Hong Kong West Kowloon
          │
          └── NOT Futian Port

Shenzhen Metro Line 4 ── Futian Port ── Lok Ma Chau Spur Line ── East Rail

Shenzhen Railway Station ── adjacent walk ── Luohu Port ── Lo Wu ── East Rail
          │                                      │
          └──────────── NOT THE SAME NODE ───────┘

Road transport ── Huanggang Port (temporary facility at review) ── Lok Ma Chau road control point

Road transport ── Shenzhen Bay Port ── Shenzhen Bay Control Point

Road / pedestrian ── Liantang Port ── Heung Yuen Wai Control Point
```

### Production specification

- **Format:** original SVG; no photographic border imagery and no reproduced MTR/metro map.
- **Edge types:** `rail`, `walk/adjacent`, `boundary counterpart`, and `not the same place` must use different line styles and a legend.
- **Mandatory nodes:** Futian Railway Station, Futian Port, Shenzhen Railway Station, Luohu Port, Huanggang Port, Shenzhen Bay Port, Liantang Port, Hong Kong West Kowloon, Lok Ma Chau Spur Line, Lo Wu, Lok Ma Chau road and Heung Yuen Wai.
- **Dynamic label:** Huanggang note must read `temporary passenger facility at source-review date; recheck official opening status` rather than asserting a future opening date.
- **No operating hours inside the graphic:** hours change and should remain in maintained source data, not a long-lived image.
- **Suggested alt text:** `Relationship diagram separating Futian Railway Station from Futian Port, Shenzhen Railway Station from Luohu Port, and each Shenzhen checkpoint from its Hong Kong counterpart.`
- **Caption:** `Shared district names and adjacent buildings do not make a station and a checkpoint the same journey.`
- **Source basis:** Shenzhen Port Office, Hong Kong Immigration Department, Shenzhen Government rail/metro pages and MTR official information.

## 5. Real place photographs

### P1 — Futian Civic Center

- **Commons file:** `File:CIVIC CENTER, SHENZHEN (15).jpg`
- **Source page:** https://commons.wikimedia.org/wiki/File:CIVIC_CENTER,_SHENZHEN_(15).jpg
- **Photographer:** Dinkun Chen
- **Capture date:** 8 March 2025
- **Original dimensions:** 6,720 × 4,480 px
- **Licence:** CC BY-SA 4.0
- **Editorial purpose:** supports the Futian civic-scale section and balances the hero’s western waterfront viewpoint.
- **Suggested alt text:** `Shenzhen Civic Center and its broad public plaza in Futian.`
- **Suggested caption:** `Futian’s Civic Center cluster expresses the planned administrative and cultural scale of central Shenzhen.`
- **Crop note:** retain enough foreground/public realm to avoid turning the image into a decontextualised building portrait.
- **Attribution:** `Photo: Dinkun Chen / Wikimedia Commons, CC BY-SA 4.0. Cropped if applicable.`

### P2 — Huaqiangbei pedestrian street

- **Commons file:** `File:Huaqiangbei walking street.jpg`
- **Source page:** https://commons.wikimedia.org/wiki/File:Huaqiangbei_walking_street.jpg
- **Photographer:** Mx. Granger
- **Capture date:** 27 February 2019
- **Original dimensions:** 4,160 × 3,120 px
- **Licence:** CC0 1.0
- **Editorial purpose:** shows the public street context of the electronics-trade ecosystem rather than a product collage or brand promotion.
- **Suggested alt text:** `Pedestrians and shopfronts along Huaqiangbei walking street in Shenzhen.`
- **Suggested caption:** `Huaqiangbei is best understood as a street-and-market ecosystem of components, retail and repair—not one famous shop.`
- **Crop note:** preserve the street depth and signs; avoid zooming onto an identifiable shopper unless necessary.
- **Attribution:** attribution is not legally required by CC0, but editorial credit should still read `Photo: Mx. Granger / Wikimedia Commons, CC0 1.0.`

### P3 — Sea World, Shekou

- **Commons file:** `File:Sea World in Shekou Shenzhen2021.jpg`
- **Source page:** https://commons.wikimedia.org/wiki/File:Sea_World_in_Shekou_Shenzhen2021.jpg
- **Photographer:** Charlie fong
- **Capture date:** 7 February 2021
- **Original dimensions:** 4,130 × 2,323 px
- **Licence:** CC BY-SA 4.0
- **Commons assessment:** quality image
- **Editorial purpose:** anchors Shekou’s port, conversion and evening identity without implying that all of Nanshan is one waterfront complex.
- **Suggested alt text:** `The Minghua ship and surrounding waterfront development at Sea World in Shekou.`
- **Suggested caption:** `Shekou’s port history and later redevelopment give the western district a different rhythm from central Futian or Luohu.`
- **Crop note:** retain the Minghua ship and enough surrounding public space to establish location.
- **Attribution:** `Photo: Charlie fong / Wikimedia Commons, CC BY-SA 4.0. Cropped if applicable.`

### P4 — Shenzhen Railway Station, Luohu

- **Commons file:** `File:Shenzhen Railway Station (22249).jpg`
- **Source page:** https://commons.wikimedia.org/wiki/File:Shenzhen_Railway_Station_(22249).jpg
- **Photographer:** Rc1959
- **Capture date:** 27 December 2025 (EXIF date stated on Commons)
- **Original dimensions:** 3,000 × 4,000 px
- **Licence:** CC BY-SA 4.0
- **Editorial purpose:** makes Shenzhen Railway Station a visible, independent transport node in the Luohu story. The caption must not call it Luohu Port.
- **Suggested alt text:** `Exterior of Shenzhen Railway Station in Luohu.`
- **Suggested caption:** `Shenzhen Railway Station is a Mainland rail station in Luohu; the adjacent Luohu boundary checkpoint remains a separate process.`
- **Crop note:** portrait source can be used in a two-column module; do not force an extreme landscape crop that removes station identity.
- **Attribution:** `Photo: Rc1959 / Wikimedia Commons, CC BY-SA 4.0. Cropped if applicable.`

## 6. Optional fallback candidates

| Need | Candidate | Licence | Use only when |
|---|---|---|---|
| Wider Futian panorama | `File:LIANHUASHAN PARK, SHENZHEN.jpg` — https://commons.wikimedia.org/wiki/File:LIANHUASHAN_PARK,_SHENZHEN.jpg | CC BY-SA 4.0, Dinkun Chen | Civic Center source crop does not work responsively |
| Alternative Huaqiangbei image | `File:Huaqiangbei street.jpg` — https://commons.wikimedia.org/wiki/File:Huaqiangbei_street.jpg | CC BY-SA 4.0, ShiyuZW | A more recent image is editorially necessary and the lower resolution is acceptable |
| Shekou maritime context | `File:Shekou fishing harbor2021.jpg` — https://commons.wikimedia.org/wiki/File:Shekou_fishing_harbor2021.jpg | CC BY-SA 4.0, Charlie fong | The article needs working-harbour context rather than Sea World |
| Futian station interior | `File:Futian Train Station in Shenzhen.jpg` — https://commons.wikimedia.org/wiki/File:Futian_Train_Station_in_Shenzhen.jpg | CC0, Anthony Ivanoff | A station-specific explanatory inset is added later |

Do not add all fallbacks. The page should remain editorially selective rather than becoming a photo gallery.

## 7. Rights, truthfulness and production checklist

- [ ] Re-open every selected Commons file page on the actual download date.
- [ ] Confirm the file has not been deleted, relicensed, disputed or replaced.
- [ ] Download the original file; do not hotlink a thumbnail URL.
- [ ] Preserve creator, source-page URL, licence URL and modification statement in asset metadata or credits.
- [ ] For CC BY-SA derivatives, keep attribution, identify crops/edits and apply a compatible share-alike treatment.
- [ ] Keep factual alt text distinct from the more interpretive caption.
- [ ] Verify the photographed place independently; do not infer exact current operations from an image.
- [ ] Do not use a station image to illustrate a checkpoint or vice versa.
- [ ] Do not use a skyline from Hong Kong, Guangzhou or another city as Shenzhen.
- [ ] Do not use AI-generated documentary city imagery.
- [ ] Mark both diagrams `illustrative, not to scale` and keep volatile operating hours outside the SVG.
- [ ] Export responsive derivatives only after the final layout and focal point are known.
