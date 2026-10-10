"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HomegroundWordmark, useBrandFold } from "./HomegroundWordmark";
import { HomegroundBrandMark } from "./HomegroundBrandMark";
import { EditionMobileNav } from "./EditionMobileNav";
import { setNavigationMenuOpen } from "../lib/siteOverlayState";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import {
  spanishLanguagePaths,
  spanishLegalLinks,
  spanishPrimaryLinks,
  spanishSite,
  type SpanishLanguagePath,
} from "../lib/spanishSite";
import headerStyles from "./HomegroundHeader.module.css";
import footerStyles from "./HomegroundFooter.module.css";
import styles from "./SpanishChrome.module.css";

/** Header of a Spanish tour page; the language switch points at the same tour. */
export function SpanishTourHeader({ tourSlug }: { tourSlug: string }) {
  const currentPath = `/es/tours/${tourSlug}/`;
  return (
    <SpanishSiteHeader
      contactHref={`${currentPath}#contact`}
      currentPath={currentPath}
      languagePaths={spanishLanguagePaths(`/tours/${tourSlug}/`, currentPath)}
    />
  );
}

/**
 * Site header for the Spanish pages. The contact button is a plain link to the
 * page's contact section: Spanish enquiries go by WhatsApp or email, so there
 * is no on-site form to open.
 */
export function SpanishSiteHeader({
  contactHref,
  currentPath,
  languagePaths,
}: {
  contactHref: string;
  currentPath: string;
  languagePaths: readonly SpanishLanguagePath[];
}) {
  const [open, setOpen] = useState(false);
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
      data-homeground-header-locale="es"
      data-menu-open={open ? "true" : "false"}
      {...brandFold}
    >
      <div
        aria-label={open ? "Menú" : undefined}
        aria-modal={open ? "true" : undefined}
        className={headerStyles.headerDialog}
        role={open ? "dialog" : undefined}
      >
        <div className={headerStyles.headerInner}>
          <a
            aria-label="Homeground China, inicio en español"
            className={`${headerStyles.brand} ${styles.brand}`}
            href={spanishSite.home}
            onClick={close}
          >
            <HomegroundBrandMark className={headerStyles.brandMark} />
            <span>
              <HomegroundWordmark />
              <small>Agencia de viajes en China</small>
            </span>
          </a>

          {/* The logo already links home, so the desktop nav leaves Inicio out. */}
          <nav aria-label="Páginas principales" className={headerStyles.desktopNav}>
            {spanishPrimaryLinks.filter((item) => item.href !== spanishSite.home).map((item) => (
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
            <nav aria-label="Elegir idioma" className={headerStyles.languageNav}>
              {languagePaths.map((item) => (
                <a
                  aria-current={item.lang === "es" ? "page" : undefined}
                  href={item.path}
                  hrefLang={item.lang}
                  key={item.lang}
                  lang={item.lang}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a aria-label="Consultar un viaje" className={headerStyles.headerCta} href={contactHref}>
              <span className={headerStyles.headerCtaLong} aria-hidden="true">Consultar un viaje</span>
              <span className={headerStyles.headerCtaShort} aria-hidden="true">Consultar</span>
            </a>
            <button
              aria-controls="spanish-mobile-navigation"
              aria-expanded={open}
              aria-label={open ? "Cerrar el menú" : "Abrir el menú"}
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
          cta={{ href: contactHref, label: "Consultar un viaje" }}
          id="spanish-mobile-navigation"
          label="Menú"
          languageLabel="Elegir idioma"
          languages={languagePaths.map((item) => ({ ...item, current: item.lang === "es" }))}
          navRef={mobileNavRef}
          onClose={close}
          open={open}
          primaryLinks={spanishPrimaryLinks.map((item) => ({
            href: item.href,
            label: item.label,
            current: item.href === currentPath,
          }))}
        />
      </div>
    </header>
  );
}

export function SpanishSiteFooter({ currentPath }: { currentPath: string }) {
  return (
    <footer className={`${footerStyles.footer} ${styles.spanishFooter}`}>
      <div className={`${footerStyles.footerTop} ${styles.footerTop}`}>
        <div>
          <strong lang="en">Homeground China</strong>
          <span>Agencia de viajes en China</span>
        </div>
        <nav aria-label="Navegación del pie de página">
          {spanishPrimaryLinks.map((item) => (
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
          Homeground China es un servicio de{" "}
          <a href="/business-information/" lang="zh-Hans">
            {homegroundBusiness.publicName}
          </a>
          .
          <span>Código unificado de crédito social: {homegroundBusiness.unifiedSocialCreditCode}</span>
          <span>Licencia de agencia de viajes (China): {homegroundBusiness.travelAgencyLicenceNumber}</span>
        </p>
        <nav aria-label="Información legal">
          {spanishLegalLinks.map((item) => (
            <a href={item.href} hrefLang="en" key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <p className={footerStyles.footerNote}>
        © {new Date().getFullYear()} Homeground China. Todos los derechos reservados.
      </p>
    </footer>
  );
}
