import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { getHomegroundNavigationModel } from "../lib/homegroundNavigationModel";
import { absoluteManifestAlternates, getSearchHubEntry, getSearchHubLanguagePaths } from "../lib/searchPlatformManifest";
import { getSearchPlatformCopy } from "../lib/searchPlatformI18n";
import { getTravelServicesHubCopy, type TravelServiceCardCopy } from "../lib/travelServicesHubI18n";
import { privateGuideServicePath } from "../lib/privateGuideServices";
import { fullTripSupportPath } from "../lib/fullTripSupport";
import { attractionReservationPath, attractionReservationServiceFeeCny, formatAttractionReservationFee } from "../lib/attractionReservations";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";
import { PointerSpotlight } from "./motion/PointerSpotlight";
import { KeepWords } from "./text/KeepWords";
import styles from "./TravelServicesHubPage.module.css";

const SITE_URL = "https://homegroundchina.com";

export interface TravelServicesHubEdition {
  language: string;
  homePath: string;
  homeLabel: string;
  skipLink: string;
  header: ReactNode;
  footer: ReactNode;
  copy: { [Key in Exclude<keyof ReturnType<typeof getTravelServicesHubCopy>, "cards">]: string } & { cards: readonly TravelServiceCardCopy[] };
  section: ReturnType<typeof getSearchPlatformCopy>["sections"]["services"];
  serviceHref: (id: TravelServiceCardCopy["id"]) => string;
  planningHref: string;
  guidesHref: string;
  feeLabel: string;
  schema: unknown;
}

function serviceHref(
  id: TravelServiceCardCopy["id"],
  locale: HomegroundLocale,
) {
  const home = getHomegroundCopy(locale);
  if (id === "tours") return `${home.path}tours/`;
  if (id === "guides") return privateGuideServicePath[locale];
  if (id === "reservations") return attractionReservationPath[locale];
  return fullTripSupportPath[locale];
}

/*
 * One drawing per service, each of a different thing on a panel of a
 * different colour: a flat ground, one off-white cut-paper shape for the
 * thing itself, and thick black brush lines for its details and for the
 * hand that holds it. Tours are a folded map with a dotted route and a pin;
 * guides, a hand holding up a guide's flag; reservations, a ticket for a set
 * hour; full-trip support, a hand carrying the suitcase. They are 1600 x
 * 1000, the card's own shape, so nothing is cropped. They are decoration and
 * carry no alt text: the card's heading names the service.
 */
function serviceImage(id: TravelServiceCardCopy["id"]) {
  return { src: `/images/services/hub/${id}-1600.webp`, width: 1600, height: 1000, alt: "" };
}

function schemaForServices(locale: HomegroundLocale) {
  const home = getHomegroundCopy(locale);
  const entry = getSearchHubEntry("services", locale);
  const copy = getTravelServicesHubCopy(locale);
  const canonicalUrl = `${SITE_URL}${entry.canonicalPath}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: entry.h1,
        description: entry.description,
        inLanguage: home.htmlLang,
        sameAs: Object.values(absoluteManifestAlternates(entry)),
        mainEntity: { "@id": `${canonicalUrl}#services` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: home.navigation.homeLabel, item: `${SITE_URL}${home.path}` },
          { "@type": "ListItem", position: 2, name: copy.overview, item: canonicalUrl },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#services`,
        numberOfItems: copy.cards.length,
        itemListElement: copy.cards.map((card, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: card.title,
          url: `${SITE_URL}${serviceHref(card.id, locale)}`,
        })),
      },
    ],
  };
}

export function TravelServicesHubPage({ locale = "en", edition }: { locale?: HomegroundLocale; edition?: TravelServicesHubEdition }) {
  const home = getHomegroundCopy(locale);
  const navigation = getHomegroundNavigationModel(locale, home.path);
  const planning = navigation.items.find((item) => item.id === "studio");
  if (!planning) throw new Error("Missing studio navigation item.");
  const section = edition?.section ?? getSearchPlatformCopy(locale).sections.services;
  const copy = edition?.copy ?? getTravelServicesHubCopy(locale);
  const schema = edition?.schema ?? schemaForServices(locale);
  // Chinese title: break only between its three phrases (kept from #206).
  const zhTitleParts = locale === "zh"
    ? section.title.match(/^(只在真正改变)(旅行体验的地方)(加入本地协助。)$/)?.slice(1)
    : null;

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={edition?.language ?? locale} lang={edition?.language ?? home.htmlLang}>
      <a className={localeStyles.skipLink} href="#services-main">{edition?.skipLink ?? home.skipLink}</a>
      {edition?.header ?? <HomegroundHeader locale={locale} pageContext="services" languagePaths={getSearchHubLanguagePaths("services")} />}
      <main id="services-main" tabIndex={-1}>
        <PointerSpotlight />
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}>
              <ol>
                <li><Link href={edition?.homePath ?? home.path}>{edition?.homeLabel ?? home.navigation.homeLabel}</Link></li>
                <li aria-current="page"><span aria-hidden="true">/</span>{copy.overview}</li>
              </ol>
            </nav>
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>{section.eyebrow}</p>
                <h1><AnimatedHeadline locale={locale} segments={zhTitleParts} text={section.title} /></h1>
                <p className={styles.lede}>{section.description}</p>
              </div>
              <aside className={styles.scope} aria-labelledby="services-scope-title">
                <p id="services-scope-title">{section.scopeTitle}</p>
                <ul>{section.scope.map((item) => <li key={item}>{item}</li>)}</ul>
              </aside>
            </div>
          </div>
        </header>

        <section className={styles.choices} aria-labelledby="service-choices-title">
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.choicesEyebrow}</p>
              <h2 id="service-choices-title"><KeepWords locale={locale} text={copy.choicesTitle} /></h2>
            </div>
            <p>{copy.choicesBody}</p>
          </div>
          <ol className={styles.cardGrid} data-count={copy.cards.length}>
            {copy.cards.map((card) => {
              const image = serviceImage(card.id);
              return (
                <li key={card.id}>
                  <Link data-spotlight href={edition?.serviceHref(card.id) ?? serviceHref(card.id, locale)}>
                    <figure className={styles.cardImage}>
                      <Image
                        alt={image.alt}
                        decoding="async"
                        height={image.height}
                        loading="lazy"
                        sizes="(max-width: 48rem) calc(100vw - 2rem), (max-width: 80rem) calc((100vw - 4rem) / 2), 38rem"
                        src={image.src}
                        width={image.width}
                      />
                    </figure>
                    <div className={styles.cardBody}>
                      <p className={styles.cardEyebrow}>{card.eyebrow}</p>
                      <h3><KeepWords locale={locale} text={card.title} /></h3>
                      <p className={styles.cardText}>{card.body.replace("{fee}", edition?.feeLabel ?? formatAttractionReservationFee(attractionReservationServiceFeeCny, locale))}</p>
                      <span className={styles.action}>{card.action}<span aria-hidden="true">→</span></span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        <section className={styles.method} aria-labelledby="service-method-title">
          <div>
            <p className={styles.eyebrow}>{copy.methodEyebrow}</p>
            <h2 id="service-method-title"><KeepWords locale={locale} text={copy.methodTitle} /></h2>
          </div>
          <div>
            <p>{copy.methodBody}</p>
            <div className={styles.methodLinks}>
              <Link href={edition?.planningHref ?? planning.href}>{copy.methodAction}<span aria-hidden="true">→</span></Link>
              <Link href={edition?.guidesHref ?? `${home.path}guides/`}>{copy.adviceAction}</Link>
            </div>
          </div>
        </section>
      </main>
      {edition?.footer ?? <HomegroundFooter locale={locale} pageContext="services" />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
