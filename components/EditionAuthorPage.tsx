import Image from "next/image";
import Link from "next/link";
import { getEditionEditorialAuthor } from "../lib/editionAuthor";
import { ENGLISH_AUTHOR_PATH, editionAuthorComponentStrings, type EditionAuthorLanguage } from "../lib/editionAuthorCopy";
import {
  EDITORIAL_PERSON_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialPersonSchema,
  editorialWebsiteSchema,
  getEditorialAuthorLanguagePaths,
} from "../lib/editorialIdentity";
import { getGuideEntry, type GuideId } from "../lib/guideRegistry";
import { EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT } from "../lib/legacySystemContentLifecycle";
import { reservationGuideEditionPath, reservationGuideEditionSlugs } from "../lib/reservationGuideEditionPaths";
import { getReservationGuideEdition } from "../lib/reservationGuideEditions";
import { ArabicSiteFooter, ArabicSiteHeader } from "./ArabicChrome";
import { FrenchSiteFooter, FrenchSiteHeader } from "./FrenchChrome";
import { GermanSiteFooter, GermanSiteHeader } from "./GermanChrome";
import localeStyles from "./LocaleRoot.module.css";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";
import { SpanishSiteFooter, SpanishSiteHeader } from "./SpanishChrome";
import styles from "./EditorialAuthorPage.module.css";

const SITE_URL = "https://homegroundchina.com";
const languageLabels: Record<string, string> = { en: "EN", "zh-Hans": "中文", ko: "한국어", ja: "日本語", fr: "FR", es: "ES", de: "DE", ar: "العربية" };

/**
 * The guides published in this language, newest first by their English
 * source, as the English profile lists its six most recent guides.
 */
function editionGuides(language: EditionAuthorLanguage) {
  return reservationGuideEditionSlugs
    .map((slug) => {
      const guide = getReservationGuideEdition(language, slug);
      if (!guide) throw new Error(`Missing guide ${language}/${slug}`);
      const source = getGuideEntry(slug as GuideId, "en");
      return {
        path: reservationGuideEditionPath(language, slug),
        headline: guide.headline,
        description: guide.description,
        image: source.heroImagePath,
        imageAlt: guide.heroAlt,
        width: source.imageWidth,
        height: source.imageHeight,
        dateModified: source.dateModified,
      };
    })
    .sort((a, b) => b.dateModified.localeCompare(a.dateModified))
    .slice(0, 6);
}

/** Evan's author page in French, German, Spanish or Arabic: same layout as the English profile. */
export function EditionAuthorPage({ language }: { language: EditionAuthorLanguage }) {
  const author = getEditionEditorialAuthor(language);
  const strings = editionAuthorComponentStrings[language];
  const guides = editionGuides(language);
  const canonicalUrl = `${SITE_URL}${author.path}`;
  const languagePaths = Object.entries(getEditorialAuthorLanguagePaths()).map(([lang, path]) => ({ lang, path, label: languageLabels[lang] }));
  const headerProps = { currentPath: author.path, languagePaths };
  const header = language === "fr" ? <FrenchSiteHeader {...headerProps} />
    : language === "de" ? <GermanSiteHeader {...headerProps} />
      : language === "es" ? <SpanishSiteHeader {...headerProps} />
        : <ArabicSiteHeader {...headerProps} />;
  const footer = language === "fr" ? <FrenchSiteFooter currentPath={author.path} />
    : language === "de" ? <GermanSiteFooter currentPath={author.path} />
      : language === "es" ? <SpanishSiteFooter currentPath={author.path} />
        : <ArabicSiteFooter currentPath={author.path} />;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      editorialPersonSchema("en"),
      {
        "@type": "ProfilePage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: author.copy.title,
        description: author.copy.introduction,
        inLanguage: strings.htmlLang,
        dateModified: EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT,
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        mainEntity: { "@id": EDITORIAL_PERSON_ID },
      },
    ],
  };

  return (
    <div
      className={`${localeStyles.root} hg-locale-root ${styles.page}`}
      data-homeground-locale={language}
      dir={strings.dir}
      lang={strings.htmlLang}
    >
      <a className={localeStyles.skipLink} href="#author-main">{strings.skipLink}</a>
      {header}
      <main id="author-main" tabIndex={-1}>
        <header className={styles.hero}>
          <div className={styles.portrait}>
            <Image
              alt={author.image.alt}
              height={author.image.height}
              priority
              sizes="(max-width: 760px) 42vw, 340px"
              src={author.image.src}
              width={author.image.width}
            />
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{author.copy.eyebrow}</p>
            <h1><AnimatedHeadline locale="en" text={author.copy.h1} /></h1>
            <p className={styles.role}>{author.role}</p>
            <p className={styles.intro}>{author.copy.introduction}</p>
            <p>{author.bio}</p>
          </div>
        </header>

        <section className={styles.method} aria-labelledby="author-method-title">
          <div>
            <p className={styles.eyebrow}>{strings.methodEyebrow}</p>
            <h2 id="author-method-title">{author.copy.methodTitle}</h2>
          </div>
          <ol>
            {author.copy.method.map((item, index) => (
              <li key={item}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.focus} aria-labelledby="author-focus-title">
          <h2 id="author-focus-title">{author.copy.focusTitle}</h2>
          <ul>{author.copy.focus.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className={styles.articles} aria-labelledby="author-articles-title">
          <div className={styles.articlesHeading}>
            <h2 id="author-articles-title">{author.copy.articlesTitle}</h2>
            <Link href={strings.studioHref}>
              {author.copy.studioLink}
              <span aria-hidden="true">{strings.arrow}</span>
            </Link>
          </div>
          <ul>
            {guides.map((article) => (
              <li key={article.path}>
                <Link href={article.path}>
                  <span className={styles.articleCopy}>
                    <span>{article.headline}</span>
                    <small>{article.description}</small>
                  </span>
                  <span className={styles.articleImage}>
                    <Image
                      alt={article.imageAlt}
                      height={article.height}
                      loading="lazy"
                      sizes="(max-width: 760px) 6rem, 8rem"
                      src={article.image}
                      width={article.width}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p>
            {strings.otherGuidesNote}{" "}
            <a href={ENGLISH_AUTHOR_PATH} hrefLang="en">{strings.englishProfileLabel}</a>
          </p>
        </section>
      </main>
      {footer}
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </div>
  );
}
