import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getCorporateTrips } from "../lib/corporateTravel";
import { getCorporateHubCopy, type CorporateHubCopy } from "../lib/corporateTravelHub";
import { corporateHubPathFor, corporateLocales, corporateTripPathFor, type CorporateFaq, type CorporateImage, type CorporateLocale, type CorporateTrip } from "../lib/corporateTravelTypes";
import { homegroundWhatsAppHref } from "../lib/tourContact";
import { CorporateTravelEnquiry } from "./CorporateTravelEnquiry";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import { ArabicSiteHeader, ArabicSiteFooter } from "./ArabicChrome";
import { GermanSiteHeader, GermanSiteFooter } from "./GermanChrome";
import { FrenchSiteHeader, FrenchSiteFooter } from "./FrenchChrome";
import { SpanishSiteHeader, SpanishSiteFooter } from "./SpanishChrome";
import { JapaneseSiteHeader, JapaneseSiteFooter } from "./JapaneseTourChrome";
import type { JapaneseLanguagePath } from "../lib/japaneseSite";
import localeStyles from "./LocaleRoot.module.css";
import { KeepWords } from "./text/KeepWords";
import styles from "./CorporateTravelPages.module.css";

const prefix = (locale: CorporateLocale) => (locale === "en" ? "" : `/${locale}`);
/* Chinese headings break between words, never inside one ("旅游" stays whole). */
// Phrases the zh word segmenter would split across a heading line.
const zhKeep = ["给老板批的方案", "每天都写清楚", "三晚不换酒店"] as const;
const japaneseWords = (locale: CorporateLocale, text: string) => locale === "ja" ? <KeepWords locale="ja" text={text} /> : text;
const words = (locale: CorporateLocale, text: string) => (locale === "zh" ? <KeepWords keep={zhKeep} locale="zh" text={text} /> : japaneseWords(locale, text));
const numbers = (locale: CorporateLocale, text: string) => locale !== "ar" ? text : text.split(/(\d+\s*[–-]\s*\d+|L-BJ\d+)/g).map((part, index) => /^(?:\d+\s*[–-]\s*\d+|L-BJ\d+)$/.test(part) ? <bdi dir="ltr" key={index}>{part}</bdi> : part);

function languagePaths(path: (locale: CorporateLocale) => string) {
  return Object.fromEntries(corporateLocales.map((locale) => [locale, path(locale)]));
}

function PageFrame({ children, copy, mainId, paths }: { children: ReactNode; copy: CorporateHubCopy; mainId: string; paths: Record<string, string> }) {
  const locale = copy.locale;
  const primary = locale === "en" || locale === "zh" || locale === "ko";
  const labels = { en: "English", zh: "中文", ko: "한국어", ja: "日本語", es: "Español", fr: "Français", de: "Deutsch", ar: "العربية" };
  const editions: JapaneseLanguagePath[] = corporateLocales.map((code) => ({ lang: code === "zh" ? "zh-Hans" : code, label: labels[code], path: paths[code] }));
  const Header = locale === "ar" ? ArabicSiteHeader : locale === "de" ? GermanSiteHeader : locale === "fr" ? FrenchSiteHeader : locale === "es" ? SpanishSiteHeader : JapaneseSiteHeader;
  const Footer = locale === "ar" ? ArabicSiteFooter : locale === "de" ? GermanSiteFooter : locale === "fr" ? FrenchSiteFooter : locale === "es" ? SpanishSiteFooter : JapaneseSiteFooter;
  return <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={locale} lang={copy.htmlLang} dir={locale === "ar" ? "rtl" : "ltr"}>
    <a className={localeStyles.skipLink} href={`#${mainId}`}>{copy.ui.skipLink}</a>
    {primary ? <HomegroundHeader locale={locale} pageContext="services" languagePaths={paths} plannerHrefOverride="#corporate-enquiry" /> : <Header currentPath={paths[locale]} languagePaths={editions} contactHref="#corporate-enquiry" />}
    <main id={mainId} tabIndex={-1}>{children}</main>
    {primary ? <HomegroundFooter locale={locale} pageContext="services" /> : <Footer currentPath={paths[locale]} />}
  </div>;
}

function Breadcrumb({ copy, current }: { copy: CorporateHubCopy; current?: string }) {
  return <nav className={styles.breadcrumb} aria-label="Breadcrumb"><ol>
    <li><Link href={`${prefix(copy.locale)}/`}>{copy.ui.home}</Link></li>
    <li><span aria-hidden="true">/</span>{current ? <Link href={corporateHubPathFor(copy.locale)}>{copy.ui.breadcrumb}</Link> : <span aria-current="page">{copy.ui.breadcrumb}</span>}</li>
    {current && <li aria-current="page"><span aria-hidden="true">/</span>{current}</li>}
  </ol></nav>;
}

/* Every photograph here is 16:10 and is shown whole at that ratio. */
function Photo({ photo, priority = false, className = "", sizes = "(max-width: 48rem) calc(100vw - 2rem), 38rem" }: { photo: CorporateImage; priority?: boolean; className?: string; sizes?: string }) {
  return <figure className={`${styles.photo} ${className}`}>
    <div className={styles.photoInner}><Image src={photo.src} alt={photo.alt} fill priority={priority} sizes={sizes} /></div>
    <figcaption>{photo.caption}</figcaption>
  </figure>;
}

function ForwardLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <a className={`${styles.forward} ${className}`} href={href}>{children}</a>;
}

function Faqs({ copy, faqs, title }: { copy: CorporateHubCopy; faqs: CorporateFaq[]; title: string }) {
  return <section className={`${styles.section} ${styles.split}`} aria-labelledby="corporate-faq-title">
    <div><p className={styles.eyebrow}>{copy.faqEyebrow}</p><h2 id="corporate-faq-title">{words(copy.locale, title)}</h2></div>
    <dl className={styles.faqList}>{faqs.map((faq) => <div key={faq.question}><dt>{faq.question}</dt><dd>{faq.answer}</dd></div>)}</dl>
  </section>;
}

const photoCredits = [
  { file: "wulingyuan-peaks-1600.webp", subject: "Wulingyuan sandstone pillars", author: "颐园居", source: "https://commons.wikimedia.org/wiki/File:Wulingyuan,_Zhangjiajie,_Hunan_20230702.jpg", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { file: "tianzi-mountain-panorama-1600.webp", subject: "Tianzi Mountain panorama", author: "Chensiyuan", source: "https://commons.wikimedia.org/wiki/File:1_tianzishan_wulingyuan_zhangjiajie_2012.jpg", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { file: "golden-whip-stream-1600.webp", subject: "Golden Whip Stream", author: "Levaby", source: "https://commons.wikimedia.org/wiki/File:%E5%BC%A0%E5%AE%B6%E7%95%8C%E9%87%91%E9%9E%AD%E6%BA%AA.jpg", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { file: "zhangjiajie-hehua-airport-1600.webp", subject: "Zhangjiajie Hehua Airport", author: "Martin Lewison", source: "https://commons.wikimedia.org/wiki/File:Zhangjiajie_Airport_(27796134377).jpg", licence: "CC BY-SA 2.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  { file: "suzhou-humble-garden-1600.webp", subject: "Humble Administrator’s Garden", author: "Chainwit.", source: "https://commons.wikimedia.org/wiki/File:Humble_Administrator%27s_Garden_Suzhou_(2024)_-_img_01.jpg", licence: "CC BY 4.0", licenceUrl: "https://creativecommons.org/licenses/by/4.0/" },
];

function PhotoCredits({ copy, photos }: { copy: CorporateHubCopy; photos: CorporateImage[] }) {
  const credits = photoCredits.filter((credit) => photos.some((photo) => photo.src.endsWith(credit.file)));
  if (!credits.length) return null;
  return <details className={styles.photoCredits}><summary>{copy.ui.photoCredits}</summary><p>{copy.ui.photoCreditsNote}</p><ul>{credits.map((credit) => <li key={credit.file}><a href={credit.source}>{credit.subject}</a> — {credit.author} / <a href={credit.licenceUrl} rel="license">{credit.licence}</a></li>)}</ul></details>;
}

export function CorporateTravelHubPage({ locale = "en" }: { locale?: CorporateLocale }) {
  const copy = getCorporateHubCopy(locale);
  const trips = getCorporateTrips(locale);
  const hero = trips[0].hero;
  return <PageFrame copy={copy} mainId="corporate-main" paths={languagePaths(corporateHubPathFor)}>
    <header className={`${styles.container} ${styles.hero}`}>
      <Breadcrumb copy={copy} />
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1>{words(locale, copy.h1)}</h1>
          <p className={styles.lede}>{copy.lede}</p>
          <div className={styles.heroActions}>
            <ForwardLink href="#corporate-enquiry">{copy.primaryCta}</ForwardLink>
            <a className={styles.quietLink} href={homegroundWhatsAppHref(copy.whatsappMessage)} rel="noopener noreferrer" target="_blank">{copy.whatsappCta}</a>
          </div>
        </div>
        <Photo photo={hero} priority className={styles.heroPhoto} sizes="(max-width: 56rem) calc(100vw - 2rem), 36rem" />
      </div>
      <dl className={styles.facts}>{copy.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{numbers(locale, fact.value)}</dd></div>)}</dl>
    </header>

    <div className={styles.container}>
      <section className={styles.section} aria-labelledby="corporate-why-title">
        <p className={styles.eyebrow}>{copy.why.eyebrow}</p>
        <h2 id="corporate-why-title">{words(locale, copy.why.title)}</h2>
        <div className={styles.columns3}>{copy.why.items.map((item) => <div key={item.title}><h3>{japaneseWords(locale, item.title)}</h3><p>{item.body}</p></div>)}</div>
      </section>

      <section className={styles.section} aria-labelledby="corporate-purpose-title">
        <div className={styles.sectionIntro}><div><p className={styles.eyebrow}>{copy.purposes.eyebrow}</p><h2 id="corporate-purpose-title">{words(locale, copy.purposes.title)}</h2></div><p>{copy.purposes.intro}</p></div>
        <div className={styles.columns3}>{copy.purposes.items.map((purpose, index) => <article className={styles.purpose} id={purpose.id} key={purpose.id}>
          <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span><h3>{japaneseWords(locale, purpose.title)}</h3><p>{purpose.body}</p><p className={styles.fit}>{purpose.fit}</p>
        </article>)}</div>
      </section>

      <section className={styles.section} aria-labelledby="corporate-samples-title" id="sample-programmes">
        <div className={styles.sectionIntro}><div><p className={styles.eyebrow}>{copy.samples.eyebrow}</p><h2 id="corporate-samples-title">{words(locale, copy.samples.title)}</h2></div><p>{copy.samples.intro}</p></div>
        <div className={styles.tripGrid}>{trips.map((trip) => <article className={styles.tripCard} key={trip.slug}>
          <Link className={styles.tripImageLink} href={corporateTripPathFor(locale, trip.slug)} aria-label={trip.title} tabIndex={-1}><Photo photo={trip.hero} sizes="(max-width: 48rem) calc(100vw - 2rem), 37.5rem" /></Link>
          <div className={styles.tripCardBody}>
          <p className={styles.cardMeta}>{numbers(locale, trip.duration)} · {numbers(locale, trip.groupSize)}</p>
          <h3><Link href={corporateTripPathFor(locale, trip.slug)}>{words(locale, trip.title)}</Link></h3>
          <p>{trip.lede}</p>
          <ForwardLink className={styles.small} href={corporateTripPathFor(locale, trip.slug)}>{copy.samples.cardCta}</ForwardLink>
          </div>
        </article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.split}`} aria-labelledby="corporate-more-title">
        <div><p className={styles.eyebrow}>{copy.more.eyebrow}</p><h2 id="corporate-more-title">{words(locale, copy.more.title)}</h2><p className={styles.sideNote}>{copy.more.intro}</p></div>
        <ul className={styles.placeList}>{copy.more.items.map((place) => <li key={place.slug}><Link href={`${prefix(locale)}/tours/${place.slug}/`}><span className={styles.placeName}>{place.name}</span><span className={styles.placeBody}>{place.body}</span><span className={styles.arrow} aria-hidden="true" /></Link></li>)}</ul>
      </section>

      <section className={`${styles.section} ${styles.split}`} aria-labelledby="corporate-proposal-title">
        <div><p className={styles.eyebrow}>{copy.proposal.eyebrow}</p><h2 id="corporate-proposal-title">{words(locale, copy.proposal.title)}</h2><p className={styles.sideNote}>{copy.proposal.intro}</p></div>
        <div>
          <div className={styles.columns2}>
            <div><h3>{japaneseWords(locale, copy.proposal.arrangedTitle)}</h3><ul className={styles.ruledList}>{copy.proposal.arranged.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>{japaneseWords(locale, copy.proposal.documentsTitle)}</h3><ul className={styles.ruledList}>{copy.proposal.documents.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3 className={styles.afterList}>{japaneseWords(locale, copy.proposal.paymentTitle)}</h3><p className={styles.body}>{copy.proposal.payment}</p></div>
          </div>
          <p className={styles.contract}>{numbers(locale, copy.proposal.contract)} <Link href={`${prefix(locale)}/business-information/`}>{copy.proposal.businessLink}</Link></p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="corporate-process-title">
        <p className={styles.eyebrow}>{copy.steps.eyebrow}</p>
        <h2 id="corporate-process-title">{words(locale, copy.steps.title)}</h2>
        <ol className={styles.steps}>{copy.steps.items.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{japaneseWords(locale, step.title)}</h3><p>{step.body}</p></li>)}</ol>
      </section>

      <Faqs copy={copy} faqs={copy.faqs} title={copy.faqTitle} />
      <PhotoCredits copy={copy} photos={trips.map((trip) => trip.hero)} />
      <CorporateTravelEnquiry locale={locale} privacyHref={`${prefix(locale)}/privacy/`} />
    </div>
  </PageFrame>;
}

export function CorporateTripPage({ trip, locale = "en" }: { trip: CorporateTrip; locale?: CorporateLocale }) {
  const copy = getCorporateHubCopy(locale);
  const ui = copy.ui;
  const dayLabel = (index: number) => ui.day.replace("{n}", String(index + 1));
  return <PageFrame copy={copy} mainId="corporate-trip-main" paths={languagePaths((code) => corporateTripPathFor(code, trip.slug))}>
    <header className={`${styles.container} ${styles.hero}`}>
      <Breadcrumb copy={copy} current={trip.title} />
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{trip.eyebrow}</p>
          <h1 className={styles.tripTitle}>{words(locale, trip.title)}</h1>
          <p className={styles.lede}>{trip.lede}</p>
          <div className={styles.heroActions}><ForwardLink href="#corporate-enquiry">{ui.planCta}</ForwardLink></div>
        </div>
        <Photo photo={trip.hero} priority className={styles.heroPhoto} sizes="(max-width: 56rem) calc(100vw - 2rem), 36rem" />
      </div>
      <dl className={styles.facts}><div><dt>{ui.facts.duration}</dt><dd>{trip.duration}</dd></div><div><dt>{ui.facts.group}</dt><dd>{numbers(locale, trip.groupSize)}</dd></div><div><dt>{ui.facts.base}</dt><dd>{trip.base}</dd></div><div><dt>{ui.facts.format}</dt><dd>{trip.format}</dd></div></dl>
    </header>
    <div className={styles.container}>
      <section className={`${styles.section} ${styles.split}`} aria-labelledby="corporate-story-title"><div><p className={styles.eyebrow}>{ui.storyEyebrow}</p><h2 id="corporate-story-title">{words(locale, trip.storyTitle)}</h2></div><div><p className={styles.largeBody}>{trip.story}</p><div className={styles.columns3Tight}>{trip.highlights.map((highlight) => <div key={highlight.title}><h3>{japaneseWords(locale, highlight.title)}</h3><p>{highlight.text}</p></div>)}</div></div></section>

      <section className={styles.section} aria-labelledby="corporate-itinerary-title">
        <div className={styles.sectionIntro}><div><p className={styles.eyebrow}>{ui.itineraryEyebrow}</p><h2 id="corporate-itinerary-title">{words(locale, ui.itineraryTitle)}</h2></div><p>{ui.itineraryIntro}</p></div>
        <nav className={styles.dayNav} aria-label={ui.jumpToDay}>{trip.days.map((day, index) => <a href={`#day-${index + 1}`} key={day.title}><span>{dayLabel(index)}</span>{day.title}</a>)}</nav>
        <div className={styles.dayList}>{trip.days.map((day, index) => <article className={styles.day} id={`day-${index + 1}`} key={day.title}>
          <div className={styles.dayText}><p className={styles.eyebrow}>{dayLabel(index)} · {day.place}</p><h3>{words(locale, day.title)}</h3><p className={styles.daySummary}>{day.summary}</p><ul>{day.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
          <Photo photo={day.image} sizes="(max-width: 48rem) calc(100vw - 2rem), 36rem" />
        </article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.split}`} aria-labelledby="corporate-stay-title"><div><p className={styles.eyebrow}>{ui.stayEyebrow}</p><h2 id="corporate-stay-title">{words(locale, trip.stay.title)}</h2></div><div><p className={styles.largeBody}>{trip.stay.body}</p><ul className={styles.ruledList}>{trip.stay.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></section>

      <section className={styles.section} aria-labelledby="corporate-scope-title"><div className={styles.sectionIntro}><div><p className={styles.eyebrow}>{ui.scopeEyebrow}</p><h2 id="corporate-scope-title">{words(locale, ui.scopeTitle)}</h2></div><p>{ui.scopeIntro}</p></div><div className={styles.columns3}><div><h3>{japaneseWords(locale, ui.included)}</h3><ul className={styles.ruledList}>{trip.scope.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>{japaneseWords(locale, ui.options)}</h3><ul className={styles.ruledList}>{trip.options.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>{japaneseWords(locale, ui.excluded)}</h3><ul className={styles.ruledList}>{trip.notIncluded.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>

      <section className={`${styles.section} ${styles.split}`} aria-labelledby="corporate-planning-title"><div><p className={styles.eyebrow}>{ui.notesEyebrow}</p><h2 id="corporate-planning-title">{words(locale, ui.notesTitle)}</h2></div><div className={styles.notes}>{trip.planningNotes.map((note) => <div key={note.title}><h3>{japaneseWords(locale, note.title)}</h3><p>{note.body}</p></div>)}</div></section>

      <Faqs copy={copy} faqs={trip.faqs} title={ui.tripFaqTitle} />
      <aside className={styles.related} aria-label={ui.relatedEyebrow}><p className={styles.eyebrow}>{ui.relatedEyebrow}</p><ul>{trip.relatedGuides.map((guide) => <li key={guide.href}><Link href={guide.href}>{guide.label}</Link></li>)}</ul><Link className={styles.backLink} href={corporateHubPathFor(locale)}>{ui.backLink}</Link></aside>
      <PhotoCredits copy={copy} photos={[trip.hero, ...trip.days.map((day) => day.image)]} />
      <CorporateTravelEnquiry initialTrip={trip.slug} locale={locale} privacyHref={`${prefix(locale)}/privacy/`} />
    </div>
  </PageFrame>;
}
