import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGuideAvailableLocales, getGuideEntry, getGuidesByPillar } from "../lib/guideRegistry";
import {
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import { entryRequirementsEditionCopy } from "../lib/entryRequirementsEditions";
import {
  entryRequirementsAlternates,
  entryRequirementsEditionPath,
  type EntryRequirementsPageLocale,
} from "../lib/entryRequirementsEditionPaths";
import { entryRequirementsGuideIds, type EntryRequirementsGuideId } from "../lib/entryRequirementsEditionTypes";
import { serviceEditionPaths } from "../lib/serviceEdition";
import { ArabicSiteFooter, ArabicSiteHeader } from "./ArabicChrome";
import { FrenchSiteFooter, FrenchSiteHeader } from "./FrenchChrome";
import { GermanSiteFooter, GermanSiteHeader } from "./GermanChrome";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import { SpanishSiteFooter, SpanishSiteHeader } from "./SpanishChrome";
import { GuideCtaLink } from "./GuideCtaLink";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import styles from "./ChinaEntryGuidesPage.module.css";
import editionStyles from "./ChinaEntryGuidesEditionPage.module.css";

const SITE_URL = "https://homegroundchina.com";
const languageLabels = { en: "EN", "zh-Hans": "中文", ko: "한국어", ja: "日本語", fr: "FR", es: "ES", de: "DE", ar: "العربية" } as const;

function isListedGuide(id: string): id is EntryRequirementsGuideId {
  return (entryRequirementsGuideIds as readonly string[]).includes(id);
}

/**
 * A full translation of the English entry hub (ChinaEntryGuidesPage), in the
 * same section order. The editions sit inside their own header and footer and
 * their guide cards open the English guides, so each says so in its action
 * label. Chinese and Korean use the main site's header and footer, and a card
 * opens the guide in that language when it is published there.
 */
export function ChinaEntryGuidesEditionPage({ language }: { language: EntryRequirementsPageLocale }) {
  const copy = entryRequirementsEditionCopy[language];
  const path = entryRequirementsEditionPath(language);
  const pageUrl = `${SITE_URL}${path}`;
  const localized = language === "zh" || language === "ko" ? language : null;
  const editionPaths = language === "zh" || language === "ko"
    ? { home: `/${language}/`, guides: `/${language}/guides/` }
    : serviceEditionPaths(language);
  const plannerHref = localized
    // The English hub's planner link, in the page's language.
    ? `/${localized}/?utm_source=china-entry-guides&utm_medium=owned&utm_campaign=trip-conversation&utm_content=entry-hub-cta&planner=destinations#route-finder`
    : `${editionPaths.home}?utm_source=china-entry-guides&utm_medium=owned&utm_campaign=trip-conversation&utm_content=entry-hub-cta#planner-contact`;
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
    const local = localized && getGuideAvailableLocales(guide.id).includes(localized) ? getGuideEntry(guide.id, localized) : null;
    const card = copy.guides[guide.id];
    return {
      guide,
      card: local ? { ...card, headline: local.headline, description: local.description } : card,
      href: local?.canonicalPath ?? guide.canonicalPath,
      url: local?.canonicalUrl ?? guide.canonicalUrl,
      inLanguage: local ? language : "en",
      action: local ? copy.collection.readGuide ?? copy.collection.readEnglishGuide : copy.collection.readEnglishGuide,
    };
  });
  const latestReview = guides
    .map(({ guide }) => guide.sourceReviewedDate)
    .sort()
    .at(-1);

  const alternates = entryRequirementsAlternates();
  const languagePaths = (["en", "zh-Hans", "ko", "ja", "fr", "es", "de", "ar"] as const).map((lang) => ({
    lang,
    label: languageLabels[lang],
    path: alternates[lang],
  }));
  const headerProps = { currentPath: path, languagePaths };
  const header =
    localized ? (
      <HomegroundHeader
        locale={localized}
        pageContext="guides"
        languagePaths={{
          en: alternates.en,
          zh: alternates["zh-Hans"],
          ko: alternates.ko,
          ja: alternates.ja,
          es: alternates.es,
          fr: alternates.fr,
          de: alternates.de,
          ar: alternates.ar,
        }}
      />
    ) : language === "ja" ? <JapaneseSiteHeader {...headerProps} contactHref="/ja/#planner-contact" />
      : language === "fr" ? <FrenchSiteHeader {...headerProps} />
        : language === "es" ? <SpanishSiteHeader {...headerProps} />
          : language === "de" ? <GermanSiteHeader {...headerProps} />
            : <ArabicSiteHeader {...headerProps} />;
  const footer =
    localized ? <HomegroundFooter locale={localized} pageContext="guides" />
      : language === "ja" ? <JapaneseSiteFooter currentPath={path} />
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
        inLanguage: language === "zh" ? "zh-Hans" : language,
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        mainEntity: { "@id": `${pageUrl}#guide-list` },
      },
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#guide-list`,
        numberOfItems: guides.length,
        itemListElement: guides.map(({ guide, card, url, inLanguage }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: card.headline,
          url,
          item: {
            "@type": "Article",
            "@id": `${url}#article`,
            dateModified: guide.dateModified,
            inLanguage,
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
      lang={language === "zh" ? "zh-Hans" : language}
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
            {guides.map(({ guide, card, href, inLanguage, action }, index) => {
              const [beforeDate, afterDate = ""] = copy.collection.checked.split("{date}");
              return (
                <li key={guide.id}>
                  <article>
                    <Link href={href} hrefLang={inLanguage === "zh" ? "zh-Hans" : inLanguage}>
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
                          {action}
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
