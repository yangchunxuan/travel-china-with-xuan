# Image plan — quanzhou-nanyin-first-performance-workflow

## Hero: `public/images/guides/quanzhou-nanyin-first-performance-workflow/hero-1600.webp`

| Field | Value |
| --- | --- |
| Author | Sean Chiu (Wikimedia Commons user) |
| Source page | https://commons.wikimedia.org/wiki/File:Nanguan_pipa_(%E5%8D%97%E7%AE%A1%E7%90%B5%E7%90%B6).jpg |
| Original file URL | Resolved from the Commons file page at download time via the MediaWiki imageinfo API |
| Credit line on Commons | Own work |
| Commons description | "The Nanguan pipa is held in the ancient manner like a guitar which is different from the near-vertical way pipa is now usually held." |
| Licence | CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/ |
| Actual subject | **A nanguan (nanyin) pipa**, photographed lying flat on a pale surface: the pear-shaped body, four strings, the bridge at the lower left, the mottled fingerboard inlay, and — at the right — the **bent neck and transverse tuning pegs** that distinguish this instrument from a modern upright pipa |
| Date the photograph was taken | 2022-12-09 16:36:56 (EXIF `DateTimeOriginal` recorded on Commons) |
| Downloaded | 2026-08-22, Asia/Taipei |
| Original dimensions | 4000 x 2420, JPEG, 2,976,487 bytes |
| Commons SHA-1 (publisher's own hash) | 9606f5de67b2dd6235a6e8ee19407a1e51c9b925 |
| **Original SHA-256** | `b8db574917107ba902def979973425dad77ea3f6ddf233b86f49c499e31d57f7` |
| Crop | The original is 1.653:1 against a 1.6:1 target, so about 3 per cent of the width is trimmed. **Cropped from the left** via `sharp().rotate().resize(1600, 1000, { fit: "cover", position: "right" })`, because the tuning pegs sit close to the right edge and a centre crop would have clipped them. What is removed is empty background |
| Resize / encode | `sharp` then `webp({ quality: 82, effort: 6 })` |
| Output | 1600 x 1000 WebP, 52,226 bytes |
| **Output SHA-256** | `c296a8f68afa62a37dd02ae445e30e9eca34326268b46f5992ba55ac0a8c8261` |
| Crop verified | Yes — the complete instrument, including the bent neck and both pairs of pegs, is inside the frame |

### Why this image, and why not a performance photograph

The article tells readers that the single most reliable way to recognise nanyin is the pipa: bent
neck, held flat across the lap rather than upright. UNESCO's own inscription names exactly this
instrument as one of two distinctive ones. **The hero is therefore the thing the article asks the
reader to look for**, at a resolution where the bend in the neck is unmistakable.

A performance photograph was the obvious first choice and was rejected for two specific reasons,
recorded here so the decision can be reviewed rather than guessed at:

- **Wikimedia Commons holds no photograph of nanyin performed in Quanzhou.** Searches in English and
  Chinese, and a category walk, returned nanyin performance images only from **Singapore** (a temple
  performance, 2014) and **Taiwan** (Tainan temple performances, 2009; a Taichung festival). This
  page is a workflow for attending in Quanzhou, and a hero from another city would imply a Quanzhou
  venue it does not show. Disclosing the location in a caption does not undo what a header image
  asserts at a glance.
- **The best performance candidate carries audience privacy.** `File:Nanyin performance at Thian
  Hock Keng temple.jpg` (public domain, 2014) shows an ensemble at close range with roughly twenty
  seated audience members in the foreground. They are mostly seen from behind, but they are ordinary
  members of the public who did not choose to appear at the top of a travel guide.

The instrument photograph has neither problem: it makes no claim about place, and it contains no
people at all.

### Licence and provenance checks performed

- Licence, author, description and date read from the Commons file page's own `extmetadata` via the
  MediaWiki API. **Nothing was inferred from a search thumbnail or a reverse-image result.**
- CC BY-SA 4.0 requires attribution and share-alike on the derivative. Attribution appears in the
  `heroCredit` block of all three locales and here; the derivative is stated as CC BY-SA 4.0 in each
  place.
- The image is a photograph of a real instrument. **No AI-generated image is used anywhere in this
  guide.** For a page whose central argument is that widely repeated claims about nanyin should be
  checked against sources, a generated instrument would be self-refuting.

### Privacy and content checks

- **No people.** No hands, no faces, no reflections.
- No identity documents, bank cards, tickets, order screens, receipts or telephone numbers.
- No legible text of any kind: no maker's label, no serial number, no signage.
- The instrument is an object, not a venue, so nothing in the frame identifies a private location.

### Naming honesty

The Commons file is titled with the Chinese term **南管**, the name used in Taiwan and in much of the
overseas Minnan world, while this article uses **南音**, the name used in Quanzhou. UNESCO's own
record notes the tradition spans Minnan communities in China and South-East Asia. The alt text and
credit use the file's own term "nanguan pipa" rather than silently relabelling it, and the body
explains the instrument without asserting where this particular one is.

### Alt text

- **en:** "A nanguan pipa lying flat, showing the bent neck and the four strings of the lute that nanyin players hold horizontally across the lap."
- **zh:** "一把平放的南管琵琶，可以看到弯曲的琴颈和四根弦——南音演奏者正是把它横抱在腿上。"
- **ko:** "눕혀 놓은 난관 비파. 굽은 목과 네 줄이 보이며, 난인 연주자는 이 악기를 무릎 위에 가로로 안는다."

### Crop review

- **Desktop (1280):** rendered at 480 x 300. The instrument runs diagonally across the frame with
  the body low-left and the pegs upper-right; the pale background carries a headline overlay
  cleanly.
- **Mobile (390):** rendered at 390 x 244, the same 1.6:1 ratio. Because the subject is a single
  diagonal object filling most of the frame, nothing essential falls into the outer margins a narrow
  viewport can clip. Verified in the browser pass recorded in `canonical-boundary.md`.

### Age of the photograph

Taken December 2022. It shows an instrument type, not an event, and nothing in the article depends
on the date.

### Alternatives considered

| Candidate | Licence | Why not chosen |
| --- | --- | --- |
| `File:Nanyin performance at Thian Hock Keng temple.jpg` | Public domain | Singapore, and about twenty identifiable-adjacent audience members in the foreground. Also only 1602 x 1058, leaving no crop margin |
| `File:Nanguan pie (南管拍板).jpg` | CC BY-SA 4.0 | The clappers, also a named article entity, but 4:3 and a less recognisable object for a reader who has never seen nanyin |
| `File:20090501 ~祀典大天后宮表演 (3493009420).jpg` | CC BY 2.0 | Tainan, and portrait orientation at 600 x 800 — unusable at 1600 x 1000 |
| `File:南管戲曲之夜.jpg` | CC BY-SA 2.5 | A Taichung festival event; same location problem, and the description is about a photography competition rather than the music |

### Not used

No second image. No Homeground-created diagram: the four tables carry the decisions, and a second
file would exceed the nine allowed for this article.
