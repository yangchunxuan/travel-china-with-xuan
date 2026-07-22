import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  CalendarClock,
  Check,
  CircleCheck,
  FileCheck2,
  Footprints,
  Luggage,
  MapPin,
  MoveRight,
  TrainFront,
  type LucideIcon,
} from "lucide-react";
import {
  getChinaItineraryReviewCopy,
  type ChinaItineraryReviewCopy,
} from "../lib/chinaItineraryReviewI18n";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./ChinaItineraryReviewPage.module.css";

const pressureIcons: readonly LucideIcon[] = [
  TrainFront,
  BedDouble,
  CalendarClock,
  Footprints,
  Luggage,
];

const outputIcons: readonly LucideIcon[] = [
  MapPin,
  TrainFront,
  MoveRight,
  BedDouble,
  FileCheck2,
];

function ReviewBoard({
  copy,
}: {
  copy: ChinaItineraryReviewCopy["reviewBoard"];
}) {
  return (
    <figure className={styles.reviewBoard} aria-labelledby="review-board-title">
      <figcaption id="review-board-title">
        <span>{copy.title}</span>
        <small>{copy.disclaimer}</small>
      </figcaption>
      <ol>
        {copy.rows.map((row) => (
          <li data-state={row.state} key={row.day}>
            <div>
              <span>{row.day}</span>
              <strong>{row.route}</strong>
            </div>
            <p>
              <b>{row.status}</b>
              {row.detail}
            </p>
          </li>
        ))}
      </ol>
      <div className={styles.boardLegend} aria-label={copy.legendLabel}>
        <span><i data-state="workable" /> {copy.legend.workable}</span>
        <span><i data-state="tight" /> {copy.legend.tight}</span>
        <span><i data-state="fragile" /> {copy.legend.fragile}</span>
      </div>
    </figure>
  );
}

function BeforeAfter({
  copy,
}: {
  copy: ChinaItineraryReviewCopy["example"];
}) {
  return (
    <div className={styles.beforeAfter}>
      <div className={styles.routeVersion}>
        <p>{copy.before}</p>
        <strong>{copy.beforeSummary}</strong>
        <ol>
          {copy.citiesBefore.map((city) => <li key={city}>{city}</li>)}
        </ol>
      </div>
      <div className={styles.routeArrow} aria-hidden="true">
        <ArrowRight size={28} />
      </div>
      <div className={`${styles.routeVersion} ${styles.routeVersionAfter}`}>
        <p>{copy.after}</p>
        <strong>{copy.afterSummary}</strong>
        <ol>
          {copy.citiesAfter.map((city) => <li key={city}>{city}</li>)}
        </ol>
      </div>
    </div>
  );
}

function createStructuredData(
  locale: HomegroundLocale,
  copy: ChinaItineraryReviewCopy,
) {
  const homeCopy = getHomegroundCopy(locale);
  const pageUrl = new URL(
    copy.path,
    "https://homegroundchina.com/",
  ).href;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.schema.pageName,
        description: copy.schema.pageDescription,
        inLanguage: homeCopy.htmlLang,
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: copy.schema.serviceName,
        serviceType: copy.schema.serviceType,
        areaServed: { "@type": "Country", name: copy.schema.countryName },
        provider: {
          "@type": "Organization",
          "@id": "https://homegroundchina.com/#organization",
          name: "Homeground China",
          url: "https://homegroundchina.com/",
        },
        offers: [
          {
            "@type": "Offer",
            name: copy.schema.reviewOfferName,
            price: "69",
            priceCurrency: "USD",
            url: `${pageUrl}#review-my-route`,
            description: copy.schema.reviewOfferDescription,
          },
          {
            "@type": "Offer",
            name: copy.schema.buildOfferName,
            price: "129",
            priceCurrency: "USD",
            url: `${pageUrl}#build-my-route`,
            description: copy.schema.buildOfferDescription,
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.schema.homeName,
            item: new URL(
              homeCopy.path,
              "https://homegroundchina.com/",
            ).href,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.schema.pageName,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function ChinaItineraryReviewPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const homeCopy = getHomegroundCopy(locale);
  const copy = getChinaItineraryReviewCopy(locale);
  const plannerBase = `${homeCopy.path}?utm_source=china-itinerary-review&utm_medium=owned`;
  const reviewHref = `${plannerBase}&utm_campaign=route-planning&utm_content=review&service=itinerary-review&planner=destinations#route-finder`;
  const buildHref = `${plannerBase}&utm_campaign=route-planning&utm_content=build&service=route-build&planner=destinations#route-finder`;
  const freeFinderHref = `${plannerBase}&utm_campaign=service-page&utm_content=free-route-finder&planner=destinations#route-finder`;
  const fullSupportHref = `${plannerBase}&utm_campaign=full-trip-support&utm_content=custom-scope&service=full-trip-support&planner=destinations#route-finder`;
  const rushGuideHref = `${homeCopy.path}guides/is-your-china-itinerary-too-rushed/`;
  const studioHref = `${homeCopy.path}studio/`;
  const structuredData = createStructuredData(locale, copy);

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.pageRoot}`}
      data-homeground-locale={locale}
      lang={homeCopy.htmlLang}
    >
      <a className={homeStyles.skipLink} href="#itinerary-review-content">
        {copy.skipLink}
      </a>
      <HomegroundHeader locale={locale} pageContext="services" />

      <main id="itinerary-review-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroInner}>
              <nav className={styles.breadcrumb} aria-label={copy.breadcrumb.ariaLabel}>
                <ol>
                  <li><Link href={homeCopy.path}>{copy.breadcrumb.home}</Link></li>
                  <li aria-current="page">{copy.breadcrumb.current}</li>
                </ol>
              </nav>

              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
                  <h1>{copy.hero.title}</h1>
                  <p className={styles.heroLead}>{copy.hero.lead}</p>
                  <div className={styles.heroPrices} aria-label={copy.hero.pricesAriaLabel}>
                    {copy.hero.prices.map((price) => (
                      <span key={price.price}>
                        <b>{price.price}</b> {price.label}
                      </span>
                    ))}
                  </div>
                  <div className={styles.heroActions}>
                    <a className={styles.primaryButton} href="#choose-service">
                      {copy.hero.choose}
                      <ArrowRight aria-hidden="true" size={18} />
                    </a>
                    <a className={styles.secondaryButton} href={freeFinderHref}>
                      {copy.hero.freeFinder}
                    </a>
                  </div>
                  <p className={styles.heroBoundary}>{copy.hero.boundary}</p>
                </div>
                <ReviewBoard copy={copy.reviewBoard} />
              </div>
            </div>
          </header>

          <section className={styles.serviceSection} id="choose-service" aria-labelledby="service-title">
            <div className={styles.sectionHeadingSplit}>
              <div>
                <p className={styles.sectionLabel}>{copy.services.label}</p>
                <h2 id="service-title">{copy.services.title}</h2>
              </div>
              <p>{copy.services.intro}</p>
            </div>

            <div className={styles.serviceGrid}>
              {[
                {
                  service: copy.services.review,
                  id: "review-my-route",
                  href: reviewHref,
                  Icon: FileCheck2,
                  featured: false,
                },
                {
                  service: copy.services.build,
                  id: "build-my-route",
                  href: buildHref,
                  Icon: MapPin,
                  featured: true,
                },
              ].map(({ service, id, href, Icon, featured }) => (
                <article
                  className={`${styles.serviceCard} ${featured ? styles.serviceCardFeatured : ""}`}
                  id={id}
                  key={id}
                >
                  <div className={styles.serviceCardTop}>
                    <span className={styles.serviceIcon}><Icon aria-hidden="true" size={23} /></span>
                    <p>{service.startingPoint}</p>
                  </div>
                  <h3>{service.title}</h3>
                  <div className={styles.priceLine}>
                    <span>US$</span>
                    <strong>{service.price}</strong>
                    <small>{copy.services.perTrip}</small>
                  </div>
                  <p className={styles.serviceSummary}>{service.summary}</p>
                  <p className={styles.serviceScope}>{service.scope}</p>
                  <h4>{copy.services.receive}</h4>
                  <ul className={styles.serviceList}>
                    {service.outputs.map((output) => <li key={output}>{output}</li>)}
                  </ul>
                  <p className={styles.cardBoundary}>{service.boundary}</p>
                  <a className={styles.serviceButton} href={href}>
                    {service.button}
                    <ArrowRight aria-hidden="true" size={18} />
                  </a>
                  <small className={styles.ctaNote}>{service.note}</small>
                </article>
              ))}
            </div>

            <article
              className={styles.fullSupportChoice}
              aria-labelledby="full-support-choice-title"
            >
              <div className={styles.fullSupportChoiceLead}>
                <span className={styles.serviceIcon}>
                  <Check aria-hidden="true" size={23} />
                </span>
                <p>{copy.services.fullChoice.startingPoint}</p>
              </div>
              <div>
                <h3 id="full-support-choice-title">{copy.services.fullChoice.title}</h3>
                <p>{copy.services.fullChoice.summary}</p>
              </div>
              <div className={styles.fullSupportChoiceAction}>
                <strong>{copy.services.fullChoice.price}</strong>
                <a href="#full-trip-support">
                  {copy.services.fullChoice.link}
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
              </div>
            </article>
          </section>

          <section className={styles.studioBridge} aria-labelledby="studio-bridge-title">
            <div>
              <p className={styles.sectionLabel}>{copy.studio.label}</p>
              <h2 id="studio-bridge-title">{copy.studio.title}</h2>
            </div>
            <div>
              <p>{copy.studio.body}</p>
              <a href={studioHref}>
                {copy.studio.link}
                <ArrowRight aria-hidden="true" size={18} />
              </a>
            </div>
          </section>

          <section className={styles.intro} aria-labelledby="possible-title">
            <div className={styles.sectionHeadingSplit}>
              <div>
                <p className={styles.sectionLabel}>{copy.pressure.label}</p>
                <h2 id="possible-title">{copy.pressure.title}</h2>
              </div>
              <p>
                {copy.pressure.introBeforeLink}
                <Link href={rushGuideHref}>{copy.pressure.link}</Link>
                {copy.pressure.introAfterLink}
              </p>
            </div>
            <div className={styles.pressureGrid}>
              {copy.pressure.items.map(({ title, detail }, index) => {
                const Icon = pressureIcons[index];
                return (
                  <article className={styles.pressureCard} key={title}>
                    <span className={styles.cardNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon aria-hidden="true" size={22} strokeWidth={1.65} />
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className={styles.outputSection} id="review-output" aria-labelledby="output-title">
            <div className={styles.outputHeading}>
              <div>
                <p className={styles.sectionLabelLight}>{copy.output.label}</p>
                <h2 id="output-title">{copy.output.title}</h2>
              </div>
              <p>{copy.output.intro}</p>
            </div>
            <div className={styles.outputGrid}>
              {copy.output.items.map(({ title, detail }, index) => {
                const Icon = outputIcons[index];
                return (
                  <article className={styles.outputCard} key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <Icon aria-hidden="true" size={24} strokeWidth={1.5} />
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </article>
                );
              })}
            </div>
            <p className={styles.outputBoundary}>{copy.output.boundary}</p>
          </section>

          <section className={styles.process} aria-labelledby="process-title">
            <div className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>{copy.process.label}</p>
              <h2 id="process-title">{copy.process.title}</h2>
              <p>{copy.process.intro}</p>
            </div>
            <ol className={styles.processList}>
              {copy.process.items.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.example} aria-labelledby="example-title">
            <div className={styles.exampleIntro}>
              <p className={styles.sectionLabel}>{copy.example.label}</p>
              <h2 id="example-title">{copy.example.title}</h2>
              <p>{copy.example.intro}</p>
            </div>
            <BeforeAfter copy={copy.example} />
            <div className={styles.exampleChoices}>
              {copy.example.choices.map((choice) => (
                <div key={choice}>
                  <CircleCheck aria-hidden="true" size={20} />
                  <p>{choice}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.boundarySection} aria-labelledby="boundary-title">
            <div className={styles.sectionHeadingSplit}>
              <div>
                <p className={styles.sectionLabel}>{copy.boundaries.label}</p>
                <h2 id="boundary-title">{copy.boundaries.title}</h2>
              </div>
              <p>{copy.boundaries.intro}</p>
            </div>
            <ul className={styles.boundaryGrid}>
              {copy.boundaries.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className={styles.boundaryNote}>{copy.boundaries.note}</p>
          </section>

          <section className={styles.fullSupport} id="full-trip-support" aria-labelledby="support-title">
            <div className={styles.fullSupportIntro}>
              <p className={styles.sectionLabelLight}>{copy.fullSupport.label}</p>
              <h2 id="support-title">{copy.fullSupport.title}</h2>
            </div>
            <div className={styles.fullSupportBody}>
              {copy.fullSupport.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <ul>
                {copy.fullSupport.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a className={styles.primaryButton} href={fullSupportHref}>
                {copy.fullSupport.button}
                <ArrowRight aria-hidden="true" size={18} />
              </a>
              <small>{copy.fullSupport.note}</small>
            </div>
          </section>

          <section className={styles.faqSection} aria-labelledby="review-faq-title">
            <div className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>{copy.faq.label}</p>
              <h2 id="review-faq-title">{copy.faq.title}</h2>
            </div>
            <div className={styles.faqList}>
              {copy.faq.items.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className={styles.finalCta} aria-labelledby="review-cta-title">
            <div>
              <p className={styles.sectionLabelLight}>{copy.finalCta.label}</p>
              <h2 id="review-cta-title">{copy.finalCta.title}</h2>
            </div>
            <div>
              <p>{copy.finalCta.body}</p>
              <div className={styles.finalActions}>
                <a className={styles.primaryButton} href={reviewHref}>
                  {copy.finalCta.review}
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
                <a className={styles.finalSecondaryButton} href={buildHref}>
                  {copy.finalCta.build}
                </a>
              </div>
              <a className={styles.supportLink} href="#full-trip-support">
                {copy.finalCta.support}
              </a>
            </div>
          </section>
        </article>
      </main>

      <HomegroundFooter locale={locale} pageContext="services" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
