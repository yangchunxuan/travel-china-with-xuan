import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, Plus } from "lucide-react";
import type { HomegroundLocale } from "../lib/homegroundI18n";
import { terracottaHalfDayCopy, terracottaHalfDayImage, terracottaHalfDayPreviewPaths, terracottaHalfDayReadHref } from "../lib/terracottaHalfDayDraft";
import { HomegroundHeader } from "./HomegroundHeader";
import { HomegroundFooter } from "./HomegroundFooter";
import localeStyles from "./LocaleRoot.module.css";
import styles from "./TerracottaHalfDayDraftPage.module.css";

function AttractionHeading({ text }: { text: string }) {
  return text.split(/(兵马俑|陶俑)/u).map((part, index) =>
    /^(兵马俑|陶俑)$/u.test(part)
      ? <span className={styles.keepWord} key={index}>{part}</span>
      : part,
  );
}

export function TerracottaHalfDayDraftPage({ locale }: { locale: HomegroundLocale }) {
  const copy = terracottaHalfDayCopy[locale];
  return (
    <div className={`${styles.page} ${localeStyles.root} hg-locale-root`} data-homeground-locale={locale}>
      <a className={styles.skip} href="#terracotta-main">{copy.skip}</a>
      <HomegroundHeader locale={locale} pageContext="tour" languagePaths={terracottaHalfDayPreviewPaths} />
      <aside className={styles.draft}>{copy.draft}</aside>
      <main id="terracotta-main">
        <section className={styles.hero} aria-labelledby="terracotta-title">
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumb} aria-label={copy.home}>
              <Link href={locale === "en" ? "/" : `/${locale}/`}>{copy.home}</Link><span aria-hidden="true">/</span><span>{copy.eyebrow}</span>
            </nav>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1 id="terracotta-title">{copy.title}</h1>
            <p className={styles.heroDetail}>{copy.heroDetail}</p>
            <p className={styles.promise}>{copy.promise}</p>
            <p className={styles.lede}>{copy.lede}</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#half-day-enquiry">{copy.primaryCta}<ArrowRight size={19} aria-hidden="true" /></a>
              <a className={styles.textLink} href="#half-day-itinerary">{copy.secondaryCta}<ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className={styles.heroImage}>
            <Image src={terracottaHalfDayImage.src} width={1280} height={853} alt={copy.heroAlt} priority sizes="(max-width: 800px) 100vw, 48vw" />
            <figcaption>{copy.heroCaption}</figcaption>
          </figure>
        </section>
        <div className={styles.content}>
          <dl className={styles.facts}>{copy.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
          <div className={styles.bodyGrid}>
            <div className={styles.editorial}>
              <section id="half-day-itinerary" className={styles.section} aria-labelledby="itinerary-title">
                <p className={styles.eyebrow}>{copy.routeEyebrow}</p>
                <h2 id="itinerary-title"><AttractionHeading text={copy.routeTitle} /></h2>
                <p className={styles.intro}>{copy.routeBody}</p>
                <ol className={styles.timeline}>{copy.stops.map((stop) => <li key={stop.time}><p className={styles.stepLabel}>{stop.time}</p><h3><AttractionHeading text={stop.title} /></h3><p>{stop.body}</p></li>)}</ol>
                <p className={styles.note}>{copy.timingNote}</p>
              </section>
              <section className={styles.section} aria-labelledby="scope-title">
                <p className={styles.eyebrow}>{copy.scopeEyebrow}</p>
                <h2 id="scope-title">{copy.scopeTitle}</h2>
                <div className={styles.scopeGrid}>
                  <div><h3>{copy.includedTitle}</h3><ul className={styles.scopeList}>{copy.included.map((item) => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul></div>
                  <div><h3>{copy.excludedTitle}</h3><ul className={styles.plainList}>{copy.excluded.map((item) => <li key={item}>{item}</li>)}</ul></div>
                </div>
                <div className={styles.booking}><h3>{copy.bookingTitle}</h3><p>{copy.bookingBody}</p><a className={styles.source} href="https://www.bmy.com.cn/guide/">{copy.officialLink}<ArrowRight size={15} aria-hidden="true" /></a></div>
              </section>
              <section className={styles.section} aria-labelledby="faq-title">
                <h2 id="faq-title">{copy.faqTitle}</h2>
                <div className={styles.faq}>{copy.faq.map((faq) => <details key={faq.question}><summary><span>{faq.question}</span><Plus size={19} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
              </section>
            </div>
            <aside className={styles.quote} aria-labelledby="quote-title">
              <p className={styles.eyebrow}>{copy.quoteEyebrow}</p>
              <h2 id="quote-title">{copy.priceTitle}</h2>
              <p>{copy.priceBody}</p>
              <a className={styles.primary} href="#half-day-enquiry">{copy.primaryCta}<ArrowRight size={19} aria-hidden="true" /></a>
              <p className={styles.quoteNote}>{copy.priceNote}</p>
            </aside>
          </div>
          <section id="half-day-enquiry" className={styles.enquiry} aria-labelledby="enquiry-title">
            <div><p className={styles.eyebrow}>{copy.enquiryEyebrow}</p><h2 id="enquiry-title">{copy.enquiryTitle}</h2><p>{copy.enquiryBody}</p></div>
            <div className={styles.enquiryDetails}>{copy.enquiryDetails.map((detail, index) => <div key={detail.title}><span className={styles.detailNumber} aria-hidden="true">0{index + 1}</span><div><h3>{detail.title}</h3><p>{detail.body}</p></div></div>)}</div>
            <p className={styles.enquiryNote}>{copy.enquiryNote}</p>
          </section>
          <section className={styles.next} aria-labelledby="next-title"><h2 id="next-title">{copy.nextTitle}</h2><ol>{copy.nextSteps.map((step) => <li key={step}>{step}</li>)}</ol></section>
          <section className={styles.read} aria-labelledby="read-title"><h2 id="read-title">{copy.readTitle}</h2><div>{copy.readLinks.map((link) => <Link key={link.path} href={terracottaHalfDayReadHref(link.path, locale)} prefetch={false}><h3>{link.title}<ArrowRight size={18} aria-hidden="true" /></h3><p>{link.body}</p></Link>)}</div></section>
          <p className={styles.credit}><a href={terracottaHalfDayImage.sourceUrl}>{copy.photoCredit}</a> · {terracottaHalfDayImage.author} · <a href={terracottaHalfDayImage.licenseUrl}>{terracottaHalfDayImage.license}</a></p>
        </div>
      </main>
      <HomegroundFooter locale={locale} pageContext="tour" />
    </div>
  );
}
