import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Clock3,
  Luggage,
  MapPinned,
  MoveRight,
} from "lucide-react";
import { getGuideEntry } from "../lib/guideRegistry";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  EDITORIAL_ORGANIZATION_ID,
  EDITORIAL_PERSON_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialPersonSchema,
  editorialReviewedPageSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import {
  getChinaItineraryWithOlderParentsCopy,
  type ChinaItineraryWithOlderParentsCopy,
} from "../lib/chinaItineraryWithOlderParentsI18n";
import { GuideCtaLink } from "./GuideCtaLink";
import { LegacyEditorialByline } from "./LegacyEditorialByline";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./ChinaItineraryWithOlderParentsPage.module.css";

const siteUrl = "https://homegroundchina.com";
const guideId = "china-itinerary-with-older-parents" as const;

const guideHubLabels: Record<HomegroundLocale, string> = {
  en: "Travel guides",
  zh: "旅行指南",
  ko: "실용 가이드",
};

function guideHubPath(locale: HomegroundLocale) {
  return locale === "en" ? "/guides/" : `/${locale}/guides/`;
}

function createStructuredData(locale: HomegroundLocale) {
  const copy = getChinaItineraryWithOlderParentsCopy(locale);
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
        headline: copy.metadata.headline,
        description: copy.metadata.schemaDescription,
        image: guide.heroImageUrl,
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: copy.htmlLang,
        mainEntityOfPage: editorialReviewedPageSchema(guide.canonicalUrl),
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        author: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": EDITORIAL_ORGANIZATION_ID },
        about: copy.schemaAbout.map((name) => ({ "@type": "Thing", name })),
      },
      {
        "@type": "FAQPage",
        "@id": `${guide.canonicalUrl}#faq`,
        mainEntity: copy.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${guide.canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.navigation.breadcrumbHome,
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
            name: copy.navigation.breadcrumbCurrent,
            item: guide.canonicalUrl,
          },
        ],
      },
    ],
  };
}

function SourcesInline({
  copy,
  sourceIds,
}: {
  copy: ChinaItineraryWithOlderParentsCopy;
  sourceIds?: readonly string[];
}) {
  if (!sourceIds?.length) return null;

  const sources = sourceIds
    .map((sourceId) => copy.sources.items.find((item) => item.id === sourceId))
    .filter((item): item is ChinaItineraryWithOlderParentsCopy["sources"]["items"][number] =>
      Boolean(item),
    );

  if (!sources.length) return null;

  return (
    <span className={styles.inlineSources}>
      {sources.map((source, index) => (
        <span key={source.id}>
          {index > 0 ? " · " : ""}
          <a href={source.url} rel="noreferrer">
            {source.organization}
          </a>
        </span>
      ))}
    </span>
  );
}

export function ChinaItineraryWithOlderParentsPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getChinaItineraryWithOlderParentsCopy(locale);
  const guide = getGuideEntry(guideId, locale);
  const plannerHref = `${copy.homePath}?utm_source=${guideId}&utm_medium=owned&utm_campaign=trip-conversation&utm_content=planner-contact#planner-contact`;
  const emailHref = `${copy.homePath}?utm_source=${guideId}&utm_medium=owned&utm_campaign=trip-conversation&utm_content=email-option#planner-contact`;
  const structuredData = createStructuredData(locale);

  return (
    <div
      className={styles.pageRoot}
      data-homeground-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={styles.skipLink} href="#parents-guide-content">
        {copy.navigation.skipLink}
      </a>
      <HomegroundHeader locale={locale} pageContext="guide" guideId={guideId} />

      <main id="parents-guide-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroInner}>
              <nav
                className={styles.breadcrumb}
                aria-label={copy.navigation.breadcrumbLabel}
              >
                <ol>
                  <li>
                    <Link href={copy.homePath}>
                      {copy.navigation.breadcrumbHome}
                    </Link>
                  </li>
                  <li>
                    <Link href={guideHubPath(locale)}>
                      {copy.navigation.breadcrumbGuides}
                    </Link>
                  </li>
                  <li aria-current="page">
                    {copy.navigation.breadcrumbCurrent}
                  </li>
                </ol>
              </nav>

              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
                  <h1>{copy.hero.title}</h1>
                  <p className={styles.heroLead}>{copy.hero.lead}</p>
                  <p className={styles.scopeNote}>{copy.hero.scopeNote}</p>
                  <LegacyEditorialByline
                    guideId={guide.id}
                    locale={locale}
                    reviewedAt={guide.sourceReviewedDate}
                  />
                </div>

                <aside
                  className={styles.decisionBoard}
                  aria-label={copy.summaryOptions.title}
                >
                  <div className={styles.decisionBoardHeader}>
                    <MapPinned aria-hidden="true" size={22} />
                    <span>{copy.summaryOptions.label}</span>
                  </div>
                  {copy.summaryOptions.options.map((option) => (
                    <div className={styles.decisionRow} key={option.id}>
                      <div>
                        <strong>{option.title}</strong>
                        <span>{option.nights}</span>
                      </div>
                      <div>
                        <b>{option.hotelChanges}</b>
                        <small>{copy.summaryOptions.columns.hotelChanges}</small>
                      </div>
                    </div>
                  ))}
                  <p>{copy.summaryOptions.boundary}</p>
                </aside>
              </div>

              <ul className={styles.heroHighlights}>
                {copy.hero.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </header>

          <div className={styles.articleShell}>
            <section
              className={styles.summary}
              aria-labelledby="route-comparison-title"
            >
              <div className={styles.sectionIntro}>
                <p className={styles.sectionLabel}>{copy.summaryOptions.label}</p>
                <h2 id="route-comparison-title">{copy.summaryOptions.title}</h2>
                <p>{copy.summaryOptions.intro}</p>
              </div>

              <div
                className={styles.tableScroll}
                tabIndex={0}
                role="region"
                aria-label={copy.summaryOptions.title}
              >
                <table className={styles.routeTable}>
                  <thead>
                    <tr>
                      <th scope="col">{copy.summaryOptions.columns.nights}</th>
                      <th scope="col">
                        {copy.summaryOptions.columns.hotelChanges}
                      </th>
                      <th scope="col">
                        {copy.summaryOptions.columns.designedFor}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {copy.summaryOptions.options.map((option) => (
                      <tr key={option.id}>
                        <th scope="row">
                          <span>{option.title}</span>
                          <small>{option.nights}</small>
                        </th>
                        <td>
                          <span className={styles.mobileFieldLabel}>
                            {copy.summaryOptions.columns.hotelChanges}
                          </span>
                          <span>{option.hotelChanges}</span>
                        </td>
                        <td>
                          <span className={styles.mobileFieldLabel}>
                            {copy.summaryOptions.columns.designedFor}
                          </span>
                          <p>{option.designedFor}</p>
                          <strong>{option.verdict}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.boundaryLine}>
                {copy.summaryOptions.boundary}
              </p>
            </section>

            <section
              className={styles.ability}
              aria-labelledby="ability-questions-title"
            >
              <div className={styles.abilityIntro}>
                <span className={styles.sectionIndex}>01</span>
                <div>
                  <h2 id="ability-questions-title">
                    {copy.abilityQuestions.title}
                  </h2>
                  <p>{copy.abilityQuestions.intro}</p>
                </div>
              </div>
              <ol className={styles.questionGrid}>
                {copy.abilityQuestions.questions.map((question, index) => (
                  <li key={question}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{question}</p>
                  </li>
                ))}
              </ol>
              <p className={styles.note}>{copy.abilityQuestions.boundary}</p>
            </section>

            <section
              className={styles.timelineSection}
              aria-labelledby="twelve-day-title"
            >
              <div className={styles.sectionHeading}>
                <span className={styles.sectionIndex}>02</span>
                <div>
                  <h2 id="twelve-day-title">{copy.twelveDay.title}</h2>
                  <p>{copy.twelveDay.intro}</p>
                </div>
              </div>
              <ol className={styles.timeline}>
                {copy.twelveDay.days.map((day) => (
                  <li key={day.day}>
                    <div className={styles.dayMarker}>{day.day}</div>
                    <div className={styles.dayCopy}>
                      <h3>{day.title}</h3>
                      <p>{day.plan}</p>
                      <small>{day.reason}</small>
                      <SourcesInline copy={copy} sourceIds={day.sourceIds} />
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section
              className={styles.variants}
              aria-labelledby="fourteen-day-title"
            >
              <div className={styles.sectionHeading}>
                <span className={styles.sectionIndex}>03</span>
                <div>
                  <h2 id="fourteen-day-title">{copy.variants.title}</h2>
                  <p>{copy.variants.intro}</p>
                </div>
              </div>
              <div className={styles.variantGrid}>
                {copy.variants.options.map((option) => (
                  <article className={styles.variantCard} key={option.id}>
                    <div className={styles.variantTopline}>
                      <span>{option.nights}</span>
                      <span>{option.hotelChanges}</span>
                    </div>
                    <h3>{option.title}</h3>
                    <p className={styles.paceLabel}>{option.pace}</p>
                    <p>{option.summary}</p>
                    <ul className={styles.routeOutline}>
                      {option.outline.map((stop, index) => (
                        <li key={stop}>
                          {index > 0 && (
                            <MoveRight aria-hidden="true" size={15} />
                          )}
                          <span>{stop}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className={styles.variantNotes}>
                      {option.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                    <SourcesInline copy={copy} sourceIds={option.sourceIds} />
                  </article>
                ))}
              </div>
              <p className={styles.variantClosing}>{copy.variants.closing}</p>
              <GuideCtaLink
                className={styles.inlineCta}
                guideId={guideId}
                href={plannerHref}
                locale={locale}
                position="inline"
              >
                {copy.cta.primaryLabel}
                <ArrowRight aria-hidden="true" size={17} />
              </GuideCtaLink>
            </section>

            <section
              className={styles.friction}
              aria-labelledby="friction-title"
            >
              <div className={styles.sectionHeading}>
                <span className={styles.sectionIndex}>04</span>
                <div>
                  <p className={styles.sectionLabel}>{copy.friction.label}</p>
                  <h2 id="friction-title">{copy.friction.title}</h2>
                  <p>{copy.friction.intro}</p>
                </div>
              </div>
              <div className={styles.frictionGrid}>
                {copy.friction.sections.map((section, index) => {
                  const Icon = index === 0 ? Luggage : index === 1 ? BedDouble : Clock3;
                  return (
                    <article className={styles.frictionCard} key={section.id}>
                      <div className={styles.frictionIcon}>
                        <Icon aria-hidden="true" size={22} />
                      </div>
                      <h3>{section.title}</h3>
                      <p>{section.intro}</p>
                      <ol>
                        {section.items.map((item, itemIndex) => (
                          <li key={item}>
                            <span>{itemIndex + 1}</span>
                            {item}
                          </li>
                        ))}
                      </ol>
                      {section.closing ? <p>{section.closing}</p> : null}
                      {section.factNote ? (
                        <p className={styles.factNote}>{section.factNote}</p>
                      ) : null}
                      <SourcesInline copy={copy} sourceIds={section.sourceIds} />
                    </article>
                  );
                })}
              </div>
            </section>

            <section
              className={styles.support}
              aria-labelledby="support-title"
            >
              <div>
                <p className={styles.sectionLabelLight}>
                  {copy.support.highFrictionTitle}
                </p>
                <h2 id="support-title">{copy.support.title}</h2>
                <p>{copy.support.intro}</p>
                <p>{copy.support.body}</p>
                <p className={styles.supportBoundary}>
                  {copy.support.boundary}
                </p>
              </div>
              <ul>
                {copy.support.highFrictionDays.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section
              className={styles.mistakes}
              aria-labelledby="mistakes-title"
            >
              <div className={styles.sectionHeadingCompact}>
                <span className={styles.sectionIndex}>05</span>
                <h2 id="mistakes-title">{copy.mistakes.title}</h2>
              </div>
              <ol>
                {copy.mistakes.items.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className={styles.cta} aria-labelledby="parents-cta-title">
              <p className={styles.sectionLabelLight}>{copy.cta.eyebrow}</p>
              <h2 id="parents-cta-title">{copy.cta.title}</h2>
              <p>{copy.cta.body}</p>
              <div className={styles.ctaActions}>
                <GuideCtaLink
                  guideId={guideId}
                  href={plannerHref}
                  locale={locale}
                >
                  {copy.cta.primaryLabel}
                  <ArrowRight aria-hidden="true" size={18} />
                </GuideCtaLink>
                <GuideCtaLink
                  guideId={guideId}
                  href={emailHref}
                  locale={locale}
                >
                  {copy.cta.secondaryLabel}
                </GuideCtaLink>
              </div>
              <small>{copy.cta.boundary}</small>
            </section>

            <section className={styles.faq} aria-labelledby="faq-title">
              <div className={styles.sectionIntro}>
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

            <section
              className={styles.related}
              aria-labelledby="related-title"
            >
              <h2 id="related-title">{copy.related.title}</h2>
              <div>
                {copy.related.items.map((item) => (
                  <Link href={item.href} key={item.href}>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                    <ArrowRight aria-hidden="true" size={17} />
                  </Link>
                ))}
              </div>
            </section>

            <section
              className={styles.sources}
              aria-labelledby="sources-title"
            >
              <h2 id="sources-title">{copy.sources.title}</h2>
              <p>{copy.sources.intro}</p>
              <p className={styles.checkedDate}>
                {copy.sources.checkedLabel}:{" "}
                <time dateTime="2026-07-31">
                  {copy.sources.checkedDate}
                </time>
              </p>
              <ol>
                {copy.sources.items.map((source) => (
                  <li id={`source-${source.id}`} key={source.id}>
                    <a href={source.url} rel="noreferrer">
                      {source.organization}: {source.title}
                    </a>
                    {source.additionalLinks?.length ? (
                      <span className={styles.additionalLinks}>
                        {source.additionalLinks.map((link, index) => (
                          <span key={link.url}>
                            {index > 0 ? " · " : ""}
                            <a href={link.url} rel="noreferrer">
                              {link.label}
                            </a>
                          </span>
                        ))}
                      </span>
                    ) : null}
                    <span>
                      {source.publishedDate
                        ? `${source.publishedDate} · `
                        : ""}
                      <time dateTime={source.checkedDate}>
                        {source.checkedDate}
                      </time>
                      {" · "}
                      {source.usageNote}
                    </span>
                    <small>{source.volatility}</small>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </article>
      </main>

      <HomegroundFooter locale={locale} pageContext="guide" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
