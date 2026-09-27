import type { CSSProperties } from "react";
import { ArrowRight, Check } from "lucide-react";
import { destinationHubRegistry, type DestinationHubId } from "../lib/destinationHubs";
import { coverImageSizes, type CoverImageSlot } from "../lib/generatedImageSrcSet";
import { getAllGuides } from "../lib/guideRegistry";
import { HOMEGROUND_TEAM_SIZE } from "../lib/homegroundStudioI18n";
import { editorialOrganizationSchema } from "../lib/editorialIdentity";
import { japaneseLanguagePaths, japaneseSite } from "../lib/japaneseSite";
import {
  japaneseStudioComponentStrings as strings,
  japaneseStudioCopy as copy,
} from "../lib/japaneseStudioCopy";
import { getJapaneseTourCatalog } from "../lib/japaneseTourCatalog";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import localeStyles from "./LocaleRoot.module.css";
import { AnimatedHeadline } from "./motion/AnimatedHeadline";
import { PointerParallax } from "./motion/PointerParallax";
import { RollingNumber } from "./motion/RollingNumber";
import { ScrollWords } from "./motion/ScrollWords";
import { StudioPlanThread } from "./StudioPlanThread";
import styles from "./HomegroundStudioPage.module.css";
import { KeepWords } from "./text/KeepWords";

type StudioPhoto = (typeof copy)["members"][number]["image"];

const smallVariant = (path: string) => path.replace(/\.(webp|jpe?g|png)$/i, ".w640.webp");

// Same photo sources and slots as the English team page.
function smallPhotoSources(image: StudioPhoto) {
  return image.smallWidth > 640
    ? `${smallVariant(image.smallSrc)} 640w, ${image.smallSrc} ${image.smallWidth}w`
    : `${smallVariant(image.smallSrc)} ${image.smallWidth}w`;
}

function photoSources(image: StudioPhoto) {
  return `${smallPhotoSources(image)}, ${image.src} ${image.width}w`;
}

const tilePhotoSlots: readonly CoverImageSlot[] = [
  { media: "(max-width: 680px)", size: "3.25rem", boxAspect: 1 },
  { media: "(max-width: 1180px)", size: "7.75rem", boxAspect: 3 / 4 },
  { size: "10rem", boxAspect: 3 / 4 },
];
const teamPhotoSlots: readonly CoverImageSlot[] = [
  { media: "(max-width: 680px)", size: "7.5rem", boxAspect: 3 / 4 },
  { media: "(max-width: 1180px)", size: "30vw", boxAspect: 3 / 4 },
  { size: "15rem", boxAspect: 3 / 4 },
];

function photoSizes(image: StudioPhoto, slots: readonly CoverImageSlot[]) {
  return coverImageSizes(image.smallWidth, image.smallHeight, slots);
}

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

/** The English team page in Japanese: same layout, photos and order. */
export function JapaneseStudioPage() {
  const heroId = "studio-hero-ja";
  const japaneseTourCount = getJapaneseTourCatalog().length;
  const proof = [
    { value: HOMEGROUND_TEAM_SIZE, label: copy.proof.people },
    { value: getAllGuides("en").length, label: copy.proof.guides },
    { value: japaneseTourCount, label: copy.proof.tours },
    { value: 4, label: copy.proof.languages },
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
      data-homeground-locale="ja"
      lang="ja"
    >
      <a className={localeStyles.skipLink} href="#studio-main">
        {strings.skipLink}
      </a>
      <JapaneseSiteHeader
        contactHref={strings.plannerHref}
        currentPath={japaneseSite.studio}
        languagePaths={japaneseLanguagePaths("/studio/", japaneseSite.studio)}
      />

      <main id="studio-main" tabIndex={-1}>
        <section aria-labelledby="studio-page-title" className={styles.hero} id={heroId}>
          <div aria-hidden="true" className={styles.constellation}>
            {copy.members.map((member, index) => {
              const tile = memberTiles[member.id] ?? { x: 50, y: 50, z: 0.5 };
              return (
                <span
                  className={styles.tile}
                  data-kind="person"
                  key={member.id}
                  style={{ "--x": tile.x, "--y": tile.y, "--z": tile.z, "--i": index } as CSSProperties}
                >
                  <img
                    alt=""
                    decoding="async"
                    height={member.image.smallHeight}
                    sizes={photoSizes(member.image, tilePhotoSlots)}
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
              <AnimatedHeadline locale="ja" text={copy.title} />
            </h1>
            <p className={styles.heroBody}>{copy.intro}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href={strings.plannerHref}>
                {strings.heroPrimaryAction}
                <ArrowRight aria-hidden="true" size={18} />
              </a>
              <a className={styles.secondaryAction} href={strings.planningServicesHref}>
                {strings.heroSecondaryAction}
              </a>
            </div>
          </header>
          <PointerParallax targetId={heroId} />
        </section>

        <div className={styles.threadBand}>
          <StudioPlanThread locale="ja" overview={copy.overview} />

          <section aria-label={copy.proof.label} className={styles.proof}>
            <ul>
              {proof.map((item) => (
                <li key={item.label}>
                  <b><RollingNumber value={item.value} /></b>
                  <span><KeepWords locale="ja" text={item.label} /></span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className={styles.trustSection} aria-labelledby="planning-method-title">
          <div className={styles.trustIntro}>
            <p className={styles.eyebrowLight}>{copy.trust.eyebrow}</p>
            <h2 id="planning-method-title">
              <ScrollWords locale="ja" text={copy.trust.title} />
            </h2>
            <p>{copy.trust.body}</p>
            <p className={styles.boundary}>{copy.trust.boundary}</p>
          </div>

          <div className={styles.methodGrid}>
            <section className={styles.methodPanel}>
              <p className={styles.methodNumber} aria-hidden="true">01</p>
              <h3><KeepWords locale="ja" text={copy.trust.inputsTitle} /></h3>
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
              <p className={styles.methodNumber} aria-hidden="true">02</p>
              <h3><KeepWords locale="ja" text={copy.trust.stepsTitle} /></h3>
              <ol className={styles.trustPoints}>
                {copy.trust.points.map((point, index) => (
                  <li key={point.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h4><KeepWords locale="ja" text={point.title} /></h4>
                      <p>{point.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className={styles.methodPanel}>
              <p className={styles.methodNumber} aria-hidden="true">03</p>
              <h3><KeepWords locale="ja" text={copy.trust.deliverablesTitle} /></h3>
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
                <ScrollWords locale="ja" text={copy.peopleTitle} />
              </h2>
            </div>
            <p>{copy.peopleIntro}</p>
          </header>

          <ul className={styles.memberList} aria-label={copy.collageLabel}>
            {copy.members.map((member) => (
              <li key={member.id}>
                <article className={styles.member} id={`team-${member.id}`}>
                  <figure className={styles.memberPhoto}>
                    <img
                      src={member.image.smallSrc}
                      srcSet={photoSources(member.image)}
                      sizes={photoSizes(member.image, teamPhotoSlots)}
                      alt={member.image.alt}
                      width={member.image.smallWidth}
                      height={member.image.smallHeight}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: member.image.position }}
                    />
                  </figure>

                  <div className={styles.memberStory}>
                    <h3><KeepWords locale="ja" text={member.name} /></h3>
                    <p className={styles.memberRole}><KeepWords locale="ja" text={member.role} /></p>
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
                    {member.id === "evan" ? (
                      <a className={styles.memberStoryLink} href={japaneseSite.author}>
                        Evanのプロフィールを見る
                        <ArrowRight aria-hidden="true" size={17} />
                      </a>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ul>

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
              <ScrollWords locale="ja" text={copy.cta.title} />
            </h2>
            <p className={styles.ctaBody}>{copy.cta.body}</p>
            <div className={styles.ctaActions}>
              <a className={styles.ctaPrimary} href={strings.plannerHref}>
                {strings.ctaPrimaryAction}
                <ArrowRight aria-hidden="true" size={18} />
              </a>
              <a className={styles.ctaSecondary} href={strings.planningServicesHref}>
                {strings.ctaSecondaryAction}
              </a>
            </div>
          </div>
        </section>
      </main>

      <JapaneseSiteFooter currentPath={japaneseSite.studio} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
