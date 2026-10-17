"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type RefObject } from "react";
import headerStyles from "./HomegroundHeader.module.css";

export interface EditionMobileNavLink {
  readonly href: string;
  readonly label: string;
  readonly current?: boolean;
}

export interface EditionMobileNavLanguage {
  readonly label: string;
  readonly lang: string;
  readonly path: string;
  readonly current: boolean;
}

/**
 * Mobile menu of the Japanese and Spanish headers. It uses the shared
 * header's own menu styles: large links, then smaller ones, then the contact
 * link and the language switch. The shared stylesheet keeps the panel
 * transparent until `data-entered` is set two frames after it opens.
 */
export function EditionMobileNav({
  id,
  label,
  open,
  navRef,
  primaryLinks,
  secondaryLinks = [],
  disclosure,
  cta,
  languageLabel,
  languages,
  labelClassName,
  onClose,
}: {
  id: string;
  label: string;
  open: boolean;
  navRef: RefObject<HTMLElement | null>;
  primaryLinks: readonly EditionMobileNavLink[];
  secondaryLinks?: readonly EditionMobileNavLink[];
  disclosure?: { href: string; label: string; description: string; entries: readonly { href: string; label: string; description: string }[] };
  cta: { href: string; label: string; onClick?: (event: MouseEvent<HTMLAnchorElement>) => void };
  languageLabel: string;
  languages: readonly EditionMobileNavLanguage[];
  /** Extra class for the link text, for a script that needs its own type size. */
  labelClassName?: string;
  onClose: () => void;
}) {
  const [entered, setEntered] = useState(false);
  const [disclosureOpen, setDisclosureOpen] = useState(false);
  const disclosureRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (!open) setDisclosureOpen(false);
  }, [open]);
  useEffect(() => {
    if (!open || !disclosureOpen) return;
    const frame = window.requestAnimationFrame(() => disclosureRef.current?.scrollIntoView({ block: "nearest" }));
    return () => window.cancelAnimationFrame(frame);
  }, [open, disclosureOpen]);

  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    let enteredFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      enteredFrame = window.requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(enteredFrame);
    };
  }, [open]);

  const item = (link: EditionMobileNavLink, index: number) => (
    <li
      className={headerStyles.mobileSection}
      data-current={link.current ? "true" : undefined}
      key={link.href}
      style={{ "--menu-index": index } as CSSProperties}
    >
      <a
        aria-current={link.current ? "page" : undefined}
        className={headerStyles.mobileSectionLink}
        href={link.href}
        onClick={onClose}
      >
        <span className={`${headerStyles.mobileSectionLabel}${labelClassName ? ` ${labelClassName}` : ""}`}>{link.label}</span>
      </a>
    </li>
  );

  return (
    <nav
      aria-label={label}
      className={headerStyles.mobileNav}
      data-entered={entered ? "true" : undefined}
      hidden={!open}
      id={id}
      ref={navRef}
    >
      <div className={headerStyles.mobileMenuScroll} data-has-open={disclosureOpen ? "true" : undefined}>
        <ul className={headerStyles.mobileSections} data-tier="primary">
          {primaryLinks.map(item)}
          {disclosure && (
            <li className={headerStyles.mobileSection} data-section="corporate" data-open={disclosureOpen ? "true" : undefined} ref={disclosureRef} style={{ "--menu-index": primaryLinks.length } as CSSProperties}>
              <button className={headerStyles.mobileSectionToggle} type="button" aria-expanded={disclosureOpen} aria-controls={`${id}-corporate-panel`} id={`${id}-corporate-toggle`} onClick={() => setDisclosureOpen((value) => !value)}>
                <span className={`${headerStyles.mobileSectionLabel}${labelClassName ? ` ${labelClassName}` : ""}`}>{disclosure.label}</span>
              </button>
              <div className={headerStyles.mobileSectionPanel} role="region" aria-labelledby={`${id}-corporate-toggle`} id={`${id}-corporate-panel`} inert={!disclosureOpen}>
                <div><ul aria-label={disclosure.label} className={headerStyles.mobileSubmenu} data-menu="corporate">
                  {[disclosure, ...disclosure.entries].map((entry, index) => <li key={entry.href} style={{ "--entry-index": index } as CSSProperties}><a href={entry.href} onClick={onClose}><span className={headerStyles.mobileEntryLabel}>{entry.label}</span><span className={headerStyles.mobileEntryDescription}>{entry.description}</span></a></li>)}
                </ul></div>
              </div>
            </li>
          )}
        </ul>
        {secondaryLinks.length > 0 ? (
          <ul className={headerStyles.mobileSections} data-tier="secondary">
            {secondaryLinks.map((link, index) => item(link, primaryLinks.length + (disclosure ? 1 : 0) + index))}
          </ul>
        ) : null}
      </div>
      <div
        className={headerStyles.mobileUtility}
        style={{ "--menu-index": primaryLinks.length + secondaryLinks.length + (disclosure ? 1 : 0) } as CSSProperties}
      >
        <a
          className={headerStyles.mobileCta}
          href={cta.href}
          onClick={(event) => {
            cta.onClick?.(event);
            onClose();
          }}
        >
          <span>{cta.label}</span>
          <span className={headerStyles.mobileCtaArrow} aria-hidden="true" />
        </a>
        <div aria-label={languageLabel} className={headerStyles.mobileLanguageNav} role="group">
          {languages.map((language) => (
            <a
              aria-current={language.current ? "true" : undefined}
              href={language.path}
              hrefLang={language.lang}
              key={language.lang}
              lang={language.lang}
              onClick={onClose}
            >
              {language.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
