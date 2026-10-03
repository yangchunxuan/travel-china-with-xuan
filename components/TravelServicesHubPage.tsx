import Image from "next/image";
import Link from "next/link";
import { destinationHubRegistry } from "../lib/destinationHubs";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { getHomegroundNavigationModel } from "../lib/homegroundNavigationModel";
import { getKevinPreparationStoryCopy } from "../lib/kevinPreparationStoryI18n";
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
 * Reuse existing photographs with their original alt text. Kevin's editorial
 * photograph illustrates guide help and support; it does not promise that
 * Kevin is the guide assigned to an enquiry.
 */
function serviceImage(id: TravelServiceCardCopy["id"], locale: HomegroundLocale) {
  if (id === "reservations") {
    // The Chengdu tour's panda photograph, with that product's alt text.
    return {
      src: "/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/hero-panda-1600.webp",
      width: 1600,
      height: 1000,
      alt: {
        en: "A giant panda at Chengdu Research Base of Giant Panda Breeding",
        zh: "成都大熊猫繁育研究基地内的大熊猫",
        ko: "청두 자이언트판다 번식연구기지의 자이언트판다",
      }[locale],
      position: "50% 45%",
    };
  }
  if (id === "tours") {
    const hub = destinationHubRegistry.find((entry) => entry.id === "zhangjiajie");
    if (!hub) throw new Error("Missing Zhangjiajie destination hub.");
    return {
      src: hub.heroImagePath,
      width: hub.imageWidth,
      height: hub.imageHeight,
      alt: hub.locales[locale].heroAlt,
      position: "50% 50%",
    };
  }
  return {
    src: "/images/guides/kevin-preparation/kevin-guiding-1080.jpg",
    width: 1080,
    height: 1440,
    alt: getKevinPreparationStoryCopy(locale).images.action.alt,
    position: "50% 38%",
  };
}

function schemaForServices(locale: HomegroundLocale) {
  const home = getHomegroundCopy(locale);
  const navigation = getHomegroundNavigationModel(locale, home.path);
  const planning = navigation.items.find((item) => item.id === "studio");
  if (!planning) throw new Error("Missing studio navigation item.");
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
          { "@type": "ListItem", position: 2, name: planning.label, item: `${SITE_URL}${planning.href}` },
          { "@type": "ListItem", position: 3, name: entry.h1, item: canonicalUrl },
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

export function TravelServicesHubPage({ locale = "en" }: { locale?: HomegroundLocale }) {
  const home = getHomegroundCopy(locale);
  const navigation = getHomegroundNavigationModel(locale, home.path);
  const planning = navigation.items.find((item) => item.id === "studio");
  if (!planning) throw new Error("Missing studio navigation item.");
  const section = getSearchPlatformCopy(locale).sections.services;
  const copy = getTravelServicesHubCopy(locale);
  const schema = schemaForServices(locale);
  // Chinese title: break only between its three phrases (kept from #206).
  const zhTitleParts = locale === "zh"
    ? section.title.match(/^(只在真正改变)(旅行体验的地方)(加入本地协助。)$/)?.slice(1)
    : null;

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={localeStyles.skipLink} href="#services-main">{home.skipLink}</a>
      <HomegroundHeader locale={locale} pageContext="services" languagePaths={getSearchHubLanguagePaths("services")} />
      <main id="services-main" tabIndex={-1}>
        <PointerSpotlight />
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}>
              <ol>
                <li><Link href={home.path}>{home.navigation.homeLabel}</Link></li>
                <li><span aria-hidden="true">/</span><Link href={planning.href}>{planning.label}</Link></li>
                <li aria-current="page"><span aria-hidden="true">/</span>{section.navLabel}</li>
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
              const image = serviceImage(card.id, locale);
              return (
                <li key={card.id}>
                  <Link data-spotlight href={serviceHref(card.id, locale)}>
                    <figure className={styles.cardImage}>
                      <Image
                        alt={image.alt}
                        decoding="async"
                        height={image.height}
                        loading="lazy"
                        sizes="(max-width: 48rem) calc(100vw - 2rem), (max-width: 80rem) calc((100vw - 4rem) / 2), 38rem"
                        src={image.src}
                        style={{ objectPosition: image.position }}
                        width={image.width}
                      />
                    </figure>
                    <div className={styles.cardBody}>
                      <p className={styles.cardEyebrow}>{card.eyebrow}</p>
                      <h3><KeepWords locale={locale} text={card.title} /></h3>
                      <p className={styles.cardText}>{card.body.replace("{fee}", formatAttractionReservationFee(attractionReservationServiceFeeCny, locale))}</p>
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
              <Link href={planning.href}>{copy.methodAction}<span aria-hidden="true">→</span></Link>
              <Link href={`${home.path}guides/`}>{copy.adviceAction}</Link>
            </div>
          </div>
        </section>
      </main>
      <HomegroundFooter locale={locale} pageContext="services" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
