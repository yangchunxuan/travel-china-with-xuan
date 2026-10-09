import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import {
  attractionReservationHref, attractionReservationServiceFeeCny, formatAttractionReservationFee,
  getAttractionReservationRule,
} from "../lib/attractionReservations";
import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS } from "../lib/attractionReservationGuarantee";
import { getGuidePath } from "../lib/guidePath";
import type { GuideId } from "../lib/guideRegistry";
import { buildTicketReleaseStructuredData, ticketReleaseOtherAttractionIds } from "../lib/ticketReleaseTimeMetadata";
import { fillTicketReleaseCopy, getTicketReleaseTimeCopy } from "../lib/ticketReleaseTimeI18n";
import { ticketReleaseRules, ticketReleaseToolPath } from "../lib/ticketReleaseTimes";
import { HomegroundHeader } from "./HomegroundHeader";
import { HomegroundFooter } from "./HomegroundFooter";
import { TicketReleaseCalculator } from "./TicketReleaseCalculator";
import localeStyles from "./LocaleRoot.module.css";
import styles from "./TicketReleaseTimePage.module.css";

const dateLocales: Record<HomegroundLocale, string> = { en: "en-GB", zh: "zh-CN", ko: "ko-KR" };

export function formatCheckedDate(isoDate: string, locale: HomegroundLocale) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat(dateLocales[locale], { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" })
    .format(new Date(Date.UTC(year, month - 1, day, 12)));
}

export function TicketReleaseTimePage({ locale = "en" }: { locale?: HomegroundLocale }) {
  const home = getHomegroundCopy(locale);
  const copy = getTicketReleaseTimeCopy(locale);
  const rule = ticketReleaseRules["forbidden-city"];
  const checked = formatCheckedDate(rule.releaseCheckedAt, locale);
  const values = { days: rule.daysBefore, time: rule.chinaTime, date: checked };
  const fill = (template: string) => fillTicketReleaseCopy(template, values);
  const guideHref = getGuidePath("forbidden-city-for-foreign-visitors", locale);
  const others = ticketReleaseOtherAttractionIds
    .map((id) => getAttractionReservationRule(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item?.release));

  return (
    <div className={[localeStyles.root, "hg-locale-root", styles.page].join(" ")}
      data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={localeStyles.skipLink} href="#ticket-release-main">{home.skipLink}</a>
      <HomegroundHeader locale={locale} pageContext="guides" languagePaths={ticketReleaseToolPath} />
      <main id="ticket-release-main" tabIndex={-1}>
        <header className={styles.hero}>
          <nav className={styles.breadcrumb} aria-label={copy.breadcrumb}>
            <ol>
              <li><Link href={home.path}>{copy.home}</Link></li>
              <li><Link href={home.path + "tools/"}>{copy.tools}</Link></li>
              <li aria-current="page">{copy.name}</li>
            </ol>
          </nav>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>{copy.h1}</h1>
          <p className={styles.lede}>{fill(copy.lede)}</p>
          <ul className={styles.facts}>
            <li>{fill(copy.facts.release)}</li>
            <li>{copy.facts.noSameDay}</li>
            <li>{fill(copy.facts.checked)}</li>
          </ul>
        </header>

        <section className={styles.toolSection} aria-label={copy.name}>
          <TicketReleaseCalculator locale={locale} copy={copy.calculator} />
        </section>

        <section className={[styles.section, styles.split].join(" ")} aria-labelledby="release-steps-title">
          <div>
            <h2 id="release-steps-title">{copy.stepsTitle}</h2>
            <p>{fill(copy.stepsBody)}</p>
            <Link className={styles.textLink} href={guideHref}>
              {copy.guideLink}<ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <div>
            <ol className={styles.steps}>{copy.steps.map((step) => <li key={step}>{fill(step)}</li>)}</ol>
            <a className={styles.textLink} href={rule.officialUrl} rel="noopener" target="_blank">
              {copy.portalLink}<ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>
        </section>

        <aside className={styles.service} aria-label={copy.serviceLabel} data-ticket-release-service-cta>
          <div>
            <p className={styles.eyebrow}>{copy.serviceLabel}</p>
            <h2>{copy.serviceTitle}</h2>
            <p>{fillTicketReleaseCopy(copy.serviceBody, {
              fee: formatAttractionReservationFee(attractionReservationServiceFeeCny, locale),
              leadDays: ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS,
            })}</p>
          </div>
          <a className={styles.primaryButton} href={attractionReservationHref(locale, "forbidden-city")}>
            {copy.serviceAction}<ArrowRight aria-hidden="true" size={18} />
          </a>
        </aside>

        <section className={styles.section} aria-labelledby="release-others-title">
          <div className={styles.sectionIntro}>
            <h2 id="release-others-title">{copy.othersTitle}</h2>
            <p>{copy.othersBody}</p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">{copy.othersColumns.attraction}</th>
                  <th scope="col">{copy.othersColumns.release}</th>
                  <th scope="col">{copy.othersColumns.checked}</th>
                </tr>
              </thead>
              <tbody>
                {others.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">
                      {item.source
                        ? <Link href={getGuidePath(item.source as GuideId, locale)}>{item.name[locale]}</Link>
                        : item.name[locale]}
                    </th>
                    <td>{item.release?.[locale]}</td>
                    <td data-label={copy.othersColumns.checked}>{item.verifiedAt ? formatCheckedDate(item.verifiedAt, locale) : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={[styles.section, styles.faq].join(" ")} aria-labelledby="release-faq-title">
          <h2 id="release-faq-title">{copy.faqTitle}</h2>
          <div>{copy.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{fill(item.answer)}</p>
            </details>
          ))}</div>
        </section>
      </main>
      <HomegroundFooter locale={locale} pageContext="guides" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildTicketReleaseStructuredData(locale)).replace(/</g, "\\u003c"),
      }} />
    </div>
  );
}
