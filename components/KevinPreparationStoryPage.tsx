import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  MessageSquareText,
  Route,
  TicketCheck,
} from "lucide-react";
import { getGuideEntry } from "../lib/guideRegistry";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  getKevinPreparationStoryCopy,
  type KevinPreparationStoryCaseCopy,
  type KevinPreparationStoryImageCopy,
  type KevinPreparationStorySectionCopy,
} from "../lib/kevinPreparationStoryI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import { KevinStoryContentsNav } from "./KevinStoryContentsNav";
import styles from "./KevinPreparationStoryPage.module.css";

const guideId = "kevin-before-the-hotel-pickup" as const;
const assetPath = "/images/guides/kevin-preparation";

function createStructuredData(locale: HomegroundLocale) {
  const copy = getKevinPreparationStoryCopy(locale);
  const guide = getGuideEntry(guideId, locale);
  const studioPath = locale === "en" ? "/studio/" : `/${locale}/studio/`;
  const studioUrl = `https://homegroundchina.com${studioPath}`;
  const personId = `${studioUrl}#team-kevin`;

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
        "@type": "Person",
        "@id": personId,
        name: "Kevin",
        jobTitle: copy.schemaRole,
        url: personId,
        worksFor: { "@id": "https://homegroundchina.com/#organization" },
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
          width: 1200,
          height: 630,
          caption: copy.hero.caption,
        },
        author: { "@id": personId },
        publisher: { "@id": "https://homegroundchina.com/#organization" },
        about: copy.schemaAbout.map((name) => ({ "@type": "Thing", name })),
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
            name: copy.breadcrumbStudio,
            item: studioUrl,
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

function ResponsivePicture({
  kind,
  copy,
  className,
}: {
  kind: "guiding" | "solo" | "rain";
  copy: KevinPreparationStoryImageCopy;
  className: string;
}) {
  return (
    <figure className={className}>
      <picture>
        <source
          type="image/avif"
          srcSet={`${assetPath}/kevin-${kind}-720.avif 720w, ${assetPath}/kevin-${kind}-1080.avif 1080w`}
          sizes="(max-width: 52rem) calc(100vw - 2rem), 42rem"
        />
        <source
          type="image/webp"
          srcSet={`${assetPath}/kevin-${kind}-720.webp 720w, ${assetPath}/kevin-${kind}-1080.webp 1080w`}
          sizes="(max-width: 52rem) calc(100vw - 2rem), 42rem"
        />
        <img
          src={`${assetPath}/kevin-${kind}-1080.jpg`}
          srcSet={`${assetPath}/kevin-${kind}-720.jpg 720w, ${assetPath}/kevin-${kind}-1080.jpg 1080w`}
          sizes="(max-width: 52rem) calc(100vw - 2rem), 42rem"
          alt={copy.alt}
          width="1080"
          height="1440"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <figcaption>{copy.caption}</figcaption>
    </figure>
  );
}

function SectionHeading({
  section,
  id,
}: {
  section: KevinPreparationStorySectionCopy;
  id: string;
}) {
  return (
    <header className={styles.sectionHeading}>
      <p className={styles.sectionStage}>{section.eyebrow}</p>
      <h2 id={id}>{section.title}</h2>
    </header>
  );
}

function CaseNote({
  copy,
  methodLabel,
}: {
  copy: KevinPreparationStoryCaseCopy;
  methodLabel: string;
}) {
  return (
    <aside className={styles.caseNote} aria-label={copy.title}>
      <p className={styles.caseLabel}>{copy.eyebrow}</p>
      <h3>{copy.title}</h3>
      {copy.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p className={styles.caseMethod}>{methodLabel}</p>
    </aside>
  );
}

function FactList({ items }: { items: string[] }) {
  return (
    <ul className={styles.factList}>
      {items.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" size={17} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function KevinPreparationStoryPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getKevinPreparationStoryCopy(locale);
  const guide = getGuideEntry(guideId, locale);
  const fieldNote = getGuideEntry(
    "zhangjiajie-glass-bridge-vs-skywalk",
    locale,
  );
  const studioHref = `${locale === "en" ? "" : `/${locale}`}/studio/#team-kevin`;
  const plannerHref = `${copy.homePath}?utm_source=kevin-field-note&utm_medium=owned&utm_campaign=pre-departure-preparation&planner=destinations#route-finder`;
  const structuredData = createStructuredData(locale);
  const preflightIcons = [TicketCheck, Clock, Route, MessageSquareText];
  const contents = copy.contents.filter(
    (section) => section.id !== "quick-answer",
  );

  return (
    <div
      className={styles.pageRoot}
      data-homeground-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={styles.skipLink} href="#story-content">
        {copy.skipLink}
      </a>
      <HomegroundHeader locale={locale} pageContext="guide" guideId={guideId} />

      <main id="story-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <nav className={styles.breadcrumb} aria-label={copy.breadcrumbLabel}>
              <ol>
                <li>
                  <Link href={copy.homePath}>{copy.breadcrumbHome}</Link>
                </li>
                <li>
                  <Link href={studioHref}>{copy.breadcrumbStudio}</Link>
                </li>
                <li aria-current="page">{copy.breadcrumbCurrent}</li>
              </ol>
            </nav>

            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>{copy.eyebrow}</p>
                <h1>{copy.title}</h1>
                <p className={styles.dek}>{copy.dek}</p>

                <div className={styles.byline}>
                  <span className={styles.bylineMonogram} aria-hidden="true">
                    K
                  </span>
                  <div>
                    <p>{copy.authorLabel}</p>
                    <strong>{copy.authorName}</strong>
                    <span>{copy.authorRole}</span>
                  </div>
                </div>

                <dl className={styles.storyMeta}>
                  <div>
                    <dt>{copy.updatedLabel}</dt>
                    <dd>
                      <time dateTime={guide.datePublished}>
                        {copy.updatedDate}
                      </time>
                    </dd>
                  </div>
                  <div>
                    <dt aria-hidden="true">—</dt>
                    <dd>{copy.readTime}</dd>
                  </div>
                </dl>
              </div>

              <figure className={styles.heroFigure}>
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`${assetPath}/kevin-hero-720.avif 720w, ${assetPath}/kevin-hero-1080.avif 1080w`}
                    sizes="(max-width: 52rem) calc(100vw - 3rem), 34vw"
                  />
                  <source
                    type="image/webp"
                    srcSet={`${assetPath}/kevin-hero-720.webp 720w, ${assetPath}/kevin-hero-1080.webp 1080w`}
                    sizes="(max-width: 52rem) calc(100vw - 3rem), 34vw"
                  />
                  <img
                    src={`${assetPath}/kevin-hero-1080.jpg`}
                    srcSet={`${assetPath}/kevin-hero-720.jpg 720w, ${assetPath}/kevin-hero-1080.jpg 1080w`}
                    sizes="(max-width: 52rem) calc(100vw - 3rem), 34vw"
                    alt={copy.hero.alt}
                    width="1080"
                    height="1440"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
                <figcaption>{copy.hero.caption}</figcaption>
              </figure>
            </div>
          </header>

          <section
            className={styles.quickAnswer}
            id="quick-answer"
            aria-labelledby="quick-answer-title"
          >
            <div className={styles.quickAnswerInner}>
              <div>
                <p className={styles.quickAnswerLabel}>
                  {copy.quickAnswer.label}
                </p>
                <h2 id="quick-answer-title">{copy.quickAnswer.title}</h2>
              </div>
              <div>
                {copy.quickAnswer.paragraphs.map((paragraph) => (
                  <p className={styles.quickAnswerBody} key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          <div className={styles.editorialBody}>
            <KevinStoryContentsNav
              label={copy.contentsLabel}
              title={copy.contentsTitle}
              sections={contents.map((section) => ({
                id: section.id,
                title: section.label,
              }))}
            />

            <div className={styles.articleColumn}>
              <section className={styles.introduction} aria-label={copy.dek}>
                {copy.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <blockquote className={styles.pullQuote}>
                  {copy.pullQuote}
                </blockquote>
              </section>

              <section
                className={styles.storySection}
                id="before-pickup"
                aria-labelledby="before-pickup-title"
              >
                <SectionHeading
                  section={copy.beforePickup}
                  id="before-pickup-title"
                />
                <div className={styles.sectionBody}>
                  <p>{copy.beforePickup.paragraphs[0]}</p>
                  <ul className={styles.preflightGrid}>
                    {copy.beforePickup.bullets?.map((item, index) => {
                      const Icon = preflightIcons[index] ?? Check;
                      return (
                        <li key={item}>
                          <Icon aria-hidden="true" size={21} />
                          <strong>{item}</strong>
                          <span aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  {copy.beforePickup.paragraphs.slice(1).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className={styles.caseAndPhoto}>
                  {copy.beforePickup.caseStudy ? (
                    <CaseNote
                      copy={copy.beforePickup.caseStudy}
                      methodLabel={copy.caseMethodLabel}
                    />
                  ) : null}
                  <ResponsivePicture
                    kind="guiding"
                    copy={copy.images.action}
                    className={styles.storyFigure}
                  />
                </div>
              </section>

              <section
                className={`${styles.storySection} ${styles.splitSection}`}
                id="fit-the-traveller"
                aria-labelledby="fit-the-traveller-title"
              >
                <ResponsivePicture
                  kind="solo"
                  copy={copy.images.portrait}
                  className={styles.splitFigure}
                />
                <div>
                  <SectionHeading
                    section={copy.fitTraveller}
                    id="fit-the-traveller-title"
                  />
                  <div className={styles.sectionBody}>
                    <p>{copy.fitTraveller.paragraphs[0]}</p>
                    {copy.fitTraveller.bullets ? (
                      <FactList items={copy.fitTraveller.bullets} />
                    ) : null}
                    {copy.fitTraveller.paragraphs.slice(1).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {copy.fitTraveller.quote ? (
                    <blockquote className={styles.handoffQuote}>
                      {copy.fitTraveller.quote}
                    </blockquote>
                  ) : null}
                </div>
              </section>

              <section
                className={`${styles.storySection} ${styles.splitSection} ${styles.splitSectionReverse}`}
                id="backup-route"
                aria-labelledby="backup-route-title"
              >
                <div>
                  <SectionHeading
                    section={copy.backupRoute}
                    id="backup-route-title"
                  />
                  <div className={styles.sectionBody}>
                    {copy.backupRoute.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {copy.backupRoute.bullets ? (
                      <ol className={styles.questionTiles}>
                        {copy.backupRoute.bullets.map((item, index) => (
                          <li key={item}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            {item}
                          </li>
                        ))}
                      </ol>
                    ) : null}
                  </div>
                  {copy.backupRoute.caseStudy ? (
                    <CaseNote
                      copy={copy.backupRoute.caseStudy}
                      methodLabel={copy.caseMethodLabel}
                    />
                  ) : null}
                </div>
                <ResponsivePicture
                  kind="rain"
                  copy={copy.images.rain}
                  className={styles.splitFigure}
                />
              </section>

              <section
                className={styles.storySection}
                id="handoff"
                aria-labelledby="handoff-title"
              >
                <SectionHeading section={copy.handoff} id="handoff-title" />
                <div className={styles.sectionBody}>
                  {copy.handoff.paragraphs.slice(0, 2).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className={styles.handoffPanel}>
                  <ol className={styles.handoffFlow}>
                    {copy.handoff.bullets?.map((item, index) => (
                      <li key={item}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{item}</strong>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className={styles.sectionBody}>
                  {copy.handoff.paragraphs.slice(2).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {copy.handoff.quote ? (
                  <blockquote className={styles.handoffQuote}>
                    {copy.handoff.quote}
                  </blockquote>
                ) : null}
              </section>

              <section
                className={styles.storySection}
                id="five-checks"
                aria-labelledby="five-checks-title"
              >
                <div className={styles.checkBoard}>
                  <p className={styles.checkBoardEyebrow}>
                    {copy.fiveChecks.label}
                  </p>
                  <h2 id="five-checks-title">{copy.fiveChecks.title}</h2>
                  <ol>
                    {copy.fiveChecks.items.map((item) => (
                      <li key={item.number}>
                        <span>{item.number}</span>
                        <strong>{item.title}</strong>
                        <p>{item.body}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section
                className={`${styles.storySection} ${styles.closing}`}
                aria-labelledby="kevin-closing-title"
              >
                <h2 id="kevin-closing-title">{copy.closing.title}</h2>
                {copy.closing.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <details className={styles.editorialNote}>
                  <summary>{copy.editorialNoteLabel}</summary>
                  <p>{copy.editorialNote}</p>
                </details>
              </section>
            </div>
          </div>

          <section className={styles.finalCta} aria-labelledby="kevin-cta-title">
            <div className={styles.finalCtaInner}>
              <div>
                <p className={styles.finalCtaEyebrow}>{copy.ctaEyebrow}</p>
                <h2 id="kevin-cta-title">{copy.ctaTitle}</h2>
              </div>
              <div>
                <p className={styles.finalCtaBody}>{copy.ctaBody}</p>
                <Link href={plannerHref}>
                  {copy.ctaAction}
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </div>
            </div>
          </section>

          <section className={styles.related} aria-labelledby="kevin-related-title">
            <header>
              <p className={styles.relatedEyebrow}>{copy.relatedEyebrow}</p>
              <h2 id="kevin-related-title">{copy.relatedTitle}</h2>
            </header>
            <div className={styles.relatedGrid}>
              <Link href={studioHref}>
                <span>01</span>
                <strong>{copy.studioLinkLabel}</strong>
                <p>{copy.studioLinkDescription}</p>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link href={fieldNote.canonicalPath}>
                <span>02</span>
                <strong>{copy.fieldNoteLinkLabel}</strong>
                <p>{copy.fieldNoteLinkDescription}</p>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </section>
        </article>
      </main>

      <HomegroundFooter locale={locale} pageContext="guide" guideId={guideId} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
    </div>
  );
}
