# Sight stories: how to write them

This guide covers the writing in `lib/sightStories.ts`, the "why it is worth the trip" layer of each `/sights/<id>/` page.

It was drawn from two review rounds of the first three stories: Forbidden City, West Lake and Hongyadong. Those three are the reference: read them first.

## What a story is, and what it is not

A sight page already has two neighbours:
- **The Travel Advice guide** (`content/guides/<guideId>/`) owns the how-to: gates, booking, routes, exits, recovery.
- **The reservation rules** (`lib/attractionReservations.ts`) own release times, passports and prices.

The story owns what those leave out:
- why the place matters;
- three things a visitor can actually go and find;
- how it fits a day;
- who can leave it out.

That means:
- **No volatile facts.** No opening hours, prices, ticket steps, release times or "closed on Mondays". The test fails on clock times and prices.
- **Nothing that contradicts the guide.** Read the guide before writing. In the sample, the guide said slower walkers should take the museum's two-hour route and not climb Jingshan automatically, so the story says the same.
- **No restating the guide's logistics.** At most, point at them ("the gallery has its own ticket, so decide before you book").

## Fields

| Field | What it holds | Length |
| --- | --- | --- |
| `description` | Search snippet and link preview | en ≤ 155 characters; zh ≤ 70; ko ≤ 95 |
| `why` | 3 paragraphs (owner, 2026-10-04): the experience; the story that changes what you see; how it compares or which part to choose | 70–120 words each (en) |
| `highlights` | Exactly 3 things to find, each with a `name` and 1–3 sentences | |
| `time` | How long to give it | One or two sentences |
| `when` | Time of day and season | |
| `pair` | What fits around it the same day, with directions | |
| `skip` | Who can leave it out, and what to do instead | Full sentences |
| `faq` | 5 questions travellers type into search engines and AI assistants, each with an answer | Answer in the first sentence, then 2–3 more |
| `meta` (per sight, shared) | `reviewedAt` (YYYY-MM-DD); `sources`; `alternateName`; `sameAs` | See below |

### `meta` fields

- **`sources`:** 3–5 official or reference sources, shown on the page. Use UNESCO, government, the site's own website or the museum's page; never a blog.
- **`alternateName`:** the sight's names in English, Chinese, Korean and pinyin, plus common variants.
- **`sameAs`:** the English Wikipedia URL, the Wikidata URL (check the Q-number) and the UNESCO URL when listed.

## GEO: being quoted by AI search (owner, 2026-10-04)

Research basis:
- The Princeton GEO paper (KDD 2024) found that concrete statistics, authoritative quotations and cited sources raise visibility in AI answers by about 30–40 %.
- Google says AI features use the same helpful-content signals as Search, and structured data must match what is visible on the page.

So:
- **FAQ questions are the real questions people ask:** "Is X worth visiting?", "X or Y?", "How long do you need?", "Best time to visit?", "Do I need to book?"
- **Every answer opens with a direct answer** ("Yes, especially…", "Choose Badaling if…") and includes a concrete, useful number: hours, kilometres, months.
- **Same voice as the rest of the page:** warm and plain, with no jargon.
- **Quotations only where they belong to the place:** a poem line, or UNESCO's own words. Never decoration.
- **Numbers must help the trip:** time, distance, season, size you can feel. Not trivia.
- **The page renders the FAQ as FAQPage markup and the meta as TouristAttraction markup,** so wording must be final and visible.

## Make them want to go (owner's rule, 2026-10-04)

The owner's words: "你要有让你看了很想去的冲动，而不是在这说黑话" (it should make you itch to go, not talk in jargon).

- **Write the moment, not the monument.** Describe what being there looks, sounds and feels like:
  - the moment you turn round on the wall and it runs to the horizon;
  - the hush of the palace square at opening;
  - mist on the lake at seven in the morning.
- **Plain words, no jargon.** Never use a specialist term the reader has to look up: 空心敌楼, 垛口, 关城, 门额, 品级, 中轴线, 配殿, "parapet", "dougong" and the like. If the thing matters, describe it ("the small windows soldiers watched through"). Never lean on the term.
- **Lead with desire, then help.** `why` opens with why this is worth crossing the world for. The practical judgement (which section, how long) comes after, briefly.
- **Highlights are moments a visitor can have,** not architectural features: "turn round at the top of the steep climb", "duck into a tower and look out of the little window".
- **Still true.** Every sensory claim must be something that is really there:
  - mist, autumn colour and crowds are fine when sourced or common knowledge;
  - never invent a first-person experience;
  - no "we stood there and…" unless the owner gives it.

## Every sentence serves the traveler (owner's rule, 2026-10-04)

A sentence earns its place only if it helps the reader do one of these:
- see something on site;
- feel why the place matters;
- decide whether to go, which part to see, or how to plan the day.

History belongs only when it changes what they will look at. For example, "the courtyards open out, then close in" changes how you walk the Forbidden City. So do "the brick walls that held the emperor prisoner are still there" and "the lake was dug as a reservoir".

Cut trivia that does none of those, however true or rare. The owner flagged this kind of line on the Great Wall page:
- myth-busting ("you cannot see it from space; Yang Liwei looked and didn't");
- counts and records with no use on site: 1,206 towers by 1572, 540 heads of state, 96 % vegetation;
- an institution's history (founded 1912, merged 2003);
- a string of founding dates.

Lead `why` with the experience: what it looks and feels like to be there, and why it is worth the trip. Then give, briefly, what sets this place apart from the alternatives.

## Facts

- **Source every fact.** Each one needs an official or reference source. Log it in `docs/homeground-sight-stories-sources.md`, one table per sight.
- **Check superlatives and absolutes before writing them:** "only", "largest", "first", "still there", "never". If sources disagree, say less. In the sample, "a cave that is still there" was disputed, so it became "the name comes from a cave in this cliff".
- **Don't let a sentence imply something false.** "Courtyards get smaller as you walk north" was wrong: they open out, then close in.
- **Hedge where reality varies:** "usually the clearer river", "the lights follow a fixed schedule rather than sunset".
- **Put the same facts in all three languages.** No drift: a number, name or caveat in one language is in the other two.

## Voice (all languages)

Write for a curious adult planning a real trip, as a well-travelled local friend would. Every paragraph should hold at least one specific thing a generic summary would not say. Examples from the sample:
- hangshi, the tenth roof beast;
- the courts Qianlong never moved into;
- "stand with your back to the city";
- "the ground floor depends on which side you arrive from".

Avoid these. Each was caught in review:
- **"X, not Y" antithesis.** At most one per page.
- **Colons as pivots** in every paragraph. Keep colons for definitions and lists.
- **Sentence-shape tics:** "It is also…", "What makes X special is Y", and filler morals at the end ("better than any label can").
- **Stock phrases:** "hidden gem", "breathtaking", "stunning", "must-see", "nestled", "rich history", "a testament to", "ink paintings it inspired".
- **Repeating a fact** across `description`, `why` and `highlights`. Say it once; let the highlight say what you *see*.
- **Table-of-contents descriptions** ("Why…, the three…, how long…"). Lead with one concrete fact, then what the page helps with. Vary the shape between pages.
- **Long sentences.** Keep sentences under about 30 words, and avoid comma pile-ups before the verb.
- **Overclaiming crowds or timings** that sources don't support. State the reason correctly. For example: "be in the queue before the gates open, so you reach the halls ahead of the crowd".

`skip` must:
- agree with `why`;
- be honest (e.g. "If you came for old Chongqing, this is not it: the building dates from 2006");
- offer the alternative.

`pair` must:
- give directions or times;
- never make a strenuous add-on automatic ("If you still have the legs…").

## English

- British spelling: centre, metres, storey, licence.
- Name a film or book clearly, e.g. "the Miyazaki film Spirited Away", because there is no italics.

## Chinese (zh)

Write natively; do not translate the English. Reviewers flagged:
- **Mixed patterns:** 之所以…的原因.
- **Calques:** 与其说…不如说… as an opener; 是…的 calques ("西湖是温和的"); Europeanised passives; metaphors that don't work in Chinese (全中国最要紧的地址).
- **Wrong measure words and collocations:** 整座布局, 花…塔.
- **Repeated words in one sentence:** 塔 seven times, 回 three times.
- **Ambiguous words:** 团队 (say 旅行团).

Also:
- **Use the Chinese idiom where it exists:** 三面云山一面城, 一株杨柳一株桃, 8D 魔幻城市.
- **Punctuation:** full-width; 《》 for titles; “” quotes.
- **Name the currency:** 一张一元的人民币.
- **Search:** put the city in the description (北京故宫, 杭州西湖).

## Korean (ko)

- **Register:** 합니다체 throughout. No spoken fragments such as "…다면요." / "…라면요.".
- **No calques:** 주소 used as a metaphor, 하늘선, 설계 (use 배치), back-translations like ‘금지된 성’.
- **Market place names** (checked against Trip.com KR, MyRealTrip, Tourvis and Naver):
  - 자금성, 톈안먼, 경산공원, 태화전, 진보관, 어화원;
  - 서호, 소제, 뇌봉탑, 영은사·비래봉, 용정차 마을;
  - 홍야동, 천사문대교, 자링강, 장강, 위중반도, 해방비 보행거리, 조천문, 양강 야경 유람선;
  - 우롱, 대족석각, 낙산대불, 도강언, 계림, 이강, 양삭, 옥룡설산, 장가계.
  - Check any new name the same way.
- **Gloss unfamiliar terms once:** 조각루(비탈에 기둥을 세워 지은 전통 가옥), 백사전(백낭자와 허선의 사랑 이야기).
- **Use Korean hooks only when true:** 잡상 on 경복궁 roofs (경회루 has 11, counting the lead figure); 동파육 for 소동파.
- **Punctuation:** ‘…’ quotes; units without a space (72만㎡).
- **Search:** put the city in the description (베이징 자금성, 항저우 서호).

## Process

1. **Research and write.** Read the guide and the reservation rules first, then research. Write all three languages with sources, including the FAQ and the `meta` (reviewedAt, sources, alternateName, sameAs).
2. **Review round 1:** two reviewers.
   - One checks facts in all languages and the English.
   - One checks Chinese, Korean and the phone layout.
3. **Revise.** Record which findings were applied, adapted or declined, and why.
4. **Review round 2.** Verify round 1 first, then look for new problems.
5. **Revise again.** Add the sight to `lib/sightStories.ts`, rebuild the fonts if new characters appear (`public/fonts/README.md`), build, and screenshot.
6. **Owner reads.** Flip `ready: true` only after the owner approves.
