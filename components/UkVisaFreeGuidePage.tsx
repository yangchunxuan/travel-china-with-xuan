import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getGuideEntry } from "../lib/guideRegistry";
import {
  UK_PASSPORT_CASES,
  UK_VISA_AT_A_GLANCE,
  UK_VISA_FAQS,
  UK_VISA_GUIDE_SOURCES,
  UK_VISA_NEEDED_CASES,
  UK_VISA_SCENARIOS,
} from "../lib/ukVisaFreeGuide";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./UkVisaFreeGuidePage.module.css";

const guide = getGuideEntry("china-visa-free-uk-citizens-2026", "en");
const checkedDate = "24 July 2026";
const plannerHref =
  "/?utm_source=china-visa-free-uk-citizens-2026&utm_medium=owned&utm_campaign=trip-conversation&utm_content=article-cta&planner=destinations#route-finder";

function createStructuredData() {
  const organizationId = "https://homegroundchina.com/#organization";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Homeground China",
        url: "https://homegroundchina.com/",
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
          width: guide.imageWidth,
          height: guide.imageHeight,
          caption: guide.heroAlt,
        },
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: "en-GB",
        author: {
          "@id": organizationId,
        },
        publisher: {
          "@id": organizationId,
        },
        mainEntityOfPage: guide.canonicalUrl,
        citation: UK_VISA_GUIDE_SOURCES.map((source) => source.url),
        about: [
          "China visa-free entry",
          "British citizen passport",
          "China travel in 2026",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${guide.canonicalUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://homegroundchina.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Travel guides",
            item: "https://homegroundchina.com/guides/",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "China entry guides",
            item:
              "https://homegroundchina.com/guides/china-entry-requirements/",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "China visa-free for UK citizens",
            item: guide.canonicalUrl,
          },
        ],
      },
    ],
  };
}

function OfficialLink({ sourceIndex }: { sourceIndex: number }) {
  const source = UK_VISA_GUIDE_SOURCES[sourceIndex];

  return (
    <a
      className={styles.sourceLink}
      href={source.url}
      target="_blank"
      rel="noreferrer"
    >
      {source.shortLabel}
      <ExternalLink aria-hidden="true" size={13} />
    </a>
  );
}

export function UkVisaFreeGuidePage() {
  const structuredData = createStructuredData();

  return (
    <div className={styles.pageRoot} lang="en-GB">
      <a className={styles.skipLink} href="#uk-visa-main">
        Skip to the guide
      </a>

      <HomegroundHeader
        locale="en"
        pageContext="guides"
        showLanguageNav={false}
      />

      <main id="uk-visa-main" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <ol>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/guides/">Travel guides</Link>
                  </li>
                  <li>
                    <Link href="/guides/china-entry-requirements/">
                      China entry guides
                    </Link>
                  </li>
                  <li aria-current="page">UK entry guide</li>
                </ol>
              </nav>

              <p className={styles.eyebrow}>
                Entry guide · verified {checkedDate}
              </p>
              <h1>{guide.headline.replace("Visa-Free", "Visa‑Free")}</h1>
              <p className={styles.heroLead}>
                The short answer is yes for many 2026 leisure trips—but not for
                every British passport, purpose or date. Use this guide to find
                the boundary before you book.
              </p>
              <div className={styles.heroActions}>
                <a href="#quick-answer">Check the rule</a>
                <a href="#passport-types">Check your passport</a>
              </div>
              <p className={styles.heroBoundary}>
                Independent travel guidance, not a visa service. Chinese border
                authorities make the final entry decision.
              </p>
            </div>

            <figure className={styles.heroVisual}>
              <picture>
                <source
                  media="(max-width: 760px)"
                  srcSet="/images/guides/china-visa-free-uk-citizens-2026/great-wall-hero-720.jpg"
                />
                <img
                  src="/images/guides/china-visa-free-uk-citizens-2026/great-wall-hero-1200.jpg"
                  alt={guide.heroAlt}
                  width="1200"
                  height="1800"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
              <figcaption>Photographed by Homeground near Beijing.</figcaption>
              <div className={styles.policyStamp} aria-label="Current policy">
                <span>Current rule</span>
                <strong>30 days</strong>
                <small>Enter by 31 Dec 2026</small>
              </div>
            </figure>
          </header>

          <section
            className={styles.quickAnswer}
            id="quick-answer"
            aria-labelledby="quick-answer-title"
          >
            <div className={styles.sectionIntro}>
              <p className={styles.sectionLabel}>The direct answer</p>
              <h2 id="quick-answer-title">
                You can usually travel visa-free when all four conditions match.
              </h2>
              <p>
                China’s current policy covers holders of valid ordinary UK
                passports entering between 17 February and 31 December 2026 for
                an eligible purpose, for no more than 30 days. It is not a
                blanket exemption for every British travel document.
              </p>
              <div className={styles.inlineSources}>
                <OfficialLink sourceIndex={0} />
                <OfficialLink sourceIndex={1} />
              </div>
            </div>

            <dl className={styles.factGrid}>
              {UK_VISA_AT_A_GLANCE.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>
                    <strong>{fact.value}</strong>
                    <span>{fact.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <div className={styles.articleLayout}>
            <aside className={styles.contents} aria-label="On this page">
              <p>On this page</p>
              <nav>
                <a href="#visa-needed">When you need a visa</a>
                <a href="#passport-types">Which passport qualifies</a>
                <a href="#counting-days">How 30 days are counted</a>
                <a href="#trip-examples">Route examples</a>
                <a href="#before-you-fly">Before you fly</a>
                <a href="#hong-kong">Hong Kong and Macao</a>
                <a href="#faq">Common questions</a>
              </nav>
            </aside>

            <div className={styles.articleContent}>
              <section id="visa-needed" aria-labelledby="visa-needed-title">
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>The boundary</p>
                  <h2 id="visa-needed-title">
                    When a UK traveller still needs a visa
                  </h2>
                  <p>
                    If any one of the following applies, the 30-day waiver is
                    not the right route into mainland China.
                  </p>
                </div>
                <div className={styles.numberedGrid}>
                  {UK_VISA_NEEDED_CASES.map((item) => (
                    <article key={item.number}>
                      <span aria-hidden="true">{item.number}</span>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="passport-types"
                aria-labelledby="passport-types-title"
              >
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>Passport check</p>
                  <h2 id="passport-types-title">
                    “UK passport” is not precise enough
                  </h2>
                  <p>
                    The Chinese notice says “ordinary passport holders from the
                    UK”. GOV.UK frames its guidance around a full “British
                    citizen” passport. That distinction matters.
                  </p>
                </div>
                <div className={styles.passportList}>
                  {UK_PASSPORT_CASES.map((item) => (
                    <article
                      data-tone={item.tone}
                      key={item.title}
                    >
                      <p>{item.status}</p>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
                <div className={styles.inlineSources}>
                  <OfficialLink sourceIndex={1} />
                  <OfficialLink sourceIndex={2} />
                  <OfficialLink sourceIndex={3} />
                </div>
              </section>

              <section
                id="counting-days"
                aria-labelledby="counting-days-title"
              >
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>Day counting</p>
                  <h2 id="counting-days-title">
                    Arrival day is day zero—not day one
                  </h2>
                  <p>
                    The official FAQ counts from the day after entry and then
                    runs for 30 calendar days. Do not substitute “one month” for
                    this calculation.
                  </p>
                </div>
                <ol className={styles.dayTimeline} aria-label="Thirty-day example">
                  <li>
                    <span>1 July</span>
                    <strong>Enter mainland China</strong>
                    <small>Arrival day</small>
                  </li>
                  <li>
                    <span>2 July</span>
                    <strong>The count begins</strong>
                    <small>Day 01</small>
                  </li>
                  <li>
                    <span>31 July</span>
                    <strong>Last day in this example</strong>
                    <small>Day 30</small>
                  </li>
                </ol>
                <p className={styles.callout}>
                  A late-night arrival does not create an extra day. Build your
                  outbound flight around the calendar count, not the number of
                  hotel nights.
                </p>
              </section>

              <section
                id="trip-examples"
                aria-labelledby="trip-examples-title"
              >
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>Route examples</p>
                  <h2 id="trip-examples-title">
                    Six common trips, six different answers
                  </h2>
                  <p>
                    These examples are planning interpretations of the published
                    rules, not advance clearance to enter.
                  </p>
                </div>
                <div className={styles.scenarioList}>
                  {UK_VISA_SCENARIOS.map((scenario) => (
                    <article data-tone={scenario.tone} key={scenario.trip}>
                      <h3>{scenario.trip}</h3>
                      <div className={styles.scenarioDecision}>
                        <p className={styles.scenarioResult}>
                          {scenario.result}
                        </p>
                        <p>{scenario.explanation}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="before-you-fly"
                aria-labelledby="before-you-fly-title"
              >
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>Before departure</p>
                  <h2 id="before-you-fly-title">
                    Carry enough evidence for the trip you say you are taking
                  </h2>
                </div>
                <div className={styles.checklist}>
                  <article>
                    <h3>Use the stricter passport guidance</h3>
                    <p>
                      China’s current visa-waiver FAQ says the ordinary passport
                      must remain valid for the intended stay. GOV.UK advises at
                      least six months’ validity after arrival and two blank
                      pages. Unless the Chinese Embassy and your carrier confirm
                      otherwise, follow the stricter advice.
                    </p>
                  </article>
                  <article>
                    <h3>Keep your route evidence accessible</h3>
                    <p>
                      The Chinese Embassy recommends carrying documents that
                      match your purpose: return or onward flights, accommodation
                      bookings and, where relevant, an invitation letter.
                    </p>
                  </article>
                  <article>
                    <h3>Resolve nationality questions early</h3>
                    <p>
                      China does not recognise dual nationality. If you were born
                      in China, have a Chinese parent, previously held Chinese
                      nationality or still hold Chinese household registration,
                      get specialist advice before relying on the waiver.
                    </p>
                  </article>
                </div>
                <div className={styles.inlineSources}>
                  <OfficialLink sourceIndex={1} />
                  <OfficialLink sourceIndex={2} />
                </div>
              </section>

              <section id="hong-kong" aria-labelledby="hong-kong-title">
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>Route edges</p>
                  <h2 id="hong-kong-title">
                    Hong Kong, Macao and the 240-hour transit rule
                  </h2>
                </div>
                <div className={styles.splitNotes}>
                  <article>
                    <p className={styles.noteNumber}>A</p>
                    <h3>Leaving mainland China ends that stay</h3>
                    <p>
                      Hong Kong and Macao have separate immigration systems.
                      When you return to mainland China, you make a new entry.
                      The current Chinese Embassy FAQ permits multiple visa-free
                      entries and states no present interval or total-day cap,
                      but every entry must independently match the policy and is
                      examined at the border.
                    </p>
                    <p>
                      In other words: a Hong Kong side trip may work, but it is
                      not a guaranteed “visa reset”.
                    </p>
                  </article>
                  <article>
                    <p className={styles.noteNumber}>B</p>
                    <h3>Most eligible UK tourists do not need 240-hour transit</h3>
                    <p>
                      The 30-day waiver is broader for an eligible British
                      citizen passport. The 240-hour transit policy is a separate
                      route with its own eligible ports, geographical limits and
                      onward-ticket requirement.
                    </p>
                    <p>
                      If you do not qualify for the 30-day waiver, do not assume
                      the transit policy automatically solves the problem.
                    </p>
                  </article>
                </div>
              </section>

              <section
                className={styles.arrivalNote}
                aria-labelledby="after-arrival-title"
              >
                <div>
                  <p className={styles.sectionLabel}>After arrival</p>
                  <h2 id="after-arrival-title">
                    Register where you are staying within 24 hours
                  </h2>
                </div>
                <p>
                  Hotels normally complete residence registration when you check
                  in. If you stay in a private home or another arrangement, make
                  sure the registration is completed with the local Public
                  Security Bureau.
                </p>
              </section>

              <section
                className={styles.planningCta}
                aria-labelledby="planning-cta-title"
              >
                <div>
                  <p className={styles.sectionLabel}>Once entry is clear</p>
                  <h2 id="planning-cta-title">
                    Entry rules decide whether you can arrive. The route decides
                    whether the trip works.
                  </h2>
                </div>
                <div>
                  <p>
                    Tell us the cities, dates and pace you have in mind. A
                    Homeground planner can then discuss the right level of route
                    and ground support with you.
                  </p>
                  <Link href={plannerHref}>
                    Start my China trip brief
                    <ArrowRight aria-hidden="true" size={18} />
                  </Link>
                  <small>
                    The trip brief is free. It does not provide a visa
                    eligibility decision.
                  </small>
                </div>
              </section>

              <section className={styles.faqSection} id="faq">
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>Questions people ask</p>
                  <h2>China visa-free entry for UK citizens: FAQ</h2>
                </div>
                <div className={styles.faqList}>
                  {UK_VISA_FAQS.map((item) => (
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

              <section className={styles.sourcesSection} id="sources">
                <div className={styles.sectionHeading}>
                  <p className={styles.sectionLabel}>Source ledger</p>
                  <h2>Official pages checked for this guide</h2>
                  <p>
                    Policy pages can change. These sources were rechecked on{" "}
                    <time dateTime={guide.sourceReviewedDate}>{checkedDate}</time>.
                  </p>
                </div>
                <ol className={styles.sourceLedger}>
                  {UK_VISA_GUIDE_SOURCES.map((source, index) => (
                    <li key={source.id}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <p>{source.owner}</p>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {source.title}
                          <ExternalLink aria-hidden="true" size={14} />
                        </a>
                        <small>{source.note}</small>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className={styles.disclaimer}>
                  Homeground plans travel inside China; it is not an immigration
                  authority or visa adviser. Confirm unusual passport,
                  nationality, employment or date circumstances with the Chinese
                  Embassy and your carrier before travel.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>

      <HomegroundFooter locale="en" pageContext="guide" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
