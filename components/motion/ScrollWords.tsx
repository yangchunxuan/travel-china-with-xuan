import { Fragment, type CSSProperties } from "react";
import { splitHeadline } from "./AnimatedHeadline";
import styles from "./ScrollWords.module.css";

type Locale = "en" | "zh" | "ko";

/**
 * Section headings that come into focus word by word as they scroll in
 * (the Cosmos treatment: each word starts blurred and faint, then sharpens
 * in reading order). Words come from Intl.Segmenter, so Chinese breaks into
 * real words and lines only break between them; whitespace stays as plain
 * text, so the heading's textContent is exactly the source string. Pure CSS
 * scroll-driven animation: browsers without it, and readers who prefer
 * reduced motion, see the finished heading.
 */
export function ScrollWords({ text, locale }: { text: string; locale: Locale }) {
  const units = splitHeadline(text, locale);
  return (
    <>
      {units.map((unit, index) => (
        <Fragment key={`${unit.text}-${index}`}>
          <span
            className={styles.word}
            style={{ "--scroll-word": index } as CSSProperties}
          >
            {unit.text}
          </span>
          {unit.space ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
