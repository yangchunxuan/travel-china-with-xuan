import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CircleAlert,
  ExternalLink,
  Plane,
  ShieldCheck,
} from "lucide-react";
import {
  VISA_FREE_ENTRY_DESCRIPTION,
  VISA_FREE_ENTRY_LAST_CHECKED,
  VISA_FREE_ENTRY_MODIFIED,
  VISA_FREE_ENTRY_POLICY_END,
  VISA_FREE_ENTRY_POLICY_START,
  VISA_FREE_ENTRY_PUBLISHED,
  VISA_FREE_ENTRY_SOURCES,
  VISA_FREE_ENTRY_TITLE,
  VISA_FREE_ENTRY_URL,
} from "../lib/visaFreeEntry";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import styles from "./VisaFreeEntryPage.module.css";

const plannerHref =
  "/?utm_source=visa-free-entry&utm_medium=organic-content&utm_campaign=article-to-route-finder&planner=destinations#route-finder";
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatPolicyDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`));
}

const entryComparison = [
  {
    label: "Route",
    waiver: "No third-country journey is required",
    transit: "You must be travelling onward to a third country or region",
  },
  {
    label: "Maximum stay",
    waiver: "Up to 30 calendar days",
    transit: "Up to 240 hours",
  },
  {
    label: "Where it applies",
    waiver: "Ports open to foreign nationals, subject to the published rules",
    transit: "Designated ports and permitted stay areas",
  },
] as const;

function createStructuredData() {
  const breadcrumbId = `${VISA_FREE_ENTRY_URL}#breadcrumb`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${VISA_FREE_ENTRY_URL}#article`,
        headline: VISA_FREE_ENTRY_TITLE,
        description: VISA_FREE_ENTRY_DESCRIPTION,
        datePublished: VISA_FREE_ENTRY_PUBLISHED,
        dateModified: VISA_FREE_ENTRY_MODIFIED,
        inLanguage: "en",
        mainEntityOfPage: VISA_FREE_ENTRY_URL,
        author: {
          "@id": "https://homegroundchina.com/#organization",
        },
        publisher: {
          "@id": "https://homegroundchina.com/#organization",
          "@type": "Organization",
          name: "Homeground China",
          url: "https://homegroundchina.com/",
        },
        breadcrumb: {
          "@id": breadcrumbId,
        },
        citation: VISA_FREE_ENTRY_SOURCES.map((source) => source.url),
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
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
            name: "2026 visa-free entry",
            item: VISA_FREE_ENTRY_URL,
          },
        ],
      },
    ],
  };
}

export function VisaFreeEntryPage() {
  const structuredData = createStructuredData();

  return (
    <div className={styles.pageRoot} data-homeground-locale="en" lang="en">
      <a className={styles.skipLink} href="#visa-free-content">
        Skip to the policy summary
      </a>
      <HomegroundHeader pageContext="content" showLanguageNav={false} />

      <main id="visa-free-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroInner}>
              <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/guides/">Travel guides</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">2026 visa-free entry</span>
              </nav>
              <p className={styles.eyebrow}>
                Entry policy · Official-source check
              </p>
              <h1>{VISA_FREE_ENTRY_TITLE}</h1>
              <p className={styles.deck}>
                Holders of valid UK or Canadian ordinary passports can currently
                enter mainland China without a visa for up to 30 days for
                tourism, business, visiting family or friends, exchange visits
                or transit.
              </p>
              <div className={styles.reviewLine}>
                <ShieldCheck aria-hidden="true" size={18} />
                Last checked against Chinese official sources:{" "}
                <time dateTime={VISA_FREE_ENTRY_LAST_CHECKED}>
                  {formatPolicyDate(VISA_FREE_ENTRY_LAST_CHECKED)}
                </time>
              </div>
            </div>
          </header>

          <section
            className={styles.expiryNotice}
            aria-labelledby="time-limit-title"
          >
            <CircleAlert aria-hidden="true" size={24} />
            <div>
              <h2 id="time-limit-title">This policy has an end date</h2>
              <p>
                The announced window runs from{" "}
                <time dateTime={VISA_FREE_ENTRY_POLICY_START}>
                  {formatPolicyDate(VISA_FREE_ENTRY_POLICY_START)}
                </time>{" "}
                to{" "}
                <time dateTime={VISA_FREE_ENTRY_POLICY_END}>
                  {formatPolicyDate(VISA_FREE_ENTRY_POLICY_END)}
                </time>
                . Recheck the official notices and your carrier before
                departure, especially for travel close to or after the end date.
              </p>
            </div>
          </section>

          <div className={styles.factGrid} aria-label="Policy at a glance">
            <div>
              <span>Passport</span>
              <strong>Valid UK or Canadian ordinary passport</strong>
            </div>
            <div>
              <span>Maximum stay</span>
              <strong>Up to 30 calendar days</strong>
            </div>
            <div>
              <span>Entry window</span>
              <strong>17 February–31 December 2026</strong>
            </div>
          </div>

          <div className={styles.contentLayout}>
            <aside className={styles.onThisPage}>
              <p>On this page</p>
              <nav aria-label="On this page">
                <a href="#eligibility">Who can use it</a>
                <a href="#entry-check">What border officers may check</a>
                <a href="#transit">30 days vs 240-hour transit</a>
                <a href="#checklist">Before you travel</a>
                <a href="#sources">Official sources</a>
              </nav>
            </aside>

            <div className={styles.articleBody}>
              <section id="eligibility">
                <p className={styles.sectionLabel}>01 · Eligibility</p>
                <h2>Who can use the 30-day visa waiver</h2>
                <p>
                  The policy covers nationals of the United Kingdom and Canada
                  travelling with a <strong>valid ordinary passport</strong>.
                  Eligible travellers may enter for:
                </p>
                <ul className={styles.checkList}>
                  <li>tourism;</li>
                  <li>business;</li>
                  <li>visiting relatives or friends;</li>
                  <li>exchange visits; or</li>
                  <li>transit.</li>
                </ul>
                <p>
                  It applies to both independent travellers and tour groups, and
                  an eligible traveller may depart for China from any country or
                  region. No advance declaration to a Chinese embassy or
                  consulate is required under this waiver.
                </p>
                <div className={styles.plainNote}>
                  <strong>“Ordinary passport” is the important phrase.</strong>
                  <span>
                    Temporary or emergency travel documents do not qualify.
                    Holders of British National (Overseas), diplomatic, service
                    or other special documents should confirm their exact status
                    with a Chinese embassy or consulate before booking.
                  </span>
                </div>
              </section>

              <section id="entry-check">
                <p className={styles.sectionLabel}>02 · At the border</p>
                <h2>Visa-free does not mean document-free</h2>
                <p>
                  Chinese border inspection makes the final admission decision.
                  The official guidance recommends carrying evidence that
                  matches the purpose of the trip, such as return or onward
                  tickets, accommodation bookings and relevant invitation
                  documents.
                </p>
                <p>
                  Your ordinary passport must remain valid for at least the
                  intended stay. The 30-day period is counted from 00:00 on the
                  day after entry and runs for 30 calendar days.
                </p>
                <p>
                  The waiver does not cover work, long-term study, news
                  reporting or other non-qualifying purposes. Travellers planning
                  to stay for more than 30 days should obtain the appropriate
                  visa before travel.
                </p>
              </section>

              <section id="transit">
                <p className={styles.sectionLabel}>03 · Common confusion</p>
                <h2>
                  The 30-day waiver is not the{" "}
                  <span className={styles.noWrap}>240-hour</span> transit policy
                </h2>
                <p>
                  UK and Canadian travellers may appear in information about
                  both policies, but the conditions are different. The rules
                  cannot be combined to create a 40-day stay.
                </p>
                <div className={styles.comparisonWrap}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Rule</th>
                        <th scope="col">30-day UK/Canada waiver</th>
                        <th scope="col">240-hour visa-free transit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entryComparison.map((row) => (
                        <tr key={row.label}>
                          <th scope="row">{row.label}</th>
                          <td>{row.waiver}</td>
                          <td>{row.transit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  className={styles.mobileComparison}
                  aria-label="Entry route comparison"
                >
                  {[
                    {
                      title: "30-day UK/Canada waiver",
                      field: "waiver" as const,
                    },
                    {
                      title: "240-hour visa-free transit",
                      field: "transit" as const,
                    },
                  ].map((policy) => (
                    <section key={policy.field}>
                      <h3>{policy.title}</h3>
                      <dl>
                        {entryComparison.map((row) => (
                          <div key={row.label}>
                            <dt>{row.label}</dt>
                            <dd>{row[policy.field]}</dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ))}
                </div>
                <p className={styles.sourceCue}>
                  The 240-hour policy requires a confirmed onward journey to a
                  third country or region and is limited to designated ports and
                  permitted stay areas. The 30-day waiver does not require that
                  third-country route.
                </p>
              </section>

              <section id="checklist">
                <p className={styles.sectionLabel}>04 · Before departure</p>
                <h2>Five checks before you rely on the waiver</h2>
                <ol className={styles.numberedList}>
                  <li>
                    <strong>Confirm the exact passport category.</strong>
                    <span>
                      Do not assume every British or Canadian travel document is
                      an eligible ordinary passport.
                    </span>
                  </li>
                  <li>
                    <strong>Check your arrival against the policy window.</strong>
                    <span>
                      Travel after 31 December 2026 needs a new official notice
                      or the appropriate visa.
                    </span>
                  </li>
                  <li>
                    <strong>Count the stay from the day after entry.</strong>
                    <span>
                      Avoid using the full allowance without confirming your
                      arrival and departure dates carefully.
                    </span>
                  </li>
                  <li>
                    <strong>Keep supporting bookings easy to show.</strong>
                    <span>
                      Carry your accommodation details, return or onward ticket
                      and any invitation documents relevant to the trip.
                    </span>
                  </li>
                  <li>
                    <strong>Recheck before the non-refundable booking.</strong>
                    <span>
                      Use the official links below and confirm any unusual
                      passport or itinerary case with the carrier or consulate.
                    </span>
                  </li>
                </ol>
              </section>

              <section
                className={styles.plannerPanel}
                aria-labelledby="planner-title"
              >
                <Plane aria-hidden="true" size={28} />
                <div>
                  <p className={styles.sectionLabel}>
                    Once the entry rule is clear
                  </p>
                  <h2 id="planner-title">
                    Check which China route fits your available days
                  </h2>
                  <p>
                    Start with the places you want, your nights in China and your
                    travel pace. A Homeground planner can then review the
                    transport and practical details with you.
                  </p>
                </div>
                <Link href={plannerHref}>
                  Start my trip brief
                  <ArrowRight aria-hidden="true" size={18} />
                </Link>
              </section>

              <section id="sources" className={styles.sources}>
                <p className={styles.sectionLabel}>05 · Verification</p>
                <h2>Official sources used for this guide</h2>
                <p>
                  Entry policies can change. These are the Chinese official
                  pages checked for the summary above.
                </p>
                <ul>
                  {VISA_FREE_ENTRY_SOURCES.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} rel="external">
                        {source.label}
                        <ExternalLink aria-hidden="true" size={15} />
                      </a>
                    </li>
                  ))}
                </ul>
                <div className={styles.reviewStamp}>
                  <CalendarDays aria-hidden="true" size={19} />
                  <span>
                    Reviewed{" "}
                    <time dateTime={VISA_FREE_ENTRY_LAST_CHECKED}>
                      {formatPolicyDate(VISA_FREE_ENTRY_LAST_CHECKED)}
                    </time>
                    . Homeground will recheck this page before the announced
                    policy end date.
                  </span>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>

      <HomegroundFooter pageContext="content" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
    </div>
  );
}
