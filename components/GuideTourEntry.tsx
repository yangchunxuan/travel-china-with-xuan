"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
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
    title: "Private tours in China",
    detail: "Browse our itineraries and find a trip for your group.",
    action: "View itineraries & prices",
    label: "China private tours",
    close: "Close tour suggestion",
    href: "/#travel-products",
  },
  zh: {
    title: "中国私人旅行团",
    detail: "看看我们有哪些行程，选一条适合你和同行人的路线。",
    action: "查看行程与价格",
    label: "中国私人旅行线路",
    close: "关闭线路推荐",
    href: "/zh/#travel-products",
  },
  ko: {
    title: "중국 프라이빗 여행",
    detail: "여행 일정을 살펴보고 일행에게 맞는 상품을 찾아보세요.",
    action: "일정과 가격 보기",
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
  const privacyManagerOpen = useSyncExternalStore(
    subscribePrivacyManager, getPrivacyManagerOpen, getServerPrivacyManagerOpen,
  );

  useEffect(() => {
    setDismissed(readGuideTourEntryDismissed());
    markGuideTourEntrySeen();
  }, [guideId]);

  return (
    <>
      <script data-homeground-tour-entry-bootstrap="true" dangerouslySetInnerHTML={{ __html: guideTourEntryBootstrap }} />
      <div
        className={styles.placement}
        data-homeground-tour-entry="true"
        data-dismissed={dismissed ? "true" : undefined}
        data-overlay-hidden={menuOpen || privacyManagerOpen ? "true" : undefined}
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
