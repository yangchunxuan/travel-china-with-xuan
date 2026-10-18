import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { privateGuideCities, privateGuideHours, privateGuideRates, privateGuideServicePath, privateGuideEnquiryAnchor, privateGuidePeakPrice, formatPrivateGuidePrice } from "../lib/privateGuideServices";
import { getPrivateGuideServiceCopy } from "../lib/privateGuideServicesI18n";
import { getPrivateGuideServiceEditionCopy, formatPrivateGuideEditionPrice } from "../lib/privateGuideServiceEditions";
import { serviceDetailLanguagePaths, serviceEditionPaths, serviceEditionLabels, type ServiceEditionLocale } from "../lib/serviceEdition";
import { zhangjiajieTourComparisonHref } from "../lib/zhangjiajieTourComparison";
import { HomegroundHeader } from "./HomegroundHeader";
import { HomegroundFooter } from "./HomegroundFooter";
import { ServiceEditionHeader, ServiceEditionFooter } from "./ServiceEditionChrome";
import { PrivateGuideEnquiry } from "./PrivateGuideEnquiry";
import styles from "./PrivateGuideServicesPage.module.css";
import localeStyles from "./LocaleRoot.module.css";

const SITE_URL = "https://homegroundchina.com";
const serviceSlug = "private-english-speaking-guides";

function guidePriceFunctions(locale: HomegroundLocale, editionLocale?: ServiceEditionLocale) {
  const price = (amount: number) => editionLocale ? formatPrivateGuideEditionPrice(amount, editionLocale) : formatPrivateGuidePrice(amount, locale);
  const peak = (city: typeof privateGuideCities[number]) => {
    if (!editionLocale) return privateGuidePeakPrice(city, locale);
    const rate = privateGuideRates[city];
    return rate.peakMinCny === rate.peakMaxCny ? price(rate.peakMinCny) : `${price(rate.peakMinCny)}–${price(rate.peakMaxCny)}`;
  };
  return { price, peak };
}

function structuredData(locale: HomegroundLocale, editionLocale?: ServiceEditionLocale) {
  const copy = editionLocale ? getPrivateGuideServiceEditionCopy(editionLocale) : getPrivateGuideServiceCopy(locale);
  const home = getHomegroundCopy(locale);
  const paths = editionLocale ? serviceEditionPaths(editionLocale) : null;
  const homePath = paths?.home ?? home.path;
  const homeLabel = editionLocale ? serviceEditionLabels[editionLocale].home : home.navigation.homeLabel;
  const url = `${SITE_URL}${paths?.guide ?? privateGuideServicePath[locale]}`;
  const { price, peak } = guidePriceFunctions(locale, editionLocale);
  const provider = { "@id": `${SITE_URL}/#organization` };
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.metadata.title, description: copy.metadata.description, inLanguage: editionLocale ?? home.htmlLang,
        isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": `${url}#service` }, breadcrumb: { "@id": `${url}#breadcrumb` } },
      { "@type": "Service", "@id": `${url}#service`, name: copy.eyebrow, description: `${copy.citiesBody} ${copy.scopeNote}`, url, provider,
        areaServed: privateGuideCities.map((city) => ({ "@type": "City", name: copy.cities[city].name })),
        hasOfferCatalog: { "@type": "OfferCatalog", name: copy.citiesTitle,
          itemListElement: privateGuideCities.map((city) => ({ "@type": "Offer", url: `${url}#${city}`, price: privateGuideRates[city].standardCny, priceCurrency: "CNY",
            description: `${copy.standard}: ${price(privateGuideRates[city].standardCny)}. ${copy.peak}: ${peak(city)}. ${copy.unit}. ${copy.citiesBody}`,
            priceSpecification: { "@type": "UnitPriceSpecification", price: privateGuideRates[city].standardCny, priceCurrency: "CNY", unitText: copy.unit },
            itemOffered: { "@type": "Service", name: `${copy.cities[city].name} · ${copy.eyebrow}`, areaServed: { "@type": "City", name: copy.cities[city].name }, provider }, seller: provider,
          })),
        } },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: `${SITE_URL}${homePath}` },
        { "@type": "ListItem", position: 2, name: copy.services, item: `${SITE_URL}${paths?.services ?? `${home.path}services/`}` },
        { "@type": "ListItem", position: 3, name: copy.eyebrow, item: url },
      ] },
      { "@type": "FAQPage", "@id": `${url}#faq`, inLanguage: editionLocale ?? home.htmlLang, mainEntity: copy.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ],
  };
}

export function PrivateGuideServicesPage({ locale = "en", editionLocale }: { locale?: HomegroundLocale; editionLocale?: ServiceEditionLocale }) {
  const home = getHomegroundCopy(locale);
  const copy = editionLocale ? getPrivateGuideServiceEditionCopy(editionLocale) : getPrivateGuideServiceCopy(locale);
  const paths = editionLocale ? serviceEditionPaths(editionLocale) : null;
  const homePath = paths?.home ?? home.path;
  const homeLabel = editionLocale ? serviceEditionLabels[editionLocale].home : home.navigation.homeLabel;
  const skipLink = editionLocale ? serviceEditionLabels[editionLocale].skipLink : home.skipLink;
  const { price, peak } = guidePriceFunctions(locale, editionLocale);
  const enquire = `#${privateGuideEnquiryAnchor}`;
  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={editionLocale ?? locale} lang={editionLocale ?? home.htmlLang}>
      <a className={localeStyles.skipLink} href="#private-guide-main">{skipLink}</a>
      {editionLocale ? <ServiceEditionHeader language={editionLocale} slug={serviceSlug} plannerHrefOverride={enquire} /> : <HomegroundHeader locale={locale} pageContext="services" languagePaths={Object.fromEntries(serviceDetailLanguagePaths(serviceSlug).map(item => [item.lang, item.path]))} />}
      <main id="private-guide-main" tabIndex={-1}>
        <header className={styles.hero}>
          <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}>
            <ol><li><Link href={homePath}>{homeLabel}</Link></li><li><Link href={paths?.services ?? `${home.path}services/`}>{copy.services}</Link></li><li aria-current="page">{copy.ask}</li></ol>
          </nav>
          <div className={styles.heroGrid}>
            <div><p className={styles.eyebrow}>{copy.eyebrow}</p><h1>{copy.h1}</h1><p className={styles.lede}>{copy.lede}</p>
              <a className={styles.primaryButton} href={enquire}>{copy.ask}<ArrowRight aria-hidden="true" size={18} /></a>
            </div>
            <aside className={styles.dayCard} aria-label={copy.unit}>
              <p className={styles.hours}>{privateGuideHours}<span>h</span></p>
              <ul>{copy.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
            </aside>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="guide-cities-title">
          <div className={styles.sectionIntro}><h2 id="guide-cities-title">{copy.citiesTitle}</h2><p>{copy.citiesBody}</p></div>
          <ol className={styles.cityGrid}>
            {privateGuideCities.map((city, index) => <li className={styles.cityCard} id={city} key={city}>
              <div className={styles.cityHeading}><span className={styles.eyebrow}>{String(index + 1).padStart(2, "0")}</span><h3>{copy.cities[city].name}</h3></div>
              <p className={styles.cityDescription}>
                {copy.cities[city].description}
                {city === "zhangjiajie" ? <>{" "}{copy.zhangjiajieRoutes.note}{" "}<Link href={paths?.comparison ?? zhangjiajieTourComparisonHref(locale)}>{copy.zhangjiajieRoutes.action}</Link></> : null}
              </p>
              <dl><div><dt>{copy.standard}</dt><dd className={styles.price}>{price(privateGuideRates[city].standardCny)}</dd></div><div><dt>{copy.peak}</dt><dd>{peak(city)}</dd></div></dl>
              <p className={styles.unit}>{copy.unit}</p>
              <a className={styles.textLink} href={enquire}>{copy.ask}<ArrowRight aria-hidden="true" size={17} /></a>
            </li>)}
          </ol>
          <p className={styles.note}>{copy.priceNote}</p>
        </section>

        <section className={styles.section} aria-labelledby="guide-scope-title">
          <h2 id="guide-scope-title">{copy.scopeTitle}</h2>
          <div className={styles.scopeGrid}><div><h3>{copy.includedTitle}</h3><ul>{copy.included.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>{copy.separateTitle}</h3><ul>{copy.separate.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
          <p className={styles.note}>{copy.scopeNote}</p>
        </section>

        <section className={`${styles.section} ${styles.faq}`} aria-labelledby="guide-faq-title">
          <h2 id="guide-faq-title">{copy.faqTitle}</h2>
          <div>{copy.faq.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
        </section>

        <section className={`${styles.section} ${styles.enquirySection}`} id={privateGuideEnquiryAnchor} aria-labelledby="guide-enquiry-title">
          <div><p className={styles.eyebrow}>{copy.ask}</p><h2 id="guide-enquiry-title">{copy.enquiry.title}</h2><p className={styles.lede}>{copy.enquiry.body}</p></div>
          <PrivateGuideEnquiry locale={locale} editionLocale={editionLocale} />
        </section>
      </main>
      {editionLocale ? <ServiceEditionFooter language={editionLocale} slug={serviceSlug} /> : <HomegroundFooter locale={locale} pageContext="services" />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale, editionLocale)).replace(/</g, "\\u003c") }} />
    </div>
  );
}
