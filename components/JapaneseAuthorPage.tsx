import Image from "next/image";
import Link from "next/link";
import {
  EDITORIAL_PERSON_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialPersonSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import { jaPilot } from "../lib/jaPilot";
import { jaPilotCopy } from "../lib/jaPilotCopy";
import {
  japaneseAuthorComponentStrings as strings,
  japaneseEditorialAuthor as author,
} from "../lib/japaneseAuthorCopy";
import { japaneseLanguagePaths, japaneseSite } from "../lib/japaneseSite";
import { EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT } from "../lib/legacySystemContentLifecycle";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import localeStyles from "./LocaleRoot.module.css";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";
import styles from "./EditorialAuthorPage.module.css";
import { KeepWords } from "./text/KeepWords";

const SITE_URL = "https://homegroundchina.com";

// Only one guide has a Japanese version so far; the rest are listed on the
// English, Chinese and Korean profiles.
const japaneseGuides = [
  {
    path: jaPilot.guide,
    headline: jaPilotCopy.guide.title,
    description: "上海から杭州へ日帰りか宿泊か。上海虹橋・上海駅と杭州の到着駅を、ホテルから観光地までの移動を含めて比べます。",
    image: "/images/guides/shanghai-hangzhou-transport-route/hero-1600.webp",
    imageAlt: "杭州東駅の構内",
    width: 1600,
    height: 1000,
  },
];

/** Evan's author page in Japanese: same layout as the English profile. */
export function JapaneseAuthorPage() {
  const canonicalUrl = `${SITE_URL}${author.path}`;
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
        inLanguage: "ja",
        dateModified: EDITORIAL_AUTHOR_PROFILE_MODIFIED_AT,
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        mainEntity: { "@id": EDITORIAL_PERSON_ID },
      },
    ],
  };

  return (
    <div
      className={`${localeStyles.root} hg-locale-root ${styles.page}`}
      data-homeground-locale="ja"
      lang="ja"
    >
      <a className={localeStyles.skipLink} href="#author-main">{strings.skipLink}</a>
      <JapaneseSiteHeader
        contactHref={japaneseSite.contact}
        currentPath={author.path}
        languagePaths={japaneseLanguagePaths("/studio/evan/", author.path)}
      />
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
            <h1><AnimatedHeadline locale="ja" text={author.copy.h1} /></h1>
            <p className={styles.role}>{author.role}</p>
            <p className={styles.intro}><KeepWords locale="ja" text={author.copy.introduction} /></p>
            <p>{author.bio}</p>
          </div>
        </header>

        <section className={styles.method} aria-labelledby="author-method-title">
          <div>
            <p className={styles.eyebrow}>{strings.methodEyebrow}</p>
            <h2 id="author-method-title"><KeepWords locale="ja" text={author.copy.methodTitle} /></h2>
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
          <h2 id="author-focus-title"><KeepWords locale="ja" text={author.copy.focusTitle} /></h2>
          <ul>{author.copy.focus.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className={styles.articles} aria-labelledby="author-articles-title">
          <div className={styles.articlesHeading}>
            <h2 id="author-articles-title"><KeepWords locale="ja" text={author.copy.articlesTitle} /></h2>
            <Link href={strings.studioHref}>
              {author.copy.studioLink}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul>
            {japaneseGuides.map((article) => (
              <li key={article.path}>
                <Link href={article.path}>
                  <span className={styles.articleCopy}>
                    <span><KeepWords locale="ja" text={article.headline} /></span>
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
            日本語で読めるガイドは、現在この1本です。ほかのガイドは英語・中国語・韓国語で公開しています。{" "}
            <a href="/studio/evan/" hrefLang="en" style={{ whiteSpace: "nowrap" }}>プロフィール（英語）</a>
          </p>
        </section>
      </main>
      <JapaneseSiteFooter currentPath={author.path} />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} type="application/ld+json" />
    </div>
  );
}
