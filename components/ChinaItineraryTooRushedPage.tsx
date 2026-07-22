import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  CalendarClock,
  Check,
  Luggage,
} from "lucide-react";
import { getHomegroundCopy } from "../lib/homegroundI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./ChinaItineraryTooRushedPage.module.css";

const pageUrl =
  "https://homegroundchina.com/guides/is-your-china-itinerary-too-rushed/";
const socialImageUrl =
  "https://homegroundchina.com/images/guides/china-itinerary-reality/transfer-platform-soft-focus-1200.webp";

const quickChecks = [
  {
    href: "#city-changes",
    number: "01",
    label: "Base changes",
    title: "Count moves, not only cities",
    detail: "Every check-out and check-in takes usable time from the trip.",
  },
  {
    href: "#transfer-days",
    number: "02",
    label: "Transfer days",
    title: "Make the whole door-to-door journey visible",
    detail: "The time on a ticket is only one part of the moving day.",
  },
  {
    href: "#hotel-moves",
    number: "03",
    label: "Hotel moves",
    title: "Treat a new base as a cost",
    detail: "A hotel move should earn its place in the route.",
  },
  {
    href: "#fixed-bookings",
    number: "04",
    label: "Fixed bookings",
    title: "Protect the hard edges",
    detail: "A timed visit should not depend on a long move working perfectly.",
  },
  {
    href: "#fatigue-chains",
    number: "05",
    label: "Fatigue chains",
    title: "Read consecutive days together",
    detail: "Late arrivals and early starts can compound quickly.",
  },
] as const;

const faqItems = [
  {
    question: "How many cities can you realistically visit in China?",
    answer:
      "There is no fixed number that works for every trip. Count overnight bases, door-to-door transfer days, hotel changes and the pace of the people travelling. Four cities can be comfortable in one route and fragile in another.",
  },
  {
    question: "What makes a China itinerary feel rushed?",
    answer:
      "The usual problem is not one busy day. It is a chain of base changes, partial arrival days, timed bookings, early starts and high-walking days with no room for delay or recovery.",
  },
  {
    question: "Is a fast China itinerary always a bad itinerary?",
    answer:
      "No. Some travellers deliberately choose a compact trip. It works when the trade-offs are visible, the group accepts the pace and the important days do not all depend on perfect transfers.",
  },
  {
    question: "Should I remove a city from my China trip?",
    answer:
      "Remove a city only when doing so returns something you actually value: a full sightseeing day, one less hotel move, protection around a fixed booking or a usable recovery window.",
  },
  {
    question: "Does the free Route Finder include a human itinerary review?",
    answer:
      "No. The Route Finder is a free automated starting point for travellers who are still exploring. Human review of a usable day-by-day draft is a separate fixed-scope service priced at US$69.",
  },
] as const;

function TransferScene({
  name,
  sizes,
}: {
  name:
    | "transfer-platform-soft-focus"
    | "train-cabin-soft-focus"
    | "airport-waiting-soft-focus";
  sizes: string;
}) {
  const base = `/images/guides/china-itinerary-reality/${name}`;

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${base}-480.webp 480w, ${base}-768.webp 768w, ${base}-1200.webp 1200w`}
        sizes={sizes}
      />
      <img
        src={`${base}-768.webp`}
        alt=""
        width={768}
        height={512}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

function createStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        headline: "Is Your China Itinerary Too Rushed?",
        description:
          "A practical China itinerary check for city changes, door-to-door transfers, hotel moves, fixed bookings and recovery time.",
        image: socialImageUrl,
        datePublished: "2026-07-22",
        dateModified: "2026-07-22",
        inLanguage: "en",
        mainEntityOfPage: pageUrl,
        author: {
          "@type": "Organization",
          name: "Homeground Editorial Team",
          url: "https://homegroundchina.com/studio/",
        },
        publisher: {
          "@type": "Organization",
          name: "Homeground China",
          url: "https://homegroundchina.com/",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
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
            name: "Is Your China Itinerary Too Rushed?",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export function ChinaItineraryTooRushedPage() {
  const homeCopy = getHomegroundCopy("en");
  const plannerHref = `${homeCopy.path}?utm_source=china-itinerary-too-rushed&utm_medium=owned&utm_campaign=article-to-route-finder&utm_content=exploring&planner=destinations#route-finder`;
  const structuredData = createStructuredData();

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.pageRoot}`}
      data-homeground-locale="en"
      lang="en"
    >
      <a className={homeStyles.skipLink} href="#itinerary-article-content">
        Skip to article
      </a>
      <HomegroundHeader
        locale="en"
        pageContext="content"
        showLanguageNav={false}
      />

      <main id="itinerary-article-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroInner}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <ol>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li aria-current="page">China itinerary reality check</li>
                </ol>
              </nav>
              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>China itinerary reality check</p>
                  <h1>Is Your China Itinerary Too Rushed?</h1>
                  <p className={styles.heroLead}>
                    A practical check for city changes, full transfer days, hotel moves,
                    timed visits and the pace your group can actually keep.
                  </p>
                </div>
                <div className={styles.routeStamp} aria-label="What this guide checks">
                  <span>City changes</span>
                  <span aria-hidden="true">→</span>
                  <span>Transfer days</span>
                  <span aria-hidden="true">→</span>
                  <span>Hotel moves</span>
                  <span aria-hidden="true">→</span>
                  <span>Fixed visits</span>
                </div>
              </div>
              <p className={styles.reviewed}>
                By <Link href="/studio/">Homeground Editorial Team</Link>
                {" · Published "}
                <time dateTime="2026-07-22">22 July 2026</time>
                {" · "}Dynamic transport and venue details should be checked again before
                travel.
              </p>
            </div>
          </header>

          <div className={styles.articleShell}>
            <section className={styles.quickAnswer} aria-labelledby="quick-answer-title">
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>Quick answer</p>
                  <h2 id="quick-answer-title">
                    There is no fixed city count that makes a China trip rushed.
                  </h2>
                </div>
                <p>
                  A route with four cities can work for one group and be a poor fit for
                  another. The real test is the chain of base changes, door-to-door
                  transfers, fixed bookings and recovery time between them.
                </p>
              </div>
              <nav className={styles.quickCards} aria-label="Five itinerary checks">
                {quickChecks.map((item) => (
                  <a href={item.href} key={item.href}>
                    <span>{item.number}</span>
                    <small>{item.label}</small>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </a>
                ))}
              </nav>
            </section>

            <div className={styles.articleBody}>
              <section id="city-changes" aria-labelledby="city-changes-title">
                <div className={styles.sectionNumber}>01</div>
                <div className={styles.sectionContent}>
                  <h2 id="city-changes-title">
                    How many cities can you realistically visit in China?
                  </h2>
                  <p>
                    There is no useful universal limit. Start with the places where you
                    sleep, then count how often you actually change base. Two routes can
                    contain Beijing, Xi’an, Chengdu and Shanghai yet demand a completely
                    different amount of effort.
                  </p>
                  <p>
                    One may move in a clean sequence with several nights in each place. The
                    other may add a one-night stop, an arrival-day flight and a hotel switch
                    inside a short stay. On a map, both appear to be four cities. On the
                    ground, they are not the same trip.
                  </p>
                  <ul>
                    <li>How many times will you check out, carry luggage and check in again?</li>
                    <li>Does every short stay have a clear reason?</li>
                    <li>
                      Is a one-night stop giving you a real visit, or only proving that you
                      were there?
                    </li>
                    <li>Is the route moving in one direction, or doubling back?</li>
                  </ul>
                </div>
              </section>

              <figure className={styles.transferSequence}>
                <div className={styles.transferSequenceGrid}>
                  <div className={styles.transferVisual}>
                    <TransferScene
                      name="transfer-platform-soft-focus"
                      sizes="(max-width: 680px) calc(100vw - 2.5rem), 34rem"
                    />
                  </div>
                  <div className={styles.transferVisual}>
                    <TransferScene
                      name="train-cabin-soft-focus"
                      sizes="(max-width: 680px) calc((100vw - 3rem) / 2), 17rem"
                    />
                  </div>
                  <div className={styles.transferVisual}>
                    <TransferScene
                      name="airport-waiting-soft-focus"
                      sizes="(max-width: 680px) calc((100vw - 3rem) / 2), 17rem"
                    />
                  </div>
                </div>
                <figcaption>
                  <p>A transfer day is made of the moments around the ticket, too.</p>
                </figcaption>
              </figure>

              <section id="transfer-days" aria-labelledby="transfer-days-title">
                <div className={styles.sectionNumber}>02</div>
                <div className={styles.sectionContent}>
                  <h2 id="transfer-days-title">
                    Turn every train or flight into a full transfer.
                  </h2>
                  <p>
                    The duration printed on a ticket is not the whole journey. China
                    Railway’s own guidance describes station-side steps such as entering the
                    station, security, gates and boarding in addition to the train itself.
                    Read the specific station and ticket guidance for your journey before
                    travel.
                  </p>
                  <ol className={styles.transferSteps}>
                    <li>
                      <span>1</span>
                      <p>
                        <b>Leaving the hotel</b> — check-out, luggage and the ride to the
                        station or airport.
                      </p>
                    </li>
                    <li>
                      <span>2</span>
                      <p>
                        <b>The departure side</b> — entry, security, finding the gate or
                        platform and boarding.
                      </p>
                    </li>
                    <li>
                      <span>3</span>
                      <p>
                        <b>The transport itself</b> — train or flight time is one segment,
                        not the whole day.
                      </p>
                    </li>
                    <li>
                      <span>4</span>
                      <p>
                        <b>The arrival side</b> — leaving the station or airport, reaching
                        the new hotel, checking in and getting oriented.
                      </p>
                    </li>
                    <li>
                      <span>5</span>
                      <p>
                        <b>The first real activity</b> — decide whether it still deserves to
                        be on that day.
                      </p>
                    </li>
                  </ol>
                  <p className={styles.sourceCallout}>
                    See our{" "}
                    <Link href="/guides/beijing-zhangjiajie-shanghai-transport/">
                      door-to-door Beijing–Zhangjiajie–Shanghai transport comparison
                    </Link>{" "}
                    for a worked planning example, and read the{" "}
                    <a href="https://www.12306.cn/en/faq.html?item=1" rel="noreferrer">
                      China Railway English FAQ
                    </a>{" "}
                    for current official rail guidance. Individual station procedures and
                    ticket rules can change.
                  </p>
                </div>
              </section>

              <section id="hotel-moves" aria-labelledby="hotel-moves-title">
                <div className={styles.sectionNumber}>03</div>
                <div className={styles.sectionContent}>
                  <h2 id="hotel-moves-title">
                    Treat a hotel move as a cost, not a blank space.
                  </h2>
                  <p>
                    It is easy to write only “transfer to new hotel” and make a day look
                    open. In reality, that move can split the day into two weak halves. A
                    new base earns its place only when the benefit is clear.
                  </p>
                  <div className={styles.comparison}>
                    <div>
                      <BedDouble aria-hidden="true" size={24} />
                      <h3>A move is earning its place when it protects</h3>
                      <ul>
                        <li>a better next-day starting point;</li>
                        <li>less repeated travel or walking;</li>
                        <li>a fixed visit that would otherwise be too exposed.</li>
                      </ul>
                    </div>
                    <div>
                      <Luggage aria-hidden="true" size={24} />
                      <h3>A single base may be stronger when it protects</h3>
                      <ul>
                        <li>a full morning or easier arrival day;</li>
                        <li>more room for luggage and check-in friction;</li>
                        <li>the energy of a parent, child or slower walker.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section id="fixed-bookings" aria-labelledby="fixed-bookings-title">
                <div className={styles.sectionNumber}>04</div>
                <div className={styles.sectionContent}>
                  <h2 id="fixed-bookings-title">Put fixed bookings before flexible ideas.</h2>
                  <p>
                    A timed-entry museum, performance, train or flight creates a hard edge in
                    the day. Put it on the route before loose ideas such as “wander the
                    neighbourhood” or “see another attraction if there is time.”
                  </p>
                  <p>
                    Reservation systems, opening hours and operating notices can change.
                    Check the official page for the particular museum, park or attraction
                    you care about rather than relying on a generic rule copied from another
                    itinerary.
                  </p>
                  <div className={styles.fixedRule}>
                    <CalendarClock aria-hidden="true" size={27} />
                    <p>
                      If a fixed visit matters, avoid making it depend on a long transfer
                      arriving exactly as planned.
                    </p>
                  </div>
                </div>
              </section>

              <section id="fatigue-chains" aria-labelledby="fatigue-chains-title">
                <div className={styles.sectionNumber}>05</div>
                <div className={styles.sectionContent}>
                  <h2 id="fatigue-chains-title">
                    Look for fatigue chains, not isolated busy days.
                  </h2>
                  <p>
                    An isolated early start may be manageable for some travellers. Several
                    early starts after a late arrival, a long transfer and a high-walking day
                    create a different problem. Read the trip top to bottom and look for
                    patterns that have no recovery window.
                  </p>
                  <div className={styles.fatigueBoard} aria-label="Examples of fatigue chains">
                    <div>
                      <span>Late arrival</span>
                      <ArrowRight aria-hidden="true" size={17} />
                      <span>Early start</span>
                    </div>
                    <div>
                      <span>Long transfer</span>
                      <ArrowRight aria-hidden="true" size={17} />
                      <span>Timed entry</span>
                    </div>
                    <div>
                      <span>High walking day</span>
                      <ArrowRight aria-hidden="true" size={17} />
                      <span>More stairs tomorrow</span>
                    </div>
                  </div>
                  <p>
                    You do not need to empty every day. You need to know which days cannot
                    absorb a delay, a changed plan or a lower-energy morning.
                  </p>
                </div>
              </section>

              <section id="remove-a-city" aria-labelledby="remove-a-city-title">
                <div className={styles.sectionNumber}>06</div>
                <div className={styles.sectionContent}>
                  <h2 id="remove-a-city-title">
                    Remove a city only when it gives something specific back.
                  </h2>
                  <p>
                    There is no universal rule that says three cities are better than four.
                    A city is worth removing when doing so returns a full sightseeing day,
                    one less hotel move, space around a non-negotiable booking or a usable
                    recovery window for the people travelling.
                  </p>
                  <p>
                    Do not remove a place merely because a generic itinerary says so. Remove
                    it when there is no other way to protect the parts of the trip you care
                    about most.
                  </p>
                </div>
              </section>

              <section id="compact-comfortable" aria-labelledby="compact-comfortable-title">
                <div className={styles.sectionNumber}>07</div>
                <div className={styles.sectionContent}>
                  <h2 id="compact-comfortable-title">
                    Compact is not the same as comfortable.
                  </h2>
                  <div className={styles.paceTableWrap}>
                    <table className={styles.paceTable}>
                      <thead>
                        <tr>
                          <th scope="col">A compact route</th>
                          <th scope="col">A more comfortable route</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>More city changes and a fuller wish list.</td>
                          <td>Fewer base changes and clearer priorities.</td>
                        </tr>
                        <tr>
                          <td>A transfer day still contains a major fixed activity.</td>
                          <td>The move is light, or the fixed activity is protected.</td>
                        </tr>
                        <tr>
                          <td>Every day needs to go exactly to plan.</td>
                          <td>A delay does not erase the only meaningful activity.</td>
                        </tr>
                        <tr>
                          <td>The fastest traveller sets the rhythm.</td>
                          <td>The pace reflects the people actually travelling.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p>
                    Neither style is automatically better. Some travellers knowingly choose
                    a packed trip. The useful question is whether the route matches the pace
                    you have chosen, rather than quietly demanding more than you expected.
                  </p>
                </div>
              </section>
            </div>

            <section className={styles.workedExample} aria-labelledby="worked-example-title">
              <div className={styles.exampleIntro}>
                <p className={styles.sectionLabel}>Illustrative example — not a client trip</p>
                <h2 id="worked-example-title">
                  Ten travel days, four bases: where a fragile sequence appears.
                </h2>
                <p>
                  Imagine a couple with ten travel days, four hotel bases and three
                  intercity moves. One transfer day includes a timed museum. The next
                  morning has an early train. No single item is automatically wrong —
                  together, they make two days depend on every transfer and check-in going
                  smoothly.
                </p>
              </div>
              <div className={styles.exampleGrid}>
                <div>
                  <span>Option A</span>
                  <h3>Keep the cities</h3>
                  <p>
                    Move the timed visit onto a full day and make the travel day
                    intentionally light.
                  </p>
                </div>
                <div>
                  <span>Option B</span>
                  <h3>Keep the visit</h3>
                  <p>
                    Remove one hotel move so the fixed booking no longer sits beside an
                    unstable day.
                  </p>
                </div>
                <div>
                  <span>Option C</span>
                  <h3>Protect the priorities</h3>
                  <p>
                    Remove one city and return a complete day to the route instead of adding
                    another partial arrival day.
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.selfCheck} aria-labelledby="self-check-title">
              <div>
                <p className={styles.sectionLabelLight}>A quick self-check before booking</p>
                <h2 id="self-check-title">
                  Look closer after two “yes” answers—or one high-consequence conflict.
                </h2>
                <p className={styles.selfCheckLead}>
                  One conflict is enough when it could cost a non-refundable booking or the
                  only meaningful activity in a city.
                </p>
              </div>
              <div>
                <ul>
                  <li>
                    <Check aria-hidden="true" size={17} />
                    Are you changing cities every one or two nights?
                  </li>
                  <li>
                    <Check aria-hidden="true" size={17} />
                    Does a moving day also contain a timed attraction?
                  </li>
                  <li>
                    <Check aria-hidden="true" size={17} />
                    Are you moving hotels during a short stay?
                  </li>
                  <li>
                    <Check aria-hidden="true" size={17} />
                    Do several early starts follow a late arrival or high-walking day?
                  </li>
                  <li>
                    <Check aria-hidden="true" size={17} />
                    Would one delay remove the only meaningful activity in a city?
                  </li>
                </ul>
              </div>
              <div className={styles.nextStepIntro}>
                <p className={styles.sectionLabelLight}>Choose by what you already have</p>
                <h2>Your next step should match the state of your route.</h2>
              </div>
              <div className={styles.servicePaths}>
                <div>
                  <p>I have a usable day-by-day draft.</p>
                  <Link href="/china-itinerary-review/#review-my-route">
                    Review My Route — US$69
                    <ArrowRight aria-hidden="true" size={18} />
                  </Link>
                </div>
                <div>
                  <p>I have dates and priorities, but no workable route yet.</p>
                  <Link href="/china-itinerary-review/#build-my-route">
                    Build My Route — US$129
                    <ArrowRight aria-hidden="true" size={18} />
                  </Link>
                </div>
                <div>
                  <p>I am still exploring and want an automated starting point.</p>
                  <a href={plannerHref}>
                    Use the free Route Finder
                    <ArrowRight aria-hidden="true" size={18} />
                  </a>
                  <small>No human review is included.</small>
                </div>
              </div>
            </section>

            <section className={styles.faqSection} aria-labelledby="article-faq-title">
              <div className={styles.faqHeading}>
                <p className={styles.sectionLabel}>Common planning questions</p>
                <h2 id="article-faq-title">China itinerary pace: practical answers</h2>
              </div>
              <div className={styles.faqList}>
                {faqItems.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className={styles.sourceNote} aria-labelledby="source-note-title">
              <h2 id="source-note-title">Source and editorial note</h2>
              <p>
                This guide deliberately does not give one fixed “arrive X minutes early”
                rule or a universal city limit. Transport schedules, airport procedures,
                reservation systems and operating notices change. Check the official source
                for the specific train, flight or venue before travel.
              </p>
              <ul>
                <li>
                  <a href="https://www.12306.cn/en/faq.html?item=1" rel="noreferrer">
                    China Railway — English FAQ
                  </a>
                </li>
                <li>
                  <a href="https://intl.dpm.org.cn/visit.html" rel="noreferrer">
                    The Palace Museum — Visit information
                  </a>
                </li>
                <li>
                  <a href="https://en.chnmuseum.cn/visit_692/" rel="noreferrer">
                    National Museum of China — Visit information
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>

      <HomegroundFooter locale="en" pageContext="content" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
