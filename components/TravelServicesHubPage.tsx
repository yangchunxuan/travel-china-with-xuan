import Link from "next/link";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { getHomegroundNavigationModel } from "../lib/homegroundNavigationModel";
import { absoluteManifestAlternates, getSearchHubEntry, getSearchHubLanguagePaths } from "../lib/searchPlatformManifest";
import { getSearchPlatformCopy } from "../lib/searchPlatformI18n";
import { getTravelServicesHubCopy } from "../lib/travelServicesHubI18n";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import homeStyles from "./HomegroundHomePage.module.css";
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
    <div className={`${homeStyles.localeRoot} ${styles.page}`} data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={homeStyles.skipLink} href="#services-main">{home.skipLink}</a>
      <HomegroundHeader locale={locale} pageContext="services" languagePaths={getSearchHubLanguagePaths("services")} />
      <main id="services-main" tabIndex={-1}>
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
              <div><p className={styles.eyebrow}>{section.eyebrow}</p><h1>{section.title}</h1></div>
              <div><p>{section.description}</p><ul>{section.scope.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
          </div>
        </header>

        <section className={styles.choices} aria-labelledby="service-choices-title">
          <div className={styles.sectionIntro}>
            <div><p className={styles.eyebrow}>{copy.choicesEyebrow}</p><h2 id="service-choices-title">{copy.choicesTitle}</h2></div>
            <p>{copy.choicesBody}</p>
          </div>
          <ol className={styles.cardGrid}>
            {copy.cards.map((card, index) => (
              <li key={card.id}>
                <Link href={serviceHref(card.id, locale)}>
                  <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <p className={styles.cardEyebrow}>{card.eyebrow}</p>
                  <h3>{card.title}</h3><p>{card.body}</p>
                  <span className={styles.action}>{card.action}<span aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.method} aria-labelledby="service-method-title">
          <div><p className={styles.eyebrow}>{copy.methodEyebrow}</p><h2 id="service-method-title">{copy.methodTitle}</h2></div>
          <div><p>{copy.methodBody}</p><div className={styles.methodLinks}><Link href={planning.href}>{copy.methodAction}<span aria-hidden="true">→</span></Link><Link href={`${home.path}guides/`}>{copy.adviceAction}</Link></div></div>
        </section>
      </main>
      <HomegroundFooter locale={locale} pageContext="services" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
