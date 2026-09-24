"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./PlaceMarquee.module.css";

/**
 * A slow, endlessly scrolling line of the places the published routes visit
 * (x.ai runs a similar marquee of logos). It is decoration: hidden from
 * assistive technology, rendered only after hydration so the static HTML
 * carries no repeated place names, and not shown at all when the reader
 * prefers reduced motion. It pauses while off screen, on hover, and on a tap
 * or click (tap again to resume), so moving content can always be stopped.
 * The box keeps its height before mount so nothing below it shifts.
 */
export function PlaceMarquee({ places }: { places: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setReady(true);
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      setOnScreen(entries.some((entry) => entry.isIntersecting));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={styles.marquee}
      data-state={paused || !onScreen ? "paused" : "running"}
      onClick={() => setPaused((current) => !current)}
      ref={ref}
    >
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
