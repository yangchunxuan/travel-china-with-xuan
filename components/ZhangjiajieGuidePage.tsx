import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getGuideEntry } from "../lib/guideRegistry";
import {
  ZHANGJIAJIE_GUIDE_SOURCES,
} from "../lib/zhangjiajieGuide";
import {
  getZhangjiajieGuideCopy,
  type GuideTimelineStop,
  type ZhangjiajieGuideCopy,
} from "../lib/zhangjiajieGuideI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./ZhangjiajieGuidePage.module.css";

const nightShowRelatedCopy: Record<
  HomegroundLocale,
  { label: string; title: string; body: string; action: string }
> = {
  en: {
    label: "Planning an evening show?",
    title: "Choose it after the hotel base and next morning are clear.",
    body:
      "Compare Tianmen Fox Fairy, Charming Xiangxi and Eternal Love by the whole evening they create—not only the ticket or online rating.",
    action: "Compare Zhangjiajie night shows",
  },
  zh: {
    label: "准备安排夜间演出？",
    title: "先确定住宿区域和第二天安排，再选演出。",
    body:
      "把天门狐仙、魅力湘西和张家界千古情放进整个晚上比较，而不只看票价或网络评分。",
    action: "比较张家界三大夜间演出",
  },
  ko: {
    label: "야간 공연을 계획하시나요?",
    title: "숙소 지역과 다음 날 일정을 정한 뒤 공연을 고르세요.",
    body:
      "톈먼호선, 매력상서, 장자제 천고정을 입장권이나 평점이 아니라 저녁 전체 일정으로 비교합니다.",
    action: "장자제 야간 공연 비교하기",
  },
};

const transportRelatedCopy: Record<
  HomegroundLocale,
  { label: string; title: string; body: string }
> = {
  en: {
    label: "Planning the long transfers?",
    title: "Count the whole travel day, not only the timetable.",
    body:
      "Compare train and flight for Beijing → Zhangjiajie and Zhangjiajie → Shanghai, including station or airport access and arrival timing.",
  },
  zh: {
    label: "准备安排长距离转场？",
    title: "不要只看车程或飞行时间，要计算完整转场日。",
    body:
      "把进出车站或机场、候车和值机以及落地时间一起算入，对比北京 → 张家界和张家界 → 上海的高铁与飞机。",
  },
  ko: {
    label: "장거리 이동을 계획하시나요?",
    title: "시간표만 보지 말고 이동일 전체를 계산하세요.",
    body:
      "역·공항 접근과 대기, 도착 시각까지 포함해 베이징 → 장자제와 장자제 → 상하이 구간의 기차와 항공편을 비교합니다.",
  },
};

function Timeline({
  stops,
  headingLevel = 3,
  label,
  labels,
}: {
  stops: readonly GuideTimelineStop[];
  headingLevel?: 3 | 4;
  label: string;
  labels: ZhangjiajieGuideCopy["timelineLabels"];
}) {
  const Heading = headingLevel === 4 ? "h4" : "h3";

  return (
    <ol className={styles.timeline} aria-label={label} role="list">
      {stops.map((stop, index) => {
        const dayNumber = stop.day.match(/\d+/)?.[0] ?? String(index + 1);

        return (
          <li key={`${label}-${stop.day}-${stop.coreVisit}`}>
            <div className={styles.timelineMeta}>
              <span className={styles.timelineIndex} aria-hidden="true">
                {dayNumber.padStart(2, "0")}
              </span>
              <div className={styles.timelineKicker}>
                <span>{stop.day}</span>
                <small>{stop.zone}</small>
              </div>
            </div>
            <div className={styles.timelineContent}>
              <Heading>{stop.coreVisit}</Heading>
              <dl>
                <div>
                  <dt>{labels.sleepBase}</dt>
                  <dd>{stop.sleepBase}</dd>
                </div>
                <div>
                  <dt>{labels.planAround}</dt>
                  <dd>{stop.condition}</dd>
                </div>
              </dl>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function TianmenFigure({
  copy,
}: {
  copy: ZhangjiajieGuideCopy["figures"]["tianmen"];
}) {
  return (
    <figure className={`${styles.guideFigure} ${styles.tianmenFigure}`}>
      <picture>
        <source
          type="image/avif"
          srcSet="/images/guides/zhangjiajie/tianmen-480.avif 480w, /images/guides/zhangjiajie/tianmen-768.avif 768w, /images/guides/zhangjiajie/tianmen-1200.avif 1200w"
          sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1100px) calc(100vw - 4rem), 992px"
        />
        <source
          type="image/webp"
          srcSet="/images/guides/zhangjiajie/tianmen-480.webp 480w, /images/guides/zhangjiajie/tianmen-768.webp 768w, /images/guides/zhangjiajie/tianmen-1200.webp 1200w"
          sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1100px) calc(100vw - 4rem), 992px"
        />
        <img
          src="/images/guides/zhangjiajie/tianmen-1200.jpg"
          alt={copy.alt}
          width="1200"
          height="780"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <figcaption>
        <strong>{copy.title}</strong>
        <span>{copy.caption}</span>
      </figcaption>
    </figure>
  );
}

function FenghuangFigure({
  copy,
}: {
  copy: ZhangjiajieGuideCopy["figures"]["fenghuang"];
}) {
  return (
    <figure className={`${styles.guideFigure} ${styles.fenghuangFigure}`}>
      <picture>
        <source
          type="image/avif"
          srcSet="/images/guides/zhangjiajie/fenghuang-480.avif 480w, /images/guides/zhangjiajie/fenghuang-768.avif 768w, /images/guides/zhangjiajie/fenghuang-1200.avif 1200w"
          sizes="(max-width: 768px) calc(100vw - 3rem), 560px"
        />
        <source
          type="image/webp"
          srcSet="/images/guides/zhangjiajie/fenghuang-480.webp 480w, /images/guides/zhangjiajie/fenghuang-768.webp 768w, /images/guides/zhangjiajie/fenghuang-1200.webp 1200w"
          sizes="(max-width: 768px) calc(100vw - 3rem), 560px"
        />
        <img
          src="/images/guides/zhangjiajie/fenghuang-1200.jpg"
          alt={copy.alt}
          width="1200"
          height="620"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <figcaption>
        <strong>{copy.title}</strong>
        <span>{copy.caption}</span>
      </figcaption>
    </figure>
  );
}

function createStructuredData(
  locale: HomegroundLocale,
  copy: ZhangjiajieGuideCopy,
) {
  const guide = getGuideEntry("zhangjiajie-itinerary", locale);

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
        "@id": "https://homegroundchina.com/#xuan",
        name: "Xuan",
        worksFor: { "@id": "https://homegroundchina.com/#organization" },
      },
      {
        "@type": "Article",
        "@id": `${guide.canonicalUrl}#article`,
        url: guide.canonicalUrl,
        headline: guide.headline,
        description: guide.description,
        image: {
          "@type": "ImageObject",
          url: guide.heroImageUrl,
          width: 1600,
          height: 954,
        },
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: copy.htmlLang,
        mainEntityOfPage: guide.canonicalUrl,
        author: { "@id": "https://homegroundchina.com/#organization" },
        contributor: { "@id": "https://homegroundchina.com/#xuan" },
        publisher: { "@id": "https://homegroundchina.com/#organization" },
        citation: ZHANGJIAJIE_GUIDE_SOURCES.map((source, index) => ({
          "@type": "WebPage",
          name: copy.sources.names[index],
          url: source.url,
        })),
        about: {
          "@type": "Place",
          name: copy.structuredData.placeName,
        },
        mentions: copy.structuredData.mentions.map((name) => ({
          "@type": "Place",
          name,
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
            name: copy.breadcrumbCurrent,
            item: guide.canonicalUrl,
          },
        ],
      },
    ],
  };
}

export function ZhangjiajieGuidePage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getZhangjiajieGuideCopy(locale);
  const guide = getGuideEntry("zhangjiajie-itinerary", locale);
  const nightShowGuide = getGuideEntry("best-zhangjiajie-night-show", locale);
  const nightShowCopy = nightShowRelatedCopy[locale];
  const transportGuide = getGuideEntry(
    "beijing-zhangjiajie-shanghai-transport",
    locale,
  );
  const transportCopy = transportRelatedCopy[locale];
  const plannerHref = `${copy.homePath}?planner=destinations#route-finder`;
  const structuredData = createStructuredData(locale, copy);

  return (
    <div
      className={styles.pageRoot}
      lang={copy.htmlLang}
      data-homeground-locale={locale}
    >
      <a className={styles.skipLink} href="#guide-content">
        {copy.skipLink}
      </a>
      <HomegroundHeader
        locale={locale}
        pageContext="guide"
        guideId="zhangjiajie-itinerary"
      />

      <main id="guide-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <picture className={styles.heroPicture}>
              <source
                type="image/avif"
                srcSet="/images/guides/zhangjiajie/hero-640.avif 640w, /images/guides/zhangjiajie/hero-960.avif 960w, /images/guides/zhangjiajie/hero-1280.avif 1280w, /images/guides/zhangjiajie/hero-1600.avif 1600w"
                sizes="100vw"
              />
              <source
                type="image/webp"
                srcSet="/images/guides/zhangjiajie/hero-640.webp 640w, /images/guides/zhangjiajie/hero-960.webp 960w, /images/guides/zhangjiajie/hero-1280.webp 1280w, /images/guides/zhangjiajie/hero-1600.webp 1600w"
                sizes="100vw"
              />
              <img
                src={guide.heroImagePath}
                alt={guide.heroAlt}
                width="1600"
                height="954"
                fetchPriority="high"
              />
            </picture>
            <div className={styles.heroShade} aria-hidden="true" />
            <div className={styles.heroContent}>
              <nav className={styles.breadcrumb} aria-label={copy.breadcrumbLabel}>
                <ol>
                  <li>
                    <Link href={copy.homePath}>{copy.breadcrumbHome}</Link>
                  </li>
                  <li aria-current="page">{copy.breadcrumbCurrent}</li>
                </ol>
              </nav>
              <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
              <h1>{guide.headline}</h1>
              <p className={styles.heroLead}>{copy.hero.lead}</p>
              <p className={styles.reviewed}>
                {copy.hero.preparedBy} · {copy.hero.publishedLabel}{" "}
                <time dateTime={guide.datePublished}>{copy.hero.publishedDate}</time>{" "}
                · {copy.hero.updatedLabel}{" "}
                <time dateTime={guide.dateModified}>{copy.hero.updatedDate}</time>{" "}
                · {copy.hero.liveCheck}
              </p>
            </div>
          </header>

          <div className={styles.articleBody}>
            <section
              className={styles.quickDecision}
              id="quick-answer"
              aria-labelledby="quick-answer-title"
            >
              <div className={styles.quickAnswerCopy}>
                <div>
                  <p className={styles.sectionLabel}>{copy.quick.sectionLabel}</p>
                  <h2 id="quick-answer-title">{copy.quick.title}</h2>
                </div>
                <p>
                  {copy.quick.summaryBeforeEmphasis}
                  <em>{copy.quick.summaryEmphasis}</em>
                  {copy.quick.summaryAfterEmphasis}
                </p>
              </div>
              <nav className={styles.decisionNav} aria-label={copy.quick.jumpLabel}>
                {copy.quick.decisions.map((decision) => (
                  <a href={decision.href} key={decision.days}>
                    <span>{decision.days}</span>
                    <strong>{decision.label}</strong>
                    <small>{decision.detail}</small>
                  </a>
                ))}
              </nav>
              <div className={styles.fullDayRule}>
                <strong>{copy.quick.fullDayLabel}</strong>
                <div>
                  <p>{copy.quick.fullDayBody}</p>
                  <p className={styles.fullDayExample}>
                    <span>{copy.quick.fullDayExampleLabel}</span>{" "}
                    {copy.quick.fullDayExample}
                  </p>
                </div>
              </div>
              <Link className={styles.quickPlannerLink} href={plannerHref}>
                {copy.quick.action}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </section>

            <section
              className={styles.routeLogic}
              id="route-logic"
              aria-labelledby="route-logic-title"
            >
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.routeLogic.sectionLabel}</p>
                <h2 id="route-logic-title">{copy.routeLogic.title}</h2>
                <p>{copy.routeLogic.intro}</p>
              </div>
              <figure>
                <figcaption>{copy.routeLogic.figureCaption}</figcaption>
                <ol>
                  {copy.routeLogic.zones.map((zone) => (
                    <li key={zone.number}>
                      <span className={styles.routeZoneRail} aria-hidden="true">
                        <span className={styles.routeZoneNode} />
                      </span>
                      <div className={styles.routeZoneContent}>
                        <span className={styles.routeZoneNumber}>{zone.number}</span>
                        <h3>{zone.name}</h3>
                        <p>{zone.sights}</p>
                        <strong>{zone.role}</strong>
                      </div>
                    </li>
                  ))}
                </ol>
              </figure>
            </section>

            <div className={styles.relatedGuideStack}>
              <aside className={styles.nightShowRelated} aria-labelledby="night-show-related-title">
                <div>
                  <p>{nightShowCopy.label}</p>
                  <h2 id="night-show-related-title">{nightShowCopy.title}</h2>
                  <span>{nightShowCopy.body}</span>
                </div>
                <Link href={nightShowGuide.canonicalPath}>
                  {nightShowCopy.action}
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </aside>

              <aside className={styles.nightShowRelated} aria-labelledby="transport-related-title">
                <div>
                  <p>{transportCopy.label}</p>
                  <h2 id="transport-related-title">{transportCopy.title}</h2>
                  <span>{transportCopy.body}</span>
                </div>
                <Link href={transportGuide.canonicalPath}>
                  {transportGuide.featuredLinkLabel}
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </aside>
            </div>

            <section
              className={styles.itinerarySection}
              id="itinerary-2-days"
              aria-labelledby="itinerary-2-title"
            >
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.twoDay.sectionLabel}</p>
                <h2 id="itinerary-2-title">{copy.twoDay.title}</h2>
                <p>{copy.twoDay.intro}</p>
              </div>
              <div className={styles.optionGrid}>
                {copy.twoDay.options.map((option) => (
                  <article className={styles.routeOption} key={option.label}>
                    <p className={styles.optionLabel}>{option.label}</p>
                    <h3>{option.title}</h3>
                    <Timeline
                      stops={option.stops}
                      headingLevel={4}
                      label={`${option.label} ${copy.timelineLabels.suffix}`}
                      labels={copy.timelineLabels}
                    />
                    <p className={styles.tradeoff}>
                      <strong>{copy.twoDay.whatStaysOut}</strong>
                      {option.tradeoff}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section
              className={styles.itinerarySection}
              id="itinerary-3-days"
              aria-labelledby="itinerary-3-title"
            >
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>{copy.threeDay.sectionLabel}</p>
                  <h2 id="itinerary-3-title">{copy.threeDay.title}</h2>
                </div>
                <p>{copy.threeDay.intro}</p>
              </div>
              <Timeline
                stops={copy.threeDay.stops}
                label={copy.threeDay.timelineLabel}
                labels={copy.timelineLabels}
              />
              <TianmenFigure copy={copy.figures.tianmen} />
              <aside className={styles.bookingNote}>
                <p className={styles.optionLabel}>{copy.threeDay.replacementLabel}</p>
                <h3>{copy.threeDay.replacementTitle}</h3>
                <p>{copy.threeDay.replacementBody}</p>
              </aside>
              <a className={styles.backLink} href="#quick-answer">
                {copy.threeDay.backLink} <span aria-hidden="true">↑</span>
              </a>
            </section>

            <section
              className={styles.itinerarySection}
              id="itinerary-4-days"
              aria-labelledby="itinerary-4-title"
            >
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.fourDay.sectionLabel}</p>
                <h2 id="itinerary-4-title">{copy.fourDay.title}</h2>
                <p>{copy.fourDay.intro}</p>
              </div>
              <div className={styles.sharedDays}>
                <h3 className={styles.optionLabel}>{copy.fourDay.sharedLabel}</h3>
                <Timeline
                  stops={copy.fourDay.sharedStops}
                  headingLevel={4}
                  label={copy.fourDay.sharedTimelineLabel}
                  labels={copy.timelineLabels}
                />
              </div>
              <p className={styles.branchMarker} id="four-day-branch-choice">
                {copy.fourDay.branchMarker}
              </p>
              <div
                className={styles.branchGrid}
                role="group"
                aria-labelledby="four-day-branch-choice"
              >
                {copy.fourDay.branches.map((branch) => (
                  <article className={styles.routeBranch} id={branch.id} key={branch.id}>
                    <p className={styles.optionLabel}>{branch.label}</p>
                    <h3>{branch.title}</h3>
                    <p className={styles.optionIntro}>{branch.intro}</p>
                    <Timeline
                      stops={branch.stops}
                      headingLevel={4}
                      label={`${branch.label} ${copy.timelineLabels.suffix}`}
                      labels={copy.timelineLabels}
                    />
                    {branch.id === "continue-west" && (
                      <FenghuangFigure copy={copy.figures.fenghuang} />
                    )}
                    <p className={styles.tradeoff}>
                      <strong>{copy.fourDay.tradeoffLabel}</strong>
                      {branch.tradeoff}
                    </p>
                  </article>
                ))}
              </div>
              <a className={styles.backLink} href="#quick-answer">
                {copy.fourDay.backLink} <span aria-hidden="true">↑</span>
              </a>
            </section>

            <section
              className={styles.combinationSection}
              id="combination-rules"
              aria-labelledby="combination-title"
            >
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.combination.sectionLabel}</p>
                <h2 id="combination-title">{copy.combination.title}</h2>
              </div>
              <div className={styles.ruleColumns}>
                {copy.combination.groups.map((group, groupIndex) => (
                  <article key={group.label}>
                    <p className={groupIndex === 0 ? styles.rulePositive : styles.ruleCaution}>
                      {group.label}
                    </p>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item.title}>
                          <h3>{item.title}</h3>
                          <p>{item.detail}</p>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section
              className={styles.evidenceSection}
              id="evidence"
              aria-labelledby="evidence-title"
            >
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>{copy.evidence.sectionLabel}</p>
                  <h2 id="evidence-title">{copy.evidence.title}</h2>
                </div>
              </div>
              <div className={styles.evidenceLedger}>
                {copy.evidence.items.map((item, index) => (
                  <article key={item.title}>
                    <div className={styles.evidenceMeta}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{item.type}</p>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.fact}</p>
                    {item.calculation && (
                      <p className={styles.calculation}>
                        <span>{copy.evidence.calculationLabel}</span>
                        <strong>{item.calculation}</strong>
                      </p>
                    )}
                    <p className={styles.consequence}>{item.consequence}</p>
                    <div className={styles.sourceLine}>
                      {item.sources.length > 0 ? (
                        item.sources.map((source) => (
                          <a href={ZHANGJIAJIE_GUIDE_SOURCES[source.index].url} key={source.index}>
                            {source.label}
                          </a>
                        ))
                      ) : (
                        <span>{copy.evidence.liveConfirmation}</span>
                      )}
                      <small>
                        {copy.evidence.checkedLabel}{" "}
                        <time dateTime={guide.sourceReviewedDate}>{copy.evidence.checkedDate}</time>
                      </small>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.faqSection} id="faq" aria-labelledby="guide-faq-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.faq.sectionLabel}</p>
                <h2 id="guide-faq-title">{copy.faq.title}</h2>
              </div>
              <div className={styles.faqList}>
                {copy.faq.items.map((item) => (
                  <details key={item.question}>
                    <summary>
                      {item.question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className={styles.sourcesSection} id="sources" aria-labelledby="sources-title">
              <h2 className={styles.visuallyHidden} id="sources-title">
                {copy.sources.hiddenTitle}
              </h2>
              <details className={styles.sourceDisclosure}>
                <summary>
                  <span>
                    <strong>{copy.sources.disclosureTitle}</strong>
                    <small>{copy.sources.summary}</small>
                  </span>
                  <span className={styles.sourceToggle} aria-hidden="true">+</span>
                </summary>
                <div className={styles.sourceDisclosureBody}>
                  <p>{copy.sources.intro}</p>
                  <ul>
                    {ZHANGJIAJIE_GUIDE_SOURCES.map((source, index) => (
                      <li key={source.url}>
                        <a href={source.url}>{copy.sources.names[index]}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </section>
          </div>

          <section className={styles.finalCta} aria-labelledby="guide-cta-title">
            <div>
              <p className={styles.sectionLabel}>{copy.finalCta.sectionLabel}</p>
              <h2 id="guide-cta-title">{copy.finalCta.title}</h2>
              <p>{copy.finalCta.body}</p>
            </div>
            <Link href={plannerHref}>
              {copy.finalCta.action}
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </section>
        </article>
      </main>

      <HomegroundFooter
        locale={locale}
        pageContext="guide"
        guideId="zhangjiajie-itinerary"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
