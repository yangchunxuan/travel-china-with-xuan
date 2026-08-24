import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { getGuideEntry } from "../lib/guideRegistry";
import { getHomegroundStudioCopy } from "../lib/homegroundStudioI18n";
import { editorialOrganizationSchema } from "../lib/editorialIdentity";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import { HomegroundStudioMotion } from "./HomegroundStudioMotion";
import homeStyles from "./HomegroundHomePage.module.css";
import styles from "./HomegroundStudioPage.module.css";

function photoSources(
  image: ReturnType<typeof getHomegroundStudioCopy>["members"][number]["image"],
) {
  return `${image.smallSrc} ${image.smallWidth}w, ${image.src} ${image.width}w`;
}

const memberStoryGuideIds = {
  tantan: "zhangjiajie-glass-bridge-vs-skywalk",
  kevin: "kevin-before-the-hotel-pickup",
} as const;

function MemberStoryLink({
  memberId,
  locale,
}: {
  memberId: string;
  locale: HomegroundLocale;
}) {
  const guideId =
    memberStoryGuideIds[memberId as keyof typeof memberStoryGuideIds];

  if (!guideId) return null;

  const guide = getGuideEntry(guideId, locale);

  return (
    <Link className={styles.memberStoryLink} href={guide.canonicalPath}>
      {guide.featuredLinkLabel}
      <ArrowRight aria-hidden="true" size={17} />
    </Link>
  );
}

const overviewStageIds = ["inputs", "steps", "deliverables"] as const;

export function HomegroundStudioPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const homeCopy = getHomegroundCopy(locale);
  const copy = getHomegroundStudioCopy(locale);
  const motionRootId = `homeground-studio-${locale}`;
  const plannerHref = `${homeCopy.path}#planner-contact`;
  const isEnglish = locale === "en";
  const planningServicesHref = isEnglish
    ? "/china-itinerary-review/#choose-service"
    : `/${locale}/china-itinerary-review/#choose-service`;
  const organizationSchema = {
    "@context": "https://schema.org",
    ...editorialOrganizationSchema(),
    member: copy.members.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      description: member.value,
    })),
  };

  return (
    <div
      className={`${homeStyles.localeRoot} ${styles.studioPage}`}
      data-homeground-locale={locale}
      data-studio-motion-root
      id={motionRootId}
      lang={homeCopy.htmlLang}
    >
      <a className={homeStyles.skipLink} href="#studio-main">
        {homeCopy.skipLink}
      </a>
      <HomegroundHeader locale={locale} pageContext="studio" />

      <main id="studio-main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="studio-page-title">
          <div className={styles.heroLayout}>
            <header className={styles.heroIntro}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 id="studio-page-title">{copy.title}</h1>
              <p className={styles.heroBody}>{copy.intro}</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href={plannerHref}>
                  {isEnglish ? "Talk to a China trip planner" : copy.cta.button}
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
                <a className={styles.secondaryAction} href={planningServicesHref}>
                  {isEnglish
                    ? "Compare planning services"
                    : copy.cta.secondaryButton}
                </a>
              </div>
            </header>

            <section
              className={styles.planOverview}
              aria-labelledby="planning-overview-title"
            >
              <h2 id="planning-overview-title">{copy.overview.title}</h2>
              <ol className={styles.overviewList}>
                {copy.overview.stages.map((stage, index) => (
                  <li
                    data-plan-stage={overviewStageIds[index]}
                    key={stage.label}
                  >
                    <p>{stage.label}</p>
                    <div>
                      <h3>{stage.title}</h3>
                      <p>{stage.detail}</p>
                    </div>
                  </li>
                ))}
                <li className={styles.termsStage} data-plan-stage="terms">
                  <p>{copy.overview.termsLabel}</p>
                  <div>
                    <h3>{copy.overview.termsTitle}</h3>
                    <dl className={styles.termsList}>
                      {copy.overview.terms.map((term) => (
                        <div key={term.label}>
                          <dt>{term.label}</dt>
                          <dd>{term.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
              </ol>
            </section>
          </div>
        </section>

        <section
          className={styles.trustSection}
          aria-labelledby="planning-method-title"
        >
          <div className={styles.trustIntro} data-studio-reveal>
            <p className={styles.eyebrowLight}>{copy.trust.eyebrow}</p>
            <h2 id="planning-method-title">{copy.trust.title}</h2>
            <p>{copy.trust.body}</p>
            <p className={styles.boundary}>{copy.trust.boundary}</p>
          </div>

          <div className={styles.methodGrid}>
            <section className={styles.methodPanel} data-studio-reveal>
              <p className={styles.methodNumber} aria-hidden="true">
                01
              </p>
              <h3>{copy.trust.inputsTitle}</h3>
              <ul className={styles.checkList}>
                {copy.trust.inputs.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.methodPanel} data-studio-reveal>
              <p className={styles.methodNumber} aria-hidden="true">
                02
              </p>
              <h3>{copy.trust.stepsTitle}</h3>
              <ol className={styles.trustPoints}>
                {copy.trust.points.map((point, index) => (
                  <li key={point.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{point.title}</h4>
                      <p>{point.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className={styles.methodPanel} data-studio-reveal>
              <p className={styles.methodNumber} aria-hidden="true">
                03
              </p>
              <h3>{copy.trust.deliverablesTitle}</h3>
              <ul className={styles.checkList}>
                {copy.trust.deliverables.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <section className={styles.peopleSection} aria-labelledby="people-title">
          <header className={styles.sectionIntro} data-studio-reveal>
            <p className={styles.eyebrow}>{copy.peopleEyebrow}</p>
            <h2 id="people-title">{copy.peopleTitle}</h2>
            <p>{copy.peopleIntro}</p>
          </header>

          <div className={styles.collageScene} data-studio-collage-scene>
            <div className={styles.collage} aria-label={copy.collageLabel}>
              {copy.members.map((member, index) => (
                <figure
                  className={styles.collagePortrait}
                  data-studio-collage-item
                  key={member.id}
                >
                  <img
                    src={member.image.smallSrc}
                    srcSet={photoSources(member.image)}
                    sizes="(max-width: 680px) 31vw, 18vw"
                    alt=""
                    width={member.image.smallWidth}
                    height={member.image.smallHeight}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: member.image.position }}
                  />
                  <figcaption>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {member.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className={styles.memberList}>
            {copy.members.map((member, index) => (
              <article
                className={styles.member}
                data-studio-member
                id={`team-${member.id}`}
                key={member.id}
                data-side={index % 2 === 0 ? "left" : "right"}
              >
                <div className={styles.memberRail} data-studio-member-part>
                  <span className={styles.memberNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{member.role}</p>
                </div>

                <figure className={styles.memberPhoto} data-studio-member-part>
                  <img
                    src={member.image.smallSrc}
                    srcSet={photoSources(member.image)}
                    sizes="(max-width: 680px) calc(100vw - 2rem), (max-width: 1180px) 44vw, 25vw"
                    alt={member.image.alt}
                    width={member.image.smallWidth}
                    height={member.image.smallHeight}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: member.image.position }}
                  />
                </figure>

                <div className={styles.memberStory} data-studio-member-part>
                  <h3>{member.name}</h3>
                  <p className={styles.memberValue}>{member.value}</p>
                  <details className={styles.memberDetails}>
                    <summary>{copy.peopleDetailsLabel}</summary>
                    <p className={styles.memberBio}>{member.bio}</p>
                    <ul className={styles.memberTags} aria-label={member.role}>
                      {member.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </details>
                  <MemberStoryLink memberId={member.id} locale={locale} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="studio-cta-title">
          <p className={styles.eyebrow} data-studio-reveal>
            {copy.cta.label}
          </p>
          <div className={styles.ctaGrid} data-studio-reveal>
            <h2 id="studio-cta-title">{copy.cta.title}</h2>
            <div>
              <p>{copy.cta.body}</p>
              <div className={styles.ctaActions}>
                <a className={styles.ctaPrimary} href={plannerHref}>
                  {isEnglish ? "Talk to a China trip planner" : copy.cta.button}
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
                <a className={styles.ctaSecondary} href={planningServicesHref}>
                  {isEnglish
                    ? "Compare planning services"
                    : copy.cta.secondaryButton}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <HomegroundFooter locale={locale} pageContext="studio" />
      <HomegroundStudioMotion rootId={motionRootId} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
