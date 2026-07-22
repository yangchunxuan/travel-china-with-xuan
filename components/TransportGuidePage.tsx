import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Plane,
  TrainFront,
} from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { getGuideEntry } from "../lib/guideRegistry";
import { BEIJING_ZHANGJIAJIE_SHANGHAI_TRANSPORT_SOURCES } from "../lib/beijingZhangjiajieShanghaiTransport";
import {
  getTransportGuideCopy,
  type TransportGuideCopy,
} from "../lib/beijingZhangjiajieShanghaiTransportI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./TransportGuidePage.module.css";

const GUIDE_ID = "beijing-zhangjiajie-shanghai-transport" as const;
const TRANSPORT_IMAGE_ROOT =
  "/images/guides/beijing-zhangjiajie-shanghai-transport";

const ROUTE_GALLERY_IMAGES = [
  {
    key: "rail",
    fileName: "beijing-west",
    widths: [480, 768, 1200],
    fallbackWidth: 1200,
    width: 1200,
    height: 824,
  },
  {
    key: "midpoint",
    fileName: "zhangjiajie-west",
    widths: [640, 960, 1280, 1600],
    fallbackWidth: 1600,
    width: 1600,
    height: 692,
  },
  {
    key: "airport",
    fileName: "airport-wayfinding",
    widths: [480, 768, 1200],
    fallbackWidth: 1200,
    width: 1200,
    height: 798,
  },
] as const;

function TransportRouteGallery({
  copy,
}: {
  copy: TransportGuideCopy["visuals"];
}) {
  return (
    <ol className={styles.routeGallery} aria-label={copy.ariaLabel}>
      {ROUTE_GALLERY_IMAGES.map((image) => {
        const item = copy[image.key];
        const srcSet = (extension: "avif" | "webp") =>
          image.widths
            .map(
              (width) =>
                `${TRANSPORT_IMAGE_ROOT}/${image.fileName}-${width}.${extension} ${width}w`,
            )
            .join(", ");

        return (
          <li key={image.key}>
            <figure>
              <picture>
                <source
                  type="image/avif"
                  srcSet={srcSet("avif")}
                  sizes="(max-width: 768px) calc(100vw - 2rem), 390px"
                />
                <source
                  type="image/webp"
                  srcSet={srcSet("webp")}
                  sizes="(max-width: 768px) calc(100vw - 2rem), 390px"
                />
                <img
                  data-transport-photo={image.key}
                  src={`${TRANSPORT_IMAGE_ROOT}/${image.fileName}-${image.fallbackWidth}.jpg`}
                  alt={item.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <figcaption>
                <strong>{item.title}</strong>
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

function createStructuredData(
  locale: HomegroundLocale,
  copy: TransportGuideCopy,
) {
  const guide = getGuideEntry(GUIDE_ID, locale);

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
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: copy.htmlLang,
        mainEntityOfPage: guide.canonicalUrl,
        image: {
          "@type": "ImageObject",
          url: guide.heroImageUrl,
          width: 1600,
          height: 692,
        },
        author: { "@id": "https://homegroundchina.com/#organization" },
        publisher: { "@id": "https://homegroundchina.com/#organization" },
        citation: BEIJING_ZHANGJIAJIE_SHANGHAI_TRANSPORT_SOURCES.map(
          (source, index) => ({
            "@type": "WebPage",
            name: copy.sources.names[index],
            url: source.url,
          }),
        ),
        about: {
          "@type": "Thing",
          name: copy.structuredData.aboutName,
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

export function TransportGuidePage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getTransportGuideCopy(locale);
  const guide = getGuideEntry(GUIDE_ID, locale);
  const zhangjiajieGuide = getGuideEntry("zhangjiajie-itinerary", locale);
  const plannerHref = `${copy.homePath}?utm_source=beijing-zhangjiajie-shanghai-transport&utm_medium=owned&utm_campaign=route-guide&planner=destinations&destinations=beijing-great-wall%2Czhangjiajie%2Cshanghai#route-finder`;
  const structuredData = createStructuredData(locale, copy);

  return (
    <div
      className={styles.pageRoot}
      lang={copy.htmlLang}
      data-homeground-locale={locale}
    >
      <a className={styles.skipLink} href="#transport-guide-content">
        {copy.skipLink}
      </a>
      <HomegroundHeader
        locale={locale}
        pageContext="guide"
        guideId={GUIDE_ID}
      />

      <main id="transport-guide-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroInner}>
              <nav className={styles.breadcrumb} aria-label={copy.breadcrumbLabel}>
                <ol>
                  <li>
                    <Link href={copy.homePath}>{copy.breadcrumbHome}</Link>
                  </li>
                  <li aria-current="page">{copy.breadcrumbCurrent}</li>
                </ol>
              </nav>

              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
                  <h1>
                    <span className={styles.heroRouteHeading}>
                      {copy.structuredData.mentions.slice(0, 3).map((place, index) => (
                        <span key={place}>
                          <span>{place}</span>
                          {index < 2 && <span aria-hidden="true">→</span>}
                        </span>
                      ))}
                    </span>
                    <span className={styles.heroHeadlineTail}>
                      {copy.hero.headlineTail}
                    </span>
                  </h1>
                  <p className={styles.heroLead}>{copy.hero.lead}</p>
                </div>

                <div className={styles.routeStamp} aria-hidden="true">
                  {copy.structuredData.mentions.slice(0, 3).map((place, index) => (
                    <span className={styles.routeStop} key={place}>
                      <span>{place}</span>
                      {index < 2 && (
                        <ArrowRight size={19} strokeWidth={1.5} />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <p className={styles.reviewed}>
                {copy.hero.preparedBy} · {copy.hero.publishedLabel}{" "}
                <time dateTime={guide.datePublished}>{copy.hero.publishedDate}</time>{" "}
                · {copy.hero.checkedLabel}{" "}
                <time dateTime={guide.sourceReviewedDate}>{copy.hero.checkedDate}</time>{" "}
                · {copy.hero.dynamicNote}
              </p>
            </div>
          </header>

          <div className={styles.articleBody}>
            <section
              className={styles.quickAnswer}
              id="quick-answer"
              aria-labelledby="transport-quick-title"
            >
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>{copy.quick.sectionLabel}</p>
                  <h2 id="transport-quick-title">{copy.quick.title}</h2>
                </div>
                <p>{copy.quick.intro}</p>
              </div>

              <nav className={styles.quickCards} aria-label={copy.quick.title}>
                {copy.quick.cards.map((card, index) => (
                  <a href={card.href} key={card.route}>
                    <span className={styles.cardNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <small>{card.route}</small>
                    <strong>{card.verdict}</strong>
                    <em>{card.planningCost}</em>
                    <p>{card.detail}</p>
                  </a>
                ))}
              </nav>

              <p className={styles.boundaryNote}>{copy.quick.boundary}</p>
            </section>

            <section
              className={styles.timeMath}
              id="door-to-door"
              aria-labelledby="door-to-door-title"
            >
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.timeMath.sectionLabel}</p>
                <h2 id="door-to-door-title">{copy.timeMath.title}</h2>
                <p>{copy.timeMath.intro}</p>
              </div>

              <figure>
                <figcaption>{copy.timeMath.formulaLabel}</figcaption>
                <p className={styles.cardScrollHint} aria-hidden="true">
                  {copy.timeMath.scrollHint}
                  <ArrowRight size={16} strokeWidth={1.8} />
                </p>
                <ol>
                  {copy.timeMath.steps.map((step, index) => (
                    <li key={step.label}>
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <strong>{step.label}</strong>
                      <p>{step.detail}</p>
                    </li>
                  ))}
                </ol>
              </figure>
              <p className={styles.mathNote}>
                <Clock3 aria-hidden="true" size={18} />
                {copy.timeMath.note}
              </p>
            </section>

            <section
              className={styles.comparison}
              id="comparison"
              aria-labelledby="comparison-title"
            >
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.comparison.sectionLabel}</p>
                <h2 id="comparison-title">{copy.comparison.title}</h2>
                <p>{copy.comparison.intro}</p>
              </div>

              <p className={styles.tableHint} aria-hidden="true">
                {copy.comparison.tableHint}
                <ArrowRight size={16} strokeWidth={1.8} />
              </p>

              <div
                className={styles.tableWrap}
                role="region"
                aria-label={copy.comparison.tableLabel}
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">{copy.comparison.columns.leg}</th>
                      <th scope="col">{copy.comparison.columns.mode}</th>
                      <th scope="col">{copy.comparison.columns.publishedTime}</th>
                      <th scope="col">{copy.comparison.columns.planningTime}</th>
                      <th scope="col">{copy.comparison.columns.dayCost}</th>
                      <th scope="col">{copy.comparison.columns.recommendation}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {copy.comparison.rows.map((row) => (
                      <tr key={`${row.leg}-${row.mode}`}>
                        <th scope="row">{row.leg}</th>
                        <td>{row.mode}</td>
                        <td>{row.publishedTime}</td>
                        <td>{row.planningTime}</td>
                        <td>{row.dayCost}</td>
                        <td>{row.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.calculationBlock}>
                <h3>{copy.comparison.calculationsLabel}</h3>
                <div>
                  {copy.comparison.calculations.map((calculation) => (
                    <div key={calculation.route}>
                      <p>{calculation.route}</p>
                      <span>{calculation.formula}</span>
                      <strong>{calculation.result}</strong>
                    </div>
                  ))}
                </div>
              </div>
              <p className={styles.sampleNote}>{copy.comparison.sampleNote}</p>
            </section>

            <TransportRouteGallery copy={copy.visuals} />

            {copy.legs.map((leg) => (
              <section
                className={styles.legSection}
                id={leg.id}
                aria-labelledby={`${leg.id}-title`}
                key={leg.id}
              >
                <div className={styles.legIntro}>
                  <div className={styles.legIndex} aria-hidden="true">
                    {leg.number}
                  </div>
                  <div>
                    <p className={styles.sectionLabel}>{leg.eyebrow}</p>
                    <h2 id={`${leg.id}-title`}>{leg.title}</h2>
                    <p className={styles.legVerdict}>{leg.verdict}</p>
                    <p>{leg.body}</p>
                  </div>
                </div>

                <div className={styles.decisionGrid}>
                  <article>
                    <Plane aria-hidden="true" size={22} />
                    <h3>{leg.chooseFlightTitle}</h3>
                    <ul>
                      {leg.chooseFlight.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                  <article>
                    <TrainFront aria-hidden="true" size={22} />
                    <h3>{leg.chooseTrainTitle}</h3>
                    <ul>
                      {leg.chooseTrain.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                  <aside aria-labelledby={`${leg.id}-watch-title`}>
                    <h3 id={`${leg.id}-watch-title`}>{leg.watchTitle}</h3>
                    <ul>
                      {leg.watch.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </aside>
                </div>

              </section>
            ))}

            <section
              className={styles.baseSection}
              id="zhangjiajie-base"
              aria-labelledby="base-title"
            >
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>{copy.base.sectionLabel}</p>
                  <h2 id="base-title">{copy.base.title}</h2>
                </div>
                <p>{copy.base.intro}</p>
              </div>
              <div className={styles.baseGrid}>
                {copy.base.cards.map((card) => (
                  <article key={card.place}>
                    <p>{card.place}</p>
                    <h3>{card.title}</h3>
                    <span>{card.body}</span>
                  </article>
                ))}
              </div>
            </section>

            <section
              className={styles.tripLength}
              id="trip-length"
              aria-labelledby="trip-length-title"
            >
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.tripLength.sectionLabel}</p>
                <h2 id="trip-length-title">{copy.tripLength.title}</h2>
                <p>{copy.tripLength.intro}</p>
              </div>
              <div className={styles.lengthGrid}>
                {copy.tripLength.options.map((option) => (
                  <article key={option.nights}>
                    <p>{option.nights}</p>
                    <h3>{option.title}</h3>
                    <span>{option.body}</span>
                    <strong>{option.rule}</strong>
                  </article>
                ))}
              </div>
              <aside
                className={styles.relatedGuide}
                aria-labelledby="related-zhangjiajie-guide-title"
              >
                <div>
                  <p className={styles.sectionLabel}>{copy.tripLength.linkLead}</p>
                  <h3 id="related-zhangjiajie-guide-title">
                    {zhangjiajieGuide.headline}
                  </h3>
                </div>
                <Link href={zhangjiajieGuide.canonicalPath}>
                  {copy.tripLength.linkLabel}
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </aside>
            </section>

            <section
              className={styles.travellerSection}
              id="traveller-types"
              aria-labelledby="traveller-title"
            >
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.travellers.sectionLabel}</p>
                <h2 id="traveller-title">{copy.travellers.title}</h2>
              </div>
              <dl>
                {copy.travellers.groups.map((group) => (
                  <div key={group.label}>
                    <dt>{group.label}</dt>
                    <dd>{group.recommendation}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section
              className={styles.checklistSection}
              id="booking-checklist"
              aria-labelledby="checklist-title"
            >
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>{copy.checklist.sectionLabel}</p>
                  <h2 id="checklist-title">{copy.checklist.title}</h2>
                </div>
                <p>{copy.checklist.intro}</p>
              </div>
              <ol>
                {copy.checklist.items.map((item, index) => (
                  <li key={item}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section
              className={styles.evidenceSection}
              id="evidence"
              aria-labelledby="transport-evidence-title"
            >
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.evidence.sectionLabel}</p>
                <h2 id="transport-evidence-title">{copy.evidence.title}</h2>
              </div>
              <div className={styles.evidenceGrid}>
                {copy.evidence.items.map((item, index) => (
                  <article key={item.title}>
                    <div>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{item.type}</p>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.finding}</p>
                    <footer>
                      {item.sourceIndices.length > 0 ? (
                        item.sourceIndices.map((sourceIndex) => (
                          <a
                            href={BEIJING_ZHANGJIAJIE_SHANGHAI_TRANSPORT_SOURCES[sourceIndex].url}
                            key={sourceIndex}
                          >
                            {copy.evidence.sourceLabel} {sourceIndex + 1}
                          </a>
                        ))
                      ) : (
                        <span>Homeground</span>
                      )}
                      <small>
                        {copy.evidence.checkedLabel}{" "}
                        <time dateTime={guide.sourceReviewedDate}>
                          {copy.evidence.checkedDate}
                        </time>
                      </small>
                    </footer>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.faqSection} id="faq" aria-labelledby="transport-faq-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>{copy.faq.sectionLabel}</p>
                <h2 id="transport-faq-title">{copy.faq.title}</h2>
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

            <section className={styles.sourcesSection} id="sources" aria-labelledby="transport-sources-title">
              <h2 className={styles.visuallyHidden} id="transport-sources-title">
                {copy.sources.hiddenTitle}
              </h2>
              <details className={styles.sourceDisclosure}>
                <summary>
                  <span>
                    <strong>{copy.sources.disclosureTitle}</strong>
                    <small>{copy.sources.summary}</small>
                  </span>
                  <span aria-hidden="true">+</span>
                </summary>
                <div>
                  <p>{copy.sources.intro}</p>
                  <ol>
                    {BEIJING_ZHANGJIAJIE_SHANGHAI_TRANSPORT_SOURCES.map((source, index) => (
                      <li key={source.name}>
                        <a href={source.url}>{copy.sources.names[index]}</a>
                      </li>
                    ))}
                  </ol>
                </div>
              </details>
            </section>
          </div>

          <section className={styles.finalCta} aria-labelledby="transport-cta-title">
            <div>
              <p className={styles.sectionLabel}>{copy.finalCta.sectionLabel}</p>
              <h2 id="transport-cta-title">{copy.finalCta.title}</h2>
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
        guideId={GUIDE_ID}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
