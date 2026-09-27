import { ArrowUpRight } from "lucide-react";
import { homegroundLegalPageIds, type HomegroundLegalPageId } from "../lib/homegroundLegalI18n";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { getJapaneseLegalCopy } from "../lib/japaneseLegalCopy";
import { japaneseLanguagePaths, japaneseSite } from "../lib/japaneseSite";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import styles from "./HomegroundLegalPage.module.css";
import { KeepWords } from "./text/KeepWords";

const baseUrl = "https://homegroundchina.com";

// Registered names, the address and registry names are shown in their official Chinese form.
const chineseFactValues = new Set<string>([
  homegroundBusiness.registeredName,
  homegroundBusiness.legalRepresentative,
  homegroundBusiness.registeredAddress,
  homegroundBusiness.registrationAuthority,
  "国家企业信用信息公示系统",
  "全国旅游监管服务平台",
]);

function factLang(value: string) {
  if (chineseFactValues.has(value)) return "zh-Hans";
  if (value === homegroundBusiness.englishName) return "en";
  return undefined;
}

/** Same layout as the English legal pages, with Japanese copy and navigation. */
export function JapaneseLegalPage({ pageId }: { pageId: HomegroundLegalPageId }) {
  const copy = getJapaneseLegalCopy(pageId);
  const schema = {
    "@context": "https://schema.org",
    "@type": pageId === "business-information" ? "AboutPage" : "WebPage",
    "@id": `${baseUrl}${copy.pagePath}#webpage`,
    url: `${baseUrl}${copy.pagePath}`,
    name: copy.metadata.title,
    description: copy.metadata.description,
    inLanguage: "ja",
    isPartOf: { "@id": `${baseUrl}/#website` },
    about:
      pageId === "business-information"
        ? { "@id": `${baseUrl}/#organization` }
        : undefined,
  };

  return (
    <div className={styles.localeRoot} data-legal-locale="ja" lang="ja">
      <a className={styles.skipLink} href="#legal-content">
        {copy.skipLink}
      </a>

      <JapaneseSiteHeader
        contactHref={japaneseSite.contact}
        currentPath={copy.pagePath}
        languagePaths={japaneseLanguagePaths(`/${pageId}/`, copy.pagePath)}
      />

      <main id="legal-content">
        <section className={styles.hero} aria-labelledby="legal-title">
          <div>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 id="legal-title"><KeepWords locale="ja" text={copy.hero.title} /></h1>
            <p className={styles.heroIntro}>{copy.hero.intro}</p>
            {pageId === "business-information" ? (
              <dl className={styles.heroIdentity}>
                <div>
                  <dt>登記上の事業者</dt>
                  <dd lang="zh-Hans">{homegroundBusiness.registeredName}</dd>
                </div>
                <div>
                  <dt>統一社会信用コード</dt>
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
              <h2><KeepWords locale="ja" text={copy.callout.title} /></h2>
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
              <h2 id={`${section.id}-title`}><KeepWords locale="ja" text={section.title} /></h2>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {section.facts ? (
                <dl className={styles.factList}>
                  {section.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt><KeepWords locale="ja" text={fact.label} /></dt>
                      <dd>
                        {fact.href ? (
                          <a
                            href={fact.href}
                            rel={fact.external ? "noreferrer noopener" : undefined}
                            target={fact.external ? "_blank" : undefined}
                          >
                            <strong lang={factLang(fact.value)}>{fact.value}</strong>
                            {fact.external ? <ArrowUpRight aria-hidden="true" size={16} /> : null}
                          </a>
                        ) : (
                          <strong lang={factLang(fact.value)}>{fact.value}</strong>
                        )}
                        {fact.detail ? <p lang={factLang(fact.detail)}>{fact.detail}</p> : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {section.cards ? (
                <div className={styles.cardGrid}>
                  {section.cards.map((card) => (
                    <article className={styles.card} key={card.title}>
                      <h3><KeepWords locale="ja" text={card.title} /></h3>
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
                      <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
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
                  <a href={`/ja/${targetPageId}/`} key={targetPageId}>
                    {label}
                  </a>
                );
              })}
              <a href={japaneseSite.privacy}>{copy.related.privacy}</a>
              <a href={`mailto:${homegroundBusiness.serviceEmail}`}>{copy.related.contact}</a>
            </div>
          </nav>
        </article>
      </main>

      <JapaneseSiteFooter currentPath={copy.pagePath} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
