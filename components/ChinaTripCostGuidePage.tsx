import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  CHINA_TRIP_COST_IMAGES,
  chinaTripCostGuideId,
  getChinaTripCostCopy,
  type ChinaTripCostCopy,
} from "../lib/chinaTripCostI18n";
import { getGuideEntry } from "../lib/guideRegistry";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  EDITORIAL_ORGANIZATION_ID,
  EDITORIAL_PERSON_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialPersonSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import { LegacyEditorialByline } from "./LegacyEditorialByline";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./ChinaTripCostGuidePage.module.css";

const SITE_URL = "https://homegroundchina.com";

function createStructuredData(
  locale: HomegroundLocale,
  copy: ChinaTripCostCopy,
  guide: ReturnType<typeof getGuideEntry>,
) {
  const canonicalUrl = guide.canonicalUrl;

  return {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      editorialPersonSchema(locale),
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
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        author: { "@id": EDITORIAL_PERSON_ID },
        reviewedBy: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": EDITORIAL_ORGANIZATION_ID },
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
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

function PlannerButton({ href, label }: { href: string; label: string }) {
  return (
    <Link className={styles.ctaPrimary} href={href}>
      {label}
      <ArrowRight aria-hidden="true" size={17} />
    </Link>
  );
}

export function ChinaTripCostGuidePage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getChinaTripCostCopy(locale);
  const guide = getGuideEntry(chinaTripCostGuideId, locale);
  const structuredData = createStructuredData(locale, copy, guide);
  const hero = CHINA_TRIP_COST_IMAGES.hero;

  return (
    <div className={styles.pageRoot} lang={copy.htmlLang}>
      <a className={styles.skipLink} href="#trip-cost-main">
        {copy.skipLink}
      </a>

      <HomegroundHeader
        locale={locale}
        pageContext="guide"
        guideId={chinaTripCostGuideId}
      />

      <main id="trip-cost-main">
        {/* ---------------- Hero ---------------- */}
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label={copy.breadcrumb.guides}>
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
            </p>

            <h1 className={styles.heroTitle}>{copy.metadata.headline}</h1>

            {copy.hero.lead.map((paragraph) => (
              <p className={styles.heroLead} key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}
            <LegacyEditorialByline
              guideId={guide.id}
              locale={locale}
              reviewedAt={guide.sourceReviewedDate}
            />
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
          </figure>
        </header>

        {/* ---------------- Short answer ---------------- */}
        <section className={`${styles.section} ${styles.sectionShaded}`}>
          <div className={styles.prose}>
            <h2 className={styles.sectionTitle}>{copy.shortAnswer.title}</h2>
            <p className={styles.sectionIntro}>{copy.shortAnswer.intro}</p>
          </div>

          <ul className={styles.bandStrip}>
            {copy.shortAnswer.bands.map((band) => (
              <li className={styles.bandCard} key={band.range}>
                <p className={styles.bandRange}>{band.range}</p>
                <p className={styles.bandLabel}>{band.label}</p>
                <p className={styles.bandDetail}>{band.detail}</p>
              </li>
            ))}
          </ul>

          <div className={styles.prose}>
            <p className={styles.caveat}>{copy.shortAnswer.caveat}</p>
          </div>
        </section>

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

        {/* ---------------- Published reference comparison ---------------- */}
        <section className={styles.section}>
          <div className={styles.prose}>
            <h2 className={styles.sectionTitle}>{copy.tiers.title}</h2>
            <p className={styles.sectionIntro}>{copy.tiers.intro}</p>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.tierTable}>
              <thead>
                <tr>
                  <th scope="col">{copy.tiers.columns.way}</th>
                  <th scope="col">{copy.tiers.columns.example}</th>
                  <th scope="col">{copy.tiers.columns.price}</th>
                  <th scope="col">{copy.tiers.columns.includes}</th>
                  <th scope="col">{copy.tiers.columns.excludes}</th>
                </tr>
              </thead>
              <tbody>
                {copy.tiers.rows.map((row) => (
                  <tr key={row.example}>
                    <th scope="row">{row.way}</th>
                    <td data-label={copy.tiers.columns.example}>{row.example}</td>
                    <td
                      className={styles.priceCell}
                      data-label={copy.tiers.columns.price}
                    >
                      {row.price}
                    </td>
                    <td data-label={copy.tiers.columns.includes}>
                      {row.includes}
                    </td>
                    <td data-label={copy.tiers.columns.excludes}>
                      {row.excludes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.prose}>
            <p className={styles.caveat}>{copy.tiers.fxNote}</p>
          </div>
        </section>

        {/* ---------------- Why the spread ---------------- */}
        <section className={styles.section}>
          <div className={styles.prose}>
            <h2 className={styles.sectionTitle}>{copy.spread.title}</h2>
            <p className={styles.sectionIntro}>{copy.spread.intro}</p>
          </div>

          <ol className={styles.factorList}>
            {copy.spread.factors.map((factor, index) => (
              <li className={styles.factorItem} key={factor.title}>
                <span className={styles.factorNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={styles.factorTitle}>{factor.title}</h3>
                  <p className={styles.factorDetail}>{factor.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.prose}>
            <p className={styles.closing}>{copy.spread.closing}</p>
          </div>
        </section>

        {/* ---------------- Ground costs ---------------- */}
        <section className={`${styles.section} ${styles.sectionShaded}`}>
          <div className={styles.prose}>
            <h2 className={styles.sectionTitle}>{copy.ground.title}</h2>
            <p className={styles.sectionIntro}>{copy.ground.intro}</p>
          </div>

          <div className={styles.prose}>
            <p>{copy.ground.accommodation}</p>
            <p>{copy.ground.transport}</p>
          </div>
        </section>

        {/* ---------------- DIY or arranged ---------------- */}
        <section className={styles.section}>
          <div className={styles.prose}>
            <h2 className={styles.sectionTitle}>{copy.diy.title}</h2>
            <p className={styles.sectionIntro}>{copy.diy.intro}</p>
          </div>

          <div className={styles.splitCards}>
            <article className={styles.splitCard}>
              <h3 className={styles.splitCardTitle}>{copy.diy.yourself.title}</h3>
              <ul>
                {copy.diy.yourself.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
            <article className={styles.splitCard}>
              <h3 className={styles.splitCardTitle}>{copy.diy.arranged.title}</h3>
              <ul>
                {copy.diy.arranged.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className={styles.prose}>
            <p className={styles.closing}>{copy.diy.closing}</p>
          </div>
        </section>

        {/* ---------------- How we quote ---------------- */}
        <section className={styles.section}>
          <div className={styles.quoteBlock}>
            <h2 className={styles.sectionTitle}>{copy.howWeQuote.title}</h2>
            {copy.howWeQuote.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            <p className={styles.quoteListLabel}>{copy.howWeQuote.listLabel}</p>
            <ul className={styles.quoteList}>
              {copy.howWeQuote.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.noPromise}>{copy.howWeQuote.noPricePromise}</p>
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
            <PlannerButton href={copy.plannerHref} label={copy.finalCta.button} />
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
