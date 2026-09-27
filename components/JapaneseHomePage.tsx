import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomepageProductShowcase } from "./HomepageProductShowcase";
import { PlanningScopeSection } from "./PlanningScopeSection";
import { RotatingHeroTitle } from "./RotatingHeroTitle";
import { JapaneseContactPanel } from "./JapaneseContactPanel";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import type { HomepagePrivateTourItem } from "../lib/homepagePrivateTourCatalog";
import { japaneseHomeCopy as copy } from "../lib/japaneseHomeCopy";
import { splitJapanesePhrases } from "../lib/japanesePhrases";
import {
  japaneseGeneralContactHrefs,
  japaneseLanguagePaths,
  japaneseSite,
} from "../lib/japaneseSite";
import styles from "./HomegroundHomePage.module.css";
import showcaseStyles from "./HomepageShowcase.module.css";
import homeStyles from "./JapaneseHome.module.css";
import { KeepWords } from "./text/KeepWords";

const site = "https://homegroundchina.com";

export function JapaneseHomePage({
  products,
  teamFaces,
}: {
  products: readonly HomepagePrivateTourItem[];
  teamFaces: readonly { id: string; src: string }[];
}) {
  const contact = japaneseGeneralContactHrefs(japaneseSite.home);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site}/ja/#webpage`,
    url: `${site}/ja/`,
    name: copy.metadata.title,
    description: copy.metadata.description,
    inLanguage: "ja",
    isPartOf: { "@id": `${site}/#website` },
    about: { "@id": `${site}/#organization` },
  };

  return (
    <div
      className={`${styles.localeRoot} ${showcaseStyles.root}`}
      data-homeground-home-intro="settled"
      data-homeground-locale="ja"
      lang="ja"
    >
      <a className={styles.skipLink} href="#main-content">
        {copy.skipLink}
      </a>
      <JapaneseSiteHeader
        contactHref={japaneseSite.contact}
        currentPath={japaneseSite.home}
        languagePaths={japaneseLanguagePaths("/", japaneseSite.home)}
      />

      <main id="main-content" tabIndex={-1}>
        <section className={showcaseStyles.hero} aria-labelledby="home-hero-title">
          <div className={showcaseStyles.heroInner}>
            <div className={showcaseStyles.heroCopy}>
              <p className={showcaseStyles.heroEyebrow}>
                <span className={showcaseStyles.heroEyebrowLong}><KeepWords locale="ja" text={copy.hero.eyebrow} /></span>
                <span className={showcaseStyles.heroEyebrowShort}>{copy.hero.eyebrowShort}</span>
              </p>
              <RotatingHeroTitle
                canonicalTitle={copy.hero.canonicalTitle}
                className={showcaseStyles.heroTitle}
                fixedLines={copy.hero.fixedLines}
                id="home-hero-title"
                phrases={copy.hero.phrases}
              />
              <p className={`${styles.heroLead} ${showcaseStyles.heroLead}`}>{copy.hero.body}</p>
              <div className={showcaseStyles.heroActions}>
                <Link className={showcaseStyles.primaryAction} href={japaneseSite.tours}>
                  {copy.hero.primary}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
                <a className={showcaseStyles.secondaryAction} href="#contact">
                  {copy.hero.secondary}
                </a>
              </div>
              <p className={showcaseStyles.heroDestinationPrompt}>
                <span>{copy.hero.destinationPrompt}</span>
                <Link href={japaneseSite.explore}>
                  {copy.hero.destinationAction}
                  <ArrowRight aria-hidden="true" size={15} />
                </Link>
              </p>
            </div>
          </div>
        </section>

        {products.length > 0 ? (
          <HomepageProductShowcase
            japanese={{ copy: copy.showcase, hubHref: japaneseSite.tours }}
            locale="en"
            products={products}
          />
        ) : null}

        <section className={homeStyles.reading} aria-labelledby="ja-reading-title">
          <div className={homeStyles.readingInner}>
            <header className={homeStyles.readingIntro}>
              <p className={homeStyles.eyebrow}>{copy.reading.eyebrow}</p>
              <h2 id="ja-reading-title"><KeepWords locale="ja" text={copy.reading.title} /></h2>
            </header>
            <ul className={homeStyles.readingGrid}>
              {copy.reading.cards.map((card) => (
                <li key={card.href}>
                  <Link className={homeStyles.readingCard} href={card.href}>
                    <h3><KeepWords locale="ja" text={card.title} /></h3>
                    <p>{card.body}</p>
                    <span className={homeStyles.readingAction}>
                      {card.action}
                      <ArrowRight aria-hidden="true" size={16} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <PlanningScopeSection japanese={{ copy: copy.planningScope, ctaHref: "#contact" }} />

        <section
          aria-labelledby="homepage-human-planning-title"
          className={showcaseStyles.planningSection}
          id="contact"
        >
          <div className={showcaseStyles.planningGrid}>
            <div className={showcaseStyles.planningIntro}>
              <p className={showcaseStyles.eyebrow}>{copy.planning.eyebrow}</p>
              <h2 id="homepage-human-planning-title"><KeepWords locale="ja" text={copy.planning.title} /></h2>
              <p>{copy.planning.body}</p>
              <Link className={showcaseStyles.planningTeamLink} href={japaneseSite.studio}>
                {teamFaces.length > 0 && (
                  <span className={showcaseStyles.planningFaces} aria-hidden="true">
                    {teamFaces.map((face) => (
                      <img alt="" decoding="async" height={112} key={face.id} loading="lazy" src={face.src} width={112} />
                    ))}
                  </span>
                )}
                {copy.planning.teamAction}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <div className={showcaseStyles.planningPanel}>
              <JapaneseContactPanel
                body="旅行予定の時期、人数、気になる都市やツアーをお知らせください。日本語でご返信します。日本語ガイドの手配もご相談いただけます（料金はコースごとにご案内します）。"
                emailHref={contact.email}
                headingId="ja-home-contact-title"
                title="日本語で旅の相談をする"
                whatsappHref={contact.whatsapp}
              />
            </div>
          </div>
        </section>

        <section className={`${styles.faqSection} ${showcaseStyles.faqSection}`} id="faq" aria-labelledby="faq-title">
          <div className={styles.faqIntro}>
            <p className={styles.eyebrowDark}>{copy.faq.eyebrow}</p>
            <h2 id="faq-title" tabIndex={-1}>
              <KeepWords locale="ja" text={copy.faq.title} />
            </h2>
            <a className={styles.faqAction} href="#contact">
              {copy.faq.action}
              <ArrowRight aria-hidden="true" size={16} />
            </a>
          </div>
          <div className={styles.faqList}>
            {copy.faq.items.map((item) => (
              <details key={item.question}>
                <summary>
                  {/* Phrase breaks without a wrapper: the FAQ styles treat every span in a summary as the + icon. */}
                  {splitJapanesePhrases(item.question).map((phrase, index) => (
                    <Fragment key={`${phrase}-${index}`}>
                      {index > 0 ? <wbr /> : null}
                      {phrase}
                    </Fragment>
                  ))}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <JapaneseSiteFooter currentPath={japaneseSite.home} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
