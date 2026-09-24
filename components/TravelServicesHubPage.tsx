import Image from "next/image";
import Link from "next/link";
import { destinationHubRegistry } from "../lib/destinationHubs";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { getHomegroundNavigationModel } from "../lib/homegroundNavigationModel";
import { getKevinPreparationStoryCopy } from "../lib/kevinPreparationStoryI18n";
import { absoluteManifestAlternates, getSearchHubEntry, getSearchHubLanguagePaths } from "../lib/searchPlatformManifest";
import { getSearchPlatformCopy } from "../lib/searchPlatformI18n";
import { getTravelServicesHubCopy } from "../lib/travelServicesHubI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";
import { PointerSpotlight } from "./motion/PointerSpotlight";
import { KeepWords } from "./text/KeepWords";
import styles from "./TravelServicesHubPage.module.css";

const SITE_URL = "https://homegroundchina.com";

function serviceHref(
  id: "tours" | "support",
  locale: HomegroundLocale,
) {
  const home = getHomegroundCopy(locale);
  if (id === "tours") return `${home.path}tours/`;
  return `${home.path}?service=full-trip-support#planner-contact`;
}

/*
 * One photograph per kind of help, reused from pages that already publish
 * it with the same alt text: the Zhangjiajie city-guide cover for published
 * routes, and Kevin with guests (faces blurred) for on-the-ground support.
 */
function serviceImage(id: "tours" | "support", locale: HomegroundLocale) {
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
                <h1><AnimatedHeadline locale={locale} text={section.title} /></h1>
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
          <ol className={styles.cardGrid}>
            {copy.cards.map((card, index) => {
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
                      <span className={styles.number} aria-hidden="true">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                      </span>
                      <p className={styles.cardEyebrow}>{card.eyebrow}</p>
                      <h3><KeepWords locale={locale} text={card.title} /></h3>
                      <p className={styles.cardText}>{card.body}</p>
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
