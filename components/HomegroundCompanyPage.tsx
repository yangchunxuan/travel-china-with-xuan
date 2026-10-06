import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { destinationHubIds, getDestinationHubEntry } from "../lib/destinationHubs";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { homegroundCareersCopy } from "../lib/homegroundCareersCopy";
import {
  getCompanyLanguagePaths,
  getHomegroundCompanyCopy,
  HOMEGROUND_IN_TRAVEL_SINCE,
} from "../lib/homegroundCompanyI18n";
import {
  getHomegroundCopy,
  homegroundLocales,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { getHomegroundLegalPath } from "../lib/homegroundLegalI18n";
import { HOMEGROUND_TEAM_SIZE } from "../lib/homegroundStudioI18n";
import { editorialOrganizationSchema } from "../lib/editorialIdentity";
import { getPublishedPrivateTourCatalog } from "../lib/publishedPrivateTourCatalog";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";
import { RollingNumber } from "./motion/RollingNumber";
import { ScrollWords } from "./motion/ScrollWords";
import styles from "./HomegroundAboutPages.module.css";

const smallVariant = (path: string) => path.replace(/\.(webp|jpe?g|png)$/i, ".w640.webp");

/**
 * /company/, laid out after x.ai/company: the position first (no tour group,
 * the hard parts are ours), the numbers, the six reasons it holds, how much
 * help a traveller can ask for, why we do it, where and since when, then links
 * on to the team, the licences and careers.
 */
export function HomegroundCompanyPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const homeCopy = getHomegroundCopy(locale);
  const copy = getHomegroundCompanyCopy(locale);
  const studioPath = `${homeCopy.path}studio/`;
  const businessPath = getHomegroundLegalPath("business-information", locale);
  const proof = [
    { value: HOMEGROUND_IN_TRAVEL_SINCE, label: copy.proof.since },
    { value: HOMEGROUND_TEAM_SIZE, label: copy.proof.people },
    { value: getPublishedPrivateTourCatalog(locale).length, label: copy.proof.tours },
    { value: homegroundLocales.length, label: copy.proof.languages },
  ];
  const helpLinks = [
    { ...copy.help.tickets, href: `${homeCopy.path}services/china-attraction-reservations/` },
    { ...copy.help.guide, href: `${homeCopy.path}services/private-english-speaking-guides/` },
    { ...copy.help.trip, href: `${homeCopy.path}services/full-trip-support/` },
  ];
  const cities = destinationHubIds.map((id) => getDestinationHubEntry(id, locale));
  const nextLinks = [
    { ...copy.next.team, href: studioPath, external: false },
    { ...copy.next.credentials, href: businessPath, external: false },
    // Careers is in Chinese only; other languages say so in the title.
    { ...copy.next.careers, href: homegroundCareersCopy.path, external: locale !== "zh" },
  ];
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `https://homegroundchina.com${copy.path}`,
    name: copy.metadata.openGraphTitle,
    inLanguage: homeCopy.htmlLang,
    mainEntity: {
      ...editorialOrganizationSchema(),
      legalName: homegroundBusiness.registeredName,
      foundingDate: homegroundBusiness.registrationDate,
      email: homegroundBusiness.serviceEmail,
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: HOMEGROUND_TEAM_SIZE,
      },
      identifier: [
        {
          "@type": "PropertyValue",
          propertyID: "Unified Social Credit Code",
          value: homegroundBusiness.unifiedSocialCreditCode,
        },
        {
          "@type": "PropertyValue",
          propertyID: "Travel agency licence",
          value: homegroundBusiness.travelAgencyLicenceNumber,
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: homegroundBusiness.registeredAddress,
        addressLocality: "Beijing",
        addressCountry: "CN",
      },
    },
  };

  return (
    <div
      className={`${localeStyles.root} hg-locale-root ${styles.page}`}
      data-homeground-locale={locale}
      lang={homeCopy.htmlLang}
    >
      <a className={localeStyles.skipLink} href="#company-main">
        {homeCopy.skipLink}
      </a>
      <HomegroundHeader
        locale={locale}
        pageContext="company"
        languagePaths={getCompanyLanguagePaths()}
        navigationIsExact
      />

      <main id="company-main" tabIndex={-1}>
        <section aria-labelledby="company-title" className={styles.hero}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 id="company-title">
            <AnimatedHeadline locale={locale} segments={copy.titleLines} text={copy.title} />
          </h1>
          <p className={styles.heroBody}>{copy.intro}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href={studioPath}>
              {copy.teamAction}
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className={styles.secondaryAction} href={businessPath}>
              {copy.credentialsAction}
            </Link>
          </div>
        </section>

        <section aria-label={copy.proof.label} className={styles.band}>
          <ul className={styles.proof}>
            {proof.map((item) => (
              <li key={item.label}>
                <b><RollingNumber value={item.value} /></b>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="company-reasons-title" className={styles.band}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.reasons.eyebrow}</p>
            <h2 id="company-reasons-title">
              <ScrollWords locale={locale} text={copy.reasons.title} />
            </h2>
          </header>
          <ul className={styles.tiles} data-columns="3">
            {copy.reasons.items.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="company-help-title" className={styles.band}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.help.eyebrow}</p>
            <h2 id="company-help-title">
              <ScrollWords locale={locale} text={copy.help.title} />
            </h2>
          </header>
          <ul className={styles.nextLinks}>
            {helpLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className={styles.linkLabel}>
                    {item.link}
                    <ArrowRight aria-hidden="true" size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="company-why-title" className={styles.band}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.why.eyebrow}</p>
            <h2 id="company-why-title">
              <ScrollWords locale={locale} text={copy.why.title} />
            </h2>
            <p>{copy.why.body}</p>
          </header>
          <ol className={styles.values}>
            {copy.why.values.map((item, index) => (
              <li key={item.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="company-cities-title" className={styles.band}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.cities.eyebrow}</p>
            <h2 id="company-cities-title">
              <ScrollWords locale={locale} text={copy.cities.title} />
            </h2>
            <p>{copy.cities.intro}</p>
          </header>
          <ul className={styles.cities}>
            {cities.map((city) => (
              <li key={city.id}>
                <Link href={city.canonicalPath}>
                  {/* Each photo keeps its own shape; nothing is cropped. */}
                  <img
                    alt=""
                    decoding="async"
                    height={city.imageHeight}
                    loading="lazy"
                    src={smallVariant(city.heroImagePath)}
                    width={city.imageWidth}
                  />
                  <span>{city.navTitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="company-timeline-title" className={styles.band}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.timeline.eyebrow}</p>
            <h2 id="company-timeline-title">
              <ScrollWords locale={locale} text={copy.timeline.title} />
            </h2>
          </header>
          <ol className={styles.timeline}>
            {copy.timeline.items.map((item) => (
              <li key={item.title}>
                <p className={styles.timelineDate}>{item.date}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="company-next-title" className={styles.band} data-last="">
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.next.eyebrow}</p>
            <h2 id="company-next-title">
              <ScrollWords locale={locale} text={copy.next.title} />
            </h2>
          </header>
          <ul className={styles.nextLinks}>
            {nextLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} hrefLang={item.external ? "zh-Hans" : undefined}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  {item.external ? (
                    <ArrowUpRight aria-hidden="true" size={20} />
                  ) : (
                    <ArrowRight aria-hidden="true" size={20} />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <HomegroundFooter locale={locale} pageContext="company" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
