import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getGuideEntry } from "../lib/guideRegistry";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import {
  EDITORIAL_ORGANIZATION_ID,
  EDITORIAL_PERSON_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialPersonSchema,
  editorialWebsiteSchema,
} from "../lib/editorialIdentity";
import {
  getTantanZhangjiajieStoryCopy,
  ZHANGJIAJIE_GLASS_BRIDGE_HERO,
} from "../lib/tantanZhangjiajieStoryI18n";
import { GuideCtaLink } from "./GuideCtaLink";
import { AuthorityHubLinks } from "./AuthorityHubLinks";
import { LegacyEditorialByline } from "./LegacyEditorialByline";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import { TantanStoryContentsNav } from "./TantanStoryContentsNav";
import styles from "./TantanZhangjiajieStoryPage.module.css";

const guideId = "zhangjiajie-glass-bridge-vs-skywalk" as const;
const assetPath = "/images/guides/tantan-zhangjiajie";

const guideHubLabels: Record<HomegroundLocale, string> = {
  en: "Travel guides",
  zh: "旅行指南",
  ko: "여행 가이드",
};

function guideHubPath(locale: HomegroundLocale) {
  return locale === "en" ? "/guides/" : `/${locale}/guides/`;
}

function createStructuredData(locale: HomegroundLocale) {
  const copy = getTantanZhangjiajieStoryCopy(locale);
  const guide = getGuideEntry(guideId, locale);
  const studioPageUrl = `https://homegroundchina.com${
    locale === "en" ? "/studio/" : `/${locale}/studio/`
  }`;
  const studioProfileUrl = `${studioPageUrl}#team-tantan`;
  const personId = `${studioPageUrl}#tantan`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      {
        "@type": "Person",
        "@id": personId,
        name: "Tantan",
        jobTitle: copy.schemaRole,
        url: studioProfileUrl,
        worksFor: { "@id": EDITORIAL_ORGANIZATION_ID },
      },
      editorialPersonSchema(locale),
      {
        "@type": "Article",
        "@id": `${guide.canonicalUrl}#article`,
        url: guide.canonicalUrl,
        headline: copy.title,
        description: copy.dek,
        inLanguage: copy.htmlLang,
        mainEntityOfPage: guide.canonicalUrl,
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        image: {
          "@type": "ImageObject",
          url: ZHANGJIAJIE_GLASS_BRIDGE_HERO.url,
          width: ZHANGJIAJIE_GLASS_BRIDGE_HERO.width,
          height: ZHANGJIAJIE_GLASS_BRIDGE_HERO.height,
          caption: copy.heroCaption,
        },
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        author: { "@id": EDITORIAL_PERSON_ID },
        reviewedBy: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": EDITORIAL_ORGANIZATION_ID },
        mentions: { "@id": personId },
        about: copy.schemaAbout.map((name) => ({ "@type": "Thing", name })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${guide.canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.breadcrumbHome,
            item: `https://homegroundchina.com${copy.homePath}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: guideHubLabels[locale],
            item: `https://homegroundchina.com${guideHubPath(locale)}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: copy.breadcrumbCurrent,
            item: guide.canonicalUrl,
          },
        ],
      },
    ],
  };
}

function StoryPicture({
  kind,
  alt,
  caption,
}: {
  kind: "mountains" | "rest";
  alt: string;
  caption: string;
}) {
  const stem = `tantan-with-guests-${kind}-1200`;

  return (
    <figure className={styles.storyFigure}>
      <picture>
        <source srcSet={`${assetPath}/${stem}.avif`} type="image/avif" />
        <source srcSet={`${assetPath}/${stem}.webp`} type="image/webp" />
        <img
          src={`${assetPath}/${stem}.jpg`}
          alt={alt}
          width="1200"
          height="900"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function TantanZhangjiajieStoryPage({
  locale = "en",
}: {
  locale?: HomegroundLocale;
}) {
  const copy = getTantanZhangjiajieStoryCopy(locale);
  const guide = getGuideEntry(guideId, locale);
  const routeGuide = getGuideEntry("zhangjiajie-itinerary", locale);
  const studioHref = `${locale === "en" ? "" : `/${locale}`}/studio/#team-tantan`;
  const plannerHref = `${copy.homePath}?utm_source=tantan-field-note&utm_medium=owned&utm_campaign=trip-conversation&utm_content=planner-contact#planner-contact`;
  const structuredData = createStructuredData(locale);

  return (
    <div
      className={styles.pageRoot}
      data-homeground-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={styles.skipLink} href="#story-content">
        {copy.skipLink}
      </a>
      <HomegroundHeader locale={locale} pageContext="guide" guideId={guideId} />

      <main id="story-content" tabIndex={-1}>
        <article>
          <header className={styles.hero}>
            <nav className={styles.breadcrumb} aria-label={copy.breadcrumbLabel}>
              <ol>
                <li><Link href={copy.homePath}>{copy.breadcrumbHome}</Link></li>
                <li>
                  <Link href={guideHubPath(locale)}>
                    {guideHubLabels[locale]}
                  </Link>
                </li>
                <li aria-current="page">{copy.breadcrumbCurrent}</li>
              </ol>
            </nav>

            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>{copy.eyebrow}</p>
                <h1>{copy.title}</h1>
                <p className={styles.dek}>{copy.dek}</p>

                <LegacyEditorialByline
                  guideId={guide.id}
                  locale={locale}
                  reviewedAt={guide.sourceReviewedDate}
                />

                <dl className={styles.storyMeta}>
                  <div>
                    <dt>{copy.updatedLabel}</dt>
                    <dd><time dateTime={guide.dateModified}>{copy.updatedDate}</time></dd>
                  </div>
                  <div>
                    <dt aria-hidden="true">—</dt>
                    <dd>{copy.readTime}</dd>
                  </div>
                </dl>
              </div>

              <figure className={styles.heroFigure}>
                <img
                  src={ZHANGJIAJIE_GLASS_BRIDGE_HERO.path}
                  alt={copy.heroAlt}
                  width={ZHANGJIAJIE_GLASS_BRIDGE_HERO.width}
                  height={ZHANGJIAJIE_GLASS_BRIDGE_HERO.height}
                  fetchPriority="high"
                  decoding="async"
                />
                <figcaption>{copy.heroCaption}</figcaption>
              </figure>
            </div>
          </header>

          <div className={styles.editorialBody}>
            <TantanStoryContentsNav
              label={copy.contentsLabel}
              title={copy.contentsTitle}
              sections={copy.sections.map((section, index) => ({
                id: `check-${index + 1}`,
                title: section.title,
              }))}
            />

            <div className={styles.articleColumn}>
              <section className={styles.introduction} aria-label={copy.dek}>
                {copy.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <blockquote>{copy.pullQuote}</blockquote>
              </section>

              <StoryPicture
                kind="mountains"
                alt={copy.mountainAlt}
                caption={copy.mountainCaption}
              />

              <div className={styles.checks}>
                {copy.sections.map((section, index) => (
                  <section
                    className={styles.check}
                    id={`check-${index + 1}`}
                    key={section.title}
                    aria-labelledby={`check-${index + 1}-title`}
                  >
                    <span className={styles.checkNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 id={`check-${index + 1}-title`}>{section.title}</h2>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.bullets ? (
                        <ul>
                          {section.bullets.map((bullet) => (
                            <li key={bullet}><Check aria-hidden="true" size={17} />{bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                      {section.quote ? <blockquote>{section.quote}</blockquote> : null}
                    </div>
                  </section>
                ))}
              </div>

              <StoryPicture
                kind="rest"
                alt={copy.restAlt}
                caption={copy.restCaption}
              />

              <section className={styles.checklist} aria-labelledby="story-checklist-title">
                <div>
                  <p>{copy.checklistLabel}</p>
                  <h2 id="story-checklist-title">{copy.checklistTitle}</h2>
                </div>
                <ol>
                  {copy.checklistItems.map((item, index) => (
                    <li key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </section>

              <section className={styles.closing} aria-labelledby="story-closing-title">
                <h2 id="story-closing-title">{copy.closingTitle}</h2>
                {copy.closing.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <blockquote>{copy.closingQuote}</blockquote>
              </section>
            </div>
          </div>

          <AuthorityHubLinks kind="zhangjiajie" locale={locale} />

          <section className={styles.finalCta} aria-labelledby="story-cta-title">
            <div>
              <p>{copy.ctaEyebrow}</p>
              <h2 id="story-cta-title">{copy.ctaTitle}</h2>
            </div>
            <div>
              <p>{copy.ctaBody}</p>
              <GuideCtaLink
                guideId={guideId}
                href={plannerHref}
                locale={locale}
              >
                {copy.ctaAction}
                <ArrowRight aria-hidden="true" size={18} />
              </GuideCtaLink>
            </div>
          </section>

          <section className={styles.related} aria-labelledby="story-related-title">
            <header>
              <p>{copy.relatedEyebrow}</p>
              <h2 id="story-related-title">{copy.relatedTitle}</h2>
            </header>
            <div>
              <Link href={routeGuide.canonicalPath}>
                <span>01</span>
                <strong>{copy.routeLinkLabel}</strong>
                <p>{copy.routeLinkDescription}</p>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link href={studioHref}>
                <span>02</span>
                <strong>{copy.studioLinkLabel}</strong>
                <p>{copy.studioLinkDescription}</p>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </section>
        </article>
      </main>

      <HomegroundFooter locale={locale} pageContext="guide" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
        }}
      />
    </div>
  );
}
