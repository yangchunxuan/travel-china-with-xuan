import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getCorporateEdition, corporateTranslator } from "../lib/corporateTravelEditions";
import { corporatePath, corporateHeaderLanguages, corporateHtmlLanguage, type CorporateLocale } from "../lib/corporateTravelLocalePaths";
import { ArabicSiteHeader, ArabicSiteFooter } from "./ArabicChrome";
import { GermanSiteHeader, GermanSiteFooter } from "./GermanChrome";
import { FrenchSiteHeader, FrenchSiteFooter } from "./FrenchChrome";
import { SpanishSiteHeader, SpanishSiteFooter } from "./SpanishChrome";
import { JapaneseSiteHeader, JapaneseSiteFooter } from "./JapaneseTourChrome";
import { corporateHubPath, corporateTripPath, type CorporateFaq, type CorporateImage, type CorporateTrip } from "../lib/corporateTravelTypes";
import { CorporateTravelEnquiry } from "./CorporateTravelEnquiry";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import styles from "./CorporateTravelPages.module.css";


function PageFrame({ children, mainId, path, locale }: { children: ReactNode; mainId: string; path: string; locale: CorporateLocale }) {
  const t = corporateTranslator(getCorporateEdition(locale).ui);
  const slug = path.split("/corporate-travel/")[1]?.split("/")[0] || undefined;
  const languagePaths = corporateHeaderLanguages(slug);
  const primary = locale === "en" || locale === "zh" || locale === "ko";
  const Header = locale === "ar" ? ArabicSiteHeader : locale === "de" ? GermanSiteHeader : locale === "fr" ? FrenchSiteHeader : locale === "es" ? SpanishSiteHeader : JapaneseSiteHeader;
  const Footer = locale === "ar" ? ArabicSiteFooter : locale === "de" ? GermanSiteFooter : locale === "fr" ? FrenchSiteFooter : locale === "es" ? SpanishSiteFooter : JapaneseSiteFooter;
  return <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={locale} lang={corporateHtmlLanguage(locale)} dir={locale === "ar" ? "rtl" : "ltr"}>
    <a className={localeStyles.skipLink} href={`#${mainId}`}>{t("Skip to content")}</a>
    {primary ? <HomegroundHeader locale={locale} pageContext="services" languagePaths={Object.fromEntries(languagePaths.map(item => [item.lang, item.path]))} plannerHrefOverride="#corporate-enquiry" /> : <Header currentPath={path} languagePaths={languagePaths} contactHref="#corporate-enquiry" />}
    <main id={mainId} tabIndex={-1}>{children}</main>
    {primary ? <HomegroundFooter locale={locale} pageContext="services" /> : <Footer currentPath={path} />}
  </div>;
}

function Breadcrumb({ current, locale }: { current?: string; locale: CorporateLocale }) {
  const t = corporateTranslator(getCorporateEdition(locale).ui);
  return <nav className={styles.breadcrumb} aria-label={t("Breadcrumb")}><ol>
    <li><Link href={locale === "en" ? "/" : `/${locale}/`}>{t("Home")}</Link></li>
    <li><span aria-hidden="true">/</span>{current ? <Link href={corporatePath(locale)}>{t("For companies")}</Link> : <span aria-current="page">{t("For companies")}</span>}</li>
    {current && <li aria-current="page"><span aria-hidden="true">/</span>{current}</li>}
  </ol></nav>;
}

function Photo({ photo, priority = false, className = "", sizes = "(max-width: 48rem) calc(100vw - 2rem), (max-width: 82rem) calc(100vw - 3rem), 77rem" }: { photo: CorporateImage; priority?: boolean; className?: string; sizes?: string }) {
  return <figure className={`${styles.photo} ${className}`}>
    <div className={styles.photoInner}><Image src={photo.src} alt={photo.alt} fill priority={priority} sizes={sizes} /></div>
    <figcaption>{photo.caption}</figcaption>
  </figure>;
}

function Faqs({ faqs, title, locale }: { faqs: CorporateFaq[]; title?: string; locale: CorporateLocale }) {
  const t = corporateTranslator(getCorporateEdition(locale).ui);
  return <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="corporate-faq-title">
    <div className={styles.sectionHeading}><p className={styles.eyebrow}>{t("A few practical questions")}</p><h2 id="corporate-faq-title">{title ?? t("Before you bring the team.")}</h2></div>
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

function PhotoCredits({ photos, locale }: { photos: CorporateImage[]; locale: CorporateLocale }) {
  const t = corporateTranslator(getCorporateEdition(locale).ui);
  const credits = photoCredits.filter((credit) => photos.some((photo) => photo.src.endsWith(credit.file)));
  if (!credits.length) return null;
  return <details className={styles.photoCredits}><summary>{t("Photo credits")}</summary><p>{t("Destination photographs illustrate the places in the programme. Images have been resized and may be cropped for the layout.")}</p><ul>{credits.map((credit) => <li key={credit.file}><a href={credit.source}>{t(credit.subject)}</a> — {credit.author} / <a href={credit.licenceUrl} rel="license">{credit.licence}</a></li>)}</ul></details>;
}

function EnquirySection({ trip, locale }: { trip?: CorporateTrip; locale: CorporateLocale }) {
  return <CorporateTravelEnquiry initialTrip={trip?.slug} locale={locale} copy={getCorporateEdition(locale).ui} />;
}

export function CorporateTravelHubPage({ locale = "en" }: { locale?: CorporateLocale }) {
  const edition = getCorporateEdition(locale);
  const corporateTrips = edition.trips, corporateHubFaqs = edition.hub.faqs, purposes = edition.hub.purposes;
  const t = corporateTranslator(edition.ui);
  const hero = corporateTrips[0].hero;
  return <PageFrame locale={locale} mainId="corporate-main" path={corporatePath(locale)}>
    <header className={`${styles.container} ${styles.hero}`}>
      <Breadcrumb locale={locale} />
      <div className={styles.heroHeading}><div><p className={styles.eyebrow}>{t("China, together")}</p><h1>{edition.hub.title}</h1></div><div className={styles.heroAside}><p className={styles.heroPromise}>{t("Bring your team together.")}<br />{t("We’ll take care of the journey.")}</p><p>{t("Company trips, incentive travel and small meetings, planned around your people, purpose and budget.")}</p><a className={styles.primaryLink} href="#corporate-enquiry">{t("Tell us about your team")}<span aria-hidden="true">↗</span></a></div></div>
      <Photo photo={hero} priority className={styles.hubHeroPhoto} />
      <div className={styles.heroFootnote}><span>{t("Private programmes in China")}</span><span>{t("For companies worldwide")}</span><span>{t("Proposed for your dates and budget")}</span></div>
    </header>

    <div className={styles.container}>
      <section className={styles.section} aria-labelledby="corporate-purpose-title">
        <div className={styles.sectionIntro}><div><p className={styles.eyebrow}>{t("Three reasons to travel")}</p><h2 id="corporate-purpose-title">{t("Begin with the reason.")}<br />{t("We’ll shape the journey.")}</h2></div><p>{t("A good company trip has a clear purpose, and enough breathing room for people to enjoy being there. These are three ways we can help.")}</p></div>
        <div className={styles.purposeGrid}>{purposes.map((purpose) => <article className={styles.purpose} id={purpose.id} key={purpose.id}><span className={styles.index}>{purpose.number}</span><h3>{purpose.title}</h3><p>{purpose.body}</p><p className={styles.smallNote}>{purpose.note}</p></article>)}</div>
      </section>

      <section className={styles.section} aria-labelledby="corporate-samples-title" id="sample-programmes">
        <div className={styles.sectionIntro}><div><p className={styles.eyebrow}>{t("Two places to start")}</p><h2 id="corporate-samples-title">{t("A change of scene.")}<br />{t("A shared experience.")}</h2></div><p>{t("Two four-day sample programmes, each with a different rhythm. Use them to start a conversation; we’ll adapt the details to your team.")}</p></div>
        <div className={styles.tripGrid}>{corporateTrips.map((trip, index) => <article className={styles.tripCard} key={trip.slug}>
          <Link className={styles.tripImageLink} href={corporatePath(locale, trip.slug)} aria-label={t("Explore {title}").replace("{title}", trip.title)}><Photo photo={trip.hero} sizes="(max-width: 48rem) calc(100vw - 2rem), (max-width: 82rem) calc((100vw - 5rem) / 2), 37.5rem" /></Link>
          <p className={styles.cardEyebrow}>{String(index + 1).padStart(2, "0")} / {trip.duration}</p><h3><Link href={corporatePath(locale, trip.slug)}>{trip.title}</Link></h3><p>{trip.description}</p><Link className={styles.textLink} href={corporatePath(locale, trip.slug)}>{t("Explore the sample programme")}<span aria-hidden="true">→</span></Link>
        </article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.organizerSection}`} aria-labelledby="corporate-handles-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>{t("For the person organising it all")}</p><h2 id="corporate-handles-title">{t("One programme.")}<br />{t("The details connected.")}</h2><p>{t("We bring the arrangements on the ground into a coherent plan, with responsibilities agreed before the trip.")}</p></div>
        <ol className={styles.handlesList}>
          <li><span>01</span><div><h3>{t("A sensible route and pace")}</h3><p>{t("Balance travel time, shared activities, working sessions and time to yourselves. Include a practical alternative when weather affects the plan.")}</p></div></li>
          <li><span>02</span><div><h3>{t("Stays, transfers and meals")}</h3><p>{t("Work through rooming preferences, separate arrivals, luggage and dietary requirements, then check the appropriate options for your dates.")}</p></div></li>
          <li><span>03</span><div><h3>{t("Space for your own programme")}</h3><p>{t("Coordinate a meeting room, group dinner or recognition evening where requested. Venue, equipment and catering requirements are quoted specifically.")}</p></div></li>
          <li><span>04</span><div><h3>{t("Clear coordination on the ground")}</h3><p>{t("Set out the guide, transport and local support arrangements, together with who your organiser should contact during the programme.")}</p></div></li>
        </ol>
      </section>

      <section className={`${styles.section} ${styles.quoteSection}`} aria-labelledby="corporate-quote-title">
        <div><p className={styles.eyebrow}>{t("A proposal you can share internally")}</p><h2 id="corporate-quote-title">{t("Your people.")}<br />{t("Your dates.")}<br />{t("A clear quote.")}</h2></div>
        <div><p className={styles.largeBody}>{t("Single rooms or shared rooms? A quiet team dinner or an awards evening? The details make a difference to both the experience and the budget.")}</p><p>{t("We quote for the actual programme: headcount, rooming, hotel standard, transport, meals, activities and any meeting needs. Before booking, you receive the scope, total price, separate options and payment and cancellation conditions in writing.")}</p><p className={styles.smallNote}>{t("The sample programmes are not fixed-price packages. Availability is checked for your dates; a proposal does not hold rooms or venues.")}</p><a className={styles.textLink} href="#corporate-enquiry">{t("Share your brief")}<span aria-hidden="true">→</span></a></div>
      </section>

      <section className={styles.section} aria-labelledby="corporate-process-title">
        <div className={styles.sectionIntro}><div><p className={styles.eyebrow}>{t("From a brief to a journey")}</p><h2 id="corporate-process-title">{t("A few clear steps.")}</h2></div><p>{t("Enough structure for the organiser. Enough flexibility to make the trip your own.")}</p></div>
        <ol className={styles.steps}><li><span>01</span><h3>{t("Tell us the purpose")}</h3><p>{t("Share your people, dates, budget and what you want the trip to achieve.")}</p></li><li><span>02</span><h3>{t("Shape the programme")}</h3><p>{t("Review a route, the proposed arrangements and the options that matter to you.")}</p></li><li><span>03</span><h3>{t("Confirm the details")}</h3><p>{t("Agree availability, the written quote and booking conditions before payment.")}</p></li><li><span>04</span><h3>{t("Bring the team")}</h3><p>{t("Finalise rooming, arrival details and the practical information for everyone travelling.")}</p></li></ol>
      </section>

      <aside className={styles.credentials} aria-label={t("About Homeground")}><p>{t("Get to know the people and business behind your programme.")}</p><div><Link href={locale === "en" ? "/studio/" : `/${locale}/studio/`}>{t("How we plan")}<span aria-hidden="true">↗</span></Link><Link href={locale === "en" ? "/business-information/" : `/${locale}/business-information/`}>{t("Business information & licences")}<span aria-hidden="true">↗</span></Link></div></aside>
      <Faqs locale={locale} faqs={corporateHubFaqs} />
      <PhotoCredits locale={locale} photos={corporateTrips.map((trip) => trip.hero)} />
      <EnquirySection locale={locale} />
    </div>
  </PageFrame>;
}

export function CorporateTripPage({ trip, locale = "en" }: { trip: CorporateTrip; locale?: CorporateLocale }) {
  const t = corporateTranslator(getCorporateEdition(locale).ui);
  return <PageFrame locale={locale} mainId="corporate-trip-main" path={corporatePath(locale, trip.slug)}>
    <header className={`${styles.container} ${styles.hero} ${styles.detailHero}`}>
      <Breadcrumb locale={locale} current={trip.title} />
      <p className={styles.eyebrow}>{trip.eyebrow}</p><h1>{trip.title}</h1>
      <div className={styles.detailIntro}><p className={styles.detailLede}>{trip.lede}</p><a className={styles.primaryLink} href="#corporate-enquiry">{t("Plan this for your team")}<span aria-hidden="true">↗</span></a></div>
      <Photo photo={trip.hero} priority className={styles.detailHeroPhoto} />
      <dl className={styles.facts}><div><dt>{t("Duration")}</dt><dd>{trip.duration}</dd></div><div><dt>{t("Suggested group")}</dt><dd>{trip.groupSize}</dd></div><div><dt>{t("Base")}</dt><dd>{trip.base}</dd></div><div><dt>{t("Programme")}</dt><dd>{trip.format}</dd></div></dl>
    </header>
    <div className={styles.container}>
      <section className={`${styles.section} ${styles.storySection}`} aria-labelledby="corporate-story-title"><div><p className={styles.eyebrow}>{t("The idea behind the journey")}</p><h2 id="corporate-story-title">{trip.storyTitle}</h2></div><div><p className={styles.largeBody}>{trip.story}</p><div className={styles.highlightList}>{trip.highlights.map((highlight) => <div key={highlight.title}><h3>{highlight.title}</h3><p>{highlight.text}</p></div>)}</div></div></section>

      <section className={styles.section} aria-labelledby="corporate-itinerary-title">
        <div className={styles.sectionIntro}><div><p className={styles.eyebrow}>{t("The sample programme")}</p><h2 id="corporate-itinerary-title">{t("Four days, thoughtfully paced.")}</h2></div><p>{t("A framework for your own trip. Dates, arrival times, weather and your team’s preferences will shape the final programme.")}</p></div>
        <nav className={styles.dayNav} aria-label={t("Jump to a day")}>{trip.days.map((day, index) => <a href={`#day-${index + 1}`} key={day.title}><span>{t("Day {day}").replace("{day}", String(index + 1))}</span>{day.place}<span aria-hidden="true">↓</span></a>)}</nav>
        <div className={styles.dayList}>{trip.days.map((day, index) => <article className={styles.day} id={`day-${index + 1}`} key={day.title}>
          <div className={styles.dayText}><p className={styles.eyebrow}>{t("Day {day}").replace("{day}", String(index + 1).padStart(2, "0"))} / {day.place}</p><h3>{day.title}</h3><p className={styles.daySummary}>{day.summary}</p><ul>{day.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div>
          <Photo photo={day.image} sizes="(max-width: 48rem) calc(100vw - 2rem), (max-width: 82rem) calc((100vw - 6rem) / 2), 36rem" />
        </article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.staySection}`} aria-labelledby="corporate-stay-title"><div><p className={styles.eyebrow}>{t("Where everyone settles in")}</p><h2 id="corporate-stay-title">{trip.stay.title}</h2></div><div><p className={styles.largeBody}>{trip.stay.body}</p><ul className={styles.ruledList}>{trip.stay.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></section>

      <section className={styles.section} aria-labelledby="corporate-scope-title"><div className={styles.sectionIntro}><div><p className={styles.eyebrow}>{t("Make the scope clear")}</p><h2 id="corporate-scope-title">{t("Know what you are planning.")}</h2></div><p>{t("The following is the proposed scope to discuss. Your final written quote confirms exactly what is included, the agreed options and booking conditions.")}</p></div><div className={styles.scopeGrid}><div><h3>{t("Proposed arrangements")}</h3><ul>{trip.scope.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>{t("Options to discuss")}</h3><ul>{trip.options.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>{t("Outside the sample scope")}</h3><ul>{trip.notIncluded.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>

      <section className={`${styles.section} ${styles.planningSection}`} aria-labelledby="corporate-planning-title"><div className={styles.sectionHeading}><p className={styles.eyebrow}>{t("A few things to work through")}</p><h2 id="corporate-planning-title">{t("Designed around the people coming.")}</h2></div><div className={styles.planningNotes}>{trip.planningNotes.map((note) => <div key={note.title}><h3>{note.title}</h3><p>{note.body}</p></div>)}</div></section>

      <Faqs locale={locale} faqs={trip.faqs} title={t("Questions about this programme.")} />
      <aside className={styles.related} aria-label={t("Useful reading")}><p className={styles.eyebrow}>{t("A little more local context")}</p><div>{trip.relatedGuides.map((guide) => <Link key={guide.href} href={guide.href}>{guide.label}<span aria-hidden="true">↗</span></Link>)}</div><Link className={styles.backLink} href={corporatePath(locale)}>{t("← Explore company trips in China")}</Link></aside>
      <PhotoCredits locale={locale} photos={[trip.hero, ...trip.days.map((day) => day.image)]} />
      <EnquirySection locale={locale} trip={trip} />
    </div>
  </PageFrame>;
}

