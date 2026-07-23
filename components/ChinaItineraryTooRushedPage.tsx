import { Fragment } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  CalendarClock,
  Check,
  Luggage,
} from "lucide-react";
import {
  getItineraryRushGuideCopy,
  itineraryRushGuideId,
} from "../lib/chinaItineraryTooRushedI18n";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./ChinaItineraryTooRushedPage.module.css";

const siteUrl = "https://homegroundchina.com";
const socialImageUrl =
  "https://homegroundchina.com/images/guides/china-itinerary-reality/transfer-platform-soft-focus-1200.webp";

const guideHubLabels: Record<HomegroundLocale, string> = {
  en: "Travel guides",
  zh: "旅行指南",
  ko: "여행 가이드",
};

function guideHubPath(locale: HomegroundLocale) {
  return locale === "en" ? "/guides/" : `/${locale}/guides/`;
}

function TransferScene({
  name,
  sizes,
}: {
  name:
    | "transfer-platform-soft-focus"
    | "train-cabin-soft-focus"
    | "airport-waiting-soft-focus";
  sizes: string;
}) {
  const base = `/images/guides/china-itinerary-reality/${name}`;

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${base}-480.webp 480w, ${base}-768.webp 768w, ${base}-1200.webp 1200w`}
        sizes={sizes}
      />
      <img
        src={`${base}-768.webp`}
        alt=""
        width={768}
        height={512}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

function createStructuredData(locale: HomegroundLocale) {
  const copy = getItineraryRushGuideCopy(locale);
  const pageUrl = `${siteUrl}${copy.pagePath}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        headline: copy.metadata.headline,
        description: copy.metadata.schemaDescription,
        image: socialImageUrl,
        datePublished: "2026-07-22",
        dateModified: "2026-07-22",
        inLanguage: copy.htmlLang,
        mainEntityOfPage: pageUrl,
        author: {
          "@type": "Organization",
          name: copy.authorLabel,
          url: `${siteUrl}${copy.studioPath}`,
        },
        publisher: {
          "@type": "Organization",
          name: "Homeground China",
          url: `${siteUrl}/`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumbHome,
            item: `${siteUrl}${copy.homePath}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: guideHubLabels[locale],
            item: `${siteUrl}${guideHubPath(locale)}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: copy.metadata.headline,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export function ChinaItineraryTooRushedPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getItineraryRushGuideCopy(locale);
  const homeCopy = getHomegroundCopy(locale);
  const plannerHref = `${homeCopy.path}?utm_source=china-itinerary-too-rushed&utm_medium=owned&utm_campaign=article-to-route-finder&utm_content=exploring&planner=destinations#route-finder`;
  const structuredData = createStructuredData(locale);

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.pageRoot}`}
      data-homeground-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={homeStyles.skipLink} href="#itinerary-article-content">
        {copy.skipLink}
      </a>
      <HomegroundHeader
        locale={locale}
        pageContext="guide"
        guideId={itineraryRushGuideId}
      />

      <main id="itinerary-article-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroInner}>
              <nav className={styles.breadcrumb} aria-label={copy.breadcrumbLabel}>
                <ol>
                  <li>
                    <Link href={copy.homePath}>{copy.breadcrumbHome}</Link>
                  </li>
                  <li>
                    <Link href={guideHubPath(locale)}>
                      {guideHubLabels[locale]}
                    </Link>
                  </li>
                  <li aria-current="page">{copy.breadcrumbCurrent}</li>
                </ol>
              </nav>
              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>{copy.eyebrow}</p>
                  <h1>{copy.metadata.headline}</h1>
                  <p className={styles.heroLead}>{copy.heroLead}</p>
                </div>
                <div className={styles.routeStamp} aria-label={copy.routeStampLabel}>
                  {copy.routeStamp.map((item, index) => (
                    <Fragment key={item}>
                      {index > 0 && <span aria-hidden="true">→</span>}
                      <span>{item}</span>
                    </Fragment>
                  ))}
                </div>
              </div>
              <p className={styles.reviewed}>
                {copy.byLabel} <Link href={copy.studioPath}>{copy.authorLabel}</Link>
                {" · "}
                {copy.publishedLabel}{" "}
                <time dateTime="2026-07-22">{copy.publishedDateLabel}</time>
                {" · "}
                {copy.dynamicDetailsNote}
              </p>
            </div>
          </header>

          <div className={styles.articleShell}>
            <section className={styles.quickAnswer} aria-labelledby="quick-answer-title">
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>{copy.quickAnswer.label}</p>
                  <h2 id="quick-answer-title">{copy.quickAnswer.title}</h2>
                </div>
                <p>{copy.quickAnswer.detail}</p>
              </div>
              <nav className={styles.quickCards} aria-label={copy.quickAnswer.navLabel}>
                {copy.quickAnswer.checks.map((item) => (
                  <a href={item.href} key={item.href}>
                    <span>{item.number}</span>
                    <small>{item.label}</small>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </a>
                ))}
              </nav>
            </section>

            <div className={styles.articleBody}>
              <section id="city-changes" aria-labelledby="city-changes-title">
                <div className={styles.sectionNumber}>01</div>
                <div className={styles.sectionContent}>
                  <h2 id="city-changes-title">{copy.cityChanges.title}</h2>
                  {copy.cityChanges.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <ul>
                    {copy.cityChanges.questions.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <figure className={styles.transferSequence}>
                <div className={styles.transferSequenceGrid}>
                  <div className={styles.transferVisual}>
                    <TransferScene
                      name="transfer-platform-soft-focus"
                      sizes="(max-width: 680px) calc(100vw - 2.5rem), 34rem"
                    />
                  </div>
                  <div className={styles.transferVisual}>
                    <TransferScene
                      name="train-cabin-soft-focus"
                      sizes="(max-width: 680px) calc((100vw - 3rem) / 2), 17rem"
                    />
                  </div>
                  <div className={styles.transferVisual}>
                    <TransferScene
                      name="airport-waiting-soft-focus"
                      sizes="(max-width: 680px) calc((100vw - 3rem) / 2), 17rem"
                    />
                  </div>
                </div>
                <figcaption>
                  <p>{copy.transferFigureCaption}</p>
                </figcaption>
              </figure>

              <section id="transfer-days" aria-labelledby="transfer-days-title">
                <div className={styles.sectionNumber}>02</div>
                <div className={styles.sectionContent}>
                  <h2 id="transfer-days-title">{copy.transferDays.title}</h2>
                  <p>{copy.transferDays.intro}</p>
                  <ol className={styles.transferSteps}>
                    {copy.transferDays.steps.map((step, index) => (
                      <li key={step.label}>
                        <span>{index + 1}</span>
                        <p>
                          <b>{step.label}</b> — {step.detail}
                        </p>
                      </li>
                    ))}
                  </ol>
                  <p className={styles.sourceCallout}>
                    {copy.transferDays.sourcePrefix}{" "}
                    <Link href={copy.transportGuidePath}>
                      {copy.transferDays.transportLinkLabel}
                    </Link>
                    {locale === "ko" ? null : " "}
                    {copy.transferDays.sourceBridge}{" "}
                    <a href="https://www.12306.cn/en/faq.html?item=1" rel="noreferrer">
                      {copy.transferDays.railLinkLabel}
                    </a>
                    {locale === "ko" ? null : " "}
                    {copy.transferDays.sourceSuffix}
                  </p>
                </div>
              </section>

              <section id="hotel-moves" aria-labelledby="hotel-moves-title">
                <div className={styles.sectionNumber}>03</div>
                <div className={styles.sectionContent}>
                  <h2 id="hotel-moves-title">{copy.hotelMoves.title}</h2>
                  <p>{copy.hotelMoves.intro}</p>
                  <div className={styles.comparison}>
                    <div>
                      <BedDouble aria-hidden="true" size={24} />
                      <h3>{copy.hotelMoves.moveHeading}</h3>
                      <ul>
                        {copy.hotelMoves.moveItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <Luggage aria-hidden="true" size={24} />
                      <h3>{copy.hotelMoves.stayHeading}</h3>
                      <ul>
                        {copy.hotelMoves.stayItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section id="fixed-bookings" aria-labelledby="fixed-bookings-title">
                <div className={styles.sectionNumber}>04</div>
                <div className={styles.sectionContent}>
                  <h2 id="fixed-bookings-title">{copy.fixedBookings.title}</h2>
                  {copy.fixedBookings.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <div className={styles.fixedRule}>
                    <CalendarClock aria-hidden="true" size={27} />
                    <p>{copy.fixedBookings.rule}</p>
                  </div>
                </div>
              </section>

              <section id="fatigue-chains" aria-labelledby="fatigue-chains-title">
                <div className={styles.sectionNumber}>05</div>
                <div className={styles.sectionContent}>
                  <h2 id="fatigue-chains-title">{copy.fatigueChains.title}</h2>
                  <p>{copy.fatigueChains.intro}</p>
                  <div className={styles.fatigueBoard} aria-label={copy.fatigueChains.boardLabel}>
                    {copy.fatigueChains.chains.map(([start, end]) => (
                      <div key={`${start}-${end}`}>
                        <span>{start}</span>
                        <ArrowRight aria-hidden="true" size={17} />
                        <span>{end}</span>
                      </div>
                    ))}
                  </div>
                  <p>{copy.fatigueChains.closing}</p>
                </div>
              </section>

              <section id="remove-a-city" aria-labelledby="remove-a-city-title">
                <div className={styles.sectionNumber}>06</div>
                <div className={styles.sectionContent}>
                  <h2 id="remove-a-city-title">{copy.removeCity.title}</h2>
                  {copy.removeCity.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section id="compact-comfortable" aria-labelledby="compact-comfortable-title">
                <div className={styles.sectionNumber}>07</div>
                <div className={styles.sectionContent}>
                  <h2 id="compact-comfortable-title">{copy.pace.title}</h2>
                  <div className={styles.paceTableWrap}>
                    <table className={styles.paceTable}>
                      <thead>
                        <tr>
                          <th scope="col">{copy.pace.compactHeading}</th>
                          <th scope="col">{copy.pace.comfortableHeading}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {copy.pace.rows.map(([compact, comfortable]) => (
                          <tr key={compact}>
                            <td>{compact}</td>
                            <td>{comfortable}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p>{copy.pace.closing}</p>
                </div>
              </section>
            </div>

            <section className={styles.workedExample} aria-labelledby="worked-example-title">
              <div className={styles.exampleIntro}>
                <p className={styles.sectionLabel}>{copy.workedExample.label}</p>
                <h2 id="worked-example-title">{copy.workedExample.title}</h2>
                <p>{copy.workedExample.intro}</p>
              </div>
              <div className={styles.exampleGrid}>
                {copy.workedExample.options.map((option) => (
                  <div key={option.label}>
                    <span>{option.label}</span>
                    <h3>{option.title}</h3>
                    <p>{option.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.selfCheck} aria-labelledby="self-check-title">
              <div>
                <p className={styles.sectionLabelLight}>{copy.selfCheck.label}</p>
                <h2 id="self-check-title">{copy.selfCheck.title}</h2>
                <p className={styles.selfCheckLead}>{copy.selfCheck.lead}</p>
              </div>
              <div>
                <ul>
                  {copy.selfCheck.items.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" size={17} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.nextStepIntro}>
                <p className={styles.sectionLabelLight}>{copy.selfCheck.nextLabel}</p>
                <h2>{copy.selfCheck.nextTitle}</h2>
              </div>
              <div className={styles.servicePaths}>
                <div>
                  <p>{copy.services.reviewIntro}</p>
                  <Link href={`${copy.servicePath}#review-my-route`}>
                    {copy.services.reviewCta}
                    <ArrowRight aria-hidden="true" size={18} />
                  </Link>
                </div>
                <div>
                  <p>{copy.services.buildIntro}</p>
                  <Link href={`${copy.servicePath}#build-my-route`}>
                    {copy.services.buildCta}
                    <ArrowRight aria-hidden="true" size={18} />
                  </Link>
                </div>
                <div>
                  <p>{copy.services.exploreIntro}</p>
                  <a href={plannerHref}>
                    {copy.services.exploreCta}
                    <ArrowRight aria-hidden="true" size={18} />
                  </a>
                  <small>{copy.services.exploreNote}</small>
                </div>
              </div>
            </section>

            <section className={styles.faqSection} aria-labelledby="article-faq-title">
              <div className={styles.faqHeading}>
                <p className={styles.sectionLabel}>{copy.faq.label}</p>
                <h2 id="article-faq-title">{copy.faq.title}</h2>
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

            <section className={styles.sourceNote} aria-labelledby="source-note-title">
              <h2 id="source-note-title">{copy.sourceNote.title}</h2>
              <p>{copy.sourceNote.detail}</p>
              <ul>
                <li>
                  <a href="https://www.12306.cn/en/faq.html?item=1" rel="noreferrer">
                    {copy.sourceNote.railLabel}
                  </a>
                </li>
                <li>
                  <a href="https://intl.dpm.org.cn/visit.html" rel="noreferrer">
                    {copy.sourceNote.palaceLabel}
                  </a>
                </li>
                <li>
                  <a href="https://en.chnmuseum.cn/visit_692/" rel="noreferrer">
                    {copy.sourceNote.museumLabel}
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>

      <HomegroundFooter
        locale={locale}
        pageContext="guide"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
