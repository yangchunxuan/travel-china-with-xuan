import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SpanishSiteFooter, SpanishSiteHeader } from "./SpanishChrome";
import { PageFamilyRenderer } from "./content/PageFamilyRenderer";
import { ReadingProgress } from "./motion/ReadingProgress";
import {
  EDITORIAL_ORGANIZATION_ID,
  EDITORIAL_PERSON_ID,
  EDITORIAL_WEBSITE_ID,
  editorialOrganizationSchema,
  editorialPersonSchema,
  editorialReviewedPageSchema,
  editorialWebsiteSchema,
  getEditorialAuthor,
} from "../lib/editorialIdentity";
import { getGuideLanguagePaths, type GuideId } from "../lib/guideRegistry";
import { spanishGuidePath, type SpanishGuide } from "../lib/spanishGuides";
import {
  spanishGeneralContactHrefs,
  spanishLanguagePaths,
  spanishSite,
} from "../lib/spanishSite";
import { getSpanishTourCopy, spanishTourPath } from "../lib/spanishTourCopy";
import localeStyles from "./LocaleRoot.module.css";
import bylineStyles from "./EditorialByline.module.css";
import styles from "./content/EditorialGuidePage.module.css";

const SITE_URL = "https://homegroundchina.com";

/** The switcher goes to the same guide in English when one exists, else to the guides list. */
export function spanishGuideLanguagePaths(guide: SpanishGuide) {
  const path = spanishGuidePath(guide.slug);
  if (!guide.sourceGuideId) return spanishLanguagePaths("/guides/", path);
  const source = getGuideLanguagePaths(guide.sourceGuideId as GuideId);
  return spanishLanguagePaths(source.en ?? "/guides/", path, {
    zh: source["zh-Hans"] ?? "/zh/guides/",
    ko: source.ko ?? "/ko/guides/",
  });
}

function structuredData(guide: SpanishGuide) {
  const url = `${SITE_URL}${spanishGuidePath(guide.slug)}`;
  const sources = guide.body.blocks.flatMap((block) =>
    block.type === "sources" ? block.items.map((item) => item.url) : [],
  );
  const faqItems = guide.body.blocks.flatMap((block) =>
    block.type === "faq" ? block.items : [],
  );
  return {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebsiteSchema(),
      editorialOrganizationSchema(),
      editorialPersonSchema("en"),
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        headline: guide.headline,
        description: guide.description,
        image: {
          "@type": "ImageObject",
          url: `${SITE_URL}${guide.heroImage.src}`,
          width: guide.heroImage.width,
          height: guide.heroImage.height,
        },
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: "es",
        isPartOf: { "@id": EDITORIAL_WEBSITE_ID },
        author: { "@id": EDITORIAL_PERSON_ID },
        publisher: { "@id": EDITORIAL_ORGANIZATION_ID },
        mainEntityOfPage: editorialReviewedPageSchema(url),
        ...(sources.length > 0 ? { citation: sources } : {}),
      },
      ...(faqItems.length > 0
        ? [{
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            url,
            inLanguage: "es",
            isPartOf: { "@id": `${url}#article` },
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}${spanishSite.home}` },
          { "@type": "ListItem", position: 2, name: "Guías", item: `${SITE_URL}${spanishSite.guides}` },
          { "@type": "ListItem", position: 3, name: guide.navTitle, item: url },
        ],
      },
    ],
  };
}

/** A Spanish guide: the same article layout as the other languages, with the Spanish chrome. */
export function SpanishGuidePage({ guide }: { guide: SpanishGuide }) {
  const path = spanishGuidePath(guide.slug);
  const author = getEditorialAuthor("en");
  const reviewed = new Intl.DateTimeFormat("es-ES", { dateStyle: "long", timeZone: "UTC" })
    .format(new Date(`${guide.sourceReviewedDate}T00:00:00Z`));
  const contact = spanishGeneralContactHrefs(path);
  const tours = guide.tourSlugs.map((slug) => {
    const copy = getSpanishTourCopy(slug);
    if (!copy) throw new Error(`Spanish guide ${guide.slug} links a tour without a Spanish page: ${slug}`);
    return { slug, href: spanishTourPath(slug), label: copy.title };
  });

  return (
    <div
      className={`${localeStyles.root} hg-locale-root ${styles.pageRoot} ${styles.grokGuide}`}
      data-homeground-locale="es"
      lang="es"
    >
      <a className={styles.skipLink} href="#editorial-guide-body">Ir al artículo</a>
      <ReadingProgress />
      <SpanishSiteHeader
        contactHref="#contact"
        currentPath={path}
        languagePaths={spanishGuideLanguagePaths(guide)}
      />

      <main>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
              <ol>
                <li><Link href={spanishSite.home}>Inicio</Link></li>
                <li><span aria-hidden="true">/</span><Link href={spanishSite.guides}>Guías</Link></li>
                <li aria-current="page"><span aria-hidden="true">/</span>{guide.navTitle}</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>
              <span>Guías</span>
              <span>Revisado el {reviewed}</span>
            </p>
            <h1>{guide.headline}</h1>
            <p className={styles.dek}>{guide.description}</p>
            <p className={bylineStyles.byline}>
              <span>Por <Link href={author.path} hrefLang="en">{author.name}</Link></span>
              <span aria-hidden="true">·</span>
              <span>Datos revisados el <time dateTime={guide.sourceReviewedDate}>{reviewed}</time></span>
            </p>
          </div>

          <figure className={styles.heroFigure}>
            <Image
              alt={guide.heroImage.alt}
              fetchPriority="high"
              height={guide.heroImage.height}
              priority
              sizes="(max-width: 860px) 100vw, 44vw"
              src={guide.heroImage.src}
              width={guide.heroImage.width}
            />
            {guide.heroImage.credit ? (
              <figcaption className={styles.heroCredit}>
                <span>{guide.heroImage.credit.text}</span>{" "}
                <a href={guide.heroImage.credit.sourceUrl}>{guide.heroImage.credit.sourceLabel}</a>
                <span aria-hidden="true"> · </span>
                <a href={guide.heroImage.credit.licenseUrl}>{guide.heroImage.credit.licenseLabel}</a>
              </figcaption>
            ) : null}
          </figure>
        </header>

        <article className={styles.article} data-content-body id="editorial-guide-body">
          <PageFamilyRenderer body={guide.body} />
        </article>

        {tours.length > 0 ? (
          <aside className={styles.relatedDestinations}>
            <div>
              <p>Viajes publicados</p>
              <h2>Llévelo a un itinerario real.</h2>
            </div>
            <ul>
              {tours.map((tour) => (
                <li key={tour.slug}>
                  <Link href={tour.href}>{tour.label}<span aria-hidden="true">→</span></Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <aside className={styles.cta} data-similarity-ignore id="contact">
          <div>
            <p className={styles.ctaLabel}>Organizarlo con un equipo local</p>
            <h2>Cuéntenos el viaje que tiene en mente.</h2>
            <p>
              Díganos las fechas, cuántos viajan y un presupuesto aproximado. Puede escribirnos en español por WhatsApp o{" "}
              <a href={contact.email} style={{ color: "inherit" }}>por correo</a>; no se envía nada hasta que usted lo envíe.
            </p>
          </div>
          <a href={contact.whatsapp} rel="noopener noreferrer" target="_blank">
            Escribir por WhatsApp
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        </aside>
      </main>

      <SpanishSiteFooter currentPath={path} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(guide)).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
