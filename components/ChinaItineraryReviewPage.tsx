import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  CalendarClock,
  Check,
  CircleCheck,
  FileCheck2,
  Footprints,
  Luggage,
  MapPin,
  MoveRight,
  TrainFront,
} from "lucide-react";
import { getHomegroundCopy } from "../lib/homegroundI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./ChinaItineraryReviewPage.module.css";

const pressurePoints = [
  {
    Icon: TrainFront,
    title: "A transfer is more than a train or flight time",
    detail:
      "Hotel check-out, luggage, the departure side, arrival, check-in and the first real activity all belong to the same day.",
  },
  {
    Icon: BedDouble,
    title: "A hotel move is not empty space",
    detail:
      "A second base can be useful, but it needs to buy back something meaningful: a protected morning, less walking or a calmer next day.",
  },
  {
    Icon: CalendarClock,
    title: "A timed visit changes the whole day",
    detail:
      "A fixed entry, performance, train or flight creates a hard edge. It should not quietly depend on a long move going perfectly.",
  },
  {
    Icon: Footprints,
    title: "Fatigue collects in chains",
    detail:
      "Late arrivals, early starts, stairs and long walking days are manageable alone. Together, they can make a route fragile.",
  },
  {
    Icon: Luggage,
    title: "A map cannot show the group’s pace",
    detail:
      "Parents, children, slower walkers and travellers who value a slower morning need their own definition of a comfortable day.",
  },
] as const;

const reviewOutputs = [
  {
    title: "Day-by-day reality map",
    detail: "Workable, tight or fragile — with the reason beside each day.",
    Icon: MapPin,
  },
  {
    title: "Transfer-day check",
    detail:
      "Door-to-door pressure is flagged where a city-change day can alter the route.",
    Icon: TrainFront,
  },
  {
    title: "Keep / Move / Remove",
    detail: "The first changes worth considering, and what time or energy each one returns.",
    Icon: MoveRight,
  },
  {
    title: "Hotel-base check",
    detail: "Where a move earns its place, and where a single base may protect the trip.",
    Icon: BedDouble,
  },
  {
    title: "Official recheck list",
    detail: "The operating details that deserve a fresh look before travel.",
    Icon: FileCheck2,
  },
] as const;

const faqItems = [
  {
    question: "What is the difference between Review My Route and Build My Route?",
    answer:
      "Review My Route starts with a usable day-by-day itinerary and tests what works, what is tight and what should change. Build My Route starts with dates, priorities and ideas, then creates the city order, night allocation and route structure.",
  },
  {
    question: "Is the price per person?",
    answer:
      "No. The displayed price covers one shared route for 1–4 travellers within the standard scope.",
  },
  {
    question: "What counts as an overnight base?",
    answer:
      "An overnight base is a place where you check into accommodation and sleep. Changing hotels within the same city can also add work, so include every planned hotel move in your brief.",
  },
  {
    question: "What if my trip is longer than 10 days or includes more than four bases?",
    answer:
      "Send the brief first. We will either quote the additional scope, suggest a smaller decision to solve first or recommend full trip planning. You will not be charged automatically.",
  },
  {
    question: "Do I need confirmed trains, flights or hotels?",
    answer:
      "No. Candidate times and hotel areas are useful, but they do not need to be booked. Open details are labelled as assumptions rather than presented as confirmed facts.",
  },
  {
    question: "Can you work around bookings I have already made?",
    answer:
      "Yes. Tell us which dates, transport, hotels and timed visits are fixed or difficult to change. The route will be assessed around those real constraints.",
  },
  {
    question: "Does Build My Route include a complete sightseeing itinerary?",
    answer:
      "It provides the route structure, day-level focus, transfer logic, hotel-area logic and booking priorities. It does not include a detailed hour-by-hour schedule or a large list of specific hotels, restaurants and activities.",
  },
  {
    question: "Can you plan for children, parents or limited mobility?",
    answer:
      "Yes. Tell us about walking tolerance, stairs, early starts, room needs and what a comfortable day means for your group. These are route inputs, not notes added at the end.",
  },
  {
    question: "When will I receive the route?",
    answer:
      "We confirm the delivery date after checking your brief and before asking you to pay. If you have a decision deadline, include it in the request.",
  },
  {
    question: "Does this page take payment?",
    answer:
      "No. This page records a planning enquiry and the selected service. Any later working scope, commercial terms and delivery arrangements are confirmed directly after we check the request.",
  },
  {
    question: "How do I send my itinerary for review?",
    answer:
      "Start with the short trip check and add a concise route outline or shareable link if useful. After confirming that the standard scope fits, we can request the full working itinerary by reply. Do not send passport or ID images, payment details, QR codes or unredacted booking references.",
  },
  {
    question: "Can Homeground book and coordinate the trip afterwards?",
    answer:
      "Potentially, depending on the route, dates and services required. Full trip planning and ground support have a separate written scope and custom quote.",
  },
] as const;

function ReviewBoard() {
  return (
    <figure className={styles.reviewBoard} aria-labelledby="review-board-title">
      <figcaption id="review-board-title">
        <span>Illustrative review excerpt</span>
        <small>Not a client report</small>
      </figcaption>
      <ol>
        <li data-state="tight">
          <div>
            <span>Day 03</span>
            <strong>Beijing → Xi’an</strong>
          </div>
          <p>
            <b>Tight</b>
            Hotel check-out · rail transfer · fixed entry
          </p>
        </li>
        <li data-state="workable">
          <div>
            <span>Day 04</span>
            <strong>Xi’an</strong>
          </div>
          <p>
            <b>Workable</b>
            Full day protects the timed visit
          </p>
        </li>
        <li data-state="fragile">
          <div>
            <span>Day 05</span>
            <strong>Xi’an → Chengdu</strong>
          </div>
          <p>
            <b>Fragile</b>
            Late arrival followed by an early start
          </p>
        </li>
      </ol>
      <div className={styles.boardLegend} aria-label="Review status legend">
        <span><i data-state="workable" /> Workable</span>
        <span><i data-state="tight" /> Tight</span>
        <span><i data-state="fragile" /> Fragile</span>
      </div>
    </figure>
  );
}

function BeforeAfter() {
  return (
    <div className={styles.beforeAfter}>
      <div className={styles.routeVersion}>
        <p>Before</p>
        <strong>10 nights · 5 bases · 4 city changes</strong>
        <ol>
          <li>Beijing</li>
          <li>Xi’an</li>
          <li>Chengdu</li>
          <li>Hangzhou</li>
          <li>Shanghai</li>
        </ol>
      </div>
      <div className={styles.routeArrow} aria-hidden="true">
        <ArrowRight size={28} />
      </div>
      <div className={`${styles.routeVersion} ${styles.routeVersionAfter}`}>
        <p>After one deliberate choice</p>
        <strong>10 nights · 4 bases · fewer fragile links</strong>
        <ol>
          <li>Beijing</li>
          <li>Xi’an</li>
          <li>Chengdu</li>
          <li>Shanghai</li>
        </ol>
      </div>
    </div>
  );
}

function createStructuredData() {
  const pageUrl = "https://homegroundchina.com/china-itinerary-review/";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "China Itinerary Review & Route Planning",
        description:
          "Have a China itinerary reviewed for US$69, or get a practical route built for US$129 with clear scope before payment.",
        inLanguage: "en",
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "China itinerary review and route planning",
        serviceType: "Independent China itinerary review and route planning",
        areaServed: { "@type": "Country", name: "China" },
        provider: {
          "@type": "Organization",
          "@id": "https://homegroundchina.com/#organization",
          name: "Homeground China",
          url: "https://homegroundchina.com/",
        },
        offers: [
          {
            "@type": "Offer",
            name: "Review My Route",
            price: "69",
            priceCurrency: "USD",
            url: `${pageUrl}#review-my-route`,
            description:
              "A written review of one usable day-by-day China route for 1–4 travellers within the published standard scope.",
          },
          {
            "@type": "Offer",
            name: "Build My Route",
            price: "129",
            priceCurrency: "USD",
            url: `${pageUrl}#build-my-route`,
            description:
              "A written China route structure for 1–4 travellers within the published standard scope.",
          },
        ],
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
            name: "China Itinerary Review & Route Planning",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function ChinaItineraryReviewPage() {
  const homeCopy = getHomegroundCopy("en");
  const plannerBase = `${homeCopy.path}?utm_source=china-itinerary-review&utm_medium=owned`;
  const reviewHref = `${plannerBase}&utm_campaign=route-planning&utm_content=review&service=itinerary-review&planner=destinations#route-finder`;
  const buildHref = `${plannerBase}&utm_campaign=route-planning&utm_content=build&service=route-build&planner=destinations#route-finder`;
  const freeFinderHref = `${plannerBase}&utm_campaign=service-page&utm_content=free-route-finder&planner=destinations#route-finder`;
  const fullSupportHref = `${plannerBase}&utm_campaign=full-trip-support&utm_content=custom-scope&service=full-trip-support&planner=destinations#route-finder`;
  const structuredData = createStructuredData();

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.pageRoot}`}
      data-homeground-locale="en"
      lang="en"
    >
      <a className={homeStyles.skipLink} href="#itinerary-review-content">
        Skip to China route planning
      </a>
      <HomegroundHeader
        locale="en"
        pageContext="content"
        showLanguageNav={false}
      />

      <main id="itinerary-review-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <div className={styles.heroInner}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <ol>
                  <li><Link href="/">Home</Link></li>
                  <li aria-current="page">Route planning</li>
                </ol>
              </nav>

              <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                  <p className={styles.eyebrow}>China itinerary review &amp; route planning</p>
                  <h1>Get the route right before you book the rest.</h1>
                  <p className={styles.heroLead}>
                    Already have a day-by-day plan? We can test where it becomes tight
                    or fragile. Starting with dates, ideas and a wishlist? We can build
                    the route structure first.
                  </p>
                  <div className={styles.heroPrices} aria-label="Route planning prices">
                    <span><b>US$69</b> route review</span>
                    <span><b>US$129</b> route build</span>
                    <span>per trip · 1–4 travellers</span>
                  </div>
                  <div className={styles.heroActions}>
                    <a className={styles.primaryButton} href="#choose-service">
                      Choose my planning path
                      <ArrowRight aria-hidden="true" size={18} />
                    </a>
                    <a className={styles.secondaryButton} href={freeFinderHref}>
                      Try the free Route Finder
                    </a>
                  </div>
                  <p className={styles.heroBoundary}>
                    Both are fixed-scope written services. This page starts an enquiry;
                    it does not take payment or accept file uploads. Bookings and support
                    during the trip are quoted separately around the actual journey.
                  </p>
                </div>
                <ReviewBoard />
              </div>
            </div>
          </header>

          <section className={styles.serviceSection} id="choose-service" aria-labelledby="service-title">
            <div className={styles.sectionHeadingSplit}>
              <div>
                <p className={styles.sectionLabel}>Choose where you are starting</p>
                <h2 id="service-title">Have a route, or need one built?</h2>
              </div>
              <p>
                The fixed price applies when your request fits the standard scope below.
                Longer or more complex trips are checked before any payment is requested.
              </p>
            </div>

            <div className={styles.serviceGrid}>
              <article className={styles.serviceCard} id="review-my-route">
                <div className={styles.serviceCardTop}>
                  <span className={styles.serviceIcon}><FileCheck2 aria-hidden="true" size={23} /></span>
                  <p>I already have a usable day-by-day route</p>
                </div>
                <h3>Review My Route</h3>
                <div className={styles.priceLine}>
                  <span>US$</span>
                  <strong>69</strong>
                  <small>per trip</small>
                </div>
                <p className={styles.serviceSummary}>
                  A practical second opinion before you book more of the route.
                </p>
                <p className={styles.serviceScope}>
                  Up to 10 travel days · up to 4 overnight bases · one shared route for 1–4 travellers
                </p>
                <h4>What you receive</h4>
                <ul className={styles.serviceList}>
                  <li>A day-by-day workable / tight / fragile check</li>
                  <li>City order, hotel-move and transfer-day review</li>
                  <li>The assumptions making particular days vulnerable</li>
                  <li>Concise Keep / Move / Remove recommendations</li>
                  <li>A revised route skeleton and official recheck list</li>
                  <li>A concise explanation of the decisions that matter most</li>
                </ul>
                <p className={styles.cardBoundary}>
                  This reviews an existing route. It does not build several new options,
                  make reservations or provide ongoing chat support.
                </p>
                <a className={styles.serviceButton} href={reviewHref}>
                  Request a route review
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
                <small className={styles.ctaNote}>
                  Complete a short trip check first. Add an outline or shareable link if
                  useful; we ask for the full route after confirming the request fits.
                </small>
              </article>

              <article className={`${styles.serviceCard} ${styles.serviceCardFeatured}`} id="build-my-route">
                <div className={styles.serviceCardTop}>
                  <span className={styles.serviceIcon}><MapPin aria-hidden="true" size={23} /></span>
                  <p>I have dates and priorities, but no usable route</p>
                </div>
                <h3>Build My Route</h3>
                <div className={styles.priceLine}>
                  <span>US$</span>
                  <strong>129</strong>
                  <small>per trip</small>
                </div>
                <p className={styles.serviceSummary}>
                  A workable route structure before detailed booking begins.
                </p>
                <p className={styles.serviceScope}>
                  Up to 10 travel days · up to 4 overnight bases · one shared route for 1–4 travellers
                </p>
                <h4>What you receive</h4>
                <ul className={styles.serviceList}>
                  <li>A recommended city order and night allocation</li>
                  <li>Arrival, departure and intercity transfer logic</li>
                  <li>A practical route skeleton for each travel day</li>
                  <li>Hotel-area logic and pace notes for your group</li>
                  <li>A booking-priority and official recheck list</li>
                  <li>The assumptions and open decisions behind the proposed structure</li>
                </ul>
                <p className={styles.cardBoundary}>
                  This builds the trip structure. It does not include an hour-by-hour
                  schedule, live fare searches, reservations or support during travel.
                </p>
                <a className={styles.serviceButton} href={buildHref}>
                  Request a route build
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
                <small className={styles.ctaNote}>
                  Complete a short trip check first. Add an outline or shareable link if
                  useful; complete working files are requested only after we confirm fit.
                </small>
              </article>
            </div>

            <aside className={styles.choiceGuide} aria-label="Which route service should I choose?">
              <strong>Not sure which one fits?</strong>
              <p>
                If another person could follow your existing plan day by day, choose
                Review My Route. If you mainly have dates, destinations and ideas, choose
                Build My Route.
              </p>
              <a href="#full-trip-support">Need bookings or local coordination?</a>
            </aside>
          </section>

          <section className={styles.intro} aria-labelledby="possible-title">
            <div className={styles.sectionHeadingSplit}>
              <div>
                <p className={styles.sectionLabel}>Why routes need testing</p>
                <h2 id="possible-title">A route can be possible and still be a poor fit.</h2>
              </div>
              <p>
                Most rushed itineraries do not fail because one train or flight is impossible.
                They fail because several small demands land on the same day.
              </p>
            </div>
            <div className={styles.pressureGrid}>
              {pressurePoints.map(({ Icon, title, detail }, index) => (
                <article className={styles.pressureCard} key={title}>
                  <span className={styles.cardNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon aria-hidden="true" size={22} strokeWidth={1.65} />
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.outputSection} id="review-output" aria-labelledby="output-title">
            <div className={styles.outputHeading}>
              <div>
                <p className={styles.sectionLabelLight}>The Route Stress Test</p>
                <h2 id="output-title">A decision map, not a generic “best of China” list.</h2>
              </div>
              <p>
                The point is not to make every route slower. It is to show the real cost of
                each choice, so you decide what deserves the limited time you have.
              </p>
            </div>
            <div className={styles.outputGrid}>
              {reviewOutputs.map(({ Icon, title, detail }, index) => (
                <article className={styles.outputCard} key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden="true" size={24} strokeWidth={1.5} />
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
            <p className={styles.outputBoundary}>
              A route pack can flag information that needs an official recheck. It cannot
              guarantee transport, attraction access, weather or third-party bookings.
            </p>
          </section>

          <section className={styles.process} aria-labelledby="process-title">
            <div className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>How it works</p>
              <h2 id="process-title">Start with a short trip check.</h2>
              <p>
                The selected service stays attached to the enquiry. This first step is
                not a booking, checkout or file-upload process.
              </p>
            </div>
            <ol className={styles.processList}>
              <li>
                <span>01</span>
                <div>
                  <h3>Complete the short trip check</h3>
                  <p>Share destinations, trip length, party and preferred pace in the existing Route Finder.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Add context if useful</h3>
                  <p>Paste a concise route outline, important constraints or a shareable route link. Do not submit passport details, payment information, QR codes or unredacted booking references.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Send the scope enquiry</h3>
                  <p>The Review, Build or Full Support choice is saved with the trip check. No online payment is taken.</p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <h3>Homeground checks the fit</h3>
                  <p>If the request appears suitable, we follow up for essential missing information and can request the complete working itinerary through an appropriate channel.</p>
                </div>
              </li>
              <li>
                <span>05</span>
                <div>
                  <h3>Agree the next step directly</h3>
                  <p>Any later working scope, commercial terms and delivery arrangements are confirmed outside this website enquiry flow.</p>
                </div>
              </li>
            </ol>
          </section>

          <section className={styles.example} aria-labelledby="example-title">
            <div className={styles.exampleIntro}>
              <p className={styles.sectionLabel}>Illustrative example — not a client trip</p>
              <h2 id="example-title">Removing a city is not the point. Knowing what it returns is.</h2>
              <p>
                Imagine ten nights, five hotel bases and four intercity moves. One transfer
                day includes a timed museum visit; the next morning has an early departure.
                Every item may be possible. Together, they leave almost no room for a slow
                check-in, a delayed transfer or a lower-energy day.
              </p>
            </div>
            <BeforeAfter />
            <div className={styles.exampleChoices}>
              <div>
                <CircleCheck aria-hidden="true" size={20} />
                <p>Keep the city and move the fixed visit to a full day.</p>
              </div>
              <div>
                <CircleCheck aria-hidden="true" size={20} />
                <p>Keep the visit and remove a hotel move.</p>
              </div>
              <div>
                <CircleCheck aria-hidden="true" size={20} />
                <p>Keep the core priorities and return a complete day to the route.</p>
              </div>
            </div>
          </section>

          <section className={styles.boundarySection} aria-labelledby="boundary-title">
            <div className={styles.sectionHeadingSplit}>
              <div>
                <p className={styles.sectionLabel}>Fixed-price boundaries</p>
                <h2 id="boundary-title">What US$69 and US$129 do not include.</h2>
              </div>
              <p>
                Operational details can change. We use the information available when the
                route is prepared and identify what should be checked again closer to travel.
              </p>
            </div>
            <ul className={styles.boundaryGrid}>
              <li>Purchasing or holding trains, flights, hotels or attraction tickets</li>
              <li>Monitoring live availability, fares or price changes</li>
              <li>Contacting hotels, venues or transport operators</li>
              <li>Large hotel, restaurant, shopping or activity shortlists</li>
              <li>Unlimited route versions or ongoing messaging</li>
              <li>Emergency or in-trip support and third-party guarantees</li>
            </ul>
            <p className={styles.boundaryNote}>
              Longer trips, more overnight bases, larger parties, multiple route alternatives
              or unusually complex fixed arrangements may need a separate quote. We tell you
              before asking for payment.
            </p>
          </section>

          <section className={styles.fullSupport} id="full-trip-support" aria-labelledby="support-title">
            <div className={styles.fullSupportIntro}>
              <p className={styles.sectionLabelLight}>Full trip planning &amp; ground support</p>
              <h2 id="support-title">Need more than a route document?</h2>
            </div>
            <div className={styles.fullSupportBody}>
              <p>
                Depending on the trip, Homeground may help shape a more detailed plan and
                coordinate selected hotels, transport, tickets, guides, drivers or local
                handoffs. The useful scope depends on your dates, destinations, group,
                existing bookings and the support you want.
              </p>
              <p>
                That is why full trip planning and ground support are quoted around the
                actual journey rather than sold at one fixed service fee.
              </p>
              <ul>
                <li>what Homeground will plan or coordinate;</li>
                <li>which costs come from hotels, transport or other third parties;</li>
                <li>who is responsible for delivering each service;</li>
                <li>what remains outside the arrangement.</li>
              </ul>
              <a className={styles.primaryButton} href={fullSupportHref}>
                Ask about full trip support
                <ArrowRight aria-hidden="true" size={18} />
              </a>
              <small>This starts a planning enquiry. It is not a booking or payment.</small>
            </div>
          </section>

          <section className={styles.faqSection} aria-labelledby="review-faq-title">
            <div className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>Practical questions</p>
              <h2 id="review-faq-title">Before you send the trip brief</h2>
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

          <section className={styles.finalCta} aria-labelledby="review-cta-title">
            <div>
              <p className={styles.sectionLabelLight}>Start from where your trip is now</p>
              <h2 id="review-cta-title">Have a route? Test it. Have a wishlist? Give it shape.</h2>
            </div>
            <div>
              <p>
                The fixed prices apply only to the standard scopes shown above. Sending a
                brief is an enquiry, not a booking. This page takes no online payment and
                accepts no file uploads.
              </p>
              <div className={styles.finalActions}>
                <a className={styles.primaryButton} href={reviewHref}>
                  Request a route review — US$69
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
                <a className={styles.finalSecondaryButton} href={buildHref}>
                  Request a route build — US$129
                </a>
              </div>
              <a className={styles.supportLink} href="#full-trip-support">
                Or ask about full trip support
              </a>
            </div>
          </section>
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
