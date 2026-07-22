import { ArrowRight, Check } from "lucide-react";
import {
  getHomegroundCopy,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { getHomegroundStudioCopy } from "../lib/homegroundStudioI18n";
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

export function HomegroundStudioPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const homeCopy = getHomegroundCopy(locale);
  const copy = getHomegroundStudioCopy(locale);
  const motionRootId = `homeground-studio-${locale}`;
  const plannerHref = `${homeCopy.path}?utm_source=studio&utm_medium=owned&utm_campaign=team-page&planner=destinations#route-finder`;
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://homegroundchina.com/#organization",
    name: "Homeground China",
    url: "https://homegroundchina.com/",
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
          <div className={styles.heroIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 id="studio-page-title">{copy.title}</h1>
            </div>
            <p className={styles.heroBody}>{copy.intro}</p>
          </div>

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
                    sizes={
                      index === 0 || index === 2
                        ? "(max-width: 680px) 68vw, 31vw"
                        : "(max-width: 680px) 48vw, 23vw"
                    }
                    alt={member.image.alt}
                    width={member.image.smallWidth}
                    height={member.image.smallHeight}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
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
        </section>

        <section className={styles.peopleSection} aria-labelledby="people-title">
          <header className={styles.sectionIntro} data-studio-reveal>
            <p className={styles.eyebrow}>{copy.peopleEyebrow}</p>
            <h2 id="people-title">{copy.peopleTitle}</h2>
            <p>{copy.peopleIntro}</p>
          </header>

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
                    sizes="(max-width: 680px) calc(100vw - 2rem), (max-width: 1024px) 46vw, 38vw"
                    alt={member.image.alt}
                    width={member.image.width}
                    height={member.image.height}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: member.image.position }}
                  />
                </figure>

                <div className={styles.memberStory} data-studio-member-part>
                  <p className={styles.memberLabel}>
                    {String(index + 1).padStart(2, "0")} / 05
                  </p>
                  <h3>{member.name}</h3>
                  <p className={styles.memberValue}>{member.value}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                  <ul className={styles.memberTags} aria-label={member.role}>
                    {member.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.trustSection} aria-labelledby="team-method-title">
          <div className={styles.trustIntro} data-studio-reveal>
            <p className={styles.eyebrowLight}>{copy.trust.eyebrow}</p>
            <h2 id="team-method-title">{copy.trust.title}</h2>
            <p>{copy.trust.body}</p>
          </div>
          <ol className={styles.trustPoints}>
            {copy.trust.points.map((point, index) => (
              <li data-studio-reveal key={point.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.detail}</p>
                </div>
                <Check aria-hidden="true" size={20} />
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.ctaSection} aria-labelledby="studio-cta-title">
          <p className={styles.eyebrow} data-studio-reveal>
            {copy.cta.label}
          </p>
          <div className={styles.ctaGrid} data-studio-reveal>
            <h2 id="studio-cta-title">{copy.cta.title}</h2>
            <div>
              <p>{copy.cta.body}</p>
              <a href={plannerHref}>
                {copy.cta.button}
                <ArrowRight aria-hidden="true" size={18} />
              </a>
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
