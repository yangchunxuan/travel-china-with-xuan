import Image from "next/image";
import Link from "next/link";
import {
  EDITORIAL_PERSON_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialPersonSchema,
  editorialWebsiteSchema,
  getEditorialAuthor,
  getEditorialAuthorLanguagePaths,
} from "../lib/editorialIdentity";
import { getGuideEntry, guideRegistry } from "../lib/guideRegistry";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT } from "../lib/legacySystemContentLifecycle";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";
import { KeepWords } from "./text/KeepWords";
import styles from "./EditorialAuthorPage.module.css";

const SITE_URL = "https://homegroundchina.com";

export function EditorialAuthorPage({ locale = "en" }: { locale?: HomegroundLocale }) {
  const home = getHomegroundCopy(locale);
  const author = getEditorialAuthor(locale);
  const recent = [...guideRegistry]
    .filter((guide) => Boolean(guide.locales[locale]))
    .sort((a, b) => b.dateModified.localeCompare(a.dateModified))
    .slice(0, 6)
    .map((guide) => getGuideEntry(guide.id, locale));
  const canonicalUrl = `${SITE_URL}${author.path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      editorialPersonSchema(locale),
      {
        "@type": "ProfilePage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: author.copy.title,
        description: author.copy.introduction,
        inLanguage: home.htmlLang,
        dateModified: EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT,
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        mainEntity: { "@id": EDITORIAL_PERSON_ID },
      },
    ],
  };

  return (
    <div
      className={`${localeStyles.root} hg-locale-root ${styles.page}`}
      data-homeground-locale={locale}
      lang={home.htmlLang}
    >
      <a className={localeStyles.skipLink} href="#author-main">{home.skipLink}</a>
      <HomegroundHeader languagePaths={getEditorialAuthorLanguagePaths()} locale={locale} pageContext="guides" />
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
            <h1><AnimatedHeadline locale={locale} text={author.copy.h1} /></h1>
            <p className={styles.role}>{author.role}</p>
            <p className={styles.intro}>{author.copy.introduction}</p>
            <p>{author.bio}</p>
          </div>
        </header>

        <section className={styles.method} aria-labelledby="author-method-title">
          <div>
            <p className={styles.eyebrow}>Homeground editorial</p>
            <h2 id="author-method-title"><KeepWords locale={locale} text={author.copy.methodTitle} /></h2>
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
          <h2 id="author-focus-title"><KeepWords locale={locale} text={author.copy.focusTitle} /></h2>
          <ul>{author.copy.focus.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className={styles.articles} aria-labelledby="author-articles-title">
          <div className={styles.articlesHeading}>
            <h2 id="author-articles-title"><KeepWords locale={locale} text={author.copy.articlesTitle} /></h2>
            <Link href={`${home.path}studio/`}>
              {author.copy.studioLink}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul>
            {recent.map((article) => (
              <li key={article.path}>
                <Link href={article.path}>
                  <span className={styles.articleCopy}>
                    <span>{article.headline}</span>
                    <small>{article.description}</small>
                  </span>
                  <span className={styles.articleImage}>
                    <Image
                      alt={article.cardImageAlt}
                      height={article.cardImageHeight}
                      loading="lazy"
                      sizes="(max-width: 760px) 6rem, 8rem"
                      src={article.cardImagePath}
                      width={article.cardImageWidth}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <HomegroundFooter locale={locale} pageContext="guides" />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </div>
  );
}
