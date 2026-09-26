"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HomegroundBrandMark } from "./HomegroundBrandMark";
import { usePrivateTourSelection } from "./PrivateTourSelection";
import { setNavigationMenuOpen } from "../lib/siteOverlayState";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import {
  buildPrivateTourDetailHref,
  type PrivateTourInquirySelection,
} from "../lib/privateTourInquiryContext";
import { jaPilot } from "../lib/jaPilot";
import headerStyles from "./HomegroundHeader.module.css";
import footerStyles from "./HomegroundFooter.module.css";
import styles from "./JapaneseTourChrome.module.css";

const tourPaths = [
  { label: "EN", lang: "en", path: `/tours/${jaPilot.tourSlug}/` },
  { label: "ZH", lang: "zh-Hans", path: `/zh/tours/${jaPilot.tourSlug}/` },
  { label: "KO", lang: "ko", path: `/ko/tours/${jaPilot.tourSlug}/` },
  { label: "JA", lang: "ja", path: jaPilot.tour },
] as const;

const primaryLinks = [
  { href: jaPilot.home, label: "ホーム", description: "日本語の旅のご案内" },
  { href: jaPilot.tour, label: "江南6日間の旅", description: "上海・蘇州・杭州を巡るプライベートツアー" },
  { href: jaPilot.guide, label: "旅行ガイド", description: "上海・杭州の移動と旅程" },
] as const;

/** The Japanese pilot publishes only the standard-guided 2/4/6-person offer. */
function useSelectedTourHref() {
  const context = usePrivateTourSelection();
  const selected: PrivateTourInquirySelection =
    context?.slug === jaPilot.tourSlug &&
    context.selection.packageId === "standard-guided"
      ? context.selection
      : { packageId: "standard-guided", travelers: 2 };

  return (path: string) =>
    buildPrivateTourDetailHref(path, jaPilot.tourSlug, selected);
}

export function JapaneseTourHeader() {
  const selectedHref = useSelectedTourHref();
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
  const contactHref = selectedHref(`${jaPilot.tour}#contact`);

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
            href={jaPilot.home}
            onClick={close}
          >
            <HomegroundBrandMark className={headerStyles.brandMark} />
            <span>
              <strong lang="en">Homeground China</strong>
              <small>中国プライベート旅行</small>
            </span>
          </a>

          <nav aria-label="主なページ" className={headerStyles.desktopNav}>
            {primaryLinks.map((item) => (
              <a
                aria-current={item.href === jaPilot.tour ? "page" : undefined}
                href={item.href === jaPilot.tour ? selectedHref(item.href) : item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={headerStyles.headerActions}>
            <a className={headerStyles.desktopUtilityLink} href={jaPilot.privacy}>
              プライバシー
            </a>
            <nav aria-label="言語を選ぶ" className={headerStyles.languageNav}>
              {tourPaths.map((item) => (
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
            <a aria-label="旅について相談する" className={headerStyles.headerCta} href={contactHref}>
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
                aria-current={item.href === jaPilot.tour ? "page" : undefined}
                href={item.href === jaPilot.tour ? selectedHref(item.href) : item.href}
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
              <a className={headerStyles.mobileUtilityLink} href={jaPilot.privacy} onClick={close}>
                <span>プライバシー</span>
                <span aria-hidden="true">→</span>
              </a>
              <div
                aria-label="言語を選ぶ"
                className={`${headerStyles.mobileLanguageNav} ${styles.mobileLanguageNav}`}
                role="group"
              >
                {tourPaths.map((item) => (
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
            <a className={headerStyles.mobileCta} href={contactHref} onClick={close}>
              旅について相談する
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function JapaneseTourFooter() {
  const selectedHref = useSelectedTourHref();
  return (
    <footer className={`${footerStyles.footer} ${styles.japaneseFooter}`}>
      <div className={`${footerStyles.footerTop} ${styles.footerTop}`}>
        <div>
          <strong lang="en">Homeground China</strong>
          <span>中国プライベート旅行</span>
        </div>
        <nav aria-label="フッターナビゲーション">
          <a href={jaPilot.home}>ホーム</a>
          <a href={selectedHref(jaPilot.tour)}>江南6日間の旅</a>
          <a href={jaPilot.guide}>旅行ガイド</a>
        </nav>
      </div>
      <div className={footerStyles.footerLegal}>
        <p>
          Homeground China は{" "}
          <a href="/business-information/" hrefLang="en" lang="zh-Hans">
            {homegroundBusiness.publicName}
          </a>{" "}
          が運営しています。事業者情報は英語のページで確認できます。
          <span>統一社会信用コード：{homegroundBusiness.unifiedSocialCreditCode}</span>
          <span>旅行社業務経営許可番号：{homegroundBusiness.travelAgencyLicenceNumber}</span>
        </p>
        <nav aria-label="プライバシー・利用条件">
          <a href="/business-information/" hrefLang="en">事業者情報（英語）</a>
          <a href="/terms/" hrefLang="en">利用規約（英語）</a>
          <a href={jaPilot.privacy}>プライバシー</a>
          <a href="/refund-delivery/" hrefLang="en">返金・提供条件（英語）</a>
        </nav>
      </div>
      <p className={footerStyles.footerNote}>
        © {new Date().getFullYear()} Homeground China. All rights reserved.
      </p>
    </footer>
  );
}
