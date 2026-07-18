import Link from "next/link";
import {
  getHomegroundPrivacyCopy,
  homegroundPrivacyLocales,
  type HomegroundPrivacyLocale,
} from "../lib/homegroundPrivacyI18n";
import styles from "./HomegroundPrivacyPage.module.css";

export function HomegroundPrivacyPage({
  locale = "en",
}: {
  locale?: HomegroundPrivacyLocale;
}) {
  const copy = getHomegroundPrivacyCopy(locale);

  return (
    <div
      className={styles.localeRoot}
      data-privacy-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={styles.skipLink} href="#privacy-content">
        {copy.skipLink}
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link
            className={styles.brand}
            href={copy.homePath}
            aria-label={copy.navigation.homeLabel}
          >
            <span className={styles.brandMark} aria-hidden="true">
              <span />
            </span>
            <span>
              <strong lang="en">Homeground</strong>
              <small>{copy.navigation.privacyLabel}</small>
            </span>
          </Link>

          <div className={styles.headerActions}>
            <nav
              className={styles.languageNav}
              aria-label={copy.navigation.languageLabel}
            >
              {homegroundPrivacyLocales.map((targetLocale) => {
                const target = getHomegroundPrivacyCopy(targetLocale);
                return (
                  <Link
                    aria-current={
                      targetLocale === locale ? "page" : undefined
                    }
                    href={target.pagePath}
                    hrefLang={target.htmlLang}
                    key={targetLocale}
                    lang={target.htmlLang}
                  >
                    {target.languageShort}
                  </Link>
                );
              })}
            </nav>
            <Link className={styles.homeCta} href={copy.homePath}>
              {copy.navigation.homeCta}
            </Link>
          </div>
        </div>
      </header>

      <main id="privacy-content">
        <section className={styles.hero} aria-labelledby="privacy-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 id="privacy-title">{copy.hero.title}</h1>
            <p className={styles.heroIntro}>{copy.hero.intro}</p>
            <p className={styles.reviewed}>
              <span>{copy.hero.reviewedLabel}</span>
              <strong>{copy.hero.reviewedValue}</strong>
            </p>
          </div>

          <aside className={styles.releaseBlock} aria-labelledby="release-title">
            <p className={styles.statusLabel}>{copy.status.eyebrow}</p>
            <h2 id="release-title">{copy.status.title}</h2>
            <p>{copy.status.body}</p>
            <h3>{copy.status.blockersTitle}</h3>
            <ul>
              {copy.status.blockers.map((blocker) => (
                <li key={blocker}>{blocker}</li>
              ))}
            </ul>
          </aside>
        </section>

        <article className={styles.notice}>
          <section
            className={styles.currentFlow}
            aria-labelledby="current-flow-title"
          >
            <h2 id="current-flow-title">{copy.currentFlow.title}</h2>
            <div>
              {copy.currentFlow.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section
            className={styles.section}
            aria-labelledby="collection-title"
          >
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{copy.collection.eyebrow}</p>
              <h2 id="collection-title">{copy.collection.title}</h2>
              <p>{copy.collection.intro}</p>
            </header>
            <div className={styles.itemGrid}>
              {copy.collection.items.map((item) => (
                <article className={styles.itemCard} key={item.name}>
                  <p className={styles.stage}>{item.stage}</p>
                  <h3>{item.name}</h3>
                  <p>{item.purpose}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="providers-title">
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{copy.providers.eyebrow}</p>
              <h2 id="providers-title">{copy.providers.title}</h2>
              <p>{copy.providers.intro}</p>
            </header>
            <dl className={styles.configurationList}>
              {copy.providers.rows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    <code>{row.value}</code>
                    <p>{row.detail}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            className={styles.section}
            aria-labelledby="configuration-title"
          >
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{copy.configuration.eyebrow}</p>
              <h2 id="configuration-title">{copy.configuration.title}</h2>
              <p>{copy.configuration.intro}</p>
            </header>
            <dl className={styles.configurationList}>
              {copy.configuration.rows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>
                    <code>{row.value}</code>
                    <p>{row.detail}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.section} aria-labelledby="choices-title">
            <header className={styles.sectionHeading}>
              <p className={styles.eyebrow}>{copy.choices.eyebrow}</p>
              <h2 id="choices-title">{copy.choices.title}</h2>
              {copy.choices.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </header>
            <ul className={styles.choiceList}>
              {copy.choices.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={styles.contact} aria-labelledby="contact-title">
            <div>
              <p className={styles.eyebrow}>{copy.contact.eyebrow}</p>
              <h2 id="contact-title">{copy.contact.title}</h2>
              <p>{copy.contact.body}</p>
            </div>
            <dl>
              <div>
                <dt>{copy.contact.emailLabel}</dt>
                <dd>
                  <code>{copy.contact.emailPlaceholder}</code>
                </dd>
              </div>
              <div>
                <dt>{copy.contact.addressLabel}</dt>
                <dd>
                  <code>{copy.contact.addressPlaceholder}</code>
                </dd>
              </div>
            </dl>
          </section>
        </article>
      </main>

      <footer className={styles.footer}>
        <p>{copy.footer}</p>
        <Link href={copy.homePath}>{copy.navigation.homeCta}</Link>
      </footer>
    </div>
  );
}
