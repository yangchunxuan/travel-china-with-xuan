"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  dismissGuideTourEntry,
  guideTourEntryBootstrap,
  markGuideTourEntrySeen,
  readGuideTourEntryDismissed,
} from "../lib/guideTourEntry";
import {
  getPrivacyManagerOpen,
  getServerPrivacyManagerOpen,
  subscribePrivacyManager,
} from "../lib/siteOverlayState";
import styles from "./GuideTourEntry.module.css";

const copy = {
  en: {
    title: "China, your way.",
    detail: "Private itineraries, planned around you.",
    action: "Explore our private tours",
    label: "China private tours",
    close: "Close tour suggestion",
    href: "/#travel-products",
  },
  zh: {
    title: "按你的方式，游中国。",
    detail: "和同行的人一起，选择适合自己的私人线路。",
    action: "查看私人旅行线路",
    label: "中国私人旅行线路",
    close: "关闭线路推荐",
    href: "/zh/#travel-products",
  },
  ko: {
    title: "나만의 방식으로 만나는 중국",
    detail: "일행과 여행 취향에 맞는 프라이빗 일정.",
    action: "프라이빗 여행 상품 보기",
    label: "중국 프라이빗 여행",
    close: "여행 추천 닫기",
    href: "/ko/#travel-products",
  },
} satisfies Record<HomegroundLocale, {
  title: string; detail: string; action: string; label: string; close: string; href: string;
}>;

export function GuideTourEntry({ locale, guideId, menuOpen }: {
  locale: HomegroundLocale;
  guideId: string;
  menuOpen: boolean;
}) {
  const text = copy[locale];
  const [dismissed, setDismissed] = useState(false);
  const [articleVisible, setArticleVisible] = useState(true);
  const placementRef = useRef<HTMLDivElement>(null);
  const privacyManagerOpen = useSyncExternalStore(
    subscribePrivacyManager, getPrivacyManagerOpen, getServerPrivacyManagerOpen,
  );

  useEffect(() => {
    setDismissed(readGuideTourEntryDismissed());
    markGuideTourEntrySeen();
  }, [guideId]);

  useEffect(() => {
    const article = placementRef.current?.parentElement?.querySelector(":scope > main");
    if (!article) return;
    const observer = new IntersectionObserver(([entry]) => setArticleVisible(entry.isIntersecting));
    observer.observe(article);
    return () => observer.disconnect();
  }, [guideId]);

  return (
    <>
      <script data-homeground-tour-entry-bootstrap="true" dangerouslySetInnerHTML={{ __html: guideTourEntryBootstrap }} />
      <div
        className={styles.placement}
        data-homeground-tour-entry="true"
        data-dismissed={dismissed ? "true" : undefined}
        data-overlay-hidden={menuOpen || privacyManagerOpen ? "true" : undefined}
        data-article-visible={articleVisible ? "true" : "false"}
        ref={placementRef}
      >
        <aside className={styles.card} aria-label={text.label}>
          <div className={styles.copy}>
            <p className={styles.title}>{text.title}</p>
            <p className={styles.detail}>{text.detail}</p>
            <a
              className={styles.link}
              href={text.href}
              onClick={() => trackEvent("navigation_clicked", {
                guide_id: guideId,
                page_language: locale,
                navigation_item: "tours",
                navigation_surface: "article-entry",
              })}
            >
              {text.action}
            </a>
          </div>
          <button
            className={styles.close}
            type="button"
            aria-label={text.close}
            onClick={(event) => {
              // Return keyboard focus to the existing catalog navigation, without scrolling.
              const root = event.currentTarget.closest("[data-homeground-tour-entry]")?.parentElement;
              const catalogHref = locale === "en" ? "/tours/" : `/${locale}/tours/`;
              const catalogLink = root?.querySelector<HTMLAnchorElement>(`header a[href="${catalogHref}"]`);
              const fallback = root?.querySelector<HTMLButtonElement>('header button[aria-controls="homeground-mobile-navigation"]');
              dismissGuideTourEntry();
              setDismissed(true);
              if (catalogLink?.getClientRects().length) catalogLink.focus({ preventScroll: true });
              else fallback?.focus({ preventScroll: true });
            }}
          >
            <X aria-hidden="true" size={17} strokeWidth={1.5} />
          </button>
        </aside>
      </div>
    </>
  );
}
