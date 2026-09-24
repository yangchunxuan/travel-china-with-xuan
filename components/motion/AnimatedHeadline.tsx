import { Fragment, type CSSProperties } from "react";
import styles from "./AnimatedHeadline.module.css";

type Locale = "en" | "zh" | "ko";

interface Unit {
  readonly text: string;
  readonly space: boolean;
}

/**
 * Split a headline into animation units without changing its text. Words are
 * found with Intl.Segmenter, so Chinese titles break into real words rather
 * than single characters, and trailing punctuation stays glued to the word it
 * follows. Whitespace is kept as plain text between units, which keeps the
 * heading's textContent identical to the source string.
 */
function splitHeadline(text: string, locale: Locale): Unit[] {
  const segmenter = new Intl.Segmenter(locale === "zh" ? "zh-Hans" : locale, {
    granularity: "word",
  });
  const units: { text: string; space: boolean }[] = [];
  for (const part of segmenter.segment(text)) {
    if (/^\s+$/u.test(part.segment)) {
      const last = units.at(-1);
      if (last) last.space = true;
      continue;
    }
    const last = units.at(-1);
    if (last && !last.space && !part.isWordLike) {
      last.text += part.segment;
    } else {
      units.push({ text: part.segment, space: false });
    }
  }
  return units;
}

/**
 * Grok-style headline entrance: each word rises and un-tilts in turn, and the
 * last word gets a thin underline that a light band sweeps across once. Pure
 * CSS, no client JavaScript; the text is present and readable in the HTML and
 * ends fully visible. Motion is removed for prefers-reduced-motion.
 */
export function AnimatedHeadline({
  text,
  locale,
  segments,
  segmentClassName,
  shimmer = true,
}: {
  text: string;
  locale: Locale;
  /** Pre-split segments that must stay on one line (already-approved titles). */
  segments?: readonly string[] | null;
  segmentClassName?: string;
  shimmer?: boolean;
}) {
  if (segments && segments.length > 0) {
    return (
      <>
        {segments.map((segment, index) => (
          <span
            className={`${styles.word} ${segmentClassName ?? ""}`}
            key={`${segment}-${index}`}
            style={{ "--word-index": index } as CSSProperties}
          >
            {segment}
          </span>
        ))}
      </>
    );
  }

  const units = mergeShortLastWord(splitHeadline(text, locale), locale);
  const lastWordIndex = units.length - 1;
  return (
    <>
      {units.map((unit, index) => {
        const isShimmer = shimmer && index === lastWordIndex;
        // The underline sits under the word itself, not its trailing punctuation.
        const [, core, trail] = isShimmer
          ? (unit.text.match(/^(.*?)(\p{P}*)$/u) ?? ["", unit.text, ""])
          : ["", unit.text, ""];
        return (
          <Fragment key={`${unit.text}-${index}`}>
            <span
              className={styles.word}
              style={{ "--word-index": index } as CSSProperties}
            >
              {isShimmer && core ? (
                <>
                  <span className={styles.shimmerWord}>{core}</span>
                  {trail}
                </>
              ) : (
                unit.text
              )}
            </span>
            {unit.space ? " " : null}
          </Fragment>
        );
      })}
    </>
  );
}

/**
 * Chinese segmentation can leave a one-character last word (私家|团。);
 * join it with the word before so the underlined unit reads as a word.
 */
function mergeShortLastWord(units: Unit[], locale: Locale): Unit[] {
  if (locale !== "zh" || units.length < 2) return units;
  const last = units[units.length - 1];
  const previous = units[units.length - 2];
  const core = last.text.replace(/\p{P}+$/u, "");
  if ([...core].length > 1 || previous.space) return units;
  return [
    ...units.slice(0, -2),
    { text: previous.text + last.text, space: last.space },
  ];
}
