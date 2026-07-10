import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  CalendarCheck,
  Check,
  CircleDollarSign,
  Compass,
  Headphones,
  Languages,
  MapPin,
  MessageCircle,
  PlaneLanding,
  Route,
  ShieldCheck,
  Smartphone,
  TicketCheck,
  TrainFront,
  UtensilsCrossed,
} from "lucide-react";
import { translations, type Lang } from "../lib/i18n";
import { HeroCarousel } from "./HeroCarousel";
import { RouteExplorer } from "./RouteExplorer";
import { FloatingContact, SiteFooter, SiteHeader } from "./Site";
import { TripBrief } from "./TripBrief";

const basePath = "";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Homeground China",
  alternateName: "Travel China with Xuan",
  description:
    "Private, tailor-made China trips planned by a Zhangjiajie-born local and delivered with licensed local partners.",
  email: "yangchunxuan1@gmail.com",
  areaServed: "China",
  founder: {
    "@type": "Person",
    name: "Xuan",
    birthPlace: "Zhangjiajie, China",
  },
  knowsLanguage: ["en", "zh", "ko"],
  slogan: "China, handled.",
};

const serviceIcons = [CalendarCheck, PlaneLanding, Headphones];
const proofIcons = [Compass, ShieldCheck, Route, MessageCircle];
const handledIcons = [
  Smartphone,
  TrainFront,
  TicketCheck,
  BedDouble,
  Languages,
  UtensilsCrossed,
];

export function HomePage({ lang }: { lang: Lang }) {
  const t = translations[lang];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader t={t} lang={lang} />

      <main>
        <div className="visa-banner">
          <div className="wrap visa-inner">
            <PlaneLanding size={18} aria-hidden="true" />
            <span>
              <strong>{t.visa.strong}</strong> {t.visa.rest}
            </span>
            <Link href="/china-visa-free-uk-canada/">
              {t.visa.link} <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <section className="home-hero" aria-labelledby="hero-heading">
          <HeroCarousel basePath={basePath} slides={t.slides} />
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <span className="hero-kicker">
                <MapPin size={17} /> {t.hero.kicker}
              </span>
              <h1 id="hero-heading">
                {t.hero.h1a}
                <span>{t.hero.h1b}</span>
              </h1>
              <p>{t.hero.lead}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#plan">
                  {t.hero.ctaPrimary} <ArrowRight size={18} />
                </a>
                <a className="btn btn-hero-ghost" href="#journeys">
                  {t.hero.ctaSecondary}
                </a>
              </div>
              <div className="hero-assurances" aria-label="Core promises">
                {t.hero.assurances.map((item) => (
                  <span key={item}>
                    <Check size={15} /> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Why travel with Xuan">
          <div className="wrap proof-grid">
            {t.proof.map((item, index) => {
              const Icon = proofIcons[index];
              return (
                <div key={item.strong}>
                  <Icon size={22} />
                  <span>
                    <strong>{item.strong}</strong>
                    {item.sub}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section id="journeys" className="journeys-section">
          <div className="wrap">
            <div className="section-heading heading-split">
              <div>
                <span className="section-kicker">{t.journeys.kicker}</span>
                <h2>{t.journeys.h2}</h2>
              </div>
              <p>{t.journeys.lead}</p>
            </div>
            <RouteExplorer t={t} />
          </div>
        </section>

        <section id="included" className="included-section">
          <div className="wrap">
            <div className="section-heading centered-heading">
              <span className="section-kicker">{t.included.kicker}</span>
              <h2>{t.included.h2}</h2>
              <p>{t.included.lead}</p>
            </div>

            <div className="service-grid">
              {t.included.groups.map(({ label, title, items }, index) => {
                const Icon = serviceIcons[index];
                return (
                  <article className="service-card" key={label}>
                    <div className="service-icon">
                      <Icon size={22} />
                    </div>
                    <span>{label}</span>
                    <h3>{title}</h3>
                    <ul>
                      {items.map((item) => (
                        <li key={item}>
                          <Check size={15} /> {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            <div className="handled-list" aria-label="Common logistics handled">
              {t.included.handled.map((item, index) => {
                const Icon = handledIcons[index];
                return (
                  <span key={item}>
                    <Icon size={18} /> {item}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section id="process" className="process-section">
          <div className="wrap">
            <div className="section-heading heading-split">
              <div>
                <span className="section-kicker">{t.process.kicker}</span>
                <h2>{t.process.h2}</h2>
              </div>
              <p>{t.process.lead}</p>
            </div>
            <ol className="process-list">
              {t.process.steps.map((step, index) => (
                <li key={step.title}>
                  <span>{`0${index + 1}`}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="wrap about-grid">
            <div className="about-image-wrap">
              <img
                src={`${basePath}/images/gentle-journey.jpg`}
                alt={t.about.imageAlt}
              />
              <div className="about-caption">
                <Route size={18} />
                <span>{t.about.caption}</span>
              </div>
            </div>

            <div className="about-copy">
              <span className="section-kicker">{t.about.kicker}</span>
              <h2>{t.about.h2}</h2>
              <p className="about-lead">{t.about.lead}</p>
              <p>{t.about.body}</p>

              <div className="responsibility-grid">
                {t.about.resp.map((item, index) => (
                  <div key={item.strong}>
                    {index === 0 ? <BadgeCheck size={19} /> : <Headphones size={19} />}
                    <strong>{item.strong}</strong>
                    <span>{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="promise-band">
          <div className="wrap promise-grid">
            <div>
              <span className="section-kicker light">{t.promise.kicker}</span>
              <h2>{t.promise.h2}</h2>
            </div>
            <div className="promise-points">
              {t.promise.points.map((point, index) => (
                <p key={point.strong}>
                  {index === 0 ? <CircleDollarSign size={20} /> : <ShieldCheck size={20} />}
                  <span>
                    <strong>{point.strong}</strong> {point.rest}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="wrap faq-grid">
            <div className="faq-intro">
              <span className="section-kicker">{t.faq.kicker}</span>
              <h2>{t.faq.h2}</h2>
              <p>{t.faq.lead}</p>
              <a href="https://m.me/1176159805586468" target="_blank" rel="noreferrer">
                {t.faq.ask} <ArrowRight size={16} />
              </a>
            </div>
            <div className="faq-list">
              {t.faq.items.map((faq, index) => (
                <details key={faq.q} open={index === 0}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <TripBrief t={t} />
      </main>

      <FloatingContact label={t.floating} />
      <SiteFooter t={t} lang={lang} />
    </>
  );
}
