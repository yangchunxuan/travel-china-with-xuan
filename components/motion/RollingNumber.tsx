"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./RollingNumber.module.css";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// Two turns of 0–9: a column starts on its real digit in the first turn and
// rolls one full turn to the same digit in the second, so the number never
// flashes "00" on the way in.
const STRIP = [...DIGITS, ...DIGITS];

/**
 * number-flow style digits (x.ai uses number-flow for its stats): each digit
 * is a column of 0–9 that rolls to its value. The server renders the plain
 * value, so the static HTML and crawlers see exactly the published number;
 * the rolling columns only replace it after hydration, once the number is on
 * screen, and never when the reader prefers reduced motion. Later value
 * changes (for example a filter count) roll from the previous digits.
 */
export function RollingNumber({ value, className }: { value: string | number; className?: string }) {
  const text = String(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setEnhanced(true);
        // Mount the columns at 0 first, then roll to the value. A timer (not
        // requestAnimationFrame) so a background tab still ends on the value.
        window.setTimeout(() => setSettled(true), 40);
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!enhanced) {
    return (
      <span className={className} ref={ref}>
        {text}
      </span>
    );
  }

  const chars = [...text];
  return (
    <span className={`${className ?? ""} ${styles.root}`} ref={ref}>
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true" className={styles.track}>
        {chars.map((char, index) => {
          const digit = DIGITS.indexOf(char);
          if (digit < 0) {
            return (
              <span className={styles.static} data-digit={char} key={`s-${chars.length - index}`} />
            );
          }
          return (
            <span className={styles.column} key={`d-${chars.length - index}`}>
              <span
                className={styles.strip}
                style={
                  {
                    "--digit": settled ? digit + 10 : digit,
                    "--column-index": chars.length - index,
                  } as CSSProperties
                }
              >
                {/* Drawn with CSS content, so copy and find-in-page only see
                    the real number in the screen-reader span. */}
                {STRIP.map((d, stripIndex) => (
                  <span data-digit={d} key={`${d}-${stripIndex}`} />
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
