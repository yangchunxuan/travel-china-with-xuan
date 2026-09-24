import { Fragment, type ReactNode } from "react";
import styles from "./KeepWords.module.css";

type Locale = "en" | "zh" | "ko";

/**
 * Line-breaking help that never changes the text:
 * - Chinese: the text is set with `word-break: keep-all` and a <wbr> is placed
 *   between the words Intl.Segmenter finds, so lines break between words
 *   ("凤凰", "三星堆", "私家团" stay whole) instead of between any two
 *   characters. Number + unit runs ("5 天 4 晚") are kept on one line, and
 *   punctuation stays attached to the word before it.
 * - English: "5-Day" and other hyphenated compounds ("Fixed-Route",
 *   "on-site") stay whole.
 * - Korean already breaks between words (word-break: keep-all), so the text
 *   is returned untouched.
 */
export function KeepWords({ text, locale }: { text: string; locale: Locale }) {
  if (locale === "ko") return <>{text}</>;

  if (locale === "en") {
    const parts = text.split(/(\d+-Day|[A-Za-z]+(?:-[A-Za-z]+)+)/u);
    return (
      <>
        {parts.map((part, index) =>
          index % 2 === 1 ? (
            <span className={styles.keep} key={`${part}-${index}`}>
              {part}
            </span>
          ) : (
            <Fragment key={`${part}-${index}`}>{part}</Fragment>
          ),
        )}
      </>
    );
  }

  const segmenter = new Intl.Segmenter("zh-Hans", { granularity: "word" });
  const nodes: ReactNode[] = [];
  // Number + unit runs first, so "6 天 5 晚" never splits at its spaces.
  text.split(/(\d+\s*天(?:\s*\d+\s*晚)?|\d+\s*晚|\d+\s*人)/u).forEach((chunk, chunkIndex) => {
    if (!chunk) return;
    if (chunkIndex % 2 === 1) {
      nodes.push(
        <span className={styles.keep} key={`n-${chunkIndex}`}>
          {chunk}
        </span>,
      );
      return;
    }
    let first = true;
    for (const part of segmenter.segment(chunk)) {
      const joinsPrevious = !part.isWordLike && !/^\s+$/u.test(part.segment);
      if (!first && !joinsPrevious && !/^\s+$/u.test(part.segment)) {
        nodes.push(<wbr key={`w-${chunkIndex}-${part.index}`} />);
      }
      nodes.push(<Fragment key={`t-${chunkIndex}-${part.index}`}>{part.segment}</Fragment>);
      first = false;
    }
  });
  return <span className={styles.phrases}>{nodes}</span>;
}

/**
 * A "A · B · C" route line where each stop stays on one line and the
 * separator stays with the stop before it, so no line starts with "·".
 */
export function KeepStops({ route }: { route: string }) {
  const stops = route.split(" · ");
  return (
    <>
      {stops.map((stop, index) => (
        <Fragment key={`${stop}-${index}`}>
          <span className={styles.keep}>
            {stop}
            {index < stops.length - 1 ? " ·" : null}
          </span>
          {index < stops.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
