import type { ReactNode } from "react";
import { HomegroundBrandMark } from "./HomegroundBrandMark";
import { jaPilot } from "../lib/jaPilot";
import { jaPilotCopy } from "../lib/jaPilotCopy";
import styles from "./JapanesePilot.module.css";

export function JapanesePilotShell({
  children,
  current,
}: {
  children: ReactNode;
  current: "home" | "guide" | "tour" | "privacy";
}) {
  const { nav, footer } = jaPilotCopy;
  return (
    <div className={styles.site}>
      <a className={styles.skipLink} href="#main">本文へ移動</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href={jaPilot.home} aria-label="Homeground China 日本語トップ">
            <HomegroundBrandMark className={styles.brandMark} />
            <span lang="en">Homeground China</span>
          </a>
          <nav aria-label="主なページ" className={styles.nav}>
            <a aria-current={current === "home" ? "page" : undefined} href={jaPilot.home}>{nav.home}</a>
            <a aria-current={current === "guide" ? "page" : undefined} href={jaPilot.guide}>{nav.guide}</a>
            <a aria-current={current === "tour" ? "page" : undefined} href={jaPilot.tour}>{nav.tour}</a>
          </nav>
          <a className={styles.headerContact} href={current === "guide" ? "#contact" : `${jaPilot.tour}#contact`}>
            <span className={styles.contactFull}>{nav.contact}</span>
            <span className={styles.contactShort}>相談</span>
          </a>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>{footer.company}</p>
          <div>
            <a aria-current={current === "privacy" ? "page" : undefined} href={jaPilot.privacy}>{footer.privacy}</a>
            <a href="/" hrefLang="en" lang="en">{footer.english}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
