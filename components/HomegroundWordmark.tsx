"use client";

import { useEffect, useState } from "react";
import { subscribeMediaQuery } from "../lib/browserCapabilities";
import styles from "./HomegroundHeader.module.css";

/**
 * The header wordmark folds to "Hi" once the page is scrolled past
 * `foldScrollY` and unfolds only back within `unfoldScrollY`, so a slow drag
 * near the threshold cannot flicker it.
 */
const foldScrollY = 24;
const unfoldScrollY = 8;

/**
 * The header's fold state, read from the scroll position once per frame.
 * `motion` turns on two frames after the first reading, so a page that opens
 * already scrolled starts folded instead of folding on its own, and never
 * under reduced motion. Spread the result onto the header element.
 */
export function useBrandFold() {
  const [folded, setFolded] = useState(false);
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setFolded((current) => (current ? y > unfoldScrollY : y > foldScrollY));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setMotion(!reducedMotion.matches);
    update();
    let ready = window.requestAnimationFrame(() => {
      ready = window.requestAnimationFrame(syncMotion);
    });
    const unsubscribeMotion = subscribeMediaQuery(reducedMotion, syncMotion);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      unsubscribeMotion();
      window.cancelAnimationFrame(ready);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return {
    "data-brand-folded": folded ? "true" : "false",
    "data-brand-motion": motion ? "true" : "false",
  } as const;
}

/**
 * "Homeground China", which folds to "Hi": the H, and the i of China. The
 * folding runs are bare text in inline grids, so the name still copies and
 * reads as one line.
 */
export function HomegroundWordmark() {
  return (
    <strong lang="en">H<span className={styles.fold}>omeground Ch</span>i<span className={styles.fold}>na</span></strong>
  );
}
