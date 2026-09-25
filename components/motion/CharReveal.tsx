import { Fragment, type CSSProperties } from "react";
import styles from "./CharReveal.module.css";

/**
 * A short figure, such as a price, that settles in glyph by glyph as it
 * scrolls into view: each character rises and sharpens in reading order.
 * It never counts through other numbers, so the real value is the only one
 * ever on screen, and the text content stays exactly the source string.
 * CSS scroll-driven: without support, or with reduced motion, it is static.
 */
export function CharReveal({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((char, index) =>
        char === " " ? (
          <Fragment key={index}> </Fragment>
        ) : (
          <span
            key={index}
            className={styles.char}
            style={{ "--char": index } as CSSProperties}
          >
            {char}
          </span>
        ),
      )}
    </>
  );
}
