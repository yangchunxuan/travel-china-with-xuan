import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Check } from "lucide-react";
import { destinationHubRegistry, type DestinationHubId } from "../lib/destinationHubs";
import {
  getHomegroundCopy,
  homegroundLocales,
  type HomegroundLocale,
} from "../lib/homegroundI18n";
import { getAllGuides, getGuideEntry } from "../lib/guideRegistry";
import {
  getHomegroundStudioCopy,
  HOMEGROUND_TEAM_SIZE,
} from "../lib/homegroundStudioI18n";
import { editorialOrganizationSchema } from "../lib/editorialIdentity";
import { getPublishedPrivateTourCatalog } from "../lib/publishedPrivateTourCatalog";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";
import { PointerParallax } from "./motion/PointerParallax";
import { RollingNumber } from "./motion/RollingNumber";
import { ScrollWords } from "./motion/ScrollWords";
import { StudioPlanThread } from "./StudioPlanThread";
import styles from "./HomegroundStudioPage.module.css";

type StudioPhoto =
  ReturnType<typeof getHomegroundStudioCopy>["members"][number]["image"];

const smallVariant = (path: string) => path.replace(/\.(webp|jpe?g|png)$/i, ".w640.webp");

// Every /images/ photo has a .w640.webp sibling from
// tools/generate-image-variants.mjs, never wider than its original. The small
// JPEGs are 562-1000px wide but shown at 52-240 CSS px, so the webp comes first.
function smallPhotoSources(image: StudioPhoto) {
  return image.smallWidth > 640
    ? `${smallVariant(image.smallSrc)} 640w, ${image.smallSrc} ${image.smallWidth}w`
    : `${smallVariant(image.smallSrc)} ${image.smallWidth}w`;
}

function photoSources(image: StudioPhoto) {
  return `${smallPhotoSources(image)}, ${image.src} ${image.width}w`;
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

/*
 * The hero constellation (after cosmos.so): the five people and six of the
 * cities they plan around float at different depths around the headline.
 * x / y are percentages of the hero, z is depth (1 = nearest: larger,
 * sharper, moves most with the pointer). Decorative only: aria-hidden,
 * empty alt text, no links.
 */
const memberTiles: Record<string, { x: number; y: number; z: number }> = {
  evan: { x: 9, y: 30, z: 1 },
  yoyo: { x: 91, y: 25, z: 0.9 },
  tantan: { x: 89, y: 74, z: 1 },
  kevin: { x: 11, y: 77, z: 0.85 },
  vivi: { x: 69, y: 14, z: 0.6 },
};
const placeTiles: readonly { id: DestinationHubId; x: number; y: number; z: number }[] = [
  { id: "beijing", x: 30, y: 8, z: 0.5 },
  { id: "zhangjiajie", x: 80, y: 49, z: 0.45 },
  { id: "shanghai", x: 20, y: 53, z: 0.4 },
  { id: "chengdu", x: 38, y: 93, z: 0.45 },
  { id: "xian", x: 62, y: 93, z: 0.5 },
  { id: "hangzhou", x: 4, y: 8, z: 0.35 },
];

export function HomegroundStudioPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const homeCopy = getHomegroundCopy(locale);
  const copy = getHomegroundStudioCopy(locale);
  const plannerHref = `${homeCopy.path}#planner-contact`;
  const isEnglish = locale === "en";
  const planningServicesHref = isEnglish
    ? "/services/"
    : `/${locale}/services/`;
  const heroId = `studio-hero-${locale}`;
  const proof = [
    { value: HOMEGROUND_TEAM_SIZE, label: copy.proof.people },
    { value: getAllGuides(locale).length, label: copy.proof.guides },
    { value: getPublishedPrivateTourCatalog(locale).length, label: copy.proof.tours },
    { value: homegroundLocales.length, label: copy.proof.languages },
  ];
  const specialties = copy.members.flatMap((member) => member.tags);
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
      className={`${localeStyles.root} hg-locale-root ${styles.studioPage}`}
      data-homeground-locale={locale}
      lang={homeCopy.htmlLang}
    >
      <a className={localeStyles.skipLink} href="#studio-main">
        {homeCopy.skipLink}
      </a>
      <HomegroundHeader locale={locale} pageContext="studio" />

      <main id="studio-main" tabIndex={-1}>
        <section
          aria-labelledby="studio-page-title"
          className={styles.hero}
          id={heroId}
        >
          <div aria-hidden="true" className={styles.constellation}>
            {copy.members.map((member, index) => {
              const tile = memberTiles[member.id] ?? { x: 50, y: 50, z: 0.5 };
              return (
                <span
                  className={styles.tile}
                  data-kind="person"
                  key={member.id}
                  style={
                    {
                      "--x": tile.x,
                      "--y": tile.y,
                      "--z": tile.z,
                      "--i": index,
                    } as CSSProperties
                  }
                >
                  <img
                    alt=""
                    decoding="async"
                    height={member.image.smallHeight}
                    sizes="(max-width: 680px) 3.25rem, (max-width: 1180px) 7.75rem, 10rem"
                    src={member.image.smallSrc}
                    srcSet={smallPhotoSources(member.image)}
                    style={{ objectPosition: member.image.position }}
                    width={member.image.smallWidth}
                  />
                </span>
              );
            })}
            {placeTiles.map((tile, index) => {
              const hub = destinationHubRegistry.find((entry) => entry.id === tile.id);
              if (!hub) return null;
              return (
                <span
                  className={styles.tile}
                  data-kind="place"
                  key={tile.id}
                  style={
                    {
                      "--x": tile.x,
                      "--y": tile.y,
                      "--z": tile.z,
                      "--i": index + copy.members.length,
                    } as CSSProperties
                  }
                >
                  <img
                    alt=""
                    decoding="async"
                    height={480}
                    loading="lazy"
                    src={smallVariant(hub.heroImagePath)}
                    width={640}
                  />
                </span>
              );
            })}
          </div>

          <header className={styles.heroIntro}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1 id="studio-page-title">
              <AnimatedHeadline locale={locale} text={copy.title} />
            </h1>
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
          <PointerParallax targetId={heroId} />
        </section>

        <div className={styles.threadBand}>
          <StudioPlanThread locale={locale} overview={copy.overview} />

          <section aria-label={copy.proof.label} className={styles.proof}>
            <ul>
              {proof.map((item) => (
                <li key={item.label}>
                  <b><RollingNumber value={item.value} /></b>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section
          className={styles.trustSection}
          aria-labelledby="planning-method-title"
        >
          <div className={styles.trustIntro}>
            <p className={styles.eyebrowLight}>{copy.trust.eyebrow}</p>
            <h2 id="planning-method-title">
              <ScrollWords locale={locale} text={copy.trust.title} />
            </h2>
            <p>{copy.trust.body}</p>
            <p className={styles.boundary}>{copy.trust.boundary}</p>
          </div>

          {/* Three cards that stack as they scroll: send → do → receive. */}
          <div className={styles.methodGrid}>
            <section className={styles.methodPanel}>
              <p className={styles.methodNumber} aria-hidden="true">
                01
              </p>
              <h3>{copy.trust.inputsTitle}</h3>
              <ul className={styles.checkList}>
                {copy.trust.inputs.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={styles.methodPanel}>
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

            <section className={styles.methodPanel}>
              <p className={styles.methodNumber} aria-hidden="true">
                03
              </p>
              <h3>{copy.trust.deliverablesTitle}</h3>
              <ul className={styles.checkList}>
                {copy.trust.deliverables.map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" size={15} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <section className={styles.peopleSection} aria-labelledby="people-title">
          <header className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.peopleEyebrow}</p>
              <h2 id="people-title">
                <ScrollWords locale={locale} text={copy.peopleTitle} />
              </h2>
            </div>
            <p>{copy.peopleIntro}</p>
          </header>

          {/* One row of five; pointing at one person puts the others in grey. */}
          <ul className={styles.memberList} aria-label={copy.collageLabel}>
            {copy.members.map((member) => (
              <li key={member.id}>
                <article className={styles.member} id={`team-${member.id}`}>
                  <figure className={styles.memberPhoto}>
                    <img
                      src={member.image.smallSrc}
                      srcSet={photoSources(member.image)}
                      sizes="(max-width: 680px) 7.5rem, (max-width: 1180px) 30vw, 15rem"
                      alt={member.image.alt}
                      width={member.image.smallWidth}
                      height={member.image.smallHeight}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: member.image.position }}
                    />
                  </figure>

                  <div className={styles.memberStory}>
                    <h3>{member.name}</h3>
                    <p className={styles.memberRole}>{member.role}</p>
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
              </li>
            ))}
          </ul>

          {/* What the team brings, drifting in two opposite rows. The same
              tags are listed in each person's background, so this is
              decorative. */}
          <div aria-hidden="true" className={styles.marquee}>
            {[0, 1].map((row) => (
              <div className={styles.marqueeRow} data-row={row} key={row}>
                {[0, 1].map((copyIndex) => (
                  <span className={styles.marqueeTrack} key={copyIndex}>
                    {(row === 0 ? specialties : [...specialties].reverse()).map((tag, index) => (
                      <span className={styles.marqueeItem} key={`${tag}-${index}`}>
                        {tag}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection} aria-labelledby="studio-cta-title">
          <div className={styles.ctaGrid}>
            <p className={styles.eyebrow}>{copy.cta.label}</p>
            <h2 id="studio-cta-title">
              <ScrollWords locale={locale} text={copy.cta.title} />
            </h2>
            <p className={styles.ctaBody}>{copy.cta.body}</p>
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
        </section>
      </main>

      <HomegroundFooter locale={locale} pageContext="studio" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
