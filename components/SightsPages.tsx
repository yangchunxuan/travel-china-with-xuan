import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import {
  attractionReservationHref,
  attractionReservationServiceFeeCny,
  formatAttractionFaceValue,
  formatAttractionReservationFee,
  getAttractionReservationRule,
  type AttractionReservationRule,
} from "../lib/attractionReservations";
import { formatAttractionReservationEditionMoney } from "../lib/attractionReservationEditions";
import { getAttractionReservationCopy } from "../lib/attractionReservationsI18n";
import { destinationEditionNavigation } from "../lib/destinationEditionNavigation";
import { editionEnglishMarker } from "../lib/editionEnglishMarker";
import { getDestinationHubEntry, isDestinationHubId, type DestinationHubId } from "../lib/destinationHubs";
import { generatedImageSrcSet } from "../lib/generatedImageSrcSet";
import { getGuideEntry } from "../lib/guideRegistry";
import { getHomegroundCopy, type HomegroundLocale } from "../lib/homegroundI18n";
import { privateGuideCities } from "../lib/privateGuideServices";
import { getPublishedPrivateTourCatalog } from "../lib/publishedPrivateTourCatalog";
import {
  getSight,
  sightCityIds,
  sightHighlights,
  sightNeighbours,
  sightPath,
  sightPaths,
  sights,
  sightsEditionPath,
  sightsHubLanguagePaths,
  sightsPath,
  type Sight,
  type SightCityId,
  type SightId,
} from "../lib/sights";
import { sightCityName } from "../lib/sightCityName";
import { getSightsEditionCopy, type SightsEditionLocale, type SightsHubEditionLocale } from "../lib/sightsEditions";
import { fillSightsCopy, getSightsCopy, sightsKeepWords } from "../lib/sightsI18n";
import { serviceEditionLabels, serviceEditionPaths } from "../lib/serviceEdition";
import { editorialPersonSchema, EDITORIAL_PERSON_ID } from "../lib/editorialIdentity";
import { getSightStory, getSightStoryMeta, type SightStory, type SightStoryMeta } from "../lib/sightStories";
import { getTravelInspirationEditionCopy } from "../lib/travelInspirationEditions";
import { getTravelInspirationCopy } from "../lib/travelInspirationI18n";
import {
  Breadcrumb,
  breadcrumbJsonLd,
  JsonLd,
  navigationFor,
  revealDelay,
  PlanTile,
  ServiceRows,
  SITE_URL,
  TourCard,
} from "./DestinationParts";
import { EditionSiteFooter, EditionSiteHeader } from "./EditionSiteChrome";
import { HomegroundFooter } from "./HomegroundFooter";
import { PhotoCreditLine, PhotoCredits, TourPhotoCredits } from "./PhotoCredits";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { EditorialByline } from "./EditorialByline";
import { RevealOnce } from "./motion/RevealOnce";
import { KeepWords } from "./text/KeepWords";
import styles from "./TravelInspiration.module.css";
import sightStyles from "./SightsPages.module.css";

const cityName = sightCityName;

function cityHubPath(city: SightCityId, locale: HomegroundLocale) {
  return isDestinationHubId(city) ? getDestinationHubEntry(city, locale).path : null;
}

function sightRules(sight: Sight) {
  return sight.reservationIds
    .map((id) => getAttractionReservationRule(id))
    .filter((rule): rule is AttractionReservationRule => Boolean(rule));
}

function sightImage(sight: Sight, locale: HomegroundLocale) {
  if (sight.image) return { ...sight.image, alt: sight.image.alt[locale] };
  if (!sight.guideId) throw new Error(`Sight "${sight.id}" has neither a guide nor a photo`);
  const guide = getGuideEntry(sight.guideId, locale);
  return { src: guide.heroImagePath, width: guide.imageWidth, height: guide.imageHeight, alt: guide.heroAlt, credit: sight.photoCredit };
}

function photoCreditOf(sight: Sight) {
  return sight.image ? sight.image.credit : sight.photoCredit;
}

/**
 * The credits of the openly licensed photos in a grid or strip, in one line
 * under it: nothing is ever written on a photo.
 */
export function SightPhotoCredits({ items, locale, editionLocale }: { items: readonly Sight[]; locale: HomegroundLocale; editionLocale?: SightsEditionLocale }) {
  const copy = editionLocale ? getSightsEditionCopy(editionLocale) : getSightsCopy(locale);
  return <PhotoCredits editionLocale={editionLocale} items={items.map((sight) => ({ key: sight.id, name: copy.sights[sight.id].name, credit: photoCreditOf(sight) }))} locale={locale} />;
}

function formatDate(value: string, locale: HomegroundLocale) {
  return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-GB", { dateStyle: "medium", timeZone: "UTC" })
    .format(new Date(`${value}T00:00:00.000Z`));
}

/** A sight line, with the Chinese place names kept whole. */
function SightText({ text, locale }: { text: string; locale: HomegroundLocale }) {
  return <KeepWords keep={sightsKeepWords} locale={locale} text={text} />;
}

/** An edition's line: Japanese breaks between phrases; the others as written. */
function EditionText({ text, editionLocale }: { text: string; editionLocale: SightsEditionLocale }) {
  return editionLocale === "ja" ? <KeepWords locale="ja" text={text} /> : <>{text}</>;
}

const bookingAnchor = "booking";
const toursAnchor = "tours";

/**
 * Running text in the sight's own writing. Chinese paragraphs break between
 * any two characters under the page's strict line-breaking rules (as books
 * and the guides do); KeepWords' word-by-word breaking is for headings and
 * short lines. Korean keeps a quoted word and its particle together (‘1층’이),
 * which keep-all alone does not.
 */
function StoryText({ text, locale }: { text: string; locale: HomegroundLocale }) {
  if (locale !== "ko") return <>{text}</>;
  return (
    <>
      {text.split(/(‘[^’]+’[가-힣]*)/u).map((part, index) =>
        index % 2 ? <span className={sightStyles.together} key={index}>{part}</span> : part,
      )}
    </>
  );
}

/**
 * The sight's own writing, between the hero and the booking facts: why it is
 * worth the trip and three things not to miss, then how it fits a day.
 */
function SightStorySections({ story, meta, locale }: { story: SightStory; meta: SightStoryMeta | null; locale: HomegroundLocale }) {
  const labels = getSightsCopy(locale).page.story;
  const facts = [
    { label: labels.time, text: story.time },
    { label: labels.when, text: story.when },
    { label: labels.pair, text: story.pair },
    { label: labels.skip, text: story.skip },
  ];
  return (
    <>
      <section aria-labelledby="sight-why-title" className={styles.section} data-reveal="">
        <div className={sightStyles.why}>
          <h2 id="sight-why-title">{labels.whyTitle}</h2>
          <div className={sightStyles.whyBody}>
            {story.why.map((paragraph) => <p key={paragraph}><StoryText locale={locale} text={paragraph} /></p>)}
          </div>
        </div>
        <h3 className={sightStyles.highlightsTitle}>{labels.highlightsTitle}</h3>
        <ul className={sightStyles.highlights}>
          {story.highlights.map((item) => (
            <li key={item.name}>
              <h4>{item.name}</h4>
              <p><StoryText locale={locale} text={item.body} /></p>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="sight-fit-title" className={styles.section} data-reveal="">
        <h2 id="sight-fit-title">{labels.fitTitle}</h2>
        <dl className={sightStyles.fit}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd><StoryText locale={locale} text={fact.text} /></dd>
            </div>
          ))}
        </dl>
      </section>
      {story.faq?.length ? (
        <section aria-labelledby="sight-faq-title" className={styles.section} data-reveal="">
          <div className={sightStyles.faq}>
            <h2 id="sight-faq-title">{labels.faqTitle}</h2>
            <div>
              {story.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary>
                  <p><StoryText locale={locale} text={item.answer} /></p>
                </details>
              ))}
            </div>
          </div>
          {meta?.sources.length ? (
            <p className={sightStyles.sources}>
              {labels.sourcesTitle}{locale === "zh" ? "：" : ": "}
              {meta.sources.map((source, index) => (
                <span key={source.url}>
                  {index ? <span aria-hidden="true"> · </span> : null}
                  <a href={source.url} rel="noreferrer">{source.title}</a>
                </span>
              ))}
            </p>
          ) : null}
        </section>
      ) : null}
    </>
  );
}

/**
 * One reservation rule as a card, with exactly the facts the rules state (the
 * reservation page shows the same). Known fields are listed; fields left open
 * are named once; when every field is open the card says, in one sentence,
 * that we confirm them for the traveller's date (and keeps the internal notes
 * and check date out of it). A rule we book carries its own "Book this" link,
 * which opens the form with that attraction ticked.
 */
function RuleCard({ rule, locale, index, feeNote }: { rule: AttractionReservationRule; locale: HomegroundLocale; index: number; feeNote?: string }) {
  const copy = getAttractionReservationCopy(locale);
  const sightsCopy = getSightsCopy(locale);
  const yesNo = (value: boolean | null) => (value === null ? null : value ? copy.yes : copy.no);
  const price = !rule.price
    ? null
    : rule.price.kind === "free-reservation"
      ? copy.free
      : rule.price.kind === "free-walk-in"
        ? copy.freeWalkIn
        : `${formatAttractionFaceValue(rule.price.amount, locale)} · ${rule.price.basis[locale]}`;
  type Topic = keyof typeof sightsCopy.page.openTopics;
  const rows: [Topic, string, string | null][] = rule.status === "not-needed"
    ? [["price", copy.columns.price, price]]
    : [
        ["release", copy.columns.release, rule.release ? rule.release[locale] : null],
        ["passport", copy.columns.passport, yesNo(rule.passportAccepted)],
        ["realName", copy.columns.realName, yesNo(rule.realName)],
        ["price", copy.columns.price, price],
      ];
  const known = rows.filter((row): row is [Topic, string, string] => row[2] !== null).map(([, label, value]) => [label, value] as const);
  // Open fields are named as plain topics ("passport use"), never as the
  // table's labels, which would read as facts ("Passport accepted").
  const open = rows.filter(([, , value]) => value === null).map(([topic]) => sightsCopy.page.openTopics[topic]);
  const separator = locale === "zh" ? "、" : ", ";
  const colon = locale === "zh" ? "：" : ": ";
  return (
    <li className={sightStyles.rule} style={revealDelay(index)}>
      <h3>{rule.name[locale]}</h3>
      {known.length ? (
        <>
          <dl>
            {known.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd><KeepWords locale={locale} text={value} /></dd>
              </div>
            ))}
          </dl>
          {open.length ? (
            <p className={sightStyles.openFields}>
              <span>{copy.unknown}{colon}</span>
              {open.join(separator)}
            </p>
          ) : null}
          <p className={sightStyles.ruleNotes}>{rule.notes[locale]}</p>
          <p className={sightStyles.checked}>
            {rule.verifiedAt
              ? <>{copy.columns.verified} <time dateTime={rule.verifiedAt}>{formatDate(rule.verifiedAt, locale)}</time></>
              : copy.notChecked}
          </p>
        </>
      ) : (
        <p className={sightStyles.openAll}><KeepWords locale={locale} text={sightsCopy.page.openAll} /></p>
      )}
      {rule.status === "offered" ? (
        <a className={sightStyles.ruleAction} href={attractionReservationHref(locale, rule.id)}>
          {sightsCopy.page.reserveThis}<ArrowRight aria-hidden="true" size={15} />
        </a>
      ) : null}
      {rule.status === "offered" && feeNote ? <p className={sightStyles.cardFee}>{feeNote}</p> : null}
    </li>
  );
}

/** A sight on the hub (and on its city's page): photo, city, name and why. */
/**
 * In an edition (`editionLocale`) the card is in the edition's words and, the
 * sight pages being English, links the English page and says so.
 */
export function SightCard({ sight, locale, index, anchor, hideCity = false, editionLocale }: { sight: Sight; locale: HomegroundLocale; index: number; anchor?: string; hideCity?: boolean; editionLocale?: SightsEditionLocale }) {
  const editionCopy = editionLocale ? getSightsEditionCopy(editionLocale) : null;
  const copy = editionCopy ?? getSightsCopy(locale);
  const image = sightImage(sight, locale);
  return (
    <li className={anchor ? sightStyles.cityStart : undefined} id={anchor} style={revealDelay(index)}>
      <Link className={sightStyles.sightCard} href={sightPath(sight.id, editionLocale ? "en" : locale)} hrefLang={editionLocale ? "en" : undefined}>
        <span className={sightStyles.sightMedia}>
          <img
            alt=""
            decoding="async"
            height={image.height}
            loading="lazy"
            sizes="(max-width: 40rem) calc(50vw - 1.5rem), (max-width: 61.25rem) 30vw, 18rem"
            src={image.src}
            srcSet={generatedImageSrcSet(image.src, image.width)}
            style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
            width={image.width}
          />
        </span>
        <span className={sightStyles.sightText}>
          {hideCity ? null : <small>{editionCopy ? editionCopy.cities[sight.city] : cityName(sight.city, locale)}</small>}
          <strong>{copy.sights[sight.id].name}</strong>
          <span>{editionLocale ? <EditionText editionLocale={editionLocale} text={copy.sights[sight.id].line} /> : <SightText locale={locale} text={copy.sights[sight.id].line} />}</span>
          {editionLocale ? <small className={styles.inEnglish}>{editionEnglishMarker[editionLocale]}</small> : null}
        </span>
      </Link>
    </li>
  );
}

/** The city's other sights as the compact strip (thumbnail, name, why), so a short list leaves no holes. */
function SightStrip({ items, locale }: { items: readonly Sight[]; locale: HomegroundLocale }) {
  const copy = getSightsCopy(locale);
  // Two or four sit two to a row, so no row ends with a lone card.
  const columns = items.length === 2 || items.length === 4 ? 2 : 3;
  return (
    <ul className={`${styles.cityStrip} ${sightStyles.strip}`} style={{ "--cols": columns } as CSSProperties}>
      {items.map((sight, index) => {
        const image = sightImage(sight, locale);
        return (
          <li key={sight.id} style={revealDelay(index)}>
            <Link className={styles.cityRow} href={sightPath(sight.id, locale)}>
              <span className={styles.cityThumb}>
                <img alt="" decoding="async" height={image.height} loading="lazy" sizes="7rem" src={image.src} srcSet={generatedImageSrcSet(image.src, image.width)} style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined} width={image.width} />
              </span>
              <span className={styles.cityText}>
                <strong>{copy.sights[sight.id].name}</strong>
                <span><SightText locale={locale} text={copy.sights[sight.id].line} /></span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * The closing band. Where we book the sight it leads with attraction booking
 * (and its fee); elsewhere it offers a guide or the whole trip, and leaves the
 * ticket service out.
 */
function ClosingBand({ locale, id, bookable, showAllTours = true, city, editionLocale }: { locale: HomegroundLocale; id: string; bookable: boolean; showAllTours?: boolean; city?: SightCityId; editionLocale?: SightsHubEditionLocale }) {
  const copy = editionLocale ? getSightsEditionCopy(editionLocale) : getSightsCopy(locale);
  const { tours } = editionLocale ? { tours: { href: serviceEditionPaths(editionLocale).tours } } : navigationFor(locale);
  const allTours = editionLocale ? getTravelInspirationEditionCopy(editionLocale).hub.allTours : getTravelInspirationCopy(locale).hub.allTours;
  // An edition shows the fee in CNY, as its own reservation page does.
  const fee = editionLocale
    ? formatAttractionReservationEditionMoney(attractionReservationServiceFeeCny, editionLocale)
    : formatAttractionReservationFee(attractionReservationServiceFeeCny, locale);
  // Offer only what the city has: our guides work in four cities.
  const guides = !city || (privateGuideCities as readonly string[]).includes(city);
  const title = bookable ? copy.ctaTitle : copy.guidedTitle;
  const body = bookable
    ? fillSightsCopy(guides ? copy.ctaBody : copy.ctaBodyNoGuide, { fee })
    : guides ? copy.guidedBody : copy.tripOnlyBody;
  return (
    <section aria-labelledby={id} className={styles.cta} data-reveal="">
      <div>
        <h2 id={id}>{title}</h2>
        <p>{editionLocale ? body : <KeepWords keep={sightsKeepWords} locale={locale} text={body} />}</p>
        {tours && showAllTours ? (
          <Link className={styles.textLink} href={tours.href}>{allTours}<ArrowRight aria-hidden="true" size={15} /></Link>
        ) : null}
      </div>
      {bookable
        ? <ServiceRows editionLocale={editionLocale} lead="attraction-tickets" locale={locale} omit={guides ? [] : ["english-guides"]} />
        : guides
          ? <ServiceRows editionLocale={editionLocale} lead="english-guides" locale={locale} omit={["attraction-tickets"]} />
          : <ServiceRows editionLocale={editionLocale} lead="trip-support" locale={locale} omit={["attraction-tickets", "english-guides"]} />}
    </section>
  );
}

/**
 * /sights/: Must-see Sights, the third row of the Destinations menu. One grid
 * in city order (each card names its city; a row of city links jumps to each
 * city's first card), then the services.
 *
 * `editionLocale` renders the French, Spanish, German or Arabic hub
 * (/fr/sights/ and the others): the same sections in the edition's words,
 * header and footer. The sight and city pages stay English, so those links
 * carry the edition's marker; tours and services link the edition's own pages.
 */
export function SightsHubPage({ locale = "en", editionLocale }: { locale?: HomegroundLocale; editionLocale?: SightsHubEditionLocale }) {
  const home = getHomegroundCopy(locale);
  const editionCopy = editionLocale ? getSightsEditionCopy(editionLocale) : null;
  const copy = editionCopy ?? getSightsCopy(locale);
  const inspiration = editionLocale ? getTravelInspirationEditionCopy(editionLocale) : getTravelInspirationCopy(locale);
  const { destinations } = editionLocale
    ? { destinations: { label: `${getTravelInspirationEditionCopy(editionLocale).destinations} ${editionEnglishMarker[editionLocale]}`, href: destinationEditionNavigation[editionLocale].destinationsHref } }
    : navigationFor(locale);
  const path = editionLocale ? sightsEditionPath[editionLocale] : sightsPath[locale];
  const url = `${SITE_URL}${path}`;
  const language = editionLocale ?? home.htmlLang;
  const crumbs: { name: string; path?: string; hrefLang?: string }[] = [
    { name: inspiration.home, path: editionLocale ? serviceEditionPaths(editionLocale).home : home.path },
    ...(destinations ? [{ name: destinations.label, path: destinations.href, ...(editionLocale ? { hrefLang: "en" } : {}) }] : []),
    { name: copy.hub.h1 },
  ];
  const ordered = sightCityIds.flatMap((city) => sights.filter((sight) => sight.city === city));
  const cities = sightCityIds.filter((city) => ordered.some((sight) => sight.city === city));
  const lede = fillSightsCopy(copy.hub.lede, {
    count: String(ordered.filter((sight) => !sight.freeToVisit && getAttractionReservationRule(sight.reservationIds[0])?.status === "offered").length),
    total: String(ordered.length),
  });

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={editionLocale ?? locale} lang={language}>
      <a className={localeStyles.skipLink} href="#sights-main">{editionLocale ? serviceEditionLabels[editionLocale].skipLink : home.skipLink}</a>
      {editionLocale
        ? <EditionSiteHeader currentPath={path} language={editionLocale} languagePaths={sightsHubLanguagePaths()} />
        : <HomegroundHeader languagePaths={{ ...sightsPath, ...sightsEditionPath }} locale={locale} pageContext="destination" />}
      <main id="sights-main" tabIndex={-1}>
        <RevealOnce />

        <header className={styles.hero}>
          <Breadcrumb items={crumbs} label={inspiration.breadcrumb} />
          <h1>{copy.hub.h1}</h1>
          <p className={styles.lede}>
            {editionLocale ? lede : <KeepWords locale={locale} text={lede} />}
          </p>
          <nav aria-label={copy.hub.byCity} className={sightStyles.cityChips}>
            {cities.map((city) => <a href={`#${city}`} key={city}>{editionCopy ? editionCopy.cities[city] : cityName(city, locale)}</a>)}
          </nav>
        </header>

        {/* One grid in city order, so a city with one sight leaves no empty row. */}
        <section aria-label={copy.hub.h1} className={styles.section} data-reveal="">
          <ul className={sightStyles.sightGrid}>
            {ordered.map((sight, index) => (
              <SightCard
                anchor={ordered.findIndex((other) => other.city === sight.city) === index ? sight.city : undefined}
                editionLocale={editionLocale}
                index={index}
                key={sight.id}
                locale={locale}
                sight={sight}
              />
            ))}
          </ul>
          <SightPhotoCredits editionLocale={editionLocale} items={ordered} locale={locale} />
        </section>

        <ClosingBand bookable editionLocale={editionLocale} id="sights-cta-title" locale={locale} />
      </main>
      {editionLocale
        ? <EditionSiteFooter currentPath={path} language={editionLocale} />
        : <HomegroundFooter locale={locale} pageContext="destination" />}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: copy.hub.metadata.title, description: copy.hub.metadata.description,
            inLanguage: language, isPartOf: { "@id": `${SITE_URL}/#website` }, breadcrumb: { "@id": `${url}#breadcrumb` },
            mainEntity: { "@type": "ItemList", itemListElement: ordered.map((sight, index) => ({
              "@type": "ListItem", position: index + 1, name: copy.sights[sight.id].name, url: `${SITE_URL}${sightPath(sight.id, editionLocale ? "en" : locale)}`,
            })) } },
          breadcrumbJsonLd(url, crumbs.map((crumb) => ({ name: crumb.name, path: crumb.path ?? path }))),
        ],
      }} />
    </div>
  );
}

/**
 * /sights/<id>/: one sight. Why it is worth the trip (the hero), the booking
 * facts from the reservation rules (each bookable one with its own "Book
 * this"), the full guide, the private tours that include it, the city's other
 * sights, then the services. Later passes add the sight's own writing under
 * the hero.
 */
export function SightPage({ locale = "en", sightId }: { locale?: HomegroundLocale; sightId: SightId }) {
  const sight = getSight(sightId);
  if (!sight) throw new Error(`Unknown sight: ${sightId}`);
  const home = getHomegroundCopy(locale);
  const copy = getSightsCopy(locale);
  const inspiration = getTravelInspirationCopy(locale);
  const sightCopy = copy.sights[sight.id];
  const story = getSightStory(sight.id, locale);
  const storyMeta = getSightStoryMeta(sight.id);
  const { destinations, tours: allToursItem } = navigationFor(locale);
  const image = sightImage(sight, locale);
  // No guide of its own yet: no "Full guide" link until one is written.
  const guide = sight.guideId ? getGuideEntry(sight.guideId, locale) : null;
  const rules = sightRules(sight);
  const offered = rules.filter((rule) => rule.status === "offered");
  // We sell booking for a sight only when its main entry is bookable: the
  // Shanghai Museum East is free to walk into, so only its paid experience
  // areas carry a "Book this", on their own card.
  const mainBookable = !sight.freeToVisit && rules[0]?.status === "offered";
  const fee = formatAttractionReservationFee(attractionReservationServiceFeeCny, locale);
  const catalog = getPublishedPrivateTourCatalog(locale);
  const tours = sight.tourSlugs.map((slug) => {
    const tour = catalog.find((item) => item.slug === slug);
    if (!tour) throw new Error(`Sight "${sight.id}" names an unpublished tour: ${slug}`);
    return tour;
  });
  const sameCity = sights.filter((other) => other.city === sight.city && other.id !== sight.id);
  // Never a dead end: the city's other sights, else its neighbours, else the best known.
  const neighbours = sights.filter((other) => sightNeighbours[sight.city]?.includes(other.city));
  const more = sameCity.length
    ? { items: sameCity, title: fillSightsCopy(copy.page.sameCity, { city: cityName(sight.city, locale) }) }
    : neighbours.length
      ? { items: neighbours, title: copy.page.nearby }
      : { items: sightHighlights.filter((id) => id !== sight.id).map((id) => getSight(id)).filter((other): other is Sight => Boolean(other)), title: copy.page.more };
  // A sight free to walk into (its own entry) whose extras need booking.
  const freeEntry = sight.freeToVisit || rules[0]?.status === "not-needed";
  const city = cityName(sight.city, locale);
  const hubPath = cityHubPath(sight.city, locale);
  const paths = sightPaths(sight.id);
  const url = `${SITE_URL}${paths[locale]}`;
  const crumbs = [
    { name: inspiration.home, path: home.path },
    ...(destinations ? [{ name: destinations.label, path: destinations.href }] : []),
    { name: copy.hub.h1, path: sightsPath[locale] },
    { name: sightCopy.name },
  ];
  // One bookable attraction: straight to the form with it ticked. Several
  // (Badaling or Mutianyu; the square and the palace): down to the cards, so
  // the traveller picks. None: the tours that include it.
  const fullTrip = navigationFor(locale).services.find((entry) => entry.id === "trip-support");
  const heroAction = mainBookable && offered.length === 1
    ? { href: attractionReservationHref(locale, offered[0].id), label: copy.page.reserve, down: false }
    : mainBookable
      ? { href: `#${bookingAnchor}`, label: copy.page.reserve, down: true }
      : tours.length
        ? { href: `#${toursAnchor}`, label: copy.page.seeTours, down: true }
        : null;
  // "Xi'an City Wall" under "Xi'an" says the city twice.
  const showCity = !sightCopy.name.startsWith(city);

  return (
    <div className={`${localeStyles.root} hg-locale-root ${styles.page}`} data-homeground-locale={locale} lang={home.htmlLang}>
      <a className={localeStyles.skipLink} href="#sight-main">{home.skipLink}</a>
      <HomegroundHeader languagePaths={paths} locale={locale} pageContext="destination" />
      <main id="sight-main" tabIndex={-1}>
        <RevealOnce />

        <header className={`${styles.hero} ${styles.themeHero}`}>
          <Breadcrumb items={crumbs} label={inspiration.breadcrumb} />
          <div className={styles.themeHeroGrid}>
            <div>
              {showCity ? <p className={styles.eyebrow}>{city}</p> : null}
              <h1>{sightCopy.name}</h1>
              <p className={styles.lede}><SightText locale={locale} text={sightCopy.line} /></p>
              {/* Who wrote it and when it was checked, where the city pages and guides put it. */}
              {storyMeta ? <EditorialByline locale={locale} reviewedAt={storyMeta.reviewedAt} /> : null}
              <div className={sightStyles.heroActions}>
                {heroAction ? (
                  <a className={styles.primaryButton} href={heroAction.href}>
                    {heroAction.label}
                    {heroAction.down ? <ArrowDown aria-hidden="true" size={18} /> : <ArrowRight aria-hidden="true" size={18} />}
                  </a>
                ) : null}
                {mainBookable ? (
                  <span className={sightStyles.heroNote}>
                    <SightText locale={locale} text={fillSightsCopy(rules[0].price?.kind === "free-reservation" ? copy.reserveNoteFree : copy.page.reserveNote, { fee })} />
                  </span>
                ) : null}
                {freeEntry ? <span className={sightStyles.heroNote}>{getAttractionReservationCopy(locale).freeWalkIn}</span> : null}
                {freeEntry && offered.length ? (
                  <a className={styles.textLink} href={`#${bookingAnchor}`}>{copy.page.extras}<ArrowDown aria-hidden="true" size={15} /></a>
                ) : null}
                {guide && (!rules.length || (!heroAction && !freeEntry)) ? (
                  <Link className={styles.textLink} href={guide.canonicalPath}>{copy.page.guideLink}<ArrowRight aria-hidden="true" size={15} /></Link>
                ) : null}
                {!heroAction && !freeEntry && !guide && fullTrip ? (
                  <Link className={styles.textLink} href={fullTrip.href}>{copy.planWithUs}<ArrowRight aria-hidden="true" size={15} /></Link>
                ) : null}
              </div>
            </div>
            {/* An openly licensed photo carries its credit on a line under it. */}
            <div className={image.credit ? sightStyles.creditedHero : sightStyles.plainHero}>
              <figure className={`${styles.heroMedia} ${sightStyles.sightHeroMedia}`}>
                <img
                  alt={image.alt}
                  decoding="async"
                  fetchPriority="high"
                  height={image.height}
                  sizes="(max-width: 61.25rem) calc(100vw - 3rem), 32rem"
                  src={image.src}
                  srcSet={generatedImageSrcSet(image.src, image.width)}
                  style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
                  width={image.width}
                />
              </figure>
              {image.credit ? <PhotoCreditLine credit={image.credit} locale={locale} /> : null}
            </div>
          </div>
        </header>

        {story ? <SightStorySections locale={locale} meta={storyMeta} story={story} /> : null}

        {rules.length ? (
          <section aria-labelledby="sight-booking-title" className={styles.section} data-reveal="" id={bookingAnchor}>
            <div className={styles.sectionHead}>
              <div>
                <h2 id="sight-booking-title">{copy.page.bookingTitle}</h2>
                <p>{copy.page.bookingNote}</p>
              </div>
              {guide ? <Link className={styles.textLink} href={guide.canonicalPath}>{copy.page.guideLink}<ArrowRight aria-hidden="true" size={15} /></Link> : null}
            </div>
            <ul className={sightStyles.rules}>
              {/* Where the hero carries no fee (the main entry is free), each bookable card says it. */}
              {rules.map((rule, index) => (
                <RuleCard feeNote={mainBookable ? undefined : fillSightsCopy(copy.page.reserveNote, { fee })} index={index} key={rule.id} locale={locale} rule={rule} />
              ))}
            </ul>
          </section>
        ) : null}

        {tours.length ? (
          <section aria-labelledby="sight-tours-title" className={styles.section} data-reveal="" id={toursAnchor}>
            <div className={styles.sectionHead}>
              <h2 id="sight-tours-title">{copy.page.toursTitle}</h2>
              {/* Three routes, not every one: the full list is a click away. */}
              {allToursItem ? <Link className={styles.textLink} href={allToursItem.href}>{inspiration.hub.allTours}<ArrowRight aria-hidden="true" size={15} /></Link> : null}
            </div>
            <ul className={styles.tours}>
              {tours.map((tour, index) => <TourCard index={index} key={tour.slug} locale={locale} tour={tour} />)}
              <PlanTile count={tours.length} locale={locale} />
            </ul>
            <TourPhotoCredits locale={locale} tours={tours} />
          </section>
        ) : null}

        <section aria-labelledby="sight-more-title" className={styles.section} data-reveal="">
          <div className={styles.sectionHead}>
            <h2 id="sight-more-title">{more.title}</h2>
            <div className={sightStyles.headLinks}>
              {hubPath ? <Link className={styles.textLink} href={hubPath}>{copy.hub.cityLink}<ArrowRight aria-hidden="true" size={15} /></Link> : null}
              <Link className={styles.textLink} href={sightsPath[locale]}>{copy.page.allSights}<ArrowRight aria-hidden="true" size={15} /></Link>
            </div>
          </div>
          <SightStrip items={more.items} locale={locale} />
          <SightPhotoCredits items={more.items} locale={locale} />
        </section>

        <ClosingBand bookable={offered.length > 0} city={sight.city} id="sight-cta-title" locale={locale} showAllTours={!tours.length} />
      </main>
      <HomegroundFooter locale={locale} pageContext="destination" />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": `${url}#webpage`, url, name: sightCopy.name, description: story?.description ?? sightCopy.line,
            inLanguage: home.htmlLang, isPartOf: { "@id": `${SITE_URL}/#website` }, breadcrumb: { "@id": `${url}#breadcrumb` },
            // Undefined values drop out of the JSON; reviewedBy stays on the WebPage itself (its schema.org domain).
            dateModified: storyMeta?.reviewedAt,
            reviewedBy: storyMeta ? { "@id": EDITORIAL_PERSON_ID } : undefined,
            citation: storyMeta?.sources.map((source) => source.url),
            about: {
              "@type": "TouristAttraction", name: sightCopy.name, image: `${SITE_URL}${image.src}`,
              ...(story ? { description: story.why[0] } : {}),
              ...(storyMeta ? { alternateName: storyMeta.alternateName, sameAs: storyMeta.sameAs } : {}),
              ...(sight.freeToVisit ? { isAccessibleForFree: true } : {}),
            } },
          ...(story?.faq?.length ? [{ "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: story.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }] : []),
          ...(storyMeta ? [editorialPersonSchema(locale)] : []),
          breadcrumbJsonLd(url, crumbs.map((crumb) => ({ name: crumb.name, path: crumb.path ?? paths[locale] }))),
        ],
      }} />
    </div>
  );
}
