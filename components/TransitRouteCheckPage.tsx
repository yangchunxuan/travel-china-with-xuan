import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGuideEntry } from "../lib/guideRegistry";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getTransitRouteCheckCopy } from "../lib/transitRouteCheckI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./TransitRouteCheckPage.module.css";

const guideId = "china-240-hour-visa-free-transit-route-check" as const;
const assetPath =
  "/images/guides/china-240-hour-visa-free-transit-route-check";

const guideHubLabels: Record<HomegroundLocale, string> = {
  en: "Travel guides",
  zh: "旅行指南",
  ko: "여행 가이드",
};

function guideHubPath(locale: HomegroundLocale) {
  return locale === "en" ? "/guides/" : `/${locale}/guides/`;
}

function createStructuredData(locale: HomegroundLocale) {
  const copy = getTransitRouteCheckCopy(locale);
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
        image: {
          "@type": "ImageObject",
          url: guide.heroImageUrl,
          width: guide.imageWidth,
          height: guide.imageHeight,
          caption: copy.heroCaption,
        },
        author: { "@id": "https://homegroundchina.com/#organization" },
        publisher: { "@id": "https://homegroundchina.com/#organization" },
        about: copy.schemaAbout.map((name) => ({ "@type": "Thing", name })),
        citation: copy.sources.map((source) => ({
          "@type": "CreativeWork",
          name: source.label,
          url: source.url,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${guide.canonicalUrl}#faq`,
        mainEntity: copy.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${guide.canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumbHome,
            item: `https://homegroundchina.com${copy.homePath}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: guideHubLabels[locale],
            item: `https://homegroundchina.com${guideHubPath(locale)}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: copy.breadcrumbCurrent,
            item: guide.canonicalUrl,
          },
        ],
      },
    ],
  };
}

export function TransitRouteCheckPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getTransitRouteCheckCopy(locale);
  const guide = getGuideEntry(guideId, locale);
  const relatedGuide = getGuideEntry(
    "do-us-citizens-need-visa-china-2026",
    locale,
  );
  const plannerHref = `${copy.homePath}?utm_source=transit-route-check&utm_medium=owned&utm_campaign=trip-conversation&utm_content=article-cta#route-finder`;
  const structuredData = createStructuredData(locale);

  return (
    <div
      className={styles.pageRoot}
      data-homeground-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={styles.skipLink} href="#guide-content">
        {copy.skipLink}
      </a>
      <HomegroundHeader locale={locale} pageContext="guide" guideId={guideId} />

      <main id="guide-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <nav className={styles.breadcrumb} aria-label={copy.breadcrumbLabel}>
              <ol>
                <li>
                  <Link href={copy.homePath}>{copy.breadcrumbHome}</Link>
                </li>
                <li>
                  <Link href={guideHubPath(locale)}>
                    {copy.breadcrumbGuides}
                  </Link>
                </li>
                <li aria-current="page">{copy.breadcrumbCurrent}</li>
              </ol>
            </nav>

            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className={styles.directAnswer}>{copy.directAnswer}</p>
            <p className={styles.directAnswerTail}>{copy.directAnswerTail}</p>
            <p className={styles.directAnswerTail}>{copy.directAnswerClose}</p>

            <figure className={styles.heroFigure}>
              <picture>
                <source
                  type="image/avif"
                  srcSet={`${assetPath}/route-rule-720.avif 720w, ${assetPath}/route-rule-1200.avif 1200w`}
                  sizes="(max-width: 60rem) calc(100vw - 2rem), 56rem"
                />
                <source
                  type="image/webp"
                  srcSet={`${assetPath}/route-rule-720.webp 720w, ${assetPath}/route-rule-1200.webp 1200w`}
                  sizes="(max-width: 60rem) calc(100vw - 2rem), 56rem"
                />
                <img
                  src={`${assetPath}/route-rule-1200.jpg`}
                  srcSet={`${assetPath}/route-rule-720.jpg 720w, ${assetPath}/route-rule-1200.jpg 1200w`}
                  sizes="(max-width: 60rem) calc(100vw - 2rem), 56rem"
                  alt={copy.heroAlt}
                  width="1200"
                  height="720"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
              <figcaption>{copy.heroCaption}</figcaption>
            </figure>
          </header>

          <div className={styles.body}>
            <section
              className={styles.section}
              id={copy.ruleSection.id}
              aria-labelledby={`${copy.ruleSection.id}-title`}
            >
              <h2 id={`${copy.ruleSection.id}-title`}>
                {copy.ruleSection.title}
              </h2>
              {copy.ruleSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <section
              className={styles.tableSection}
              id="route-table"
              aria-labelledby="route-table-title"
            >
              <h2 id="route-table-title">{copy.tableTitle}</h2>
              <div className={styles.tableScroll}>
                <table className={styles.routeTable}>
                  <thead>
                    <tr>
                      <th scope="col">{copy.tableColumnRoute}</th>
                      <th scope="col">{copy.tableColumnVerdict}</th>
                      <th scope="col">{copy.tableColumnWhy}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {copy.routes.map((row) => (
                      <tr key={row.route}>
                        <th scope="row">{row.route}</th>
                        <td>
                          <span
                            className={styles.verdict}
                            data-verdict={row.verdict}
                          >
                            {copy.verdictLabels[row.verdict]}
                          </span>
                        </td>
                        <td>{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.tableNote}>{copy.tableNote}</p>
            </section>

            {[copy.needSection, copy.breakSection].map((section) => (
              <section
                className={styles.section}
                id={section.id}
                key={section.id}
                aria-labelledby={`${section.id}-title`}
              >
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                {section.lead ? (
                  <p className={styles.lead}>{section.lead}</p>
                ) : null}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <section
              className={styles.tableSection}
              id="permitted-areas"
              aria-labelledby="permitted-areas-title"
            >
              <h2 id="permitted-areas-title">{copy.areaTitle}</h2>
              <p className={styles.areaIntro}>{copy.areaIntro}</p>
              <div className={styles.tableScroll}>
                <table className={styles.areaTable}>
                  <thead>
                    <tr>
                      <th scope="col">{copy.areaColumnWhere}</th>
                      <th scope="col">{copy.areaColumnOpen}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {copy.areas.map((row) => (
                      <tr
                        key={row.where}
                        data-restricted={row.restricted ? "true" : undefined}
                      >
                        <th scope="row">{row.where}</th>
                        <td>{row.open}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.tableNote}>
                {copy.areaNote.split(copy.areaTableLinkLabel)[0]}
                <a
                  href={copy.areaTableUrl}
                  rel="nofollow noopener"
                  target="_blank"
                >
                  {copy.areaTableLinkLabel}
                </a>
                {copy.areaNote.split(copy.areaTableLinkLabel)[1]}
              </p>
            </section>

            <section
              className={styles.section}
              id={copy.clockSection.id}
              aria-labelledby={`${copy.clockSection.id}-title`}
            >
              <h2 id={`${copy.clockSection.id}-title`}>
                {copy.clockSection.title}
              </h2>
              {copy.clockSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <section
              className={styles.review}
              aria-labelledby="guide-review-title"
            >
              <h2 id="guide-review-title">{copy.reviewTitle}</h2>
              <p>{copy.reviewBody}</p>
              <p>{copy.reviewBoundary}</p>
              <div className={styles.sources}>
                <h3>{copy.sourcesLabel}</h3>
                <ul>
                  {copy.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        rel="nofollow noopener"
                        target="_blank"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className={styles.hotline}>{copy.hotlineNote}</p>
              </div>
              <p className={styles.updated}>
                {copy.updatedLabel}:{" "}
                <time dateTime={guide.dateModified}>{copy.updatedDate}</time>
              </p>
            </section>

            <section className={styles.faq} aria-labelledby="guide-faq-title">
              <h2 id="guide-faq-title">{copy.faqTitle}</h2>
              <dl>
                {copy.faq.map((item) => (
                  <div key={item.question}>
                    <dt>{item.question}</dt>
                    <dd>{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <section className={styles.finalCta} aria-labelledby="guide-cta-title">
            <div>
              <p>{copy.ctaEyebrow}</p>
              <h2 id="guide-cta-title">{copy.ctaTitle}</h2>
            </div>
            <div>
              <p>{copy.ctaBody}</p>
              <Link href={plannerHref}>
                {copy.ctaAction}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </section>

          <section
            className={styles.related}
            aria-labelledby="guide-related-title"
          >
            <header>
              <h2 id="guide-related-title">{copy.relatedTitle}</h2>
            </header>
            <Link href={relatedGuide.canonicalPath}>
              <strong>{copy.relatedLinkLabel}</strong>
              <p>{copy.relatedLinkDescription}</p>
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </section>
        </article>
      </main>

      <HomegroundFooter locale={locale} pageContext="guide" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
    </div>
  );
}
