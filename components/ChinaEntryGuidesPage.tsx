import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGuidesByPillar } from "../lib/guideRegistry";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./ChinaEntryGuidesPage.module.css";

const SITE_URL = "https://homegroundchina.com";
const PAGE_PATH = "/guides/china-entry-requirements/";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const plannerHref =
  "/?utm_source=china-entry-guides&utm_medium=owned&utm_campaign=trip-conversation&utm_content=entry-hub-cta&planner=destinations#route-finder";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}

function getGuideLabel(guide: ReturnType<typeof getGuidesByPillar>[number]) {
  if (guide.audienceMarkets.includes("uk")) {
    return "UK passport guide";
  }

  if (guide.audienceMarkets.includes("us")) {
    return "US passport guide";
  }

  return "Transit route guide";
}

function createStructuredData() {
  const guides = getGuidesByPillar("entry-rules", "en");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "China Entry Guides",
        description:
          "Current China entry rules by passport, travel purpose and route, with official-source guides for UK, US and eligible transit travellers.",
        inLanguage: "en",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: "Homeground",
          url: `${SITE_URL}/`,
        },
        mainEntity: {
          "@id": `${PAGE_URL}#guide-list`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#guide-list`,
        numberOfItems: guides.length,
        itemListElement: guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: guide.canonicalUrl,
          item: {
            "@type": "Article",
            "@id": `${guide.canonicalUrl}#article`,
            headline: guide.headline,
            description: guide.description,
            dateModified: guide.dateModified,
            inLanguage: "en",
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Travel guides",
            item: `${SITE_URL}/guides/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "China entry guides",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };
}

export function ChinaEntryGuidesPage() {
  const guides = getGuidesByPillar("entry-rules", "en");
  const latestReview = guides
    .map((guide) => guide.sourceReviewedDate)
    .sort()
    .at(-1);
  const structuredData = createStructuredData();

  return (
    <div className={styles.pageRoot} lang="en">
      <a className={styles.skipLink} href="#entry-guides-main">
        Skip to the entry guides
      </a>

      <HomegroundHeader
        locale="en"
        pageContext="guides"
        showLanguageNav={false}
      />

      <main id="entry-guides-main" tabIndex={-1}>
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
                <li aria-current="page">China entry guides</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>Homeground entry desk</p>
            <h1>China entry guides</h1>
            <p className={styles.lead}>
              Current entry rules by passport, travel purpose and exact route.
              Start with the rule that applies to your trip—then build the
              itinerary around what remains.
            </p>
            <p className={styles.boundary}>
              Official-source travel guidance only. Homeground does not file
              visa applications, decide personal eligibility or request
              passport uploads.
            </p>
          </div>

          <div className={styles.rulePanel} aria-label="Three entry checks">
            <p>Start with three facts</p>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <strong>Passport</strong>
                  <small>Nationality and exact document type</small>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Purpose</strong>
                  <small>Tourism, transit, work or another reason</small>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Route</strong>
                  <small>Where you enter and where you travel next</small>
                </div>
              </li>
            </ol>
          </div>
        </header>

        <section
          className={styles.guideCollection}
          aria-labelledby="entry-collection-title"
        >
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>Current entry guides</p>
              <h2 id="entry-collection-title">
                Choose the passport and route you actually hold.
              </h2>
            </div>
            <div>
              <p>
                These pages separate published facts from planning
                interpretation and keep their verification dates visible.
              </p>
              {latestReview ? (
                <p className={styles.reviewDate}>
                  Latest source review{" "}
                  <time dateTime={latestReview}>
                    {formatDate(latestReview)}
                  </time>
                </p>
              ) : null}
            </div>
          </div>

          <ol className={styles.guideGrid}>
            {guides.map((guide, index) => (
              <li key={guide.id}>
                <article>
                  <Link href={guide.canonicalPath}>
                    <figure>
                      <img
                        src={guide.cardImagePath}
                        alt={guide.heroAlt}
                        width={guide.cardImageWidth}
                        height={guide.cardImageHeight}
                        loading={index === 0 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        decoding="async"
                      />
                    </figure>
                    <div className={styles.cardBody}>
                      <p>
                        {getGuideLabel(guide)}
                        <span aria-hidden="true">·</span>
                        <time dateTime={guide.sourceReviewedDate}>
                          checked {formatDate(guide.sourceReviewedDate)}
                        </time>
                      </p>
                      <h3>{guide.headline}</h3>
                      <p>{guide.description}</p>
                      <span className={styles.cardAction}>
                        Read the guide
                        <ArrowRight aria-hidden="true" size={18} />
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section
          className={styles.ruleTypes}
          aria-labelledby="entry-rule-types-title"
        >
          <div className={styles.ruleTypesIntro}>
            <p className={styles.darkEyebrow}>Why routes matter</p>
            <h2 id="entry-rule-types-title">
              “Visa-free” can describe two very different entry paths.
            </h2>
          </div>
          <div className={styles.ruleTypeGrid}>
            <article>
              <span>A</span>
              <h3>Passport-based waiver</h3>
              <p>
                The published rule starts with nationality, passport type,
                purpose and length of stay. The current UK guide is an example.
              </p>
            </article>
            <article>
              <span>B</span>
              <h3>Route-based transit</h3>
              <p>
                The next confirmed country or region can decide whether a
                transit exemption applies. The 240-hour route check shows why
                a round trip and an onward route are not the same.
              </p>
            </article>
          </div>
        </section>

        <section className={styles.protocol} aria-labelledby="protocol-title">
          <div>
            <p className={styles.eyebrow}>How we publish</p>
            <h2 id="protocol-title">Policy pages need an expiry habit.</h2>
          </div>
          <ul>
            <li>Use official government and embassy sources first.</li>
            <li>Show the date on which those sources were checked.</li>
            <li>Separate the published rule from route-planning interpretation.</li>
            <li>Send unusual passport or legal cases to the competent authority.</li>
          </ul>
        </section>

        <section className={styles.cta} aria-labelledby="entry-cta-title">
          <p className={styles.darkEyebrow}>Once entry is clear</p>
          <div>
            <h2 id="entry-cta-title">Now plan the trip, not the paperwork.</h2>
            <div>
              <p>
                Share your dates, wish list and whatever route you already
                have. A Homeground planner will help determine the right
                planning scope before any paid work begins.
              </p>
              <a href={plannerHref}>
                Start my free trip brief
                <ArrowRight aria-hidden="true" size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <HomegroundFooter locale="en" pageContext="guides" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
    </div>
  );
}
