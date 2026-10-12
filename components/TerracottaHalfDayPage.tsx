import Image from "next/image";
import Link from "next/link";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { terracottaHalfDayCopy, terracottaHalfDayEnquiryAnchor, terracottaHalfDayImage, terracottaHalfDayPaths, terracottaHalfDayReadHref } from "../lib/terracottaHalfDayTour";
import { HomegroundHeader } from "./HomegroundHeader";
import { HomegroundFooter } from "./HomegroundFooter";
import localeStyles from "./LocaleRoot.module.css";
import { TerracottaHalfDaySend } from "./TerracottaHalfDaySend";
import styles from "./TerracottaHalfDayPage.module.css";

function AttractionHeading({ text }: { text: string }) {
  return text.split(/(兵马俑|陶俑)/u).map((part, index) =>
    /^(兵马俑|陶俑)$/u.test(part)
      ? <span className={styles.keepWord} key={index}>{part}</span>
      : part,
  );
}

/**
 * The quote-on-request half-day tour at /tours/, set in the full-trip page's
 * language (FullTripSupportPage.module.css): white ground, large serif words
 * at weight 400, grey notes in small sans, hairlines, and one way forward
 * marked by a thin arrow. Nothing is boxed, filled, pilled or given an icon.
 * Each section is a heading with a plain list beside it.
 */
export function TerracottaHalfDayPage({ locale }: { locale: HomegroundLocale }) {
  const copy = terracottaHalfDayCopy[locale];
  return (
    <div className={`${styles.page} ${localeStyles.root} hg-locale-root`} data-homeground-locale={locale}>
      <a className={styles.skip} href="#terracotta-main">{copy.skip}</a>
      <HomegroundHeader locale={locale} pageContext="tour" languagePaths={terracottaHalfDayPaths} />
      <main className={styles.main} id="terracotta-main">
        {/* The photograph sits beside the headline on a wide screen and under it on a phone, never wider than the words. */}
        <section className={styles.hero} aria-labelledby="terracotta-title">
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label={copy.home}>
              <Link href={locale === "en" ? "/" : `/${locale}/`}>{copy.home}</Link><span aria-hidden="true">/</span><span>{copy.eyebrow}</span>
            </nav>
            <h1 id="terracotta-title"><AttractionHeading text={copy.title} /></h1>
            <p className={styles.promise}>{copy.promise}</p>
            <a className={styles.send} href={`#${terracottaHalfDayEnquiryAnchor}`}>{copy.primaryCta}</a>
          </div>
          <figure className={styles.heroImage}>
            <Image src={terracottaHalfDayImage.src} width={1280} height={853} alt={copy.heroAlt} priority sizes="(min-width: 62rem) 34rem, 100vw" />
            <figcaption>{copy.heroCaption}</figcaption>
          </figure>
        </section>

        <dl className={styles.facts}>
          {copy.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
        </dl>

        <section id="half-day-itinerary" className={styles.block} aria-labelledby="itinerary-title">
          <div className={styles.blockHead}>
            <h2 id="itinerary-title"><AttractionHeading text={copy.routeTitle} /></h2>
            <p>{copy.routeBody}</p>
          </div>
          <div>
            <ol className={styles.stops}>
              {copy.stops.map((stop) => (
                <li key={stop.time}>
                  <p className={styles.stopTime}>{stop.time}</p>
                  <h3><AttractionHeading text={stop.title} /></h3>
                  <p>{stop.body}</p>
                </li>
              ))}
            </ol>
            <p className={styles.small}>{copy.timingNote}</p>
          </div>
        </section>

        <section className={styles.block} aria-labelledby="scope-title">
          <div className={styles.blockHead}>
            <h2 id="scope-title">{copy.scopeTitle}</h2>
          </div>
          <div>
            <div className={styles.scope}>
              <div>
                <h3>{copy.includedTitle}</h3>
                <ul className={styles.included}>{copy.included.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h3>{copy.excludedTitle}</h3>
                <ul className={styles.excluded}>{copy.excluded.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
            <div className={styles.small}>
              <p><strong>{copy.bookingTitle}</strong> {copy.bookingBody}</p>
              <a className={styles.textLink} href="https://www.bmy.com.cn/guide/">{copy.officialLink}</a>
            </div>
          </div>
        </section>

        {/* The price and what to send for it, together: the one place the page asks for anything. */}
        <section id={terracottaHalfDayEnquiryAnchor} className={styles.block} aria-labelledby="price-title">
          <div className={styles.blockHead}>
            <h2 id="price-title">{copy.priceTitle}</h2>
            <p>{copy.priceBody}</p>
          </div>
          <div>
            <ol className={styles.asks}>
              {copy.enquiryDetails.map((detail, index) => (
                <li key={detail.title}>
                  <span className={styles.askNumber} aria-hidden="true">{index + 1}</span>
                  <div><h3>{detail.title}</h3><p>{detail.body}</p></div>
                </li>
              ))}
            </ol>
            <TerracottaHalfDaySend locale={locale} />
            <p className={styles.small}>{copy.enquiryNote}</p>
          </div>
        </section>

        <section className={styles.block} aria-labelledby="faq-title">
          <div className={styles.blockHead}>
            <h2 id="faq-title">{copy.faqTitle}</h2>
          </div>
          <div className={styles.faq}>
            {copy.faq.map((faq) => <details key={faq.question}><summary><span>{faq.question}</span></summary><p>{faq.answer}</p></details>)}
          </div>
        </section>

        <section className={styles.block} aria-labelledby="read-title">
          <div className={styles.blockHead}>
            <h2 id="read-title">{copy.readTitle}</h2>
          </div>
          <ul className={styles.read}>
            {copy.readLinks.map((link) => (
              <li key={link.path}>
                <Link className={styles.readLink} href={terracottaHalfDayReadHref(link.path, locale)} prefetch={false}>{link.title}</Link>
                <p>{link.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <p className={styles.credit}><a href={terracottaHalfDayImage.sourceUrl}>{copy.photoCredit}</a> · {terracottaHalfDayImage.author} · <a href={terracottaHalfDayImage.licenseUrl}>{terracottaHalfDayImage.license}</a></p>
      </main>
      <HomegroundFooter locale={locale} pageContext="tour" />
    </div>
  );
}
