import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGuidesByPillar } from "../lib/guideRegistry";
import {
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import { entryRequirementsEditionCopy } from "../lib/entryRequirementsEditions";
import {
  entryRequirementsAlternates,
  entryRequirementsEditionPath,
  type EntryRequirementsEditionLocale,
} from "../lib/entryRequirementsEditionPaths";
import { entryRequirementsGuideIds, type EntryRequirementsGuideId } from "../lib/entryRequirementsEditionTypes";
import { serviceEditionPaths } from "../lib/serviceEdition";
import { ArabicSiteFooter, ArabicSiteHeader } from "./ArabicChrome";
import { FrenchSiteFooter, FrenchSiteHeader } from "./FrenchChrome";
import { GermanSiteFooter, GermanSiteHeader } from "./GermanChrome";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import { SpanishSiteFooter, SpanishSiteHeader } from "./SpanishChrome";
import { GuideCtaLink } from "./GuideCtaLink";
import localeStyles from "./LocaleRoot.module.css";
import styles from "./ChinaEntryGuidesPage.module.css";
import editionStyles from "./ChinaEntryGuidesEditionPage.module.css";

const SITE_URL = "https://homegroundchina.com";
const languageLabels = { en: "EN", ja: "日本語", fr: "FR", es: "ES", de: "DE", ar: "العربية" } as const;

function isListedGuide(id: string): id is EntryRequirementsGuideId {
  return (entryRequirementsGuideIds as readonly string[]).includes(id);
}

/**
 * A full translation of the English entry hub (ChinaEntryGuidesPage), in the
 * same section order, inside the edition's own header and footer. The guide
 * cards still open the English guides, so each says so in its action label.
 */
export function ChinaEntryGuidesEditionPage({ language }: { language: EntryRequirementsEditionLocale }) {
  const copy = entryRequirementsEditionCopy[language];
  const path = entryRequirementsEditionPath(language);
  const pageUrl = `${SITE_URL}${path}`;
  const editionPaths = serviceEditionPaths(language);
  const plannerHref = `${editionPaths.home}?utm_source=china-entry-guides&utm_medium=owned&utm_campaign=trip-conversation&utm_content=entry-hub-cta#planner-contact`;
  const dateFormatter = new Intl.DateTimeFormat(copy.dateLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const formatDate = (value: string) => dateFormatter.format(new Date(`${value}T00:00:00Z`));

  const guides = getGuidesByPillar("entry-rules", "en").map((guide) => {
    // A newly listed English guide must be translated before this page builds.
    if (!isListedGuide(guide.id)) throw new Error(`Missing ${language} entry-hub card copy for ${guide.id}`);
    return { guide, card: copy.guides[guide.id] };
  });
  const latestReview = guides
    .map(({ guide }) => guide.sourceReviewedDate)
    .sort()
    .at(-1);

  const alternates = entryRequirementsAlternates();
  const languagePaths = (["en", "ja", "fr", "es", "de", "ar"] as const).map((lang) => ({
    lang,
    label: languageLabels[lang],
    path: alternates[lang],
  }));
  const headerProps = { currentPath: path, languagePaths };
  const header =
    language === "ja" ? <JapaneseSiteHeader {...headerProps} contactHref="/ja/#planner-contact" />
      : language === "fr" ? <FrenchSiteHeader {...headerProps} />
        : language === "es" ? <SpanishSiteHeader {...headerProps} />
          : language === "de" ? <GermanSiteHeader {...headerProps} />
            : <ArabicSiteHeader {...headerProps} />;
  const footer =
    language === "ja" ? <JapaneseSiteFooter currentPath={path} />
      : language === "fr" ? <FrenchSiteFooter currentPath={path} />
        : language === "es" ? <SpanishSiteFooter currentPath={path} />
          : language === "de" ? <GermanSiteFooter currentPath={path} />
            : <ArabicSiteFooter currentPath={path} />;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.hero.title,
        description: copy.metadata.description,
        inLanguage: language,
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        mainEntity: { "@id": `${pageUrl}#guide-list` },
      },
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#guide-list`,
        numberOfItems: guides.length,
        itemListElement: guides.map(({ guide, card }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: card.headline,
          url: guide.canonicalUrl,
          item: {
            "@type": "Article",
            "@id": `${guide.canonicalUrl}#article`,
            dateModified: guide.dateModified,
            inLanguage: "en",
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { name: copy.breadcrumb.home, item: `${SITE_URL}${editionPaths.home}` },
          { name: copy.breadcrumb.guides, item: `${SITE_URL}${editionPaths.guides}` },
          { name: copy.breadcrumb.current, item: pageUrl },
        ].map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })),
      },
    ],
  };

  return (
    <div
      className={`${localeStyles.root} hg-locale-root ${styles.pageRoot} ${editionStyles.root}`}
      data-homeground-locale={language}
      dir={language === "ar" ? "rtl" : "ltr"}
      lang={language}
    >
      <a className={styles.skipLink} href="#entry-guides-main">
        {copy.skipLink}
      </a>

      {header}

      <main id="entry-guides-main" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label={copy.breadcrumb.label}>
              <ol>
                <li>
                  <Link href={editionPaths.home}>{copy.breadcrumb.home}</Link>
                </li>
                <li>
                  <Link href={editionPaths.guides}>{copy.breadcrumb.guides}</Link>
                </li>
                <li aria-current="page">{copy.breadcrumb.current}</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1>{copy.hero.title}</h1>
            <p className={styles.lead}>{copy.hero.lead}</p>
            <p className={styles.boundary}>{copy.hero.boundary}</p>
          </div>

          <div className={styles.rulePanel} aria-label={copy.checks.label}>
            <p>{copy.checks.intro}</p>
            <ol>
              {copy.checks.items.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </header>

        <section className={styles.guideCollection} aria-labelledby="entry-collection-title">
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.collection.eyebrow}</p>
              <h2 id="entry-collection-title">{copy.collection.title}</h2>
            </div>
            <div>
              <p>{copy.collection.body}</p>
              {latestReview ? (
                <p className={styles.reviewDate}>
                  {copy.collection.latestReview}{" "}
                  <time dateTime={latestReview}>{formatDate(latestReview)}</time>
                </p>
              ) : null}
            </div>
          </div>

          <ol className={styles.guideGrid}>
            {guides.map(({ guide, card }, index) => {
              const [beforeDate, afterDate = ""] = copy.collection.checked.split("{date}");
              return (
                <li key={guide.id}>
                  <article>
                    <Link href={guide.canonicalPath} hrefLang="en">
                      <figure>
                        <img
                          src={guide.cardImagePath}
                          alt={card.imageAlt}
                          width={guide.cardImageWidth}
                          height={guide.cardImageHeight}
                          loading={index === 0 ? "eager" : "lazy"}
                          fetchPriority={index === 0 ? "high" : "auto"}
                          decoding="async"
                        />
                      </figure>
                      <div className={styles.cardBody}>
                        <p>
                          {card.label}
                          <span aria-hidden="true">·</span>
                          <time dateTime={guide.sourceReviewedDate}>
                            {beforeDate}
                            {formatDate(guide.sourceReviewedDate)}
                            {afterDate}
                          </time>
                        </p>
                        <h3>{card.headline}</h3>
                        <p>{card.description}</p>
                        <span className={styles.cardAction}>
                          {copy.collection.readEnglishGuide}
                          <ArrowRight aria-hidden="true" size={18} />
                        </span>
                      </div>
                    </Link>
                  </article>
                </li>
              );
            })}
          </ol>
        </section>

        <section className={styles.ruleTypes} aria-labelledby="entry-rule-types-title">
          <div className={styles.ruleTypesIntro}>
            <p className={styles.darkEyebrow}>{copy.ruleTypes.eyebrow}</p>
            <h2 id="entry-rule-types-title">{copy.ruleTypes.title}</h2>
          </div>
          <div className={styles.ruleTypeGrid}>
            {copy.ruleTypes.items.map((item) => (
              <article key={item.marker}>
                <span>{item.marker}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.protocol} aria-labelledby="protocol-title">
          <div>
            <p className={styles.eyebrow}>{copy.protocol.eyebrow}</p>
            <h2 id="protocol-title">{copy.protocol.title}</h2>
          </div>
          <ul>
            {copy.protocol.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.cta} aria-labelledby="entry-cta-title">
          <p className={styles.darkEyebrow}>{copy.cta.eyebrow}</p>
          <div>
            <h2 id="entry-cta-title">{copy.cta.title}</h2>
            <div>
              <p>{copy.cta.body}</p>
              <GuideCtaLink href={plannerHref} guideId="china-entry-requirements" locale={language}>
                {copy.cta.action}
                <ArrowRight aria-hidden="true" size={18} />
              </GuideCtaLink>
            </div>
          </div>
        </section>
      </main>

      {footer}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
    </div>
  );
}
