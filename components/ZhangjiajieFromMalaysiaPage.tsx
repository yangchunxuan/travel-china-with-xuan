import Link from "next/link";
import {
  ArrowRight,
  Check,
  CloudRain,
  ExternalLink,
  MapPin,
  Plane,
  TrainFront,
  UtensilsCrossed,
} from "lucide-react";
import { getGuideEntry } from "../lib/guideRegistry";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  EDITORIAL_ORGANIZATION_ID,
  EDITORIAL_PERSON_ID,
  editorialPersonSchema,
} from "../lib/editorialIdentity";
import {
  MALAYSIA_ZHANGJIAJIE_IMAGE_ROOT,
  MALAYSIA_ZHANGJIAJIE_SOURCES,
  malaysiaZhangjiajieGuideId,
  type MalaysiaZhangjiajieGuideCopy,
  type MalaysiaZhangjiajieSourceCategory,
  type MalaysiaZhangjiajieSourceId,
} from "../lib/zhangjiajieFromMalaysiaGuide";
import { getMalaysiaZhangjiajieGuideCopy } from "../lib/zhangjiajieFromMalaysiaGuideI18n";
import { GuideCtaLink } from "./GuideCtaLink";
import { LegacyEditorialByline } from "./LegacyEditorialByline";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./ZhangjiajieFromMalaysiaPage.module.css";

const SITE_URL = "https://homegroundchina.com";
const SOURCE_CATEGORY_ORDER = [
  "official",
  "completed",
  "market",
] as const satisfies readonly MalaysiaZhangjiajieSourceCategory[];

function getSourceById(sourceId: MalaysiaZhangjiajieSourceId) {
  const source = MALAYSIA_ZHANGJIAJIE_SOURCES.find(
    (candidate) => candidate.id === sourceId,
  );

  if (!source) {
    throw new Error(`Unknown Malaysia guide source: ${sourceId}`);
  }

  return source;
}

function guideHubPath(locale: HomegroundLocale) {
  return locale === "en" ? "/guides/" : `/${locale}/guides/`;
}

function createStructuredData(
  locale: HomegroundLocale,
  copy: MalaysiaZhangjiajieGuideCopy,
) {
  const guide = getGuideEntry(malaysiaZhangjiajieGuideId, locale);
  const organizationId = EDITORIAL_ORGANIZATION_ID;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Homeground China",
        url: `${SITE_URL}/`,
      },
      editorialPersonSchema(locale),
      {
        "@type": "Article",
        "@id": `${guide.canonicalUrl}#article`,
        url: guide.canonicalUrl,
        headline: guide.headline,
        description: copy.structuredData.description,
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: copy.htmlLang,
        mainEntityOfPage: guide.canonicalUrl,
        image: {
          "@type": "ImageObject",
          url: guide.heroImageUrl,
          width: guide.imageWidth,
          height: guide.imageHeight,
          caption: copy.images.heroCaption,
        },
        author: { "@id": EDITORIAL_PERSON_ID },
        reviewedBy: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": organizationId },
        audience: {
          "@type": "Audience",
          audienceType: copy.structuredData.audience,
        },
        about: copy.structuredData.about.map((name) => ({
          "@type": "Thing",
          name,
        })),
        citation: MALAYSIA_ZHANGJIAJIE_SOURCES.map((source) => ({
          "@type": "WebPage",
          name: copy.sources.labels[source.id],
          url: source.url,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${guide.canonicalUrl}#breadcrumb`,
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
            item: `${SITE_URL}${guideHubPath(locale)}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: copy.breadcrumb.current,
            item: guide.canonicalUrl,
          },
        ],
      },
    ],
  };
}

function SourceLink({
  copy,
  sourceId,
}: {
  copy: MalaysiaZhangjiajieGuideCopy;
  sourceId: MalaysiaZhangjiajieSourceId;
}) {
  const source = getSourceById(sourceId);

  return (
    <a
      className={styles.sourceLink}
      href={source.url}
      target="_blank"
      rel="noreferrer"
    >
      <span>{copy.sources.labels[sourceId]}</span>
      <ExternalLink aria-hidden="true" size={13} />
      <span className={styles.srOnly}>({copy.sources.externalLabel})</span>
    </a>
  );
}

function SourceLinks({
  copy,
  sourceIds,
}: {
  copy: MalaysiaZhangjiajieGuideCopy;
  sourceIds: readonly MalaysiaZhangjiajieSourceId[];
}) {
  if (sourceIds.length === 0) {
    return null;
  }

  return (
    <span
      aria-label={copy.sources.inlineLabel}
      className={styles.sourceLinks}
      role="group"
    >
      {sourceIds.map((sourceId) => (
        <SourceLink copy={copy} key={sourceId} sourceId={sourceId} />
      ))}
    </span>
  );
}

function ResponsivePhoto({
  name,
  alt,
  width,
  height,
  sizes,
  priority = false,
}: {
  name: "misty-pillars" | "park-entrance";
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${MALAYSIA_ZHANGJIAJIE_IMAGE_ROOT}/${name}-480.avif 480w, ${MALAYSIA_ZHANGJIAJIE_IMAGE_ROOT}/${name}-768.avif 768w, ${MALAYSIA_ZHANGJIAJIE_IMAGE_ROOT}/${name}-1200.avif 1200w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${MALAYSIA_ZHANGJIAJIE_IMAGE_ROOT}/${name}-480.webp 480w, ${MALAYSIA_ZHANGJIAJIE_IMAGE_ROOT}/${name}-768.webp 768w, ${MALAYSIA_ZHANGJIAJIE_IMAGE_ROOT}/${name}-1200.webp 1200w`}
        sizes={sizes}
      />
      <img
        src={`${MALAYSIA_ZHANGJIAJIE_IMAGE_ROOT}/${name}-1200.jpg`}
        alt={alt}
        width={width}
        height={height}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}

export function ZhangjiajieFromMalaysiaPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getMalaysiaZhangjiajieGuideCopy(locale);
  const guide = getGuideEntry(malaysiaZhangjiajieGuideId, locale);
  const plannerHref = `${copy.homePath}?utm_source=zhangjiajie-from-malaysia&utm_medium=owned&utm_campaign=trip-conversation&utm_content=planner-contact#planner-contact`;
  const structuredData = createStructuredData(locale, copy);

  return (
    <div
      className={styles.pageRoot}
      lang={copy.htmlLang}
      data-homeground-locale={locale}
    >
      <a className={styles.skipLink} href="#malaysia-guide-main">
        {copy.skipLink}
      </a>

      <HomegroundHeader
        locale={locale}
        pageContext="guide"
        guideId={malaysiaZhangjiajieGuideId}
      />

      <main id="malaysia-guide-main" tabIndex={-1}>
        <article aria-labelledby="malaysia-guide-title">
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <nav
                className={styles.breadcrumb}
                aria-label={copy.breadcrumb.label}
              >
                <ol>
                  <li>
                    <Link href={copy.homePath}>{copy.breadcrumb.home}</Link>
                  </li>
                  <li>
                    <Link href={guideHubPath(locale)}>
                      {copy.breadcrumb.guides}
                    </Link>
                  </li>
                  <li aria-current="page">{copy.breadcrumb.current}</li>
                </ol>
              </nav>

              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1 id="malaysia-guide-title">
                {copy.hero.titleParts.map((part, index) => (
                  <span className={styles.titlePhrase} key={`${part}-${index}`}>
                    {part}
                    {index < copy.hero.titleParts.length - 1 ? <wbr /> : null}
                  </span>
                ))}
              </h1>
              <p className={styles.heroLead}>{copy.hero.lead}</p>
              <a className={styles.heroAnchor} href="#door-to-door">
                {copy.hero.anchor}
                <ArrowRight aria-hidden="true" size={17} />
              </a>
              <LegacyEditorialByline
                guideId={guide.id}
                locale={locale}
                reviewedAt={guide.sourceReviewedDate}
              />
              <p className={styles.reviewed}>
                <span>{copy.hero.localNote}</span>
              </p>
            </div>

            <figure className={styles.heroVisual}>
              <ResponsivePhoto
                name="misty-pillars"
                alt={copy.images.heroAlt}
                width={1200}
                height={714}
                sizes="(max-width: 820px) 100vw, 45vw"
                priority
              />
              <figcaption>{copy.images.heroCaption}</figcaption>
            </figure>
          </header>

          <section
            className={styles.directAnswer}
            aria-labelledby="direct-answer-title"
          >
            <div className={styles.directHeading}>
              <p className={styles.sectionLabelOnDark}>{copy.direct.label}</p>
              <h2 id="direct-answer-title">{copy.direct.title}</h2>
              <p>{copy.direct.body}</p>
            </div>
            <div className={styles.journeyCards}>
              {copy.direct.journeys.map((journey, index) => {
                const Icon = [Plane, TrainFront, MapPin][index];
                return (
                  <div key={journey.title}>
                    <Icon aria-hidden="true" size={22} strokeWidth={1.6} />
                    <h3>{journey.title}</h3>
                    <p>{journey.body}</p>
                  </div>
                );
              })}
            </div>
            <p className={styles.directConclusion}>{copy.direct.conclusion}</p>
          </section>

          <div className={styles.articleLayout}>
            <aside className={styles.contents}>
              <p>{copy.toc.label}</p>
              <nav aria-label={copy.toc.label}>
                {copy.toc.items.map((item) => (
                  <a href={item.href} key={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>

            <div className={styles.articleContent}>
              <section
                id="door-to-door"
                className={styles.journeySection}
                aria-labelledby="door-to-door-title"
              >
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>{copy.journey.label}</p>
                  <h2 id="door-to-door-title">{copy.journey.title}</h2>
                  <p>{copy.journey.intro}</p>
                </div>

                <figure className={styles.routeMap}>
                  <figcaption>{copy.journey.routeSummary}</figcaption>
                  <ol aria-label={copy.journey.ariaLabel}>
                    {copy.journey.nodes.map((node) => (
                      <li key={node.place}>
                        <span aria-hidden="true" />
                        <strong>{node.place}</strong>
                        <small>{node.role}</small>
                      </li>
                    ))}
                  </ol>
                </figure>

                <div className={styles.routeLegs}>
                  {copy.journey.legs.map((leg) => (
                    <section
                      id={leg.id}
                      aria-labelledby={`${leg.id}-title`}
                      key={leg.id}
                    >
                      <h3 id={`${leg.id}-title`}>{leg.title}</h3>
                      {leg.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {leg.bullets ? (
                        <ul>
                          {leg.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                      {leg.pullQuote ? (
                        <blockquote>{leg.pullQuote}</blockquote>
                      ) : null}
                      {leg.sourceIds ? (
                        <SourceLinks copy={copy} sourceIds={leg.sourceIds} />
                      ) : null}
                    </section>
                  ))}
                </div>

                <div className={styles.dynamicNote}>
                  <strong>{copy.journey.dynamicLabel}</strong>
                  <p>{copy.journey.dynamicNote}</p>
                </div>
              </section>

              <section
                id="responsibility"
                aria-labelledby="responsibility-title"
              >
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>
                    {copy.responsibility.label}
                  </p>
                  <h2 id="responsibility-title">
                    {copy.responsibility.title}
                  </h2>
                  <p>{copy.responsibility.intro}</p>
                </div>
                <div className={styles.tableScroll}>
                  <table>
                    <caption>{copy.responsibility.ariaLabel}</caption>
                    <thead>
                      <tr>
                        {copy.responsibility.columns.map((column) => (
                          <th scope="col" key={column}>
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {copy.responsibility.rows.map((row) => (
                        <tr key={row[0]}>
                          <th scope="row">{row[0]}</th>
                          <td data-label={copy.responsibility.columns[1]}>
                            {row[1]}
                          </td>
                          <td data-label={copy.responsibility.columns[2]}>
                            {row[2]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={styles.sectionClosing}>
                  {copy.responsibility.closing}
                </p>
              </section>

              <section
                id="traveller-evidence"
                aria-labelledby="traveller-evidence-title"
              >
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>{copy.evidence.label}</p>
                  <h2 id="traveller-evidence-title">{copy.evidence.title}</h2>
                  <p>{copy.evidence.intro}</p>
                </div>
                <div className={styles.prose}>
                  {copy.evidence.paragraphs.map((paragraph) => (
                    <p key={paragraph.text}>
                      {paragraph.text}
                      <SourceLinks
                        copy={copy}
                        sourceIds={paragraph.sourceIds}
                      />
                    </p>
                  ))}
                </div>
                <ul className={styles.lessonList}>
                  {copy.evidence.lessons.map((lesson) => (
                    <li key={lesson}>
                      <Check aria-hidden="true" size={16} />
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
                <p className={styles.evidenceBoundary}>
                  {copy.evidence.boundary}
                </p>
              </section>

              <figure className={styles.entrancePhoto}>
                <ResponsivePhoto
                  name="park-entrance"
                  alt={copy.images.entranceAlt}
                  width={1200}
                  height={704}
                  sizes="(max-width: 760px) calc(100vw - 2rem), 56rem"
                />
                <figcaption>{copy.images.entranceCaption}</figcaption>
              </figure>

              <section id="hotel-bases" aria-labelledby="hotel-bases-title">
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>{copy.bases.label}</p>
                  <h2 id="hotel-bases-title">{copy.bases.title}</h2>
                  <p>{copy.bases.intro}</p>
                </div>
                <div
                  className={styles.baseMap}
                  role="list"
                  aria-label={copy.bases.ariaLabel}
                >
                  {copy.bases.items.map((item) => (
                    <article role="listitem" key={item.place}>
                      <p>{item.role}</p>
                      <h3>{item.place}</h3>
                      <strong>{item.title}</strong>
                      <span>{item.body}</span>
                    </article>
                  ))}
                </div>
                <p className={styles.sectionClosing}>{copy.bases.closing}</p>
                <p className={styles.diagramNote}>{copy.bases.disclaimer}</p>
              </section>

              <section
                id="people-and-meals"
                aria-labelledby="people-and-meals-title"
              >
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>{copy.people.label}</p>
                  <h2 id="people-and-meals-title">{copy.people.title}</h2>
                  <p>{copy.people.intro}</p>
                </div>
                <div className={styles.peopleGrid}>
                  <div>
                    <h3>{copy.people.questionTitle}</h3>
                    <ul>
                      {copy.people.questions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>{copy.people.actionTitle}</h3>
                    <ul>
                      {copy.people.actions.map((action) => (
                        <li key={action}>
                          <Check aria-hidden="true" size={15} />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className={styles.sectionClosing}>{copy.people.closing}</p>

                <div className={styles.mealPanel}>
                  <div>
                    <UtensilsCrossed
                      aria-hidden="true"
                      size={26}
                      strokeWidth={1.5}
                    />
                    <p className={styles.sectionLabel}>{copy.meals.label}</p>
                    <h3>{copy.meals.title}</h3>
                    <p>{copy.meals.intro}</p>
                  </div>
                  <ul>
                    {copy.meals.questions.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                  </ul>
                  <div className={styles.prose}>
                    {copy.meals.paragraphs.map((paragraph) => (
                      <p key={paragraph.text}>
                        {paragraph.text}
                        <SourceLinks
                          copy={copy}
                          sourceIds={paragraph.sourceIds}
                        />
                      </p>
                    ))}
                    <strong>{copy.meals.note}</strong>
                  </div>
                </div>

                <div className={styles.weatherPanel}>
                  <div>
                    <CloudRain
                      aria-hidden="true"
                      size={27}
                      strokeWidth={1.5}
                    />
                    <p className={styles.sectionLabel}>{copy.weather.label}</p>
                    <h3>{copy.weather.title}</h3>
                    <p>{copy.weather.intro}</p>
                  </div>
                  <ul>
                    {copy.weather.actions.map((action) => (
                      <li key={action}>{action}</li>
                    ))}
                  </ul>
                  <div>
                    {copy.weather.closing.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </section>

              <section
                id="support-level"
                aria-labelledby="support-level-title"
              >
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>{copy.selfBooking.label}</p>
                  <h2 id="support-level-title">{copy.selfBooking.title}</h2>
                  <p>{copy.selfBooking.intro}</p>
                </div>
                <div className={styles.profileList}>
                  {copy.selfBooking.profiles.map((profile) => (
                    <article key={profile.title}>
                      <h3>{profile.title}</h3>
                      <p>{profile.body}</p>
                      <ul>
                        {profile.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>

              <section id="trip-length" aria-labelledby="trip-length-title">
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>{copy.duration.label}</p>
                  <h2 id="trip-length-title">{copy.duration.title}</h2>
                  <p>{copy.duration.intro}</p>
                </div>
                <ol className={styles.calendarList}>
                  {copy.duration.days.map((day) => (
                    <li key={day}>
                      <span aria-hidden="true" />
                      {day}
                    </li>
                  ))}
                </ol>
                <div className={styles.prose}>
                  {copy.duration.explanation.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className={styles.formula}>{copy.duration.formula}</p>
                {(() => {
                  const relatedGuide = getGuideEntry(
                    copy.duration.relatedGuideId,
                    locale,
                  );
                  return (
                    <Link
                      className={styles.inlineRelated}
                      href={relatedGuide.canonicalPath}
                    >
                      <span>
                        <strong>{copy.duration.relatedLabel}</strong>
                        <small>{copy.duration.relatedDescription}</small>
                      </span>
                      <ArrowRight aria-hidden="true" size={18} />
                    </Link>
                  );
                })()}
              </section>
            </div>
          </div>

          <section
            id="quote-checklist"
            className={styles.models}
            aria-labelledby="models-title"
          >
            <div className={styles.modelsIntro}>
              <p className={styles.sectionLabelOnDark}>{copy.models.label}</p>
              <h2 id="models-title">{copy.models.title}</h2>
              <p>{copy.models.intro}</p>
            </div>
            <div
              className={styles.modelGrid}
              role="list"
              aria-label={copy.models.ariaLabel}
            >
              {copy.models.cards.map((card) => (
                <article role="listitem" key={card.title}>
                  <p>{card.label}</p>
                  <h3>{card.title}</h3>
                  <span>{card.body}</span>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className={styles.modelsClosing}>{copy.models.closing}</p>
          </section>

          <div className={styles.lowerShell}>
            <section
              className={styles.visaNote}
              aria-labelledby="pre-departure-title"
            >
              <div>
                <p className={styles.sectionLabel}>
                  {copy.preDeparture.label}
                </p>
                <h2 id="pre-departure-title">{copy.preDeparture.title}</h2>
              </div>
              <div>
                {copy.preDeparture.paragraphs.map((paragraph) => (
                  <p key={paragraph.text}>
                    {paragraph.text}
                    <SourceLinks
                      copy={copy}
                      sourceIds={paragraph.sourceIds}
                    />
                  </p>
                ))}
                <div className={styles.dynamicNote}>
                  <strong>{copy.preDeparture.warningLabel}</strong>
                  <p>{copy.preDeparture.warning}</p>
                </div>
              </div>
            </section>

            <section
              id="start-conversation"
              className={styles.planningCta}
              aria-labelledby="planning-cta-title"
            >
              <div>
                <p className={styles.sectionLabelOnDark}>{copy.cta.label}</p>
                <h2 id="planning-cta-title">{copy.cta.title}</h2>
                <p>{copy.cta.body}</p>
              </div>
              <div>
                <strong>{copy.cta.prompt}</strong>
                <ul>
                  {copy.cta.items.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" size={15} />
                      {item}
                    </li>
                  ))}
                </ul>
                <GuideCtaLink
                  className={styles.ctaButton}
                  guideId={malaysiaZhangjiajieGuideId}
                  href={plannerHref}
                  locale={locale}
                >
                  <span>{copy.cta.action}</span>
                  <ArrowRight aria-hidden="true" size={18} />
                </GuideCtaLink>
                <small>{copy.cta.note}</small>
                <p className={styles.ctaFormNote}>{copy.cta.formNote}</p>
              </div>
            </section>

            <section className={styles.related} aria-labelledby="related-title">
              <header>
                <p className={styles.sectionLabel}>{copy.related.label}</p>
                <h2 id="related-title">{copy.related.title}</h2>
              </header>
              <div>
                {copy.related.items.map((item) => {
                  const relatedGuide = getGuideEntry(item.guideId, locale);
                  return (
                    <Link href={relatedGuide.canonicalPath} key={item.guideId}>
                      <span>
                        <strong>{item.label}</strong>
                        <small>{item.description}</small>
                      </span>
                      <ArrowRight aria-hidden="true" size={17} />
                    </Link>
                  );
                })}
              </div>
              <Link className={styles.allGuides} href={guideHubPath(locale)}>
                {copy.related.allGuides}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </section>

            <section
              className={styles.methodology}
              aria-labelledby="methodology-title"
            >
              <div>
                <p className={styles.sectionLabel}>{copy.methodology.label}</p>
                <h2 id="methodology-title">{copy.methodology.title}</h2>
              </div>
              <div className={styles.prose}>
                {copy.methodology.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className={styles.methodDynamic}>
                  {copy.methodology.dynamicNote}
                </p>
              </div>
            </section>

            <section className={styles.sources} aria-labelledby="sources-title">
              <header>
                <h2 id="sources-title">{copy.sources.title}</h2>
                <p>{copy.sources.intro}</p>
              </header>
              <div>
                {SOURCE_CATEGORY_ORDER.map((category) => {
                  const matchingSources = MALAYSIA_ZHANGJIAJIE_SOURCES.filter(
                    (source) => source.category === category,
                  );

                  return (
                    <details key={category} open={category === "official"}>
                      <summary>{copy.sources.categoryLabels[category]}</summary>
                      <ol>
                        {matchingSources.map((source) => (
                          <li key={source.id}>
                            <SourceLink copy={copy} sourceId={source.id} />
                          </li>
                        ))}
                      </ol>
                    </details>
                  );
                })}
              </div>
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
