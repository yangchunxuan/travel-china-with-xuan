"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { HomegroundWordmark, useBrandFold } from "./HomegroundWordmark";
import { HomegroundBrandMark } from "./HomegroundBrandMark";
import { EditionMobileNav } from "./EditionMobileNav";
import { setNavigationMenuOpen } from "../lib/siteOverlayState";
import { getPrivateTourInquiryContext } from "../lib/privateTourInquiryContext";
import { openTourContactForContext } from "../lib/tourContact";
import { usePrivateTourSelection } from "./PrivateTourSelection";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import {
  frenchLanguagePaths,
  frenchLegalLinks,
  frenchPrimaryLinks,
  frenchSite,
  type FrenchLanguagePath,
} from "../lib/frenchSite";
import headerStyles from "./HomegroundHeader.module.css";
import footerStyles from "./HomegroundFooter.module.css";
import styles from "./SpanishChrome.module.css";

/** Header of a French tour page; the language switch points at the same tour. */
export function FrenchTourHeader({ tourSlug }: { tourSlug: string }) {
  const currentPath = `/fr/tours/${tourSlug}/`;
  return (
    <FrenchSiteHeader
      contactHref={`${currentPath}#contact`}
      currentPath={currentPath}
      tourSlug={tourSlug}
      languagePaths={frenchLanguagePaths(`/tours/${tourSlug}/`, currentPath)}
    />
  );
}

/**
 * Site header for the French pages. Its contact button does what the main
 * header's does: on a tour page it opens that tour's quote dialog with the
 * chosen option and group; elsewhere it is the planner link the contact card
 * answers. Both keep a real href for visits without JavaScript.
 */
export function FrenchSiteHeader({
  contactHref = frenchSite.contact,
  currentPath,
  languagePaths,
  tourSlug,
}: {
  contactHref?: string;
  currentPath: string;
  languagePaths: readonly FrenchLanguagePath[];
  tourSlug?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = usePrivateTourSelection();
  const openTourQuote = (event: MouseEvent<HTMLAnchorElement>, returnFocus?: HTMLElement | null) => {
    if (!tourSlug) return;
    openTourContactForContext(
      event,
      getPrivateTourInquiryContext(tourSlug, "en", selected?.slug === tourSlug ? selected.selection : undefined),
      returnFocus,
    );
  };
  // The logo folds to "Hi" on scroll, as on the other languages' headers.
  const brandFold = useBrandFold();
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
      mobileNavRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !header) return;
      const focusable = Array.from(
        header.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
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

  return (
    <header
      className={`${headerStyles.siteHeader} ${styles.spanishHeader}`}
      data-homeground-header-context="tour"
      data-homeground-header-locale="fr"
      data-menu-open={open ? "true" : "false"}
      {...brandFold}
    >
      <div
        aria-label={open ? "Menu" : undefined}
        aria-modal={open ? "true" : undefined}
        className={headerStyles.headerDialog}
        role={open ? "dialog" : undefined}
      >
        <div className={headerStyles.headerInner}>
          <a
            aria-label="Homeground China, accueil en français"
            className={`${headerStyles.brand} ${styles.brand}`}
            href={frenchSite.home}
            onClick={close}
          >
            <HomegroundBrandMark className={headerStyles.brandMark} />
            <span>
              <HomegroundWordmark />
              <small>Agence de voyages en Chine</small>
            </span>
          </a>

          {/* The logo already links home, so the desktop nav leaves Inicio out. */}
          <nav aria-label="Navigation principale" className={headerStyles.desktopNav}>
            {frenchPrimaryLinks.filter((item) => item.href !== frenchSite.home).map((item) => (
              <a
                aria-current={item.href === currentPath ? "page" : undefined}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={headerStyles.headerActions}>
            <nav aria-label="Choisir une langue" className={headerStyles.languageNav}>
              {languagePaths.map((item) => (
                <a
                  aria-current={item.lang === "fr" ? "page" : undefined}
                  href={item.path}
                  hrefLang={item.lang}
                  key={item.lang}
                  lang={item.lang}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a aria-label="Préparer mon voyage" className={headerStyles.headerCta} href={contactHref} onClick={openTourQuote}>
              <span className={headerStyles.headerCtaLong} aria-hidden="true">Préparer mon voyage</span>
              <span className={headerStyles.headerCtaShort} aria-hidden="true">Mon projet</span>
            </a>
            <button
              aria-controls="french-mobile-navigation"
              aria-expanded={open}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className={headerStyles.menuButton}
              onClick={() => setOpen((current) => !current)}
              ref={menuButtonRef}
              type="button"
            >
              {open ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
            </button>
          </div>
        </div>

        <EditionMobileNav
          cta={{ href: contactHref, label: "Préparer mon voyage", onClick: (event) => openTourQuote(event, menuButtonRef.current) }}
          id="french-mobile-navigation"
          label="Menu"
          languageLabel="Choisir une langue"
          languages={languagePaths.map((item) => ({ ...item, current: item.lang === "fr" }))}
          navRef={mobileNavRef}
          onClose={close}
          open={open}
          primaryLinks={frenchPrimaryLinks.map((item) => ({
            href: item.href,
            label: item.label,
            current: item.href === currentPath,
          }))}
        />
      </div>
    </header>
  );
}

export function FrenchSiteFooter({ currentPath }: { currentPath: string }) {
  return (
    <footer className={`${footerStyles.footer} ${styles.spanishFooter}`}>
      <div className={`${footerStyles.footerTop} ${styles.footerTop}`}>
        <div>
          <strong lang="en">Homeground China</strong>
          <span>Agence de voyages en Chine</span>
        </div>
        <nav aria-label="Navigation de bas de page">
          {frenchPrimaryLinks.map((item) => (
            <a
              aria-current={item.href === currentPath ? "page" : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className={footerStyles.footerLegal}>
        <p>
          Homeground China est un service de{" "}
          <a href="/fr/business-information/" lang="zh-Hans">
            {homegroundBusiness.publicName}
          </a>
          .
          <span>Numéro d’immatriculation chinois : {homegroundBusiness.unifiedSocialCreditCode}</span>
          <span>Licence d’agence de voyages en Chine : {homegroundBusiness.travelAgencyLicenceNumber}</span>
        </p>
        <nav aria-label="Informations légales">
          {frenchLegalLinks.map((item) => (
            <a href={item.href} hrefLang={item.href.startsWith("/fr/") ? "fr" : "en"} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <p className={footerStyles.footerNote}>
        © {new Date().getFullYear()} Homeground China. Tous droits réservés.
      </p>
    </footer>
  );
}
