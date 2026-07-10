import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "../components/Site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Travel China with Xuan — Private, Fully-Handled China Trips",
    description:
      "Tailor-made China trips by a Zhangjiajie-born planner. No shopping stops, no hidden fees, everything handled.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Travel China with Xuan",
  description:
    "Private, tailor-made China trips planned by a Zhangjiajie-born local. No shopping stops, no hidden fees.",
  email: "yangchunxuan1@gmail.com",
  areaServed: "China",
  founder: {
    "@type": "Person",
    name: "Xuan",
    birthPlace: "Zhangjiajie, China",
  },
  knowsLanguage: ["en", "zh", "ko"],
  slogan: "China, handled. You just show up.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <div className="visa-banner">
        <div className="wrap">
          <span>
            🇬🇧🇨🇦🇦🇺{" "}
            <b>
              China is visa-free (30 days) for UK, Canadian &amp; Australian
              passports through 31 Dec 2026.
            </b>
          </span>
          <Link href="/china-visa-free-uk-canada/">Read the 2026 guide →</Link>
        </div>
      </div>

      <div className="hero">
        <div className="wrap">
          <h1>
            China, <span className="em">handled</span>.
            <br />
            You just show up.
          </h1>
          <p className="sub">
            Private, tailor-made China trips planned by someone born and raised
            in Zhangjiajie — payments, transport, tickets and an
            English-speaking guide, all taken care of. No shopping stops. No
            hidden fees. Ever.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="https://m.me/1176159805586468">
              Message us — free sample itinerary
            </a>
            <a className="btn btn-ghost" href="mailto:yangchunxuan1@gmail.com">
              Email us
            </a>
          </div>
        </div>
      </div>

      <section id="handle">
        <div className="wrap">
          <h2>The parts of China that trip travelers up — we handle them</h2>
          <div className="rule" />
          <div className="grid">
            <div className="item">
              <span className="tick">✓</span>
              <div>
                <h3>Payments</h3>
                <p>
                  China is nearly cashless — everything runs on Alipay/WeChat
                  Pay. <span className="we">We set it up with you before you fly.</span>
                </p>
              </div>
            </div>
            <div className="item">
              <span className="tick">✓</span>
              <div>
                <h3>Getting online</h3>
                <p>
                  Google, Maps and WhatsApp are blocked without preparation.{" "}
                  <span className="we">We sort your connectivity in advance.</span>
                </p>
              </div>
            </div>
            <div className="item">
              <span className="tick">✓</span>
              <div>
                <h3>The language gap</h3>
                <p>
                  Outside big hotels, English is rare.{" "}
                  <span className="we">Your guide speaks your language</span> —
                  menus, taxis, tickets, done.
                </p>
              </div>
            </div>
            <div className="item">
              <span className="tick">✓</span>
              <div>
                <h3>Getting around</h3>
                <p>
                  Ride-hailing and rail booking run in Chinese.{" "}
                  <span className="we">Private driver and pre-booked tickets</span>{" "}
                  — no queues, no confusion.
                </p>
              </div>
            </div>
            <div className="item">
              <span className="tick">✓</span>
              <div>
                <h3>Pacing</h3>
                <p>
                  China is vast; rushed itineraries ruin it.{" "}
                  <span className="we">We build around your pace</span> —
                  especially for parents and older travelers.
                </p>
              </div>
            </div>
            <div className="item">
              <span className="tick">✓</span>
              <div>
                <h3>Eating well</h3>
                <p>
                  The food is a reason to come.{" "}
                  <span className="we">A local takes you to the real spots</span>{" "}
                  — never tourist canteens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="trips"
        style={{ background: "#fff", borderTop: "1px solid var(--line)" }}
      >
        <div className="wrap">
          <h2>Sample trips — every itinerary is built for you</h2>
          <div className="rule" />
          <div className="trips">
            <div className="trip">
              <span className="tag">Our home turf</span>
              <h3>Zhangjiajie &amp; Fenghuang</h3>
              <p>
                The stone forests that inspired <em>Avatar</em>, glass bridges,
                Tianmen Mountain — planned by someone who grew up beneath them —
                plus the riverside old town of Fenghuang.
              </p>
              <span className="days">5–7 days · gentle pacing available</span>
            </div>
            <div className="trip">
              <span className="tag">The classic</span>
              <h3>Beijing · Xi&apos;an · Shanghai</h3>
              <p>
                Great Wall without the crowds, the Terracotta Army, old hutongs
                and the Bund — the essential first China trip, done comfortably.
              </p>
              <span className="days">8–12 days · high-speed rail between cities</span>
            </div>
            <div className="trip">
              <span className="tag">Fully custom</span>
              <h3>Your China</h3>
              <p>
                Chengdu&apos;s pandas, Guilin&apos;s rivers, Hainan golf,
                food-first itineraries, multi-generation family trips — tell us
                your interests and pace; we design around them.
              </p>
              <span className="days">Any length · any combination</span>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="wrap">
          <h2>Who&apos;s behind this</h2>
          <div className="rule" />
          <p>
            I&apos;m <strong>Xuan</strong> — born and raised in{" "}
            <strong>Zhangjiajie</strong>, China&apos;s most spectacular corner,
            now studying in Korea and planning private China trips for
            international travelers. I know the ground because it&apos;s home:
            which cable car saves your knees, which restaurants locals actually
            eat at, and how to pace a day so you enjoy it instead of surviving
            it.
          </p>
          <p>
            Trips run with licensed local partners across China, and I stay
            personally involved from first message to your flight home.
          </p>
          <div className="promise">
            <span className="big">
              The written promise: no shopping stops, no optional-extras
              ambush, no hidden fees.
            </span>
            <p>
              The quote you approve is the final price — it says so in writing
              on every itinerary. Low-cost &quot;China tours&quot; make their
              money on forced shopping and surprise charges. We simply
              don&apos;t.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="wrap">
          <h2>Planning a China trip? Talk to us</h2>
          <div className="rule" />
          <p style={{ maxWidth: "60ch" }}>
            Tell us who&apos;s traveling, roughly when, and what you&apos;re
            curious about — we&apos;ll send back a{" "}
            <strong>free sample itinerary and quote</strong>, no obligation.
          </p>
          <div className="methods">
            <div className="method">
              <b>Facebook Messenger (fastest)</b>
              <a href="https://m.me/1176159805586468">
                m.me → Travel China with Xuan
              </a>
            </div>
            <div className="method">
              <b>Email</b>
              <a href="mailto:yangchunxuan1@gmail.com">
                yangchunxuan1@gmail.com
              </a>
            </div>
            <div className="method">
              <b>WhatsApp</b>
              <span className="soon">Coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
