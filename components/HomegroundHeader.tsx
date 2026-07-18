"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  getHomegroundCopy,
  homegroundLocales,
  type HomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import type { HandoffStatus } from "./PlannerHandoff";
import type { PlannerStatus } from "./RouteFinder";
import styles from "./HomegroundHomePage.module.css";

interface HomegroundHeaderProps {
  locale?: HomegroundLocale;
  plannerStatus?: PlannerStatus;
  handoffStatus?: HandoffStatus;
  handoffDirty?: boolean;
}

export function resolvePlannerCta(
  copy: HomegroundCopy,
  plannerStatus: PlannerStatus,
  handoffStatus: HandoffStatus,
): string {
  if (plannerStatus === "new") {
    return copy.navigation.plannerCta.new;
  }
  if (plannerStatus === "in-progress") {
    return copy.navigation.plannerCta.inProgress;
  }

  switch (handoffStatus) {
    case "disabled":
      return copy.navigation.plannerCta.disabled;
    case "validation-error":
      return copy.navigation.plannerCta.validationError;
    case "submitting":
      return copy.navigation.plannerCta.submitting;
    case "success":
      return copy.navigation.plannerCta.success;
    case "failed":
      return copy.navigation.plannerCta.failed;
    case "uncertain":
      return copy.navigation.plannerCta.uncertain;
    default:
      return copy.navigation.plannerCta.result;
  }
}

export function HomegroundHeader({
  locale = "en",
  plannerStatus = "new",
  handoffStatus = "disabled",
  handoffDirty = false,
}: HomegroundHeaderProps) {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const copy = getHomegroundCopy(locale);
  const plannerCta = resolvePlannerCta(
    copy,
    plannerStatus,
    handoffStatus,
  );
  const plannerTarget =
    plannerStatus === "result" ? "#planner-handoff" : "#route-finder";
  const languageHash =
    activeHash || (plannerStatus === "new" ? "" : plannerTarget);

  useEffect(() => {
    const allowedHashes = new Set([
      "#route-finder",
      "#planner-handoff",
      "#planning-proof",
      "#studio",
      "#faq",
    ]);
    const syncHash = () => {
      setActiveHash(
        allowedHashes.has(window.location.hash) ? window.location.hash : "",
      );
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const close = () => setOpen(false);
  const handleLanguageChange = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    targetLocale: HomegroundLocale,
  ) => {
    const opensSeparateContext =
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey;

    if (
      targetLocale !== locale &&
      handoffDirty &&
      !opensSeparateContext &&
      !window.confirm(copy.navigation.languageChangeWarning)
    ) {
      event.preventDefault();
      return;
    }

    close();
  };

  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerInner}>
        <Link
          className={styles.brand}
          href={copy.path}
          aria-label={copy.navigation.homeLabel}
        >
          <span className={styles.brandMark} aria-hidden="true">
            <span />
          </span>
          <span>
            <strong lang="en">Homeground</strong>
            <small>{copy.brandTagline}</small>
          </span>
        </Link>

        <nav
          className={styles.desktopNav}
          aria-label={copy.navigation.primaryLabel}
        >
          <a href="#planning-proof">{copy.navigation.planning}</a>
          <a href="#studio">{copy.navigation.studio}</a>
          <a href="#faq">{copy.navigation.faq}</a>
        </nav>

        <div className={styles.headerActions}>
          <nav
            className={styles.languageNav}
            aria-label={copy.navigation.languageLabel}
          >
            {homegroundLocales.map((targetLocale) => {
              const target = getHomegroundCopy(targetLocale);
              return (
                <a
                  aria-current={
                    targetLocale === locale ? "page" : undefined
                  }
                  href={`${target.path}${languageHash}`}
                  hrefLang={target.htmlLang}
                  key={targetLocale}
                  lang={target.htmlLang}
                  onClick={(event) =>
                    handleLanguageChange(event, targetLocale)
                  }
                >
                  {target.languageShort}
                </a>
              );
            })}
          </nav>
          <a className={styles.headerCta} href={plannerTarget}>
            {plannerCta}
          </a>
          <button
            ref={menuButtonRef}
            className={styles.menuButton}
            type="button"
            aria-label={
              open
                ? copy.navigation.closeMenu
                : copy.navigation.openMenu
            }
            aria-expanded={open}
            aria-controls="home-mobile-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
          </button>
        </div>
      </div>

      <nav
        id="home-mobile-navigation"
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
        aria-label={copy.navigation.mobileLabel}
        hidden={!open}
      >
        <a href="#planning-proof" onClick={close}>
          {copy.navigation.planning}
        </a>
        <a href="#studio" onClick={close}>
          {copy.navigation.studio}
        </a>
        <a href="#faq" onClick={close}>
          {copy.navigation.faq}
        </a>
        <div
          className={styles.mobileLanguageNav}
          role="group"
          aria-label={copy.navigation.languageLabel}
        >
          {homegroundLocales.map((targetLocale) => {
            const target = getHomegroundCopy(targetLocale);
            return (
              <a
                aria-current={
                  targetLocale === locale ? "page" : undefined
                }
                href={`${target.path}${languageHash}`}
                hrefLang={target.htmlLang}
                key={targetLocale}
                lang={target.htmlLang}
                onClick={(event) =>
                  handleLanguageChange(event, targetLocale)
                }
              >
                {target.languageShort}
              </a>
            );
          })}
        </div>
        <a className={styles.mobileCta} href={plannerTarget} onClick={close}>
          {plannerCta}
        </a>
      </nav>
    </header>
  );
}
