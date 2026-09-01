# Homeground Employee 3 SEO Batch Manifest

- Batch: `employee-3-seo-batch-20260901`
- Prepared: 2026-09-01 (Asia/Shanghai)
- Base audited: `origin/main` at `c13d83e1abc8f5f25ee2250de11eed8c424a0196`
- Working branch: `article/worker-3-seo-batch-20260901`
- Scope: Culture / Food / Local Understanding
- Status: six canonical owners selected; production proceeds one article at a time.

## Research method and limits

The candidate audit covered the current Search Map, guide registry, all culture metadata on the audited `origin/main`, and all fetched unmerged `origin/article/*` and `origin/codex/*` refs. Current query-shaped Google result pages, visible related questions, and recent traveler discussions were used to identify tasks; forums were used only to establish what travelers ask, never to prove a rule, safety claim, venue schedule, price, or historical fact. The interactive Google panel was intermittently unavailable in the local browser, so this manifest does **not** claim a complete People Also Ask census. Search-result observations are directional and dated 2026-09-01; no search volume, click-through rate, or purchase probability is inferred.

Dynamic food-safety, venue, admission, passport, photography, subtitle, and performance facts require an official source check on the article's preparation date. If a dynamic claim cannot be closed, the article will narrow the claim or tell the traveler to recheck; it will not guess.

## Selected production order

1. `w3-seo-0901-01` — Chongqing hotpot: first-order workflow.
2. `w3-seo-0901-02` — Xi'an yangrou paomo: first-bowl workflow.
3. `w3-seo-0901-03` — Beijing Peking Opera: first-performance choice.
4. `w3-seo-0901-04` — Yunnan wild-mushroom hotpot: safe ordering and recovery.
5. `w3-seo-0901-05` — Chengdu Wuhou Shrine: history/literature/memorial reading route.
6. `w3-seo-0901-06` — China National Silk Museum: cocoon-to-conservation route.

This order deliberately alternates task shapes after the first two food workflows. Each identity must complete research, EN/ZH/KO copy, targeted checks, traveler blind review, SEO/technical adversarial review, P1/P2 fixes, re-review, and an atomic commit before the next identity starts.

## Candidate ledger

### 1. Chongqing hotpot — selected, rank 1

- `candidateId`: `w3-seo-0901-01`
- `workingTitle`: **Chongqing Hotpot for First-Timers: Choose a Pot, Order Portions and Cook Safely**
- `action`: new page
- `targetIntent`: execute a first Chongqing hotpot meal without over-ordering, unsafe cooking, or an unrecoverably spicy pot
- `queryCluster`: `how to order Chongqing hotpot`; `Chongqing hotpot for one`; `what to put in Chongqing hotpot`; `Chongqing hotpot spice level`; `how long to cook hotpot meat`
- `demandEvidence`: Current search results and recent traveler threads repeatedly ask about eating alone, half portions, spice, offal, allergens, and how to know when ingredients are cooked. These are concrete unresolved meal tasks, not generic interest in Sichuan food.
- `SERP gap`: Existing results lean toward restaurant lists or ingredient explainers. Few combine pot choice, portion control, cooking sequence, cross-contamination avoidance, bill reading, and failure recovery while distinguishing Chongqing red-oil hotpot from other regional styles.
- `existingOwner`: None. `beijing-copper-pot-mutton-ordering-workflow` explicitly owns Beijing copper-pot mutton and leaves Sichuan/Chongqing hotpot to a future owner; `first-shared-meal-in-china` owns generic shared-meal flow.
- `cannibalizationRisk`: low if the page owns only Chongqing red-oil hotpot execution and links outward for generic shared-meal etiquette
- `primaryEntityIds`: `food-format:chongqing-hotpot`, `place:chongqing`
- `secondaryEntityIds`: `ingredient:beef-tripe`, `service:hotpot-restaurant`, `concept:shared-pot`
- `section`: `culture`
- `collection`: `culture-regional-food`
- `freshnessClass`: `high-on-food-safety-or-standard-change`
- `sourceReadiness`: high — Chongqing ICH listing, current food-operation standards, local gazette context, and current market-regulator safety guidance are available
- `informationGain`: A table-side decision path that connects local format to portions, pot zones, cooking safety, and recovery; it is not a restaurant ranking.
- `decision`: **GO**

### 2. Xi'an yangrou paomo — selected, rank 2

- `candidateId`: `w3-seo-0901-02`
- `workingTitle`: **Xi'an Yangrou Paomo: Break the Bread, Order the Bowl and Read the Ritual**
- `action`: new page
- `targetIntent`: order one bowl correctly, choose a bread-breaking option and portion, use the accompaniments, and understand what part of the experience is local practice rather than a tourist performance
- `queryCluster`: `how to eat yangrou paomo`; `how to order paomo Xi'an`; `break bread paomo`; `yangrou paomo beef or lamb`; `Xi'an paomo first time`
- `demandEvidence`: Current traveler questions ask what the dish is, whether diners must tear the bread themselves, how small the pieces should be, what to order if lamb is unsuitable, and whether one bowl is too large.
- `SERP gap`: Many pages retell origin legends or list famous shops. They rarely separate documented Hui dining context, shop-specific service choices, the practical bowl workflow, and the fact that not every shop enforces one identical bread-breaking ritual.
- `existingOwner`: None. `china-regional-food-route` is a national route selector and does not own a table-level Xi'an paomo task.
- `cannibalizationRisk`: low
- `primaryEntityIds`: `dish:yangrou-paomo`, `place:xian`
- `secondaryEntityIds`: `community:hui`, `food-format:bread-and-broth`, `institution:tongshengxiang`
- `section`: `culture`
- `collection`: `culture-regional-food`
- `freshnessClass`: `medium-on-standard-or-service-change`
- `sourceReadiness`: high — Xi'an gazette material, commerce-ministry old-brand records, city food guidance, and local standard material are available; folklore within standards will not be promoted to history
- `informationGain`: A first-bowl decision and eating sequence with shop-variation boundaries, portion recovery, and source-layered cultural context.
- `decision`: **GO**

### 3. Beijing Peking Opera — selected, rank 3

- `candidateId`: `w3-seo-0901-03`
- `workingTitle`: **Peking Opera in Beijing: Choose a Tourist Highlights Show or a Full Repertoire Performance**
- `action`: new page
- `targetIntent`: choose a credible first Beijing performance and know what to watch before, during, and after it
- `queryCluster`: `where to see Peking Opera in Beijing`; `Peking opera worth it`; `Peking opera English subtitles`; `tourist Peking opera vs full show`; `Beijing opera first time`
- `demandEvidence`: Current results surface repeated traveler questions about venue choice, tourist showcases versus full plays, subtitles, duration, ticket purchase, and whether a short highlights show is "real" opera.
- `SERP gap`: Commercial venue and ticket pages dominate. They do not reliably teach readers how to verify a named troupe and programme, distinguish excerpts from a full repertoire production, or recover when subtitles, dates, or seats are unavailable.
- `existingOwner`: None. Other performance owners cover Nanyin, puppetry, Sichuan opera, long song, Dixi, lion dance, and Yingge, not Jingju.
- `cannibalizationRisk`: low; structural similarity to other first-performance workflows is acceptable because the art form, verification signals, and venue choice are distinct
- `primaryEntityIds`: `performing-art:jingju`, `place:beijing`
- `secondaryEntityIds`: `institution:beijing-jingju-theatre`, `institution:ncpa`, `venue:liyuan-theatre`
- `section`: `culture`
- `collection`: `culture-festivals-arts-contemporary`
- `freshnessClass`: `critical-on-programme-or-venue-rule-change`
- `sourceReadiness`: medium-high — UNESCO and national ICH evidence are stable; Beijing theatre and government calendars provide current programmes, but no fixed subtitle, schedule, or photography promise will be made
- `informationGain`: A verification-led choice between excerpt showcases and full repertoire, followed by a scene-reading timeline and no-show/subtitle recovery.
- `decision`: **GO WITH DYNAMIC CLAIM GATE** — publish only evergreen selection logic; current examples must be dated and recheckable

### 4. Yunnan wild-mushroom hotpot — selected, rank 4

- `candidateId`: `w3-seo-0901-04`
- `workingTitle`: **Yunnan Wild-Mushroom Hotpot: Order Safely Without Guessing What Is Edible**
- `action`: new page
- `targetIntent`: choose a responsible restaurant meal, follow the kitchen's cooking control, avoid unsafe identification or mixing, and respond correctly to symptoms
- `queryCluster`: `Yunnan mushroom hotpot safe`; `wild mushroom hotpot Kunming how to eat`; `how long cook Yunnan mushrooms`; `mushroom poisoning Yunnan tourist`; `jian shou qing hotpot safety`
- `demandEvidence`: Current traveler reports and questions show uncertainty about waiting times, alcohol, mixed species, chopstick control, hallucinatory symptoms, and what to do after suspected poisoning. The task is both common and safety-critical.
- `SERP gap`: Travel pages often romanticize risk or repeat one cooking time as a universal rule. Few make the kitchen, species, batch, official timer, alcohol avoidance, symptom response, and emergency escalation into one conservative workflow.
- `existingOwner`: None. No current or unmerged owner covers Yunnan wild-mushroom restaurant safety.
- `cannibalizationRisk`: low
- `primaryEntityIds`: `food-format:yunnan-wild-mushroom-hotpot`, `place:yunnan`
- `secondaryEntityIds`: `ingredient:wild-mushrooms`, `risk:mushroom-poisoning`, `service:licensed-restaurant`
- `section`: `culture`
- `collection`: `culture-regional-food`
- `freshnessClass`: `critical-seasonal-and-on-health-guidance-change`
- `sourceReadiness`: high — 2026 Yunnan health, market-regulator, and forestry guidance is available; exact cooking time will remain species/kitchen-specific
- `informationGain`: A high-stakes decision and recovery page that explicitly refuses visual self-identification, universal timers, and the treatment of poisoning symptoms as entertainment.
- `decision`: **GO WITH SAFETY REVIEW**

### 5. Chengdu Wuhou Shrine — selected, rank 5

- `candidateId`: `w3-seo-0901-05`
- `workingTitle`: **Chengdu Wuhou Shrine: Read History, Memorial and Romance of the Three Kingdoms**
- `action`: new page
- `targetIntent`: visit the museum in an order that separates historical people, later memorial architecture, literary characterisation, and modern tourism presentation
- `queryCluster`: `Wuhou Shrine worth it`; `Wuhou Shrine Three Kingdoms history`; `what to see Wuhou Temple Chengdu`; `Liu Bei tomb Wuhou Shrine`; `Romance of Three Kingdoms Chengdu site`
- `demandEvidence`: Current traveler discussions repeatedly say the site is difficult without Three Kingdoms context and ask what is historical, what belongs to the novel, and which halls or inscriptions matter.
- `SERP gap`: Generic attraction guides cover tickets and a list of halls but flatten Chen Shou's historical record, later memorial practice, the Ming novel, surviving/rebuilt fabric, and the present museum into one timeless "Three Kingdoms site."
- `existingOwner`: None found on current main or fetched unmerged content refs. Destination owners may cover Chengdu logistics, but not this evidence-layered cultural reading task.
- `cannibalizationRisk`: medium-low if the page excludes Chengdu itinerary, transport, and general Three Kingdoms biography
- `primaryEntityIds`: `site:chengdu-wuhou-shrine`, `person:zhuge-liang`
- `secondaryEntityIds`: `person:liu-bei`, `work:romance-of-the-three-kingdoms`, `institution:chengdu-wuhou-shrine-museum`
- `section`: `culture`
- `collection`: `culture-history-people-ideas`
- `freshnessClass`: `high-on-access-or-exhibition-change`
- `sourceReadiness`: medium-high — the museum provides current ticketing, passport, map, guide, and research portals; historical claims require museum and stable academic/primary-text corroboration
- `informationGain`: A physical route with a four-layer claim key, allowing a traveler to read named halls, the Huiling area, tablets, and displays without using a novel as an excavation report.
- `decision`: **GO**

### 6. China National Silk Museum — selected, rank 6

- `candidateId`: `w3-seo-0901-06`
- `workingTitle`: **China National Silk Museum: Follow Silk from Cocoon to Conservation**
- `action`: new page
- `targetIntent`: choose and follow a museum route that connects sericulture, textile structures, trade evidence, and conservation rather than treating every object as "ancient silk"
- `queryCluster`: `China National Silk Museum worth it`; `China Silk Museum what to see`; `Hangzhou silk museum route`; `silk making museum Hangzhou`; `China National Silk Museum reservation passport`
- `demandEvidence`: Current travelers recommend the museum but ask whether it is a museum or shopping stop, how much time it needs, what is actually on display, and how to understand looms and textile conservation.
- `SERP gap`: Results mostly provide attraction summaries. Few give an object-led route from cocoon and loom to fibre structure, trade context, and modern conservation, or explain the difference between permanent evidence and a rotating fashion exhibition.
- `existingOwner`: None. Existing craft/workshop owners address making choices, not this national museum's evidence route.
- `cannibalizationRisk`: low
- `primaryEntityIds`: `institution:china-national-silk-museum`, `material:silk`
- `secondaryEntityIds`: `practice:sericulture-and-silk-craftsmanship`, `process:textile-conservation`, `place:hangzhou`
- `section`: `culture`
- `collection`: `culture-history-people-ideas`
- `freshnessClass`: `high-on-exhibition-or-admission-change`
- `sourceReadiness`: high — official admission, permanent-gallery, adult-guide, and conservation pages plus UNESCO ICH evidence are available
- `informationGain`: A concrete object-and-process route that teaches what a loom, weave, excavated textile, trade label, and conservation treatment can and cannot prove.
- `decision`: **GO**

### 7. Lanzhou beef noodles — not selected

- `candidateId`: `w3-seo-0901-07`
- `workingTitle`: **Lanzhou Beef Noodles: Read the Bowl and Order Like a Local Customer**
- `action`: hold / reassess as an update or future cluster child
- `targetIntent`: choose noodle width, portion, chilli, and side dishes at a Lanzhou counter
- `queryCluster`: `how to order Lanzhou beef noodles`; `Lanzhou noodle widths`; `Lanzhou beef noodle breakfast`
- `demandEvidence`: Current search results and traveler food questions show genuine interest in noodle widths and ordering.
- `SERP gap`: Some thin pages remain, but a recent exact-intent guide already covers much of the bowl anatomy and ordering flow.
- `existingOwner`: `china-regional-food-route` owns national regional-food selection; no exact Homeground owner, but external exact coverage is unusually complete
- `cannibalizationRisk`: low internally, high marginal-content risk externally
- `primaryEntityIds`: `dish:lanzhou-beef-noodles`, `place:lanzhou`
- `secondaryEntityIds`: `food-format:noodle-counter`
- `section`: `culture`
- `collection`: `culture-regional-food`
- `freshnessClass`: `medium-on-standard-change`
- `sourceReadiness`: high — current national standards registry and Gansu sources exist
- `informationGain`: insufficient for this batch without original field reporting on counter variation
- `decision`: **REJECT THIS BATCH — SERP SATURATION**

### 8. Xiamen shacha noodles — not selected

- `candidateId`: `w3-seo-0901-08`
- `workingTitle`: **Xiamen Shacha Noodles: Build a Bowl Without Ordering Blind**
- `action`: hold
- `targetIntent`: choose broth, toppings, portion, and allergen questions at a shacha-noodle counter
- `queryCluster`: `how to order shacha noodles Xiamen`; `what is satay noodles Xiamen`; `shacha noodles toppings`
- `demandEvidence`: Traveler searches focus on what the sauce is, how to select toppings, and whether it contains peanuts or seafood.
- `SERP gap`: The visible exact-intent competition already provides a detailed topping and ordering workflow.
- `existingOwner`: none exact
- `cannibalizationRisk`: low internally; high duplicate-value risk in the current SERP
- `primaryEntityIds`: `dish:xiamen-shacha-noodles`, `place:xiamen`
- `secondaryEntityIds`: `ingredient:shacha-sauce`, `risk:food-allergen`
- `section`: `culture`
- `collection`: `culture-regional-food`
- `freshnessClass`: `high-on-allergen-or-standard-change`
- `sourceReadiness`: medium-high — a current official standard exists, but shop-level allergen practice still requires direct verification
- `informationGain`: not strong enough without verified counter/menu field evidence
- `decision`: **REJECT THIS BATCH — EXACT WORKFLOW ALREADY WELL COVERED**

### 9. Liuzhou luosifen — not selected

- `candidateId`: `w3-seo-0901-09`
- `workingTitle`: **Liuzhou Luosifen: Choose a Bowl Beyond the Smell Stereotype**
- `action`: hold
- `targetIntent`: choose soup, toppings, spice, and portion while understanding the dish without caricature
- `queryCluster`: `luosifen first time`; `how to order snail noodles Liuzhou`; `does luosifen contain snails`; `luosifen smell`
- `demandEvidence`: Current queries show strong curiosity and recurring misconceptions about smell, snails, and spice.
- `SERP gap`: A current exact guide already addresses these questions; much remaining search content rewards stereotype-heavy framing.
- `existingOwner`: none exact
- `cannibalizationRisk`: low internally, medium external duplication and stereotype risk
- `primaryEntityIds`: `dish:luosifen`, `place:liuzhou`
- `secondaryEntityIds`: `ingredient:sour-bamboo-shoots`
- `section`: `culture`
- `collection`: `culture-regional-food`
- `freshnessClass`: `medium-on-standard-change`
- `sourceReadiness`: high — official product standards are available
- `informationGain`: insufficient for this batch without verified restaurant-service variation and original photography
- `decision`: **REJECT THIS BATCH — LOW MARGINAL GAIN**

### 10. Suzhou Pingtan — not selected

- `candidateId`: `w3-seo-0901-10`
- `workingTitle`: **Suzhou Pingtan for First-Timers: Teahouse Set or Theatre Programme?**
- `action`: hold
- `targetIntent`: distinguish a short visitor set from a named professional programme and choose a credible first performance
- `queryCluster`: `where to see Suzhou pingtan`; `Suzhou pingtan teahouse`; `pingtan performance English`
- `demandEvidence`: Recent travelers ask where to hear Pingtan and whether teahouse performances are visitor-friendly.
- `SERP gap`: Some venue-verification gaps remain, but a current combined Pingtan/Kunqu guide already occupies much of the first-performance intent.
- `existingOwner`: none exact in Homeground
- `cannibalizationRisk`: medium because it would resemble existing first-performance workflows and an externally strong exact page
- `primaryEntityIds`: `performing-art:suzhou-pingtan`, `place:suzhou`
- `secondaryEntityIds`: `venue:teahouse`, `instrument:pipa`, `instrument:sanxian`
- `section`: `culture`
- `collection`: `culture-festivals-arts-contemporary`
- `freshnessClass`: `critical-on-programme-or-venue-change`
- `sourceReadiness`: medium-low — stable heritage context exists, but current programme, subtitle, admission, and photography rules are not closed
- `informationGain`: promising only after direct venue verification
- `decision`: **REJECT THIS BATCH — OPERATIONS EVIDENCE NOT READY**

### 11. Hanyangling archaeological museum — not selected

- `candidateId`: `w3-seo-0901-11`
- `workingTitle`: **Hanyangling: How to Read a Glass-Floor Archaeological Site Museum**
- `action`: hold
- `targetIntent`: understand the protected burial pits and choose an evidence-led visit rather than expecting a terracotta-warrior duplicate
- `queryCluster`: `Hanyangling worth it`; `Hanyangling glass floor`; `Hanyangling vs Terracotta Army`; `how to visit Han Yang Ling Museum`
- `demandEvidence`: Traveler discussions mention the glass-floor experience and ask whether the site is worth the detour.
- `SERP gap`: Generic attraction pages under-explain conservation and what remains in situ.
- `existingOwner`: `how-to-visit-an-archaeological-site-museum` owns the general evidence-reading method; a dedicated site page could still exist only with strong operational and object-specific gain
- `cannibalizationRisk`: medium
- `primaryEntityIds`: `site:hanyangling`, `institution:hanyangling-museum`
- `secondaryEntityIds`: `person:emperor-jing-of-han`, `method:in-situ-display`
- `section`: `culture`
- `collection`: `culture-history-people-ideas`
- `freshnessClass`: `high-on-access-or-exhibition-change`
- `sourceReadiness`: low-medium — stable archaeology evidence exists, but a current official visitor route and complete operational rules did not surface reliably
- `informationGain`: potentially strong, but not publishable to the required current standard in this batch
- `decision`: **REJECT THIS BATCH — CURRENT OPERATIONS NOT CLOSED**

### 12. Jinsha Site Museum — not selected

- `candidateId`: `w3-seo-0901-12`
- `workingTitle`: **Jinsha Site Museum: Read the Excavation Hall Before the Gold Mask**
- `action`: update-existing candidate, not a new page in this batch
- `targetIntent`: follow an excavation-to-object route and understand what the site and iconic objects independently prove
- `queryCluster`: `Jinsha Site Museum worth it`; `what to see Jinsha Museum`; `Jinsha excavation hall route`
- `demandEvidence`: Current travelers ask whether Jinsha is worth visiting and how it differs from Sanxingdui.
- `SERP gap`: The museum's own interpretation is strong, while generic guides often jump directly to iconic objects.
- `existingOwner`: `how-to-visit-an-archaeological-site-museum` already uses Jinsha as hero, a principal body example, multiple official Jinsha sources, and an academic case study
- `cannibalizationRisk`: high until the generic owner is re-scoped or a central editor authorizes a dedicated site child
- `primaryEntityIds`: `site:jinsha`, `institution:jinsha-site-museum`
- `secondaryEntityIds`: `object:sun-and-immortal-birds-gold-ornament`, `method:archaeological-context`
- `section`: `culture`
- `collection`: `culture-history-people-ideas`
- `freshnessClass`: `high-on-access-or-exhibition-change`
- `sourceReadiness`: high — official museum route, multilingual audio, object records, and stable research are available
- `informationGain`: real, but currently better delivered as an expansion or explicitly authorized child of the existing archaeological-museum owner
- `decision`: **REJECT NEW PAGE — UPDATE EXISTING / CENTRAL OWNER DECISION**

## Canonical exclusions for the selected six

- No selected food page will rank restaurants, promise a fixed menu, or replace generic shared-meal etiquette.
- The Peking Opera page will not become a permanent event calendar or claim every tourist showcase has subtitles.
- The Wuhou Shrine page will not own Chengdu transport, a complete Three Kingdoms history, or a biography of Zhuge Liang.
- The Silk Museum page will not become a Hangzhou itinerary, silk-shopping guide, or workshop booking page.
- None of the six will create city-by-month, audience-by-month, or synonym pages.

