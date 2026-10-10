import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  attractionReservationCityIds,
  attractionReservationEnquiryAnchor,
  attractionReservationFeeDisplay,
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
import { OpenDetailsForHash } from "./OpenDetailsForHash";
import { KeepWords } from "./text/KeepWords";
import styles from "./AttractionReservationsPage.module.css";

const SITE_URL = "https://homegroundchina.com";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/*
 * The headline leads with the Forbidden City, so the hero shows it: the
 * owner-authorised Hall of Supreme Harmony photograph used by the Forbidden
 * City guide (provenance in docs/homeground-photo-provenance.md), with that
 * guide's alt text. It needs no credit line.
 */
const heroImage = {
  src: "/images/guides/forbidden-city-for-foreign-visitors/hero-1600.webp",
  width: 1600,
  height: 1000,
  alt: {
    en: "Hall of Supreme Harmony and its courtyard in the Forbidden City with visitors in view",
    zh: "故宫太和殿与院落，画面中可见游客",
    ko: "관람객이 보이는 자금성 태화전과 뜰",
  },
} as const;

/*
 * Korean headline: a word joiner keeps "자금성·중국" from breaking after the
 * dot, and on phones "중국 관광지" stays on one line (a plain no-break space
 * would overflow the desktop column).
 */
function koreanHeadline(text: string) {
  const keep = "중국 관광지";
  const joined = text.replace("·", "·\u2060");
  const at = joined.indexOf(keep);
  if (at < 0) return joined;
  return <>{joined.slice(0, at)}<span className={styles.keepOnPhone}>{keep}</span>{joined.slice(at + keep.length)}</>;
}

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
        description: `${copy.lede}${locale === "zh" ? "" : " "}${copy.guarantee}`,
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
          // The offer names its price and the booking guarantee that comes with it.
          description: `${unitText}${locale === "zh" ? "。" : ". "}${copy.guarantee}`,
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
    // A best-effort attraction says so on its chip and in the message we receive.
    label: rule.bestEffort ? `${rule.name[locale]} · ${copy.bestEffortTag}` : rule.name[locale],
  }));
  const enquiryCities = attractionReservationCityIds.map((cityId) => ({ id: cityId, label: copy.cities[cityId] }));
  const bookableIds = new Set(enquiryAttractions.map((attraction) => attraction.id));
  // "Request this attraction" lands on the picker and summary, not the section intro above them.
  const reservationFormAnchor = "reservation-form";
  // Chinese uses full-width punctuation between a label and its value and in lists.
  const colon = locale === "zh" ? "：" : ": ";
  const listSeparator = locale === "zh" ? "、" : ", ";

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={localeStyles.skipLink} href="#reservations-main">{home.skipLink}</a>
      <HomegroundHeader languagePaths={attractionReservationLanguagePaths()} locale={locale} pageContext="reservations" />
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
              <h1>{locale === "ko" ? koreanHeadline(copy.h1) : <KeepWords locale={locale} text={copy.h1} />}</h1>
              <p className={styles.lede}>{copy.lede}</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={`#${attractionReservationEnquiryAnchor}`}>{copy.heroCta}<ArrowRight aria-hidden="true" size={18} /></a>
                <a className={styles.textLink} href="#reservation-rules">{copy.tableCta}</a>
              </div>
              <dl className={styles.heroFacts}>
                {copy.heroFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fill(fact.value)}</dd>
                  </div>
                ))}
              </dl>
              <p className={styles.guarantee} data-reservation-guarantee>{copy.guarantee}</p>
            </div>
            <figure className={styles.heroFigure}>
              {/* The photo is cropped to the text column's height, so it draws far wider than its box: ask for the large file. */}
              <Image alt={heroImage.alt[locale]} height={heroImage.height} priority sizes="(max-width: 56rem) calc(100vw - 2rem), 1280px" src={heroImage.src} width={heroImage.width} />
            </figure>
          </div>
        </header>

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

        <section className={styles.enquirySection} id={attractionReservationEnquiryAnchor} aria-labelledby="reservation-enquiry-title">
          <AttractionReservationEnquiry
            attractions={enquiryAttractions}
            cities={enquiryCities}
            copy={copy.enquiry}
            email={homegroundBusiness.serviceEmail}
            fee={attractionReservationFeeDisplay(attractionReservationServiceFeeCny, locale)}
            formId={reservationFormAnchor}
            intro={
              <div className={styles.enquiryIntro}>
                <p className={styles.eyebrow}>{copy.enquiry.eyebrow}</p>
                <h2 id="reservation-enquiry-title">{copy.enquiry.title}</h2>
                <p>{copy.enquiry.intro}</p>
              </div>
            }
            locale={locale}
            pageUrl={`${SITE_URL}${attractionReservationPath[locale]}`}
            privacyHref={privacyHref}
            queryKey={attractionReservationQueryKey}
            tickets={copy.heroFacts[1]}
          />
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
          <OpenDetailsForHash />
          {/* One closed disclosure per city: the full table is long and most
              visitors need one or two cities. Destination pages link to a
              city (#city-beijing); OpenDetailsForHash opens it. */}
          <div className={styles.ruleCities}>
            {attractionReservationCityIds.map((cityId) => {
              const rules = (attractionReservationRules as readonly AttractionReservationRule[]).filter((rule) => rule.city === cityId);
              const count = copy.attractionCount[rules.length === 1 ? "one" : "other"].replace("{count}", String(rules.length));
              return (
                <details className={styles.ruleCity} data-keep-in-view="" id={`city-${cityId}`} key={cityId}>
                  <summary>
                    <span className={styles.ruleCityName}>{copy.cities[cityId]}</span>
                    <span className={styles.ruleCityCount}>{count}</span>
                  </summary>
                  {/* The legend sits with each table, so a deep link (#city-beijing) still explains the dashes. */}
                  <p className={styles.legend}>{copy.unknownLegend}</p>
                  <p className={styles.scrollHint}>{copy.scrollHint}</p>
                  <div className={styles.tableScroll} role="region" aria-labelledby={`city-${cityId}-caption`} tabIndex={0}>
                    <table className={styles.table}>
                      <caption className={styles.visuallyHidden} id={`city-${cityId}-caption`}>{`${copy.cities[cityId]} · ${copy.rulesTitle}`}</caption>
                      <thead>
                        <tr>
                          <th scope="col">{copy.columns.attraction}</th>
                          <th scope="col">{copy.columns.channel}</th>
                          <th scope="col">{copy.columns.passport}</th>
                          <th scope="col">{copy.columns.release}</th>
                          <th scope="col">{copy.columns.realName}</th>
                          <th scope="col">{copy.columns.price}</th>
                          <th scope="col">{copy.columns.notes}</th>
                          <th scope="col">{copy.columns.verified}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rules.map((rule) => {
                          const guide = rule.source ? getGuideEntry(rule.source, locale) : null;
                          // A free walk-in has no booking channel or release to confirm, so its
                          // empty fields say "not applicable" instead of inviting an enquiry.
                          // Other empty fields show a dash (explained above the cities); the
                          // words stay for screen readers.
                          const unknownText = rule.status === "not-needed" ? copy.notApplicable : copy.unknown;
                          const unknown = rule.status === "not-needed"
                            ? <span className={styles.unknown}>{unknownText}</span>
                            : <span className={styles.unknown}><span aria-hidden="true">—</span><span className={styles.visuallyHidden}>{unknownText}</span></span>;
                          const cell = (label: string, value: ReactNode) => (
                            // One wrapper, so the phone card's label | value grid sees a single value.
                            <td data-label={label} data-unknown={value === null ? "" : undefined}><span>{value ?? unknown}</span></td>
                          );
                          // Phones hide the dash cells; this line names them instead (hidden on wider screens).
                          const pending = rule.status === "not-needed" ? [] : [
                            [copy.columns.channel, rule.channels],
                            [copy.columns.passport, rule.passportAccepted],
                            [copy.columns.release, rule.release],
                            [copy.columns.realName, rule.realName],
                            [copy.columns.price, rule.price],
                          ].filter(([, value]) => value === null || value === undefined).map(([label]) => label as string);
                          return (
                            <tr data-status={rule.status} id={`rule-${rule.id}`} key={rule.id}>
                              {/* Every row we book reads "we can book" from the section; only a
                                  different status (a free walk-in) is tagged. */}
                              <th scope="row">
                                {rule.name[locale]}
                                {rule.status !== "offered" ? <span className={styles.status} data-status={rule.status}>{copy.status[rule.status]}</span> : null}
                                {rule.bestEffort ? <span className={styles.status} data-status="best-effort">{copy.bestEffortTag}</span> : null}
                                {/* Back to the form with this attraction ticked (AttractionReservationEnquiry listens). */}
                                {bookableIds.has(rule.id)
                                  ? <a className={styles.reserveLink} data-reserve-attraction={rule.id} href={`#${reservationFormAnchor}`}>{copy.reserveThis}<span className={styles.visuallyHidden}>{colon}{rule.name[locale]}</span><ArrowRight aria-hidden="true" size={14} /></a>
                                  : null}
                              </th>
                              {cell(copy.columns.channel, rule.channels
                                ? rule.channels.map((channel, index, all) => (
                                  // The dot stays with the name before it, so no line starts with "·".
                                  <Fragment key={channel}><span className={styles.nowrap}>{copy.channel[channel]}{index < all.length - 1 ? " ·" : null}</span>{index < all.length - 1 ? " " : null}</Fragment>
                                ))
                                : null)}
                              {cell(copy.columns.passport, booleanText(rule.passportAccepted, locale))}
                              {cell(copy.columns.release, rule.release ? rule.release[locale] : null)}
                              {cell(copy.columns.realName, booleanText(rule.realName, locale))}
                              {cell(copy.columns.price, priceText(rule, locale) === null ? null : <KeepWords locale={locale} text={priceText(rule, locale) as string} />)}
                              <td data-label={copy.columns.notes}>
                                {rule.notes[locale]}
                                {guide ? <> <Link className={styles.sourceLink} href={guide.canonicalPath}>{copy.sourceLabel}{colon}{guide.navTitle}</Link></> : null}
                              </td>
                              <td data-label={copy.columns.verified}>
                                {rule.verifiedAt
                                  ? <time dateTime={rule.verifiedAt}>{formatDate(rule.verifiedAt, locale)}</time>
                                  : <span className={styles.unknown}>{copy.notChecked}</span>}
                              </td>
                              {/* Phones: one muted footer with the checked date and the fields confirmed on enquiry. */}
                              <td className={styles.cardFooter}>
                                {rule.verifiedAt ? `${copy.columns.verified} ${formatDate(rule.verifiedAt, locale)}` : copy.notChecked}
                                {pending.length ? <span className={styles.pendingFields}>{copy.unknown}{colon}{pending.join(listSeparator)}</span> : null}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </details>
              );
            })}
          </div>
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
