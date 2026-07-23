import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  Languages,
  MapPinned,
  MoonStar,
  Route,
} from "lucide-react";
import { getGuideEntry } from "../lib/guideRegistry";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  getNightShowSource,
  NIGHT_SHOW_GUIDE_SOURCES,
  type NightShowSourceId,
} from "../lib/nightShowGuide";
import { getNightShowGuideCopy } from "../lib/nightShowGuideCopy";
import type { NightShowGuideCopy } from "../lib/nightShowGuideCopy.types";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./NightShowGuidePage.module.css";

const guideId = "best-zhangjiajie-night-show" as const;
const assetPath = "/images/guides/best-zhangjiajie-night-show";

const guideHubLabels: Record<HomegroundLocale, string> = {
  en: "Travel guides",
  zh: "旅行指南",
  ko: "여행 가이드",
};

function guideHubPath(locale: HomegroundLocale) {
  return locale === "en" ? "/guides/" : `/${locale}/guides/`;
}

const decisionIcons = [MapPinned, MoonStar, Clock3] as const;
const checklistIcons = [Clock3, MapPinned, Route, Languages] as const;

function SourceRef({
  id,
  label,
}: {
  id: NightShowSourceId;
  label: string;
}) {
  const sourceNumber =
    NIGHT_SHOW_GUIDE_SOURCES.findIndex((source) => source.id === id) + 1;

  return (
    <sup className={styles.sourceRef}>
      <a href={`#source-${id}`} aria-label={`[${sourceNumber}] ${label}`}>
        [{sourceNumber}]
      </a>
    </sup>
  );
}

function HeroTitle({
  title,
  noBreak,
}: {
  title: string;
  noBreak?: string;
}) {
  if (!noBreak || !title.includes(noBreak)) return title;

  const [before, after] = title.split(noBreak, 2);
  return (
    <>
      {before}
      <span className={styles.noBreak}>{noBreak}</span>
      {after}
    </>
  );
}

function createStructuredData(
  locale: HomegroundLocale,
  copy: NightShowGuideCopy,
) {
  const guide = getGuideEntry(guideId, locale);

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
          width: 1536,
          height: 1024,
          caption: copy.hero.figureCaption,
        },
        author: { "@id": "https://homegroundchina.com/#organization" },
        publisher: { "@id": "https://homegroundchina.com/#organization" },
        about: {
          "@type": "Thing",
          name: copy.structuredData.aboutName,
        },
        mentions: copy.structuredData.mentions.map((name) => ({
          "@type": "Thing",
          name,
        })),
        citation: NIGHT_SHOW_GUIDE_SOURCES.map((source, index) => ({
          "@type": "WebPage",
          name: copy.research.sourceNames[index],
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
            name: copy.structuredData.homeName,
            item: `https://homegroundchina.com${copy.homePath}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: guideHubLabels[locale],
            item: `https://homegroundchina.com${guideHubPath(locale)}`,
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

function ComparisonTable({ copy }: { copy: NightShowGuideCopy["comparison"] }) {
  const rows = [
    { label: copy.rowLabels.format, key: "format" as const },
    { label: copy.rowLabels.base, key: "base" as const },
    { label: copy.rowLabels.chooseFor, key: "chooseFor" as const },
    { label: copy.rowLabels.mainRisk, key: "mainRisk" as const },
  ];

  return (
    <div className={styles.tableScroller} tabIndex={0} role="region" aria-label={copy.title}>
      <table className={styles.comparisonTable}>
        <thead>
          <tr>
            <th scope="col" />
            {copy.shows.map((show) => (
              <th scope="col" key={show.name}>{show.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <th scope="row">{row.label}</th>
              {copy.shows.map((show) => (
                <td key={`${show.name}-${row.key}`}>{show[row.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function NightShowGuidePage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getNightShowGuideCopy(locale);
  const guide = getGuideEntry(guideId, locale);
  const zhangjiajieGuide = getGuideEntry("zhangjiajie-itinerary", locale);
  const tenDayGuide = getGuideEntry(
    "beijing-zhangjiajie-shanghai-10-days",
    locale,
  );
  const plannerHref = `${copy.homePath}?planner=destinations&destinations=zhangjiajie#route-finder`;
  const structuredData = createStructuredData(locale, copy);
  const structuredDataJson = JSON.stringify(structuredData).replaceAll("<", "\\u003c");

  return (
    <div
      className={styles.pageRoot}
      data-homeground-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={styles.skipLink} href="#article-content">{copy.skipLink}</a>

      <HomegroundHeader
        locale={locale}
        pageContext="guide"
        guideId={guideId}
      />

      <main id="article-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroInner}>
              <nav className={styles.breadcrumb} aria-label={copy.breadcrumbLabel}>
                <ol>
                  <li><Link href={copy.homePath}>{copy.breadcrumbHome}</Link></li>
                  <li>
                    <Link href={guideHubPath(locale)}>
                      {guideHubLabels[locale]}
                    </Link>
                  </li>
                  <li aria-current="page">{copy.breadcrumbCurrent}</li>
                </ol>
              </nav>

              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
                  <h1>
                    <HeroTitle
                      title={copy.hero.title}
                      noBreak={copy.hero.titleNoBreak}
                    />
                  </h1>
                  <p className={styles.heroLead}>{copy.hero.lead}</p>

                  <section className={styles.quickAnswer} id="quick-answer" aria-labelledby="quick-answer-title">
                    <p>{copy.hero.quickLabel}</p>
                    <h2 id="quick-answer-title">{copy.hero.quickTitle}</h2>
                    <p>{copy.hero.quickBody}</p>
                  </section>

                  <p className={styles.checkedLine}>
                    <span>{copy.hero.checkedLabel}</span>
                    <time dateTime={guide.sourceReviewedDate}>{copy.hero.checkedDate}</time>
                  </p>
                </div>

                <figure className={styles.heroFigure}>
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${assetPath}/night-show-decision-768.webp 768w, ${assetPath}/night-show-decision-1200.webp 1200w, ${assetPath}/night-show-decision-1536.webp 1536w`}
                      sizes="(max-width: 56rem) calc(100vw - 2rem), 42rem"
                    />
                    <img
                      src={`${assetPath}/night-show-decision-1536.jpg`}
                      alt={copy.hero.figureAlt}
                      width="1536"
                      height="1024"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </picture>
                  <figcaption>{copy.hero.figureCaption}</figcaption>
                </figure>
              </div>

              <ol className={styles.decisionStrip} aria-label={copy.hero.quickTitle}>
                {copy.decisions.map((decision, index) => {
                  const Icon = decisionIcons[index];
                  return (
                    <li key={decision.label}>
                      <Icon aria-hidden="true" size={20} />
                      <div>
                        <span>{decision.label}</span>
                        <strong>{decision.title}</strong>
                        <p>{decision.detail}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </header>

          <div className={styles.articleBody}>
            <section id="comparison" aria-labelledby="comparison-title">
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>{copy.comparison.sectionLabel}</p>
                  <h2 id="comparison-title">{copy.comparison.title}</h2>
                </div>
                <p>{copy.comparison.intro}</p>
              </div>
              <ComparisonTable copy={copy.comparison} />
              <p className={styles.boundaryNote}>{copy.comparison.boundary}</p>
            </section>

            <section className={styles.needSection} id="do-you-need-a-show" aria-labelledby="need-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.need.sectionLabel}</p>
                <h2 id="need-title">{copy.need.title}</h2>
                <p>{copy.need.intro}</p>
              </div>
              <div className={styles.skipPanel}>
                <div className={styles.skipLead}>
                  <MoonStar aria-hidden="true" size={26} />
                  <h3>{copy.need.skipTitle}</h3>
                </div>
                <ul>
                  {copy.need.skipPoints.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <p>{copy.need.conclusion}</p>
              </div>
            </section>

            <section id="whole-evening" aria-labelledby="whole-evening-title">
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>{copy.wholeEvening.sectionLabel}</p>
                  <h2 id="whole-evening-title">{copy.wholeEvening.title}</h2>
                </div>
                <p>{copy.wholeEvening.intro}</p>
              </div>
              <div className={styles.tableScroller} tabIndex={0} role="region" aria-label={copy.wholeEvening.title}>
                <table className={styles.eveningMatrix}>
                  <thead>
                    <tr>
                      <th scope="col">{copy.wholeEvening.columnLabels.setup}</th>
                      <th scope="col">{copy.wholeEvening.columnLabels.nextDay}</th>
                      <th scope="col">{copy.wholeEvening.columnLabels.judgement}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {copy.wholeEvening.rows.map((row) => (
                      <tr key={`${row.setup}-${row.nextDay}`}>
                        <th scope="row">{row.setup}</th>
                        <td>{row.nextDay}</td>
                        <td>{row.judgement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.keyInsight}>{copy.wholeEvening.insight}</p>
            </section>

            <section className={styles.hotelSection} id="hotel-base" aria-labelledby="hotel-base-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.hotelBase.sectionLabel}</p>
                <h2 id="hotel-base-title">{copy.hotelBase.title}</h2>
                <p>
                  {copy.hotelBase.introBeforeLink}
                  <Link href={`${zhangjiajieGuide.canonicalPath}#route-logic`}>
                    {copy.hotelBase.itineraryLink}
                  </Link>
                  {copy.hotelBase.introAfterLink}
                </p>
              </div>
              <figure className={styles.baseDiagram}>
                <div>
                  <span>01</span>
                  <h3>{copy.hotelBase.downtown.name}</h3>
                  <strong>{copy.hotelBase.downtown.role}</strong>
                  <p>{copy.hotelBase.downtown.detail}</p>
                </div>
                <div className={styles.baseConnector} aria-hidden="true">
                  <span />
                  <Route size={24} />
                  <span />
                </div>
                <div>
                  <span>02</span>
                  <h3>{copy.hotelBase.wulingyuan.name}</h3>
                  <strong>{copy.hotelBase.wulingyuan.role}</strong>
                  <p>{copy.hotelBase.wulingyuan.detail}</p>
                </div>
                <figcaption>
                  {copy.hotelBase.transfer}
                  <SourceRef id="hunan-transport" label={copy.research.sourceNames[0]} />
                </figcaption>
              </figure>
            </section>

            <section id="show-profiles" aria-labelledby="shows-title">
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>{copy.shows.sectionLabel}</p>
                  <h2 id="shows-title">{copy.shows.title}</h2>
                </div>
                <p>{copy.shows.intro}</p>
              </div>
              <div className={styles.showList}>
                {copy.shows.items.map((show) => (
                  <article className={styles.showProfile} id={show.id} key={show.id}>
                    <header>
                      <span>{show.number}</span>
                      <div>
                        <h3>{show.name}</h3>
                        <p>{show.format}</p>
                      </div>
                    </header>
                    <p className={styles.showDescription}>
                      {show.description}
                      {show.id === "tianmen-fox-fairy" && (
                        <>
                          <SourceRef id="fox-fairy-format" label={copy.research.sourceNames[1]} />
                          <SourceRef id="fox-fairy-2026" label={copy.research.sourceNames[2]} />
                          <SourceRef id="fox-fairy-2025" label={copy.research.sourceNames[3]} />
                        </>
                      )}
                      {show.id === "charming-xiangxi" && (
                        <SourceRef id="charming-xiangxi-2026" label={copy.research.sourceNames[4]} />
                      )}
                      {show.id === "eternal-love" && (
                        <SourceRef id="eternal-love-official" label={copy.research.sourceNames[5]} />
                      )}
                    </p>
                    <div className={styles.fitGrid}>
                      <section>
                        <h4>{copy.shows.bestFitLabel}</h4>
                        <ul>
                          {show.bestFit.map((item) => (
                            <li key={item}><Check aria-hidden="true" size={16} />{item}</li>
                          ))}
                        </ul>
                      </section>
                      <section>
                        <h4>{copy.shows.thinkTwiceLabel}</h4>
                        <ul>
                          {show.thinkTwice.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </section>
                    </div>
                    <dl className={styles.showNotes}>
                      <div>
                        <dt>{copy.shows.verifyLabel}</dt>
                        <dd>{show.verify}</dd>
                      </div>
                      <div>
                        <dt>{copy.shows.routeViewLabel}</dt>
                        <dd>{show.routeView}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>

            <aside className={styles.qilouAside} id="qilou" aria-labelledby="qilou-title">
              <div>
                <p className={styles.sectionLabel}>{copy.qilou.sectionLabel}</p>
                <h2 id="qilou-title">{copy.qilou.title}</h2>
              </div>
              <div>
                <p>{copy.qilou.body}</p>
                <p>{copy.qilou.note}</p>
              </div>
            </aside>

            <section className={styles.eveningSection} id="evening-calculation" aria-labelledby="calculation-title">
              <div className={styles.sectionHeadingSplitLight}>
                <div>
                  <p className={styles.sectionLabel}>{copy.evening.sectionLabel}</p>
                  <h2 id="calculation-title">{copy.evening.title}</h2>
                </div>
                <p>{copy.evening.intro}</p>
              </div>
              <ol className={styles.eveningChain}>
                {copy.evening.steps.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </li>
                ))}
              </ol>
              <div className={styles.formula}>
                <Clock3 aria-hidden="true" size={25} />
                <strong>{copy.evening.formula}</strong>
              </div>
              <p className={styles.calculationConclusion}>{copy.evening.conclusion}</p>

              <aside className={styles.midCta} aria-labelledby="mid-cta-title">
                <div>
                  <h3 id="mid-cta-title">{copy.evening.ctaTitle}</h3>
                  <p>{copy.evening.ctaBody}</p>
                  <small>{copy.evening.ctaNote}</small>
                </div>
                <Link href={plannerHref}>
                  {copy.evening.ctaAction}
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </aside>
            </section>

            <section id="live-checks" aria-labelledby="checklist-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.checklist.sectionLabel}</p>
                <h2 id="checklist-title">{copy.checklist.title}</h2>
                <p>{copy.checklist.intro}</p>
              </div>
              <ol className={styles.checklistGrid}>
                {copy.checklist.items.map((item, index) => {
                  const Icon = checklistIcons[index];
                  return (
                    <li key={item.number}>
                      <div><Icon aria-hidden="true" size={21} /><span>{item.number}</span></div>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                    </li>
                  );
                })}
              </ol>
              <p className={styles.handoffNote}>{copy.checklist.handoff}</p>
            </section>

            <nav className={styles.relatedGuides} aria-labelledby="related-title">
              <div>
                <p className={styles.sectionLabel}>{copy.related.label}</p>
                <h2 id="related-title">{copy.related.title}</h2>
                <p>{copy.related.body}</p>
              </div>
              <div>
                <Link href={zhangjiajieGuide.canonicalPath}>
                  {copy.related.itineraryAction}<ArrowRight aria-hidden="true" size={17} />
                </Link>
                <Link href={tenDayGuide.canonicalPath}>
                  {copy.related.routeAction}<ArrowRight aria-hidden="true" size={17} />
                </Link>
              </div>
            </nav>

            <section className={styles.faqSection} id="faq" aria-labelledby="guide-faq-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.faq.sectionLabel}</p>
                <h2 id="guide-faq-title">{copy.faq.title}</h2>
              </div>
              <div className={styles.faqList}>
                {copy.faq.items.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}<span aria-hidden="true">+</span></summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className={styles.sourcesSection} id="sources" aria-labelledby="sources-title">
              <h2 className={styles.visuallyHidden} id="sources-title">{copy.research.hiddenTitle}</h2>
              <details className={styles.sourceDisclosure}>
                <summary>
                  <span>
                    <strong>{copy.research.disclosureTitle}</strong>
                    <small>{copy.research.summary}</small>
                  </span>
                  <span aria-hidden="true">+</span>
                </summary>
                <div>
                  <p>{copy.research.intro}</p>
                  <p>{copy.research.boundary}</p>
                  <ol>
                    {NIGHT_SHOW_GUIDE_SOURCES.map((source, index) => (
                      <li id={`source-${source.id}`} key={source.id}>
                        <a href={getNightShowSource(source.id).url}>{copy.research.sourceNames[index]}</a>
                      </li>
                    ))}
                  </ol>
                </div>
              </details>
            </section>
          </div>

          <section className={styles.finalCta} aria-labelledby="final-cta-title">
            <div>
              <p className={styles.sectionLabel}>{copy.finalCta.sectionLabel}</p>
              <h2 id="final-cta-title">{copy.finalCta.title}</h2>
              <p>{copy.finalCta.body}</p>
              <small>{copy.finalCta.note}</small>
            </div>
            <Link href={plannerHref}>
              {copy.finalCta.action}<ArrowRight aria-hidden="true" size={18} />
            </Link>
          </section>
        </article>
      </main>

      <HomegroundFooter locale={locale} pageContext="guide" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />
    </div>
  );
}
