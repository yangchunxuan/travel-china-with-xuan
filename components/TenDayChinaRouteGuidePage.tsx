import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Clock3,
  CloudSun,
  Footprints,
  Luggage,
  MapPinned,
  Plane,
  TrainFront,
} from "lucide-react";
import styles from "./TenDayChinaRouteGuidePage.module.css";

const plannerHref =
  "/?planner=destinations&destinations=beijing-great-wall%2Czhangjiajie%2Cshanghai#route-finder";

const tripCounts = [
  {
    number: "6",
    title: "10 calendar days",
    detail: "Arrive on Day 1, leave on Day 10—usually 9 hotel nights.",
    note: "About six full sightseeing days",
    featured: false,
  },
  {
    number: "7",
    title: "10 hotel nights",
    detail: "Arrive on Day 1, leave on Day 11. This is the version used below.",
    note: "About seven full sightseeing days",
    featured: true,
  },
  {
    number: "10",
    title: "10 full sightseeing days",
    detail: "Arrival, departure and both intercity transfers sit outside the count.",
    note: "Roughly 13 nights / 14 calendar days",
    featured: false,
  },
] as const;

const lengthOptions = [
  {
    nights: "10 nights",
    days: "7 full days",
    split: "Beijing 3 · Zhangjiajie 2 · Shanghai 2",
    verdict: "A compact highlights trip",
    detail:
      "It works only when the flights, pace and priorities cooperate. There is almost no recovery or weather margin.",
    recommended: false,
  },
  {
    nights: "12 nights",
    days: "9 full days",
    split: "Beijing 3 · Zhangjiajie 3 · Shanghai 3",
    verdict: "The balanced first-visit default",
    detail:
      "The third Zhangjiajie day removes the hardest compromise; Shanghai can breathe or hold one day trip.",
    recommended: true,
  },
  {
    nights: "14 nights",
    days: "11 full days",
    split: "Beijing 4 · Zhangjiajie 4 · Shanghai 3",
    verdict: "The comfortable version",
    detail:
      "Best for a slower pace, families, mobility limits or travellers who want one disruption not to damage the route.",
    recommended: false,
  },
] as const;

const calendar = [
  { day: "Day 1", place: "Beijing", label: "Arrive", kind: "edge" },
  { day: "Days 2–4", place: "Beijing", label: "3 full days", kind: "full" },
  {
    day: "Day 5",
    place: "Beijing → Zhangjiajie",
    label: "Transfer day",
    kind: "transfer",
  },
  {
    day: "Days 6–7",
    place: "Zhangjiajie",
    label: "2 full days",
    kind: "full",
  },
  {
    day: "Day 8",
    place: "Zhangjiajie → Shanghai",
    label: "Transfer day",
    kind: "transfer",
  },
  { day: "Days 9–10", place: "Shanghai", label: "2 full days", kind: "full" },
  { day: "Day 11", place: "Shanghai", label: "Depart", kind: "edge" },
] as const;

const cityTradeoffs = [
  {
    number: "03",
    city: "Beijing",
    promise: "Protect the imperial core, a Great Wall day and one additional city day.",
    cost: "Not every palace, museum, neighbourhood and theme park.",
  },
  {
    number: "02",
    city: "Zhangjiajie",
    promise: "Choose park depth, or one compact park day plus Tianmen Mountain.",
    cost: "No reliable way to add every headline attraction—and no weather buffer.",
  },
  {
    number: "02",
    city: "Shanghai",
    promise: "Cover the central city at a useful pace.",
    cost: "Suzhou or Hangzhou replaces a Shanghai day; it is not an extra day.",
  },
] as const;

const hiddenDecisions = [
  {
    icon: Plane,
    title: "Your flight times, not just your dates",
    question: "Do you land early enough to recover, and leave late enough to protect the last day?",
    consequence:
      "A late arrival and early departure can turn ten hotel nights into only five or six genuinely usable days.",
  },
  {
    icon: TrainFront,
    title: "The useful service on your exact day",
    question: "Is the workable option nonstop, which airport or station does it use, and when does it arrive?",
    consequence:
      "The shortest scheduled journey is not always the option that protects the most useful time.",
  },
  {
    icon: MapPinned,
    title: "Where you sleep in Zhangjiajie",
    question: "Does the hotel base support the next day—or add another ground transfer with luggage?",
    consequence:
      "Wulingyuan and downtown Zhangjiajie serve different sightseeing days. The wrong base spends time twice.",
  },
  {
    icon: Footprints,
    title: "The pace your group can actually sustain",
    question: "How much walking, stairs, queueing and early starts are realistic after long-haul travel?",
    consequence:
      "A timetable can be technically possible and still be a poor physical fit for your group.",
  },
  {
    icon: CloudSun,
    title: "Weather, entry times and closures",
    question: "What happens if the mountain day with the best views cannot run as planned?",
    consequence:
      "Two Zhangjiajie days leave no replacement day. A tightly assigned plan has almost no resilience.",
  },
  {
    icon: Luggage,
    title: "Everything you want to add",
    question: "Is Xi’an, Fenghuang, Suzhou or Hangzhou an addition—or a substitution?",
    consequence:
      "A fourth place may fit on paper only by spending the buffer that made the route enjoyable.",
  },
] as const;

const transferSteps = [
  "Hotel checkout",
  "Airport or station transfer",
  "Check-in and buffer",
  "Flight or train",
  "Baggage and exit",
  "Transfer to next hotel",
  "Check-in",
] as const;

const worksWhen = [
  "You arrive early and depart late enough to protect the full days.",
  "A useful nonstop flight or direct train exists on the exact dates.",
  "Your group moves comfortably with normal luggage.",
  "You accept that each city must be edited.",
  "Zhangjiajie has one clear two-day priority.",
] as const;

const chooseLongerWhen = [
  "You are travelling with young children, older parents or limited mobility.",
  "You want meaningful weather protection in Zhangjiajie.",
  "Your arrival is late, departure is early or jet lag usually hits hard.",
  "You want Shanghai plus multiple day trips.",
  "You do not want one delay to damage the rest of the journey.",
] as const;

const preBookingQuestions = [
  {
    question: "What are the local landing and departure times?",
    detail: "Include the airport, immigration, baggage and hotel transfer—not only the date.",
  },
  {
    question: "Which domestic service is useful on those exact dates?",
    detail: "Check the direction, airport or station, nonstop status and hotel arrival time.",
  },
  {
    question: "Where will you sleep before each Zhangjiajie day?",
    detail: "The base should follow the sightseeing logic, not simply the cheapest available hotel.",
  },
  {
    question: "What is genuinely non-negotiable?",
    detail: "Name the must-sees—and the places you would drop if the timetable does not cooperate.",
  },
  {
    question: "What pace is realistic for this group?",
    detail: "Include ages, children, mobility, walking tolerance, luggage and recovery needs.",
  },
  {
    question: "Where is the route allowed to flex?",
    detail: "Decide which day can absorb weather, a poor transport time or a changed entry slot.",
  },
] as const;

const faq = [
  {
    question: "Is 10 days enough for Beijing, Zhangjiajie and Shanghai?",
    answer:
      "Ten calendar days is very tight and normally gives about six full sightseeing days. Ten hotel nights can work as a compact route with about seven full sightseeing days. Twelve nights is the safer general recommendation.",
  },
  {
    question: "How many full days should Zhangjiajie receive?",
    answer:
      "Two full days requires a choice between park depth and variety. Three full days is the stronger first-visit allocation; a fourth can add depth or weather flexibility.",
  },
  {
    question: "Does flying save a full day?",
    answer:
      "Not automatically. Airport access, advance check-in, baggage and the next hotel transfer can still consume most of the day. The departure slot matters as much as the flight duration.",
  },
  {
    question: "Can I add Xi’an, Suzhou or Hangzhou?",
    answer:
      "Xi’an changes this into a compressed four-city route. Suzhou or Hangzhou can work only by replacing a Shanghai day. An addition on the map is usually a subtraction somewhere else.",
  },
] as const;

const structuredData = {
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
      "@id":
        "https://homegroundchina.com/guides/beijing-zhangjiajie-shanghai-10-days/#article",
      url: "https://homegroundchina.com/guides/beijing-zhangjiajie-shanghai-10-days/",
      headline:
        "Beijing–Zhangjiajie–Shanghai in 10 Days: Is It Actually Realistic?",
      description:
        "Can Beijing, Zhangjiajie and Shanghai fit into 10 days? Count the real sightseeing days, see the trade-offs, and test whether your exact trip still works.",
      inLanguage: "en",
      mainEntityOfPage:
        "https://homegroundchina.com/guides/beijing-zhangjiajie-shanghai-10-days/",
      author: { "@id": "https://homegroundchina.com/#organization" },
      publisher: { "@id": "https://homegroundchina.com/#organization" },
      about: [
        { "@type": "Place", name: "Beijing" },
        { "@type": "Place", name: "Zhangjiajie" },
        { "@type": "Place", name: "Shanghai" },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://homegroundchina.com/guides/beijing-zhangjiajie-shanghai-10-days/#breadcrumb",
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
          name: "Beijing–Zhangjiajie–Shanghai in 10 days",
          item:
            "https://homegroundchina.com/guides/beijing-zhangjiajie-shanghai-10-days/",
        },
      ],
    },
  ],
};

function Brand() {
  return (
    <Link className={styles.brand} href="/" aria-label="Homeground China home">
      <span className={styles.brandMark} aria-hidden="true">
        <span />
      </span>
      <span className={styles.brandCopy}>
        <strong>Homeground</strong>
        <small>China, shaped around you</small>
      </span>
    </Link>
  );
}

export function TenDayChinaRouteGuidePage() {
  return (
    <div className={styles.pageRoot}>
      <a className={styles.skipLink} href="#article-content">
        Skip to the guide
      </a>

      <header className={styles.siteHeader}>
        <div className={styles.headerInner}>
          <Brand />
          <nav className={styles.primaryNav} aria-label="Primary navigation">
            <a href="/#planning-proof">How planning works</a>
            <a href="/#studio">About Homeground</a>
            <a href="/#faq">Questions</a>
          </nav>
          <a className={styles.headerCta} href={plannerHref}>
            Check my route
          </a>
        </div>
      </header>

      <main id="article-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroInner}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <ol>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li aria-current="page">10-day route check</li>
                </ol>
              </nav>

              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>Whole-route decision guide</p>
                  <h1>
                    Beijing–Zhangjiajie–Shanghai in 10 Days:
                    <span> Is It Actually Realistic?</span>
                  </h1>
                  <p className={styles.heroLead}>
                    The route can fit. Your exact trip may not. The answer changes
                    with what “10 days” means, when you land, where you sleep and
                    what your group is willing to leave out.
                  </p>
                </div>

                <aside className={styles.heroAnswer} aria-labelledby="answer-title">
                  <p>Quick answer</p>
                  <h2 id="answer-title">Yes—but as a compact highlights trip.</h2>
                  <div className={styles.heroMetric}>
                    <strong>10</strong>
                    <span>hotel nights</span>
                    <ArrowRight aria-hidden="true" size={20} />
                    <strong>7</strong>
                    <span>full sightseeing days</span>
                  </div>
                  <p>
                    A workable split is 3 days in Beijing, 2 in Zhangjiajie and 2
                    in Shanghai, with both intercity movements treated as transfer
                    days—not bonus sightseeing days.
                  </p>
                </aside>
              </div>

              <div className={styles.routeBand} aria-label="Route overview">
                <span>Beijing</span>
                <i aria-hidden="true" />
                <span>Zhangjiajie</span>
                <i aria-hidden="true" />
                <span>Shanghai</span>
              </div>

              <p className={styles.editorialNote}>
                Homeground planning framework · not a fixed tour product · live
                transport and entry conditions checked again before publication
              </p>
            </div>
          </header>

          <div className={styles.articleBody}>
            <section className={styles.definition} aria-labelledby="definition-title">
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>The first hidden problem</p>
                  <h2 id="definition-title">“10 days” can mean three different trips.</h2>
                </div>
                <p>
                  Before discussing attractions, count the nights and protect the
                  full days. Otherwise two travellers can agree on “10 days” while
                  imagining itineraries four days apart.
                </p>
              </div>

              <div className={styles.countGrid}>
                {tripCounts.map((item) => (
                  <article
                    className={item.featured ? styles.countCardFeatured : styles.countCard}
                    key={item.title}
                  >
                    <span className={styles.countNumber}>{item.number}</span>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    <strong>{item.note}</strong>
                  </article>
                ))}
              </div>

              <p className={styles.planningRule}>
                <Clock3 aria-hidden="true" size={20} />
                A flight or train day does not become a full sightseeing day just
                because dinner or an evening walk may still fit.
              </p>
            </section>

            <section className={styles.lengthDecision} aria-labelledby="length-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>Choose the kind of trip</p>
                <h2 id="length-title">The extra nights buy choices—not just more attractions.</h2>
                <p>
                  These are planning judgements, not packages. Actual transport,
                  arrival times and traveller pace can move a day from one city to
                  another.
                </p>
              </div>

              <div className={styles.lengthGrid}>
                {lengthOptions.map((option) => (
                  <article
                    className={option.recommended ? styles.lengthCardRecommended : styles.lengthCard}
                    key={option.nights}
                  >
                    {option.recommended && <span className={styles.recommendTag}>Homeground default</span>}
                    <div className={styles.lengthTopline}>
                      <h3>{option.nights}</h3>
                      <strong>{option.days}</strong>
                    </div>
                    <p className={styles.lengthSplit}>{option.split}</p>
                    <h4>{option.verdict}</h4>
                    <p>{option.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.calendarSection} aria-labelledby="calendar-title">
              <div className={styles.sectionHeadingSplitLight}>
                <div>
                  <p className={styles.sectionLabelLight}>The 10-night calendar</p>
                  <h2 id="calendar-title">Seven full days is the real inventory.</h2>
                </div>
                <p>
                  The itinerary is not eleven equally usable calendar boxes. It is
                  seven sightseeing days protected by four arrival, departure and
                  transfer days.
                </p>
              </div>

              <ol className={styles.calendar}>
                {calendar.map((item) => (
                  <li data-kind={item.kind} key={`${item.day}-${item.place}`}>
                    <span>{item.day}</span>
                    <strong>{item.place}</strong>
                    <small>{item.label}</small>
                  </li>
                ))}
              </ol>

              <div className={styles.calendarSummary}>
                <span><strong>7</strong> full sightseeing days</span>
                <span><strong>2</strong> transfer days</span>
                <span><strong>2</strong> arrival / departure days</span>
              </div>
            </section>

            <section className={styles.tradeoffs} aria-labelledby="tradeoffs-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>What seven full days can buy</p>
                <h2 id="tradeoffs-title">Every city gets a clear promise—and a clear sacrifice.</h2>
                <p>
                  A credible itinerary says what will be left out. “Everything is
                  possible” is not flexibility; it is a refusal to make the plan.
                </p>
              </div>

              <div className={styles.tradeoffGrid}>
                {cityTradeoffs.map((city) => (
                  <article key={city.city}>
                    <div className={styles.cityCount}>
                      <span>{city.number}</span>
                      <small>full days</small>
                    </div>
                    <h3>{city.city}</h3>
                    <p>{city.promise}</p>
                    <div className={styles.sacrifice}>
                      <CircleAlert aria-hidden="true" size={18} />
                      <span>{city.cost}</span>
                    </div>
                  </article>
                ))}
              </div>

              <Link className={styles.textLink} href="/guides/zhangjiajie-itinerary/#quick-answer">
                See what actually fits in 2, 3 or 4 full Zhangjiajie days
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </section>

            <section className={styles.diagnostic} aria-labelledby="diagnostic-title">
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>Why your version may change</p>
                  <h2 id="diagnostic-title">This is not one itinerary. It is six linked decisions.</h2>
                </div>
                <p>
                  Each answer can change the next one. That is why copying a day
                  list before checking the real journey often produces a plan that
                  looks tidy but fails door to door.
                </p>
              </div>

              <ol className={styles.diagnosticList}>
                {hiddenDecisions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title}>
                      <div className={styles.diagnosticIndex}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <Icon aria-hidden="true" size={22} strokeWidth={1.6} />
                      </div>
                      <div>
                        <h3>{item.title}</h3>
                        <p className={styles.diagnosticQuestion}>{item.question}</p>
                        <p>{item.consequence}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className={styles.transferSection} aria-labelledby="transfer-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>The transfer-day test</p>
                <h2 id="transfer-title">A 2½-hour flight is not a 2½-hour travel day.</h2>
                <p>
                  Compare hotel to hotel, not runway to runway. The correct
                  transport choice can still consume the day.
                </p>
              </div>

              <figure className={styles.transferFormula}>
                <figcaption>Count the complete movement</figcaption>
                <ol>
                  {transferSteps.map((step, index) => (
                    <li key={step}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{step}</strong>
                    </li>
                  ))}
                </ol>
              </figure>

              <p className={styles.directionNote}>
                <strong>Beijing first or Shanghai first?</strong> Either direction
                can work. Compare the international flight times and the useful
                domestic service in the correct direction; schedules are not
                perfectly symmetrical.
              </p>

              <Link className={styles.textLink} href="/guides/beijing-zhangjiajie-shanghai-transport/">
                Compare the real train and flight time
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </section>

            <section className={styles.fitTest} aria-labelledby="fit-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>An honest fit test</p>
                <h2 id="fit-title">Ten nights is reasonable for some travellers—not all.</h2>
              </div>

              <div className={styles.fitGrid}>
                <article className={styles.worksCard}>
                  <h3><Check aria-hidden="true" size={21} /> Keep 10 nights when…</h3>
                  <ul>
                    {worksWhen.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
                <article className={styles.longerCard}>
                  <h3><CircleAlert aria-hidden="true" size={21} /> Choose 12+ nights when…</h3>
                  <ul>
                    {chooseLongerWhen.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              </div>
            </section>

            <section className={styles.questions} aria-labelledby="questions-title">
              <div className={styles.sectionHeadingSplit}>
                <div>
                  <p className={styles.sectionLabel}>Before booking anything</p>
                  <h2 id="questions-title">Answer these six questions with real information.</h2>
                </div>
                <p>
                  If several answers are still unknown, you do not yet have a
                  finished itinerary. You have a promising route idea that still
                  needs checking.
                </p>
              </div>

              <ol className={styles.questionList}>
                {preBookingQuestions.map((item, index) => (
                  <li key={item.question}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{item.question}</h3>
                      <p>{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className={styles.trustSection} aria-labelledby="trust-title">
              <div className={styles.trustIntro}>
                <p className={styles.sectionLabelLight}>What Homeground would check</p>
                <h2 id="trust-title">The calendar first. The quote later.</h2>
                <p>
                  We would not start by forcing your dates into a fixed package. We
                  would first test whether the route protects what matters to your
                  group—and tell you where it does not.
                </p>
              </div>

              <ol className={styles.methodGrid}>
                <li>
                  <span>01</span>
                  <h3>Count</h3>
                  <p>Turn dates and flight times into genuine full sightseeing days.</p>
                </li>
                <li>
                  <span>02</span>
                  <h3>Check</h3>
                  <p>Match the useful train or flight to the correct direction and hotel base.</p>
                </li>
                <li>
                  <span>03</span>
                  <h3>Stress-test</h3>
                  <p>Add luggage, pace, weather exposure, tickets and the group’s must-sees.</p>
                </li>
                <li>
                  <span>04</span>
                  <h3>Edit</h3>
                  <p>Show what fits, what must move and what should be removed before pricing.</p>
                </li>
              </ol>

              <p className={styles.boundaryStatement}>
                The fixed arithmetic is shown on this page. Live schedules and
                access conditions are rechecked for the traveller’s dates. The
                final route recommendation remains a planning judgement—not a
                promise that disruption cannot happen.
              </p>
            </section>

            <section className={styles.faqSection} aria-labelledby="faq-title">
              <div className={styles.sectionHeading}>
                <p className={styles.sectionLabel}>Short answers</p>
                <h2 id="faq-title">Questions travellers usually ask next</h2>
              </div>
              <div className={styles.faqList}>
                {faq.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className={styles.finalCta} aria-labelledby="cta-title">
              <div>
                <p className={styles.sectionLabelLight}>Check the trip you actually have</p>
                <h2 id="cta-title">Bring us your dates—not just the number “10.”</h2>
                <p>
                  Send the arrival and departure times, group profile and must-see
                  list. Homeground will count the real sightseeing days, flag the
                  timing conflict and identify what still needs live confirmation
                  before a quote is prepared.
                </p>
              </div>
              <div className={styles.ctaAction}>
                <a href={plannerHref}>
                  Check my trip timing
                  <ArrowRight aria-hidden="true" size={19} />
                </a>
                <small>No instant package. No obligation to keep every city.</small>
              </div>
            </section>

            <aside className={styles.sourceNote} aria-labelledby="method-title">
              <details>
                <summary id="method-title">Editorial method and source boundary</summary>
                <div>
                  <p>
                    This guide separates visible calendar arithmetic, live transport
                    or operating information, and Homeground planning judgement.
                    Timetables are examples of scale, not permanent service promises.
                  </p>
                  <ul>
                    <li><a href="https://www.12306.cn/en/faq.html">China Railway 12306 English FAQ</a></li>
                    <li><a href="https://english.beijing.gov.cn/travellinginbeijing/transportation/airport/202005/t20200516_1899220.html">Beijing municipal airport transport guidance</a></li>
                    <li><a href="https://www.shanghaiairport.com/ensh/dmjt/index.html">Shanghai Airport ground transport</a></li>
                    <li><a href="https://enghunan.gov.cn/hneng/News/Localnews/202506/t20250623_33717855.html">Hunan government Zhangjiajie reservation and weather notice</a></li>
                  </ul>
                  <p>
                    The public page remains out of search until a final sample check,
                    new image rights review and browser QA are complete.
                  </p>
                </div>
              </details>
            </aside>
          </div>

          <script
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
            }}
            type="application/ld+json"
          />
        </article>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Brand />
          <nav aria-label="Footer navigation">
            <Link href="/guides/zhangjiajie-itinerary/">Zhangjiajie guide</Link>
            <Link href="/privacy/">Privacy</Link>
            <a href={plannerHref}>Check my route</a>
          </nav>
        </div>
        <p>© {new Date().getFullYear()} Homeground China. Private China trip planning.</p>
      </footer>
    </div>
  );
}
