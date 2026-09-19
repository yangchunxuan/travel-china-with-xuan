import type { ReactNode } from "react";
import styles from "./PageArrivalFrame.module.css";

/**
 * A route-level presentation frame. Next.js remounts route templates on
 * navigation, so the CSS entrance sequence runs without delaying navigation or
 * hiding content behind a JavaScript loader.
 */
export function PageArrivalFrame({ children }: { children: ReactNode }) {
  return (
    <div className={styles.frame} data-homeground-page-arrival>
      {children}
    </div>
  );
}
