import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  attractionReservationCityIds,
  attractionReservationEnquiryAnchor,
  attractionReservationPath,
  attractionReservationQueryKey,
  attractionReservationRules,
  attractionReservationServiceFeeCny,
  formatAttractionFaceValue,
  formatAttractionReservationFee,
  getBookableAttractionReservationRules,
  type AttractionReservationRule,
} from "../lib/attractionReservations";
import { fillReservationCopy, getAttractionReservationCopy } from "../lib/attractionReservationsI18n";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { getGuideEntry } from "../lib/guideRegistry";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { AttractionReservationEnquiry } from "./AttractionReservationEnquiry";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { KeepWords } from "./text/KeepWords";
import styles from "./AttractionReservationsPage.module.css";

const SITE_URL = "https://homegroundchina.com";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/*
 * The hero reuses the Chengdu tour's Wikimedia Commons panda photograph
 * (George Lu, CC BY 2.0); the credit is shown beside it as the licence asks.
 */
const heroImage = {
  src: "/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/hero-panda-1600.webp",
  width: 1600,
  height: 1000,
  alt: {
    en: "A giant panda at Chengdu Research Base of Giant Panda Breeding",
    zh: "成都大熊猫繁育研究基地内的大熊猫",
    ko: "청두 자이언트판다 번식연구기지의 자이언트판다",
  },
  credit: "George Lu",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Panda_in_Chengdu_Research_Base_of_Giant_Panda_Breeding_-_7708872342.jpg",
  licence: "CC BY 2.0",
  licenceUrl: "https://creativecommons.org/licenses/by/2.0/",
} as const;

export function attractionReservationLanguagePaths() {
  return {
    en: attractionReservationPath.en,
    zh: attractionReservationPath.zh,
    ko: attractionReservationPath.ko,
  };
}

function formatDate(value: string, locale: HomegroundLocale) {
  return new Intl.DateTimeFormat(
    locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-GB",
    { dateStyle: "medium", timeZone: "UTC" },
  ).format(new Date(`${value}T00:00:00.000Z`));
}

function priceText(rule: AttractionReservationRule, locale: HomegroundLocale) {
  const copy = getAttractionReservationCopy(locale);
  if (!rule.price) return null;
  if (rule.price.kind === "free-reservation") return copy.free;
  if (rule.price.kind === "free-walk-in") return copy.freeWalkIn;
  return `${formatAttractionFaceValue(rule.price.amount, locale)} · ${rule.price.basis[locale]}`;
}

function booleanText(value: boolean | null, locale: HomegroundLocale) {
  const copy = getAttractionReservationCopy(locale);
  if (value === null) return null;
  return value ? copy.yes : copy.no;
}

function structuredData(locale: HomegroundLocale, fee: string) {
  const copy = getAttractionReservationCopy(locale);
  const home = getHomegroundCopy(locale);
  const canonicalUrl = `${SITE_URL}${attractionReservationPath[locale]}`;
  const servicesUrl = `${SITE_URL}${home.path}services/`;
  const fill = (text: string) => fillReservationCopy(text, { fee });
  // The offer is priced in CNY, so its words name the CNY fee, not the page's display currency.
  const cnyFee = formatAttractionFaceValue(attractionReservationServiceFeeCny, locale);
  const unitText = fillReservationCopy(copy.heroFacts[0].value, { fee: cnyFee });
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: copy.h1,
        description: fill(copy.metadata.description),
        inLanguage: home.htmlLang,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${canonicalUrl}#service` },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: copy.navLabel,
        serviceType: copy.navLabel,
        description: copy.lede,
        url: canonicalUrl,
        inLanguage: home.htmlLang,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: attractionReservationCityIds.map((cityId) => ({
          "@type": "City",
          name: copy.cities[cityId],
        })),
        offers: {
          "@type": "Offer",
          url: `${canonicalUrl}#${attractionReservationEnquiryAnchor}`,
          price: String(attractionReservationServiceFeeCny),
          priceCurrency: "CNY",
          description: unitText,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(attractionReservationServiceFeeCny),
            priceCurrency: "CNY",
            unitText,
          },
          seller: { "@id": ORGANIZATION_ID },
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        url: canonicalUrl,
        inLanguage: home.htmlLang,
        isPartOf: { "@id": `${canonicalUrl}#webpage` },
        mainEntity: copy.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: fill(item.answer) },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: copy.home, item: `${SITE_URL}${home.path}` },
          { "@type": "ListItem", position: 2, name: copy.services, item: servicesUrl },
          { "@type": "ListItem", position: 3, name: copy.navLabel, item: canonicalUrl },
        ],
      },
    ],
  };
}

export function AttractionReservationsPage({ locale }: { locale: HomegroundLocale }) {
  const copy = getAttractionReservationCopy(locale);
  const home = getHomegroundCopy(locale);
  const fee = formatAttractionReservationFee(attractionReservationServiceFeeCny, locale);
  const fill = (text: string) => fillReservationCopy(text, { fee });
  const localePath = locale === "en" ? "" : `/${locale}`;
  const privacyHref = `${localePath}/privacy/`;
  const schema = structuredData(locale, fee);
  const enquiryAttractions = getBookableAttractionReservationRules().map((rule) => ({
    id: rule.id,
    city: rule.city,
    label: rule.name[locale],
  }));
  const enquiryCities = attractionReservationCityIds.map((cityId) => ({ id: cityId, label: copy.cities[cityId] }));

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={localeStyles.skipLink} href="#reservations-main">{home.skipLink}</a>
      <HomegroundHeader languagePaths={attractionReservationLanguagePaths()} locale={locale} pageContext="services" />
      <main id="reservations-main" tabIndex={-1}>
        <header className={styles.hero}>
          <nav aria-label={copy.breadcrumb} className={styles.breadcrumb}>
            <ol>
              <li><Link href={home.path}>{copy.home}</Link></li>
              <li><span aria-hidden="true">/</span><Link href={`${home.path}services/`}>{copy.services}</Link></li>
              <li aria-current="page"><span aria-hidden="true">/</span>{copy.navLabel}</li>
            </ol>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1><KeepWords locale={locale} text={copy.h1} /></h1>
              <p className={styles.lede}>{copy.lede}</p>
              <dl className={styles.heroFacts}>
                {copy.heroFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fill(fact.value)}</dd>
                  </div>
                ))}
              </dl>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={`#${attractionReservationEnquiryAnchor}`}>{copy.heroCta}<ArrowRight aria-hidden="true" size={18} /></a>
                <a className={styles.textLink} href="#reservation-rules">{copy.tableCta}</a>
              </div>
            </div>
            <figure className={styles.heroFigure}>
              <Image alt={heroImage.alt[locale]} height={heroImage.height} priority sizes="(max-width: 56rem) calc(100vw - 2rem), 40vw" src={heroImage.src} width={heroImage.width} />
              <figcaption>
                <a href={heroImage.sourceUrl} rel="noreferrer">{heroImage.credit}</a>
                <span aria-hidden="true"> · </span>
                <a href={heroImage.licenceUrl} rel="noreferrer">{heroImage.licence}</a>
              </figcaption>
            </figure>
          </div>
        </header>

        <section className={styles.twoColumn} aria-labelledby="reservation-what-title">
          <div>
            <h2 id="reservation-what-title">{copy.whatTitle}</h2>
            {copy.whatBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={styles.tile}>
            <h2 id="reservation-for-title">{copy.forTitle}</h2>
            <ul>{copy.forItems.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="reservation-steps-title">
          <h2 id="reservation-steps-title">{copy.stepsTitle}</h2>
          <ol className={styles.steps}>
            {copy.steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="reservation-price-title">
          <h2 id="reservation-price-title">{copy.pricingTitle}</h2>
          <p className={styles.sectionLead}>{copy.pricingLead}</p>
          <ul className={styles.priceGrid}>
            {copy.pricing.map((item) => (
              <li key={item.title}>
                <h3>{fill(item.title)}</h3>
                <p>{fill(item.body)}</p>
              </li>
            ))}
          </ul>
          <p className={styles.note}>{copy.currencyNote}</p>
        </section>

        <section className={styles.twoColumn} aria-labelledby="reservation-limits-title">
          <div>
            <h2 id="reservation-limits-title">{copy.limitsTitle}</h2>
            <ul className={styles.plainList}>{copy.limits.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className={styles.tile}>
            <h2 id="reservation-compliance-title">{copy.complianceTitle}</h2>
            <ul className={styles.checkList}>{copy.compliance.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="reservation-passport-title">
          <h2 id="reservation-passport-title">{copy.passportTitle}</h2>
          <p className={styles.sectionLead}>{copy.passportBody}</p>
          <p className={styles.policyLinks}>
            <Link href={privacyHref}>{copy.privacyLink}</Link>
            <Link href={`${localePath}/terms/`}>{copy.termsLink}</Link>
            <Link href={`${localePath}/refund-delivery/`}>{copy.refundLink}</Link>
          </p>
        </section>

        <section className={styles.rules} id="reservation-rules" aria-labelledby="reservation-rules-title">
          <h2 id="reservation-rules-title">{copy.rulesTitle}</h2>
          <p className={styles.sectionLead}>{copy.rulesIntro}</p>
          <p className={styles.scrollHint}>{copy.scrollHint}</p>
          <div className={styles.tableScroll} role="region" aria-labelledby="reservation-rules-caption" tabIndex={0}>
            <table className={styles.table}>
              <caption id="reservation-rules-caption">{copy.rulesCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">{copy.columns.attraction}</th>
                  <th scope="col">{copy.columns.status}</th>
                  <th scope="col">{copy.columns.channel}</th>
                  <th scope="col">{copy.columns.passport}</th>
                  <th scope="col">{copy.columns.release}</th>
                  <th scope="col">{copy.columns.realName}</th>
                  <th scope="col">{copy.columns.price}</th>
                  <th scope="col">{copy.columns.notes}</th>
                  <th scope="col">{copy.columns.verified}</th>
                </tr>
              </thead>
              {attractionReservationCityIds.map((cityId) => (
                <tbody id={`city-${cityId}`} key={cityId}>
                  <tr className={styles.cityRow}>
                    <th colSpan={9} scope="rowgroup">{copy.cities[cityId]}</th>
                  </tr>
                  {(attractionReservationRules as readonly AttractionReservationRule[])
                    .filter((rule) => rule.city === cityId)
                    .map((rule) => {
                      const guide = rule.source ? getGuideEntry(rule.source, locale) : null;
                      const unknown = <span className={styles.unknown}>{copy.unknown}</span>;
                      return (
                        <tr data-status={rule.status} id={`rule-${rule.id}`} key={rule.id}>
                          <th scope="row">{rule.name[locale]}</th>
                          <td><span className={styles.status} data-status={rule.status}>{copy.status[rule.status]}</span></td>
                          <td>{rule.channels ? rule.channels.map((channel) => copy.channel[channel]).join(" · ") : unknown}</td>
                          <td>{booleanText(rule.passportAccepted, locale) ?? unknown}</td>
                          <td>{rule.release ? rule.release[locale] : unknown}</td>
                          <td>{booleanText(rule.realName, locale) ?? unknown}</td>
                          <td>{priceText(rule, locale) ?? unknown}</td>
                          <td>
                            {rule.notes[locale]}
                            {guide ? <> <Link className={styles.sourceLink} href={guide.canonicalPath}>{copy.sourceLabel}: {guide.navTitle}</Link></> : null}
                          </td>
                          <td><time dateTime={rule.verifiedAt}>{formatDate(rule.verifiedAt, locale)}</time></td>
                        </tr>
                      );
                    })}
                </tbody>
              ))}
            </table>
          </div>
        </section>

        <section className={styles.enquirySection} id={attractionReservationEnquiryAnchor} aria-labelledby="reservation-enquiry-title">
          <div className={styles.enquiryIntro}>
            <p className={styles.eyebrow}>{copy.enquiry.eyebrow}</p>
            <h2 id="reservation-enquiry-title">{copy.enquiry.title}</h2>
            <p>{copy.enquiry.intro}</p>
          </div>
          <AttractionReservationEnquiry
            attractions={enquiryAttractions}
            cities={enquiryCities}
            copy={copy.enquiry}
            email={homegroundBusiness.serviceEmail}
            locale={locale}
            pageUrl={`${SITE_URL}${attractionReservationPath[locale]}`}
            privacyHref={privacyHref}
            queryKey={attractionReservationQueryKey}
          />
        </section>

        <section className={styles.section} aria-labelledby="reservation-faq-title">
          <h2 id="reservation-faq-title">{copy.faqTitle}</h2>
          <div className={styles.faqList}>
            {copy.faqs.map((item) => (
              <details key={item.question}>
                <summary><h3>{item.question}</h3></summary>
                <p>{fill(item.answer)}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <HomegroundFooter locale={locale} pageContext="content" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </div>
  );
}
