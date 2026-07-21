import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Clock3,
  CloudSun,
  Footprints,
  Luggage,
  MapPinned,
  Plane,
  TrainFront,
} from "lucide-react";
import { getGuideEntry, getGuideLanguagePaths } from "../lib/guideRegistry";
import {
  localePath,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { getTenDayGuideCopy } from "../lib/tenDayGuideCopy";
import type { TenDayGuideCopy } from "../lib/tenDayGuideCopy.types";
import styles from "./TenDayChinaRouteGuidePage.module.css";

const guideId = "beijing-zhangjiajie-shanghai-10-days" as const;

const guideAssetPath =
  "/images/guides/beijing-zhangjiajie-shanghai-10-days";

const decisionIcons = [
  Plane,
  TrainFront,
  MapPinned,
  Footprints,
  CloudSun,
  Luggage,
] as const;

const sourceHrefs = [
  "https://www.12306.cn/en/faq.html",
  "https://english.beijing.gov.cn/travellinginbeijing/transportation/airport/202005/t20200516_1899220.html",
  "https://www.shanghaiairport.com/ensh/dmjt/index.html",
  "https://enghunan.gov.cn/hneng/News/Localnews/202506/t20250623_33717855.html",
] as const;

function createStructuredData(
  locale: HomegroundLocale,
  copy: TenDayGuideCopy,
) {
  const guide = getGuideEntry(guideId, locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://homegroundchina.com/#organization",
        name: "Homeground China",
        url: "https://homegroundchina.com/",
      },
      {
        "@type": "Article",
        "@id": `${guide.canonicalUrl}#article`,
        url: guide.canonicalUrl,
        headline: guide.headline,
        description: guide.description,
        inLanguage: copy.htmlLang,
        mainEntityOfPage: guide.canonicalUrl,
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        image: guide.heroImageUrl,
        author: { "@id": "https://homegroundchina.com/#organization" },
        publisher: { "@id": "https://homegroundchina.com/#organization" },
        about: copy.hero.places.map((name) => ({ "@type": "Place", name })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${guide.canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumb.home,
            item: `https://homegroundchina.com${localePath(locale)}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: guide.headline,
            item: guide.canonicalUrl,
          },
        ],
      },
    ],
  };
}

function Brand({
  copy,
  homeHref,
}: {
  copy: TenDayGuideCopy;
  homeHref: string;
}) {
  return (
    <Link className={styles.brand} href={homeHref} aria-label={copy.brandAriaLabel}>
      <span className={styles.brandMark} aria-hidden="true">
        <span />
      </span>
      <span className={styles.brandCopy}>
        <strong>Homeground</strong>
        <small>{copy.brandTagline}</small>
      </span>
    </Link>
  );
}

export function TenDayChinaRouteGuidePage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getTenDayGuideCopy(locale);
  const homeHref = localePath(locale);
  const localePrefix = locale === "en" ? "" : `/${locale}`;
  const plannerHref = `${homeHref}?utm_source=${guideId}&utm_medium=owned&utm_campaign=route-guide&planner=destinations&destinations=beijing-great-wall%2Czhangjiajie%2Cshanghai#route-finder`;
  const zhangjiajieGuideHref = `${localePrefix}/guides/zhangjiajie-itinerary/#quick-answer`;
  const privacyHref = `${localePrefix}/privacy/`;
  const languagePaths = getGuideLanguagePaths(guideId);
  const languageOptions = [
    { locale: "en", label: "EN", href: languagePaths.en },
    { locale: "zh", label: "中文", href: languagePaths["zh-Hans"] },
    { locale: "ko", label: "한국어", href: languagePaths.ko },
  ] as const;
  const structuredDataForLocale = createStructuredData(locale, copy);

  return (
    <div
      className={styles.pageRoot}
      data-homeground-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={styles.skipLink} href="#article-content">
        {copy.skipLink}
      </a>

      <header className={styles.siteHeader}>
        <div className={styles.headerInner}>
          <Brand copy={copy} homeHref={homeHref} />
          <nav className={styles.primaryNav} aria-label={copy.navigation.primaryLabel}>
            <a href={`${homeHref}#planning-proof`}>{copy.navigation.planning}</a>
            <a href={`${homeHref}#studio`}>{copy.navigation.studio}</a>
            <a href={`${homeHref}#faq`}>{copy.navigation.questions}</a>
          </nav>
          <nav className={styles.languageNav} aria-label={copy.navigation.languageLabel}>
            {languageOptions.map((option) => (
              <Link
                aria-current={option.locale === locale ? "page" : undefined}
                href={option.href}
                hrefLang={option.locale === "zh" ? "zh-Hans" : option.locale}
                key={option.locale}
              >
                {option.label}
              </Link>
            ))}
          </nav>
          <a className={styles.headerCta} href={plannerHref}>
            {copy.navigation.cta}
          </a>
        </div>
      </header>

      <main id="article-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroInner}>
              <nav className={styles.breadcrumb} aria-label={copy.breadcrumb.label}>
                <ol>
                  <li>
                    <Link href={homeHref}>{copy.breadcrumb.home}</Link>
                  </li>
                  <li aria-current="page">{copy.breadcrumb.current}</li>
                </ol>
              </nav>

              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
                  <h1>
                    {copy.hero.title}
                    <span>{copy.hero.accent}</span>
                  </h1>
                  <p className={styles.heroLead}>{copy.hero.lead}</p>
                </div>

                <aside className={styles.heroAnswer} aria-labelledby="answer-title">
                  <p>{copy.hero.quickLabel}</p>
                  <h2 id="answer-title">{copy.hero.quickTitle}</h2>
                  <div className={styles.heroMetric}>
                    <strong>10</strong>
                    <span>{copy.hero.hotelNights}</span>
                    <ArrowRight aria-hidden="true" size={20} />
                    <strong>7</strong>
                    <span>{copy.hero.fullSightseeingDays}</span>
                  </div>
                  <p>{copy.hero.quickBody}</p>
                </aside>
              </div>

              <div className={styles.routeBand} aria-label={copy.hero.routeLabel}>
                <span>{copy.hero.places[0]}</span>
                <i aria-hidden="true" />
                <span>{copy.hero.places[1]}</span>
                <i aria-hidden="true" />
                <span>{copy.hero.places[2]}</span>
              </div>

              <p className={styles.editorialNote}>{copy.hero.editorialNote}</p>
            </div>
          </header>

          <div className={styles.articleBody}>
            <section className={styles.definition} aria-labelledby="definition-title">
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>{copy.definition.label}</p>
                  <h2 id="definition-title">{copy.definition.title}</h2>
                </div>
                <p>{copy.definition.intro}</p>
              </div>

              <div className={styles.countGrid}>
                {copy.definition.counts.map((item) => (
                  <article
                    className={item.featured ? styles.countCardFeatured : styles.countCard}
                    key={item.title}
                  >
                    <span className={styles.countNumber}>{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    <strong>{item.note}</strong>
                  </article>
                ))}
              </div>

              <p className={styles.planningRule}>
                <Clock3 aria-hidden="true" size={20} />
                {copy.definition.planningRule}
              </p>
            </section>

            <section className={styles.lengthDecision} aria-labelledby="length-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.length.label}</p>
                <h2 id="length-title">{copy.length.title}</h2>
                <p>{copy.length.intro}</p>
              </div>

              <div className={styles.lengthGrid}>
                {copy.length.options.map((option) => (
                  <article
                    className={option.recommended ? styles.lengthCardRecommended : styles.lengthCard}
                    key={option.nights}
                  >
                    {option.recommended && (
                      <span className={styles.recommendTag}>{copy.length.recommendTag}</span>
                    )}
                    <div className={styles.lengthTopline}>
                      <h3>{option.nights}</h3>
                      <strong>{option.days}</strong>
                    </div>
                    <p className={styles.lengthSplit}>{option.split}</p>
                    <h4>{option.verdict}</h4>
                    <p>{option.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.calendarSection} aria-labelledby="calendar-title">
              <div className={styles.sectionHeadingSplitLight}>
                <div>
                  <p className={styles.sectionLabelLight}>{copy.calendar.label}</p>
                  <h2 id="calendar-title">{copy.calendar.title}</h2>
                </div>
                <p>{copy.calendar.intro}</p>
              </div>

              <ol className={styles.calendar}>
                {copy.calendar.items.map((item) => (
                  <li data-kind={item.kind} key={`${item.day}-${item.place}`}>
                    <span>{item.day}</span>
                    <strong>{item.place}</strong>
                    <small>{item.itemLabel}</small>
                  </li>
                ))}
              </ol>

              <div className={styles.calendarSummary}>
                {copy.calendar.summary.map((item) => (
                  <span key={item.label}><strong>{item.number}</strong> {item.label}</span>
                ))}
              </div>
            </section>

            <section className={styles.tradeoffs} aria-labelledby="tradeoffs-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.tradeoffs.label}</p>
                <h2 id="tradeoffs-title">{copy.tradeoffs.title}</h2>
                <p>{copy.tradeoffs.intro}</p>
              </div>

              <div className={styles.tradeoffGrid}>
                {copy.tradeoffs.cities.map((city) => (
                  <article key={city.city}>
                    <div className={styles.cityCount}>
                      <span>{city.number}</span>
                      <small>{copy.tradeoffs.fullDays}</small>
                    </div>
                    <h3>{city.city}</h3>
                    <p>{city.promise}</p>
                    <div className={styles.sacrifice}>
                      <CircleAlert aria-hidden="true" size={18} />
                      <span>{city.cost}</span>
                    </div>
                  </article>
                ))}
              </div>

              <Link className={styles.textLink} href={zhangjiajieGuideHref}>
                {copy.tradeoffs.zhangjiajieLink}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </section>

            <section className={styles.diagnostic} aria-labelledby="diagnostic-title">
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>{copy.diagnostic.label}</p>
                  <h2 id="diagnostic-title">{copy.diagnostic.title}</h2>
                </div>
                <p>{copy.diagnostic.intro}</p>
              </div>

              <figure className={styles.evidenceFigure}>
                <picture>
                  <source
                    sizes="(max-width: 48rem) calc(100vw - 2rem), min(75rem, calc(100vw - 2.5rem))"
                    srcSet={`${guideAssetPath}/zhangjiajie-base-720.webp 720w, ${guideAssetPath}/zhangjiajie-base-1200.webp 1200w, ${guideAssetPath}/zhangjiajie-base-1800.webp 1800w`}
                    type="image/webp"
                  />
                  <img
                    alt={copy.diagnostic.imageAlt}
                    decoding="async"
                    height="1200"
                    loading="lazy"
                    src={`${guideAssetPath}/zhangjiajie-base-1800.jpg`}
                    width="1800"
                  />
                </picture>
                <figcaption>
                  <span>{copy.diagnostic.imageLabel}</span>
                  <p>{copy.diagnostic.imageCaption}</p>
                </figcaption>
              </figure>

              <ol className={styles.diagnosticList}>
                {copy.diagnostic.decisions.map((item, index) => {
                  const Icon = decisionIcons[index];
                  return (
                    <li key={item.title}>
                      <div className={styles.diagnosticIndex}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <Icon aria-hidden="true" size={22} strokeWidth={1.6} />
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p className={styles.diagnosticQuestion}>{item.question}</p>
                        <p>{item.consequence}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className={styles.transferSection} aria-labelledby="transfer-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.transfer.label}</p>
                <h2 id="transfer-title">{copy.transfer.title}</h2>
                <p>{copy.transfer.intro}</p>
              </div>

              <figure className={styles.evidenceFigure}>
                <picture>
                  <source
                    sizes="(max-width: 48rem) calc(100vw - 2rem), min(75rem, calc(100vw - 2.5rem))"
                    srcSet={`${guideAssetPath}/airport-transfer-720.webp 720w, ${guideAssetPath}/airport-transfer-1200.webp 1200w, ${guideAssetPath}/airport-transfer-1800.webp 1800w`}
                    type="image/webp"
                  />
                  <img
                    alt={copy.transfer.imageAlt}
                    decoding="async"
                    height="1200"
                    loading="lazy"
                    src={`${guideAssetPath}/airport-transfer-1800.jpg`}
                    width="1800"
                  />
                </picture>
                <figcaption>
                  <span>{copy.transfer.imageLabel}</span>
                  <p>{copy.transfer.imageCaption}</p>
                </figcaption>
              </figure>

              <figure className={styles.transferFormula}>
                <figcaption>{copy.transfer.formulaLabel}</figcaption>
                <ol>
                  {copy.transfer.steps.map((step, index) => (
                    <li key={step}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{step}</strong>
                    </li>
                  ))}
                </ol>
              </figure>

              <p className={styles.directionNote}>
                <strong>{copy.transfer.directionTitle}</strong> {copy.transfer.directionBody}
              </p>

              <Link className={styles.textLink} href={plannerHref}>
                {copy.transfer.plannerLink}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </section>

            <section className={styles.fitTest} aria-labelledby="fit-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.fit.label}</p>
                <h2 id="fit-title">{copy.fit.title}</h2>
              </div>

              <div className={styles.fitGrid}>
                <article className={styles.worksCard}>
                  <h3><Check aria-hidden="true" size={21} /> {copy.fit.worksHeading}</h3>
                  <ul>
                    {copy.fit.worksWhen.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
                <article className={styles.longerCard}>
                  <h3><CircleAlert aria-hidden="true" size={21} /> {copy.fit.longerHeading}</h3>
                  <ul>
                    {copy.fit.chooseLongerWhen.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              </div>
            </section>

            <section className={styles.questions} aria-labelledby="questions-title">
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>{copy.questions.label}</p>
                  <h2 id="questions-title">{copy.questions.title}</h2>
                </div>
                <p>{copy.questions.intro}</p>
              </div>

              <ol className={styles.questionList}>
                {copy.questions.items.map((item, index) => (
                  <li key={item.question}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{item.question}</h3>
                      <p>{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className={styles.trustSection} aria-labelledby="trust-title">
              <div className={styles.trustLead}>
                <div className={styles.trustIntro}>
                  <p className={styles.sectionLabelLight}>{copy.trust.label}</p>
                  <h2 id="trust-title">{copy.trust.title}</h2>
                  <p>{copy.trust.intro}</p>
                </div>

                <figure className={styles.planningIllustration}>
                  <picture>
                    <source
                      sizes="(max-width: 48rem) calc(100vw - 4.5rem), 34rem"
                      srcSet={`${guideAssetPath}/planning-method-720.webp 720w, ${guideAssetPath}/planning-method-1200.webp 1200w, ${guideAssetPath}/planning-method-1536.webp 1536w`}
                      type="image/webp"
                    />
                    <img
                      alt={copy.trust.imageAlt}
                      decoding="async"
                      height="1024"
                      loading="lazy"
                      src={`${guideAssetPath}/planning-method-1536.png`}
                      width="1536"
                    />
                  </picture>
                  <figcaption>
                    {copy.trust.imageCaption}
                  </figcaption>
                </figure>
              </div>

              <ol className={styles.methodGrid}>
                {copy.trust.methods.map((method, index) => (
                  <li key={method.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{method.title}</h3>
                    <p>{method.detail}</p>
                  </li>
                ))}
              </ol>

              <p className={styles.boundaryStatement}>{copy.trust.boundary}</p>
            </section>

            <section className={styles.faqSection} aria-labelledby="faq-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.faq.label}</p>
                <h2 id="faq-title">{copy.faq.title}</h2>
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

            <section className={styles.finalCta} aria-labelledby="cta-title">
              <div>
                <p className={styles.sectionLabelLight}>{copy.cta.label}</p>
                <h2 id="cta-title">{copy.cta.title}</h2>
                <p>{copy.cta.intro}</p>
              </div>
              <div className={styles.ctaAction}>
                <a href={plannerHref}>
                  {copy.cta.button}
                  <ArrowRight aria-hidden="true" size={19} />
                </a>
                <small>{copy.cta.note}</small>
              </div>
            </section>

            <aside className={styles.sourceNote} aria-labelledby="method-title">
              <details>
                <summary id="method-title">{copy.source.summary}</summary>
                <div>
                  <p>{copy.source.intro}</p>
                  <ul>
                    {sourceHrefs.map((href, index) => (
                      <li key={href}><a href={href}>{copy.source.links[index]}</a></li>
                    ))}
                  </ul>
                  <p>{copy.source.releaseNote}</p>
                </div>
              </details>
            </aside>
          </div>

          <script
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredDataForLocale).replace(/</g, "\\u003c"),
            }}
            type="application/ld+json"
          />
        </article>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Brand copy={copy} homeHref={homeHref} />
          <nav aria-label={copy.footer.navigationLabel}>
            <Link href={zhangjiajieGuideHref}>{copy.footer.zhangjiajieGuide}</Link>
            <Link href={privacyHref}>{copy.footer.privacy}</Link>
            <a href={plannerHref}>{copy.footer.cta}</a>
          </nav>
        </div>
        <p>{copy.footer.copyright(new Date().getFullYear())}</p>
      </footer>
    </div>
  );
}
