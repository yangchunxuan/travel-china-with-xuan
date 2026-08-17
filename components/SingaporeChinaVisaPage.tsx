import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGuideEntry } from "../lib/guideRegistry";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getSingaporeChinaVisaCopy } from "../lib/singaporeChinaVisaI18n";
import {
  EDITORIAL_ORGANIZATION_ID,
  EDITORIAL_PERSON_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialPersonSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import { LegacyEditorialByline } from "./LegacyEditorialByline";
import { GuideCtaLink } from "./GuideCtaLink";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./SingaporeChinaVisaPage.module.css";

const guideId = "do-singaporeans-need-visa-china" as const;
const assetPath = "/images/guides/zhangjiajie-older-travellers";

const guideHubLabels: Record<HomegroundLocale, string> = {
  en: "Travel guides",
  zh: "旅行指南",
  ko: "여행 가이드",
};

function guideHubPath(locale: HomegroundLocale) {
  return locale === "en" ? "/guides/" : `/${locale}/guides/`;
}

function createStructuredData(locale: HomegroundLocale) {
  const copy = getSingaporeChinaVisaCopy(locale);
  const guide = getGuideEntry(guideId, locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      editorialPersonSchema(locale),
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
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        author: { "@id": EDITORIAL_PERSON_ID },
        reviewedBy: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": EDITORIAL_ORGANIZATION_ID },
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

export function SingaporeChinaVisaPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getSingaporeChinaVisaCopy(locale);
  const guide = getGuideEntry(guideId, locale);
  const plannerHref = `${copy.homePath}?utm_source=singapore-visa-guide&utm_medium=owned&utm_campaign=trip-conversation&utm_content=article-cta#route-finder`;
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
            <LegacyEditorialByline
              guideId={guide.id}
              locale={locale}
              reviewedAt={guide.sourceReviewedDate}
            />

            <figure className={styles.heroFigure}>
              <picture>
                <source
                  type="image/avif"
                  srcSet={`${assetPath}/pillars-720.avif 720w, ${assetPath}/pillars-1200.avif 1200w`}
                  sizes="(max-width: 60rem) calc(100vw - 2rem), 56rem"
                />
                <source
                  type="image/webp"
                  srcSet={`${assetPath}/pillars-720.webp 720w, ${assetPath}/pillars-1200.webp 1200w`}
                  sizes="(max-width: 60rem) calc(100vw - 2rem), 56rem"
                />
                <img
                  src={`${assetPath}/pillars-1200.jpg`}
                  srcSet={`${assetPath}/pillars-720.jpg 720w, ${assetPath}/pillars-1200.jpg 1200w`}
                  sizes="(max-width: 60rem) calc(100vw - 2rem), 56rem"
                  alt={copy.heroAlt}
                  width="1200"
                  height="675"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
              <figcaption>{copy.heroCaption}</figcaption>
            </figure>
          </header>

          <div className={styles.body}>
            {copy.sections.map((section) => (
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
              <GuideCtaLink
                guideId={guideId}
                href={plannerHref}
                locale={locale}
              >
                {copy.ctaAction}
                <ArrowRight aria-hidden="true" size={18} />
              </GuideCtaLink>
            </div>
          </section>

          <section
            className={styles.related}
            aria-labelledby="guide-related-title"
          >
            <header>
              <h2 id="guide-related-title">{copy.relatedTitle}</h2>
            </header>
            <div className={styles.relatedList}>
              {copy.relatedLinks.map((link) => {
                const target = getGuideEntry(
                  link.id as Parameters<typeof getGuideEntry>[0],
                  locale,
                );
                return (
                  <Link href={target.canonicalPath} key={link.id}>
                    <strong>{link.label}</strong>
                    <p>{link.description}</p>
                    <ArrowRight aria-hidden="true" size={18} />
                  </Link>
                );
              })}
            </div>
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
