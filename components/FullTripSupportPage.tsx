import Link from "next/link";
import type { CSSProperties } from "react";
import { attractionReservationPath } from "../lib/attractionReservations";
import { fullTripSupportEnquiryAnchor, fullTripSupportNeeds, fullTripSupportPath } from "../lib/fullTripSupport";
import { fillFullTripSupportCopy, getFullTripSupportCopy } from "../lib/fullTripSupportI18n";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { privateCarServicePath } from "../lib/privateCarServices";
import { getPrivateCarServiceCopy } from "../lib/privateCarServicesI18n";
import { privateGuideServicePath } from "../lib/privateGuideServices";
import { FullTripSupportEnquiry } from "./FullTripSupportEnquiry";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { RevealOnce } from "./motion/RevealOnce";
import { KeepWords } from "./text/KeepWords";
import styles from "./FullTripSupportPage.module.css";

const SITE_URL = "https://homegroundchina.com";

function structuredData(locale: HomegroundLocale) {
  const copy = getFullTripSupportCopy(locale);
  const home = getHomegroundCopy(locale);
  const url = `${SITE_URL}${fullTripSupportPath[locale]}`;
  const provider = { "@id": `${SITE_URL}/#organization` };
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.metadata.title, description: copy.metadata.description, inLanguage: home.htmlLang,
        isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": `${url}#service` }, breadcrumb: { "@id": `${url}#breadcrumb` } },
      // Custom quote: the Service names what the trip covers, never a price.
      { "@type": "Service", "@id": `${url}#service`, name: copy.name, serviceType: copy.name, description: copy.lede, url, provider, areaServed: { "@type": "Country", name: "China" },
        hasOfferCatalog: { "@type": "OfferCatalog", name: copy.handlesTitle,
          itemListElement: fullTripSupportNeeds.map((need) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: copy.needs[need].title, description: copy.needs[need].body, provider } })) } },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: `${SITE_URL}${home.path}` },
        { "@type": "ListItem", position: 2, name: copy.services, item: `${SITE_URL}${home.path}services/` },
        { "@type": "ListItem", position: 3, name: copy.name, item: url },
      ] },
      { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: copy.faq.map((item) => ({ "@type": "Question", name: item.question,
        acceptedAnswer: { "@type": "Answer", text: fillFullTripSupportCopy(item.answer, homegroundBusiness.publicName) } })) },
    ],
  };
}

/**
 * /services/full-trip-support/: Full Trip Planning & Ground Support, set in
 * the mobile menu's language (large serif words on white, hairlines, small
 * grey notes, one way forward marked by a thin arrow). The hero has one
 * order: the headline, one sentence, then the brief as a sentence with
 * blanks. Below, each section is a heading with a plain list beside it: what
 * the whole trip covers (never a pick list: the trip is ours to arrange), how
 * it goes, what is in writing before payment, the questions (which unfold in
 * place, one at a time), and a closing note for visitors who need less. The
 * page takes any budget and shows no price. Sections below the fold reveal
 * once (RevealOnce); reduced motion shows everything as it is.
 */
export function FullTripSupportPage({ locale = "en" }: { locale?: HomegroundLocale }) {
  const copy = getFullTripSupportCopy(locale);
  const home = getHomegroundCopy(locale);

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={localeStyles.skipLink} href="#full-trip-main">{home.skipLink}</a>
      {/* The header's planner button opens this page's own trip brief, keeping the full-trip context. */}
      <HomegroundHeader languagePaths={fullTripSupportPath} locale={locale} pageContext="services" plannerHrefOverride={`#${fullTripSupportEnquiryAnchor}`} />
      <main className={styles.main} id="full-trip-main" tabIndex={-1}>
        <RevealOnce />

        <header className={styles.hero}>
          <nav aria-label={copy.breadcrumb} className={styles.breadcrumb}>
            <ol>
              <li><Link href={home.path}>{copy.home}</Link></li>
              <li><span aria-hidden="true">/</span><Link href={`${home.path}services/`}>{copy.services}</Link></li>
              <li aria-current="page"><span aria-hidden="true">/</span>{copy.name}</li>
            </ol>
          </nav>
          {/* A line per phrase ("中国行" never splits). */}
          <h1>{copy.h1Lines.map((line) => <span key={line}>{line}</span>)}</h1>
          <p className={styles.lede}>{copy.lede}</p>
          {/* No reveal here: this is the page's first action and must be there at once. */}
          <FullTripSupportEnquiry locale={locale} />
        </header>

        <section aria-labelledby="full-trip-covers-title" className={styles.block} data-reveal="">
          <h2 id="full-trip-covers-title">{copy.handlesTitle}</h2>
          <ul className={styles.covers}>
            {fullTripSupportNeeds.map((need, index) => (
              <li key={need} style={{ "--i": index } as CSSProperties}>
                <h3>{copy.needs[need].title}</h3>
                <p><KeepWords locale={locale} text={copy.needs[need].body} /></p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="full-trip-steps-title" className={styles.block} data-reveal="" id="how-it-works">
          <h2 id="full-trip-steps-title">{copy.stepsTitle}</h2>
          <ol className={styles.steps}>
            {copy.steps.map((step, index) => (
              <li key={step.title} style={{ "--i": index } as CSSProperties}>
                <span aria-hidden="true" className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="full-trip-written-title" className={styles.block} data-reveal="">
          <h2 id="full-trip-written-title">{copy.writtenTitleLines.map((line) => <span key={line}>{line}</span>)}</h2>
          {/* The note follows the list it qualifies, at every width. */}
          <div>
            <p>{copy.writtenBody}</p>
            <ul className={styles.written}>
              {copy.written.map((item, index) => <li key={item} style={{ "--i": index } as CSSProperties}>{item}</li>)}
            </ul>
            <p className={styles.small}>{copy.noOnlinePayment}</p>
          </div>
        </section>

        <section aria-labelledby="full-trip-faq-title" className={styles.block} data-reveal="">
          <h2 id="full-trip-faq-title">{copy.faqTitle}</h2>
          {/* One open at a time, as in the menu: a shared name makes the browser close the others. */}
          <div className={styles.faq}>
            {copy.faq.map((item) => (
              <details key={item.question} name="full-trip-faq">
                <summary><h3><span>{item.question}</span></h3></summary>
                <p>{fillFullTripSupportCopy(item.answer, homegroundBusiness.publicName)}</p>
              </details>
            ))}
          </div>
        </section>

        {/* People comparing full-trip support with a set route or single service can switch here. */}
        <section aria-labelledby="full-trip-other-title" className={styles.block} data-reveal="" id="which-service">
          <h2 id="full-trip-other-title">{copy.otherTitle}</h2>
          <ul className={styles.other}>
            <li>
              <h3>{copy.compare.tours.title}</h3>
              <p>{copy.compare.tours.body}</p>
              <p className={styles.links}>
                <Link className={styles.textLink} href={`${home.path}tours/`}>{copy.compare.tours.action}</Link>
              </p>
            </li>
            <li>
              <h3>{copy.compare.single.title}</h3>
              <p>{copy.compare.single.body}</p>
              <p className={styles.links}>
                <Link className={styles.textLink} href={attractionReservationPath[locale]}>{copy.compare.single.tickets}</Link>
                <Link className={styles.textLink} href={privateGuideServicePath[locale]}>{copy.compare.single.guides}</Link>
                <Link className={styles.textLink} href={privateCarServicePath[locale]}>{getPrivateCarServiceCopy(locale).name}</Link>
              </p>
            </li>
          </ul>
        </section>
      </main>
      <HomegroundFooter locale={locale} pageContext="services" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)).replace(/</g, "\\u003c") }} />
    </div>
  );
}
