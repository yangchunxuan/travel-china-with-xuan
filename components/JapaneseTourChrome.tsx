"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HomegroundBrandMark } from "./HomegroundBrandMark";
import { usePrivateTourSelection } from "./PrivateTourSelection";
import { setNavigationMenuOpen } from "../lib/siteOverlayState";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { privateTourInquirySelectionQueryKeys } from "../lib/privateTourInquiryContext";
import { jaPilot } from "../lib/jaPilot";
import {
  japaneseLanguagePaths,
  japaneseLegalLinks,
  japanesePrimaryLinks,
  japaneseSite,
  type JapaneseLanguagePath,
} from "../lib/japaneseSite";
import headerStyles from "./HomegroundHeader.module.css";
import footerStyles from "./HomegroundFooter.module.css";
import styles from "./JapaneseTourChrome.module.css";

function useSelectedTourHref(slug: string | null) {
  const context = usePrivateTourSelection();
  return (path: string) => {
    if (!slug || context?.slug !== slug) return path;
    const url = new URL(path, "https://homegroundchina.com");
    url.searchParams.set(privateTourInquirySelectionQueryKeys.packageId, context.selection.packageId);
    url.searchParams.set(privateTourInquirySelectionQueryKeys.travelers, String(context.selection.travelers));
    return `${url.pathname}${url.search}${url.hash}`;
  };
}

function tourPaths(tourSlug: string | null) {
  const currentPath = tourSlug ? `/ja/tours/${tourSlug}/` : japaneseSite.tours;
  const englishPath = tourSlug ? `/tours/${tourSlug}/` : "/tours/";
  return { currentPath, languagePaths: japaneseLanguagePaths(englishPath, currentPath) };
}

/** Product and catalog pages keep the chosen package and party size in every self link. */
export function JapaneseTourHeader({ tourSlug = jaPilot.tourSlug }: { tourSlug?: string | null }) {
  const { currentPath, languagePaths } = tourPaths(tourSlug);
  return (
    <JapaneseSiteHeader
      contactHref={`${currentPath}#contact`}
      currentPath={currentPath}
      languagePaths={languagePaths}
      selectionSlug={tourSlug}
    />
  );
}

export function JapaneseSiteHeader({
  contactHref,
  currentPath,
  languagePaths,
  selectionSlug = null,
}: {
  contactHref: string;
  currentPath: string;
  languagePaths: readonly JapaneseLanguagePath[];
  selectionSlug?: string | null;
}) {
  const selectedHref = useSelectedTourHref(selectionSlug);
  const primaryLinks = japanesePrimaryLinks;
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setNavigationMenuOpen(open);
    return () => setNavigationMenuOpen(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const header = menuButtonRef.current?.closest("header");
    const blockedElements: HTMLElement[] = [];
    let branch = header instanceof HTMLElement ? header : null;
    while (branch && branch !== document.body) {
      const parent = branch.parentElement;
      if (!parent) break;
      for (const sibling of Array.from(parent.children)) {
        if (sibling instanceof HTMLElement && sibling !== branch) blockedElements.push(sibling);
      }
      branch = parent;
    }
    const blockedStates = blockedElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute("aria-hidden"),
    }));
    for (const { element } of blockedStates) {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    }

    const focusFrame = window.requestAnimationFrame(() => {
      mobileNavRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !header) return;
      const focusable = Array.from(
        header.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1180) setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(focusFrame);
      document.documentElement.style.overflow = previousOverflow;
      for (const { element, inert, ariaHidden } of blockedStates) {
        element.inert = inert;
        if (ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", ariaHidden);
      }
    };
  }, [open]);

  const close = () => setOpen(false);
  const ctaHref = selectedHref(contactHref);

  return (
    <header
      className={`${headerStyles.siteHeader} ${styles.japaneseHeader}`}
      data-homeground-header-context="tour"
      data-homeground-header-locale="ja"
      data-menu-open={open ? "true" : "false"}
    >
      <div
        aria-label={open ? "モバイルメニュー" : undefined}
        aria-modal={open ? "true" : undefined}
        className={headerStyles.headerDialog}
        role={open ? "dialog" : undefined}
      >
        <div className={headerStyles.headerInner}>
          <a
            aria-label="Homeground China 日本語トップ"
            className={`${headerStyles.brand} ${styles.brand}`}
            href={japaneseSite.home}
            onClick={close}
          >
            <HomegroundBrandMark className={headerStyles.brandMark} />
            <span>
              <strong lang="en">Homeground China</strong>
              <small>中国の旅行会社</small>
            </span>
          </a>

          {/* The logo already links home, so the desktop nav leaves ホーム out (as the English nav does). */}
          <nav aria-label="主なページ" className={headerStyles.desktopNav}>
            {primaryLinks.filter((item) => item.href !== japaneseSite.home).map((item) => (
              <a
                aria-current={item.href === currentPath ? "page" : undefined}
                href={item.href === currentPath ? selectedHref(item.href) : item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={headerStyles.headerActions}>
            <a className={`${headerStyles.desktopUtilityLink} ${styles.faqUtilityLink}`} href={`${japaneseSite.home}#faq`}>
              よくある質問
            </a>
            <nav aria-label="言語を選ぶ" className={headerStyles.languageNav}>
              {languagePaths.map((item) => (
                <a
                  aria-current={item.lang === "ja" ? "page" : undefined}
                  href={selectedHref(item.path)}
                  hrefLang={item.lang}
                  key={item.lang}
                  lang={item.lang}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a aria-label="旅について相談する" className={headerStyles.headerCta} href={ctaHref}>
              <span className={headerStyles.headerCtaLong} aria-hidden="true">旅について相談する</span>
              <span className={headerStyles.headerCtaShort} aria-hidden="true">相談</span>
            </a>
            <button
              aria-controls="japanese-tour-mobile-navigation"
              aria-expanded={open}
              aria-label={open ? "メニューを閉じる" : "メニューを開く"}
              className={headerStyles.menuButton}
              onClick={() => setOpen((current) => !current)}
              ref={menuButtonRef}
              type="button"
            >
              {open ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
            </button>
          </div>
        </div>

        <nav
          aria-label="モバイルメニュー"
          className={headerStyles.mobileNav}
          hidden={!open}
          id="japanese-tour-mobile-navigation"
          ref={mobileNavRef}
        >
          <div className={`${headerStyles.mobilePrimaryLinks} ${styles.mobilePrimaryLinks}`}>
            {primaryLinks.map((item) => (
              <a
                aria-current={item.href === currentPath ? "page" : undefined}
                href={item.href === currentPath ? selectedHref(item.href) : item.href}
                key={item.href}
                onClick={close}
              >
                <span className={headerStyles.mobileNavCopy}>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
          <div className={headerStyles.mobileUtility}>
            <div className={headerStyles.mobileUtilityRow}>
              <a className={headerStyles.mobileUtilityLink} href={`${japaneseSite.home}#faq`} onClick={close}>
                <span>よくある質問</span>
                <span aria-hidden="true">→</span>
              </a>
              <div
                aria-label="言語を選ぶ"
                className={`${headerStyles.mobileLanguageNav} ${styles.mobileLanguageNav}`}
                role="group"
              >
                {languagePaths.map((item) => (
                  <a
                    aria-current={item.lang === "ja" ? "page" : undefined}
                    href={selectedHref(item.path)}
                    hrefLang={item.lang}
                    key={item.lang}
                    lang={item.lang}
                    onClick={close}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <a className={headerStyles.mobileCta} href={ctaHref} onClick={close}>
              旅について相談する
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function JapaneseTourFooter({ tourSlug = jaPilot.tourSlug }: { tourSlug?: string | null }) {
  const { currentPath } = tourPaths(tourSlug);
  return <JapaneseSiteFooter currentPath={currentPath} selectionSlug={tourSlug} />;
}

export function JapaneseSiteFooter({
  currentPath,
  selectionSlug = null,
}: {
  currentPath: string;
  selectionSlug?: string | null;
}) {
  const selectedHref = useSelectedTourHref(selectionSlug);
  return (
    <footer className={`${footerStyles.footer} ${styles.japaneseFooter}`}>
      <div className={`${footerStyles.footerTop} ${styles.footerTop}`}>
        <div>
          <strong lang="en">Homeground China</strong>
          <span>中国の旅行会社</span>
        </div>
        <nav aria-label="フッターナビゲーション">
          {japanesePrimaryLinks.map((item) => (
            <a
              aria-current={item.href === currentPath ? "page" : undefined}
              href={item.href === currentPath ? selectedHref(item.href) : item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className={footerStyles.footerLegal}>
        <p>
          Homeground China は{" "}
          <a href={japaneseSite.businessInformation} lang="zh-Hans">
            {homegroundBusiness.publicName}
          </a>{" "}
          が運営しています。
          <span>統一社会信用コード：{homegroundBusiness.unifiedSocialCreditCode}</span>
          <span>旅行業許可番号（中国）：{homegroundBusiness.travelAgencyLicenceNumber}</span>
        </p>
        <nav aria-label="事業者情報・規約">
          {japaneseLegalLinks.map((item) => (
            <a aria-current={item.href === currentPath ? "page" : undefined} href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <p className={footerStyles.footerNote}>
        © {new Date().getFullYear()} Homeground China. All rights reserved.
      </p>
    </footer>
  );
}
