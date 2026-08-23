import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  getHomegroundLegalCopy,
  getHomegroundLegalPath,
  homegroundLegalPageIds,
  type HomegroundLegalPageId,
} from "../lib/homegroundLegalI18n";
import {
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./HomegroundLegalPage.module.css";

const baseUrl = "https://homegroundchina.com";
const businessHeroLabels: Record<
  HomegroundLocale,
  { entity: string; code: string }
> = {
  en: {
    entity: "Registered entity",
    code: "Unified Social Credit Code",
  },
  zh: {
    entity: "登记主体",
    code: "统一社会信用代码",
  },
  ko: {
    entity: "등록 사업자",
    code: "통일사회신용코드",
  },
};

export function HomegroundLegalPage({
  locale = "en",
  pageId,
}: {
  locale?: HomegroundLocale;
  pageId: HomegroundLegalPageId;
}) {
  const copy = getHomegroundLegalCopy(pageId, locale);
  const privacyPath =
    locale === "en" ? "/privacy/" : `/${locale}/privacy/`;
  const languagePaths = {
    en: getHomegroundLegalCopy(pageId, "en").pagePath,
    zh: getHomegroundLegalCopy(pageId, "zh").pagePath,
    ko: getHomegroundLegalCopy(pageId, "ko").pagePath,
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": pageId === "business-information" ? "AboutPage" : "WebPage",
    "@id": `${baseUrl}${copy.pagePath}#webpage`,
    url: `${baseUrl}${copy.pagePath}`,
    name: copy.metadata.title,
    description: copy.metadata.description,
    inLanguage: copy.htmlLang,
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
    about:
      pageId === "business-information"
        ? { "@id": `${baseUrl}/#organization` }
        : undefined,
  };

  return (
    <div
      className={styles.localeRoot}
      data-legal-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={styles.skipLink} href="#legal-content">
        {copy.skipLink}
      </a>

      <HomegroundHeader
        languagePaths={languagePaths}
        locale={locale}
        pageContext="content"
      />

      <main id="legal-content">
        <section className={styles.hero} aria-labelledby="legal-title">
          <div>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 id="legal-title">{copy.hero.title}</h1>
            <p className={styles.heroIntro}>{copy.hero.intro}</p>
            {pageId === "business-information" ? (
              <dl className={styles.heroIdentity}>
                <div>
                  <dt>{businessHeroLabels[locale].entity}</dt>
                  <dd lang="zh-Hans">
                    {homegroundBusiness.registeredName}
                  </dd>
                </div>
                <div>
                  <dt>{businessHeroLabels[locale].code}</dt>
                  <dd>{homegroundBusiness.unifiedSocialCreditCode}</dd>
                </div>
              </dl>
            ) : null}
            <p className={styles.reviewed}>
              <span>{copy.hero.reviewedLabel}</span>
              <strong>{copy.hero.reviewedValue}</strong>
            </p>
          </div>

          {copy.callout ? (
            <aside className={styles.callout}>
              <p className={styles.calloutLabel}>{copy.callout.label}</p>
              <h2>{copy.callout.title}</h2>
              <p>{copy.callout.body}</p>
            </aside>
          ) : null}
        </section>

        <article className={styles.article}>
          {copy.sections.map((section) => (
            <section
              className={styles.section}
              id={section.id}
              key={section.id}
              aria-labelledby={`${section.id}-title`}
            >
              <h2 id={`${section.id}-title`}>{section.title}</h2>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {section.facts ? (
                <dl className={styles.factList}>
                  {section.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>
                        {fact.href ? (
                          <a
                            href={fact.href}
                            rel={
                              fact.external
                                ? "noreferrer noopener"
                                : undefined
                            }
                            target={fact.external ? "_blank" : undefined}
                          >
                            <strong>{fact.value}</strong>
                            {fact.external ? (
                              <ArrowUpRight aria-hidden="true" size={16} />
                            ) : null}
                          </a>
                        ) : (
                          <strong>{fact.value}</strong>
                        )}
                        {fact.detail ? <p>{fact.detail}</p> : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {section.cards ? (
                <div className={styles.cardGrid}>
                  {section.cards.map((card) => (
                    <article className={styles.card} key={card.title}>
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                    </article>
                  ))}
                </div>
              ) : null}

              {section.bullets ? (
                <ul className={styles.list}>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {section.numbered ? (
                <ol className={styles.steps}>
                  {section.numbered.map((item, index) => (
                    <li key={item}>
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p>{item}</p>
                    </li>
                  ))}
                </ol>
              ) : null}
            </section>
          ))}

          <nav className={styles.related} aria-label={copy.relatedLabel}>
            <p>{copy.relatedLabel}</p>
            <div>
              {homegroundLegalPageIds.map((targetPageId) => {
                const label =
                  targetPageId === "business-information"
                    ? copy.related.business
                    : targetPageId === "terms"
                      ? copy.related.terms
                      : copy.related.refund;
                return targetPageId === pageId ? (
                  <span aria-current="page" key={targetPageId}>
                    {label}
                  </span>
                ) : (
                  <Link
                    href={getHomegroundLegalPath(targetPageId, locale)}
                    key={targetPageId}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link href={privacyPath}>{copy.related.privacy}</Link>
              <a href="mailto:yangchunxuan1@gmail.com">
                {copy.related.contact}
              </a>
            </div>
          </nav>
        </article>
      </main>

      <HomegroundFooter locale={locale} pageContext="content" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
