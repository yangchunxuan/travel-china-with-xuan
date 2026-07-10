"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { langLabels, langPrefix, type Dict, type Lang } from "../lib/i18n";

const messengerUrl = "https://m.me/1176159805586468";

export function Brand() {
  return (
    <span className="brandrow">
      <span className="brandmark" aria-hidden="true">
        <span />
      </span>
      <span className="brandcopy">
        <strong>Homeground</strong>
        <small>China</small>
      </span>
    </span>
  );
}

function LangSwitch({ lang }: { lang: Lang }) {
  const langs: Lang[] = ["en", "ko", "zh"];
  return (
    <div className="lang-switch" aria-label="Language">
      {langs.map((l) => (
        <Link
          key={l}
          href={`${langPrefix[l]}/`}
          className={l === lang ? "is-active" : ""}
          aria-current={l === lang ? "page" : undefined}
        >
          {langLabels[l]}
        </Link>
      ))}
    </div>
  );
}

export function SiteHeader({
  t,
  lang,
  nav = true,
}: {
  t: Dict;
  lang: Lang;
  nav?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const home = langPrefix[lang];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href={`${home}/`} className="homelink" onClick={closeMenu}>
          <Brand />
        </Link>

        {nav ? (
          <>
            <nav className="desktop-nav" aria-label="Primary navigation">
              <Link href={`${home}/#journeys`}>{t.header.navJourneys}</Link>
              <Link href={`${home}/#included`}>{t.header.navHandled}</Link>
              <Link href={`${home}/#about`}>{t.header.navWhy}</Link>
              <Link href="/china-visa-free-uk-canada/">{t.header.navGuide}</Link>
            </nav>
            <LangSwitch lang={lang} />
            <a className="header-cta" href="#plan">
              {t.header.cta}
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </>
        ) : (
          <nav className="article-back" aria-label="Article navigation">
            <Link href="/">
              <ArrowLeft size={16} /> {t.header.backHome}
            </Link>
          </nav>
        )}
      </div>

      {nav && (
        <nav
          id="mobile-navigation"
          className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Mobile navigation"
        >
          <Link href={`${home}/#journeys`} onClick={closeMenu}>
            {t.header.mobileJourneys}
          </Link>
          <Link href={`${home}/#included`} onClick={closeMenu}>
            {t.header.navHandled}
          </Link>
          <Link href={`${home}/#about`} onClick={closeMenu}>
            {t.header.navWhy}
          </Link>
          <Link href="/china-visa-free-uk-canada/" onClick={closeMenu}>
            {t.header.navGuide}
          </Link>
          <div className="mobile-lang">
            <LangSwitch lang={lang} />
          </div>
          <a href="#plan" className="mobile-nav-cta" onClick={closeMenu}>
            {t.header.cta}
          </a>
        </nav>
      )}
    </header>
  );
}

export function FloatingContact({ label: _label }: { label: string }) {
  // Retired in favour of the Tawk.to on-site chat widget (bottom-right).
  // Keeping the export so callers don't need editing while the route-map WIP is open.
  return null;
}

export function SiteFooter({ t, lang }: { t: Dict; lang: Lang }) {
  const home = langPrefix[lang];
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Brand />
          <p>{t.footer.brandLine}</p>
        </div>

        <div>
          <h2>{t.footer.exploreH}</h2>
          <Link href={`${home}/#journeys`}>{t.footer.linkJourneys}</Link>
          <Link href={`${home}/#included`}>{t.footer.linkHandled}</Link>
          <Link href={`${home}/#about`}>{t.footer.linkAbout}</Link>
          <Link href="/china-visa-free-uk-canada/">{t.footer.linkGuide}</Link>
        </div>

        <div>
          <h2>{t.footer.talkH}</h2>
          <a href={messengerUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={15} /> {t.footer.messenger}
          </a>
          <a href="mailto:yangchunxuan1@gmail.com">
            <Mail size={15} /> yangchunxuan1@gmail.com
          </a>
          <p className="footer-response">{t.footer.langsSpoken}</p>
        </div>
      </div>
      <div className="wrap footer-legal">
        <span>{t.footer.legalLeft}</span>
        <span>{t.footer.legalRight}</span>
      </div>
    </footer>
  );
}
