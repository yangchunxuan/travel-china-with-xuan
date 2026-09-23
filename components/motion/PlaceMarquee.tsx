"use client";

import { useEffect, useState } from "react";
import styles from "./PlaceMarquee.module.css";

/**
 * A slow, endlessly scrolling line of the places the published routes visit
 * (x.ai runs a similar marquee of logos). It is decoration: hidden from
 * assistive technology, rendered only after hydration so the static HTML
 * carries no repeated place names, paused on hover, and not shown at all when
 * the reader prefers reduced motion. The box keeps its height before mount so
 * nothing below it shifts.
 */
export function PlaceMarquee({ places }: { places: readonly string[] }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setReady(true);
  }, []);

  return (
    <div aria-hidden="true" className={styles.marquee}>
      {ready ? (
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <ul className={styles.list} key={copy}>
              {places.map((place) => (
                <li key={`${copy}-${place}`}>{place}</li>
              ))}
            </ul>
          ))}
        </div>
      ) : null}
    </div>
  );
}
