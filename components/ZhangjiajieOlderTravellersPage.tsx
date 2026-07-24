import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGuideEntry } from "../lib/guideRegistry";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getZhangjiajieOlderTravellersCopy } from "../lib/zhangjiajieOlderTravellersI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./ZhangjiajieOlderTravellersPage.module.css";

const guideId = "zhangjiajie-older-travellers" as const;
const assetPath = "/images/guides/zhangjiajie-older-travellers";

const guideHubLabels: Record<HomegroundLocale, string> = {
  en: "Travel guides",
  zh: "旅行指南",
  ko: "여행 가이드",
};

function guideHubPath(locale: HomegroundLocale) {
  return locale === "en" ? "/guides/" : `/${locale}/guides/`;
}

function BodyFigure({
  stem,
  width,
  height,
  alt,
  caption,
}: {
  stem: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}) {
  return (
    <figure className={styles.bodyFigure}>
      <picture>
        <source
          type="image/avif"
          srcSet={`${assetPath}/${stem}-720.avif 720w, ${assetPath}/${stem}-1200.avif 1200w`}
          sizes="(max-width: 46rem) calc(100vw - 2rem), 44rem"
        />
        <source
          type="image/webp"
          srcSet={`${assetPath}/${stem}-720.webp 720w, ${assetPath}/${stem}-1200.webp 1200w`}
          sizes="(max-width: 46rem) calc(100vw - 2rem), 44rem"
        />
        <img
          src={`${assetPath}/${stem}-1200.jpg`}
          srcSet={`${assetPath}/${stem}-720.jpg 720w, ${assetPath}/${stem}-1200.jpg 1200w`}
          sizes="(max-width: 46rem) calc(100vw - 2rem), 44rem"
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </picture>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function createStructuredData(locale: HomegroundLocale) {
  const copy = getZhangjiajieOlderTravellersCopy(locale);
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

export function ZhangjiajieOlderTravellersPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getZhangjiajieOlderTravellersCopy(locale);
  const guide = getGuideEntry(guideId, locale);
  const routeGuide = getGuideEntry("zhangjiajie-itinerary", locale);
  const plannerHref = `${copy.homePath}?utm_source=older-travellers-guide&utm_medium=owned&utm_campaign=trip-conversation&utm_content=article-cta#route-finder`;
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
            <p className={styles.scopeNote}>{copy.scopeNote}</p>

            <figure className={styles.heroFigure}>
              <picture>
                <source
                  type="image/avif"
                  srcSet={`${assetPath}/bailong-elevator-720.avif 720w, ${assetPath}/bailong-elevator-1200.avif 1200w`}
                  sizes="(max-width: 60rem) calc(100vw - 2rem), 56rem"
                />
                <source
                  type="image/webp"
                  srcSet={`${assetPath}/bailong-elevator-720.webp 720w, ${assetPath}/bailong-elevator-1200.webp 1200w`}
                  sizes="(max-width: 60rem) calc(100vw - 2rem), 56rem"
                />
                <img
                  src={`${assetPath}/bailong-elevator-1200.jpg`}
                  srcSet={`${assetPath}/bailong-elevator-720.jpg 720w, ${assetPath}/bailong-elevator-1200.jpg 1200w`}
                  sizes="(max-width: 60rem) calc(100vw - 2rem), 56rem"
                  alt={copy.heroAlt}
                  width="1200"
                  height="1500"
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
              id={copy.sectionOne.id}
              aria-labelledby={`${copy.sectionOne.id}-title`}
            >
              <h2 id={`${copy.sectionOne.id}-title`}>{copy.sectionOne.title}</h2>
              {copy.sectionOne.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <BodyFigure
              stem="natural-bridge"
              width={1200}
              height={675}
              alt={copy.bridgeAlt}
              caption={copy.bridgeCaption}
            />

            <section
              className={styles.section}
              id={copy.sectionTwo.id}
              aria-labelledby={`${copy.sectionTwo.id}-title`}
            >
              <h2 id={`${copy.sectionTwo.id}-title`}>{copy.sectionTwo.title}</h2>
              {copy.sectionTwo.leads?.map((lead) => (
                <p className={styles.lead} key={lead}>
                  {lead}
                </p>
              ))}
              {copy.sectionTwo.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <BodyFigure
              stem="park-shuttle"
              width={1200}
              height={800}
              alt={copy.shuttleAlt}
              caption={copy.shuttleCaption}
            />

            <section
              className={styles.section}
              id={copy.sectionThree.id}
              aria-labelledby={`${copy.sectionThree.id}-title`}
            >
              <h2 id={`${copy.sectionThree.id}-title`}>
                {copy.sectionThree.title}
              </h2>
              {copy.sectionThree.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <BodyFigure
              stem="pillars"
              width={1200}
              height={675}
              alt={copy.pillarsAlt}
              caption={copy.pillarsCaption}
            />

            <section
              className={styles.review}
              aria-labelledby="guide-review-title"
            >
              <h2 id="guide-review-title">{copy.reviewTitle}</h2>
              <p>{copy.reviewBody}</p>
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
              <p className={styles.ctaBoundary}>{copy.ctaBoundary}</p>
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
            <Link href={routeGuide.canonicalPath}>
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
