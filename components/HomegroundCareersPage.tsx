import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import { getCareersLanguagePaths, homegroundCareersCopy as copy } from "../lib/homegroundCareersCopy";
import { getHomegroundCompanyCopy } from "../lib/homegroundCompanyI18n";
import { getHomegroundCopy } from "../lib/homegroundI18n";
import { EDITORIAL_ORGANIZATION_ID } from "../lib/editorialIdentity";
import { CopyWeChatId } from "./CopyWeChatId";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";
import { ScrollWords } from "./motion/ScrollWords";
import styles from "./HomegroundAboutPages.module.css";
import careerStyles from "./HomegroundCareersPage.module.css";

/** The day these roles were first published; update when the roles change. */
const ROLES_POSTED = "2026-10-04";
const siteUrl = "https://homegroundchina.com";

/**
 * /zh/careers/: Chinese only. How we work, the three open roles, why join,
 * and how to apply (WeChat only).
 */
export function HomegroundCareersPage() {
  const locale = "zh";
  const homeCopy = getHomegroundCopy(locale);
  const companyPath = getHomegroundCompanyCopy(locale).path;
  const jobSchema = {
    "@context": "https://schema.org",
    "@graph": copy.roles.items.map((role) => ({
      "@type": "JobPosting",
      title: role.title,
      description: [
        `<p>${role.summary}</p>`,
        `<p>${copy.roles.dutiesLabel}</p><ul>${role.duties.map((item) => `<li>${item}</li>`).join("")}</ul>`,
        `<p>${copy.roles.requirementsLabel}</p><ul>${role.requirements.map((item) => `<li>${item}</li>`).join("")}</ul>`,
        `<p>${copy.apply.note}</p>`,
      ].join(""),
      datePosted: ROLES_POSTED,
      hiringOrganization: {
        "@type": "TravelAgency",
        "@id": EDITORIAL_ORGANIZATION_ID,
        name: homegroundBusiness.brand,
        legalName: homegroundBusiness.registeredName,
        sameAs: `${siteUrl}/`,
      },
      jobLocation: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressCountry: "CN" },
      },
      url: `${siteUrl}${copy.path}#role-${role.id}`,
      directApply: false,
    })),
  };

  return (
    <div
      className={`${localeStyles.root} hg-locale-root ${styles.page}`}
      data-homeground-locale={locale}
      lang={homeCopy.htmlLang}
    >
      <a className={localeStyles.skipLink} href="#careers-main">
        {homeCopy.skipLink}
      </a>
      <HomegroundHeader
        locale={locale}
        pageContext="careers"
        languagePaths={getCareersLanguagePaths()}
      />

      <main id="careers-main" tabIndex={-1}>
        <section aria-labelledby="careers-title" className={styles.hero}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 id="careers-title">
            <AnimatedHeadline locale={locale} segments={copy.titleLines} text={copy.title} />
          </h1>
          <p className={styles.heroBody}>{copy.intro}</p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#apply">
              {copy.applyAction}
              <ArrowRight aria-hidden="true" size={18} />
            </a>
            <Link className={styles.secondaryAction} href={companyPath}>
              {copy.companyAction}
            </Link>
          </div>
        </section>

        <section aria-labelledby="careers-roles-title" className={styles.band}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.roles.eyebrow}</p>
            <h2 id="careers-roles-title">
              <ScrollWords locale={locale} text={copy.roles.title} />
            </h2>
          </header>
          <ul className={careerStyles.roles}>
            {copy.roles.items.map((role) => (
              <li key={role.id}>
                <article className={careerStyles.role} id={`role-${role.id}`}>
                  <header>
                    <h3>{role.title}</h3>
                  </header>
                  <p className={careerStyles.roleSummary}>{role.summary}</p>
                  <div className={careerStyles.roleLists}>
                    <div>
                      <h4>{copy.roles.dutiesLabel}</h4>
                      <ul>
                        {role.duties.map((item) => (
                          <li key={item}>
                            <Check aria-hidden="true" size={15} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>{copy.roles.requirementsLabel}</h4>
                      <ul>
                        {role.requirements.map((item) => (
                          <li key={item}>
                            <Check aria-hidden="true" size={15} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="careers-why-title" className={styles.band}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.why.eyebrow}</p>
            <h2 id="careers-why-title">
              <ScrollWords locale={locale} text={copy.why.title} />
            </h2>
          </header>
          <ol className={styles.values} data-compact="">
            {copy.why.items.map((item, index) => (
              <li key={item.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="careers-apply-title" className={styles.band} id="apply">
          <div className={careerStyles.apply}>
            <div>
              <p className={styles.eyebrow}>{copy.apply.eyebrow}</p>
              <h2 id="careers-apply-title">{copy.apply.title}</h2>
              <CopyWeChatId
                copiedLabel={copy.apply.copied}
                copyLabel={copy.apply.copy}
                failedLabel={copy.apply.copyFailed}
                id={copy.apply.wechatId}
                label={copy.apply.wechatLabel}
              />
              <p className={careerStyles.applyNote}>{copy.apply.note}</p>
            </div>
            <ol className={careerStyles.steps}>
              {copy.apply.steps.map((step, index) => (
                <li key={step.title}>
                  <span aria-hidden="true">{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="careers-faq-title" className={styles.band} data-last="">
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.faq.eyebrow}</p>
            <h2 id="careers-faq-title">
              <ScrollWords locale={locale} text={copy.faq.title} />
            </h2>
          </header>
          <div className={careerStyles.faq}>
            {copy.faq.items.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <HomegroundFooter locale={locale} pageContext="careers" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobSchema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
