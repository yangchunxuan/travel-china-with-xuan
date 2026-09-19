"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { markHomegroundRouteMounted } from "../lib/homegroundRouteSession";
import styles from "./PageArrivalFrame.module.css";

/**
 * Keeps route content in one stable frame. Internal Next.js links retain the
 * current page until the next route is ready, matching x.ai's atomic swap
 * instead of replaying a page-wide entrance animation on every click.
 */
export function PageArrivalFrame({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    markHomegroundRouteMounted();
  }, []);

  return (
    <div className={styles.frame} data-homeground-page-arrival>
      {children}
    </div>
  );
}
