/**
 * Splits Japanese text into phrases (roughly bunsetsu: a content word plus
 * the particles, endings and punctuation that follow it) so headings can
 * break between phrases instead of inside a word. Intl.Segmenter finds the
 * words; the rules below decide where a new phrase starts. Joining the
 * phrases returns the original text, except that a space between a Latin
 * word and the particle after it becomes a no-break space.
 */

// Written as escapes so shared client chunks carry no Japanese glyphs.
// Opening brackets: （ ( 「 『 【 〈 《 “ ‘ [ ［
const openingPunctuation = /^[（(「『【〈《“‘[［]+$/u;
// Sentence punctuation after which a new phrase may start: 、 。 ！ ？ ・ ／
const phraseEndPunctuation = /[、。！？・／]$/u;
// Hiragana words, including the long-vowel mark ー.
const hiraganaOnly = /^[\p{Script=Hiragana}ー]+$/u;
// The honorific prefixes お and ご.
const honorificPrefix = /^[おご]$/u;
// Case particles that close a phrase: は が を も
const closingParticle = /^[はがをも]$/u;
// ない / なく after は (ではなく) stays in the same phrase.
const negation = /^な/u;
// One-kanji suffixes that belong to the word before them: 先 者 数 様 中 後 用 的 式 性 化 内 外 別 名 泊 目 間 人
const kanjiSuffix = /^[先者数様中後用的式性化内外別名泊目間人]$/u;
const endsInHiragana = /\p{Script=Hiragana}$/u;
// "5日間" followed by "（4泊）" stays together.
const dayCount = /\d+日間$/u;
const nightCount = /^（\d+泊）/u;

type SegmentKind = "none" | "content" | "hiragana" | "honorific" | "punctuation" | "opening" | "space";

export function splitJapanesePhrases(text: string): string[] {
  const segmenter = new Intl.Segmenter("ja", { granularity: "word" });
  const phrases: string[] = [];
  let current = "";
  let previousKind: SegmentKind = "none";
  let previousSegment = "";
  let beforePreviousSegment = "";
  for (const { segment, isWordLike } of segmenter.segment(text)) {
    let kind: SegmentKind;
    if (/^\s+$/u.test(segment)) kind = "space";
    else if (openingPunctuation.test(segment)) kind = "opening";
    else if (!isWordLike) kind = "punctuation";
    else if (honorificPrefix.test(segment)) kind = "honorific";
    else if (hiraganaOnly.test(segment)) kind = "hiragana";
    else kind = "content";

    let startsPhrase = false;
    if (current !== "") {
      switch (kind) {
        case "opening":
          startsPhrase = previousKind !== "opening";
          break;
        case "honorific":
          startsPhrase = previousKind !== "opening" && previousKind !== "space";
          break;
        case "content":
          startsPhrase =
            previousKind === "hiragana" ||
            previousKind === "punctuation" ||
            previousKind === "space" ||
            // A word ending in okurigana ends its phrase: 使える｜旅の
            (previousKind === "content" && endsInHiragana.test(previousSegment) && !kanjiSuffix.test(segment));
          break;
        case "hiragana":
          startsPhrase =
            (previousKind === "punctuation" && phraseEndPunctuation.test(previousSegment)) ||
            // 決まっているものは｜そのままに, but not ではなく
            (previousKind === "hiragana" &&
              closingParticle.test(previousSegment) &&
              segment.length >= 2 &&
              !(beforePreviousSegment === "で" && negation.test(segment)));
          break;
        default:
          startsPhrase = false;
      }
    }
    // A Latin word, a space and a particle stay on one line: "Homeground を"
    if (kind === "hiragana" && previousKind === "space") {
      current = current.replace(/ $/u, " ");
    }
    if (startsPhrase) {
      phrases.push(current);
      current = "";
    }
    current += segment;
    beforePreviousSegment = previousSegment;
    previousKind = kind;
    previousSegment = segment;
  }
  if (current) phrases.push(current);

  // Keep "5日間" and "（4泊）" together.
  const merged: string[] = [];
  for (const phrase of phrases) {
    const last = merged.at(-1);
    if (last !== undefined && dayCount.test(last) && nightCount.test(phrase)) {
      merged[merged.length - 1] = last + phrase;
    } else {
      merged.push(phrase);
    }
  }
  return merged;
}
