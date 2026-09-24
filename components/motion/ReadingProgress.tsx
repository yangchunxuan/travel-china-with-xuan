import styles from "./ReadingProgress.module.css";

/**
 * A 2px reading-progress line along the top edge, driven entirely by a CSS
 * scroll timeline: no JavaScript, and browsers without scroll-driven
 * animations simply do not show it.
 */
export function ReadingProgress() {
  return <div aria-hidden="true" className={styles.progress} />;
}
