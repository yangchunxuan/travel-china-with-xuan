import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  CHINA_HOTEL_VALUE_IMAGES,
  chinaHotelValueGuideId,
  getChinaHotelValueCopy,
  type ChinaHotelValueCopy,
} from "../lib/chinaHotelValueI18n";
import { getGuideEntry } from "../lib/guideRegistry";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./ChinaHotelValueGuidePage.module.css";

const SITE_URL = "https://homegroundchina.com";

function createStructuredData(
  copy: ChinaHotelValueCopy,
  guide: ReturnType<typeof getGuideEntry>,
) {
  const organizationId = `${SITE_URL}/#organization`;
  const canonicalUrl = guide.canonicalUrl;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Homeground China",
        url: `${SITE_URL}/`,
      },
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        url: canonicalUrl,
        headline: copy.metadata.headline,
        description: copy.metadata.schemaDescription,
        image: {
          "@type": "ImageObject",
          url: guide.heroImageUrl,
          width: guide.imageWidth,
          height: guide.imageHeight,
          caption: copy.metadata.heroAlt,
        },
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: copy.metadata.inLanguage,
        author: { "@id": organizationId },
        publisher: { "@id": organizationId },
        mainEntityOfPage: canonicalUrl,
        citation: copy.sources.map((source) => source.url),
        about: copy.metadata.about,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumb.home,
            item: `${SITE_URL}${copy.homePath}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.breadcrumb.guides,
            item: `${SITE_URL}${copy.guidesPath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: copy.breadcrumb.current,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        inLanguage: copy.metadata.inLanguage,
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

function SourceLink({
  copy,
  index,
}: {
  copy: ChinaHotelValueCopy;
  index: number;
}) {
  const source = copy.sources[index];
  if (!source) return null;

  return (
    <a
      className={styles.sourceLink}
      href={source.url}
      target="_blank"
      rel="noreferrer"
    >
      {source.label}
      <ExternalLink aria-hidden="true" size={13} />
    </a>
  );
}

function PlannerButton({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      className={variant === "primary" ? styles.ctaPrimary : styles.ctaSecondary}
      href={href}
    >
      {label}
      <ArrowRight aria-hidden="true" size={17} />
    </Link>
  );
}

export function ChinaHotelValueGuidePage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getChinaHotelValueCopy(locale);
  const guide = getGuideEntry(chinaHotelValueGuideId, locale);
  const structuredData = createStructuredData(copy, guide);
  const hero = CHINA_HOTEL_VALUE_IMAGES.hero;
  const gateway = CHINA_HOTEL_VALUE_IMAGES.gateway;

  return (
    <div className={styles.pageRoot} lang={copy.htmlLang}>
      <a className={styles.skipLink} href="#stay-value-main">
        {copy.skipLink}
      </a>

      <HomegroundHeader
        locale={locale}
        pageContext="guide"
        guideId={chinaHotelValueGuideId}
      />

      <main id="stay-value-main">
        {/* ---------------- Hero ---------------- */}
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label={copy.breadcrumb.guides}>
              {/* Separators lead the item they belong to, so a wrap can never
                  strand a slash at the end of a line. */}
              <ol>
                <li>
                  <Link href={copy.homePath}>{copy.breadcrumb.home}</Link>
                </li>
                <li>
                  <span aria-hidden="true">/</span>
                  <Link href={copy.guidesPath}>{copy.breadcrumb.guides}</Link>
                </li>
                <li aria-current="page">
                  <span aria-hidden="true">/</span>
                  {copy.breadcrumb.current}
                </li>
              </ol>
            </nav>

            <p className={styles.eyebrow}>
              <span>{copy.hero.eyebrow}</span>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span className={styles.eyebrowMuted}>
                {copy.hero.reviewedLabel} {copy.hero.reviewedDate}
              </span>
            </p>

            <h1 className={styles.heroTitle}>{copy.metadata.headline}</h1>

            {copy.hero.lead.map((paragraph) => (
              <p className={styles.heroLead} key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}
          </div>

          <figure className={styles.heroFigure}>
            <picture>
              <source
                type="image/webp"
                srcSet={`${hero.basePath}-480.webp 480w, ${hero.basePath}-768.webp 768w, ${hero.basePath}-1200.webp 1200w`}
                sizes="(max-width: 900px) 100vw, 44vw"
              />
              <img
                alt={copy.hero.imageAlt}
                decoding="async"
                fetchPriority="high"
                height={hero.height}
                src={`${hero.basePath}-1200.jpg`}
                width={hero.width}
              />
            </picture>
            <figcaption>{copy.hero.imageCaption}</figcaption>
          </figure>
        </header>

        {/* ---------------- Early CTA ---------------- */}
        <section className={styles.section}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaCardCopy}>
              <p className={styles.ctaLabel}>{copy.earlyCta.label}</p>
              <h2 className={styles.ctaTitle}>{copy.earlyCta.title}</h2>
              <p className={styles.ctaDetail}>{copy.earlyCta.detail}</p>
            </div>
            <PlannerButton href={copy.plannerHref} label={copy.earlyCta.button} />
          </div>
        </section>

        {/* ---------------- Short answer ---------------- */}
        <section className={styles.section}>
          <div className={styles.prose}>
            <h2 className={styles.sectionTitle}>{copy.shortAnswer.title}</h2>
            {copy.shortAnswer.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <ul className={styles.statStrip}>
            {copy.shortAnswer.stats.map((stat) => (
              <li className={styles.statCard} key={stat.value}>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statCaption}>{stat.caption}</p>
                <SourceLink copy={copy} index={stat.sourceIndex} />
              </li>
            ))}
          </ul>

          <div className={styles.prose}>
            <p>{copy.shortAnswer.afterStats}</p>
          </div>

          <blockquote className={styles.pullQuote}>
            {copy.shortAnswer.pullQuote}
          </blockquote>
        </section>

        {/* ---------------- What the numbers miss ---------------- */}
        <section className={styles.section}>
          <div className={styles.prose}>
            <h2 className={styles.sectionTitle}>{copy.coverage.title}</h2>
            {copy.coverage.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <aside className={styles.observation}>
            <p className={styles.observationLabel}>
              {copy.coverage.observationLabel}
            </p>
            <p className={styles.observationBody}>{copy.coverage.observation}</p>
          </aside>
        </section>

        {/* ---------------- Four questions ---------------- */}
        <section className={styles.section}>
          <div className={styles.prose}>
            <h2 className={styles.sectionTitle}>{copy.questions.title}</h2>
            <p className={styles.sectionIntro}>{copy.questions.intro}</p>
          </div>

          <div className={styles.questionGrid}>
            {copy.questions.items.map((item, index) => (
              <article className={styles.questionCard} key={item.title}>
                <h3 className={styles.questionTitle}>{item.title}</h3>
                {item.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
                {index === 3 ? (
                  <p className={styles.inlineSource}>
                    <SourceLink
                      copy={copy}
                      index={copy.questions.passportSourceIndex}
                    />
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- What Homeground checks ---------------- */}
        <section className={`${styles.section} ${styles.sectionShaded}`}>
          <div className={styles.prose}>
            <h2 className={styles.sectionTitle}>{copy.shortlist.title}</h2>
            {copy.shortlist.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <ol className={styles.checkList}>
            {copy.shortlist.checks.map((check) => (
              <li className={styles.checkItem} key={check.number}>
                <span className={styles.checkNumber} aria-hidden="true">
                  {check.number}
                </span>
                <div>
                  <h3 className={styles.checkTitle}>{check.title}</h3>
                  <p className={styles.checkDetail}>{check.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.outcomeBlock}>
            <p className={styles.outcomeTitle}>{copy.shortlist.outcomeTitle}</p>
            <ul className={styles.outcomeList}>
              {copy.shortlist.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
            <p className={styles.caveat}>{copy.shortlist.caveat}</p>
          </div>
        </section>

        {/* ---------------- Zhangjiajie worked example ---------------- */}
        <section className={styles.section}>
          <div className={styles.splitBlock}>
            <div className={styles.splitCopy}>
              <h2 className={styles.sectionTitle}>{copy.zhangjiajie.title}</h2>
              <p className={styles.sectionIntro}>{copy.zhangjiajie.intro}</p>
              <ul className={styles.optionList}>
                {copy.zhangjiajie.options.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ul>
              {copy.zhangjiajie.afterOptions.map((paragraph) => (
                <p className={styles.splitParagraph} key={paragraph.slice(0, 24)}>
                  {paragraph}
                </p>
              ))}
            </div>

            <figure className={styles.splitFigure}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${gateway.basePath}-480.webp 480w, ${gateway.basePath}-768.webp 768w, ${gateway.basePath}-1200.webp 1200w`}
                  sizes="(max-width: 900px) 100vw, 40vw"
                />
                <img
                  alt={copy.zhangjiajie.imageAlt}
                  decoding="async"
                  height={gateway.height}
                  loading="lazy"
                  src={`${gateway.basePath}-1200.jpg`}
                  width={gateway.width}
                />
              </picture>
              <figcaption>{copy.zhangjiajie.imageCaption}</figcaption>
            </figure>
          </div>
        </section>

        {/* ---------------- Stay types ---------------- */}
        <section className={styles.section}>
          <div className={styles.prose}>
            <h2 className={styles.sectionTitle}>{copy.stayTypes.title}</h2>
            <p className={styles.sectionIntro}>{copy.stayTypes.intro}</p>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.stayTable}>
              <thead>
                <tr>
                  <th scope="col">{copy.stayTypes.columns.type}</th>
                  <th scope="col">{copy.stayTypes.columns.why}</th>
                  <th scope="col">{copy.stayTypes.columns.watch}</th>
                </tr>
              </thead>
              <tbody>
                {copy.stayTypes.rows.map((row) => (
                  <tr key={row.type}>
                    <th scope="row">{row.type}</th>
                    {/* data-label drives the stacked mobile layout, where the
                        column headers are not visible above each value. */}
                    <td data-label={copy.stayTypes.columns.why}>{row.why}</td>
                    <td data-label={copy.stayTypes.columns.watch}>
                      {row.watch}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.prose}>
            <p className={styles.tableNote}>{copy.stayTypes.note}</p>
          </div>
        </section>

        {/* ---------------- Audience ---------------- */}
        <section className={`${styles.section} ${styles.sectionShaded}`}>
          <div className={styles.prose}>
            <h2 className={styles.sectionTitle}>{copy.audience.title}</h2>
            <p className={styles.sectionIntro}>{copy.audience.intro}</p>
          </div>
          <ul className={styles.audienceList}>
            {copy.audience.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.prose}>
            <p className={styles.closing}>{copy.audience.closing}</p>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className={styles.section}>
          <div className={styles.prose}>
            <h2 className={styles.sectionTitle}>{copy.faq.title}</h2>
          </div>
          <dl className={styles.faqList}>
            {copy.faq.items.map((item) => (
              <div className={styles.faqItem} key={item.question}>
                <dt>{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------- Final CTA ---------------- */}
        <section className={styles.section}>
          <div className={styles.finalCta}>
            <h2 className={styles.finalCtaTitle}>{copy.finalCta.title}</h2>
            <p className={styles.finalCtaIntro}>{copy.finalCta.intro}</p>
            <p className={styles.finalCtaLabel}>{copy.finalCta.listLabel}</p>
            <ul className={styles.finalCtaList}>
              {copy.finalCta.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.finalCtaDetail}>{copy.finalCta.detail}</p>
            <PlannerButton
              href={copy.plannerHref}
              label={copy.finalCta.button}
            />
          </div>
        </section>

        {/* ---------------- Sources ---------------- */}
        <section className={`${styles.section} ${styles.sourcesSection}`}>
          <h2 className={styles.sourcesTitle}>{copy.sourcesTitle}</h2>
          <ol className={styles.sourceList}>
            {copy.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.label}
                  <ExternalLink aria-hidden="true" size={13} />
                </a>
              </li>
            ))}
          </ol>
          <p className={styles.sourceNote}>{copy.sourceNote}</p>
          <p className={styles.imageCredit}>
            <span>{copy.imageCreditLabel}:</span> {copy.imageCredit}
          </p>
        </section>
      </main>

      <HomegroundFooter locale={locale} pageContext="guide" />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
