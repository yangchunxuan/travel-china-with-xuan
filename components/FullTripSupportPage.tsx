import Link from "next/link";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import type { CSSProperties } from "react";
import { attractionReservationPath } from "../lib/attractionReservations";
import { fullTripSupportEnquiryAnchor, fullTripSupportNeeds, fullTripSupportPath, type FullTripSupportNeed } from "../lib/fullTripSupport";
import { fillFullTripSupportCopy, getFullTripSupportCopy } from "../lib/fullTripSupportI18n";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { privateCarServicePath } from "../lib/privateCarServices";
import { getPrivateCarServiceCopy } from "../lib/privateCarServicesI18n";
import { privateGuideServicePath } from "../lib/privateGuideServices";
import { FullTripSupportEnquiry } from "./FullTripSupportEnquiry";
import { fullTripNeedIcons } from "./fullTripNeedIcons";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { PointerSpotlight } from "./motion/PointerSpotlight";
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
      // Custom quote: the Service names what can be arranged, never a price.
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
 * /services/full-trip-support/: Full Trip Planning & Ground Support, in the
 * services hub's Grok language. The hero pairs the promise with a dark panel
 * of what we can take on (each row settles in turn); then how it works (a
 * line that draws through four steps), what the written proposal confirms
 * before payment, which service fits, the trip brief and the questions.
 * Sections below the fold reveal once (RevealOnce); reduced motion shows
 * everything as it is.
 */
export function FullTripSupportPage({ locale = "en" }: { locale?: HomegroundLocale }) {
  const copy = getFullTripSupportCopy(locale);
  const home = getHomegroundCopy(locale);
  const enquire = `#${fullTripSupportEnquiryAnchor}`;

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={localeStyles.skipLink} href="#full-trip-main">{home.skipLink}</a>
      {/* The header's planner button opens this page's own trip brief, keeping the full-trip context. */}
      <HomegroundHeader languagePaths={fullTripSupportPath} locale={locale} pageContext="services" plannerHrefOverride={enquire} />
      <main id="full-trip-main" tabIndex={-1}>
        <PointerSpotlight />
        <RevealOnce />

        <header className={styles.hero}>
          <nav aria-label={copy.breadcrumb} className={styles.breadcrumb}>
            <ol>
              <li><Link href={home.path}>{copy.home}</Link></li>
              <li><span aria-hidden="true">/</span><Link href={`${home.path}services/`}>{copy.services}</Link></li>
              <li aria-current="page"><span aria-hidden="true">/</span>{copy.name}</li>
            </ol>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              {/* Two lines, broken between phrases ("中国旅行" never splits). */}
              <h1>{copy.h1Lines.map((line) => <span key={line}>{line}</span>)}</h1>
              <p className={styles.lede}>{copy.lede}</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={enquire}>{copy.ask}<ArrowRight aria-hidden="true" size={18} /></a>
                <a className={styles.textLink} href="#how-it-works">{copy.howLink}</a>
              </div>
              <dl className={styles.heroFacts}>
                {copy.heroFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* On wide screens the panel's rows settle on load; on phones, where it
                sits below the fold, it reveals when it scrolls in (RevealOnce). */}
            <aside aria-labelledby="full-trip-handles-title" className={styles.handles} data-reveal="">
              <p className={styles.handlesTitle} id="full-trip-handles-title">{copy.handlesTitle}</p>
              <ul>
                {fullTripSupportNeeds.map((need, index) => {
                  const Icon = fullTripNeedIcons[need];
                  return (
                    <li key={need} style={{ "--i": index } as CSSProperties}>
                      <span aria-hidden="true" className={styles.handleIcon}><Icon size={18} strokeWidth={1.7} /></span>
                      <span className={styles.handleText}>
                        <strong>{copy.needs[need].title}</strong>
                        <span><KeepWords locale={locale} text={copy.needs[need].body} /></span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              {/* Chinese needs no space after "。"; the other languages do. */}
              <p className={styles.pick}><strong>{copy.pickTitle}</strong>{locale === "zh" ? "" : " "}{copy.pickBody}</p>
              {/* "Services" opens this page; anyone after one ticket or one guide gets a direct route. */}
              <a className={styles.compareJump} href="#which-service">{copy.compareLink}<ArrowDown aria-hidden="true" size={15} /></a>
            </aside>
          </div>
        </header>

        <section aria-labelledby="full-trip-steps-title" className={styles.steps} data-reveal="" id="how-it-works">
          <h2 id="full-trip-steps-title">{copy.stepsTitle}</h2>
          <ol>
            {copy.steps.map((step, index) => (
              <li key={step.title} style={{ "--i": index } as CSSProperties}>
                <span aria-hidden="true" className={styles.stepDot}>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="full-trip-written-title" className={styles.written} data-reveal="">
          <div>
            <h2 id="full-trip-written-title">{copy.writtenTitleLines.map((line) => <span key={line}>{line}</span>)}</h2>
            <p>{copy.writtenBody}</p>
          </div>
          {/* The note follows the list it qualifies, at every width. */}
          <div>
            <ul className={styles.writtenList}>
              {copy.written.map((item, index) => (
                <li key={item} style={{ "--i": index } as CSSProperties}>
                  <Check aria-hidden="true" size={16} strokeWidth={2.2} />
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.noOnlinePayment}>{copy.noOnlinePayment}</p>
          </div>
        </section>

        <section aria-labelledby="full-trip-compare-title" className={styles.compare} data-reveal="" id="which-service">
          <h2 id="full-trip-compare-title">{copy.compareTitle}</h2>
          <ul>
            <li>
              <Link data-spotlight href={`${home.path}tours/`}>
                <h3>{copy.compare.tours.title}</h3>
                <p>{copy.compare.tours.body}</p>
                <span className={styles.compareAction}>{copy.compare.tours.action}<ArrowRight aria-hidden="true" size={16} /></span>
              </Link>
            </li>
            <li>
              <div className={styles.compareCard}>
                <h3>{copy.compare.single.title}</h3>
                <p>{copy.compare.single.body}</p>
                <span className={styles.compareLinks}>
                  <Link href={attractionReservationPath[locale]}>{copy.compare.single.tickets}<ArrowRight aria-hidden="true" size={15} /></Link>
                  <Link href={privateGuideServicePath[locale]}>{copy.compare.single.guides}<ArrowRight aria-hidden="true" size={15} /></Link>
                  <Link href={privateCarServicePath[locale]}>{getPrivateCarServiceCopy(locale).name}<ArrowRight aria-hidden="true" size={15} /></Link>
                </span>
              </div>
            </li>
            {/* The page you are on: not a dead end, it leads to the trip brief. */}
            <li data-current="">
              <div aria-current="page" className={styles.compareCard}>
                <span className={styles.badge}>{copy.compare.full.badge}</span>
                <h3>{copy.compare.full.title}</h3>
                <p>{copy.compare.full.body}</p>
                <a className={styles.compareCta} href={enquire}>{copy.compare.full.action}<ArrowRight aria-hidden="true" size={16} /></a>
              </div>
            </li>
          </ul>
        </section>

        {/* No reveal here: the hero's main button lands on this form, which must be there at once. */}
        <section aria-labelledby="full-trip-enquiry-title" className={styles.enquirySection} id={fullTripSupportEnquiryAnchor}>
          <div className={styles.enquiryIntro}>
            <p className={styles.eyebrow}>{copy.enquiry.eyebrow}</p>
            <h2 id="full-trip-enquiry-title">{copy.enquiry.title}</h2>
            <p>{copy.enquiry.body}</p>
          </div>
          <FullTripSupportEnquiry locale={locale} />
        </section>

        <section aria-labelledby="full-trip-faq-title" className={styles.faq} data-reveal="">
          <h2 id="full-trip-faq-title">{copy.faqTitle}</h2>
          <div>
            {copy.faq.map((item) => (
              <details key={item.question}>
                <summary><h3>{item.question}</h3></summary>
                <p>{fillFullTripSupportCopy(item.answer, homegroundBusiness.publicName)}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <HomegroundFooter locale={locale} pageContext="services" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)).replace(/</g, "\\u003c") }} />
    </div>
  );
}
