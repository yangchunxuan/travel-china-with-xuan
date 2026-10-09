import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import {
  buildPrivateCarServiceStructuredData, privateCarServiceEnquiryAnchor,
  privateCarServiceKinds, privateCarServicePath,
} from "../lib/privateCarServices";
import { getPrivateCarServiceCopy } from "../lib/privateCarServicesI18n";
import { privateGuideServicePath } from "../lib/privateGuideServices";
import { fullTripSupportPath } from "../lib/fullTripSupport";
import { HomegroundHeader } from "./HomegroundHeader";
import { HomegroundFooter } from "./HomegroundFooter";
import { PrivateCarServiceEnquiry } from "./PrivateCarServiceEnquiry";
import localeStyles from "./LocaleRoot.module.css";
import styles from "./PrivateCarServicesPage.module.css";

export function PrivateCarServicesPage({ locale = "en" }: { locale?: HomegroundLocale }) {
  const home = getHomegroundCopy(locale);
  const copy = getPrivateCarServiceCopy(locale);
  const enquire = "#" + privateCarServiceEnquiryAnchor;
  return (
    <div className={[localeStyles.root, "hg-locale-root", styles.page].join(" ")}
      data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={localeStyles.skipLink} href="#private-car-main">{home.skipLink}</a>
      <HomegroundHeader locale={locale} pageContext="services" languagePaths={privateCarServicePath}
        plannerHrefOverride={enquire} />
      <main id="private-car-main" tabIndex={-1}>
        <header className={styles.hero}>
          <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}>
            <ol>
              <li><Link href={home.path}>{copy.home}</Link></li>
              <li><Link href={home.path + "services/"}>{copy.services}</Link></li>
              <li aria-current="page">{copy.name}</li>
            </ol>
          </nav>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>{copy.h1}</h1>
          <p className={styles.lede}>{copy.lede}</p>
          <a className={styles.primaryButton} href={enquire}>
            {copy.ask}<ArrowRight aria-hidden="true" size={18} />
          </a>
          <ul className={styles.facts}>{copy.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
        </header>

        <section className={styles.section} aria-labelledby="car-kinds-title">
          <div className={styles.sectionIntro}>
            <h2 id="car-kinds-title">{copy.kindsTitle}</h2><p>{copy.kindsBody}</p>
          </div>
          <ol className={styles.kindGrid}>
            {privateCarServiceKinds.map((kind, index) => (
              <li className={styles.kindCard} key={kind}>
                <span className={styles.eyebrow} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{copy.kinds[kind].title}</h3><p>{copy.kinds[kind].body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={[styles.section, styles.quoteSection].join(" ")} aria-labelledby="car-quote-title">
          <div><h2 id="car-quote-title">{copy.quoteTitle}</h2><p>{copy.quoteBody}</p></div>
          <div>
            <ul className={styles.written}>{copy.written.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className={styles.note}>{copy.quoteNote}</p>
            <p className={styles.legalLinks}>
              <Link href={home.path + "business-information/"}>{copy.companyLink}</Link>
              <Link href={home.path + "terms/"}>{copy.termsLink}</Link>
            </p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="car-related-title">
          <h2 id="car-related-title">{copy.relatedTitle}</h2>
          <div className={styles.relatedGrid}>
            <article>
              <h3>{copy.guideTitle}</h3><p>{copy.guideBody}</p>
              <Link className={styles.textLink} href={privateGuideServicePath[locale]}>
                {copy.guideLink}<ArrowRight aria-hidden="true" size={17} />
              </Link>
            </article>
            <article>
              <h3>{copy.fullTripTitle}</h3><p>{copy.fullTripBody}</p>
              <Link className={styles.textLink} href={fullTripSupportPath[locale]}>
                {copy.fullTripLink}<ArrowRight aria-hidden="true" size={17} />
              </Link>
            </article>
          </div>
        </section>

        <section className={[styles.section, styles.faq].join(" ")} aria-labelledby="car-faq-title">
          <h2 id="car-faq-title">{copy.faqTitle}</h2>
          <div>{copy.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}</div>
        </section>

        <section className={[styles.section, styles.enquirySection].join(" ")} id={privateCarServiceEnquiryAnchor}
          aria-labelledby="car-enquiry-title">
          <div><p className={styles.eyebrow}>{copy.ask}</p><h2 id="car-enquiry-title">{copy.enquiry.title}</h2>
            <p>{copy.enquiry.body}</p>
          </div>
          <PrivateCarServiceEnquiry locale={locale} />
        </section>
      </main>
      <HomegroundFooter locale={locale} pageContext="services" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildPrivateCarServiceStructuredData(locale, copy, home.htmlLang)).replace(/</g, "\\u003c"),
      }} />
    </div>
  );
}
